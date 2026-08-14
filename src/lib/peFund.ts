// peFund - the Private Equity career's living simulator: a real buyout fund.
//
// The PE job, modelled honestly for kids: you BUY whole companies, using a mix
// of your own money (equity) and borrowed money (debt = "leverage"). Then you
// spend a few years making the business better - cutting waste, growing sales,
// buying small rivals ("bolt-ons"), paying down the loan - and finally SELL it
// for more than you paid. Your score is MOIC: how many times you multiplied the
// equity you put in.
//
// The three real levers of buyout returns are all here:
//   1. EBITDA growth  - make the company earn more (the operating decisions).
//   2. Debt paydown   - cash flow quietly kills the loan, and every coin of
//                        debt repaid becomes a coin of equity value.
//   3. Multiple expansion - a bigger, cleaner business sells for a higher
//                        price *per coin of profit* than the one you bought.
//
// Leverage cuts both ways: more debt shrinks the equity check (juicing MOIC)
// but a company that can't cover its interest falls into distress. That tension
// is the whole game, and it's all deterministic from (week) so reloads are safe.

/* ── deterministic RNG (kept local so this engine stands alone) ──────── */

function hashStr(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
type Rng = () => number
const pick = <T,>(rng: Rng, arr: readonly T[]): T => arr[Math.floor(rng() * arr.length)]
const int = (rng: Rng, lo: number, hi: number) => lo + Math.floor(rng() * (hi - lo + 1))
function pickDistinct<T>(rng: Rng, arr: readonly T[], n: number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, n)
}

/* ── the businesses you can buy ──────────────────────────────────────── */

const PE_NAMES = ["Rosie's Bakeries", "QuickFix Repair", "SunnySide Gyms", "PageTurner Books", "SpotlessCo Cleaning", "GreenThumb Landscaping", "WrenchWorks Auto", "CozyNest Furniture", "BrightSmile Dental", "PawParadise Pet Resorts", "SteelCity Plumbing", "HarborView Diners", "TidyTot Daycares", "SummitPack Logistics", "MapleLeaf Print Shops"]

const PE_SECTORS = ["restaurant chain", "repair services", "fitness clubs", "retail stores", "commercial cleaning", "landscaping", "auto services", "furniture maker", "dental clinics", "pet care", "home services", "logistics", "childcare", "packaging", "printing"]

interface SectorInfo { product: string }
const PE_SECTOR_INFO: Record<string, SectorInfo> = {
  "restaurant chain": { product: "runs a chain of well-loved neighborhood eateries" },
  "repair services": { product: "fixes phones, appliances and gadgets across dozens of shops" },
  "fitness clubs": { product: "operates friendly local gyms with loyal members" },
  "retail stores": { product: "sells books and gifts through cozy high-street stores" },
  "commercial cleaning": { product: "cleans offices and buildings on nightly contracts" },
  "landscaping": { product: "maintains gardens and grounds for homes and businesses" },
  "auto services": { product: "runs trusted neighborhood car-repair garages" },
  "furniture maker": { product: "designs and builds furniture sold to retailers" },
  "dental clinics": { product: "operates family dental offices in growing suburbs" },
  "pet care": { product: "boards, grooms and daycares people's beloved pets" },
  "home services": { product: "sends plumbers and electricians to homes on call" },
  "logistics": { product: "moves packages between warehouses and stores" },
  "childcare": { product: "runs safe, well-staffed daycare centers" },
  "packaging": { product: "makes boxes and packaging for online sellers" },
  "printing": { product: "prints signs, menus and marketing for local businesses" },
}

/** A flaw the business has today - and the lever that fixes it (the thesis). */
interface BuyFlaw { flaw: string }
const PE_FLAWS: BuyFlaw[] = [
  { flaw: "every location buys its own supplies, paying full retail price" },
  { flaw: "the founder does everything by hand and nothing is written down" },
  { flaw: "prices haven't changed in years even as costs crept up" },
  { flaw: "three of its locations quietly lose money every month" },
  { flaw: "it has no website and takes orders only by phone" },
  { flaw: "great service but zero marketing - new customers can't find it" },
  { flaw: "old equipment breaks constantly and eats into profits" },
]

const OWNER_NAMES = ["Tony", "Rosa", "Frank", "Mabel", "Otis", "Delia", "Sanjay", "Gwen", "Marco", "Pearl"]

