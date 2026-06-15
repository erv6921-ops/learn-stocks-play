-- Restructured Micro-Business "Studio" stores all written student activity
-- responses (Product Development, Collaboration, Marketing) under the student's
-- existing business record. A separate JSONB column keeps it isolated from the
-- Office game state so the two save paths never clobber each other.
ALTER TABLE public.business_game_state
  ADD COLUMN IF NOT EXISTS activities jsonb NOT NULL DEFAULT '{}'::jsonb;
