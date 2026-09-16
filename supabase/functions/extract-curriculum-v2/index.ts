// Supabase Edge Function: extract-curriculum-v2
//
// Source-grounded successor to extract-curriculum. Accepts page-level text,
// stores ONE chunk per PDF page in curriculum_source_chunks (pages over 1,500
// words are split; pages under 30 words merge into the next), then extracts
// learning objectives / concepts / vocabulary from those chunks ONLY, with a
// verified citation (source_chunk_ids + evidence_quote) on every item.
//
// The work is STEPPED so no single request approaches the edge-function
// wall-clock limit (150 s on the free plan; the gateway also answers 504 after
// 150 s). The client drives the steps and polls the upload row for progress:
//
//   1. { uploadId, pages, reextract? }        "plan":  gate, store chunks, create
//                                             the default sub-lesson, split the
//                                             chunks into small page groups and
//                                             save the plan (extraction_progress).
//   2. { uploadId, step: "group", group: i }  extract + verify + persist ONE group
//                                             (its pages only). A group that fails
//                                             is recorded and the run continues.
//   3. { uploadId, step: "finalize" }         merge duplicates across groups (a
//                                             concept found in three groups becomes
//                                             one row citing all its chunks), then
//                                             decide: zero items overall = FAILURE
//                                             (status extraction_failed, 422);
//                                             otherwise awaiting_teacher_review,
//                                             noting groups that produced nothing.
//   { uploadId, step: "status" }              current progress (for resuming an
//                                             interrupted run without the PDF).
//
// Legacy shape { uploadId, extractedText } is accepted by step 1 (as page 1).
//
// Writes: curriculum_source_chunks, sub_lessons (default), concepts /
//         vocabulary / learning_objectives (with grounding columns),
//         curriculum_uploads.status / extraction_stage / extraction_progress /
//         insufficient_source_reason (+ extracted_text if empty).
//
// Runtime:  Deno (Supabase Edge Functions)
// Env vars: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Project:  InvestiPlay (vcjdshippmqopaffuzbw)
import Anthropic from "npm:@anthropic-ai/sdk@0.70.0";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";
import {
  asSourceIds,
  buildSourceBlock,
  chunkLabel,
  countWords,
  formatFailures,
  groundedGenerate,
  isRecord,
  MIN_SOURCE_WORDS,
  NOT_ENOUGH_TEXT_MESSAGE,
  readInsufficient,
  recordInsufficientSource,
  type GroundedItem,
  type GroundingResult,
  type SourceChunk,
  verifyGroundedItems,
  ensureDefaultSubLesson,
} from "../_shared/grounding.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DifficultyLevel = "beginner" | "intermediate" | "advanced";

interface PageInput {
  page: number;
  text: string;
}

interface RequestBody {
  uploadId: string;
  pages?: PageInput[];
  extractedText?: string;
  /** Re-run extraction on an upload that already has chunks (resets teacher marks). */
  reextract?: boolean;
  /** Stepped run: omitted = plan; "group" needs `group`; "finalize"; "status". */
  step?: "group" | "finalize" | "status";
  group?: number;
}

interface GroupFailure {
  group: number;
  pages: string;
  reason: string;
}

/** curriculum_uploads.extraction_progress (sql/2026-09-16_extraction_progress.sql). */
interface Progress {
  groups: number;
  plan: string[][];
  pages: string[];
  done: number[];
  failed: GroupFailure[];
  current: number | null;
  counts: { concepts: number; vocabulary: number; objectives: number };
}

interface Cited {
  source_ids: string[];
  evidence_quote: string;
}

interface ExtractedConcept extends Cited {
  name: string;
  definition: string;
  prerequisites: string[];
  difficulty_level: DifficultyLevel;
  examples: string[];
}

interface VocabularyItem extends Cited {
  term: string;
  definition: string;
  context: string;
}

interface ObjectiveItem extends Cited {
  text: string;
}

interface ExtractionResult {
  learning_objectives: ObjectiveItem[];
  concepts: ExtractedConcept[];
  vocabulary: VocabularyItem[];
  insufficientReason: string | null;
}

interface ResponseBody {
  success: boolean;
  /** Which step answered: "planned" | "group" | "finalized" | "status". */
  step?: string;
  groups?: number;
  group?: number;
  /** Set on a "group" answer when that group produced nothing (the run continues). */
  groupFailed?: string;
  progress?: Progress;
  conceptsCount: number;
  vocabularyCount: number;
  objectivesCount: number;
  chunksCount: number;
  verifiedCount: number;
  failedCount: number;
  insufficientSourceReason?: string;
  errors?: string[];
}

/** Target characters of source per model call (~2.5k tokens): keeps every step far under the wall clock. */
const GROUP_CHARS = 10_000;
/** Skip the repair pass when a step has already used this much time (ms). */
const RETRY_TIME_BUDGET_MS = 75_000;

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are an educational content analyst for a financial literacy curriculum system. The teacher's uploaded material is given to you as <source> blocks. Extract ONLY what the sources explicitly contain.

