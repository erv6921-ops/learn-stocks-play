import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { lessons } from "@/data/lessons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Play, Clock, AlertCircle, NotebookPen } from "lucide-react"
import { fmtDue } from "@/lib/dueDate"
import { usePopupSlot, POPUP } from "@/components/popups/PopupCoordinator"

interface PendingAssignment {
  id: string
  lesson_id: string
  assigned_at: string
  assignment_type: string
  due_date: string | null
  due_time: string | null
}

// Per-device record of which assigned lessons the student has already been
// prompted for, so a prompt pops exactly once per assignment instead of nagging
// on every app load. Classwork and homework are tracked separately: classwork
// keeps forcing until the student opens the lesson, homework clears the moment
// the student picks "Do now" or "Do later".
const ackKey = (uid: string) => `investiplay_assignment_ack_${uid}`
const hwAckKey = (uid: string) => `investiplay_homework_ack_${uid}`
const readAck = (key: string): Set<string> => {
  try {
    const raw = localStorage.getItem(key)
    const arr = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(arr) ? (arr as string[]) : [])
  } catch {
    return new Set()
  }
}
const writeAck = (key: string, lessonId: string) => {
  try {
    const next = readAck(key)
    next.add(lessonId)
    localStorage.setItem(key, JSON.stringify([...next]))
  } catch {
    /* ignore */
  }
}

