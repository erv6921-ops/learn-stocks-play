
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE public.symbols (
  symbol TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  exchange TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'stock',
  currency TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_symbols_name_trgm ON public.symbols USING gin (name gin_trgm_ops);
CREATE INDEX idx_symbols_symbol_trgm ON public.symbols USING gin (symbol gin_trgm_ops);
CREATE INDEX idx_symbols_exchange ON public.symbols (exchange);
CREATE INDEX idx_symbols_type ON public.symbols (type);
CREATE INDEX idx_symbols_active ON public.symbols (active);

ALTER TABLE public.symbols ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read symbols"
  ON public.symbols
  FOR SELECT
  USING (true);
