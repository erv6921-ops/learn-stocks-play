import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface Fundamentals {
  symbol: string;
  market_cap: number | null;
  pe_ratio: number | null;
  eps: number | null;
  beta: number | null;
  dividend_yield: number | null;
  avg_volume_3m: number | null;
  high_52_week: number | null;
  low_52_week: number | null;
  revenue: number | null;
  ebitda: number | null;
  profit_margin: number | null;
  operating_margin: number | null;
  forward_pe: number | null;
  forward_eps: number | null;
  shares_outstanding: number | null;
  float_shares: number | null;
  price_to_book: number | null;
  price_to_sales: number | null;
  ex_dividend_date: string | null;
  dividend_rate: number | null;
  target_est: number | null;
  previous_close: number | null;
  open_price: number | null;
  day_high: number | null;
  day_low: number | null;
  security_type: string;
}

interface PolygonBar {
  c?: number;
  h?: number;
  l?: number;
  o?: number;
  v?: number;
}

function safeNum(val: unknown): number | null {
  if (val == null || val === 'Infinity' || val === 'NaN') return null;
  const n = Number(val);
  return isFinite(n) ? n : null;
}

async function fetchFromPolygon(symbol: string, apiKey: string): Promise<Fundamentals | null> {
  try {
    const now = new Date();
    const from = new Date(now);
    from.setFullYear(from.getFullYear() - 1);
    const fromDate = from.toISOString().split('T')[0];
    const toDate = now.toISOString().split('T')[0];

    // Use free-tier endpoints: ticker details + prev day close + 1Y daily range
    const [detailsRes, prevRes, historyRes] = await Promise.all([
      fetch(`https://api.polygon.io/v3/reference/tickers/${encodeURIComponent(symbol)}?apiKey=${apiKey}`),
      fetch(`https://api.polygon.io/v2/aggs/ticker/${encodeURIComponent(symbol)}/prev?adjusted=true&apiKey=${apiKey}`),
      fetch(`https://api.polygon.io/v2/aggs/ticker/${encodeURIComponent(symbol)}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc&limit=5000&apiKey=${apiKey}`),
    ]);

    const detailsData = detailsRes.ok ? await detailsRes.json() : {};
    const prevData = prevRes.ok ? await prevRes.json() : {};
    const historyData = historyRes.ok ? await historyRes.json() : {};

    if (!detailsRes.ok) await detailsRes.text().catch(() => {});
    if (!prevRes.ok) await prevRes.text().catch(() => {});
    if (!historyRes.ok) await historyRes.text().catch(() => {});

    const d = detailsData?.results || {};
    const prevResults = prevData?.results;
    const bar = Array.isArray(prevResults) && prevResults.length > 0 ? prevResults[0] : {};
    const historyResults: PolygonBar[] = Array.isArray(historyData?.results) ? historyData.results : [];

    if (!d.name && !bar.c && historyResults.length === 0) {
      console.warn(`Polygon returned no data for ${symbol}`);
      return null;
    }

    const marketCap = safeNum(d.market_cap);
    const shares = safeNum(d.share_class_shares_outstanding) ?? safeNum(d.weighted_shares_outstanding);
    const securityType = d.type === 'ETF' ? 'etf' : 'stock';
    const volumes = historyResults.map(point => safeNum(point.v)).filter((value): value is number => value != null && value > 0);
    const highs = historyResults.map(point => safeNum(point.h)).filter((value): value is number => value != null && value > 0);
    const lows = historyResults.map(point => safeNum(point.l)).filter((value): value is number => value != null && value > 0);
    const avgVolume3M = volumes.length > 0
      ? Math.round(volumes.slice(-Math.min(volumes.length, 63)).reduce((sum, value) => sum + value, 0) / Math.min(volumes.length, 63))
      : null;
    const high52Week = highs.length > 0 ? Math.max(...highs) : null;
    const low52Week = lows.length > 0 ? Math.min(...lows) : null;

    const result: Fundamentals = {
      symbol,
      market_cap: marketCap ? Math.round(marketCap) : null,
      pe_ratio: null,
      eps: null,
      beta: null,
      dividend_yield: null,
      avg_volume_3m: avgVolume3M,
      high_52_week: high52Week,
      low_52_week: low52Week,
      revenue: null,
      ebitda: null,
      profit_margin: null,
      operating_margin: null,
      forward_pe: null,
      forward_eps: null,
      shares_outstanding: shares ? Math.round(shares) : null,
      float_shares: null,
      price_to_book: null,
      price_to_sales: null,
      ex_dividend_date: null,
      dividend_rate: null,
      target_est: null,
      previous_close: safeNum(bar.o),
      open_price: safeNum(bar.o),
      day_high: safeNum(bar.h),
      day_low: safeNum(bar.l),
      security_type: securityType,
    };

    console.log(`[Polygon ${symbol}] MC=${result.market_cap}, Type=${result.security_type}, PrevClose=${result.previous_close}`);
    return result;
  } catch (err) {
    console.error(`Polygon fetch failed for ${symbol}:`, err);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbol } = await req.json();

    if (!symbol || typeof symbol !== 'string') {
      return new Response(
        JSON.stringify({ error: 'symbol is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const polygonKey = Deno.env.get('POLYGON_API_KEY');
    if (!polygonKey) {
      return new Response(
        JSON.stringify({ error: 'POLYGON_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check cache — return if less than 6 hours old
    const { data: cached } = await supabase
      .from('stock_fundamentals')
      .select('*')
      .eq('symbol', symbol)
      .single();

    if (cached?.updated_at) {
      const age = Date.now() - new Date(cached.updated_at).getTime();
      const SIX_HOURS = 6 * 60 * 60 * 1000;
      if (age < SIX_HOURS) {
        console.log(`[Cache HIT] ${symbol} — age ${Math.round(age / 60000)}min`);
        return new Response(
          JSON.stringify({ fundamentals: cached, source: 'cache' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const fundamentals = await fetchFromPolygon(symbol, polygonKey);

    if (!fundamentals) {
      if (cached) {
        return new Response(
          JSON.stringify({ fundamentals: cached, source: 'stale_cache' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      return new Response(
        JSON.stringify({ fundamentals: null, source: 'unavailable', message: `No fundamentals data available for ${symbol}` }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Upsert into cache
    const { error: upsertError } = await supabase
      .from('stock_fundamentals')
      .upsert({
        symbol: fundamentals.symbol,
        market_cap: fundamentals.market_cap,
        pe_ratio: fundamentals.pe_ratio,
        eps: fundamentals.eps,
        beta: fundamentals.beta,
        dividend_yield: fundamentals.dividend_yield,
        avg_volume_3m: fundamentals.avg_volume_3m,
        high_52_week: fundamentals.high_52_week,
        low_52_week: fundamentals.low_52_week,
        revenue: fundamentals.revenue,
        ebitda: fundamentals.ebitda,
        profit_margin: fundamentals.profit_margin,
        operating_margin: fundamentals.operating_margin,
        forward_pe: fundamentals.forward_pe,
        forward_eps: fundamentals.forward_eps,
        shares_outstanding: fundamentals.shares_outstanding,
        float_shares: fundamentals.float_shares,
        price_to_book: fundamentals.price_to_book,
        price_to_sales: fundamentals.price_to_sales,
        ex_dividend_date: fundamentals.ex_dividend_date,
        dividend_rate: fundamentals.dividend_rate,
        target_est: fundamentals.target_est,
        previous_close: fundamentals.previous_close,
        open_price: fundamentals.open_price,
        day_high: fundamentals.day_high,
        day_low: fundamentals.day_low,
        security_type: fundamentals.security_type,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'symbol' });

    if (upsertError) {
      console.error(`Cache upsert error for ${symbol}:`, upsertError);
    }

    return new Response(
      JSON.stringify({ fundamentals, source: 'polygon' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in get-stock-fundamentals:', msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
