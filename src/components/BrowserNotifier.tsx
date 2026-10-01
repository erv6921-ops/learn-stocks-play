import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { lessons } from "@/data/lessons"
import { notify } from "@/lib/browserNotifications"

const LESSON_TITLE = new Map(lessons.map((l) => [l.id, l.title]))

// [notif-debug] TEMPORARY - module-level counter to tell remount from re-render.
// A fresh instance id on each cycle => the component is remounting (parent/tree
// problem). Same id but effects re-run => a dependency changed.
let NOTIF_INSTANCE_SEQ = 0

// App-wide bridge from Supabase realtime events to native OS notifications, for
// signed-in students who opted in from Settings. The realtime channel must
// subscribe ONCE per user and stay SUBSCRIBED; a teardown/recreate gap drops any
// event that lands during the reconnect. See [notif-debug] logging below.
export function BrowserNotifier() {
  const { user, isTeacher } = useAuth()
  const { t } = useTranslation()
  const uid = user?.id ?? null

  // [notif-debug] stable per-mount id + change tracking.
  const idRef = useRef<number>(0)
  if (idRef.current === 0) idRef.current = ++NOTIF_INSTANCE_SEQ
  const prevRef = useRef<{ uid: string | null; isTeacher: boolean; userObj: unknown } | null>(null)
  const changed =
    prevRef.current === null
      ? "first-render"
      : [
          prevRef.current.uid !== uid ? "uid" : null,
          prevRef.current.isTeacher !== isTeacher ? "isTeacher" : null,
          prevRef.current.userObj !== user ? "user-object-identity" : null,
        ]
          .filter(Boolean)
          .join(",") || "none"
  prevRef.current = { uid, isTeacher, userObj: user }
  console.log("[notif-debug] render", { instance: idRef.current, uid, isTeacher, changed })

  // Empty-dep mount/unmount logger: fires exactly once per real mount. If this
  // logs repeatedly, the component is being REMOUNTED by a parent.
  useEffect(() => {
    console.log("[notif-debug] >>> MOUNT instance", idRef.current)
    return () => console.log("[notif-debug] <<< UNMOUNT instance", idRef.current)
  }, [])

  // Latest t() without making it a subscription dependency.
  const tRef = useRef(t)
  tRef.current = t

  // Student's class ids in a ref so membership loading updates the matcher
  // WITHOUT tearing down the realtime channel.
  const classIdsRef = useRef<Set<string>>(new Set())
  useEffect(() => {
    if (!uid || isTeacher) {
      classIdsRef.current = new Set()
      return
    }
    let cancelled = false
    console.log("[notif-debug] class_members effect RUN", { instance: idRef.current, uid })
    supabase
      .from("class_members")
      .select("class_id")
      .eq("user_id", uid)
      .then(({ data, error }) => {
        if (cancelled) return
        classIdsRef.current = new Set((data || []).map((m) => m.class_id).filter(Boolean))
        console.log("[notif-debug] class_members loaded", {
          instance: idRef.current,
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
      console.log("[notif-debug] subscribe effect skipped", { instance: idRef.current, uid, isTeacher })
      return
    }
    console.log("[notif-debug] subscribe effect RUN", { instance: idRef.current, uid })

    let cancelled = false
    let channel: ReturnType<typeof supabase.channel> | null = null

    // Authenticate the realtime SOCKET with the student's JWT BEFORE binding the
    // channel. supabase-js sets realtime auth asynchronously at startup and does
    // not re-propagate on INITIAL_SESSION, so a channel that binds postgres_changes
    // before that lands stays bound as anon - RLS then sees auth.uid()=NULL and
    // silently drops every row (the "SUBSCRIBED but nothing delivered" symptom).
    ;(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.log("[notif-debug] pre-subscribe session", {
        instance: idRef.current,
        hasToken: !!session?.access_token,
      })
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
      // No server-side filter: assignments are class-level and RLS ("Class
      // members view assignments") already scopes realtime delivery.
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "assigned_lessons" },
        (payload) => {
          const row = payload.new as { class_id?: string; assignment_type?: string }
          const matches = !!row?.class_id && classIdsRef.current.has(row.class_id)
          console.log("[notif-debug] assigned_lessons INSERT received", {
            instance: idRef.current,
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
        console.log("[notif-debug] channel status:", status, "instance", idRef.current, err?.message ?? "")
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
