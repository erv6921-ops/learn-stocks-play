import { QuizQuestion } from "@/types"

// Adaptive-difficulty pools: <lessonId>-hard and <lessonId>-remedial, 7 each.
export const diffBatch04: { lessonId: string; questions: QuizQuestion[] }[] = [
  // ═══════════════════════════════════════════════
  // BUDGET-6: Emergency Funds
  // ═══════════════════════════════════════════════
  {
    lessonId: "budget-6-hard",
    questions: [
      {
        id: "budget-6-h1",
        question: "Priya spends $2,800 a month. She has $6,000 saved. How many more months of a full 6-month emergency fund does she still need to save?",
        options: [
          "About 3.9 months, because $16,800 minus $6,000 is $10,800",
          "About 2.1 months, because $6,000 already covers most of it",
          "Exactly 6 months, because her current savings do not count",
          "About 0.5 months, because $6,000 is nearly enough already"
        ],
        correctAnswer: 0,
        explanation: "A 6-month fund is 6 x $2,800 = $16,800; she has $6,000, leaving $10,800, which is $10,800 / $2,800 = about 3.9 more months of expenses to save."
      },
      {
        id: "budget-6-h2",
        question: "Marcus keeps his $9,000 emergency fund fully invested in stocks. The market drops 40% the same week he is laid off. What is the real cost of his choice?",
        options: [
          "Nothing at all, because the stock market always recovers within a single week",
          "He earns extra dividends that conveniently offset the entire paper loss",
          "The bank temporarily freezes his account until the market fully recovers",
          "His fund is now worth only about $5,400, forcing him to sell low"
        ],
        correctAnswer: 3,
        explanation: "A 40% drop turns $9,000 into $5,400, and being forced to sell during a crash locks in the loss, which is why emergency funds prioritize safety and access over growth."
      },
      {
        id: "budget-6-h3",
        question: "Dana wants a 4-month fund but her expenses just rose from $2,000 to $2,500 a month. Her old target was based on the old expenses. How much must her target increase?",
        options: [
          "By $500, from $8,000 to $8,500",
          "By $2,000, from $8,000 to $10,000",
          "It stays at $8,000 because the fund is already set",
          "By $2,500, because she needs one extra month"
        ],
        correctAnswer: 1,
        explanation: "Her target is 4 months of expenses, so it moves from 4 x $2,000 = $8,000 to 4 x $2,500 = $10,000, an increase of $2,000."
      },
      {
        id: "budget-6-h4",
        question: "Which of these is a TRUE emergency that an emergency fund is designed for, rather than a predictable expense that belongs in a sinking fund?",
        options: [
          "The annual car registration renewal that arrives every March",
          "Holiday gifts you buy for family every December",
          "A sudden $1,200 furnace failure in the middle of winter",
          "A yearly insurance premium reliably billed to you each January"
        ],
        correctAnswer: 2,
        explanation: "A sudden furnace failure is unexpected and necessary, while registration, holidays, and yearly premiums are predictable and should be saved for in advance with sinking funds."
      },
      {
        id: "budget-6-h5",
        question: "Leo just used $2,400 from his emergency fund for a medical bill. He also wanted to buy a $600 gaming console this month. What is the smartest move?",
        options: [
          "Buy the console now and rebuild the fund whenever it is convenient",
          "Put the console on a credit card and pay the minimum",
          "Pause the console purchase and redirect that money to refill the fund first",
          "Assume the fund does not need refilling since he only used it once"
        ],
        correctAnswer: 2,
        explanation: "After tapping the fund you are more exposed, so rebuilding it takes priority over discretionary buys like a console until your safety net is restored."
      },
      {
        id: "budget-6-h6",
        question: "Two savers each earn $3,000 a month. Ana keeps a 6-month fund in a high-yield savings account; Ben keeps his in checking earning 0%. At 4% APY, roughly what does Ana gain in a year that Ben does not?",
        options: [
          "Nothing, because both accounts are equally safe and liquid",
          "About $720 in interest on her roughly $18,000 fund",
          "About $7,200, since interest compounds monthly to that level",
          "About $180, because only $4,500 earns interest"
        ],
        correctAnswer: 1,
        explanation: "A 6-month fund is 6 x $3,000 = $18,000, and 4% of $18,000 is about $720 a year, which Ana earns while keeping the same safety and access Ben has."
      },
      {
        id: "budget-6-h7",
        question: "A freelancer with unstable income is deciding on an emergency fund size. Why might they aim closer to 6 months than the 3-month minimum?",
        options: [
          "Because freelancers are strictly required by law to hold much larger emergency funds",
          "Because a bigger emergency fund earns a higher interest rate automatically",
          "Because income gaps are more likely and can last longer without steady pay",
          "Because 3 months of expenses is impossible for anyone to save"
        ],
        correctAnswer: 2,
        explanation: "Irregular income means dry spells are more frequent and less predictable, so a larger cushion of 6 months provides more security than the 3-month floor."
      }
    ]
  },
  {
    lessonId: "budget-6-remedial",
    questions: [
      {
        id: "budget-6-r1",
        question: "What is the main purpose of an emergency fund?",
        options: [
          "To buy fun things for yourself when they go on sale",
          "To cover unexpected costs like a job loss or sudden repair",
          "To pay for a fully planned vacation trip next summer",
          "To grow rich very quickly by taking big investment risks"
        ],
        correctAnswer: 1,
        explanation: "An emergency fund is money set aside for surprise, necessary costs so one bad event does not turn into a crisis."
      },
      {
        id: "budget-6-r2",
        question: "How many months of expenses is a common goal for a full emergency fund?",
        options: [
          "3 to 6 months",
          "1 to 2 days",
          "10 to 12 years",
          "Half of one month"
        ],
        correctAnswer: 0,
        explanation: "A common target is 3 to 6 months of living expenses, enough to stay afloat if income stops for a while."
      },
      {
        id: "budget-6-r3",
        question: "Where is a good place to keep an emergency fund?",
        options: [
          "In risky, volatile cryptocurrency coins",
          "In a high-yield savings account",
          "In a single hot momentum stock",
          "Buried somewhere in the backyard"
        ],
        correctAnswer: 1,
        explanation: "A high-yield savings account is safe, easy to reach, and earns a little interest, which is exactly what an emergency fund needs."
      },
      {
        id: "budget-6-r4",
        question: "Which of these is a real emergency?",
        options: [
          "A limited-time weekend sale on brand-new sneakers",
          "A weekend concert night out with your friends",
          "An unexpected car repair needed to get to work",
          "A shiny new phone you have wanted for months"
        ],
        correctAnswer: 2,
        explanation: "An unexpected car repair you need for work is both surprising and necessary, which makes it a true emergency."
      },
      {
        id: "budget-6-r5",
        question: "If your expenses are $1,000 a month, how much is a 3-month emergency fund?",
        options: [
          "$300",
          "$1,000",
          "$3,000",
          "$30,000"
        ],
        correctAnswer: 2,
        explanation: "Three months at $1,000 each is 3 x $1,000 = $3,000."
      },
      {
        id: "budget-6-r6",
        question: "Why should an emergency fund be easy to access?",
        options: [
          "So you can spend it on fun treats anytime you want",
          "Because emergencies happen fast and you may need the money quickly",
          "So the bank can charge you extra fees on withdrawals",
          "So your friends can easily borrow money from it"
        ],
        correctAnswer: 1,
        explanation: "Emergencies do not wait, so the money must be reachable quickly when a surprise cost hits."
      },
      {
        id: "budget-6-r7",
        question: "What should you do after you use some of your emergency fund?",
        options: [
          "Forget about it and never refill it",
          "Rebuild it before spending on extras",
          "Replace it only with a new credit card",
          "Assume you will never need it again"
        ],
        correctAnswer: 1,
        explanation: "Once the fund is used, refilling it comes first so you stay protected for the next surprise."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // BUDGET-7: Lifestyle Inflation / Avoiding Budget Busters
  // ═══════════════════════════════════════════════
  {
    lessonId: "budget-7-hard",
    questions: [
      {
        id: "budget-7-h1",
        question: "Tara gets a $6,000 annual raise. She immediately upgrades her apartment for $400 more a month and leases a nicer car for $150 more a month. How much of her raise is left to save?",
        options: [
          "The full $6,000, because a raise is always pure extra money",
          "$0, because her $6,600 of new yearly spending exceeds the raise",
          "$3,000, because she only spends about half of the raise",
          "$600, because only the leased car counts against the raise"
        ],
        correctAnswer: 1,
        explanation: "Her new spending is ($400 + $150) x 12 = $6,600 a year, which is more than the $6,000 raise, so lifestyle inflation leaves nothing to save."
      },
      {
        id: "budget-7-h2",
        question: "Sam audits his subscriptions: $11 streaming, $10 music, $40 unused gym, and $9 cloud storage. He cancels only the one he never uses. How much does he save per year?",
        options: [
          "$120, from cutting only the music streaming service",
          "$840, from cutting every subscription on the list",
          "$132, from cutting only the video streaming service",
          "$480, cutting only the gym he never uses"
        ],
        correctAnswer: 3,
        explanation: "The clearly unused item is the $40 gym, and $40 x 12 = $480 saved per year by cutting what he does not use."
      },
      {
        id: "budget-7-h3",
        question: "A jacket normally $120 is on sale for 40% off. Jae does not need it and would not pay full price. What is the smartest way to evaluate this purchase?",
        options: [
          "Buy it right away, because saving a full $48 is a guaranteed win",
          "Skip it, because 40% off something unneeded still wastes $72",
          "Buy two of them so the total per-item savings are even larger",
          "Buy it since discounted sale items never count against a monthly budget"
        ],
        correctAnswer: 1,
        explanation: "The sale price is still $72 out of pocket, and spending on something he neither needs nor would buy at full price is money wasted, not saved."
      },
      {
        id: "budget-7-h4",
        question: "Which spending pattern best signals emotional spending rather than planned spending?",
        options: [
          "Paying rent on the first of each month",
          "Ordering takeout every time work gets stressful",
          "Buying groceries from a weekly list",
          "Transferring a set amount to savings on payday"
        ],
        correctAnswer: 1,
        explanation: "Buying in response to a feeling like stress is emotional spending, a classic budget buster, unlike scheduled, list-based, planned expenses."
      },
      {
        id: "budget-7-h5",
        question: "Nina expects $720 of holiday spending in December. To avoid a December budget buster, how much should she set aside monthly starting in January?",
        options: [
          "$720 in December only",
          "$60 a month across the year",
          "$120 a month for six months",
          "Nothing, because holidays are a surprise"
        ],
        correctAnswer: 1,
        explanation: "Spreading a predictable $720 across 12 months is $720 / 12 = $60 a month, which prevents a year-end shock."
      },
      {
        id: "budget-7-h6",
        question: "A budget of $2,000 sets aside 5% as a miscellaneous buffer. A surprise $85 birthday gift comes up. Does the buffer absorb it without derailing the plan?",
        options: [
          "No, because the miscellaneous buffer is only $20",
          "No, because buffers cannot ever be used for gifts",
          "Yes, but only if she cancels her rent payment",
          "Yes, because the $100 buffer covers the $85 gift"
        ],
        correctAnswer: 3,
        explanation: "5% of $2,000 is $100, which comfortably covers the $85 gift, showing how a small buffer keeps surprises from wrecking a budget."
      },
      {
        id: "budget-7-h7",
        question: "Two coworkers each get the same raise. Ravi keeps his spending flat and invests the raise; Cole upgrades his lifestyle to match. Ten years later, why is Ravi wealthier?",
        options: [
          "Because raises only ever help the people who quickly spend them",
          "Because he avoided lifestyle inflation, so the raise built savings instead of bills",
          "Because Cole had secretly been earning a much lower salary the whole time",
          "Because investing is simply not allowed after a raise for Cole"
        ],
        correctAnswer: 1,
        explanation: "By keeping expenses stable, Ravi turned each raise into savings and growth, while Cole's lifestyle inflation converted his raise into permanently higher spending."
      }
    ]
  },
  {
    lessonId: "budget-7-remedial",
    questions: [
      {
        id: "budget-7-r1",
        question: "What is 'lifestyle inflation'?",
        options: [
          "Spending more as you earn more",
          "Prices at the grocery store going up",
          "Saving more every single month",
          "A type of savings account"
        ],
        correctAnswer: 0,
        explanation: "Lifestyle inflation is when your spending rises to match a higher income, which can keep you from getting ahead."
      },
      {
        id: "budget-7-r2",
        question: "What is a 'budget buster'?",
        options: [
          "A helpful automatic mobile savings app",
          "A special type of bank account",
          "An unplanned expense that wrecks your budget",
          "A professional, certified personal money and financial advisor"
        ],
        correctAnswer: 2,
        explanation: "A budget buster is an unexpected or unplanned cost that blows a hole in your spending plan."
      },
      {
        id: "budget-7-r3",
        question: "Which trick helps you avoid impulse buys?",
        options: [
          "Shop right when you are very hungry",
          "Buy first and think about it later",
          "Wait a day or two before buying non-essentials",
          "Always pay full price as quickly as possible"
        ],
        correctAnswer: 2,
        explanation: "Waiting a day or two breaks the impulse and many 'must-haves' feel less urgent afterward."
      },
      {
        id: "budget-7-r4",
        question: "Why can small subscriptions become a budget buster?",
        options: [
          "They are always priced at over $100 each",
          "Small monthly charges add up and are easy to forget",
          "They can never ever be cancelled once you sign up",
          "They must always be paid up front in one yearly lump"
        ],
        correctAnswer: 1,
        explanation: "Several small monthly fees quietly add up to a large yearly total that you may not even notice."
      },
      {
        id: "budget-7-r5",
        question: "You get a raise. What is a smart choice to avoid lifestyle inflation?",
        options: [
          "Instantly upgrade both your car and your bigger apartment",
          "Spend every single dollar of it on fun treats",
          "Keep spending similar and save part of the raise",
          "Buy the most expensive version of everything"
        ],
        correctAnswer: 2,
        explanation: "Keeping spending steady and saving part of a raise turns extra income into progress instead of higher bills."
      },
      {
        id: "budget-7-r6",
        question: "How can you prepare for holiday spending?",
        options: [
          "Just ignore it entirely until early next December",
          "Save a little each month during the year",
          "Put it all on a credit card",
          "Skip buying all holiday gifts forever"
        ],
        correctAnswer: 1,
        explanation: "Holidays happen every year, so saving a bit each month spreads the cost and avoids a big December hit."
      },
      {
        id: "budget-7-r7",
        question: "Something you do not need is 50% off. What should you ask yourself?",
        options: [
          "How many of these should I just go ahead and buy?",
          "Can I get it even cheaper somewhere next week?",
          "Which of the available colors looks the very best?",
          "Would I buy this at full price if I needed it?"
        ],
        correctAnswer: 3,
        explanation: "A discount on something you do not need still costs money, so ask whether you truly need it before buying."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // BUDGET-8: Goal Budgeting / Budgeting Tools and Apps
  // ═══════════════════════════════════════════════
  {
    lessonId: "budget-8-hard",
    questions: [
      {
        id: "budget-8-h1",
        question: "Omar links his bank to an app that auto-imports transactions, while Lea tracks purchases by hand in a notebook. Both miss recording a $40 cash tip. Whose budget is more likely to stay accurate over time and why?",
        options: [
          "Lea, because her handwriting is always far more accurate than apps",
          "Neither, because both of these methods require linking a bank",
          "Lea, because budgeting apps cannot categorize spending at all",
          "Omar, because automatic syncing captures most transactions even when memory fails"
        ],
        correctAnswer: 3,
        explanation: "Automatic syncing captures the vast majority of purchases without relying on memory, so Omar's app-based budget tends to stay more accurate than manual tracking that depends on discipline."
      },
      {
        id: "budget-8-h2",
        question: "Using the cash envelope method, Kim puts $250 in Groceries and $80 in Gas. Mid-month the Groceries envelope has $30 left and Gas has $0, but she needs more gas. What does the method say to do?",
        options: [
          "Borrow freely from any other spending envelope since it all evens out anyway",
          "Stop gas spending or consciously move cash from Groceries, keeping the total fixed",
          "Just use a credit card because envelopes simply do not apply to gas",
          "Refill both of the empty envelopes with brand-new money pulled from savings"
        ],
        correctAnswer: 1,
        explanation: "The envelope method enforces limits by category; once Gas is empty she must stop or deliberately reallocate the remaining Groceries cash, keeping her overall spending capped."
      },
      {
        id: "budget-8-h3",
        question: "A privacy-focused user refuses to link bank accounts to any app but wants full control over categories and formulas. Which tool best fits, and why?",
        options: [
          "A bank-syncing app, simply because it is by far the most automated option here",
          "A social budgeting app that openly shares all their data publicly",
          "A custom spreadsheet, because it needs no bank link and allows total customization",
          "Whatever budgeting tool their own close friends happen to use most"
        ],
        correctAnswer: 2,
        explanation: "A spreadsheet gives complete control over categories and formulas without linking bank data, which is exactly what a privacy-conscious, customization-focused user wants."
      },
      {
        id: "budget-8-h4",
        question: "When comparing budgeting apps, which combination of features matters MOST for protecting your linked financial data?",
        options: [
          "Colorful charts and a large template library",
          "Strong encryption plus two-factor authentication",
          "Social sharing and public leaderboards",
          "The lowest possible monthly price"
        ],
        correctAnswer: 1,
        explanation: "Because the app can access your financial data, security features like strong encryption and two-factor authentication matter more than looks, sharing, or price."
      },
      {
        id: "budget-8-h5",
        question: "Rosa uses one app to track past spending, another to actively plan each dollar, and a spreadsheet for long-term goals. Is using multiple tools a mistake?",
        options: [
          "Yes, because you must only ever use one single tool",
          "Yes, because using more tools always means worse budgeting overall",
          "No, but only because it happens to cost her a lot more money",
          "No, because different tools serve different purposes and she uses each well"
        ],
        correctAnswer: 3,
        explanation: "Different tools excel at different jobs like tracking, active budgeting, and long-term planning, so combining them purposefully is reasonable, not a mistake."
      },
      {
        id: "budget-8-h6",
        question: "A budgeting app offers a beautiful interface but you keep forgetting to open it, while a plain notebook you check daily keeps you on track. Which is the better tool for you?",
        options: [
          "The app, of course, because prettier tools are just always automatically better",
          "The notebook, because the best tool is the one you consistently use",
          "Neither one, because only the expensive paid tools actually work",
          "The app, because a plain paper notebook cannot track money"
        ],
        correctAnswer: 1,
        explanation: "A budgeting method only works if you stick with it, so a simple notebook you use daily beats a polished app you abandon."
      },
      {
        id: "budget-8-h7",
        question: "Two visual learners want to SEE their budget clearly. Which pair of approaches suits them best?",
        options: [
          "Doing all of the hard mental math and reading plain, text-only statements",
          "The cash envelope method and an app with charts and progress bars",
          "Memorizing running totals in their head and avoiding all tools",
          "Only reading through the printed paper bank statements each month"
        ],
        correctAnswer: 1,
        explanation: "Visual learners benefit from seeing money physically in envelopes or graphically as charts and progress bars, unlike mental math or text-only statements."
      }
    ]
  },
  {
    lessonId: "budget-8-remedial",
    questions: [
      {
        id: "budget-8-r1",
        question: "What is one main benefit of a budgeting app?",
        options: [
          "It guarantees you will get rich",
          "It automatically tracks your spending",
          "It pays your bills for free",
          "It replaces the need to earn money"
        ],
        correctAnswer: 1,
        explanation: "Budgeting apps automatically track and sort your spending so you can see where your money goes."
      },
      {
        id: "budget-8-r2",
        question: "In the envelope method, what happens when an envelope is empty?",
        options: [
          "You keep spending anyway",
          "You get more money automatically",
          "You stop spending in that category",
          "You mail the envelope to the bank"
        ],
        correctAnswer: 2,
        explanation: "When a category envelope is empty, you stop spending in that category until the next budget period."
      },
      {
        id: "budget-8-r3",
        question: "Why do some people prefer a spreadsheet for budgeting?",
        options: [
          "It is required to link to every bank by law",
          "It gives more control and does not require sharing bank data",
          "It automatically fills itself in without any manual typing",
          "It is the one and only budgeting tool that is officially allowed"
        ],
        correctAnswer: 1,
        explanation: "Spreadsheets let you customize everything and avoid linking your bank, which many privacy-minded people like."
      },
      {
        id: "budget-8-r4",
        question: "Which feature helps keep a budgeting app secure?",
        options: [
          "Bright colors and fun animations",
          "Public sharing of your budget",
          "A very low monthly price",
          "Two-factor login authentication and encryption"
        ],
        correctAnswer: 3,
        explanation: "Security features like two-factor authentication help protect the financial data your app can access."
      },
      {
        id: "budget-8-r5",
        question: "What is a downside of tracking every expense by hand?",
        options: [
          "It takes time and discipline to record each purchase",
          "It always costs you a steep recurring monthly fee",
          "It gives you far too little useful information",
          "It cannot be done with a notebook"
        ],
        correctAnswer: 0,
        explanation: "Manual tracking works but requires remembering to record every purchase, which takes effort and discipline."
      },
      {
        id: "budget-8-r6",
        question: "What does it mean when a budgeting app 'syncs' with your bank?",
        options: [
          "The bank pays you a small bonus",
          "Your transactions appear automatically without typing them in",
          "You must visit the bank branch in person",
          "The app deletes your bank account entirely"
        ],
        correctAnswer: 1,
        explanation: "Syncing means your purchases show up in the app automatically, so you do not have to enter them by hand."
      },
      {
        id: "budget-8-r7",
        question: "What is the most important thing when choosing a budgeting tool?",
        options: [
          "That it is the most expensive one",
          "That it is the most popular online",
          "That you will actually use it consistently",
          "That your bank chose it for you"
        ],
        correctAnswer: 2,
        explanation: "The best budgeting tool is the one you will stick with, because a tool you abandon does not help."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // BUDGET-9: Zero-Based / Variable Income Budgeting
  // ═══════════════════════════════════════════════
  {
    lessonId: "budget-9-hard",
    questions: [
      {
        id: "budget-9-h1",
        question: "Freelancer Ivy earns between $1,200 and $3,600 a month. To budget safely for variable income, which figure should her essential budget be built around?",
        options: [
          "The average of $2,400",
          "The highest month of $3,600",
          "The lowest expected month of $1,200",
          "Whatever she happens to earn that week"
        ],
        correctAnswer: 2,
        explanation: "Variable-income budgets should be built on the lowest expected month, here $1,200, so essentials are always covered and extra is saved in good months."
      },
      {
        id: "budget-9-h2",
        question: "Ivy applies the 50/30/20 rule to her $1,200 baseline. In a $3,000 month, where should the roughly $1,800 of extra income mostly go?",
        options: [
          "Into 'wants' to reward the good month",
          "Split evenly as $600 needs, $600 wants, $600 savings",
          "Spent fully, since the baseline already covered needs",
          "Into savings and her income buffer, not lifestyle upgrades"
        ],
        correctAnswer: 3,
        explanation: "With needs and baseline wants already covered by the $1,200 plan, extra income in a high month should mostly fill savings and the buffer to cover future low months."
      },
      {
        id: "budget-9-h3",
        question: "Nico deposits all income into a buffer account and pays himself a steady $2,000 'salary' monthly. He earns $3,200 then $900 in back-to-back months. Starting from $0, what is his buffer balance after paying himself both months?",
        options: [
          "$0, because the buffer always empties itself out",
          "$100, because $3,200 plus $900 minus $4,000 is $100",
          "$1,300, because only the higher earning month counts",
          "Negative $900, because the low month cannot be covered"
        ],
        correctAnswer: 1,
        explanation: "Income of $3,200 + $900 = $4,100 minus two $2,000 salaries ($4,000) leaves $100, showing how the buffer smooths a high month and a low month together."
      },
      {
        id: "budget-9-h4",
        question: "During a $700 month, Dev's essentials cost $900. Using expense prioritization, which should he pay FIRST?",
        options: [
          "A monthly video streaming subscription",
          "Rent and basic food",
          "An extra debt payment above the minimum",
          "A new pair of shoes on sale"
        ],
        correctAnswer: 1,
        explanation: "When money is short, essentials come first in order of shelter and food, before subscriptions, extra debt payments, or wants."
      },
      {
        id: "budget-9-h5",
        question: "Why should a variable-income earner keep fixed monthly bills well below their lowest month's income?",
        options: [
          "So that the bank will give them a much better interest rate on it",
          "So that they can spend the entire high-earning month completely freely",
          "Because their fixed monthly bills will shrink automatically whenever income drops",
          "So even in the worst month there is room for food and transport"
        ],
        correctAnswer: 3,
        explanation: "Keeping fixed costs below the minimum month leaves breathing room for essentials like food and transport even when income is at its lowest."
      },
      {
        id: "budget-9-h6",
        question: "In zero-based budgeting, Mia has $2,500 of income and assigns $2,300 across categories. What must she do with the remaining $200 to follow the method?",
        options: [
          "Just leave the whole extra $200 completely unassigned as leftover money",
          "Spend it immediately on whatever wants she really likes",
          "Assign it a job, such as savings or extra debt payoff",
          "Just ignore the leftover $200 until next month arrives"
        ],
        correctAnswer: 2,
        explanation: "Zero-based budgeting means income minus assigned dollars equals zero, so the last $200 must be given a job like savings or debt rather than left unassigned."
      },
      {
        id: "budget-9-h7",
        question: "Why is a robust emergency fund EXTRA important for someone with variable income?",
        options: [
          "Because they always pay far more in taxes than salaried workers",
          "Because predictable low-income months can feel like emergencies without a cushion",
          "Because banks require it before issuing a debit card",
          "Because it matters less for them than for salaried workers"
        ],
        correctAnswer: 1,
        explanation: "Income dips are inevitable with variable pay, so a larger cushion turns a scary low month into a manageable one rather than a crisis."
      }
    ]
  },
  {
    lessonId: "budget-9-remedial",
    questions: [
      {
        id: "budget-9-r1",
        question: "What is 'variable income'?",
        options: [
          "Income that changes from month to month",
          "Income that is always exactly the same",
          "Money you get only once in your life",
          "A type of tax refund"
        ],
        correctAnswer: 0,
        explanation: "Variable income goes up and down between pay periods, like tips, freelance work, or commissions."
      },
      {
        id: "budget-9-r2",
        question: "For variable income, which month's income is safest to build your budget around?",
        options: [
          "Your single highest earning month",
          "Your lowest expected month",
          "Any random month you pick",
          "A guess about next year"
        ],
        correctAnswer: 1,
        explanation: "Budgeting around your lowest expected month makes sure your essentials are always covered."
      },
      {
        id: "budget-9-r3",
        question: "In zero-based budgeting, every dollar should have a what?",
        options: [
          "A specific job or purpose",
          "A government tax attached to it",
          "A monthly bank service fee",
          "A secure account password"
        ],
        correctAnswer: 0,
        explanation: "Zero-based budgeting gives every dollar a job, so income minus your assigned spending equals zero."
      },
      {
        id: "budget-9-r4",
        question: "What is an income buffer account used for?",
        options: [
          "Spending everything you have at once",
          "Paying only for expensive vacations",
          "Saving money to cover low-income months",
          "Hiding money from yourself forever"
        ],
        correctAnswer: 2,
        explanation: "A buffer stores extra from good months so you can pay yourself a steady amount during low months."
      },
      {
        id: "budget-9-r5",
        question: "You have a surprise high-income month. What is the smart choice?",
        options: [
          "Spend it all right away now",
          "Save the extra for future low months",
          "Upgrade your whole entire lifestyle permanently now",
          "Give it all away to others"
        ],
        correctAnswer: 1,
        explanation: "Saving windfalls builds a buffer that covers the low months that come with variable income."
      },
      {
        id: "budget-9-r6",
        question: "When money is tight, which expense should you pay first?",
        options: [
          "A streaming subscription",
          "A new video game",
          "A concert ticket",
          "Rent and food"
        ],
        correctAnswer: 3,
        explanation: "Essentials like housing and food come first when there is not enough for everything."
      },
      {
        id: "budget-9-r7",
        question: "What is a 'baseline budget'?",
        options: [
          "The most you can ever spend",
          "The minimum needed to cover essentials",
          "A budget only for holidays",
          "A budget set by your bank"
        ],
        correctAnswer: 1,
        explanation: "A baseline budget is the minimum to cover survival needs, which you rely on during low-income months."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // BUDGET-10: Digital Budget Tools / Building Wealth Through Budgeting
  // ═══════════════════════════════════════════════
  {
    lessonId: "budget-10-hard",
    questions: [
      {
        id: "budget-10-h1",
        question: "By budgeting, Aria frees up $200 a month and invests it. What makes this a wealth-building habit rather than just saving?",
        options: [
          "The $200 just sits in cash and never changes at all",
          "Budgeting somehow automatically raises the size of her monthly salary",
          "Investing entirely removes the need to budget at all",
          "Invested consistently, the money earns returns that themselves earn more returns"
        ],
        correctAnswer: 3,
        explanation: "Budgeting frees money to invest, and invested money compounds as its returns generate more returns, which builds wealth over time."
      },
      {
        id: "budget-10-h2",
        question: "Which person builds wealth faster, showing why savings RATE beats income? A doctor earns $300,000 and spends $290,000; a teacher earns $60,000 and spends $40,000.",
        options: [
          "The doctor, saving $10,000 a year",
          "The teacher, saving $20,000 a year",
          "They tie, because income is all that matters",
          "Neither, because spending does not affect wealth"
        ],
        correctAnswer: 1,
        explanation: "The teacher saves $20,000 a year versus the doctor's $10,000, showing that how much you keep matters more than how much you earn."
      },
      {
        id: "budget-10-h3",
        question: "'Paying yourself first' means that on payday you should do what before anything else?",
        options: [
          "Pay every bill and then save whatever is left",
          "Spend on wants first to reward yourself",
          "Move money to savings or investments before other spending",
          "Wait until month-end to see what remains"
        ],
        correctAnswer: 2,
        explanation: "Paying yourself first means routing money to savings or investments right away, rather than saving only what happens to be left over."
      },
      {
        id: "budget-10-h4",
        question: "A saver invests $100 a month at about 10% a year for 30 years, ending near $200,000. What does this best demonstrate?",
        options: [
          "That only large monthly amounts can ever grow",
          "That interest does not really affect long-term savings at all",
          "That 30 years is too short to matter",
          "That compound growth turns small consistent contributions into large sums"
        ],
        correctAnswer: 3,
        explanation: "Modest, steady contributions growing at a market-like return compound into a large balance, showing the power of consistency plus time."
      },
      {
        id: "budget-10-h5",
        question: "Ben raises his savings rate by just 1% of his $60,000 income and invests it for decades. Why does such a small change matter?",
        options: [
          "It does not, because $600 a year is meaningless",
          "That $600 a year compounds into tens of thousands of dollars",
          "It only ever helps people who already have millions",
          "A tiny change of just 1% cannot really be measured accurately"
        ],
        correctAnswer: 1,
        explanation: "One percent of $60,000 is $600 a year, and invested over a full career that steady amount compounds into tens of thousands, potentially shortening the time to retirement."
      },
      {
        id: "budget-10-h6",
        question: "The 'millionaire next door' idea suggests many millionaires became wealthy mainly by doing what?",
        options: [
          "Living in expensive neighborhoods and buying luxury cars",
          "Winning large one-time lottery or inheritance windfalls",
          "Consistently spending less than they earned for decades",
          "Borrowing heavily just to look wealthy to others"
        ],
        correctAnswer: 2,
        explanation: "Research shows many millionaires live modestly and build wealth by spending less than they earn over many years, not through flashy consumption."
      },
      {
        id: "budget-10-h7",
        question: "How does today's budgeting choice connect to your 'future self'?",
        options: [
          "It really does not, because budgets only ever affect the present",
          "Money you save and invest today becomes future security and choices",
          "Your future self must always start over from zero",
          "Only spending, and never saving, actually affects your future"
        ],
        correctAnswer: 1,
        explanation: "Present and future you are the same person, so dollars saved and invested now provide your future self with security and more options."
      }
    ]
  },
  {
    lessonId: "budget-10-remedial",
    questions: [
      {
        id: "budget-10-r1",
        question: "How does budgeting help you build wealth?",
        options: [
          "It raises the size of your paycheck by itself",
          "It frees up money you can save and invest",
          "It only helps people who are already rich",
          "It has nothing to do with building wealth"
        ],
        correctAnswer: 1,
        explanation: "Budgeting frees up money to save and invest, which is the foundation for building wealth."
      },
      {
        id: "budget-10-r2",
        question: "What does 'pay yourself first' mean?",
        options: [
          "Save before you spend on other things",
          "Take cash directly from the store register",
          "Give yourself a raise each month",
          "Spend on fun stuff before paying bills"
        ],
        correctAnswer: 0,
        explanation: "Paying yourself first means putting money into savings before spending on other things."
      },
      {
        id: "budget-10-r3",
        question: "What is a 'savings rate'?",
        options: [
          "The percentage of your income you save",
          "The interest rate a loan charges you",
          "A rate set by the government for taxes",
          "How fast prices rise across the economy"
        ],
        correctAnswer: 0,
        explanation: "Your savings rate is the share of your income that you save instead of spend."
      },
      {
        id: "budget-10-r4",
        question: "What is compound interest?",
        options: [
          "When your earnings also start earning money",
          "A fee that banks charge you for saving",
          "Money that sits there and never grows",
          "A single one-time bonus payment"
        ],
        correctAnswer: 0,
        explanation: "Compound interest is when the money you earn starts earning its own money, growing faster over time."
      },
      {
        id: "budget-10-r5",
        question: "Can small amounts saved regularly grow into a lot over many years?",
        options: [
          "No, small amounts of money never matter at all",
          "Yes, saving a little each month can grow large over decades",
          "Only if you happen to be already a wealthy millionaire",
          "Only if you do it for one single month at a time"
        ],
        correctAnswer: 1,
        explanation: "Small, steady savings can grow into a large sum over decades thanks to compound growth."
      },
      {
        id: "budget-10-r6",
        question: "Which usually matters more for building wealth over time?",
        options: [
          "How much money you earn each year only",
          "How much of your income you actually save",
          "Which particular bank you happen to use",
          "How many credit cards you own"
        ],
        correctAnswer: 1,
        explanation: "You can only invest what you save, so your savings rate often matters more than income alone."
      },
      {
        id: "budget-10-r7",
        question: "How is saving today connected to your future self?",
        options: [
          "It is not connected to it at all",
          "Money saved today gives your future self more security",
          "Your future self should just figure it out alone",
          "Saving money only ever affects you today"
        ],
        correctAnswer: 1,
        explanation: "You and your future self are the same person, so saving now provides future you with security and choices."
      }
    ]
  }
]
