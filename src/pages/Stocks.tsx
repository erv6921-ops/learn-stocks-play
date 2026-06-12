import React, { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import { supabase } from "@/integrations/supabase/client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { JeffMascot } from "@/components/JeffMascot"
import GameNav from "@/components/GameNav"
import { Search, TrendingUp, TrendingDown, Star, StarOff, Loader2, Coins } from "lucide-react"
import { toast } from "sonner"

interface SymbolRow {
  symbol: string
  name: string
  exchange: string
  type: string
}

interface LivePrice {
  price: number
  change: number | null
  changePercent: number | null
}

const PRICE_CACHE_PREFIX = 'investiplay:stock-price:'

const HARDCODED_PRICES: Record<string, number> = {
  SPY: 655.46, DIA: 462.08, QQQ: 548.57, IWM: 202.22,
  AAPL: 250.96, MSFT: 382.30, GOOGL: 301.73, AMZN: 210.56,
  TSLA: 377.68, NVDA: 175.32, META: 601.93,
}

const MAJOR_INDEXES = [
  { symbol: 'SPY', name: 'S&P 500 (SPY)' },
  { symbol: 'DIA', name: 'Dow Jones (DIA)' },
  { symbol: 'QQQ', name: 'Nasdaq (QQQ)' },
  { symbol: 'IWM', name: 'Russell 2000 (IWM)' },
]

// HARDCODED - replace with live data
// Scrolling ticker tape items shown at the very top of the page.
const TICKER_ITEMS = [
  { symbol: 'AAPL', changePct: 1.2 },
  { symbol: 'TSLA', changePct: -0.8 },
  { symbol: 'NVDA', changePct: 3.1 },
  { symbol: 'MSFT', changePct: 0.4 },
  { symbol: 'AMZN', changePct: -0.3 },
  { symbol: 'META', changePct: 2.1 },
  { symbol: 'GOOGL', changePct: 0.6 },
  { symbol: 'JPM', changePct: -0.2 },
  { symbol: 'SPY', changePct: 1.1 },
  { symbol: 'QQQ', changePct: 0.9 },
]

// HARDCODED - replace with live data
// Per-index change % + 8-point sparkline (values normalized to 0–30 height).
const INDEX_META: Record<string, { changePct: number; spark: number[] }> = {
  SPY: { changePct: 1.2, spark: [20, 18, 22, 19, 24, 21, 26, 28] },
  DIA: { changePct: 0.9, spark: [15, 17, 16, 18, 20, 19, 21, 22] },
  QQQ: { changePct: 0.8, spark: [18, 20, 19, 22, 21, 23, 22, 24] },
  IWM: { changePct: -0.3, spark: [22, 21, 20, 19, 18, 20, 17, 16] },
}

// HARDCODED - replace with live data
const MOST_ACTIVE = [
  { symbol: 'NVDA', price: '$875', changePct: 3.1 },
  { symbol: 'AAPL', price: '$213', changePct: 1.2 },
  { symbol: 'TSLA', price: '$248', changePct: -0.8 },
  { symbol: 'META', price: '$520', changePct: 2.1 },
  { symbol: 'AMZN', price: '$185', changePct: -0.3 },
  { symbol: 'GOOGL', price: '$175', changePct: 0.6 },
]

// HARDCODED - replace with live data
const TOP_GAINERS = [
  { symbol: 'NVDA', changePct: 3.1, price: '$875' },
  { symbol: 'META', changePct: 2.1, price: '$520' },
  { symbol: 'AAPL', changePct: 1.2, price: '$213' },
  { symbol: 'GOOGL', changePct: 0.6, price: '$175' },
  { symbol: 'SPY', changePct: 1.1, price: '$548' },
]

// HARDCODED - replace with live data
const TOP_LOSERS = [
  { symbol: 'TSLA', changePct: -0.8, price: '$248' },
  { symbol: 'AMZN', changePct: -0.3, price: '$185' },
  { symbol: 'IWM', changePct: -0.3, price: '$202' },
  { symbol: 'DIA', changePct: 0.9, price: '$462' },
]

function readCachedPrice(symbol: string): LivePrice | null {
  try {
    const raw = localStorage.getItem(`${PRICE_CACHE_PREFIX}${symbol}`)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed?.price !== 'number' || parsed.price <= 0) return null
    return { price: parsed.price, change: parsed.change ?? null, changePercent: parsed.changePercent ?? null }
  } catch { return null }
}

