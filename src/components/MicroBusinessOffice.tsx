import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip as RTooltip,
} from "recharts";
import {
  Loader2, Download, FileSpreadsheet, Users, Megaphone, Gauge, Newspaper,
  ClipboardList, Star, Handshake, FileText, UserPlus, TrendingUp, TrendingDown,
  CheckCircle2, Circle, Coins, Sparkles, AlertTriangle, ArrowRight, CalendarDays,
  Briefcase, Lightbulb, Building2, type LucideIcon,
} from "lucide-react";
import { businessAI, parseAIJson } from "@/lib/businessAI";
import {
  type BusinessGameState, type Employee, defaultState, loadGameState, saveGameState,
  computePnL, pnlToCSV, computeCreditScore, creditTier, productivityFactor,
  PAYROLL_TAX_RATE, SUPPLIER_PERIOD, TAX_PERIOD, PITCH_UNLOCK_WEEK,
} from "@/lib/businessGameState";

type Update = (fn: (s: BusinessGameState) => BusinessGameState) => void;
const money = (n: number) => `${n < 0 ? "−" : ""}${Math.abs(Math.round(n)).toLocaleString()}`;
const NEON = "#00ff88";

/* ════════════════════════════ ORCHESTRATOR ════════════════════════════ */
export default function MicroBusinessOffice() {
  const { earnJeffs, spendJeffs, jeffsBalance } = useApp();
  const [s, setS] = useState<BusinessGameState | null>(null);
  const [advancing, setAdvancing] = useState(false);

  useEffect(() => { loadGameState().then(setS); }, []);
  const update: Update = useCallback((fn) => {
    setS((prev) => { if (!prev) return prev; const next = fn(prev); saveGameState(next); return next; });
  }, []);
  const awardXP = useCallback((n: number, reason: string) => { earnJeffs(n, reason); }, [earnJeffs]);

  if (!s) return <div className="flex items-center justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-primary" /></div>;

  // ── Feature 6 gate: a scored business plan is required before the office unlocks
  if (!s.planApproved) return <BusinessPlanGate s={s} update={update} awardXP={awardXP} />;

  const pnl = computePnL(s);
  const tier = creditTier(s.creditScore);
  const payrollDue = s.employees.length > 0 && s.lastPayrollWeek < s.week;
  const taxDue = s.week % TAX_PERIOD === 0 && !s.taxFiledWeeks.includes(s.week);
  const supplierDue = s.week % SUPPLIER_PERIOD === 0 && s.lastSupplierWeek < s.week;

  // ── End the week: simulate a week of business, then fire weekly events ──
  const endWeek = async () => {
    if (advancing) return;
    setAdvancing(true);
    try {
      // 1. Payroll consequence: unpaid employees quit + reputation hit.
      let quit = false;
      if (s.employees.length > 0 && s.lastPayrollWeek < s.week) quit = true;

      // 2. Simulate the week's revenue/expenses.
      const prod = productivityFactor(s);
      const rev = Math.round((220 + s.employees.length * 130) * prod * (0.55 + (s.starRating / 5) * 0.85) * (0.8 + Math.random() * 0.5));
      const newCogs = Math.round(rev * 0.4);
      const rent = 80, marketing = 45, other = 25;

      // 3. Generate the AI weekly-report insight (best effort).
      let insight = "";
      try {
        insight = (await businessAI(
          "You are a sharp small-business advisor. Reply with ONE specific, actionable sentence (max 30 words).",
          `This week revenue was ${rev} (forecast ${s.weekForecast || rev}). Cost of goods ${newCogs}. Payroll ${s.expenses.payroll}, employees ${s.employees.length}, star rating ${s.starRating.toFixed(1)}/5, credit score ${s.creditScore}. Give one concrete recommendation for next week.`,
          120,
        )).trim();
      } catch { insight = "Watch your margins — keep cost of goods under 40% of revenue and pay bills on time."; }

      update((st) => {
        const employees = quit ? [] : st.employees;
        const week = st.week + 1;
        const revenue = st.revenue + rev;
        const expenses = {
          ...st.expenses,
          marketing: st.expenses.marketing + marketing,
          rent: st.expenses.rent + rent,
          other: st.expenses.other + other,
        };
        const cogs = st.cogs + newCogs;
        const history = [...st.history, {
          week: st.week, revenue: rev, payroll: 0, forecast: st.weekForecast || rev,
          expenses: newCogs + marketing + rent + other, insight,
        }].slice(-12);
        const next: BusinessGameState = {
          ...st, employees, week, revenue, expenses, cogs, history,
          billsMissed: quit ? st.billsMissed + 1 : st.billsMissed,
          starRating: quit ? Math.max(1, st.starRating - 0.5) : st.starRating,
          weekForecast: Math.round(rev * (1.05 + Math.random() * 0.15)),
          weekStartRevenue: revenue,
        };
        next.creditScore = computeCreditScore(next);
        return next;
      });
      awardXP(8, "Completed a business week");
      if (quit) toast.error("Your employees quit!", { description: "You skipped payroll — reputation took a hit." });
      else toast.success(`Week ${s.week} complete`, { description: "Weekly report generated. +8 XP" });
    } finally {
      setAdvancing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Office HUD: week, credit score, stars */}
      <div className="hud-panel p-4 relative z-10">
        <div className="relative z-10 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" style={{ color: NEON }} />
            <div>
              <p className="font-display text-base font-extrabold text-white leading-none">The Office</p>
              <p className="text-white/40 text-xs mt-0.5">Run the back office of your business</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-white/5 rounded-lg px-3 py-1.5 text-center">
              <p className="text-[9px] text-white/40 uppercase font-bold flex items-center gap-1 justify-center"><CalendarDays className="w-3 h-3" />Week</p>
              <p className="text-sm font-extrabold text-white">{s.week}</p>
            </div>
            <div className="bg-white/5 rounded-lg px-3 py-1.5 text-center" title="Business credit score">
              <p className="text-[9px] text-white/40 uppercase font-bold flex items-center gap-1 justify-center"><Gauge className="w-3 h-3" />Credit</p>
              <p className="text-sm font-extrabold" style={{ color: tier.color }}>{s.creditScore}</p>
            </div>
            <div className="bg-white/5 rounded-lg px-3 py-1.5 text-center">
              <p className="text-[9px] text-white/40 uppercase font-bold flex items-center gap-1 justify-center"><Star className="w-3 h-3" />Rating</p>
              <Stars value={s.starRating} small />
            </div>
            <Button size="sm" className="press-scale gap-1.5" onClick={endWeek} disabled={advancing}>
              {advancing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />} End week
            </Button>
          </div>
        </div>
      </div>

      {/* alerts for due events */}
      <div className="flex flex-wrap gap-2">
        {payrollDue && <Badge variant="warning" className="gap-1"><Users className="w-3 h-3" /> Payroll due</Badge>}
        {taxDue && <Badge variant="warning" className="gap-1"><FileText className="w-3 h-3" /> Quarterly taxes due</Badge>}
        {supplierDue && <Badge variant="destructive" className="gap-1"><Handshake className="w-3 h-3" /> Supplier price hike</Badge>}
        {s.week >= PITCH_UNLOCK_WEEK && !s.investorFunded && <Badge variant="success" className="gap-1"><Sparkles className="w-3 h-3" /> Investor pitch unlocked</Badge>}
      </div>

      <Tabs defaultValue="pnl" className="space-y-4">
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full h-auto">
          <TabsTrigger value="pnl" className="text-xs"><FileSpreadsheet className="w-3.5 h-3.5 mr-1 hidden sm:inline" />P&amp;L</TabsTrigger>
          <TabsTrigger value="payroll" className="text-xs"><Users className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Payroll</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs"><Newspaper className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Reports</TabsTrigger>
          <TabsTrigger value="pitch" className="text-xs"><TrendingUp className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Pitch</TabsTrigger>
          <TabsTrigger value="hr" className="text-xs"><UserPlus className="w-3.5 h-3.5 mr-1 hidden sm:inline" />HR</TabsTrigger>
          <TabsTrigger value="taxes" className="text-xs"><FileText className="w-3.5 h-3.5 mr-1 hidden sm:inline" />Taxes</TabsTrigger>
        </TabsList>

        <TabsContent value="pnl"><PnLSheet s={s} /></TabsContent>
        <TabsContent value="payroll"><PayrollPanel s={s} update={update} awardXP={awardXP} spend={spendJeffs} balance={jeffsBalance} payrollDue={payrollDue} /></TabsContent>
        <TabsContent value="reports"><WeeklyReports s={s} /></TabsContent>
        <TabsContent value="pitch"><InvestorPitch s={s} update={update} earn={earnJeffs} /></TabsContent>
        <TabsContent value="hr" className="space-y-4">
          <ComplaintPanel s={s} update={update} awardXP={awardXP} />
          {supplierDue && <SupplierNegotiation s={s} update={update} awardXP={awardXP} />}
          <HiringPanel s={s} update={update} awardXP={awardXP} />
        </TabsContent>
        <TabsContent value="taxes"><TaxForm s={s} update={update} awardXP={awardXP} spend={spendJeffs} taxDue={taxDue} /></TabsContent>
      </Tabs>
    </div>
  );
}

