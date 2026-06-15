// businessGameState — persistent state for the Micro-Business "Pro" features
// (P&L, payroll, investor pitch, credit score, weekly reports, business plan,
// complaints/star rating, supplier negotiation, quarterly taxes, hiring).
// Persists to Supabase (business_game_state) when signed in; localStorage otherwise.
import { supabase } from "@/integrations/supabase/client";

export interface Employee {
  id: string;
  name: string;
  role: string;
  weeklyWage: number;
  hiredWeek: number;
  badHireUntilWeek?: number; // productivity −20% through this week (inclusive)
}

export interface ComplaintRecord {
  week: number;
  complaint: string;
  response: string;
  score: number; // 1–10 (professionalism + empathy)
}

export interface WeekRecord {
  week: number;
  revenue: number;
  expenses: number;
  payroll: number;
  forecast: number;
  insight?: string; // AI weekly-report recommendation
}

export interface ExpenseCategories {
  payroll: number;
  marketing: number;
  supplies: number; // cost of goods proxy
  rent: number;
  other: number;
}

export interface BusinessGameState {
  version: number;
  week: number;
  // P&L (cumulative since last reset)
  revenue: number;
  cogs: number;
  expenses: ExpenseCategories;
  // credit & reputation
  creditScore: number;       // 300–850
  starRating: number;        // 1.0–5.0
  billsOnTime: number;
  billsMissed: number;
  // employees / payroll
  employees: Employee[];
  lastPayrollWeek: number;
  // business plan gate
  planApproved: boolean;
  planScore: number;
  planFeedback: string;
  // investor pitch
  investorFunded: boolean;
  investorPassed: boolean;
  investorFeedback: string;
  // history & supplier
  history: WeekRecord[];
  complaints: ComplaintRecord[];
  supplierCostMultiplier: number; // applied to supplies/COGS (1.0 = normal)
  lastSupplierWeek: number;
  // quarterly tax (Schedule C)
  taxFiledWeeks: number[];
  // weekly forecast set at the start of each week
  weekForecast: number;
  weekStartRevenue: number;
}

export const SUPPLIER_PERIOD = 3; // weeks between supplier price-increase events
export const TAX_PERIOD = 4;      // weeks between quarterly Schedule C filings
export const PITCH_UNLOCK_WEEK = 4;
export const PAYROLL_TAX_RATE = 0.153; // 15.3%

export function defaultState(): BusinessGameState {
  return {
    version: 1,
    week: 1,
    revenue: 0,
    cogs: 0,
    expenses: { payroll: 0, marketing: 0, supplies: 0, rent: 0, other: 0 },
    creditScore: 600,
    starRating: 4.0,
    billsOnTime: 0,
    billsMissed: 0,
    employees: [],
    lastPayrollWeek: 0,
    planApproved: false,
    planScore: 0,
    planFeedback: "",
    investorFunded: false,
    investorPassed: false,
    investorFeedback: "",
    history: [],
    complaints: [],
    supplierCostMultiplier: 1,
    lastSupplierWeek: 0,
    taxFiledWeeks: [],
    weekForecast: 0,
    weekStartRevenue: 0,
  };
}

const LS_KEY = "investiplay_business_game_state";

export async function loadGameState(): Promise<BusinessGameState> {
  try {
    const { data: au } = await supabase.auth.getUser();
    const uid = au?.user?.id;
    if (uid) {
      // `business_game_state` isn't in the generated types until the migration is
      // applied + types regenerated, so route through `any` for now.
      const { data } = await (supabase as any).from("business_game_state").select("state").eq("user_id", uid).maybeSingle();
      const remote = (data as any)?.state;
      if (remote && typeof remote === "object") return { ...defaultState(), ...remote };
    }
  } catch { /* fall back to local */ }
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return { ...defaultState(), ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return defaultState();
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;
export function saveGameState(state: BusinessGameState) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch { /* ignore */ }
  // Debounce the DB write so rapid updates don't spam Supabase.
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      const { data: au } = await supabase.auth.getUser();
      const uid = au?.user?.id;
      if (uid) {
        await (supabase as any).from("business_game_state").upsert(
          { user_id: uid, state: state as any, updated_at: new Date().toISOString() },
          { onConflict: "user_id" },
        );
      }
    } catch { /* best effort */ }
  }, 600);
}

