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
import GameNav from "@/components/GameNav"
import { ResponsiveContainer, Area, AreaChart, XAxis, YAxis, Tooltip } from "recharts"
import {
  ArrowLeft, TrendingUp, TrendingDown, Star, StarOff, Coins,
  ShoppingCart, Wallet, Plus, Minus, AlertCircle, CheckCircle2,
  LayoutDashboard, BookOpen, RefreshCw, Loader2, LineChart, Clock
} from "lucide-react"
import { toast } from "sonner"
import { formatHistoryTimestamp, formatLocalTimestamp, getMarketSessionStatus, isLiveMarketSessionNow } from "@/lib/marketSession"
import { anchor } from "@/lib/tourAnchors"

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

export default function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>()
  const { user, watchlist, addToWatchlist, removeFromWatchlist, jeffsBalance, buyStock, sellStock, getHolding } = useApp()
  const navigate = useNavigate()

  // Mark that the student viewed a stock today, for the "View 1 stock" daily mission.
  useEffect(() => {
    if (!symbol) return
    const d = new Date()
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
    try { localStorage.setItem("investiplay_stock_viewed", today) } catch { /* ignore */ }
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
        // Polygon returned nothing — keep existing state (cached or null)
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
      // If no cache, stockData stays null — loading screen shown
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
      // If no data from Polygon, skip this range — don't generate fake data
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
        // No data for this range — show empty
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

    // Check localStorage cache or hardcoded price — show instantly
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

  if (!stockData) return null

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
        {/* Stock Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-2xl font-bold">{stock.symbol}</h1>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                {stock.type === 'index' ? 'INDEX' : stock.type.toUpperCase()}
              </Badge>
              <button onClick={() => {
                if (isInWatchlist) {
                  removeFromWatchlist(stock.symbol)
                  toast("Removed from Watchlist", { description: stock.symbol })
                } else {
                  addToWatchlist(stock.symbol)
                  toast.success("Added to Watchlist", { description: stock.symbol })
                }
              }} className="press-scale">
                {isInWatchlist
                  ? <Star className="w-4 h-4 text-gold fill-current" />
                  : <StarOff className="w-4 h-4 text-muted-foreground hover:text-gold transition-colors" />
                }
              </button>
            </div>
            <p className="text-muted-foreground text-sm mb-3">{displayStockName}</p>

            {(() => {
              const headerDollar = rangeDollarChange ?? stock.change ?? 0
              const headerPercent = rangeChangePercent ?? stock.changePercent ?? 0
              const rangeLabel = selectedRange !== '1d' ? TIME_RANGES.find(r => r.value === selectedRange)?.label : null
              return (
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-[32px] font-bold tracking-tight">
                    {stock.type === 'index'
                      ? (Math.round(displayPrice * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : fmtDollar(displayPrice)}
                  </span>
                  <span className={`flex items-center gap-1 text-sm font-semibold ${headerDollar >= 0 ? "text-success" : "text-destructive"}`}>
                    {headerDollar >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {fmtChange(headerDollar)}
                    {headerPercent != null ? ` (${fmtPct(headerPercent)})` : ""}
                    {rangeLabel && <span className="text-xs font-normal text-muted-foreground ml-1">{rangeLabel}</span>}
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
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id={`gradient-${symbol}-${selectedRange}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                      </linearGradient>
                    </defs>
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
                      contentStyle={{
                        background: '#1a1d21',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#fff',
                      }}
                      formatter={(value: number) => [formatChartPrice(value), 'Price']}
                      labelFormatter={(label) => `Time: ${formatHistoryTimestamp(Number(label), selectedRange)}`}
                    />
                    <Area
                      type="linear"
                      dataKey="price"
                      stroke={chartColor}
                      strokeWidth={1.5}
                      fill={`url(#gradient-${symbol}-${selectedRange})`}
                      dot={false}
                      isAnimationActive={false}
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
                    <AlertCircle className="w-3.5 h-3.5" /><span>Live price unavailable right now — trading is disabled.</span>
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
                  <div className="flex justify-between"><span className="text-muted-foreground">Shares Owned</span><span className="font-bold">{holding.shares}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Avg. Purchase Price</span><span className="font-medium">{fmtDollar(holding.purchasePrice)}</span></div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Value</span>
                    <span className="font-bold flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" />{fmtPrice(holding.shares * stock.price)}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="text-muted-foreground">Profit/Loss</span>
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

                <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-2">Trading</p>
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  {stock.open > 0 && <div><p className="text-[11px] text-white/40">Open</p><p className="font-medium text-white/90">{fmtDollar(stock.open)}</p></div>}
                  {stock.previousClose > 0 && <div><p className="text-[11px] text-white/40">Previous Close</p><p className="font-medium text-white/90">{fmtDollar(stock.previousClose)}</p></div>}
                  {stock.dayLow > 0 && stock.dayHigh > 0 && <div><p className="text-[11px] text-white/40">Day's Range</p><p className="font-medium text-white/90 text-xs">{fmtDollar(stock.dayLow)} – {fmtDollar(stock.dayHigh)}</p></div>}
                  {stock.low52Week > 0 && stock.high52Week > 0 && <div><p className="text-[11px] text-white/40">52-Week Range</p><p className="font-medium text-white/90 text-xs">{fmtDollar(stock.low52Week)} – {fmtDollar(stock.high52Week)}</p></div>}
                  {stock.volume > 0 && <div><p className="text-[11px] text-white/40">Volume</p><p className="font-medium text-white/90">{formatVolume(stock.volume)}</p></div>}
                  {stock.avgVolume3M > 0 && <div><p className="text-[11px] text-white/40">Avg Volume (3M)</p><p className="font-medium text-white/90">{formatVolume(stock.avgVolume3M)}</p></div>}
                  {stock.marketCap > 0 && <div><p className="text-[11px] text-white/40">{isETF ? 'Net Assets' : 'Market Cap'}</p><p className="font-medium text-white/90">{formatMarketCap(stock.marketCap)}</p></div>}
                  {stock.sharesOutstanding != null && stock.sharesOutstanding > 0 && (
                    <div><p className="text-[11px] text-white/40">Shares Outstanding</p><p className="font-medium text-white/90">{formatVolume(stock.sharesOutstanding)}</p></div>
                  )}
                </div>

                {!isETF && (stock.peRatio > 0 || (stock.forwardPE != null && stock.forwardPE > 0) || (stock.priceToSales != null && stock.priceToSales > 0) || (stock.priceToBook != null && stock.priceToBook > 0)) && (
                  <>
                    <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-2">Valuation</p>
                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                      {stock.peRatio > 0 && <div><p className="text-[11px] text-white/40">P/E (TTM)</p><p className="font-medium text-white/90">{stock.peRatio.toFixed(2)}</p></div>}
                      {stock.forwardPE != null && stock.forwardPE > 0 && <div><p className="text-[11px] text-white/40">Forward P/E</p><p className="font-medium text-white/90">{stock.forwardPE.toFixed(2)}</p></div>}
                      {stock.priceToSales != null && stock.priceToSales > 0 && <div><p className="text-[11px] text-white/40">Price/Sales</p><p className="font-medium text-white/90">{stock.priceToSales.toFixed(2)}</p></div>}
                      {stock.priceToBook != null && stock.priceToBook > 0 && <div><p className="text-[11px] text-white/40">Price/Book</p><p className="font-medium text-white/90">{stock.priceToBook.toFixed(2)}</p></div>}
                    </div>
                  </>
                )}

                {!isETF && (stock.eps > 0 || (stock.revenue != null && stock.revenue > 0) || (stock.ebitda != null && stock.ebitda > 0)) && (
                  <>
                    <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-2">Financial Performance</p>
                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                      {stock.eps > 0 && <div><p className="text-[11px] text-white/40">EPS (TTM)</p><p className="font-medium text-white/90">{fmtDollar(stock.eps)}</p></div>}
                      {stock.forwardEPS != null && stock.forwardEPS > 0 && <div><p className="text-[11px] text-white/40">Forward EPS</p><p className="font-medium text-white/90">{fmtDollar(stock.forwardEPS)}</p></div>}
                      {stock.revenue != null && stock.revenue > 0 && <div><p className="text-[11px] text-white/40">Revenue (TTM)</p><p className="font-medium text-white/90">{formatMarketCap(stock.revenue)}</p></div>}
                      {stock.ebitda != null && stock.ebitda > 0 && <div><p className="text-[11px] text-white/40">EBITDA</p><p className="font-medium text-white/90">{formatMarketCap(stock.ebitda)}</p></div>}
                      {stock.profitMargin != null && stock.profitMargin !== 0 && <div><p className="text-[11px] text-white/40">Profit Margin</p><p className="font-medium text-white/90">{`${stock.profitMargin.toFixed(1)}%`}</p></div>}
                      {stock.operatingMargin != null && stock.operatingMargin !== 0 && <div><p className="text-[11px] text-white/40">Operating Margin</p><p className="font-medium text-white/90">{`${stock.operatingMargin.toFixed(1)}%`}</p></div>}
                    </div>
                  </>
                )}

                {(stock.beta > 0 || stock.dividendYield > 0 || (stock.dividendRate != null && stock.dividendRate > 0) || (stock.targetEst != null && stock.targetEst > 0)) && (
                  <>
                    <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-2">Risk & Dividends</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {stock.beta > 0 && <div><p className="text-[11px] text-white/40">Beta (5Y Monthly)</p><p className="font-medium text-white/90">{stock.beta.toFixed(2)}</p></div>}
                      {stock.targetEst != null && stock.targetEst > 0 && <div><p className="text-[11px] text-white/40">1Y Target Est</p><p className="font-medium text-white/90">{fmtDollar(stock.targetEst)}</p></div>}
                      {stock.dividendYield > 0 && <div><p className="text-[11px] text-white/40">Dividend Yield</p><p className="font-medium text-white/90">{fmtPrice(stock.dividendYield)}%</p></div>}
                      {stock.dividendRate != null && stock.dividendRate > 0 && <div><p className="text-[11px] text-white/40">Dividend Rate</p><p className="font-medium text-white/90">{fmtDollar(stock.dividendRate)}</p></div>}
                      {stock.exDividendDate && (
                        <div className="col-span-2"><p className="text-[11px] text-white/40">Ex-Dividend Date</p><p className="font-medium text-white/90">{stock.exDividendDate}</p></div>
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
