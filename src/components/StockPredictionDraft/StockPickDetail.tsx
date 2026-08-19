// Rich stock detail shown when a student taps a card in the draft — the same
// stats they'd see on the Stocks page (price, day range, 52-week range, volume,
// market cap, P/E, EPS, beta, dividend yield) plus a 6-month price chart — so
// they can make an informed pick. Reuses the get-stock-quote (with history) and
// get-stock-fundamentals edge functions and the app's number formatters.

import { useEffect, useMemo, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, YAxis, XAxis, Tooltip } from "recharts"
import { Loader2, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { formatMarketCap, formatVolume } from "@/data/stocksData"
import { toYahooSymbol } from "@/lib/stockPredictionDraft"
import type { CuratedTicker } from "@/content/stockPredictionDraft/curatedTickers"

interface HistoryPoint { timestamp: number; price: number }

interface Details {
  price: number
  change: number
  changePercent: number
  open: number
  previousClose: number
  dayHigh: number
  dayLow: number
  high52Week: number | null
  low52Week: number | null
  volume: number | null
  avgVolume3M: number | null
  marketCap: number | null
  peRatio: number | null
  eps: number | null
  beta: number | null
  dividendYield: number | null
  history: HistoryPoint[]
}

const fmtUSD = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? "—" : n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

interface Props {
  ticker: CuratedTicker
  submitting: boolean
  onCancel: () => void
  /** Confirm the pick, passing the live price the student is looking at. */
  onConfirm: (livePrice: number) => void
}

export default function StockPickDetail({ ticker, submitting, onCancel, onConfirm }: Props) {
  const [details, setDetails] = useState<Details | null>(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    const sym = toYahooSymbol(ticker.ticker)
    setLoading(true); setFailed(false); setDetails(null)
    ;(async () => {
      const [quoteRes, fundRes] = await Promise.all([
        supabase.functions.invoke("get-stock-quote", {
          body: { symbols: [sym], includeHistory: true, historyRange: "6m" },
        }),
        supabase.functions.invoke("get-stock-fundamentals", { body: { symbol: sym } }),
      ])
      if (cancelled) return

      const q = quoteRes.data?.stocks?.[0]
      if (!q || !Number.isFinite(Number(q.price))) { setFailed(true); setLoading(false); return }
      // Fundamentals come nested under `fundamentals` (matches StockDetail).
      const f = fundRes.data?.fundamentals ?? {}

      const history: HistoryPoint[] = (q.historicalData ?? [])
        .map((p: { timestamp: number | string; price: number | string }) => ({ timestamp: Number(p.timestamp), price: Number(p.price) }))
        .filter((p: HistoryPoint) => Number.isFinite(p.price))

      setDetails({
        price: Number(q.price),
        change: Number(q.change) || 0,
        changePercent: Number(q.changePercent) || 0,
        open: Number(q.open) || 0,
        previousClose: q.previousClose ?? f.previous_close ?? 0,
        dayHigh: q.dayHigh ?? f.day_high ?? 0,
        dayLow: q.dayLow ?? f.day_low ?? 0,
        high52Week: f.high_52_week ?? q.high52Week ?? null,
        low52Week: f.low_52_week ?? q.low52Week ?? null,
        volume: q.volume ?? null,
        avgVolume3M: f.avg_volume_3m ?? null,
        marketCap: f.market_cap ?? q.marketCap ?? null,
        peRatio: f.pe_ratio ?? null,
        eps: f.eps ?? null,
        beta: f.beta ?? null,
        dividendYield: f.dividend_yield ?? null,
        history,
      })
      setLoading(false)
    })()
    return () => { cancelled = true }
  }, [ticker.ticker])

  const up = (details?.changePercent ?? 0) >= 0

  const stats = useMemo(() => {
    if (!details) return []
    const d = details
    return [
      { label: "Open", value: fmtUSD(d.open) },
      { label: "Prev Close", value: fmtUSD(d.previousClose) },
      { label: "Day's Range", value: d.dayLow && d.dayHigh ? `${fmtUSD(d.dayLow)} – ${fmtUSD(d.dayHigh)}` : "—" },
      { label: "52-Week Range", value: d.low52Week && d.high52Week ? `${fmtUSD(d.low52Week)} – ${fmtUSD(d.high52Week)}` : "—" },
      { label: "Volume", value: d.volume ? formatVolume(d.volume) : "—" },
      { label: "Avg Volume (3M)", value: d.avgVolume3M ? formatVolume(d.avgVolume3M) : "—" },
      { label: "Market Cap", value: d.marketCap ? formatMarketCap(d.marketCap) : "—" },
      { label: "P/E Ratio", value: d.peRatio != null ? d.peRatio.toFixed(2) : "—" },
      { label: "EPS", value: d.eps != null ? fmtUSD(d.eps) : "—" },
      { label: "Beta", value: d.beta != null ? d.beta.toFixed(2) : "—" },
      { label: "Dividend Yield", value: d.dividendYield != null ? `${(d.dividendYield * (d.dividendYield < 1 ? 100 : 1)).toFixed(2)}%` : "—" },
    ]
  }, [details])

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xl font-display font-bold">{ticker.companyName}</div>
        <div className="text-sm text-muted-foreground">{ticker.ticker} · {ticker.category}</div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading stats…
        </div>
      ) : failed || !details ? (
        <div className="py-8 text-center text-sm text-muted-foreground">
          Couldn't load live data for {ticker.ticker}. You can still pick it, or try another.
        </div>
      ) : (
        <>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-bold tabular-nums">{fmtUSD(details.price)}</div>
            <div className={`flex items-center gap-1 pb-1 font-semibold ${up ? "text-success" : "text-destructive"}`}>
              {up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {up ? "+" : ""}{details.change.toFixed(2)} ({up ? "+" : ""}{details.changePercent.toFixed(2)}%)
            </div>
          </div>

          {details.history.length > 1 && (
            <div className="h-40 -mx-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={details.history}>
                  <defs>
                    <linearGradient id="pickChart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={up ? "#3DDC97" : "#FF5A5F"} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={up ? "#3DDC97" : "#FF5A5F"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis domain={["dataMin", "dataMax"]} hide />
                  <XAxis dataKey="timestamp" hide />
                  <Tooltip
                    labelFormatter={(t) => new Date(Number(t) * 1000).toLocaleDateString()}
                    formatter={(v: number | string) => [fmtUSD(Number(v)), "Price"]}
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  />
                  <Area type="monotone" dataKey="price" stroke={up ? "#3DDC97" : "#FF5A5F"} strokeWidth={2} fill="url(#pickChart)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="text-center text-[11px] text-muted-foreground">Past 6 months</div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-muted/40 p-2.5">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
                <div className="text-sm font-semibold tabular-nums">{s.value}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel} disabled={submitting}>Cancel</Button>
        <Button
          onClick={() => onConfirm(details?.price ?? 0)}
          disabled={submitting || loading || !details}
        >
          {submitting
            ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving…</>
            : `Lock in ${ticker.ticker} as my pick`}
        </Button>
      </div>
    </div>
  )
}
