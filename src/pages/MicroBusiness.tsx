import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import GameNav from "@/components/GameNav";
import { toast } from "sonner";
import {
  Store, Coins, Plus, CheckCircle2, Circle, ShoppingBag,
  DollarSign, ClipboardList, TrendingUp, ArrowUpRight, ArrowDownRight,
  Package, Loader2, Megaphone, Users, Tag, BarChart3,
  Sparkles, Target, Briefcase, Palette, Utensils, Monitor,
  BookOpen, Gamepad2, ShoppingCart, Wrench, Layers,
  Rocket, Lightbulb, PenLine, ArrowRight, PartyPopper, Wallet, AlertCircle, Trophy
} from "lucide-react";

// ─── Data Definitions ───────────────────────────────────────────────

interface Business {
  id: string;
  name: string;
  type: string;
  level: number;
}

interface BusinessTask {
  id: string;
  category: string;
  title: string;
  description: string | null;
  status: string;
}

interface MarketplaceListing {
  id: string;
  seller_user_id: string;
  title: string;
  description: string | null;
  price: number;
  category: string;
  status: string;
}

const INDUSTRIES = [
  { value: "clothing", label: "Clothing & Apparel", icon: Palette, color: "text-pink-400" },
  { value: "digital", label: "Digital Products", icon: Monitor, color: "text-blue-400" },
  { value: "tutoring", label: "Tutoring & Education", icon: BookOpen, color: "text-emerald-400" },
  { value: "food", label: "Food & Snacks", icon: Utensils, color: "text-orange-400" },
  { value: "handmade", label: "Handmade Goods", icon: Sparkles, color: "text-yellow-400" },
  { value: "tech", label: "Tech Services", icon: Wrench, color: "text-cyan-400" },
  { value: "gaming", label: "Game Items & Merch", icon: Gamepad2, color: "text-purple-400" },
  { value: "art", label: "Art & Design", icon: Palette, color: "text-rose-400" },
  { value: "retail", label: "Online Store", icon: ShoppingCart, color: "text-teal-400" },
];

const PRODUCT_CATEGORIES = [
  "Physical product", "Digital download", "Service / consulting",
  "Subscription", "Custom / made-to-order", "Bundle / package"
];

const TARGET_CUSTOMERS = [
  "Students & classmates", "Teachers & educators", "Gamers",
  "Creative professionals", "Small businesses", "Everyone (general)"
];

const BUDGET_AREAS = [
  { key: "product", label: "Product Development", icon: Package },
  { key: "marketing", label: "Marketing & Ads", icon: Megaphone },
  { key: "operations", label: "Operations", icon: Layers },
];

const DEFAULT_TASKS = [
  { category: "legal", title: "Register business name", description: "Choose and register your official business name" },
  { category: "legal", title: "Select business structure", description: "LLC, Sole Proprietorship, or Corporation?" },
  { category: "legal", title: "Get business license", description: "Apply for your local business license" },
  { category: "finance", title: "Open business bank account", description: "Separate personal and business finances" },
  { category: "finance", title: "Set up budget", description: "Create your first monthly budget" },
  { category: "finance", title: "Track first expense", description: "Record your first business expense" },
  { category: "marketing", title: "Create brand name & logo", description: "Design your business identity" },
  { category: "marketing", title: "Write elevator pitch", description: "30-second pitch for your business" },
  { category: "marketing", title: "Create first ad", description: "Design a promotional campaign" },
  { category: "product", title: "Define your first product", description: "Decide what you're selling and at what price" },
  { category: "product", title: "Set launch pricing", description: "Research competitors and set competitive prices" },
  { category: "growth", title: "Get your first customer", description: "Make your first sale on the marketplace" },
  { category: "growth", title: "Reinvest profits", description: "Put earnings back into marketing or inventory" },
];

// Campaigns are a gamble: on success they return revenueBoost (+up to 40%), but
// they can flop and return almost nothing — so you can lose the money you spend.
const MARKETING_CAMPAIGNS = [
  { name: "Social Media Buzz", cost: 50, revenueBoost: 90, successRate: 0.75, description: "Post about your products to attract attention" },
  { name: "Flash Sale", cost: 25, revenueBoost: 70, successRate: 0.6, description: "Discount items for a quick revenue boost — high risk, high reward" },
  { name: "Referral Program", cost: 75, revenueBoost: 140, successRate: 0.7, description: "Reward customers for bringing friends" },
  { name: "Premium Ad Placement", cost: 150, revenueBoost: 280, successRate: 0.65, description: "Featured listing in the marketplace" },
];

const GROWTH_UPGRADES = [
  { name: "Expand Product Line", cost: 200, levelReq: 1, description: "Add 2 more product slots to your store" },
  { name: "Hire Virtual Assistant", cost: 400, levelReq: 2, description: "Automate task completion (future)" },
  { name: "Premium Storefront", cost: 600, levelReq: 2, description: "Stand out with a featured store badge" },
  { name: "Bulk Supplier Deal", cost: 350, levelReq: 1, description: "Reduce cost of goods by 15%" },
];

const BUSINESS_START_COST = 500;

// Metadata for grouping tasks into realistic "departments".
const TASK_CATEGORY_META: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  legal:     { label: "Legal & Setup", icon: Briefcase,    color: "#6366f1" },
  finance:   { label: "Finance",       icon: DollarSign,   color: "#1D9E75" },
  marketing: { label: "Marketing",     icon: Megaphone,    color: "#EF9F27" },
  product:   { label: "Product",       icon: Package,      color: "#0ea5e9" },
  growth:    { label: "Growth",        icon: TrendingUp,   color: "#ec4899" },
};
const TASK_CATEGORY_ORDER = ["legal", "finance", "marketing", "product", "growth"];

// Minimum reflection length required before a task can be marked complete.
const MIN_REFLECTION = 15;

