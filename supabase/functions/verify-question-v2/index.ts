// Supabase Edge Function: verify-question-v2
//
// Re-verifies ONE generated question against its upload's source chunks after
// a teacher edits it. Runs the same deterministic quote check + strict Claude
// support check as generation, saves the edited content with the new
// grounding_status / source_chunk_ids, and clears teacher approval so the
// teacher must approve the edited version explicitly.
//
// Auth: the caller's JWT. The caller must own the upload the question belongs
// to (curriculum_uploads.teacher_id = caller), otherwise 403.
//
// Input:  { questionId, question_text?, options?, correct_answer?, explanation?, evidence_quote? }
//         Omitted fields keep their stored value.
// Output: { success, grounding_status, reason, source_chunk_ids, pages, errors? }
// Writes: generated_questions (update one row)
//
// Runtime:  Deno (Supabase Edge Functions)
// Env vars: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
// Project:  InvestiPlay (vcjdshippmqopaffuzbw)

import Anthropic from "npm:@anthropic-ai/sdk@0.70.0";
import { createClient } from "npm:@supabase/supabase-js@2";
import {
  buildSourceBlock,
  checkQuote,
  chunkLabel,
  loadChunks,
  usableChunks,
  verifySupport,
} from "../_shared/grounding.ts";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Body {
  questionId: string;
  question_text?: string;
  options?: string[];
  correct_answer?: string;
  explanation?: string;
  evidence_quote?: string;
}

interface QuestionRow {
  id: string;
  upload_id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string | null;
  evidence_quote: string | null;
}

function respond(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

const str = (v: unknown): string | undefined => (typeof v === "string" ? v.trim() : undefined);

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return respond({ success: false, errors: ["Use POST."] }, 405);

  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!anthropicKey || !supabaseUrl || !anonKey || !serviceRoleKey) {
    return respond({ success: false, errors: ["Server misconfiguration: missing env vars."] }, 500);
  }

  // --- Who is calling? ------------------------------------------------------
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return respond({ success: false, errors: ["Missing authorization header."] }, 401);
  const caller = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });
  const { data: { user }, error: userErr } = await caller.auth.getUser();
  if (userErr || !user) return respond({ success: false, errors: ["Unauthorized."] }, 401);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return respond({ success: false, errors: ["Body must be JSON."] }, 400);
  }
  const questionId = str(body?.questionId);
  if (!questionId) return respond({ success: false, errors: ["`questionId` is required."] }, 400);
  const tag = `VQv2][${questionId}`;

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const anthropic = new Anthropic({ apiKey: anthropicKey });

  // --- Load the row and check ownership --------------------------------------
  const { data: qData, error: qErr } = await supabase
    .from("generated_questions")
    .select("id, upload_id, question_text, options, correct_answer, explanation, evidence_quote")
    .eq("id", questionId)
    .maybeSingle();
  if (qErr) return respond({ success: false, errors: [`Load question: ${qErr.message}`] }, 500);
  if (!qData) return respond({ success: false, errors: ["Question not found."] }, 404);
  const row = qData as QuestionRow;

  const { data: upload } = await supabase
    .from("curriculum_uploads")
    .select("teacher_id")
    .eq("id", row.upload_id)
    .maybeSingle();
  if (!upload || upload.teacher_id !== user.id) {
    return respond({ success: false, errors: ["You can only edit questions on your own uploads."] }, 403);
  }

  // --- Merge edits ----------------------------------------------------------
  const options = Array.isArray(body.options)
    ? body.options.filter((o): o is string => typeof o === "string").map((o) => o.trim()).filter(Boolean)
    : row.options;
  const question_text = str(body.question_text) ?? row.question_text;
  const explanation = str(body.explanation) ?? row.explanation ?? "";
  let correct_answer = str(body.correct_answer) ?? row.correct_answer;
  const evidence_quote = str(body.evidence_quote) ?? row.evidence_quote ?? "";

  if (!question_text || options.length < 2) {
    return respond({ success: false, errors: ["A question needs text and at least two options."] }, 400);
  }
  if (!options.includes(correct_answer)) {
    const m = correct_answer.match(/^([A-Fa-f])[).:\s]?$/);
    const idx = m ? "ABCDEF".indexOf(m[1].toUpperCase()) : -1;
    if (idx >= 0 && idx < options.length) correct_answer = options[idx];
    else return respond({ success: false, errors: ["`correct_answer` must match one of the options."] }, 400);
  }

  // --- Verify against the upload's (non-trashed) source chunks --------------
  let grounding_status: "verified" | "failed" = "failed";
  let reason = "";
  let chunkIds: string[] = [];
  let pages: string[] = [];
  try {
    const allChunks = await loadChunks(supabase, row.upload_id);
    const chunks = usableChunks(allChunks);
    if (chunks.length === 0) {
      reason = "This upload has no source pages to verify against.";
    } else if (!evidence_quote) {
      reason = "No evidence quote. Paste the exact sentence from your material that makes the answer true.";
    } else {
      const block = buildSourceBlock(chunks);
      // Search every chunk: the teacher may have pasted a quote from any page.
      const q = checkQuote({ source_ids: [], evidence_quote }, block);
      chunkIds = q.chunkIds;
      if (!q.ok) {
        reason = "The evidence quote was not found in your uploaded material (it must match the text word for word).";
      } else {
        const [verdict] = await verifySupport(
          [{
            id: row.id,
            claim: `Question: ${question_text}\nCorrect answer: ${correct_answer}\nExplanation: ${explanation}`,
            evidence_quote,
          }],
          block.text,
          anthropic,
        );
        if (verdict?.supported) {
          grounding_status = "verified";
        } else {
          reason = `The quote does not fully support the answer and explanation: ${verdict?.reason ?? "no verdict"}`;
        }
      }
      pages = chunkIds
        .map((id) => chunks.find((c) => c.id === id))
        .filter((c): c is NonNullable<typeof c> => !!c)
        .map(chunkLabel);
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[${tag}] verification error: ${detail}`);
    return respond({ success: false, errors: [`Verification failed: ${detail}`] }, 502);
  }

  // --- Save: edited content, new grounding, approval cleared ----------------
  const { error: updErr } = await supabase
    .from("generated_questions")
    .update({
      question_text,
      options,
      correct_answer,
      explanation,
      evidence_quote: evidence_quote || null,
      source_chunk_ids: chunkIds.length ? chunkIds : null,
      grounding_status,
      teacher_approved_at: null,
      teacher_approved_by: null,
    })
    .eq("id", row.id);
  if (updErr) {
    console.error(`[${tag}] update failed: ${updErr.message}`);
    return respond({ success: false, errors: [`Could not save the question: ${updErr.message}`] }, 500);
  }

  console.log(`[${tag}] user=${user.id} -> ${grounding_status}${reason ? ` (${reason})` : ""}`);
  return respond({ success: true, grounding_status, reason, source_chunk_ids: chunkIds, pages });
});