REQUIRED OUTPUT FORMAT (JSON only, no preamble):
{
  "learning_objectives": [
    { "text": "An objective stated explicitly in the sources", "source_ids": ["S1"], "evidence_quote": "exact copy of the sentence that states it" }
  ],
  "concepts": [
    {
      "name": "Concept Name",
      "definition": "Student-friendly restatement of the definition GIVEN IN THE SOURCES",
      "prerequisites": ["Other extracted concept name"],
      "difficulty_level": "beginner|intermediate|advanced",
      "examples": ["Only examples that appear in the sources"],
      "source_ids": ["S2"],
      "evidence_quote": "exact copy of the source text that defines this concept"
    }
  ],
  "vocabulary": [
    { "term": "Term", "definition": "Definition as given in the sources", "context": "How the sources use it", "source_ids": ["S1"], "evidence_quote": "exact copy of the defining sentence" }
  ],
  "insufficient_source": false,
  "insufficient_source_reason": ""
}

CONSTRAINTS:
- Only extract a concept or term if the sources clearly define or explain it.
- Do NOT invent learning objectives; only use ones stated explicitly in the sources. Return an empty array if there are none.
- "prerequisites" may only name other concepts you extracted from these sources (or be empty).
- "examples" may only contain examples, numbers, and situations that appear in the sources.
- Difficulty level: count paragraphs the sources spend on the concept (1-2 = beginner, 3-5 = intermediate, 5+ = advanced).
- Return empty arrays if a category has no content. Maximum 50 concepts (prioritize by prominence).

Respond ONLY with valid JSON. No markdown. No explanation.`;

const RETRY_SYSTEM_PROMPT = `You are an educational content analyst for a financial literacy curriculum system. Some previously extracted items FAILED verification: their evidence_quote was not an exact copy of the sources, or the item claimed more than the quote supports.

Fix ONLY the items listed. For each one, return the same id and either:
  (a) the corrected item with a new "evidence_quote" that is an exact, contiguous copy of the source text and fully supports the item's definition, or
  (b) a rewritten item that says only what the sources say, or
  (c) { "id": "...", "drop": true } if the sources genuinely do not support the item.

