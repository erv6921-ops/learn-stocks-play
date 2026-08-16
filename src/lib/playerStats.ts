// Shared player-stat helpers. These mirror the logic GameNav uses for the
// navbar HUD so the Missions page shows identical streak/level/coin values.

// Two-letter avatar initials, e.g. "Eduardo" + "Valle" -> "EV".
export function getInitials(firstName?: string, lastName?: string): string {
  const f = (firstName ?? "").trim()
  const l = (lastName ?? "").trim()
  if (f && l) return (f[0] + l[0]).toUpperCase()
  if (f) {
    const parts = f.split(/\s+/)
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return f.slice(0, 2).toUpperCase()
  }
  return "?"
}

// Friendly display name, falling back gracefully.
export function getDisplayName(firstName?: string, lastName?: string): string {
  return [firstName, lastName].filter(Boolean).join(" ").trim() || "Student"
}

export interface HistoryEntry {
  amount: number
  reason: string
  date: Date | string
}

// Reasons that count toward the daily streak. Only genuine LEARNING activity
// keeps a streak alive: doing a lesson (which logs "Quiz correct answer" per
// question), a mission, a unit test, or the benchmark. Stock trades
// ("bought"/"sold") are deliberately excluded - the streak measures showing up
// to learn each day, not trading, so buying a share can't stand in for a lesson.
const MEANINGFUL_REASONS = ["lesson", "quiz", "mission", "assessment", "unit test"]

// Positive ledger entries that are money MOVEMENT, not money EARNED - stock
// sale proceeds, vault withdrawals, loan disbursements, bond payouts and
// refunds all put coins back in your pocket without being new earnings.
// Counting them inflated "coins earned" (XP) way past real activity, e.g. a
// bank deposit + withdrawal round-trip doubled as fake XP.
// Must stay in sync with public.is_xp_reason() in the database.
const NON_EARNING_PREFIXES = [
  "sold ",                     // `Sold ${shares} shares of ${symbol}`
  "withdrew from investibank", // "Withdrew from InvestiBank vault"
  "borrowed:",                 // `Borrowed: ${product.name}`
  "bond matured",              // `Bond matured (+$X interest)`
  "challenge refund",          // `Challenge refund: ${title}`
]

// True when a ledger entry counts toward XP / "coins earned".
export function isEarnedEntry(h: HistoryEntry): boolean {
  if (h.amount <= 0) return false
  const r = h.reason.toLowerCase()
  return !NON_EARNING_PREFIXES.some((p) => r.startsWith(p))
}

const isMeaningful = (h: HistoryEntry) =>
  MEANINGFUL_REASONS.some((r) => h.reason.toLowerCase().includes(r))

const toMidnight = (d: Date | string) => {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x.getTime()
}

// ── Streak restore ──────────────────────────────────────────────────────────
// A paid restore "repairs" a single missed day so the chain stays unbroken. We
// store repairs INSIDE the coin ledger (the same synced source the streak is
// derived from) as a spend entry whose reason is
// `Streak restore (repaired YYYY-MM-DD)` - no separate table, consistent across
// devices. A repaired day BRIDGES a gap but does NOT count as a study day
// (Duolingo-style freeze), so restoring never inflates the number past
// "streak + today", and the repair keeps working on every later recompute.
const REPAIR_RE = /streak restore \(repaired (\d{4})-(\d{2})-(\d{2})\)/i

// Build the reason string a restore writes to the ledger (parsed by REPAIR_RE).
export function streakRepairReason(dateKey: string): string {
  return `Streak restore (repaired ${dateKey})`
}

// Local YYYY-MM-DD for a midnight timestamp.
function toDateKey(t: number): string {
  const d = new Date(t)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function getRepairedDays(history: HistoryEntry[]): Set<number> {
  const out = new Set<number>()
  for (const h of history) {
    const m = REPAIR_RE.exec(h.reason)
    if (!m) continue
    const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
    d.setHours(0, 0, 0, 0)
    out.add(d.getTime())
  }
  return out
}

// Consecutive study-day count ending on `endDay` (a local-midnight ts), walking
// backwards: active days increment; repaired (frozen) days bridge the gap
// without incrementing; any other gap ends the streak.
function streakEndingAt(active: Set<number>, repaired: Set<number>, endDay: number): number {
  let streak = 0
  const day = new Date(endDay)
  for (let i = 0; i < 366; i++) {
    const t = day.getTime()
    if (active.has(t)) streak++
    else if (repaired.has(t)) { /* bridge - preserves the chain, no increment */ }
    else break
    day.setDate(day.getDate() - 1)
  }
  return streak
}

// Current consecutive-day streak ending today (matches GameNav). Counts only
// genuine learning days; paid repairs bridge single missed days.
export function getStreak(history: HistoryEntry[]): number {
  if (history.length === 0) return 0
  const active = new Set(history.filter(isMeaningful).map((h) => toMidnight(h.date)))
  const repaired = getRepairedDays(history)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return streakEndingAt(active, repaired, today.getTime())
}

export interface StreakRestore {
  lostStreak: number // length of the streak that broke (drives the price)
  cost: number       // InvestiCoins to restore it
  repairDate: string // YYYY-MM-DD of the single missed day (yesterday)
}

// Coin cost to restore, scaled by how long the lost streak was.
export function restoreCost(lostStreak: number): number {
  if (lostStreak <= 2) return 150
  if (lostStreak <= 6) return 300
  if (lostStreak <= 13) return 600
  if (lostStreak <= 29) return 1200
  return 2500
}

// A restore is offered only when the student has returned TODAY, missed EXACTLY
// yesterday, and had a streak running through the day before (one missed day,
// not two+). Requiring today's activity means restoring instantly shows the
// streak back at "lostStreak + today" and can't be abused to idle a streak
// alive without ever doing a lesson. Returns null when no restore applies.
export function getStreakRestore(history: HistoryEntry[]): StreakRestore | null {
  if (history.length === 0) return null
  const active = new Set(history.filter(isMeaningful).map((h) => toMidnight(h.date)))
  const repaired = getRepairedDays(history)

  const today = new Date(); today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1)
  const dayBefore = new Date(today); dayBefore.setDate(dayBefore.getDate() - 2)
  const t = today.getTime(), y = yesterday.getTime(), b = dayBefore.getTime()

  if (!active.has(t)) return null                    // haven't returned/studied today
  if (active.has(y) || repaired.has(y)) return null  // yesterday wasn't actually missed
  if (!(active.has(b) || repaired.has(b))) return null // 2+ missed days - too far gone

  const lostStreak = streakEndingAt(active, repaired, b)
  if (lostStreak < 1) return null
  return { lostStreak, cost: restoreCost(lostStreak), repairDate: toDateKey(y) }
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

// Total InvestiCoins ever earned (positive ledger entries, minus money movement).
export function getTotalEarned(history: HistoryEntry[]): number {
  return history.filter(isEarnedEntry).reduce((s, h) => s + h.amount, 0)
}

// InvestiCoins earned in the last 7 days.
export function getCoinsThisWeek(history: HistoryEntry[]): number {
  const cutoff = Date.now() - 7 * 86400000
  return history
    .filter((h) => isEarnedEntry(h) && new Date(h.date).getTime() >= cutoff)
    .reduce((s, h) => s + h.amount, 0)
}

// Curriculum level (1-10), identical to GameNav's getCurriculumLevel.
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
