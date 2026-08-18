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

// Advisory work is many different jobs, not one script. Each week we compose
// the deal from THREE DISTINCT archetypes across the real arc of banking -
// valuation, diligence, negotiation, process, deal currency, antitrust, bidding
// wars, IPOs, financing, honest counsel. Option lengths are kept ~equal.

interface IbCtx { buyer: string; target: string; sector: string; profit: number; multiple: number; fair: number; demand: number; finding: string }

interface IbArche { id: string; title: string; build: (rng: Rng, c: IbCtx) => CareerStage }

const IB_ARCHES: IbArche[] = [
  {
    id: "valuation", title: "The Valuation",
    build: (rng, c) => ({
      situation: `${c.buyer} wants to buy ${c.target}, a ${c.sector} firm earning ${money(c.profit)} coins a year. Similar firms sell for about ${c.multiple}× profit.`,
      question: `A fair opening valuation for ${c.target}?`,
      choices: shuffled(rng, [
        { text: `About ${money(c.fair)}, in line with peer multiples`, points: 2, feedback: `${money(c.profit)} × ${c.multiple} = ${money(c.fair)}. Valuing off comparable companies is the banker's first move.` },
        { text: `Just ${money(c.profit)}, one year of its profit`, points: 0, feedback: "Far too low - a company earns profit year after year, so buyers pay a multiple of one year's earnings." },
        { text: `A big ${money(Math.round(c.fair * 1.6))} to beat rival bidders`, points: 1, feedback: "Overpaying to 'win' is how acquisitions destroy value. Anchor to the peers, not to fear of losing." },
      ]),
    }),
  },
  {
    id: "diligence", title: "The Finding",
    build: (rng, c) => ({
      situation: `Due diligence uncovers that ${c.finding}`,
      question: `What do you tell ${c.buyer}?`,
      choices: shuffled(rng, [
        { text: "Share it and adjust the offer to the new risk", points: 2, feedback: "Exactly why diligence exists - bad news usually changes the price, not necessarily the deal itself." },
        { text: "Keep it quiet so the fee-paying deal survives", points: 0, feedback: "Hiding findings from your own client is how bankers lose their reputation - and reputation is the whole business." },
        { text: "Advise abandoning the whole deal right now", points: 1, feedback: "Cautious but hasty - most findings can be priced in. Kill the price, not always the deal." },
      ]),
    }),
  },
  {
    id: "negotiation", title: "The Standoff",
    build: (rng, c) => ({
      situation: `${c.target}'s owners demand ${money(c.demand)}. Your analysis says ${money(c.fair)}. They insist they "won't take a coin less."`,
      question: "Your negotiation move?",
      choices: shuffled(rng, [
        { text: `Counter at ${money(c.fair)} with data, room to meet`, points: 2, feedback: "Anchor to data, stay flexible - the classic playbook. Deals like this close between the two numbers." },
        { text: `Just pay the ${money(c.demand)} they're demanding`, points: 0, feedback: `"Won't take less" is a negotiating tactic. You'd have overpaid your client by ${money(c.demand - c.fair)}.` },
        { text: "Walk away without making any counteroffer", points: 1, feedback: "Walking is a real tactic - but with no counter you waste months of work and any path to a yes." },
      ]),
    }),
  },
  {
    id: "process", title: "The Buyer List",
    build: (rng, c) => ({
      situation: `You're selling ${c.target}. You can approach a wide field of buyers or a focused few.`,
      question: "What process do you run?",
      choices: shuffled(rng, [
        { text: "A tight list of real strategic fits, plus wildcards", points: 2, feedback: "Tension comes from the RIGHT buyers, not the most. A focused list creates real bidding without leaking the sale." },
        { text: "Blast the teaser to every company you can find", points: 1, feedback: "A giant list leaks the sale and draws tire-kickers. More names isn't more tension - the right names are." },
        { text: `Quietly take it only to ${c.buyer}, no rivals`, points: 0, feedback: "One buyer with no competition sets the price - badly, for your client. No tension means no premium." },
      ]),
    }),
  },
  {
    id: "currency", title: "Cash or Stock",
    build: (rng, c) => ({
      situation: `${c.buyer}'s own stock is riding high, but its cash is tight. It's buying ${c.target}.`,
      question: "How should it pay?",
      choices: shuffled(rng, [
        { text: "Mostly stock - pricey currency, and cash is tight", points: 2, feedback: "When your stock is expensive it's cheap 'currency' for buying things - and you avoid draining cash or debt." },
        { text: "All cash, funded by piling on new debt", points: 1, feedback: "Sellers love cash, but loading up on debt for a big deal is risky if the merger hits bumps. Stock was cheaper here." },
        { text: "It makes no difference - money is money", points: 0, feedback: "It matters a lot: cash vs. stock changes who carries the risk, how much debt you take, even the taxes." },
      ]),
    }),
  },
  {
    id: "antitrust", title: "The Regulators",
    build: (rng, c) => ({
      situation: `Together, ${c.buyer} and ${c.target} would control most of the ${c.sector} market. Regulators may block it.`,
      question: "How do you clear it?",
      choices: shuffled(rng, [
        { text: "Offer to sell overlapping units to keep competition", points: 2, feedback: "'Divestitures' show regulators the market stays fair - exactly how big mergers actually get approved." },
        { text: "Ignore them - regulators usually back down", points: 0, feedback: "They really don't. Blocked mergers cost years and fortunes - plenty of deals die in court over exactly this." },
        { text: "Abandon the merger at the first sign of trouble", points: 1, feedback: "Regulatory risk is real, but quitting at the first frown wastes a deal with a clear path - remedies existed." },
      ]),
    }),
  },
  {
    id: "biddingWar", title: "The Bidding War",
    build: (rng, c) => ({
      situation: `A rival bidder jumps in on ${c.target}. Your models say it's worth ${money(c.fair)}; the price is racing past that.`,
      question: "Your advice in the war room?",
      choices: shuffled(rng, [
        { text: "Hold at your walk-away price and let them overpay", points: 2, feedback: "The 'winner's curse' - overpaying just to win - has destroyed more value than any crash. Discipline wins." },
        { text: "Outbid them at any cost - you can't lose this", points: 0, feedback: "Ego isn't a strategy. Paying above what it's worth to you means you lost the moment you 'won'." },
        { text: "Drop out at once without checking the math", points: 1, feedback: "Right instinct, rushed - confirm against your walk-away price first. Sometimes one more bid really is fine." },
      ]),
    }),
  },
  {
    id: "ipo", title: "The IPO Price",
    build: (rng, c) => ({
      situation: `${c.target} is going public. Investors would buy around ${money(c.fair)}; the founders want far more.`,
      question: "Where do you price the IPO?",
      choices: shuffled(rng, [
        { text: "Just below demand, for a healthy first-day pop", points: 2, feedback: "Pricing a touch under demand rewards the investors you'll need again, building momentum without giving it all away." },
        { text: "At the founders' higher price - they know best", points: 0, feedback: "Overpriced IPOs crater on day one and scar the company with investors for years. Founders are always optimistic." },
        { text: "Very low so the stock is sure to soar", points: 1, feedback: "A giant pop feels great but hands millions the company needed to whoever flipped. Underpricing has a real cost." },
      ]),
    }),
  },
  {
    id: "financing", title: "The Financing",
    build: (rng, c) => ({
      situation: `${c.buyer} needs to fund the ${c.target} purchase. It can stretch with heavy debt or bring more of its own cash.`,
      question: "How should they fund it?",
      choices: shuffled(rng, [
        { text: "A prudent mix that survives a bad quarter", points: 2, feedback: "A deal that closes but buries the buyer in debt isn't a win. Sensible financing protects the value you negotiated." },
        { text: "Max out debt to keep cash, whatever the risk", points: 1, feedback: "Over-leveraging the buyer turns one bad quarter into a crisis. Cheap debt stops being cheap when you can't pay it." },
        { text: "Delay for months chasing perfect financing terms", points: 0, feedback: "Deals have momentum and expiry dates. Hunting flawless terms while the clock runs can lose the deal outright." },
      ]),
    }),
  },
  {
    id: "counsel", title: "The Founder's Call",
    build: (rng, c) => ({
      situation: `${c.target}'s founders get a life-changing offer to sell. They ask your honest advice - and your firm earns either way.`,
      question: "What do you tell them?",
      choices: shuffled(rng, [
        { text: "Lay out both paths honestly and back their choice", points: 2, feedback: "It's their life and their risk. Honest counsel over your own fee earns the trust that wins the next deal too." },
        { text: "Push them hard to sell and lock in your fee", points: 1, feedback: "Your firm wins, your reputation loses. Steering founders to sell on your timeline is remembered forever." },
        { text: "Push them to reject it - you want a bigger deal", points: 0, feedback: "Gambling a founder's life-changing money for your upside isn't your call to force. That choice is theirs." },
      ]),
    }),
  },
  {
    id: "synergies", title: "The Synergy Math",
    build: (rng, c) => ({
      situation: `${c.buyer}'s team says merging with ${c.target} unlocks big cost savings, so they want to raise the bid to ${money(Math.round(c.fair * 1.4))}.`,
      question: "How much of those synergies should the price reflect?",
      choices: shuffled(rng, [
        { text: "Pay for the value today and keep synergies as upside", points: 2, feedback: "Synergies are promises, not cash. Pay for what exists now and the reward is yours if they actually show up." },
        { text: "Bake every projected synergy into the price you offer", points: 0, feedback: "Handing sellers 100% of savings you haven't earned means you paid for your own future work. They usually come in late and light." },
        { text: "Refuse the deal since synergies are only guesses", points: 1, feedback: "Synergies are uncertain, but good deals still create value. Discount them - don't walk from a solid acquisition over them." },
      ]),
    }),
  },
  {
    id: "accretion", title: "Accretive or Not",
    build: (rng, c) => ({
      situation: `To buy ${c.target}'s ${money(c.profit)} of yearly profit, ${c.buyer} must issue a pile of new shares to pay for it.`,
      question: "What really decides if this helps shareholders?",
      choices: shuffled(rng, [
        { text: "Whether the profit added outweighs the new shares issued", points: 2, feedback: "That's accretion vs. dilution: if each share ends up with more earnings behind it, holders win. Compare profit added to stock printed." },
        { text: "Whether the headline purchase price sounds impressive", points: 0, feedback: "A big price tag says nothing about value per share. Issue too much stock and existing owners are quietly diluted." },
        { text: "Whether the CEO personally likes the target company", points: 1, feedback: "Fit matters, but taste isn't math. The deal has to add more earnings per share than the stock it costs to buy." },
      ]),
    }),
  },
  {
    id: "earnout", title: "The Gap",
    build: (rng, c) => ({
      situation: `${c.target}'s owners want ${money(c.demand)}; your value is ${money(c.fair)}. They swear next year's growth justifies the gap.`,
      question: "How do you bridge it?",
      choices: shuffled(rng, [
        { text: "Pay fair now, plus an earnout if the growth is real", points: 2, feedback: "An earnout ties the extra money to results they promised. If they're right, they earn it; if not, you didn't overpay." },
        { text: "Just pay the higher number on their word", points: 0, feedback: "Paying today for growth that may never arrive is how buyers overpay. Make the promised future actually show up first." },
        { text: "Refuse any structure but a single flat cash price", points: 1, feedback: "Flat cash is clean, but with a real gap it means overpaying or no deal. Earnouts exist to bridge exactly this." },
      ]),
    }),
  },
  {
    id: "exclusivity", title: "The Exclusive Window",
    build: (rng, c) => ({
      situation: `${c.buyer} wants ${c.target} to stop talking to everyone else while it runs diligence, and asks you to grant exclusivity early.`,
      question: "What do you advise the seller?",
      choices: shuffled(rng, [
        { text: "Grant it only after they commit to a strong price", points: 2, feedback: "Exclusivity kills your leverage, so sell it dearly - lock in the number before you turn off the competition." },
        { text: "Grant it immediately to keep the eager buyer happy", points: 0, feedback: "Give exclusivity for free and the buyer can grind the price down with no rival in the room. That's the trap." },
        { text: "Refuse exclusivity to any buyer under all conditions", points: 1, feedback: "Serious buyers need some exclusivity to spend on diligence. Never granting it can scare off your best bidder." },
      ]),
    }),
  },
  {
    id: "breakupFee", title: "The Break Fee",
    build: (rng, c) => ({
      situation: `${c.buyer} will spend months and millions on the ${c.target} deal, and wants a fee if the seller walks to another bidder.`,
      question: "How do you handle the break fee?",
      choices: shuffled(rng, [
        { text: "Agree to a modest fee that courts consider reasonable", points: 2, feedback: "A sensible break fee protects the buyer's costs without locking out better offers - that balance keeps the deal legal." },
        { text: "Demand a huge fee that scares off every rival bidder", points: 0, feedback: "A fee so big it blocks all competition can be struck down and makes the board look disloyal to its own owners." },
        { text: "Skip any break fee to keep the contract simple", points: 1, feedback: "No protection at all leaves the buyer exposed after huge spend, so serious bidders may walk. Some fee is standard." },
      ]),
    }),
  },
  {
    id: "leak", title: "The Leak",
    build: (rng, c) => ({
      situation: `News of the ${c.buyer}-${c.target} talks leaks to the press before you're ready, and ${c.target}'s stock jumps.`,
      question: "What's your first move?",
      choices: shuffled(rng, [
        { text: "Manage it with a careful, truthful public statement", points: 2, feedback: "You can't un-leak news. Controlling the message and following disclosure rules limits the damage to the process." },
        { text: "Deny everything even though the talks are real", points: 0, feedback: "A flat lie about a real deal can break securities law and torch your credibility with regulators and investors alike." },
        { text: "Rush to sign tonight before anyone can react", points: 1, feedback: "Panic-signing to beat a headline invites mistakes on price and terms. Steady the process, don't stampede it." },
      ]),
    }),
  },
  {
    id: "fairness", title: "The Board's Duty",
    build: (rng, c) => ({
      situation: `${c.target}'s board must vote on the ${money(c.fair)} offer and asks you, as banker, to weigh in on whether it's fair.`,
      question: "What do you give them?",
      choices: shuffled(rng, [
        { text: "An honest fairness view grounded in the real numbers", points: 2, feedback: "A fairness opinion protects shareholders and the board's duty to them. It has to reflect the math, not the pressure." },
        { text: "Whatever opinion gets the deal signed fastest", points: 0, feedback: "Bending your fairness view to close a deal betrays the shareholders it exists to protect - and invites lawsuits." },
        { text: "No opinion at all - let the board just guess", points: 1, feedback: "Boards rely on your analysis to meet their duty. Staying silent leaves them exposed on the biggest vote they'll take." },
      ]),
    }),
  },
  {
    id: "hostile", title: "The Cold Shoulder",
    build: (rng, c) => ({
      situation: `${c.target}'s board keeps refusing to even discuss a sale, but ${c.buyer} is convinced the owners would want the offer.`,
      question: `How should ${c.buyer} approach it?`,
      choices: shuffled(rng, [
        { text: "Try hard to win the board over before going around it", points: 2, feedback: "A friendly deal is cheaper and cleaner. Exhaust real negotiation before ever considering a hostile route." },
        { text: "Launch a hostile takeover the moment they say no", points: 1, feedback: "Hostile bids are costly, public wars that often overpay. They're a last resort, not an opening move." },
        { text: "Secretly buy shares to seize control by surprise", points: 0, feedback: "Quietly crossing ownership thresholds without disclosure breaks the rules fast. Control has to be won in the open." },
      ]),
    }),
  },
  {
    id: "retention", title: "The Key People",
    build: (rng, c) => ({
      situation: `Much of ${c.target}'s value walks out the door each night - its best ${c.sector} people could leave once the deal closes.`,
      question: "How do you protect that value?",
      choices: shuffled(rng, [
        { text: "Build retention packages so the key people stay on", points: 2, feedback: "You paid for a team, not just an office. Retention deals keep the value you bought from quitting a week later." },
        { text: "Assume everyone stays because the logo is the same", points: 0, feedback: "A merger unsettles people; the best ones have options. Hope isn't a plan for keeping the talent you paid for." },
        { text: "Replace the whole team right after closing", points: 1, feedback: `Clearing out the people who know the business throws away exactly what made ${c.target} worth buying.` },
      ]),
    }),
  },
  {
    id: "crossBorder", title: "The Foreign Buyer",
    build: (rng, c) => ({
      situation: `An overseas company wants to buy ${c.target}, but currency swings and its home regulators add real uncertainty.`,
      question: "How do you protect your client?",
      choices: shuffled(rng, [
        { text: "Price the currency and regulatory risk into the terms", points: 2, feedback: "Cross-border deals carry FX and approval risk. Building protections into the contract is how you keep surprises off your client." },
        { text: "Treat it exactly like a plain domestic deal", points: 0, feedback: "Ignoring currency moves and foreign approvals is how cross-border deals blow up between signing and closing." },
        { text: "Reject all foreign buyers as too complicated", points: 1, feedback: "Overseas buyers often pay the most. Managing the risk beats refusing the strongest bidder outright." },
      ]),
    }),
  },
  {
    id: "carveOut", title: "The Division",
    build: (rng, c) => ({
      situation: `${c.buyer} wants just one division of ${c.target}, not the whole company - but that unit shares staff and systems with the rest.`,
      question: "What's the hard part to nail?",
      choices: shuffled(rng, [
        { text: "Untangling shared people, systems and contracts cleanly", points: 2, feedback: "In a carve-out the separation IS the deal. Get the shared services split right or the unit can't stand alone." },
        { text: "Only the headline price for the division", points: 0, feedback: "Price is the easy part. A carve-out that can't operate on day one after separation is worth far less than the sticker." },
        { text: "Nothing - a division sells just like a whole company", points: 1, feedback: "It really doesn't. Pulling a unit out of its parent is delicate surgery, and the details decide the value." },
      ]),
    }),
  },
  {
    id: "goShop", title: "The Go-Shop",
    build: (rng, c) => ({
      situation: `${c.target} signed with ${c.buyer}, but the board wants a window to check whether anyone will pay more than ${money(c.fair)}.`,
      question: "How do you advise the board?",
      choices: shuffled(rng, [
        { text: "Use a short go-shop to test for a genuinely higher bid", points: 2, feedback: "A go-shop lets the board honor its duty to shareholders by confirming the signed price is really the best available." },
        { text: "Sign and forbid the board from looking at all", points: 0, feedback: "Blocking the board from testing the market can breach its duty to shareholders and draw lawsuits. Let them look." },
        { text: "Re-open the whole auction from scratch for months", points: 1, feedback: "A full re-run risks losing the bird in hand. A tight go-shop gets the same comfort without blowing up the deal." },
      ]),
    }),
  },
  {
    id: "macClause", title: "The Downturn",
    build: (rng, c) => ({
      situation: `Between signing and closing the ${c.target} deal, the ${c.sector} market suddenly slumps and ${c.buyer} wants out.`,
      question: "Can they simply walk?",
      choices: shuffled(rng, [
        { text: "Only if the contract's material-adverse-change bar is met", points: 2, feedback: "A signed deal is binding. Buyers can exit only if a real, lasting MAC clause is triggered - courts set that bar high." },
        { text: "Yes - any dip in the market lets a buyer bail", points: 0, feedback: "Ordinary market wobbles almost never clear the MAC bar. Walking on a normal downturn means breaching the contract." },
        { text: "No - a signed deal can never be exited for any reason", points: 1, feedback: "Deals do have escape hatches for genuine disasters. It's not 'never' - it's 'only for a true material change'." },
      ]),
    }),
  },
  {
    id: "financingCert", title: "The Staple",
    build: (rng, c) => ({
      situation: `Bidders for ${c.target} worry they can't line up loans fast enough, and your firm could offer pre-arranged financing to all of them.`,
      question: "Why might the seller want that?",
      choices: shuffled(rng, [
        { text: "It lets more buyers bid with certainty, lifting the price", points: 2, feedback: "'Stapled' financing removes a buyer's biggest worry, so more can compete - and competition is what raises the price." },
        { text: "It guarantees the seller a specific final buyer", points: 0, feedback: "Staple financing doesn't pick the winner; it widens the field. Its value is more credible bidders, not a chosen one." },
        { text: "It has no effect on the sale process at all", points: 1, feedback: "It matters: financing certainty turns hesitant bidders into real ones, and a fuller room means a better outcome." },
      ]),
    }),
  },
  {
    id: "minorityStake", title: "Piece or Whole",
    build: (rng, c) => ({
      situation: `${c.buyer} can buy all of ${c.target} for ${money(c.fair)}, or a minority slice for less with no real say in decisions.`,
      question: "Which should it weigh?",
      choices: shuffled(rng, [
        { text: "Match the stake to how much control it actually needs", points: 2, feedback: "Control has a price. If the buyer needs to run it, buy control; if it just wants exposure, a minority stake is cheaper." },
        { text: "Always buy 100% no matter the strategic goal", points: 1, feedback: "Full ownership is powerful but pricey. Overpaying for control you don't need wastes capital a minority stake would save." },
        { text: "Always take the cheapest slice regardless of goals", points: 0, feedback: "A minority stake with no say is useless if the buyer needed to steer the company. Cheap isn't the goal - fit is." },
      ]),
    }),
  },
  {
    id: "lockUp", title: "After the Bell",
    build: (rng, c) => ({
      situation: `${c.target} just went public. Its insiders want to sell shares immediately, but the bankers set a lock-up period first.`,
      question: "Why does the lock-up matter?",
      choices: shuffled(rng, [
        { text: "It stops a flood of insider selling from crushing the price", points: 2, feedback: "A lock-up reassures new investors that insiders won't dump on day one - protecting the freshly public stock's price." },
        { text: "It's just paperwork with no effect on the stock", points: 0, feedback: "It's very real: without it, insiders selling at once can tank the price and betray the investors who just bought in." },
        { text: "It exists only to punish the company's founders", points: 1, feedback: "It's not a punishment - it's protection for the stock and its new holders while the company finds its footing." },
      ]),
    }),
  },
  {
    id: "escrow", title: "The Holdback",
    build: (rng, c) => ({
      situation: `${c.buyer} worries a hidden problem could surface after buying ${c.target}, and wants part of the price held back for a while.`,
      question: "How do you structure it?",
      choices: shuffled(rng, [
        { text: "Hold a fair slice in escrow to cover surprises for a set time", points: 2, feedback: "An escrow holdback protects the buyer if the seller's promises prove wrong - a standard, balanced way to share that risk." },
        { text: "Hand over every coin at closing with no protection", points: 0, feedback: "Paying in full with no holdback leaves the buyer no recourse if a buried problem surfaces the next month." },
        { text: "Hold back nearly the whole price for years", points: 1, feedback: "An excessive, endless holdback insults the seller and can break the deal. Protection should be proportional." },
      ]),
    }),
  },
  {
    id: "listingRoute", title: "Two Doors Public",
    build: (rng, c) => ({
      situation: `${c.target} wants to go public. It can run a traditional IPO or merge into an already-listed shell to get there faster.`,
      question: "How do you advise?",
      choices: shuffled(rng, [
        { text: "Weigh speed against price, scrutiny and investor trust", points: 2, feedback: "Each route trades off differently. A shell merger is faster but often values worse and draws more suspicion - it's a real choice." },
        { text: "Always take the fastest route regardless of the cost", points: 1, feedback: "Speed can mean a worse price and weaker investor confidence. Fast isn't automatically right for going public." },
        { text: "Tell them the two routes are basically identical", points: 0, feedback: "They're not - price, timeline, disclosure and reputation all differ. Advising 'same thing' misleads the client." },
      ]),
    }),
  },
  {
    id: "confidentiality", title: "The Books",
    build: (rng, c) => ({
      situation: `${c.buyer} wants to see ${c.target}'s private financials, but ${c.target} fears a rival could use that data against it.`,
      question: "How do you open the books safely?",
      choices: shuffled(rng, [
        { text: "Share sensitive data only under a signed confidentiality deal", points: 2, feedback: "An NDA lets diligence happen while legally binding the buyer not to misuse secrets - standard practice before books open." },
        { text: "Hand over everything freely to show good faith", points: 0, feedback: "Dumping trade secrets with no protection is reckless - if talks fail, a rival now knows exactly how you operate." },
        { text: "Refuse to share any real numbers whatsoever", points: 1, feedback: "No buyer commits blind. Total secrecy kills the deal - the fix is protected disclosure, not none at all." },
      ]),
    }),
  },
  {
    id: "relationship", title: "The Long Game",
    build: (rng, c) => ({
      situation: `You could push ${c.buyer} into a shaky deal for a fat fee now, or advise patience and earn nothing this quarter.`,
      question: "What guides your advice?",
      choices: shuffled(rng, [
        { text: "The client's long-term trust, which wins many more fees", points: 2, feedback: "Banking runs on repeat clients. One honest 'don't do this deal' earns the trust behind a decade of mandates." },
        { text: "This quarter's fee, whatever it does to the client", points: 0, feedback: "Milking a client for one bad-deal fee is how a banker gets a single payday and then never a call again." },
        { text: "Whichever choice needs the least work from you", points: 1, feedback: "Coasting serves no one. Real advice sometimes means the harder conversation that protects the relationship." },
      ]),
    }),
  },
]