export interface BuyoutProfile {
  product: string
  /** Annual profit (EBITDA) in coins. */
  ebitda: number
  /** Yearly sales in coins. */
  revenue: number
  employees: number
  /** How fast sales are growing, %/yr. */
  growthPct: number
  /** Profit margin %, revenue vs profit. */
  marginPct: number
  flaw: string
  risks: string[]
}

export interface BuyoutTarget {
  id: string
  name: string
  owner: string
  sector: string
  /** Hidden 0-1 quality: how well the business responds to your work. */
  quality: number
  /** Price as a multiple of profit (EV / EBITDA). */
  entryMultiple: number
  /** Enterprise value = ebitda × entryMultiple (the sticker price). */
  price: number
  /** Signal shown to the student, from quality. */
  signal: "Strong" | "Fair" | "Risky"
  /** Most debt lenders will allow, as a multiple of EBITDA. */
  maxLeverage: number
  profile: BuyoutProfile
}

const RISK_POOL = [
  "Profits depend on a few big customers",
  "A recession would hit spending here fast",
  "Key staff could leave with the founder",
  "Rising wages squeeze the thin margins",
  "A national chain could move into its towns",
  "Its equipment will need costly replacing soon",
  "Seasonal swings make cash flow lumpy",
]

function buildProfile(r: Rng, quality: number, sector: string): BuyoutProfile {
  const info = PE_SECTOR_INFO[sector] ?? { product: "runs a solid local business" }
  const ebitda = int(r, 8, 42) * 10 // 80-420 coins/yr
  const marginPct = int(r, 8, 18)
  const revenue = Math.round(ebitda / (marginPct / 100))
  const employees = int(r, 20, 400)
  const growthPct = quality >= 0.6 ? int(r, 6, 16) : quality >= 0.36 ? int(r, 1, 7) : int(r, -4, 3)
  const flaw = pick(r, PE_FLAWS).flaw
  const risks = pickDistinct(r, RISK_POOL, quality >= 0.6 ? 2 : 3)
  return { product: info.product, ebitda, revenue, employees, growthPct, marginPct, flaw, risks }
}

/** Four businesses to browse each week. Deterministic per week. */
export function generateBuyoutTargets(week: number): BuyoutTarget[] {
  const wr = mulberry32(hashStr(`pe-targets:${week}`))
  const names = pickDistinct(wr, PE_NAMES, 4)
  const sectors = pickDistinct(wr, PE_SECTORS, 4)
  return names.map((name, i) => {
    const r = mulberry32(hashStr(`pe-target:${week}:${name}`))
    const quality = r()
    const sector = sectors[i]
    const profile = buildProfile(r, quality, sector)
    const entryMultiple = int(r, 4, 7)
    const price = profile.ebitda * entryMultiple
    // Stable, high-quality businesses support more debt; shaky ones less.
    const maxLeverage = quality >= 0.6 ? 5 : quality >= 0.36 ? 4 : 3
    const signal: BuyoutTarget["signal"] = quality >= 0.6 ? "Strong" : quality >= 0.36 ? "Fair" : "Risky"
    return { id: `w${week}-${name}`, name, owner: pick(r, OWNER_NAMES), sector, quality, entryMultiple, price, signal, maxLeverage, profile }
  })
}

/* ── deal structuring: the leverage choice ──────────────────────────── */

export interface LeveragePlan {
  id: "conservative" | "balanced" | "aggressive"
  label: string
  blurb: string
  /** Debt as a multiple of EBITDA. */
  debtMultiple: number
}

/** The three ways to finance the buy, capped by what lenders allow. */
export function leveragePlans(target: BuyoutTarget): LeveragePlan[] {
  const cap = target.maxLeverage
  return [
    { id: "conservative", label: "Cautious", blurb: "Little debt. Safer, but you put in more of your own coins for less punch.", debtMultiple: Math.min(2, cap) },
    { id: "balanced", label: "Balanced", blurb: "A sensible mix - the classic buyout structure most funds use.", debtMultiple: Math.min(3, cap) },
    { id: "aggressive", label: "Aggressive", blurb: "Max debt. Tiny equity check and huge upside - but one bad year can wipe you out.", debtMultiple: cap },
  ]
}

