import React, { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { DEFAULT_STAR_CAP, difficultyWord, isTeacherAuthored, type QuestionOrigin } from "@/components/teacher/curation/api";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Pencil,
  PenLine,
  Plus,
  Quote,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Star,
  Trash2,
  Undo2,
  X,
} from "lucide-react";

/**
 * Teacher approve / edit / reject / star panel for the question bank, plus
 * the "Add question" form for teacher-written questions.
 *
 * Renders on the Questions tab of the curriculum page (upload mode: the
 * upload's pending pool) and on TeacherLessonReview (lesson mode: rows linked
 * to a lesson). Approve writes generated_questions.teacher_approved_at (+ _by);
 * students can only read approved rows. Reject deletes the row.
 *
 * Generated rows: Edit sends the row through verify-question-v2, which re-runs
 * source verification and clears approval. A row with grounding_status =
 * 'failed' shows the red "Not found in source" badge and can only be edited
 * or deleted; the DB trigger enforces the same.
 *
 * Teacher-authored rows (origin = 'teacher_authored'): written here, approved
 * on save by the DB insert guard, never verified against the sources, never
 * replaced by regeneration. They show a neutral "Written by you" badge, no
 * evidence box, and save edits directly (the update trigger keeps them
 * approved). SQL: sql/2026-09-15_teacher_questions_and_stages.sql.
 *
 * Star: every student gets a starred question (always in the mastery pool,
 * served before rotation). Capped per upload at `starCap` (the mastery pass
 * mark); the DB trigger enforces the same cap.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;
const LETTERS = ["A", "B", "C", "D", "E", "F"];

export interface ApprovalCounts {
  total: number;
  approved: number;
  verified: number;
  failed: number;
  starred: number;
  teacherAuthored: number;
}

export interface ConceptOption {
  id: string;
  name: string;
}

export interface QuestionApprovalPanelProps {
  /** Upload mode: the upload's pending pool (status = 'pending'). */
  uploadId?: string;
  /** Upload mode: narrow the pool to one sub-lesson (generated_questions.sub_lesson_id). New questions are written into it. */
  subLessonId?: string | null;
  /** Lesson mode: rows linked to this lesson. Takes precedence over uploadId. */
  lessonId?: string;
  onCountsChange?: (counts: ApprovalCounts) => void;
  /** Maximum starred questions for this upload (generation_settings.masteryRequired). Default 4. */
  starCap?: number;
  /** Show the "Add question" form (upload mode only). */
  allowAuthoring?: boolean;
  /** Concepts the teacher can attach a written question to (optional, for coverage). */
  concepts?: ConceptOption[];
  className?: string;
}

export interface QuestionRow {
  id: string;
  upload_id: string | null;
  concept_id?: string | null;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string | null;
  difficulty?: number | null;
  status?: string | null;
  grounding_status?: string | null;
  evidence_quote?: string | null;
  source_chunk_ids?: string[] | null;
  teacher_approved_at?: string | null;
  teacher_approved_by?: string | null;
  origin?: QuestionOrigin | null;
  starred?: boolean | null;
}

interface ChunkRow {
  id: string;
  page_start: number | null;
  page_end: number | null;
}

interface EditDraft {
  id: string;
  question_text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  evidence_quote: string;
}

interface NewDraft {
  question_text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  concept_id: string;
}

const EMPTY_NEW: NewDraft = { question_text: "", options: ["", "", "", ""], correctIndex: 0, explanation: "", difficulty: "medium", concept_id: "" };
const DIFFICULTY_NUM: Record<NewDraft["difficulty"], number> = { easy: 0.25, medium: 0.5, hard: 0.75 };
const NONE_CONCEPT = "__none__";

