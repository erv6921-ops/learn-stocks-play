import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AlertTriangle, BookMarked, CheckCircle2, Circle, Scissors, Search, Trash2 } from "lucide-react";
import { chunksOf, SUB_LESSON_MIN_WORDS, subLessonStats, type ChunkRow, type SubLessonRow } from "./api";

/**
 * Lesson navigator for the review page: a sticky sidebar on wide screens
 * (a dropdown on narrow ones) listing every sub-lesson with its pages, word
 * count, a three-step progress trail (questions -> built -> approved), and
 * flags for short / supplementary / all-pages-trashed. Stays usable with
 * dozens of lessons: search box past six, the list scrolls on its own.
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

const Step: React.FC<{ done: boolean; label: string }> = ({ done, label }) => (
  <span className="flex items-center gap-0.5" title={label}>
    {done ? <CheckCircle2 className="h-3 w-3 text-emerald-600" /> : <Circle className="h-3 w-3 text-slate-300 dark:text-slate-600" />}
  </span>
);

export const SubLessonBar: React.FC<SubLessonBarProps> = ({ subLessons, chunks, selectedId, onSelect, onSplit, states, disabled, className }) => {
  const [query, setQuery] = useState("");
  const sorted = useMemo(() => [...subLessons].sort((a, b) => a.sort_order - b.sort_order), [subLessons]);
  const rows = useMemo(
    () =>
      sorted.map((s, i) => {
        const owned = chunksOf(s.id, chunks);
        const stats = subLessonStats(owned);
        return {
          s,
          n: i + 1,
          stats,
          thin: stats.words < SUB_LESSON_MIN_WORDS,
          allTrashed: owned.length > 0 && owned.every((c) => c.teacher_status === "trashed"),
          st: states.get(s.id),
        };
      }),
    [sorted, chunks, states],
  );
  const q = query.trim().toLowerCase();
  const visible = q ? rows.filter((r) => r.s.title.toLowerCase().includes(q) || r.stats.pageLabel.includes(q)) : rows;
  const approvedCount = rows.filter((r) => r.st?.approved).length;
  const builtCount = rows.filter((r) => r.st?.built).length;

  return (
    <nav className={cn("space-y-3", className)} aria-label="Lessons from this upload">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {sorted.length === 1 ? "1 lesson" : `${sorted.length} lessons`}
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {builtCount} built · {approvedCount} approved
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={onSplit} disabled={disabled} className="h-8 shrink-0 border-emerald-300 px-2 text-xs text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300" title="Split this upload into several lessons">
          <Scissors className="mr-1 h-3.5 w-3.5" /> Split
        </Button>
      </div>

      {/* Narrow screens: a dropdown instead of the list. */}
      <div className="lg:hidden">
        <label htmlFor="sublesson-select" className="sr-only">
          Lesson
        </label>
        <select
          id="sublesson-select"
          value={selectedId ?? ""}
          disabled={disabled}
          onChange={(e) => onSelect(e.target.value)}
          className="h-9 w-full rounded-md border border-slate-200 bg-white px-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          {rows.map((r) => (
            <option key={r.s.id} value={r.s.id}>
              {r.n}. {r.s.title} ({r.stats.pageLabel}){r.st?.approved ? " ✓" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden lg:block">
        {sorted.length > 6 && (
          <div className="relative mb-2">
            <Search className="pointer-events-none absolute left-2 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a lesson" className="h-8 pl-7 text-xs" />
          </div>
        )}
        <ol className="max-h-[70vh] space-y-1 overflow-y-auto pr-1">
          {visible.map((r) => {
            const active = r.s.id === selectedId;
            return (
              <li key={r.s.id}>
                <button
                  type="button"
                  onClick={() => onSelect(r.s.id)}
                  disabled={disabled}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "w-full rounded-lg border px-2.5 py-2 text-left transition-colors disabled:opacity-60",
                    active
                      ? "border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/30"
                      : "border-transparent hover:border-slate-200 hover:bg-white dark:hover:border-slate-700 dark:hover:bg-slate-900",
                    r.allTrashed && "opacity-60",
                  )}
                >
                  <div className="flex items-start gap-1.5">
                    <span className="mt-0.5 w-4 shrink-0 text-[11px] tabular-nums text-slate-400">{r.n}.</span>
                    <div className="min-w-0 flex-1">
                      <p className={cn("truncate text-xs font-medium text-slate-900 dark:text-slate-100", r.allTrashed && "line-through text-slate-400")} title={r.s.title}>
                        {r.s.title}
                      </p>
                      <p className="flex flex-wrap items-center gap-x-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <span>{r.stats.pageLabel}</span>
                        <span>·</span>
                        <span>{r.stats.words.toLocaleString()} w</span>
                        {r.thin && !r.s.is_supplementary && (
                          <span className="flex items-center gap-0.5 text-amber-700" title={`Under ${SUB_LESSON_MIN_WORDS} words`}>
                            <AlertTriangle className="h-3 w-3" /> short
                          </span>
                        )}
                        {r.s.is_supplementary && (
                          <span className="flex items-center gap-0.5 text-slate-500" title="Appendix material">
                            <BookMarked className="h-3 w-3" /> supp.
                          </span>
                        )}
                        {r.allTrashed && (
                          <span className="flex items-center gap-0.5 text-slate-400" title="Every page trashed">
                            <Trash2 className="h-3 w-3" /> trashed
                          </span>
                        )}
                      </p>
                      <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                        <Step done={(r.st?.questions ?? 0) > 0} label="Questions generated" />
                        <Step done={!!r.st?.built} label="Lesson built" />
                        <Step done={!!r.st?.approved} label="Reviewed and approved" />
                        <span className="ml-1">
                          {r.st?.approved ? "approved" : r.st?.built ? "built" : (r.st?.questions ?? 0) > 0 ? `${r.st?.questions} questions` : "not started"}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
          {visible.length === 0 && <li className="px-2 py-3 text-xs text-slate-400">No lesson matches.</li>}
        </ol>
        <a href="#build-area" className="mt-2 block rounded-md px-2 py-1.5 text-center text-[11px] font-medium text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/40">
          Jump to build &amp; assign ↓
        </a>
      </div>
    </nav>
  );
};

export default SubLessonBar;
