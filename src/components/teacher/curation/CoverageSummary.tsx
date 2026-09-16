import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, ChevronDown, Sparkles, Trash2 } from "lucide-react";
import type { CoverageEntry } from "./api";

/**
 * curriculum_uploads.coverage_report in plain language (contract section 5).
 * Emphasized items lead; shortfalls are flagged; everything else folds away.
 */
export interface CoverageSummaryProps {
  coverage: CoverageEntry[];
  className?: string;
}

function typeWord(t: CoverageEntry["item_type"]): string {
  switch (t) {
    case "concept":
      return "concept";
    case "vocabulary":
      return "term";
    case "objective":
      return "objective";
    case "instruction":
      return "instruction";
    default:
      return "page";
  }
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** True when the generator recorded a shortfall for this entry. */
function isShort(e: CoverageEntry): boolean {
  return (e.target > 0 && e.questions_generated < e.target) || /\bNOT\b|Shortfall/.test(e.note);
}

function lessonNote(e: CoverageEntry): string | null {
  const m = e.note.match(/Lesson:[^.]*\./g);
  return m ? m.join(" ").replace(/Lesson:\s*/g, "").trim() : null;
}

function Line({ e }: { e: CoverageEntry }) {
  const short = isShort(e);
  const extra = lessonNote(e);
  let text: string;
  if (e.item_type === "instruction") {
    text = `Skipped "${e.label}": your material does not contain it, so it was left out rather than invented.`;
  } else if (e.teacher_status === "trashed") {
    text = `Trashed "${e.label}": left out of the lesson.`;
  } else if (e.teacher_status === "emphasized") {
    text = short
      ? `Emphasized "${e.label}": your material only supported ${plural(e.questions_generated, "question")} (asked for ${e.target}).`
      : `Emphasized "${e.label}": ${plural(e.questions_generated, "question")}.`;
  } else if (e.item_type === "chunk") {
    text = `${e.label}: cited by ${plural(e.questions_generated, "question")}.`;
  } else {
    text = `"${e.label}": ${plural(e.questions_generated, "question")}.`;
  }
  return (
    <li className={cn("flex items-start gap-2 text-xs", short ? "text-amber-800 dark:text-amber-200" : "text-slate-700 dark:text-slate-300")}>
      {e.teacher_status === "trashed" ? (
        <Trash2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
      ) : short || e.item_type === "instruction" ? (
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
      ) : e.teacher_status === "emphasized" ? (
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
      )}
      <span>
        <span className="capitalize">{typeWord(e.item_type)}</span> · {text}
        {extra && <span className="text-slate-500 dark:text-slate-400"> {extra}</span>}
      </span>
    </li>
  );
}

export const CoverageSummary: React.FC<CoverageSummaryProps> = ({ coverage, className }) => {
  const [restOpen, setRestOpen] = useState(false);
  if (!coverage.length) return null;

  const instructions = coverage.filter((e) => e.item_type === "instruction");
  const emphasized = coverage.filter((e) => e.item_type !== "instruction" && e.teacher_status === "emphasized");
  const trashed = coverage.filter((e) => e.item_type !== "instruction" && e.teacher_status === "trashed");
  const rest = coverage.filter((e) => e.item_type !== "instruction" && e.teacher_status === "active" && (e.item_type !== "chunk" || e.questions_generated === 0));
  const shortfalls = coverage.filter(isShort).length + instructions.length;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-baseline gap-2">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">What your material covered</h4>
        {shortfalls > 0 && (
          <span className="text-xs text-amber-700 dark:text-amber-300">
            {plural(shortfalls, "item")} fell short of what you asked for
          </span>
        )}
      </div>
      {emphasized.length + trashed.length + instructions.length > 0 && (
        <ul className="space-y-1">
          {instructions.map((e) => (
            <Line key={`${e.item_type}-${e.item_id}`} e={e} />
          ))}
          {emphasized.map((e) => (
            <Line key={`${e.item_type}-${e.item_id}`} e={e} />
          ))}
          {trashed.map((e) => (
            <Line key={`${e.item_type}-${e.item_id}`} e={e} />
          ))}
        </ul>
      )}
      {rest.length > 0 && (
        <Collapsible open={restOpen} onOpenChange={setRestOpen}>
          <CollapsibleTrigger className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", restOpen && "rotate-180")} />
            {restOpen ? "Hide" : "Show"} everything else ({rest.length})
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="mt-1 space-y-1">
              {rest.map((e) => (
                <Line key={`${e.item_type}-${e.item_id}`} e={e} />
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default CoverageSummary;