function ibDeal(rng: Rng, fee: number, week: number): CareerDeal {
  const profit = int(rng, 2, 18) * 1_000_000
  const multiple = int(rng, 4, 8)
  const fair = profit * multiple
  const target = pick(rng, IB_TARGETS)
  const ctx: IbCtx = {
    buyer: pick(rng, IB_BUYERS),
    target,
    sector: pick(rng, IB_SECTORS),
    profit, multiple, fair,
    demand: Math.round(fair * (1.15 + rng() * 0.2)),
    finding: pick(rng, [
      `${target}'s star product manager - behind its best sellers - is quietly interviewing elsewhere.`,
      `${target}'s biggest customer, a quarter of its sales, just signed with a rival.`,
      `${target} delayed equipment repairs to make this year's profit look bigger.`,
      `a lawsuit against ${target} could cost it a full year of profit if it loses.`,
    ]),
  }

  const chosen = pickDistinct(rng, IB_ARCHES, 3)
  const stages: CareerStage[] = chosen.map(a => a.build(rng, ctx))
  const head = chosen[0]

  return {
    id: `gen-ib-${week}`,
    title: `Project ${pick(rng, ["Falcon", "Comet", "Anchor", "Summit", "Orbit", "Blue Sky", "Redwood", "Thunder"])}: ${head.title}`,
    client: ctx.buyer,
    tagline: `Advise ${ctx.buyer} on the ${ctx.target} deal - and earn your fee.`,
    difficulty: "Junior",
    baseFee: fee,
    stages,
  }
}