function writeCachedPrice(symbol: string, lp: LivePrice) {
  try { localStorage.setItem(`${PRICE_CACHE_PREFIX}${symbol}`, JSON.stringify({ ...lp, cachedAt: Date.now() })) } catch {}
}

async function fetchPrice(symbol: string, timeoutMs = 8000): Promise<LivePrice | null> {
  const cached = readCachedPrice(symbol)
  const hardcoded = HARDCODED_PRICES[symbol]
  try {
    const result = await Promise.race([
      supabase.functions.invoke('get-stock-quote', { body: { symbols: [symbol] } }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), timeoutMs))
    ])
    const { data, error } = result as any
    if (error || !data?.stocks?.[0]?.price) {
      return cached || (hardcoded ? { price: hardcoded, change: null, changePercent: null } : null)
    }
    const s = data.stocks[0]
    const lp: LivePrice = { price: s.price, change: s.change ?? null, changePercent: s.changePercent ?? null }
    writeCachedPrice(symbol, lp)
    return lp
  } catch {
    return cached || (hardcoded ? { price: hardcoded, change: null, changePercent: null } : null)
  }
}

// True when the US market is open (9:30am–4pm ET on a weekday). Uses the
// browser clock converted to America/New_York so it works in any timezone.
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

// Tiny SVG polyline points string for a sparkline (values 0–30, y inverted).
function sparkPoints(data: number[], width = 96, height = 30): string {
  const n = data.length
  return data
    .map((v, i) => `${((i / (n - 1)) * width).toFixed(1)},${(height - v).toFixed(1)}`)
    .join(' ')
}

function ChangeBadge({ pct }: { pct: number }) {
  const positive = pct >= 0
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${positive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
      {positive ? '+' : ''}{pct.toFixed(1)}%
    </span>
  )
}

