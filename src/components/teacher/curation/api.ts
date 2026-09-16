// Shared types + helpers for the teacher curation flow. Mirrors
// docs/curation-contract.md; keep the two in sync.

import { supabase } from "@/integrations/supabase/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = supabase as any;

export const FN_BASE = `${
  import.meta.env.VITE_SUPABASE_URL ?? "https://vcjdshippmqopaffuzbw.supabase.co"
}/functions/v1`;

export type TeacherStatus = "active" | "emphasized" | "trashed";
export type GroundingStatus = "verified" | "failed" | "unverified";

/** The four curatable tables (contract section 2). */
export type CurationTable = "concepts" | "vocabulary" | "learning_objectives" | "curriculum_source_chunks";

export interface CurationRow {
  id: string;
  teacher_status: TeacherStatus;
  grounding_status?: GroundingStatus | null;
  source_chunk_ids?: string[] | null;
}

export interface ConceptRow extends CurationRow {
  name: string;
  definition: string;
}

export interface VocabRow extends CurationRow {
  term: string;
  definition: string;
}

export interface ObjectiveRow extends CurationRow {
  objective: string;
}

export interface ChunkRow extends CurationRow {
  chunk_index: number;
  page_start: number | null;
  page_end: number | null;
  content: string;
  /** Owning sub-lesson (sql/2026-09-16_sub_lessons.sql); null only before the backfill / default creation. */
  sub_lesson_id?: string | null;
}

// ---------------------------------------------------------------------------
// Sub-lessons (public.sub_lessons): one upload split into several lessons,
// each generated from only its own pages. Contract section 8.
// ---------------------------------------------------------------------------

export interface SubLessonRow {
  id: string;
  upload_id: string;
  title: string;
  sort_order: number;
  instructions: string | null;
  generation_settings: unknown;
  coverage_report: CoverageEntry[] | null;
  insufficient_source_reason: string | null;
  split_edited_by_teacher: boolean;
  /** Appendix material (enhancers, cases, test banks): flagged so it can be trashed in one click. */
  is_supplementary?: boolean;
  created_at: string;
}

/** Below this many words a sub-lesson gets a warning (never a block). */
export const SUB_LESSON_MIN_WORDS = 300;

/** Chunks owned by a sub-lesson, in page order. */
export function chunksOf(subLessonId: string, chunks: ChunkRow[]): ChunkRow[] {
  return chunks.filter((c) => c.sub_lesson_id === subLessonId).sort((a, b) => a.chunk_index - b.chunk_index);
}

/** "pp. 3-7" style range plus a word count for a set of chunks. */
export function subLessonStats(owned: ChunkRow[]): { pageLabel: string; words: number; pages: number } {
  const pages = new Set<number>();
  let words = 0;
  for (const c of owned) {
    words += countWords(c.content);
    if (c.page_start != null) {
      const end = c.page_end ?? c.page_start;
      for (let p = c.page_start; p <= end; p++) pages.add(p);
    }
  }
  const sorted = [...pages].sort((a, b) => a - b);
  let pageLabel = "no pages";
  if (sorted.length === 1) pageLabel = `p. ${sorted[0]}`;
  else if (sorted.length > 1) {
    // Contiguous -> "pp. 3-7"; otherwise list the runs ("pp. 3-4, 8").
    const runs: string[] = [];
    let start = sorted[0];
    let prev = sorted[0];
    for (const p of sorted.slice(1)) {
      if (p === prev + 1) {
        prev = p;
        continue;
      }
      runs.push(start === prev ? `${start}` : `${start}-${prev}`);
      start = p;
      prev = p;
    }
    runs.push(start === prev ? `${start}` : `${start}-${prev}`);
    pageLabel = `pp. ${runs.join(", ")}`;
  } else if (owned.length > 0) pageLabel = `${owned.length} part${owned.length === 1 ? "" : "s"}`;
  return { pageLabel, words, pages: sorted.length || owned.length };
}

