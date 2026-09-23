import React, { createContext, useContext, useRef, useState, ReactNode } from "react"
import { toast } from "sonner"
import { useApp } from "@/contexts/AppContext"
import { useAbility } from "@/hooks/useAbility"
import { logEvent } from "@/lib/analyticsEvents"
import { xpLevelForCoins } from "@/lib/xpLevels"
import type { AnswerRecord, AnswerSource } from "@/lib/lessonRun"

/**
 * Per-answer signal the adaptive engine needs, gathered by the question UI
 * (QuizAnswer): how fast the answer came, the difficulty (b) of the question,
 * and how long it was expected to take. Correctness is implied by which
 * register* function is called.
 */
export interface AnswerContext {
  responseMs: number
  questionB: number
  expectedMs: number
  /** Optional stable id of the question answered - makes the run record's idempotency exact. */
  questionId?: string
  /** True when the countdown ran out (no tap). */
  timedOut?: boolean
}

/**
 * Bridge to the lesson run record (src/lib/lessonRun.ts). When a provider has
 * one, every answer is keyed and recorded there BEFORE any coins move, and the
 * session tallies below are read back from it - so a reload, a remount or a
 * repeated question can never pay or count twice, and the completion receipt
 * is by construction the sum of the record.
 */
export interface QuizRunBridge {
  /** Which run key + source this answer belongs to (the lesson player knows the section). */
  resolveAnswer: (ctx: AnswerContext | undefined, correct: boolean) => { key: string; source: AnswerSource }
  /** Idempotent: false means this key was already answered - do nothing. */
  recordAnswer: (key: string, result: Omit<AnswerRecord, "at">) => boolean
  coinsGained: number
  coinsLost: number
  answeredTotal: number
  answeredCorrect: number
}

// ─── Coin / combo economy (frontend-only gamification) ───
//
// Get a question right → gain coins, get it wrong → lose coins, with a toast
// every time. A CORRECT answer pays purely by SPEED, the same tiers for every
// lesson: answer quickly for the most coins, at a normal pace for the middle
// amount, or slowly for the least. (This replaces the old flat base + a
// separate speed bonus.) The popup is a global Sonner toast mounted once at the
// app root, so it fires reliably on every question.

// Coins gained for a correct answer, by how fast it came in.
export const COINS_QUICK = 30    // answered within QUICK_MS
export const COINS_REGULAR = 20  // in between
export const COINS_SLOW = 10     // took longer than SLOW_MS
const QUICK_MS = 5000
const SLOW_MS = 10000

// Default coins LOST on a wrong answer when a quiz doesn't specify its own.
export const DEFAULT_COINS = 20

/** Coins for a correct answer, tiered by response time. */
function rewardForSpeed(responseMs?: number): { coins: number; tier: "quick" | "regular" | "slow" } {
  if (responseMs != null && responseMs <= QUICK_MS) return { coins: COINS_QUICK, tier: "quick" }
  if (responseMs != null && responseMs > SLOW_MS) return { coins: COINS_SLOW, tier: "slow" }
  return { coins: COINS_REGULAR, tier: "regular" }
}

/**
 * Combo multiplier applied to BOTH the coins gained on a correct answer and the
 * coins lost on a wrong one - matching the on-screen "3x/5x/10x COMBO" pill.
 * The bigger the streak, the bigger the reward AND the risk.
 */
export function comboMultiplier(combo: number): number {
  if (combo >= 10) return 10
  if (combo >= 5) return 5
  if (combo >= 3) return 3
  return 1
}

interface QuizSession {
  /** The lesson this quiz session belongs to (for activity logging). */
  lessonId?: string
  /** Current consecutive-correct streak within this lesson session. */
  combo: number
  /**
   * The combo value that was just lost on a wrong answer, briefly non-null so
   * the UI can flash "Combo lost!"; auto-clears after 300ms.
   */
  lostCombo: number | null
  /** Net coins gained (or lost) across this whole lesson session. */
  coinsEarned: number
  /** Total coins gained from correct answers this session (always ≥ 0). */
  coinsGained: number
  /** Total coins lost to wrong answers this session (always ≥ 0). */
  coinsLost: number
  /**
   * Every question answered this session across ALL sections - micro-checks,
   * applied questions, and mastery-check questions, INCLUDING answers on failed
   * mastery attempts and timeouts. This is the denominator for whole-lesson
   * accuracy on the completion screen.
   */
  answeredTotal: number
  /** Of `answeredTotal`, how many were correct. */
  answeredCorrect: number
  /**
   * Register a correct answer: +coins by speed tier (quick/regular/slow), bumps
   * combo, pops a toast. Pass the answer context so the speed tier can be chosen
   * AND the adaptive ability estimate can be updated.
   */
  registerCorrect: (coins?: number, ctx?: AnswerContext) => void
  /** Register a wrong answer (or timeout): −coins, resets combo, pops a toast. */
  registerWrong: (coins?: number, ctx?: AnswerContext) => void
  /** Live adaptive ability (theta) for this lesson's topic - drives question selection. */
  getTheta: () => number
  /** How many answers have fed the adaptive estimate this session (for the completion cue). */
  getAttempts: () => number
  /**
   * How many DISTINCT question difficulty values (b) have been served this
   * session. The completion screen only claims "Questions adapted to your
   * level" when this is > 1 - i.e. the served set actually spanned easy/medium/
   * hard, not a single flat difficulty.
   */
  difficultySpread: number
  /**
   * Teacher preview: true when the lesson is being viewed by a teacher to see
   * what students get. Every persistent side effect (coins, Jeffs ledger,
   * theta persistence, analytics, question_attempts, activity log) is skipped
   * at its call site; local feedback (right/wrong, combo, toasts) still runs.
   */
  previewMode: boolean
}

