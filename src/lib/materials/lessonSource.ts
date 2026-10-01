// Turns a teacher's lesson selection into the grounding payload the
// generate-deck / generate-activity edge functions expect.
//
// Built-in lessons (text ids like "1.1", "psych-3") carry their teaching
// content in the client bundle, so we serialize it here and ship it. Generated
// lessons (UUID ids, public.lessons) are read server-side under the caller's
// RLS, so we only send their id + title.

import { getStructuredContent } from "@/data/lessonContent"
import { isGeneratedLessonId } from "@/lib/generatedLessons"
import type { SearchableLesson } from "@/lib/lessonSearch"
import type { LessonPayload } from "@/types/materials"
import type { LessonSection, QuizQuestion } from "@/types"

function serializeQuestion(q: QuizQuestion): string {
  const opts = (q.options ?? []).map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join("  ")
  const correct = typeof q.correctAnswer === "number" ? String.fromCharCode(65 + q.correctAnswer) : "?"
  const why = q.explanation ? ` Explanation: ${q.explanation}` : ""
  return `Q: ${q.question}\n  Options: ${opts}\n  Correct: ${correct}.${why}`
}

/** Flatten a built-in lesson's structured sections into plain grounding text. */
export function serializeSections(sections: LessonSection[]): string {
  const parts: string[] = []
  for (const s of sections) {
    switch (s.type) {
      case "concept": {
        parts.push(`## ${s.title}`)
        if (s.paragraphs?.length) parts.push(s.paragraphs.join("\n"))
        if (s.bullets?.length) parts.push(s.bullets.map((b) => `- ${b}`).join("\n"))
        if (s.realWorldExample) parts.push(`Real-world example: ${s.realWorldExample}`)
        break
      }
      case "scenario": {
        parts.push(`## Scenario: ${s.title}`)
        parts.push(s.narrative)
        if (s.details?.length) parts.push(s.details.map((d) => `- ${d}`).join("\n"))
        break
      }
      case "applied-question":
        parts.push(`## Applied question\n${serializeQuestion(s.question)}`)
        break
      case "micro-check":
        if (s.questions?.length) parts.push(`## Check\n${s.questions.map(serializeQuestion).join("\n")}`)
        break
      case "mastery-check":
        if (s.questions?.length) parts.push(`## Mastery questions\n${s.questions.map(serializeQuestion).join("\n")}`)
        break
      case "recap":
        if (s.takeaways?.length) parts.push(`## Key takeaways\n${s.takeaways.map((t) => `- ${t}`).join("\n")}`)
        break
      // activity-check / interactive-diagram carry no prose worth grounding on.
      default:
        break
    }
  }
  return parts.join("\n\n").trim()
}

/**
 * Build the per-lesson grounding payload for the given selection. `lessons` is
 * the same searchable list the finder uses (built-in + approved generated), so
 * we can resolve titles/units without another lookup.
 */
export function buildLessonPayloads(
  ids: string[],
  lessons: SearchableLesson[],
): LessonPayload[] {
  const byId = new Map(lessons.map((l) => [l.id, l]))
  const out: LessonPayload[] = []
  for (const id of ids) {
    const meta = byId.get(id)
    const title = meta?.title ?? id
    if (isGeneratedLessonId(id)) {
      out.push({ id, title, source: "generated" })
      continue
    }
    const structured = getStructuredContent(id)
    const text = structured ? serializeSections(structured.sections) : ""
    out.push({ id, title, unitTitle: meta?.unitTitle, source: "builtin", text })
  }
  return out
}
