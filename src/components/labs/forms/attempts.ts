// IRS-form lab attempt persistence. Mirrors the existing lab-completion pattern
// (localStorage flags in labDocuments.ts) rather than inventing a parallel
// system: completion still flows through markLabDocDone, and this only adds a
// per-doc attempt/best-score record so a student can see their progress.
//
// A DB-backed equivalent is provided as an OUTPUT-ONLY migration
// (supabase/migrations/…_lab_form_attempts.sql) for when this should sync
// server-side; nothing here writes to Supabase.

export interface IRSAttemptRecord {
  attempts: number
  bestCorrect: number
  total: number
  lastAt: number
  done: boolean
}

const key = (docId: string) => `ip_irs_attempt_${docId}`

export function getIrsAttempt(docId: string): IRSAttemptRecord | null {
  try {
    const raw = localStorage.getItem(key(docId))
    return raw ? (JSON.parse(raw) as IRSAttemptRecord) : null
  } catch {
    return null
  }
}

export function recordIrsAttempt(
  docId: string,
  correct: number,
  total: number,
): IRSAttemptRecord {
  const prev = getIrsAttempt(docId)
  const rec: IRSAttemptRecord = {
    attempts: (prev?.attempts ?? 0) + 1,
    bestCorrect: Math.max(prev?.bestCorrect ?? 0, correct),
    total,
    lastAt: Date.now(),
    done: (prev?.done ?? false) || correct === total,
  }
  try {
    localStorage.setItem(key(docId), JSON.stringify(rec))
  } catch {
    /* ignore quota / private-mode errors */
  }
  return rec
}
