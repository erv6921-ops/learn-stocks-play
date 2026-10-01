import { useEffect } from "react"
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
// This mounts app-wide (not just on the dashboard) so the alert works from any
// page. It only reacts to live realtime events, never an on-load re-scan, so
// there's nothing to de-dupe - each change is delivered once per session, and
// the rich modals on /dashboard still handle catch-up. notify() is the final
// gate: it no-ops when signed out, for teachers, when not opted in, or when the
// tab is focused, so mounting this unconditionally is safe.
export function BrowserNotifier() {
  const { user, isTeacher } = useAuth()
  const { t } = useTranslation()

  // [notif-debug] TEMPORARY instrumentation - remove once notifications verified.
  console.log("[notif-debug] BrowserNotifier render", { user: user?.id ?? null, isTeacher })

  useEffect(() => {
    if (!user || isTeacher) {
      console.log("[notif-debug] effect skipped", { hasUser: !!user, isTeacher })
      return
    }
    const uid = user.id
    let cancelled = false

    // Classwork/homework assignments are class-level (no user_id), so we need
    // the student's class ids to know which assigned_lessons inserts are theirs.
    let classIds = new Set<string>()

    const wire = async () => {
      const { data: memberships, error: memErr } = await supabase
        .from("class_members")
        .select("class_id")
        .eq("user_id", uid)
      if (cancelled) return
      classIds = new Set((memberships || []).map((m) => m.class_id))
      console.log("[notif-debug] class_members loaded", {
        classIds: [...classIds],
        error: memErr?.message ?? null,
      })

      const channel = supabase
        .channel(`push-notify-${uid}`)
        // Lesson grade posted / updated.
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "lesson_grades", filter: `user_id=eq.${uid}` },
          (payload) => {
            const row = payload.new as { lesson_id?: string; grade?: string | null; feedback?: string | null }
            if (!row || (!row.grade && !row.feedback)) return
            const lessonTitle = row.lesson_id ? LESSON_TITLE.get(row.lesson_id) : undefined
            notify({
              title: t("push.gradeTitle"),
              body: lessonTitle ? t("push.lessonGradeBodyNamed", { lesson: lessonTitle }) : t("push.lessonGradeBody"),
              tag: `lesson-grade-${row.lesson_id ?? ""}`,
              url: "/dashboard",
            })
          }
        )
        // Business simulator work graded.
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "business_grades", filter: `user_id=eq.${uid}` },
          (payload) => {
            const row = payload.new as { grade?: string | null; feedback?: string | null }
            if (!row || (!row.grade && !row.feedback)) return
            notify({
              title: t("push.gradeTitle"),
              body: t("push.businessGradeBody"),
              tag: "business-grade",
              url: "/dashboard",
            })
          }
        )
        // New classwork / homework assigned to one of the student's classes.
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "assigned_lessons" },
          (payload) => {
            const row = payload.new as { class_id?: string; assignment_type?: string }
            // [notif-debug] TEMPORARY
            console.log("[notif-debug] assigned_lessons INSERT received", {
              row,
              myClassIds: [...classIds],
              matches: !!row?.class_id && classIds.has(row.class_id),
            })
            if (!row?.class_id || !classIds.has(row.class_id)) return
            const isHomework = row.assignment_type === "homework"
            notify({
              title: isHomework ? t("push.homeworkTitle") : t("push.classworkTitle"),
              body: isHomework ? t("push.homeworkBody") : t("push.classworkBody"),
              tag: `assignment-${row.class_id}`,
              url: "/dashboard",
            })
          }
        )
        // Incoming friend / partner request.
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "partners", filter: `partner_id=eq.${uid}` },
          () => {
            notify({
              title: t("push.friendTitle"),
              body: t("push.friendBody"),
              tag: "friend-request",
              url: "/partners",
            })
          }
        )
        // A card a partner sent me on the Friends page: a short note, or a
        // lesson / stock / Jeff-prompt card pointing at something.
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "friend_messages", filter: `recipient_id=eq.${uid}` },
          (payload) => {
            const row = payload.new as { type?: string; note?: string | null; reference_label?: string | null }
            const body =
              row?.type === "note" && row.note
                ? row.note
                : row?.reference_label
                  ? t("push.messageBodyLabeled", { label: row.reference_label })
                  : t("push.messageBody")
            notify({
              title: t("push.messageTitle"),
              body,
              tag: "friend-message",
              url: "/friends",
            })
          }
        )
        .subscribe((status, err) => {
          // [notif-debug] TEMPORARY - 'SUBSCRIBED' means realtime is connected.
          console.log("[notif-debug] channel status:", status, err?.message ?? "")
        })

      return channel
    }

    const channelPromise = wire()

    return () => {
      cancelled = true
      channelPromise.then((channel) => {
        if (channel) supabase.removeChannel(channel)
      })
    }
  }, [user, isTeacher, t])

  return null
}
