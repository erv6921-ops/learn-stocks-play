// Supabase Edge Function: generate-questions-v2
//
// Source-grounded, teacher-curated successor to generate-questions. Generates
// the mastery-check question bank for an upload from the FULL source text
// (curriculum_source_chunks), honoring the teacher's marks read at call time:
//   - trashed chunks never reach the model; trashed items get no questions
//   - emphasized chunks are priority="true" sources
//   - emphasized concepts/objectives get >= 3 questions, emphasized vocab >= 1
//     (never by padding: shortfalls are recorded, not invented)
// Every question carries source_chunk_ids + evidence_quote + grounding_status.
// Coverage is computed in code and saved to curriculum_uploads.coverage_report.
//
// Input:  { uploadId, regenerate?: boolean }
//   - first run: generates when the upload has no questions yet
//   - regenerate: true replaces rows the teacher has not approved
//     (teacher_approved_at IS NULL) and that are not linked to a lesson;
//     approved rows are kept
// Output: { success, questionsGenerated, verifiedCount, failedCount, keptApproved,
//           coverage, insufficientSourceReason?, errors? }
// Writes: generated_questions (delete unapproved + insert),
//         curriculum_uploads.coverage_report / insufficient_source_reason / status
//
// Runtime:  Deno (Supabase Edge Functions)
// Env vars: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Project:  InvestiPlay (vcjdshippmqopaffuzbw)

import Anthropic from "npm:@anthropic-ai/sdk@0.70.0";
import { createClient } from "npm:@supabase/supabase-js@2";
import {
  appendNote,
  asCoverKeys,
  asSourceIds,
  buildSourceBlock,
  chunkLabel,
  type CoverageEntry,
  type CurationItem,
  type CurationSet,
  emphasizedItems,
  formatFailures,
  groundedGenerate,
  isRecord,
  loadChunks,
  loadCurationSet,
  questionTarget,
  readInsufficient,
  recordInsufficientSource,
  renderCurationPrompt,
  saveCoverageReport,
  type GroundedItem,
  type GroundingResult,
  type SourceBlock,
  type SourceChunk,
  trashedItems,
  usableChunks,
  usableItems,
  verifyGroundedItems,
  loadGenerationSettings,
  difficultyInstruction,
  loadTeacherInstructions,
  renderTeacherInstructions,
  readUnsupportedInstructions,
  mergeInstructionCoverage,
  resolveSubLesson,
  type SubLessonRow,
  selectChunks,
  batchItems,
  subsetOf,
} from "../_shared/grounding.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GeneratedQuestion {
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  concept: string;
  covers_keys: string[];
  difficulty: "easy" | "medium" | "hard";
  source_ids: string[];
  evidence_quote: string;
}

interface Slot {
  id: string;
  q: GeneratedQuestion;
  result?: GroundingResult;
}

interface RequestBody {
  uploadId: string;
  regenerate?: boolean;
  /** Teacher settings (bankSize, difficulty, ...); falls back to the upload row, then defaults. */
  settings?: unknown;
  /** Free-text teacher instructions (scope / emphasis / tone / structure only); falls back to the upload row. */
  teacherInstructions?: unknown;
  /** Sub-lesson to generate for (its chunks only). Omitted: the upload's default sub-lesson. */
  subLessonId?: string;
  /** This sub-lesson's own instructions; falls back to sub_lessons.instructions. */
  subLessonInstructions?: unknown;
}

interface ResponseBody {
  success: boolean;
  subLessonId?: string;
  questionsGenerated: number;
  verifiedCount?: number;
  failedCount?: number;
  keptApproved?: number;
  /** Teacher-authored rows on this upload; never generated, never replaced. */
  keptTeacherAuthored?: number;
  /** Instruction parts the sources could not support (also in coverage). */
  unsupportedInstructions?: string[];
  coverage?: CoverageEntry[];
  insufficientSourceReason?: string;
  errors?: string[];
}

