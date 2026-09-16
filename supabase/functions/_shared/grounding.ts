// Shared source-grounding helpers for the v2 curriculum functions
// (extract-curriculum-v2, generate-questions-v2, synthesize-lesson-v2).
//
// Every generated item must cite one or more <source> blocks and carry an
// exact evidence quote. verifyQuote() checks the quote deterministically
// against the chunk text; verifySupport() asks a strict Claude checker whether
// the item is actually entailed by that quote. verifyGroundedItems() runs both.
//
// Runtime: Deno (Supabase Edge Functions)

import Anthropic from "npm:@anthropic-ai/sdk@0.70.0";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const MODEL = "claude-sonnet-4-6";
export const CHECKER_MODEL = "claude-sonnet-4-6";

/** Above this many source characters, generation runs per group of chunks. */
export const MAX_SOURCE_CHARS = 350_000;

/** Minimum readable words for an upload to be usable at all. */
export const MIN_SOURCE_WORDS = 200;

export const NOT_ENOUGH_TEXT_MESSAGE =
  "Not enough readable text. The file may be scanned images.";

export type GroundingStatus = "verified" | "failed" | "unverified";

// ---------------------------------------------------------------------------
// Source block
// ---------------------------------------------------------------------------

export type TeacherStatus = "active" | "emphasized" | "trashed";

export interface SourceChunk {
  id: string;
  chunk_index: number;
  page_start: number | null;
  page_end: number | null;
  content: string;
  /** Teacher curation mark. Trashed chunks must never reach the model. */
  teacher_status?: TeacherStatus | null;
}

export interface SourceBlock {
  /** Concatenated <source id="S1" pages="3-4">...</source> blocks. */
  text: string;
  /** "S1" -> chunk uuid. */
  sidToChunkId: Record<string, string>;
  /** "S1" -> chunk row. */
  chunksBySid: Record<string, SourceChunk>;
  /** S-ids of chunks the teacher emphasized (rendered with priority="true"). */
  prioritySids: string[];
  totalChars: number;
}

/** Chunks the model may see: everything the teacher did not trash. */
export function usableChunks(chunks: SourceChunk[]): SourceChunk[] {
  return chunks.filter((c) => c.teacher_status !== "trashed");
}

/**
 * Renders chunks as <source> blocks with sequential S-ids. The S-id order
 * follows the array order, so callers must pass chunks sorted by chunk_index.
 * Trashed chunks are skipped even if passed in; emphasized chunks get
 * priority="true".
 */
export function buildSourceBlock(chunks: SourceChunk[]): SourceBlock {
  const sidToChunkId: Record<string, string> = {};
  const chunksBySid: Record<string, SourceChunk> = {};
  const prioritySids: string[] = [];
  const parts: string[] = [];
  let totalChars = 0;

  usableChunks(chunks).forEach((chunk, i) => {
    const sid = `S${i + 1}`;
    sidToChunkId[sid] = chunk.id;
    chunksBySid[sid] = chunk;
    totalChars += chunk.content.length;

    let pagesAttr = "";
    if (chunk.page_start != null && chunk.page_end != null) {
      pagesAttr =
        chunk.page_start === chunk.page_end
          ? ` pages="${chunk.page_start}"`
          : ` pages="${chunk.page_start}-${chunk.page_end}"`;
    } else if (chunk.page_start != null) {
      pagesAttr = ` pages="${chunk.page_start}"`;
    }
    let priorityAttr = "";
    if (chunk.teacher_status === "emphasized") {
      priorityAttr = ` priority="true"`;
      prioritySids.push(sid);
    }
    // Content is NOT escaped: quotes must be copied character-for-character.
    parts.push(`<source id="${sid}"${pagesAttr}${priorityAttr}>\n${chunk.content}\n</source>`);
  });

  return { text: parts.join("\n\n"), sidToChunkId, chunksBySid, prioritySids, totalChars };
}

/** Human-readable label for a chunk, used in prompts and coverage reports. */
export function chunkLabel(chunk: SourceChunk): string {
  if (chunk.page_start != null && chunk.page_end != null && chunk.page_start !== chunk.page_end) {
    return `Pages ${chunk.page_start}-${chunk.page_end}`;
  }
  if (chunk.page_start != null) return `Page ${chunk.page_start}`;
  return `Chunk ${chunk.chunk_index + 1}`;
}

/**
 * Splits chunks into groups whose combined content stays under maxChars, so
 * very large uploads can be generated per group and merged.
 */
export function groupChunks(
  chunks: SourceChunk[],
  maxChars: number = MAX_SOURCE_CHARS,
): SourceChunk[][] {
  const groups: SourceChunk[][] = [];
  let current: SourceChunk[] = [];
  let currentChars = 0;
  for (const chunk of chunks) {
    if (current.length > 0 && currentChars + chunk.content.length > maxChars) {
      groups.push(current);
      current = [];
      currentChars = 0;
    }
    current.push(chunk);
    currentChars += chunk.content.length;
  }
  if (current.length > 0) groups.push(current);
  return groups;
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/).length;
}

// ---------------------------------------------------------------------------
// Grounding rules (appended to EVERY curriculum generation system prompt)
// ---------------------------------------------------------------------------

