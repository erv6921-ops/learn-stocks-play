// Zustand store for Gulliver Biz Lab progress.
//
// This is the single source of truth for *unit progress* (completed parts,
// activities, reflections, flashcard views, streaks, badges, and a local cache
// of submissions). It persists to localStorage so a student's progress and
// streak survive reloads. Submissions are *also* synced to Supabase by the
// submission form — the cache here just gives instant, offline-friendly UI.
//
// InvestiCoin payouts run through AppContext's `earnJeffs`; this store only
// records which reward keys have already been paid (`awardedKeys`) so a coin is
// never granted twice for the same milestone.

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { BIZ_LAB_PARTS, BIZ_BADGES } from "@/data/bizLab"

export interface CachedSubmission {
  content: Record<string, string>
  link?: string
  savedAt: string
}

interface BizLabState {
  /** Part ids the student has marked complete. */
  completedParts: string[]
  /** Activity id -> done. */
  activities: Record<string, boolean>
  /** Reflection prompt id -> written answer. */
  journals: Record<string, string>
  /** Vocab terms the student has flipped through (for flashcard progress). */
  viewedTerms: string[]
  /** submission_type -> last saved content (local mirror of Supabase). */
  submissions: Record<string, CachedSubmission>
  /** Reward keys already paid out via earnJeffs. */
  awardedKeys: string[]

  // Streak tracking
  lastActiveDate: string | null // YYYY-MM-DD
  streak: number
  bestStreak: number

  // ── actions ──
  touchStreak: () => void
  toggleActivity: (id: string, done: boolean) => void
  saveJournal: (promptId: string, text: string) => void
  viewTerm: (term: string) => void
  cacheSubmission: (type: string, content: Record<string, string>, link?: string) => void
  completePart: (partId: string) => boolean // true if newly completed
  hasAwarded: (key: string) => boolean
  markAwarded: (key: string) => void
  reset: () => void
}

function todayKey(): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  // Local YYYY-MM-DD
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00")
  const db = new Date(b + "T00:00:00")
  return Math.round((db.getTime() - da.getTime()) / 86_400_000)
}

export const useBizLabStore = create<BizLabState>()(
  persist(
    (set, get) => ({
      completedParts: [],
      activities: {},
      journals: {},
      viewedTerms: [],
      submissions: {},
      awardedKeys: [],
      lastActiveDate: null,
      streak: 0,
      bestStreak: 0,

      touchStreak: () => {
        const today = todayKey()
        const { lastActiveDate, streak, bestStreak } = get()
        if (lastActiveDate === today) return // already counted today
        let nextStreak = 1
        if (lastActiveDate && daysBetween(lastActiveDate, today) === 1) {
          nextStreak = streak + 1
        }
        set({
          lastActiveDate: today,
          streak: nextStreak,
          bestStreak: Math.max(bestStreak, nextStreak),
        })
      },

      toggleActivity: (id, done) =>
        set(s => ({ activities: { ...s.activities, [id]: done } })),

      saveJournal: (promptId, text) =>
        set(s => ({ journals: { ...s.journals, [promptId]: text } })),

      viewTerm: term =>
        set(s => (s.viewedTerms.includes(term) ? s : { viewedTerms: [...s.viewedTerms, term] })),

      cacheSubmission: (type, content, link) =>
        set(s => ({
          submissions: {
            ...s.submissions,
            [type]: { content, link, savedAt: new Date().toISOString() },
          },
        })),

      completePart: partId => {
        if (get().completedParts.includes(partId)) return false
        set(s => ({ completedParts: [...s.completedParts, partId] }))
        return true
      },

      hasAwarded: key => get().awardedKeys.includes(key),
      markAwarded: key =>
        set(s => (s.awardedKeys.includes(key) ? s : { awardedKeys: [...s.awardedKeys, key] })),

      reset: () =>
        set({
          completedParts: [],
          activities: {},
          journals: {},
          viewedTerms: [],
          submissions: {},
          awardedKeys: [],
          lastActiveDate: null,
          streak: 0,
          bestStreak: 0,
        }),
    }),
    { name: "investiplay_biz_lab" },
  ),
)

// ── Derived selectors (plain functions, not hooks) ──────────────────────────

/** Overall unit completion 0–100 based on parts completed. */
export function computeUnitPercent(completedParts: string[]): number {
  return Math.round((completedParts.length / BIZ_LAB_PARTS.length) * 100)
}

/** Badge ids the student has earned given their completed parts. */
export function computeEarnedBadges(completedParts: string[]): string[] {
  const allDone = completedParts.length === BIZ_LAB_PARTS.length
  return BIZ_BADGES.filter(b => (b.unlockOn === "all" ? allDone : completedParts.includes(b.unlockOn))).map(
    b => b.id,
  )
}
