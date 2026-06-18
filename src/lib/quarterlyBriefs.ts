// quarterlyBriefs — a rotating pool of operations activities. After the founding
// quarter (the bespoke Studio activities), each new business quarter serves a
// FRESH set of these so running the business never repeats the same worksheet.
// All rule-based, no AI. Effects move the living-business metrics (businessSim).
import {
  Boxes, LineChart, Sparkles, Recycle, Gauge, ClipboardCheck, Wrench, FlaskConical,
  Users, Handshake, Scale, Network, Building2, MessageSquareWarning, GitMerge, ShieldCheck,
  Megaphone, Mail, Video, Gift, Target, TrendingUp, Radio, Award,
  type LucideIcon,
} from "lucide-react";
import type { Delta } from "./businessSim";

export type BriefCategory = "product" | "collab" | "marketing";

export interface BriefField { key: string; label: string; min: number; rows?: number; placeholder?: string }
export interface BriefChoice { label: string; options: string[] }
export interface QuarterlyBrief {
  id: string;
  category: BriefCategory;
  icon: LucideIcon;
  title: string;
  scenario: string;               // "{biz}" is replaced with the business label
  xp: number;
  effect: Delta & { msg: string };
  choice?: BriefChoice;
  fields: BriefField[];
}

const XP = 150;

// ── PRODUCT operations (8) ──
const PRODUCT: QuarterlyBrief[] = [
  {
    id: "p_roadmap", category: "product", icon: ClipboardCheck, title: "Build next quarter's roadmap",
    scenario: "You can only ship a few things this quarter. Decide what your {biz} builds next and why.",
    xp: XP, effect: { customers: 160, brand: 5, msg: "Customers +160 · Brand +5" },
    fields: [
      { key: "top", label: "Your #1 priority and why it wins", min: 50, rows: 3 },
      { key: "cut", label: "What you're deliberately NOT doing", min: 40, rows: 3 },
    ],
  },
  {
    id: "p_costcut", category: "product", icon: Gauge, title: "Cost-down analysis",
    scenario: "Margins are tight. Find a way to make your product cheaper to produce without wrecking quality.",
    xp: XP, effect: { cash: 200, reputation: -2, msg: "Cash +200 · Reputation −2" },
    fields: [
      { key: "where", label: "Where the cost goes today (break it down)", min: 50, rows: 3 },
      { key: "plan", label: "Your cost-down plan and the trade-off", min: 50, rows: 3 },
    ],
  },
  {
    id: "p_upsell", category: "product", icon: Sparkles, title: "Design an add-on or upsell",
    scenario: "Your best customers want more. Design a premium add-on for {biz} that they'd happily pay extra for.",
    xp: XP, effect: { cash: 180, customers: 60, msg: "Cash +180 · Customers +60" },
    fields: [
      { key: "addon", label: "What the add-on is and its price", min: 45, rows: 3 },
      { key: "why", label: "Why customers would pay for it", min: 45, rows: 3 },
    ],
  },
  {
    id: "p_quality", category: "product", icon: ShieldCheck, title: "Quality-control checklist",
    scenario: "A few defects slipped out last quarter. Write the QC process that stops it happening again.",
    xp: XP, effect: { reputation: 9, brand: 3, msg: "Reputation +9 · Brand +3" },
    fields: [
      { key: "checks", label: "The checks you'll run before anything ships", min: 50, rows: 4 },
      { key: "fix", label: "What happens when something fails the check", min: 40, rows: 3 },
    ],
  },
  {
    id: "p_research", category: "product", icon: FlaskConical, title: "Run a customer research sprint",
    scenario: "You're guessing what customers want. Design a quick research plan to find out for real.",
    xp: XP, effect: { customers: 140, brand: 4, msg: "Customers +140 · Brand +4" },
    fields: [
      { key: "questions", label: "The 3 questions you most need answered", min: 40, rows: 3 },
      { key: "method", label: "How you'll get honest answers (and from whom)", min: 50, rows: 3 },
    ],
  },
  {
    id: "p_inventory", category: "product", icon: Boxes, title: "Inventory & supply plan",
    scenario: "Stockouts lose sales; overstock ties up cash. Plan how much to make or buy this quarter.",
    xp: XP, effect: { cash: 120, customers: 90, msg: "Cash +120 · Customers +90" },
    choice: { label: "Your stance", options: ["Lean (just-in-time)", "Buffer (safety stock)", "Pre-build for a rush"] },
    fields: [
      { key: "logic", label: "Justify your stance with the risk you're managing", min: 50, rows: 3 },
    ],
  },
  {
    id: "p_iterate", category: "product", icon: Wrench, title: "Fix your weakest product",
    scenario: "One product is dragging. Diagnose why and decide: iterate, reposition, or kill it.",
    xp: XP, effect: { brand: 6, cash: -60, customers: 80, msg: "Brand +6 · Customers +80 · Cash −60" },
    choice: { label: "Your call", options: ["Iterate & relaunch", "Reposition it", "Discontinue"] },
    fields: [
      { key: "diagnosis", label: "Why it's underperforming", min: 45, rows: 3 },
      { key: "action", label: "Exactly what you'll do", min: 45, rows: 3 },
    ],
  },
  {
    id: "p_sustain", category: "product", icon: Recycle, title: "Sustainability upgrade",
    scenario: "Customers increasingly care how things are made. Plan one real sustainability change for {biz}.",
    xp: XP, effect: { brand: 10, customers: 120, cash: -90, msg: "Brand +10 · Customers +120 · Cash −90" },
    fields: [
      { key: "change", label: "The change and what it costs you", min: 50, rows: 3 },
      { key: "story", label: "How you'll tell customers about it honestly", min: 45, rows: 3 },
    ],
  },
];

