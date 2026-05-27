ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS literacy_level TEXT,
  ADD COLUMN IF NOT EXISTS assessment_score INTEGER,
  ADD COLUMN IF NOT EXISTS reward_multiplier NUMERIC,
  ADD COLUMN IF NOT EXISTS benchmark_scores JSONB,
  ADD COLUMN IF NOT EXISTS benchmark_category_scores JSONB,
  ADD COLUMN IF NOT EXISTS state_course TEXT,
  ADD COLUMN IF NOT EXISTS class_code TEXT;