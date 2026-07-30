// Career simulation content for the Virtual Bank's Careers desk.
//
// Each career is a job the student "works": they pick up deals (or clients,
// or startups), play through multi-stage decisions, and get graded on the
// quality of each call. Better decisions → bigger bonus and faster promotion.
// All payouts are InvestiCoins, paid through AppContext.
//
// Choice `points`: 2 = what a pro would do, 1 = defensible, 0 = rookie
// mistake. Feedback always explains the *why* so wrong answers still teach.

import { Briefcase, Building2, Rocket, LineChart } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface CareerChoice {
  text: string
  points: 0 | 1 | 2
  feedback: string
}

export interface CareerStage {
  /** Scene-setting text - what's happening at the desk right now. */
  situation: string
  question: string
  choices: CareerChoice[]
}

export interface CareerDeal {
  id: string
  title: string
  client: string
  tagline: string
  difficulty: "Junior" | "Mid" | "Senior"
  /** Coins paid for a perfect run; scales down with performance. */
  baseFee: number
  stages: CareerStage[]
}

export interface Career {
  id: string
  name: string
  icon: LucideIcon
  /** Tailwind gradient for the career's theming. */
  gradient: string
  /** Accent color (hex) for highlights/glows on this career's desk. */
  accent: string
  description: string
  /** What a unit of work is called in this job. */
  dealNoun: string
  /**
   * Promotion ladder, junior → senior. Thresholds are XP (total points).
   * Ranks at index 1, 3 and 5 also require closing the career's milestone
   * deal 0, 1, 2 respectively - a "promotion case" - before you can hold
   * the title. Weekly generated deals (lib/careerSim) provide the XP grind
   * between milestones, so a career runs for months like the Micro-Business.
   */
  ranks: { title: string; minXp: number }[]
  /** Authored milestone deals - the promotion cases. */
  deals: CareerDeal[]
}

/** Rank indexes that require a milestone deal, mapped to deals[] index. */
export const MILESTONE_RANKS: Record<number, number> = { 1: 0, 3: 1, 5: 2 }

