import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useApp } from '@/contexts/AppContext';
import { isLiveMarketSessionNow } from '@/lib/marketSession';

/**
 * Centralized live net worth hook.
 * netWorth = jeffsBalance (cash) + SUM(shares * livePrice) for each holding.
 * Polls live prices every 15s during market hours, 60s otherwise.
 */
export function useNetWorth() {
  const { jeffsBalance, portfolio } = useApp();
  const [livePrices, setLivePrices] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchPrices = useCallback(async () => {
    if (portfolio.length === 0) {
      setLivePrices(new Map());
      return;
    }
    setLoading(true);
    try {
      const symbols = portfolio.map(h => h.symbol);
      const { data, error } = await supabase.functions.invoke('get-stock-quote', {
        body: { symbols }
      });
      if (!error && data?.stocks) {
        const map = new Map<string, number>();
        for (const s of data.stocks) {
          if (typeof s.price === 'number' && s.price > 0) {
            map.set(s.symbol, s.price);
          }
        }
        setLivePrices(map);
      }
    } catch {
      // keep previous prices on failure
    } finally {
      setLoading(false);
    }
  }, [portfolio]);

  useEffect(() => {
    fetchPrices();

    const startPolling = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const interval = isLiveMarketSessionNow() ? 15_000 : 60_000;
      intervalRef.current = setInterval(fetchPrices, interval);
    };

    startPolling();
    // Re-check poll frequency every 5 minutes
    const freqCheck = setInterval(startPolling, 300_000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearInterval(freqCheck);
    };
  }, [fetchPrices]);

  // Compute portfolio value with live prices, falling back to purchasePrice
  const holdings = portfolio.map(h => {
    const livePrice = livePrices.get(h.symbol) ?? h.purchasePrice;
    const currentValue = h.shares * livePrice;
    const costBasis = h.shares * h.purchasePrice;
    const unrealizedPnL = currentValue - costBasis;
    const unrealizedPnLPercent = costBasis > 0 ? (unrealizedPnL / costBasis) * 100 : 0;
    return {
      symbol: h.symbol,
      shares: h.shares,
      averageCost: h.purchasePrice,
      livePrice,
      currentValue,
      costBasis,
      unrealizedPnL,
      unrealizedPnLPercent,
    };
  });

  const portfolioValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalCostBasis = holdings.reduce((sum, h) => sum + h.costBasis, 0);
  const totalUnrealizedPnL = portfolioValue - totalCostBasis;
  const netWorth = jeffsBalance + portfolioValue;

  return {
    netWorth,
    jeffsBalance,
    portfolioValue,
    totalCostBasis,
    totalUnrealizedPnL,
    holdings,
    livePrices,
    loading,
    refetch: fetchPrices,
  };
}