Return JSON only:
{ "fixed": [ { "id": "concept-3", "kind": "concept", ...same fields as the original item... } ] }`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function respond(body: ResponseBody, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function fail(errors: string[], status: number, extra: Partial<ResponseBody> = {}): Response {
  return respond(
    {
      success: false,
      conceptsCount: 0,
      vocabularyCount: 0,
      objectivesCount: 0,
      chunksCount: 0,
      verifiedCount: 0,
      failedCount: 0,
      ...extra,
      errors,
    },
    status,
  );
}

const VALID_DIFFICULTY: ReadonlySet<string> = new Set(["beginner", "intermediate", "advanced"]);

const asStringArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").map((s) => s.trim()).filter(Boolean) : [];

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

function normalizeConcept(c: Record<string, unknown>): ExtractedConcept | null {
  const difficulty = String(c.difficulty_level ?? "beginner");
  const item: ExtractedConcept = {
    name: str(c.name),
    definition: str(c.definition),
    prerequisites: asStringArray(c.prerequisites),
    difficulty_level: (VALID_DIFFICULTY.has(difficulty) ? difficulty : "beginner") as DifficultyLevel,
    examples: asStringArray(c.examples),
    source_ids: asSourceIds(c.source_ids),
    evidence_quote: str(c.evidence_quote),
  };
  return item.name && item.definition ? item : null;
}

function normalizeVocab(v: Record<string, unknown>): VocabularyItem | null {
  const item: VocabularyItem = {
    term: str(v.term),
    definition: str(v.definition),
    context: str(v.context),
    source_ids: asSourceIds(v.source_ids),
    evidence_quote: str(v.evidence_quote),
  };
  return item.term && item.definition ? item : null;
}

function normalizeObjective(o: unknown): ObjectiveItem | null {
  if (typeof o === "string") {
    // A bare string has no citation; it will fail quote verification and be
    // saved as 'failed' rather than dropped.
    return o.trim() ? { text: o.trim(), source_ids: [], evidence_quote: "" } : null;
  }
  if (!isRecord(o)) return null;
  const item: ObjectiveItem = {
    text: str(o.text) || str(o.objective),
    source_ids: asSourceIds(o.source_ids),
    evidence_quote: str(o.evidence_quote),
  };
  return item.text ? item : null;
}

function normalizeResult(raw: Record<string, unknown>): ExtractionResult {
  const concepts = Array.isArray(raw.concepts)
    ? raw.concepts.filter(isRecord).map(normalizeConcept).filter((c): c is ExtractedConcept => c !== null).slice(0, 50)
    : [];
  const vocabulary = Array.isArray(raw.vocabulary)
    ? raw.vocabulary.filter(isRecord).map(normalizeVocab).filter((v): v is VocabularyItem => v !== null)
    : [];
  const learning_objectives = Array.isArray(raw.learning_objectives)
    ? raw.learning_objectives.map(normalizeObjective).filter((o): o is ObjectiveItem => o !== null)
    : [];
  return { learning_objectives, concepts, vocabulary, insufficientReason: readInsufficient(raw) };
}

// ---------------------------------------------------------------------------
// Chunking
// ---------------------------------------------------------------------------

/** A page longer than this is split into several chunks. */
const MAX_PAGE_WORDS = 1500;
/** A page shorter than this is merged into the next page's chunk. */
const MIN_PAGE_WORDS = 30;

interface DraftChunk {
  page_start: number;
  page_end: number;
  content: string;
}

/**
 * One chunk per PDF page, so teachers can emphasize or trash by page.
 * - A page over MAX_PAGE_WORDS is split into ceil(n / 1500) even pieces, each
 *   labeled with that page.
 * - A page under MIN_PAGE_WORDS (headers, blank-ish pages) is merged into the
 *   next page's chunk; a trailing tiny page merges into the previous chunk.
 * page_start / page_end always reflect the real pages a chunk spans.
 */
function chunkPages(pages: PageInput[]): DraftChunk[] {
  const chunks: DraftChunk[] = [];
  const sorted = [...pages]
    .map((p) => ({ page: p.page, text: (p.text ?? "").trim() }))
    .filter((p) => p.text.length > 0)
    .sort((a, b) => a.page - b.page);

  // Text from tiny pages waiting to be merged into the next chunk.
  let carry: { page_start: number; parts: string[] } | null = null;

  for (const p of sorted) {
    const words = p.text.split(/\s+/);

    if (words.length < MIN_PAGE_WORDS) {
      if (!carry) carry = { page_start: p.page, parts: [] };
      carry.parts.push(p.text);
      continue;
    }

    const pageStart = carry ? carry.page_start : p.page;
    const prefix = carry ? carry.parts.join("\n\n") + "\n\n" : "";
    carry = null;

    if (words.length > MAX_PAGE_WORDS) {
      const pieceCount = Math.ceil(words.length / MAX_PAGE_WORDS);
      const size = Math.ceil(words.length / pieceCount);
      for (let i = 0; i < pieceCount; i++) {
        const piece = words.slice(i * size, (i + 1) * size).join(" ");
        chunks.push({
          page_start: i === 0 ? pageStart : p.page,
          page_end: p.page,
          content: i === 0 ? prefix + piece : piece,
        });
      }
      continue;
    }

    chunks.push({ page_start: pageStart, page_end: p.page, content: prefix + p.text });
  }

  // Trailing tiny pages: merge into the previous chunk, or stand alone.
  if (carry) {
    const tail = carry.parts.join("\n\n");
    const lastPage = sorted[sorted.length - 1].page;
    const prev = chunks[chunks.length - 1];
    if (prev) {
      prev.content += "\n\n" + tail;
      prev.page_end = lastPage;
    } else {
      chunks.push({ page_start: carry.page_start, page_end: lastPage, content: tail });
    }
  }
  return chunks;
}

// ---------------------------------------------------------------------------
// Grounding of extracted items
// ---------------------------------------------------------------------------

type Kind = "concept" | "vocab" | "objective";

interface Slot {
  id: string;
  kind: Kind;
  item: ExtractedConcept | VocabularyItem | ObjectiveItem;
  result?: GroundingResult;
}

function claimFor(slot: Slot): string {
  const it = slot.item;
  if (slot.kind === "concept") {
    const c = it as ExtractedConcept;
    const ex = c.examples.length ? ` Examples: ${c.examples.join("; ")}` : "";
    return `Concept "${c.name}" is defined as: ${c.definition}.${ex}`;
  }
  if (slot.kind === "vocab") {
    const v = it as VocabularyItem;
    return `Term "${v.term}" means: ${v.definition}.`;
  }
  return `Learning objective: ${(it as ObjectiveItem).text}`;
}

function toGrounded(slot: Slot): GroundedItem {
  return { id: slot.id, source_ids: slot.item.source_ids, evidence_quote: slot.item.evidence_quote, claim: claimFor(slot) };
}

async function markStatus(supabase: SupabaseClient, uploadId: string, patch: Record<string, unknown>): Promise<void> {
  const { error } = await supabase.from("curriculum_uploads").update(patch).eq("id", uploadId);
  if (error) console.error(`[ECv2][${uploadId}] Failed to update upload row:`, error.message);
}

/**
 * Progress marker the upload page polls (curriculum_uploads.extraction_stage).
 * Each value is written right before the work it names starts, and cleared
 * (null) on completion or failure. The stages are the real steps of this
 * function: concepts, vocabulary and objectives come out of ONE model pass,
 * so they share the "extracting" stage rather than pretending to be three.
 */
type ExtractionStage = "reading_pages" | "extracting" | "verifying" | "saving";
async function setStage(supabase: SupabaseClient, uploadId: string, stage: ExtractionStage | null): Promise<void> {
  await markStatus(supabase, uploadId, { extraction_stage: stage, extraction_stage_at: new Date().toISOString() });
}

// ---------------------------------------------------------------------------
// Progress helpers
// ---------------------------------------------------------------------------

async function loadProgress(supabase: SupabaseClient, uploadId: string): Promise<Progress | null> {
  const { data } = await supabase.from("curriculum_uploads").select("extraction_progress").eq("id", uploadId).maybeSingle();
  const p = data?.extraction_progress;
  return p && typeof p === "object" && Array.isArray((p as Progress).plan) ? (p as Progress) : null;
}

async function saveProgress(supabase: SupabaseClient, uploadId: string, progress: Progress): Promise<void> {
  await markStatus(supabase, uploadId, { extraction_progress: progress });
}

/** Consecutive chunks, about GROUP_CHARS of text per group, never splitting a chunk. */
function planGroups(chunks: SourceChunk[]): SourceChunk[][] {
  const groups: SourceChunk[][] = [];
  let current: SourceChunk[] = [];
  let chars = 0;
  for (const c of chunks) {
    if (current.length > 0 && chars + c.content.length > GROUP_CHARS) {
      groups.push(current);
      current = [];
      chars = 0;
    }
    current.push(c);
    chars += c.content.length;
  }
  if (current.length > 0) groups.push(current);
  return groups;
}

function groupPageLabel(chunks: SourceChunk[]): string {
  const first = chunks[0];
  const last = chunks[chunks.length - 1];
  const a = first?.page_start ?? null;
  const b = last?.page_end ?? last?.page_start ?? null;
  if (a == null) return `${chunks.length} part${chunks.length === 1 ? "" : "s"}`;
  return b != null && b !== a ? `pp. ${a}-${b}` : `p. ${a}`;
}

function normKey(text: string): string {
  return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------

/** Step 1: gate, store chunks, default sub-lesson, plan the groups. */
async function stepPlan(
  supabase: SupabaseClient,
  uploadId: string,
  body: RequestBody,
  tag: string,
): Promise<Response> {
  let pages: PageInput[] = [];
  if (Array.isArray(body.pages)) {
    pages = body.pages
      .filter((p): p is PageInput => isRecord(p) && typeof (p as PageInput).text === "string")
      .map((p, i) => ({ page: Number.isFinite(Number(p.page)) ? Number(p.page) : i + 1, text: p.text }));
  } else if (typeof body.extractedText === "string" && body.extractedText.trim().length > 0) {
    pages = [{ page: 1, text: body.extractedText }];
  }
  if (pages.length === 0) {
    return fail(["Provide `pages` ([{page, text}]) or `extractedText`."], 400);
  }

  // --- Minimum readable text gate ------------------------------------------
  const fullText = pages.map((p) => p.text.trim()).filter(Boolean).join("\n\n");
  const totalWords = countWords(fullText);
  if (totalWords < MIN_SOURCE_WORDS) {
    console.error(`[${tag}] only ${totalWords} words of readable text; refusing to generate.`);
    await markStatus(supabase, uploadId, {
      status: "extraction_failed",
      extraction_stage: null,
      extraction_progress: null,
      insufficient_source_reason: NOT_ENOUGH_TEXT_MESSAGE,
    });
    return fail([NOT_ENOUGH_TEXT_MESSAGE], 422, { insufficientSourceReason: NOT_ENOUGH_TEXT_MESSAGE });
  }

  const drafts = chunkPages(pages);
  console.log(`[${tag}] ${pages.length} pages, ${totalWords} words -> ${drafts.length} chunks`);

  // An upload that already has chunks is in (or past) teacher review. Only
  // re-extract on explicit request, because it discards the teacher's marks
  // and the previous extraction. "Already extracted" means chunks (v2) OR
  // concepts (v1 legacy) exist: a v1 upload has no chunks but must still be
  // reset, not appended to.
  const [{ count: existingChunks }, { count: existingConcepts }] = await Promise.all([
    supabase.from("curriculum_source_chunks").select("id", { count: "exact", head: true }).eq("upload_id", uploadId),
    supabase.from("concepts").select("id", { count: "exact", head: true }).eq("upload_id", uploadId),
  ]);
  if ((existingChunks ?? 0) > 0 || (existingConcepts ?? 0) > 0) {
    if (body.reextract !== true) {
      return fail(
        ["This upload is already extracted and awaiting teacher review. Pass reextract: true to start over (teacher marks will be reset)."],
        409,
        { chunksCount: existingChunks ?? 0 },
      );
    }
    const { error: detachErr } = await supabase.from("generated_questions").update({ concept_id: null }).eq("upload_id", uploadId);
    if (detachErr) {
      await markStatus(supabase, uploadId, { status: "extraction_failed", extraction_stage: null });
      return fail([`Could not detach existing questions: ${detachErr.message}`], 500);
    }
    // Sub-lessons: page boundaries may change, so the teacher's split cannot
    // survive a re-extract. Keep the first sub-lesson (its title, settings
    // and instructions), drop the rest; their lessons / questions lose their
    // owner here and are adopted by the survivor below (ensureDefaultSubLesson).
    const { data: subs } = await supabase.from("sub_lessons").select("id").eq("upload_id", uploadId).order("sort_order", { ascending: true });
    const subIds = ((subs ?? []) as { id: string }[]).map((r) => r.id);
    if (subIds.length > 1) {
      const { error: sErr } = await supabase.from("sub_lessons").delete().in("id", subIds.slice(1));
      if (sErr) console.error(`[${tag}] could not drop extra sub-lessons: ${sErr.message}`);
    }
    if (subIds.length > 0) {
      await supabase.from("sub_lessons").update({ split_edited_by_teacher: false, sort_order: 0, coverage_report: null, insufficient_source_reason: null }).eq("id", subIds[0]);
    }
    for (const table of ["vocabulary", "learning_objectives", "concepts", "curriculum_source_chunks"]) {
      const { error } = await supabase.from(table).delete().eq("upload_id", uploadId);
      if (error) {
        await markStatus(supabase, uploadId, { status: "extraction_failed", extraction_stage: null });
        return fail([
          `Could not reset ${table}: ${error.message}`,
          ...(table === "concepts" ? ["Generated questions still reference these concepts. Regenerate questions before re-extracting."] : []),
        ], 500);
      }
    }
    await markStatus(supabase, uploadId, { coverage_report: null, insufficient_source_reason: null });
  }

  await markStatus(supabase, uploadId, {
    status: "pending",
    extraction_stage: "reading_pages",
    extraction_stage_at: new Date().toISOString(),
    extraction_progress: null,
    insufficient_source_reason: null,
  });
  const { data: chunkRows, error: chunkErr } = await supabase
    .from("curriculum_source_chunks")
    .insert(drafts.map((d, i) => ({ upload_id: uploadId, chunk_index: i, page_start: d.page_start, page_end: d.page_end, content: d.content })))
    .select("id, chunk_index, page_start, page_end, content");
  if (chunkErr || !chunkRows) {
    await markStatus(supabase, uploadId, { status: "extraction_failed", extraction_stage: null });
    return fail([`Could not store source chunks: ${chunkErr?.message ?? "unknown error"}`], 500);
  }
  const chunks = (chunkRows as SourceChunk[]).sort((a, b) => a.chunk_index - b.chunk_index);

  // Default sub-lesson: one lesson covering every page, created here so a
  // short upload never needs the split step. The teacher can split it later.
  try {
    await ensureDefaultSubLesson(supabase, uploadId);
  } catch (err) {
    console.error(`[${tag}] default sub-lesson: ${err instanceof Error ? err.message : String(err)}`);
  }

  // Keep extracted_text populated for callers that only sent pages.
  const { data: uploadRow } = await supabase.from("curriculum_uploads").select("extracted_text").eq("id", uploadId).maybeSingle();
  if (!uploadRow?.extracted_text) await markStatus(supabase, uploadId, { extracted_text: fullText });

  const groups = planGroups(chunks);
  const progress: Progress = {
    groups: groups.length,
    plan: groups.map((g) => g.map((c) => c.id)),
    pages: groups.map(groupPageLabel),
    done: [],
    failed: [],
    current: null,
    counts: { concepts: 0, vocabulary: 0, objectives: 0 },
  };
  await saveProgress(supabase, uploadId, progress);
  console.log(`[${tag}] planned ${groups.length} groups of ~${GROUP_CHARS} chars`);
  return respond({
    success: true,
    step: "planned",
    groups: groups.length,
    progress,
    conceptsCount: 0,
    vocabularyCount: 0,
    objectivesCount: 0,
    chunksCount: chunks.length,
    verifiedCount: 0,
    failedCount: 0,
  });
}

/** Step 2: extract + verify + persist ONE page group. Never sees other groups' pages. */
async function stepGroup(
  supabase: SupabaseClient,
  anthropic: Anthropic,
  uploadId: string,
  groupIndex: number,
  tag: string,
): Promise<Response> {
  const started = Date.now();
  const progress = await loadProgress(supabase, uploadId);
  if (!progress) return fail(["No extraction plan for this upload. Send the pages first."], 409);
  if (!Number.isInteger(groupIndex) || groupIndex < 0 || groupIndex >= progress.groups) {
    return fail([`group must be between 0 and ${progress.groups - 1}.`], 400);
  }
  const zero = { conceptsCount: 0, vocabularyCount: 0, objectivesCount: 0, chunksCount: 0, verifiedCount: 0, failedCount: 0 };
  if (progress.done.includes(groupIndex)) {
    return respond({ success: true, step: "group", group: groupIndex, progress, ...zero });
  }
  const gtag = `${tag}][group ${groupIndex + 1}/${progress.groups}`;
  const pagesLabel = progress.pages[groupIndex] ?? `group ${groupIndex + 1}`;

  const { data: rows, error: cErr } = await supabase
    .from("curriculum_source_chunks")
    .select("*")
    .in("id", progress.plan[groupIndex])
    .order("chunk_index", { ascending: true });
  if (cErr || !rows || rows.length === 0) {
    return fail([`Could not load the pages of group ${groupIndex + 1}: ${cErr?.message ?? "no chunks"}`], 500);
  }
  const chunks = rows as SourceChunk[];
  const block = buildSourceBlock(chunks);

  progress.current = groupIndex;
  progress.failed = progress.failed.filter((f) => f.group !== groupIndex);
  await markStatus(supabase, uploadId, { extraction_stage: "extracting", extraction_stage_at: new Date().toISOString(), extraction_progress: progress });

  const recordFailure = async (reason: string) => {
    progress.failed.push({ group: groupIndex, pages: pagesLabel, reason });
    progress.current = null;
    await saveProgress(supabase, uploadId, progress);
    console.error(`[${gtag}] produced nothing: ${reason}`);
    return respond({ success: true, step: "group", group: groupIndex, groupFailed: reason, progress, ...zero });
  };

  // --- Generate for this group only ---------------------------------------
  let result: ExtractionResult;
  try {
    const user = `This is part ${groupIndex + 1} of ${progress.groups} of the material (${pagesLabel}). Extract from these sources only.\n\n${block.text}`;
    result = normalizeResult(await groundedGenerate(anthropic, { system: SYSTEM_PROMPT, user, tag: gtag }));
  } catch (err) {
    return recordFailure(`Model error: ${err instanceof Error ? err.message : String(err)}`);
  }

  // --- Verify: quote check -> support check -> one repair pass (time permitting)
  const slots: Slot[] = [
    ...result.concepts.map((item, i) => ({ id: `concept-${i}`, kind: "concept" as Kind, item })),
    ...result.vocabulary.map((item, i) => ({ id: `vocab-${i}`, kind: "vocab" as Kind, item })),
    ...result.learning_objectives.map((item, i) => ({ id: `objective-${i}`, kind: "objective" as Kind, item })),
  ];
  if (slots.length === 0) {
    return recordFailure(result.insufficientReason ? `The model reported: ${result.insufficientReason}` : "The model returned no concepts, vocabulary or objectives for these pages.");
  }
  await markStatus(supabase, uploadId, { extraction_stage: "verifying", extraction_stage_at: new Date().toISOString() });
  try {
    const first = await verifyGroundedItems(slots.map(toGrounded), block, anthropic);
    for (const s of slots) s.result = first.get(s.id);
    const failed = slots.filter((s) => s.result?.status === "failed");
    console.log(`[${gtag}] pass 1: ${slots.length - failed.length} verified, ${failed.length} failed (${Math.round((Date.now() - started) / 1000)}s)`);
    if (failed.length > 0 && Date.now() - started < RETRY_TIME_BUDGET_MS) {
      const user =
        `SOURCES:\n${block.text}\n\nITEMS TO FIX:\n` +
        formatFailures(failed.map((s) => ({ id: s.id, reason: s.result!.reason, item: { kind: s.kind, ...s.item } })));
      const parsed = await groundedGenerate(anthropic, { system: RETRY_SYSTEM_PROMPT, user, tag: `${gtag}][retry` });
      const fixedList = Array.isArray(parsed.fixed) ? parsed.fixed.filter(isRecord) : [];
      const fixedById = new Map<string, Record<string, unknown>>();
      for (const f of fixedList) if (typeof f.id === "string") fixedById.set(f.id, f);
      const retrySlots: Slot[] = [];
      for (const s of failed) {
        const f = fixedById.get(s.id);
        if (!f || f.drop === true) continue;
        let replacement: Slot["item"] | null = null;
        if (s.kind === "concept") replacement = normalizeConcept(f);
        else if (s.kind === "vocab") replacement = normalizeVocab(f);
        else replacement = normalizeObjective(f);
        if (replacement) {
          s.item = replacement;
          retrySlots.push(s);
        }
      }
      if (retrySlots.length > 0) {
        const second = await verifyGroundedItems(retrySlots.map(toGrounded), block, anthropic);
        for (const s of retrySlots) s.result = second.get(s.id) ?? s.result;
      }
    } else if (failed.length > 0) {
      console.log(`[${gtag}] skipping repair pass: time budget used`);
    }
  } catch (err) {
    return recordFailure(`Verification error: ${err instanceof Error ? err.message : String(err)}`);
  }

  // --- Persist this group's items (failed items kept with grounding_status = 'failed')
  const grounding = (s: Slot) => ({
    source_chunk_ids: s.result?.chunkIds.length ? s.result.chunkIds : null,
    evidence_quote: s.item.evidence_quote || null,
    grounding_status: s.result?.status ?? "failed",
  });
  const errors: string[] = [];
  const conceptSlots = slots.filter((s) => s.kind === "concept");
  if (conceptSlots.length > 0) {
    const { error } = await supabase.from("concepts").insert(
      conceptSlots.map((s) => {
        const c = s.item as ExtractedConcept;
        return { upload_id: uploadId, name: c.name, definition: c.definition, cpalms_alignment: null, prerequisites: c.prerequisites, difficulty_level: c.difficulty_level, examples: c.examples, ...grounding(s) };
      }),
    );
    if (error) errors.push(`concepts: ${error.message}`);
  }
  const objSlots = slots.filter((s) => s.kind === "objective");
  if (objSlots.length > 0) {
    const { error } = await supabase.from("learning_objectives").insert(
      objSlots.map((s) => ({ upload_id: uploadId, objective: (s.item as ObjectiveItem).text, ...grounding(s) })),
    );
    if (error) errors.push(`learning_objectives: ${error.message}`);
  }
  const vocabSlots = slots.filter((s) => s.kind === "vocab");
  if (vocabSlots.length > 0) {
    const { error } = await supabase.from("vocabulary").insert(
      vocabSlots.map((s) => {
        const v = s.item as VocabularyItem;
        return { upload_id: uploadId, term: v.term, definition: v.definition, context: v.context, ...grounding(s) };
      }),
    );
    if (error) errors.push(`vocabulary: ${error.message}`);
  }
  if (errors.length > 0) return recordFailure(`Could not save: ${errors.join(" | ")}`);

  const verifiedCount = slots.filter((s) => s.result?.status === "verified").length;
  progress.done.push(groupIndex);
  progress.current = null;
  progress.counts.concepts += conceptSlots.length;
  progress.counts.vocabulary += vocabSlots.length;
  progress.counts.objectives += objSlots.length;
  await saveProgress(supabase, uploadId, progress);
  console.log(`[${gtag}] saved ${conceptSlots.length}c/${vocabSlots.length}v/${objSlots.length}o, ${verifiedCount} verified, ${Math.round((Date.now() - started) / 1000)}s`);
  return respond({
    success: true,
    step: "group",
    group: groupIndex,
    progress,
    conceptsCount: conceptSlots.length,
    vocabularyCount: vocabSlots.length,
    objectivesCount: objSlots.length,
    chunksCount: chunks.length,
    verifiedCount,
    failedCount: slots.length - verifiedCount,
  });
}

/**
 * Merge duplicates found in several groups: one row per normalized name /
 * term / objective, citing the UNION of every chunk any copy was cited from.
 * The kept row takes the longest definition, a verified quote when any copy
 * has one, and grounding_status 'verified' if any copy verified.
 */
async function mergeDuplicates(supabase: SupabaseClient, uploadId: string, tag: string): Promise<number> {
  const order = new Map<string, number>();
  const { data: chunkRows } = await supabase.from("curriculum_source_chunks").select("id, chunk_index").eq("upload_id", uploadId);
  for (const c of (chunkRows ?? []) as { id: string; chunk_index: number }[]) order.set(c.id, c.chunk_index);
  const sortIds = (ids: string[]) => [...new Set(ids)].sort((a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0));

  type Row = Record<string, unknown> & { id: string; source_chunk_ids: string[] | null; evidence_quote: string | null; grounding_status: string | null };
  const tables: { table: string; key: string; longest: string | null }[] = [
    { table: "concepts", key: "name", longest: "definition" },
    { table: "vocabulary", key: "term", longest: "definition" },
    { table: "learning_objectives", key: "objective", longest: null },
  ];
  let removed = 0;
  for (const t of tables) {
    const { data } = await supabase.from(t.table).select("*").eq("upload_id", uploadId).order("created_at", { ascending: true });
    const rows = (data ?? []) as Row[];
    const byKey = new Map<string, Row[]>();
    for (const r of rows) {
      const k = normKey(String(r[t.key] ?? ""));
      if (!k) continue;
      byKey.set(k, [...(byKey.get(k) ?? []), r]);
    }
    for (const group of byKey.values()) {
      if (group.length < 2) continue;
      const verified = group.find((r) => r.grounding_status === "verified");
      const keep = verified ?? group[0];
      const patch: Record<string, unknown> = {
        source_chunk_ids: sortIds(group.flatMap((r) => r.source_chunk_ids ?? [])),
        grounding_status: verified ? "verified" : keep.grounding_status,
        evidence_quote: verified?.evidence_quote ?? keep.evidence_quote,
      };
      if (t.longest) {
        const best = group.map((r) => String(r[t.longest!] ?? "")).sort((a, b) => b.length - a.length)[0];
        if (best) patch[t.longest] = best;
      }
      if (patch.source_chunk_ids && (patch.source_chunk_ids as string[]).length === 0) patch.source_chunk_ids = null;
      const { error: uErr } = await supabase.from(t.table).update(patch).eq("id", keep.id);
      if (uErr) {
        console.error(`[${tag}] merge update ${t.table}: ${uErr.message}`);
        continue;
      }
      const dupIds = group.filter((r) => r.id !== keep.id).map((r) => r.id);
      const { error: dErr } = await supabase.from(t.table).delete().in("id", dupIds);
      if (dErr) console.error(`[${tag}] merge delete ${t.table}: ${dErr.message}`);
      else removed += dupIds.length;
    }
  }
  return removed;
}

/** Step 3: merge across groups, then decide success / partial / failure. */
async function stepFinalize(supabase: SupabaseClient, uploadId: string, tag: string): Promise<Response> {
  const progress = await loadProgress(supabase, uploadId);
  if (!progress) return fail(["No extraction plan for this upload. Send the pages first."], 409);
  const pending = Array.from({ length: progress.groups }, (_, i) => i).filter((i) => !progress.done.includes(i) && !progress.failed.some((f) => f.group === i));
  if (pending.length > 0) {
    return fail([`Groups ${pending.map((i) => i + 1).join(", ")} have not run yet.`], 409, { progress });
  }
  await markStatus(supabase, uploadId, { extraction_stage: "saving", extraction_stage_at: new Date().toISOString() });

  const removed = await mergeDuplicates(supabase, uploadId, tag);
  const [c, v, o, cv, vv, ov] = await Promise.all([
    supabase.from("concepts").select("id", { count: "exact", head: true }).eq("upload_id", uploadId),
    supabase.from("vocabulary").select("id", { count: "exact", head: true }).eq("upload_id", uploadId),
    supabase.from("learning_objectives").select("id", { count: "exact", head: true }).eq("upload_id", uploadId),
    supabase.from("concepts").select("id", { count: "exact", head: true }).eq("upload_id", uploadId).eq("grounding_status", "verified"),
    supabase.from("vocabulary").select("id", { count: "exact", head: true }).eq("upload_id", uploadId).eq("grounding_status", "verified"),
    supabase.from("learning_objectives").select("id", { count: "exact", head: true }).eq("upload_id", uploadId).eq("grounding_status", "verified"),
  ]);
  const counts = { concepts: c.count ?? 0, vocabulary: v.count ?? 0, objectives: o.count ?? 0 };
  const total = counts.concepts + counts.vocabulary + counts.objectives;
  const verifiedCount = (cv.count ?? 0) + (vv.count ?? 0) + (ov.count ?? 0);
  const { count: chunksCount } = await supabase.from("curriculum_source_chunks").select("id", { count: "exact", head: true }).eq("upload_id", uploadId);
  progress.counts = counts;
  progress.current = null;

  const failedNote = progress.failed.length
    ? progress.failed.map((f) => `${f.pages} produced nothing (${f.reason})`).join("; ")
    : "";

  // Zero items overall is a FAILURE, never a quiet success.
  if (total === 0) {
    const reason = `No concepts, vocabulary or objectives were found in any of the ${progress.groups} page group${progress.groups === 1 ? "" : "s"}.${failedNote ? ` ${failedNote}.` : ""}`;
    await markStatus(supabase, uploadId, { status: "extraction_failed", extraction_stage: null, extraction_stage_at: new Date().toISOString(), extraction_progress: progress, insufficient_source_reason: `[extract] ${reason}` });
    console.error(`[${tag}] FAILED: ${reason}`);
    return fail([reason], 422, { progress, chunksCount: chunksCount ?? 0, insufficientSourceReason: reason });
  }

  // Partial: keep what succeeded, say which pages produced nothing.
  let insufficientSourceReason: string | undefined;
  if (failedNote) {
    insufficientSourceReason = `${progress.failed.length} of ${progress.groups} page groups produced nothing: ${failedNote}.`;
    await recordInsufficientSource(supabase, uploadId, "extract", insufficientSourceReason);
  }
  // Pause here. Nothing downstream is triggered: the teacher marks items
  // Emphasize / Trash first, then the frontend calls generate-questions-v2
  // and synthesize-lesson-v2 explicitly.
  await markStatus(supabase, uploadId, { status: "awaiting_teacher_review", extraction_stage: null, extraction_stage_at: new Date().toISOString(), extraction_progress: progress });
  console.log(`[${tag}] done: ${counts.concepts}c/${counts.vocabulary}v/${counts.objectives}o after merging ${removed} duplicate(s); ${verifiedCount} verified; ${progress.failed.length} group(s) produced nothing`);
  return respond({
    success: true,
    step: "finalized",
    groups: progress.groups,
    progress,
    conceptsCount: counts.concepts,
    vocabularyCount: counts.vocabulary,
    objectivesCount: counts.objectives,
    chunksCount: chunksCount ?? 0,
    verifiedCount,
    failedCount: total - verifiedCount,
    ...(insufficientSourceReason ? { insufficientSourceReason } : {}),
  });
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return fail(["Method not allowed. Use POST."], 405);

  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!anthropicKey || !supabaseUrl || !serviceRoleKey) {
    const missing = [!anthropicKey && "ANTHROPIC_API_KEY", !supabaseUrl && "SUPABASE_URL", !serviceRoleKey && "SUPABASE_SERVICE_ROLE_KEY"].filter(Boolean);
    return fail([`Server misconfiguration: missing ${missing.join(", ")}.`], 500);
  }

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return fail(["Body must be JSON."], 400);
  }
  const uploadId = body?.uploadId;
  if (typeof uploadId !== "string" || uploadId.length === 0) return fail(["`uploadId` is required."], 400);

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const anthropic = new Anthropic({ apiKey: anthropicKey });
  const tag = `ECv2][${uploadId}`;

  if (body.step === "status") {
    const progress = await loadProgress(supabase, uploadId);
    if (!progress) return fail(["No extraction in progress for this upload."], 404);
    return respond({ success: true, step: "status", groups: progress.groups, progress, conceptsCount: progress.counts.concepts, vocabularyCount: progress.counts.vocabulary, objectivesCount: progress.counts.objectives, chunksCount: 0, verifiedCount: 0, failedCount: 0 });
  }
  if (body.step === "group") return stepGroup(supabase, anthropic, uploadId, Number(body.group), tag);
  if (body.step === "finalize") return stepFinalize(supabase, uploadId, tag);
  return stepPlan(supabase, uploadId, body, tag);
});
