// mastery-score — computes a Mastery Confidence Score (MCS) for one student
// on one topic, from the question_attempts of the session that just
// completed, plus daily_game_completions for streak context. Writes the
// result to mastery_scores using the service-role key (students have no
// insert/update policy on that table by design — a client can never write
// its own confidence tier).
//
// Internal name only: "Mastery Engine" / "mastery confidence" / "content
// pacing." Do not introduce prediction/risk/engagement-detection language
// anywhere in this file, in logs, or in anything it writes to the DB —
// that framing is a product and legal requirement, not a style choice.
//
// Invocation: called by the client immediately after a lesson mastery
// check, unit test, or benchmark session completes (event-driven, not a
// scheduled job — the whole point is that "what's next" reflects the
// session the student JUST finished, not a stale batch run).
//
// ─────────────────────────────────────────────────────────────────────────
// THE FORMULA — read this before changing any number below.
//
//   MCS = w1*accuracy + w2*latency_factor + w3*retry_factor + w4*streak_factor
//
// All four components and the final MCS are on a 0–100 scale, so the
// weights are directly interpretable as "how many of the 100 points can
// this signal contribute."
//
// WEIGHTS
//   w1 accuracy       = 0.55  Correctness is what the tier decision is
//                              fundamentally about — everything else only
//                              exists to tell apart two students who got
//                              the SAME accuracy. It must stay the largest
//                              single term or the score stops measuring
//                              mastery and starts measuring test-taking
//                              style.
//   w2 latency_factor = 0.20  Fast + correct reads as recalled/fluent;
//                              slow + correct reads as effortfully worked
//                              out. Equal weight to retry_factor — both are
//                              "how clean was the path to correct," just
//                              measured on different axes (time vs. tries).
//   w3 retry_factor   = 0.20  First-try-correct is stronger evidence of
//                              mastery than correct-after-restarting the
//                              whole set. Only meaningful once accuracy is
//                              reasonable, hence the accuracy floors below.
//   w4 streak_factor  = 0.05  Intentionally small. A broken daily-game
//                              streak is a mild engagement signal, not
//                              evidence the student doesn't understand
//                              THIS topic — it must never be able to move
//                              a student more than a few points on its own.
//   Sum: 0.55 + 0.20 + 0.20 + 0.05 = 1.00
//
// WHY THESE WEIGHTS WORK (the property that matters most): because w1 is
// only 0.55, even a student with PERFECT latency/retry/streak (45 points
// max from those three combined) needs roughly 73%+ accuracy just to reach
// the high_confidence floor (85). The weights themselves keep speed/streak
// from ever substituting for actually knowing the material — no separate
// ceiling rule is needed for that direction.
//
// The other direction — very low accuracy propped up by great secondary
// signals — is NOT self-correcting from the weights alone (25% accuracy +
// perfect everything else still composites to ~58, which would read as
// fragile_confidence rather than needs_support). That asymmetry is why the
// two hard floors below exist; they are not arbitrary, they close a
// specific gap the weighted formula leaves open.
//
// HARD FLOORS (override the weighted formula; documented separately
// because they are guardrails, not part of the composite)
//   accuracy < 30  -> forced needs_support, full stop.
//                      Below three-in-ten correct, no combination of speed,
//                      first-try answers, or an active streak should ever
//                      read as "doing fine" — that would defeat the point
//                      of the feature.
//   accuracy < 50  -> capped at fragile_confidence at best, even if the
//                      weighted MCS would clear the moderate_confidence
//                      threshold. Getting under half the questions right
//                      is not "advance with one reinforcement question"
//                      territory no matter how fast or clean the attempt
//                      was.
//
// CONFIDENCE TIER THRESHOLDS (0–100 MCS scale, after floors are applied)
//   >= 85          high_confidence       Strong accuracy AND clean/fast
//                                        path to it. Reserved for students
//                                        the secondary signals actively
//                                        confirm, not just pass.
//   65 – 84.999    moderate_confidence   Solid, including students who
//                                        cleared their mastery check
//                                        cleanly but weren't exceptionally
//                                        fast, or needed one restart.
//   45 – 64.999    fragile_confidence    Accuracy alone may look passing,
//                                        but the path there (slow, several
//                                        restarts, or the accuracy floor
//                                        above) says the mastery isn't
//                                        solid yet.
//   < 45           needs_support         Composite is weak even before the
//                                        hard floors are considered.
// ─────────────────────────────────────────────────────────────────────────
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── weights (see rationale block above) ──
const WEIGHTS = { accuracy: 0.55, latency: 0.20, retry: 0.20, streak: 0.05 } as const;

// ── tier thresholds, evaluated top-down on the post-floor MCS ──
const TIERS: { min: number; tier: string }[] = [
  { min: 85, tier: "high_confidence" },
  { min: 65, tier: "moderate_confidence" },
  { min: 45, tier: "fragile_confidence" },
  { min: 0, tier: "needs_support" },
];

