import React, { useState, useEffect, useRef, useCallback } from "react"
import { Coins, ArrowRight, Trophy } from "lucide-react"
import { HoLSet } from "@/data/higherOrLowerData"

interface HigherOrLowerProps {
  set: HoLSet
  onComplete: (score: number, coins: number) => void
  submitting?: boolean
}

const ROUND_SECONDS = 10
const REWARD = 75

export default function HigherOrLower({ set, onComplete, submitting }: HigherOrLowerProps) {
  const rounds = set.rounds
  const [roundIdx, setRoundIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<"A" | "B" | null>(null)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [finished, setFinished] = useState(false)

  const round = rounds[roundIdx]
  const revealed = picked !== null
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goNext = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    if (roundIdx + 1 >= rounds.length) {
      setFinished(true)
    } else {
      setRoundIdx((i) => i + 1)
      setPicked(null)
      setTimeLeft(ROUND_SECONDS)
    }
  }, [roundIdx, rounds.length])

  const handlePick = useCallback(
    (choice: "A" | "B" | null) => {
      if (picked !== null) return
      setPicked(choice ?? "A") // null = timeout; mark revealed, no point
      if (choice && choice === round.winner) {
        setScore((s) => s + 1)
      }
      advanceTimer.current = setTimeout(goNext, 1500)
    },
    [picked, round, goNext]
  )

  // Countdown timer for the active round.
  useEffect(() => {
    if (revealed || finished) return
    if (timeLeft <= 0) {
      handlePick(null)
      return
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 0.1), 100)
    return () => clearTimeout(t)
  }, [timeLeft, revealed, finished, handlePick])

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
    }
  }, [])

  const cardClasses = (side: "A" | "B") => {
    if (!revealed) return "border-white/10"
    if (side === round.winner) return "border-success bg-success/10"
    if (side === picked) return "border-destructive bg-destructive/10"
    return "border-white/10 opacity-60"
  }

  const buttonClasses = (side: "A" | "B") => {
    if (!revealed) return "bg-primary text-primary-foreground shadow-glow hover:brightness-110"
    if (side === round.winner) return "bg-success text-white"
    if (side === picked) return "bg-destructive text-white"
    return "bg-muted text-muted-foreground opacity-60"
  }

  if (finished) {
    const coins = REWARD
    return (
      <div className="max-w-2xl mx-auto">
        <div
          className="rounded-2xl p-8 text-center relative overflow-hidden"
          style={{ backgroundColor: "hsl(var(--primary))" }}
        >
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gold/15 border border-gold/20 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-1">Round complete!</h2>
            <p className="text-white/50 text-sm mb-5">
              You got {score} of {rounds.length} right
            </p>
            <div className="inline-flex items-center gap-2 bg-gold/15 text-gold px-5 py-3 rounded-xl text-lg font-bold border border-gold/20 mb-6">
              <Coins className="w-5 h-5" />+{coins} coins
            </div>
            <button
              disabled={submitting}
              onClick={() => onComplete(score, coins)}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base press-scale shadow-glow disabled:opacity-60"
            >
              {submitting ? "Claiming…" : "Claim reward"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const timerPct = (timeLeft / ROUND_SECONDS) * 100

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header card */}
      <div
        className="rounded-2xl p-6 mb-5 relative overflow-hidden"
        style={{ backgroundColor: "hsl(var(--primary))" }}
      >
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Higher or Lower</h1>
            <p className="text-white/50 text-sm mt-1">Which number is bigger? 5 rounds</p>
          </div>
          <div className="flex items-center gap-1.5 bg-gold/15 text-gold px-3 py-1.5 rounded-full text-sm font-bold border border-gold/20 whitespace-nowrap">
            <Coins className="w-4 h-4" />
            +{REWARD} coins
          </div>
        </div>
      </div>

      {/* Round + score badges */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-muted-foreground">
          Round {roundIdx + 1} / {rounds.length}
        </span>
        <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/15">
          Score {score}
        </span>
      </div>

      {/* Timer bar */}
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden mb-5">
        <div
          className="h-full rounded-full"
          style={{
            width: `${timerPct}%`,
            backgroundColor: timerPct < 30 ? "hsl(var(--destructive))" : "hsl(var(--primary))",
            transition: "width 100ms linear",
          }}
        />
      </div>

      {/* Two cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {(["A", "B"] as const).map((side) => {
          const label = side === "A" ? round.aLabel : round.bLabel
          const value = side === "A" ? round.aValue : round.bValue
          return (
            <div
              key={side}
              className={`rounded-2xl p-5 border-2 text-center transition-all ${cardClasses(side)}`}
              style={{ backgroundColor: revealed ? undefined : "hsl(var(--primary))" }}
            >
              <p className={`text-sm font-semibold mb-3 ${revealed ? "" : "text-white/70"}`}>
                {label}
              </p>
              <p className={`text-2xl font-extrabold ${revealed ? "" : "text-white/30"}`}>
                {revealed ? value : "???"}
              </p>
            </div>
          )
        })}
      </div>

      {/* Pick buttons */}
      <div className="grid grid-cols-2 gap-3">
        {(["A", "B"] as const).map((side) => (
          <button
            key={side}
            disabled={revealed}
            onClick={() => handlePick(side)}
            className={`py-4 rounded-xl font-bold text-base press-scale transition-all ${buttonClasses(side)} ${revealed ? "cursor-default" : ""}`}
          >
            Pick {side}
          </button>
        ))}
      </div>

      {/* Next round */}
      {revealed && (
        <button
          onClick={goNext}
          className="mt-4 w-full py-3 rounded-xl bg-muted text-foreground font-semibold press-scale flex items-center justify-center gap-2 animate-in fade-in duration-200"
        >
          {roundIdx + 1 >= rounds.length ? "See results" : "Next round"}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
