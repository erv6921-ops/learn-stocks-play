// Daily homework nudge: once per calendar day, when a student opens the app and
// still has unfinished homework, remind them (with due dates + overdue flags) to
// go finish it. Distinct from AssignmentNotifications' "new homework" prompt,
// which fires once per assignment; this recurs daily while work remains.

import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
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
import { NotebookPen, Clock, Play } from "lucide-react"
import { dueLabel as fmtDueLabel, isOverdue as pastDue } from "@/lib/dueDate"
import { usePopupSlot, POPUP } from "@/components/popups/PopupCoordinator"

interface PendingHw {
  id: string
  lesson_id: string
  due_date: string | null
  due_time: string | null
}

// Local calendar day as YYYY-MM-DD (en-CA formats that way) so "once per day"
// tracks the student's own day, not UTC.
const today = () => new Date().toLocaleDateString("en-CA")
const seenKey = (uid: string) => `investiplay_homework_reminder_seen_${uid}`
const shownToday = (uid: string): boolean => {
  try { return localStorage.getItem(seenKey(uid)) === today() } catch { return false }
}
const markShownToday = (uid: string) => {
  try { localStorage.setItem(seenKey(uid), today()) } catch { /* ignore */ }
}

// Mirror AssignmentNotifications' homework-ack key so the two never stack: if any
// homework is still brand-new (unacked), that prompt owns the screen and we stay
// quiet until it's been acknowledged.
const readHwAck = (uid: string): Set<string> => {
  try {
    const raw = localStorage.getItem(`investiplay_homework_ack_${uid}`)
    const arr = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(arr) ? (arr as string[]) : [])
  } catch {
    return new Set()
  }
}

export function HomeworkReminder() {
  const { user, isTeacher } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [pending, setPending] = useState<PendingHw[]>([])
  const [open, setOpen] = useState(false)
  const allowed = usePopupSlot("homeworkReminder", POPUP.homeworkReminder, open && pending.length > 0)

  const check = useCallback(async () => {
    if (!user || isTeacher) return
    if (shownToday(user.id)) return
    // Don't remind them about homework while they're already on the Homework page.
    if (location.pathname.startsWith("/homework")) return

    const { data: memberships } = await supabase
      .from("class_members").select("class_id").eq("user_id", user.id)
    const classIds = (memberships || []).map((m) => m.class_id)
    if (classIds.length === 0) return

    const { data: assignments } = await supabase
      .from("assigned_lessons")
      .select("id, lesson_id, due_date, due_time, assignment_type")
      .in("class_id", classIds)
      .eq("assignment_type", "homework")
    if (!assignments || assignments.length === 0) return

    const { data: progress } = await supabase
      .from("lesson_progress").select("lesson_id").eq("user_id", user.id).eq("completed", true)
    const done = new Set((progress || []).map((p) => p.lesson_id))

    // Unfinished homework, de-duped by lesson. Track whether any is still
    // brand-new (unacked) - if so, the new-homework prompt handles this load.
    const ack = readHwAck(user.id)
    const seen = new Set<string>()
    const incomplete: PendingHw[] = []
    let hasUnacked = false
    for (const a of assignments) {
      if (done.has(a.lesson_id) || seen.has(a.lesson_id)) continue
      seen.add(a.lesson_id)
      if (!ack.has(a.lesson_id)) hasUnacked = true
      incomplete.push({ id: a.id, lesson_id: a.lesson_id, due_date: a.due_date, due_time: a.due_time })
    }
    if (incomplete.length === 0 || hasUnacked) return

    // Soonest due first (date+time); undated homework sinks to the bottom.
    incomplete.sort((a, b) => {
      const ak = a.due_date ? `${a.due_date}T${a.due_time ?? "23:59"}` : ""
      const bk = b.due_date ? `${b.due_date}T${b.due_time ?? "23:59"}` : ""
      return ak && bk ? ak.localeCompare(bk) : ak ? -1 : bk ? 1 : 0
    })
    setPending(incomplete)
    setOpen(true)
    markShownToday(user.id)
  }, [user, isTeacher, location.pathname])

  useEffect(() => { void check() }, [check])

  if (!open || pending.length === 0 || !allowed) return null

  const overdueCount = pending.filter((p) => p.due_date && pastDue(p.due_date, p.due_time)).length

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg border-2 border-primary">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-2">
            <NotebookPen className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-display">
            📒 Don't forget your homework!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You still have {pending.length} homework {pending.length === 1 ? "lesson" : "lessons"} to finish
            {overdueCount > 0 && <> — <span className="font-semibold text-destructive">{overdueCount} overdue</span></>}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 my-2 max-h-[260px] overflow-y-auto">
          {pending.map((p) => {
            const lesson = lessons.find((l) => l.id === p.lesson_id)
            const overdue = !!p.due_date && pastDue(p.due_date, p.due_time)
            const dueToday = !!p.due_date && !overdue &&
              new Date(`${p.due_date}T00:00:00`).toDateString() === new Date().toDateString()
            const dueLabel = p.due_date ? fmtDueLabel(p.due_date, p.due_time) : ""
            return (
              <button
                key={p.id}
                onClick={() => { setOpen(false); navigate(`/lessons/${p.lesson_id}`) }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 bg-card hover:border-primary transition text-left ${
                  overdue ? "border-destructive/40" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <NotebookPen className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{lesson?.title || p.lesson_id}</p>
                  {p.due_date && (
                    <span className={`text-xs font-semibold flex items-center gap-1 mt-0.5 ${
                      overdue ? "text-destructive" : dueToday ? "text-amber-600" : "text-muted-foreground"
                    }`}>
                      <Clock className="w-3 h-3" /> {dueLabel}
                    </span>
                  )}
                </div>
                <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shrink-0">
                  <Play className="w-3.5 h-3.5" /> Do it
                </span>
              </button>
            )
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" className="w-full" onClick={() => { setOpen(false); navigate("/homework") }}>
            View all homework
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
