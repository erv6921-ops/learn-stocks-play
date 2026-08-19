import { Lesson, LessonCategory, MasteryTier, UnitInfo, LEVEL_TITLES, CourseTrack } from "@/types"
import { AP_MICRO_UNITS, AP_MICRO_LESSONS } from "@/data/apMicro"

// Global lesson-reward scale. Lessons were paying out so much that coins were
// trivial to accumulate, so every lesson's reward is cut by this factor. Tune
// here to rebalance the whole curriculum at once (1 = original, 0.5 = half).
const LESSON_REWARD_SCALE = 0.5

// Helper to create a lesson
function L(
  id: string, title: string, description: string, category: LessonCategory,
  tier: MasteryTier, unitId: string, lessonNum: string, reward: number
): Lesson {
  return { id, title, description, category, level: tier, unitId, lessonNumber: lessonNum, reward: Math.round(reward * LESSON_REWARD_SCALE), content: "", duration: 2, completed: false }
}

// ═══════════════════════════════════════════════
// UNIT DEFINITIONS (sequential numbering)
// ═══════════════════════════════════════════════

export const unitInfo: UnitInfo[] = [
  // Level 1: Money Foundations
  { id: "unit-1",  unitNumber: 1,  title: "The Psychology of Money",       level: 1,  levelTitle: LEVEL_TITLES[1],  categories: ["psychology-of-money"],     orderIndex: 1 },
  { id: "unit-2",  unitNumber: 2,  title: "Income & Earning Power",        level: 1,  levelTitle: LEVEL_TITLES[1],  categories: ["income-earning"],          orderIndex: 2 },
  { id: "unit-3",  unitNumber: 3,  title: "Budgeting Mastery",             level: 1,  levelTitle: LEVEL_TITLES[1],  categories: ["budgeting"],               orderIndex: 3 },
  { id: "unit-25", unitNumber: 4,  title: "Investing Fundamentals",        level: 1,  levelTitle: LEVEL_TITLES[1],  categories: ["investing-fundamentals"],  orderIndex: 4 },

  // Level 2: Banking & Credit
  { id: "unit-4",  unitNumber: 5,  title: "Banking Systems",               level: 2,  levelTitle: LEVEL_TITLES[2],  categories: ["banking"],                 orderIndex: 5 },
  { id: "unit-5",  unitNumber: 6,  title: "Credit & Debt",                 level: 2,  levelTitle: LEVEL_TITLES[2],  categories: ["credit-debt"],             orderIndex: 6 },
  { id: "unit-35", unitNumber: 35, title: "Insurance & Protection",      level: 2,  levelTitle: LEVEL_TITLES[2],  categories: ["insurance-protection"],    orderIndex: 7 },

  // Level 3: Investing Core
  { id: "unit-6",  unitNumber: 7,  title: "Introduction to Investing",     level: 3,  levelTitle: LEVEL_TITLES[3],  categories: ["investing-intro"],         orderIndex: 8 },
  { id: "unit-7",  unitNumber: 8,  title: "Stocks Explained",              level: 3,  levelTitle: LEVEL_TITLES[3],  categories: ["stocks"],                  orderIndex: 9 },
  { id: "unit-8",  unitNumber: 9,  title: "Stock Market System",           level: 3,  levelTitle: LEVEL_TITLES[3],  categories: ["stock-market"],            orderIndex: 10 },

  // Level 4: Portfolio Strategy
  { id: "unit-9",  unitNumber: 10, title: "Portfolio Construction",        level: 4,  levelTitle: LEVEL_TITLES[4],  categories: ["portfolio"],               orderIndex: 11 },
  { id: "unit-10", unitNumber: 11, title: "ETFs & Mutual Funds",           level: 4,  levelTitle: LEVEL_TITLES[4],  categories: ["etfs-funds"],              orderIndex: 12 },
  { id: "unit-11", unitNumber: 12, title: "Bonds & Fixed Income",          level: 4,  levelTitle: LEVEL_TITLES[4],  categories: ["bonds"],                   orderIndex: 13 },

  // Level 5: Company Analysis
  { id: "unit-12", unitNumber: 13, title: "Financial Statements",          level: 5,  levelTitle: LEVEL_TITLES[5],  categories: ["financial-statements"],    orderIndex: 14 },
  { id: "unit-13", unitNumber: 14, title: "Financial Ratios",              level: 5,  levelTitle: LEVEL_TITLES[5],  categories: ["financial-ratios"],        orderIndex: 15 },
  { id: "unit-14", unitNumber: 15, title: "Valuation",                     level: 5,  levelTitle: LEVEL_TITLES[5],  categories: ["valuation"],               orderIndex: 16 },

  // Level 6: Behavioral Finance
  { id: "unit-15", unitNumber: 16, title: "Behavioral Economics",          level: 6,  levelTitle: LEVEL_TITLES[6],  categories: ["behavioral-finance"],      orderIndex: 17 },
  { id: "unit-16", unitNumber: 17, title: "Bubbles & Crashes",             level: 6,  levelTitle: LEVEL_TITLES[6],  categories: ["bubbles-crashes"],         orderIndex: 18 },

  // Level 7: Macro Economics
  { id: "unit-17", unitNumber: 18, title: "Inflation & Rates",             level: 7,  levelTitle: LEVEL_TITLES[7],  categories: ["macro-economics"],         orderIndex: 19 },
  { id: "unit-18", unitNumber: 19, title: "Economic Indicators",           level: 7,  levelTitle: LEVEL_TITLES[7],  categories: ["economic-indicators"],     orderIndex: 20 },

  // Level 8: Entrepreneurship
  { id: "unit-19", unitNumber: 20, title: "Starting a Business",           level: 8,  levelTitle: LEVEL_TITLES[8],  categories: ["entrepreneurship"],        orderIndex: 21 },
  { id: "unit-20", unitNumber: 21, title: "Competitive Strategy",          level: 8,  levelTitle: LEVEL_TITLES[8],  categories: ["competitive-strategy"],    orderIndex: 22 },
  { id: "unit-26", unitNumber: 22, title: "Business Management & Strategy",level: 8,  levelTitle: LEVEL_TITLES[8],  categories: ["business-management"],     orderIndex: 23 },
  { id: "unit-27", unitNumber: 23, title: "Marketing",                     level: 8,  levelTitle: LEVEL_TITLES[8],  categories: ["marketing"],               orderIndex: 24 },
  { id: "unit-28", unitNumber: 24, title: "Consumer Behavior",              level: 8,  levelTitle: LEVEL_TITLES[8],  categories: ["consumer-behavior"],        orderIndex: 25 },
  { id: "unit-29", unitNumber: 25, title: "The Marketing Mix - 4 Ps",      level: 8,  levelTitle: LEVEL_TITLES[8],  categories: ["marketing-mix"],            orderIndex: 26 },
  { id: "unit-30", unitNumber: 26, title: "Market Research",                level: 8,  levelTitle: LEVEL_TITLES[8],  categories: ["market-research"],          orderIndex: 27 },
  { id: "unit-31", unitNumber: 27, title: "Leadership & Management",       level: 8,  levelTitle: LEVEL_TITLES[8],  categories: ["leadership-management"],    orderIndex: 28 },
  { id: "unit-32", unitNumber: 28, title: "Strategic Analysis Tools",      level: 8,  levelTitle: LEVEL_TITLES[8],  categories: ["strategic-analysis"],       orderIndex: 29 },
  { id: "unit-33", unitNumber: 29, title: "PESTEL Analysis",              level: 8,  levelTitle: LEVEL_TITLES[8],  categories: ["pestel-analysis"],          orderIndex: 30 },
  { id: "unit-34", unitNumber: 30, title: "Business Ethics & Social Responsibility", level: 8, levelTitle: LEVEL_TITLES[8], categories: ["business-ethics"],  orderIndex: 31 },

  // Level 9: Advanced Investing
  { id: "unit-21", unitNumber: 31, title: "Options Basics",                level: 9,  levelTitle: LEVEL_TITLES[9],  categories: ["options"],                 orderIndex: 32 },
  { id: "unit-22", unitNumber: 32, title: "Alternative Investments",       level: 9,  levelTitle: LEVEL_TITLES[9],  categories: ["alternatives"],            orderIndex: 33 },

  // Level 10: Real-World Application
  { id: "unit-23", unitNumber: 33, title: "10-Year Financial Plan",        level: 10, levelTitle: LEVEL_TITLES[10], categories: ["financial-planning"],      orderIndex: 34 },
  { id: "unit-24", unitNumber: 34, title: "Market Simulations",            level: 10, levelTitle: LEVEL_TITLES[10], categories: ["simulations"],             orderIndex: 35 },
]

// ═══════════════════════════════════════════════
// LESSONS (no videos - all use structured content)
// ═══════════════════════════════════════════════

