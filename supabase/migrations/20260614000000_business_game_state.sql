-- Persistent Micro-Business "Pro" game state: P&L data, business credit score,
-- employees, in-game week number, complaint history, star rating, tax filings, etc.
-- One row per user; the full state is a single JSONB document for flexibility.
CREATE TABLE IF NOT EXISTS public.business_game_state (
  user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  state      jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.business_game_state ENABLE ROW LEVEL SECURITY;

-- Owner-only access (students can read/write only their own business state).
CREATE POLICY "own business_game_state select"
  ON public.business_game_state FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own business_game_state insert"
  ON public.business_game_state FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own business_game_state update"
  ON public.business_game_state FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own business_game_state delete"
  ON public.business_game_state FOR DELETE USING (auth.uid() = user_id);
