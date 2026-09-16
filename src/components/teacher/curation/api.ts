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

// --- Auto-split proposal (no model call) -----------------------------------
//
// Groups consecutive pages into roughly even blocks, preferring to cut where
// a page starts with something heading-like ("Chapter 3", "Section 2.1",
// "Lesson 4", "Unit 2", or a short run of ALL-CAPS words). Page text has no
// line breaks (pdf.js items are joined with spaces), so only the start of a
// page is inspected. Titles come from that heading when there is one.

const HEADING_RE = /^\s*((?:chapter|section|lesson|unit|part|module|topic)\s+[0-9]+(?:\.[0-9]+)?[:.\-\s]*[A-Za-z][^.!?]{0,60}|[0-9]{1,2}(?:\.[0-9]{1,2})?\s+[A-Z][A-Za-z][^.!?]{3,60}|(?:[A-Z][A-Z'&-]{2,}\s+){1,5}[A-Z][A-Z'&-]{2,})/;

export function headingOf(chunk: Pick<ChunkRow, "content">): string | null {
  const head = chunk.content.slice(0, 160);
  const m = head.match(HEADING_RE);
  if (!m) return null;
  const t = m[1].replace(/\s+/g, " ").trim().replace(/[:\-\s]+$/, "");
  if (t.length < 4 || t.length > 70) return null;
  // Title-case an all-caps heading.
  if (t === t.toUpperCase()) return t.toLowerCase().replace(/\b([a-z])/g, (c) => c.toUpperCase());
  return t;
}

export interface SplitProposal {
  title: string;
  chunkIds: string[];
}

export function proposeSplit(chunks: ChunkRow[]): SplitProposal[] {
  const ordered = [...chunks].sort((a, b) => a.chunk_index - b.chunk_index);
  if (ordered.length === 0) return [];
  const words = ordered.map((c) => countWords(c.content));
  const total = words.reduce((a, b) => a + b, 0);
  // Aim for lessons of ~1,500 words, between 1 and 8 of them.
  const target = Math.max(1, Math.min(8, Math.round(total / 1500)));
  if (target <= 1 || ordered.length < 2) {
    return [{ title: headingOf(ordered[0]) ?? "Lesson 1", chunkIds: ordered.map((c) => c.id) }];
  }
  const perLesson = total / target;
  const groups: ChunkRow[][] = [[]];
  let acc = 0;
  for (let i = 0; i < ordered.length; i++) {
    const c = ordered[i];
    const current = groups[groups.length - 1];
    const startsHeading = !!headingOf(c);
    const remaining = ordered.length - i;
    const lessonsLeft = target - groups.length;
    const canCut = current.length > 0 && groups.length < target && remaining > lessonsLeft;
    if (canCut && ((startsHeading && acc >= perLesson * 0.6) || acc >= perLesson * 1.3)) {
      groups.push([]);
      acc = 0;
    }
    groups[groups.length - 1].push(c);
    acc += words[i];
  }
  return groups
    .filter((g) => g.length > 0)
    .map((g, i) => {
      const { pageLabel } = subLessonStats(g);
      return { title: headingOf(g[0]) ?? `Lesson ${i + 1} (${pageLabel})`, chunkIds: g.map((c) => c.id) };
    });
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
