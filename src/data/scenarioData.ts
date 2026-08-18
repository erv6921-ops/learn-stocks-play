export interface ScenarioOption {
  label: string
}

export interface Scenario {
  prompt: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const scenarios: Scenario[] = [
  {
    prompt:
      "You just got your first paycheck: $480. Your friend wants you to split a $200 Nintendo Switch game. You've been saving for a car. What do you do?",
    options: [
      "Split it - it's a one-time thing",
      "Say no - stay on track with your car savings goal",
      "Buy the whole game yourself",
      "Give all $480 to savings and tell your friend you're broke",
    ],
    correctIndex: 1,
    explanation:
      "Staying on track with a savings goal is the right move. Impulse buys are the #1 enemy of financial goals.",
  },
  {
    prompt:
      "You have $1,000 saved. A friend says you can double it in a week investing in his 'guaranteed' crypto tip. What do you do?",
    options: [
      "Invest all $1,000 - sounds like a great return",
      "Invest half and keep half safe",
      "Decline - guaranteed returns don't exist",
      "Ask your parents to invest too",
    ],
    correctIndex: 2,
    explanation:
      "No investment is ever 'guaranteed.' This is a classic scam signal. Real investing involves real risk.",
  },
  {
    prompt:
      "Your credit card bill is $340. You have $800 in your account. You also want to buy new shoes for $120. What should you do first?",
    options: [
      "Buy the shoes - you have enough for both",
      "Pay the minimum on the card and buy the shoes",
      "Pay the full credit card balance first",
      "Ignore the bill for now",
    ],
    correctIndex: 2,
    explanation:
      "Always pay off high-interest debt before discretionary spending. Credit card interest compounds fast.",
  },
  {
    prompt:
      "You get a $500 bonus at your part-time job. You have no emergency fund. What's the smartest move?",
    options: [
      "Treat yourself - you earned it",
      "Split it: $250 savings, $250 fun",
      "Put it all toward your emergency fund",
      "Invest it all in stocks",
    ],
    correctIndex: 2,
    explanation:
      "An emergency fund (3-6 months of expenses) comes before investing or spending. It's your financial safety net.",
  },
  {
    prompt:
      "A store offers you a credit card with 28% APR to save 15% today. You need a $60 item. What do you do?",
    options: [
      "Open the card - 15% off is a great deal",
      "Pay cash and skip the card",
      "Open the card and pay it off slowly",
      "Ask for a better rate first",
    ],
    correctIndex: 1,
    explanation:
      "28% APR means that $60 item becomes much more expensive if you carry a balance. The 15% discount isn't worth it.",
  },
  {
    prompt:
      "You're 17 and your parents offer to add you as an authorized user on their credit card. Should you?",
    options: [
      "No - credit cards are dangerous for teens",
      "Yes - it can help you build credit history early",
      "Only if they give you the physical card",
      "It doesn't matter until you're 18",
    ],
    correctIndex: 1,
    explanation:
      "Being an authorized user lets you build a credit history without the risk of your own card. It's a great head start.",
  },
  {
    prompt:
      "You want to buy a $1,200 laptop. You have $900 saved. What's the best option?",
    options: [
      "Finance it with a store credit card",
      "Wait 2 more months and save the rest",
      "Buy it now and deal with being short later",
      "Ask a friend to pay the difference",
    ],
    correctIndex: 1,
    explanation:
      "Delayed gratification beats debt every time. Two more months of saving costs you nothing. Financing costs you interest.",
  },
  {
    prompt:
      "You earn $300/month babysitting. How much should you aim to save each month?",
    options: [
      "Whatever's left after spending",
      "At least $60 - pay yourself first",
      "Nothing - you're too young to save",
      "All of it",
    ],
    correctIndex: 1,
    explanation:
      "The 'pay yourself first' rule: save at least 20% before you spend. $60 of $300 is 20% - a great habit to start now.",
  },
  {
    prompt:
      "Your car breaks down and the repair is $400. You have no emergency fund. What's the worst response?",
    options: [
      "Ask your parents for a short-term loan",
      "Put it on a high-interest credit card and pay minimums",
      "Pick up extra shifts to cover it",
      "Negotiate a payment plan with the mechanic",
    ],
    correctIndex: 1,
    explanation:
      "Minimum payments on high-interest debt create a debt spiral. This is exactly what emergency funds prevent.",
  },
  {
    prompt:
      "You're comparing two job offers: Job A pays $18/hr with no benefits. Job B pays $15/hr with health insurance. Which is better?",
    options: [
      "Job A - always take the higher hourly rate",
      "Depends on the value of the health insurance",
      "Job B - benefits are always worth it",
      "Neither - keep looking",
    ],
    correctIndex: 1,
    explanation:
      "Health insurance can be worth $200-500/month. $15/hr + benefits may actually pay more in total compensation.",
  },
  {
    prompt:
      "You see a 'buy now, pay later' option for a $250 purchase. Zero interest, 4 payments. Should you use it?",
    options: [
      "Yes - it's free money",
      "Only if you'd buy it anyway and can afford all 4 payments",
      "Always use BNPL - it's always free",
      "No - BNPL is always a scam",
    ],
    correctIndex: 1,
    explanation:
      "BNPL can be fine if you're disciplined. The danger is buying things you wouldn't otherwise afford.",
  },
  {
    prompt: "You want to invest but only have $25. Is it worth starting?",
    options: [
      "No - wait until you have at least $1,000",
      "Yes - compound interest rewards early starters",
      "Only if you pick the right stock",
      "Invest it all in one company you know",
    ],
    correctIndex: 1,
    explanation:
      "$25 invested at 17 is worth more at 65 than $1,000 invested at 30. Starting early is the biggest investing advantage you have.",
  },
  {
    prompt:
      "Your friend says renting is 'throwing money away' and you should always buy a house. Is that true?",
    options: [
      "Yes - homeownership always builds wealth",
      "No - renting vs. buying depends on your situation",
      "Yes - rent never helps you build equity",
      "No - renting is always smarter",
    ],
    correctIndex: 1,
    explanation:
      "Renting offers flexibility and avoids maintenance costs. Buying builds equity but requires stability and upfront costs. Neither is always better.",
  },
  {
    prompt: "You get $1,000 in birthday money. Where should it go?",
    options: [
      "Spend it - it's a gift, not income",
      "Put it all in a savings account",
      "Build your emergency fund first, then invest the rest",
      "Buy crypto - young people can afford the risk",
    ],
    correctIndex: 2,
    explanation:
      "The right order: emergency fund → high-interest debt → invest. A windfall is a great chance to skip ahead.",
  },
  {
    prompt:
      "Your first paycheck is smaller than expected - taxes were taken out. Your friend says to claim 'exempt' so nothing is withheld. Should you?",
    options: [
      "Yes - you get every dollar in your pocket now",
      "Only claim exempt if you truly owe no tax for the year",
      "Yes - withholding is basically a scam anyway",
      "No - you should withhold as much as possible always",
    ],
    correctIndex: 1,
    explanation:
      "Claiming exempt when you actually owe tax means a surprise bill (and maybe penalties) in April. Withholding just pre-pays what you'll owe.",
  },
  {
    prompt:
      "A sports betting app gives you a '$200 free bet' bonus. Your friends are all using it. What's the smart read?",
    options: [
      "Deposit big - the bonus makes it basically free",
      "The bonus has strings attached and the house always has an edge",
      "Bet the bonus on a sure thing to lock in profit",
      "Betting is fine as long as you win more than you lose",
    ],
    correctIndex: 1,
    explanation:
      "'Free bet' bonuses come with wagering requirements, and betting apps are designed for the house to profit long-term. It's entertainment, not income.",
  },
  {
    prompt:
      "You signed up for a free 7-day trial and forgot about it. It's day 6. What should you do?",
    options: [
      "Nothing - they'll remind you before charging",
      "Set a reminder and cancel now if you don't want it",
      "Let it charge - one month won't hurt",
      "Wait until after they charge, then dispute it",
    ],
    correctIndex: 1,
    explanation:
      "Free trials auto-convert to paid on purpose. Cancel before the deadline (you often keep access through it) so you're never charged for something you forgot.",
  },
  {
    prompt:
      "A hoodie is marked $40. At checkout it rings up as $43.20. Is something wrong?",
    options: [
      "Yes - report the store for overcharging you",
      "No - that's sales tax added on at the register",
      "Yes - demand they honor the $40 sticker exactly",
      "No - stores can charge whatever they want at checkout",
    ],
    correctIndex: 1,
    explanation:
      "In most places the shelf price is before sales tax. An 8% tax turns $40 into $43.20 - always budget for tax on top of the sticker.",
  },
  {
    prompt:
      "You're picking a phone plan. You use lots of data and never call. Which factor matters most for you?",
    options: [
      "The number of free minutes included",
      "The data allowance and speed after you hit the cap",
      "Whichever plan has the flashiest ad",
      "The most expensive plan - it must be the best",
    ],
    correctIndex: 1,
    explanation:
      "Match the plan to how you actually use it. A heavy-data, no-calls user should compare data caps and throttling - not minutes or price alone.",
  },
  {
    prompt:
      "You review your subscriptions and find 6 you barely use, totaling $54/month. What's the smart move?",
    options: [
      "Keep them - $54 isn't much money",
      "Cancel the ones you don't use and redirect the money",
      "Cancel all subscriptions forever on principle",
      "Add more so you feel you get your money's worth",
    ],
    correctIndex: 1,
    explanation:
      "$54/month is $648/year leaking out. Auditing subscriptions and cutting the dead weight is one of the fastest ways to free up cash.",
  },
  {
    prompt:
      "You flip sneakers online and made $600 this year doing it. Tax season arrives. What's true?",
    options: [
      "It's a hobby, so it's totally tax-free",
      "Side-hustle income can be taxable - keep records",
      "You only owe tax if they mail you a form",
      "Cash and app payments are invisible to the IRS",
    ],
    correctIndex: 1,
    explanation:
      "Money you earn from a side hustle is generally taxable income. Track what you make and spend so you're not caught off guard - forms or not.",
  },
  {
    prompt:
      "You're renting your first apartment. The landlord wants first month plus a security deposit. What's the deposit for?",
    options: [
      "It's an extra fee the landlord just keeps",
      "It covers damage beyond normal wear, refundable if you're clean",
      "It's a tip to get you approved faster",
      "It pays your last month automatically no matter what",
    ],
    correctIndex: 1,
    explanation:
      "A security deposit is held against damage or unpaid rent and is refundable if you leave the place in good shape. Document its condition when you move in.",
  },
  {
    prompt:
      "You have $9,000 for a car. A clean used car costs $8,000; a new one needs a $9,000 loan on top. What's usually the wiser buy?",
    options: [
      "The new car - it's safer and nicer",
      "The used car you can pay for without a loan",
      "Whichever has the lower monthly payment",
      "Neither - always lease instead",
    ],
    correctIndex: 1,
    explanation:
      "New cars lose value fast the moment you drive off. Buying a reliable used car in cash avoids interest and steep depreciation.",
  },
  {
    prompt:
      "Your checking account hits $0 and a $30 charge goes through anyway, triggering a $35 overdraft fee. How do you avoid this next time?",
    options: [
      "Just spend more carefully and hope for the best",
      "Turn off overdraft coverage so charges get declined instead",
      "Open a second account and ignore the first",
      "Overdraft fees are unavoidable, so accept them",
    ],
    correctIndex: 1,
    explanation:
      "Opting out of overdraft means a charge you can't cover is simply declined - no $35 fee. A small balance buffer helps too.",
  },
  {
    prompt:
      "A relative offers you either a $50 gift card to one store or $45 in cash. Which is generally more useful?",
    options: [
      "The $50 gift card - it's worth more on paper",
      "The $45 cash - you can spend it anywhere, anytime",
      "The gift card, because cash gets spent too fast",
      "Neither - politely refuse both",
    ],
    correctIndex: 1,
    explanation:
      "Gift cards lock you into one store and often go partly unused. Flexible cash is usually worth more in practice, even at a slightly lower number.",
  },
  {
    prompt:
      "You can cover college with a scholarship (no repayment) or a student loan (repaid with interest). Both cover the same cost. Which first?",
    options: [
      "The loan - scholarships have too many rules",
      "The scholarship - free money you never pay back",
      "Split it evenly to be safe",
      "Whichever arrives in your account first",
    ],
    correctIndex: 1,
    explanation:
      "Scholarships and grants are free money - always max those before borrowing. Loans should be the last resort because interest adds to the cost.",
  },
  {
    prompt:
      "You want to invest $50 every month but worry about buying at the 'wrong' time. What's a proven approach?",
    options: [
      "Wait on the sidelines until prices are clearly low",
      "Invest the same amount on a set schedule regardless of price",
      "Only buy after a big news event",
      "Put in a lump sum once a year instead",
    ],
    correctIndex: 1,
    explanation:
      "That's dollar-cost averaging: investing a fixed amount on a schedule smooths out the highs and lows and removes the guesswork of timing.",
  },
  {
    prompt:
      "You have $500 to invest. You could put it all in one hot stock, or spread it across a broad index fund. What lowers your risk?",
    options: [
      "The single stock - concentrate on your best idea",
      "The index fund - it spreads money across many companies",
      "Cash - never invest at all",
      "Whichever your favorite influencer is promoting",
    ],
    correctIndex: 1,
    explanation:
      "Diversification is your friend. A broad index fund spreads risk across hundreds of companies, so one bad stock can't sink you.",
  },
  {
    prompt:
      "Prices keep rising over the years. You keep all your long-term savings as cash in a drawer. What's the hidden problem?",
    options: [
      "Nothing - cash is always the safest choice",
      "Inflation quietly erodes what that cash can buy",
      "The cash will secretly grow on its own",
      "Drawers are the best interest-paying accounts",
    ],
    correctIndex: 1,
    explanation:
      "Cash feels safe but loses purchasing power to inflation over time. Long-term money usually needs to be invested just to keep up.",
  },
  {
    prompt:
      "You deliver food and a customer's order was $22. What's a fair and normal thing to do about a tip?",
    options: [
      "Tipping is optional and never expected in the US",
      "A tip of roughly 15-20% is customary for good service",
      "Always tip exactly $1 no matter the order",
      "Only tip if the delivery took under 10 minutes",
    ],
    correctIndex: 1,
    explanation:
      "In the US, tipping service workers 15-20% is customary and often a big part of their pay. Budget for it as part of the real cost.",
  },
  {
    prompt:
      "At checkout for a $300 TV, the cashier pushes a $60 'extended warranty.' When is that usually worth it?",
    options: [
      "Always - warranties guarantee free repairs forever",
      "Rarely - many items outlast the warranty and it's pure profit",
      "Only if the salesperson is really friendly",
      "Never buy anything that offers a warranty",
    ],
    correctIndex: 1,
    explanation:
      "Extended warranties are high-margin add-ons stores love. Most electronics either fail early (covered by the standard warranty) or last for years.",
  },
  {
    prompt:
      "A stranger 'accidentally' sends you $500 on a payment app, then begs you to send it back to a different account. What's happening?",
    options: [
      "They made an honest mistake - just send it back",
      "It's likely a scam using stolen or reversed funds",
      "Free $500 - keep it and block them",
      "Send back double to be extra polite",
    ],
    correctIndex: 1,
    explanation:
      "This is a classic overpayment scam: the original transfer gets reversed, but the money you 'return' is real and gone. Don't engage - report it.",
  },
  {
    prompt:
      "You get a text: 'Your bank account is locked. Click this link to verify your password now.' What should you do?",
    options: [
      "Click fast before your account is frozen",
      "Don't click - contact your bank through its official app or number",
      "Reply with your password to unlock it quickly",
      "Forward it to friends so they can verify too",
    ],
    correctIndex: 1,
    explanation:
      "Banks never text you a link asking for your password. This is phishing - go directly to the official app or the number on your card instead.",
  },
  {
    prompt:
      "You want a simple budgeting rule for your $1,000/month income. What does the popular 50/30/20 rule suggest?",
    options: [
      "50% fun, 30% needs, 20% savings",
      "50% needs, 30% wants, 20% savings and debt payoff",
      "50% savings, 30% needs, 20% wants",
      "Spend it however feels right each month",
    ],
    correctIndex: 1,
    explanation:
      "50/30/20 splits income into 50% needs, 30% wants, and 20% toward savings or paying off debt - a simple starting framework you can adjust.",
  },
  {
    prompt:
      "You buy a scratch-off lottery ticket every week hoping for a big win. What's the reality of that plan?",
    options: [
      "It's a solid long-term wealth strategy",
      "The odds are terrible - it's entertainment, not investing",
      "Buying more tickets guarantees you'll win eventually",
      "Scratch-offs always pay out more than they cost",
    ],
    correctIndex: 1,
    explanation:
      "Lottery odds are stacked against you by design. Treat any ticket as the cost of a moment of fun, never as a way to build wealth.",
  },
  {
    prompt:
      "You're deciding between fixing your broken bike (a need to get to work) and buying a new video game. Money is tight. What comes first?",
    options: [
      "The video game - you deserve a reward",
      "The bike repair - it's a need that earns you income",
      "Buy both and sort out the money later",
      "Neither - just stay home to save money",
    ],
    correctIndex: 1,
    explanation:
      "When money is limited, needs beat wants. Fixing the bike keeps your income flowing; the game can wait until you've covered essentials.",
  },
  {
    prompt:
      "One savings account advertises '2% APR' and another '2% APY.' If you're comparing where to keep savings, which number tells you more?",
    options: [
      "APR - it always includes compounding",
      "APY - it reflects interest compounding over the year",
      "They're identical, so it doesn't matter",
      "Whichever number is printed in bigger font",
    ],
    correctIndex: 1,
    explanation:
      "APY includes the effect of compounding, so it shows what you'll actually earn on savings. Compare accounts by APY, not APR.",
  },
  {
    prompt:
      "You're offered your first salaried job at $42,000. The recruiter asks if that number works. What's often worth doing?",
    options: [
      "Never negotiate - it's rude and risks the offer",
      "Politely ask if there's flexibility, backed by your value",
      "Demand double or walk away immediately",
      "Accept instantly so they don't change their mind",
    ],
    correctIndex: 1,
    explanation:
      "Many first offers have room to move. A calm, well-reasoned counter can raise your pay for years - the worst they usually say is 'that's our best.'",
  },
  {
    prompt:
      "Your credit card limit is $1,000 and you're carrying a $900 balance month to month. How does that affect your credit score?",
    options: [
      "It helps - using most of your limit shows you're active",
      "It hurts - high credit utilization drags your score down",
      "It has no effect on your score at all",
      "It only matters if you miss a payment",
    ],
    correctIndex: 1,
    explanation:
      "Using 90% of your limit is very high utilization, which lowers your score. Keeping balances under about 30% of your limit helps your credit.",
  },
  {
    prompt:
      "A surprise $600 medical bill arrives and you can't pay it all at once. What's the best first step?",
    options: [
      "Ignore it and hope it goes to collections quietly",
      "Call the provider and ask for a payment plan or discount",
      "Put it on a high-interest card and pay minimums",
      "Take out a payday loan to clear it today",
    ],
    correctIndex: 1,
    explanation:
      "Medical providers often offer interest-free payment plans or discounts if you ask. Ignoring bills or using high-interest debt only makes it worse.",
  },
  {
    prompt:
      "Your employer offers to match your retirement contributions up to 4% of your pay. You can barely afford to contribute. What's the priority?",
    options: [
      "Skip it - retirement is decades away",
      "Contribute at least enough to get the full match",
      "Contribute far more than 4% right away no matter what",
      "Wait until you earn a lot more to start",
    ],
    correctIndex: 1,
    explanation:
      "An employer match is free money and an instant 100% return on what you put in. Even when money's tight, grabbing the full match comes first.",
  },
]

// Tiny deterministic PRNG (mulberry32) so a given day always shuffles the same
// way, but different days land the correct answer in different slots.
function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// One scenario per day, cycling by day-of-year % (bank size). The options are
// shuffled deterministically per day so the correct answer rotates through
// every position instead of sitting in the same slot.
export function getScenarioForDay(dayOfYear: number): Scenario {
  const base = scenarios[dayOfYear % scenarios.length]
  const rng = mulberry32(dayOfYear * 2654435761 + 0x9e3779b9)
  const order = base.options.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return {
    ...base,
    options: order.map((i) => base.options[i]),
    correctIndex: order.indexOf(base.correctIndex),
  }
}
