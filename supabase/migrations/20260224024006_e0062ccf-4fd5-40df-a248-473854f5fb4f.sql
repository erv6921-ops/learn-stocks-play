
-- Businesses table
CREATE TABLE public.businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  type text NOT NULL DEFAULT 'general',
  level integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own business" ON public.businesses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own business" ON public.businesses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own business" ON public.businesses FOR UPDATE USING (auth.uid() = user_id);

-- Business finances
CREATE TABLE public.business_finances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  revenue numeric NOT NULL DEFAULT 0,
  expenses numeric NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.business_finances ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner can manage finances" ON public.business_finances FOR ALL USING (
  EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.user_id = auth.uid())
);

-- Business tasks
CREATE TABLE public.business_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  category text NOT NULL,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.business_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner can manage tasks" ON public.business_tasks FOR ALL USING (
  EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.user_id = auth.uid())
);

-- Marketplace listings
CREATE TABLE public.marketplace_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  category text NOT NULL DEFAULT 'product',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active listings" ON public.marketplace_listings FOR SELECT USING (status = 'active' OR seller_user_id = auth.uid());
CREATE POLICY "Users can create own listings" ON public.marketplace_listings FOR INSERT WITH CHECK (auth.uid() = seller_user_id);
CREATE POLICY "Users can update own listings" ON public.marketplace_listings FOR UPDATE USING (auth.uid() = seller_user_id);

-- Purchases
CREATE TABLE public.purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_user_id uuid NOT NULL,
  listing_id uuid NOT NULL REFERENCES public.marketplace_listings(id),
  seller_user_id uuid NOT NULL,
  price numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own purchases" ON public.purchases FOR SELECT USING (auth.uid() = buyer_user_id OR auth.uid() = seller_user_id);
CREATE POLICY "Users can create purchases" ON public.purchases FOR INSERT WITH CHECK (auth.uid() = buyer_user_id);

-- Avatar items catalog
CREATE TABLE public.avatar_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  category text NOT NULL DEFAULT 'accessory',
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.avatar_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view avatar items" ON public.avatar_items FOR SELECT USING (true);

-- User avatar inventory
CREATE TABLE public.user_avatar_inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  item_id uuid NOT NULL REFERENCES public.avatar_items(id),
  owned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, item_id)
);
ALTER TABLE public.user_avatar_inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own inventory" ON public.user_avatar_inventory FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to inventory" ON public.user_avatar_inventory FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Seed some avatar items
INSERT INTO public.avatar_items (name, description, price, category) VALUES
  ('Business Suit', 'A sharp professional look', 50, 'clothing'),
  ('CEO Hat', 'Show everyone who is boss', 30, 'accessory'),
  ('Golden Watch', 'Time is money!', 75, 'accessory'),
  ('Startup Hoodie', 'Silicon Valley vibes', 25, 'clothing'),
  ('Briefcase', 'Carry your business plans', 20, 'accessory'),
  ('Sunglasses', 'Cool entrepreneur look', 15, 'accessory'),
  ('Trophy', 'Display your achievements', 100, 'decoration'),
  ('Office Plant', 'Green up your workspace', 10, 'decoration');
