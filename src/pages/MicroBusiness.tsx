import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  BookOpen, Gamepad2, ShoppingCart, Wrench, Layers
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

const MARKETING_CAMPAIGNS = [
  { name: "Social Media Buzz", cost: 50, revenueBoost: 30, description: "Post about your products to attract attention" },
  { name: "Flash Sale", cost: 25, revenueBoost: 60, description: "Discount items for a quick revenue boost" },
  { name: "Referral Program", cost: 75, revenueBoost: 45, description: "Reward customers for bringing friends" },
  { name: "Premium Ad Placement", cost: 150, revenueBoost: 100, description: "Featured listing in the marketplace" },
];

const GROWTH_UPGRADES = [
  { name: "Expand Product Line", cost: 200, levelReq: 1, description: "Add 2 more product slots to your store" },
  { name: "Hire Virtual Assistant", cost: 400, levelReq: 2, description: "Automate task completion (future)" },
  { name: "Premium Storefront", cost: 600, levelReq: 2, description: "Stand out with a featured store badge" },
  { name: "Bulk Supplier Deal", cost: 350, levelReq: 1, description: "Reduce cost of goods by 15%" },
];

const BUSINESS_START_COST = 500;

// ─── Component ──────────────────────────────────────────────────────

export default function MicroBusiness() {
  const { user, jeffsBalance, spendJeffs, earnJeffs } = useApp();
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

  if (!user) {
    navigate("/onboarding");
    return null;
  }

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

  const toggleTask = async (task: BusinessTask) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    if (!useLocalMode) {
      await supabase.from('business_tasks').update({ status: newStatus }).eq('id', task.id);
    }

    if (newStatus === 'completed') {
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
    }
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
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

    // Simulate revenue boost
    const boostedRevenue = campaign.revenueBoost + Math.round(Math.random() * campaign.revenueBoost * 0.5);
    earnJeffs(boostedRevenue, `Campaign revenue: ${campaign.name}`);

    if (!useLocalMode) {
      await supabase.from('business_finances').insert({
        business_id: business.id,
        revenue: boostedRevenue,
        expenses: campaign.cost,
        notes: `Campaign: ${campaign.name}`
      });
    }

    setTotalRevenue(prev => prev + boostedRevenue);
    setTotalExpenses(prev => prev + campaign.cost);
    toast.success(`${campaign.name} complete!`, {
      description: `Spent ${campaign.cost} · Earned ${boostedRevenue} InvestiCoins`
    });
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
          <div className="max-w-2xl mx-auto">
            <Card variant="elevated">
              <CardHeader className="text-center">
                <Store className="w-14 h-14 mx-auto text-primary/30 mb-2" />
                <CardTitle className="text-2xl">Start Your Business</CardTitle>
                <CardDescription>
                  Build your entrepreneurial empire step by step
                  <span className="block mt-1 text-gold font-semibold">Startup cost: {BUSINESS_START_COST.toLocaleString()} InvestiCoins</span>
                </CardDescription>
                {/* Progress */}
                <div className="flex items-center gap-2 mt-4">
                  {[0, 1, 2, 3].map(s => (
                    <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= createStep ? "bg-primary" : "bg-muted"}`} />
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
                      How would you allocate your startup budget across these areas? This decision shapes your strategy.
                    </p>
                    {BUDGET_AREAS.map(area => {
                      const Icon = area.icon;
                      return (
                        <div key={area.key} className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium">{area.label}</span>
                              <span className="text-muted-foreground">{bizBudget[area.key]}%</span>
                            </div>
                            <input
                              type="range" min="0" max="100" step="5"
                              value={bizBudget[area.key]}
                              onChange={e => setBizBudget(prev => ({ ...prev, [area.key]: Number(e.target.value) }))}
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

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => setCreateStep(2)}>Back</Button>
                      <Button className="flex-1" disabled={creatingBusiness} onClick={handleCreateBusiness}>
                        {creatingBusiness ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                        {creatingBusiness ? "Launching..." : "Launch Business"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
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
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ClipboardList className="w-5 h-5 text-primary" />Business Tasks</CardTitle>
                  <CardDescription>Complete tasks to earn InvestiCoins and level up</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {tasks.map(task => (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(task)}
                        className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:bg-muted/40 press-scale ${task.status === 'completed' ? 'opacity-60' : ''}`}
                      >
                        {task.status === 'completed'
                          ? <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                          : <Circle className="w-5 h-5 text-muted-foreground shrink-0" />}
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${task.status === 'completed' ? 'line-through' : ''}`}>{task.title}</p>
                          {task.description && <p className="text-xs text-muted-foreground">{task.description}</p>}
                        </div>
                        <Badge variant="outline" className="text-[10px]">{task.category}</Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-success">Est. return: ~{c.revenueBoost}+ IC</span>
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
