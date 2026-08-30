import React, { useState, useEffect, useCallback, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import { formatMarketCap, formatVolume } from "@/data/stocksData"
import { supabase } from "@/integrations/supabase/client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tooltip as UiTooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import GameNav from "@/components/GameNav"
import { ResponsiveContainer, Area, AreaChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import {
  ArrowLeft, TrendingUp, TrendingDown, Star, StarOff, Coins,
  ShoppingCart, Wallet, Plus, Minus, AlertCircle, CheckCircle2,
  LayoutDashboard, BookOpen, RefreshCw, Loader2, LineChart, Clock, HelpCircle, Search
} from "lucide-react"
import { toast } from "sonner"
import { formatHistoryTimestamp, formatLocalTimestamp, getMarketSessionStatus, isLiveMarketSessionNow } from "@/lib/marketSession"
import { anchor } from "@/lib/tourAnchors"
import { recordStockView } from "@/lib/dailyMissions"

interface StockData {
  symbol: string
  requestedSymbol: string
  returnedSymbol: string | null
  quoteType: string | null
  currency: string | null
  marketState: string | null
  session?: string | null
  regularMarketTime: number | null
  quoteTimestamp?: number | null
  name: string
  type: string
  price: number
  change: number | null
  changePercent: number | null
  volume: number
  marketCap: number
  high52Week: number
  low52Week: number
  open: number
  dayHigh: number
  dayLow: number
  previousClose: number
  peRatio: number
  eps: number
  beta: number
  dividendYield: number
  avgVolume3M: number
  revenue: number | null
  ebitda: number | null
  profitMargin: number | null
  operatingMargin: number | null
  forwardPE: number | null
  forwardEPS: number | null
  sharesOutstanding: number | null
  floatShares: number | null
  priceToBook: number | null
  priceToSales: number | null
  exDividendDate: string | null
  dividendRate: number | null
  targetEst: number | null
  securityType: string
  fundamentalsUpdatedAt: string | null
}

interface HistoricalPoint {
  date?: string
  timestamp: number
  price: number
}

interface CachedQuotePayload {
  stockData: StockData
  cachedAt: number
}

interface CachedHistoryPayload {
  history: HistoricalPoint[]
  historyMeta: { range: string; interval: string } | null
  lastDataTimestamp: string | null
  cachedAt: number
}

const TIME_RANGES = [
  { label: 'Recent', value: '1d' },
  { label: '5D', value: '5d' },
  { label: '1M', value: '1m' },
  { label: '6M', value: '6m' },
  { label: '1Y', value: '1y' },
  { label: '5Y', value: '5y' },
]

const STOCK_LABEL_OVERRIDES: Record<string, string> = {
  SPY: 'S&P 500 (SPY)',
  DIA: 'Dow Jones (DIA)',
  QQQ: 'Nasdaq (QQQ)',
  IWM: 'Russell 2000 (IWM)',
}

function getDisplayStockName(symbol: string, fallback: string): string {
  return STOCK_LABEL_OVERRIDES[symbol] || fallback
}

function formatHistoryDataAsOf(timestamp: number): string {
  return formatLocalTimestamp(timestamp, true)
}

function getQuoteCacheKey(symbol: string) {
  return `investiplay:detail-quote:${symbol}`
}

function getHistoryCacheKey(symbol: string, range: string) {
  return `investiplay:detail-history:${symbol}:${range}`
}

function readCachedQuote(symbol: string): StockData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(getQuoteCacheKey(symbol))
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachedQuotePayload
    return parsed?.stockData ?? null
  } catch {
    return null
  }
}

function writeCachedQuote(stockData: StockData) {
  if (typeof window === 'undefined') return
  try {
    const payload: CachedQuotePayload = { stockData, cachedAt: Date.now() }
    window.localStorage.setItem(getQuoteCacheKey(stockData.symbol), JSON.stringify(payload))
  } catch {}
}

function readCachedHistory(symbol: string, range: string): CachedHistoryPayload | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(getHistoryCacheKey(symbol, range))
    if (!raw) return null
    return JSON.parse(raw) as CachedHistoryPayload
  } catch {
    return null
  }
}

function writeCachedHistory(symbol: string, range: string, history: HistoricalPoint[], historyMeta: { range: string; interval: string } | null, lastDataTimestamp: string | null) {
  if (typeof window === 'undefined') return
  try {
    const payload: CachedHistoryPayload = { history, historyMeta, lastDataTimestamp, cachedAt: Date.now() }
    window.localStorage.setItem(getHistoryCacheKey(symbol, range), JSON.stringify(payload))
  } catch {}
}

const HARDCODED_PRICES: Record<string, number> = {
  SPY: 655.46, DIA: 462.08, QQQ: 548.57, IWM: 202.22,
  AAPL: 250.96, MSFT: 382.30, GOOGL: 301.73, AMZN: 210.56,
  TSLA: 377.68, NVDA: 175.32, META: 601.93,
}

