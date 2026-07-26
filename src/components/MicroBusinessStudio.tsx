import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
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
  Loader2, CheckCircle2, AlertTriangle, FileText, Package, Tag, MessageSquare,
  Users, Handshake, Truck, Megaphone, Palette, Rocket, Star, ArrowRight, Plus,
  Briefcase, ClipboardList, DollarSign, Lightbulb, Trophy, Pencil, Activity, Skull, Lock,
  Coins, TrendingUp, Heart, Sparkles, type LucideIcon,
} from "lucide-react";
import {
  BUSINESS_TYPES, bizDef, BETA_REVIEWS, PARTNERS, PARTNER_PROBLEMS, VENDOR_OFFERS,
  ALL_ACTIVITIES, ACTIVITY_TITLES, XP, weekIndex, wordCount as wc,
  loadActivities, saveActivities, defaultActivities,
  type ActivitiesState, type BusinessType, type Partner,
} from "@/lib/businessActivities";
import {
  type BizState, defaultBizState, pickSituation, resolveSituation, addProduct,
  applyEffect, applyDelta, ACTIVITY_EFFECTS, monthlyRevenue, statusLabel, quarterOf,
} from "@/lib/businessSim";
import {
  briefsForCategory, allBriefIdsForQuarter, type QuarterlyBrief,
} from "@/lib/quarterlyBriefs";
import { anchor } from "@/lib/tourAnchors";
// Teacher-adjustable writing workload: ws() scales every word minimum by the
// class's writing_scale setting (Light/Standard/Extended in TeacherDashboard).
import { ws, initWritingScale, subscribeWritingScale } from "@/lib/writingScale";

const NEON = "#00ff88";
type Fields = Record<string, unknown>;
type Complete = (id: string, fields: Fields, xp: number) => void;
type BriefComplete = (brief: QuarterlyBrief, fields: Fields) => void;

