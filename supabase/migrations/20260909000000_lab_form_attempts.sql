-- OUTPUT ONLY — do NOT auto-run. Paste into the Supabase SQL Editor manually.
--
-- Optional DB persistence for the IRS-form labs (src/components/labs/forms).
-- The shipping code path persists attempts to localStorage (see
-- src/components/labs/forms/attempts.ts + markLabDocDone), mirroring how every
-- other lab records completion today. This table is here for when IRS-form lab
-- attempts should sync server-side (e.g. so a teacher can see them). Until it's
-- created AND the client is pointed at it, nothing writes here.

CREATE TABLE IF NOT EXISTS public.lab_form_attempts (
  id         uuid        NOT NULL DEFAULT gen_random_uuid(),
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doc_id     text        NOT NULL,                 -- LabDocument.id (e.g. "irs-w4-first-job")
  form       text        NOT NULL,                 -- w4 | w2 | 1099nec | 1040
  correct    integer     NOT NULL DEFAULT 0,       -- boxes correct on this attempt
  total      integer     NOT NULL DEFAULT 0,       -- graded boxes on the form
  done       boolean     NOT NULL DEFAULT false,   -- true when correct = total
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS lab_form_attempts_user_doc_idx
  ON public.lab_form_attempts (user_id, doc_id);

ALTER TABLE public.lab_form_attempts ENABLE ROW LEVEL SECURITY;

-- Students insert/read their own attempts.
DROP POLICY IF EXISTS "lfa_insert_own" ON public.lab_form_attempts;
CREATE POLICY "lfa_insert_own" ON public.lab_form_attempts
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "lfa_select_own" ON public.lab_form_attempts;
CREATE POLICY "lfa_select_own" ON public.lab_form_attempts
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Teachers read the attempts of students in their own classes (mirrors the
-- student_ability teacher-read policy).
DROP POLICY IF EXISTS "lfa_select_teacher" ON public.lab_form_attempts;
CREATE POLICY "lfa_select_teacher" ON public.lab_form_attempts
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.class_members cm
      JOIN public.classes c ON c.id = cm.class_id
      WHERE cm.user_id = lab_form_attempts.user_id
        AND c.teacher_id = auth.uid()
    )
  );
