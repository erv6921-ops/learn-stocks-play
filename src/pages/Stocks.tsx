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

interface Quote {
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
// fetched live from Yahoo Finance via the get-stock-quote proxy — nothing here
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
// failure so the caller can fall back to a flat "—" state.
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

// True when the US market is open (9:30am–4pm ET on a weekday). Converts the
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

const fmtPrice = (p: number | null | undefined) => (p == null ? '—' : `$${p.toFixed(2)}`)
const fmtPlainPrice = (p: number | null | undefined) => (p == null ? '—' : p.toFixed(2))
const fmtPct = (c: number | null | undefined) =>
  c == null ? '—' : `${c >= 0 ? '+' : ''}${c.toFixed(1)}%`

// Small loading shimmer block.
const Sk = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-muted ${className}`} />
)

function ChangeBadge({ pct }: { pct: number | null | undefined }) {
  if (pct == null) {
    return <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0 bg-muted text-muted-foreground">—</span>
  }
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

  // Live data
  const [quotes, setQuotes] = useState<Record<string, Quote>>({})
  const [quotesLoading, setQuotesLoading] = useState(true)
  const [sparks, setSparks] = useState<Record<string, number[]>>({})

  // Market open/closed status — refreshed each minute.
  const [marketOpen, setMarketOpen] = useState(isMarketOpen)

  // Top movers tab
  const [moverTab, setMoverTab] = useState<'gainers' | 'losers'>('gainers')

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
  // movers — all from one proxy call, refreshed every 60s.
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

  // Live intraday sparklines for the 4 index cards — refreshed every 60s.
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

  // Search — autocomplete by ticker OR company name via the free Yahoo
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

  // Derive top movers from live quotes: gainers high→low, losers low→high.
  const moverQuotes = MOVER_SYMBOLS
    .map(sym => ({ symbol: sym, ...quotes[sym] }))
    .filter(q => q.changePercent != null)
  const gainers = moverQuotes
    .filter(q => (q.changePercent ?? 0) >= 0)
    .sort((a, b) => (b.changePercent ?? 0) - (a.changePercent ?? 0))
  const losers = moverQuotes
    .filter(q => (q.changePercent ?? 0) < 0)
    .sort((a, b) => (a.changePercent ?? 0) - (b.changePercent ?? 0))
  const movers = moverTab === 'gainers' ? gainers : losers

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* 1. ANIMATED TICKER TAPE — live quotes, at the very top */}
      <div className="overflow-hidden" style={{ backgroundColor: '#0f2d1e' }}>
        <div className="ticker-track py-1.5 text-[12px] font-medium">
          {/* Two identical copies → seamless loop. */}
          {[0, 1].map(copy => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {TICKER_SYMBOLS.map((sym, i) => {
                const c = quotes[sym]?.changePercent
                const p = quotes[sym]?.price
                return (
                  <span key={`${copy}-${i}`} className="flex items-center px-4">
                    <span className="text-white/70 font-semibold mr-1.5">{sym}</span>
                    <span className="text-white/50 mr-1.5">{fmtPrice(p)}</span>
                    <span className={c == null ? 'text-white/40' : c >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      {fmtPct(c)}
                    </span>
                    <span className="text-white/20 ml-4">·</span>
                  </span>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <GameNav />
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-[28px] md:text-[32px] font-bold mb-1.5 tracking-tight">Stock Market</h1>
            {/* 2. MARKET STATUS BADGE */}
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
            {/* 5. MOST ACTIVE STRIP — live */}
            <div className="mb-10">
              <h2 className="font-display text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Most active today</h2>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {MOST_ACTIVE_SYMBOLS.map(sym => {
                  const c = quotes[sym]?.changePercent
                  const p = quotes[sym]?.price
                  return (
                    <button
                      key={sym}
                      onClick={() => handleStockClick(sym)}
                      className="shrink-0 w-[140px] text-left rounded-2xl border border-border bg-card p-3 hover:shadow-card transition-all hover:-translate-y-px"
                    >
                      <p className="font-bold text-sm">{sym}</p>
                      {quotesLoading && p == null ? (
                        <Sk className="h-5 w-16 mt-1" />
                      ) : (
                        <p className="text-base font-mono mt-1">{fmtPrice(p)}</p>
                      )}
                      <p className={`text-xs font-bold mt-0.5 ${c == null ? 'text-muted-foreground' : c >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {fmtPct(c)}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. MAJOR INDEXES — live price, % change, intraday sparkline */}
            <div className="mb-10">
              <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Major Indexes
              </h2>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {MAJOR_INDEXES.map(idx => {
                  const q = quotes[idx.symbol]
                  const change = q?.changePercent
                  const positive = (change ?? 0) >= 0
                  const points = sparks[idx.symbol] || []
                  return (
                    <button
                      key={idx.symbol}
                      onClick={() => handleStockClick(idx.symbol)}
                      className="trader-panel rounded-2xl relative text-left overflow-hidden hover:-translate-y-px transition-transform"
                    >
                      <div className="p-5">
                        {/* % change badge — top right */}
                        <span
                          className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full ${change == null ? 'bg-white/10 text-white/50' : positive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}
                        >
                          {fmtPct(change)}
                        </span>
                        <p className="text-[11px] text-white/50 mb-0.5 font-medium uppercase tracking-wider">{idx.name}</p>
                        <p className="text-xs font-mono text-white/30">{idx.symbol}</p>
                        {quotesLoading && q?.price == null ? (
                          <Sk className="h-7 w-24 mt-2 bg-white/10" />
                        ) : (
                          <p className={`text-[28px] font-bold mt-2 tracking-tight leading-none ${q?.price == null ? 'text-white' : positive ? 'price-flash-up' : 'price-flash-down'}`}>
                            {fmtPlainPrice(q?.price)}
                          </p>
                        )}
                        {/* Intraday sparkline */}
                        <div className="h-8 mt-3">
                          {points.length >= 2 ? (
                            <svg viewBox="0 0 96 30" className="w-full h-8" preserveAspectRatio="none">
                              <polyline
                                points={sparkPoints(points)}
                                fill="none"
                                stroke={positive ? '#22c55e' : '#ef4444'}
                                strokeWidth="1.5"
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
                  {watchlist.map(sym => {
                    const c = quotes[sym]?.changePercent
                    const p = quotes[sym]?.price
                    return (
                      <Card key={sym} variant="elevated" className="card-tier-3 hover:shadow-card transition-all hover:-translate-y-px cursor-pointer"
                        onClick={() => handleStockClick(sym)}>
                        <CardContent className="p-3">
                          <div className="flex items-center gap-4">
                            <button onClick={(e) => toggleWatchlist(sym, e)} className="shrink-0">
                              <Star className="w-4 h-4 text-warning fill-warning" />
                            </button>
                            <span className="font-bold text-sm flex-1">{sym}</span>
                            <span className="text-sm font-mono text-muted-foreground">{fmtPrice(p)}</span>
                            <ChangeBadge pct={c} />
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>

            {/* 7. TOP MOVERS — live, sorted */}
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
              {quotesLoading && moverQuotes.length === 0 ? (
                <div className="grid gap-2">
                  {[0, 1, 2, 3, 4].map(i => <Sk key={i} className="h-[58px] w-full" />)}
                </div>
              ) : movers.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">
                  No {moverTab} right now.
                </p>
              ) : (
                <div className="grid gap-2">
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
                          <span className="text-sm font-mono text-muted-foreground">{fmtPrice(row.price)}</span>
                          <ChangeBadge pct={row.changePercent} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
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
