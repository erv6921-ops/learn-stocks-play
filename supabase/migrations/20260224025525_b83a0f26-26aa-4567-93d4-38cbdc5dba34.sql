
-- Create search_symbols RPC with ranked results
CREATE OR REPLACE FUNCTION public.search_symbols(
  query_text TEXT,
  filter_type TEXT DEFAULT NULL,
  filter_exchange TEXT DEFAULT NULL,
  result_limit INT DEFAULT 40,
  result_offset INT DEFAULT 0
)
RETURNS TABLE (
  symbol TEXT,
  name TEXT,
  exchange TEXT,
  type TEXT,
  currency TEXT,
  active BOOLEAN,
  match_priority INT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT
    s.symbol,
    s.name,
    s.exchange,
    s.type,
    s.currency,
    s.active,
    CASE
      WHEN UPPER(s.symbol) = UPPER(query_text) THEN 1
      WHEN UPPER(s.symbol) LIKE UPPER(query_text) || '%' THEN 2
      WHEN UPPER(s.symbol) LIKE '%' || UPPER(query_text) || '%' THEN 3
      WHEN UPPER(s.name) LIKE '%' || UPPER(query_text) || '%' THEN 4
      ELSE 5
    END AS match_priority
  FROM symbols s
  WHERE
    s.active = true
    AND (
      s.symbol ILIKE query_text || '%'
      OR s.symbol ILIKE '%' || query_text || '%'
      OR s.name ILIKE '%' || query_text || '%'
    )
    AND (filter_type IS NULL OR filter_type = 'all' OR s.type = filter_type)
    AND (filter_exchange IS NULL OR filter_exchange = 'all' OR s.exchange = filter_exchange)
  ORDER BY match_priority ASC, s.symbol ASC
  LIMIT result_limit
  OFFSET result_offset;
$$;

-- Add indexes for fast search
CREATE INDEX IF NOT EXISTS idx_symbols_symbol_upper ON public.symbols (UPPER(symbol));
CREATE INDEX IF NOT EXISTS idx_symbols_name_trgm ON public.symbols USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_symbols_symbol ON public.symbols (symbol);
