import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { lessons } from "@/data/lessons"
import { notify } from "@/lib/browserNotifications"

const LESSON_TITLE = new Map(lessons.map((l) => [l.id, l.title]))

// App-wide bridge from Supabase realtime events to native OS notifications, for
// signed-in students who opted in from Settings. It listens to the same tables
// the on-screen pop-ups use, but fires a browser notification when a LIVE event
// lands while InvestiPlay isn't the focused window - so a new grade / assignment
// / friend request reaches the student even when it's not the tab they're on.
//
// The realtime channel must subscribe ONCE per user and stay SUBSCRIBED: if the
// effect re-ran on every render it would tear the channel down and recreate it,
// and any event that landed during a reconnect gap would be dropped. So the only
// dependencies are stable primitives (uid, isTeacher). Values the handlers need
// but that change identity across renders - the i18n t() function and the
// student's class ids - live in refs, updated without resubscribing.
//
// notify() is the final gate: it no-ops when signed out, for teachers, when not
// opted in, or when the tab is focused, so mounting this unconditionally is safe.
export function BrowserNotifier() {
  const { user, isTeacher } = useAuth()
  const { t } = useTranslation()
  const uid = user?.id ?? null

  // [notif-debug] TEMPORARY instrumentation - remove once notifications verified.
  console.log("[notif-debug] BrowserNotifier render", { uid, isTeacher })

  // Latest t() without making it a subscription dependency.
  const tRef = useRef(t)
  tRef.current = t

  // Classwork/homework assignments are class-level (no user_id), so we match
  // inserts against the student's class ids. Kept in a ref so membership loading
  // updates the matcher WITHOUT tearing down the realtime channel.
  const classIdsRef = useRef<Set<string>>(new Set())
  useEffect(() => {
    if (!uid || isTeacher) {
      classIdsRef.current = new Set()
      return
    }
    let cancelled = false
    supabase
      .from("class_members")
      .select("class_id")
      .eq("user_id", uid)
      .then(({ data, error }) => {
        if (cancelled) return
        classIdsRef.current = new Set((data || []).map((m) => m.class_id).filter(Boolean))
        console.log("[notif-debug] class_members loaded", {
          classIds: [...classIdsRef.current],
          error: error?.message ?? null,
        })
      })
    return () => {
      cancelled = true
    }
  }, [uid, isTeacher])

  useEffect(() => {
    if (!uid || isTeacher) {
      console.log("[notif-debug] subscribe effect skipped", { uid, isTeacher })
      return
    }

    const channel = supabase
      .channel(`push-notify-${uid}`)
      // Lesson grade posted / updated.
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
      // Business simulator work graded.
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "business_grades", filter: `user_id=eq.${uid}` },
        (payload) => {
          const row = payload.new as { grade?: string | null; feedback?: string | null }
          console.log("[notif-debug] business_grades event", row)
          if (!row || (!row.grade && !row.feedback)) return
          notify({
            title: tRef.current("push.gradeTitle"),
            body: tRef.current("push.businessGradeBody"),
            tag: "business-grade",
            url: "/dashboard",
          })
        },
      )
      // New classwork / homework assigned to one of the student's classes.
      // No server-side filter: assignments are class-level, and RLS ("Class
      // members view assignments") already scopes realtime delivery to the
      // student's own classes. classIdsRef is a client-side safety check.
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "assigned_lessons" },
        (payload) => {
          const row = payload.new as { class_id?: string; assignment_type?: string }
          const matches = !!row?.class_id && classIdsRef.current.has(row.class_id)
          console.log("[notif-debug] assigned_lessons INSERT received", {
            row,
            myClassIds: [...classIdsRef.current],
            matches,
          })
          if (!matches) return
          const isHomework = row.assignment_type === "homework"
          notify({
            title: isHomework ? tRef.current("push.homeworkTitle") : tRef.current("push.classworkTitle"),
            body: isHomework ? tRef.current("push.homeworkBody") : tRef.current("push.classworkBody"),
            tag: `assignment-${row.class_id}`,
            url: "/dashboard",
          })
        },
      )
      // Incoming friend / partner request.
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
      // A card a partner sent me on the Friends page: a short note, or a
      // lesson / stock / Jeff-prompt card pointing at something.
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
        // [notif-debug] TEMPORARY - 'SUBSCRIBED' means realtime is connected.
        console.log("[notif-debug] channel status:", status, err?.message ?? "")
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [uid, isTeacher])

  return null
}