export const GROUNDING_RULES = `

SOURCE GROUNDING RULES (these override everything above):
- Use ONLY information inside the <source> blocks. No outside knowledge: no facts, definitions, numbers, dates, companies, statistics, or examples that are not in the sources.
- Every factual item must include "source_ids" (for example ["S2"]) listing the <source> ids it came from, and "evidence_quote": an exact contiguous copy of text from one of those sources, at most 40 words, character-for-character. Do not paraphrase, shorten with ellipses, or fix typos inside the quote.
- If the sources do not support the requested number of items, return fewer and set "insufficient_source": true with a one-sentence "insufficient_source_reason". Never pad with invented or generic content.
- You may write in Jeff's voice and explain in simple words, but every fact must come from the sources.
- Vocabulary definitions must come from the sources. If a term appears without a definition in the sources, omit it.
- Scenarios and worked examples may only use numbers and situations that appear in the sources. If the sources contain no numerical examples, skip numerical scenarios.
- Multiple-choice questions: the correct answer and the explanation must be fully supported by the evidence_quote. Distractors must be plausible wrong answers.
- TEACHER INSTRUCTIONS (a <teacher_instructions> block, when present) direct WHAT to cover and HOW to present it: scope, emphasis, tone, and structure. They are not a source. Every fact still comes from the <source> blocks. If an instruction asks for something the sources do not contain (a topic, example, number, or definition that is not in the sources), skip that part of the instruction, never invent it, and list the skipped instruction in "unsupported_instructions" (an array of short strings; empty when nothing was skipped).
- Return JSON only. No markdown fences, no preamble, no commentary.`;

// ---------------------------------------------------------------------------
// Teacher instructions (curriculum_uploads.teacher_instructions)
// ---------------------------------------------------------------------------

export const TEACHER_INSTRUCTIONS_MAX_CHARS = 2_000;

/** Trims and caps free-text instructions; empty / non-string -> null. */
export function cleanTeacherInstructions(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const t = raw.replace(/\s+/g, " ").trim();
  return t.length > 0 ? t.slice(0, TEACHER_INSTRUCTIONS_MAX_CHARS) : null;
}

export interface TeacherInstructionSet {
  /** Upload-wide box (curriculum_uploads.teacher_instructions): applies to every sub-lesson. */
  upload: string | null;
  /** This sub-lesson's own box (sub_lessons.instructions): wins where the two conflict. */
  subLesson: string | null;
}

/**
 * Instructions for a run. The request body's `teacherInstructions` /
 * `subLessonInstructions` win (the UI sends what is in the boxes), else the
 * upload row's column and the sub-lesson row's column, else null.
 */
export async function loadTeacherInstructions(
  supabase: AnySupabase,
  uploadId: string,
  bodyInstructions: unknown,
  subLessonId?: string | null,
  bodySubLessonInstructions?: unknown,
): Promise<TeacherInstructionSet> {
  let upload: string | null = null;
  let subLesson: string | null = null;
  if (typeof bodyInstructions === "string") {
    upload = cleanTeacherInstructions(bodyInstructions);
  } else {
    const { data } = await supabase.from("curriculum_uploads").select("teacher_instructions").eq("id", uploadId).maybeSingle();
    upload = cleanTeacherInstructions(data?.teacher_instructions);
  }
  if (subLessonId) {
    if (typeof bodySubLessonInstructions === "string") {
      subLesson = cleanTeacherInstructions(bodySubLessonInstructions);
    } else {
      const { data } = await supabase.from("sub_lessons").select("instructions").eq("id", subLessonId).maybeSingle();
      subLesson = cleanTeacherInstructions(data?.instructions);
    }
  }
  return { upload, subLesson };
}

/**
 * The prompt block for teacher instructions. Framed so the model treats them
 * as direction (scope, emphasis, tone, structure), never as a source of facts.
 * When both levels are present the sub-lesson's own instructions take
 * precedence where they conflict. Returns "" when there are none so callers
 * can splice it in unconditionally.
 */
export function renderTeacherInstructions(instructions: TeacherInstructionSet | string | null): string {
  const set: TeacherInstructionSet =
    typeof instructions === "string" || instructions === null ? { upload: instructions, subLesson: null } : instructions;
  if (!set.upload && !set.subLesson) return "";
  const parts: string[] = [];
  if (set.upload) parts.push(`For the whole upload:\n${set.upload}`);
  if (set.subLesson) parts.push(`For this lesson only (takes precedence over the whole-upload instructions where they conflict):\n${set.subLesson}`);
  return (
    `<teacher_instructions>\n${parts.join("\n\n")}\n</teacher_instructions>\n` +
    `Follow the teacher instructions for what to cover, what to stress, the tone, and the structure. ` +
    `They contain no facts you may use: everything factual must still come from the <source> blocks with an exact evidence_quote. ` +
    `If part of an instruction cannot be met from the sources, skip that part and report it in "unsupported_instructions".`
  );
}

/** Reads the model's "unsupported_instructions" list (strings only, de-duplicated). */
export function readUnsupportedInstructions(parsed: Record<string, unknown>): string[] {
  const raw = parsed.unsupported_instructions;
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  for (const v of raw) {
    if (typeof v !== "string") continue;
    const t = v.trim();
    if (t && !out.includes(t)) out.push(t);
  }
  return out.slice(0, 20);
}

/**
 * Coverage entries for instructions the model could not meet from the
 * sources. `stage` is "questions" or "lesson"; entries from an earlier run of
 * the same stage are replaced, other stages' entries are kept.
 */
