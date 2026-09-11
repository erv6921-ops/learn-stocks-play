// Human-review decisions for the generated benchmark bank.
//
// The generated items (src/data/benchmarkBankGenerated.ts) ship as "pending".
// A reviewer approves or rejects each one from /admin/curriculum-review; those
// decisions are stored here. Nothing in this file publishes an item into the
// live benchmark — approval is only a record that a human vetted the item. A
// DB-backed equivalent (question_approvals) is provided as an OUTPUT-ONLY
// migration; this localStorage layer keeps the queue clickable without running it.

export type ReviewDecision = "approved" | "rejected"

const KEY = "ip_benchmark_review_decisions"

function readAll(): Record<string, ReviewDecision> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Record<string, ReviewDecision>) : {}
  } catch {
    return {}
  }
}

function writeAll(map: Record<string, ReviewDecision>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(map))
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function getAllDecisions(): Record<string, ReviewDecision> {
  return readAll()
}

export function getDecision(id: string): ReviewDecision | null {
  return readAll()[id] ?? null
}

export function setDecision(id: string, decision: ReviewDecision): void {
  const map = readAll()
  map[id] = decision
  writeAll(map)
}

export function clearDecision(id: string): void {
  const map = readAll()
  delete map[id]
  writeAll(map)
}
