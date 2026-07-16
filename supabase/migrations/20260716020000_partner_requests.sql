-- Partner connections now require consent: sending an invite creates a
-- 'pending' row (user_id = requester, partner_id = recipient) and the
-- recipient must accept before the partnership counts. Accepted partnerships
-- are mutual — both sides see each other in their roster.
--
-- Existing rows (created under the old auto-add model) are grandfathered in
-- as accepted so nobody's roster empties out.

ALTER TABLE public.partners
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending'
  CHECK (status IN ('pending', 'accepted'));

UPDATE public.partners SET status = 'accepted';

-- Recipients need to see and act on invites addressed to them.
DROP POLICY IF EXISTS "partners_select_own" ON public.partners;
CREATE POLICY "partners_select_own" ON public.partners FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = partner_id);
DROP POLICY IF EXISTS "partners_delete_own" ON public.partners;
CREATE POLICY "partners_delete_own" ON public.partners FOR DELETE TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = partner_id);
DROP POLICY IF EXISTS "partners_update_recipient" ON public.partners;
CREATE POLICY "partners_update_recipient" ON public.partners FOR UPDATE TO authenticated
  USING (auth.uid() = partner_id) WITH CHECK (status = 'accepted');
GRANT UPDATE ON public.partners TO authenticated;

-- ── Send an invite (auto-accepts if the other student already invited you) ─
CREATE OR REPLACE FUNCTION public.send_partner_request(_to uuid)
RETURNS text -- resulting status seen by the caller: 'pending_out' | 'accepted'
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _me uuid := auth.uid();
BEGIN
  IF _me IS NULL OR _to IS NULL OR _to = _me THEN
    RAISE EXCEPTION 'invalid partner request';
  END IF;

  -- Already invited / already partners (me → them)?
  IF EXISTS (SELECT 1 FROM partners WHERE user_id = _me AND partner_id = _to) THEN
    RETURN (SELECT CASE WHEN status = 'accepted' THEN 'accepted' ELSE 'pending_out' END
            FROM partners WHERE user_id = _me AND partner_id = _to);
  END IF;

  -- They already invited me → inviting back seals the deal.
  UPDATE partners SET status = 'accepted'
  WHERE user_id = _to AND partner_id = _me AND status = 'pending';
  IF FOUND THEN RETURN 'accepted'; END IF;
  IF EXISTS (SELECT 1 FROM partners WHERE user_id = _to AND partner_id = _me AND status = 'accepted') THEN
    RETURN 'accepted';
  END IF;

  INSERT INTO partners (user_id, partner_id, status) VALUES (_me, _to, 'pending');
  RETURN 'pending_out';
END;
$$;
GRANT EXECUTE ON FUNCTION public.send_partner_request(uuid) TO authenticated;

-- ── Accept or decline an incoming invite ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.respond_partner_request(_from uuid, _accept boolean)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _me uuid := auth.uid();
BEGIN
  IF _me IS NULL THEN RETURN false; END IF;
  IF _accept THEN
    UPDATE partners SET status = 'accepted'
    WHERE user_id = _from AND partner_id = _me AND status = 'pending';
  ELSE
    DELETE FROM partners
    WHERE user_id = _from AND partner_id = _me AND status = 'pending';
  END IF;
  RETURN FOUND;
END;
$$;
GRANT EXECUTE ON FUNCTION public.respond_partner_request(uuid, boolean) TO authenticated;

-- ── Remove a partnership (either direction) or cancel a sent invite ──────
CREATE OR REPLACE FUNCTION public.remove_partner(_other uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.partners
  WHERE (user_id = auth.uid() AND partner_id = _other)
     OR (user_id = _other AND partner_id = auth.uid());
$$;
GRANT EXECUTE ON FUNCTION public.remove_partner(uuid) TO authenticated;

-- ── search_students: is_partner boolean → partner_status text ────────────
-- 'none' | 'pending_out' (I invited them) | 'pending_in' (they invited me) |
-- 'accepted'. Return type changed, so drop first.
DROP FUNCTION IF EXISTS public.search_students(text);
CREATE FUNCTION public.search_students(_query text)
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
      WHERE jh.user_id = p.id AND jh.amount > 0
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

-- ── get_partners: accepted partnerships in either direction ──────────────
DROP FUNCTION IF EXISTS public.get_partners();
CREATE FUNCTION public.get_partners()
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
      WHERE jh.user_id = p.id AND jh.amount > 0
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

-- ── Incoming invites (who wants to partner with me) ──────────────────────
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
      WHERE jh.user_id = p.id AND jh.amount > 0
    ), 0) AS xp,
    'pending_in'::text AS partner_status
  FROM public.partners pa
  JOIN public.profiles p ON p.id = pa.user_id
  WHERE pa.partner_id = auth.uid() AND pa.status = 'pending'
  ORDER BY pa.created_at DESC;
$$;
GRANT EXECUTE ON FUNCTION public.get_partner_requests() TO authenticated;

-- ── partner_count in the snapshot: accepted only, either direction ───────
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
