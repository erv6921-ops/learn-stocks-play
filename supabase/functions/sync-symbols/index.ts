import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface TwelveDataSymbol {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  mic_code: string;
  country: string;
  type: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const stockApiKey = Deno.env.get('STOCK_API_KEY');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (!stockApiKey) {
      return new Response(
        JSON.stringify({ error: 'STOCK_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Starting symbol universe sync from Twelve Data...');

    // Fetch US stocks
    const stocksUrl = `https://api.twelvedata.com/stocks?country=United States&apikey=${stockApiKey}`;
    const stocksRes = await fetch(stocksUrl);
    if (!stocksRes.ok) {
      throw new Error(`Twelve Data stocks endpoint failed: ${stocksRes.status}`);
    }
    const stocksData = await stocksRes.json();
    const stocksList: TwelveDataSymbol[] = stocksData?.data || [];
    console.log(`Fetched ${stocksList.length} US stocks from Twelve Data`);

    // Fetch US ETFs
    const etfsUrl = `https://api.twelvedata.com/etf?country=United States&apikey=${stockApiKey}`;
    const etfsRes = await fetch(etfsUrl);
    if (!etfsRes.ok) {
      throw new Error(`Twelve Data ETFs endpoint failed: ${etfsRes.status}`);
    }
    const etfsData = await etfsRes.json();
    const etfsList: TwelveDataSymbol[] = etfsData?.data || [];
    console.log(`Fetched ${etfsList.length} US ETFs from Twelve Data`);

    // Combine and deduplicate by symbol
    const allSymbols = new Map<string, {
      symbol: string;
      name: string;
      exchange: string;
      type: string;
      currency: string;
      active: boolean;
      updated_at: string;
    }>();

    const now = new Date().toISOString();

    for (const s of stocksList) {
      if (!s.symbol || !s.name) continue;
      // Skip symbols with special characters (warrants, units, etc.)
      if (s.symbol.includes('/') || s.symbol.includes('+') || s.symbol.length > 10) continue;
      allSymbols.set(s.symbol, {
        symbol: s.symbol,
        name: s.name,
        exchange: s.exchange || s.mic_code || '',
        type: 'stock',
        currency: s.currency || 'USD',
        active: true,
        updated_at: now,
      });
    }

    for (const s of etfsList) {
      if (!s.symbol || !s.name) continue;
      if (s.symbol.includes('/') || s.symbol.includes('+') || s.symbol.length > 10) continue;
      // Don't overwrite if already present as stock
      if (!allSymbols.has(s.symbol)) {
        allSymbols.set(s.symbol, {
          symbol: s.symbol,
          name: s.name,
          exchange: s.exchange || s.mic_code || '',
          type: 'etf',
          currency: s.currency || 'USD',
          active: true,
          updated_at: now,
        });
      }
    }

    const rows = Array.from(allSymbols.values());
    console.log(`Total unique symbols to upsert: ${rows.length}`);

    // Upsert in batches of 500
    let upserted = 0;
    const batchSize = 500;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const { error } = await supabase
        .from('symbols')
        .upsert(batch, { onConflict: 'symbol' });

      if (error) {
        console.error(`Upsert error at batch ${i / batchSize}:`, error);
      } else {
        upserted += batch.length;
      }
    }

    console.log(`Symbol sync complete: ${upserted}/${rows.length} upserted`);

    return new Response(
      JSON.stringify({
        provider: 'twelvedata',
        stocks: stocksList.length,
        etfs: etfsList.length,
        totalUnique: rows.length,
        upserted,
        syncedAt: now,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Sync error:', msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
