/**
 * SplitLessonDialog — preview and confirm splitting one of the teacher's own
 * lessons into two parts.
 *
 * The split is computed client-side (src/lib/lessonSplit.ts) so the teacher can
 * see and adjust it; committing calls the `split_lesson` RPC (sql/lesson_split.sql)
 * which applies the whole thing in one transaction. Part 1 keeps the original id
 * (and any student progress); Part 2 is a new lesson placed right after it.
 */
import React, { useEffect, useMemo, useState } from "react";
import { db } from "@/components/teacher/curation/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { planSplit, type LessonContentLike } from "@/lib/lessonSplit";
import { AlertTriangle, ArrowDown, ArrowUp, Loader2, Scissors } from "lucide-react";

export interface SplitLessonDialogProps {
  lessonId: string;
  lessonName: string;
  open: boolean;
  onClose: () => void;
  /** Called after a successful split so the caller can refresh its lesson list. */
  onSplit?: () => void;
}

/** Drop a trailing " (Part N)" so re-splitting doesn't stack suffixes. */
const baseNameOf = (name: string): string => name.replace(/\s*\(Part \d+\)\s*$/i, "").trim();

export const SplitLessonDialog: React.FC<SplitLessonDialogProps> = ({ lessonId, lessonName, open, onClose, onSplit }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<LessonContentLike | null>(null);
  const [loadError, setLoadError] = useState<string>("");
  const [studentsStarted, setStudentsStarted] = useState(0);
  const [splitIndex, setSplitIndex] = useState<number | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  const baseName = useMemo(() => baseNameOf(lessonName), [lessonName]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setLoadError("");
    setSplitIndex(undefined);
    (async () => {
      const [lessonRes, progressRes] = await Promise.all([
        db.from("lessons").select("content").eq("id", lessonId).single(),
        db
          .from("student_lesson_progress")
          .select("student_id", { count: "exact", head: true })
          .eq("lesson_id", lessonId),
      ]);
      if (cancelled) return;
      if (lessonRes.error) {
        setLoadError(lessonRes.error.message);
        setLoading(false);
        return;
      }
      setContent((lessonRes.data?.content ?? null) as LessonContentLike | null);
      setStudentsStarted(progressRes.count ?? 0);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [open, lessonId]);

  const plan = useMemo(() => planSplit(content, baseName, splitIndex), [content, baseName, splitIndex]);

  const confirm = async () => {
    if (!plan.splittable) return;
    setSubmitting(true);
    try {
      const { data, error } = await db.rpc("split_lesson", {
        p_lesson_id: lessonId,
        p_part1_name: plan.part1.name,
        p_part1_content: { ...(content ?? {}), sections: plan.part1.sections },
        p_part2_name: plan.part2.name,
        p_part2_content: { ...(content ?? {}), sections: plan.part2.sections },
        p_part2_question_ids: plan.part2QuestionIds,
      });
      if (error) throw new Error(error.message);
      const classes = (data as { classes_assigned?: number } | null)?.classes_assigned ?? 0;
      toast({
        title: "Lesson split",
        description:
          `"${plan.part1.name}" and "${plan.part2.name}" are ready` +
          (classes > 0 ? `; Part 2 was added to ${classes} class${classes === 1 ? "" : "es"}.` : "."),
      });
      onSplit?.();
      onClose();
    } catch (err) {
      toast({
        title: "Couldn't split the lesson",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const column = (title: string, labels: string[], masteryCount: number, required: number) => (
    <div className="flex-1 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-2 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</p>
      <ol className="space-y-1">
        {labels.map((label, i) => (
          <li
            key={i}
            className="flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <span className="w-4 shrink-0 text-right text-slate-400">{i + 1}</span>
            <span className="min-w-0 break-words">{label}</span>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Mastery check: {masteryCount} question{masteryCount === 1 ? "" : "s"}
        {masteryCount > 0 ? ` · pass ${required}/${masteryCount}` : ""}
      </p>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o && !submitting) onClose(); }}>
      <DialogContent className="max-h-[92vh] w-[96vw] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scissors className="h-4 w-4 text-emerald-600" /> Split “{baseName}” into two
          </DialogTitle>
          <DialogDescription>
            Part 1 keeps this lesson&apos;s place; Part 2 is created right after it. Move the split point so no
            section is cut in the wrong place.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <p className="flex items-center gap-2 py-8 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading lesson…
          </p>
        ) : loadError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            Couldn&apos;t load this lesson: {loadError}
          </p>
        ) : !plan.splittable ? (
          <p className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-700">
            {plan.reason}
          </p>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              {column(plan.part1.name, plan.part1.teachingLabels, plan.part1.masteryCount, plan.part1.requiredCorrect)}
              {column(plan.part2.name, plan.part2.teachingLabels, plan.part2.masteryCount, plan.part2.requiredCorrect)}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Split point:</span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={plan.splitIndex <= 1}
                onClick={() => setSplitIndex(Math.max(1, plan.splitIndex - 1))}
              >
                <ArrowUp className="mr-1 h-3.5 w-3.5" /> One section to Part 2
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={plan.splitIndex >= plan.maxSplitIndex}
                onClick={() => setSplitIndex(Math.min(plan.maxSplitIndex, plan.splitIndex + 1))}
              >
                <ArrowDown className="mr-1 h-3.5 w-3.5" /> One section to Part 1
              </Button>
            </div>

            {plan.topicAssignments.length > 0 && (
              <div className="rounded-lg border border-slate-200 p-3 text-xs dark:border-slate-700">
                <p className="mb-1.5 font-semibold text-slate-700 dark:text-slate-200">
                  Mastery questions assigned by topic
                </p>
                <ul className="space-y-0.5 text-slate-600 dark:text-slate-300">
                  {plan.topicAssignments.map((a, i) => (
                    <li key={i}>
                      <span className="font-medium">{a.topic}</span>: {a.toPart1} → Part 1, {a.toPart2} → Part 2{" "}
                      <span className="text-slate-400">({a.reason})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(plan.warnings.length > 0 || studentsStarted > 0) && (
              <div className="space-y-1.5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                {plan.warnings.map((w, i) => (
                  <p key={i} className="flex items-start gap-1.5">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {w}
                  </p>
                ))}
                {studentsStarted > 0 && (
                  <p className="flex items-start gap-1.5">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {studentsStarted} student{studentsStarted === 1 ? " has" : "s have"} started this lesson; their
                    progress stays on Part 1.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => void confirm()}
            disabled={submitting || loading || !plan.splittable}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {submitting ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Scissors className="mr-1.5 h-4 w-4" />}
            Confirm split
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SplitLessonDialog;
