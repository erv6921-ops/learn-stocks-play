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

// Yahoo Finance fetch (free chart endpoint, no API key required)
async function yahooGet(url: string): Promise<any> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (!res.ok) {
      console.error(`[Yahoo] ${res.status} for ${url.split("?")[0]}`);
      return null;
    }
    return res.json();
  } catch (err) {
    console.error(`[Yahoo] fetch error:`, err);
    return null;
  }
}

function yahooChartUrl(symbol: string, interval: string, range: string) {
  return `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;
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

// Map app ranges to Yahoo interval/range params.
function getAggParams(range: string) {
  switch (range) {
    case "1d":
      // "Recent" — last month daily (free tier has no intraday)
      return { interval: "1d", range: "1mo" };
    case "5d":
      return { interval: "1d", range: "5d" };
    case "1m":
      return { interval: "1d", range: "1mo" };
    case "6m":
      return { interval: "1d", range: "6mo" };
    case "1y":
      return { interval: "1wk", range: "1y" };
    case "5y":
      return { interval: "1mo", range: "5y" };
    default:
      return { interval: "1d", range: "1mo" };
  }
}

function buildPoints(result: any): HistoricalPoint[] {
  const timestamps: unknown[] = result?.timestamp ?? [];
  const closes: unknown[] = result?.indicators?.quote?.[0]?.close ?? [];

  const historicalData: HistoricalPoint[] = [];
  for (let i = 0; i < timestamps.length; i++) {
    const price = safeNum(closes[i]);
    const tsSec = safeNum(timestamps[i]);
    if (price == null || tsSec == null) continue;
    const d = new Date(tsSec * 1000);
    historicalData.push({
      timestamp: Math.floor(tsSec),
      date: d.toISOString().split("T")[0],
      price,
    });
  }
  return historicalData;
}

async function fetchCandles(symbol: string, range: string) {
  const params = getAggParams(range);
  const data = await yahooGet(yahooChartUrl(symbol, params.interval, params.range));
  const result = data?.chart?.result?.[0];

  const historicalData = buildPoints(result);
  if (historicalData.length === 0) {
    console.warn(`[Candles] No data for ${symbol} range=${range}`);
    return null;
  }
  return { historicalData, interval: params.interval, range };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { symbols, includeHistory = false, historyRange = "1m", chartOnly = false, searchQuery } = body;

    // Search branch: proxy the Yahoo Finance search endpoint server-side
    // (avoids browser CORS) so users can look up by company name or ticker.
    // Returns Yahoo's `quotes` shape unchanged so the client can map it the
    // same way whether it called Yahoo directly or via this proxy.
    if (typeof searchQuery === "string" && searchQuery.trim()) {
      const q = searchQuery.trim();
      const searchUrl = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=6&newsCount=0`;
      const data = await yahooGet(searchUrl);
      const quotes = Array.isArray(data?.quotes) ? data.quotes : [];
      return new Response(JSON.stringify({ quotes }), {
        headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
      });
    }

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
        // Current price comes from the most recent close in a 5d/1d chart.
        const quoteJson = await yahooGet(yahooChartUrl(sym, "1d", "5d"));
        const result = quoteJson?.chart?.result?.[0];
        const meta = result?.meta ?? {};
        const q = result?.indicators?.quote?.[0] ?? {};
        const timestamps: unknown[] = result?.timestamp ?? [];

        // Find the most recent bar with a valid close.
        let li = -1;
        for (let i = timestamps.length - 1; i >= 0; i--) {
          if (safeNum(q.close?.[i]) != null) { li = i; break; }
        }

        if (li !== -1) {
          const closePrice = safeNum(q.close?.[li]) ?? 0;
          const tSec = safeNum(timestamps[li]) ?? Math.floor(Date.now() / 1000);

          // Previous close: the prior valid bar, falling back to chart meta.
          let prevClose: number | null = null;
          for (let i = li - 1; i >= 0; i--) {
            const c = safeNum(q.close?.[i]);
            if (c != null) { prevClose = c; break; }
          }
          if (prevClose == null) prevClose = safeNum(meta.chartPreviousClose) ?? safeNum(meta.previousClose);

          const openPrice = safeNum(q.open?.[li]) ?? 0;
          const change = prevClose != null ? closePrice - prevClose : 0;
          const changePercent = prevClose != null && prevClose > 0 ? (change / prevClose) * 100 : 0;

          quoteData = {
            symbol: sym,
            requestedSymbol: sym,
            returnedSymbol: sym,
            quoteType: null,
            currency: meta.currency ?? "USD",
            marketState: sessionMap[marketStatus.session] ?? "CLOSED",
            session: marketStatus.session,
            regularMarketTime: tSec,
            quoteTimestamp: tSec,
            price: closePrice,
            change,
            changePercent,
            volume: safeNum(q.volume?.[li]) ?? 0,
            marketCap: null,
            high52Week: safeNum(meta.fiftyTwoWeekHigh),
            low52Week: safeNum(meta.fiftyTwoWeekLow),
            timestamp: tSec,
            provider: "yahoo-finance",
            open: openPrice,
            dayHigh: safeNum(q.high?.[li]) ?? 0,
            dayLow: safeNum(q.low?.[li]) ?? 0,
            previousClose: prevClose,
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
        const candle = await fetchCandles(sym, resolvedRange);
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
              provider: "yahoo-finance",
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
