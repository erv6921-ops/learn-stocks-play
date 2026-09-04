// Local persistence for an in-progress benchmark assessment. When a student
// starts the benchmark but leaves before finishing (closes the tab, navigates
// away), their answers so far are saved here so they can resume instead of
// starting over - and so the Progress tab can offer "Finish Benchmark" rather
// than "Take Benchmark Now". Cleared once the benchmark is fully completed.
import { BenchmarkQuestion } from "@/data/assessmentQuestions"

const KEY = "investiplay_benchmark_progress"
export const BENCHMARK_TOTAL = 25

export interface BenchmarkProgress {
  // The (shuffled) question objects the student has already answered. Stored in
  // full so the answer indices stay aligned with each question's correctAnswer.
  answeredQuestions: BenchmarkQuestion[]
  answers: number[]
  correctHistory: boolean[]
  score: number
  savedAt: number
}

export function saveBenchmarkProgress(p: Omit<BenchmarkProgress, "savedAt">): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...p, savedAt: Date.now() }))
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function loadBenchmarkProgress(): BenchmarkProgress | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const p = JSON.parse(raw)
    if (Array.isArray(p?.answers) && p.answers.length > 0) return p as BenchmarkProgress
  } catch {
    /* ignore malformed data */
  }
  return null
}

export function clearBenchmarkProgress(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

// True when the student has answered at least one question but hasn't reached
// the full benchmark - i.e. they started but didn't finish.
export function hasUnfinishedBenchmark(): boolean {
  const p = loadBenchmarkProgress()
  return !!p && p.answers.length > 0 && p.answers.length < BENCHMARK_TOTAL
}
