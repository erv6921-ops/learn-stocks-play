// ───────────────────────────────────────────────────────────
// Notification center store
//
// Records every InvestiCoin movement — coins gained (lessons, missions,
// selling stock, investor funding) AND coins lost (buying stock, payroll,
// tax penalties). Driven from the jeffs ledger in AppContext, so the +/-
// amount and reason are always accurate, not guessed from pop-up text.
//
// Plain external store + useSyncExternalStore so the nav bell can subscribe
// without a provider. Persists to localStorage so the history survives reloads.
// ───────────────────────────────────────────────────────────

export type NotificationType = "gain" | "loss" | "grade"

export interface AppNotification {
  id: string
  title: string
  amount?: number // signed: positive = gained, negative = lost (money events only)
  type: NotificationType
  date: number // epoch ms
  read: boolean
  // Grade events only: the teacher's grade + written feedback.
  grade?: string
  body?: string
}

const STORAGE_KEY = "investiplay_notifications"
const MAX = 100

function load(): AppNotification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AppNotification[]) : []
  } catch {
    return []
  }
}

let notifications: AppNotification[] = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  } catch {
    /* ignore quota / private-mode errors */
  }
}

function emit() {
  persist()
  listeners.forEach((l) => l())
}

export function subscribe(cb: () => void): () => void {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

// Stable reference until the array is replaced — required by useSyncExternalStore.
export function getSnapshot(): AppNotification[] {
  return notifications
}

// Log a coin movement. `amount` is signed: positive = gained, negative = lost.
export function recordMoneyEvent(amount: number, reason: string) {
  if (!amount || !reason) return
  notifications = [
    {
      id: crypto.randomUUID(),
      title: reason,
      amount,
      type: amount >= 0 ? "gain" : "loss",
      date: Date.now(),
      read: false,
    },
    ...notifications,
  ].slice(0, MAX)
  emit()
}

// Log a teacher's grade + feedback on the student's business work. Pushed into
// the bell when the student closes the grade pop-up, so it stays re-readable.
export function recordGradeFeedback(grade: string | null, feedback: string | null) {
  if (!grade && !feedback) return
  notifications = [
    {
      id: crypto.randomUUID(),
      title: grade ? `Your business work was graded: ${grade}` : "Your teacher left feedback",
      type: "grade",
      grade: grade || undefined,
      body: feedback || undefined,
      date: Date.now(),
      read: false,
    },
    ...notifications,
  ].slice(0, MAX)
  emit()
}

export function markAllRead() {
  if (!notifications.some((n) => !n.read)) return
  notifications = notifications.map((n) => (n.read ? n : { ...n, read: true }))
  emit()
}

export function clearNotifications() {
  if (notifications.length === 0) return
  notifications = []
  emit()
}
