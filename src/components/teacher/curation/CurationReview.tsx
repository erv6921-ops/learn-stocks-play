import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { AlertCircle, BookMarked, FileText, HelpCircle, Lightbulb, ListChecks, Loader2, RefreshCw, ShieldQuestion, Sparkles } from "lucide-react";
import { QuestionApprovalPanel, type ApprovalCounts } from "@/components/teacher/QuestionApprovalPanel";
import { CurationItemCard } from "./CurationItemCard";
import { CurationSection } from "./CurationSection";
import { SourcePagesSection } from "./SourcePagesSection";
import { GenerationPanel } from "./GenerationPanel";
import { GenerationSettingsPanel } from "./GenerationSettingsPanel";
import { SubLessonBar, type SubLessonState } from "./SubLessonBar";
import { SplitLessonsDialog } from "./SplitLessonsDialog";
import {
  callFunction,
  chunksOf,
  countWords,
  db,
  DEFAULT_SETTINGS,
  functionError,
  itemsInSubLesson,
  normalizeSettings,
  pageRefFor,
  unplacedItems,
  type GenerationSettings,
  type ChunkRow,
  type ConceptRow,
  type CurationRow,
  type CurationTable,
  runSteppedExtraction,
  type GenerateResponse,
  type LessonRow,
  type ObjectiveRow,
  type SubLessonRow,
  type SynthesizeResponse,
  type TeacherStatus,
  type UploadRow,
  type VocabRow,
} from "./api";

