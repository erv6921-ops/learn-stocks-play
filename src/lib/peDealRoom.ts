// peDealRoom - an immersive, end-to-end Private Equity deal simulation.
//
// Instead of a stream of shallow multiple-choice "case studies", the PE career
// plays ONE realistic mid-market buyout the way an associate actually lives it:
// you get hired, a banker emails you a company for sale, you read the CIM, meet
// the founder, NEGOTIATE the price over several rounds of back-and-forth,
// survive due-diligence surprises, line up the debt, close, spend a few years
// making the company better, then run a sale and find out your MOIC.
//
// The deal (Meridian Capital Partners buys "Coastal Crunch", a founder-owned
// regional snack maker) is authored and deterministic - a real case study, not
// a randomized template. Deal figures are in $millions; the student's own
// rewards are paid in coins (bonus + carry), the way real PE pay works.
//
// The library holds many such case studies (this file authors the flagship
// Coastal Crunch deal; peDeals.ts authors eight more, each a different PE
// strategy). DEALS = all of them.

import { PE_DEALS } from "./peDeals"

/* ── deal state the campaign accumulates ────────────────────────────── */

export interface PeVars {
  /** Entry annual profit, $M. */
  ebitda: number
  /** Agreed purchase multiple (× EBITDA), set by the LOI negotiation. */
  entryMultiple: number
  /** Debt as a multiple of EBITDA (leverage), set when you structure the bid. */
  leverageMult: number
  /** 0-100 relationship with the seller's banker. */
  bankerRel: number
  /** 0-100 how well you build the company during the hold. */
  buildQuality: number
  /** Points earned across decisions - drives your coin bonuses. */
  score: number
  /** Years held before exit. */
  holdYears: number
  /** Exit sale multiple, set by the exit negotiation. */
  exitMultiple: number
  retraded: boolean
  rolloverAccepted: boolean
  [k: string]: number | boolean | string
}

export const INITIAL_VARS: PeVars = {
  ebitda: 8, entryMultiple: 0, leverageMult: 4, bankerRel: 60,
  buildQuality: 50, score: 0, holdYears: 4, exitMultiple: 0,
  retraded: false, rolloverAccepted: false,
}

/* ── economics ──────────────────────────────────────────────────────── */

export function fmtM(n: number): string { return `$${Math.round(n * 10) / 10}M` }
export function fmtX(n: number): string { return `${Math.round(n * 10) / 10}×` }

/** Purchase price (enterprise value) = profit × multiple. */
export function entryEV(v: PeVars): number { return v.ebitda * v.entryMultiple }
/** Debt raised, capped at ~70% of the price so you always write a real check. */
export function entryDebt(v: PeVars): number {
  return Math.min(v.leverageMult * v.ebitda, entryEV(v) * 0.7)
}
/** Your fund's equity check = price − debt. */
export function entryEquity(v: PeVars): number { return Math.max(0.1, entryEV(v) - entryDebt(v)) }

/** Everything realized at exit, derived from how well you built the company. */
export interface ExitResult {
  exitEbitda: number
  exitMultiple: number
  exitDebt: number
  exitEV: number
  exitEquity: number
  moic: number
  irr: number
}
export function computeExit(v: PeVars): ExitResult {
  const bq = Math.max(0, Math.min(100, v.buildQuality))
  // EBITDA growth: great operators ~ +60% over the hold, weak ones barely grow.
  const exitEbitda = Math.round(v.ebitda * (1.08 + (bq / 100) * 0.55) * 10) / 10
  // Multiple expansion: a bigger, cleaner business earns up to +1.5× at exit.
  const exitMultiple = v.exitMultiple || Math.max(v.entryMultiple - 0.5, v.entryMultiple + (bq / 100) * 2 - 0.5)
  // Debt paid down from cash flow across the hold (deleveraging).
  const paid = v.ebitda * 0.14 * v.holdYears
  const exitDebt = Math.max(0, Math.round((entryDebt(v) - paid) * 10) / 10)
  const exitEV = Math.round(exitEbitda * exitMultiple * 10) / 10
  const exitEquity = Math.max(0, Math.round((exitEV - exitDebt) * 10) / 10)
  const eqIn = entryEquity(v)
  const moic = Math.round((exitEquity / eqIn) * 100) / 100
  const irr = moic > 0 ? Math.round((Math.pow(moic, 1 / v.holdYears) - 1) * 100) : -100
  return { exitEbitda, exitMultiple: Math.round(exitMultiple * 10) / 10, exitDebt, exitEV, exitEquity, moic, irr }
}