interface ExistingRow {
  id: string;
  concept_id: string | null;
  status: string | null;
  lesson_id: string | null;
  teacher_approved_at: string | null;
  grounding_status: string | null;
  source_chunk_ids: string[] | null;
  /** 'generated' | 'teacher_authored' (null on rows older than the column). */
  origin?: string | null;
}

const isTeacherAuthored = (r: ExistingRow) => r.origin === "teacher_authored";

const BASE_QUESTIONS = 15; // baseline pool size for the lesson mastery check
const MAX_QUESTIONS = 30; // hard cap even with heavy emphasis

// Difficulty label -> stored numeric difficulty (0..1). StudentLessonView maps
// this to the IRT logit b via (d-0.5)*3, giving easy≈-0.75 / med 0 / hard≈+0.75.
const DIFFICULTY_NUM: Record<string, number> = { easy: 0.25, medium: 0.5, hard: 0.75 };

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are writing a mastery-check question bank for a high-school financial-literacy lesson. The teacher's material is provided as <source> blocks. Every question must test something the sources actually say.

Requirements:
- Generate up to the requested number of multiple-choice questions, each with 4 options and exactly one correct answer. If the sources cannot support that many distinct, well-grounded questions, return fewer and set "insufficient_source": true.
- Difficulty: follow the DIFFICULTY line in the request for the easy / medium / hard mix, and tag every question honestly.
- Follow the TEACHER EMPHASIS minimums first, then spread the remaining questions across the item guide (weight toward earlier/most prominent items). The FACTS must come from the sources, not the guide.
- Never write a question about a TEACHER TRASHED topic.
- Tag every question with "covers_keys": the guide keys (C1, V2, O1 ...) it tests. Use only keys from the guide.
- "correctAnswer" must be the full text of the correct option (must match one of "options" exactly).
- "explanation" must only restate what the evidence_quote says.
- Age-appropriate, clear, no trick wording. Distractors must be plausible wrong answers.

Return ONLY valid JSON, no markdown, no preamble:
{
  "questions": [
    {
      "text": "Question text",
      "options": ["full option A", "full option B", "full option C", "full option D"],
      "correctAnswer": "full text of the correct option",
      "explanation": "Why this is correct, using only the quoted source",
      "concept": "concept name from the guide, or a short topic label if none fits",
      "covers_keys": ["C1"],
      "difficulty": "easy|medium|hard",
      "source_ids": ["S1"],
      "evidence_quote": "exact contiguous copy of the source text that makes the correct answer true"
    }
  ],
  "insufficient_source": false,
  "insufficient_source_reason": ""
}`;

const RETRY_SYSTEM_PROMPT = `You are writing a mastery-check question bank for a high-school financial-literacy lesson. Some previously generated questions FAILED verification: their evidence_quote was not an exact copy of the sources, or the correct answer / explanation claimed more than the quote supports.

Fix ONLY the questions listed. For each one return the same id and either:
  (a) the same question with a corrected "evidence_quote" (exact, contiguous copy of the source text) that fully supports the correct answer and explanation, or
  (b) a different question on the same item keys whose correct answer and explanation are fully supported by an exact quote, or
  (c) { "id": "...", "drop": true } if the sources genuinely cannot support a question on that slot.

Return JSON only:
{ "fixed": [ { "id": "q-3", "text": "...", "options": [...], "correctAnswer": "...", "explanation": "...", "concept": "...", "covers_keys": ["C1"], "difficulty": "easy|medium|hard", "source_ids": ["S1"], "evidence_quote": "..." } ] }`;

const TOPUP_SYSTEM_PROMPT = `You are writing additional mastery-check questions for a high-school financial-literacy lesson. The teacher emphasized certain items and the bank does not yet have enough verified questions for them.

Write ONLY questions for the listed items, tagged with their keys, each with 4 options, one correct answer, and an exact evidence_quote from the sources. Do not repeat the existing questions listed. If the sources cannot support the requested number for an item, write fewer and set "insufficient_source": true with the reason. Never pad.

