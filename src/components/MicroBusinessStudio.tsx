import React, { useEffect, useState, useCallback, useMemo, useRef, useContext, createContext } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { looksLowEffort, LOW_EFFORT_MESSAGE } from "@/lib/answerQuality";
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
  Coins, TrendingUp, Heart, Sparkles, X, type LucideIcon,
} from "lucide-react";
import {
  BUSINESS_TYPES, bizDef, PRODUCT_KITS, BETA_REVIEWS, PARTNERS, PARTNER_PROBLEMS, VENDOR_OFFERS,
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
import { useBizDeals } from "@/hooks/useBizDeals";
import PartnerDealsPanel from "@/components/PartnerDealsPanel";
// Teacher-adjustable writing workload: ws() scales every word minimum by the
// class's writing_scale setting (Light/Standard/Extended in TeacherDashboard).
import { ws, initWritingScale, subscribeWritingScale } from "@/lib/writingScale";
import {
  generateProductProfile, generateCoach, coinsForScore, gradeLabel, PROFILE_KEY, coachKey,
  type ProductProfile, type CoachNote,
} from "@/lib/productProfile";

// Where an activity's base (pre-grade) coin reward is stashed so the async
// grader knows how much to scale when it lands.
const xpBaseKey = (activityId: string) => `__xpbase_${activityId}`;

const NEON = "#00ff88";

// Studio-wide context so any activity can read the AI-generated product profile
// (real unit economics) and its own personalized coach note without prop drilling.
type StudioCtx = { profile: ProductProfile | null; coach: (activityId: string) => CoachNote | null };
const StudioContext = createContext<StudioCtx>({ profile: null, coach: () => null });
const useStudio = () => useContext(StudioContext);
type Fields = Record<string, unknown>;
type Complete = (id: string, fields: Fields, xp: number) => void;
type BriefComplete = (brief: QuarterlyBrief, fields: Fields) => void;

/* ════════════════════════════ shared bits ════════════════════════════ */
function Counter({ n, min, max }: { n: number; min?: number; max?: number }) {
  const ok = max != null ? n > 0 && n <= max : n >= (min || 0);
  return <span className={cn("text-[11px] font-bold tabular-nums", ok ? "text-success" : "text-destructive")}>{n}{max != null ? `/${max} max` : `/${min} words`}</span>;
}
function WField({ label, value, onChange, min, rows = 3, placeholder }: { label: string; value: string; onChange: (v: string) => void; min: number; rows?: number; placeholder?: string }) {
  const n = wc(value); const junk = !!value.trim() && looksLowEffort(value); const ok = n >= min && !junk;
  return (
    <div>
      <div className="flex items-center justify-between mb-1"><label className="text-sm font-semibold">{label}</label><Counter n={n} min={min} /></div>
      <Textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cn(junk ? "border-destructive/60" : ok && value ? "border-success/50" : value ? "border-destructive/40" : "")} />
      {junk && <p className="text-[11px] text-destructive mt-1">Write a real answer - not random letters.</p>}
    </div>
  );
}
// A numbered fill-in list: instead of one blank box, kids get N numbered slots
// to complete. Each row turns green when filled (or when it hits minWords).
function ListField({ label, hint, items, onChange, count, minWords = 0, placeholder }: {
  label: string; hint?: string; items: string[]; onChange: (items: string[]) => void;
  count: number; minWords?: number; placeholder?: (i: number) => string;
}) {
  const rows = Array.from({ length: count }, (_, i) => items[i] ?? "");
  const setRow = (i: number, v: string) => { const next = [...rows]; next[i] = v; onChange(next); };
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
      <div className="space-y-2 mt-1.5">
        {rows.map((val, i) => {
          const ok = minWords > 0 ? wc(val) >= minWords : val.trim().length > 0;
          return (
            <div key={i} className="flex items-center gap-2">
              <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0", ok && val ? "bg-success/15 text-success" : "bg-muted text-muted-foreground")}>{i + 1}</span>
              <Input value={val} onChange={(e) => setRow(i, e.target.value)} placeholder={placeholder?.(i)} className={cn("flex-1", ok && val ? "border-success/50" : "")} />
            </div>
          );
        })}
      </div>
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
// Apple-style surface: a frosted, hairline-bordered card with a big corner
// radius, soft depth and a gentle spring entrance. The studio's signature
// material - used for activities and the run-your-business tools.
function AppleCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={cn(
        "rounded-[26px] border border-black/[0.06] dark:border-white/10 bg-card/80 backdrop-blur-xl",
        "shadow-[0_12px_40px_-16px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
function ActivityCard({ icon: Icon, n, title, desc, xp, done, children }: { icon: LucideIcon; n: number; title: string; desc: string; xp: number; done: boolean; children: React.ReactNode }) {
  return (
    <AppleCard className="p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2"><span className="w-7 h-7 rounded-[10px] flex items-center justify-center" style={{ background: `${NEON}1a` }}><Icon className="w-4 h-4" style={{ color: NEON }} /></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: NEON }}>Activity {n}</span></div>
          <h3 className="font-display text-[19px] font-extrabold tracking-tight mt-1.5">{title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
        </div>
        {done ? <Badge variant="success" className="gap-1 shrink-0 rounded-full"><CheckCircle2 className="w-3.5 h-3.5" /> Done</Badge> : <Badge variant="outline" className="shrink-0 rounded-full">+{xp} 🪙</Badge>}
      </div>
      {children}
    </AppleCard>
  );
}
function ResultRow({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="border-b border-border/60 py-2"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p><div className="text-sm text-foreground/90 mt-0.5 whitespace-pre-wrap">{children}</div></div>;
}
// Jeff's personalized reaction to a finished activity - reads the student's real
// product + what they wrote, and previews the next module. Shows a gentle
// "reviewing" state until the note (AI or fallback) lands.
function CoachPanel({ id }: { id: string }) {
  const { coach } = useStudio();
  const note = coach(id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="rounded-[22px] border p-4 flex gap-3 backdrop-blur-md shadow-[0_8px_28px_-16px_rgba(0,0,0,0.25)]"
      style={{ borderColor: `${NEON}44`, background: `${NEON}12` }}
    >
      <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 self-start" style={{ background: `${NEON}22` }}>
        <Sparkles className="w-4 h-4" style={{ color: NEON }} />
      </span>
      <div className="min-w-0 space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.15em]" style={{ color: NEON }}>Coach Jeff</p>
          {note && (() => { const g = gradeLabel(note.score); return (
            <span className="text-[10px] font-extrabold uppercase tracking-wide px-1.5 py-0.5 rounded-full" style={{ background: `${g.color}22`, color: g.color }}>
              {g.label} · {note.score}/100
            </span>
          ); })()}
        </div>
        {note ? (
          <>
            <p className="text-sm text-foreground/90 leading-relaxed">{note.message}</p>
            {note.nextHint && (
              <p className="text-xs text-muted-foreground flex items-start gap-1.5 pt-0.5">
                <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: NEON }} />
                <span>{note.nextHint}</span>
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Reading your work…</p>
        )}
      </div>
    </motion.div>
  );
}
function useForm<T extends Record<string, unknown>>(saved: Fields, defaults: T) {
  const [f, setF] = useState<T>(() => ({ ...defaults, ...(saved as Partial<T>) }));
  const set = (k: keyof T, v: unknown) => setF((p) => ({ ...p, [k]: v }));
  return [f, set] as const;
}
const str = (v: unknown) => (typeof v === "string" ? v : "");
// True if any free-text field in a submission looks like low-effort junk
// ("asdf", "a a a a"). Skips internal keys (__…) and empty/short values.
function hasJunkAnswer(fields: Fields): boolean {
  return Object.entries(fields).some(([k, v]) =>
    !k.startsWith("__") && typeof v === "string" && v.trim().length > 0 && looksLowEffort(v)
  );
}
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
        if (a.done.includes(s.id)) return <React.Fragment key={s.id}>{s.render()}<CoachPanel id={s.id} /></React.Fragment>;
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
  // Merge keys into `data` without clobbering a concurrent `complete()` write.
  const patchData = useCallback((patch: Record<string, unknown>) => {
    setA((prev) => {
      if (!prev) return prev;
      const next = { ...prev, data: { ...prev.data, ...patch } };
      saveActivities(next);
      return next;
    });
  }, []);

  const setBusinessType = (bt: BusinessType) => { if (!a) return; persist({ ...a, businessType: bt }); };
  const complete: Complete = useCallback((id, fields, xp) => {
    if (hasJunkAnswer(fields)) { toast.error(LOW_EFFORT_MESSAGE); return; }
    // Coins are no longer awarded here - Coach Jeff grades the answer async and
    // awards a scaled amount when the grade lands (see the coach effect below).
    // We stash the base reward so the grader knows what to scale.
    setA((prev) => {
      if (!prev) return prev;
      const firstDone = !prev.done.includes(id);
      const prevSim = (prev.sim as BizState) || defaultBizState();
      const next: ActivitiesState = {
        ...prev,
        data: { ...prev.data, [id]: fields, [xpBaseKey(id)]: xp },
        done: firstDone ? [...prev.done, id] : prev.done,
        sim: firstDone ? applyEffect(prevSim, id) : prev.sim,
      };
      saveActivities(next);
      return next;
    });
    const eff = ACTIVITY_EFFECTS[id];
    toast.success(`${ACTIVITY_TITLES[id] || "Activity"} submitted`, { description: `Coach Jeff is grading your work…${eff ? ` · ${eff.msg}` : ""}` });
  }, []);

  // Completion for rotating quarterly briefs - same flow as `complete`, but the
  // metric effect and title come from the brief definition rather than a fixed map.
  const completeBrief: BriefComplete = useCallback((brief, fields) => {
    if (hasJunkAnswer(fields)) { toast.error(LOW_EFFORT_MESSAGE); return; }
    // Same deferred-grading flow as `complete`.
    setA((prev) => {
      if (!prev) return prev;
      const firstDone = !prev.done.includes(brief.id);
      const prevSim = (prev.sim as BizState) || defaultBizState();
      const next: ActivitiesState = {
        ...prev,
        data: { ...prev.data, [brief.id]: fields, [xpBaseKey(brief.id)]: brief.xp },
        done: firstDone ? [...prev.done, brief.id] : prev.done,
        sim: firstDone ? applyDelta(prevSim, brief.effect) : prev.sim,
      };
      saveActivities(next);
      return next;
    });
    toast.success(`${brief.title} submitted`, { description: `Coach Jeff is grading your work… · ${brief.effect.msg}` });
  }, []);

  // Partner-deal bonuses. Must be called unconditionally (before the early
  // returns below) so hook order stays stable across renders - the hook
  // accepts a null business type while `a` is still loading.
  const { totalBonus: dealBonus } = useBizDeals(a?.businessType ?? null);

  // ── AI personalization ──────────────────────────────────────────────
  // 1) Once the product is designed, build a realistic economic profile FROM
  //    that product (so a phone isn't "2 IC to make"). 2) After each activity,
  //    generate a coach note that reads the product + what they wrote. Both
  //    persist into `data` and have deterministic fallbacks (see productProfile).
  const profileInflight = useRef(false);
  useEffect(() => {
    if (!a || !a.businessType) return;
    const design = a.data.productDoc;
    if (!a.done.includes("productDoc") || !design || !(typeof design.name === "string" && design.name.trim())) return;
    if (a.data[PROFILE_KEY] || profileInflight.current) return;
    profileInflight.current = true;
    generateProductProfile(a.businessType, design)
      .then((p) => patchData({ [PROFILE_KEY]: p }))
      .finally(() => { profileInflight.current = false; });
  }, [a?.businessType, a?.done, a?.data?.productDoc, patchData]);

  const coachInflight = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (!a || !a.businessType) return;
    const profile = (a.data[PROFILE_KEY] as ProductProfile | undefined) ?? null;
    const design = a.data.productDoc;
    for (const id of a.done) {
      if (a.data[coachKey(id)] || coachInflight.current.has(id)) continue;
      coachInflight.current.add(id);
      generateCoach(a.businessType, id, design, a.data[id], profile)
        .then((note) => {
          // Save the coach note AND award coins scaled by the grade - exactly
          // once (xpAwarded guards against a re-award on re-render/StrictMode).
          let awarded = 0;
          let label = "";
          setA((prev) => {
            if (!prev) return prev;
            const already = prev.xpAwarded.includes(id);
            if (!already) {
              const base = Number(prev.data[xpBaseKey(id)]) || XP.pd;
              awarded = coinsForScore(base, note.score);
              label = gradeLabel(note.score).label;
            }
            const next: ActivitiesState = {
              ...prev,
              data: { ...prev.data, [coachKey(id)]: note },
              xpAwarded: already ? prev.xpAwarded : [...prev.xpAwarded, id],
            };
            saveActivities(next);
            return next;
          });
          if (awarded > 0) {
            earnJeffs(awarded, `${ACTIVITY_TITLES[id] || id} · ${label}`);
            toast.success(`Coach Jeff graded it: ${label}`, { description: `+${awarded} InvestiCoins` });
          }
        })
        .finally(() => coachInflight.current.delete(id));
    }
  }, [a?.businessType, a?.done, a?.data, earnJeffs]);

  const studioCtx = useMemo<StudioCtx>(() => ({
    profile: (a?.data?.[PROFILE_KEY] as ProductProfile | undefined) ?? null,
    coach: (id: string) => (a?.data?.[coachKey(id)] as CoachNote | undefined) ?? null,
  }), [a?.data]);

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

  const setSim = (next: BizState) => persist({ ...a, sim: next });
  const generateMonth = () => { if (sim.pending || sim.status === "failed") return; setSim({ ...sim, pending: pickSituation(sim) }); };
  const resolveMonth = (optIndex: number, words: number) => {
    const { next, revenue } = resolveSituation(sim, optIndex, words);
    // Apply active partner-deal bonuses on top of the base simulation result.
    const extraRev = Math.round(revenue * dealBonus.revenuePct / 100);
    const withDeals: BizState = dealBonus.dealCount > 0 ? {
      ...next,
      cash: next.cash + extraRev,
      customers: Math.max(0, next.customers + dealBonus.customers),
      reputation: Math.min(100, Math.max(0, next.reputation + dealBonus.reputation)),
      log: extraRev > 0 || dealBonus.customers > 0
        ? [...next.log, { month: next.month, text: `🤝 Partner deal bonuses: +${extraRev} rev, +${dealBonus.customers} customers` }].slice(-30)
        : next.log,
    } : next;
    // Crossing into a new quarter refreshes the operations activities so running
    // the business stays an ongoing job rather than a one-time 9-item checklist.
    const newQuarter = quarterOf(withDeals.month) !== quarterOf(sim.month) && withDeals.status !== "failed";
    persist({ ...a, sim: withDeals, ...(newQuarter ? { done: [], xpAwarded: [] } : {}) });
    earnJeffs(40, `Business month ${sim.month}`);
    const totalRev = revenue + extraRev;
    toast.success(`Month ${sim.month} resolved`, { description: `Revenue +${totalRev} IC${extraRev > 0 ? ` (inc. +${extraRev} from deals)` : ""} · +40 InvestiCoins` });
    if (newQuarter) toast.success(`Quarter ${quarterOf(withDeals.month) + 1} begins`, { description: "Your operations activities have refreshed - run them again." });
    if (withDeals.status === "failed") toast.error("Your business ran out of road", { description: "Review what happened, then rebuild." });
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
    { id: "productDoc", title: "Design your product", icon: Package, render: () => <ProductStudio a={a} bt={bt} complete={complete} /> },
    // Food gets a real recipe + ingredient-costing step - a process the other
    // industries don't have. (More per-industry steps to follow.)
    ...(bt === "food" ? [{ id: "recipe", title: "Build your recipe", icon: ClipboardList, render: () => <RecipeBuilder a={a} bt={bt} complete={complete} /> }] : []),
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

  // Progress is derived from the ACTUAL steps this quarter (which now vary by
  // industry), so per-track step counts and the Report unlock stay correct.
  const currentIds = [...productSteps, ...collabSteps, ...marketingSteps].map((s) => s.id);
  const doneCount = currentIds.filter((id) => a.done.includes(id)).length;
  const allDone = currentIds.length > 0 && doneCount === currentIds.length;

  return (
    <StudioContext.Provider value={studioCtx}>
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <GameNav />
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* ── Business snapshot: identity, status, and every key number gathered
            into ONE cohesive header instead of scattered across the page. ── */}
        <div className="hud-panel p-4 sm:p-5 mb-5 relative z-10">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${def.color}22` }}>
                  <def.icon className="w-5 h-5" style={{ color: def.color }} />
                </span>
                <div>
                  <p className="font-display text-base font-extrabold text-white leading-none">{def.label}</p>
                  <p className="text-white/40 text-xs mt-0.5">Month {sim.month} · Quarter {quarterOf(sim.month) + 1}</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${statusLabel(sim).color}22`, color: statusLabel(sim).color }}>{statusLabel(sim).label}</span>
            </div>

            {/* Headline numbers - one clean row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <StatTile label="Customers" value={sim.customers.toLocaleString()} icon={Users} color="#3BA7C4" />
              <StatTile label="Cash" value={sim.cash.toLocaleString()} suffix="IC" icon={Coins} color={NEON} />
              <StatTile label="Money / month" value={monthlyRevenue(sim).toLocaleString()} suffix="IC" icon={TrendingUp} color="#F5B301" />
              <StatTile label="Products" value={String(sim.products.length)} icon={Package} color="#A78BFA" />
            </div>

            {/* Health meters */}
            <div className="grid grid-cols-2 gap-2.5">
              <MetricBar label="Reputation" value={sim.reputation} icon={Heart} />
              <MetricBar label="Brand" value={sim.brand} icon={Sparkles} />
            </div>

            {/* Quarter progress */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-white/45 mb-1.5">
                <span>This quarter's operations</span>
                <span style={{ color: NEON }}>{doneCount}/{currentIds.length} done</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${(doneCount / Math.max(1, currentIds.length)) * 100}%`, background: NEON }} /></div>
              <p className="text-[10px] text-white/35 mt-1.5">Operations refresh every quarter - there's always more to run.</p>
            </div>
          </div>
        </div>

        {/* Body: the write-it-down workspace takes the stage; the run-your-business
            cockpit sits beside it. Numbers now live up in the snapshot, so this
            area stays focused on the work students actually fill in. */}
        <div className="grid lg:grid-cols-5 gap-5 items-start">
          {/* Primary - this quarter's activities, one at a time */}
          <div className="lg:col-span-3" ref={anchor("biz-activity")}>
            <Tabs defaultValue="product" className="space-y-4">
              <TabsList className={cn("grid w-full h-auto gap-1 rounded-2xl bg-muted/70 p-1 backdrop-blur-md border border-black/[0.04] dark:border-white/5", allDone ? "grid-cols-5" : "grid-cols-4")}>
                {(() => { const seg = "text-xs rounded-xl py-1.5 font-semibold transition-all data-[state=active]:bg-background data-[state=active]:shadow-[0_1px_3px_rgba(0,0,0,0.12)] data-[state=inactive]:text-muted-foreground"; return (<>
                <TabsTrigger value="product" ref={anchor("biz-product")} className={seg}><Package className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Product</TabsTrigger>
                <TabsTrigger value="office" ref={anchor("biz-office")} className={seg}><Briefcase className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Office</TabsTrigger>
                <TabsTrigger value="collab" ref={anchor("biz-collab")} className={seg}><Handshake className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Collab</TabsTrigger>
                <TabsTrigger value="marketing" ref={anchor("biz-marketing")} className={seg}><Megaphone className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Marketing</TabsTrigger>
                {allDone && <TabsTrigger value="summary" className={seg}><Trophy className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Report</TabsTrigger>}
                </>); })()}
              </TabsList>

              <TabsContent value="product">
                <SequentialSteps a={a} steps={productSteps} />
              </TabsContent>

              {/* Office tab - untouched existing component */}
              <TabsContent value="office"><MicroBusinessOffice /></TabsContent>

              <TabsContent value="collab">
                <SequentialSteps a={a} steps={collabSteps} />
                <PartnerDealsPanel bizType={bt} />
              </TabsContent>

              <TabsContent value="marketing">
                <SequentialSteps a={a} steps={marketingSteps} />
              </TabsContent>

              {allDone && <TabsContent value="summary"><SummaryReport a={a} bt={bt} qi={qi} total={currentIds.length} /></TabsContent>}
            </Tabs>
          </div>

          {/* Secondary - run your live business (the interactive tools, grouped
              under one clear heading and kept separate from the write-down work) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.15em] text-muted-foreground px-1">Run your business</p>
            <MonthlyOps sim={sim} onGenerate={generateMonth} onResolve={resolveMonth} onRebuild={rebuild} />
            <ProductLine sim={sim} onAdd={addProductHandler} />
          </div>
        </div>
      </main>
    </div>
    </StudioContext.Provider>
  );
}

type AProps = { a: ActivitiesState; bt: BusinessType; complete: Complete };

/* ═══ PRODUCT DEV · Activity 1 - Design your product ═══
   A hands-on product+identity builder: pick a logo, colour scheme, name and
   tagline, and add feature cards - all feeding a live product-card preview. */
type Feat = { name: string; why: string };
function ProductStudio({ a, bt, complete }: AProps) {
  const kit = PRODUCT_KITS[bt];
  const id = "productDoc"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const [editing, setEditing] = useState(false);
  const [f, set] = useForm(saved, {
    name: "", logo: kit.logo, tagline: "", primary: kit.palettes[0].primary, accent: kit.palettes[0].accent,
    problem: "", audience: "", features: (saved.features as Feat[]) || [],
  });
  const features = (f.features as Feat[]) || [];
  const [fName, setFName] = useState(""); const [fWhy, setFWhy] = useState("");
  const addFeature = () => {
    if (!fName.trim() || !fWhy.trim()) return;
    set("features", [...features, { name: fName.trim(), why: fWhy.trim() }]);
    setFName(""); setFWhy("");
  };
  const removeFeature = (i: number) => set("features", features.filter((_, x) => x !== i));

  const checks = [
    { label: "Give your product a name", ok: str(f.name).trim().length >= 2 },
    { label: "Add at least 3 features", ok: features.length >= 3 },
    { label: "Say what problem it solves", ok: wc(str(f.problem)) >= ws(40) },
    { label: "Say who it's for", ok: wc(str(f.audience)) >= ws(30) },
  ];
  const ready = checks.every((c) => c.ok);

  const preview = (
    <div className="rounded-2xl overflow-hidden border shadow-card" style={{ borderColor: `${str(f.accent)}55` }}>
      <div className="p-5 text-center" style={{ background: `linear-gradient(160deg, ${str(f.primary)}, ${str(f.primary)}cc)` }}>
        <div className="text-5xl leading-none">{str(f.logo)}</div>
        <p className="font-display text-xl font-extrabold text-white mt-2 break-words">{str(f.name) || "Your product"}</p>
        {str(f.tagline) && <p className="text-sm text-white/85 mt-0.5">{str(f.tagline)}</p>}
      </div>
      <div className="bg-card p-4 space-y-2">
        {features.length === 0
          ? <p className="text-xs text-muted-foreground text-center py-2">Add features and they'll appear here ✨</p>
          : features.map((ft, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${str(f.accent)}22` }}>
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: str(f.accent) }} />
              </span>
              <div className="min-w-0"><p className="text-sm font-bold leading-tight">{ft.name}</p><p className="text-xs text-muted-foreground">{ft.why}</p></div>
            </div>
          ))}
      </div>
    </div>
  );

  if (done && !editing) {
    return (
      <ActivityCard icon={Package} n={1} title="Your product" desc="The product you designed." xp={XP.pd} done>
        {preview}
        <div className="mt-3 rounded-xl bg-muted p-3">
          <ResultRow label="Problem it solves">{str(saved.problem)}</ResultRow>
          <ResultRow label="Who it's for">{str(saved.audience)}</ResultRow>
        </div>
        <Button size="sm" variant="ghost" className="gap-1 mt-1" onClick={() => setEditing(true)}><Pencil className="w-3.5 h-3.5" /> Edit</Button>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={Package} n={1} title="Design your product" desc="Build it and brand it - watch it come to life on the right." xp={XP.pd} done={done}>
      <div className="grid lg:grid-cols-2 gap-5 items-start">
        {/* LEFT: the builder */}
        <div className="space-y-4">
          {/* Logo */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-primary" /> Pick a logo</label>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {kit.emojis.map((e) => (
                <button key={e} type="button" onClick={() => set("logo", e)} className={cn("w-9 h-9 rounded-lg text-xl flex items-center justify-center border press-scale", f.logo === e ? "border-primary bg-primary/10 ring-2 ring-primary/30" : "border-border bg-muted hover:bg-muted/70")}>{e}</button>
              ))}
            </div>
          </div>
          {/* Colours */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-1.5"><Palette className="w-4 h-4 text-primary" /> Choose your colours</label>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {kit.palettes.map((c) => (
                <button key={c.name} type="button" onClick={() => { set("primary", c.primary); set("accent", c.accent); }} className={cn("flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border press-scale text-xs font-bold", f.primary === c.primary && f.accent === c.accent ? "border-primary bg-primary/10" : "border-border bg-muted")}>
                  <span className="flex"><span className="w-3.5 h-3.5 rounded-l-full" style={{ background: c.primary }} /><span className="w-3.5 h-3.5 rounded-r-full" style={{ background: c.accent }} /></span>
                  {c.name}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold">Main <input type="color" value={str(f.primary)} onChange={(e) => set("primary", e.target.value)} className="w-8 h-8 rounded bg-transparent border border-border cursor-pointer" /></label>
              <label className="flex items-center gap-1.5 text-xs font-semibold">Accent <input type="color" value={str(f.accent)} onChange={(e) => set("accent", e.target.value)} className="w-8 h-8 rounded bg-transparent border border-border cursor-pointer" /></label>
            </div>
          </div>
          {/* Name + tagline */}
          <div className="grid gap-2">
            <div><label className="text-sm font-semibold">Product name</label><Input value={str(f.name)} onChange={(e) => set("name", e.target.value)} placeholder={kit.nameHint} className="mt-1" /></div>
            <div><label className="text-sm font-semibold">Tagline <span className="text-muted-foreground font-normal">- a short catchphrase</span></label><Input value={str(f.tagline)} onChange={(e) => set("tagline", e.target.value)} placeholder={kit.taglineHint} className="mt-1" /></div>
          </div>
          {/* Feature cards */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-1.5"><Star className="w-4 h-4 text-primary" /> Add features <span className="text-muted-foreground font-normal">({features.length}/3 min)</span></label>
            <div className="space-y-2 mt-1.5">
              {features.map((ft, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-2.5">
                  <div className="flex-1 min-w-0"><p className="text-sm font-bold leading-tight">{ft.name}</p><p className="text-xs text-muted-foreground">{ft.why}</p></div>
                  <button type="button" onClick={() => removeFeature(i)} className="text-muted-foreground hover:text-destructive shrink-0" title="Remove"><X className="w-4 h-4" /></button>
                </div>
              ))}
              <div className="rounded-lg border border-dashed border-border p-2.5 space-y-2">
                <Input value={fName} onChange={(e) => setFName(e.target.value)} placeholder={`Feature name (${kit.featNameHint})`} />
                <Input value={fWhy} onChange={(e) => setFWhy(e.target.value)} placeholder={`Why it's great (${kit.featWhyHint})`} onKeyDown={(e) => { if (e.key === "Enter") addFeature(); }} />
                <Button type="button" variant="outline" size="sm" className="w-full press-scale" disabled={!fName.trim() || !fWhy.trim()} onClick={addFeature}><Plus className="w-4 h-4 mr-1" /> Add feature</Button>
              </div>
            </div>
          </div>
          {/* Short reasoning */}
          <WField label="What problem does it solve?" value={str(f.problem)} onChange={(v) => set("problem", v)} min={ws(40)} rows={2} placeholder={kit.problemHint} />
          <WField label="Who is it for?" value={str(f.audience)} onChange={(v) => set("audience", v)} min={ws(30)} rows={2} placeholder={kit.audienceHint} />
          <Incomplete items={checks} />
          <Button className="w-full press-scale" disabled={!ready} onClick={() => { if (looksLowEffort(str(f.problem)) || looksLowEffort(str(f.audience))) { toast.error(LOW_EFFORT_MESSAGE); return; } complete(id, f, XP.pd); setEditing(false); }}><Rocket className="w-4 h-4 mr-1.5" /> Launch your product</Button>
        </div>

        {/* RIGHT: live preview */}
        <div className="lg:sticky lg:top-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-muted-foreground mb-2">Live preview</p>
          {preview}
        </div>
      </div>
    </ActivityCard>
  );
}

