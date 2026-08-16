import React, { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"

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

// Multiple celebration lines per event so Jeff never repeats himself.
const EVENT_LINES: Record<Exclude<JeffEvent, "page_change">, { mood: JeffMoodType; messages: string[] }> = {
  coins_earned: { mood: "celebrate", messages: [
    "Cha-ching! More InvestiCoins! 💰", "Coins in the bank - let's gooo! 🤑",
    "That's how you stack it! 💸", "Rich-kid energy, keep it up 😎",
  ] },
  lesson_complete: { mood: "celebrate", messages: [
    "Lesson DONE! You're unstoppable! 🎯", "Big brain moment! 🧠✨",
    "Another one in the bag! 🔥", "You + knowledge = dangerous 💪",
  ] },
  level_up: { mood: "celebrate", messages: [
    "LEVEL UP! You're built different 🚀", "New level unlocked - legend! 👑",
    "Glow-up complete, next level 📈",
  ] },
  streak_update: { mood: "encourage", messages: [
    "Streak alive! Don't break it 🔥", "Day after day - that's discipline 💯",
    "Consistency royalty 👑🔥",
  ] },
}

const GENERAL_TIPS = [
  "Tiny habits today = big money tomorrow 🌱",
  "Learning money young? Total cheat code 😎",
  "Future-you is gonna thank present-you 🙌",
  "Keep that streak alive - I believe in you 🔥",
]

// One greeting picked at random when Jeff lands on a page.
function pageGreeting(path: string): JeffLine | null {
  const g = (mood: JeffMoodType, msgs: string[]): JeffLine => ({ mood, message: pick(msgs) })
  if (path.startsWith("/dashboard")) return g("idle", ["Ready to stack some coins today? 📈", "Welcome back, future millionaire! 💰", "Let's make today count! ✨", "Your money empire awaits 👑"])
  if (path.startsWith("/lessons") || path.startsWith("/missions")) return g("encourage", ["Lesson time - let's level up that brain! 🧠", "One lesson closer to genius 🚀", "Hop on the coaster, let's ride! 🎢", "You're SO close to the next checkpoint! 🏔️"])
  if (path.startsWith("/lab")) return g("think", ["Real-world money skills unlock here 🔬", "This stuff? You'll use it for life 💡", "Adulting, but make it fun 🧪"])
  if (path.startsWith("/stocks") || path.startsWith("/stock-market")) return g("think", ["Let's read these charts together 📊", "Buy low, sell high - you got this 🤔", "Wall Street who? You're the trader 📈", "Zero risk, all the practice 💸"])
  if (path.startsWith("/micro-business") || path.startsWith("/business")) return g("encourage", ["Time to be the boss 💼", "Build that empire, CEO! 🏪", "Every big company started small 🌱"])
  if (path.startsWith("/progress")) return g("encourage", ["Look how far you've come! 📈", "Proof you're getting smarter 🧠", "Your growth is glowing ✨"])
  if (path.startsWith("/leaderboard")) return g("encourage", ["#1 has your name on it 🏆", "Go flex on your classmates 😎", "Climb, climb, climb! 🧗"])
  if (path.startsWith("/challenges")) return g("encourage", ["Winner takes the pot - that's you 🏆", "Bet on yourself and WIN 💪", "Challenge accepted? 😏"])
  if (path.startsWith("/profile")) return g("idle", ["Lookin' good - that's all you 🌟", "Check those badges you earned 🎖️", "Your stats are stacking up 📊"])
  if (path.startsWith("/daily")) return g("encourage", ["Daily streak = daily gains 🔥", "Quick games, real coins 🎮"])
  return null
}

// Occasional proactive tips Jeff drops on his own - page-aware, then general.
function pageTips(path: string): string[] {
  if (path.startsWith("/dashboard")) return ["Psst - finish a lesson today to keep your streak alive 🔥", "Tip: Missions are the fastest way to earn coins 💰", "The more you learn, the more you earn - literally 🧠"]
  if (path.startsWith("/lessons")) return ["Ace the end quiz for bonus coins! 🎯", "Stuck? Reread the recap, then crush the check ✅", "Finish a whole unit to unlock the next 🔓"]
  if (path.startsWith("/lab")) return ["These scenarios are real adult stuff - you're ahead of the game 😎", "Taxes & credit feel boring… till it's your money 💡"]
  if (path.startsWith("/stocks")) return ["Real prices, fake cash - experiment freely! 💸", "Watch a stock a few days before you 'buy' 👀", "Don't put all your coins in one stock 🧺"]
  if (path.startsWith("/micro-business") || path.startsWith("/business")) return ["Track profit each round - think like a CEO 📒", "Reinvest your earnings to grow faster 🌱"]
  if (path.startsWith("/progress")) return ["Attack your weakest topic to level up fastest 📈", "Mastery beats speed - go deep 🧠"]
  if (path.startsWith("/leaderboard")) return ["Want to climb? Lessons give the most InvestiCoins 🚀", "Race a partner to #1 🏁"]
  if (path.startsWith("/challenges")) return ["Enter a challenge - winner takes ALL the coins 🏆", "Even if you don't win, you learn. Still a W 💪"]
  return GENERAL_TIPS
}

const ENCOURAGEMENTS = [
  "Keep going - you've got this! 💪",
  "Every lesson makes you richer 🧠",
  "Small steps, big gains 📈",
  "I believe in you! 🌟",
  "Future investor in the making 💼",
  "You're literally getting smarter rn 🤓",
  "Don't stop - you're so close! 🏁",
  "Main character energy 💫",
]

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
    if (event === "lesson_complete") { party(pick(EVENT_LINES.lesson_complete.messages)); return }
    const cfg = EVENT_LINES[event]
    if (cfg) show(cfg.mood, pick(cfg.messages))
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
    const msg = ENCOURAGEMENTS[nudgeIdx.current % ENCOURAGEMENTS.length]
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
  useEffect(() => {
    const t = setTimeout(() => { armed.current = true }, 2500)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    const coins = jeffsHistory.filter(h => h.amount > 0).length
    if (!armed.current) { prevCoins.current = coins; return }
    const coinsUp = coins > prevCoins.current
    prevCoins.current = coins
    if (coinsUp) triggerJeff("coins_earned")
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
