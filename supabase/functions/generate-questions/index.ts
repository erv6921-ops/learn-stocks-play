// Supabase Edge Function: generate-questions
//
// Generates 5 multiple-choice questions per concept for a curriculum upload
// via the Anthropic API, and stores them in generated_questions as 'pending'.
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
}

interface RequestBody {
  uploadId: string;
  // `concepts` is accepted for API compatibility but ignored — concepts are
  // read from the DB so we always have canonical ids/definitions.
  concepts?: unknown;
}

interface ResponseBody {
  success: boolean;
  questionsGenerated: number;
  errors?: string[];
}

const MODEL = "claude-sonnet-4-6";
const QUESTIONS_PER_CONCEPT = 5;

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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

function buildPrompt(c: ConceptRow): string {
  const examples =
    Array.isArray(c.examples) && c.examples.length > 0
      ? c.examples.join("; ")
      : "(none provided)";
  return `Generate ${QUESTIONS_PER_CONCEPT} multiple-choice questions about this financial literacy concept for high school students.
Concept: ${c.name}
Definition: ${c.definition}
Examples: ${examples}

Return ONLY valid JSON:
{
  "questions": [
    {
      "text": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",
      "explanation": "Why this is correct"
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
    .filter(
      (q): q is Record<string, unknown> =>
        typeof q === "object" && q !== null && !Array.isArray(q),
    )
    .map((q) => ({
      text: typeof q.text === "string" ? q.text : "",
      options: Array.isArray(q.options)
        ? q.options.filter((o): o is string => typeof o === "string")
        : [],
      correctAnswer:
        typeof q.correctAnswer === "string" ? q.correctAnswer : "",
      explanation: typeof q.explanation === "string" ? q.explanation : "",
    }))
    .filter((q) => q.text.length > 0 && q.options.length >= 2);
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return respond({ success: false, questionsGenerated: 0, errors: ["Use POST."] }, 405);
  }

  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!anthropicKey || !supabaseUrl || !serviceRoleKey) {
    return respond(
      { success: false, questionsGenerated: 0, errors: ["Server misconfiguration: missing env vars."] },
      500,
    );
  }

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return respond({ success: false, questionsGenerated: 0, errors: ["Body must be JSON."] }, 400);
  }
  const uploadId = body?.uploadId;
  if (typeof uploadId !== "string" || uploadId.length === 0) {
    return respond(
      { success: false, questionsGenerated: 0, errors: ["`uploadId` is required."] },
      400,
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
  const anthropic = new Anthropic({ apiKey: anthropicKey });

  // 1. Canonical concepts for this upload.
  const { data: concepts, error: conceptErr } = await supabase
    .from("concepts")
    .select("id, name, definition, examples")
    .eq("upload_id", uploadId);
  if (conceptErr) {
    console.error(`[${uploadId}] Failed to load concepts:`, conceptErr.message);
    return respond(
      { success: false, questionsGenerated: 0, errors: [`Load concepts: ${conceptErr.message}`] },
      500,
    );
  }
  if (!concepts || concepts.length === 0) {
    return respond({ success: false, questionsGenerated: 0, errors: ["No concepts found for this upload."] }, 404);
  }

  // 2. Skip concepts that already have questions (idempotent re-runs).
  const { data: existing } = await supabase
    .from("generated_questions")
    .select("concept_id")
    .eq("upload_id", uploadId);
  const alreadyDone = new Set(
    (existing ?? []).map((r: { concept_id: string | null }) => r.concept_id),
  );

  const todo = (concepts as ConceptRow[]).filter((c) => !alreadyDone.has(c.id));

  // 3. Generate + insert per concept.
  let questionsGenerated = 0;
  const errors: string[] = [];

  for (const concept of todo) {
    try {
      const message = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 2048,
        messages: [{ role: "user", content: buildPrompt(concept) }],
      });
      const questions = parseQuestions(firstTextBlock(message));
      if (questions.length === 0) {
        errors.push(`${concept.name}: model returned no usable questions`);
        continue;
      }

      const rows = questions.map((q) => ({
        upload_id: uploadId,
        concept_id: concept.id,
        question_text: q.text,
        options: q.options,
        correct_answer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: 0.5,
        status: "pending",
      }));

      const { error: insErr } = await supabase.from("generated_questions").insert(rows);
      if (insErr) {
        errors.push(`${concept.name}: insert failed — ${insErr.message}`);
        continue;
      }
      questionsGenerated += rows.length;
      console.log(`[${uploadId}] ${concept.name}: +${rows.length} questions`);
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      console.error(`[${uploadId}] ${concept.name} failed:`, detail);
      errors.push(`${concept.name}: ${detail}`);
    }
  }

  console.log(
    `[${uploadId}] Done: ${questionsGenerated} questions across ${todo.length} concept(s), ${errors.length} error(s).`,
  );

  return respond({
    success: questionsGenerated > 0 || todo.length === 0,
    questionsGenerated,
    ...(errors.length > 0 ? { errors } : {}),
  });
});

/*
 * TESTING
 *   supabase functions serve generate-questions
 *   curl -X POST http://localhost:54321/functions/v1/generate-questions \
 *     -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
 *     -H "Content-Type: application/json" \
 *     -d '{"uploadId":"<uuid-with-concepts>"}'
 *   → { "success": true, "questionsGenerated": 25 }
 */
