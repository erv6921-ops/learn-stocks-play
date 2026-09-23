// lessonRun - the single record of ONE attempt at a lesson.
//
// Everything that used to live in ~20 useState hooks, the QuizSession tallies
// and ad-hoc flags now lives here: which step the student is on, every question
// answered (with the coins it moved), each mastery attempt, whether Jeff's chat
// is done, and whether the lesson was already complete when the run began.
//
// The record is persisted to localStorage on every change (keyed by user AND
// lesson) so a reload, a closed tab or a crash resumes the same run with the
// same tallies. `recordAnswer` is idempotent per question key: an answer that is
// already in `answered` is never counted or paid twice, which is what makes
// remounts and resumes safe.

import { useCallback, useMemo, useRef, useState } from "react"
import { useApp } from "@/contexts/AppContext"

/** Where an answer came from. Only "walk" and "mastery" count toward accuracy. */
export type AnswerSource = "walk" | "mastery" | "quickcheck"

export interface AnswerRecord {
  correct: boolean
  /** Signed coin movement this answer caused: positive gained, negative lost. */
  coins: number
  timedOut: boolean
  source: AnswerSource
  at: number
}

export interface MasteryAttemptRecord {
  sessionId: string
  attemptNumber: number
  correct: number
  total: number
  passed: boolean
  at: number
}

export interface LessonRun {
  v: 1
  runId: string
  lessonId: string
  userId: string
  startedAt: number
  /** Index into the interactive walk (non-concept sections). */
  sectionIndex: number
  answered: Record<string, AnswerRecord>
  masteryAttempts: MasteryAttemptRecord[]
  /** Question ids served in mastery checks this run, so retries rotate to fresh ones. */
  askedQuestionIds: string[]
  /** The current mastery attempt chain (survives reloads, unlike component state). */
  masteryAttempt: { sessionId: string; attemptNumber: number }
  chatDone: boolean
  /** Was lesson_progress already completed when this run started (a retake)? */
  completedAtStart: boolean
  finishedAt: number | null
}

const storageKey = (userId: string, lessonId: string) => `ip_lesson_run:${userId}:${lessonId}`