// Per-task guidance + fill-in-the-blank starter templates. Keyed by task title.
// Students tap a template to drop it into their answer, then make it their own.
const TASK_TEMPLATES: Record<string, { guide: string; placeholder: string; starters: string[] }> = {
  "Register business name": {
    guide: "Pick a name that's memorable, easy to spell, and hints at what you sell. Start from a template and make it yours.",
    placeholder: "Business name: ___ — I chose it because ___",
    starters: [
      "Business name: [Adjective] [Noun] — e.g. \"Bright Threads\". I picked it because it's easy to remember and tells customers I sell quality clothing.",
      "Business name: [Your Name] Co. — e.g. \"Rivera Co.\". It feels personal and trustworthy, which fits a service brand.",
      "Business name: [Product] Hub — e.g. \"Study Hub\". It's instantly clear what I offer.",
    ],
  },
  "Select business structure": {
    guide: "Each structure trades simplicity for protection. Pick one and explain why it fits your business.",
    placeholder: "Structure: ___ — I chose it because ___",
    starters: [
      "Structure: Sole Proprietorship. Cheapest and easiest to start, but my personal savings aren't protected if the business owes money. Fine while I'm small and low-risk.",
      "Structure: LLC. Costs a little to set up, but it separates my personal money from the business — if it's sued or in debt, my savings are safe. Best balance for me.",
      "Structure: Corporation. Most paperwork and taxes, but best for raising money and adding owners. Only worth it if I plan to grow big.",
    ],
  },
  "Get business license": {
    guide: "Most businesses need a license to operate legally. Note the type, where you'd apply, and the rough cost.",
    placeholder: "License plan: ___ | Where: ___ | Est. cost: ___",
    starters: [
      "License plan: general business license from my city/county clerk. Estimated cost: 50–100 IC, renewed yearly.",
      "License plan: my product needs a special permit (e.g. a food handler's permit). I'll get it before selling. Estimated cost ~75 IC.",
    ],
  },
  "Open business bank account": {
    guide: "Keeping business money separate from personal money makes taxes and tracking far easier. Pick an account and say why.",
    placeholder: "Bank plan: ___",
    starters: [
      "Bank plan: open a free business checking account (no monthly fee). I'll run all sales and expenses through it so my records stay clean.",
      "Bank plan: business checking + a debit card for expenses, and I'll move 20% of every sale into a separate savings bucket for taxes.",
    ],
  },
  "Set up budget": {
    guide: "A budget tells your money where to go. Split your funds across the areas below and explain your priorities.",
    placeholder: "Monthly budget: Product __% · Marketing __% · Operations __% · Savings __%",
    starters: [
      "Monthly budget: Product/inventory 40%, Marketing 30%, Operations 20%, Savings/taxes 10%. I'll review and adjust each month based on what's working.",
      "Monthly budget: Marketing 50% (I need customers first), Product 30%, Operations 20%. Heavy on marketing because I'm just launching.",
    ],
  },
  "Track first expense": {
    guide: "Real businesses log every expense. Record one using this format.",
    placeholder: "Item: ___ | Category: ___ | Amount: ___ IC | Why: ___",
    starters: [
      "Expense — Item: [what you bought] | Category: [product/marketing/ops] | Amount: [X] IC | Why: [reason].",
      "Expense — Item: design tool subscription | Category: Marketing | Amount: 30 IC | Why: to make a professional logo and ads.",
    ],
  },
  "Create brand name & logo": {
    guide: "Your brand is how customers recognize you. Choose a logo style, colors, and a slogan. Pick a template to start.",
    placeholder: "Logo style: ___ | Colors: ___ | Slogan: \"___\"",
    starters: [
      "Logo: minimalist wordmark (just my name in a clean bold font). Colors: deep green + gold. Slogan: \"[Benefit], made simple.\"",
      "Logo: a friendly mascot/character with personality. Colors: bright and bold. Slogan: \"[Do the thing] like never before.\"",
      "Logo: emblem/badge (icon inside a circle). Colors: black + one accent. Slogan: \"Built for [your customer].\"",
    ],
  },
  "Write elevator pitch": {
    guide: "A great pitch explains who you help and why you're different in one breath. Fill in the template.",
    placeholder: "We help ___ do ___ with ___, unlike ___ because ___",
    starters: [
      "Pitch: \"We help [target customer] [achieve benefit] with [your product], unlike [competitor] because [your edge].\"",
      "Pitch: \"[Customers] struggle with [problem]. My business fixes it by [solution], so they can [result].\"",
    ],
  },
  "Create first ad": {
    guide: "Good ads grab attention, show the benefit, and tell people what to do next. Use an ad template.",
    placeholder: "Headline: \"___\" | Body: \"___\" | Call to action: \"___\"",
    starters: [
      "Ad — Headline: \"[Bold promise]!\" Body: \"[Who it's for] can now [benefit].\" CTA: \"[Shop now / DM me / Link in bio]\".",
      "Ad — Hook: \"Tired of [problem]?\" Offer: \"Get [product] for just [price].\" CTA: \"Limited spots — order today!\"",
    ],
  },
  "Define your first product": {
    guide: "Be specific about what you're selling and the value it gives. Use the product-spec template.",
    placeholder: "Name: ___ | What it is: ___ | For: ___ | Benefit: ___ | Price: ___ IC",
    starters: [
      "Product — Name: [product] | What it is: [1 sentence] | For: [customer] | Benefit: [outcome] | Price: [X] IC.",
      "Product — Name: Study Guide Pack | What it is: a 20-page exam prep bundle | For: classmates | Benefit: higher scores, less stress | Price: 25 IC.",
    ],
  },
  "Set launch pricing": {
    guide: "Price too high and no one buys; too low and you lose money. Research competitors, then justify your price.",
    placeholder: "My cost: ___ | Competitors: ___ | My price: ___ | Profit per sale: ___",
    starters: [
      "Pricing — My cost to make it: [X] IC. Competitor prices: [range]. My price: [Y] IC, which covers cost and leaves [Z] IC profit per sale.",
      "Pricing — Cost-plus: it costs me 6 IC to make, I add a 60% markup, so I'll charge ~10 IC. I checked 3 competitors charging 8–14 IC.",
    ],
  },
  "Get your first customer": {
    guide: "Your first sale is the hardest. Plan how you'll reach someone and exactly what you'll say.",
    placeholder: "Who I'll reach: ___ | My message: \"___\"",
    starters: [
      "Outreach: I'll message 10 classmates: \"Hey! I just launched [product] that helps with [benefit]. Want to be one of my first customers for [intro price]?\"",
      "Outreach: post in [group/page] with a launch offer — first 5 buyers get [bonus] — then ask happy buyers for a review.",
    ],
  },
  "Reinvest profits": {
    guide: "Smart founders put profits back in to grow. Decide where your earnings go next.",
    placeholder: "I'll reinvest ___% into ___ and keep ___% as a cushion.",
    starters: [
      "Reinvest plan: take [X]% of profit and put it into [marketing / more inventory / a better tool]; keep the rest as a safety cushion.",
      "Reinvest plan: profit so far is [Y] IC — I'll spend half on a Flash Sale campaign to get more customers and save half for slow weeks.",
    ],
  },
};

// Daily operating cost charged whenever the student "runs a business day".
const DAILY_OVERHEAD = 20;

// Random events from running a business day. Negatives outweigh positives, and
// every day also costs overhead — so running your business carries real risk.
const BUSINESS_EVENTS: { type: "gain" | "loss" | "neutral"; weight: number; label: string; desc: string; min: number; max: number }[] = [
  { type: "loss",    weight: 3, label: "Customer refund",    desc: "A customer wasn't happy and demanded their money back.", min: 30, max: 80 },
  { type: "loss",    weight: 2, label: "Equipment broke",    desc: "Your gear broke and needed an emergency repair.",         min: 40, max: 120 },
  { type: "loss",    weight: 2, label: "Supplier price hike", desc: "Your supplier raised prices on materials.",              min: 25, max: 70 },
  { type: "loss",    weight: 2, label: "Late-payment fee",   desc: "You missed a bill's due date and got charged a penalty.", min: 20, max: 60 },
  { type: "loss",    weight: 2, label: "Bad review",         desc: "A harsh review scared off some customers.",                min: 20, max: 90 },
  { type: "loss",    weight: 1, label: "Surprise tax bill",  desc: "The taxes you forgot to set aside came due.",             min: 50, max: 150 },
  { type: "gain",    weight: 3, label: "Word of mouth",      desc: "A happy customer told their friends.",                    min: 30, max: 90 },
  { type: "gain",    weight: 2, label: "Repeat order",       desc: "A loyal customer placed a big repeat order.",             min: 40, max: 120 },
  { type: "gain",    weight: 1, label: "Went viral",         desc: "One of your posts blew up online!",                       min: 80, max: 200 },
  { type: "neutral", weight: 2, label: "Slow day",           desc: "Quiet day — no big wins, no big losses.",                 min: 0,  max: 0 },
];

