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
} from "lucide-react"

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

  const [grade, setGrade] = useState("")
  const [feedback, setFeedback] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!userId) return
      setLoading(true)
      try {
        const [refRes, gsRes, subRes, grRes, profRes] = await Promise.all([
          (supabase as any).from("lesson_reflections").select("lesson_id, prompt, response, updated_at").eq("user_id", userId),
          (supabase as any).from("business_game_state").select("activities").eq("user_id", userId).maybeSingle(),
          (supabase as any).from("entrepreneurship_submissions").select("submission_type, content, link, updated_at").eq("user_id", userId),
          (supabase as any).from("business_grades").select("grade, feedback").eq("user_id", userId).maybeSingle(),
          (supabase as any).from("profiles").select("first_name, last_name").eq("id", userId).maybeSingle(),
        ])
        if (cancelled) return

        // Lesson reflections — sorted into curriculum order.
        const refs = ((refRes?.data ?? []) as Reflection[])
          .filter((r) => r.response?.trim())
          .sort((a, b) => (LESSON_BY_ID.get(a.lesson_id)?.order ?? 999) - (LESSON_BY_ID.get(b.lesson_id)?.order ?? 999))
        setReflections(refs)

        // Micro-business written activities.
        setBizSections(extractBizWork(gsRes?.data?.activities?.data))

        // Biz Lab submissions — labelled from the spec, internal keys skipped.
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

        if (grRes?.data) { setGrade(grRes.data.grade || ""); setFeedback(grRes.data.feedback || "") }
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

  const saveGrade = async () => {
    if (!userId) return
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { error } = await (supabase as any).from("business_grades").upsert({
        user_id: userId,
        grade: grade.trim() || null,
        feedback: feedback.trim() || null,
        graded_by: user?.id,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" })
      if (error) throw error
      toast({ title: "Grade saved", description: "The student can see your feedback." })
    } catch (e) {
      console.error("[StudentWork] saveGrade", e)
      toast({ title: "Failed to save grade", variant: "destructive" })
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

  const isEmpty = !loading && reflections.length === 0 && bizSections.length === 0 && submissions.length === 0

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
          <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
            {/* ── Written work ── */}
            <div className="space-y-6 min-w-0">
              {/* Summary chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: BookOpen, label: "Reflections", value: totals.reflections },
                  { icon: Store, label: "Biz answers", value: totals.bizFields },
                  { icon: Briefcase, label: "Lab submissions", value: totals.submissions },
                  { icon: PenLine, label: "Total words", value: totals.words },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl bg-card border border-border/60 px-4 py-3 shadow-sm">
                    <Icon className="w-4 h-4 text-primary" />
                    <p className="text-2xl font-extrabold tabular-nums mt-1.5 leading-none">{value}</p>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {isEmpty && (
                <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
                  <ClipboardCheck className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p className="font-semibold">No written work yet</p>
                  <p className="text-sm mt-1">This student hasn't submitted any reflections or projects.</p>
                </div>
              )}

              {/* Lesson reflections */}
              {reflections.length > 0 && (
                <Section icon={BookOpen} title="Lesson reflections" count={reflections.length}>
                  {reflections.map((r, i) => {
                    const lesson = LESSON_BY_ID.get(r.lesson_id)
                    const unit = lesson ? UNIT_BY_ID.get(lesson.unitId) : undefined
                    return (
                      <WorkCard key={r.lesson_id + i} index={i}
                        eyebrow={unit ? `Unit ${unit.unitNumber}` : undefined}
                        title={lesson?.title || humanize(r.lesson_id)}
                        date={r.updated_at}>
                        {r.prompt && <p className="text-sm italic text-muted-foreground mb-2">"{r.prompt}"</p>}
                        <Response text={r.response} />
                      </WorkCard>
                    )
                  })}
                </Section>
              )}

              {/* Micro-business */}
              {bizSections.length > 0 && (
                <Section icon={Store} title="Micro-business" count={bizSections.length}>
                  {bizSections.map((sec, i) => (
                    <WorkCard key={sec.id + i} index={i} title={sec.title}>
                      <div className="space-y-3">
                        {sec.fields.map((f, k) => (
                          <FieldBlock key={k} label={f.label} value={f.value} />
                        ))}
                      </div>
                    </WorkCard>
                  ))}
                </Section>
              )}

              {/* Biz Lab submissions */}
              {submissions.length > 0 && (
                <Section icon={Briefcase} title="Biz Lab submissions" count={submissions.length}>
                  {submissions.map((sub, i) => (
                    <WorkCard key={sub.type + i} index={i} title={sub.title} date={sub.updated_at}>
                      <div className="space-y-3">
                        {sub.fields.map((f, k) => (
                          <FieldBlock key={k} label={f.label} value={f.value} />
                        ))}
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
              )}
            </div>

            {/* ── Grading panel ── */}
            <div className="lg:sticky lg:top-20">
              <div className="rounded-2xl bg-card border border-border/60 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-tight">Assessment</p>
                    <p className="text-xs text-muted-foreground">Only visible to you & the student</p>
                  </div>
                </div>

                <label className="text-xs font-semibold text-muted-foreground">Grade</label>
                <Input value={grade} onChange={(e) => setGrade(e.target.value)}
                  placeholder="e.g. A, 92%, 4/5" className="mt-1 mb-4" />

                <label className="text-xs font-semibold text-muted-foreground">Feedback</label>
                <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Leave written feedback for the student…" rows={6} className="mt-1 mb-4 resize-none" />

                <Button onClick={saveGrade} disabled={saving} className="w-full gap-1.5">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? "Saving…" : "Save grade & feedback"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

/* ── Presentational sub-components ── */

function Section({ icon: Icon, title, count, children }: {
  icon: React.ComponentType<{ className?: string }>; title: string; count: number; children: React.ReactNode
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-primary" />
        <h2 className="font-display font-extrabold tracking-tight">{title}</h2>
        <span className="text-xs font-bold text-muted-foreground bg-muted rounded-full px-2 py-0.5">{count}</span>
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
