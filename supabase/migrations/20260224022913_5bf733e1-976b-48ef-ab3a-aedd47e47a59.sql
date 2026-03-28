
-- Index for fast symbol prefix/contains search
CREATE INDEX IF NOT EXISTS idx_symbols_symbol_trgm ON public.symbols USING gin (symbol gin_trgm_ops);
-- Index for fast name contains search
CREATE INDEX IF NOT EXISTS idx_symbols_name_trgm ON public.symbols USING gin (name gin_trgm_ops);
-- B-tree index for exact symbol lookups and ordering
CREATE INDEX IF NOT EXISTS idx_symbols_symbol_btree ON public.symbols (symbol);
-- Index for type + active filtering
CREATE INDEX IF NOT EXISTS idx_symbols_type_active ON public.symbols (type, active);
-- Index for exchange filtering
CREATE INDEX IF NOT EXISTS idx_symbols_exchange ON public.symbols (exchange);
