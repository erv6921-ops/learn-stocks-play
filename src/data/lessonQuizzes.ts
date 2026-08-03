import { QuizQuestion } from "@/types"
import { incomeBankingCreditQuizzes } from "./quizzes/incomeBankingCredit"
import { stocksAndMarketsQuizzes } from "./quizzes/stocksAndMarkets"
import { portfolioFundsBondsQuizzes } from "./quizzes/portfolioFundsBonds"
import { statementsRatiosValuationQuizzes } from "./quizzes/statementsRatiosValuation"
import { behavioralMacroQuizzes } from "./quizzes/behavioralMacro"
import { advancedTopicsQuizzes } from "./quizzes/advancedTopics"
import { bankingCreditCoreQuizzes } from "./quizzes/bankingCreditCore"
import { investingStocksCoreQuizzes } from "./quizzes/investingStocksCore"
import { marketsRatiosValuationQuizzes } from "./quizzes/marketsRatiosValuation"
import { bubblesMacroIndicatorsQuizzes } from "./quizzes/bubblesMacroIndicators"
import { optionsAltsPlanningSimsQuizzes } from "./quizzes/optionsAltsPlanningSims"
import { difficultyQuizzes } from "./quizzes/difficultyPools"
import { topUpBusinessQuizzes } from "./quizzes/topUpBusiness"
import { topUpMarketingQuizzes } from "./quizzes/topUpMarketing"
import { topUp6Credit } from "./quizzes/topUp6Credit"
import { topUp6Invest } from "./quizzes/topUp6Invest"
import { topUp6Banking } from "./quizzes/topUp6Banking"
import { topUp6Ratios } from "./quizzes/topUp6Ratios"
import { topUp6ValPlan } from "./quizzes/topUp6ValPlan"
import { topUp6BubOpt } from "./quizzes/topUp6BubOpt"
import { topUp6MacroMkt } from "./quizzes/topUp6MacroMkt"
import { topUp6IndAlt } from "./quizzes/topUp6IndAlt"
import { topUp6StkSim } from "./quizzes/topUp6StkSim"
import { topUp8Income } from "./quizzes/topUp8Income"
import { topUp8Portfolio } from "./quizzes/topUp8Portfolio"
import { topUp8Etfs } from "./quizzes/topUp8Etfs"
import { topUp8BondsMkt } from "./quizzes/topUp8BondsMkt"
import { topUp8StmtComp } from "./quizzes/topUp8StmtComp"
import { topUp8BehavEntre } from "./quizzes/topUp8BehavEntre"
import { diffBatch01 } from "./quizzes/diffBatch01"
import { diffBatch02 } from "./quizzes/diffBatch02"
import { diffBatch03 } from "./quizzes/diffBatch03"
import { diffBatch04 } from "./quizzes/diffBatch04"

export interface LessonQuiz {
  lessonId: string
  questions: QuizQuestion[]
}

