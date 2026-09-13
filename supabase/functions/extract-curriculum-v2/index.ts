// Supabase Edge Function: extract-curriculum-v2
//
// Source-grounded successor to extract-curriculum. Accepts page-level text,
// stores ONE chunk per PDF page in curriculum_source_chunks (pages over 1,500
// words are split; pages under 30 words merge into the next), then extracts
// learning objectives / concepts / vocabulary from those chunks ONLY, with a
// verified citation (source_chunk_ids + evidence_quote) on every item.
//
// It then PAUSES: status becomes 'awaiting_teacher_review' and no question or
// lesson generation is triggered. The teacher marks items Emphasize / Trash,
// and the frontend calls generate-questions-v2 / synthesize-lesson-v2.
//
// Input (either shape):
//   { uploadId, pages: [{ page: number, text: string }, ...], reextract?: boolean }   <- preferred
//   { uploadId, extractedText: string, reextract?: boolean }                           <- legacy, treated as page 1
//
// Output: { success, conceptsCount, vocabularyCount, objectivesCount,
//           chunksCount, verifiedCount, failedCount, insufficientSourceReason?, errors? }
//
// Writes: curriculum_source_chunks (insert), concepts / vocabulary /
//         learning_objectives (insert, with grounding columns),
//         curriculum_uploads.status (+ extracted_text if empty,
//         insufficient_source_reason; coverage_report reset on reextract).
//
// Runtime:  Deno (Supabase Edge Functions)
// Env vars: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Project:  InvestiPlay (vcjdshippmqopaffuzbw)

import Anthropic from "npm:@anthropic-ai/sdk@0.70.0";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";
import {
  asSourceIds,
  buildSourceBlock,
  countWords,
  formatFailures,
  groundedGenerate,
  groupChunks,
  isRecord,
  MAX_SOURCE_CHARS,
  MIN_SOURCE_WORDS,
  NOT_ENOUGH_TEXT_MESSAGE,
  readInsufficient,
  recordInsufficientSource,
  type GroundedItem,
  type GroundingResult,
  type SourceChunk,
  verifyGroundedItems,
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
  conceptsCount: number;
  vocabularyCount: number;
  objectivesCount: number;
  chunksCount: number;
  verifiedCount: number;
  failedCount: number;
  insufficientSourceReason?: string;
  errors?: string[];
}

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

