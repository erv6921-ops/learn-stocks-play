// Per-lesson scenario overrides. One UNIQUE scenario per lesson id so no
// two lessons share a scenario. Merged in ./index.ts.
import { LessonScenario } from "./index"
export const batchA_core: Record<string, LessonScenario> = {
  "budget-1": {
    title: "Where Did The Cash Go",
    narrative: "Maya earns 200 dollars a month from a weekend job at a smoothie shop, but by the last week she is always broke and cannot explain why. Her friend asks how much she spends on rides and snacks, and Maya realizes she has no idea. She wonders if writing down a plan for her money before she spends it would help her stop running out.",
    details: [
      "Income is about 200 dollars per month",
      "She always runs out of money in the final week",
      "No plan or record of where money goes",
      "Wants to know why cash disappears so fast",
      "Considering making her first money plan",
    ],
  },
  "budget-2": {
    title: "Building A First Plan",
    narrative: "Leo just got his first paycheck of 480 dollars from a summer landscaping gig and wants to actually keep some of it. He sits down with a notebook and lists his income at the top, then his usual spending like gas and food below. Now he needs to split the money into spending and saving so something is left at the end.",
    details: [
      "Monthly income is 480 dollars",
      "Fixed costs: 60 gas, 40 phone plan",
      "Wants to spend on food and going out too",
      "Goal is to save at least something each month",
      "Using a simple income minus spending layout",
    ],
  },
  "budget-3": {
    title: "The Mystery Coffee Habit",
    narrative: "Priya thinks she barely spends anything, but she agrees to track every purchase for two weeks. She saves each receipt and jots amounts in her phone notes, from a 4 dollar iced coffee to a 2 dollar bag of chips. When she adds it up, the small daily buys total far more than she expected.",
    details: [
      "Tracks every purchase for 14 days",
      "Daily coffee costs about 4 dollars",
      "Snacks add roughly 2 dollars most days",
      "Small buys total over 80 dollars in two weeks",
      "Surprised by how much little purchases add up",
    ],
  },
  "budget-4": {
    title: "Splitting A Paycheck Three Ways",
    narrative: "Andre brings home 1000 dollars a month from his after-school job at a hardware store. He heard about a rule that divides money into needs, wants, and savings. He wants to try slicing his 1000 dollars into those three buckets to keep things balanced.",
    details: [
      "Monthly take-home pay is 1000 dollars",
      "Needs bucket would be 500 dollars",
      "Wants bucket would be 300 dollars",
      "Savings bucket would be 200 dollars",
      "Testing whether the split fits his real bills",
    ],
  },
  "budget-5": {
    title: "One Full Month Mapped Out",
    narrative: "Sofia is planning her whole month ahead instead of guessing week to week. She lists 350 dollars of income and writes out every expected cost from the bus pass to her sister's birthday gift. She wants a single sheet that covers the entire month so nothing surprises her.",
    details: [
      "Total monthly income is 350 dollars",
      "Recurring costs: 45 bus pass, 30 streaming and phone",
      "One-time cost this month: 25 dollar gift",
      "Wants every category listed on one sheet",
      "Aims to update it as the month goes on",
    ],
  },
  "budget-6": {
    title: "The Cracked Phone Screen",
    narrative: "Jordan drops his phone and the repair costs 90 dollars, but he only has 30 dollars saved. He has to borrow the rest from his mom and feels stressed about paying her back. He decides he needs a small stash set aside just for surprises like this.",
    details: [
      "Surprise repair cost 90 dollars",
      "He only had 30 dollars saved",
      "Had to borrow 60 dollars from family",
      "Wants a buffer for unexpected costs",
      "Plans to build up a few hundred in savings",
    ],
  },
  "budget-7": {
    title: "The Raise That Vanished",
    narrative: "When Nina's hourly pay jumps and her monthly income rises from 400 to 600 dollars, she is thrilled. But three months later she still has nothing saved because she upgraded her phone plan, orders takeout more, and buys new clothes. She notices her spending grew right along with her paycheck.",
    details: [
      "Income rose from 400 to 600 dollars",
      "New spending: pricier phone plan and takeout",
      "Savings did not increase at all",
      "Extra 200 dollars fully absorbed by lifestyle",
      "Wondering how to keep the raise instead",
    ],
  },
  "budget-8": {
    title: "Saving For The Concert",
    narrative: "Marcus wants to buy a 240 dollar concert ticket happening in four months. He works backward and figures out he needs to set aside 60 dollars each month to make it. He decides to build his budget around that goal so his everyday spending does not eat the ticket money.",
    details: [
      "Goal is a 240 dollar concert ticket",
      "Timeline is four months away",
      "Needs to save 60 dollars per month",
      "Budget is shaped around hitting the goal",
      "Everyday spending must leave room for it",
    ],
  },
  "budget-9": {
    title: "Every Dollar Gets A Job",
    narrative: "Amara earns exactly 520 dollars this month and wants none of it to slip away unassigned. She goes line by line, giving every single dollar a purpose until income minus assignments equals zero. Even her leftover 40 dollars gets labeled for savings so nothing floats around unplanned.",
    details: [
      "Income this month is 520 dollars",
      "Each dollar assigned to a category",
      "Leftover 40 dollars labeled for savings",
      "Income minus all jobs equals zero",
      "Nothing is left unplanned or vague",
    ],
  },
  "budget-10": {
    title: "From Notebook To App",
    narrative: "Devin is tired of writing his budget in a paper notebook that he keeps losing. His older cousin shows him a free budgeting app that links to his account and sorts spending into categories automatically. Devin tries it for a month to see if the app keeps him more consistent than the notebook did.",
    details: [
      "Currently budgets in a paper notebook",
      "Testing a free budgeting app",
      "App auto-sorts spending into categories",
      "Sends alerts when a category runs low",
      "Comparing app vs notebook for one month",
    ],
  },
  "invest-2": {
    title: "The Shrinking Savings Jar",
    narrative: "Two years ago Kayla put 500 dollars in a jar to buy a used bike, and the bike cost 500 dollars back then. Today the same bike is listed for 540 dollars, but her jar still holds only 500. Her money sat still while prices crept up, so it now buys less than it used to.",
    details: [
      "Saved 500 dollars in cash two years ago",
      "Target bike cost 500 dollars then",
      "Same bike now costs 540 dollars",
      "Her cash did not grow at all",
      "Purchasing power quietly shrank over time",
    ],
  },
  "invest-7": {
    title: "All Eggs In One Sneaker",
    narrative: "Tyler puts his entire 300 dollars of savings into reselling one hyped sneaker model. When that brand suddenly falls out of style, resale prices crash and he is stuck. He realizes betting everything on a single item was risky and wishes he had spread his money across a few different things.",
    details: [
      "Put all 300 dollars into one sneaker model",
      "That single brand lost popularity fast",
      "Resale value dropped sharply",
      "No other holdings to cushion the loss",
      "Wishes he had spread money across several items",
    ],
  },
  "portfolio-3": {
    title: "Weathering A Rough Season",
    narrative: "Elena's investing club runs a mock portfolio with 1000 dollars split across five very different holdings, from a tech fund to a bond fund. During a rough month, tech drops 20 percent, but her bond and utility holdings barely move, so her whole portfolio only dips a little. She sees how mixing different types smooths out the bumps.",
    details: [
      "Mock portfolio worth 1000 dollars",
      "Spread across five different holdings",
      "Tech portion fell 20 percent in a month",
      "Bonds and utilities stayed nearly flat",
      "Overall portfolio dipped only slightly",
    ],
  },
  "macro-1": {
    title: "Reading The Yearly Price News",
    narrative: "In social studies, Ben's teacher shows a news headline saying prices across the country rose about 4 percent over the past year. Ben notices his favorite 1 dollar candy bar at the corner store is now 1 dollar and 5 cents. He starts to see how a nationwide number shows up in the small things he buys every week.",
    details: [
      "Reported national prices rose about 4 percent",
      "His 1 dollar candy bar now costs 1.05",
      "The change touches groceries, gas, and rent",
      "Wages did not rise as fast for many families",
      "Connecting a big headline to everyday prices",
    ],
  },
}
