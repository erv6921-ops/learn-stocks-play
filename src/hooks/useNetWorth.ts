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

  // Returns how many live prices were successfully fetched, so callers can
  // retry when a throttled response comes back empty.
  const fetchPrices = useCallback(async (): Promise<number> => {
    if (portfolio.length === 0) {
      setLivePrices(new Map());
      return 0;
    }
    setLoading(true);
    try {
      const symbols = portfolio.map(h => h.symbol);
      const { data, error } = await supabase.functions.invoke('get-stock-quote', {
        body: { symbols }
      });
      if (!error && data?.stocks) {
        const fresh = new Map<string, number>();
        for (const s of data.stocks) {
          if (typeof s.price === 'number' && s.price > 0) {
            fresh.set(s.symbol, s.price);
          }
        }
        // Merge, don't replace: on app boot many quote requests fire at once and
        // Yahoo may throttle this batch to a partial (or empty) response. Merging
        // keeps already-known prices instead of blanking the dashboard snapshot.
        if (fresh.size > 0) {
          setLivePrices(prev => {
            const next = new Map(prev);
            for (const [sym, price] of fresh) next.set(sym, price);
            return next;
          });
        }
        return fresh.size;
      }
    } catch {
      // keep previous prices on failure
    } finally {
      setLoading(false);
    }
    return 0;
  }, [portfolio]);

  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    // Fetch immediately on mount / portfolio change. If the initial load gets
    // throttled and returns nothing, retry with backoff so a page refresh always
    // ends up showing live prices rather than falling back to purchase price.
    const loadWithRetry = async (attempt = 0) => {
      if (cancelled) return;
      const got = await fetchPrices();
      if (cancelled || got > 0 || portfolio.length === 0 || attempt >= 4) return;
      retryTimer = setTimeout(() => loadWithRetry(attempt + 1), 1000 * (attempt + 1));
    };
    loadWithRetry();

    const startPolling = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const interval = isLiveMarketSessionNow() ? 15_000 : 60_000;
      intervalRef.current = setInterval(fetchPrices, interval);
    };

    startPolling();
    // Re-check poll frequency every 5 minutes
    const freqCheck = setInterval(startPolling, 300_000);

    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearInterval(freqCheck);
    };
  }, [fetchPrices, portfolio.length]);

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

