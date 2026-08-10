import React, { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import { supabase } from "@/integrations/supabase/client"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { JeffMascot } from "@/components/JeffMascot"
import GameNav from "@/components/GameNav"
import { Search, TrendingUp, TrendingDown, Star, StarOff, Loader2, Coins, ChevronRight, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { anchor } from "@/lib/tourAnchors"

interface SymbolRow {
  symbol: string
  name: string
  exchange: string
  type: string
}

interface Quote {
  price: number | null
  changePercent: number | null
}

interface MoverRow {
  symbol: string
  name: string
  price: number | null
  changePercent: number | null
}

const MAJOR_INDEXES = [
  { symbol: 'SPY', name: 'S&P 500 (SPY)' },
  { symbol: 'DIA', name: 'Dow Jones (DIA)' },
  { symbol: 'QQQ', name: 'Nasdaq (QQQ)' },
  { symbol: 'IWM', name: 'Russell 2000 (IWM)' },
]

// Which symbols each section displays. Values (price/% change/sparkline) are all
// fetched live from Yahoo Finance via the get-stock-quote proxy - nothing here
// is hardcoded.
const TICKER_SYMBOLS = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'AMZN', 'META', 'GOOGL', 'JPM', 'SPY', 'QQQ']
const MOST_ACTIVE_SYMBOLS = ['NVDA', 'AAPL', 'TSLA', 'META', 'AMZN', 'GOOGL']
const MOVER_SYMBOLS = ['NVDA', 'META', 'AAPL', 'GOOGL', 'SPY', 'TSLA', 'AMZN', 'IWM', 'DIA']

// Every distinct symbol that needs a live quote, fetched in one proxy call.
const QUOTE_SYMBOLS = Array.from(new Set([
  ...TICKER_SYMBOLS,
  ...MOST_ACTIVE_SYMBOLS,
  ...MOVER_SYMBOLS,
  ...MAJOR_INDEXES.map(i => i.symbol),
]))

const REFRESH_MS = 60_000

// Fetch live quotes (price + % change) for many symbols in a single proxy call.
// Reuses the exact same method as the stock detail page. Returns {} on failure.
async function fetchQuotes(symbols: string[]): Promise<Record<string, Quote>> {
  try {
    const { data, error } = await supabase.functions.invoke('get-stock-quote', {
      body: { symbols },
    })
    if (error || !Array.isArray(data?.stocks)) return {}
    const out: Record<string, Quote> = {}
    for (const s of data.stocks) {
      out[String(s.symbol).toUpperCase()] = {
        price: typeof s.price === 'number' && s.price > 0 ? s.price : null,
        changePercent: typeof s.changePercent === 'number' ? s.changePercent : null,
      }
    }
    return out
  } catch {
    return {}
  }
}

// Fetch today's intraday closes (15-minute bars) for a sparkline. Returns [] on
// failure so the caller can fall back to a flat "-" state.
async function fetchSparkline(symbol: string): Promise<number[]> {
  try {
    const { data, error } = await supabase.functions.invoke('get-stock-quote', {
      body: { symbols: [symbol], chartOnly: true, includeHistory: true, historyRange: 'intraday' },
    })
    const hd = data?.stocks?.[0]?.historicalData as Array<{ price?: unknown }> | undefined
    if (error || !Array.isArray(hd)) return []
    return hd
      .map((p) => p?.price)
      .filter((n): n is number => typeof n === 'number' && Number.isFinite(n))
  } catch {
    return []
  }
}

// True when the US market is open (9:30am-4pm ET on a weekday). Converts the
// browser clock to America/New_York so it's correct in any local timezone.
function isMarketOpen(now: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)
  const get = (t: string) => parts.find(p => p.type === t)?.value ?? ''
  const weekday = get('weekday')
  const hour = parseInt(get('hour'), 10) % 24
  const minute = parseInt(get('minute'), 10)
  const minutes = hour * 60 + minute
  const isWeekday = !['Sat', 'Sun'].includes(weekday)
  return isWeekday && minutes >= 9 * 60 + 30 && minutes < 16 * 60
}