function correctIndexOf(options: string[], correctAnswer: string | null | undefined): number {
  const ca = (correctAnswer ?? "").trim();
  const direct = options.findIndex((o) => o.trim() === ca);
  if (direct >= 0) return direct;
  const m = ca.match(/^([A-Fa-f])[).:\s]?$/);
  return m ? LETTERS.indexOf(m[1].toUpperCase()) : -1;
}

function pageLabel(row: QuestionRow, chunks: Map<string, ChunkRow>): string | null {
  const labels: string[] = [];
  for (const id of row.source_chunk_ids ?? []) {
    const c = chunks.get(id);
    if (!c || c.page_start == null) continue;
    labels.push(c.page_end != null && c.page_end !== c.page_start ? `pp. ${c.page_start}-${c.page_end}` : `p. ${c.page_start}`);
  }
  return labels.length ? [...new Set(labels)].join(", ") : null;
}

/** Grounding badge for a row. Teacher-authored rows get the neutral "Written by you" badge, never a grounding badge. */
export function GroundingBadge({ status, origin }: { status: string | null | undefined; origin?: QuestionOrigin | null }) {
  if (origin === "teacher_authored") {
    return (
      <Badge variant="outline" className="gap-1 border-sky-200 bg-sky-50 text-[11px] text-sky-800 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200">
        <PenLine className="h-3 w-3" /> Written by you
      </Badge>
    );
  }
  if (status === "verified") {
    return (
      <Badge variant="success" className="gap-1 text-[11px]">
        <ShieldCheck className="h-3 w-3" /> Found in source
      </Badge>
    );
  }
  if (status === "failed") {
    return (
      <Badge variant="destructive" className="gap-1 text-[11px]">
        <ShieldAlert className="h-3 w-3" /> Not found in source
      </Badge>
    );
  }
  return (
    <Badge variant="muted" className="gap-1 text-[11px]">
      <ShieldQuestion className="h-3 w-3" /> Not verified
    </Badge>
  );
}

