import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ws } from "@/lib/writingScale";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip as RTooltip,
} from "recharts";
import {
  Loader2, Download, FileSpreadsheet, Users, Gauge, Newspaper,
  ClipboardList, Star, Handshake, FileText, UserPlus, TrendingUp, TrendingDown,
  CheckCircle2, Circle, Coins, Sparkles, AlertTriangle, ArrowRight, CalendarDays,
  Briefcase, Lightbulb, Building2, type LucideIcon,
} from "lucide-react";
import {
  type BusinessGameState, type Employee, loadGameState, saveGameState,
  computePnL, pnlToCSV, computeCreditScore, creditTier, productivityFactor,
  PAYROLL_TAX_RATE, SUPPLIER_PERIOD, TAX_PERIOD, PITCH_UNLOCK_WEEK,
} from "@/lib/businessGameState";

// NOTE: These features use smart rule-based logic (no external AI calls).

type Update = (fn: (s: BusinessGameState) => BusinessGameState) => void;
const money = (n: number) => `${n < 0 ? "-" : ""}${Math.abs(Math.round(n)).toLocaleString()}`;
const NEON = "#00ff88";

/* ════════════════════════════ ORCHESTRATOR ════════════════════════════ */
export default function MicroBusinessOffice() {
  const { t } = useTranslation();
  const { earnJeffs, spendJeffs, jeffsBalance } = useApp();
  const [s, setS] = useState<BusinessGameState | null>(null);
  const [advancing, setAdvancing] = useState(false);

  useEffect(() => { loadGameState().then(setS); }, []);
  const update: Update = useCallback((fn) => {
    setS((prev) => { if (!prev) return prev; const next = fn(prev); saveGameState(next); return next; });
  }, []);
  const awardXP = useCallback((n: number, reason: string) => { earnJeffs(n, reason); }, [earnJeffs]);

  if (!s) return <div className="flex items-center justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-primary" /></div>;

  // ── Feature 6 gate: a validated business plan is required before the office unlocks
  if (!s.planApproved) return <BusinessPlanGate update={update} awardXP={awardXP} />;

  const tier = creditTier(s.creditScore);
  const payrollDue = s.employees.length > 0 && s.lastPayrollWeek < s.week;
  const taxDue = s.week % TAX_PERIOD === 0 && !s.taxFiledWeeks.includes(s.week);
  const supplierDue = s.week % SUPPLIER_PERIOD === 0 && s.lastSupplierWeek < s.week;

  // ── End the week: simulate a week of business, then fire weekly events ──
  const endWeek = () => {
    if (advancing) return;
    setAdvancing(true);
    try {
      // 1. Payroll consequence: unpaid employees quit + reputation hit.
      const quit = s.employees.length > 0 && s.lastPayrollWeek < s.week;

      // 2. Simulate the week's revenue/expenses.
      const prod = productivityFactor(s);
      const rev = Math.round((220 + s.employees.length * 130) * prod * (0.55 + (s.starRating / 5) * 0.85) * (0.8 + Math.random() * 0.5));
      const newCogs = Math.round(rev * 0.4);
      const rent = 80, marketing = 45, other = 25;

      // 3. Rule-based weekly-report insight - pick the most relevant rule from the P&L.
      const weekExpenses = newCogs + marketing + rent + other;
      const weekNet = rev - weekExpenses;
      const margin = rev > 0 ? weekNet / rev : 0;
      const prevRev = s.history.length ? s.history[s.history.length - 1].revenue : 0;
      let insight: string;
      if (weekNet < 0) insight = t("microOffice.insights.overspent");
      else if (margin < 0.1) insight = t("microOffice.insights.thinMargins");
      else if (rev > prevRev) insight = t("microOffice.insights.strongWeek");
      else insight = t("microOffice.insights.steadyWeek");

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
          expenses: weekExpenses, insight,
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
      if (quit) toast.error(t("microOffice.toasts.employeesQuitTitle"), { description: t("microOffice.toasts.employeesQuitDesc") });
      else toast.success(t("microOffice.toasts.weekComplete", { week: s.week }), { description: t("microOffice.toasts.weekCompleteDesc") });
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
              <p className="font-display text-base font-extrabold text-white leading-none">{t("microOffice.title")}</p>
              <p className="text-white/40 text-xs mt-0.5">{t("microOffice.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-white/5 rounded-lg px-3 py-1.5 text-center">
              <p className="text-[9px] text-white/40 uppercase font-bold flex items-center gap-1 justify-center"><CalendarDays className="w-3 h-3" />{t("microOffice.hud.week")}</p>
              <p className="text-sm font-extrabold text-white">{s.week}</p>
            </div>
            <div className="bg-white/5 rounded-lg px-3 py-1.5 text-center" title={t("microOffice.hud.creditTitle")}>
              <p className="text-[9px] text-white/40 uppercase font-bold flex items-center gap-1 justify-center"><Gauge className="w-3 h-3" />{t("microOffice.hud.credit")}</p>
              <p className="text-sm font-extrabold" style={{ color: tier.color }}>{s.creditScore}</p>
            </div>
            <div className="bg-white/5 rounded-lg px-3 py-1.5 text-center">
              <p className="text-[9px] text-white/40 uppercase font-bold flex items-center gap-1 justify-center"><Star className="w-3 h-3" />{t("microOffice.hud.rating")}</p>
              <Stars value={s.starRating} small />
            </div>
            <Button size="sm" className="press-scale gap-1.5" onClick={endWeek} disabled={advancing}>
              {advancing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />} {t("microOffice.hud.endWeek")}
            </Button>
          </div>
        </div>
      </div>

      {/* alerts for due events */}
      <div className="flex flex-wrap gap-2">
        {payrollDue && <Badge variant="warning" className="gap-1"><Users className="w-3 h-3" /> {t("microOffice.alerts.payrollDue")}</Badge>}
        {taxDue && <Badge variant="warning" className="gap-1"><FileText className="w-3 h-3" /> {t("microOffice.alerts.taxesDue")}</Badge>}
        {supplierDue && <Badge variant="destructive" className="gap-1"><Handshake className="w-3 h-3" /> {t("microOffice.alerts.supplierHike")}</Badge>}
        {s.week >= PITCH_UNLOCK_WEEK && !s.investorFunded && <Badge variant="success" className="gap-1"><Sparkles className="w-3 h-3" /> {t("microOffice.alerts.pitchUnlocked")}</Badge>}
      </div>

      <Tabs defaultValue="pnl" className="space-y-4">
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full h-auto">
          <TabsTrigger value="pnl" className="text-xs"><FileSpreadsheet className="w-3.5 h-3.5 mr-1 hidden sm:inline" />{t("microOffice.tabs.pnl")}</TabsTrigger>
          <TabsTrigger value="payroll" className="text-xs"><Users className="w-3.5 h-3.5 mr-1 hidden sm:inline" />{t("microOffice.tabs.payroll")}</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs"><Newspaper className="w-3.5 h-3.5 mr-1 hidden sm:inline" />{t("microOffice.tabs.reports")}</TabsTrigger>
          <TabsTrigger value="pitch" className="text-xs"><TrendingUp className="w-3.5 h-3.5 mr-1 hidden sm:inline" />{t("microOffice.tabs.pitch")}</TabsTrigger>
          <TabsTrigger value="hr" className="text-xs"><UserPlus className="w-3.5 h-3.5 mr-1 hidden sm:inline" />{t("microOffice.tabs.hr")}</TabsTrigger>
          <TabsTrigger value="taxes" className="text-xs"><FileText className="w-3.5 h-3.5 mr-1 hidden sm:inline" />{t("microOffice.tabs.taxes")}</TabsTrigger>
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
        <TabsContent value="taxes"><TaxForm s={s} update={update} spend={spendJeffs} balance={jeffsBalance} taxDue={taxDue} /></TabsContent>
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

/* ═══ FEATURE 1 - P&L SPREADSHEET DASHBOARD ═══ */
function PnLSheet({ s }: { s: BusinessGameState }) {
  const { t } = useTranslation();
  const p = computePnL(s);
  const exportCSV = () => {
    const blob = new Blob([pnlToCSV(s)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `profit-loss-week-${s.week}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast.success(t("microOffice.pnl.exported"));
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
          <Head icon={FileSpreadsheet} title={t("microOffice.pnl.title")} sub={t("microOffice.pnl.subtitle")} />
          <Button size="sm" variant="outline" className="press-scale gap-1.5" onClick={exportCSV}><Download className="w-4 h-4" /> {t("microOffice.pnl.exportCsv")}</Button>
        </div>
        <div className="rounded-xl border border-border overflow-hidden font-mono">
          <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-2 bg-foreground text-background">
            <span className="text-xs font-bold uppercase tracking-wider">{t("microOffice.pnl.account")}</span>
            <span className="text-xs font-bold uppercase tracking-wider">{t("microOffice.pnl.amount")}</span>
          </div>
          <Row label={t("microOffice.pnl.revenue")} value={p.revenue} bold />
          <Row label={t("microOffice.pnl.cogs")} value={p.cogs} indent negative />
          <Row label={t("microOffice.pnl.grossProfit")} value={p.grossProfit} total />
          <div className="px-4 py-1.5 bg-muted/40"><span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("microOffice.pnl.operatingExpenses")}</span></div>
          {p.opex.map((o) => <Row key={o.key} label={t(`microOffice.opex.${o.key}`)} value={o.amount} indent negative />)}
          <Row label={t("microOffice.pnl.totalOpex")} value={p.totalOpex} bold negative />
          <Row label={t("microOffice.pnl.netProfit")} value={p.netProfit} total />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{t("microOffice.pnl.supplierMultiplier", { mult: s.supplierCostMultiplier.toFixed(2) })}</p>
      </CardContent>
    </Card>
  );
}

/* ═══ FEATURE 2 - PAYROLL SYSTEM ═══ */
function PayrollPanel({ s, update, awardXP, spend, balance, payrollDue }: { s: BusinessGameState; update: Update; awardXP: (n: number, r: string) => void; spend: (n: number, r: string) => boolean; balance: number; payrollDue: boolean }) {
  const { t } = useTranslation();
  const gross = s.employees.reduce((a, e) => a + e.weeklyWage, 0);
  const tax = Math.round(gross * PAYROLL_TAX_RATE);
  const total = gross + tax;
  const runPayroll = () => {
    if (s.employees.length === 0) { toast.error(t("microOffice.payroll.noEmployeesToPay")); return; }
    if (s.lastPayrollWeek >= s.week) { toast(t("microOffice.payroll.alreadyRun")); return; }
    if (balance < total) { toast.error(t("microOffice.payroll.notEnough"), { description: t("microOffice.payroll.needIc", { amount: total.toLocaleString() }) }); return; }
    if (!spend(total, `Payroll week ${s.week}`)) return;
    update((st) => ({ ...st, lastPayrollWeek: st.week, billsOnTime: st.billsOnTime + 1, expenses: { ...st.expenses, payroll: st.expenses.payroll + total } }));
    awardXP(6, "Ran payroll on time");
    toast.error(t("microOffice.payroll.paidTitle", { amount: total.toLocaleString() }), { description: t("microOffice.payroll.paidDesc", { gross: gross.toLocaleString(), tax: tax.toLocaleString() }), icon: <TrendingDown className="w-4 h-4" /> });
  };
  return (
    <Card variant="elevated">
      <CardContent className="pt-5 space-y-4">
        <Head icon={Users} title={t("microOffice.payroll.title")} sub={t("microOffice.payroll.subtitle")} />
        {s.employees.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">{t("microOffice.payroll.noEmployees")}</p>
        ) : (
          <>
            <div className="rounded-xl border border-border overflow-hidden">
              {s.employees.map((e, i) => (
                <div key={e.id} className={cn("flex items-center justify-between px-3 py-2.5", i % 2 && "bg-muted/40")}>
                  <div>
                    <p className="text-sm font-semibold">{e.name} {e.badHireUntilWeek && e.badHireUntilWeek >= s.week && <Badge variant="destructive" className="ml-1 text-[10px]">{t("microOffice.payroll.underperforming")}</Badge>}</p>
                    <p className="text-xs text-muted-foreground">{e.role}</p>
                  </div>
                  <span className="text-sm font-bold text-gold flex items-center gap-1"><Coins className="w-3.5 h-3.5" />{t("microOffice.payroll.perWeek", { wage: e.weeklyWage })}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-muted p-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t("microOffice.payroll.grossWages")}</span><span className="font-bold tabular-nums">{gross.toLocaleString()} IC</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t("microOffice.payroll.payrollTax")}</span><span className="font-bold tabular-nums text-destructive">+{tax.toLocaleString()} IC</span></div>
              <div className="flex justify-between border-t border-border pt-1.5"><span className="font-bold">{t("microOffice.payroll.netCashImpact")}</span><span className="font-extrabold tabular-nums text-destructive">-{total.toLocaleString()} IC</span></div>
            </div>
            {payrollDue
              ? <Button className="w-full press-scale" onClick={runPayroll}><Coins className="w-4 h-4 mr-1.5" /> {t("microOffice.payroll.runPayroll", { amount: total.toLocaleString() })}</Button>
              : <p className="text-sm text-success font-semibold text-center flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> {t("microOffice.payroll.paidForWeek", { week: s.week })}</p>}
            <p className="text-xs text-muted-foreground">{t("microOffice.payroll.skipWarning")}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

/* ═══ FEATURE 5 - WEEKLY BUSINESS REVIEW REPORT (Recharts + rule-based insight) ═══ */
function WeeklyReports({ s }: { s: BusinessGameState }) {
  const { t } = useTranslation();
  const last = s.history[s.history.length - 1];
  const chartData = s.history.map((h) => ({ name: `W${h.week}`, profit: h.revenue - h.expenses, revenue: h.revenue }));
  const topExpenses = computePnL(s).opex.filter((o) => o.amount > 0).sort((a, b) => b.amount - a.amount).slice(0, 3);
  if (!last) return <Card variant="elevated"><CardContent className="pt-6 text-center text-sm text-muted-foreground">{t("microOffice.reports.empty")}</CardContent></Card>;
  const vsForecast = last.revenue - last.forecast;
  return (
    <div className="space-y-4">
      <Card variant="elevated">
        <CardContent className="pt-5">
          <Head icon={Newspaper} title={t("microOffice.reports.reviewTitle", { week: last.week })} sub={t("microOffice.reports.reviewSub")} />
          <div className="grid sm:grid-cols-3 gap-3 mt-3">
            <div className="rounded-xl bg-muted p-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{t("microOffice.reports.revenueVsForecast")}</p>
              <p className="text-lg font-extrabold tabular-nums">{last.revenue.toLocaleString()}</p>
              <p className={cn("text-xs font-bold flex items-center gap-1", vsForecast >= 0 ? "text-success" : "text-destructive")}>
                {vsForecast >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {vsForecast >= 0 ? "+" : ""}{vsForecast.toLocaleString()} {t("microOffice.reports.vs")} {last.forecast.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl bg-muted p-3 sm:col-span-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">{t("microOffice.reports.topExpenses")}</p>
              <div className="flex flex-wrap gap-1.5">
                {topExpenses.length === 0 ? <span className="text-xs text-muted-foreground">{t("microOffice.reports.noneYet")}</span> :
                  topExpenses.map((o) => <Badge key={o.key} variant="outline">{t(`microOffice.opex.${o.key}`)}: {o.amount.toLocaleString()} IC</Badge>)}
              </div>
            </div>
          </div>
          {last.insight && (
            <div className="mt-3 rounded-xl border p-3 flex items-start gap-2" style={{ borderColor: `${NEON}55`, background: `${NEON}0d` }}>
              <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: NEON }} />
              <div><p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: NEON }}>{t("microOffice.reports.advisor")}</p><p className="text-sm text-foreground/90 mt-0.5">{last.insight}</p></div>
            </div>
          )}
        </CardContent>
      </Card>
      <Card variant="elevated">
        <CardContent className="pt-5">
          <p className="text-sm font-bold flex items-center gap-1.5 mb-3"><Newspaper className="w-4 h-4 text-primary" /> {t("microOffice.reports.cashFlow")}</p>
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

/* ═══ FEATURE 3 - INVESTOR PITCH MODE ═══ */
function InvestorPitch({ s, update, earn }: { s: BusinessGameState; update: Update; earn: (n: number, r: string) => void }) {
  const { t } = useTranslation();
  const [reviewing, setReviewing] = useState(false);
  if (s.week < PITCH_UNLOCK_WEEK) {
    return <Card variant="elevated"><CardContent className="pt-6 text-center text-sm text-muted-foreground">{t("microOffice.pitch.locked", { week: s.week })}</CardContent></Card>;
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
        const trendWord = trend >= 0 ? t("microOffice.pitch.trendUp") : t("microOffice.pitch.trendFlat");
        update((st) => ({ ...st, investorFunded: true, investorPassed: false, investorFeedback: t("microOffice.pitch.fundedFeedback", { trend: trendWord, amount }) }));
        toast.success(t("microOffice.pitch.fundedToast", { amount }));
      } else {
        const reasons: string[] = [];
        if (net <= 0) reasons.push(t("microOffice.pitch.reasonNotProfitable"));
        if (trend < 0) reasons.push(t("microOffice.pitch.reasonTrendingDown"));
        if (s.creditScore < 600) reasons.push(t("microOffice.pitch.reasonLowCredit", { score: s.creditScore }));
        update((st) => ({ ...st, investorPassed: true, investorFunded: false, investorFeedback: t("microOffice.pitch.passedFeedback", { reasons: reasons.join("; ") }) }));
        toast.error(t("microOffice.pitch.passedToast"), { description: t("microOffice.pitch.passedToastDesc") });
      }
      setReviewing(false);
    }, 1200);
  };
  return (
    <Card variant="elevated">
      <CardContent className="pt-5 space-y-4">
        <Head icon={TrendingUp} title={t("microOffice.pitch.title")} sub={t("microOffice.pitch.subtitle")} />
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#0f2d1e,#06291f)" }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: "rgba(255,255,255,.08)" }}>🦈</div>
            <div><p className="font-bold text-white">{t("microOffice.pitch.angelInvestor")}</p><p className="text-white/50 text-xs">{t("microOffice.pitch.reviewing", { net: money(net), credit: s.creditScore, weeks: recent.length })} {trend >= 0 ? "↑" : "↓"}</p></div>
          </div>
          {(s.investorFunded || s.investorPassed) && (
            <p className="text-sm text-white/80 mt-3 italic">"{s.investorFeedback}"</p>
          )}
        </div>
        {s.investorFunded
          ? <Badge variant="success" className="gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> {t("microOffice.pitch.securedFunding")}</Badge>
          : <Button className="w-full press-scale" onClick={pitch} disabled={reviewing}>{reviewing ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1.5" />} {t("microOffice.pitch.pitchButton")}</Button>}
      </CardContent>
    </Card>
  );
}

/* ═══ FEATURE 7 - CUSTOMER COMPLAINT RESPONSES (rule-based: length + keywords) ═══ */
const COMPLAINT_COUNT = 5;
const COMPLAINT_KEYWORDS = ["sorry", "apologize", "refund", "fix", "help"];
function ComplaintPanel({ s, update, awardXP }: { s: BusinessGameState; update: Update; awardXP: (n: number, r: string) => void }) {
  const { t } = useTranslation();
  const alreadyThisWeek = s.complaints.some((c) => c.week === s.week);
  const complaint = useMemo(() => t(`microOffice.complaints.list.${(s.week * 7) % COMPLAINT_COUNT}`), [s.week, t]);
  const [resp, setResp] = useState("");
  const last = s.complaints[s.complaints.length - 1];
  if (alreadyThisWeek) {
    return (
      <Card variant="elevated"><CardContent className="pt-5">
        <Head icon={Star} title={t("microOffice.complaints.title")} sub={t("microOffice.complaints.subHandled")} />
        {last && <div className="rounded-xl bg-muted p-3 mt-2"><p className="text-xs text-muted-foreground">{t("microOffice.complaints.scored", { score: last.score })}</p><Stars value={s.starRating} /></div>}
      </CardContent></Card>
    );
  }
  const submit = () => {
    const text = resp.trim();
    if (text.length < 5) { toast.error(t("microOffice.complaints.writeFirst")); return; }
    const words = text.split(/\s+/).filter(Boolean).length;
    const lower = text.toLowerCase();
    const present = COMPLAINT_KEYWORDS.filter((k) => lower.includes(k));
    let score: number; let note: string;
    if (present.length === COMPLAINT_KEYWORDS.length && words > ws(50)) { score = 9; note = t("microOffice.complaints.noteThorough"); }
    else if (present.length > 0) { score = 7; note = t("microOffice.complaints.noteGood", { keywords: present.join(", ") }); }
    else if (words < ws(30)) { score = 3; note = t("microOffice.complaints.noteShort"); }
    else { score = 5; note = t("microOffice.complaints.noteEmpathy"); }
    update((st) => {
      const newStar = Math.max(1, Math.min(5, st.starRating * 0.7 + (score / 2) * 0.3));
      return { ...st, starRating: Math.round(newStar * 10) / 10, complaints: [...st.complaints, { week: st.week, complaint, response: text, score }] };
    });
    awardXP(5, "Handled a customer complaint");
    toast.success(t("microOffice.complaints.scoreToast", { score, note }));
    setResp("");
  };
  return (
    <Card variant="elevated"><CardContent className="pt-5 space-y-3">
      <Head icon={Star} title={t("microOffice.complaints.title")} sub={t("microOffice.complaints.subtitle")} />
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3"><p className="text-xs font-bold uppercase tracking-wider text-destructive mb-1">{t("microOffice.complaints.angryCustomer")}</p><p className="text-sm">"{complaint}"</p></div>
      <p className="text-xs text-muted-foreground">{t("microOffice.complaints.tip")}</p>
      <Textarea rows={3} placeholder={t("microOffice.complaints.placeholder")} value={resp} onChange={(e) => setResp(e.target.value)} />
      <Button className="w-full press-scale" onClick={submit}><ArrowRight className="w-4 h-4 mr-1.5" /> {t("microOffice.complaints.send")}</Button>
    </CardContent></Card>
  );
}

/* ═══ FEATURE 8 - SUPPLIER NEGOTIATION (3 rotating hardcoded personalities) ═══ */
interface Supplier { id: string; emoji: string; keywords?: string[]; discount: number }
const SUPPLIERS: Supplier[] = [
  { id: "firmFrank", emoji: "🧱", discount: 0 },
  { id: "flexibleMaria", emoji: "🤝", keywords: ["loyal", "loyalty", "volume", "bulk", "regular", "long-term", "long term"], discount: 0.10 },
  { id: "dealSeekerDave", emoji: "💸", keywords: ["competitor", "rival", "another supplier", "other supplier", "shop around", "elsewhere", "cheaper"], discount: 0.15 },
];
function SupplierNegotiation({ s, update, awardXP }: { s: BusinessGameState; update: Update; awardXP: (n: number, r: string) => void }) {
  const { t } = useTranslation();
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const increase = useMemo(() => 1.15 + ((s.week % 4) * 0.03), [s.week]);
  const supplier = SUPPLIERS[Math.floor(s.week / SUPPLIER_PERIOD) % SUPPLIERS.length];
  const supplierName = t(`microOffice.suppliers.${supplier.id}.name`);
  const negotiate = () => {
    const text = msg.trim();
    if (text.length < 15) { toast.error(t("microOffice.suppliers.makeCase")); return; }
    const lower = text.toLowerCase();
    const matched = (supplier.keywords || []).some((k) => lower.includes(k));
    const reduction = matched ? supplier.discount : 0;
    const newMult = Math.max(1, Math.round((increase - reduction) * 100) / 100);
    update((st) => ({ ...st, supplierCostMultiplier: newMult, lastSupplierWeek: st.week }));
    setReply(matched ? t(`microOffice.suppliers.${supplier.id}.win`) : t(`microOffice.suppliers.${supplier.id}.lose`));
    awardXP(6, "Negotiated with a supplier");
    if (matched) toast.success(t("microOffice.suppliers.dealToast", { mult: newMult.toFixed(2) }), { description: t("microOffice.suppliers.dealDesc", { name: supplierName, pct: Math.round(reduction * 100) }) });
    else toast(t("microOffice.suppliers.heldFirmToast", { name: supplierName }), { description: t("microOffice.suppliers.heldFirmDesc", { mult: newMult.toFixed(2) }) });
  };
  return (
    <Card variant="elevated"><CardContent className="pt-5 space-y-3">
      <Head icon={Handshake} title={t("microOffice.suppliers.title")} sub={t("microOffice.suppliers.subtitle", { emoji: supplier.emoji, name: supplierName, pct: Math.round((increase - 1) * 100) })} />
      {reply && <div className="rounded-xl bg-muted p-3"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{supplierName}</p><p className="text-sm italic">"{reply}"</p></div>}
      <Textarea rows={3} placeholder={t("microOffice.suppliers.placeholder")} value={msg} onChange={(e) => setMsg(e.target.value)} />
      <Button className="w-full press-scale" onClick={negotiate}><Handshake className="w-4 h-4 mr-1.5" /> {t("microOffice.suppliers.negotiate")}</Button>
    </CardContent></Card>
  );
}

/* ═══ FEATURE 9 - QUARTERLY TAX FORM (Schedule C simplified) ═══ */
// Businesses pay tax on profit - a real, recurring money sink every quarter.
const INCOME_TAX_RATE = 0.25;

function TaxForm({ s, update, spend, balance, taxDue }: { s: BusinessGameState; update: Update; spend: (n: number, r: string) => boolean; balance: number; taxDue: boolean }) {
  const { t } = useTranslation();
  const p = computePnL(s);
  const taxOwed = Math.max(0, Math.round(p.netProfit * INCOME_TAX_RATE));
  const lines = [
    { id: "rev", label: t("microOffice.taxes.lines.rev"), value: p.revenue },
    { id: "cogs", label: t("microOffice.taxes.lines.cogs"), value: p.cogs },
    { id: "gross", label: t("microOffice.taxes.lines.gross"), value: p.grossProfit },
    { id: "exp", label: t("microOffice.taxes.lines.exp"), value: p.totalOpex },
    { id: "net", label: t("microOffice.taxes.lines.net"), value: p.netProfit },
  ];
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const allConfirmed = lines.every((l) => checked[l.id]);
  if (!taxDue) {
    return <Card variant="elevated"><CardContent className="pt-6 text-center text-sm text-muted-foreground">{t("microOffice.taxes.noFiling", { week: (Math.floor(s.week / TAX_PERIOD) + 1) * TAX_PERIOD })}</CardContent></Card>;
  }
  const file = () => {
    // Incomplete filing: you still owe the tax, plus a penalty fee.
    if (!allConfirmed) {
      const penalty = 75;
      const bill = Math.min(taxOwed + penalty, balance);
      spend(bill, "Taxes + penalty (incomplete filing)");
      update((st) => ({ ...st, taxFiledWeeks: [...st.taxFiledWeeks, st.week], billsMissed: st.billsMissed + 1 }));
      toast.error(t("microOffice.taxes.incompleteToast", { bill }), { description: t("microOffice.taxes.incompleteDesc", { taxOwed, penalty }) });
      return;
    }
    update((st) => ({ ...st, taxFiledWeeks: [...st.taxFiledWeeks, st.week], billsOnTime: st.billsOnTime + 1 }));
    if (taxOwed > 0) {
      const paid = Math.min(taxOwed, balance);
      spend(paid, "Paid quarterly business taxes");
      toast.success(t("microOffice.taxes.filedPaidToast", { paid }), { description: t("microOffice.taxes.filedPaidDesc", { pct: Math.round(INCOME_TAX_RATE * 100) }) });
    } else {
      toast.success(t("microOffice.taxes.filedNoTaxToast"), { description: t("microOffice.taxes.filedNoTaxDesc") });
    }
  };
  return (
    <Card variant="elevated"><CardContent className="pt-5 space-y-3">
      <Head icon={FileText} title={t("microOffice.taxes.title")} sub={t("microOffice.taxes.subtitle")} />
      <div className="rounded-xl border border-border overflow-hidden">
        {lines.map((l, i) => (
          <button key={l.id} onClick={() => setChecked((c) => ({ ...c, [l.id]: !c[l.id] }))} className={cn("w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors", i % 2 && "bg-muted/40", checked[l.id] && "bg-success/5")}>
            <span className="flex items-center gap-2 text-sm">{checked[l.id] ? <CheckCircle2 className="w-4 h-4 text-success shrink-0" /> : <Circle className="w-4 h-4 text-muted-foreground shrink-0" />}{l.label}</span>
            <span className="font-mono font-bold tabular-nums text-sm">{money(l.value)}</span>
          </button>
        ))}
      </div>
      {/* Tax owed - the amount that will be deducted */}
      <div className="flex items-center justify-between rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2.5">
        <span className="text-sm font-semibold flex items-center gap-2 text-destructive">
          {t("microOffice.taxes.taxDueLabel", { pct: Math.round(INCOME_TAX_RATE * 100) })}
        </span>
        <span className="font-mono font-extrabold tabular-nums text-sm text-destructive">
          {taxOwed > 0 ? `- ${money(taxOwed)}` : money(0)}
        </span>
      </div>
      <Button className="w-full press-scale" onClick={file}><FileText className="w-4 h-4 mr-1.5" /> {allConfirmed ? (taxOwed > 0 ? t("microOffice.taxes.payAndFile", { amount: money(taxOwed) }) : t("microOffice.taxes.fileNoTax")) : t("microOffice.taxes.submitIncomplete")}</Button>
    </CardContent></Card>
  );
}

/* ═══ FEATURE 10 - JOB POSTING + 5 PRE-WRITTEN CANDIDATE PROFILES ═══ */
interface Candidate { id: string; name: string; quality: number }
const CANDIDATES: Candidate[] = [
  { id: "maya", name: "Maya Chen", quality: 9 },
  { id: "priya", name: "Priya Nair", quality: 8 },
  { id: "jordan", name: "Jordan Blake", quality: 7 },
  { id: "sam", name: "Sam Rivera", quality: 4 },
  { id: "tyler", name: "Tyler Hood", quality: 3 },
];
function HiringPanel({ s, update, awardXP }: { s: BusinessGameState; update: Update; awardXP: (n: number, r: string) => void }) {
  const { t } = useTranslation();
  const [step, setStep] = useState<"post" | "interview">("post");
  const [role, setRole] = useState(""); const [resp, setResp] = useState(""); const [skills, setSkills] = useState("");
  const [cand, setCand] = useState<Candidate | null>(null);
  const questions = t("microOffice.hiring.questions", { returnObjects: true }) as string[];

  const postJob = () => {
    if (!role.trim() || resp.trim().length < 10 || skills.trim().length < 5) { toast.error(t("microOffice.hiring.fillFields")); return; }
    setCand(CANDIDATES[Math.floor(Math.random() * CANDIDATES.length)]);
    setStep("interview");
    awardXP(4, "Posted a job and sourced a candidate");
  };
  const decide = (hire: boolean) => {
    if (!cand) return;
    if (!hire) { toast(t("microOffice.hiring.passedToast")); reset(); return; }
    const badHire = cand.quality < 5;
    const emp: Employee = { id: crypto.randomUUID(), name: cand.name, role: role.trim() || t("microOffice.hiring.teamMember"), weeklyWage: 90 + cand.quality * 8, hiredWeek: s.week, badHireUntilWeek: badHire ? s.week + 2 : undefined };
    update((st) => ({ ...st, employees: [...st.employees, emp] }));
    awardXP(6, "Hired an employee");
    if (badHire) toast.error(t("microOffice.hiring.badHireToast", { name: cand.name }), { description: t("microOffice.hiring.badHireDesc") });
    else toast.success(t("microOffice.hiring.goodHireToast", { name: cand.name }));
    reset();
  };
  const reset = () => { setStep("post"); setRole(""); setResp(""); setSkills(""); setCand(null); };

  return (
    <Card variant="elevated"><CardContent className="pt-5 space-y-3">
      <Head icon={UserPlus} title={t("microOffice.hiring.title")} sub={t("microOffice.hiring.subtitle")} />
      {step === "post" && (<>
        <Input placeholder={t("microOffice.hiring.rolePlaceholder")} value={role} onChange={(e) => setRole(e.target.value)} />
        <Textarea rows={2} placeholder={t("microOffice.hiring.responsibilitiesPlaceholder")} value={resp} onChange={(e) => setResp(e.target.value)} />
        <Input placeholder={t("microOffice.hiring.skillsPlaceholder")} value={skills} onChange={(e) => setSkills(e.target.value)} />
        <Button className="w-full press-scale" onClick={postJob}><Briefcase className="w-4 h-4 mr-1.5" /> {t("microOffice.hiring.postJob")}</Button>
      </>)}
      {step === "interview" && cand && (<>
        <div className="rounded-xl bg-muted p-3"><p className="font-bold">{cand.name}</p><p className="text-sm text-muted-foreground">{t(`microOffice.hiring.candidates.${cand.id}.background`)}</p></div>
        {questions.map((q, i) => (
          <div key={i} className="rounded-xl border border-border p-3"><p className="text-sm font-semibold">{t("microOffice.hiring.qPrefix")} {q}</p><p className="text-sm text-muted-foreground mt-1">{t("microOffice.hiring.aPrefix")} {t(`microOffice.hiring.candidates.${cand.id}.answers.${i}`)}</p></div>
        ))}
        <p className="text-xs text-muted-foreground italic">{t("microOffice.hiring.readCarefully")}</p>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 press-scale" onClick={() => decide(false)}>{t("microOffice.hiring.pass")}</Button>
          <Button className="flex-1 press-scale" onClick={() => decide(true)}><UserPlus className="w-4 h-4 mr-1.5" /> {t("microOffice.hiring.hire")}</Button>
        </div>
      </>)}
    </CardContent></Card>
  );
}

/* ═══ FEATURE 6 - BUSINESS PLAN (required before launch, rule-based validator) ═══ */
function BusinessPlanGate({ update, awardXP }: { update: Update; awardXP: (n: number, r: string) => void }) {
  const { t } = useTranslation();
  const [f, setF] = useState({ name: "", market: "", pricing: "", startup: "", goal: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));
  const submit = () => {
    const errs: string[] = [];
    if (f.name.trim().length < 3) errs.push(t("microOffice.plan.errors.name"));
    if (f.market.trim().length < 50) errs.push(t("microOffice.plan.errors.market", { count: f.market.trim().length }));
    if (f.pricing.trim().length < 50) errs.push(t("microOffice.plan.errors.pricing", { count: f.pricing.trim().length }));
    if (!/\d/.test(f.startup)) errs.push(t("microOffice.plan.errors.startup"));
    const goalNum = parseFloat(f.goal.replace(/[^0-9.]/g, ""));
    if (!(goalNum > 0)) errs.push(t("microOffice.plan.errors.goal"));
    setErrors(errs);
    if (errs.length) { toast.error(t("microOffice.plan.fixHighlighted"), { description: t("microOffice.plan.fixHighlightedDesc", { count: errs.length }) }); return; }
    const feedback = t("microOffice.plan.approvedFeedback");
    update((st) => ({ ...st, planScore: 7, planFeedback: feedback, planApproved: true }));
    awardXP(15, "Business plan approved");
    toast.success(t("microOffice.plan.approvedToast"), { description: feedback });
  };
  return (
    <Card variant="elevated">
      <CardContent className="pt-5 space-y-3">
        <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg,#0f2d1e,#06291f)" }}>
          <Building2 className="w-10 h-10 mx-auto mb-1" style={{ color: NEON }} />
          <p className="font-display text-xl font-extrabold text-white">{t("microOffice.plan.heading")}</p>
          <p className="text-white/55 text-sm mt-1">{t("microOffice.plan.subheading")}</p>
        </div>
        <div><label className="text-sm font-semibold">{t("microOffice.plan.businessName")}</label><Input value={f.name} onChange={set("name")} className="mt-1" /></div>
        <div><label className="text-sm font-semibold">{t("microOffice.plan.targetMarket")} <span className="text-muted-foreground font-normal">({f.market.trim().length}/50)</span></label><Textarea rows={2} value={f.market} onChange={set("market")} className="mt-1" placeholder={t("microOffice.plan.marketPlaceholder")} /></div>
        <div><label className="text-sm font-semibold">{t("microOffice.plan.pricingStrategy")} <span className="text-muted-foreground font-normal">({f.pricing.trim().length}/50)</span></label><Textarea rows={2} value={f.pricing} onChange={set("pricing")} className="mt-1" placeholder={t("microOffice.plan.pricingPlaceholder")} /></div>
        <div><label className="text-sm font-semibold">{t("microOffice.plan.startupCosts")}</label><Input value={f.startup} onChange={set("startup")} className="mt-1" placeholder={t("microOffice.plan.startupPlaceholder")} /></div>
        <div><label className="text-sm font-semibold">{t("microOffice.plan.revenueGoal")}</label><Input value={f.goal} onChange={set("goal")} className="mt-1" placeholder={t("microOffice.plan.goalPlaceholder")} /></div>
        {errors.length > 0 && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-3">
            <p className="text-sm font-bold text-destructive flex items-center gap-1.5 mb-1"><AlertTriangle className="w-4 h-4" /> {t("microOffice.plan.fixThese")}</p>
            <ul className="space-y-1">{errors.map((e, i) => <li key={i} className="text-xs text-foreground/80">• {e}</li>)}</ul>
          </div>
        )}
        <Button className="w-full press-scale" onClick={submit}><ClipboardList className="w-4 h-4 mr-1.5" /> {t("microOffice.plan.submit")}</Button>
      </CardContent>
    </Card>
  );
}