export default function Stocks() {
  const { user, watchlist, addToWatchlist, removeFromWatchlist } = useApp()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SymbolRow[]>([])
  const [searching, setSearching] = useState(false)

  // Index prices
  const [indexPrices, setIndexPrices] = useState<Map<string, LivePrice>>(new Map())

  // Market open/closed status — refreshed each minute.
  const [marketOpen, setMarketOpen] = useState(isMarketOpen)

  // Top movers tab
  const [moverTab, setMoverTab] = useState<'gainers' | 'losers'>('gainers')

  useEffect(() => {
    const t = setInterval(() => setMarketOpen(isMarketOpen()), 60_000)
    return () => clearInterval(t)
  }, [])

  // Fetch 4 indexes on mount — show cached instantly, fetch real in background
  useEffect(() => {
    const instant = new Map<string, LivePrice>()
    MAJOR_INDEXES.forEach(idx => {
      const c = readCachedPrice(idx.symbol)
      instant.set(idx.symbol, c || { price: HARDCODED_PRICES[idx.symbol] || 0, change: null, changePercent: null })
    })
    setIndexPrices(instant)

    Promise.all(MAJOR_INDEXES.map(idx => fetchPrice(idx.symbol, 8000)))
      .then(results => {
        const next = new Map<string, LivePrice>(instant)
        MAJOR_INDEXES.forEach((idx, i) => {
          const r = results[i]
          if (r) next.set(idx.symbol, r)
        })
        setIndexPrices(next)
      })
  }, [])

  // Search — autocomplete by ticker OR company name via the free Yahoo
  // Finance search endpoint. Debounced 300ms to limit requests.
  useEffect(() => {
    const q = searchQuery.trim()
    if (!q) { setSearchResults([]); return }

    const mapQuotes = (quotes: any): SymbolRow[] =>
      (Array.isArray(quotes) ? quotes : [])
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

  const movers = moverTab === 'gainers' ? TOP_GAINERS : TOP_LOSERS

  return (
    // PAGE BACKGROUND TINT — barely-perceptible green (positive market day).
    // HARDCODED - replace with live data (use #f7f0f0 on negative days).
    <div className="min-h-screen pb-24 md:pb-8" style={{ backgroundColor: '#f0f7f3' }}>
      {/* 1. ANIMATED TICKER TAPE — at the very top, above everything else */}
      <div className="overflow-hidden" style={{ backgroundColor: '#0f2d1e' }}>
        <div className="ticker-track py-1.5 text-[12px] font-medium">
          {/* Two identical copies → seamless loop. HARDCODED - replace with live data */}
          {[0, 1].map(copy => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {TICKER_ITEMS.map((t, i) => (
                <span key={`${copy}-${i}`} className="flex items-center px-4">
                  <span className="text-white/70 font-semibold mr-1.5">{t.symbol}</span>
                  <span className={t.changePct >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                    {t.changePct >= 0 ? '+' : ''}{t.changePct.toFixed(1)}%
                  </span>
                  <span className="text-white/20 ml-4">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <GameNav />
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-[28px] md:text-[32px] font-bold mb-1.5 tracking-tight">Stock Market</h1>
            {/* 2. MARKET STATUS BADGE — replaces "X symbols available" */}
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`w-2 h-2 rounded-full ${marketOpen ? 'bg-success market-dot-breathe' : 'bg-muted-foreground/50'}`}
              />
              <span className="text-muted-foreground">
                {marketOpen ? 'Market open · Live prices' : 'Market closed · Last close prices'}
              </span>
            </div>
          </div>
          <JeffMascot size="sm" message="Search any stock ticker to see its details!" />
        </div>

        {/* Search Bar — Front and Center */}
        <form onSubmit={handleSearchSubmit} className="mb-10">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search any ticker or company (e.g. AAPL, Tesla)..."
              className="pl-12 h-12 text-base rounded-2xl"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searching && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />}
          </div>
          {searchQuery.trim() && searchResults.length > 0 && (
            <div className="max-w-2xl mx-auto mt-2 rounded-xl border border-border bg-card shadow-lg overflow-hidden">
              {searchResults.slice(0, 8).map(sr => (
                <button
                  key={sr.symbol}
                  onClick={() => { setSearchQuery(sr.symbol); handleStockClick(sr.symbol) }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border/50 last:border-b-0"
                >
                  <span className="font-bold text-sm min-w-[60px]">{sr.symbol}</span>
                  <span className="text-sm text-muted-foreground truncate flex-1">{sr.name}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
                    {sr.type.toUpperCase()}
                  </Badge>
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
            {/* 5. MOST ACTIVE STRIP */}
            <div className="mb-10">
              <h2 className="font-display text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Most active today</h2>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {/* HARDCODED - replace with live data */}
                {MOST_ACTIVE.map(m => (
                  <button
                    key={m.symbol}
                    onClick={() => handleStockClick(m.symbol)}
                    className="shrink-0 w-[140px] text-left rounded-2xl border border-border bg-card p-3 hover:shadow-card transition-all hover:-translate-y-px"
                  >
                    <p className="font-bold text-sm">{m.symbol}</p>
                    <p className="text-base font-mono mt-1">{m.price}</p>
                    <p className={`text-xs font-bold mt-0.5 ${m.changePct >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {m.changePct >= 0 ? '+' : ''}{m.changePct.toFixed(1)}%
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. MAJOR INDEXES — upgraded cards */}
            <div className="mb-10">
              <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Major Indexes
              </h2>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {MAJOR_INDEXES.map(idx => {
                  // HARDCODED - replace with live data (change % + sparkline)
                  const meta = INDEX_META[idx.symbol]
                  const positive = meta.changePct >= 0
                  const price = indexPrices.get(idx.symbol)?.price ?? HARDCODED_PRICES[idx.symbol] ?? 0
                  return (
                    <button
                      key={idx.symbol}
                      onClick={() => handleStockClick(idx.symbol)}
                      className="trader-panel rounded-2xl relative text-left overflow-hidden hover:-translate-y-px transition-transform"
                    >
                      <div className="p-5">
                        {/* % change badge — top right */}
                        <span
                          className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full ${positive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}
                        >
                          {positive ? '+' : ''}{meta.changePct.toFixed(1)}%
                        </span>
                        <p className="text-[11px] text-white/50 mb-0.5 font-medium uppercase tracking-wider">{idx.name}</p>
                        <p className="text-xs font-mono text-white/30">{idx.symbol}</p>
                        <p className={`text-[28px] font-bold mt-2 tracking-tight leading-none ${positive ? 'price-flash-up' : 'price-flash-down'}`}>
                          {price.toFixed(2)}
                        </p>
                        {/* Sparkline */}
                        <svg viewBox="0 0 96 30" className="w-full h-8 mt-3" preserveAspectRatio="none">
                          <polyline
                            points={sparkPoints(meta.spark)}
                            fill="none"
                            stroke={positive ? '#22c55e' : '#ef4444'}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 6. WATCHLIST SECTION */}
            <div className="mb-10">
              <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-warning fill-warning" /> Your watchlist
              </h2>
              {watchlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center rounded-2xl border border-dashed border-border bg-card/50">
                  <Star className="w-6 h-6 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">Star any stock to track it here</p>
                </div>
              ) : (
                <div className="grid gap-2">
                  {watchlist.map(sym => (
                    <Card key={sym} variant="elevated" className="card-tier-3 hover:shadow-card transition-all hover:-translate-y-px cursor-pointer"
                      onClick={() => handleStockClick(sym)}>
                      <CardContent className="p-3">
                        <div className="flex items-center gap-4">
                          <button onClick={(e) => toggleWatchlist(sym, e)} className="shrink-0">
                            <Star className="w-4 h-4 text-warning fill-warning" />
                          </button>
                          <span className="font-bold text-sm flex-1">{sym}</span>
                          <span className="text-xs text-muted-foreground">→</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* 7. TOP MOVERS — replaces All Symbols */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-display text-lg font-semibold mr-2">Top movers</h2>
                <button
                  onClick={() => setMoverTab('gainers')}
                  className={`flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors ${moverTab === 'gainers' ? 'bg-success/10 text-success' : 'text-muted-foreground hover:bg-muted/50'}`}
                >
                  <TrendingUp className="w-4 h-4" /> Gainers
                </button>
                <button
                  onClick={() => setMoverTab('losers')}
                  className={`flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors ${moverTab === 'losers' ? 'bg-destructive/10 text-destructive' : 'text-muted-foreground hover:bg-muted/50'}`}
                >
                  <TrendingDown className="w-4 h-4" /> Losers
                </button>
              </div>
              <div className="grid gap-2">
                {/* HARDCODED - replace with live data */}
                {movers.map(row => (
                  <Card key={row.symbol} variant="elevated" className="card-tier-3 hover:shadow-card transition-all hover:-translate-y-px cursor-pointer"
                    onClick={() => handleStockClick(row.symbol)}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-4">
                        <button onClick={(e) => toggleWatchlist(row.symbol, e)} className="shrink-0">
                          {watchlist.includes(row.symbol)
                            ? <Star className="w-4 h-4 text-warning fill-warning" />
                            : <StarOff className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />}
                        </button>
                        <span className="font-bold text-sm flex-1">{row.symbol}</span>
                        <span className="text-sm font-mono text-muted-foreground">{row.price}</span>
                        <ChangeBadge pct={row.changePct} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 8. ANALYST REPORT BANNER */}
            <div
              className="rounded-2xl p-5 flex items-center justify-between gap-4"
              style={{ backgroundColor: '#0f2d1e' }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/20 flex items-center justify-center shrink-0">
                  <Coins className="w-5 h-5 text-gold" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold">Unlock analyst reports</p>
                  <p className="text-white/50 text-sm truncate">Get AI-generated insights for any stock</p>
                </div>
              </div>
              <button
                onClick={() => toast("Coming soon!")}
                className="shrink-0 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap"
                style={{ backgroundColor: '#0a2016', color: '#f59e0b', border: '1px solid #f59e0b33' }}
              >
                100 coins · Unlock
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
