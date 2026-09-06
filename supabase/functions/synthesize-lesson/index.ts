// Supabase Edge Function: synthesize-lesson
//
// Turns an uploaded curriculum (extracted_text + concepts + vocabulary +
// objectives + the 15 generated questions) into a FULL Jeff-taught lesson,
// matching the app's StructuredLessonContent schema, and stores it in
// lessons.content (JSONB).
//
// Produced structure (ordered):
//   concept (Jeff-voiced teaching) x2-4, with a mini check-in placed mid-lesson,
//   a micro-check after later teaching, a scenario, then a mastery-check built
//   server-side from the 15 generated questions (pool > requiredCorrect).
//
// Input:  { uploadId, lessonId }
// Output: { success, sectionsCount, masteryCount, requiredCorrect, errors? }
//
// Runtime:  Deno (Supabase Edge Functions)
// Env vars: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Project:  InvestiPlay (vcjdshippmqopaffuzbw)

import Anthropic from "npm:@anthropic-ai/sdk@0.70.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const MODEL = "claude-sonnet-4-6";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ---------------------------------------------------------------------------
// Locked system prompt
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are Jeff, a friendly financial-literacy mascot who teaches high-school students. You are turning a teacher's uploaded material into a short, engaging lesson.

Write in Jeff's voice: warm, encouraging, plain-spoken, second person ("you"), high-school appropriate. Never invent facts beyond the provided material; teach only what the material supports.

Produce a lesson with:
- 2 to 4 teaching segments, each a clear chunk of the material explained in Jeff's voice.
- ONE "mini check-in": a single quick multiple-choice question to confirm understanding mid-lesson.
- ONE "micro-check": a single short multiple-choice knowledge check.
- ONE "scenario": a realistic applied situation a student might face, using the material's examples.

Return ONLY valid JSON (no markdown, no preamble):
{
  "teachingSegments": [
    { "title": "Segment title", "paragraphs": ["Jeff-voiced paragraph", "..."], "bullets": ["optional key point"], "realWorldExample": "optional short example" }
  ],
  "miniCheckIn": { "question": "text", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "why" },
  "microCheck":  { "question": "text", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "why" },
  "scenario":    { "title": "text", "narrative": "text", "details": ["optional detail"] }
}

