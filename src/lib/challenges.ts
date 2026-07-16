import type { Lesson, LessonProgress } from "@/types"
import type { Database } from "@/integrations/supabase/types"

export type ClassChallenge = Database["public"]["Tables"]["class_challenges"]["Row"]
export type ChallengeEntry = Database["public"]["Tables"]["challenge_entries"]["Row"]

// An entry decorated with the entrant's display name for standings.
export interface RankedEntry {
  userId: string
  name: string
  score: number
  isMe: boolean
}

export type ChallengeMetric = "lessons_completed" | "xp_earned" | "streak_days" | "quiz_score_avg"

export interface ChallengeMetricMeta {
  value: ChallengeMetric
  label: string        // dropdown / heading label
  tracking: string     // "Most lessons completed" style phrasing
  unit: string         // shown after the score
}

export const CHALLENGE_METRICS: ChallengeMetricMeta[] = [
  { value: "lessons_completed", label: "Most lessons completed", tracking: "Most lessons completed", unit: "lessons" },
  { value: "xp_earned", label: "Most InvestiCoins earned", tracking: "Most InvestiCoins earned", unit: "coins" },
  { value: "streak_days", label: "Longest streak", tracking: "Longest streak", unit: "days" },
  { value: "quiz_score_avg", label: "Highest quiz average", tracking: "Highest quiz average", unit: "%" },
]

export function metricMeta(metric: string): ChallengeMetricMeta {
  return CHALLENGE_METRICS.find(m => m.value === metric) ?? CHALLENGE_METRICS[0]
}

interface ScoreInputs {
  lessonProgress: LessonProgress[]
  lessons: Lesson[]
  startsAt: Date
  endsAt: Date
  streak: number
}

// Current user's score for a challenge metric, computed from local data so no
// classmate rows are needed (RLS-friendly). Returns an integer.
export function computeMyScore(metric: ChallengeMetric, { lessonProgress, lessons, startsAt, endsAt, streak }: ScoreInputs): number {
  const rewardById = new Map(lessons.map(l => [l.id, l.reward]))
  const inWindow = (d?: Date) => {
    if (!d) return false
    const t = new Date(d).getTime()
    return t >= startsAt.getTime() && t <= endsAt.getTime()
  }
  const completedInWindow = lessonProgress.filter(p => p.completed && inWindow(p.completedAt))

  switch (metric) {
    case "lessons_completed":
      return completedInWindow.length
    case "xp_earned":
      return completedInWindow.reduce((sum, p) => sum + (rewardById.get(p.lessonId) ?? 0), 0)
    case "streak_days":
      return streak
    case "quiz_score_avg": {
      const scored = completedInWindow.filter(p => typeof p.quizScore === "number")
      if (scored.length === 0) return 0
      return Math.round(scored.reduce((s, p) => s + (p.quizScore ?? 0), 0) / scored.length)
    }
    default:
      return 0
  }
}

// Human-friendly countdown for a challenge end time.
export function timeRemaining(endsAt: string | Date): string {
  const end = new Date(endsAt).getTime()
  const diff = end - Date.now()
  if (diff <= 0) return "Ended"
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins} min left`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} left`
  const days = Math.ceil(hours / 24)
  if (days <= 7) {
    const weekday = new Date(end).toLocaleDateString(undefined, { weekday: "long" })
    return days === 1 ? "Ends tomorrow" : `${days} days left · Ends ${weekday}`
  }
  return `${days} days left`
}

export function isExpired(endsAt: string | Date): boolean {
  return new Date(endsAt).getTime() <= Date.now()
}