const newId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`)

export const masteryKeyPrefix = (sessionId: string) => `m:${sessionId}:`

export function loadLessonRun(userId: string, lessonId: string): LessonRun | null {
  try {
    const raw = localStorage.getItem(storageKey(userId, lessonId))
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<LessonRun>
    if (!parsed || parsed.v !== 1 || !parsed.runId || parsed.lessonId !== lessonId) return null
    // A finished run is only meaningful in the page session that finished it
    // (its completion screen). Coming back later means the lesson is simply
    // complete; a resume must never land on a stale finish screen.
    if (parsed.finishedAt) return null
    const run: LessonRun = {
      v: 1,
      runId: parsed.runId,
      lessonId,
      userId,
      startedAt: parsed.startedAt ?? Date.now(),
      sectionIndex: parsed.sectionIndex ?? 0,
      answered: parsed.answered ?? {},
      masteryAttempts: parsed.masteryAttempts ?? [],
      askedQuestionIds: parsed.askedQuestionIds ?? [],
      masteryAttempt: parsed.masteryAttempt ?? { sessionId: newId(), attemptNumber: 1 },
      chatDone: !!parsed.chatDone,
      completedAtStart: !!parsed.completedAtStart,
      finishedAt: null,
    }
    // A reload mid-mastery restarts the mastery component with fresh questions.
    // Give that a fresh attempt session id (same attempt number) so the
    // mastery-score function never mixes two partial attempts into one session.
    const prefix = masteryKeyPrefix(run.masteryAttempt.sessionId)
    if (Object.keys(run.answered).some(k => k.startsWith(prefix))) {
      run.masteryAttempt = { sessionId: newId(), attemptNumber: run.masteryAttempt.attemptNumber }
    }
    return run
  } catch {
    return null
  }
}

function persist(run: LessonRun | null, userId: string, lessonId: string) {
  try {
    if (run) localStorage.setItem(storageKey(userId, lessonId), JSON.stringify(run))
    else localStorage.removeItem(storageKey(userId, lessonId))
  } catch { /* storage full / private mode: the in-memory run still works */ }
}

export function clearLessonRun(userId: string, lessonId: string) {
  persist(null, userId, lessonId)
}

// ─── Derived numbers ───

const scored = (run: LessonRun) => Object.values(run.answered).filter(a => a.source !== "quickcheck")

/** Whole-lesson accuracy, 0-100: every walk + mastery answer this run, failed attempts and timeouts included. */
export function wholeLessonAccuracyOf(run: LessonRun | null): number | null {
  if (!run) return null
  const all = scored(run)
  if (all.length === 0) return null
  return Math.round((all.filter(a => a.correct).length / all.length) * 100)
}

/** Mastery accuracy, 0-100: the last mastery attempt that passed, else the last attempt. */
export function masteryAccuracyOf(run: LessonRun | null): number | null {
  if (!run || run.masteryAttempts.length === 0) return null
  const passed = [...run.masteryAttempts].reverse().find(a => a.passed)
  const pick = passed ?? run.masteryAttempts[run.masteryAttempts.length - 1]
  if (pick.total === 0) return null
  return Math.round((pick.correct / pick.total) * 100)
}

export function coinTotalsOf(run: LessonRun | null): { gained: number; lost: number; net: number } {
  let gained = 0
  let lost = 0
  if (run) {
    for (const a of Object.values(run.answered)) {
      if (a.coins > 0) gained += a.coins
      else if (a.coins < 0) lost += -a.coins
    }
  }
  return { gained, lost, net: gained - lost }
}

export function answerCountsOf(run: LessonRun | null): { total: number; correct: number } {
  if (!run) return { total: 0, correct: 0 }
  const all = scored(run)
  return { total: all.length, correct: all.filter(a => a.correct).length }
}

// ─── Hook ───

export interface LessonRunHandle {
  /** The current run (unfinished, or finished during this page session), or null. */
  run: LessonRun | null
  /** Synchronous read of the latest run, safe inside event handlers. */
  getRun: () => LessonRun | null
  startNewRun: (opts: { completedAtStart: boolean; chatDone?: boolean }) => LessonRun
  clearRun: () => void
  /**
   * Record one answer. Returns true when it was new, false when `questionKey`
   * was already answered this run - in which case nothing changed and the
   * caller must not pay or count it again.
   */
  recordAnswer: (questionKey: string, result: Omit<AnswerRecord, "at">) => boolean
  advanceSection: (n: number) => void
  markChatDone: () => void
  noteAsked: (questionId: string) => void
  /**
   * Close the current mastery attempt (pass or fail) and open the next one.
   * `restart` bumps the attempt number (a genuine retry of the same chain);
   * otherwise the chain starts over at attempt 1 (the reinforcement round).
   */
  endMasteryAttempt: (opts: { passed: boolean; restart: boolean }) => { sessionId: string; attemptNumber: number }
  finish: () => void
  wholeLessonAccuracy: number | null
  masteryAccuracy: number | null
  coinsGained: number
  coinsLost: number
  answeredTotal: number
  answeredCorrect: number
}

/**
 * The lesson run for (current user, lessonId). Persisted per change unless
 * `persist` is false (teacher preview keeps everything in memory).
 */
export function useLessonRun(lessonId: string | undefined, opts: { persist?: boolean } = {}): LessonRunHandle {
  const { user } = useApp()
  const userId = user?.id ?? "anon"
  const persistOn = opts.persist !== false
  const key = `${userId}::${lessonId ?? ""}`

  const [state, setState] = useState<{ key: string; run: LessonRun | null }>(() => ({
    key,
    run: lessonId && persistOn ? loadLessonRun(userId, lessonId) : null,
  }))
  const runRef = useRef<LessonRun | null>(state.run)

  // Route/user change: reload the run for the new key during render (derived
  // state), so the first render for a new lesson already has its saved run.
  if (state.key !== key) {
    const next = lessonId && persistOn ? loadLessonRun(userId, lessonId) : null
    runRef.current = next
    setState({ key, run: next })
  }

  const commit = useCallback((next: LessonRun | null) => {
    runRef.current = next
    setState({ key, run: next })
    if (persistOn && lessonId) persist(next, userId, lessonId)
  }, [key, persistOn, lessonId, userId])

  const update = useCallback((fn: (run: LessonRun) => LessonRun) => {
    const cur = runRef.current
    if (!cur) return
    commit(fn(cur))
  }, [commit])

  const getRun = useCallback(() => runRef.current, [])

  const startNewRun = useCallback((o: { completedAtStart: boolean; chatDone?: boolean }): LessonRun => {
    const run: LessonRun = {
      v: 1,
      runId: newId(),
      lessonId: lessonId ?? "",
      userId,
      startedAt: Date.now(),
      sectionIndex: 0,
      answered: {},
      masteryAttempts: [],
      askedQuestionIds: [],
      masteryAttempt: { sessionId: newId(), attemptNumber: 1 },
      chatDone: !!o.chatDone,
      completedAtStart: o.completedAtStart,
      finishedAt: null,
    }
    commit(run)
    return run
  }, [commit, lessonId, userId])

  const clearRun = useCallback(() => commit(null), [commit])

  const recordAnswer = useCallback((questionKey: string, result: Omit<AnswerRecord, "at">): boolean => {
    const cur = runRef.current
    if (!cur) return false
    if (Object.prototype.hasOwnProperty.call(cur.answered, questionKey)) return false
    commit({ ...cur, answered: { ...cur.answered, [questionKey]: { ...result, at: Date.now() } } })
    return true
  }, [commit])

  const advanceSection = useCallback((n: number) => {
    update(r => (r.sectionIndex === n ? r : { ...r, sectionIndex: n }))
  }, [update])

  const markChatDone = useCallback(() => {
    update(r => (r.chatDone ? r : { ...r, chatDone: true }))
  }, [update])

  const noteAsked = useCallback((questionId: string) => {
    update(r => (r.askedQuestionIds.includes(questionId) ? r : { ...r, askedQuestionIds: [...r.askedQuestionIds, questionId] }))
  }, [update])

  const endMasteryAttempt = useCallback((o: { passed: boolean; restart: boolean }) => {
    const cur = runRef.current
    const next = { sessionId: newId(), attemptNumber: o.restart && cur ? cur.masteryAttempt.attemptNumber + 1 : 1 }
    if (!cur) return next
    const prefix = masteryKeyPrefix(cur.masteryAttempt.sessionId)
    const rows = Object.entries(cur.answered).filter(([k]) => k.startsWith(prefix)).map(([, a]) => a)
    const record: MasteryAttemptRecord = {
      sessionId: cur.masteryAttempt.sessionId,
      attemptNumber: cur.masteryAttempt.attemptNumber,
      correct: rows.filter(a => a.correct).length,
      total: rows.length,
      passed: o.passed,
      at: Date.now(),
    }
    commit({ ...cur, masteryAttempts: [...cur.masteryAttempts, record], masteryAttempt: next })
    return next
  }, [commit])

  const finish = useCallback(() => {
    update(r => (r.finishedAt ? r : { ...r, finishedAt: Date.now() }))
  }, [update])

  const run = state.key === key ? state.run : runRef.current
  const derived = useMemo(() => ({
    wholeLessonAccuracy: wholeLessonAccuracyOf(run),
    masteryAccuracy: masteryAccuracyOf(run),
    coins: coinTotalsOf(run),
    counts: answerCountsOf(run),
  }), [run])

  return {
    run,
    getRun,
    startNewRun,
    clearRun,
    recordAnswer,
    advanceSection,
    markChatDone,
    noteAsked,
    endMasteryAttempt,
    finish,
    wholeLessonAccuracy: derived.wholeLessonAccuracy,
    masteryAccuracy: derived.masteryAccuracy,
    coinsGained: derived.coins.gained,
    coinsLost: derived.coins.lost,
    answeredTotal: derived.counts.total,
    answeredCorrect: derived.counts.correct,
  }
}