Rules:
- Exactly 4 options for each question; correctIndex is 0-3.
- bullets/realWorldExample/details are optional; omit if not useful.
- Keep paragraphs tight (2-4 sentences each). No markdown formatting inside strings.`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Body {
  uploadId: string;
  lessonId: string;
}

interface Check {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface TeachingSegment {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  realWorldExample?: string;
}

interface Synth {
  teachingSegments: TeachingSegment[];
  miniCheckIn: Check;
  microCheck: Check;
  scenario: { title: string; narrative: string; details?: string[] };
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

function firstTextBlock(message: Anthropic.Message): string {
  for (const b of message.content) if (b.type === "text") return b.text;
  return "";
}

const stripFences = (s: string) => s.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

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
  return 0; // fallback — never leaves a question unscoreable
}

function toQuizQuestion(c: Check, id: string) {
  const options = Array.isArray(c.options) ? c.options.slice(0, 4) : [];
  const idx = Number.isInteger(c.correctIndex) ? Math.max(0, Math.min(options.length - 1, c.correctIndex)) : 0;
  return { id, question: c.question, options, correctAnswer: idx, explanation: c.explanation };
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
  console.log(`[SL] upload=${uploadId} lesson=${lessonId}`);

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const anthropic = new Anthropic({ apiKey: anthropicKey });

  // Load all source material.
  const [uploadRes, conceptsRes, vocabRes, objRes, qRes] = await Promise.all([
    supabase.from("curriculum_uploads").select("extracted_text").eq("id", uploadId).single(),
    supabase.from("concepts").select("name, definition, examples").eq("upload_id", uploadId).order("created_at", { ascending: true }),
    supabase.from("vocabulary").select("term, definition, context").eq("upload_id", uploadId),
    supabase.from("learning_objectives").select("objective").eq("upload_id", uploadId),
    supabase
      .from("generated_questions")
      .select("id, question_text, options, correct_answer, explanation, difficulty")
      .eq("upload_id", uploadId)
      .order("created_at", { ascending: true }),
  ]);

  const extractedText = (uploadRes.data?.extracted_text ?? "") as string;
  const concepts = (conceptsRes.data ?? []) as { name: string; definition: string; examples: string[] | null }[];
  const vocabulary = (vocabRes.data ?? []) as { term: string; definition: string; context: string | null }[];
  const objectives = (objRes.data ?? []) as { objective: string }[];
  const genQuestions = (qRes.data ?? []) as {
    id: string; question_text: string; options: string[]; correct_answer: string; explanation: string | null; difficulty: number | null;
  }[];

  if (concepts.length === 0 && extractedText.length === 0) {
    return respond({ success: false, errors: ["No source material found for this upload."] }, 404);
  }

  // Build the teaching prompt from the source material.
  const material = [
    `LEARNING OBJECTIVES:\n${objectives.map((o) => `- ${o.objective}`).join("\n") || "(none provided)"}`,
    `CONCEPTS:\n${concepts.map((c) => `- ${c.name}: ${c.definition}${c.examples?.length ? ` (e.g. ${c.examples.join("; ")})` : ""}`).join("\n") || "(none)"}`,
    `VOCABULARY:\n${vocabulary.map((v) => `- ${v.term}: ${v.definition}`).join("\n") || "(none)"}`,
    `SOURCE TEXT (excerpt):\n${extractedText.slice(0, 6000)}`,
  ].join("\n\n");

  // Synthesize the teaching + checks + scenario.
  let synth: Synth;
  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: material }],
    });
    const raw = firstTextBlock(message);
    console.log(`[SL][${lessonId}] Claude responded: stop=${message.stop_reason}, chars=${raw.length}`);
    synth = JSON.parse(stripFences(raw)) as Synth;
    if (!Array.isArray(synth.teachingSegments) || synth.teachingSegments.length === 0) {
      throw new Error("Missing teachingSegments");
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[SL][${lessonId}] synthesis failed: ${detail}`);
    return respond({ success: false, errors: [`Synthesis failed: ${detail}`] }, 502);
  }

  // Build the ordered sections array (StructuredLessonContent shape). The mini
  // check-in is placed after the first 1-2 teaching segments (mid-lesson).
  // deno-lint-ignore no-explicit-any
  const sections: any[] = [];
  const segs = synth.teachingSegments.slice(0, 4);
  const midpoint = Math.max(1, Math.ceil(segs.length / 2));
  segs.forEach((s, i) => {
    sections.push({
      type: "concept",
      title: s.title,
      paragraphs: Array.isArray(s.paragraphs) ? s.paragraphs : [],
      ...(s.bullets?.length ? { bullets: s.bullets } : {}),
      ...(s.realWorldExample ? { realWorldExample: s.realWorldExample } : {}),
    });
    if (i === midpoint - 1 && synth.miniCheckIn) {
      sections.push({ type: "micro-check", questions: [toQuizQuestion(synth.miniCheckIn, `mini-${lessonId}`)] });
    }
  });
  if (synth.microCheck) {
    sections.push({ type: "micro-check", questions: [toQuizQuestion(synth.microCheck, `micro-${lessonId}`)] });
  }
  if (synth.scenario) {
    sections.push({
      type: "scenario",
      title: synth.scenario.title,
      narrative: synth.scenario.narrative,
      ...(synth.scenario.details?.length ? { details: synth.scenario.details } : {}),
    });
  }

  // Mastery check built server-side from the 15 generated questions (pool >
  // requiredCorrect so retries draw fresh subsets, per the app's formula).
  const masteryQuestions = genQuestions.map((g) => ({
    id: g.id,
    question: g.question_text,
    options: g.options,
    correctAnswer: correctIndexOf(g.options, g.correct_answer),
    explanation: g.explanation ?? "",
    difficulty: g.difficulty ?? 0.5,
  }));
  const pool = masteryQuestions.length;
  const requiredCorrect = pool > 0 ? Math.max(1, Math.min(pool, Math.round(pool * 0.6))) : 0; // 15 -> 9
  if (pool > 0) {
    sections.push({ type: "mastery-check", questions: masteryQuestions, requiredCorrect });
  }

  // Jeff live-chat context so he can teach/answer about THIS upload.
  const jeffContext = {
    learningObjectives: objectives.map((o) => o.objective),
    concepts: concepts.map((c) => ({ name: c.name, definition: c.definition })),
    vocabulary: vocabulary.map((v) => ({ term: v.term, definition: v.definition })),
    excerpt: extractedText.slice(0, 4000),
  };

  const content = {
    version: 1,
    synthesizedAt: new Date().toISOString(),
    sections,
    jeffContext,
  };

  const { error: updErr } = await supabase.from("lessons").update({ content }).eq("id", lessonId);
  if (updErr) {
    console.error(`[SL][${lessonId}] store failed: ${updErr.message}`);
    return respond({ success: false, errors: [`Could not store lesson content: ${updErr.message}`] }, 500);
  }

  console.log(`[SL][${lessonId}] stored ${sections.length} sections, mastery pool ${pool}, required ${requiredCorrect}`);
  return respond({
    success: true,
    sectionsCount: sections.length,
    masteryCount: pool,
    requiredCorrect,
  });
});
