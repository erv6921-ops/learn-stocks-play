
-- Add InvestiCoins balance to profile
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS jeffs_balance INTEGER NOT NULL DEFAULT 0;

-- Lesson progress
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  quiz_score INTEGER,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_progress TO authenticated;
GRANT ALL ON public.lesson_progress TO service_role;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lp_select_own" ON public.lesson_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "lp_insert_own" ON public.lesson_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "lp_update_own" ON public.lesson_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "lp_delete_own" ON public.lesson_progress FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER lesson_progress_updated_at BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Unit test progress
CREATE TABLE IF NOT EXISTS public.unit_test_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  score INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, category)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.unit_test_progress TO authenticated;
GRANT ALL ON public.unit_test_progress TO service_role;
ALTER TABLE public.unit_test_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "utp_select_own" ON public.unit_test_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "utp_insert_own" ON public.unit_test_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "utp_update_own" ON public.unit_test_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "utp_delete_own" ON public.unit_test_progress FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER unit_test_progress_updated_at BEFORE UPDATE ON public.unit_test_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- InvestiCoins history
CREATE TABLE IF NOT EXISTS public.jeffs_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS jeffs_history_user_idx ON public.jeffs_history(user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.jeffs_history TO authenticated;
GRANT ALL ON public.jeffs_history TO service_role;
ALTER TABLE public.jeffs_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "jh_select_own" ON public.jeffs_history FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "jh_insert_own" ON public.jeffs_history FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "jh_delete_own" ON public.jeffs_history FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Portfolio
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  shares NUMERIC NOT NULL,
  purchase_price NUMERIC NOT NULL,
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, symbol)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio TO authenticated;
GRANT ALL ON public.portfolio TO service_role;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pf_select_own" ON public.portfolio FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "pf_insert_own" ON public.portfolio FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "pf_update_own" ON public.portfolio FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "pf_delete_own" ON public.portfolio FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER portfolio_updated_at BEFORE UPDATE ON public.portfolio
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Watchlist
CREATE TABLE IF NOT EXISTS public.watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, symbol)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.watchlist TO authenticated;
GRANT ALL ON public.watchlist TO service_role;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "wl_select_own" ON public.watchlist FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "wl_insert_own" ON public.watchlist FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wl_delete_own" ON public.watchlist FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- User-created tokens
CREATE TABLE IF NOT EXISTS public.user_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  total_supply NUMERIC NOT NULL,
  price_simulation NUMERIC NOT NULL,
  market_cap NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_tokens TO authenticated;
GRANT ALL ON public.user_tokens TO service_role;
ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ut_select_own" ON public.user_tokens FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "ut_insert_own" ON public.user_tokens FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "ut_update_own" ON public.user_tokens FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "ut_delete_own" ON public.user_tokens FOR DELETE TO authenticated USING (auth.uid() = user_id);
