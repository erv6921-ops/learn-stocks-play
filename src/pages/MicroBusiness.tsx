import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameNav from "@/components/GameNav";
import MicroBusinessOffice from "@/components/MicroBusinessOffice";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Store, Coins, Rocket, Trophy, ArrowRight, ArrowLeft, RefreshCw, Sparkles,
  TrendingUp, TrendingDown, Newspaper, Target, Skull, Heart, CheckCircle2,
  DollarSign, Users, Megaphone, Building2, Lightbulb, Wallet, Package,
  Monitor, Wrench, ChevronRight, Crown, Zap, PenLine, BarChart3, Loader2,
  Clock, Plus, Tag, ShoppingBag, Handshake, Calendar, Flame, Timer, Briefcase,
  type LucideIcon,
} from "lucide-react";
import {
  SEED_COST, START_HEALTH, OP_COOLDOWN_HOURS, BUSINESS_MONTH_DAYS, DAILY_SCALE,
  MODELS, IDEAS, RESEARCH, PROOFS, MIN_PROOF, EVENTS, UPGRADES, CAMPAIGNS,
  ZERO_MODS, viabilityTier, pickEvent, simulateDay, currentSeason,
  encodeSupply, parseSupply, activeDiscount, loadSim, saveSim, clearSim, clamp,
  type ModelKey, type Mods, type Tier, type MarketEvent, type MonthResult,
  type SimState, type Idea, type Upgrade, type Campaign,
} from "@/lib/businessEngine";

/* ── tiny audio feedback (no assets) ─────────────────────────────────── */
let _actx: AudioContext | null = null;
function blip(kind: "gain" | "loss" | "click") {
  try {
    _actx = _actx || new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = _actx; const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination); const t = ctx.currentTime;
    if (kind === "gain") { o.frequency.setValueAtTime(520, t); o.frequency.exponentialRampToValueAtTime(880, t + 0.16); }
    else if (kind === "loss") { o.frequency.setValueAtTime(420, t); o.frequency.exponentialRampToValueAtTime(170, t + 0.26); }
    else { o.frequency.setValueAtTime(660, t); }
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    o.start(t); o.stop(t + 0.32);
  } catch { /* audio unavailable */ }
}

function CountUp({ value, className }: { value: number; className?: string }) {
  const [disp, setDisp] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const from = prev.current, to = value, t0 = performance.now(), dur = 600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      setDisp(Math.round(from + (to - from) * e));
      if (p < 1) raf = requestAnimationFrame(tick); else prev.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className={className}>{disp.toLocaleString()}</span>;
}

function Confetti({ fire }: { fire: number }) {
  const colors = ["#1D9E75", "#EF9F27", "#2bb673", "#3b82f6", "#ec4899", "#eab308"];
  const pieces = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i, x: (Math.random() * 2 - 1) * 160, r: Math.random() * 540, dur: 1.1 + Math.random() * 0.9,
    c: colors[i % colors.length], delay: Math.random() * 0.18, w: 7 + Math.random() * 6,
  })), [fire]);
  if (!fire) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map(p => (
        <motion.div key={`${fire}-${p.id}`}
          initial={{ opacity: 1, top: "-5%", left: "50%", rotate: 0 }}
          animate={{ opacity: 0, top: "105%", left: `calc(50% + ${p.x}px)`, rotate: p.r }}
          transition={{ duration: p.dur, delay: p.delay, ease: "easeIn" }}
          style={{ position: "absolute", width: p.w, height: p.w * 1.4, borderRadius: 2, background: p.c }} />
      ))}
    </div>
  );
}

function HealthBar({ value }: { value: number }) {
  const color = value >= 66 ? "#1D9E75" : value >= 33 ? "#EF9F27" : "#dc2626";
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1">
          <Heart className="w-3 h-3" style={{ color }} /> Business health
        </span>
        <span className="text-xs font-bold tabular-nums" style={{ color }}>{Math.round(value)}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
        <motion.div className="h-full rounded-full" animate={{ width: `${value}%`, background: color }} transition={{ duration: 0.5 }} />
      </div>
    </div>
  );
}

