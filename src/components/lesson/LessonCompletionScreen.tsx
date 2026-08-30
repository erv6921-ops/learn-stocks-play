import React, { useMemo, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Coins, ArrowRight, Target, TrendingUp, TrendingDown, Gauge, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AnimatedNumber from "@/components/AnimatedNumber"
import { JeffMascot } from "@/components/JeffMascot"
import Confetti from "@/components/Confetti"
import { useQuizSession } from "./QuizSessionContext"
import { DailyMissionScreen } from "./DailyMissionScreen"

// The satisfying end-of-lesson screen. Numbers roll up from zero (accuracy,
// coins gained, coins lost), Jeff celebrates above the card, and confetti fires
// once on mount. Replaces the old center-stage "party" Jeff that jumped into
// the middle of the screen. Must be rendered inside a QuizSessionProvider.
export function LessonCompletionScreen({
  correct,
  attempts,
  storedQuizScore,
  reflectionDone,
  reflectionBonus,
  onContinue,
  onRetake,
  onScore,
}: {
  correct: number
  attempts: number
  /** Fallback accuracy for pure replays where this session answered nothing. */
  storedQuizScore?: number
  reflectionDone: boolean
  reflectionBonus: number
  onContinue: () => void
  /** Restart the whole lesson from the top (Jeff's teaching + every question). */
  onRetake?: () => void
  /**
   * Persist the REAL whole-lesson accuracy shown here (every question this run,
   * including the ones missed), so a later replay shows the true score instead
   * of the mastery-only ~100%. Fires once, only when this session actually
   * answered questions - a pure replay (nothing answered) must not overwrite it.
   */
  onScore?: (pct: number) => void
}) {
  const { coinsGained, coinsLost, answeredTotal, answeredCorrect, getAttempts } = useQuizSession()
  // Show a subtle "it's adapting" signal only when this session actually fed the
  // adaptive engine at least one answer. No numbers - students never see theta.
  const adaptiveActive = getAttempts() > 0

  // Two-step flow: "stats" (accuracy + coins) then "missions" (daily missions).
  const [step, setStep] = useState<"stats" | "missions">("stats")

  // Whole-lesson accuracy: every question answered this session - micro-checks,
  // applied questions, and mastery-check questions, including failed mastery
  // retries. Falls back to the mastery-only counts, then the stored score, for
  // replays where this session answered nothing.
  const shownCorrect = answeredTotal > 0 ? answeredCorrect : correct
  const shownTotal = answeredTotal > 0 ? answeredTotal : attempts
  const pct = shownTotal > 0
    ? Math.round((shownCorrect / shownTotal) * 100)
    : Math.max(0, Math.min(100, storedQuizScore ?? 100))

  const bonus = reflectionDone ? reflectionBonus : 0
  const net = coinsGained + bonus - coinsLost
  const hasCoinActivity = coinsGained > 0 || coinsLost > 0 || bonus > 0

  // Performance tier drives the accent color, Jeff's mood, and the headline.
  const tier = useMemo(() => {
    if (pct >= 80) return { label: "Crushed it!", color: "#16a34a", ring: "hsl(142 71% 45%)", mood: "celebrating" as const }
    if (pct >= 50) return { label: "Nice work!", color: "#d97706", ring: "hsl(38 92% 50%)", mood: "excited" as const }
    return { label: "Mission complete", color: "#dc2626", ring: "hsl(0 72% 51%)", mood: "happy" as const }
  }, [pct])

  // Persist the true whole-lesson accuracy once, only for a real run (this
  // session answered at least one question). Replays answer nothing, so they
  // skip this and keep the stored score intact.
  useEffect(() => {
    if (shownTotal > 0) onScore?.(pct)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Circular progress geometry for the accuracy ring.
  const R = 66
  const CIRC = 2 * Math.PI * R
  const dash = (pct / 100) * CIRC

  // Step 2: the dedicated daily-missions screen.
  if (step === "missions") {
    return <DailyMissionScreen onContinue={onContinue} />
  }

  return (
    <div className="relative">
      {pct >= 50 && <Confetti pieces={pct >= 80 ? 120 : 80} />}

      {/* Jeff, above the card, celebrating. */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 16 }}
        className="flex justify-center relative z-10 -mb-3"
      >
        <JeffMascot size="xl" mood={tier.mood} />
      </motion.div>

      <Card variant="elevated" className="relative overflow-hidden">
        <CardContent className="p-8 text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold"
          >
            {tier.label} 🎉
          </motion.h2>

          {/* Accuracy ring - the number rolls up from zero. */}
          <div className="relative mx-auto w-[168px] h-[168px]">
            <svg width="168" height="168" viewBox="0 0 168 168" className="-rotate-90">
              <circle cx="84" cy="84" r={R} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
              <motion.circle
                cx="84" cy="84" r={R} fill="none" stroke={tier.ring} strokeWidth="10" strokeLinecap="round"
                strokeDasharray={CIRC}
                initial={{ strokeDashoffset: CIRC }}
                animate={{ strokeDashoffset: CIRC - dash }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold tabular-nums" style={{ color: tier.color }}>
                <AnimatedNumber value={pct} countUp format={(n) => `${n}%`} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <Target className="w-3 h-3" /> Accuracy
              </span>
            </div>
          </div>

          {shownTotal > 0 && (
            <p className="text-sm text-muted-foreground -mt-2">
              <span className="font-semibold text-foreground">{shownCorrect}</span> of{" "}
              <span className="font-semibold text-foreground">{shownTotal}</span> questions correct
            </p>
          )}

          {/* Gained vs. lost - both roll up. */}
          {hasCoinActivity && (
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
                className="rounded-2xl border border-success/20 bg-success/10 p-4"
              >
                <div className="flex items-center justify-center gap-1.5 text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-2xl font-extrabold tabular-nums">
                    +<AnimatedNumber value={coinsGained} countUp />
                  </span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mt-1">Coins gained</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
                className="rounded-2xl border border-destructive/20 bg-destructive/10 p-4"
              >
                <div className="flex items-center justify-center gap-1.5 text-destructive">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-2xl font-extrabold tabular-nums">
                    −<AnimatedNumber value={coinsLost} countUp />
                  </span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mt-1">Coins lost</p>
              </motion.div>
            </div>
          )}

          {bonus > 0 && (
            <p className="text-sm text-gold font-semibold">+{bonus} reflection bonus - plan locked in 📝</p>
          )}

          {/* Net result headline. */}
          {hasCoinActivity && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-gold/10 border border-gold/20 px-5 py-2"
            >
              <Coins className="w-5 h-5 text-gold" />
              <span className="text-lg font-bold text-gold tabular-nums">
                {net >= 0 ? "+" : "−"}<AnimatedNumber value={Math.abs(net)} countUp /> net
              </span>
            </motion.div>
          )}

          {adaptiveActive && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
              className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted-foreground"
            >
              <Gauge className="w-3.5 h-3.5 text-primary" /> Questions adapted to your level
            </motion.p>
          )}

          <Button size="lg" className="w-full" onClick={() => setStep("missions")}>
            See daily missions <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          {onRetake && (
            <Button variant="ghost" size="lg" className="w-full text-muted-foreground" onClick={onRetake}>
              <RotateCcw className="mr-2 w-4 h-4" /> Retake lesson
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
