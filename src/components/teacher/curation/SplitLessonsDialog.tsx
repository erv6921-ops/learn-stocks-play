import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowDown, ArrowUp, BookMarked, GripVertical, Loader2, Merge, Plus, Scissors, Sparkles, Trash2 } from "lucide-react";
import {
  buildOutline,
  callFunction,
  chunkPageLabel,
  countWords,
  db,
  proposeSplit,
  SUB_LESSON_MIN_WORDS,
  subLessonStats,
  TEACHER_INSTRUCTIONS_MAX_CHARS,
  type ChunkRow,
  type DocumentMap,
  type SplitProposal,
  type SubLessonRow,
} from "./api";

/**
 * "Split into lessons": the teacher divides an upload's pages into
 * sub-lessons. Rename, merge with the next, split at a page, reorder, drag a
 * page onto another lesson, add or remove a lesson. Word counts and page
 * ranges update live; a lesson under SUB_LESSON_MIN_WORDS gets a warning,
 * never a block.
 *
 * "Propose a split": layer 1 (proposeSplit(), no model call) detects real
 * section headings and titles lessons with them. When the teacher describes
 * the chapter's structure in the instruction box, or layer 1 finds no
 * numbered structure, layer 2 (propose-split edge function) is asked with
 * the page OUTLINE only, never full text. Either way the proposal is offered
 * only while no sub-lesson has been edited; once saved, every row is marked
 * split_edited_by_teacher and the proposal is never offered again.
 *
 * Appendix material (enhancers, cases, test banks) becomes a final lesson
 * flagged "supplementary", titled from its content, with a one-click
 * "Trash these pages" so it is left out of generation.
 *
 * Save writes sub_lessons (insert / update / delete, incl. is_supplementary)
 * and curriculum_source_chunks.sub_lesson_id (the chunk guard allows exactly
 * that column). Every chunk always has exactly one owner.
 */
export interface SplitLessonsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  uploadId: string;
  subLessons: SubLessonRow[];
  chunks: ChunkRow[];
  /** curriculum_uploads.split_instructions as last saved. */
  initialInstructions?: string | null;
  /** Document map (units with roles): the preferred source for the proposal when present. */
  documentMap?: DocumentMap | null;
  /** Called after a successful save (and after trashing pages) so the parent reloads. */
  onSaved: () => void;
}

interface Draft {
  /** Existing row id, or a temporary "new-…" id. */
  id: string;
  title: string;
  chunkIds: string[];
  supplementary: boolean;
}

interface ProposeResponse {
  success: boolean;
  lessons?: SplitProposal[];
  errors?: string[];
}

const tempId = () => `new-${Math.random().toString(36).slice(2, 10)}`;

