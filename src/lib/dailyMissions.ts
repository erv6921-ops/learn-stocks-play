import {
  BookOpen,
  GraduationCap,
  Target,
  Coins,
  Eye,
  Repeat,
  TrendingUp,
  Flame,
  Crosshair,
  Trophy,
  Rocket,
} from "lucide-react"
import type React from "react"
import type { LessonProgress } from "@/types"

// ─── Daily missions: single source of truth ──────────────────────────────────
// One catalog of 7 challenges. Each day a deterministic rotation surfaces 3 of
// them (same 3 for everyone that calendar day, a fresh set the next day). Every
// mission reports numeric progress (current / target) so the UI can draw a bar
// and celebrate the moment it fills — the Dashboard hero and the end-of-lesson
// screen both read from here, so they never drift.

// Local calendar day key, e.g. "2026-08-30". Drives the daily reset and the
// "did this happen today?" checks.
export function dayKey(d: Date = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}
export const happenedToday = (d?: Date | string | null) =>
  !!d && dayKey(new Date(d)) === dayKey()

export interface JeffsHistoryLike {
  amount: number
  reason: string
  date: Date | string
}

// Everything a mission might need to compute its progress. Callers assemble this
// once (see useDailyMissions) and hand it to every mission.
export interface MissionContext {
  lessonsCompletedToday: number
  bestQuizToday: number // highest quiz score (0-100) among today's lessons
  coinsEarnedToday: number // excludes coins granted by the missions themselves
  stocksViewedToday: number
  tradesToday: number
  portfolioPnL: number // total unrealized P/L in coins
  portfolioPnLPct: number // total unrealized P/L as % of cost basis
  hasHoldings: boolean
  /** Lessons completed EVER (not just today) - gates the day-one experience. */
  lessonsCompletedTotal: number
  /** Live InvestiCoin balance - decides whether a trade mission is even reachable. */
  coinBalance: number
}

// The smallest buy the Stocks page realistically allows: one whole share of a
// listed company (integer shares, priced in coins). A brand-new student holds
// only the 15-coin welcome gift, so "Buy a stock" would be unreachable for them.
// Below this balance the trade mission is swapped out for another easy one.
export const MIN_TRADE_COINS = 50

export type Difficulty = "easy" | "medium" | "hard"

// Badge label + colors per tier. Colors are hex so they read on both the dark
// hero banner and the light end-of-lesson card.
export const DIFFICULTY_META: Record<Difficulty, { label: string; color: string; bg: string }> = {
  easy: { label: "Easy", color: "#16a34a", bg: "rgba(34,197,94,0.14)" },
  medium: { label: "Medium", color: "#d97706", bg: "rgba(245,158,11,0.14)" },
  hard: { label: "Hard", color: "#dc2626", bg: "rgba(239,68,68,0.14)" },
}

export interface MissionDef {
  id: string
  /** Short punchy name shown as the mission title. */
  title: string
  /** One-line description of the goal. */
  blurb: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  difficulty: Difficulty
  /** InvestiCoins awarded when the mission is completed. */
  reward: number
  /** Progress target; completed when current >= target. */
  target: number
  /** Optional unit label for the "3 / 5 stocks" style counter. */
  unit?: string
  current: (ctx: MissionContext) => number
}

