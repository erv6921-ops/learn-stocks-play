import { test } from "node:test"
import assert from "node:assert/strict"
import {
  updateTheta,
  selectNextQuestion,
  pCorrect,
  DEFAULT_ABILITY,
  B_REMEDIAL,
  B_BASE,
  B_HARD,
  poolDifficultyFor,
  type Ability,
  type Observation,
} from "./adaptiveEngine.ts"
import type { QuizQuestion } from "../types/index.ts"

// A nominal expected time budget (ms) - questionSeconds() floors at 15s.
const EXPECTED_MS = 15000

/** Run a sequence of answers through the engine, starting from the prior. */
function simulate(
  steps: Array<{ b: number; correct: boolean; ratio: number }>,
  start: Ability = DEFAULT_ABILITY
): Ability {
  return steps.reduce<Ability>((ability, s) => {
    const obs: Observation = {
      isCorrect: s.correct,
      responseMs: s.ratio * EXPECTED_MS,
      questionB: s.b,
      expectedMs: EXPECTED_MS,
    }
    return updateTheta(ability, obs)
  }, start)
}

function q(id: string, difficulty: number): QuizQuestion {
  return { id, question: id, options: ["a", "b", "c", "d"], correctAnswer: 0, explanation: "", difficulty }
}

// ─────────────────────────────────────────────────────────────
// Single-step direction sanity
// ─────────────────────────────────────────────────────────────

test("correct answer raises theta, wrong answer lowers it", () => {
  const up = updateTheta(DEFAULT_ABILITY, { isCorrect: true, responseMs: EXPECTED_MS, questionB: B_BASE, expectedMs: EXPECTED_MS })
  const down = updateTheta(DEFAULT_ABILITY, { isCorrect: false, responseMs: EXPECTED_MS, questionB: B_BASE, expectedMs: EXPECTED_MS })
  assert.ok(up.theta > DEFAULT_ABILITY.theta, `expected rise, got ${up.theta}`)
  assert.ok(down.theta < DEFAULT_ABILITY.theta, `expected drop, got ${down.theta}`)
})

test("se shrinks after an answer", () => {
  const after = updateTheta(DEFAULT_ABILITY, { isCorrect: true, responseMs: EXPECTED_MS, questionB: B_BASE, expectedMs: EXPECTED_MS })
  assert.ok(after.se < DEFAULT_ABILITY.se, `expected se to shrink from ${DEFAULT_ABILITY.se}, got ${after.se}`)
})

test("nailing a HARD question moves theta more than acing an EASY one", () => {
  const hard = updateTheta(DEFAULT_ABILITY, { isCorrect: true, responseMs: EXPECTED_MS, questionB: B_HARD, expectedMs: EXPECTED_MS })
  const easy = updateTheta(DEFAULT_ABILITY, { isCorrect: true, responseMs: EXPECTED_MS, questionB: B_REMEDIAL, expectedMs: EXPECTED_MS })
  assert.ok(hard.theta > easy.theta, `hard(${hard.theta}) should beat easy(${easy.theta})`)
})

test("missing an EASY question drops theta more than missing a HARD one", () => {
  const missedEasy = updateTheta(DEFAULT_ABILITY, { isCorrect: false, responseMs: EXPECTED_MS, questionB: B_REMEDIAL, expectedMs: EXPECTED_MS })
  const missedHard = updateTheta(DEFAULT_ABILITY, { isCorrect: false, responseMs: EXPECTED_MS, questionB: B_HARD, expectedMs: EXPECTED_MS })
  assert.ok(missedEasy.theta < missedHard.theta, `missedEasy(${missedEasy.theta}) should be lower than missedHard(${missedHard.theta})`)
})

// ─────────────────────────────────────────────────────────────
// Time fusion
// ─────────────────────────────────────────────────────────────

test("fast-correct raises theta more than slow-correct (same question)", () => {
  const fast = updateTheta(DEFAULT_ABILITY, { isCorrect: true, responseMs: 0.3 * EXPECTED_MS, questionB: B_BASE, expectedMs: EXPECTED_MS })
  const slow = updateTheta(DEFAULT_ABILITY, { isCorrect: true, responseMs: 2.0 * EXPECTED_MS, questionB: B_BASE, expectedMs: EXPECTED_MS })
  assert.ok(fast.theta > slow.theta, `fast(${fast.theta}) should beat slow(${slow.theta})`)
})

test("slow-wrong penalizes theta more than fast-wrong (careless is discounted)", () => {
  const slowWrong = updateTheta(DEFAULT_ABILITY, { isCorrect: false, responseMs: 2.0 * EXPECTED_MS, questionB: B_BASE, expectedMs: EXPECTED_MS })
  const fastWrong = updateTheta(DEFAULT_ABILITY, { isCorrect: false, responseMs: 0.3 * EXPECTED_MS, questionB: B_BASE, expectedMs: EXPECTED_MS })
  assert.ok(slowWrong.theta < fastWrong.theta, `slowWrong(${slowWrong.theta}) should be lower than fastWrong(${fastWrong.theta})`)
})

// ─────────────────────────────────────────────────────────────
// Three-student integration
// ─────────────────────────────────────────────────────────────