// ── Investment Banker ────────────────────────────────────────────────────
const investmentBanker: Career = {
  id: "investment-banker",
  name: "Investment Banker",
  icon: Briefcase,
  gradient: "from-blue-600 to-indigo-700",
  accent: "#60a5fa",
  description:
    "Advise companies on huge deals - mergers, acquisitions, and going public. You don't buy companies; you're the expert guide who gets paid a fee when the deal closes.",
  dealNoun: "Deal",
  ranks: [
    { title: "Analyst", minXp: 0 },
    { title: "Associate", minXp: 12 },
    { title: "Vice President", minXp: 30 },
    { title: "Executive Director", minXp: 55 },
    { title: "Managing Director", minXp: 90 },
    { title: "Head of Banking", minXp: 140 },
  ],
  deals: [
    {
      id: "ib-fizzy",
      title: "Project Bubbles",
      client: "SodaPop Inc.",
      tagline: "SodaPop wants to buy its rival FizzyCo. Help them figure out what to pay.",
      difficulty: "Junior",
      baseFee: 400,
      stages: [
        {
          situation:
            "SodaPop's CEO calls your desk: \"FizzyCo is for sale and we want it. But we have no idea what it's worth.\" FizzyCo earns 10M coins in profit every year, and similar soda companies have sold for about 5× their yearly profit.",
          question: "What's a fair starting valuation for FizzyCo?",
          choices: [
            {
              text: "About 50M coins - 5× its yearly profit, like similar companies",
              points: 2,
              feedback:
                "Exactly how bankers do it! Using 'comparable companies' (what similar businesses sold for) is the classic first step in valuation.",
            },
            {
              text: "10M coins - one year of profit seems fair",
              points: 0,
              feedback:
                "Way too low - the seller would laugh you out of the room. A company keeps earning profit year after year, so buyers pay a multiple of one year's earnings.",
            },
            {
              text: "100M coins - offer big so they say yes fast",
              points: 0,
              feedback:
                "Overpaying is the #1 way acquisitions go wrong. Your job is to get your client a fair price, not just a fast yes.",
            },
          ],
        },
        {
          situation:
            "During due diligence (the deep homework phase before a deal), your team discovers FizzyCo's biggest customer - 30% of all its sales - just switched to a competitor.",
          question: "What do you tell SodaPop's CEO?",
          choices: [
            {
              text: "Lower the offer - FizzyCo's future profits just got smaller",
              points: 2,
              feedback:
                "Right call. Valuation is based on *future* profits, and losing 30% of sales shrinks them. This is exactly why due diligence exists.",
            },
            {
              text: "Say nothing - it might scare the CEO off the deal",
              points: 0,
              feedback:
                "Never hide bad news from your client! Bankers who do that lose their reputation - and reputation is a banker's whole business.",
            },
            {
              text: "Cancel the whole deal immediately",
              points: 1,
              feedback:
                "Cautious, but too hasty - the deal can still make sense at a *lower price*. Bad news changes the price, not always the decision.",
            },
          ],
        },
        {
          situation:
            "FizzyCo's owners push back: \"We won't sell below 45M.\" Your revised analysis says FizzyCo is now worth about 38M after losing that big customer.",
          question: "How do you negotiate?",
          choices: [
            {
              text: "Offer 38M with your analysis attached, but leave room to meet in the middle",
              points: 2,
              feedback:
                "Pro move. Anchoring to your data while staying flexible is how real negotiations work. The deal closed at 41M - fair for both sides.",
            },
            {
              text: "Agree to 45M - they seem really firm",
              points: 0,
              feedback:
                "You just made your client overpay by millions! 'Seeming firm' is a negotiation tactic - data beats bluster.",
            },
            {
              text: "Walk away without a counteroffer",
              points: 1,
              feedback:
                "Walking away is a real tactic, but doing it *without* a counteroffer wastes months of work. Always give the other side a path to yes.",
            },
          ],
        },
      ],
    },
    {
      id: "ib-ipo",
      title: "Project Liftoff",
      client: "GameVerse Studios",
      tagline: "A hot video game company wants to go public. Run their IPO.",
      difficulty: "Mid",
      baseFee: 700,
      stages: [
        {
          situation:
            "GameVerse wants to sell shares to the public for the first time - an IPO (Initial Public Offering). The founders ask you: \"Why do we even need a bank for this?\"",
          question: "What's your answer?",
          choices: [
            {
              text: "We set the share price, find big investors, and vouch for your numbers",
              points: 2,
              feedback:
                "That's the job! Banks 'underwrite' IPOs - pricing the shares, lining up buyers, and putting their reputation behind the company's story.",
            },
            {
              text: "You don't - just post the shares online",
              points: 0,
              feedback:
                "Without a bank checking the numbers and finding serious investors, most IPOs would flop on day one. Trust is the product.",
            },
            {
              text: "We lend you the money instead",
              points: 0,
              feedback:
                "That's a loan, not an IPO! An IPO raises money by selling *ownership* (shares), not by borrowing.",
            },
          ],
        },
        {
          situation:
            "Time to price the IPO. Big investors are excited and say they'd buy at 20 coins per share. Your analysis says the company's fundamentals support 18. The founders want 25 - 'our game is the best!'",
          question: "What price do you recommend?",
          choices: [
            {
              text: "19 - near your analysis, with a small first-day 'pop' for investors",
              points: 2,
              feedback:
                "Nailed it. Pricing slightly below demand rewards early investors with a small gain, which builds excitement without leaving too much money behind.",
            },
            {
              text: "25 - the founders know their company best",
              points: 0,
              feedback:
                "Overpriced IPOs crash on day one, and a crashing stock scares off future investors. Founders are always optimistic - that's why they hire you.",
            },
            {
              text: "14 - price it super low so it definitely goes up",
              points: 1,
              feedback:
                "It'll pop, but the company just gave away millions for free - money it needed to build new games. Underpricing has a real cost.",
            },
          ],
        },
        {
          situation:
            "One week before the IPO, the whole stock market drops 8% on scary economic news. Investor excitement is cooling fast.",
          question: "What do you advise?",
          choices: [
            {
              text: "Delay the IPO a few weeks until the market calms down",
              points: 2,
              feedback:
                "Smart. Timing matters enormously for IPOs - the same company raises far more in a calm market. Real banks delay IPOs all the time.",
            },
            {
              text: "Launch anyway - we already picked a date",
              points: 0,
              feedback:
                "Launching into a scared market means a low price and a possible flop. A date on a calendar is not a reason to lose millions.",
            },
            {
              text: "Cancel the IPO permanently",
              points: 1,
              feedback:
                "Too drastic - market dips usually pass. Cancelling forever means the company never raises the money it needs to grow.",
            },
          ],
        },
      ],
    },
    {
      id: "ib-mega",
      title: "Project Titan",
      client: "Streamly",
      tagline: "Two streaming giants want to merge. Navigate the biggest deal of your career.",
      difficulty: "Senior",
      baseFee: 1200,
      stages: [
        {
          situation:
            "Streamly (your client) and ViewMax want to merge into one mega-streamer. Streamly's CEO asks: \"Should we pay in cash or in our own shares?\" Streamly's stock has been on a hot streak and looks expensive; the company's cash pile is small.",
          question: "Cash or stock?",
          choices: [
            {
              text: "Pay mostly in stock - your shares are highly valued, and cash is tight",
              points: 2,
              feedback:
                "Sharp thinking. When your own stock is expensive, it's cheap 'currency' for buying things - and you avoid draining cash or borrowing heavily.",
            },
            {
              text: "Pay all cash - borrow whatever we're missing",
              points: 1,
              feedback:
                "Sellers do love cash, but loading up on debt for a mega-deal is risky if the merger hits bumps. With stock this pricey, stock is the better currency.",
            },
            {
              text: "It doesn't matter, money is money",
              points: 0,
              feedback:
                "It matters a lot! Cash vs. stock changes who takes the risk, how much debt you carry, and even the taxes on the deal.",
            },
          ],
        },
        {
          situation:
            "The government's competition regulators are worried: together, Streamly + ViewMax would control 70% of all streaming. They may block the merger.",
          question: "How do you handle the regulators?",
          choices: [
            {
              text: "Offer remedies - sell off overlapping parts of the business to keep competition alive",
              points: 2,
              feedback:
                "This is exactly how mega-mergers get approved. Offering 'divestitures' shows regulators the market stays fair - deal approved.",
            },
            {
              text: "Ignore them - regulators always back down",
              points: 0,
              feedback:
                "They really don't. Blocked mergers cost years and billions - ask any banker who's watched a deal die in court.",
            },
            {
              text: "Abandon the merger to avoid the hassle",
              points: 1,
              feedback:
                "Regulatory risk is real, but abandoning at the first frown wastes a deal that had a clear path through - remedies existed.",
            },
          ],
        },
        {
          situation:
            "Deal's nearly closed when a rival bidder, TechTitan, swoops in with a higher offer for ViewMax. Streamly's CEO panics: \"Do we outbid them?!\" Your models say ViewMax is worth 60B to Streamly; the bidding war is pushing the price toward 70B.",
          question: "Your advice in the war room?",
          choices: [
            {
              text: "Hold at your walk-away price - winning by overpaying is losing",
              points: 2,
              feedback:
                "The discipline of a Managing Director. The 'winner's curse' - overpaying just to win - has destroyed more value than any market crash. TechTitan overpaid; Streamly's stock rose.",
            },
            {
              text: "Outbid at any cost - we can't lose to TechTitan",
              points: 0,
              feedback:
                "Ego is not a strategy. Paying 70B for something worth 60B to you means you lost 10B the moment you 'won'.",
            },
            {
              text: "Immediately drop out without checking the numbers",
              points: 1,
              feedback:
                "Right instinct, rushed execution - you should confirm against your walk-away price first. Sometimes the math says one more bid is fine.",
            },
          ],
        },
      ],
    },
  ],
}

