// Supabase Edge Function: generate-questions
//
// Generates ~15 multiple-choice questions TOTAL for a curriculum upload, spread
// across the most prominent concepts with a mix of difficulty levels, and
// stores them in generated_questions as 'pending'. This 15-question pool feeds
// the synthesized lesson's mastery check (pool > requiredCorrect so retries draw
// fresh subsets).
//
// Runtime:  Deno (Supabase Edge Functions)
// Env vars: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Project:  InvestiPlay (vcjdshippmqopaffuzbw)

import Anthropic from "npm:@anthropic-ai/sdk@0.70.0";
import { createClient } from "npm:@supabase/supabase-js@2";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ConceptRow {
  id: string;
  name: string;
  definition: string;
  examples: string[] | null;
}

interface GeneratedQuestion {
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  concept: string; // concept name Claude tagged this question with
  difficulty: "easy" | "medium" | "hard";
}

interface RequestBody {
  uploadId: string;
  concepts?: unknown; // accepted for API compatibility; concepts read from DB
}

interface ResponseBody {
  success: boolean;
  questionsGenerated: number;
  errors?: string[];
}

const MODEL = "claude-sonnet-4-6";
const TOTAL_QUESTIONS = 15; // pool size for the lesson mastery check
const MAX_CONCEPTS = 6; // prioritize the most prominent concepts