const ACCURACY_HARD_FLOOR = 30; // below this: forced needs_support
const ACCURACY_SOFT_FLOOR = 50; // below this: capped at fragile_confidence

const VALID_SOURCES = ["lesson_quiz", "unit_test", "benchmark"] as const;
type Source = (typeof VALID_SOURCES)[number];

interface QuestionAttemptRow {
  question_id: string;
  is_correct: boolean;
  response_time_ms: number | null;
  session_attempt_number: number;
}

/**
 * Latency sub-score for one correctly-answered question, from the ratio of
 * this student's response time to that question's population median.
 * Piecewise-linear on purpose — every breakpoint is a plain number anyone
 * can eyeball and re-tune, no curve-fitting to explain later.
 *   ratio <= 0.5  -> 100  (twice as fast as peers or faster)
 *   ratio == 1.0  ->  75  (right at the peer median — not penalized, not
 *                          rewarded; "typical pace" is a fine outcome)
 *   ratio == 2.0  ->  25  (twice as slow as peers — floor, not zero: a
 *                          slow-but-correct answer is still real evidence
 *                          of some mastery, just fragile evidence)
 *   ratio  > 2.0  ->  25  (floor holds)
 */
function latencyScore(ratio: number): number {
  if (ratio <= 0.5) return 100;
  if (ratio <= 1.0) return 100 - (ratio - 0.5) * 50;
  if (ratio <= 2.0) return 75 - (ratio - 1.0) * 50;
  return 25;
}

/**
 * Retry sub-score from restart count (session_attempt_number - 1). A
 * lookup table, not a formula — restart counts are small integers and a
 * table is the most transparent way to state "first try beats one retry
 * beats three retries" without hiding the relative gaps in an equation.
 * Floor is 10, not 0: eventually getting it right still counts for
 * something over never getting it right at all.
 */
function retryScore(restarts: number): number {
  if (restarts <= 0) return 100;
  if (restarts === 1) return 60;
  if (restarts === 2) return 30;
  return 10;
}

/**
 * Streak sub-score. Deliberately coarse (three bands, not a smooth curve)
 * because this is the 0.05-weight tiebreaker signal, not something worth
 * over-engineering. "Active" means the student played a daily game today
 * OR yesterday — a same-day-only check would let the time of day the
 * scoring function happens to run flip the classification, which isn't a
 * real behavioral difference.
 */
function streakScore(active: boolean, lengthDays: number): number {
  if (!active) return lengthDays > 0 ? 30 : 50; // 30 = recently broken, 50 = no streak history at all (neutral, not penalized)
  return Math.min(100, 70 + Math.max(0, lengthDays - 1) * 2);
}