/* ════════════════════════════ shared bits ════════════════════════════ */
function Counter({ n, min, max }: { n: number; min?: number; max?: number }) {
  const ok = max != null ? n > 0 && n <= max : n >= (min || 0);
  return <span className={cn("text-[11px] font-bold tabular-nums", ok ? "text-success" : "text-destructive")}>{n}{max != null ? `/${max} max` : `/${min} words`}</span>;
}
function WField({ label, value, onChange, min, rows = 3, placeholder }: { label: string; value: string; onChange: (v: string) => void; min: number; rows?: number; placeholder?: string }) {
  const n = wc(value); const ok = n >= min;
  return (
    <div>
      <div className="flex items-center justify-between mb-1"><label className="text-sm font-semibold">{label}</label><Counter n={n} min={min} /></div>
      <Textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cn(ok && value ? "border-success/50" : value ? "border-destructive/40" : "")} />
    </div>
  );
}
function Incomplete({ items }: { items: { label: string; ok: boolean }[] }) {
  const bad = items.filter((i) => !i.ok);
  if (!bad.length) return null;
  return (
    <div className="rounded-xl border border-warning/40 bg-warning/5 p-3">
      <p className="text-sm font-bold text-warning flex items-center gap-1.5 mb-1"><AlertTriangle className="w-4 h-4" /> Finish these to submit:</p>
      <ul className="space-y-0.5">{bad.map((b, i) => <li key={i} className="text-xs text-foreground/80">• {b.label}</li>)}</ul>
    </div>
  );
}
function ActivityCard({ icon: Icon, n, title, desc, xp, done, children }: { icon: LucideIcon; n: number; title: string; desc: string; xp: number; done: boolean; children: React.ReactNode }) {
  return (
    <Card variant="elevated"><CardContent className="pt-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2"><span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${NEON}1a` }}><Icon className="w-4 h-4" style={{ color: NEON }} /></span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: NEON }}>Activity {n}</span></div>
          <h3 className="font-display text-lg font-extrabold mt-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
        {done ? <Badge variant="success" className="gap-1 shrink-0"><CheckCircle2 className="w-3.5 h-3.5" /> Done</Badge> : <Badge variant="outline" className="shrink-0">+{xp} 🪙</Badge>}
      </div>
      {children}
    </CardContent></Card>
  );
}
function ResultRow({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="border-b border-border/60 py-2"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p><div className="text-sm text-foreground/90 mt-0.5 whitespace-pre-wrap">{children}</div></div>;
}
function useForm<T extends Record<string, unknown>>(saved: Fields, defaults: T) {
  const [f, setF] = useState<T>(() => ({ ...defaults, ...(saved as Partial<T>) }));
  const set = (k: keyof T, v: unknown) => setF((p) => ({ ...p, [k]: v }));
  return [f, set] as const;
}
const str = (v: unknown) => (typeof v === "string" ? v : "");
const num = (v: unknown) => { const n = parseFloat(String(v).replace(/[^0-9.]/g, "")); return isNaN(n) ? 0 : n; };

/* ──────────────── one-at-a-time activity flow ────────────────
   Instead of dumping all 3 written activities on screen at once, show the
   completed ones, the single one you're working on now, and lock the rest
   until the one before is submitted. Keeps each tab focused. */
type Step = { id: string; title: string; icon: LucideIcon; render: () => React.ReactNode };

function StepRail({ total, done }: { total: number; done: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground whitespace-nowrap">
        {done >= total ? "All done" : `Step ${done + 1} of ${total}`}
      </span>
      <div className="flex items-center gap-1.5 flex-1">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={cn("h-1.5 flex-1 rounded-full", i > done && "bg-muted")}
            style={i <= done ? { background: i < done ? NEON : `${NEON}66` } : undefined} />
        ))}
      </div>
    </div>
  );
}

function LockedStep({ n, title }: { n: number; title: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4 flex items-center gap-3">
      <span className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0"><Lock className="w-4 h-4 text-muted-foreground" /></span>
      <div className="min-w-0">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground">Activity {n} · Locked</p>
        <h3 className="font-display text-base font-bold text-muted-foreground/90 truncate">{title}</h3>
        <p className="text-xs text-muted-foreground">Finish the activity above to unlock this.</p>
      </div>
    </div>
  );
}

function SequentialSteps({ a, steps }: { a: ActivitiesState; steps: Step[] }) {
  const doneCount = steps.filter((s) => a.done.includes(s.id)).length;
  let activeShown = false;
  return (
    <div className="space-y-4">
      <StepRail total={steps.length} done={doneCount} />
      {steps.map((s, i) => {
        if (a.done.includes(s.id)) return <React.Fragment key={s.id}>{s.render()}</React.Fragment>;
        if (!activeShown) { activeShown = true; return <React.Fragment key={s.id}>{s.render()}</React.Fragment>; }
        return <LockedStep key={s.id} n={i + 1} title={s.title} />;
      })}
    </div>
  );
}

/* ════════════════════════════ ORCHESTRATOR ════════════════════════════ */
export default function MicroBusinessStudio() {
  const { earnJeffs } = useApp();
  const [a, setA] = useState<ActivitiesState | null>(null);

  useEffect(() => { loadActivities().then(setA); }, []);

  // Load the class writing scale and re-render when it arrives, so every
  // word-minimum label/check below reflects the teacher's setting.
  const [, forceScaleRender] = useState(0);
  useEffect(() => {
    const unsub = subscribeWritingScale(() => forceScaleRender(n => n + 1));
    initWritingScale();
    return unsub;
  }, []);
  const persist = useCallback((next: ActivitiesState) => { setA(next); saveActivities(next); }, []);

  const setBusinessType = (bt: BusinessType) => { if (!a) return; persist({ ...a, businessType: bt }); };
  const complete: Complete = useCallback((id, fields, xp) => {
    setA((prev) => {
      if (!prev) return prev;
      const firstTime = !prev.xpAwarded.includes(id);
      const prevSim = (prev.sim as BizState) || defaultBizState();
      const next: ActivitiesState = {
        ...prev,
        data: { ...prev.data, [id]: fields },
        done: prev.done.includes(id) ? prev.done : [...prev.done, id],
        xpAwarded: firstTime ? [...prev.xpAwarded, id] : prev.xpAwarded,
        sim: firstTime ? applyEffect(prevSim, id) : prev.sim,
      };
      if (firstTime) earnJeffs(xp, `Completed: ${ACTIVITY_TITLES[id] || id}`);
      saveActivities(next);
      return next;
    });
    const eff = ACTIVITY_EFFECTS[id];
    toast.success(`${ACTIVITY_TITLES[id] || "Activity"} submitted`, { description: `+${xp} InvestiCoins${eff ? ` · ${eff.msg}` : ""}` });
  }, [earnJeffs]);

  // Completion for rotating quarterly briefs — same flow as `complete`, but the
  // metric effect and title come from the brief definition rather than a fixed map.
  const completeBrief: BriefComplete = useCallback((brief, fields) => {
    setA((prev) => {
      if (!prev) return prev;
      const firstTime = !prev.xpAwarded.includes(brief.id);
      const prevSim = (prev.sim as BizState) || defaultBizState();
      const next: ActivitiesState = {
        ...prev,
        data: { ...prev.data, [brief.id]: fields },
        done: prev.done.includes(brief.id) ? prev.done : [...prev.done, brief.id],
        xpAwarded: firstTime ? [...prev.xpAwarded, brief.id] : prev.xpAwarded,
        sim: firstTime ? applyDelta(prevSim, brief.effect) : prev.sim,
      };
      if (firstTime) earnJeffs(brief.xp, `Completed: ${brief.title}`);
      saveActivities(next);
      return next;
    });
    toast.success(`${brief.title} submitted`, { description: `+${brief.xp} InvestiCoins · ${brief.effect.msg}` });
  }, [earnJeffs]);

  if (!a) return (<div className="min-h-screen bg-background"><GameNav /><div className="flex items-center justify-center py-24"><Loader2 className="w-7 h-7 animate-spin text-primary" /></div></div>);

  // ── Business-type gate ──
  if (!a.businessType) {
    return (
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        <GameNav />
        <main className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="text-center mb-6">
            <Briefcase className="w-12 h-12 mx-auto mb-2" style={{ color: NEON }} />
            <h1 className="font-display text-2xl md:text-3xl font-extrabold">Start your business</h1>
            <p className="text-muted-foreground text-sm mt-1">Pick the kind of business you want to build. This shapes your activities.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {BUSINESS_TYPES.map((b) => { const Icon = b.icon; return (
              <button key={b.id} onClick={() => setBusinessType(b.id)} className="text-left p-5 rounded-2xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all press-scale">
                <Icon className="w-8 h-8 mb-2" style={{ color: b.color }} />
                <p className="font-display text-lg font-extrabold">{b.label}</p>
                <p className="text-sm text-muted-foreground">{b.blurb}</p>
                <p className="text-xs mt-2" style={{ color: NEON }}>Est. cost {b.unitCost} IC {b.unitLabel}</p>
              </button>
            ); })}
          </div>
        </main>
      </div>
    );
  }

  const bt = a.businessType;
  const def = bizDef(bt);

  // ── living-business state + handlers ──
  const sim: BizState = (a.sim as BizState) || defaultBizState();
  // Quarter 1 (qi 0) = the founding bespoke activities; quarter 2+ = a fresh
  // rotating set of operations briefs, so each quarter brings different work.
  const qi = quarterOf(sim.month);
  const currentIds = qi === 0 ? ALL_ACTIVITIES : allBriefIdsForQuarter(qi);
  const doneCount = currentIds.filter((id) => a.done.includes(id)).length;
  const allDone = currentIds.length > 0 && doneCount === currentIds.length;
  const setSim = (next: BizState) => persist({ ...a, sim: next });
  const generateMonth = () => { if (sim.pending || sim.status === "failed") return; setSim({ ...sim, pending: pickSituation(sim) }); };
  const resolveMonth = (optIndex: number, words: number) => {
    const { next, revenue } = resolveSituation(sim, optIndex, words);
    // Crossing into a new quarter refreshes the operations activities so running
    // the business stays an ongoing job rather than a one-time 9-item checklist.
    const newQuarter = quarterOf(next.month) !== quarterOf(sim.month) && next.status !== "failed";
    persist({ ...a, sim: next, ...(newQuarter ? { done: [], xpAwarded: [] } : {}) });
    earnJeffs(40, `Business month ${sim.month}`);
    toast.success(`Month ${sim.month} resolved`, { description: `Revenue +${revenue} IC · +40 InvestiCoins` });
    if (newQuarter) toast.success(`Quarter ${quarterOf(next.month) + 1} begins`, { description: "Your operations activities have refreshed — run them again." });
    if (next.status === "failed") toast.error("Your business ran out of road", { description: "Review what happened, then rebuild." });
  };
  const rebuild = () => persist({ ...a, sim: defaultBizState(), done: [], xpAwarded: [] });
  const addProductHandler = (p: { name: string; price: number; pitch: string }) => {
    setSim(addProduct(sim, p)); earnJeffs(75, "Launched a new product");
    toast.success(`"${p.name}" added to your product line`, { description: "Customers +60 · Brand +5 · +75 InvestiCoins" });
  };

  // Build each tab's ordered step list. Q1 uses the bespoke founding activities;
  // later quarters use the rotating briefs. Either way they flow one-at-a-time.
  const briefSteps = (cat: "product" | "collab" | "marketing"): Step[] =>
    briefsForCategory(cat, qi).map((b, i) => ({
      id: b.id, title: b.title, icon: b.icon,
      render: () => <BriefActivity a={a} bt={bt} brief={b} n={i + 1} complete={completeBrief} />,
    }));
  const productSteps: Step[] = qi === 0 ? [
    { id: "productDoc", title: "Product Design Document", icon: FileText, render: () => <ProductDoc a={a} bt={bt} complete={complete} /> },
    { id: "pricing", title: "Pricing Strategy", icon: Tag, render: () => <Pricing a={a} bt={bt} complete={complete} /> },
    { id: "feedback", title: "Product Feedback Response", icon: MessageSquare, render: () => <Feedback a={a} bt={bt} complete={complete} /> },
  ] : briefSteps("product");
  const collabSteps: Step[] = qi === 0 ? [
    { id: "partner", title: "Find a Partner", icon: Users, render: () => <FindPartner a={a} bt={bt} complete={complete} /> },
    { id: "partnerProblem", title: "Partnership Problem", icon: AlertTriangle, render: () => <PartnerProblem a={a} bt={bt} complete={complete} /> },
    { id: "vendor", title: "Vendor Negotiation", icon: Truck, render: () => <VendorNegotiation a={a} bt={bt} complete={complete} /> },
  ] : briefSteps("collab");
  const marketingSteps: Step[] = qi === 0 ? [
    { id: "brand", title: "Brand Identity", icon: Palette, render: () => <BrandIdentity a={a} bt={bt} complete={complete} /> },
    { id: "marketingPlan", title: "Marketing Plan", icon: ClipboardList, render: () => <MarketingPlan a={a} bt={bt} complete={complete} /> },
    { id: "adCampaign", title: "Ad Campaign", icon: Rocket, render: () => <AdCampaign a={a} bt={bt} complete={complete} /> },
  ] : briefSteps("marketing");

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* HUD */}
        <div className="hud-panel p-4 mb-5 relative z-10">
          <div className="relative z-10 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <def.icon className="w-5 h-5" style={{ color: def.color }} />
              <div><p className="font-display text-base font-extrabold text-white leading-none">{def.label}</p><p className="text-white/40 text-xs mt-0.5">Your business studio</p></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/5 rounded-lg px-3 py-1.5 text-center">
                <p className="text-[9px] text-white/40 uppercase font-bold">Quarter</p>
                <p className="text-sm font-extrabold text-white">Q{quarterOf(sim.month) + 1}</p>
              </div>
              <div className="bg-white/5 rounded-lg px-3 py-1.5 text-center">
                <p className="text-[9px] text-white/40 uppercase font-bold">This quarter</p>
                <p className="text-sm font-extrabold" style={{ color: NEON }}>{doneCount}/{ALL_ACTIVITIES.length} ops</p>
              </div>
            </div>
          </div>
          <div className="h-1.5 mt-3 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${(doneCount / ALL_ACTIVITIES.length) * 100}%`, background: NEON }} /></div>
          <p className="text-[10px] text-white/35 mt-1.5">Operations refresh every quarter — there's always more to run.</p>
        </div>

        {/* Two columns on desktop: the running-business cockpit on the left,
            the quarter's activities on the right — fills the page and keeps the
            "manage" and "do the work" jobs visually separate. */}
        <div className="grid lg:grid-cols-5 gap-5 items-start">
          {/* Cockpit — your live business */}
          <div className="lg:col-span-2 space-y-4">
            <BusinessDashboard sim={sim} />
            <MonthlyOps sim={sim} onGenerate={generateMonth} onResolve={resolveMonth} onRebuild={rebuild} />
            <ProductLine sim={sim} onAdd={addProductHandler} />
          </div>

          {/* Workbench — this quarter's activities, one at a time */}
          <div className="lg:col-span-3" ref={anchor("biz-activity")}>
            <Tabs defaultValue="product" className="space-y-4">
              <TabsList className={cn("grid w-full", allDone ? "grid-cols-5" : "grid-cols-4")}>
                <TabsTrigger value="product" ref={anchor("biz-product")} className="text-xs"><Package className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Product</TabsTrigger>
                <TabsTrigger value="office" ref={anchor("biz-office")} className="text-xs"><Briefcase className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Office</TabsTrigger>
                <TabsTrigger value="collab" ref={anchor("biz-collab")} className="text-xs"><Handshake className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Collab</TabsTrigger>
                <TabsTrigger value="marketing" ref={anchor("biz-marketing")} className="text-xs"><Megaphone className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Marketing</TabsTrigger>
                {allDone && <TabsTrigger value="summary" className="text-xs"><Trophy className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Report</TabsTrigger>}
              </TabsList>

              <TabsContent value="product">
                <SequentialSteps a={a} steps={productSteps} />
              </TabsContent>

              {/* Office tab — untouched existing component */}
              <TabsContent value="office"><MicroBusinessOffice /></TabsContent>

              <TabsContent value="collab">
                <SequentialSteps a={a} steps={collabSteps} />
              </TabsContent>

              <TabsContent value="marketing">
                <SequentialSteps a={a} steps={marketingSteps} />
              </TabsContent>

              {allDone && <TabsContent value="summary"><SummaryReport a={a} bt={bt} qi={qi} /></TabsContent>}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

