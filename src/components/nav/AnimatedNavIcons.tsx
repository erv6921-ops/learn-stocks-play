// Animated nav icons. These are the EXACT lucide icons (same path data, so they
// look identical to before) - only rebuilt so the thematic parts can move on
// hover: Missions turns a page, Progress bars bounce like an equalizer, the
// Bank's columns settle, swords clash, etc. Every animation loops back to where
// it started (rest === the plain icon). The nav row sets whileHover="hover" and
// framer propagates that down to the motion parts here.

import { motion, type Variants } from "framer-motion"
import type { CSSProperties, ReactNode } from "react"

export type NavIconProps = { className?: string }

// transformBox: fill-box makes transformOrigin relative to each shape's own box.
const center: CSSProperties = { transformBox: "fill-box", transformOrigin: "center" }
const bottom: CSSProperties = { transformBox: "fill-box", transformOrigin: "bottom" }
const top: CSSProperties = { transformBox: "fill-box", transformOrigin: "top" }
const bottomC: CSSProperties = { transformBox: "fill-box", transformOrigin: "bottom center" }
const spine: CSSProperties = { transformBox: "fill-box", transformOrigin: "center" }

function Svg({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className={className} style={{ overflow: "visible" }}
    >
      {children}
    </svg>
  )
}

// ── Dashboard: the four panels pop in a quick stagger ──
export function DashboardIcon({ className }: NavIconProps) {
  const v = (d: number): Variants => ({
    rest: { scale: 1 },
    hover: { scale: [1, 0.7, 1], transition: { duration: 0.45, delay: d, ease: "easeOut" } },
  })
  return (
    <Svg className={className}>
      <motion.rect width="7" height="9" x="3" y="3" rx="1" style={center} variants={v(0)} />
      <motion.rect width="7" height="5" x="14" y="3" rx="1" style={center} variants={v(0.05)} />
      <motion.rect width="7" height="9" x="14" y="12" rx="1" style={center} variants={v(0.1)} />
      <motion.rect width="7" height="5" x="3" y="16" rx="1" style={center} variants={v(0.15)} />
    </Svg>
  )
}

// ── Missions: the book flips like turning a page (pivots at the spine) ──
export function MissionsIcon({ className }: NavIconProps) {
  return (
    <Svg className={className}>
      <path d="M12 7v14" />
      <motion.path
        d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
        style={spine}
        variants={{ rest: { rotateY: 0 }, hover: { rotateY: [0, -40, 0], transformPerspective: 520, transition: { duration: 0.7, ease: "easeInOut" } } }}
      />
    </Svg>
  )
}

// ── Lab: the liquid line sloshes ──
export function LabIcon({ className }: NavIconProps) {
  return (
    <Svg className={className}>
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
      <path d="M8.5 2h7" />
      <motion.path
        d="M7 16h10" style={center}
        variants={{ rest: { y: 0, rotate: 0 }, hover: { y: [0, -1.6, 1.2, 0], rotate: [0, -4, 4, 0], transition: { duration: 0.9, ease: "easeInOut" } } }}
      />
    </Svg>
  )
}

// ── Stocks: the trend line redraws itself ──
export function StocksIcon({ className }: NavIconProps) {
  return (
    <Svg className={className}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path
        d="m19 9-5 5-4-4-3 3"
        variants={{ rest: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], transition: { duration: 0.7, ease: "easeInOut" } } }}
      />
    </Svg>
  )
}

// ── Business: the shop awning flutters ──
export function BusinessIcon({ className }: NavIconProps) {
  return (
    <Svg className={className}>
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <motion.path
        d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"
        style={top}
        variants={{ rest: { scaleY: 1 }, hover: { scaleY: [1, 1.3, 0.9, 1], transition: { duration: 0.6, ease: "easeInOut" } } }}
      />
    </Svg>
  )
}

