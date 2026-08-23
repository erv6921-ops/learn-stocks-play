import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  NotebookPen, Play, Clock, CheckCircle2, BookOpen, Loader2,
  AlertTriangle, MessageSquareText, ChevronLeft, ChevronRight, CalendarDays,
} from "lucide-react"
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval,
  addMonths, subMonths, format, isSameMonth, isSameDay, isToday,
} from "date-fns"
import GameNav from "@/components/GameNav"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { lessons } from "@/data/lessons"
import { fmtDue, isOverdue as pastDue } from "@/lib/dueDate"

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

type Status = "done" | "overdue" | "today" | "upcoming"

const statusOf = (i: HomeworkItem): Status => {
  if (i.completed) return "done"
  if (i.due_date && pastDue(i.due_date, i.due_time)) return "overdue"
  if (i.due_date && isSameDay(new Date(`${i.due_date}T00:00:00`), new Date())) return "today"
  return "upcoming"
}

// Shared color language across the calendar chips + legend + detail cards.
const STATUS = {
  done: { dot: "bg-emerald-500", chip: "bg-emerald-500/15 text-emerald-700", bar: "bg-emerald-500", iconChip: "bg-emerald-500/12 text-emerald-600", label: "Done" },
  overdue: { dot: "bg-destructive", chip: "bg-destructive/15 text-destructive", bar: "bg-destructive", iconChip: "bg-destructive/12 text-destructive", label: "Overdue" },
  today: { dot: "bg-amber-500", chip: "bg-amber-500/20 text-amber-700", bar: "bg-amber-500", iconChip: "bg-amber-500/15 text-amber-600", label: "Due today" },
  upcoming: { dot: "bg-primary", chip: "bg-primary/12 text-primary", bar: "bg-primary", iconChip: "bg-primary/12 text-primary", label: "Upcoming" },
} as const

const gradeClasses = (pct: number | null) => {
  if (pct == null) return "bg-muted text-foreground border-border"
  if (pct >= 90) return "bg-emerald-500/15 text-emerald-700 border-emerald-500/40"
  if (pct >= 80) return "bg-green-500/15 text-green-700 border-green-500/40"
  if (pct >= 70) return "bg-amber-500/15 text-amber-700 border-amber-500/40"
  if (pct >= 60) return "bg-orange-500/15 text-orange-700 border-orange-500/40"
  return "bg-destructive/15 text-destructive border-destructive/40"
}

