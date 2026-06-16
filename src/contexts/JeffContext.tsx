import React, { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"

export type JeffMoodType = "idle" | "celebrate" | "encourage" | "think" | "sleep"
export type JeffEvent = "coins_earned" | "lesson_complete" | "level_up" | "streak_update" | "page_change"
// Autonomous "alive" behaviours that play out when Jeff is left alone.
export type JeffActivity = "none" | "walkAcross" | "walkSide" | "jump" | "cook" | "pack" | "nap"

interface JeffState {
  mood: JeffMoodType
  message: string | null
  visible: boolean
  activity: JeffActivity
}

interface JeffContextValue extends JeffState {
  triggerJeff: (event: JeffEvent) => void
  nudge: () => void
  dismiss: () => void
}

const JeffContext = createContext<JeffContextValue | undefined>(undefined)

const MESSAGE_MS = 4000

// Random roaming/vignette pool + how long each plays.
const ACTIVITIES: { a: Exclude<JeffActivity, "none">; dur: number }[] = [
  { a: "walkAcross", dur: 8200 },
  { a: "walkSide", dur: 8200 },
  { a: "jump", dur: 1400 },
  { a: "cook", dur: 6000 },
  { a: "pack", dur: 5600 },
  { a: "nap", dur: 7000 },
]
const ROAM_MIN_MS = 11000
const ROAM_VAR_MS = 12000 // next activity fires after 11–23s of calm

const EVENT_MAP: Record<Exclude<JeffEvent, "page_change">, { mood: JeffMoodType; message: string }> = {
  coins_earned: { mood: "celebrate", message: "Nice! +75 InvestiCoins! 💰" },
  lesson_complete: { mood: "celebrate", message: "Lesson done! You're on a roll! 🎯" },
  level_up: { mood: "celebrate", message: "LEVEL UP! You're incredible! 🚀" },
  streak_update: { mood: "encourage", message: "Day streak! You're on fire! 🔥" },
}

function pageMessage(path: string): { mood: JeffMoodType; message: string } | null {
  if (path.startsWith("/dashboard")) return { mood: "idle", message: "Ready to invest today? 📈" }
  if (path.startsWith("/lessons") || path.startsWith("/missions")) return { mood: "encourage", message: "You're so close to the next checkpoint! 🏔️" }
  if (path.startsWith("/stocks") || path.startsWith("/stock-market")) return { mood: "think", message: "Hmm, let me check the charts... 🤔" }
  if (path.startsWith("/leaderboard")) return { mood: "encourage", message: "You've got what it takes to reach #1! 🏆" }
  return null
}

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

  const [state, setState] = useState<JeffState>({ mood: "idle", message: null, visible: false, activity: "none" })

  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const roamTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const actTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nudgeIdx = useRef(0)

  // ── Autonomous roaming scheduler ──
  const scheduleRoam = useCallback(() => {
    if (roamTimer.current) clearTimeout(roamTimer.current)
    roamTimer.current = setTimeout(() => {
      const pick = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)]
      setState(s => ({ ...s, activity: pick.a, mood: pick.a === "nap" ? "sleep" : "idle" }))
      if (actTimer.current) clearTimeout(actTimer.current)
      actTimer.current = setTimeout(() => {
        setState(s => ({ ...s, activity: "none", mood: "idle" }))
        scheduleRoam()
      }, pick.dur)
    }, ROAM_MIN_MS + Math.random() * ROAM_VAR_MS)
  }, [])

  // Stop whatever Jeff is doing and resume calm scheduling.
  const interruptActivity = useCallback(() => {
    if (actTimer.current) clearTimeout(actTimer.current)
    scheduleRoam()
    setState(s => (s.activity === "none" ? s : { ...s, activity: "none" }))
  }, [scheduleRoam])

  const show = useCallback((mood: JeffMoodType, message: string | null) => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
    interruptActivity()
    setState(s => ({ ...s, mood, message, visible: message != null, activity: "none" }))
    resetTimer.current = setTimeout(() => {
      setState(s => ({ ...s, mood: "idle", message: null, visible: false }))
    }, MESSAGE_MS)
  }, [interruptActivity])

  const triggerJeff = useCallback((event: JeffEvent) => {
    if (event === "page_change") {
      const pm = pageMessage(location.pathname)
      if (pm) show(pm.mood, pm.message)
      else { interruptActivity(); setState(s => ({ ...s, mood: "idle", message: null, visible: false })) }
      return
    }
    const cfg = EVENT_MAP[event]
    if (cfg) show(cfg.mood, cfg.message)
  }, [location.pathname, show, interruptActivity])

  const nudge = useCallback(() => {
    // Clicking Jeff: half the time he hops, otherwise he cheers you on.
    if (Math.random() < 0.5) {
      interruptActivity()
      setState(s => ({ ...s, activity: "jump", mood: "idle" }))
      if (actTimer.current) clearTimeout(actTimer.current)
      actTimer.current = setTimeout(() => { setState(s => ({ ...s, activity: "none" })); scheduleRoam() }, 1400)
      return
    }
    const msg = ENCOURAGEMENTS[nudgeIdx.current % ENCOURAGEMENTS.length]
    nudgeIdx.current += 1
    show("encourage", msg)
  }, [show, interruptActivity, scheduleRoam])

  const dismiss = useCallback(() => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
    setState(s => ({ ...s, message: null, visible: false }))
  }, [])

  // Greet on route change.
  useEffect(() => {
    triggerJeff("page_change")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Kick off the roaming loop once.
  useEffect(() => {
    scheduleRoam()
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current)
      if (roamTimer.current) clearTimeout(roamTimer.current)
      if (actTimer.current) clearTimeout(actTimer.current)
    }
  }, [scheduleRoam])

  // React to coin awards / lesson completions (single wiring point). `armed`
  // stays false through the initial async hydrate so loading data doesn't fake
  // a celebration.
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