// SVG polyline points for a sparkline, normalized to the viewBox (y inverted).
function sparkPoints(data: number[], width = 96, height = 30): string {
  if (data.length < 2) return ''
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const pad = 2
  const n = data.length
  return data
    .map((v, i) => {
      const x = (i / (n - 1)) * width
      const y = pad + (1 - (v - min) / span) * (height - pad * 2)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

const fmtPrice = (p: number | null | undefined) => (p == null ? '-' : `$${p.toFixed(2)}`)
const fmtPlainPrice = (p: number | null | undefined) => (p == null ? '-' : p.toFixed(2))
const fmtPct = (c: number | null | undefined) =>
  c == null ? '-' : `${c >= 0 ? '+' : ''}${c.toFixed(1)}%`

// Small loading shimmer block.
const Sk = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-muted ${className}`} />
)

function ChangeBadge({ pct }: { pct: number | null | undefined }) {
  if (pct == null) {
    return <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0 bg-muted text-muted-foreground">-</span>
  }
  const positive = pct >= 0
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full shrink-0 tabular-nums ${positive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
      {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {positive ? '+' : ''}{pct.toFixed(1)}%
    </span>
  )
}

// One clickable row shared by the Watchlist and Top Movers panels. The star is a
// nested clickable span (not a <button>) so it stays valid inside the row button.
function StockRow({
  symbol, price, changePercent, starred, loading, onClick, onToggleStar, rowRef,
}: {
  symbol: string
  price: number | null | undefined
  changePercent: number | null | undefined
  starred: boolean
  loading?: boolean
  onClick: () => void
  onToggleStar: (e: React.MouseEvent) => void
  rowRef?: (el: HTMLButtonElement | null) => void
}) {
  return (
    <button
      ref={rowRef}
      onClick={onClick}
      className="group w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-muted/60 transition-colors text-left"
    >
      <span
        role="button"
        tabIndex={-1}
        onClick={onToggleStar}
        className="shrink-0 grid place-items-center w-7 h-7 rounded-lg hover:bg-background transition-colors"
      >
        {starred
          ? <Star className="w-4 h-4 text-warning fill-warning" />
          : <StarOff className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />}
      </span>
      <span className="font-bold text-sm flex-1 truncate">{symbol}</span>
      {loading && price == null
        ? <Sk className="h-4 w-14" />
        : <span className="text-sm font-mono text-muted-foreground tabular-nums">{fmtPrice(price)}</span>}
      <ChangeBadge pct={changePercent} />
      <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground/70 transition-colors shrink-0" />
    </button>
  )
}

export default function Stocks() {
  const { user, watchlist, addToWatchlist, removeFromWatchlist } = useApp()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SymbolRow[]>([])
  const [searching, setSearching] = useState(false)

  // Live data
  const [quotes, setQuotes] = useState<Record<string, Quote>>({})
  const [quotesLoading, setQuotesLoading] = useState(true)
  const [sparks, setSparks] = useState<Record<string, number[]>>({})

  // Market open/closed status - refreshed each minute.
  const [marketOpen, setMarketOpen] = useState(isMarketOpen)

  // Top movers tab
  const [moverTab, setMoverTab] = useState<'gainers' | 'losers'>('gainers')
  // Real market movers (Yahoo screeners) fetched via the get-stock-movers function.
  const [moversData, setMoversData] = useState<{ gainers: MoverRow[]; losers: MoverRow[] }>({ gainers: [], losers: [] })
  const [moversLoading, setMoversLoading] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setMarketOpen(isMarketOpen()), REFRESH_MS)
    return () => clearInterval(t)
  }, [])

  // Count visits to the Stocks page (powers the "Market Watcher" badge on the
  // Missions page). Once per mount.
  useEffect(() => {
    try {
      const n = parseInt(localStorage.getItem('investiplay_stocks_visits') || '0', 10) || 0
      localStorage.setItem('investiplay_stocks_visits', String(n + 1))
    } catch { /* localStorage unavailable */ }
  }, [])

  // Live quotes for the ticker tape, index cards, most active strip, and top
  // movers - all from one proxy call, refreshed every 60s.
  useEffect(() => {
    let active = true
    const load = async () => {
      const q = await fetchQuotes(QUOTE_SYMBOLS)
      if (!active) return
      // Keep prior values if a refresh fails (don't blank the page).
      if (Object.keys(q).length > 0) setQuotes(q)
      setQuotesLoading(false)
    }
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => { active = false; clearInterval(id) }
  }, [])

  // Real market-wide top movers from Yahoo's screeners - refreshed every 60s.
  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-stock-movers', { body: { count: 8 } })
        if (!active) return
        if (!error && data && (Array.isArray(data.gainers) || Array.isArray(data.losers))) {
          setMoversData({ gainers: data.gainers ?? [], losers: data.losers ?? [] })
        }
      } catch { /* keep prior values on failure */ }
      if (active) setMoversLoading(false)
    }
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => { active = false; clearInterval(id) }
  }, [])

  // Live intraday sparklines for the 4 index cards - refreshed every 60s.
  useEffect(() => {
    let active = true
    const load = async () => {
      const entries = await Promise.all(
        MAJOR_INDEXES.map(async idx => [idx.symbol, await fetchSparkline(idx.symbol)] as const)
      )
      if (!active) return
      setSparks(prev => {
        const next = { ...prev }
        for (const [sym, pts] of entries) if (pts.length > 0) next[sym] = pts
        return next
      })
    }
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => { active = false; clearInterval(id) }
  }, [])

  // Search - autocomplete by ticker OR company name via the free Yahoo
  // Finance search endpoint. Debounced 300ms to limit requests.
  useEffect(() => {
    const q = searchQuery.trim()
    if (!q) { setSearchResults([]); return }

    const mapQuotes = (quoteList: any): SymbolRow[] =>
      (Array.isArray(quoteList) ? quoteList : [])
        .filter((x: any) => x?.symbol)
        .map((x: any) => ({
          symbol: x.symbol,
          name: x.shortname || x.longname || x.symbol,
          exchange: x.exchange || '',
          type: x.quoteType || 'EQUITY',
        }))

    const timer = setTimeout(async () => {
      setSearching(true)
      try {
        let results: SymbolRow[] = []
        try {
          // Direct Yahoo Finance search.
          const res = await fetch(
            `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=6&newsCount=0`
          )
          if (!res.ok) throw new Error(`status ${res.status}`)
          const data = await res.json()
          results = mapQuotes(data?.quotes)
        } catch {
          // Fall back to the edge-function proxy (avoids browser CORS).
          const { data } = await supabase.functions.invoke('get-stock-quote', {
            body: { searchQuery: q },
          })
          results = mapQuotes(data?.quotes)
        }
        setSearchResults(results)
      } catch {
        setSearchResults([])
      } finally { setSearching(false) }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim().toUpperCase()
    if (q) navigate(`/stocks/${encodeURIComponent(q)}`)
  }

  const handleStockClick = useCallback((symbol: string) => {
    navigate(`/stocks/${encodeURIComponent(symbol)}`)
  }, [navigate])

  if (!user) { navigate("/onboarding"); return null }

  const toggleWatchlist = (sym: string, e?: React.MouseEvent) => {
    e?.preventDefault(); e?.stopPropagation()
    if (watchlist.includes(sym)) { removeFromWatchlist(sym); toast("Removed from Watchlist") }
    else { addToWatchlist(sym); toast.success("Added to Watchlist") }
  }

  // Real market-wide top movers from Yahoo's day_gainers / day_losers screeners.
  const movers = moverTab === 'gainers' ? moversData.gainers : moversData.losers

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* 1. ANIMATED TICKER TAPE - live quotes, at the very top */}
      <div className="relative overflow-hidden border-b border-white/5" style={{ backgroundColor: '#0a2016' }}>
        {/* Soft fade masks on both edges so tickers slide in/out smoothly. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10" style={{ background: 'linear-gradient(90deg, #0a2016, transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10" style={{ background: 'linear-gradient(270deg, #0a2016, transparent)' }} />
        <div className="ticker-track py-2 text-[12px] font-medium">
          {/* Two identical copies → seamless loop. */}
          {[0, 1].map(copy => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {TICKER_SYMBOLS.map((sym, i) => {
                const c = quotes[sym]?.changePercent
                const p = quotes[sym]?.price
                return (
                  <span key={`${copy}-${i}`} className="flex items-center px-4">
                    <span className="text-white/80 font-semibold mr-1.5">{sym}</span>
                    <span className="text-white/45 mr-1.5 tabular-nums">{fmtPrice(p)}</span>
                    <span className={`tabular-nums font-semibold ${c == null ? 'text-white/40' : c >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {fmtPct(c)}
                    </span>
                    <span className="text-white/15 ml-4">·</span>
                  </span>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <GameNav />
      <main className="container mx-auto px-4 py-6 md:py-10">
        <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary/70 mb-1.5">Live Markets</p>
            <h1 className="font-display text-[30px] md:text-[40px] font-extrabold mb-2.5 tracking-tight text-gradient leading-none">Stock Market</h1>
            {/* 2. MARKET STATUS BADGE */}
            <div className="inline-flex items-center gap-2 text-sm rounded-full bg-card border border-border/70 pl-2.5 pr-3.5 py-1 shadow-sm">
              <span
                className={`w-2 h-2 rounded-full ${marketOpen ? 'bg-success market-dot-breathe' : 'bg-muted-foreground/50'}`}
              />
              <span className="text-muted-foreground font-medium">
                {marketOpen ? 'Market open · Live prices' : 'Market closed · Last close prices'}
              </span>
            </div>
          </div>
          <JeffMascot size="sm" message="Search any stock ticker to see its details!" className="hidden sm:flex shrink-0" />
        </div>

        {/* Search Bar - Front and Center */}
        <form onSubmit={handleSearchSubmit} className="mb-8 md:mb-12">
          <div className="relative max-w-2xl mx-auto" ref={anchor("stocks-search")}>
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
            <Input
              placeholder="Search any ticker or company (e.g. AAPL, Tesla)..."
              className="pl-14 h-14 text-base rounded-full shadow-lg border-border/60 bg-card focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/40 transition-shadow"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searching && <Loader2 className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />}
          </div>
          {searchQuery.trim() && searchResults.length > 0 && (
            <div className="max-w-2xl mx-auto mt-2 rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
              {searchResults.slice(0, 8).map(sr => (
                <button
                  key={sr.symbol}
                  onClick={() => { setSearchQuery(sr.symbol); handleStockClick(sr.symbol) }}
                  className="group w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border/50 last:border-b-0"
                >
                  <span className="font-bold text-sm min-w-[60px]">{sr.symbol}</span>
                  <span className="text-sm text-muted-foreground truncate flex-1">{sr.name}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
                    {sr.type.toUpperCase()}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground/70 transition-colors" />
                </button>
              ))}
            </div>
          )}
          {searchQuery.trim() && !searching && searchResults.length === 0 && (
            <p className="text-center text-sm text-muted-foreground mt-3">
              No results found. Press Enter to try loading "{searchQuery.trim().toUpperCase()}" directly.
            </p>
          )}
        </form>

        {/* The rest of the page is hidden while the user is actively searching. */}
        {!searchQuery.trim() && (
          <>
            {/* 3. MAJOR INDEXES - the visual anchor: live price, % change, sparkline */}
            <div className="mb-8 md:mb-12">
              <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Major Indexes
              </h2>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
                {MAJOR_INDEXES.map(idx => {
                  const q = quotes[idx.symbol]
                  const change = q?.changePercent
                  const positive = (change ?? 0) >= 0
                  const points = sparks[idx.symbol] || []
                  const line = positive ? '#34d399' : '#f87171'
                  return (
                    <button
                      key={idx.symbol}
                      onClick={() => handleStockClick(idx.symbol)}
                      className="group relative rounded-2xl text-left overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5 shadow-lg"
                      style={{ background: 'linear-gradient(155deg, hsl(168 45% 10%) 0%, hsl(220 24% 6%) 62%)' }}
                    >
                      {/* directional top accent bar */}
                      <span className={`absolute inset-x-0 top-0 h-[3px] ${change == null ? 'bg-white/10' : positive ? 'bg-emerald-400/80' : 'bg-red-400/80'}`} />
                      <div className="p-4 md:p-5">
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <div className="min-w-0">
                            <p className="text-[11px] text-white/55 font-semibold uppercase tracking-wider truncate">{idx.name}</p>
                            <p className="text-[10px] font-mono text-white/30 mt-0.5">{idx.symbol}</p>
                          </div>
                          <span
                            className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full tabular-nums ${change == null ? 'bg-white/10 text-white/50' : positive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}
                          >
                            {fmtPct(change)}
                          </span>
                        </div>
                        {quotesLoading && q?.price == null ? (
                          <Sk className="h-8 w-24 mt-1 bg-white/10" />
                        ) : (
                          <p className={`text-[26px] md:text-[30px] font-bold tracking-tight leading-none tabular-nums ${q?.price == null ? 'text-white' : positive ? 'price-flash-up' : 'price-flash-down'}`}>
                            {fmtPlainPrice(q?.price)}
                          </p>
                        )}
                        {/* Intraday sparkline with soft gradient fill */}
                        <div className="h-10 mt-3 -mx-1">
                          {points.length >= 2 ? (
                            <svg viewBox="0 0 96 30" className="w-full h-10" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id={`spark-${idx.symbol}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={line} stopOpacity="0.35" />
                                  <stop offset="100%" stopColor={line} stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <polygon points={`0,30 ${sparkPoints(points)} 96,30`} fill={`url(#spark-${idx.symbol})`} />
                              <polyline
                                points={sparkPoints(points)}
                                fill="none"
                                stroke={line}
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <Sk className="h-full w-full bg-white/5" />
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 4. MOST ACTIVE STRIP - live */}
            <div className="mb-8 md:mb-12">
              <h2 className="font-display text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">Most active today</h2>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
                {MOST_ACTIVE_SYMBOLS.map(sym => {
                  const c = quotes[sym]?.changePercent
                  const p = quotes[sym]?.price
                  const positive = (c ?? 0) >= 0
                  return (
                    <button
                      key={sym}
                      onClick={() => handleStockClick(sym)}
                      className="group shrink-0 w-[150px] text-left rounded-2xl border border-border bg-card p-4 hover:shadow-card hover:border-primary/30 transition-all hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-extrabold text-sm">{sym}</p>
                        <span className={`w-1.5 h-1.5 rounded-full ${c == null ? 'bg-muted-foreground/40' : positive ? 'bg-success' : 'bg-destructive'}`} />
                      </div>
                      {quotesLoading && p == null ? (
                        <Sk className="h-5 w-16" />
                      ) : (
                        <p className="text-base font-mono font-semibold tabular-nums">{fmtPrice(p)}</p>
                      )}
                      <p className={`inline-flex items-center gap-0.5 text-xs font-bold mt-1 tabular-nums ${c == null ? 'text-muted-foreground' : positive ? 'text-success' : 'text-destructive'}`}>
                        {c != null && (positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />)}
                        {fmtPct(c)}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 5. WATCHLIST + TOP MOVERS - side by side on desktop to use the width */}
            <div className="grid lg:grid-cols-2 gap-5 md:gap-6 mb-8 md:mb-12">
              {/* Watchlist panel */}
              <section className="rounded-2xl border border-border bg-card p-4 md:p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-warning fill-warning" />
                  <h2 className="font-display text-base font-bold">Your watchlist</h2>
                  {watchlist.length > 0 && (
                    <span className="ml-auto text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{watchlist.length}</span>
                  )}
                </div>
                {watchlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border border-dashed border-border">
                    <Star className="w-6 h-6 text-muted-foreground/50 mb-2" />
                    <p className="text-sm text-muted-foreground">Star any stock to track it here</p>
                  </div>
                ) : (
                  <div className="grid gap-0.5">
                    {watchlist.map(sym => (
                      <StockRow
                        key={sym}
                        symbol={sym}
                        price={quotes[sym]?.price}
                        changePercent={quotes[sym]?.changePercent}
                        starred
                        loading={quotesLoading}
                        onClick={() => handleStockClick(sym)}
                        onToggleStar={(e) => toggleWatchlist(sym, e)}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Top movers panel */}
              <section className="rounded-2xl border border-border bg-card p-4 md:p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3" ref={anchor("stocks-movers")}>
                  <h2 className="font-display text-base font-bold mr-1">Top movers</h2>
                  <div className="ml-auto flex items-center gap-1 bg-muted/60 rounded-full p-0.5">
                    <button
                      onClick={() => setMoverTab('gainers')}
                      className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${moverTab === 'gainers' ? 'bg-success/15 text-success shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" /> Gainers
                    </button>
                    <button
                      onClick={() => setMoverTab('losers')}
                      className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${moverTab === 'losers' ? 'bg-destructive/15 text-destructive shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <TrendingDown className="w-3.5 h-3.5" /> Losers
                    </button>
                  </div>
                </div>
                {moversLoading && movers.length === 0 ? (
                  <div className="grid gap-2 pt-1">
                    {[0, 1, 2, 3, 4].map(i => <Sk key={i} className="h-[46px] w-full" />)}
                  </div>
                ) : movers.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-10 text-center">
                    No {moverTab} right now.
                  </p>
                ) : (
                  <div className="grid gap-0.5">
                    {movers.map((row, ri) => (
                      <StockRow
                        key={row.symbol}
                        symbol={row.symbol}
                        price={row.price}
                        changePercent={row.changePercent}
                        starred={watchlist.includes(row.symbol)}
                        onClick={() => handleStockClick(row.symbol)}
                        onToggleStar={(e) => toggleWatchlist(row.symbol, e)}
                        rowRef={ri === 0 ? anchor("stocks-row") : undefined}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* 6. ANALYST REPORT BANNER */}
            <div
              className="relative overflow-hidden rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/10"
              style={{ background: 'linear-gradient(135deg, #124a30 0%, #0a2016 70%)' }}
            >
              {/* subtle dotted texture */}
              <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '22px 22px' }} />
              <div className="relative flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold">Unlock analyst reports</p>
                  <p className="text-white/60 text-sm truncate">Get AI-generated insights for any stock</p>
                </div>
              </div>
              <button
                onClick={() => toast("Coming soon!")}
                className="relative shrink-0 w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap inline-flex items-center justify-center gap-1.5 transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: '#0a2016', color: '#f59e0b', border: '1px solid #f59e0b44' }}
              >
                <Coins className="w-4 h-4" /> 100 coins · Unlock
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
