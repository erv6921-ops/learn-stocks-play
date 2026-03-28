import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface StockStats {
  symbol: string;
  market_cap: number | null;
  volume: number | null;
  pe_ratio: number | null;
  high_52_week: number | null;
  low_52_week: number | null;
}

async function fetchSingleStats(symbol: string, apiKey: string): Promise<StockStats | null> {
  try {
    // Use free-tier /prev endpoint
    const url = `https://api.polygon.io/v2/aggs/ticker/${encodeURIComponent(symbol)}/prev?adjusted=true&apiKey=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Polygon prev error for ${symbol}: ${res.status}`);
      await res.text();
      return null;
    }

    const data = await res.json();
    const results = data?.results;
    if (!results || !Array.isArray(results) || results.length === 0) return null;

    const bar = results[0];
    return {
      symbol,
      market_cap: null,
      volume: bar.v ? Math.round(bar.v) : null,
      pe_ratio: null,
      high_52_week: null,
      low_52_week: null,
    };
  } catch (err) {
    console.error(`Stats fetch error for ${symbol}:`, err);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const requestedSymbols: string[] | undefined = body.symbols;
    const singleSymbol: string | undefined = body.symbol;

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const polygonKey = Deno.env.get('POLYGON_API_KEY');
    if (!polygonKey) {
      return new Response(
        JSON.stringify({ error: 'POLYGON_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (singleSymbol) {
      const { data: existing } = await supabase
        .from('stock_stats')
        .select('updated_at')
        .eq('symbol', singleSymbol)
        .single();

      if (existing?.updated_at) {
        const elapsed = Date.now() - new Date(existing.updated_at).getTime();
        if (elapsed < 60000) {
          return new Response(
            JSON.stringify({ message: 'Rate limited', rateLimited: true }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      console.log(`On-demand refresh for ${singleSymbol}`);
      const stat = await fetchSingleStats(singleSymbol, polygonKey);

      if (stat) {
        await supabase.from('stock_stats').upsert({
          ...stat,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'symbol' });

        return new Response(
          JSON.stringify({ stats: stat, source: 'polygon' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: `Could not fetch stats for ${singleSymbol}` }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const symbols = requestedSymbols || [];
    if (symbols.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Provide symbols array or single symbol' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Bulk refresh for ${symbols.length} symbols`);

    const results: StockStats[] = [];
    const concurrency = 5;

    for (let i = 0; i < symbols.length; i += concurrency) {
      const batch = symbols.slice(i, i + concurrency);
      const batchResults = await Promise.all(batch.map(s => fetchSingleStats(s, polygonKey)));
      for (const r of batchResults) {
        if (r) results.push(r);
      }
      if (i + concurrency < symbols.length) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    if (results.length > 0) {
      const rows = results.map(s => ({ ...s, updated_at: new Date().toISOString() }));
      for (let i = 0; i < rows.length; i += 50) {
        const batch = rows.slice(i, i + 50);
        const { error } = await supabase.from('stock_stats').upsert(batch, { onConflict: 'symbol' });
        if (error) console.error(`Upsert error:`, error);
      }
    }

    console.log(`Stored ${results.length}/${symbols.length} stats`);

    return new Response(
      JSON.stringify({ updated: results.length, total: symbols.length, source: 'polygon' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
