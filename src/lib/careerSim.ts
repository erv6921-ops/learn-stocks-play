// careerSim - the "living job" layer that keeps a finance career going for
// months, the way businessSim keeps the Micro-Business alive.
//
// Careers run on a weekly loop: every week your desk gets a procedurally
// generated deal (numbers and companies randomized, correct answers computed
// by rule - no AI), plus an occasional office moment. Completing the week
// pays a rank-based salary + a performance bonus scaled by reputation.
// Authored "milestone" deals from data/careers.ts act as promotion cases:
// you can't rank up past certain rungs without closing one.
//
// Deals are generated deterministically from (careerId, week) so a reload
// mid-week always shows the same deal.

import type { CareerDeal, CareerStage, CareerChoice } from "@/data/careers"

/* ── deterministic RNG ─────────────────────────────────────────────── */

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

/** Deterministically shuffle choices so the best answer isn't always first. */
function shuffled(rng: Rng, choices: CareerChoice[]): CareerChoice[] {
  const a = [...choices]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* ── name pools ────────────────────────────────────────────────────── */

const IB_TARGETS = ["FizzWorks", "SnackStorm", "CloudNine Games", "PetPantry", "GlowTech", "UrbanWheels", "FreshBite Foods", "ZipCharge", "NovaMedia", "TrailBlaze Gear"]
const IB_BUYERS = ["MegaSnack Corp", "TitanSoft", "GlobalGoods Inc.", "Apex Brands", "SummitWorks", "OmniPlay Group"]
const IB_SECTORS = ["snack", "gaming", "pet care", "tech", "delivery", "media"]

const PE_TARGETS = ["Rosie's Bakeries", "QuickFix Repair Co.", "SunnySide Gyms", "PageTurner Books", "SpotlessCo Cleaning", "GreenThumb Landscaping", "WrenchWorks Auto", "CozyNest Furniture"]
const PE_FLAWS = [
  { flaw: "every location orders supplies separately, paying full price", lever: "Combine purchasing across locations for bulk discounts", wrong1: "Double all prices immediately", wrong2: "Fire half the staff on day one" },
  { flaw: "it doesn't take online orders at all - phone only", lever: "Add simple online ordering that feeds the existing stores", wrong1: "Close the physical locations and go online-only", wrong2: "Hire a celebrity spokesperson first" },
  { flaw: "3 of its locations lose money while the rest thrive", lever: "Diagnose the losing locations - fix the fixable, close the rest", wrong1: "Close every location that isn't #1", wrong2: "Ignore it - the winners cover the losers" },
  { flaw: "its prices haven't changed in 9 years despite rising costs", lever: "Raise prices carefully with better packaging of the offer", wrong1: "Triple prices overnight across the board", wrong2: "Cut quality to protect the old prices" },
  { flaw: "the owner does everything personally and nothing is written down", lever: "Document the playbook and train managers before the owner exits", wrong1: "Let the owner leave immediately after closing", wrong2: "Replace all employees with new hires" },
]

const VC_STARTUPS = ["LoopDrop", "StudyBuddy", "PlantPal", "SwapKit", "RoboChef", "TuneTown", "BikeBrain", "SnapStore", "MindMaze", "EcoBox"]
const VC_GOOD = [
  { desc: "two founders who quit their jobs, {n} users growing {g}% every month, and users who complain loudly whenever the app goes down", why: "Fast growth plus users who *care* is the strongest early signal there is" },
  { desc: "an ugly app that {n} schools already pay for, growing {g}% monthly by word of mouth alone", why: "Paying customers and organic growth beat polish every time - design is buyable, love isn't" },
  { desc: "a tiny team shipping every week, {n} users, {g}% monthly growth, and a waitlist they can't keep up with", why: "Shipping speed + demand outrunning supply is exactly what early rockets look like" },
]
const VC_BAD = [
  { desc: "a founder in a designer suit with a slide predicting a billion users, no product, and 'confidential' answers to every technical question", why: "Big claims + no product + dodging questions is the classic hype pattern" },
  { desc: "a polished demo, a paid celebrity endorsement, zero actual users, and a founder who keeps his 'backup job'", why: "Polish without users is a movie set - and a founder with one foot out the door quits when it gets hard" },
  { desc: "a 'revolutionary' app with 50 features, none finished, whose founder blames users for not understanding it", why: "Unfocused product + founder who doesn't listen = burning money" },
]

const WM_CLIENTS = [
  { name: "Maya", age: 24, job: "nurse", horizon: "40 years from retirement" },
  { name: "Dev", age: 35, job: "electrician", horizon: "30 years from retirement" },
  { name: "Grace", age: 58, job: "professor", horizon: "retiring in 7 years" },
  { name: "Sam", age: 67, job: "retired firefighter", horizon: "already retired" },
  { name: "Lena", age: 41, job: "chef", horizon: "25 years from retirement" },
]
const WM_SCAMS = [
  "a 'guaranteed' 45% yearly return with zero risk from a cousin's crypto fund",
  "a hot stock tip from a stranger online who 'guarantees' it triples by Friday",
  "an 'exclusive' investment that's only available if they wire money TODAY",
  "a trading course promising to turn 1,000 into 100,000 in six months, risk-free",
]

/* ── per-career deal generators ────────────────────────────────────── */

function money(n: number): string {
  return n >= 1_000_000 ? `${Math.round(n / 100_000) / 10}M` : n.toLocaleString()
}

function ibDeal(rng: Rng, fee: number, week: number): CareerDeal {
  const target = pick(rng, IB_TARGETS)
  const buyer = pick(rng, IB_BUYERS)
  const sector = pick(rng, IB_SECTORS)
  const profit = int(rng, 2, 18) * 1_000_000
  const multiple = int(rng, 4, 8)
  const fair = profit * multiple
  const demand = Math.round(fair * (1.15 + rng() * 0.2))

  const stages: CareerStage[] = [
    {
      situation: `${buyer} wants to acquire ${target}, a ${sector} company earning ${money(profit)} coins of profit a year. Similar ${sector} companies have sold for about ${multiple}× their yearly profit.`,
      question: `What's a fair starting valuation for ${target}?`,
      choices: shuffled(rng, [
        { text: `About ${money(fair)} coins - ${multiple}× its yearly profit, like its peers`, points: 2, feedback: `${money(profit)} × ${multiple} = ${money(fair)}. Valuing off comparable companies is the banker's first move.` },
        { text: `${money(profit)} coins - one year of profit`, points: 0, feedback: `Far too low - companies earn profit year after year, so buyers pay a multiple of one year's earnings.` },
        { text: `${money(fair * 2)} coins - bid huge so they say yes fast`, points: 0, feedback: `Double the fair price? Overpaying is the #1 way acquisitions destroy value.` },
      ]),
    },
    {
      situation: pick(rng, [
        `Due diligence uncovers that ${target}'s star product manager - the one behind its best sellers - is quietly interviewing elsewhere.`,
        `Due diligence uncovers that ${target}'s biggest customer, worth a quarter of its sales, just signed with a rival.`,
        `Due diligence uncovers that ${target} has been delaying equipment repairs to make profits look bigger this year.`,
        `Due diligence uncovers a lawsuit against ${target} that could cost it a year of profit if it loses.`,
      ]),
      question: `What do you tell ${buyer}?`,
      choices: shuffled(rng, [
        { text: "Share the finding and adjust the offer price down to match the new risk", points: 2, feedback: "Exactly why due diligence exists - bad news changes the price, not necessarily the deal." },
        { text: "Keep quiet - it might spook your client off a fee-paying deal", points: 0, feedback: "Hiding findings from your own client is how bankers lose their reputation - their entire business." },
        { text: "Advise abandoning the deal instantly", points: 1, feedback: "Cautious, but hasty - most findings can be priced in. Kill the price, not always the deal." },
      ]),
    },
    {
      situation: `${target}'s owners demand ${money(demand)} coins. Your post-diligence analysis says it's worth ${money(fair)}. They insist they "won't take a coin less."`,
      question: "Your negotiation move?",
      choices: shuffled(rng, [
        { text: `Counter at ${money(fair)} with your analysis attached, leaving room to meet in the middle`, points: 2, feedback: "Anchor to data, stay flexible - the classic playbook. The deal closed between the two numbers." },
        { text: `Agree to ${money(demand)} - they sound serious`, points: 0, feedback: `"Sounding serious" is a negotiation tactic. You'd have overpaid by ${money(demand - fair)} coins.` },
        { text: "Walk away without countering", points: 1, feedback: "Walking is a real tactic - but without a counteroffer you waste months of work and any path to yes." },
      ]),
    },
  ]

  return {
    id: `gen-ib-${week}`,
    title: `Project ${pick(rng, ["Falcon", "Comet", "Anchor", "Summit", "Orbit", "Blue Sky", "Redwood", "Thunder"])}`,
    client: buyer,
    tagline: `${buyer} wants to buy ${target}. Value it, vet it, negotiate it.`,
    difficulty: "Junior",
    baseFee: fee,
    stages,
  }
}

function peDeal(rng: Rng, fee: number, week: number): CareerDeal {
  const target = pick(rng, PE_TARGETS)
  const flaw = pick(rng, PE_FLAWS)
  const buyPrice = int(rng, 3, 12) * 1_000_000
  const nowMult = 2 + Math.round(rng() * 10) / 10 // 2.0-3.0×
  const maybeMult = nowMult + 1

  const stages: CareerStage[] = [
    {
      situation: `${target} is for sale at a reasonable ${money(buyPrice)} coins. Customers love it, but ${flaw.flaw}.`,
      question: "Is this a good buyout target?",
      choices: shuffled(rng, [
        { text: "Yes - a loved product with a fixable operational flaw is exactly what PE buys", points: 2, feedback: "The PE mindset: fixable problems are why the price is low. You buy problems you know how to solve." },
        { text: "No - never buy a business with visible problems", points: 0, feedback: "A perfect company costs a perfect price. The discount *is* the flaw - and this one is fixable." },
        { text: "Only if the seller fixes everything first", points: 1, feedback: "If they fix it first, the price doubles and your opportunity is gone. You are the fixer." },
      ]),
    },
    {
      situation: `You own ${target} now. Time for your first value-creation move.`,
      question: "What's the play?",
      choices: shuffled(rng, [
        { text: flaw.lever, points: 2, feedback: "Straight at the flaw you underwrote. Operational improvement is the heart of private equity." },
        { text: flaw.wrong1, points: 0, feedback: "Aggressive and off-target - it attacks the customers or the value instead of the actual flaw." },
        { text: flaw.wrong2, points: 1, feedback: "Not fatal, but it dodges the flaw you bought the company to fix. Fix the diagnosed problem first." },
      ]),
    },
    {
      situation: `Three years of improvements later, ${target}'s profits are way up. A buyer offers ${nowMult}× your money today. Your analysts think holding two more years *might* fetch ${maybeMult}× - if trends hold.`,
      question: "Exit now or hold?",
      choices: shuffled(rng, [
        { text: `Take the certain ${nowMult}× - funds return money in 3-5 years, and "might" isn't "will"`, points: 2, feedback: "Textbook exit discipline. A guaranteed multiple beats a hopeful one; buy, improve, sell, repeat." },
        { text: `Hold for ${maybeMult}× - always maximize`, points: 1, feedback: "Defensible… until trends wobble. 'Maximize' at the end of a deal usually means 'took too much risk'." },
        { text: "Never sell - collect profits forever", points: 0, feedback: "PE funds *must* sell to return investors' money. Exiting is the business model." },
      ]),
    },
  ]

  return {
    id: `gen-pe-${week}`,
    title: `The ${pick(rng, ["Turnaround", "Roll-Up", "Rebuild", "Revival", "Makeover", "Comeback"])}: ${target.split(" ")[0]}`,
    client: target,
    tagline: `Buy ${target}, fix what's broken, exit well.`,
    difficulty: "Junior",
    baseFee: fee,
    stages,
  }
}

function vcDeal(rng: Rng, fee: number, week: number): CareerDeal {
  const nameA = pick(rng, VC_STARTUPS)
  let nameB = pick(rng, VC_STARTUPS)
  if (nameB === nameA) nameB = VC_STARTUPS[(VC_STARTUPS.indexOf(nameA) + 1) % VC_STARTUPS.length]
  const good = pick(rng, VC_GOOD)
  const bad = pick(rng, VC_BAD)
  const users = int(rng, 3, 40) * 100
  const growth = int(rng, 25, 60)
  const goodDesc = good.desc.replace("{n}", users.toLocaleString()).replace("{g}", String(growth))
  const goodFirst = rng() < 0.5
  const mult = int(rng, 6, 15)

  const stages: CareerStage[] = [
    {
      situation: `Two startups pitch you back to back. ${goodFirst ? nameA : nameB} has ${goodDesc}. ${goodFirst ? nameB : nameA} has ${bad.desc}.`,
      question: "Which one gets your check?",
      choices: shuffled(rng, [
        { text: `${goodFirst ? nameA : nameB} - the one with real users and real growth`, points: 2, feedback: good.why + "." },
        { text: `${goodFirst ? nameB : nameA} - it just *feels* bigger`, points: 0, feedback: bad.why + " - you invested in a story with nothing behind it." },
        { text: "Split your check between both, just in case", points: 1, feedback: "FOMO investing. Small checks into weak companies still add up to real losses - conviction picks one." },
      ]),
    },
    {
      situation: `You have 1M coins to deploy this year. Startup history is brutal: out of 10 companies, about 5 die, 3 give your money back, 1 doubles, and 1 returns 20×. Nobody can tell which is which in advance.`,
      question: "How do you deploy it?",
      choices: shuffled(rng, [
        { text: "Spread across ~10 companies - enough shots for the one big winner to show up", points: 2, feedback: "The power law! One 20× winner pays for every loser - but only if you take enough swings." },
        { text: "All of it into your single favorite", points: 0, feedback: "A coin flip away from zero. Conviction chooses *which* ten - it doesn't excuse betting on one." },
        { text: "100 companies, tiny checks each", points: 1, feedback: "Over-diversified - checks that small buy no meaningful ownership and no seat at the table." },
      ]),
    },
    {
      situation: `A year later your investment in ${goodFirst ? nameA : nameB} is on fire - worth ${mult}× what you paid, growing faster than ever. A new funding round is open: you can invest more at the higher price, or sit tight and let your slice shrink a little.`,
      question: "Follow on?",
      choices: shuffled(rng, [
        { text: "Invest more - feed the winner; the risk is way lower than when you first bet", points: 2, feedback: "The golden rule: double down on proven winners. It 'feels' expensive all the way up - that's what winning looks like." },
        { text: `Sell everything and lock in the ${mult}×`, points: 0, feedback: `You sold the fund's rocket at the launchpad - power-law winners are exactly the ones you must hold.` },
        { text: "Do nothing and let your ownership shrink", points: 1, feedback: "Not fatal, but passive - the best VC returns come from concentrating into what's working." },
      ]),
    },
  ]

  return {
    id: `gen-vc-${week}`,
    title: `Pitch Day: ${nameA} vs ${nameB}`,
    client: "Your fund",
    tagline: `Two pitches, one check, and the brutal math of venture.`,
    difficulty: "Junior",
    baseFee: fee,
    stages,
  }
}

function wmDeal(rng: Rng, fee: number, week: number): CareerDeal {
  const client = pick(rng, WM_CLIENTS)
  const savings = int(rng, 2, 40) * 10_000
  const scam = pick(rng, WM_SCAMS)
  const young = client.age < 50
  const drop = int(rng, 15, 30)

  const alloc = young
    ? {
        best: { text: "Mostly stocks, small bond cushion - decades of time heals dips and compounds growth", fb: `With ${client.horizon}, time is ${client.name}'s superpower - growth assets win long horizons.` },
        mid: { text: "Half cash 'to be safe', half stocks", fb: "That much idle cash quietly loses to inflation for decades - 'safe' that costs a fortune." },
        worst: { text: "All of it into one exciting stock", fb: "One company can go to zero. Diversification is rule #1 of managing other people's money." },
      }
    : {
        best: { text: "Shift toward bonds and cash while keeping some stocks for growth", fb: `${client.name} will *spend* this money soon - a crash right before/during retirement can't be waited out.` },
        mid: { text: "Move 100% to cash immediately", fb: "Too far - retirement can last 30 years, and all-cash guarantees inflation erodes it." },
        worst: { text: "Keep it aggressive - stocks always come back eventually", fb: "'Eventually' is the problem: retirees withdrawing during a crash can run out entirely (sequence risk)." },
      }

  const stages: CareerStage[] = [
    {
      situation: `${client.name}, ${client.age}, a ${client.job} with ${money(savings)} coins saved, is ${client.horizon}. They ask you how it should be invested.`,
      question: `What's the right mix for ${client.name}?`,
      choices: shuffled(rng, [
        { text: alloc.best.text, points: 2, feedback: alloc.best.fb },
        { text: alloc.mid.text, points: 1, feedback: alloc.mid.fb },
        { text: alloc.worst.text, points: 0, feedback: alloc.worst.fb },
      ]),
    },
    {
      situation: `${client.name} calls, excited about ${scam}. They want to move a third of their portfolio into it.`,
      question: "Your advice?",
      choices: shuffled(rng, [
        { text: "High guaranteed returns with no risk don't exist - this is the signature of a scam", points: 2, feedback: "Real investing always trades risk for return. 'Guaranteed + huge + urgent' is THE fraud pattern." },
        { text: "Allow a small amount - what's the harm in a taste?", points: 1, feedback: "Scams don't get safer in small doses - and a 'taste' that pays out early is how victims get pulled all-in." },
        { text: "Approve it - the returns would transform the plan", points: 0, feedback: "If it sounds too good to be true, it isn't true. No exceptions - not for family, not for urgency." },
      ]),
    },
    {
      situation: `Markets tumble ${drop}% on scary headlines. ${client.name} texts you at night: "Sell everything before it goes lower!!"`,
      question: "Your reply?",
      choices: shuffled(rng, [
        { text: "Call them now: the plan was built for exactly this - selling locks in the loss", points: 2, feedback: "Talking clients off the ledge in a dip is where advisors earn their fee. Panic-selling is the #1 wealth destroyer." },
        { text: "Sell half - meet the panic in the middle", points: 0, feedback: "Half-panicking is still panicking - it locks in losses on money that had time to recover." },
        { text: "Reply in the morning during office hours", points: 1, feedback: "Technically fine, relationally fatal - scary nights are when clients decide if they trust you." },
      ]),
    },
  ]

  return {
    id: `gen-wm-${week}`,
    title: `Client File: ${client.name}`,
    client: `${client.name}, ${client.age} - ${client.job}`,
    tagline: `A ${client.job} with ${money(savings)} coins needs a plan they can sleep through.`,
    difficulty: "Junior",
    baseFee: fee,
    stages,
  }
}

/* ── public API ────────────────────────────────────────────────────── */

const GENERATORS: Record<string, (rng: Rng, fee: number, week: number) => CareerDeal> = {
  "investment-banker": ibDeal,
  "private-equity": peDeal,
  "venture-capitalist": vcDeal,
  "wealth-manager": wmDeal,
}

/** Weekly deal fee grows with rank so promotions feel like real raises. */
export function feeForRank(rankIndex: number): number {
  return 150 + rankIndex * 100
}

/** Weekly base salary by rank, paid on completing the week's deal. */
export function salaryForRank(rankIndex: number): number {
  return 60 + rankIndex * 70
}

/** Deterministic deal for a given career-week. Same week ⇒ same deal. */
export function generateWeekDeal(careerId: string, week: number, rankIndex: number): CareerDeal {
  const rng = mulberry32(hashStr(`${careerId}:${week}`))
  const gen = GENERATORS[careerId]
  const deal = gen(rng, feeForRank(rankIndex), week)
  deal.difficulty = rankIndex >= 4 ? "Senior" : rankIndex >= 2 ? "Mid" : "Junior"
  return deal
}

/* ── office moments ────────────────────────────────────────────────── */
// Small one-tap culture/judgment beats between deals. Reputation (0-100)
// scales the weekly bonus, so these little calls compound over a career.

export interface OfficeMoment {
  emoji: string
  text: string
  options: { label: string; rep: number; reaction: string }[]
}

const OFFICE_MOMENTS: OfficeMoment[] = [
  {
    emoji: "🧮",
    text: "You spot a small error in a teammate's spreadsheet minutes before it goes to the client.",
    options: [
      { label: "Flag it quietly and help fix it", rep: 6, reaction: "Fixed before anyone noticed. Your teammate owes you one - and tells everyone you're solid." },
      { label: "Say nothing - not your model", rep: -6, reaction: "The client caught it. The whole team looked sloppy, and people remember you saw it." },
    ],
  },
  {
    emoji: "🌙",
    text: "It's late. You could double-check tomorrow's numbers one more time, or head home.",
    options: [
      { label: "One more pass", rep: 5, reaction: "You caught a stale figure. The morning meeting went perfectly." },
      { label: "It's fine, ship it", rep: -4, reaction: "A stale number slipped through. Not fatal - but noticed." },
    ],
  },
  {
    emoji: "🗣️",
    text: "A senior colleague takes credit for your analysis in the big meeting.",
    options: [
      { label: "Follow up calmly with your work attached", rep: 6, reaction: "The boss noticed the file history. Handled with class - credibility up." },
      { label: "Call them out in front of everyone", rep: -5, reaction: "You were right, but the blow-up is all anyone remembers." },
    ],
  },
  {
    emoji: "🤫",
    text: "A friend at another firm asks 'as a favor' what deal your team is working on.",
    options: [
      { label: "Keep it confidential - change the subject", rep: 7, reaction: "Deals live on trust. Word quietly gets around that you're vault-tight." },
      { label: "Share a hint - what's the harm?", rep: -9, reaction: "The hint traveled. Compliance had questions. Ouch." },
    ],
  },
  {
    emoji: "📚",
    text: "A new intern is drowning in a task you mastered ages ago.",
    options: [
      { label: "Take 15 minutes to teach them", rep: 5, reaction: "They ship it in half the time - and your name comes up when people say 'great teammate'." },
      { label: "Too busy - let them struggle", rep: -3, reaction: "They figured it out at 2am. The team lead noticed who didn't help." },
    ],
  },
  {
    emoji: "⚖️",
    text: "You realize yesterday's memo to a client contained a number you now know is wrong.",
    options: [
      { label: "Correct it immediately, own the mistake", rep: 7, reaction: "The client thanked you for the fast correction. Trust: up, not down." },
      { label: "Hope nobody notices", rep: -8, reaction: "They noticed. The silence hurt more than the error would have." },
    ],
  },
  {
    emoji: "🏃",
    text: "Two urgent requests land at once: your boss's slide deck and a client's data question.",
    options: [
      { label: "Ask which is truly first, then communicate timing to both", rep: 6, reaction: "Both got done, nobody was surprised, everyone felt handled. That's the skill." },
      { label: "Grind silently on both and hope", rep: -3, reaction: "Both landed late with no warning. The work was fine; the silence wasn't." },
    ],
  },
  {
    emoji: "🎉",
    text: "Your team closes a big one. At the celebration, a director asks what YOU want to learn next.",
    options: [
      { label: "Name a real skill and ask to be staffed on it", rep: 6, reaction: "Directors love a plan. You're on the next big deal team." },
      { label: "Shrug - 'whatever needs doing'", rep: 0, reaction: "Agreeable, forgettable. Careers are steered, not drifted." },
    ],
  },
]

/** Office moment for a week, or null (~half of weeks). Deterministic. */
export function momentForWeek(careerId: string, week: number): OfficeMoment | null {
  const rng = mulberry32(hashStr(`moment:${careerId}:${week}`))
  if (rng() < 0.45) return null
  return OFFICE_MOMENTS[Math.floor(rng() * OFFICE_MOMENTS.length)]
}

/** Reputation scales the performance bonus: 0.75× at rep 0 → 1.25× at rep 100. */
export function repMultiplier(rep: number): number {
  return 0.75 + (rep / 100) * 0.5
}

/* ── written deliverables ──────────────────────────────────────────── */
// Every deal ends with real writing, the way Micro-Business situations
// demand a written reaction. The memo is required to close the week; hitting
// the word minimum earns extra XP and a writing stipend, and the piece is
// filed into the student's "work file" so their writing accumulates.

export const MEMO_MIN_WORDS = 40
export const MEMO_XP = 2

/** Coins paid for a completed memo, growing with rank like a real raise. */
export function memoPay(rankIndex: number): number {
  return 40 + rankIndex * 15
}

const MEMO_PROMPTS: Record<string, { title: string; prompt: string }> = {
  "investment-banker": {
    title: "Deal memo",
    prompt: "Write your deal memo to the client: what you recommended at each step, and the reasoning a CEO could follow.",
  },
  "private-equity": {
    title: "Investor update",
    prompt: "Write your investor update: why you bought it, what you changed, and how the exit went - investors want the story AND the numbers.",
  },
  "venture-capitalist": {
    title: "Investment note",
    prompt: "Write your investment note for the fund: which bet you made, the signals you weighed, and what would make you change your mind.",
  },
  "wealth-manager": {
    title: "Client letter",
    prompt: "Write a letter to your client in plain words: what you advised, why it fits THEIR life, and what they should do next.",
  },
}

export function memoSpec(careerId: string) {
  return MEMO_PROMPTS[careerId] ?? { title: "Memo", prompt: "Write up what you did this week and why." }
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}
