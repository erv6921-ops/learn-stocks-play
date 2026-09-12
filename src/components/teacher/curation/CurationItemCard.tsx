import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Loader2, ShieldAlert, Sparkles, Trash2, Undo2, X } from "lucide-react";
import type { TeacherStatus } from "./api";

/**
 * One curatable item (concept, vocab term, objective, or source page) with the
 * Emphasize / Trash / Restore controls. Purely presentational: the parent owns
 * the optimistic state and the save.
 */
export interface CurationItemCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** "p. 3" style reference, shown next to the title. */
  pageRef?: string | null;
  status: TeacherStatus;
  /** Grounding failed: still curatable, but shown greyed and flagged. */
  groundingFailed?: boolean;
  busy?: boolean;
  onEmphasize: () => void;
  onRemoveEmphasis: () => void;
  onTrash: () => void;
  onRestore: () => void;
  /** Optional extra body (e.g. expandable page text). */
  children?: React.ReactNode;
  className?: string;
}

export const CurationItemCard: React.FC<CurationItemCardProps> = ({
  title,
  description,
  pageRef,
  status,
  groundingFailed = false,
  busy = false,
  onEmphasize,
  onRemoveEmphasis,
  onTrash,
  onRestore,
  children,
  className,
}) => {
  const trashed = status === "trashed";
  const emphasized = status === "emphasized";

  return (
    <div
      className={cn(
        "rounded-lg border p-3 transition-colors",
        trashed
          ? "border-slate-200 bg-slate-50 opacity-60 dark:border-slate-700 dark:bg-slate-900/40"
          : emphasized
            ? "border-emerald-400 bg-emerald-50/60 shadow-sm shadow-emerald-500/10 dark:border-emerald-500 dark:bg-emerald-950/30"
            : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900",
        groundingFailed && !trashed && "opacity-75",
        className,
      )}
    >
      <div className="flex flex-wrap items-start gap-2">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={cn("text-sm font-medium text-slate-900 dark:text-slate-100", trashed && "line-through")}>{title}</span>
            {pageRef && (
              <Badge variant="outline" className="text-[10px] text-slate-500 dark:text-slate-400">
                {pageRef}
              </Badge>
            )}
            {emphasized && (
              <Badge variant="success" className="gap-1 text-[10px]">
                <Sparkles className="h-3 w-3" /> Emphasized
              </Badge>
            )}
            {groundingFailed && (
              <Badge variant="destructive" className="gap-1 text-[10px]" title="This item could not be matched to your material and will not be used.">
                <ShieldAlert className="h-3 w-3" /> Not found in source
              </Badge>
            )}
          </div>
          {description && <p className="text-xs text-slate-600 dark:text-slate-400">{description}</p>}
          {children}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {busy && <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-400" />}
          {trashed ? (
            <Button size="sm" variant="outline" onClick={onRestore} disabled={busy} className="h-7 text-xs">
              <Undo2 className="mr-1 h-3 w-3" /> Restore
            </Button>
          ) : (
            <>
              {emphasized ? (
                <Button size="sm" variant="outline" onClick={onRemoveEmphasis} disabled={busy} className="h-7 border-emerald-300 text-xs text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950">
                  <X className="mr-1 h-3 w-3" /> Remove emphasis
                </Button>
              ) : (
                <Button size="sm" variant="outline" onClick={onEmphasize} disabled={busy} className="h-7 text-xs">
                  <Sparkles className="mr-1 h-3 w-3" /> Emphasize
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={onTrash} disabled={busy} className="h-7 text-xs text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400" aria-label="Trash">
                <Trash2 className="mr-1 h-3 w-3" /> Trash
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurationItemCard;
