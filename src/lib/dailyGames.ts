// Shared helpers for the Daily Games feature.

export type DailyGameType = "scenario" | "higher_or_lower"

// Local-timezone calendar date key, e.g. "2026-06-12".
export function getLocalDateKey(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

// Day of the year (1-366) in the user's local timezone.
export function getDayOfYear(d: Date = new Date()): number {
  const start = new Date(d.getFullYear(), 0, 0)
  const diff = d.getTime() - start.getTime()
  return Math.floor(diff / 86400000)
}

// Even day-of-month → scenario, odd → higher or lower.
export function getGameTypeForDate(d: Date = new Date()): DailyGameType {
  return d.getDate() % 2 === 0 ? "scenario" : "higher_or_lower"
}

export function gameTypeLabel(t: DailyGameType): string {
  return t === "scenario" ? "Daily Scenario" : "Higher or Lower"
}

// Milliseconds until the next local midnight.
export function msUntilMidnight(now: Date = new Date()): number {
  const next = new Date(now)
  next.setHours(24, 0, 0, 0)
  return next.getTime() - now.getTime()
}

// Format a millisecond duration as HH:MM:SS.
export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = String(Math.floor(total / 3600)).padStart(2, "0")
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0")
  const s = String(total % 60).padStart(2, "0")
  return `${h}:${m}:${s}`
}