/** Items (concepts / vocab / objectives) that were cited from any of the owned chunks. */
export function itemsInSubLesson<T extends CurationRow>(items: T[], ownedChunkIds: Set<string>): T[] {
  return items.filter((it) => (it.source_chunk_ids ?? []).some((id) => ownedChunkIds.has(id)));
}

/** Items with no citation at all (grounding failed): they belong to no sub-lesson and are never used as a guide. */
export function unplacedItems<T extends CurationRow>(items: T[]): T[] {
  return items.filter((it) => !(it.source_chunk_ids ?? []).length);
}

// --- Auto-split proposal ------------------------------------------------------
//
// Layer 1 (here, no model call): strip the running header every page shares,
// scan the FULL text of each page for numbered section headings ("LO 2-1
// Explain basic economics", "2-2 THE CIRCULAR FLOW MODEL", "Section 3.2 ..."),
// score them by how heading-like they are, keep the strongest class that
// occurs at least twice, require the numbers to increase in page order
// (which discards appendix restarts), and cut a lesson at the first page of
// each kept heading. Pages after the last real section that look like
// appendix material become one final lesson, flagged supplementary and titled
// from its content. Page text has no line breaks (pdf.js items are joined
// with spaces), so titles end at ".", ":" or a known stop phrase.
//
// Layer 2 (propose-split edge function): when the teacher wrote split
// instructions, or layer 1 found no numbered structure, the page OUTLINE
// built here (headings + a short snippet per page, never full text) is sent
// to a small model call that returns titled groups.

export interface OutlineHeading {
  text: string;
  /** 3 = LO / Section / Chapter prefix, 2 = ALL CAPS, 1 = Title Case, 0 = plain. */
  score: number;
  /** Section number as [major, minor] when numbered ("2-3" -> [2, 3]). */
  num?: [number, number];
}

export interface PageOutline {
  chunkId: string;
  chunkIndex: number;
  page: string;
  words: number;
  headings: OutlineHeading[];
  /** First ~200 characters of body text after the running header. */
  snippet: string;
  /** Appendix cue found on the page ("Lecture Enhancer", "Bonus Case" ...), if any. */
  supplementaryCue: string | null;
}

export interface SplitProposal {
  title: string;
  chunkIds: string[];
  supplementary?: boolean;
}

const PREFIX_RE = /\b(LO|Learning Objective|Section|Chapter|Unit|Lesson|Module|Part|Topic)\s*/i;
const NUMBERED_RE = /(?:\b(LO|Learning Objective|Section|Chapter|Unit|Lesson|Module|Part|Topic)\s*)?\b(\d{1,2})[-.–](\d{1,2})[:.]?\s+([A-Z][^\n]{3,140})/g;
const TITLE_STOP_RE = /\s+(?:Key Terms|Lecture Notes|Lecture Enhancer|PPT|This |These |The following|Go online|Students |Instructor|Ask |Discussion|In this|Have students|Use this|Show |Introduce )/;
const SUPPLEMENTARY_CUES = [
  "Lecture Enhancer",
  "Bonus Case",
  "Critical Thinking Exercise",
  "Discussion Questions for Bonus",
  "Test Bank",
  "Connect Instructor",
  "Answer Key",
  "Appendix",
  "Additional Resources",
  "Supplementary",
  "Worksheet",
];

/** Strips a leading page number and the running header shared by most pages. */
export function stripRunningHeader(chunks: ChunkRow[]): (c: ChunkRow) => string {
  const heads = chunks.map((c) => c.content.replace(/^\s*\d{1,3}\s+/, "").slice(0, 240));
  let header = "";
  if (chunks.length >= 3) {
    const base = heads[0];
    for (let len = Math.min(240, base.length); len >= 20; len -= 4) {
      const p = base.slice(0, len);
      const n = heads.filter((h) => h.startsWith(p)).length;
      if (n >= Math.ceil(chunks.length * 0.6)) {
        header = p;
        break;
      }
    }
    // Back off to a word boundary so a title is never cut in half.
    if (header) header = header.replace(/\S*$/, "");
  }
  return (c: ChunkRow) => {
    let t = c.content.replace(/^\s*\d{1,3}\s+/, "");
    if (header && t.startsWith(header)) t = t.slice(header.length);
    return t.trim();
  };
}

