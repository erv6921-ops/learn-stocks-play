import { useState } from "react"
import { JeffCharacter, type JeffMood } from "@/components/Jeff/JeffCharacter"

/**
 * DEV-ONLY preview for the rebuilt Jeff mascot (see App.tsx — only registered
 * when import.meta.env.DEV). Shows Jeff large with buttons to trigger each mood,
 * a size slider, and a light/dark toggle. Not wired into the app.
 *
 * Reactions auto-return to idle; the preview drives that by resetting the mood
 * to "idle" on completion so the same button can be clicked again to replay.
 */

const REACTIONS: { mood: Exclude<JeffMood, "idle">; label: string; hint: string }[] = [
  { mood: "welcome", label: "👋 Welcome", hint: "excited bounce + wave" },
  { mood: "correct", label: "✅ Correct", hint: "hop + fist pump" },
  { mood: "wrong", label: "💪 Wrong", hint: "wince → encouraging thumbs up" },
  { mood: "levelUp", label: "🎉 Level Up", hint: "jump, spin, sparkles" },
]

export default function JeffPreview() {
  const [mood, setMood] = useState<JeffMood>("idle")
  const [size, setSize] = useState(280)
  const [dark, setDark] = useState(false)

  const trigger = (m: JeffMood) => {
    // Reset to idle first so re-clicking the same mood re-fires the reaction.
    setMood("idle")
    requestAnimationFrame(() => setMood(m))
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 py-10">
          <header className="flex w-full items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Jeff — animated mascot preview</h1>
              <p className="text-sm text-muted-foreground">Dev-only. Current mood: <span className="font-mono">{mood}</span></p>
            </div>
            <button
              onClick={() => setDark((d) => !d)}
              className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </header>

          {/* Stage */}
          <div className="flex min-h-[380px] w-full items-center justify-center rounded-3xl border border-border bg-card shadow-sm">
            <JeffCharacter mood={mood} size={size} onAnimationComplete={() => setMood("idle")} />
          </div>

          {/* Mood buttons */}
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {REACTIONS.map((r) => (
              <button
                key={r.mood}
                onClick={() => trigger(r.mood)}
                className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md active:translate-y-0"
              >
                <span>{r.label}</span>
                <span className="text-[11px] font-normal text-muted-foreground">{r.hint}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setMood("idle")}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Reset to idle
          </button>

          {/* Size slider */}
          <div className="flex w-full max-w-md items-center gap-4">
            <label htmlFor="size" className="text-sm font-medium">
              Size
            </label>
            <input
              id="size"
              type="range"
              min={80}
              max={440}
              step={4}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="flex-1 accent-primary"
            />
            <span className="w-14 text-right font-mono text-sm text-muted-foreground">{size}px</span>
          </div>

          <p className="max-w-md text-center text-xs text-muted-foreground">
            Idle loops forever (breathing, blinks, glances). Reactions play once and
            settle back to idle. Respects <span className="font-mono">prefers-reduced-motion</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