// Kid-friendly, plain-English definitions for every stat shown on this page.
// Keyed by the exact label text used in the UI (both header + panel variants).
const STAT_HELP: Record<string, string> = {
  "Open": "The price of one share when the stock market opened this morning.",
  "Prev Close": "The price of one share when the market closed yesterday.",
  "Previous Close": "The price of one share when the market closed yesterday.",
  "Day's Range": "The lowest and highest price the stock has traded at so far today.",
  "52-Week Range": "The lowest and highest price this stock hit over the past year.",
  "Volume": "How many shares were bought and sold today. Bigger means more people are trading it.",
  "Avg Volume (3M)": "The average number of shares traded each day over the last 3 months.",
  "Market Cap": "The total value of the whole company: share price times the number of shares that exist.",
  "Mkt Cap": "The total value of the whole company: share price times the number of shares that exist.",
  "Net Assets": "The total value of everything this fund holds.",
  "Shares Outstanding": "The total number of shares the company has created.",
  "P/E (TTM)": "Price-to-Earnings: how much investors pay for each $1 the company earns. Higher = pricier.",
  "Forward P/E": "Like P/E, but based on how much the company is expected to earn next year.",
  "Price/Sales": "The company's value compared to how much money it makes in sales.",
  "Price/Book": "The company's value compared to what its assets are worth on paper.",
  "EPS (TTM)": "Earnings Per Share: the profit the company made for each share over the past year.",
  "Forward EPS": "The profit per share the company is expected to make next year.",
  "Revenue (TTM)": "All the money the company brought in from sales over the past year.",
  "EBITDA": "A measure of profit before subtracting things like taxes and interest.",
  "Profit Margin": "Out of every $1 the company makes, how much is actual profit.",
  "Operating Margin": "How much profit the company keeps from its main business, before taxes and interest.",
  "Beta (5Y Monthly)": "How wild the price swings are compared to the whole market. Above 1 means bumpier than average.",
  "1Y Target Est": "What experts guess the price could be one year from now.",
  "Dividend Yield": "The yearly cash a company pays you, shown as a % of the share price.",
  "Dividend Rate": "The amount of cash a company pays you per share each year.",
  "Ex-Dividend Date": "You need to own the stock before this date to get the next dividend payment.",
  "Shares Owned": "How many shares of this stock you own right now.",
  "Avg. Purchase Price": "The average price you paid for each share you own.",
  "Current Value": "What all of your shares are worth right now.",
  "Profit/Loss": "How much you've gained or lost since you bought, in coins and percent.",
}

// Tiny hoverable "?" that explains what a stat means. Works on hover, tap and
// keyboard focus (Radix Tooltip). stopPropagation keeps it from triggering any
// clickable parent.
function HelpTip({ label, dark = false }: { label: string; dark?: boolean }) {
  const text = STAT_HELP[label]
  if (!text) return null
  return (
    <UiTooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); e.preventDefault() }}
          aria-label={`What does ${label} mean?`}
          className={`inline-grid place-items-center shrink-0 rounded-full transition-colors ${dark ? 'text-white/30 hover:text-white/80' : 'text-muted-foreground/50 hover:text-muted-foreground'}`}
        >
          <HelpCircle className="w-3 h-3" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[220px] text-xs leading-relaxed font-normal">
        {text}
      </TooltipContent>
    </UiTooltip>
  )
}

// Compact at-a-glance stat pill for the stock header summary strip.
function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl bg-muted/60 px-3 py-2 min-w-[88px]">
      <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
        <HelpTip label={label} />
      </span>
      <span className="text-sm font-semibold tabular-nums whitespace-nowrap">{value}</span>
    </div>
  )
}

// Tiled stat cell used inside the dark Key Statistics panel.
function DarkStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 transition-colors hover:bg-white/[0.06]">
      <div className="flex items-center gap-1 mb-1 min-w-0">
        <p className="text-[10px] text-white/40 truncate">{label}</p>
        <HelpTip label={label} dark />
      </div>
      <p className="text-sm font-semibold text-white/90 tabular-nums">{value}</p>
    </div>
  )
}

// Section heading inside the dark Key Statistics panel.
function DarkStatSection({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-2.5 mt-1">
      <span className="w-1 h-3.5 rounded-full bg-primary/70" />
      <p className="text-[10px] font-bold text-white/55 uppercase tracking-wider">{title}</p>
    </div>
  )
}