export const MISSIONS: MissionDef[] = [
  // ── EASY ──────────────────────────────────────────────────────────────────
  {
    id: "lesson1",
    title: "Warm-up",
    blurb: "Complete 1 lesson",
    icon: BookOpen,
    difficulty: "easy",
    reward: 100,
    target: 1,
    unit: "lesson",
    current: (c) => c.lessonsCompletedToday,
  },
  {
    id: "stocks3",
    title: "Market watch",
    blurb: "View 3 stocks",
    icon: Eye,
    difficulty: "easy",
    reward: 100,
    target: 3,
    unit: "stocks",
    current: (c) => c.stocksViewedToday,
  },
  {
    id: "trade",
    title: "Make a move",
    blurb: "Buy or sell a stock",
    icon: Repeat,
    difficulty: "easy",
    reward: 100,
    target: 1,
    unit: "trade",
    current: (c) => c.tradesToday,
  },
  // ── MEDIUM ────────────────────────────────────────────────────────────────
  {
    id: "lesson2",
    title: "Scholar",
    blurb: "Complete 2 lessons",
    icon: GraduationCap,
    difficulty: "medium",
    reward: 200,
    target: 2,
    unit: "lessons",
    current: (c) => c.lessonsCompletedToday,
  },
  {
    id: "quizAce",
    title: "Sharpshooter",
    blurb: "Score 80%+ on a lesson quiz",
    icon: Target,
    difficulty: "medium",
    reward: 175,
    target: 80,
    unit: "%",
    current: (c) => Math.min(c.bestQuizToday, 80),
  },
  {
    id: "coins",
    title: "Coin hustle",
    blurb: "Earn 300 coins today",
    icon: Coins,
    difficulty: "medium",
    reward: 150,
    target: 300,
    unit: "coins",
    current: (c) => c.coinsEarnedToday,
  },
  {
    id: "green",
    title: "In the green",
    blurb: "Get your portfolio net-positive",
    icon: TrendingUp,
    difficulty: "medium",
    reward: 175,
    target: 1,
    current: (c) => (c.hasHoldings && c.portfolioPnL > 0 ? 1 : 0),
  },
  // ── HARD ──────────────────────────────────────────────────────────────────
  {
    id: "lesson3",
    title: "Grind",
    blurb: "Complete 3 lessons",
    icon: Flame,
    difficulty: "hard",
    reward: 350,
    target: 3,
    unit: "lessons",
    current: (c) => c.lessonsCompletedToday,
  },
  {
    id: "quizPerfect",
    title: "Perfectionist",
    blurb: "Ace a lesson quiz (100%)",
    icon: Crosshair,
    difficulty: "hard",
    reward: 300,
    target: 100,
    unit: "%",
    current: (c) => c.bestQuizToday,
  },
  {
    id: "coinsBig",
    title: "Big earner",
    blurb: "Earn 750 coins today",
    icon: Trophy,
    difficulty: "hard",
    reward: 300,
    target: 750,
    unit: "coins",
    current: (c) => c.coinsEarnedToday,
  },
  {
    id: "highRoller",
    title: "High roller",
    blurb: "Get your portfolio up 5%+",
    icon: Rocket,
    difficulty: "hard",
    reward: 350,
    target: 1,
    current: (c) => (c.hasHoldings && c.portfolioPnLPct >= 5 ? 1 : 0),
  },
]

// Day-one mission: shown in the Easy slot until the student has finished a
// lesson, whatever the rotation would otherwise offer. Not part of MISSIONS so
// the regular rotation is unaffected once it no longer applies.
export const FIRST_LESSON_MISSION: MissionDef = {
  id: "firstLesson",
  title: "First steps",
  blurb: "Finish your first lesson",
  icon: BookOpen,
  difficulty: "easy",
  reward: 100,
  target: 1,
  unit: "lesson",
  current: (c) => Math.min(c.lessonsCompletedTotal, 1),
}

// The slice of MissionContext the picker needs. Optional so callers that only
// want the plain rotation (tests, previews) can omit it.
export type MissionPickContext = Pick<MissionContext, "lessonsCompletedTotal" | "coinBalance"> &
  Partial<Pick<MissionContext, "tradesToday">>