// Two prompts driven off the same class assignments:
//   • Classwork - a forcing modal the student can't close except by opening a
//     lesson. Reappears on every load while any classwork is still incomplete.
//   • Homework - a softer modal offering "Do now" or "Do later". Non-forcing;
//     deferred homework lives on the /homework page.
// Both update live via a Supabase realtime subscription (no refresh needed).
export function AssignmentNotifications() {
  // Gate on isTeacher (a confirmed teacher), NOT isStudent. A student whose
  // user_roles lookup is missing/slow resolves to role=null; class membership
  // (queried below) is the real signal that this is a student.
  const { user, isTeacher } = useAuth()
  const navigate = useNavigate()
  const [classwork, setClasswork] = useState<PendingAssignment[]>([])
  const [homework, setHomework] = useState<PendingAssignment[]>([])
  const [open, setOpen] = useState(false)
  const [hwOpen, setHwOpen] = useState(false)
  // The dashboard pop-up coordinator only lets one pop-up show at a time.
  const allowed = usePopupSlot("assignments", POPUP.assignments, classwork.length > 0 || homework.length > 0)

  const checkAssignments = useCallback(async () => {
    if (!user || isTeacher) return

    // Classes the student belongs to.
    const { data: memberships } = await supabase
      .from("class_members")
      .select("class_id")
      .eq("user_id", user.id)
    const classIds = (memberships || []).map((m) => m.class_id)
    if (classIds.length === 0) return

    // Class-level assignments for those classes.
    const { data: assignments, error } = await supabase
      .from("assigned_lessons")
      .select("id, lesson_id, assigned_at, assignment_type, due_date, due_time")
      .in("class_id", classIds)
      .order("assigned_at", { ascending: false })
    if (error || !assignments || assignments.length === 0) return

    // Lessons this student has already completed - a completed assignment no
    // longer prompts.
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("completed", true)
    const done = new Set((progress || []).map((p) => p.lesson_id))

    // Unique, not-yet-completed assignments the student hasn't already been
    // prompted for (acked) - so each prompt pops once per assignment.
    const ackedCw = readAck(ackKey(user.id))
    const ackedHw = readAck(hwAckKey(user.id))
    const seen = new Set<string>()
    const cwList: PendingAssignment[] = []
    const hwList: PendingAssignment[] = []
    for (const a of assignments as PendingAssignment[]) {
      if (done.has(a.lesson_id) || seen.has(a.lesson_id)) continue
      seen.add(a.lesson_id)
      const isHomework = a.assignment_type === "homework"
      if (isHomework) {
        if (!ackedHw.has(a.lesson_id)) hwList.push(a)
      } else {
        if (!ackedCw.has(a.lesson_id)) cwList.push(a)
      }
    }

    setClasswork(cwList)
    setHomework(hwList)
    // Classwork forces open whenever anything is outstanding; homework's softer
    // prompt only shows when there's no classwork demanding attention first.
    setOpen(cwList.length > 0)
    setHwOpen(cwList.length === 0 && hwList.length > 0)
  }, [user, isTeacher])

  // Initial check + live subscription: a new assignment row for one of the
  // student's classes re-runs the check and pops the modal immediately.
  useEffect(() => {
    if (!user || isTeacher) return
    let cancelled = false

    checkAssignments()

    const channel = supabase
      .channel(`assignments-${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "assigned_lessons" },
        () => { if (!cancelled) checkAssignments() }
      )
      // The student finishing a lesson (progress row) should clear the prompt.
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lesson_progress", filter: `user_id=eq.${user.id}` },
        () => { if (!cancelled) checkAssignments() }
      )
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [user, isTeacher, checkAssignments])

  const startClasswork = (lessonId: string) => {
    // Record this assignment so the modal won't force again on future loads -
    // the student is now locked into the lesson until they complete it.
    if (user) writeAck(ackKey(user.id), lessonId)
    setOpen(false)
    navigate(`/lessons/${lessonId}`)
  }

  // Homework: "Do now" opens the lesson; "Do later" defers it to /homework. Both
  // ack the assignment so the prompt won't reappear - the Homework page is now
  // the student's record of what's still outstanding.
  const ackAllHomework = () => {
    if (user) homework.forEach((a) => writeAck(hwAckKey(user.id), a.lesson_id))
  }
  const homeworkDoNow = (lessonId: string) => {
    ackAllHomework()
    setHwOpen(false)
    navigate(`/lessons/${lessonId}`)
  }
  const homeworkDoLater = () => {
    ackAllHomework()
    setHwOpen(false)
    navigate("/homework")
  }

  return (
    <>
      {/* ── Classwork: forcing modal ── */}
      {classwork.length > 0 && (
        <Dialog open={open && allowed} onOpenChange={(o) => { /* forcing: ignore close attempts */ if (o) setOpen(true) }}>
          <DialogContent
            // Hide the built-in close (X) and block escape / click-outside so the
            // only way forward is to open a lesson.
            className="max-w-xl border-2 border-primary [&>button]:hidden"
            onEscapeKeyDown={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-2 animate-pulse">
                <AlertCircle className="w-11 h-11 text-primary" />
              </div>
              <DialogTitle className="text-center text-3xl font-display">
                📚 New classwork from your teacher!
              </DialogTitle>
              <DialogDescription className="text-center text-base">
                You have {classwork.length} lesson{classwork.length === 1 ? "" : "s"} to complete.
                Tap a lesson below to get started. You can’t skip this.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 my-4 max-h-[320px] overflow-y-auto">
              {classwork.map((a) => {
                const lesson = lessons.find((l) => l.id === a.lesson_id)
                return (
                  <button
                    key={a.id}
                    onClick={() => startClasswork(a.lesson_id)}
                    className="w-full flex items-center justify-between gap-3 p-4 rounded-xl border-2 bg-card hover:border-primary hover:bg-accent/30 transition text-left group"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{lesson?.title || a.lesson_id}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {lesson?.level && (
                            <Badge variant="secondary" className="text-xs">Level {lesson.level}</Badge>
                          )}
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(a.assigned_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground group-hover:brightness-110 shrink-0">
                      <Play className="w-3.5 h-3.5" /> Start
                    </span>
                  </button>
                )
              })}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ── Homework: softer "Do now / Do later" prompt ── */}
      {homework.length > 0 && (
        <Dialog open={hwOpen && allowed} onOpenChange={setHwOpen}>
          <DialogContent className="max-w-lg border-2 border-primary">
            <DialogHeader>
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-2">
                <NotebookPen className="w-11 h-11 text-primary" />
              </div>
              <DialogTitle className="text-center text-3xl font-display">
                📒 New homework from your teacher!
              </DialogTitle>
              <DialogDescription className="text-center text-base">
                You have {homework.length} homework lesson{homework.length === 1 ? "" : "s"}. Start now, or
                do it later - it'll be waiting on your Homework page.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 my-2 max-h-[280px] overflow-y-auto">
              {homework.map((a) => {
                const lesson = lessons.find((l) => l.id === a.lesson_id)
                return (
                  <div
                    key={a.id}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border-2 bg-card"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <NotebookPen className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{lesson?.title || a.lesson_id}</p>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {a.due_date
                          ? <span className="font-semibold text-foreground">Due {fmtDue(a.due_date, a.due_time)}</span>
                          : <>No due date</>}
                      </span>
                    </div>
                    <Button size="sm" onClick={() => homeworkDoNow(a.lesson_id)} className="shrink-0">
                      <Play className="w-3.5 h-3.5 mr-1" /> Do now
                    </Button>
                  </div>
                )
              })}
            </div>

            <DialogFooter>
              <Button variant="outline" className="w-full" onClick={homeworkDoLater}>
                Do later
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