export function mergeInstructionCoverage(
  coverage: CoverageEntry[],
  stage: "questions" | "lesson",
  unsupported: string[],
): CoverageEntry[] {
  const kept = coverage.filter((e) => !(e.item_type === "instruction" && e.item_id.startsWith(`${stage}-`)));
  const added: CoverageEntry[] = unsupported.map((text, i) => ({
    item_type: "instruction",
    item_id: `${stage}-${i + 1}`,
    label: text,
    teacher_status: "active",
    questions_generated: 0,
    target: 0,
    note: `Skipped: your instruction asked for this but the sources do not contain it (${stage === "questions" ? "question bank" : "lesson"}).`,
  }));
  return [...kept, ...added];
}

// ---------------------------------------------------------------------------
// Deterministic quote verification
// ---------------------------------------------------------------------------

/**
 * Normalizes text for comparison: lowercase, straight quotes, plain hyphens,
 * soft hyphens removed, hyphen-newline word breaks re-joined, whitespace
 * collapsed.
 */
export function normalizeForMatch(input: string): string {
  return (
    input
      // strip soft hyphens
      .replace(/\u00AD/g, "")
      // re-join words split by "-" + newline (PDF line-wrap hyphenation)
      .replace(/-[ \t]*\r?\n[ \t]*/g, "")
      // curly single quotes -> '
      .replace(/[\u2018\u2019\u201A\u201B\u2032]/g, "'")
      // curly double quotes -> "
      .replace(/[\u201C\u201D\u201E\u201F\u2033]/g, '"')
      // en/em/figure/horizontal-bar dashes -> -
      .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, "-")
      .toLowerCase()
      // collapse all whitespace (including NBSP) to a single space
      .replace(/\s+/g, " ")
      .trim()
  );
}

function matchTokens(normalized: string): string[] {
  return normalized
    .split(" ")
    .map((t) => t.replace(/[^\p{L}\p{N}]/gu, ""))
    .filter((t) => t.length > 0);
}

/**
 * Returns true if the quote is an exact (normalized) substring of the chunk,
 * or if at least 90% of the quote's tokens appear in order within a window of
 * the chunk that has the same token length as the quote.
 */
