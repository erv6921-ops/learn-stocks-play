import React, { useState, useEffect, useCallback } from "react"
import GameNav from "@/components/GameNav"
import DailyScenario from "@/components/games/DailyScenario"
import HigherOrLower from "@/components/games/HigherOrLower"
import { useApp } from "@/contexts/AppContext"
import { supabase } from "@/integrations/supabase/client"
import { getScenarioForDay } from "@/data/scenarioData"
import { getHoLSetForDay } from "@/data/higherOrLowerData"
import {
  getLocalDateKey,
  getDayOfYear,
  getGameTypeForDate,
  gameTypeLabel,
  msUntilMidnight,
  formatCountdown,
  DailyGameType,
} from "@/lib/dailyGames"
import { toast } from "sonner"
import { Coins, Lock, Calendar, Loader2, PartyPopper } from "lucide-react"
import { DEV_LOCAL_BYPASS } from "@/lib/devBypass"

interface Completion {
  game_type: DailyGameType
  score: number | null
  coins_earned: number | null
}

export default function Daily() {
  const { user, earnJeffs } = useApp()
  const today = new Date()
  const dateKey = getLocalDateKey(today)
  const dayOfYear = getDayOfYear(today)
  const gameType = getGameTypeForDate(today)
  const tomorrowType: DailyGameType =
    getGameTypeForDate(new Date(today.getTime() + 86400000))

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [completion, setCompletion] = useState<Completion | null>(null)
  const [justFinished, setJustFinished] = useState(false)
  const [countdown, setCountdown] = useState(() => msUntilMidnight())

  // Tick the midnight countdown once a second.
  useEffect(() => {
    const t = setInterval(() => setCountdown(msUntilMidnight()), 1000)
    return () => clearInterval(t)
  }, [])

  // Check whether today's game is already completed.
  useEffect(() => {
    let active = true
    async function check() {
      if (!user?.id) {
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from("daily_game_completions")
        .select("game_type, score, coins_earned")
        .eq("user_id", user.id)
        .eq("game_date", dateKey)
        .maybeSingle()
      if (!active) return
      if (error) console.error("[daily completion check]", error)
      if (data) setCompletion(data as Completion)
      setLoading(false)
    }
    check()
    return () => {
      active = false
    }
  }, [user?.id, dateKey])

  const handleComplete = useCallback(
    async (score: number, coins: number) => {
      if (!user?.id || submitting) return
      setSubmitting(true)
      // DEV bypass has no session, so the completion insert would fail RLS.
      // Skip the write and award coins locally so the game is still playable.
      const { error } = DEV_LOCAL_BYPASS
        ? { error: null }
        : await supabase.from("daily_game_completions").insert({
            user_id: user.id,
            game_date: dateKey,
            game_type: gameType,
            score,
            coins_earned: coins,
          })
      if (error) {
        // Unique violation → already completed today (e.g. another tab).
        console.error("[daily completion insert]", error)
        toast.error("Couldn't save - you may have already played today.")
        setCompletion({ game_type: gameType, score, coins_earned: coins })
        setSubmitting(false)
        return
      }
      if (coins > 0) {
        earnJeffs(coins, `Daily Game: ${gameTypeLabel(gameType)}`)
        toast.success(`+${coins} InvestiCoins!`, {
          description: "Nice work - come back tomorrow for more.",
        })
      }
      setCompletion({ game_type: gameType, score, coins_earned: coins })
      setJustFinished(true)
      setSubmitting(false)
    },
    [user?.id, submitting, dateKey, gameType, earnJeffs]
  )

  return (
    <div className="min-h-screen bg-background">
      <GameNav />
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-10">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : completion ? (
          <CompletedCard
            completion={completion}
            justFinished={justFinished}
            tomorrowType={tomorrowType}
            countdown={countdown}
          />
        ) : gameType === "scenario" ? (
          <DailyScenario
            scenario={getScenarioForDay(dayOfYear)}
            onComplete={(correct, coins) => handleComplete(correct ? 1 : 0, coins)}
            submitting={submitting}
          />
        ) : (
          <HigherOrLower
            set={getHoLSetForDay(dayOfYear)}
            onComplete={handleComplete}
            submitting={submitting}
          />
        )}
      </main>
    </div>
  )
}

function CompletedCard({
  completion,
  justFinished,
  tomorrowType,
  countdown,
}: {
  completion: Completion
  justFinished: boolean
  tomorrowType: DailyGameType
  countdown: number
}) {
  const coins = completion.coins_earned ?? 0
  const isScenario = completion.game_type === "scenario"

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="rounded-2xl p-8 text-center relative overflow-hidden mb-5"
        style={{ backgroundColor: "hsl(var(--primary))" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 40%, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gold/15 border border-gold/20 flex items-center justify-center mx-auto mb-4">
            {justFinished ? (
              <PartyPopper className="w-8 h-8 text-gold" />
            ) : (
              <Lock className="w-7 h-7 text-gold" />
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1">
            {justFinished ? "All done for today!" : "You've played today"}
          </h1>
          <p className="text-white/50 text-sm mb-5">
            {gameTypeLabel(completion.game_type)}
            {!isScenario && completion.score != null && ` · ${completion.score}/5 correct`}
          </p>
          <div className="inline-flex items-center gap-2 bg-gold/15 text-gold px-5 py-3 rounded-xl text-lg font-bold border border-gold/20">
            <Coins className="w-5 h-5" />
            {coins > 0 ? `+${coins} coins earned` : "No coins this time"}
          </div>
        </div>
      </div>

      {/* Come back tomorrow */}
      <div className="rounded-2xl p-5 border border-border bg-card text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground mb-1">
          <Calendar className="w-4 h-4 text-primary" />
          Come back tomorrow!
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Tomorrow's game: <span className="font-bold text-foreground">{gameTypeLabel(tomorrowType)}</span>
        </p>
        <div className="inline-flex items-center gap-2 bg-muted/60 px-4 py-2 rounded-xl font-mono text-sm font-bold">
          {formatCountdown(countdown)}
        </div>
      </div>
    </div>
  )
}
