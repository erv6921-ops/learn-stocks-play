import { supabase } from "@/integrations/supabase/client"
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass"

// Fire-and-forget student activity logging. Writes to student_activity_events,
// which the teacher analytics view reads. Never blocks the UI and never throws:
// a failed insert is logged and swallowed (matches the app's pattern for
// non-critical writes). No-ops under the dev bypass (no real session) and when
// there's no signed-in user.

export type ActivityKind = "page_view" | "question_answered" | "session_ping"

export interface ActivityFields {
  route?: string
  lessonId?: string
  questionId?: string
  isCorrect?: boolean
  selectedIndex?: number
  durationMs?: number
  meta?: Record<string, unknown>
}

export function logActivity(userId: string | undefined | null, kind: ActivityKind, f: ActivityFields = {}) {
  if (!userId || DEV_LOCAL_BYPASS) return
  ;(supabase as any)
    .from("student_activity_events")
    .insert({
      user_id: userId,
      kind,
      route: f.route ?? null,
      lesson_id: f.lessonId ?? null,
      question_id: f.questionId ?? null,
      is_correct: f.isCorrect ?? null,
      selected_index: f.selectedIndex ?? null,
      duration_ms: f.durationMs ?? null,
      meta: f.meta ?? {},
    })
    .then(({ error }: { error: unknown }) => {
      if (error) console.error("[activity]", error)
    })
}
