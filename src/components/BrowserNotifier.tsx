import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { lessons } from "@/data/lessons"
import { notify } from "@/lib/browserNotifications"

const LESSON_TITLE = new Map(lessons.map((l) => [l.id, l.title]))

// App-wide bridge from Supabase realtime events to native OS notifications, for
// signed-in students who opted in from Settings. Fires a browser notification
// when a live event lands while InvestiPlay isn't the focused window.
//
// Realtime's postgres_changes RLS check only reliably evaluates direct
// column = auth.uid() policies. So:
//   - Own-row tables (lesson_grades, partners, friend_messages) are subscribed
//     directly, filtered by user_id/partner_id/recipient_id.
//   - Events behind a class-scoped / function policy (new assignments, business
//     grades) are fanned out by DB triggers into public.student_notifications -
//     a per-student table with a plain user_id = auth.uid() policy realtime
//     delivers reliably - and we subscribe to that, filtered by user_id.
//
// The channel subscribes ONCE per user (deps: uid, isTeacher), and the socket is
// authenticated (realtime.setAuth) BEFORE binding so postgres_changes isn't
// bound as anon (which would make RLS drop every row).
export function BrowserNotifier() {
  const { user, isTeacher } = useAuth()
  const { t } = useTranslation()
  const uid = user?.id ?? null

  // Latest t() without making it a subscription dependency.
  const tRef = useRef(t)
  tRef.current = t

  useEffect(() => {
    if (!uid || isTeacher) return

    let cancelled = false
    let channel: ReturnType<typeof supabase.channel> | null = null

    ;(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.access_token) {
        try {
          await supabase.realtime.setAuth(session.access_token)
        } catch {
          /* ignore - a missing token just means RLS'd rows won't deliver */
        }
      }
      if (cancelled) return

      channel = supabase
        .channel(`push-notify-${uid}`)
        // Per-student notifications: new assignments (fanned out from class-level
        // assigned_lessons) and business grades land here via DB triggers.
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "student_notifications", filter: `user_id=eq.${uid}` },
          (payload) => {
            const row = payload.new as {
              id?: string
              type?: string
              title?: string | null
              body?: string | null
              link?: string | null
            }
            const T = tRef.current
            let title: string
            let body: string | undefined
            switch (row?.type) {
              case "homework":
                title = T("push.homeworkTitle")
                body = T("push.homeworkBody")
                break
              case "classwork":
                title = T("push.classworkTitle")
                body = T("push.classworkBody")
                break
              case "business_grade":
                title = T("push.gradeTitle")
                body = T("push.businessGradeBody")
                break
              default:
                title = row?.title || T("push.classworkTitle")
                body = row?.body || undefined
            }
            notify({
              title,
              body,
              tag: row?.id ? `sn-${row.id}` : "student-notification",
              url: row?.link || "/dashboard",
            })
          },
        )
        // Lesson grade posted / updated - own-row table (user_id = auth.uid()).
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "lesson_grades", filter: `user_id=eq.${uid}` },
          (payload) => {
            const row = payload.new as { lesson_id?: string; grade?: string | null; feedback?: string | null }
            if (!row || (!row.grade && !row.feedback)) return
            const lessonTitle = row.lesson_id ? LESSON_TITLE.get(row.lesson_id) : undefined
            notify({
              title: tRef.current("push.gradeTitle"),
              body: lessonTitle
                ? tRef.current("push.lessonGradeBodyNamed", { lesson: lessonTitle })
                : tRef.current("push.lessonGradeBody"),
              tag: `lesson-grade-${row.lesson_id ?? ""}`,
              url: "/dashboard",
            })
          },
        )
        // Incoming friend / partner request - direct-column policy.
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "partners", filter: `partner_id=eq.${uid}` },
          () => {
            notify({
              title: tRef.current("push.friendTitle"),
              body: tRef.current("push.friendBody"),
              tag: "friend-request",
              url: "/partners",
            })
          },
        )
        // A card a partner sent me on the Friends page - direct-column policy.
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "friend_messages", filter: `recipient_id=eq.${uid}` },
          (payload) => {
            const row = payload.new as { type?: string; note?: string | null; reference_label?: string | null }
            const body =
              row?.type === "note" && row.note
                ? row.note
                : row?.reference_label
                  ? tRef.current("push.messageBodyLabeled", { label: row.reference_label })
                  : tRef.current("push.messageBody")
            notify({
              title: tRef.current("push.messageTitle"),
              body,
              tag: "friend-message",
              url: "/friends",
            })
          },
        )
        .subscribe()
    })()

    return () => {
      cancelled = true
      if (channel) supabase.removeChannel(channel)
    }
  }, [uid, isTeacher])

  return null
}
