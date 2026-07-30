import { QuizQuestion } from "@/types"
import { LessonCategory } from "@/types"

export interface UnitTest {
  category: LessonCategory
  title: string
  description: string
  passingScore: number // percentage needed to pass
  reward: number // Jeff's coins earned
  questions: QuizQuestion[]
}

export const unitTests: UnitTest[] = [
  {
    category: "budgeting",
    title: "Budgeting Mastery Exam",
    description: "Prove your budgeting knowledge with this comprehensive 25-question exam. Score 80% or higher to earn 200 Jeff's!",
    passingScore: 80,
    reward: 200,
    questions: [
      {
        id: "ut-b-1",
        question: "A family earns $5,000/month. Using the 50/30/20 rule, how much should they allocate to 'wants'?",
        options: [
          "$1,500 representing 30% of their gross monthly income",
          "$2,500 representing 50% of their gross monthly income",
          "$500 representing 10% of their gross monthly income",
          "$1,000 representing 20% of their gross monthly income"
        ],
        correctAnswer: 0,
        explanation: "Wants = 30% of income. $5,000 × 0.30 = $1,500. $2,500 would be 50% (that's for needs like rent, food, utilities). $1,000 would be 20% (for savings). Remember: 50% needs, 30% wants, 20% savings/debt repayment."
      },
      {
        id: "ut-b-2",
        question: "Which scenario demonstrates 'lifestyle creep'?",
        options: [
          "Saving the same percentage of income after receiving a raise",
          "Reducing your monthly expenses when your income decreases",
          "Maintaining the same budget categories after price inflation",
          "Upgrading your car and apartment after each pay promotion"
        ],
        correctAnswer: 3,
        explanation: "Lifestyle creep happens when your spending rises to match income increases. Getting a promotion should increase your savings, not your spending! Upgrading car AND apartment after EACH promotion means you never build wealth - your expenses always catch up."
      },
      {
        id: "ut-b-3",
        question: "If someone has $800 in fixed expenses and $400 in variable expenses, but earns $1,000, what is their budget deficit?",
        options: [
          "$1,200 representing total combined expenses",
          "$0 because income matches fixed expenses exactly",
          "$200 because total expenses exceed income by that amount",
          "$400 representing only the variable expense portion"
        ],
        correctAnswer: 2,
        explanation: "Deficit = Expenses - Income when expenses exceed income. Total expenses: $800 + $400 = $1,200. Income: $1,000. Deficit: $1,200 - $1,000 = $200 short. This person needs to cut $200 from variable expenses or find additional income."
      },
      {
        id: "ut-b-4",
        question: "Which is the BEST reason to track small daily purchases?",
        options: [
          "Small expenses often add up to significant amounts unnoticed",
          "Banks require detailed tracking for account security purposes",
          "It helps improve your credit score with major credit bureaus",
          "Tax authorities need this information for your annual return"
        ],
        correctAnswer: 0,
        explanation: "The 'latte factor' is real! A $5 daily coffee = $150/month = $1,800/year. Tracking reveals these hidden drains. Banks don't require tracking; credit scores measure credit usage, not spending habits."
      },
      {
        id: "ut-b-5",
        question: "A student receives $200/month allowance. They want to save for a $480 item. Using a budget, how many months will it take if they save 40%?",
        options: [
          "4 months saving $120 per month toward the goal",
          "12 months saving only $40 per month toward the goal",
          "8 months saving $60 per month toward the goal",
          "6 months saving $80 per month toward the goal"
        ],
        correctAnswer: 3,
        explanation: "Monthly savings = $200 × 40% = $80. Time needed = $480 ÷ $80 = 6 months. This is why SMART goals include timeframes! Knowing it takes 6 months helps the student plan and stay motivated."
      },
      {
        id: "ut-b-6",
        question: "What distinguishes zero-based budgeting from other methods?",
        options: [
          "You start with zero savings in your account each month",
          "It eliminates all discretionary and entertainment spending",
          "You can only spend money you physically have in hand",
          "Every dollar is assigned a specific purpose until you reach $0 unallocated"
        ],
        correctAnswer: 3,
        explanation: "In zero-based budgeting, income minus ALL allocated expenses equals zero. Example: $3,000 income - $1,500 rent - $500 food - $400 transport - $300 savings - $300 entertainment = $0 unassigned."
      },
      {
        id: "ut-b-7",
        question: "Which expense would most likely be considered 'discretionary' in a budget?",
        options: [
          "Your minimum credit card payment due each billing cycle",
          "A basic cell phone plan needed for work communication",
          "Premium streaming subscriptions for entertainment content",
          "Renter's insurance protecting your personal belongings"
        ],
        correctAnswer: 2,
        explanation: "Discretionary = optional, not required for basic living. Premium streaming (Netflix, Hulu, Disney+) is entertainment you can live without. Minimum debt payments are required. A basic phone plan may be necessary for work."
      },
      {
        id: "ut-b-8",
        question: "A freelancer earned $2,000, $4,500, $1,800, and $3,200 over four months. What budgeting approach is most appropriate?",
        options: [
          "Budget based on the $4,500 high month for comfort",
          "Don't budget at all since income is unpredictable",
          "Budget based on the average income of $2,875 per month",
          "Budget based on the lowest month of $1,800 for safety"
        ],
        correctAnswer: 3,
        explanation: "With variable income, budget for the worst-case scenario! Budgeting essentials around $1,800 ensures you can survive low months. When you earn $4,500, save the extra as an income buffer."
      },
      {
        id: "ut-b-9",
        question: "Why might automatic savings transfers be more effective than manual transfers?",
        options: [
          "Banks offer higher interest rates for automatic transfers only",
          "It removes the temptation to skip saving each pay period",
          "Manual transfers have higher processing fees than automatic ones",
          "Automatic transfers are tax-deductible on your annual return"
        ],
        correctAnswer: 1,
        explanation: "Automation leverages 'out of sight, out of mind' psychology. When savings happen automatically on payday, you never see the money as available to spend."
      },
      {
        id: "ut-b-10",
        question: "What is the opportunity cost of spending $50 on entertainment instead of saving it at 5% annual interest for 10 years?",
        options: [
          "Exactly $50 with no additional cost whatsoever",
          "$500 in lost interest over the full decade period",
          "Approximately $81 total value lost including compound growth",
          "Approximately $31 in lost interest earnings only"
        ],
        correctAnswer: 2,
        explanation: "Opportunity cost includes future growth! $50 at 5% for 10 years with compound interest = $50 × (1.05)^10 = $81.44. You lose the $50 PLUS the ~$31 it would have earned."
      },
      {
        id: "ut-b-11",
        question: "A person's take-home pay is $3,600/month. Their rent is $1,400. What percentage of income goes to rent?",
        options: [
          "About 52% which is well above recommended guidelines",
          "About 28% which is within recommended housing guidelines",
          "About 45% which significantly exceeds recommended levels",
          "About 39% which exceeds the recommended 30% maximum"
        ],
        correctAnswer: 3,
        explanation: "Percentage = (Expense ÷ Income) × 100. ($1,400 ÷ $3,600) × 100 = 38.9%, roughly 39%. Financial experts recommend housing under 30% of income. At 39%, this person is 'house poor.'"
      },
      {
        id: "ut-b-12",
        question: "Which scenario represents the BEST use of an emergency fund?",
        options: [
          "Buying holiday gifts on sale during Black Friday promotions",
          "Taking advantage of a limited-time investment opportunity",
          "Paying for an unexpected medical expense you didn't plan for",
          "Covering regular monthly expenses during a planned vacation"
        ],
        correctAnswer: 2,
        explanation: "Emergency funds are for UNEXPECTED and NECESSARY expenses. A surprise $800 medical bill fits both criteria. Holiday gifts, investments, and vacation expenses are planned or optional."
      },
      {
        id: "ut-b-13",
        question: "If you have 3 months of expenses saved and experts recommend 6 months, and your monthly expenses are $2,000, how much more do you need?",
        options: [
          "$2,000 to reach four months of expense coverage",
          "$12,000 to reach a full year of expense coverage",
          "$4,000 to reach five months of expense coverage",
          "$6,000 to reach the recommended six months of coverage"
        ],
        correctAnswer: 3,
        explanation: "Current savings: 3 months × $2,000 = $6,000. Goal: 6 months × $2,000 = $12,000. Gap: $12,000 - $6,000 = $6,000 more needed. You're halfway there!"
      },
      {
        id: "ut-b-14",
        question: "What is a 'sinking fund' in personal finance?",
        options: [
          "Savings earmarked for known future expenses you can predict",
          "Money set aside specifically for risky investment opportunities",
          "An emergency fund that's nearly depleted and needs replenishing",
          "Debt that continues to grow because of compounding interest"
        ],
        correctAnswer: 0,
        explanation: "Sinking funds are for PLANNED future expenses. Examples: saving $100/month for a $1,200 annual car insurance premium, or $50/month toward next year's holiday gifts."
      },
      {
        id: "ut-b-15",
        question: "A zero-based budget shows Income: $4,000, Needs: $2,200, Wants: $1,000, Savings: $600. What should happen to complete it?",
        options: [
          "Increase income by $200 to cover the apparent gap",
          "Reduce wants by $200 to match the income amount",
          "Assign the leftover $200 a job, like savings or a goal",
          "Nothing - leftover money means the budget is done"
        ],
        correctAnswer: 2,
        explanation: "Check the math: $2,200 + $1,000 + $600 = $3,800. Income is $4,000, leaving a $200 surplus. In zero-based budgeting every dollar gets a job - so that $200 should be assigned to savings or a goal, not left floating."
      },
      {
        id: "ut-b-16",
        question: "Which budgeting mistake is MOST likely to cause someone to abandon their budget entirely?",
        options: [
          "Using a spreadsheet instead of a mobile budgeting app",
          "Setting unrealistic restrictions with no flexibility for fun",
          "Tracking expenses daily instead of doing it weekly",
          "Having an emergency fund that is larger than necessary"
        ],
        correctAnswer: 1,
        explanation: "Overly strict budgets feel like punishment and fail quickly. 'Zero dollars for fun' is unsustainable. Build in 'fun money' and flexible categories. The best budget is one you'll actually stick with!"
      },
      {
        id: "ut-b-17",
        question: "What does it mean to 'pay yourself first'?",
        options: [
          "Take your salary from the company before it processes payroll",
          "Give yourself a monthly bonus on top of your regular pay",
          "Pay off your smallest debts first before addressing larger ones",
          "Prioritize savings before spending on anything else each payday"
        ],
        correctAnswer: 3,
        explanation: "Pay Yourself First means treating savings as a non-negotiable expense - like rent. When your paycheck arrives, immediately transfer savings BEFORE budgeting for wants."
      },
      {
        id: "ut-b-18",
        question: "If a subscription costs $14.99/month, what is the annual cost?",
        options: [
          "$149.90 calculated by multiplying by ten months",
          "$179.88 calculated by multiplying by twelve months",
          "$164.89 calculated by multiplying by eleven months",
          "$194.87 calculated by adding a yearly processing fee"
        ],
        correctAnswer: 1,
        explanation: "Annual cost = Monthly cost × 12. $14.99 × 12 = $179.88. Companies use $X.99 pricing psychology - $14.99 feels closer to $14 than $15, but 12 months adds up significantly!"
      },
      {
        id: "ut-b-19",
        question: "Which expense category typically offers the MOST flexibility for budget cuts?",
        options: [
          "Rent or mortgage payment obligations each month",
          "Required car insurance premium payments",
          "Dining out, entertainment, and recreational activities",
          "Utility bills for electricity, water, and heating"
        ],
        correctAnswer: 2,
        explanation: "Discretionary spending (dining, entertainment) is the easiest to cut because it's entirely optional. You COULD spend $0 on restaurants this month. Rent requires moving. Utilities can be reduced but not eliminated."
      },
      {
        id: "ut-b-20",
        question: "A person earns $50,000/year and wants to save 15% annually. How much should they save monthly?",
        options: [
          "$416.67 representing roughly 10% of monthly gross income",
          "$500.00 representing exactly 12% of monthly gross income",
          "$750.00 representing exactly 18% of monthly gross income",
          "$625.00 representing exactly 15% of monthly gross income"
        ],
        correctAnswer: 3,
        explanation: "Annual savings = $50,000 × 15% = $7,500/year. Monthly = $7,500 ÷ 12 = $625. Breaking annual goals into monthly amounts makes them actionable and trackable."
      },
      {
        id: "ut-b-21",
        question: "What is the primary risk of keeping too much money in a low-interest savings account?",
        options: [
          "The bank might close your account for excessive deposits",
          "Inflation may erode your purchasing power over time",
          "You'll have to pay significantly higher income taxes",
          "Your credit score will decrease from not using credit"
        ],
        correctAnswer: 1,
        explanation: "If inflation is 3% and your savings earn 0.5%, you're LOSING 2.5% purchasing power annually. $10,000 today might only buy $7,500 worth of goods in 10 years!"
      },
      {
        id: "ut-b-22",
        question: "Which method helps prevent impulse buying?",
        options: [
          "Only shopping when you're hungry for maximum motivation",
          "Always using credit cards for better purchase protection",
          "Shopping exclusively during sales events for best prices",
          "Implementing a 24-72 hour waiting period for non-essential purchases"
        ],
        correctAnswer: 3,
        explanation: "The waiting period breaks the emotional 'I need this NOW' response. After 24-72 hours, most impulse items lose their appeal. Shopping hungry INCREASES impulse purchases."
      },
      {
        id: "ut-b-23",
        question: "A couple has combined income of $8,000/month and wants needs under 50%. Their current needs total $4,400. By how much must they reduce?",
        options: [
          "$400 to bring needs from $4,400 down to the $4,000 target",
          "$0 because their needs are already under the 50% threshold",
          "$200 to bring needs closer to the recommended percentage",
          "$800 to bring needs well below the 50% guideline level"
        ],
        correctAnswer: 0,
        explanation: "Target for needs: $8,000 × 50% = $4,000 maximum. Current needs: $4,400. Reduction needed: $4,400 - $4,000 = $400. They're currently at 55% on needs, leaving less for wants and savings."
      },
      {
        id: "ut-b-24",
        question: "What happens to your budget if you receive an unexpected windfall of $1,000?",
        options: [
          "It should be spent immediately before it disappears from your account",
          "It must go entirely to savings as required by financial regulations",
          "You should allocate it according to your financial priorities",
          "Windfalls don't need to be budgeted since they're unexpected"
        ],
        correctAnswer: 2,
        explanation: "Every dollar deserves a job, even surprise money! Prioritize: 1) Top off emergency fund, 2) Pay down high-interest debt, 3) Invest for goals, 4) Maybe treat yourself with 10-20%."
      },
      {
        id: "ut-b-25",
        question: "Which statement BEST describes the relationship between budgeting and wealth building?",
        options: [
          "Budgeting is only for people who don't earn enough money",
          "Budgeting limits your ability to invest and grow real wealth",
          "Wealthy people don't need to budget at any income level",
          "Budgeting creates the surplus that enables saving and investing"
        ],
        correctAnswer: 3,
        explanation: "Budgeting is the FOUNDATION of wealth. You can't invest money you've already spent! Studies show most millionaires actively budget - that's HOW they became millionaires. Income doesn't determine wealth; behavior does."
      }
    ]
  },
  {
    category: "insurance-protection",
    title: "Insurance & Protection Exam",
    description: "Prove you can protect yourself, your money, and your future. Score 80% or higher to earn 250 Jeff's!",
    passingScore: 80,
    reward: 250,
    questions: [
      {
        id: "ut-ins-1",
        question: "What is 'risk pooling,' the idea at the heart of all insurance?",
        options: [
          "Many people pay in so the unlucky few who face disasters get covered",
          "Each person saves only for their own emergencies",
          "The government pays for everyone's losses",
          "Investors bet on which customers will get hurt"
        ],
        correctAnswer: 0,
        explanation: "Risk pooling means a large group contributes premiums, and the pooled money covers the small number who actually experience a disaster. No single person bears the full cost alone."
      },
      {
        id: "ut-ins-2",
        question: "You have a $750 deductible and a covered accident causes $4,000 in damage. How much does insurance pay?",
        options: [
          "$4,000",
          "$3,250",
          "$750",
          "$0"
        ],
        correctAnswer: 1,
        explanation: "You pay the $750 deductible first; insurance covers the remaining $4,000 - $750 = $3,250."
      },
      {
        id: "ut-ins-3",
        question: "Because Florida is a no-fault state, which coverage does it require every driver to carry?",
        options: [
          "Collision and comprehensive",
          "Personal Injury Protection (PIP) and Property Damage Liability (PDL)",
          "Life insurance",
          "Only uninsured-motorist coverage"
        ],
        correctAnswer: 1,
        explanation: "Florida's no-fault system requires PIP (covers your own injuries regardless of fault) and PDL (covers property damage you cause to others)."
      },
      {
        id: "ut-ins-4",
        question: "An apartment is burglarized. Whose insurance covers the TENANT's stolen belongings?",
        options: [
          "The landlord's insurance",
          "The tenant's own renters insurance",
          "Nobody - belongings can't be insured",
          "The building's HOA"
        ],
        correctAnswer: 1,
        explanation: "Renters insurance covers the tenant's belongings and liability. The landlord's policy covers only the building structure, not tenants' personal property."
      },
      {
        id: "ut-ins-5",
        question: "What does the out-of-pocket maximum on a health plan do?",
        options: [
          "Caps the most YOU pay in a year; after that, insurance covers 100%",
          "Caps the most the insurer will ever pay",
          "Is the same as your monthly premium",
          "Is a penalty for using out-of-network doctors"
        ],
        correctAnswer: 0,
        explanation: "The out-of-pocket maximum is the yearly ceiling on your own spending. Once you hit it, the insurer pays 100% of covered costs for the rest of the year."
      },
      {
        id: "ut-ins-6",
        question: "What is the recommended FIRST step if your identity is stolen?",
        options: [
          "Wait and see if it resolves on its own",
          "Report it at IdentityTheft.gov to get an official recovery plan",
          "Pay the fraudulent charges to make them disappear",
          "Post your SSN online to warn others"
        ],
        correctAnswer: 1,
        explanation: "IdentityTheft.gov (the FTC) is the official starting point and creates a personalized recovery plan; you then place a fraud alert and freeze your credit."
      },
      {
        id: "ut-ins-7",
        question: "Someone dies in Florida without a will. What determines who inherits their assets?",
        options: [
          "Whoever asks first gets everything",
          "Florida's intestate succession laws decide",
          "The assets go to the state permanently",
          "Their employer chooses"
        ],
        correctAnswer: 1,
        explanation: "Dying without a will means dying 'intestate,' so Florida's intestate succession laws - not the person - decide how assets are distributed."
      },
      {
        id: "ut-ins-8",
        question: "Which is an example of a well-formed SMART financial goal?",
        options: [
          "Save more money someday",
          "Save $1,000 for an emergency fund within 6 months",
          "Get rich",
          "Stop spending forever"
        ],
        correctAnswer: 1,
        explanation: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. 'Save $1,000 in 6 months' meets all five; the others are vague."
      },
      {
        id: "ut-ins-9",
        question: "What is a key difference between term and whole life insurance?",
        options: [
          "Term lasts forever; whole life expires quickly",
          "Term covers a set period and is cheaper; whole life is permanent, costs more, and builds cash value",
          "They are identical",
          "Whole life has no premium"
        ],
        correctAnswer: 1,
        explanation: "Term life covers a fixed number of years at low cost; whole life is permanent, more expensive, and accumulates cash value."
      },
      {
        id: "ut-ins-10",
        question: "What does disability insurance protect?",
        options: [
          "Your car from theft",
          "A portion of your income if illness or injury keeps you from working",
          "Your beneficiaries when you die",
          "Your home from floods"
        ],
        correctAnswer: 1,
        explanation: "Disability insurance replaces part of your income when an illness or injury prevents you from working - protecting your ability to earn."
      }
    ]
  }
]

export function getUnitTestByCategory(category: LessonCategory): UnitTest | undefined {
  return unitTests.find(t => t.category === category)
}
