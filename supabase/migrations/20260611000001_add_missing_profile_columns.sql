-- Add profile columns that the app writes but that are missing from the
-- deployed schema. Onboarding upserts all of these in a single payload via
-- persistProfile(), so a single missing column makes the whole upsert fail —
-- which blocks every first-time user from completing onboarding.
--
-- Columns (all already present in the generated TS types):
--   state_course   - student's state/course selection (Onboarding)
--   class_code     - join code entered during onboarding
--   literacy_level - mastery tier (e.g. "explorer"), read back on hydrate
--   jeffs_balance  - InvestiCoins running balance written by persistBalance
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS state_course   text,
  ADD COLUMN IF NOT EXISTS class_code     text,
  ADD COLUMN IF NOT EXISTS literacy_level text,
  ADD COLUMN IF NOT EXISTS jeffs_balance  numeric NOT NULL DEFAULT 0;
