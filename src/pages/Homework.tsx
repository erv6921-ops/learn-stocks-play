import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  NotebookPen, Play, Clock, CheckCircle2, BookOpen, Loader2,
  AlertTriangle, ChevronDown, MessageSquareText,
} from "lucide-react"
import GameNav from "@/components/GameNav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { lessons } from "@/data/lessons"

interface Grade {
  label: string          // display text, e.g. "92%"
  percent: number | null // numeric score for color coding
  feedback: string | null
}

interface HomeworkItem {
  id: string
  lesson_id: string
  assigned_at: string
  due_date: string | null
  completed: boolean
  grade: Grade | null
}

// Format a DB date ("YYYY-MM-DD") as "Aug 25", parsed at local midnight so it
// never shifts a day. daysUntil is negative when overdue.
const parseDue = (d: string) => new Date(`${d}T00:00:00`)
const fmtDue = (d: string) => parseDue(d).toLocaleDateString(undefined, { month: "short", day: "numeric" })
const daysUntil = (d: string) => {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  return Math.round((parseDue(d).getTime() - today.getTime()) / 86400000)
}

// Grade → color family (green good, amber ok, red weak). Falls back to neutral
// when the teacher left a text grade with no percent.
const gradeClasses = (pct: number | null) => {
  if (pct == null) return "bg-muted text-foreground border-border"
  if (pct >= 90) return "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
  if (pct >= 80) return "bg-green-500/15 text-green-700 border-green-500/30"
  if (pct >= 70) return "bg-amber-500/15 text-amber-700 border-amber-500/30"
  if (pct >= 60) return "bg-orange-500/15 text-orange-700 border-orange-500/30"
  return "bg-destructive/15 text-destructive border-destructive/30"
}

