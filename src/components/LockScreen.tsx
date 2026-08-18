// Access gates for features that aren't open to everyone yet.
//   <ComingSoon />  - a fully-locked "coming soon" screen (Micro Business,
//                     Executive Floor). Pass `bare` to drop the nav when it's
//                     rendered inside a page that already has its own chrome.
//   <CoinsGate />   - wraps a page and shows a "reach N coins to unlock" screen
//                     until the student's balance clears the threshold.

import React from "react"
import { Link } from "react-router-dom"
import { Construction, Lock, Coins, ArrowRight } from "lucide-react"
import GameNav from "@/components/GameNav"
import { useApp } from "@/contexts/AppContext"

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <GameNav />
      <div className="max-w-md mx-auto px-6 pt-16 pb-28">{children}</div>
    </div>
  )
}

function GateCard({ icon: Icon, heading, sub }: { icon: typeof Lock; heading: string; sub: React.ReactNode }) {
  return (
    <div className="text-center flex flex-col items-center gap-4 rounded-3xl border border-border/60 bg-card p-8 shadow-card">
      <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-1.5">
        <h1 className="font-display text-2xl font-extrabold">{heading}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">{sub}</p>
      </div>
    </div>
  )
}

// The frosted "coming soon" glass card that floats over the teaser.
function ComingSoonCard({ title }: { title: string }) {
  return (
    <div className="text-center flex flex-col items-center gap-4 rounded-[28px] border border-black/10 dark:border-white/10 bg-card/70 backdrop-blur-2xl p-8 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.5)] max-w-sm">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Construction className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-1.5">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">In development</span>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">Coming soon — we're putting the finishing touches on this. Check back shortly!</p>
      </div>
      <Link
        to="/lessons"
        className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold shadow-[0_6px_20px_-6px_hsl(var(--primary))] hover:opacity-90 active:scale-[0.98] transition"
      >
        Go to Missions <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

/**
 * A fully-locked "coming soon" screen.
 *  - `preview`: render the real feature behind a heavy blur as an inert teaser
 *    (a live nav stays clickable on top so the user can still navigate away).
 *  - `bare`: skip the nav (for embedding inside a page that has its own chrome).
 */
export function ComingSoon({ title, bare = false, preview }: { title: string; bare?: boolean; preview?: React.ReactNode }) {
  if (preview) {
    return (
      // Pin to exactly one viewport and clip overflow, so the blurred studio
      // (which grows very tall once its data loads) can't push the centered
      // card off-screen. The card stays fixed in the middle of the screen.
      <div className="fixed inset-0 h-screen overflow-hidden bg-background">
        {/* The real feature, blurred & non-interactive, clipped to the viewport.
            Its own nav is hidden so we don't get a doubled bar through the blur. */}
        <div aria-hidden className="absolute inset-0 h-full overflow-hidden pointer-events-none select-none blur-xl scale-[1.06] opacity-70 [&_nav]:opacity-0">
          {preview}
        </div>
        {/* Dim + frost overlay with the coming-soon card centered on top. */}
        <div className="absolute inset-0 z-40 flex items-center justify-center px-6 bg-gradient-to-b from-background/50 via-background/65 to-background/90">
          <ComingSoonCard title={title} />
        </div>
        {/* A real, interactive nav on the very top so the page isn't a dead-end. */}
        <div className="absolute top-0 inset-x-0 z-50"><GameNav /></div>
      </div>
    )
  }
  const card = <ComingSoonCard title={title} />
  return bare ? <div className="max-w-md mx-auto px-6 py-12">{card}</div> : <Frame>{card}</Frame>
}

/** Gate a page behind a coin threshold; renders children once the balance clears it. */
export function CoinsGate({ required, title, children }: { required: number; title: string; children: React.ReactNode }) {
  const { jeffsBalance } = useApp()
  const coins = Math.floor(jeffsBalance)
  if (coins >= required) return <>{children}</>
  return (
    <Frame>
      <GateCard
        icon={Lock}
        heading={`${title} is locked`}
        sub={
          <>
            Reach <b className="text-foreground">{required.toLocaleString()} coins</b> to unlock this. You're at{" "}
            <span className="inline-flex items-center gap-0.5 font-bold text-foreground">
              <Coins className="h-3.5 w-3.5" />
              {coins.toLocaleString()}
            </span>{" "}
            — keep learning to get there!
          </>
        }
      />
    </Frame>
  )
}
