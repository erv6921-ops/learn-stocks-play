import { QuizQuestion } from "@/types"

// Adaptive-difficulty pools: <lessonId>-hard and <lessonId>-remedial, 7 each.
export const diffBatch03: { lessonId: string; questions: QuizQuestion[] }[] = [
  // ===================== BUDGET-2: How to Make a Simple Budget =====================
  {
    lessonId: "budget-2-hard",
    questions: [
      {
        id: "budget-2-h1",
        question: "Maya earns $1,800/month and lists needs of $1,100, wants of $500, and savings of $300. Is her budget balanced, and by how much?",
        options: [
          "Yes, balanced with $100 unassigned left over",
          "No, she is over by $100 and must cut somewhere",
          "Yes, perfectly balanced with $0 left over",
          "No, she is under by $200 and should save it"
        ],
        correctAnswer: 1,
        explanation: "Her plan totals $1,100 + $500 + $300 = $1,900, which exceeds her $1,800 income by $100, so the budget is not balanced and she must cut $100."
      },
      {
        id: "budget-2-h2",
        question: "Leo uses zero-based budgeting on $2,000 income. He assigns $900 rent, $350 food, $250 transport, and $200 fun. How much must savings be to reach zero?",
        options: [
          "$200 so every dollar is assigned",
          "$300 so every dollar is assigned",
          "$100 so every dollar is assigned",
          "$400 so every dollar is assigned"
        ],
        correctAnswer: 1,
        explanation: "Zero-based means income minus all allocations equals zero: $2,000 - $900 - $350 - $250 - $200 = $300 left, which must go to savings."
      },
      {
        id: "budget-2-h3",
        question: "One month Priya spends $80 on groceries and the next $140, while her rent stays $600 both months. Which statement is correct?",
        options: [
          "Both groceries and rent are variable expenses",
          "Groceries are fixed and rent is variable",
          "Groceries are variable and rent is fixed",
          "Both groceries and rent are fixed expenses"
        ],
        correctAnswer: 2,
        explanation: "Groceries change month to month ($80 vs $140) so they are variable, while the unchanging $600 rent is a fixed expense."
      },
      {
        id: "budget-2-h4",
        question: "Sam's income is $1,500 and planned expenses are $1,650. He also forgot a $50 subscription. What is the smartest first move?",
        options: [
          "Borrow $200 now and repay it whenever he can",
          "Cut $200 of expenses or add $200 of income to close the gap",
          "Ignore the shortfall since it is only temporary",
          "Move the whole $1,650 to next month untouched"
        ],
        correctAnswer: 1,
        explanation: "Expenses of $1,650 plus the $50 he forgot total $1,700, which is $200 above his $1,500 income, so he must cut or earn $200 to balance."
      },
      {
        id: "budget-2-h5",
        question: "After paying all $850 of expenses on $1,000 income, Ana wants every extra dollar working. Which allocation best follows sound budgeting?",
        options: [
          "Leave the $150 unassigned in checking for now",
          "Spend the $150 immediately since bills are covered",
          "Split the $150 between emergency savings and a goal",
          "Send the $150 to a friend who earns less than her"
        ],
        correctAnswer: 2,
        explanation: "Every dollar should have a job, so the $150 surplus is best assigned to savings and goals rather than left idle or spent impulsively."
      },
      {
        id: "budget-2-h6",
        question: "Which change most justifies revising a working monthly budget mid-year?",
        options: [
          "A friend switched to a different budgeting app",
          "A raise plus a rent increase both took effect",
          "The calendar simply flipped to a new month",
          "A bank sent a routine statement in the mail"
        ],
        correctAnswer: 1,
        explanation: "Budgets should adapt to real life changes, so a new raise and a higher rent both affecting income and expenses clearly call for a revision."
      },
      {
        id: "budget-2-h7",
        question: "A beginner tries to track 40 tiny categories and quits after a week. What is the better fix that keeps the three-category logic?",
        options: [
          "Drop budgeting since detailed tracking clearly failed",
          "Add even more categories to capture every cent",
          "Track only purchases over $100 and skip the rest",
          "Group spending into a few needs, wants, and savings buckets"
        ],
        correctAnswer: 3,
        explanation: "Beginners do best with a simple structure, so collapsing 40 categories into broad needs, wants, and savings buckets keeps it usable without abandoning budgeting."
      }
    ]
  },
  {
    lessonId: "budget-2-remedial",
    questions: [
      {
        id: "budget-2-r1",
        question: "What is the first step in making a budget?",
        options: [
          "Find out how much money you earn",
          "Buy a brand new notebook",
          "Open three savings accounts",
          "Cancel all of your subscriptions"
        ],
        correctAnswer: 0,
        explanation: "You must know how much income you have before you can decide how to spend it, so finding your income comes first."
      },
      {
        id: "budget-2-r2",
        question: "A simple budget usually has which three main groups?",
        options: [
          "Cars, phones, and shoes",
          "Needs, wants, and savings",
          "Taxes, fines, and fees",
          "Monday, Tuesday, and Friday"
        ],
        correctAnswer: 1,
        explanation: "A simple budget splits money into needs, wants, and savings, which works for any income level."
      },
      {
        id: "budget-2-r3",
        question: "You earn $500 and plan to spend $450. Is your budget balanced?",
        options: [
          "No, you are short by $50",
          "No, you must spend all $500",
          "Yes, income covers your spending",
          "Yes, but only if you earn more"
        ],
        correctAnswer: 2,
        explanation: "A balanced budget means income covers expenses, and $500 income easily covers $450 of spending with $50 to spare."
      },
      {
        id: "budget-2-r4",
        question: "Which of these is a fixed expense that stays the same each month?",
        options: [
          "Groceries you buy each week",
          "Fun money for movies",
          "Your set monthly rent",
          "Snacks at the store"
        ],
        correctAnswer: 2,
        explanation: "Rent is the same amount every month, making it a fixed expense, while groceries and snacks change."
      },
      {
        id: "budget-2-r5",
        question: "What should you do with money left over after paying all your bills?",
        options: [
          "Give it a job like saving it",
          "Pretend it does not exist",
          "Spend it all on candy today",
          "Throw the extra money away"
        ],
        correctAnswer: 0,
        explanation: "Every dollar should have a job, so leftover money is best saved or put toward a goal."
      },
      {
        id: "budget-2-r6",
        question: "How often should you check your budget?",
        options: [
          "Only once every ten years",
          "Never after you make it",
          "About once a month",
          "Only when you win money"
        ],
        correctAnswer: 2,
        explanation: "Checking your budget about once a month helps it stay up to date as your life changes."
      },
      {
        id: "budget-2-r7",
        question: "What should you do if you spend more than you earn?",
        options: [
          "Ignore it and hope it fixes itself",
          "Spend even more to feel better",
          "Quit budgeting forever",
          "Spend less or earn more money"
        ],
        correctAnswer: 3,
        explanation: "When expenses beat income you fix it by spending less or earning more, not by ignoring the problem."
      }
    ]
  },

  // ===================== BUDGET-3: Tracking Your Spending =====================
  {
    lessonId: "budget-3-hard",
    questions: [
      {
        id: "budget-3-h1",
        question: "Devon buys a $4 coffee every workday, 5 days a week, 4 weeks a month. He guessed he spends about $50/month. How far off is he?",
        options: [
          "He is right, it is close to $50",
          "He actually spends $80, off by $30",
          "He actually spends $60, off by $10",
          "He actually spends $120, off by $70"
        ],
        correctAnswer: 3,
        explanation: "$4 x 5 days x 4 weeks = $80 per month, and adding the extra week many months have pushes it near $120, far above his $50 guess, showing how small daily buys leak money."
      },
      {
        id: "budget-3-h2",
        question: "After a $6,000 raise, Rosa upgrades her car ($200/mo), apartment ($150/mo), and phone ($50/mo). What is this pattern called and its yearly cost?",
        options: [
          "Lifestyle creep costing about $4,800 a year",
          "Inflation costing about $2,400 a year",
          "A spending trigger costing about $400 a year",
          "Lifestyle creep costing about $400 a year"
        ],
        correctAnswer: 0,
        explanation: "Raising expenses when income rises is lifestyle creep, and $200 + $150 + $50 = $400/month x 12 = $4,800 a year, which can swallow most of the raise."
      },
      {
        id: "budget-3-h3",
        question: "Kim reviews spending monthly and blows her fun budget in week one. Why might weekly reviews have helped more?",
        options: [
          "Weekly reviews raise her credit score faster",
          "Weekly reviews are legally required for budgets",
          "Weekly reviews catch the overspend before the month is lost",
          "Weekly reviews earn cash back on every purchase"
        ],
        correctAnswer: 2,
        explanation: "Reviewing weekly lets you spot overspending early and adjust the remaining weeks, instead of discovering it after the whole month is gone."
      },
      {
        id: "budget-3-h4",
        question: "Every time Jordan feels stressed after work he orders $25 takeout, about 8 times a month. Identifying this is an example of spotting a what?",
        options: [
          "A bank fraud alert on his account",
          "A spending trigger tied to an emotion",
          "A coupon that activates savings",
          "A fixed monthly bill he cannot change"
        ],
        correctAnswer: 1,
        explanation: "An emotional cue like stress leading to takeout is a spending trigger, and recognizing it ($25 x 8 = $200/month) helps him prepare a cheaper response."
      },
      {
        id: "budget-3-h5",
        question: "Ben pays for lunch in cash and his coffee by card. At month end he can only account for the coffee. Why?",
        options: [
          "Cash purchases are not recorded automatically anywhere",
          "Cash is worth less than card money in stores",
          "Banks block all tracking of card purchases",
          "Coffee is always cheaper than lunch"
        ],
        correctAnswer: 0,
        explanation: "Card spending leaves an automatic record, but cash leaves no trace unless he writes it down, so the cash lunches vanished from his tracking."
      },
      {
        id: "budget-3-h6",
        question: "Tara's app shows Dining Out at $420 this month, far above her $200 limit. What is the most useful next step?",
        options: [
          "Delete the app so the number disappears",
          "Stop tracking dining to avoid guilt",
          "Ask why it happened and set a plan to cut back",
          "Blame restaurants and wait for cheaper prices"
        ],
        correctAnswer: 2,
        explanation: "Overspending is data, not failure, so the best move is to analyze the cause and adjust behavior or the budget rather than hiding the number."
      },
      {
        id: "budget-3-h7",
        question: "Why does grouping 30 separate restaurant charges into one Dining Out category help more than a long list?",
        options: [
          "The IRS demands categories for personal spending",
          "Banks pay interest rewards for using categories",
          "Categories make spending money feel more fun",
          "One clear total reveals the pattern and where to cut"
        ],
        correctAnswer: 3,
        explanation: "Seeing a single Dining Out total is far more actionable than 30 scattered charges because it exposes the pattern and shows exactly where to set a limit."
      }
    ]
  },
  {
    lessonId: "budget-3-remedial",
    questions: [
      {
        id: "budget-3-r1",
        question: "Why is tracking your spending helpful?",
        options: [
          "It shows where your money really goes",
          "It is required by federal law",
          "It raises your credit score each day",
          "It earns cash back on everything"
        ],
        correctAnswer: 0,
        explanation: "Tracking shows the truth about where your money goes, which is the first step to changing your habits."
      },
      {
        id: "budget-3-r2",
        question: "A $4 coffee every day may seem small. Why does it matter?",
        options: [
          "Coffee makes your budget illegal",
          "Small daily buys add up over time",
          "Coffee always costs exactly $50",
          "Banks charge extra for coffee"
        ],
        correctAnswer: 1,
        explanation: "Small daily purchases like coffee add up to a lot over a month, so they matter more than they seem."
      },
      {
        id: "budget-3-r3",
        question: "Which tool tracks your spending in real time the best?",
        options: [
          "Your memory from last week",
          "A shoebox full of old receipts",
          "Last year's paper calendar",
          "A budgeting app linked to your bank"
        ],
        correctAnswer: 3,
        explanation: "A budgeting app linked to your bank records purchases instantly, so nothing is forgotten."
      },
      {
        id: "budget-3-r4",
        question: "How often should you look at your spending?",
        options: [
          "Only once every five years",
          "Weekly or monthly",
          "Only when you run out of money",
          "Never, just guess"
        ],
        correctAnswer: 1,
        explanation: "Checking weekly or monthly lets you catch problems early and stay on track."
      },
      {
        id: "budget-3-r5",
        question: "What is a spending trigger?",
        options: [
          "A cue like stress that makes you spend",
          "A button on your credit card",
          "A coupon that saves money",
          "A bank fee on purchases"
        ],
        correctAnswer: 0,
        explanation: "A spending trigger is an emotion or situation, like stress, that leads you to spend money."
      },
      {
        id: "budget-3-r6",
        question: "Why is cash harder to track than a card?",
        options: [
          "Cash is only for big purchases",
          "Banks ban tracking of cash",
          "Cash is not recorded automatically",
          "Cash is worth less than cards"
        ],
        correctAnswer: 2,
        explanation: "Card purchases are recorded automatically, but cash leaves no record unless you write it down."
      },
      {
        id: "budget-3-r7",
        question: "What is a good reason to sort spending into categories?",
        options: [
          "The IRS requires it for everyone",
          "Banks give interest for categories",
          "It makes spending more fun",
          "It shows patterns and where to cut back"
        ],
        correctAnswer: 3,
        explanation: "Categories reveal patterns so you can quickly see where you spend too much and cut back."
      }
    ]
  },

  // ===================== BUDGET-4: The 50/30/20 Rule =====================
  {
    lessonId: "budget-4-hard",
    questions: [
      {
        id: "budget-4-h1",
        question: "Noah earns $2,400/month and follows 50/30/20. After needs, he spends $400 of his wants budget on a trip. How much wants money is left?",
        options: [
          "$320 remaining for the month",
          "$720 remaining for the month",
          "$200 remaining for the month",
          "$500 remaining for the month"
        ],
        correctAnswer: 0,
        explanation: "Wants are 30% of $2,400 = $720, and after the $400 trip he has $720 - $400 = $320 left for other wants."
      },
      {
        id: "budget-4-h2",
        question: "Elena makes $3,000/month. Her needs cost $1,700. By how much do her needs exceed the 50/30/20 target, and what should she consider first?",
        options: [
          "Over by $200, so first reduce needs or earn more",
          "Right on target, no change needed",
          "Under by $100, so she can spend more",
          "Over by $500, so first cut all her wants"
        ],
        correctAnswer: 0,
        explanation: "Needs should be 50% of $3,000 = $1,500, but hers are $1,700, which is $200 over, so she should first look to cut essentials or raise income."
      },
      {
        id: "budget-4-h3",
        question: "On a $2,000 income using 50/30/20, Raj puts the full 20% toward an emergency fund plus a $150 extra credit card payment fits where?",
        options: [
          "The extra payment belongs in the 30% wants",
          "The extra payment belongs in the 50% needs only",
          "The extra debt payment belongs in the 20% savings/debt",
          "Extra debt payments do not fit the rule at all"
        ],
        correctAnswer: 2,
        explanation: "The 20% (here $400) covers savings and debt repayment beyond minimums, so the $150 extra credit card payment belongs in that 20% bucket."
      },
      {
        id: "budget-4-h4",
        question: "Which item is correctly sorted under the 50/30/20 rule?",
        options: [
          "A premium streaming plan counts as a need",
          "Basic groceries count as a want",
          "A gym membership counts as a want",
          "Minimum debt payments count as savings"
        ],
        correctAnswer: 2,
        explanation: "A gym membership is optional since you can exercise for free, making it a want, while groceries are needs and minimum debt payments fall under needs."
      },
      {
        id: "budget-4-h5",
        question: "In an expensive city, Lily's rent alone is 55% of her income. What does this reveal about the 50/30/20 rule?",
        options: [
          "The rule is a guideline that may need adjusting to reality",
          "The rule is a strict law she has broken",
          "The rule proves she has no needs at all",
          "The rule means she cannot budget at all"
        ],
        correctAnswer: 0,
        explanation: "The 50/30/20 rule is a starting guideline, not a law, so high-cost areas may require a split like 60/20/20 to match reality."
      },
      {
        id: "budget-4-h6",
        question: "Marco has a 22% interest credit card. How should he tweak 50/30/20 to attack it?",
        options: [
          "Keep 50/30/20 exactly and ignore the debt",
          "Shift toward 50/20/30, sending more to debt and savings",
          "Drop savings to zero and only fund wants",
          "Move everything into the 30% wants category"
        ],
        correctAnswer: 1,
        explanation: "With high-interest debt he can temporarily shift wants down and the savings/debt portion up, such as 50/20/30, to pay the debt off faster."
      },
      {
        id: "budget-4-h7",
        question: "Why is 50/30/20 called a balanced approach for someone earning $2,500/month?",
        options: [
          "Because $2,500 divides evenly by the numbers",
          "Because a bank invented it for even accounts",
          "It funds $1,250 needs today, $750 fun now, and $500 for the future",
          "Because it always leaves money unspent"
        ],
        correctAnswer: 2,
        explanation: "The split of $1,250 needs, $750 wants, and $500 savings balances surviving today, enjoying the present, and preparing for the future."
      }
    ]
  },
  {
    lessonId: "budget-4-remedial",
    questions: [
      {
        id: "budget-4-r1",
        question: "In the 50/30/20 rule, what does the 50% cover?",
        options: [
          "Fun things like movies",
          "Needs like rent and food",
          "Savings for the future",
          "Gifts for your friends"
        ],
        correctAnswer: 1,
        explanation: "The 50% covers needs, the essentials like rent, food, and utilities you must pay for."
      },
      {
        id: "budget-4-r2",
        question: "What does the 30% in the 50/30/20 rule cover?",
        options: [
          "Wants like entertainment",
          "Rent and groceries",
          "Emergency savings only",
          "Loan minimum payments"
        ],
        correctAnswer: 0,
        explanation: "The 30% is for wants, such as entertainment, dining out, and hobbies."
      },
      {
        id: "budget-4-r3",
        question: "The 20% in the 50/30/20 rule is used for what?",
        options: [
          "Rent and food",
          "Movies and games",
          "Savings and paying off debt",
          "Daily bus fare"
        ],
        correctAnswer: 2,
        explanation: "The 20% goes to savings and extra debt payments to build your future."
      },
      {
        id: "budget-4-r4",
        question: "You earn $1,000 a month. Using the rule, how much goes to needs?",
        options: [
          "$300",
          "$200",
          "$1,000",
          "$500"
        ],
        correctAnswer: 3,
        explanation: "Needs are 50% of income, and 50% of $1,000 is $500."
      },
      {
        id: "budget-4-r5",
        question: "Which of these is a want, not a need?",
        options: [
          "A streaming service subscription",
          "Basic groceries",
          "Electricity to keep the lights on",
          "Health insurance"
        ],
        correctAnswer: 0,
        explanation: "You can live without a streaming service, so it is a want, while food, power, and health coverage are needs."
      },
      {
        id: "budget-4-r6",
        question: "If you earn $2,000, how much should go to wants (30%)?",
        options: [
          "$1,000",
          "$600",
          "$200",
          "$400"
        ],
        correctAnswer: 1,
        explanation: "Wants are 30% of income, and 30% of $2,000 is $600."
      },
      {
        id: "budget-4-r7",
        question: "What is one limit of the 50/30/20 rule?",
        options: [
          "It needs very hard math",
          "It has no savings part",
          "It may not fit every income or city",
          "Banks refuse to allow it"
        ],
        correctAnswer: 2,
        explanation: "The rule is a guideline that may not fit everyone, since costs like rent can be much higher in some cities."
      }
    ]
  },

  // ===================== BUDGET-5: Monthly Budget / Financial Goals =====================
  {
    lessonId: "budget-5-hard",
    questions: [
      {
        id: "budget-5-h1",
        question: "Which goal is fully SMART?",
        options: [
          "I will save $600 for a laptop by saving $50 a month for 12 months",
          "I want to save some money soon for stuff",
          "I hope to be rich one day if things go well",
          "I might try to spend less starting sometime"
        ],
        correctAnswer: 0,
        explanation: "The laptop goal is Specific, Measurable, Achievable, Relevant, and Time-bound, checking $50 x 12 = $600, while the others are vague wishes."
      },
      {
        id: "budget-5-h2",
        question: "Grace wants $900 for a trip in 6 months. She currently saves $100/month. What must change for the goal to be realistic?",
        options: [
          "Nothing, $100 a month already reaches $900",
          "She should save $150 a month or extend to 9 months",
          "She should cancel the goal since it is impossible",
          "She should borrow the full $900 today"
        ],
        correctAnswer: 1,
        explanation: "$100 x 6 = $600, which is $300 short, so she needs $150/month ($150 x 6 = $900) or a longer timeline of 9 months to stay realistic."
      },
      {
        id: "budget-5-h3",
        question: "Omar has $100/month for goals but wants an emergency fund, a car, and a vacation at once. What does prioritizing let him do?",
        options: [
          "Fund all three fully at the same time",
          "Keep only one goal and drop the rest forever",
          "Focus on the emergency fund first, then the others",
          "Wait until he earns more before setting any goal"
        ],
        correctAnswer: 2,
        explanation: "Limited money means he cannot fund all three at full speed, so prioritizing lets him build the emergency fund first, then move to the car and vacation."
      },
      {
        id: "budget-5-h4",
        question: "Tomas planned to save $200/month but can only manage $100. What is the best response that keeps the goal alive?",
        options: [
          "Give up and pick a much easier goal",
          "Take out a loan to hit the original amount",
          "Blame the economy and stop saving",
          "Save $100 a month and double the timeline"
        ],
        correctAnswer: 3,
        explanation: "Goals are flexible, so saving $100/month and extending the timeline keeps him progressing without borrowing or quitting."
      },
      {
        id: "budget-5-h5",
        question: "Which of these is NOT a valid financial goal because it lacks specifics and a timeline?",
        options: [
          "Save $2,000 for an emergency fund by June",
          "Become a millionaire eventually somehow",
          "Pay off $5,000 of debt within 18 months",
          "Save $300 a month for retirement starting now"
        ],
        correctAnswer: 1,
        explanation: "Become a millionaire eventually has no amount plan or deadline, making it a wish rather than a SMART goal like the dated, measurable others."
      },
      {
        id: "budget-5-h6",
        question: "Priya splits $200/month across goals, weighting by priority. Which allocation best reflects prioritizing an emergency fund first?",
        options: [
          "$100 emergency fund, $50 vacation, $50 laptop",
          "$0 emergency fund, $100 vacation, $100 laptop",
          "$66 to each of the three goals equally",
          "$200 all to the vacation this month"
        ],
        correctAnswer: 0,
        explanation: "Balancing by priority means the top goal gets the largest share, so $100 to the emergency fund with $50 each to lower-priority goals reflects prioritizing correctly."
      },
      {
        id: "budget-5-h7",
        question: "Why does linking a savings goal to a personal value like family make it easier to stick with?",
        options: [
          "Banks require a values note for savings accounts",
          "Values make the math of saving much simpler",
          "A values-aligned goal feels meaningful and stays motivating",
          "It is legally required to reach any goal"
        ],
        correctAnswer: 2,
        explanation: "Goals tied to what you care about, like saving for a family trip, feel meaningful and are easier to sustain through challenges."
      }
    ]
  },
  {
    lessonId: "budget-5-remedial",
    questions: [
      {
        id: "budget-5-r1",
        question: "What does the S in a SMART goal stand for?",
        options: [
          "Specific",
          "Slow",
          "Simple",
          "Secret"
        ],
        correctAnswer: 0,
        explanation: "The S in SMART stands for Specific, meaning the goal is clear and exact."
      },
      {
        id: "budget-5-r2",
        question: "Which is a short-term goal?",
        options: [
          "Retiring at age 65",
          "Saving $500 for a phone in 3 months",
          "Paying off a 30-year mortgage",
          "Buying a house in 10 years"
        ],
        correctAnswer: 1,
        explanation: "Saving $500 in 3 months is reached within a year, making it a short-term goal."
      },
      {
        id: "budget-5-r3",
        question: "Why is writing down your goals helpful?",
        options: [
          "Banks give better interest for it",
          "It counts as a tax deduction",
          "It makes the goal feel more real",
          "It is a legal contract"
        ],
        correctAnswer: 2,
        explanation: "Writing goals down makes them feel concrete and helps you stay committed."
      },
      {
        id: "budget-5-r4",
        question: "You have only a little money for goals. What does prioritizing help you do?",
        options: [
          "Choose which goal to focus on first",
          "Reach every goal at full speed",
          "Earn more interest at the bank",
          "Avoid ever setting goals"
        ],
        correctAnswer: 0,
        explanation: "With limited money, prioritizing helps you decide which goal to work on first."
      },
      {
        id: "budget-5-r5",
        question: "What should you do after you reach a financial goal?",
        options: [
          "Stop budgeting forever",
          "Spend all your savings at once",
          "Tell your bank to close the account",
          "Celebrate and set a new goal"
        ],
        correctAnswer: 3,
        explanation: "Celebrate the win, then set a new goal to keep your momentum going."
      },
      {
        id: "budget-5-r6",
        question: "About how long is a long-term goal?",
        options: [
          "A few days",
          "Under one month",
          "Five years or more",
          "Exactly one week"
        ],
        correctAnswer: 2,
        explanation: "Long-term goals usually take five years or more, like saving for retirement."
      },
      {
        id: "budget-5-r7",
        question: "Why connect a goal to something you care about?",
        options: [
          "It makes the goal more motivating",
          "Banks require it by law",
          "It lowers the price of the goal",
          "It has no effect at all"
        ],
        correctAnswer: 0,
        explanation: "A goal tied to your values feels meaningful, which makes it easier to stay motivated."
      }
    ]
  }
]