/** Merge per-group results, de-duplicating by name / term / text. */
function mergeResults(parts: ExtractionResult[]): ExtractionResult {
  const seenC = new Set<string>();
  const seenV = new Set<string>();
  const seenO = new Set<string>();
  const out: ExtractionResult = { learning_objectives: [], concepts: [], vocabulary: [], insufficientReason: null };
  const reasons: string[] = [];
  for (const p of parts) {
    for (const c of p.concepts) {
      const k = c.name.toLowerCase();
      if (!seenC.has(k) && out.concepts.length < 50) {
        seenC.add(k);
        out.concepts.push(c);
      }
    }
    for (const v of p.vocabulary) {
      const k = v.term.toLowerCase();
      if (!seenV.has(k)) {
        seenV.add(k);
        out.vocabulary.push(v);
      }
    }
    for (const o of p.learning_objectives) {
      const k = o.text.toLowerCase();
      if (!seenO.has(k)) {
        seenO.add(k);
        out.learning_objectives.push(o);
      }
    }
    if (p.insufficientReason) reasons.push(p.insufficientReason);
  }
  if (reasons.length > 0) out.insufficientReason = [...new Set(reasons)].join(" ");
  return out;
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
    const missing = [
      !anthropicKey && "ANTHROPIC_API_KEY",
      !supabaseUrl && "SUPABASE_URL",
      !serviceRoleKey && "SUPABASE_SERVICE_ROLE_KEY",
    ].filter(Boolean);
    return fail([`Server misconfiguration: missing ${missing.join(", ")}`], 500);
  }

  // --- Parse & validate ----------------------------------------------------
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return fail(["Request body must be valid JSON."], 400);
  }
  const uploadId = body?.uploadId;
  if (typeof uploadId !== "string" || uploadId.length === 0) {
    return fail(["`uploadId` is required and must be a non-empty string."], 400);
  }

  let pages: PageInput[] = [];
  if (Array.isArray(body.pages) && body.pages.length > 0) {
    pages = body.pages
      .filter((p): p is PageInput => isRecord(p) && typeof p.text === "string")
      .map((p, i) => ({ page: Number.isInteger(p.page) && p.page > 0 ? p.page : i + 1, text: p.text }));
  } else if (typeof body.extractedText === "string" && body.extractedText.trim().length > 0) {
    pages = [{ page: 1, text: body.extractedText }];
  }
  if (pages.length === 0) {
    return fail(["Provide `pages` ([{page, text}]) or `extractedText`."], 400);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const anthropic = new Anthropic({ apiKey: anthropicKey });
  const tag = `ECv2][${uploadId}`;

  // --- Minimum readable text gate ------------------------------------------
  const fullText = pages.map((p) => p.text.trim()).filter(Boolean).join("\n\n");
  const totalWords = countWords(fullText);
  if (totalWords < MIN_SOURCE_WORDS) {
    console.error(`[${tag}] only ${totalWords} words of readable text; refusing to generate.`);
    await markStatus(supabase, uploadId, {
      status: "extraction_failed",
      insufficient_source_reason: NOT_ENOUGH_TEXT_MESSAGE,
    });
    return fail([NOT_ENOUGH_TEXT_MESSAGE], 422, { insufficientSourceReason: NOT_ENOUGH_TEXT_MESSAGE });
  }

  // --- Chunk + persist -----------------------------------------------------
  const drafts = chunkPages(pages);
  console.log(`[${tag}] ${pages.length} pages, ${totalWords} words -> ${drafts.length} chunks`);

  // An upload that already has chunks is in (or past) teacher review. Only
  // re-extract on explicit request, because it discards the teacher's marks
  // and the previous extraction.
  // "Already extracted" means chunks (v2) OR concepts (v1 legacy) exist: a v1
  // upload has no chunks but must still be reset, not appended to.
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
    // Question rows (v1 or v2) point at concepts via concept_id with no
    // cascade. Detach them first so the old concepts can be replaced; the
    // rows themselves are kept (generate-questions-v2 replaces unapproved ones).
    const { error: detachErr } = await supabase
      .from("generated_questions")
      .update({ concept_id: null })
      .eq("upload_id", uploadId);
    if (detachErr) {
      await markStatus(supabase, uploadId, { status: "extraction_failed" });
      return fail([`Could not detach existing questions: ${detachErr.message}`], 500);
    }
    for (const table of ["vocabulary", "learning_objectives", "concepts", "curriculum_source_chunks"]) {
      const { error } = await supabase.from(table).delete().eq("upload_id", uploadId);
      if (error) {
        await markStatus(supabase, uploadId, { status: "extraction_failed" });
        return fail([
          `Could not reset ${table}: ${error.message}`,
          ...(table === "concepts"
            ? ["Generated questions still reference these concepts. Regenerate questions before re-extracting."]
            : []),
        ], 500);
      }
    }
    await markStatus(supabase, uploadId, { coverage_report: null, insufficient_source_reason: null });
  }
  const { data: chunkRows, error: chunkErr } = await supabase
    .from("curriculum_source_chunks")
    .insert(
      drafts.map((d, i) => ({
        upload_id: uploadId,
        chunk_index: i,
        page_start: d.page_start,
        page_end: d.page_end,
        content: d.content,
      })),
    )
    .select("id, chunk_index, page_start, page_end, content");
  if (chunkErr || !chunkRows) {
    await markStatus(supabase, uploadId, { status: "extraction_failed" });
    return fail([`Could not store source chunks: ${chunkErr?.message ?? "unknown error"}`], 500);
  }
  const chunks = (chunkRows as SourceChunk[]).sort((a, b) => a.chunk_index - b.chunk_index);

  // Keep extracted_text populated for callers that only sent pages.
  const { data: uploadRow } = await supabase
    .from("curriculum_uploads")
    .select("extracted_text")
    .eq("id", uploadId)
    .maybeSingle();
  if (!uploadRow?.extracted_text) {
    await markStatus(supabase, uploadId, { extracted_text: fullText });
  }

  // --- Generate (per group when the source is very large) ------------------
  const block = buildSourceBlock(chunks);
  const groups = block.totalChars > MAX_SOURCE_CHARS ? groupChunks(chunks) : [chunks];

  let result: ExtractionResult;
  try {
    const parts: ExtractionResult[] = [];
    for (let g = 0; g < groups.length; g++) {
      const gBlock = groups.length === 1 ? block : buildSourceBlock(groups[g]);
      const user =
        groups.length === 1
          ? gBlock.text
          : `This is part ${g + 1} of ${groups.length} of the material. Extract from these sources only.\n\n${gBlock.text}`;
      const parsed = await groundedGenerate(anthropic, { system: SYSTEM_PROMPT, user, tag: `${tag}][group ${g + 1}` });
      const part = normalizeResult(parsed);
      if (groups.length > 1) {
        // Re-label S-ids to the global block so citations resolve later.
        const local = gBlock;
        const relabel = (ids: string[]) =>
          ids.map((sid) => {
            const chunkId = local.sidToChunkId[sid];
            const globalSid = Object.keys(block.sidToChunkId).find((k) => block.sidToChunkId[k] === chunkId);
            return globalSid ?? sid;
          });
        for (const c of part.concepts) c.source_ids = relabel(c.source_ids);
        for (const v of part.vocabulary) v.source_ids = relabel(v.source_ids);
        for (const o of part.learning_objectives) o.source_ids = relabel(o.source_ids);
      }
      parts.push(part);
    }
    result = mergeResults(parts);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[${tag}] generation failed: ${detail}`);
    await markStatus(supabase, uploadId, { status: "extraction_failed" });
    return fail([`Generation failed: ${detail}`], 502);
  }

  // --- Verify: quote check -> support check -> one retry for failed slots ---
  const slots: Slot[] = [
    ...result.concepts.map((item, i) => ({ id: `concept-${i}`, kind: "concept" as Kind, item })),
    ...result.vocabulary.map((item, i) => ({ id: `vocab-${i}`, kind: "vocab" as Kind, item })),
    ...result.learning_objectives.map((item, i) => ({ id: `objective-${i}`, kind: "objective" as Kind, item })),
  ];

  try {
    const first = await verifyGroundedItems(slots.map(toGrounded), block, anthropic);
    for (const s of slots) s.result = first.get(s.id);

    const failed = slots.filter((s) => s.result?.status === "failed");
    console.log(`[${tag}] pass 1: ${slots.length - failed.length} verified, ${failed.length} failed`);

    if (failed.length > 0) {
      const user =
        `SOURCES:\n${block.text}\n\nITEMS TO FIX:\n` +
        formatFailures(failed.map((s) => ({ id: s.id, reason: s.result!.reason, item: { kind: s.kind, ...s.item } })));
      const parsed = await groundedGenerate(anthropic, { system: RETRY_SYSTEM_PROMPT, user, tag: `${tag}][retry` });
      const fixedList = Array.isArray(parsed.fixed) ? parsed.fixed.filter(isRecord) : [];
      const fixedById = new Map<string, Record<string, unknown>>();
      for (const f of fixedList) if (typeof f.id === "string") fixedById.set(f.id, f);

      const retrySlots: Slot[] = [];
      for (const s of failed) {
        const f = fixedById.get(s.id);
        if (!f || f.drop === true) continue; // stays failed with its original reason
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
      const stillFailed = slots.filter((s) => s.result?.status === "failed").length;
      console.log(`[${tag}] pass 2: retried ${retrySlots.length}, still failed ${stillFailed}`);
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[${tag}] verification failed: ${detail}`);
    await markStatus(supabase, uploadId, { status: "extraction_failed" });
    return fail([`Verification failed: ${detail}`], 502);
  }

  // --- Persist (failed items are saved with grounding_status = 'failed') ---
  const errors: string[] = [];
  const grounding = (s: Slot) => ({
    source_chunk_ids: s.result?.chunkIds.length ? s.result.chunkIds : null,
    evidence_quote: s.item.evidence_quote || null,
    grounding_status: s.result?.status ?? "failed",
  });

  const conceptSlots = slots.filter((s) => s.kind === "concept");
  if (conceptSlots.length > 0) {
    const { error } = await supabase.from("concepts").insert(
      conceptSlots.map((s) => {
        const c = s.item as ExtractedConcept;
        return {
          upload_id: uploadId,
          name: c.name,
          definition: c.definition,
          cpalms_alignment: null, // outside knowledge; never inferred in v2
          prerequisites: c.prerequisites,
          difficulty_level: c.difficulty_level,
          examples: c.examples,
          ...grounding(s),
        };
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

  if (errors.length > 0) {
    console.error(`[${tag}] persist errors: ${errors.join(" | ")}`);
    await markStatus(supabase, uploadId, { status: "extraction_failed" });
    return fail(["Failed to persist extracted data.", ...errors], 500, { chunksCount: chunks.length });
  }

  if (result.insufficientReason) {
    await recordInsufficientSource(supabase, uploadId, "extract", result.insufficientReason);
  }
  // Pause here. Nothing downstream is triggered: the teacher marks items
  // Emphasize / Trash first, then the frontend calls generate-questions-v2
  // and synthesize-lesson-v2 explicitly.
  await markStatus(supabase, uploadId, { status: "awaiting_teacher_review" });

  const verifiedCount = slots.filter((s) => s.result?.status === "verified").length;
  const failedCount = slots.length - verifiedCount;
  console.log(
    `[${tag}] done: ${conceptSlots.length} concepts, ${vocabSlots.length} vocab, ${objSlots.length} objectives; ` +
      `${verifiedCount} verified, ${failedCount} failed, ${chunks.length} chunks`,
  );

  return respond({
    success: true,
    conceptsCount: conceptSlots.length,
    vocabularyCount: vocabSlots.length,
    objectivesCount: objSlots.length,
    chunksCount: chunks.length,
    verifiedCount,
    failedCount,
    ...(result.insufficientReason ? { insufficientSourceReason: result.insufficientReason } : {}),
  });
});
