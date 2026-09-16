import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { db, type ExtractionProgressState, type ExtractionStage } from "./api";

/**
 * Real extraction progress for one upload. Polls curriculum_uploads every
 * 1.5 s while the stepped extractor runs and shows the stage and the page
 * group the server last wrote (extraction_stage + extraction_progress).
 * Nothing here advances on a timer: the bar only moves when the server
 * reports the next step or the next group.
 */
export interface ExtractionProgressProps {
  uploadId: string;
  fileName: string;
  /** Number of pages sent, for the first stage's caption. */
  pageCount?: number;
  className?: string;
}

const POLL_MS = 1500;

/** Bar position from the server's stage + group progress. Reading 0-5, groups 5-92, saving 92-99, done 100. */
function percentOf(stage: ExtractionStage | null, p: ExtractionProgressState | null, finished: boolean): number {
  if (finished) return 100;
  if (!p || p.groups === 0) return stage === "reading_pages" ? 5 : 2;
  if (stage === "saving") return 95;
  const settled = p.done.length + p.failed.length;
  // Within the current group, "verifying" is past the model call: count it as most of that group.
  const within = p.current != null ? (stage === "verifying" ? 0.7 : 0.25) : 0;
  return Math.min(92, 5 + Math.round((87 * (settled + within)) / p.groups));
}

export const ExtractionProgress: React.FC<ExtractionProgressProps> = ({ uploadId, fileName, pageCount, className }) => {
  const [stage, setStage] = useState<ExtractionStage | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [progress, setProgress] = useState<ExtractionProgressState | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const tick = async () => {
      const { data } = await db.from("curriculum_uploads").select("extraction_stage, status, extraction_progress").eq("id", uploadId).maybeSingle();
      if (cancelled) return;
      if (data) {
        setStage((data.extraction_stage as ExtractionStage | null) ?? null);
        setStatus((data.status as string | null) ?? null);
        setProgress((data.extraction_progress as ExtractionProgressState | null) ?? null);
      }
      timer = setTimeout(() => void tick(), POLL_MS);
    };
    void tick();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [uploadId]);

  const finished = stage === null && status === "awaiting_teacher_review";
  const percent = percentOf(stage, progress, finished);
  const groups = progress?.groups ?? 0;
  const settled = (progress?.done.length ?? 0) + (progress?.failed.length ?? 0);
  const currentLabel = progress?.current != null ? progress.pages[progress.current] ?? `group ${progress.current + 1}` : null;

  let headline: string;
  if (finished) headline = "Extraction finished";
  else if (stage === "saving") headline = "Merging what was found across the document";
  else if (stage === "reading_pages" || !progress) headline = "Reading pages";
  else if (stage === "verifying") headline = `Checking ${currentLabel ?? "this group"} against the text`;
  else if (stage === "extracting") headline = `Pulling concepts, vocabulary and objectives from ${currentLabel ?? "the next group"}`;
  else headline = "Waiting for the next group";

  return (
    <div className={cn("space-y-4 rounded-xl border border-emerald-100 bg-white p-5 dark:border-emerald-900 dark:bg-slate-900", className)}>
      <div className="flex items-center gap-2">
        {finished ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{headline}…</p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {fileName}
            {pageCount ? ` · ${pageCount} page${pageCount === 1 ? "" : "s"}` : ""}
            {groups > 0 ? ` · group ${Math.min(groups, settled + (progress?.current != null ? 1 : 0))} of ${groups}` : ""}
          </p>
        </div>
        <span className="ml-auto text-xs font-medium tabular-nums text-slate-500 dark:text-slate-400">{percent}%</span>
      </div>
      <Progress value={percent} variant="success" className="h-2.5" aria-label="Extraction progress" />

      {progress && groups > 0 && (
        <ol className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {progress.pages.map((label, i) => {
            const done = progress.done.includes(i);
            const failed = progress.failed.find((f) => f.group === i);
            const active = progress.current === i;
            return (
              <li
                key={i}
                title={failed ? failed.reason : undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px]",
                  done
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"
                    : failed
                      ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-200"
                      : active
                        ? "border-emerald-400 bg-white font-medium text-slate-900 dark:bg-slate-900 dark:text-slate-100"
                        : "border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-500",
                )}
              >
                {done ? (
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                ) : failed ? (
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                ) : active ? (
                  <Loader2 className="h-3 w-3 shrink-0 animate-spin text-emerald-600" />
                ) : (
                  <Circle className="h-3 w-3 shrink-0" />
                )}
                <span className="truncate">{label}</span>
              </li>
            );
          })}
        </ol>
      )}
      {progress && (progress.counts.concepts + progress.counts.vocabulary + progress.counts.objectives > 0) && (
        <p className="text-xs text-slate-600 dark:text-slate-400">
          So far: {progress.counts.concepts} concepts · {progress.counts.vocabulary} terms · {progress.counts.objectives} objectives
        </p>
      )}
      {progress && progress.failed.length > 0 && (
        <p className="text-xs text-amber-800 dark:text-amber-200">
          {progress.failed.map((f) => f.pages).join(", ")} produced nothing so far. The rest continues; you will see the reason at the end.
        </p>
      )}
      <p className="text-[11px] text-slate-400 dark:text-slate-500">
        Each group of pages is read, checked and saved in its own step, so a long document moves through here group by group.
      </p>
    </div>
  );
};

export default ExtractionProgress;
