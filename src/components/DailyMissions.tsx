import React, { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

function getTodayKey() {
  return new Date().toISOString().split("T")[0]
}

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
      label: "Open 1 lesson",
      icon: BookOpen,
      xp: 50,
      coins: 10,
      check: () => lessonProgress.some(p => p.completed)
    },
    {
      id: "quiz",
      label: "Answer 1 quiz",
      icon: Target,
      xp: 75,
      coins: 15,
      check: () => lessonProgress.some(p => p.quizScore != null && p.quizScore > 0)
    },
    {
      id: "stock",
      label: "View 1 stock",
      icon: Eye,
      xp: 25,
      coins: 5,
      check: () => portfolio.length > 0 || lessonProgress.length > 0 // basic proxy
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
          description: `+${mission.xp} XP · +${mission.coins} InvestiCoins`
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
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-base font-bold flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          Daily Missions
        </h3>
        <Badge variant="outline" className="text-xs">
          {completedCount}/3 Complete
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {missions.map((mission) => {
          const isDone = completed[mission.id]
          return (
            <Card
              key={mission.id}
              variant="elevated"
              className={`p-4 hover-lift cursor-default transition-all ${
                isDone ? "border-success/20 bg-success/5" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isDone ? "bg-success/15" : "bg-primary/10"
                }`}>
                  {isDone
                    ? <CheckCircle2 className="w-4 h-4 text-success" />
                    : <mission.icon className="w-4 h-4 text-primary" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${isDone ? "line-through text-muted-foreground" : ""}`}>
                    {mission.label}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[11px] text-accent font-bold">+{mission.xp} XP</span>
                    <span className="text-[11px] text-warning font-bold flex items-center gap-0.5">
                      <Coins className="w-3 h-3" />+{mission.coins}
                    </span>
                    {isDone && (
                      <span className="text-[10px] text-success font-medium">✓ Earned</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