export function verifyQuote(quote: string, chunkContent: string): boolean {
  const q = normalizeForMatch(quote ?? "");
  const c = normalizeForMatch(chunkContent ?? "");
  if (q.length === 0 || c.length === 0) return false;
  if (c.includes(q)) return true;

  // Fallback: ordered-token overlap within a same-length window.
  const qTok = matchTokens(q);
  const cTok = matchTokens(c);
  const n = qTok.length;
  if (n === 0 || cTok.length < n) return false;
  const needed = Math.ceil(n * 0.9);

  for (let start = 0; start + n <= cTok.length; start++) {
    // Greedy in-order subsequence match of the quote's tokens inside the
    // window, allowing the quote pointer to skip up to 3 tokens so a single
    // altered or dropped word does not derail the rest of the match.
    let qi = 0;
    let matched = 0;
    for (let wi = start; wi < start + n && qi < n; wi++) {
      const tok = cTok[wi];
      let found = -1;
      for (let look = 0; look <= 3 && qi + look < n; look++) {
        if (qTok[qi + look] === tok) {
          found = look;
          break;
        }
      }
      if (found >= 0) {
        matched++;
        qi += found + 1;
      }
    }
    if (matched >= needed) return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Claude-based support verification (one batched call)
// ---------------------------------------------------------------------------

export interface SupportItem {
  id: string;
  /** The generated content to check (answer + explanation, definition, ...). */
  claim: string;
  evidence_quote: string;
}

export interface SupportVerdict {
  id: string;
  supported: boolean;
  reason: string;
}

const CHECKER_SYSTEM = `You are a strict fact checker for an education platform. You receive generated curriculum items, each with an evidence quote copied from the teacher's source material, plus the full source material for context.

For EACH item decide: is the item's content FULLY entailed by its evidence_quote? "Fully entailed" means every factual claim in the item (the correct answer, the explanation, the definition, the numbers, the names) follows from the quote without needing outside knowledge. Wording may differ; meaning may not. The surrounding source text may only be used to resolve what a pronoun or abbreviation in the quote refers to, never to supply extra facts.

Mark supported: false if the item adds any fact, number, example, or interpretation that the quote does not state, if the item contradicts the quote, or if the quote is vague enough that the item's key claim cannot be confirmed from it.

Return JSON only, no markdown fences:
{"verdicts": [{"id": "item id", "supported": true, "reason": "one short sentence"}]}
Include exactly one verdict for every item id you were given.`;

/**
 * One batched call to a strict checker. Returns a verdict for every item; any
 * item the checker omits is reported as unsupported.
 */
export async function verifySupport(
  items: SupportItem[],
  sourceBlock: string,
  anthropic: Anthropic,
): Promise<SupportVerdict[]> {
  if (items.length === 0) return [];

  const itemsJson = JSON.stringify(
    items.map((it) => ({ id: it.id, evidence_quote: it.evidence_quote, claim: it.claim })),
    null,
    2,
  );
  const user = `SOURCE MATERIAL (context only):\n${sourceBlock}\n\nITEMS TO CHECK:\n${itemsJson}`;

  let raw = "";
  let lastErr: unknown = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const message = await anthropic.messages.create({
        model: CHECKER_MODEL,
        max_tokens: 16000,
        temperature: 0,
        system: CHECKER_SYSTEM,
        messages: [{ role: "user", content: user }],
      });
      raw = firstTextBlock(message);
      lastErr = null;
      break;
    } catch (err) {
      lastErr = err;
    }
  }
  if (lastErr) {
    const detail = lastErr instanceof Error ? lastErr.message : String(lastErr);
    throw new Error(`Support checker call failed: ${detail}`);
  }

  const byId = new Map<string, SupportVerdict>();
  try {
    const parsed = parseJsonObject(raw) as { verdicts?: unknown };
    if (Array.isArray(parsed.verdicts)) {
      for (const v of parsed.verdicts) {
        if (!isRecord(v) || typeof v.id !== "string") continue;
        byId.set(v.id, {
          id: v.id,
          supported: v.supported === true,
          reason: typeof v.reason === "string" ? v.reason : "",
        });
      }
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new Error(`Support checker returned invalid JSON: ${detail}`);
  }

  return items.map(
    (it) =>
      byId.get(it.id) ?? {
        id: it.id,
        supported: false,
        reason: "Checker returned no verdict for this item.",
      },
  );
}

// ---------------------------------------------------------------------------
// Combined pipeline: quote check -> support check
// ---------------------------------------------------------------------------

export interface GroundedItem {
  id: string;
  source_ids: string[];
  evidence_quote: string;
  /** Text the checker must find entailed by the quote. */
  claim: string;
}

export interface GroundingResult {
  status: "verified" | "failed";
  reason: string;
  /** Chunk uuids: every cited S-id that exists, plus the chunk the quote matched. */
  chunkIds: string[];
}

/** Coerces a model-supplied source_ids value into a clean string array. */
export function asSourceIds(v: unknown): string[] {
  if (typeof v === "string") v = [v];
  if (!Array.isArray(v)) return [];
  return v
    .filter((x): x is string => typeof x === "string")
    .map((s) => s.trim().toUpperCase())
    .filter((s) => /^S\d+$/.test(s));
}

/**
 * Checks the quote against the cited chunks (falling back to every chunk in
 * case the model mislabeled the S-id). Returns the chunk uuids to store.
 */
export function checkQuote(
  item: { source_ids: string[]; evidence_quote: string },
  block: SourceBlock,
): { ok: boolean; chunkIds: string[]; reason: string } {
  const quote = (item.evidence_quote ?? "").trim();
  if (quote.length === 0) {
    return { ok: false, chunkIds: [], reason: "Missing evidence_quote." };
  }

  const cited = item.source_ids.filter((sid) => block.chunksBySid[sid]);
  const chunkIds = new Set<string>(cited.map((sid) => block.sidToChunkId[sid]));

  for (const sid of cited) {
    if (verifyQuote(quote, block.chunksBySid[sid].content)) {
      return { ok: true, chunkIds: [...chunkIds], reason: "" };
    }
  }
  // Fallback: the quote may be real but attributed to the wrong S-id.
  for (const [sid, chunk] of Object.entries(block.chunksBySid)) {
    if (cited.includes(sid)) continue;
    if (verifyQuote(quote, chunk.content)) {
      chunkIds.add(block.sidToChunkId[sid]);
      return { ok: true, chunkIds: [...chunkIds], reason: "" };
    }
  }
  return {
    ok: false,
    chunkIds: [...chunkIds],
    reason:
      cited.length === 0
        ? "No valid source_ids and the quote was not found in any source."
        : "evidence_quote is not an exact copy of the cited source text.",
  };
}

/**
 * Runs verifyQuote on every item, then verifySupport on the survivors in one
 * batched call. Every input id gets a result.
 */
export async function verifyGroundedItems(
  items: GroundedItem[],
  block: SourceBlock,
  anthropic: Anthropic,
): Promise<Map<string, GroundingResult>> {
  const results = new Map<string, GroundingResult>();
  const survivors: { item: GroundedItem; chunkIds: string[] }[] = [];

  for (const item of items) {
    const q = checkQuote(item, block);
    if (q.ok) {
      survivors.push({ item, chunkIds: q.chunkIds });
    } else {
      results.set(item.id, { status: "failed", reason: q.reason, chunkIds: q.chunkIds });
    }
  }

  if (survivors.length > 0) {
    const verdicts = await verifySupport(
      survivors.map(({ item }) => ({
        id: item.id,
        claim: item.claim,
        evidence_quote: item.evidence_quote,
      })),
      block.text,
      anthropic,
    );
    const verdictById = new Map(verdicts.map((v) => [v.id, v]));
    for (const { item, chunkIds } of survivors) {
      const v = verdictById.get(item.id);
      if (v?.supported) {
        results.set(item.id, { status: "verified", reason: "", chunkIds });
      } else {
        results.set(item.id, {
          status: "failed",
          reason: `Not entailed by evidence_quote: ${v?.reason ?? "no verdict"}`,
          chunkIds,
        });
      }
    }
  }

  return results;
}

/** Renders failed items for a "fix only these" retry prompt. */
export function formatFailures(
  failures: { id: string; reason: string; item: unknown }[],
): string {
  return failures
    .map(
      (f) =>
        `- id "${f.id}" FAILED because: ${f.reason}\n  previous item: ${JSON.stringify(f.item)}`,
    )
    .join("\n");
}

// ---------------------------------------------------------------------------
// Claude call + JSON helpers
// ---------------------------------------------------------------------------

export function firstTextBlock(message: Anthropic.Message): string {
  for (const block of message.content) {
    if (block.type === "text") return block.text;
  }
  return "";
}

/** Strips markdown code fences Claude sometimes adds despite instructions. */
export function stripFences(s: string): string {
  return s.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
}

export const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

export function parseJsonObject(raw: string): Record<string, unknown> {
  const cleaned = stripFences(raw);
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    // Tolerate leading/trailing prose by slicing to the outermost braces.
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start < 0 || end <= start) throw new Error("No JSON object in model response");
    parsed = JSON.parse(cleaned.slice(start, end + 1));
  }
  if (!isRecord(parsed)) throw new Error("Model response was not a JSON object");
  return parsed;
}

