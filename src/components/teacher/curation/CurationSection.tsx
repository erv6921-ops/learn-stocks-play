import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown, Trash2 } from "lucide-react";
import type { TeacherStatus } from "./api";

/**
 * A titled group of curatable items. Active + emphasized items render in
 * order; trashed items move into a collapsed "Trashed (n)" group at the bottom
 * so nothing is ever lost from view.
 */
export interface CurationSectionProps<T> {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  items: T[];
  getStatus: (item: T) => TeacherStatus;
  getKey: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  emptyText?: string;
  className?: string;
}

export function CurationSection<T>({
  title,
  icon,
  description,
  items,
  getStatus,
  getKey,
  renderItem,
  emptyText = "Nothing was extracted for this section.",
  className,
}: CurationSectionProps<T>) {
  const [trashOpen, setTrashOpen] = useState(false);
  const live = items.filter((it) => getStatus(it) !== "trashed");
  const trashed = items.filter((it) => getStatus(it) === "trashed");
  const emphasized = live.filter((it) => getStatus(it) === "emphasized").length;

  return (
    <section className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-baseline gap-2">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
          {icon}
          {title}
          <span className="text-xs font-normal text-slate-400 dark:text-slate-500">({items.length})</span>
        </h3>
        {emphasized > 0 && (
          <span className="text-xs text-emerald-700 dark:text-emerald-300">{emphasized} emphasized</span>
        )}
        {description && <p className="w-full text-xs text-slate-500 dark:text-slate-400">{description}</p>}
      </div>

      {live.length === 0 && trashed.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-200 p-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">{emptyText}</p>
      )}
      {live.length === 0 && trashed.length > 0 && (
        <p className="rounded-lg border border-dashed border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          Everything in this section is trashed. Restore an item or leave it out of the lesson.
        </p>
      )}

      <div className="space-y-2">{live.map((it) => <React.Fragment key={getKey(it)}>{renderItem(it)}</React.Fragment>)}</div>

      {trashed.length > 0 && (
        <Collapsible open={trashOpen} onOpenChange={setTrashOpen}>
          <CollapsibleTrigger className="flex w-full items-center gap-1.5 rounded-md px-1 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", trashOpen && "rotate-180")} />
            <Trash2 className="h-3.5 w-3.5" />
            Trashed ({trashed.length})
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-1">
            {trashed.map((it) => (
              <React.Fragment key={getKey(it)}>{renderItem(it)}</React.Fragment>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </section>
  );
}

export default CurationSection;
