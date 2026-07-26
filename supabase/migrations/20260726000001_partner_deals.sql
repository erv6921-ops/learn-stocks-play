-- Partner Deals: students whose businesses share supply-chain or complementary
-- synergies can propose a real collaboration deal. Both parties get mechanical
-- bonuses applied to their monthly business simulation while the deal is active.

-- ── 1. Expose biz_type on the game-state row ─────────────────────────────────
-- saveActivities() already upserts business_game_state; we add a biz_type column
-- so partner-snapshot queries can surface "what kind of business does this player run."
ALTER TABLE public.business_game_state
  ADD COLUMN IF NOT EXISTS biz_type text;

-- ── 2. Partner deals table ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.partner_deals (
  id              uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  proposer_id     uuid    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id     uuid    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Business-type snapshot at proposal time (food | tech | retail | creative)
  proposer_biz_type   text NOT NULL,
  receiver_biz_type   text NOT NULL,
  proposer_first_name text NOT NULL DEFAULT '',
  receiver_first_name text NOT NULL DEFAULT '',

  -- Generated deal content
  title       text NOT NULL,
  description text NOT NULL,
  emoji       text NOT NULL DEFAULT '🤝',

  -- Mechanical bonuses applied each sim-month while active
  -- Proposer side
  proposer_revenue_pct    int NOT NULL DEFAULT 0,
  proposer_customers_bonus int NOT NULL DEFAULT 0,
  proposer_reputation_bonus int NOT NULL DEFAULT 0,
  -- Receiver side
  receiver_revenue_pct    int NOT NULL DEFAULT 0,
  receiver_customers_bonus int NOT NULL DEFAULT 0,
  receiver_reputation_bonus int NOT NULL DEFAULT 0,

  -- Duration in real-world days (default 180 = ~6 months)
  duration_days int NOT NULL DEFAULT 180,

  status       text NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at   timestamptz DEFAULT now(),
  responded_at timestamptz,

  CHECK (proposer_id <> receiver_id)
);

ALTER TABLE public.partner_deals ENABLE ROW LEVEL SECURITY;

-- Each party can read their own deals
CREATE POLICY "deal_select" ON public.partner_deals
  FOR SELECT TO authenticated
  USING (auth.uid() = proposer_id OR auth.uid() = receiver_id);

-- Proposer creates
CREATE POLICY "deal_insert" ON public.partner_deals
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = proposer_id);

-- Receiver updates status (accept / reject)
CREATE POLICY "deal_update_receiver" ON public.partner_deals
  FOR UPDATE TO authenticated
  USING (auth.uid() = receiver_id AND status = 'pending')
  WITH CHECK (auth.uid() = receiver_id);

GRANT SELECT, INSERT ON public.partner_deals TO authenticated;
GRANT UPDATE (status, responded_at) ON public.partner_deals TO authenticated;
GRANT ALL ON public.partner_deals TO service_role;

