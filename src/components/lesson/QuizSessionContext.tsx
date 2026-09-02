import React, { createContext, useContext, useRef, useState, ReactNode } from "react"
import { toast } from "sonner"
import { useApp } from "@/contexts/AppContext"
import { useAbility } from "@/hooks/useAbility"
import { logEvent } from "@/lib/analyticsEvents"
import { xpLevelForCoins } from "@/lib/xpLevels"

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
export function QuizSessionProvider({ children, lessonId, concept }: { children: ReactNode; lessonId?: string; concept?: string }) {
  const { awardJeffs, jeffsBalance } = useApp()
  // Live per-topic ability estimate: loaded on entry, updated per answer,
  // debounce-persisted on exit. Drives adaptive question selection.
  const ability = useAbility(concept)
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

  const registerCorrect = (_coins?: number, ctx?: AnswerContext) => {
    const responseMs = ctx?.responseMs
    // Feed the adaptive engine: a correct answer, weighted by speed.
    if (ctx) ability.record({ isCorrect: true, responseMs: ctx.responseMs, questionB: ctx.questionB, expectedMs: ctx.expectedMs })
    // Analytics: this fn is the chokepoint for every answered question.
    logEvent("quiz_attempted", { topicId: concept, difficulty: ctx?.questionB, theta: ability.getTheta() })
    const newCombo = comboRef.current + 1
    comboRef.current = newCombo
    setCombo(newCombo)
    logEvent("quiz_correct", { topicId: concept, correctTime_ms: responseMs, streak: newCombo })
    // Base reward is tiered by speed; the active combo then multiplies it.
    const { coins: base, tier } = rewardForSpeed(responseMs)
    const mult = comboMultiplier(newCombo)
    const total = base * mult
    // Detect an xp-level crossing caused by this reward (level is coins-derived).
    const prevLevel = xpLevelForCoins(balanceRef.current)
    awardJeffs(total, "Quiz correct answer")
    const newLevel = xpLevelForCoins(balanceRef.current + total)
    if (newLevel > prevLevel) logEvent("quiz_levelup", { level: newLevel, newTheta: ability.getTheta() })
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
    // Feed the adaptive engine: a wrong answer (or timeout), weighted by speed.
    if (ctx) ability.record({ isCorrect: false, responseMs: ctx.responseMs, questionB: ctx.questionB, expectedMs: ctx.expectedMs })
    logEvent("quiz_attempted", { topicId: concept, difficulty: ctx?.questionB, theta: ability.getTheta() })
    logEvent("quiz_incorrect", { topicId: concept, attemptCount: answeredTotal + 1 })
    const broken = comboRef.current
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
    // The combo you were on multiplies the stake too - bigger streak, bigger
    // risk. Capped at the balance so it never drives coins negative.
    const mult = comboMultiplier(broken)
    const stake = coins * mult
    const penalty = Math.min(stake, Math.max(0, Math.round(balanceRef.current)))
    if (penalty > 0) {
      awardJeffs(-penalty, "Quiz wrong answer")
      setCoinsEarned(c => c - penalty)
      setCoinsLost(l => l + penalty)
    }
    toast.error(penalty > 0 ? `−${penalty} coins${mult > 1 ? ` (${mult}x combo)` : ""}` : "Not quite!", {
      id: "quiz-feedback",
      duration: 2000,
      description: penalty > 0 ? "Wrong answer" : undefined,
    })
  }

  return (
    <QuizSessionCtx.Provider value={{ lessonId, combo, lostCombo, coinsEarned, coinsGained, coinsLost, answeredTotal, answeredCorrect, registerCorrect, registerWrong, getTheta: ability.getTheta, getAttempts: ability.getAttempts }}>
      {children}
    </QuizSessionCtx.Provider>
  )
}
