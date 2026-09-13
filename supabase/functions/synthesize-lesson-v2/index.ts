// Supabase Edge Function: synthesize-lesson-v2
//
// Source-grounded, teacher-curated successor to synthesize-lesson. Builds the
// full Jeff-taught lesson from the FULL source text (curriculum_source_chunks),
// honoring the teacher's marks read at call time:
//   - trashed chunks never reach the model; trashed items get no teaching
//     section, no check question, no vocab entry, no mastery-pool question
//   - emphasized chunks are priority="true" sources
//   - each emphasized concept/objective gets its own teaching section;
//     each emphasized vocab term must appear in the lesson
// Every teaching segment, check-in, micro-check and scenario carries
// sourceChunkIds + evidenceQuote and is verified; failed items are removed
// from the student-facing sections and kept in content.failed_items.
// The mastery pool is built from generated_questions rows produced by
// generate-questions-v2, excluding grounding-failed rows and rows attached to
// trashed concepts. Lesson coverage notes are merged into
// curriculum_uploads.coverage_report (computed in code).
//
// Input:  { uploadId, lessonId }
// Output: { success, sectionsCount, masteryCount, requiredCorrect,
//           verifiedCount, failedCount, coverage, insufficientSourceReason?, errors? }
// Writes: lessons.content (JSONB), curriculum_uploads.coverage_report /
//         insufficient_source_reason / status
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
  groupChunks,
  isRecord,
  loadChunks,
  loadCoverageReport,
  loadCurationSet,
  MAX_SOURCE_CHARS,
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
} from "../_shared/grounding.ts";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are Jeff, a friendly financial-literacy mascot who teaches high-school students. You are turning a teacher's uploaded material, given as <source> blocks, into a short, engaging lesson.

Write in Jeff's voice: warm, encouraging, plain-spoken, second person ("you"), high-school appropriate. Teach ONLY what the sources say. You may simplify the wording, but you may not add facts, numbers, names, or examples that are not in the sources.

Produce a lesson with:
- AT MOST 3 teaching segments (each renders as its own short tap-through slide). Jeff teaches most of the material in a live conversation BEFORE these slides, so the slides are the 3 ideas most worth pinning down, not a full walkthrough. One idea per slide, 1 to 2 short paragraphs each. TEACHER EMPHASIZED concepts and objectives come first, each tagged with its key in "covers_keys"; if more than 3 are emphasized, give slides to the 3 most important and make sure the others appear in the check questions. If the sources only support fewer segments, produce fewer.
- Every TEACHER EMPHASIZED vocabulary term must be used (and, if the sources define it, explained) somewhere in the segment or question text.
- Never teach, define, or ask about a TEACHER TRASHED topic.
- Quick checks: the request says how many single multiple-choice check questions to write. They sit between the slides, so each should test the idea just taught. Return them in "checks" (an array; empty if zero were requested). Do not write more than asked.
- ONE "scenario": an applied situation using ONLY situations and numbers that appear in the sources. If the sources contain no usable situation, set scenario to null.

Return ONLY valid JSON (no markdown, no preamble):
{
  "teachingSegments": [
    { "title": "Segment title", "paragraphs": ["Jeff-voiced paragraph", "..."], "bullets": ["optional key point"], "realWorldExample": "optional example FROM THE SOURCES", "covers_keys": ["C1"], "source_ids": ["S1"], "evidence_quote": "exact copy of the source text this slide teaches" }
  ],
  "checks": [
    { "question": "text", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "why, per the quote", "covers_keys": ["C1"], "source_ids": ["S1"], "evidence_quote": "exact copy of the source text that makes the correct option true" }
  ],
  "scenario":    { "title": "text", "narrative": "text", "details": ["optional detail"], "covers_keys": ["C1"], "source_ids": ["S1"], "evidence_quote": "exact copy of the source passage the scenario is built from" },
  "insufficient_source": false,
  "insufficient_source_reason": ""
}

Rules:
- Exactly 4 options for each question; correctIndex is 0-3.
- bullets/realWorldExample/details are optional; omit if not useful.
- Each teaching segment must be NO MORE THAN 2 short paragraphs (2-4 sentences each). Split into more segments rather than writing longer paragraphs. Never write a wall of text.
- "covers_keys" may only use keys from the item guide.
- No markdown formatting inside strings.`;

const RETRY_SYSTEM_PROMPT = `You are Jeff, a friendly financial-literacy mascot who teaches high-school students. Some parts of a lesson you wrote FAILED verification: their evidence_quote was not an exact copy of the sources, or the content claimed more than the quote supports.