// ── Bank: the columns settle up and down ──
export function BankIcon({ className }: NavIconProps) {
  // Columns are y1=18 (bottom) → y2=11 (top). Animate the top (y2) so they bob
  // from the base, which is robust for thin <line> elements.
  const col = (d: number): Variants => ({
    rest: { y2: 11 },
    hover: { y2: [11, 14, 11], transition: { duration: 0.6, delay: d, ease: "easeInOut" } },
  })
  return (
    <Svg className={className}>
      <line x1="3" x2="21" y1="22" y2="22" />
      <polygon points="12 2 20 7 4 7" />
      <motion.line x1="6" x2="6" y1="18" y2="11" variants={col(0)} />
      <motion.line x1="10" x2="10" y1="18" y2="11" variants={col(0.08)} />
      <motion.line x1="14" x2="14" y1="18" y2="11" variants={col(0.16)} />
      <motion.line x1="18" x2="18" y1="18" y2="11" variants={col(0.24)} />
    </Svg>
  )
}

// ── Progress: the bars bounce like an equalizer ──
export function ProgressIcon({ className }: NavIconProps) {
  const bar = (d: number): Variants => ({
    rest: { scaleY: 1 },
    hover: { scaleY: [1, 1.5, 0.55, 1.2, 1], transition: { duration: 0.95, delay: d, ease: "easeInOut" } },
  })
  return (
    <Svg className={className}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path d="M8 17v-3" style={bottom} variants={bar(0)} />
      <motion.path d="M13 17V5" style={bottom} variants={bar(0.12)} />
      <motion.path d="M18 17V9" style={bottom} variants={bar(0.24)} />
    </Svg>
  )
}

// ── Leaderboard: the trophy wobbles above its base ──
export function LeaderboardIcon({ className }: NavIconProps) {
  return (
    <Svg className={className}>
      <path d="M4 22h16" />
      <motion.g
        style={bottomC}
        variants={{ rest: { rotate: 0 }, hover: { rotate: [0, -9, 9, -5, 0], transition: { duration: 0.7, ease: "easeInOut" } } }}
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </motion.g>
    </Svg>
  )
}

// ── Challenges: the two blades clash ──
export function ChallengesIcon({ className }: NavIconProps) {
  return (
    <Svg className={className}>
      <motion.g style={center} variants={{ rest: { rotate: 0 }, hover: { rotate: [0, -8, 8, 0], transition: { duration: 0.5, ease: "easeInOut" } } }}>
        <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
        <line x1="13" x2="19" y1="19" y2="13" />
        <line x1="16" x2="20" y1="16" y2="20" />
        <line x1="19" x2="21" y1="21" y2="19" />
      </motion.g>
      <motion.g style={center} variants={{ rest: { rotate: 0 }, hover: { rotate: [0, 8, -8, 0], transition: { duration: 0.5, ease: "easeInOut" } } }}>
        <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
        <line x1="5" x2="9" y1="14" y2="18" />
        <line x1="7" x2="4" y1="17" y2="20" />
        <line x1="3" x2="5" y1="19" y2="21" />
      </motion.g>
    </Svg>
  )
}

// ── Find Partners: the second person pops in ──
export function PartnersIcon({ className }: NavIconProps) {
  return (
    <Svg className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <motion.g
        style={center}
        variants={{ rest: { scale: 1 }, hover: { scale: [1, 1.2, 1], transition: { duration: 0.5, ease: "backOut" } } }}
      >
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </motion.g>
    </Svg>
  )
}

/** Map a nav destination to its animated icon component. */
export const NAV_ICON_COMPONENTS: Record<string, (p: NavIconProps) => JSX.Element> = {
  "/dashboard": DashboardIcon,
  "/lessons": MissionsIcon,
  "/lab": LabIcon,
  "/stocks": StocksIcon,
  "/micro-business": BusinessIcon,
  "/bank": BankIcon,
  "/progress": ProgressIcon,
  "/leaderboard": LeaderboardIcon,
  "/challenges": ChallengesIcon,
  "/partners": PartnersIcon,
}