// ── COLLABORATION operations (8) ──
const COLLAB: QuarterlyBrief[] = [
  {
    id: "c_renew", category: "collab", icon: Handshake, title: "Renew (or end) a partnership",
    scenario: "A partner deal is up for renewal. Decide whether to renew, renegotiate, or walk — and why.",
    xp: XP, effect: { cash: 180, customers: 120, msg: "Cash +180 · Customers +120" },
    choice: { label: "Decision", options: ["Renew as-is", "Renegotiate terms", "Walk away"] },
    fields: [
      { key: "case", label: "The business case for your decision", min: 55, rows: 4 },
    ],
  },
  {
    id: "c_hire", category: "collab", icon: Users, title: "Write a job posting",
    scenario: "You're hiring your next team member. Write the role and what makes someone great at it.",
    xp: XP, effect: { customers: 200, cash: -150, msg: "Customers +200 · Cash −150" },
    fields: [
      { key: "role", label: "The role, responsibilities, and must-have skills", min: 60, rows: 4 },
      { key: "culture", label: "Why a great person would want to join you", min: 40, rows: 3 },
    ],
  },
  {
    id: "c_conflict", category: "collab", icon: MessageSquareWarning, title: "Resolve a team conflict",
    scenario: "Two people on your team clash and it's hurting the work. Write how you'd handle it.",
    xp: XP, effect: { reputation: 7, brand: 3, msg: "Reputation +7 · Brand +3" },
    fields: [
      { key: "approach", label: "How you'd get to the root of it", min: 50, rows: 3 },
      { key: "outcome", label: "The resolution you'd push for", min: 45, rows: 3 },
    ],
  },
  {
    id: "c_supplier", category: "collab", icon: Network, title: "Diversify your suppliers",
    scenario: "Relying on one supplier is risky. Plan how to add a backup without blowing up costs.",
    xp: XP, effect: { cash: -80, reputation: 5, customers: 60, msg: "Reputation +5 · Customers +60 · Cash −80" },
    fields: [
      { key: "risk", label: "The risk of your current setup", min: 40, rows: 3 },
      { key: "plan", label: "Your plan to add a second source", min: 50, rows: 3 },
    ],
  },
  {
    id: "c_contract", category: "collab", icon: Scale, title: "Negotiate a bigger contract",
    scenario: "A wholesale buyer wants a large recurring order — at a discount. Set your terms.",
    xp: XP, effect: { cash: 320, customers: 140, brand: 2, msg: "Cash +320 · Customers +140" },
    fields: [
      { key: "terms", label: "Your price, volume, and payment terms", min: 50, rows: 3 },
      { key: "protect", label: "How you protect your margin in the deal", min: 45, rows: 3 },
    ],
  },
  {
    id: "c_merge", category: "collab", icon: GitMerge, title: "Co-branded collaboration",
    scenario: "Another small business wants to do a joint product or event with {biz}. Design the collab.",
    xp: XP, effect: { customers: 280, brand: 7, msg: "Customers +280 · Brand +7" },
    fields: [
      { key: "concept", label: "The joint concept and who does what", min: 55, rows: 4 },
      { key: "split", label: "How you split cost, work, and revenue", min: 40, rows: 3 },
    ],
  },
  {
    id: "c_mentor", category: "collab", icon: Award, title: "Onboard a new hire",
    scenario: "Your new team member starts Monday. Plan their first two weeks so they ramp up fast.",
    xp: XP, effect: { customers: 160, reputation: 4, msg: "Customers +160 · Reputation +4" },
    fields: [
      { key: "week1", label: "What they learn and do in week 1", min: 45, rows: 3 },
      { key: "success", label: "How you'll know the onboarding worked", min: 40, rows: 3 },
    ],
  },
  {
    id: "c_community", category: "collab", icon: Building2, title: "Partner with the community",
    scenario: "A local school or charity wants to work with you. Plan a partnership that helps both sides.",
    xp: XP, effect: { brand: 9, reputation: 7, cash: -100, msg: "Brand +9 · Reputation +7 · Cash −100" },
    fields: [
      { key: "idea", label: "The partnership and what each side gives", min: 50, rows: 3 },
      { key: "measure", label: "How you'll show it made a difference", min: 40, rows: 3 },
    ],
  },
];

