// Supabase Edge Function: extract-curriculum
//
// Accepts POST { uploadId, extractedText }, calls the Anthropic API with a
// locked system prompt to extract curriculum structure, persists the extracted
// concepts / learning objectives / vocabulary, and returns structured counts.
//
// Runtime:   Deno (Supabase Edge Functions)
// Env vars:  ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//            (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected by the
//             Supabase runtime automatically; ANTHROPIC_API_KEY must be set.)
//
// Project:   InvestiPlay (vcjdshippmqopaffuzbw)

import Anthropic from "npm:@anthropic-ai/sdk@0.70.0";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DifficultyLevel = "beginner" | "intermediate" | "advanced";

interface ExtractedConcept {
  name: string;
  definition: string;
  cpalms_alignment: string;
  prerequisites: string[];
  difficulty_level: DifficultyLevel;
  examples: string[];
}

interface VocabularyItem {
  term: string;
  definition: string;
  context: string;
}

interface ExtractionResult {
  learning_objectives: string[];
  concepts: ExtractedConcept[];
  vocabulary: VocabularyItem[];
}

interface RequestBody {
  uploadId: string;
  extractedText: string;
}

interface ResponseBody {
  success: boolean;
  conceptsCount: number;
  vocabularyCount: number;
  objectivesCount: number;
  errors?: string[];
}

// ---------------------------------------------------------------------------
// Locked, non-negotiable system prompt
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are an educational content analyst for a financial literacy curriculum system. Extract ONLY the following from the teacher's textbook/materials:

REQUIRED OUTPUT FORMAT (JSON only, no preamble):
{
  "learning_objectives": ["LO1", "LO2"],
  "concepts": [
    {
      "name": "Concept Name",
      "definition": "Clear, student-friendly definition",
      "cpalms_alignment": "SS.912.FL.X.X",
      "prerequisites": ["Concept A", "Concept B"],
      "difficulty_level": "beginner|intermediate|advanced",
      "examples": ["Example 1", "Example 2"]
    }
  ],
  "vocabulary": [
    {
      "term": "Term",
      "definition": "Definition",
      "context": "How it's used in the text"
    }
  ]
}

CONSTRAINTS:
- Only extract if clearly defined in the text
- Align concepts to Florida CPALMS SS.912.FL standards where possible
- Difficulty level: count paragraphs (1-2 = beginner, 3-5 = intermediate, 5+ = advanced)
- Do NOT invent learning objectives; only use explicit ones from the text
- Return empty arrays if a category has no content
- Maximum 50 concepts per upload (prioritize by prominence)

