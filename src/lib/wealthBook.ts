// wealthBook - the Wealth Manager career's living simulator: a real book of
// clients (AUM = "assets under management").
//
// The job, modelled honestly for kids: real people hand you their savings and
// their goals. You (1) build each one a mix of stocks / bonds / cash that fits
// their age, timeline and nerves, (2) guide them through market storms and
// life events so they don't wreck their own plan, and (3) earn an advisory fee
// - about 1% of the money you manage each year - which grows as your clients'
// money (and trust) grows. Lose their trust and they walk, taking their AUM.
//
// One market moves every week for everyone (deterministic per week), so a
// crash tests every client at once - exactly when good coaching matters most.

/* ── deterministic RNG (local) ──────────────────────────────────────── */

function hashStr(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
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
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a.slice(0, n)
}

export function wordCountOk(text: string, min: number): boolean {
  return text.trim().split(/\s+/).filter(Boolean).length >= min
}

/* ── the fee ────────────────────────────────────────────────────────── */
// About 1% of assets per year, billed each time you review a client (roughly a
// quarter of a year), i.e. ~0.25% per review. Small on one account, real across
// a big, growing book - which is exactly how the business works.
export const WM_ANNUAL_FEE = 0.01
export const WM_REVIEW_FEE = WM_ANNUAL_FEE / 4

export const WM_PLAN_MIN_WORDS = 20
export const WM_NOTE_MIN_WORDS = 20

/* ── clients ────────────────────────────────────────────────────────── */

const FIRST = ["Maya", "Dev", "Grace", "Sam", "Lena", "Tariq", "Nora", "Hugo", "Priya", "Omar", "Ruth", "Caleb", "Ana", "Jerome", "Bex", "Malik"]
const LAST = ["Rivera", "Chen", "Okafor", "Byrne", "Santos", "Patel", "Nguyen", "Foster", "Haddad", "Kim", "Moore", "Delgado"]

interface Goal { label: string; horizon: number; icon: string }
const GOALS: Goal[] = [
  { label: "buy a first home", horizon: 5, icon: "🏡" },
  { label: "fund the kids' college", horizon: 12, icon: "🎓" },
  { label: "retire comfortably", horizon: 30, icon: "🌴" },
  { label: "retire next year", horizon: 1, icon: "🪑" },
  { label: "leave a legacy for family", horizon: 25, icon: "🎁" },
  { label: "start a business someday", horizon: 6, icon: "💡" },
  { label: "take a dream sabbatical", horizon: 3, icon: "✈️" },
]

const JOBS = ["teacher", "nurse", "electrician", "chef", "engineer", "shop owner", "firefighter", "designer", "dentist", "farmer", "accountant", "professor"]
type Risk = "cautious" | "balanced" | "bold"
const RISK_NOTE: Record<Risk, string> = {
  cautious: "hates seeing the balance drop and loses sleep over losses",
  balanced: "can handle some ups and downs if the plan makes sense",
  bold: "is comfortable with big swings for a shot at bigger growth",
}

export interface ProspectClient {
  id: string
  name: string
  age: number
  job: string
  goal: Goal
  risk: Risk
  /** Money they'd bring you to manage (coins). */
  assets: number
  note: string
}

/** Four prospective clients to pitch each week. Deterministic per week. */
export function generateProspects(week: number): ProspectClient[] {
  const wr = mulberry32(hashStr(`wm-prospects:${week}`))
  const firsts = pickDistinct(wr, FIRST, 4)
  return firsts.map(name => {
    const r = mulberry32(hashStr(`wm-prospect:${week}:${name}`))
    const goal = pick(r, GOALS)
    // Age loosely tracks the goal (retiring-soon clients are older).
    const age = goal.horizon <= 2 ? int(r, 60, 68) : goal.horizon <= 6 ? int(r, 26, 45) : int(r, 24, 52)
    const risk = pick(r, ["cautious", "balanced", "bold"] as Risk[])
    const assets = int(r, 3, 45) * 1000
    const job = pick(r, JOBS)
    return {
      id: `w${week}-${name}`, name: `${name} ${pick(r, LAST)}`, age, job, goal, risk, assets,
      note: `${RISK_NOTE[risk]}.`,
    }
  })
}

/* ── allocation & suitability ───────────────────────────────────────── */

export interface Allocation { stocks: number; bonds: number; cash: number }

