// "Make It Stick" reflection prompts - shown after the mastery check, before
// the completion screen. Each prompt asks the student to commit the lesson to
// a concrete personal action in their own words (research-backed retention:
// generation + implementation intentions beat re-reading every time).

import { LessonCategory } from "@/types"

const PROMPTS: Partial<Record<LessonCategory, string>> = {
  // ── Money psychology & behavior ──
  "psychology-of-money":
    "Think about your own spending habits. What is ONE thing you will start saving for, and HOW will you make yourself actually do it? (When will you set money aside, how much, and what will you do when you're tempted to spend it?)",
  "behavioral-finance":
    "Describe one money mistake this lesson could help you avoid. What's your plan - in your own words - for catching yourself before you make it?",
  "bubbles-crashes":
    "Imagine everyone at school is hyped about some investment. Using what you just learned, what would you personally do, and what warning signs would you look for?",

  // ── Everyday money management ──
  budgeting:
    "Sketch your own plan: next time money comes your way (allowance, job, gift), how exactly will you split it up, and why? Use what you just learned.",
  banking:
    "What will you personally do with a bank account in the next year? Describe how you'd set it up and what you'd use it for, based on this lesson.",
  "credit-debt":
    "Write your own personal rule for using credit - when would YOU borrow, when would you refuse, and how will you make sure you never miss a payment?",
  "debt-management":
    "If you ever owed money on two different things, how would you decide which to pay off first? Write your personal payoff game plan.",
  "income-earning":
    "What's one realistic way you could earn money in the next 6 months, and what would you do with the first payment? Apply an idea from this lesson.",
  "financial-planning":
    "Pick one real money goal you have (big or small). Write down the goal, when you want it, and the exact steps from this lesson you'll use to hit it.",

  // ── Investing track ──
  "investing-intro":
    "In your own words: what will be YOUR first move as an investor when you're able to start, and why is starting early such a big deal for you specifically?",
  "investing-fundamentals":
    "Explain to your future self: what's your personal investing rule #1 from this lesson, and how will you stick to it when the market gets scary?",
  stocks:
    "Pick a real company you actually know and like. Using this lesson, what would you want to find out about it before putting real money in?",
  "stock-market":
    "Describe how you would react - step by step - if a stock you owned dropped 20% in a week. Use what this lesson taught you.",
  portfolio:
    "Design your dream starter portfolio in words: what mix would you pick, and how does what you just learned shape those choices?",
  "etfs-funds":
    "Explain to a friend why you would (or wouldn't) start with a fund instead of picking single stocks. Make it personal - what fits YOUR situation?",
  bonds:
    "When in YOUR life do you think bonds would matter most to you, and why? Connect it to what you just learned.",
  valuation:
    "Pick any company you know. Using this lesson, what would make you say it's 'cheap' or 'expensive'? Write your reasoning.",
  options:
    "In your own words, when would options be a tool and when would they be a trap for someone your age? What's your personal line?",
  alternatives:
    "Would alternative investments ever fit your future plans? Write which one interests you most and what you'd check before touching it.",

  // ── Economics ──
  economics:
    "Find this concept in your real life: describe one choice you made this week that this lesson explains, and what you'd do differently now.",
  "macro-economics":
    "How could the thing you just learned actually affect your family or your future job? Give one concrete example from your own life.",
  "economic-indicators":
    "Next time you hear this indicator in the news, what will it tell YOU to do (or not do) with your money? Write your personal playbook.",

  // ── Business / entrepreneurship track ──
  entrepreneurship:
    "Apply this straight to your micro-business (or a business idea you have): what will you change or try this week because of this lesson?",
  "business-management":
    "If you ran your micro-business using this lesson, what's the FIRST decision you'd make differently? Explain your reasoning.",
  marketing:
    "Invent a mini marketing move for your micro-business using this lesson. What would you do, who is it for, and why would it work?",
  "consumer-behavior":
    "Think of the last thing you bought without really planning to. Which trick from this lesson was used on you, and how will you spot it next time?",
  "marketing-mix":
    "Take your micro-business and tune ONE of the 4 Ps using this lesson. Which one, what's the change, and what do you expect to happen?",
  "market-research":
    "Write 3 questions you would actually ask classmates to test whether your micro-business idea solves a real problem for them.",
  "leadership-management":
    "Describe a moment (team project, sports, clubs) where you could use this leadership idea. What exactly would you do differently?",
  "strategic-analysis":
    "Run a mini analysis on your micro-business: using this lesson, what's your biggest strength and your biggest threat - and what will you do about the threat?",
  "competitive-strategy":
    "Who is your micro-business's biggest competitor (real or imagined)? Using this lesson, how will you beat them? Be specific.",
  "business-ethics":
    "Describe a business decision that would make you more money but feel wrong. Where's YOUR line, and why - using ideas from this lesson?",

  // ── Statements & analysis ──
  "financial-statements":
    "Look at your micro-business (or imagine one): which number from this lesson would you check first every week, and what would it tell you to do?",
  "balance-sheets":
    "List what you personally own and owe (roughly!). What did this lesson teach you about growing the 'own' side over time?",
  "financial-ratios":
    "Pick one ratio from this lesson. How would you use it on your own micro-business or a company you like? What would a 'bad' number make you do?",
}

const GENERIC_PROMPT =
  "Write how you'll actually use this in your own life: one concrete thing you'll do differently this month because of this lesson, and how you'll make sure you follow through."

export const MIN_REFLECTION_WORDS = 20
export const REFLECTION_BONUS = 15

export function getReflectionPrompt(category: LessonCategory, lessonTitle: string): string {
  return PROMPTS[category] ?? GENERIC_PROMPT
}
