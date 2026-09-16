// Supabase Edge Function: propose-split
//
// Layer 2 of the "Split into lessons" proposal. The client builds a page
// OUTLINE (per page: label, numbered headings found on it, a ~200-char
// snippet, an appendix cue) and sends it with the teacher's description of
// the chapter's structure. This function asks the model for titled groups of
// pages and returns them. It never sees full page text, so the call is small
// (a few thousand tokens for a 60-page manual).
//
// It runs only when the teacher wrote split instructions or the deterministic
// layer found no numbered structure; the teacher's edits always win and the
// proposal is never re-run over an edited split (client rule).
//
// Input:  { uploadId, instructions?: string,
//           outline: [{ chunkId, page, words, headings: [string], snippet, supplementaryCue }] }
// Output: { success, lessons: [{ title, chunkIds: [..], supplementary }], errors? }
//
// Auth: caller's JWT; the upload must belong to the caller; every chunkId
// must belong to the upload. Env: ANTHROPIC_API_KEY, SUPABASE_URL,
// SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY.
import Anthropic from "npm:@anthropic-ai/sdk@0.70.0";
import { createClient } from "npm:@supabase/supabase-js@2";
import { firstTextBlock, isRecord, MODEL, parseJsonObject } from "../_shared/grounding.ts";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface OutlinePage {
  chunkId: string;
  page: string;
  words: number;
  headings: string[];
  snippet: string;
  supplementaryCue: string | null;
}

interface Body {
  uploadId: string;
  instructions?: string;
  outline: OutlinePage[];
}

interface Lesson {
  title: string;
  chunkIds: string[];
  supplementary: boolean;
}

const MAX_PAGES = 400;
const MAX_INSTRUCTIONS = 2000;

const SYSTEM_PROMPT = `You split a teacher's uploaded chapter into lessons for high-school students. You are given an OUTLINE of the pages in order (page label, numbered headings found on the page, a short snippet, and any appendix cue), plus the teacher's description of the chapter's structure.

Rules:
- Group CONSECUTIVE pages into lessons. Every page id appears in exactly one lesson. Never reorder pages.
- Title each lesson with the real section heading from the outline (for example "2-2 Explain what capitalism is and how free markets work"). Never use page numbers or page ranges as a title.
- Follow the teacher's instructions for how to group and what to name; they take precedence over the headings.
- Appendix material (lecture enhancers, bonus cases, critical-thinking exercises, discussion questions, test banks, answer keys, "Connect" instructor material) goes in its own final lesson titled from its content (for example "Lecture enhancers and cases") with "supplementary": true, unless the teacher's instructions say to fold it into the sections it relates to.
- Aim for lessons of roughly 800 to 3,000 words; do not create a lesson for a lone cover or table-of-contents page (attach it to the first lesson).
- Return ONLY JSON: { "lessons": [ { "title": "...", "chunkIds": ["..."], "supplementary": false } ] }`;