export const lessons: Lesson[] = [
  // ─── LEVEL 1: MONEY FOUNDATIONS ───

  // Unit 1: Psychology of Money
  L("psych-1",  "Why People Mismanage Money",         "Explore the common psychological traps that lead to poor financial decisions",   "psychology-of-money", "explorer", "unit-1", "1.1",  250),
  L("psych-2",  "Delayed Gratification",              "Why the brain craves rewards now - and how to choose the bigger reward later",  "psychology-of-money", "explorer", "unit-1", "1.2",  250),
  L("psych-4",  "Scarcity vs Abundance Mindset",      "How your mindset about money shapes your financial future",                    "psychology-of-money", "explorer", "unit-1", "1.3",  300),
  L("psych-5",  "Money & Emotions",                   "Discover how feelings influence spending and saving habits",                   "psychology-of-money", "explorer", "unit-1", "1.4",  300),
  L("psych-6",  "Social Influence & Spending",        "Learn how peer pressure and social media affect your wallet",                  "psychology-of-money", "explorer", "unit-1", "1.5",  350),
  L("psych-7",  "Advertising & Consumer Behavior",    "Understand how marketing tries to manipulate your spending",                   "psychology-of-money", "explorer", "unit-1", "1.6",  350),
  L("psych-8",  "Behavioral Traps",                   "Identify cognitive biases that lead to bad financial choices",                 "psychology-of-money", "builder",  "unit-1", "1.7",  400),
  L("psych-9",  "Identity & Money Habits",            "How your self-image shapes your relationship with money",                      "psychology-of-money", "builder",  "unit-1", "1.8",  400),
  L("psych-10", "Healthy Financial Beliefs",          "Build a positive and productive money mindset",                                "psychology-of-money", "builder",  "unit-1", "1.9",  500),

  // Unit 2: Income & Earning Power
  L("income-1",  "Active vs Passive Income",   "Learn the two main ways to earn money",                        "income-earning", "explorer", "unit-2", "2.1",  250),
  L("income-2",  "Wages vs Salary",            "Understand the difference between hourly and annual pay",      "income-earning", "explorer", "unit-2", "2.2",  250),
  L("income-3",  "Hourly vs Commission",       "Compare different compensation structures",                   "income-earning", "explorer", "unit-2", "2.3",  300),
  L("income-4",  "Gig Economy",                "Explore freelance and gig work opportunities",                "income-earning", "explorer", "unit-2", "2.4",  300),
  L("income-5",  "Gross vs Net Pay",           "Learn what gets taken out of your paycheck",                  "income-earning", "explorer", "unit-2", "2.5",  300),
  L("income-6",  "Taxes",                      "Understand how income taxes work",                            "income-earning", "builder",  "unit-2", "2.6",  400),
  L("income-7",  "Career ROI",                 "Evaluate the financial return on career choices",             "income-earning", "builder",  "unit-2", "2.7",  400),
  L("income-8",  "Education as Investment",    "Is college worth the cost? Analyze the data",                "income-earning", "builder",  "unit-2", "2.8",  400),
  L("income-9",  "Skill Stacking",             "How combining skills multiplies your earning power",          "income-earning", "builder",  "unit-2", "2.9",  450),
  L("income-10", "Entrepreneurship Income",    "Explore earning potential through starting a business",       "income-earning", "builder",  "unit-2", "2.10", 500),
  L("income-11", "College vs Trade School: What's the ROI?",    "Compare the real financial return on different education paths",          "income-earning", "builder", "unit-2", "2.11", 450),
  L("income-12", "How Labor Markets Set Your Pay",               "Understand why some jobs pay more and how supply/demand affects wages",   "income-earning", "builder", "unit-2", "2.12", 450),
  L("income-13", "Recessions, Unemployment & Your Money",        "Learn how economic downturns affect jobs and how to protect yourself",   "income-earning", "builder", "unit-2", "2.13", 450),
  L("income-14", "Social Security: The Basics",                  "Understand how Social Security is funded and what it pays",              "income-earning", "builder", "unit-2", "2.14", 400),
  L("income-15", "Local Taxes: Property, Sales & Municipal",     "Learn how local governments tax residents and why rates differ",         "income-earning", "builder", "unit-2", "2.15", 400),

  // Unit 3: Budgeting Mastery
  L("budget-1",  "What is a Budget & Why It Matters", "Learn why budgeting is the most important money skill you'll ever learn", "budgeting", "explorer", "unit-3", "3.1",  250),
  L("budget-2",  "How to Make a Simple Budget",       "Master the basics of income, spending, and saving",           "budgeting", "explorer", "unit-3", "3.2",  250),
  L("budget-3",  "Tracking Your Spending",             "Learn how to monitor where your money goes each day",         "budgeting", "explorer", "unit-3", "3.3",  300),
  L("budget-4",  "The 50/30/20 Rule",                  "Discover a simple formula for dividing your money",           "budgeting", "explorer", "unit-3", "3.4",  300),
  L("budget-5",  "Monthly Budget",                     "Create and maintain a complete monthly budget",               "budgeting", "builder",  "unit-3", "3.5",  400),
  L("budget-6",  "Emergency Funds",                    "Understand why saving for emergencies is essential",          "budgeting", "builder",  "unit-3", "3.6",  400),
  L("budget-7",  "Lifestyle Inflation",                "Avoid the trap of spending more as you earn more",            "budgeting", "builder",  "unit-3", "3.7",  400),
  L("budget-8",  "Goal Budgeting",                     "Align your budget with your life goals",                     "budgeting", "builder",  "unit-3", "3.8",  450),
  L("budget-9",  "Zero-Based Budgeting",               "Learn strategies when every dollar has a purpose",            "budgeting", "builder",  "unit-3", "3.9",  500),
  L("budget-10", "Digital Budget Tools",               "Explore apps and tools that make budgeting easier",           "budgeting", "builder",  "unit-3", "3.10", 500),
  L("budget-11", "Smart Buying: Evaluating Big Purchases",      "Learn to evaluate durability, total cost, and features before buying",     "budgeting", "builder", "unit-3", "3.11", 450),
  L("budget-12", "The Psychology of Pricing",                    "Understand how stores manipulate prices to make you spend more",           "budgeting", "builder", "unit-3", "3.12", 400),
  L("budget-13", "Giving Back: Charitable Donations & Nonprofits", "Learn how charitable giving works and how to give wisely",             "budgeting", "builder", "unit-3", "3.13", 350),
  L("budget-14", "Consumer Protection: Your Rights & Agencies",  "Know the laws and agencies that protect you as a buyer",                  "budgeting", "builder", "unit-3", "3.14", 400),
  L("budget-15", "Reading & Evaluating Contracts",               "Understand terms and conditions before you sign anything",                "budgeting", "builder", "unit-3", "3.15", 450),
  L("budget-16", "Disputing Billing Errors",                     "Learn to identify and contest incorrect charges on any account",          "budgeting", "builder", "unit-3", "3.16", 400),

  // Unit 4 (Investing Fundamentals)
  L("invfund-1",  "Why Investing Beats Saving",           "Learn why keeping cash in savings loses value over time",                  "investing-fundamentals", "explorer", "unit-25", "4.1",  250),
  L("invfund-2",  "Compound Interest & the Rule of 72",   "Discover how interest earns interest and doubles your money",             "investing-fundamentals", "explorer", "unit-25", "4.2",  250),
  L("invfund-3",  "Stocks: Owning a Piece of a Business", "Understand what it means to own shares in a company",                    "investing-fundamentals", "explorer", "unit-25", "4.3",  300),
  L("invfund-4",  "Bonds: Lending Your Money",            "Learn how bonds work and why they're safer than stocks",                  "investing-fundamentals", "explorer", "unit-25", "4.4",  300),
  L("invfund-5",  "Mutual Funds & ETFs",                  "Explore how pooled investing gives you instant diversification",          "investing-fundamentals", "explorer", "unit-25", "4.5",  300),
  L("invfund-6",  "Risk vs Return",                       "Understand why higher potential gains come with higher risk",             "investing-fundamentals", "explorer", "unit-25", "4.6",  300),
  L("invfund-7",  "Diversification",                      "Learn why spreading your investments protects your money",                "investing-fundamentals", "explorer", "unit-25", "4.7",  350),
  L("invfund-8",  "Bull vs Bear Markets",                 "Understand market cycles and how to stay calm during downturns",          "investing-fundamentals", "explorer", "unit-25", "4.8",  350),
  L("invfund-9",  "Reading a Stock Chart",                "Learn to interpret price history, volume, and key indicators",            "investing-fundamentals", "explorer", "unit-25", "4.9",  350),
  L("invfund-10", "Building Your First Portfolio",        "Design a simple portfolio based on your age, goals, and risk tolerance",  "investing-fundamentals", "explorer", "unit-25", "4.10", 350),

  // ─── LEVEL 2: BANKING & CREDIT ───

  // Unit 5: Banking Systems
  L("banking-1", "Checking vs Savings",    "Learn the difference between these key account types",  "banking", "explorer", "unit-4", "5.1",  300),
  L("banking-2", "How Banks Make Money",   "Discover the business model behind banking",            "banking", "explorer", "unit-4", "5.2",  300),
  L("banking-3", "FDIC",                   "Understand how your deposits are protected",            "banking", "explorer", "unit-4", "5.3",  350),
  L("banking-4", "Interest",               "Learn how banks pay you for keeping your money",        "banking", "explorer", "unit-4", "5.4",  350),
  L("banking-5", "Online vs Traditional",  "Compare digital and brick-and-mortar banking",          "banking", "builder",  "unit-4", "5.5",  500),
  L("banking-6", "Direct Deposit",         "Automate your paycheck for efficiency",                 "banking", "builder",  "unit-4", "5.6",  500),
  L("banking-7", "Overdrafts",             "Avoid costly overdraft fees and penalties",              "banking", "builder",  "unit-4", "5.7",  600),
  L("banking-8", "Fraud & Security",       "Protect your accounts from theft and scams",            "banking", "builder",  "unit-4", "5.8",  750),
  L("banking-9",  "IRAs, Roth IRAs & 529 Plans",          "Master tax-advantaged savings accounts for retirement and college",        "banking", "strategist", "unit-4", "5.9",  750),
  L("banking-10", "Your Employer's 401k & Benefits",       "Maximize employer match and understand how workplace benefits work",       "banking", "strategist", "unit-4", "5.10", 750),

  // Unit 6: Credit & Debt
  L("credit-1",  "What Is Credit",              "Understand what credit means and why it matters",         "credit-debt", "explorer", "unit-5", "6.1",  400),
  L("credit-2",  "Credit Scores",               "Learn how credit scores are calculated",                 "credit-debt", "explorer", "unit-5", "6.2",  400),
  L("credit-3",  "FICO",                        "Dive deep into the FICO scoring model",                  "credit-debt", "builder",  "unit-5", "6.3",  600),
  L("credit-4",  "Credit Cards",                "How credit cards work and how to use them wisely",        "credit-debt", "builder",  "unit-5", "6.4",  600),
  L("credit-5",  "APR vs APY",                  "Understand the difference between these interest measures", "credit-debt", "builder",  "unit-5", "6.5",  750),
  L("credit-6",  "Compound Interest on Debt",   "See how compounding works against you on debt",           "credit-debt", "builder",  "unit-5", "6.6",  750),
  L("credit-7",  "Student Loans",               "Navigate the world of student loan debt",                "credit-debt", "strategist","unit-5", "6.7",  850),
  L("credit-8",  "Mortgages",                   "Understand home loans and how they work",                 "credit-debt", "strategist","unit-5", "6.8",  900),
  L("credit-9",  "Auto Loans",                  "Make smart decisions about car financing",                "credit-debt", "strategist","unit-5", "6.9",  950),
  L("credit-10", "Snowball vs Avalanche",        "Compare two popular debt payoff strategies",              "credit-debt", "strategist","unit-5", "6.10", 1000),
  L("credit-11", "Getting Out of Debt: Counseling & Negotiation",  "Learn how to get help when debt becomes overwhelming",                   "credit-debt", "strategist", "unit-5", "6.11", 900),
  L("credit-12", "Bankruptcy: Last Resort or Fresh Start?",         "Understand when and how bankruptcy works and its long-term impact",       "credit-debt", "strategist", "unit-5", "6.12", 900),
  L("credit-13", "Mortgages: Buying a Home",                        "Navigate home loans, fixed vs variable rates, and down payments",         "credit-debt", "strategist", "unit-5", "6.13", 950),
  L("credit-14", "Your Rights as a Credit User",                    "Know the laws that protect you from predatory lending and collectors",    "credit-debt", "strategist", "unit-5", "6.14", 950),
  L("credit-15", "Your Free Annual Credit Report",                  "Learn how to check, read, and dispute errors on your credit report",      "credit-debt", "strategist", "unit-5", "6.15", 800),
  L("credit-16", "Paying for College: FAFSA, Grants & Loans",       "Navigate scholarships, grants, work-study, Bright Futures, and loans",   "credit-debt", "strategist", "unit-5", "6.16", 1000),
  L("credit-17", "How to Apply for a Loan",                         "Walk through a real loan application step by step",                      "credit-debt", "strategist", "unit-5", "6.17", 850),
  L("credit-18", "Federal vs Private Student Loans",                 "Compare subsidized, unsubsidized, PLUS, and private loans",              "credit-debt", "strategist", "unit-5", "6.18", 900),

  // Unit 35: Insurance & Protection
  L("ins-1",  "What Is Insurance & Why You Need It",     "Understand how insurance protects you from financial disasters",               "insurance-protection", "explorer",  "unit-35", "35.1",  300),
  L("ins-2",  "How Insurance Works: Premiums & Payouts", "Learn the mechanics of deductibles, premiums, co-pays, and coverage limits",   "insurance-protection", "explorer",  "unit-35", "35.2",  300),
  L("ins-3",  "Auto Insurance",                          "Understand the types of car insurance Florida requires and recommends",         "insurance-protection", "explorer",  "unit-35", "35.3",  350),
  L("ins-4",  "Renters & Homeowners Insurance",          "Protect your belongings and home from loss, theft, and disaster",              "insurance-protection", "explorer",  "unit-35", "35.4",  350),
  L("ins-5",  "Health Insurance",                        "Navigate health plans, networks, deductibles, and out-of-pocket costs",        "insurance-protection", "builder",   "unit-35", "35.5",  500),
  L("ins-6",  "Life & Disability Insurance",             "Learn when and why to get life and disability coverage",                       "insurance-protection", "builder",   "unit-35", "35.6",  500),
  L("ins-7",  "Identity Theft: Prevention & Recovery",   "Protect your personal information and know what to do if stolen",              "insurance-protection", "builder",   "unit-35", "35.7",  600),
  L("ins-8",  "Wills, Inheritance & Financial Planning", "Understand estate planning basics and how to build a long-term financial plan", "insurance-protection", "strategist","unit-35", "35.8",  750),

  // ─── LEVEL 3: INVESTING CORE ───

  // Unit 7: Intro to Investing
  L("invest-1",  "Why Investing Matters",  "Learn why investing is essential for building wealth",       "investing-intro", "builder",    "unit-6", "7.1",  750),
  L("invest-2",  "Inflation",             "Understand how inflation erodes your purchasing power",      "investing-intro", "builder",    "unit-6", "7.2",  750),
  L("invest-3",  "Simple vs Compound",    "Compare simple and compound interest",                      "investing-intro", "builder",    "unit-6", "7.3",  800),
  L("invest-4",  "Time Value of Money",   "A dollar today is worth more than a dollar tomorrow",       "investing-intro", "builder",    "unit-6", "7.4",  850),
  L("invest-5",  "Risk vs Return",        "Understand the fundamental investing trade-off",            "investing-intro", "builder",    "unit-6", "7.5",  900),
  L("invest-6",  "Opportunity Cost",      "Every investment choice has a hidden cost",                 "investing-intro", "strategist", "unit-6", "7.6",  1000),
  L("invest-7",  "Diversification",       "Don't put all your eggs in one basket",                     "investing-intro", "strategist", "unit-6", "7.7",  1000),
  L("invest-8",  "Long vs Short Term",    "Different time horizons require different strategies",      "investing-intro", "strategist", "unit-6", "7.8",  1100),
  L("invest-9",  "Accounts Overview",     "IRA, 401k, brokerage - what's what",                       "investing-intro", "strategist", "unit-6", "7.9",  1150),
  L("invest-10", "First Portfolio",        "Build your very first investment portfolio",                "investing-intro", "strategist", "unit-6", "7.10", 1250),
  L("invest-11", "Why Markets Need Regulators: SEC & the Fed", "Understand why the SEC, Federal Reserve, and other agencies regulate markets", "investing-intro", "strategist", "unit-6", "7.11", 600),
  L("invest-12", "Retirement & Education Accounts Deep Dive",  "Master 401k, 403b, IRA, Roth IRA, pension, 529, and Coverdell accounts",    "investing-intro", "strategist", "unit-6", "7.12", 650),

  // Unit 8: Stocks Explained
  L("stocks-1",  "What Is a Share",        "Discover how stocks let you own pieces of companies",      "stocks", "builder",    "unit-7", "8.1",  750),
  L("stocks-2",  "Public vs Private",      "Understand the difference between public and private",     "stocks", "builder",    "unit-7", "8.2",  800),
  L("stocks-3",  "IPOs",                   "Learn how companies go public",                            "stocks", "builder",    "unit-7", "8.3",  850),
  L("stocks-4",  "Market Cap",             "Size matters - understand market capitalization",           "stocks", "builder",    "unit-7", "8.4",  900),
  L("stocks-5",  "Dividends",              "Learn how companies share profits with shareholders",      "stocks", "strategist", "unit-7", "8.5",  1000),
  L("stocks-6",  "Why Prices Move",        "Discover what drives stock price changes",                 "stocks", "strategist", "unit-7", "8.6",  1000),
  L("stocks-7",  "Supply & Demand",        "The market forces that set stock prices",                  "stocks", "strategist", "unit-7", "8.7",  1100),
  L("stocks-8",  "Order Types",            "Market, limit, and stop orders explained",                 "stocks", "strategist", "unit-7", "8.8",  1100),
  L("stocks-9",  "Volatility",             "Understand price swings and what they mean",               "stocks", "strategist", "unit-7", "8.9",  1200),
  L("stocks-10", "Reading a Stock Page",   "Decode all the numbers on a stock detail page",            "stocks", "strategist", "unit-7", "8.10", 1250),

  // Unit 9: Stock Market System
  L("market-1",  "NYSE vs NASDAQ",     "Compare the two largest stock exchanges",           "stock-market", "builder",    "unit-8", "9.1",  800),
  L("market-2",  "Market Makers",      "Learn who keeps the markets running smoothly",      "stock-market", "builder",    "unit-8", "9.2",  850),
  L("market-3",  "Trading Hours",      "When can you buy and sell stocks?",                 "stock-market", "builder",    "unit-8", "9.3",  850),
  L("market-4",  "Bull vs Bear",       "Understand market cycles and trends",               "stock-market", "builder",    "unit-8", "9.4",  900),
  L("market-5",  "Liquidity",          "Why it matters how easily you can buy or sell",     "stock-market", "strategist", "unit-8", "9.5",  1000),
  L("market-6",  "After-Hours",        "Trading outside regular market hours",              "stock-market", "strategist", "unit-8", "9.6",  1050),
  L("market-7",  "Circuit Breakers",   "How markets protect against extreme crashes",       "stock-market", "strategist", "unit-8", "9.7",  1100),
  L("market-8",  "Insider Trading",    "The illegal side of stock trading",                 "stock-market", "strategist", "unit-8", "9.8",  1100),
  L("market-9",  "SEC Basics",         "The regulator that keeps markets fair",             "stock-market", "strategist", "unit-8", "9.9",  1200),
  L("market-10", "Market Indexes",     "S&P 500, Dow, Nasdaq - what they track",            "stock-market", "strategist", "unit-8", "9.10", 1250),

  // ─── LEVEL 4: PORTFOLIO STRATEGY ───

  // Unit 10: Portfolio Construction
  L("portfolio-1",  "Asset Allocation",       "How to divide your investments across categories",       "portfolio", "strategist", "unit-9", "10.1",  1500),
  L("portfolio-2",  "Risk Tolerance",         "Assess how much risk you can handle",                   "portfolio", "strategist", "unit-9", "10.2",  1600),
  L("portfolio-3",  "Diversification",        "Build a portfolio that weathers any storm",              "portfolio", "strategist", "unit-9", "10.3",  1700),
  L("portfolio-4",  "Dollar-Cost Averaging",  "Invest consistently regardless of market conditions",   "portfolio", "strategist", "unit-9", "10.4",  1800),
  L("portfolio-5",  "Rebalancing",            "Keep your portfolio aligned with your goals",            "portfolio", "strategist", "unit-9", "10.5",  1900),
  L("portfolio-6",  "Index Investing",        "The simplest way to match the market",                  "portfolio", "strategist", "unit-9", "10.6",  2000),
  L("portfolio-7",  "Active vs Passive",      "Is picking stocks worth the effort?",                   "portfolio", "investor",   "unit-9", "10.7",  2200),
  L("portfolio-8",  "Performance Tracking",   "Measure how well your investments are doing",            "portfolio", "investor",   "unit-9", "10.8",  2300),
  L("portfolio-9",  "Risk Management",        "Strategies to protect against big losses",               "portfolio", "investor",   "unit-9", "10.9",  2400),
  L("portfolio-10", "Wealth Building",        "Long-term strategies for growing your net worth",        "portfolio", "investor",   "unit-9", "10.10", 2500),

  // Unit 11: ETFs & Mutual Funds
  L("funds-1",  "What Is an ETF",       "Exchange-traded funds explained simply",              "etfs-funds", "strategist", "unit-10", "11.1",  1500),
  L("funds-2",  "Mutual Funds",         "How mutual funds pool investor money",                "etfs-funds", "strategist", "unit-10", "11.2",  1600),
  L("funds-3",  "Expense Ratios",       "The hidden cost of fund investing",                   "etfs-funds", "strategist", "unit-10", "11.3",  1700),
  L("funds-4",  "Index Funds",          "Low-cost funds that track the whole market",           "etfs-funds", "strategist", "unit-10", "11.4",  1800),
  L("funds-5",  "S&P 500",             "The most popular index fund explained",               "etfs-funds", "strategist", "unit-10", "11.5",  1900),
  L("funds-6",  "Sector ETFs",          "Invest in specific industries",                       "etfs-funds", "investor",   "unit-10", "11.6",  2000),
  L("funds-7",  "Bond ETFs",            "Fixed income investing made easy",                    "etfs-funds", "investor",   "unit-10", "11.7",  2100),
  L("funds-8",  "Target-Date Funds",    "Set it and forget it retirement investing",           "etfs-funds", "investor",   "unit-10", "11.8",  2200),
  L("funds-9",  "Fund Comparison",      "How to evaluate and compare funds",                   "etfs-funds", "investor",   "unit-10", "11.9",  2400),
  L("funds-10", "When to Use Funds",    "Choosing the right fund for your goals",              "etfs-funds", "investor",   "unit-10", "11.10", 2500),

  // Unit 12: Bonds & Fixed Income
  L("bonds-1", "What Is a Bond",       "Lending money to governments and companies",    "bonds", "strategist", "unit-11", "12.1", 1500),
  L("bonds-2", "Gov vs Corporate",     "Compare government and corporate bonds",        "bonds", "strategist", "unit-11", "12.2", 1600),
  L("bonds-3", "Yield",                "How bonds generate returns",                    "bonds", "strategist", "unit-11", "12.3", 1800),
  L("bonds-4", "Ratings",              "Understanding bond credit ratings",             "bonds", "strategist", "unit-11", "12.4", 1900),
  L("bonds-5", "Inflation Risk",       "How inflation affects bond returns",            "bonds", "investor",   "unit-11", "12.5", 2000),
  L("bonds-6", "Interest Rate Risk",   "Bond prices and interest rates move inversely", "bonds", "investor",   "unit-11", "12.6", 2200),
  L("bonds-7", "Duration",             "Measuring a bond's sensitivity to rate changes","bonds", "investor",   "unit-11", "12.7", 2300),
  L("bonds-8", "Bond Funds",           "Diversified bond investing through funds",      "bonds", "investor",   "unit-11", "12.8", 2400),
  L("bonds-9", "Fixed Income Role",    "How bonds fit in your overall portfolio",       "bonds", "investor",   "unit-11", "12.9", 2500),

  // ─── LEVEL 5: COMPANY ANALYSIS ───

  L("fin-stmt-1",  "Income Statement",     "Read a company's revenue and expenses",            "financial-statements", "investor", "unit-12", "13.1",  3000),
  L("fin-stmt-2",  "Revenue vs Profit",    "Why revenue alone doesn't tell the whole story",   "financial-statements", "investor", "unit-12", "13.2",  3200),
  L("fin-stmt-3",  "COGS",                 "Cost of goods sold explained",                     "financial-statements", "investor", "unit-12", "13.3",  3400),
  L("fin-stmt-4",  "Gross Margin",          "How much money a company keeps after costs",       "financial-statements", "investor", "unit-12", "13.4",  3500),
  L("fin-stmt-5",  "Operating Expenses",   "The costs of running a business day-to-day",       "financial-statements", "investor", "unit-12", "13.5",  3600),
  L("fin-stmt-6",  "Net Income",            "The bottom line - a company's true profit",        "financial-statements", "investor", "unit-12", "13.6",  3800),
  L("fin-stmt-7",  "Balance Sheet",         "Assets, liabilities, and equity explained",        "financial-statements", "capital-architect", "unit-12", "13.7",  4000),
  L("fin-stmt-8",  "Assets vs Liabilities", "What a company owns vs what it owes",              "financial-statements", "capital-architect", "unit-12", "13.8",  4200),
  L("fin-stmt-9",  "Cash Flow",             "Follow the money flowing in and out",              "financial-statements", "capital-architect", "unit-12", "13.9",  4500),
  L("fin-stmt-10", "Free Cash Flow",        "The cash a company has left after investments",    "financial-statements", "capital-architect", "unit-12", "13.10", 5000),

  L("ratios-1", "P/E",                  "Price-to-earnings ratio explained",           "financial-ratios", "investor",          "unit-13", "14.1", 3000),
  L("ratios-2", "EPS",                  "Earnings per share and what it means",        "financial-ratios", "investor",          "unit-13", "14.2", 3200),
  L("ratios-3", "Debt-to-Equity",       "How much a company relies on borrowed money", "financial-ratios", "investor",          "unit-13", "14.3", 3500),
  L("ratios-4", "Profit Margin",        "Measuring a company's efficiency",            "financial-ratios", "investor",          "unit-13", "14.4", 3800),
  L("ratios-5", "ROE",                  "Return on equity - shareholder value",        "financial-ratios", "capital-architect", "unit-13", "14.5", 4200),
  L("ratios-6", "Price-to-Sales",       "Another way to value a company",              "financial-ratios", "capital-architect", "unit-13", "14.6", 4500),
  L("ratios-7", "Valuation Multiples",  "Comparing companies using multiples",         "financial-ratios", "capital-architect", "unit-13", "14.7", 4800),
  L("ratios-8", "Ratio Interpretation", "Putting all the ratios together",             "financial-ratios", "capital-architect", "unit-13", "14.8", 5000),

  L("valuation-1", "Company Value Drivers", "What makes a company valuable",               "valuation", "investor",          "unit-14", "15.1", 3000),
  L("valuation-2", "Growth vs Value",       "Two fundamental investing philosophies",       "valuation", "investor",          "unit-14", "15.2", 3500),
  L("valuation-3", "Moats",                 "Competitive advantages that protect profits",  "valuation", "investor",          "unit-14", "15.3", 3800),
  L("valuation-4", "Market Expectations",   "How expectations drive stock prices",          "valuation", "capital-architect", "unit-14", "15.4", 4200),
  L("valuation-5", "Simplified DCF",        "Estimate a company's intrinsic value",         "valuation", "capital-architect", "unit-14", "15.5", 4500),
  L("valuation-6", "Intrinsic vs Market",   "When market price doesn't match true value",   "valuation", "capital-architect", "unit-14", "15.6", 4800),
  L("valuation-7", "Long-Term Investing",   "Building wealth through patient investing",    "valuation", "capital-architect", "unit-14", "15.7", 5000),

  // ─── LEVEL 6: BEHAVIORAL FINANCE ───

  L("behavior-1", "Loss Aversion",       "Why losses hurt more than gains feel good",      "behavioral-finance", "strategist", "unit-15", "16.1", 1500),
  L("behavior-2", "Anchoring",           "How first impressions bias your decisions",      "behavioral-finance", "strategist", "unit-15", "16.2", 1700),
  L("behavior-3", "Confirmation Bias",   "Only seeing what you want to see",              "behavioral-finance", "strategist", "unit-15", "16.3", 1900),
  L("behavior-4", "Overconfidence",      "When too much confidence hurts your portfolio", "behavioral-finance", "strategist", "unit-15", "16.4", 2100),
  L("behavior-5", "Herd Behavior",       "Following the crowd in investing",              "behavioral-finance", "investor",   "unit-15", "16.5", 2300),
  L("behavior-6", "FOMO",                "Fear of missing out and reckless investing",     "behavioral-finance", "investor",   "unit-15", "16.6", 2500),
  L("behavior-7", "Emotional Trading",   "Making decisions with your heart, not head",     "behavioral-finance", "investor",   "unit-15", "16.7", 2800),
  L("behavior-8", "Avoiding Traps",      "Strategies to overcome behavioral biases",       "behavioral-finance", "investor",   "unit-15", "16.8", 3000),

  L("bubble-1", "Tulip Mania",           "The world's first speculative bubble",          "bubbles-crashes", "strategist", "unit-16", "17.1", 1500),
  L("bubble-2", "Dot-Com",               "The internet bubble of the late 1990s",         "bubbles-crashes", "strategist", "unit-16", "17.2", 1800),
  L("bubble-3", "2008 Crisis",           "The housing crash that rocked the world",       "bubbles-crashes", "investor",   "unit-16", "17.3", 2200),
  L("bubble-4", "COVID Crash",           "Markets during a global pandemic",              "bubbles-crashes", "investor",   "unit-16", "17.4", 2500),
  L("bubble-5", "Speculation Cycles",    "Recognizing patterns in market manias",         "bubbles-crashes", "investor",   "unit-16", "17.5", 2700),
  L("bubble-6", "Corrections",           "Normal market pullbacks vs crashes",            "bubbles-crashes", "investor",   "unit-16", "17.6", 2800),
  L("bubble-7", "Unsustainable Growth",  "When growth is too good to be true",            "bubbles-crashes", "investor",   "unit-16", "17.7", 3000),

  // ─── LEVEL 7: MACRO ECONOMICS ───

  L("macro-1", "Inflation",         "How rising prices affect your money",               "macro-economics", "investor",          "unit-17", "18.1", 3000),
  L("macro-2", "CPI",               "Measuring inflation with the consumer price index", "macro-economics", "investor",          "unit-17", "18.2", 3500),
  L("macro-3", "Federal Reserve",   "The central bank that controls money supply",       "macro-economics", "investor",          "unit-17", "18.3", 3800),
  L("macro-4", "Monetary Policy",   "How the Fed uses tools to manage the economy",      "macro-economics", "investor",          "unit-17", "18.4", 4000),
  L("macro-5", "Rate Changes",      "What happens when interest rates go up or down",    "macro-economics", "capital-architect", "unit-17", "18.5", 4500),
  L("macro-6", "Stock Impact",      "How macro conditions affect stock prices",           "macro-economics", "capital-architect", "unit-17", "18.6", 4800),
  L("macro-7", "Bond Impact",       "How interest rates move bond prices",               "macro-economics", "capital-architect", "unit-17", "18.7", 5000),

  L("indicators-1", "GDP",                   "Measuring the total output of an economy",     "economic-indicators", "investor",          "unit-18", "19.1", 3000),
  L("indicators-2", "Unemployment",          "What the jobless rate tells us",                "economic-indicators", "investor",          "unit-18", "19.2", 3300),
  L("indicators-3", "Consumer Confidence",   "How optimism drives the economy",              "economic-indicators", "investor",          "unit-18", "19.3", 3600),
  L("indicators-4", "Retail Sales",          "Tracking consumer spending trends",             "economic-indicators", "investor",          "unit-18", "19.4", 3800),
  L("indicators-5", "Housing",               "The real estate market as an economic indicator","economic-indicators", "investor",         "unit-18", "19.5", 4000),
  L("indicators-6", "Recessions",            "When the economy shrinks - causes and effects", "economic-indicators", "capital-architect", "unit-18", "19.6", 4500),
  L("indicators-7", "Leading vs Lagging",    "Predicting vs confirming economic trends",      "economic-indicators", "capital-architect", "unit-18", "19.7", 5000),

  // ─── LEVEL 8: ENTREPRENEURSHIP ───

  L("biz-1", "Revenue Models",      "How businesses make money",                          "entrepreneurship", "investor",          "unit-19", "20.1", 3000),
  L("biz-2", "Cost Structure",      "Understanding fixed and variable business costs",    "entrepreneurship", "investor",          "unit-19", "20.2", 3500),
  L("biz-3", "Break-Even",          "When a business starts making profit",               "entrepreneurship", "investor",          "unit-19", "20.3", 3800),
  L("biz-4", "Margins",             "Measuring business profitability",                   "entrepreneurship", "investor",          "unit-19", "20.4", 4000),
  L("biz-5", "Funding",             "How startups raise capital",                          "entrepreneurship", "capital-architect", "unit-19", "20.5", 4500),
  L("biz-6", "Pricing",             "Setting the right price for products and services",  "entrepreneurship", "capital-architect", "unit-19", "20.6", 4800),
  L("biz-7", "Business Planning",   "Creating a roadmap for business success",            "entrepreneurship", "capital-architect", "unit-19", "20.7", 5000),

  L("strategy-1", "Market Share",          "Winning customers in a competitive market",         "competitive-strategy", "investor",          "unit-20", "21.1", 3500),
  L("strategy-2", "Pricing Power",         "The ability to raise prices without losing customers","competitive-strategy", "investor",         "unit-20", "21.2", 3800),
  L("strategy-3", "Economies of Scale",    "Getting cheaper as you get bigger",                 "competitive-strategy", "investor",          "unit-20", "21.3", 4000),
  L("strategy-4", "Network Effects",       "Products that get better with more users",          "competitive-strategy", "capital-architect", "unit-20", "21.4", 4500),
  L("strategy-5", "Brand Value",           "The power of a trusted brand",                     "competitive-strategy", "capital-architect", "unit-20", "21.5", 4800),
  L("strategy-6", "Sustainable Advantage", "Building moats that last",                          "competitive-strategy", "capital-architect", "unit-20", "21.6", 5000),

  // Unit 22: Business Management & Strategy
  L("mgmt-1", "What Managers Actually Do",           "Learn the four functions of management - planning, organizing, leading, controlling",       "business-management", "builder", "unit-26", "22.1", 400),
  L("mgmt-2", "Leadership Styles",                   "Explore autocratic, democratic, and laissez-faire leadership and when each works",          "business-management", "builder", "unit-26", "22.2", 400),
  L("mgmt-3", "Organizational Structure",            "Understand flat vs hierarchical structures, spans of control, and org charts",              "business-management", "builder", "unit-26", "22.3", 425),
  L("mgmt-4", "SWOT Analysis",                       "Use strengths, weaknesses, opportunities, and threats as a decision framework",             "business-management", "builder", "unit-26", "22.4", 425),
  L("mgmt-5", "Porter's Five Forces",                "Analyze competitive dynamics using Porter's framework",                                     "business-management", "strategist", "unit-26", "22.5", 450),
  L("mgmt-6", "KPIs & Measuring Performance",        "Learn what key performance indicators are and how businesses choose them",                  "business-management", "strategist", "unit-26", "22.6", 450),
  L("mgmt-7", "Human Resources & Hiring",            "Understand recruitment, onboarding, retention, and why hiring wrong costs more",            "business-management", "strategist", "unit-26", "22.7", 475),
  L("mgmt-8", "Ethics in Business Decision-Making",  "Explore stakeholder theory, reputational risk, and long-term thinking",                    "business-management", "strategist", "unit-26", "22.8", 500),

  // Unit 23: Marketing
  L("mkt-1", "What Marketing Actually Is",           "Marketing vs advertising and the goal of creating and communicating value",                 "marketing", "explorer", "unit-27", "23.1", 300),
  L("mkt-2", "Understanding Your Customer",          "Target markets, customer segmentation, demographics vs psychographics",                     "marketing", "explorer", "unit-27", "23.2", 300),
  L("mkt-3", "Market Research",                      "Primary vs secondary research, surveys, focus groups, and reducing risk with data",         "marketing", "explorer", "unit-27", "23.3", 325),
  L("mkt-4", "The 4 Ps: Product & Price",            "Product differentiation and pricing strategies - cost-plus, value-based, competitive",     "marketing", "explorer", "unit-27", "23.4", 325),
  L("mkt-5", "The 4 Ps: Place & Promotion",          "Distribution channels, organic vs paid marketing, and reaching your audience",             "marketing", "explorer", "unit-27", "23.5", 350),
  L("mkt-6", "Branding",                             "What a brand really is, brand voice, consistency, trust, and brand equity",                "marketing", "explorer", "unit-27", "23.6", 350),
  L("mkt-7", "Consumer Decision-Making",             "The buyer journey - awareness, consideration, decision, and loyalty",                      "marketing", "explorer", "unit-27", "23.7", 375),
  L("mkt-8", "Testing Your Ideas",                   "Hypothesis testing, A/B testing, MVPs, and using data to iterate",                         "marketing", "explorer", "unit-27", "23.8", 400),

  // Unit 24: Consumer Behavior
  L("cb-1", "What Is Consumer Behavior",              "Why understanding how people buy is the foundation of every successful business",           "consumer-behavior", "explorer", "unit-28", "24.1", 2000),
  L("cb-2", "The Decision-Making Process",            "The five stages every buyer goes through - from need recognition to post-purchase",         "consumer-behavior", "explorer", "unit-28", "24.2", 2100),
  L("cb-3", "Psychological Factors",                  "How motivation, perception, learning, and attitudes drive purchase decisions",              "consumer-behavior", "explorer", "unit-28", "24.3", 2200),
  L("cb-4", "Social & Cultural Influences",           "Family, friends, culture, and social class shape what and why people buy",                  "consumer-behavior", "explorer", "unit-28", "24.4", 2200),
  L("cb-5", "Market Segmentation",                    "Dividing markets by demographics, psychographics, geography, and behavior",                "consumer-behavior", "explorer", "unit-28", "24.5", 2300),
  L("cb-6", "Target Markets & Buyer Personas",        "Selecting the right audience and building detailed profiles of ideal customers",            "consumer-behavior", "explorer", "unit-28", "24.6", 2300),
  L("cb-7", "Brand Loyalty vs Brand Switching",       "What makes customers stay loyal and what pushes them to switch brands",                     "consumer-behavior", "explorer", "unit-28", "24.7", 2400),
  L("cb-8", "Case Study: How Nike Uses Consumer Research", "How a real brand applies consumer behavior insights to dominate its market",           "consumer-behavior", "explorer", "unit-28", "24.8", 2500),

  // Unit 25: The Marketing Mix - 4 Ps
  L("mix-1", "What Is the Marketing Mix",              "Why businesses use the 4 Ps framework to plan and execute their strategy",                 "marketing-mix", "explorer", "unit-29", "25.1", 2200),
  L("mix-2", "Product",                                "Features, branding, packaging, and the product life cycle",                                "marketing-mix", "explorer", "unit-29", "25.2", 2300),
  L("mix-3", "Price",                                  "Cost-based, value-based, competitive, and penetration pricing strategies",                 "marketing-mix", "explorer", "unit-29", "25.3", 2400),
  L("mix-4", "Place",                                  "Distribution channels, supply chain basics, and physical vs digital channels",             "marketing-mix", "explorer", "unit-29", "25.4", 2500),
  L("mix-5", "Promotion",                              "Advertising, social media, PR, and integrated marketing communication",                    "marketing-mix", "explorer", "unit-29", "25.5", 2600),
  L("mix-6", "How the 4 Ps Work Together",             "Trade-offs, interdependencies, and balancing the marketing mix",                           "marketing-mix", "explorer", "unit-29", "25.6", 2600),
  L("mix-7", "Startup vs Established Brand",           "Applying the 4 Ps differently depending on company stage and resources",                  "marketing-mix", "explorer", "unit-29", "25.7", 2700),
  L("mix-8", "Build Your Own Marketing Mix",           "Design a complete marketing mix for a fictional product from scratch",                     "marketing-mix", "explorer", "unit-29", "25.8", 2700),

  // Unit 26: Market Research
  L("mr-1", "Why Market Research Matters",             "What market research is and why businesses cannot afford to skip it",                       "market-research", "explorer", "unit-30", "26.1", 2000),
  L("mr-2", "Primary Research Methods",                "Surveys, interviews, focus groups, and observations - collecting your own data",            "market-research", "explorer", "unit-30", "26.2", 2200),
  L("mr-3", "Secondary Research",                      "Using existing data, government sources, and industry reports to understand markets",       "market-research", "explorer", "unit-30", "26.3", 2200),
  L("mr-4", "Qualitative vs Quantitative",             "When to use open-ended exploration versus numerical data - and how to combine both",        "market-research", "explorer", "unit-30", "26.4", 2300),
  L("mr-5", "Reading & Interpreting Data",             "How to read charts, spot trends, identify outliers, and avoid common data mistakes",        "market-research", "explorer", "unit-30", "26.5", 2400),
  L("mr-6", "Market Sizing - TAM, SAM, SOM",          "Total addressable market, serviceable market, and obtainable market explained simply",      "market-research", "explorer", "unit-30", "26.6", 2400),
  L("mr-7", "Case Study: Research-Driven Launch",      "How a company used market research to successfully launch or pivot a product",              "market-research", "explorer", "unit-30", "26.7", 2500),

  // Unit 27: Leadership & Management
  L("lm-1", "Leadership vs Management",            "The difference between leadership and management and why both matter",                    "leadership-management", "explorer", "unit-31", "27.1", 2200),
  L("lm-2", "Leadership Styles",                   "Autocratic, democratic, laissez-faire, and transformational approaches",                  "leadership-management", "explorer", "unit-31", "27.2", 2300),
  L("lm-3", "Motivation Theories",                 "Maslow's hierarchy of needs and Herzberg's two-factor theory explained",                  "leadership-management", "explorer", "unit-31", "27.3", 2400),
  L("lm-4", "Organizational Structures",           "Flat vs hierarchical, functional vs divisional - how companies organize",                "leadership-management", "explorer", "unit-31", "27.4", 2500),
  L("lm-5", "Human Resources Basics",              "Hiring, training, performance reviews, and keeping great employees",                      "leadership-management", "explorer", "unit-31", "27.5", 2500),
  L("lm-6", "Conflict Resolution & Communication", "Managing disagreements and building healthy team communication",                          "leadership-management", "explorer", "unit-31", "27.6", 2600),
  L("lm-7", "Case Study: Satya Nadella at Microsoft", "How one leader transformed Microsoft's culture, strategy, and market value",           "leadership-management", "explorer", "unit-31", "27.7", 2500),

  // Unit 28: Strategic Analysis Tools
  L("sa-1", "What Is Business Strategy?",              "Learn why strategy matters and how companies use it to win",                          "strategic-analysis", "explorer", "unit-32", "28.1", 2500),
  L("sa-2", "KPIs - Measuring What Matters",           "Understand key performance indicators and how to choose the right ones",              "strategic-analysis", "explorer", "unit-32", "28.2", 2500),
  L("sa-3", "SWOT Analysis",                           "Learn to evaluate strengths, weaknesses, opportunities, and threats",                "strategic-analysis", "explorer", "unit-32", "28.3", 2750),
  L("sa-4", "Porter's Five Forces",                    "Analyze industry competition through five structural forces",                        "strategic-analysis", "explorer", "unit-32", "28.4", 2750),
  L("sa-5", "Applying SWOT to a Business Opportunity", "Use SWOT to make real go/no-go strategic decisions",                                "strategic-analysis", "explorer", "unit-32", "28.5", 2750),
  L("sa-6", "Porter's Five Forces in Practice",        "Apply Porter's framework to the streaming and fast food industries",                 "strategic-analysis", "explorer", "unit-32", "28.6", 2750),
  L("sa-7", "Using Frameworks for Real Decisions",     "Learn how companies combine SWOT and Porter's to guide strategy",                    "strategic-analysis", "explorer", "unit-32", "28.7", 3000),
  L("sa-8", "Mini-Project: Your Own Strategic Analysis","Run a full SWOT and Porter's analysis on a business of your choice",                "strategic-analysis", "explorer", "unit-32", "28.8", 3000),

  // ─── LEVEL 9: ADVANCED INVESTING ───


  L("options-1", "Calls vs Puts",   "The two types of options contracts",      "options", "capital-architect", "unit-21", "31.1", 7500),
  L("options-2", "Strike Price",    "The price at which you can buy or sell",  "options", "capital-architect", "unit-21", "31.2", 8500),
  L("options-3", "Expiration",      "When options contracts expire",           "options", "capital-architect", "unit-21", "31.3", 9500),
  L("options-4", "Hedging",         "Using options to protect your portfolio", "options", "capital-architect", "unit-21", "31.4", 11000),
  L("options-5", "Risk",            "Understanding the risks of options trading","options","capital-architect","unit-21", "31.5", 12000),

  L("alt-1", "Real Estate",      "Investing in property for income and growth",        "alternatives", "capital-architect", "unit-22", "32.1", 7500),
  L("alt-2", "REITs",            "Real estate investing without buying property",      "alternatives", "capital-architect", "unit-22", "32.2", 8500),
  L("alt-3", "Commodities",      "Gold, oil, and other physical assets",               "alternatives", "capital-architect", "unit-22", "32.3", 10000),
  L("alt-4", "Crypto (Educational)","Understanding cryptocurrency as an asset class", "alternatives", "capital-architect", "unit-22", "32.4", 11000),
  L("alt-5", "Private Equity",   "Investing in non-public companies",                  "alternatives", "capital-architect", "unit-22", "32.5", 13000),
  L("alt-6", "Liquidity Risk",   "The danger of investments you can't easily sell",    "alternatives", "capital-architect", "unit-22", "32.6", 15000),

  // ─── PESTEL Analysis (Unit 33) ───
  L("pestel-1", "What is PESTEL Analysis",      "Learn how businesses scan their external environment using the PESTEL framework",           "pestel-analysis", "explorer", "unit-33", "29.1", 2000),
  L("pestel-2", "Political Factors",             "How government policy, regulation, and trade agreements shape business strategy",           "pestel-analysis", "explorer", "unit-33", "29.2", 2200),
  L("pestel-3", "Economic Factors",              "GDP, interest rates, inflation, and business cycles - the financial climate around business","pestel-analysis", "explorer", "unit-33", "29.3", 2400),
  L("pestel-4", "Social Factors",                "Demographics, culture, and consumer attitudes that drive market demand",                   "pestel-analysis", "explorer", "unit-33", "29.4", 2400),
  L("pestel-5", "Technological Factors",         "Innovation, automation, and digital disruption - how technology transforms industries",     "pestel-analysis", "explorer", "unit-33", "29.5", 2500),
  L("pestel-6", "Environmental & Legal Factors", "Sustainability, climate risk, employment law, and consumer protection",                    "pestel-analysis", "explorer", "unit-33", "29.6", 2500),

  // ─── Business Ethics & Social Responsibility (Unit 34) ───
  L("ethics-1", "What is Business Ethics",                 "Why ethics matters beyond just following the law",                              "business-ethics", "explorer", "unit-34", "30.1", 1800),
  L("ethics-2", "Corporate Social Responsibility",         "CSR - definition, examples, and the trade-offs businesses face",               "business-ethics", "explorer", "unit-34", "30.2", 2000),
  L("ethics-3", "Stakeholder Theory",                      "Who businesses are responsible to beyond shareholders",                         "business-ethics", "explorer", "unit-34", "30.3", 2000),
  L("ethics-4", "Ethical Dilemmas in Business",            "How to reason through hard decisions using ethical frameworks",                 "business-ethics", "explorer", "unit-34", "30.4", 2000),
  L("ethics-5", "Business Ethics and the Law",             "Where ethics and legal requirements overlap or diverge",                        "business-ethics", "explorer", "unit-34", "30.5", 2200),
  L("ethics-6", "Case Study: Enron & Volkswagen",         "Major ethical failures and what we can learn from them",                         "business-ethics", "explorer", "unit-34", "30.6", 2000),

  // ─── LEVEL 10: REAL-WORLD APPLICATION ───

  L("plan-1", "Goal Setting",           "Define your financial goals for the next decade",      "financial-planning", "capital-architect", "unit-23", "33.1", 10000),
  L("plan-2", "Retirement Accounts",    "401k, IRA, Roth - choosing the right accounts",       "financial-planning", "capital-architect", "unit-23", "33.2", 11000),
  L("plan-3", "Compounding",            "The magic of compound growth over decades",            "financial-planning", "capital-architect", "unit-23", "33.3", 12000),
  L("plan-4", "Inflation Adjustments",  "Planning for rising costs over time",                  "financial-planning", "capital-architect", "unit-23", "33.4", 13000),
  L("plan-5", "Lifestyle Planning",     "Aligning your finances with your life goals",          "financial-planning", "capital-architect", "unit-23", "33.5", 15000),

  L("sim-1", "Bear Market Survival",    "Navigate a simulated market crash",                   "simulations", "capital-architect", "unit-24", "34.1", 10000),
  L("sim-2", "Bull Run Strategy",       "Maximize gains in a rising market",                   "simulations", "capital-architect", "unit-24", "34.2", 11000),
  L("sim-3", "Sector Rotation",         "Shift investments based on economic cycles",          "simulations", "capital-architect", "unit-24", "34.3", 12000),
  L("sim-4", "Crisis Response",         "React to unexpected market events",                   "simulations", "capital-architect", "unit-24", "34.4", 13000),
  L("sim-5", "Retirement Simulation",   "Plan withdrawals during a 30-year retirement",        "simulations", "capital-architect", "unit-24", "34.5", 14000),
  L("sim-6", "Balanced Portfolio Build", "Create a well-diversified long-term portfolio",       "simulations", "capital-architect", "unit-24", "34.6", 15000),
]

