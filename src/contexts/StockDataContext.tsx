import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from "react"
import { useStockPrices } from "@/hooks/useStockPrices"
import { Stock } from "@/types"
import { supabase } from "@/integrations/supabase/client"
import { mockStocks } from "@/data/stocksData"

interface StockStats {
  symbol: string
  market_cap: number | null
  volume: number | null
  pe_ratio: number | null
  high_52_week: number | null
  low_52_week: number | null
  updated_at: string
}

interface StockDataContextType {
  stocks: Stock[]
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  refetch: () => Promise<void>
  getStockBySymbol: (symbol: string) => Stock | undefined
  searchStocks: (query: string) => Stock[]
  statsLoading: boolean
  statsLastUpdated: Date | null
  refreshStatsForSymbol: (symbol: string) => Promise<boolean>
}

const StockDataContext = createContext<StockDataContextType | undefined>(undefined)

export function StockDataProvider({ children }: { children: ReactNode }) {
  const stockPriceData = useStockPrices()
  const [statsMap, setStatsMap] = useState<Map<string, StockStats>>(new Map())
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsLastUpdated, setStatsLastUpdated] = useState<Date | null>(null)
  const initialStatsLoaded = useRef(false)

  // Fetch stats from database on mount
  useEffect(() => {
    async function loadStats() {
      try {
        const { data, error } = await supabase
          .from('stock_stats')
          .select('*')

        if (error) {
          console.error('Error loading stock stats:', error)
          return
        }

        if (data && data.length > 0) {
          const map = new Map<string, StockStats>()
          for (const row of data) {
            map.set(row.symbol, row as StockStats)
          }
          setStatsMap(map)
          setStatsLastUpdated(new Date())
          console.log(`Loaded ${data.length} stock stats from database`)
        } else {
          // No stats in DB yet - trigger initial bulk refresh
          console.log('No stats in DB, triggering initial bulk refresh...')
          triggerBulkRefresh()
        }
      } catch (err) {
        console.error('Error loading stats:', err)
      } finally {
        setStatsLoading(false)
        initialStatsLoaded.current = true
      }
    }

    loadStats()
  }, [])

  const triggerBulkRefresh = useCallback(async () => {
    try {
      const allSymbols = mockStocks.map(s => s.symbol)
      const { data, error } = await supabase.functions.invoke('refresh-stock-stats', {
        body: { symbols: allSymbols }
      })

      if (error) {
        console.error('Bulk refresh error:', error)
        return
      }

      console.log(`Bulk refresh result:`, data)

      // Re-load from DB
      const { data: freshStats } = await supabase
        .from('stock_stats')
        .select('*')

      if (freshStats) {
        const map = new Map<string, StockStats>()
        for (const row of freshStats) {
          map.set(row.symbol, row as StockStats)
        }
        setStatsMap(map)
        setStatsLastUpdated(new Date())
      }
    } catch (err) {
      console.error('Error in bulk refresh:', err)
    }
  }, [])

  // On-demand refresh for a single symbol (rate-limited server-side)
  const refreshStatsForSymbol = useCallback(async (symbol: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke('refresh-stock-stats', {
        body: { symbol }
      })

      if (error) {
        console.error(`Refresh error for ${symbol}:`, error)
        return false
      }

      if (data?.rateLimited) {
        console.log(`Rate limited for ${symbol}`)
        return false
      }

      if (data?.stats) {
        setStatsMap(prev => {
          const next = new Map(prev)
          next.set(symbol, { ...data.stats, updated_at: new Date().toISOString() })
          return next
        })
        return true
      }

      return false
    } catch (err) {
      console.error(`Error refreshing stats for ${symbol}:`, err)
      return false
    }
  }, [])

  // Merge price data with stats data
  const mergedStocks = stockPriceData.stocks.map(stock => {
    const stats = statsMap.get(stock.symbol)
    if (stats) {
      return {
        ...stock,
        marketCap: stats.market_cap ?? stock.marketCap,
        volume: stats.volume ?? stock.volume,
        peRatio: stats.pe_ratio ?? stock.peRatio,
        high52Week: stats.high_52_week ?? stock.high52Week,
        low52Week: stats.low_52_week ?? stock.low52Week,
      }
    }
    return stock
  })

  const getStockBySymbol = useCallback((symbol: string) => {
    return mergedStocks.find(s => s.symbol === symbol)
  }, [mergedStocks])

  const searchStocks = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase()
    return mergedStocks.filter(
      stock =>
        stock.symbol.toLowerCase().includes(lowerQuery) ||
        stock.name.toLowerCase().includes(lowerQuery)
    )
  }, [mergedStocks])

  return (
    <StockDataContext.Provider value={{
      stocks: mergedStocks,
      loading: stockPriceData.loading,
      error: stockPriceData.error,
      lastUpdated: stockPriceData.lastUpdated,
      refetch: stockPriceData.refetch,
      getStockBySymbol,
      searchStocks,
      statsLoading,
      statsLastUpdated,
      refreshStatsForSymbol,
    }}>
      {children}
    </StockDataContext.Provider>
  )
}

export function useStockData() {
  const context = useContext(StockDataContext)
  if (context === undefined) {
    throw new Error("useStockData must be used within a StockDataProvider")
  }
  return context
}
