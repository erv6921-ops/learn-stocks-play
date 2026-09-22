// Supabase Edge Function: author-lesson-material
//
// "Create a lesson from a description." The teacher types what they want to
// teach; Jeff writes the SOURCE MATERIAL for it from his own financial-
// literacy knowledge, and that material is stored exactly the way an uploaded
// PDF's extraction is stored:
//   curriculum_uploads        one row, origin = 'jeff_knowledge', file_name = lesson title
//   curriculum_source_chunks  one chunk per written section ("page")
//   sub_lessons               the default sub-lesson owning every chunk
//   concepts / vocabulary /   the items Jeff listed, each cited to the page
//   learning_objectives       that states it, quote-checked against that page
//
// From there the teacher's existing pipeline runs UNCHANGED:
//   generate-questions-v2  ->  synthesize-lesson-v2  (same settings, same
//   instructions, same review page, same approval gates). The only difference
//   from a PDF upload is who wrote the pages.
//
// Input:  { description, title?, instructions?, settings? }
// Output: { success, uploadId, subLessonId, title, summary, pagesCount,
//           conceptsCount, vocabularyCount, objectivesCount, errors? }
//
// Runtime:  Deno (Supabase Edge Functions)
// Env vars: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Project:  InvestiPlay (vcjdshippmqopaffuzbw)

import Anthropic from "npm:@anthropic-ai/sdk@0.70.0";
import { createClient } from "npm:@supabase/supabase-js@2";
import {
  cleanTeacherInstructions,
  countWords,
  ensureDefaultSubLesson,
  firstTextBlock,
  isRecord,
  normalizeGenerationSettings,
  parseJsonObject,
  verifyQuote,
} from "../_shared/grounding.ts";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Writing accurate material with no source to lean on is the one step in the
// pipeline where model capability matters most, so this uses the most capable
// generally available model rather than the shared MODEL constant.
const AUTHOR_MODEL = "claude-opus-5";

const DESCRIPTION_MAX_CHARS = 2_000;
const TITLE_MAX_CHARS = 120;
const MIN_PAGES = 3;
const MAX_PAGES = 8;

// ---------------------------------------------------------------------------
// Prompt
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are Jeff, InvestiPlay's financial-literacy teacher, and an expert curriculum author for U.S. high-school students (ages 14-18). A teacher has described a lesson they want. Write the SOURCE MATERIAL for that lesson from your own expert knowledge of personal finance, economics, investing and business, the way a strong textbook section reads.

This material will be the ONLY source for everything that follows: a question bank, quick checks, a worked scenario and Jeff's live explanation are all generated from it and verified against it word for word. So it must be complete, accurate and self-contained.

Write:
- Between ${MIN_PAGES} and ${MAX_PAGES} sections ("pages"), each 250 to 450 words of plain prose paragraphs. No markdown, no bullet symbols, no headings inside the text (the heading is a separate field). Separate paragraphs with a blank line.
- U.S. context unless the teacher says otherwise. Facts, rules of thumb, rates and figures must be accurate and current; when you use numbers, keep them realistic and make the arithmetic exact. Include at least two worked numerical examples with concrete numbers, because the lesson's scenario and applied questions may only use numbers that appear in this text.
- Define every key term IN the text, in a full sentence, in the section where it is introduced. Use the exact term the field uses.
- Keep the reading level accessible (plain words, short sentences) without dumbing down the content. No jokes, no filler, no "in this lesson we will".

Then list, from the pages you wrote:
- "concepts": 5 to 10 key ideas. Each has "name", a one-sentence "definition", the 1-based "page" it is explained on, and "evidence_quote": an exact, contiguous copy (at most 40 words, character for character) of the sentence on that page that states it.
- "vocabulary": 6 to 12 terms. Each has "term", "definition" (the definition as worded in the text), "page", and "evidence_quote" (exact copy of the defining sentence).
- "objectives": 3 to 6 student-facing learning objectives ("Explain ...", "Calculate ...", "Compare ..."). Each has "text", "page", and "evidence_quote" (exact copy of the passage the objective is met by).

