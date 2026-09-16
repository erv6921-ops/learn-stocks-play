import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, BookMarked, CheckCircle2, Scissors, Trash2 } from "lucide-react";
import { chunksOf, SUB_LESSON_MIN_WORDS, subLessonStats, type ChunkRow, type SubLessonRow } from "./api";

/**
 * Sub-lesson selector above the tabs: one chip per sub-lesson with its page
 * range, word count, a "short" warning, and build / reviewed state, plus the
 * "Split into lessons" button. The tabs and the build area below scope to
 * the selected sub-lesson.
 */
export interface SubLessonState {
  built: boolean;
  approved: boolean;
  questions: number;
}

export interface SubLessonBarProps {
  subLessons: SubLessonRow[];
  chunks: ChunkRow[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onSplit: () => void;
  states: Map<string, SubLessonState>;
  disabled?: boolean;
  className?: string;
}

export const SubLessonBar: React.FC<SubLessonBarProps> = ({ subLessons, chunks, selectedId, onSelect, onSplit, states, disabled, className }) => {
  const sorted = [...subLessons].sort((a, b) => a.sort_order - b.sort_order);
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {sorted.length === 1 ? "One lesson from this upload" : `${sorted.length} lessons from this upload`}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {sorted.length === 1
              ? "Split it into several lessons, each built from its own pages, or keep it as one."
              : "Pick a lesson to review and build it. Each one uses only its own pages."}
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={onSplit} disabled={disabled} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300">
          <Scissors className="mr-1.5 h-3.5 w-3.5" /> Split into lessons
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sorted.map((s, i) => {
          const owned = chunksOf(s.id, chunks);
          const stats = subLessonStats(owned);
          const thin = stats.words < SUB_LESSON_MIN_WORDS;
          const allTrashed = owned.length > 0 && owned.every((c) => c.teacher_status === "trashed");
          const st = states.get(s.id);
          const active = s.id === selectedId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              disabled={disabled}
              className={cn(
                "flex min-w-[10rem] flex-col items-start gap-0.5 rounded-lg border px-3 py-2 text-left transition-colors disabled:opacity-60",
                active
                  ? "border-emerald-500 bg-emerald-50 shadow-sm shadow-emerald-500/10 dark:border-emerald-500 dark:bg-emerald-950/30"
                  : "border-slate-200 bg-white hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900",
              )}
              aria-pressed={active}
            >
              <span className="flex items-center gap-1.5 text-sm font-medium text-slate-900 dark:text-slate-100">
                <span className="text-xs text-slate-400">{i + 1}.</span>
                <span className={cn("max-w-[14rem] truncate", allTrashed && "line-through text-slate-400")}>{s.title}</span>
                {s.is_supplementary && (
                  <span className="rounded-full border border-slate-300 px-1.5 py-0.5 text-[10px] font-normal text-slate-500 dark:border-slate-600 dark:text-slate-400" title="Appendix material (enhancers, cases, test banks)">
                    <BookMarked className="mr-0.5 inline h-3 w-3" />supplementary
                  </span>
                )}
                {allTrashed && (
                  <span className="flex items-center gap-0.5 text-[10px] font-normal text-slate-400" title="Every page in this lesson is trashed; nothing is generated from it">
                    <Trash2 className="h-3 w-3" /> all pages trashed
                  </span>
                )}
                {st?.approved ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-label="Reviewed and approved" />
                ) : null}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                {stats.pageLabel} · {stats.words.toLocaleString()} words
                {thin && (
                  <span className="flex items-center gap-0.5 text-amber-700" title={`Under ${SUB_LESSON_MIN_WORDS} words`}>
                    <AlertTriangle className="h-3 w-3" /> short
                  </span>
                )}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                {st ? `${st.questions} question${st.questions === 1 ? "" : "s"} · ${st.approved ? "approved" : st.built ? "built, not reviewed" : "not built"}` : "…"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubLessonBar;
