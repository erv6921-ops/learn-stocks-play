import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function safeNum(val: unknown): number | null {
  if (val == null || val === "Infinity" || val === "NaN") return null;
  const n = Number(val);
  return Number.isFinite(n) ? n : null;
}

// Polygon fetch with retry for 429 rate limiting
async function polygonGet(url: string, maxRetries = 3): Promise<any> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        if (attempt < maxRetries) {
          const waitMs = 13000 * (attempt + 1); // 13s, 26s, 39s
          console.warn(`[Polygon] 429 rate limited, retry ${attempt + 1}/${maxRetries} in ${waitMs}ms`);
          await new Promise(r => setTimeout(r, waitMs));
          continue;
        }
        console.error(`[Polygon] 429 after ${maxRetries} retries for ${url.split("?")[0]}`);
        return null;
      }
      if (!res.ok) {
        console.error(`[Polygon] ${res.status} for ${url.split("?")[0]}`);
        return null;
      }
      return res.json();
    } catch (err) {
      console.error(`[Polygon] fetch error:`, err);
      return null;
    }
  }
  return null;
}

function computeSessionFromTime() {
  const nowET = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const h = nowET.getHours();
  const m = nowET.getMinutes();
  const mins = h * 60 + m;
  const day = nowET.getDay();

  if (day === 0 || day === 6) return { session: "closed" as const, label: "Market Closed", isOpen: false };
  if (mins >= 570 && mins < 960) return { session: "regular" as const, label: "Market Open", isOpen: true };
  if (mins >= 240 && mins < 570) return { session: "pre" as const, label: "Pre-Market", isOpen: false };
  if (mins >= 960 && mins < 1200) return { session: "post" as const, label: "After Hours", isOpen: false };
  return { session: "closed" as const, label: "Market Closed", isOpen: false };
}

interface HistoricalPoint {
  date: string;
  timestamp: number;
  price: number;
}

function formatDateYMD(d: Date): string {
  return d.toISOString().split("T")[0];
}

function getAggParams(range: string) {
  const now = new Date();
  const to = formatDateYMD(now);

  switch (range) {
    case "1d": {
      // "Recent" — last 30 days daily (free tier has no intraday)
      const from = new Date(now);
      from.setDate(from.getDate() - 30);
      return { multiplier: 1, timespan: "day", from: formatDateYMD(from), to };
    }
    case "5d": {
      const from = new Date(now);
      from.setDate(from.getDate() - 10);
      return { multiplier: 1, timespan: "day", from: formatDateYMD(from), to };
    }
    case "1m": {
      const from = new Date(now);
      from.setDate(from.getDate() - 30);
      return { multiplier: 1, timespan: "day", from: formatDateYMD(from), to };
    }
    case "6m": {
      const from = new Date(now);
      from.setDate(from.getDate() - 190);
      return { multiplier: 1, timespan: "day", from: formatDateYMD(from), to };
    }
    case "1y": {
      const from = new Date(now);
      from.setFullYear(from.getFullYear() - 1);
      return { multiplier: 1, timespan: "week", from: formatDateYMD(from), to };
    }
    case "5y": {
      const from = new Date(now);
      from.setFullYear(from.getFullYear() - 5);
      return { multiplier: 1, timespan: "month", from: formatDateYMD(from), to };
    }
    default: {
      const from = new Date(now);
      from.setDate(from.getDate() - 30);
      return { multiplier: 1, timespan: "day", from: formatDateYMD(from), to };
    }
  }
}

