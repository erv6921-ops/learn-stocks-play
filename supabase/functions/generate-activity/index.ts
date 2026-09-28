// Supabase Edge Function: generate-activity
//
// Builds a printable class activity from a teacher's lesson selection, in one
// of three formats. Built-in lesson content is passed from the client;
// generated (UUID) lessons are read from public.lessons under the caller's RLS.
// Grounded ONLY in the selected lessons - no invented facts.
//
// Input:  { title?, format: "team-challenge"|"decision-cards"|"exit-ticket",
//           lessons: [{ id, title, unitTitle?, source, text? }] }
// Output: { success, activity: { version, kind:"activity", format, title,
//           teacherInstructions, timingMinutes, body }, errors? }
//
// Runtime:  Deno (Supabase Edge Functions)
// Env vars: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY
// Project:  InvestiPlay (vcjdshippmqopaffuzbw)

import { createClient } from "npm:@supabase/supabase-js@2";
import {
  Anthropic,
  MODEL,
  CORS_HEADERS,
  respond,
  fail,
  firstTextBlock,
  stripFences,
  clampInt,
  resolveLessons,
  buildSourceBlock,
  type LessonInput,
} from "../_shared/materials.ts";

const MAX_LESSONS = 12;
const FORMATS = ["team-challenge", "decision-cards", "exit-ticket"] as const;
type Format = (typeof FORMATS)[number];

interface Body {
  title?: string;
  format?: string;
  lessons?: LessonInput[];
}

// deno-lint-ignore no-explicit-any
type Rec = Record<string, any>;
const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const strArr = (v: unknown): string[] =>
  Array.isArray(v) ? v.map((x) => str(x)).filter(Boolean) : [];

const SHARED_RULES = `GROUNDING RULES (critical):
- Use ONLY the facts, definitions, numbers, and examples in the SOURCE LESSONS below. Do NOT invent statistics, prices, or facts not present in the source.
- Any scenario with money must use realistic numbers consistent with the source.
- Age-appropriate for high-school students; clear and concrete.`;

function systemPrompt(format: Format): string {
  const base = `You are an expert high-school financial-literacy teacher creating a printable class activity from lesson material a teacher selected.\n\n${SHARED_RULES}\n\nAlways include:
- "title": a short activity title.
- "timingMinutes": realistic minutes to run the whole activity (integer).
- "teacherInstructions": an array of short strings covering timing, grouping, and how to run it (and where relevant, how to use the answer key).\n\n`;

  if (format === "team-challenge") {
    return base + `FORMAT: Team challenge. Groups of students work a realistic scenario, complete tasks, then share out.
Return ONLY valid JSON (no markdown, no preamble):
{
  "title": "...",
  "timingMinutes": 30,
  "teacherInstructions": ["Group students into 3-4 per team.", "..."],
  "body": {
    "format": "team-challenge",
    "scenario": "A realistic scenario with real numbers from the source (a full paragraph).",
    "tasks": ["Task 1 the team completes", "Task 2", "..."],
    "shareOut": "How teams present their answer to the class."
  }
}`;
  }
  if (format === "decision-cards") {
    return base + `FORMAT: Decision cards. 6 to 10 "would you rather" money dilemmas for class debate. Each is a genuine trade-off grounded in the lessons (no obviously-right answer).
Return ONLY valid JSON (no markdown, no preamble):
{
  "title": "...",
  "timingMinutes": 25,
  "teacherInstructions": ["Read one card at a time; have students pick a side and defend it.", "..."],
  "body": {
    "format": "decision-cards",
    "cards": [
      { "prompt": "Would you rather...", "optionA": "Option A", "optionB": "Option B", "discussion": ["Prompt to spark debate", "..."] }
    ]
  }
}`;
  }
  return base + `FORMAT: Exit ticket. Exactly 5 short questions that check understanding, each with a clear answer for the answer key.
Return ONLY valid JSON (no markdown, no preamble):
{
  "title": "...",
  "timingMinutes": 10,
  "teacherInstructions": ["Give students 8-10 minutes at the end of class.", "Answer key is included below.", "..."],
  "body": {
    "format": "exit-ticket",
    "questions": [ { "question": "...", "answer": "the correct answer for the key" } ]
  }
}`;
}

