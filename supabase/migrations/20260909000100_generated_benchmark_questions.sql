-- OUTPUT ONLY — do NOT auto-run. Paste into the Supabase SQL Editor manually.
--
-- DB-backed home for the generated benchmark bank + its human review decisions.
-- Column conventions deliberately mirror the existing `generated_questions`
-- table used by the generate-questions edge function (question_text, options,
-- correct_answer, explanation, numeric difficulty in 0..1, and a `status` of
-- 'pending'), with `domain` + `standard` added because these are benchmark
-- items rather than upload/concept-scoped items.
--
-- The shipping code path keeps the generated bank in a static file
-- (src/data/benchmarkBankGenerated.ts) and stores approve/reject decisions in
-- localStorage (src/lib/benchmarkReview.ts), so the review queue at
-- /admin/curriculum-review works WITHOUT this table. Create this (and repoint
-- the client) when the queue should live in Postgres. NOTHING auto-publishes an
-- approved item into the live benchmark — that stays a deliberate manual step.

-- 1. The generated items themselves ---------------------------------------
CREATE TABLE IF NOT EXISTS public.generated_benchmark_questions (
  id            uuid        NOT NULL DEFAULT gen_random_uuid(),
  slug          text        NOT NULL UNIQUE,        -- stable id e.g. "gb-tax-3"
  domain        text        NOT NULL,               -- earning-income | taxes | budgeting | ...
  standard      text        NOT NULL,               -- SS.912.FL strand, e.g. "SS.912.FL.3.2"
  question_text text        NOT NULL,
  options       jsonb       NOT NULL,               -- array of 4 full-text options
  correct_answer text       NOT NULL,               -- full text of the correct option
  explanation   text        NOT NULL DEFAULT '',
  difficulty    numeric     NOT NULL DEFAULT 0.5,   -- 0..1 (easy .25 / med .5 / hard .75)
  status        text        NOT NULL DEFAULT 'pending', -- pending | approved | rejected
  created_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS gbq_status_idx ON public.generated_benchmark_questions (status);
CREATE INDEX IF NOT EXISTS gbq_domain_idx ON public.generated_benchmark_questions (domain);

ALTER TABLE public.generated_benchmark_questions ENABLE ROW LEVEL SECURITY;

-- Any authenticated reviewer may read the queue (no student PII in it).
DROP POLICY IF EXISTS "gbq_select_auth" ON public.generated_benchmark_questions;
CREATE POLICY "gbq_select_auth" ON public.generated_benchmark_questions
  FOR SELECT TO authenticated USING (true);

-- Only teachers/admins may change status (adjust to your role model as needed).
DROP POLICY IF EXISTS "gbq_update_teacher" ON public.generated_benchmark_questions;
CREATE POLICY "gbq_update_teacher" ON public.generated_benchmark_questions
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'teacher'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'teacher'));

-- 2. The review decisions (audit trail) -----------------------------------
CREATE TABLE IF NOT EXISTS public.question_approvals (
  id          uuid        NOT NULL DEFAULT gen_random_uuid(),
  question_id uuid        NOT NULL REFERENCES public.generated_benchmark_questions(id) ON DELETE CASCADE,
  reviewer_id uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  decision    text        NOT NULL,                 -- approved | rejected
  note        text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS qa_question_idx ON public.question_approvals (question_id);

ALTER TABLE public.question_approvals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "qa_select_auth" ON public.question_approvals;
CREATE POLICY "qa_select_auth" ON public.question_approvals
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "qa_insert_teacher" ON public.question_approvals;
CREATE POLICY "qa_insert_teacher" ON public.question_approvals
  FOR INSERT TO authenticated
  WITH CHECK (
    reviewer_id = auth.uid()
    AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'teacher')
  );