/**
 * One grounded generation call: temperature 0, GROUNDING_RULES appended to
 * the system prompt. Returns the parsed JSON object.
 */
export async function groundedGenerate(
  anthropic: Anthropic,
  opts: { system: string; user: string; maxTokens?: number; tag: string },
): Promise<Record<string, unknown>> {
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: opts.maxTokens ?? 16000,
    temperature: 0,
    system: opts.system + GROUNDING_RULES,
    messages: [{ role: "user", content: opts.user }],
  });
  const raw = firstTextBlock(message);
  console.log(
    `[${opts.tag}] Claude responded: stop=${message.stop_reason}, ` +
      `in=${message.usage.input_tokens}, out=${message.usage.output_tokens}, chars=${raw.length}`,
  );
  if (message.stop_reason === "max_tokens") {
    console.error(`[${opts.tag}] Response truncated at max_tokens.`);
  }
  return parseJsonObject(raw);
}

/** Reads the model's insufficient_source flag + reason from a response. */
export function readInsufficient(
  parsed: Record<string, unknown>,
): string | null {
  if (parsed.insufficient_source !== true) return null;
  const reason = parsed.insufficient_source_reason;
  return typeof reason === "string" && reason.trim().length > 0
    ? reason.trim()
    : "The sources did not support the requested number of items.";
}

// ---------------------------------------------------------------------------
// Supabase helpers (service role)
// ---------------------------------------------------------------------------

// deno-lint-ignore no-explicit-any
type AnySupabase = any;

/**
 * Loads ALL source chunks for an upload in chunk_index order, including
 * trashed ones (needed for coverage reporting). Pass the result through
 * usableChunks() / buildSourceBlock() before anything reaches the model.
 */
export async function loadChunks(
  supabase: AnySupabase,
  uploadId: string,
  subLessonId?: string | null,
): Promise<SourceChunk[]> {
  // select("*") so this works before AND after the teacher_status column is
  // added by sql/2026-09-11_teacher_curation.sql; a missing column reads as
  // undefined, which every caller treats as 'active'.
  // With a sub-lesson, ONLY its own pages are returned: a sub-lesson never
  // sees another sub-lesson's chunks (docs/curation-contract.md section 8).
  let query = supabase
    .from("curriculum_source_chunks")
    .select("*")
    .eq("upload_id", uploadId);
  if (subLessonId) query = query.eq("sub_lesson_id", subLessonId);
  const { data, error } = await query.order("chunk_index", { ascending: true });
  if (error) throw new Error(`Load source chunks: ${error.message}`);
  return (data ?? []) as SourceChunk[];
}

// ---------------------------------------------------------------------------
// Sub-lessons (public.sub_lessons): one upload -> several lessons, each built
// from only its own chunks.
// ---------------------------------------------------------------------------

export interface SubLessonRow {
  id: string;
  upload_id: string;
  title: string;
  sort_order: number;
  instructions: string | null;
  generation_settings: unknown;
  coverage_report: unknown;
  insufficient_source_reason: string | null;
}

/**
 * The sub-lesson a run is scoped to. With an id: that row (must belong to
 * the upload). Without: the upload's default (lowest sort_order), created on
 * the spot (owning every chunk) if the upload has none yet, so older
 * clients that never send subLessonId keep working unchanged.
 */
export async function resolveSubLesson(
  supabase: AnySupabase,
  uploadId: string,
  subLessonId: unknown,
  fallbackTitle?: string,
): Promise<SubLessonRow> {
  if (typeof subLessonId === "string" && subLessonId.length > 0) {
    const { data, error } = await supabase.from("sub_lessons").select("*").eq("id", subLessonId).eq("upload_id", uploadId).maybeSingle();
    if (error) throw new Error(`Load sub-lesson: ${error.message}`);
    if (!data) throw new Error("subLessonId does not belong to this upload.");
    return data as SubLessonRow;
  }
  return ensureDefaultSubLesson(supabase, uploadId, fallbackTitle);
}

/**
 * Returns the upload's first sub-lesson, creating the default one (title =
 * file name, owning every chunk that has no owner yet) when none exists.
 */