// ═══════════════════════════════════════════════
// CATEGORY INFO
// ═══════════════════════════════════════════════

export const categoryInfo: Record<LessonCategory, { title: string; icon: string; description: string; color: string }> = {
  economics: { title: "Economics", icon: "TrendingUp", description: "Understand market forces", color: "accent" },
  "balance-sheets": { title: "Balance Sheets", icon: "FileSpreadsheet", description: "Read financial statements", color: "warning" },
  "debt-management": { title: "Debt Management", icon: "CreditCard", description: "Handle debt responsibly", color: "secondary" },
  "psychology-of-money": { title: "Psychology of Money", icon: "Brain", description: "Understand your money mindset", color: "accent" },
  "income-earning": { title: "Income & Earning", icon: "DollarSign", description: "Maximize your earning power", color: "primary" },
  budgeting: { title: "Budgeting", icon: "Wallet", description: "Master personal finance planning", color: "primary" },
  banking: { title: "Banking", icon: "Building", description: "Navigate the banking system", color: "secondary" },
  "credit-debt": { title: "Credit & Debt", icon: "CreditCard", description: "Handle credit responsibly", color: "warning" },
  "investing-intro": { title: "Investing Intro", icon: "Sprout", description: "Start your investing journey", color: "success" },
  stocks: { title: "Stocks", icon: "LineChart", description: "Learn stock market basics", color: "success" },
  "stock-market": { title: "Stock Market", icon: "BarChart3", description: "How markets work", color: "success" },
  portfolio: { title: "Portfolio", icon: "PieChart", description: "Build and manage portfolios", color: "primary" },
  "etfs-funds": { title: "ETFs & Funds", icon: "Layers", description: "Diversified fund investing", color: "accent" },
  bonds: { title: "Bonds", icon: "Shield", description: "Fixed income investing", color: "secondary" },
  "financial-statements": { title: "Financial Statements", icon: "FileSpreadsheet", description: "Read company financials", color: "warning" },
  "financial-ratios": { title: "Financial Ratios", icon: "Calculator", description: "Analyze company performance", color: "warning" },
  valuation: { title: "Valuation", icon: "Target", description: "Determine company value", color: "accent" },
  "behavioral-finance": { title: "Behavioral Finance", icon: "Brain", description: "Psychology of investing", color: "accent" },
  "bubbles-crashes": { title: "Bubbles & Crashes", icon: "AlertTriangle", description: "Learn from market history", color: "destructive" },
  "macro-economics": { title: "Macro Economics", icon: "Globe", description: "Big-picture economic forces", color: "primary" },
  "economic-indicators": { title: "Economic Indicators", icon: "Activity", description: "Track economic health", color: "primary" },
  entrepreneurship: { title: "Entrepreneurship", icon: "Rocket", description: "Start and run a business", color: "success" },
  "competitive-strategy": { title: "Competitive Strategy", icon: "Swords", description: "Win in the marketplace", color: "success" },
  options: { title: "Options", icon: "ArrowUpDown", description: "Advanced derivatives trading", color: "warning" },
  alternatives: { title: "Alternatives", icon: "Gem", description: "Beyond stocks and bonds", color: "accent" },
  "financial-planning": { title: "Financial Planning", icon: "Map", description: "Plan your financial future", color: "primary" },
  simulations: { title: "Simulations", icon: "Gamepad2", description: "Practice with market scenarios", color: "success" },
  "investing-fundamentals": { title: "Investing Fundamentals", icon: "TrendingUp", description: "Core investing concepts", color: "success" },
  "business-management": { title: "Business Management", icon: "Briefcase", description: "Management and strategic thinking", color: "primary" },
  marketing: { title: "Marketing", icon: "Megaphone", description: "Reach and persuade your audience", color: "success" },
  "consumer-behavior": { title: "Consumer Behavior", icon: "Users", description: "Understand how and why people buy", color: "accent" },
  "marketing-mix": { title: "The Marketing Mix", icon: "Combine", description: "Master the 4 Ps of marketing strategy", color: "success" },
  "market-research": { title: "Market Research", icon: "Search", description: "Data-driven decisions for business strategy", color: "primary" },
  "leadership-management": { title: "Leadership & Management", icon: "Crown", description: "Lead teams and build effective organizations", color: "primary" },
  "strategic-analysis": { title: "Strategic Analysis", icon: "Crosshair", description: "SWOT, Porter's Five Forces, and KPI frameworks", color: "primary" },
  "pestel-analysis": { title: "PESTEL Analysis", icon: "Globe", description: "Political, Economic, Social, Technological, Environmental & Legal factors", color: "primary" },
  "business-ethics": { title: "Business Ethics", icon: "Scale", description: "Ethics, CSR, and responsible business decision-making", color: "accent" },
  "insurance-protection": { title: "Insurance & Protection", icon: "ShieldCheck", description: "Protect yourself, your money, and your future", color: "secondary" },
  // Gulliver Introduction to Business categories (Byrnes Ch. 1-2)
  "gulliver-business": { title: "Business & Its Environment", icon: "Briefcase", description: "What a business is and the forces around it", color: "primary" },
  "gulliver-economics": { title: "How the Economy Works", icon: "TrendingUp", description: "Economics, markets, and economic policy", color: "accent" },
  // AP Microeconomics categories - required by Record<LessonCategory, …>
  "micro-basics": { title: "Micro: Basic Concepts", icon: "TrendingUp", description: "Scarcity, opportunity cost, and the PPC", color: "accent" },
  "micro-supply-demand": { title: "Micro: Supply & Demand", icon: "LineChart", description: "Markets, equilibrium, elasticity, and surplus", color: "primary" },
  "micro-production": { title: "Micro: Production & Costs", icon: "Factory", description: "Costs, perfect competition, and profit", color: "warning" },
  "micro-imperfect": { title: "Micro: Imperfect Competition", icon: "Building2", description: "Monopoly, oligopoly, and game theory", color: "secondary" },
  "micro-factor-markets": { title: "Micro: Factor Markets", icon: "Users", description: "Labor markets and resource pricing", color: "primary" },
  "micro-market-failure": { title: "Micro: Market Failure", icon: "AlertTriangle", description: "Externalities, public goods, and the role of government", color: "accent" },
}

