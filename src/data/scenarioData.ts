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
]

// One scenario per day, cycling by day-of-year % 14.
export function getScenarioForDay(dayOfYear: number): Scenario {
  return scenarios[dayOfYear % scenarios.length]
}
