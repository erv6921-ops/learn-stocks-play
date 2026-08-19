import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { lessons } from "@/data/lessons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Play, Clock, AlertCircle } from "lucide-react"

interface PendingAssignment {
  id: string
  lesson_id: string
  assigned_at: string
}

// A forcing, non-dismissible pop-up: the moment a teacher assigns a lesson, the
// student sees a modal they can't close except by opening a lesson. It reappears
// on every load while any assigned lesson is still incomplete, and updates live
// via a Supabase realtime subscription (no refresh needed).
export function AssignmentNotifications() {
  // Gate on isTeacher (a confirmed teacher), NOT isStudent. A student whose
  // user_roles lookup is missing/slow resolves to role=null; class membership
  // (queried below) is the real signal that this is a student.
  const { user, isTeacher } = useAuth()
  const navigate = useNavigate()
  const [pending, setPending] = useState<PendingAssignment[]>([])
  const [open, setOpen] = useState(false)

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
      .select("id, lesson_id, assigned_at")
      .in("class_id", classIds)
      .order("assigned_at", { ascending: false })
    if (error || !assignments || assignments.length === 0) return

    // Lessons this student has already completed - a completed assignment no
    // longer forces the pop-up.
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("completed", true)
    const done = new Set((progress || []).map((p) => p.lesson_id))

    // Unique, not-yet-completed assignments.
    const seen = new Set<string>()
    const pendingList = assignments.filter((a) => {
      if (done.has(a.lesson_id) || seen.has(a.lesson_id)) return false
      seen.add(a.lesson_id)
      return true
    })

    setPending(pendingList)
    // Force the modal open whenever anything is still outstanding.
    setOpen(pendingList.length > 0)
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
      // The student finishing a lesson (progress row) should clear the force.
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

  const startLesson = (lessonId: string) => {
    setOpen(false)
    navigate(`/lessons/${lessonId}`)
  }

  if (pending.length === 0) return null

  return (
    <Dialog open={open} onOpenChange={(o) => { /* forcing: ignore close attempts */ if (o) setOpen(true) }}>
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
            📚 New assignment{pending.length === 1 ? "" : "s"} from your teacher!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You have {pending.length} lesson{pending.length === 1 ? "" : "s"} to complete.
            Tap a lesson below to get started. You can’t skip this.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 my-4 max-h-[320px] overflow-y-auto">
          {pending.map((a) => {
            const lesson = lessons.find((l) => l.id === a.lesson_id)
            return (
              <button
                key={a.id}
                onClick={() => startLesson(a.lesson_id)}
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
  )
}
