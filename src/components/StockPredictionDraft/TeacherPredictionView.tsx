// Stock Prediction Draft — teacher view. The same class leaderboard students
// see, plus a summary stat row (how many have picked, the most popular ticker,
// and the class-average % change). This is the surface Byrnes pulls up
// periodically during the semester to spark the "how's everyone's pick doing?"
// conversation.

import { useCallback, useEffect, useMemo, useState } from "react"
import { Users, Star, TrendingUp, Rocket, Radio, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { useApp } from "@/contexts/AppContext"
import { toast } from "sonner"
import PredictionLeaderboard from "./PredictionLeaderboard"
import { usePredictionRows } from "@/hooks/usePredictionRows"

interface Props {
  classId: string | null
}

export default function TeacherPredictionView({ classId }: Props) {
  const { user } = useApp()
  const { rows, loading, refresh } = usePredictionRows(classId)

  // Live-draft session state: whether students are currently being prompted.
  const [sessionActive, setSessionActive] = useState(false)
  const [sessionBusy, setSessionBusy] = useState(false)

  const loadSession = useCallback(async () => {
    if (!classId) { setSessionActive(false); return }
    const { data } = await (supabase as any)
      .from("stock_draft_sessions")
      .select("active")
      .eq("class_id", classId)
      .maybeSingle()
    setSessionActive(!!data?.active)
  }, [classId])

  useEffect(() => { void loadSession() }, [loadSession])

  const setSession = async (active: boolean) => {
    if (!classId || !user?.id) return
    setSessionBusy(true)
    try {
      const { error } = await (supabase as any)
        .from("stock_draft_sessions")
        .upsert(
          { class_id: classId, active, launched_by: user.id, launched_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { onConflict: "class_id" },
        )
      if (error) throw error
      setSessionActive(active)
      toast.success(active ? "Draft launched — students are being prompted to pick." : "Draft prompt ended.")
      if (active) void refresh()
    } catch (err) {
      console.error("[TeacherPredictionView] session toggle failed:", err)
      toast.error("Couldn't update the draft. Please try again.")
    } finally {
      setSessionBusy(false)
    }
  }

  const stats = useMemo(() => {
    const total = rows.length
    const withPrice = rows.filter(r => r.currentPrice != null)
    const avg = withPrice.length
      ? withPrice.reduce((s, r) => s + r.changePercent, 0) / withPrice.length
      : 0

    // Most popular ticker (ties broken by first seen).
    const counts = new Map<string, number>()
    for (const r of rows) counts.set(r.ticker, (counts.get(r.ticker) ?? 0) + 1)
    let popular: { ticker: string; count: number } | null = null
    for (const [ticker, count] of counts) {
      if (!popular || count > popular.count) popular = { ticker, count }
    }

    return { total, avg, popular }
  }, [rows])

  return (
    <div className="space-y-4">
      {/* Launch control: prompts every student in the class to pick right now. */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-muted/30 p-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 font-semibold">
            Draft prompt
            {sessionActive && (
              <Badge className="bg-success/15 text-success border-success/20">
                <Radio className="w-3 h-3 mr-1" /> Live
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {sessionActive
              ? "Students who haven't picked are seeing a pop-up now."
              : "Launch to pop a “make your pick” prompt on every student's screen."}
          </p>
        </div>
        {sessionActive ? (
          <Button variant="outline" onClick={() => setSession(false)} disabled={sessionBusy} className="shrink-0">
            {sessionBusy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            End prompt
          </Button>
        ) : (
          <Button onClick={() => setSession(true)} disabled={sessionBusy || !classId} className="shrink-0">
            {sessionBusy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Rocket className="w-4 h-4 mr-2" />}
            Launch draft to class
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card variant="elevated">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <Users className="w-4 h-4" /> Picked
            </div>
            <div className="font-display text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <Star className="w-4 h-4" /> Most popular
            </div>
            <div className="font-display text-2xl font-bold truncate">
              {stats.popular ? stats.popular.ticker : "—"}
            </div>
            {stats.popular && (
              <div className="text-xs text-muted-foreground">{stats.popular.count} pick{stats.popular.count === 1 ? "" : "s"}</div>
            )}
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <TrendingUp className="w-4 h-4" /> Class avg
            </div>
            <div className={`font-display text-2xl font-bold ${stats.avg >= 0 ? "text-success" : "text-destructive"}`}>
              {stats.avg >= 0 ? "+" : ""}{stats.avg.toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <PredictionLeaderboard classId={classId} rows={rows} loading={loading} />
    </div>
  )
}
