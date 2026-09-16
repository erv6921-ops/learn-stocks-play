import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowDown, ArrowUp, GripVertical, Loader2, Merge, Plus, Scissors, Sparkles, Trash2 } from "lucide-react";
import {
  chunkPageLabel,
  countWords,
  db,
  proposeSplit,
  SUB_LESSON_MIN_WORDS,
  subLessonStats,
  type ChunkRow,
  type SubLessonRow,
} from "./api";

/**
 * "Split into lessons": the teacher divides an upload's pages into
 * sub-lessons. Rename, merge with the next, split at a page, reorder, drag a
 * page onto another lesson, add or remove a lesson. Word counts and page
 * ranges update live; a lesson under SUB_LESSON_MIN_WORDS gets a warning,
 * never a block.
 *
 * "Propose a split" runs proposeSplit() (no model call) and is offered only
 * while no sub-lesson has been edited by the teacher; once saved, every row
 * is marked split_edited_by_teacher and the proposal is never offered again.
 *
 * Save writes sub_lessons (insert / update / delete) and
 * curriculum_source_chunks.sub_lesson_id (the chunk guard allows exactly
 * that column). Every chunk always has exactly one owner.
 */
export interface SplitLessonsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  uploadId: string;
  subLessons: SubLessonRow[];
  chunks: ChunkRow[];
  /** Called after a successful save so the parent reloads. */
  onSaved: () => void;
}

interface Draft {
  /** Existing row id, or a temporary "new-…" id. */
  id: string;
  title: string;
  chunkIds: string[];
}

const tempId = () => `new-${Math.random().toString(36).slice(2, 10)}`;