/* ── negotiation engine ─────────────────────────────────────────────── */
// A negotiation is a few rounds of real back-and-forth. Each round you choose a
// tactic; the counterparty concedes (or doesn't) based on how sound your move
// is, and emails you back. Good tactics move their number your way AND keep the
// relationship warm; cheap shots barely move them and cost you goodwill. The
// number you walk away with drives the deal economics - overpay and your MOIC
// suffers for years.

export interface NegChoice {
  text: string
  /** The counterparty's emailed reply to this move. */
  reply: string
  /** How far their number moves toward you this round (in the negotiation's unit). */
  move: number
  rel: number
  points: 0 | 1 | 2
  feedback: string
}
export interface NegRound { theirLine: string; choices: NegChoice[] }
export interface Negotiation {
  id: string
  title: string
  counterparty: string
  role: string
  /** "low" = you (buyer) want their number DOWN; "high" = you (seller) want it UP. */
  youWant: "low" | "high"
  unit: "×" | "$M"
  start: number
  /** The best number you can realistically reach (their true limit). */
  floor: number
  intro: string[]
  rounds: NegRound[]
  /** Which PeVars field stores the agreed number. */
  resultVar: keyof PeVars
}

/** Clamp an in-progress number to the side you're negotiating for. */
export function clampNeg(n: Negotiation, current: number): number {
  return n.youWant === "low" ? Math.max(n.floor, current) : Math.min(n.floor, current)
}
export function applyNegMove(n: Negotiation, current: number, move: number): number {
  const next = n.youWant === "low" ? current - move : current + move
  return clampNeg(n, next)
}

/* ── the step machine ───────────────────────────────────────────────── */

export type Phase = "Onboarding" | "Sourcing" | "Diligence" | "Negotiation" | "Financing" | "Closing" | "Value Creation" | "Exit"
export const PHASES: Phase[] = ["Onboarding", "Sourcing", "Negotiation", "Diligence", "Financing", "Closing", "Value Creation", "Exit"]

export interface Sender { name: string; role: string }

export interface EmailStep {
  kind: "email"
  id: string; phase: Phase
  from: Sender
  subject: string
  body: string[]
  cta: string
}
export interface Choice {
  text: string; points: 0 | 1 | 2; feedback: string
  rel?: number
  effect?: Partial<PeVars>
}
export interface DecisionStep {
  kind: "decision"
  id: string; phase: Phase
  from?: Sender
  subject?: string
  situation: string[]
  question: string
  choices: Choice[]
}
export interface DocStep {
  kind: "document"
  id: string; phase: Phase
  title: string; subtitle: string
  rows: { k: string; v: string }[]
  highlights: string[]
  risks: string[]
  cta: string
}
export interface MeetingQ { q: string; a: string; key: boolean }
export interface MeetingStep {
  kind: "meeting"
  id: string; phase: Phase
  intro: string[]
  person: Sender
  pickCount: number
  questions: MeetingQ[]
}
export interface NegotiationStep {
  kind: "negotiation"
  id: string; phase: Phase
  neg: Negotiation
}
export interface MilestoneStep {
  kind: "milestone"
  id: string; phase: Phase
  variant: "closed" | "exit"
  title: string
  body: string[]
}

export type Step = EmailStep | DecisionStep | DocStep | MeetingStep | NegotiationStep | MilestoneStep

/** A full, self-contained case study - one deal played start to finish. */
export interface Deal {
  id: string
  company: string
  /** The PE playbook this deal teaches (Turnaround, Roll-up, Carve-out, …). */
  strategy: string
  sector: string
  tagline: string
  difficulty: "Starter" | "Core" | "Advanced"
  emoji: string
  /** Starting deal vars for this company (merged over INITIAL_VARS). */
  initVars: Partial<PeVars>
  steps: Step[]
}

/* ── the characters ─────────────────────────────────────────────────── */
const DIANE: Sender = { name: "Diane Okafor", role: "Managing Partner, Meridian Capital" }
const MARCUS: Sender = { name: "Marcus Lin", role: "Managing Director, Harbor Point Advisors (sell-side)" }
const ROSA: Sender = { name: "Rosa Delgado", role: "Founder & CEO, Coastal Crunch" }
const PRIYA: Sender = { name: "Priya Raman", role: "Leveraged Finance, First Anchor Bank" }

/* ── the campaign ───────────────────────────────────────────────────── */

