-- Teachers can tune how much writing the micro-business activities demand.
-- writing_scale multiplies every word minimum: 0.5 = Light, 1.0 = Standard,
-- 1.5 = Extended. Students inherit the most lenient scale among their classes.
ALTER TABLE public.classes
  ADD COLUMN IF NOT EXISTS writing_scale numeric NOT NULL DEFAULT 1.0
  CHECK (writing_scale >= 0.25 AND writing_scale <= 2.0);