// ── Private Equity ───────────────────────────────────────────────────────
const privateEquity: Career = {
  id: "private-equity",
  name: "Private Equity",
  icon: Building2,
  gradient: "from-emerald-600 to-teal-700",
  accent: "#34d399",
  description:
    "Buy whole companies, make them better over a few years, then sell them for more than you paid. You're the owner-operator with a plan.",
  dealNoun: "Buyout",
  ranks: [
    { title: "Analyst", minXp: 0 },
    { title: "Associate", minXp: 12 },
    { title: "Senior Associate", minXp: 30 },
    { title: "Principal", minXp: 55 },
    { title: "Partner", minXp: 90 },
    { title: "Managing Partner", minXp: 140 },
  ],
  deals: [
    {
      id: "pe-pizza",
      title: "Slice of Opportunity",
      client: "Tony's Pizza Chain",
      tagline: "A 12-store pizza chain with great food but messy finances. Buy it, fix it, sell it.",
      difficulty: "Junior",
      baseFee: 400,
      stages: [
        {
          situation:
            "Tony's Pizza has amazing reviews but barely makes money. Your team digs in: each store buys its own ingredients separately, and 3 of the 12 stores lose money every month. The asking price is reasonable.",
          question: "Do you buy it - and why?",
          choices: [
            {
              text: "Yes - the problems are fixable and that's exactly where PE makes money",
              points: 2,
              feedback:
                "That's the PE mindset! Great product + fixable operational problems = an undervalued company. You buy problems you know how to solve.",
            },
            {
              text: "No - never buy a company with money-losing stores",
              points: 0,
              feedback:
                "You just passed on a classic PE winner. Fixable flaws are why the price is low - a perfect company would cost a perfect price.",
            },
            {
              text: "Yes, but only if they fix everything first",
              points: 1,
              feedback:
                "If they fix everything first, the price doubles and the opportunity is gone. *You* are the fixer - that's the job.",
            },
          ],
        },
        {
          situation:
            "You own Tony's now. Time to create value. Your team lists three possible first moves.",
          question: "What do you do first?",
          choices: [
            {
              text: "Combine ingredient buying across all 12 stores to get bulk discounts",
              points: 2,
              feedback:
                "Instant win. Bulk purchasing cut ingredient costs 18% overnight - 'operational improvements' like this are the heart of private equity.",
            },
            {
              text: "Close all 3 losing stores today",
              points: 1,
              feedback:
                "Sometimes right, but you moved too fast - one of those stores was losing money only because of a fixable rent problem. Diagnose before you amputate.",
            },
            {
              text: "Double every menu price to boost revenue",
              points: 0,
              feedback:
                "Customers fled to the pizza place across the street. Price hikes without added value destroy the thing you paid for - the loyal customer base.",
            },
          ],
        },
        {
          situation:
            "Three years later, Tony's is profitable and growing. You bought it for 8M; a bigger restaurant group offers 20M. Your analysts think waiting two more years could fetch 26M - but restaurant trends are fickle.",
          question: "Sell now or hold?",
          choices: [
            {
              text: "Sell now - 2.5× your money is a great return, and trend risk is real",
              points: 2,
              feedback:
                "Textbook exit. PE funds aim to return money to investors in 3-5 years, and a bird in hand beats two in a fickle-trend bush. 2.5× is a home run.",
            },
            {
              text: "Hold for the 26M - always maximize",
              points: 1,
              feedback:
                "Greedy but defensible... until a viral 'pizza is over' trend cooled the market. 'Maximize' often means 'took too much risk at the end'.",
            },
            {
              text: "Never sell - keep collecting profits forever",
              points: 0,
              feedback:
                "PE funds *must* sell - that's how investors get their money back. Buy, improve, sell is the entire business model.",
            },
          ],
        },
      ],
    },
    {
      id: "pe-toys",
      title: "Turnaround Toys",
      client: "ToyBox Warehouse",
      tagline: "A struggling toy retailer. High risk, high reward - can you turn it around?",
      difficulty: "Mid",
      baseFee: 700,
      stages: [
        {
          situation:
            "ToyBox Warehouse is losing customers to online shopping. It's cheap - you can buy it using 3M of your fund's money plus a 7M bank loan (a 'leveraged buyout'). The loan means big returns if the turnaround works... and big trouble if it doesn't.",
          question: "How much debt is right for this deal?",
          choices: [
            {
              text: "Use less debt than allowed - a shaky business needs breathing room",
              points: 2,
              feedback:
                "Wise. Leverage multiplies *both* outcomes. For a risky turnaround, less debt means missing one holiday season doesn't kill the company.",
            },
            {
              text: "Max the debt - more leverage, more return",
              points: 0,
              feedback:
                "This is how PE firms blow up. One bad quarter and ToyBox couldn't pay the loan - the bank would own your toy company.",
            },
            {
              text: "Use no debt at all, ever",
              points: 1,
              feedback:
                "Safe, but you're leaving the main PE tool on the table. *Sensible* leverage boosts returns - the skill is sizing it to the risk.",
            },
          ],
        },
        {
          situation:
            "You own ToyBox. Kids love the stores' toy-testing tables - something online shopping can't offer - but the stores are dingy and the website is from 2009.",
          question: "Where does your improvement budget go?",
          choices: [
            {
              text: "Lean into what online can't do: upgrade stores into toy 'play labs', plus a simple modern website",
              points: 2,
              feedback:
                "You found the moat! Competing with online giants at their own game is hopeless - winning at *experience* is a strategy. Foot traffic up 40%.",
            },
            {
              text: "Spend everything building a giant website to beat the online stores",
              points: 1,
              feedback:
                "You'll never out-website the web giants - they have a 20-year head start. Your edge was the physical experience, and you starved it.",
            },
            {
              text: "Cut all costs to the bone and change nothing",
              points: 0,
              feedback:
                "Cost cuts alone can't fix falling sales. You can't shrink your way to greatness - customers kept leaving, just from uglier stores.",
            },
          ],
        },
        {
          situation:
            "The turnaround is working - profits doubled. Now a decision: your fund can sell ToyBox to another PE firm for a solid 2× return, or take it public in an IPO which might fetch 3× but takes another 18 months and depends on the stock market cooperating.",
          question: "Which exit?",
          choices: [
            {
              text: "Weigh both, but take the certain 2× sale - turnarounds carry lingering risk",
              points: 2,
              feedback:
                "Partners agree. A guaranteed 2× on a risky turnaround is excellent, and IPO windows have a habit of slamming shut. Deal closed, investors thrilled.",
            },
            {
              text: "Go for the IPO - 3× beats 2×",
              points: 1,
              feedback:
                "The math tempts, but 18 months later the market window closed and the IPO priced below the old 2× offer. 'Might fetch' is not 'will fetch'.",
            },
            {
              text: "Refuse both and keep waiting for a better offer",
              points: 0,
              feedback:
                "Offers have expiration dates. While you waited, a new competitor emerged and both bidders walked. Exits reward the decisive.",
            },
          ],
        },
      ],
    },
    {
      id: "pe-mega",
      title: "The Platform Play",
      client: "CleanSweep Services",
      tagline: "Roll up a fragmented industry: buy one cleaning company, then bolt on its rivals.",
      difficulty: "Senior",
      baseFee: 1200,
      stages: [
        {
          situation:
            "The office-cleaning industry has 10,000 tiny companies and no big winner. Your fund's thesis: buy one great mid-size company (the 'platform'), then acquire small rivals ('bolt-ons') and combine them. Small cleaning companies sell for 4× profit; big ones sell for 9× profit.",
          question: "Why is this strategy powerful?",
          choices: [
            {
              text: "Every small company you buy at 4× becomes worth 9× inside a big one - instant value from scale",
              points: 2,
              feedback:
                "'Multiple arbitrage' - you understood the whole game. Size itself makes profits more valuable, because big buyers pay up for scale and stability.",
            },
            {
              text: "Buying lots of companies is fun and looks impressive",
              points: 0,
              feedback:
                "Empire-building without a value thesis is how funds die. Every acquisition needs a reason the pieces are worth more together.",
            },
            {
              text: "It eliminates every competitor so you can raise prices freely",
              points: 1,
              feedback:
                "With 10,000 rivals you'll never eliminate competition - and trying invites regulators. The real prize is the valuation math, not monopoly dreams.",
            },
          ],
        },
        {
          situation:
            "Platform acquired. Your first bolt-on target, SparkleCo, is perfect on paper - but its beloved founder plans to leave immediately after the sale, and most customers signed with SparkleCo *because of him*.",
          question: "How do you handle the founder problem?",
          choices: [
            {
              text: "Make part of the price an 'earn-out' - he gets it only if he stays 2 years and customers stay too",
              points: 2,
              feedback:
                "Exactly how pros structure it. Earn-outs align the founder's wallet with a smooth handover. He stayed, customers stayed, deal worked.",
            },
            {
              text: "Buy anyway - customers signed contracts, they can't leave",
              points: 0,
              feedback:
                "Contracts expire. A year later, half of SparkleCo's customers followed the founder's new company. You bought a shell.",
            },
            {
              text: "Skip any company where the founder matters",
              points: 1,
              feedback:
                "In small businesses the founder *always* matters - that rule would kill every bolt-on. The skill is structuring around it, not avoiding it.",
            },
          ],
        },
        {
          situation:
            "Five years in: 14 bolt-ons combined into a regional giant. Combined profits: 30M/year. You've been offered 9× profit (270M) by a mega-fund. Your investors put in 80M total. But integration of the last 4 companies is still messy - different software, grumpy managers.",
          question: "Sell now or finish the integration first?",
          choices: [
            {
              text: "Finish the integration - buyers discount messy operations, and 6 clean months could add 40M to the price",
              points: 2,
              feedback:
                "Partner-level judgment. Sloppy integration is a visible flaw buyers price down hard. Six months of cleanup later, the business sold for 310M.",
            },
            {
              text: "Sell immediately - 270M is more than 3× the investors' money",
              points: 1,
              feedback:
                "A fine outcome, but you left real money behind - the buyer knew the mess was fixable and priced it like you'd never fix it.",
            },
            {
              text: "Keep buying more companies instead - 30 bolt-ons beats 14",
              points: 0,
              feedback:
                "Adding acquisitions onto a shaky foundation is how roll-ups collapse. Integrate before you accumulate.",
            },
          ],
        },
      ],
    },
  ],
}

