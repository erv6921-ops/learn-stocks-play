-- Add partner_count to the public student snapshot so the Partners page can
-- show how many partners a student has.
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
    'partner_count', (
      SELECT COUNT(*) FROM public.partners pa
      WHERE pa.user_id = _user_id
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
