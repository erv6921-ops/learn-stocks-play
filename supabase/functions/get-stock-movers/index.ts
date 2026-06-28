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

// Yahoo's predefined screeners give the real market-wide movers (not just a
// hand-picked list). Fetch the day's biggest gainers, losers and most-actives.
async function fetchScreener(scrId: string, count: number) {
  const url = `https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved?scrIds=${scrId}&count=${count}&lang=en-US&region=US`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (!res.ok) {
      console.error(`[movers] ${res.status} for ${scrId}`);
      return [];
    }
    const data = await res.json();
    const quotes = data?.finance?.result?.[0]?.quotes ?? [];
    return quotes
      .map((q: any) => ({
        symbol: String(q.symbol ?? "").toUpperCase(),
        name: q.shortName ?? q.longName ?? q.symbol ?? "",
        price: safeNum(q.regularMarketPrice),
        change: safeNum(q.regularMarketChange),
        changePercent: safeNum(q.regularMarketChangePercent),
      }))
      .filter((q: any) => q.symbol && q.price != null && q.changePercent != null);
  } catch (err) {
    console.error(`[movers] fetch error for ${scrId}:`, err);
    return [];
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    let count = 8;
    try {
      const body = await req.json();
      if (body?.count) count = Math.max(1, Math.min(25, Number(body.count) || 8));
    } catch { /* no body — use default */ }

    const [gainers, losers, mostActives] = await Promise.all([
      fetchScreener("day_gainers", count),
      fetchScreener("day_losers", count),
      fetchScreener("most_actives", count),
    ]);

    return new Response(JSON.stringify({ gainers, losers, mostActives }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[get-stock-movers] Error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
