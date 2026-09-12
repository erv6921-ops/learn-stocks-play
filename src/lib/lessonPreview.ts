// Shared helpers for the teacher lesson preview + question bank.
//
// Pure functions only (no React) so both the player pages and the teacher
// components can import them without tripping react-refresh's
// only-export-components rule.

import type { LessonSection, QuizQuestion } from "@/types"

export type LessonSource = "library" | "generated" | "upload"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** Library lesson ids look like "1.1" / "gulliver-lo-1"; generated ones are UUIDs. */
export function inferLessonSource(lessonId: string): LessonSource {
  return UUID_RE.test(lessonId) ? "generated" : "library"
}

/**
 * Human label for a section in the jump menu / question bank. Synthesized
 * (teacher-upload) lessons tag their two micro-checks by question id prefix:
 * `mini-<lessonId>` is the mid-lesson mini check-in, `micro-<lessonId>` the
 * end-of-teaching micro-check. Library lessons just get "Micro-check".
 * Repeated kinds are numbered ("Micro-check 1", "Micro-check 2").
 */
export function sectionLabel(section: LessonSection, index: number, all: LessonSection[]): string {
  const base = baseLabel(section)
  const sameKind = all.filter(s => baseLabel(s) === base)
  if (sameKind.length <= 1) return base
  const nth = all.slice(0, index + 1).filter(s => baseLabel(s) === base).length
  return `${base} ${nth}`
}

function baseLabel(section: LessonSection): string {
  switch (section.type) {
    case "concept": return section.title ? `Teach: ${truncate(section.title, 28)}` : "Teaching"
    case "micro-check": {
      const firstId = section.questions[0]?.id ?? ""
      if (firstId.startsWith("mini-")) return "Mini check-in"
      return "Micro-check"
    }
    case "activity-check": return "Activity check"
    case "interactive-diagram": return "Explore"
    case "scenario": return "Scenario"
    case "applied-question": return "Applied question"
    case "recap": return "Recap"
    case "mastery-check": return "Mastery check"
    default: return "Section"
  }
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s
}

/**
 * Difficulty tag text for a question. Two scales exist:
 *  - library QuizQuestion.difficulty is an IRT logit (b): negative = easier.
 *  - generated_questions.difficulty is 0.25 / 0.5 / 0.75 (easy/medium/hard).
 * Returns null when there's no difficulty to show.
 */
export function difficultyLabel(value: number | null | undefined, scale: "logit" | "unit"): string | null {
  if (value == null || !Number.isFinite(value)) return null
  if (scale === "unit") {
    if (value <= 0.34) return "Easy"
    if (value >= 0.66) return "Hard"
    return "Medium"
  }
  if (value <= -0.5) return "Easier"
  if (value >= 0.5) return "Harder"
  return "Medium"
}

/** Generated-question row as read from Supabase. Grounding fields are optional:
 *  they don't exist on older uploads (or at all yet), so every one is nullable. */
export interface GeneratedQuestionRow {
  id: string
  question_text: string
  options: string[]
  correct_answer: string
  explanation: string | null
  difficulty: number | null
  status?: string | null
  lesson_id?: string | null
  upload_id?: string | null
  evidence_quote?: string | null
  source_page?: number | string | null
  page_number?: number | string | null
  grounding_status?: string | null
}

const LETTERS = ["A", "B", "C", "D", "E", "F"]

/** Index of the correct option, tolerating "A" / "A)" / full-text answers. */
export function correctIndexOf(options: string[], correctAnswer: string | null | undefined): number {
  const ca = (correctAnswer ?? "").trim()
  const direct = options.findIndex(o => o.trim() === ca)
  if (direct >= 0) return direct
  const m = ca.match(/^([A-Fa-f])[).:\s]?$/)
  return m ? LETTERS.indexOf(m[1].toUpperCase()) : -1
}

/** Convert a generated_questions row into the player's QuizQuestion shape. */
export function generatedToQuizQuestion(g: GeneratedQuestionRow): QuizQuestion {
  return {
    id: g.id,
    question: g.question_text,
    options: g.options ?? [],
    correctAnswer: Math.max(0, correctIndexOf(g.options ?? [], g.correct_answer)),
    explanation: g.explanation ?? "",
    difficulty: g.difficulty ?? 0.5,
  }
}