// ── Venture Capitalist ───────────────────────────────────────────────────
const ventureCapitalist: Career = {
  id: "venture-capitalist",
  name: "Venture Capitalist",
  icon: Rocket,
  gradient: "from-purple-600 to-fuchsia-700",
  accent: "#c084fc",
  description:
    "Invest early in tiny startups that could become giants. Most will fail - but one huge winner pays for all the losers. Spot the future before anyone else.",
  dealNoun: "Investment",
  ranks: [
    { title: "Scout", minXp: 0 },
    { title: "Analyst", minXp: 12 },
    { title: "Associate", minXp: 30 },
    { title: "Principal", minXp: 55 },
    { title: "Partner", minXp: 90 },
    { title: "General Partner", minXp: 140 },
  ],
  deals: [
    {
      id: "vc-pitch-day",
      title: "Demo Day",
      client: "Startup Accelerator",
      tagline: "Three startups pitch you in one afternoon. Pick the one worth backing.",
      difficulty: "Junior",
      baseFee: 400,
      stages: [
        {
          situation:
            "Pitch #1 - 'PetPals': an app for scheduling dog walks. The founders are two best friends who quit their jobs, live on ramen, and have 500 users growing 40% every month. The app looks ugly but users love it.",
          question: "What matters most in this pitch?",
          choices: [
            {
              text: "40% monthly growth with users who love it - that's the signal",
              points: 2,
              feedback:
                "You have the eye! Early-stage VC is about growth and love, not polish. Ugly-but-loved beats beautiful-but-ignored every time.",
            },
            {
              text: "The app is ugly - pass",
              points: 0,
              feedback:
                "Design is fixable with money; user love isn't buyable at any price. Some of the biggest startups ever looked terrible at this stage.",
            },
            {
              text: "They quit their jobs - too risky to be trusted",
              points: 0,
              feedback:
                "Backwards! Founders going all-in is a *good* sign - VCs worry about founders who keep a safety net and quit when it gets hard.",
            },
          ],
        },
        {
          situation:
            "Pitch #2 - 'CrystalAI': a founder in an expensive suit claims their AI will 'disrupt everything' and shows a slide predicting 1B users in year two. When you ask how the AI works, he says 'that's confidential.' No product demo, no users yet.",
          question: "Your read?",
          choices: [
            {
              text: "Pass - big claims, no product, no users, and dodges technical questions",
              points: 2,
              feedback:
                "Red flags everywhere and you caught them all. Real founders love explaining their tech. 'Trust me' plus hockey-stick slides is the classic hype pattern.",
            },
            {
              text: "Invest big - AI is the future and he sounds confident",
              points: 0,
              feedback:
                "You invested in a suit and a slide. 'The future' is a sector, not a company - this one had nothing behind the curtain and folded in 8 months.",
            },
            {
              text: "Invest a little, just in case it's real",
              points: 1,
              feedback:
                "FOMO investing. Small checks into bad companies still add up to real losses - and your time is worth more than the check.",
            },
          ],
        },
        {
          situation:
            "You back PetPals with 100K coins for 10% of the company. Twelve months later they've grown to 50,000 users and a bigger VC offers to lead their next round at a valuation 8× higher. You can invest more ('follow on') to keep your 10%, or let your slice shrink to 7%.",
          question: "Follow on?",
          choices: [
            {
              text: "Yes - double down on winners; the data says this one's working",
              points: 2,
              feedback:
                "The golden rule of VC: your winners are rare, so when one shows up, feed it. Following on in proven companies is the best bet in venture.",
            },
            {
              text: "No - it's 8× more expensive now, way too pricey",
              points: 1,
              feedback:
                "It *feels* expensive, but price-per-risk actually improved - the company is 20× less likely to die than when you first invested. Winners keep looking 'expensive' all the way up.",
            },
            {
              text: "Sell your whole stake now and lock in the 8×",
              points: 0,
              feedback:
                "You sold the fund's only rocket ship at the launchpad. VC returns come from the one company that goes 100× - 8× is the beginning, not the end.",
            },
          ],
        },
      ],
    },
    {
      id: "vc-portfolio",
      title: "The Power Law",
      client: "Your Fund's Investors",
      tagline: "Build a portfolio and survive the brutal math of startup investing.",
      difficulty: "Mid",
      baseFee: 700,
      stages: [
        {
          situation:
            "You have 1M coins to deploy this year. History says: out of every 10 startups, ~5 die completely, ~3 return your money, ~1 doubles it, and ~1 returns 20×. You can't tell in advance which is which - nobody can.",
          question: "How do you deploy the 1M?",
          choices: [
            {
              text: "Spread it across ~10 startups - you need enough shots for the math to work",
              points: 2,
              feedback:
                "You understand the power law! With one 20× winner likely per 10 bets, diversification isn't cowardice - it's how the whole model functions.",
            },
            {
              text: "All 1M into your single favorite - conviction is everything",
              points: 0,
              feedback:
                "There's a 50% chance your favorite dies and the fund goes to zero. Conviction picks *which* 10; it doesn't excuse betting on 1.",
            },
            {
              text: "Split across 100 startups, 10K each",
              points: 1,
              feedback:
                "Over-diversified - checks that small can't buy meaningful ownership, and you can't help 100 companies. Even index-style VC funds concentrate more than this.",
            },
          ],
        },
        {
          situation:
            "Month 9: one of your startups, 'SnackDrop', is running out of money. The founders work hard but the product just isn't catching on - growth has been flat for 6 months. They ask you for emergency funding.",
          question: "Do you save SnackDrop?",
          choices: [
            {
              text: "Decline kindly - flat growth for 6 months means the market has answered",
              points: 2,
              feedback:
                "The hardest discipline in VC: don't throw good money after bad. 'Bridge rounds' for flat companies usually just delay the end at your expense.",
            },
            {
              text: "Fund them - never abandon a founder who works hard",
              points: 1,
              feedback:
                "Loyalty is a virtue, but effort isn't traction. The extra money bought 6 more flat months, then the same shutdown. Back the *market's* signal.",
            },
            {
              text: "Fund them but demand the founders repay you personally if it fails",
              points: 0,
              feedback:
                "That's not how venture works - VCs take equity risk, founders don't owe personal debts. Demanding it would end your reputation with every founder in town.",
            },
          ],
        },
        {
          situation:
            "Year 3: your portfolio has 4 dead startups, 4 sideways ones... and 'Loop', a delivery startup, growing so fast it's now worth 30× your entry price on paper. A rival fund offers to buy your entire Loop stake - cash today, at the 30× price.",
          question: "Sell your Loop stake?",
          choices: [
            {
              text: "Sell a small piece to return the fund's original capital, ride the rest",
              points: 2,
              feedback:
                "GP-level move. De-risking the fund while staying in the rocket is the pro's balance - Loop later hit 90× and your investors named a conference room after you.",
            },
            {
              text: "Sell it all - 30× is unbelievable, take it",
              points: 1,
              feedback:
                "Nobody's fired for 30×... but the fund's whole return depended on that one winner, and it had 3× more to go. Power-law winners are exactly what you must hold.",
            },
            {
              text: "Sell nothing, ever, no matter what",
              points: 0,
              feedback:
                "'Never sell anything' isn't strategy either - funds must eventually return cash to investors. The answer is *how much*, not never.",
            },
          ],
        },
      ],
    },
    {
      id: "vc-hot-round",
      title: "The Hot Round",
      client: "Nimbus Robotics",
      tagline: "Every fund wants into this startup. Win the deal without losing your head.",
      difficulty: "Senior",
      baseFee: 1200,
      stages: [
        {
          situation:
            "Nimbus Robotics builds warehouse robots that actually work - revenue tripling yearly, customers begging for more. Every top fund wants in, and the founders will pick *one* lead investor this week. Your term sheet needs to stand out.",
          question: "How do you win the deal?",
          choices: [
            {
              text: "Offer real help: intros to 5 warehouse customers you know, plus a fair price",
              points: 2,
              feedback:
                "Founders pick partners, not just prices. Concrete value - customers, hiring help, honest advice - wins hot deals against bigger checks all the time.",
            },
            {
              text: "Offer the highest valuation, whatever it takes",
              points: 1,
              feedback:
                "You won the deal and immediately regretted the price. Winning hot rounds purely on price is called the 'winner's curse' - great founders sniff out desperation anyway.",
            },
            {
              text: "Pressure them: 'this offer expires in 24 hours'",
              points: 0,
              feedback:
                "Exploding offers on great founders backfire instantly - they told every founder in their network. Reputation is a VC's only durable asset.",
            },
          ],
        },
        {
          situation:
            "You're in! But during final diligence, you find Nimbus's founder promised an early employee 5% of the company in a handshake deal that was never written down. The founder shrugs: 'We'll sort it out someday.'",
          question: "How do you handle it?",
          choices: [
            {
              text: "Require it be papered before closing - unwritten promises become lawsuits",
              points: 2,
              feedback:
                "Exactly right. Messy ownership ('cap table') problems only get bigger and angrier with time. Clean it up while it's cheap and friendly.",
            },
            {
              text: "Ignore it - 5% is small and the robots are great",
              points: 0,
              feedback:
                "Three years later that handshake became a lawsuit that nearly blocked the company's acquisition. Diligence exists to catch exactly this.",
            },
            {
              text: "Walk away from the whole deal - sloppy founders are untouchable",
              points: 1,
              feedback:
                "Overreaction - early-stage companies are *always* a bit messy. The skill is separating fixable sloppiness from fatal flaws. This was fixable in a week.",
            },
          ],
        },
        {
          situation:
            "Two years later Nimbus is the hottest robotics company alive. A tech giant offers to acquire it for 2B - life-changing money for the founders. But you believe Nimbus could be a 20B public company in five years. The founders ask for your honest advice - and your fund would earn a fortune either way.",
          question: "What do you tell them?",
          choices: [
            {
              text: "Lay out both paths honestly - including your bias - and back whatever they choose",
              points: 2,
              feedback:
                "This is what 'founder-friendly' actually means. Your honesty made them trust you with their next three companies. They said no, IPO'd at 18B. Legend status.",
            },
            {
              text: "Push them hard to sell - lock in your fund's win now",
              points: 1,
              feedback:
                "Your fund won, your reputation lost. Pushing founders to sell for *your* timeline is remembered forever in founder circles.",
            },
            {
              text: "Push them hard to reject it - you want the 20B outcome",
              points: 0,
              feedback:
                "It's their life and their risk - 2B guaranteed vs a maybe is *their* call. VCs who gamble with founders' lives for fund returns lose the trust that wins deals.",
            },
          ],
        },
      ],
    },
  ],
}

