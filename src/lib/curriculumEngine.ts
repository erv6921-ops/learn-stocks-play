/**
 * Adaptive Curriculum Engine
 * 
 * Dynamically restructures lesson flow per unit based on
 * the user's Benchmark Assessment results. Each unit adapts
 * independently - a user can be advanced in one area and
 * foundational in another.
 */

import { Lesson, MasteryTier } from "@/types"
import { unitInfo, getLessonsByUnit } from "@/data/lessons"
import { CategoryScore } from "@/data/assessmentQuestions"

// Assessment category → unit category mapping
// Maps benchmark categories directly to unit categories
const CATEGORY_TO_UNIT_CATEGORIES: Record<string, string[]> = {
  "psychology-of-money": ["psychology-of-money"],
  "income-earning": ["income-earning"],
  "budgeting": ["budgeting"],
  "banking": ["banking"],
  "credit-debt": ["credit-debt"],
  "investing-intro": ["investing-intro"],
  "stocks": ["stocks"],
  "stock-market": ["stock-market"],
  "portfolio": ["portfolio"],
  "etfs-funds": ["etfs-funds"],
  "bonds": ["bonds"],
  "financial-statements": ["financial-statements"],
  "financial-ratios": ["financial-ratios"],
  "valuation": ["valuation"],
  "behavioral-finance": ["behavioral-finance"],
  "bubbles-crashes": ["bubbles-crashes"],
  "macro-economics": ["macro-economics"],
  "economic-indicators": ["economic-indicators"],
  "entrepreneurship": ["entrepreneurship"],
  "competitive-strategy": ["competitive-strategy"],
  "options": ["options"],
  "alternatives": ["alternatives"],
  "financial-planning": ["financial-planning"],
  "simulations": ["simulations"],
  "investing-fundamentals": ["investing-fundamentals"],
  "pestel-analysis": ["pestel-analysis"],
  "business-ethics": ["business-ethics"],
}

export interface BenchmarkScores {
  [topic: string]: number // 0 or 1 (legacy) or CategoryScore percent (new)
}

// Mastery tiers ordered by depth
const TIER_ORDER: MasteryTier[] = ["explorer", "builder", "strategist", "investor", "capital-architect"]

export type LessonAdaptiveStatus = "required" | "validated" | "locked"

export interface AdaptiveLessonInfo {
  lesson: Lesson
  status: LessonAdaptiveStatus
}

export interface AdaptiveUnitInfo {
  unitId: string
  benchmarkScore: number // 0-100 normalized
  entryDepth: string // "Foundational" | "Applied" | "Strategic" | "Advanced" | "Advanced+"
  lessons: AdaptiveLessonInfo[]
  requiredCount: number
  validatedCount: number
  totalCount: number
}

/**
 * Get the benchmark score for a specific unit category (0-100).
 * Now uses direct category mapping from expanded benchmark.
 */
function getUnitBenchmarkScore(
  unitCategories: string[],
  categoryScores: Record<string, CategoryScore> | null,
  benchmarkScores: BenchmarkScores | null,
  overallScore: number | null,
  totalQuestions: number
): number {
  // Try new expanded category scores first
  if (categoryScores) {
    let totalCorrect = 0
    let totalQ = 0
    for (const cat of unitCategories) {
      if (categoryScores[cat]) {
        totalCorrect += categoryScores[cat].correct
        totalQ += categoryScores[cat].total
      }
    }
    if (totalQ > 0) {
      return Math.round((totalCorrect / totalQ) * 100)
    }
  }

  // Fall back to legacy topic-based scores
  if (benchmarkScores) {
    for (const [benchCat, unitCats] of Object.entries(CATEGORY_TO_UNIT_CATEGORIES)) {
      if (unitCategories.some(c => unitCats.includes(c))) {
        if (benchCat in benchmarkScores) {
          const val = benchmarkScores[benchCat]
          return typeof val === 'number' && val <= 1 ? val * 100 : val
        }
      }
    }
  }

  // Fall back to overall score
  if (overallScore != null && totalQuestions > 0) {
    return Math.round((overallScore / totalQuestions) * 100)
  }

  return -1
}

