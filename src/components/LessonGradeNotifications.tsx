import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { lessons } from "@/data/lessons"
import { usePopupSlot, POPUP } from "@/components/popups/PopupCoordinator"
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
import { Award } from "lucide-react"

interface LessonGradeRow {
  lesson_id: string
  grade: string | null
  feedback: string | null
  updated_at: string
}

const LESSON_TITLE = new Map(lessons.map((l) => [l.id, l.title]))

// Per-device record of which lesson-grade versions this student has already been
// shown, so a brand-new/updated grade pops once. Keyed by user id.
const seenKey = (uid: string) => `investiplay_lesson_grades_seen_${uid}`
const readSeen = (uid: string): string[] => {
  try {
    const raw = localStorage.getItem(seenKey(uid))
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
const sig = (g: LessonGradeRow) => `${g.lesson_id}:${g.updated_at}`

// Pops a celebratory dialog when a teacher grades one of the student's lessons.
// Updates live via a realtime subscription and re-checks on load.
export function LessonGradeNotifications() {
  const { user, isTeacher } = useAuth()
  const [grades, setGrades] = useState<LessonGradeRow[]>([])
  const [open, setOpen] = useState(false)
  const allowed = usePopupSlot("lessonGrade", POPUP.lessonGrade, grades.length > 0 && open)

  const check = useCallback(async () => {
    if (!user || isTeacher) return
    const { data, error } = await (supabase as any)
      .from("lesson_grades")
      .select("lesson_id, grade, feedback, updated_at")
      .eq("user_id", user.id)
    if (error || !data) return
    const graded = (data as LessonGradeRow[]).filter((g) => g.grade || g.feedback)
    const seen = new Set(readSeen(user.id))
    const fresh = graded.filter((g) => !seen.has(sig(g)))
    if (fresh.length === 0) return
    setGrades(fresh)
    setOpen(true)
  }, [user, isTeacher])

  useEffect(() => {
    if (!user || isTeacher) return
    let cancelled = false
    check()
    const channel = supabase
      .channel(`lesson-grades-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lesson_grades", filter: `user_id=eq.${user.id}` },
        () => { if (!cancelled) check() }
      )
      .subscribe()
    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [user, isTeacher, check])

  const dismiss = () => {
    if (user && grades.length) {
      const merged = Array.from(new Set([...readSeen(user.id), ...grades.map(sig)]))
      try { localStorage.setItem(seenKey(user.id), JSON.stringify(merged)) } catch { /* ignore */ }
    }
    setOpen(false)
  }

  if (grades.length === 0) return null

  return (
    <Dialog open={open && allowed} onOpenChange={(o) => { if (!o) dismiss() }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-2">
            <Award className="w-8 h-8 text-gold" />
          </div>
          <DialogTitle className="text-center text-2xl font-display">
            📣 Your teacher graded your work!
          </DialogTitle>
          <DialogDescription className="text-center">
            Here's the grade and feedback for {grades.length === 1 ? "your lesson" : "your lessons"}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-2 max-h-[340px] overflow-y-auto">
          {grades.map((g) => (
            <div key={sig(g)} className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-semibold truncate">{LESSON_TITLE.get(g.lesson_id) || g.lesson_id}</p>
                {g.grade && (
                  <Badge className="text-base px-3 py-1 bg-gold/15 text-gold border-gold/20 shrink-0">{g.grade}</Badge>
                )}
              </div>
              {g.feedback && (
                <p className="text-sm whitespace-pre-wrap break-words leading-relaxed text-muted-foreground mt-1">
                  {g.feedback}
                </p>
              )}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={dismiss} className="w-full sm:w-auto">Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
