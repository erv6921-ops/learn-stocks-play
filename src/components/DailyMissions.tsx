import React, { useState, useEffect, useCallback } from "react"
import { BookOpen, Target, Eye, Coins, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { LessonProgress, StockHolding } from "@/types"

interface Mission {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  xp: number
  coins: number
  check: () => boolean
}

interface DailyMissionsProps {
  lessonProgress: LessonProgress[]
  portfolio: StockHolding[]
  earnJeffs: (amount: number, reason: string) => void
}

// Local calendar day, e.g. "2026-06-23". Used both for the daily reset and to
// decide whether an action actually happened *today*.
function dayKey(d: Date = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}
function getTodayKey() {
  return dayKey()
}

const happenedToday = (d?: Date | string | null) => !!d && dayKey(new Date(d)) === dayKey()

function getDailyState(): Record<string, boolean> {
  const stored = localStorage.getItem("investiplay_daily_missions")
  if (!stored) return {}
  try {
    const parsed = JSON.parse(stored)
    if (parsed.date !== getTodayKey()) return {} // reset daily
    return parsed.completed || {}
  } catch {
    return {}
  }
}

function saveDailyState(completed: Record<string, boolean>) {
  localStorage.setItem("investiplay_daily_missions", JSON.stringify({
    date: getTodayKey(),
    completed
  }))
}

export default function DailyMissions({ lessonProgress, portfolio, earnJeffs }: DailyMissionsProps) {
  const [completed, setCompleted] = useState<Record<string, boolean>>(getDailyState)

  // Check conditions on mount and when deps change
  const missions: Mission[] = [
    {
      id: "lesson",
      label: "Complete 1 lesson",
      icon: BookOpen,
      xp: 50,
      coins: 10,
      check: () => lessonProgress.some(p => p.completed && happenedToday(p.completedAt))
    },
    {
      id: "quiz",
      label: "Answer 1 quiz",
      icon: Target,
      xp: 75,
      coins: 15,
      check: () => lessonProgress.some(p => p.quizScore != null && p.quizScore > 0 && happenedToday(p.completedAt))
    },
    {
      id: "stock",
      label: "View 1 stock",
      icon: Eye,
      xp: 25,
      coins: 5,
      // Set when the student actually opens a stock's detail page today.
      check: () => localStorage.getItem("investiplay_stock_viewed") === getTodayKey()
    },
  ]

  const checkAndAward = useCallback(() => {
    const current = getDailyState()
    let updated = { ...current }
    let changed = false

    for (const mission of missions) {
      if (!current[mission.id] && mission.check()) {
        updated[mission.id] = true
        changed = true
        // Award immediately
        earnJeffs(mission.coins, `Daily Mission: ${mission.label}`)
        toast.success(`Mission Complete: ${mission.label}`, {
          description: `+${mission.coins} InvestiCoins`
        })
      }
    }

    if (changed) {
      saveDailyState(updated)
      setCompleted(updated)
    }
  }, [lessonProgress, portfolio, earnJeffs])

  useEffect(() => {
    checkAndAward()
  }, [checkAndAward])

  const completedCount = Object.values(completed).filter(Boolean).length

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-primary" />
          Daily missions
        </p>
        <span className="text-[11px] font-bold tabular-nums text-muted-foreground">
          {completedCount}/3 done
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {missions.map((mission) => {
          const isDone = completed[mission.id]
          return (
            <div
              key={mission.id}
              className={`flex items-center gap-2.5 rounded-2xl px-3 py-2.5 transition-colors ${
                isDone ? "bg-success/[0.07]" : "bg-black/[0.03]"
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isDone ? "bg-success/15" : "bg-primary/10"
              }`}>
                {isDone
                  ? <CheckCircle2 className="w-4 h-4 text-success" />
                  : <mission.icon className="w-4 h-4 text-primary" />
                }
              </div>
              <div className="min-w-0">
                <p className={`text-[13px] font-semibold leading-tight ${isDone ? "line-through text-muted-foreground" : ""}`}>
                  {mission.label}
                </p>
                <span className="text-[11px] text-warning font-bold flex items-center gap-0.5 mt-0.5">
                  <Coins className="w-3 h-3" />{isDone ? "Earned" : `+${mission.coins}`}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
