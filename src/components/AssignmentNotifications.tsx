import { useEffect, useState } from "react"
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
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Play, Clock } from "lucide-react"

interface PendingAssignment {
  id: string
  lesson_id: string
  assigned_at: string
}

export function AssignmentNotifications() {
  // Gate on isTeacher (a confirmed teacher), NOT isStudent. A student whose
  // user_roles lookup is missing/slow resolves to role=null; requiring a
  // confirmed "student" role silently hid assignments from them. Class
  // membership (queried below) is the real signal that this is a student.
  const { user, isTeacher } = useAuth()
  const navigate = useNavigate()
  const [pending, setPending] = useState<PendingAssignment[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!user || isTeacher) return

    let cancelled = false

    async function checkAssignments() {
      // Classes the student belongs to.
      const { data: memberships } = await supabase
        .from("class_members")
        .select("class_id")
        .eq("user_id", user!.id)
      const classIds = (memberships || []).map((m) => m.class_id)
      if (cancelled || classIds.length === 0) return

      // Class-level assignments for those classes.
      const { data: assignments, error } = await supabase
        .from("assigned_lessons")
        .select("id, lesson_id, assigned_at")
        .in("class_id", classIds)
        .order("assigned_at", { ascending: false })
      if (cancelled || error || !assignments || assignments.length === 0) return

      // Lessons this student has already completed.
      const { data: progress } = await supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", user!.id)
        .eq("completed", true)
      const done = new Set((progress || []).map((p) => p.lesson_id))

      // Unique, not-yet-completed assignments.
      const seen = new Set<string>()
      const pendingList = assignments.filter((a) => {
        if (done.has(a.lesson_id) || seen.has(a.lesson_id)) return false
        seen.add(a.lesson_id)
        return true
      })

      if (cancelled || pendingList.length === 0) return

      // Which of these assignments has this user already been shown? Stored in
      // the DB keyed to user_id, so "show once" holds across browsers/devices
      // (not per-localStorage). RLS scopes rows to the current user.
      const { data: dismissals, error: dismissErr } = await supabase
        .from("assignment_dismissals")
        .select("assignment_id")
        .eq("user_id", user!.id)
        .in("assignment_id", pendingList.map((a) => a.id))
      if (cancelled) return
      if (dismissErr) {
        // If the dismissals table is unreachable we still show the dialog
        // rather than swallow the assignment - better to over-remind than to
        // silently hide a teacher's assignment.
        console.error("[assignment dismissals fetch]", dismissErr)
      }
      const dismissed = new Set((dismissals || []).map((d) => d.assignment_id))
      const unseen = pendingList.filter((a) => !dismissed.has(a.id))

      setPending(pendingList)
      if (unseen.length === 0) return

      setOpen(true)
      // Record that these assignments have now been shown to this user.
      const { error: insertErr } = await supabase
        .from("assignment_dismissals")
        .upsert(
          unseen.map((a) => ({ user_id: user!.id, assignment_id: a.id })),
          { onConflict: "user_id,assignment_id", ignoreDuplicates: true }
        )
      if (insertErr) console.error("[assignment dismissals insert]", insertErr)
    }

    checkAssignments()
    return () => {
      cancelled = true
    }
  }, [user, isTeacher])

  const startLesson = (lessonId: string) => {
    setOpen(false)
    navigate(`/lessons/${lessonId}`)
  }

  if (pending.length === 0) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-display">
            📚 You have {pending.length} assignment{pending.length === 1 ? "" : "s"}!
          </DialogTitle>
          <DialogDescription className="text-center">
            Your teacher assigned the following lesson{pending.length === 1 ? "" : "s"}. You need to complete {pending.length === 1 ? "it" : "them all"} to stay on track.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 my-4 max-h-[300px] overflow-y-auto">
          {pending.map((a) => {
            const lesson = lessons.find((l) => l.id === a.lesson_id)
            return (
              <div
                key={a.id}
                className="flex items-center justify-between gap-3 p-3 rounded-lg border bg-card hover:bg-accent/30 transition"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {lesson?.title || a.lesson_id}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {lesson?.level && (
                      <Badge variant="secondary" className="text-xs">
                        Level {lesson.level}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(a.assigned_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button size="sm" onClick={() => startLesson(a.lesson_id)}>
                  <Play className="w-3.5 h-3.5 mr-1" />
                  Start
                </Button>
              </div>
            )
          })}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
            Remind me later
          </Button>
          <Button
            onClick={() => {
              setOpen(false)
              navigate("/lessons")
            }}
            className="w-full sm:w-auto"
          >
            Go to Lessons
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