-- ── 3. Get partners who have a business (for deal proposing UI) ───────────────
CREATE OR REPLACE FUNCTION public.get_partners_with_biz()
RETURNS TABLE (
  user_id    uuid,
  first_name text,
  last_name  text,
  biz_type   text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id          AS user_id,
    p.first_name,
    p.last_name,
    bg.biz_type
  FROM public.partners pa
  JOIN public.profiles p ON p.id = pa.partner_id
  JOIN public.business_game_state bg ON bg.user_id = pa.partner_id
  WHERE pa.user_id = auth.uid()
    AND bg.biz_type IS NOT NULL
  ORDER BY pa.created_at DESC;
$$;
GRANT EXECUTE ON FUNCTION public.get_partners_with_biz() TO authenticated;

-- ── 4. Propose a deal ─────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.propose_partner_deal(
  _receiver_id              uuid,
  _proposer_biz_type        text,
  _receiver_biz_type        text,
  _title                    text,
  _description              text,
  _emoji                    text,
  _proposer_revenue_pct     int,
  _proposer_customers_bonus int,
  _proposer_reputation_bonus int,
  _receiver_revenue_pct     int,
  _receiver_customers_bonus int,
  _receiver_reputation_bonus int
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _id            uuid;
  _proposer_name text;
  _receiver_name text;
BEGIN
  -- Must be an accepted partner
  IF NOT EXISTS (
    SELECT 1 FROM public.partners
    WHERE user_id = auth.uid() AND partner_id = _receiver_id
  ) THEN
    RAISE EXCEPTION 'not_a_partner';
  END IF;

  -- No duplicate pending proposals to the same person
  IF EXISTS (
    SELECT 1 FROM public.partner_deals
    WHERE proposer_id = auth.uid()
      AND receiver_id = _receiver_id
      AND status = 'pending'
  ) THEN
    RAISE EXCEPTION 'pending_exists';
  END IF;

  SELECT first_name INTO _proposer_name FROM public.profiles WHERE id = auth.uid();
  SELECT first_name INTO _receiver_name FROM public.profiles WHERE id = _receiver_id;

  INSERT INTO public.partner_deals (
    proposer_id, receiver_id,
    proposer_biz_type, receiver_biz_type,
    proposer_first_name, receiver_first_name,
    title, description, emoji,
    proposer_revenue_pct, proposer_customers_bonus, proposer_reputation_bonus,
    receiver_revenue_pct, receiver_customers_bonus, receiver_reputation_bonus
  ) VALUES (
    auth.uid(), _receiver_id,
    _proposer_biz_type, _receiver_biz_type,
    COALESCE(_proposer_name, ''), COALESCE(_receiver_name, ''),
    _title, _description, _emoji,
    _proposer_revenue_pct, _proposer_customers_bonus, _proposer_reputation_bonus,
    _receiver_revenue_pct, _receiver_customers_bonus, _receiver_reputation_bonus
  ) RETURNING id INTO _id;

  RETURN _id;
END;
$$;
GRANT EXECUTE ON FUNCTION public.propose_partner_deal(uuid,text,text,text,text,text,int,int,int,int,int,int) TO authenticated;

-- ── 5. Respond to a deal (accept or reject) ───────────────────────────────────
CREATE OR REPLACE FUNCTION public.respond_to_partner_deal(
  _deal_id uuid,
  _accept  boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.partner_deals SET
    status       = CASE WHEN _accept THEN 'accepted' ELSE 'rejected' END,
    responded_at = now()
  WHERE id = _deal_id
    AND receiver_id = auth.uid()
    AND status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'not_found';
  END IF;
END;
$$;
GRANT EXECUTE ON FUNCTION public.respond_to_partner_deal(uuid, boolean) TO authenticated;

-- ── 6. Get all my deals (pending + active) ────────────────────────────────────
-- Returns a unified view: both deals I proposed and deals proposed to me.
-- "direction" = 'outgoing' (I proposed) | 'incoming' (proposed to me)
CREATE OR REPLACE FUNCTION public.get_my_partner_deals()
RETURNS TABLE (
  id                  uuid,
  direction           text,
  partner_id          uuid,
  partner_first_name  text,
  partner_last_name   text,
  partner_biz_type    text,
  title               text,
  description         text,
  emoji               text,
  my_revenue_pct      int,
  my_customers_bonus  int,
  my_reputation_bonus int,
  status              text,
  created_at          timestamptz,
  responded_at        timestamptz,
  expires_at          timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    d.id,
    'outgoing'::text,
    d.receiver_id,
    p.first_name,
    p.last_name,
    d.receiver_biz_type,
    d.title, d.description, d.emoji,
    d.proposer_revenue_pct,
    d.proposer_customers_bonus,
    d.proposer_reputation_bonus,
    d.status,
    d.created_at,
    d.responded_at,
    CASE WHEN d.status = 'accepted'
         THEN d.responded_at + (d.duration_days || ' days')::interval
         ELSE NULL END
  FROM public.partner_deals d
  JOIN public.profiles p ON p.id = d.receiver_id
  WHERE d.proposer_id = auth.uid()
    AND d.status IN ('pending', 'accepted')

  UNION ALL

  SELECT
    d.id,
    'incoming'::text,
    d.proposer_id,
    p.first_name,
    p.last_name,
    d.proposer_biz_type,
    d.title, d.description, d.emoji,
    d.receiver_revenue_pct,
    d.receiver_customers_bonus,
    d.receiver_reputation_bonus,
    d.status,
    d.created_at,
    d.responded_at,
    CASE WHEN d.status = 'accepted'
         THEN d.responded_at + (d.duration_days || ' days')::interval
         ELSE NULL END
  FROM public.partner_deals d
  JOIN public.profiles p ON p.id = d.proposer_id
  WHERE d.receiver_id = auth.uid()
    AND d.status IN ('pending', 'accepted')

  ORDER BY created_at DESC;
$$;
GRANT EXECUTE ON FUNCTION public.get_my_partner_deals() TO authenticated;
