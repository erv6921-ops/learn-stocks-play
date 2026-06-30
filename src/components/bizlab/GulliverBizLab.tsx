import React, { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Flame, Coins, Trophy, CheckCircle2, Rocket } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useApp } from "@/contexts/AppContext"
import {
  BIZ_LAB_PARTS,
  TOTAL_BIZ_LAB_XP,
} from "@/data/bizLab"
import {
  useBizLabStore,
  computeUnitPercent,
  computeEarnedBadges,
} from "@/stores/bizLabStore"
import { bizIcon } from "./icons"
import Countdown from "./Countdown"
import BadgeShelf from "./BadgeShelf"
import PartView from "./PartView"

const CAPSTONE_XP = 500

/**
 * The Gulliver Biz Lab experience — Mrs. Fortgang's 6-part Shark Tank project.
 * Rendered inside the Lessons page when the student's active course track is
 * "gulliver-biz-lab". Brings together the program hero, countdowns to the
 * pitch dates, progress + streak HUD, milestone badges, and the part navigator.
 */
export default function GulliverBizLab() {
  const { toast } = useToast()
  const { earnJeffs } = useApp()
  const completedParts = useBizLabStore(s => s.completedParts)
  const streak = useBizLabStore(s => s.streak)
  const touchStreak = useBizLabStore(s => s.touchStreak)
  const hasAwarded = useBizLabStore(s => s.hasAwarded)
  const markAwarded = useBizLabStore(s => s.markAwarded)
  const awardedKeys = useBizLabStore(s => s.awardedKeys)

  const [activePartId, setActivePartId] = useState<string>(() => {
    // Open the first incomplete part by default.
    const firstIncomplete = BIZ_LAB_PARTS.find(p => !useBizLabStore.getState().completedParts.includes(p.id))
    return firstIncomplete?.id ?? BIZ_LAB_PARTS[0].id
  })

  // Count a daily visit toward the engagement streak.
  useEffect(() => {
    touchStreak()
  }, [touchStreak])

  const percent = computeUnitPercent(completedParts)
  const earnedBadges = useMemo(() => computeEarnedBadges(completedParts), [completedParts])

  // Coins earned within the unit so far (sum of paid reward keys' face value is
  // hard to recompute, so we show the unit's coin potential vs. parts done).
  const allComplete = completedParts.length === BIZ_LAB_PARTS.length

  // Capstone reward when the whole unit is finished.
  useEffect(() => {
    if (allComplete && !hasAwarded("capstone")) {
      earnJeffs(CAPSTONE_XP, "Gulliver Biz Lab — Shark Tank Champion!")
      markAwarded("capstone")
      toast({
        title: "🦈 Shark Tank Champion!",
        description: `You finished the entire Biz Lab unit. +${CAPSTONE_XP} bonus InvestiCoins!`,
      })
    }
  }, [allComplete, hasAwarded, markAwarded, earnJeffs, toast])

  const activePart = BIZ_LAB_PARTS.find(p => p.id === activePartId) ?? BIZ_LAB_PARTS[0]

  return (
    <div className="space-y-5">
      {/* Program hero */}
      <div
        className="relative overflow-hidden rounded-[20px] p-5 md:p-6 text-white"
        style={{ background: "linear-gradient(135deg, #0f2d1e 0%, #143d29 55%, #1d6b4d 135%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 25% 15%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/55 flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5 text-gold" /> Gulliver Biz Lab
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mt-1">
            The Shark Tank Project
          </h1>
          <p className="text-white/70 text-sm mt-1 max-w-xl">
            Build a real business — idea, plan, prototype, brand, commercial, and website — then pitch it to the Sharks. Let's get to work, future founder!
          </p>

          {/* HUD strip */}
          <div className="mt-4 grid grid-cols-3 rounded-2xl bg-white/[0.06] border border-white/10 divide-x divide-white/10">
            {[
              { Icon: Flame, tint: "text-orange-400", value: `${streak}d`, label: "Streak" },
              { Icon: CheckCircle2, tint: "text-emerald-300", value: `${completedParts.length}/6`, label: "Parts done" },
              { Icon: Coins, tint: "text-gold", value: TOTAL_BIZ_LAB_XP.toLocaleString(), label: "Coins to earn" },
            ].map(({ Icon, tint, value, label }) => (
              <div key={label} className="px-3 py-3 sm:px-4 flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${tint}`} />
                <div className="min-w-0">
                  <p className="text-base md:text-lg font-extrabold leading-none tabular-nums">{value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45 mt-1 truncate">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5 text-xs text-white/70">
              <span>Unit progress</span>
              <span className="font-bold">{percent}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Countdowns */}
      <div>
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-gold" /> Key Dates
        </h3>
        <Countdown />
      </div>

      {/* Badges */}
      <div>
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-gold" /> Milestone Badges
        </h3>
        <BadgeShelf earned={earnedBadges} />
      </div>

      {/* Part navigator */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {BIZ_LAB_PARTS.map(p => {
          const Icon = bizIcon(p.icon)
          const done = completedParts.includes(p.id)
          const active = p.id === activePartId
          return (
            <button
              key={p.id}
              onClick={() => setActivePartId(p.id)}
              className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all border ${
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border/50 hover:text-foreground hover:border-border"
              }`}
            >
              {done ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Icon className="w-4 h-4" />}
              Part {p.number}
            </button>
          )
        })}
      </div>

      {/* Active part */}
      <PartView part={activePart} />
    </div>
  )
}
