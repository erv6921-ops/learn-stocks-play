// businessEngine.ts - pure data + simulation for Micro-Business Mode.
// No React / JSX here so the economy is easy to reason about and test.
import {
  Package, Wrench, Monitor, Palette, Gamepad2, BookOpen, ShoppingBag,
  Users, Megaphone, Building2, Lightbulb, Wallet, Flame, AlertTriangle,
  Snowflake, type LucideIcon,
} from "lucide-react";

export const SEED_COST = 500;            // startup investment (InvestiCoins)
export const START_HEALTH = 70;          // business health meter (0-100)
export const OP_COOLDOWN_HOURS = 20;     // one operations run per ~day
export const BUSINESS_MONTH_DAYS = 5;    // 5 business days = one "month"
export const SEASON_LEN_DAYS = 14;       // class competition season length
export const SEASON_EPOCH = Date.UTC(2026, 0, 5); // stable Monday epoch
export const DAILY_SCALE = 0.22;         // a "day" is ~1/5 of a month

export type ModelKey = "product" | "service" | "digital";

export interface Mods { reach: number; quality: number; capacity: number; demand: number; opex: number }
export const ZERO_MODS: Mods = { reach: 0, quality: 0, capacity: 0, demand: 0, opex: 0 };

export interface ModelDef {
  label: string; icon: LucideIcon; desc: string;
  unitPrice: number; unitCost: number; fixed: number; demandBase: number; scale: number;
}
export const MODELS: Record<ModelKey, ModelDef> = {
  product: { label: "Product", icon: Package, desc: "Make & sell physical goods. Higher costs, healthy margins.", unitPrice: 28, unitCost: 13, fixed: 60, demandBase: 13, scale: 1.0 },
  service: { label: "Service", icon: Wrench, desc: "Sell your time & skill. Cheap to run, capped by your hours.", unitPrice: 46, unitCost: 9, fixed: 28, demandBase: 8, scale: 0.78 },
  digital: { label: "Digital", icon: Monitor, desc: "Build once, sell forever. High upfront, near-zero per sale.", unitPrice: 13, unitCost: 1, fixed: 95, demandBase: 26, scale: 1.65 },
};

export interface Idea { id: string; name: string; model: ModelKey; icon: LucideIcon; blurb: string; color: string }
export const IDEAS: Idea[] = [
  { id: "stickers", name: "Custom Sticker Shop", model: "product", icon: Palette, blurb: "Design & sell die-cut stickers", color: "#ec4899" },
  { id: "lawn", name: "Lawn Care Service", model: "service", icon: Wrench, blurb: "Mow, trim & tidy up yards", color: "#22c55e" },
  { id: "app", name: "Mobile Game / App", model: "digital", icon: Gamepad2, blurb: "Build a game people pay for", color: "#3b82f6" },
  { id: "jewelry", name: "Handmade Jewelry", model: "product", icon: Package, blurb: "Craft & sell accessories", color: "#eab308" },
  { id: "tutoring", name: "Tutoring Service", model: "service", icon: BookOpen, blurb: "Teach what you're great at", color: "#14b8a6" },
  { id: "merch", name: "Print-on-Demand Merch", model: "digital", icon: ShoppingBag, blurb: "Your designs on shirts & mugs", color: "#8b5cf6" },
];

export interface ResearchQ { id: string; q: string; options: { label: string; pts: number }[] }
export const RESEARCH: ResearchQ[] = [
  { id: "customer", q: "Who is your target customer?", options: [
    { label: "A specific, well-defined group", pts: 25 },
    { label: "A broad, general audience", pts: 11 },
    { label: "Not sure yet", pts: 0 } ] },
  { id: "problem", q: "What problem do you solve?", options: [
    { label: "A clear, painful problem", pts: 25 },
    { label: "A nice-to-have", pts: 12 },
    { label: "It's mostly for fun", pts: 5 } ] },
  { id: "competition", q: "How much competition is there?", options: [
    { label: "A few rivals - demand is proven", pts: 25 },
    { label: "None I can find", pts: 8 },
    { label: "Tons - it's crowded", pts: 4 } ] },
  { id: "reach", q: "How will customers find you?", options: [
    { label: "A specific channel I can name", pts: 25 },
    { label: "Word of mouth", pts: 14 },
    { label: "Not sure", pts: 0 } ] },
];

export const PROOFS = [
  { id: "target", label: "Describe your target customer", placeholder: "e.g. Middle-schoolers who love anime and decorate their laptops…" },
  { id: "competitors", label: "Identify 3 competitors", placeholder: "1) … 2) … 3) … - and how you'll be different" },
  { id: "valueProp", label: "Write your value proposition", placeholder: "We help ___ do ___ with ___, unlike ___ because ___" },
] as const;
export const MIN_PROOF = 15;

