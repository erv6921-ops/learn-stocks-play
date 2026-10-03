import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { lessons } from "@/data/lessons"
import { notify } from "@/lib/browserNotifications"

const LESSON_TITLE = new Map(lessons.map((l) => [l.id, l.title]))

// [notif-debug] TEMPORARY - remount vs re-render counter.
let NOTIF_INSTANCE_SEQ = 0

// App-wide bridge from Supabase realtime events to native OS notifications, for
// signed-in students who opted in from Settings.
//
// Realtime's postgres_changes RLS check only reliably evaluates direct
// column = auth.uid() policies (confirmed: lesson_progress delivers, but
// assigned_lessons' class-scoped policy - even rewritten to an inline EXISTS -
// does not). So:
//   - Own-row tables (lesson_grades, partners, friend_messages) are subscribed
//     directly with a user_id/recipient/partner filter.
//   - Events behind a function/cross-table policy (new assignments, business
//     grades) are fanned out by DB triggers into public.student_notifications,
//     a per-student table with a plain user_id = auth.uid() policy that realtime
//     delivers reliably. We subscribe to that table filtered by user_id.
//
// The channel subscribes ONCE per user (deps: uid, isTeacher) and the socket is
// authenticated (realtime.setAuth) BEFORE binding, so postgres_changes isn't
// bound as anon.
export function BrowserNotifier() {
  const { user, isTeacher } = useAuth()
  const { t } = useTranslation()
  const uid = user?.id ?? null

  const idRef = useRef<number>(0)
  if (idRef.current === 0) idRef.current = ++NOTIF_INSTANCE_SEQ
  console.log("[notif-debug] render", { instance: idRef.current, uid, isTeacher })

  const tRef = useRef(t)
  tRef.current = t

  useEffect(() => {
    if (!uid || isTeacher) {
      console.log("[notif-debug] subscribe effect skipped", { instance: idRef.current, uid, isTeacher })
      return
    }
    console.log("[notif-debug] subscribe effect RUN", { instance: idRef.current, uid })

    let cancelled = false
    let channel: ReturnType<typeof supabase.channel> | null = null

    // Authenticate the realtime SOCKET with the student's JWT BEFORE binding, so
    // postgres_changes isn't bound as anon (which silently drops RLS'd rows).
    ;(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.log(
        "[notif-debug] pre-subscribe session: hasToken=" +
          String(!!session?.access_token) +
          " instance=" +
          String(idRef.current),
      )
      if (session?.access_token) {
        try {
          await supabase.realtime.setAuth(session.access_token)
          console.log("[notif-debug] realtime.setAuth OK")
        } catch (e) {
          console.warn("[notif-debug] realtime.setAuth failed", e)
        }
      }
      if (cancelled) return

      channel = supabase
        .channel(`push-notify-${uid}`)
        // Per-student notifications: new assignments (fanned out from class-level
        // assigned_lessons) and business grades land here via DB triggers. Plain
        // user_id = auth.uid() policy -> realtime delivers reliably.
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
            console.log("[notif-debug] student_notifications INSERT received", row)
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
            console.log("[notif-debug] lesson_grades event", row)
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
        // Incoming friend / partner request - direct-column policy
        // (auth.uid() = user_id OR auth.uid() = partner_id).
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "partners", filter: `partner_id=eq.${uid}` },
          (payload) => {
            console.log("[notif-debug] partners INSERT received", payload.new)
            notify({
              title: tRef.current("push.friendTitle"),
              body: tRef.current("push.friendBody"),
              tag: "friend-request",
              url: "/partners",
            })
          },
        )
        // A card a partner sent me - direct-column policy
        // (sender_id = auth.uid() OR recipient_id = auth.uid()).
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "friend_messages", filter: `recipient_id=eq.${uid}` },
          (payload) => {
            const row = payload.new as { type?: string; note?: string | null; reference_label?: string | null }
            console.log("[notif-debug] friend_messages INSERT received", row)
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
        .subscribe((status, err) => {
          console.log(
            "[notif-debug] SUBSCRIBE CALLBACK status=" +
              String(status) +
              " err=" +
              (err ? String(err.message || err) : "none") +
              " instance=" +
              String(idRef.current),
          )
        })
    })()

    return () => {
      cancelled = true
      console.log("[notif-debug] subscribe effect CLEANUP -> removeChannel", { instance: idRef.current, uid })
      if (channel) supabase.removeChannel(channel)
    }
  }, [uid, isTeacher])

  return null
}