Respond ONLY with valid JSON. No markdown. No explanation.`;

const MODEL = "claude-sonnet-4-6";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function respond(body: ResponseBody, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function fail(errors: string[], status: number): Response {
  return respond(
    { success: false, conceptsCount: 0, vocabularyCount: 0, objectivesCount: 0, errors },
    status,
  );
}

/**
 * Extracts the text of the first text block from an Anthropic message.
 * The locked prompt instructs JSON-only, so this is the whole payload.
 */
function firstTextBlock(message: Anthropic.Message): string {
  for (const block of message.content) {
    if (block.type === "text") return block.text;
  }
  return "";
}

const VALID_DIFFICULTY: ReadonlySet<string> = new Set([
  "beginner",
  "intermediate",
  "advanced",
]);

const asStringArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Validates and normalizes a raw parsed object into an ExtractionResult.
 * Throws if the top-level shape is wrong; coerces/skips malformed sub-items.
 */
function normalizeResult(raw: unknown): ExtractionResult {
  if (!isRecord(raw)) {
    throw new Error("Model response was not a JSON object");
  }

  const concepts: ExtractedConcept[] = Array.isArray(raw.concepts)
    ? raw.concepts
        .filter(isRecord)
        .map((c) => {
          const difficulty = String(c.difficulty_level ?? "beginner");
          return {
            name: typeof c.name === "string" ? c.name : "",
            definition: typeof c.definition === "string" ? c.definition : "",
            cpalms_alignment:
              typeof c.cpalms_alignment === "string" ? c.cpalms_alignment : "",
            prerequisites: asStringArray(c.prerequisites),
            difficulty_level: (VALID_DIFFICULTY.has(difficulty)
              ? difficulty
              : "beginner") as DifficultyLevel,
            examples: asStringArray(c.examples),
          };
        })
        // name + definition are NOT NULL in the concepts table.
        .filter((c) => c.name.length > 0 && c.definition.length > 0)
        // Defensive: enforce the 50-concept ceiling in case the model overruns.
        .slice(0, 50)
    : [];

  const vocabulary: VocabularyItem[] = Array.isArray(raw.vocabulary)
    ? raw.vocabulary
        .filter(isRecord)
        .map((v) => ({
          term: typeof v.term === "string" ? v.term : "",
          definition: typeof v.definition === "string" ? v.definition : "",
          context: typeof v.context === "string" ? v.context : "",
        }))
        // term + definition are NOT NULL in the vocabulary table.
        .filter((v) => v.term.length > 0 && v.definition.length > 0)
    : [];

  const learning_objectives = asStringArray(raw.learning_objectives)
    .map((o) => o.trim())
    .filter((o) => o.length > 0);

  return { learning_objectives, concepts, vocabulary };
}

async function markStatus(
  supabase: SupabaseClient,
  uploadId: string,
  status: string,
): Promise<void> {
  const { error } = await supabase
    .from("curriculum_uploads")
    .update({ status })
    .eq("id", uploadId);
  if (error) {
    console.error(
      `[${uploadId}] Failed to set status='${status}':`,
      error.message,
    );
  }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return fail(["Method not allowed. Use POST."], 405);
  }

  // --- Env validation -------------------------------------------------------
  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!anthropicKey || !supabaseUrl || !serviceRoleKey) {
    const missing = [
      !anthropicKey && "ANTHROPIC_API_KEY",
      !supabaseUrl && "SUPABASE_URL",
      !serviceRoleKey && "SUPABASE_SERVICE_ROLE_KEY",
    ].filter(Boolean);
    console.error("Missing environment variables:", missing.join(", "));
    return fail([`Server misconfiguration: missing ${missing.join(", ")}`], 500);
  }

  // --- Parse & validate request body ---------------------------------------
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return fail(["Request body must be valid JSON."], 400);
  }

  const uploadId = body?.uploadId;
  const extractedText = body?.extractedText;
  const validationErrors: string[] = [];
  if (typeof uploadId !== "string" || uploadId.length === 0) {
    validationErrors.push("`uploadId` is required and must be a non-empty string.");
  }
  if (typeof extractedText !== "string" || extractedText.trim().length === 0) {
    validationErrors.push("`extractedText` is required and must be a non-empty string.");
  }
  if (validationErrors.length > 0) {
    return fail(validationErrors, 400);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
  const anthropic = new Anthropic({ apiKey: anthropicKey });

  // --- Call Anthropic -------------------------------------------------------
  let rawText: string;
  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 16000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: extractedText }],
    });
    rawText = firstTextBlock(message);
    console.log(
      `[${uploadId}] Anthropic responded: stop_reason=${message.stop_reason}, ` +
        `input_tokens=${message.usage.input_tokens}, output_tokens=${message.usage.output_tokens}`,
    );
    if (message.stop_reason === "max_tokens") {
      // Truncated output → JSON is almost certainly incomplete; the parse
      // step below will catch it and mark extraction_failed.
      console.error(`[${uploadId}] Response truncated at max_tokens.`);
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[${uploadId}] Anthropic API call failed:`, detail);
    await markStatus(supabase, uploadId, "extraction_failed");
    return fail([`Anthropic API error: ${detail}`], 502);
  }

  // --- Parse the model's JSON ----------------------------------------------
  // Claude sometimes wraps JSON in a markdown code fence (```json ... ```)
  // despite the "no markdown" instruction. Strip the fences before parsing.
  let result: ExtractionResult;
  try {
    const cleanedResponse = rawText
      .replace(/```json\n?/g, "") // remove opening ```json
      .replace(/```\n?/g, "") // remove closing ```
      .trim();
    result = normalizeResult(JSON.parse(cleanedResponse));
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(
      `[${uploadId}] Failed to parse model response as JSON: ${detail}\n` +
        `Raw response:\n${rawText}`,
    );
    await markStatus(supabase, uploadId, "extraction_failed");
    return fail(["Model response was not valid JSON.", detail], 422);
  }

  // --- Persist extracted data ----------------------------------------------
  const errors: string[] = [];

  if (result.concepts.length > 0) {
    const { error } = await supabase.from("concepts").insert(
      result.concepts.map((c) => ({
        upload_id: uploadId,
        name: c.name,
        definition: c.definition,
        cpalms_alignment: c.cpalms_alignment,
        prerequisites: c.prerequisites,
        difficulty_level: c.difficulty_level,
        examples: c.examples,
      })),
    );
    if (error) {
      console.error(`[${uploadId}] Failed to insert concepts:`, error.message);
      errors.push(`concepts: ${error.message}`);
    }
  }

  if (result.learning_objectives.length > 0) {
    const { error } = await supabase.from("learning_objectives").insert(
      result.learning_objectives.map((objective) => ({
        upload_id: uploadId,
        objective,
      })),
    );
    if (error) {
      console.error(`[${uploadId}] Failed to insert learning_objectives:`, error.message);
      errors.push(`learning_objectives: ${error.message}`);
    }
  }

  if (result.vocabulary.length > 0) {
    const { error } = await supabase.from("vocabulary").insert(
      result.vocabulary.map((v) => ({
        upload_id: uploadId,
        term: v.term,
        definition: v.definition,
        context: v.context,
      })),
    );
    if (error) {
      console.error(`[${uploadId}] Failed to insert vocabulary:`, error.message);
      errors.push(`vocabulary: ${error.message}`);
    }
  }

  // If any insert failed, the extraction is not fully persisted → mark failed.
  if (errors.length > 0) {
    await markStatus(supabase, uploadId, "extraction_failed");
    return respond(
      {
        success: false,
        conceptsCount: 0,
        vocabularyCount: 0,
        objectivesCount: 0,
        errors: ["Failed to persist extracted data.", ...errors],
      },
      500,
    );
  }

  // --- Mark upload as extracted --------------------------------------------
  await markStatus(supabase, uploadId, "extracted");

  console.log(
    `[${uploadId}] Extraction complete: ${result.concepts.length} concepts, ` +
      `${result.vocabulary.length} vocabulary terms, ` +
      `${result.learning_objectives.length} learning objectives.`,
  );

  return respond({
    success: true,
    conceptsCount: result.concepts.length,
    vocabularyCount: result.vocabulary.length,
    objectivesCount: result.learning_objectives.length,
  });
});