export const SplitLessonsDialog: React.FC<SplitLessonsDialogProps> = ({ open, onOpenChange, uploadId, subLessons, chunks, onSaved }) => {
  const { toast } = useToast();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragChunk, setDragChunk] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [splitAt, setSplitAt] = useState<{ draftId: string; chunkId: string } | null>(null);

  const chunkById = useMemo(() => new Map(chunks.map((c) => [c.id, c])), [chunks]);
  const ordered = useMemo(() => [...chunks].sort((a, b) => a.chunk_index - b.chunk_index), [chunks]);
  const anyEdited = subLessons.some((s) => s.split_edited_by_teacher);

  // Seed from the saved rows whenever the dialog opens.
  useEffect(() => {
    if (!open) return;
    const sorted = [...subLessons].sort((a, b) => a.sort_order - b.sort_order);
    const seeded: Draft[] = sorted.map((s) => ({
      id: s.id,
      title: s.title,
      chunkIds: ordered.filter((c) => c.sub_lesson_id === s.id).map((c) => c.id),
    }));
    // Orphan chunks (no owner) go to the first lesson so nothing is lost.
    const owned = new Set(seeded.flatMap((d) => d.chunkIds));
    const orphans = ordered.filter((c) => !owned.has(c.id)).map((c) => c.id);
    if (orphans.length) {
      if (seeded.length === 0) seeded.push({ id: tempId(), title: "Lesson 1", chunkIds: [] });
      seeded[0].chunkIds.push(...orphans);
    }
    setDrafts(seeded);
    setDirty(false);
    setSplitAt(null);
  }, [open, subLessons, ordered]);

  const update = (next: Draft[]) => {
    // Keep each lesson's pages in document order.
    const index = new Map(ordered.map((c, i) => [c.id, i]));
    setDrafts(next.map((d) => ({ ...d, chunkIds: [...d.chunkIds].sort((a, b) => (index.get(a) ?? 0) - (index.get(b) ?? 0)) })));
    setDirty(true);
  };

  const rename = (id: string, title: string) => update(drafts.map((d) => (d.id === id ? { ...d, title } : d)));
  const move = (id: string, dir: -1 | 1) => {
    const i = drafts.findIndex((d) => d.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= drafts.length) return;
    const next = [...drafts];
    [next[i], next[j]] = [next[j], next[i]];
    update(next);
  };
  const mergeWithNext = (id: string) => {
    const i = drafts.findIndex((d) => d.id === id);
    if (i < 0 || i + 1 >= drafts.length) return;
    const a = drafts[i];
    const b = drafts[i + 1];
    const merged: Draft = { id: a.id, title: a.title, chunkIds: [...a.chunkIds, ...b.chunkIds] };
    update([...drafts.slice(0, i), merged, ...drafts.slice(i + 2)]);
  };
  const remove = (id: string) => {
    const i = drafts.findIndex((d) => d.id === id);
    if (i < 0 || drafts.length <= 1) return;
    // Pages move to the previous lesson (or the next one when removing the first).
    const into = i > 0 ? i - 1 : 1;
    const next = drafts.map((d, k) => (k === into ? { ...d, chunkIds: [...d.chunkIds, ...drafts[i].chunkIds] } : d)).filter((_, k) => k !== i);
    update(next);
  };
  const addLesson = () => update([...drafts, { id: tempId(), title: `Lesson ${drafts.length + 1}`, chunkIds: [] }]);
  const doSplit = (draftId: string, chunkId: string) => {
    const i = drafts.findIndex((d) => d.id === draftId);
    if (i < 0) return;
    const d = drafts[i];
    const at = d.chunkIds.indexOf(chunkId);
    if (at <= 0) return;
    const first: Draft = { ...d, chunkIds: d.chunkIds.slice(0, at) };
    const second: Draft = { id: tempId(), title: `${d.title} (part 2)`, chunkIds: d.chunkIds.slice(at) };
    update([...drafts.slice(0, i), first, second, ...drafts.slice(i + 1)]);
    setSplitAt(null);
  };
  const moveChunk = (chunkId: string, toDraftId: string) => {
    const from = drafts.find((d) => d.chunkIds.includes(chunkId));
    if (!from || from.id === toDraftId) return;
    update(
      drafts.map((d) => {
        if (d.id === from.id) return { ...d, chunkIds: d.chunkIds.filter((c) => c !== chunkId) };
        if (d.id === toDraftId) return { ...d, chunkIds: [...d.chunkIds, chunkId] };
        return d;
      }),
    );
  };
  const propose = () => {
    const proposal = proposeSplit(ordered);
    if (proposal.length === 0) return;
    // Reuse the first existing id so its settings / instructions survive.
    const keepId = drafts[0]?.id ?? tempId();
    update(proposal.map((p, i) => ({ id: i === 0 ? keepId : tempId(), title: p.title, chunkIds: p.chunkIds })));
  };

  const save = useCallback(async () => {
    const titles = drafts.map((d) => d.title.trim());
    if (titles.some((t) => !t)) {
      toast({ title: "Every lesson needs a title", variant: "destructive" });
      return;
    }
    const empty = drafts.filter((d) => d.chunkIds.length === 0);
    if (empty.length) {
      toast({ title: "A lesson has no pages", description: `"${empty[0].title}" has no pages. Drag a page into it or remove it.`, variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const existingIds = new Set(subLessons.map((s) => s.id));
      const keptIds = new Set(drafts.map((d) => d.id).filter((id) => existingIds.has(id)));
      // 1. Insert new lessons (settings default from the upload's current values, copied by the server on first use).
      const idMap = new Map<string, string>();
      for (let i = 0; i < drafts.length; i++) {
        const d = drafts[i];
        if (existingIds.has(d.id)) {
          idMap.set(d.id, d.id);
          const { error } = await db
            .from("sub_lessons")
            .update({ title: d.title.trim(), sort_order: i, split_edited_by_teacher: true })
            .eq("id", d.id);
          if (error) throw new Error(error.message);
        } else {
          const { data, error } = await db
            .from("sub_lessons")
            .insert({ upload_id: uploadId, title: d.title.trim(), sort_order: i, split_edited_by_teacher: true })
            .select("id")
            .single();
          if (error || !data?.id) throw new Error(error?.message ?? "Could not create the lesson.");
          idMap.set(d.id, data.id as string);
        }
      }
      // 2. Move pages. Only rows whose owner changes are written.
      for (const d of drafts) {
        const realId = idMap.get(d.id)!;
        const changed = d.chunkIds.filter((cid) => chunkById.get(cid)?.sub_lesson_id !== realId);
        if (changed.length === 0) continue;
        const { data, error } = await db.from("curriculum_source_chunks").update({ sub_lesson_id: realId }).in("id", changed).select("id");
        if (error) throw new Error(error.message);
        if (!data || data.length !== changed.length) throw new Error("Some pages could not be moved. Has sql/2026-09-16_sub_lessons.sql been run?");
      }
      // 3. Delete removed lessons (their pages were reassigned above; lessons /
      //    questions they generated lose their owner and stay in the bank).
      const removed = subLessons.filter((s) => !keptIds.has(s.id)).map((s) => s.id);
      if (removed.length) {
        const { error } = await db.from("sub_lessons").delete().in("id", removed);
        if (error) throw new Error(error.message);
      }
      toast({ title: "Split saved", description: `${drafts.length} lesson${drafts.length === 1 ? "" : "s"}. Each one generates from its own pages only.` });
      onOpenChange(false);
      onSaved();
    } catch (err) {
      toast({ title: "Couldn't save the split", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }, [drafts, subLessons, uploadId, chunkById, onOpenChange, onSaved, toast]);

  return (
    <Dialog open={open} onOpenChange={(o) => !saving && onOpenChange(o)}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scissors className="h-4 w-4 text-emerald-600" /> Split into lessons
          </DialogTitle>
          <DialogDescription>
            Each lesson is generated from its own pages only: it never sees another lesson&apos;s pages. Drag a page onto a lesson to move it. Your changes are kept as you made them.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {!anyEdited && (
              <Button size="sm" variant="outline" onClick={propose} disabled={saving} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Propose a split
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={addLesson} disabled={saving}>
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add lesson
            </Button>
            <span className="text-xs text-slate-500">
              {ordered.length} page{ordered.length === 1 ? "" : "s"} · {countWords(ordered.map((c) => c.content).join(" ")).toLocaleString()} words
              {anyEdited ? " · you have edited this split, so no automatic proposal is offered" : ""}
            </span>
          </div>

          {drafts.map((d, i) => {
            const owned = d.chunkIds.map((id) => chunkById.get(id)).filter((c): c is ChunkRow => !!c);
            const stats = subLessonStats(owned);
            const thin = stats.words < SUB_LESSON_MIN_WORDS;
            const isTarget = dropTarget === d.id;
            return (
              <div
                key={d.id}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (dragChunk) setDropTarget(d.id);
                }}
                onDragLeave={() => setDropTarget((t) => (t === d.id ? null : t))}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragChunk) moveChunk(dragChunk, d.id);
                  setDragChunk(null);
                  setDropTarget(null);
                }}
                className={cn(
                  "space-y-2 rounded-lg border p-3 transition-colors",
                  isTarget ? "border-emerald-500 bg-emerald-50/60" : thin ? "border-amber-300 bg-amber-50/30" : "border-slate-200 bg-white",
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">{i + 1}.</span>
                  <Input value={d.title} onChange={(e) => rename(d.id, e.target.value)} className="h-8 max-w-xs text-sm" aria-label="Lesson title" />
                  <span className="text-xs text-slate-500">
                    {stats.pageLabel} · {stats.words.toLocaleString()} words
                  </span>
                  {thin && (
                    <span className="flex items-center gap-1 text-xs text-amber-700" title={`Under ${SUB_LESSON_MIN_WORDS} words: the sources may not support many questions.`}>
                      <AlertTriangle className="h-3.5 w-3.5" /> short
                    </span>
                  )}
                  <div className="ml-auto flex items-center gap-1">
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => move(d.id, -1)} disabled={i === 0 || saving} aria-label="Move up">
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => move(d.id, 1)} disabled={i === drafts.length - 1 || saving} aria-label="Move down">
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => mergeWithNext(d.id)} disabled={i === drafts.length - 1 || saving} title="Merge with the next lesson">
                      <Merge className="mr-1 h-3.5 w-3.5" /> Merge ↓
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs"
                      onClick={() => setSplitAt(splitAt?.draftId === d.id ? null : { draftId: d.id, chunkId: "" })}
                      disabled={d.chunkIds.length < 2 || saving}
                      title="Start a new lesson at one of these pages"
                    >
                      <Scissors className="mr-1 h-3.5 w-3.5" /> Split
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-slate-400 hover:text-red-600" onClick={() => remove(d.id)} disabled={drafts.length <= 1 || saving} aria-label="Remove lesson (pages move to the previous one)">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {splitAt?.draftId === d.id && (
                  <p className="text-xs text-emerald-700">Click the page that should start the new lesson.</p>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {owned.length === 0 && <span className="text-xs text-slate-400">No pages. Drag one here.</span>}
                  {owned.map((c, k) => {
                    const label = chunkPageLabel(c);
                    const splitting = splitAt?.draftId === d.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        draggable={!saving}
                        onDragStart={() => setDragChunk(c.id)}
                        onDragEnd={() => {
                          setDragChunk(null);
                          setDropTarget(null);
                        }}
                        onClick={() => splitting && k > 0 && doSplit(d.id, c.id)}
                        title={`${label} · ${countWords(c.content)} words${c.teacher_status === "trashed" ? " · trashed" : ""}${splitting && k > 0 ? " · click to start a new lesson here" : ""}`}
                        className={cn(
                          "flex cursor-grab items-center gap-1 rounded-md border px-2 py-1 text-xs active:cursor-grabbing",
                          c.teacher_status === "trashed" ? "border-slate-200 bg-slate-50 text-slate-400 line-through" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300",
                          splitting && k > 0 && "cursor-pointer border-emerald-300 hover:bg-emerald-50",
                          dragChunk === c.id && "opacity-40",
                        )}
                      >
                        <GripVertical className="h-3 w-3 text-slate-300" />
                        {label.replace(/^p\. /, "Page ").replace(/^pp\. /, "Pages ")}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={() => void save()} disabled={saving || !dirty} className="bg-emerald-600 text-white hover:bg-emerald-700">
            {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
            Save split
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SplitLessonsDialog;
