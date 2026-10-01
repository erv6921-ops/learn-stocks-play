// Supabase Edge Function: generate-deck
//
// Builds a slide presentation from a teacher's lesson selection. Built-in
// lesson content is passed from the client; generated (UUID) lessons are read
// from public.lessons under the caller's RLS. Slides are grounded ONLY in the
// selected lessons - no invented facts.
//
// Input:  { title?, lessons: [{ id, title, unitTitle?, source, text? }] }
// Output: { success, deck: { version, kind:"deck", title, slides:[...] }, errors? }
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
  resolveLessons,
  buildSourceBlock,
  type LessonInput,
} from "../_shared/materials.ts";

const MAX_LESSONS = 12;

interface Body {
  title?: string;
  lessons?: LessonInput[];
}

// deno-lint-ignore no-explicit-any
type Rec = Record<string, any>;
const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const strArr = (v: unknown): string[] =>
  Array.isArray(v) ? v.map((x) => str(x)).filter(Boolean) : [];

const SLIDE_KINDS = ["agenda", "title", "content", "example", "check", "recap"] as const;
type SlideKind = (typeof SLIDE_KINDS)[number];
const asKind = (v: unknown): SlideKind =>
  (SLIDE_KINDS as readonly string[]).includes(str(v) as SlideKind) ? (str(v) as SlideKind) : "content";

function systemPrompt(): string {
  return `You are an expert high-school financial-literacy teacher building a slide presentation from lesson material a teacher selected.

GROUNDING RULES (critical):
- Use ONLY the facts, definitions, numbers, and examples in the SOURCE LESSONS below. Do NOT invent statistics, prices, dates, company names, or facts that are not present in the source.
- Every worked example must use the SAME real numbers found in the source. If the source has no numbers for a concept, build the example only from what is stated - do not fabricate figures.
- Keep it age-appropriate and clear.

STRUCTURE (follow exactly):
1. Start with ONE "agenda" slide listing what the class will cover (one bullet per lesson).
2. For EACH lesson, in order, produce:
   - ONE "title" slide (the lesson title as heading; 1-2 bullets framing why it matters).
   - 2 to 4 "content" slides teaching the key ideas (short bullets, one idea per slide).
   - ONE "example" slide with a worked example using real numbers from that lesson's source.
   - ONE "check" slide: a "Check for understanding" question (pose it; do NOT reveal the answer on the slide - put the answer in the speaker notes).
3. End with ONE "recap" slide summarizing the biggest takeaways across all lessons.

EVERY slide must include "notes": speaker notes the teacher reads aloud (2-4 sentences, grounded in the source). For a check slide, the notes MUST include the correct answer and a one-line explanation.

Keep bullets short (max ~12 words each), max 5 bullets per slide.

Return ONLY valid JSON (no markdown, no preamble):
{
  "title": "presentation title",
  "slides": [
    { "kind": "agenda|title|content|example|check|recap", "heading": "slide heading", "bullets": ["...", "..."], "notes": "speaker notes", "lessonTitle": "which lesson this belongs to (omit for agenda/recap)" }
  ]
}`;
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

  const input = Array.isArray(body.lessons) ? body.lessons.filter((l) => l && typeof l.id === "string") : [];
  if (input.length === 0) return fail(["Select at least one lesson."], 400);
  if (input.length > MAX_LESSONS) return fail([`Choose ${MAX_LESSONS} lessons or fewer for a presentation.`], 400);

  const lessons = await resolveLessons(caller, input);
  if (lessons.length === 0) return fail(["None of the selected lessons had usable content."], 422);

  const anthropic = new Anthropic({ apiKey: anthropicKey });
  const sourceBlock = buildSourceBlock(lessons);

  let parsed: Rec;
  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 16000,
      system: systemPrompt(),
      messages: [{ role: "user", content: `SOURCE LESSONS:\n\n${sourceBlock}` }],
    });
    const raw = firstTextBlock(message);
    console.log(`[DECK] user=${user.id} lessons=${lessons.length} stop=${message.stop_reason} chars=${raw.length}`);
    parsed = JSON.parse(stripFences(raw));
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[DECK] generation failed: ${detail}`);
    return fail([`Generation failed: ${detail}`], 502);
  }

  const rawSlides = Array.isArray(parsed.slides) ? parsed.slides : [];
  const slides = rawSlides
    .filter((s: Rec) => s && (str(s.heading) || strArr(s.bullets).length))
    .map((s: Rec, i: number) => ({
      id: `slide-${i}`,
      kind: asKind(s.kind),
      heading: str(s.heading) || "Slide",
      bullets: strArr(s.bullets).slice(0, 6),
      notes: str(s.notes),
      ...(str(s.lessonTitle) ? { lessonTitle: str(s.lessonTitle) } : {}),
    }));

  if (slides.length === 0) return fail(["The model returned no usable slides."], 502);

  const deck = {
    version: 1 as const,
    kind: "deck" as const,
    title: str(parsed.title) || str(body.title) || "Class presentation",
    slides,
  };

  return respond({ success: true, deck });
});
