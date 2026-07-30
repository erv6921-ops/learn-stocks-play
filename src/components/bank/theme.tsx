// Visual identity for InvestiBank - a "private bank" take on InvestiPlay's
// own palette. Same deep-green family as the rest of the app, but dressed as
// old money: engraved pinstripes, mint trim, plaques and certificates -
// still clearly different from Micro-Business's neon office look.

import React from "react"
import { cn } from "@/lib/utils"

// InvestiPlay's accent green (--accent ≈ hsl(152 62% 46%)) and a soft mint
// tint. Kept as hex because call sites append alpha suffixes (`${ACCENT}44`).
export const ACCENT = "#2dbe7a"
export const ACCENT_SOFT = "#81dab0"

/** Deep forest-green panel (the app's primary hue) with a faint engraved pinstripe. */
const NAVY: React.CSSProperties = {
  background: "linear-gradient(150deg, hsl(170 72% 8%) 0%, hsl(169 58% 13%) 55%, hsl(167 46% 18%) 100%)",
}
const PINSTRIPE: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(135deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 10px)",
}

/** The bank's signature surface: deep green, pinstriped, mint hairline on top. */
export function BankPanel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl text-white", className)} style={NAVY}>
      <div className="absolute inset-0 pointer-events-none" style={PINSTRIPE} />
      <div
        className="absolute inset-x-0 top-0 h-[3px] pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent 5%, ${ACCENT} 50%, transparent 95%)` }}
      />
      {children}
    </div>
  )
}

/** Small plaque for a stat - engraved label, mint numerals. */
export function Plaque({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn("rounded-lg px-3 py-2 text-center border", className)}
      style={{ borderColor: `${ACCENT}38`, background: "rgba(255,255,255,0.04)" }}
    >
      <p className="text-[9px] uppercase font-bold tracking-[0.14em] text-white/45">{label}</p>
      <p className="text-sm sm:text-base font-extrabold tabular-nums" style={{ color: ACCENT_SOFT }}>
        {children}
      </p>
    </div>
  )
}

/** Engraved section label, the bank's answer to a card header. */
export function Engraving({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}66)` }} />
      <span className="text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
        {children}
      </span>
      <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${ACCENT}66, transparent)` }} />
    </div>
  )
}
