import React, { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import i18n from "@/i18n"

export type JeffMoodType = "idle" | "celebrate" | "encourage" | "think" | "sleep"
export type JeffEvent = "coins_earned" | "lesson_complete" | "level_up" | "streak_update" | "page_change"
// Autonomous "alive" behaviours that play out when Jeff is left alone.
export type JeffActivity = "none" | "walkAcross" | "walkSide" | "jump" | "cook" | "pack" | "nap" | "flip" | "party"

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
  // Fire a custom reaction (used by quizzes for clutch/celebrate moments).
  react: (mood: JeffMoodType, message: string | null, activity?: JeffActivity) => void
}

const JeffContext = createContext<JeffContextValue | undefined>(undefined)

const MESSAGE_MS = 4000
const PARTY_MS = 4200 // center-stage lesson celebration length
// Coin reactions ("Rich-kid energy, keep it up") fire at most this often, so a
// burst of small awards is one toast, not a toast per ledger entry.
const COIN_REACT_THROTTLE_MS = 60_000
// Routes where a coin toast would interrupt focused work: a lesson (Jeff's
// class and the interactive walk) and a unit test. Jeff stays quiet there and
// lets the page's own celebration speak.
const QUIET_COIN_ROUTES = [/^\/lessons\/[^/]+/, /^\/student\/lesson\//, /^\/unit-test\//]

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
const ROAM_VAR_MS = 12000 // next activity fires after 11-23s of calm

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

interface JeffLine { mood: JeffMoodType; message: string }

// Jeff's speech-bubble copy is translated; the arrays live in the `jeffLines`
// i18n namespace and are read at call time so his voice follows the active
// language. Mood stays in code since it drives animation, not text.
const jeffLines = (key: string): string[] => {
  const v = i18n.t(`jeffLines.${key}`, { returnObjects: true })
  return Array.isArray(v) ? (v as string[]) : []
}

const EVENT_MOODS: Record<Exclude<JeffEvent, "page_change">, JeffMoodType> = {
  coins_earned: "celebrate",
  lesson_complete: "celebrate",
  level_up: "celebrate",
  streak_update: "encourage",
}

// The page prefix → i18n sub-key + mood used for greetings and proactive tips.
const PAGE_KEYS: { test: (p: string) => boolean; key: string; mood: JeffMoodType }[] = [
  { test: p => p.startsWith("/dashboard"), key: "dashboard", mood: "idle" },
  { test: p => p.startsWith("/lessons") || p.startsWith("/missions"), key: "lessons", mood: "encourage" },
  { test: p => p.startsWith("/lab"), key: "lab", mood: "think" },
  { test: p => p.startsWith("/stocks") || p.startsWith("/stock-market"), key: "stocks", mood: "think" },
  { test: p => p.startsWith("/micro-business") || p.startsWith("/business"), key: "business", mood: "encourage" },
  { test: p => p.startsWith("/progress"), key: "progress", mood: "encourage" },
  { test: p => p.startsWith("/leaderboard"), key: "leaderboard", mood: "encourage" },
  { test: p => p.startsWith("/challenges"), key: "challenges", mood: "encourage" },
  { test: p => p.startsWith("/profile"), key: "profile", mood: "idle" },
  { test: p => p.startsWith("/daily"), key: "daily", mood: "encourage" },
]

// One greeting picked at random when Jeff lands on a page.
function pageGreeting(path: string): JeffLine | null {
  const match = PAGE_KEYS.find(p => p.test(path))
  if (!match) return null
  const msgs = jeffLines(`greeting.${match.key}`)
  return msgs.length ? { mood: match.mood, message: pick(msgs) } : null
}

// Occasional proactive tips Jeff drops on his own - page-aware, then general.
function pageTips(path: string): string[] {
  const match = PAGE_KEYS.find(p => p.test(path))
  const tips = match ? jeffLines(`tips.${match.key}`) : []
  return tips.length ? tips : jeffLines("generalTips")
}

export function JeffProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { jeffsHistory } = useApp()

  const [state, setState] = useState<JeffState>({ mood: "idle", message: null, visible: false, activity: "none" })

  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const roamTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const actTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nudgeIdx = useRef(0)
  // Latest route, read inside the (stable) roam scheduler for page-aware tips.
  const locationRef = useRef(location.pathname)
  locationRef.current = location.pathname

  // ── Autonomous roaming scheduler ──
  const scheduleRoam = useCallback(() => {
    if (roamTimer.current) clearTimeout(roamTimer.current)
    roamTimer.current = setTimeout(() => {
      // ~1 in 3 calm moments, Jeff proactively drops a page-aware tip; the rest
      // of the time he does a little roam/vignette.
      if (Math.random() < 0.34) {
        const tip = pick(pageTips(locationRef.current))
        if (resetTimer.current) clearTimeout(resetTimer.current)
        setState(s => ({ ...s, mood: "encourage", message: tip, visible: true, activity: "none" }))
        resetTimer.current = setTimeout(() => {
          setState(s => ({ ...s, mood: "idle", message: null, visible: false }))
          scheduleRoam()
        }, MESSAGE_MS)
        return
      }
      const act = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)]
      setState(s => ({ ...s, activity: act.a, mood: act.a === "nap" ? "sleep" : "idle" }))
      if (actTimer.current) clearTimeout(actTimer.current)
      actTimer.current = setTimeout(() => {
        setState(s => ({ ...s, activity: "none", mood: "idle" }))
        scheduleRoam()
      }, act.dur)
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

  // Center-stage celebration: Jeff parades to the middle of the screen and goes
  // jolly (dance + backflip), then heads back to his corner. Used on lesson wins.
  const party = useCallback((message: string) => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
    if (roamTimer.current) clearTimeout(roamTimer.current)
    if (actTimer.current) clearTimeout(actTimer.current)
    setState(s => ({ ...s, mood: "celebrate", message, visible: true, activity: "party" }))
    resetTimer.current = setTimeout(() => {
      setState(s => ({ ...s, mood: "idle", message: null, visible: false, activity: "none" }))
      scheduleRoam()
    }, PARTY_MS)
  }, [scheduleRoam])

  const triggerJeff = useCallback((event: JeffEvent) => {
    if (event === "page_change") {
      const pm = pageGreeting(location.pathname)
      if (pm) show(pm.mood, pm.message)
      else { interruptActivity(); setState(s => ({ ...s, mood: "idle", message: null, visible: false })) }
      return
    }
    if (event === "lesson_complete") { party(pick(jeffLines("event.lesson_complete"))); return }
    const msgs = jeffLines(`event.${event}`)
    if (msgs.length) show(EVENT_MOODS[event], pick(msgs))
  }, [location.pathname, show, interruptActivity, party])

  const nudge = useCallback(() => {
    // Clicking Jeff: half the time he hops, otherwise he cheers you on.
    if (Math.random() < 0.5) {
      interruptActivity()
      setState(s => ({ ...s, activity: "jump", mood: "idle" }))
      if (actTimer.current) clearTimeout(actTimer.current)
      actTimer.current = setTimeout(() => { setState(s => ({ ...s, activity: "none" })); scheduleRoam() }, 1400)
      return
    }
    const encouragements = jeffLines("encouragements")
    const msg = encouragements.length ? encouragements[nudgeIdx.current % encouragements.length] : null
    nudgeIdx.current += 1
    show("encourage", msg)
  }, [show, interruptActivity, scheduleRoam])

  const dismiss = useCallback(() => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
    setState(s => ({ ...s, message: null, visible: false }))
  }, [])

  // Custom on-demand reaction with an optional one-shot activity (e.g. a backflip
  // for a clutch correct answer). Cancels roaming, plays, then settles back to idle.
  const react = useCallback((mood: JeffMoodType, message: string | null, activity: JeffActivity = "none") => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
    if (roamTimer.current) clearTimeout(roamTimer.current)
    if (actTimer.current) clearTimeout(actTimer.current)
    setState(s => ({ ...s, mood, message, visible: message != null, activity }))
    if (activity !== "none") {
      actTimer.current = setTimeout(() => setState(s => ({ ...s, activity: "none" })), activity === "flip" ? 1300 : 1400)
    }
    resetTimer.current = setTimeout(() => {
      setState(s => ({ ...s, mood: "idle", message: null, visible: false, activity: "none" }))
      scheduleRoam()
    }, MESSAGE_MS)
  }, [scheduleRoam])

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

  // React to coin awards (single wiring point). `armed` stays false through the
  // initial async hydrate so loading data doesn't fake a celebration.
  //
  // Lesson completions deliberately do NOT fire the center-stage "party" Jeff
  // anymore - that mid-screen jump is replaced by the celebration baked into the
  // lesson completion screen itself (see LessonDetail). A coin gain still gives
  // Jeff a small corner reaction.
  const prevCoins = useRef(0)
  const armed = useRef(false)
  const lastCoinReact = useRef(0)
  useEffect(() => {
    const t = setTimeout(() => { armed.current = true }, 2500)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    const coins = jeffsHistory.filter(h => h.amount > 0).length
    if (!armed.current) { prevCoins.current = coins; return }
    const coinsUp = coins > prevCoins.current
    prevCoins.current = coins
    if (!coinsUp) return
    // Quiet on lesson and unit-test routes, and at most one reaction a minute
    // elsewhere. Skipped awards are simply not announced.
    if (QUIET_COIN_ROUTES.some(re => re.test(locationRef.current))) return
    const now = Date.now()
    if (now - lastCoinReact.current < COIN_REACT_THROTTLE_MS) return
    lastCoinReact.current = now
    triggerJeff("coins_earned")
  }, [jeffsHistory, triggerJeff])

  return (
    <JeffContext.Provider value={{ ...state, triggerJeff, nudge, dismiss, react }}>
      {children}
    </JeffContext.Provider>
  )
}

export function useJeff() {
  const ctx = useContext(JeffContext)
  if (!ctx) throw new Error("useJeff must be used within a JeffProvider")
  return ctx
}
