import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useApp } from "@/contexts/AppContext"
import { JeffMascot } from "@/components/JeffMascot"
import { Button } from "@/components/ui/button"
import { tourAnchors } from "@/lib/tourAnchors"
import {
  BookOpen, FlaskConical, LineChart, Store,
  Trophy, X, ArrowRight, ArrowLeft, Target, Coins, Sparkles,
} from "lucide-react"

const SHOW_FLAG = "investiplay_show_tour"
const doneKey = (uid: string) => `investiplay_tour_done_${uid}`

// One-time reward for finishing the tour (not for skipping it). Gated by this
// exact reason in the coin ledger so it's granted once, ever.
const TOUR_REWARD_AMOUNT = 10
const TOUR_REWARD_REASON = "Tour reward 🎉"

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

// A short 5-slide tour: Jeff points out the main pages from the nav (which lives
// in GameNav on every screen), so we stay on /dashboard and never page-hop. The
// greeting and sign-off are folded into the first and last slides to keep it to
// exactly five taps.
const STEPS: Step[] = [
  // Centered welcome (no anchor -> Jeff sits in the middle of the screen, then
  // glides to the side on the next slide).
  { route: "/dashboard", icon: Sparkles, title: "Hey, I'm Jeff! 👋", body: "I'm your money coach. Quick tour of the app. Let's go!", mood: "happy" },
  { route: "/dashboard", anchor: "nav-lessons", icon: BookOpen, title: "Missions", body: "Start here. These are your lessons. Finish them to earn InvestiCoins and level up!", mood: "excited" },
  { route: "/dashboard", anchor: "nav-lab", icon: FlaskConical, title: "The Lab", body: "Real life money stuff like taxes, banking, and credit, through hands on scenarios.", mood: "teaching" },
  { route: "/dashboard", anchor: "nav-stocks", icon: LineChart, title: "Stocks", body: "Trade real companies with virtual cash and watch your portfolio grow.", mood: "thinking" },
  { route: "/dashboard", anchor: "nav-business", icon: Store, title: "Business", body: "Build and run your own business like a real CEO.", mood: "excited" },
  { route: "/dashboard", anchor: "nav-leaderboard", icon: Trophy, title: "Leaderboard & Challenges", body: "Compete with your class and win coin pots. Tap me in the corner anytime you need a hand!", mood: "happy" },
  // Reward slide (centered, no anchor). Finishing here pays out the coins.
  { route: "/dashboard", icon: Coins, title: "You're all set! 🎉", body: "Here's 10 InvestiCoins for finishing the tour. Now go stack some more!", mood: "celebrating" },
]

interface Rect { top: number; left: number; width: number; height: number }

const close = (a: number, b: number) => Math.abs(a - b) < 0.5

export default function JeffTour() {
  const { user, awardJeffs, jeffsHistory } = useApp()
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

  // Show the tour once per account, the first time an onboarded user lands on
  // the dashboard. It's marked done (per account) on finish/skip so it never
  // repeats.
  useEffect(() => {
    if (started.current) return
    if (!location.pathname.startsWith("/dashboard")) return

    // Fast path: onboarding sets SHOW_FLAG synchronously right before it
    // navigates here, so we can open the instant the dashboard mounts, without
    // waiting for the user profile to finish (re)hydrating from the database
    // (which is what onboardingComplete depends on and can lag by a second+).
    let showFlag = false
    try { showFlag = localStorage.getItem(SHOW_FLAG) === "1" } catch { /* ignore */ }
    if (showFlag) { started.current = true; setI(0); setOpen(true); return }

    // Fallback: first time an already-onboarded user reaches the dashboard
    // (e.g. the flag was never set, or was cleared on another device).
    if (!user?.id || !user.onboardingComplete) return
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
  // so for elements already on the page - like the nav icons - we read the exact
  // node synchronously with no lag and no searching. For a target on a page we're
  // navigating to, we get notified the moment it mounts instead of polling for it.
  useLayoutEffect(() => {
    if (!open) return
    const s = STEPS[i]
    let cancelled = false
    const timers: number[] = []
    elRef.current = null

    if (s.route && location.pathname !== s.route) navigate(s.route)
    // Nav links live inside GameNav's slide-out sidebar - tell it to open for
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

    // Target isn't mounted yet (we just changed pages) - wait to be told it arrived.
    const unsub = tourAnchors.subscribe(() => {
      if (cancelled || elRef.current) return
      const el = tourAnchors.get(s.anchor!)
      if (el) lockOn(el)
    })
    // If the anchor never mounts on this route (e.g. a control that only exists
    // after some prior action), don't sit on a bubble describing something the
    // student can't see, so advance to the next step. The final step is a
    // centered outro, so we never skip past the end.
    const fallback = window.setTimeout(() => {
      if (elRef.current) return
      setRect(null)
      setI(n => (n < STEPS.length - 1 ? n + 1 : n))
    }, 3500)
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

  const finish = (completed = false) => {
    // Reward only a genuine completion (reaching the final slide), never a skip,
    // and only once ever - gated by the ledger so it can't double-pay.
    if (completed && user?.id && !jeffsHistory.some(e => e.reason === TOUR_REWARD_REASON)) {
      awardJeffs(TOUR_REWARD_AMOUNT, TOUR_REWARD_REASON)
    }
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
  // at the target's centre - its offset is derived from where the target actually
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

      {/* Jeff + speech bubble - walks to each element. */}
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

          <button onClick={() => finish(false)} aria-label="Skip tour"
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
            <button onClick={() => finish(false)} className="text-xs font-semibold text-muted-foreground hover:text-foreground">Skip</button>
            <div className="flex items-center gap-2">
              {i > 0 && (
                <Button variant="outline" size="sm" onClick={() => setI(n => n - 1)} className="press-scale h-8 px-2.5">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              {isLast ? (
                <Button size="sm" onClick={() => finish(true)} className="press-scale h-8">Claim 10 coins 🎉</Button>
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
