CREATE TABLE public.stock_stats (
  symbol TEXT PRIMARY KEY,
  market_cap BIGINT,
  volume BIGINT,
  pe_ratio NUMERIC,
  high_52_week NUMERIC,
  low_52_week NUMERIC,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.stock_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read stock stats"
  ON public.stock_stats
  FOR SELECT
  USING (true);