import { useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { useApp } from "@/contexts/AppContext"
import { useNetWorth } from "@/hooks/useNetWorth"
import {
  MissionContext,
  MissionDef,
  getBestQuizToday,
  getCoinsEarnedToday,
  getCompletedState,
  getLessonsCompletedToday,
  getStocksViewedToday,
  getTodaysMissions,
  getTradesToday,
  saveCompletedState,
} from "@/lib/dailyMissions"

export interface MissionView extends MissionDef {
  current: MissionDef["current"] // kept for type parity; use `progress` below
  progress: number // clamped current value
  done: boolean
  ratio: number // 0..1 for the progress bar
}

interface UseDailyMissionsOptions {
  /**
   * When true, this hook instance becomes the awarder: as missions cross their
   * target it grants the coins (once) and toasts. Only ONE mounted instance per
   * route should award. The Dashboard's headless <DailyMissions> and the
   * end-of-lesson screen both set this - they are never mounted together, and
   * the award is idempotent (guarded by localStorage), so no double-paying.
   */
  award?: boolean
}

/**
 * Shared brain for the daily missions. Assembles the live signal context,
 * resolves today's rotating 3 missions with numeric progress, and (optionally)
 * awards coins the moment a mission fills.
 */
export function useDailyMissions({ award = false }: UseDailyMissionsOptions = {}) {
  const { lessonProgress, portfolio, jeffsHistory, earnJeffs } = useApp()
  const { totalUnrealizedPnL, totalCostBasis } = useNetWorth()
  const [completed, setCompleted] = useState<Record<string, boolean>>(getCompletedState)

  const ctx: MissionContext = useMemo(
    () => ({
      lessonsCompletedToday: getLessonsCompletedToday(lessonProgress),
      bestQuizToday: getBestQuizToday(lessonProgress),
      coinsEarnedToday: getCoinsEarnedToday(jeffsHistory),
      stocksViewedToday: getStocksViewedToday(),
      tradesToday: getTradesToday(jeffsHistory),
      portfolioPnL: totalUnrealizedPnL,
      portfolioPnLPct: totalCostBasis > 0 ? (totalUnrealizedPnL / totalCostBasis) * 100 : 0,
      hasHoldings: portfolio.length > 0,
    }),
    [lessonProgress, jeffsHistory, portfolio, totalUnrealizedPnL, totalCostBasis]
  )

  const defs = useMemo(() => getTodaysMissions(), [])

  const missions: MissionView[] = useMemo(
    () =>
      defs.map((m) => {
        const raw = m.current(ctx)
        const progress = Math.min(raw, m.target)
        const done = raw >= m.target
        return { ...m, progress, done, ratio: m.target > 0 ? progress / m.target : 0 }
      }),
    [defs, ctx]
  )

  // Award pass: idempotent against localStorage, so a StrictMode double-invoke or
  // a remount can never pay twice.
  const checkAndAward = useCallback(() => {
    if (!award) return
    const current = getCompletedState()
    const updated = { ...current }
    let changed = false
    for (const m of missions) {
      if (!current[m.id] && m.done) {
        updated[m.id] = true
        changed = true
        earnJeffs(m.reward, `Daily Mission: ${m.title}`)
        toast.success(`Mission complete: ${m.title}`, {
          description: `+${m.reward} InvestiCoins`,
        })
      }
    }
    if (changed) {
      saveCompletedState(updated)
      setCompleted(updated)
    }
  }, [award, missions, earnJeffs])

  useEffect(() => {
    checkAndAward()
  }, [checkAndAward])

  // Keep local "completed" in sync for display even when not the awarder.
  useEffect(() => {
    setCompleted(getCompletedState())
  }, [missions])

  const completedCount = missions.filter((m) => m.done).length

  return { missions, completedCount, total: missions.length, completed }
}