export interface DealStructure {
  debt: number
  equityIn: number
  debtMultiple: number
}
export function structureDeal(target: BuyoutTarget, plan: LeveragePlan): DealStructure {
  // Lenders never fund more than ~70% of the price, so you always write a real
  // equity check (≥30% of the price) - even on the aggressive plan.
  const debt = Math.min(plan.debtMultiple * target.profile.ebitda, Math.round(target.price * 0.7))
  const equityIn = Math.max(1, target.price - debt)
  return { debt, equityIn, debtMultiple: plan.debtMultiple }
}

/* ── the holding you own and improve ────────────────────────────────── */

export interface PortfolioBuyout {
  id: string
  name: string
  owner: string
  sector: string
  quality: number
  /** Coins of your own money invested (the equity check). */
  equityIn: number
  entryMultiple: number
  entryEbitda: number
  /** Live state. */
  ebitda: number
  debt: number
  /** Exit multiple the business would fetch today (grows as you build it). */
  currentMultiple: number
  profile: BuyoutProfile
  thesis: string
  boltOns: number
  status: "thriving" | "steady" | "distressed"
  investedWeek: number
  lastRunWeek: number
  ebitdaHistory: { week: number; ebitda: number }[]
  events: { week: number; text: string }[]
}

/** Interest owed per year on the loan (used to detect distress). */
export const INTEREST_RATE = 0.1
export function annualInterest(debt: number): number {
  return Math.round(debt * INTEREST_RATE)
}
/** Enterprise value today = profit × today's multiple. */
export function buyoutEV(c: PortfolioBuyout): number {
  return Math.round(c.ebitda * c.currentMultiple)
}
/** What your equity slice is worth = business value minus the remaining loan. */
export function equityValue(c: PortfolioBuyout): number {
  return Math.max(0, buyoutEV(c) - c.debt)
}
/** MOIC = how many times you've multiplied the equity you put in. */
export function buyoutMOIC(c: PortfolioBuyout): number {
  return Math.round((equityValue(c) / Math.max(1, c.equityIn)) * 100) / 100
}

export function holdingFromTarget(t: BuyoutTarget, s: DealStructure, week: number, thesis: string): PortfolioBuyout {
  return {
    id: t.id, name: t.name, owner: t.owner, sector: t.sector, quality: t.quality,
    equityIn: s.equityIn, entryMultiple: t.entryMultiple, entryEbitda: t.profile.ebitda,
    ebitda: t.profile.ebitda, debt: s.debt, currentMultiple: t.entryMultiple,
    profile: { ...t.profile }, thesis, boltOns: 0, status: "steady",
    investedWeek: week, lastRunWeek: 0,
    ebitdaHistory: [{ week, ebitda: t.profile.ebitda }],
    events: [{ week, text: `Bought for ${t.price.toLocaleString()} coins (${t.entryMultiple}× profit) with ${s.debt.toLocaleString()} of debt. Your equity check: ${s.equityIn.toLocaleString()}.` }],
  }
}

/* ── the value-creation playbook (weekly operating decisions) ────────── */

export interface OpChoice { text: string; points: 0 | 1 | 2; feedback: string }
export interface OpScenario {
  headline: string
  kind: "operate" | "boltOn" | "refinance"
  situation: string
  question: string
  choices: OpChoice[]
}

type OpFn = (c: PortfolioBuyout, r: Rng) => OpScenario