type AProps = { a: ActivitiesState; bt: BusinessType; complete: Complete };

/* ═══ PRODUCT DEV · Activity 1 — Product Design Document ═══ */
function ProductDoc({ a, complete }: AProps) {
  const id = "productDoc"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const [editing, setEditing] = useState(false);
  const [f, set] = useForm(saved, { name: "", problem: "", target: "", feat1: "", feat2: "", feat3: "", diff: "" });
  const checks = [
    { label: "Product/Service name (3+ words)", ok: wc(str(f.name)) >= 3 },
    { label: `Problem it solves (${ws(75)}+ words)`, ok: wc(str(f.problem)) >= ws(75) },
    { label: `Target customer (${ws(50)}+ words)`, ok: wc(str(f.target)) >= ws(50) },
    { label: `Feature 1 + why (${ws(30)}+ words)`, ok: wc(str(f.feat1)) >= ws(30) },
    { label: `Feature 2 + why (${ws(30)}+ words)`, ok: wc(str(f.feat2)) >= ws(30) },
    { label: `Feature 3 + why (${ws(30)}+ words)`, ok: wc(str(f.feat3)) >= ws(30) },
    { label: `What makes it different (${ws(50)}+ words)`, ok: wc(str(f.diff)) >= ws(50) },
  ];
  const ready = checks.every((c) => c.ok);
  if (done && !editing) {
    return (
      <ActivityCard icon={FileText} n={1} title="Product Design Document" desc="Your internal product brief." xp={XP.pd} done>
        <div className="rounded-xl border border-border bg-card p-4 font-mono">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Internal · Confidential</p>
          <p className="font-display text-xl font-extrabold mt-1">{str(saved.name)}</p>
          <p className="text-xs text-muted-foreground mb-2">PRODUCT BRIEF</p>
          <ResultRow label="Problem">{str(saved.problem)}</ResultRow>
          <ResultRow label="Target customer">{str(saved.target)}</ResultRow>
          <ResultRow label="Key feature 1">{str(saved.feat1)}</ResultRow>
          <ResultRow label="Key feature 2">{str(saved.feat2)}</ResultRow>
          <ResultRow label="Key feature 3">{str(saved.feat3)}</ResultRow>
          <ResultRow label="Differentiation">{str(saved.diff)}</ResultRow>
        </div>
        <Button size="sm" variant="ghost" className="gap-1" onClick={() => setEditing(true)}><Pencil className="w-3.5 h-3.5" /> Edit</Button>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={FileText} n={1} title="Product Design Document" desc="Write a structured brief for your product or service." xp={XP.pd} done={done}>
      <div className="space-y-3">
        <WField label="Product / Service name (min 3 words)" value={str(f.name)} onChange={(v) => set("name", v)} min={3} rows={1} placeholder="A short, descriptive name" />
        <WField label={`Problem it solves (min ${ws(75)} words)`} value={str(f.problem)} onChange={(v) => set("problem", v)} min={ws(75)} rows={4} />
        <WField label={`Target customer description (min ${ws(50)} words)`} value={str(f.target)} onChange={(v) => set("target", v)} min={ws(50)} rows={3} />
        <WField label={`Feature 1 — and why it matters (min ${ws(30)} words)`} value={str(f.feat1)} onChange={(v) => set("feat1", v)} min={ws(30)} />
        <WField label={`Feature 2 — and why it matters (min ${ws(30)} words)`} value={str(f.feat2)} onChange={(v) => set("feat2", v)} min={ws(30)} />
        <WField label={`Feature 3 — and why it matters (min ${ws(30)} words)`} value={str(f.feat3)} onChange={(v) => set("feat3", v)} min={ws(30)} />
        <WField label={`What makes it different from competitors (min ${ws(50)} words)`} value={str(f.diff)} onChange={(v) => set("diff", v)} min={ws(50)} rows={3} />
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => { complete(id, f, XP.pd); setEditing(false); }}><FileText className="w-4 h-4 mr-1.5" /> Generate Product Brief</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ PRODUCT DEV · Activity 2 — Pricing Strategy ═══ */
const PRICING_TYPES = ["Cost-plus", "Value-based", "Competitive"];
function Pricing({ a, bt, complete }: AProps) {
  const id = "pricing"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const cost = bizDef(bt).unitCost;
  const [f, set] = useForm(saved, { price: "", justify: "", margin: "", ptype: "Cost-plus", explain: "", lowReason: "" });
  const price = num(f.price);
  const actualMargin = price > 0 ? ((price - cost) / price) * 100 : 0;
  const lowMargin = price > 0 && actualMargin < 10;
  const checks = [
    { label: "Set a price greater than your cost", ok: price > cost },
    { label: `Justify your price (${ws(40)}+ words)`, ok: wc(str(f.justify)) >= ws(40) },
    { label: "Enter your calculated margin %", ok: String(f.margin).trim().length > 0 },
    { label: `Explain your pricing approach (${ws(60)}+ words)`, ok: wc(str(f.explain)) >= ws(60) },
    ...(lowMargin ? [{ label: `Low margin: justify accepting it (${ws(40)}+ words)`, ok: wc(str(f.lowReason)) >= ws(40) }] : []),
  ];
  const ready = checks.every((c) => c.ok);
  const marginOff = price > 0 && Math.abs(num(f.margin) - actualMargin) > 2;
  if (done) {
    return (
      <ActivityCard icon={Tag} n={2} title="Pricing Strategy" desc="Your pricing decision." xp={XP.pd} done>
        <div className="rounded-xl bg-muted p-4">
          <div className="flex gap-4 mb-2"><div><p className="text-xs text-muted-foreground">Price</p><p className="font-extrabold">{num(saved.price)} IC</p></div><div><p className="text-xs text-muted-foreground">Cost</p><p className="font-extrabold">{cost} IC</p></div><div><p className="text-xs text-muted-foreground">Margin</p><p className="font-extrabold" style={{ color: NEON }}>{actualMargin.toFixed(0)}%</p></div><div><p className="text-xs text-muted-foreground">Approach</p><p className="font-extrabold">{str(saved.ptype)}</p></div></div>
          <ResultRow label="Justification">{str(saved.justify)}</ResultRow>
          <ResultRow label="Why this approach">{str(saved.explain)}</ResultRow>
          {str(saved.lowReason) && <ResultRow label="Accepting low margin">{str(saved.lowReason)}</ResultRow>}
        </div>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={Tag} n={2} title="Pricing Strategy" desc="Price your product and defend it." xp={XP.pd} done={false}>
      <div className="space-y-3">
        <div className="rounded-xl bg-muted p-3 text-sm flex items-center gap-2"><DollarSign className="w-4 h-4 text-primary" /> Estimated cost to produce/deliver one unit: <b>{cost} IC</b> ({bizDef(bt).unitLabel})</div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold">Your price (IC)</label><Input type="number" value={str(f.price)} onChange={(e) => set("price", e.target.value)} className="mt-1" /></div>
          <div><label className="text-sm font-semibold">Profit margin %</label><Input value={str(f.margin)} onChange={(e) => set("margin", e.target.value)} className="mt-1" placeholder="you calculate it" /></div>
        </div>
        <p className="text-xs text-muted-foreground">Formula: (Price − Cost) ÷ Price × 100{price > 0 ? ` — actual works out to ${actualMargin.toFixed(0)}%` : ""}{marginOff ? " (check your math)" : ""}</p>
        <WField label={`Justify your price (${ws(40)}+ words)`} value={str(f.justify)} onChange={(v) => set("justify", v)} min={ws(40)} />
        <div>
          <label className="text-sm font-semibold">Pricing approach</label>
          <div className="flex gap-2 mt-1">{PRICING_TYPES.map((p) => <button key={p} onClick={() => set("ptype", p)} className={cn("flex-1 px-2 py-1.5 rounded-lg text-xs font-bold border press-scale", f.ptype === p ? "border-primary bg-primary/10" : "border-border bg-muted")}>{p}</button>)}</div>
        </div>
        <WField label={`Explain why you chose that approach (${ws(60)}+ words)`} value={str(f.explain)} onChange={(v) => set("explain", v)} min={ws(60)} rows={3} />
        {lowMargin && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-3">
            <p className="text-sm font-bold text-destructive flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Your margin is dangerously thin.</p>
            <p className="text-xs text-muted-foreground mt-0.5">Most businesses need at least 20% to survive. Raise your price, or justify accepting a low margin below.</p>
            <div className="mt-2"><WField label={`Why accept a low margin? (${ws(40)}+ words)`} value={str(f.lowReason)} onChange={(v) => set("lowReason", v)} min={ws(40)} /></div>
          </div>
        )}
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, f, XP.pd)}><Tag className="w-4 h-4 mr-1.5" /> Lock in pricing</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ PRODUCT DEV · Activity 3 — Product Feedback Response ═══ */
function Feedback({ a, bt, complete }: AProps) {
  const id = "feedback"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const review = useMemo(() => BETA_REVIEWS[bt][weekIndex() % BETA_REVIEWS[bt].length], [bt]);
  const [f, set] = useForm(saved, { summary: "", implement: "yes", why: "", v2: "" });
  const checks = [
    { label: `Summarize the feedback (${ws(40)}+ words)`, ok: wc(str(f.summary)) >= ws(40) },
    { label: `Justify your decision (${ws(50)}+ words)`, ok: wc(str(f.why)) >= ws(50) },
    { label: `Describe your v2 changes (${ws(60)}+ words)`, ok: wc(str(f.v2)) >= ws(60) },
  ];
  const ready = checks.every((c) => c.ok);
  if (done) {
    return (
      <ActivityCard icon={MessageSquare} n={3} title="Product Feedback Response" desc="How you handled beta feedback." xp={XP.pd} done>
        <div className="rounded-xl bg-muted p-4">
          <ResultRow label="Beta review">{str(saved.__review) || review}</ResultRow>
          <ResultRow label="Your summary">{str(saved.summary)}</ResultRow>
          <ResultRow label={`Decision: ${str(saved.implement) === "yes" ? "Implement" : "Don't implement"}`}>{str(saved.why)}</ResultRow>
          <ResultRow label="v2 changes">{str(saved.v2)}</ResultRow>
        </div>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={MessageSquare} n={3} title="Product Feedback Response" desc="A beta tester reviewed your product." xp={XP.pd} done={false}>
      <div className="space-y-3">
        <div className="rounded-xl border border-border bg-card p-3"><div className="flex items-center gap-1 text-gold mb-1">{[1, 2, 3].map((i) => <Star key={i} className="w-3.5 h-3.5" fill="#EBB13E" color="#EBB13E" />)}<span className="text-xs text-muted-foreground ml-1">Beta tester</span></div><p className="text-sm italic">"{review}"</p></div>
        <WField label={`Summarize the feedback in your own words (${ws(40)}+ words)`} value={str(f.summary)} onChange={(v) => set("summary", v)} min={ws(40)} />
        <div>
          <label className="text-sm font-semibold">Will you implement this feedback?</label>
          <div className="flex gap-2 mt-1">{["yes", "no"].map((o) => <button key={o} onClick={() => set("implement", o)} className={cn("flex-1 px-2 py-1.5 rounded-lg text-sm font-bold border press-scale capitalize", f.implement === o ? "border-primary bg-primary/10" : "border-border bg-muted")}>{o === "yes" ? "Implement" : "Don't implement"}</button>)}</div>
        </div>
        <WField label={`Justify your decision (${ws(50)}+ words)`} value={str(f.why)} onChange={(v) => set("why", v)} min={ws(50)} rows={3} />
        <WField label={`What would you change in v2? (${ws(60)}+ words)`} value={str(f.v2)} onChange={(v) => set("v2", v)} min={ws(60)} rows={3} />
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, { ...f, __review: review }, XP.pd)}><MessageSquare className="w-4 h-4 mr-1.5" /> Submit response</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ COLLABORATION · Activity 1 — Find a Partner ═══ */
function FindPartner({ a, bt, complete }: AProps) {
  const id = "partner"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const partners = PARTNERS[bt];
  const [f, set] = useForm(saved, { chosen: "", why: "", proposal: "", split: "", timeline: "", deliverables: "" });
  const checks = [
    { label: "Pick a partner", ok: !!f.chosen },
    { label: `Why you chose them (${ws(60)}+ words)`, ok: wc(str(f.why)) >= ws(60) },
    { label: `Collaboration proposal (${ws(100)}+ words)`, ok: wc(str(f.proposal)) >= ws(100) },
    { label: "Revenue split %", ok: str(f.split).trim().length > 0 },
    { label: "Timeline", ok: str(f.timeline).trim().length > 0 },
    { label: "Deliverables", ok: str(f.deliverables).trim().length > 0 },
  ];
  const ready = checks.every((c) => c.ok);
  const chosen = partners.find((p) => p.id === f.chosen);
  if (done) {
    const p = partners.find((x) => x.id === str(saved.chosen));
    return (
      <ActivityCard icon={Users} n={1} title="Find a Partner" desc="Your chosen partnership." xp={XP.collab} done>
        <div className="rounded-xl bg-muted p-4">
          <p className="font-bold">{p?.name || "Partner"} <span className="text-xs text-muted-foreground">· {p?.bizType}</span></p>
          <ResultRow label="Why them">{str(saved.why)}</ResultRow>
          <ResultRow label="Proposal">{str(saved.proposal)}</ResultRow>
          <div className="flex gap-3 mt-2 text-xs"><span>Split: <b>{str(saved.split)}</b></span><span>Timeline: <b>{str(saved.timeline)}</b></span><span>Deliverables: <b>{str(saved.deliverables)}</b></span></div>
        </div>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={Users} n={1} title="Find a Partner" desc="Review 4 potential partners and propose a deal." xp={XP.collab} done={false}>
      <div className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-2">
          {partners.map((p) => (
            <button key={p.id} onClick={() => set("chosen", p.id)} className={cn("text-left p-3 rounded-xl border transition-all press-scale", f.chosen === p.id ? "border-primary bg-primary/10 ring-2 ring-primary/30" : "border-border bg-card hover:bg-muted")}>
              <p className="font-bold text-sm">{p.name} <span className="text-xs text-muted-foreground">· {p.bizType}</span></p>
              <p className="text-xs text-success mt-1"><b>Offers:</b> {p.offering}</p>
              <p className="text-xs text-muted-foreground"><b>Wants:</b> {p.want}</p>
            </button>
          ))}
        </div>
        <WField label={`Why did you choose them over the others? (${ws(60)}+ words)`} value={str(f.why)} onChange={(v) => set("why", v)} min={ws(60)} rows={3} />
        <WField label={`Collaboration proposal${chosen ? ` to ${chosen.name}` : ""} (100+ words)`} value={str(f.proposal)} onChange={(v) => set("proposal", v)} min={ws(100)} rows={5} placeholder="What the partnership looks like, what each side contributes, and the expected benefit." />
        <div className="grid grid-cols-3 gap-2">
          <div><label className="text-xs font-semibold">Revenue split %</label><Input value={str(f.split)} onChange={(e) => set("split", e.target.value)} className="mt-1" placeholder="e.g. 60/40" /></div>
          <div><label className="text-xs font-semibold">Timeline</label><Input value={str(f.timeline)} onChange={(e) => set("timeline", e.target.value)} className="mt-1" placeholder="e.g. 6 months" /></div>
          <div><label className="text-xs font-semibold">Deliverables</label><Input value={str(f.deliverables)} onChange={(e) => set("deliverables", e.target.value)} className="mt-1" placeholder="e.g. 4 designs" /></div>
        </div>
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, f, XP.collab)}><Handshake className="w-4 h-4 mr-1.5" /> Send proposal</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ COLLABORATION · Activity 2 — Partnership Problem ═══ */
function PartnerProblem({ a, bt, complete }: AProps) {
  const id = "partnerProblem"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const partnerFormed = a.done.includes("partner");
  const problem = useMemo(() => PARTNER_PROBLEMS[bt][weekIndex() % PARTNER_PROBLEMS[bt].length], [bt]);
  const [f, set] = useForm(saved, { message: "", resolution: "", reflection: "" });
  const checks = [
    { label: `Message to your partner (${ws(75)}+ words)`, ok: wc(str(f.message)) >= ws(75) },
    { label: `Proposed resolution (${ws(50)}+ words)`, ok: wc(str(f.resolution)) >= ws(50) },
    { label: `Reflection (${ws(40)}+ words)`, ok: wc(str(f.reflection)) >= ws(40) },
  ];
  const ready = checks.every((c) => c.ok);
  if (!partnerFormed && !done) {
    return <ActivityCard icon={AlertTriangle} n={2} title="Partnership Problem" desc="Form a partnership first (Activity 1)." xp={XP.collab} done={false}><p className="text-sm text-muted-foreground">Once you've chosen a partner, a problem will surface here.</p></ActivityCard>;
  }
  if (done) {
    return (
      <ActivityCard icon={AlertTriangle} n={2} title="Partnership Problem" desc="How you handled the conflict." xp={XP.collab} done>
        <div className="rounded-xl bg-muted p-4"><ResultRow label="The problem">{str(saved.__problem) || problem}</ResultRow><ResultRow label="Your message">{str(saved.message)}</ResultRow><ResultRow label="Resolution">{str(saved.resolution)}</ResultRow><ResultRow label="Reflection">{str(saved.reflection)}</ResultRow></div>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={AlertTriangle} n={2} title="Partnership Problem" desc="A conflict came up with your partner." xp={XP.collab} done={false}>
      <div className="space-y-3">
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3"><p className="text-xs font-bold uppercase tracking-wider text-destructive mb-1">Problem</p><p className="text-sm">{problem}</p></div>
        <WField label={`Write a professional message to your partner (${ws(75)}+ words)`} value={str(f.message)} onChange={(v) => set("message", v)} min={ws(75)} rows={4} />
        <WField label={`Propose a resolution with specific terms (${ws(50)}+ words)`} value={str(f.resolution)} onChange={(v) => set("resolution", v)} min={ws(50)} rows={3} />
        <WField label={`What would you do differently choosing a partner next time? (${ws(40)}+ words)`} value={str(f.reflection)} onChange={(v) => set("reflection", v)} min={ws(40)} />
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, { ...f, __problem: problem }, XP.collab)}><ArrowRight className="w-4 h-4 mr-1.5" /> Send & resolve</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ COLLABORATION · Activity 3 — Vendor Negotiation ═══ */
function VendorNegotiation({ a, bt, complete }: AProps) {
  const id = "vendor"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const offer = VENDOR_OFFERS[bt];
  const [f, set] = useForm(saved, { analysis: "", counter: "" });
  const checks = [
    { label: `Analyze the offer (${ws(60)}+ words)`, ok: wc(str(f.analysis)) >= ws(60) },
    { label: `Counter-offer letter (${ws(75)}+ words)`, ok: wc(str(f.counter)) >= ws(75) },
  ];
  const ready = checks.every((c) => c.ok);
  const evaluate = () => {
    const text = str(f.counter); const lower = text.toLowerCase();
    const m = text.match(/(\d{1,2})\s*%/);
    const askedPct = m ? parseInt(m[1], 10) : 0;
    const hasReason = /(volume|loyal|bulk|long.?term|repeat|consistent|relationship)/i.test(lower);
    let outcome: { ok: boolean; discount: number; reply: string };
    if (askedPct > 0 && askedPct < 20 && hasReason) {
      outcome = { ok: true, discount: 10, reply: `Dear valued customer,\n\nWe appreciate your continued business and the volume you've outlined. We're pleased to offer you a 10% discount, bringing your unit price to ${(offer.unitPrice * 0.9).toFixed(2)} IC. We look forward to a long partnership.\n\nRegards,\nVendor Sales` };
    } else if (askedPct >= 20 && !hasReason) {
      outcome = { ok: false, discount: 0, reply: `Dear customer,\n\nA discount of that size with no business justification isn't something we can entertain. Our price stands at ${offer.unitPrice.toFixed(2)} IC per unit. We'll move on to other buyers.\n\nRegards,\nVendor Sales` };
    } else if (askedPct >= 20 && hasReason) {
      outcome = { ok: true, discount: 10, reply: `Dear customer,\n\nThat's a steep ask, but your volume and loyalty count for something. We can meet you partway with 10% off — ${(offer.unitPrice * 0.9).toFixed(2)} IC per unit. Final offer.\n\nRegards,\nVendor Sales` };
    } else {
      outcome = { ok: true, discount: 5, reply: `Dear customer,\n\nWe can offer a modest 5% courtesy discount — ${(offer.unitPrice * 0.95).toFixed(2)} IC per unit. Sharpen your case (volume, loyalty) next time for more.\n\nRegards,\nVendor Sales` };
    }
    return outcome;
  };
  if (done) {
    const o = (saved.__outcome as { ok: boolean; discount: number; reply: string }) || { ok: true, discount: 0, reply: "" };
    return (
      <ActivityCard icon={Truck} n={3} title="Vendor Negotiation" desc="The vendor replied." xp={XP.collab} done>
        <div className="rounded-xl bg-muted p-4 mb-2"><ResultRow label="Your analysis">{str(saved.analysis)}</ResultRow><ResultRow label="Your counter-offer">{str(saved.counter)}</ResultRow></div>
        <div className="rounded-xl border p-4 whitespace-pre-wrap text-sm" style={{ borderColor: o.ok ? `${NEON}55` : "#dc262655", background: o.ok ? `${NEON}0d` : "#dc26260d" }}>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: o.ok ? NEON : "#dc2626" }}>Vendor reply {o.discount ? `· ${o.discount}% off` : "· no deal"}</p>{o.reply}
        </div>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={Truck} n={3} title="Vendor Negotiation" desc="A vendor sent a supply offer." xp={XP.collab} done={false}>
      <div className="space-y-3">
        <div className="rounded-xl bg-muted p-3 text-sm"><p className="font-bold mb-1">Vendor opening offer — {offer.item}</p><div className="flex gap-4 text-xs"><span>Price: <b>{offer.unitPrice.toFixed(2)} IC/unit</b></span><span>Min order: <b>{offer.moq}</b></span><span>Delivery: <b>{offer.deliveryDays} days</b></span></div></div>
        <WField label={`Analyze the offer — good or bad for you, and why? (${ws(60)}+ words)`} value={str(f.analysis)} onChange={(v) => set("analysis", v)} min={ws(60)} rows={3} />
        <WField label={`Write a counter-offer letter with specific numbers (${ws(75)}+ words)`} value={str(f.counter)} onChange={(v) => set("counter", v)} min={ws(75)} rows={4} placeholder="Tip: ask for a realistic discount (%), and justify it with volume or loyalty." />
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, { ...f, __outcome: evaluate() }, XP.collab)}><Truck className="w-4 h-4 mr-1.5" /> Send counter-offer</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ MARKETING · Activity 1 — Brand Identity ═══ */
const VOICES = ["Formal", "Casual", "Bold", "Friendly", "Playful", "Luxurious"];
function BrandIdentity({ a, complete }: AProps) {
  const id = "brand"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const [f, set] = useForm(saved, {
    mission: "", drafts: (saved.drafts as string[]) || [], tagline: "", voice: "Bold", ex1: "", ex2: "",
    cPrimary: "#00ff88", cSecondary: "#0a0f0d", cAccent: "#f97316", whyP: "", whyS: "", whyA: "",
  });
  const [draft, setDraft] = useState("");
  const drafts = (f.drafts as string[]) || [];
  const addDraft = () => { const d = draft.trim(); if (!d) return; if (wc(d) > 10) { toast.error("Tagline must be 10 words or fewer"); return; } set("drafts", [...drafts, d]); setDraft(""); };
  const checks = [
    { label: `Brand mission (${ws(50)}+ words)`, ok: wc(str(f.mission)) >= ws(50) },
    { label: "At least 3 tagline drafts", ok: drafts.length >= 3 },
    { label: "Finalize a tagline (≤10 words)", ok: !!str(f.tagline) && wc(str(f.tagline)) <= 10 },
    { label: `Voice example 1 (${ws(30)}+ words)`, ok: wc(str(f.ex1)) >= ws(30) },
    { label: `Voice example 2 (${ws(30)}+ words)`, ok: wc(str(f.ex2)) >= ws(30) },
    { label: `Why primary color (${ws(20)}+ words)`, ok: wc(str(f.whyP)) >= ws(20) },
    { label: `Why secondary color (${ws(20)}+ words)`, ok: wc(str(f.whyS)) >= ws(20) },
    { label: `Why accent color (${ws(20)}+ words)`, ok: wc(str(f.whyA)) >= ws(20) },
  ];
  const ready = checks.every((c) => c.ok);
  if (done) {
    return (
      <ActivityCard icon={Palette} n={1} title="Brand Identity" desc="Your brand." xp={XP.mkt} done>
        <div className="rounded-xl bg-muted p-4">
          <p className="font-display text-lg font-extrabold" style={{ color: str(saved.cPrimary) }}>"{str(saved.tagline)}"</p>
          <div className="flex gap-2 my-2">{[saved.cPrimary, saved.cSecondary, saved.cAccent].map((c, i) => <span key={i} className="w-8 h-8 rounded-lg border border-border" style={{ background: str(c) }} />)}</div>
          <ResultRow label="Mission">{str(saved.mission)}</ResultRow>
          <ResultRow label={`Voice: ${str(saved.voice)}`}>{str(saved.ex1)} · {str(saved.ex2)}</ResultRow>
        </div>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={Palette} n={1} title="Brand Identity" desc="Define your brand from scratch." xp={XP.mkt} done={false}>
      <div className="space-y-3">
        <WField label={`Brand mission statement (${ws(50)}+ words)`} value={str(f.mission)} onChange={(v) => set("mission", v)} min={ws(50)} rows={3} />
        <div>
          <label className="text-sm font-semibold">Tagline drafts ({drafts.length}/3 min) <span className="text-muted-foreground font-normal">· max 10 words each</span></label>
          <div className="flex gap-2 mt-1"><Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Draft a tagline…" /><Button type="button" variant="outline" onClick={addDraft}><Plus className="w-4 h-4" /></Button></div>
          {drafts.length > 0 && <div className="mt-2 space-y-1">{drafts.map((d, i) => <button key={i} onClick={() => set("tagline", d)} className={cn("w-full text-left text-sm px-3 py-1.5 rounded-lg border press-scale", f.tagline === d ? "border-primary bg-primary/10" : "border-border bg-muted")}>{f.tagline === d ? "★ " : ""}{d}</button>)}<p className="text-xs text-muted-foreground">Tap a draft to finalize it as your tagline.</p></div>}
        </div>
        <div>
          <label className="text-sm font-semibold">Brand voice</label>
          <div className="flex flex-wrap gap-2 mt-1">{VOICES.map((v) => <button key={v} onClick={() => set("voice", v)} className={cn("px-3 py-1 rounded-full text-xs font-bold border press-scale", f.voice === v ? "border-primary bg-primary/10" : "border-border bg-muted")}>{v}</button>)}</div>
        </div>
        <WField label={`Example sentence 1 in your "${f.voice}" voice (${ws(30)}+ words)`} value={str(f.ex1)} onChange={(v) => set("ex1", v)} min={ws(30)} />
        <WField label={`Example sentence 2 in your "${f.voice}" voice (${ws(30)}+ words)`} value={str(f.ex2)} onChange={(v) => set("ex2", v)} min={ws(30)} />
        <div className="grid grid-cols-3 gap-2">
          {([["cPrimary", "whyP", "Primary"], ["cSecondary", "whyS", "Secondary"], ["cAccent", "whyA", "Accent"]] as const).map(([ck, wk, lbl]) => (
            <div key={ck}>
              <label className="text-xs font-semibold">{lbl}</label>
              <input type="color" value={str(f[ck])} onChange={(e) => set(ck, e.target.value)} className="w-full h-9 rounded-lg bg-transparent border border-border mt-1 cursor-pointer" />
            </div>
          ))}
        </div>
        <WField label={`Why the primary color fits (${ws(20)}+ words)`} value={str(f.whyP)} onChange={(v) => set("whyP", v)} min={ws(20)} rows={2} />
        <WField label={`Why the secondary color fits (${ws(20)}+ words)`} value={str(f.whyS)} onChange={(v) => set("whyS", v)} min={ws(20)} rows={2} />
        <WField label={`Why the accent color fits (${ws(20)}+ words)`} value={str(f.whyA)} onChange={(v) => set("whyA", v)} min={ws(20)} rows={2} />
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, f, XP.mkt)}><Palette className="w-4 h-4 mr-1.5" /> Lock in brand</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ MARKETING · Activity 2 — Marketing Plan ═══ */
const CHANNELS = ["Social Media", "Email", "Flyers", "Events", "Word of Mouth", "Influencers"];
function MarketingPlan({ a, complete }: AProps) {
  const id = "marketingPlan"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const [f, set] = useForm(saved, {
    audience: "", channels: (saved.channels as string[]) || [], ch0: "", ch1: "",
    budget: "10", m0: "", m1: "", m2: "", m3: "",
  });
  const channels = (f.channels as string[]) || [];
  const toggleCh = (c: string) => {
    if (channels.includes(c)) set("channels", channels.filter((x) => x !== c));
    else if (channels.length < 2) set("channels", [...channels, c]);
    else toast.error("Choose exactly 2 channels");
  };
  const budget = num(f.budget);
  const checks = [
    { label: `Target audience (${ws(60)}+ words)`, ok: wc(str(f.audience)) >= ws(60) },
    { label: "Choose 2 channels", ok: channels.length === 2 },
    { label: `${channels[0] || "Channel 1"} plan (50+ words)`, ok: channels.length >= 1 && wc(str(f.ch0)) >= ws(50) },
    { label: `${channels[1] || "Channel 2"} plan (50+ words)`, ok: channels.length >= 2 && wc(str(f.ch1)) >= ws(50) },
    { label: "Budget 5–30% of revenue", ok: budget >= 5 && budget <= 30 },
    { label: "4 launch milestones (20+ words each)", ok: [f.m0, f.m1, f.m2, f.m3].every((m) => wc(str(m)) >= ws(20)) },
  ];
  const ready = checks.every((c) => c.ok);
  if (done) {
    return (
      <ActivityCard icon={ClipboardList} n={2} title="Marketing Plan" desc="Your plan." xp={XP.mkt} done>
        <div className="rounded-xl bg-muted p-4"><ResultRow label="Audience">{str(saved.audience)}</ResultRow><ResultRow label={`Channels (${num(saved.budget)}% budget)`}>{(saved.channels as string[] || []).join(", ")}</ResultRow><ResultRow label="Milestones">{[saved.m0, saved.m1, saved.m2, saved.m3].map((m) => str(m)).join("\n")}</ResultRow></div>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={ClipboardList} n={2} title="Marketing Plan" desc="Plan how you'll reach customers." xp={XP.mkt} done={false}>
      <div className="space-y-3">
        <WField label={`Target audience description (${ws(60)}+ words)`} value={str(f.audience)} onChange={(v) => set("audience", v)} min={ws(60)} rows={3} />
        <div>
          <label className="text-sm font-semibold">Pick exactly 2 channels</label>
          <div className="flex flex-wrap gap-2 mt-1">{CHANNELS.map((c) => <button key={c} onClick={() => toggleCh(c)} className={cn("px-3 py-1 rounded-full text-xs font-bold border press-scale", channels.includes(c) ? "border-primary bg-primary/10" : "border-border bg-muted")}>{c}</button>)}</div>
        </div>
        {channels.length >= 1 && <WField label={`${channels[0]} — what you'd post, how often, expected outcome (${ws(50)}+ words)`} value={str(f.ch0)} onChange={(v) => set("ch0", v)} min={ws(50)} rows={3} />}
        {channels.length >= 2 && <WField label={`${channels[1]} — what you'd post, how often, expected outcome (${ws(50)}+ words)`} value={str(f.ch1)} onChange={(v) => set("ch1", v)} min={ws(50)} rows={3} />}
        <div>
          <label className="text-sm font-semibold">Marketing budget (% of revenue)</label>
          <Input type="number" value={str(f.budget)} onChange={(e) => set("budget", e.target.value)} className="mt-1" />
          {budget > 30 && <p className="text-xs text-warning mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Most small businesses spend 7–12% of revenue on marketing.</p>}
        </div>
        <div>
          <label className="text-sm font-semibold">30-day launch plan — 4 milestones (20+ words each)</label>
          <div className="space-y-2 mt-1">{(["m0", "m1", "m2", "m3"] as const).map((k, i) => <WField key={k} label={`Milestone ${i + 1}`} value={str(f[k])} onChange={(v) => set(k, v)} min={ws(20)} rows={2} />)}</div>
        </div>
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, f, XP.mkt)}><Megaphone className="w-4 h-4 mr-1.5" /> Submit plan</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ MARKETING · Activity 3 — Ad Campaign ═══ */
const PLATFORMS = ["Instagram caption", "Email", "Flyer", "TikTok script"];
function AdCampaign({ a, complete }: AProps) {
  const id = "adCampaign"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const brand = (a.data.brand as Record<string, unknown>) || {};
  const tagline = str(brand.tagline) || "Your tagline here";
  const colors = { p: str(brand.cPrimary) || NEON, s: str(brand.cSecondary) || "#0a0f0d", acc: str(brand.cAccent) || "#f97316" };
  const [f, set] = useForm(saved, { p0: "Instagram caption", p1: "Email", copy0: "", copy1: "", who0: "", act0: "", meas0: "", who1: "", act1: "", meas1: "" });
  const checks = [
    { label: `Ad 1 copy (${ws(60)}+ words)`, ok: wc(str(f.copy0)) >= ws(60) },
    { label: `Ad 1 — who/action/measure (${ws(40)}+ words)`, ok: wc(`${str(f.who0)} ${str(f.act0)} ${str(f.meas0)}`) >= 40 },
    { label: `Ad 2 copy (${ws(60)}+ words)`, ok: wc(str(f.copy1)) >= ws(60) },
    { label: `Ad 2 — who/action/measure (${ws(40)}+ words)`, ok: wc(`${str(f.who1)} ${str(f.act1)} ${str(f.meas1)}`) >= 40 },
  ];
  const ready = checks.every((c) => c.ok);
  const Preview = ({ platform, copy }: { platform: string; copy: string }) => (
    <div className="rounded-xl overflow-hidden border border-border" style={{ background: colors.s }}>
      <div className="px-3 py-2 flex items-center gap-2" style={{ background: colors.p }}><span className="w-5 h-5 rounded-full" style={{ background: colors.acc }} /><span className="text-xs font-bold" style={{ color: colors.s }}>your_brand · {platform}</span></div>
      <div className="p-3"><p className="text-sm whitespace-pre-wrap" style={{ color: "#fff" }}>{copy || "Your ad copy preview…"}</p><p className="text-xs mt-2 font-bold" style={{ color: colors.acc }}>{tagline}</p></div>
    </div>
  );
  if (done) {
    return (
      <ActivityCard icon={Rocket} n={3} title="Ad Campaign" desc="Your live ads." xp={XP.mkt} done>
        <div className="grid sm:grid-cols-2 gap-3"><Preview platform={str(saved.p0)} copy={str(saved.copy0)} /><Preview platform={str(saved.p1)} copy={str(saved.copy1)} /></div>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={Rocket} n={3} title="Ad Campaign" desc="Create real ads for 2 platforms." xp={XP.mkt} done={false}>
      <div className="space-y-4">
        {([0, 1] as const).map((i) => {
          const pk = `p${i}` as const, ck = `copy${i}` as const, wk = `who${i}` as const, ak = `act${i}` as const, mk = `meas${i}` as const;
          return (
            <div key={i} className="space-y-2 rounded-xl border border-border p-3">
              <div className="flex flex-wrap gap-2">{PLATFORMS.map((p) => <button key={p} onClick={() => set(pk, p)} className={cn("px-2.5 py-1 rounded-full text-xs font-bold border press-scale", f[pk] === p ? "border-primary bg-primary/10" : "border-border bg-muted")}>{p}</button>)}</div>
              <WField label={`Ad ${i + 1} copy (${ws(60)}+ words)`} value={str(f[ck])} onChange={(v) => set(ck, v)} min={ws(60)} rows={3} />
              <div className="grid sm:grid-cols-3 gap-2">
                <WField label="Who is this targeting?" value={str(f[wk])} onChange={(v) => set(wk, v)} min={0} rows={2} />
                <WField label="What action do you want?" value={str(f[ak])} onChange={(v) => set(ak, v)} min={0} rows={2} />
                <WField label="How will you measure success?" value={str(f[mk])} onChange={(v) => set(mk, v)} min={0} rows={2} />
              </div>
              <p className="text-[11px] text-muted-foreground">Who + action + measure together need 40+ words.</p>
              <Preview platform={str(f[pk])} copy={str(f[ck])} />
            </div>
          );
        })}
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, f, XP.mkt)}><Rocket className="w-4 h-4 mr-1.5" /> Launch campaign</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ BUSINESS SUMMARY REPORT ═══ */
/* ═══ Generic renderer for a rotating quarterly operations brief ═══ */
function BriefActivity({ a, bt, brief, n, complete }: { a: ActivitiesState; bt: BusinessType; brief: QuarterlyBrief; n: number; complete: BriefComplete }) {
  const id = brief.id;
  const done = a.done.includes(id);
  const saved = a.data[id] || {};
  const defaults: Fields = { __choice: "" };
  brief.fields.forEach((f) => { defaults[f.key] = ""; });
  const [f, set] = useForm(saved, defaults);
  const scenario = brief.scenario.replace("{biz}", bizDef(bt).label);
  const checks = [
    ...(brief.choice ? [{ label: `Choose: ${brief.choice.label}`, ok: !!str(f.__choice) }] : []),
    ...brief.fields.map((fl) => ({ label: `${fl.label} (${ws(fl.min)}+ words)`, ok: wc(str(f[fl.key])) >= ws(fl.min) })),
  ];
  const ready = checks.every((c) => c.ok);
  const Icon = brief.icon;
  if (done) {
    return (
      <ActivityCard icon={Icon} n={n} title={brief.title} desc="Submitted this quarter." xp={brief.xp} done>
        <div className="rounded-xl bg-muted p-4">
          {brief.choice && str(saved.__choice) && <ResultRow label={brief.choice.label}>{str(saved.__choice)}</ResultRow>}
          {brief.fields.map((fl) => <ResultRow key={fl.key} label={fl.label}>{str(saved[fl.key])}</ResultRow>)}
        </div>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={Icon} n={n} title={brief.title} desc="A fresh operations brief for this quarter." xp={brief.xp} done={false}>
      <div className="space-y-3">
        <div className="rounded-2xl border p-3" style={{ borderColor: `${NEON}55`, background: `${NEON}0d` }}>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: NEON }}>Scenario</p>
          <p className="text-sm">{scenario}</p>
        </div>
        {brief.choice && (
          <div>
            <label className="text-sm font-semibold">{brief.choice.label}</label>
            <div className="flex flex-wrap gap-2 mt-1">{brief.choice.options.map((o) => (
              <button key={o} onClick={() => set("__choice", o)} className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border press-scale", f.__choice === o ? "border-primary bg-primary/10" : "border-border bg-muted")}>{o}</button>
            ))}</div>
          </div>
        )}
        {brief.fields.map((fl) => <WField key={fl.key} label={fl.label} value={str(f[fl.key])} onChange={(v) => set(fl.key, v)} min={ws(fl.min)} rows={fl.rows} placeholder={fl.placeholder} />)}
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(brief, f)}><ArrowRight className="w-4 h-4 mr-1.5" /> Submit brief</Button>
      </div>
    </ActivityCard>
  );
}

function SummaryReport({ a, bt, qi }: { a: ActivitiesState; bt: BusinessType; qi: number }) {
  const d = a.data;
  const def = bizDef(bt);
  const S = (id: string, k: string) => str((d[id] as Record<string, unknown>)?.[k]);
  const totalXP = a.xpAwarded.reduce((sum, id) => sum + (["partner", "partnerProblem", "vendor"].includes(id) ? XP.collab : XP.pd), 0);
  const quarter = qi + 1;
  // Quarter 2+ runs rotating briefs, so summarize whichever ones were submitted.
  if (qi > 0) {
    const cats: { t: string; cat: "product" | "collab" | "marketing" }[] = [
      { t: "Product", cat: "product" }, { t: "Collaboration", cat: "collab" }, { t: "Marketing", cat: "marketing" },
    ];
    return (
      <div className="space-y-4">
        <div className="rounded-3xl p-6 text-center" style={{ background: "linear-gradient(135deg,#0f2d1e,#06291f)" }}>
          <Trophy className="w-12 h-12 mx-auto mb-1" style={{ color: NEON }} />
          <p className="font-display text-2xl font-extrabold text-white">Quarter {quarter} Operations Report</p>
          <p className="text-white/55 text-sm">{def.label} · all {ALL_ACTIVITIES.length} ops run this quarter</p>
        </div>
        {cats.map(({ t, cat }) => (
          <Card key={t} variant="elevated"><CardContent className="pt-5">
            <p className="font-display text-lg font-extrabold mb-2" style={{ color: NEON }}>{t}</p>
            {briefsForCategory(cat, qi).map((b) => (
              <ResultRow key={b.id} label={b.title}>{b.fields.map((fl) => S(b.id, fl.key)).filter(Boolean).join(" — ") || "—"}</ResultRow>
            ))}
          </CardContent></Card>
        ))}
        <p className="text-xs text-muted-foreground text-center">All responses are saved to your business record for teacher review.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="rounded-3xl p-6 text-center" style={{ background: "linear-gradient(135deg,#0f2d1e,#06291f)" }}>
        <Trophy className="w-12 h-12 mx-auto mb-1" style={{ color: NEON }} />
        <p className="font-display text-2xl font-extrabold text-white">Quarter {quarter} Operations Report</p>
        <p className="text-white/55 text-sm">{def.label} · all {ALL_ACTIVITIES.length} ops run this quarter · {totalXP} InvestiCoins this quarter</p>
      </div>
      {[
        { t: "Product", items: [["Product brief", S("productDoc", "name")], ["Problem", S("productDoc", "problem")], ["Pricing", `${num(d.pricing?.["price"])} IC (${str(d.pricing?.["ptype"])})`], ["Feedback v2 plan", S("feedback", "v2")]] },
        { t: "Collaboration", items: [["Partner proposal", S("partner", "proposal")], ["Problem handled", S("partnerProblem", "resolution")], ["Vendor counter", S("vendor", "counter")]] },
        { t: "Marketing", items: [["Mission", S("brand", "mission")], ["Tagline", S("brand", "tagline")], ["Audience", S("marketingPlan", "audience")], ["Ad 1", S("adCampaign", "copy0")]] },
      ].map((sec) => (
        <Card key={sec.t} variant="elevated"><CardContent className="pt-5">
          <p className="font-display text-lg font-extrabold mb-2" style={{ color: NEON }}>{sec.t}</p>
          {sec.items.map(([label, val]) => <ResultRow key={label} label={label}>{val || "—"}</ResultRow>)}
        </CardContent></Card>
      ))}
      <p className="text-xs text-muted-foreground text-center">All responses are saved to your business record for teacher review.</p>
    </div>
  );
}

/* ════════════════════════ LIVING BUSINESS (runs over months) ════════════════════════ */
// Big, kid-friendly meter: large number readout + a chunky colored bar.
function MetricBar({ label, value, icon: Icon }: { label: string; value: number; icon: LucideIcon }) {
  const color = value >= 66 ? "#1D9E75" : value >= 33 ? "#EF9F27" : "#dc2626";
  return (
    <div className="bg-white/5 rounded-xl p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/50">
          <Icon className="w-3.5 h-3.5" style={{ color }} /> {label}
        </span>
        <span className="font-display text-2xl font-extrabold tabular-nums leading-none" style={{ color }}>{Math.round(value)}</span>
      </div>
      <div className="h-2.5 mt-2 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}
// Each headline number gets its own icon + color so kids can tell them apart fast.
function StatTile({ label, value, suffix, icon: Icon, color }: { label: string; value: string; suffix?: string; icon: LucideIcon; color: string }) {
  return (
    <div className="bg-white/5 rounded-xl px-3 py-3">
      <div className="flex items-center gap-1.5">
        <span className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
          <Icon className="w-3.5 h-3.5" style={{ color }} />
        </span>
        <p className="text-[11px] text-white/55 uppercase font-bold tracking-wide leading-tight">{label}</p>
      </div>
      <p className="font-display font-extrabold text-white tabular-nums leading-none mt-2 text-[28px]">
        {value}{suffix && <span className="text-sm font-bold text-white/45 ml-1">{suffix}</span>}
      </p>
    </div>
  );
}
function BusinessDashboard({ sim }: { sim: BizState }) {
  const st = statusLabel(sim);
  return (
    <div className="hud-panel p-4 mb-4 relative z-10">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <p className="font-display text-base font-extrabold text-white flex items-center gap-2"><Activity className="w-4 h-4" style={{ color: NEON }} /> Business status · Month {sim.month}</p>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${st.color}22`, color: st.color }}>{st.label}</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <StatTile label="Customers" value={sim.customers.toLocaleString()} icon={Users} color="#3BA7C4" />
          <StatTile label="Cash" value={sim.cash.toLocaleString()} suffix="IC" icon={Coins} color={NEON} />
          <StatTile label="Products" value={String(sim.products.length)} icon={Package} color="#A78BFA" />
          <StatTile label="Money / month" value={monthlyRevenue(sim).toLocaleString()} suffix="IC" icon={TrendingUp} color="#F5B301" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <MetricBar label="Reputation" value={sim.reputation} icon={Heart} />
          <MetricBar label="Brand" value={sim.brand} icon={Sparkles} />
        </div>
      </div>
    </div>
  );
}
function MonthlyOps({ sim, onGenerate, onResolve, onRebuild }: { sim: BizState; onGenerate: () => void; onResolve: (i: number, w: number) => void; onRebuild: () => void }) {
  const [opt, setOpt] = useState<number | null>(null);
  const [react, setReact] = useState("");
  const s = sim.pending;
  if (sim.status === "failed") {
    return (
      <Card variant="elevated"><CardContent className="pt-5 text-center space-y-3">
        <Skull className="w-12 h-12 mx-auto text-destructive" />
        <div><p className="font-display text-xl font-extrabold">Your business folded in month {sim.month}.</p><p className="text-sm text-muted-foreground">Cash, customers, or reputation hit zero. The lessons are in the wreckage.</p></div>
        <div className="rounded-xl bg-muted p-3 space-y-1 text-left">{sim.log.slice(-3).reverse().map((l, i) => <p key={i} className="text-xs text-muted-foreground">M{l.month}: {l.text}</p>)}</div>
        <Button className="press-scale" onClick={onRebuild}><Rocket className="w-4 h-4 mr-1.5" /> Rebuild from scratch</Button>
      </CardContent></Card>
    );
  }
  return (
    <Card variant="elevated"><CardContent className="pt-5 space-y-3">
      <h3 className="font-display text-lg font-extrabold flex items-center gap-2"><Activity className="w-5 h-5" style={{ color: NEON }} /> Run the business — Month {sim.month}</h3>
      {!s ? (
        <>
          <p className="text-sm text-muted-foreground">A new situation hits every month and demands a decision. Keep your business alive and growing — for months.</p>
          <Button className="w-full press-scale" onClick={onGenerate}><ArrowRight className="w-4 h-4 mr-1.5" /> Start month {sim.month}</Button>
          {sim.log.length > 0 && <div className="rounded-xl bg-muted p-3 space-y-1">{sim.log.slice(-4).reverse().map((l, i) => <p key={i} className="text-xs text-foreground/70">M{l.month}: {l.text}</p>)}</div>}
        </>
      ) : (
        <>
          <div className="rounded-2xl border p-4" style={{ borderColor: `${NEON}55`, background: `${NEON}0d` }}>
            <div className="flex items-start gap-3"><span className="text-3xl leading-none">{s.emoji}</span><div><p className="font-display font-extrabold text-lg">{s.title}</p><p className="text-sm text-muted-foreground">{s.prompt}</p></div></div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1">Choose your move</p>
            <div className="grid gap-2">{s.options.map((o, i) => (
              <button key={i} onClick={() => setOpt(i)} className={cn("text-left px-3 py-2 rounded-xl border text-sm font-medium transition-all press-scale", opt === i ? "border-primary bg-primary/10" : "border-border bg-muted hover:bg-muted/70")}>{o.label}</button>
            ))}</div>
          </div>
          <WField label={s.reactLabel} value={react} onChange={setReact} min={s.reactMin} rows={3} />
          <Incomplete items={[{ label: "Pick a move", ok: opt != null }, { label: `Write your reaction (${s.reactMin}+ words)`, ok: wc(react) >= s.reactMin }]} />
          <Button className="w-full press-scale" disabled={opt == null || wc(react) < s.reactMin} onClick={() => { onResolve(opt as number, wc(react)); setOpt(null); setReact(""); }}><CheckCircle2 className="w-4 h-4 mr-1.5" /> Resolve month {sim.month}</Button>
        </>
      )}
    </CardContent></Card>
  );
}
function ProductLine({ sim, onAdd }: { sim: BizState; onAdd: (p: { name: string; price: number; pitch: string }) => void }) {
  const [name, setName] = useState(""); const [price, setPrice] = useState(""); const [pitch, setPitch] = useState(""); const [open, setOpen] = useState(false);
  const ready = name.trim().length >= 2 && num(price) > 0 && wc(pitch) >= ws(25);
  const submit = () => { onAdd({ name: name.trim(), price: num(price), pitch: pitch.trim() }); setName(""); setPrice(""); setPitch(""); setOpen(false); };
  return (
    <Card variant="elevated"><CardContent className="pt-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-extrabold flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> Your product line</h3>
          <p className="text-sm text-muted-foreground">Keep adding items — a bigger catalog grows your customer base.</p>
        </div>
        <Badge variant="outline" className="shrink-0">{sim.products.length} items</Badge>
      </div>
      {sim.products.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-2">{sim.products.map((p) => (
          <div key={p.id} className="rounded-xl bg-muted p-3"><div className="flex items-center justify-between"><p className="font-bold text-sm">{p.name}</p><span className="text-sm font-bold text-gold">{p.price} IC</span></div><p className="text-xs text-muted-foreground">added month {p.month}</p><p className="text-xs text-foreground/70 mt-1">{p.pitch}</p></div>
        ))}</div>
      )}
      {open ? (
        <div className="space-y-2 rounded-xl border border-border p-3">
          <Input placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="number" placeholder="Price (IC)" value={price} onChange={(e) => setPrice(e.target.value)} />
          <WField label={`Pitch — what it is and who it's for (${ws(25)}+ words)`} value={pitch} onChange={setPitch} min={ws(25)} rows={2} />
          <Incomplete items={[{ label: "Name", ok: name.trim().length >= 2 }, { label: "Price greater than 0", ok: num(price) > 0 }, { label: `Pitch (${ws(25)}+ words)`, ok: wc(pitch) >= ws(25) }]} />
          <div className="flex gap-2"><Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancel</Button><Button className="flex-1 press-scale" disabled={!ready} onClick={submit}><Plus className="w-4 h-4 mr-1" /> Add product (+75 🪙)</Button></div>
        </div>
      ) : (
        <Button variant="outline" className="w-full press-scale" onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-1.5" /> Add a product to your line</Button>
      )}
    </CardContent></Card>
  );
}
