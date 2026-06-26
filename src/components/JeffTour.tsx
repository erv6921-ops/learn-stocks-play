import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useApp } from "@/contexts/AppContext"
import { JeffMascot } from "@/components/JeffMascot"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard, BookOpen, FlaskConical, LineChart, Store, BarChart3,
  Trophy, Swords, UserCircle, Sparkles, X, ArrowRight, ArrowLeft,
} from "lucide-react"

const SHOW_FLAG = "investiplay_show_tour"
const doneKey = (uid: string) => `investiplay_tour_done_${uid}`

interface Step {
  route: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
  mood: "happy" | "thinking" | "excited" | "teaching" | "celebrating"
}

// Jeff walks you through each real page in order.
const STEPS: Step[] = [
  { route: "/dashboard", icon: Sparkles, title: "Hey, I'm Jeff! 👋", body: "I'm your money coach. Come on — I'll walk you through the whole app so you know your way around!", mood: "happy" },
  { route: "/dashboard", icon: LayoutDashboard, title: "Dashboard", body: "This is your home base. Check your coins, level, and streak, and see what to do next. Start here every day.", mood: "teaching" },
  { route: "/lessons", icon: BookOpen, title: "Missions", body: "Here's where you learn! Ride the coaster through each unit — finish lessons to earn InvestiCoins and level up.", mood: "excited" },
  { route: "/lab", icon: FlaskConical, title: "Lab", body: "The Applied Finance Lab — real-life money situations like taxes, banking, and credit that you'll actually use.", mood: "teaching" },
  { route: "/stocks", icon: LineChart, title: "Stocks", body: "Trade real companies with live prices using virtual cash. Practice investing with zero real-world risk.", mood: "thinking" },
  { route: "/micro-business", icon: Store, title: "Business", body: "Build your own micro-business — make decisions, track profit, and grow it over time.", mood: "excited" },
  { route: "/progress", icon: BarChart3, title: "Progress", body: "See how you're doing across every topic, where you're strong, and what to focus on next.", mood: "teaching" },
  { route: "/leaderboard", icon: Trophy, title: "Leaderboard", body: "Compete with your class and climb the rankings. A little friendly competition goes a long way!", mood: "happy" },
  { route: "/challenges", icon: Swords, title: "Challenges", body: "Spend coins to enter class challenges. Crush the goal and win the whole pot of InvestiCoins! 🏆", mood: "excited" },
  { route: "/profile", icon: UserCircle, title: "Your Profile", body: "This is you! Your stats and badges live here — and you can switch between light and dark mode too.", mood: "happy" },
  { route: "/dashboard", icon: Sparkles, title: "You're all set! 🚀", body: "That's the grand tour! Tap me in the corner anytime you need a hand. Now go earn some coins!", mood: "celebrating" },
]

export default function JeffTour() {
  const { user } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [i, setI] = useState(0)
  const started = useRef(false)
  const [winW, setWinW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024)

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Open exactly once, after onboarding, on the dashboard.
  useEffect(() => {
    if (started.current || !user?.id || !user.onboardingComplete) return
    if (!location.pathname.startsWith("/dashboard")) return
    let show = false
    try {
      show = localStorage.getItem(SHOW_FLAG) === "1" && localStorage.getItem(doneKey(user.id)) !== "1"
    } catch { /* ignore */ }
    if (show) { started.current = true; setI(0); setOpen(true) }
  }, [user?.id, user?.onboardingComplete, location.pathname])

  // Walk to the current step's page.
  useEffect(() => {
    if (open && STEPS[i] && location.pathname !== STEPS[i].route) navigate(STEPS[i].route)
  }, [i, open]) // eslint-disable-line react-hooks/exhaustive-deps

  const finish = () => {
    setOpen(false)
    try {
      localStorage.removeItem(SHOW_FLAG)
      if (user?.id) localStorage.setItem(doneKey(user.id), "1")
    } catch { /* ignore */ }
    navigate("/dashboard")
  }

  if (!open) return null
  const step = STEPS[i]
  const isLast = i === STEPS.length - 1
  const Icon = step.icon

  // Jeff strolls left → right across the bottom as the tour advances.
  const unitW = Math.min(330, winW - 32)
  const leftStart = 16
  const leftEnd = Math.max(leftStart, winW - unitW - 16)
  const x = STEPS.length > 1 ? leftStart + (i / (STEPS.length - 1)) * (leftEnd - leftStart) : leftStart

  return (
    <div className="fixed inset-0 z-[100] bg-black/25" style={{ pointerEvents: "auto" }}>
      <motion.div
        className="absolute bottom-4 left-0"
        style={{ width: unitW }}
        animate={{ x }}
        transition={{ type: "spring", stiffness: 80, damping: 17 }}
      >
        {/* Speech bubble */}
        <div className="relative rounded-2xl bg-card border border-border shadow-xl p-4">
          <button onClick={finish} aria-label="Skip tour"
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg text-muted-foreground hover:bg-muted/60 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1.5 pr-6">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-base font-display font-bold leading-tight">{step.title}</h2>
          </div>
          <p className="text-[13.5px] leading-relaxed text-muted-foreground">{step.body}</p>

          <div className="flex items-center gap-1 my-3">
            {STEPS.map((_, idx) => (
              <span key={idx} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/25"}`} />
            ))}
          </div>

          <div className="flex items-center justify-between gap-2">
            <button onClick={finish} className="text-xs font-semibold text-muted-foreground hover:text-foreground">Skip</button>
            <div className="flex items-center gap-2">
              {i > 0 && (
                <Button variant="outline" size="sm" onClick={() => setI(n => n - 1)} className="press-scale h-8 px-2.5">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              {isLast ? (
                <Button size="sm" onClick={finish} className="press-scale h-8">Let's go! 🚀</Button>
              ) : (
                <Button size="sm" onClick={() => setI(n => n + 1)} className="press-scale h-8">
                  Next <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>

          {/* tail pointing down to Jeff */}
          <div className="absolute left-9 -bottom-1.5 w-3 h-3 rotate-45"
            style={{ background: "hsl(var(--card))", borderRight: "1px solid hsl(var(--border))", borderBottom: "1px solid hsl(var(--border))" }} />
        </div>

        {/* Jeff, bobbing along as he walks */}
        <motion.div
          className="mt-1.5 ml-5"
          style={{ width: 80, height: 80, filter: "drop-shadow(0 8px 14px rgba(6,41,31,0.28))" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <JeffMascot mood={step.mood} />
        </motion.div>
      </motion.div>
    </div>
  )
}
