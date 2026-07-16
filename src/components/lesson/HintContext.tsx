import React, { createContext, useContext, useState, ReactNode } from "react"

/**
 * Lesson-wide hint budget. Kids get a small, fixed number of hints for the
 * ENTIRE lesson (shared across every quiz question), so hints stay a scarce,
 * strategic help rather than a way to breeze through. A hint rules out one
 * wrong answer — a nudge toward "what it could be" without giving it away.
 */
interface HintCtx {
  hintsLeft: number
  totalHints: number
  /** Consume one hint. Returns true if one was available and spent. */
  spendHint: () => boolean
}

const HintContext = createContext<HintCtx | null>(null)

export function HintProvider({ children, total = 2 }: { children: ReactNode; total?: number }) {
  const [hintsLeft, setHintsLeft] = useState(total)
  const spendHint = () => {
    if (hintsLeft <= 0) return false
    setHintsLeft(h => Math.max(0, h - 1))
    return true
  }
  return (
    <HintContext.Provider value={{ hintsLeft, totalHints: total, spendHint }}>
      {children}
    </HintContext.Provider>
  )
}

/** Null when rendered outside a lesson (e.g. standalone previews). */
export function useHints() {
  return useContext(HintContext)
}
