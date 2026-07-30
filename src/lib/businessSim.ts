// businessSim - the "living business" layer that keeps the Micro-Business alive
// over months. Activities have consequences (applyEffect), students build a
// product line, and each month a state-driven SITUATION forces a fresh written
// reaction with real outcomes. All rule-based, no AI.

export interface BizProduct { id: string; name: string; price: number; pitch: string; month: number }
export interface BizState {
  month: number;
  reputation: number;   // 0-100
  customers: number;
  brand: number;        // 0-100
  cash: number;
  products: BizProduct[];
  log: { month: number; text: string }[];
  pending: Situation | null;   // this month's situation, awaiting a reaction
  lastType: string | null;
  status: "active" | "thriving" | "struggling" | "failed";
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

// A business "quarter" is QUARTER_MONTHS monthly cycles. Operations activities
// refresh each quarter so running the business is an ongoing job, not a one-time
// checklist. quarterOf(1..3) === 0, quarterOf(4..6) === 1, …
export const QUARTER_MONTHS = 3;
export const quarterOf = (month: number) => Math.floor((Math.max(1, month) - 1) / QUARTER_MONTHS);

export function defaultBizState(): BizState {
  return { month: 1, reputation: 55, customers: 120, brand: 40, cash: 500, products: [], log: [], pending: null, lastType: null, status: "active" };
}

export interface Delta { reputation?: number; customers?: number; brand?: number; cash?: number }
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
    reactLabel: "Write your crisis plan - what you'll do and why (40+ words)", reactMin: 40,
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
      { label: "Pass - too busy", delta: { brand: -2 }, outcome: "Missed the moment." },
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
      { label: "Decline - not worth it", delta: { reputation: -5 }, outcome: "They felt brushed off." },
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
      { label: "Public apology + a real fix", delta: { reputation: 10, cash: -120 }, outcome: "Handled well - trust recovers." },
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
      { label: "Take a small loan", delta: { cash: 400, reputation: -2 }, outcome: "Breathing room - but you owe it back." },
    ],
    when: (s) => s.cash < 400,
  },
  {
    type: "team", emoji: "🧑‍💼", title: "You're overwhelmed - hire?",
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
      { label: "Expand aggressively", delta: { cash: -350, customers: 500, brand: 6 }, outcome: "High risk, high reward - big reach." },
      { label: "Test it small first", delta: { cash: -120, customers: 160 }, outcome: "Measured growth, lower risk." },
      { label: "Hold and consolidate", delta: { reputation: 3, cash: 60 }, outcome: "Play it safe this month." },
    ],
    when: (s) => s.customers > 900 && s.cash > 300,
  },
  {
    type: "marketing", emoji: "📣", title: "Your ad budget is up for grabs",
    prompt: "You have some cash to put behind marketing this month. Where it goes shapes who shows up.",
    reactLabel: "Write the campaign brief - audience, message, channel (40+ words)", reactMin: 40,
    options: [
      { label: "Pour it into paid social ads", delta: { cash: -200, customers: 320, brand: 3 }, outcome: "A flood of new visitors - pricey but effective." },
      { label: "Build slow with content + SEO", delta: { cash: -60, customers: 120, brand: 7 }, outcome: "Cheaper, slower, and it compounds." },
      { label: "Sponsor a local creator", delta: { cash: -150, customers: 240, brand: 6 }, outcome: "Trusted reach to a real audience." },
    ],
  },
  {
    type: "hiring", emoji: "🧑‍🔧", title: "A star applicant just walked in",
    prompt: "Someone talented wants to join - but they want above-market pay. Hiring them stretches the budget.",
    reactLabel: "Decision memo: do you hire, and on what terms? (45+ words)", reactMin: 45,
    options: [
      { label: "Hire at full pay", delta: { cash: -300, customers: 260, brand: 5 }, outcome: "Capacity and quality jump - at a cost." },
      { label: "Offer less + profit share", delta: { cash: -120, customers: 150, reputation: 3 }, outcome: "They buy in for upside." },
      { label: "Pass for now", delta: { brand: -2 }, outcome: "You stay lean, but you'll feel the gap." },
    ],
    when: (s) => s.customers > 500,
  },
  {
    type: "legal", emoji: "⚖️", title: "A cease-and-desist letter arrives",
    prompt: "A bigger company says your name is too close to theirs and threatens to sue.",
    reactLabel: "Write your response and your plan (50+ words)", reactMin: 50,
    options: [
      { label: "Rebrand to be safe", delta: { cash: -220, customers: -120, brand: -4 }, outcome: "Painful reset, but no legal risk." },
      { label: "Lawyer up and fight it", delta: { cash: -300, reputation: 4 }, outcome: "Expensive, but you stand your ground." },
      { label: "Negotiate a small tweak", delta: { cash: -90, brand: -1 }, outcome: "A minor change settles it quietly." },
    ],
  },
  {
    type: "inventory", emoji: "📦", title: "You misjudged demand",
    prompt: "You're sitting on stock that isn't moving - and it's tying up your cash.",
    reactLabel: "Write your plan to free up the cash (40+ words)", reactMin: 40,
    options: [
      { label: "Run a clearance sale", delta: { cash: 240, brand: -4, customers: 120 }, outcome: "Cash back, but you trained buyers to wait for deals." },
      { label: "Bundle it with bestsellers", delta: { cash: 120, customers: 80 }, outcome: "Moves slowly without cheapening the brand." },
      { label: "Donate it for goodwill", delta: { cash: -40, brand: 6, reputation: 6 }, outcome: "No cash, but real community love." },
    ],
    when: (s) => s.cash < 600,
  },
  {
    type: "seasonal", emoji: "🎄", title: "The holiday rush is coming",
    prompt: "Your busiest season is weeks away. Prepare well and it's your biggest month - or scramble and miss it.",
    reactLabel: "Write your seasonal game plan (45+ words)", reactMin: 45,
    options: [
      { label: "Stock up and staff up", delta: { cash: -260, customers: 460, brand: 4 }, outcome: "You're ready - and it pays off big." },
      { label: "Run a limited-edition drop", delta: { cash: -120, customers: 280, brand: 8 }, outcome: "Scarcity drives hype and orders." },
      { label: "Play it safe, stay small", delta: { customers: 90 }, outcome: "Steady, but you left money on the table." },
    ],
  },
  {
    type: "tech", emoji: "💻", title: "Your systems are creaking",
    prompt: "Orders are piling up faster than your tools can handle. Things are starting to slip through the cracks.",
    reactLabel: "Write your fix and why it's worth it (40+ words)", reactMin: 40,
    options: [
      { label: "Invest in better software", delta: { cash: -180, customers: 140, reputation: 5 }, outcome: "Fewer mistakes, happier customers." },
      { label: "Patch it with a part-timer", delta: { cash: -90, customers: 60 }, outcome: "A band-aid that holds for now." },
      { label: "Ignore it and push on", delta: { reputation: -8, customers: -130 }, outcome: "Errors mount and people notice." },
    ],
    when: (s) => s.customers > 800,
  },
  {
    type: "social", emoji: "📱", title: "A post of yours is blowing up",
    prompt: "Something you posted is going viral. The window to capitalize is tiny.",
    reactLabel: "Write what you post next to ride the wave (40+ words)", reactMin: 40,
    options: [
      { label: "Drop a flash promo immediately", delta: { customers: 520, cash: -100, brand: 5 }, outcome: "You caught the wave perfectly." },
      { label: "Engage and build the audience", delta: { customers: 240, brand: 9 }, outcome: "Followers now, customers later." },
      { label: "Stay quiet - don't look thirsty", delta: { brand: 2 }, outcome: "The moment passes." },
    ],
    when: (s) => s.brand >= 45,
  },
  {
    type: "ethics", emoji: "🤔", title: "A shortcut would save real money",
    prompt: "You could quietly cut a corner on quality to boost margins. No one would know - yet.",
    reactLabel: "Write your decision and reasoning (50+ words)", reactMin: 50,
    options: [
      { label: "Keep your standards", delta: { cash: -60, reputation: 8, brand: 4 }, outcome: "Costs you now, builds trust for years." },
      { label: "Cut the corner this once", delta: { cash: 260, reputation: -10 }, outcome: "Cash today - but it'll come back around." },
      { label: "Find an honest middle path", delta: { cash: 80, reputation: 2 }, outcome: "A smarter saving with no shame." },
    ],
  },
  {
    type: "sustainability", emoji: "🌱", title: "Go green - or stay cheap?",
    prompt: "Switching to sustainable materials costs more but customers increasingly care.",
    reactLabel: "Write your stance and the business case (45+ words)", reactMin: 45,
    options: [
      { label: "Go fully sustainable", delta: { cash: -200, brand: 12, customers: 180 }, outcome: "A values-driven crowd rallies to you." },
      { label: "Switch a few key items", delta: { cash: -80, brand: 5, customers: 70 }, outcome: "A credible start without the full cost." },
      { label: "Stay with cheaper materials", delta: { cash: 60, brand: -3 }, outcome: "Margins up, but some buyers cool off." },
    ],
  },
  {
    type: "logistics", emoji: "🚚", title: "Your delivery partner failed you",
    prompt: "A shipping mix-up left a wave of customers waiting and angry.",
    reactLabel: "Write your recovery plan and customer message (45+ words)", reactMin: 45,
    options: [
      { label: "Refund shipping + apologize", delta: { cash: -160, reputation: 9 }, outcome: "You ate the cost and kept their trust." },
      { label: "Switch carriers immediately", delta: { cash: -110, reputation: 4 }, outcome: "Disruptive, but it won't happen again." },
      { label: "Blame the carrier publicly", delta: { reputation: -7, brand: -3 }, outcome: "Customers don't care whose fault it was." },
    ],
  },
  {
    type: "pricing", emoji: "🏷️", title: "Time to revisit your prices",
    prompt: "Costs have crept up. Your prices haven't moved in a while. Something has to give.",
    reactLabel: "Write your pricing decision and how you'll explain it (45+ words)", reactMin: 45,
    options: [
      { label: "Raise prices and own it", delta: { cash: 220, customers: -110, brand: 2 }, outcome: "Honest increase; a few churn, most stay." },
      { label: "Add a premium tier", delta: { cash: 180, brand: 6, customers: 40 }, outcome: "Big spenders opt up; everyone else stays." },
      { label: "Hold prices, cut costs instead", delta: { cash: 60, reputation: 3 }, outcome: "Customers happy; you do the hard work." },
    ],
  },
  {
    type: "partnership", emoji: "🤝", title: "A bigger brand wants to collaborate",
    prompt: "An established company proposes a co-branded product. Great exposure - but they'll want control.",
    reactLabel: "Write your negotiating position (50+ words)", reactMin: 50,
    options: [
      { label: "Sign the deal as offered", delta: { customers: 600, cash: 150, brand: 4 }, outcome: "Huge reach - on their terms." },
      { label: "Counter for a fairer split", delta: { customers: 380, cash: 260, brand: 7 }, outcome: "You held your value and still won." },
      { label: "Decline - protect your brand", delta: { brand: 5, reputation: 3 }, outcome: "Independent, but the door closes." },
    ],
    when: (s) => s.brand >= 50,
  },
  {
    type: "talent", emoji: "🚪", title: "A key person is thinking of leaving",
    prompt: "Someone important to the business hinted they might quit. Losing them would hurt.",
    reactLabel: "Write what you say to them (45+ words)", reactMin: 45,
    options: [
      { label: "Give a raise and more ownership", delta: { cash: -200, customers: 120, reputation: 5 }, outcome: "They recommit and double down." },
      { label: "Improve the culture, not the pay", delta: { cash: -40, reputation: 6, brand: 3 }, outcome: "Sometimes people just want to be valued." },
      { label: "Let them go gracefully", delta: { customers: -160, brand: -2 }, outcome: "A real loss, handled with class." },
    ],
    when: (s) => s.customers > 600,
  },
  {
    type: "pr", emoji: "🎤", title: "A reporter wants a comment - today",
    prompt: "A journalist is writing about your industry and asked you for a quote on a hot, slightly controversial topic.",
    reactLabel: "Write the quote you'd give them (40+ words)", reactMin: 40,
    options: [
      { label: "Give a bold, honest take", delta: { customers: 240, brand: 8, reputation: -2 }, outcome: "It gets shared widely - love it or hate it." },
      { label: "Stay safe and diplomatic", delta: { brand: 3, reputation: 4 }, outcome: "Forgettable, but nobody's mad." },
      { label: "Decline to comment", delta: { brand: -2 }, outcome: "A missed spotlight." },
    ],
    when: (s) => s.brand >= 40,
  },
  {
    type: "customer", emoji: "💬", title: "A wave of feature requests",
    prompt: "Customers keep asking for the same new thing. Building it means pausing other plans.",
    reactLabel: "Write your roadmap decision and why (40+ words)", reactMin: 40,
    options: [
      { label: "Build exactly what they asked", delta: { cash: -150, customers: 300, reputation: 6 }, outcome: "Customers feel heard and tell others." },
      { label: "Build a simpler version fast", delta: { cash: -60, customers: 180, reputation: 3 }, outcome: "Most of the value, a fraction of the cost." },
      { label: "Stick to your own roadmap", delta: { customers: -90, brand: 2 }, outcome: "Focused - but some feel ignored." },
    ],
  },
  {
    type: "finance", emoji: "🏦", title: "The bank offers a credit line",
    prompt: "You qualify for a loan that could fund a real growth push - but debt is debt.",
    reactLabel: "Write your decision and your repayment thinking (50+ words)", reactMin: 50,
    options: [
      { label: "Take it and invest in growth", delta: { cash: 500, customers: 220, reputation: -2 }, outcome: "Fuel for growth - now you owe it back." },
      { label: "Take a small, safe amount", delta: { cash: 220, customers: 90 }, outcome: "A cushion without betting the company." },
      { label: "Stay debt-free", delta: { reputation: 4, brand: 2 }, outcome: "Slower, but you sleep at night." },
    ],
  },
  {
    type: "quality", emoji: "🔬", title: "A defect slipped through",
    prompt: "A batch went out with a flaw. Some customers already have it in hand.",
    reactLabel: "Write your recall/response plan (50+ words)", reactMin: 50,
    options: [
      { label: "Full recall + replacements", delta: { cash: -300, reputation: 12 }, outcome: "Costly, but customers trust you more after." },
      { label: "Quietly fix on request", delta: { cash: -100, reputation: -2 }, outcome: "Cheaper, but word gets around." },
      { label: "Hope nobody notices", delta: { reputation: -14, customers: -180 }, outcome: "They noticed. It spread." },
    ],
  },
  {
    type: "community", emoji: "❤️", title: "A local cause asks for support",
    prompt: "A community group wants you to sponsor their event. It costs money and time.",
    reactLabel: "Write your decision and how you'll involve customers (40+ words)", reactMin: 40,
    options: [
      { label: "Sponsor generously", delta: { cash: -180, brand: 9, reputation: 7 }, outcome: "Real goodwill that money can't usually buy." },
      { label: "Donate a little + spread the word", delta: { cash: -60, brand: 5, reputation: 4 }, outcome: "Meaningful without overcommitting." },
      { label: "Politely decline", delta: { brand: -3 }, outcome: "Understandable, but a chance missed." },
    ],
  },
  {
    type: "data", emoji: "📊", title: "Your numbers reveal a surprise",
    prompt: "Analytics show most of your profit comes from a small slice of customers you'd been ignoring.",
    reactLabel: "Write how you'll act on this insight (40+ words)", reactMin: 40,
    options: [
      { label: "Double down on your best customers", delta: { cash: 180, customers: 100, brand: 4 }, outcome: "Focus pays off fast." },
      { label: "Try to convert the rest", delta: { cash: -120, customers: 260 }, outcome: "A gamble on growth over focus." },
      { label: "Keep everything as-is", delta: { reputation: 1 }, outcome: "Safe, but you ignored the signal." },
    ],
    when: (s) => s.customers > 700,
  },
  {
    type: "competitor", emoji: "🏃", title: "A rival just shut down",
    prompt: "Your closest competitor folded. Their customers are suddenly looking for a new home.",
    reactLabel: "Write your plan to win them over (45+ words)", reactMin: 45,
    options: [
      { label: "Aggressive switch-over offer", delta: { cash: -160, customers: 480, brand: 3 }, outcome: "You scoop up most of their crowd." },
      { label: "Welcome them with great service", delta: { customers: 300, reputation: 6 }, outcome: "Slower, but they stay loyal." },
      { label: "Raise prices - less competition", delta: { cash: 200, customers: -80 }, outcome: "More margin, fewer new faces." },
    ],
  },
  {
    type: "burnout", emoji: "😮‍💨", title: "You're running on empty",
    prompt: "You've been grinding non-stop and it's catching up with you. Mistakes are creeping in.",
    reactLabel: "Write your plan to keep yourself and the business healthy (40+ words)", reactMin: 40,
    options: [
      { label: "Take real time to recharge", delta: { cash: -80, reputation: 4, brand: 2 }, outcome: "You come back sharper and steadier." },
      { label: "Delegate and step back a bit", delta: { cash: -150, customers: 140 }, outcome: "Letting go grows the business." },
      { label: "Power through anyway", delta: { reputation: -6, customers: -90 }, outcome: "Quality slips while you're fried." },
    ],
  },
  {
    type: "opportunity", emoji: "🌍", title: "A chance to sell in a new region",
    prompt: "Interest is coming in from customers in a whole new area. Serving them means new logistics.",
    reactLabel: "Write your market-entry plan and the risk (50+ words)", reactMin: 50,
    options: [
      { label: "Launch there properly", delta: { cash: -320, customers: 540, brand: 6 }, outcome: "A bold new market opens up." },
      { label: "Test with shipping only", delta: { cash: -100, customers: 200 }, outcome: "Low-risk way to learn the demand." },
      { label: "Stay focused on home turf", delta: { reputation: 3, cash: 40 }, outcome: "Disciplined - for now." },
    ],
    when: (s) => s.customers > 1000 && s.cash > 400,
  },
  {
    type: "subscription", emoji: "🔁", title: "Should you launch a membership?",
    prompt: "You could turn one-time buyers into recurring members - steady income, but you owe them ongoing value.",
    reactLabel: "Write your membership concept and what's included (45+ words)", reactMin: 45,
    options: [
      { label: "Launch a paid membership", delta: { cash: 280, customers: -60, brand: 5 }, outcome: "Predictable revenue from your superfans." },
      { label: "Free loyalty program", delta: { cash: -80, customers: 240, reputation: 6 }, outcome: "Retention up, no paywall friction." },
      { label: "Not yet - keep it simple", delta: { reputation: 1 }, outcome: "One less thing to maintain." },
    ],
    when: (s) => s.customers > 600,
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
  const log = [...s.log, { month: s.month, text: `${sit.emoji} ${opt.label} - ${opt.outcome} (rev +${revenue}, cash ${cash})` }].slice(-30);
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
  marketingPlan: { customers: 350, cash: -100, msg: "Customers +350 · Cash -100" },
  adCampaign: { customers: 180, reputation: 5, msg: "Customers +180 · Reputation +5" },
};
export function applyEffect(s: BizState, id: string): BizState {
  const e = ACTIVITY_EFFECTS[id];
  if (!e) return s;
  return applyDelta(s, e);
}

// Apply an arbitrary metric change (used by rotating quarterly operations briefs).
export function applyDelta(s: BizState, e: Delta & { msg: string }): BizState {
  return {
    ...s,
    reputation: clamp(s.reputation + (e.reputation || 0), 0, 100),
    brand: clamp(s.brand + (e.brand || 0), 0, 100),
    customers: Math.max(0, s.customers + (e.customers || 0)),
    cash: s.cash + (e.cash || 0),
    log: [...s.log, { month: s.month, text: `✅ ${e.msg}` }].slice(-30),
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
