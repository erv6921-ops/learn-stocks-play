// Shared player-stat helpers. These mirror the logic GameNav uses for the
// navbar HUD so the Missions page shows identical streak/level/coin values.

export interface HistoryEntry {
  amount: number
  reason: string
  date: Date | string
}

// Reasons that count as "real activity" for the daily streak.
const MEANINGFUL_REASONS = ["lesson", "quiz", "mission", "assessment", "bought", "sold", "unit test"]

const isMeaningful = (h: HistoryEntry) =>
  MEANINGFUL_REASONS.some((r) => h.reason.toLowerCase().includes(r))

const toMidnight = (d: Date | string) => {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x.getTime()
}

// Current consecutive-day streak ending today (matches GameNav).
export function getStreak(history: HistoryEntry[]): number {
  if (history.length === 0) return 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dates = new Set(history.filter(isMeaningful).map((h) => toMidnight(h.date)))

  let streak = 0
  const day = new Date(today)
  if (dates.has(day.getTime())) streak++
  else return 0
  for (let i = 1; i < 365; i++) {
    day.setDate(day.getDate() - 1)
    if (dates.has(day.getTime())) streak++
    else break
  }
  return streak
}

// Longest streak ever achieved (used for "Best streak" and streak badges).
export function getBestStreak(history: HistoryEntry[]): number {
  const days = [...new Set(history.filter(isMeaningful).map((h) => toMidnight(h.date)))].sort((a, b) => a - b)
  if (days.length === 0) return 0
  const DAY = 86400000
  let best = 1
  let cur = 1
  for (let i = 1; i < days.length; i++) {
    if (days[i] - days[i - 1] === DAY) {
      cur++
      best = Math.max(best, cur)
    } else {
      cur = 1
    }
  }
  return best
}

// Total InvestiCoins ever earned (sum of positive ledger entries).
export function getTotalEarned(history: HistoryEntry[]): number {
  return history.filter((h) => h.amount > 0).reduce((s, h) => s + h.amount, 0)
}

// InvestiCoins earned in the last 7 days.
export function getCoinsThisWeek(history: HistoryEntry[]): number {
  const cutoff = Date.now() - 7 * 86400000
  return history
    .filter((h) => h.amount > 0 && new Date(h.date).getTime() >= cutoff)
    .reduce((s, h) => s + h.amount, 0)
}

// Curriculum level (1–10), identical to GameNav's getCurriculumLevel.
export function getCurriculumLevel(
  completedLessons: number,
  totalLessons: number,
  unitScores: { done: number; total: number }[]
): number {
  const completionPct = totalLessons > 0 ? completedLessons / totalLessons : 0
  const unitsFullyComplete = unitScores.filter((u) => u.total > 0 && u.done >= u.total).length
  const totalUnits = unitScores.filter((u) => u.total > 0).length
  const unitMasteryPct = totalUnits > 0 ? unitsFullyComplete / totalUnits : 0
  const score = completionPct * 0.6 + unitMasteryPct * 0.4
  if (score >= 0.95) return 10
  if (score >= 0.85) return 9
  if (score >= 0.72) return 8
  if (score >= 0.6) return 7
  if (score >= 0.48) return 6
  if (score >= 0.36) return 5
  if (score >= 0.25) return 4
  if (score >= 0.15) return 3
  if (score >= 0.05) return 2
  return 1
}
