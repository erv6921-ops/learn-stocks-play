import React, { useState } from "react"
import { Coins, CheckCircle2, XCircle, Sparkles } from "lucide-react"
import { Scenario } from "@/data/scenarioData"

interface DailyScenarioProps {
  scenario: Scenario
  // Called once when the player locks in their result for the day.
  onComplete: (correct: boolean, coins: number) => void
  submitting?: boolean
}

const REWARD = 75

export default function DailyScenario({ scenario, onComplete, submitting }: DailyScenarioProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  const correct = answered && selected === scenario.correctIndex

  const optionClasses = (i: number) => {
    if (!answered) {
      return "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
    }
    if (i === scenario.correctIndex) {
      return "border-success bg-success/10 text-success-foreground"
    }
    if (i === selected) {
      return "border-destructive bg-destructive/10 text-destructive-foreground"
    }
    return "border-border bg-card opacity-60"
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header card */}
      <div
        className="rounded-2xl p-6 mb-5 relative overflow-hidden"
        style={{ backgroundColor: "#0f2d1e" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 40%, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Daily Scenario</h1>
            <p className="text-white/50 text-sm mt-1">What would you do?</p>
          </div>
          <div className="flex items-center gap-1.5 bg-gold/15 text-gold px-3 py-1.5 rounded-full text-sm font-bold border border-gold/20 whitespace-nowrap">
            <Coins className="w-4 h-4" />
            +{REWARD} coins
          </div>
        </div>
      </div>

      {/* Scenario text */}
      <div
        className="rounded-2xl p-5 mb-5 border border-border"
        style={{ backgroundColor: "#f0f5f3" }}
      >
        <p className="text-[#0f2d1e] text-base font-medium leading-relaxed">
          {scenario.prompt}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {scenario.options.map((opt, i) => (
          <button
            key={i}
            disabled={answered}
            onClick={() => !answered && setSelected(i)}
            className={`w-full text-left px-4 py-4 rounded-xl border-2 transition-all press-scale flex items-center gap-3 ${optionClasses(i)} ${answered ? "cursor-default" : "cursor-pointer"}`}
          >
            <span className="w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center text-sm font-bold shrink-0">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="text-sm font-medium flex-1">{opt}</span>
            {answered && i === scenario.correctIndex && (
              <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
            )}
            {answered && i === selected && i !== scenario.correctIndex && (
              <XCircle className="w-5 h-5 text-destructive shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Explanation + reward */}
      {answered && (
        <div className="mt-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="rounded-xl p-4 bg-muted/50 border border-border mb-4">
            <p className="text-sm leading-relaxed">
              <span className={`font-bold ${correct ? "text-success" : "text-destructive"}`}>
                {correct ? "Correct! " : "Not quite. "}
              </span>
              {scenario.explanation}
            </p>
          </div>

          {correct ? (
            <button
              disabled={submitting}
              onClick={() => onComplete(true, REWARD)}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base press-scale shadow-glow flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Sparkles className="w-5 h-5" />
              {submitting ? "Claiming…" : `Claim reward · +${REWARD} coins`}
            </button>
          ) : (
            <button
              disabled={submitting}
              onClick={() => onComplete(false, 0)}
              className="w-full py-4 rounded-xl bg-muted text-muted-foreground font-bold text-base press-scale disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Try again tomorrow"}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
