-- Deliver incoming partner (friend) requests to the recipient in real time.
-- Adding the partners table to the Realtime publication streams INSERTs of
-- pending rows to the recipient's client the instant they're created. RLS
-- (partners_select_own: auth.uid() = user_id OR auth.uid() = partner_id)
-- already lets the recipient read rows addressed to them, so Realtime will
-- authorize and forward the event to them.
--
-- Idempotent: skip if the table is already a publication member.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'partners'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.partners;
  END IF;
END $$;