export async function ensureDefaultSubLesson(
  supabase: AnySupabase,
  uploadId: string,
  fallbackTitle?: string,
): Promise<SubLessonRow> {
  const { data: existing, error } = await supabase
    .from("sub_lessons")
    .select("*")
    .eq("upload_id", uploadId)
    .order("sort_order", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(`Load sub-lessons: ${error.message}`);
  let row = existing as SubLessonRow | null;
  if (!row) {
    const { data: upload } = await supabase
      .from("curriculum_uploads")
      .select("file_name, generation_settings, coverage_report, insufficient_source_reason")
      .eq("id", uploadId)
      .maybeSingle();
    const title = (fallbackTitle ?? String(upload?.file_name ?? "")).replace(/\.pdf$/i, "").trim() || "Lesson 1";
    const { data: created, error: cErr } = await supabase
      .from("sub_lessons")
      .insert({
        upload_id: uploadId,
        title,
        sort_order: 0,
        generation_settings: upload?.generation_settings ?? null,
        coverage_report: upload?.coverage_report ?? null,
        insufficient_source_reason: upload?.insufficient_source_reason ?? null,
      })
      .select("*")
      .single();
    if (cErr || !created) throw new Error(`Create default sub-lesson: ${cErr?.message ?? "unknown error"}`);
    row = created as SubLessonRow;
  }
  // Adopt anything on this upload that has no owner yet (chunks, lessons,
  // questions). No-ops when everything is already assigned.
  for (const table of ["curriculum_source_chunks", "lessons", "generated_questions"]) {
    const { error: aErr } = await supabase.from(table).update({ sub_lesson_id: row.id }).eq("upload_id", uploadId).is("sub_lesson_id", null);
    if (aErr) console.error(`[${uploadId}] adopt ${table} into default sub-lesson: ${aErr.message}`);
  }
  return row;
}

// ---------------------------------------------------------------------------
// Teacher curation: extracted items with their marks
// ---------------------------------------------------------------------------

export type CurationItemType = "concept" | "vocabulary" | "objective" | "chunk";

export interface CurationItem {
  /** Row uuid. */
  id: string;
  type: CurationItemType;
  /** Short prompt key: C1, V2, O1 (chunks use their S-id instead). */
  key: string;
  /** Concept name / vocab term / objective text. */
  label: string;
  /** Definition (concepts, vocabulary) or "" (objectives). */
  detail: string;
  teacher_status: TeacherStatus;
  grounding_status: GroundingStatus;
}

export interface CurationSet {
  concepts: CurationItem[];
  vocabulary: CurationItem[];
  objectives: CurationItem[];
  /** All items in one list, in the same order. */
  all: CurationItem[];
}

const asTeacherStatus = (v: unknown): TeacherStatus =>
  v === "emphasized" || v === "trashed" ? v : "active";
const asGroundingStatus = (v: unknown): GroundingStatus =>
  v === "verified" || v === "failed" ? v : "unverified";

/**
 * Loads concepts / vocabulary / learning objectives for an upload with their
 * teacher_status (read at call time) and assigns stable prompt keys.
 */
export async function loadCurationSet(
  supabase: AnySupabase,
  uploadId: string,
  /** Sub-lesson scope: only items cited from one of these chunks. Items with no citation are left out. */
  ownedChunkIds?: Set<string> | null,
): Promise<CurationSet> {
  const [c, v, o] = await Promise.all([
    supabase
      .from("concepts")
      .select("id, name, definition, teacher_status, grounding_status, source_chunk_ids")
      .eq("upload_id", uploadId)
      .order("created_at", { ascending: true }),
    supabase
      .from("vocabulary")
      .select("id, term, definition, teacher_status, grounding_status, source_chunk_ids")
      .eq("upload_id", uploadId)
      .order("id", { ascending: true }),
    supabase
      .from("learning_objectives")
      .select("id, objective, teacher_status, grounding_status, source_chunk_ids")
      .eq("upload_id", uploadId)
      .order("id", { ascending: true }),
  ]);
  for (const r of [c, v, o]) {
    if (r.error) throw new Error(`Load curation items: ${r.error.message}`);
  }
  // An item belongs to every sub-lesson that owns a chunk it was cited from
  // (so an item cited from two sub-lessons' pages appears in both).
  const inScope = (r: Record<string, unknown>): boolean => {
    if (!ownedChunkIds) return true;
    const ids = Array.isArray(r.source_chunk_ids) ? (r.source_chunk_ids as unknown[]) : [];
    return ids.some((id) => typeof id === "string" && ownedChunkIds.has(id));
  };
  // deno-lint-ignore no-explicit-any
  const rows = (r: any): Record<string, unknown>[] => ((r.data ?? []) as Record<string, unknown>[]).filter(inScope);

  const concepts: CurationItem[] = rows(c).map((r, i) => ({
    id: String(r.id),
    type: "concept",
    key: `C${i + 1}`,
    label: String(r.name ?? ""),
    detail: String(r.definition ?? ""),
    teacher_status: asTeacherStatus(r.teacher_status),
    grounding_status: asGroundingStatus(r.grounding_status),
  }));
  const vocabulary: CurationItem[] = rows(v).map((r, i) => ({
    id: String(r.id),
    type: "vocabulary",
    key: `V${i + 1}`,
    label: String(r.term ?? ""),
    detail: String(r.definition ?? ""),
    teacher_status: asTeacherStatus(r.teacher_status),
    grounding_status: asGroundingStatus(r.grounding_status),
  }));
  const objectives: CurationItem[] = rows(o).map((r, i) => ({
    id: String(r.id),
    type: "objective",
    key: `O${i + 1}`,
    label: String(r.objective ?? ""),
    detail: "",
    teacher_status: asTeacherStatus(r.teacher_status),
    grounding_status: asGroundingStatus(r.grounding_status),
  }));
  return { concepts, vocabulary, objectives, all: [...concepts, ...vocabulary, ...objectives] };
}

/** Items the model may be told about: not trashed and not grounding-failed. */
export function usableItems(items: CurationItem[]): CurationItem[] {
  return items.filter((it) => it.teacher_status !== "trashed" && it.grounding_status !== "failed");
}

export function emphasizedItems(items: CurationItem[]): CurationItem[] {
  return usableItems(items).filter((it) => it.teacher_status === "emphasized");
}

export function trashedItems(items: CurationItem[]): CurationItem[] {
  return items.filter((it) => it.teacher_status === "trashed");
}

/** Minimum verified questions an item must get, by teacher mark. */
export function questionTarget(item: CurationItem): number {
  if (item.teacher_status !== "emphasized") return 0;
  return item.type === "vocabulary" ? 1 : 3;
}

/** Coerces a model-supplied covers_keys value into known keys only. */
export function asCoverKeys(v: unknown, known: Set<string>): string[] {
  if (typeof v === "string") v = [v];
  if (!Array.isArray(v)) return [];
  const out: string[] = [];
  for (const x of v) {
    if (typeof x !== "string") continue;
    const k = x.trim().toUpperCase();
    if (known.has(k) && !out.includes(k)) out.push(k);
  }
  return out;
}

/**
 * Renders the TEACHER CURATION section of a generation prompt: the guide of
 * usable items with keys, the emphasized minimums, the trashed exclusions, and
 * the priority sources. Emphasis never overrides GROUNDING_RULES.
 */
export function renderCurationPrompt(
  set: CurationSet,
  block: SourceBlock,
  opts: { questionMinimums: boolean },
): string {
  const usable = usableItems(set.all);
  const guide = usable.length
    ? usable
        .map((it) => {
          const mark = it.teacher_status === "emphasized" ? " [EMPHASIZED]" : "";
          const detail = it.detail ? ` - ${it.detail}` : "";
          return `${it.key}${mark} (${it.type}) ${it.label}${detail}`;
        })
        .join("\n")
    : "(no extracted items; cover the most prominent ideas in the sources)";

  const emphasized = emphasizedItems(set.all);
  const trashed = trashedItems(set.all);

  const lines: string[] = [];
  lines.push(`ITEM GUIDE (keys are for tagging "covers_keys"; facts must come from the sources):\n${guide}`);

  if (emphasized.length > 0) {
    const mins = emphasized
      .map((it) => {
        if (!opts.questionMinimums) {
          return it.type === "vocabulary"
            ? `- ${it.key} "${it.label}": use this term in the lesson text.`
            : `- ${it.key} "${it.label}": give it its OWN teaching segment.`;
        }
        return `- ${it.key} "${it.label}": at least ${questionTarget(it)} question(s) tagged with ${it.key}.`;
      })
      .join("\n");
    lines.push(
      `TEACHER EMPHASIS. The teacher marked these items as most important:\n${mins}\n` +
        `Emphasis never overrides the grounding rules: if the sources cannot support the minimum, produce what they support and set "insufficient_source": true with the reason.`,
    );
  }
  if (trashed.length > 0) {
    lines.push(
      `TEACHER TRASHED these topics. Do NOT teach, define, or ask about them:\n` +
        trashed.map((it) => `- (${it.type}) ${it.label}`).join("\n"),
    );
  }
  if (block.prioritySids.length > 0) {
    lines.push(
      `PRIORITY SOURCES: the teacher marked ${block.prioritySids.join(", ")} (priority="true") as most important. Draw on them first and cite them where they support an item.`,
    );
  }
  return lines.join("\n\n");
}

// ---------------------------------------------------------------------------
// Coverage report (computed in code, never by the model)
// ---------------------------------------------------------------------------

export interface CoverageEntry {
  /** "instruction": a teacher instruction skipped because the sources did not support it. */
  item_type: CurationItemType | "instruction";
  item_id: string;
  label: string;
  teacher_status: TeacherStatus;
  questions_generated: number;
  target: number;
  note: string;
}

export async function loadCoverageReport(
  supabase: AnySupabase,
  uploadId: string,
  subLessonId?: string | null,
): Promise<CoverageEntry[]> {
  const { data } = subLessonId
    ? await supabase.from("sub_lessons").select("coverage_report").eq("id", subLessonId).maybeSingle()
    : await supabase.from("curriculum_uploads").select("coverage_report").eq("id", uploadId).maybeSingle();
  const raw = data?.coverage_report;
  return Array.isArray(raw) ? (raw as CoverageEntry[]) : [];
}

/** Coverage is per sub-lesson (sub_lessons.coverage_report); the upload row keeps a copy for older clients. */
export async function saveCoverageReport(
  supabase: AnySupabase,
  uploadId: string,
  report: CoverageEntry[],
  subLessonId?: string | null,
): Promise<void> {
  if (subLessonId) {
    const { error: sErr } = await supabase.from("sub_lessons").update({ coverage_report: report }).eq("id", subLessonId);
    if (sErr) console.error(`[${uploadId}] Failed to save sub-lesson coverage_report: ${sErr.message}`);
  }
  const { error } = await supabase
    .from("curriculum_uploads")
    .update({ coverage_report: report })
    .eq("id", uploadId);
  if (error) console.error(`[${uploadId}] Failed to save coverage_report: ${error.message}`);
}

/** Appends text to an entry's note, keeping earlier notes. */
export function appendNote(entry: CoverageEntry, text: string): void {
  if (!text) return;
  entry.note = entry.note ? `${entry.note} ${text}` : text;
}

// ---------------------------------------------------------------------------
// Teacher generation settings (curriculum_uploads.generation_settings).
// Mirrors normalizeSettings() in src/components/teacher/curation/api.ts.
// ---------------------------------------------------------------------------

export type DifficultyLevel = "easier" | "balanced" | "harder" | "mixed";

export interface GenerationSettings {
  bankSize: number;
  difficulty: DifficultyLevel;
  microChecks: number;
  masteryRequired: number;
}

export const DEFAULT_SETTINGS: GenerationSettings = { bankSize: 15, difficulty: "mixed", microChecks: 2, masteryRequired: 4 };
export const SETTINGS_LIMITS = { bankSize: [5, 30], microChecks: [0, 4], masteryRequired: [1, 15] } as const;

const clampInt = (v: unknown, min: number, max: number, fallback: number): number => {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.round(n)));
};

