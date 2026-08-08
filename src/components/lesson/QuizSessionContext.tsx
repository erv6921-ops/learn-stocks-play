import React, { createContext, useContext, useRef, useState, ReactNode } from "react"
import { toast } from "sonner"
import { Coins } from "lucide-react"
import { useApp } from "@/contexts/AppContext"

// ─── Coin / combo economy (frontend-only gamification) ───
//
// Dead simple: get a question right → gain coins, get it wrong → lose coins,
// with a toast every single time. The coin amount is passed per question so
// different quiz types can carry different stakes (e.g. ±25 for the low-stakes
// micro-check, ±50 for the mastery quiz). The popup is a global Sonner toast
// (mounted once at the app root), so it fires reliably on every question
// instead of depending on the per-question quiz component's lifecycle.

// Default coins gained/lost per answer when a quiz doesn't specify its own.
export const DEFAULT_COINS = 50

// Extra coins for answering correctly and quickly - a flat bonus when the
// response lands within SPEED_BONUS_MS of the question appearing.
export const SPEED_BONUS = 50
const SPEED_BONUS_MS = 5000

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
   * Register a correct answer: +coins, bumps combo, pops a toast. Pass the
   * response time so a fast answer also earns the speed bonus.
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

  const registerCorrect = (coins = DEFAULT_COINS, responseMs?: number) => {
    const newCombo = comboRef.current + 1
    comboRef.current = newCombo
    setCombo(newCombo)
    awardJeffs(coins, "Quiz correct answer")
    setCoinsEarned(c => c + coins)
    toast.success(`+${coins} coins`, { description: "Correct! 🎉" })
    // Speed bonus: a quick correct answer earns extra coins on top.
    if (responseMs != null && responseMs <= SPEED_BONUS_MS) {
      awardJeffs(SPEED_BONUS, "Quiz speed bonus")
      setCoinsEarned(c => c + SPEED_BONUS)
      toast.success(`+${SPEED_BONUS} speed bonus ⚡`, { description: "Fast answer!" })
    }
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
    // Never drive the balance negative.
    const penalty = Math.min(coins, Math.max(0, Math.round(balanceRef.current)))
    if (penalty > 0) {
      awardJeffs(-penalty, "Quiz wrong answer")
      setCoinsEarned(c => c - penalty)
    }
    toast.error(penalty > 0 ? `−${penalty} coins` : "Not quite!", {
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