export function getLessonsByCategory(category: LessonCategory): Lesson[] {
  return lessons.filter(lesson => lesson.category === category)
}

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons.filter(lesson => lesson.unitId === unitId)
}

export function getUnitRewardTotal(unitId: string): number {
  return getLessonsByUnit(unitId).reduce((sum, l) => sum + l.reward, 0)
}

// Lessons belonging to a given CourseTrack. Untagged lessons are the default
// "regular" course. Used e.g. by the teacher dashboard to scope the
// assignable-lesson list to the teacher's program (a Gulliver Intro teacher
// only assigns the 8 LO lessons, not the whole regular curriculum).
export function getLessonsByTrack(track: CourseTrack): Lesson[] {
  return lessons.filter(l => (l.track ?? "regular") === track)
}

// ═══════════════════════════════════════════════
// AP MICROECONOMICS - additive elective track
// Appended to the shared arrays so the existing lesson UI, routing, and
// gamification work unchanged. Everything else filters by `track`, so the
// Florida (default) track is unaffected.
// ═══════════════════════════════════════════════
unitInfo.push(...AP_MICRO_UNITS)
lessons.push(...AP_MICRO_LESSONS)

// ═══════════════════════════════════════════════
// GULLIVER INTRODUCTION TO BUSINESS - course-content track
// Byrnes Ch. 1-2, six 85-minute blocks. Surfaced only to students enrolled in
// the `gulliver_intro` program (profiles.track); tagged CourseTrack
// "gulliver-intro" so it's filtered out of every other track's course view.
// Hand-authored StructuredLessonContent (primer + checkpoints + exit ticket +
// practice pool) lives in src/content/gullerIntro and is keyed by these ids.
// Lessons use the "investor" tier so the adaptive engine never benchmark-skips
// a block - all six always appear, in order, as required lessons.
// ═══════════════════════════════════════════════
// One combined unit so every lesson (Chapters 1-2) sits on a single continuous
// roller coaster. Lessons keep their own category for per-topic mastery.
export const GULLIVER_INTRO_UNITS: UnitInfo[] = [
  { id: "gulliver-course", unitNumber: 1, title: "Introduction to Business", level: 1, levelTitle: "Gulliver · Intro to Business", categories: ["gulliver-business"], orderIndex: 200, track: "gulliver-intro" },
]