export interface Tier { key: "hot" | "risky" | "saturated"; label: string; emoji: string; mult: number; icon: LucideIcon; color: string; note: string }
export function viabilityTier(score: number): Tier {
  if (score >= 72) return { key: "hot", label: "Hot Market", emoji: "🔥", mult: 1.4, icon: Flame, color: "#EF9F27", note: "Strong demand - you'll launch with real traction." };
  if (score >= 44) return { key: "risky", label: "Risky", emoji: "⚠️", mult: 1.0, icon: AlertTriangle, color: "#f59e0b", note: "It could work, but the market is unproven. Execute well." };
  return { key: "saturated", label: "Saturated", emoji: "❄️", mult: 0.65, icon: Snowflake, color: "#60a5fa", note: "Crowded or unclear - every coin will have to work harder." };
}

export interface MarketEvent { type: "good" | "bad" | "neutral"; emoji: string; title: string; desc: string; mult: number; opex?: number }
export const EVENTS: MarketEvent[] = [
  { type: "good", emoji: "📰", title: "Local news featured you!", desc: "A reporter covered your shop - customers poured in.", mult: 1.35 },
  { type: "good", emoji: "🎵", title: "Viral TikTok mention!", desc: "A creator showed off your product. Sales spiked.", mult: 1.6 },
  { type: "good", emoji: "⭐", title: "Glowing word of mouth", desc: "Happy customers told their friends.", mult: 1.3 },
  { type: "good", emoji: "🎁", title: "Seasonal rush", desc: "A holiday lifted demand across the board.", mult: 1.25 },
  { type: "good", emoji: "🔁", title: "Repeat customers", desc: "Loyal buyers came back for more.", mult: 1.2 },
  { type: "bad", emoji: "🔻", title: "Competitor undercut you", desc: "A rival slashed prices - you lost some customers.", mult: 0.8 },
  { type: "bad", emoji: "📦", title: "Supplier costs jumped", desc: "Materials got more expensive today.", mult: 0.97, opex: 18 },
  { type: "bad", emoji: "😬", title: "A bad review spread", desc: "One angry customer scared others away.", mult: 0.82 },
  { type: "bad", emoji: "📉", title: "Economy slowed down", desc: "People tightened their budgets.", mult: 0.8 },
  { type: "bad", emoji: "🔧", title: "Equipment broke", desc: "Something broke and needed a repair.", mult: 0.95, opex: 22 },
  { type: "neutral", emoji: "🌙", title: "Quiet day", desc: "No big swings - steady as she goes.", mult: 1.0 },
];
export const pickEvent = () => EVENTS[Math.floor(Math.random() * EVENTS.length)];

// Permanent investments that adjust the business permanently (cost InvestiCoins).
export interface Upgrade { id: string; icon: LucideIcon; title: string; cost: number; blurb: string; apply: (m: Mods) => Mods; health?: number; repeatable?: boolean }
export const UPGRADES: Upgrade[] = [
  { id: "hire", icon: Users, title: "Hire an employee", cost: 120, blurb: "More capacity to meet demand (+overhead).", apply: m => ({ ...m, capacity: m.capacity + 0.2, opex: m.opex + 16 }), health: 3, repeatable: true },
  { id: "product", icon: Lightbulb, title: "Invest in product quality", cost: 90, blurb: "Charge more & keep customers loyal.", apply: m => ({ ...m, quality: m.quality + 0.16 }), health: 6, repeatable: true },
  { id: "expand", icon: Building2, title: "Expand to a new location", cost: 220, blurb: "Bigger reach - but a bigger overhead bill.", apply: m => ({ ...m, demand: m.demand + 0.4, opex: m.opex + 40 }), health: -2, repeatable: true },
  { id: "automate", icon: Monitor, title: "Automate operations", cost: 160, blurb: "Lower ongoing costs for good.", apply: m => ({ ...m, opex: Math.max(-60, m.opex - 22) }), health: 2 },
];

// One-shot marketing campaigns - a gamble (can flop).
export interface Campaign { id: string; name: string; cost: number; payoff: number; successRate: number; desc: string }
export const CAMPAIGNS: Campaign[] = [
  { id: "social", name: "Social media blitz", cost: 50, payoff: 110, successRate: 0.75, desc: "Post everywhere to pull in attention." },
  { id: "flash", name: "Flash sale", cost: 25, payoff: 75, successRate: 0.6, desc: "Quick revenue spike - high risk, high reward." },
  { id: "referral", name: "Referral program", cost: 75, payoff: 160, successRate: 0.7, desc: "Reward customers who bring friends." },
  { id: "feature", name: "Premium ad placement", cost: 150, payoff: 300, successRate: 0.65, desc: "Featured spot in the marketplace." },
];