// ── Wealth Manager ───────────────────────────────────────────────────────
const wealthManager: Career = {
  id: "wealth-manager",
  name: "Wealth Manager",
  icon: LineChart,
  gradient: "from-amber-500 to-orange-600",
  accent: "#fbbf24",
  description:
    "Help real people grow and protect their money. Match each client's investments to their goals, their timeline, and how much risk they can sleep through.",
  dealNoun: "Client",
  ranks: [
    { title: "Advisor Trainee", minXp: 0 },
    { title: "Financial Advisor", minXp: 12 },
    { title: "Senior Advisor", minXp: 30 },
    { title: "Portfolio Manager", minXp: 55 },
    { title: "Wealth Director", minXp: 90 },
    { title: "Chief Investment Officer", minXp: 140 },
  ],
  deals: [
    {
      id: "wm-teacher",
      title: "The First Client",
      client: "Ms. Rivera, 28, teacher",
      tagline: "A young teacher with her first savings. Set her up for the long run.",
      difficulty: "Junior",
      baseFee: 400,
      stages: [
        {
          situation:
            "Ms. Rivera saved 10,000 coins and won't need the money until she retires - 35+ years away. She asks: \"Should I keep it all in my savings account? It feels safest.\"",
          question: "What's your recommendation?",
          choices: [
            {
              text: "Mostly stocks - with 35 years, market dips heal and growth compounds massively",
              points: 2,
              feedback:
                "The single most important idea in investing: time horizon drives everything. Over 35 years, 'safe' savings actually lose to inflation while stocks compound.",
            },
            {
              text: "Keep it all in savings - never risk a client's money",
              points: 0,
              feedback:
                "The 'safe' choice is secretly risky! Inflation quietly shrinks idle cash - over 35 years her 10,000 would buy half as much. Growth *is* safety long-term.",
            },
            {
              text: "Put it all in one exciting tech stock",
              points: 0,
              feedback:
                "Stocks yes, ONE stock no! A single company can go to zero. Diversification - spreading across many companies - is rule #1 of managing other people's money.",
            },
          ],
        },
        {
          situation:
            "Before investing anything, you're building her financial foundation. She mentions she has no savings besides this 10,000 - if her car broke down tomorrow, she'd have to use a credit card at 25% interest.",
          question: "What comes before investing?",
          choices: [
            {
              text: "Set aside an emergency fund (3-6 months of expenses) in cash first",
              points: 2,
              feedback:
                "Foundation first! An emergency fund keeps a surprise bill from forcing her to sell investments at the worst time - or worse, into 25% credit card debt.",
            },
            {
              text: "Invest everything - emergencies probably won't happen",
              points: 0,
              feedback:
                "Emergencies always happen eventually. Six months later her car died, she sold stocks during a dip, and lost money she didn't have to lose.",
            },
            {
              text: "Tell her to buy insurance for everything imaginable",
              points: 1,
              feedback:
                "Insurance has its place, but over-insuring a tight budget drains the money she should be growing. Emergency cash is the flexible, first-line defense.",
            },
          ],
        },
        {
          situation:
            "One year in, the market drops 20% and Ms. Rivera calls, scared: \"My 8,000 in stocks is now 6,400! Sell everything before it goes lower!\"",
          question: "What do you tell her?",
          choices: [
            {
              text: "Remind her the plan was built for this - she has 34 years; selling now locks in the loss",
              points: 2,
              feedback:
                "This call IS the job. Talking clients off the ledge during dips is where advisors earn their fee. She held; two years later she was up 30% from the bottom.",
            },
            {
              text: "Sell everything - the client is always right",
              points: 0,
              feedback:
                "She locked in the loss and missed the recovery. 'Buy high, sell low' via panic is the #1 destroyer of regular investors' wealth - your job was to prevent it.",
            },
            {
              text: "Tell her to stop calling and trust you",
              points: 1,
              feedback:
                "Right conclusion, terrible delivery. Scared clients need to be heard *and* educated - dismissed clients just find another advisor and panic-sell anyway.",
            },
          ],
        },
      ],
    },
    {
      id: "wm-retiree",
      title: "The Nest Egg",
      client: "Mr. Chen, 64, retiring next year",
      tagline: "A lifetime of savings that now has to last a lifetime. Protect it.",
      difficulty: "Mid",
      baseFee: 700,
      stages: [
        {
          situation:
            "Mr. Chen has 800,000 coins and retires in one year. His portfolio is 90% stocks - the same aggressive mix that grew his wealth for 30 years. \"It's worked great so far,\" he says, \"why change?\"",
          question: "Does his portfolio need to change?",
          choices: [
            {
              text: "Yes - shift a big chunk to bonds and cash; he'll be *spending* this money soon, not growing it",
              points: 2,
              feedback:
                "The glide path! What's right at 34 is dangerous at 64 - a 40% crash the year before retirement can't be waited out when you need the money for groceries.",
            },
            {
              text: "No - 90% stocks earned him this fortune, don't fix what works",
              points: 0,
              feedback:
                "What 'works' depends on the timeline. Retirees hit by a crash while withdrawing can run out of money entirely - it's called sequence-of-returns risk, and it's brutal.",
            },
            {
              text: "Move 100% into cash immediately",
              points: 1,
              feedback:
                "Too far! Retirement can last 30 years - all-cash guarantees inflation eats his buying power. Retirees still need *some* growth; balance, not extremes.",
            },
          ],
        },
        {
          situation:
            "Mr. Chen's nephew calls him with a 'guaranteed' opportunity: a friend's crypto fund promising 40% yearly returns with 'zero risk'. Mr. Chen wants to put in 200,000. \"He's family - and 40% guaranteed!\"",
          question: "Your response?",
          choices: [
            {
              text: "'Guaranteed 40% with zero risk' does not exist - this is the signature of a scam",
              points: 2,
              feedback:
                "You likely saved his retirement. High guaranteed returns with no risk is THE classic fraud pattern - real investing always trades risk for return. The 'fund' collapsed in a year.",
            },
            {
              text: "Allow a small amount - family is family",
              points: 1,
              feedback:
                "50,000 gone. Scams don't get safer in smaller doses, and 'family' is exactly how affinity fraud spreads - the nephew was fooled too.",
            },
            {
              text: "Put in the full 200,000 - 40% returns would secure his retirement",
              points: 0,
              feedback:
                "A quarter of his life savings vanished. If a return sounds too good to be true, it isn't true - no exceptions, not even for family.",
            },
          ],
        },
        {
          situation:
            "Retirement arrives. Mr. Chen asks the big question: \"How much can I spend each year without running out of money before I'm 95?\"",
          question: "What withdrawal approach do you set up?",
          choices: [
            {
              text: "Around 4% of the portfolio per year, adjusted as markets and his life change",
              points: 2,
              feedback:
                "The famous '4% rule' - history's benchmark for making a nest egg last 30+ years. The key is your addendum: it's a starting point you *adjust*, not autopilot.",
            },
            {
              text: "Spend 10% a year - he earned it, let him enjoy it",
              points: 0,
              feedback:
                "At 10% withdrawals, his money runs out around age 78 - with 17 years still to fund. Retirement math is unforgiving; enjoyment needs a sustainable rate.",
            },
            {
              text: "Spend only the bare minimum, preserve every coin",
              points: 1,
              feedback:
                "He'll never run out - but he'll also skip the trips and grandkid-spoiling he saved 40 years FOR. The goal is a great life, not a high score.",
            },
          ],
        },
      ],
    },
    {
      id: "wm-windfall",
      title: "The Windfall",
      client: "Jasmine, 21, lottery winner",
      tagline: "She just won 5 million coins. Most winners go broke - don't let her.",
      difficulty: "Senior",
      baseFee: 1200,
      stages: [
        {
          situation:
            "Jasmine, 21, won 5M coins last month. She's already bought two cars, and friends she hasn't seen in years keep calling with 'business ideas'. Statistically, most big lottery winners lose everything within 5 years. She's hired you to prevent that.",
          question: "What's your very first move?",
          choices: [
            {
              text: "Hit pause: park the money safely, take 6 months before ANY big decisions",
              points: 2,
              feedback:
                "The pro's first move with any windfall. A cooling-off period defeats the two killers: emotional spending and 'friend' opportunities. Boring beats broke.",
            },
            {
              text: "Invest all 5M in the market today - time in market beats timing",
              points: 1,
              feedback:
                "Right principle, wrong moment. She needs a plan, a budget, and tax advice *first* - investing everything before understanding her life goals is planning backwards.",
            },
            {
              text: "Help her evaluate her friends' business ideas - some might be great",
              points: 0,
              feedback:
                "This is exactly how winners go broke. Windfall + eager 'friends' + no plan = zero in five years. The businesses failed; the friends vanished with the money.",
            },
          ],
        },
        {
          situation:
            "Six months later, cooled off and ready. Jasmine's goals: never be broke again (top priority), buy a home for her mom, and maybe start a bakery someday. She's 21 - this money could fund her entire life if structured right.",
          question: "How do you structure the 5M (minus taxes)?",
          choices: [
            {
              text: "Buckets: safety fund, mom's house, diversified long-term portfolio, and a capped 'bakery/dream' fund",
              points: 2,
              feedback:
                "Bucket strategy - brilliant. Each goal gets its own pool with its own risk level, and the dream fund has a *cap* so a failed bakery can't sink the ship. This is Portfolio Director thinking.",
            },
            {
              text: "One big index fund; she can sell pieces whenever she needs money",
              points: 1,
              feedback:
                "Decent math, weak psychology. Without dedicated buckets, every want becomes a portfolio raid - structure exists to protect the plan from impulse.",
            },
            {
              text: "Put it all in ultra-safe bonds forever - priority one is never being broke",
              points: 0,
              feedback:
                "She's 21 - this money must last 70 years, and all-bonds loses to inflation over that stretch. You honored the fear but broke the mission.",
            },
          ],
        },
        {
          situation:
            "Three years later: the plan is working, the bakery is real and profitable. Then a market crash hits - her portfolio drops 25%, and a TV pundit screams 'THIS IS THE BIG ONE, SELL EVERYTHING.' Jasmine texts you at 11pm: 'Should we get out?'",
          question: "Your 11pm reply?",
          choices: [
            {
              text: "Call her now: her safety buckets are untouched, her timeline is 60+ years, and pundits don't know her plan - stay the course, rebalance into the dip",
              points: 2,
              feedback:
                "Masterclass. The buckets you built did their job - cash needs were safe, so the crash was noise on a 60-year plan. Rebalancing into the dip added years of gains. She's a client for life.",
            },
            {
              text: "Text back: 'markets are scary, let's sell half to be safe'",
              points: 0,
              feedback:
                "Half-panicking is still panicking - she locked in losses on the exact money that had decades to recover. The structure was built for this moment, and you abandoned it.",
            },
            {
              text: "Ignore the text until office hours - no emergencies in long-term investing",
              points: 1,
              feedback:
                "Technically true, relationally fatal. Scary nights are when clients decide if they trust you. She got a reply at 9am - from her *new* advisor's office.",
            },
          ],
        },
      ],
    },
  ],
}