export interface AllocPreset { id: string; label: string; blurb: string; alloc: Allocation }
export const ALLOC_PRESETS: AllocPreset[] = [
  { id: "safety", label: "Safety First", blurb: "Almost all cash & bonds. Barely moves - and barely grows.", alloc: { stocks: 10, bonds: 30, cash: 60 } },
  { id: "conservative", label: "Conservative", blurb: "Mostly bonds with a little stock. Steady, gentle growth.", alloc: { stocks: 30, bonds: 50, cash: 20 } },
  { id: "balanced", label: "Balanced", blurb: "A classic even mix - growth you can mostly sleep through.", alloc: { stocks: 55, bonds: 35, cash: 10 } },
  { id: "growth", label: "Growth", blurb: "Stock-heavy. Bigger long-run growth, bumpier ride.", alloc: { stocks: 75, bonds: 20, cash: 5 } },
  { id: "aggressive", label: "Aggressive", blurb: "Almost all stocks. Highest growth, scariest drops.", alloc: { stocks: 90, bonds: 8, cash: 2 } },
]

/** The stock % that fits a client's timeline and nerves (the glide path). */
export function idealStockPct(p: { age: number; goal: Goal; risk: Risk }): number {
  const h = p.goal.horizon
  let base = h >= 20 ? 80 : h >= 10 ? 65 : h >= 5 ? 45 : h >= 2 ? 28 : 12
  base += p.risk === "bold" ? 10 : p.risk === "cautious" ? -12 : 0
  return Math.max(5, Math.min(90, base))
}

export interface SuitabilityResult { score: 0 | 1 | 2; feedback: string }
/** Grade a chosen preset against what actually fits this client. */
export function scoreAllocation(p: ProspectClient, alloc: Allocation): SuitabilityResult {
  const ideal = idealStockPct(p)
  const gap = Math.abs(alloc.stocks - ideal)
  const shortHorizon = p.goal.horizon <= 2
  // Hard misses first - the dangerous mismatches.
  if (shortHorizon && alloc.stocks >= 55)
    return { score: 0, feedback: `${p.name} needs this money in about ${p.goal.horizon} year${p.goal.horizon === 1 ? "" : "s"}. A crash right before then can't be waited out - too much stock here is a real risk.` }
  if (p.goal.horizon >= 20 && alloc.stocks <= 25)
    return { score: 0, feedback: `With ${p.goal.horizon} years to go, playing it this safe means inflation quietly eats ${p.name}'s buying power. Long horizons need growth to do their job.` }
  if (gap <= 15) return { score: 2, feedback: `A great fit. ${alloc.stocks}% stocks matches ${p.name}'s ${p.goal.horizon}-year timeline and ${p.risk} temperament almost exactly.` }
  if (gap <= 30) return { score: 1, feedback: `Workable, but a bit ${alloc.stocks > ideal ? "aggressive" : "timid"} for ${p.name}. Aim closer to ~${ideal}% stocks for their timeline and nerves.` }
  return { score: 0, feedback: `This mix is ${alloc.stocks > ideal ? "far too aggressive" : "far too cautious"} for ${p.name}. Around ${ideal}% stocks would suit their ${p.goal.horizon}-year goal.` }
}

/* ── the market (one shared regime per week) ────────────────────────── */

export interface MarketRegime {
  id: string
  label: string
  emoji: string
  note: string
  /** Per-review returns (roughly a quarter) as decimals. */
  stocks: number
  bonds: number
  cash: number
  volatile: boolean
}
const REGIMES: { r: MarketRegime; weight: number }[] = [
  { weight: 26, r: { id: "calm", label: "Calm growth", emoji: "😌", note: "Markets drifted quietly upward.", stocks: 0.04, bonds: 0.015, cash: 0.003, volatile: false } },
  { weight: 16, r: { id: "bull", label: "Bull run", emoji: "🚀", note: "Stocks surged on good news.", stocks: 0.11, bonds: 0.01, cash: 0.003, volatile: false } },
  { weight: 20, r: { id: "choppy", label: "Choppy & flat", emoji: "😐", note: "A sideways, jittery stretch.", stocks: -0.02, bonds: 0.012, cash: 0.003, volatile: false } },
  { weight: 14, r: { id: "correction", label: "Correction", emoji: "📉", note: "Stocks slid on worry.", stocks: -0.1, bonds: 0.02, cash: 0.003, volatile: true } },
  { weight: 8, r: { id: "crash", label: "Market crash", emoji: "🐻", note: "A scary, headline-grabbing plunge.", stocks: -0.22, bonds: 0.03, cash: 0.003, volatile: true } },
  { weight: 16, r: { id: "recovery", label: "Recovery rally", emoji: "🌤️", note: "The market bounced back hard.", stocks: 0.14, bonds: 0.01, cash: 0.003, volatile: false } },
]
export function regimeForWeek(week: number): MarketRegime {
  const r = mulberry32(hashStr(`wm-market:${week}`))
  const total = REGIMES.reduce((n, x) => n + x.weight, 0)
  let roll = r() * total
  for (const x of REGIMES) { if ((roll -= x.weight) <= 0) return x.r }
  return REGIMES[0].r
}
/** Weighted portfolio return for an allocation under a regime. */
export function portfolioReturn(alloc: Allocation, m: MarketRegime): number {
  return (alloc.stocks / 100) * m.stocks + (alloc.bonds / 100) * m.bonds + (alloc.cash / 100) * m.cash
}

