-- Cap partner invites and partner rosters so a student can't spam invites or
-- accumulate an unbounded partner list (reported via in-app bug report:
-- "Make it so that sending partners and having partners contains a limit").
--
-- MAX_PENDING_OUT: how many outgoing invites a student can have awaiting a
-- response at once. MAX_PARTNERS: how many accepted partners a student can
-- have. Both are enforced server-side since send_partner_request and
-- respond_partner_request are the only ways to create/accept a row.

CREATE OR REPLACE FUNCTION public.send_partner_request(_to uuid)
RETURNS text -- resulting status seen by the caller: 'pending_out' | 'accepted'
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _me uuid := auth.uid();
  _max_pending_out CONSTANT int := 20;
  _max_partners CONSTANT int := 50;
BEGIN
  IF _me IS NULL OR _to IS NULL OR _to = _me THEN
    RAISE EXCEPTION 'invalid partner request';
  END IF;

  -- Already invited / already partners (me → them)?
  IF EXISTS (SELECT 1 FROM partners WHERE user_id = _me AND partner_id = _to) THEN
    RETURN (SELECT CASE WHEN status = 'accepted' THEN 'accepted' ELSE 'pending_out' END
            FROM partners WHERE user_id = _me AND partner_id = _to);
  END IF;

  -- They already invited me → inviting back seals the deal (still subject to
  -- my own partner-count limit, checked below).
  IF EXISTS (SELECT 1 FROM partners WHERE user_id = _to AND partner_id = _me AND status = 'pending') THEN
    IF (SELECT COUNT(*) FROM partners
        WHERE (user_id = _me OR partner_id = _me) AND status = 'accepted') >= _max_partners THEN
      RAISE EXCEPTION 'You already have the maximum of % partners.', _max_partners;
    END IF;
    UPDATE partners SET status = 'accepted'
    WHERE user_id = _to AND partner_id = _me AND status = 'pending';
    IF FOUND THEN RETURN 'accepted'; END IF;
  END IF;
  IF EXISTS (SELECT 1 FROM partners WHERE user_id = _to AND partner_id = _me AND status = 'accepted') THEN
    RETURN 'accepted';
  END IF;

  IF (SELECT COUNT(*) FROM partners
      WHERE (user_id = _me OR partner_id = _me) AND status = 'accepted') >= _max_partners THEN
    RAISE EXCEPTION 'You already have the maximum of % partners.', _max_partners;
  END IF;
  IF (SELECT COUNT(*) FROM partners WHERE user_id = _me AND status = 'pending') >= _max_pending_out THEN
    RAISE EXCEPTION 'You have % pending invites already - wait for a response or cancel one first.', _max_pending_out;
  END IF;

  INSERT INTO partners (user_id, partner_id, status) VALUES (_me, _to, 'pending');
  RETURN 'pending_out';
END;
$$;
GRANT EXECUTE ON FUNCTION public.send_partner_request(uuid) TO authenticated;

-- ── Accept or decline an incoming invite (accepting is capped too) ──────
CREATE OR REPLACE FUNCTION public.respond_partner_request(_from uuid, _accept boolean)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _me uuid := auth.uid();
  _max_partners CONSTANT int := 50;
BEGIN
  IF _me IS NULL THEN RETURN false; END IF;
  IF _accept THEN
    IF (SELECT COUNT(*) FROM partners
        WHERE (user_id = _me OR partner_id = _me) AND status = 'accepted') >= _max_partners THEN
      RAISE EXCEPTION 'You already have the maximum of % partners.', _max_partners;
    END IF;
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
