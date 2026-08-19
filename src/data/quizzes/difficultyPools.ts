import type { LessonQuiz } from "../lessonQuizzes"

// Pilot: harder + remedial pools for budget-1, income-1, credit-1.
// Selected by tierDifficulty(student's MasteryTier) in contentGenerator.ts -
// "advanced" pulls the `-hard` pool, "beginner" pulls the `-remedial` pool,
// "intermediate" (and anyone with no live tier yet) uses the normal pool.
export const difficultyQuizzes: LessonQuiz[] = [
  // ═══════════════════════════════════════════════
  // BUDGET-1: harder
  // ═══════════════════════════════════════════════
  {
    lessonId: "budget-1-hard",
    questions: [
      {
        id: "bh1",
        question: "Zoe takes home $2,000 per month and follows the 50/30/20 rule (50% needs, 30% wants, 20% savings). So far this month she's spent $150 on rent and $250 on groceries, both of which are needs. How much of her needs allocation does she still have left to spend?",
        options: [
          "$600: the remaining needs allocation after subtracting what's spent",
          "$1,000: the full needs allocation before subtracting any spending",
          "$400: the amount she's already spent on needs, not what's left",
          "$1,600: combining the needs and wants percentages instead of using needs alone"
        ],
        correctAnswer: 0,
        explanation: "50% of $2,000 = $1,000 is her total needs budget. She's already spent $150 + $250 = $400 of it, so $1,000 − $400 = $600 remains. The 30% wants budget is separate, so don't add the two percentages together."
      },
      {
        id: "bh2",
        question: "Priya uses zero-based budgeting on $2,000 of take-home pay, meaning every dollar gets assigned a job, with nothing left unassigned. She assigns $800 rent, $400 groceries and utilities, $300 transportation, and $200 debt payment. She then splits whatever remains evenly between savings and fun money. How much goes to each of those last two categories?",
        options: [
          "$150 to each: half of the $300 left after the other categories",
          "$300 to each: treating the full remainder as going to both categories",
          "$75 to each: splitting the remainder into four parts instead of two",
          "$0 to each: assuming there's nothing left once fixed costs are covered"
        ],
        correctAnswer: 0,
        explanation: "$800 + $400 + $300 + $200 = $1,700 assigned to fixed categories, leaving $2,000 − $1,700 = $300. Zero-based budgeting means that $300 still needs a job too. Split evenly, that's $150 to savings and $150 to fun money. 'Zero-based' means every dollar is assigned, not that nothing is left for savings or fun."
      },
      {
        id: "bh3",
        question: "Deon budgets $2,400/month: $1,000 rent, $500 savings, $900 for everything else. His car needs a $600 repair this month that he didn't plan for, and he decides to cover it without touching rent or savings. How much does he need to cut from 'everything else' to cover the repair?",
        options: [
          "$600: the full repair cost, since rent and savings stay untouched",
          "$900: his whole 'everything else' category, leaving nothing for regular spending",
          "$100: spreading the repair cost evenly across the next six months instead",
          "$0: unexpected expenses can just be paid from next month's paycheck instead"
        ],
        correctAnswer: 0,
        explanation: "With rent and savings unchanged, the $600 repair has to come entirely out of the $900 'everything else' category, leaving only $300 for regular spending this month. Unexpected costs still have to be absorbed somewhere in THIS month's budget, not deferred or split across future months."
      },
      {
        id: "bh4",
        question: "Aaliyah is a freelance photographer whose income varies: $1,200 one month, $2,400 the next. Which budgeting approach makes the MOST sense for her irregular income?",
        options: [
          "Build the budget around her lowest expected month, saving extra during higher-earning months",
          "Build the budget around her highest month, since that's what she's capable of earning",
          "Spend the average of her two months every month, regardless of what actually comes in",
          "Skip budgeting entirely, since irregular income makes any fixed plan pointless"
        ],
        correctAnswer: 0,
        explanation: "Budgeting to the lowest realistic month protects her in a slow month, since bills still arrive on a fixed schedule regardless of income timing. Anything earned above that floor becomes extra savings or catch-up money in stronger months."
      },
      {
        id: "bh5",
        question: "Nate takes home $1,600/month. Fixed needs take $900, leaving $700. He wants to build a $1,200 emergency fund in 6 months AND pay down a credit card as fast as possible without missing that deadline. Hitting the emergency fund goal requires $200/month. What's the MOST he can put toward the credit card each month while still hitting the deadline?",
        options: [
          "$500: the leftover $700 minus the $200/month needed for the emergency fund",
          "$700: all of what's left after needs, ignoring the emergency fund commitment",
          "$200: applying the emergency fund contribution to the credit card instead",
          "$1,200: confusing the total emergency fund goal with the monthly amount available"
        ],
        correctAnswer: 0,
        explanation: "$700 is left after needs. $200 of that is already committed to the emergency fund goal, so $700 − $200 = $500 is the most he can put toward the credit card without missing the 6-month deadline."
      },
      {
        id: "bh6",
        question: "Bianca has $150 of fun money budgeted this month. She's deciding between a $150 concert ticket or saving that $150 toward a $600 laptop, which currently has $300 saved. If she skips the concert and saves $150/month toward the laptop instead, how many months of saving (INCLUDING this month's contribution) will it take to reach $600?",
        options: [
          "2 months, including this month's $150 contribution",
          "3 months, not counting this month's contribution as progress toward the goal",
          "1 month, ignoring the $300 she's already saved toward the laptop",
          "4 months, splitting the $150 between the concert fund and the laptop fund"
        ],
        correctAnswer: 0,
        explanation: "She already has $300. This month's $150 brings it to $450, leaving $150 more needed, exactly one more month at $150/month. That's 2 months total, counting this month."
      },
      {
        id: "bh7",
        question: "Six months into following a budget, Julian gets a $300/month raise, bringing his take-home pay to $2,100. Before the raise, he was saving $150/month. He decides to put half of his raise toward savings and half toward wants. What is his new monthly savings amount?",
        options: [
          "$300: his original $150 savings plus half of the $300 raise",
          "$450: his original $150 savings plus the full $300 raise",
          "$150: his original savings unchanged, since the raise only affects 'wants'",
          "$600: doubling his original savings amount instead of adding half the raise"
        ],
        correctAnswer: 0,
        explanation: "Half of the $300 raise is $150. Added to his original $150 in savings, that's $150 + $150 = $300 per month going forward."
      }
    ]
  },
  // ═══════════════════════════════════════════════
  // BUDGET-1: remedial
  // ═══════════════════════════════════════════════
  {
    lessonId: "budget-1-remedial",
    questions: [
      {
        id: "br1",
        question: "A budget surplus means you spent LESS than you earned. If you earn $300 in a month and spend $250, is that a surplus or a deficit?",
        options: [
          "Surplus: you spent $50 less than you earned",
          "Deficit: you spent $50 more than you earned",
          "Balanced: your spending exactly matched your income",
          "Neither: surplus and deficit only apply to government budgets"
        ],
        correctAnswer: 0,
        explanation: "$300 − $250 = $50 left over. Spending LESS than you earn is a surplus. Spending MORE than you earn would be a deficit. Since $250 is less than $300, this is a $50 surplus."
      },
      {
        id: "br2",
        question: "A fixed expense stays the same amount every month (like rent). A variable expense changes from month to month (like your grocery bill). Which of these is a variable expense?",
        options: [
          "Your grocery bill, which changes depending on what you buy each week",
          "Your monthly rent payment, which stays the same every month",
          "Your car insurance payment, which is the same amount each month",
          "Your monthly phone plan payment, which stays the same every month"
        ],
        correctAnswer: 0,
        explanation: "Groceries change based on what you buy, so the amount is different every month, which makes it variable. Rent, insurance, and a fixed phone plan cost the same amount every month, which makes them fixed expenses."
      },
      {
        id: "br3",
        question: "A budget PLANS how you'll spend money before you spend it. A spending tracker RECORDS what you already spent. If you write down every purchase after you make it, which one are you doing?",
        options: [
          "Using a spending tracker, since you're recording money already spent",
          "Creating a budget, since you're planning future spending decisions",
          "Doing both at the exact same time, since they're the same tool",
          "Neither one, since writing down purchases doesn't count as real money management"
        ],
        correctAnswer: 0,
        explanation: "Writing down what you already bought is recording the past: that's a spending tracker. A budget looks forward and plans spending BEFORE it happens, which is a different action."
      },
      {
        id: "br4",
        question: "'Paying yourself first' means putting money into savings as soon as you get paid, before spending on anything else. Which person is paying themselves first?",
        options: [
          "Maria, who moves $50 into savings the moment her paycheck arrives",
          "Diego, who saves whatever happens to be left over at the end of the month",
          "Priya, who only saves money during months when she has extra cash",
          "Sam, who spends first and plans to save starting next month"
        ],
        correctAnswer: 0,
        explanation: "Maria saves immediately, before any other spending happens: that's the definition of paying yourself first. Diego, Priya, and Sam all save last (if at all), which is the opposite approach."
      },
      {
        id: "br5",
        question: "A budget helps you decide, in advance, how you'll use your money. If you make $400 this month and plan out $200 for necessities, $100 for savings, and $100 for fun BEFORE you spend anything, what are you doing?",
        options: [
          "Creating a budget, because you're planning your spending ahead of time",
          "Tracking your spending, because you're recording money you already spent",
          "Restricting yourself from ever spending money on anything enjoyable at all",
          "Making a mistake, since budgets should only include necessities and savings"
        ],
        correctAnswer: 0,
        explanation: "Deciding how money will be used before spending it is the definition of a budget. This example even includes $100 of planned fun money, which shows a good budget isn't about restriction. It plans for enjoyment too."
      },
      {
        id: "br6",
        question: "Without a budget, it's easy to lose track of how much you've spent. If Ethan doesn't plan his spending and buys things impulsively all month, what is he MOST at risk of?",
        options: [
          "Running out of money before his next paycheck arrives",
          "Automatically saving more money than someone who budgets",
          "Paying exactly the same amount every month without noticing",
          "Earning a higher paycheck as a result of not planning"
        ],
        correctAnswer: 0,
        explanation: "Without a plan, spending tends to drift upward until the money runs out, which is the main risk of skipping a budget. Budgeting doesn't affect how much you earn; it affects whether your spending matches what you earn."
      },
      {
        id: "br7",
        question: "A common myth is that a budget means you can never spend money on fun things. In reality, a good budget:",
        options: [
          "Includes planned room for fun spending, alongside needs and savings",
          "Only allows money for rent, bills, and groceries: nothing else",
          "Requires you to save every single dollar you earn with no exceptions",
          "Works only if you never spend money on anything you enjoy"
        ],
        correctAnswer: 0,
        explanation: "A good budget plans for ALL categories of spending, including fun money. It just makes sure that spending is intentional rather than accidental. The myth that budgets ban fun spending is exactly that: a myth."
      }
    ]
  },
  // ═══════════════════════════════════════════════
  // INCOME-1: harder
  // ═══════════════════════════════════════════════
  {
    lessonId: "income-1-hard",
    questions: [
      {
        id: "ih1",
        question: "Tyler manages an Airbnb rental he owns. He personally cleans it between every guest, replies to messages throughout the day, and handles every repair himself. Is Tyler's rental income active or passive?",
        options: [
          "Active: he's still trading his own time and effort for the income",
          "Passive: rental income is always considered passive regardless of the work involved",
          "Both equally: half of it counts as active and half as passive automatically",
          "Neither: rental income doesn't count as earned money at all"
        ],
        correctAnswer: 0,
        explanation: "What makes income passive isn't the source (rental vs. job). It's whether you keep trading ongoing time and effort for it. Since Tyler is doing hands-on work for every guest, this is active income wearing a 'rental' label."
      },
      {
        id: "ih2",
        question: "Camila works 15 hours a week at $14/hour and also earns $3/week in interest from her savings account. Over a 4-week month, how much of her total income comes from PASSIVE sources?",
        options: [
          "$12: just the interest earned over the 4 weeks ($3 × 4)",
          "$852: her total income from both wages and interest combined",
          "$60: mistaking one week's wages for her total interest earned",
          "$840: her wage income from the job, mislabeled as passive"
        ],
        correctAnswer: 0,
        explanation: "Only the interest is passive: $3 × 4 weeks = $12. Her wages ($14 × 15 hours × 4 weeks = $840) are active income, since she has to keep working the hours to earn them."
      },
      {
        id: "ih3",
        question: "Diego earns $400/month from a full-time job and $100/month from dividends on stock he owns. His job unexpectedly cuts his hours in half next month, while his dividend income stays the same. What percentage of his USUAL total monthly income can he still count on next month?",
        options: [
          "60%: because his dividend income keeps flowing even though his job income dropped",
          "50%: assuming both his job and his dividend income get cut in half",
          "20%: mistaking his dividend income alone for his total remaining income",
          "80%: treating only $100 of his job income as lost instead of half of $400"
        ],
        correctAnswer: 0,
        explanation: "Usual total: $400 + $100 = $500. Next month: $200 (half the job) + $100 (unchanged dividends) = $300. $300 ÷ $500 = 60%. The dividend income doesn't depend on his job hours at all, which is exactly why it's valuable during a job disruption."
      },
      {
        id: "ih4",
        question: "Tax and financial terminology sometimes groups income as 'earned' (from working: wages, tips, salaries) vs. 'unearned' (interest, dividends, rental income, gifts). Which of these is the clearest example of UNEARNED income?",
        options: [
          "Dividend payments deposited automatically from stock you own",
          "An hourly wage from a summer lifeguard job",
          "Overtime pay for working extra shifts at a warehouse",
          "A commission earned for closing a sale at a retail store"
        ],
        correctAnswer: 0,
        explanation: "Dividends arrive without trading hours for them, which makes them unearned income. Wages, overtime, and commissions are all compensation tied directly to hours or effort worked, making them earned income."
      },
      {
        id: "ih5",
        question: "Amara wants to save $450 over 3 months. Her online shop earns her $30/month in hands-off passive income, and she plans to save an EQUAL amount from her part-time job each of the 3 months to make up the rest. How much does she need to save from her job each month?",
        options: [
          "$120 per month: after subtracting 3 months of $30 passive income from the goal",
          "$150 per month: dividing the full $450 goal by 3 without subtracting passive income",
          "$140 per month: subtracting only one month's passive income before dividing by 3",
          "$90 per month: mistaking her total 3-month passive income for the monthly job amount"
        ],
        correctAnswer: 0,
        explanation: "Passive income over 3 months: $30 × 3 = $90. Remaining needed: $450 − $90 = $360. Split evenly across 3 months: $360 ÷ 3 = $120 per month from her job."
      },
      {
        id: "ih6",
        question: "Right after graduating, Priya has only one income source: her full-time job. Her coworker Elena has that same job PLUS a small side income from an online store she rarely has to manage. If both lose their full-time jobs on the same day, what's the most accurate comparison of their financial positions?",
        options: [
          "Elena is somewhat better off, since her passive income continues even though her job income stopped",
          "They're in identical positions, since passive income always stops the moment a job ends too",
          "Priya is better off, since having only one income source is simpler to manage during a crisis",
          "Elena is worse off, since managing two income sources means twice the risk of losing money"
        ],
        correctAnswer: 0,
        explanation: "Passive income doesn't depend on the job that was lost, so Elena still has some money coming in while Priya has none. Having multiple income sources reduces risk during a disruption; it doesn't multiply it."
      },
      {
        id: "ih7",
        question: "Jorge is choosing between two summer plans: (1) work 10 extra hours a week at $15/hour all summer, or (2) spend the first two weeks setting up an online store that, once running, earns about $40/week with almost no ongoing effort. Which statement most accurately compares these two options?",
        options: [
          "Option 1 pays more right away, but option 2 keeps paying with little ongoing effort",
          "Option 2 is always the better financial choice, since passive income is inherently larger than active income",
          "Both options are financially identical once you account for total hours worked",
          "Option 1 is strictly better, since immediate income is always worth more, no matter the amount"
        ],
        correctAnswer: 0,
        explanation: "Option 1 pays more per week upfront ($150 vs. $40), but option 2 keeps paying with almost no continued effort after setup. The real trade-off is immediate size vs. ongoing effort required, not one option being universally 'better.'"
      }
    ]
  },
  // ═══════════════════════════════════════════════
  // INCOME-1: remedial
  // ═══════════════════════════════════════════════
  {
    lessonId: "income-1-remedial",
    questions: [
      {
        id: "ir1",
        question: "Active income means you have to keep working to keep earning it. Which of these is active income?",
        options: [
          "Wages paid for working a shift at a grocery store",
          "Rent collected every month from a house you own",
          "Interest that appears in your savings account automatically",
          "Dividend payments received automatically from stock you already own"
        ],
        correctAnswer: 0,
        explanation: "Wages require you to actually show up and work the shift. Stop working, and the wages stop too. Rent, interest, and dividends all keep coming in without you trading ongoing hours for them, which makes them passive."
      },
      {
        id: "ir2",
        question: "Passive income keeps coming in even when you're not actively working. Which of these is passive income?",
        options: [
          "Rent collected from an apartment you rarely need to manage",
          "A paycheck for hours worked at a part-time job",
          "Cash tips earned during a dinner shift at a restaurant",
          "An hourly wage earned for mowing a neighbor's lawn"
        ],
        correctAnswer: 0,
        explanation: "Rent keeps arriving even without ongoing daily work, which makes it passive. A paycheck, tips, and hourly wages all require you to work the hours to earn them, which is active income."
      },
      {
        id: "ir3",
        question: "Jake earns $10/hour walking dogs on weekends. He also has $15 sitting in a savings account that earns him $1 a year in interest, with no effort on his part. Which of Jake's income sources is passive?",
        options: [
          "The $1 in interest, since it comes in without him doing any work",
          "The dog-walking money, since it comes from something he enjoys doing",
          "Both of them equally, since Jake earns both kinds of money",
          "Neither one, since $1 and hourly pay are both too small to count as real income"
        ],
        correctAnswer: 0,
        explanation: "The interest arrives automatically with no ongoing effort, which makes it passive. Dog-walking requires Jake to actually show up and work, no matter how much he enjoys it, which makes it active income."
      },
      {
        id: "ir4",
        question: "One advantage of passive income is that it can keep paying you even while you sleep or take a day off. Why is that considered valuable?",
        options: [
          "It provides income that doesn't stop when you personally stop working",
          "It always pays significantly more money than any active income source",
          "It means you'll never have to pay taxes on that money",
          "It guarantees the income will keep growing larger every single year"
        ],
        correctAnswer: 0,
        explanation: "The value of passive income is that it's not tied to your personal hours, so it doesn't stop just because you did. It isn't automatically bigger, tax-free, or guaranteed to grow; those are separate (and untrue) claims."
      },
      {
        id: "ir5",
        question: "Passive income sources (like owning rental property or stocks) usually require money saved up first before they can start paying you. Why do most teens start out earning active income instead?",
        options: [
          "They typically don't have the upfront savings needed to buy income-producing assets yet",
          "Active income is against the rules for anyone under 18 to earn",
          "Passive income is illegal for teenagers to receive under any circumstance",
          "Employers only allow adults to be paid through passive income streams"
        ],
        correctAnswer: 0,
        explanation: "Most passive income sources (rental property, stocks, etc.) need money upfront to buy into them. Since most teens haven't saved that up yet, active income (trading time for pay) is usually the realistic starting point."
      },
      {
        id: "ir6",
        question: "Sofia babysits for $10/hour and also keeps $200 in a savings account that pays her interest automatically. The interest she earns from that account is an example of:",
        options: [
          "Passive income, since it comes in without any ongoing work from her",
          "Active income, since she had to open the account herself",
          "A gift, since banks are simply giving her free money",
          "Babysitting income, since all her money comes from the same source"
        ],
        correctAnswer: 0,
        explanation: "Opening the account was a one-time action, not ongoing work. The interest itself keeps arriving automatically after that, which makes it passive income, not active income or a gift."
      },
      {
        id: "ir7",
        question: "Having more than one source of income (for example, both a job AND a passive income stream) is valuable mainly because:",
        options: [
          "If one income source stops, another one still brings in money",
          "It's required by law once you turn 16 years old",
          "It automatically doubles your total amount of free time",
          "It means you never have to file taxes on either source"
        ],
        correctAnswer: 0,
        explanation: "The main benefit of multiple income sources is protection: losing one job or stream doesn't mean losing all your income. It has nothing to do with legal requirements, free time, or taxes."
      }
    ]
  },
  // ═══════════════════════════════════════════════
  // CREDIT-1: harder
  // ═══════════════════════════════════════════════
  {
    lessonId: "credit-1-hard",
    questions: [
      {
        id: "ch1",
        question: "When Malik uses a credit card to buy a $40 pair of shoes, which of the following best describes what's actually happening financially at the moment of that purchase?",
        options: [
          "The credit card company is lending Malik $40 to pay back later",
          "Malik is spending $40 that was already sitting in his own bank account",
          "The store is giving Malik the shoes for free in exchange for his reputation",
          "Malik's credit score automatically pays the $40 on his behalf immediately"
        ],
        correctAnswer: 0,
        explanation: "A credit card purchase is a loan from the card company, not a withdrawal from Malik's own money, which is the core difference between credit and debit. A credit score is just a number describing his repayment history; it doesn't pay anything itself."
      },
      {
        id: "ch2",
        question: "Elena has a credit card with a $2,000 limit that she can borrow against repeatedly as she pays it down, and a car loan for a fixed $15,000 that's paid off in set monthly payments until it reaches zero and closes. Which statement correctly labels these two types of credit?",
        options: [
          "The credit card is revolving credit; the car loan is installment credit",
          "Both are examples of revolving credit, since both involve borrowing money",
          "The credit card is installment credit; the car loan is revolving credit",
          "Both are examples of installment credit, since both must eventually be paid off"
        ],
        correctAnswer: 0,
        explanation: "Revolving credit (the card) lets you borrow, repay, and borrow again up to a limit. Installment credit (the car loan) is a fixed amount paid down in set payments until it's gone and the account closes. They're structurally different, not just two words for the same thing."
      },
      {
        id: "ch3",
        question: "Devon has two credit cards: one with a $500 limit and a $250 balance, and another with a $1,500 limit and a $150 balance. What is Devon's OVERALL credit utilization rate across both cards combined?",
        options: [
          "20%: total balances ($400) divided by total limits ($2,000)",
          "50%: using only the first card's balance and limit, ignoring the second card",
          "10%: using only the second card's balance and limit, ignoring the first card",
          "30%: averaging each card's individual utilization rate instead of combining totals"
        ],
        correctAnswer: 0,
        explanation: "Combine everything first: total balance $250 + $150 = $400; total limit $500 + $1,500 = $2,000. $400 ÷ $2,000 = 20%. Calculating just one card, or averaging two separate percentages, gives the wrong overall rate."
      },
      {
        id: "ch4",
        question: "A store credit card advertises a 24% 'interest rate,' but Priya notices her monthly statement also includes an annual fee and a separate late-payment fee. Which term best captures the TOTAL yearly cost of borrowing, including fees like these, not just the interest rate alone?",
        options: [
          "APR: the rate that includes fees and interest",
          "Principal: the original amount of money borrowed",
          "Credit limit: the maximum amount you're allowed to borrow",
          "Minimum payment: the smallest required payment each month"
        ],
        correctAnswer: 0,
        explanation: "APR is designed to roll fees and interest together into one yearly cost figure, so it's usually higher than the advertised interest rate alone. Principal is the amount borrowed, credit limit is the max you can borrow, and minimum payment is the smallest required payment, and none of those measure total cost."
      },
      {
        id: "ch5",
        question: "A car loan is backed by the car itself, so if payments stop, the lender can repossess the car. A typical credit card isn't backed by any specific item. What are these two categories of credit called?",
        options: [
          "The car loan is secured credit; the credit card is unsecured credit",
          "The car loan is unsecured credit; the credit card is secured credit",
          "Both are examples of secured credit, since both require the borrower to qualify first",
          "Both are examples of unsecured credit, since neither is physically held by the lender"
        ],
        correctAnswer: 0,
        explanation: "Secured credit is backed by collateral the lender can take if you stop paying (the car). Unsecured credit has no specific item backing it (a typical credit card). Qualifying to borrow isn't the same thing as collateral backing the loan."
      },
      {
        id: "ch6",
        question: "Kayla has a $1,000 credit card balance at a high interest rate. If she only ever makes the minimum payment each month, and that minimum payment is less than the interest charged that month, what happens to her balance over time?",
        options: [
          "Her balance grows larger each month, even though she keeps making payments",
          "Her balance stays exactly the same every month as long as she keeps paying",
          "Her balance shrinks slowly but steadily every single month",
          "Her balance reaches zero eventually, just more slowly than paying the full amount"
        ],
        correctAnswer: 0,
        explanation: "If the payment is smaller than the interest charged, the unpaid interest gets added to the balance, so the balance actually grows month over month, even while payments are technically being made on time."
      },
      {
        id: "ch7",
        question: "Jamal borrows $3,000 to get a certification that typically increases pay by $2/hour, and separately borrows $3,000 for a vacation. Both loans have the same 10% interest rate. Which statement most accurately compares these two debts?",
        options: [
          "The certification loan is more likely 'good debt,' since it raises future earning power",
          "Both loans are equally good debt, since they're for the same amount at the same interest rate",
          "The vacation loan is better debt, since experiences are more valuable than certifications",
          "Neither loan qualifies as debt at all, since both amounts are the same size"
        ],
        correctAnswer: 0,
        explanation: "Good vs. bad debt depends on what the money is used for and whether it's likely to pay for itself over time, not on the loan amount or interest rate, which are identical here. The certification has a realistic path to increased income; the vacation doesn't."
      }
    ]
  },
  // ═══════════════════════════════════════════════
  // CREDIT-1: remedial
  // ═══════════════════════════════════════════════
  {
    lessonId: "credit-1-remedial",
    questions: [
      {
        id: "cr1",
        question: "Credit means borrowing money now with a promise to pay it back later, often with interest added. Which of these is an example of USING credit?",
        options: [
          "Buying a $30 shirt with a credit card, paid off next month",
          "Buying a $30 shirt with cash you already have in your wallet",
          "Buying a $30 shirt using a gift card someone gave you",
          "Buying a $30 shirt by trading in an old shirt you no longer wear"
        ],
        correctAnswer: 0,
        explanation: "Only the credit card purchase involves borrowing money you don't yet have and promising to repay it. Cash, gift cards, and trades all use money or value you already have, so no borrowing involved."
      },
      {
        id: "cr2",
        question: "Interest is the extra amount you pay for the privilege of borrowing money instead of paying right away. If you borrow $100 and end up paying back $110 total, how much interest did you pay?",
        options: [
          "$10: the extra amount above the original $100 borrowed",
          "$110: the entire amount you paid back to the lender",
          "$100: the original amount you borrowed in the first place",
          "$0: interest only applies to loans from banks, not everyday borrowing"
        ],
        correctAnswer: 0,
        explanation: "$110 total paid − $100 originally borrowed = $10. That extra $10 is the interest: the cost of borrowing instead of paying with money you already had."
      },
      {
        id: "cr3",
        question: "A credit score is a number that tells lenders how reliably you've paid back money in the past. Which behavior would most likely HELP build a strong credit score over time?",
        options: [
          "Consistently paying at least the minimum amount on time, every month",
          "Maxing out every credit card you're given as often as possible",
          "Ignoring bills whenever money feels a little tight that month",
          "Applying for as many new credit cards as possible in a single week"
        ],
        correctAnswer: 0,
        explanation: "On-time payments are the single biggest factor in most credit scores. Maxing out cards, missing payments, and applying for many cards at once are all behaviors that typically hurt a credit score instead."
      },
      {
        id: "cr4",
        question: "Good debt is borrowing for something likely to grow in value or increase your future income, like a student loan. Bad debt is borrowing for things that lose value quickly or charge very high interest, like some payday loans. Which of these is an example of good debt?",
        options: [
          "A loan for job training that's expected to raise your future income",
          "A high-interest payday loan taken out to buy concert tickets",
          "Credit card debt built up buying items you didn't need",
          "A loan used to buy the newest phone the day it releases"
        ],
        correctAnswer: 0,
        explanation: "Job training has a realistic path to increasing future income, which is the definition of good debt used here. A payday loan for tickets, unnecessary credit card purchases, and a depreciating phone are all examples of bad debt."
      },
      {
        id: "cr5",
        question: "The minimum payment is the smallest amount you're allowed to pay on a credit card bill without being considered late. Why is paying ONLY the minimum payment every month usually a bad idea?",
        options: [
          "Interest keeps building on the leftover balance, so the debt shrinks very slowly",
          "It's actually the fastest way to pay off a credit card balance completely",
          "Credit card companies stop charging any interest once you pay the minimum",
          "It automatically raises your credit score every single time you do it"
        ],
        correctAnswer: 0,
        explanation: "Interest keeps accumulating on the unpaid balance, so paying only the minimum lets the balance shrink very slowly, or even grow if the minimum is smaller than the interest charged that month."
      },
      {
        id: "cr6",
        question: "A credit limit is the maximum amount a lender allows you to borrow on a credit card at one time. If your credit limit is $1,000 and your current balance is $600, how much more could you charge before reaching your limit?",
        options: [
          "$400: the difference between the $1,000 limit and the $600 already owed",
          "$1,000: the full credit limit, as if the balance doesn't reduce what's available",
          "$600: mistaking the current balance itself for the remaining available credit",
          "$1,600: adding the balance and the limit together instead of subtracting"
        ],
        correctAnswer: 0,
        explanation: "$1,000 limit − $600 already owed = $400 still available to charge before hitting the limit."
      },
      {
        id: "cr7",
        question: "Why should you generally use credit carefully, even though it can be a helpful financial tool?",
        options: [
          "Borrowed money still has to be paid back, usually with added interest",
          "Credit is completely free money that never needs to be repaid",
          "Using credit has no effect on your financial future either way",
          "Credit can only be used one single time per person in their entire life"
        ],
        correctAnswer: 0,
        explanation: "Credit is a loan, not free money. It has to be repaid, and interest adds real cost if it isn't paid off quickly. That's exactly why it's a powerful tool when used carefully and a risk when it isn't."
      }
    ]
  }
]
