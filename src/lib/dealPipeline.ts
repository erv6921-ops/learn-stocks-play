// dealPipeline - the Investment Banker career's living simulator: a real M&A /
// capital-markets ADVISORY practice.
//
// The job, modelled honestly for kids: a banker doesn't buy companies - they
// ADVISE. You compete to win a "mandate" (the job of running a deal), then
// execute it stage by stage - materials, marketing, meetings, bids, diligence,
// signing - keeping the deal alive through every wobble. When it closes you
// collect a "success fee": a slice of the transaction value, on the classic
// tiered (Lehman) scale that shrinks as deals get bigger. Bungle the execution
// and the deal can break: no close, no fee, and a dent in your reputation.
//
// Everything is deterministic from (week) so reloads are safe.

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
/** Shuffle a scenario's choices so the correct answer isn't always in the same slot. */
function shuffleChoices<T>(rng: Rng, arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
export function wordCountOk(text: string, min: number): boolean {
  return text.trim().split(/\s+/).filter(Boolean).length >= min
}

export const IB_PITCH_MIN_WORDS = 20
export const IB_NOTE_MIN_WORDS = 20

/* ── the success fee (tiered / Lehman-style, at coin scale) ─────────── */
// Real advisory fees shrink as a % as the deal grows: ~5-6% on tiny deals down
// toward 1-2% on huge ones. We mirror that shape at coin scale.
export function feeRate(value: number): number {
  if (value < 4000) return 0.06
  if (value < 12000) return 0.045
  if (value < 25000) return 0.03
  if (value < 45000) return 0.022
  return 0.017
}
/** The fee a deal pays if it closes at `value`, scaled by execution quality. */
export function successFee(value: number, health: number): number {
  const quality = 0.5 + (Math.max(0, Math.min(100, health)) / 100) * 0.5 // 0.5-1.0
  return Math.round(value * feeRate(value) * quality)
}

/* ── deal types ─────────────────────────────────────────────────────── */

export type DealType = "sellside" | "buyside" | "ipo" | "debt"

export interface DealTypeMeta {
  id: DealType
  label: string
  short: string
  icon: string
  /** What the counterparty is called, for scene-setting. */
  stageTitles: string[]
}
export const DEAL_TYPES: Record<DealType, DealTypeMeta> = {
  sellside: { id: "sellside", label: "Sell-side M&A", short: "Sell a company", icon: "🏷️", stageTitles: ["Positioning & materials", "Buyer outreach", "Management meetings", "Bids & negotiation", "Diligence & signing"] },
  buyside: { id: "buyside", label: "Buy-side M&A", short: "Buy a company", icon: "🎯", stageTitles: ["Target screening", "Valuation & offer", "Approach & NDA", "Negotiation", "Financing & close"] },
  ipo: { id: "ipo", label: "IPO", short: "Go public", icon: "🔔", stageTitles: ["Drafting the prospectus", "Regulatory review", "Valuation & price range", "The roadshow", "Pricing & listing"] },
  debt: { id: "debt", label: "Debt raise", short: "Raise a bond", icon: "🏦", stageTitles: ["Structure & size", "Rating agency prep", "Investor marketing", "Pricing", "Closing"] },
}

/* ── name pools ─────────────────────────────────────────────────────── */

const CLIENTS = ["SodaPop Inc.", "GameVerse Studios", "Streamly", "FreshCart", "NovaMedia", "BrightBank", "TrailBlaze Gear", "ZipCharge", "UrbanWheels", "PetPantry", "GlowTech", "CloudNine", "SummitFoods", "HarborLogistics", "AtlasSteel"]
const COUNTERPARTIES = ["MegaCorp", "TitanSoft", "GlobalGoods", "Apex Brands", "Summit Group", "OmniHoldings", "Pinnacle Partners", "Vertex Industries"]
const SECTORS = ["consumer brands", "software", "media", "retail", "energy", "logistics", "healthcare", "industrials"]
const PROJECTS = ["Falcon", "Comet", "Anchor", "Summit", "Orbit", "Blue Sky", "Redwood", "Thunder", "Lighthouse", "Meridian", "Cobalt", "Everest"]

/* ── mandates you can pitch for ─────────────────────────────────────── */

export interface Mandate {
  id: string
  project: string
  dealType: DealType
  client: string
  counterparty: string
  sector: string
  /** Transaction size in coins. */
  value: number
  rivals: string[]
  /** The pitch: how you win the job. */
  pitch: { situation: string; question: string; choices: PitchChoice[] }
}
export interface PitchChoice { text: string; points: 0 | 1 | 2; feedback: string }

const RIVAL_BANKS = ["Sterling & Co.", "Kingsbridge", "Halcyon Capital", "Ravenswood", "Meridian Partners", "Blackpine"]

function pitchFor(rng: Rng, dealType: DealType, client: string, value: number): Mandate["pitch"] {
  const byType: Record<DealType, Mandate["pitch"]> = {
    sellside: {
      situation: `${client}'s board is interviewing banks to sell the company. Two rivals are pitching eye-poppingly high valuations to win the job. You're up next.`,
      question: "How do you win the mandate?",
      choices: [
        { text: "Pitch a credible valuation and a sharp buyer list.", points: 2, feedback: "Winning on an inflated number you can't deliver is how banks lose the client mid-deal. Credibility and a real buyer list win the smart boards." },
        { text: "Match the rivals and pitch the highest valuation.", points: 1, feedback: "You might win the beauty contest, but you've boxed yourself into a price you can't hit - a brutal reset later. Boards remember who over-promised." },
        { text: "Guarantee the highest price, period.", points: 0, feedback: "A 'guaranteed' price no analysis supports screams desperation. The best clients see through it - and remember it." },
      ],
    },
    buyside: {
      situation: `${client} wants to acquire a rival and needs an advisor. They ask why they should hire you over two other banks.`,
      question: "Your winning pitch?",
      choices: [
        { text: "Disciplined valuation work and a plan to avoid overpaying.", points: 2, feedback: "Buy-side clients fear the 'winner's curse'. A banker who protects them from overpaying - not one who cheerleads - wins the trust." },
        { text: "Promise to get it done fast, whatever it takes.", points: 1, feedback: "Speed sounds great until 'whatever it takes' means overpaying. Discipline, not just hustle, is the buy-side banker's real value." },
        { text: "Tell them it's a steal - bid aggressively now.", points: 0, feedback: "Hyping the target before any diligence is how buyers overpay. Your job is a cool head, not cheerleading." },
      ],
    },
    ipo: {
      situation: `${client}'s founders are choosing a bank to lead their IPO. They ask: "Why do we even need a bank, and why yours?"`,
      question: "How do you win it?",
      choices: [
        { text: "You'll price it right, line up real investors, and vouch for their numbers.", points: 2, feedback: "That's underwriting: pricing, distribution, and trust. Founders pick the bank that protects the aftermarket, not the one flattering their ego." },
        { text: "Promise the highest IPO price on the street.", points: 1, feedback: "An overpriced IPO pops the wrong way and torches the investors you'll need next round. A great first day beats a greedy price." },
        { text: "You'll whip up retail hype; fundamentals later.", points: 0, feedback: "Hype without fundamentals is how IPOs crater weeks later. Founders who fall for it regret it; the good ones won't." },
      ],
    },
    debt: {
      situation: `${client} wants to raise money by issuing a bond and is choosing a bank to arrange it. Rates are twitchy this week.`,
      question: "Your pitch to win the mandate?",
      choices: [
        { text: "A size and structure they can comfortably repay, with honest timing advice.", points: 2, feedback: "A bond you can't service is a future crisis. Clients remember the bank that sized the debt to their real capacity - not the biggest deal." },
        { text: `Pitch the largest bond the market will bear.`, points: 1, feedback: "Over-borrowing pumps your fee and the client's risk in one move. Push too much debt and you're the one blamed when it bites." },
        { text: "Guarantee the market's lowest rate, no matter what.", points: 0, feedback: "No bank controls the market's rate. Promising one you can't deliver loses credibility the moment rates move." },
      ],
    },
  }
  return byType[dealType]
}

/** Four mandates to pitch each week, sized to the banker's seniority. */
export function generateMandates(week: number, rankIndex: number): Mandate[] {
  const wr = mulberry32(hashStr(`ib-mandates:${week}`))
  const clients = pickDistinct(wr, CLIENTS, 4)
  const types: DealType[] = ["sellside", "buyside", "ipo", "debt"]
  return clients.map((client, i) => {
    const r = mulberry32(hashStr(`ib-mandate:${week}:${client}`))
    const dealType = pick(r, types)
    // Bigger banker → bigger mandates on the desk.
    const base = int(r, 3, 12) * 1000
    const value = base * (1 + rankIndex * 0.6) | 0
    const pitch = pitchFor(r, dealType, client, value)
    pitch.choices = shuffleChoices(r, pitch.choices)
    return {
      id: `w${week}-${client}-${i}`,
      project: `Project ${pick(r, PROJECTS)}`,
      dealType,
      client,
      counterparty: dealType === "buyside" ? pick(r, CLIENTS.filter(c => c !== client)) : pick(r, COUNTERPARTIES),
      sector: pick(r, SECTORS),
      value,
      rivals: pickDistinct(r, RIVAL_BANKS, 2),
      pitch,
    }
  })
}

/* ── live engagements (deals in your pipeline) ──────────────────────── */

export interface StageChoice { text: string; points: 0 | 1 | 2; feedback: string; valueDelta?: number }
export interface StageScenario { headline: string; situation: string; question: string; choices: StageChoice[] }

export interface Engagement {
  id: string
  project: string
  dealType: DealType
  client: string
  counterparty: string
  sector: string
  value: number
  startValue: number
  /** 0-100. Hits 0 and the deal breaks. */
  health: number
  stageIdx: number
  status: "live" | "closed" | "dead"
  startedWeek: number
  lastWorkedWeek: number
  events: { week: number; text: string }[]
}

export function mandateToEngagement(m: Mandate, week: number, startHealth: number): Engagement {
  return {
    id: m.id, project: m.project, dealType: m.dealType, client: m.client, counterparty: m.counterparty,
    sector: m.sector, value: m.value, startValue: m.value, health: startHealth, stageIdx: 0, status: "live",
    startedWeek: week, lastWorkedWeek: week,
    events: [{ week, text: `Won the mandate to advise ${m.client} (${DEAL_TYPES[m.dealType].label}). Kickoff health ${startHealth}.` }],
  }
}
export function stageCount(): number { return 5 }

/* ── stage scenarios (the execution) ────────────────────────────────── */
// Five ordered stages per deal type. Each is a real decision that keeps the
// deal healthy (or not) and can move the transaction value - and since your fee
// is a % of value, protecting the client's price protects your fee too.

interface Ctx { c: string; cp: string; sector: string; value: number }

// The three options are kept to roughly EQUAL length so their wording gives
// nothing away - students must weigh the judgment, not count words.
const STAGES: Record<DealType, ((x: Ctx) => StageScenario)[]> = {
  sellside: [
    x => ({ headline: "Tell the story", situation: `You're drafting the CIM that markets ${x.c} to buyers. The company has a great product but one clearly weak year buried in its numbers.`, question: "How do you present it?", choices: [
      { text: "Explain the weak year honestly and frame the recovery.", points: 2, feedback: "Buyers do deep diligence. An honest narrative that owns the weak year and shows the bounce-back wins credibility - and better bids." },
      { text: "Leave the weak year out of the CIM entirely.", points: 0, feedback: "That's how deals detonate in diligence. Buyers always find the hole, and finding it themselves - after you hid it - torches your credibility and the price." },
      { text: "Tuck it into a footnote and move on.", points: 1, feedback: "Half-hiding a fact buyers will surface is worse than owning it. When it comes out, you've lost the leverage to frame it." },
    ] }),
    x => ({ headline: "Who do we call?", situation: `Time to approach buyers for ${x.c}. You could run a broad auction (many buyers) or a targeted process (a few likely fits).`, question: "What's the right buyer strategy?", choices: [
      { text: "A focused list of real strategic fits, plus a couple of wildcards.", points: 2, feedback: "Tension comes from the RIGHT buyers, not the most. A tight, well-chosen list creates real bidding without leaking the sale everywhere.", valueDelta: 0.04 },
      { text: "Email the teaser to every company in the industry.", points: 1, feedback: "A giant list leaks the sale, rattles staff and customers, and mostly draws tire-kickers. More names isn't more tension - the right names are." },
      { text: `Just take it to ${x.cp} alone.`, points: 0, feedback: "One buyer with no competition sets the price - badly, for your client. No tension means no premium.", valueDelta: -0.06 },
    ] }),
    x => ({ headline: "Prep the CEO", situation: `${x.c}'s CEO is about to meet buyers. They're brilliant but tend to over-promise wildly when the room gets excited.`, question: "How do you prep them?", choices: [
      { text: "Confident but precise - remind them promises become contract terms.", points: 2, feedback: "Management meetings make or break trust. A credible CEO who under-promises and over-delivers holds the price all the way to signing." },
      { text: "Let them go big - buyers are buying the dream.", points: 1, feedback: "Unchecked hype sets expectations diligence can't meet, and every miss chips the price. You can't quietly 'dial back' a promise a buyer wrote into their model." },
      { text: "Coach them to dodge the hard questions.", points: 0, feedback: "Evasive management reads as hiding something. Buyers discount what they can't verify - or just walk.", valueDelta: -0.05 },
    ] }),
    x => ({ headline: "The bids are in", situation: `Two buyers bid for ${x.c}. ${x.cp} offers more cash but is shaky on financing; a rival offers a bit less but is certain to close.`, question: "What do you advise the board?", choices: [
      { text: "Push the shaky bidder to prove financing while keeping the sure one warm.", points: 2, feedback: "A high bid that can't close is worth nothing. Playing both against each other lifts the price AND protects certainty - textbook.", valueDelta: 0.06 },
      { text: "Grab the certain, lower bid now and sign fast.", points: 1, feedback: "Certainty matters, but not even testing whether the higher bid is real leaves your client's money on the table. Make them compete first.", valueDelta: -0.03 },
      { text: "Take the highest number, no questions.", points: 0, feedback: "'Highest' isn't 'best' if the money isn't real. A deal that collapses on financing costs months and leaks a failed sale." },
    ] }),
    x => ({ headline: "Diligence surprise", situation: `Late in diligence, ${x.cp}'s team finds a key ${x.c} customer contract expires sooner than thought, and asks to cut the price.`, question: "How do you handle it?", choices: [
      { text: "Defend the value with a renewal plan and data; concede only what's fair.", points: 2, feedback: "Late retrades are a test of nerve. Preparation and data hold most of the price - folding just invites the next cut." },
      { text: "Accept the full price cut to save the deal.", points: 1, feedback: "Some give may be fair, but caving instantly signals weakness and teaches the buyer to keep chipping right up to signing.", valueDelta: -0.05 },
      { text: "Refuse to discuss it and threaten to walk.", points: 0, feedback: "A blanket refusal on a real finding can blow up a nearly-done deal. Negotiate the price; don't torch the close." },
    ] }),
  ],
  buyside: [
    x => ({ headline: "Screen the field", situation: `${x.c} wants to buy a company in ${x.sector}. Several targets look interesting, but your team's time is limited.`, question: "How do you screen?", choices: [
      { text: "Focus on targets that fit the strategy and are actually winnable.", points: 2, feedback: "Great buy-side work is disciplined focus. The best target you can't win is a waste of everyone's time - fit and feasibility beat glamour." },
      { text: "Go straight for the most famous name in the sector.", points: 1, feedback: "The trophy target is usually overpriced and not even for sale. Strategy fit matters far more than the logo on the building." },
      { text: "Chase all of them at once.", points: 0, feedback: "Spread that thin, you do all of them badly. Buy-side discipline means choosing where to spend your effort." },
    ] }),
    x => ({ headline: "What's it worth?", situation: `${x.c} is excited about a target and wants to move fast. Your valuation says it's worth clearly less than the seller's asking hopes.`, question: "What do you tell your client?", choices: [
      { text: "Show the disciplined valuation and a firm walk-away price.", points: 2, feedback: "Protecting a buyer from overpaying is the whole job. A clear walk-away number is your best defense against the 'winner's curse'." },
      { text: "Nudge your valuation up toward the seller's number.", points: 1, feedback: "Bending your valuation to fit a wish is exactly how buyers overpay. Your independence IS your value - the moment you flex it, you're useless to them." },
      { text: "Tell them to offer whatever it takes.", points: 0, feedback: "'Whatever it takes' is how acquisitions destroy value. Winning by overpaying is just losing with extra steps.", valueDelta: 0.05 },
    ] }),
    x => ({ headline: "Make the approach", situation: `You're ready to approach the target's owners about selling to ${x.c}. It's a sensitive first contact.`, question: "How do you open?", choices: [
      { text: "A discreet, respectful approach under an NDA.", points: 2, feedback: "First contact sets the tone. Discretion and respect keep a private seller at the table; a clumsy or public approach scares them off." },
      { text: "Open with a deliberately lowball anchor letter.", points: 1, feedback: "An insultingly low opening can end talks before they start - proud private owners just walk. Anchor with data, not with an offense." },
      { text: "Go public to force their hand.", points: 0, feedback: "Publicly pressuring a private seller backfires - they dig in or bolt. Sensitive approaches stay quiet." },
    ] }),
    x => ({ headline: "The counter", situation: `The target counters above ${x.c}'s walk-away price, insisting they "won't take a coin less."`, question: "Your move?", choices: [
      { text: "Hold near your number, offer creative terms (earn-out, phased pay), be ready to walk.", points: 2, feedback: "Discipline plus creativity bridges the gap without overpaying. 'Won't take less' is usually a tactic - your walk-away price is your power.", valueDelta: -0.03 },
      { text: "Just meet their number to get it done.", points: 1, feedback: "Blowing through your walk-away price to 'get it done' is the exact trap buy-side advice exists to prevent." },
      { text: "Walk instantly, no counter.", points: 1, feedback: "Right instinct, rushed - abandoning without a creative counter wastes a deal that structure could have saved." },
    ] }),
    x => ({ headline: "Fund it and close", situation: `${x.c} needs financing to complete the purchase. They could stretch with heavy debt or bring more of their own cash.`, question: "How should they fund it?", choices: [
      { text: "A prudent mix that leaves room to breathe if things wobble.", points: 2, feedback: "A deal that closes but buries the buyer in debt isn't a win. Sensible financing protects the value you just negotiated." },
      { text: `Max out the debt to keep ${x.c}'s cash in the bank.`, points: 1, feedback: "Over-leveraging the buyer turns one bad quarter into a crisis. Cheap debt stops being cheap the moment you can't service it." },
      { text: "Chase perfect terms for months.", points: 0, feedback: "Deals have momentum and expiry dates. Hunting flawless financing while the clock runs can lose the deal outright." },
    ] }),
  ],
  ipo: [
    x => ({ headline: "The prospectus", situation: `You're drafting ${x.c}'s IPO prospectus - the document investors and regulators scrutinize. The founders want to soften the risks section.`, question: "How do you draft it?", choices: [
      { text: "Disclose the risks fully and clearly.", points: 2, feedback: "The risk section isn't a weakness - it's the legal shield. Full disclosure protects the company AND builds the trust that supports the price." },
      { text: "Trim the scariest risks so the story reads cleaner.", points: 1, feedback: "Regulators and lawsuits punish soft-pedaled risks. A shinier story that isn't fully true is a liability, not an asset." },
      { text: "Leave the biggest risk out entirely.", points: 0, feedback: "Omitting a material risk from a prospectus is serious - it can sink the IPO and bring real legal trouble." },
    ] }),
    x => ({ headline: "Regulator questions", situation: `The regulator sends back tough questions on ${x.c}'s accounting before it will approve the IPO.`, question: "How do you respond?", choices: [
      { text: "Answer thoroughly and fix whatever needs fixing.", points: 2, feedback: "Clearing regulatory review cleanly is what lets the deal happen at all. Transparency now prevents disaster later." },
      { text: "Give the narrowest answers to keep things moving.", points: 1, feedback: "Dodging a regulator's questions just brings MORE questions and more delay. Thorough beats fast here every time." },
      { text: "Push back that the questions are unnecessary.", points: 0, feedback: "Stonewalling the regulator stalls or kills the IPO. You clear review by cooperating, not fighting." },
    ] }),
    x => ({ headline: "Set the range", situation: `Investors signal they'd buy ${x.c} around a fair value. The founders demand a price 40% higher - "our company is special."`, question: "What price range do you set?", choices: [
      { text: "Anchor to real demand, with a small first-day pop built in.", points: 2, feedback: "Price a touch below where demand sits and the stock pops healthily, rewarding investors you'll need again. Founder ego is not a valuation.", valueDelta: 0.03 },
      { text: "Go with the founders' 40%-higher price.", points: 0, feedback: "Overpriced IPOs crater on day one and scar the company's name with investors for years. Founders are always optimistic - that's why they hired you.", valueDelta: 0.04 },
      { text: "Price it low so it definitely soars.", points: 1, feedback: "A giant pop feels great but hands millions the company needed to whoever flipped the shares. Underpricing has a real cost.", valueDelta: -0.05 },
    ] }),
    x => ({ headline: "The roadshow", situation: `On the roadshow, a big institution loves ${x.c} and wants a larger allocation than planned in exchange for a long-term hold.`, question: "How do you handle allocation?", choices: [
      { text: "Favor quality long-term holders, balanced across the book.", points: 2, feedback: "Who you sell to matters as much as the price. A base of long-term holders steadies the stock after listing - flippers wreck it." },
      { text: "Give the biggest chunks to the largest orders today.", points: 1, feedback: "Chasing the hottest short-term money leaves the stock unsupported the moment they flip. Build a stable shareholder base instead." },
      { text: "Allocate randomly to be 'fair'.", points: 0, feedback: "Ignoring investor quality wastes the whole point of the roadshow: assembling holders who'll support the company." },
    ] }),
    x => ({ headline: "Price it the night before", situation: `The night before listing, the market turns jittery. Demand for ${x.c} is still solid but softer than yesterday.`, question: "Final pricing call?", choices: [
      { text: "Price sensibly in the range for a solid, sustainable debut.", points: 2, feedback: "A clean, well-supported first day beats a greedy price that breaks. Getting the deal DONE well is the win." },
      { text: "Push for the very top of the range regardless.", points: 1, feedback: "Reaching for the top into softening demand risks a broken IPO that trades below its issue price - a lasting black eye.", valueDelta: -0.04 },
      { text: "Postpone the whole IPO over one jittery day.", points: 0, feedback: "One nervous session rarely justifies pulling a well-prepared deal. Overreact and you can lose the window entirely." },
    ] }),
  ],
  debt: [
    x => ({ headline: "Size the bond", situation: `${x.c} wants to issue a bond. They'd love a huge amount; their cash flow comfortably supports only a moderate one.`, question: "How big should the bond be?", choices: [
      { text: "Size it to what they can repay in good years and bad.", points: 2, feedback: "A bond is a promise to pay. Sizing it to real capacity protects the client - and your reputation when the economy turns." },
      { text: "Raise the maximum the market will lend right now.", points: 1, feedback: "A bigger bond means a bigger fee AND a bigger chance of default. Loading a client with debt they can't service is how bankers get blamed later." },
      { text: "Let the client pick any number.", points: 0, feedback: "Abdicating the sizing judgment is a failure of advice. They hired you precisely to right-size the debt." },
    ] }),
    x => ({ headline: "Meet the rating agency", situation: `Rating agencies will grade ${x.c}'s bond - a better rating means a lower interest cost. Their finances have one clear soft spot.`, question: "How do you approach the rating?", choices: [
      { text: "Present it all honestly, with a credible plan for the soft spot.", points: 2, feedback: "Agencies dig deep. Honesty plus a real plan earns the best rating you can legitimately get - and a lower rate for the client." },
      { text: "Argue hard that they deserve top marks regardless.", points: 1, feedback: "Bluster doesn't move rating analysts - a well-supported case does. Demanding unearned marks just annoys the people setting your client's rate." },
      { text: "Hide the soft spot and hope they miss it.", points: 0, feedback: "Agencies find weaknesses - and a discovered omission tanks both the rating and your credibility." },
    ] }),
    x => ({ headline: "Market to investors", situation: `You're marketing ${x.c}'s bond to investors. Rates ticked up this week, cooling demand a little.`, question: "Your marketing approach?", choices: [
      { text: "Be straight about the risks and target investors who fit this credit.", points: 2, feedback: "Bond investors reward straight talk with repeat business. Matching the deal to the right buyers gets it filled at a fair rate." },
      { text: "Lead hard on safety and downplay the risks.", points: 1, feedback: "Overstating safety wins today's order and next year's furious investor. Credibility in credit markets is the whole game." },
      { text: "Wait weeks for the 'perfect' rate window.", points: 0, feedback: "Timing the exact bottom in rates rarely works and can miss the window. A fair deal done beats a perfect deal missed." },
    ] }),
    x => ({ headline: "Price the coupon", situation: `Demand for ${x.c}'s bond is decent. Price the rate too low and the book empties; too high and the client overpays for years.`, question: "Where do you price?", choices: [
      { text: "At the fair clearing level - filled comfortably, at a rate they can live with.", points: 2, feedback: "Good pricing balances a filled book against the client's cost. Greedy on either side and someone regrets it - find the clearing level." },
      { text: "Set the rate as low as you possibly can.", points: 1, feedback: "Squeeze too hard and investors simply walk, leaving the bond half-sold. A failed, unfilled deal is far worse than a fair rate." },
      { text: "Price it high to guarantee it sells out fast.", points: 1, feedback: "Overpaying on the coupon burdens the client for the bond's whole life just to sell out in an hour. Aim for fair, not fast.", valueDelta: -0.02 },
    ] }),
    x => ({ headline: "Close it out", situation: `${x.c}'s bond is nearly done. A last-minute investor demands a special side term to join the deal.`, question: "How do you close?", choices: [
      { text: "Decline any term that shortchanges the other investors; close clean.", points: 2, feedback: "Fairness across the book protects the client's future access to markets. One greedy side deal can poison every future issue." },
      { text: "Quietly grant the side term to fill the book.", points: 1, feedback: "Secret side terms leak - they always do - and sour every other investor. A clean book is worth far more than one extra order." },
      { text: "Reopen pricing for everyone to satisfy the one holdout.", points: 0, feedback: "Blowing up agreed pricing for one latecomer can collapse the whole deal. Close what you've built." },
    ] }),
  ],
}

/** This week's stage decision for an engagement. Deterministic, order shuffled. */
export function stageScenario(e: Engagement): StageScenario {
  const ctx: Ctx = { c: e.client, cp: e.counterparty, sector: e.sector, value: e.value }
  const idx = Math.min(e.stageIdx, STAGES[e.dealType].length - 1)
  const s = STAGES[e.dealType][idx](ctx)
  const r = mulberry32(hashStr(`ib-stage:${e.id}:${e.stageIdx}`))
  return { ...s, choices: shuffleChoices(r, s.choices) }
}

export interface StageResult {
  patch: Partial<Engagement>
  repDelta: number
  outcome: string
  /** Set when the deal reaches a terminal state this turn. */
  closedFee?: number
  broke?: boolean
}

/** Apply the student's stage decision: move health & value, advance or end. */
export function applyStage(e: Engagement, week: number, scenario: StageScenario, choice: StageChoice, idx: number): StageResult {
  const healthDelta = choice.points === 2 ? 6 : choice.points === 1 ? -8 : -22
  const health = Math.max(0, Math.min(100, e.health + healthDelta))
  const value = Math.max(0, Math.round(e.value * (1 + (choice.valueDelta ?? 0))))
  const broke = health <= 0
  const nextStage = e.stageIdx + 1
  const closed = !broke && nextStage >= stageCount()

  const grade = choice.points === 2 ? "Strong" : choice.points === 1 ? "Shaky" : "Costly"
  const repDelta = broke ? -4 : choice.points === 2 ? 3 : choice.points === 1 ? 0 : -2

  let status: Engagement["status"] = "live"
  let event = ""
  let closedFee: number | undefined
  if (broke) {
    status = "dead"
    event = `💥 The deal broke down at "${DEAL_TYPES[e.dealType].stageTitles[e.stageIdx]}". No fee. A hard lesson in execution risk.`
  } else if (closed) {
    status = "closed"
    closedFee = successFee(value, health)
    event = `✅ Deal closed! ${e.client} · ${value.toLocaleString()} coins. Success fee: ${closedFee.toLocaleString()} (${grade} execution, health ${health}).`
  } else {
    const vNote = value !== e.value ? ` Value now ${value.toLocaleString()}.` : ""
    event = `${grade} at "${DEAL_TYPES[e.dealType].stageTitles[e.stageIdx]}" (health ${health}).${vNote}`
  }

  const patch: Partial<Engagement> = {
    health, value, status,
    stageIdx: broke ? e.stageIdx : nextStage,
    lastWorkedWeek: week,
    events: [...e.events, { week, text: event }].slice(-10),
  }
  const outcome = broke
    ? `${choice.feedback} ${e.client}'s deal collapsed - no fee this time. Every rookie call chips a deal's health; two in a row can kill it.`
    : closed
      ? `${choice.feedback} You got ${e.client} over the line and earned a ${closedFee!.toLocaleString()}-coin success fee.`
      : `${choice.feedback} On to "${DEAL_TYPES[e.dealType].stageTitles[nextStage]}" next week.`
  return { patch, repDelta, outcome, closedFee, broke }
}

/* ── league table (flavor / motivation) ─────────────────────────────── */
// A simple standings board vs rival banks, driven by your fees this season.
export interface LeagueRow { bank: string; fees: number; you: boolean }
export function leagueTable(week: number, yourFees: number): LeagueRow[] {
  const r = mulberry32(hashStr(`ib-league:${Math.floor(week / 4)}`))
  const rivals = ["Sterling & Co.", "Kingsbridge", "Halcyon Capital", "Ravenswood", "Blackpine"]
  const rows: LeagueRow[] = rivals.map(bank => ({ bank, fees: int(r, 400, 1600) + Math.floor(week * (30 + r() * 90)), you: false }))
  rows.push({ bank: "You", fees: Math.round(yourFees), you: true })
  return rows.sort((a, b) => b.fees - a.fees)
}
