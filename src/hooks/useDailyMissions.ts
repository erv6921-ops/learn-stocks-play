import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { useApp } from "@/contexts/AppContext"
import { logEvent } from "@/lib/analyticsEvents"
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
        logEvent("mission_completed", { missionId: m.id, missionType: m.difficulty, coinsEarned: m.reward })
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

  // Analytics: log the day's still-open missions as "started" once per awarder
  // mount (missions are passive daily goals, so mount = the student was offered
  // them). Gated on `award` so only the single awarding instance logs, and on a
  // ref so a remount within the same page load doesn't refire.
  const startedLoggedRef = useRef(false)
  useEffect(() => {
    if (!award || startedLoggedRef.current || missions.length === 0) return
    startedLoggedRef.current = true
    const done = getCompletedState()
    for (const m of missions) {
      if (!done[m.id]) logEvent("mission_started", { missionId: m.id, missionType: m.difficulty })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [award, missions])

  // Keep local "completed" in sync for display even when not the awarder.
  useEffect(() => {
    setCompleted(getCompletedState())
  }, [missions])

  const completedCount = missions.filter((m) => m.done).length

  return { missions, completedCount, total: missions.length, completed }
}
