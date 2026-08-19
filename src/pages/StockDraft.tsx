// Stock Prediction Draft — student page. Resolves the student's class, then
// shows the pick screen (or their locked pick) and the class leaderboard below.
// Ungated (no CoinsGate): this is a day-one icebreaker students reach before
// they've earned any coins.

import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import GameNav from "@/components/GameNav"
import { supabase } from "@/integrations/supabase/client"
import { useApp } from "@/contexts/AppContext"
import PickScreen from "@/components/StockPredictionDraft/PickScreen"
import PredictionLeaderboard from "@/components/StockPredictionDraft/PredictionLeaderboard"

export default function StockDraft() {
  const { user } = useApp()
  const [classId, setClassId] = useState<string | null>(null)
  const [resolving, setResolving] = useState(true)
  // Bump to force the leaderboard to refetch after a pick/change.
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!user?.id) { setResolving(false); return }
      // One pick per class; v1 uses the student's first class (mirrors how the
      // Challenges page picks myClassIds[0]).
      const { data } = await supabase
        .from("class_members")
        .select("class_id")
        .eq("user_id", user.id)
        .limit(1)
      if (!cancelled) {
        setClassId(data?.[0]?.class_id ?? null)
        setResolving(false)
      }
    })()
    return () => { cancelled = true }
  }, [user?.id])

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        <header className="text-center space-y-1">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-1">
            <TrendingUp className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold">Stock Prediction Draft</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Pick one stock to root for all semester. No trading, no pressure — just see whose call ages best.
          </p>
        </header>

        {resolving ? (
          <div className="text-center py-20 text-muted-foreground">Loading…</div>
        ) : !classId ? (
          <div className="text-center py-16 rounded-2xl border border-border/60 bg-card">
            <p className="text-muted-foreground">
              Join a class to make your semester pick.
            </p>
          </div>
        ) : (
          <>
            <PickScreen classId={classId} onPicked={() => setRefreshKey(k => k + 1)} />
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold">Class Standings</h2>
              <PredictionLeaderboard key={refreshKey} classId={classId} highlightStudentId={user?.id} />
            </section>
          </>
        )}
      </main>
    </div>
  )
}
