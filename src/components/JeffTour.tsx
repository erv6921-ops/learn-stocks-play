import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useApp } from "@/contexts/AppContext"
import { JeffMascot } from "@/components/JeffMascot"
import { Button } from "@/components/ui/button"
import { tourAnchors } from "@/lib/tourAnchors"
import {
  LayoutDashboard, BookOpen, FlaskConical, LineChart, Store, BarChart3,
  Trophy, Swords, UserCircle, Sparkles, X, ArrowRight, ArrowLeft,
  Coins, Flame, Target, Search, TrendingUp, ShoppingCart,
  Plus, Clock, CheckCircle2, Palette,
} from "lucide-react"

const SHOW_FLAG = "investiplay_show_tour"
const doneKey = (uid: string) => `investiplay_tour_done_${uid}`

// A symbol used for the live "how to trade" deep-dive.
const DEMO_SYMBOL = "AAPL"

type Mood = "happy" | "thinking" | "excited" | "teaching" | "celebrating"
type Placement = "bottom" | "top" | "right" | "left"

interface Step {
  route: string
  anchor?: string          // data-tour id; omitted = centered card (intro / outro)
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
  mood: Mood
  pad?: number             // spotlight padding around the element
}

// Jeff physically walks to each real control. Nav + HUD live in GameNav (present
// on every page), so those steps stay on /dashboard; the rest drill into pages.
const STEPS: Step[] = [
  // Welcome
  { route: "/dashboard", icon: Sparkles, title: "Hey, I'm Jeff! 👋", body: "I'm your money coach. Stick with me and I'll walk you around the whole app and show you what every button does. Let's go!", mood: "happy" },

  // The nav bar
  { route: "/dashboard", anchor: "nav-dashboard", icon: LayoutDashboard, title: "Dashboard", body: "Your home base. Tap here anytime to see your coins, level, streak and what to do next.", mood: "teaching" },
  { route: "/dashboard", anchor: "nav-lessons", icon: BookOpen, title: "Missions", body: "This button opens your lessons. Finish them to earn InvestiCoins and level up!", mood: "excited" },
  { route: "/dashboard", anchor: "nav-lab", icon: FlaskConical, title: "Lab", body: "The Applied Finance Lab covers real life money stuff like taxes, banking and credit.", mood: "teaching" },
  { route: "/dashboard", anchor: "nav-stocks", icon: LineChart, title: "Stocks", body: "Trade real companies with virtual cash. We'll come back here in a sec and I'll show you how!", mood: "thinking" },
  { route: "/dashboard", anchor: "nav-business", icon: Store, title: "Business", body: "Build your own business and run it like a real CEO. So much fun in here.", mood: "excited" },
  { route: "/dashboard", anchor: "nav-progress", icon: BarChart3, title: "Progress", body: "See where you're strong and what to study next.", mood: "teaching" },
  { route: "/dashboard", anchor: "nav-leaderboard", icon: Trophy, title: "Leaderboard", body: "Climb the rankings against your class. A little competition never hurts! 😏", mood: "happy" },
  { route: "/dashboard", anchor: "nav-challenges", icon: Swords, title: "Challenges", body: "Spend coins to enter class challenges, win and take the whole pot! 🏆", mood: "excited" },

  // HUD pills
  { route: "/dashboard", anchor: "hud-coins", icon: Coins, title: "Your InvestiCoins", body: "This is your money counter. Everything you earn shows up right here. Watch it grow!", mood: "celebrating" },
  { route: "/dashboard", anchor: "hud-profile", icon: UserCircle, title: "Your profile", body: "Tap your avatar to see your stats and badges, and to switch light or dark mode.", mood: "happy" },

  // Daily challenge
  { route: "/dashboard", anchor: "dash-today", icon: Flame, title: "Daily challenge", body: "Come back every day and tap Play Now for quick coins. That's how you build a streak!", mood: "excited" },

  // Missions page
  { route: "/lessons", anchor: "lesson-node", icon: BookOpen, title: "Pick a unit", body: "Each card is a unit of lessons. Tap one to start learning and earning. Easy!", mood: "excited" },

  // Lab page
  { route: "/lab", anchor: "lab-doc", icon: FlaskConical, title: "Open a lab doc", body: "Tap a document to work through a real world money scenario. This stuff is gold. ✨", mood: "teaching" },

  // Stocks list
  { route: "/stocks", anchor: "stocks-search", icon: Search, title: "Search any stock", body: "Type a ticker or company name here, like AAPL or Tesla, to pull up its page.", mood: "thinking" },
  { route: "/stocks", anchor: "stocks-movers", icon: TrendingUp, title: "Top movers", body: "See which stocks are jumping or dropping today. Flip between gainers and losers.", mood: "teaching" },
  { route: "/stocks", anchor: "stocks-row", icon: LineChart, title: "Open a stock", body: "Tap any stock to see its chart and trade it. Let me show you how to buy one!", mood: "excited" },

  // Stock detail: the trade flow
  { route: `/stocks/${DEMO_SYMBOL}`, anchor: "stock-range", icon: Clock, title: "Read the chart", body: "Tap these to zoom the chart from a day all the way out to years. Spot the trend!", mood: "thinking" },
  { route: `/stocks/${DEMO_SYMBOL}`, anchor: "stock-trade-toggle", icon: ShoppingCart, title: "Buy or Sell", body: "Here's the big one. Pick Buy to invest, or Sell to cash out shares you already own.", mood: "teaching" },
  { route: `/stocks/${DEMO_SYMBOL}`, anchor: "stock-shares", icon: Plus, title: "Choose how many", body: "Use the plus and minus buttons (or type a number) to set how many shares. The cost updates live below.", mood: "thinking" },
  { route: `/stocks/${DEMO_SYMBOL}`, anchor: "stock-trade", icon: CheckCircle2, title: "Place the order", body: "Hit this, then Confirm, and the trade is done. Coins move and the stock is yours. That's buying AND selling! 🎉", mood: "celebrating" },

  // Micro business
  { route: "/micro-business", anchor: "biz-product", icon: Store, title: "Product", body: "Welcome to your business! Start here by designing your product or service.", mood: "excited" },
  { route: "/micro-business", anchor: "biz-office", icon: BarChart3, title: "Office", body: "Manage the day to day: money, operations and the decisions a real owner makes.", mood: "teaching" },
  { route: "/micro-business", anchor: "biz-collab", icon: UserCircle, title: "Collaboration", body: "Find partners and negotiate with vendors. Business is a team sport! 🤝", mood: "thinking" },
  { route: "/micro-business", anchor: "biz-marketing", icon: Sparkles, title: "Marketing", body: "Build your brand and launch campaigns to get customers in the door.", mood: "happy" },
  { route: "/micro-business", anchor: "biz-activity", icon: Target, title: "Do the activities", body: "Each tab has tasks right here. Finish them to earn InvestiCoins and grow your empire. 🌱", mood: "excited" },

  // The rest
  { route: "/progress", anchor: "progress-overview", icon: BarChart3, title: "Your progress", body: "This map shows your strengths across every topic. Attack your weak spots to level fast.", mood: "teaching" },
  { route: "/leaderboard", anchor: "lead-podium", icon: Trophy, title: "Switch the board", body: "Flip between your class, friends and national rankings. Go climb! 🧗", mood: "happy" },
  { route: "/challenges", anchor: "challenge-enter", icon: Swords, title: "Join a challenge", body: "Jump into a challenge here, beat the goal and win the pot of coins. 💪", mood: "excited" },
  { route: "/profile", anchor: "profile-theme", icon: Palette, title: "Make it yours", body: "Switch between light and dark mode right here whenever you like.", mood: "happy" },

  // Done
  { route: "/dashboard", icon: Sparkles, title: "You're all set! 🚀", body: "That's the whole tour! Tap me in the corner anytime you need a hand. Now go stack some coins!", mood: "celebrating" },
]