// ── Derived P&L ──────────────────────────────────────────────────────
export interface PnL {
  revenue: number;
  cogs: number;
  grossProfit: number;
  opex: { label: string; key: keyof ExpenseCategories; amount: number }[];
  totalOpex: number;
  netProfit: number;
}
export function computePnL(s: BusinessGameState): PnL {
  const cogs = Math.round(s.cogs * s.supplierCostMultiplier);
  const grossProfit = s.revenue - cogs;
  const opex = [
    { label: "Payroll", key: "payroll" as const, amount: s.expenses.payroll },
    { label: "Marketing", key: "marketing" as const, amount: s.expenses.marketing },
    { label: "Supplies & misc", key: "supplies" as const, amount: s.expenses.supplies },
    { label: "Rent", key: "rent" as const, amount: s.expenses.rent },
    { label: "Other", key: "other" as const, amount: s.expenses.other },
  ];
  const totalOpex = opex.reduce((a, b) => a + b.amount, 0);
  return { revenue: s.revenue, cogs, grossProfit, opex, totalOpex, netProfit: grossProfit - totalOpex };
}

export function pnlToCSV(s: BusinessGameState): string {
  const p = computePnL(s);
  const rows: [string, number | string][] = [
    ["Profit & Loss Statement", `Week ${s.week}`],
    ["", ""],
    ["Revenue", p.revenue],
    ["Cost of Goods Sold", -p.cogs],
    ["Gross Profit", p.grossProfit],
    ["", ""],
    ["Operating Expenses", ""],
    ...p.opex.map((o) => [`  ${o.label}`, -o.amount] as [string, number]),
    ["Total Operating Expenses", -p.totalOpex],
    ["", ""],
    ["Net Profit", p.netProfit],
  ];
  return rows.map(([k, v]) => `"${k}",${typeof v === "number" ? v : `"${v}"`}`).join("\n");
}

// ── Business credit score (300–850), recomputed weekly ───────────────
export function computeCreditScore(s: BusinessGameState): number {
  const p = computePnL(s);
  let score = 550;
  // Payment history (on-time bill payments) — heaviest factor.
  const totalBills = s.billsOnTime + s.billsMissed;
  const onTimeRate = totalBills > 0 ? s.billsOnTime / totalBills : 1;
  score += Math.round((onTimeRate - 0.5) * 300); // up to ±150
  // Positive cash flow / profitability.
  if (p.netProfit > 0) score += Math.min(120, Math.round(p.netProfit / 8));
  else score += Math.max(-160, Math.round(p.netProfit / 5));
  // Debt ratio proxy: opex vs revenue.
  const ratio = p.revenue > 0 ? p.totalOpex / p.revenue : 1.5;
  if (ratio < 0.7) score += 40; else if (ratio > 1.1) score -= 50;
  // Longevity.
  score += Math.min(60, s.week * 4);
  return Math.max(300, Math.min(850, Math.round(score)));
}

export function creditTier(score: number): { label: string; color: string } {
  if (score >= 750) return { label: "Excellent", color: "#1D9E75" };
  if (score >= 670) return { label: "Good", color: "#22c55e" };
  if (score >= 580) return { label: "Fair", color: "#EF9F27" };
  return { label: "Poor", color: "#dc2626" };
}

// Weekly productivity factor from employees (bad hires drag it down).
export function productivityFactor(s: BusinessGameState): number {
  let factor = 1 + s.employees.length * 0.12; // each good hire boosts output
  for (const e of s.employees) {
    if (e.badHireUntilWeek && e.badHireUntilWeek >= s.week) factor -= 0.2;
  }
  return Math.max(0.4, factor);
}
