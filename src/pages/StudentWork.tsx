import React, { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { lessons, unitInfo } from "@/data/lessons"
import { ACTIVITY_TITLES } from "@/lib/businessActivities"
import { BRIEF_BY_ID } from "@/lib/quarterlyBriefs"
import { BIZ_LAB_PARTS } from "@/data/bizLab"
import {
  ArrowLeft, BookOpen, Store, Briefcase, Save, Loader2,
  GraduationCap, Link as LinkIcon, ClipboardCheck, PenLine,
  Clock, Target, XCircle, Timer, CheckCircle, Gauge,
} from "lucide-react"
import { CONTROLLABLE_PAGES } from "@/lib/classSettings"

// ── Lookups ────────────────────────────────────────────────────────────────
const LESSON_BY_ID = new Map(lessons.map((l, i) => [l.id, { ...l, order: i }]))
const UNIT_BY_ID = new Map(unitInfo.map((u) => [u.id, u]))

// Flatten every Biz Lab submission spec into a submissionType -> spec lookup so
// we can label a student's saved answers with the original field prompts.
const SUBMISSION_SPEC = new Map<string, { title: string; fields: { key: string; label: string }[] }>()
for (const part of BIZ_LAB_PARTS) {
  for (const s of part.submissions ?? []) {
    SUBMISSION_SPEC.set(s.submissionType, {
      title: s.title,
      fields: [
        ...s.fields.map((f) => ({ key: f.key, label: f.label })),
        ...(s.linkField ? [{ key: s.linkField.key, label: s.linkField.label }] : []),
      ],
    })
  }
}

// ── Micro-business extraction (same logic the old inline dialog used) ────────
interface WorkField { label: string; value: string }
interface WorkSection { id: string; title: string; fields: WorkField[] }

const humanize = (key: string) =>
  key.replace(/^__/, "").replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).trim()
const activityTitle = (id: string): string =>
  ACTIVITY_TITLES[id] || BRIEF_BY_ID[id]?.title || humanize(id)
function fieldLabel(id: string, key: string): string {
  if (key === "__choice") return BRIEF_BY_ID[id]?.choice?.label || "Choice"
  const bf = BRIEF_BY_ID[id]?.fields.find((f) => f.key === key)
  return bf?.label || humanize(key)
}
function extractBizWork(activitiesData: Record<string, unknown> | undefined): WorkSection[] {
  if (!activitiesData) return []
  const sections: WorkSection[] = []
  for (const [id, fields] of Object.entries(activitiesData)) {
    if (!fields || typeof fields !== "object") continue
    const wf: WorkField[] = []
    for (const [key, val] of Object.entries(fields as Record<string, unknown>)) {
      if (key.startsWith("__") && key !== "__choice") continue
      if (typeof val === "string" && val.trim()) wf.push({ label: fieldLabel(id, key), value: val })
      else if (typeof val === "number") wf.push({ label: fieldLabel(id, key), value: String(val) })
    }
    if (wf.length) sections.push({ id, title: activityTitle(id), fields: wf })
  }
  return sections
}

const wordCount = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0)
const fmtDate = (s?: string) =>
  s ? new Date(s).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : ""

interface Reflection { lesson_id: string; prompt: string; response: string; updated_at: string }
interface Submission { type: string; title: string; fields: WorkField[]; link: string | null; updated_at: string }
interface ProgressRow { lesson_id: string; completed: boolean; completed_at: string | null; quiz_score: number | null }
interface LessonGrade { grade: string; feedback: string; percent: number | null }
interface ActivityEvent {
  kind: string
  route: string | null
  lesson_id: string | null
  question_id: string | null
  is_correct: boolean | null
  selected_index: number | null
  duration_ms: number | null
  meta: Record<string, unknown> | null
  created_at: string
}

interface AbilityRow {
  concept: string
  theta: number
  attempts: number
}