/* ═══ FOOD · Recipe & ingredient costing (industry-specific step) ═══
   Teaches real food-business costing: list ingredients with their cost, and
   watch the total + cost-per-serving update live. Only appears for food. */
type Ingredient = { name: string; cost: string };
function RecipeBuilder({ a, complete }: AProps) {
  const id = "recipe"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const [editing, setEditing] = useState(false);
  const [f, set] = useForm(saved, { dish: "", servings: "4", method: "", ingredients: (saved.ingredients as Ingredient[]) || [] });
  const ingredients = (f.ingredients as Ingredient[]) || [];
  const [iName, setIName] = useState(""); const [iCost, setICost] = useState("");
  const [generating, setGenerating] = useState(false);
  const addIng = () => { if (!iName.trim() || num(iCost) <= 0) return; set("ingredients", [...ingredients, { name: iName.trim(), cost: iCost }]); setIName(""); setICost(""); };
  const removeIng = (i: number) => set("ingredients", ingredients.filter((_, x) => x !== i));
  const totalCost = ingredients.reduce((s, ing) => s + num(ing.cost), 0);
  const servings = Math.max(1, num(f.servings) || 1);
  const perServing = totalCost / servings;

  // AI recipe generator: build a prompt from the product they designed (its
  // logo emoji + name + description) and let Claude (via the business-ai proxy)
  // return a unique recipe, then fill the form. Kids can still edit everything.
  const design = (a.data.productDoc as Record<string, unknown>) || {};
  const generate = async () => {
    setGenerating(true);
    try {
      const logo = str(design.logo) || "🍽️";
      const name = str(design.name) || "my food product";
      const about = str(design.problem);
      const prompt = `A student runs a food business. Their product is "${name}" (emoji: ${logo}).${about ? ` What it's about: ${about}.` : ""} Invent a fun, simple recipe that fits this product.\n\nReturn ONLY valid JSON (no markdown, no prose) in exactly this shape:\n{"dish": string, "servings": number, "ingredients": [{"name": string, "cost": number}], "method": string}\nRules: 3-6 ingredients; "cost" is a small whole number of in-game coins (2-15) each; "method" is 2-4 short steps in ONE short string. Keep it kid-friendly and safe.`;
      const { data, error } = await supabase.functions.invoke("business-ai", {
        body: { system: "You are a friendly chef helping a kid design a recipe for their food business. Output only JSON.", prompt, max_tokens: 700 },
      });
      if (error || (data as { error?: string })?.error) throw new Error(error?.message || (data as { error?: string })?.error || "AI unavailable");
      const text = String((data as { text?: string })?.text || "");
      const parsed = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
      const ings: Ingredient[] = Array.isArray(parsed.ingredients)
        ? parsed.ingredients.slice(0, 6).map((x: { name?: unknown; cost?: unknown }) => ({ name: String(x.name ?? "").slice(0, 40), cost: String(Math.max(1, Math.round(Number(x.cost) || 3))) }))
        : [];
      set("dish", String(parsed.dish ?? name).slice(0, 60));
      set("servings", String(Math.max(1, Math.round(Number(parsed.servings) || 4))));
      set("ingredients", ings);
      set("method", String(parsed.method ?? "").slice(0, 500));
      toast.success("Recipe generated! ✨", { description: "Tweak anything you like, then save." });
    } catch (e) {
      toast.error("Couldn't generate a recipe", { description: e instanceof Error ? e.message : "Try again in a moment." });
    } finally {
      setGenerating(false);
    }
  };
  const checks = [
    { label: "Name your dish", ok: str(f.dish).trim().length >= 2 },
    { label: "Add at least 3 ingredients", ok: ingredients.length >= 3 },
    { label: "Set how many servings it makes", ok: num(f.servings) > 0 },
    { label: "Write the steps to make it", ok: wc(str(f.method)) >= ws(30) },
  ];
  const ready = checks.every((c) => c.ok);
  const card = (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="bg-muted p-3 border-b border-border">
        <p className="font-display text-lg font-extrabold">{str(f.dish) || "Your dish"}</p>
        <p className="text-xs text-muted-foreground">Makes {servings} serving{servings === 1 ? "" : "s"}</p>
      </div>
      <div className="p-3 space-y-1">
        {ingredients.length === 0
          ? <p className="text-xs text-muted-foreground text-center py-2">Add ingredients to see your recipe & cost 🧾</p>
          : ingredients.map((ing, i) => (
            <div key={i} className="flex justify-between text-sm"><span>{ing.name}</span><span className="text-muted-foreground tabular-nums">{num(ing.cost)} IC</span></div>
          ))}
      </div>
      {ingredients.length > 0 && (
        <div className="border-t border-border p-3 flex justify-between items-end">
          <div><p className="text-sm font-bold">Total cost</p><p className="text-xs text-muted-foreground">Cost per serving</p></div>
          <div className="text-right"><p className="text-sm font-extrabold tabular-nums" style={{ color: NEON }}>{totalCost.toFixed(0)} IC</p><p className="text-xs font-bold tabular-nums" style={{ color: NEON }}>{perServing.toFixed(2)} IC</p></div>
        </div>
      )}
    </div>
  );
  if (done && !editing) {
    return (
      <ActivityCard icon={ClipboardList} n={2} title="Your recipe" desc="What you'll make and what it costs." xp={XP.pd} done>
        {card}
        <Button size="sm" variant="ghost" className="gap-1 mt-1" onClick={() => setEditing(true)}><Pencil className="w-3.5 h-3.5" /> Edit</Button>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={ClipboardList} n={2} title="Build your recipe" desc="List your ingredients and see what one serving really costs to make." xp={XP.pd} done={done}>
      <div className="grid lg:grid-cols-2 gap-5 items-start">
        <div className="space-y-4">
          {/* AI shortcut: generate a recipe from the product they designed. */}
          <button
            type="button"
            onClick={generate}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed px-3 py-2.5 text-sm font-bold press-scale disabled:opacity-60"
            style={{ borderColor: `${NEON}66`, background: `${NEON}0d`, color: "hsl(var(--foreground))" }}
          >
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" style={{ color: NEON }} />}
            {generating ? "Cooking up a recipe…" : "✨ Generate a recipe with AI"}
          </button>
          <p className="text-[11px] text-muted-foreground -mt-2">Based on the product you designed. You can edit everything after.</p>

          <div className="grid grid-cols-2 gap-2">
            <div><label className="text-sm font-semibold">Dish name</label><Input value={str(f.dish)} onChange={(e) => set("dish", e.target.value)} placeholder="e.g. Choc-chip cookie" className="mt-1" /></div>
            <div><label className="text-sm font-semibold">Servings</label><Input type="number" min={1} value={str(f.servings)} onChange={(e) => set("servings", e.target.value)} className="mt-1" /></div>
          </div>
          <div>
            <label className="text-sm font-semibold flex items-center gap-1.5"><Coins className="w-4 h-4 text-primary" /> Ingredients <span className="text-muted-foreground font-normal">({ingredients.length}/3 min)</span></label>
            <p className="text-xs text-muted-foreground">Add each one and what it costs - the total updates live.</p>
            <div className="space-y-2 mt-1.5">
              {ingredients.map((ing, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-2">
                  <span className="flex-1 text-sm font-bold">{ing.name}</span>
                  <span className="text-sm text-muted-foreground tabular-nums">{num(ing.cost)} IC</span>
                  <button type="button" onClick={() => removeIng(i)} className="text-muted-foreground hover:text-destructive" title="Remove"><X className="w-4 h-4" /></button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input value={iName} onChange={(e) => setIName(e.target.value)} placeholder="Ingredient (e.g. Flour)" className="flex-1" />
                <Input type="number" value={iCost} onChange={(e) => setICost(e.target.value)} placeholder="Cost IC" className="w-24" onKeyDown={(e) => { if (e.key === "Enter") addIng(); }} />
                <Button type="button" variant="outline" size="icon" className="shrink-0" disabled={!iName.trim() || num(iCost) <= 0} onClick={addIng}><Plus className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
          <WField label="How do you make it? (the steps)" value={str(f.method)} onChange={(v) => set("method", v)} min={ws(30)} rows={3} placeholder="1. Mix… 2. Bake… keep it simple." />
          <Incomplete items={checks} />
          <Button className="w-full press-scale" disabled={!ready} onClick={() => { if (looksLowEffort(str(f.method))) { toast.error(LOW_EFFORT_MESSAGE); return; } complete(id, f, XP.pd); setEditing(false); }}><ClipboardList className="w-4 h-4 mr-1.5" /> Save recipe</Button>
        </div>
        <div className="lg:sticky lg:top-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-muted-foreground mb-2">Recipe card</p>
          {card}
        </div>
      </div>
    </ActivityCard>
  );
}

/* ═══ PRODUCT DEV · Activity 2 - Pricing Strategy ═══ */
const PRICING_TYPES = ["Cost-plus", "Value-based", "Competitive"];
function Pricing({ a, bt, complete }: AProps) {
  const id = "pricing"; const done = a.done.includes(id); const saved = a.data[id] || {};
  // Use the AI product profile's real unit cost (a phone ≠ 2 IC) when it exists,
  // falling back to the industry estimate before the profile has generated.
  const { profile } = useStudio();
  const cost = profile?.unitCost ?? bizDef(bt).unitCost;
  const unitLabel = profile?.unitLabel ?? bizDef(bt).unitLabel;
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
        {profile ? (
          <div className="rounded-xl border p-3 space-y-2 text-sm" style={{ borderColor: `${NEON}44`, background: `${NEON}0d` }}>
            <div className="flex items-center gap-2 font-bold"><DollarSign className="w-4 h-4" style={{ color: NEON }} /> What one {unitLabel} really costs you</div>
            <div className="space-y-0.5">
              {profile.breakdown.map((b, i) => (
                <div key={i} className="flex justify-between text-xs text-muted-foreground"><span>{b.item}</span><span className="tabular-nums">{b.cost} IC</span></div>
              ))}
              <div className="flex justify-between text-sm font-extrabold pt-1 border-t border-border/50"><span>Cost to make one</span><span className="tabular-nums" style={{ color: NEON }}>{cost} IC</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Products like yours sell for ~{profile.priceLow}–{profile.priceHigh} IC (a fair price is around {profile.suggestedPrice} IC).{profile.note ? ` ${profile.note}` : ""}</p>
          </div>
        ) : (
          <div className="rounded-xl bg-muted p-3 text-sm flex items-center gap-2"><DollarSign className="w-4 h-4 text-primary" /> Estimated cost to produce/deliver one unit: <b>{cost} IC</b> ({unitLabel})</div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold">Your price (IC)</label><Input type="number" value={str(f.price)} onChange={(e) => set("price", e.target.value)} className="mt-1" /></div>
          <div><label className="text-sm font-semibold">Profit margin %</label><Input value={str(f.margin)} onChange={(e) => set("margin", e.target.value)} className="mt-1" placeholder="you calculate it" /></div>
        </div>
        <p className="text-xs text-muted-foreground">Formula: (Price - Cost) ÷ Price × 100{price > 0 ? ` - actual works out to ${actualMargin.toFixed(0)}%` : ""}{marginOff ? " (check your math)" : ""}</p>
        <WField label="Why is this the right price?" value={str(f.justify)} onChange={(v) => set("justify", v)} min={ws(40)} />
        <div>
          <label className="text-sm font-semibold">Pricing approach</label>
          <div className="flex gap-2 mt-1">{PRICING_TYPES.map((p) => <button key={p} onClick={() => set("ptype", p)} className={cn("flex-1 px-2 py-1.5 rounded-lg text-xs font-bold border press-scale", f.ptype === p ? "border-primary bg-primary/10" : "border-border bg-muted")}>{p}</button>)}</div>
        </div>
        <WField label="Why did you pick that approach?" value={str(f.explain)} onChange={(v) => set("explain", v)} min={ws(60)} rows={3} />
        {lowMargin && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-3">
            <p className="text-sm font-bold text-destructive flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Your margin is dangerously thin.</p>
            <p className="text-xs text-muted-foreground mt-0.5">Most businesses need at least 20% to survive. Raise your price, or justify accepting a low margin below.</p>
            <div className="mt-2"><WField label="Why is a low margin okay here?" value={str(f.lowReason)} onChange={(v) => set("lowReason", v)} min={ws(40)} /></div>
          </div>
        )}
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, f, XP.pd)}><Tag className="w-4 h-4 mr-1.5" /> Lock in pricing</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ PRODUCT DEV · Activity 3 - Product Feedback Response ═══ */
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
        <WField label="Say the feedback in your own words" value={str(f.summary)} onChange={(v) => set("summary", v)} min={ws(40)} />
        <div>
          <label className="text-sm font-semibold">Will you implement this feedback?</label>
          <div className="flex gap-2 mt-1">{["yes", "no"].map((o) => <button key={o} onClick={() => set("implement", o)} className={cn("flex-1 px-2 py-1.5 rounded-lg text-sm font-bold border press-scale capitalize", f.implement === o ? "border-primary bg-primary/10" : "border-border bg-muted")}>{o === "yes" ? "Implement" : "Don't implement"}</button>)}</div>
        </div>
        <WField label="Why did you decide that?" value={str(f.why)} onChange={(v) => set("why", v)} min={ws(50)} rows={3} />
        <WField label="What would you change next time?" value={str(f.v2)} onChange={(v) => set("v2", v)} min={ws(60)} rows={3} />
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, { ...f, __review: review }, XP.pd)}><MessageSquare className="w-4 h-4 mr-1.5" /> Submit response</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ COLLABORATION · Activity 1 - Find a Partner ═══ */
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
        <WField label="Why pick them over the others?" value={str(f.why)} onChange={(v) => set("why", v)} min={ws(60)} rows={3} />
        <WField label={`Your pitch${chosen ? ` to ${chosen.name}` : ""}`} value={str(f.proposal)} onChange={(v) => set("proposal", v)} min={ws(100)} rows={5} placeholder="What does the team-up look like? What does each side give, and what do you both get?" />
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

/* ═══ COLLABORATION · Activity 2 - Partnership Problem ═══ */
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
        <WField label="Write a message to your partner" value={str(f.message)} onChange={(v) => set("message", v)} min={ws(75)} rows={4} placeholder="Stay calm and professional - explain the issue clearly." />
        <WField label="How would you fix it?" value={str(f.resolution)} onChange={(v) => set("resolution", v)} min={ws(50)} rows={3} />
        <WField label="What would you do differently next time?" value={str(f.reflection)} onChange={(v) => set("reflection", v)} min={ws(40)} />
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, { ...f, __problem: problem }, XP.collab)}><ArrowRight className="w-4 h-4 mr-1.5" /> Send & resolve</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ COLLABORATION · Activity 3 - Vendor Negotiation ═══ */
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
      outcome = { ok: true, discount: 10, reply: `Dear customer,\n\nThat's a steep ask, but your volume and loyalty count for something. We can meet you partway with 10% off - ${(offer.unitPrice * 0.9).toFixed(2)} IC per unit. Final offer.\n\nRegards,\nVendor Sales` };
    } else {
      outcome = { ok: true, discount: 5, reply: `Dear customer,\n\nWe can offer a modest 5% courtesy discount - ${(offer.unitPrice * 0.95).toFixed(2)} IC per unit. Sharpen your case (volume, loyalty) next time for more.\n\nRegards,\nVendor Sales` };
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
        <div className="rounded-xl bg-muted p-3 text-sm"><p className="font-bold mb-1">Vendor opening offer - {offer.item}</p><div className="flex gap-4 text-xs"><span>Price: <b>{offer.unitPrice.toFixed(2)} IC/unit</b></span><span>Min order: <b>{offer.moq}</b></span><span>Delivery: <b>{offer.deliveryDays} days</b></span></div></div>
        <WField label="Is this a good deal? Why or why not?" value={str(f.analysis)} onChange={(v) => set("analysis", v)} min={ws(60)} rows={3} />
        <WField label="Write your counter-offer" value={str(f.counter)} onChange={(v) => set("counter", v)} min={ws(75)} rows={4} placeholder="Tip: ask for a fair discount (a %), and back it up with big orders or loyalty." />
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, { ...f, __outcome: evaluate() }, XP.collab)}><Truck className="w-4 h-4 mr-1.5" /> Send counter-offer</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ MARKETING · Activity 1 - Brand Identity ═══ */
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
        <WField label="What's your brand all about?" value={str(f.mission)} onChange={(v) => set("mission", v)} min={ws(50)} rows={3} placeholder="In a few sentences: what you stand for and the feeling you want people to get." />
        <div>
          <label className="text-sm font-semibold">Tagline drafts ({drafts.length}/3 min) <span className="text-muted-foreground font-normal">· max 10 words each</span></label>
          <div className="flex gap-2 mt-1"><Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Draft a tagline…" /><Button type="button" variant="outline" onClick={addDraft}><Plus className="w-4 h-4" /></Button></div>
          {drafts.length > 0 && <div className="mt-2 space-y-1">{drafts.map((d, i) => <button key={i} onClick={() => set("tagline", d)} className={cn("w-full text-left text-sm px-3 py-1.5 rounded-lg border press-scale", f.tagline === d ? "border-primary bg-primary/10" : "border-border bg-muted")}>{f.tagline === d ? "★ " : ""}{d}</button>)}<p className="text-xs text-muted-foreground">Tap a draft to finalize it as your tagline.</p></div>}
        </div>
        <div>
          <label className="text-sm font-semibold">Brand voice</label>
          <div className="flex flex-wrap gap-2 mt-1">{VOICES.map((v) => <button key={v} onClick={() => set("voice", v)} className={cn("px-3 py-1 rounded-full text-xs font-bold border press-scale", f.voice === v ? "border-primary bg-primary/10" : "border-border bg-muted")}>{v}</button>)}</div>
        </div>
        <WField label={`Write a sentence in your "${f.voice}" voice`} value={str(f.ex1)} onChange={(v) => set("ex1", v)} min={ws(30)} />
        <WField label={`Now one more "${f.voice}" sentence`} value={str(f.ex2)} onChange={(v) => set("ex2", v)} min={ws(30)} />
        <div className="grid grid-cols-3 gap-2">
          {([["cPrimary", "whyP", "Primary"], ["cSecondary", "whyS", "Secondary"], ["cAccent", "whyA", "Accent"]] as const).map(([ck, wk, lbl]) => (
            <div key={ck}>
              <label className="text-xs font-semibold">{lbl}</label>
              <input type="color" value={str(f[ck])} onChange={(e) => set(ck, e.target.value)} className="w-full h-9 rounded-lg bg-transparent border border-border mt-1 cursor-pointer" />
            </div>
          ))}
        </div>
        <WField label="Why this main color?" value={str(f.whyP)} onChange={(v) => set("whyP", v)} min={ws(20)} rows={2} />
        <WField label="Why this second color?" value={str(f.whyS)} onChange={(v) => set("whyS", v)} min={ws(20)} rows={2} />
        <WField label="Why this accent color?" value={str(f.whyA)} onChange={(v) => set("whyA", v)} min={ws(20)} rows={2} />
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, f, XP.mkt)}><Palette className="w-4 h-4 mr-1.5" /> Lock in brand</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ MARKETING · Activity 2 - Marketing Plan ═══ */
const CHANNELS = ["Social Media", "Email", "Flyers", "Events", "Word of Mouth", "Influencers"];
function MarketingPlan({ a, complete }: AProps) {
  const id = "marketingPlan"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const [f, set] = useForm(saved, {
    audience: "", channels: (saved.channels as string[]) || [], ch0: "", ch1: "",
    budget: "10", milestones: (saved.milestones as string[]) || ["", "", "", ""],
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
    { label: "Budget 5-30% of revenue", ok: budget >= 5 && budget <= 30 },
    { label: "Fill in all 4 launch steps", ok: ((f.milestones as string[]) || []).filter((m) => m.trim()).length >= 4 },
  ];
  const ready = checks.every((c) => c.ok);
  if (done) {
    return (
      <ActivityCard icon={ClipboardList} n={2} title="Marketing Plan" desc="Your plan." xp={XP.mkt} done>
        <div className="rounded-xl bg-muted p-4"><ResultRow label="Audience">{str(saved.audience)}</ResultRow><ResultRow label={`Channels (${num(saved.budget)}% budget)`}>{(saved.channels as string[] || []).join(", ")}</ResultRow><ResultRow label="Launch steps">{(((saved.milestones as string[]) || [saved.m0, saved.m1, saved.m2, saved.m3]).map((m) => str(m)).filter(Boolean)).map((m, i) => `${i + 1}. ${m}`).join("\n")}</ResultRow></div>
      </ActivityCard>
    );
  }
  return (
    <ActivityCard icon={ClipboardList} n={2} title="Marketing Plan" desc="Plan how you'll reach customers." xp={XP.mkt} done={false}>
      <div className="space-y-3">
        <WField label="Who are you trying to reach?" value={str(f.audience)} onChange={(v) => set("audience", v)} min={ws(60)} rows={3} placeholder="Describe your ideal customer - age, interests, what they care about." />
        <div>
          <label className="text-sm font-semibold">Pick exactly 2 channels</label>
          <div className="flex flex-wrap gap-2 mt-1">{CHANNELS.map((c) => <button key={c} onClick={() => toggleCh(c)} className={cn("px-3 py-1 rounded-full text-xs font-bold border press-scale", channels.includes(c) ? "border-primary bg-primary/10" : "border-border bg-muted")}>{c}</button>)}</div>
        </div>
        {channels.length >= 1 && <WField label={`${channels[0]}: what will you post, and how often?`} value={str(f.ch0)} onChange={(v) => set("ch0", v)} min={ws(50)} rows={3} />}
        {channels.length >= 2 && <WField label={`${channels[1]}: what will you post, and how often?`} value={str(f.ch1)} onChange={(v) => set("ch1", v)} min={ws(50)} rows={3} />}
        <div>
          <label className="text-sm font-semibold">Marketing budget (% of revenue)</label>
          <Input type="number" value={str(f.budget)} onChange={(e) => set("budget", e.target.value)} className="mt-1" />
          {budget > 30 && <p className="text-xs text-warning mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Most small businesses spend 7-12% of revenue on marketing.</p>}
        </div>
        <ListField label="Your 30-day launch plan" hint="One short step per line - e.g. 'Week 1: post a teaser video.'" items={(f.milestones as string[]) || []} onChange={(v) => set("milestones", v)} count={4} placeholder={(i) => `Week ${i + 1}: …`} />
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(id, f, XP.mkt)}><Megaphone className="w-4 h-4 mr-1.5" /> Submit plan</Button>
      </div>
    </ActivityCard>
  );
}

/* ═══ MARKETING · Activity 3 - Ad Campaign ═══ */
const PLATFORMS = ["Instagram caption", "Email", "Flyer", "TikTok script"];
function AdCampaign({ a, complete }: AProps) {
  const id = "adCampaign"; const done = a.done.includes(id); const saved = a.data[id] || {};
  const brand = (a.data.brand as Record<string, unknown>) || {};
  const tagline = str(brand.tagline) || "Your tagline here";
  const colors = { p: str(brand.cPrimary) || NEON, s: str(brand.cSecondary) || "#0a0f0d", acc: str(brand.cAccent) || "#f97316" };
  const [f, set] = useForm(saved, { p0: "Instagram caption", p1: "Email", copy0: "", copy1: "", who0: "", act0: "", meas0: "", who1: "", act1: "", meas1: "" });
  const checks = [
    { label: `Ad 1 copy (${ws(60)}+ words)`, ok: wc(str(f.copy0)) >= ws(60) },
    { label: `Ad 1 - who/action/measure (${ws(40)}+ words)`, ok: wc(`${str(f.who0)} ${str(f.act0)} ${str(f.meas0)}`) >= 40 },
    { label: `Ad 2 copy (${ws(60)}+ words)`, ok: wc(str(f.copy1)) >= ws(60) },
    { label: `Ad 2 - who/action/measure (${ws(40)}+ words)`, ok: wc(`${str(f.who1)} ${str(f.act1)} ${str(f.meas1)}`) >= 40 },
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
              <WField label={`Ad ${i + 1}: write the words people will see`} value={str(f[ck])} onChange={(v) => set(ck, v)} min={ws(60)} rows={3} />
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
  brief.fields.forEach((fl) => { defaults[fl.key] = fl.list ? [] : ""; });
  const [f, set] = useForm(saved, defaults);
  const scenario = brief.scenario.replace("{biz}", bizDef(bt).label);
  const checks = [
    ...(brief.choice ? [{ label: `Choose: ${brief.choice.label}`, ok: !!str(f.__choice) }] : []),
    ...brief.fields.map((fl) => fl.list
      ? { label: `Fill in all ${fl.list}: ${fl.label}`, ok: ((f[fl.key] as string[]) || []).filter((x) => x.trim()).length >= fl.list }
      : { label: `${fl.label} (${ws(fl.min)}+ words)`, ok: wc(str(f[fl.key])) >= ws(fl.min) }),
  ];
  const ready = checks.every((c) => c.ok);
  const Icon = brief.icon;
  if (done) {
    return (
      <ActivityCard icon={Icon} n={n} title={brief.title} desc="Submitted this quarter." xp={brief.xp} done>
        <div className="rounded-xl bg-muted p-4">
          {brief.choice && str(saved.__choice) && <ResultRow label={brief.choice.label}>{str(saved.__choice)}</ResultRow>}
          {brief.fields.map((fl) => <ResultRow key={fl.key} label={fl.label}>{fl.list ? ((((saved[fl.key] as string[]) || []).filter(Boolean)).map((x, i) => `${i + 1}. ${x}`).join("\n")) : str(saved[fl.key])}</ResultRow>)}
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
        {brief.fields.map((fl) => fl.list
          ? <ListField key={fl.key} label={fl.label} items={(f[fl.key] as string[]) || []} onChange={(v) => set(fl.key, v)} count={fl.list} placeholder={fl.placeholder ? () => fl.placeholder! : undefined} />
          : <WField key={fl.key} label={fl.label} value={str(f[fl.key])} onChange={(v) => set(fl.key, v)} min={ws(fl.min)} rows={fl.rows} placeholder={fl.placeholder} />)}
        <Incomplete items={checks} />
        <Button className="w-full press-scale" disabled={!ready} onClick={() => complete(brief, f)}><ArrowRight className="w-4 h-4 mr-1.5" /> Submit brief</Button>
      </div>
    </ActivityCard>
  );
}

function SummaryReport({ a, bt, qi, total }: { a: ActivitiesState; bt: BusinessType; qi: number; total: number }) {
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
          <p className="text-white/55 text-sm">{def.label} · all {total} ops run this quarter</p>
        </div>
        {cats.map(({ t, cat }) => (
          <Card key={t} variant="elevated"><CardContent className="pt-5">
            <p className="font-display text-lg font-extrabold mb-2" style={{ color: NEON }}>{t}</p>
            {briefsForCategory(cat, qi).map((b) => (
              <ResultRow key={b.id} label={b.title}>{b.fields.map((fl) => S(b.id, fl.key)).filter(Boolean).join(" - ") || "-"}</ResultRow>
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
        <p className="text-white/55 text-sm">{def.label} · all {total} ops run this quarter · {totalXP} InvestiCoins this quarter</p>
      </div>
      {[
        { t: "Product", items: [["Product brief", S("productDoc", "name")], ["Problem", S("productDoc", "problem")], ["Pricing", `${num(d.pricing?.["price"])} IC (${str(d.pricing?.["ptype"])})`], ["Feedback v2 plan", S("feedback", "v2")]] },
        { t: "Collaboration", items: [["Partner proposal", S("partner", "proposal")], ["Problem handled", S("partnerProblem", "resolution")], ["Vendor counter", S("vendor", "counter")]] },
        { t: "Marketing", items: [["Mission", S("brand", "mission")], ["Tagline", S("brand", "tagline")], ["Audience", S("marketingPlan", "audience")], ["Ad 1", S("adCampaign", "copy0")]] },
      ].map((sec) => (
        <Card key={sec.t} variant="elevated"><CardContent className="pt-5">
          <p className="font-display text-lg font-extrabold mb-2" style={{ color: NEON }}>{sec.t}</p>
          {sec.items.map(([label, val]) => <ResultRow key={label} label={label}>{val || "-"}</ResultRow>)}
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
    <div className="bg-white/[0.06] border border-white/5 rounded-2xl p-3 backdrop-blur-sm">
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
    <div className="bg-white/[0.06] border border-white/5 rounded-2xl px-3 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-1.5">
        <span className="w-6 h-6 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
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
// (BusinessDashboard was merged into the unified snapshot header at the top of
// the studio, so all the business numbers live in one cohesive place.)
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
    <AppleCard className="p-5 space-y-3">
      <h3 className="font-display text-lg font-extrabold tracking-tight flex items-center gap-2"><Activity className="w-5 h-5" style={{ color: NEON }} /> Run the business - Month {sim.month}</h3>
      {!s ? (
        <>
          <p className="text-sm text-muted-foreground">A new situation hits every month and demands a decision. Keep your business alive and growing - for months.</p>
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
          <Button className="w-full press-scale" disabled={opt == null || wc(react) < s.reactMin} onClick={() => { if (looksLowEffort(react)) { toast.error(LOW_EFFORT_MESSAGE); return; } onResolve(opt as number, wc(react)); setOpt(null); setReact(""); }}><CheckCircle2 className="w-4 h-4 mr-1.5" /> Resolve month {sim.month}</Button>
        </>
      )}
    </AppleCard>
  );
}
function ProductLine({ sim, onAdd }: { sim: BizState; onAdd: (p: { name: string; price: number; pitch: string }) => void }) {
  const [name, setName] = useState(""); const [price, setPrice] = useState(""); const [pitch, setPitch] = useState(""); const [open, setOpen] = useState(false);
  const ready = name.trim().length >= 2 && num(price) > 0 && wc(pitch) >= ws(25);
  const submit = () => { if (looksLowEffort(pitch)) { toast.error(LOW_EFFORT_MESSAGE); return; } onAdd({ name: name.trim(), price: num(price), pitch: pitch.trim() }); setName(""); setPrice(""); setPitch(""); setOpen(false); };
  return (
    <AppleCard className="p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-extrabold tracking-tight flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> Your product line</h3>
          <p className="text-sm text-muted-foreground">Keep adding items - a bigger catalog grows your customer base.</p>
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
          <WField label={`Pitch - what it is and who it's for (${ws(25)}+ words)`} value={pitch} onChange={setPitch} min={ws(25)} rows={2} />
          <Incomplete items={[{ label: "Name", ok: name.trim().length >= 2 }, { label: "Price greater than 0", ok: num(price) > 0 }, { label: `Pitch (${ws(25)}+ words)`, ok: wc(pitch) >= ws(25) }]} />
          <div className="flex gap-2"><Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancel</Button><Button className="flex-1 press-scale" disabled={!ready} onClick={submit}><Plus className="w-4 h-4 mr-1" /> Add product (+75 🪙)</Button></div>
        </div>
      ) : (
        <Button variant="outline" className="w-full press-scale" onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-1.5" /> Add a product to your line</Button>
      )}
    </AppleCard>
  );
}
