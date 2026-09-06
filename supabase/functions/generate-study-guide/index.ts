// Supabase Edge Function: generate-study-guide
//
// Builds a teacher-configured "extra practice" study guide from an upload's
// material: N multiple-choice questions + N scenarios + N short activities.
// Ungraded practice (no mastery gate). Stored in study_guides.content (JSONB).
//
// Input:  { uploadId, name, numQuestions, numScenarios, numActivities }
// Output: { success, studyGuideId, questionsGenerated, scenariosGenerated, activitiesGenerated, errors? }
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

interface Body {
  uploadId: string;
  name: string;
  numQuestions: number;
  numScenarios: number;
  numActivities: number;
}

function respond(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function firstTextBlock(m: Anthropic.Message): string {
  for (const b of m.content) if (b.type === "text") return b.text;
  return "";
}
const stripFences = (s: string) => s.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
const clampInt = (n: unknown, lo: number, hi: number, dflt: number): number => {
  const v = Math.round(Number(n));
  return Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : dflt;
};

function buildSystemPrompt(nq: number, ns: number, na: number): string {
  return `You are an educational content writer creating OPTIONAL extra-practice review material for high-school financial-literacy students. This is ungraded practice, not a required lesson.

Generate EXACTLY:
- ${nq} multiple-choice questions
- ${ns} scenarios
- ${na} activities

Definitions:
- A "question" is a multiple-choice question with exactly 4 options, one correct, and a short explanation.
- A "scenario" is a short realistic applied situation (a few sentences) followed by an open-ended reflection/response prompt the student writes about. It is NOT multiple choice.
- An "activity" is a brief hands-on APPLICATION task the student completes in a sentence or two — e.g. "Write a one-week budget for a $60 allowance" or "List two questions you'd ask before taking out a loan." It is a doing task, distinct from a scenario (which is read-and-reflect) and from a question (which is multiple choice).

Base everything strictly on the provided material. Age-appropriate, clear, plausible distractors.

Return ONLY valid JSON (no markdown, no preamble):
{
  "questions": [ { "question": "text", "options": ["a","b","c","d"], "correctIndex": 0, "explanation": "why" } ],
  "scenarios": [ { "title": "text", "narrative": "text", "prompt": "reflection question" } ],
  "activities": [ { "title": "text", "task": "what the student should do" } ]
}`;
}

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
  const uploadId = body?.uploadId;
  const name = (body?.name ?? "").trim() || "Extra practice";
  const numQuestions = clampInt(body?.numQuestions, 0, 30, 10);
  const numScenarios = clampInt(body?.numScenarios, 0, 10, 2);
  const numActivities = clampInt(body?.numActivities, 0, 10, 1);
  if (!uploadId) return respond({ success: false, errors: ["`uploadId` is required."] }, 400);
  if (numQuestions + numScenarios + numActivities === 0) {
    return respond({ success: false, errors: ["Request at least one item."] }, 400);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const anthropic = new Anthropic({ apiKey: anthropicKey });

  // Load source material + owning teacher.
  const [uploadRes, conceptsRes, vocabRes, objRes] = await Promise.all([
    supabase.from("curriculum_uploads").select("teacher_id, extracted_text").eq("id", uploadId).single(),
    supabase.from("concepts").select("name, definition, examples").eq("upload_id", uploadId).order("created_at", { ascending: true }),
    supabase.from("vocabulary").select("term, definition").eq("upload_id", uploadId),
    supabase.from("learning_objectives").select("objective").eq("upload_id", uploadId),
  ]);
  if (uploadRes.error || !uploadRes.data) {
    return respond({ success: false, errors: ["Upload not found."] }, 404);
  }
  const teacherId = uploadRes.data.teacher_id as string;
  const extractedText = (uploadRes.data.extracted_text ?? "") as string;
  const concepts = (conceptsRes.data ?? []) as { name: string; definition: string; examples: string[] | null }[];
  const vocabulary = (vocabRes.data ?? []) as { term: string; definition: string }[];
  const objectives = (objRes.data ?? []) as { objective: string }[];

  const material = [
    `OBJECTIVES:\n${objectives.map((o) => `- ${o.objective}`).join("\n") || "(none)"}`,
    `CONCEPTS:\n${concepts.map((c) => `- ${c.name}: ${c.definition}${c.examples?.length ? ` (e.g. ${c.examples.join("; ")})` : ""}`).join("\n") || "(none)"}`,
    `VOCABULARY:\n${vocabulary.map((v) => `- ${v.term}: ${v.definition}`).join("\n") || "(none)"}`,
    `SOURCE TEXT (excerpt):\n${extractedText.slice(0, 6000)}`,
  ].join("\n\n");

  let parsed: {
    questions?: { question: string; options: string[]; correctIndex: number; explanation: string }[];
    scenarios?: { title: string; narrative: string; prompt: string }[];
    activities?: { title: string; task: string }[];
  };
  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 8000,
      system: buildSystemPrompt(numQuestions, numScenarios, numActivities),
      messages: [{ role: "user", content: material }],
    });
    const raw = firstTextBlock(message);
    console.log(`[SG] upload=${uploadId} stop=${message.stop_reason} chars=${raw.length}`);
    parsed = JSON.parse(stripFences(raw));
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[SG] generation failed: ${detail}`);
    return respond({ success: false, errors: [`Generation failed: ${detail}`] }, 502);
  }

  // Normalize/trim to requested counts.
  const questions = (Array.isArray(parsed.questions) ? parsed.questions : [])
    .filter((q) => q && typeof q.question === "string" && Array.isArray(q.options) && q.options.length >= 2)
    .slice(0, numQuestions)
    .map((q, i) => ({
      id: `q-${i}`,
      question: q.question,
      options: q.options.slice(0, 4),
      correctIndex: clampInt(q.correctIndex, 0, q.options.length - 1, 0),
      explanation: typeof q.explanation === "string" ? q.explanation : "",
    }));
  const scenarios = (Array.isArray(parsed.scenarios) ? parsed.scenarios : [])
    .filter((s) => s && typeof s.narrative === "string")
    .slice(0, numScenarios)
    .map((s, i) => ({ id: `s-${i}`, title: s.title ?? `Scenario ${i + 1}`, narrative: s.narrative, prompt: s.prompt ?? "" }));
  const activities = (Array.isArray(parsed.activities) ? parsed.activities : [])
    .filter((a) => a && typeof a.task === "string")
    .slice(0, numActivities)
    .map((a, i) => ({ id: `a-${i}`, title: a.title ?? `Activity ${i + 1}`, task: a.task }));

  const content = { version: 1, questions, scenarios, activities };

  const { data: inserted, error: insErr } = await supabase
    .from("study_guides")
    .insert({ upload_id: uploadId, teacher_id: teacherId, name, content })
    .select("id")
    .single();
  if (insErr || !inserted?.id) {
    console.error(`[SG] insert failed: ${insErr?.message}`);
    return respond({ success: false, errors: [`Could not save study guide: ${insErr?.message}`] }, 500);
  }

  return respond({
    success: true,
    studyGuideId: inserted.id,
    questionsGenerated: questions.length,
    scenariosGenerated: scenarios.length,
    activitiesGenerated: activities.length,
  });
});
