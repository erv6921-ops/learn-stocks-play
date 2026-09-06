// Supabase Edge Function: check-mastery
//
// Authoritative mastery check for a curriculum lesson: mastery = the most recent
// answers form a streak of >= 7 correct in a row.
//
// Input:  { lessonId, userId }
// Output: { passed, readyForTheta, progress, streak, correctInLast10 }
//
// Runtime:  Deno (Supabase Edge Functions)
// Env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Project:  InvestiPlay (vcjdshippmqopaffuzbw)

import { createClient } from "npm:@supabase/supabase-js@2";

const MASTERY_STREAK = 7; // correct-in-a-row required to pass
const WINDOW = 10; // how many recent attempts we inspect

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Body {
  lessonId: string;
  userId: string;
}

function respond(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return respond({ error: "Use POST." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return respond({ error: "Server misconfiguration: missing env vars." }, 500);
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return respond({ error: "Body must be JSON." }, 400);
  }
  const { lessonId, userId } = body ?? {};
  if (!lessonId || !userId) {
    return respond({ error: "`lessonId` and `userId` are required." }, 400);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  // lesson_id is TEXT in question_attempts — match on the string form.
  const { data, error } = await supabase
    .from("question_attempts")
    .select("is_correct, created_at")
    .eq("user_id", userId)
    .eq("lesson_id", String(lessonId))
    .order("created_at", { ascending: false })
    .limit(WINDOW);

  if (error) {
    console.error(`[check-mastery] query failed:`, error.message);
    return respond({ error: error.message }, 500);
  }

  const attempts = (data ?? []) as { is_correct: boolean }[]; // newest first
  const correctInLast10 = attempts.filter((a) => a.is_correct).length;

  // Trailing streak: count consecutive correct starting from the most recent.
  let streak = 0;
  for (const a of attempts) {
    if (a.is_correct) streak++;
    else break;
  }
  const passed = streak >= MASTERY_STREAK;

  const result = {
    passed,
    readyForTheta: passed,
    progress: `${Math.min(streak, MASTERY_STREAK)}/${MASTERY_STREAK} correct in sequence`,
    streak,
    correctInLast10,
  };
  console.log(
    `[check-mastery] user=${userId} lesson=${lessonId} → streak=${streak} passed=${passed}`,
  );
  return respond(result);
});