// Deterministic rotation: exactly one Easy, one Medium, and one Hard mission per
// calendar day. Each tier advances independently by the day index, so the trio
// cycles through every combination over time while always spanning all three
// difficulties.
//
// Two day-one adjustments when `ctx` is supplied:
//  - No lesson completed yet → the Easy slot is always "Finish your first lesson".
//  - "Buy or sell a stock" is only offered when the student can afford at least
//    a minimum trade (or has already traded today, so a completed mission never
//    vanishes mid-day). Otherwise the next Easy mission in rotation is used.
export function getTodaysMissions(key: string = dayKey(), ctx?: MissionPickContext): MissionDef[] {
  const day = Math.floor(new Date(key).getTime() / 86400000)
  const pick = (diff: Difficulty, offset = 0) => {
    const pool = MISSIONS.filter((m) => m.difficulty === diff)
    return pool[(((day + offset) % pool.length) + pool.length) % pool.length]
  }
  let easy = pick("easy")
  if (ctx) {
    if (ctx.lessonsCompletedTotal <= 0) {
      easy = FIRST_LESSON_MISSION
    } else if (easy.id === "trade" && ctx.coinBalance < MIN_TRADE_COINS && !(ctx.tradesToday && ctx.tradesToday > 0)) {
      const easyPool = MISSIONS.filter((m) => m.difficulty === "easy")
      for (let offset = 1; offset < easyPool.length; offset++) {
        const alt = pick("easy", offset)
        if (alt.id !== "trade") { easy = alt; break }
      }
    }
  }
  return [easy, pick("medium"), pick("hard")]
}

// ─── Persistence: today's completed set (survives reloads, resets at midnight) ─
const COMPLETED_KEY = "investiplay_daily_missions"

export function getCompletedState(): Record<string, boolean> {
  try {
    const parsed = JSON.parse(localStorage.getItem(COMPLETED_KEY) || "{}")
    if (parsed.date !== dayKey()) return {} // new day - wipe
    return parsed.completed || {}
  } catch {
    return {}
  }
}

export function saveCompletedState(completed: Record<string, boolean>) {
  localStorage.setItem(
    COMPLETED_KEY,
    JSON.stringify({ date: dayKey(), completed })
  )
}

// ─── Signal helpers (derive the MissionContext fields) ────────────────────────

const STOCKS_VIEWED_KEY = "investiplay_stocks_viewed"

// Record a distinct stock symbol viewed today (feeds the "Market watch" goal).
export function recordStockView(symbol: string) {
  try {
    const parsed = JSON.parse(localStorage.getItem(STOCKS_VIEWED_KEY) || "{}")
    const symbols: string[] =
      parsed.date === dayKey() && Array.isArray(parsed.symbols) ? parsed.symbols : []
    if (!symbols.includes(symbol)) symbols.push(symbol)
    localStorage.setItem(STOCKS_VIEWED_KEY, JSON.stringify({ date: dayKey(), symbols }))
  } catch {
    /* ignore */
  }
}

export function getStocksViewedToday(): number {
  try {
    const parsed = JSON.parse(localStorage.getItem(STOCKS_VIEWED_KEY) || "{}")
    return parsed.date === dayKey() && Array.isArray(parsed.symbols)
      ? parsed.symbols.length
      : 0
  } catch {
    return 0
  }
}

export function getLessonsCompletedToday(lessonProgress: LessonProgress[]): number {
  return lessonProgress.filter((p) => p.completed && happenedToday(p.completedAt)).length
}

export function getBestQuizToday(lessonProgress: LessonProgress[]): number {
  return lessonProgress
    .filter((p) => p.quizScore != null && happenedToday(p.completedAt))
    .reduce((max, p) => Math.max(max, p.quizScore ?? 0), 0)
}

// Coins earned today from real activity - excludes the daily-mission payouts so
// the "Coin hustle" goal can't complete itself.
export function getCoinsEarnedToday(history: JeffsHistoryLike[]): number {
  return history
    .filter(
      (h) =>
        h.amount > 0 &&
        happenedToday(h.date) &&
        !h.reason.startsWith("Daily Mission:")
    )
    .reduce((sum, h) => sum + h.amount, 0)
}

export function getTradesToday(history: JeffsHistoryLike[]): number {
  return history.filter(
    (h) =>
      happenedToday(h.date) &&
      (h.reason.startsWith("Bought ") || h.reason.startsWith("Sold "))
  ).length
}