const ONBOARD_STEPS: { key: string[]; label: string; icon: LucideIcon }[] = [
  { key: ["research"], label: "Research", icon: Target },
  { key: ["setup"], label: "Setup", icon: Wallet },
  { key: ["launch"], label: "Launch", icon: Rocket },
];
function PhaseRail({ phase }: { phase: string }) {
  const activeIdx = ONBOARD_STEPS.findIndex(s => s.key.includes(phase));
  return (
    <div className="flex items-center gap-1.5">
      {ONBOARD_STEPS.map((s, i) => {
        const done = i < activeIdx, active = i === activeIdx; const Icon = s.icon;
        return (
          <div key={s.label} className="flex-1">
            <div className="flex items-center gap-1.5">
              <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                done ? "bg-success/20 text-success" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
              <div className="h-1.5 flex-1 rounded-full overflow-hidden bg-muted">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: done ? "100%" : active ? "55%" : "0%", background: "hsl(var(--primary))" }} />
              </div>
            </div>
            <p className={cn("text-[10px] font-semibold mt-1 hidden sm:block", active ? "text-primary" : done ? "text-foreground/60" : "text-muted-foreground")}>{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}

function NewsFlash({ event }: { event: MarketEvent }) {
  const tone = event.type === "good" ? "#1D9E75" : event.type === "bad" ? "#dc2626" : "#6b7280";
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      className="rounded-2xl border-2 overflow-hidden relative" style={{ borderColor: `${tone}55`, background: "linear-gradient(135deg,#0f2d1e,#06291f)" }}>
      <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 gap-1.5" style={{ background: `${tone}22` }}>
        <Newspaper className="w-3.5 h-3.5" style={{ color: tone }} />
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: tone }}>Market News Flash</span>
      </div>
      <div className="px-4 pt-10 pb-4 flex items-start gap-3">
        <motion.span initial={{ rotate: -12, scale: 0.6 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.05 }} className="text-4xl leading-none">{event.emoji}</motion.span>
        <div>
          <h4 className="font-display font-extrabold text-white text-lg leading-tight">{event.title}</h4>
          <p className="text-white/60 text-sm mt-0.5">{event.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function SectionHead({ icon: Icon, step, title, sub, compact }: { icon: LucideIcon; step: string; title: string; sub?: string; compact?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center"><Icon className="w-4 h-4 text-primary" /></span>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">{step}</span>
      </div>
      <h2 className={cn("font-display font-extrabold tracking-tight", compact ? "text-lg mt-1" : "text-2xl mt-1.5")}>{title}</h2>
      {sub && <p className="text-sm text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function ResultRow({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-bold tabular-nums", tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : "")}>{value}</span>
    </div>
  );
}
function ResultCard({ title, result, cost = 0, decisionTitle }: { title: string; result: MonthResult; cost?: number; decisionTitle?: string }) {
  const net = result.net - cost;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card variant="elevated">
        <CardContent className="pt-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-display font-extrabold">{title}</p>
            <span className={cn("text-lg font-extrabold tabular-nums flex items-center gap-1", net >= 0 ? "text-success" : "text-destructive")}>
              {net >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {net >= 0 ? "+" : ""}{net.toLocaleString()} IC
            </span>
          </div>
          {decisionTitle && <Badge variant="outline" className="mb-3">{decisionTitle}</Badge>}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <ResultRow label="Units sold" value={result.units.toLocaleString()} />
            <ResultRow label="Avg price" value={`${result.price} IC`} />
            <ResultRow label="Revenue" value={`+${result.revenue.toLocaleString()}`} tone="good" />
            <ResultRow label="Cost of goods" value={`−${result.cogs.toLocaleString()}`} tone="bad" />
            <ResultRow label="Overhead" value={`−${result.fixed.toLocaleString()}`} tone="bad" />
            {cost > 0 && <ResultRow label="Move cost" value={`−${cost.toLocaleString()}`} tone="bad" />}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function LeaderboardCard({ board, label }: { board: { name: string; xp: number; you?: boolean }[]; label: string }) {
  return (
    <Card variant="elevated">
      <CardContent className="pt-5">
        <p className="text-sm font-bold flex items-center gap-1.5 mb-3"><Trophy className="w-4 h-4 text-gold" /> {label}</p>
        <div className="space-y-1.5">
          {board.length === 0 && <p className="text-sm text-muted-foreground text-center py-2">No earners yet — be the first!</p>}
          {board.map((r, i) => (
            <div key={i} className={cn("flex items-center gap-3 px-3 py-2 rounded-xl", r.you ? "bg-primary/10 border border-primary/30" : "bg-muted")}>
              <span className={cn("w-6 text-center font-extrabold tabular-nums", i === 0 ? "text-gold" : "text-muted-foreground")}>{i + 1}</span>
              <span className="flex-1 font-semibold text-sm truncate">{r.name}{r.you && <span className="text-primary"> (you)</span>}</span>
              <span className="font-bold tabular-nums text-sm flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" />{r.xp.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const screenAnim = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -16, scale: 0.98 },
  transition: { duration: 0.32, ease: [0.2, 0.7, 0.3, 1] as [number, number, number, number] },
};

interface Listing { id: string; seller_user_id: string; title: string; description: string | null; price: number; category: string; status: string }
type Phase = "loading" | "intro" | "research" | "setup" | "launch" | "hq" | "bankrupt";
const FIN_KEY = "investiplay_mb_fin"; // local-mode finance totals fallback
const BEST_PROFIT_KEY = "investiplay_mb_best_profit";

/* ════════════════════════════════════════════════════════════════════ */
export default function MicroBusiness() {
  const { jeffsBalance, spendJeffs, earnJeffs } = useApp();

  const [phase, setPhase] = useState<Phase>("loading");
  const [sim, setSimState] = useState<SimState | null>(null);
  const simRef = useRef<SimState | null>(null);

  // auth / local mode
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [useLocalMode, setUseLocalMode] = useState(false);

  // onboarding state
  const [idea, setIdea] = useState<Idea | null>(null);
  const [customName, setCustomName] = useState("");
  const [customModel, setCustomModel] = useState<ModelKey>("product");
  const [bizName, setBizName] = useState("");
  const [model, setModel] = useState<ModelKey>("product");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [proofs, setProofs] = useState<Record<string, string>>({});
  const [savedProofs, setSavedProofs] = useState<Record<string, boolean>>({});
  const [tier, setTier] = useState<Tier | null>(null);
  const [alloc, setAlloc] = useState({ marketing: 34, product: 33, operations: 33 });

  // launch
  const [launching, setLaunching] = useState(false);
  const [launchEvent, setLaunchEvent] = useState<MarketEvent | null>(null);
  const [launchResult, setLaunchResult] = useState<MonthResult | null>(null);

  // HQ — daily op result + market data + leaderboard
  const [opEvent, setOpEvent] = useState<MarketEvent | null>(null);
  const [opResult, setOpResult] = useState<MonthResult | null>(null);
  const [running, setRunning] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [listings, setListings] = useState<Listing[]>([]);
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [supplyDeals, setSupplyDeals] = useState<Listing[]>([]);
  const [board, setBoard] = useState<{ name: string; xp: number; you?: boolean }[]>([]);
  const [boardLabel, setBoardLabel] = useState("Class standings");
  const [recap, setRecap] = useState<{ net: number; days: number } | null>(null);

  // marketplace / supply forms
  const [listTitle, setListTitle] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [listCat, setListCat] = useState("product");
  const [supTitle, setSupTitle] = useState("");
  const [supDisc, setSupDisc] = useState(15);
  const [supDays, setSupDays] = useState(7);
  const [supPrice, setSupPrice] = useState("");

  // FX
  const [confetti, setConfetti] = useState(0);
  const [moneyFx, setMoneyFx] = useState<{ id: number; amount: number } | null>(null);
  const fxId = useRef(0);

  const season = useMemo(() => currentSeason(now), [now]);

  const showMoney = useCallback((amount: number) => {
    fxId.current += 1; const id = fxId.current; setMoneyFx({ id, amount });
    window.setTimeout(() => setMoneyFx(m => (m && m.id === id ? null : m)), 1400);
  }, []);

  const setSim = useCallback((updater: (s: SimState) => SimState) => {
    setSimState(prev => {
      if (!prev) return prev;
      const next = updater(prev); simRef.current = next; saveSim(next); return next;
    });
  }, []);

  /* ── leaderboard (real class data, with graceful fallback) ────────── */
  const localBoard = useCallback((): { name: string; xp: number; you?: boolean }[] => {
    const best = Number(localStorage.getItem(BEST_PROFIT_KEY) || 0);
    const seed = [{ name: "Maya R.", xp: 1840 }, { name: "Diego S.", xp: 1420 }, { name: "Priya K.", xp: 1180 }, { name: "Liam O.", xp: 760 }, { name: "Aisha M.", xp: 540 }];
    return [...seed, { name: "You", xp: best, you: true }].sort((a, b) => b.xp - a.xp).slice(0, 6);
  }, []);
  const loadBoard = useCallback(async () => {
    try {
      const { data: au } = await supabase.auth.getUser();
      const uid = au?.user?.id;
      if (!uid) { setBoard(localBoard()); setBoardLabel("Top founders (demo)"); return; }
      const { data: cm } = await supabase.from("class_members").select("class_id").eq("user_id", uid).limit(1).maybeSingle();
      const classId = (cm as any)?.class_id;
      if (!classId) { setBoard(localBoard()); setBoardLabel("Top founders (demo)"); return; }
      const { data, error } = await (supabase as any).rpc("get_class_leaderboard", { _class_id: classId });
      if (error || !data) { setBoard(localBoard()); setBoardLabel("Top founders (demo)"); return; }
      const rows = (data as any[]).map(r => ({ name: [r.first_name, r.last_name].filter(Boolean).join(" ") || "Student", xp: Number(r.xp) || 0, you: r.user_id === uid }))
        .sort((a, b) => b.xp - a.xp).slice(0, 8);
      setBoard(rows); setBoardLabel("Class leaderboard · season standings");
    } catch { setBoard(localBoard()); setBoardLabel("Top founders (demo)"); }
  }, [localBoard]);

  /* ── marketplace + supply listings ────────────────────────────────── */
  const demoListings = (): Listing[] => [
    { id: "d1", seller_user_id: "demo-a", title: "Custom Logo Design", description: "Pro logo by Pixel Studio", price: 40, category: "service", status: "active" },
    { id: "d2", seller_user_id: "demo-b", title: "Sticker 5-Pack", description: "Holographic die-cut set", price: 18, category: "product", status: "active" },
    { id: "d3", seller_user_id: "demo-c", title: "Math Tutoring (30m)", description: "Algebra & geometry help", price: 30, category: "service", status: "active" },
  ];
  const demoSupply = (): Listing[] => [
    { id: "s1", seller_user_id: "demo-d", title: "Bulk Materials Deal", description: encodeSupply(15, 7, "Cheaper supplies for a week"), price: 60, category: "supply", status: "active" },
    { id: "s2", seller_user_id: "demo-e", title: "Wholesale Partnership", description: encodeSupply(25, 5, "Big discount, short term"), price: 110, category: "supply", status: "active" },
  ];
  const loadMarket = useCallback(async (uid: string | null, local: boolean) => {
    if (local || !uid) {
      setListings(demoListings()); setSupplyDeals(demoSupply());
      try { const mine = JSON.parse(localStorage.getItem("investiplay_mb_listings") || "[]"); setMyListings(mine); } catch { setMyListings([]); }
      return;
    }
    try {
      const { data } = await supabase.from("marketplace_listings").select("*").eq("status", "active").order("created_at", { ascending: false }).limit(60);
      const all = (data || []) as Listing[];
      const others = all.filter(l => l.seller_user_id !== uid);
      setListings(others.filter(l => l.category !== "supply").concat(demoListings().slice(0, 1)));
      setSupplyDeals(others.filter(l => l.category === "supply").concat(demoSupply().slice(0, 1)));
      setMyListings(all.filter(l => l.seller_user_id === uid));
    } catch { setListings(demoListings()); setSupplyDeals(demoSupply()); }
  }, []);

  /* ── initial load: resume an in-progress venture, else onboarding ─── */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let uid: string | null = null; let local = true;
      try {
        const { data } = await supabase.auth.getUser();
        if (data?.user?.id) { uid = data.user.id; local = false; }
      } catch { /* guest */ }
      if (cancelled) return;
      setAuthUserId(uid); setUseLocalMode(local);
      const existing = loadSim();
      if (existing) {
        simRef.current = existing; setSimState(existing);
        setBizName(existing.name); setModel(existing.model); setAlloc(existing.alloc);
        setTier(viabilityTier(0).key === existing.tierKey ? viabilityTier(0) : viabilityTier(existing.tierKey === "hot" ? 80 : existing.tierKey === "risky" ? 50 : 10));
        setPhase("hq");
        loadMarket(uid, local); loadBoard();
      } else {
        setPhase("intro");
      }
    })();
    return () => { cancelled = true; };
  }, [loadMarket, loadBoard]);

  // ticking clock for cooldown countdown / season timer
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 15000); return () => clearInterval(id); }, []);

  /* ── derived ──────────────────────────────────────────────────────── */
  const researchScore = useMemo(() => RESEARCH.reduce((s, q) => s + (answers[q.id] ?? 0), 0), [answers]);
  const researchDone = RESEARCH.every(q => answers[q.id] != null) && PROOFS.every(p => savedProofs[p.id]);
  const totalAlloc = alloc.marketing + alloc.product + alloc.operations;
  const allocBalanced = totalAlloc === 100;

  const viaMult = tier ? tier.mult : sim ? sim.viaMult : 1;
  const cooldownMs = OP_COOLDOWN_HOURS * 3600 * 1000;
  const nextOpAt = sim?.lastOp ? new Date(sim.lastOp).getTime() + cooldownMs : 0;
  const canRunDay = !sim?.lastOp || now >= nextOpAt;
  const msLeft = Math.max(0, nextOpAt - now);

  /* ── persistence helpers ──────────────────────────────────────────── */
  const recordFinance = useCallback(async (bizId: string, revenue: number, expenses: number, notes: string) => {
    if (!useLocalMode && authUserId && !bizId.startsWith("local-")) {
      try { await supabase.from("business_finances").insert({ business_id: bizId, revenue, expenses, notes }); } catch { /* best effort */ }
    } else {
      try {
        const f = JSON.parse(localStorage.getItem(FIN_KEY) || "{\"r\":0,\"e\":0}");
        localStorage.setItem(FIN_KEY, JSON.stringify({ r: f.r + revenue, e: f.e + expenses }));
      } catch { /* ignore */ }
    }
  }, [useLocalMode, authUserId]);

  /* ── onboarding actions ───────────────────────────────────────────── */
  const resetOnboarding = () => {
    setIdea(null); setCustomName(""); setCustomModel("product"); setBizName(""); setModel("product");
    setAnswers({}); setProofs({}); setSavedProofs({}); setTier(null);
    setAlloc({ marketing: 34, product: 33, operations: 33 });
    setLaunchEvent(null); setLaunchResult(null); setOpEvent(null); setOpResult(null);
  };
  const startNewVenture = () => { clearSim(); setSimState(null); simRef.current = null; resetOnboarding(); setPhase("intro"); blip("click"); };

  const saveProof = (id: string, label: string) => {
    const text = (proofs[id] || "").trim();
    if (text.length < MIN_PROOF) { toast.error("Add a bit more detail", { description: `At least ${MIN_PROOF} characters — be specific.` }); return; }
    if (savedProofs[id]) return;
    setSavedProofs(p => ({ ...p, [id]: true }));
    earnJeffs(5, `Market research: ${label}`); blip("gain");
    toast.success("+5 InvestiCoins", { description: label });
  };
  const finishResearch = () => {
    const t = viabilityTier(researchScore); setTier(t);
    if (idea) { setBizName(idea.name); setModel(idea.model); } else { setBizName(customName.trim() || "My Venture"); setModel(customModel); }
    setPhase("setup"); blip("click");
  };
  const presetAlloc = (m: number, p: number, o: number) => setAlloc({ marketing: m, product: p, operations: o });

  /* ── launch: create + persist the business, run day 1 ─────────────── */
  const startLaunch = async () => {
    if (!allocBalanced || !bizName.trim() || !tier) return;
    if (jeffsBalance < SEED_COST) { toast.error(`You need ${(SEED_COST - jeffsBalance).toLocaleString()} more InvestiCoins to launch`, { description: "Earn more in Missions or the Stock sim." }); return; }
    setPhase("launch"); setLaunching(true);
    spendJeffs(SEED_COST, `Seed investment: ${bizName}`); showMoney(-SEED_COST); blip("click");

    // create the business record (auth → Supabase, else local id)
    let bizId = `local-${crypto.randomUUID()}`;
    if (!useLocalMode && authUserId) {
      try {
        const { data, error } = await supabase.from("businesses").insert({ user_id: authUserId, name: bizName.trim(), type: model }).select().single();
        if (!error && data) bizId = data.id;
      } catch { /* fall back to local id */ }
    }
    await recordFinance(bizId, 0, SEED_COST, `Startup — ${bizName}`);

    const ev = pickEvent(); setLaunchEvent(ev);
    const baseMods: Mods = { ...ZERO_MODS };
    const result = simulateDay(model, alloc, baseMods, tier.mult, ev.mult, START_HEALTH, 0);
    await recordFinance(bizId, result.revenue, result.expenses + (ev.opex || 0), `Launch day — ${ev.title}`);

    const newState: SimState = {
      bizId, name: bizName.trim(), model, alloc, viaMult: tier.mult, tierKey: tier.key,
      mods: baseMods, health: clamp(START_HEALTH + (result.net > 0 ? 6 : -6), 0, 100),
      day: 1, lastOp: null, deals: [],
      totalRevenue: result.revenue, totalExpenses: SEED_COST + result.expenses + (ev.opex || 0),
      monthBaseRev: result.revenue, monthBaseExp: SEED_COST + result.expenses + (ev.opex || 0), startedAt: Date.now(),
    };
    simRef.current = newState; setSimState(newState); saveSim(newState);
    setLaunchResult(result);

    // apply the day's net to the real InvestiCoins balance
    if (result.net > 0) { earnJeffs(result.net, `${bizName}: launch day`); }
    else if (result.net < 0) { spendJeffs(Math.min(-result.net, jeffsBalance), `${bizName}: launch day`); }
    showMoney(result.net);
    if (result.net > 0) setConfetti(c => c + 1);

    window.setTimeout(() => { setLaunching(false); loadMarket(authUserId, useLocalMode); loadBoard(); }, 2600);
    blip(result.net >= 0 ? "gain" : "loss");
  };

  /* ── daily operations ─────────────────────────────────────────────── */
  const runDay = (force = false) => {
    if (!sim || running) return;
    if (!force && !canRunDay) return;
    setRunning(true);
    const ev = pickEvent(); setOpEvent(ev);
    const disc = activeDiscount(sim.deals, sim.day);
    const result = simulateDay(sim.model, sim.alloc, sim.mods, sim.viaMult, ev.mult, sim.health, disc);
    setOpResult(result);

    const expWithEvent = result.expenses + (ev.opex || 0);
    recordFinance(sim.bizId, result.revenue, expWithEvent, `Day ${sim.day + 1} — ${ev.title}`);

    const balBefore = jeffsBalance;
    const evOpex = ev.opex || 0;
    const net = result.net - evOpex;
    if (net > 0) earnJeffs(net, `${sim.name}: operations`); else if (net < 0) spendJeffs(Math.min(-net, balBefore), `${sim.name}: operations`);
    showMoney(net); blip(net >= 0 ? "gain" : "loss");
    if (net > 0 && ev.type === "good") setConfetti(c => c + 1);

    const newDay = sim.day + 1;
    const newHealth = clamp(sim.health + (net > 0 ? 5 : -8), 0, 100);
    setSim(s => ({
      ...s, day: newDay, lastOp: new Date().toISOString(), health: newHealth,
      deals: s.deals.filter(d => d.expiresDay > newDay),
      totalRevenue: s.totalRevenue + result.revenue, totalExpenses: s.totalExpenses + expWithEvent,
    }));

    // bankruptcy
    if (balBefore + net <= 0) { window.setTimeout(() => setPhase("bankrupt"), 700); }
    // monthly recap
    else if (newDay % BUSINESS_MONTH_DAYS === 0) {
      window.setTimeout(() => {
        const s = simRef.current!;
        const monthNet = (s.totalRevenue - s.monthBaseRev) - (s.totalExpenses - s.monthBaseExp);
        setRecap({ net: monthNet, days: BUSINESS_MONTH_DAYS });
        if (monthNet > 0) {
          const bonus = 30 + Math.round(monthNet * 0.1);
          earnJeffs(bonus, `${s.name}: profitable month bonus`); showMoney(bonus); setConfetti(c => c + 1);
          const prevBest = Number(localStorage.getItem(BEST_PROFIT_KEY) || 0);
          if (s.totalRevenue - s.totalExpenses > prevBest) localStorage.setItem(BEST_PROFIT_KEY, String(s.totalRevenue - s.totalExpenses));
          loadBoard();
        }
        setSim(st => ({ ...st, monthBaseRev: st.totalRevenue, monthBaseExp: st.totalExpenses }));
      }, 750);
    }
    window.setTimeout(() => setRunning(false), 400);
  };

  /* ── invest / campaigns ───────────────────────────────────────────── */
  const buyUpgrade = (u: Upgrade) => {
    if (!sim) return;
    if (jeffsBalance < u.cost) { toast.error("Not enough InvestiCoins", { description: `${u.title} costs ${u.cost} IC.` }); return; }
    spendJeffs(u.cost, u.title); showMoney(-u.cost); blip("click");
    recordFinance(sim.bizId, 0, u.cost, `Upgrade: ${u.title}`);
    setSim(s => ({ ...s, mods: u.apply(s.mods), health: clamp(s.health + (u.health || 0), 0, 100), totalExpenses: s.totalExpenses + u.cost }));
    toast.success(`${u.title} ✓`, { description: u.blurb });
  };
  const runCampaign = (c: Campaign) => {
    if (!sim) return;
    if (jeffsBalance < c.cost) { toast.error("Not enough InvestiCoins", { description: `${c.name} costs ${c.cost} IC.` }); return; }
    spendJeffs(c.cost, `Campaign: ${c.name}`); blip("click");
    const success = Math.random() < c.successRate;
    const payoff = success ? c.payoff + Math.round(Math.random() * c.payoff * 0.4) : Math.round(c.payoff * Math.random() * 0.2);
    if (payoff > 0) earnJeffs(payoff, `Campaign revenue: ${c.name}`);
    recordFinance(sim.bizId, payoff, c.cost, `Campaign: ${c.name}${success ? "" : " (flop)"}`);
    const net = payoff - c.cost; showMoney(net); blip(net >= 0 ? "gain" : "loss");
    setSim(s => ({ ...s, totalRevenue: s.totalRevenue + payoff, totalExpenses: s.totalExpenses + c.cost }));
    if (success && net >= 0) toast.success(`${c.name} paid off! +${net} IC net`);
    else toast.error(`${c.name} underperformed`, { description: `Spent ${c.cost} · earned ${payoff}` });
  };

  /* ── marketplace actions ──────────────────────────────────────────── */
  const listItem = async () => {
    const price = parseFloat(listPrice);
    if (!listTitle.trim() || isNaN(price) || price <= 0) { toast.error("Enter a name and a price"); return; }
    const row: Listing = { id: crypto.randomUUID(), seller_user_id: authUserId || "me", title: listTitle.trim(), description: `${listCat} by ${sim?.name || "you"}`, price, category: listCat, status: "active" };
    if (!useLocalMode && authUserId) {
      try { const { data } = await supabase.from("marketplace_listings").insert({ seller_user_id: authUserId, title: row.title, description: row.description, price, category: listCat }).select().single(); if (data) row.id = data.id; } catch { /* ignore */ }
    } else {
      const mine = [...myListings, row]; localStorage.setItem("investiplay_mb_listings", JSON.stringify(mine));
    }
    setMyListings(m => [...m, row]); setListTitle(""); setListPrice("");
    toast.success("Listed on the marketplace!"); blip("gain");
  };
  const buyListing = async (l: Listing) => {
    if (jeffsBalance < l.price) { toast.error("Not enough InvestiCoins", { description: `Costs ${l.price} IC.` }); return; }
    if (!spendJeffs(l.price, `Bought: ${l.title}`)) return;
    showMoney(-l.price); blip("click");
    if (!useLocalMode && authUserId && !l.seller_user_id.startsWith("demo-")) {
      try {
        await supabase.from("purchases").insert({ buyer_user_id: authUserId, listing_id: l.id, seller_user_id: l.seller_user_id, price: l.price });
        const { data: sellerBiz } = await supabase.from("businesses").select("id").eq("user_id", l.seller_user_id).limit(1).maybeSingle();
        if (sellerBiz) await supabase.from("business_finances").insert({ business_id: (sellerBiz as any).id, revenue: l.price, expenses: 0, notes: `Sale: ${l.title}` });
      } catch { /* ignore */ }
    }
    toast.success(`Bought "${l.title}" from a classmate`);
    loadMarket(authUserId, useLocalMode);
  };

  /* ── B2B supply deals ─────────────────────────────────────────────── */
  const listSupply = async () => {
    const price = parseFloat(supPrice);
    if (!supTitle.trim() || isNaN(price) || price <= 0) { toast.error("Enter a title and price"); return; }
    const desc = encodeSupply(supDisc, supDays, supTitle.trim());
    const row: Listing = { id: crypto.randomUUID(), seller_user_id: authUserId || "me", title: supTitle.trim(), description: desc, price, category: "supply", status: "active" };
    if (!useLocalMode && authUserId) {
      try { const { data } = await supabase.from("marketplace_listings").insert({ seller_user_id: authUserId, title: row.title, description: desc, price, category: "supply" }).select().single(); if (data) row.id = data.id; } catch { /* ignore */ }
    }
    setMyListings(m => [...m, row]); setSupTitle(""); setSupPrice("");
    toast.success("Supply deal posted for your classmates!"); blip("gain");
  };
  const buySupply = async (l: Listing) => {
    if (!sim) return;
    const parsed = parseSupply(l.description); if (!parsed) return;
    if (jeffsBalance < l.price) { toast.error("Not enough InvestiCoins", { description: `Deal costs ${l.price} IC.` }); return; }
    if (!spendJeffs(l.price, `Supply deal: ${l.title}`)) return;
    showMoney(-l.price); blip("click");
    recordFinance(sim.bizId, 0, l.price, `Supply deal: ${l.title}`);
    if (!useLocalMode && authUserId && !l.seller_user_id.startsWith("demo-")) {
      try {
        await supabase.from("purchases").insert({ buyer_user_id: authUserId, listing_id: l.id, seller_user_id: l.seller_user_id, price: l.price });
        const { data: sellerBiz } = await supabase.from("businesses").select("id").eq("user_id", l.seller_user_id).limit(1).maybeSingle();
        if (sellerBiz) await supabase.from("business_finances").insert({ business_id: (sellerBiz as any).id, revenue: l.price, expenses: 0, notes: `Supply sale: ${l.title}` });
      } catch { /* ignore */ }
    }
    setSim(s => ({ ...s, totalExpenses: s.totalExpenses + l.price, deals: [...s.deals.filter(d => d.expiresDay > s.day), { title: l.title, disc: parsed.disc, expiresDay: s.day + parsed.days }] }));
    toast.success(`Supplier locked in! −${parsed.disc}% cost of goods for ${parsed.days} days`);
  };

  /* ════════════════════════ RENDER ════════════════════════════════════ */
  const profit = sim ? sim.totalRevenue - sim.totalExpenses : 0;
  const ModelBadge = ({ k }: { k: ModelKey }) => { const M = MODELS[k]; const Icon = M.icon; return <span className="inline-flex items-center gap-1 text-xs font-bold text-primary"><Icon className="w-3.5 h-3.5" /> {M.label}</span>; };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <Confetti fire={confetti} />

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {/* ── Top HUD ─────────────────────────────────────────────── */}
        <div className="hud-panel p-4 md:p-5 mb-5 relative z-10">
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <Store className="w-5 h-5 text-accent shrink-0" />
                <h1 className="font-display text-lg md:text-xl font-extrabold text-white tracking-tight truncate">
                  {phase === "intro" || phase === "loading" ? "Micro-Business Mode" : bizName || "Your Venture"}
                </h1>
                {tier && phase !== "intro" && phase !== "loading" && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: `${tier.color}22`, color: tier.color }}>{tier.emoji} {tier.label}</span>
                )}
              </div>
              <div className="relative">
                <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-center">
                  <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">InvestiCoins</p>
                  <p className="text-base font-extrabold text-gold flex items-center gap-1 justify-center"><Coins className="w-4 h-4" /><CountUp value={jeffsBalance} /></p>
                </div>
                <AnimatePresence>
                  {moneyFx && (
                    <motion.div key={moneyFx.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: -22 }} exit={{ opacity: 0, y: -34 }} transition={{ duration: 0.5 }}
                      className={cn("absolute -top-1 right-2 text-sm font-extrabold pointer-events-none", moneyFx.amount >= 0 ? "text-success" : "text-destructive")}>
                      {moneyFx.amount >= 0 ? `+${moneyFx.amount.toLocaleString()} 💰` : `${moneyFx.amount.toLocaleString()} 📉`}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            {(phase === "research" || phase === "setup" || phase === "launch") && <PhaseRail phase={phase} />}
            {phase === "hq" && sim && (
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/5 rounded-lg px-2 py-1.5 text-center"><p className="text-[9px] text-white/40 uppercase font-bold">Day</p><p className="text-sm font-extrabold text-white">{sim.day} <span className="text-white/40 text-xs">· Mo {Math.floor((sim.day - 1) / BUSINESS_MONTH_DAYS) + 1}</span></p></div>
                <div className="bg-white/5 rounded-lg px-2 py-1.5 text-center"><p className="text-[9px] text-white/40 uppercase font-bold">Profit</p><p className={cn("text-sm font-extrabold", profit >= 0 ? "text-success" : "text-destructive")}>{profit >= 0 ? "+" : ""}{profit.toLocaleString()}</p></div>
                <div className="bg-white/5 rounded-lg px-2 py-1.5"><HealthBar value={sim.health} /></div>
              </div>
            )}
          </div>
        </div>

        {phase === "loading" && <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}

        <AnimatePresence mode="wait">
          {/* ═══ INTRO ═══ */}
          {phase === "intro" && (
            <motion.div key="intro" {...screenAnim}>
              <div className="relative overflow-hidden rounded-3xl p-7 md:p-9 text-center mb-5" style={{ background: "linear-gradient(135deg,#0f2d1e 0%,#14432e 55%,#1D9E75 150%)" }}>
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 25% 30%, white 1.5px, transparent 1.5px)", backgroundSize: "22px 22px" }} />
                <div className="relative z-10">
                  <motion.div initial={{ scale: 0.5, rotate: -12, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 13, delay: 0.1 }}
                    className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center" style={{ background: "rgba(245,159,39,0.18)", border: "1px solid rgba(245,159,39,0.3)" }}><Rocket className="w-8 h-8 text-gold" /></motion.div>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">Build a business from scratch</h2>
                  <p className="text-white/60 text-sm mt-2 max-w-md mx-auto">Research a market, launch, then run it day by day — sell to classmates, strike supplier deals, and climb the class leaderboard over a whole season.</p>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    {[{ icon: Target, t: "Research" }, { icon: Rocket, t: "Launch" }, { icon: Store, t: "Run it daily" }, { icon: Trophy, t: "Compete" }].map(v => (
                      <span key={v.t} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white/90" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}><v.icon className="w-3.5 h-3.5 text-gold" /> {v.t}</span>
                    ))}
                  </div>
                  <Button size="lg" className="mt-6 press-scale gap-2 text-base" onClick={() => { resetOnboarding(); setPhase("research"); blip("click"); }}>Start a venture <ArrowRight className="w-5 h-5" /></Button>
                  <p className="text-white/40 text-xs mt-2">Startup cost: <span className="text-gold font-bold">{SEED_COST} InvestiCoins</span></p>
                </div>
              </div>
              <LeaderboardCard board={board.length ? board : localBoard()} label={boardLabel} />
            </motion.div>
          )}

          {/* ═══ RESEARCH ═══ */}
          {phase === "research" && (
            <motion.div key="research" {...screenAnim} className="space-y-5">
              <SectionHead icon={Target} step="Phase 1" title="Market Research" sub="Pick an idea, then prove you understand the market. Smart research = a stronger launch." />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {IDEAS.map(opt => { const Icon = opt.icon; const on = idea?.id === opt.id; return (
                  <button key={opt.id} onClick={() => { setIdea(opt); blip("click"); }} className={cn("p-3 rounded-2xl border text-left transition-all press-scale", on ? "border-primary bg-primary/10 ring-2 ring-primary/30" : "border-border bg-card hover:bg-muted")}>
                    <Icon className="w-6 h-6 mb-1.5" style={{ color: opt.color }} />
                    <p className="text-sm font-bold leading-tight">{opt.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{opt.blurb}</p>
                    <span className="mt-1 inline-flex"><ModelBadge k={opt.model} /></span>
                  </button>); })}
              </div>
              <Card variant="elevated"><CardContent className="pt-5 space-y-3">
                <p className="text-sm font-bold flex items-center gap-1.5"><Lightbulb className="w-4 h-4 text-gold" /> …or invent your own</p>
                <Input placeholder="Your business idea" value={customName} maxLength={42} onChange={e => { setCustomName(e.target.value); if (e.target.value.trim()) setIdea(null); }} />
                {!idea && customName.trim() && (
                  <div className="flex gap-2">{(Object.keys(MODELS) as ModelKey[]).map(k => { const M = MODELS[k]; const Icon = M.icon; const on = customModel === k; return (
                    <button key={k} onClick={() => setCustomModel(k)} className={cn("flex-1 p-2.5 rounded-xl border text-center transition-all press-scale", on ? "border-primary bg-primary/10" : "border-border bg-muted")}>
                      <Icon className={cn("w-5 h-5 mx-auto mb-1", on ? "text-primary" : "text-muted-foreground")} /><p className="text-xs font-bold">{M.label}</p></button>); })}</div>
                )}
              </CardContent></Card>
              {(idea || customName.trim()) && (<>
                <Card variant="elevated"><CardContent className="pt-5 space-y-4">
                  <p className="text-sm font-bold flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-primary" /> Market research</p>
                  {RESEARCH.map(q => (
                    <div key={q.id}>
                      <p className="text-sm font-semibold mb-2">{q.q}</p>
                      <div className="grid gap-2">{q.options.map((o, i) => { const on = answers[q.id] === o.pts; return (
                        <button key={i} onClick={() => setAnswers(a => ({ ...a, [q.id]: o.pts }))} className={cn("text-left px-3 py-2.5 rounded-xl border text-sm font-medium transition-all press-scale flex items-center justify-between", on ? "border-primary bg-primary/10" : "border-border bg-muted hover:bg-muted/70")}>
                          {o.label}{on && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}</button>); })}</div>
                    </div>
                  ))}
                </CardContent></Card>
                <Card variant="elevated"><CardContent className="pt-5 space-y-4">
                  <p className="text-sm font-bold flex items-center gap-1.5"><PenLine className="w-4 h-4 text-primary" /> Founder tasks — show your work (+5 IC each)</p>
                  {PROOFS.map(p => { const saved = !!savedProofs[p.id]; return (
                    <div key={p.id} className={cn("rounded-xl border p-3 transition-colors", saved ? "border-success/40 bg-success/5" : "border-border bg-muted/40")}>
                      <div className="flex items-center justify-between mb-1.5"><p className="text-sm font-semibold">{p.label}</p>{saved && <span className="text-xs font-bold text-success flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Done</span>}</div>
                      <Textarea rows={2} placeholder={p.placeholder} value={proofs[p.id] || ""} disabled={saved} onChange={e => setProofs(pr => ({ ...pr, [p.id]: e.target.value }))} />
                      {!saved && (<div className="flex items-center justify-between mt-2">
                        <span className={cn("text-[11px] font-semibold", (proofs[p.id] || "").trim().length >= MIN_PROOF ? "text-success" : "text-muted-foreground")}>{(proofs[p.id] || "").trim().length}/{MIN_PROOF} min</span>
                        <Button size="sm" variant="outline" className="press-scale" disabled={(proofs[p.id] || "").trim().length < MIN_PROOF} onClick={() => saveProof(p.id, p.label)}>Save</Button></div>)}
                    </div>); })}
                </CardContent></Card>
                <div className="flex items-center justify-between gap-3">
                  <Button variant="ghost" onClick={() => setPhase("intro")} className="gap-1"><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button className="press-scale gap-2 flex-1 sm:flex-none" disabled={!researchDone} onClick={finishResearch}>Reveal market viability <ArrowRight className="w-4 h-4" /></Button>
                </div>
              </>)}
            </motion.div>
          )}

          {/* ═══ SETUP ═══ */}
          {phase === "setup" && tier && (
            <motion.div key="setup" {...screenAnim} className="space-y-5">
              <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="rounded-2xl p-5 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0f2d1e,#06291f)" }}>
                <div className="text-5xl mb-1">{tier.emoji}</div>
                <p className="font-display text-xl font-extrabold text-white">{tier.label}</p>
                <p className="text-white/60 text-sm mt-1 max-w-sm mx-auto">{tier.note}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold" style={{ background: `${tier.color}22`, color: tier.color }}>Viability {researchScore}/100 · traction ×{tier.mult}</div>
              </motion.div>
              <SectionHead icon={Wallet} step="Phase 2" title="Business Setup" sub="Name it, lock your model, and decide how to deploy your budget." />
              <Card variant="elevated"><CardContent className="pt-5 space-y-4">
                <div><label className="text-sm font-semibold">Business name</label><Input value={bizName} maxLength={42} onChange={e => setBizName(e.target.value)} className="mt-1.5" /></div>
                <div><label className="text-sm font-semibold">Business model</label>
                  <div className="grid grid-cols-3 gap-2 mt-1.5">{(Object.keys(MODELS) as ModelKey[]).map(k => { const M = MODELS[k]; const Icon = M.icon; const on = model === k; return (
                    <button key={k} onClick={() => setModel(k)} className={cn("p-3 rounded-xl border text-center transition-all press-scale", on ? "border-primary bg-primary/10 ring-2 ring-primary/30" : "border-border bg-muted")}>
                      <Icon className={cn("w-6 h-6 mx-auto mb-1", on ? "text-primary" : "text-muted-foreground")} /><p className="text-sm font-bold">{M.label}</p></button>); })}</div>
                  <p className="text-xs text-muted-foreground mt-2">{MODELS[model].desc}</p>
                </div>
              </CardContent></Card>
              <Card variant="elevated"><CardContent className="pt-5 space-y-4">
                <p className="text-sm font-bold flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-primary" /> Allocate your {SEED_COST} IC budget</p>
                <div className={cn("rounded-xl border p-3 transition-colors", allocBalanced ? "border-success/40 bg-success/5" : "border-warning/40 bg-warning/5")}>
                  <div className="flex items-center justify-between text-sm mb-2"><span className="font-semibold flex items-center gap-1.5"><Wallet className="w-4 h-4" /> Allocated: {totalAlloc}%</span>
                    <span className={cn("font-bold", allocBalanced ? "text-success" : "text-warning")}>{allocBalanced ? "Fully allocated ✓" : totalAlloc < 100 ? `${100 - totalAlloc}% left` : `Over by ${totalAlloc - 100}%`}</span></div>
                  <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden flex"><div className="h-full" style={{ width: `${alloc.marketing}%`, background: "#EF9F27" }} /><div className="h-full" style={{ width: `${alloc.product}%`, background: "#1D9E75" }} /><div className="h-full" style={{ width: `${alloc.operations}%`, background: "#3b82f6" }} /></div>
                </div>
                {[{ key: "marketing", label: "Marketing", icon: Megaphone, color: "#EF9F27", hint: "finds customers" }, { key: "product", label: "Product Dev", icon: Package, color: "#1D9E75", hint: "raises price & quality" }, { key: "operations", label: "Operations", icon: Building2, color: "#3b82f6", hint: "fulfills more orders" }].map(area => {
                  const Icon = area.icon; const others = (["marketing", "product", "operations"] as const).filter(k => k !== area.key).reduce((s, k) => s + (alloc as any)[k], 0); const maxForThis = 100 - others;
                  return (<div key={area.key} className="flex items-center gap-3"><Icon className="w-5 h-5 shrink-0" style={{ color: area.color }} />
                    <div className="flex-1"><div className="flex justify-between text-sm mb-1"><span className="font-medium">{area.label} <span className="text-muted-foreground text-xs">· {area.hint}</span></span><span className="font-bold tabular-nums">{(alloc as any)[area.key]}%</span></div>
                      <input type="range" min={0} max={100} step={5} value={(alloc as any)[area.key]} onChange={e => setAlloc(prev => ({ ...prev, [area.key]: Math.min(Number(e.target.value), maxForThis) }))} className="w-full accent-primary" /></div></div>);
                })}
                <div className="flex flex-wrap gap-2 pt-1">{[{ l: "Balanced", v: [34, 33, 33] }, { l: "Marketing-heavy", v: [55, 25, 20] }, { l: "Premium product", v: [25, 50, 25] }, { l: "Lean ops", v: [40, 20, 40] }].map(p => (
                  <button key={p.l} onClick={() => presetAlloc(p.v[0], p.v[1], p.v[2])} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted hover:bg-primary/10 border border-border press-scale">{p.l}</button>))}</div>
              </CardContent></Card>
              <div className="flex items-center justify-between gap-3">
                <Button variant="ghost" onClick={() => setPhase("research")} className="gap-1"><ArrowLeft className="w-4 h-4" /> Back</Button>
                <Button size="lg" className="press-scale gap-2 flex-1 sm:flex-none" disabled={!allocBalanced || !bizName.trim()} onClick={startLaunch}><Rocket className="w-5 h-5" /> Launch ({SEED_COST} IC)</Button>
              </div>
            </motion.div>
          )}

          {/* ═══ LAUNCH ═══ */}
          {phase === "launch" && (
            <motion.div key="launch" {...screenAnim}>
              {launching ? (
                <div className="rounded-3xl p-10 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0f2d1e,#06291f)" }}>
                  <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: -10, opacity: 1 }} transition={{ duration: 1.4, ease: "easeOut" }}><motion.div animate={{ y: [-4, -14, -4] }} transition={{ repeat: Infinity, duration: 1 }}><Rocket className="w-20 h-20 mx-auto text-gold" /></motion.div></motion.div>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="font-display text-2xl font-extrabold text-white mt-4">Launching {bizName}…</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-white/50 text-sm mt-1">Opening the doors. Anything can happen.</motion.p>
                  <div className="flex justify-center gap-1.5 mt-5">{[0, 1, 2].map(i => <motion.span key={i} className="w-2.5 h-2.5 rounded-full bg-gold" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} />)}</div>
                </div>
              ) : launchEvent && launchResult && (
                <div className="space-y-4">
                  <NewsFlash event={launchEvent} />
                  <ResultCard title="Launch day results" result={launchResult} />
                  <Button size="lg" className="w-full press-scale gap-2" onClick={() => { setPhase("hq"); blip("click"); }}>Enter your business HQ <ArrowRight className="w-5 h-5" /></Button>
                </div>
              )}
            </motion.div>
          )}

          {/* ═══ HQ (persistent) ═══ */}
          {phase === "hq" && sim && (
            <motion.div key="hq" {...screenAnim}>
              <Tabs defaultValue="operate" className="space-y-5">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="operate"><Store className="w-4 h-4 mr-1.5 hidden sm:inline" />Operate</TabsTrigger>
                  <TabsTrigger value="market"><ShoppingBag className="w-4 h-4 mr-1.5 hidden sm:inline" />Market</TabsTrigger>
                  <TabsTrigger value="compete"><Trophy className="w-4 h-4 mr-1.5 hidden sm:inline" />Compete</TabsTrigger>
                  <TabsTrigger value="collab"><Handshake className="w-4 h-4 mr-1.5 hidden sm:inline" />Collab</TabsTrigger>
                  <TabsTrigger value="office"><Briefcase className="w-4 h-4 mr-1.5 hidden sm:inline" />Office</TabsTrigger>
                </TabsList>

                {/* OPERATE */}
                <TabsContent value="operate" className="space-y-4">
                  <Card variant="elevated"><CardContent className="pt-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="max-w-sm"><h3 className="font-display text-base font-extrabold flex items-center gap-2"><Store className="w-4 h-4 text-primary" /> Run today's operations</h3>
                        <p className="text-sm text-muted-foreground mt-1">Each day brings a market event and a fresh P&amp;L. Come back daily to keep your business alive and growing.</p></div>
                      <div className="text-right">
                        {canRunDay ? (
                          <Button onClick={() => runDay()} disabled={running} className="press-scale gap-1.5">{running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />} Open shop</Button>
                        ) : (
                          <div className="text-right">
                            <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground"><Clock className="w-4 h-4" /> Next day in {Math.floor(msLeft / 3600000)}h {Math.floor((msLeft % 3600000) / 60000)}m</div>
                            <button onClick={() => runDay(true)} className="block ml-auto mt-1 text-[11px] text-primary/70 hover:text-primary underline">Preview next day (skips the wait)</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent></Card>

                  {sim.deals.filter(d => d.expiresDay > sim.day).length > 0 && (
                    <Card variant="elevated"><CardContent className="pt-4 pb-4"><p className="text-xs font-bold text-success flex items-center gap-1.5"><Handshake className="w-4 h-4" /> Active supplier deals</p>
                      <div className="flex flex-wrap gap-2 mt-2">{sim.deals.filter(d => d.expiresDay > sim.day).map((d, i) => (<Badge key={i} variant="success" className="gap-1"><Timer className="w-3 h-3" />{d.title}: −{d.disc}% COGS · {d.expiresDay - sim.day}d left</Badge>))}</div>
                    </CardContent></Card>
                  )}

                  {opEvent && opResult && (<><NewsFlash event={opEvent} /><ResultCard title={`Day ${sim.day} results`} result={opResult} cost={opEvent.opex || 0} /></>)}

                  <div>
                    <p className="text-sm font-bold flex items-center gap-1.5 mb-2"><Lightbulb className="w-4 h-4 text-gold" /> Invest in your business</p>
                    <div className="grid sm:grid-cols-2 gap-2.5">{UPGRADES.map(u => { const Icon = u.icon; return (
                      <button key={u.id} onClick={() => buyUpgrade(u)} className="text-left p-3.5 rounded-2xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all press-scale flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-primary/10"><Icon className="w-5 h-5 text-primary" /></span>
                        <div className="flex-1 min-w-0"><p className="font-bold text-sm">{u.title}</p><p className="text-xs text-muted-foreground">{u.blurb}</p></div>
                        <span className="text-sm font-extrabold text-gold flex items-center gap-0.5 shrink-0"><Coins className="w-3.5 h-3.5" />{u.cost}</span></button>); })}</div>
                  </div>
                  <div>
                    <p className="text-sm font-bold flex items-center gap-1.5 mb-2"><Megaphone className="w-4 h-4 text-primary" /> Marketing campaigns <span className="text-xs font-normal text-muted-foreground">· a gamble</span></p>
                    <div className="grid sm:grid-cols-2 gap-2.5">{CAMPAIGNS.map(c => (
                      <div key={c.id} className="p-3.5 rounded-2xl border border-border bg-card">
                        <div className="flex items-center justify-between"><p className="font-bold text-sm">{c.name}</p><span className="text-sm font-extrabold text-gold flex items-center gap-0.5"><Coins className="w-3.5 h-3.5" />{c.cost}</span></div>
                        <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
                        <div className="flex items-center justify-between mt-2"><span className="text-xs text-muted-foreground">~{c.payoff} IC · {Math.round(c.successRate * 100)}% land</span><Button size="sm" variant="outline" className="press-scale" onClick={() => runCampaign(c)}>Run</Button></div>
                      </div>))}</div>
                  </div>
                  <Button variant="ghost" className="w-full text-muted-foreground gap-1.5" onClick={startNewVenture}><RefreshCw className="w-4 h-4" /> Close this business & start a new one</Button>
                </TabsContent>

                {/* MARKET */}
                <TabsContent value="market" className="space-y-4">
                  <SectionHead icon={ShoppingBag} step="Class economy" title="Marketplace" sub="Sell your product to classmates and buy theirs — with real InvestiCoins." compact />
                  <Card variant="elevated"><CardContent className="pt-5 space-y-3">
                    <p className="text-sm font-bold flex items-center gap-1.5"><Plus className="w-4 h-4 text-primary" /> List a product or service</p>
                    <Input placeholder="Product / service name" value={listTitle} onChange={e => setListTitle(e.target.value)} />
                    <div className="flex gap-2">
                      <Input type="number" placeholder="Price (IC)" value={listPrice} onChange={e => setListPrice(e.target.value)} className="flex-1" min="1" />
                      <select value={listCat} onChange={e => setListCat(e.target.value)} className="rounded-md border border-input bg-background px-3 text-sm"><option value="product">Product</option><option value="service">Service</option><option value="digital">Digital</option></select>
                      <Button onClick={listItem} className="press-scale">List</Button>
                    </div>
                    {myListings.filter(l => l.category !== "supply").length > 0 && (
                      <div className="space-y-1.5 pt-1">{myListings.filter(l => l.category !== "supply").map(l => (
                        <div key={l.id} className="flex items-center justify-between p-2.5 rounded-xl bg-muted"><div className="min-w-0"><p className="text-sm font-semibold truncate">{l.title}</p><Badge variant="outline" className="text-[10px] mt-0.5">{l.category}</Badge></div><span className="text-sm font-bold text-gold flex items-center gap-1"><Coins className="w-3.5 h-3.5" />{l.price}</span></div>))}</div>
                    )}
                  </CardContent></Card>
                  <Card variant="elevated"><CardContent className="pt-5">
                    <p className="text-sm font-bold flex items-center gap-1.5 mb-3"><Tag className="w-4 h-4 text-primary" /> Buy from classmates <span className="text-xs font-normal text-muted-foreground">· {listings.length} items</span></p>
                    <div className="space-y-2 max-h-[420px] overflow-y-auto">{listings.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">No listings yet — be the first seller!</p>}
                      {listings.map(l => (<div key={l.id} className="flex items-center justify-between p-3 rounded-xl bg-muted">
                        <div className="flex-1 min-w-0 mr-3"><p className="text-sm font-semibold truncate">{l.title}</p>{l.description && !l.description.startsWith("SUPPLY") && <p className="text-xs text-muted-foreground truncate">{l.description}</p>}<Badge variant="outline" className="text-[10px] mt-1">{l.category}</Badge></div>
                        <div className="flex items-center gap-2 shrink-0"><span className="text-sm font-bold flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" />{l.price}</span><Button size="sm" variant="outline" className="press-scale" onClick={() => buyListing(l)}>Buy</Button></div></div>))}</div>
                  </CardContent></Card>
                </TabsContent>

                {/* COMPETE */}
                <TabsContent value="compete" className="space-y-4">
                  <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0f2d1e,#06291f)" }}>
                    <div className="flex items-center justify-between">
                      <div><p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold flex items-center gap-1.5"><Flame className="w-3.5 h-3.5" /> Season {season.number}</p>
                        <p className="font-display text-xl font-extrabold text-white mt-0.5">Race to top founder</p>
                        <p className="text-white/50 text-sm">Most profit by season's end wins the class.</p></div>
                      <div className="text-center bg-white/5 rounded-xl px-3 py-2"><p className="text-[9px] text-white/40 uppercase font-bold">Ends in</p><p className="text-lg font-extrabold text-white flex items-center gap-1"><Calendar className="w-4 h-4" />{season.daysLeft}d</p></div>
                    </div>
                  </div>
                  <Card variant="elevated"><CardContent className="pt-5 grid grid-cols-3 gap-3 text-center">
                    <div><p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Your profit</p><p className={cn("text-lg font-extrabold", profit >= 0 ? "text-success" : "text-destructive")}>{profit >= 0 ? "+" : ""}{profit.toLocaleString()}</p></div>
                    <div><p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Health</p><p className="text-lg font-extrabold">{Math.round(sim.health)}%</p></div>
                    <div><p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Days run</p><p className="text-lg font-extrabold">{sim.day}</p></div>
                  </CardContent></Card>
                  <LeaderboardCard board={board} label={boardLabel} />
                </TabsContent>

                {/* COLLAB / B2B */}
                <TabsContent value="collab" className="space-y-4">
                  <SectionHead icon={Handshake} step="Collaborate" title="Supplier deals (B2B)" sub="Buy a classmate's supply deal to cut your cost of goods — or post your own and earn from theirs." compact />
                  <Card variant="elevated"><CardContent className="pt-5 space-y-3">
                    <p className="text-sm font-bold flex items-center gap-1.5"><Plus className="w-4 h-4 text-primary" /> Post a supply deal</p>
                    <Input placeholder="Deal name (e.g. Bulk materials)" value={supTitle} onChange={e => setSupTitle(e.target.value)} />
                    <div className="grid grid-cols-3 gap-2">
                      <div><label className="text-[11px] font-semibold text-muted-foreground">Discount %</label><Input type="number" min={5} max={40} value={supDisc} onChange={e => setSupDisc(clamp(Number(e.target.value) || 0, 5, 40))} /></div>
                      <div><label className="text-[11px] font-semibold text-muted-foreground">Days</label><Input type="number" min={1} max={14} value={supDays} onChange={e => setSupDays(clamp(Number(e.target.value) || 1, 1, 14))} /></div>
                      <div><label className="text-[11px] font-semibold text-muted-foreground">Price IC</label><Input type="number" min={1} value={supPrice} onChange={e => setSupPrice(e.target.value)} /></div>
                    </div>
                    <Button onClick={listSupply} className="w-full press-scale">Post deal for classmates</Button>
                  </CardContent></Card>
                  <Card variant="elevated"><CardContent className="pt-5">
                    <p className="text-sm font-bold flex items-center gap-1.5 mb-3"><Handshake className="w-4 h-4 text-primary" /> Available supplier deals</p>
                    <div className="space-y-2">{supplyDeals.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">No deals yet — post one for your class!</p>}
                      {supplyDeals.map(l => { const p = parseSupply(l.description); if (!p) return null; return (
                        <div key={l.id} className="flex items-center justify-between p-3 rounded-xl bg-muted">
                          <div className="flex-1 min-w-0 mr-3"><p className="text-sm font-semibold truncate">{l.title}</p><p className="text-xs text-success font-semibold">−{p.disc}% cost of goods · {p.days} days</p></div>
                          <div className="flex items-center gap-2 shrink-0"><span className="text-sm font-bold flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-gold" />{l.price}</span><Button size="sm" variant="outline" className="press-scale" onClick={() => buySupply(l)}>Strike deal</Button></div></div>); })}</div>
                  </CardContent></Card>
                </TabsContent>

                {/* OFFICE — back-office "Pro" features (P&L, payroll, taxes, hiring, etc.) */}
                <TabsContent value="office">
                  <MicroBusinessOffice />
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {/* ═══ BANKRUPT ═══ */}
          {phase === "bankrupt" && (
            <motion.div key="bankrupt" {...screenAnim} className="space-y-4">
              <div className="rounded-3xl p-8 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,#2a0f0f,#1a0606)" }}>
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 180, damping: 12 }}><Skull className="w-20 h-20 mx-auto text-destructive" /></motion.div>
                <p className="font-display text-2xl font-extrabold text-white mt-3">Bankrupt.</p>
                <p className="text-white/55 text-sm mt-1 max-w-sm mx-auto">{bizName} ran out of cash. It happens to most founders — the lesson is in the wreckage.</p>
              </div>
              <Card variant="elevated"><CardContent className="pt-5"><p className="text-sm font-bold flex items-center gap-1.5 mb-2"><Lightbulb className="w-4 h-4 text-gold" /> Lessons for next time</p>
                <ul className="space-y-1.5 text-sm text-foreground/80"><li className="flex gap-1.5"><ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />Keep a cash cushion — don't spend everything on upgrades at once.</li><li className="flex gap-1.5"><ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />Make sure operations can fulfill the demand your marketing creates.</li><li className="flex gap-1.5"><ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />Use supplier deals to cut costs when margins get thin.</li></ul></CardContent></Card>
              <Button size="lg" className="w-full press-scale gap-2" onClick={startNewVenture}><RefreshCw className="w-5 h-5" /> Try again with lessons learned</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Monthly recap modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {recap && (
          <motion.div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRecap(null)}>
            <motion.div onClick={e => e.stopPropagation()} initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl">
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-2" style={{ background: recap.net >= 0 ? "rgba(29,158,117,0.15)" : "rgba(220,38,38,0.12)" }}>
                {recap.net >= 0 ? <Crown className="w-8 h-8 text-success" /> : <TrendingDown className="w-8 h-8 text-destructive" />}
              </div>
              <p className="font-display text-xl font-extrabold">Month {sim ? Math.floor((sim.day - 1) / BUSINESS_MONTH_DAYS) : 1} recap</p>
              <p className="text-sm text-muted-foreground">{recap.days} business days in the books</p>
              <p className={cn("text-3xl font-extrabold tabular-nums mt-3", recap.net >= 0 ? "text-success" : "text-destructive")}>{recap.net >= 0 ? "+" : ""}{recap.net.toLocaleString()} IC</p>
              <p className="text-xs text-muted-foreground">net profit this month</p>
              {recap.net > 0 && <Badge variant="success" className="mt-3 gap-1"><Trophy className="w-3.5 h-3.5" /> Profitable month — bonus paid!</Badge>}
              <Button className="w-full mt-5 press-scale" onClick={() => setRecap(null)}>Keep building <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
