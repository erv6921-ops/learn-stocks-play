// Shared helpers for the Stock Prediction Draft feature: live price fetching
// (reusing the existing get-stock-quote Yahoo Finance edge function), the 48h
// lock computation, and % change / "$100 invested" math. Kept UI-agnostic so
// PickScreen, PredictionLeaderboard and TeacherPredictionView all share it.

import { supabase } from "@/integrations/supabase/client"

// The edit window: a student may change their pick freely for 48h after
// pick_date. After that the pick is locked (enforced client-side; the DB
// `locked` column is a fallback/manual override).
export const LOCK_WINDOW_MS = 48 * 60 * 60 * 1000

export interface LiveQuote {
  price: number
  changePercent: number
}

// Yahoo Finance uses a hyphen for share classes ("BRK-B"), but we display the
// dotted form ("BRK.B"). Convert only for the fetch.
export function toYahooSymbol(ticker: string): string {
  return ticker.trim().toUpperCase().replace(/\./g, "-")
}

/**
 * Fetch live prices for a set of display tickers via the get-stock-quote edge
 * function (the same Yahoo Finance function the portfolio/watchlist use).
 * Returns a map keyed by the ORIGINAL display ticker. Missing symbols are
 * simply absent from the map — callers should handle that.
 */
export async function fetchQuotes(tickers: string[]): Promise<Record<string, LiveQuote>> {
  const unique = [...new Set(tickers.map(t => t.trim().toUpperCase()))]
  if (unique.length === 0) return {}

  // Map the Yahoo symbol back to the display ticker so we can re-key results.
  const yahooToDisplay = new Map<string, string>()
  for (const t of unique) yahooToDisplay.set(toYahooSymbol(t), t)

  const out: Record<string, LiveQuote> = {}
  const symbols = [...yahooToDisplay.keys()]
  const batchSize = 20

  for (let i = 0; i < symbols.length; i += batchSize) {
    const batch = symbols.slice(i, i + batchSize)
    try {
      const { data, error } = await supabase.functions.invoke("get-stock-quote", {
        body: { symbols: batch },
      })
      if (error) {
        console.error("[stockPredictionDraft] quote batch error:", error)
        continue
      }
      for (const s of data?.stocks ?? []) {
        const display = yahooToDisplay.get(String(s.symbol).toUpperCase())
        if (!display) continue
        const price = Number(s.price)
        if (!Number.isFinite(price) || price <= 0) continue
        out[display] = {
          price,
          changePercent: Number.isFinite(Number(s.changePercent)) ? Number(s.changePercent) : 0,
        }
      }
    } catch (err) {
      console.error("[stockPredictionDraft] quote batch failed:", err)
    }
  }

  return out
}

// True once the 48h edit window has passed, or the row was explicitly locked.
export function isLocked(pick: { locked?: boolean; pickDate: string | Date }): boolean {
  if (pick.locked) return true
  const picked = new Date(pick.pickDate).getTime()
  if (!Number.isFinite(picked)) return false
  return Date.now() - picked >= LOCK_WINDOW_MS
}

// Milliseconds left in the edit window (0 once locked).
export function editWindowRemainingMs(pickDate: string | Date): number {
  const picked = new Date(pickDate).getTime()
  if (!Number.isFinite(picked)) return 0
  return Math.max(0, picked + LOCK_WINDOW_MS - Date.now())
}

// A friendly "1d 4h left" / "3h left" string for the edit window.
export function formatEditWindow(pickDate: string | Date): string {
  const ms = editWindowRemainingMs(pickDate)
  if (ms <= 0) return "locked"
  const hours = Math.floor(ms / (60 * 60 * 1000))
  const mins = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000))
  if (hours >= 24) {
    const days = Math.floor(hours / 24)
    return `${days}d ${hours % 24}h left to change`
  }
  if (hours >= 1) return `${hours}h ${mins}m left to change`
  return `${mins}m left to change`
}

export function pctChange(current: number, pickPrice: number): number {
  if (!pickPrice) return 0
  return ((current - pickPrice) / pickPrice) * 100
}

// "$100 invested at pick time would now be worth $X".
export function hundredNow(current: number, pickPrice: number): number {
  if (!pickPrice) return 100
  return 100 * (current / pickPrice)
}