// L() applies LESSON_REWARD_SCALE; wrap it to also tag the CourseTrack.
const GI = (id: string, title: string, description: string, category: LessonCategory, unitId: string, lessonNum: string, reward: number): Lesson =>
  ({ ...L(id, title, description, category, "investor", unitId, lessonNum, reward), track: "gulliver-intro" })

export const GULLIVER_INTRO_LESSONS: Lesson[] = [
  // Chapter 1 — learning-objective-aligned lessons (Byrnes Ch.1, LO 1-1 through 1-8).
  // These 8 LO lessons are the active course. The earlier topic-based breakdown
  // (gulliver-1-x / gulliver-2-x / gulliver-3..6) has been retired from the
  // course listing during the LO-alignment rebuild; its content files remain in
  // src/content/gullerIntro and can be re-registered here if needed.
  GI("gulliver-lo-1-1", "LO 1", "The relationship between profit and risk, and how businesses and nonprofits raise the standard of living for everyone.", "gulliver-business", "gulliver-course", "1.1-LO", 250),
  GI("gulliver-lo-1-2", "LO 2", "Entrepreneurship vs. working for someone else, the five factors of production, and how they create wealth.", "gulliver-business", "gulliver-course", "1.2-LO", 250),
  GI("gulliver-lo-1-3", "LO 3", "How government, taxes, and regulation shape the risk of starting and running a business.", "gulliver-business", "gulliver-course", "1.3-LO", 250),
  GI("gulliver-lo-1-4", "LO 4", "Effectiveness, efficiency, and productivity — how technology benefits workers, businesses, and consumers.", "gulliver-business", "gulliver-course", "1.4-LO", 250),
  GI("gulliver-lo-1-5", "LO 5", "Competitive edge, zero defects, exceeding customer expectations, and empowering frontline workers.", "gulliver-business", "gulliver-course", "1.5-LO", 250),
  GI("gulliver-lo-1-6", "LO 6", "The modern, broader definition of diversity, and how an aging population and Social Security affect business.", "gulliver-business", "gulliver-course", "1.6-LO", 250),
  GI("gulliver-lo-1-7", "LO 7", "China and India as competitive challenges, and how war and terrorism affect different industries.", "gulliver-business", "gulliver-course", "1.7-LO", 250),
  GI("gulliver-lo-1-8", "LO 8", "How past economic trends repeat, and what they mean for tomorrow's college graduates.", "gulliver-business", "gulliver-course", "1.8-LO", 250),
]

unitInfo.push(...GULLIVER_INTRO_UNITS)
lessons.push(...GULLIVER_INTRO_LESSONS)

// Units belonging to a given track. Untagged units are the default "regular" course.
export function getUnitsByTrack(track: CourseTrack = "regular"): UnitInfo[] {
  return unitInfo.filter(u => (u.track ?? "regular") === track)
}

export function getUnitTrack(unitId: string): CourseTrack {
  return unitInfo.find(u => u.id === unitId)?.track ?? "regular"
}
