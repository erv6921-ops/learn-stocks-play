// Visual identity for InvestiBank - a "private bank" take on InvestiPlay's
// own palette. Same deep-green family as the rest of the app, but dressed as
// old money: engraved pinstripes, mint trim, plaques and certificates -
// still clearly different from Micro-Business's neon office look.

import React from "react"
import { cn } from "@/lib/utils"

// The app's themeable brand accent. Follows the chosen theme (blue/red/etc.)
// via CSS variables; alpha-suffixed call sites now use rgba(var(--brand-rgb)).
export const ACCENT = "var(--brand)"
export const ACCENT_SOFT = "var(--brand-bright)"

/** Deep brand-toned panel (follows the theme) with a faint engraved pinstripe. */
const NAVY: React.CSSProperties = {
  background: "var(--brand-deep)",
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
      style={{ borderColor: `rgba(var(--brand-rgb),0.22)`, background: "rgba(255,255,255,0.04)" }}
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
      <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, rgba(var(--brand-rgb),0.4))` }} />
      <span className="text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
        {children}
      </span>
      <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, rgba(var(--brand-rgb),0.4), transparent)` }} />
    </div>
  )
}
