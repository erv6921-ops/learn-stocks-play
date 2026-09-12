import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { AlertCircle, BookMarked, Lightbulb, ListChecks, Loader2, RefreshCw, Sparkles } from "lucide-react";
import type { ApprovalCounts } from "@/components/teacher/QuestionApprovalPanel";
import { CurationItemCard } from "./CurationItemCard";
import { CurationSection } from "./CurationSection";
import { SourcePagesSection } from "./SourcePagesSection";
import { GenerationPanel } from "./GenerationPanel";
import {
  callFunction,
  countWords,
  db,
  functionError,
  pageRefFor,
  type ChunkRow,
  type ConceptRow,
  type CurationTable,
  type GenerateResponse,
  type LessonRow,
  type ObjectiveRow,
  type SynthesizeResponse,
  type TeacherStatus,
  type UploadRow,
  type VocabRow,
} from "./api";

/**
 * Full extraction review for one upload (contract sections 2, 4, 5, 6):
 * stats, every concept / term / objective / source page with Emphasize and
 * Trash, then Generate Lesson and everything that follows.
 *
 * Marks save immediately (optimistic; reverted with a toast on failure).
 */
export interface CurationReviewProps {
  uploadId: string;
  fileName: string;
  className?: string;
}

interface Lists {
  concepts: ConceptRow[];
  vocabulary: VocabRow[];
  learning_objectives: ObjectiveRow[];
  curriculum_source_chunks: ChunkRow[];
}

const EMPTY_LISTS: Lists = { concepts: [], vocabulary: [], learning_objectives: [], curriculum_source_chunks: [] };

function marksOf(lists: Lists): string {
  // Stable fingerprint of every mark, used to detect "you changed your selections".
  const parts: string[] = [];
  for (const table of Object.keys(lists) as CurationTable[]) {
    for (const row of lists[table]) parts.push(`${row.id}:${row.teacher_status}`);
  }
  return parts.sort().join("|");
}

const StatTile: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="rounded-xl border border-emerald-100 bg-white p-3 text-center dark:border-emerald-900 dark:bg-slate-900">
    <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{value.toLocaleString()}</div>
    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</div>
  </div>
);

