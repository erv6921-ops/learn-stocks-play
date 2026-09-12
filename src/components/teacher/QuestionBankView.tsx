import React, { useEffect, useMemo, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { lessons as libraryLessons } from "@/data/lessons"
import { getStructuredContent } from "@/data/lessonContent"
import { getQuizForLesson, getQuizForLessonByTier } from "@/data/lessonQuizzes"
import { PreviewOverlay } from "@/components/teacher/TeacherPreviewChrome"
import {
  difficultyLabel,
  correctIndexOf,
  type GeneratedQuestionRow,
  type LessonSource,
} from "@/lib/lessonPreview"
import type { LessonSection, QuizQuestion, ActivityCheck } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { Loader2, AlertCircle, CheckCircle2, ChevronDown, FileText, RefreshCw, ShieldAlert } from "lucide-react"

/**
 * "Question Bank": every question a student can be asked in a lesson, grouped
 * by where it appears - Mini check-in, Micro-check, Scenario, Mastery pool -
 * plus any generated_questions rows linked to the lesson (or, for an upload
 * that hasn't been assigned yet, the upload's pending pool).
 *
 * Each card shows the stem, every option with the correct one in green, the
 * explanation, and a difficulty tag when present. Generated questions that
 * carry grounding data get a collapsible "Source" line (evidence quote + page)
 * and a red "Not verified" tag when grounding_status = 'failed'. None of those
 * columns exist on older lessons, so every one is treated as optional.
 */
export interface QuestionBankViewProps {
  lessonId: string
  source: LessonSource
  lessonName?: string
  open: boolean
  onClose: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any
const LETTERS = ["A", "B", "C", "D", "E", "F"]

type DifficultyScale = "logit" | "unit"

/** One renderable question, whatever its origin. */
interface BankQuestion {
  id: string
  stem: string
  options: string[]
  correctIndex: number
  explanation: string
  difficulty: number | null
  difficultyScale: DifficultyScale
  evidenceQuote?: string | null
  sourcePage?: number | string | null
  groundingStatus?: string | null
}

interface BankGroup {
  key: string
  title: string
  hint?: string
  questions: BankQuestion[]
  /** Non-question content (scenario narrative, activity summary). */
  notes?: { title: string; body: string[] }[]
}

const fromQuiz = (q: QuizQuestion, scale: DifficultyScale): BankQuestion => ({
  id: q.id,
  stem: q.question,
  options: q.options,
  correctIndex: q.correctAnswer,
  explanation: q.explanation ?? "",
  difficulty: q.difficulty ?? null,
  difficultyScale: scale,
})

const fromGenerated = (g: GeneratedQuestionRow): BankQuestion => ({
  id: g.id,
  stem: g.question_text,
  options: g.options ?? [],
  correctIndex: correctIndexOf(g.options ?? [], g.correct_answer),
  explanation: g.explanation ?? "",
  difficulty: g.difficulty ?? null,
  difficultyScale: "unit",
  evidenceQuote: g.evidence_quote ?? null,
  sourcePage: g.source_page ?? g.page_number ?? null,
  groundingStatus: g.grounding_status ?? null,
})

/** Short, readable summary of a non-MCQ activity check. */
function activitySummary(a: ActivityCheck): string[] {
  switch (a.kind) {
    case "vocab-match": return a.pairs.map(p => `${p.term} — ${p.definition}`)
    case "categorize": return a.items.map(i => `${i.text} → bin ${i.bin + 1}`)
    case "two-truths-a-lie": return [a.prompt ?? "Which statement is false?", ...a.statements]
    default: {
      // sequence / odd-one-out / fill-blank all carry a prompt; list any array field after it.
      const rec = a as unknown as Record<string, unknown>
      const lines: string[] = []
      if (typeof rec.prompt === "string") lines.push(rec.prompt)
      for (const [k, v] of Object.entries(rec)) {
        if (k === "prompt" || k === "kind") continue
        if (Array.isArray(v)) lines.push(...v.map(x => (typeof x === "string" ? x : JSON.stringify(x))))
        else if (typeof v === "string") lines.push(`${k}: ${v}`)
      }
      return lines
    }
  }
}

/**
 * Group the sections of a lesson (library or synthesized) into the bank's
 * categories. `generatedById` lets mastery-pool questions that came from
 * generated_questions pick up their grounding fields.
 */
function groupSections(
  sections: LessonSection[],
  scale: DifficultyScale,
  generatedById: Map<string, GeneratedQuestionRow>,
): BankGroup[] {
  const mini: BankQuestion[] = []
  const micro: BankQuestion[] = []
  const microNotes: { title: string; body: string[] }[] = []
  const scenarioNotes: { title: string; body: string[] }[] = []
  const mastery: BankQuestion[] = []
  let masteryRequired: number | null = null

  const enrich = (q: BankQuestion): BankQuestion => {
    const g = generatedById.get(q.id)
    return g ? { ...fromGenerated(g), stem: q.stem || g.question_text } : q
  }

  sections.forEach(s => {
    switch (s.type) {
      case "micro-check": {
        const isMini = s.questions[0]?.id?.startsWith("mini-")
        ;(isMini ? mini : micro).push(...s.questions.map(q => enrich(fromQuiz(q, scale))))
        break
      }
      case "applied-question":
        micro.push(enrich(fromQuiz(s.question, scale)))
        break
      case "activity-check":
        microNotes.push({ title: `Activity: ${s.title ?? s.activity.kind}`, body: activitySummary(s.activity) })
        break
      case "scenario":
        scenarioNotes.push({ title: s.title, body: [s.narrative, ...(s.details ?? [])] })
        break
      case "mastery-check":
        mastery.push(...s.questions.map(q => enrich(fromQuiz(q, scale))))
        masteryRequired = s.requiredCorrect
        break
      default:
        break
    }
  })

  const groups: BankGroup[] = []
  if (mini.length) groups.push({ key: "mini", title: "Mini check-in", hint: "Asked mid-lesson, after the first teaching segments.", questions: mini })
  if (micro.length || microNotes.length) groups.push({ key: "micro", title: "Micro-check", hint: "Formative practice between teaching and the mastery check. Not logged as an attempt.", questions: micro, notes: microNotes })
  if (scenarioNotes.length) groups.push({ key: "scenario", title: "Scenario", hint: "Applied narrative the student reads before the mastery check.", questions: [], notes: scenarioNotes })
  if (mastery.length) {
    groups.push({
      key: "mastery",
      title: "Mastery pool",
      hint: masteryRequired != null
        ? `Students are served ${Math.min(masteryRequired, mastery.length)} of these, drawn adaptively, and need ${masteryRequired} correct to pass.`
        : undefined,
      questions: mastery,
    })
  }
  return groups
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({ lessonId, source, lessonName, open, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [title, setTitle] = useState(lessonName ?? "")
  const [sections, setSections] = useState<LessonSection[]>([])
  const [generated, setGenerated] = useState<GeneratedQuestionRow[]>([])
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!open) return
    let cancelled = false
    setError("")
    setLoading(true)
    ;(async () => {
      try {
        if (source === "library") {
          const lesson = libraryLessons.find(l => l.id === lessonId)
          setTitle(lesson?.title ?? lessonName ?? lessonId)
          setSections(getStructuredContent(lessonId)?.sections ?? [])
          setGenerated([])
        } else if (source === "generated") {
          // select("*") on generated_questions: the grounding columns are
          // optional and may not exist yet, so never name them in the select.
          const [lessonRes, gqRes] = await Promise.all([
            db.from("lessons").select("name, content").eq("id", lessonId).maybeSingle(),
            db.from("generated_questions").select("*").eq("lesson_id", lessonId).order("created_at", { ascending: true }),
          ])
          if (cancelled) return
          if (lessonRes.error) throw new Error(lessonRes.error.message)
          if (gqRes.error) throw new Error(gqRes.error.message)
          setTitle(lessonRes.data?.name ?? lessonName ?? "Lesson")
          setSections((lessonRes.data?.content?.sections as LessonSection[] | undefined) ?? [])
          setGenerated((gqRes.data as GeneratedQuestionRow[] | null) ?? [])
        } else {
          const { data, error: e } = await db
            .from("generated_questions")
            .select("*")
            .eq("upload_id", lessonId)
            .eq("status", "pending")
            .order("created_at", { ascending: true })
          if (cancelled) return
          if (e) throw new Error(e.message)
          setTitle(lessonName ?? "Lesson")
          setSections([])
          setGenerated((data as GeneratedQuestionRow[] | null) ?? [])
        }
      } catch (err) {
        if (cancelled) return
        console.error("Question bank load failed:", err)
        setError(err instanceof Error ? err.message : "Could not load this lesson's questions.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [open, lessonId, source, lessonName, reloadKey])

  const groups = useMemo<BankGroup[]>(() => {
    const byId = new Map(generated.map(g => [g.id, g]))
    const scale: DifficultyScale = source === "library" ? "logit" : "unit"
    const out = groupSections(sections, scale, byId)
    const shown = new Set(out.flatMap(g => g.questions.map(q => q.id)))

    // Generated rows not already surfaced through a section (e.g. a lesson
    // whose synthesis failed, or an upload that hasn't been assigned yet).
    const extraGenerated = generated.filter(g => !shown.has(g.id)).map(fromGenerated)
    if (extraGenerated.length) {
      out.push({
        key: "generated",
        title: source === "upload" ? "Generated questions (pending)" : "Generated questions linked to this lesson",
        hint: source === "upload"
          ? "Built from your upload. On assign these become the mastery pool (students need 4 correct)."
          : sections.length
            ? "Linked to this lesson but not placed in a section."
            : "No synthesized teaching content: students get a mastery check built from these (4 correct to pass).",
        questions: extraGenerated,
      })
      extraGenerated.forEach(q => shown.add(q.id))
    }

    // Library lessons pad the mastery pool from the lesson's wider quiz bank on
    // retries and by ability tier, so those questions can reach students too.
    if (source === "library") {
      const pool = new Map<string, QuizQuestion>()
      ;[
        ...getQuizForLesson(lessonId),
        ...getQuizForLessonByTier(lessonId, "beginner"),
        ...getQuizForLessonByTier(lessonId, "intermediate"),
        ...getQuizForLessonByTier(lessonId, "advanced"),
      ].forEach(q => { if (!shown.has(q.id) && !pool.has(q.id)) pool.set(q.id, q) })
      if (pool.size) {
        out.push({
          key: "pool",
          title: "Retry and ability pool",
          hint: "Extra questions the mastery check can draw on for retries and for students at other ability levels.",
          questions: Array.from(pool.values()).map(q => fromQuiz(q, "logit")),
        })
      }
    }
    return out
  }, [sections, generated, source, lessonId])

  const totalQuestions = groups.reduce((n, g) => n + g.questions.length, 0)

  return (
    <PreviewOverlay
      open={open}
      onClose={onClose}
      title={`Question Bank: ${title || "Lesson"}`}
      subtitle={loading ? "Loading…" : `${totalQuestions} question${totalQuestions === 1 ? "" : "s"} across ${groups.length} group${groups.length === 1 ? "" : "s"}`}
    >
      <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-6">
        {loading && (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-600" /> Loading questions…
          </div>
        )}

        {!loading && error && (
          <div className="space-y-3 rounded-lg border border-red-200 bg-red-50/60 p-4 dark:border-red-900 dark:bg-red-950/40">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => setReloadKey(k => k + 1)}>
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Retry
            </Button>
          </div>
        )}

        {!loading && !error && groups.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">No questions found for this lesson.</p>
        )}

        {!loading && !error && groups.map(group => (
          <section key={group.key} className="space-y-3">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground">
                {group.title}
                <Badge variant="outline" className="text-xs font-normal normal-case tracking-normal">
                  {group.questions.length} question{group.questions.length === 1 ? "" : "s"}
                </Badge>
              </h3>
              {group.hint && <p className="mt-0.5 text-xs text-muted-foreground">{group.hint}</p>}
            </div>

            {group.notes?.map((note, i) => (
              <div key={`note-${i}`} className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-sm font-medium text-foreground">{note.title}</p>
                <ul className="mt-2 space-y-1">
                  {note.body.map((line, j) => (
                    <li key={j} className="text-sm leading-relaxed text-muted-foreground">{line}</li>
                  ))}
                </ul>
              </div>
            ))}

            {group.questions.map((q, qi) => (
              <QuestionCard key={`${group.key}-${q.id}-${qi}`} index={qi + 1} q={q} />
            ))}
          </section>
        ))}
      </div>
    </PreviewOverlay>
  )
}

function QuestionCard({ index, q }: { index: number; q: BankQuestion }) {
  const [sourceOpen, setSourceOpen] = useState(false)
  const diff = difficultyLabel(q.difficulty, q.difficultyScale)
  const notVerified = (q.groundingStatus ?? "").toLowerCase() === "failed"
  const hasSource = !!(q.evidenceQuote || q.sourcePage != null)

  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-foreground">
          <span className="mr-1.5 text-muted-foreground">{index}.</span>
          {q.stem}
        </p>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
          {diff && <Badge variant="outline" className="text-[11px]">{diff}</Badge>}
          {notVerified && (
            <Badge className="gap-1 border-red-200 bg-red-100 text-[11px] text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/60 dark:text-red-300">
              <ShieldAlert className="h-3 w-3" /> Not verified
            </Badge>
          )}
        </div>
      </div>

      <ul className="space-y-1.5">
        {q.options.map((opt, oi) => {
          const correct = oi === q.correctIndex
          return (
            <li
              key={oi}
              className={cn(
                "flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
                correct
                  ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100"
                  : "border-border bg-muted/30 text-muted-foreground",
              )}
            >
              <span className="font-semibold">{LETTERS[oi] ?? oi + 1}.</span>
              <span className="flex-1">{opt}</span>
              {correct && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />}
            </li>
          )
        })}
        {q.correctIndex < 0 && (
          <li className="text-xs text-amber-700 dark:text-amber-300">Correct answer could not be matched to an option.</li>
        )}
      </ul>

      {q.explanation ? (
        <p className="rounded-md bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Explanation: </span>{q.explanation}
        </p>
      ) : (
        <p className="text-xs italic text-muted-foreground">No explanation provided.</p>
      )}

      {hasSource && (
        <Collapsible open={sourceOpen} onOpenChange={setSourceOpen}>
          <CollapsibleTrigger className="flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", sourceOpen && "rotate-180")} />
            <FileText className="h-3.5 w-3.5" /> Source
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-1.5 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
            From your material{q.sourcePage != null && q.sourcePage !== "" ? `, p. ${q.sourcePage}` : ""}
            {q.evidenceQuote ? <>: <q className="italic text-foreground">{q.evidenceQuote}</q></> : "."}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  )
}

export default QuestionBankView
