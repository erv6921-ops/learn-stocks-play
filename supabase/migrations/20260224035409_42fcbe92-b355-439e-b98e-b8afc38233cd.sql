
CREATE TABLE IF NOT EXISTS public.stock_fundamentals (
  symbol TEXT PRIMARY KEY,
  market_cap BIGINT,
  pe_ratio NUMERIC,
  eps NUMERIC,
  beta NUMERIC,
  dividend_yield NUMERIC,
  avg_volume_3m BIGINT,
  high_52_week NUMERIC,
  low_52_week NUMERIC,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.stock_fundamentals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read stock fundamentals"
  ON public.stock_fundamentals
  FOR SELECT
  USING (true);