/* ── the client household you manage ────────────────────────────────── */

export interface ClientHousehold {
  id: string
  name: string
  age: number
  job: string
  goal: Goal
  risk: Risk
  alloc: Allocation
  assets: number
  startAssets: number
  /** 0-100 trust. Low trust → they leave and take their money. */
  satisfaction: number
  plan: string
  status: "happy" | "content" | "worried"
  signedWeek: number
  lastReviewWeek: number
  assetHistory: { week: number; assets: number }[]
  events: { week: number; text: string }[]
}

export function householdFromProspect(p: ProspectClient, alloc: Allocation, week: number, plan: string, suit: SuitabilityResult): ClientHousehold {
  return {
    id: p.id, name: p.name, age: p.age, job: p.job, goal: p.goal, risk: p.risk,
    alloc, assets: p.assets, startAssets: p.assets,
    satisfaction: suit.score === 2 ? 74 : suit.score === 1 ? 60 : 46,
    plan, status: "content", signedWeek: week, lastReviewWeek: 0,
    assetHistory: [{ week, assets: p.assets }],
    events: [{ week, text: `Signed with ${(alloc.stocks)}/${alloc.bonds}/${alloc.cash} stocks/bonds/cash. Brought ${p.assets.toLocaleString()} coins to manage.` }],
  }
}

export function totalReturnPct(c: ClientHousehold): number {
  return Math.round(((c.assets - c.startAssets) / Math.max(1, c.startAssets)) * 100)
}

/* ── the weekly review (market + a coaching moment) ─────────────────── */

export interface ReviewChoice { text: string; points: 0 | 1 | 2; feedback: string }
export interface ReviewScenario {
  headline: string
  situation: string
  question: string
  choices: ReviewChoice[]
}
type ScenarioFn = (c: ClientHousehold, m: MarketRegime, r: Rng) => ReviewScenario