export const CAREERS: Career[] = [investmentBanker, privateEquity, ventureCapitalist, wealthManager]

export function getCareer(id: string): Career | undefined {
  return CAREERS.find(c => c.id === id)
}

/** Max points obtainable in one deal (2 per stage). */
export function dealMaxPoints(deal: CareerDeal): number {
  return deal.stages.length * 2
}

/**
 * Current rank for a career given earned XP and which milestone deals are
 * closed. You hold the highest rank whose XP threshold you meet AND whose
 * milestone requirement (if any) is satisfied - a promotion can be "pending
 * your promotion case" even when the XP is there.
 */
export function rankForXp(career: Career, xp: number, completedDealIds: string[] = []) {
  const done = new Set(completedDealIds)
  let currentIdx = 0
  for (let i = 1; i < career.ranks.length; i++) {
    const milestone = MILESTONE_RANKS[i] !== undefined ? career.deals[MILESTONE_RANKS[i]] : null
    if (xp >= career.ranks[i].minXp && (!milestone || done.has(milestone.id))) currentIdx = i
    else break
  }
  const current = career.ranks[currentIdx]
  const next = career.ranks[currentIdx + 1] ?? null
  const nextIdx = currentIdx + 1
  // What's blocking the next rank?
  const nextMilestone =
    next && MILESTONE_RANKS[nextIdx] !== undefined ? career.deals[MILESTONE_RANKS[nextIdx]] : null
  const needsMilestone = !!(nextMilestone && !done.has(nextMilestone.id))
  return { current, currentIdx, next, needsMilestone, nextMilestone }
}
