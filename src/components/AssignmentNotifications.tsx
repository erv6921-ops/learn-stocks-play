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
  const { user, isStudent } = useAuth()
  const navigate = useNavigate()
  const [pending, setPending] = useState<PendingAssignment[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!user || !isStudent) return

    let cancelled = false

    async function checkAssignments() {
      const { data, error } = await supabase
        .from("assigned_lessons")
        .select("id, lesson_id, assigned_at")
        .eq("student_user_id", user!.id)
        .eq("completed", false)
        .order("assigned_at", { ascending: false })

      if (cancelled || error || !data || data.length === 0) return
      setPending(data)
      setOpen(true)
    }

    checkAssignments()
    return () => {
      cancelled = true
    }
  }, [user, isStudent])

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
