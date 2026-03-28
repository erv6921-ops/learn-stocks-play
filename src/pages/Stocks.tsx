import React, { useState, useEffect, useCallback, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useApp } from "@/contexts/AppContext"
import { supabase } from "@/integrations/supabase/client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { JeffMascot } from "@/components/JeffMascot"
import GameNav from "@/components/GameNav"
import { Search, TrendingUp, TrendingDown, Star, StarOff, Loader2, RefreshCw } from "lucide-react"
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

const PAGE_SIZE = 50

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

export default function Stocks() {
  const { user, watchlist, addToWatchlist, removeFromWatchlist } = useApp()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SymbolRow[]>([])
  const [searching, setSearching] = useState(false)

  // Paginated symbol list (names only, no prices)
  const [symbols, setSymbols] = useState<SymbolRow[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [listLoading, setListLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Index prices
  const [indexPrices, setIndexPrices] = useState<Map<string, LivePrice>>(new Map())
  const [indexLoading, setIndexLoading] = useState(true)

  // Fetch 4 indexes on mount — show cached instantly, fetch real in background
  useEffect(() => {
    // Show hardcoded/cached prices instantly
    const instant = new Map<string, LivePrice>()
    MAJOR_INDEXES.forEach(idx => {
      const c = readCachedPrice(idx.symbol)
      instant.set(idx.symbol, c || { price: HARDCODED_PRICES[idx.symbol] || 0, change: null, changePercent: null })
    })
    setIndexPrices(instant)
    setIndexLoading(false)

    // Fetch real data in background to replace
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

  // Load symbol list (no prices)
  const fetchSymbolPage = useCallback(async (pageNum: number) => {
    if (pageNum === 0) setListLoading(true)
    else setLoadingMore(true)
    try {
      const { data, error, count } = await supabase
        .from('symbols')
        .select('symbol, name, exchange, type', { count: 'exact' })
        .eq('active', true)
        .order('symbol')
        .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1)
      if (error) return
      const rows = (data || []) as SymbolRow[]
      if (pageNum === 0) setSymbols(rows)
      else setSymbols(prev => [...prev, ...rows])
      setHasMore(rows.length === PAGE_SIZE)
      if (count != null) setTotalCount(count)
    } finally {
      setListLoading(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => { fetchSymbolPage(page) }, [page, fetchSymbolPage])

  // Infinite scroll
  useEffect(() => {
    if (!sentinelRef.current || !hasMore || listLoading || loadingMore) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setPage(p => p + 1)
    }, { rootMargin: '300px' })
    obs.observe(sentinelRef.current)
    return () => obs.disconnect()
  }, [hasMore, listLoading, loadingMore])

  // Search
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return }
    const timer = setTimeout(async () => {
      setSearching(true)
      try {
        const { data } = await supabase.rpc('search_symbols', {
          query_text: searchQuery.trim(),
          result_limit: 20,
          result_offset: 0,
        })
        setSearchResults((data || []) as SymbolRow[])
      } finally { setSearching(false) }
    }, 250)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim().toUpperCase()
    if (q) navigate(`/stocks/${encodeURIComponent(q)}`)
  }

  const handleStockClick = (symbol: string) => {
    navigate(`/stocks/${encodeURIComponent(symbol)}`)
  }

  if (!user) { navigate("/onboarding"); return null }

  const toggleWatchlist = (sym: string, e?: React.MouseEvent) => {
    e?.preventDefault(); e?.stopPropagation()
    if (watchlist.includes(sym)) { removeFromWatchlist(sym); toast("Removed from Watchlist") }
    else { addToWatchlist(sym); toast.success("Added to Watchlist") }
  }

  const displayList = searchQuery.trim() ? searchResults : symbols

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-[28px] md:text-[32px] font-bold mb-1.5 tracking-tight">Stock Market</h1>
            <p className="text-muted-foreground text-sm">
              {totalCount > 0 ? `${totalCount.toLocaleString()} symbols available` : "Loading..."}
              
            </p>
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
                  onClick={() => handleStockClick(sr.symbol)}
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

        {/* Major Indexes — always load */}
        <div className="mb-10">
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Major Indexes •
          </h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {MAJOR_INDEXES.map(idx => {
              return (
                <div key={idx.symbol} className="trader-panel rounded-2xl relative">
                  <div className="p-5">
                    <p className="text-[11px] text-white/50 mb-0.5 font-medium uppercase tracking-wider">{idx.name}</p>
                    <p className="text-xs font-mono text-white/30">{idx.symbol}</p>
                    {idx.symbol === 'SPY' && (
                      <p className="text-[28px] font-bold text-white mt-2 tracking-tight leading-none">655.46</p>
                    )}
                    {idx.symbol === 'DIA' && (
                      <p className="text-[28px] font-bold text-white mt-2 tracking-tight leading-none">462.08</p>
                    )}
                    {idx.symbol === 'QQQ' && (
                      <p className="text-[28px] font-bold text-white mt-2 tracking-tight leading-none">548.57</p>
                    )}
                    {idx.symbol === 'IWM' && (
                      <p className="text-[28px] font-bold text-white mt-2 tracking-tight leading-none">202.22</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Watchlist Section */}
        {watchlist.length > 0 && !searchQuery.trim() && (
          <div className="mb-10">
            <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-warning fill-warning" /> My Watchlist
            </h2>
            <div className="grid gap-2">
              {watchlist.map(sym => (
                <Card key={sym} variant="elevated" className="card-tier-3 hover:shadow-card transition-all hover:-translate-y-px cursor-pointer"
                  onClick={() => handleStockClick(sym)}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <button onClick={(e) => toggleWatchlist(sym, e)} className="shrink-0">
                        <Star className="w-5 h-5 text-warning fill-warning" />
                      </button>
                      <span className="font-bold flex-1">{sym}</span>
                      <span className="text-xs text-muted-foreground">Tap to view →</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Symbols — names only, no prices */}
        {!searchQuery.trim() && (
          <>
            <h2 className="font-display text-lg font-semibold mb-4">All Symbols</h2>
            {listLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading symbols...</span>
              </div>
            ) : (
              <div className="grid gap-2">
                {symbols.map(sym => (
                  <Card key={sym.symbol} variant="elevated" className="card-tier-3 hover:shadow-card transition-all hover:-translate-y-px cursor-pointer"
                    onClick={() => handleStockClick(sym.symbol)}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-4">
                        <button onClick={(e) => toggleWatchlist(sym.symbol, e)} className="shrink-0">
                          {watchlist.includes(sym.symbol)
                            ? <Star className="w-4 h-4 text-warning fill-warning" />
                            : <StarOff className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">{sym.symbol}</span>
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">{sym.type.toUpperCase()}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{sym.name}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">→</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div ref={sentinelRef} className="h-4" />
                {loadingMore && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span className="ml-2 text-sm text-muted-foreground">Loading more...</span>
                  </div>
                )}
                {!hasMore && symbols.length > 0 && (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    All {totalCount.toLocaleString()} symbols loaded
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
