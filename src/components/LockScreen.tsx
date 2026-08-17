// Access gates for features that aren't open to everyone yet.
//   <ComingSoon />  - a fully-locked "coming soon" screen (Micro Business,
//                     Executive Floor). Pass `bare` to drop the nav when it's
//                     rendered inside a page that already has its own chrome.
//   <CoinsGate />   - wraps a page and shows a "reach N coins to unlock" screen
//                     until the student's balance clears the threshold.

import React from "react"
import { Construction, Lock, Coins } from "lucide-react"
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

/** A fully-locked "coming soon" screen. `bare` skips the nav (for embedding). */
export function ComingSoon({ title, bare = false }: { title: string; bare?: boolean }) {
  const card = (
    <GateCard
      icon={Construction}
      heading={title}
      sub="Coming soon — we're putting the finishing touches on this. Check back shortly!"
    />
  )
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