// The student's homework hub (replaces the old Challenges tab) - a month calendar
// where each homework lands on its due date. Classwork is excluded: it's handled
// by the forcing pop-up, not here.
export default function Homework() {
  const { user, isTeacher } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [hasClass, setHasClass] = useState(true)
  const [items, setItems] = useState<HomeworkItem[]>([])
  const [month, setMonth] = useState(() => startOfMonth(new Date()))
  const [selected, setSelected] = useState(() => new Date())
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
      .on("postgres_changes", { event: "*", schema: "public", table: "lesson_progress", filter: `user_id=eq.${user.id}` }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "lesson_grades", filter: `user_id=eq.${user.id}` }, () => load())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [load, user, isTeacher])

  // Homework grouped by due day (YYYY-MM-DD) for the calendar; undated work is
  // kept aside for its own "Anytime" list.
  const { byDate, undated, counts } = useMemo(() => {
    const byDate = new Map<string, HomeworkItem[]>()
    const undated: HomeworkItem[] = []
    let overdue = 0, done = 0
    for (const i of items) {
      const s = statusOf(i)
      if (s === "overdue") overdue++
      if (s === "done") done++
      if (i.due_date) {
        const arr = byDate.get(i.due_date) || []
        arr.push(i)
        byDate.set(i.due_date, arr)
      } else {
        undated.push(i)
      }
    }
    return { byDate, undated, counts: { total: items.length, overdue, done, todo: items.length - done } }
  }, [items])

  const weeks = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 0 })
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 0 })
    const days = eachDayOfInterval({ start, end })
    const out: Date[][] = []
    for (let i = 0; i < days.length; i += 7) out.push(days.slice(i, i + 7))
    return out
  }, [month])

  const selectedKey = format(selected, "yyyy-MM-dd")
  const selectedItems = (byDate.get(selectedKey) || []).slice().sort((a, b) =>
    (a.due_time || "23:59").localeCompare(b.due_time || "23:59")
  )

  const toggleFeedback = (id: string) =>
    setOpenFeedback((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  // A full homework card used in the day-detail panel and the Anytime list.
  const ItemCard = ({ item }: { item: HomeworkItem }) => {
    const lesson = lessons.find((l) => l.id === item.lesson_id)
    const s = statusOf(item)
    const c = STATUS[s]
    const grade = item.grade
    const hasFeedback = !!grade?.feedback
    const feedbackOpen = openFeedback.has(item.id)
    const timeText = item.due_date && item.due_time
      ? format(new Date(`${item.due_date}T${item.due_time}`), "h:mm a")
      : null

    return (
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${c.bar}`} />
        <div className="flex items-center gap-3.5 p-4 pl-5">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${c.iconChip}`}>
            {s === "done" ? <CheckCircle2 className="w-5 h-5" />
              : s === "overdue" ? <AlertTriangle className="w-5 h-5" />
              : <NotebookPen className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold truncate leading-tight">{lesson?.title || item.lesson_id}</p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {lesson?.level && (
                <span className="text-[11px] font-bold text-muted-foreground bg-muted rounded-full px-2 py-0.5">Level {lesson.level}</span>
              )}
              <span className={`text-[11px] font-bold flex items-center gap-1 rounded-full px-2 py-0.5 ${c.chip}`}>
                <Clock className="w-3 h-3" />
                {timeText ? `${c.label} · ${timeText}` : c.label}
              </span>
            </div>
          </div>
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
              variant={s === "overdue" ? "destructive" : "default"}
            >
              <Play className="w-3.5 h-3.5 mr-1" /> {s === "overdue" ? "Finish" : "Start"}
            </Button>
          )}
        </div>
        {hasFeedback && feedbackOpen && (
          <div className="mx-4 mb-4 ml-5 rounded-xl bg-muted/50 border border-border p-3 text-sm">
            <p className="text-xs font-bold text-muted-foreground mb-1 flex items-center gap-1">
              <MessageSquareText className="w-3.5 h-3.5" /> Teacher feedback
            </p>
            <p className="text-foreground whitespace-pre-wrap">{grade!.feedback}</p>
          </div>
        )}
      </div>
    )
  }

  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-3 md:px-6 py-6 md:py-8 max-w-6xl">
        {/* ── Header: title + at-a-glance stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl p-5 md:p-6 text-white mb-5 shadow-lg"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary)), var(--brand))" }}
        >
          <div className="absolute -right-10 -top-12 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="relative flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 backdrop-blur-sm">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-extrabold leading-none">Homework</h1>
                <p className="text-white/75 text-sm mt-1">Every assignment on its due date.</p>
              </div>
            </div>
            {!loading && hasClass && items.length > 0 && (
              <div className="flex gap-2.5">
                {[
                  { label: "To do", value: counts.todo },
                  { label: "Overdue", value: counts.overdue },
                  { label: "Done", value: counts.done },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white/12 backdrop-blur-sm px-4 py-2 text-center min-w-[74px]">
                    <p className="text-2xl font-display font-extrabold leading-none tabular-nums">{s.value}</p>
                    <p className="text-[11px] font-bold text-white/75 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
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
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-5 items-start">
            {/* ── Calendar ── */}
            <div className="rounded-3xl border border-border bg-card shadow-sm p-3 md:p-4">
              {/* Month nav */}
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-lg md:text-xl font-display font-extrabold">{format(month, "MMMM yyyy")}</h2>
                <div className="flex items-center gap-1.5">
                  <Button variant="outline" size="sm" className="rounded-xl font-bold" onClick={() => { setMonth(startOfMonth(new Date())); setSelected(new Date()) }}>
                    Today
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-xl h-9 w-9" onClick={() => setMonth((m) => subMonths(m, 1))}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-xl h-9 w-9" onClick={() => setMonth((m) => addMonths(m, 1))}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Weekday header */}
              <div className="grid grid-cols-7 mb-1">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="text-center text-[11px] md:text-xs font-bold text-muted-foreground py-1">{d}</div>
                ))}
              </div>

              {/* Weeks */}
              <div className="grid grid-cols-7 gap-1 md:gap-1.5">
                {weeks.flat().map((day) => {
                  const key = format(day, "yyyy-MM-dd")
                  const dayItems = byDate.get(key) || []
                  const inMonth = isSameMonth(day, month)
                  const today = isToday(day)
                  const isSel = isSameDay(day, selected)
                  const shown = dayItems.slice(0, 3)
                  return (
                    <button
                      key={key}
                      onClick={() => setSelected(day)}
                      className={`relative text-left rounded-xl border p-1.5 min-h-[64px] md:min-h-[96px] transition-colors overflow-hidden ${
                        isSel ? "border-primary ring-2 ring-primary/30 bg-primary/[0.04]"
                        : today ? "border-primary/50 bg-primary/[0.03]"
                        : "border-border hover:border-primary/40 hover:bg-muted/40"
                      } ${inMonth ? "" : "opacity-40"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs md:text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                          today ? "bg-primary text-primary-foreground" : "text-foreground"
                        }`}>
                          {format(day, "d")}
                        </span>
                        {dayItems.length > 0 && (
                          <span className="hidden md:flex items-center gap-0.5">
                            {Array.from(new Set(dayItems.map((i) => statusOf(i)))).slice(0, 3).map((s) => (
                              <span key={s} className={`w-1.5 h-1.5 rounded-full ${STATUS[s].dot}`} />
                            ))}
                          </span>
                        )}
                      </div>

                      {/* Desktop: mini chips. Mobile: a count badge. */}
                      <div className="hidden md:block mt-1 space-y-0.5">
                        {shown.map((i) => {
                          const lesson = lessons.find((l) => l.id === i.lesson_id)
                          const c = STATUS[statusOf(i)]
                          return (
                            <div
                              key={i.id}
                              onClick={(e) => { e.stopPropagation(); navigate(`/lessons/${i.lesson_id}`) }}
                              className={`truncate rounded-md px-1.5 py-0.5 text-[10px] font-bold cursor-pointer hover:brightness-95 ${c.chip}`}
                              title={lesson?.title || i.lesson_id}
                            >
                              {lesson?.title || i.lesson_id}
                            </div>
                          )
                        })}
                        {dayItems.length > 3 && (
                          <div className="text-[10px] font-bold text-muted-foreground px-1.5">+{dayItems.length - 3} more</div>
                        )}
                      </div>
                      {dayItems.length > 0 && (
                        <span className="md:hidden absolute bottom-1 right-1 text-[10px] font-extrabold text-primary bg-primary/12 rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
                          {dayItems.length}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 flex-wrap mt-3 px-1 text-[11px] font-semibold text-muted-foreground">
                {(["overdue", "today", "upcoming", "done"] as Status[]).map((s) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${STATUS[s].dot}`} /> {STATUS[s].label}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Side rail: selected day + anytime ── */}
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-display font-extrabold mb-2.5 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  {isToday(selected) ? "Today" : format(selected, "EEE, MMM d")}
                  <span className="text-xs font-extrabold text-muted-foreground bg-muted rounded-full px-2 py-0.5 tabular-nums">
                    {selectedItems.length}
                  </span>
                </h3>
                {selectedItems.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-border py-8 text-center">
                    <p className="text-2xl mb-1">🎈</p>
                    <p className="text-sm font-semibold text-muted-foreground">Nothing due this day.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {selectedItems.map((i) => <ItemCard key={i.id} item={i} />)}
                  </div>
                )}
              </div>

              {undated.length > 0 && (
                <div>
                  <h3 className="text-base font-display font-extrabold mb-2.5 flex items-center gap-2">
                    <NotebookPen className="w-4 h-4 text-primary" /> Anytime
                    <span className="text-xs font-extrabold text-muted-foreground bg-muted rounded-full px-2 py-0.5 tabular-nums">{undated.length}</span>
                  </h3>
                  <div className="space-y-2.5">
                    {undated.map((i) => <ItemCard key={i.id} item={i} />)}
                  </div>
                </div>
              )}

              {items.length === 0 && (
                <div className="text-center py-10 rounded-2xl border-2 border-dashed border-border">
                  <p className="font-extrabold">No homework yet 🎉</p>
                  <p className="text-sm text-muted-foreground mt-1">New homework shows up on the calendar.</p>
                  <Button asChild variant="outline" className="mt-4 rounded-xl font-bold">
                    <Link to="/lessons">Browse Missions</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
