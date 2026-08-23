/**
 * Adaptive Difficulty Engine (IRT-based, per-topic ability)
 * ─────────────────────────────────────────────────────────
 *
 * Tracks a live estimate of how able a student is on a topic and uses it to
 * pick the next question at the right challenge level. Two signals drive the
 * estimate: whether they got each question RIGHT, and how FAST they answered
 * relative to how long the question should take.
 *
 * Model: a 1-parameter-logistic (Rasch / 2PL with fixed discrimination a=1)
 * item-response model. A student has ability `theta` and a question has
 * difficulty `b`, both on the same logit scale. The probability of a correct
 * answer is the logistic of (theta - b). After each answer we do one online
 * Bayesian (Laplace / Kalman-style) update of a Normal belief N(theta, se^2):
 * the belief mean moves toward evidence, and its uncertainty `se` shrinks as
 * more questions are answered, so later answers nudge theta less than early
 * ones.
 *
 * Time fusion: a fast-correct answer is confident mastery and a slow-wrong
 * answer is genuine struggle - both are TRUSTWORTHY signals and get MORE
 * weight. A slow-correct answer (shaky) or a fast-wrong answer (careless
 * misclick / guess) are discounted. Time only scales how much we trust an
 * outcome; it never flips a right answer into a wrong one.
 *
 * This module is PURE: no React, no Supabase, no I/O. The caller supplies the
 * expected time budget (see questionSeconds in SectionRenderer) and persists
 * the returned {theta, se}. That keeps the math unit-testable in isolation.
 */

import type { QuizQuestion } from "@/types"

// ─── Difficulty scale (b) ───
// Question difficulty on the same logit scale as ability (theta). These are the
// values the pool accessors stamp onto questions based on which pool a question
// lives in (remedial / base / hard). A student around theta = B_HARD has a ~50%
// chance on a hard question; the scale is deliberately modest (±1.5) so a
// handful of answers can move a student across the whole range.
export const B_REMEDIAL = -1.5
export const B_BASE = 0
export const B_HARD = 1.5

/** Difficulty (b) implied by the pool a question is served from. */
export function poolDifficultyFor(poolId: string): number {
  if (poolId.endsWith("-remedial")) return B_REMEDIAL
  if (poolId.endsWith("-hard")) return B_HARD
  return B_BASE
}

// ─── Ability belief ───

export interface Ability {
  /** Point estimate of ability on the logit scale (0 = average). */
  theta: number
  /** Standard error of the estimate - shrinks as more questions are answered. */
  se: number
}

/**
 * Prior for a student we've never seen: average ability, but wide uncertainty
 * so the first few answers move the estimate quickly.
 */
export const DEFAULT_ABILITY: Ability = { theta: 0, se: 1.0 }

/** SE never collapses to 0 - keeps the estimate responsive to later change. */
const SE_FLOOR = 0.3

/** Fixed item discrimination for the 1PL model. */
const DISCRIMINATION = 1.0

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x))
}

/** Logistic probability of a correct answer given ability and difficulty. */
export function pCorrect(theta: number, b: number): number {
  return 1 / (1 + Math.exp(-DISCRIMINATION * (theta - b)))
}

export interface Observation {
  isCorrect: boolean
  /** How long the student took, in ms. */
  responseMs: number
  /** Difficulty (b) of the answered question. */
  questionB: number
  /** Expected time budget for this question, in ms (from questionSeconds). */
  expectedMs: number
}

/**
 * One online IRT update. Returns the new ability belief.
 *
 * Bayesian Laplace step on N(theta, se^2):
 *   gradient g   = a * (outcome - p)          (score function of the logistic)
 *   item info H  = a^2 * p * (1 - p)          (Fisher information)
 *   posterior precision = 1/se^2 + H * weight
 *   posterior mean      = theta + (g * weight) / posterior precision
 * where `weight` (0.5..1.5) is the time-based trust in this outcome.
 */
export function updateTheta(prev: Ability, obs: Observation): Ability {
  const { isCorrect, responseMs, questionB, expectedMs } = obs
  const a = DISCRIMINATION
  const p = pCorrect(prev.theta, questionB)
  const outcome = isCorrect ? 1 : 0

  // Speed relative to the question's expected time. ratio < 1 = faster than
  // expected. Clamp to keep pauses / outliers from dominating.
  const ratio = clamp(responseMs / Math.max(1, expectedMs), 0.15, 3)
  // speed in [-1, 1]: +1 = very fast, 0 = on-pace, -1 = very slow (>=2x).
  const speed = clamp(1 - ratio, -1, 1)

  // Time-based trust. Correct + fast, or wrong + slow, are the trustworthy
  // signals; slow-correct and fast-wrong are discounted.
  const weight = clamp(isCorrect ? 1 + 0.5 * speed : 1 - 0.5 * speed, 0.5, 1.5)

  const priorPrecision = 1 / (prev.se * prev.se)
  const info = a * a * p * (1 - p) * weight
  const posteriorPrecision = priorPrecision + info

  const gradient = a * (outcome - p) * weight
  const theta = prev.theta + gradient / posteriorPrecision
  const se = Math.max(SE_FLOOR, Math.sqrt(1 / posteriorPrecision))

  return { theta, se }
}

/**
 * Max-information question selection: pick the not-yet-asked question whose
 * difficulty is closest to the student's current ability. For a 1PL item,
 * Fisher information p*(1-p) is maximized when b == theta, so the best next
 * question is the one that most challenges the student without overwhelming
 * them. Ties break toward the earlier question in the pool (stable).
 *
 * Returns null when the pool is empty or everything has already been asked.
 */
export function selectNextQuestion(
  pool: QuizQuestion[],
  theta: number,
  alreadyAsked: string[] = []
): QuizQuestion | null {
  const asked = new Set(alreadyAsked)
  let best: QuizQuestion | null = null
  let bestDist = Infinity
  for (const q of pool) {
    if (asked.has(q.id)) continue
    const b = q.difficulty ?? B_BASE
    const dist = Math.abs(b - theta)
    if (dist < bestDist) {
      best = q
      bestDist = dist
    }
  }
  return best
}