function scoreHeading(prefix: string | undefined, title: string): number {
  if (prefix) return 3;
  const words = title.split(/\s+/).filter((w) => /[A-Za-z]/.test(w));
  if (words.length >= 2 && title === title.toUpperCase()) return 2;
  const caps = words.filter((w) => /^[A-Z]/.test(w)).length;
  if (words.length >= 2 && caps / words.length >= 0.6) return 1;
  return 0;
}

function cleanTitle(raw: string): string {
  let t = raw.split(TITLE_STOP_RE)[0];
  t = t.split(/[.:;!?]/)[0];
  const words = t.trim().split(/\s+/);
  t = words.slice(0, 18).join(" ").trim();
  if (t.length > 110) t = t.slice(0, 110).replace(/\s+\S*$/, "");
  if (t === t.toUpperCase()) t = t.toLowerCase().replace(/\b([a-z])/g, (ch) => ch.toUpperCase());
  return t;
}

/** Per-page outline: headings found anywhere on the page, a short snippet, appendix cues. */
export function buildOutline(chunks: ChunkRow[]): PageOutline[] {
  const ordered = [...chunks].sort((a, b) => a.chunk_index - b.chunk_index);
  const body = stripRunningHeader(ordered);
  return ordered.map((c) => {
    const text = body(c);
    const headings: OutlineHeading[] = [];
    const seen = new Set<string>();
    for (const m of text.matchAll(NUMBERED_RE)) {
      const title = cleanTitle(m[4]);
      if (title.length < 4) continue;
      const num: [number, number] = [Number(m[2]), Number(m[3])];
      const key = `${num[0]}-${num[1]}:${title.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      headings.push({ text: `${num[0]}-${num[1]} ${title}`, score: scoreHeading(m[1], m[4]), num });
      if (headings.length >= 12) break;
    }
    const cue = SUPPLEMENTARY_CUES.find((k) => text.toLowerCase().includes(k.toLowerCase())) ?? null;
    return {
      chunkId: c.id,
      chunkIndex: c.chunk_index,
      page: chunkPageLabel(c),
      words: countWords(c.content),
      headings,
      snippet: text.slice(0, 200),
      supplementaryCue: cue,
    };
  });
}

function supplementaryTitle(pages: PageOutline[]): string {
  const counts = new Map<string, number>();
  for (const p of pages) if (p.supplementaryCue) counts.set(p.supplementaryCue, (counts.get(p.supplementaryCue) ?? 0) + 1);
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k.toLowerCase());
  if (top.length === 0) return "Additional material";
  const nice = top.slice(0, 2).map((k) => (k.includes("enhancer") ? "lecture enhancers" : k.includes("case") ? "cases" : k.includes("critical") ? "critical-thinking exercises" : k.includes("test bank") || k.includes("connect") ? "test bank" : k));
  const t = [...new Set(nice)].join(" and ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Even blocks of ~1,500 words (the fallback when no numbered structure is
 * found): titled from the strongest heading in the block, else by order.
 */
function evenSplit(outline: PageOutline[]): SplitProposal[] {
  const total = outline.reduce((n, p) => n + p.words, 0);
  const target = Math.max(1, Math.min(8, Math.round(total / 1500)));
  if (target <= 1 || outline.length < 2) {
    return [{ title: outline[0]?.headings[0]?.text ?? "Lesson 1", chunkIds: outline.map((p) => p.chunkId) }];
  }
  const per = total / target;
  const groups: PageOutline[][] = [[]];
  let acc = 0;
  for (let i = 0; i < outline.length; i++) {
    const p = outline[i];
    const cur = groups[groups.length - 1];
    const canCut = cur.length > 0 && groups.length < target && outline.length - i > target - groups.length;
    if (canCut && ((p.headings.length > 0 && acc >= per * 0.6) || acc >= per * 1.3)) {
      groups.push([]);
      acc = 0;
    }
    groups[groups.length - 1].push(p);
    acc += p.words;
  }
  return groups.filter((g) => g.length).map((g, i) => {
    const best = g.flatMap((p) => p.headings).sort((a, b) => b.score - a.score)[0];
    return { title: best?.text ?? `Lesson ${i + 1}`, chunkIds: g.map((p) => p.chunkId) };
  });
}

/**
 * Layer-1 proposal. `structured` is true when real numbered sections were
 * found; when false the caller should ask propose-split (layer 2).
 */
export function proposeSplit(chunks: ChunkRow[]): { lessons: SplitProposal[]; structured: boolean } {
  const outline = buildOutline(chunks);
  if (outline.length === 0) return { lessons: [], structured: false };

  // Candidate boundaries: one heading per page (its best), ignoring outline /
  // table-of-contents pages that list three or more headings at once.
  type Cand = { pageIdx: number; h: OutlineHeading };
  const cands: Cand[] = [];
  outline.forEach((p, i) => {
    if (p.headings.length >= 3) return;
    const best = [...p.headings].sort((a, b) => b.score - a.score)[0];
    if (best?.num) cands.push({ pageIdx: i, h: best });
  });
  // Use the strongest heading class that occurs at least twice.
  let cls = 3;
  while (cls > 0 && cands.filter((c) => c.h.score >= cls).length < 2) cls--;
  const strong = cands.filter((c) => c.h.score >= cls && c.h.num);
  // Increasing section numbers in page order.
  const kept: Cand[] = [];
  for (const c of strong) {
    const last = kept[kept.length - 1];
    const [maj, min] = c.h.num!;
    if (!last) {
      kept.push(c);
      continue;
    }
    const [lm, ln] = last.h.num!;
    if (maj > lm || (maj === lm && min > ln)) kept.push(c);
  }
  if (kept.length < 2) return { lessons: evenSplit(outline), structured: false };

  // Appendix: after the last kept heading, the first page where the section
  // numbering RESTARTS (any heading class: "2-1 ..." again after "2-6") is
  // where enhancers, cases and test banks begin. Cues alone are not enough,
  // since real sections also mention their enhancers inline; they are the
  // fallback only when no numbered heading appears in the tail at all.
  let appendixAt: number | null = null;
  const lastStart = kept[kept.length - 1].pageIdx;
  const [lastMaj, lastMin] = kept[kept.length - 1].h.num!;
  for (let i = lastStart + 1; i < outline.length; i++) {
    const nums = outline[i].headings.filter((h) => h.num).map((h) => h.num!);
    if (nums.some(([maj, min]) => maj < lastMaj || (maj === lastMaj && min <= lastMin))) {
      appendixAt = i;
      break;
    }
  }
  if (appendixAt === null) {
    const tailHasNumbers = outline.slice(lastStart + 1).some((p) => p.headings.some((h) => h.num));
    if (!tailHasNumbers) {
      const i = outline.findIndex((p, idx) => idx > lastStart && p.supplementaryCue);
      if (i > 0) appendixAt = i;
    }
  }
  const lessons: SplitProposal[] = [];
  for (let k = 0; k < kept.length; k++) {
    const start = k === 0 ? 0 : kept[k].pageIdx; // front matter joins the first section
    const end = k + 1 < kept.length ? kept[k + 1].pageIdx : appendixAt ?? outline.length;
    const pages = outline.slice(start, end);
    if (pages.length === 0) continue;
    lessons.push({ title: kept[k].h.text, chunkIds: pages.map((p) => p.chunkId) });
  }
  if (appendixAt !== null && appendixAt < outline.length) {
    const pages = outline.slice(appendixAt);
    lessons.push({ title: supplementaryTitle(pages), chunkIds: pages.map((p) => p.chunkId), supplementary: true });
  }
  return { lessons, structured: true };
}

export interface CoverageEntry {
  /** "instruction": a teacher instruction the sources could not support (skipped, never invented). */
  item_type: "concept" | "vocabulary" | "objective" | "chunk" | "instruction";
  item_id: string;
  label: string;
  teacher_status: TeacherStatus;
  questions_generated: number;
  target: number;
  note: string;
}

export interface UploadRow {
  id: string;
  file_name: string;
  status: string | null;
  coverage_report: CoverageEntry[] | null;
  insufficient_source_reason: string | null;
  /** Joined text from the original (v1) upload; used to re-verify legacy uploads. */
  extracted_text?: string | null;
  /** Teacher's generation settings (see GenerationSettings); null until saved. */
  generation_settings?: unknown;
  /** Free-text instructions passed to both generation functions (scope / emphasis / tone / structure only). */
  teacher_instructions?: string | null;
  /** Written by extract-curriculum-v2 while it runs; null when idle, done or failed. */
  extraction_stage?: ExtractionStage | null;
  extraction_stage_at?: string | null;
  /** Per-group plan and progress of the stepped extractor (kept after the run for the pages that produced nothing). */
  extraction_progress?: ExtractionProgressState | null;
  /** Teacher's description of the chapter structure, used by the split proposal. */
  split_instructions?: string | null;
}

// ---------------------------------------------------------------------------
// Extraction progress (curriculum_uploads.extraction_stage). The function
// writes each value right before that step starts. Concepts, vocabulary and
// objectives come out of ONE model pass, so they share the "extracting" step.
// ---------------------------------------------------------------------------

export type ExtractionStage = "reading_pages" | "extracting" | "verifying" | "saving";

export const EXTRACTION_STAGES: { key: ExtractionStage; label: string; percent: number }[] = [
  { key: "reading_pages", label: "Reading pages", percent: 10 },
  { key: "extracting", label: "Pulling concepts, vocabulary and objectives", percent: 35 },
  { key: "verifying", label: "Checking every item against your pages", percent: 70 },
  { key: "saving", label: "Saving what was found", percent: 92 },
];

/** Origin of a generated_questions row. */
export type QuestionOrigin = "generated" | "teacher_authored";

export const isTeacherAuthored = (row: { origin?: QuestionOrigin | string | null }): boolean => row.origin === "teacher_authored";

/** Starred cap when the upload has no saved settings (DEFAULT_SETTINGS.masteryRequired). */
export const DEFAULT_STAR_CAP = 4;

/** Upload statuses that mean "extraction finished and the review can load". */
export const REVIEWABLE_STATUSES = new Set(["awaiting_teacher_review", "questions_generated", "lesson_synthesized", "extracted"]);

export interface LessonRow {
  id: string;
  name: string;
  sub_lesson_id?: string | null;
  teacher_approved_at?: string | null;
  content?: { sections?: unknown[] } | null;
}

export interface ExtractionGroupFailure {
  group: number;
  pages: string;
  reason: string;
}

/** curriculum_uploads.extraction_progress, written by the stepped extractor. */
export interface ExtractionProgressState {
  groups: number;
  plan: string[][];
  pages: string[];
  done: number[];
  failed: ExtractionGroupFailure[];
  current: number | null;
  counts: { concepts: number; vocabulary: number; objectives: number };
}

export interface ExtractResponse {
  success: boolean;
  step?: "planned" | "group" | "finalized" | "status";
  groups?: number;
  group?: number;
  groupFailed?: string;
  progress?: ExtractionProgressState;
  conceptsCount?: number;
  vocabularyCount?: number;
  objectivesCount?: number;
  chunksCount?: number;
  verifiedCount?: number;
  failedCount?: number;
  insufficientSourceReason?: string;
  errors?: string[];
}

export interface GenerateResponse {
  success: boolean;
  subLessonId?: string;
  questionsGenerated: number;
  verifiedCount?: number;
  failedCount?: number;
  keptApproved?: number;
  keptTeacherAuthored?: number;
  unsupportedInstructions?: string[];
  coverage?: CoverageEntry[];
  insufficientSourceReason?: string;
  errors?: string[];
}

export interface SynthesizeResponse {
  success: boolean;
  subLessonId?: string;
  sectionsCount?: number;
  masteryCount?: number;
  requiredCorrect?: number;
  starredCount?: number;
  unsupportedInstructions?: string[];
  verifiedCount?: number;
  failedCount?: number;
  coverage?: CoverageEntry[];
  insufficientSourceReason?: string;
  errors?: string[];
}

export const NOT_ENOUGH_TEXT = "Not enough readable text";

// ---------------------------------------------------------------------------
// Per-upload generation settings (curriculum_uploads.generation_settings).
// Mirrors normalizeGenerationSettings() in supabase/functions/_shared/grounding.ts.
// ---------------------------------------------------------------------------

export type DifficultyLevel = "easier" | "balanced" | "harder" | "mixed";

export interface GenerationSettings {
  /** Questions to generate for the bank / mastery pool. */
  bankSize: number;
  /** Overall difficulty of generated questions. */
  difficulty: DifficultyLevel;
  /** Single-question quick checks interleaved with the slides. */
  microChecks: number;
  /** Correct answers a student needs to pass the mastery check. */
  masteryRequired: number;
}

export const SETTINGS_LIMITS = {
  bankSize: { min: 5, max: 30 },
  microChecks: { min: 0, max: 4 },
  masteryRequired: { min: 1, max: 15 },
} as const;

export const DEFAULT_SETTINGS: GenerationSettings = {
  bankSize: 15,
  difficulty: "mixed",
  microChecks: 2,
  masteryRequired: 4,
};

const clampInt = (v: unknown, min: number, max: number, fallback: number): number => {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.round(n)));
};

/** Fills gaps and clamps ranges; safe on null / partial / garbage input. */
export function normalizeSettings(raw: unknown): GenerationSettings {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const bankSize = clampInt(r.bankSize, SETTINGS_LIMITS.bankSize.min, SETTINGS_LIMITS.bankSize.max, DEFAULT_SETTINGS.bankSize);
  const d = r.difficulty;
  const difficulty: DifficultyLevel = d === "easier" || d === "balanced" || d === "harder" || d === "mixed" ? d : DEFAULT_SETTINGS.difficulty;
  return {
    bankSize,
    difficulty,
    microChecks: clampInt(r.microChecks, SETTINGS_LIMITS.microChecks.min, SETTINGS_LIMITS.microChecks.max, DEFAULT_SETTINGS.microChecks),
    masteryRequired: clampInt(r.masteryRequired, SETTINGS_LIMITS.masteryRequired.min, Math.min(SETTINGS_LIMITS.masteryRequired.max, bankSize), DEFAULT_SETTINGS.masteryRequired),
  };
}

/** "Easy" / "Medium" / "Hard" from the stored 0..1 difficulty (0.25 / 0.5 / 0.75). */
export function difficultyWord(value: number | null | undefined): "Easy" | "Medium" | "Hard" | null {
  if (value == null || !Number.isFinite(value)) return null;
  if (value <= 0.34) return "Easy";
  if (value >= 0.66) return "Hard";
  return "Medium";
}

/**
 * Calls a v2 edge function with the signed-in user's JWT and returns the HTTP
 * status alongside the parsed body, so callers can branch on 409 / 422.
 */
export async function callFunction<T>(
  name: string,
  body: Record<string, unknown>,
): Promise<{ status: number; data: T | null }> {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData?.session?.access_token;
  if (!token) throw new Error("You must be signed in.");
  const res = await fetch(`${FN_BASE}/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  let data: T | null = null;
  try {
    data = (await res.json()) as T;
  } catch {
    data = null;
  }
  return { status: res.status, data };
}

/**
 * Drives the stepped extractor end to end: plan (store pages, split into
 * groups) -> one request per page group -> finalize (merge, decide). Each
 * request stays far under the edge-function wall clock, so long documents
 * work; the upload row carries progress for the bar. With `resume`, no
 * pages are sent: the plan already on the row is continued.
 *
 * Resolves with the final { status, data }. A non-success answer from any
 * step (409 already extracted, 422 zero items, 5xx) is returned as is, so
 * callers branch exactly as before.
 */
export async function runSteppedExtraction(opts: {
  uploadId: string;
  pages?: { page: number; text: string }[];
  extractedText?: string;
  reextract?: boolean;
  resume?: boolean;
  onProgress?: (p: ExtractionProgressState) => void;
}): Promise<{ status: number; data: ExtractResponse | null }> {
  let progress: ExtractionProgressState | null = null;
  if (opts.resume) {
    const st = await callFunction<ExtractResponse>("extract-curriculum-v2", { uploadId: opts.uploadId, step: "status" });
    if (!st.data?.success || !st.data.progress) return st;
    progress = st.data.progress;
  } else {
    const plan = await callFunction<ExtractResponse>("extract-curriculum-v2", {
      uploadId: opts.uploadId,
      ...(opts.pages ? { pages: opts.pages } : {}),
      ...(opts.extractedText ? { extractedText: opts.extractedText } : {}),
      ...(opts.reextract ? { reextract: true } : {}),
    });
    if (!plan.data?.success || !plan.data.progress) return plan;
    progress = plan.data.progress;
  }
  opts.onProgress?.(progress);
  for (let i = 0; i < progress.groups; i++) {
    if (progress.done.includes(i)) continue;
    const r = await callFunction<ExtractResponse>("extract-curriculum-v2", { uploadId: opts.uploadId, step: "group", group: i });
    if (!r.data?.success) return r; // a transport / server error stops the run; a group that produced nothing does not
    if (r.data.progress) {
      progress = r.data.progress;
      opts.onProgress?.(progress);
    }
  }
  return callFunction<ExtractResponse>("extract-curriculum-v2", { uploadId: opts.uploadId, step: "finalize" });
}

/** Human-readable error from a function response. */
export function functionError(status: number, data: { errors?: string[] } | null, fallback: string): string {
  return data?.errors?.join(" • ") || `${fallback} (HTTP ${status}).`;
}

/** "p. 3" / "pp. 3-4" for a chunk. */
export function chunkPageLabel(c: Pick<ChunkRow, "page_start" | "page_end" | "chunk_index">): string {
  if (c.page_start != null && c.page_end != null && c.page_end !== c.page_start) return `pp. ${c.page_start}-${c.page_end}`;
  if (c.page_start != null) return `p. ${c.page_start}`;
  return `part ${c.chunk_index + 1}`;
}

/** Page reference for an item, from its cited chunks. */
export function pageRefFor(sourceChunkIds: string[] | null | undefined, chunks: ChunkRow[]): string | null {
  if (!sourceChunkIds?.length) return null;
  const labels: string[] = [];
  for (const id of sourceChunkIds) {
    const c = chunks.find((x) => x.id === id);
    if (c && c.page_start != null) labels.push(chunkPageLabel(c));
  }
  return labels.length ? [...new Set(labels)].join(", ") : null;
}

/** Upper bound on teacher_instructions; mirrors TEACHER_INSTRUCTIONS_MAX_CHARS in _shared/grounding.ts. */
export const TEACHER_INSTRUCTIONS_MAX_CHARS = 2000;

export function countWords(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}