Follow the teacher's instructions (when given) on scope, emphasis, tone, structure and grade level.

Return ONLY valid JSON (no markdown fences, no preamble):
{
  "title": "Short lesson title (at most 8 words)",
  "summary": "One sentence saying what students will be able to do",
  "pages": [ { "heading": "Section heading", "text": "250-450 words of prose" } ],
  "concepts": [ { "name": "...", "definition": "...", "page": 1, "evidence_quote": "..." } ],
  "vocabulary": [ { "term": "...", "definition": "...", "page": 1, "evidence_quote": "..." } ],
  "objectives": [ { "text": "...", "page": 1, "evidence_quote": "..." } ]
}`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Body {
  description?: unknown;
  title?: unknown;
  instructions?: unknown;
  settings?: unknown;
}

interface Page {
  heading: string;
  text: string;
}

interface AuthoredItem {
  label: string;
  detail: string;
  page: number;
  evidence_quote: string;
}

interface Authored {
  title: string;
  summary: string;
  pages: Page[];
  concepts: AuthoredItem[];
  vocabulary: AuthoredItem[];
  objectives: AuthoredItem[];
}

interface ChunkRow {
  id: string;
  chunk_index: number;
  content: string;
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

const fail = (errors: string[], status: number) => respond({ success: false, errors }, status);

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

function normalizeItems(raw: unknown, labelKey: string, detailKey: string | null): AuthoredItem[] {
  if (!Array.isArray(raw)) return [];
  const out: AuthoredItem[] = [];
  for (const r of raw) {
    if (!isRecord(r)) continue;
    const label = str(r[labelKey]);
    if (!label) continue;
    const page = Number(r.page);
    out.push({
      label,
      detail: detailKey ? str(r[detailKey]) : "",
      page: Number.isInteger(page) ? page : 0,
      evidence_quote: str(r.evidence_quote),
    });
  }
  return out;
}

function normalizeAuthored(parsed: Record<string, unknown>, fallbackTitle: string): Authored {
  const pages: Page[] = Array.isArray(parsed.pages)
    ? parsed.pages
        .filter(isRecord)
        .map((p) => ({ heading: str(p.heading), text: str(p.text) }))
        .filter((p) => p.text.length > 0)
        .slice(0, MAX_PAGES)
    : [];
  return {
    title: (str(parsed.title) || fallbackTitle).slice(0, TITLE_MAX_CHARS),
    summary: str(parsed.summary),
    pages,
    concepts: normalizeItems(parsed.concepts, "name", "definition").filter((c) => c.detail),
    vocabulary: normalizeItems(parsed.vocabulary, "term", "definition").filter((v) => v.detail),
    objectives: normalizeItems(parsed.objectives, "text", null),
  };
}

/**
 * Cites an item to a page chunk and checks its quote. The quote is checked on
 * the page the model named first, then every page (the model may have
 * miscounted), then the item's own definition is tried as the quote (it was
 * asked to appear verbatim in the text). Anything else is stored as
 * 'unverified' and still cited to a page so it stays in the sub-lesson's scope.
 */
function ground(item: AuthoredItem, chunks: ChunkRow[]): { chunkId: string; quote: string; status: "verified" | "unverified" } {
  const named = chunks[item.page - 1];
  const candidates = [item.evidence_quote, item.detail].map((q) => q.trim()).filter((q) => q.length > 0);
  for (const quote of candidates) {
    if (named && verifyQuote(quote, named.content)) return { chunkId: named.id, quote, status: "verified" };
    for (const c of chunks) {
      if (verifyQuote(quote, c.content)) return { chunkId: c.id, quote, status: "verified" };
    }
  }
  return { chunkId: (named ?? chunks[0]).id, quote: item.evidence_quote || item.detail, status: "unverified" };
}

/** Teacher id from the request's JWT (the gateway has already verified it). */
async function teacherIdFrom(req: Request, supabaseUrl: string, serviceRoleKey: string): Promise<string | null> {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user.id;
}

/**
 * One authoring call. Adaptive thinking is on by default on this model;
 * server-side refusal fallbacks are requested so a policy decline (very
 * unlikely for classroom finance material) is retried on another model
 * inside the same call. If the fallback beta is not available to this
 * project the call is retried once without it.
 */
async function author(anthropic: Anthropic, user: string, tag: string): Promise<Record<string, unknown>> {
  const base = {
    model: AUTHOR_MODEL,
    max_tokens: 16000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user" as const, content: user }],
    output_config: { effort: "medium" },
  };
  const withFallback = { ...base, betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" };
  let message: Anthropic.Message;
  try {
    // deno-lint-ignore no-explicit-any
    message = (await (anthropic.beta.messages.create as any)(withFallback)) as Anthropic.Message;
  } catch (err) {
    const status = (err as { status?: number })?.status;
    if (status !== 400) throw err;
    console.warn(`[${tag}] fallback beta rejected (${err instanceof Error ? err.message : String(err)}); retrying without it`);
    // deno-lint-ignore no-explicit-any
    message = (await (anthropic.messages.create as any)(base)) as Anthropic.Message;
  }
  const raw = firstTextBlock(message);
  console.log(`[${tag}] ${message.model} responded: stop=${message.stop_reason}, in=${message.usage.input_tokens}, out=${message.usage.output_tokens}, chars=${raw.length}`);
  if (message.stop_reason === "refusal") throw new Error("Jeff declined to write this material. Try rewording the description.");
  if (message.stop_reason === "max_tokens") console.error(`[${tag}] Response truncated at max_tokens.`);
  return parseJsonObject(raw);
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return fail(["Use POST."], 405);

  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!anthropicKey || !supabaseUrl || !serviceRoleKey) {
    return fail(["Server misconfiguration: missing env vars."], 500);
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return fail(["Body must be JSON."], 400);
  }
  const description = str(body.description).slice(0, DESCRIPTION_MAX_CHARS);
  if (description.length < 10) return fail(["Describe the lesson in at least a sentence."], 400);
  const requestedTitle = str(body.title).slice(0, TITLE_MAX_CHARS);
  const instructions = cleanTeacherInstructions(body.instructions);
  const settings = normalizeGenerationSettings(body.settings);

  const teacherId = await teacherIdFrom(req, supabaseUrl, serviceRoleKey);
  if (!teacherId) return fail(["You must be signed in."], 401);

  const tag = `ALM][${teacherId.slice(0, 8)}`;
  console.log(`[${tag}] "${description.slice(0, 80)}"`);
  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const anthropic = new Anthropic({ apiKey: anthropicKey });

  // --- 1. Jeff writes the material -------------------------------------------
  let authored: Authored;
  try {
    const user =
      `TEACHER'S DESCRIPTION OF THE LESSON:\n${description}` +
      (requestedTitle ? `\n\nTEACHER'S TITLE (use it): ${requestedTitle}` : "") +
      (instructions ? `\n\nTEACHER'S INSTRUCTIONS:\n${instructions}` : "") +
      `\n\nThe question bank built from this material will have ${settings.bankSize} questions at "${settings.difficulty}" difficulty, so cover enough distinct, checkable ideas to support that.`;
    const parsed = await author(anthropic, user, tag);
    authored = normalizeAuthored(parsed, requestedTitle || description.slice(0, 60));
    if (requestedTitle) authored.title = requestedTitle;
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[${tag}] authoring failed: ${detail}`);
    return fail([`Jeff couldn't write the material: ${detail}`], 502);
  }
  const words = authored.pages.reduce((n, p) => n + countWords(p.text), 0);
  if (authored.pages.length < MIN_PAGES || words < 400) {
    return fail([`Jeff wrote too little to build a lesson from (${authored.pages.length} section(s), ${words} words). Try a more specific description.`], 422);
  }
  console.log(`[${tag}] "${authored.title}": ${authored.pages.length} pages, ${words} words, ${authored.concepts.length}c/${authored.vocabulary.length}v/${authored.objectives.length}o`);

  // --- 2. Store it exactly like an extracted upload ---------------------------
  const pageText = (p: Page) => (p.heading ? `${p.heading}\n\n${p.text}` : p.text);
  const extractedText = authored.pages.map(pageText).join("\n\n");
  const { data: upload, error: uErr } = await supabase
    .from("curriculum_uploads")
    .insert({
      teacher_id: teacherId,
      file_name: authored.title,
      extracted_text: extractedText,
      status: "awaiting_teacher_review",
      generation_settings: settings,
      teacher_instructions: instructions,
      origin: "jeff_knowledge",
      topic_prompt: description,
    })
    .select("id")
    .single();
  if (uErr || !upload?.id) return fail([`Could not create the lesson record: ${uErr?.message ?? "unknown error"}`], 500);
  const uploadId = upload.id as string;

  const { data: chunkRows, error: cErr } = await supabase
    .from("curriculum_source_chunks")
    .insert(authored.pages.map((p, i) => ({ upload_id: uploadId, chunk_index: i, page_start: i + 1, page_end: i + 1, content: pageText(p) })))
    .select("id, chunk_index, content");
  if (cErr || !chunkRows?.length) {
    await supabase.from("curriculum_uploads").update({ status: "extraction_failed" }).eq("id", uploadId);
    return fail([`Could not store the pages: ${cErr?.message ?? "unknown error"}`], 500);
  }
  const chunks = (chunkRows as ChunkRow[]).sort((a, b) => a.chunk_index - b.chunk_index);

  let subLessonId: string;
  try {
    const sub = await ensureDefaultSubLesson(supabase, uploadId, authored.title);
    subLessonId = sub.id;
  } catch (err) {
    return fail([err instanceof Error ? err.message : String(err)], 500);
  }

  const cite = (it: AuthoredItem) => {
    const g = ground(it, chunks);
    return { source_chunk_ids: [g.chunkId], evidence_quote: g.quote, grounding_status: g.status };
  };
  const errors: string[] = [];
  if (authored.concepts.length) {
    const { error } = await supabase.from("concepts").insert(
      authored.concepts.map((c) => ({ upload_id: uploadId, name: c.label, definition: c.detail, ...cite(c) })),
    );
    if (error) errors.push(`concepts: ${error.message}`);
  }
  if (authored.vocabulary.length) {
    const { error } = await supabase.from("vocabulary").insert(
      authored.vocabulary.map((v) => ({ upload_id: uploadId, term: v.label, definition: v.detail, ...cite(v) })),
    );
    if (error) errors.push(`vocabulary: ${error.message}`);
  }
  if (authored.objectives.length) {
    const { error } = await supabase.from("learning_objectives").insert(
      authored.objectives.map((o) => ({ upload_id: uploadId, objective: o.label, ...cite(o) })),
    );
    if (error) errors.push(`learning_objectives: ${error.message}`);
  }
  if (errors.length) {
    console.error(`[${tag}] item save errors: ${errors.join(" | ")}`);
    return respond({ success: false, uploadId, subLessonId, errors: [`Could not save: ${errors.join(" | ")}`] }, 500);
  }

  console.log(`[${tag}] stored upload ${uploadId} / sub-lesson ${subLessonId}`);
  return respond({
    success: true,
    uploadId,
    subLessonId,
    title: authored.title,
    summary: authored.summary,
    pagesCount: chunks.length,
    conceptsCount: authored.concepts.length,
    vocabularyCount: authored.vocabulary.length,
    objectivesCount: authored.objectives.length,
  });
});