export const SplitLessonsDialog: React.FC<SplitLessonsDialogProps> = ({ open, onOpenChange, uploadId, subLessons, chunks, initialInstructions, documentMap, onSaved }) => {
  const { toast } = useToast();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [proposing, setProposing] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [savedInstructions, setSavedInstructions] = useState("");
  const [trashedIds, setTrashedIds] = useState<Set<string>>(new Set());
  const [trashingId, setTrashingId] = useState<string | null>(null);
  const [dragChunk, setDragChunk] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [splitAt, setSplitAt] = useState<{ draftId: string; chunkId: string } | null>(null);
  const wasOpen = useRef(false);

  const chunkById = useMemo(() => new Map(chunks.map((c) => [c.id, c])), [chunks]);
  const ordered = useMemo(() => [...chunks].sort((a, b) => a.chunk_index - b.chunk_index), [chunks]);
  const anyEdited = subLessons.some((s) => s.split_edited_by_teacher);

  // Seed from the saved rows when the dialog OPENS (not on every parent
  // reload, which would discard unsaved edits after "Trash these pages").
  useEffect(() => {
    if (!open || wasOpen.current) {
      wasOpen.current = open;
      return;
    }
    wasOpen.current = true;
    const sorted = [...subLessons].sort((a, b) => a.sort_order - b.sort_order);
    const seeded: Draft[] = sorted.map((s) => ({
      id: s.id,
      title: s.title,
      chunkIds: ordered.filter((c) => c.sub_lesson_id === s.id).map((c) => c.id),
      supplementary: s.is_supplementary === true,
    }));
    const owned = new Set(seeded.flatMap((d) => d.chunkIds));
    const orphans = ordered.filter((c) => !owned.has(c.id)).map((c) => c.id);
    if (orphans.length) {
      if (seeded.length === 0) seeded.push({ id: tempId(), title: "Lesson 1", chunkIds: [], supplementary: false });
      seeded[0].chunkIds.push(...orphans);
    }
    setDrafts(seeded);
    setDirty(false);
    setSplitAt(null);
    setTrashedIds(new Set(ordered.filter((c) => c.teacher_status === "trashed").map((c) => c.id)));
    const stored = initialInstructions ?? "";
    setInstructions(stored);
    setSavedInstructions(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const update = (next: Draft[]) => {
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
    update([...drafts.slice(0, i), { id: a.id, title: a.title, chunkIds: [...a.chunkIds, ...b.chunkIds], supplementary: a.supplementary && b.supplementary }, ...drafts.slice(i + 2)]);
  };
  const remove = (id: string) => {
    const i = drafts.findIndex((d) => d.id === id);
    if (i < 0 || drafts.length <= 1) return;
    const into = i > 0 ? i - 1 : 1;
    update(drafts.map((d, k) => (k === into ? { ...d, chunkIds: [...d.chunkIds, ...drafts[i].chunkIds] } : d)).filter((_, k) => k !== i));
  };
  const addLesson = () => update([...drafts, { id: tempId(), title: `Lesson ${drafts.length + 1}`, chunkIds: [], supplementary: false }]);
  const toggleSupplementary = (id: string) => update(drafts.map((d) => (d.id === id ? { ...d, supplementary: !d.supplementary } : d)));
  const doSplit = (draftId: string, chunkId: string) => {
    const i = drafts.findIndex((d) => d.id === draftId);
    if (i < 0) return;
    const d = drafts[i];
    const at = d.chunkIds.indexOf(chunkId);
    if (at <= 0) return;
    update([
      ...drafts.slice(0, i),
      { ...d, chunkIds: d.chunkIds.slice(0, at) },
      { id: tempId(), title: `${d.title} (part 2)`, chunkIds: d.chunkIds.slice(at), supplementary: d.supplementary },
      ...drafts.slice(i + 1),
    ]);
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

  const applyProposal = (lessons: SplitProposal[]) => {
    if (lessons.length === 0) return;
    // Reuse the first existing id so its settings / instructions survive.
    const keepId = drafts[0]?.id ?? tempId();
    update(lessons.map((p, i) => ({ id: i === 0 ? keepId : tempId(), title: p.title, chunkIds: p.chunkIds, supplementary: p.supplementary === true })));
  };

  // --- Split instructions: saved on blur to the upload row ------------------
  const saveInstructions = useCallback(async () => {
    const text = instructions.trim();
    if (text === savedInstructions) return;
    const { data, error } = await db.from("curriculum_uploads").update({ split_instructions: text || null }).eq("id", uploadId).select("id");
    if (error || !data || data.length === 0) {
      toast({ title: "Couldn't save the description", description: error?.message ?? "Has sql/2026-09-17_split_instructions.sql been run?", variant: "destructive" });
      return;
    }
    setSavedInstructions(text);
  }, [instructions, savedInstructions, uploadId, toast]);

  // --- Propose: layer 1 locally; layer 2 when instructed or unstructured ----
  const propose = useCallback(async () => {
    const local = proposeSplit(ordered, documentMap);
    const text = instructions.trim();
    if (!text && local.structured) {
      applyProposal(local.lessons);
      toast({ title: documentMap && !documentMap.error ? "Split proposed from the document map" : "Split proposed from the section headings", description: `${local.lessons.length} lesson${local.lessons.length === 1 ? "" : "s"}. Rename, merge or move pages, then save.` });
      return;
    }
    setProposing(true);
    try {
      if (text !== savedInstructions) await saveInstructions();
      const outline = buildOutline(ordered).map((p) => ({
        chunkId: p.chunkId,
        page: p.page,
        words: p.words,
        headings: p.headings.map((h) => h.text),
        snippet: p.snippet,
        supplementaryCue: p.supplementaryCue,
      }));
      const { status, data } = await callFunction<ProposeResponse>("propose-split", { uploadId, instructions: text, outline });
      if (!data?.success || !data.lessons?.length) {
        throw new Error(data?.errors?.join(" • ") || `Split proposal failed (HTTP ${status}).`);
      }
      applyProposal(data.lessons);
      toast({ title: text ? "Split proposed from your description" : "Split proposed", description: `${data.lessons.length} lesson${data.lessons.length === 1 ? "" : "s"}. Rename, merge or move pages, then save.` });
    } catch (err) {
      // Fall back to the deterministic proposal so the teacher still gets something.
      applyProposal(local.lessons);
      toast({ title: "Used the automatic split instead", description: err instanceof Error ? err.message : "The described split could not be produced.", variant: "destructive" });
    } finally {
      setProposing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordered, instructions, savedInstructions, saveInstructions, uploadId, drafts, documentMap, toast]);

  // --- One click: trash every page of a (supplementary) lesson --------------
  const trashPages = useCallback(
    async (d: Draft) => {
      const ids = d.chunkIds.filter((id) => !trashedIds.has(id));
      if (ids.length === 0) return;
      setTrashingId(d.id);
      try {
        const { data, error } = await db.from("curriculum_source_chunks").update({ teacher_status: "trashed" }).in("id", ids).select("id");
        if (error) throw new Error(error.message);
        if (!data || data.length !== ids.length) throw new Error("Some pages could not be trashed.");
        setTrashedIds((prev) => new Set([...prev, ...ids]));
        toast({ title: `Trashed ${ids.length} page${ids.length === 1 ? "" : "s"}`, description: `"${d.title}" stays as a lesson but nothing will be generated from it. Restore pages on its Source Pages tab any time.` });
        onSaved();
      } catch (err) {
        toast({ title: "Couldn't trash these pages", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
      } finally {
        setTrashingId(null);
      }
    },
    [trashedIds, onSaved, toast],
  );

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
      if (instructions.trim() !== savedInstructions) await saveInstructions();
      const existingIds = new Set(subLessons.map((s) => s.id));
      const keptIds = new Set(drafts.map((d) => d.id).filter((id) => existingIds.has(id)));
      const idMap = new Map<string, string>();
      for (let i = 0; i < drafts.length; i++) {
        const d = drafts[i];
        const patch = { title: d.title.trim(), sort_order: i, split_edited_by_teacher: true, is_supplementary: d.supplementary };
        if (existingIds.has(d.id)) {
          idMap.set(d.id, d.id);
          const { error } = await db.from("sub_lessons").update(patch).eq("id", d.id);
          if (error) throw new Error(error.message);
        } else {
          const { data, error } = await db.from("sub_lessons").insert({ upload_id: uploadId, ...patch }).select("id").single();
          if (error || !data?.id) throw new Error(error?.message ?? "Could not create the lesson.");
          idMap.set(d.id, data.id as string);
        }
      }
      for (const d of drafts) {
        const realId = idMap.get(d.id)!;
        const changed = d.chunkIds.filter((cid) => chunkById.get(cid)?.sub_lesson_id !== realId);
        if (changed.length === 0) continue;
        const { data, error } = await db.from("curriculum_source_chunks").update({ sub_lesson_id: realId }).in("id", changed).select("id");
        if (error) throw new Error(error.message);
        if (!data || data.length !== changed.length) throw new Error("Some pages could not be moved. Has sql/2026-09-16_sub_lessons.sql been run?");
      }
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
  }, [drafts, subLessons, uploadId, chunkById, instructions, savedInstructions, saveInstructions, onOpenChange, onSaved, toast]);

  const busy = saving || proposing;

  return (
    <Dialog open={open} onOpenChange={(o) => !busy && onOpenChange(o)}>
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
          {!anyEdited && (
            <div className="space-y-1.5 rounded-lg border border-emerald-100 bg-emerald-50/40 p-3 dark:border-emerald-900 dark:bg-emerald-950/20">
              <Label htmlFor="split-instructions" className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                Describe your chapter&apos;s structure (optional)
              </Label>
              <Textarea
                id="split-instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value.slice(0, TEACHER_INSTRUCTIONS_MAX_CHARS))}
                onBlur={() => void saveInstructions()}
                disabled={busy}
                rows={2}
                maxLength={TEACHER_INSTRUCTIONS_MAX_CHARS}
                placeholder="e.g. Split by the six learning objectives (2-1 to 2-6). Put the lecture enhancers and bonus cases with the objective they relate to."
                className="bg-white text-sm dark:bg-slate-900"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Without a description, the section headings in your pages decide the split. With one, it guides the split and the lesson titles.
              </p>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {!anyEdited && (
              <Button size="sm" variant="outline" onClick={() => void propose()} disabled={busy} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                {proposing ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Sparkles className="mr-1.5 h-3.5 w-3.5" />}
                {proposing ? "Proposing…" : "Propose a split"}
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={addLesson} disabled={busy}>
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
            const untrashed = d.chunkIds.filter((id) => !trashedIds.has(id)).length;
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
                  isTarget
                    ? "border-emerald-500 bg-emerald-50/60"
                    : d.supplementary
                      ? "border-slate-300 border-dashed bg-slate-50/60"
                      : thin
                        ? "border-amber-300 bg-amber-50/30"
                        : "border-slate-200 bg-white",
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">{i + 1}.</span>
                  <Input value={d.title} onChange={(e) => rename(d.id, e.target.value)} className="h-8 max-w-xs text-sm" aria-label="Lesson title" />
                  <span className="text-xs text-slate-500">
                    {stats.pageLabel} · {stats.words.toLocaleString()} words
                  </span>
                  {d.supplementary && (
                    <span className="flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[11px] text-slate-600" title="Appendix material: enhancers, cases, test banks">
                      <BookMarked className="h-3 w-3" /> Supplementary
                    </span>
                  )}
                  {thin && !d.supplementary && (
                    <span className="flex items-center gap-1 text-xs text-amber-700" title={`Under ${SUB_LESSON_MIN_WORDS} words: the sources may not support many questions.`}>
                      <AlertTriangle className="h-3.5 w-3.5" /> short
                    </span>
                  )}
                  <div className="ml-auto flex items-center gap-1">
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => move(d.id, -1)} disabled={i === 0 || busy} aria-label="Move up">
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => move(d.id, 1)} disabled={i === drafts.length - 1 || busy} aria-label="Move down">
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => mergeWithNext(d.id)} disabled={i === drafts.length - 1 || busy} title="Merge with the next lesson">
                      <Merge className="mr-1 h-3.5 w-3.5" /> Merge ↓
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs"
                      onClick={() => setSplitAt(splitAt?.draftId === d.id ? null : { draftId: d.id, chunkId: "" })}
                      disabled={d.chunkIds.length < 2 || busy}
                      title="Start a new lesson at one of these pages"
                    >
                      <Scissors className="mr-1 h-3.5 w-3.5" /> Split
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-slate-500" onClick={() => toggleSupplementary(d.id)} disabled={busy} title={d.supplementary ? "Treat as a regular lesson" : "Mark as appendix material"}>
                      <BookMarked className="mr-1 h-3.5 w-3.5" /> {d.supplementary ? "Regular" : "Supplementary"}
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-slate-400 hover:text-red-600" onClick={() => remove(d.id)} disabled={drafts.length <= 1 || busy} aria-label="Remove lesson (pages move to the previous one)">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {d.supplementary && (
                  <div className="flex flex-wrap items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                    <span className="min-w-0 flex-1">
                      Appendix material. {untrashed === 0 ? "Every page is trashed: nothing is generated from it." : "Keep it as its own lesson, or leave it out of generation in one click."}
                    </span>
                    {untrashed > 0 && (
                      <Button size="sm" variant="outline" onClick={() => void trashPages(d)} disabled={busy || trashingId === d.id} className="h-7 border-red-200 text-xs text-red-700 hover:bg-red-50">
                        {trashingId === d.id ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Trash2 className="mr-1 h-3 w-3" />}
                        Trash these {untrashed} page{untrashed === 1 ? "" : "s"}
                      </Button>
                    )}
                  </div>
                )}

                {splitAt?.draftId === d.id && <p className="text-xs text-emerald-700">Click the page that should start the new lesson.</p>}

                <div className="flex flex-wrap gap-1.5">
                  {owned.length === 0 && <span className="text-xs text-slate-400">No pages. Drag one here.</span>}
                  {owned.map((c, k) => {
                    const label = chunkPageLabel(c);
                    const splitting = splitAt?.draftId === d.id;
                    const trashed = trashedIds.has(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        draggable={!busy}
                        onDragStart={() => setDragChunk(c.id)}
                        onDragEnd={() => {
                          setDragChunk(null);
                          setDropTarget(null);
                        }}
                        onClick={() => splitting && k > 0 && doSplit(d.id, c.id)}
                        title={`${label} · ${countWords(c.content)} words${trashed ? " · trashed" : ""}${splitting && k > 0 ? " · click to start a new lesson here" : ""}`}
                        className={cn(
                          "flex cursor-grab items-center gap-1 rounded-md border px-2 py-1 text-xs active:cursor-grabbing",
                          trashed ? "border-slate-200 bg-slate-50 text-slate-400 line-through" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300",
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
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          <Button onClick={() => void save()} disabled={busy || !dirty} className="bg-emerald-600 text-white hover:bg-emerald-700">
            {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
            Save split
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SplitLessonsDialog;
