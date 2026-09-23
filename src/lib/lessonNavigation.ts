// lessonNavigation - "what comes after this lesson?"
//
// The next lesson is the next one in the same unit, else the first lesson of
// the next unit in the same track (units ordered by orderIndex). It is only
// offered when it is unlocked under the same prerequisite rules the missions
// page (src/pages/Lessons.tsx) applies: a unit unlocks once every earlier unit
// in the track has 60% of its required lessons complete, and a required
// lesson unlocks once the required lesson before it in the unit is complete
// (validated lessons - skipped by the adaptive curriculum - are always open).

import { getLessonById, getLessonsByUnit, getUnitsByTrack } from "@/data/lessons"
import { getAdaptiveCurriculum, type AdaptiveUnitInfo } from "@/lib/curriculumEngine"
import type { Lesson, LessonProgress, UserProfile } from "@/types"
import { useApp } from "@/contexts/AppContext"

type Progress = Pick<LessonProgress, "lessonId" | "completed">[]
type Scores = Pick<UserProfile, "benchmarkCategoryScores" | "benchmarkScores" | "assessmentScore"> | null | undefined

function adaptiveFor(user: Scores): Map<string, AdaptiveUnitInfo> {
  return getAdaptiveCurriculum(
    user?.benchmarkCategoryScores || null,
    user?.benchmarkScores || null,
    user?.assessmentScore ?? null,
    50
  )
}

/** Same rules as Lessons.tsx's unlockedUnits + isLessonUnlocked. */
export function isLessonUnlocked(
  lesson: Lesson,
  progress: Progress,
  user: Scores,
  adaptive: Map<string, AdaptiveUnitInfo> = adaptiveFor(user)
): boolean {
  const done = (id: string) => progress.some(p => p.lessonId === id && p.completed)
  const track = lesson.track ?? "regular"
  const units = getUnitsByTrack(track).slice().sort((a, b) => a.orderIndex - b.orderIndex)
  const unit = units.find(u => u.id === lesson.unitId)
  if (!unit) return false

  // Unit gate: every earlier unit in the track is ≥60% through its required lessons.
  const firstOrder = units[0]?.orderIndex
  if (unit.orderIndex !== firstOrder) {
    const previous = units.filter(u => u.orderIndex < unit.orderIndex)
    const allPreviousComplete = previous.every(prev => {
      const a = adaptive.get(prev.id)
      if (!a) return false
      const required = a.lessons.filter(l => l.status === "required")
      if (required.length === 0) return true
      const completed = required.filter(l => done(l.lesson.id)).length
      return completed / required.length >= 0.6
    })
    if (!allPreviousComplete) return false
  }

  // Lesson gate within the unit.
  const a = adaptive.get(unit.id)
  if (!a) return false
  const required = a.lessons.filter(l => l.status === "required")
  const idx = required.findIndex(l => l.lesson.id === lesson.id)
  if (idx === -1) return !!a.lessons.find(l => l.lesson.id === lesson.id && l.status === "validated")
  if (idx === 0) return true
  return done(required[idx - 1].lesson.id)
}

/**
 * The id of the lesson to offer after `lessonId`, or null when there is none
 * or it is still locked. `lessonId` may be a legacy alias (LESSON_ID_ALIASES).
 */
export function getNextLessonId(lessonId: string | undefined, progress: Progress, user: Scores): string | null {
  const lesson = getLessonById(lessonId)
  if (!lesson) return null

  let next: Lesson | undefined
  const inUnit = getLessonsByUnit(lesson.unitId)
  const idx = inUnit.findIndex(l => l.id === lesson.id)
  if (idx !== -1 && idx < inUnit.length - 1) {
    next = inUnit[idx + 1]
  } else {
    const track = lesson.track ?? "regular"
    const units = getUnitsByTrack(track).slice().sort((a, b) => a.orderIndex - b.orderIndex)
    const unitIdx = units.findIndex(u => u.id === lesson.unitId)
    for (let i = unitIdx + 1; unitIdx !== -1 && i < units.length && !next; i++) {
      next = getLessonsByUnit(units[i].id)[0]
    }
  }
  if (!next) return null
  return isLessonUnlocked(next, progress, user) ? next.id : null
}

/** Hook form: reads progress + benchmark scores from AppContext. */
export function useNextLessonId(lessonId: string | undefined): string | null {
  const { user, lessonProgress } = useApp()
  return getNextLessonId(lessonId, lessonProgress, user)
}
