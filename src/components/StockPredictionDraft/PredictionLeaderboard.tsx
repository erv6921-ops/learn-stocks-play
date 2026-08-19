// Stock Prediction Draft — the "callback" leaderboard. Used by both students and
// the teacher: it pulls every pick in the class (via the get_stock_predictions
// SECURITY DEFINER RPC, so peer names resolve past profiles' RLS), fetches live
// prices, computes each pick's % change since pick day, and ranks them. A
// "Biggest Mover This Week" callout highlights the largest absolute move.

import { useMemo } from "react"
import { Trophy, TrendingUp, TrendingDown, Loader2, Flame } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePredictionRows, biggestMover, type RankedPrediction } from "@/hooks/usePredictionRows"

const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

interface Props {
  classId: string | null
  /** Pre-fetched rows (from usePredictionRows). If omitted, fetches its own. */
  rows?: RankedPrediction[]
  loading?: boolean
  highlightStudentId?: string
}

export default function PredictionLeaderboard({ classId, rows: rowsProp, loading: loadingProp, highlightStudentId }: Props) {
  const own = usePredictionRows(rowsProp ? null : classId)
  const rows = rowsProp ?? own.rows
  const loading = rowsProp ? !!loadingProp : own.loading

  const mover = useMemo(() => biggestMover(rows), [rows])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading leaderboard…
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <Card variant="elevated">
        <CardContent className="p-8 text-center text-muted-foreground">
          No picks yet. Once students lock in their stocks, standings show up here.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {mover && mover.currentPrice != null && (
        <Card variant="gradient">
          <CardContent className="p-4 flex items-center gap-3">
            <Flame className="w-6 h-6 text-warning shrink-0" />
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Biggest Mover This Week</div>
              <div className="font-semibold truncate">
                {mover.name} — {mover.companyName} ({mover.ticker})
              </div>
            </div>
            <div className={`ml-auto text-lg font-bold ${mover.changePercent >= 0 ? "text-success" : "text-destructive"}`}>
              {mover.changePercent >= 0 ? "+" : ""}{mover.changePercent.toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {rows.map((r, i) => {
          const up = r.changePercent >= 0
          const isMe = highlightStudentId && r.studentId === highlightStudentId
          return (
            <Card key={r.id} variant={isMe ? "elevated" : "default"} className={isMe ? "border-primary" : ""}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="w-7 text-center font-display font-bold text-muted-foreground shrink-0">
                  {i === 0 ? <Trophy className="w-5 h-5 text-warning mx-auto" /> : i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">
                    {r.name} {isMe && <Badge variant="secondary" className="ml-1">You</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {r.companyName} ({r.ticker})
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`flex items-center justify-end gap-1 font-bold ${up ? "text-success" : "text-destructive"}`}>
                    {up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {up ? "+" : ""}{r.changePercent.toFixed(2)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    $100 → {fmtUSD(r.hundredNow)}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
