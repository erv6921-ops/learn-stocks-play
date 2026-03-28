import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HistoricalPoint {
  date: string;
  price: number;
}

export function useStockHistory(symbol: string | undefined) {
  const [historicalData, setHistoricalData] = useState<HistoricalPoint[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    let cancelled = false;

    async function fetchHistory() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase.functions.invoke('get-stock-quote', {
          body: { symbols: [symbol], includeHistory: true }
        });

        if (cancelled) return;

        if (fetchError) {
          setError('Failed to fetch chart data');
          return;
        }

        const stockData = data?.stocks?.[0];
        if (stockData?.historicalData && stockData.historicalData.length > 0) {
          setHistoricalData(stockData.historicalData);
        }
      } catch (err) {
        if (!cancelled) setError('Failed to fetch chart data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchHistory();
    return () => { cancelled = true; };
  }, [symbol]);

  return { historicalData, loading, error };
}