function computeStreak(gameDates: string[]): { active: boolean; length: number } {
  if (gameDates.length === 0) return { active: false, length: 0 };
  const days = new Set(gameDates); // "YYYY-MM-DD" strings from daily_game_completions.game_date
  const toKey = (d: Date) => d.toISOString().slice(0, 10);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  const active = days.has(toKey(today)) || days.has(toKey(yesterday));
  if (!active) {
    // Streak lapsed — report how long it WAS, for the "recently broken" band.
    let cursor = new Date(yesterday);
    let length = 0;
    while (days.has(toKey(cursor))) {
      length++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    return { active: false, length };
  }

  let cursor = days.has(toKey(today)) ? new Date(today) : new Date(yesterday);
  let length = 0;
  while (days.has(toKey(cursor))) {
    length++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return { active: true, length };
}

function tierFor(rawMcs: number, accuracy: number): { tier: string; overrides: string[] } {
  const overrides: string[] = [];
  if (accuracy < ACCURACY_HARD_FLOOR) {
    overrides.push(`hard_floor: accuracy ${accuracy.toFixed(1)} < ${ACCURACY_HARD_FLOOR}`);
    return { tier: "needs_support", overrides };
  }
  let tier = TIERS.find(t => rawMcs >= t.min)!.tier;
  if (accuracy < ACCURACY_SOFT_FLOOR && tier !== "needs_support") {
    overrides.push(`soft_floor: accuracy ${accuracy.toFixed(1)} < ${ACCURACY_SOFT_FLOOR}, capped at fragile_confidence`);
    tier = "fragile_confidence";
  }
  return { tier, overrides };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const authHeader = req.headers.get("Authorization") ?? "";

    // Identify the caller from their OWN JWT — user_id is never accepted
    // from the request body, so there's no way to trigger scoring "on
    // behalf of" another student.
    const authClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await authClient.auth.getUser();
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = userData.user.id;

    const body = await req.json();
    const topicId = typeof body.topicId === "string" ? body.topicId.slice(0, 200) : "";
    const attemptSessionId = typeof body.attemptSessionId === "string" ? body.attemptSessionId : "";
    const source = VALID_SOURCES.includes(body.source) ? (body.source as Source) : null;
    if (!topicId || !attemptSessionId || !source) {
      return new Response(JSON.stringify({ error: "topicId, attemptSessionId, and a valid source are required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Service-role client for all data access from here on — question_attempts
    // RLS would allow reading the caller's own rows anyway, but mastery_scores
    // has no student write policy at all, so this client is required for the
    // final insert regardless.
    const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // ── 1. Pull the just-completed session's question attempts ──
    const { data: sessionRows, error: sessionErr } = await db
      .from("question_attempts")
      .select("question_id, is_correct, response_time_ms, session_attempt_number")
      .eq("user_id", userId)
      .eq("topic_id", topicId)
      .eq("attempt_session_id", attemptSessionId);
    if (sessionErr) throw sessionErr;
    const rows = (sessionRows ?? []) as QuestionAttemptRow[];
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "No question_attempts found for that session" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── accuracy ──
    const correctCount = rows.filter(r => r.is_correct).length;
    const accuracy = (correctCount / rows.length) * 100;

    // ── latency_factor: per-question ratio against that question's
    //    population median, averaged over CORRECTLY answered questions
    //    only (see file header — measuring "how fast were you wrong"
    //    isn't a useful confidence signal; accuracy already captures
    //    wrongness). Cold-start: a question with no population data yet
    //    (or this student's own time missing) contributes a neutral 75,
    //    not a penalty. ──
    const correctWithTiming = rows.filter(r => r.is_correct && r.response_time_ms != null);
    let latencyFactor = 50; // neutral default when nothing correct was timed
    let avgRatio: number | null = null;
    if (correctWithTiming.length > 0) {
      const questionIds = [...new Set(correctWithTiming.map(r => r.question_id))];
      const { data: medianRows, error: medianErr } = await db.rpc("question_median_response_ms", {
        _question_ids: questionIds,
      });
      if (medianErr) throw medianErr;
      const medianByQuestion = new Map<string, number>(
        (medianRows ?? []).map((r: { question_id: string; median_ms: number }) => [r.question_id, r.median_ms])
      );
      const perQuestionScores: number[] = [];
      const ratios: number[] = [];
      for (const r of correctWithTiming) {
        const median = medianByQuestion.get(r.question_id);
        if (!median || median <= 0) {
          perQuestionScores.push(75); // cold start: no population data for this question yet
          continue;
        }
        const ratio = r.response_time_ms! / median;
        ratios.push(ratio);
        perQuestionScores.push(latencyScore(ratio));
      }
      latencyFactor = perQuestionScores.reduce((s, v) => s + v, 0) / perQuestionScores.length;
      if (ratios.length > 0) avgRatio = ratios.reduce((s, v) => s + v, 0) / ratios.length;
    }

    // ── retry_factor: restarts = session_attempt_number - 1. Every row in
    //    one session shares the same session_attempt_number by construction. ──
    const sessionAttemptNumber = rows[0].session_attempt_number;
    const restarts = Math.max(0, sessionAttemptNumber - 1);
    const retryFactor = retryScore(restarts);

    // ── streak_factor ──
    const { data: gameRows, error: gameErr } = await db
      .from("daily_game_completions")
      .select("game_date")
      .eq("user_id", userId);
    if (gameErr) throw gameErr;
    const streak = computeStreak((gameRows ?? []).map((r: { game_date: string }) => r.game_date));
    const streakFactor = streakScore(streak.active, streak.length);

    // ── composite ──
    const rawMcs =
      WEIGHTS.accuracy * accuracy +
      WEIGHTS.latency * latencyFactor +
      WEIGHTS.retry * retryFactor +
      WEIGHTS.streak * streakFactor;
    const { tier, overrides } = tierFor(rawMcs, accuracy);
    const mcsScore = Math.round(rawMcs * 100) / 100;

    const contributingSignals = {
      accuracy: { score: Math.round(accuracy * 100) / 100, correct: correctCount, total: rows.length },
      latency_factor: { score: Math.round(latencyFactor * 100) / 100, avg_ratio: avgRatio, questions_scored: correctWithTiming.length },
      retry_factor: { score: retryFactor, restarts, session_attempt_number: sessionAttemptNumber },
      streak_factor: { score: streakFactor, active: streak.active, length_days: streak.length },
      weights: WEIGHTS,
      overrides_applied: overrides,
      source,
      attempt_session_id: attemptSessionId,
    };

    // ── write (service role — bypasses RLS; mastery_scores has no
    //    student insert policy on purpose) ──
    const { error: insertErr } = await db.from("mastery_scores").insert({
      user_id: userId,
      topic_id: topicId,
      mcs_score: mcsScore,
      confidence_tier: tier,
      contributing_signals: contributingSignals,
    });
    if (insertErr) throw insertErr;

    return new Response(JSON.stringify({ mcsScore, confidenceTier: tier, contributingSignals }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("mastery-score error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
