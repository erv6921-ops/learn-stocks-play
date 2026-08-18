// Access gates for features that aren't open to everyone yet.
//   <ComingSoon />  - a fully-locked "coming soon" screen (Micro Business,
//                     Executive Floor). Pass `bare` to drop the nav when it's
//                     rendered inside a page that already has its own chrome.
//   <CoinsGate />   - wraps a page and shows a "reach N coins to unlock" screen
//                     until the student's balance clears the threshold.

import React from "react"
import { Link } from "react-router-dom"
import { Construction, Lock, Coins, ArrowRight, type LucideIcon } from "lucide-react"
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

// The frosted "coming soon" glass card. `icon` defaults to the construction
// icon but callers pass the feature's own nav icon (Store / Landmark).
function ComingSoonCard({ title, icon: Icon = Construction }: { title: string; icon?: LucideIcon }) {
  return (
    <div className="text-center flex flex-col items-center gap-4 rounded-[28px] border border-black/10 dark:border-white/10 bg-card/70 backdrop-blur-2xl p-8 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.5)] max-w-sm">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Icon className="h-8 w-8 text-primary" />
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
 * A fully-locked "coming soon" screen: nav on top, a frosted card centered on a
 * clean background, with a "Go to Missions" CTA.
 *  - `icon`: the feature's own icon to show in the card (Store / Landmark).
 *  - `bare`: skip the nav (for embedding inside a page that has its own chrome).
 */
export function ComingSoon({ title, bare = false, icon }: { title: string; bare?: boolean; icon?: LucideIcon }) {
  const card = <ComingSoonCard title={title} icon={icon} />
  if (bare) return <div className="flex items-center justify-center px-6 py-16">{card}</div>
  return (
    <div className="min-h-screen bg-background">
      <GameNav />
      <div className="flex items-center justify-center px-6 pb-24 min-h-[calc(100vh-4rem)]">{card}</div>
    </div>
  )
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