function OptionsEditor({
  name,
  options,
  correctIndex,
  onChange,
}: {
  name: string;
  options: string[];
  correctIndex: number;
  onChange: (options: string[], correctIndex: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      {options.map((opt, oi) => (
        <div key={oi} className="flex items-center gap-2">
          <input type="radio" name={name} checked={correctIndex === oi} onChange={() => onChange(options, oi)} aria-label={`Option ${LETTERS[oi]} is correct`} />
          <span className="w-4 text-xs font-semibold text-slate-500">{LETTERS[oi]}.</span>
          <Input
            value={opt}
            onChange={(e) => {
              const next = [...options];
              next[oi] = e.target.value;
              onChange(next, correctIndex);
            }}
            placeholder={`Option ${LETTERS[oi]}`}
          />
        </div>
      ))}
      <p className="text-[11px] text-slate-500">Select the radio next to the correct option.</p>
    </div>
  );
}

export const QuestionApprovalPanel: React.FC<QuestionApprovalPanelProps> = ({
  uploadId,
  subLessonId = null,
  lessonId,
  onCountsChange,
  starCap = DEFAULT_STAR_CAP,
  allowAuthoring = false,
  concepts = [],
  className,
}) => {
  const { toast } = useToast();
  const [rows, setRows] = useState<QuestionRow[]>([]);
  const [chunks, setChunks] = useState<Map<string, ChunkRow>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [draft, setDraft] = useState<EditDraft | null>(null);
  const [draftError, setDraftError] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "Easy" | "Medium" | "Hard">("all");
  const [adding, setAdding] = useState(false);
  const [newDraft, setNewDraft] = useState<NewDraft>(EMPTY_NEW);
  const [newError, setNewError] = useState("");
  const [savingNew, setSavingNew] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let query = db.from("generated_questions").select("*");
      if (lessonId) query = query.eq("lesson_id", lessonId);
      else if (uploadId) {
        query = query.eq("upload_id", uploadId).eq("status", "pending");
        if (subLessonId) query = query.eq("sub_lesson_id", subLessonId);
      } else throw new Error("QuestionApprovalPanel needs an uploadId or a lessonId.");
      const { data, error: qErr } = await query.order("created_at", { ascending: true });
      if (qErr) throw new Error(qErr.message);
      const list = (data as QuestionRow[] | null) ?? [];
      setRows(list);

      const sourceUploadId = uploadId ?? list[0]?.upload_id ?? null;
      if (sourceUploadId) {
        const { data: chunkData } = await db
          .from("curriculum_source_chunks")
          .select("id, page_start, page_end")
          .eq("upload_id", sourceUploadId);
        const map = new Map<string, ChunkRow>();
        for (const c of (chunkData as ChunkRow[] | null) ?? []) map.set(c.id, c);
        setChunks(map);
      } else {
        setChunks(new Map());
      }
    } catch (err) {
      console.error("Question approval load failed:", err);
      setError(err instanceof Error ? err.message : "Could not load the questions.");
    } finally {
      setLoading(false);
    }
  }, [uploadId, subLessonId, lessonId]);

  useEffect(() => {
    void load();
  }, [load]);

  const counts = useMemo<ApprovalCounts>(
    () => ({
      total: rows.length,
      approved: rows.filter((r) => !!r.teacher_approved_at).length,
      verified: rows.filter((r) => !isTeacherAuthored(r) && r.grounding_status === "verified").length,
      failed: rows.filter((r) => !isTeacherAuthored(r) && r.grounding_status === "failed").length,
      starred: rows.filter((r) => r.starred === true).length,
      teacherAuthored: rows.filter(isTeacherAuthored).length,
    }),
    [rows],
  );
  // Only report counts once real rows are loaded. Reporting the empty initial
  // state made parents believe the upload had no questions and unmount this
  // panel before its data arrived.
  useEffect(() => {
    if (loading) return;
    onCountsChange?.(counts);
  }, [counts, loading, onCountsChange]);

  const replaceRow = (next: QuestionRow) => setRows((prev) => prev.map((r) => (r.id === next.id ? { ...r, ...next } : r)));

  const currentUserId = async (): Promise<string> => {
    const { data } = await supabase.auth.getUser();
    if (!data?.user) throw new Error("You must be signed in.");
    return data.user.id;
  };

  const approve = async (ids: string[]) => {
    if (ids.length === 0) return;
    const uid = await currentUserId();
    const { data, error: uErr } = await db
      .from("generated_questions")
      .update({ teacher_approved_at: new Date().toISOString(), teacher_approved_by: uid })
      .in("id", ids)
      .select("id, teacher_approved_at, teacher_approved_by");
    if (uErr) throw new Error(uErr.message);
    const updated = (data as QuestionRow[] | null) ?? [];
    if (updated.length === 0) throw new Error("Nothing was approved. Has the approval SQL been run?");
    for (const u of updated) replaceRow(u);
    return updated.length;
  };

  const handleApprove = async (row: QuestionRow) => {
    setBusyId(row.id);
    try {
      await approve([row.id]);
    } catch (err) {
      toast({ title: "Couldn't approve", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    } finally {
      setBusyId(null);
    }
  };

  const handleUnapprove = async (row: QuestionRow) => {
    setBusyId(row.id);
    try {
      // An unapproved question cannot reach students, so it cannot stay starred.
      const { data, error: uErr } = await db
        .from("generated_questions")
        .update({ teacher_approved_at: null, teacher_approved_by: null, starred: false })
        .eq("id", row.id)
        .select("id, teacher_approved_at, teacher_approved_by, starred")
        .single();
      if (uErr) throw new Error(uErr.message);
      replaceRow(data as QuestionRow);
    } catch (err) {
      toast({ title: "Couldn't undo approval", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (row: QuestionRow) => {
    setBusyId(row.id);
    try {
      const { data, error: dErr } = await db.from("generated_questions").delete().eq("id", row.id).select("id");
      if (dErr) throw new Error(dErr.message);
      if (!data || data.length === 0) throw new Error("Nothing was deleted. Has the approval SQL been run?");
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      setConfirmDeleteId(null);
    } catch (err) {
      toast({ title: "Couldn't delete", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    } finally {
      setBusyId(null);
    }
  };

  const handleToggleStar = async (row: QuestionRow) => {
    const next = !row.starred;
    if (next && counts.starred >= starCap) return;
    setBusyId(row.id);
    try {
      const { data, error: uErr } = await db.from("generated_questions").update({ starred: next }).eq("id", row.id).select("id, starred").single();
      if (uErr) throw new Error(uErr.message);
      replaceRow(data as QuestionRow);
    } catch (err) {
      toast({
        title: next ? "Couldn't star this question" : "Couldn't unstar this question",
        description: err instanceof Error ? err.message : "Please try again. Has sql/2026-09-15_teacher_questions_and_stages.sql been run?",
        variant: "destructive",
      });
    } finally {
      setBusyId(null);
    }
  };

  const handleApproveAllVerified = async () => {
    // Only rows that were found in the source. Failed rows are always skipped;
    // unverified (legacy) rows need an individual decision. Teacher-written
    // rows are approved on save and never appear here.
    const ids = rows.filter((r) => !isTeacherAuthored(r) && r.grounding_status === "verified" && !r.teacher_approved_at).map((r) => r.id);
    if (ids.length === 0) return;
    setBulkBusy(true);
    try {
      const n = await approve(ids);
      toast({ title: `Approved ${n} verified question${n === 1 ? "" : "s"}` });
    } catch (err) {
      toast({ title: "Bulk approve failed", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    } finally {
      setBulkBusy(false);
    }
  };

  const startEdit = (row: QuestionRow) => {
    const options = [...(row.options ?? [])];
    while (options.length < 4) options.push("");
    setDraftError("");
    setDraft({
      id: row.id,
      question_text: row.question_text,
      options,
      correctIndex: Math.max(0, correctIndexOf(row.options ?? [], row.correct_answer)),
      explanation: row.explanation ?? "",
      evidence_quote: row.evidence_quote ?? "",
    });
  };

  const saveEdit = async () => {
    if (!draft) return;
    const row = rows.find((r) => r.id === draft.id);
    if (!row) return;
    const teacherRow = isTeacherAuthored(row);
    const options = draft.options.map((o) => o.trim()).filter(Boolean);
    if (!draft.question_text.trim() || options.length < 2) {
      setDraftError("Write the question and at least two options.");
      return;
    }
    const correct = draft.options[draft.correctIndex]?.trim();
    if (!correct) {
      setDraftError("Pick a correct option that has text.");
      return;
    }
    if (!teacherRow && !draft.evidence_quote.trim()) {
      setDraftError("Paste the exact sentence from your material that makes the answer true. Verification needs it.");
      return;
    }
    setBusyId(draft.id);
    setDraftError("");
    try {
      if (teacherRow) {
        // Teacher-written: saved as is. The update trigger leaves approval in
        // place for origin = 'teacher_authored'; nothing is verified.
        const { data, error: uErr } = await db
          .from("generated_questions")
          .update({ question_text: draft.question_text.trim(), options, correct_answer: correct, explanation: draft.explanation.trim() })
          .eq("id", draft.id)
          .select("*")
          .single();
        if (uErr) throw new Error(uErr.message);
        replaceRow(data as QuestionRow);
        setDraft(null);
        toast({ title: "Question saved", description: "It stays approved: questions you write are not checked against the source." });
        return;
      }
      const { data, error: fnErr } = await supabase.functions.invoke("verify-question-v2", {
        body: {
          questionId: draft.id,
          question_text: draft.question_text.trim(),
          options,
          correct_answer: correct,
          explanation: draft.explanation.trim(),
          evidence_quote: draft.evidence_quote.trim(),
        },
      });
      if (fnErr) throw new Error(fnErr.message);
      if (!data?.success) throw new Error((data?.errors && data.errors.join(" • ")) || "Verification failed.");
      const { data: fresh, error: rErr } = await db.from("generated_questions").select("*").eq("id", draft.id).single();
      if (rErr) throw new Error(rErr.message);
      replaceRow(fresh as QuestionRow);
      setDraft(null);
      toast({
        title: data.grounding_status === "verified" ? "Saved and verified" : "Saved, but not found in source",
        description:
          data.grounding_status === "verified"
            ? "You can approve the edited question now."
            : data.reason || "Edit the quote or the answer and try again.",
        variant: data.grounding_status === "verified" ? undefined : "destructive",
      });
    } catch (err) {
      setDraftError(err instanceof Error ? err.message : "Could not save the question.");
    } finally {
      setBusyId(null);
    }
  };

  const saveNew = async () => {
    if (!uploadId) return;
    const options = newDraft.options.map((o) => o.trim());
    if (!newDraft.question_text.trim()) {
      setNewError("Write the question.");
      return;
    }
    if (options.some((o) => !o)) {
      setNewError("Fill in all four options.");
      return;
    }
    if (new Set(options).size !== options.length) {
      setNewError("Options must be different from each other.");
      return;
    }
    const correct = options[newDraft.correctIndex];
    setSavingNew(true);
    setNewError("");
    try {
      const uid = await currentUserId();
      // correct_answer is the exact option text: that is how the lesson
      // builder and the player match the right option. The DB insert guard
      // stamps origin, approval and status; the values here mirror it so the
      // returned row is complete even before the trigger exists.
      const { data, error: iErr } = await db
        .from("generated_questions")
        .insert({
          upload_id: uploadId,
          sub_lesson_id: subLessonId,
          concept_id: newDraft.concept_id || null,
          question_text: newDraft.question_text.trim(),
          options,
          correct_answer: correct,
          explanation: newDraft.explanation.trim() || null,
          difficulty: DIFFICULTY_NUM[newDraft.difficulty],
          status: "pending",
          origin: "teacher_authored",
          teacher_approved_at: new Date().toISOString(),
          teacher_approved_by: uid,
        })
        .select("*")
        .single();
      if (iErr) throw new Error(iErr.message);
      setRows((prev) => [...prev, data as QuestionRow]);
      setNewDraft(EMPTY_NEW);
      setAdding(false);
      toast({ title: "Question added", description: "It is approved and will be in the mastery pool when you build the lesson." });
    } catch (err) {
      setNewError(err instanceof Error ? err.message : "Could not save the question. Has sql/2026-09-15_teacher_questions_and_stages.sql been run?");
    } finally {
      setSavingNew(false);
    }
  };

  const approvable = rows.filter((r) => !isTeacherAuthored(r) && r.grounding_status === "verified" && !r.teacher_approved_at).length;
  const visibleRows = difficultyFilter === "all" ? rows : rows.filter((r) => difficultyWord(r.difficulty) === difficultyFilter);
  const starFull = counts.starred >= starCap;

  const addForm = allowAuthoring && uploadId && (
    <div className="rounded-lg border border-sky-200 bg-sky-50/40 p-4 dark:border-sky-800 dark:bg-sky-950/20">
      {!adding ? (
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Add your own question</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Questions you write are approved as soon as you save them and are never checked against the source. Star one to make sure every student gets it.
            </p>
          </div>
          <Button size="sm" onClick={() => setAdding(true)} className="bg-sky-600 text-white hover:bg-sky-700">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Add question
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">New question</p>
          <Textarea value={newDraft.question_text} onChange={(e) => setNewDraft({ ...newDraft, question_text: e.target.value })} placeholder="Question stem" rows={2} />
          <OptionsEditor name="new-correct" options={newDraft.options} correctIndex={newDraft.correctIndex} onChange={(options, correctIndex) => setNewDraft({ ...newDraft, options, correctIndex })} />
          <Textarea value={newDraft.explanation} onChange={(e) => setNewDraft({ ...newDraft, explanation: e.target.value })} placeholder="Explanation shown after the student answers" rows={2} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="new-difficulty" className="text-xs">Difficulty</Label>
              <Select value={newDraft.difficulty} onValueChange={(v) => setNewDraft({ ...newDraft, difficulty: v as NewDraft["difficulty"] })}>
                <SelectTrigger id="new-difficulty" className="h-8 bg-white text-sm dark:bg-slate-900"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {concepts.length > 0 && (
              <div className="space-y-1">
                <Label htmlFor="new-concept" className="text-xs">Related concept (optional)</Label>
                <Select value={newDraft.concept_id || NONE_CONCEPT} onValueChange={(v) => setNewDraft({ ...newDraft, concept_id: v === NONE_CONCEPT ? "" : v })}>
                  <SelectTrigger id="new-concept" className="h-8 bg-white text-sm dark:bg-slate-900"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NONE_CONCEPT}>None</SelectItem>
                    {concepts.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-slate-500">Counts toward that concept in the coverage report.</p>
              </div>
            )}
          </div>
          {newError && <p className="text-xs text-red-700">{newError}</p>}
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => void saveNew()} disabled={savingNew} className="bg-sky-600 text-white hover:bg-sky-700">
              {savingNew ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />}
              Save question
            </Button>
            <Button size="sm" variant="ghost" onClick={() => { setAdding(false); setNewError(""); }} disabled={savingNew}>
              <X className="mr-1.5 h-3.5 w-3.5" /> Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center gap-2 py-10 text-sm text-slate-500", className)}>
        <Loader2 className="h-5 w-5 animate-spin text-emerald-600" /> Loading questions…
      </div>
    );
  }
  if (error) {
    return (
      <div className={cn("space-y-3 rounded-lg border border-red-200 bg-red-50/60 p-4", className)}>
        <div className="flex items-start gap-2">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
        <Button size="sm" variant="outline" onClick={() => void load()} className="border-red-300 text-red-700 hover:bg-red-100">
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Retry
        </Button>
      </div>
    );
  }
  if (rows.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <p className="py-4 text-center text-sm text-slate-500">No questions yet. Generate the bank, or write your own below.</p>
        {addForm}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Summary + bulk action */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
        <span className="font-medium text-slate-800">
          {counts.approved} of {counts.total} approved
        </span>
        <span>·</span>
        <span>{counts.verified} found in source</span>
        {counts.failed > 0 && (
          <>
            <span>·</span>
            <span className="text-red-700">{counts.failed} not found in source</span>
          </>
        )}
        {counts.teacherAuthored > 0 && (
          <>
            <span>·</span>
            <span className="text-sky-800">{counts.teacherAuthored} written by you</span>
          </>
        )}
        <span>·</span>
        <span className={cn("inline-flex items-center gap-1", starFull ? "font-medium text-amber-700" : "")} title="Starred questions go to every student and are never rotated out">
          <Star className={cn("h-3 w-3", counts.starred > 0 && "fill-amber-400 text-amber-500")} /> Starred {counts.starred} of {starCap}
        </span>
        <Button
          size="sm"
          className="ml-auto bg-emerald-600 text-white hover:bg-emerald-700"
          disabled={bulkBusy || approvable === 0}
          onClick={() => void handleApproveAllVerified()}
        >
          {bulkBusy ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />}
          Approve all verified{approvable > 0 ? ` (${approvable})` : ""}
        </Button>
      </div>
      <p className="text-xs text-slate-500">
        Students only see questions you approve. Check each quote against your own material; questions marked
        "Not found in source" can be edited or deleted but not approved. Questions you wrote are approved already.
      </p>

      {addForm}

      {/* Difficulty filter (from the stored 0..1 difficulty each question carries) */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-500">Show:</span>
        {(["all", "Easy", "Medium", "Hard"] as const).map((f) => {
          const n = f === "all" ? rows.length : rows.filter((r) => difficultyWord(r.difficulty) === f).length;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setDifficultyFilter(f)}
              className={cn(
                "rounded-full border px-2.5 py-1 font-medium transition-colors",
                difficultyFilter === f
                  ? "border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-200"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              {f === "all" ? "All" : f} ({n})
            </button>
          );
        })}
      </div>

      {visibleRows.length === 0 && <p className="py-4 text-center text-xs text-slate-500">No {difficultyFilter.toLowerCase()} questions in this bank.</p>}

      {visibleRows.map((q, qi) => {
        const teacherRow = isTeacherAuthored(q);
        const failed = !teacherRow && q.grounding_status === "failed";
        const approved = !!q.teacher_approved_at;
        const starred = q.starred === true;
        const busy = busyId === q.id;
        const pages = pageLabel(q, chunks);
        const editing = draft?.id === q.id;
        const starDisabledReason = !approved
          ? "Approve this question before starring it: only approved questions reach students."
          : !starred && starFull
            ? `Starred limit reached: ${starCap} of ${starCap}. That is the mastery pass mark, so students would see nothing else. Unstar one first, or raise the pass mark in Lesson settings.`
            : null;

        return (
          <div
            key={q.id}
            className={cn(
              "space-y-3 rounded-lg border bg-white p-4",
              failed ? "border-red-200" : starred ? "border-amber-300 bg-amber-50/30" : teacherRow ? "border-sky-200" : approved ? "border-emerald-200" : "border-slate-200",
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">{qi + 1}.</span>
              <GroundingBadge status={q.grounding_status} origin={q.origin} />
              {difficultyWord(q.difficulty) && (
                <Badge
                  variant={difficultyWord(q.difficulty) === "Hard" ? "warning" : difficultyWord(q.difficulty) === "Easy" ? "success" : "muted"}
                  className="text-[10px]"
                  title="How hard this question is"
                >
                  {difficultyWord(q.difficulty)}
                </Badge>
              )}
              {pages && (
                <Badge variant="outline" className="text-[11px]">
                  {pages}
                </Badge>
              )}
              {approved && (
                <Badge variant="success" className="gap-1 text-[11px]">
                  <CheckCircle2 className="h-3 w-3" /> Approved
                </Badge>
              )}
              {starred && (
                <Badge variant="warning" className="gap-1 text-[11px]">
                  <Star className="h-3 w-3 fill-current" /> Every student gets this
                </Badge>
              )}
              <button
                type="button"
                onClick={() => void handleToggleStar(q)}
                disabled={busy || editing || (!starred && !!starDisabledReason)}
                title={starred ? "Unstar: let rotation decide whether a student sees this" : starDisabledReason ?? "Star: every student gets this question"}
                aria-label={starred ? "Unstar question" : "Star question"}
                aria-pressed={starred}
                className={cn(
                  "ml-auto flex h-7 w-7 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                  starred ? "border-amber-300 bg-amber-100 text-amber-600 hover:bg-amber-200" : "border-slate-200 text-slate-400 hover:border-amber-300 hover:text-amber-500",
                )}
              >
                <Star className={cn("h-4 w-4", starred && "fill-current")} />
              </button>
            </div>

            {editing && draft ? (
              <div className="space-y-3">
                <Textarea
                  value={draft.question_text}
                  onChange={(e) => setDraft({ ...draft, question_text: e.target.value })}
                  placeholder="Question"
                  rows={2}
                />
                <OptionsEditor name={`correct-${q.id}`} options={draft.options} correctIndex={draft.correctIndex} onChange={(options, correctIndex) => setDraft({ ...draft, options, correctIndex })} />
                <Textarea
                  value={draft.explanation}
                  onChange={(e) => setDraft({ ...draft, explanation: e.target.value })}
                  placeholder={teacherRow ? "Explanation shown after the student answers" : "Explanation (only what the quote says)"}
                  rows={2}
                />
                {!teacherRow && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">Evidence quote (exact text from your material)</label>
                    <Textarea
                      value={draft.evidence_quote}
                      onChange={(e) => setDraft({ ...draft, evidence_quote: e.target.value })}
                      placeholder="Paste the sentence word for word"
                      rows={2}
                    />
                  </div>
                )}
                {draftError && <p className="text-xs text-red-700">{draftError}</p>}
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => void saveEdit()} disabled={busy} className="bg-emerald-600 text-white hover:bg-emerald-700">
                    {busy ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : teacherRow ? <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> : <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />}
                    {teacherRow ? "Save" : "Save and verify"}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setDraft(null)} disabled={busy}>
                    <X className="mr-1.5 h-3.5 w-3.5" /> Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-slate-900">{q.question_text}</p>
                <ul className="space-y-1.5">
                  {(q.options ?? []).map((opt, oi) => {
                    const correct = correctIndexOf(q.options ?? [], q.correct_answer) === oi;
                    return (
                      <li
                        key={oi}
                        className={cn(
                          "flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
                          correct ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-100 bg-slate-50 text-slate-600",
                        )}
                      >
                        <span className="font-semibold">{LETTERS[oi]}.</span>
                        <span className="flex-1">{opt}</span>
                        {correct && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />}
                      </li>
                    );
                  })}
                </ul>
                {q.explanation && <p className="rounded-md bg-slate-50 p-3 text-xs text-slate-600">{q.explanation}</p>}
                {/* Evidence: generated rows only. A teacher-written question has no quote by design. */}
                {!teacherRow && (
                  <div
                    className={cn(
                      "flex items-start gap-2 rounded-md border p-3 text-xs",
                      failed ? "border-red-200 bg-red-50/60 text-red-800" : "border-amber-100 bg-amber-50/60 text-amber-900",
                    )}
                  >
                    <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <div className="space-y-0.5">
                      <p className="font-medium">
                        From your material{pages ? ` (${pages})` : ""}:
                      </p>
                      {q.evidence_quote ? (
                        <p className="italic">“{q.evidence_quote}”</p>
                      ) : (
                        <p className="italic">No evidence quote was recorded for this question.</p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {!editing && (
              <div className="flex flex-wrap items-center gap-2">
                {!failed && !approved && (
                  <Button size="sm" onClick={() => void handleApprove(q)} disabled={busy} className="bg-emerald-600 text-white hover:bg-emerald-700">
                    {busy ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />}
                    Approve
                  </Button>
                )}
                {approved && !teacherRow && (
                  <Button size="sm" variant="outline" onClick={() => void handleUnapprove(q)} disabled={busy}>
                    <Undo2 className="mr-1.5 h-3.5 w-3.5" /> Undo approval
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => startEdit(q)} disabled={busy}>
                  <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                </Button>
                {confirmDeleteId === q.id ? (
                  <>
                    <Button size="sm" variant="destructive" onClick={() => void handleDelete(q)} disabled={busy}>
                      {busy ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Trash2 className="mr-1.5 h-3.5 w-3.5" />}
                      Confirm delete
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setConfirmDeleteId(null)} disabled={busy}>
                      Keep
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="ghost" className="text-slate-500 hover:text-red-600" onClick={() => setConfirmDeleteId(q.id)} disabled={busy}>
                    <Trash2 className="mr-1.5 h-3.5 w-3.5" /> {failed || teacherRow ? "Delete" : "Reject"}
                  </Button>
                )}
                {failed && <span className="text-xs text-red-700">Fix the quote or the answer before this can be approved.</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionApprovalPanel;