export const CurationReview: React.FC<CurationReviewProps> = ({ uploadId, fileName, className }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [upload, setUpload] = useState<UploadRow | null>(null);
  const [lists, setLists] = useState<Lists>(EMPTY_LISTS);
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());
  const [questionStats, setQuestionStats] = useState<ApprovalCounts | null>(null);
  const [lesson, setLesson] = useState<LessonRow | null>(null);
  const [lessonName, setLessonName] = useState("");
  const [generating, setGenerating] = useState(false);
  const [building, setBuilding] = useState(false);
  const [panelKey, setPanelKey] = useState(0);
  // Marks as they were when questions were last generated (or first loaded).
  const snapshotRef = useRef<string | null>(null);
  const [snapshotVersion, setSnapshotVersion] = useState(0);

  // --- Load everything for this upload ----------------------------------
  const load = useCallback(
    async (opts: { silent?: boolean } = {}) => {
      if (!opts.silent) setLoading(true);
      setError("");
      try {
        const [uRes, cRes, vRes, oRes, chRes, qRes, lRes] = await Promise.all([
          db.from("curriculum_uploads").select("id, file_name, status, coverage_report, insufficient_source_reason").eq("id", uploadId).maybeSingle(),
          db.from("concepts").select("id, name, definition, teacher_status, grounding_status, source_chunk_ids").eq("upload_id", uploadId).order("created_at", { ascending: true }),
          db.from("vocabulary").select("id, term, definition, teacher_status, grounding_status, source_chunk_ids").eq("upload_id", uploadId).order("id", { ascending: true }),
          db.from("learning_objectives").select("id, objective, teacher_status, grounding_status, source_chunk_ids").eq("upload_id", uploadId).order("id", { ascending: true }),
          db.from("curriculum_source_chunks").select("id, chunk_index, page_start, page_end, content, teacher_status").eq("upload_id", uploadId).order("chunk_index", { ascending: true }),
          db.from("generated_questions").select("id, grounding_status, teacher_approved_at").eq("upload_id", uploadId).eq("status", "pending"),
          db.from("lessons").select("id, name, teacher_approved_at").eq("upload_id", uploadId).order("created_at", { ascending: false }).limit(1).maybeSingle(),
        ]);
        for (const r of [uRes, cRes, vRes, oRes, chRes, qRes, lRes]) {
          if (r.error) throw new Error(r.error.message);
        }
        if (!uRes.data) throw new Error("This upload could not be found (or it isn't yours).");
        setUpload(uRes.data as UploadRow);
        const next: Lists = {
          concepts: (cRes.data as ConceptRow[]) ?? [],
          vocabulary: (vRes.data as VocabRow[]) ?? [],
          learning_objectives: (oRes.data as ObjectiveRow[]) ?? [],
          curriculum_source_chunks: (chRes.data as ChunkRow[]) ?? [],
        };
        setLists(next);
        const qs = (qRes.data as { grounding_status: string | null; teacher_approved_at: string | null }[]) ?? [];
        const stats: ApprovalCounts = {
          total: qs.length,
          approved: qs.filter((q) => !!q.teacher_approved_at).length,
          verified: qs.filter((q) => q.grounding_status === "verified").length,
          failed: qs.filter((q) => q.grounding_status === "failed").length,
        };
        setQuestionStats(stats.total > 0 ? stats : null);
        const l = (lRes.data as LessonRow | null) ?? null;
        setLesson(l);
        setLessonName((prev) => prev || l?.name || fileName.replace(/\.pdf$/i, ""));
        if (snapshotRef.current === null) {
          // First load: whatever the marks are now is the baseline.
          snapshotRef.current = marksOf(next);
          setSnapshotVersion((v) => v + 1);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load the extraction.");
      } finally {
        setLoading(false);
      }
    },
    [uploadId, fileName],
  );

  useEffect(() => {
    void load();
  }, [load]);

  // --- Marks: optimistic save ----------------------------------------------
  const mark = useCallback(
    async (table: CurationTable, id: string, next: TeacherStatus) => {
      let previous: TeacherStatus | null = null;
      setLists((prev) => {
        const rows = prev[table] as { id: string; teacher_status: TeacherStatus }[];
        const row = rows.find((r) => r.id === id);
        if (!row) return prev;
        previous = row.teacher_status;
        return { ...prev, [table]: rows.map((r) => (r.id === id ? { ...r, teacher_status: next } : r)) };
      });
      setBusyIds((s) => new Set(s).add(id));
      try {
        const { data, error: uErr } = await db.from(table).update({ teacher_status: next }).eq("id", id).select("id");
        if (uErr) throw new Error(uErr.message);
        if (!data || data.length === 0) throw new Error("The change was not saved. Has the curation SQL been run?");
      } catch (err) {
        const prevStatus = previous ?? "active";
        setLists((prev) => {
          const rows = prev[table] as { id: string; teacher_status: TeacherStatus }[];
          return { ...prev, [table]: rows.map((r) => (r.id === id ? { ...r, teacher_status: prevStatus } : r)) };
        });
        toast({ title: "Couldn't save that mark", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
      } finally {
        setBusyIds((s) => {
          const n = new Set(s);
          n.delete(id);
          return n;
        });
      }
    },
    [toast],
  );

  // --- Derived -------------------------------------------------------------
  const chunks = lists.curriculum_source_chunks;
  const stats = useMemo(() => {
    const pages = new Set<number>();
    let words = 0;
    for (const c of chunks) {
      words += countWords(c.content);
      if (c.page_start != null) {
        const end = c.page_end ?? c.page_start;
        for (let p = c.page_start; p <= end; p++) pages.add(p);
      }
    }
    return { pages: pages.size || chunks.length, words };
  }, [chunks]);

  const markCounts = useMemo(() => {
    let emphasized = 0;
    let trashed = 0;
    for (const table of Object.keys(lists) as CurationTable[]) {
      for (const r of lists[table]) {
        if (r.teacher_status === "emphasized") emphasized++;
        else if (r.teacher_status === "trashed") trashed++;
      }
    }
    return { emphasized, trashed };
  }, [lists]);

  const marksSummary =
    markCounts.emphasized + markCounts.trashed === 0
      ? "Nothing marked yet. The lesson will be built from everything above."
      : `${markCounts.emphasized} emphasized · ${markCounts.trashed} trashed`;

  const currentMarks = useMemo(() => marksOf(lists), [lists]);
  // snapshotVersion is read so the memo re-runs when the baseline moves.
  const marksDirty = useMemo(() => snapshotRef.current !== null && currentMarks !== snapshotRef.current, [currentMarks, snapshotVersion]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Generate / build ----------------------------------------------------
  const generate = useCallback(
    async (regenerate: boolean) => {
      setGenerating(true);
      try {
        const { status, data } = await callFunction<GenerateResponse>("generate-questions-v2", { uploadId, regenerate });
        if (status === 422 && data?.insufficientSourceReason) {
          toast({ title: "Your material didn't support any questions", description: data.insufficientSourceReason, variant: "destructive" });
        } else if (!data?.success) {
          throw new Error(functionError(status, data, "Question generation failed"));
        } else {
          toast({
            title: regenerate ? "Questions regenerated" : "Questions ready to review",
            description: `${data.questionsGenerated} generated · ${data.verifiedCount ?? 0} found in source${data.failedCount ? ` · ${data.failedCount} not found` : ""}${data.keptApproved ? ` · ${data.keptApproved} approved kept` : ""}`,
          });
        }
        snapshotRef.current = currentMarks;
        setSnapshotVersion((v) => v + 1);
        setPanelKey((k) => k + 1);
        await load({ silent: true });
      } catch (err) {
        toast({ title: "Couldn't generate", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
      } finally {
        setGenerating(false);
      }
    },
    [uploadId, currentMarks, load, toast],
  );

  const buildLesson = useCallback(async () => {
    setBuilding(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("You must be signed in.");
      const name = lessonName.trim() || fileName.replace(/\.pdf$/i, "") || "Untitled lesson";
      let lessonId = lesson?.id ?? null;
      if (!lessonId) {
        const { data: created, error: cErr } = await db
          .from("lessons")
          .insert({ upload_id: uploadId, teacher_id: userData.user.id, name, status: "draft" })
          .select("id")
          .single();
        if (cErr || !created?.id) throw new Error(cErr?.message ?? "Could not create the lesson.");
        lessonId = created.id as string;
      } else if (lesson && lesson.name !== name) {
        await db.from("lessons").update({ name }).eq("id", lessonId);
      }
      const { status, data } = await callFunction<SynthesizeResponse>("synthesize-lesson-v2", { uploadId, lessonId });
      if (!data?.success) throw new Error(functionError(status, data, "Lesson build failed"));
      toast({
        title: lesson ? "Jeff's lesson rebuilt" : "Jeff's lesson built",
        description: `${data.sectionsCount ?? 0} sections · ${data.masteryCount ?? 0} mastery questions${data.failedCount ? ` · ${data.failedCount} item(s) held back` : ""}. Review and approve it before students can open it.`,
      });
      await load({ silent: true });
    } catch (err) {
      toast({ title: "Couldn't build the lesson", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    } finally {
      setBuilding(false);
    }
  }, [uploadId, lesson, lessonName, fileName, load, toast]);

  const onCountsChange = useCallback((c: ApprovalCounts) => setQuestionStats(c.total > 0 ? c : null), []);

  // --- Render --------------------------------------------------------------
  if (loading) {
    return (
      <div className={cn("flex items-center justify-center gap-2 py-10 text-sm text-slate-500 dark:text-slate-400", className)}>
        <Loader2 className="h-5 w-5 animate-spin text-emerald-600" /> Loading what was extracted…
      </div>
    );
  }
  if (error || !upload) {
    return (
      <Card className={cn("border-red-200 bg-red-50/60 dark:border-red-900 dark:bg-red-950/30", className)}>
        <CardContent className="space-y-3 pt-6">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <p className="text-sm text-red-700 dark:text-red-300">{error || "Upload not found."}</p>
          </div>
          <Button size="sm" variant="outline" onClick={() => void load()} className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-300">
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  const failedOf = (r: { grounding_status?: string | null }) => r.grounding_status === "failed";

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="border-emerald-100 shadow-sm dark:border-emerald-900">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900 dark:text-slate-100">2. Review what was extracted</CardTitle>
          <CardDescription>
            Everything below came from <span className="font-medium">{upload.file_name}</span>. Emphasize what matters most, trash what should stay out. Marks save as you click.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <StatTile label="Pages read" value={stats.pages} />
            <StatTile label="Words extracted" value={stats.words} />
            <StatTile label="Concepts" value={lists.concepts.length} />
            <StatTile label="Vocab terms" value={lists.vocabulary.length} />
            <StatTile label="Objectives" value={lists.learning_objectives.length} />
          </div>

          <CurationSection<ConceptRow>
            title="Concepts"
            icon={<Lightbulb className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
            items={lists.concepts}
            getStatus={(c) => c.teacher_status}
            getKey={(c) => c.id}
            renderItem={(c) => (
              <CurationItemCard
                title={c.name}
                description={c.definition}
                pageRef={pageRefFor(c.source_chunk_ids, chunks)}
                status={c.teacher_status}
                groundingFailed={failedOf(c)}
                busy={busyIds.has(c.id)}
                onEmphasize={() => void mark("concepts", c.id, "emphasized")}
                onRemoveEmphasis={() => void mark("concepts", c.id, "active")}
                onTrash={() => void mark("concepts", c.id, "trashed")}
                onRestore={() => void mark("concepts", c.id, "active")}
              />
            )}
          />

          <CurationSection<VocabRow>
            title="Vocabulary"
            icon={<BookMarked className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
            items={lists.vocabulary}
            getStatus={(v) => v.teacher_status}
            getKey={(v) => v.id}
            renderItem={(v) => (
              <CurationItemCard
                title={v.term}
                description={v.definition}
                pageRef={pageRefFor(v.source_chunk_ids, chunks)}
                status={v.teacher_status}
                groundingFailed={failedOf(v)}
                busy={busyIds.has(v.id)}
                onEmphasize={() => void mark("vocabulary", v.id, "emphasized")}
                onRemoveEmphasis={() => void mark("vocabulary", v.id, "active")}
                onTrash={() => void mark("vocabulary", v.id, "trashed")}
                onRestore={() => void mark("vocabulary", v.id, "active")}
              />
            )}
          />

          <CurationSection<ObjectiveRow>
            title="Learning objectives"
            icon={<ListChecks className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
            items={lists.learning_objectives}
            getStatus={(o) => o.teacher_status}
            getKey={(o) => o.id}
            emptyText="Your material did not state any learning objectives explicitly, so none were invented."
            renderItem={(o) => (
              <CurationItemCard
                title={o.objective}
                pageRef={pageRefFor(o.source_chunk_ids, chunks)}
                status={o.teacher_status}
                groundingFailed={failedOf(o)}
                busy={busyIds.has(o.id)}
                onEmphasize={() => void mark("learning_objectives", o.id, "emphasized")}
                onRemoveEmphasis={() => void mark("learning_objectives", o.id, "active")}
                onTrash={() => void mark("learning_objectives", o.id, "trashed")}
                onRestore={() => void mark("learning_objectives", o.id, "active")}
              />
            )}
          />

          <SourcePagesSection chunks={chunks} busyIds={busyIds} onMark={(id, next) => void mark("curriculum_source_chunks", id, next)} />
        </CardContent>
      </Card>

      <Card className="border-emerald-100 shadow-sm dark:border-emerald-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-slate-900 dark:text-slate-100">
            <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            3. Generate and approve
          </CardTitle>
          <CardDescription>{marksSummary}</CardDescription>
        </CardHeader>
        <CardContent>
          <GenerationPanel
            uploadId={uploadId}
            upload={upload}
            questionStats={questionStats}
            lesson={lesson}
            lessonName={lessonName}
            onLessonNameChange={setLessonName}
            marksDirty={marksDirty}
            marksSummary={marksSummary}
            generating={generating}
            building={building}
            onGenerate={(r) => void generate(r)}
            onBuildLesson={() => void buildLesson()}
            onCountsChange={onCountsChange}
            panelKey={panelKey}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CurationReview;