// ── MARKETING operations (8) ──
const MARKETING: QuarterlyBrief[] = [
  {
    id: "m_campaign", category: "marketing", icon: Megaphone, title: "Plan a seasonal campaign",
    scenario: "A big season is coming. Plan a campaign for {biz} with a clear message and offer.",
    xp: XP, effect: { customers: 340, cash: -120, brand: 4, msg: "Customers +340 · Brand +4 · Cash −120" },
    fields: [
      { key: "hook", label: "The hook / big idea of the campaign", min: 45, rows: 3 },
      { key: "offer", label: "The offer and how you'll measure success", min: 45, rows: 3 },
    ],
  },
  {
    id: "m_email", category: "marketing", icon: Mail, title: "Write a win-back email",
    scenario: "Customers who haven't bought in a while are slipping away. Write an email to bring them back.",
    xp: XP, effect: { customers: 180, reputation: 3, msg: "Customers +180 · Reputation +3" },
    fields: [
      { key: "subject", label: "Subject line + why it gets opened", min: 30, rows: 2 },
      { key: "body", label: "The email body (the offer and the ask)", min: 60, rows: 4 },
    ],
  },
  {
    id: "m_video", category: "marketing", icon: Video, title: "Script a short-form video",
    scenario: "Short video drives reach. Script a 30-second video that shows off {biz}.",
    xp: XP, effect: { customers: 300, brand: 8, msg: "Customers +300 · Brand +8" },
    fields: [
      { key: "hook3s", label: "The first 3 seconds (the scroll-stopper)", min: 25, rows: 2 },
      { key: "script", label: "The rest of the script + call to action", min: 55, rows: 4 },
    ],
  },
  {
    id: "m_referral", category: "marketing", icon: Gift, title: "Design a referral program",
    scenario: "Happy customers can bring friends. Design a referral offer that's worth sharing.",
    xp: XP, effect: { customers: 260, cash: -80, msg: "Customers +260 · Cash −80" },
    fields: [
      { key: "reward", label: "What both sides get, and why it's fair", min: 45, rows: 3 },
      { key: "spread", label: "How you make it easy to share", min: 40, rows: 3 },
    ],
  },
  {
    id: "m_position", category: "marketing", icon: Target, title: "Sharpen your positioning",
    scenario: "Customers don't quite 'get' what makes you different. Rewrite how you position {biz}.",
    xp: XP, effect: { brand: 12, customers: 80, msg: "Brand +12 · Customers +80" },
    fields: [
      { key: "statement", label: "Your positioning: for [who], we are [what], unlike [rival]", min: 40, rows: 3 },
      { key: "proof", label: "The proof that backs the claim", min: 45, rows: 3 },
    ],
  },
  {
    id: "m_pricing_promo", category: "marketing", icon: TrendingUp, title: "Run a smart promotion",
    scenario: "You want a sales bump without training customers to only buy on discount. Design the promo.",
    xp: XP, effect: { cash: 220, customers: 160, brand: -2, msg: "Cash +220 · Customers +160 · Brand −2" },
    choice: { label: "Promo type", options: ["Bundle", "Limited-time", "Buy-one-give-one", "Loyalty perk"] },
    fields: [
      { key: "why", label: "Why this promo protects your brand", min: 50, rows: 3 },
    ],
  },
  {
    id: "m_pr", category: "marketing", icon: Radio, title: "Pitch the press",
    scenario: "A story about {biz} could earn free coverage. Write the pitch a reporter would actually open.",
    xp: XP, effect: { brand: 9, customers: 200, msg: "Brand +9 · Customers +200" },
    fields: [
      { key: "angle", label: "The newsworthy angle (why now, why care)", min: 45, rows: 3 },
      { key: "pitch", label: "Your 5-sentence pitch to the journalist", min: 50, rows: 4 },
    ],
  },
  {
    id: "m_analytics", category: "marketing", icon: LineChart, title: "Read your marketing data",
    scenario: "Your last campaigns had mixed results. Decide where to put your next dollar based on the numbers.",
    xp: XP, effect: { cash: 140, customers: 120, msg: "Cash +140 · Customers +120" },
    fields: [
      { key: "winner", label: "Which channel is working and how you'd know", min: 45, rows: 3 },
      { key: "shift", label: "What you'll spend more / less on, and why", min: 45, rows: 3 },
    ],
  },
];