export interface MonthResult { units: number; price: number; revenue: number; cogs: number; fixed: number; expenses: number; net: number }

export const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
export const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

// One operations cycle (a "day"). discount reduces cost of goods (B2B supply deals).
export function simulateDay(
  model: ModelKey, alloc: { marketing: number; product: number; operations: number },
  mods: Mods, viaMult: number, eventMult: number, health: number, discount = 0,
): MonthResult {
  const M = MODELS[model];
  const reach = clamp01(alloc.marketing / 100 + mods.reach);
  const quality = clamp01(alloc.product / 100 + mods.quality);
  const capacity = clamp01(alloc.operations / 100 + mods.capacity);
  const healthF = 0.7 + (health / 100) * 0.45;
  let demand = M.demandBase * DAILY_SCALE * (0.45 + reach * 1.7) * viaMult * M.scale * healthF * (1 + mods.demand);
  demand *= eventMult;
  const maxUnits = M.demandBase * DAILY_SCALE * (0.6 + capacity * 1.9) * M.scale;
  const units = Math.max(0, Math.round(Math.min(demand, maxUnits)));
  const price = M.unitPrice * (0.82 + quality * 0.5);
  const revenue = Math.round(units * price);
  const cogs = Math.round(units * M.unitCost * (1 - clamp01(discount)));
  const fixed = Math.max(0, Math.round((M.fixed + mods.opex) * DAILY_SCALE));
  const expenses = cogs + fixed;
  return { units, price: Math.round(price), revenue, cogs, fixed, expenses, net: revenue - expenses };
}

// ── Seasons ──────────────────────────────────────────────────────────
export interface SeasonInfo { number: number; daysLeft: number; endsAt: Date }
export function currentSeason(now = Date.now()): SeasonInfo {
  const elapsedDays = Math.floor((now - SEASON_EPOCH) / 86400000);
  const number = Math.floor(elapsedDays / SEASON_LEN_DAYS) + 1;
  const dayInSeason = ((elapsedDays % SEASON_LEN_DAYS) + SEASON_LEN_DAYS) % SEASON_LEN_DAYS;
  const daysLeft = SEASON_LEN_DAYS - dayInSeason;
  const endsAt = new Date(now + daysLeft * 86400000);
  return { number, daysLeft, endsAt };
}

// ── B2B supply deals encoded in the marketplace `description` (no new table) ──
export const SUPPLY_RE = /^SUPPLY\|disc=(\d+)\|days=(\d+)\|([\s\S]*)$/;
export function encodeSupply(discPct: number, days: number, note: string): string {
  return `SUPPLY|disc=${discPct}|days=${days}|${note}`;
}
export function parseSupply(desc?: string | null): { disc: number; days: number; note: string } | null {
  if (!desc) return null;
  const m = SUPPLY_RE.exec(desc);
  if (!m) return null;
  return { disc: Math.min(40, Number(m[1])), days: Math.max(1, Number(m[2])), note: m[3] || "" };
}

// ── Persisted per-business sim state (localStorage; DB holds the finances) ──
export interface ActiveDeal { title: string; disc: number; expiresDay: number }
export interface SimState {
  bizId: string;
  name: string;
  model: ModelKey;
  alloc: { marketing: number; product: number; operations: number };
  viaMult: number;
  tierKey: Tier["key"];
  mods: Mods;
  health: number;
  day: number;
  lastOp: string | null;
  deals: ActiveDeal[];
  totalRevenue: number;
  totalExpenses: number;
  monthBaseRev: number;
  monthBaseExp: number;
  startedAt: number;
}

export const SIM_KEY = "investiplay_mb_sim";
export function loadSim(): SimState | null {
  try { const v = localStorage.getItem(SIM_KEY); return v ? (JSON.parse(v) as SimState) : null; } catch { return null; }
}
export function saveSim(s: SimState) { try { localStorage.setItem(SIM_KEY, JSON.stringify(s)); } catch { /* ignore */ } }
export function clearSim() { try { localStorage.removeItem(SIM_KEY); } catch { /* ignore */ } }

export function activeDiscount(deals: ActiveDeal[], day: number): number {
  const total = deals.filter(d => d.expiresDay > day).reduce((s, d) => s + d.disc / 100, 0);
  return clamp01(total);
}
