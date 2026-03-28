-- Insert major index symbols
INSERT INTO public.symbols (symbol, name, exchange, type, currency, active)
VALUES
  ('^GSPC', 'S&P 500', 'INDEX', 'index', 'USD', true),
  ('^DJI', 'Dow Jones Industrial Average', 'INDEX', 'index', 'USD', true),
  ('^IXIC', 'Nasdaq Composite', 'INDEX', 'index', 'USD', true),
  ('^RUT', 'Russell 2000', 'INDEX', 'index', 'USD', true)
ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  exchange = EXCLUDED.exchange,
  type = EXCLUDED.type,
  currency = EXCLUDED.currency,
  active = EXCLUDED.active;