Return ONLY valid JSON in the same shape as before:
{ "questions": [ { "text": "...", "options": [...], "correctAnswer": "...", "explanation": "...", "concept": "...", "covers_keys": ["C2"], "difficulty": "easy|medium|hard", "source_ids": ["S1"], "evidence_quote": "..." } ], "insufficient_source": false, "insufficient_source_reason": "" }`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function respond(body: ResponseBody, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

function normalizeQuestion(q: Record<string, unknown>, knownKeys: Set<string>): GeneratedQuestion | null {
  const diff = str(q.difficulty).toLowerCase();
  const options = Array.isArray(q.options) ? q.options.filter((o): o is string => typeof o === "string").map((o) => o.trim()) : [];
  const item: GeneratedQuestion = {
    text: str(q.text),
    options,
    correctAnswer: str(q.correctAnswer),
    explanation: str(q.explanation),
    concept: str(q.concept),
    covers_keys: asCoverKeys(q.covers_keys, knownKeys),
    difficulty: (diff === "easy" || diff === "hard" ? diff : "medium") as GeneratedQuestion["difficulty"],
    source_ids: asSourceIds(q.source_ids),
    evidence_quote: str(q.evidence_quote),
  };
  if (!item.text || item.options.length < 2 || !item.correctAnswer) return null;
  if (!item.options.includes(item.correctAnswer)) {
    // Accept a letter answer ("B") and resolve it to the option text.
    const m = item.correctAnswer.match(/^([A-Da-d])[).:\s]?$/);
    const idx = m ? "ABCD".indexOf(m[1].toUpperCase()) : -1;
    if (idx >= 0 && idx < item.options.length) item.correctAnswer = item.options[idx];
    else return null;
  }
  return item;
}

function parseQuestions(parsed: Record<string, unknown>, knownKeys: Set<string>): GeneratedQuestion[] {
  if (!Array.isArray(parsed.questions)) throw new Error("Response missing a 'questions' array");
  return parsed.questions
    .filter(isRecord)
    .map((q) => normalizeQuestion(q, knownKeys))
    .filter((q): q is GeneratedQuestion => q !== null);
}

/** True if the question names a trashed item (belt-and-braces after the prompt). */
function mentionsTrashed(q: GeneratedQuestion, trashed: CurationItem[]): boolean {
  const concept = q.concept.toLowerCase();
  const text = q.text.toLowerCase();
  return trashed.some((t) => {
    const label = t.label.toLowerCase();
    if (!label) return false;
    if (concept === label) return true;
    // Whole-label mention in the question stem for multi-word labels.
    return label.includes(" ") && text.includes(label);
  });
}

function toGrounded(slot: Slot): GroundedItem {
  const q = slot.q;
  return {
    id: slot.id,
    source_ids: q.source_ids,
    evidence_quote: q.evidence_quote,
    claim: `Question: ${q.text}\nCorrect answer: ${q.correctAnswer}\nExplanation: ${q.explanation}`,
  };
}

async function verifyWithRetry(
  slots: Slot[],
  block: SourceBlock,
  knownKeys: Set<string>,
  anthropic: Anthropic,
  tag: string,
): Promise<void> {
  if (slots.length === 0) return;
  const first = await verifyGroundedItems(slots.map(toGrounded), block, anthropic);
  for (const s of slots) s.result = first.get(s.id);
  const failed = slots.filter((s) => s.result?.status === "failed");
  console.log(`[${tag}] pass 1: ${slots.length - failed.length} verified, ${failed.length} failed`);
  if (failed.length === 0) return;

  const user =
    `SOURCES:\n${block.text}\n\nQUESTIONS TO FIX:\n` +
    formatFailures(failed.map((s) => ({ id: s.id, reason: s.result!.reason, item: s.q })));
  const parsed = await groundedGenerate(anthropic, { system: RETRY_SYSTEM_PROMPT, user, tag: `${tag}][retry` });
  const fixedById = new Map<string, Record<string, unknown>>();
  if (Array.isArray(parsed.fixed)) {
    for (const f of parsed.fixed.filter(isRecord)) if (typeof f.id === "string") fixedById.set(f.id, f);
  }
  const retrySlots: Slot[] = [];
  for (const s of failed) {
    const f = fixedById.get(s.id);
    if (!f || f.drop === true) continue; // stays failed with its original reason
    const replacement = normalizeQuestion(f, knownKeys);
    if (replacement) {
      if (replacement.covers_keys.length === 0) replacement.covers_keys = s.q.covers_keys;
      s.q = replacement;
      retrySlots.push(s);
    }
  }
  if (retrySlots.length > 0) {
    const second = await verifyGroundedItems(retrySlots.map(toGrounded), block, anthropic);
    for (const s of retrySlots) s.result = second.get(s.id) ?? s.result;
  }
  console.log(`[${tag}] pass 2: retried ${retrySlots.length}, still failed ${slots.filter((s) => s.result?.status === "failed").length}`);
}

function verifiedCountFor(item: CurationItem, slots: Slot[]): number {
  return slots.filter((s) => s.result?.status === "verified" && s.q.covers_keys.includes(item.key)).length;
}

/** Builds the coverage report in code from the final slots + kept rows. */
function buildCoverage(
  set: CurationSet,
  chunks: SourceChunk[],
  slots: Slot[],
  keptApproved: ExistingRow[],
  emphasisShortfall: Map<string, string>,
): CoverageEntry[] {
  const verifiedSlots = slots.filter((s) => s.result?.status === "verified");
  const entries: CoverageEntry[] = [];

  for (const it of set.all) {
    const generated = verifiedCountFor(it, verifiedSlots);
    const kept = it.type === "concept" ? keptApproved.filter((r) => r.concept_id === it.id && r.grounding_status !== "failed").length : 0;
    const entry: CoverageEntry = {
      item_type: it.type,
      item_id: it.id,
      label: it.label,
      teacher_status: it.teacher_status,
      questions_generated: generated + kept,
      target: questionTarget(it),
      note: "",
    };
    if (it.teacher_status === "trashed") appendNote(entry, "Trashed by teacher; excluded from generation.");
    else if (it.grounding_status === "failed") appendNote(entry, "Extraction item failed grounding; not used as a guide.");
    if (kept > 0) appendNote(entry, `${kept} approved question(s) kept from a previous run.`);
    const shortfall = emphasisShortfall.get(it.key);
    if (shortfall) appendNote(entry, shortfall);
    else if (entry.target > 0 && entry.questions_generated < entry.target) {
      appendNote(entry, `Shortfall: ${entry.questions_generated} of ${entry.target} required questions were supported by the sources.`);
    }
    entries.push(entry);
  }

  for (const ch of chunks) {
    const cited = verifiedSlots.filter((s) => s.result!.chunkIds.includes(ch.id)).length +
      keptApproved.filter((r) => r.grounding_status !== "failed" && (r.source_chunk_ids ?? []).includes(ch.id)).length;
    const entry: CoverageEntry = {
      item_type: "chunk",
      item_id: ch.id,
      label: chunkLabel(ch),
      teacher_status: (ch.teacher_status ?? "active") as CoverageEntry["teacher_status"],
      questions_generated: cited,
      target: ch.teacher_status === "emphasized" ? 1 : 0,
      note: "",
    };
    if (ch.teacher_status === "trashed") appendNote(entry, "Trashed by teacher; text never sent to the model.");
    else if (ch.teacher_status === "emphasized" && cited === 0) appendNote(entry, "Emphasized source was not cited by any verified question.");
    entries.push(entry);
  }
  return entries;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return respond({ success: false, questionsGenerated: 0, errors: ["Use POST."] }, 405);

  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!anthropicKey || !supabaseUrl || !serviceRoleKey) {
    return respond({ success: false, questionsGenerated: 0, errors: ["Server misconfiguration: missing env vars."] }, 500);
  }

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return respond({ success: false, questionsGenerated: 0, errors: ["Body must be JSON."] }, 400);
  }
  const uploadId = body?.uploadId;
  if (typeof uploadId !== "string" || uploadId.length === 0) {
    return respond({ success: false, questionsGenerated: 0, errors: ["`uploadId` is required."] }, 400);
  }
  const regenerate = body.regenerate === true;
  const tag = `GQv2][${uploadId}`;
  console.log(`[${tag}] start regenerate=${regenerate}`);

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const anthropic = new Anthropic({ apiKey: anthropicKey });

  // --- Sub-lesson scope: everything below is this sub-lesson's only --------
  let sub: SubLessonRow;
  try {
    sub = await resolveSubLesson(supabase, uploadId, body.subLessonId);
  } catch (err) {
    return respond({ success: false, questionsGenerated: 0, errors: [err instanceof Error ? err.message : String(err)] }, 400);
  }
  const subLessonId = sub.id;
  console.log(`[${tag}] sub-lesson ${subLessonId} "${sub.title}"`);

  // --- Existing rows: first run vs regeneration ----------------------------
  const { data: existingData, error: existingErr } = await supabase
    .from("generated_questions")
    .select("id, concept_id, status, lesson_id, grounding_status, source_chunk_ids, teacher_approved_at, origin")
    .eq("upload_id", uploadId)
    .eq("sub_lesson_id", subLessonId);
  if (existingErr) {
    return respond({ success: false, questionsGenerated: 0, errors: [`Load existing questions: ${existingErr.message}`] }, 500);
  }
  const existing = (existingData ?? []) as ExistingRow[];
  // Teacher-authored rows are not "a previous generation": they never block a
  // first run and are never replaced. Only generated rows count here.
  const teacherAuthored = existing.filter(isTeacherAuthored);
  const generatedExisting = existing.filter((r) => !isTeacherAuthored(r));
  if (generatedExisting.length > 0 && !regenerate) {
    console.log(`[${tag}] ${generatedExisting.length} generated questions already exist; pass regenerate: true to replace unapproved rows.`);
    return respond({
      success: true,
      subLessonId,
      questionsGenerated: generatedExisting.length,
      keptApproved: generatedExisting.filter((r) => r.teacher_approved_at != null).length,
      keptTeacherAuthored: teacherAuthored.length,
    });
  }
  // Replace only generated rows the teacher has not approved and that no lesson uses.
  const isApproved = (r: ExistingRow) => r.teacher_approved_at != null;
  const replaceable = generatedExisting.filter((r) => !isApproved(r) && r.lesson_id == null);
  const keptApproved = generatedExisting.filter(isApproved);
  const keptLinked = generatedExisting.filter((r) => !isApproved(r) && r.lesson_id != null);
  if (replaceable.length > 0) {
    const { error: delErr } = await supabase
      .from("generated_questions")
      .delete()
      .in("id", replaceable.map((r) => r.id));
    if (delErr) {
      return respond({ success: false, questionsGenerated: 0, errors: [`Could not replace unapproved questions: ${delErr.message}`] }, 500);
    }
    console.log(`[${tag}] removed ${replaceable.length} unapproved rows; kept ${keptApproved.length} approved, ${keptLinked.length} lesson-linked`);
  }

  // --- Source of truth: chunks (minus trashed). Items are a guide only. -----
  let allChunks: SourceChunk[];
  let set: CurationSet;
  try {
    // Only this sub-lesson's chunks, and only items cited from them.
    allChunks = await loadChunks(supabase, uploadId, subLessonId);
    set = await loadCurationSet(supabase, uploadId, new Set(allChunks.map((c) => c.id)));
  } catch (err) {
    return respond({ success: false, questionsGenerated: 0, errors: [err instanceof Error ? err.message : String(err)] }, 500);
  }
  const chunks = usableChunks(allChunks);
  if (allChunks.length === 0) {
    return respond({ success: false, subLessonId, questionsGenerated: 0, errors: ["This lesson has no pages. Move at least one page into it (Split into lessons), or run extract-curriculum-v2 first."] }, 404);
  }
  if (chunks.length === 0) {
    const reason = "Every source page in this lesson was trashed by the teacher; nothing to generate from.";
    await recordInsufficientSource(supabase, uploadId, "questions", reason, subLessonId);
    await saveCoverageReport(supabase, uploadId, buildCoverage(set, allChunks, [], keptApproved, new Map()), subLessonId);
    return respond({ success: false, questionsGenerated: 0, insufficientSourceReason: reason, errors: [reason] }, 422);
  }

  const usable = usableItems(set.all);
  const knownKeys = new Set(usable.map((it) => it.key));
  const emphasized = emphasizedItems(set.all);
  const trashed = trashedItems(set.all);
  const conceptIdByKey = new Map(set.concepts.map((c) => [c.key, c.id]));
  const conceptIdByName = new Map(set.concepts.filter((c) => c.teacher_status !== "trashed").map((c) => [c.label.toLowerCase(), c.id]));
  const fallbackConceptId = set.concepts.find((c) => c.teacher_status !== "trashed" && c.grounding_status !== "failed")?.id ?? null;

  // Teacher settings: bank size + difficulty (request body, else the upload
  // row's generation_settings, else defaults).
  const settings = await loadGenerationSettings(supabase, uploadId, body.settings, subLessonId);
  const bankSize = settings.bankSize || BASE_QUESTIONS;
  // Teacher instructions shape scope / emphasis / tone / structure only; the
  // grounding rules forbid them from adding facts. Unsupported parts are
  // reported back, never invented. Upload-wide box + this sub-lesson's box.
  const teacherInstructions = await loadTeacherInstructions(supabase, uploadId, body.teacherInstructions, subLessonId, body.subLessonInstructions);
  const instructionsBlock = renderTeacherInstructions(teacherInstructions);
  const unsupportedInstructions: string[] = [];
  const noteUnsupported = (parsed: Record<string, unknown>) => {
    for (const u of readUnsupportedInstructions(parsed)) if (!unsupportedInstructions.includes(u)) unsupportedInstructions.push(u);
  };
  console.log(`[${tag}] settings: bank=${bankSize} difficulty=${settings.difficulty} instructions=${teacherInstructions.upload ? "upload" : "-"}/${teacherInstructions.subLesson ? "sub-lesson" : "-"}`);

  const emphasisMinimum = emphasized.reduce((n, it) => n + questionTarget(it), 0);
  const requested = Math.min(MAX_QUESTIONS, Math.max(bankSize, emphasisMinimum + 5));

  // --- Generate per item batch, each over ONLY the chunks those items cite --
  // (NotebookLM-style: the item guide is the index, citations are the
  // pointers). Emphasized items lead the first batches. With no items at all
  // the ranking falls back to emphasized pages, then document order, capped.
  const instructionQuery = teacherInstructions.subLesson ?? teacherInstructions.upload ?? null;
  const withTrashed = (items: CurationItem[]) => subsetOf(set, [...items, ...trashed]);
  const batches = usable.length > 0 ? batchItems(usable) : [[] as CurationItem[]];
  const perBatch = Math.max(3, Math.ceil(requested / batches.length));

  const slots: Slot[] = [];
  const insufficientReasons: string[] = [];
  let droppedTrashed = 0;
  try {
    for (let b = 0; b < batches.length; b++) {
      const batch = batches[b];
      const bChunks = selectChunks(chunks, { focus: batch, all: usable, query: instructionQuery });
      const bBlock = buildSourceBlock(bChunks);
      const bCuration = renderCurationPrompt(batch.length ? withTrashed(batch) : set, bBlock, { questionMinimums: true });
      const btag = `${tag}][batch ${b + 1}/${batches.length}`;
      const partNote =
        batches.length > 1
          ? `This is batch ${b + 1} of ${batches.length}. Write questions ONLY about the items in the guide below, from these sources (other topics are covered by other batches). `
          : "";
      const parsed = await groundedGenerate(anthropic, {
        system: SYSTEM_PROMPT,
        user: `${partNote}Generate up to ${perBatch} questions.\n${difficultyInstruction(settings.difficulty, perBatch)}\n\n${instructionsBlock ? `${instructionsBlock}\n\n` : ""}${bCuration}\n\nSOURCES:\n${bBlock.text}`,
        tag: btag,
      });
      const reason = readInsufficient(parsed);
      if (reason) insufficientReasons.push(reason);
      noteUnsupported(parsed);
      const bSlots: Slot[] = [];
      for (const q of parseQuestions(parsed, knownKeys).slice(0, perBatch)) {
        if (mentionsTrashed(q, trashed)) {
          droppedTrashed++;
          continue;
        }
        if (slots.length + bSlots.length >= MAX_QUESTIONS) break;
        bSlots.push({ id: `q-${slots.length + bSlots.length}`, q });
      }
      // Verify against the same passages the batch was written from.
      await verifyWithRetry(bSlots, bBlock, knownKeys, anthropic, btag);
      slots.push(...bSlots);
      console.log(`[${btag}] ${bChunks.length} chunk(s), ${bSlots.length} question(s)`);
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[${tag}] generation failed: ${detail}`);
    return respond({ success: false, questionsGenerated: 0, errors: [`Generation failed: ${detail}`] }, 502);
  }
  console.log(`[${tag}] parsed ${slots.length} questions in ${batches.length} batch(es) (dropped ${droppedTrashed} on trashed topics)`);

  // --- Emphasis minimums: one targeted top-up for any shortfall ------------
  const emphasisShortfall = new Map<string, string>();
  const shortfalls = emphasized
    .map((it) => ({ it, have: verifiedCountFor(it, slots), need: questionTarget(it) }))
    .filter((x) => x.have < x.need);
  if (shortfalls.length > 0 && slots.length < MAX_QUESTIONS) {
    try {
      const wanted = shortfalls
        .map((x) => `- ${x.it.key} (${x.it.type}) "${x.it.label}": ${x.need - x.have} more question(s)`)
        .join("\n");
      const existingQs = slots
        .filter((s) => s.result?.status === "verified")
        .map((s) => `- ${s.q.text}`)
        .join("\n");
      const tChunks = selectChunks(chunks, { focus: shortfalls.map((x) => x.it), all: usable, query: instructionQuery });
      const tBlock = buildSourceBlock(tChunks);
      const tCuration = renderCurationPrompt(withTrashed(shortfalls.map((x) => x.it)), tBlock, { questionMinimums: true });
      const parsed = await groundedGenerate(anthropic, {
        system: TOPUP_SYSTEM_PROMPT,
        user: `ITEMS NEEDING MORE QUESTIONS:\n${wanted}\n\nEXISTING QUESTIONS (do not repeat):\n${existingQs || "(none)"}\n\n${instructionsBlock ? `${instructionsBlock}\n\n` : ""}${tCuration}\n\nSOURCES:\n${tBlock.text}`,
        tag: `${tag}][topup`,
      });
      const reason = readInsufficient(parsed);
      if (reason) insufficientReasons.push(reason);
      noteUnsupported(parsed);
      const extra: Slot[] = [];
      for (const q of parseQuestions(parsed, knownKeys)) {
        if (mentionsTrashed(q, trashed)) continue;
        if (slots.length + extra.length >= MAX_QUESTIONS) break;
        extra.push({ id: `q-${slots.length + extra.length}`, q });
      }
      await verifyWithRetry(extra, tBlock, knownKeys, anthropic, `${tag}][topup`);
      slots.push(...extra);
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      console.error(`[${tag}] top-up failed (continuing with what we have): ${detail}`);
    }
  }
  for (const x of shortfalls) {
    const have = verifiedCountFor(x.it, slots);
    if (have < x.need) {
      emphasisShortfall.set(x.it.key, `Shortfall: ${have} of ${x.need} required questions were supported by the sources after a top-up attempt.`);
    }
  }

  // --- Persist (failed rows are kept, marked 'failed', hidden from students by RLS)
  const rows = slots.map((s) => {
    const conceptKey = s.q.covers_keys.find((k) => k.startsWith("C"));
    return {
      upload_id: uploadId,
      concept_id: (conceptKey ? conceptIdByKey.get(conceptKey) : undefined) ?? conceptIdByName.get(s.q.concept.toLowerCase()) ?? fallbackConceptId,
      question_text: s.q.text,
      options: s.q.options,
      correct_answer: s.q.correctAnswer,
      explanation: s.q.explanation,
      difficulty: DIFFICULTY_NUM[s.q.difficulty] ?? 0.5,
      status: "pending",
      origin: "generated",
      sub_lesson_id: subLessonId,
      source_chunk_ids: s.result?.chunkIds.length ? s.result.chunkIds : null,
      evidence_quote: s.q.evidence_quote || null,
      grounding_status: s.result?.status ?? "failed",
    };
  });

  if (rows.length > 0) {
    const { error: insErr } = await supabase.from("generated_questions").insert(rows);
    if (insErr) {
      console.error(`[${tag}] insert failed: ${insErr.message}`);
      return respond({ success: false, questionsGenerated: 0, errors: [`Insert failed: ${insErr.message}`] }, 500);
    }
  }

  // --- Coverage (computed here, never by the model) + bookkeeping ----------
  const coverage = mergeInstructionCoverage(buildCoverage(set, allChunks, slots, keptApproved, emphasisShortfall), "questions", unsupportedInstructions);
  await saveCoverageReport(supabase, uploadId, coverage, subLessonId);
  if (unsupportedInstructions.length > 0) console.log(`[${tag}] unsupported instruction parts: ${unsupportedInstructions.join(" | ")}`);

  const verifiedCount = rows.filter((r) => r.grounding_status === "verified").length;
  const failedCount = rows.length - verifiedCount;
  const shortfallNotes = [...emphasisShortfall.values()];
  let insufficientSourceReason: string | undefined;
  if (insufficientReasons.length > 0 || shortfallNotes.length > 0 || rows.length < bankSize) {
    insufficientSourceReason =
      [...new Set(insufficientReasons)].join(" ") ||
      (shortfallNotes.length > 0
        ? `Emphasis minimums not fully met for ${emphasisShortfall.size} item(s).`
        : `Only ${rows.length} of ${bankSize} requested questions were supported by the sources.`);
    await recordInsufficientSource(supabase, uploadId, "questions", insufficientSourceReason, subLessonId);
  }
  if (rows.length === 0) {
    return respond({
      success: false,
      subLessonId,
      questionsGenerated: 0,
      keptApproved: keptApproved.length,
      keptTeacherAuthored: teacherAuthored.length,
      coverage,
      insufficientSourceReason,
      unsupportedInstructions,
      errors: ["Model returned no usable questions."],
    }, 422);
  }

  await supabase.from("curriculum_uploads").update({ status: "questions_generated" }).eq("id", uploadId);

  console.log(`[${tag}] inserted ${rows.length} questions (${verifiedCount} verified, ${failedCount} failed), kept ${keptApproved.length} approved`);
  return respond({
    success: true,
    subLessonId,
    questionsGenerated: rows.length,
    verifiedCount,
    failedCount,
    keptApproved: keptApproved.length,
    keptTeacherAuthored: teacherAuthored.length,
    unsupportedInstructions,
    coverage,
    ...(insufficientSourceReason ? { insufficientSourceReason } : {}),
  });
});