/** Deterministically shuffle a scenario's choices so the answer isn't positional. */
function shuffleChoices<T>(r: Rng, arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

const PUNDITS = ["a TV host", "a viral video", "a finance influencer", "a scary headline", "their loudest coworker"]
const HOT_THINGS = ["a meme coin", "a hot crypto token", "one soaring tech stock", "a trendy new fund", "a 'can't-lose' startup"]
const NEIGHBORS = ["a neighbor", "an old college friend", "their cousin", "someone at the gym", "a coworker"]

// Real numbers and names vary per instance; the three options are kept to
// roughly EQUAL length so wording gives nothing away - the student must judge.

// Storm scenarios (down markets): the panic test.
const PANIC: ScenarioFn = (c, m, r) => {
  const drop = Math.abs(Math.round(portfolioReturn(c.alloc, m) * 100))
  const pundit = pick(r, PUNDITS)
  return {
    headline: `${c.name.split(" ")[0]} is panicking`,
    situation: `The market ${m.id === "crash" ? "just crashed" : "slid hard"} and ${c.name.split(" ")[0]}'s portfolio is down about ${drop}%. ${pundit.charAt(0).toUpperCase() + pundit.slice(1)} is screaming "SELL EVERYTHING," and they call you at night: "Get me out before it drops more!"`,
    question: "What do you tell them?",
    choices: [
      { text: "Hold the plan - selling now just locks in the loss.", points: 2, feedback: `You reminded them the plan was built for exactly this, and their ${c.goal.horizon}-year timeline is long enough to recover. Talking a client off the ledge in a dip is where you earn your whole fee.` },
      { text: "Sell it all to cash now and buy back once it recovers.", points: 0, feedback: "That's 'sell low, buy high' dressed up as caution. Nobody rings a bell at the bottom - they'd lock in the loss AND miss the rebound. Panic-selling is the #1 destroyer of everyday wealth." },
      { text: "Sell half to meet the fear in the middle.", points: 1, feedback: "Half-panicking is still panicking - it locks in real losses on money that had time to bounce back. A steady plan beats a nervous compromise." },
    ],
  }
}

// Boom scenarios (up markets): the greed test.
const CHASE: ScenarioFn = (c, _m, r) => {
  const neighbor = pick(r, NEIGHBORS), thing = pick(r, HOT_THINGS), gain = int(r, 3, 12) * 100
  return {
    headline: `${c.name.split(" ")[0]} wants in on a hot thing`,
    situation: `Stocks are booming and ${neighbor} "made ${gain}%" on ${thing}. ${c.name.split(" ")[0]} wants to move a big chunk of their portfolio in to catch the wave before it's too late.`,
    question: "Your advice?",
    choices: [
      { text: "Steer them off it - chasing last month's winner buys the top.", points: 2, feedback: "Protecting a client from their own FOMO is real value. Chasing last month's winner with a big chunk of a life plan is a classic wealth-destroyer." },
      { text: "Cap a tiny 'fun money' slice, separate from the plan.", points: 1, feedback: "Not terrible - a small, walled-off gamble can scratch the itch. Just be firm it's entertainment, not the plan, or that slice quietly creeps bigger." },
      { text: "Sure - move a third in before it climbs more.", points: 0, feedback: "Betting a third of a life plan on a hot bet is how good savers blow up. When it drops, so does their goal - and their trust in you." },
    ],
  }
}

// Life-event scenarios (calm markets).
const LIFE: ScenarioFn[] = [
  (c, _m, r) => ({
    headline: `${c.name.split(" ")[0]} just had a baby`,
    situation: `${c.name.split(" ")[0]} welcomed a new baby named ${pick(r, FIRST)} and wants to start saving for the little one's future. How should it fit the plan?`,
    question: "What do you set up?",
    choices: [
      { text: "A separate long-horizon pot for the child.", points: 2, feedback: "A dedicated bucket with its own ~18-year timeline can hold plenty of stock and compound beautifully - without disturbing the parents' own goal. Separate goals, separate plans." },
      { text: "Just add it to their existing account for simplicity.", points: 1, feedback: "Better than nothing, but mixing goals blurs the plan. A clear, separate pot keeps everyone honest about what the money is for." },
      { text: "Pause their own retirement and fund only the baby.", points: 0, feedback: "'Restart later' quietly costs decades of compounding on their own retirement. You can save for a child without sacrificing the grown-ups' future - it's not either/or." },
    ],
  }),
  (c, _m, r) => {
    const amt = int(r, 5, 40) * 1000
    return {
      headline: `${c.name.split(" ")[0]} inherited ${amt.toLocaleString()} coins`,
      situation: `${c.name.split(" ")[0]} unexpectedly inherited ${amt.toLocaleString()} coins. They're buzzing - half tempted to spend it fast, half tempted to dump it all into stocks today.`,
      question: "How do you guide the windfall?",
      choices: [
        { text: "Cool off, top up emergency cash, then invest the rest to fit the plan.", points: 2, feedback: "The pro's windfall move: pause, secure the safety net, then fold it into the existing plan and goals. Sudden money vanishes fastest when it skips the plan." },
        { text: `Put the full ${amt.toLocaleString()} into stocks this afternoon.`, points: 1, feedback: "The principle's right but the order's wrong. Secure the foundation and check their goals FIRST - investing a windfall before you've made a plan is planning backwards." },
        { text: "Tell them to enjoy it and buy something fun.", points: 0, feedback: "A small celebration is fine; blowing a windfall is how people end up right back where they started. Your job is to make it last." },
      ],
    }
  },
  (c, _m, r) => ({
    headline: `${c.name.split(" ")[0]} lost their job`,
    situation: `${c.name.split(" ")[0]} was just laid off and is anxious about money while job-hunting. They ask whether to sell investments to cover the bills.`,
    question: "What's the plan?",
    choices: [
      { text: "Use the emergency cash and leave the investments untouched.", points: 2, feedback: "This is exactly why you built the cash cushion. Selling growth investments in a pinch is a last resort, not the first move." },
      { text: "Sell a chunk of stocks right away, just in case.", points: 1, feedback: "Understandable fear, but cashing out investments before tapping the emergency fund often means selling at a bad time. Use the buffer you built first." },
      { text: "Put the bills on a credit card to avoid selling.", points: 0, feedback: `A card at ${pick(r, ["22", "25", "27"])}% interest digs a deeper hole fast. The emergency fund exists for precisely this moment - that's what it's for.` },
    ],
  }),
  (c, _m, r) => {
    const rate = int(r, 30, 60)
    return {
      headline: `A "sure thing" is chasing ${c.name.split(" ")[0]}`,
      situation: `A slick stranger promised ${c.name.split(" ")[0]} a "guaranteed ${rate}% a year, zero risk" fund, but only if they wire money before it "closes Friday." They're excited.`,
      question: "Your response?",
      choices: [
        { text: "Call it what it is: a scam. Steer them clear.", points: 2, feedback: `You likely just saved their savings. 'Guaranteed ${rate}%, no risk, act now' is the exact signature of fraud - real investing always trades risk for return.` },
        { text: "Suggest they test it with just a small amount first.", points: 1, feedback: "Scams don't get safe in small doses - and an early fake 'payout' is the exact hook that lures victims all-in. Keep them out entirely." },
        { text: "Help them wire it before Friday's deadline.", points: 0, feedback: "Manufactured urgency is the scammer's favorite tool. Rushing a client into a 'sure thing' is how their money disappears." },
      ],
    }
  },
  (c, _m, r) => ({
    headline: `${c.name.split(" ")[0]} is nearly at their goal`,
    situation: `${c.name.split(" ")[0]} is now about ${Math.min(c.goal.horizon, int(r, 1, 3))} years from ${c.goal.label}, but their portfolio is still stock-heavy from the early years.`,
    question: "Does anything change?",
    choices: [
      { text: "Ease toward bonds and cash to protect the near goal.", points: 2, feedback: "The glide path in action. What was right with 20 years to go is dangerous with 2 - protect the goal as it gets close." },
      { text: "Leave it fully in stocks - it's grown great so far.", points: 0, feedback: "'It worked so far' ignores the timeline. A crash right before the goal can erase years of gains with no time left to recover." },
      { text: "Slam it all into cash today to be safe.", points: 1, feedback: "Too abrupt - even a near-term goal usually has room for some growth, and all-cash invites inflation. Ease over, don't yank the wheel." },
    ],
  }),
  (c, _m, r) => {
    const buy = pick(r, ["a fancy new car", "a boat", "a bigger house", "a luxury vacation package"])
    return {
      headline: `${c.name.split(" ")[0]} wants to splurge`,
      situation: `Feeling flush after a good stretch, ${c.name.split(" ")[0]} wants to pull a large sum out to buy ${buy} right now - well beyond what their plan set aside for fun.`,
      question: "How do you handle it?",
      choices: [
        { text: "Check it against their goals, then right-size the splurge.", points: 2, feedback: "You don't say no - you show them what pulling that much does to their timeline, then help them enjoy a version that doesn't rob their future self. Lifestyle creep is a quiet goal-killer." },
        { text: "Say a flat no - they can't touch the money.", points: 1, feedback: "Being the 'money police' just gets you fired and ignored. The skill is showing the trade-off and finding a fit, not forbidding all joy." },
        { text: "Sure - sell whatever it takes; they've earned it.", points: 0, feedback: "Cashing out on a whim after a good run is textbook 'buy high, sell high on yourself.' Unchecked splurges are how great savers slowly undo their own plan." },
      ],
    }
  },
  (c, _m, r) => ({
    headline: `${c.name.split(" ")[0]} wants to time the market`,
    situation: `${c.name.split(" ")[0]} read that "a big drop is coming" and wants to sell everything now, sit in cash, and buy back in right before the recovery.`,
    question: "Your advice?",
    choices: [
      { text: "Stay invested - nobody can time it twice.", points: 2, feedback: "Timing the market means being right twice: when to get out AND when to get back in. Even pros miss, and missing a few best days wrecks returns. Time IN the market beats timing it." },
      { text: "Move a small slice to cash to steady their nerves.", points: 1, feedback: "A tiny 'sleep-well' adjustment can be worth it to prevent a bigger mistake - but be clear it's about their nerves, not a real forecast. Don't dress guessing up as strategy." },
      { text: "Agree - go fully to cash and buy back at the bottom.", points: 0, feedback: "'Watch and buy the bottom' never works in practice - the rebound's biggest days come while it still feels scary. This is how market-timers underperform just sitting still." },
    ],
  }),
]

/** This week's coaching moment for a client, matched to the market. Order shuffled. */
export function generateReviewScenario(c: ClientHousehold, week: number, m: MarketRegime): ReviewScenario {
  const r = mulberry32(hashStr(`wm-review:${c.id}:${week}`))
  let s: ReviewScenario
  if (m.volatile) s = PANIC(c, m, r)
  else if (m.id === "bull" || m.id === "recovery") s = r() < 0.55 ? CHASE(c, m, r) : pick(r, LIFE)(c, m, r)
  else s = pick(r, LIFE)(c, m, r)
  return { ...s, choices: shuffleChoices(r, s.choices) }
}

export interface ReviewResult {
  patch: Partial<ClientHousehold>
  fee: number
  repDelta: number
  outcome: string
  left: boolean
}

/**
 * Apply the weekly review: the market moves the portfolio, the student's
 * coaching adds or subtracts on top (a panicked client who's badly advised
 * locks in extra losses), the advisory fee is billed, trust shifts, and a
 * client who's lost faith walks away with their AUM.
 */
export function applyReview(c: ClientHousehold, week: number, m: MarketRegime, choice: ReviewChoice, idx: number): ReviewResult {
  const r = mulberry32(hashStr(`wm-apply:${c.id}:${week}:${idx}`))

  const marketRet = portfolioReturn(c.alloc, m)
  // Behaviour effect: great coaching protects (and rebalances) the client; poor
  // coaching lets them hurt themselves, amplified when markets are volatile.
  const amp = m.volatile ? 1.6 : 1
  let behavior: number
  if (choice.points === 2) behavior = 0.006
  else if (choice.points === 1) behavior = -0.012 * amp
  else behavior = -0.07 * amp
  behavior += (r() - 0.5) * 0.01

  const newAssets = Math.max(1, Math.round(c.assets * (1 + marketRet + behavior)))
  const fee = Math.max(1, Math.round(newAssets * WM_REVIEW_FEE))

  // Trust: clients especially remember steadiness (or the lack of it) in storms.
  let sat = choice.points === 2 ? 8 : choice.points === 1 ? -2 : -14
  if (m.volatile) sat += choice.points === 2 ? 4 : choice.points === 0 ? -6 : 0
  const satisfaction = Math.min(100, Math.max(0, c.satisfaction + sat))

  // A delighted client sometimes brings you more money to manage (referrals /
  // consolidating other accounts) - the compounding heart of an AUM business.
  let assets = newAssets
  let referralNote = ""
  if (satisfaction >= 80 && choice.points === 2 && r() < 0.45) {
    const add = Math.round(newAssets * (0.1 + r() * 0.15))
    assets += add
    referralNote = ` Thrilled, they moved another ${add.toLocaleString()} coins to you and referred a friend.`
  }

  const status: ClientHousehold["status"] = satisfaction >= 70 ? "happy" : satisfaction >= 40 ? "content" : "worried"
  const left = satisfaction <= 20

  const retPct = Math.round((marketRet + behavior) * 100)
  const sign = retPct >= 0 ? "+" : ""
  const grade = choice.points === 2 ? "Great call" : choice.points === 1 ? "Okay call" : "Rough call"

  const patch: Partial<ClientHousehold> = {
    assets, satisfaction, status, lastReviewWeek: week,
    assetHistory: [...c.assetHistory, { week, assets }].slice(-12),
    events: [...c.events, { week, text: `${m.emoji} ${m.label}: portfolio ${sign}${retPct}% to ${assets.toLocaleString()}. ${grade} (trust ${sat >= 0 ? "+" : ""}${sat}). Fee ${fee.toLocaleString()}.${referralNote}` }].slice(-10),
  }
  const leftNote = left ? ` 💔 ${c.name} has lost faith and moved their ${assets.toLocaleString()} coins to another advisor. Trust, once gone, is hard to win back.` : ""
  const outcome = `${choice.feedback} With the ${m.label.toLowerCase()}, ${c.name}'s portfolio went ${sign}${retPct}% to ${assets.toLocaleString()} coins. You earned a ${fee.toLocaleString()}-coin advisory fee.${referralNote}${leftNote}`
  return { patch, fee, repDelta: choice.points === 2 ? 3 : choice.points === 1 ? 1 : -2, outcome, left }
}