Fix ONLY the items listed. For each one return the same id and either:
  (a) the same item with a corrected "evidence_quote" (exact, contiguous copy of the source text) that fully supports everything the item says, or
  (b) a rewritten item that says only what the sources say, with an exact quote, or
  (c) { "id": "...", "drop": true } if the sources genuinely cannot support it.

Keep the same JSON shape as the original item (teaching segment, check question, or scenario), including "covers_keys". Return JSON only:
{ "fixed": [ { "id": "seg-2", ...fields... } ] }`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Body {
  uploadId: string;
  lessonId: string;
  /** Teacher settings (microChecks, masteryRequired, ...); falls back to the upload row, then defaults. */
  settings?: unknown;
}

interface Cited {
  source_ids: string[];
  evidence_quote: string;
  covers_keys: string[];
}

interface Check extends Cited {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface TeachingSegment extends Cited {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  realWorldExample?: string;
}

interface Scenario extends Cited {
  title: string;
  narrative: string;
  details?: string[];
}

interface Synth {
  teachingSegments: TeachingSegment[];
  checks: Check[];
  scenario: Scenario | null;
  insufficientReason: string | null;
}

type Kind = "segment" | "check" | "scenario";

interface Slot {
  id: string;
  kind: Kind;
  item: TeachingSegment | Check | Scenario;
  result?: GroundingResult;
}

interface GenQuestionRow {
  id: string;
  concept_id: string | null;
  teacher_approved_at: string | null;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string | null;
  difficulty: number | null;
  source_chunk_ids: string[] | null;
  evidence_quote: string | null;
  grounding_status: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function respond(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const strArr = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").map((s) => s.trim()).filter(Boolean) : [];

function cited(r: Record<string, unknown>, known: Set<string>): Cited {
  return {
    source_ids: asSourceIds(r.source_ids),
    evidence_quote: str(r.evidence_quote),
    covers_keys: asCoverKeys(r.covers_keys, known),
  };
}

function normalizeSegment(r: Record<string, unknown>, known: Set<string>): TeachingSegment | null {
  const seg: TeachingSegment = { title: str(r.title), paragraphs: strArr(r.paragraphs), ...cited(r, known) };
  const bullets = strArr(r.bullets);
  if (bullets.length) seg.bullets = bullets;
  const ex = str(r.realWorldExample);
  if (ex) seg.realWorldExample = ex;
  return seg.title && seg.paragraphs.length ? seg : null;
}

function normalizeCheck(r: unknown, known: Set<string>): Check | null {
  if (!isRecord(r)) return null;
  const options = strArr(r.options).slice(0, 4);
  const idx = Number(r.correctIndex);
  const check: Check = {
    question: str(r.question),
    options,
    correctIndex: Number.isInteger(idx) ? Math.max(0, Math.min(options.length - 1, idx)) : 0,
    explanation: str(r.explanation),
    ...cited(r, known),
  };
  return check.question && options.length >= 2 ? check : null;
}

function normalizeScenario(r: unknown, known: Set<string>): Scenario | null {
  if (!isRecord(r)) return null;
  const sc: Scenario = { title: str(r.title), narrative: str(r.narrative), ...cited(r, known) };
  const details = strArr(r.details);
  if (details.length) sc.details = details;
  return sc.title && sc.narrative ? sc : null;
}

function normalizeSynth(parsed: Record<string, unknown>, known: Set<string>): Synth {
  const teachingSegments = Array.isArray(parsed.teachingSegments)
    ? parsed.teachingSegments.filter(isRecord).map((r) => normalizeSegment(r, known)).filter((s): s is TeachingSegment => s !== null)
    : [];
  return {
    teachingSegments,
    // "checks" array; older responses used miniCheckIn / microCheck.
    checks: [
      ...(Array.isArray(parsed.checks) ? parsed.checks : []),
      parsed.miniCheckIn,
      parsed.microCheck,
    ]
      .map((c) => normalizeCheck(c, known))
      .filter((c): c is Check => c !== null),
    scenario: normalizeScenario(parsed.scenario, known),
    insufficientReason: readInsufficient(parsed),
  };
}

/** All student-visible text of a slot, for trashed-topic and vocab-use checks. */
function slotText(slot: Slot): string {
  if (slot.kind === "segment") {
    const s = slot.item as TeachingSegment;
    return [s.title, ...s.paragraphs, ...(s.bullets ?? []), s.realWorldExample ?? ""].join("\n");
  }
  if (slot.kind === "scenario") {
    const sc = slot.item as Scenario;
    return [sc.title, sc.narrative, ...(sc.details ?? [])].join("\n");
  }
  const c = slot.item as Check;
  return [c.question, ...c.options, c.explanation].join("\n");
}

/** True if the slot is about a trashed item (belt-and-braces after the prompt). */
function mentionsTrashed(slot: Slot, trashed: CurationItem[]): boolean {
  const text = slotText(slot).toLowerCase();
  const title = slot.kind === "segment" ? (slot.item as TeachingSegment).title.toLowerCase() : "";
  return trashed.some((t) => {
    const label = t.label.toLowerCase();
    if (!label) return false;
    if (title === label) return true;
    return label.includes(" ") && text.includes(label);
  });
}

function claimFor(slot: Slot): string {
  if (slot.kind === "segment") {
    const s = slot.item as TeachingSegment;
    const parts = [`Slide "${s.title}":`, ...s.paragraphs];
    if (s.bullets?.length) parts.push(`Key points: ${s.bullets.join("; ")}`);
    if (s.realWorldExample) parts.push(`Example: ${s.realWorldExample}`);
    return parts.join("\n");
  }
  if (slot.kind === "scenario") {
    const sc = slot.item as Scenario;
    return [`Scenario "${sc.title}":`, sc.narrative, ...(sc.details ?? [])].join("\n");
  }
  const c = slot.item as Check;
  return `Question: ${c.question}\nCorrect answer: ${c.options[c.correctIndex] ?? ""}\nExplanation: ${c.explanation}`;
}

function toGrounded(slot: Slot): GroundedItem {
  return { id: slot.id, source_ids: slot.item.source_ids, evidence_quote: slot.item.evidence_quote, claim: claimFor(slot) };
}

/** Re-labels a group-local S-id to the global block's S-id for the same chunk. */
function relabelSids(ids: string[], local: SourceBlock, global: SourceBlock): string[] {
  return ids.map((sid) => {
    const chunkId = local.sidToChunkId[sid];
    const g = Object.keys(global.sidToChunkId).find((k) => global.sidToChunkId[k] === chunkId);
    return g ?? sid;
  });
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

/** Convert a stored correct_answer (option text or letter) to a 0-based index. */
function correctIndexOf(options: string[], correct: string): number {
  const ca = (correct ?? "").trim();
  const byText = options.findIndex((o) => o === ca);
  if (byText >= 0) return byText;
  const m = ca.match(/^([A-Fa-f])[).:\s]?$/);
  if (m) {
    const idx = LETTERS.indexOf(m[1].toUpperCase());
    if (idx >= 0 && idx < options.length) return idx;
  }
  return 0; // fallback: never leaves a question unscoreable
}

function toQuizQuestion(c: Check, id: string, chunkIds: string[]) {
  return {
    id,
    question: c.question,
    options: c.options,
    correctAnswer: c.correctIndex,
    explanation: c.explanation,
    coversKeys: c.covers_keys,
    sourceChunkIds: chunkIds,
    evidenceQuote: c.evidence_quote,
    groundingStatus: "verified",
  };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return respond({ success: false, errors: ["Use POST."] }, 405);

  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!anthropicKey || !supabaseUrl || !serviceRoleKey) {
    return respond({ success: false, errors: ["Server misconfiguration: missing env vars."] }, 500);
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return respond({ success: false, errors: ["Body must be JSON."] }, 400);
  }
  const { uploadId, lessonId } = body ?? {};
  if (!uploadId || !lessonId) {
    return respond({ success: false, errors: ["`uploadId` and `lessonId` are required."] }, 400);
  }
  const tag = `SLv2][${lessonId}`;
  console.log(`[${tag}] upload=${uploadId}`);

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const anthropic = new Anthropic({ apiKey: anthropicKey });
  // Teacher settings: quick-check count + mastery pass mark (request body,
  // else the upload row's generation_settings, else defaults).
  const settings = await loadGenerationSettings(supabase, uploadId, body.settings);
  console.log(`[${tag}] settings: checks=${settings.microChecks} masteryRequired=${settings.masteryRequired}`);

  // --- Load source chunks (source of truth), marks, guides, question bank --
  let allChunks: SourceChunk[];
  let set: CurationSet;
  let coverage: CoverageEntry[];
  try {
    [allChunks, set, coverage] = await Promise.all([
      loadChunks(supabase, uploadId),
      loadCurationSet(supabase, uploadId),
      loadCoverageReport(supabase, uploadId),
    ]);
  } catch (err) {
    return respond({ success: false, errors: [err instanceof Error ? err.message : String(err)] }, 500);
  }
  if (allChunks.length === 0) {
    return respond({ success: false, errors: ["No source chunks for this upload. Run extract-curriculum-v2 first."] }, 404);
  }
  const chunks = usableChunks(allChunks);
  if (chunks.length === 0) {
    const reason = "Every source page was trashed by the teacher; nothing to teach from.";
    await recordInsufficientSource(supabase, uploadId, "lesson", reason);
    return respond({ success: false, insufficientSourceReason: reason, errors: [reason] }, 422);
  }

  const { data: qData } = await supabase
    .from("generated_questions")
    .select("id, concept_id, question_text, options, correct_answer, explanation, difficulty, source_chunk_ids, evidence_quote, grounding_status, teacher_approved_at")
    .eq("upload_id", uploadId)
    .order("created_at", { ascending: true });
  const genQuestions = (qData ?? []) as GenQuestionRow[];

  const usable = usableItems(set.all);
  const knownKeys = new Set(usable.map((it) => it.key));
  const emphasized = emphasizedItems(set.all);
  const trashed = trashedItems(set.all);
  const trashedConceptIds = new Set(set.concepts.filter((c) => c.teacher_status === "trashed").map((c) => c.id));

  // Segment budget: at most 3 slides. Jeff's live conversation carries the
  // bulk of the teaching; slides are interleaved with the checks to keep the
  // pace up. Emphasized topics get the slides first.
  const emphasizedTopics = emphasized.filter((it) => it.type !== "vocabulary");
  const maxSegments = 3;

  // --- Generate (per group when the source is very large) ------------------
  const block = buildSourceBlock(chunks);
  const curation = renderCurationPrompt(set, block, { questionMinimums: false });
  const groups = block.totalChars > MAX_SOURCE_CHARS ? groupChunks(chunks) : [chunks];

  let synth: Synth;
  try {
    const parts: Synth[] = [];
    for (let g = 0; g < groups.length; g++) {
      const gBlock = groups.length === 1 ? block : buildSourceBlock(groups[g]);
      const gCuration = groups.length === 1 ? curation : renderCurationPrompt(set, gBlock, { questionMinimums: false });
      const budget = groups.length > 1 ? Math.max(1, Math.ceil(maxSegments / groups.length)) : maxSegments;
      const partNote = groups.length > 1 ? `This is part ${g + 1} of ${groups.length} of the material. ` : "";
      const parsed = await groundedGenerate(anthropic, {
        system: SYSTEM_PROMPT,
        user: `${partNote}Segment budget: write at most ${budget} teaching segment${budget === 1 ? "" : "s"} (fewer if the sources only support fewer). Quick checks: write exactly ${settings.microChecks} check question${settings.microChecks === 1 ? "" : "s"} in "checks"${settings.microChecks === 0 ? " (an empty array)" : ""}.${emphasizedTopics.length > budget ? ` ${emphasizedTopics.length} topics are emphasized but only ${budget} slides are available: pick the ${budget} most important for slides and cover the rest in the check questions.` : ""}\n\n${gCuration}\n\nSOURCES:\n${gBlock.text}`,
        tag: `${tag}][group ${g + 1}`,
      });
      const part = normalizeSynth(parsed, knownKeys);
      if (groups.length > 1) {
        for (const s of part.teachingSegments) s.source_ids = relabelSids(s.source_ids, gBlock, block);
        for (const c of [...part.checks, part.scenario]) {
          if (c) c.source_ids = relabelSids(c.source_ids, gBlock, block);
        }
      }
      parts.push(part);
    }
    synth = {
      teachingSegments: parts.flatMap((p) => p.teachingSegments).slice(0, maxSegments),
      checks: parts.flatMap((p) => p.checks).slice(0, settings.microChecks),
      scenario: parts.find((p) => p.scenario)?.scenario ?? null,
      insufficientReason: [...new Set(parts.map((p) => p.insufficientReason).filter(Boolean))].join(" ") || null,
    };
    if (synth.teachingSegments.length === 0) throw new Error("Missing teachingSegments");
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[${tag}] synthesis failed: ${detail}`);
    return respond({ success: false, errors: [`Synthesis failed: ${detail}`] }, 502);
  }

  // --- Slots; drop anything about a trashed topic before verification ------
  const candidates: Slot[] = synth.teachingSegments.map((item, i) => ({ id: `seg-${i}`, kind: "segment" as Kind, item }));
  synth.checks.forEach((item, i) => candidates.push({ id: `check-${i}`, kind: "check" as Kind, item }));
  if (synth.scenario) candidates.push({ id: "scenario", kind: "scenario", item: synth.scenario });
  const slots: Slot[] = [];
  const droppedTrashed: Slot[] = [];
  for (const s of candidates) (mentionsTrashed(s, trashed) ? droppedTrashed : slots).push(s);
  if (droppedTrashed.length > 0) console.log(`[${tag}] dropped ${droppedTrashed.length} item(s) about trashed topics`);

  // --- Verify: quote check -> support check -> one retry for failed slots ---
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
      const fixedById = new Map<string, Record<string, unknown>>();
      if (Array.isArray(parsed.fixed)) {
        for (const f of parsed.fixed.filter(isRecord)) if (typeof f.id === "string") fixedById.set(f.id, f);
      }
      const retrySlots: Slot[] = [];
      for (const s of failed) {
        const f = fixedById.get(s.id);
        if (!f || f.drop === true) continue; // stays failed with its original reason
        let replacement: Slot["item"] | null = null;
        if (s.kind === "segment") replacement = normalizeSegment(f, knownKeys);
        else if (s.kind === "scenario") replacement = normalizeScenario(f, knownKeys);
        else replacement = normalizeCheck(f, knownKeys);
        if (replacement) {
          if (replacement.covers_keys.length === 0) replacement.covers_keys = s.item.covers_keys;
          s.item = replacement;
          if (mentionsTrashed(s, trashed)) continue; // repair drifted onto a trashed topic; keep failed
          retrySlots.push(s);
        }
      }
      if (retrySlots.length > 0) {
        const second = await verifyGroundedItems(retrySlots.map(toGrounded), block, anthropic);
        for (const s of retrySlots) s.result = second.get(s.id) ?? s.result;
      }
      console.log(`[${tag}] pass 2: retried ${retrySlots.length}, still failed ${slots.filter((s) => s.result?.status === "failed").length}`);
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[${tag}] verification failed: ${detail}`);
    return respond({ success: false, errors: [`Verification failed: ${detail}`] }, 502);
  }

  // --- Assemble sections from VERIFIED items only ---------------------------
  const verifiedOf = (kind: Kind) => slots.filter((s) => s.kind === kind && s.result?.status === "verified");
  const failedSlots = slots.filter((s) => s.result?.status !== "verified");

  // deno-lint-ignore no-explicit-any
  const sections: any[] = [];
  const segs = verifiedOf("segment");
  const checks = verifiedOf("check");
  const checkSection = (s: Slot, i: number) => ({
    type: "micro-check",
    questions: [toQuizQuestion(s.item as Check, `check-${i}-${lessonId}`, s.result!.chunkIds)],
  });
  const scenario = verifiedOf("scenario")[0];
  // Order (after Jeff's live conversation, which the player runs first):
  //   slide 1 -> mini check-in -> slide 2 -> micro-check -> vocab match ->
  //   scenario -> slide 3 -> mastery check.
  // Slides are interleaved with the checks so students never get a wall of
  // reading; anything missing (fewer slides, no scenario) is simply skipped.
  const conceptSection = (s: Slot) => {
    const seg = s.item as TeachingSegment;
    return {
      type: "concept",
      title: seg.title,
      paragraphs: seg.paragraphs,
      ...(seg.bullets?.length ? { bullets: seg.bullets } : {}),
      ...(seg.realWorldExample ? { realWorldExample: seg.realWorldExample } : {}),
      coversKeys: seg.covers_keys,
      sourceChunkIds: s.result!.chunkIds,
      evidenceQuote: seg.evidence_quote,
      groundingStatus: "verified",
    };
  };

  // A tap-to-match activity built in code from VERIFIED, non-trashed vocabulary
  // (term + the definition the source gave). No model call, so it is grounded
  // by construction. Emphasized terms first; 3-5 pairs.
  // A term whose name matches a trashed concept stays out too, even if the
  // teacher only trashed the concept row.
  const trashedNames = new Set(trashed.map((it) => it.label.trim().toLowerCase()));
  const vocabForMatch = [...usable.filter((it) => it.type === "vocabulary" && it.grounding_status === "verified" && it.detail.trim() && !trashedNames.has(it.label.trim().toLowerCase()))]
    .sort((a, b) => (b.teacher_status === "emphasized" ? 1 : 0) - (a.teacher_status === "emphasized" ? 1 : 0))
    .slice(0, 5);
  const vocabMatch = vocabForMatch.length >= 3
    ? {
        type: "activity-check",
        title: "Match the terms",
        activity: {
          kind: "vocab-match",
          pairs: vocabForMatch.map((v) => ({ term: v.label, definition: v.detail.trim() })),
          explanation: "These definitions come straight from your teacher's material.",
        },
        coversKeys: vocabForMatch.map((v) => v.key),
        sourceChunkIds: [] as string[],
        evidenceQuote: "",
        groundingStatus: "verified",
      }
    : null;

  const [seg1, seg2, seg3] = segs;
  if (seg1) sections.push(conceptSection(seg1));
  if (checks[0]) sections.push(checkSection(checks[0], 0));
  if (seg2) sections.push(conceptSection(seg2));
  if (checks[1]) sections.push(checkSection(checks[1], 1));
  if (vocabMatch) sections.push(vocabMatch);
  if (scenario) {
    const sc = scenario.item as Scenario;
    sections.push({
      type: "scenario",
      title: sc.title,
      narrative: sc.narrative,
      ...(sc.details?.length ? { details: sc.details } : {}),
      coversKeys: sc.covers_keys,
      sourceChunkIds: scenario.result!.chunkIds,
      evidenceQuote: sc.evidence_quote,
      groundingStatus: "verified",
    });
  }
  if (seg3) sections.push(conceptSection(seg3));
  // Any further quick checks (teacher asked for 3 or 4) go right before mastery.
  checks.slice(2).forEach((s, i) => sections.push(checkSection(s, i + 2)));

  // Mastery check from the generated pool: only rows the teacher approved
  // (teacher_approved_at set), never grounding-failed rows, never rows
  // attached to a trashed concept. The lesson JSON is what students read, so
  // the approval gate has to be applied here as well as in RLS.
  const attachedToTrashed = (g: GenQuestionRow) => !!g.concept_id && trashedConceptIds.has(g.concept_id);
  const poolRows = genQuestions.filter((g) => g.grounding_status !== "failed" && !attachedToTrashed(g) && g.teacher_approved_at != null);
  // Grounding-failed rows are listed once (below, as failed), not again here.
  const excludedTrashedRows = genQuestions.filter((g) => attachedToTrashed(g) && g.grounding_status !== "failed");
  const unapprovedRows = genQuestions.filter((g) => g.grounding_status !== "failed" && !attachedToTrashed(g) && g.teacher_approved_at == null);
  const masteryQuestions = poolRows.map((g) => ({
    id: g.id,
    question: g.question_text,
    options: g.options,
    correctAnswer: correctIndexOf(g.options, g.correct_answer),
    explanation: g.explanation ?? "",
    difficulty: g.difficulty ?? 0.5,
    sourceChunkIds: g.source_chunk_ids ?? [],
    evidenceQuote: g.evidence_quote ?? "",
    groundingStatus: g.grounding_status ?? "unverified",
  }));
  const pool = masteryQuestions.length;
  // 4 correct to pass; MasteryCheckRenderer draws `requiredCorrect` questions
  // adaptively from the pool so retries rotate through fresh questions.
  const requiredCorrect = pool > 0 ? Math.min(pool, settings.masteryRequired) : 0;
  if (pool > 0) {
    sections.push({ type: "mastery-check", questions: masteryQuestions, requiredCorrect });
  }

  // Failed / excluded items are kept for admin review, never shown to students.
  const failed_items = [
    ...failedSlots.map((s) => ({
      kind: s.kind,
      id: s.id,
      reason: s.result?.reason ?? "not verified",
      sourceChunkIds: s.result?.chunkIds ?? [],
      item: s.item,
    })),
    ...droppedTrashed.map((s) => ({
      kind: s.kind,
      id: s.id,
      reason: "Removed: about a topic the teacher trashed.",
      sourceChunkIds: [] as string[],
      item: s.item,
    })),
    ...genQuestions
      .filter((g) => g.grounding_status === "failed")
      .map((g) => ({
        kind: "mastery-question",
        id: g.id,
        reason: "generated_questions.grounding_status = 'failed'",
        sourceChunkIds: g.source_chunk_ids ?? [],
        item: { question: g.question_text, options: g.options, correctAnswer: g.correct_answer, explanation: g.explanation, evidenceQuote: g.evidence_quote },
      })),
    ...excludedTrashedRows.map((g) => ({
      kind: "mastery-question",
      id: g.id,
      reason: "Excluded: attached to a concept the teacher trashed.",
      sourceChunkIds: g.source_chunk_ids ?? [],
      item: { question: g.question_text, options: g.options, correctAnswer: g.correct_answer, explanation: g.explanation, evidenceQuote: g.evidence_quote },
    })),
    ...unapprovedRows.map((g) => ({
      kind: "mastery-question",
      id: g.id,
      reason: "Not yet approved by the teacher. Approve it and re-synthesize to include it.",
      sourceChunkIds: g.source_chunk_ids ?? [],
      item: { question: g.question_text, options: g.options, correctAnswer: g.correct_answer, explanation: g.explanation, evidenceQuote: g.evidence_quote },
    })),
  ];

  // --- Lesson coverage (computed in code) merged into coverage_report ------
  const verifiedSlots = slots.filter((s) => s.result?.status === "verified");
  const lessonText = verifiedSlots.map(slotText).join("\n").toLowerCase();
  const byId = new Map(coverage.map((e) => [`${e.item_type}:${e.item_id}`, e]));
  const ensureEntry = (it: CurationItem): CoverageEntry => {
    const k = `${it.type}:${it.id}`;
    let e = byId.get(k);
    if (!e) {
      const fromPool = it.type === "concept" ? poolRows.filter((g) => g.concept_id === it.id).length : 0;
      e = { item_type: it.type, item_id: it.id, label: it.label, teacher_status: it.teacher_status, questions_generated: fromPool, target: questionTarget(it), note: "" };
      if (it.teacher_status === "trashed") appendNote(e, "Trashed by teacher; excluded from generation.");
      byId.set(k, e);
      coverage.push(e);
    }
    e.teacher_status = it.teacher_status; // marks may have changed since questions ran
    return e;
  };
  const lessonShortfalls: string[] = [];
  for (const it of set.all) {
    const e = ensureEntry(it);
    // Drop any earlier lesson note so re-synthesis does not stack them.
    e.note = e.note.replace(/\s*Lesson:[^.]*\.(\s*Mastery pool:[^.]*\.)?/g, "").trim();
    if (it.teacher_status === "trashed") continue;
    if (it.type === "vocabulary") {
      if (it.teacher_status === "emphasized") {
        const used = lessonText.includes(it.label.toLowerCase());
        appendNote(e, used ? "Lesson: emphasized term used in the lesson." : "Lesson: emphasized term NOT used in the lesson (sources did not support it).");
        if (!used) lessonShortfalls.push(`emphasized term "${it.label}" not used`);
      }
      continue;
    }
    const dedicated = segs.some((s) => (s.item as TeachingSegment).covers_keys.includes(it.key));
    const inPool = it.type === "concept" ? poolRows.filter((g) => g.concept_id === it.id).length : 0;
    if (it.teacher_status === "emphasized") {
      if (dedicated) {
        appendNote(e, "Lesson: has its own teaching slide.");
      } else if (segs.length >= maxSegments && emphasizedTopics.length > maxSegments) {
        // Not a source problem: the 3-slide cap ran out. Jeff's conversation
        // and the check questions still cover it.
        appendNote(e, `Lesson: no dedicated slide (only ${maxSegments} slides per lesson); covered in Jeff's conversation and the questions.`);
      } else {
        appendNote(e, "Lesson: NO dedicated teaching slide (sources did not support one).");
        lessonShortfalls.push(`no dedicated slide for "${it.label}"`);
      }
      if (it.type === "concept") {
        appendNote(e, `Mastery pool: ${inPool} question(s).`);
        if (inPool === 0) lessonShortfalls.push(`no mastery-pool question for "${it.label}"`);
      }
    } else if (dedicated) {
      appendNote(e, "Lesson: has its own teaching section.");
    }
  }
  for (const ch of allChunks) {
    const k = `chunk:${ch.id}`;
    let e = byId.get(k);
    if (!e) {
      e = { item_type: "chunk", item_id: ch.id, label: chunkLabel(ch), teacher_status: (ch.teacher_status ?? "active") as CoverageEntry["teacher_status"], questions_generated: 0, target: ch.teacher_status === "emphasized" ? 1 : 0, note: "" };
      if (ch.teacher_status === "trashed") appendNote(e, "Trashed by teacher; text never sent to the model.");
      byId.set(k, e);
      coverage.push(e);
    }
    e.teacher_status = (ch.teacher_status ?? "active") as CoverageEntry["teacher_status"];
    e.note = e.note.replace(/\s*Lesson:[^.]*\./g, "").trim();
    if (ch.teacher_status === "trashed") continue;
    const citedBy = verifiedSlots.filter((s) => s.result!.chunkIds.includes(ch.id)).length;
    if (ch.teacher_status === "emphasized" || citedBy > 0) {
      appendNote(e, `Lesson: cited by ${citedBy} verified lesson item(s).`);
    }
  }
  await saveCoverageReport(supabase, uploadId, coverage);

  // Jeff live-chat context. The player runs Jeff's conversation BEFORE the
  // slides and grounds it on `excerpt` (it reads the first ~3,500 chars), so
  // the excerpt is a teaching brief, not a raw dump: the teacher's emphasis
  // first, then every verified concept and term, then the source text itself.
  // With only 3 slides, this is where most of the teaching happens.
  const sourceText = chunks.map((c) => c.content).join("\n\n");
  const usableConcepts = usable.filter((it) => it.type === "concept");
  const usableVocab = usable.filter((it) => it.type === "vocabulary" && !trashedNames.has(it.label.trim().toLowerCase()));
  const usableObjectives = usable.filter((it) => it.type === "objective");
  const line = (it: CurationItem) => (it.detail ? `${it.label}: ${it.detail}` : it.label);
  const briefParts: string[] = [];
  const emphasizedLines = [...usableConcepts, ...usableObjectives, ...usableVocab].filter((it) => it.teacher_status === "emphasized").map(line);
  if (emphasizedLines.length) briefParts.push(`TEACHER'S EMPHASIS (teach these first and most thoroughly):\n- ${emphasizedLines.join("\n- ")}`);
  if (usableObjectives.length) briefParts.push(`LEARNING OBJECTIVES:\n- ${usableObjectives.map(line).join("\n- ")}`);
  if (usableConcepts.length) briefParts.push(`KEY IDEAS (use these exact terms):\n- ${usableConcepts.map(line).join("\n- ")}`);
  if (usableVocab.length) briefParts.push(`VOCABULARY:\n- ${usableVocab.map(line).join("\n- ")}`);
  const brief = briefParts.join("\n\n");
  const EXCERPT_BUDGET = 3500;
  const remaining = Math.max(600, EXCERPT_BUDGET - brief.length - 40);
  const excerpt = `${brief}\n\nFROM THE MATERIAL:\n${sourceText.slice(0, remaining)}`.slice(0, EXCERPT_BUDGET + 500);
  const jeffContext = {
    learningObjectives: usableObjectives.map((it) => it.label),
    concepts: usableConcepts.map((it) => ({ name: it.label, definition: it.detail })),
    vocabulary: usableVocab.map((it) => ({ term: it.label, definition: it.detail })),
    excerpt,
  };

  const verifiedCount = verifiedSlots.length;
  const insufficientParts = [synth.insufficientReason, lessonShortfalls.length ? `Emphasis not fully met: ${lessonShortfalls.join("; ")}.` : null].filter(Boolean) as string[];
  const insufficientReason = insufficientParts.join(" ") || null;
  if (insufficientReason) {
    await recordInsufficientSource(supabase, uploadId, "lesson", insufficientReason);
  }

  const content = {
    version: 2,
    synthesizedAt: new Date().toISOString(),
    grounding: {
      generator: "synthesize-lesson-v2",
      sourceChunkCount: chunks.length,
      trashedChunkCount: allChunks.length - chunks.length,
      verifiedCount,
      failedCount: failed_items.length,
      ...(insufficientReason ? { insufficientSourceReason: insufficientReason } : {}),
    },
    sections,
    failed_items,
    jeffContext,
  };

  const { error: updErr } = await supabase.from("lessons").update({ content }).eq("id", lessonId);
  if (updErr) {
    console.error(`[${tag}] store failed: ${updErr.message}`);
    return respond({ success: false, errors: [`Could not store lesson content: ${updErr.message}`] }, 500);
  }
  await supabase.from("curriculum_uploads").update({ status: "lesson_synthesized" }).eq("id", uploadId);

  console.log(
    `[${tag}] stored ${sections.length} sections (${verifiedCount} verified, ${failed_items.length} failed/excluded items), ` +
      `mastery pool ${pool}, required ${requiredCorrect}`,
  );
  return respond({
    success: true,
    sectionsCount: sections.length,
    masteryCount: pool,
    requiredCorrect,
    verifiedCount,
    failedCount: failed_items.length,
    coverage,
    ...(insufficientReason ? { insufficientSourceReason: insufficientReason } : {}),
  });
});