const BY_CAT: Record<BriefCategory, QuarterlyBrief[]> = { product: PRODUCT, collab: COLLAB, marketing: MARKETING };
export const BRIEFS_PER_CATEGORY = 3;

// Lookup by id — used by the teacher dashboard to label submitted brief work.
export const BRIEF_BY_ID: Record<string, QuarterlyBrief> = Object.fromEntries(
  [...PRODUCT, ...COLLAB, ...MARKETING].map((b) => [b.id, b]),
);

// Pick a fresh set for a category. `qi` is the 0-based quarter index; the founding
// quarter (qi 0) uses the bespoke activities, so briefs start at qi 1. Because the
// pool is 8 and we take 3 with a stride of 3, the set is distinct for 8 quarters
// before it cycles — that's two years of monthly play.
export function briefsForCategory(category: BriefCategory, qi: number): QuarterlyBrief[] {
  const pool = BY_CAT[category];
  const start = (Math.max(1, qi) - 1) * BRIEFS_PER_CATEGORY;
  return Array.from({ length: BRIEFS_PER_CATEGORY }, (_, i) => pool[(start + i) % pool.length]);
}

export function allBriefIdsForQuarter(qi: number): string[] {
  return (["product", "collab", "marketing"] as BriefCategory[]).flatMap((c) => briefsForCategory(c, qi).map((b) => b.id));
}
