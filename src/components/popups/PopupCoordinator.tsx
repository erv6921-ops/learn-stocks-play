import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"

// Priorities for the single dashboard pop-up slot (higher wins). When several
// pop-ups want to show on the same dashboard visit, only the highest-priority
// one appears; the rest wait for the next visit.
export const POPUP = {
  assignments: 100,   // classwork (forcing) / new homework
  stockDraft: 90,     // teacher launched the stock draft
  lessonGrade: 70,    // teacher graded a lesson
  grade: 65,          // teacher graded micro-business work
  homeworkReminder: 55,
  friendRequest: 40,
} as const

interface CoordinatorValue {
  winner: string | null
  register: (id: string, priority: number, want: boolean) => void
}

const Ctx = createContext<CoordinatorValue | null>(null)

// Coordinates the app's dashboard pop-ups so at most ONE ever shows per visit to
// the dashboard. On mount we wait a short beat to collect which pop-ups want to
// show, then grant the single slot to the highest-priority one. Once that slot is
// spent, no other pop-up shows until the student leaves and returns to the
// dashboard (which remounts this provider and resets the slot) - so pop-ups never
// stack or fire back-to-back, and never appear off the dashboard at all.
export function PopupCoordinatorProvider({ children }: { children: React.ReactNode }) {
  const wants = useRef<Record<string, { priority: number; want: boolean }>>({})
  const spent = useRef(false)
  const armed = useRef(false)
  const [winner, setWinner] = useState<string | null>(null)

  const evaluate = useCallback(() => {
    if (!armed.current) return
    if (spent.current) {
      // The granted pop-up closed: clear it, but stay spent (no back-to-back).
      setWinner((w) => (w && !wants.current[w]?.want ? null : w))
      return
    }
    const ready = Object.entries(wants.current).filter(([, v]) => v.want)
    if (ready.length === 0) return
    ready.sort((a, b) => b[1].priority - a[1].priority)
    spent.current = true
    setWinner(ready[0][0])
  }, [])

  const register = useCallback((id: string, priority: number, want: boolean) => {
    wants.current[id] = { priority, want }
    evaluate()
  }, [evaluate])

  // Collection window: give async pop-up checks ~500ms to report in before we
  // pick, so priority (not a network race) decides the winner.
  useEffect(() => {
    const t = setTimeout(() => { armed.current = true; evaluate() }, 500)
    return () => clearTimeout(t)
  }, [evaluate])

  return <Ctx.Provider value={{ winner, register }}>{children}</Ctx.Provider>
}

// Returns whether THIS pop-up is the one allowed to show right now. `want` is
// whether the pop-up currently has something it would show. Outside the provider
// (i.e. not on the dashboard) it always returns false, so nothing pops.
export function usePopupSlot(id: string, priority: number, want: boolean): boolean {
  const ctx = useContext(Ctx)
  useEffect(() => {
    ctx?.register(id, priority, want)
  }, [ctx, id, priority, want])
  return !!ctx && ctx.winner === id
}