export const STEPS: Step[] = [
  {
    kind: "email", id: "hired", phase: "Onboarding", from: DIANE,
    subject: "Welcome to Meridian - and your first live deal",
    body: [
      "Welcome to the team. You're joining as a deal associate on Fund III - $500M to invest in founder-owned consumer and services companies.",
      "Our playbook is simple and it works: buy a good business at a fair price, use sensible debt, spend four or five years making it genuinely better - not just cheaper - then sell it to someone bigger. We make money by building, not by financial tricks.",
      "A banker named Marcus Lin is about to send you a company that's quietly for sale. I want you to run it. I'll be watching how you think.",
    ],
    cta: "Get to work",
  },
  {
    kind: "decision", id: "edge", phase: "Onboarding",
    situation: ["Before the deal lands, Diane stops by your desk.", "\"Quick one,\" she says. \"When a founder is choosing who to sell their life's work to, and three funds all have money - what actually wins us the deal, and wins us the returns?\""],
    question: "What's our real edge as a fund?",
    choices: [
      { text: "A credible growth plan and a partner they trust", points: 2, rel: 3, feedback: "Exactly. Founders sell to people they believe will steward the company - and returns come from operational growth, not from paying the most or cutting the most.", effect: { buildQuality: 4 } },
      { text: "Simply offering more money than anyone else", points: 1, feedback: "Sometimes price wins the auction - but overpaying just borrows returns from your future self. And plenty of founders take less to sell to the right home." },
      { text: "Loading it with debt and stripping costs fast", points: 0, feedback: "That's the cartoon villain version of PE, and it mostly destroys companies (and your reputation). Real returns come from building." },
    ],
  },
  {
    kind: "email", id: "teaser", phase: "Sourcing", from: MARCUS,
    subject: "New opportunity - Project Maple (2-page teaser attached)",
    body: [
      "Good to reconnect. I'm running a limited process for a wonderful business and thought of Meridian.",
      "Blind for now: a 40-year-old, founder-owned maker of premium kettle chips and snacks with a fiercely loyal regional following. ~$52M revenue, ~$8M EBITDA, growing steadily. The founder is ready to retire and wants the right long-term home, not just the highest bidder.",
      "If you're interested, sign the NDA and I'll send the full CIM (Confidential Information Memorandum). First-round indications of interest are due in two weeks.",
    ],
    cta: "Open the teaser",
  },
  {
    kind: "decision", id: "pursue", phase: "Sourcing",
    from: MARCUS, subject: "Re: Project Maple",
    situation: ["A loved regional brand, a retiring founder, an essential-ish everyday product, steady cash flow. It smells like exactly Meridian's thesis - but you've only seen two pages."],
    question: "How do you respond to Marcus?",
    choices: [
      { text: "Sign the NDA and study the full CIM first", points: 2, rel: 2, feedback: "Right pace: get informed before you commit. Signing an NDA costs nothing and opens the real data.", effect: { score: 1 } },
      { text: "Fire back a big verbal price now to jump the line", points: 1, feedback: "Bankers do notice eager buyers, but a number before you've read the numbers isn't credible - and you'll be held to it." },
      { text: "Pass - two pages isn't enough to bother", points: 0, feedback: "You just declined a thesis-perfect deal because you hadn't read it yet. The CIM is exactly how you learn more." },
    ],
  },
  {
    kind: "document", id: "cim", phase: "Sourcing",
    title: "Coastal Crunch: Confidential Information Memorandum",
    subtitle: "Prepared by Harbor Point Advisors · Project Maple",
    rows: [
      { k: "Business", v: "Premium kettle chips & snacks, founded 1984" },
      { k: "Revenue", v: "$52M (growing ~6%/yr)" },
      { k: "EBITDA (profit)", v: "$8.0M (15% margin)" },
      { k: "Employees", v: "210, one plant + two warehouses" },
      { k: "Distribution", v: "Regional grocery, convenience, some DTC" },
      { k: "Owner", v: "Rosa Delgado (founder), retiring" },
    ],
    highlights: [
      "Beloved brand with genuine customer loyalty and pricing power",
      "Only sells in 4 states - lots of room to expand distribution",
      "No modern systems yet: finance runs on spreadsheets",
      "Never raised prices to keep pace with rising potato/oil costs",
    ],
    risks: [
      "One grocery chain is ~32% of sales (customer concentration)",
      "The plant is aging and near capacity",
      "The founder IS the brand - no clear #2",
    ],
    cta: "Close the CIM",
  },
  {
    kind: "decision", id: "fit", phase: "Sourcing",
    situation: ["You've read the CIM cover to cover. Diane wants your one-line read before you spend real time on it."],
    question: "Is Coastal Crunch a Meridian deal?",
    choices: [
      { text: "Yes - a loved brand whose flaws we can fix", points: 2, rel: 0, feedback: "That's the thesis exactly. The flaws - no systems, frozen prices, only 4 states - are all things WE know how to fix. That's where the return lives.", effect: { score: 2, buildQuality: 3 } },
      { text: "No - the customer concentration and old plant make it too risky", points: 0, feedback: "Those are real risks to price and manage, not reasons to pass. A perfect company would cost a perfect price - the flaws are why it's affordable." },
      { text: "Maybe - only if the founder first fixes the pricing and the plant", points: 1, feedback: "If she fixes everything first, the price doubles and the opportunity's gone. You are the fixer - that's the job." },
    ],
  },
  {
    kind: "decision", id: "ioi", phase: "Sourcing",
    from: MARCUS, subject: "First-round IOIs due Friday",
    situation: ["Marcus needs your Indication of Interest - a non-binding valuation range that gets you into the second round. Comparable snack businesses have sold for 6-7× EBITDA. Rosa's advisors are hoping for 8×."],
    question: "What range do you submit?",
    choices: [
      { text: "6.5-7.0×, with your growth plan and certainty", points: 2, rel: 2, feedback: "Credible and competitive. You anchor near the real comps and sell your non-price value - certainty and a plan - which is what gets a founder to pick you.", effect: { score: 2 } },
      { text: "8.0×+ to guarantee you make the next round", points: 1, feedback: "You'll make the shortlist, but you've anchored yourself into overpaying - and a range you can't defend later triggers an ugly re-trade." },
      { text: "4.5-5.0× to steal it cheap", points: 0, feedback: "Insultingly low - you're out in round one, and Marcus remembers. Anchoring works only when your number is still believable.", effect: { bankerRel: -6 } },
    ],
  },
  {
    kind: "email", id: "shortlist", phase: "Sourcing", from: MARCUS,
    subject: "You're through - management meeting Thursday",
    body: [
      "Nice IOI. You're one of three groups into the second round. Rosa liked that you led with the plan, not just the number.",
      "She'd like to meet you herself. Fair warning - she cares more about who's buying her company than about the last half-turn of price. Come prepared with real questions.",
      "Thursday, 10am, at the plant. Bring your curiosity.",
    ],
    cta: "Prep for the meeting",
  },
  {
    kind: "meeting", id: "mgmt", phase: "Diligence",
    intro: ["You tour the plant with Rosa - the smell of frying potatoes, decades of photos on the wall. You have time for three real questions before she has to run.", "Choose the three that best de-risk the deal and show her you get it."],
    person: ROSA,
    pickCount: 3,
    questions: [
      { q: "Tell me about the big grocery customer - how locked-in are they?", a: "\"Thirty years. Handshake-solid, but yes, no long contract. Their new buyer likes us. I worry about it, honestly.\"", key: true },
      { q: "If we invested to expand, could the plant handle more volume?", a: "\"Not much more - we're near capacity. You'd need a second line or a co-packer within two years. I've sketched a plan.\"", key: true },
      { q: "Who runs this if you retire? Is there a #2?", a: "\"That's my gap. My ops lead is fantastic but not a CEO. You'd need to bring in leadership. I'll stay on 6 months to hand over.\"", key: true },
      { q: "What's your favorite flavor?", a: "\"Sea-salt & vinegar, obviously. But that's not why you're here, is it?\" She smiles.", key: false },
      { q: "How's the office decorated?", a: "\"Forty years of family photos. Charming, irrelevant to your model.\"", key: false },
      { q: "Do employees like working here?", a: "\"Very low turnover - people stay for decades. It's a real asset, and I'd want a buyer who protects it.\"", key: false },
    ],
  },
  {
    kind: "decision", id: "read", phase: "Diligence",
    situation: ["Back at the office, Diane asks for your read on the meeting."],
    question: "What's the headline for the investment committee?",
    choices: [
      { text: "Great brand; the work is customer risk, capacity, a CEO", points: 2, rel: 0, feedback: "You heard the actual signal. Those three - concentration, capacity, leadership - are your 100-day plan and your diligence checklist.", effect: { score: 2, buildQuality: 4 } },
      { text: "It's perfect - loyal customers, loyal staff, let's just move fast", points: 0, feedback: "'Perfect' means you weren't listening. Every deal has real risks; missing them is how buyers get burned after signing." },
      { text: "Too many problems - recommend we drop it", points: 1, feedback: "These are solvable, priced-in problems - the very reason the return exists. Dropping thesis-perfect deals over fixable flaws is how funds underperform." },
    ],
  },
  {
    kind: "decision", id: "leverage", phase: "Negotiation",
    from: DIANE, subject: "Structure before you bid",
    situation: ["Before you send a binding offer, decide how to finance it. Lenders will fund part with debt (cheap, but it must be paid every year); your fund writes the rest as equity. The plant needs investment and one customer is 32% of sales."],
    question: "How much leverage do you use on this bid?",
    choices: [
      { text: "Balanced (~4× debt) - leverage, but room to invest", points: 2, rel: 0, feedback: "Right for a business with a big-customer risk and capex ahead. Leverage lifts returns; over-leverage kills companies that hit a bump.", effect: { leverageMult: 4, score: 1 } },
      { text: "Aggressive (~5.5× debt) - juice the returns, minimize your check", points: 1, feedback: "Tempting, but with 32% customer concentration and an aging plant, one lost account and you can't service the debt. Sized too hot.", effect: { leverageMult: 5.5 } },
      { text: "Almost none - pay mostly in cash to be safe", points: 1, feedback: "Very safe, but you've left PE's main tool on the shelf - your returns will be muted. Sensible leverage was the pro move.", effect: { leverageMult: 1.5 } },
    ],
  },
  {
    kind: "negotiation", id: "loi", phase: "Negotiation",
    neg: {
      id: "loi", title: "The LOI: agree the price", counterparty: "Marcus Lin", role: "Seller's banker (Harbor Point)", youWant: "low", unit: "×",
      start: 8, floor: 6, resultVar: "entryMultiple",
      intro: [
        "Time for the binding LOI. Marcus is on the phone for Rosa.",
        "\"We've got two other bidders,\" he says. \"Rosa's anchored on 8× - that's the number in her head. Convince me you're the right home AND get me to something she'll sign. Where are you?\"",
      ],
      rounds: [
        {
          theirLine: "\"We're at 8.0×. That's the ask. Make your case.\"",
          choices: [
            { text: "Open at 6.5×, backed by comps and the capex", reply: "\"...okay. You've clearly done the work, and the capex point is fair. Let me take a serious number back to Rosa. She won't love it, but she'll listen.\"", move: 1, rel: 6, points: 2, feedback: "Textbook: a credible anchor backed by data moves the number AND earns respect. That's how real price gets made." },
            { text: "Split the difference at 7.5× to seem agreeable", reply: "\"That's friendlier, sure - but honestly it's close to the ask, so I've got no reason to push Rosa anywhere. We can probably just... take that.\"", move: 0.3, rel: 2, points: 1, feedback: "Being 'nice' by anchoring high just means you'll overpay. Concede toward the seller and they happily let you." },
            { text: "Slam down 4.5× and tell him the brand is fading", reply: "\"Whoa. That's not serious, and trashing a company Rosa built for 40 years is a great way to get uninvited. Come back with a real number.\"", move: 0.1, rel: -10, points: 0, feedback: "An extreme lowball plus an insult doesn't anchor - it detonates goodwill and barely moves the number." },
          ],
        },
        {
          theirLine: "\"Rosa's team came back. They're not at your number yet - there's still a gap. What have you got?\"",
          choices: [
            { text: "Hold firm, but protect her staff and name", reply: "\"...that actually matters to her more than the last half-turn. Non-price terms like that give me something real to sell. We're getting close.\"", move: 0.9, rel: 7, points: 2, feedback: "Brilliant. On a founder deal, non-price terms (jobs, legacy) are leverage. You bridged the gap without just paying more." },
            { text: "Bump your offer up a bit to keep it moving", reply: "\"Appreciated - every turn you give up, Rosa takes. We'll meet, but you're paying for the speed.\"", move: 0.6, rel: 3, points: 1, feedback: "Concessions close deals, but conceding on price without getting anything back just means a higher entry price - and a lower MOIC." },
            { text: "Threaten to walk away entirely", reply: "\"You've got two rivals who aren't threatening to walk, so... go ahead? Or let's be serious.\" He's annoyed.", move: 0.2, rel: -6, points: 0, feedback: "A walk-away threat only works when you actually hold the leverage. Here it just weakened you." },
          ],
        },
        {
          theirLine: "\"We're almost there. Rosa will sign this range if you can close it clean. Bring it home.\"",
          choices: [
            { text: "Lock it with a timeline and proof of financing", reply: "\"Done. Certainty is worth a lot to Rosa - a signed deal that actually closes beats a higher number that might not. You've got it.\"", move: 0.6, rel: 6, points: 2, feedback: "The final inch: certainty closes deals. Proving you can actually fund and close is what makes a seller pick you." },
            { text: "Try to squeeze one more half-turn at the buzzer", reply: "\"Really? At the finish line? Fine - but Rosa noticed, and it cost you some warmth going into a five-year partnership.\"", move: 0.5, rel: -5, points: 1, feedback: "Squeezing at the buzzer can win a few dollars and lose the relationship you'll depend on for years. Rarely worth it." },
            { text: "Cave and just take their current number to be safe", reply: "\"Sold. Easiest close I've had all year.\" He's very pleased - which tells you something.", move: 0, rel: 2, points: 0, feedback: "When the banker is thrilled, you probably left money on the table. You had room and gave it away." },
          ],
        },
      ],
    },
  },
  {
    kind: "email", id: "loi-signed", phase: "Diligence", from: MARCUS,
    subject: "LOI signed - into confirmatory diligence",
    body: [
      "Rosa signed. Congratulations - you beat two bigger funds because she trusts you with her people and her name.",
      "You now have 45 days of exclusivity for confirmatory diligence: quality-of-earnings, legal, customer calls. If something real turns up, we can talk - but I'll fight a lazy re-trade.",
      "Our data room is open. Good hunting.",
    ],
    cta: "Start diligence",
  },
  {
    kind: "decision", id: "dd-finding", phase: "Diligence",
    subject: "QoE flag from the diligence team",
    situation: ["Your accountants find it: last year's EBITDA included a one-time $0.6M insurance payout that Rosa's team counted as normal profit. 'Real' recurring EBITDA is closer to $7.4M, not $8.0M - so at your multiple you're paying a bit too much."],
    question: "What do you do with the finding?",
    choices: [
      { text: "Re-trade to the real $7.4M profit, with the data", points: 2, rel: 1, feedback: "This is exactly what diligence is for. A fact-based adjustment is fair and Marcus can defend it to Rosa. You just protected the fund's return.", effect: { score: 2, retraded: true, ebitda: 7.4 } },
      { text: "Ignore it - you don't want to rock a deal you fought to win", points: 1, feedback: "Loyalty to the deal over the numbers is how buyers overpay. A real, provable finding should move the price - that's not being difficult, it's being right." },
      { text: "Blow up the whole deal over $0.6M", points: 0, feedback: "Wildly out of proportion - a small, fixable adjustment isn't a reason to torch a thesis-perfect deal and your reputation. Price it, don't detonate it." },
    ],
  },
  {
    kind: "decision", id: "financing", phase: "Financing",
    from: PRIYA, subject: "Debt package for Coastal Crunch",
    situation: ["First Anchor Bank offers to fund your debt. Priya lays out three structures. Remember: one customer is 32% of sales, and you'll need capex for a second production line."],
    question: "Which debt package do you take?",
    choices: [
      { text: "Moderate leverage with a cash cushion and room for the capex", points: 2, rel: 0, feedback: "A package that survives a bad quarter and funds the growth investment. Debt should enable the plan, not strangle it.", effect: { score: 2, buildQuality: 2 } },
      { text: "The cheapest rate, but with tight covenants and no cushion", points: 1, feedback: "A slightly lower rate isn't worth tripping a covenant the first time that big customer orders light. Flexibility beats a few basis points here." },
      { text: "Maximum debt to shrink your equity check", points: 0, feedback: "Stacking on debt against a concentrated, capex-hungry business is how good companies end up owned by their lender.", effect: { leverageMult: 5.5 } },
    ],
  },
  {
    kind: "decision", id: "signing", phase: "Closing",
    from: MARCUS, subject: "One more thing before we sign",
    situation: ["At the finish line, Rosa asks for one change: she wants to roll 10% of her proceeds back into the deal as equity, and stay on as chair for a year. She believes in the next chapter and wants skin in the game."],
    question: "How do you respond?",
    choices: [
      { text: "Welcome it - her rollover aligns her with you", points: 2, rel: 4, feedback: "A founder rolling equity is a huge green flag - she's betting on the future alongside you, and her staying smooths the handover. Great outcome.", effect: { score: 2, buildQuality: 3, rolloverAccepted: true } },
      { text: "Refuse - you want full control and a clean break", points: 1, feedback: "Clean control has appeal, but turning away an aligned, knowledgeable founder who wants to invest is often a missed layer of safety and goodwill." },
      { text: "Only if she personally guarantees the results", points: 0, feedback: "That's not how equity works - she'd take equity RISK, not a personal guarantee. Demanding it would insult her and blow the goodwill you built." },
    ],
  },
  {
    kind: "milestone", id: "closed", phase: "Closing", variant: "closed",
    title: "Deal closed: you own Coastal Crunch",
    body: [
      "The wire hits. Meridian Capital now owns Coastal Crunch. Rosa hands you the keys (and a bag of sea-salt & vinegar).",
      "Now the real work begins: four years to make this good company great.",
    ],
  },
  {
    kind: "decision", id: "day100", phase: "Value Creation",
    from: DIANE, subject: "The 100-day plan",
    situation: ["Week one of ownership. The business runs on spreadsheets and Rosa's memory, and you've promised the lenders a plan. Where do you start?"],
    question: "Your first move in the 100-day plan?",
    choices: [
      { text: "Hire a strong CFO and put in real systems", points: 2, rel: 0, feedback: "You can't manage what you can't measure. Professionalizing finance is the unglamorous first step that makes every later improvement possible - and lifts the exit value.", effect: { score: 2, buildQuality: 6 } },
      { text: "Immediately cut headcount to boost margins", points: 0, feedback: "Slashing the loyal, low-turnover staff Rosa protected wrecks morale and the brand - and you promised her otherwise. You can't cut your way to a great company.", effect: { buildQuality: -8 } },
      { text: "Rebrand the packaging with a splashy new logo", points: 1, feedback: "Not harmful, but it's icing before you've baked the cake. Systems and the real growth levers come before cosmetics.", effect: { buildQuality: 1 } },
    ],
  },
  {
    kind: "decision", id: "value1", phase: "Value Creation",
    situation: ["A year in, the CFO's data confirms it: Coastal Crunch has never raised prices, and it's leaving huge distribution untouched - it only sells in 4 states. You can chase one big lever this year."],
    question: "Where do you create value?",
    choices: [
      { text: "A modest price rise now, then fund expansion", points: 2, rel: 0, feedback: "The classic value-creation one-two: capture the easy margin the brand has earned, then reinvest it into disciplined geographic growth. This is where the MOIC is made.", effect: { score: 2, buildQuality: 8 } },
      { text: "Double prices immediately to maximize margin this year", points: 0, feedback: "Shock pricing on loyal customers drives them away and hands the shelf to rivals. Value creation is a scalpel, not a sledgehammer.", effect: { buildQuality: -6 } },
      { text: "Sit tight - don't mess with a good thing", points: 1, feedback: "Standing still on a company you paid a premium to improve is how a fund earns a mediocre return. You bought the upside - go get it.", effect: { buildQuality: -2 } },
    ],
  },
  {
    kind: "decision", id: "curveball", phase: "Value Creation",
    subject: "The big customer is wobbling",
    situation: ["Year three. The 32%-of-sales grocery chain gets acquired, and the new owner threatens to drop Coastal Crunch for a cheaper house brand. This was the risk you underwrote at the start."],
    question: "How do you respond to the threat?",
    choices: [
      { text: "Lean on your new distribution and win them back", points: 2, rel: 0, feedback: "Because you'd already expanded into new states, losing them wouldn't be fatal - and negotiating from strength, you keep them anyway. This is why you diversified.", effect: { score: 3, buildQuality: 6 } },
      { text: "Panic and slash your price to whatever keeps them", points: 1, feedback: "Caving on price to a customer who smells blood trains them to squeeze you forever and craters your margin. Strength, not fear.", effect: { buildQuality: -3 } },
      { text: "Do nothing and hope they stay", points: 0, feedback: "Hope isn't a plan when a third of revenue is walking. The whole point of the last two years was to be ready for this.", effect: { buildQuality: -8 } },
    ],
  },
  {
    kind: "email", id: "exit-pitch", phase: "Exit", from: MARCUS,
    subject: "It might be time to sell",
    body: [
      "Four years in and Coastal Crunch is a different company - modern systems, national distribution, profit up sharply, and it survived the big-customer scare stronger than ever.",
      "I've had two large snack conglomerates ask about it, and a bigger PE fund is sniffing around too. The market's hot right now. Want me to run a process?",
      "You've built something real. Let's go get paid for it.",
    ],
    cta: "Run the exit process",
  },
  {
    kind: "negotiation", id: "exit", phase: "Exit",
    neg: {
      id: "exit", title: "The exit: sell for the most", counterparty: "Big Snack Co.", role: "Strategic buyer's head of M&A", youWant: "high", unit: "×",
      start: 6.5, floor: 8.5, resultVar: "exitMultiple",
      intro: [
        "A strategic buyer - a national snack giant - wants Coastal Crunch for its brand and your new distribution. Now you're the seller.",
        "Their M&A lead opens low: \"We like it. We're thinking around 6.5× - it's a small regional player, after all.\"",
      ],
      rounds: [
        {
          theirLine: "\"6.5× feels right to us for a business this size.\"",
          choices: [
            { text: "Push the growth story and the synergies", reply: "\"...fair. With the distribution you built and the cost savings we'd get, it's worth more to us than a standalone number. Let's talk higher.\"", move: 1.2, rel: 5, points: 2, feedback: "You reframed the price around what it's worth TO THEM (synergies) - the single most powerful lever a seller has." },
            { text: "Say it's fine but ask for 'a little more'", reply: "\"Sure, we can nudge it a touch. Easy.\" They barely move - and they can tell you'll take it.", move: 0.4, rel: 2, points: 1, feedback: "Vague asks get vague moves. Anchor to a real number and a real reason, or you leave money behind." },
            { text: "Demand double or you walk, immediately", reply: "\"That's not a negotiation, that's a tantrum. We have other targets.\" The temperature drops.", move: 0.1, rel: -8, points: 0, feedback: "An extreme demand with no rationale just invites them to walk. Ambition needs evidence behind it." },
          ],
        },
        {
          theirLine: "\"We're closer. Give us a reason to stretch to the top of our range.\"",
          choices: [
            { text: "Remind them a rival PE fund is also bidding", reply: "\"...we heard. We don't want to lose it to a financial buyer who'll just flip it. Okay - top of our range, and we move fast.\"", move: 1.3, rel: 4, points: 2, feedback: "Competition is the seller's superpower. A credible second bidder is what turns 'fair' into 'full' price." },
            { text: "Take their current number to lock in the win", reply: "\"Deal. Smart of you to take certainty.\" A clean close - but you had another turn in you.", move: 0, rel: 3, points: 1, feedback: "Certainty has real value, but with a live rival bidder you had leverage to push once more. Fine outcome, not the best." },
            { text: "Bluff a fake offer at an absurd number", reply: "\"We called around. That offer doesn't exist.\" Caught bluffing, you've lost all credibility.", move: -0.3, rel: -10, points: 0, feedback: "Bluffing a number that's easily checked destroys your credibility - and your price - the moment they call it." },
          ],
        },
      ],
    },
  },
  {
    kind: "milestone", id: "exit-done", phase: "Exit", variant: "exit",
    title: "Exited: the results are in",
    body: [
      "The deal closes. Coastal Crunch, once a sleepy 4-state brand, sells to a national giant that will take it everywhere.",
      "Rosa's rollover pays off handsomely - she calls to thank you for keeping her people and her name. Diane forwards the LP letter with a single line: \"This is exactly how it's supposed to work.\"",
    ],
  },
]

/* ── rewards ────────────────────────────────────────────────────────── */

/** Coin bonus paid when the deal closes (recognizes execution to date). */
export function closeBonus(v: PeVars): number {
  return 200 + v.score * 25
}
/** Carry-style coin bonus at exit, scaled by the MOIC you achieved. */
export function exitCarry(v: PeVars, moic: number): number {
  return Math.max(0, Math.round((moic - 1) * 600)) + v.score * 15
}

/* ── the library ────────────────────────────────────────────────────── */

export const DEAL_COASTAL: Deal = {
  id: "coastal",
  company: "Coastal Crunch",
  strategy: "Founder buyout",
  sector: "Consumer snacks",
  tagline: "A retiring founder's beloved snack brand: buy it, grow it, sell it.",
  difficulty: "Core",
  emoji: "🥔",
  initVars: { ebitda: 8 },
  steps: STEPS,
}

/** Every case study, flagship first. */
export const DEALS: Deal[] = [DEAL_COASTAL, ...PE_DEALS]

export function getDeal(id: string): Deal | undefined {
  return DEALS.find(d => d.id === id)
}