export default function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>()
  const { user, watchlist, addToWatchlist, removeFromWatchlist, jeffsBalance, buyStock, sellStock, getHolding } = useApp()
  const navigate = useNavigate()

  // Record each distinct stock viewed today, for the "Market watch" daily mission.
  useEffect(() => {
    if (!symbol) return
    recordStockView(symbol)
  }, [symbol])

  const [stockData, setStockData] = useState<StockData | null>(null)
  const [history, setHistory] = useState<HistoricalPoint[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [historyLoading, setHistoryLoading] = useState(true)
  const [selectedRange, setSelectedRange] = useState('1m')
  const [rangeBaseline, setRangeBaseline] = useState<number | null>(null)
  const [rangeLatest, setRangeLatest] = useState<number | null>(null)

  const allChartsRef = useRef<Record<string, { history: HistoricalPoint[]; meta: { range: string; interval: string }; lastTs: string }>>({})
  const [allChartsFetched, setAllChartsFetched] = useState(false)
  const [rangeChangePercent, setRangeChangePercent] = useState<number | null>(null)
  const [rangeDollarChange, setRangeDollarChange] = useState<number | null>(null)
  const [historyMeta, setHistoryMeta] = useState<{ range: string; interval: string } | null>(null)
  const [lastDataTimestamp, setLastDataTimestamp] = useState<string | null>(null)
  const [lastQuoteTime, setLastQuoteTime] = useState<Date | null>(null)

  const [buyMode, setBuyMode] = useState<"buy" | "sell">("buy")
  const [shares, setShares] = useState<number>(1)
  const [showConfirm, setShowConfirm] = useState(false)

  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const symInfoRef = useRef<{ name: string; type: string } | null>(null)

  const holding = symbol ? getHolding(symbol) : undefined

  // ── Compute range % change from history data ──
  const computeRangeChange = useCallback((histData: HistoricalPoint[], _range: string) => {
    if (!histData || histData.length < 2) {
      setRangeChangePercent(null)
      setRangeDollarChange(null)
      setRangeBaseline(null)
      setRangeLatest(null)
      return
    }
    const validPoints = histData.filter(p => Number.isFinite(p.price) && p.price > 0)
    if (validPoints.length < 2) return
    const startPrice = validPoints[0].price
    const endPrice = validPoints[validPoints.length - 1].price
    if (startPrice > 0) {
      const dollarChange = endPrice - startPrice
      const pctChange = ((endPrice - startPrice) / startPrice) * 100
      setRangeDollarChange(dollarChange)
      setRangeChangePercent(pctChange)
      setRangeBaseline(startPrice)
      setRangeLatest(endPrice)
    }
  }, [])


  // ── Apply chart data to state ──
  const applyChart = useCallback((chartData: { history: HistoricalPoint[]; meta: { range: string; interval: string }; lastTs: string }, range: string) => {
    setHistory(chartData.history)
    setHistoryMeta(chartData.meta)
    setLastDataTimestamp(chartData.lastTs)
    setHistoryLoading(false)
    computeRangeChange(chartData.history, range)
  }, [computeRangeChange])

  // ── Fetch live quote (Layer 1) ──
  const fetchQuote = useCallback(async (isInitial = false) => {
    if (!symbol) return
    if (isInitial) {
      setLoading(true)
    }

    try {
      if (isInitial && !symInfoRef.current) {
        const { data: symRow } = await supabase
          .from('symbols')
          .select('symbol, name, type')
          .eq('symbol', symbol)
          .maybeSingle()

        symInfoRef.current = symRow
          ? { name: symRow.name, type: symRow.type }
          : { name: symbol, type: 'stock' }
      }

      const info = symInfoRef.current!

      const [quoteResult, fundamentalsResult] = isInitial
        ? await Promise.all([
            supabase.functions.invoke('get-stock-quote', { body: { symbols: [symbol] } }),
            supabase.functions.invoke('get-stock-fundamentals', { body: { symbol } }),
          ])
        : [await supabase.functions.invoke('get-stock-quote', { body: { symbols: [symbol] } }), { data: null }]

      const quoteData = quoteResult.data
      const fundData = isInitial ? fundamentalsResult.data?.fundamentals : null

      const fundDefaults = {
        revenue: fundData?.revenue ?? null,
        ebitda: fundData?.ebitda ?? null,
        profitMargin: fundData?.profit_margin ?? null,
        operatingMargin: fundData?.operating_margin ?? null,
        forwardPE: fundData?.forward_pe ?? null,
        forwardEPS: fundData?.forward_eps ?? null,
        sharesOutstanding: fundData?.shares_outstanding ?? null,
        floatShares: fundData?.float_shares ?? null,
        priceToBook: fundData?.price_to_book ?? null,
        priceToSales: fundData?.price_to_sales ?? null,
        exDividendDate: fundData?.ex_dividend_date ?? null,
        dividendRate: fundData?.dividend_rate ?? null,
        targetEst: fundData?.target_est ?? null,
        securityType: fundData?.security_type ?? 'stock',
        fundamentalsUpdatedAt: fundData?.updated_at ?? null,
      }

      if (quoteResult.error || !quoteData?.stocks?.[0]) {
        // Polygon returned nothing - keep existing state (cached or null)
        return
      }

      const q = quoteData.stocks[0]
      console.log(`[StockDetail] Quote loaded for ${symbol}: $${q.price}`)
      const marketTimeSec = typeof q.regularMarketTime === 'number' ? q.regularMarketTime : null
      const quoteTimestampSec = typeof q.quoteTimestamp === 'number'
        ? q.quoteTimestamp
        : typeof q.timestamp === 'number'
          ? q.timestamp
          : marketTimeSec

      let cachedPayload: StockData | null = null
      setStockData(prev => {
        const nextStockData: StockData = {
          symbol,
          requestedSymbol: q.requestedSymbol || symbol,
          returnedSymbol: q.returnedSymbol || q.symbol || symbol,
          quoteType: q.quoteType || prev?.quoteType || null,
          currency: q.currency || prev?.currency || null,
          marketState: q.marketState || prev?.marketState || null,
          session: q.session || prev?.session || null,
          regularMarketTime: marketTimeSec ?? prev?.regularMarketTime ?? null,
          quoteTimestamp: quoteTimestampSec ?? prev?.quoteTimestamp ?? null,
          name: info.name,
          type: info.type,
          price: q.price ?? prev?.price ?? 0,
          change: q.change ?? prev?.change ?? 0,
          changePercent: q.changePercent ?? prev?.changePercent ?? 0,
          volume: q.volume ?? prev?.volume ?? 0,
          marketCap: fundData?.market_cap || q.marketCap || prev?.marketCap || 0,
          high52Week: fundData?.high_52_week || q.high52Week || prev?.high52Week || 0,
          low52Week: fundData?.low_52_week || q.low52Week || prev?.low52Week || 0,
          open: q.open ?? fundData?.open_price ?? prev?.open ?? 0,
          dayHigh: q.dayHigh ?? fundData?.day_high ?? prev?.dayHigh ?? 0,
          dayLow: q.dayLow ?? fundData?.day_low ?? prev?.dayLow ?? 0,
          previousClose: q.previousClose ?? fundData?.previous_close ?? prev?.previousClose ?? 0,
          peRatio: fundData?.pe_ratio || q.peRatio || prev?.peRatio || 0,
          eps: fundData?.eps || q.eps || prev?.eps || 0,
          beta: fundData?.beta || q.beta || prev?.beta || 0,
          dividendYield: fundData?.dividend_yield || q.dividendYield || prev?.dividendYield || 0,
          avgVolume3M: fundData?.avg_volume_3m || q.avgVolume3M || prev?.avgVolume3M || 0,
          revenue: isInitial ? fundDefaults.revenue : (prev?.revenue ?? null),
          ebitda: isInitial ? fundDefaults.ebitda : (prev?.ebitda ?? null),
          profitMargin: isInitial ? fundDefaults.profitMargin : (prev?.profitMargin ?? null),
          operatingMargin: isInitial ? fundDefaults.operatingMargin : (prev?.operatingMargin ?? null),
          forwardPE: isInitial ? fundDefaults.forwardPE : (prev?.forwardPE ?? null),
          forwardEPS: isInitial ? fundDefaults.forwardEPS : (prev?.forwardEPS ?? null),
          sharesOutstanding: isInitial ? fundDefaults.sharesOutstanding : (prev?.sharesOutstanding ?? null),
          floatShares: isInitial ? fundDefaults.floatShares : (prev?.floatShares ?? null),
          priceToBook: isInitial ? fundDefaults.priceToBook : (prev?.priceToBook ?? null),
          priceToSales: isInitial ? fundDefaults.priceToSales : (prev?.priceToSales ?? null),
          exDividendDate: isInitial ? fundDefaults.exDividendDate : (prev?.exDividendDate ?? null),
          dividendRate: isInitial ? fundDefaults.dividendRate : (prev?.dividendRate ?? null),
          targetEst: isInitial ? fundDefaults.targetEst : (prev?.targetEst ?? null),
          securityType: isInitial ? fundDefaults.securityType : (prev?.securityType ?? 'stock'),
          fundamentalsUpdatedAt: isInitial ? fundDefaults.fundamentalsUpdatedAt : (prev?.fundamentalsUpdatedAt ?? null),
        }
        cachedPayload = nextStockData
        return nextStockData
      })

      if (cachedPayload) writeCachedQuote(cachedPayload)
      if (quoteTimestampSec) setLastQuoteTime(new Date(quoteTimestampSec * 1000))
    } catch (err) {
      console.error('Quote fetch error:', err)
      const cachedQuote = symbol ? readCachedQuote(symbol) : null
      if (cachedQuote) {
        setStockData(cachedQuote)
      }
      // If no cache, stockData stays null - loading screen shown
    } finally {
      if (isInitial) setLoading(false)
    }
  }, [symbol, selectedRange])

  // ── Fetch a single chart range (with cache check) ──
  const fetchSingleChart = useCallback(async (sym: string, range: string): Promise<{ range: string; history: HistoricalPoint[]; meta: { range: string; interval: string }; lastTs: string } | null> => {
    const cached = readCachedHistory(sym, range)
    if (cached?.history?.length) {
      return { range, history: cached.history, meta: cached.historyMeta!, lastTs: cached.lastDataTimestamp! }
    }
    try {
      const { data, error } = await supabase.functions.invoke('get-stock-quote', {
        body: { symbols: [sym], chartOnly: true, includeHistory: true, historyRange: range }
      })
      if (error || !data?.stocks?.[0]?.historicalData?.length) {
        return null
      }
      const stockHistory = data.stocks[0]
      const hd: HistoricalPoint[] = stockHistory.historicalData.filter(
        (p: HistoricalPoint) => Number.isFinite(p.price) && p.price > 0
      )
      if (hd.length === 0) return null
      const meta = { range: stockHistory.historyRange || range, interval: stockHistory.historyInterval || 'unknown' }
      const lastTs = formatHistoryDataAsOf(hd[hd.length - 1].timestamp)
      writeCachedHistory(sym, range, hd, meta, lastTs)

      // Derive price from chart if quote returned $0
      const lastPoint = hd[hd.length - 1]
      if (lastPoint) {
        setStockData(prev => prev && prev.price === 0 ? { ...prev, price: lastPoint.price } : prev)
      }

      return { range, history: hd, meta, lastTs }
    } catch {
      return null
    }
  }, [])

  // ── Prefetch all 6 timeframes SEQUENTIALLY with delays ──
  const prefetchAllCharts = useCallback(async () => {
    if (!symbol) return
    setHistoryLoading(true)

    const allRanges = ['1d', '5d', '1m', '6m', '1y', '5y']
    const priorityRange = selectedRange
    const orderedRanges = [priorityRange, ...allRanges.filter(r => r !== priorityRange)]

    const chartMap: typeof allChartsRef.current = {}
    let firstLoaded = false

    for (let i = 0; i < orderedRanges.length; i++) {
      const range = orderedRanges[i]

      if (i > 0) {
        const cached = readCachedHistory(symbol, range)
        if (!cached?.history?.length) {
          await new Promise(r => setTimeout(r, 13000))
        }
      }

      const result = await fetchSingleChart(symbol, range)
      if (result) {
        chartMap[result.range] = { history: result.history, meta: result.meta, lastTs: result.lastTs }
        allChartsRef.current = { ...allChartsRef.current, ...chartMap }

        if (!firstLoaded && range === priorityRange) {
          applyChart(chartMap[range], range)
          firstLoaded = true
        }
      }
      // If no data from Polygon, skip this range - don't generate fake data
    }

    allChartsRef.current = chartMap
    setAllChartsFetched(true)

    if (!firstLoaded) {
      const active = chartMap[selectedRange] || chartMap['1m'] || Object.values(chartMap)[0]
      if (active) {
        applyChart(active, selectedRange)
      } else {
        setHistoryLoading(false)
      }
    }
  }, [symbol, selectedRange, fetchSingleChart, applyChart, stockData?.price])

  // ── When user switches timeframe ──
  // Always (re)fetch the selected range so every period button fires a request
  // to get-stock-quote with the correct historyRange. fetchSingleChart returns
  // a cached payload instantly when available, otherwise hits the edge function.
  useEffect(() => {
    if (!symbol) return
    let cancelled = false

    // Show what we already have for this range instantly; otherwise show loading.
    const existing = allChartsRef.current[selectedRange]
    if (existing) {
      applyChart(existing, selectedRange)
    } else {
      setHistoryLoading(true)
    }

    void (async () => {
      const result = await fetchSingleChart(symbol, selectedRange)
      if (cancelled) return
      if (result) {
        allChartsRef.current = {
          ...allChartsRef.current,
          [result.range]: { history: result.history, meta: result.meta, lastTs: result.lastTs },
        }
        applyChart(allChartsRef.current[result.range], selectedRange)
      } else if (!allChartsRef.current[selectedRange]) {
        // No data for this range - show empty
        setHistory(null)
        setHistoryLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [selectedRange, symbol, fetchSingleChart, applyChart, allChartsFetched])

  // ── Initial load: show cached data instantly if available, otherwise loading state ──
  useEffect(() => {
    symInfoRef.current = null
    allChartsRef.current = {}
    setAllChartsFetched(false)
    setHistory(null)
    setHistoryLoading(true)

    if (!symbol) return

    // Check localStorage cache or hardcoded price - show instantly
    const cachedQuote = readCachedQuote(symbol)
    const hardcodedPrice = HARDCODED_PRICES[symbol]
    if (cachedQuote) {
      setStockData(cachedQuote)
      setLoading(false)
    } else if (hardcodedPrice) {
      setStockData({
        symbol, requestedSymbol: symbol, returnedSymbol: symbol,
        quoteType: null, currency: 'USD', marketState: null,
        regularMarketTime: null, name: symbol, type: 'stock',
        price: hardcodedPrice, change: null, changePercent: null,
        volume: 0, marketCap: 0, high52Week: 0, low52Week: 0,
        open: 0, dayHigh: 0, dayLow: 0, previousClose: 0,
        peRatio: 0, eps: 0, beta: 0, dividendYield: 0, avgVolume3M: 0,
        revenue: null, ebitda: null, profitMargin: null, operatingMargin: null,
        forwardPE: null, forwardEPS: null, sharesOutstanding: null, floatShares: null,
        priceToBook: null, priceToSales: null, exDividendDate: null, dividendRate: null,
        targetEst: null, securityType: 'stock', fundamentalsUpdatedAt: null,
      })
      setLoading(false)
    } else {
      setStockData(null)
      setLoading(true)
    }

    // Load cached charts if available
    const allRanges = ['1d', '5d', '1m', '6m', '1y', '5y']
    const chartMap: typeof allChartsRef.current = {}
    let hasCachedCharts = false
    for (const range of allRanges) {
      const cachedHistory = readCachedHistory(symbol, range)
      if (cachedHistory?.history?.length) {
        chartMap[range] = { history: cachedHistory.history, meta: cachedHistory.historyMeta!, lastTs: cachedHistory.lastDataTimestamp! }
        hasCachedCharts = true
      }
    }
    if (hasCachedCharts) {
      allChartsRef.current = chartMap
      setAllChartsFetched(true)
      const initialChart = chartMap[selectedRange] || chartMap['1m']
      if (initialChart) applyChart(initialChart, selectedRange)
    }

    // Fetch real data from API
    fetchQuote(true)
    const timer = setTimeout(() => prefetchAllCharts(), 2000)
    return () => clearTimeout(timer)
  }, [symbol])

  // ── Polling ──
  useEffect(() => {
    if (!symbol) return
    const pollTick = async () => { await fetchQuote(false) }
    const startPolling = () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current)
      const interval = isLiveMarketSessionNow() ? 30000 : 300000
      pollIntervalRef.current = setInterval(pollTick, interval)
    }
    startPolling()
    const marketCheck = setInterval(startPolling, 60000)
    window.addEventListener('focus', pollTick)
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current)
      clearInterval(marketCheck)
      window.removeEventListener('focus', pollTick)
    }
  }, [symbol, fetchQuote])

  if (!user) {
    navigate("/onboarding")
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground text-sm">Loading stock data...</span>
      </div>
    )
  }

  // No data after loading finished → the symbol isn't a real, quotable ticker.
  // Show a clear dead-end with a way back instead of a blank screen.
  if (!stockData) {
    return (
      <div className="min-h-screen bg-background">
        <GameNav />
        <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5">
            <Search className="w-7 h-7 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-extrabold mb-2">Stock not found</h1>
          <p className="text-muted-foreground max-w-sm mb-6">
            We couldn't find a stock with the symbol <span className="font-mono font-bold">{symbol}</span>. It may be misspelled or not available to trade.
          </p>
          <Button asChild variant="hero" size="lg" className="press-scale">
            <Link to="/stocks">Browse stocks</Link>
          </Button>
        </div>
      </div>
    )
  }

  const stock = stockData
  const displayStockName = getDisplayStockName(stock.symbol, stock.name)
  const isInWatchlist = watchlist.includes(stock.symbol)
  const hasValidPrice = Number.isFinite(stock.price) && stock.price > 0
  const totalCost = Math.round(shares * stock.price * 100) / 100
  const canAfford = hasValidPrice && jeffsBalance >= totalCost
  const canSell = hasValidPrice && holding && holding.shares >= shares
  const profitLoss = holding ? (stock.price - holding.purchasePrice) * holding.shares : 0
  const profitLossPercent = holding ? ((stock.price - holding.purchasePrice) / holding.purchasePrice) * 100 : 0

  const handleBuy = () => {
    if (!hasValidPrice) {
      toast.error("Live price unavailable", { description: "We couldn't load a price for this stock. Try again in a moment." })
      return
    }
    if (!canAfford) {
      toast.error("Not enough InvestiCoins!", { description: `You need ${totalCost.toFixed(2)} but have ${jeffsBalance.toFixed(2)}.` })
      return
    }
    const success = buyStock(stock.symbol, shares, stock.price)
    if (success) {
      toast.error(`Bought ${shares} shares of ${stock.symbol}`, { description: `Spent ${totalCost.toFixed(2)} InvestiCoins.`, icon: <TrendingDown className="w-4 h-4" /> })
      setShares(1); setShowConfirm(false)
    }
  }

  const handleSell = () => {
    if (!hasValidPrice) {
      toast.error("Live price unavailable", { description: "We couldn't load a price for this stock. Try again in a moment." })
      return
    }
    if (!canSell) {
      toast.error("Not enough shares!", { description: `You only have ${holding?.shares || 0} shares.` })
      return
    }
    const success = sellStock(stock.symbol, shares, stock.price)
    if (success) {
      toast.success(`Sold ${shares} shares of ${stock.symbol}!`, { description: `Earned ${totalCost.toFixed(2)} InvestiCoins.` })
      setShares(1); setShowConfirm(false)
    }
  }

  const isETF = stock.securityType === 'etf'

  const formatXAxis = (val: number | string) => {
    const ts = Number(val)
    if (!Number.isFinite(ts)) return '--'
    return formatHistoryTimestamp(ts, selectedRange)
  }

  const fmtPrice = (v: number) => (Math.round(v * 100) / 100).toFixed(2)
  const fmtDollar = (v: number) => `$${fmtPrice(v)}`
  const fmtChange = (v: number) => `${v >= 0 ? '+' : ''}${stock.type === 'index' ? '' : '$'}${fmtPrice(Math.abs(v))}`
  const fmtPct = (v: number) => `${v >= 0 ? '+' : ''}${(Math.round(v * 100) / 100).toFixed(2)}%`

  const formatChartPrice = (value: number) => {
    if (stock.type === 'index') {
      return (Math.round(value * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
    return `$${fmtPrice(value)}`
  }

  const chartPositiveColor = "#3DDC97"
  const chartNegativeColor = "#FF5A5F"
  const chartColor = (rangeChangePercent ?? 0) >= 0 ? chartPositiveColor : chartNegativeColor

  // Ensure we always have a displayable price
  const displayPrice = stock.price > 0 ? stock.price : (rangeLatest || stock.price)

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />

      <main className="container mx-auto px-4 py-6">
        {/* Back navigation */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4 press-scale"
        >
          <ArrowLeft className="w-4 h-4" /> Back to markets
        </button>

        {/* Stock Header */}
        <div className="rounded-2xl border border-border bg-card shadow-sm p-5 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1">
                <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">{stock.symbol}</h1>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {stock.type === 'index' ? 'INDEX' : stock.type.toUpperCase()}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-3 truncate">{displayStockName}</p>

              {(() => {
                const headerDollar = rangeDollarChange ?? stock.change ?? 0
                const headerPercent = rangeChangePercent ?? stock.changePercent ?? 0
                const rangeLabel = selectedRange !== '1d' ? TIME_RANGES.find(r => r.value === selectedRange)?.label : null
                const up = headerDollar >= 0
                return (
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-[34px] md:text-[40px] font-bold tracking-tight leading-none tabular-nums">
                      {stock.type === 'index'
                        ? (Math.round(displayPrice * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : fmtDollar(displayPrice)}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-full tabular-nums ${up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                      {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {fmtChange(headerDollar)}
                      {headerPercent != null ? ` (${fmtPct(headerPercent)})` : ""}
                      {rangeLabel && <span className="text-xs font-normal opacity-70 ml-1">{rangeLabel}</span>}
                    </span>
                    <div className="flex flex-col">
                      {(() => {
                        const marketStatus = getMarketSessionStatus({
                          marketState: stock.marketState,
                          session: stock.session,
                          quoteTimestamp: stock.quoteTimestamp ?? stock.regularMarketTime,
                          regularMarketTime: stock.regularMarketTime,
                        })

                        if (marketStatus.session === 'closed') {
                          return (
                            <span className="text-[11px] text-muted-foreground">
                              Market Closed · Closed at {marketStatus.regularCloseTimeET}
                            </span>
                          )
                        }

                        if (marketStatus.session === 'post') {
                          return (
                            <span className="text-[11px] text-muted-foreground">
                              After Hours · Closed at {marketStatus.regularCloseTimeET}{marketStatus.quoteTimeText ? ` · Quote as of ${marketStatus.quoteTimeText}` : ''}
                            </span>
                          )
                        }

                        if (marketStatus.session === 'pre') {
                          return (
                            <span className="text-[11px] text-muted-foreground">
                              Pre-Market{marketStatus.quoteTimeText ? ` · As of ${marketStatus.quoteTimeText}` : ''} · Opens 9:30 AM ET
                            </span>
                          )
                        }

                        return (
                          <span className="text-[11px] text-muted-foreground">
                            Market Open · As of {marketStatus.quoteTimeText || '--'}
                          </span>
                        )
                      })()}
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Watchlist toggle as a pill button */}
            <button
              onClick={() => {
                if (isInWatchlist) {
                  removeFromWatchlist(stock.symbol)
                  toast("Removed from Watchlist", { description: stock.symbol })
                } else {
                  addToWatchlist(stock.symbol)
                  toast.success("Added to Watchlist", { description: stock.symbol })
                }
              }}
              className={`shrink-0 self-start inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-sm font-semibold press-scale transition-colors ${
                isInWatchlist
                  ? 'border-gold/40 bg-gold/10 text-gold'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30'
              }`}
            >
              {isInWatchlist
                ? <><Star className="w-4 h-4 fill-current" /> Watching</>
                : <><StarOff className="w-4 h-4" /> Add to watchlist</>}
            </button>
          </div>

          {/* At-a-glance stat strip */}
          {(() => {
            const chips: { label: string; value: string }[] = []
            if (stock.open > 0) chips.push({ label: 'Open', value: fmtDollar(stock.open) })
            if (stock.previousClose > 0) chips.push({ label: 'Prev Close', value: fmtDollar(stock.previousClose) })
            if (stock.dayLow > 0 && stock.dayHigh > 0) chips.push({ label: "Day's Range", value: `${fmtDollar(stock.dayLow)} to ${fmtDollar(stock.dayHigh)}` })
            if (stock.volume > 0) chips.push({ label: 'Volume', value: formatVolume(stock.volume) })
            if (stock.marketCap > 0) chips.push({ label: isETF ? 'Net Assets' : 'Mkt Cap', value: formatMarketCap(stock.marketCap) })
            if (chips.length === 0) return null
            return (
              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border/60">
                {chips.map(c => <StatChip key={c.label} label={c.label} value={c.value} />)}
              </div>
            )
          })()}
        </div>

        {/* Price Chart */}
        <div className="trader-panel rounded-2xl mb-6">
          <div className="p-5 pb-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-bold text-white/90">
                  Price History
                  {historyLoading && <Loader2 className="w-3 h-3 animate-spin text-white/50 inline ml-2" />}
                </h3>
                {!historyLoading && rangeChangePercent != null && rangeDollarChange != null && (
                  <span className={`text-sm font-bold ${rangeChangePercent >= 0 ? "text-[#3DDC97]" : "text-[#FF5A5F]"}`}>
                    {rangeDollarChange >= 0 ? "+" : ""}{stock.type === 'index' ? '' : '$'}{Math.abs(rangeDollarChange).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    <span className="ml-1">({rangeChangePercent >= 0 ? "+" : ""}{rangeChangePercent.toFixed(2)}%)</span>
                    <span className="text-xs font-normal text-white/40 ml-1">
                      {TIME_RANGES.find(r => r.value === selectedRange)?.label}
                    </span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 max-w-full">
                <div className="flex items-center gap-0.5 bg-white/5 rounded-xl p-0.5 max-w-full overflow-x-auto no-scrollbar" ref={anchor("stock-range")}>
                  {TIME_RANGES.map(r => (
                    <button
                      key={r.value}
                      onClick={() => setSelectedRange(r.value)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all press-scale ${
                        selectedRange === r.value
                          ? 'bg-white/15 text-white shadow-sm shadow-white/5'
                          : 'text-white/40 hover:text-white/70'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="px-1.5 sm:px-5 pb-4">
            {history && history.length > 0 ? (
              <div className="h-80 sm:h-96 md:h-[28rem]">
                <ResponsiveContainer key={`${symbol}-${selectedRange}`} width="100%" height="100%">
                  <AreaChart data={history} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id={`gradient-${symbol}-${selectedRange}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={chartColor} stopOpacity={0.28} />
                        <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="timestamp"
                      tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }}
                      tickFormatter={formatXAxis}
                      axisLine={false}
                      tickLine={false}
                      minTickGap={40}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }}
                      domain={['dataMin', 'dataMax']}
                      axisLine={false}
                      tickLine={false}
                      width={56}
                      tickFormatter={(v) => Number(v).toLocaleString(undefined, { minimumFractionDigits: v < 10 ? 2 : 0, maximumFractionDigits: 2 })}
                      padding={{ top: 10, bottom: 10 }}
                    />
                    <Tooltip
                      cursor={{ stroke: chartColor, strokeWidth: 1, strokeDasharray: '4 4', strokeOpacity: 0.6 }}
                      content={({ active, payload, label }) => {
                        if (!active || !payload || !payload.length) return null
                        return (
                          <div className="rounded-xl border border-white/10 bg-[#12161c]/95 backdrop-blur px-3 py-2 shadow-xl">
                            <p className="text-[10px] text-white/45 mb-0.5">{formatHistoryTimestamp(Number(label), selectedRange)}</p>
                            <p className="text-sm font-bold text-white tabular-nums">{formatChartPrice(Number(payload[0].value))}</p>
                          </div>
                        )
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={chartColor}
                      strokeWidth={2}
                      fill={`url(#gradient-${symbol}-${selectedRange})`}
                      dot={false}
                      activeDot={{ r: 4, fill: chartColor, stroke: '#0b0e12', strokeWidth: 2 }}
                      isAnimationActive={true}
                      animationDuration={600}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 sm:h-96 md:h-[28rem] flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-white/30" />
              </div>
            )}
          </div>
          {!historyLoading && (
            <div className="px-5 pb-1 flex items-center gap-1 text-[10px] text-white/25">
              <Clock className="w-3 h-3" />
              {lastQuoteTime
                ? <>As of {lastQuoteTime.toLocaleTimeString()}</>
                : lastDataTimestamp
                  ? <>Data as of {lastDataTimestamp}</>
                  : null
              }
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Trading Card */}
          {stock.type !== 'index' && stock.price > 0 && (
            <Card variant="elevated" className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShoppingCart className="w-4 h-4 text-primary" />
                  Trade {stock.symbol}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-gold" /> InvestiCoins Balance
                  </span>
                  <span className="font-bold text-base">{jeffsBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex gap-2" ref={anchor("stock-trade-toggle")}>
                  <Button variant={buyMode === "buy" ? "default" : "outline"} className="flex-1 press-scale" size="sm"
                    onClick={() => { setBuyMode("buy"); setShares(1); setShowConfirm(false) }}>Buy</Button>
                  <Button variant={buyMode === "sell" ? "default" : "outline"} className="flex-1 press-scale" size="sm"
                    onClick={() => { setBuyMode("sell"); setShares(1); setShowConfirm(false) }} disabled={!holding}>Sell</Button>
                </div>

                <div>
                  <Label htmlFor="shares" className="text-xs text-muted-foreground mb-2 block">Number of Shares</Label>
                  <div className="flex items-center gap-3" ref={anchor("stock-shares")}>
                    <Button variant="outline" size="icon" className="press-scale" onClick={() => setShares(Math.max(0.01, Math.round((shares - 0.25) * 100) / 100))} disabled={shares <= 0.01}><Minus className="w-4 h-4" /></Button>
                    <Input id="shares" type="number" value={shares} onChange={(e) => setShares(Math.max(0.01, parseFloat(e.target.value) || 0.01))} className="text-center font-semibold" min={0.01} step={0.01} />
                    <Button variant="outline" size="icon" className="press-scale" onClick={() => setShares(Math.round((shares + 0.25) * 100) / 100)}><Plus className="w-4 h-4" /></Button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Price per share</span><span className="font-medium">{fmtDollar(stock.price)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shares</span><span className="font-medium">× {shares}</span></div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-bold">{buyMode === "buy" ? "Cost" : "You receive"}</span>
                    <span className="font-bold flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" />{totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} InvestiCoins</span>
                  </div>
                  {buyMode === "buy" && (
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Balance after purchase</span>
                      <span className={canAfford ? "text-success" : "text-destructive"}>{(jeffsBalance - totalCost).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  {buyMode === "sell" && (
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Balance after sale</span>
                      <span className="text-success">{(jeffsBalance + totalCost).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  )}
                </div>

                {!hasValidPrice && (
                  <div className="flex items-center gap-2 text-destructive text-xs">
                    <AlertCircle className="w-3.5 h-3.5" /><span>Live price unavailable right now - trading is disabled.</span>
                  </div>
                )}
                {hasValidPrice && buyMode === "buy" && !canAfford && (
                  <div className="flex items-center gap-2 text-destructive text-xs">
                    <AlertCircle className="w-3.5 h-3.5" /><span>You need {(totalCost - jeffsBalance).toFixed(2)} more InvestiCoins.</span>
                  </div>
                )}
                {hasValidPrice && buyMode === "sell" && !canSell && (
                  <div className="flex items-center gap-2 text-destructive text-xs">
                    <AlertCircle className="w-3.5 h-3.5" /><span>You only own {holding?.shares || 0} shares.</span>
                  </div>
                )}

                {!showConfirm ? (
                  <Button ref={anchor("stock-trade")} className="w-full press-scale" onClick={() => setShowConfirm(true)} disabled={!hasValidPrice || (buyMode === "buy" ? !canAfford : !canSell)}>
                    {buyMode === "buy" ? "Buy" : "Sell"} {shares} Share{shares > 1 ? "s" : ""}
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-center text-xs text-muted-foreground">Confirm {buyMode === "buy" ? "purchase" : "sale"} of {shares} share{shares > 1 ? "s" : ""} for {totalCost.toFixed(2)} InvestiCoins?</p>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 press-scale" size="sm" onClick={() => setShowConfirm(false)}>Cancel</Button>
                      <Button className="flex-1 press-scale" size="sm" onClick={buyMode === "buy" ? handleBuy : handleSell}><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />Confirm</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Holdings & Stats */}
          <div className={`space-y-6 ${stock.type === 'index' || stock.price === 0 ? 'md:col-span-2' : ''}`}>
            {holding && (
              <Card variant="elevated" className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base"><Wallet className="w-4 h-4 text-primary" />Your Position</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="flex items-center gap-1 text-muted-foreground">Shares Owned<HelpTip label="Shares Owned" /></span><span className="font-bold">{holding.shares}</span></div>
                  <div className="flex justify-between"><span className="flex items-center gap-1 text-muted-foreground">Avg. Purchase Price<HelpTip label="Avg. Purchase Price" /></span><span className="font-medium">{fmtDollar(holding.purchasePrice)}</span></div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-muted-foreground">Current Value<HelpTip label="Current Value" /></span>
                    <span className="font-bold flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" />{fmtPrice(holding.shares * stock.price)}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="flex items-center gap-1 text-muted-foreground">Profit/Loss<HelpTip label="Profit/Loss" /></span>
                    <span className={`font-bold ${profitLoss >= 0 ? "text-success" : "text-destructive"}`}>
                      {profitLoss >= 0 ? "+" : ""}{fmtPrice(Math.abs(profitLoss))} ({profitLossPercent >= 0 ? "+" : ""}{(Math.round(profitLossPercent * 10) / 10).toFixed(1)}%)
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Key Statistics */}
            <div className="trader-panel rounded-2xl">
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white/90">Key Statistics</h3>
                </div>

                <DarkStatSection title="Trading" />
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {stock.open > 0 && <DarkStat label="Open" value={fmtDollar(stock.open)} />}
                  {stock.previousClose > 0 && <DarkStat label="Previous Close" value={fmtDollar(stock.previousClose)} />}
                  {stock.dayLow > 0 && stock.dayHigh > 0 && <DarkStat label="Day's Range" value={`${fmtDollar(stock.dayLow)} to ${fmtDollar(stock.dayHigh)}`} />}
                  {stock.low52Week > 0 && stock.high52Week > 0 && <DarkStat label="52-Week Range" value={`${fmtDollar(stock.low52Week)} to ${fmtDollar(stock.high52Week)}`} />}
                  {stock.volume > 0 && <DarkStat label="Volume" value={formatVolume(stock.volume)} />}
                  {stock.avgVolume3M > 0 && <DarkStat label="Avg Volume (3M)" value={formatVolume(stock.avgVolume3M)} />}
                  {stock.marketCap > 0 && <DarkStat label={isETF ? 'Net Assets' : 'Market Cap'} value={formatMarketCap(stock.marketCap)} />}
                  {stock.sharesOutstanding != null && stock.sharesOutstanding > 0 && (
                    <DarkStat label="Shares Outstanding" value={formatVolume(stock.sharesOutstanding)} />
                  )}
                </div>

                {!isETF && (stock.peRatio > 0 || (stock.forwardPE != null && stock.forwardPE > 0) || (stock.priceToSales != null && stock.priceToSales > 0) || (stock.priceToBook != null && stock.priceToBook > 0)) && (
                  <>
                    <DarkStatSection title="Valuation" />
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {stock.peRatio > 0 && <DarkStat label="P/E (TTM)" value={stock.peRatio.toFixed(2)} />}
                      {stock.forwardPE != null && stock.forwardPE > 0 && <DarkStat label="Forward P/E" value={stock.forwardPE.toFixed(2)} />}
                      {stock.priceToSales != null && stock.priceToSales > 0 && <DarkStat label="Price/Sales" value={stock.priceToSales.toFixed(2)} />}
                      {stock.priceToBook != null && stock.priceToBook > 0 && <DarkStat label="Price/Book" value={stock.priceToBook.toFixed(2)} />}
                    </div>
                  </>
                )}

                {!isETF && (stock.eps > 0 || (stock.revenue != null && stock.revenue > 0) || (stock.ebitda != null && stock.ebitda > 0)) && (
                  <>
                    <DarkStatSection title="Financial Performance" />
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {stock.eps > 0 && <DarkStat label="EPS (TTM)" value={fmtDollar(stock.eps)} />}
                      {stock.forwardEPS != null && stock.forwardEPS > 0 && <DarkStat label="Forward EPS" value={fmtDollar(stock.forwardEPS)} />}
                      {stock.revenue != null && stock.revenue > 0 && <DarkStat label="Revenue (TTM)" value={formatMarketCap(stock.revenue)} />}
                      {stock.ebitda != null && stock.ebitda > 0 && <DarkStat label="EBITDA" value={formatMarketCap(stock.ebitda)} />}
                      {stock.profitMargin != null && stock.profitMargin !== 0 && <DarkStat label="Profit Margin" value={`${stock.profitMargin.toFixed(1)}%`} />}
                      {stock.operatingMargin != null && stock.operatingMargin !== 0 && <DarkStat label="Operating Margin" value={`${stock.operatingMargin.toFixed(1)}%`} />}
                    </div>
                  </>
                )}

                {(stock.beta > 0 || stock.dividendYield > 0 || (stock.dividendRate != null && stock.dividendRate > 0) || (stock.targetEst != null && stock.targetEst > 0)) && (
                  <>
                    <DarkStatSection title="Risk & Dividends" />
                    <div className="grid grid-cols-2 gap-2">
                      {stock.beta > 0 && <DarkStat label="Beta (5Y Monthly)" value={stock.beta.toFixed(2)} />}
                      {stock.targetEst != null && stock.targetEst > 0 && <DarkStat label="1Y Target Est" value={fmtDollar(stock.targetEst)} />}
                      {stock.dividendYield > 0 && <DarkStat label="Dividend Yield" value={`${fmtPrice(stock.dividendYield)}%`} />}
                      {stock.dividendRate != null && stock.dividendRate > 0 && <DarkStat label="Dividend Rate" value={fmtDollar(stock.dividendRate)} />}
                      {stock.exDividendDate && (
                        <div className="col-span-2"><DarkStat label="Ex-Dividend Date" value={stock.exDividendDate} /></div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