// The student's homework hub (replaces the old Challenges tab). Built to scale to
// a full course-load of assignments: work is split into Overdue / Upcoming /
// Completed, and completed homework carries the teacher's grade + feedback.
// Classwork is excluded - it's handled by the forcing pop-up, not here.
export default function Homework() {
  const { user, isTeacher } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [hasClass, setHasClass] = useState(true)
  const [items, setItems] = useState<HomeworkItem[]>([])
  const [showCompleted, setShowCompleted] = useState(true)
  const [openFeedback, setOpenFeedback] = useState<Set<string>>(new Set())

  const load = useCallback(async () => {
    if (!user || isTeacher) { setLoading(false); return }

    const { data: memberships } = await supabase
      .from("class_members")
      .select("class_id")
      .eq("user_id", user.id)
    const classIds = (memberships || []).map((m) => m.class_id)
    if (classIds.length === 0) {
      setHasClass(false)
      setItems([])
      setLoading(false)
      return
    }
    setHasClass(true)

    const [{ data: assignments }, { data: progress }, { data: gradeRows }] = await Promise.all([
      supabase
        .from("assigned_lessons")
        .select("id, lesson_id, assigned_at, assignment_type, due_date")
        .in("class_id", classIds)
        .eq("assignment_type", "homework")
        .order("assigned_at", { ascending: false }),
      supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", user.id)
        .eq("completed", true),
      // lesson_grades isn't in the generated types yet - matches usage elsewhere.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase as any)
        .from("lesson_grades")
        .select("lesson_id, grade, grade_percent, feedback")
        .eq("user_id", user.id),
    ])

    const done = new Set((progress || []).map((p: { lesson_id: string }) => p.lesson_id))
    const grades = new Map<string, Grade>()
    for (const g of (gradeRows || []) as { lesson_id: string; grade: string | null; grade_percent: number | null; feedback: string | null }[]) {
      if (g.grade || g.grade_percent != null || g.feedback) {
        grades.set(g.lesson_id, {
          label: g.grade || (g.grade_percent != null ? `${g.grade_percent}%` : ""),
          percent: g.grade_percent,
          feedback: g.feedback,
        })
      }
    }

    // Collapse duplicate lesson assignments (a lesson could sit in two of the
    // student's classes) to one row, keeping the most recent.
    const seen = new Set<string>()
    const list: HomeworkItem[] = []
    for (const a of assignments || []) {
      if (seen.has(a.lesson_id)) continue
      seen.add(a.lesson_id)
      list.push({
        id: a.id,
        lesson_id: a.lesson_id,
        assigned_at: a.assigned_at,
        due_date: a.due_date,
        completed: done.has(a.lesson_id),
        grade: grades.get(a.lesson_id) || null,
      })
    }
    setItems(list)
    setLoading(false)
  }, [user, isTeacher])

  useEffect(() => {
    load()
    if (!user || isTeacher) return

    // Live: a new homework assignment, the student finishing a lesson, or the
    // teacher grading it all keep this page in sync without a refresh.
    const channel = supabase
      .channel(`homework-${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "assigned_lessons" }, () => load())
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lesson_progress", filter: `user_id=eq.${user.id}` },
        () => load()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lesson_grades", filter: `user_id=eq.${user.id}` },
        () => load()
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [load, user, isTeacher])

  // Split into buckets. Overdue is surfaced separately so time-sensitive work is
  // impossible to miss even in a long list. Each bucket is sorted by due date
  // (soonest first); undated work sinks below dated work.
  const byDue = (a: HomeworkItem, b: HomeworkItem) => {
    if (a.due_date && b.due_date) return a.due_date.localeCompare(b.due_date)
    if (a.due_date) return -1
    if (b.due_date) return 1
    return 0
  }
  const { overdue, upcoming, completed } = useMemo(() => {
    const notDone = items.filter((i) => !i.completed)
    return {
      overdue: notDone.filter((i) => i.due_date && daysUntil(i.due_date) < 0).sort(byDue),
      upcoming: notDone.filter((i) => !i.due_date || daysUntil(i.due_date) >= 0).sort(byDue),
      completed: items.filter((i) => i.completed),
    }
  }, [items])

  const toggleFeedback = (id: string) =>
    setOpenFeedback((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const Row = ({ item }: { item: HomeworkItem }) => {
    const lesson = lessons.find((l) => l.id === item.lesson_id)
    const dleft = item.due_date ? daysUntil(item.due_date) : null
    const isOverdue = !item.completed && dleft !== null && dleft < 0
    const grade = item.grade
    const hasFeedback = !!grade?.feedback
    const feedbackOpen = openFeedback.has(item.id)

    let dueLabel = ""
    if (item.due_date) {
      dueLabel =
        dleft === 0 ? "Due today"
        : dleft === 1 ? "Due tomorrow"
        : dleft !== null && dleft < 0 ? `Overdue · was due ${fmtDue(item.due_date)}`
        : dleft !== null && dleft <= 6 ? `Due ${parseDue(item.due_date).toLocaleDateString(undefined, { weekday: "short" })} · ${fmtDue(item.due_date)}`
        : `Due ${fmtDue(item.due_date)}`
    }

    return (
      <div className={`w-full rounded-xl border-2 bg-card transition-colors ${
        isOverdue ? "border-destructive/40" : "border-border hover:border-primary/30"
      }`}>
        <div className="flex items-center gap-3 p-3.5">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            item.completed ? "bg-emerald-500/10 text-emerald-600"
            : isOverdue ? "bg-destructive/10 text-destructive"
            : "bg-primary/10 text-primary"
          }`}>
            {item.completed ? <CheckCircle2 className="w-5 h-5" />
              : isOverdue ? <AlertTriangle className="w-5 h-5" />
              : <NotebookPen className="w-5 h-5" />}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{lesson?.title || item.lesson_id}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {lesson?.level && <Badge variant="secondary" className="text-xs">Level {lesson.level}</Badge>}
              {item.due_date ? (
                <span className={`text-xs font-semibold flex items-center gap-1 ${
                  item.completed ? "text-muted-foreground"
                  : isOverdue ? "text-destructive"
                  : dleft === 0 ? "text-amber-600"
                  : "text-muted-foreground"
                }`}>
                  <Clock className="w-3 h-3" />
                  {dueLabel}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Assigned {new Date(item.assigned_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          {/* Right side: grade pill (graded), Done (completed, ungraded), or the
              Do-now action (still outstanding). */}
          {grade ? (
            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`px-2.5 py-1 rounded-lg border text-sm font-bold ${gradeClasses(grade.percent)}`}>
                {grade.label || "Graded"}
              </span>
              {hasFeedback && (
                <button
                  onClick={() => toggleFeedback(item.id)}
                  title="Teacher feedback"
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                >
                  <MessageSquareText className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : item.completed ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 shrink-0">
              <CheckCircle2 className="w-4 h-4" /> Done
            </span>
          ) : (
            <Button size="sm" onClick={() => navigate(`/lessons/${item.lesson_id}`)} className="shrink-0">
              <Play className="w-3.5 h-3.5 mr-1" /> {isOverdue ? "Finish" : "Do now"}
            </Button>
          )}
        </div>

        {/* Expandable teacher feedback (completed + graded work). */}
        {hasFeedback && feedbackOpen && (
          <div className="mx-3.5 mb-3.5 -mt-1 rounded-lg bg-muted/50 border border-border p-3 text-sm">
            <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
              <MessageSquareText className="w-3.5 h-3.5" /> Teacher feedback
            </p>
            <p className="text-foreground whitespace-pre-wrap">{grade!.feedback}</p>
          </div>
        )}
      </div>
    )
  }

  const StatChip = ({ label, value, tone }: { label: string; value: number; tone: "primary" | "destructive" | "emerald" }) => {
    const tones = {
      primary: "bg-primary/10 text-primary border-primary/20",
      destructive: "bg-destructive/10 text-destructive border-destructive/25",
      emerald: "bg-emerald-500/10 text-emerald-700 border-emerald-500/25",
    }
    return (
      <div className={`flex-1 min-w-[92px] rounded-xl border px-3 py-2.5 ${tones[tone]}`}>
        <p className="text-2xl font-display font-extrabold leading-none tabular-nums">{value}</p>
        <p className="text-xs font-semibold mt-1 opacity-80">{label}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-2">
            <NotebookPen className="w-7 h-7 text-primary" /> Homework
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Everything your teacher assigned as homework, with due dates and your grades.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : !hasClass ? (
          <div className="text-center py-20 text-muted-foreground">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="font-semibold">Join a class to get homework</p>
            <p className="text-sm mt-1">Ask your teacher for a class code, then add it in your profile.</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <NotebookPen className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="font-semibold">No homework yet</p>
            <p className="text-sm mt-1">
              When your teacher assigns homework, it'll show up here.{" "}
              <Link to="/lessons" className="text-primary underline">Browse Missions</Link>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* At-a-glance counts - the fast read when there's a lot to do. */}
            <div className="flex gap-2.5">
              <StatChip label="To do" value={overdue.length + upcoming.length} tone="primary" />
              <StatChip label="Overdue" value={overdue.length} tone="destructive" />
              <StatChip label="Completed" value={completed.length} tone="emerald" />
            </div>

            {overdue.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wide text-destructive flex items-center gap-2 mb-2.5">
                  <AlertTriangle className="w-4 h-4" /> Overdue
                  <Badge variant="secondary" className="ml-0.5">{overdue.length}</Badge>
                </h2>
                <div className="space-y-2">
                  {overdue.map((i) => <Row key={i.id} item={i} />)}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-lg font-display font-bold flex items-center gap-2 mb-2.5">
                <NotebookPen className="w-5 h-5 text-primary" /> Upcoming
                <Badge variant="secondary" className="ml-0.5">{upcoming.length}</Badge>
              </h2>
              {upcoming.length === 0 ? (
                <p className="text-sm text-muted-foreground px-1">
                  {overdue.length > 0 ? "Nothing else on deck — clear the overdue work above." : "You're all caught up. 🎉"}
                </p>
              ) : (
                <div className="space-y-2">
                  {upcoming.map((i) => <Row key={i.id} item={i} />)}
                </div>
              )}
            </section>

            {completed.length > 0 && (
              <section>
                <button
                  onClick={() => setShowCompleted((s) => !s)}
                  className="w-full flex items-center gap-2 mb-2.5 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-lg font-display font-bold">Completed</span>
                  <Badge variant="secondary" className="ml-0.5">{completed.length}</Badge>
                  <ChevronDown className={`w-5 h-5 ml-auto text-muted-foreground transition-transform ${showCompleted ? "" : "-rotate-90"}`} />
                </button>
                {showCompleted && (
                  <div className="space-y-2">
                    {completed.map((i) => <Row key={i.id} item={i} />)}
                  </div>
                )}
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
