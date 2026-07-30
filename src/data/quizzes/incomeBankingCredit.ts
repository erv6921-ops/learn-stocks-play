import type { LessonQuiz } from "../lessonQuizzes"

// Authored quiz pools - Income, Banking, and Credit units.
export const incomeBankingCreditQuizzes: LessonQuiz[] = [
  // INCOME-1: Active vs Passive Income
  {
    lessonId: "income-1",
    questions: [
      {
        id: "income-1-q1",
        question: "What best describes active income?",
        options: [
          "Money that grows in a bank automatically",
          "Money earned by directly working for it",
          "Money received as a gift from family",
          "Money made only from renting out property"
        ],
        correctAnswer: 1,
        explanation: "Active income requires trading your time and effort for pay, like a shift at a job. If you stop working, the money stops coming in."
      },
      {
        id: "income-1-q2",
        question: "Which of these is an example of passive income?",
        options: [
          "A weekly paycheck from a lifeguarding job",
          "Tips earned while delivering pizzas on weekends",
          "Wages from stocking shelves at a store",
          "Rent collected from a property you own"
        ],
        correctAnswer: 3,
        explanation: "Rental income keeps arriving without you clocking in for hours. Paychecks, tips, and wages all require active work in exchange for the money."
      },
      {
        id: "income-1-q3",
        question: "Maya earns $12 per hour tutoring and also gets about $20 a month in ad revenue from old YouTube videos. Which part is her passive income?",
        options: [
          "The YouTube ad money from old videos",
          "The hourly tutoring pay she works for",
          "Both of these income sources equally count",
          "Neither one counts as real passive income"
        ],
        correctAnswer: 0,
        explanation: "The videos were made once but keep earning without new work, which makes that money passive. Tutoring pay stops the moment Maya stops tutoring."
      },
      {
        id: "income-1-q4",
        question: "What is the main advantage of passive income?",
        options: [
          "It is always completely free of taxes",
          "It always pays more than active income",
          "It can keep earning while you sleep",
          "It never requires any effort to set up"
        ],
        correctAnswer: 2,
        explanation: "Passive income isn't tied to hours worked, so it can flow in around the clock. It is still taxable and usually takes real effort or money upfront."
      },
      {
        id: "income-1-q5",
        question: "Jaden wrote an e-book once and now earns royalties every month. Why is this considered passive income?",
        options: [
          "Because e-books never require any upfront effort",
          "His upfront work keeps paying him later",
          "Because royalties are technically a government benefit",
          "Because authors are exempt from income taxes"
        ],
        correctAnswer: 1,
        explanation: "Jaden did the work once, and the royalties continue without him writing new pages. That front-loaded effort followed by ongoing earnings is the essence of passive income."
      },
      {
        id: "income-1-q6",
        question: "Why do most teens start with active income instead of passive income?",
        options: [
          "Passive income is illegal for anyone under eighteen",
          "Active income is always taxed at lower rates",
          "Passive income never works for young people",
          "Passive income usually requires upfront investment first"
        ],
        correctAnswer: 3,
        explanation: "Passive streams like rentals, dividends, or content usually need money, skills, or time invested before they pay. A first job provides income right away with no startup capital."
      },
      {
        id: "income-1-q7",
        question: "Sofia babysits on Fridays for $40 and her savings account pays about $2 in interest each month. What does the interest represent?",
        options: [
          "Passive income earned on her saved money",
          "Active income because she opened the account",
          "A fee the bank charges her account",
          "A bonus that counts as babysitting wages"
        ],
        correctAnswer: 0,
        explanation: "Interest arrives without Sofia doing any ongoing work, so it is passive income. Her babysitting money is active income because she trades time for it."
      },
      {
        id: "income-1-q8",
        question: "Why do financial experts suggest building both active and passive income over time?",
        options: [
          "Because banks require two income sources minimum",
          "Because active income alone is never taxable",
          "Multiple streams add security if one stops",
          "Because passive income replaces the need to save"
        ],
        correctAnswer: 2,
        explanation: "If a job is lost, passive income can help cover expenses, and active income can fund new passive streams. Having multiple sources reduces the risk of losing everything at once."
      }
    ]
  },

  // INCOME-2: Wages vs Salary
  {
    lessonId: "income-2",
    questions: [
      {
        id: "income-2-q1",
        question: "What is the main difference between wages and a salary?",
        options: [
          "Wages are always higher than any salary",
          "Salaries are only paid out to government employees",
          "Wages pay hourly while salaries are fixed",
          "Salaries change every week based on hours"
        ],
        correctAnswer: 2,
        explanation: "Wage earners are paid for each hour they work, while salaried workers earn a set annual amount split into regular paychecks. Hours worked don't change a salaried paycheck."
      },
      {
        id: "income-2-q2",
        question: "Liam earns $16 per hour and worked 20 hours this week. What is his gross pay for the week?",
        options: [
          "He earned $320 before any deductions",
          "He earned $360 before any deductions",
          "He earned $200 before any deductions",
          "He earned $160 before any deductions"
        ],
        correctAnswer: 0,
        explanation: "Gross pay for hourly work is rate times hours: $16 x 20 = $320. Deductions like taxes come out of that amount afterward."
      },
      {
        id: "income-2-q3",
        question: "Under US law, how does overtime typically work for hourly (nonexempt) workers?",
        options: [
          "Overtime pays double after twenty hours weekly",
          "Salaried workers always earn extra overtime pay automatically",
          "Overtime only applies to workers under eighteen",
          "Hourly workers earn time-and-a-half past 40 hours"
        ],
        correctAnswer: 3,
        explanation: "Federal law requires nonexempt hourly workers to receive 1.5 times their regular rate for hours beyond 40 in a week. Many salaried (exempt) workers don't receive overtime at all."
      },
      {
        id: "income-2-q4",
        question: "Ava's job offer says $41,600 per year, paid weekly. Roughly how much is each weekly paycheck before deductions?",
        options: [
          "About $1,600 before taxes and deductions",
          "About $800 before taxes and deductions",
          "About $400 before taxes and deductions",
          "About $2,000 before taxes and deductions"
        ],
        correctAnswer: 1,
        explanation: "There are 52 weeks in a year, so $41,600 divided by 52 equals $800 per week. That's her gross weekly pay before anything is withheld."
      },
      {
        id: "income-2-q5",
        question: "What is one key advantage of earning a salary?",
        options: [
          "Predictable paychecks make budgeting much easier",
          "Salaried workers never have to pay taxes",
          "Salaries automatically increase every single month",
          "Salaried employees cannot ever be fired"
        ],
        correctAnswer: 0,
        explanation: "A salary delivers the same amount every pay period, so you can plan bills and savings with confidence. Hourly pay can swing up or down with your schedule."
      },
      {
        id: "income-2-q6",
        question: "What is a potential downside of salaried pay during very busy weeks?",
        options: [
          "Salaried pay doubles automatically during busy weeks",
          "Hourly workers are banned from busy schedules",
          "Busy weeks reduce a salaried worker's pay",
          "Extra hours may not bring extra pay"
        ],
        correctAnswer: 3,
        explanation: "Many salaried workers are exempt from overtime, so a 55-hour week can pay the same as a 40-hour week. Hourly workers, by contrast, get paid for every extra hour."
      },
      {
        id: "income-2-q7",
        question: "Noah wants to earn more money during summer break. Why might an hourly job help him do that?",
        options: [
          "Hourly jobs never require any actual work",
          "Extra shifts directly increase his total pay",
          "Hourly jobs are always closer to home",
          "Hourly pay is never taxed in summer"
        ],
        correctAnswer: 1,
        explanation: "With hourly pay, every additional shift adds directly to the paycheck. Picking up more hours during summer means more money."
      },
      {
        id: "income-2-q8",
        question: "Which worker is most likely paid a salary?",
        options: [
          "A cashier paid for each hour worked",
          "A babysitter paid per evening of work",
          "A marketing manager with fixed annual pay",
          "A dog walker paid per walk completed"
        ],
        correctAnswer: 2,
        explanation: "Professional and managerial roles are commonly salaried, meaning a fixed annual amount regardless of exact hours. The other jobs pay per hour or per task."
      }
    ]
  },

  // INCOME-3: Hourly vs Commission
  {
    lessonId: "income-3",
    questions: [
      {
        id: "income-3-q1",
        question: "What is commission-based pay?",
        options: [
          "A fixed yearly amount paid every month",
          "A fee workers pay to their employer",
          "A bonus paid only during holiday seasons",
          "Pay based on a percentage of sales"
        ],
        correctAnswer: 3,
        explanation: "Commission means earning a cut of what you sell - the more you sell, the more you make. It directly links pay to sales performance."
      },
      {
        id: "income-3-q2",
        question: "Zoe sells sneakers and earns a 10% commission. She sells $2,000 worth of shoes this week. What is her commission?",
        options: [
          "$100 in commission for the week",
          "$200 in commission for the week",
          "$20 in commission for the week",
          "$2,000 in commission for the week"
        ],
        correctAnswer: 1,
        explanation: "Ten percent of $2,000 is $200 (0.10 x 2,000). Her pay rises and falls with how much she sells."
      },
      {
        id: "income-3-q3",
        question: "What does 'base plus commission' mean?",
        options: [
          "A guaranteed wage plus extra from sales",
          "A salary that is paid twice yearly",
          "Commission paid only after one full year",
          "A wage that decreases when sales rise"
        ],
        correctAnswer: 0,
        explanation: "Base plus commission combines a guaranteed paycheck with a bonus tied to sales. It offers some stability while still rewarding strong selling."
      },
      {
        id: "income-3-q4",
        question: "What is the main financial risk of working purely on commission?",
        options: [
          "Employers never let commission workers take breaks",
          "Commission income is illegal in most states",
          "Slow sales weeks can mean little pay",
          "Commission workers must pay double income taxes"
        ],
        correctAnswer: 2,
        explanation: "With no base wage, income depends entirely on sales, so a slow week can produce a very small paycheck. That unpredictability makes budgeting harder."
      },
      {
        id: "income-3-q5",
        question: "Diego can choose $15 per hour for 20 hours a week, or 5% commission on phone sales that average $8,000 weekly. Which usually pays more in an average week?",
        options: [
          "Hourly pays more, earning $400 weekly",
          "They pay exactly the same each week",
          "Hourly pays more, earning $300 weekly",
          "Commission pays more, averaging $400 weekly"
        ],
        correctAnswer: 3,
        explanation: "Hourly would pay $15 x 20 = $300, while 5% of $8,000 is $400. On an average week the commission option earns $100 more, though it carries more risk."
      },
      {
        id: "income-3-q6",
        question: "Why do many employers offer commission pay in sales jobs?",
        options: [
          "It motivates employees to sell more products",
          "It lets companies avoid paying any taxes",
          "It is required by federal labor law",
          "It guarantees every worker equal weekly pay"
        ],
        correctAnswer: 0,
        explanation: "When pay is tied to sales, workers have a direct incentive to sell more. Employers benefit because higher payroll only happens when revenue is also higher."
      },
      {
        id: "income-3-q7",
        question: "Priya is a careful planner who hates income surprises. Which pay structure fits her best?",
        options: [
          "Pure commission with no base pay included",
          "Commission that rises and falls with seasons",
          "A predictable hourly wage with set shifts",
          "Uncapped commission selling cars on weekends"
        ],
        correctAnswer: 2,
        explanation: "An hourly wage with steady shifts produces the same paycheck week after week, which suits a planner. Commission structures swing with sales and would frustrate her."
      },
      {
        id: "income-3-q8",
        question: "Which job is most commonly paid mainly by commission?",
        options: [
          "A school cafeteria worker serving lunches daily",
          "A real estate agent selling homes",
          "A lifeguard watching swimmers at the pool",
          "A library assistant shelving returned books"
        ],
        correctAnswer: 1,
        explanation: "Real estate agents typically earn a percentage of each home sale rather than an hourly wage. The other jobs pay hourly regardless of any 'sales.'"
      }
    ]
  },

  // INCOME-4: Gig Economy
  {
    lessonId: "income-4",
    questions: [
      {
        id: "income-4-q1",
        question: "What is the gig economy?",
        options: [
          "Work made of short-term flexible jobs",
          "A government program for unemployed musicians",
          "Only jobs performed at live concerts",
          "Full-time salaried work at tech companies"
        ],
        correctAnswer: 0,
        explanation: "The gig economy is built on short-term, task-based, or freelance work - like driving, delivering, tutoring, or designing per project - instead of one permanent job."
      },
      {
        id: "income-4-q2",
        question: "How are most gig workers classified in the US?",
        options: [
          "Full-time employees with health insurance benefits",
          "Government workers with an official pension",
          "Independent contractors responsible for own taxes",
          "Volunteers who are not legally paid"
        ],
        correctAnswer: 2,
        explanation: "Gig platforms usually treat workers as independent contractors, not employees. That means no employer benefits and responsibility for handling their own taxes."
      },
      {
        id: "income-4-q3",
        question: "Marcus delivers food through an app on weekends. What is a key tax difference from a regular job?",
        options: [
          "He owes no taxes on app earnings",
          "The app pays all his taxes for him",
          "Delivery income is taxed at zero percent",
          "Taxes usually are not withheld from pay"
        ],
        correctAnswer: 3,
        explanation: "As a contractor, Marcus receives his pay without taxes taken out, unlike a W-2 paycheck. He is still responsible for reporting and paying taxes on those earnings."
      },
      {
        id: "income-4-q4",
        question: "What is generally the biggest advantage of gig work?",
        options: [
          "Guaranteed steady income every single week",
          "Flexibility to choose when you work",
          "Free health insurance from the platform",
          "Automatic promotions after six months worked"
        ],
        correctAnswer: 1,
        explanation: "Gig workers can usually accept or decline work whenever they want, fitting jobs around school or other commitments. That flexibility is the main draw."
      },
      {
        id: "income-4-q5",
        question: "What is generally the biggest downside of relying on gig work?",
        options: [
          "Gig workers can never work for two apps",
          "Gig apps require a college degree first",
          "No guaranteed hours, benefits, or steady pay",
          "Gig work is illegal in most cities"
        ],
        correctAnswer: 2,
        explanation: "Gig income can vanish when demand drops, and platforms don't provide health insurance, paid time off, or guaranteed hours. That instability is the trade-off for flexibility."
      },
      {
        id: "income-4-q6",
        question: "Lena earned $600 this month tutoring through an app. What should she do to prepare for taxes?",
        options: [
          "A portion of earnings for tax time",
          "Nothing, since apps handle all tax payments",
          "Her entire earnings until the year ends",
          "Only money earned above $100,000 yearly"
        ],
        correctAnswer: 0,
        explanation: "Since no taxes are withheld from gig pay, setting aside a chunk of each payment avoids a painful surprise bill. Waiting or assuming the app handles it leads to trouble."
      },
      {
        id: "income-4-q7",
        question: "Which of these is an example of gig work a teen might do?",
        options: [
          "Working a salaried job at a bank",
          "Mowing lawns for different neighbors per job",
          "Receiving a monthly allowance from parents",
          "Earning interest on a savings account"
        ],
        correctAnswer: 1,
        explanation: "Getting paid per lawn for different customers is classic gig work: short-term, task-based, and flexible. Allowances and interest aren't work, and salaried jobs are the opposite of gigs."
      },
      {
        id: "income-4-q8",
        question: "Why does gig income require especially careful budgeting?",
        options: [
          "Gig platforms take ninety percent of earnings",
          "Gig workers are banned from savings accounts",
          "Gig income is only paid once yearly",
          "Income varies, so planning prevents shortfalls"
        ],
        correctAnswer: 3,
        explanation: "A great month can be followed by a slow one, so gig workers must budget around an average and build a cushion. Without planning, a weak month can mean unpaid bills."
      }
    ]
  },

  // INCOME-5: Gross vs Net Pay
  {
    lessonId: "income-5",
    questions: [
      {
        id: "income-5-q1",
        question: "What is gross pay?",
        options: [
          "Pay after all deductions are removed",
          "Total pay before any deductions taken",
          "Only the cash portion of tips",
          "Money deposited into a savings account"
        ],
        correctAnswer: 1,
        explanation: "Gross pay is everything you earned before anything is taken out. It's the big number at the top of your pay stub, not what hits your bank."
      },
      {
        id: "income-5-q2",
        question: "What is net pay?",
        options: [
          "Your total earnings before taxes apply",
          "The amount your employer reports as gross",
          "Money you owe the government yearly",
          "Take-home pay after deductions are subtracted"
        ],
        correctAnswer: 3,
        explanation: "Net pay is what's left after taxes and other deductions come out - the amount actually deposited or handed to you. That's why it's called take-home pay."
      },
      {
        id: "income-5-q3",
        question: "What does the FICA deduction on a paycheck pay for?",
        options: [
          "Taxes funding Social Security and Medicare",
          "A fee for using direct deposit",
          "An optional savings plan for retirement",
          "A state fee for new workers"
        ],
        correctAnswer: 0,
        explanation: "FICA taxes fund Social Security and Medicare, programs that support retirees and cover health care for older Americans. It's a required payroll tax, not optional."
      },
      {
        id: "income-5-q4",
        question: "Tyler's gross pay is $400 and $60 total is withheld for taxes and deductions. What is his net pay?",
        options: [
          "His net pay is exactly $460",
          "His net pay is exactly $400",
          "His net pay is exactly $340",
          "His net pay is exactly $60"
        ],
        correctAnswer: 2,
        explanation: "Net pay equals gross pay minus deductions: $400 - $60 = $340. That's the amount Tyler can actually spend or save."
      },
      {
        id: "income-5-q5",
        question: "Keisha budgeted using her $600 gross pay, but her check was only $520. What explains the difference?",
        options: [
          "The bank charged a paycheck cashing fee",
          "Her employer illegally kept the missing money",
          "She was paid in advance last month",
          "Taxes and deductions reduced her take-home pay"
        ],
        correctAnswer: 3,
        explanation: "The $80 gap is withholding - federal tax, FICA, and possibly state tax came out before she was paid. This is exactly why budgets should use net pay."
      },
      {
        id: "income-5-q6",
        question: "Why should you build your budget around net pay instead of gross pay?",
        options: [
          "Gross pay is impossible to calculate accurately",
          "Net pay is what actually reaches you",
          "Budgets legally must use gross pay figures",
          "Net pay includes bonuses gross pay excludes"
        ],
        correctAnswer: 1,
        explanation: "You can only spend the money that actually lands in your account. Budgeting with gross pay makes you plan around money you'll never see."
      },
      {
        id: "income-5-q7",
        question: "Which items are common deductions on a US paycheck?",
        options: [
          "Streaming subscriptions and monthly phone bills",
          "Rent payments and weekly grocery costs",
          "Federal taxes, FICA, and state taxes",
          "Credit card payments and gas money"
        ],
        correctAnswer: 2,
        explanation: "Employers withhold federal income tax, FICA (Social Security and Medicare), and often state income tax before paying you. Personal bills like rent come from your net pay afterward."
      },
      {
        id: "income-5-q8",
        question: "Roughly what share of gross wages does the employee side of FICA take?",
        options: [
          "About 7.65% of gross wages earned",
          "About 25% of gross wages earned",
          "About 50% of gross wages earned",
          "About 0.5% of gross wages earned"
        ],
        correctAnswer: 0,
        explanation: "The employee share of FICA is 7.65% - 6.2% for Social Security plus 1.45% for Medicare. Employers pay a matching 7.65% on top."
      }
    ]
  },

  // INCOME-6: Taxes
  {
    lessonId: "income-6",
    questions: [
      {
        id: "income-6-q1",
        question: "What is the main purpose of income taxes?",
        options: [
          "To pay bank fees for the government",
          "To fund private companies' advertising budgets",
          "To fund roads, schools, and public services",
          "To reward employers for hiring new workers"
        ],
        correctAnswer: 2,
        explanation: "Taxes pay for public goods everyone shares - highways, public schools, national defense, and safety-net programs. They're how government services get funded."
      },
      {
        id: "income-6-q2",
        question: "The US federal income tax is 'progressive.' What does that mean?",
        options: [
          "Higher income chunks face higher tax rates",
          "Everyone pays exactly the same dollar amount",
          "Taxes decrease automatically as income goes up",
          "Only progressive states collect any income tax"
        ],
        correctAnswer: 0,
        explanation: "In a progressive system, income is taxed in brackets, and each higher slice of income faces a higher rate. Lower earners pay a smaller share than higher earners."
      },
      {
        id: "income-6-q3",
        question: "What is a W-2 form?",
        options: [
          "A form used to open bank accounts",
          "A coupon for filing taxes for free",
          "A license required for part-time workers",
          "A form showing yearly wages and withholding"
        ],
        correctAnswer: 3,
        explanation: "Employers send a W-2 each January showing how much you earned and how much tax was withheld. You use it to file your tax return."
      },
      {
        id: "income-6-q4",
        question: "Ana's summer job withheld federal income tax, but her total yearly income was low. What might happen when she files a tax return?",
        options: [
          "She will be fined for filing while young",
          "She may get some withheld money refunded",
          "She must pay double taxes next year",
          "Her employer receives her refund money instead"
        ],
        correctAnswer: 1,
        explanation: "If more tax was withheld than she actually owes, filing a return gets her the difference back as a refund. Many students with low summer earnings qualify for refunds."
      },
      {
        id: "income-6-q5",
        question: "What is the federal standard deduction?",
        options: [
          "An amount subtracted from income before taxing",
          "A penalty for filing your taxes late",
          "A fee deducted from every single paycheck",
          "A bonus the IRS pays every worker"
        ],
        correctAnswer: 0,
        explanation: "The standard deduction shields a chunk of income from federal tax - you subtract it before calculating what you owe. It's why low earners often owe little or nothing."
      },
      {
        id: "income-6-q6",
        question: "Why doesn't moving into a higher tax bracket reduce your total take-home pay?",
        options: [
          "Because tax brackets only apply to businesses",
          "Because raises are always completely tax free",
          "Because higher brackets reduce your tax rate",
          "Higher rates hit only the extra income"
        ],
        correctAnswer: 3,
        explanation: "Bracket rates are marginal: only the dollars above each threshold get taxed at the higher rate. A raise always leaves you with more money after taxes."
      },
      {
        id: "income-6-q7",
        question: "Jamal earned $900 in tips working as a busser. Do those tips count for taxes?",
        options: [
          "No, tips are always tax-free gifts",
          "Yes, tips count as taxable income",
          "Only tips paid by credit card count",
          "Only tips over $10,000 are ever taxed"
        ],
        correctAnswer: 1,
        explanation: "The IRS treats tips as taxable income just like wages, whether they come in cash or on a card. Workers are required to report them."
      },
      {
        id: "income-6-q8",
        question: "Why do employers withhold taxes from each paycheck instead of workers paying one big yearly bill?",
        options: [
          "Employers keep the withheld money as profit",
          "Because banks refuse large yearly tax payments",
          "It spreads the cost across the year",
          "Because yearly tax bills are illegal now"
        ],
        correctAnswer: 2,
        explanation: "Pay-as-you-go withholding breaks the tax bill into small pieces so people aren't hit with one huge payment they can't afford. It also gives the government steady revenue."
      }
    ]
  },

  // INCOME-7: Career ROI
  {
    lessonId: "income-7",
    questions: [
      {
        id: "income-7-q1",
        question: "When evaluating a career path, what does ROI (return on investment) mean?",
        options: [
          "The number of raises per single year",
          "The ranking of a job's popularity online",
          "The office perks included with a job",
          "Earnings gained compared to costs invested"
        ],
        correctAnswer: 3,
        explanation: "Career ROI weighs what you spend on training - money and time - against the extra income the career produces. A strong ROI means the payoff clearly beats the cost."
      },
      {
        id: "income-7-q2",
        question: "A trade program costs $10,000 and leads to a job paying $20,000 more per year than before. Roughly how fast could the program pay for itself?",
        options: [
          "Around six months of the extra earnings",
          "Around ten full years of extra earnings",
          "It could never pay for itself",
          "Around twenty years of the extra earnings"
        ],
        correctAnswer: 0,
        explanation: "An extra $20,000 per year is about $10,000 every six months, matching the program's cost. After that point, the higher pay is pure gain."
      },
      {
        id: "income-7-q3",
        question: "Besides tuition, what costs should you count when calculating the ROI of training or school?",
        options: [
          "Only the sticker price of tuition matters",
          "Just the cost of textbooks each term",
          "Lost wages while training, plus fees",
          "Only the interest rate on loans"
        ],
        correctAnswer: 2,
        explanation: "Time spent in school is time not spent earning, so lost wages are a real cost alongside fees, books, and living expenses. Ignoring them makes any program look cheaper than it is."
      },
      {
        id: "income-7-q4",
        question: "Why is it smarter to compare lifetime earnings between careers instead of just first-year salaries?",
        options: [
          "First salaries are always the career peak",
          "Careers differ in growth over the decades",
          "Lifetime earnings are identical for all careers",
          "First-year pay is impossible to find out"
        ],
        correctAnswer: 1,
        explanation: "Some careers start low but grow fast, while others start higher and plateau. Looking across decades reveals the true financial difference between paths."
      },
      {
        id: "income-7-q5",
        question: "Nina loves art but also wants strong income. What is the smartest ROI-minded move?",
        options: [
          "Ignore pay completely and just follow passion",
          "Pick the highest-paying job she would hate",
          "Quit considering art since artists earn nothing",
          "Research pay paths that combine art skills"
        ],
        correctAnswer: 3,
        explanation: "Fields like graphic design, UX design, and animation pay solidly while using artistic talent. Researching options lets Nina keep her passion without ignoring the numbers."
      },
      {
        id: "income-7-q6",
        question: "What is the opportunity cost of spending four extra years in school?",
        options: [
          "The cost of a graduation party ceremony",
          "The price of a new student laptop",
          "Wages not earned while still in school",
          "The fee for a diploma frame"
        ],
        correctAnswer: 2,
        explanation: "Opportunity cost is what you give up by choosing one option - here, years of full-time income you could have earned. It's often larger than tuition itself."
      },
      {
        id: "income-7-q7",
        question: "Which combination signals a high-ROI career path?",
        options: [
          "Strong demand, solid pay, low training cost",
          "A famous company name on business cards",
          "A fancy office located in a downtown",
          "The longest possible years of required school"
        ],
        correctAnswer: 0,
        explanation: "The best returns come when employers need the skill, pay well for it, and the training doesn't cost a fortune. Prestige and office style don't change the math."
      },
      {
        id: "income-7-q8",
        question: "Ethan can apprentice as an electrician, earning pay while he trains, or pay tuition for a program with weak job prospects. Which likely has better financial ROI?",
        options: [
          "The program, because all degrees guarantee wealth",
          "The apprenticeship, since he earns while training",
          "Neither, because ROI never applies to careers",
          "Both are identical no matter the outcomes"
        ],
        correctAnswer: 1,
        explanation: "The apprenticeship has almost no cost - he's paid to learn - and leads to an in-demand trade. Paying tuition for weak job prospects means high cost with a low return."
      }
    ]
  },

  // INCOME-8: Education as Investment
  {
    lessonId: "income-8",
    questions: [
      {
        id: "income-8-q1",
        question: "On average, how do earnings of bachelor's degree holders compare to workers with only a high school diploma?",
        options: [
          "Graduates always earn triple by age twenty-five",
          "On average, degree holders earn notably more",
          "Degrees have no effect on average earnings",
          "High school graduates always out-earn college graduates"
        ],
        correctAnswer: 1,
        explanation: "US data consistently shows bachelor's degree holders earn substantially more on average over their careers. Averages don't guarantee individual results, but the overall gap is real."
      },
      {
        id: "income-8-q2",
        question: "Why does the answer to 'is college worth it?' depend on the situation?",
        options: [
          "Because colleges randomly assign every student's major",
          "Because tuition is the same at every school",
          "Costs, major, and debt levels vary widely",
          "Because employers never check college degrees anyway"
        ],
        correctAnswer: 2,
        explanation: "A low-cost degree in a high-demand field is a very different investment than heavy debt for a low-paying field. The value depends on the specific price and payoff."
      },
      {
        id: "income-8-q3",
        question: "Ali compares a $25,000-per-year private college with an $8,000-per-year in-state school for the same nursing degree. What is the financially smart consideration?",
        options: [
          "The cheaper program may offer similar returns",
          "The pricier school always guarantees higher pay",
          "Cost never matters when choosing a college",
          "Only the campus food should decide it"
        ],
        correctAnswer: 0,
        explanation: "Nursing licenses and pay depend on passing the same exams, not the school's price tag. Paying far less for the same outcome dramatically improves the investment."
      },
      {
        id: "income-8-q4",
        question: "Besides a four-year degree, which paths can also build strong earning power?",
        options: [
          "Only doctoral degrees can raise your income",
          "Skipping all training and hoping for luck",
          "Buying lottery tickets with your tuition savings",
          "Trade school, apprenticeships, and certificate programs"
        ],
        correctAnswer: 3,
        explanation: "Electricians, plumbers, dental hygienists, and IT technicians train through trade schools, apprenticeships, or certificates and can earn strong incomes. College is one path, not the only one."
      },
      {
        id: "income-8-q5",
        question: "Maria would need $80,000 in loans for a degree in a field paying about $35,000 a year. What is the key warning sign?",
        options: [
          "Loans are automatically forgiven in low-paying fields",
          "Her debt would far exceed starting pay",
          "An $80,000 loan is always a smart move",
          "Salary never matters when borrowing for school"
        ],
        correctAnswer: 1,
        explanation: "A common guideline is to keep total borrowing near or below expected first-year salary. Owing more than double her starting pay would make repayment a heavy burden."
      },
      {
        id: "income-8-q6",
        question: "Why do scholarships and grants improve the ROI of education?",
        options: [
          "They cut costs without adding any debt",
          "They raise tuition prices for everyone else",
          "They must be repaid with high interest",
          "They only exist for professional athletes"
        ],
        correctAnswer: 0,
        explanation: "Scholarships and grants are money you never repay, so they directly lower the 'investment' side of the equation. Same career payoff, smaller cost, better return."
      },
      {
        id: "income-8-q7",
        question: "In 'education as an investment,' what is the 'return'?",
        options: [
          "The refund colleges give for dropped classes",
          "The interest rate on student loan debt",
          "The diploma paper you receive at graduation",
          "Higher lifetime earnings and career options gained"
        ],
        correctAnswer: 3,
        explanation: "The payoff of education is the extra income and expanded opportunities it unlocks over a working lifetime. That's what you weigh against tuition, debt, and lost wages."
      },
      {
        id: "income-8-q8",
        question: "Devon wants to become a software developer. What is the smartest first step in choosing his path?",
        options: [
          "Choose whichever school has the coolest mascot",
          "Pick the most expensive program available anywhere",
          "Compare each path's costs and job outcomes",
          "Avoid research and just follow his friends"
        ],
        correctAnswer: 2,
        explanation: "Degrees, bootcamps, and self-study can all lead to developer jobs at very different prices. Comparing real costs against real job outcomes is how you evaluate an investment."
      }
    ]
  },

  // INCOME-9: Skill Stacking
  {
    lessonId: "income-9",
    questions: [
      {
        id: "income-9-q1",
        question: "What is skill stacking?",
        options: [
          "Combining several skills to boost your value",
          "Learning one skill and never adding more",
          "Collecting job titles without learning anything",
          "Stacking paper certificates in a drawer"
        ],
        correctAnswer: 0,
        explanation: "Skill stacking means layering complementary abilities - like coding plus design plus writing - so the combination makes you more valuable than any single skill alone."
      },
      {
        id: "income-9-q2",
        question: "Why can a combination of good skills beat world-class mastery of just one skill?",
        options: [
          "Because single skills are always completely useless",
          "Because employers ban specialists from applying",
          "Because stacked skills expire after five years",
          "Rare combinations face far less direct competition"
        ],
        correctAnswer: 3,
        explanation: "Being the very best at one thing is nearly impossible, but being good at two or three things few people combine makes you rare. Rarity drives up earning power."
      },
      {
        id: "income-9-q3",
        question: "Ruby knows graphic design and is learning social media marketing. How does this stack help her earn more?",
        options: [
          "It forces her to abandon design work",
          "She can offer brands complete campaign packages",
          "It guarantees her a government design job",
          "It makes her design skills less valuable"
        ],
        correctAnswer: 1,
        explanation: "Brands often need both visuals and marketing strategy, so Ruby can charge more by delivering the whole package. One hire replacing two is worth a premium."
      },
      {
        id: "income-9-q4",
        question: "Which of these is an example of a skill stack?",
        options: [
          "Watching the same show every single night",
          "Owning two phones from the same brand",
          "Coding plus public speaking plus writing skills",
          "Having two copies of one certificate"
        ],
        correctAnswer: 2,
        explanation: "A programmer who can also present ideas and write clearly can lead projects, not just complete tickets. Distinct skills that reinforce each other form a true stack."
      },
      {
        id: "income-9-q5",
        question: "Carlos fixes bikes and is now learning bookkeeping. How could this combination raise his income?",
        options: [
          "He could run his own repair business",
          "Bookkeeping makes bike repairs physically faster",
          "It qualifies him for professional cycling teams",
          "Banks pay extra for hobbies like biking"
        ],
        correctAnswer: 0,
        explanation: "Repair skills plus money-management skills are exactly what a small business owner needs. Together they let Carlos keep the profits instead of just earning a wage."
      },
      {
        id: "income-9-q6",
        question: "Why does communication skill pair so well with technical skill?",
        options: [
          "Communication replaces the need for technical skill",
          "Explaining technical work clearly multiplies its value",
          "Technical workers are forbidden from giving presentations",
          "Because talking is easier than any coding"
        ],
        correctAnswer: 1,
        explanation: "Technical experts who can explain ideas to customers, teammates, and bosses become leaders and land bigger opportunities. The communication layer amplifies everything the technical skill produces."
      },
      {
        id: "income-9-q7",
        question: "What is the best way for a teen to start building a skill stack?",
        options: [
          "Wait until age thirty to learn anything",
          "Only study subjects that are already mastered",
          "Buy expensive courses before trying free ones",
          "Add complementary skills to interests you have"
        ],
        correctAnswer: 3,
        explanation: "Starting from an existing interest keeps motivation high, and adding a complementary skill - like editing for a gamer who streams - creates value quickly. Free resources make starting cheap."
      },
      {
        id: "income-9-q8",
        question: "Two applicants both know video editing, but one also understands basketball deeply and edits highlight reels. Why might she win sports clients?",
        options: [
          "Because basketball knowledge replaces editing skill entirely",
          "Because clients always hire the cheaper editor",
          "Her combo matches exactly what clients need",
          "Because two skills mean double the invoices"
        ],
        correctAnswer: 2,
        explanation: "Sports clients want editors who understand the game's key moments without coaching. Her niche combination fits their needs better than generic editing skill alone."
      }
    ]
  },

  // INCOME-10: Entrepreneurship Income
  {
    lessonId: "income-10",
    questions: [
      {
        id: "income-10-q1",
        question: "How do entrepreneurs primarily earn income?",
        options: [
          "They receive a guaranteed government wage",
          "From business profits after paying expenses",
          "Only through tips from loyal customers",
          "From taxes collected on their behalf"
        ],
        correctAnswer: 1,
        explanation: "Business owners earn what's left after covering their costs - the profit. Unlike a wage, that amount isn't guaranteed by anyone."
      },
      {
        id: "income-10-q2",
        question: "What is the basic formula for business profit?",
        options: [
          "Revenue minus expenses equals the profit",
          "Revenue plus expenses equals the profit",
          "Expenses minus revenue equals the profit",
          "Profit equals revenue times total expenses"
        ],
        correctAnswer: 0,
        explanation: "Profit is what remains when you subtract all costs from all sales revenue. If expenses exceed revenue, the result is a loss."
      },
      {
        id: "income-10-q3",
        question: "Amara sells bracelets for $10 each. Materials cost $4 per bracelet and she sold 30 this month. What is her profit?",
        options: [
          "She made $300 in total profit",
          "She made $120 in total profit",
          "She made $180 in total profit",
          "She made $60 in total profit"
        ],
        correctAnswer: 2,
        explanation: "Revenue is 30 x $10 = $300, and materials cost 30 x $4 = $120. Profit is $300 - $120 = $180."
      },
      {
        id: "income-10-q4",
        question: "Why is entrepreneurship income considered risky?",
        options: [
          "Business owners must always work alone forever",
          "Entrepreneurs pay no taxes so lose refunds",
          "Profits are capped by law at $50,000",
          "Income is unpredictable and losses are possible"
        ],
        correctAnswer: 3,
        explanation: "A business can earn a lot one month and lose money the next, with no guaranteed paycheck. Many businesses even lose money in their early years."
      },
      {
        id: "income-10-q5",
        question: "What is the main income advantage of owning a business versus working a job?",
        options: [
          "Businesses never require any weekend working hours",
          "Earnings can grow beyond a fixed wage",
          "Owners are guaranteed profit every single month",
          "Business income is always completely tax free"
        ],
        correctAnswer: 1,
        explanation: "A wage is capped by your hours and rate, but business profit can scale as sales grow. That uncapped upside is why people accept the extra risk."
      },
      {
        id: "income-10-q6",
        question: "Jayden's lawn care side hustle brings in $500 a month, but gas and equipment cost $150. What is his monthly profit?",
        options: [
          "His monthly profit is exactly $500",
          "His monthly profit is exactly $650",
          "His monthly profit is exactly $150",
          "His monthly profit is exactly $350"
        ],
        correctAnswer: 3,
        explanation: "Profit is revenue minus expenses: $500 - $150 = $350. The $500 is revenue, not what he actually keeps."
      },
      {
        id: "income-10-q7",
        question: "Sasha wants to start an online sticker shop with just $50 saved. What is the smartest first move?",
        options: [
          "Start small and test if customers buy",
          "Take a large loan for inventory immediately",
          "Quit school to focus on stickers full-time",
          "Spend it all on ads before designing"
        ],
        correctAnswer: 0,
        explanation: "Testing a small batch proves whether real customers will pay before risking bigger money. Starting small limits losses while she learns what sells."
      },
      {
        id: "income-10-q8",
        question: "What does it mean to 'reinvest profits' in a business?",
        options: [
          "Spending all profits on personal shopping sprees",
          "Returning all profits to your customers",
          "Putting profits back into growing the business",
          "Depositing profits into a friend's account"
        ],
        correctAnswer: 2,
        explanation: "Reinvesting means using earnings to buy better equipment, more inventory, or marketing so the business can grow. It trades income today for bigger income later."
      }
    ]
  },
]
