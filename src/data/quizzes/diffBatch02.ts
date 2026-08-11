import { QuizQuestion } from "@/types"

// Adaptive-difficulty pools: <lessonId>-hard and <lessonId>-remedial, 7 each.
export const diffBatch02: { lessonId: string; questions: QuizQuestion[] }[] = [
  // ===== INCOME-6: Taxes =====
  {
    lessonId: "income-6-hard",
    questions: [
      {
        id: "income-6-h1",
        question: "A tax system has brackets: 10% on the first $10,000 and 20% on income above $10,000. Priya earns $15,000. How much federal income tax does she owe before deductions?",
        options: [
          "$3,000 total tax owed",
          "$2,000 total tax owed",
          "$1,500 total tax owed",
          "$2,500 total tax owed"
        ],
        correctAnswer: 1,
        explanation: "The first $10,000 is taxed at 10% ($1,000) and the next $5,000 at 20% ($1,000), so total tax is $1,000 + $1,000 = $2,000."
      },
      {
        id: "income-6-h2",
        question: "Marcus earns $40,000 and the standard deduction is $14,000. His only bracket rate is 12% on taxable income. How much does he owe?",
        options: [
          "$4,800 in tax",
          "$1,680 in tax",
          "$3,120 in tax",
          "$5,880 in tax"
        ],
        correctAnswer: 2,
        explanation: "Taxable income is $40,000 - $14,000 = $26,000, and 12% of $26,000 is $3,120."
      },
      {
        id: "income-6-h3",
        question: "Leah's employer withheld $2,400 during the year, but after using her standard deduction she actually owes $1,900 in tax. What is the result when she files?",
        options: [
          "She receives a $500 refund",
          "She owes an extra $500",
          "She owes an extra $1,900",
          "She receives a $2,400 refund"
        ],
        correctAnswer: 0,
        explanation: "She had $2,400 withheld but owes only $1,900, so the $500 overpayment comes back to her as a refund."
      },
      {
        id: "income-6-h4",
        question: "Tom got a raise that moved his top $2,000 of income from the 12% bracket into the 22% bracket. How much extra tax does that $2,000 raise cost him?",
        options: [
          "$440, since 22% now applies to everything",
          "$200, which is the 10% difference on $2,000",
          "$240, which is 12% of the $2,000",
          "$440, which is 22% of the $2,000"
        ],
        correctAnswer: 3,
        explanation: "Only the $2,000 above the threshold is taxed at the higher marginal rate, so the extra tax is 22% of $2,000 = $440, and he still keeps $1,560."
      },
      {
        id: "income-6-h5",
        question: "Diego earned $6,000 in wages plus $1,200 in reported tips as a server. If his standard deduction is $14,000, how much of his income is taxable?",
        options: [
          "$7,200 is taxable",
          "$1,200 is taxable",
          "$0 is taxable",
          "$6,000 is taxable"
        ],
        correctAnswer: 2,
        explanation: "Tips count as income, so his total is $7,200, but because that is below the $14,000 standard deduction, none of it is taxable."
      },
      {
        id: "income-6-h6",
        question: "Why can two workers with the same gross salary end up owing different amounts of federal income tax?",
        options: [
          "Because deductions and credits change each one's taxable income",
          "Because gross salary is the only thing that ever matters",
          "Because employers randomly pick each person's tax rate",
          "Because tips are never counted for either worker"
        ],
        correctAnswer: 0,
        explanation: "Two people can have the same gross pay yet different deductions, credits, and filing situations, which change their taxable income and final bill."
      },
      {
        id: "income-6-h7",
        question: "A worker sees $180 taken from each biweekly paycheck for federal income tax. Over 26 pay periods, how does this pay-as-you-go system help her?",
        options: [
          "It means she pays no tax at all when filing",
          "It lets her employer secretly keep the $4,680 as profit",
          "It doubles her total federal income tax bill by year end",
          "It spreads roughly $4,680 across the year instead of one bill"
        ],
        correctAnswer: 3,
        explanation: "26 periods times $180 is $4,680 withheld gradually, so pay-as-you-go breaks the tax into small pieces rather than one lump-sum payment."
      }
    ]
  },
  {
    lessonId: "income-6-remedial",
    questions: [
      {
        id: "income-6-r1",
        question: "What do income taxes help pay for?",
        options: [
          "Advertising for private companies",
          "Roads, schools, and public services",
          "Free holiday gifts for employers",
          "Everyday bank account fees"
        ],
        correctAnswer: 1,
        explanation: "Income taxes fund shared public services like roads, schools, and safety programs."
      },
      {
        id: "income-6-r2",
        question: "What form does your employer send in January showing your yearly wages and tax withheld?",
        options: [
          "A W-2 form",
          "A bank statement",
          "A grocery receipt",
          "A library card"
        ],
        correctAnswer: 0,
        explanation: "The W-2 shows how much you earned and how much tax was withheld, and you use it to file your return."
      },
      {
        id: "income-6-r3",
        question: "If your employer withheld more tax than you actually owe, what can you get when you file?",
        options: [
          "A fine",
          "A double tax bill",
          "A refund",
          "Nothing at all"
        ],
        correctAnswer: 2,
        explanation: "When too much tax was withheld, filing a return gives the extra money back to you as a refund."
      },
      {
        id: "income-6-r4",
        question: "The standard deduction is an amount that is:",
        options: [
          "Added to your tax bill as a penalty",
          "Subtracted from income before tax is figured",
          "A fee taken from every paycheck",
          "A bonus paid to you by the IRS"
        ],
        correctAnswer: 1,
        explanation: "The standard deduction shields part of your income from tax by lowering the amount that gets taxed."
      },
      {
        id: "income-6-r5",
        question: "Are tips you earn at a job taxable income?",
        options: [
          "No, tips are always free gifts",
          "Only tips over $10,000",
          "Yes, tips count as income",
          "Only tips paid by card"
        ],
        correctAnswer: 2,
        explanation: "The IRS treats tips as taxable income just like regular wages."
      },
      {
        id: "income-6-r6",
        question: "A progressive tax means that:",
        options: [
          "Higher income is taxed at higher rates",
          "Everyone pays the same dollar amount",
          "Taxes go down as you earn more",
          "Only businesses pay any tax"
        ],
        correctAnswer: 0,
        explanation: "In a progressive system, each higher slice of income faces a higher tax rate."
      },
      {
        id: "income-6-r7",
        question: "Why do employers take a little tax out of each paycheck?",
        options: [
          "To keep the withheld money as their profit",
          "Because a single yearly tax bill is illegal",
          "So the cost is spread across the year",
          "Because banks refuse to process tax payments"
        ],
        correctAnswer: 2,
        explanation: "Withholding small amounts each payday spreads the tax over the year so you avoid one huge bill."
      }
    ]
  },

  // ===== INCOME-7: Career ROI =====
  {
    lessonId: "income-7-hard",
    questions: [
      {
        id: "income-7-h1",
        question: "A training program costs $15,000 and raises your pay by $6,000 per year. Roughly how many years until the extra earnings cover the cost?",
        options: [
          "About 1 year",
          "About 2.5 years",
          "About 10 years",
          "About 5 years"
        ],
        correctAnswer: 1,
        explanation: "$15,000 divided by $6,000 per year is 2.5 years, after which the higher pay becomes pure gain."
      },
      {
        id: "income-7-h2",
        question: "Sofia quits a $30,000-per-year job to attend a 2-year program with $20,000 total tuition. What is the full cost of her choice?",
        options: [
          "$20,000, since only the tuition really counts",
          "$60,000, from two years of lost wages only",
          "$80,000, tuition plus two years of lost wages",
          "$40,000, from her tuition figure simply doubled"
        ],
        correctAnswer: 2,
        explanation: "The true cost adds $20,000 tuition to $60,000 in wages given up over two years, for $80,000 in total."
      },
      {
        id: "income-7-h3",
        question: "Career A pays $40,000 growing $2,000 per year; Career B pays $50,000 but never rises. After 10 years, which has earned more in that final year?",
        options: [
          "Career A, now at $58,000",
          "Career B, still at $50,000",
          "They earn exactly the same",
          "Career A, now at $60,000"
        ],
        correctAnswer: 0,
        explanation: "After 10 years of $2,000 raises, Career A pays $40,000 + (9 x $2,000) = $58,000, surpassing Career B's flat $50,000."
      },
      {
        id: "income-7-h4",
        question: "Which career choice most clearly signals a high ROI?",
        options: [
          "High training cost, low pay, but a famous employer",
          "Low training cost, strong demand, and solid pay",
          "The longest possible schooling regardless of pay",
          "A fancy downtown office with average pay"
        ],
        correctAnswer: 1,
        explanation: "High ROI comes from a low investment paired with strong demand and good pay, not from prestige or office style."
      },
      {
        id: "income-7-h5",
        question: "Kai can apprentice as a plumber earning $25,000 while training, or pay $18,000 for a program with weak job prospects. Why is the apprenticeship the stronger ROI?",
        options: [
          "Because every paid tuition program guarantees future wealth",
          "Because ROI thinking never applies to skilled trades",
          "It earns income during training and leads to real demand",
          "Because plumbing work requires no real training or skill at all"
        ],
        correctAnswer: 2,
        explanation: "The apprenticeship has negative cost since he is paid to learn, and it leads to an in-demand trade, while the tuition program pairs high cost with a low payoff."
      },
      {
        id: "income-7-h6",
        question: "Nina loves art and also wants strong income. Which move best balances passion with ROI thinking?",
        options: [
          "Ignore the pay entirely and just hope it works out",
          "Take the single highest-paying job she would truly hate",
          "Abandon art completely since artists all earn nothing",
          "Research paths like UX or graphic design that pay well"
        ],
        correctAnswer: 3,
        explanation: "Fields like UX and graphic design pay solidly while using artistic talent, letting her keep her passion without ignoring the numbers."
      },
      {
        id: "income-7-h7",
        question: "Two programs both raise pay by $8,000 per year. Program X costs $8,000; Program Y costs $24,000. Which has the better ROI and why?",
        options: [
          "Program Y, since higher cost means higher quality",
          "Program X, because it recovers its cost three times faster",
          "They are exactly equal since the annual raise is the same",
          "Program Y, because it takes longer to pay off"
        ],
        correctAnswer: 1,
        explanation: "With the same $8,000 annual benefit, Program X pays back in 1 year versus 3 years for Program Y, giving X the far better return."
      }
    ]
  },
  {
    lessonId: "income-7-remedial",
    questions: [
      {
        id: "income-7-r1",
        question: "What does career ROI compare?",
        options: [
          "The number of coworkers you have",
          "Earnings gained versus costs invested",
          "How popular a job looks online",
          "The color of the office walls"
        ],
        correctAnswer: 1,
        explanation: "Career ROI weighs what you spend on training against the extra income the career brings."
      },
      {
        id: "income-7-r2",
        question: "A program costs $10,000 and pays you $10,000 more per year. About how long until it pays for itself?",
        options: [
          "About 1 year",
          "About 5 years",
          "About 20 years",
          "It never pays off"
        ],
        correctAnswer: 0,
        explanation: "An extra $10,000 per year matches the $10,000 cost, so it pays for itself in about one year."
      },
      {
        id: "income-7-r3",
        question: "Besides tuition, what is another real cost of going to school full-time?",
        options: [
          "The cost of a graduation party",
          "The price of a diploma frame",
          "Wages you miss while studying",
          "The color of your backpack"
        ],
        correctAnswer: 2,
        explanation: "Time in school is time not earning, so lost wages are a real cost of training."
      },
      {
        id: "income-7-r4",
        question: "Why look at earnings over a whole career instead of only the first year?",
        options: [
          "Careers grow at different speeds over time",
          "First-year pay is always the highest ever",
          "All careers pay exactly the same amount",
          "First-year pay cannot be found out"
        ],
        correctAnswer: 0,
        explanation: "Some careers start low but grow fast, so looking across the years shows the real difference."
      },
      {
        id: "income-7-r5",
        question: "Which is a sign of a high-ROI career path?",
        options: [
          "A famous company name printed on a card",
          "The longest possible years of schooling",
          "Strong demand, good pay, and low training cost",
          "A fancy corner office in downtown"
        ],
        correctAnswer: 2,
        explanation: "The best returns come when the skill is needed, pays well, and does not cost a fortune to learn."
      },
      {
        id: "income-7-r6",
        question: "Opportunity cost of extra years in school mainly means:",
        options: [
          "The price of buying a new laptop",
          "The wages you did not earn while studying",
          "The cost of renting a formal graduation gown",
          "The fee charged for a class photo"
        ],
        correctAnswer: 1,
        explanation: "Opportunity cost is the income you give up by staying in school instead of working."
      },
      {
        id: "income-7-r7",
        question: "Ethan can get paid while training as an electrician or pay tuition for a program with few job openings. Which likely has better ROI?",
        options: [
          "The apprenticeship, since he earns while learning",
          "The program, because all degrees make you rich",
          "Neither, since ROI never applies",
          "Both are exactly the same"
        ],
        correctAnswer: 0,
        explanation: "Being paid to learn an in-demand trade beats paying tuition for weak job prospects."
      }
    ]
  },

  // ===== INCOME-8: Education as Investment =====
  {
    lessonId: "income-8-hard",
    questions: [
      {
        id: "income-8-h1",
        question: "Ali can attend a $25,000-per-year private school or an $8,000-per-year in-state school for the same nursing license. Over four years, how much would the cheaper school save?",
        options: [
          "$17,000 saved",
          "$68,000 saved",
          "$100,000 saved",
          "$32,000 saved"
        ],
        correctAnswer: 1,
        explanation: "The yearly difference is $17,000, and over four years that is 4 x $17,000 = $68,000 saved for the same license and pay."
      },
      {
        id: "income-8-h2",
        question: "Maria would borrow $80,000 for a degree in a field paying about $35,000 a year. Why is this a warning sign?",
        options: [
          "Because loans in these low-paying fields are automatically forgiven",
          "Her debt would be more than double her starting pay",
          "Because taking a large $80,000 student loan is always smart",
          "Because salary never matters at all when borrowing"
        ],
        correctAnswer: 1,
        explanation: "A common guideline keeps borrowing near or below first-year pay, but owing more than double her $35,000 salary would make repayment a heavy burden."
      },
      {
        id: "income-8-h3",
        question: "A degree adds about $20,000 per year in extra earnings and costs $60,000 total in tuition and lost wages. Ignoring interest, about how long until it breaks even?",
        options: [
          "About 3 years",
          "About 1 year",
          "About 12 years",
          "It never breaks even"
        ],
        correctAnswer: 0,
        explanation: "$60,000 divided by $20,000 of extra yearly earnings is 3 years to break even, after which the gain continues for decades."
      },
      {
        id: "income-8-h4",
        question: "Dana wins a $15,000 grant that never has to be repaid, cutting her $50,000 cost. How does this change her education as an investment?",
        options: [
          "It raises her total upfront cost up to $65,000",
          "It lowers her cost to $35,000 for the same payoff",
          "It must eventually be fully repaid with added interest later",
          "It has no real effect on the investment"
        ],
        correctAnswer: 1,
        explanation: "A grant is money never repaid, so it drops her real cost to $35,000 while the career payoff stays the same, improving the return."
      },
      {
        id: "income-8-h5",
        question: "Why is it misleading to say a bachelor's degree guarantees you higher pay than a high school diploma?",
        options: [
          "Because degree holders always earn exactly triple the pay",
          "Because holding a degree has no effect on pay at all",
          "The gap is a real average, but individual results still vary",
          "Because high school grads always out-earn most degree graduates"
        ],
        correctAnswer: 2,
        explanation: "Data shows degree holders earn more on average, but averages do not guarantee any single person's outcome, which depends on field, cost, and choices."
      },
      {
        id: "income-8-h6",
        question: "Devon wants to be a software developer and is weighing a degree, a bootcamp, and self-study. What best reflects education-as-investment thinking?",
        options: [
          "Pick whichever school happens to have the coolest mascot",
          "Choose the single most expensive option that is available",
          "Simply follow along with whatever his own friends are doing",
          "Compare each path's real cost against its real job outcomes"
        ],
        correctAnswer: 3,
        explanation: "All three paths can lead to developer jobs at very different prices, so comparing cost against actual job outcomes is how you evaluate the investment."
      },
      {
        id: "income-8-h7",
        question: "In 'education as an investment,' which of these is the return rather than the cost?",
        options: [
          "The tuition you pay each semester",
          "The wages you miss while enrolled",
          "The higher lifetime earnings the training unlocks",
          "The interest charged on your student loans"
        ],
        correctAnswer: 2,
        explanation: "The return is the extra income and expanded options gained over a career, weighed against costs like tuition, lost wages, and loan interest."
      }
    ]
  },
  {
    lessonId: "income-8-remedial",
    questions: [
      {
        id: "income-8-r1",
        question: "On average, workers with a bachelor's degree tend to earn:",
        options: [
          "Notably more than high school diploma holders",
          "Exactly the same amount as everyone else",
          "Much less than most high school graduates",
          "Almost nothing at all their whole career"
        ],
        correctAnswer: 0,
        explanation: "US data shows degree holders earn more on average over their careers."
      },
      {
        id: "income-8-r2",
        question: "In 'education as an investment,' the 'return' is:",
        options: [
          "The physical diploma paper by itself",
          "Higher lifetime earnings and more job options",
          "The interest owed on your student loans",
          "A refund for the dropped classes"
        ],
        correctAnswer: 1,
        explanation: "The return is the extra income and opportunities education unlocks over a lifetime."
      },
      {
        id: "income-8-r3",
        question: "Two schools give the same nursing license, but one costs far less. What is the smart consideration?",
        options: [
          "The pricier school always guarantees higher pay",
          "Only the campus food should decide",
          "The cheaper school can offer similar returns",
          "Cost never matters at all"
        ],
        correctAnswer: 2,
        explanation: "Same license and pay for much less money makes the cheaper school a better investment."
      },
      {
        id: "income-8-r4",
        question: "Besides a four-year degree, which path can also build strong earning power?",
        options: [
          "Only a full doctoral degree",
          "Buying lots of lottery tickets",
          "Skipping all education and training",
          "Trade school or an apprenticeship"
        ],
        correctAnswer: 3,
        explanation: "Trades, apprenticeships, and certificates train workers who can earn strong incomes too."
      },
      {
        id: "income-8-r5",
        question: "Why do scholarships and grants improve the value of education?",
        options: [
          "They lower the cost and never have to be repaid",
          "They must be fully repaid back later with high interest",
          "They raise the tuition cost for everyone else",
          "They only ever exist for star college athletes"
        ],
        correctAnswer: 0,
        explanation: "Scholarships and grants cut the cost without adding debt, boosting the return."
      },
      {
        id: "income-8-r6",
        question: "A student would owe far more in loans than she would earn in her first year. This is:",
        options: [
          "Always a very smart financial move",
          "A warning sign about the debt",
          "Clear proof the loan is free",
          "Not related to her future salary"
        ],
        correctAnswer: 1,
        explanation: "Borrowing much more than your expected starting pay makes repayment a heavy burden."
      },
      {
        id: "income-8-r7",
        question: "Why does the answer to 'is college worth it?' depend on the situation?",
        options: [
          "Because college tuition is identical everywhere you go",
          "Because your major is assigned to you at random",
          "Because costs, majors, and debt levels vary widely",
          "Because employers never actually check for degrees"
        ],
        correctAnswer: 2,
        explanation: "A cheap degree in a high-demand field is a very different investment than heavy debt for low pay."
      }
    ]
  },

  // ===== INCOME-9: Skill Stacking =====
  {
    lessonId: "income-9-hard",
    questions: [
      {
        id: "income-9-h1",
        question: "Why can being good at two or three uncommon-together skills beat being world-class at just one?",
        options: [
          "Because a single skill is always completely useless",
          "Because rare combinations face far less direct competition",
          "Because employers openly ban skilled specialists",
          "Because stacked skills can literally never expire"
        ],
        correctAnswer: 1,
        explanation: "Being the very best at one thing is nearly impossible, but a rare combination few people share makes you scarce, and scarcity raises earning power."
      },
      {
        id: "income-9-h2",
        question: "Ruby offers design for $500 and marketing for $400 separately. A brand needs both as one package. How does her stack most likely help her earn?",
        options: [
          "She can charge a premium as one hire replacing two",
          "She must completely abandon all her design work",
          "It makes her existing design skill worth a lot less",
          "It guarantees her a secure government office job"
        ],
        correctAnswer: 0,
        explanation: "Delivering both visuals and strategy as a package lets Ruby command a premium because she replaces two hires with one."
      },
      {
        id: "income-9-h3",
        question: "Two video editors are equal, but one deeply understands basketball and edits highlight reels. Why does she win sports clients?",
        options: [
          "Because two skills together mean double the invoices",
          "Because clients always pick the very cheapest editor",
          "Her niche combo matches exactly what those clients need",
          "Because her deep sports knowledge fully replaces editing skill"
        ],
        correctAnswer: 2,
        explanation: "Sports clients want editors who grasp the game's key moments without coaching, so her rare combination fits their needs better than generic editing."
      },
      {
        id: "income-9-h4",
        question: "Carlos already repairs bikes and is now learning bookkeeping. Why does this specific pairing boost his income potential?",
        options: [
          "Bookkeeping somehow makes his bike repairs physically faster",
          "It qualifies him to join a professional pro cycling team",
          "Banks will pay him extra just for his biking hobbies",
          "Repair plus money management lets him run a profitable shop"
        ],
        correctAnswer: 3,
        explanation: "A small business owner needs both a trade and money skills, so combining them lets Carlos keep the profits instead of only earning a wage."
      },
      {
        id: "income-9-h5",
        question: "Why does communication skill act as a multiplier when stacked on top of technical skill?",
        options: [
          "It completely replaces the need for any technical skill",
          "Explaining technical work clearly raises the value of everything it produces",
          "Technical workers are officially banned from ever presenting anything",
          "Because talking to other people is far, far easier than coding"
        ],
        correctAnswer: 1,
        explanation: "When a technical expert can explain ideas to clients and bosses, the work is trusted and used more, so communication amplifies the value of the technical skill."
      },
      {
        id: "income-9-h6",
        question: "Which pairing is the strongest example of a value-multiplying skill stack rather than just two unrelated hobbies?",
        options: [
          "Owning two phones from the same brand",
          "Watching the same show every night",
          "Coding paired with clear public speaking",
          "Having two copies of one certificate"
        ],
        correctAnswer: 2,
        explanation: "A coder who can also present ideas can lead projects, not just complete them, so the two distinct skills reinforce each other into a real stack."
      },
      {
        id: "income-9-h7",
        question: "A teen who streams games wants to build a skill stack cheaply and quickly. What is the smartest approach?",
        options: [
          "Wait until he is age thirty to learn anything new",
          "Only ever study the things he has already mastered",
          "Buy pricey courses before trying the free ones",
          "Add a complementary skill like video editing using free resources"
        ],
        correctAnswer: 3,
        explanation: "Building on an existing interest keeps motivation high, and adding a complementary skill like editing with free tools creates value fast at low cost."
      }
    ]
  },
  {
    lessonId: "income-9-remedial",
    questions: [
      {
        id: "income-9-r1",
        question: "What is skill stacking?",
        options: [
          "Combining several skills to raise your value",
          "Learning one skill and never adding more",
          "Collecting job titles with no learning",
          "Piling certificates in a drawer"
        ],
        correctAnswer: 0,
        explanation: "Skill stacking layers complementary abilities so the combination is worth more than one skill alone."
      },
      {
        id: "income-9-r2",
        question: "Which is an example of a skill stack?",
        options: [
          "Owning two phones from one brand",
          "Coding plus public speaking plus writing",
          "Watching one show nightly",
          "Two copies of one certificate"
        ],
        correctAnswer: 1,
        explanation: "Distinct skills that reinforce each other, like coding, speaking, and writing, form a true stack."
      },
      {
        id: "income-9-r3",
        question: "Ruby knows design and is learning marketing. How does this help her earn more?",
        options: [
          "It makes her existing design skills worthless",
          "She can offer brands full campaign packages",
          "It forces her to quit design entirely",
          "It guarantees her a secure government job"
        ],
        correctAnswer: 1,
        explanation: "Offering both visuals and marketing lets her charge more by delivering the whole package."
      },
      {
        id: "income-9-r4",
        question: "Why can a mix of good skills beat being the best at only one?",
        options: [
          "Single skills are always totally useless",
          "Specialists are banned from jobs",
          "A rare combination has less competition",
          "Skills expire after five years"
        ],
        correctAnswer: 2,
        explanation: "A rare combination of skills makes you stand out because fewer people compete with it."
      },
      {
        id: "income-9-r5",
        question: "Carlos fixes bikes and learns bookkeeping. How could that raise his income?",
        options: [
          "He could run his own repair business",
          "It makes his bike repairs physically faster",
          "It qualifies him for pro cycling teams",
          "Banks will pay him for his hobbies"
        ],
        correctAnswer: 0,
        explanation: "Repair plus money skills are what a small business owner needs to keep the profits."
      },
      {
        id: "income-9-r6",
        question: "Why does communication pair well with technical skill?",
        options: [
          "It fully replaces the underlying technical skill",
          "Explaining the work clearly makes it more valuable",
          "Technical people simply cannot ever present their ideas",
          "Talking to people is easier than coding"
        ],
        correctAnswer: 1,
        explanation: "Being able to explain technical work clearly makes that work more useful and valuable."
      },
      {
        id: "income-9-r7",
        question: "What is a good way for a teen to start a skill stack?",
        options: [
          "Wait until you finally turn age thirty",
          "Only study the subjects you have already mastered",
          "Buy only the very most expensive online courses first",
          "Add a skill that fits an interest you have"
        ],
        correctAnswer: 3,
        explanation: "Building on an existing interest keeps you motivated and makes starting cheap and easy."
      }
    ]
  },

  // ===== INCOME-10: Entrepreneurship Income =====
  {
    lessonId: "income-10-hard",
    questions: [
      {
        id: "income-10-h1",
        question: "Amara sells bracelets for $12 each. Materials cost $5 each and she sold 25 this month. What is her profit?",
        options: [
          "$300 profit",
          "$175 profit",
          "$125 profit",
          "$425 profit"
        ],
        correctAnswer: 1,
        explanation: "Revenue is 25 x $12 = $300, materials cost 25 x $5 = $125, so profit is $300 - $125 = $175."
      },
      {
        id: "income-10-h2",
        question: "Jayden's lawn service earns $800 in revenue, but gas is $120 and equipment repair is $80. What is his profit?",
        options: [
          "$800 profit",
          "$680 profit",
          "$720 profit",
          "$600 profit"
        ],
        correctAnswer: 3,
        explanation: "Total expenses are $120 + $80 = $200, so profit is $800 - $200 = $600."
      },
      {
        id: "income-10-h3",
        question: "A candle shop made $500 revenue in a month but spent $650 on supplies and booth fees. What is the result?",
        options: [
          "A $150 profit",
          "A $150 loss",
          "A $1,150 profit",
          "Break-even with $0"
        ],
        correctAnswer: 1,
        explanation: "When expenses of $650 exceed revenue of $500, the business has a loss of $150, not a profit."
      },
      {
        id: "income-10-h4",
        question: "Priya earns $18 per handmade bag with $6 material cost each. How many bags must she sell to make $360 in profit?",
        options: [
          "20 bags",
          "60 bags",
          "30 bags",
          "45 bags"
        ],
        correctAnswer: 2,
        explanation: "Profit per bag is $18 - $6 = $12, and $360 divided by $12 is 30 bags."
      },
      {
        id: "income-10-h5",
        question: "Why is entrepreneurship income riskier than a steady wage, even when a business is doing well?",
        options: [
          "Because business owners must always work completely alone",
          "Because profits are capped by law at $50,000",
          "Because entrepreneurs pay no personal income taxes at all",
          "Income is unpredictable and a loss is always possible"
        ],
        correctAnswer: 3,
        explanation: "A business can profit one month and lose money the next with no guaranteed paycheck, so the income is unpredictable."
      },
      {
        id: "income-10-h6",
        question: "Sasha has $50 and wants to launch a sticker shop. Why is testing a small batch the smartest first move?",
        options: [
          "It proves whether customers will pay before risking more money",
          "Because she should quit school first to focus",
          "Because paid ads always guarantee plenty of sales",
          "Because taking a big loan removes all of the risk"
        ],
        correctAnswer: 0,
        explanation: "Testing a small batch shows whether real customers will buy before she risks bigger money, limiting losses while she learns."
      },
      {
        id: "income-10-h7",
        question: "Instead of spending her first $400 profit, Maya buys a better printer and more supplies. Why might this raise her future income?",
        options: [
          "Because reinvesting the profit guarantees that she owes no taxes",
          "Because it locks in a fixed monthly wage",
          "Reinvesting can grow the business so it earns more later",
          "Because her customers eventually get all the money back"
        ],
        correctAnswer: 2,
        explanation: "Reinvesting profits into equipment and inventory trades income today for the chance at bigger income as the business grows."
      }
    ]
  },
  {
    lessonId: "income-10-remedial",
    questions: [
      {
        id: "income-10-r1",
        question: "How do entrepreneurs mainly earn income?",
        options: [
          "From business profits after paying expenses",
          "From a fixed, guaranteed government wage",
          "Only from occasional customer tips",
          "From taxes collected on their behalf"
        ],
        correctAnswer: 0,
        explanation: "Business owners earn what is left after covering their costs, which is the profit."
      },
      {
        id: "income-10-r2",
        question: "What is the formula for profit?",
        options: [
          "Revenue plus expenses",
          "Revenue minus expenses",
          "Expenses minus revenue",
          "Revenue times expenses"
        ],
        correctAnswer: 1,
        explanation: "Profit is what remains after you subtract all costs from all sales revenue."
      },
      {
        id: "income-10-r3",
        question: "Amara sells bracelets for $10 each and they cost $4 to make. What is her profit on one bracelet?",
        options: [
          "$14",
          "$10",
          "$4",
          "$6"
        ],
        correctAnswer: 3,
        explanation: "Profit per bracelet is $10 - $4 = $6."
      },
      {
        id: "income-10-r4",
        question: "Why is entrepreneurship income risky?",
        options: [
          "Business profits are capped by law",
          "Income is unpredictable and losses can happen",
          "Business owners must always work alone forever",
          "Entrepreneurs never pay any income taxes"
        ],
        correctAnswer: 1,
        explanation: "A business has no guaranteed paycheck, so income is unpredictable and losses are possible."
      },
      {
        id: "income-10-r5",
        question: "One income advantage of owning a business over a job is:",
        options: [
          "Earnings can grow beyond a fixed wage",
          "A guaranteed steady profit every month",
          "All business income is completely tax free",
          "There are never any weekend hours"
        ],
        correctAnswer: 0,
        explanation: "A wage is capped by your hours, but business profit can scale as sales grow."
      },
      {
        id: "income-10-r6",
        question: "Jayden earns $500 from lawn care and spends $150 on gas. What is his profit?",
        options: [
          "$500",
          "$650",
          "$350",
          "$150"
        ],
        correctAnswer: 2,
        explanation: "Profit is revenue minus expenses: $500 - $150 = $350."
      },
      {
        id: "income-10-r7",
        question: "What does it mean to reinvest profits?",
        options: [
          "Put profits back into growing the business",
          "Spend all the profits on personal shopping",
          "Give all of the profits away to customers",
          "Deposit them into a friend's bank account"
        ],
        correctAnswer: 0,
        explanation: "Reinvesting means using earnings to grow the business, like buying more inventory or equipment."
      }
    ]
  },
]
