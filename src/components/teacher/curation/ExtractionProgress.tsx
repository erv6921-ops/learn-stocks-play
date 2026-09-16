import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { db, EXTRACTION_STAGES, type ExtractionStage } from "./api";

/**
 * Real extraction progress for one upload. Polls curriculum_uploads every
 * 1.5 s while the extract-curriculum-v2 request is in flight and shows the
 * stage the function last wrote (extraction_stage). Nothing here advances on
 * a timer: the bar only moves when the server reports the next step.
 *
 * The stages are the function's real steps. Concepts, vocabulary and
 * objectives come out of ONE model pass, so they share one step rather than
 * being shown as three.
 */
export interface ExtractionProgressProps {
  uploadId: string;
  fileName: string;
  /** Number of pages sent, for the first stage's caption. */
  pageCount?: number;
  className?: string;
}

const POLL_MS = 1500;

export const ExtractionProgress: React.FC<ExtractionProgressProps> = ({ uploadId, fileName, pageCount, className }) => {
  // null = the function has not written a stage yet (request just sent).
  const [stage, setStage] = useState<ExtractionStage | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const tick = async () => {
      const { data } = await db.from("curriculum_uploads").select("extraction_stage, status").eq("id", uploadId).maybeSingle();
      if (cancelled) return;
      if (data) {
        setStage((data.extraction_stage as ExtractionStage | null) ?? null);
        setStatus((data.status as string | null) ?? null);
      }
      timer = setTimeout(() => void tick(), POLL_MS);
    };
    void tick();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [uploadId]);

  const stageIndex = stage ? EXTRACTION_STAGES.findIndex((s) => s.key === stage) : -1;
  // The stage column is cleared when the run finishes; the parent unmounts
  // this component once the request resolves, so "finished" is only briefly
  // visible, but show it truthfully if the status flipped first.
  const finished = stage === null && status === "awaiting_teacher_review" && stageIndex === -1;
  const percent = finished ? 100 : stageIndex >= 0 ? EXTRACTION_STAGES[stageIndex].percent : 3;
  const headline = finished
    ? "Extraction finished"
    : stageIndex >= 0
      ? EXTRACTION_STAGES[stageIndex].label
      : "Sending your pages to the extractor";

  return (
    <div className={cn("space-y-4 rounded-xl border border-emerald-100 bg-white p-5 dark:border-emerald-900 dark:bg-slate-900", className)}>
      <div className="flex items-center gap-2">
        {finished ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{headline}…</p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">{fileName}</p>
        </div>
        <span className="ml-auto text-xs font-medium tabular-nums text-slate-500 dark:text-slate-400">{percent}%</span>
      </div>
      <Progress value={percent} variant="success" className="h-2.5" aria-label="Extraction progress" />
      <ol className="space-y-1.5">
        {EXTRACTION_STAGES.map((s, i) => {
          const done = finished || i < stageIndex;
          const active = !finished && i === stageIndex;
          return (
            <li
              key={s.key}
              className={cn(
                "flex items-center gap-2 text-xs",
                done ? "text-emerald-700 dark:text-emerald-300" : active ? "font-medium text-slate-900 dark:text-slate-100" : "text-slate-400 dark:text-slate-500",
              )}
            >
              {done ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              ) : active ? (
                <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-emerald-600" />
              ) : (
                <Circle className="h-3.5 w-3.5 shrink-0" />
              )}
              <span>
                {s.label}
                {s.key === "reading_pages" && pageCount ? ` (${pageCount} page${pageCount === 1 ? "" : "s"})` : ""}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="text-[11px] text-slate-400 dark:text-slate-500">
        Progress comes from the server as each step starts. A large file can sit on one step for a minute or two.
      </p>
    </div>
  );
};

export default ExtractionProgress;
