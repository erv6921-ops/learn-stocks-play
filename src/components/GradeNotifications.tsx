import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { recordGradeFeedback } from "@/lib/notifications"
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

interface Grade {
  grade: string | null
  feedback: string | null
  updated_at: string
}

// localStorage key for the last grade timestamp this student has already seen,
// so the pop-up shows once per new/updated grade (mirrors the bell store, which
// is also per-device). Keyed by user id so a shared device doesn't leak.
const seenKey = (uid: string) => `investiplay_grade_seen_${uid}`

export function GradeNotifications() {
  // Gate on isTeacher (a confirmed teacher) rather than isStudent - a student
  // whose role lookup is slow/missing resolves to role=null and would be hidden.
  const { user, isTeacher } = useAuth()
  const [grade, setGrade] = useState<Grade | null>(null)
  const [open, setOpen] = useState(false)
  const allowed = usePopupSlot("grade", POPUP.grade, !!grade && open)

  useEffect(() => {
    if (!user || isTeacher) return
    let cancelled = false

    async function checkGrade() {
      const { data, error } = await (supabase as any)
        .from("business_grades")
        .select("grade, feedback, updated_at")
        .eq("user_id", user!.id)
        .maybeSingle()
      if (cancelled || error || !data) return
      if (!data.grade && !data.feedback) return

      const seen = localStorage.getItem(seenKey(user!.id))
      if (seen === data.updated_at) return // already shown this version

      setGrade(data)
      setOpen(true)
    }

    checkGrade()
    return () => {
      cancelled = true
    }
  }, [user, isTeacher])

  // On close: drop the grade into the notification bell so it stays re-readable,
  // and remember this version so it doesn't pop up again.
  const dismiss = () => {
    if (grade && user) {
      recordGradeFeedback(grade.grade, grade.feedback)
      localStorage.setItem(seenKey(user.id), grade.updated_at)
    }
    setOpen(false)
  }

  if (!grade) return null

  return (
    <Dialog open={open && allowed} onOpenChange={(o) => { if (!o) dismiss() }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-2">
            <Award className="w-8 h-8 text-gold" />
          </div>
          <DialogTitle className="text-center text-2xl font-display">
            📣 Your teacher graded your business work!
          </DialogTitle>
          <DialogDescription className="text-center">
            Here's your grade and feedback. You can re-read it any time from the notification bell.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {grade.grade && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">Grade:</span>
              <Badge className="text-base px-3 py-1 bg-gold/15 text-gold border-gold/20">
                {grade.grade}
              </Badge>
            </div>
          )}
          {grade.feedback && (
            <div className="rounded-lg border bg-card p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Feedback</p>
              <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                {grade.feedback}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={dismiss} className="w-full sm:w-auto">
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
