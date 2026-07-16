-- Partners: students can search for other students by name and "add" them as
-- partners (a lightweight follow). Anyone can look up a partner's public
-- snapshot — name, school, grade, rank (XP), stock portfolio and micro-business
-- summary — via SECURITY DEFINER RPCs, since the underlying tables are all
-- RLS "own-row only".

-- ── partners table (one-directional follow) ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  partner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, partner_id),
  CHECK (user_id <> partner_id)
);
CREATE INDEX IF NOT EXISTS partners_user_idx ON public.partners(user_id);

GRANT SELECT, INSERT, DELETE ON public.partners TO authenticated;
GRANT ALL ON public.partners TO service_role;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "partners_select_own" ON public.partners FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "partners_insert_own" ON public.partners FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "partners_delete_own" ON public.partners FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ── Search students by name ──────────────────────────────────────────────
-- Returns name + school + grade (+ XP so the UI can show a rank badge).
-- Teachers are excluded; the caller is excluded from their own results.
CREATE OR REPLACE FUNCTION public.search_students(_query text)
RETURNS TABLE (
  user_id uuid,
  first_name text,
  last_name text,
  school_name text,
  grade integer,
  xp numeric,
  is_partner boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id AS user_id,
    p.first_name,
    p.last_name,
    p.school_name,
    p.grade,
    COALESCE((
      SELECT SUM(jh.amount) FROM public.jeffs_history jh
      WHERE jh.user_id = p.id AND jh.amount > 0
    ), 0) AS xp,
    EXISTS (
      SELECT 1 FROM public.partners pa
      WHERE pa.user_id = auth.uid() AND pa.partner_id = p.id
    ) AS is_partner
  FROM public.profiles p
  WHERE auth.uid() IS NOT NULL
    AND p.id <> auth.uid()
    AND (p.role IS DISTINCT FROM 'teacher')
    AND char_length(trim(_query)) >= 2
    AND (
      p.first_name ILIKE '%' || trim(_query) || '%'
      OR p.last_name ILIKE '%' || trim(_query) || '%'
      OR (COALESCE(p.first_name, '') || ' ' || COALESCE(p.last_name, '')) ILIKE '%' || trim(_query) || '%'
    )
  ORDER BY p.first_name, p.last_name
  LIMIT 20;
$$;
GRANT EXECUTE ON FUNCTION public.search_students(text) TO authenticated;

-- ── My partners list (same shape as search results) ─────────────────────
CREATE OR REPLACE FUNCTION public.get_partners()
RETURNS TABLE (
  user_id uuid,
  first_name text,
  last_name text,
  school_name text,
  grade integer,
  xp numeric,
  is_partner boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id AS user_id,
    p.first_name,
    p.last_name,
    p.school_name,
    p.grade,
    COALESCE((
      SELECT SUM(jh.amount) FROM public.jeffs_history jh
      WHERE jh.user_id = p.id AND jh.amount > 0
    ), 0) AS xp,
    true AS is_partner
  FROM public.partners pa
  JOIN public.profiles p ON p.id = pa.partner_id
  WHERE pa.user_id = auth.uid()
  ORDER BY pa.created_at DESC;
$$;
GRANT EXECUTE ON FUNCTION public.get_partners() TO authenticated;

-- ── Public snapshot of one student ───────────────────────────────────────
-- Everything the partner detail view needs in a single call: profile, XP
-- (rank/league is derived client-side), stock holdings, and a micro-business
-- summary pulled out of the business_game_state JSONB document.
CREATE OR REPLACE FUNCTION public.get_partner_snapshot(_user_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE WHEN auth.uid() IS NULL THEN NULL ELSE jsonb_build_object(
    'profile', (
      SELECT jsonb_build_object(
        'user_id', p.id,
        'first_name', p.first_name,
        'last_name', p.last_name,
        'school_name', p.school_name,
        'grade', p.grade
      )
      FROM public.profiles p
      WHERE p.id = _user_id AND (p.role IS DISTINCT FROM 'teacher')
    ),
    'xp', COALESCE((
      SELECT SUM(jh.amount) FROM public.jeffs_history jh
      WHERE jh.user_id = _user_id AND jh.amount > 0
    ), 0),
    'holdings', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'symbol', pf.symbol,
        'shares', pf.shares,
        'purchase_price', pf.purchase_price
      ) ORDER BY pf.shares * pf.purchase_price DESC)
      FROM public.portfolio pf
      WHERE pf.user_id = _user_id
    ), '[]'::jsonb),
    'business', (
      SELECT jsonb_build_object(
        'week', b.state->'week',
        'revenue', b.state->'revenue',
        'credit_score', b.state->'creditScore',
        'star_rating', b.state->'starRating',
        'employees', jsonb_array_length(COALESCE(b.state->'employees', '[]'::jsonb)),
        'investor_funded', b.state->'investorFunded',
        'plan_approved', b.state->'planApproved'
      )
      FROM public.business_game_state b
      WHERE b.user_id = _user_id
    )
  ) END;
$$;
GRANT EXECUTE ON FUNCTION public.get_partner_snapshot(uuid) TO authenticated;
