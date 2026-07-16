-- Leaderboard / partner numbers now show CURRENT InvestiCoins (the live ledger
-- balance — earnings minus spending), matching the coin counter in the top bar,
-- instead of lifetime "coins earned". The returned column keeps its `xp` name
-- so client code doesn't need to change shape; only the math changed.

-- ── get_class_leaderboard ─────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_class_leaderboard(_class_id uuid)
RETURNS TABLE (
  user_id uuid,
  first_name text,
  last_name text,
  xp numeric
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
    COALESCE((
      SELECT SUM(jh.amount)
      FROM public.jeffs_history jh
      WHERE jh.user_id = p.id
    ), 0) AS xp
  FROM public.class_members cm
  JOIN public.profiles p ON p.id = cm.user_id
  WHERE cm.class_id = _class_id
    AND (
      public.is_class_member(auth.uid(), _class_id)
      OR public.is_class_teacher(auth.uid(), _class_id)
    );
$$;
GRANT EXECUTE ON FUNCTION public.get_class_leaderboard(uuid) TO authenticated;

-- ── search_students ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.search_students(_query text)
RETURNS TABLE (
  user_id uuid,
  first_name text,
  last_name text,
  school_name text,
  grade integer,
  xp numeric,
  partner_status text
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
      WHERE jh.user_id = p.id
    ), 0) AS xp,
    COALESCE((
      SELECT CASE
        WHEN pa.status = 'accepted' THEN 'accepted'
        WHEN pa.user_id = auth.uid() THEN 'pending_out'
        ELSE 'pending_in'
      END
      FROM public.partners pa
      WHERE (pa.user_id = auth.uid() AND pa.partner_id = p.id)
         OR (pa.user_id = p.id AND pa.partner_id = auth.uid())
      LIMIT 1
    ), 'none') AS partner_status
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

-- ── get_partners ──────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_partners()
RETURNS TABLE (
  user_id uuid,
  first_name text,
  last_name text,
  school_name text,
  grade integer,
  xp numeric,
  partner_status text
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
      WHERE jh.user_id = p.id
    ), 0) AS xp,
    'accepted'::text AS partner_status
  FROM public.partners pa
  JOIN public.profiles p
    ON p.id = CASE WHEN pa.user_id = auth.uid() THEN pa.partner_id ELSE pa.user_id END
  WHERE (pa.user_id = auth.uid() OR pa.partner_id = auth.uid())
    AND pa.status = 'accepted'
  ORDER BY pa.created_at DESC;
$$;
GRANT EXECUTE ON FUNCTION public.get_partners() TO authenticated;

-- ── get_partner_requests ──────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_partner_requests()
RETURNS TABLE (
  user_id uuid,
  first_name text,
  last_name text,
  school_name text,
  grade integer,
  xp numeric,
  partner_status text
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
      WHERE jh.user_id = p.id
    ), 0) AS xp,
    'pending_in'::text AS partner_status
  FROM public.partners pa
  JOIN public.profiles p ON p.id = pa.user_id
  WHERE pa.partner_id = auth.uid() AND pa.status = 'pending'
  ORDER BY pa.created_at DESC;
$$;
GRANT EXECUTE ON FUNCTION public.get_partner_requests() TO authenticated;

-- ── get_partner_snapshot ──────────────────────────────────────────────────
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
      WHERE jh.user_id = _user_id
    ), 0),
    'partner_count', (
      SELECT COUNT(*) FROM public.partners pa
      WHERE (pa.user_id = _user_id OR pa.partner_id = _user_id)
        AND pa.status = 'accepted'
    ),
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
