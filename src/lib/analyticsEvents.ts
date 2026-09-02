import { supabase } from "@/integrations/supabase/client"
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass"

// Behavioral analytics event stream. Fire-and-forget writes to the
// analytics_events table (see supabase/migrations/..._analytics_events.sql),
// one row per tracked student action across every feature. Never blocks the UI
// and never throws: a failed insert is logged and swallowed (matches the app's
// pattern for non-critical writes, e.g. logActivity in ./analytics.ts). No-ops
// under the dev bypass (no real session) and when there's no signed-in user.
//
// NOTE: this is a SEPARATE system from logActivity/student_activity_events in
// ./analytics.ts. That one feeds the teacher activity view; this one is the
// broad product-analytics firehose.

// The writable event vocabulary. Keep this union in sync with the CHECK
// constraint in the analytics_events migration — a value not in the DB set will
// be rejected by the constraint (and swallowed here).
export type AnalyticsEvent =
  | "session_start"
  | "session_end"
  | "quiz_attempted"
  | "quiz_correct"
  | "quiz_incorrect"
  | "quiz_levelup"
  | "mission_started"
  | "mission_completed"
  | "lesson_started"
  | "lesson_completed"
  | "game_played"
  | "game_won"
  | "game_lost"
  | "coins_earned"
  | "coins_spent"
  | "watchlist_added"
  | "watchlist_removed"
  | "portfolio_traded"
  | "jeff_turn"
  | "class_challenge_joined"
  | "streak_broken"

const SESSION_ID_KEY = "investiplay.analytics.sessionId"

// A stable id for the current browser tab. sessionStorage is scoped to the tab
// and cleared when it closes, so this naturally groups one visit's events and
// resets on the next tab/session — which is exactly what session_id means here.
function getSessionId(): string | null {
  try {
    let id = sessionStorage.getItem(SESSION_ID_KEY)
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem(SESSION_ID_KEY, id)
    }
    return id
  } catch {
    // sessionStorage unavailable (SSR, privacy mode) — degrade to no grouping.
    return null
  }
}

/**
 * Log a behavioral analytics event. Fire-and-forget: returns a resolved promise
 * even on failure, and never throws.
 *
 * @example
 * logEvent("quiz_attempted", { topicId: "ap-1-1", difficulty: 2, theta: 0.5 })
 */
export async function logEvent(
  event: AnalyticsEvent,
  data?: Record<string, unknown>,
): Promise<void> {
  if (DEV_LOCAL_BYPASS) return
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const studentId = sessionData.session?.user?.id
    if (!studentId) return

    const { error } = await (supabase as any)
      .from("analytics_events")
      .insert({
        student_id: studentId,
        event,
        event_data: data ?? null,
        session_id: getSessionId(),
      })

    if (error) console.error("[analytics]", event, error)
  } catch (err) {
    console.error("[analytics]", event, err)
  }
}
