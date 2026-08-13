import React, { createContext, useContext, useRef, useState, ReactNode } from "react"
import { toast } from "sonner"
import { Coins } from "lucide-react"
import { useApp } from "@/contexts/AppContext"

// ─── Coin / combo economy (frontend-only gamification) ───
//
// Get a question right → gain coins, get it wrong → lose coins, with a toast
// every time. A CORRECT answer pays purely by SPEED, the same tiers for every
// lesson: answer quickly for the most coins, at a normal pace for the middle
// amount, or slowly for the least. (This replaces the old flat base + a
// separate speed bonus.) The popup is a global Sonner toast mounted once at the
// app root, so it fires reliably on every question.

// Coins gained for a correct answer, by how fast it came in.
export const COINS_QUICK = 60    // answered within QUICK_MS
export const COINS_REGULAR = 50  // in between
export const COINS_SLOW = 40     // took longer than SLOW_MS
const QUICK_MS = 5000
const SLOW_MS = 10000

// Default coins LOST on a wrong answer when a quiz doesn't specify its own.
export const DEFAULT_COINS = 50

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
  /** Current consecutive-correct streak within this lesson session. */
  combo: number
  /**
   * The combo value that was just lost on a wrong answer, briefly non-null so
   * the UI can flash "Combo lost!"; auto-clears after 300ms.
   */
  lostCombo: number | null
  /** Net coins gained (or lost) across this whole lesson session. */
  coinsEarned: number
  /**
   * Register a correct answer: +coins by speed tier (quick/regular/slow), bumps
   * combo, pops a toast. Pass the response time so the tier can be chosen.
   */
  registerCorrect: (coins?: number, responseMs?: number) => void
  /** Register a wrong answer (or timeout): −coins, resets combo, pops a toast. */
  registerWrong: (coins?: number) => void
}

const noop: QuizSession = {
  combo: 0,
  lostCombo: null,
  coinsEarned: 0,
  registerCorrect: () => {},
  registerWrong: () => {},
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
export function QuizSessionProvider({ children }: { children: ReactNode }) {
  const { awardJeffs, jeffsBalance } = useApp()
  const [combo, setCombo] = useState(0)
  const [lostCombo, setLostCombo] = useState<number | null>(null)
  const [coinsEarned, setCoinsEarned] = useState(0)
  // Synchronous mirrors so a rapid answer reads up-to-date values.
  const comboRef = useRef(0)
  const balanceRef = useRef(jeffsBalance)
  balanceRef.current = jeffsBalance
  const lostTimer = useRef<ReturnType<typeof setTimeout>>()

  const registerCorrect = (_coins?: number, responseMs?: number) => {
    const newCombo = comboRef.current + 1
    comboRef.current = newCombo
    setCombo(newCombo)
    // Base reward is tiered by speed; the active combo then multiplies it.
    const { coins: base, tier } = rewardForSpeed(responseMs)
    const mult = comboMultiplier(newCombo)
    const total = base * mult
    awardJeffs(total, "Quiz correct answer")
    setCoinsEarned(c => c + total)
    // Reuse one toast id so rapid answers update a single toast in place
    // instead of stacking a fresh one per question.
    toast.success(`+${total} coins`, {
      id: "quiz-feedback",
      duration: 2000,
      description: mult > 1 ? `${mult}x combo 🔥` : tier === "quick" ? "⚡ Quick answer!" : "Correct! 🎉",
    })
  }

  const registerWrong = (coins = DEFAULT_COINS) => {
    const broken = comboRef.current
    comboRef.current = 0
    setCombo(0)
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
    }
    toast.error(penalty > 0 ? `−${penalty} coins${mult > 1 ? ` (${mult}x combo)` : ""}` : "Not quite!", {
      id: "quiz-feedback",
      duration: 2000,
      description: penalty > 0 ? "Wrong answer" : undefined,
    })
  }

  return (
    <QuizSessionCtx.Provider value={{ combo, lostCombo, coinsEarned, registerCorrect, registerWrong }}>
      {children}
    </QuizSessionCtx.Provider>
  )
}

/**
 * Completion-screen summary of the net coins the student earned (or lost)
 * answering questions this lesson. Renders nothing if it netted to zero.
 * Must be rendered inside a QuizSessionProvider.
 */
export function LessonCoinsSummary() {
  const { coinsEarned } = useQuizSession()
  if (coinsEarned === 0) return null
  const positive = coinsEarned > 0
  return (
    <div className="bg-gold/10 border border-gold/20 rounded-xl p-4">
      <div className="flex items-center justify-center gap-2">
        <Coins className="w-5 h-5 text-gold" />
        <span className="text-2xl font-semibold text-gold">
          {positive ? "+" : "−"}
          {Math.abs(coinsEarned).toLocaleString()}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        InvestiCoins {positive ? "earned" : "lost"} this lesson
      </p>
    </div>
  )
}
