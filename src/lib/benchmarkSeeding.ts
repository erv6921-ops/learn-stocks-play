/**
 * Benchmark → IRT seeding.
 *
 * Translates the benchmark's per-domain performance into a starting ability
 * estimate (theta) per concept, so the adaptive engine begins each lesson at a
 * level that reflects what the student already knows instead of the flat
 * DEFAULT_ABILITY (theta 0) every student shares today.
 *
 * PURE: no React / Supabase / I/O. Onboarding calls deriveDomainAbilities() and
 * upserts the rows into `student_ability` (keyed on concept = lesson.category,
 * the same key useAbility loads on lesson entry).
 *
 * Prior design:
 *  - theta maps the domain % onto the engine's modest difficulty scale (±1.5):
 *    100% → +1.2, 50% → 0, 0% → −1.2. A handful of live answers can still move
 *    the student across the whole range, which is the point.
 *  - se is HIGH (low confidence): the benchmark serves only ~1–3 items per
 *    domain, so this is a weak prior the adaptive engine should overwrite fast.
 *  - attempts = 0: these rows are a prior, not real answered questions, so the
 *    completion cues that read attempts don't count seeding as practice.
 */

import type { CategoryScore } from "@/data/assessmentQuestions"

/** One student_ability seed row. */
export interface AbilitySeedRow {
  concept: string
  theta: number
  se: number
  attempts: number
}

/** Wide prior — deliberately less confident than a student who's answered live. */
export const SEED_SE = 0.9

/** Map a domain score (0–100) to a starting theta on the ±1.2 range. */
export function percentToTheta(percent: number): number {
  const t = (percent / 100 - 0.5) * 2.4
  return Math.max(-1.2, Math.min(1.2, Number(t.toFixed(3))))
}

/**
 * Build the student_ability seed rows from the benchmark's per-category scores.
 * Only domains the benchmark actually tested (total > 0) get a row; untested
 * domains fall through to the engine's cold-start default.
 */
export function deriveDomainAbilities(
  categoryScores: Record<string, CategoryScore> | null | undefined,
): AbilitySeedRow[] {
  if (!categoryScores) return []
  const rows: AbilitySeedRow[] = []
  for (const [concept, s] of Object.entries(categoryScores)) {
    if (!s || s.total <= 0) continue
    rows.push({
      concept,
      theta: percentToTheta(s.percent),
      se: SEED_SE,
      attempts: 0,
    })
  }
  return rows
}

// ── Human-readable "starting point" summary ──────────────────────────────

export type StartingTier = "advanced" | "on-track" | "building" | "review"

export interface DomainStartingPoint {
  concept: string
  percent: number
  theta: number
  tier: StartingTier
  /** True when this domain is weak enough to be flagged for review. */
  isReview: boolean
}

/** A domain scoring below this is flagged for review. */
export const REVIEW_THRESHOLD = 50

export function tierForPercent(percent: number): StartingTier {
  if (percent >= 80) return "advanced"
  if (percent >= 60) return "on-track"
  if (percent >= REVIEW_THRESHOLD) return "building"
  return "review"
}

/**
 * Tier from a seeded/updated theta. Thresholds align with percentToTheta
 * (80%→0.72, 60%→0.24, 50%→0), so a teacher reading student_ability sees the
 * same tiers the student saw on the results screen — plus any drift the
 * adaptive engine has since applied.
 */
export function tierForTheta(theta: number): StartingTier {
  if (theta >= 0.72) return "advanced"
  if (theta >= 0.24) return "on-track"
  if (theta >= 0) return "building"
  return "review"
}

export const TIER_LABEL: Record<StartingTier, string> = {
  advanced: "Advanced — start with harder questions",
  "on-track": "On track — start at grade level",
  building: "Building — a little extra scaffolding",
  review: "Review — we'll revisit the basics",
}

/**
 * Per-domain starting-point summary for the results screen and the teacher
 * dashboard. Sorted strongest-first so "your best areas" read at the top.
 */
export function domainStartingPoints(
  categoryScores: Record<string, CategoryScore> | null | undefined,
): DomainStartingPoint[] {
  if (!categoryScores) return []
  const out: DomainStartingPoint[] = []
  for (const [concept, s] of Object.entries(categoryScores)) {
    if (!s || s.total <= 0) continue
    out.push({
      concept,
      percent: s.percent,
      theta: percentToTheta(s.percent),
      tier: tierForPercent(s.percent),
      isReview: s.percent < REVIEW_THRESHOLD,
    })
  }
  return out.sort((a, b) => b.percent - a.percent)
}

/** Turn a concept slug ("credit-debt") into a readable label ("Credit Debt"). */
export function conceptLabel(concept: string): string {
  return concept
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}
