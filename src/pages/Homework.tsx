import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  NotebookPen, Play, Clock, CheckCircle2, BookOpen, Loader2,
  AlertTriangle, ChevronDown, MessageSquareText, Sparkles, Trophy,
} from "lucide-react"
import GameNav from "@/components/GameNav"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { lessons } from "@/data/lessons"
import { dueLabel as fmtDueLabel, isOverdue as pastDue } from "@/lib/dueDate"

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
  due_time: string | null
  completed: boolean
  grade: Grade | null
}

// Sort dated work by due date+time (soonest first); undated sinks to the bottom.
const byDue = (a: HomeworkItem, b: HomeworkItem) => {
  const ak = a.due_date ? `${a.due_date}T${a.due_time ?? "23:59"}` : ""
  const bk = b.due_date ? `${b.due_date}T${b.due_time ?? "23:59"}` : ""
  if (ak && bk) return ak.localeCompare(bk)
  if (ak) return -1
  if (bk) return 1
  return 0
}

// Grade → color family (green good, amber ok, red weak). Falls back to neutral
// when the teacher left a text grade with no percent.
const gradeClasses = (pct: number | null) => {
  if (pct == null) return "bg-muted text-foreground border-border"
  if (pct >= 90) return "bg-emerald-500/15 text-emerald-700 border-emerald-500/40"
  if (pct >= 80) return "bg-green-500/15 text-green-700 border-green-500/40"
  if (pct >= 70) return "bg-amber-500/15 text-amber-700 border-amber-500/40"
  if (pct >= 60) return "bg-orange-500/15 text-orange-700 border-orange-500/40"
  return "bg-destructive/15 text-destructive border-destructive/40"
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
        .select("id, lesson_id, assigned_at, assignment_type, due_date, due_time")
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
        due_time: a.due_time,
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
  // impossible to miss even in a long list. Each bucket is sorted by due date/time
  // (soonest first); undated work sinks below dated work.
  const { overdue, upcoming, completed } = useMemo(() => {
    const notDone = items.filter((i) => !i.completed)
    return {
      overdue: notDone.filter((i) => i.due_date && pastDue(i.due_date, i.due_time)).sort(byDue),
      upcoming: notDone.filter((i) => !i.due_date || !pastDue(i.due_date, i.due_time)).sort(byDue),
      completed: items.filter((i) => i.completed),
    }
  }, [items])

  const todo = overdue.length + upcoming.length
  const donePct = items.length ? Math.round((completed.length / items.length) * 100) : 0

  const toggleFeedback = (id: string) =>
    setOpenFeedback((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const Row = ({ item, index }: { item: HomeworkItem; index: number }) => {
    const lesson = lessons.find((l) => l.id === item.lesson_id)
    const isOverdue = !item.completed && !!item.due_date && pastDue(item.due_date, item.due_time)
    const dueToday = !!item.due_date && !isOverdue && !item.completed &&
      new Date(`${item.due_date}T00:00:00`).toDateString() === new Date().toDateString()
    const grade = item.grade
    const hasFeedback = !!grade?.feedback
    const feedbackOpen = openFeedback.has(item.id)
    const dueText = item.due_date ? fmtDueLabel(item.due_date, item.due_time, { completed: item.completed }) : "No due date"

    // One accent color drives the left bar, icon chip, and due pill so each card
    // reads as a single status at a glance.
    const accent =
      item.completed ? { bar: "bg-emerald-500", chip: "bg-emerald-500/12 text-emerald-600", pill: "bg-emerald-500/10 text-emerald-700" }
      : isOverdue ? { bar: "bg-destructive", chip: "bg-destructive/12 text-destructive", pill: "bg-destructive/12 text-destructive" }
      : dueToday ? { bar: "bg-amber-500", chip: "bg-amber-500/15 text-amber-600", pill: "bg-amber-500/15 text-amber-700" }
      : { bar: "bg-primary", chip: "bg-primary/12 text-primary", pill: "bg-muted text-muted-foreground" }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: Math.min(index * 0.035, 0.3) }}
        className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      >
        {/* status accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accent.bar}`} />

        <div className="flex items-center gap-3.5 p-4 pl-5">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${accent.chip}`}>
            {item.completed ? <CheckCircle2 className="w-5 h-5" />
              : isOverdue ? <AlertTriangle className="w-5 h-5" />
              : <NotebookPen className="w-5 h-5" />}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold truncate leading-tight">{lesson?.title || item.lesson_id}</p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {lesson?.level && (
                <span className="text-[11px] font-bold text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                  Level {lesson.level}
                </span>
              )}
              <span className={`text-[11px] font-bold flex items-center gap-1 rounded-full px-2 py-0.5 ${accent.pill}`}>
                <Clock className="w-3 h-3" />
                {dueText}
              </span>
            </div>
          </div>

          {/* Right side: grade pill (graded), Done (completed, ungraded), or the
              Do-now action (still outstanding). */}
          {grade ? (
            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`px-3 py-1.5 rounded-xl border text-sm font-extrabold tabular-nums ${gradeClasses(grade.percent)}`}>
                {grade.label || "Graded"}
              </span>
              {hasFeedback && (
                <button
                  onClick={() => toggleFeedback(item.id)}
                  title="Teacher feedback"
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                    feedbackOpen ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  <MessageSquareText className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : item.completed ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 rounded-full px-3 py-1.5 shrink-0">
              <CheckCircle2 className="w-4 h-4" /> Done
            </span>
          ) : (
            <Button
              size="sm"
              onClick={() => navigate(`/lessons/${item.lesson_id}`)}
              className="shrink-0 press-scale rounded-xl font-bold"
              variant={isOverdue ? "destructive" : "default"}
            >
              <Play className="w-3.5 h-3.5 mr-1" /> {isOverdue ? "Finish" : "Start"}
            </Button>
          )}
        </div>

        {/* Expandable teacher feedback (completed + graded work). */}
        {hasFeedback && feedbackOpen && (
          <div className="mx-4 mb-4 ml-5 rounded-xl bg-muted/50 border border-border p-3 text-sm">
            <p className="text-xs font-bold text-muted-foreground mb-1 flex items-center gap-1">
              <MessageSquareText className="w-3.5 h-3.5" /> Teacher feedback
            </p>
            <p className="text-foreground whitespace-pre-wrap">{grade!.feedback}</p>
          </div>
        )}
      </motion.div>
    )
  }

  const SectionHeader = ({
    icon: Icon, title, count, tone,
  }: { icon: typeof NotebookPen; title: string; count: number; tone: "primary" | "destructive" | "emerald" }) => {
    const tones = {
      primary: "bg-primary/12 text-primary",
      destructive: "bg-destructive/12 text-destructive",
      emerald: "bg-emerald-500/12 text-emerald-600",
    }
    return (
      <div className="flex items-center gap-2.5 mb-3">
        <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${tones[tone]}`}>
          <Icon className="w-[18px] h-[18px]" />
        </span>
        <h2 className="text-lg font-display font-extrabold">{title}</h2>
        <span className="text-xs font-extrabold text-muted-foreground bg-muted rounded-full px-2.5 py-1 tabular-nums">{count}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-3xl">
        {/* ── Hero: gradient banner with progress + at-a-glance stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl p-5 md:p-6 text-white mb-6 shadow-lg"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary)), var(--brand))" }}
        >
          {/* soft glow flourishes */}
          <div className="absolute -right-10 -top-12 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-8 -bottom-12 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 backdrop-blur-sm">
              <NotebookPen className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-display font-extrabold leading-none">My Homework</h1>
              <p className="text-white/75 text-sm mt-1">Stay on top of what your teacher assigned.</p>
            </div>
          </div>

          {!loading && hasClass && items.length > 0 && (
            <div className="relative mt-5">
              {/* progress bar */}
              <div className="flex items-center justify-between text-xs font-bold text-white/85 mb-1.5">
                <span className="flex items-center gap-1">
                  {donePct === 100 ? <><Trophy className="w-3.5 h-3.5 text-gold" /> All done — nice work!</> : <><Sparkles className="w-3.5 h-3.5 text-gold" /> {completed.length} of {items.length} done</>}
                </span>
                <span className="tabular-nums">{donePct}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${donePct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>

              {/* stat trio */}
              <div className="grid grid-cols-3 gap-2.5 mt-4">
                {[
                  { label: "To do", value: todo },
                  { label: "Overdue", value: overdue.length },
                  { label: "Completed", value: completed.length },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white/12 backdrop-blur-sm px-3 py-2.5 text-center">
                    <p className="text-2xl font-display font-extrabold leading-none tabular-nums">{s.value}</p>
                    <p className="text-[11px] font-bold text-white/75 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : !hasClass ? (
          <div className="text-center py-16 rounded-3xl border-2 border-dashed border-border">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <p className="font-extrabold text-lg">Join a class to get homework</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
              Ask your teacher for a class code, then add it in your profile.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border-2 border-dashed border-border">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <NotebookPen className="w-8 h-8" />
            </div>
            <p className="font-extrabold text-lg">No homework yet 🎉</p>
            <p className="text-sm text-muted-foreground mt-1">
              When your teacher assigns homework, it'll show up here.
            </p>
            <Button asChild variant="outline" className="mt-4 rounded-xl font-bold">
              <Link to="/lessons">Browse Missions</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-7">
            {overdue.length > 0 && (
              <section>
                <SectionHeader icon={AlertTriangle} title="Overdue" count={overdue.length} tone="destructive" />
                <div className="space-y-2.5">
                  {overdue.map((i, idx) => <Row key={i.id} item={i} index={idx} />)}
                </div>
              </section>
            )}

            <section>
              <SectionHeader icon={NotebookPen} title="Upcoming" count={upcoming.length} tone="primary" />
              {upcoming.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-border py-8 text-center">
                  <p className="text-2xl mb-1">{overdue.length > 0 ? "⏰" : "🎉"}</p>
                  <p className="text-sm font-semibold text-muted-foreground">
                    {overdue.length > 0 ? "Clear the overdue work above." : "You're all caught up!"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {upcoming.map((i, idx) => <Row key={i.id} item={i} index={idx} />)}
                </div>
              )}
            </section>

            {completed.length > 0 && (
              <section>
                <button
                  onClick={() => setShowCompleted((s) => !s)}
                  className="w-full flex items-center gap-2.5 mb-3 group"
                >
                  <span className="w-8 h-8 rounded-xl bg-emerald-500/12 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-[18px] h-[18px]" />
                  </span>
                  <h2 className="text-lg font-display font-extrabold">Completed</h2>
                  <span className="text-xs font-extrabold text-muted-foreground bg-muted rounded-full px-2.5 py-1 tabular-nums">{completed.length}</span>
                  <ChevronDown className={`w-5 h-5 ml-auto text-muted-foreground transition-transform ${showCompleted ? "" : "-rotate-90"}`} />
                </button>
                {showCompleted && (
                  <div className="space-y-2.5">
                    {completed.map((i, idx) => <Row key={i.id} item={i} index={idx} />)}
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