/* ════════════════════════════ shared bits ════════════════════════════ */
function Stars({ value, small }: { value: number; small?: boolean }) {
  const sz = small ? "w-3.5 h-3.5" : "w-5 h-5";
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn(sz)} style={{ color: i <= Math.round(value) ? "#EBB13E" : "rgba(255,255,255,.18)" }} fill={i <= Math.round(value) ? "#EBB13E" : "transparent"} />
      ))}
      <span className={cn("font-bold ml-1", small ? "text-xs text-white" : "text-sm")}>{value.toFixed(1)}</span>
    </span>
  );
}
function Head({ icon: Icon, title, sub }: { icon: LucideIcon; title: string; sub?: string }) {
  return (
    <div className="mb-1">
      <h3 className="font-display text-lg font-extrabold flex items-center gap-2"><Icon className="w-5 h-5 text-primary" /> {title}</h3>
      {sub && <p className="text-sm text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

/* ═══ FEATURE 1 — P&L SPREADSHEET DASHBOARD ═══ */
function PnLSheet({ s }: { s: BusinessGameState }) {
  const p = computePnL(s);
  const exportCSV = () => {
    const blob = new Blob([pnlToCSV(s)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `profit-loss-week-${s.week}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast.success("P&L exported to CSV");
  };
  const Row = ({ label, value, bold, total, indent, negative }: { label: string; value: number; bold?: boolean; total?: boolean; indent?: boolean; negative?: boolean }) => (
    <div className={cn("grid grid-cols-[1fr_auto] gap-4 px-4 py-2 items-center", total ? "bg-primary/5 border-y border-primary/20" : "odd:bg-muted/40")}>
      <span className={cn("text-sm", indent && "pl-4 text-muted-foreground", bold && "font-bold", total && "font-extrabold")}>{label}</span>
      <span className={cn("text-sm tabular-nums font-mono", bold && "font-bold", total && "font-extrabold text-base",
        negative ? "text-destructive" : value >= 0 ? "" : "text-destructive")}>
        {negative ? `(${money(Math.abs(value))})` : money(value)}
      </span>
    </div>
  );
  return (
    <Card variant="elevated">
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-3">
          <Head icon={FileSpreadsheet} title="Profit & Loss" sub="Live statement — updates as you run the business." />
          <Button size="sm" variant="outline" className="press-scale gap-1.5" onClick={exportCSV}><Download className="w-4 h-4" /> Export CSV</Button>
        </div>
        <div className="rounded-xl border border-border overflow-hidden font-mono">
          <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-2 bg-foreground text-background">
            <span className="text-xs font-bold uppercase tracking-wider">Account</span>
            <span className="text-xs font-bold uppercase tracking-wider">Amount (IC)</span>
          </div>
          <Row label="Revenue" value={p.revenue} bold />
          <Row label="Cost of Goods Sold" value={p.cogs} indent negative />
          <Row label="Gross Profit" value={p.grossProfit} total />
          <div className="px-4 py-1.5 bg-muted/40"><span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Operating Expenses</span></div>
          {p.opex.map((o) => <Row key={o.key} label={o.label} value={o.amount} indent negative />)}
          <Row label="Total Operating Expenses" value={p.totalOpex} bold negative />
          <Row label="Net Profit" value={p.netProfit} total />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Supplier cost multiplier: ×{s.supplierCostMultiplier.toFixed(2)} (negotiate it down in HR).</p>
      </CardContent>
    </Card>
  );
}

/* ═══ FEATURE 2 — PAYROLL SYSTEM ═══ */
function PayrollPanel({ s, update, awardXP, spend, balance, payrollDue }: { s: BusinessGameState; update: Update; awardXP: (n: number, r: string) => void; spend: (n: number, r: string) => boolean; balance: number; payrollDue: boolean }) {
  const gross = s.employees.reduce((a, e) => a + e.weeklyWage, 0);
  const tax = Math.round(gross * PAYROLL_TAX_RATE);
  const total = gross + tax;
  const runPayroll = () => {
    if (s.employees.length === 0) { toast.error("No employees to pay"); return; }
    if (s.lastPayrollWeek >= s.week) { toast("Payroll already run this week"); return; }
    if (balance < total) { toast.error("Not enough InvestiCoins for payroll", { description: `Need ${total.toLocaleString()} IC.` }); return; }
    if (!spend(total, `Payroll week ${s.week}`)) return;
    update((st) => ({ ...st, lastPayrollWeek: st.week, billsOnTime: st.billsOnTime + 1, expenses: { ...st.expenses, payroll: st.expenses.payroll + total } }));
    awardXP(6, "Ran payroll on time");
    toast.success(`Payroll paid — net cash impact −${total.toLocaleString()} IC`, { description: `Wages ${gross.toLocaleString()} + 15.3% payroll tax ${tax.toLocaleString()}` });
  };
  return (
    <Card variant="elevated">
      <CardContent className="pt-5 space-y-4">
        <Head icon={Users} title="Weekly Payroll" sub="Pay your team every week — or they walk." />
        {s.employees.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No employees yet. Hire someone in the HR tab.</p>
        ) : (
          <>
            <div className="rounded-xl border border-border overflow-hidden">
              {s.employees.map((e, i) => (
                <div key={e.id} className={cn("flex items-center justify-between px-3 py-2.5", i % 2 && "bg-muted/40")}>
                  <div>
                    <p className="text-sm font-semibold">{e.name} {e.badHireUntilWeek && e.badHireUntilWeek >= s.week && <Badge variant="destructive" className="ml-1 text-[10px]">underperforming</Badge>}</p>
                    <p className="text-xs text-muted-foreground">{e.role}</p>
                  </div>
                  <span className="text-sm font-bold text-gold flex items-center gap-1"><Coins className="w-3.5 h-3.5" />{e.weeklyWage}/wk</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-muted p-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Gross wages</span><span className="font-bold tabular-nums">{gross.toLocaleString()} IC</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payroll tax (15.3%)</span><span className="font-bold tabular-nums text-destructive">+{tax.toLocaleString()} IC</span></div>
              <div className="flex justify-between border-t border-border pt-1.5"><span className="font-bold">Net cash impact</span><span className="font-extrabold tabular-nums text-destructive">−{total.toLocaleString()} IC</span></div>
            </div>
            {payrollDue
              ? <Button className="w-full press-scale" onClick={runPayroll}><Coins className="w-4 h-4 mr-1.5" /> Run payroll ({total.toLocaleString()} IC)</Button>
              : <p className="text-sm text-success font-semibold text-center flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Payroll is paid for week {s.week}.</p>}
            <p className="text-xs text-muted-foreground">Skip payroll and end the week → employees quit and your star rating drops.</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

/* ═══ FEATURE 5 — WEEKLY BUSINESS REVIEW REPORT (Recharts + AI) ═══ */
function WeeklyReports({ s }: { s: BusinessGameState }) {
  const last = s.history[s.history.length - 1];
  const chartData = s.history.map((h) => ({ name: `W${h.week}`, profit: h.revenue - h.expenses, revenue: h.revenue }));
  const topExpenses = computePnL(s).opex.filter((o) => o.amount > 0).sort((a, b) => b.amount - a.amount).slice(0, 3);
  if (!last) return <Card variant="elevated"><CardContent className="pt-6 text-center text-sm text-muted-foreground">End your first week to generate a report.</CardContent></Card>;
  const vsForecast = last.revenue - last.forecast;
  return (
    <div className="space-y-4">
      <Card variant="elevated">
        <CardContent className="pt-5">
          <Head icon={Newspaper} title={`Week ${last.week} Review`} sub="Auto-generated at the end of each week." />
          <div className="grid sm:grid-cols-3 gap-3 mt-3">
            <div className="rounded-xl bg-muted p-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Revenue vs forecast</p>
              <p className="text-lg font-extrabold tabular-nums">{last.revenue.toLocaleString()}</p>
              <p className={cn("text-xs font-bold flex items-center gap-1", vsForecast >= 0 ? "text-success" : "text-destructive")}>
                {vsForecast >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {vsForecast >= 0 ? "+" : ""}{vsForecast.toLocaleString()} vs {last.forecast.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl bg-muted p-3 sm:col-span-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">Top expense categories</p>
              <div className="flex flex-wrap gap-1.5">
                {topExpenses.length === 0 ? <span className="text-xs text-muted-foreground">None yet</span> :
                  topExpenses.map((o) => <Badge key={o.key} variant="outline">{o.label}: {o.amount.toLocaleString()} IC</Badge>)}
              </div>
            </div>
          </div>
          {last.insight && (
            <div className="mt-3 rounded-xl border p-3 flex items-start gap-2" style={{ borderColor: `${NEON}55`, background: `${NEON}0d` }}>
              <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: NEON }} />
              <div><p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: NEON }}>AI advisor · recommendation</p><p className="text-sm text-foreground/90 mt-0.5">{last.insight}</p></div>
            </div>
          )}
        </CardContent>
      </Card>
      <Card variant="elevated">
        <CardContent className="pt-5">
          <p className="text-sm font-bold flex items-center gap-1.5 mb-3"><BarChartIcon /> Cash flow by week</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <RTooltip cursor={{ fill: "hsl(var(--muted))" }} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                {chartData.map((d, i) => <Cell key={i} fill={d.profit >= 0 ? "#1D9E75" : "#dc2626"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
function BarChartIcon() { return <Newspaper className="w-4 h-4 text-primary" />; }

/* ═══ FEATURE 3 — INVESTOR PITCH MODE ═══ */
function InvestorPitch({ s, update, earn }: { s: BusinessGameState; update: Update; earn: (n: number, r: string) => void }) {
  const [reviewing, setReviewing] = useState(false);
  if (s.week < PITCH_UNLOCK_WEEK) {
    return <Card variant="elevated"><CardContent className="pt-6 text-center text-sm text-muted-foreground">Investor pitch unlocks after 4 weeks of operation. Currently week {s.week}.</CardContent></Card>;
  }
  const recent = s.history.slice(-3);
  const trend = recent.length >= 2 ? (recent[recent.length - 1].revenue - recent[0].revenue) : 0;
  const net = computePnL(s).netProfit;
  const pitch = () => {
    setReviewing(true);
    setTimeout(() => {
      const willFund = net > 0 && trend >= 0 && s.creditScore >= 600;
      if (willFund) {
        const amount = 400 + Math.round(Math.max(0, net) * 0.5);
        earn(amount, "Investor funding");
        update((st) => ({ ...st, investorFunded: true, investorPassed: false, investorFeedback: `Funded! Your net profit is positive and revenue is trending ${trend >= 0 ? "up" : "flat"}. We're backing you with ${amount} IC. Keep that credit score strong.` }));
        toast.success(`💰 Funded! +${amount} InvestiCoins`);
      } else {
        const reasons: string[] = [];
        if (net <= 0) reasons.push("you're not profitable yet — your expenses outrun revenue");
        if (trend < 0) reasons.push("revenue is trending down over recent weeks");
        if (s.creditScore < 600) reasons.push(`your business credit score (${s.creditScore}) is too low to lend against`);
        update((st) => ({ ...st, investorPassed: true, investorFunded: false, investorFeedback: `I'm going to pass for now. Here's why: ${reasons.join("; ")}. Come back when you've turned a profit for a couple of weeks and tightened your costs.` }));
        toast.error("The investor passed", { description: "Read their feedback and try again later." });
      }
      setReviewing(false);
    }, 1200);
  };
  return (
    <Card variant="elevated">
      <CardContent className="pt-5 space-y-4">
        <Head icon={TrendingUp} title="Investor Pitch" sub="Pitch a simulated investor who reviews your real P&L." />
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#0f2d1e,#06291f)" }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: "rgba(255,255,255,.08)" }}>🦈</div>
            <div><p className="font-bold text-white">Angel investor</p><p className="text-white/50 text-xs">Reviewing: net {money(net)} IC · credit {s.creditScore} · {recent.length}-week trend {trend >= 0 ? "↑" : "↓"}</p></div>
          </div>
          {(s.investorFunded || s.investorPassed) && (
            <p className="text-sm text-white/80 mt-3 italic">"{s.investorFeedback}"</p>
          )}
        </div>
        {s.investorFunded
          ? <Badge variant="success" className="gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> You've secured funding</Badge>
          : <Button className="w-full press-scale" onClick={pitch} disabled={reviewing}>{reviewing ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1.5" />} Pitch the investor</Button>}
      </CardContent>
    </Card>
  );
}

/* ═══ FEATURE 7 — CUSTOMER COMPLAINT RESPONSES (AI-graded) ═══ */
const COMPLAINTS = [
  "My order arrived two days late and the packaging was crushed. This is unacceptable for the price I paid.",
  "I was charged twice for the same item and nobody has responded to my emails for a week.",
  "The product looks nothing like the photos on your site. I feel misled.",
  "Your staff were rude when I asked a simple question. I won't be coming back.",
  "I've been a loyal customer for months and you won't even honor a small discount. Disappointing.",
];
function ComplaintPanel({ s, update, awardXP }: { s: BusinessGameState; update: Update; awardXP: (n: number, r: string) => void }) {
  const alreadyThisWeek = s.complaints.some((c) => c.week === s.week);
  const complaint = useMemo(() => COMPLAINTS[(s.week * 7) % COMPLAINTS.length], [s.week]);
  const [resp, setResp] = useState("");
  const [busy, setBusy] = useState(false);
  const last = s.complaints[s.complaints.length - 1];
  if (alreadyThisWeek) {
    return (
      <Card variant="elevated"><CardContent className="pt-5">
        <Head icon={Star} title="Customer Complaint" sub="One per week — already handled this week." />
        {last && <div className="rounded-xl bg-muted p-3 mt-2"><p className="text-xs text-muted-foreground">Your reply scored</p><p className="font-extrabold">{last.score}/10 · rating now</p><Stars value={s.starRating} /></div>}
      </CardContent></Card>
    );
  }
  const submit = async () => {
    if (resp.trim().length < 15) { toast.error("Write a fuller response (15+ chars)"); return; }
    setBusy(true);
    try {
      const out = await businessAI(
        "You grade a small-business owner's reply to a customer complaint on professionalism and empathy. Return ONLY JSON: {\"score\": <1-10 integer>, \"feedback\": \"<one sentence>\"}.",
        `Complaint: "${complaint}"\nOwner's reply: "${resp.trim()}"\nScore professionalism and empathy 1-10.`,
        200,
      );
      const { score, feedback } = parseAIJson<{ score: number; feedback: string }>(out, { score: 5, feedback: "Reasonable response." });
      const clamped = Math.max(1, Math.min(10, Math.round(score)));
      update((st) => {
        const newStar = Math.max(1, Math.min(5, st.starRating * 0.7 + (clamped / 2) * 0.3));
        return { ...st, starRating: Math.round(newStar * 10) / 10, complaints: [...st.complaints, { week: st.week, complaint, response: resp.trim(), score: clamped }] };
      });
      awardXP(5, "Handled a customer complaint");
      toast.success(`Scored ${clamped}/10 — ${feedback}`);
      setResp("");
    } catch { toast.error("Couldn't reach the AI grader — try again."); } finally { setBusy(false); }
  };
  return (
    <Card variant="elevated"><CardContent className="pt-5 space-y-3">
      <Head icon={Star} title="Customer Complaint" sub="Respond well — it moves your star rating." />
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3"><p className="text-xs font-bold uppercase tracking-wider text-destructive mb-1">Angry customer</p><p className="text-sm">"{complaint}"</p></div>
      <Textarea rows={3} placeholder="Write a professional, empathetic response…" value={resp} onChange={(e) => setResp(e.target.value)} />
      <Button className="w-full press-scale" onClick={submit} disabled={busy}>{busy ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <ArrowRight className="w-4 h-4 mr-1.5" />} Send response</Button>
    </CardContent></Card>
  );
}

/* ═══ FEATURE 8 — SUPPLIER NEGOTIATION (AI plays the supplier) ═══ */
function SupplierNegotiation({ s, update, awardXP }: { s: BusinessGameState; update: Update; awardXP: (n: number, r: string) => void }) {
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [reply, setReply] = useState("");
  const increase = useMemo(() => 1.15 + ((s.week % 4) * 0.03), [s.week]);
  const negotiate = async () => {
    if (msg.trim().length < 15) { toast.error("Make your case (15+ chars)"); return; }
    setBusy(true);
    try {
      const out = await businessAI(
        `You ROLE-PLAY as a supplier who just raised prices by ${Math.round((increase - 1) * 100)}%. A small-business owner is negotiating. Decide realistically whether to reduce the increase based on how persuasive/professional they are. Return ONLY JSON: {"reduced": <boolean>, "newIncreasePct": <number 0-${Math.round((increase - 1) * 100)}>, "reply": "<2-3 sentence in-character reply>"}.`,
        `Owner says: "${msg.trim()}"`,
        300,
      );
      const r = parseAIJson<{ reduced: boolean; newIncreasePct: number; reply: string }>(out, { reduced: false, newIncreasePct: Math.round((increase - 1) * 100), reply: "Prices stand as quoted." });
      const newMult = 1 + Math.max(0, Math.min((increase - 1), (r.newIncreasePct || 0) / 100));
      update((st) => ({ ...st, supplierCostMultiplier: Math.round(newMult * 100) / 100, lastSupplierWeek: st.week }));
      setReply(r.reply);
      awardXP(6, "Negotiated with a supplier");
      toast[r.reduced ? "success" : "message"](r.reduced ? `Deal! Cost multiplier now ×${newMult.toFixed(2)}` : "Supplier held firm", { description: `COGS multiplier ×${newMult.toFixed(2)} applied to your P&L.` });
    } catch { toast.error("Supplier unreachable — try again."); } finally { setBusy(false); }
  };
  return (
    <Card variant="elevated"><CardContent className="pt-5 space-y-3">
      <Head icon={Handshake} title="Supplier Negotiation" sub={`Your supplier raised prices ${Math.round((increase - 1) * 100)}%. Talk them down — it affects your COGS.`} />
      {reply && <div className="rounded-xl bg-muted p-3"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Supplier</p><p className="text-sm italic">"{reply}"</p></div>}
      <Textarea rows={3} placeholder="Make your negotiation case…" value={msg} onChange={(e) => setMsg(e.target.value)} />
      <Button className="w-full press-scale" onClick={negotiate} disabled={busy}>{busy ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Handshake className="w-4 h-4 mr-1.5" />} Negotiate</Button>
    </CardContent></Card>
  );
}

/* ═══ FEATURE 9 — QUARTERLY TAX FORM (Schedule C simplified) ═══ */
function TaxForm({ s, update, awardXP, spend, taxDue }: { s: BusinessGameState; update: Update; awardXP: (n: number, r: string) => void; spend: (n: number, r: string) => boolean; taxDue: boolean }) {
  const p = computePnL(s);
  const lines = [
    { id: "rev", label: "Line 1 — Gross receipts (Revenue)", value: p.revenue },
    { id: "cogs", label: "Line 4 — Cost of goods sold", value: p.cogs },
    { id: "gross", label: "Line 7 — Gross profit", value: p.grossProfit },
    { id: "exp", label: "Line 28 — Total expenses", value: p.totalOpex },
    { id: "net", label: "Line 31 — Net profit (or loss)", value: p.netProfit },
  ];
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const allConfirmed = lines.every((l) => checked[l.id]);
  if (!taxDue) {
    return <Card variant="elevated"><CardContent className="pt-6 text-center text-sm text-muted-foreground">No filing due. A simplified Schedule C is due every 4 weeks (next at week {(Math.floor(s.week / TAX_PERIOD) + 1) * TAX_PERIOD}).</CardContent></Card>;
  }
  const file = () => {
    if (!allConfirmed) {
      const penalty = 75;
      spend(penalty, "Tax penalty (incomplete filing)");
      update((st) => ({ ...st, taxFiledWeeks: [...st.taxFiledWeeks, st.week], billsMissed: st.billsMissed + 1 }));
      toast.error(`Incomplete filing — ${penalty} IC penalty`, { description: "Confirm every line next quarter to avoid fees." });
      return;
    }
    update((st) => ({ ...st, taxFiledWeeks: [...st.taxFiledWeeks, st.week], billsOnTime: st.billsOnTime + 1 }));
    awardXP(12, "Filed quarterly taxes correctly");
    toast.success("Schedule C filed correctly! +12 XP");
  };
  return (
    <Card variant="elevated"><CardContent className="pt-5 space-y-3">
      <Head icon={FileText} title="Schedule C (simplified)" sub="Auto-filled from your P&L. Review and confirm each line." />
      <div className="rounded-xl border border-border overflow-hidden">
        {lines.map((l, i) => (
          <button key={l.id} onClick={() => setChecked((c) => ({ ...c, [l.id]: !c[l.id] }))} className={cn("w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors", i % 2 && "bg-muted/40", checked[l.id] && "bg-success/5")}>
            <span className="flex items-center gap-2 text-sm">{checked[l.id] ? <CheckCircle2 className="w-4 h-4 text-success shrink-0" /> : <Circle className="w-4 h-4 text-muted-foreground shrink-0" />}{l.label}</span>
            <span className="font-mono font-bold tabular-nums text-sm">{money(l.value)}</span>
          </button>
        ))}
      </div>
      <Button className="w-full press-scale" onClick={file}><FileText className="w-4 h-4 mr-1.5" /> {allConfirmed ? "Submit filing" : "Submit (incomplete — penalty applies)"}</Button>
    </CardContent></Card>
  );
}

/* ═══ FEATURE 10 — JOB POSTING + AI INTERVIEW ═══ */
interface Candidate { name: string; summary: string; quality: number }
function HiringPanel({ s, update, awardXP }: { s: BusinessGameState; update: Update; awardXP: (n: number, r: string) => void }) {
  const [step, setStep] = useState<"post" | "interview" | "decide">("post");
  const [role, setRole] = useState(""); const [resp, setResp] = useState(""); const [skills, setSkills] = useState("");
  const [busy, setBusy] = useState(false);
  const [cand, setCand] = useState<Candidate | null>(null);
  const [qa, setQa] = useState<{ q: string; a: string }[]>([]);
  const [draftQ, setDraftQ] = useState("");

  const postJob = async () => {
    if (!role.trim() || resp.trim().length < 10 || skills.trim().length < 5) { toast.error("Fill in role, responsibilities, and required skills"); return; }
    setBusy(true);
    try {
      const out = await businessAI(
        "Generate a fictional job candidate applying to a small student-run business. Return ONLY JSON: {\"name\":\"<full name>\",\"summary\":\"<2 sentence background>\",\"quality\":<1-10 integer how strong a fit they actually are>}. Vary the quality realistically.",
        `Job posting:\nRole: ${role.trim()}\nResponsibilities: ${resp.trim()}\nRequired skills: ${skills.trim()}`,
        300,
      );
      const c = parseAIJson<Candidate>(out, { name: "Alex Carter", summary: "A recent grad eager to learn.", quality: 5 });
      setCand({ ...c, quality: Math.max(1, Math.min(10, Math.round(c.quality))) });
      setStep("interview");
      awardXP(4, "Posted a job and sourced a candidate");
    } catch { toast.error("Couldn't source a candidate — try again."); } finally { setBusy(false); }
  };
  const askQuestion = async () => {
    if (!cand || draftQ.trim().length < 5 || qa.length >= 3) return;
    setBusy(true);
    try {
      const a = await businessAI(
        `You ARE a job candidate named ${cand.name}. Background: ${cand.summary}. Your true competence is ${cand.quality}/10 — answer in-character so a sharp interviewer could tell (stronger candidates give specific, confident answers; weaker ones are vague). 1-3 sentences.`,
        `Interview question: "${draftQ.trim()}"`,
        200,
      );
      setQa((prev) => [...prev, { q: draftQ.trim(), a: a.trim() }]);
      setDraftQ("");
      if (qa.length + 1 >= 3) setStep("decide");
    } catch { toast.error("Candidate didn't respond — try again."); } finally { setBusy(false); }
  };
  const decide = (hire: boolean) => {
    if (!cand) return;
    if (!hire) { toast("Passed on the candidate"); reset(); return; }
    const badHire = cand.quality < 5;
    const emp: Employee = { id: crypto.randomUUID(), name: cand.name, role: role.trim() || "Team member", weeklyWage: 90 + cand.quality * 8, hiredWeek: s.week, badHireUntilWeek: badHire ? s.week + 2 : undefined };
    update((st) => ({ ...st, employees: [...st.employees, emp] }));
    awardXP(6, "Hired an employee");
    if (badHire) toast.error(`Hired ${cand.name} — but it's a bad fit`, { description: "−20% weekly productivity for 2 weeks." });
    else toast.success(`Hired ${cand.name}! A strong addition to the team.`);
    reset();
  };
  const reset = () => { setStep("post"); setRole(""); setResp(""); setSkills(""); setCand(null); setQa([]); setDraftQ(""); };

  return (
    <Card variant="elevated"><CardContent className="pt-5 space-y-3">
      <Head icon={UserPlus} title="Hire (write a posting, then interview)" sub="Source an AI candidate and interview before you commit." />
      {step === "post" && (<>
        <Input placeholder="Role / title (e.g. Marketing Assistant)" value={role} onChange={(e) => setRole(e.target.value)} />
        <Textarea rows={2} placeholder="Responsibilities…" value={resp} onChange={(e) => setResp(e.target.value)} />
        <Input placeholder="Required skills (comma-separated)" value={skills} onChange={(e) => setSkills(e.target.value)} />
        <Button className="w-full press-scale" onClick={postJob} disabled={busy}>{busy ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Briefcase className="w-4 h-4 mr-1.5" />} Post job & source candidate</Button>
      </>)}
      {step === "interview" && cand && (<>
        <div className="rounded-xl bg-muted p-3"><p className="font-bold">{cand.name}</p><p className="text-sm text-muted-foreground">{cand.summary}</p></div>
        {qa.map((x, i) => (<div key={i} className="rounded-xl border border-border p-3"><p className="text-sm font-semibold">Q: {x.q}</p><p className="text-sm text-muted-foreground mt-1">A: {x.a}</p></div>))}
        {qa.length < 3 && (<>
          <Textarea rows={2} placeholder={`Interview question ${qa.length + 1} of 3…`} value={draftQ} onChange={(e) => setDraftQ(e.target.value)} />
          <Button className="w-full press-scale" onClick={askQuestion} disabled={busy}>{busy ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <ArrowRight className="w-4 h-4 mr-1.5" />} Ask</Button>
        </>)}
      </>)}
      {step === "decide" && cand && (<>
        <div className="rounded-xl bg-muted p-3 space-y-2">
          <p className="font-bold">{cand.name}</p>
          {qa.map((x, i) => (<div key={i}><p className="text-xs font-semibold">Q: {x.q}</p><p className="text-xs text-muted-foreground">A: {x.a}</p></div>))}
          <p className="text-xs text-muted-foreground italic">Trust the interview — a vague candidate is a risky hire.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 press-scale" onClick={() => decide(false)}>Pass</Button>
          <Button className="flex-1 press-scale" onClick={() => decide(true)}><UserPlus className="w-4 h-4 mr-1.5" /> Hire</Button>
        </div>
      </>)}
    </CardContent></Card>
  );
}

/* ═══ FEATURE 6 — BUSINESS PLAN (required before launch, AI-scored) ═══ */
function BusinessPlanGate({ s, update, awardXP }: { s: BusinessGameState; update: Update; awardXP: (n: number, r: string) => void }) {
  const [f, setF] = useState({ name: "", market: "", pricing: "", startup: "", goal: "" });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));
  const ready = f.name.trim() && f.market.trim().length >= 10 && f.pricing.trim().length >= 10 && f.startup.trim().length >= 5 && f.goal.trim();
  const submit = async () => {
    if (!ready) { toast.error("Complete every field (target market & pricing need detail)"); return; }
    setBusy(true);
    try {
      const out = await businessAI(
        "You are a business-school instructor grading a student's one-page business plan. Return ONLY JSON: {\"score\": <1-10 integer>, \"feedback\": \"<2 sentences: what's strong, what to improve>\"}. A 5+ means viable enough to launch.",
        `Business name: ${f.name}\nTarget market: ${f.market}\nPricing strategy: ${f.pricing}\nStartup costs: ${f.startup}\n3-month revenue goal: ${f.goal}`,
        300,
      );
      const { score, feedback } = parseAIJson<{ score: number; feedback: string }>(out, { score: 6, feedback: "Solid start — add more detail on your customer and pricing." });
      const clamped = Math.max(1, Math.min(10, Math.round(score)));
      update((st) => ({ ...st, planScore: clamped, planFeedback: feedback, planApproved: clamped >= 5 }));
      if (clamped >= 5) { awardXP(15, "Business plan approved"); toast.success(`Plan scored ${clamped}/10 — approved! +15 XP`, { description: feedback }); }
      else toast.error(`Plan scored ${clamped}/10 — needs work`, { description: feedback });
    } catch { toast.error("Couldn't reach the grader — try again."); } finally { setBusy(false); }
  };
  return (
    <Card variant="elevated">
      <CardContent className="pt-5 space-y-3">
        <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg,#0f2d1e,#06291f)" }}>
          <Building2 className="w-10 h-10 mx-auto mb-1" style={{ color: NEON }} />
          <p className="font-display text-xl font-extrabold text-white">Write your business plan</p>
          <p className="text-white/55 text-sm mt-1">An AI instructor scores it 1–10. Score 5+ to unlock The Office.</p>
        </div>
        <div><label className="text-sm font-semibold">Business name</label><Input value={f.name} onChange={set("name")} className="mt-1" /></div>
        <div><label className="text-sm font-semibold">Target market</label><Textarea rows={2} value={f.market} onChange={set("market")} className="mt-1" placeholder="Who exactly are your customers?" /></div>
        <div><label className="text-sm font-semibold">Pricing strategy</label><Textarea rows={2} value={f.pricing} onChange={set("pricing")} className="mt-1" placeholder="How will you price, and why?" /></div>
        <div><label className="text-sm font-semibold">Startup costs breakdown</label><Input value={f.startup} onChange={set("startup")} className="mt-1" placeholder="e.g. 200 supplies, 100 marketing, 50 tools" /></div>
        <div><label className="text-sm font-semibold">3-month revenue goal</label><Input value={f.goal} onChange={set("goal")} className="mt-1" placeholder="e.g. 5,000 IC" /></div>
        {s.planScore > 0 && !s.planApproved && (
          <div className="rounded-xl border border-warning/40 bg-warning/5 p-3 flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" /><div><p className="text-sm font-bold">Scored {s.planScore}/10</p><p className="text-xs text-muted-foreground">{s.planFeedback}</p></div></div>
        )}
        <Button className="w-full press-scale" onClick={submit} disabled={busy}>{busy ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <ClipboardList className="w-4 h-4 mr-1.5" />} Submit for scoring</Button>
      </CardContent>
    </Card>
  );
}