function respond(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
}
const fail = (errors: string[], status: number) => respond({ success: false, errors }, status);

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return fail(["Use POST."], 405);

  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!anthropicKey || !supabaseUrl || !anonKey || !serviceRoleKey) return fail(["Server misconfiguration: missing env vars."], 500);

  // --- Who is calling? ------------------------------------------------------
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return fail(["Missing authorization header."], 401);
  const caller = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } });
  const { data: { user }, error: userErr } = await caller.auth.getUser();
  if (userErr || !user) return fail(["Unauthorized."], 401);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return fail(["Body must be JSON."], 400);
  }
  const uploadId = typeof body?.uploadId === "string" ? body.uploadId : "";
  if (!uploadId) return fail(["`uploadId` is required."], 400);
  const outline = Array.isArray(body.outline) ? body.outline.filter((p): p is OutlinePage => isRecord(p) && typeof p.chunkId === "string") : [];
  if (outline.length === 0) return fail(["`outline` must list the pages."], 400);
  if (outline.length > MAX_PAGES) return fail([`At most ${MAX_PAGES} pages per proposal.`], 400);
  const instructions = typeof body.instructions === "string" ? body.instructions.replace(/\s+/g, " ").trim().slice(0, MAX_INSTRUCTIONS) : "";
  const tag = `PS][${uploadId}`;

  // --- Ownership + chunk membership ---------------------------------------
  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const { data: upload } = await supabase.from("curriculum_uploads").select("teacher_id").eq("id", uploadId).maybeSingle();
  if (!upload || upload.teacher_id !== user.id) return fail(["Not your upload."], 403);
  const { data: chunkRows } = await supabase.from("curriculum_source_chunks").select("id").eq("upload_id", uploadId);
  const owned = new Set(((chunkRows ?? []) as { id: string }[]).map((r) => r.id));
  const ids = outline.map((p) => p.chunkId);
  if (ids.some((id) => !owned.has(id))) return fail(["The outline names pages that are not in this upload."], 400);

  // --- Ask the model (outline only, never page text) ----------------------
  const lines = outline.map((p, i) => {
    const heads = (p.headings ?? []).slice(0, 6).map((h) => String(h).slice(0, 120)).join(" | ");
    const snippet = String(p.snippet ?? "").replace(/\s+/g, " ").slice(0, 200);
    const cue = p.supplementaryCue ? ` [appendix cue: ${String(p.supplementaryCue).slice(0, 40)}]` : "";
    return `${i + 1}. id=${p.chunkId} ${p.page} (${Number(p.words) || 0} words)${cue}\n   headings: ${heads || "(none)"}\n   snippet: ${snippet}`;
  });
  const userMsg = `${instructions ? `TEACHER'S DESCRIPTION OF THE CHAPTER STRUCTURE:\n${instructions}\n\n` : ""}PAGE OUTLINE (in order):\n${lines.join("\n")}`;

  const anthropic = new Anthropic({ apiKey: anthropicKey });
  let parsed: Record<string, unknown>;
  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4000,
      temperature: 0,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMsg }],
    });
    const raw = firstTextBlock(message);
    console.log(`[${tag}] ${outline.length} pages, instructions=${instructions ? instructions.length + " chars" : "none"}; stop=${message.stop_reason}, in=${message.usage.input_tokens}, out=${message.usage.output_tokens}`);
    parsed = parseJsonObject(raw);
  } catch (err) {
    return fail([`Split proposal failed: ${err instanceof Error ? err.message : String(err)}`], 502);
  }

  // --- Validate: every page exactly once, in order; repair gaps ------------
  const rawLessons = Array.isArray(parsed.lessons) ? parsed.lessons.filter(isRecord) : [];
  const assigned = new Set<string>();
  const lessons: Lesson[] = [];
  for (const l of rawLessons) {
    const title = typeof l.title === "string" ? l.title.trim().slice(0, 120) : "";
    const chunkIds = Array.isArray(l.chunkIds) ? l.chunkIds.filter((x): x is string => typeof x === "string" && owned.has(x) && !assigned.has(x)) : [];
    if (!title || chunkIds.length === 0) continue;
    for (const id of chunkIds) assigned.add(id);
    lessons.push({ title, chunkIds, supplementary: l.supplementary === true });
  }
  if (lessons.length === 0) return fail(["The model returned no usable lessons."], 502);
  // Pages the model skipped join the nearest preceding lesson (or the first).
  const order = new Map(ids.map((id, i) => [id, i]));
  const lessonOfPage = new Map<string, number>();
  lessons.forEach((l, li) => l.chunkIds.forEach((id) => lessonOfPage.set(id, li)));
  for (const id of ids) {
    if (assigned.has(id)) continue;
    let target = 0;
    for (let i = (order.get(id) ?? 0) - 1; i >= 0; i--) {
      const prev = lessonOfPage.get(ids[i]);
      if (prev !== undefined) {
        target = prev;
        break;
      }
    }
    lessons[target].chunkIds.push(id);
    lessonOfPage.set(id, target);
    assigned.add(id);
  }
  for (const l of lessons) l.chunkIds.sort((a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0));
  lessons.sort((a, b) => (order.get(a.chunkIds[0]) ?? 0) - (order.get(b.chunkIds[0]) ?? 0));

  return respond({ success: true, lessons });
});