const baseLessonQuizzes: LessonQuiz[] = [
  // BUDGET-1: What is a Budget & Why It Matters
  {
    lessonId: "budget-1",
    questions: [
      {
        id: "b1-q1",
        question: "What is the PRIMARY purpose of creating a budget?",
        options: [
          "To plan how you'll use your money before you spend it",
          "To calculate how much money you've already spent",
          "To restrict yourself from buying anything fun",
          "To track your credit card rewards"
        ],
        correctAnswer: 0,
        explanation: "A budget is a forward-looking tool, not a punishment! For example, if you earn $500 this month, a budget helps you decide BEFORE spending that $200 goes to rent, $100 to food, and $50 to savings. Tracking past spending is helpful, but the power of budgeting is planning ahead."
      },
      {
        id: "b1-q2",
        question: "If you earn $500 per month and spend $550, what does this indicate?",
        options: [
          "Your budget is balanced and working correctly",
          "You need to earn less money to match expenses",
          "You have a budget surplus of $50",
          "You have a budget deficit of $50"
        ],
        correctAnswer: 3,
        explanation: "When you spend more than you earn ($550 > $500), you're in deficit - meaning you're $50 short. A surplus would mean you spent LESS than you earned (like spending only $400 of your $500). This $50 gap must come from somewhere - usually savings or debt, which is unsustainable."
      },
      {
        id: "b1-q3",
        question: "Which of these is an example of a 'fixed expense'?",
        options: [
          "Restaurant meals that vary weekly",
          "New clothes you buy occasionally",
          "A monthly phone bill that stays the same",
          "Movie tickets for weekend outings"
        ],
        correctAnswer: 2,
        explanation: "Fixed expenses stay the same each month - like a $50 phone bill that's always $50. Movie tickets, restaurants, and clothes vary based on your choices each month. Knowing the difference helps you predict your monthly minimum costs."
      },
      {
        id: "b1-q4",
        question: "Why is budgeting considered a 'foundational' money skill?",
        options: [
          "It helps you understand and control where your money goes",
          "Because banks require you to submit one monthly",
          "Because it's the most complicated financial skill to learn",
          "Because you can't open a savings account without one"
        ],
        correctAnswer: 0,
        explanation: "Just like a house needs a foundation before walls, your finances need budgeting before investing or saving. Without knowing where your $500 goes each month, you can't save for goals or invest wisely."
      },
      {
        id: "b1-q5",
        question: "What typically happens when someone doesn't budget their money?",
        options: [
          "Their credit score automatically goes up over time",
          "They qualify for larger loans from financial institutions",
          "They automatically save more without thinking about it",
          "They may run out of money before their next paycheck"
        ],
        correctAnswer: 3,
        explanation: "Without a spending plan, it's easy to spend $300 on fun in the first week, then realize you only have $100 left for food and gas for three weeks! This 'paycheck to paycheck' cycle traps many people."
      },
      {
        id: "b1-q6",
        question: "What is the difference between a budget and a spending tracker?",
        options: [
          "Only banks and financial institutions use spending trackers",
          "A spending tracker is always more important than a budget",
          "A budget plans future spending; a tracker records past spending",
          "They are exactly the same tool with different names"
        ],
        correctAnswer: 2,
        explanation: "A budget is proactive - you decide how to spend money BEFORE you get it. A tracker is reactive - it shows where money already went. Both are useful, but budgeting gives you control over your financial future."
      },
      {
        id: "b1-q7",
        question: "Which person is most likely to reach their savings goal?",
        options: [
          "Someone who saves 'whatever is left' at the end of each month",
          "Someone who sets aside savings as soon as they get paid",
          "Someone who only thinks about saving during holiday season",
          "Someone who waits for a year-end bonus before saving anything"
        ],
        correctAnswer: 1,
        explanation: "The 'pay yourself first' method works because you treat savings like a required bill. If you wait to save 'what's left,' there's usually nothing left! Automatic transfers on payday ensure saving happens."
      },
      {
        id: "b1-q8",
        question: "A student earns $200/month from a part-time job. What should they do FIRST?",
        options: [
          "Create a simple plan for how to use it each month",
          "Invest it all in stocks to maximize long-term growth",
          "Spend it on whatever they want before it disappears",
          "Give it all to their parents to manage for them"
        ],
        correctAnswer: 0,
        explanation: "Before spending OR investing, you need a plan. Even a simple budget like: $80 savings, $60 fun money, $60 essentials helps you be intentional. Without a plan, the $200 disappears without building toward goals."
      },
      {
        id: "b1-q9",
        question: "Why do financial experts recommend budgeting even for wealthy people?",
        options: [
          "Because the government requires it for high earners",
          "Because wealthy people naturally have more monthly bills",
          "Because budgeting helps anyone maximize their money's impact",
          "Because wealthy people need to hide money from taxes"
        ],
        correctAnswer: 2,
        explanation: "Budgeting isn't about restriction - it's about intention. Even with millions, a budget ensures money goes to what matters most: investments, charity, goals. Many wealthy people became wealthy BECAUSE they budget well."
      },
      {
        id: "b1-q10",
        question: "What's the biggest myth about budgeting?",
        options: [
          "That it requires basic math skills to create one",
          "That it helps you become more aware of spending patterns",
          "That it lets you plan your spending before the month starts",
          "That it means you can never have any fun with money"
        ],
        correctAnswer: 3,
        explanation: "Budgets INCLUDE fun money! A good budget allocates spending for entertainment, hobbies, and treats. The myth that budgets are restrictive stops people from starting. In reality, budgets give you permission to spend guilt-free on planned fun."
      }
    ]
  },

  // BUDGET-2: How to Make a Simple Budget
  {
    lessonId: "budget-2",
    questions: [
      {
        id: "b2-q1",
        question: "What is the FIRST step in creating a budget?",
        options: [
          "List all your monthly expenses in categories",
          "Calculate your total income from all sources",
          "Open a new savings account at your bank",
          "Decide how much money to save each month"
        ],
        correctAnswer: 1,
        explanation: "You must know HOW MUCH you have before deciding how to spend it! If you list expenses first without knowing income, you might plan for $800 in spending when you only earn $600."
      },
      {
        id: "b2-q2",
        question: "If your income is $1,000 and your expenses total $900, what should you do with the remaining $100?",
        options: [
          "Allocate it to specific savings or financial goals",
          "Spend it immediately since it's extra money",
          "Ignore it since it isn't part of your budget",
          "Give it to a friend who needs it more"
        ],
        correctAnswer: 0,
        explanation: "Every dollar should have a job! That 'extra' $100 is actually an opportunity - put $50 toward an emergency fund and $50 toward a goal like a new bike. If you ignore it or spend impulsively, you've wasted your budget's power."
      },
      {
        id: "b2-q3",
        question: "Which of these would be classified as 'variable expenses'?",
        options: [
          "Monthly subscription services with set prices",
          "Car insurance premiums paid every month",
          "Rent or mortgage payment amounts",
          "Groceries and entertainment spending"
        ],
        correctAnswer: 3,
        explanation: "Variable expenses change based on your choices - you might spend $50 on groceries one week and $100 the next. Rent, insurance, and subscriptions are typically fixed amounts."
      },
      {
        id: "b2-q4",
        question: "What does it mean to 'balance' your budget?",
        options: [
          "Keeping equal amounts in checking and savings accounts",
          "Spending the same exact amount every single month",
          "Making sure income equals or exceeds total expenses",
          "Having exactly zero dollars left over each pay period"
        ],
        correctAnswer: 2,
        explanation: "A balanced budget means your money coming in covers (or exceeds) money going out. If you earn $500 and plan to spend $450, that's balanced with $50 to spare."
      },
      {
        id: "b2-q5",
        question: "Which budgeting approach assigns every dollar a specific purpose?",
        options: [
          "The automatic percentage method for beginners",
          "The traditional envelope cash method",
          "The standard income-minus-expenses approach",
          "Zero-based budgeting where income minus allocations equals zero"
        ],
        correctAnswer: 3,
        explanation: "Zero-based budgeting means income minus expenses equals ZERO because every dollar is assigned a job. Example: $500 income - $200 rent - $100 food - $100 transport - $50 entertainment - $50 savings = $0 unassigned."
      },
      {
        id: "b2-q6",
        question: "Why is it important to review your budget monthly?",
        options: [
          "Life changes frequently and your budget should adapt",
          "Banks require monthly reviews for account security",
          "Monthly reviews automatically increase your credit score",
          "It's required by law in most states and countries"
        ],
        correctAnswer: 0,
        explanation: "Your needs change! Maybe you got a raise, or gas prices went up, or you started a new hobby. Monthly reviews ensure your budget reflects reality and helps you catch overspending early."
      },
      {
        id: "b2-q7",
        question: "What's the best way to handle an expense you forgot to budget for?",
        options: [
          "Borrow money from family or friends to cover it",
          "Stop budgeting entirely since it's clearly not working",
          "Add it to next month's budget and adjust other categories",
          "Ignore it completely and hope for the best next month"
        ],
        correctAnswer: 2,
        explanation: "Forgotten expenses are learning opportunities! Add them to your budget and reduce another category to compensate. Over time, you'll remember all your expenses and your budget will become more accurate."
      },
      {
        id: "b2-q8",
        question: "A simple budget should include which THREE main categories?",
        options: [
          "Income, government taxes, and remaining spending",
          "Needs, wants, and savings for future goals",
          "Rent, food, and emergency savings only",
          "Bills, entertainment, and emergency cash reserves"
        ],
        correctAnswer: 1,
        explanation: "Needs (essentials you must have), Wants (things you enjoy but could live without), and Savings (money for future you). This simple framework works for any income level."
      },
      {
        id: "b2-q9",
        question: "How detailed should a beginner's budget be?",
        options: [
          "Extremely detailed with at least 50 separate categories",
          "No categories at all, just one total spending number",
          "Only track large purchases over $100 individually",
          "Simple with 5-10 main categories that cover essentials"
        ],
        correctAnswer: 3,
        explanation: "Start simple! Too many categories overwhelm beginners. Begin with: Housing, Food, Transportation, Entertainment, Savings, and 'Everything Else.' You can add detail later as budgeting becomes a habit."
      },
      {
        id: "b2-q10",
        question: "What should you do if your expenses exceed your income?",
        options: [
          "Give up on budgeting since it isn't solving the problem",
          "Borrow money to cover the gap until income increases",
          "Cut expenses or find ways to increase your income",
          "Ignore it and hope that things will improve on their own"
        ],
        correctAnswer: 2,
        explanation: "When expenses exceed income, you have two options: spend less or earn more. Look for expenses to cut (subscriptions, dining out) or ways to earn more (side gig, selling items). Ignoring it leads to debt."
      }
    ]
  },

  // BUDGET-3: Tracking Your Spending
  {
    lessonId: "budget-3",
    questions: [
      {
        id: "b3-q1",
        question: "Why is tracking your daily spending important?",
        options: [
          "It increases your credit score with every entry logged",
          "It earns you cash back rewards on all purchases",
          "It helps identify where your money actually goes",
          "It's required by federal law for all income earners"
        ],
        correctAnswer: 2,
        explanation: "Tracking reveals the truth about your habits! You might think you spend $50/month on coffee, but tracking shows it's actually $120 ($4 × 30 days). This awareness is the first step to change."
      },
      {
        id: "b3-q2",
        question: "What is 'lifestyle creep'?",
        options: [
          "When your expenses increase as your income increases",
          "When inflation raises the prices of goods over time",
          "When you move to a more expensive neighborhood area",
          "When you buy luxury items using credit card debt"
        ],
        correctAnswer: 0,
        explanation: "Lifestyle creep is subtle! When you get a raise from $40,000 to $45,000, it's tempting to upgrade your car, apartment, and wardrobe - suddenly your extra $5,000 is gone."
      },
      {
        id: "b3-q3",
        question: "Which spending category often 'leaks' money without people noticing?",
        options: [
          "Annual insurance premiums billed once per year",
          "Utility bills that arrive with monthly statements",
          "Rent payments that are due on the first of the month",
          "Small daily purchases like coffee, snacks, and apps"
        ],
        correctAnswer: 3,
        explanation: "The 'latte factor' is real! A $5 coffee seems small, but $5 × 5 days × 4 weeks = $100/month = $1,200/year! Rent is too big to miss. Small daily purchases add up invisibly."
      },
      {
        id: "b3-q4",
        question: "How often should you ideally review your spending?",
        options: [
          "Once a year during tax season is sufficient",
          "Weekly or at least monthly for best results",
          "Only when you run out of money unexpectedly",
          "Every five years when doing financial planning"
        ],
        correctAnswer: 1,
        explanation: "Weekly check-ins catch problems early! If you review monthly and overspend in week 1, you've already lost 25% of your month. Weekly reviews let you adjust before it's too late."
      },
      {
        id: "b3-q5",
        question: "What is a 'spending trigger'?",
        options: [
          "A credit card security feature that blocks fraud",
          "A coupon that activates automatic savings at checkout",
          "An emotional or situational cue that leads to spending",
          "A bank alert that notifies you of large purchases"
        ],
        correctAnswer: 2,
        explanation: "Triggers are patterns that prompt spending. Examples: Feeling stressed → ordering pizza. Walking past a sale sign → buying clothes you don't need. Recognizing YOUR triggers helps you prepare."
      },
      {
        id: "b3-q6",
        question: "Which tool is BEST for tracking spending in real-time?",
        options: [
          "A calendar from last year with notes written on it",
          "Your memory of what you bought during the week",
          "A shoebox filled with paper receipts from purchases",
          "A budgeting app that syncs directly with your bank"
        ],
        correctAnswer: 3,
        explanation: "Apps like YNAB, Monarch, or Rocket Money automatically import and categorize transactions instantly. Memory is unreliable - we forget 50% of purchases within a day. Real-time tracking means no surprises."
      },
      {
        id: "b3-q7",
        question: "What should you do when you notice overspending in one category?",
        options: [
          "Analyze why it happened and adjust your budget or behavior",
          "Delete the tracking app so you don't have to see it",
          "Stop tracking that category to avoid feeling guilty",
          "Blame the economy and wait for prices to decrease"
        ],
        correctAnswer: 0,
        explanation: "Overspending is data, not failure! Ask: Was it a one-time event or a pattern? Do I need to budget more for this category? Can I cut back next week? Use the insight to improve."
      },
      {
        id: "b3-q8",
        question: "Why might cash spending be harder to track than card spending?",
        options: [
          "Cash is worth less than card payments in most stores",
          "Banks don't allow you to track cash transactions at all",
          "Cash transactions aren't automatically recorded anywhere",
          "Cash is only used for large purchases over $100"
        ],
        correctAnswer: 2,
        explanation: "Card purchases create automatic records in your bank account and apps. Cash disappears without a trace unless you manually record it. This is why some people overspend with cash."
      },
      {
        id: "b3-q9",
        question: "What's the benefit of categorizing your expenses?",
        options: [
          "It shows patterns and helps you know where to cut back",
          "Banks offer interest rate rewards for expense categorization",
          "It's required by the IRS for all personal tax purposes",
          "Categories make the act of spending feel more enjoyable"
        ],
        correctAnswer: 0,
        explanation: "Categories reveal patterns! Seeing 'Dining Out: $400' is more actionable than a list of 30 restaurant charges. You can immediately identify problem areas and set category-specific limits."
      },
      {
        id: "b3-q10",
        question: "How can tracking spending improve your relationship with money?",
        options: [
          "It makes you want to spend more money on new things",
          "Financial institutions like you more when you track closely",
          "It doesn't improve anything - tracking just creates stress",
          "It removes guilt by showing you're in control of your choices"
        ],
        correctAnswer: 3,
        explanation: "Knowledge is power! When you track, you spend intentionally rather than accidentally. Guilt comes from not knowing where money went. Tracking replaces anxiety with clarity and control."
      }
    ]
  },

  // BUDGET-4: The 50/30/20 Rule
  {
    lessonId: "budget-4",
    questions: [
      {
        id: "b4-q1",
        question: "In the 50/30/20 rule, what does the 50% represent?",
        options: [
          "Savings and long-term investments for retirement",
          "Wants like entertainment and dining out",
          "Needs like housing, food, and basic utilities",
          "Debt payments and interest on existing loans"
        ],
        correctAnswer: 2,
        explanation: "The 50% covers essential needs - things you MUST pay for: rent/mortgage, basic groceries, utilities, minimum debt payments, and transportation to work."
      },
      {
        id: "b4-q2",
        question: "According to the 50/30/20 rule, if you earn $2,000/month, how much should go to 'wants'?",
        options: [
          "$600 for entertainment and non-essential spending",
          "$1,000 covering half of your total monthly income",
          "$400 split between all discretionary purchases",
          "$200 for one or two small treats per month"
        ],
        correctAnswer: 0,
        explanation: "Wants = 30% of income. $2,000 × 0.30 = $600 for entertainment, dining out, hobbies, and non-essential shopping."
      },
      {
        id: "b4-q3",
        question: "Which expense would be classified as a 'want' rather than a 'need'?",
        options: [
          "Basic groceries for the week ahead",
          "Minimum monthly electricity bill payment",
          "Health insurance coverage for your family",
          "A premium streaming subscription service"
        ],
        correctAnswer: 3,
        explanation: "You can survive without Netflix, but not without food, electricity, or health coverage! Streaming is entertainment - a 'want' that enhances life but isn't essential."
      },
      {
        id: "b4-q4",
        question: "What is the main limitation of the 50/30/20 rule?",
        options: [
          "It requires too much advanced math to calculate properly",
          "It may not work for everyone's income level or location",
          "It doesn't include any savings category at all",
          "Banks and financial advisors don't accept this method"
        ],
        correctAnswer: 1,
        explanation: "In expensive cities like San Francisco or NYC, rent alone might exceed 50% of income! The rule is a starting guideline, not a law. You might need 60/20/20 based on your reality."
      },
      {
        id: "b4-q5",
        question: "The 20% in the 50/30/20 rule should be used for:",
        options: [
          "Savings, debt repayment beyond minimums, and investing",
          "Food, transportation, and daily commuting costs",
          "Entertainment, hobbies, and social activities",
          "Taxes, insurance premiums, and legal obligations"
        ],
        correctAnswer: 0,
        explanation: "This 20% builds your future! It covers: emergency fund savings, retirement contributions, extra debt payments (beyond minimums), and investment accounts."
      },
      {
        id: "b4-q6",
        question: "If someone earns $3,000/month, what's the MAXIMUM they should spend on needs according to this rule?",
        options: [
          "$900 covering only the absolute bare essentials",
          "$1,200 for housing and basic food combined",
          "$1,800 giving generous room for all essentials",
          "$1,500 for all essential expenses combined"
        ],
        correctAnswer: 3,
        explanation: "Needs = 50% maximum. $3,000 × 0.50 = $1,500 for all essential expenses. If needs cost more than this, you need to find ways to reduce them or earn more income."
      },
      {
        id: "b4-q7",
        question: "Why is the 50/30/20 rule considered a 'balanced' approach?",
        options: [
          "Because the numbers are simple and easy to remember",
          "Because banks originally created it for balanced accounts",
          "It addresses present needs, current enjoyment, AND future security",
          "Because it uses exactly 100% of your available money"
        ],
        correctAnswer: 2,
        explanation: "The genius is balance: 50% ensures you survive today, 30% lets you enjoy life now, and 20% prepares you for tomorrow. This three-way split prevents both deprivation and overspending."
      },
      {
        id: "b4-q8",
        question: "Where does a gym membership fit in the 50/30/20 rule?",
        options: [
          "Needs (50%) - because physical health is essential for everyone",
          "Wants (30%) - it's optional since you can exercise for free",
          "Savings (20%) - it's an investment in your future health",
          "It doesn't fit in any standard budgeting category"
        ],
        correctAnswer: 1,
        explanation: "A gym is a 'want' because you can stay healthy without paying for a gym - walk, run, do home workouts. Basic health CARE (doctor visits, medicine) is a need, but gym memberships are optional."
      },
      {
        id: "b4-q9",
        question: "How should you adjust the 50/30/20 rule if you have high-interest debt?",
        options: [
          "Keep the exact same percentages regardless of debt",
          "Reduce savings to zero until all debt is completely paid off",
          "Ignore the debt entirely and focus only on wants instead",
          "Increase the savings/debt portion and reduce wants temporarily"
        ],
        correctAnswer: 3,
        explanation: "With high-interest debt (like 20% credit cards), consider 50/20/30 - putting 30% toward debt payoff and savings. Or even 50/15/35. The exact numbers depend on your debt urgency."
      },
      {
        id: "b4-q10",
        question: "What's the FIRST thing to do if your needs exceed 50% of income?",
        options: [
          "Stop using the 50/30/20 rule entirely and try something else",
          "Borrow money from friends or family to cover the difference",
          "Look for ways to reduce essential costs or increase income",
          "Eliminate all 'wants' spending permanently going forward"
        ],
        correctAnswer: 2,
        explanation: "If needs exceed 50%, either reduce costs (roommate, cheaper phone plan, move to cheaper area) or increase income (side hustle, ask for raise). Don't abandon the framework - adapt it to your situation."
      }
    ]
  },

  // BUDGET-5: Setting Financial Goals
  {
    lessonId: "budget-5",
    questions: [
      {
        id: "b5-q1",
        question: "What makes a financial goal 'SMART'?",
        options: [
          "It requires approval from a licensed financial advisor",
          "It needs to be shared publicly on social media for accountability",
          "It's Specific, Measurable, Achievable, Relevant, and Time-bound",
          "It requires a lot of money and years of careful planning"
        ],
        correctAnswer: 2,
        explanation: "SMART goals have clear criteria for success. Compare: 'I want to save money' (vague) vs. 'I will save $600 for a laptop by saving $50/month for 12 months' (SMART)."
      },
      {
        id: "b5-q2",
        question: "Which is an example of a short-term financial goal?",
        options: [
          "Retiring comfortably at age 65 with full benefits",
          "Buying a house in 10 years with a large down payment",
          "Saving $500 for a new phone in 3 months",
          "Paying off a 30-year mortgage on your home"
        ],
        correctAnswer: 2,
        explanation: "Short-term goals are typically achieved within 1 year. $500 in 3 months is achievable and soon. Retirement, house buying, and mortgages are long-term goals."
      },
      {
        id: "b5-q3",
        question: "Why is it important to prioritize financial goals?",
        options: [
          "Limited resources mean you may need to focus on some goals first",
          "You can only have exactly one financial goal at any given time",
          "It makes your bank accounts earn more interest automatically",
          "The government requires ranking goals for tax purposes"
        ],
        correctAnswer: 0,
        explanation: "With $100/month for goals, you can't save for a car AND a vacation AND an emergency fund all at full speed. Prioritizing means choosing: emergency fund first, then car, then vacation."
      },
      {
        id: "b5-q4",
        question: "What should you do if you're not making progress toward a goal?",
        options: [
          "Give up entirely and choose a much easier goal instead",
          "Blame the economy for making everything too expensive",
          "Take out a personal loan to reach the goal faster",
          "Review and adjust your budget or extend the timeline"
        ],
        correctAnswer: 3,
        explanation: "Goals aren't set in stone! If you planned to save $200/month but can only manage $100, adjust: either save $100/month and double the timeline, or find $100 to cut elsewhere."
      },
      {
        id: "b5-q5",
        question: "How does writing down your financial goals help?",
        options: [
          "Banks give you better interest rates for documented goals",
          "It increases commitment and makes goals feel more concrete",
          "Written goals count as a tax deduction on your return",
          "It's legally binding like a contract with yourself"
        ],
        correctAnswer: 1,
        explanation: "Psychology research shows written goals are 42% more likely to be achieved! Writing 'I will save $1,000 for emergencies by December 15' makes it real and creates accountability."
      },
      {
        id: "b5-q6",
        question: "What's the difference between a short-term and long-term goal?",
        options: [
          "Short-term goals always cost less than $100 total",
          "Short-term is under 1 year; long-term is typically 5+ years",
          "There is no meaningful difference between them at all",
          "Long-term goals are always less important than short-term"
        ],
        correctAnswer: 1,
        explanation: "Timeframe matters for planning! Short-term (under 1 year) might be saving for a trip. Medium-term (1-5 years) could be a car down payment. Long-term (5+ years) includes retirement or a house."
      },
      {
        id: "b5-q7",
        question: "Why should you connect financial goals to personal values?",
        options: [
          "Values don't actually matter for achieving financial goals",
          "Banks require a values statement for all loan applications",
          "It's a legal requirement for opening investment accounts",
          "Goals aligned with values are more motivating and sustainable"
        ],
        correctAnswer: 3,
        explanation: "If you value family, saving for a family vacation feels meaningful. If you value security, building an emergency fund resonates deeply. Values-based goals are easier to stick with through challenges."
      },
      {
        id: "b5-q8",
        question: "What happens when you achieve a financial goal?",
        options: [
          "Stop budgeting because you've proven you're done",
          "Spend all your accumulated savings immediately as reward",
          "Celebrate the win and set a new goal to keep momentum",
          "Tell your bank so they can adjust your account settings"
        ],
        correctAnswer: 2,
        explanation: "Celebrate! You earned it. Then set a new goal to maintain momentum. Financial wellness is a journey, not a destination. Each achieved goal builds confidence for the next."
      },
      {
        id: "b5-q9",
        question: "Which is NOT a valid financial goal?",
        options: [
          "Save $2,000 for an emergency fund by June",
          "Pay off $5,000 credit card debt within 18 months",
          "Become a millionaire eventually at some undefined point",
          "Save $300/month for retirement starting immediately"
        ],
        correctAnswer: 2,
        explanation: "'Become a millionaire eventually' lacks specificity and timeline - it's a wish, not a goal. Compare to: 'Invest $500/month for 30 years to reach $1 million by age 55.' That's a SMART goal."
      },
      {
        id: "b5-q10",
        question: "How should you handle competing financial goals?",
        options: [
          "Balance contributions based on priority and urgency",
          "Pick one goal and completely ignore all others",
          "Wait until you're earning more to have multiple goals",
          "Let your bank's financial advisor decide everything"
        ],
        correctAnswer: 0,
        explanation: "You can work on multiple goals with balance. Example: $200/month total - put $100 toward high-priority emergency fund, $50 toward vacation, $50 toward new laptop. Adjust percentages as priorities shift."
      }
    ]
  },

  // BUDGET-6: Emergency Funds
  {
    lessonId: "budget-6",
    questions: [
      {
        id: "b6-q1",
        question: "How much should you ideally save in an emergency fund?",
        options: [
          "Exactly $1,000 regardless of your monthly expenses",
          "One week of expenses as a minimum safety net",
          "As much as your full annual salary before investing",
          "3-6 months of your total living expenses"
        ],
        correctAnswer: 3,
        explanation: "If you lose your job, 3-6 months of savings keeps you afloat while job hunting. One week wouldn't cover rent. $1,000 is a good START but not the goal."
      },
      {
        id: "b6-q2",
        question: "Which situation would be appropriate to use emergency funds?",
        options: [
          "An unexpected car repair needed to get to work",
          "A sale on your favorite brand of designer shoes",
          "A last-minute vacation opportunity with friends",
          "A new video game release you've been waiting for"
        ],
        correctAnswer: 0,
        explanation: "Emergencies are UNEXPECTED and NECESSARY. Car repair is both - you didn't plan for it, but you need your car for work. Sales, vacations, and games are wants, not emergencies."
      },
      {
        id: "b6-q3",
        question: "Where is the BEST place to keep your emergency fund?",
        options: [
          "In individual stocks for maximum growth potential",
          "Under your mattress at home for easy access",
          "In a high-yield savings account for safety and access",
          "In volatile cryptocurrency for high possible returns"
        ],
        correctAnswer: 2,
        explanation: "Emergency funds need safety, accessibility, and some growth. High-yield savings offers all three. Mattress cash earns 0%. Stocks and crypto can drop 50% right when you need the money."
      },
      {
        id: "b6-q4",
        question: "What is the main purpose of an emergency fund?",
        options: [
          "To pay your regular monthly bills and expenses",
          "To provide financial security during unexpected events",
          "To grow wealth quickly through high-risk investments",
          "To save specifically for your retirement years"
        ],
        correctAnswer: 1,
        explanation: "Emergency funds are your financial safety net - they prevent one bad event from becoming a crisis. Job loss, medical bills, or major repairs can happen anytime."
      },
      {
        id: "b6-q5",
        question: "Why should emergency funds be easily accessible?",
        options: [
          "So you can spend them on fun impulse purchases",
          "So friends and family can borrow from you easily",
          "To earn the highest possible interest rate available",
          "Because emergencies happen unexpectedly and need quick access"
        ],
        correctAnswer: 3,
        explanation: "If your car breaks down Monday and you need $500 for repairs to get to work Tuesday, money locked in a CD won't help. Emergencies don't wait!"
      },
      {
        id: "b6-q6",
        question: "What's a good first milestone for an emergency fund?",
        options: [
          "$1,000 or one month of basic expenses",
          "$50,000 before you start any other savings",
          "One full year of your current annual salary",
          "Whatever loose change you have in your pocket"
        ],
        correctAnswer: 0,
        explanation: "$1,000 handles many small emergencies: car repairs, appliance replacements, minor medical bills. It's achievable and builds momentum toward the full 3-6 month goal."
      },
      {
        id: "b6-q7",
        question: "What should you do AFTER using your emergency fund?",
        options: [
          "Consider it gone and don't worry about replacing it",
          "Use credit cards instead if another emergency happens",
          "Prioritize rebuilding it before other discretionary spending",
          "Emergency funds are one-time things and don't need replacing"
        ],
        correctAnswer: 2,
        explanation: "The fund worked! Now rebuild it. Pause extra contributions to other goals temporarily and refill your emergency fund. Being unprotected is risky - rebuild quickly."
      },
      {
        id: "b6-q8",
        question: "Why shouldn't you invest your emergency fund in stocks?",
        options: [
          "The market could be down exactly when you need the money",
          "Stocks never make any money for individual investors",
          "Banks don't allow you to invest emergency savings",
          "There's no reason not to - stocks are always the better choice"
        ],
        correctAnswer: 0,
        explanation: "Imagine needing $5,000 for a medical emergency when the market just dropped 30%. Your $5,000 is now worth $3,500. Emergency funds prioritize safety and access over growth."
      },
      {
        id: "b6-q9",
        question: "If your monthly expenses are $2,500, how much is a 3-month emergency fund?",
        options: [
          "$2,500 covering just one month of expenses",
          "$5,000 covering two months of expenses",
          "$10,000 covering four months of expenses",
          "$7,500 covering exactly three months of expenses"
        ],
        correctAnswer: 3,
        explanation: "3 months × $2,500/month = $7,500. This covers rent, utilities, food, and essential bills for three months if income stops. Some people aim for 6 months ($15,000 in this case)."
      },
      {
        id: "b6-q10",
        question: "Which is NOT considered a true emergency?",
        options: [
          "Unexpected job loss without any warning",
          "A major car repair needed to drive to work",
          "Back-to-school shopping that happens every year",
          "An unexpected medical bill from the emergency room"
        ],
        correctAnswer: 2,
        explanation: "Back-to-school happens every year - it's predictable! Use a sinking fund for known annual expenses. Emergencies are truly unexpected: sudden job loss, surprise medical issues, or major breakdowns."
      }
    ]
  },

  // BUDGET-7: Avoiding Budget Busters
  {
    lessonId: "budget-7",
    questions: [
      {
        id: "b7-q1",
        question: "What is a 'budget buster'?",
        options: [
          "A type of high-yield savings account for emergencies",
          "A professional financial advisor who reviews budgets",
          "An unexpected or unplanned expense that derails your budget",
          "A method for paying off high-interest credit card debt"
        ],
        correctAnswer: 2,
        explanation: "Budget busters blow holes in your financial plan. Examples: Your carefully planned $500 budget gets wrecked by an unplanned $200 concert ticket."
      },
      {
        id: "b7-q2",
        question: "Which strategy helps avoid impulse purchases?",
        options: [
          "Always shop when you're hungry for the best deals",
          "Buy items before they go on sale at full retail price",
          "Only use credit cards for all purchases to earn points",
          "Wait 24-48 hours before buying non-essential items"
        ],
        correctAnswer: 3,
        explanation: "The 24-48 hour rule breaks the impulse cycle. That 'must-have' item often looks less appealing after sleeping on it. Shopping hungry leads to MORE impulse buys."
      },
      {
        id: "b7-q3",
        question: "Why are subscription services often budget busters?",
        options: [
          "Small recurring charges add up and are easy to forget about",
          "They're always very expensive at over $100 per month",
          "Subscription services can never be cancelled once started",
          "They require annual payments made in one large lump sum"
        ],
        correctAnswer: 0,
        explanation: "Death by a thousand cuts! $10 Netflix + $12 Spotify + $15 gym + $8 cloud storage = $45/month or $540/year you might not even notice."
      },
      {
        id: "b7-q4",
        question: "What is 'FOMO spending'?",
        options: [
          "A type of investment strategy used by professional traders",
          "Spending that only happens on Fridays after getting paid",
          "A feature in popular budgeting apps for tracking impulse buys",
          "Spending based on fear of missing out on experiences or deals"
        ],
        correctAnswer: 3,
        explanation: "FOMO (Fear Of Missing Out) drives emotional purchases. 'Everyone's going to this concert!' 'This sale ends today!' These fear-based decisions bypass your budget logic."
      },
      {
        id: "b7-q5",
        question: "How can you protect your budget from seasonal expenses?",
        options: [
          "Use credit cards for all seasonal and holiday expenses",
          "Plan and save for them in advance throughout the year",
          "Ignore holidays and birthdays to save all your money",
          "Skip giving gifts entirely to avoid extra spending"
        ],
        correctAnswer: 1,
        explanation: "Holidays come every year - they're predictable! If you spend $600 on Christmas gifts, save $50/month starting in January. Spreading the cost prevents December disasters."
      },
      {
        id: "b7-q6",
        question: "Which of these is a common 'invisible' budget buster?",
        options: [
          "Your monthly rent payment due on the first",
          "Your regular car insurance premium payments",
          "An unused gym membership you forgot to cancel",
          "Your quarterly utility bill for electricity and gas"
        ],
        correctAnswer: 2,
        explanation: "Forgotten subscriptions drain money silently. That $30/month gym you haven't used in 6 months = $180 wasted. Audit all automatic payments quarterly."
      },
      {
        id: "b7-q7",
        question: "What's the best defense against 'sale' budget busters?",
        options: [
          "Buy everything on sale to maximize your total savings",
          "Only shop at full-price stores that never run promotions",
          "Never look at sale prices or promotional advertisements",
          "Ask yourself: 'Would I buy this at full price? Do I need it?'"
        ],
        correctAnswer: 3,
        explanation: "50% off something you don't need is still 100% wasted. Before any sale purchase, ask: 'Is this in my budget? Would I want this at full price?' If not, walk away."
      },
      {
        id: "b7-q8",
        question: "How does 'lifestyle inflation' bust budgets?",
        options: [
          "Your spending increases to match any income increases",
          "It causes the overall prices of goods to rise each year",
          "It only affects wealthy people with high net worth",
          "It reduces your income by increasing your tax bracket"
        ],
        correctAnswer: 0,
        explanation: "Got a $5,000 raise? Many people immediately upgrade their car, apartment, or lifestyle by $5,000 - staying broke. The wealthy avoid this by keeping expenses stable when income rises."
      },
      {
        id: "b7-q9",
        question: "What's a 'spending trigger' you should be aware of?",
        options: [
          "A sale sign displayed in a store window or online",
          "Emotional states like stress, boredom, or sadness",
          "A notification from your bank about your account balance",
          "A friend's advice about how to save more money"
        ],
        correctAnswer: 1,
        explanation: "Emotional spending is a major budget buster. Stress → comfort food orders. Sadness → retail therapy. Boredom → online shopping. Recognize your patterns and find non-spending alternatives."
      },
      {
        id: "b7-q10",
        question: "Why should you include a 'miscellaneous' category in your budget?",
        options: [
          "To hide spending from yourself and reduce guilt",
          "Because banks require this category for account statements",
          "It provides buffer room for small unexpected expenses",
          "It makes your budgeting process more complicated and detailed"
        ],
        correctAnswer: 2,
        explanation: "A small 'misc' or 'buffer' category (maybe 5% of budget) handles life's little surprises without derailing your whole plan. Forgot about a birthday gift? The buffer covers it."
      }
    ]
  },

  // BUDGET-8: Budgeting Tools & Apps
  {
    lessonId: "budget-8",
    questions: [
      {
        id: "b8-q1",
        question: "What is the main advantage of using a budgeting app?",
        options: [
          "They guarantee you'll save a specific amount each month",
          "They're always completely free to use with no hidden costs",
          "They automate tracking and provide real-time spending insights",
          "They eliminate the need to think about money at all"
        ],
        correctAnswer: 2,
        explanation: "Apps like YNAB, Monarch, or Rocket Money automatically import transactions and categorize spending, showing you've spent 80% of your dining budget by mid-month. No app guarantees savings - that's still your choice."
      },
      {
        id: "b8-q2",
        question: "What should you consider when choosing a budgeting tool?",
        options: [
          "Whether it syncs with your bank accounts and fits your needs",
          "Only choose the most expensive premium option available",
          "Always use whatever tool your friends are currently using",
          "Pick the one with the prettiest visual design and interface"
        ],
        correctAnswer: 0,
        explanation: "The best tool is one you'll actually USE. Consider: Does it sync with your bank? Does it handle your specific needs? Is it secure? Price doesn't equal quality."
      },
      {
        id: "b8-q3",
        question: "What is the 'envelope method' of budgeting?",
        options: [
          "Saving all your receipts in envelopes for tax season",
          "Sending money to family members in labeled envelopes",
          "Mailing your monthly bills in pre-addressed envelopes",
          "Allocating cash to specific spending categories in envelopes"
        ],
        correctAnswer: 3,
        explanation: "Traditional envelope method: Withdraw $500 cash, put $200 in 'Groceries' envelope, $100 in 'Gas,' etc. When the envelope is empty, you stop spending in that category."
      },
      {
        id: "b8-q4",
        question: "Why might someone prefer a spreadsheet over a budgeting app?",
        options: [
          "Spreadsheets are always more accurate than any app",
          "They offer more customization and don't require sharing bank data",
          "Banks require customers to use spreadsheets for tracking",
          "Spreadsheets automatically import and track all spending"
        ],
        correctAnswer: 1,
        explanation: "Spreadsheets offer total control - you design categories, formulas, and layouts exactly how you want. Privacy-conscious users prefer not linking bank accounts to apps."
      },
      {
        id: "b8-q5",
        question: "What feature should you look for in a budgeting tool for security?",
        options: [
          "Colorful charts, graphs, and attractive visual reports",
          "Social sharing features to post your budget publicly",
          "Free premium features included at no additional cost",
          "Bank-level encryption and two-factor authentication"
        ],
        correctAnswer: 3,
        explanation: "You're giving budget apps access to your financial data! Look for: 256-bit encryption, two-factor authentication, and clear privacy policies."
      },
      {
        id: "b8-q6",
        question: "What's a disadvantage of manual expense tracking?",
        options: [
          "It requires discipline and time to record every purchase",
          "It's always too accurate and gives too much detail",
          "It always costs money to track expenses manually",
          "Banks don't allow customers to track expenses manually"
        ],
        correctAnswer: 0,
        explanation: "Manual tracking works but requires effort. You must remember to record every purchase - miss a few and your budget becomes inaccurate. Apps automate this but require bank linking."
      },
      {
        id: "b8-q7",
        question: "Which budgeting method is best for visual learners?",
        options: [
          "Mental math done entirely in your head each day",
          "Text-only spreadsheets with rows and columns of numbers",
          "The envelope method or apps with colorful charts and graphs",
          "Reading printed bank statements mailed to your home"
        ],
        correctAnswer: 2,
        explanation: "Visual learners benefit from seeing money physically (envelopes) or graphically (pie charts, progress bars). Many apps offer visual dashboards that make budget status instantly clear."
      },
      {
        id: "b8-q8",
        question: "What's the benefit of budgeting apps that sync with your bank?",
        options: [
          "The bank pays you a bonus for using approved apps",
          "They always cost money but provide premium service",
          "They're required by law for anyone with a bank account",
          "Transactions appear automatically without manual entry"
        ],
        correctAnswer: 3,
        explanation: "Automatic syncing means every purchase appears in your budget instantly. No forgotten transactions, no manual data entry. It's the 'set it and forget it' approach to tracking."
      },
      {
        id: "b8-q9",
        question: "Why might you use multiple budgeting tools?",
        options: [
          "It's more expensive, which means your budget works better",
          "Different tools serve different purposes - tracking, planning, investing",
          "Banks require customers to use at least two different tools",
          "Using multiple tools is meant to confuse potential hackers"
        ],
        correctAnswer: 1,
        explanation: "You might use Rocket Money for tracking, YNAB for active budgeting, and a spreadsheet for long-term planning. Each tool has strengths. Use what works for each need."
      },
      {
        id: "b8-q10",
        question: "What's the most important factor in choosing a budgeting method?",
        options: [
          "What's most popular among financial influencers online",
          "What's the most expensive option with premium features",
          "What your bank specifically recommends you should use",
          "What you'll actually stick with consistently over time"
        ],
        correctAnswer: 3,
        explanation: "The best budgeting system is one you USE. A complex app you abandon is worse than a simple notebook you check daily. Choose based on your habits, tech comfort, and lifestyle."
      }
    ]
  },

  // BUDGET-9: Budgeting for Variable Income
  {
    lessonId: "budget-9",
    questions: [
      {
        id: "b9-q1",
        question: "What is 'variable income'?",
        options: [
          "Income that changes based on your current mood",
          "Income that automatically adjusts for annual inflation",
          "Income that fluctuates from pay period to pay period",
          "Income from working multiple part-time jobs simultaneously"
        ],
        correctAnswer: 2,
        explanation: "Variable income changes month to month - freelancers might earn $2,000 one month and $500 the next. Servers depend on tips that vary. Commission salespeople have unpredictable paychecks."
      },
      {
        id: "b9-q2",
        question: "Which budgeting strategy works best for variable income?",
        options: [
          "Budgeting based on your lowest expected income month",
          "Spending everything during high-income months as celebration",
          "Only budgeting during high-income earning periods",
          "Ignoring months with low income until they pass"
        ],
        correctAnswer: 0,
        explanation: "Budget for the worst, hope for the best! If your income ranges from $800-$2,000, budget essentials around $800. When you earn more, save the difference for lean months."
      },
      {
        id: "b9-q3",
        question: "What is an 'income buffer' or 'income smoothing account'?",
        options: [
          "A government assistance program for low-income workers",
          "A special type of high-risk investment account",
          "A credit card designated only for emergency expenses",
          "Savings used to supplement income during low-earning months"
        ],
        correctAnswer: 3,
        explanation: "A buffer smooths the income rollercoaster. Deposit ALL income into this account, then pay yourself a steady 'salary' each month. High months fill the buffer; low months draw from it."
      },
      {
        id: "b9-q4",
        question: "Why is prioritizing expenses more important with variable income?",
        options: [
          "It impresses your employer and leads to bigger bonuses",
          "You may not always have enough for everything, so essentials come first",
          "It qualifies you for special tax deductions on your return",
          "Banks require expense prioritization for all loan applications"
        ],
        correctAnswer: 1,
        explanation: "During a $600 month when your needs cost $800, you must know what to pay first! Priority: Shelter → Food → Utilities → Transport → Minimum debts → Everything else."
      },
      {
        id: "b9-q5",
        question: "How should you handle 'windfall' months with higher-than-expected income?",
        options: [
          "Spend it all as a reward for your hard work this month",
          "Immediately increase your lifestyle and monthly expenses",
          "Save the extra to buffer future low-income months",
          "Lend it all to friends and family who need it"
        ],
        correctAnswer: 2,
        explanation: "Windfalls are opportunities, not party invitations! That extra $1,500 should first fill your income buffer for upcoming lean months. Save 80-90% of windfalls."
      },
      {
        id: "b9-q6",
        question: "What percentage of income should variable earners try to save from high months?",
        options: [
          "0% - spend it while you have it before it's gone",
          "10% like regular earners with steady paychecks",
          "100% - save every single dollar from high months",
          "30-50% or more to build a meaningful income buffer"
        ],
        correctAnswer: 3,
        explanation: "Variable earners need BIGGER savings percentages during good months. If you earn $3,000 one month and $800 the next, saving 50% of the high month ($1,500) helps cover the low month."
      },
      {
        id: "b9-q7",
        question: "Why is an emergency fund EXTRA important for variable income earners?",
        options: [
          "Low-income periods can feel like emergencies even when expected",
          "Variable earners pay significantly more in income taxes",
          "Banks require larger emergency funds for freelance workers",
          "It's actually less important for them than salaried workers"
        ],
        correctAnswer: 0,
        explanation: "When you're used to $2,000 months, a $500 month feels like a crisis. A robust emergency fund (6+ months) provides security during inevitable income dips. It's a stress-reducer."
      },
      {
        id: "b9-q8",
        question: "How should variable income earners handle monthly bills?",
        options: [
          "Put all bills on credit cards and pay them off later",
          "Pay them only during high-income months and skip low months",
          "Cancel all monthly bills to eliminate recurring expenses",
          "Keep essential bills low enough to cover during minimum income months"
        ],
        correctAnswer: 3,
        explanation: "Your fixed expenses (rent, utilities, subscriptions) should be affordable even in your WORST month. If your minimum month is $1,000, keep fixed costs under $600-700 to leave room for food and transport."
      },
      {
        id: "b9-q9",
        question: "What's a 'baseline budget' for variable income?",
        options: [
          "The maximum amount you can spend in any given month",
          "The minimum budget covering only essential survival needs",
          "A budget set automatically by your bank or credit union",
          "The budget you use only at sporting events and concerts"
        ],
        correctAnswer: 1,
        explanation: "Your baseline is the absolute minimum to survive: rent, basic food, utilities, transport to work, minimum debt payments. During low months, this is all you spend. During high months, you add extras."
      },
      {
        id: "b9-q10",
        question: "How does the 50/30/20 rule change for variable income?",
        options: [
          "It works exactly the same as for fixed-income earners",
          "Variable earners shouldn't use any percentage-based budgets",
          "Use percentages of your LOWEST expected income, not average",
          "Double all the percentages to compensate for income swings"
        ],
        correctAnswer: 2,
        explanation: "If income varies from $1,000-$3,000, apply 50/30/20 to the $1,000 base. That means $500 needs, $300 wants, $200 savings as your baseline. In high months, put extra toward savings, not wants."
      }
    ]
  },

  // BUDGET-10: Building Wealth Through Budgeting
  {
    lessonId: "budget-10",
    questions: [
      {
        id: "b10-q1",
        question: "How does consistent budgeting lead to wealth building?",
        options: [
          "It doesn't - only direct investing builds any real wealth",
          "It increases your salary automatically over time",
          "It frees up money for saving and investing consistently",
          "It reduces your overall taxes automatically each year"
        ],
        correctAnswer: 2,
        explanation: "Budgeting is the foundation that enables investing! You can't invest money you've already spent. By budgeting, you find $200/month to invest, which grows over decades."
      },
      {
        id: "b10-q2",
        question: "What is 'paying yourself first'?",
        options: [
          "Taking cash out of the register before paying any bills",
          "Giving yourself a monthly bonus on top of your salary",
          "Only spending on things that bring you personal enjoyment",
          "Prioritizing savings before spending on other expenses"
        ],
        correctAnswer: 3,
        explanation: "When you get paid, FIRST move money to savings/investments before spending on anything else. Most people save 'what's left' (usually nothing). Paying yourself first reverses this."
      },
      {
        id: "b10-q3",
        question: "Why is compound interest called 'the eighth wonder of the world'?",
        options: [
          "Because your earnings generate their own earnings over time",
          "Because it's very confusing and hard to understand",
          "Because only banks and institutions can benefit from it",
          "Because it was discovered recently by modern economists"
        ],
        correctAnswer: 0,
        explanation: "Year 1: $100 earns $10 interest. Year 2: $110 earns $11. Year 3: $121 earns $12.10. Each year the growth accelerates. Over 30 years, $100/month at 10% becomes over $200,000!"
      },
      {
        id: "b10-q4",
        question: "What is a 'savings rate' and why does it matter?",
        options: [
          "The interest rate your bank pays on savings deposits",
          "The percentage of income you save before spending",
          "A government-set rate that determines tax deductions",
          "The rate at which your savings account loses value"
        ],
        correctAnswer: 1,
        explanation: "Your savings rate determines when you'll reach financial independence more than income does! Someone earning $50,000 saving 50% will retire before someone earning $100,000 saving 10%."
      },
      {
        id: "b10-q5",
        question: "What is the relationship between budgeting and investing?",
        options: [
          "They are completely unrelated financial skills",
          "Investing eliminates the need for any budgeting at all",
          "Only rich people need to do both simultaneously",
          "Budgeting creates the surplus that can be invested"
        ],
        correctAnswer: 3,
        explanation: "Budgeting is the HOW (how to free up money), investing is the WHERE (where to grow it). Without budgeting, there's nothing to invest. They're partners in wealth building."
      },
      {
        id: "b10-q6",
        question: "How much can small budget improvements compound over time?",
        options: [
          "Saving $50/month invested over 30 years can exceed $100,000",
          "They don't matter - only big lifestyle changes help wealth",
          "Small amounts never grow into anything significant over time",
          "Compound growth only works for people who are already millionaires"
        ],
        correctAnswer: 0,
        explanation: "$50/month at 10% annual return for 30 years = over $100,000! That's from finding just $50 in your budget - skipping a few takeout meals. Small consistent actions create massive results."
      },
      {
        id: "b10-q7",
        question: "What's the 'millionaire next door' concept?",
        options: [
          "Millionaires all live in expensive luxury neighborhoods",
          "You should borrow money from your wealthy neighbors",
          "Many millionaires live modestly because they budget and save aggressively",
          "Expensive neighborhoods automatically create millionaire residents"
        ],
        correctAnswer: 2,
        explanation: "Research shows most millionaires drive used cars, live in modest homes, and budget carefully. They became wealthy by spending less than they earned for decades, not by flashy consumption."
      },
      {
        id: "b10-q8",
        question: "Why is 'savings rate' more important than income for building wealth?",
        options: [
          "It's not - income is everything when it comes to wealth",
          "You can only invest what you save, regardless of how much you earn",
          "Banks prefer savers to high earners for loan approvals",
          "Savings rate doesn't actually matter at all for building wealth"
        ],
        correctAnswer: 1,
        explanation: "A doctor earning $300,000 but spending $290,000 saves $10,000/year. A teacher earning $50,000 spending $30,000 saves $20,000/year. The teacher builds wealth faster despite lower income."
      },
      {
        id: "b10-q9",
        question: "What happens when you increase your savings rate by just 1%?",
        options: [
          "Nothing noticeable happens from such a small change",
          "1% is too small to even calculate or measure accurately",
          "It only matters for rich people with very large incomes",
          "It compounds significantly over a career - potentially years off retirement"
        ],
        correctAnswer: 3,
        explanation: "1% more of $50,000 income = $500/year. Over 30 years at 10% growth, that's $90,000+ extra for retirement! Each 1% increase can mean retiring months or years earlier."
      },
      {
        id: "b10-q10",
        question: "How does budgeting connect to your 'future self'?",
        options: [
          "Every dollar saved today is a gift to your future self",
          "It doesn't connect - budgets are only about today's spending",
          "Future self should figure things out on their own later",
          "Budgeting only affects your present spending habits"
        ],
        correctAnswer: 0,
        explanation: "Present-you and future-you are the same person! Saving $100 today gives 65-year-old-you the gift of security and choices. Budgeting is how you protect and provide for your future self."
      }
    ]
  },

  // ECON-1: Supply & Demand
  {
    lessonId: "stocks-7",   // Supply & Demand (remapped from stale econ-1)
    questions: [
      {
        id: "e1-q1",
        question: "When demand for a product increases but supply stays the same, what typically happens to the price?",
        options: [
          "The price stays exactly the same as before",
          "The product becomes available for free",
          "The price increases due to more competition among buyers",
          "The price decreases to attract even more buyers"
        ],
        correctAnswer: 2,
        explanation: "More buyers chasing the same number of products creates competition - sellers can charge more because people will pay more! Example: When PS5 launched, demand exceeded supply, causing prices to spike."
      },
      {
        id: "e1-q2",
        question: "What is 'equilibrium price'?",
        options: [
          "The price where quantity supplied equals quantity demanded",
          "The lowest possible price a seller can charge for profit",
          "The highest price any consumer would be willing to pay",
          "The cost to produce a product including all raw materials"
        ],
        correctAnswer: 0,
        explanation: "Equilibrium is the 'just right' price where sellers offer exactly what buyers want. At $10, sellers offer 100 units and buyers want 100 units - perfect match!"
      },
      {
        id: "e1-q3",
        question: "Why do concert tickets for popular artists often sell at high prices?",
        options: [
          "Concert venues are extremely expensive to rent for events",
          "All concerts have the same standardized ticket pricing",
          "Artists are greedy and want to maximize their personal income",
          "High demand with limited supply drives prices up naturally"
        ],
        correctAnswer: 3,
        explanation: "Taylor Swift: 10 million fans want tickets, venue holds 50,000. High demand + limited supply = $500+ tickets and instant sell-outs."
      },
      {
        id: "e1-q4",
        question: "What happens to supply when production costs increase?",
        options: [
          "Supply stays the same regardless of production costs",
          "Supply decreases because it's less profitable to produce",
          "Costs don't actually affect supply in any meaningful way",
          "Supply increases because producers want more total profit"
        ],
        correctAnswer: 1,
        explanation: "Higher costs mean less profit per item. Some producers stop making the product, reducing supply. If gas prices rise, fewer people can afford to drive delivery trucks, reducing supply of delivered goods."
      },
      {
        id: "e1-q5",
        question: "What creates a 'shortage' in a market?",
        options: [
          "When supply exceeds demand at the current market price",
          "When there are too many products available for sale",
          "When demand exceeds supply at the current market price",
          "When prices are set too high for most consumers"
        ],
        correctAnswer: 2,
        explanation: "Shortage = more buyers than products available. If concert tickets are priced at $50 and 100,000 people want them but only 10,000 exist, there's a shortage of 90,000 tickets."
      },
      {
        id: "e1-q6",
        question: "What creates a 'surplus' in a market?",
        options: [
          "When supply exceeds demand at the current market price",
          "When there aren't enough products available for buyers",
          "When high demand drives up prices for consumers",
          "When prices are set too low for sellers to profit"
        ],
        correctAnswer: 0,
        explanation: "Surplus = more products than buyers. If a store stocks 1,000 sweaters at $100 each but only 200 people want to buy at that price, there's an 800-sweater surplus. Sales often clear surpluses."
      },
      {
        id: "e1-q7",
        question: "How do 'substitute goods' affect demand?",
        options: [
          "Substitutes always have exactly the same market price",
          "They have absolutely no effect on each other's demand",
          "Substitutes decrease overall market demand for everything",
          "If one substitute's price rises, demand for the other increases"
        ],
        correctAnswer: 3,
        explanation: "Butter and margarine are substitutes. If butter prices spike, people switch to margarine, increasing margarine demand. Understanding substitutes helps predict market shifts."
      },
      {
        id: "e1-q8",
        question: "What is 'price elasticity'?",
        options: [
          "The highest price a product can reach before sales stop",
          "How quickly prices rise during periods of high inflation",
          "How much demand changes when the price changes",
          "How stretchy or flexible a physical product material is"
        ],
        correctAnswer: 2,
        explanation: "Elastic demand means small price changes cause big demand changes (luxury goods). Inelastic means price barely affects demand (medicine, gas). Knowing elasticity predicts how markets respond to price changes."
      },
      {
        id: "e1-q9",
        question: "Why does increased competition typically lower prices?",
        options: [
          "More sellers compete for buyers, forcing prices down",
          "Competitors feel generous and agree to lower margins",
          "Competition is actually illegal in most markets",
          "Prices never actually decrease due to competition"
        ],
        correctAnswer: 0,
        explanation: "If one store sells a product for $100, a competitor might offer $90 to win customers. Then the first drops to $85. This competition benefits consumers through lower prices."
      },
      {
        id: "e1-q10",
        question: "How does technology typically affect supply?",
        options: [
          "Technology decreases supply by making production complex",
          "Technology only affects demand, never supply",
          "Technology has no measurable effect on supply levels",
          "Technology increases supply by making production cheaper and faster"
        ],
        correctAnswer: 3,
        explanation: "Better technology = cheaper, faster production = more supply. Factories that once made 100 items per day can now make 1,000. This increased supply often leads to lower prices."
      }
    ]
  },

  // ECON-2: Needs, Wants & Opportunity Cost
  {
    lessonId: "invest-6",   // Opportunity Cost (remapped from stale econ-2)
    questions: [
      {
        id: "e2-q1",
        question: "What is 'opportunity cost'?",
        options: [
          "The price tag of an opportunity when it first appears",
          "A fee that banks charge for opening new accounts",
          "What you give up when you choose one option over another",
          "The cost of starting a new business from scratch"
        ],
        correctAnswer: 2,
        explanation: "Every choice has a hidden cost - the next best alternative you didn't choose! If you spend Saturday working ($100) instead of at the beach, your opportunity cost is the beach day."
      },
      {
        id: "e2-q2",
        question: "If you spend $20 on a movie ticket instead of saving it, what is the opportunity cost?",
        options: [
          "Exactly $20 and nothing more than that",
          "The movie experience itself that you attended",
          "Nothing, since you enjoyed the movie you purchased",
          "The $20 plus what it could have earned in savings over time"
        ],
        correctAnswer: 3,
        explanation: "Opportunity cost includes future potential! That $20 in savings at 5% interest becomes $20.50 after one year. So the TRUE opportunity cost is $20 + all future growth you won't receive."
      },
      {
        id: "e2-q3",
        question: "Which of these is a 'need' rather than a 'want'?",
        options: [
          "Basic nutritious food for daily survival",
          "The latest smartphone model with premium features",
          "Designer clothing from luxury fashion brands",
          "A vacation trip to a tropical destination"
        ],
        correctAnswer: 0,
        explanation: "Needs are essential for survival and basic functioning: food, shelter, basic clothing, healthcare. The LATEST smartphone is a want - a basic phone for emergencies might be a need."
      },
      {
        id: "e2-q4",
        question: "Why is understanding opportunity cost important for financial decisions?",
        options: [
          "Banks require you to calculate it for all transactions",
          "It helps you see the true cost of choices, not just the price tag",
          "Opportunity cost doesn't actually affect personal finances",
          "It's required for accurate annual tax filing purposes"
        ],
        correctAnswer: 1,
        explanation: "The $5,000 vacation isn't just $5,000 - it's also what that money could have become if invested. Understanding this helps you make more informed, intentional choices."
      },
      {
        id: "e2-q5",
        question: "A student can either work 10 hours ($150) or study. If they study, what is the opportunity cost?",
        options: [
          "Nothing, since studying is completely free of any cost",
          "The cost of textbooks and school supplies they purchased",
          "$150 in wages they gave up by choosing to study instead",
          "Their final grade on the upcoming exam or paper"
        ],
        correctAnswer: 2,
        explanation: "The opportunity cost of studying is the $150 they could have earned working. Of course, studying might lead to higher future earnings - that's the trade-off to consider."
      },
      {
        id: "e2-q6",
        question: "Can something be both a need AND a want?",
        options: [
          "No, needs and wants are completely separate categories",
          "Everything is technically a need when you think about it",
          "Everything is technically a want and nothing is a true need",
          "Yes - food is a need, but a gourmet restaurant meal is a want"
        ],
        correctAnswer: 3,
        explanation: "Basic food is a need; a $50 sushi dinner is a want. Basic transportation is a need; a luxury car is a want. The LINE between them depends on what's truly essential."
      },
      {
        id: "e2-q7",
        question: "What's the opportunity cost of keeping $10,000 in a 0% checking account?",
        options: [
          "The interest or returns it could earn elsewhere",
          "Nothing at all - the money is safe and that's sufficient",
          "Exactly $10,000 since that's the amount being held",
          "The bank's monthly account maintenance fees only"
        ],
        correctAnswer: 0,
        explanation: "Money sitting at 0% could be earning 4-5% in high-yield savings ($400-500/year) or 10%+ in investments. The opportunity cost is that lost growth potential."
      },
      {
        id: "e2-q8",
        question: "Why can 'needs' vary from person to person?",
        options: [
          "Needs are exactly the same for every person everywhere",
          "Needs are determined solely by a person's income level",
          "Context matters - a car might be a need in rural areas but not in NYC",
          "Needs never vary across different people or circumstances"
        ],
        correctAnswer: 2,
        explanation: "Context determines needs. In rural Texas with no public transit, a car is a need for work. In Manhattan with subways, a car is a want. Location, job, and circumstances all factor in."
      },
      {
        id: "e2-q9",
        question: "How does opportunity cost apply to time, not just money?",
        options: [
          "Time doesn't have any opportunity cost whatsoever",
          "Only money has opportunity cost - time is unlimited",
          "Time is unlimited, so no opportunity cost exists for it",
          "Every hour spent on one activity is an hour not spent on alternatives"
        ],
        correctAnswer: 3,
        explanation: "Time is your most limited resource! An hour scrolling social media is an hour not spent exercising, learning, or with family. Time has opportunity costs too."
      },
      {
        id: "e2-q10",
        question: "What's the opportunity cost of NOT going to college?",
        options: [
          "Nothing - college is expensive and has no guaranteed payoff",
          "The higher lifetime earnings and career opportunities you might miss",
          "Only the cost of textbooks and school supply materials",
          "There is absolutely no opportunity cost to skipping college"
        ],
        correctAnswer: 1,
        explanation: "Skipping college saves tuition but may cost hundreds of thousands in lifetime earnings and career advancement. However, college also has opportunity costs (time, money). Weigh both sides."
      }
    ]
  },

  // BALANCE-1: Understanding a Balance Sheet
  {
    lessonId: "fin-stmt-7", // Balance Sheet (remapped from stale balance-1)
    questions: [
      {
        id: "bal1-q1",
        question: "What does a balance sheet show?",
        options: [
          "Your monthly income and expenses in detail",
          "Your credit score and credit history report",
          "How much you spent during the previous year",
          "Your assets, liabilities, and net worth at a specific point in time"
        ],
        correctAnswer: 3,
        explanation: "A balance sheet is a financial snapshot - like a photo of your wealth on one specific day. Assets (what you own) minus Liabilities (what you owe) equals Net Worth."
      },
      {
        id: "bal1-q2",
        question: "If your assets total $10,000 and your liabilities are $3,000, what is your net worth?",
        options: [
          "$13,000 combining both assets and liabilities together",
          "$7,000 after subtracting what you owe from what you own",
          "$3,000 counting only what you currently owe",
          "$10,000 counting only your total asset value"
        ],
        correctAnswer: 1,
        explanation: "Net Worth = Assets - Liabilities. So $10,000 - $3,000 = $7,000. Think of it as: if you sold everything and paid off all debts, you'd have $7,000 left."
      },
      {
        id: "bal1-q3",
        question: "Which of these is considered a 'liability'?",
        options: [
          "Your personal savings account with cash deposits",
          "Your car that you own outright with no loan",
          "Your student loan balance that must be repaid",
          "Your investment portfolio of stocks and bonds"
        ],
        correctAnswer: 2,
        explanation: "Liabilities are what you OWE others. Student loans must be repaid - that's a liability. Savings, cars you own fully, and investments are ASSETS."
      },
      {
        id: "bal1-q4",
        question: "What counts as an 'asset' on a personal balance sheet?",
        options: [
          "Anything of value you own: cash, investments, property, valuables",
          "Only cash sitting in your bank checking account",
          "Only things worth over $10,000 in market value",
          "Only things that produce monthly income or dividends"
        ],
        correctAnswer: 0,
        explanation: "Assets include: bank accounts, retirement funds, your car, house equity, valuable collections, electronics, and anything else you could sell for money."
      },
      {
        id: "bal1-q5",
        question: "Can your net worth be negative?",
        options: [
          "No, net worth is always a positive number",
          "Yes, if your liabilities exceed your total assets",
          "Only during a recession or economic downturn",
          "Only if you have zero income for an extended period"
        ],
        correctAnswer: 1,
        explanation: "If you owe $50,000 in student loans but only have $10,000 in assets, your net worth is -$40,000. Many new graduates start with negative net worth - it's common and fixable."
      },
      {
        id: "bal1-q6",
        question: "Why should you review your balance sheet regularly?",
        options: [
          "Banks require monthly reviews for account security compliance",
          "To track whether your wealth is growing or shrinking over time",
          "It's only needed once a year for tax filing purposes",
          "Balance sheets never change so reviewing is unnecessary"
        ],
        correctAnswer: 1,
        explanation: "Quarterly or annual balance sheet reviews show if you're building wealth or falling behind. Net worth increasing = good. Net worth decreasing = time to adjust."
      },
      {
        id: "bal1-q7",
        question: "What's the difference between a balance sheet and a budget?",
        options: [
          "They're the same thing with different names",
          "Only businesses use balance sheets, individuals cannot",
          "A budget shows monthly flow; a balance sheet shows total wealth at one point",
          "Only individuals use budgets, businesses cannot"
        ],
        correctAnswer: 2,
        explanation: "Budget = river (money flowing in and out monthly). Balance sheet = lake (total accumulation at one moment). Both are important but measure different things."
      },
      {
        id: "bal1-q8",
        question: "How does paying off debt affect your balance sheet?",
        options: [
          "It decreases your total assets only without changing liabilities",
          "It immediately increases your net worth by the amount you paid",
          "It actually decreases your net worth by reducing cash",
          "It reduces cash and debt equally, so net worth stays the same"
        ],
        correctAnswer: 3,
        explanation: "Paying $1,000 off a loan decreases both cash (asset) by $1,000 AND debt (liability) by $1,000. Net worth stays the same at that moment! But you stop paying interest, which helps your net worth grow over time."
      },
      {
        id: "bal1-q9",
        question: "What type of asset typically appreciates (increases in value) over time?",
        options: [
          "A brand new car driven off the dealer lot",
          "Clothing and fashion accessories purchased at retail",
          "Real estate and diversified stock investments",
          "Consumer electronics like phones and laptops"
        ],
        correctAnswer: 2,
        explanation: "Appreciating assets grow in value - real estate, stocks, certain collectibles. Depreciating assets lose value - cars, electronics, clothes. Build wealth with appreciating assets."
      },
      {
        id: "bal1-q10",
        question: "Why is 'equity' important in understanding your balance sheet?",
        options: [
          "Equity is the portion of an asset you actually own after subtracting debt",
          "Equity doesn't matter for individual personal finance at all",
          "Equity is exactly the same thing as your total income",
          "Only businesses and corporations have equity on their books"
        ],
        correctAnswer: 0,
        explanation: "If your $200,000 house has a $150,000 mortgage, your equity is $50,000 - that's YOUR portion. As you pay down the mortgage, equity grows. This is your true ownership stake."
      }
    ]
  },

  // STOCKS-1: What is a Stock?
  {
    lessonId: "stocks-1",
    questions: [
      {
        id: "s1-q1",
        question: "When you buy a stock, you are buying:",
        options: [
          "A loan to the company that earns you interest",
          "A promise of future employment at that company",
          "A small ownership share in the company itself",
          "The company's products at a discounted price"
        ],
        correctAnswer: 2,
        explanation: "Stocks represent ownership! Buying Apple stock makes you a part-owner of Apple. A LOAN to a company is a bond (different investment). Stock ownership gives you a claim on profits."
      },
      {
        id: "s1-q2",
        question: "What is a 'shareholder'?",
        options: [
          "Someone who owns stock in a particular company",
          "An employee who works at a publicly traded company",
          "A company's customer who buys their products",
          "A licensed financial advisor at a brokerage firm"
        ],
        correctAnswer: 0,
        explanation: "Shareholders SHARE in ownership - they hold shares (stock). Shareholders can be employees, customers, or neither. They have voting rights and may receive dividends."
      },
      {
        id: "s1-q3",
        question: "Where are most stocks bought and sold?",
        options: [
          "At the company's headquarters by appointment only",
          "At local bank branches during business hours",
          "Through newspaper advertisements and classified listings",
          "On a stock exchange like NYSE or NASDAQ electronically"
        ],
        correctAnswer: 3,
        explanation: "Stock exchanges (NYSE, NASDAQ, etc.) are organized marketplaces connecting buyers and sellers electronically. You use a brokerage that connects to exchanges."
      },
      {
        id: "s1-q4",
        question: "What does 'market capitalization' (market cap) tell you?",
        options: [
          "How old the company is since its founding date",
          "The total value of all a company's shares combined",
          "The CEO's annual salary and bonus compensation",
          "How many employees the company currently has"
        ],
        correctAnswer: 1,
        explanation: "Market cap = Share price × Number of shares. A company with 1 billion shares at $100 each has a $100 billion market cap. It measures company size by market value."
      },
      {
        id: "s1-q5",
        question: "What is a 'stock ticker symbol'?",
        options: [
          "The company's registered phone number for investors",
          "The stock exchange's physical mailing address",
          "A short code identifying a stock, like AAPL for Apple",
          "The CEO's initials used on official company documents"
        ],
        correctAnswer: 2,
        explanation: "Ticker symbols are abbreviations: AAPL (Apple), GOOGL (Google), AMZN (Amazon). They make trading faster and easier than typing full company names."
      },
      {
        id: "s1-q6",
        question: "Who can buy stocks?",
        options: [
          "Anyone with a brokerage account, even with small amounts",
          "Only wealthy people with at least $100,000 to invest",
          "Only professional investors with financial licenses",
          "Only citizens over the age of 30 with a steady income"
        ],
        correctAnswer: 0,
        explanation: "Many brokerages have no minimums and offer fractional shares - you can buy $5 of Amazon! Investing is accessible to almost everyone with modern apps."
      },
      {
        id: "s1-q7",
        question: "What's the difference between stocks and bonds?",
        options: [
          "They're the same thing with different names",
          "Bonds give ownership; stocks are loans to companies",
          "Only banks and institutions can own bonds",
          "Stocks are ownership; bonds are loans to companies or governments"
        ],
        correctAnswer: 3,
        explanation: "Stocks = ownership stake with profit potential but more risk. Bonds = lending money to a company/government for fixed interest payments, lower risk. Different roles in a portfolio."
      },
      {
        id: "s1-q8",
        question: "Why do stock prices change?",
        options: [
          "The company CEO sets the price each trading day",
          "Banks decide all stock prices during market hours",
          "Supply and demand from buyers and sellers in the market",
          "Prices only change once per year during annual reports"
        ],
        correctAnswer: 2,
        explanation: "Stock prices change every second based on buyers and sellers. More buyers than sellers = price rises. More sellers than buyers = price falls. It's pure supply and demand."
      },
      {
        id: "s1-q9",
        question: "What is an 'IPO'?",
        options: [
          "Initial Public Offering - when a company first sells stock to the public",
          "A type of recurring stock dividend payment to shareholders",
          "A government regulation that restricts stock trading",
          "A stock trading strategy used by professional day traders"
        ],
        correctAnswer: 0,
        explanation: "IPO is when a private company 'goes public' - selling shares for the first time. It's how companies like Facebook and Uber became available for regular investors to buy."
      },
      {
        id: "s1-q10",
        question: "What rights do common shareholders typically have?",
        options: [
          "No rights at all beyond holding the stock certificate",
          "The right to work for the company in any open position",
          "Free products and services from the company they own",
          "Voting rights on major company decisions and dividend eligibility"
        ],
        correctAnswer: 3,
        explanation: "Common shareholders can vote for board members and major decisions. They may receive dividends (if declared). They don't get free products or guaranteed jobs."
      }
    ]
  },

  // STOCKS-2: How Stocks Make Money
  {
    lessonId: "stocks-2",
    questions: [
      {
        id: "s2-q1",
        question: "What are the two main ways stocks can make money for investors?",
        options: [
          "Interest payments and annual bank fees",
          "Bonuses from the company and employee salaries",
          "Price appreciation and dividend payments",
          "Tax rebates from the government and insurance payouts"
        ],
        correctAnswer: 2,
        explanation: "Price appreciation: Buy at $50, sell at $100 = $50 profit. Dividends: Company pays you a portion of its profits regularly. Both can build wealth."
      },
      {
        id: "s2-q2",
        question: "Why would a private company decide to 'go public' with an IPO?",
        options: [
          "To raise large amounts of money by selling shares to the public",
          "To avoid ever having to report its financial results",
          "To become owned and operated by the government",
          "To guarantee its stock price will only go up"
        ],
        correctAnswer: 0,
        explanation: "An IPO (initial public offering) lets a company raise capital from many investors at once. The trade-off is more regulation and public disclosure - the opposite of staying private. Going public has nothing to do with government ownership or guaranteed gains."
      },
      {
        id: "s2-q3",
        question: "If you buy a stock at $50 and sell it at $75, your capital gain is:",
        options: [
          "$75 representing the full sale price received",
          "$50 representing the original purchase price paid",
          "$125 combining both the purchase and sale prices",
          "$25 representing the difference between sale and purchase"
        ],
        correctAnswer: 3,
        explanation: "Capital gain = Selling price - Purchase price. $75 - $50 = $25 profit. If you sold at $30, you'd have a $20 capital LOSS."
      },
      {
        id: "s2-q4",
        question: "What is 'dividend yield'?",
        options: [
          "The total dividend amount paid in a single quarter",
          "The annual dividend divided by stock price, expressed as a percentage",
          "How fast dividends grow from year to year",
          "A type of capital gains tax on dividend income"
        ],
        correctAnswer: 1,
        explanation: "If a $100 stock pays $4/year in dividends, yield = $4/$100 = 4%. Yield helps compare dividend stocks regardless of share price. Higher yield = more income per dollar invested."
      },
      {
        id: "s2-q5",
        question: "Not all stocks pay dividends. Why might a company skip dividends?",
        options: [
          "It's illegal for certain types of companies to pay dividends",
          "They reinvest profits into growth instead of paying shareholders",
          "Dividends are only available for very old established companies",
          "The government takes all dividends through mandatory taxation"
        ],
        correctAnswer: 1,
        explanation: "Growth companies like Amazon and Tesla reinvest profits to expand rather than pay dividends. Investors hope this growth increases the stock price more than dividends would provide."
      },
      {
        id: "s2-q6",
        question: "What is 'total return'?",
        options: [
          "Only the price appreciation of a stock over time",
          "Only the dividend income received from a stock",
          "The stock's original purchase price paid by the investor",
          "Price appreciation PLUS dividend income combined together"
        ],
        correctAnswer: 3,
        explanation: "Total return = capital gains + dividends. A stock that rises 5% and pays 3% dividend = 8% total return. Look at total return to compare investments accurately."
      },
      {
        id: "s2-q7",
        question: "What is a 'growth stock'?",
        options: [
          "A company expected to grow faster than average, often reinvesting rather than paying dividends",
          "A stock that physically grows larger in certificate size",
          "Any stock that has gone up in price at any point",
          "A stock specifically in the agriculture or farming industry"
        ],
        correctAnswer: 0,
        explanation: "Growth stocks (like tech companies) focus on expansion over dividends. Investors buy hoping rapid growth increases stock price significantly. More volatility but higher potential."
      },
      {
        id: "s2-q8",
        question: "What is a 'value stock'?",
        options: [
          "Any stock worth less than $10 per share in the market",
          "A stock that never changes in price from day to day",
          "A stock priced low relative to the company's fundamentals",
          "The most expensive stock available on any stock exchange"
        ],
        correctAnswer: 2,
        explanation: "Value stocks appear underpriced based on earnings, assets, or dividends. Investors believe the market is undervaluing the company and price will eventually correct upward."
      },
      {
        id: "s2-q9",
        question: "Why is 'compound growth' powerful for stock investors?",
        options: [
          "It only works with bonds and fixed-income investments",
          "It's a government subsidy that boosts investment returns",
          "Compound growth doesn't actually apply to stock investments",
          "Returns on returns accelerate growth over time, especially with reinvested dividends"
        ],
        correctAnswer: 3,
        explanation: "Reinvesting dividends buys more shares, which pay more dividends, buying more shares... Over 30 years, this snowball effect can multiply your wealth many times over."
      },
      {
        id: "s2-q10",
        question: "Can you lose money in stocks?",
        options: [
          "No, stocks are guaranteed to make money for all investors",
          "Yes, stock prices can fall, and companies can fail completely",
          "Only if you sell too early before the guaranteed recovery",
          "Losses are always covered by government insurance programs"
        ],
        correctAnswer: 1,
        explanation: "Stocks can lose value - even go to zero if a company fails. This risk is why stocks offer higher potential returns than savings accounts. Diversification reduces single-stock risk."
      }
    ]
  },

  // STOCKS-3: Risk & Long-Term Investing
  {
    lessonId: "stocks-3",
    questions: [
      {
        id: "s3-q1",
        question: "Why is 'time in the market' generally better than 'timing the market'?",
        options: [
          "Because stock prices always go up without exception",
          "Because the market is closed most of the time anyway",
          "Because trading fees are too high for frequent trading",
          "Because it's nearly impossible to consistently predict short-term movements"
        ],
        correctAnswer: 3,
        explanation: "Even experts fail to time the market consistently! Missing just the 10 best trading days over 20 years can cut returns in half. Staying invested captures overall growth."
      },
      {
        id: "s3-q2",
        question: "What is 'diversification' in investing?",
        options: [
          "Buying only one stock you truly believe in strongly",
          "Spreading investments across different assets to reduce risk",
          "Selling all stocks immediately when prices start to drop",
          "Investing only in foreign companies and international markets"
        ],
        correctAnswer: 1,
        explanation: "Don't put all eggs in one basket! If you invest $10,000 only in one company and it fails, you lose everything. Spread across many companies via index funds for safety."
      },
      {
        id: "s3-q3",
        question: "Historically, what happens to stock market returns over long periods (20+ years)?",
        options: [
          "They always lose money for investors who hold that long",
          "They tend to show positive growth despite short-term volatility",
          "They stay exactly the same with zero net gains or losses",
          "They become increasingly more risky as time goes on"
        ],
        correctAnswer: 1,
        explanation: "The S&P 500 has NEVER had a negative 20-year return period in history! Despite crashes, patient investors who held through recovered and profited."
      },
      {
        id: "s3-q4",
        question: "What is 'volatility' in stock markets?",
        options: [
          "The degree of variation in stock prices over a given time period",
          "A tendency for stocks to perform poorly in certain seasons",
          "A type of stock exchange that handles international trades",
          "A government regulation that limits stock price movements"
        ],
        correctAnswer: 0,
        explanation: "Volatility measures price swings. High volatility = prices move dramatically up and down. Low volatility = prices are relatively stable. Volatility isn't the same as risk of permanent loss."
      },
      {
        id: "s3-q5",
        question: "Why do young investors typically have higher 'risk tolerance'?",
        options: [
          "Young people are more reckless with their money overall",
          "They have more money than older investors to work with",
          "They have decades to recover from short-term market losses",
          "Risk tolerance doesn't actually change with age at all"
        ],
        correctAnswer: 2,
        explanation: "A 25-year-old has 40 years before retirement - plenty of time to ride out market crashes. A 60-year-old might need money soon, so preservation matters more than growth."
      },
      {
        id: "s3-q6",
        question: "What is an 'index fund'?",
        options: [
          "A fund that picks only the best-performing stocks each year",
          "A fund only available to wealthy accredited investors",
          "A fund managed by a single expert stock picker",
          "A fund that tracks a market index, holding all stocks in that index"
        ],
        correctAnswer: 3,
        explanation: "An S&P 500 index fund holds all 500 companies in that index. Instant diversification! Low fees because no stock-picking required. The choice of most long-term investors."
      },
      {
        id: "s3-q7",
        question: "What should you do when the stock market drops significantly?",
        options: [
          "Sell everything immediately to prevent further losses",
          "Stay calm and stick to your long-term plan, possibly buying more",
          "Stop investing forever and keep all money in cash",
          "Move everything into cryptocurrency for better returns"
        ],
        correctAnswer: 1,
        explanation: "Drops are often buying opportunities! Selling during a crash locks in losses. Those who stayed invested (or bought more) during 2008 and 2020 crashes saw strong recoveries."
      },
      {
        id: "s3-q8",
        question: "What is 'dollar-cost averaging'?",
        options: [
          "Only buying stocks when prices are at their lowest point",
          "Converting US dollars to other currencies for arbitrage",
          "Investing the same dollar amount regularly, regardless of price",
          "A type of dividend reinvestment tax strategy"
        ],
        correctAnswer: 2,
        explanation: "Invest $500 every month no matter the price. When prices are high, you buy fewer shares; when low, more shares. This smooths out volatility and removes timing guesswork."
      },
      {
        id: "s3-q9",
        question: "What's the average annual return of the US stock market historically?",
        options: [
          "About 2-3% annually before adjusting for inflation",
          "About 30% annually making everyone wealthy very quickly",
          "0% - markets don't grow at all over the long term",
          "About 10% annually before adjusting for inflation"
        ],
        correctAnswer: 3,
        explanation: "The S&P 500 has averaged about 10% annual returns over nearly 100 years. Some years are much higher, some negative, but the long-term average is around 10%."
      },
      {
        id: "s3-q10",
        question: "Why should you avoid checking your portfolio daily during retirement investing?",
        options: [
          "Short-term noise can trigger emotional decisions that hurt long-term results",
          "It's illegal to check your portfolio more than once per month",
          "Portfolio values only update on a weekly basis anyway",
          "Checking your portfolio costs a fee each time you log in"
        ],
        correctAnswer: 0,
        explanation: "Daily fluctuations cause anxiety and tempt you to sell at bad times. If your goal is 30 years away, daily prices don't matter. Check quarterly or less for peace of mind."
      }
    ]
  },

  // DEBT-1: What is Debt?
  {
    lessonId: "credit-17",  // How to Apply for a Loan (remapped from stale debt-1)
    questions: [
      {
        id: "d1-q1",
        question: "What is 'interest' on a loan?",
        options: [
          "A refund from the bank for being a loyal customer",
          "The original amount you borrowed from the lender",
          "The cost you pay for borrowing someone else's money",
          "A type of savings account with guaranteed returns"
        ],
        correctAnswer: 2,
        explanation: "Interest is the 'rental fee' for using someone else's money. Borrow $1,000 at 10% interest = pay $100 extra as the cost of borrowing."
      },
      {
        id: "d1-q2",
        question: "What does 'APR' stand for?",
        options: [
          "Annual Payment Return showing yearly earnings",
          "Average Price Rate across all competing lenders",
          "Approved Purchase Request from your bank",
          "Annual Percentage Rate showing yearly borrowing cost"
        ],
        correctAnswer: 3,
        explanation: "APR = Annual Percentage Rate, showing the yearly cost of borrowing. A 24% APR credit card means 24% of your balance in interest over a year."
      },
      {
        id: "d1-q3",
        question: "If you borrow $1,000 at 10% annual interest, how much interest do you owe after one year?",
        options: [
          "$100 calculated as 10% of the principal amount",
          "$10 representing 1% of the borrowed amount",
          "$1,000 doubling the original borrowed principal",
          "$1,100 representing principal plus accumulated interest"
        ],
        correctAnswer: 0,
        explanation: "Interest = Principal × Rate. $1,000 × 10% = $100 in interest. You'd owe $1,100 total ($1,000 principal + $100 interest)."
      },
      {
        id: "d1-q4",
        question: "What is 'principal' in a loan?",
        options: [
          "The total interest you owe on your loan balance",
          "The original amount you borrowed before interest is added",
          "Your school's leader who manages the institution",
          "The monthly minimum payment required by the lender"
        ],
        correctAnswer: 1,
        explanation: "Principal is the base amount you borrowed, before interest. If you borrowed $5,000, that's your principal. Interest is ADDED to principal to calculate total owed."
      },
      {
        id: "d1-q5",
        question: "What is 'collateral' in a secured loan?",
        options: [
          "Extra interest payments made above the minimum due",
          "Your credit score that determines loan eligibility",
          "An asset the lender can take if you don't repay the loan",
          "A discount on your loan for paying on time each month"
        ],
        correctAnswer: 2,
        explanation: "Collateral is security for the lender. Car loans use the car as collateral - if you don't pay, they repossess the car. Mortgages use the house. This reduces lender risk."
      },
      {
        id: "d1-q6",
        question: "Why do secured loans typically have lower interest rates than unsecured loans?",
        options: [
          "The government subsidizes all secured loan interest rates",
          "Secured loans are always for smaller dollar amounts",
          "There's actually no difference between secured and unsecured rates",
          "The collateral reduces lender risk, so they charge less interest"
        ],
        correctAnswer: 3,
        explanation: "With collateral, the lender can recover value if you default. Less risk = lower rate. Credit cards (unsecured) are 20%+. Car loans (secured) are 5-10%. Risk drives pricing."
      },
      {
        id: "d1-q7",
        question: "What is a 'minimum payment' on a credit card?",
        options: [
          "The full balance due on your credit card statement",
          "The amount you should ideally pay each billing cycle",
          "A fee for having an active credit card account",
          "The smallest amount you must pay to avoid penalties, usually 1-3% of balance"
        ],
        correctAnswer: 3,
        explanation: "Minimum payments keep you from penalties but barely reduce your debt. On $5,000 at 20%, minimum payments could take 30+ years to pay off. Always pay more than minimum!"
      },
      {
        id: "d1-q8",
        question: "What is 'compound interest' on debt?",
        options: [
          "Interest charged on both principal AND accumulated interest",
          "Interest that decreases automatically over the life of a loan",
          "A flat fee charged once at the beginning of a loan",
          "Interest that only applies to loans over $10,000 in value"
        ],
        correctAnswer: 0,
        explanation: "Compound interest makes debt grow faster. You owe $1,000 at 20%. After month one: $1,016.67. Now you pay interest on $1,016.67, not $1,000. Debt snowballs against you."
      },
      {
        id: "d1-q9",
        question: "What's the difference between a fixed and variable interest rate?",
        options: [
          "Variable rates are always higher than fixed rates",
          "Fixed rates only apply to car loans specifically",
          "Fixed never changes; variable can increase or decrease over time",
          "There's no meaningful difference between the two types"
        ],
        correctAnswer: 2,
        explanation: "Fixed rate = predictable payments forever. Variable rate might start lower but can rise with market changes. Variable is riskier - your payments could increase unexpectedly."
      },
      {
        id: "d1-q10",
        question: "Why is understanding debt terms important before borrowing?",
        options: [
          "Lenders require you to pass a written test first",
          "It helps you compare options and avoid costly mistakes",
          "Terms are always the same everywhere so it doesn't matter",
          "Understanding terms doesn't actually affect the loan at all"
        ],
        correctAnswer: 1,
        explanation: "A 5% difference in APR on a $20,000 car loan = thousands of dollars difference in total cost. Understanding terms helps you negotiate, compare, and choose wisely."
      }
    ]
  },

  // DEBT-2: Good Debt vs Bad Debt
  {
    lessonId: "credit-1",   // What Is Credit (remapped from stale debt-2)
    questions: [
      {
        id: "d2-q1",
        question: "Which is typically considered 'good debt'?",
        options: [
          "Credit card debt for luxury items and designer brands",
          "A payday loan to fund a vacation or trip",
          "Borrowing to buy the latest electronic gadgets",
          "A student loan for education that increases earning potential"
        ],
        correctAnswer: 3,
        explanation: "Good debt is an INVESTMENT that creates future value exceeding the cost. Education can increase lifetime earnings by hundreds of thousands, far outweighing loan costs."
      },
      {
        id: "d2-q2",
        question: "What makes debt 'bad'?",
        options: [
          "When it's used for depreciating assets or carries high interest rates",
          "All debt is automatically bad regardless of the purpose",
          "When the bank approves your application for the loan",
          "When you can comfortably afford the monthly payments"
        ],
        correctAnswer: 0,
        explanation: "Bad debt has high interest AND/OR finances depreciating assets. A 25% credit card for a TV that loses value = bad debt. The TV becomes worthless; the debt remains."
      },
      {
        id: "d2-q3",
        question: "Why might a mortgage be considered 'good debt'?",
        options: [
          "Because mortgages are always cheap with low interest rates",
          "Because banks always approve mortgage applications quickly",
          "Because real estate often appreciates in value and you build equity",
          "Because you never actually have to pay the mortgage back"
        ],
        correctAnswer: 2,
        explanation: "Mortgages use leverage to build wealth. If your $200,000 house appreciates to $300,000, you've gained $100,000 on your investment while building equity with each payment."
      },
      {
        id: "d2-q4",
        question: "What's the key question to ask before taking on debt?",
        options: [
          "Can I afford the absolute minimum monthly payment only?",
          "Do my friends and peers have this same type of debt?",
          "Is the bank or lender willing to approve my application?",
          "Will this debt help me create more value than it costs?"
        ],
        correctAnswer: 3,
        explanation: "Good debt creates value exceeding its cost. Will this degree increase my income more than the loan cost? Will this house build equity? If yes, it might be good debt."
      },
      {
        id: "d2-q5",
        question: "Why are payday loans almost always 'bad debt'?",
        options: [
          "They charge extremely high APRs (often 400%+) for small amounts",
          "They're illegal in every state and country worldwide",
          "They require valuable property as collateral for approval",
          "They improve your credit score too quickly to be sustainable"
        ],
        correctAnswer: 0,
        explanation: "A $200 payday loan might cost $50 in fees for two weeks. That's 650%+ APR! These trap people in debt cycles. Almost any alternative is better."
      },
      {
        id: "d2-q6",
        question: "Can 'good debt' become 'bad debt'?",
        options: [
          "No, good debt stays good forever once categorized",
          "Debt categories never change under any circumstances",
          "Only during major economic recessions or downturns",
          "Yes, if the investment doesn't pay off or you borrow too much"
        ],
        correctAnswer: 3,
        explanation: "A $200,000 student loan for a degree with $40,000 salary potential? That good debt might become bad. Good debt requires the investment to actually pay off."
      },
      {
        id: "d2-q7",
        question: "What type of debt should you typically pay off first?",
        options: [
          "The largest balance regardless of the interest rate",
          "The most recently acquired debt in your portfolio",
          "High-interest debt like credit cards that grow fastest",
          "Secured debt like car loans and mortgages first"
        ],
        correctAnswer: 2,
        explanation: "High-interest debt grows fastest! Pay $10,000 on a 25% credit card before a 5% car loan. The credit card costs you $2,500/year in interest; the car loan costs $500."
      },
      {
        id: "d2-q8",
        question: "Is borrowing to start a business 'good debt'?",
        options: [
          "Always yes - business loans are inherently good debt",
          "It depends on the business plan and likelihood of success",
          "Always no - business debt is never a wise decision",
          "Only for restaurant businesses specifically"
        ],
        correctAnswer: 1,
        explanation: "Business debt is risky. A solid business plan with high success likelihood? Potentially good debt. A hobby with no market research? Probably bad debt. Context matters."
      },
      {
        id: "d2-q9",
        question: "What makes a car loan potentially 'bad debt'?",
        options: [
          "All car loans are automatically classified as bad debt",
          "Car loans always have the highest interest rates available",
          "Banks don't like approving car loans for consumers",
          "Cars lose value (depreciate) while you still owe money on them"
        ],
        correctAnswer: 3,
        explanation: "A new car loses 20% value immediately. You could owe $25,000 on a car worth $20,000 - you're 'underwater.' Cars are necessary, but minimizing car debt is wise."
      },
      {
        id: "d2-q10",
        question: "What's the relationship between debt and net worth?",
        options: [
          "Debt doesn't affect net worth in any way",
          "Debt (liability) decreases net worth; assets minus liabilities = net worth",
          "Debt actually increases your net worth over time",
          "Net worth only counts assets and ignores all liabilities"
        ],
        correctAnswer: 1,
        explanation: "Net worth = Assets - Liabilities. $50,000 in assets with $30,000 debt = $20,000 net worth. Paying down debt cuts your liabilities and the interest they cost you - combined with saving, that's how net worth grows over time."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // UNIT 26: BUSINESS MANAGEMENT & STRATEGY
  // ═══════════════════════════════════════════════

  {
    lessonId: "mgmt-1",
    questions: [
      {
        id: "mgmt1-q1",
        question: "Which management function involves monitoring performance and making corrections?",
        options: [
          "Planning - setting objectives and creating roadmaps",
          "Organizing - arranging people and allocating resources",
          "Leading - inspiring and motivating team members",
          "Controlling - tracking results and adjusting course"
        ],
        correctAnswer: 3,
        explanation: "Controlling is about comparing actual performance to goals and taking corrective action when there's a gap. It closes the management cycle by feeding information back into planning."
      },
      {
        id: "mgmt1-q2",
        question: "A manager creates a weekly schedule assigning tasks to each team member. Which function is this?",
        options: [
          "Planning - deciding what goals to pursue this quarter",
          "Organizing - structuring roles and allocating work",
          "Leading - motivating team members to exceed targets",
          "Controlling - reviewing last week's performance data"
        ],
        correctAnswer: 1,
        explanation: "Assigning tasks and creating schedules is organizing - it's about structuring who does what and when so resources are used efficiently."
      },
      {
        id: "mgmt1-q3",
        question: "Why are the four management functions described as a cycle rather than a checklist?",
        options: [
          "Because managers should only perform one function per quarter",
          "Because controlling provides feedback that informs the next round of planning",
          "Because leading always comes before organizing in every situation",
          "Because the cycle must be completed exactly once per fiscal year"
        ],
        correctAnswer: 1,
        explanation: "The functions form a continuous loop: Plan → Organize → Lead → Control → learn from results → Plan again. Each round of controlling reveals what to adjust in the next planning phase."
      },
      {
        id: "mgmt1-q4",
        question: "A team leader gives a motivational speech before a product launch. Which function is she performing?",
        options: [
          "Planning - she's setting goals for the product launch",
          "Organizing - she's assigning launch day responsibilities",
          "Leading - she's inspiring and energizing her team",
          "Controlling - she's evaluating the team's readiness"
        ],
        correctAnswer: 2,
        explanation: "Motivating and inspiring the team is the leading function. It's about human connection, communication, and driving people toward a shared goal."
      },
      {
        id: "mgmt1-q5",
        question: "What happens when a manager skips the planning function entirely?",
        options: [
          "The team becomes more creative because they have total freedom",
          "Organizing, leading, and controlling have no clear direction to follow",
          "The controlling function automatically compensates for the missing plan",
          "Employees prefer working without plans because it reduces their stress"
        ],
        correctAnswer: 1,
        explanation: "Without planning, there are no goals to organize around, no vision to lead toward, and no benchmarks to control against. Planning provides the foundation for all other functions."
      }
    ]
  },
  {
    lessonId: "mgmt-2",
    questions: [
      {
        id: "mgmt2-q1",
        question: "Which leadership style involves the leader making all decisions without team input?",
        options: [
          "Democratic - decisions are made through team voting",
          "Laissez-faire - the team operates with minimal direction",
          "Autocratic - the leader decides unilaterally for the group",
          "Collaborative - decisions are shared equally among all members"
        ],
        correctAnswer: 2,
        explanation: "Autocratic leaders centralize decision-making. This can be effective in urgent situations but can harm morale and creativity when used as the default."
      },
      {
        id: "mgmt2-q2",
        question: "A research lab director lets her PhD scientists choose their own projects. Which style is this?",
        options: [
          "Autocratic - the director is controlling through indirect means",
          "Democratic - the team votes on which projects to prioritize",
          "Laissez-faire - highly skilled team members self-direct their work",
          "Transactional - scientists receive bonuses for completing projects"
        ],
        correctAnswer: 2,
        explanation: "Giving highly skilled professionals autonomy to choose their own work is laissez-faire leadership. It works because PhD scientists are self-motivated experts who thrive with independence."
      },
      {
        id: "mgmt2-q3",
        question: "What is the PRIMARY disadvantage of democratic leadership?",
        options: [
          "Team members feel excluded from the decision-making process",
          "It takes more time because gathering and weighing input is slower",
          "It produces lower quality decisions than autocratic leadership",
          "Democratic leaders cannot hold team members accountable for results"
        ],
        correctAnswer: 1,
        explanation: "Democratic leadership produces better buy-in but requires more time for discussion and consensus-building. In fast-moving situations, this slower pace can be a competitive disadvantage."
      },
      {
        id: "mgmt2-q4",
        question: "A fire chief directs rescue operations with clear, immediate commands. Why is this leadership style appropriate?",
        options: [
          "Fire chiefs are required by law to use autocratic leadership",
          "Emergency situations demand speed and clarity over group discussion",
          "Firefighters prefer being told exactly what to do in every situation",
          "Democratic decision-making has been proven ineffective in all emergencies"
        ],
        correctAnswer: 1,
        explanation: "In emergencies, lives depend on swift action. Autocratic leadership provides the clear, immediate direction needed when there's no time for debate or consensus."
      },
      {
        id: "mgmt2-q5",
        question: "A leader uses different styles depending on the situation. What is this approach called?",
        options: [
          "Inconsistent leadership - changing approaches confuses teams",
          "Situational leadership - adapting style to match the circumstance",
          "Passive leadership - avoiding commitment to any single approach",
          "Micromanagement - controlling every aspect of the team's work"
        ],
        correctAnswer: 1,
        explanation: "Situational or adaptive leadership means matching your approach to the needs of the moment. Research shows this flexibility produces better outcomes than rigidly sticking to one style."
      }
    ]
  },
  {
    lessonId: "mgmt-3",
    questions: [
      {
        id: "mgmt3-q1",
        question: "What is the main advantage of a flat organizational structure?",
        options: [
          "Clear promotion paths and well-defined career ladders for all employees",
          "Faster communication and decision-making with fewer approval layers",
          "Standardized processes that ensure consistency across all locations",
          "Easy scalability from small teams to thousands of employees quickly"
        ],
        correctAnswer: 1,
        explanation: "Flat structures minimize layers between employees and leadership, enabling faster communication and quicker decisions. The trade-off is less structure and potentially unclear roles at scale."
      },
      {
        id: "mgmt3-q2",
        question: "A manager oversees 25 direct reports. This describes a _______ span of control.",
        options: [
          "Narrow - because most managers have fewer direct reports",
          "Wide - the manager oversees many people with less individual oversight",
          "Hierarchical - this is the standard for all organizational structures",
          "Flat - all organizations with 25 employees have this span of control"
        ],
        correctAnswer: 1,
        explanation: "A wide span of control means one manager oversees many direct reports. This is common in flat organizations but means less time for individual attention."
      },
      {
        id: "mgmt3-q3",
        question: "Why do large restaurant chains typically use hierarchical structures?",
        options: [
          "Hierarchy is legally required for companies with more than 100 employees",
          "Consistency across hundreds of locations requires standardized processes and clear authority",
          "Flat structures are more expensive to operate for food service companies",
          "Employees in the restaurant industry prefer having many layers of management"
        ],
        correctAnswer: 1,
        explanation: "Chains like McDonald's need every location to deliver the same experience. Hierarchical structures enforce standards, training protocols, and quality control across thousands of sites."
      },
      {
        id: "mgmt3-q4",
        question: "What problem arises when a growing company maintains a flat structure too long?",
        options: [
          "Employee salaries automatically increase as the company grows larger",
          "Decision-making becomes unclear and responsibilities start to overlap",
          "The company loses its ability to hire new employees or contractors",
          "Government regulators force the company to restructure immediately"
        ],
        correctAnswer: 1,
        explanation: "As headcount grows, flat structures create ambiguity about authority, role boundaries, and accountability. What works for 10 people often breaks down at 50 or 100."
      },
      {
        id: "mgmt3-q5",
        question: "What is an org chart primarily used to show?",
        options: [
          "How much each employee earns compared to their department peers",
          "The reporting relationships and hierarchy within an organization",
          "Which employees are scheduled to receive promotions next quarter",
          "The company's revenue broken down by department and cost center"
        ],
        correctAnswer: 1,
        explanation: "An org chart visually maps reporting relationships - who reports to whom, how departments are structured, and where authority flows. It's a snapshot of organizational structure."
      }
    ]
  },
  {
    lessonId: "mgmt-4",
    questions: [
      {
        id: "mgmt4-q1",
        question: "Which SWOT category would 'a trending social media platform your business can leverage' fall into?",
        options: [
          "Strength - it's something your business already possesses internally",
          "Weakness - it highlights a gap in your current marketing strategy",
          "Opportunity - it's an external condition you can capitalize on for growth",
          "Threat - social media trends are unpredictable and therefore risky"
        ],
        correctAnswer: 2,
        explanation: "A trending platform is an external factor that creates potential for growth - that's an opportunity. It's not something you control internally (strength/weakness) and it's positive, not a risk."
      },
      {
        id: "mgmt4-q2",
        question: "A business has strong brand loyalty but outdated technology. How should these be classified in SWOT?",
        options: [
          "Both are strengths because the company is established and operational",
          "Brand loyalty is a strength; outdated technology is a weakness",
          "Brand loyalty is an opportunity; outdated technology is a threat",
          "Both are weaknesses because the company needs to modernize everything"
        ],
        correctAnswer: 1,
        explanation: "Brand loyalty is an internal advantage (strength). Outdated technology is an internal limitation (weakness). Both are within the company's control to maintain or change."
      },
      {
        id: "mgmt4-q3",
        question: "What makes SWOT analysis more useful than simply listing pros and cons?",
        options: [
          "SWOT uses four categories instead of two, which is always more thorough",
          "It separates internal factors from external factors, enabling targeted strategy",
          "Pros and cons lists are outdated and no longer taught in business schools",
          "SWOT analysis is required by law before launching any new business venture"
        ],
        correctAnswer: 1,
        explanation: "By separating internal (strengths/weaknesses) from external (opportunities/threats), SWOT helps you distinguish between what you can control and what you must adapt to."
      },
      {
        id: "mgmt4-q4",
        question: "A small bakery's only supplier of organic flour raises prices by 30%. In the bakery's SWOT, this is:",
        options: [
          "A weakness - the bakery should have negotiated a better contract earlier",
          "A strength - organic ingredients justify charging customers higher prices",
          "An opportunity - the bakery can switch to conventional flour and save money",
          "A threat - an external supplier decision that increases costs and squeezes margins"
        ],
        correctAnswer: 3,
        explanation: "Supplier price increases are external factors outside the bakery's control - that's a threat. It puts pressure on margins and requires a strategic response."
      },
      {
        id: "mgmt4-q5",
        question: "How should a business respond to a SWOT analysis that reveals many threats and few strengths?",
        options: [
          "Ignore the analysis because SWOT is only useful for successful companies",
          "Invest in building internal strengths while developing strategies to mitigate threats",
          "Immediately close the business since the analysis shows it cannot succeed",
          "Focus exclusively on threats and stop trying to develop any new strengths"
        ],
        correctAnswer: 1,
        explanation: "SWOT reveals the current situation - it doesn't determine destiny. A business with many threats and few strengths should prioritize building capabilities while developing contingency plans."
      }
    ]
  },
  {
    lessonId: "mgmt-5",
    questions: [
      {
        id: "mgmt5-q1",
        question: "In Porter's Five Forces, what does 'buyer power' refer to?",
        options: [
          "The ability of a company to buy competitors and expand market share",
          "The ability of customers to influence prices and demand better terms",
          "The financial power of investors to fund new business ventures",
          "The ability of suppliers to set minimum order quantities for buyers"
        ],
        correctAnswer: 1,
        explanation: "Buyer power is the leverage customers have to negotiate lower prices, better quality, or additional services. High buyer power pressures companies to compete harder."
      },
      {
        id: "mgmt5-q2",
        question: "Why is the threat of new entrants important to consider for existing businesses?",
        options: [
          "New entrants always have better products than established companies",
          "The possibility of new competitors keeps existing companies from overpricing",
          "New entrants are only relevant in technology industries, not traditional ones",
          "Government agencies track new entrants and penalize existing companies"
        ],
        correctAnswer: 1,
        explanation: "Even the threat of new competitors entering an industry disciplines existing players - they can't become complacent on price, quality, or innovation."
      },
      {
        id: "mgmt5-q3",
        question: "Which industry likely has the WEAKEST competitive rivalry?",
        options: [
          "Fast food - hundreds of chains compete for the same customers daily",
          "Smartphone manufacturing - dozens of brands compete on features and price",
          "Local water utility - typically a single provider with a geographic monopoly",
          "E-commerce - thousands of online retailers sell similar products worldwide"
        ],
        correctAnswer: 2,
        explanation: "Utility companies often operate as regulated monopolies - there's only one water provider in a given area. With no direct competition, rivalry is essentially nonexistent."
      },
      {
        id: "mgmt5-q4",
        question: "How do strong supplier relationships affect a company's competitive position?",
        options: [
          "Strong supplier relationships have no impact on competitive advantage",
          "They reduce supplier power, potentially lowering costs and improving reliability",
          "They always increase costs because loyal suppliers charge premium prices",
          "They only matter for manufacturing companies, not service businesses"
        ],
        correctAnswer: 1,
        explanation: "Good supplier relationships can reduce supplier power through loyalty and partnership. This can lead to better prices, priority during shortages, and more reliable supply - all competitive advantages."
      },
      {
        id: "mgmt5-q5",
        question: "What happens in an industry where ALL five forces are strong?",
        options: [
          "Companies earn exceptionally high profits due to competitive pressure",
          "The industry becomes more attractive to new investors and entrepreneurs",
          "Profit margins are compressed and it's difficult for any company to thrive",
          "Strong forces cancel each other out, resulting in a perfectly balanced market"
        ],
        correctAnswer: 2,
        explanation: "When all five forces are strong - intense rivalry, powerful suppliers and buyers, many substitutes, and easy entry - profits get squeezed from every direction. These industries are challenging."
      }
    ]
  },
  {
    lessonId: "mgmt-6",
    questions: [
      {
        id: "mgmt6-q1",
        question: "What makes a metric qualify as a Key Performance Indicator rather than just a regular metric?",
        options: [
          "It must be reported to government regulatory agencies quarterly",
          "It directly connects to the organization's strategic objectives and goals",
          "It must be a financial number like revenue, profit, or cash flow",
          "It needs to be tracked daily rather than weekly or monthly cycles"
        ],
        correctAnswer: 1,
        explanation: "Not every number is a KPI. A KPI is specifically chosen because it measures progress toward a strategic goal. Employee count is a metric; employee retention rate tied to a growth goal is a KPI."
      },
      {
        id: "mgmt6-q2",
        question: "Which of the following is a leading indicator for a SaaS company?",
        options: [
          "Last quarter's total revenue from subscription payments received",
          "The number of free trial signups this month compared to last month",
          "Annual profit reported in the company's year-end financial statements",
          "Total revenue from the previous fiscal year across all product lines"
        ],
        correctAnswer: 1,
        explanation: "Free trial signups predict future revenue - more trials today likely means more paid subscriptions next month. Revenue and profit are lagging indicators that confirm past performance."
      },
      {
        id: "mgmt6-q3",
        question: "A company tracks 47 different KPIs. What is the likely problem?",
        options: [
          "They need to add at least 20 more KPIs for comprehensive tracking",
          "Having too many KPIs dilutes focus and makes it hard to prioritize",
          "47 KPIs is the industry standard recommended by business consultants",
          "More KPIs always leads to better decision-making at every company level"
        ],
        correctAnswer: 1,
        explanation: "When everything is a 'key' indicator, nothing is truly key. Too many KPIs create information overload and prevent teams from focusing on what matters most for strategic success."
      },
      {
        id: "mgmt6-q4",
        question: "Why should a subscription business track churn rate as a KPI alongside revenue?",
        options: [
          "Churn rate is required by accounting standards for subscription companies",
          "Revenue can grow while churn rises - masking an unsustainable business model",
          "Churn rate replaces the need to track revenue for subscription businesses",
          "Investors only care about churn rate and ignore revenue during evaluations"
        ],
        correctAnswer: 1,
        explanation: "A company can increase revenue through aggressive acquisition while losing existing customers at an alarming rate. Churn rate reveals whether growth is sustainable or masking a leaky bucket."
      },
      {
        id: "mgmt6-q5",
        question: "Net Promoter Score (NPS) measures how likely customers are to recommend a product. Is this a leading or lagging indicator?",
        options: [
          "Lagging - it only measures past customer satisfaction and experiences",
          "Leading - high NPS predicts future growth through word-of-mouth referrals",
          "Neither - NPS is a vanity metric with no connection to business outcomes",
          "Both - NPS measures past experience and predicts future revenue equally"
        ],
        correctAnswer: 1,
        explanation: "NPS is a leading indicator - satisfied customers who would recommend your product predict future organic growth through referrals. It signals future revenue before it materializes."
      }
    ]
  },
  {
    lessonId: "mgmt-7",
    questions: [
      {
        id: "mgmt7-q1",
        question: "According to the U.S. Department of Labor, a bad hire costs approximately what percentage of the position's first-year salary?",
        options: [
          "About 5% - roughly the cost of posting the original job listing",
          "About 15% - mainly the cost of interviewing replacement candidates",
          "About 30% - including recruitment, training, and lost productivity",
          "About 75% - most of the annual salary is wasted on a bad hire"
        ],
        correctAnswer: 2,
        explanation: "The 30% estimate includes recruiting costs, training investment, lost productivity during the hire's tenure, team disruption, and the cost of finding a replacement."
      },
      {
        id: "mgmt7-q2",
        question: "Which phase of hiring is MOST responsible for preventing early turnover in the first 90 days?",
        options: [
          "Recruitment - finding candidates through job boards and referrals",
          "Interviewing - asking behavioral questions during the selection process",
          "Onboarding - integrating the new hire into the company culture and tools",
          "Background checks - verifying the candidate's employment history and references"
        ],
        correctAnswer: 2,
        explanation: "Studies show that strong onboarding programs reduce early turnover significantly. When new hires feel supported, understand expectations, and connect with their team, they're far more likely to stay."
      },
      {
        id: "mgmt7-q3",
        question: "A company offers competitive salaries but has 50% annual turnover. What should they investigate?",
        options: [
          "Whether salaries are high enough compared to industry competitors",
          "Non-monetary factors like growth opportunities, culture, and management quality",
          "Whether employees are leaving for companies with better office snack options",
          "Government labor regulations that might be forcing employees to switch jobs"
        ],
        correctAnswer: 1,
        explanation: "If pay is competitive but turnover is high, the issue is likely non-monetary: poor management, lack of career growth, toxic culture, or insufficient recognition. Money alone doesn't retain people."
      },
      {
        id: "mgmt7-q4",
        question: "What is the main benefit of structured interviews over unstructured conversations?",
        options: [
          "Structured interviews take less time to conduct than casual conversations",
          "They ensure every candidate is evaluated on the same criteria consistently",
          "Unstructured interviews are illegal in most states for hiring purposes",
          "Structured interviews guarantee the best candidate is always selected"
        ],
        correctAnswer: 1,
        explanation: "Structured interviews use the same questions and scoring criteria for every candidate, reducing bias and making comparisons fair. Unstructured conversations are more subjective and inconsistent."
      },
      {
        id: "mgmt7-q5",
        question: "Why is employee retention generally more cost-effective than constant hiring?",
        options: [
          "Retained employees accept lower salaries over time automatically",
          "Existing employees accumulate institutional knowledge and require less training",
          "Government tax incentives reward companies that never hire new employees",
          "New employees are always less productive regardless of their experience level"
        ],
        correctAnswer: 1,
        explanation: "Retained employees understand the company, its customers, and its processes. Replacing them means losing that knowledge and investing in recruiting, training, and ramp-up time for someone new."
      }
    ]
  },
  {
    lessonId: "mgmt-8",
    questions: [
      {
        id: "mgmt8-q1",
        question: "What does stakeholder theory argue about business decision-making?",
        options: [
          "Only shareholders' financial interests should guide business decisions",
          "Businesses should consider the impact on all affected groups, not just owners",
          "Government regulators should make all major business decisions directly",
          "Customers are the only stakeholder group that matters for profitability"
        ],
        correctAnswer: 1,
        explanation: "Stakeholder theory holds that businesses affect many groups - employees, customers, communities, suppliers, and shareholders. Considering all stakeholders leads to more sustainable decisions."
      },
      {
        id: "mgmt8-q2",
        question: "A company discovers a minor safety defect in their product. Which response represents long-term ethical thinking?",
        options: [
          "Ignore it since no injuries have been reported and a recall is expensive",
          "Wait for government regulators to notice the issue before taking action",
          "Proactively disclose the issue and offer repairs before anyone is harmed",
          "Quietly fix the defect in future production runs without notifying customers"
        ],
        correctAnswer: 2,
        explanation: "Proactive disclosure builds trust and prevents the catastrophic consequences of a scandal. Companies that get ahead of problems earn customer loyalty; those that hide them risk everything."
      },
      {
        id: "mgmt8-q3",
        question: "Why is reputational risk often MORE costly than the original unethical decision?",
        options: [
          "Reputation damage is always temporary and easily repaired with advertising",
          "Lost trust leads to customer exodus, lawsuits, and talent flight that compound over time",
          "Reputational risk only affects small businesses, not large corporations",
          "Companies can buy reputation insurance to cover any potential damages"
        ],
        correctAnswer: 1,
        explanation: "When trust is broken, the cascade of consequences - lost customers, lawsuits, difficulty hiring, and regulatory scrutiny - typically costs far more than whatever short-term savings the unethical choice provided."
      },
      {
        id: "mgmt8-q4",
        question: "A CEO says 'Ethics are a luxury we can't afford right now.' What does this perspective overlook?",
        options: [
          "That ethics are only relevant for non-profit organizations and charities",
          "That unethical shortcuts often create larger costs than the savings they generate",
          "That profitable companies are automatically exempt from ethical considerations",
          "That employees prefer working for companies with questionable ethical standards"
        ],
        correctAnswer: 1,
        explanation: "Treating ethics as a 'luxury' ignores the evidence: unethical decisions create lawsuits, scandals, turnover, and brand damage that cost far more than doing the right thing would have."
      },
      {
        id: "mgmt8-q5",
        question: "How does building an ethical culture give a company a competitive advantage?",
        options: [
          "Ethical companies receive special government contracts and tax exemptions",
          "It attracts better talent, builds customer loyalty, and prevents costly scandals",
          "Ethical culture eliminates all business risks and guarantees profitability",
          "Competitors are legally prohibited from copying ethical company practices"
        ],
        correctAnswer: 1,
        explanation: "An ethical culture creates a virtuous cycle: top talent wants to work there, customers trust and stay loyal, and the company avoids the enormous costs of scandals and lawsuits."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // UNIT 27: MARKETING
  // ═══════════════════════════════════════════════

  // MKT-1: What Marketing Actually Is
  {
    lessonId: "mkt-1",
    questions: [
      {
        id: "mkt1-q1",
        question: "What is the BEST definition of marketing?",
        options: [
          "The full process of creating, communicating, and delivering value to customers",
          "The act of placing advertisements on television and social media platforms",
          "A department within a company that designs logos and writes slogans",
          "The strategy of offering the lowest price in every product category"
        ],
        correctAnswer: 0,
        explanation: "Marketing encompasses everything from understanding customer needs to designing products, setting prices, choosing distribution, and promoting - not just the ads people see."
      },
      {
        id: "mkt1-q2",
        question: "In the lemonade stand scenario, what was the PRIMARY reason Mia outsold Jake?",
        options: [
          "Mia used a better lemonade recipe with premium ingredients that tasted superior",
          "Mia strategically communicated value, chose a better location, and actively engaged customers",
          "Jake charged too much money for lemonade compared to Mia's lower pricing",
          "Mia had more friends at the festival who bought lemonade out of loyalty"
        ],
        correctAnswer: 1,
        explanation: "Mia applied marketing principles: clear branding (colorful banner with tagline), strategic placement (busiest intersection), and active promotion (free samples). Same product, completely different strategy."
      },
      {
        id: "mkt1-q3",
        question: "Why does marketing begin BEFORE any advertisement is created?",
        options: [
          "Because advertisements are the last step in a required regulatory approval process",
          "Because marketing starts with understanding customer needs and designing solutions for them",
          "Because businesses must spend their full budget on product development before marketing",
          "Because advertising agencies require a six-month lead time before any campaign launch"
        ],
        correctAnswer: 1,
        explanation: "Marketing starts with research: What do customers need? What problems do they have? The product, pricing, and distribution decisions all come before promotion. Ads without this foundation waste money."
      },
      {
        id: "mkt1-q4",
        question: "What does it mean when 'the best marketing doesn't feel like marketing'?",
        options: [
          "That companies should hide their marketing efforts so customers never suspect promotion",
          "That genuine value creation generates organic interest without feeling like a sales pitch",
          "That subliminal advertising techniques are the most effective marketing approach available",
          "That marketing is unnecessary when a product is of sufficiently high quality"
        ],
        correctAnswer: 1,
        explanation: "When a company truly solves customer problems and delivers real value, customers naturally share their experience. The marketing is embedded in the product experience itself - no hard sell required."
      },
      {
        id: "mkt1-q5",
        question: "A student opens an Etsy shop selling handmade cards but gets zero sales. What should they do FIRST?",
        options: [
          "Spend money on Instagram and Facebook ads to drive more traffic to the shop",
          "Research who buys handmade cards, what occasions they buy for, and what designs they prefer",
          "Lower prices to the minimum possible to undercut every other card seller on Etsy",
          "Create fifty more card designs to offer the widest possible selection to potential buyers"
        ],
        correctAnswer: 1,
        explanation: "Before spending on ads or creating more inventory, understand your customer. Marketing starts with knowing WHO wants your product and WHY - then you can design, price, and promote effectively."
      }
    ]
  },

  // MKT-2: Understanding Your Customer
  {
    lessonId: "mkt-2",
    questions: [
      {
        id: "mkt2-q1",
        question: "What is customer segmentation and why is it important?",
        options: [
          "Dividing a broad market into specific groups so you can serve each one more effectively",
          "Ranking customers by how much money they spend and focusing only on the biggest spenders",
          "Separating customers into online and in-store groups based on where they make purchases",
          "Categorizing products by price point so customers can easily find items in their budget"
        ],
        correctAnswer: 0,
        explanation: "Segmentation divides a large market into smaller, more specific groups based on shared characteristics. This lets you tailor your product, message, and channels to resonate powerfully with each group."
      },
      {
        id: "mkt2-q2",
        question: "Two students share the same age, grade, and neighborhood. How could psychographics reveal they need DIFFERENT marketing?",
        options: [
          "Psychographics cannot distinguish between people with similar demographics in any situation",
          "Their values, interests, and lifestyle motivations may drive completely different purchasing decisions",
          "Psychographic data only applies to adult consumers over the age of twenty-five",
          "Demographics always override psychographics when determining which products people will buy"
        ],
        correctAnswer: 1,
        explanation: "Demographics are identical, but one might value sustainability while the other values convenience. These psychographic differences - values, interests, lifestyle - mean they respond to completely different messages and products."
      },
      {
        id: "mkt2-q3",
        question: "In the phone case scenario, why did Zara outsell Aiden by nearly 30x?",
        options: [
          "Zara used higher quality materials that justified a premium price point for her cases",
          "Zara identified a specific target customer and aligned her product, brand, and channels to that audience",
          "Aiden's phone cases were poorly made and broke easily compared to Zara's durable products",
          "Zara spent significantly more money on paid advertising than Aiden could afford"
        ],
        correctAnswer: 1,
        explanation: "Zara's success came from focus: one specific customer (minimalist college women), one aligned brand (Pebble Cases), and one strategic channel (Pinterest/Instagram). Everything worked together because everything was designed for one audience."
      },
      {
        id: "mkt2-q4",
        question: "A clothing brand discovers their demographic data shows customers aged 18-24. What additional information would psychographics provide?",
        options: [
          "The exact number of customers in this age range who live in each geographic region",
          "Whether these customers value sustainability, fashion trends, comfort, or status when choosing clothes",
          "The average annual income and education level of people in this age range nationally",
          "How many competitors also target the same eighteen to twenty-four age demographic group"
        ],
        correctAnswer: 1,
        explanation: "Psychographics reveal the WHY behind purchases - values, motivations, and lifestyle. Knowing your customers value sustainability vs. trendiness vs. comfort completely changes how you design and market your products."
      },
      {
        id: "mkt2-q5",
        question: "Why does trying to appeal to 'everyone' typically result in appealing to no one?",
        options: [
          "Because marketing budgets are never large enough to reach every single potential customer",
          "Because a broad generic message lacks the specificity to resonate powerfully with any particular group",
          "Because government regulations limit the number of customer segments a company can target",
          "Because products designed for everyone are always lower quality than products designed for specialists"
        ],
        correctAnswer: 1,
        explanation: "A message for everyone is too vague to make anyone feel understood. 'Great shoes for everyone' is forgettable. 'Lightweight trail runners for hikers who hate blisters' speaks directly to someone who will feel seen and respond."
      }
    ]
  },

  // MKT-3: Market Research
  {
    lessonId: "mkt-3",
    questions: [
      {
        id: "mkt3-q1",
        question: "What is the key difference between primary and secondary research?",
        options: [
          "Primary research collects original data directly from your market; secondary research uses existing published data",
          "Primary research is more accurate while secondary research is always outdated and unreliable",
          "Primary research applies only to new businesses while secondary research is for established companies",
          "Primary research is free while secondary research always requires purchasing expensive industry reports"
        ],
        correctAnswer: 0,
        explanation: "Primary research (surveys, interviews, observation) gives you original data specific to your question. Secondary research (industry reports, census data) provides context from existing sources. Smart businesses use both."
      },
      {
        id: "mkt3-q2",
        question: "In the food truck scenario, what specific insight did Diana's research reveal that Carlos missed?",
        options: [
          "That food trucks were illegal in the neighborhood and required special operating permits",
          "That residents wanted quick healthy lunch options - a gap no existing restaurant was filling",
          "That Korean food was more popular than grain bowls in every neighborhood nationwide",
          "That Carlos's truck was parked too far from the main road to be visible to customers"
        ],
        correctAnswer: 1,
        explanation: "Diana's survey of 50 residents revealed unmet demand for healthy lunch options. This primary research insight shaped her entire business model - menu, pricing, and location - giving her a clear competitive advantage."
      },
      {
        id: "mkt3-q3",
        question: "A student wants to launch a tutoring app. Which is an example of PRIMARY research?",
        options: [
          "Reading an article about the growing online tutoring industry published by a business magazine",
          "Interviewing 25 students about their biggest study frustrations and what they would pay for help",
          "Looking up Census Bureau data on the number of high school students in the United States",
          "Analyzing the features and pricing of the top five existing tutoring apps on the market"
        ],
        correctAnswer: 1,
        explanation: "Interviewing students directly is primary research - you're collecting original data from your exact target market. Reading articles and analyzing competitors is secondary research (useful, but not primary)."
      },
      {
        id: "mkt3-q4",
        question: "Why is skipping market research considered the most expensive mistake a business can make?",
        options: [
          "Because competitors will outperform you if they have more research data in their files",
          "Because you risk investing significant time and money into products or services nobody actually wants",
          "Because investors and banks require completed research reports before granting any business loans",
          "Because market research provides the legal documentation required to register a new business"
        ],
        correctAnswer: 1,
        explanation: "Without research, you're guessing. Building a product nobody wants wastes all the time, money, and effort invested. A simple survey costing nothing can reveal critical insights that save thousands of dollars."
      },
      {
        id: "mkt3-q5",
        question: "What type of research would BEST reveal WHY customers choose one coffee shop over another?",
        options: [
          "A published industry report on national coffee consumption trends and average spending",
          "Focus groups where customers discuss what influences their choice of coffee shop in detail",
          "Census data showing the demographics of people living near each coffee shop location",
          "Sales data from the cash register showing which menu items are ordered most frequently"
        ],
        correctAnswer: 1,
        explanation: "Focus groups - a form of primary research - let you hear customers explain their motivations in their own words. They reveal the WHY behind choices, not just the WHAT. Published data and sales figures show patterns but not motivations."
      }
    ]
  },

  // MKT-4: The 4 Ps - Product & Price
  {
    lessonId: "mkt-4",
    questions: [
      {
        id: "mkt4-q1",
        question: "What does 'product differentiation' mean in marketing?",
        options: [
          "What makes your product unique and worth choosing over competitors' alternatives",
          "The process of manufacturing products in different sizes and colors for variety",
          "Selling the same product at different prices depending on the customer's income level",
          "Creating separate marketing campaigns for each individual product in your lineup"
        ],
        correctAnswer: 0,
        explanation: "Differentiation is your competitive edge - the specific features, quality, design, or experience that make customers choose YOUR product over similar alternatives. Without it, you compete only on price."
      },
      {
        id: "mkt4-q2",
        question: "In the bracelet scenario, why did Marcus earn nearly 3x Ella's profit with fewer sales?",
        options: [
          "Marcus used significantly more expensive materials that justified his higher selling price",
          "Marcus created perceived value through branding and packaging, enabling value-based pricing",
          "Ella intentionally priced her bracelets low because she did not want to make a large profit",
          "Marcus had a better location at the holiday market with more foot traffic near his table"
        ],
        correctAnswer: 1,
        explanation: "Marcus's brand (Thread & Stone), packaging (gift boxes), and positioning transformed a $2 product into a $15 gift. The materials were the same - the perceived value was completely different."
      },
      {
        id: "mkt4-q3",
        question: "A coffee shop charges $5 for a latte that costs $0.60 to make. Which pricing strategy is this?",
        options: [
          "Cost-plus pricing, because the shop added a standard markup above production cost",
          "Competitive pricing, because the shop matched the average latte price in the area",
          "Value-based pricing, because the price reflects what customers believe the experience is worth",
          "Penetration pricing, because the shop set a low price to attract customers from competitors"
        ],
        correctAnswer: 2,
        explanation: "An 8x markup over cost isn't cost-plus - it's value-based. Customers pay for the experience, ambiance, convenience, and brand - not just the liquid. The price reflects perceived value, not production cost."
      },
      {
        id: "mkt4-q4",
        question: "When would cost-plus pricing be the MOST appropriate strategy for a business?",
        options: [
          "When the product is a luxury item with strong brand recognition and emotional appeal",
          "When the product is a commodity with low differentiation and many similar competitors",
          "When customers have no way to compare prices with any alternative products or services",
          "When the business wants to maximize profit margins on every single unit they sell"
        ],
        correctAnswer: 1,
        explanation: "Cost-plus works well for commodities where customers can easily compare prices and there's little differentiation. For unique or branded products, value-based pricing captures more of what customers are willing to pay."
      },
      {
        id: "mkt4-q5",
        question: "A student sells digital art prints online. Why might 'free' be the WORST price even though production cost is nearly zero?",
        options: [
          "Because free products violate online marketplace terms of service and licensing agreements",
          "Because a zero price signals zero value, undermining the perceived quality and effort behind the work",
          "Because free products always attract more customers than the student can handle alone",
          "Because digital products must legally be sold above their production cost in most countries"
        ],
        correctAnswer: 1,
        explanation: "Price is a signal. Free tells customers the product has no value. Even a small price ($2-5) communicates that the work has worth and effort behind it. Pricing too low can actually hurt sales by undermining perceived quality."
      }
    ]
  },

  // MKT-5: The 4 Ps - Place & Promotion
  {
    lessonId: "mkt-5",
    questions: [
      {
        id: "mkt5-q1",
        question: "Why is 'Place' considered as important as the product itself?",
        options: [
          "Because even excellent products fail when customers cannot find or access them easily",
          "Because the physical appearance of a store determines the quality of products inside it",
          "Because distribution is always the most expensive part of running any type of business",
          "Because customers always buy from the nearest location regardless of product quality"
        ],
        correctAnswer: 0,
        explanation: "Place ensures accessibility. The best product in the world generates zero revenue if customers don't know where to find it or can't purchase it conveniently. Distribution bridges the gap between product and customer."
      },
      {
        id: "mkt5-q2",
        question: "In the candle scenario, what was the MOST significant advantage of Nadia's multi-channel approach?",
        options: [
          "Nadia's candles were higher quality because she invested in better wax and fragrances",
          "Nadia could reach customers and generate revenue beyond the constraints of market hours and location",
          "Kai's farmers market had fewer visitors because it was in a less popular neighborhood",
          "Nadia offered lower prices online which attracted more budget-conscious shoppers"
        ],
        correctAnswer: 1,
        explanation: "Nadia's multi-channel strategy removed the constraints of time (market hours) and place (market location). Her online store operated 24/7, and her Instagram reached people beyond the local area."
      },
      {
        id: "mkt5-q3",
        question: "What is 'organic marketing' and why is it important for small businesses?",
        options: [
          "Marketing exclusively through farmers markets and organic food channels to health-conscious customers",
          "Building audience and awareness through content and community without paying for advertisements",
          "A marketing strategy that only works for businesses selling organic and natural products",
          "Using environmentally friendly printing materials for all physical marketing brochures and flyers"
        ],
        correctAnswer: 1,
        explanation: "Organic marketing - social media content, word-of-mouth, community building - costs time but not money. This levels the playing field for small businesses and student entrepreneurs who can't afford ad budgets."
      },
      {
        id: "mkt5-q4",
        question: "A student sells artwork only at monthly school events. What single change would most increase sales?",
        options: [
          "Raise prices at school events to signal premium quality to buyers walking by the booth",
          "Add an online store and social media presence to reach customers beyond school events",
          "Move the booth to a different hallway within the school to capture more student foot traffic",
          "Reduce the number of art pieces displayed to create a sense of scarcity and exclusivity"
        ],
        correctAnswer: 1,
        explanation: "Adding online distribution and social media removes time and location constraints. The student can now reach customers 24/7 and beyond the school community - dramatically expanding their addressable market."
      },
      {
        id: "mkt5-q5",
        question: "How did Glossier build a successful beauty brand without traditional TV advertising?",
        options: [
          "They offered the lowest prices in the beauty industry to attract price-sensitive customers",
          "They used government subsidies for small businesses to fund their entire marketing budget",
          "They built a community of real customers who shared authentic experiences on social media",
          "They paid celebrities millions of dollars for exclusive endorsement deals and appearances"
        ],
        correctAnswer: 2,
        explanation: "Glossier's Instagram-first strategy focused on real customer stories and community building - organic promotion that generated more trust than traditional ads at a fraction of the cost."
      }
    ]
  },

  // MKT-6: Branding
  {
    lessonId: "mkt-6",
    questions: [
      {
        id: "mkt6-q1",
        question: "What is a brand, according to marketing professionals?",
        options: [
          "The total perception customers have about a business - the feeling, trust, and story they associate with it",
          "The official logo, color palette, and font selections registered with government trademark offices",
          "The physical products a company manufactures and sells through retail and online channels",
          "The advertising budget a company allocates to television commercials and social media posts"
        ],
        correctAnswer: 0,
        explanation: "A brand lives in customers' minds - it's the sum total of every interaction, experience, and impression they have. The logo is just a visual shortcut to that deeper perception."
      },
      {
        id: "mkt6-q2",
        question: "In the tutoring scenario, why could Sarah charge $10 more per hour than Jamal?",
        options: [
          "Sarah had verified teaching credentials and a higher GPA that justified premium pricing",
          "Sarah's consistent branding created perceived professionalism and trust that parents valued",
          "Jamal intentionally charged less because he wanted to serve lower-income families exclusively",
          "Sarah tutored more subjects than Jamal which justified her higher hourly rate"
        ],
        correctAnswer: 1,
        explanation: "Sarah's brand - Apex Tutoring with consistent name, colors, tagline, and professional presence - created a perception of quality and reliability. Parents paid more because the brand signaled professionalism."
      },
      {
        id: "mkt6-q3",
        question: "What is brand equity and why does it matter for pricing?",
        options: [
          "The financial investment a company makes in creating logos and visual design materials",
          "The additional value a strong brand adds beyond the product's functional benefits, enabling premium pricing",
          "The total number of customers who recognize a company's logo when shown in market research",
          "The legal protection that trademarks provide against competitors copying product designs"
        ],
        correctAnswer: 1,
        explanation: "Brand equity is the premium customers will pay BECAUSE of the brand - beyond what the product functionally delivers. Strong brands command higher prices, earn more loyalty, and are more resilient during tough times."
      },
      {
        id: "mkt6-q4",
        question: "Why is brand CONSISTENCY more important than brand creativity?",
        options: [
          "Because creative branding is always more expensive than using the same designs repeatedly",
          "Because repetition builds recognition and trust, which are the foundations of brand equity",
          "Because customers dislike any changes to visual design and will stop buying if logos change",
          "Because consistent brands are automatically protected from competitor imitation by trademark law"
        ],
        correctAnswer: 1,
        explanation: "Consistency across every touchpoint - website, packaging, social media, interactions - builds the recognition and trust that creates brand equity. Creativity without consistency creates confusion, not connection."
      },
      {
        id: "mkt6-q5",
        question: "How did Patagonia's 'Don't Buy This Jacket' campaign strengthen their brand?",
        options: [
          "It confused competitors who could not figure out the strategy behind discouraging purchases",
          "It demonstrated radical consistency between their environmental values and their marketing actions",
          "It was a reverse psychology trick that actually made people buy more jackets than usual",
          "It lowered their advertising costs because the campaign required only one simple printed ad"
        ],
        correctAnswer: 1,
        explanation: "Patagonia's campaign was authentic - their brand IS environmental activism. Telling customers to repair instead of replace proved their values were real, not marketing spin. This authenticity deepened customer loyalty and trust."
      }
    ]
  },

  // MKT-7: Consumer Decision-Making
  {
    lessonId: "mkt-7",
    questions: [
      {
        id: "mkt7-q1",
        question: "What are the four stages of the buyer journey in order?",
        options: [
          "Awareness, Consideration, Decision, Loyalty - from first recognizing a need to becoming a repeat customer",
          "Research, Comparison, Purchase, Return - from gathering data to potentially returning the product",
          "Interest, Desire, Action, Satisfaction - from initial curiosity to post-purchase evaluation",
          "Discovery, Evaluation, Transaction, Feedback - from finding products to rating them online"
        ],
        correctAnswer: 0,
        explanation: "The buyer journey moves through Awareness (realizing a need), Consideration (researching options), Decision (choosing and buying), and Loyalty (returning and recommending). Each stage requires different marketing approaches."
      },
      {
        id: "mkt7-q2",
        question: "In Maya's laptop purchase, which stage did the classmate's recommendation primarily influence?",
        options: [
          "Awareness - Maya didn't know laptops existed until her friend mentioned one specific model",
          "Consideration - the personal recommendation helped Maya evaluate and narrow her options",
          "Decision - the recommendation had no effect since Maya based her choice solely on price",
          "Loyalty - the friend's recommendation only matters after Maya already owned the laptop"
        ],
        correctAnswer: 1,
        explanation: "Maya was already aware she needed a laptop. The classmate's enthusiastic recommendation influenced her consideration stage - helping her evaluate options and lean toward the MacBook Air during comparison."
      },
      {
        id: "mkt7-q3",
        question: "Why is the loyalty stage often the most PROFITABLE stage for businesses?",
        options: [
          "Because loyal customers accept automatic price increases without comparing competitor prices",
          "Because retaining customers costs less than acquiring new ones, and loyal customers refer others for free",
          "Because loyalty programs generate more revenue than the products themselves through membership fees",
          "Because loyal customers never experience problems, so they require zero customer service costs"
        ],
        correctAnswer: 1,
        explanation: "Acquiring a new customer costs 5-7x more than retaining an existing one. Plus, loyal customers become free marketing channels through word-of-mouth referrals - the most trusted form of promotion."
      },
      {
        id: "mkt7-q4",
        question: "A baking business has many Instagram followers but few orders. Which buyer journey stage is the likely bottleneck?",
        options: [
          "Awareness - people do not know the business exists or what products are available",
          "Consideration - followers cannot find reviews or information to feel confident ordering",
          "Decision - followers want to buy but the purchasing process is unclear or too difficult",
          "Loyalty - the business needs to focus on getting past customers to reorder more frequently"
        ],
        correctAnswer: 2,
        explanation: "Many followers means awareness isn't the problem. The bottleneck is likely at the Decision stage - no clear ordering process, no visible pricing, or no easy way to actually complete a purchase."
      },
      {
        id: "mkt7-q5",
        question: "Which marketing tactic is MOST effective during the Awareness stage of the buyer journey?",
        options: [
          "Offering a thirty-day money-back guarantee to reduce the perceived risk of purchasing",
          "Creating visible content like social media posts, blog articles, and search engine results",
          "Sending personalized discount codes to customers who abandoned their shopping carts",
          "Requesting five-star reviews from satisfied customers to build social proof and credibility"
        ],
        correctAnswer: 1,
        explanation: "Awareness is about being SEEN - customers need to discover you exist and understand what you offer. Content, social media, and search visibility put your brand in front of people who don't know about you yet."
      }
    ]
  },

  // MKT-8: Testing Your Ideas
  {
    lessonId: "mkt-8",
    questions: [
      {
        id: "mkt8-q1",
        question: "What is a Minimum Viable Product (MVP)?",
        options: [
          "The simplest version of your product that lets you test real customer demand before investing heavily",
          "A low-quality prototype that companies show investors to raise funding for the full version",
          "The minimum number of products a business must manufacture to qualify for wholesale pricing",
          "A product that meets only the minimum legal safety requirements for sale in retail stores"
        ],
        correctAnswer: 0,
        explanation: "An MVP isn't about poor quality - it's about speed and learning. Build the simplest thing that tests your core assumption, get real feedback, then decide whether to invest more based on evidence."
      },
      {
        id: "mkt8-q2",
        question: "In the study guide scenario, what was Riley's key advantage over Jordan?",
        options: [
          "Riley had more academic knowledge and could write better study guides than Jordan could",
          "Riley tested her hypothesis cheaply with real customers before committing significant resources",
          "Jordan's printing costs were unreasonably high because he chose a premium printing service",
          "Riley's friends agreed to buy from her before she started, guaranteeing her initial sales"
        ],
        correctAnswer: 1,
        explanation: "Riley spent $0 testing two sample guides with 20 classmates. She learned critical insights (students wanted digital, not printed) before investing. Jordan assumed and lost $340. Testing beats assuming."
      },
      {
        id: "mkt8-q3",
        question: "How does A/B testing improve business decisions compared to relying on intuition?",
        options: [
          "A/B testing is cheaper than any other form of market research including surveys and interviews",
          "It replaces subjective opinions with objective data from real customer behavior and responses",
          "A/B testing guarantees that the winning version will succeed permanently in all future scenarios",
          "It eliminates the need for any other marketing strategy once the optimal version is identified"
        ],
        correctAnswer: 1,
        explanation: "A/B testing lets data decide instead of opinions. Instead of debating which headline or price is better, you test both with real customers and their actual behavior reveals the winner."
      },
      {
        id: "mkt8-q4",
        question: "Why did Dropbox create a video instead of building their full product first?",
        options: [
          "Because video production was cheaper than software development at the time they launched",
          "Because the video served as an MVP to validate demand - 75,000 signups proved people wanted the product",
          "Because investors required a promotional video before they would agree to fund the company",
          "Because the founders did not have the technical skills to build the actual software product"
        ],
        correctAnswer: 1,
        explanation: "The video was Dropbox's MVP - the simplest way to test their core assumption (do people want easy file syncing?). 75,000 overnight signups proved massive demand before they spent millions building it."
      },
      {
        id: "mkt8-q5",
        question: "What is the biggest risk of skipping the testing phase and launching a full product immediately?",
        options: [
          "That competitors will copy your idea before you can establish market dominance and brand loyalty",
          "That you invest significant time and money into something before knowing if customers actually want it",
          "That your product will be too high quality for the target market you originally intended to serve",
          "That government product safety testing requirements will delay your launch by several months"
        ],
        correctAnswer: 1,
        explanation: "Without testing, every dollar and hour invested is a gamble. An MVP lets you validate demand cheaply. Failing fast and cheap is infinitely better than failing slowly and expensively."
      }
    ]
  }
]

/** All quiz pools: the original hand-written set plus the authored packs. */
export const lessonQuizzes: LessonQuiz[] = [
  ...baseLessonQuizzes,
  ...incomeBankingCreditQuizzes,
  ...stocksAndMarketsQuizzes,
  ...portfolioFundsBondsQuizzes,
  ...statementsRatiosValuationQuizzes,
  ...behavioralMacroQuizzes,
  ...advancedTopicsQuizzes,
  ...bankingCreditCoreQuizzes,
  ...investingStocksCoreQuizzes,
  ...marketsRatiosValuationQuizzes,
  ...bubblesMacroIndicatorsQuizzes,
  ...optionsAltsPlanningSimsQuizzes,
  ...difficultyQuizzes,
  ...topUpBusinessQuizzes,
  ...topUpMarketingQuizzes,
  ...topUp6Credit,
  ...topUp6Invest,
  ...topUp6Banking,
  ...topUp6Ratios,
  ...topUp6ValPlan,
  ...topUp6BubOpt,
  ...topUp6MacroMkt,
  ...topUp6IndAlt,
  ...topUp6StkSim,
  ...topUp8Income,
  ...topUp8Portfolio,
  ...topUp8Etfs,
  ...topUp8BondsMkt,
  ...topUp8StmtComp,
  ...topUp8BehavEntre,
  ...diffBatch01,
  ...diffBatch02,
  ...diffBatch03,
  ...diffBatch04,
]

export function getQuizForLesson(lessonId: string): QuizQuestion[] {
  // Merge every pool registered for this lesson - lets top-up packs extend an
  // existing pool without editing the original file.
  return lessonQuizzes.filter(q => q.lessonId === lessonId).flatMap(q => q.questions)
}

/**
 * Same as getQuizForLesson, but prefers a `${lessonId}-hard` / `${lessonId}-remedial`
 * pool when one exists for "advanced" / "beginner" difficulty. Falls back to the
 * normal pool for "intermediate" or when no difficulty-specific pool is registered
 * for this lesson yet (most lessons - this is a pilot on a handful of topics).
 */
export function getQuizForLessonByTier(lessonId: string, difficulty: "beginner" | "intermediate" | "advanced"): QuizQuestion[] {
  const suffix = difficulty === "beginner" ? "-remedial" : difficulty === "advanced" ? "-hard" : null
  if (suffix) {
    const tiered = getQuizForLesson(`${lessonId}${suffix}`)
    if (tiered.length > 0) return tiered
  }
  return getQuizForLesson(lessonId)
}
