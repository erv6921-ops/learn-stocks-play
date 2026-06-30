import React, { useEffect, useState } from "react"
import { CalendarClock } from "lucide-react"
import { KEY_DATES } from "@/data/bizLab"

function diffParts(target: Date) {
  const now = new Date()
  let ms = target.getTime() - now.getTime()
  const past = ms < 0
  ms = Math.abs(ms)
  const days = Math.floor(ms / 86_400_000)
  const hours = Math.floor((ms % 86_400_000) / 3_600_000)
  const minutes = Math.floor((ms % 3_600_000) / 60_000)
  return { days, hours, minutes, past }
}

/**
 * Shows live countdowns to Mrs. Fortgang's soft-pitch and final presentation
 * dates. Re-renders every minute so the numbers stay current.
 */
export default function Countdown() {
  const [, force] = useState(0)
  useEffect(() => {
    const t = setInterval(() => force(n => n + 1), 60_000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {KEY_DATES.map(d => {
        const target = new Date(d.date + "T08:00:00")
        const { days, hours, minutes, past } = diffParts(target)
        const isFinal = d.label.includes("Final")
        return (
          <div
            key={d.id}
            className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <CalendarClock className={`w-4 h-4 ${isFinal ? "text-pink-500" : "text-primary"}`} />
              <span className="text-sm font-bold leading-tight">{d.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {new Date(d.date + "T08:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" })} · {d.day}
              </span>
              {past ? (
                <span className="text-xs font-bold text-muted-foreground">Completed</span>
              ) : (
                <span className="text-sm font-extrabold tabular-nums text-foreground">
                  {days}d {hours}h {minutes}m
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
