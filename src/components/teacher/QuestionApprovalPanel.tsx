import React, { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Pencil,
  Quote,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Trash2,
  Undo2,
  X,
} from "lucide-react";

/**
 * Teacher approve / edit / reject panel for generated questions.
 *
 * Renders on the teacher's post-generation screens (PreviewLessonModal for an
 * upload's pending pool, TeacherLessonReview for a lesson's mastery pool).
 * Approve writes generated_questions.teacher_approved_at (+ _by); students can
 * only read approved rows. Reject deletes the row. Edit sends the row through
 * verify-question-v2, which re-runs source verification and clears approval.
 *
 * A row with grounding_status = 'failed' shows the red "Not found in source"
 * badge and can only be edited or deleted; the DB trigger enforces the same.
 *
 * Columns added by sql/2026-09-11_teacher_approval.sql are read with select("*")
 * so the panel still renders (read-only) if the SQL has not been run yet.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;
const LETTERS = ["A", "B", "C", "D", "E", "F"];

export interface ApprovalCounts {
  total: number;
  approved: number;
  verified: number;
  failed: number;
}

export interface QuestionApprovalPanelProps {
  /** Upload mode: the upload's pending pool (status = 'pending'). */
  uploadId?: string;
  /** Lesson mode: rows linked to this lesson. Takes precedence over uploadId. */
  lessonId?: string;
  onCountsChange?: (counts: ApprovalCounts) => void;
  className?: string;
}

interface QuestionRow {
  id: string;
  upload_id: string | null;
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

export function GroundingBadge({ status }: { status: string | null | undefined }) {
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

export const QuestionApprovalPanel: React.FC<QuestionApprovalPanelProps> = ({
  uploadId,
  lessonId,
  onCountsChange,
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

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let query = db.from("generated_questions").select("*");
      if (lessonId) query = query.eq("lesson_id", lessonId);
      else if (uploadId) query = query.eq("upload_id", uploadId).eq("status", "pending");
      else throw new Error("QuestionApprovalPanel needs an uploadId or a lessonId.");
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
  }, [uploadId, lessonId]);

  useEffect(() => {
    void load();
  }, [load]);

  const counts = useMemo<ApprovalCounts>(
    () => ({
      total: rows.length,
      approved: rows.filter((r) => !!r.teacher_approved_at).length,
      verified: rows.filter((r) => r.grounding_status === "verified").length,
      failed: rows.filter((r) => r.grounding_status === "failed").length,
    }),
    [rows],
  );
  useEffect(() => {
    onCountsChange?.(counts);
  }, [counts, onCountsChange]);

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
      const { data, error: uErr } = await db
        .from("generated_questions")
        .update({ teacher_approved_at: null, teacher_approved_by: null })
        .eq("id", row.id)
        .select("id, teacher_approved_at, teacher_approved_by")
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

  const handleApproveAllVerified = async () => {
    // Only rows that were found in the source. Failed rows are always skipped;
    // unverified (legacy) rows need an individual decision.
    const ids = rows.filter((r) => r.grounding_status === "verified" && !r.teacher_approved_at).map((r) => r.id);
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
    if (!draft.evidence_quote.trim()) {
      setDraftError("Paste the exact sentence from your material that makes the answer true. Verification needs it.");
      return;
    }
    setBusyId(draft.id);
    setDraftError("");
    try {
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

  const approvable = rows.filter((r) => r.grounding_status === "verified" && !r.teacher_approved_at).length;

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
    return <p className={cn("py-8 text-center text-sm text-slate-500", className)}>No questions to review.</p>;
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
        "Not found in source" can be edited or deleted but not approved.
      </p>

      {rows.map((q, qi) => {
        const failed = q.grounding_status === "failed";
        const approved = !!q.teacher_approved_at;
        const busy = busyId === q.id;
        const pages = pageLabel(q, chunks);
        const editing = draft?.id === q.id;

        return (
          <div
            key={q.id}
            className={cn(
              "space-y-3 rounded-lg border bg-white p-4",
              failed ? "border-red-200" : approved ? "border-emerald-200" : "border-slate-200",
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">{qi + 1}.</span>
              <GroundingBadge status={q.grounding_status} />
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
            </div>

            {editing && draft ? (
              <div className="space-y-3">
                <Textarea
                  value={draft.question_text}
                  onChange={(e) => setDraft({ ...draft, question_text: e.target.value })}
                  placeholder="Question"
                  rows={2}
                />
                <div className="space-y-1.5">
                  {draft.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={draft.correctIndex === oi}
                        onChange={() => setDraft({ ...draft, correctIndex: oi })}
                        aria-label={`Option ${LETTERS[oi]} is correct`}
                      />
                      <span className="w-4 text-xs font-semibold text-slate-500">{LETTERS[oi]}.</span>
                      <Input
                        value={opt}
                        onChange={(e) => {
                          const options = [...draft.options];
                          options[oi] = e.target.value;
                          setDraft({ ...draft, options });
                        }}
                        placeholder={`Option ${LETTERS[oi]}`}
                      />
                    </div>
                  ))}
                </div>
                <Textarea
                  value={draft.explanation}
                  onChange={(e) => setDraft({ ...draft, explanation: e.target.value })}
                  placeholder="Explanation (only what the quote says)"
                  rows={2}
                />
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Evidence quote (exact text from your material)</label>
                  <Textarea
                    value={draft.evidence_quote}
                    onChange={(e) => setDraft({ ...draft, evidence_quote: e.target.value })}
                    placeholder="Paste the sentence word for word"
                    rows={2}
                  />
                </div>
                {draftError && <p className="text-xs text-red-700">{draftError}</p>}
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => void saveEdit()} disabled={busy} className="bg-emerald-600 text-white hover:bg-emerald-700">
                    {busy ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />}
                    Save and verify
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
                {approved && (
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
                    <Trash2 className="mr-1.5 h-3.5 w-3.5" /> {failed ? "Delete" : "Reject"}
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
