import React, { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"

export type JeffMoodType = "idle" | "celebrate" | "encourage" | "think" | "sleep"
export type JeffEvent = "coins_earned" | "lesson_complete" | "level_up" | "streak_update" | "page_change"

interface JeffState {
  mood: JeffMoodType
  message: string | null
  visible: boolean
}

interface JeffContextValue extends JeffState {
  triggerJeff: (event: JeffEvent) => void
  nudge: () => void
  dismiss: () => void
}

const JeffContext = createContext<JeffContextValue | undefined>(undefined)

const MESSAGE_MS = 4000
const SLEEP_AFTER_MS = 30000

// Messages by event.
const EVENT_MAP: Record<Exclude<JeffEvent, "page_change">, { mood: JeffMoodType; message: string }> = {
  coins_earned: { mood: "celebrate", message: "Nice! +75 InvestiCoins! 💰" },
  lesson_complete: { mood: "celebrate", message: "Lesson done! You're on a roll! 🎯" },
  level_up: { mood: "celebrate", message: "LEVEL UP! You're incredible! 🚀" },
  streak_update: { mood: "encourage", message: "Day streak! You're on fire! 🔥" },
}

// Messages by page (matched against the route path). Real app routes plus the
// aliases from the spec, so it works either way.
function pageMessage(path: string): { mood: JeffMoodType; message: string } | null {
  if (path.startsWith("/dashboard")) return { mood: "idle", message: "Ready to invest today? 📈" }
  if (path.startsWith("/lessons") || path.startsWith("/missions")) return { mood: "encourage", message: "You're so close to the next checkpoint! 🏔️" }
  if (path.startsWith("/stocks") || path.startsWith("/stock-market")) return { mood: "think", message: "Hmm, let me check the charts... 🤔" }
  if (path.startsWith("/leaderboard")) return { mood: "encourage", message: "You've got what it takes to reach #1! 🏆" }
  return null
}

// Cycled when the user clicks Jeff.
const ENCOURAGEMENTS = [
  "Keep going — you've got this! 💪",
  "Every lesson makes you richer 🧠",
  "Small steps, big gains 📈",
  "I believe in you! 🌟",
  "Future investor in the making 💼",
]

export function JeffProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { jeffsHistory, lessonProgress } = useApp()

  const [state, setState] = useState<JeffState>({ mood: "idle", message: null, visible: false })

  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sleepTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nudgeIdx = useRef(0)

  const clearTimers = () => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
    if (sleepTimer.current) clearTimeout(sleepTimer.current)
  }

  // After any activity, idle for a while, then drift to sleep.
  const scheduleSleep = useCallback(() => {
    if (sleepTimer.current) clearTimeout(sleepTimer.current)
    sleepTimer.current = setTimeout(() => {
      setState({ mood: "sleep", message: null, visible: false })
    }, SLEEP_AFTER_MS)
  }, [])

  const show = useCallback((mood: JeffMoodType, message: string | null) => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
    setState({ mood, message, visible: message != null })
    resetTimer.current = setTimeout(() => {
      setState({ mood: "idle", message: null, visible: false })
      scheduleSleep()
    }, MESSAGE_MS)
    scheduleSleep()
  }, [scheduleSleep])

  const triggerJeff = useCallback((event: JeffEvent) => {
    if (event === "page_change") {
      const pm = pageMessage(location.pathname)
      if (pm) show(pm.mood, pm.message)
      else { setState({ mood: "idle", message: null, visible: false }); scheduleSleep() }
      return
    }
    const cfg = EVENT_MAP[event]
    if (cfg) show(cfg.mood, cfg.message)
  }, [location.pathname, show, scheduleSleep])

  const nudge = useCallback(() => {
    const msg = ENCOURAGEMENTS[nudgeIdx.current % ENCOURAGEMENTS.length]
    nudgeIdx.current += 1
    show("encourage", msg)
  }, [show])

  const dismiss = useCallback(() => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
    setState(s => ({ ...s, message: null, visible: false }))
    scheduleSleep()
  }, [scheduleSleep])

  // Greet on route change.
  useEffect(() => {
    triggerJeff("page_change")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Watch the app state to react to coin awards and lesson completions. This is
  // the single wiring point: earnJeffs() (used everywhere) appends to
  // jeffsHistory, and lesson completion flips lessonProgress.completed.
  // `armed` stays false during the initial async hydrate so populating history
  // from the DB on load doesn't fire a fake "coins earned"; the baseline refs
  // keep tracking until then.
  const prevCoins = useRef(0)
  const prevDone = useRef(0)
  const armed = useRef(false)
  useEffect(() => {
    const t = setTimeout(() => { armed.current = true }, 2500)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    const coins = jeffsHistory.filter(h => h.amount > 0).length
    const done = lessonProgress.filter(p => p.completed).length
    if (!armed.current) { prevCoins.current = coins; prevDone.current = done; return }
    const lessonUp = done > prevDone.current
    const coinsUp = coins > prevCoins.current
    prevCoins.current = coins
    prevDone.current = done
    if (lessonUp) triggerJeff("lesson_complete")
    else if (coinsUp) triggerJeff("coins_earned")
  }, [jeffsHistory, lessonProgress, triggerJeff])

  useEffect(() => () => clearTimers(), [])

  return (
    <JeffContext.Provider value={{ ...state, triggerJeff, nudge, dismiss }}>
      {children}
    </JeffContext.Provider>
  )
}

export function useJeff() {
  const ctx = useContext(JeffContext)
  if (!ctx) throw new Error("useJeff must be used within a JeffProvider")
  return ctx
}