const noop: QuizSession = {
  lessonId: undefined,
  combo: 0,
  lostCombo: null,
  coinsEarned: 0,
  coinsGained: 0,
  coinsLost: 0,
  answeredTotal: 0,
  answeredCorrect: 0,
  registerCorrect: () => {},
  registerWrong: () => {},
  getTheta: () => 0,
  getAttempts: () => 0,
  difficultySpread: 0,
  previewMode: false,
}

const QuizSessionCtx = createContext<QuizSession>(noop)

export function useQuizSession(): QuizSession {
  return useContext(QuizSessionCtx)
}

/**
 * Holds combo state for one lesson quiz session and applies the per-answer
 * coin nudges. Combo persists across questions while mounted and resets when
 * the provider unmounts (exiting the lesson) - so key it on the lesson id.
 */
export function QuizSessionProvider({ children, lessonId, concept, previewMode = false, run }: { children: ReactNode; lessonId?: string; concept?: string; previewMode?: boolean; run?: QuizRunBridge }) {
  const { awardJeffs, jeffsBalance } = useApp()
  // Live per-topic ability estimate: loaded on entry, updated per answer,
  // debounce-persisted on exit. Drives adaptive question selection. In teacher
  // preview the hook is read-only: no student_ability load or persist.
  const ability = useAbility(concept, { readOnly: previewMode })
  const [combo, setCombo] = useState(0)
  const [lostCombo, setLostCombo] = useState<number | null>(null)
  const [coinsEarned, setCoinsEarned] = useState(0)
  const [coinsGained, setCoinsGained] = useState(0)
  const [coinsLost, setCoinsLost] = useState(0)
  const [answeredTotal, setAnsweredTotal] = useState(0)
  const [answeredCorrect, setAnsweredCorrect] = useState(0)
  // Synchronous mirrors so a rapid answer reads up-to-date values.
  const comboRef = useRef(0)
  const balanceRef = useRef(jeffsBalance)
  balanceRef.current = jeffsBalance
  const lostTimer = useRef<ReturnType<typeof setTimeout>>()
  // Distinct difficulty (b) values served this session - drives whether the
  // completion screen may claim the questions adapted across levels.
  const difficultyValuesRef = useRef<Set<number>>(new Set())

  const registerCorrect = (_coins?: number, ctx?: AnswerContext) => {
    const responseMs = ctx?.responseMs
    const newCombo = comboRef.current + 1
    // Base reward is tiered by speed; the active combo then multiplies it.
    const { coins: base, tier } = rewardForSpeed(responseMs)
    const mult = comboMultiplier(newCombo)
    const total = base * mult
    // Run record first: a question already answered this run pays nothing and
    // counts nothing (a remount or resume replayed it), so stop right here.
    if (run) {
      const { key, source } = run.resolveAnswer(ctx, true)
      const fresh = run.recordAnswer(key, { correct: true, coins: previewMode ? 0 : total, timedOut: false, source })
      if (!fresh) {
        toast.success("Already counted", { id: "quiz-feedback", duration: 1500, description: "You answered this one earlier in this run." })
        return
      }
    }
    if (ctx && typeof ctx.questionB === "number") difficultyValuesRef.current.add(ctx.questionB)
    // Feed the adaptive engine: a correct answer, weighted by speed.
    if (ctx) ability.record({ isCorrect: true, responseMs: ctx.responseMs, questionB: ctx.questionB, expectedMs: ctx.expectedMs })
    // Analytics: this fn is the chokepoint for every answered question.
    // Teacher preview: no analytics_events rows.
    if (!previewMode) logEvent("quiz_attempted", { topicId: concept, difficulty: ctx?.questionB, theta: ability.getTheta() })
    comboRef.current = newCombo
    setCombo(newCombo)
    if (!previewMode) logEvent("quiz_correct", { topicId: concept, correctTime_ms: responseMs, streak: newCombo })
    // Detect an xp-level crossing caused by this reward (level is coins-derived).
    const prevLevel = xpLevelForCoins(balanceRef.current)
    // Teacher preview: no coin award (profiles.jeffs_balance + jeffs_history +
    // coins_earned analytics all hang off awardJeffs) and no level-up event.
    if (!previewMode) {
      awardJeffs(total, "Quiz correct answer")
      const newLevel = xpLevelForCoins(balanceRef.current + total)
      if (newLevel > prevLevel) logEvent("quiz_levelup", { level: newLevel, newTheta: ability.getTheta() })
    }
    setCoinsEarned(c => c + total)
    setCoinsGained(g => g + total)
    setAnsweredCorrect(c => c + 1)
    setAnsweredTotal(t => t + 1)
    // Reuse one toast id so rapid answers update a single toast in place
    // instead of stacking a fresh one per question.
    toast.success(`+${total} coins`, {
      id: "quiz-feedback",
      duration: 2000,
      description: mult > 1 ? `${mult}x combo 🔥` : tier === "quick" ? "⚡ Quick answer!" : "Correct! 🎉",
    })
  }

  const registerWrong = (coins = DEFAULT_COINS, ctx?: AnswerContext) => {
    const broken = comboRef.current
    const timedOut = ctx?.timedOut ?? (!!ctx && ctx.responseMs >= ctx.expectedMs)
    // The combo you were on multiplies the stake too - bigger streak, bigger
    // risk. Capped at the balance so it never drives coins negative.
    const mult = comboMultiplier(broken)
    const stake = coins * mult
    // Teacher preview: the stake is shown (so the teacher sees what a student
    // would lose) but nothing is deducted. A TIMEOUT costs no coins at all -
    // running out of time counts as wrong for accuracy but isn't a wrong bet.
    const penalty = timedOut ? 0 : (previewMode ? stake : Math.min(stake, Math.max(0, Math.round(balanceRef.current))))
    // Run record first (see registerCorrect): an already-answered key is a
    // replay, so it neither counts nor costs anything.
    if (run) {
      const { key, source } = run.resolveAnswer(ctx, false)
      const fresh = run.recordAnswer(key, { correct: false, coins: previewMode ? 0 : -penalty, timedOut, source })
      if (!fresh) {
        toast.error("Already counted", { id: "quiz-feedback", duration: 1500, description: "You answered this one earlier in this run." })
        return
      }
    }
    if (ctx && typeof ctx.questionB === "number") difficultyValuesRef.current.add(ctx.questionB)
    // Feed the adaptive engine: a wrong answer (or timeout), weighted by speed.
    if (ctx) ability.record({ isCorrect: false, responseMs: ctx.responseMs, questionB: ctx.questionB, expectedMs: ctx.expectedMs })
    // Teacher preview: no analytics_events rows.
    if (!previewMode) {
      logEvent("quiz_attempted", { topicId: concept, difficulty: ctx?.questionB, theta: ability.getTheta() })
      logEvent("quiz_incorrect", { topicId: concept, attemptCount: (run ? run.answeredTotal : answeredTotal) + 1 })
    }
    comboRef.current = 0
    setCombo(0)
    // Count the answer even when no coins are lost (zero balance) or it was a
    // timeout - whole-lesson accuracy counts every attempt.
    setAnsweredTotal(t => t + 1)
    if (broken >= 3) {
      setLostCombo(broken)
      clearTimeout(lostTimer.current)
      lostTimer.current = setTimeout(() => setLostCombo(null), 300)
    }
    if (penalty > 0) {
      if (!previewMode) awardJeffs(-penalty, "Quiz wrong answer")
      setCoinsEarned(c => c - penalty)
      setCoinsLost(l => l + penalty)
    }
    toast.error(timedOut ? "⏰ Time's up" : penalty > 0 ? `−${penalty} coins${mult > 1 ? ` (${mult}x combo)` : ""}` : "Not quite!", {
      id: "quiz-feedback",
      duration: 2000,
      description: timedOut ? "No coins lost - the clock just ran out" : penalty > 0 ? "Wrong answer" : undefined,
    })
  }

  // With a run record attached, the tallies ARE the record (they survive
  // reloads and can't drift from what was paid). Without one, the in-memory
  // counters above are the session.
  const tallies = run
    ? { coinsEarned: run.coinsGained - run.coinsLost, coinsGained: run.coinsGained, coinsLost: run.coinsLost, answeredTotal: run.answeredTotal, answeredCorrect: run.answeredCorrect }
    : { coinsEarned, coinsGained, coinsLost, answeredTotal, answeredCorrect }

  return (
    <QuizSessionCtx.Provider value={{ lessonId, combo, lostCombo, ...tallies, registerCorrect, registerWrong, getTheta: ability.getTheta, getAttempts: ability.getAttempts, difficultySpread: difficultyValuesRef.current.size, previewMode }}>
      {children}
    </QuizSessionCtx.Provider>
  )
}