// A real buyout isn't one script. Each week we compose the deal from THREE
// DISTINCT archetypes drawn from the actual arc of PE work - sourcing,
// financing, operating, rolling up, managing, exiting - so no two weeks share
// the same beats. Option lengths are kept roughly equal so wording gives away
// nothing.

interface PeCtx { target: string; rival: string; flaw: string; buyPrice: number; nowMult: number; maybeMult: number }

interface PeArche { id: string; title: string; build: (rng: Rng, c: PeCtx) => CareerStage }

const PE_ARCHES: PeArche[] = [
  {
    id: "sourcing", title: "The Target",
    build: (rng, c) => ({
      situation: `${c.target} is on the market for a fair ${money(c.buyPrice)} coins. Great product, loyal customers - but ${c.flaw}.`,
      question: "Is this a buyout worth doing?",
      choices: shuffled(rng, [
        { text: "Yes - a loved business with one fixable flaw is the sweet spot", points: 2, feedback: "Fixable problems are exactly why the price is low. PE buys problems it knows how to solve." },
        { text: "No - never buy a company with visible problems", points: 0, feedback: "A flawless company costs a flawless price. The discount IS the flaw, and this one is fixable." },
        { text: "Only if the seller fixes the flaw before closing", points: 1, feedback: "If they fix it first, the price jumps and the upside is gone. You are the fixer - that's the job." },
      ]),
    }),
  },
  {
    id: "leverage", title: "The Structure",
    build: (rng, c) => ({
      situation: `You're financing the ${money(c.buyPrice)} buyout of ${c.target}. Lenders will fund part with debt; the rest is your fund's cash.`,
      question: "How much debt do you use?",
      choices: shuffled(rng, [
        { text: "A sensible slug of debt, sized so a bad year won't sink it", points: 2, feedback: "Leverage lifts returns, but only if the company can always service it. Right-sizing the debt is the core PE skill." },
        { text: "Max out the debt for the biggest possible return", points: 0, feedback: "Pile on debt and one weak quarter can't cover the interest - that's how over-levered buyouts blow up." },
        { text: "Use no debt at all and pay entirely in cash", points: 1, feedback: "Safe, but it leaves PE's main tool on the shelf. Sensible leverage is what juices a good deal's returns." },
      ]),
    }),
  },
  {
    id: "operate", title: "The First Move",
    build: (rng, c) => ({
      situation: `You own ${c.target} now. The team's ready and it's time for your first big improvement.`,
      question: "What's the play?",
      choices: shuffled(rng, [
        { text: "Attack the flaw you underwrote with an operating fix", points: 2, feedback: "Operational improvement is the heart of PE. You go straight at the problem you bought the company to solve." },
        { text: "Jack up prices and cut costs everywhere at once", points: 0, feedback: "Blunt-force cuts and price shocks attack the customers, not the flaw. That destroys the value you just bought." },
        { text: "Wait a year and watch before changing anything", points: 1, feedback: "A year of watching is a year of upside lost. You paid a premium to fix this now, not to sit on it." },
      ]),
    }),
  },
  {
    id: "boltOn", title: "The Roll-Up",
    build: (rng, c) => ({
      situation: `${c.rival}, a smaller competitor, is for sale cheap. Rolling it into ${c.target} would add customers and scale.`,
      question: "Do you bolt it on?",
      choices: shuffled(rng, [
        { text: "Buy it and merge operations to capture the savings", points: 2, feedback: "Small profits bought cheaply become more valuable inside a bigger platform. That's the roll-up's whole magic." },
        { text: "Buy it but keep it running fully separately", points: 0, feedback: "A bolt-on you don't integrate is two small firms in a trench coat. The savings of scale ARE the integration." },
        { text: "Pass unless it needs zero integration work", points: 1, feedback: "Every bolt-on needs some integration - that's the work that makes the value. 'Perfect' ones don't exist." },
      ]),
    }),
  },
  {
    id: "management", title: "The Handover",
    build: (rng, c) => ({
      situation: `${c.target}'s founder ran everything personally and is now cashing out. The team is uneasy about who's in charge.`,
      question: "How do you protect the business?",
      choices: shuffled(rng, [
        { text: "Write down the playbook and install strong managers", points: 2, feedback: "A company that runs on systems, not one hero, is far safer - and worth much more at exit." },
        { text: "Beg the founder to keep quietly running it for you", points: 0, feedback: "Leaning on someone who's already gone is how founder-run buyouts quietly fall apart. Build the machine." },
        { text: "Change nothing and trust the team to cope", points: 1, feedback: "Hope isn't a plan. Without systems the next surprise becomes a crisis - fix it while things are calm." },
      ]),
    }),
  },
  {
    id: "pricing", title: "The Price List",
    build: (rng, c) => ({
      situation: `${c.target} hasn't raised prices in years while its costs climbed. Customers are loyal and rarely shop on price.`,
      question: "What do you do with pricing?",
      choices: shuffled(rng, [
        { text: "Raise prices modestly and improve the offer", points: 2, feedback: "A small, well-packaged rise on loyal customers flows almost straight to profit. Under-pricing is free money." },
        { text: "Triple prices at once to catch up on lost years", points: 0, feedback: "Shock pricing turns loyal regulars into ex-customers overnight. Pricing is a scalpel, not a sledgehammer." },
        { text: "Keep prices frozen to avoid any complaints", points: 1, feedback: "Timidity costs too: frozen prices against rising costs mean a margin that shrinks every single year." },
      ]),
    }),
  },
  {
    id: "costs", title: "The Overhead",
    build: (rng, c) => ({
      situation: `${c.target} carries bloated overhead - a fancy HQ, layers of perks - that eats into every coin of profit.`,
      question: "How do you handle costs?",
      choices: shuffled(rng, [
        { text: "Trim the clear waste while protecting what drives sales", points: 2, feedback: "Smart cost work removes fat, not muscle. You cut what customers never see and keep what wins them." },
        { text: "Slash every cost to the bone across the board", points: 1, feedback: "Indiscriminate cuts hit the things that drive sales too. You can't shrink your way to a great company." },
        { text: "Leave the overhead alone to avoid upsetting anyone", points: 0, feedback: "Ignoring obvious waste is leaving profit - and your return - on the table. That waste is why you're here." },
      ]),
    }),
  },
  {
    id: "paydown", title: "The Spare Cash",
    build: (rng, c) => ({
      situation: `${c.target} is throwing off healthy cash and still carries the debt from your buyout.`,
      question: "What do you do with the cash?",
      choices: shuffled(rng, [
        { text: "Pay down the debt to grow your equity value", points: 2, feedback: "Every coin of debt retired becomes a coin of equity at exit - and lighter interest de-risks the whole deal." },
        { text: "Borrow even more to pay yourself a dividend", points: 0, feedback: "A dividend recap before you've earned it just stacks on risk. One bad quarter and the debt bites hard." },
        { text: "Let the cash pile up and decide later", points: 1, feedback: "Idle cash earns nothing and tempts sloppy spending. Put it to work - usually against that expensive debt." },
      ]),
    }),
  },
  {
    id: "exitTiming", title: "The Exit Window",
    build: (rng, c) => ({
      situation: `Three years in, ${c.target}'s profits have doubled. A buyer offers ${c.nowMult}× your money now; holding two more years might fetch ${c.maybeMult}×.`,
      question: "Exit now or hold?",
      choices: shuffled(rng, [
        { text: `Take the certain ${c.nowMult}× - "might" isn't "will"`, points: 2, feedback: "Funds return money in 3-5 years, and a guaranteed multiple beats a hopeful one. Buy, improve, sell, repeat." },
        { text: `Hold out for the bigger ${c.maybeMult}× down the road`, points: 1, feedback: "Defensible - until trends wobble. 'Maximize' at the end of a deal usually means 'took on too much risk'." },
        { text: "Never sell - just keep collecting the profits", points: 0, feedback: "PE funds MUST sell to return investors' money. Exiting isn't optional - it's the entire business model." },
      ]),
    }),
  },
  {
    id: "exitRoute", title: "The Buyers",
    build: (rng, c) => ({
      situation: `It's time to sell ${c.target}. A strategic buyer, a rival fund, and an IPO are all on the table.`,
      question: "How do you run the exit?",
      choices: shuffled(rng, [
        { text: "Run all three against each other for the best price", points: 2, feedback: "Competition among buyers is what lifts the exit price. A real process beats quietly taking the first offer." },
        { text: "Grab the first fair offer to avoid the hassle", points: 1, feedback: "Certainty has value, but skipping competition usually leaves money behind. Make them bid before you sign." },
        { text: "Hold out for a dream price and reject them all", points: 0, feedback: "Waiting for a fantasy number is how live offers expire and windows slam shut. Sell into real demand." },
      ]),
    }),
  },
  {
    id: "diligence", title: "Kick the Tires",
    build: (rng, c) => ({
      situation: `Before wiring ${money(c.buyPrice)} for ${c.target}, your team has two weeks to dig into its books and customers.`,
      question: "How deep do you dig?",
      choices: shuffled(rng, [
        { text: "Pressure-test the numbers and the flaw you're underwriting", points: 2, feedback: "Diligence exists to confirm the story before you pay. You verify the very problem your whole thesis rests on." },
        { text: "Trust the seller's polished deck and skip the digging", points: 0, feedback: "Sellers show their best face. Buying on the pitch deck alone is how funds inherit nasty surprises after closing." },
        { text: "Delay for six months to check every tiny detail", points: 1, feedback: "Diligence has diminishing returns and deals have clocks. Verify what matters, not every atom, before the deal dies." },
      ]),
    }),
  },
  {
    id: "alignment", title: "The Manager's Stake",
    build: (rng, c) => ({
      situation: `${c.target}'s managers will stay on, and you decide how they're rewarded for the years of hard work ahead.`,
      question: "How do you motivate them?",
      choices: shuffled(rng, [
        { text: "Give them equity so they win only if the company wins", points: 2, feedback: "Skin in the game aligns managers with your return. When they own a slice, their late nights build your value too." },
        { text: "Pay flat salaries with no link to performance", points: 0, feedback: "A fixed check rewards showing up, not results. Without upside, managers have no reason to chase the plan hard." },
        { text: "Promise huge bonuses no matter how the company does", points: 1, feedback: "Guaranteed bonuses cost cash and still don't tie pay to results. Ownership beats a check that pays win or lose." },
      ]),
    }),
  },
  {
    id: "workingCapital", title: "The Trapped Cash",
    build: (rng, c) => ({
      situation: `${c.target} has coins locked up in slow-moving inventory and customers who pay late, starving it of cash.`,
      question: "What's the quick win?",
      choices: shuffled(rng, [
        { text: "Free the cash by tightening inventory and collections", points: 2, feedback: "Working-capital cleanup is free money - it releases cash already inside the business without selling a single extra thing." },
        { text: "Ignore it since the profit line looks fine", points: 0, feedback: "Profit can look great while cash is trapped in the warehouse. Cash pays the debt, so freeing it is a fast, real win." },
        { text: "Borrow more to cover the cash squeeze instead", points: 1, feedback: "Piling on debt to plug a gap you could fix operationally adds risk for nothing. Free your own cash first." },
      ]),
    }),
  },
  {
    id: "growthBet", title: "The Growth Bet",
    build: (rng, c) => ({
      situation: `${c.target} could invest heavily to open new locations, or harvest cash and stay the size it is.`,
      question: "Which path builds more value?",
      choices: shuffled(rng, [
        { text: "Invest where the returns clearly beat the cost of capital", points: 2, feedback: "Growth is only good if each coin invested earns more than it costs. Disciplined expansion compounds your equity." },
        { text: "Chase growth everywhere regardless of the returns", points: 1, feedback: "Growth for its own sake can burn cash on projects that never pay back. Expand where the math actually works." },
        { text: "Never reinvest - always pull every coin out", points: 0, feedback: "Starving a healthy business of investment caps its value. Refusing all growth leaves easy returns on the table." },
      ]),
    }),
  },
  {
    id: "concentration", title: "The One Big Customer",
    build: (rng, c) => ({
      situation: `Nearly half of ${c.target}'s sales come from a single customer who could leave at any time.`,
      question: "How do you handle that risk?",
      choices: shuffled(rng, [
        { text: "Lock in that customer while winning new ones to diversify", points: 2, feedback: "Concentration is fragile. Deepening the key relationship while broadening the base makes the whole company safer and worth more." },
        { text: "Do nothing and hope the big customer stays forever", points: 0, feedback: "Betting the business on one account that can walk is how a single lost contract wipes out your return overnight." },
        { text: "Fire the big customer to force everyone to diversify", points: 1, feedback: "Dumping your biggest source of sales to 'fix' concentration is self-harm. Grow around it - don't detonate it." },
      ]),
    }),
  },
  {
    id: "systems", title: "The Old Software",
    build: (rng, c) => ({
      situation: `${c.target} still runs on spreadsheets and paper, so no one really knows its numbers until months later.`,
      question: "What do you do about it?",
      choices: shuffled(rng, [
        { text: "Invest in systems that show the numbers in real time", points: 2, feedback: "You can't improve what you can't see. Better systems turn a foggy business into one you can actually steer and value." },
        { text: "Leave the paper process since it 'still works'", points: 0, feedback: "Flying blind is expensive. Without timely data, problems fester for months before anyone even notices them." },
        { text: "Rip out everything and rebuild all systems overnight", points: 1, feedback: "A big-bang tech replacement can halt the business. Upgrade what matters most first, then build from there." },
      ]),
    }),
  },
  {
    id: "hundredDay", title: "The First 100 Days",
    build: (rng, c) => ({
      situation: `You've just closed on ${c.target} and the whole company is watching to see what the new owners do first.`,
      question: "How do you spend the first 100 days?",
      choices: shuffled(rng, [
        { text: "Execute a focused plan on the few things that matter most", points: 2, feedback: "The early days set the tone. A tight plan hitting the biggest levers builds momentum and trust from day one." },
        { text: "Change nothing for a year to keep everyone calm", points: 1, feedback: "Total stillness wastes the fresh mandate. The first 100 days are when change is easiest - use them, don't sleep them." },
        { text: "Overhaul every single thing at once for shock value", points: 0, feedback: "Changing everything at once overwhelms the team and breaks what worked. Focus beats chaos in the opening stretch." },
      ]),
    }),
  },
  {
    id: "secondaryExit", title: "The Fund-to-Fund Sale",
    build: (rng, c) => ({
      situation: `Another PE fund offers ${c.nowMult}× your money for ${c.target}, saying it can push growth to a level you can't.`,
      question: "Do you sell to a rival fund?",
      choices: shuffled(rng, [
        { text: `Sell if ${c.nowMult}× hits your return and the next owner adds real value`, points: 2, feedback: "A secondary buyout is fine when the price is right and the buyer can genuinely take it further. Return the cash and move on." },
        { text: "Refuse on principle to ever sell to a competitor", points: 1, feedback: "Pride isn't a strategy. If a rival fund pays your number, taking it and recycling capital is exactly the job." },
        { text: "Sell at any price just to be rid of the company", points: 0, feedback: "Dumping a good asset below its worth to save effort torches your investors' return. Sell well, not just fast." },
      ]),
    }),
  },
  {
    id: "addBacks", title: "The Adjusted Profit",
    build: (rng, c) => ({
      situation: `A banker selling ${c.rival} shows profit boosted by lots of 'one-time' add-backs that make it look far healthier.`,
      question: "How do you read those numbers?",
      choices: shuffled(rng, [
        { text: "Accept only add-backs that are truly one-off and provable", points: 2, feedback: "Add-backs can be fair or fiction. Underwriting only the genuine, documented ones keeps you from overpaying on hot air." },
        { text: "Take every add-back at face value to close faster", points: 0, feedback: "Swallowing inflated add-backs means paying for profit that isn't real. Sellers pad these numbers on purpose." },
        { text: "Reject all adjustments and only look at raw numbers", points: 1, feedback: "Some add-backs are legitimately one-time. Ignoring them all can make you miss a genuinely good business." },
      ]),
    }),
  },
  {
    id: "covenant", title: "The Covenant",
    build: (rng, c) => ({
      situation: `A soft quarter pushes ${c.target} close to breaking a promise it made to its lenders about its debt.`,
      question: "What's the right move?",
      choices: shuffled(rng, [
        { text: "Get ahead of it - talk to lenders early with a real plan", points: 2, feedback: "Lenders hate surprises more than problems. Coming to them early with a fix usually earns room; hiding it never does." },
        { text: "Say nothing and hope next quarter fixes itself", points: 0, feedback: "A quiet covenant breach discovered by the bank can trigger default. Silence turns a manageable dip into a crisis." },
        { text: "Immediately fire-sale assets in a panic to raise cash", points: 1, feedback: "Panic-selling good assets cheap destroys value you'll want back. Talk first - most covenant issues get worked out." },
      ]),
    }),
  },
  {
    id: "culture", title: "The Two Cultures",
    build: (rng, c) => ({
      situation: `You bolt ${c.rival} onto ${c.target}, but the two teams work in totally different ways and friction is rising.`,
      question: "How do you handle it?",
      choices: shuffled(rng, [
        { text: "Blend the best of both and set one clear shared way", points: 2, feedback: "Deals fail on culture as often as on numbers. Actively merging how people work protects the value you paid for." },
        { text: "Force the acquired team to change everything instantly", points: 1, feedback: "Steamrolling one culture breeds resentment and quiet quitting. Integration works better as a two-way blend." },
        { text: "Ignore the friction and let the teams sort it out", points: 0, feedback: "Cultural clashes left alone fester into lost people and stalled savings - the exact synergies you bought disappear." },
      ]),
    }),
  },
  {
    id: "expansion", title: "The New Market",
    build: (rng, c) => ({
      situation: `${c.target} could enter a nearby region where it has no track record but sees real demand.`,
      question: "How do you approach it?",
      choices: shuffled(rng, [
        { text: "Test small, learn, then scale what actually works", points: 2, feedback: "A cheap pilot tells you if the demand is real before you bet big. Expansion works best as a staged, evidence-led move." },
        { text: "Go all-in immediately with a massive rollout", points: 1, feedback: "Betting the fund on an untested market can blow up fast. Prove the model in one spot before you flood the region." },
        { text: "Never leave the home market under any circumstances", points: 0, feedback: "Refusing all expansion caps growth and value. Real demand next door is worth a careful, tested step toward it." },
      ]),
    }),
  },
  {
    id: "supplier", title: "The Single Supplier",
    build: (rng, c) => ({
      situation: `${c.target} buys a crucial part from just one supplier who keeps hiking prices, knowing there's no backup.`,
      question: "What's the fix?",
      choices: shuffled(rng, [
        { text: "Qualify a second source to restore your bargaining power", points: 2, feedback: "A backup supplier ends the squeeze - competition on your buy side lowers costs and de-risks the whole operation." },
        { text: "Keep paying the rising prices to avoid any disruption", points: 0, feedback: "A sole supplier who knows you're trapped will keep raising prices. Dependence like that quietly eats your margin." },
        { text: "Threaten the supplier without any real alternative", points: 1, feedback: "Bluffing with no backup fails - they know you can't leave. Build the alternative first, then you have real leverage." },
      ]),
    }),
  },
  {
    id: "quality", title: "The Reputation",
    build: (rng, c) => ({
      situation: `To lift short-term profit, someone suggests cheapening ${c.target}'s product in ways customers might eventually notice.`,
      question: "Do you cut the quality?",
      choices: shuffled(rng, [
        { text: "Protect quality - the brand is the reason customers pay", points: 2, feedback: "Quietly gutting quality trades tomorrow's brand for today's margin. Reputation is a moat you don't sell for a quick bump." },
        { text: "Cheapen it everywhere for an immediate profit jump", points: 0, feedback: "Customers notice, and a wrecked reputation shrinks your exit price far more than the short-term savings ever added." },
        { text: "Cut quality only on the products nobody buys anyway", points: 1, feedback: "Trimming dead products is fine, but if they don't sell it barely helps. Don't dress up a quality cut as strategy." },
      ]),
    }),
  },
  {
    id: "turnaround", title: "The Bleeding Unit",
    build: (rng, c) => ({
      situation: `One division of ${c.target} loses money every month, and the flaw you underwrote lives mostly there.`,
      question: "What do you do with it?",
      choices: shuffled(rng, [
        { text: "Decide fast: fix it with a real plan or cut it loose", points: 2, feedback: "A losing unit needs a clear verdict, not drift. Either a credible turnaround or a clean exit - both beat slow bleeding." },
        { text: "Keep funding the losses indefinitely and hope", points: 0, feedback: "Feeding a money-loser with no plan drains the healthy business. Hope is not a turnaround strategy." },
        { text: "Cut it instantly without checking if it's fixable", points: 1, feedback: "Some bleeding units are fixable gold. Snap-cutting without analysis can throw away the very upside you bought." },
      ]),
    }),
  },
  {
    id: "talentUpgrade", title: "The New CFO",
    build: (rng, c) => ({
      situation: `${c.target}'s finance chief was fine for a small firm but is out of their depth for the bigger company you're building.`,
      question: "How do you handle leadership?",
      choices: shuffled(rng, [
        { text: "Upgrade the role with someone built for the next stage", points: 2, feedback: "Companies outgrow their early leaders. Putting the right person in the seat is one of PE's highest-return moves." },
        { text: "Keep them out of loyalty despite the growing gaps", points: 1, feedback: "Loyalty is admirable, but a mismatched leader caps the whole company. Support them into a fitting role instead." },
        { text: "Fire the entire management team on day one", points: 0, feedback: "Clearing out everyone destroys the knowledge that runs the place. Upgrade specific gaps - don't torch the team." },
      ]),
    }),
  },
  {
    id: "refinance", title: "The Refinance",
    build: (rng, c) => ({
      situation: `Rates have dropped since you bought ${c.target}, and its debt could be refinanced at a much lower cost.`,
      question: "Should you refinance?",
      choices: shuffled(rng, [
        { text: "Refinance if the savings clearly beat the fees to do it", points: 2, feedback: "Cheaper debt drops interest straight to equity value. When the math nets out positive, refinancing is easy money." },
        { text: "Refinance constantly regardless of the fees involved", points: 1, feedback: "Every refinance has costs. Doing it without checking that savings exceed fees can quietly lose money." },
        { text: "Never touch the original debt out of habit", points: 0, feedback: "Sticking with expensive debt when far cheaper money is available leaves real return on the table for no reason." },
      ]),
    }),
  },
  {
    id: "exitPrep", title: "The Cleanup",
    build: (rng, c) => ({
      situation: `You'll sell ${c.target} next year and want buyers to pay full price for the improved business.`,
      question: "How do you prepare for sale?",
      choices: shuffled(rng, [
        { text: "Tidy the numbers and document the story before you list", points: 2, feedback: "Buyers pay up for a clean, well-evidenced business. Prepping the data and the narrative early lifts the exit price." },
        { text: "Slap it on the market as-is with messy records", points: 0, feedback: "A messy company invites lowball bids and scary diligence findings. Clean it up first or leave money on the table." },
        { text: "Inflate the numbers with tricks to fool buyers", points: 1, feedback: "Sophisticated buyers see through window dressing, and it blows up trust in diligence. Real improvement sells; gimmicks don't." },
      ]),
    }),
  },
  {
    id: "downsidePlan", title: "The Rainy Day",
    build: (rng, c) => ({
      situation: `A recession could hit before you exit ${c.target}, and its debt still needs to be paid either way.`,
      question: "How do you prepare for a downturn?",
      choices: shuffled(rng, [
        { text: "Stress-test the plan and keep a cushion for bad times", points: 2, feedback: "Good investors plan for the storm before it comes. A tested downside case and some breathing room keep the deal alive." },
        { text: "Assume good times continue and plan only for those", points: 0, feedback: "Betting the deal on permanent sunshine is how leveraged buyouts fail. The downside always eventually arrives." },
        { text: "Sell everything now at any price to dodge the risk", points: 1, feedback: "Panic-exiting a healthy company for fear of a maybe-recession sacrifices real value. Prepare - don't flee." },
      ]),
    }),
  },
  {
    id: "reRating", title: "The Re-Rating",
    build: (rng, c) => ({
      situation: `You bought small ${c.target} at a low multiple; grown much bigger, similar companies trade at a higher multiple.`,
      question: "Why can that lift your return?",
      choices: shuffled(rng, [
        { text: "A bigger, safer company earns a higher multiple at exit", points: 2, feedback: "Scale and stability re-rate a business: buyers pay a higher multiple for the same profit, boosting your return on top of growth." },
        { text: "Multiples never change no matter the company's size", points: 0, feedback: "They do change - larger, more resilient companies command richer multiples. That re-rating is a core PE value driver." },
        { text: "Only luck decides what multiple a buyer will pay", points: 1, feedback: "Luck plays a part, but size, growth and quality genuinely move the multiple. It's earned, not just rolled on dice." },
      ]),
    }),
  },
]

