// Shared helpers for homework due dates. A due date is a DB `date`
// ("YYYY-MM-DD") with an optional `time` ("HH:MM[:SS]"). Dates are anchored to
// local midnight so they never shift a day in negative-offset timezones.

export function parseDue(date: string, time?: string | null): Date {
  const t = time ? time.slice(0, 5) : "00:00"
  return new Date(`${date}T${t}:00`)
}

// "Aug 25" - or "Aug 25, 3:00 PM" when a time is set.
export function fmtDue(date?: string | null, time?: string | null): string {
  if (!date) return ""
  const d = parseDue(date, time)
  const day = d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
  if (!time) return day
  return `${day}, ${d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`
}

// Whole days from today (local midnight) to the due day. Negative = in the past.
export function daysUntil(date: string): number {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const due = parseDue(date); due.setHours(0, 0, 0, 0)
  return Math.round((due.getTime() - today.getTime()) / 86400000)
}

// Past its deadline right now. Honors the time when one is set (a 3 PM due date
// isn't overdue at noon); date-only work is overdue once the day has passed.
export function isOverdue(date: string, time?: string | null): boolean {
  if (time) return parseDue(date, time).getTime() < Date.now()
  return daysUntil(date) < 0
}

// Student-facing label: "Due today", "Due tomorrow", "Overdue · was due …",
// weekday for the coming week, else the plain date. Includes the time if set.
export function dueLabel(date: string, time?: string | null, opts?: { completed?: boolean }): string {
  const dleft = daysUntil(date)
  if (!opts?.completed && isOverdue(date, time)) return `Overdue · was due ${fmtDue(date, time)}`
  if (dleft === 0) return time ? `Due today, ${fmtDue(date, time).split(", ")[1]}` : "Due today"
  if (dleft === 1) return `Due tomorrow${time ? `, ${fmtDue(date, time).split(", ")[1]}` : ""}`
  if (dleft > 1 && dleft <= 6) {
    const weekday = parseDue(date).toLocaleDateString(undefined, { weekday: "short" })
    return `Due ${weekday} · ${fmtDue(date, time)}`
  }
  return `Due ${fmtDue(date, time)}`
}
