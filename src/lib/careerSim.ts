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
const VC_FOUNDERS = ["Ava", "Marcus", "Priya", "Diego", "Nina", "Kofi", "Sofia", "Ren", "Tariq", "Elena", "Jonah", "Mei"]

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

// A Venture Capitalist's real job is far more than "pick between two pitches".
// Each week we compose a deal from THREE distinct scenario archetypes drawn
// from the actual arc of venture work - sourcing, diligence, term sheets,
// board seats, down rounds, follow-ons, reserves, secondaries, exits. Picking
// 3 different ones per week (deterministically) means no two weeks feel alike.

interface VcCtx {
  co: string       // the week's primary portfolio/target company
  coB: string      // a second company, for comparison scenarios
  founder: string  // its founder, for continuity across stages
  users: number
  growth: number
}

interface VcArche {
  id: string
  /** Fund-level calls list "Your fund" as the client; company calls name the co. */
  scope: "fund" | "company"
  title: string
  tagline: (c: VcCtx) => string
  build: (rng: Rng, c: VcCtx) => CareerStage
}

/** Deterministically pick n distinct items from arr (Fisher-Yates prefix). */
function pickDistinct<T>(rng: Rng, arr: readonly T[], n: number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, n)
}

const VC_ARCHES: VcArche[] = [
  {
    id: "pitch",
    scope: "fund",
    title: "Pitch Day",
    tagline: () => "Founders pitch you back to back. Spot the one worth backing.",
    build: (rng, c) => {
      const good = pick(rng, VC_GOOD)
      const bad = pick(rng, VC_BAD)
      const goodDesc = good.desc.replace("{n}", c.users.toLocaleString()).replace("{g}", String(c.growth))
      const goodFirst = rng() < 0.5
      return {
        situation: `Two startups pitch you back to back. ${goodFirst ? c.co : c.coB} has ${goodDesc}. ${goodFirst ? c.coB : c.co} has ${bad.desc}.`,
        question: "Which one gets your check?",
        choices: shuffled(rng, [
          { text: `${goodFirst ? c.co : c.coB} - real users, real growth`, points: 2, feedback: good.why + "." },
          { text: `${goodFirst ? c.coB : c.co} - it just *feels* bigger`, points: 0, feedback: bad.why + " - a story with nothing behind it." },
          { text: "Split your check between both, just in case", points: 1, feedback: "FOMO investing. Small checks into weak companies still add up to real losses - conviction picks one." },
        ]),
      }
    },
  },
  {
    id: "sourcing",
    scope: "fund",
    title: "Deal Hunting",
    tagline: () => "The best startups don't come to you. Go find them first.",
    build: (rng) => ({
      situation: "Your fund can only invest in deals it hears about early. This month you need to find promising startups before rival funds do.",
      question: "What's the best way to find great deals?",
      choices: shuffled(rng, [
        { text: "Build a network - ask founders you respect who the smartest people they know are building", points: 2, feedback: "The best deals travel by trusted referral. Great founders know other great founders - warm intros are venture's lifeblood." },
        { text: "Email 500 random startups the same copy-pasted message", points: 0, feedback: "Spray-and-pray gets ignored and marks you as a tourist. The startups worth backing already get ten of those a day." },
        { text: "Only invest in companies already famous and in the news", points: 1, feedback: "By the time it's in the news, the round is full and the price is sky-high. VC edge comes from being early, not from headlines." },
      ]),
    }),
  },
  {
    id: "diligence",
    scope: "company",
    title: "The Reference Call",
    tagline: c => `Before you wire a coin, do the homework on ${c.co}.`,
    build: (rng, c) => {
      const claimed = int(rng, 40, 90) * 1000
      const real = Math.round(claimed * (0.35 + rng() * 0.2))
      return {
        situation: `You love ${c.co} and are ready to invest. But on a reference call, a former colleague reveals ${c.founder} told you it has ${claimed.toLocaleString()} users - when the real number is closer to ${real.toLocaleString()}.`,
        question: "What do you do?",
        choices: shuffled(rng, [
          { text: `Ask ${c.founder} about the gap directly before investing`, points: 2, feedback: "How a founder handles being caught tells you everything. An honest explanation might save the deal; a lie ends it - either way you needed to know." },
          { text: "Invest anyway - every founder rounds up a little", points: 0, feedback: "A 2× exaggeration isn't 'rounding up' - it's the exact number you're paying for. Founders who inflate now will inflate when it matters most." },
          { text: "Walk away silently and warn other investors they're frauds", points: 1, feedback: "Right to be cautious, wrong to smear before asking. Maybe it was a typo or a different metric - check first; gossip, never." },
        ]),
      }
    },
  },
  {
    id: "termsheet",
    scope: "company",
    title: "The Term Sheet",
    tagline: c => `${c.founder} wants to raise money. Agree on a fair price.`,
    build: (rng, c) => {
      const fair = int(rng, 20, 40)
      const ask = fair * 2 + int(rng, 0, 20)
      return {
        situation: `${c.founder}, founder of ${c.co}, wants to raise at a ${ask}M valuation. Based on real revenue and growth, similar startups are worth around ${fair}M.`,
        question: "How do you respond to the high asking price?",
        choices: shuffled(rng, [
          { text: `Explain a ~${fair}M valuation with real comparisons, and negotiate honestly`, points: 2, feedback: "Anchor to evidence, not ego. A price set too high just forces a painful 'down round' later - a fair price protects the founder too." },
          { text: `Agree to ${ask}M to win the deal, worry about it later`, points: 0, feedback: "Overpaying feels like winning until the next round prices lower and everyone's shares get crushed. The price you pay is the risk you take." },
          { text: "Lowball them at half of fair value to grab more ownership", points: 1, feedback: "Squeezing a founder poisons the relationship you'll depend on for years. Fair - not greedy, not generous - wins the best founders' loyalty." },
        ]),
      }
    },
  },
  {
    id: "founder-conflict",
    scope: "company",
    title: "Founder Trouble",
    tagline: c => `${c.co}'s founders are fighting. You're on the board.`,
    build: (rng, c) => ({
      situation: `You sit on ${c.co}'s board. The two co-founders - once best friends - now argue in every meeting, and the team is picking sides. ${c.founder} asks you to just fire the other one.`,
      question: "How do you handle it?",
      choices: shuffled(rng, [
        { text: "Sit both down, hear each side, and help them agree on clear roles and how to decide", points: 2, feedback: "Co-founder fights are the #1 startup killer - and usually fixable. A good board member mediates first; clear roles beat forced breakups." },
        { text: `Take a side and fire the co-founder ${c.founder} dislikes`, points: 0, feedback: "You'd make an enemy, lose half the founding knowledge, and teach the team the board plays favorites. Rushing to fire is rarely the fix." },
        { text: "Stay out of it entirely - not your job", points: 1, feedback: "Hands-off has its place, but a fight this deep sinks companies while investors watch. Great board members help; they don't hide." },
      ]),
    }),
  },
  {
    id: "down-round",
    scope: "company",
    title: "The Down Round",
    tagline: c => `${c.co} is low on cash in a rough market.`,
    build: (rng, c) => ({
      situation: `${c.co} is a solid company with growing sales, but it's running low on cash and the whole market is down. The only money available comes at a *lower* price than its last round - a painful "down round."`,
      question: "What do you advise?",
      choices: shuffled(rng, [
        { text: "Take the down round - survival beats pride; a living company can grow back", points: 2, feedback: "A lower valuation stings egos, but a funded company that's still growing recovers. Running out of cash is forever; a down round isn't." },
        { text: "Refuse on principle - a lower price would be embarrassing", points: 0, feedback: "Pride doesn't pay salaries. Companies die waiting for a better price that never comes. A cap table heals; an empty bank account doesn't." },
        { text: "Only take it if founders promise to repay investors personally", points: 1, feedback: "That's not how equity works - and it dodges the real question. If the business is sound, fund survival; if it isn't, that's a different call." },
      ]),
    }),
  },
  {
    id: "bridge-flat",
    scope: "company",
    title: "Emergency Funding",
    tagline: c => `${c.co}'s growth has stalled - and they need cash.`,
    build: (rng, c) => {
      const months = int(rng, 5, 9)
      return {
        situation: `${c.co}'s founders work incredibly hard, but growth has been flat for ${months} months - the product just isn't catching on. They're out of money and ask you for emergency funding.`,
        question: "Do you fund them?",
        choices: shuffled(rng, [
          { text: `Decline kindly - ${months} flat months means the market has answered`, points: 2, feedback: "The hardest discipline in VC: don't throw good money after bad. A bridge for a stalled company usually just buys a few more flat months." },
          { text: "Fund them - never give up on hard-working founders", points: 1, feedback: "Effort is admirable, but effort isn't traction. Back the market's signal, not just the hustle - the extra cash rarely changes the outcome." },
          { text: "Fund them, but secretly plan to replace the founders", points: 0, feedback: "Funding people you've already decided to betray is the worst of both worlds: you lose the money AND your reputation when word gets out." },
        ]),
      }
    },
  },
  {
    id: "follow-on",
    scope: "company",
    title: "Feeding the Winner",
    tagline: c => `${c.co} is on fire. Do you double down?`,
    build: (rng, c) => {
      const mult = int(rng, 6, 15)
      return {
        situation: `A year after you invested, ${c.co} is on fire - worth ${mult}× what you paid and growing faster than ever. A new funding round just opened at the higher price.`,
        question: 'Do you invest more ("follow on")?',
        choices: shuffled(rng, [
          { text: "Yes - feed the winner; it's far less risky now than when you first bet", points: 2, feedback: "The golden rule: double down on proven winners. It 'feels' expensive all the way up - that's exactly what winning looks like." },
          { text: `Sell everything and lock in the ${mult}×`, points: 0, feedback: "You'd sell the fund's rocket at the launchpad. Power-law winners are the ones you must hold - most of the return comes after this point." },
          { text: "Do nothing, and let your ownership slowly shrink", points: 1, feedback: "Not fatal, but passive. The best VC returns come from concentrating more into what's clearly working, not drifting away from it." },
        ]),
      }
    },
  },
  {
    id: "power-law",
    scope: "fund",
    title: "The Power Law",
    tagline: () => "Deploy your fund and survive the brutal math of startups.",
    build: (rng) => ({
      situation: "You have 1M coins to invest this year. Startup history is brutal: out of 10 companies, about 5 die, 3 give your money back, 1 doubles, and 1 returns 20×. Nobody can tell which is which in advance.",
      question: "How do you deploy it?",
      choices: shuffled(rng, [
        { text: "Spread across ~10 companies - enough shots for the one big winner to show up", points: 2, feedback: "The power law! One 20× winner pays for every loser - but only if you take enough swings to catch one." },
        { text: "All of it into your single favorite", points: 0, feedback: "A coin flip away from zero. Conviction chooses *which* ten - it doesn't excuse betting on one." },
        { text: "100 companies, tiny checks each", points: 1, feedback: "Over-diversified - checks that small buy no real ownership and no seat at the table to help." },
      ]),
    }),
  },
  {
    id: "reserves",
    scope: "fund",
    title: "Dry Powder",
    tagline: () => "Spend the whole fund now, or keep some in reserve?",
    build: (rng) => ({
      situation: "You have 2M coins for your fund. You could invest all of it into new startups now, or invest half and keep half in reserve to put MORE into the ones that do well later.",
      question: "What's the smarter plan?",
      choices: shuffled(rng, [
        { text: "Keep reserves - save money to follow on into your winners", points: 2, feedback: "Pros keep 'dry powder'. Your best returns come from doubling down on winners you already own - impossible if you're tapped out." },
        { text: "Invest everything now - more bets means more chances", points: 1, feedback: "More first-bets sounds good, but you'll watch a winner raise again and be unable to join. Reserves are how you press your advantage." },
        { text: "Keep it all in reserve, make no new investments", points: 0, feedback: "You can't follow on into winners you never bought. Reserves support a portfolio - they aren't the whole plan." },
      ]),
    }),
  },
  {
    id: "secondary",
    scope: "company",
    title: "Cashing Some Chips",
    tagline: c => `A rival fund wants to buy your ${c.co} stake.`,
    build: (rng, c) => {
      const mult = int(rng, 20, 40)
      return {
        situation: `Your stake in ${c.co} is now worth ${mult}× on paper. A rival fund offers to buy your whole stake today, in cash, at that price. You still believe ${c.co} has room to grow.`,
        question: "What's the move?",
        choices: shuffled(rng, [
          { text: "Sell a small piece to return your fund's original money, hold the rest", points: 2, feedback: "The pro's balance: take some money off the table to de-risk the fund, but stay on the rocket. It's rarely all-or-nothing." },
          { text: `Sell all of it - ${mult}× is amazing, lock it in`, points: 1, feedback: `Nobody's fired for ${mult}×… but if it's your one big winner, selling it all can cap the fund's whole return. The question is how much, not whether.` },
          { text: "Sell nothing, ever - never let go of a winner", points: 0, feedback: "Funds must eventually return cash to their investors. 'Never sell' isn't a strategy - the skill is deciding how much, and when." },
        ]),
      }
    },
  },
  {
    id: "burn-rate",
    scope: "company",
    title: "Burn Rate",
    tagline: c => `${c.founder} wants to spend big to grow ${c.co} faster.`,
    build: (rng, c) => ({
      situation: `${c.co} is growing nicely on a tight budget. ${c.founder} wants to 10× spending overnight - huge ad budgets and dozens of hires - to grow even faster. It would burn through the company's cash in months.`,
      question: "What do you advise?",
      choices: shuffled(rng, [
        { text: "Scale spending in steps - prove each dollar brings growth before adding more", points: 2, feedback: "Growth you can't sustain isn't growth. Smart founders find the engine first, then pour in fuel - not the other way around." },
        { text: "Go for it - spend everything, growth is all that matters", points: 0, feedback: "10×-ing burn on unproven channels is the classic flameout. Fast growth on top of a leaky bucket just empties the bank faster." },
        { text: "Freeze all spending and grow only for free", points: 1, feedback: "Too timid - startups that never invest in growth get lapped by braver rivals. The answer is disciplined spending, not zero." },
      ]),
    }),
  },
  {
    id: "acq-offer",
    scope: "company",
    title: "The Offer",
    tagline: c => `Someone wants to buy ${c.co}, and ${c.founder} asks your advice.`,
    build: (rng, c) => {
      const now = int(rng, 1, 4)
      return {
        situation: `A big company offers to buy ${c.co} for ${now}00M coins - life-changing money for ${c.founder}. You believe it could be worth far more in a few years. ${c.founder} asks for your honest advice, and your fund earns either way.`,
        question: "What do you tell them?",
        choices: shuffled(rng, [
          { text: "Lay out both paths honestly - including your own bias - and back whatever they choose", points: 2, feedback: "This is what 'founder-friendly' really means. It's their life and their risk. Honest counsel earns the trust that wins their next company too." },
          { text: "Push them hard to reject it - you want the bigger outcome", points: 0, feedback: "Gambling with a founder's life-changing money for your fund's upside is remembered forever. That guaranteed money is theirs to weigh, not yours." },
          { text: "Push them hard to sell - lock in your fund's win now", points: 1, feedback: "Your fund wins, your reputation loses. Steering a founder to sell on your timeline breaks the trust that sourced the deal." },
        ]),
      }
    },
  },
  {
    id: "scaling-team",
    scope: "company",
    title: "Scaling the Team",
    tagline: c => `${c.co} is growing faster than ${c.founder} can manage.`,
    build: (rng, c) => ({
      situation: `${c.co} took off and now has 60 employees. ${c.founder} is a brilliant product builder but is drowning in managing people and operations - things are getting chaotic.`,
      question: "How do you help?",
      choices: shuffled(rng, [
        { text: `Help ${c.founder} hire experienced leaders to run what they're weakest at`, points: 2, feedback: "Great founders scale by hiring around their gaps, not pretending they have none. Your network of talent is one of a VC's most valuable gifts." },
        { text: `Replace ${c.founder} as CEO with a hired manager`, points: 0, feedback: "Ripping out the founder-visionary usually kills the magic. The fix is support and senior hires - reserve a CEO swap for true emergencies." },
        { text: "Do nothing - founders should figure it out alone", points: 1, feedback: "The whole point of a hands-on investor is help at exactly moments like this. Watching a good company slide into chaos helps no one." },
      ]),
    }),
  },
]