/**
 * Determine entry depth label based on benchmark score
 */
function getEntryDepth(score: number): string {
  if (score < 0) return "Foundational" // No benchmark
  if (score >= 85) return "Advanced+"
  if (score >= 70) return "Advanced"
  if (score >= 55) return "Strategic"
  if (score >= 35) return "Applied"
  return "Foundational"
}

/**
 * Determine which tier threshold to skip up to, based on score.
 */
function getSkipTierIndex(score: number): number {
  if (score >= 85) return 3 // Skip explorer + builder + strategist
  if (score >= 70) return 2 // Skip explorer + builder
  if (score >= 55) return 1 // Skip explorer
  if (score >= 35) return 1 // Skip some explorer
  return 0 // Start from beginning
}

/**
 * Core adaptive engine: compute adaptive lesson list for a unit.
 */
export function getAdaptiveUnit(
  unitId: string,
  categoryScores: Record<string, CategoryScore> | null,
  benchmarkScores: BenchmarkScores | null,
  overallAssessmentScore: number | null,
  totalQuestions: number = 25
): AdaptiveUnitInfo {
  const unit = unitInfo.find(u => u.id === unitId)
  if (!unit) {
    return { unitId, benchmarkScore: -1, entryDepth: "Foundational", lessons: [], requiredCount: 0, validatedCount: 0, totalCount: 0 }
  }

  const unitLessons = getLessonsByUnit(unitId)
  const score = getUnitBenchmarkScore(unit.categories, categoryScores, benchmarkScores, overallAssessmentScore, totalQuestions)
  const entryDepth = getEntryDepth(score)
  const skipTierIndex = score >= 0 ? getSkipTierIndex(score) : 0

  const adaptiveLessons: AdaptiveLessonInfo[] = unitLessons.map((lesson) => {
    const lessonTierIndex = TIER_ORDER.indexOf(lesson.level)

    // If benchmark proves mastery, validate foundational tiers
    if (score >= 0 && lessonTierIndex < skipTierIndex) {
      return { lesson, status: "validated" as LessonAdaptiveStatus }
    }

    return { lesson, status: "required" as LessonAdaptiveStatus }
  })

  const validatedCount = adaptiveLessons.filter(l => l.status === "validated").length
  const requiredCount = adaptiveLessons.filter(l => l.status === "required").length

  return {
    unitId,
    benchmarkScore: score,
    entryDepth,
    lessons: adaptiveLessons,
    requiredCount,
    validatedCount,
    totalCount: unitLessons.length,
  }
}

/**
 * Get all adaptive units for the entire curriculum.
 */
export function getAdaptiveCurriculum(
  categoryScores: Record<string, CategoryScore> | null,
  benchmarkScores: BenchmarkScores | null,
  overallAssessmentScore: number | null,
  totalQuestions: number = 25
): Map<string, AdaptiveUnitInfo> {
  const map = new Map<string, AdaptiveUnitInfo>()
  for (const unit of unitInfo) {
    map.set(unit.id, getAdaptiveUnit(unit.id, categoryScores, benchmarkScores, overallAssessmentScore, totalQuestions))
  }
  return map
}

/**
 * Compute per-topic benchmark scores from assessment answers.
 * Legacy format for backward compat.
 */
export function computeBenchmarkScores(
  questions: { topic: string; correctAnswer: number }[],
  answers: number[]
): BenchmarkScores {
  const scores: BenchmarkScores = {}
  questions.forEach((q, i) => {
    if (i < answers.length) {
      scores[q.topic] = answers[i] === q.correctAnswer ? 1 : 0
    }
  })
  return scores
}