// Plain-language read on a theta value. Time is already baked into theta by the
// adaptive engine, so a high value means fast + accurate (genuine mastery) and a
// low one means slow + wrong (genuine struggle) - a fast guesser lands only
// mildly negative because careless-fast-wrong answers are discounted.
function abilityRead(theta: number): { label: string; color: string } {
  if (theta >= 1.0) return { label: "Mastering", color: "hsl(142 71% 40%)" }
  if (theta >= 0.3) return { label: "On track", color: "hsl(142 60% 45%)" }
  if (theta > -0.3) return { label: "Developing", color: "hsl(38 92% 45%)" }
  if (theta > -1.0) return { label: "Needs support", color: "hsl(25 90% 50%)" }
  return { label: "Struggling", color: "hsl(0 72% 51%)" }
}
// Position on a 0-100 bar, theta clamped to a readable [-2.5, 2.5] window.
function abilityBarPct(theta: number): number {
  return Math.round(((Math.max(-2.5, Math.min(2.5, theta)) + 2.5) / 5) * 100)
}

// Friendly labels for the routes we log. Falls back to a humanized path.
const ROUTE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/lessons": "Missions",
  ...Object.fromEntries(CONTROLLABLE_PAGES.map((p) => [p.route, p.label])),
  "/profile": "Profile",
}
const routeLabel = (route: string): string => {
  const base = "/" + (route.split("/")[1] || "")
  return ROUTE_LABELS[route] || ROUTE_LABELS[base] || humanize(route.replace(/^\//, "") || "Home")
}
const fmtDuration = (ms: number): string => {
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.round(s / 60)
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  return `${h}h ${m % 60}m`
}
const fmtDateTime = (s: string): string =>
  new Date(s).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })

export default function StudentWork() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  const navState = (location.state ?? {}) as { name?: string; className?: string }
  const [studentName, setStudentName] = useState(navState.name || "Student")

  const [loading, setLoading] = useState(true)
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [bizSections, setBizSections] = useState<WorkSection[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [events, setEvents] = useState<ActivityEvent[]>([])
  const [progress, setProgress] = useState<ProgressRow[]>([])
  const [grades, setGrades] = useState<Map<string, LessonGrade>>(new Map())
  // Per-topic adaptive ability (theta) - highest first.
  const [abilities, setAbilities] = useState<AbilityRow[]>([])

  // The lesson block the teacher is currently inspecting, + its editable grade.
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [gradePercent, setGradePercent] = useState("")
  const [feedback, setFeedback] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!userId) return
      setLoading(true)
      try {
        const [refRes, gsRes, subRes, lgRes, profRes, actRes, lpRes, saRes] = await Promise.all([
          (supabase as any).from("lesson_reflections").select("lesson_id, prompt, response, updated_at").eq("user_id", userId),
          (supabase as any).from("business_game_state").select("activities").eq("user_id", userId).maybeSingle(),
          (supabase as any).from("entrepreneurship_submissions").select("submission_type, content, link, updated_at").eq("user_id", userId),
          (supabase as any).from("lesson_grades").select("lesson_id, grade, feedback, grade_percent").eq("user_id", userId),
          (supabase as any).from("profiles").select("first_name, last_name").eq("id", userId).maybeSingle(),
          (supabase as any)
            .from("student_activity_events")
            .select("kind, route, lesson_id, question_id, is_correct, selected_index, duration_ms, meta, created_at")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .limit(4000),
          (supabase as any).from("lesson_progress").select("lesson_id, completed, completed_at, quiz_score").eq("user_id", userId),
          (supabase as any).from("student_ability").select("concept, theta, attempts").eq("user_id", userId),
        ])
        if (cancelled) return

        // Adaptive ability per topic (fails soft if the table isn't migrated yet),
        // strongest topic first.
        setAbilities(
          ((saRes?.data ?? []) as AbilityRow[])
            .slice()
            .sort((a, b) => b.theta - a.theta)
        )

        // Activity telemetry (fails soft if the table isn't migrated yet).
        setEvents((actRes?.data ?? []) as ActivityEvent[])
        setProgress((lpRes?.data ?? []) as ProgressRow[])

        // Per-lesson grades → map keyed by lesson id.
        const gm = new Map<string, LessonGrade>()
        for (const g of (lgRes?.data ?? []) as { lesson_id: string; grade: string | null; feedback: string | null; grade_percent: number | null }[]) {
          gm.set(g.lesson_id, { grade: g.grade || "", feedback: g.feedback || "", percent: g.grade_percent ?? null })
        }
        setGrades(gm)

        // Lesson reflections - sorted into curriculum order.
        const refs = ((refRes?.data ?? []) as Reflection[])
          .filter((r) => r.response?.trim())
          .sort((a, b) => (LESSON_BY_ID.get(a.lesson_id)?.order ?? 999) - (LESSON_BY_ID.get(b.lesson_id)?.order ?? 999))
        setReflections(refs)

        // Micro-business written activities.
        setBizSections(extractBizWork(gsRes?.data?.activities?.data))

        // Biz Lab submissions - labelled from the spec, internal keys skipped.
        const subs: Submission[] = ((subRes?.data ?? []) as { submission_type: string; content: Record<string, string>; link: string | null; updated_at: string }[])
          .map((row) => {
            const spec = SUBMISSION_SPEC.get(row.submission_type)
            const content = row.content || {}
            const fields: WorkField[] = spec
              ? spec.fields
                  .filter((f) => (content[f.key] ?? "").toString().trim())
                  .map((f) => ({ label: f.label, value: String(content[f.key]) }))
              : Object.entries(content)
                  .filter(([, v]) => (v ?? "").toString().trim())
                  .map(([k, v]) => ({ label: humanize(k), value: String(v) }))
            return {
              type: row.submission_type,
              title: spec?.title || humanize(row.submission_type),
              fields,
              link: row.link,
              updated_at: row.updated_at,
            }
          })
          .filter((s) => s.fields.length || s.link)
        setSubmissions(subs)

        if (profRes?.data && !navState.name) {
          const nm = `${profRes.data.first_name || ""} ${profRes.data.last_name || ""}`.trim()
          if (nm) setStudentName(nm)
        }
      } catch (e) {
        console.error("[StudentWork] load failed", e)
        toast({ title: "Couldn't load student work", variant: "destructive" })
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  // Populate the grade editor whenever the teacher opens a different lesson.
  useEffect(() => {
    const g = selectedLessonId ? grades.get(selectedLessonId) : undefined
    setGradePercent(g?.percent != null ? String(g.percent) : "")
    setFeedback(g?.feedback || "")
  }, [selectedLessonId, grades])

  // Save (upsert) the grade + feedback for the currently-selected lesson.
  const saveLessonGrade = async () => {
    if (!userId || !selectedLessonId) return
    // Clamp the entered percentage to 0-100; blank clears the grade.
    const raw = gradePercent.trim()
    const pct = raw === "" ? null : Math.max(0, Math.min(100, Math.round(Number(raw))))
    if (raw !== "" && Number.isNaN(Number(raw))) {
      toast({ title: "Enter a number 0-100", variant: "destructive" })
      return
    }
    // Keep the text `grade` column in sync as the display label (e.g. "92%").
    const gradeLabel = pct != null ? `${pct}%` : null
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { error } = await (supabase as any).from("lesson_grades").upsert({
        user_id: userId,
        lesson_id: selectedLessonId,
        grade: gradeLabel,
        grade_percent: pct,
        feedback: feedback.trim() || null,
        graded_by: user?.id,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id,lesson_id" })
      if (error) throw error
      setGrades((prev) => {
        const next = new Map(prev)
        next.set(selectedLessonId, { grade: gradeLabel || "", feedback: feedback.trim(), percent: pct })
        return next
      })
      toast({ title: "Grade saved", description: "The student can see this grade and feedback." })
    } catch (e) {
      console.error("[StudentWork] saveLessonGrade", e)
      toast({
        title: "Failed to save grade",
        description: (e as { message?: string })?.message || "Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const totals = useMemo(() => {
    const bizFields = bizSections.reduce((s, sec) => s + sec.fields.length, 0)
    const words =
      reflections.reduce((s, r) => s + wordCount(r.response), 0) +
      bizSections.reduce((s, sec) => s + sec.fields.reduce((t, f) => t + wordCount(f.value), 0), 0) +
      submissions.reduce((s, sub) => s + sub.fields.reduce((t, f) => t + wordCount(f.value), 0), 0)
    return {
      reflections: reflections.length,
      bizFields,
      submissions: submissions.length,
      words,
    }
  }, [reflections, bizSections, submissions])

  // ── Activity analytics derived from the event log ──
  const analytics = useMemo(() => {
    const questions = events.filter((e) => e.kind === "question_answered")
    const pageViews = events.filter((e) => e.kind === "page_view")
    const answered = questions.length
    const correct = questions.filter((q) => q.is_correct === true).length
    const accuracy = answered ? Math.round((correct / answered) * 100) : 0
    const avgMs = answered ? Math.round(questions.reduce((s, q) => s + (q.duration_ms || 0), 0) / answered) : 0

    // Active time = summed page dwell, each view capped at 5 min so an idle open
    // tab can't inflate it.
    const CAP = 5 * 60 * 1000
    const activeMs = pageViews.reduce((s, e) => s + Math.min(e.duration_ms || 0, CAP), 0)

    const lastActive = events[0]?.created_at
    const days = new Set(events.map((e) => new Date(e.created_at).toDateString())).size

    const pageMap = new Map<string, { visits: number; ms: number }>()
    for (const e of pageViews) {
      const r = e.route || "?"
      const cur = pageMap.get(r) || { visits: 0, ms: 0 }
      cur.visits += 1
      cur.ms += Math.min(e.duration_ms || 0, CAP)
      pageMap.set(r, cur)
    }
    const pages = Array.from(pageMap.entries())
      .map(([route, v]) => ({ route, ...v }))
      .sort((a, b) => b.ms - a.ms)

    const missed = questions
      .filter((q) => q.is_correct === false)
      .map((q) => ({
        key: (q.question_id || "") + q.created_at,
        lessonTitle: q.lesson_id ? LESSON_BY_ID.get(q.lesson_id)?.title || humanize(q.lesson_id) : "-",
        questionText:
          q.meta && typeof q.meta.questionText === "string" ? (q.meta.questionText as string) : q.question_id || "",
        timedOut: !!(q.meta && (q.meta as Record<string, unknown>).timedOut),
        durationMs: q.duration_ms || 0,
        at: q.created_at,
      }))

    return { hasData: events.length > 0, answered, correct, accuracy, avgMs, activeMs, lastActive, days, pages, missed }
  }, [events])

  // One block per lesson the student has touched (completed, answered a
  // question in, or reflected on), each with its own analytics + reflection.
  const lessonBlocks = useMemo(() => {
    const ids = new Set<string>()
    reflections.forEach((r) => ids.add(r.lesson_id))
    progress.forEach((p) => ids.add(p.lesson_id))
    events.forEach((e) => { if (e.kind === "question_answered" && e.lesson_id) ids.add(e.lesson_id) })

    return Array.from(ids)
      .map((id) => {
        const lesson = LESSON_BY_ID.get(id)
        const unit = lesson ? UNIT_BY_ID.get(lesson.unitId) : undefined
        const qs = events.filter((e) => e.kind === "question_answered" && e.lesson_id === id)
        const answered = qs.length
        const correct = qs.filter((q) => q.is_correct === true).length
        const accuracy = answered ? Math.round((correct / answered) * 100) : null
        const avgMs = answered ? Math.round(qs.reduce((s, q) => s + (q.duration_ms || 0), 0) / answered) : 0
        const missed = qs
          .filter((q) => q.is_correct === false)
          .map((q) => ({
            key: (q.question_id || "") + q.created_at,
            questionText: q.meta && typeof q.meta.questionText === "string" ? (q.meta.questionText as string) : q.question_id || "",
            timedOut: !!(q.meta && (q.meta as Record<string, unknown>).timedOut),
            durationMs: q.duration_ms || 0,
          }))
        const prog = progress.find((p) => p.lesson_id === id)
        return {
          id,
          title: lesson?.title || humanize(id),
          unitLabel: unit ? `Unit ${unit.unitNumber}` : undefined,
          order: lesson?.order ?? 999,
          answered, correct, accuracy, avgMs, missed,
          completed: !!prog?.completed,
          completedAt: prog?.completed_at || null,
          quizScore: prog?.quiz_score ?? null,
          reflection: reflections.find((r) => r.lesson_id === id) || null,
          gradePct: grades.get(id)?.percent ?? null,
          graded: grades.get(id)?.percent != null,
        }
      })
      .sort((a, b) => a.order - b.order)
  }, [reflections, progress, events, grades])

  const selectedBlock = lessonBlocks.find((b) => b.id === selectedLessonId) || null

  // Average percentage across every lesson the teacher has graded.
  const gradedPercents = Array.from(grades.values())
    .map((g) => g.percent)
    .filter((p): p is number => p != null)
  const gradeAvg = gradedPercents.length
    ? Math.round(gradedPercents.reduce((a, b) => a + b, 0) / gradedPercents.length)
    : null

  const isEmpty = !loading && lessonBlocks.length === 0 && bizSections.length === 0 && submissions.length === 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1.5 shrink-0">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Student work</p>
            <h1 className="font-display text-lg font-extrabold tracking-tight truncate leading-tight">{studentName}</h1>
          </div>
          {navState.className && (
            <span className="ml-auto hidden sm:inline-flex text-xs font-semibold text-muted-foreground truncate">
              {navState.className}
            </span>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6">
        {loading ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading written work…
          </div>
        ) : (
          <div className="space-y-6">
            {/* ── Report card: average of the teacher's per-lesson grades ── */}
            {gradeAvg != null && (
              <div className="rounded-2xl bg-gradient-primary text-white px-5 py-4 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <GraduationCap className="w-8 h-8 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider opacity-90">Grade average</p>
                    <p className="text-xs opacity-90">
                      Across {gradedPercents.length} graded lesson{gradedPercents.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
                <p className="text-4xl font-extrabold tabular-nums leading-none shrink-0">{gradeAvg}%</p>
              </div>
            )}

            {/* ── Overall snapshot ── */}
            {analytics.hasData && (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Clock, label: "Time on app", value: fmtDuration(analytics.activeMs) },
                    { icon: Target, label: "Accuracy", value: `${analytics.accuracy}%` },
                    { icon: ClipboardCheck, label: "Questions", value: String(analytics.answered) },
                    { icon: Timer, label: "Avg / question", value: analytics.avgMs ? fmtDuration(analytics.avgMs) : "-" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-2xl bg-card border border-border/60 px-4 py-3 shadow-sm">
                      <Icon className="w-4 h-4 text-primary" />
                      <p className="text-2xl font-extrabold tabular-nums mt-1.5 leading-none">{value}</p>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-1">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {analytics.correct}/{analytics.answered} correct · active on {analytics.days} day{analytics.days === 1 ? "" : "s"}
                  {analytics.lastActive && <> · last seen {fmtDateTime(analytics.lastActive)}</>}
                  {analytics.pages.length > 0 && <> · explored {analytics.pages.length} page{analytics.pages.length === 1 ? "" : "s"}</>}
                </p>
              </div>
            )}

            {isEmpty && (
              <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
                <ClipboardCheck className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <p className="font-semibold">No activity yet</p>
                <p className="text-sm mt-1">This student hasn't done any lessons or explored the app yet.</p>
              </div>
            )}

            {/* ── Lessons: click a block to see its analytics, reflection & grade ── */}
            {lessonBlocks.length > 0 && (
              <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
                {/* Lesson blocks */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <h2 className="font-display font-extrabold tracking-tight">Lessons</h2>
                    <span className="text-xs font-bold text-muted-foreground bg-muted rounded-full px-2 py-0.5">{lessonBlocks.length}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {lessonBlocks.map((b) => {
                      const active = b.id === selectedLessonId
                      return (
                        <button
                          key={b.id}
                          onClick={() => setSelectedLessonId(b.id)}
                          className={`text-left rounded-2xl border-2 p-4 transition shadow-sm ${active ? "border-primary bg-primary/5" : "border-border/60 bg-card hover:border-primary/50"}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
                              {b.unitLabel || "Lesson"}
                            </span>
                            {b.completed && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                          </div>
                          <p className="font-bold leading-snug mt-1 line-clamp-2">{b.title}</p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                            {b.accuracy !== null && <span className="tabular-nums">{b.accuracy}% correct</span>}
                            <span className="tabular-nums">{b.answered} Q</span>
                            {b.reflection && <span className="inline-flex items-center gap-1"><PenLine className="w-3 h-3" /> reflection</span>}
                          </div>
                          {b.graded ? (
                            <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-600">
                              <GraduationCap className="w-3.5 h-3.5" /> {b.gradePct}%
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-amber-600">
                              Not graded
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Micro-business + Biz Lab work (not tied to a lesson block) */}
                  {bizSections.length > 0 && (
                    <div className="mt-6">
                      <Section icon={Store} title="Micro-business" count={bizSections.length}>
                        {bizSections.map((sec, i) => (
                          <WorkCard key={sec.id + i} index={i} title={sec.title}>
                            <div className="space-y-3">
                              {sec.fields.map((f, k) => <FieldBlock key={k} label={f.label} value={f.value} />)}
                            </div>
                          </WorkCard>
                        ))}
                      </Section>
                    </div>
                  )}
                  {submissions.length > 0 && (
                    <div className="mt-6">
                      <Section icon={Briefcase} title="Biz Lab submissions" count={submissions.length}>
                        {submissions.map((sub, i) => (
                          <WorkCard key={sub.type + i} index={i} title={sub.title} date={sub.updated_at}>
                            <div className="space-y-3">
                              {sub.fields.map((f, k) => <FieldBlock key={k} label={f.label} value={f.value} />)}
                              {sub.link && (
                                <a href={sub.link} target="_blank" rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline break-all">
                                  <LinkIcon className="w-3.5 h-3.5 shrink-0" /> {sub.link}
                                </a>
                              )}
                            </div>
                          </WorkCard>
                        ))}
                      </Section>
                    </div>
                  )}
                  {/* Adaptive ability per topic - how the difficulty engine reads this student */}
                  {abilities.length > 0 && (
                    <div className="mt-6">
                      <Section icon={Gauge} title="Adaptive ability by topic" count={abilities.length}>
                        <div className="rounded-2xl bg-card border border-border/60 shadow-sm p-5 space-y-3">
                          <p className="text-xs text-muted-foreground -mt-1">
                            The engine tunes question difficulty from each answer's correctness <em>and</em> speed.
                            Higher = faster and more accurate.
                          </p>
                          {abilities.map((a) => {
                            const read = abilityRead(a.theta)
                            return (
                              <div key={a.concept}>
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <span className="text-sm font-semibold capitalize">{humanize(a.concept)}</span>
                                  <span className="text-xs font-bold" style={{ color: read.color }}>
                                    {read.label}
                                  </span>
                                </div>
                                <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                                  <div
                                    className="absolute inset-y-0 left-0 rounded-full"
                                    style={{ width: `${abilityBarPct(a.theta)}%`, backgroundColor: read.color }}
                                  />
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-0.5 tabular-nums">
                                  {a.attempts} answer{a.attempts === 1 ? "" : "s"}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </Section>
                    </div>
                  )}
                </div>

                {/* ── Selected lesson detail: analytics + reflection + grade ──
                    Cap the sticky panel to the viewport and let it scroll
                    internally - otherwise a tall panel (missed Qs + reflection +
                    grade form) clips its own bottom and the Save button is
                    unreachable. */}
                <div className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1">
                  {!selectedBlock ? (
                    <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                      <ClipboardCheck className="w-7 h-7 mx-auto mb-2 opacity-40" />
                      <p className="text-sm font-semibold">Pick a lesson</p>
                      <p className="text-xs mt-1">Click a lesson block to see its analytics, the student's reflection, and grade it.</p>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-card border border-border/60 shadow-sm p-5 space-y-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{selectedBlock.unitLabel || "Lesson"}</p>
                        <h3 className="font-display font-extrabold tracking-tight leading-tight">{selectedBlock.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {selectedBlock.completed
                            ? <>Completed{selectedBlock.completedAt ? ` · ${fmtDate(selectedBlock.completedAt)}` : ""}</>
                            : "In progress"}
                          {selectedBlock.quizScore !== null && <> · quiz {selectedBlock.quizScore}%</>}
                        </p>
                      </div>

                      {/* Per-lesson KPIs */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Questions", value: String(selectedBlock.answered) },
                          { label: "Accuracy", value: selectedBlock.accuracy !== null ? `${selectedBlock.accuracy}%` : "-" },
                          { label: "Avg time", value: selectedBlock.avgMs ? fmtDuration(selectedBlock.avgMs) : "-" },
                        ].map((s) => (
                          <div key={s.label} className="rounded-xl bg-muted/40 px-3 py-2 text-center">
                            <p className="text-lg font-extrabold tabular-nums leading-none">{s.value}</p>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-1">{s.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Missed questions for this lesson */}
                      <div>
                        <p className="text-xs font-semibold flex items-center gap-1.5 mb-1.5">
                          <XCircle className="w-3.5 h-3.5 text-destructive" /> Missed ({selectedBlock.missed.length})
                        </p>
                        {selectedBlock.missed.length === 0 ? (
                          <p className="text-xs text-muted-foreground">No wrong answers. 🎉</p>
                        ) : (
                          <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
                            {selectedBlock.missed.map((m) => (
                              <div key={m.key} className="rounded-lg border border-destructive/30 bg-destructive/5 px-2.5 py-1.5">
                                <p className="text-xs">{m.questionText}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{m.timedOut ? "timed out" : fmtDuration(m.durationMs)}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Written reflection */}
                      {selectedBlock.reflection && (
                        <div className="border-t pt-4">
                          <p className="text-xs font-semibold flex items-center gap-1.5 mb-1.5"><PenLine className="w-3.5 h-3.5 text-primary" /> Written reflection</p>
                          {selectedBlock.reflection.prompt && (
                            <p className="text-xs italic text-muted-foreground mb-1.5">"{selectedBlock.reflection.prompt}"</p>
                          )}
                          <Response text={selectedBlock.reflection.response} />
                        </div>
                      )}

                      {/* Grade this lesson */}
                      <div className="border-t pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <GraduationCap className="w-4 h-4 text-primary" />
                          <p className="font-bold text-sm">Grade this lesson</p>
                        </div>
                        <label className="text-xs font-semibold text-muted-foreground">Grade (%)</label>
                        <div className="relative mt-1 mb-3">
                          <Input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            max={100}
                            value={gradePercent}
                            onChange={(e) => setGradePercent(e.target.value)}
                            placeholder="e.g. 92"
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">%</span>
                        </div>
                        <label className="text-xs font-semibold text-muted-foreground">Feedback</label>
                        <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Feedback for this lesson…" rows={4} className="mt-1 mb-3 resize-none" />
                        <Button onClick={saveLessonGrade} disabled={saving} className="w-full gap-1.5">
                          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          {saving ? "Saving…" : "Save grade"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

/* ── Presentational sub-components ── */

function Section({ icon: Icon, title, count, children }: {
  icon: React.ComponentType<{ className?: string }>; title: string; count?: number; children: React.ReactNode
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-primary" />
        <h2 className="font-display font-extrabold tracking-tight">{title}</h2>
        {count !== undefined && (
          <span className="text-xs font-bold text-muted-foreground bg-muted rounded-full px-2 py-0.5">{count}</span>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function WorkCard({ index, eyebrow, title, date, children }: {
  index: number; eyebrow?: string; title: string; date?: string; children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
      className="rounded-2xl bg-card border border-border/60 shadow-sm p-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          {eyebrow && <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/70">{eyebrow}</p>}
          <h3 className="font-bold leading-tight">{title}</h3>
        </div>
        {date && <span className="text-[11px] text-muted-foreground shrink-0 mt-0.5">{fmtDate(date)}</span>}
      </div>
      {children}
    </motion.div>
  )
}

function FieldBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground mb-0.5">{label}</p>
      <Response text={value} />
    </div>
  )
}

function Response({ text }: { text: string }) {
  const words = wordCount(text)
  return (
    <div>
      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{text}</p>
      {words >= 15 && <p className="text-[10px] text-muted-foreground mt-1">{words} words</p>}
    </div>
  )
}