/** Deterministically shuffle a scenario's choices so the answer isn't positional. */
function shuffleChoices<T>(r: Rng, arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

const PE_RIVALS = ["QuickBite", "ValueMart", "CornerCo", "Speedy's", "MetroServe", "PennyLane", "FreshFix", "GoodDay Co.", "Brightside", "Nextdoor Group"]
const PE_CITIES = ["Riverton", "Oakdale", "Fairview", "Lakeside", "Brookfield", "Millbrook", "Ashford", "Cedar Falls"]
const PE_MGRS = ["Dana", "Reggie", "Yuki", "Marcus", "Bea", "Ivan", "Lupe", "Trent"]

// Generated numbers/names make each instance concrete, and the three options
// are kept to roughly EQUAL length so their wording gives away nothing - the
// student has to judge the substance.
const OP_SCENARIOS: OpFn[] = [
  (c, r) => {
    const loc = int(r, 6, 24), vendors = int(r, 5, loc), save = int(r, 9, 22)
    return {
      headline: "Everyone buys their own way",
      kind: "operate",
      situation: `Each of ${c.name}'s ${loc} shops orders from whoever's nearby - ${vendors} vendors in all, every one at full retail. One pooled contract could cut supply costs about ${save}%.`,
      question: "Your first value-creation move?",
      choices: [
        { text: `Pool all ${loc} shops into one bulk supply contract.`, points: 2, feedback: `Same product, ${save}% cheaper - it drops straight to profit. Combining purchasing across locations is the classic PE quick win.` },
        { text: "Switch every shop to the cheapest ingredients around.", points: 0, feedback: "Customers notice cheap quality fast. Trading what they love for a few points of margin quietly wrecks the loyalty you paid a premium for." },
        { text: "Hold off a year before touching the vendors.", points: 1, feedback: "Playing it safe wastes the thesis. This is exactly the fixable flaw you underwrote; waiting a year is a year of margin left on the table." },
      ],
    }
  },
  (c, r) => {
    const yrs = int(r, 4, 9), cost = int(r, 12, 30), bump = int(r, 3, 6)
    return {
      headline: "Prices frozen in time",
      kind: "operate",
      situation: `${c.name} hasn't changed prices in ${yrs} years, even as costs climbed ${cost}%. Customers are fiercely loyal and rarely shop on price.`,
      question: "What do you do with pricing?",
      choices: [
        { text: `Nudge prices up about ${bump}% and refresh the menu.`, points: 2, feedback: "A small, well-packaged rise on loyal customers flows almost entirely to profit. Under-pricing loyalty is free money left on the table." },
        { text: "Double every price and add a service charge.", points: 0, feedback: "Shock pricing turns loyal regulars into ex-customers overnight. Value creation is a scalpel, not a sledgehammer." },
        { text: "Keep prices exactly where they are for now.", points: 1, feedback: `Timidity costs too - with costs up ${cost}%, a frozen price means a shrinking margin every year. A gentle rise was the disciplined call.` },
      ],
    }
  },
  (c, r) => {
    const bad = int(r, 2, 4), loc = int(r, bad + 6, 20)
    return {
      headline: `${bad} shops bleed cash`,
      kind: "operate",
      situation: `${bad} of ${c.name}'s ${loc} shops lose money monthly. One bleeds over a bad lease, one just needs a decent manager, and one sits in a dying mall.`,
      question: "How do you handle the losers?",
      choices: [
        { text: "Fix the lease and manager; close the dead-mall shop.", points: 2, feedback: "Surgical, not sentimental. You keep the two fixable sites and cut the one that can't be saved - diagnose before you amputate." },
        { text: `Close all ${bad} money-losing shops this week.`, points: 1, feedback: "Decisive, but blunt - two were fixable. Shutting the shop that only needed a manager threw away real profit. Cut smart, not just fast." },
        { text: "Keep all of them open - loyalty comes first.", points: 0, feedback: "A fund answers to its investors. Shops that bleed every month drain the cash you need to grow the winners." },
      ],
    }
  },
  (c, r) => {
    const rival = pick(r, PE_RIVALS)
    return {
      headline: "Stuck on the phone line",
      kind: "operate",
      situation: `${c.name} still takes orders by phone only. A rival, ${rival}, just launched slick online ordering and is peeling away younger customers.`,
      question: "Where does the budget go?",
      choices: [
        { text: "Add simple online ordering that feeds the shops.", points: 2, feedback: "Meet customers where they are. A clean ordering page lifts sales without disturbing what already works - textbook modernization." },
        { text: `Build a flashy app loaded with a dozen features.`, points: 0, feedback: "Over-building torches cash on features nobody asked for and takes a year to ship. Start simple, prove it, then expand." },
        { text: "Wait and see if phone orders really dry up.", points: 1, feedback: `While you wait, ${rival} keeps the customers it wins. The edge in modernization goes to whoever moves first, not most cautiously.` },
      ],
    }
  },
  (c, r) => {
    const mgr = pick(r, PE_MGRS)
    return {
      headline: "The founder was the manual",
      kind: "operate",
      situation: `${c.owner}, the retired owner, ran everything from memory and wrote nothing down. The ${c.profile.employees}-person team keeps hitting walls only ${c.owner} knew how to solve.`,
      question: "How do you protect the company?",
      choices: [
        { text: `Document the playbook and promote ${mgr} to run it.`, points: 2, feedback: "You de-risk the whole deal. A company that runs on systems and managers - not one irreplaceable hero - is worth far more at exit." },
        { text: `Secretly pay ${c.owner} to keep running it from home.`, points: 0, feedback: "You've made a retired person your single point of failure - again. Leaning on someone who's gone is how founder-run buyouts quietly collapse." },
        { text: "Leave it be - the team will adapt on its own.", points: 1, feedback: "Hope isn't a plan. Without written systems, the next surprise becomes a crisis. Build the machine now, while things are calm." },
      ],
    }
  },
  (c, r) => {
    const stars = (40 + int(r, 3, 9)) / 10
    return {
      headline: "A secret nobody knows about",
      kind: "operate",
      situation: `${c.name} has glowing ${stars.toFixed(1)}-star reviews but spends almost nothing on marketing, so new customers never discover it in the first place.`,
      question: "Your growth play?",
      choices: [
        { text: "Run a small ad test, then scale what pays back.", points: 2, feedback: "Prove the return on each coin before scaling. Disciplined, measured growth spend is how you compound a genuinely good business." },
        { text: "Blitz the whole city with billboards, radio and TV.", points: 1, feedback: "A giant untested blast usually misses. You'll spend the budget before learning which channel actually brings paying customers. Test first." },
        { text: "Leave it alone - word of mouth is plenty.", points: 0, feedback: "Word of mouth alone caps your growth. You bought this to expand it, not to leave a proven product idling." },
      ],
    }
  },
  (c, r) => {
    const wage = int(r, 8, 18)
    return {
      headline: "Wages just jumped",
      kind: "operate",
      situation: `Pay in ${c.name}'s towns rose ${wage}% this year, squeezing the thin margins. Turnover is high and every new hire costs real money to train.`,
      question: "How do you respond?",
      choices: [
        { text: "Bump pay for your best keepers to cut turnover.", points: 2, feedback: "Retaining trained staff is cheaper than endlessly re-hiring. A little more pay to the right people protects service AND margin." },
        { text: "Cut hours and churn through the cheapest hires.", points: 0, feedback: "Constant churn means constant training cost and collapsing service. Squeezing the wage line this hard quietly destroys the business." },
        { text: "Do nothing and hope wages settle down soon.", points: 1, feedback: "Hoping the labor market reverses isn't a plan. Margins keep bleeding while you wait; act on what you can control." },
      ],
    }
  },
  (c, r) => {
    const age = int(r, 8, 20), rep = int(r, 20, 90)
    return {
      headline: "The ovens keep dying",
      kind: "operate",
      situation: `${c.name}'s key equipment is ${age} years old and breaks constantly - repairs cost ${rep} coins last year, plus lost sales every time it goes down mid-shift.`,
      question: "What's the move?",
      choices: [
        { text: "Replace the worst machines now to kill the repair bill.", points: 2, feedback: "Smart capital spending is value creation too. Ending the repairs and outages more than earns back the cost - and buyers pay up for reliable operations." },
        { text: "Keep patching the old machines to protect cash.", points: 0, feedback: `Penny-wise, pound-foolish - the ${rep}-coin repair bill and lost sales keep recurring and growing. Deferring needed capital to flatter one year's profit is a classic trap.` },
        { text: "Replace them slowly, one unit per year.", points: 1, feedback: "Not wrong, just timid - the breakdowns and lost sales keep hurting while you drip in upgrades. The math favored moving faster on the worst units." },
      ],
    }
  },
]

/** Bolt-on: buy a small rival and fold it in (grows EBITDA, adds some debt). */
const BOLT_ON: OpFn = (c, r) => {
  const rival = pick(r, PE_RIVALS)
  const add = Math.round(c.entryEbitda * (0.2 + r() * 0.2))
  return {
    headline: `${rival} is up for sale`,
    kind: "boltOn",
    situation: `${rival}, a smaller rival in ${c.name}'s market earning about ${add} coins of profit, is for sale cheap. Folding it in adds scale - the "roll-up" play - but you'd borrow a bit more to buy it.`,
    question: "Do you bolt it on?",
    choices: [
      { text: "Buy it and merge the back office into yours.", points: 2, feedback: `Multiple arbitrage in action: ${rival}'s profit, bought cheaply and combined with yours, becomes more valuable inside a bigger, cleaner platform.` },
      { text: `Buy ${rival} but run it completely separately.`, points: 0, feedback: "A bolt-on you don't integrate is just two small companies in a trench coat. The savings of scale ARE the integration - skip it and you overpaid." },
      { text: "Pass unless it needs zero integration work.", points: 1, feedback: "Every bolt-on needs some integration - that's the work that creates the value. Holding out for a 'perfect' one means never rolling up at all." },
    ],
  }
}

/** Refinance/paydown decision - surfaces when debt is heavy. */
const REFINANCE: OpFn = c => ({
  headline: "The loan looms large",
  kind: "refinance",
  situation: `${c.name} carries ${c.debt.toLocaleString()} coins of debt, costing ${annualInterest(c.debt).toLocaleString()} a year in interest against ${c.ebitda.toLocaleString()} of profit. Cash flow is healthy right now.`,
  question: "What's the smart money move?",
  choices: [
    { text: "Use spare cash to pay the loan down faster.", points: 2, feedback: "Every coin of debt you retire turns into equity value at exit - and lighter interest makes the whole return safer and steadier." },
    { text: "Borrow more and pay yourself a big dividend now.", points: 0, feedback: "A 'dividend recap' before you've earned it just stacks on risk. Pile debt on a company and one bad quarter is all it takes to break it." },
    { text: "Ignore the debt and pour it all into growth.", points: 1, feedback: "Growth is good, but heavy debt is a ticking clock. Balancing paydown against growth is what separates pros from gamblers." },
  ],
})

/** This week's operating decision for a company. Deterministic, order shuffled. */
export function generateOpScenario(c: PortfolioBuyout, week: number): OpScenario {
  const r = mulberry32(hashStr(`pe-op:${c.id}:${week}`))
  let s: OpScenario
  // Heavy debt + weak coverage → force the refinance lesson.
  if (c.debt > c.ebitda * 3.5 && annualInterest(c.debt) > c.ebitda * 0.6 && r() < 0.7) s = REFINANCE(c, r)
  // Occasionally offer a bolt-on to healthy companies.
  else if (c.status !== "distressed" && r() < 0.3) s = BOLT_ON(c, r)
  else s = pick(r, OP_SCENARIOS)(c, r)
  return { ...s, choices: shuffleChoices(r, s.choices) }
}

export interface OpResult {
  patch: Partial<PortfolioBuyout>
  repDelta: number
  outcome: string
}

/**
 * Apply the student's operating decision. EBITDA moves with the call (scaled by
 * quality), the loan pays down from cash flow, and a well-built, bigger company
 * earns a little multiple expansion. Distress (interest > profit) caps upside
 * and can shrink the business - the hard lesson of over-leverage.
 */
export function applyOpChoice(c: PortfolioBuyout, week: number, scenario: OpScenario, choice: OpChoice, idx: number): OpResult {
  const r = mulberry32(hashStr(`pe-apply:${c.id}:${week}:${idx}`))
  const distressed = annualInterest(c.debt) > c.ebitda

  // EBITDA growth from the decision, scaled by hidden quality.
  let growth: number
  if (choice.points === 2) growth = 0.06 + c.quality * 0.14 + r() * 0.04
  else if (choice.points === 1) growth = -0.01 + c.quality * 0.04 + r() * 0.02
  else growth = -(0.05 + (1 - c.quality) * 0.08 + r() * 0.03)
  if (distressed) growth = Math.min(growth, -0.02) // a strangled company can't grow

  let ebitda = Math.max(1, Math.round(c.ebitda * (1 + growth)))
  let debt = c.debt
  let boltOns = c.boltOns
  let extraNote = ""

  if (scenario.kind === "boltOn" && choice.points === 2) {
    // Fold in a rival: profit jumps, but debt rises to fund the purchase.
    const addEbitda = Math.round(c.entryEbitda * (0.2 + r() * 0.2))
    ebitda += addEbitda
    debt += Math.round(addEbitda * 3) // financed with ~3× debt
    boltOns += 1
    extraNote = ` Bolt-on added ~${addEbitda} profit (and some debt).`
  } else if (scenario.kind === "refinance" && choice.points === 2) {
    // Aggressive paydown this week.
    debt = Math.max(0, debt - Math.round(ebitda * 0.4))
  } else if (scenario.kind === "refinance" && choice.points === 0) {
    // Dividend recap: pile on debt.
    debt += Math.round(ebitda * 2)
  }

  // Normal cash-flow debt paydown every week (unless distressed).
  if (!distressed) debt = Math.max(0, debt - Math.round(ebitda * 0.12))

  // Multiple expansion: a bigger, better-run business earns a higher exit
  // multiple over time (capped so it stays believable).
  let currentMultiple = c.currentMultiple
  const sizeBonus = ebitda > c.entryEbitda * 1.5 ? 0.05 : 0
  if (choice.points === 2 && !distressed) currentMultiple = Math.min(c.entryMultiple + 2.5, currentMultiple + 0.15 + sizeBonus)
  else if (choice.points === 0 || distressed) currentMultiple = Math.max(c.entryMultiple - 1.5, currentMultiple - 0.15)

  const status: PortfolioBuyout["status"] =
    annualInterest(debt) > ebitda ? "distressed" : growth > 0.04 ? "thriving" : "steady"

  const profile: BuyoutProfile = {
    ...c.profile,
    ebitda,
    revenue: Math.round(ebitda / (c.profile.marginPct / 100)),
    growthPct: Math.max(-15, Math.min(40, Math.round(growth * 100))),
  }

  const pct = Math.round(growth * 100)
  const sign = pct >= 0 ? "+" : ""
  const grade = choice.points === 2 ? "Great call" : choice.points === 1 ? "Okay call" : "Rough call"
  const repDelta = choice.points === 2 ? 3 : choice.points === 1 ? 1 : -2

  const next: PortfolioBuyout = { ...c, ebitda, debt, currentMultiple, boltOns, status, profile }
  const newEquity = equityValue(next)
  const moic = buyoutMOIC(next)

  const patch: Partial<PortfolioBuyout> = {
    ebitda, debt, currentMultiple, boltOns, status, profile,
    ebitdaHistory: [...c.ebitdaHistory, { week, ebitda }].slice(-12),
    events: [...c.events, { week, text: `${grade}: profit ${sign}${pct}% to ${ebitda.toLocaleString()}; debt now ${debt.toLocaleString()}; equity worth ${newEquity.toLocaleString()} (${moic}×).${extraNote}` }].slice(-10),
    lastRunWeek: week,
  }
  const distressNote = status === "distressed" ? ` ⚠️ Interest now outruns profit - ${c.name} is in distress. This is what too much debt does.` : ""
  const outcome = `${choice.feedback}${extraNote} ${c.name}'s profit is ${sign}${pct}% (${ebitda.toLocaleString()}), and your equity stake is worth ${newEquity.toLocaleString()} coins - a ${moic}× return so far.${distressNote}`
  return { patch, repDelta, outcome }
}

/* ── exits ───────────────────────────────────────────────────────────── */

export interface ExitRoute {
  id: "strategic" | "secondary" | "ipo"
  label: string
  blurb: string
  /** Multiplier applied to equity value at exit. */
  factor: number
}

/** Three ways to sell, each with its own trade-off. Deterministic per week. */
export function exitRoutes(c: PortfolioBuyout, week: number): ExitRoute[] {
  const r = mulberry32(hashStr(`pe-exit:${c.id}:${week}`))
  const marketHot = r() < 0.5
  return [
    { id: "strategic", label: "Sell to a strategic buyer", blurb: "A bigger competitor pays up for your customers and savings. Reliable, clean, done.", factor: 1.05 },
    { id: "secondary", label: "Sell to another PE fund", blurb: "A larger fund buys it to keep growing. Fast and certain, at a fair price.", factor: 1.0 },
    { id: "ipo", label: "Take it public (IPO)", blurb: marketHot ? "Markets are hot - an IPO could fetch a premium, but it's more work." : "Markets are shaky - an IPO is risky right now and could price low.", factor: marketHot ? 1.2 : 0.85 },
  ]
}
export function computeExit(c: PortfolioBuyout, route: ExitRoute): number {
  return Math.max(0, Math.round(equityValue(c) * route.factor))
}

/* ── written deliverables (kept in the shared work file) ─────────────── */
export const PE_THESIS_MIN_WORDS = 20
export const PE_MEMO_MIN_WORDS = 20

/** True once `text` has at least `min` words. */
export function wordCountOk(text: string, min: number): boolean {
  return text.trim().split(/\s+/).filter(Boolean).length >= min
}