export function normalizeGenerationSettings(raw: unknown): GenerationSettings {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const bankSize = clampInt(r.bankSize, SETTINGS_LIMITS.bankSize[0], SETTINGS_LIMITS.bankSize[1], DEFAULT_SETTINGS.bankSize);
  const d = r.difficulty;
  const difficulty: DifficultyLevel = d === "easier" || d === "balanced" || d === "harder" || d === "mixed" ? d : DEFAULT_SETTINGS.difficulty;
  return {
    bankSize,
    difficulty,
    microChecks: clampInt(r.microChecks, SETTINGS_LIMITS.microChecks[0], SETTINGS_LIMITS.microChecks[1], DEFAULT_SETTINGS.microChecks),
    masteryRequired: clampInt(r.masteryRequired, SETTINGS_LIMITS.masteryRequired[0], Math.min(SETTINGS_LIMITS.masteryRequired[1], bankSize), DEFAULT_SETTINGS.masteryRequired),
  };
}

/**
 * Settings for a run: the request body's `settings` wins, then the upload
 * row's generation_settings column (tolerated if the column is missing),
 * then defaults.
 */
export async function loadGenerationSettings(
  supabase: AnySupabase,
  uploadId: string,
  bodySettings: unknown,
  subLessonId?: string | null,
): Promise<GenerationSettings> {
  if (bodySettings && typeof bodySettings === "object") return normalizeGenerationSettings(bodySettings);
  // Per sub-lesson first (sub_lessons.generation_settings), then the upload's.
  if (subLessonId) {
    const { data: sub } = await supabase.from("sub_lessons").select("generation_settings").eq("id", subLessonId).maybeSingle();
    if (sub?.generation_settings && typeof sub.generation_settings === "object") return normalizeGenerationSettings(sub.generation_settings);
  }
  const { data, error } = await supabase.from("curriculum_uploads").select("generation_settings").eq("id", uploadId).maybeSingle();
  if (error || !data) return normalizeGenerationSettings(null);
  return normalizeGenerationSettings(data.generation_settings);
}

