// Data hook for the Stock Prediction Draft leaderboard. Pulls every pick in a
// class (via the get_stock_predictions SECURITY DEFINER RPC, so peer names
// resolve past profiles' RLS), fetches live prices, computes each pick's %
// change since pick day, and returns them ranked. Shared by the student
// leaderboard and the teacher view so the class is queried once per mount.

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { fetchQuotes, pctChange, hundredNow } from "@/lib/stockPredictionDraft"

interface PredictionRpcRow {
  id: string
  student_id: string
  first_name: string | null
  last_name: string | null
  ticker: string
  company_name: string
  pick_price: number
  pick_date: string
  locked: boolean
}

export interface RankedPrediction {
  id: string
  studentId: string
  name: string
  ticker: string
  companyName: string
  pickPrice: number
  currentPrice: number | null
  changePercent: number
  hundredNow: number
}

const displayName = (r: PredictionRpcRow) =>
  `${r.first_name || ""} ${(r.last_name || "").charAt(0)}${r.last_name ? "." : ""}`.trim() || "Student"

export function usePredictionRows(classId: string | null) {
  const [rows, setRows] = useState<RankedPrediction[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!classId) { setRows([]); setLoading(false); return }
    setLoading(true)
    const { data, error } = await supabase.rpc("get_stock_predictions", { _class_id: classId })
    if (error) {
      console.error("[usePredictionRows] RPC error:", error)
      setRows([]); setLoading(false); return
    }
    const preds = (data ?? []) as PredictionRpcRow[]
    const quotes = await fetchQuotes(preds.map(p => p.ticker))

    const ranked: RankedPrediction[] = preds.map(p => {
      const q = quotes[p.ticker.toUpperCase()] ?? quotes[p.ticker]
      const current = q?.price ?? null
      const change = current != null ? pctChange(current, Number(p.pick_price)) : 0
      return {
        id: p.id,
        studentId: p.student_id,
        name: displayName(p),
        ticker: p.ticker,
        companyName: p.company_name,
        pickPrice: Number(p.pick_price),
        currentPrice: current,
        changePercent: change,
        hundredNow: current != null ? hundredNow(current, Number(p.pick_price)) : 100,
      }
    })
    ranked.sort((a, b) => b.changePercent - a.changePercent)
    setRows(ranked)
    setLoading(false)
  }, [classId])

  useEffect(() => { void refresh() }, [refresh])

  return { rows, loading, refresh }
}

// The single largest ABSOLUTE move (up or down) — the "biggest mover" callout.
export function biggestMover(rows: RankedPrediction[]): RankedPrediction | null {
  let best: RankedPrediction | null = null
  for (const r of rows) {
    if (r.currentPrice == null) continue
    if (!best || Math.abs(r.changePercent) > Math.abs(best.changePercent)) best = r
  }
  return best
}