test("strong / weak / middling students land where expected", () => {
  // Strong: answers everything correctly and fast, including hard questions.
  const strong = simulate([
    { b: B_BASE, correct: true, ratio: 0.4 },
    { b: B_BASE, correct: true, ratio: 0.4 },
    { b: B_HARD, correct: true, ratio: 0.5 },
    { b: B_HARD, correct: true, ratio: 0.5 },
    { b: B_HARD, correct: true, ratio: 0.6 },
    { b: B_HARD, correct: true, ratio: 0.5 },
  ])

  // Weak: misses even easy questions, and slowly (genuine struggle).
  const weak = simulate([
    { b: B_BASE, correct: false, ratio: 1.8 },
    { b: B_REMEDIAL, correct: false, ratio: 1.8 },
    { b: B_REMEDIAL, correct: false, ratio: 2.0 },
    { b: B_REMEDIAL, correct: true, ratio: 1.9 },
    { b: B_REMEDIAL, correct: false, ratio: 2.0 },
    { b: B_REMEDIAL, correct: false, ratio: 1.8 },
  ])

  // Middling: mixed results at medium difficulty, on-pace.
  const middling = simulate([
    { b: B_BASE, correct: true, ratio: 1.0 },
    { b: B_BASE, correct: false, ratio: 1.0 },
    { b: B_BASE, correct: true, ratio: 1.0 },
    { b: B_BASE, correct: false, ratio: 1.0 },
    { b: B_BASE, correct: true, ratio: 1.0 },
    { b: B_BASE, correct: false, ratio: 1.0 },
  ])

  console.log("\n  ── Three-student theta/se ──")
  console.log(`  strong:   theta=${strong.theta.toFixed(3)}  se=${strong.se.toFixed(3)}  p(hard)=${pCorrect(strong.theta, B_HARD).toFixed(2)}`)
  console.log(`  weak:     theta=${weak.theta.toFixed(3)}  se=${weak.se.toFixed(3)}  p(easy)=${pCorrect(weak.theta, B_REMEDIAL).toFixed(2)}`)
  console.log(`  middling: theta=${middling.theta.toFixed(3)}  se=${middling.se.toFixed(3)}  p(base)=${pCorrect(middling.theta, B_BASE).toFixed(2)}`)

  assert.ok(strong.theta > 1.0, `strong theta should exceed 1.0, got ${strong.theta}`)
  assert.ok(weak.theta < -1.0, `weak theta should be below -1.0, got ${weak.theta}`)
  assert.ok(Math.abs(middling.theta) < 0.6, `middling theta should hover near 0, got ${middling.theta}`)
  assert.ok(strong.theta > middling.theta && middling.theta > weak.theta, "ordering strong > middling > weak")
  assert.ok(strong.se < DEFAULT_ABILITY.se, "se shrinks after a session")
})

// ─────────────────────────────────────────────────────────────
// selectNextQuestion
// ─────────────────────────────────────────────────────────────

const POOL: QuizQuestion[] = [q("easy", B_REMEDIAL), q("mid", B_BASE), q("hard", B_HARD)]

test("selects the question closest to ability", () => {
  assert.equal(selectNextQuestion(POOL, 1.4)?.id, "hard")
  assert.equal(selectNextQuestion(POOL, -1.4)?.id, "easy")
  assert.equal(selectNextQuestion(POOL, 0.1)?.id, "mid")
})

test("a strong student is served a hard question, a weak one an easy question", () => {
  const strong = simulate([
    { b: B_HARD, correct: true, ratio: 0.5 },
    { b: B_HARD, correct: true, ratio: 0.5 },
    { b: B_HARD, correct: true, ratio: 0.5 },
  ])
  const weak = simulate([
    { b: B_REMEDIAL, correct: false, ratio: 1.9 },
    { b: B_REMEDIAL, correct: false, ratio: 1.9 },
    { b: B_REMEDIAL, correct: false, ratio: 1.9 },
  ])
  assert.equal(selectNextQuestion(POOL, strong.theta)?.id, "hard")
  assert.equal(selectNextQuestion(POOL, weak.theta)?.id, "easy")
})

test("respects alreadyAsked and returns null when exhausted", () => {
  const next = selectNextQuestion(POOL, 1.4, ["hard"])
  assert.equal(next?.id, "mid", "with hard asked and theta high, next-closest is mid")
  assert.equal(selectNextQuestion(POOL, 0, ["easy", "mid", "hard"]), null)
  assert.equal(selectNextQuestion([], 0), null)
})

test("treats a missing difficulty as medium (B_BASE)", () => {
  const untagged: QuizQuestion = { id: "untagged", question: "?", options: ["a", "b"], correctAnswer: 0, explanation: "" }
  assert.equal(selectNextQuestion([untagged], 0.1)?.id, "untagged")
})

// ─────────────────────────────────────────────────────────────
// Pool -> difficulty backfill mapping
// ─────────────────────────────────────────────────────────────

test("poolDifficultyFor maps pool id suffixes to b values", () => {
  assert.equal(poolDifficultyFor("budget-1-remedial"), B_REMEDIAL)
  assert.equal(poolDifficultyFor("budget-1-hard"), B_HARD)
  assert.equal(poolDifficultyFor("budget-1"), B_BASE)
})
