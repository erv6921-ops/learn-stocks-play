import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { NotebookPen, Play, Clock, CheckCircle2, BookOpen, Loader2 } from "lucide-react"
import GameNav from "@/components/GameNav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { lessons } from "@/data/lessons"

interface HomeworkItem {
  id: string
  lesson_id: string
  assigned_at: string
  due_date: string | null
  completed: boolean
}

// Format a DB date ("YYYY-MM-DD") as "Aug 25", parsed at local midnight so it
// never shifts a day. Returns days-until (negative = overdue) too.
const parseDue = (d: string) => new Date(`${d}T00:00:00`)
const fmtDue = (d: string) => parseDue(d).toLocaleDateString(undefined, { month: "short", day: "numeric" })
const daysUntil = (d: string) => {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  return Math.round((parseDue(d).getTime() - today.getTime()) / 86400000)
}

// The student's homework hub (replaces the old Challenges tab). Lists homework
// their teacher assigned - "Upcoming" (not yet finished) and "Completed" - drawn
// from class-level homework assignments crossed with the student's own lesson
// progress. Classwork is excluded: it's handled by the forcing pop-up, not here.
export default function Homework() {
  const { user, isTeacher } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [hasClass, setHasClass] = useState(true)
  const [items, setItems] = useState<HomeworkItem[]>([])

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

    const { data: assignments } = await supabase
      .from("assigned_lessons")
      .select("id, lesson_id, assigned_at, assignment_type, due_date")
      .in("class_id", classIds)
      .eq("assignment_type", "homework")
      .order("assigned_at", { ascending: false })

    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("completed", true)
    const done = new Set((progress || []).map((p) => p.lesson_id))

    // Collapse duplicate lesson assignments (a lesson could sit in two of the
    // student's classes) to one row, keeping the most recent.
    const seen = new Set<string>()
    const list: HomeworkItem[] = []
    for (const a of assignments || []) {
      if (seen.has(a.lesson_id)) continue
      seen.add(a.lesson_id)
      list.push({ id: a.id, lesson_id: a.lesson_id, assigned_at: a.assigned_at, due_date: a.due_date, completed: done.has(a.lesson_id) })
    }
    setItems(list)
    setLoading(false)
  }, [user, isTeacher])

  useEffect(() => {
    load()
    if (!user || isTeacher) return

    // Live: a new homework assignment, or the student finishing a lesson, keeps
    // the two lists in sync without a refresh.
    const channel = supabase
      .channel(`homework-${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "assigned_lessons" }, () => load())
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lesson_progress", filter: `user_id=eq.${user.id}` },
        () => load()
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [load, user, isTeacher])

  // Upcoming sorted by due date (soonest first); undated homework sinks to the
  // bottom so time-sensitive work is on top.
  const upcoming = items.filter((i) => !i.completed).sort((a, b) => {
    if (a.due_date && b.due_date) return a.due_date.localeCompare(b.due_date)
    if (a.due_date) return -1
    if (b.due_date) return 1
    return 0
  })
  const completed = items.filter((i) => i.completed)

  const Row = ({ item }: { item: HomeworkItem }) => {
    const lesson = lessons.find((l) => l.id === item.lesson_id)
    // Due-date label + urgency (only meaningful for not-yet-done work).
    const dleft = item.due_date ? daysUntil(item.due_date) : null
    const overdue = !item.completed && dleft !== null && dleft < 0
    let dueLabel = ""
    if (item.due_date) {
      dueLabel =
        dleft === 0 ? "Due today"
        : dleft === 1 ? "Due tomorrow"
        : dleft !== null && dleft < 0 ? `Overdue · was due ${fmtDue(item.due_date)}`
        : `Due ${fmtDue(item.due_date)}`
    }
    return (
      <div className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 bg-card ${
        overdue ? "border-destructive/40" : ""
      }`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          item.completed ? "bg-emerald-500/10 text-emerald-600" : "bg-primary/10 text-primary"
        }`}>
          {item.completed ? <CheckCircle2 className="w-5 h-5" /> : <NotebookPen className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{lesson?.title || item.lesson_id}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {lesson?.level && <Badge variant="secondary" className="text-xs">Level {lesson.level}</Badge>}
            {item.due_date ? (
              <span className={`text-xs font-semibold flex items-center gap-1 ${
                item.completed ? "text-muted-foreground" : overdue ? "text-destructive" : dleft === 0 ? "text-amber-600" : "text-foreground"
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
        {item.completed ? (
          <span className="text-xs font-semibold text-emerald-600 shrink-0">Done</span>
        ) : (
          <Button size="sm" onClick={() => navigate(`/lessons/${item.lesson_id}`)} className="shrink-0">
            <Play className="w-3.5 h-3.5 mr-1" /> Do now
          </Button>
        )}
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
            Homework your teacher assigned. Finish upcoming work whenever you're ready.
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
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-display font-bold flex items-center gap-2 mb-3">
                <NotebookPen className="w-5 h-5 text-primary" /> Upcoming
                <Badge variant="secondary" className="ml-1">{upcoming.length}</Badge>
              </h2>
              {upcoming.length === 0 ? (
                <p className="text-sm text-muted-foreground px-1">You're all caught up. 🎉</p>
              ) : (
                <div className="space-y-2">
                  {upcoming.map((i) => <Row key={i.id} item={i} />)}
                </div>
              )}
            </section>

            {completed.length > 0 && (
              <section>
                <h2 className="text-lg font-display font-bold flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Completed
                  <Badge variant="secondary" className="ml-1">{completed.length}</Badge>
                </h2>
                <div className="space-y-2">
                  {completed.map((i) => <Row key={i.id} item={i} />)}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