// Task reflections are persisted client-side (there's no DB column for them).
const REFLECTIONS_KEY = "investiplay_task_reflections";
function loadReflections(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(REFLECTIONS_KEY) || "{}"); } catch { return {}; }
}
function persistReflections(r: Record<string, string>) {
  try { localStorage.setItem(REFLECTIONS_KEY, JSON.stringify(r)); } catch { /* storage unavailable */ }
}

// ─── Component ──────────────────────────────────────────────────────

export default function MicroBusiness() {
  const { user, authReady, jeffsBalance, spendJeffs, earnJeffs } = useApp();
  const navigate = useNavigate();

  // Data state
  const [business, setBusiness] = useState<Business | null>(null);
  const [tasks, setTasks] = useState<BusinessTask[]>([]);
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [myListings, setMyListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Creation wizard state
  const [createStep, setCreateStep] = useState(0);
  const [bizName, setBizName] = useState("");
  const [bizIndustry, setBizIndustry] = useState("");
  const [bizProductCategory, setBizProductCategory] = useState("");
  const [bizTargetCustomer, setBizTargetCustomer] = useState("");
  const [bizFirstProductName, setBizFirstProductName] = useState("");
  const [bizFirstProductPrice, setBizFirstProductPrice] = useState("10");
  const [bizBudget, setBizBudget] = useState<Record<string, number>>({ product: 40, marketing: 30, operations: 30 });
  const [creatingBusiness, setCreatingBusiness] = useState(false);

  // Task completion flow — reflections persisted client-side, plus the
  // currently-open reflection editor and its draft text.
  const [taskReflections, setTaskReflections] = useState<Record<string, string>>(() => loadReflections());
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [reflectionDraft, setReflectionDraft] = useState("");
  const [savingTask, setSavingTask] = useState(false);
  const [runningDay, setRunningDay] = useState(false);

  // Marketplace listing state
  const [showListItem, setShowListItem] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [listDesc, setListDesc] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [listCategory, setListCategory] = useState("product");

  // Resolve user ID: prefer Supabase auth, fall back to local profile ID
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [useLocalMode, setUseLocalMode] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.id) {
        setAuthUserId(data.user.id);
        setUseLocalMode(false);
      } else {
        // No auth session — use local mode for business simulation
        const localId = localStorage.getItem('investiplay_local_biz_id') || crypto.randomUUID();
        localStorage.setItem('investiplay_local_biz_id', localId);
        setAuthUserId(localId);
        setUseLocalMode(true);
      }
      setAuthChecked(true);
    }).catch(() => {
      const localId = localStorage.getItem('investiplay_local_biz_id') || crypto.randomUUID();
      localStorage.setItem('investiplay_local_biz_id', localId);
      setAuthUserId(localId);
      setUseLocalMode(true);
      setAuthChecked(true);
    });
  }, []);

  // ─── Data Loading ─────────────────────────────────────────────────

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      console.log('[Business] Mode:', useLocalMode ? 'local' : 'authenticated', 'userId:', authUserId);

      if (useLocalMode) {
        // Local mode: load from localStorage
        const stored = localStorage.getItem('investiplay_local_business');
        if (stored) {
          const localBiz = JSON.parse(stored);
          setBusiness(localBiz.business);
          setTasks(localBiz.tasks || []);
          setTotalRevenue(localBiz.totalRevenue || 0);
          setTotalExpenses(localBiz.totalExpenses || 0);
          setMyListings(localBiz.myListings || []);
        } else {
          setBusiness(null);
        }
        setListings([]);
      } else {
        // Authenticated mode: load from Supabase
        const [bizRes, listingsRes] = await Promise.all([
          supabase.from('businesses').select('*').limit(1).maybeSingle(),
          supabase.from('marketplace_listings').select('*').eq('status', 'active').order('created_at', { ascending: false }).limit(50),
        ]);

        console.log('[Business] Business query result:', bizRes.data ? 'found' : 'none', bizRes.error ? `error: ${bizRes.error.message}` : '');

        if (bizRes.data) {
          setBusiness(bizRes.data as Business);
          const [tasksRes, finRes] = await Promise.all([
            supabase.from('business_tasks').select('*').eq('business_id', bizRes.data.id).order('created_at'),
            supabase.from('business_finances').select('revenue, expenses').eq('business_id', bizRes.data.id),
          ]);
          if (tasksRes.data) setTasks(tasksRes.data as BusinessTask[]);
          if (finRes.data) {
            setTotalRevenue(finRes.data.reduce((s, r) => s + Number(r.revenue), 0));
            setTotalExpenses(finRes.data.reduce((s, r) => s + Number(r.expenses), 0));
          }
        } else {
          setBusiness(null);
        }

        if (listingsRes.data) {
          const all = listingsRes.data as MarketplaceListing[];
          setListings(all.filter(l => l.seller_user_id !== authUserId));
          setMyListings(all.filter(l => l.seller_user_id === authUserId));
        }
      }
    } catch (err) {
      console.error('[Business] Error loading data:', err);
      setLoadError('Unable to load business data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [authUserId, useLocalMode]);

  useEffect(() => { loadData(); }, [loadData]);

  // Helper to persist local business state
  const saveLocalBusiness = useCallback(() => {
    if (!useLocalMode || !business) return;
    localStorage.setItem('investiplay_local_business', JSON.stringify({
      business, tasks, totalRevenue, totalExpenses, myListings,
    }));
  }, [useLocalMode, business, tasks, totalRevenue, totalExpenses, myListings]);

  useEffect(() => { if (useLocalMode && business) saveLocalBusiness(); }, [saveLocalBusiness]);

  // Redirect to onboarding ONLY once we're certain there's no authenticated
  // session. Two conditions must both settle first:
  //   - authReady: AppContext finished restoring the Supabase session
  //   - authChecked: this page's own getUser() probe finished
  // A logged-in user always keeps a real session (useLocalMode === false), even
  // if AppContext's `user` is briefly null during a slow/transient auth restore
  // (e.g. the getSession timeout on a slow network). Previously `if (!user)`
  // ran during render and called navigate() on any such transient null, kicking
  // the user out mid-setup. Now we only leave when there is genuinely no
  // session, and we do it from an effect rather than during render.
  const sessionResolved = authReady && authChecked;
  const noSession = sessionResolved && !user && useLocalMode;

  useEffect(() => {
    if (noSession) navigate("/onboarding", { replace: true });
  }, [noSession, navigate]);

  // Hold the page (don't redirect) until auth has settled, so a slow restore
  // never flashes the user out to onboarding.
  if (!sessionResolved) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  if (noSession) return null;

  // ─── Business Creation ────────────────────────────────────────────

  const handleCreateBusiness = async () => {
    if (creatingBusiness) return;
    const normalizedName = bizName.trim();
    if (!normalizedName) { toast.error("Enter a business name"); return; }
    if (!bizIndustry) { toast.error("Select an industry"); return; }

    if (jeffsBalance < BUSINESS_START_COST) {
      toast.error(`You need ${(BUSINESS_START_COST - jeffsBalance).toLocaleString()} more InvestiCoins.`, {
        description: "Earn more in Missions or Stocks",
        action: { label: "Go to Missions", onClick: () => navigate("/lessons") }
      });
      return;
    }

    setCreatingBusiness(true);
    try {
      if (useLocalMode) {
        // Local mode: store business in localStorage
        const bizId = crypto.randomUUID();
        const newBusiness: Business = { id: bizId, name: normalizedName, type: bizIndustry, level: 1 };
        const localTasks: BusinessTask[] = DEFAULT_TASKS.map(t => ({
          id: crypto.randomUUID(), category: t.category, title: t.title, description: t.description, status: 'pending'
        }));

        const localData = {
          business: newBusiness,
          tasks: localTasks,
          totalRevenue: 0,
          totalExpenses: BUSINESS_START_COST,
          myListings: [] as MarketplaceListing[],
        };

        // Add first product listing if provided
        if (bizFirstProductName.trim()) {
          localData.myListings.push({
            id: crypto.randomUUID(),
            seller_user_id: authUserId || '',
            title: bizFirstProductName.trim(),
            description: `${bizProductCategory || "Product"} by ${normalizedName}`,
            price: parseFloat(bizFirstProductPrice) || 10,
            category: bizProductCategory?.toLowerCase().includes("service") ? "service" : "product",
            status: 'active',
          });
        }

        localStorage.setItem('investiplay_local_business', JSON.stringify(localData));
        spendJeffs(BUSINESS_START_COST, `Started business: ${normalizedName}`);

        toast.success("Business created! 🎉", { description: `Cost: ${BUSINESS_START_COST.toLocaleString()} InvestiCoins` });
        setCreateStep(0);
        setBizName("");
        setBizIndustry("");
        await loadData();
      } else {
        // Authenticated mode: use Supabase
        const { data, error } = await supabase
          .from('businesses')
          .insert({ user_id: authUserId!, name: normalizedName, type: bizIndustry })
          .select()
          .single();

        if (error) {
          console.error('[Business] Insert failed:', error.message, error.details, error.hint);
          toast.error("Business creation failed", { description: error.message });
          return;
        }

        spendJeffs(BUSINESS_START_COST, `Started business: ${normalizedName}`);

        const taskRows = DEFAULT_TASKS.map(t => ({
          business_id: data.id, category: t.category, title: t.title, description: t.description
        }));
        await Promise.all([
          supabase.from('business_tasks').insert(taskRows),
          supabase.from('business_finances').insert({
            business_id: data.id, revenue: 0, expenses: BUSINESS_START_COST,
            notes: `Startup cost — ${normalizedName}`
          }),
          bizFirstProductName.trim()
            ? supabase.from('marketplace_listings').insert({
                seller_user_id: authUserId!,
                title: bizFirstProductName.trim(),
                description: `${bizProductCategory || "Product"} by ${normalizedName}`,
                price: parseFloat(bizFirstProductPrice) || 10,
                category: bizProductCategory?.toLowerCase().includes("service") ? "service" : bizProductCategory?.toLowerCase().includes("digital") ? "digital" : "product",
              })
            : Promise.resolve(),
        ]);

        toast.success("Business created! 🎉", { description: `Cost: ${BUSINESS_START_COST.toLocaleString()} InvestiCoins` });
        setCreateStep(0);
        setBizName("");
        setBizIndustry("");
        await loadData();
      }
    } catch (err: any) {
      console.error('[Business] Unexpected error:', err);
      toast.error("Something went wrong", { description: err?.message || "Please try again" });
    } finally {
      setCreatingBusiness(false);
    }
  };


  // ─── Task Management ──────────────────────────────────────────────

  // Tasks grouped into departments for a more business-like task board.
  const tasksByCategory = (() => {
    const groups: Record<string, BusinessTask[]> = {};
    for (const t of tasks) (groups[t.category] ||= []).push(t);
    const ordered = [
      ...TASK_CATEGORY_ORDER.filter(c => groups[c]),
      ...Object.keys(groups).filter(c => !TASK_CATEGORY_ORDER.includes(c)),
    ];
    return ordered.map(cat => ({ category: cat, items: groups[cat] }));
  })();

  // Open / cancel the reflection editor for a task.
  const openTaskEditor = (task: BusinessTask) => {
    setActiveTaskId(task.id);
    setReflectionDraft(taskReflections[task.id] || "");
  };
  const cancelTaskEditor = () => {
    setActiveTaskId(null);
    setReflectionDraft("");
  };

  // Mark a task complete — requires a written reflection (proof of work).
  const completeTask = async (task: BusinessTask) => {
    if (savingTask) return;
    const text = reflectionDraft.trim();
    if (text.length < MIN_REFLECTION) {
      toast.error(`Add a bit more detail`, { description: `Describe what you did (at least ${MIN_REFLECTION} characters).` });
      return;
    }
    setSavingTask(true);
    try {
      const nextReflections = { ...taskReflections, [task.id]: text };
      setTaskReflections(nextReflections);
      persistReflections(nextReflections);

      if (!useLocalMode) {
        await supabase.from('business_tasks').update({ status: 'completed' }).eq('id', task.id);
      }
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'completed' } : t));

      earnJeffs(5, `Completed task: ${task.title}`);
      toast.success("+5 InvestiCoins!", { description: `Completed: ${task.title}` });

      const completedNow = tasks.filter(t => t.status === 'completed').length + 1;
      if (business && completedNow % 5 === 0) {
        const newLevel = business.level + 1;
        if (!useLocalMode) {
          await supabase.from('businesses').update({ level: newLevel }).eq('id', business.id);
        }
        setBusiness(prev => prev ? { ...prev, level: newLevel } : prev);
        earnJeffs(50, `Business leveled up to ${newLevel}!`);
        toast.success(`🎉 Business Level ${newLevel}!`, { description: "+50 bonus InvestiCoins" });
      }

      setActiveTaskId(null);
      setReflectionDraft("");
    } finally {
      setSavingTask(false);
    }
  };

  // Reopen a completed task (its saved reflection is kept).
  const reopenTask = async (task: BusinessTask) => {
    if (!useLocalMode) {
      await supabase.from('business_tasks').update({ status: 'pending' }).eq('id', task.id);
    }
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'pending' } : t));
  };

  // ─── Marketplace ──────────────────────────────────────────────────

  const handleListItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(listPrice);
    if (!listTitle.trim() || isNaN(price) || price <= 0) return;

    if (useLocalMode) {
      const newListing: MarketplaceListing = {
        id: crypto.randomUUID(), seller_user_id: authUserId || '', title: listTitle.trim(),
        description: listDesc.trim() || null, price, category: listCategory, status: 'active',
      };
      setMyListings(prev => [...prev, newListing]);
      toast.success("Item listed on marketplace!");
      setShowListItem(false);
      setListTitle(""); setListDesc(""); setListPrice("");
      return;
    }

    if (!authUserId) { toast.error("Unable to list item"); return; }
    const { error } = await supabase.from('marketplace_listings').insert({
      seller_user_id: authUserId, title: listTitle.trim(),
      description: listDesc.trim() || null, price, category: listCategory
    });
    if (error) { toast.error("Could not list item", { description: error.message }); return; }
    toast.success("Item listed on marketplace!");
    setShowListItem(false);
    setListTitle(""); setListDesc(""); setListPrice("");
    loadData();
  };

  const handleBuyListing = async (listing: MarketplaceListing) => {
    if (jeffsBalance < listing.price) {
      toast.error("Not enough InvestiCoins!", { description: `You need ${listing.price.toLocaleString()} InvestiCoins.` });
      return;
    }

    const success = spendJeffs(listing.price, `Bought: ${listing.title}`);
    if (!success) return;

    if (!useLocalMode) {
      await supabase.from('purchases').insert({
        buyer_user_id: authUserId!,
        listing_id: listing.id,
        seller_user_id: listing.seller_user_id,
        price: listing.price
      });
      await supabase.from('marketplace_listings').update({ status: 'sold' }).eq('id', listing.id);

      const { data: sellerBiz } = await supabase
        .from('businesses')
        .select('id')
        .eq('user_id', listing.seller_user_id)
        .limit(1)
        .maybeSingle();
      if (sellerBiz) {
        await supabase.from('business_finances').insert({
          business_id: sellerBiz.id,
          revenue: listing.price,
          expenses: 0,
          notes: `Sale: ${listing.title}`
        });
      }
    }

    toast.success(`Purchased "${listing.title}"!`);
    loadData();
  };

  // ─── Marketing & Growth ───────────────────────────────────────────

  const runCampaign = async (campaign: typeof MARKETING_CAMPAIGNS[0]) => {
    if (jeffsBalance < campaign.cost) {
      toast.error("Not enough InvestiCoins!", { description: `Campaign costs ${campaign.cost} InvestiCoins.` });
      return;
    }
    if (!business) return;
    const spent = spendJeffs(campaign.cost, `Marketing: ${campaign.name}`);
    if (!spent) return;

    // Campaigns are a gamble — they can succeed or flop.
    const success = Math.random() < (campaign.successRate ?? 0.7);
    const boostedRevenue = success
      ? campaign.revenueBoost + Math.round(Math.random() * campaign.revenueBoost * 0.4)
      : Math.round(campaign.revenueBoost * Math.random() * 0.2); // flop: 0–20% returned
    if (boostedRevenue > 0) earnJeffs(boostedRevenue, `Campaign revenue: ${campaign.name}`);

    if (!useLocalMode) {
      await supabase.from('business_finances').insert({
        business_id: business.id,
        revenue: boostedRevenue,
        expenses: campaign.cost,
        notes: `Campaign: ${campaign.name}${success ? '' : ' (flop)'}`
      });
    }

    setTotalRevenue(prev => prev + boostedRevenue);
    setTotalExpenses(prev => prev + campaign.cost);
    const net = boostedRevenue - campaign.cost;
    if (success && net >= 0) {
      toast.success(`${campaign.name} paid off!`, {
        description: `Spent ${campaign.cost} · Earned ${boostedRevenue} · Net +${net} IC`
      });
    } else {
      toast.error(`${campaign.name} underperformed`, {
        description: `Spent ${campaign.cost} · Earned ${boostedRevenue} · Net ${net} IC`
      });
    }
  };

  // ─── Business Day (random gains and losses) ───────────────────────
  const pickBusinessEvent = () => {
    const total = BUSINESS_EVENTS.reduce((s, e) => s + e.weight, 0);
    let r = Math.random() * total;
    for (const e of BUSINESS_EVENTS) { if ((r -= e.weight) <= 0) return e; }
    return BUSINESS_EVENTS[BUSINESS_EVENTS.length - 1];
  };

  const runBusinessDay = async () => {
    if (!business || runningDay) return;
    if (jeffsBalance < DAILY_OVERHEAD) {
      toast.error("You can't cover today's overhead", { description: `A business day costs ${DAILY_OVERHEAD} IC in overhead. Earn more first.` });
      return;
    }
    setRunningDay(true);
    try {
      const ev = pickBusinessEvent();
      const amount = ev.max > 0 ? Math.floor(ev.min + Math.random() * (ev.max - ev.min + 1)) : 0;
      const revenue = ev.type === "gain" ? amount : 0;
      const expense = DAILY_OVERHEAD + (ev.type === "loss" ? amount : 0);
      const net = revenue - expense;

      // Single coin operation to avoid stale-balance issues.
      if (net >= 0) earnJeffs(net, `Business day: ${ev.label}`);
      else spendJeffs(Math.min(-net, jeffsBalance), `Business day: ${ev.label}`);

      if (!useLocalMode) {
        await supabase.from('business_finances').insert({
          business_id: business.id, revenue, expenses: expense, notes: `Day: ${ev.label}`
        });
      }
      setTotalRevenue(prev => prev + revenue);
      setTotalExpenses(prev => prev + expense);

      if (ev.type === "gain") {
        toast.success(`📈 ${ev.label}`, { description: `${ev.desc} +${amount} IC (net ${net >= 0 ? "+" : ""}${net} after overhead).` });
      } else if (ev.type === "loss") {
        toast.error(`📉 ${ev.label}`, { description: `${ev.desc} −${amount} IC, plus ${DAILY_OVERHEAD} overhead (net ${net} IC).` });
      } else {
        toast(`${ev.label}`, { description: `${ev.desc} Overhead −${DAILY_OVERHEAD} IC.` });
      }
    } finally {
      setRunningDay(false);
    }
  };

  const buyUpgrade = async (upgrade: typeof GROWTH_UPGRADES[0]) => {
    if (!business) return;
    if (business.level < upgrade.levelReq) {
      toast.error(`Requires Business Level ${upgrade.levelReq}`);
      return;
    }
    if (jeffsBalance < upgrade.cost) {
      toast.error("Not enough InvestiCoins!");
      return;
    }
    const spent = spendJeffs(upgrade.cost, `Upgrade: ${upgrade.name}`);
    if (!spent) return;

    if (!useLocalMode) {
      await supabase.from('business_finances').insert({
        business_id: business.id, revenue: 0, expenses: upgrade.cost,
        notes: `Upgrade: ${upgrade.name}`
      });
    }
    setTotalExpenses(prev => prev + upgrade.cost);

    const newLevel = business.level + 1;
    if (!useLocalMode) {
      await supabase.from('businesses').update({ level: newLevel }).eq('id', business.id);
    }
    setBusiness(prev => prev ? { ...prev, level: newLevel } : prev);

    toast.success(`${upgrade.name} purchased!`, { description: `Business is now Level ${newLevel}` });
  };

  // ─── Adjust Price ─────────────────────────────────────────────────

  const adjustPrice = async (listing: MarketplaceListing, newPrice: number) => {
    if (newPrice <= 0) return;
    if (!useLocalMode) {
      await supabase.from('marketplace_listings').update({ price: newPrice }).eq('id', listing.id);
    }
    setMyListings(prev => prev.map(l => l.id === listing.id ? { ...l, price: newPrice } : l));
    toast.success(`Price updated to ${newPrice} InvestiCoins`);
  };

  // ─── Computed ─────────────────────────────────────────────────────

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const profit = totalRevenue - totalExpenses;
  const businessRank = business
    ? business.level >= 5 ? "Tycoon" : business.level >= 4 ? "Mogul" : business.level >= 3 ? "Rising Star" : business.level >= 2 ? "Startup Founder" : "Aspiring Founder"
    : "Aspiring Founder";
  const taskProgress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  // Budget allocation totals (must sum to exactly 100% to launch).
  const totalBudget = BUDGET_AREAS.reduce((s, a) => s + (bizBudget[a.key] || 0), 0);
  const remainingBudget = 100 - totalBudget;
  const budgetBalanced = totalBudget === 100;

  // ─── Render ───────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-6">
        {/* HUD Banner */}
        <div className="hud-panel p-5 md:p-6 mb-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Store className="w-5 h-5 text-accent" />
                <h1 className="font-display text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  {business ? business.name : "Micro-Business Mode"}
                </h1>
                {business && <Badge variant="accent" className="ml-1">Lvl {business.level}</Badge>}
              </div>
              <p className="text-white/40 text-sm">Build, manage, and grow your own digital business</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Balance</p>
                <p className="text-base font-extrabold text-gold flex items-center gap-1"><Coins className="w-4 h-4" />{jeffsBalance.toLocaleString()}</p>
              </div>
              {business && (
                <>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Rank</p>
                    <p className="text-sm font-bold text-white">{businessRank}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Profit</p>
                    <p className={`text-sm font-bold flex items-center gap-0.5 ${profit >= 0 ? "text-success" : "text-destructive"}`}>
                      {profit >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {Math.abs(profit).toLocaleString()}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading your business...</span>
          </div>
        ) : loadError ? (
          <div className="text-center py-20">
            <Store className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-3">{loadError}</p>
            <Button variant="outline" onClick={loadData}>
              <Loader2 className="w-4 h-4 mr-2" /> Retry
            </Button>
          </div>
        ) : !business ? (
          /* ─── Creation Wizard ─────────────────────────────────── */
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Hero */}
            <div className="relative overflow-hidden rounded-3xl p-7 md:p-8 mb-5 text-center"
              style={{ background: "linear-gradient(135deg,#0f2d1e 0%,#14432e 55%,#1D9E75 140%)" }}>
              <div className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(circle at 25% 30%, white 1.5px, transparent 1.5px)", backgroundSize: "22px 22px" }} />
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                  className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(245,159,39,0.18)", border: "1px solid rgba(245,159,39,0.3)" }}
                >
                  <Rocket className="w-8 h-8 text-gold" />
                </motion.div>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Launch your own business
                </h2>
                <p className="text-white/55 text-sm mt-1.5 max-w-md mx-auto">
                  Pick an industry, design your first product, set a budget, and start selling to other students.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  {[
                    { icon: Coins, text: "Earn InvestiCoins" },
                    { icon: Trophy, text: "Level up your rank" },
                    { icon: ShoppingBag, text: "Sell on the marketplace" },
                  ].map(vp => (
                    <span key={vp.text} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white/90"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                      <vp.icon className="w-3.5 h-3.5 text-gold" /> {vp.text}
                    </span>
                  ))}
                </div>
                <span className="inline-block mt-4 text-gold font-bold text-sm">
                  Startup cost: {BUSINESS_START_COST.toLocaleString()} InvestiCoins
                </span>
              </div>
            </div>

            <Card variant="elevated">
              <CardHeader>
                {/* Stepper with labels */}
                <div className="flex items-center gap-2">
                  {["Industry", "Details", "Product", "Budget"].map((label, s) => (
                    <div key={label} className="flex-1">
                      <div className={`h-1.5 rounded-full transition-colors ${s <= createStep ? "bg-primary" : "bg-muted"}`} />
                      <p className={`text-[10px] font-semibold mt-1.5 text-center transition-colors ${s === createStep ? "text-primary" : s < createStep ? "text-foreground/60" : "text-muted-foreground"}`}>
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {createStep === 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Choose Your Industry</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {INDUSTRIES.map(ind => {
                        const Icon = ind.icon;
                        const selected = bizIndustry === ind.value;
                        return (
                          <button
                            key={ind.value}
                            onClick={() => setBizIndustry(ind.value)}
                            className={`p-4 rounded-xl border text-center transition-all press-scale ${selected ? "border-primary bg-primary/10 ring-2 ring-primary/30" : "border-border bg-muted hover:bg-muted/70"}`}
                          >
                            <Icon className={`w-7 h-7 mx-auto mb-2 ${selected ? "text-primary" : ind.color}`} />
                            <p className="text-xs font-semibold leading-tight">{ind.label}</p>
                          </button>
                        );
                      })}
                    </div>
                    <Button className="w-full" disabled={!bizIndustry} onClick={() => setCreateStep(1)}>Continue</Button>
                  </div>
                )}

                {createStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Business Details</h3>
                    <div>
                      <Label>Business Name</Label>
                      <Input placeholder="e.g., Pixel Studio, Fresh Bites Co." value={bizName} onChange={e => setBizName(e.target.value)} maxLength={40} />
                    </div>
                    <div>
                      <Label>What will you sell?</Label>
                      <Select value={bizProductCategory} onValueChange={setBizProductCategory}>
                        <SelectTrigger><SelectValue placeholder="Select product type" /></SelectTrigger>
                        <SelectContent>
                          {PRODUCT_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Target Customers</Label>
                      <Select value={bizTargetCustomer} onValueChange={setBizTargetCustomer}>
                        <SelectTrigger><SelectValue placeholder="Who are you selling to?" /></SelectTrigger>
                        <SelectContent>
                          {TARGET_CUSTOMERS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => setCreateStep(0)}>Back</Button>
                      <Button className="flex-1" disabled={!bizName.trim()} onClick={() => setCreateStep(2)}>Continue</Button>
                    </div>
                  </div>
                )}

                {createStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Your First Product</h3>
                    <p className="text-sm text-muted-foreground">Define your first product or service to list on the marketplace.</p>
                    <div>
                      <Label>Product / Service Name</Label>
                      <Input placeholder="e.g., Study Guide Pack, Logo Design" value={bizFirstProductName} onChange={e => setBizFirstProductName(e.target.value)} />
                    </div>
                    <div>
                      <Label>Price (InvestiCoins)</Label>
                      <Input type="number" min="1" max="10000" value={bizFirstProductPrice} onChange={e => setBizFirstProductPrice(e.target.value)} />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => setCreateStep(1)}>Back</Button>
                      <Button className="flex-1" onClick={() => setCreateStep(3)}>Continue</Button>
                    </div>
                  </div>
                )}

                {createStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Budget Allocation</h3>
                    <p className="text-sm text-muted-foreground">
                      Split 100% of your startup budget across these areas. This decision shapes your strategy.
                    </p>

                    {/* Live allocation tracker */}
                    <div className={`rounded-xl border p-3 transition-colors ${budgetBalanced ? "border-success/40 bg-success/5" : "border-warning/40 bg-warning/5"}`}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-semibold flex items-center gap-1.5">
                          <Wallet className="w-4 h-4" /> Allocated: {totalBudget}%
                        </span>
                        <span className={`font-bold ${budgetBalanced ? "text-success" : "text-warning"}`}>
                          {budgetBalanced ? "Fully allocated ✓" : `${remainingBudget > 0 ? remainingBudget + "% left" : "Over by " + Math.abs(remainingBudget) + "%"}`}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${Math.min(100, totalBudget)}%`, background: budgetBalanced ? "#1D9E75" : "#EF9F27" }} />
                      </div>
                    </div>

                    {BUDGET_AREAS.map(area => {
                      const Icon = area.icon;
                      // Cap each slider so the three can never exceed 100% total.
                      const others = BUDGET_AREAS.filter(a => a.key !== area.key)
                        .reduce((s, a) => s + (bizBudget[a.key] || 0), 0);
                      const maxForThis = 100 - others;
                      return (
                        <div key={area.key} className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium">{area.label}</span>
                              <span className="font-semibold tabular-nums">{bizBudget[area.key]}%</span>
                            </div>
                            <input
                              type="range" min="0" max="100" step="5"
                              value={bizBudget[area.key]}
                              onChange={e => {
                                const requested = Number(e.target.value);
                                const clamped = Math.min(requested, maxForThis);
                                setBizBudget(prev => ({ ...prev, [area.key]: clamped }));
                              }}
                              className="w-full accent-primary"
                            />
                          </div>
                        </div>
                      );
                    })}

                    {/* Summary */}
                    <div className="p-4 rounded-xl bg-muted space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Business</span><span className="font-bold">{bizName}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Industry</span><span>{INDUSTRIES.find(i => i.value === bizIndustry)?.label}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">First Product</span><span>{bizFirstProductName || "—"}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Startup Cost</span><span className="text-gold font-bold">{BUSINESS_START_COST.toLocaleString()} IC</span></div>
                    </div>

                    {!budgetBalanced && (
                      <p className="text-xs text-warning flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        Allocate exactly 100% to launch ({remainingBudget > 0 ? `${remainingBudget}% remaining` : `reduce by ${Math.abs(remainingBudget)}%`}).
                      </p>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => setCreateStep(2)}>Back</Button>
                      <Button className="flex-1" disabled={creatingBusiness || !budgetBalanced} onClick={handleCreateBusiness}>
                        {creatingBusiness ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                        {creatingBusiness ? "Launching..." : "Launch Business"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* ─── Business Dashboard ─────────────────────────────── */
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-lg mx-auto">
              <TabsTrigger value="overview"><BarChart3 className="w-4 h-4 mr-1.5 hidden sm:inline" />Overview</TabsTrigger>
              <TabsTrigger value="tasks"><ClipboardList className="w-4 h-4 mr-1.5 hidden sm:inline" />Tasks</TabsTrigger>
              <TabsTrigger value="market"><ShoppingBag className="w-4 h-4 mr-1.5 hidden sm:inline" />Market</TabsTrigger>
              <TabsTrigger value="grow"><TrendingUp className="w-4 h-4 mr-1.5 hidden sm:inline" />Grow</TabsTrigger>
            </TabsList>

            {/* ─── Overview Tab ───────────────────────────────── */}
            <TabsContent value="overview">
              <div className="grid md:grid-cols-3 gap-4">
                <Card variant="elevated">
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-5 h-5 text-success" />
                      <span className="font-semibold">Revenue</span>
                    </div>
                    <p className="text-2xl font-extrabold text-success">{totalRevenue.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">IC</span></p>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <ArrowDownRight className="w-5 h-5 text-destructive" />
                      <span className="font-semibold">Expenses</span>
                    </div>
                    <p className="text-2xl font-extrabold text-destructive">{totalExpenses.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">IC</span></p>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Net Profit</span>
                    </div>
                    <p className={`text-2xl font-extrabold ${profit >= 0 ? "text-success" : "text-destructive"}`}>
                      {profit >= 0 ? "+" : ""}{profit.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">IC</span>
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Open for business — run a day of operations (risk!) */}
              <Card variant="elevated" className="mt-4 overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="max-w-md">
                      <h3 className="font-display text-base font-extrabold flex items-center gap-2">
                        <Store className="w-4 h-4 text-primary" /> Open for business
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Run a day of operations. Daily overhead costs <span className="font-semibold text-foreground">{DAILY_OVERHEAD} IC</span>, and anything can happen — a viral post, a refund, a broken laptop, a surprise tax bill. Real business means real risk.
                      </p>
                    </div>
                    <Button onClick={runBusinessDay} disabled={runningDay} className="press-scale gap-1.5 shrink-0">
                      {runningDay ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Run a business day
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Task progress */}
              <Card variant="elevated" className="mt-4">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Task Progress</span>
                    <span className="text-sm text-muted-foreground">{completedTasks}/{tasks.length}</span>
                  </div>
                  <Progress value={taskProgress} className="h-2" />
                </CardContent>
              </Card>

              {/* My Listings */}
              {myListings.length > 0 && (
                <Card variant="elevated" className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2"><Tag className="w-4 h-4 text-primary" />My Products</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {myListings.map(l => (
                      <div key={l.id} className="flex items-center justify-between p-3 rounded-xl bg-muted">
                        <div>
                          <p className="text-sm font-semibold">{l.title}</p>
                          <p className="text-xs text-muted-foreground">{l.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number" min="1" className="w-20 h-8 text-sm"
                            defaultValue={l.price}
                            onBlur={e => {
                              const v = parseFloat(e.target.value);
                              if (v > 0 && v !== l.price) adjustPrice(l, v);
                            }}
                          />
                          <span className="text-xs text-muted-foreground">IC</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* ─── Tasks Tab ──────────────────────────────────── */}
            <TabsContent value="tasks">
              {/* Header: business operations board with live progress */}
              <Card variant="elevated" className="mb-4">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="font-display text-lg font-extrabold flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-primary" /> Operations board
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Real founders show their work. Each task needs a short note on what you actually did.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-extrabold text-primary leading-none">{completedTasks}<span className="text-base text-muted-foreground font-bold">/{tasks.length}</span></p>
                      <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">done</p>
                    </div>
                  </div>
                  <Progress value={taskProgress} className="h-2 mt-4" />
                  {completedTasks === tasks.length && tasks.length > 0 && (
                    <p className="text-sm font-semibold text-success flex items-center gap-1.5 mt-3">
                      <PartyPopper className="w-4 h-4" /> All tasks complete — you're running a real operation!
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Task groups by department */}
              <div className="space-y-5">
                {tasksByCategory.map(group => {
                  const meta = TASK_CATEGORY_META[group.category] || { label: group.category, icon: ClipboardList, color: "#888" };
                  const MetaIcon = meta.icon;
                  const groupDone = group.items.filter(t => t.status === 'completed').length;
                  return (
                    <div key={group.category}>
                      <div className="flex items-center gap-2 mb-2 px-1">
                        <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${meta.color}1a` }}>
                          <MetaIcon className="w-3.5 h-3.5" />
                        </span>
                        <h4 className="text-sm font-bold" style={{ color: meta.color }}>{meta.label}</h4>
                        <span className="text-xs text-muted-foreground font-semibold">{groupDone}/{group.items.length}</span>
                      </div>
                      <div className="grid gap-2">
                        {group.items.map(task => {
                          const completed = task.status === 'completed';
                          const editing = activeTaskId === task.id;
                          const reflection = taskReflections[task.id];
                          return (
                            <div
                              key={task.id}
                              className="rounded-xl border bg-card overflow-hidden transition-colors"
                              style={{ borderColor: completed ? "rgba(29,158,117,0.3)" : "hsl(45 10% 86%)" }}
                            >
                              <div className="flex items-start gap-3 p-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${completed ? "bg-success/15" : "bg-muted"}`}>
                                  {completed
                                    ? <CheckCircle2 className="w-4 h-4 text-success" />
                                    : <Circle className="w-4 h-4 text-muted-foreground" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-semibold ${completed ? "text-muted-foreground" : ""}`}>{task.title}</p>
                                  {task.description && <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>}

                                  {/* Completed: show the saved reflection as proof of work */}
                                  {completed && reflection && (
                                    <div className="mt-2 rounded-lg bg-success/5 border border-success/15 p-2.5">
                                      <p className="text-[10px] font-bold uppercase tracking-wider text-success/80 flex items-center gap-1 mb-1">
                                        <PenLine className="w-3 h-3" /> Your work
                                      </p>
                                      <p className="text-xs text-foreground/80 whitespace-pre-wrap">{reflection}</p>
                                    </div>
                                  )}

                                  {/* Pending + editing: templated worksheet required before completing */}
                                  {!completed && editing && (() => {
                                    const tpl = TASK_TEMPLATES[task.title];
                                    return (
                                    <div className="mt-2.5 space-y-2.5">
                                      <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                        <Lightbulb className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                                        <span>{tpl?.guide || "Describe what you did to complete this — be specific. This is your record."}</span>
                                      </div>
                                      {tpl && tpl.starters.length > 0 && (
                                        <div className="space-y-1.5">
                                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Templates — tap one, then make it yours</p>
                                          {tpl.starters.map((s, si) => (
                                            <button
                                              key={si}
                                              type="button"
                                              onClick={() => setReflectionDraft(s)}
                                              className="w-full text-left rounded-lg border border-border bg-muted/40 hover:bg-muted px-3 py-2 transition-colors press-scale"
                                            >
                                              <span className="text-xs text-foreground/75 leading-snug">{s}</span>
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                      <Textarea
                                        autoFocus
                                        rows={4}
                                        placeholder={tpl?.placeholder || "Fill in your plan…"}
                                        value={reflectionDraft}
                                        onChange={e => setReflectionDraft(e.target.value)}
                                      />
                                      <div className="flex items-center justify-between">
                                        <span className={`text-[11px] font-semibold ${reflectionDraft.trim().length >= MIN_REFLECTION ? "text-success" : "text-muted-foreground"}`}>
                                          {reflectionDraft.trim().length}/{MIN_REFLECTION} min
                                        </span>
                                        <div className="flex gap-2">
                                          <Button size="sm" variant="outline" onClick={cancelTaskEditor}>Cancel</Button>
                                          <Button
                                            size="sm"
                                            disabled={savingTask || reflectionDraft.trim().length < MIN_REFLECTION}
                                            onClick={() => completeTask(task)}
                                          >
                                            {savingTask ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />}
                                            Mark done
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  ); })()}
                                </div>

                                {/* Right-side action / status */}
                                <div className="shrink-0">
                                  {completed ? (
                                    <Button size="sm" variant="ghost" className="text-xs text-muted-foreground h-7 px-2" onClick={() => reopenTask(task)}>
                                      Reopen
                                    </Button>
                                  ) : !editing ? (
                                    <Button size="sm" variant="outline" className="press-scale gap-1" onClick={() => openTaskEditor(task)}>
                                      Complete <ArrowRight className="w-3.5 h-3.5" />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* ─── Marketplace Tab ────────────────────────────── */}
            <TabsContent value="market">
              <div className="grid md:grid-cols-2 gap-6">
                {/* List an Item */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Plus className="w-5 h-5 text-primary" />Sell on Marketplace</CardTitle>
                    <CardDescription>List products or services for other students to buy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!showListItem ? (
                      <Button variant="outline" className="w-full press-scale" onClick={() => setShowListItem(true)}>
                        <Plus className="w-4 h-4 mr-2" /> List an Item
                      </Button>
                    ) : (
                      <form onSubmit={handleListItem} className="space-y-3">
                        <Input placeholder="Product / service name" value={listTitle} onChange={e => setListTitle(e.target.value)} required />
                        <Textarea placeholder="Description (optional)" value={listDesc} onChange={e => setListDesc(e.target.value)} rows={2} />
                        <Input type="number" placeholder="Price (InvestiCoins)" value={listPrice} onChange={e => setListPrice(e.target.value)} required min="1" step="1" />
                        <Select value={listCategory} onValueChange={setListCategory}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="service">Service</SelectItem>
                            <SelectItem value="digital">Digital</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" className="flex-1" onClick={() => setShowListItem(false)}>Cancel</Button>
                          <Button type="submit" className="flex-1">List Item</Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>

                {/* Browse */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary" />Browse Marketplace</CardTitle>
                    <CardDescription>{listings.length} items from other students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {listings.length > 0 ? (
                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {listings.map(listing => (
                          <div key={listing.id} className="flex items-center justify-between p-3 rounded-xl bg-muted">
                            <div className="flex-1 min-w-0 mr-3">
                              <p className="text-sm font-semibold truncate">{listing.title}</p>
                              {listing.description && <p className="text-xs text-muted-foreground truncate">{listing.description}</p>}
                              <Badge variant="outline" className="text-[10px] mt-1">{listing.category}</Badge>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-sm font-bold flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" />{listing.price.toLocaleString()}</span>
                              <Button size="sm" variant="outline" className="press-scale" onClick={() => handleBuyListing(listing)}>Buy</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-sm text-muted-foreground py-8">No items listed yet. Be the first seller!</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ─── Grow Tab ───────────────────────────────────── */}
            <TabsContent value="grow">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Marketing Campaigns */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Megaphone className="w-5 h-5 text-primary" />Marketing Campaigns</CardTitle>
                    <CardDescription>Invest in marketing to boost revenue</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {MARKETING_CAMPAIGNS.map((c, i) => (
                      <div key={i} className="p-3 rounded-xl bg-muted space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold">{c.name}</p>
                          <span className="text-xs text-gold font-bold flex items-center gap-0.5"><Coins className="w-3 h-3" />{c.cost}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{c.description}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-success">~{c.revenueBoost} IC if it lands</span>
                          <span className="text-muted-foreground flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />{Math.round(c.successRate * 100)}% success · can flop
                          </span>
                        </div>
                        <div className="flex justify-end">
                          <Button size="sm" variant="outline" className="press-scale" onClick={() => runCampaign(c)}>Run Campaign</Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Growth Upgrades */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" />Growth Upgrades</CardTitle>
                    <CardDescription>Scale your business with strategic investments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {GROWTH_UPGRADES.map((u, i) => {
                      const locked = business.level < u.levelReq;
                      return (
                        <div key={i} className={`p-3 rounded-xl bg-muted space-y-2 ${locked ? "opacity-50" : ""}`}>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">{u.name}</p>
                            <span className="text-xs text-gold font-bold flex items-center gap-0.5"><Coins className="w-3 h-3" />{u.cost}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{u.description}</p>
                          <div className="flex items-center justify-between">
                            {locked
                              ? <span className="text-xs text-muted-foreground">Requires Lvl {u.levelReq}</span>
                              : <span className="text-xs text-success">Available</span>}
                            <Button size="sm" variant="outline" className="press-scale" disabled={locked} onClick={() => buyUpgrade(u)}>
                              {locked ? "Locked" : "Purchase"}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