/** Share of easy / medium / hard for each level. */
const DIFFICULTY_MIX: Record<DifficultyLevel, [number, number, number]> = {
  easier: [0.7, 0.25, 0.05],
  balanced: [0.2, 0.6, 0.2],
  harder: [0.05, 0.3, 0.65],
  mixed: [0.33, 0.4, 0.27],
};

/** Exact easy / medium / hard counts for n questions (sums to n). */
export function difficultyCounts(level: DifficultyLevel, n: number): { easy: number; medium: number; hard: number } {
  const [e, m] = DIFFICULTY_MIX[level] ?? DIFFICULTY_MIX.mixed;
  const easy = Math.round(n * e);
  const medium = Math.round(n * m);
  const hard = Math.max(0, n - easy - medium);
  return { easy, medium, hard };
}

/**
 * Prompt text for the requested difficulty. Models follow exact counts far
 * better than percentages, so when n is given the line says how many of each.
 */
export function difficultyInstruction(level: DifficultyLevel, n?: number): string {
  const what =
    'Tag each question honestly: "easy" = recall a definition or fact stated in the sources; "medium" = understand or explain an idea from the sources; "hard" = apply, compare, or work through an example that appears in the sources. Hard questions are still grounded: every answer must be supported by an exact quote.';
  if (n && n > 0) {
    const c = difficultyCounts(level, n);
    return `DIFFICULTY (${level.toUpperCase()}): of the ${n} questions, write exactly ${c.easy} "easy", ${c.medium} "medium" and ${c.hard} "hard". ${what}`;
  }
  const [e, m, h] = DIFFICULTY_MIX[level] ?? DIFFICULTY_MIX.mixed;
  return `DIFFICULTY (${level.toUpperCase()}): about ${Math.round(e * 100)}% "easy", ${Math.round(m * 100)}% "medium", ${Math.round(h * 100)}% "hard". ${what}`;
}

/**
 * Appends a "[stage] reason" line to curriculum_uploads.insufficient_source_reason.
 */
export async function recordInsufficientSource(
  supabase: AnySupabase,
  uploadId: string,
  stage: string,
  reason: string,
  subLessonId?: string | null,
): Promise<void> {
  const table = subLessonId ? "sub_lessons" : "curriculum_uploads";
  const id = subLessonId ?? uploadId;
  const { data } = await supabase.from(table).select("insufficient_source_reason").eq("id", id).maybeSingle();
  const existing = (data?.insufficient_source_reason as string | null) ?? "";
  const line = `[${stage}] ${reason}`;
  const next = existing.includes(line) ? existing : [existing, line].filter(Boolean).join("\n");
  const { error } = await supabase.from(table).update({ insufficient_source_reason: next }).eq("id", id);
  if (error) {
    console.error(`[${uploadId}] Failed to record insufficient_source_reason on ${table}: ${error.message}`);
  }
}
