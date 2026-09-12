import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, FileText } from "lucide-react";
import { CurationItemCard } from "./CurationItemCard";
import { CurationSection } from "./CurationSection";
import { chunkPageLabel, countWords, type ChunkRow, type TeacherStatus } from "./api";

/**
 * Every source page (curriculum_source_chunks row) with its raw text, so the
 * teacher can confirm nothing was missed or garbled, and mark pages
 * Emphasize / Trash like any other item.
 */
export interface SourcePagesSectionProps {
  chunks: ChunkRow[];
  busyIds: Set<string>;
  onMark: (id: string, next: TeacherStatus) => void;
}

const PREVIEW_CHARS = 220;

function PageBody({ content }: { content: string }) {
  const [open, setOpen] = useState(false);
  const long = content.length > PREVIEW_CHARS;
  const shown = open || !long ? content : `${content.slice(0, PREVIEW_CHARS).trimEnd()}…`;
  return (
    <div className="space-y-1">
      <p className={cn("whitespace-pre-wrap text-xs leading-relaxed text-slate-600 dark:text-slate-400", !open && "line-clamp-3")}>{shown}</p>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
        >
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
          {open ? "Show less" : "Show full page text"}
        </button>
      )}
    </div>
  );
}

export const SourcePagesSection: React.FC<SourcePagesSectionProps> = ({ chunks, busyIds, onMark }) => (
  <CurationSection<ChunkRow>
    title="Source pages"
    icon={<FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
    description="The exact text read from your PDF, page by page. Trash a page to keep it out of the lesson entirely; emphasize one to make it the priority source."
    items={chunks}
    getStatus={(c) => c.teacher_status}
    getKey={(c) => c.id}
    emptyText="No page text was stored for this upload."
    renderItem={(c) => (
      <CurationItemCard
        title={chunkPageLabel(c).replace(/^p\. /, "Page ").replace(/^pp\. /, "Pages ")}
        description={`${countWords(c.content).toLocaleString()} words`}
        status={c.teacher_status}
        busy={busyIds.has(c.id)}
        onEmphasize={() => onMark(c.id, "emphasized")}
        onRemoveEmphasis={() => onMark(c.id, "active")}
        onTrash={() => onMark(c.id, "trashed")}
        onRestore={() => onMark(c.id, "active")}
      >
        <PageBody content={c.content} />
      </CurationItemCard>
    )}
  />
);

export default SourcePagesSection;
