// businessSim — the "living business" layer that keeps the Micro-Business alive
// over months. Activities have consequences (applyEffect), students build a
// product line, and each month a state-driven SITUATION forces a fresh written
// reaction with real outcomes. All rule-based, no AI.

export interface BizProduct { id: string; name: string; price: number; pitch: string; month: number }
export interface BizState {
  month: number;
  reputation: number;   // 0–100
  customers: number;
  brand: number;        // 0–100
  cash: number;
  products: BizProduct[];
  log: { month: number; text: string }[];
  pending: Situation | null;   // this month's situation, awaiting a reaction
  lastType: string | null;
  status: "active" | "thriving" | "struggling" | "failed";
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export function defaultBizState(): BizState {
  return { month: 1, reputation: 55, customers: 120, brand: 40, cash: 500, products: [], log: [], pending: null, lastType: null, status: "active" };
}

interface Delta { reputation?: number; customers?: number; brand?: number; cash?: number }
export interface SitOption { label: string; delta: Delta; outcome: string }
export interface Situation {
  type: string; emoji: string; title: string; prompt: string;
  reactLabel: string; reactMin: number; options: SitOption[];
}
interface SitTemplate extends Situation { when?: (s: BizState) => boolean }

// Each situation demands a DIFFERENT kind of reaction (plan, pitch, counter,
// apology, decision-memo…), so it never feels like the same worksheet.
const SITUATIONS: SitTemplate[] = [
  {
    type: "crisis", emoji: "🔥", title: "Supplier costs spiked overnight",
    prompt: "Your main supplier just raised prices 30% with no warning. It eats your margin this month.",
    reactLabel: "Write your crisis plan — what you'll do and why (40+ words)", reactMin: 40,
    options: [
      { label: "Absorb the cost for now", delta: { cash: -250, reputation: 4 }, outcome: "Customers stay happy, but cash takes a hit." },
      { label: "Raise your prices to cover it", delta: { cash: 80, customers: -90, reputation: -4 }, outcome: "Margin protected, but some customers leave." },
      { label: "Switch suppliers fast", delta: { cash: -120, brand: -3 }, outcome: "Bumpy transition, but costs stabilize." },
    ],
  },
  {
    type: "opportunity", emoji: "📰", title: "A local blog wants to feature you",
    prompt: "A popular blog offered a feature if you can give them a compelling angle this week.",
    reactLabel: "Pitch your angle for the feature (40+ words)", reactMin: 40,
    options: [
      { label: "Go all-in with a launch promo", delta: { customers: 400, cash: -180, brand: 6 }, outcome: "Big spike in traffic and new customers." },
      { label: "Soft feature, no promo", delta: { customers: 150, brand: 4 }, outcome: "Steady bump, low cost." },
      { label: "Pass — too busy", delta: { brand: -2 }, outcome: "Missed the moment." },
    ],
    when: (s) => s.brand >= 35,
  },
  {
    type: "customer", emoji: "🙋", title: "A big customer wants a custom version",
    prompt: "A bulk buyer wants a customized version of your product. It's extra work but a large order.",
    reactLabel: "Write your reply to the customer (40+ words)", reactMin: 40,
    options: [
      { label: "Build the custom order", delta: { cash: 320, customers: 40, brand: 5 }, outcome: "Profitable and builds reputation for flexibility." },
      { label: "Offer them the standard product", delta: { cash: 90 }, outcome: "Smaller sale, no extra work." },
      { label: "Decline — not worth it", delta: { reputation: -5 }, outcome: "They felt brushed off." },
    ],
  },
  {
    type: "competitor", emoji: "⚔️", title: "A competitor undercut your price",
    prompt: "A rival just dropped their price 20% below yours and is poaching your customers.",
    reactLabel: "Write your counter-strategy (50+ words)", reactMin: 50,
    options: [
      { label: "Match their price", delta: { customers: 180, cash: -150 }, outcome: "You keep customers but margins shrink." },
      { label: "Hold price, push quality", delta: { customers: -120, brand: 8, reputation: 4 }, outcome: "Lose some price-shoppers, win loyalty." },
      { label: "Add value at the same price", delta: { customers: 120, cash: -90, brand: 5 }, outcome: "A bundle keeps you competitive." },
    ],
  },
  {
    type: "reputation", emoji: "😬", title: "A complaint went public",
    prompt: "An unhappy customer posted a scathing review that's getting traction online.",
    reactLabel: "Write your public response (50+ words)", reactMin: 50,
    options: [
      { label: "Public apology + a real fix", delta: { reputation: 10, cash: -120 }, outcome: "Handled well — trust recovers." },
      { label: "Offer refunds quietly", delta: { reputation: 4, cash: -200 }, outcome: "Costly but contains it." },
      { label: "Ignore it", delta: { reputation: -14, customers: -150 }, outcome: "It snowballed. Bad look." },
    ],
    when: (s) => s.reputation < 65,
  },
  {
    type: "finance", emoji: "💸", title: "Cash is getting tight",
    prompt: "Your runway is thin. You need to free up cash this month or risk falling behind on bills.",
    reactLabel: "Write your cash-management plan (40+ words)", reactMin: 40,
    options: [
      { label: "Cut marketing spend", delta: { cash: 250, customers: -120 }, outcome: "Cash up, but growth slows." },
      { label: "Run a flash sale", delta: { cash: 300, brand: -4 }, outcome: "Quick cash, slight brand hit." },
      { label: "Take a small loan", delta: { cash: 400, reputation: -2 }, outcome: "Breathing room — but you owe it back." },
    ],
    when: (s) => s.cash < 400,
  },
  {
    type: "team", emoji: "🧑‍💼", title: "You're overwhelmed — hire?",
    prompt: "Demand is outpacing what you can deliver alone. Quality is starting to slip.",
    reactLabel: "Decision memo: what you'll do and why (40+ words)", reactMin: 40,
    options: [
      { label: "Hire help", delta: { cash: -260, customers: 220, brand: 4 }, outcome: "More capacity, more sales." },
      { label: "Outsource the overflow", delta: { cash: -140, customers: 90 }, outcome: "Flexible, lower commitment." },
      { label: "Push through solo", delta: { reputation: -6, brand: -3 }, outcome: "You burn out and quality dips." },
    ],
    when: (s) => s.customers > 700,
  },
  {
    type: "product", emoji: "📉", title: "A product is underperforming",
    prompt: "One of your products isn't selling. It's tying up cash and attention.",
    reactLabel: "Write your call on this product (40+ words)", reactMin: 40,
    options: [
      { label: "Iterate and relaunch", delta: { cash: -160, brand: 6, customers: 80 }, outcome: "A refresh wins people back." },
      { label: "Discontinue it", delta: { cash: 60, brand: 2 }, outcome: "Focus sharpens; small savings." },
      { label: "Discount to clear stock", delta: { cash: 140, brand: -4 }, outcome: "Cash now, brand dinged." },
    ],
    when: (s) => s.products.length >= 2,
  },
  {
    type: "growth", emoji: "🚀", title: "Chance to expand",
    prompt: "You could open a second sales channel (a new market, storefront, or platform).",
    reactLabel: "Write your expansion plan and the risk (50+ words)", reactMin: 50,
    options: [
      { label: "Expand aggressively", delta: { cash: -350, customers: 500, brand: 6 }, outcome: "High risk, high reward — big reach." },
      { label: "Test it small first", delta: { cash: -120, customers: 160 }, outcome: "Measured growth, lower risk." },
      { label: "Hold and consolidate", delta: { reputation: 3, cash: 60 }, outcome: "Play it safe this month." },
    ],
    when: (s) => s.customers > 900 && s.cash > 300,
  },
];

export function pickSituation(s: BizState): Situation {
  const eligible = SITUATIONS.filter((t) => (!t.when || t.when(s)) && t.type !== s.lastType);
  const pool = eligible.length ? eligible : SITUATIONS.filter((t) => t.type !== s.lastType);
  const t = pool[Math.floor(Math.random() * pool.length)];
  const { when, ...sit } = t;
  void when;
  return sit;
}

export function avgPrice(s: BizState) {
  return s.products.length ? s.products.reduce((a, p) => a + p.price, 0) / s.products.length : 15;
}
export function monthlyRevenue(s: BizState) {
  return Math.round(s.customers * avgPrice(s) * 0.18 * (0.6 + (s.brand / 100) * 0.6));
}

export function resolveSituation(s: BizState, optIndex: number, reactionWords: number): { next: BizState; revenue: number } {
  const sit = s.pending;
  if (!sit) return { next: s, revenue: 0 };
  const opt = sit.options[optIndex];
  const eng = clamp(reactionWords / sit.reactMin, 1, 1.6); // thoughtful reactions amplify gains, soften losses
  const d = opt.delta;
  const repDelta = (d.reputation || 0) >= 0 ? (d.reputation || 0) * eng : (d.reputation || 0);
  const custDelta = (d.customers || 0) >= 0 ? (d.customers || 0) * eng : (d.customers || 0);
  const reputation = clamp(Math.round(s.reputation + repDelta), 0, 100);
  const brand = clamp(s.brand + (d.brand || 0), 0, 100);
  let customers = Math.max(0, Math.round(s.customers + custDelta));
  const revenue = monthlyRevenue({ ...s, reputation, brand, customers });
  const fixed = 150 + s.products.length * 20;
  const cash = Math.round(s.cash + (d.cash || 0) + revenue - fixed);
  customers = Math.max(0, Math.round(customers * (0.96 + (reputation / 100) * 0.09))); // reputation retains customers
  const log = [...s.log, { month: s.month, text: `${sit.emoji} ${opt.label} — ${opt.outcome} (rev +${revenue}, cash ${cash})` }].slice(-30);
  let status: BizState["status"] = "active";
  if (reputation <= 0 || customers <= 0 || cash < -700) status = "failed";
  else if (reputation >= 75 && customers >= 1200 && cash > 1500) status = "thriving";
  else if (reputation < 30 || cash < 0) status = "struggling";
  return { next: { ...s, month: s.month + 1, reputation, brand, customers, cash, log, pending: null, lastType: sit.type, status }, revenue };
}

export function addProduct(s: BizState, p: { name: string; price: number; pitch: string }): BizState {
  const prod: BizProduct = { id: crypto.randomUUID(), name: p.name, price: p.price, pitch: p.pitch, month: s.month };
  return {
    ...s, products: [...s.products, prod],
    customers: s.customers + 60, brand: clamp(s.brand + 5, 0, 100),
    log: [...s.log, { month: s.month, text: `🆕 Launched "${p.name}" at ${p.price} IC` }].slice(-30),
  };
}

// Activities have consequences: completing one moves the business metrics.
export const ACTIVITY_EFFECTS: Record<string, Delta & { msg: string }> = {
  productDoc: { brand: 12, customers: 80, msg: "Brand +12 · Customers +80" },
  pricing: { cash: 120, reputation: 2, msg: "Cash +120 · Reputation +2" },
  feedback: { reputation: 8, brand: 3, msg: "Reputation +8 · Brand +3" },
  partner: { customers: 250, cash: 200, msg: "Customers +250 · Cash +200" },
  partnerProblem: { reputation: 6, brand: 4, msg: "Reputation +6 · Brand +4" },
  vendor: { cash: 150, msg: "Lower costs · Cash +150" },
  brand: { brand: 20, reputation: 5, msg: "Brand +20 · Reputation +5" },
  marketingPlan: { customers: 350, cash: -100, msg: "Customers +350 · Cash −100" },
  adCampaign: { customers: 180, reputation: 5, msg: "Customers +180 · Reputation +5" },
};
export function applyEffect(s: BizState, id: string): BizState {
  const e = ACTIVITY_EFFECTS[id];
  if (!e) return s;
  return {
    ...s,
    reputation: clamp(s.reputation + (e.reputation || 0), 0, 100),
    brand: clamp(s.brand + (e.brand || 0), 0, 100),
    customers: Math.max(0, s.customers + (e.customers || 0)),
    cash: s.cash + (e.cash || 0),
    log: [...s.log, { month: s.month, text: `✅ Activity complete → ${e.msg}` }].slice(-30),
  };
}

export function statusLabel(s: BizState): { label: string; color: string } {
  switch (s.status) {
    case "thriving": return { label: "Thriving", color: "#1D9E75" };
    case "struggling": return { label: "Struggling", color: "#EF9F27" };
    case "failed": return { label: "Failed", color: "#dc2626" };
    default: return { label: "Active", color: "#00ff88" };
  }
}
