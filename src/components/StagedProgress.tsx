import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Staged, time-based progress for a single long-running call that can't report
 * real per-item progress (e.g. one Claude edge-function call). The bar eases
 * toward ~95% over `estimatedMs` and the status text advances through `stages`;
 * when `done` flips true it snaps to 100% and the final stage.
 *
 * (We use this rather than true polling because generate-questions and
 * synthesize-lesson are each a single model call — see NOTES.md, Issue 1.)
 */
export function StagedProgress({
  stages,
  estimatedMs = 30000,
  done = false,
  className,
}: {
  stages: string[];
  estimatedMs?: number;
  done?: boolean;
  className?: string;
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (done) return;
    const start = Date.now();
    const t = setInterval(() => setElapsed(Date.now() - start), 250);
    return () => clearInterval(t);
  }, [done]);

  const frac = Math.min(1, elapsed / estimatedMs);
  const pct = done ? 100 : Math.min(95, frac * 100);
  const stageIdx = done
    ? stages.length - 1
    : Math.min(stages.length - 1, Math.floor(frac * stages.length));

  return (
    <div className={cn("space-y-2", className)}>
      <Progress value={pct} className="h-2" />
      <p className="flex items-center gap-1.5 text-sm text-slate-500">
        {!done && <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600" />}
        {stages[stageIdx]}
      </p>
    </div>
  );
}

export default StagedProgress;