// Difficulty label -> stored numeric difficulty (0..1). StudentLessonView maps
// this to the IRT logit b via (d-0.5)*3, giving easy≈-0.75 / med 0 / hard≈+0.75.
const DIFFICULTY_NUM: Record<string, number> = { easy: 0.25, medium: 0.5, hard: 0.75 };

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function respond(body: ResponseBody, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function firstTextBlock(message: Anthropic.Message): string {
  for (const block of message.content) {
    if (block.type === "text") return block.text;
  }
  return "";
}

/** Strip markdown code fences Claude sometimes adds despite instructions. */
function stripFences(s: string): string {
  return s.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
}

function buildPrompt(concepts: ConceptRow[]): string {
  const conceptBlock = concepts
    .map((c, i) => {
      const ex = Array.isArray(c.examples) && c.examples.length > 0 ? c.examples.join("; ") : "(none)";
      return `${i + 1}. ${c.name}\n   Definition: ${c.definition}\n   Examples: ${ex}`;
    })
    .join("\n");

  return `You are writing a mastery-check question bank for a high-school financial-literacy lesson.

Generate EXACTLY ${TOTAL_QUESTIONS} multiple-choice questions TOTAL, distributed across these concepts (weight toward the earlier/most prominent concepts). Each question has 4 options and exactly one correct answer.

Requirements:
- Mix of difficulty: roughly 5 "easy", 6 "medium", 4 "hard".
- Each question tagged with the concept name it tests (use the exact names below).
- "correctAnswer" must be the full text of the correct option (must match one of "options" exactly).
- Age-appropriate, clear, no trick wording. Distractors must be plausible.

CONCEPTS:
${conceptBlock}

Return ONLY valid JSON, no markdown, no preamble:
{
  "questions": [
    {
      "text": "Question text",
      "options": ["full option A", "full option B", "full option C", "full option D"],
      "correctAnswer": "full text of the correct option",
      "explanation": "Why this is correct",
      "concept": "exact concept name from the list",
      "difficulty": "easy|medium|hard"
    }
  ]
}`;
}

function parseQuestions(raw: string): GeneratedQuestion[] {
  const parsed = JSON.parse(stripFences(raw)) as { questions?: unknown };
  if (!parsed || !Array.isArray(parsed.questions)) {
    throw new Error("Response missing a 'questions' array");
  }
  return parsed.questions
    .filter((q): q is Record<string, unknown> => typeof q === "object" && q !== null && !Array.isArray(q))
    .map((q) => {
      const diff = String(q.difficulty ?? "medium").toLowerCase();
      return {
        text: typeof q.text === "string" ? q.text : "",
        options: Array.isArray(q.options) ? q.options.filter((o): o is string => typeof o === "string") : [],
        correctAnswer: typeof q.correctAnswer === "string" ? q.correctAnswer : "",
        explanation: typeof q.explanation === "string" ? q.explanation : "",
        concept: typeof q.concept === "string" ? q.concept : "",
        difficulty: (diff === "easy" || diff === "hard" ? diff : "medium") as GeneratedQuestion["difficulty"],
      };
    })
    .filter((q) => q.text.length > 0 && q.options.length >= 2 && q.correctAnswer.length > 0);
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
  console.log(`[GQ] uploadId=${uploadId}`);

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const anthropic = new Anthropic({ apiKey: anthropicKey });

  // Idempotent: if this upload already has questions, don't regenerate.
  const { data: existing } = await supabase
    .from("generated_questions")
    .select("id")
    .eq("upload_id", uploadId)
    .limit(1);
  if (existing && existing.length > 0) {
    const { count } = await supabase
      .from("generated_questions")
      .select("id", { count: "exact", head: true })
      .eq("upload_id", uploadId);
    console.log(`[GQ][${uploadId}] questions already exist (${count}); skipping generation.`);
    return respond({ success: true, questionsGenerated: count ?? 0 });
  }

  // Load concepts in prominence order (extract-curriculum inserts most-prominent
  // first), take the top MAX_CONCEPTS.
  const { data: concepts, error: conceptErr } = await supabase
    .from("concepts")
    .select("id, name, definition, examples")
    .eq("upload_id", uploadId)
    .order("created_at", { ascending: true })
    .limit(MAX_CONCEPTS);
  if (conceptErr) {
    return respond({ success: false, questionsGenerated: 0, errors: [`Load concepts: ${conceptErr.message}`] }, 500);
  }
  if (!concepts || concepts.length === 0) {
    return respond({ success: false, questionsGenerated: 0, errors: ["No concepts found for this upload."] }, 404);
  }
  const conceptRows = concepts as ConceptRow[];
  console.log(`[GQ][${uploadId}] concepts: ${conceptRows.map((c) => c.name).join(", ")}`);

  // Name -> id (case-insensitive) so questions can be attributed to a concept.
  const idByName = new Map<string, string>();
  for (const c of conceptRows) idByName.set(c.name.trim().toLowerCase(), c.id);
  const fallbackConceptId = conceptRows[0].id;

  // One Claude call for the whole 15-question pool.
  let questions: GeneratedQuestion[];
  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 8000,
      messages: [{ role: "user", content: buildPrompt(conceptRows) }],
    });
    const raw = firstTextBlock(message);
    console.log(`[GQ][${uploadId}] Claude responded: stop=${message.stop_reason}, chars=${raw.length}`);
    questions = parseQuestions(raw);
    console.log(`[GQ][${uploadId}] parsed ${questions.length} questions`);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[GQ][${uploadId}] generation failed: ${detail}`);
    return respond({ success: false, questionsGenerated: 0, errors: [`Generation failed: ${detail}`] }, 502);
  }

  if (questions.length === 0) {
    return respond({ success: false, questionsGenerated: 0, errors: ["Model returned no usable questions."] }, 502);
  }

  const rows = questions.slice(0, TOTAL_QUESTIONS).map((q) => ({
    upload_id: uploadId,
    concept_id: idByName.get(q.concept.trim().toLowerCase()) ?? fallbackConceptId,
    question_text: q.text,
    options: q.options,
    correct_answer: q.correctAnswer,
    explanation: q.explanation,
    difficulty: DIFFICULTY_NUM[q.difficulty] ?? 0.5,
    status: "pending",
  }));

  const { error: insErr } = await supabase.from("generated_questions").insert(rows);
  if (insErr) {
    console.error(`[GQ][${uploadId}] insert failed: ${insErr.message}`);
    return respond({ success: false, questionsGenerated: 0, errors: [`Insert failed: ${insErr.message}`] }, 500);
  }

  console.log(`[GQ][${uploadId}] inserted ${rows.length} questions`);
  return respond({ success: true, questionsGenerated: rows.length });
});