function peDeal(rng: Rng, fee: number, week: number): CareerDeal {
  const target = pick(rng, PE_TARGETS)
  let rival = pick(rng, PE_TARGETS)
  if (rival === target) rival = PE_TARGETS[(PE_TARGETS.indexOf(target) + 1) % PE_TARGETS.length]
  const nowMult = 2 + Math.round(rng() * 10) / 10
  const ctx: PeCtx = {
    target,
    rival,
    flaw: pick(rng, PE_FLAWS).flaw,
    buyPrice: int(rng, 3, 12) * 1_000_000,
    nowMult,
    maybeMult: nowMult + 1,
  }

  // Three DIFFERENT beats per week - the whole point: no two weeks alike.
  const chosen = pickDistinct(rng, PE_ARCHES, 3)
  const stages: CareerStage[] = chosen.map(a => a.build(rng, ctx))
  const head = chosen[0]

  return {
    id: `gen-pe-${week}`,
    title: `${target.split(" ")[0]}: ${head.title}`,
    client: target,
    tagline: `Buy ${target}, create value, exit well.`,
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

// A wealth manager's week is never the same conversation twice. We compose
// each client meeting from THREE DISTINCT archetypes across real advice work -
// allocation, scams, panics, foundations, windfalls, FOMO, rebalancing,
// diversification, debt, fees. Option lengths are kept ~equal.

interface WmCtx { name: string; age: number; job: string; horizon: string; savings: number; scam: string; drop: number; young: boolean }

interface WmArche { id: string; title: string; build: (rng: Rng, c: WmCtx) => CareerStage }

const WM_ARCHES: WmArche[] = [
  {
    id: "allocation", title: "The Mix",
    build: (rng, c) => ({
      situation: `${c.name}, ${c.age}, a ${c.job} with ${money(c.savings)} coins saved, is ${c.horizon}. How should it be invested?`,
      question: `The right mix for ${c.name}?`,
      choices: shuffled(rng, c.young
        ? [
            { text: "Mostly stocks with a small bond cushion", points: 2, feedback: `With ${c.horizon}, time is ${c.name}'s superpower - growth assets win over long horizons.` },
            { text: "Half cash to be safe, half in stocks", points: 1, feedback: "That much idle cash quietly loses to inflation over decades - 'safe' that costs a fortune." },
            { text: "Everything into one exciting hot stock", points: 0, feedback: "One company can go to zero. Diversification is rule #1 of managing other people's money." },
          ]
        : [
            { text: "Shift toward bonds and cash, keep some stocks", points: 2, feedback: `${c.name} will spend this money soon - a crash right before or during retirement can't be waited out.` },
            { text: "Move all of it straight into cash now", points: 1, feedback: "Too far - retirement can last 30 years, and all-cash guarantees inflation slowly erodes it." },
            { text: "Stay fully aggressive - stocks always recover", points: 0, feedback: "'Eventually' is the trap: a retiree withdrawing during a crash can run out entirely (sequence risk)." },
          ]),
    }),
  },
  {
    id: "scam", title: "The 'Sure Thing'",
    build: (rng, c) => ({
      situation: `${c.name} is excited about ${c.scam} and wants to move a third of their portfolio into it.`,
      question: "Your advice?",
      choices: shuffled(rng, [
        { text: "Guaranteed, huge, and urgent - that's a scam", points: 2, feedback: "Real investing always trades risk for return. 'Guaranteed + huge + urgent' is THE classic fraud pattern." },
        { text: "Allow a small taste - what's the harm?", points: 1, feedback: "Scams don't get safe in small doses - a 'taste' that pays out early is how victims get pulled all-in." },
        { text: "Approve it - the returns would be huge", points: 0, feedback: "If it sounds too good to be true, it isn't true. No exceptions - not for family, not for urgency." },
      ]),
    }),
  },
  {
    id: "panic", title: "The Midnight Text",
    build: (rng, c) => ({
      situation: `Markets tumble ${c.drop}% overnight. ${c.name} texts you: "Sell everything before it drops more!"`,
      question: "Your reply?",
      choices: shuffled(rng, [
        { text: "Call them - the plan was built for this dip", points: 2, feedback: "Talking clients off the ledge in a dip is where advisors earn their fee. Panic-selling is the #1 wealth destroyer." },
        { text: "Sell half to meet the panic in the middle", points: 0, feedback: "Half-panicking is still panicking - it locks in real losses on money that had time to recover." },
        { text: "Wait and reply during office hours", points: 1, feedback: "Technically fine, relationally fatal - scary nights are when clients decide whether they trust you." },
      ]),
    }),
  },
  {
    id: "foundation", title: "The Foundation",
    build: (rng, c) => ({
      situation: `${c.name} wants to invest every coin, but has no cash set aside if the car breaks down tomorrow.`,
      question: "What comes first?",
      choices: shuffled(rng, [
        { text: "Set aside a few months of cash, then invest", points: 2, feedback: "An emergency fund stops a surprise bill from forcing a sale at the worst time - or into high-interest debt." },
        { text: "Invest it all - emergencies probably won't hit", points: 0, feedback: "Emergencies always come eventually. Then they're selling investments in a dip, losing money they didn't need to." },
        { text: "Buy insurance for every possible mishap first", points: 1, feedback: "Insurance has its place, but over-insuring a tight budget drains the money that should be growing." },
      ]),
    }),
  },
  {
    id: "windfall", title: "The Windfall",
    build: (rng, c) => ({
      situation: `${c.name} just inherited a big lump sum and wants to act on it fast.`,
      question: "How do you guide it?",
      choices: shuffled(rng, [
        { text: "Pause, secure cash, then fit it to the plan", points: 2, feedback: "Cool off, shore up the safety net, then fold it into their goals. Sudden money vanishes fastest without a plan." },
        { text: "Pour it all into stocks this afternoon", points: 1, feedback: "Right principle, wrong order - secure the foundation and check their goals first. Plan, then invest." },
        { text: "Spend a big chunk on something fun now", points: 0, feedback: "A small celebration is fine; blowing a windfall is how people end up right back where they started." },
      ]),
    }),
  },
  {
    id: "fomo", title: "The Hot Tip",
    build: (rng, c) => ({
      situation: `A friend "got rich" on a hot bet, and ${c.name} wants to pile a big chunk in to catch up.`,
      question: "Your advice?",
      choices: shuffled(rng, [
        { text: "Steer them off it - chasing winners buys the top", points: 2, feedback: "The thing everyone already got rich on is usually the most dangerous place to jump in. Protect them from FOMO." },
        { text: "Cap a tiny fun-money slice, walled off", points: 1, feedback: "A small, separate gamble can scratch the itch - just be clear it's entertainment, not the plan." },
        { text: "Move a big chunk in before it climbs more", points: 0, feedback: "Betting a big slice of a life plan on a hot tip is how good savers blow themselves up. When it drops, so does the goal." },
      ]),
    }),
  },
  {
    id: "rebalance", title: "The Drift",
    build: (rng, c) => ({
      situation: `After a big rally, ${c.name}'s mix has drifted to mostly stocks - more risk than the plan called for.`,
      question: "What do you do?",
      choices: shuffled(rng, [
        { text: "Rebalance back toward the target mix", points: 2, feedback: "Rebalancing quietly sells high and buys low, and keeps risk where the client can actually stomach it." },
        { text: "Let it ride - winners keep on winning", points: 0, feedback: "Letting risk drift means a crash hits far harder than they signed up for. Discipline beats the hot streak." },
        { text: "Sell all the stocks to lock in the gains", points: 1, feedback: "Too far - dumping all growth guarantees inflation erodes it. Trim back to target; don't abandon the plan." },
      ]),
    }),
  },
  {
    id: "diversify", title: "The Company Stock",
    build: (rng, c) => ({
      situation: `${c.name} wants to put most of their savings into their own employer's stock - "I know this company."`,
      question: "Your advice?",
      choices: shuffled(rng, [
        { text: "Spread it wide - one stock can go to zero", points: 2, feedback: "Their job AND their savings riding on one company doubles the risk. Diversification is the whole safety net." },
        { text: "A modest slice there, the rest diversified", points: 1, feedback: "A small position is fine, but 'most of it' concentrates their whole life in one place. Keep the slice small." },
        { text: "Go all in - they trust their own company", points: 0, feedback: "Familiarity isn't safety. If the employer stumbles, they lose the paycheck and the savings at once." },
      ]),
    }),
  },
  {
    id: "debt", title: "The Credit Card",
    build: (rng, c) => ({
      situation: `${c.name} has ${money(c.savings)} to invest but also a credit card charging 24% interest.`,
      question: "What comes first?",
      choices: shuffled(rng, [
        { text: "Pay off the 24% card before investing", points: 2, feedback: "Clearing 24% debt is a guaranteed 24% return - better than the market offers, with zero risk." },
        { text: "Split the money between card and stocks", points: 1, feedback: "Better than ignoring it, but every coin left on that card costs 24% - far more than stocks are likely to earn." },
        { text: "Invest it all - the market beats 24%", points: 0, feedback: "The market can't reliably beat a guaranteed 24% drain. Paying the card is the surest 'investment' here." },
      ]),
    }),
  },
  {
    id: "fees", title: "The Fine Print",
    build: (rng, c) => ({
      situation: `${c.name} is choosing between a cheap index fund and a pricey 'star' fund with high fees.`,
      question: "Which do you recommend?",
      choices: shuffled(rng, [
        { text: "The low-cost index - fees compound against you", points: 2, feedback: "High fees quietly eat returns every year, and most 'star' funds don't beat the index after costs." },
        { text: "The pricey fund - you get what you pay for", points: 0, feedback: "With funds, you often get what you DON'T pay for. High fees are the surest predictor of lower net returns." },
        { text: "Split between both to hedge your bets", points: 1, feedback: "Half-measures still bleed fees on half the money. When the cheap option usually wins, why fund the expensive one?" },
      ]),
    }),
  },
  {
    id: "taxShelter", title: "The Tax Shelter",
    build: (rng, c) => ({
      situation: `${c.name} invests in a plain account and pays tax every year, while their workplace retirement account sits half-empty.`,
      question: "Where should new savings go first?",
      choices: shuffled(rng, [
        { text: "Fill tax-advantaged accounts before the taxable one", points: 2, feedback: "Tax-advantaged accounts let money compound untaxed for years - using them first is one of the biggest free wins in investing." },
        { text: "Keep everything in the regular taxable account", points: 0, feedback: "Paying tax on gains every year is a needless drag when tax-sheltered accounts sit unused right beside it." },
        { text: "Stop investing until they fully understand taxes", points: 1, feedback: "Waiting for perfect knowledge wastes years of compounding. Use the sheltered accounts now and learn the details later." },
      ]),
    }),
  },
  {
    id: "lumpSum", title: "The Lump Sum",
    build: (rng, c) => ({
      situation: `${c.name} has a large sum to invest but is terrified of putting it all in right before a possible dip.`,
      question: "How do you invest it?",
      choices: shuffled(rng, [
        { text: "Spread it in over months to ease the timing fear", points: 2, feedback: "Investing gradually smooths out the fear of a bad day and keeps them from freezing - the plan they'll actually stick to wins." },
        { text: "Wait in cash until the market clearly looks safe", points: 0, feedback: "Nobody rings a bell at the bottom. 'Waiting for safe' usually means missing the recovery entirely." },
        { text: "Dump it all in on a single day and look away", points: 1, feedback: "Investing at once is fine mathematically, but a nervous client who panics at the first drop is the real risk here." },
      ]),
    }),
  },
  {
    id: "goals", title: "The Goal First",
    build: (rng, c) => ({
      situation: `${c.name} asks you to buy 'whatever's hot right now' without saying what the money is even for.`,
      question: "What do you do first?",
      choices: shuffled(rng, [
        { text: "Define the goal and timeline before picking anything", points: 2, feedback: "The goal decides the plan. Money needed in two years and money for retirement belong in completely different places." },
        { text: "Buy whatever's trending to keep the client happy", points: 0, feedback: "Investing with no goal is gambling with extra steps. Without a target you can't tell success from luck." },
        { text: "Put it all in cash so no goal is ever needed", points: 1, feedback: "All-cash dodges the question but loses to inflation. First find the goal, then match the mix to it." },
      ]),
    }),
  },
  {
    id: "lifeInsurance", title: "The Dependents",
    build: (rng, c) => ({
      situation: `${c.name}, ${c.age}, supports young kids on their income but has no life insurance in place.`,
      question: "What do you raise with them?",
      choices: shuffled(rng, [
        { text: "Cover the income their family relies on with term insurance", points: 2, feedback: "When people depend on your paycheck, protecting it comes before fancy investing. Simple term insurance does exactly that." },
        { text: "Skip insurance and just invest more aggressively", points: 0, feedback: "No amount of investing helps the family if the earner is suddenly gone next year. Protection comes first." },
        { text: "Buy the priciest whole-life policy the agent pitches", points: 1, feedback: "Expensive bundled policies often over-serve the need. Right-sized term coverage usually protects the family for far less." },
      ]),
    }),
  },
  {
    id: "estate", title: "The Beneficiaries",
    build: (rng, c) => ({
      situation: `${c.name} has never named who inherits their accounts, assuming it'll 'just sort itself out' someday.`,
      question: "How important is this?",
      choices: shuffled(rng, [
        { text: "Set beneficiaries and a basic plan now to avoid chaos", points: 2, feedback: "Named beneficiaries route money quickly and privately. Skipping it can drag loved ones through a slow, public legal mess." },
        { text: "Leave it - the law will guess their wishes fine", points: 0, feedback: "Default laws may send money to the wrong people entirely. A few forms now spare the family a painful, costly tangle." },
        { text: "Only worry about it once they're elderly", points: 1, feedback: "Accidents don't check your age. Basic beneficiary paperwork matters the moment there are assets and people you care about." },
      ]),
    }),
  },
  {
    id: "college", title: "The College Fund",
    build: (rng, c) => ({
      situation: `${c.name} wants to save for a child's college, 15 years away, and asks where that money should sit.`,
      question: "Your recommendation?",
      choices: shuffled(rng, [
        { text: "A tax-advantaged college account invested for growth", points: 2, feedback: "With 15 years to run, growth investments in a tax-advantaged college account let compounding do the heavy lifting." },
        { text: "A plain savings account earning almost nothing", points: 0, feedback: "Cash barely grows and loses to inflation over 15 years - a long runway is exactly when you want it invested." },
        { text: "One hand-picked stock they feel lucky about", points: 1, feedback: "A single stock could soar or crater right before tuition is due. Diversified growth is far safer for a real goal." },
      ]),
    }),
  },
  {
    id: "mortgageVsInvest", title: "The Mortgage",
    build: (rng, c) => ({
      situation: `${c.name} has spare cash and asks whether to overpay their low-rate mortgage or invest the money instead.`,
      question: "How do you frame it?",
      choices: shuffled(rng, [
        { text: "Weigh the mortgage rate against expected returns and their comfort", points: 2, feedback: "It's a rate-vs-return call plus peace of mind. A low mortgage rate often loses to investing, but guaranteed debt relief has real value too." },
        { text: "Always pay off any mortgage as fast as humanly possible", points: 1, feedback: "Debt-free feels great, but rushing a cheap mortgage can mean skipping higher expected returns. It's a trade-off, not a rule." },
        { text: "Never pay extra - always invest every spare coin", points: 0, feedback: "Ignoring the guaranteed 'return' of clearing debt - and the client's need to sleep at night - misses half the picture." },
      ]),
    }),
  },
  {
    id: "inheritedStock", title: "The Inherited Shares",
    build: (rng, c) => ({
      situation: `${c.name} inherited a huge position in one company's stock and feels it would be 'disloyal' to sell any of it.`,
      question: "Your advice?",
      choices: shuffled(rng, [
        { text: "Trim it gradually to reduce the single-company risk", points: 2, feedback: "One stock holding most of your wealth is dangerous no matter the sentiment. Easing out spreads the risk while respecting the emotion." },
        { text: "Keep every share forever out of family loyalty", points: 0, feedback: "Sentiment doesn't protect a portfolio. If that one company stumbles, a lifetime of wealth can vanish with it." },
        { text: "Sell all of it in a single day right now", points: 1, feedback: "Diversifying is right, but a rushed all-at-once sale can trigger a big tax bill. Do it thoughtfully, not overnight." },
      ]),
    }),
  },
  {
    id: "annuity", title: "The Complex Product",
    build: (rng, c) => ({
      situation: `A salesperson pitched ${c.name} a complicated product with high fees and terms nobody at the table can fully explain.`,
      question: "What do you tell them?",
      choices: shuffled(rng, [
        { text: "Don't buy what you can't understand or easily exit", points: 2, feedback: "Opaque, high-fee, hard-to-exit products usually serve the seller. If it can't be explained simply, that's the answer." },
        { text: "Buy it since the salesperson sounded confident", points: 0, feedback: "Confidence isn't disclosure. Complex products with big commissions are designed to sound better than they are." },
        { text: "Put their entire portfolio into it to keep things simple", points: 1, feedback: "Concentrating everything in one confusing, costly product is the opposite of simple - it stacks fee risk on top of complexity." },
      ]),
    }),
  },
  {
    id: "sidelines", title: "The Sidelines",
    build: (rng, c) => ({
      situation: `${c.name} has sat in cash for two years 'waiting for the right moment' while markets drifted higher.`,
      question: "How do you coach them?",
      choices: shuffled(rng, [
        { text: "Get invested on a plan - time in beats timing the market", points: 2, feedback: "Waiting for the perfect entry usually costs more than it saves. A steady plan beats forever guessing the top and bottom." },
        { text: "Keep waiting until the news finally feels calm", points: 0, feedback: "By the time news feels calm, prices have already moved. 'Waiting for certainty' is how people miss whole bull markets." },
        { text: "Go all-in today because they're clearly behind", points: 1, feedback: "The instinct to invest is right, but shoving it all in from guilt can spook them into panic-selling. Ease in on a plan." },
      ]),
    }),
  },
  {
    id: "activeVsIndex", title: "The Star Manager",
    build: (rng, c) => ({
      situation: `${c.name} wants to chase a fund that beat the market last year, sure the streak will continue.`,
      question: "Your guidance?",
      choices: shuffled(rng, [
        { text: "Warn that last year's winners rarely repeat after fees", points: 2, feedback: "Past performance chases itself in circles. Most hot funds cool off, and their high fees keep dragging every year." },
        { text: "Pile in - a winning streak proves real skill", points: 0, feedback: "One good year is mostly luck. Buying last year's chart is how investors consistently arrive right before the fade." },
        { text: "Sell everything else to fund this one bet", points: 1, feedback: "Even if the fund were great, concentrating the whole portfolio into it throws away diversification for a hunch." },
      ]),
    }),
  },
  {
    id: "cashDrag", title: "The Idle Cash",
    build: (rng, c) => ({
      situation: `Half of ${c.name}'s long-term portfolio has quietly sat in cash for years, well beyond any emergency need.`,
      question: "What's the issue?",
      choices: shuffled(rng, [
        { text: "Idle long-term cash loses ground to inflation over time", points: 2, feedback: "Cash beyond the emergency fund is a slow leak - inflation shrinks its buying power while it should be invested for the goal." },
        { text: "Nothing - more cash is always the safest choice", points: 0, feedback: "Cash feels safe but guarantees a real loss to inflation over the long run. Safe-feeling isn't the same as safe." },
        { text: "Move every last coin into stocks immediately", points: 1, feedback: "Right that it's over-cashed, wrong to leave zero buffer. Keep the emergency fund; invest only the truly long-term excess." },
      ]),
    }),
  },
  {
    id: "socialSecurity", title: "The Claiming Age",
    build: (rng, c) => ({
      situation: `${c.name} is nearing retirement and is tempted to claim government benefits as early as possible.`,
      question: "How do you frame the choice?",
      choices: shuffled(rng, [
        { text: "Weigh their health and needs - waiting boosts the check", points: 2, feedback: "Claiming later permanently raises the payment. For someone healthy who can afford to wait, that guaranteed increase is valuable." },
        { text: "Always claim the second they're eligible, no exceptions", points: 1, feedback: "Early claiming locks in a smaller check for life. Sometimes it's right, but 'always as early as possible' ignores the trade-off." },
        { text: "Ignore the decision since the amount can't change", points: 0, feedback: "It very much changes with timing. Treating it as fixed can cost a retiree a meaningfully larger lifetime income." },
      ]),
    }),
  },
  {
    id: "sleepTest", title: "The Sleep Test",
    build: (rng, c) => ({
      situation: `${c.name}'s plan is technically optimal, but the ups and downs make them so anxious they can't sleep.`,
      question: "What do you adjust?",
      choices: shuffled(rng, [
        { text: "Dial risk to a level they can actually stick with", points: 2, feedback: "The best plan is the one a client won't abandon in a panic. A slightly calmer portfolio they keep beats a 'perfect' one they ditch." },
        { text: "Force them to hold the optimal plan regardless", points: 0, feedback: "An 'optimal' plan the client bails on at the first drop is worthless. Fit the risk to the person, not just the spreadsheet." },
        { text: "Move them entirely to cash to end all worry", points: 1, feedback: "Zero risk brings its own risk - inflation and falling short of goals. Ease the anxiety without abandoning growth entirely." },
      ]),
    }),
  },
  {
    id: "speculation", title: "The Speculative Bet",
    build: (rng, c) => ({
      situation: `${c.name} is desperate to put a big slice of savings into a highly speculative, volatile asset.`,
      question: "How do you handle it?",
      choices: shuffled(rng, [
        { text: "Cap it to a small slice they can afford to lose", points: 2, feedback: "Speculation is fine in a small, defined dose. Sizing it so a total loss won't derail the plan keeps the fun from becoming a disaster." },
        { text: "Approve a huge allocation since they feel sure", points: 0, feedback: "Certainty about a volatile bet is a warning sign. A large position can wipe out years of careful saving overnight." },
        { text: "Ban it completely and lecture them about it", points: 1, feedback: "A flat 'no' often pushes clients to do it behind your back. A sensible, capped allocation keeps it safe and in the open." },
      ]),
    }),
  },
  {
    id: "lifestyleCreep", title: "The Raise",
    build: (rng, c) => ({
      situation: `${c.name} just got a big raise and their spending has quietly climbed to match every extra coin.`,
      question: "What do you suggest?",
      choices: shuffled(rng, [
        { text: "Bank a chunk of each raise before lifestyle absorbs it", points: 2, feedback: "Paying the future self first, right when income jumps, turns raises into wealth instead of just bigger bills." },
        { text: "Enjoy it all - a raise is meant to be spent", points: 0, feedback: "If every raise vanishes into lifestyle, income rises but net worth never does. Some enjoyment is fine; all of it isn't." },
        { text: "Freeze all spending and live exactly as before forever", points: 1, feedback: "Total deprivation rarely sticks. The durable move is capturing part of the raise while still enjoying some of it." },
      ]),
    }),
  },
  {
    id: "layoff", title: "The Layoff",
    build: (rng, c) => ({
      situation: `${c.name} just lost their job and nervously asks whether they should sell their investments to get by.`,
      question: "What's the plan?",
      choices: shuffled(rng, [
        { text: "Lean on the emergency fund and trim spending first", points: 2, feedback: "That's exactly what the emergency fund is for. Using cash and cutting costs avoids selling investments at a bad moment." },
        { text: "Sell the whole portfolio immediately to be safe", points: 0, feedback: "Liquidating everything in a crisis can lock in losses and blow up the long-term plan. Tap cash reserves first." },
        { text: "Change nothing and keep spending as before", points: 1, feedback: "Ignoring a lost paycheck drains reserves fast. Adjust the budget now so the safety net actually lasts." },
      ]),
    }),
  },
  {
    id: "hsa", title: "The Health Account",
    build: (rng, c) => ({
      situation: `${c.name} qualifies for a special tax-advantaged health savings account but treats it like a plain checking account.`,
      question: "What's the smarter use?",
      choices: shuffled(rng, [
        { text: "Fund it and, if possible, invest it for the long run", points: 2, feedback: "A health savings account can offer rare triple tax benefits. Funding and investing it makes it a quietly powerful long-term tool." },
        { text: "Ignore it - health accounts aren't worth the effort", points: 0, feedback: "Skipping a triple-tax-advantaged account leaves real money on the table. Few accounts offer benefits this good." },
        { text: "Pull all the money out every year for anything", points: 1, feedback: "Draining it for non-medical spending forfeits its tax edge. Let it grow for future health costs when you can." },
      ]),
    }),
  },
  {
    id: "giving", title: "The Donation",
    build: (rng, c) => ({
      situation: `${c.name} plans to donate to charity and was about to sell appreciated stock first to give the cash.`,
      question: "Is there a smarter way?",
      choices: shuffled(rng, [
        { text: "Donate the appreciated shares directly to skip the tax", points: 2, feedback: "Giving appreciated stock straight to the charity can avoid the gains tax entirely - more reaches the cause, less to taxes." },
        { text: "Sell first, pay the tax, then donate what's left", points: 0, feedback: "Selling first triggers a needless tax bill, shrinking both the gift and their pocket. Donating the shares directly is cleaner." },
        { text: "Skip giving since taxes make it pointless", points: 1, feedback: "Taxes don't ruin generosity - there's a smart structure for it. Don't abandon the goal; just do it tax-efficiently." },
      ]),
    }),
  },
  {
    id: "dailyCheck", title: "The Daily Check",
    build: (rng, c) => ({
      situation: `${c.name} checks their portfolio ten times a day and trades on every wiggle, feeling stressed and doing worse for it.`,
      question: "How do you coach the behavior?",
      choices: shuffled(rng, [
        { text: "Set a schedule to review rarely and stop the tinkering", points: 2, feedback: "Constant checking breeds panic trades that quietly bleed returns. Reviewing on a calm schedule lets the plan actually work." },
        { text: "Tell them to watch even more closely to stay in control", points: 0, feedback: "More screen time means more emotional trades, not more control. Over-monitoring is one of the surest ways to underperform." },
        { text: "Have them trade on every headline to stay ahead", points: 1, feedback: "Reacting to every headline is noise, not strategy. It racks up costs and stress while the disciplined investor quietly wins." },
      ]),
    }),
  },
]

function wmDeal(rng: Rng, fee: number, week: number): CareerDeal {
  const client = pick(rng, WM_CLIENTS)
  const ctx: WmCtx = {
    name: client.name, age: client.age, job: client.job, horizon: client.horizon,
    savings: int(rng, 2, 40) * 10_000,
    scam: pick(rng, WM_SCAMS),
    drop: int(rng, 15, 30),
    young: client.age < 50,
  }

  const chosen = pickDistinct(rng, WM_ARCHES, 3)
  const stages: CareerStage[] = chosen.map(a => a.build(rng, ctx))
  const head = chosen[0]

  return {
    id: `gen-wm-${week}`,
    title: `${client.name}: ${head.title}`,
    client: `${client.name}, ${client.age} - ${client.job}`,
    tagline: `Guide ${client.name} through this week's money decisions.`,
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
  const s = SCENARIOS[idx](c)
  // Shuffle the options so the best answer isn't always in the same slot.
  const choices = [...s.choices]
  for (let i = choices.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [choices[i], choices[j]] = [choices[j], choices[i]] }
  return { ...s, choices }
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