function normalizeBody(format: Format, raw: Rec): Rec | null {
  const b = (raw && typeof raw === "object" ? raw : {}) as Rec;
  if (format === "team-challenge") {
    const scenario = str(b.scenario);
    const tasks = strArr(b.tasks);
    if (!scenario || tasks.length === 0) return null;
    return { format, scenario, tasks: tasks.slice(0, 12), shareOut: str(b.shareOut) };
  }
  if (format === "decision-cards") {
    const cards = (Array.isArray(b.cards) ? b.cards : [])
      .map((c: Rec) => ({
        prompt: str(c.prompt),
        optionA: str(c.optionA),
        optionB: str(c.optionB),
        discussion: strArr(c.discussion).slice(0, 5),
      }))
      .filter((c: Rec) => c.prompt && c.optionA && c.optionB)
      .slice(0, 10);
    if (cards.length < 3) return null;
    return { format, cards };
  }
  // exit-ticket
  const questions = (Array.isArray(b.questions) ? b.questions : [])
    .map((q: Rec) => ({ question: str(q.question), answer: str(q.answer) }))
    .filter((q: Rec) => q.question)
    .slice(0, 10);
  if (questions.length === 0) return null;
  return { format, questions };
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return fail(["Use POST."], 405);

  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!anthropicKey || !supabaseUrl || !anonKey) {
    return fail(["Server misconfiguration: missing env vars."], 500);
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return fail(["Missing authorization header."], 401);
  const caller = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });
  const { data: { user }, error: userErr } = await caller.auth.getUser();
  if (userErr || !user) return fail(["Unauthorized."], 401);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return fail(["Body must be JSON."], 400);
  }

  const format = (FORMATS as readonly string[]).includes(str(body.format)) ? (str(body.format) as Format) : null;
  if (!format) return fail(["`format` must be team-challenge, decision-cards, or exit-ticket."], 400);

  const input = Array.isArray(body.lessons) ? body.lessons.filter((l) => l && typeof l.id === "string") : [];
  if (input.length === 0) return fail(["Select at least one lesson."], 400);
  if (input.length > MAX_LESSONS) return fail([`Choose ${MAX_LESSONS} lessons or fewer for an activity.`], 400);

  const lessons = await resolveLessons(caller, input);
  if (lessons.length === 0) return fail(["None of the selected lessons had usable content."], 422);

  const anthropic = new Anthropic({ apiKey: anthropicKey });
  const sourceBlock = buildSourceBlock(lessons);

  let parsed: Rec;
  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 12000,
      system: systemPrompt(format),
      messages: [{ role: "user", content: `SOURCE LESSONS:\n\n${sourceBlock}` }],
    });
    const rawText = firstTextBlock(message);
    console.log(`[ACTIVITY] user=${user.id} format=${format} lessons=${lessons.length} stop=${message.stop_reason} chars=${rawText.length}`);
    parsed = JSON.parse(stripFences(rawText));
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[ACTIVITY] generation failed: ${detail}`);
    return fail([`Generation failed: ${detail}`], 502);
  }

  const normBody = normalizeBody(format, parsed.body);
  if (!normBody) return fail(["The model returned an incomplete activity. Try again."], 502);

  const activity = {
    version: 1 as const,
    kind: "activity" as const,
    format,
    title: str(parsed.title) || str(body.title) || "Class activity",
    teacherInstructions: strArr(parsed.teacherInstructions),
    timingMinutes: clampInt(parsed.timingMinutes, 5, 120, 20),
    body: normBody,
  };

  return respond({ success: true, activity });
});