async function fetchCandles(symbol: string, range: string, apiKey: string) {
  const params = getAggParams(range);
  const url = `https://api.polygon.io/v2/aggs/ticker/${encodeURIComponent(symbol)}/range/${params.multiplier}/${params.timespan}/${params.from}/${params.to}?adjusted=true&sort=asc&limit=5000&apiKey=${apiKey}`;
  const data = await polygonGet(url);

  if (!data?.results?.length) {
    console.warn(`[Candles] No data for ${symbol} range=${range}`);
    return null;
  }

  const historicalData: HistoricalPoint[] = [];
  for (const bar of data.results) {
    const price = safeNum(bar.c);
    const tsMs = safeNum(bar.t);
    if (price == null || tsMs == null) continue;
    const tsSec = Math.floor(tsMs / 1000);
    const d = new Date(tsMs);
    historicalData.push({
      timestamp: tsSec,
      date: d.toISOString().split("T")[0],
      price,
    });
  }

  if (historicalData.length === 0) return null;
  return { historicalData, interval: `${params.multiplier}${params.timespan}`, range };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const POLYGON_API_KEY = Deno.env.get("POLYGON_API_KEY");
    if (!POLYGON_API_KEY) {
      return new Response(
        JSON.stringify({ error: "POLYGON_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();
    const { symbols, includeHistory = false, historyRange = "1m", chartOnly = false } = body;

    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return new Response(
        JSON.stringify({ error: "symbols array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const requestedSymbols = [...new Set(symbols.map((s: string) => String(s).trim().toUpperCase()))];
    const resolvedRange = String(historyRange || "1m").toLowerCase();
    const marketStatus = computeSessionFromTime();

    console.log(`[get-stock-quote] symbols=${requestedSymbols.join(",")} history=${includeHistory} range=${resolvedRange} chartOnly=${chartOnly}`);

    const sessionMap: Record<string, string> = { pre: "PRE", regular: "REGULAR", post: "POST", closed: "CLOSED" };
    const results: any[] = [];

    for (const sym of requestedSymbols) {
      let quoteData: any = null;

      // Fetch quote unless chartOnly mode
      if (!chartOnly) {
        const prevUrl = `https://api.polygon.io/v2/aggs/ticker/${encodeURIComponent(sym)}/prev?adjusted=true&apiKey=${POLYGON_API_KEY}`;
        const prevData = await polygonGet(prevUrl);

        if (prevData?.results?.length) {
          const bar = prevData.results[0];
          const closePrice = safeNum(bar.c) ?? 0;
          const openPrice = safeNum(bar.o) ?? 0;
          const tMs = safeNum(bar.t) ?? Date.now();
          const tSec = Math.floor(tMs / 1000);

          quoteData = {
            symbol: sym,
            requestedSymbol: sym,
            returnedSymbol: sym,
            quoteType: null,
            currency: "USD",
            marketState: sessionMap[marketStatus.session] ?? "CLOSED",
            session: marketStatus.session,
            regularMarketTime: tSec,
            quoteTimestamp: tSec,
            price: closePrice,
            change: closePrice - openPrice,
            changePercent: openPrice > 0 ? ((closePrice - openPrice) / openPrice) * 100 : 0,
            volume: safeNum(bar.v) ?? 0,
            marketCap: null,
            high52Week: null,
            low52Week: null,
            timestamp: tSec,
            provider: "polygon-prev",
            open: openPrice,
            dayHigh: safeNum(bar.h) ?? 0,
            dayLow: safeNum(bar.l) ?? 0,
            previousClose: openPrice,
            dividendYield: null,
            eps: null,
            beta: null,
            peRatio: null,
            avgVolume3M: null,
            symbolValidation: { requestedSymbol: sym, isValid: true },
          };
        }
      }

      // Fetch chart data if requested
      if (includeHistory || chartOnly) {
        const candle = await fetchCandles(sym, resolvedRange, POLYGON_API_KEY);
        if (candle) {
          if (quoteData) {
            quoteData.historicalData = candle.historicalData;
            quoteData.historyInterval = candle.interval;
            quoteData.historyRange = candle.range;
          } else {
            // chartOnly mode or quote failed — create minimal response with chart data
            const latest = candle.historicalData[candle.historicalData.length - 1];
            quoteData = {
              symbol: sym,
              requestedSymbol: sym,
              returnedSymbol: sym,
              quoteType: null,
              currency: "USD",
              marketState: sessionMap[marketStatus.session] ?? "CLOSED",
              session: marketStatus.session,
              regularMarketTime: latest.timestamp,
              quoteTimestamp: latest.timestamp,
              price: latest.price,
              change: null,
              changePercent: null,
              volume: null,
              marketCap: null,
              high52Week: null,
              low52Week: null,
              timestamp: latest.timestamp,
              provider: "polygon-prev",
              open: null,
              dayHigh: null,
              dayLow: null,
              previousClose: null,
              dividendYield: null,
              eps: null,
              beta: null,
              peRatio: null,
              avgVolume3M: null,
              symbolValidation: { requestedSymbol: sym, isValid: true },
              historicalData: candle.historicalData,
              historyInterval: candle.interval,
              historyRange: candle.range,
            };
          }
        }
      }

      if (quoteData) results.push(quoteData);
    }

    console.log(`[get-stock-quote] Returning ${results.length}/${requestedSymbols.length} quotes`);

    return new Response(JSON.stringify({ stocks: results, marketStatus }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[get-stock-quote] Error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
