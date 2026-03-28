import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  peRatio: number;
  high52Week: number;
  low52Week: number;
}

async function fetchFromPolygonPrev(symbols: string[], apiKey: string): Promise<StockData[]> {
  const stocks: StockData[] = [];

  for (const symbol of symbols) {
    try {
      const url = `https://api.polygon.io/v2/aggs/ticker/${encodeURIComponent(symbol)}/prev?adjusted=true&apiKey=${apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`Polygon prev error for ${symbol}: ${response.status}`);
        continue;
      }

      const data = await response.json();
      const results = data?.results;
      if (!results || !Array.isArray(results) || results.length === 0) continue;

      const bar = results[0];
      const closePrice = bar.c || 0;
      const openPrice = bar.o || 0;
      const change = closePrice - openPrice;
      const changePercent = openPrice > 0 ? (change / openPrice) * 100 : 0;

      if (closePrice > 0) {
        stocks.push({
          symbol,
          name: symbol,
          price: closePrice,
          change,
          changePercent,
          volume: bar.v || 0,
          marketCap: 0,
          peRatio: 0,
          high52Week: 0,
          low52Week: 0,
        });
      }
    } catch (err) {
      console.error(`Error fetching ${symbol} from Polygon prev:`, err);
    }
  }

  return stocks;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbols } = await req.json();

    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Symbols array is required' }),
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

    console.log(`Fetching stock data for ${symbols.length} symbols via Polygon /prev`);
    const stocks = await fetchFromPolygonPrev(symbols, polygonKey);
    console.log(`Successfully fetched ${stocks.length}/${symbols.length} stocks`);

    return new Response(
      JSON.stringify({ stocks }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching stock data:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
