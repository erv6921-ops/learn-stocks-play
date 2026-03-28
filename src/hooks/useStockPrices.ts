import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Stock } from '@/types';
import { mockStocks } from '@/data/stocksData';

export function useStockPrices(symbols?: string[]) {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const isFirstFetch = useRef(true);

  const fetchPrices = useCallback(async () => {
    try {
      if (isFirstFetch.current) {
        setLoading(true);
      }
      setError(null);

      const symbolsToFetch = symbols || mockStocks.map(s => s.symbol);
      const batchSize = 20;
      const batches: string[][] = [];
      for (let i = 0; i < symbolsToFetch.length; i += batchSize) {
        batches.push(symbolsToFetch.slice(i, i + batchSize));
      }

      const allPrices: any[] = [];

      for (const batch of batches) {
        try {
          const { data, error: fetchError } = await supabase.functions.invoke('get-stock-quote', {
            body: { symbols: batch }
          });

          if (fetchError) {
            console.error('[useStockPrices] Batch error:', fetchError);
            continue;
          }

          if (data?.stocks) {
            allPrices.push(...data.stocks);
          }
        } catch (batchErr) {
          console.error('[useStockPrices] Batch fetch failed:', batchErr);
          continue;
        }
      }

      if (allPrices.length === 0) {
        setError('Failed to fetch live prices. Showing cached data.');
        return;
      }

      const updatedStocks = mockStocks.map(mockStock => {
        const livePrice = allPrices.find((p: any) => p.symbol === mockStock.symbol);
        if (livePrice) {
          return {
            ...mockStock,
            price: livePrice.price || mockStock.price,
            change: livePrice.change ?? 0,
            changePercent: livePrice.changePercent ?? 0,
            volume: livePrice.volume || mockStock.volume,
            marketCap: livePrice.marketCap || mockStock.marketCap,
            high52Week: livePrice.high52Week || mockStock.high52Week,
            low52Week: livePrice.low52Week || mockStock.low52Week,
          };
        }
        return mockStock;
      });

      setStocks(updatedStocks);
      setLastUpdated(new Date());
      isFirstFetch.current = false;
    } catch (err) {
      console.error('[useStockPrices] Error:', err);
      setError('Failed to fetch live prices. Showing cached data.');
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  useEffect(() => {
    fetchPrices();

    // Refresh every 60 seconds
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const getStockBySymbol = useCallback((symbol: string) => {
    return stocks.find(s => s.symbol === symbol);
  }, [stocks]);

  const searchStocks = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    return stocks.filter(
      stock =>
        stock.symbol.toLowerCase().includes(lowerQuery) ||
        stock.name.toLowerCase().includes(lowerQuery)
    );
  }, [stocks]);

  return {
    stocks,
    loading,
    error,
    lastUpdated,
    refetch: fetchPrices,
    getStockBySymbol,
    searchStocks,
  };
}