const VC_TITLE_PREFIX = ["Week on Sand Hill", "Deal Flow", "The Partner Meeting", "Portfolio Review", "Office Hours", "The Monday Meeting"]

function vcDeal(rng: Rng, fee: number, week: number): CareerDeal {
  const co = pick(rng, VC_STARTUPS)
  let coB = pick(rng, VC_STARTUPS)
  if (coB === co) coB = VC_STARTUPS[(VC_STARTUPS.indexOf(co) + 1) % VC_STARTUPS.length]
  const ctx: VcCtx = {
    co,
    coB,
    founder: pick(rng, VC_FOUNDERS),
    users: int(rng, 3, 40) * 100,
    growth: int(rng, 25, 60),
  }

  // Three DIFFERENT scenario types per week - the whole point: no two alike.
  const chosen = pickDistinct(rng, VC_ARCHES, 3)
  const stages: CareerStage[] = chosen.map(arc => arc.build(rng, ctx))
  const head = chosen[0]

  return {
    id: `gen-vc-${week}`,
    title: `${pick(rng, VC_TITLE_PREFIX)}: ${head.title}`,
    client: head.scope === "fund" ? "Your fund" : ctx.co,
    tagline: head.tagline(ctx),
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

/* ── VC fund: portfolio + investable deals ─────────────────────────── */
// The Venture Capitalist career is a real portfolio sim. Students browse fully
// fleshed-out startups (team, mission, live metrics, valuation, risks), invest
// coins to take a stake, then each week meet a founder who's hit a real
// situation - a stalled quarter, a churned customer, a hot new term sheet - and
// must give ADVICE. Good judgment on a strong company compounds its valuation;
// bad judgment cuts it (and your reputation); weak companies barely respond to
// any advice at all. Returns come only when you exit - so picking well and
// advising well is the whole game, not clicking a button.

export interface TeamMember {
  name: string
  role: string
  blurb: string
}

/** Everything a student can inspect before/while investing - the "company page". */
export interface CompanyProfile {
  /** One-line mission - what winning looks like. */
  goal: string
  /** What the company actually does. */
  product: string
  stage: "Pre-seed" | "Seed" | "Series A"
  team: TeamMember[]
  risks: string[]
  // Live (mutable) headline metrics.
  users: number
  growthPct: number
  /** Monthly revenue in coins. */
  revenue: number
  runwayMonths: number
  /** Current company valuation in coins. */
  valuation: number
}

export interface PortfolioCompany {
  id: string
  name: string
  founder: string
  sector: string
  /** Hidden 0-1 quality driving how the company responds over time. */
  quality: number
  /** Ownership % the student holds. */
  ownership: number
  /** Coins the student put in. */
  invested: number
  /** Company valuation when the student invested. */
  entryValuation: number
  profile: CompanyProfile
  /** The student's written investment thesis - why they backed it. */
  thesis: string
  valuationHistory: { week: number; valuation: number }[]
  events: { week: number; text: string }[]
  status: "growing" | "steady" | "struggling"
  investedWeek: number
  /** Last week the student advised it - "catch up" is once per week. */
  lastAdvisedWeek: number
}

export interface InvestOption {
  id: string
  name: string
  founder: string
  sector: string
  signal: "Strong signal" | "Mixed signal" | "Weak signal"
  /** Coins required to take the stake. */
  ask: number
  ownership: number
  quality: number
  entryValuation: number
  profile: CompanyProfile
}

/** Current value as a multiple of what the student invested. */
export function companyMultiple(c: PortfolioCompany): number {
  return Math.round((c.profile.valuation / c.entryValuation) * 100) / 100
}

const VC_SECTORS = ["consumer app", "fintech", "climate tech", "robotics", "health tech", "gaming", "developer tools", "marketplace", "education", "food delivery", "logistics", "creator tools"]

const SECTOR_INFO: Record<string, { goal: string; product: string }> = {
  "consumer app": { goal: "Become the app millions open every single day", product: "a mobile app that makes an everyday task effortless" },
  "fintech": { goal: "Make managing money simple for everyone", product: "an app that helps people save, spend, and invest smarter" },
  "climate tech": { goal: "Cut carbon out of everyday life", product: "technology that helps businesses slash their emissions" },
  "robotics": { goal: "Let robots do the dangerous, boring work", product: "robots that automate warehouse and factory tasks" },
  "health tech": { goal: "Make good healthcare reach everyone", product: "software that helps clinics care for patients better" },
  "gaming": { goal: "Build the game everyone is talking about", product: "a multiplayer game with a passionate community" },
  "developer tools": { goal: "Help every engineer ship faster", product: "tools that make software teams far more productive" },
  "marketplace": { goal: "Connect buyers and sellers no one else serves", product: "an online marketplace matching supply and demand" },
  "education": { goal: "Help anyone learn anything, affordably", product: "a learning platform students actually enjoy" },
  "food delivery": { goal: "Get great food to people fast", product: "an app that delivers local food in minutes" },
  "logistics": { goal: "Move goods cheaper and faster", product: "software that optimizes shipping and delivery" },
  "creator tools": { goal: "Help creators make a living doing what they love", product: "tools that help creators grow and earn" },
}

const PERSON_NAMES = ["Ava", "Marcus", "Priya", "Diego", "Nina", "Kofi", "Sofia", "Ren", "Tariq", "Elena", "Jonah", "Mei", "Leo", "Zara", "Omar", "Hana", "Ivan", "Lucia", "Noah", "Aisha", "Yuki", "Pablo", "Grace", "Dmitri", "Fatima", "Theo", "Lin", "Cyrus"]

const TEAM_ROLES: { role: string; blurb: string }[] = [
  { role: "Co-founder & CTO", blurb: "builds the technology and leads engineering" },
  { role: "Head of Product", blurb: "decides what to build and why" },
  { role: "Founding Engineer", blurb: "ships the core product day to day" },
  { role: "Head of Growth", blurb: "finds and keeps new users" },
  { role: "Head of Design", blurb: "makes the product simple and delightful" },
  { role: "Head of Sales", blurb: "wins the big customers" },
  { role: "Operations Lead", blurb: "keeps the whole company running" },
]

const RISK_POOL = [
  "A big competitor could copy the product",
  "Revenue leans on just a few large customers",
  "The market is still small and unproven",
  "Burning cash faster than revenue is growing",
  "Hard to hire the engineers they need",
  "Rules and regulations could change the game",
  "Users love it but don't pay yet",
  "The founder is stretched thin doing too much",
]

function buildProfile(r: Rng, o: { sector: string; founder: string; quality: number; ask: number; ownership: number }): CompanyProfile {
  const info = SECTOR_INFO[o.sector] ?? { goal: "Build something people can't live without", product: "a product its users rely on" }
  const q = o.quality
  const valuation = Math.max(o.ask, Math.round(o.ask / (o.ownership / 100)))
  const users = (q >= 0.6 ? int(r, 20, 90) : q >= 0.36 ? int(r, 8, 40) : int(r, 1, 12)) * 100
  const growthPct = q >= 0.6 ? int(r, 18, 55) : q >= 0.36 ? int(r, 4, 14) : int(r, -4, 6)
  const revenue = Math.round(users * (0.1 + q * 0.9))
  const runwayMonths = q >= 0.6 ? int(r, 12, 22) : q >= 0.36 ? int(r, 6, 12) : int(r, 2, 6)
  const stage: CompanyProfile["stage"] = valuation > 8000 ? "Series A" : valuation > 3000 ? "Seed" : "Pre-seed"
  const mates = pickDistinct(r, PERSON_NAMES.filter(n => n !== o.founder), 3)
  const roles = pickDistinct(r, TEAM_ROLES, 3)
  const team: TeamMember[] = [
    { name: o.founder, role: "Founder & CEO", blurb: "sets the vision and leads the company" },
    ...mates.map((n, i) => ({ name: n, role: roles[i].role, blurb: roles[i].blurb })),
  ]
  const risks = pickDistinct(r, RISK_POOL, q >= 0.6 ? 2 : 3)
  return { goal: info.goal, product: info.product, stage, team, risks, users, growthPct, revenue, runwayMonths, valuation }
}

/** Four fully-fleshed startups to browse each week. Deterministic per week. */
export function generateInvestOptions(week: number): InvestOption[] {
  const wr = mulberry32(hashStr(`vc-invest:${week}`))
  const names = pickDistinct(wr, VC_STARTUPS, 4)
  return names.map(name => {
    const r = mulberry32(hashStr(`vc-invest:${week}:${name}`))
    const quality = r()
    const founder = pick(r, VC_FOUNDERS)
    const sector = pick(r, VC_SECTORS)
    const ask = int(r, 2, 6) * 100
    const ownership = 5 + Math.floor(r() * 11) // 5-15%
    const profile = buildProfile(r, { sector, founder, quality, ask, ownership })
    const signal: InvestOption["signal"] = quality >= 0.62 ? "Strong signal" : quality >= 0.36 ? "Mixed signal" : "Weak signal"
    return { id: `w${week}-${name}`, name, founder, sector, signal, ask, ownership, quality, entryValuation: profile.valuation, profile }
  })
}

/** Minimum words for the two required VC write-ups. */
export const VC_THESIS_MIN_WORDS = 20
export const VC_ADVICE_MIN_WORDS = 20

/** Build the initial portfolio record when a student invests. */
export function holdingFromOption(o: InvestOption, week: number, thesis: string): PortfolioCompany {
  return {
    id: o.id, name: o.name, founder: o.founder, sector: o.sector,
    quality: o.quality, ownership: o.ownership, invested: o.ask,
    entryValuation: o.entryValuation,
    profile: { ...o.profile },
    thesis,
    valuationHistory: [{ week, valuation: o.entryValuation }],
    events: [{ week, text: `You invested ${o.ask.toLocaleString()} coins for a ${o.ownership}% stake` }],
    status: "steady", investedWeek: week, lastAdvisedWeek: 0,
  }
}

/* ── weekly catch-up scenarios ─────────────────────────────────────── */
// Each catch-up is a graded decision, not a free click. Choice points: 2 = the
// pro call, 1 = defensible, 0 = rookie mistake. The point value drives how the
// company's valuation moves in applyScenarioChoice (scaled by company quality).

export interface CatchUpChoice {
  text: string
  points: 0 | 1 | 2
  feedback: string
}
export interface CatchUpScenario {
  headline: string
  situation: string
  question: string
  choices: CatchUpChoice[]
}

type ScenarioFn = (c: PortfolioCompany) => CatchUpScenario

const SCENARIOS: ScenarioFn[] = [
  // 0 - stalled growth
  c => ({
    headline: "Growth has stalled",
    situation: `${c.name}'s user growth went flat this month - a well-funded competitor just launched a copycat. ${c.founder} is rattled and wants a plan.`,
    question: "What do you advise?",
    choices: [
      { text: "Double down on the one thing users love most and make it undeniably better", points: 2, feedback: "Focus beats feature-matching. You win by being the best at something specific, not by chasing a copycat's every move." },
      { text: "Copy the competitor's new features to keep pace", points: 1, feedback: "Playing catch-up keeps you a step behind and blurs what made you special. Sometimes necessary, rarely a winning strategy." },
      { text: "Panic-pivot the whole company to a brand-new idea", points: 0, feedback: "Throwing away real traction the moment things get hard is how startups die. One tough month isn't a reason to abandon ship." },
    ],
  }),
  // 1 - key hire leaving
  c => ({
    headline: "A key engineer is quitting",
    situation: `${c.name}'s best engineer just got a huge offer from a big tech company. Losing them would slow everything down.`,
    question: `How do you help ${c.founder}?`,
    choices: [
      { text: "Re-engage them with real ownership (equity) and a mission they believe in", points: 2, feedback: "Great people stay for meaning and upside, not just salary. Founders who fight for key talent keep their edge." },
      { text: "Match the salary with cash the company can't really afford", points: 1, feedback: "A cash bidding war with big tech is one you'll lose - and it strains a startup's tight budget. Money alone rarely retains A-players." },
      { text: "Let them walk - nobody is irreplaceable", points: 0, feedback: "At a 20-person startup your best engineer is close to irreplaceable. Shrugging off top talent leaving is a costly mistake." },
    ],
  }),
  // 2 - customer churn
  c => ({
    headline: "Your biggest customer left",
    situation: `${c.name}'s largest customer - a big chunk of revenue - just cancelled. ${c.founder} wants to win them back at any cost.`,
    question: "Your advice?",
    choices: [
      { text: "First find out WHY they left, fix the real problem, then approach others with the same pain", points: 2, feedback: "Churn is a message. Fixing the root cause protects every other customer - far more valuable than one win-back." },
      { text: "Offer a steep discount to lure them back immediately", points: 1, feedback: "Discounts can stop the bleeding but train customers that your price isn't real - and don't fix why they left." },
      { text: "Threaten to sue them for leaving", points: 0, feedback: "Burning a bridge in public scares off future customers too. Reputation travels fast in every industry." },
    ],
  }),
  // 3 - cash crunch (CASH_IDX)
  c => ({
    headline: "Cash is running low",
    situation: `${c.name} has about ${c.profile.runwayMonths} months of cash left and growth is only okay. ${c.founder} isn't sure what to do.`,
    question: "What do you advise?",
    choices: [
      { text: "Tighten spending to extend runway, then raise from a position of calm", points: 2, feedback: "Raising with a gun to your head means bad terms. Buy time first, then negotiate from strength." },
      { text: "Raise money right now at whatever price you can get", points: 1, feedback: "Better than running out - but a panicked raise usually means a painful price. Cutting burn first buys leverage." },
      { text: "Spend even more on ads to grow your way out fast", points: 0, feedback: "Flooring the gas as the tank empties is how startups stall on the highway. Unproven spend won't outrun a cash crisis." },
    ],
  }),
  // 4 - new round / up valuation (GROWTH)
  c => ({
    headline: "A new term sheet arrived",
    situation: `A respected fund offers to invest in ${c.name} at a valuation well above your entry. ${c.founder} asks whether to take it - and whether you'll join.`,
    question: "What's your move?",
    choices: [
      { text: "Support the raise and follow on to defend your ownership in a company that's working", points: 2, feedback: "Fuel for a winner, and you protect your stake. Winners look 'expensive' all the way up - that's the point." },
      { text: "Support the raise but sit it out yourself to save cash", points: 1, feedback: "Fine, but letting your ownership shrink in your best companies leaves your biggest returns on the table." },
      { text: "Tell them to reject it - outside money means losing control", points: 0, feedback: "Turning down good capital for a growing startup usually starves it. Smart money and fuel beat total control of a stalled company." },
    ],
  }),
  // 5 - founder burnout
  c => ({
    headline: `${c.founder} is burning out`,
    situation: `${c.founder} has been working 90-hour weeks, exhausted and making rushed calls. The team feels the tension.`,
    question: "As their partner, what do you do?",
    choices: [
      { text: "Help them hire a strong #2 and take real time off - a healthy founder is the #1 asset", points: 2, feedback: "Founder health IS company health. Sustainable pace and delegation beat heroic burnout every time." },
      { text: "Send an encouraging note and hope it passes", points: 1, feedback: "Kind, but hope isn't help. Burnout left alone leads to bad decisions - or a founder who quits." },
      { text: "Push them to work even harder - this is crunch time", points: 0, feedback: "Pouring pressure on an exhausted founder breaks people and companies. Protecting them protects your investment." },
    ],
  }),
  // 6 - fad pivot temptation
  c => ({
    headline: "The founder wants to chase a fad",
    situation: `A buzzy trend is everywhere, and ${c.founder} wants to drop ${c.name}'s product to chase it - even though real users love what exists today.`,
    question: "Your advice?",
    choices: [
      { text: "Test the idea small with real users before betting the company on a trend", points: 2, feedback: "Evidence over hype. Run a cheap experiment; let real user behavior - not headlines - decide." },
      { text: "Forbid it outright - stay the course no matter what", points: 1, feedback: "Discipline is good, but a flat 'no' can miss a real opportunity. The answer is test-and-learn, not fear." },
      { text: "Go all-in on the trend immediately - don't miss out", points: 0, feedback: "Betting the company on a fad because it's loud right now is classic FOMO. Trends fade; loyal users don't." },
    ],
  }),
  // 7 - acquisition offer (GROWTH)
  c => ({
    headline: "An acquisition offer",
    situation: `A larger company offers to buy ${c.name} for a solid sum. It's a nice return for you, but ${c.founder} believes the best is yet to come.`,
    question: "What do you tell them?",
    choices: [
      { text: "Lay out both paths honestly and back the founder's decision - it's their life's work", points: 2, feedback: "Honest counsel over self-interest builds the trust that wins you their next company too." },
      { text: "Nudge them to sell so your fund locks in the win", points: 1, feedback: "Your fund wins, your reputation takes a hit. Steering founders for your own timeline is remembered." },
      { text: "Insist they reject it - you want the bigger outcome", points: 0, feedback: "Gambling a founder's life-changing money for your upside isn't your call to force." },
    ],
  }),
]

const CASH_IDX = 3
const STRUGGLE_IDXS = [0, 1, 2, 3, 5]
const GROWTH_IDXS = [4, 7, 1, 6]

/** The situation a founder brings to this week's catch-up. Deterministic. */
export function generateScenario(c: PortfolioCompany, week: number): CatchUpScenario {
  const r = mulberry32(hashStr(`scenario:${c.id}:${week}`))
  let idx: number
  if (c.profile.runwayMonths <= 4 && r() < 0.7) idx = CASH_IDX
  else if (c.status === "struggling") idx = pick(r, STRUGGLE_IDXS)
  else if (c.status === "growing") idx = pick(r, GROWTH_IDXS)
  else idx = Math.floor(r() * SCENARIOS.length)
  return SCENARIOS[idx](c)
}

export interface CatchUpResult {
  patch: Partial<PortfolioCompany>
  repDelta: number
  outcome: string
}

/** Apply the student's advice: move the valuation/metrics, log it, score rep. */
export function applyScenarioChoice(c: PortfolioCompany, week: number, choice: CatchUpChoice, choiceIdx: number): CatchUpResult {
  const r = mulberry32(hashStr(`apply:${c.id}:${week}:${choiceIdx}`))
  let move: number
  if (choice.points === 2) move = 0.1 + c.quality * 0.35 + r() * 0.1
  else if (choice.points === 1) move = -0.02 + c.quality * 0.1 + r() * 0.05
  else move = -(0.14 + (1 - c.quality) * 0.16 + r() * 0.08)
  // A doomed company barely responds even to brilliant advice.
  if (c.quality < 0.4) move = Math.min(move, 0.05)
  move = Math.round(move * 100) / 100

  const oldVal = c.profile.valuation
  const newVal = Math.max(1, Math.round(oldVal * (1 + move)))
  const status: PortfolioCompany["status"] = move > 0.04 ? "growing" : move < -0.02 ? "struggling" : "steady"
  const raised = move > 0.15 // a big win usually comes with a fresh round
  const profile: CompanyProfile = {
    ...c.profile,
    valuation: newVal,
    users: Math.max(0, Math.round(c.profile.users * (1 + move * 0.8))),
    growthPct: Math.max(-20, Math.min(80, Math.round(c.profile.growthPct + move * 40))),
    runwayMonths: Math.max(0, c.profile.runwayMonths - 1 + (raised ? 9 : 0)),
    revenue: Math.max(0, Math.round(c.profile.revenue * (1 + move * 0.6))),
  }
  const pct = Math.round(move * 100)
  const sign = pct >= 0 ? "+" : ""
  const grade = choice.points === 2 ? "Great call" : choice.points === 1 ? "Okay call" : "Rough call"
  const repDelta = choice.points === 2 ? 3 : choice.points === 1 ? 1 : -2
  const patch: Partial<PortfolioCompany> = {
    profile,
    status,
    valuationHistory: [...c.valuationHistory, { week, valuation: newVal }].slice(-12),
    events: [...c.events, { week, text: `${grade}: valuation ${sign}${pct}% to ${newVal.toLocaleString()}${raised ? " (new round)" : ""}` }].slice(-10),
    lastAdvisedWeek: week,
  }
  const outcome = `${choice.feedback} ${c.name} is now valued at ${newVal.toLocaleString()} coins (${sign}${pct}%).`
  return { patch, repDelta, outcome }
}
