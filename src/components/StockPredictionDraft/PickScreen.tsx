// Stock Prediction Draft — student pick screen.
//
// Day-one icebreaker: a fast grid of ~18 curated stocks, each showing its live
// price. Tap a card → confirm modal → the pick is snapshotted (pick_price =
// current price) into stock_predictions. Students may change their pick for 48h
// (updates the same row, unique per student+class); after that, or once the row
// is locked, the grid is replaced by a read-only view of their locked pick and
// its live % change. Built to stay smooth for a whole class picking at once.

import { useCallback, useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Lock, TrendingUp, TrendingDown, Loader2, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { supabase } from "@/integrations/supabase/client"
import { useApp } from "@/contexts/AppContext"
import { toast } from "sonner"
import { STOCK_PREDICTION_TICKERS, type CuratedTicker } from "@/content/stockPredictionDraft/curatedTickers"
import {
  fetchQuotes, isLocked, formatEditWindow, pctChange, hundredNow, type LiveQuote,
} from "@/lib/stockPredictionDraft"
import StockPickDetail from "./StockPickDetail"
import type { StockPrediction } from "@/types"

interface DbRow {
  id: string
  student_id: string
  class_id: string
  ticker: string
  company_name: string
  pick_price: number
  pick_date: string
  locked: boolean
  created_at?: string
}

function rowToPrediction(r: DbRow): StockPrediction {
  return {
    id: r.id,
    studentId: r.student_id,
    classId: r.class_id,
    ticker: r.ticker,
    companyName: r.company_name,
    pickPrice: Number(r.pick_price),
    pickDate: r.pick_date,
    locked: r.locked,
    createdAt: r.created_at,
  }
}

const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

interface PickScreenProps {
  classId: string
  /** Fired after a successful pick/change so a sibling leaderboard can refresh. */
  onPicked?: () => void
  /**
   * Forced-pick mode (the teacher-launched draft popup): always show the grid —
   * even if a prior pick has locked — and treat the pick as a fresh snapshot
   * (resets pick_date/price and unlocks). Used to re-run the draft for everyone.
   */
  forcePick?: boolean
}

export default function PickScreen({ classId, onPicked, forcePick = false }: PickScreenProps) {
  const { user, addToWatchlist } = useApp()
  const [loading, setLoading] = useState(true)
  const [quotes, setQuotes] = useState<Record<string, LiveQuote>>({})
  const [existing, setExisting] = useState<StockPrediction | null>(null)
  const [confirmTarget, setConfirmTarget] = useState<CuratedTicker | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const loadPick = useCallback(async () => {
    if (!user?.id) return
    const { data } = await supabase
      .from("stock_predictions")
      .select("*")
      .eq("student_id", user.id)
      .eq("class_id", classId)
      .maybeSingle()
    setExisting(data ? rowToPrediction(data as DbRow) : null)
  }, [user?.id, classId])

  // Prices refresh on a light interval — this is passive tracking, not a trading
  // screen, so 60s keeps the pick screen and the locked % view roughly live
  // without hammering Yahoo.
  const loadQuotes = useCallback(async () => {
    const q = await fetchQuotes(STOCK_PREDICTION_TICKERS.map(t => t.ticker))
    setQuotes(q)
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      await Promise.all([loadPick(), loadQuotes()])
      if (!cancelled) setLoading(false)
    })()
    const interval = setInterval(loadQuotes, 60000)
    return () => { cancelled = true; clearInterval(interval) }
  }, [loadPick, loadQuotes])

  // In forced (teacher-relaunch) mode we never show the read-only locked view —
  // the whole point is to make everyone pick again.
  const locked = existing && !forcePick
    ? isLocked({ locked: existing.locked, pickDate: existing.pickDate })
    : false

  // livePrice is the price the student is looking at in the detail view; fall
  // back to the grid quote so we always snapshot something sensible.
  const confirmPick = async (livePrice?: number) => {
    if (!confirmTarget || !user?.id) return
    const price = livePrice && livePrice > 0 ? livePrice : quotes[confirmTarget.ticker]?.price
    if (!price || price <= 0) {
      toast.error("Couldn't fetch a live price for that stock — try again in a moment.")
      return
    }
    setSubmitting(true)
    try {
      if (existing) {
        // Change the existing pick. Normally we keep the original pick_date so a
        // student can't perpetually reset their own 48h window — but a forced
        // relaunch IS a fresh pick, so reset the date/price and unlock.
        const update: Record<string, unknown> = {
          ticker: confirmTarget.ticker,
          company_name: confirmTarget.companyName,
          pick_price: price,
        }
        if (forcePick) {
          update.pick_date = new Date().toISOString()
          update.locked = false
        }
        const { error } = await supabase
          .from("stock_predictions")
          .update(update)
          .eq("id", existing.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("stock_predictions").insert({
          student_id: user.id,
          class_id: classId,
          ticker: confirmTarget.ticker,
          company_name: confirmTarget.companyName,
          pick_price: price,
        })
        if (error) throw error
      }
      // They're not buying — just choosing — so mirror the pick onto their
      // watchlist so the stock shows up under their other tracked names.
      addToWatchlist(confirmTarget.ticker)
      toast.success(`Locked in ${confirmTarget.companyName} (${confirmTarget.ticker})!`)
      setConfirmTarget(null)
      await loadPick()
      onPicked?.()
    } catch (err) {
      console.error("[PickScreen] pick failed:", err)
      const msg = err instanceof Error ? err.message : String(err)
      toast.error(`Couldn't save your pick: ${msg}`)
    } finally {
      setSubmitting(false)
    }
  }

  const grouped = useMemo(() => {
    const map = new Map<string, CuratedTicker[]>()
    for (const t of STOCK_PREDICTION_TICKERS) {
      if (!map.has(t.category)) map.set(t.category, [])
      map.get(t.category)!.push(t)
    }
    return [...map.entries()]
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading stocks…
      </div>
    )
  }

  // ── Locked / read-only view of the student's semester pick ────────────────
  if (existing && locked) {
    const live = quotes[existing.ticker]
    const change = live ? pctChange(live.price, existing.pickPrice) : 0
    const up = change >= 0
    return (
      <Card variant="elevated" className="max-w-md mx-auto">
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Lock className="w-4 h-4" /> Your semester pick is locked in
          </div>
          <div>
            <div className="text-3xl font-display font-bold">{existing.companyName}</div>
            <div className="text-muted-foreground">{existing.ticker}</div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-muted/40 p-3">
              <div className="text-muted-foreground">Pick price</div>
              <div className="font-semibold">{fmtUSD(existing.pickPrice)}</div>
            </div>
            <div className="rounded-lg bg-muted/40 p-3">
              <div className="text-muted-foreground">Now</div>
              <div className="font-semibold">{live ? fmtUSD(live.price) : "—"}</div>
            </div>
          </div>
          {live && (
            <div className={`flex items-center justify-center gap-2 text-xl font-bold ${up ? "text-success" : "text-destructive"}`}>
              {up ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              {up ? "+" : ""}{change.toFixed(2)}%
            </div>
          )}
          {live && (
            <p className="text-sm text-muted-foreground">
              $100 invested on pick day would now be worth{" "}
              <span className="font-semibold text-foreground">{fmtUSD(hundredNow(live.price, existing.pickPrice))}</span>.
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Picked {new Date(existing.pickDate).toLocaleDateString()} — tracked passively all semester.
          </p>
        </CardContent>
      </Card>
    )
  }

  // ── Pick / change view ────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {existing && !forcePick && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-center">
          Current pick: <span className="font-semibold">{existing.companyName} ({existing.ticker})</span>
          {" · "}
          <span className="text-muted-foreground">{formatEditWindow(existing.pickDate)}</span>
        </div>
      )}

      {grouped.map(([category, tickers]) => (
        <div key={category}>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">{category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tickers.map(t => {
              const q = quotes[t.ticker]
              const isCurrent = existing?.ticker === t.ticker
              return (
                <motion.button
                  key={t.ticker}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setConfirmTarget(t)}
                  className={`text-left rounded-xl border p-3 transition-colors ${
                    isCurrent ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{t.companyName}</div>
                      <div className="text-xs text-muted-foreground">{t.ticker}</div>
                    </div>
                    {isCurrent && <Check className="w-4 h-4 text-primary shrink-0" />}
                  </div>
                  <div className="mt-3 font-display font-bold">
                    {q ? fmtUSD(q.price) : <span className="text-muted-foreground text-sm">—</span>}
                  </div>
                  {q && (
                    <div className={`text-xs ${q.changePercent >= 0 ? "text-success" : "text-destructive"}`}>
                      {q.changePercent >= 0 ? "+" : ""}{q.changePercent.toFixed(2)}% today
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      ))}

      <Dialog open={!!confirmTarget} onOpenChange={(o) => { if (!o && !submitting) setConfirmTarget(null) }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review the stats, then lock in your pick</DialogTitle>
            <DialogDescription>
              Snapshotted at the current price. You can change it for 48 hours.
            </DialogDescription>
          </DialogHeader>
          {confirmTarget && (
            <StockPickDetail
              ticker={confirmTarget}
              submitting={submitting}
              onCancel={() => setConfirmTarget(null)}
              onConfirm={(livePrice) => confirmPick(livePrice)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