interface Rect { top: number; left: number; width: number; height: number }

const close = (a: number, b: number) => Math.abs(a - b) < 0.5

export default function JeffTour() {
  const { user } = useApp()
  const location = useLocation()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [i, setI] = useState(0)
  const [rect, setRect] = useState<Rect | null>(null)
  const [uSize, setUSize] = useState({ w: 320, h: 240 })
  const [win, setWin] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1024,
    h: typeof window !== "undefined" ? window.innerHeight : 768,
  }))

  const started = useRef(false)
  const elRef = useRef<HTMLElement | null>(null)
  const unitRef = useRef<HTMLDivElement>(null)
  // true → glide to the new spot (step change); false → snap instantly (scroll/resize).
  const glideRef = useRef(true)

  const step = STEPS[i]
  const isLast = i === STEPS.length - 1

  // Track viewport size.
  useEffect(() => {
    const onResize = () => setWin({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Show the tour once per account: the first time an onboarded user lands on the
  // dashboard. It's marked done (per account) on finish/skip so it never repeats.
  useEffect(() => {
    if (started.current || !user?.id || !user.onboardingComplete) return
    if (!location.pathname.startsWith("/dashboard")) return
    let done = false
    try { done = localStorage.getItem(doneKey(user.id)) === "1" } catch { /* ignore */ }
    if (!done) { started.current = true; setI(0); setOpen(true) }
  }, [user?.id, user?.onboardingComplete, location.pathname])

  const measure = () => {
    const el = elRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.width > 0 && r.height > 0) setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
  }

  // Resolve the current step. Anchors register themselves (see lib/tourAnchors),
  // so for elements already on the page — like the nav icons — we read the exact
  // node synchronously with no lag and no searching. For a target on a page we're
  // navigating to, we get notified the moment it mounts instead of polling for it.
  useLayoutEffect(() => {
    if (!open) return
    const s = STEPS[i]
    let cancelled = false
    const timers: number[] = []
    elRef.current = null

    if (s.route && location.pathname !== s.route) navigate(s.route)
    // Nav links live inside GameNav's slide-out sidebar — tell it to open for
    // nav-* steps (and close for everything else) so the target is on screen.
    window.dispatchEvent(new CustomEvent("investiplay:nav-menu", { detail: { open: !!s.anchor?.startsWith("nav-") } }))
    if (!s.anchor) { setRect(null); return }

    const lockOn = (el: HTMLElement) => {
      elRef.current = el
      glideRef.current = true
      try { el.scrollIntoView({ block: "center", inline: "center" }) } catch { /* ignore */ }
      measure()
      // Re-measure a few times to settle after any scroll / entrance animation.
      timers.push(window.setTimeout(measure, 130), window.setTimeout(measure, 300), window.setTimeout(measure, 520))
    }

    const immediate = tourAnchors.get(s.anchor)
    if (immediate) {
      lockOn(immediate)
      return () => { cancelled = true; timers.forEach(clearTimeout) }
    }

    // Target isn't mounted yet (we just changed pages) — wait to be told it arrived.
    const unsub = tourAnchors.subscribe(() => {
      if (cancelled || elRef.current) return
      const el = tourAnchors.get(s.anchor!)
      if (el) lockOn(el)
    })
    const fallback = window.setTimeout(() => { if (!elRef.current) setRect(null) }, 3500)
    return () => { cancelled = true; unsub(); clearTimeout(fallback); timers.forEach(clearTimeout) }
    // location is intentionally omitted so navigation doesn't re-trigger resolution
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, open])

  // Keep the spotlight locked on its target while the page scrolls or resizes.
  // `reposition` re-reads getBoundingClientRect() on the current target, so the
  // highlight follows the element instead of staying at a fixed pixel position;
  // it snaps instantly (no glide) so it doesn't rubber-band behind the scroll.
  // Capture phase catches scrolling inside nested scroll containers too.
  useEffect(() => {
    if (!open) return
    const reposition = () => { glideRef.current = false; measure() }
    window.addEventListener("scroll", reposition, true)
    window.addEventListener("resize", reposition)
    return () => {
      window.removeEventListener("scroll", reposition, true)
      window.removeEventListener("resize", reposition)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Measure the Jeff + bubble unit so we can place it without overflowing.
  useLayoutEffect(() => {
    const el = unitRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect()
      setUSize(s => (close(s.w, r.width) && close(s.h, r.height) ? s : { w: r.width, h: r.height }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [open])

  const finish = () => {
    setOpen(false)
    elRef.current = null
    // Make sure the nav sidebar isn't left open if the tour is skipped mid-nav-step.
    window.dispatchEvent(new CustomEvent("investiplay:nav-menu", { detail: { open: false } }))
    try {
      localStorage.removeItem(SHOW_FLAG)
      if (user?.id) localStorage.setItem(doneKey(user.id), "1")
    } catch { /* ignore */ }
    navigate("/dashboard")
  }

  // Where to put Jeff + the bubble, and which way the arrow points.
  const { x, y, placement } = useMemo<{ x: number; y: number; placement: Placement | null }>(() => {
    const { w: uW, h: uH } = uSize
    if (!rect) {
      return { x: (win.w - uW) / 2, y: (win.h - uH) / 2, placement: null }
    }
    const GAP = 18
    const M = 12
    let placement: Placement = "bottom"
    let px = rect.left + rect.width / 2 - uW / 2
    let py = rect.top + rect.height + GAP

    if (py + uH > win.h - M) {
      const top = rect.top - uH - GAP
      if (top > M) { placement = "top"; py = top }
      else {
        const right = rect.left + rect.width + GAP
        const left = rect.left - uW - GAP
        if (right + uW < win.w - M) { placement = "right"; px = right; py = rect.top + rect.height / 2 - uH / 2 }
        else if (left > M) { placement = "left"; px = left; py = rect.top + rect.height / 2 - uH / 2 }
        else { placement = "bottom"; py = win.h - uH - M }
      }
    }
    px = Math.max(M, Math.min(px, win.w - uW - M))
    py = Math.max(M, Math.min(py, win.h - uH - M))
    return { x: px, y: py, placement }
  }, [rect, uSize, win])

  if (!open) return null
  const Icon = step.icon
  const pad = step.pad ?? 8
  const bubbleW = Math.min(330, win.w - 24)
  // One smooth glide curve, shared by the spotlight (CSS) and Jeff (framer) so
  // they travel together when switching steps.
  const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"
  // Glide on step changes, snap instantly while tracking scroll/resize.
  const gliding = glideRef.current
  const GLIDE = gliding ? `top .5s ${EASE}, left .5s ${EASE}, width .5s ${EASE}, height .5s ${EASE}` : "none"
  const ARROW_GLIDE = gliding ? `left .5s ${EASE}, top .5s ${EASE}` : "none"
  const MOVE = gliding ? { type: "tween" as const, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } : { duration: 0 }
  const box = rect ? { top: rect.top - pad, left: rect.left - pad, width: rect.width + pad * 2, height: rect.height + pad * 2 } : null

  // Arrow sits on the side of the unit facing the highlighted element, and points
  // at the target's centre — its offset is derived from where the target actually
  // is relative to the bubble, so it tracks the right nav item on every step
  // (not a fixed offset that always points at the first tab).
  const arrow = (() => {
    if (!placement || !rect) return null
    const base: React.CSSProperties = {
      position: "absolute", width: 14, height: 14, background: "hsl(var(--card))",
      transform: "rotate(45deg)", transition: ARROW_GLIDE,
    }
    // Centre of the target, expressed relative to the bubble's top-left corner.
    const aLeft = Math.max(16, Math.min(rect.left + rect.width / 2 - x - 7, uSize.w - 30))
    const aTop = Math.max(16, Math.min(rect.top + rect.height / 2 - y - 7, uSize.h - 30))
    if (placement === "bottom") return { ...base, top: -6, left: aLeft, borderLeft: "1px solid hsl(var(--border))", borderTop: "1px solid hsl(var(--border))" }
    if (placement === "top") return { ...base, bottom: -6, left: aLeft, borderRight: "1px solid hsl(var(--border))", borderBottom: "1px solid hsl(var(--border))" }
    if (placement === "right") return { ...base, left: -6, top: aTop, borderLeft: "1px solid hsl(var(--border))", borderBottom: "1px solid hsl(var(--border))" }
    return { ...base, right: -6, top: aTop, borderRight: "1px solid hsl(var(--border))", borderTop: "1px solid hsl(var(--border))" } // left
  })()

  return (
    <div className="fixed inset-0 z-[100]" style={{ pointerEvents: "none" }}>
      {/* Click-blocker + dim. When anchored we use a spotlight cutout; otherwise a flat dim. */}
      <div className="absolute inset-0" style={{ pointerEvents: "auto", background: rect ? "transparent" : "rgba(2,15,10,0.5)" }} />

      {box && (
        <>
          {/* The spotlight hole: a box whose huge shadow dims everything else. */}
          <div
            className="absolute rounded-xl"
            style={{ pointerEvents: "none", ...box, boxShadow: "0 0 0 9999px rgba(2,15,10,0.55)", transition: GLIDE }}
          />
          {/* Glowing pulse ring around the element. */}
          <div
            className="absolute rounded-xl ring-2 ring-primary animate-pulse"
            style={{ pointerEvents: "none", ...box, boxShadow: "0 0 22px 4px hsl(var(--primary) / 0.55)", transition: GLIDE }}
          />
        </>
      )}

      {/* Jeff + speech bubble — walks to each element. */}
      <motion.div
        ref={unitRef}
        className="absolute top-0 left-0"
        style={{ width: bubbleW, pointerEvents: "auto" }}
        initial={false}
        animate={{ x, y }}
        transition={MOVE}
      >
        <div className="relative rounded-2xl bg-card border border-border shadow-xl p-4">
          {arrow && <div style={arrow} />}

          <button onClick={finish} aria-label="Skip tour"
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg text-muted-foreground hover:bg-muted/60 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 mb-2 pr-6">
            <div className="w-12 h-12 shrink-0">
              <JeffMascot mood={step.mood} size="lg" animate />
            </div>
            <motion.div key={`t-${i}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-base font-display font-bold leading-tight">{step.title}</h2>
            </motion.div>
          </div>

          <motion.p key={`b-${i}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.04 }}
            className="text-[13.5px] leading-relaxed text-muted-foreground">{step.body}</motion.p>

          {/* Slim progress bar + count (cleaner than 30+ dots). */}
          <div className="flex items-center gap-2 my-3">
            <div className="flex-1 h-1.5 rounded-full bg-muted-foreground/15 overflow-hidden">
              <motion.div className="h-full rounded-full bg-primary"
                animate={{ width: `${((i + 1) / STEPS.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }} />
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground tabular-nums">{i + 1}/{STEPS.length}</span>
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
        </div>
      </motion.div>
    </div>
  )
}
