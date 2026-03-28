
-- Benchmark attempts table
CREATE TABLE public.benchmark_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  overall_score numeric,
  total_questions integer,
  correct_count integer,
  skipped boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.benchmark_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attempts"
  ON public.benchmark_attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts"
  ON public.benchmark_attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own attempts"
  ON public.benchmark_attempts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Benchmark results (per-category scores)
CREATE TABLE public.benchmark_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES public.benchmark_attempts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  reward_multiplier numeric NOT NULL DEFAULT 1.0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.benchmark_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own results"
  ON public.benchmark_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own results"
  ON public.benchmark_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