/**
 * Tabbed extraction review for one upload (contract sections 2, 4, 5, 6, 7, 8):
 * a sub-lesson selector ("Split into lessons"), a stats row, four tabs
 * (Vocabulary · Concepts · Questions · Source Pages) with Emphasize / Trash on
 * each item, then the build area (instructions, settings, Generate, Build,
 * Preview -> approve -> Assign). Tabs, counts, questions, settings,
 * coverage, lesson and Generate are all scoped to the selected sub-lesson.
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

type TabKey = "vocabulary" | "concepts" | "questions" | "pages";

function marksOf(rows: CurationRow[]): string {
  // Stable fingerprint of every mark, used to detect "you changed your selections".
  return rows
    .map((r) => `${r.id}:${r.teacher_status}`)
    .sort()
    .join("|");
}

const StatTile: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="rounded-xl border border-emerald-100 bg-white p-3 text-center dark:border-emerald-900 dark:bg-slate-900">
    <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{value.toLocaleString()}</div>
    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</div>
  </div>
);

const TabBadge: React.FC<{ n: number }> = ({ n }) => (
  <span className="ml-1.5 rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-slate-700 dark:bg-slate-700 dark:text-slate-200">
    {n}
  </span>
);

export const CurationReview: React.FC<CurationReviewProps> = ({ uploadId, fileName, className }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [upload, setUpload] = useState<UploadRow | null>(null);
  const [lists, setLists] = useState<Lists>(EMPTY_LISTS);
  const [subLessons, setSubLessons] = useState<SubLessonRow[]>([]);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [questionCounts, setQuestionCounts] = useState<Map<string, number>>(new Map());
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());
  const [questionStats, setQuestionStats] = useState<ApprovalCounts | null>(null);
  const [lessonName, setLessonName] = useState("");
  const [generating, setGenerating] = useState(false);
  const [building, setBuilding] = useState(false);
  const [approvingLesson, setApprovingLesson] = useState(false);
  const [settings, setSettings] = useState<GenerationSettings>(DEFAULT_SETTINGS);
  const [uploadInstructions, setUploadInstructions] = useState("");
  const [savedUploadInstructions, setSavedUploadInstructions] = useState("");
  const [uploadInstructionsSaving, setUploadInstructionsSaving] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [savedInstructions, setSavedInstructions] = useState("");
  const [instructionsSaving, setInstructionsSaving] = useState(false);
  const [panelKey, setPanelKey] = useState(0);
  const [tab, setTab] = useState<TabKey>("vocabulary");
  const [splitOpen, setSplitOpen] = useState(false);
  // Marks as they were when questions were last generated, per sub-lesson.
  const snapshotRef = useRef<Map<string, string>>(new Map());
  const [snapshotVersion, setSnapshotVersion] = useState(0);

  // --- Load everything for this upload ----------------------------------
  const load = useCallback(
    async (opts: { silent?: boolean } = {}) => {
      if (!opts.silent) setLoading(true);
      setError("");
      try {
        const [uRes, cRes, vRes, oRes, chRes, qRes, lRes, sRes] = await Promise.all([
          db.from("curriculum_uploads").select("*").eq("id", uploadId).maybeSingle(),
          db.from("concepts").select("id, name, definition, teacher_status, grounding_status, source_chunk_ids").eq("upload_id", uploadId).order("created_at", { ascending: true }),
          db.from("vocabulary").select("id, term, definition, teacher_status, grounding_status, source_chunk_ids").eq("upload_id", uploadId).order("id", { ascending: true }),
          db.from("learning_objectives").select("id, objective, teacher_status, grounding_status, source_chunk_ids").eq("upload_id", uploadId).order("id", { ascending: true }),
          db.from("curriculum_source_chunks").select("id, chunk_index, page_start, page_end, content, teacher_status, sub_lesson_id").eq("upload_id", uploadId).order("chunk_index", { ascending: true }),
          db.from("generated_questions").select("id, sub_lesson_id").eq("upload_id", uploadId).eq("status", "pending"),
          db.from("lessons").select("id, name, sub_lesson_id, teacher_approved_at, content").eq("upload_id", uploadId).order("created_at", { ascending: false }),
          db.from("sub_lessons").select("*").eq("upload_id", uploadId).order("sort_order", { ascending: true }),
        ]);
        for (const r of [uRes, cRes, vRes, oRes, chRes, qRes, lRes, sRes]) {
          if (r.error) throw new Error(r.error.message);
        }
        if (!uRes.data) throw new Error("This upload could not be found (or it isn't yours).");
        const u = uRes.data as UploadRow;
        setUpload(u);
        const storedUpload = u.teacher_instructions ?? "";
        setSavedUploadInstructions(storedUpload);
        setUploadInstructions((prev) => (opts.silent && prev ? prev : storedUpload));

        let chunks = (chRes.data as ChunkRow[]) ?? [];
        let subs = (sRes.data as SubLessonRow[]) ?? [];
        let lessonRows = (lRes.data as LessonRow[]) ?? [];

        // Default sub-lesson: extraction creates it, and the backfill covers
        // older uploads. If neither happened (function not redeployed yet),
        // create it here so the page still works: it owns every page.
        if (subs.length === 0 && chunks.length > 0) {
          const { data: userData } = await supabase.auth.getUser();
          if (!userData?.user) throw new Error("You must be signed in.");
          const { data: created, error: cErr } = await db
            .from("sub_lessons")
            .insert({ upload_id: uploadId, title: fileName.replace(/\.pdf$/i, "") || "Lesson 1", sort_order: 0, generation_settings: u.generation_settings ?? null, coverage_report: u.coverage_report ?? null, insufficient_source_reason: u.insufficient_source_reason ?? null })
            .select("*")
            .single();
          if (cErr || !created) throw new Error(cErr?.message ?? "Could not create the default lesson. Has sql/2026-09-16_sub_lessons.sql been run?");
          const sub = created as SubLessonRow;
          for (const table of ["curriculum_source_chunks", "lessons", "generated_questions"]) {
            await db.from(table).update({ sub_lesson_id: sub.id }).eq("upload_id", uploadId).is("sub_lesson_id", null);
          }
          subs = [sub];
          chunks = chunks.map((c) => ({ ...c, sub_lesson_id: c.sub_lesson_id ?? sub.id }));
          lessonRows = lessonRows.map((l) => ({ ...l, sub_lesson_id: l.sub_lesson_id ?? sub.id }));
        }

        setLists({
          concepts: (cRes.data as ConceptRow[]) ?? [],
          vocabulary: (vRes.data as VocabRow[]) ?? [],
          learning_objectives: (oRes.data as ObjectiveRow[]) ?? [],
          curriculum_source_chunks: chunks,
        });
        setSubLessons(subs);
        setLessons(lessonRows);
        const counts = new Map<string, number>();
        for (const q of (qRes.data as { sub_lesson_id: string | null }[]) ?? []) {
          const k = q.sub_lesson_id ?? subs[0]?.id ?? "";
          counts.set(k, (counts.get(k) ?? 0) + 1);
        }
        setQuestionCounts(counts);
        setSelectedSubId((prev) => (prev && subs.some((s) => s.id === prev) ? prev : subs[0]?.id ?? null));
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

  // --- Selected sub-lesson and everything derived from it ----------------
  const selectedSub = useMemo(() => subLessons.find((s) => s.id === selectedSubId) ?? null, [subLessons, selectedSubId]);
  const allChunks = lists.curriculum_source_chunks;
  const chunks = useMemo(() => (selectedSubId ? chunksOf(selectedSubId, allChunks) : allChunks), [selectedSubId, allChunks]);
  const ownedIds = useMemo(() => new Set(chunks.map((c) => c.id)), [chunks]);
  const scoped = useMemo(
    () => ({
      concepts: itemsInSubLesson(lists.concepts, ownedIds),
      vocabulary: itemsInSubLesson(lists.vocabulary, ownedIds),
      learning_objectives: itemsInSubLesson(lists.learning_objectives, ownedIds),
    }),
    [lists, ownedIds],
  );
  // Grounding-failed items have no citation: they belong to no sub-lesson
  // and are never used as a guide. Shown once, in their own group.
  const unplaced = useMemo(
    () => ({ concepts: unplacedItems(lists.concepts), vocabulary: unplacedItems(lists.vocabulary), learning_objectives: unplacedItems(lists.learning_objectives) }),
    [lists],
  );
  const lesson = useMemo(() => (selectedSubId ? lessons.find((l) => l.sub_lesson_id === selectedSubId) ?? null : null), [lessons, selectedSubId]);
  const questionCount = selectedSubId ? questionCounts.get(selectedSubId) ?? 0 : 0;

  // Per-sub-lesson settings, instructions and lesson name follow the selection.
  useEffect(() => {
    if (!selectedSub) return;
    setSettings(normalizeSettings(selectedSub.generation_settings ?? upload?.generation_settings));
    const stored = selectedSub.instructions ?? "";
    setSavedInstructions(stored);
    setInstructions(stored);
    setLessonName(lesson?.name || selectedSub.title);
    setQuestionStats(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSub?.id]);
  useEffect(() => {
    // A silent reload after generation/build refreshes the row; keep typed text.
    if (!selectedSub) return;
    setSavedInstructions(selectedSub.instructions ?? "");
    setInstructions((prev) => prev || (selectedSub.instructions ?? ""));
    setSettings(normalizeSettings(selectedSub.generation_settings ?? upload?.generation_settings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSub?.generation_settings, selectedSub?.instructions]);
  useEffect(() => {
    if (lesson?.name) setLessonName(lesson.name);
  }, [lesson?.name]);

  const subStates = useMemo(() => {
    const m = new Map<string, SubLessonState>();
    for (const s of subLessons) {
      const l = lessons.find((x) => x.sub_lesson_id === s.id);
      m.set(s.id, { built: !!l?.content?.sections?.length, approved: !!l?.teacher_approved_at, questions: questionCounts.get(s.id) ?? 0 });
    }
    return m;
  }, [subLessons, lessons, questionCounts]);

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

  const scopedRows = useMemo<CurationRow[]>(
    () => [...scoped.concepts, ...scoped.vocabulary, ...scoped.learning_objectives, ...chunks],
    [scoped, chunks],
  );
  const markCounts = useMemo(() => {
    let emphasized = 0;
    let trashed = 0;
    for (const r of scopedRows) {
      if (r.teacher_status === "emphasized") emphasized++;
      else if (r.teacher_status === "trashed") trashed++;
    }
    return { emphasized, trashed };
  }, [scopedRows]);

  const marksSummary =
    markCounts.emphasized + markCounts.trashed === 0
      ? "Nothing marked yet in this lesson. The questions will be built from everything in its tabs."
      : `${markCounts.emphasized} emphasized · ${markCounts.trashed} trashed in this lesson`;

  // Settings and both instruction boxes are part of the fingerprint: changing
  // them after generation should prompt a regenerate just like a changed mark.
  const currentMarks = useMemo(
    () => `${marksOf(scopedRows)}||${settings.bankSize}:${settings.difficulty}||${savedUploadInstructions}||${savedInstructions}`,
    [scopedRows, settings.bankSize, settings.difficulty, savedUploadInstructions, savedInstructions],
  );
  // First time a sub-lesson is seen, its current state is the baseline.
  useEffect(() => {
    if (!selectedSubId || loading) return;
    if (!snapshotRef.current.has(selectedSubId)) {
      snapshotRef.current.set(selectedSubId, currentMarks);
      setSnapshotVersion((v) => v + 1);
    }
  }, [selectedSubId, loading, currentMarks]);
  // snapshotVersion is read so the memo re-runs when the baseline moves.
  const marksDirty = useMemo(() => {
    const base = selectedSubId ? snapshotRef.current.get(selectedSubId) : undefined;
    return base !== undefined && base !== currentMarks;
  }, [selectedSubId, currentMarks, snapshotVersion]); // eslint-disable-line react-hooks/exhaustive-deps

  const starredCount = questionStats?.starred ?? 0;
  const starredOverage = Math.max(0, starredCount - settings.masteryRequired);
  const conceptOptions = useMemo(
    () => scoped.concepts.filter((c) => c.teacher_status !== "trashed").map((c) => ({ id: c.id, name: c.name })),
    [scoped.concepts],
  );

  // --- Generate / build ----------------------------------------------------
  const generate = useCallback(
    async (regenerate: boolean) => {
      if (!selectedSubId || starredOverage > 0) return;
      setGenerating(true);
      try {
        const { status, data } = await callFunction<GenerateResponse>("generate-questions-v2", {
          uploadId,
          subLessonId: selectedSubId,
          regenerate,
          settings,
          teacherInstructions: uploadInstructions,
          subLessonInstructions: instructions,
        });
        if (status === 422 && data?.insufficientSourceReason) {
          toast({ title: "This lesson's pages didn't support any questions", description: data.insufficientSourceReason, variant: "destructive" });
        } else if (!data?.success) {
          throw new Error(functionError(status, data, "Question generation failed"));
        } else {
          const skipped = data.unsupportedInstructions?.length ?? 0;
          toast({
            title: regenerate ? "Questions regenerated" : "Questions ready to review",
            description: `${data.questionsGenerated} generated · ${data.verifiedCount ?? 0} found in source${data.failedCount ? ` · ${data.failedCount} not found` : ""}${data.keptApproved ? ` · ${data.keptApproved} approved kept` : ""}${data.keptTeacherAuthored ? ` · ${data.keptTeacherAuthored} written by you kept` : ""}${skipped ? ` · ${skipped} instruction part${skipped === 1 ? "" : "s"} skipped (not in these pages)` : ""}`,
          });
        }
        snapshotRef.current.set(selectedSubId, currentMarks);
        setSnapshotVersion((v) => v + 1);
        setPanelKey((k) => k + 1);
        setTab("questions");
        await load({ silent: true });
      } catch (err) {
        toast({ title: "Couldn't generate", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
      } finally {
        setGenerating(false);
      }
    },
    [uploadId, selectedSubId, currentMarks, settings, uploadInstructions, instructions, starredOverage, load, toast],
  );

  const buildLesson = useCallback(async () => {
    if (!selectedSubId || !selectedSub || starredOverage > 0) return;
    setBuilding(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("You must be signed in.");
      const name = lessonName.trim() || selectedSub.title || fileName.replace(/\.pdf$/i, "") || "Untitled lesson";
      let lessonId = lesson?.id ?? null;
      if (!lessonId) {
        const { data: created, error: cErr } = await db
          .from("lessons")
          .insert({ upload_id: uploadId, sub_lesson_id: selectedSubId, teacher_id: userData.user.id, name, status: "draft" })
          .select("id")
          .single();
        if (cErr || !created?.id) throw new Error(cErr?.message ?? "Could not create the lesson.");
        lessonId = created.id as string;
      } else if (lesson && lesson.name !== name) {
        await db.from("lessons").update({ name }).eq("id", lessonId);
      }
      const { status, data } = await callFunction<SynthesizeResponse>("synthesize-lesson-v2", {
        uploadId,
        lessonId,
        subLessonId: selectedSubId,
        settings,
        teacherInstructions: uploadInstructions,
        subLessonInstructions: instructions,
      });
      if (!data?.success) throw new Error(functionError(status, data, "Lesson build failed"));
      // A rebuilt lesson is new content: the teacher reviews it again before assigning.
      if (lesson?.teacher_approved_at) {
        await db.from("lessons").update({ teacher_approved_at: null, teacher_approved_by: null }).eq("id", lessonId);
      }
      const skipped = data.unsupportedInstructions?.length ?? 0;
      toast({
        title: lesson ? "Jeff's lesson rebuilt" : "Jeff's lesson built",
        description: `${data.sectionsCount ?? 0} sections · ${data.masteryCount ?? 0} mastery questions${data.starredCount ? ` (${data.starredCount} starred, every student gets them)` : ""}${data.failedCount ? ` · ${data.failedCount} item(s) held back` : ""}${skipped ? ` · ${skipped} instruction part${skipped === 1 ? "" : "s"} skipped` : ""}. Preview it, then tick "I've reviewed this lesson" to assign it.`,
      });
      await load({ silent: true });
    } catch (err) {
      toast({ title: "Couldn't build the lesson", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    } finally {
      setBuilding(false);
    }
  }, [uploadId, selectedSubId, selectedSub, lesson, lessonName, fileName, settings, uploadInstructions, instructions, starredOverage, load, toast]);

  // --- Whole-lesson approval checkbox -------------------------------------
  const approveLesson = useCallback(
    async (approve: boolean) => {
      if (!lesson) return;
      setApprovingLesson(true);
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) throw new Error("You must be signed in.");
        const patch = approve
          ? { teacher_approved_at: new Date().toISOString(), teacher_approved_by: userData.user.id }
          : { teacher_approved_at: null, teacher_approved_by: null };
        const { data, error: uErr } = await db.from("lessons").update(patch).eq("id", lesson.id).select("id, teacher_approved_at").single();
        if (uErr) throw new Error(uErr.message);
        const at = (data as LessonRow).teacher_approved_at ?? null;
        setLessons((prev) => prev.map((l) => (l.id === lesson.id ? { ...l, teacher_approved_at: at } : l)));
      } catch (err) {
        toast({ title: "Couldn't update the lesson", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
      } finally {
        setApprovingLesson(false);
      }
    },
    [lesson, toast],
  );

  const onCountsChange = useCallback(
    (c: ApprovalCounts) => {
      setQuestionStats(c.total > 0 ? c : null);
      if (selectedSubId) setQuestionCounts((prev) => new Map(prev).set(selectedSubId, c.total));
    },
    [selectedSubId],
  );

  // --- Lesson settings (per sub-lesson): optimistic, saved on every change --
  const updateSettings = useCallback(
    async (next: GenerationSettings) => {
      if (!selectedSubId) return;
      const clean = normalizeSettings(next);
      const previous = settings;
      setSettings(clean);
      const { data, error: sErr } = await db.from("sub_lessons").update({ generation_settings: clean }).eq("id", selectedSubId).select("id");
      if (sErr || !data || data.length === 0) {
        setSettings(previous);
        toast({
          title: "Couldn't save the settings",
          description: sErr?.message ?? "Has sql/2026-09-16_sub_lessons.sql been run?",
          variant: "destructive",
        });
        return;
      }
      setSubLessons((prev) => prev.map((s) => (s.id === selectedSubId ? { ...s, generation_settings: clean } : s)));
    },
    [settings, selectedSubId, toast],
  );

  // --- Instructions: saved on blur (upload-wide + this sub-lesson) --------
  const saveUploadInstructions = useCallback(async () => {
    const text = uploadInstructions.trim();
    if (text === savedUploadInstructions) return;
    setUploadInstructionsSaving(true);
    const { data, error: iErr } = await db.from("curriculum_uploads").update({ teacher_instructions: text || null }).eq("id", uploadId).select("id");
    setUploadInstructionsSaving(false);
    if (iErr || !data || data.length === 0) {
      toast({ title: "Couldn't save the instructions", description: iErr?.message ?? "Has sql/2026-09-15_teacher_questions_and_stages.sql been run?", variant: "destructive" });
      return;
    }
    setSavedUploadInstructions(text);
    setUpload((u) => (u ? { ...u, teacher_instructions: text || null } : u));
  }, [uploadInstructions, savedUploadInstructions, uploadId, toast]);

  const saveInstructions = useCallback(async () => {
    if (!selectedSubId) return;
    const text = instructions.trim();
    if (text === savedInstructions) return;
    setInstructionsSaving(true);
    const { data, error: iErr } = await db.from("sub_lessons").update({ instructions: text || null }).eq("id", selectedSubId).select("id");
    setInstructionsSaving(false);
    if (iErr || !data || data.length === 0) {
      toast({ title: "Couldn't save the instructions", description: iErr?.message ?? "Has sql/2026-09-16_sub_lessons.sql been run?", variant: "destructive" });
      return;
    }
    setSavedInstructions(text);
    setSubLessons((prev) => prev.map((s) => (s.id === selectedSubId ? { ...s, instructions: text || null } : s)));
  }, [instructions, savedInstructions, selectedSubId, toast]);

  // --- Legacy upload (extracted by v1: no source pages) --------------------
  const [upgrading, setUpgrading] = useState(false);
  const needsVerification = allChunks.length === 0;
  const upgrade = useCallback(async () => {
    const text = (upload?.extracted_text ?? "").trim();
    if (!text) {
      toast({ title: "No stored text for this upload", description: "Upload the PDF again to extract it with verification.", variant: "destructive" });
      return;
    }
    setUpgrading(true);
    try {
      const { status, data } = await runSteppedExtraction({ uploadId, extractedText: text, reextract: true });
      if (status === 422) throw new Error(data?.insufficientSourceReason || data?.errors?.join(" • ") || "Not enough readable text.");
      if (!data?.success) throw new Error(functionError(status, data, "Verification failed"));
      toast({
        title: "Verified against your material",
        description: `${data.conceptsCount ?? 0} concepts · ${data.vocabularyCount ?? 0} terms · ${data.objectivesCount ?? 0} objectives · ${data.verifiedCount ?? 0} found in source${data.failedCount ? ` · ${data.failedCount} not found` : ""}. Mark what matters, then regenerate the questions.`,
      });
      snapshotRef.current.clear(); // new items: take a fresh baseline on reload
      await load({ silent: true });
    } catch (err) {
      toast({ title: "Couldn't verify this upload", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    } finally {
      setUpgrading(false);
    }
  }, [upload, uploadId, load, toast]);

  const legacyQuestions =
    !!questionStats && questionStats.total - questionStats.teacherAuthored > 0 && questionStats.verified === 0 && questionStats.failed === 0;

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
  const conceptTabCount = scoped.concepts.length + scoped.learning_objectives.length;
  // Upload-level extraction notes ("[extract] ..."): pages that produced nothing.
  const extractNotes = (upload.insufficient_source_reason ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("[extract]"))
    .map((l) => l.replace(/^\[extract\]\s*/, ""));
  const busyAll = generating || building || upgrading;

  const renderConcept = (c: ConceptRow) => (
    <CurationItemCard
      title={c.name}
      description={c.definition}
      pageRef={pageRefFor(c.source_chunk_ids, allChunks)}
      status={c.teacher_status}
      groundingFailed={failedOf(c)}
      busy={busyIds.has(c.id)}
      onEmphasize={() => void mark("concepts", c.id, "emphasized")}
      onRemoveEmphasis={() => void mark("concepts", c.id, "active")}
      onTrash={() => void mark("concepts", c.id, "trashed")}
      onRestore={() => void mark("concepts", c.id, "active")}
    />
  );
  const renderVocab = (v: VocabRow) => (
    <CurationItemCard
      title={v.term}
      description={v.definition}
      pageRef={pageRefFor(v.source_chunk_ids, allChunks)}
      status={v.teacher_status}
      groundingFailed={failedOf(v)}
      busy={busyIds.has(v.id)}
      onEmphasize={() => void mark("vocabulary", v.id, "emphasized")}
      onRemoveEmphasis={() => void mark("vocabulary", v.id, "active")}
      onTrash={() => void mark("vocabulary", v.id, "trashed")}
      onRestore={() => void mark("vocabulary", v.id, "active")}
    />
  );
  const renderObjective = (o: ObjectiveRow) => (
    <CurationItemCard
      title={o.objective}
      pageRef={pageRefFor(o.source_chunk_ids, allChunks)}
      status={o.teacher_status}
      groundingFailed={failedOf(o)}
      busy={busyIds.has(o.id)}
      onEmphasize={() => void mark("learning_objectives", o.id, "emphasized")}
      onRemoveEmphasis={() => void mark("learning_objectives", o.id, "active")}
      onTrash={() => void mark("learning_objectives", o.id, "trashed")}
      onRestore={() => void mark("learning_objectives", o.id, "active")}
    />
  );
  const unplacedNote = "Not placed in any lesson: these could not be matched to a page, so they are never used as a guide.";

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="border-emerald-100 shadow-sm dark:border-emerald-900">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Review what was extracted</CardTitle>
          <CardDescription>
            Everything below came from <span className="font-medium">{upload.file_name}</span>. Emphasize what matters most, trash what should stay out. Marks save as you click.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {extractNotes.length > 0 && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <div className="space-y-0.5">
                <p className="font-semibold">Some pages produced nothing during extraction.</p>
                {extractNotes.map((n, i) => (
                  <p key={i}>{n}</p>
                ))}
                <p>Everything else was kept. Re-extract the file to try those pages again.</p>
              </div>
            </div>
          )}
          {!needsVerification && subLessons.length > 0 && (
            <SubLessonBar
              subLessons={subLessons}
              chunks={allChunks}
              selectedId={selectedSubId}
              onSelect={(id) => {
                setSelectedSubId(id);
                setQuestionStats(null);
              }}
              onSplit={() => setSplitOpen(true)}
              states={subStates}
              disabled={busyAll}
            />
          )}

          {/* Stats row: the selected lesson, always visible above the tabs */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            <StatTile label="Pages" value={stats.pages} />
            <StatTile label="Words" value={stats.words} />
            <StatTile label="Vocab terms" value={scoped.vocabulary.length} />
            <StatTile label="Concepts" value={scoped.concepts.length} />
            <StatTile label="Objectives" value={scoped.learning_objectives.length} />
            <StatTile label="Questions" value={questionCount} />
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)} className="w-full">
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-slate-100 p-1 dark:bg-slate-800">
              <TabsTrigger value="vocabulary" className="gap-1 text-xs sm:text-sm">
                <BookMarked className="h-3.5 w-3.5" /> Vocabulary <TabBadge n={scoped.vocabulary.length} />
              </TabsTrigger>
              <TabsTrigger value="concepts" className="gap-1 text-xs sm:text-sm">
                <Lightbulb className="h-3.5 w-3.5" /> Concepts <TabBadge n={conceptTabCount} />
              </TabsTrigger>
              <TabsTrigger value="questions" className="gap-1 text-xs sm:text-sm">
                <HelpCircle className="h-3.5 w-3.5" /> Questions <TabBadge n={questionCount} />
              </TabsTrigger>
              <TabsTrigger value="pages" className="gap-1 text-xs sm:text-sm">
                <FileText className="h-3.5 w-3.5" /> Source Pages <TabBadge n={chunks.length} />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vocabulary" className="space-y-6 pt-3">
              <CurationSection<VocabRow>
                title="Vocabulary"
                icon={<BookMarked className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                description="Terms defined on this lesson's pages. Emphasized terms are used in the lesson text and get at least one question. A term cited from two lessons' pages appears in both, with one shared mark."
                items={scoped.vocabulary}
                getStatus={(v) => v.teacher_status}
                getKey={(v) => v.id}
                renderItem={renderVocab}
              />
              {unplaced.vocabulary.length > 0 && (
                <CurationSection<VocabRow>
                  title="Not placed"
                  icon={<ShieldQuestion className="h-4 w-4 text-slate-400" />}
                  description={unplacedNote}
                  items={unplaced.vocabulary}
                  getStatus={(v) => v.teacher_status}
                  getKey={(v) => v.id}
                  renderItem={renderVocab}
                />
              )}
            </TabsContent>

            <TabsContent value="concepts" className="space-y-6 pt-3">
              <CurationSection<ConceptRow>
                title="Concepts"
                icon={<Lightbulb className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                description="Emphasized concepts get their own slide and at least three questions."
                items={scoped.concepts}
                getStatus={(c) => c.teacher_status}
                getKey={(c) => c.id}
                renderItem={renderConcept}
              />
              <CurationSection<ObjectiveRow>
                title="Learning objectives"
                icon={<ListChecks className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                items={scoped.learning_objectives}
                getStatus={(o) => o.teacher_status}
                getKey={(o) => o.id}
                emptyText="This lesson's pages did not state any learning objectives explicitly, so none were invented."
                renderItem={renderObjective}
              />
              {unplaced.concepts.length > 0 && (
                <CurationSection<ConceptRow>
                  title="Not placed"
                  icon={<ShieldQuestion className="h-4 w-4 text-slate-400" />}
                  description={unplacedNote}
                  items={unplaced.concepts}
                  getStatus={(c) => c.teacher_status}
                  getKey={(c) => c.id}
                  renderItem={renderConcept}
                />
              )}
              {unplaced.learning_objectives.length > 0 && (
                <CurationSection<ObjectiveRow>
                  title="Not placed objectives"
                  icon={<ShieldQuestion className="h-4 w-4 text-slate-400" />}
                  description={unplacedNote}
                  items={unplaced.learning_objectives}
                  getStatus={(o) => o.teacher_status}
                  getKey={(o) => o.id}
                  renderItem={renderObjective}
                />
              )}
            </TabsContent>

            {/* forceMount: the panel reports counts the build area needs even before this tab is opened. */}
            <TabsContent value="questions" className="pt-3" forceMount>
              {needsVerification ? (
                <p className="rounded-lg border border-dashed border-slate-200 p-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  Verify this upload against your material (below) before working with questions.
                </p>
              ) : selectedSubId ? (
                <QuestionApprovalPanel
                  key={`${selectedSubId}-${panelKey}`}
                  uploadId={uploadId}
                  subLessonId={selectedSubId}
                  onCountsChange={onCountsChange}
                  starCap={settings.masteryRequired}
                  allowAuthoring
                  concepts={conceptOptions}
                />
              ) : null}
            </TabsContent>

            <TabsContent value="pages" className="pt-3">
              <SourcePagesSection chunks={chunks} busyIds={busyIds} onMark={(id, next) => void mark("curriculum_source_chunks", id, next)} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-emerald-100 shadow-sm dark:border-emerald-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-slate-900 dark:text-slate-100">
            <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Build {selectedSub && subLessons.length > 1 ? `“${selectedSub.title}”` : "the lesson"}
          </CardTitle>
          <CardDescription>{marksSummary}</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedSub && (
            <GenerationSettingsPanel
              value={settings}
              onChange={(next) => void updateSettings(next)}
              disabled={busyAll}
              hasQuestions={!!questionStats && questionStats.total > 0}
              starredCount={starredCount}
              className="mb-5"
            />
          )}
          <GenerationPanel
            uploadId={uploadId}
            subLessonTitle={selectedSub?.title ?? fileName}
            coverage={selectedSub?.coverage_report ?? null}
            insufficientReason={selectedSub?.insufficient_source_reason ?? null}
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
            uploadInstructions={uploadInstructions}
            onUploadInstructionsChange={setUploadInstructions}
            onUploadInstructionsBlur={() => void saveUploadInstructions()}
            uploadInstructionsSaving={uploadInstructionsSaving}
            instructions={instructions}
            onInstructionsChange={setInstructions}
            onInstructionsBlur={() => void saveInstructions()}
            instructionsSaving={instructionsSaving}
            starredOverage={starredOverage}
            approvingLesson={approvingLesson}
            onApproveLesson={(a) => void approveLesson(a)}
            needsVerification={needsVerification}
            legacyQuestions={legacyQuestions}
            upgrading={upgrading}
            onUpgrade={() => void upgrade()}
          />
        </CardContent>
      </Card>

      <SplitLessonsDialog
        open={splitOpen}
        onOpenChange={setSplitOpen}
        uploadId={uploadId}
        subLessons={subLessons}
        chunks={allChunks}
        onSaved={() => {
          snapshotRef.current.clear();
          void load({ silent: true });
        }}
      />
    </div>
  );
};

export default CurationReview;