// ===========================================================================
// TESTING NOTES
// ===========================================================================
//
// 1. RUN LOCALLY
// ---------------------------------------------------------------------------
//   # Set the Anthropic key for the local runtime (SUPABASE_URL and
//   # SUPABASE_SERVICE_ROLE_KEY are provided automatically by `functions serve`):
//   export ANTHROPIC_API_KEY=sk-ant-...
//
//   # Serve the function (Deno runtime, hot-reload):
//   supabase functions serve extract-curriculum --env-file ./supabase/.env.local
//
//   # ...or without an env file, relying on the exported var:
//   supabase functions serve extract-curriculum
//
//   The local endpoint is:
//     http://localhost:54321/functions/v1/extract-curriculum
//
//   NOTE: The `uploadId` you pass must reference an existing row in
//   curriculum_uploads (teacher_id -> profiles.id), otherwise the status
//   update is a no-op and the concepts insert will fail the FK constraint.
//   Seed one first, e.g. via the SQL editor:
//     INSERT INTO curriculum_uploads (teacher_id, file_name, extracted_text, status)
//     VALUES ('<a-profiles-uuid>', 'sample.pdf', '<text>', 'pending')
//     RETURNING id;
//
// 2. EXAMPLE CURL REQUEST
// ---------------------------------------------------------------------------
//   curl -i -X POST \
//     http://localhost:54321/functions/v1/extract-curriculum \
//     -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
//     -H "Content-Type: application/json" \
//     -d '{
//       "uploadId": "00000000-0000-0000-0000-000000000000",
//       "extractedText": "Compound interest is interest calculated on the initial principal and also on the accumulated interest of previous periods. For example, $100 invested at 10% annually grows to $110 after year one, then $121 after year two. A budget is a plan for spending and saving money over a period of time."
//     }'
//
//   Against a deployed function, swap the host and use a real user JWT:
//     https://vcjdshippmqopaffuzbw.supabase.co/functions/v1/extract-curriculum
//
// 3. EXPECTED RESPONSE FORMAT
// ---------------------------------------------------------------------------
//   Success (HTTP 200):
//     {
//       "success": true,
//       "conceptsCount": 2,
//       "vocabularyCount": 3,
//       "objectivesCount": 1
//     }
//
//   Bad request — missing/invalid body (HTTP 400):
//     {
//       "success": false,
//       "conceptsCount": 0,
//       "vocabularyCount": 0,
//       "objectivesCount": 0,
//       "errors": ["`uploadId` is required and must be a non-empty string."]
//     }
//
//   Model returned non-JSON (HTTP 422) — curriculum_uploads.status set to
//   'extraction_failed', raw model output logged:
//     {
//       "success": false,
//       "conceptsCount": 0,
//       "vocabularyCount": 0,
//       "objectivesCount": 0,
//       "errors": ["Model response was not valid JSON.", "<parser detail>"]
//     }
//
//   Anthropic API failure (HTTP 502) — status set to 'extraction_failed':
//     { "success": false, ..., "errors": ["Anthropic API error: <detail>"] }
//
//   DB persistence failure (HTTP 500) — status set to 'extraction_failed':
//     { "success": false, ..., "errors": ["Failed to persist extracted data.", "..."] }
