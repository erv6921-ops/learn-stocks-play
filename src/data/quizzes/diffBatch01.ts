import { QuizQuestion } from "@/types"

// Adaptive-difficulty pools: <lessonId>-hard and <lessonId>-remedial, 7 each.
export const diffBatch01: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "income-2-hard",
    questions: [
      {
        id: "income-2-h1",
        question: "Maya is a nonexempt hourly worker paid $20 an hour. This week she works 46 hours. Using federal overtime rules, what is her gross pay?",
        options: [
          "$920 for the week",
          "$980 for the week",
          "$1,020 for the week",
          "$1,380 for the week"
        ],
        correctAnswer: 1,
        explanation: "The first 40 hours pay $20 (= $800) and the 6 overtime hours pay time-and-a-half at $30 each (= $180), so $800 + $180 = $980."
      },
      {
        id: "income-2-h2",
        question: "A job posts $54,600 per year paid every two weeks (26 paychecks). Another posts $21 per hour for a steady 40-hour week. Which pays more per two-week period, and by how much?",
        options: [
          "The hourly job, by about $580",
          "They pay exactly the same amount",
          "The salaried job, by about $420",
          "The salaried job, by about $210"
        ],
        correctAnswer: 3,
        explanation: "The salary pays $54,600 / 26 = $2,100 biweekly, while the hourly pays $21 x 80 = $1,680, so the salary is $420 more per period."
      },
      {
        id: "income-2-h3",
        question: "Ben is a salaried (exempt) worker earning $60,000 a year. One week he works 55 hours instead of his usual 40. Compared to a normal week, how does his paycheck change?",
        options: [
          "It stays the same because exempt salary ignores extra hours",
          "It rises by 15 hours of time-and-a-half pay",
          "It rises by 15 hours at his regular hourly rate",
          "It drops because he exceeded standard hours"
        ],
        correctAnswer: 0,
        explanation: "Exempt salaried workers earn a fixed amount regardless of hours, so a 55-hour week pays the same as a 40-hour week with no overtime added."
      },
      {
        id: "income-2-h4",
        question: "Dana earns $17.50 an hour and worked 32 hours last week and 40 hours this week. What is her combined gross pay for the two weeks, before any overtime applies?",
        options: [
          "$1,120 total",
          "$1,400 total",
          "$1,260 total",
          "$1,190 total"
        ],
        correctAnswer: 2,
        explanation: "Neither week passed 40 hours, so no overtime applies: (32 + 40) x $17.50 = 72 x $17.50 = $1,260."
      },
      {
        id: "income-2-h5",
        question: "Two offers: Job A is $45,000 salary. Job B is $22 an hour but only guarantees 35 hours a week for 50 working weeks. Which earns more per year at those hours?",
        options: [
          "Job A, by about $6,500",
          "Job B, by about $6,500",
          "Job A, by about $1,500",
          "They earn the same annual amount"
        ],
        correctAnswer: 2,
        explanation: "Job B earns $22 x 35 x 50 = $38,500, so Job A at $45,000 pays about $6,500 more, not $1,500 - here $45,000 - $38,500 = $6,500."
      },
      {
        id: "income-2-h6",
        question: "Carlos wants income he can budget on exactly, but also wants extra pay when he works long weeks. Which trade-off is he actually facing?",
        options: [
          "Salary gives both predictability and overtime at once",
          "Hourly gives predictable totals but never extra pay",
          "Predictable salary usually means no overtime for extra hours",
          "Only commission jobs can offer both features together"
        ],
        correctAnswer: 2,
        explanation: "A salary delivers predictable paychecks but exempt salaried workers usually get no overtime, so Carlos cannot fully get both from one structure."
      },
      {
        id: "income-2-h7",
        question: "An offer states $3,500 per month, paid monthly. What is the equivalent annual salary, and how would it compare to $20 an hour at 40 hours a week for 52 weeks?",
        options: [
          "$42,000 a year, which is more than the hourly job",
          "$42,000 a year, which is less than the hourly job",
          "$36,000 a year, which is less than the hourly job",
          "$3,500 a year, which is far less than the hourly job"
        ],
        correctAnswer: 0,
        explanation: "$3,500 x 12 = $42,000 a year, while $20 x 40 x 52 = $41,600, so the salary is slightly higher than the hourly job."
      }
    ]
  },
  {
    lessonId: "income-2-remedial",
    questions: [
      {
        id: "income-2-r1",
        question: "Which type of worker is paid for each hour they work?",
        options: [
          "A salaried worker",
          "An hourly worker",
          "A retired worker",
          "A volunteer"
        ],
        correctAnswer: 1,
        explanation: "An hourly worker earns money for each hour worked, while a salaried worker gets a fixed amount no matter the hours."
      },
      {
        id: "income-2-r2",
        question: "A salary is best described as which of the following?",
        options: [
          "A fixed yearly amount split into regular paychecks",
          "A fee you pay your employer each week",
          "Money that changes every day",
          "A one-time holiday bonus"
        ],
        correctAnswer: 0,
        explanation: "A salary is a set annual amount divided into equal, regular paychecks throughout the year."
      },
      {
        id: "income-2-r3",
        question: "Sam earns $10 per hour and works 5 hours. What is his gross pay?",
        options: [
          "$5",
          "$15",
          "$50",
          "$100"
        ],
        correctAnswer: 2,
        explanation: "Gross pay for hourly work is rate times hours: $10 x 5 = $50."
      },
      {
        id: "income-2-r4",
        question: "What is one clear advantage of a salary?",
        options: [
          "You never pay any taxes",
          "Your paycheck is predictable and the same each period",
          "You get paid double every week",
          "You can never be fired"
        ],
        correctAnswer: 1,
        explanation: "A salary pays the same amount each period, which makes it easy to plan a budget."
      },
      {
        id: "income-2-r5",
        question: "A salary of $52,000 a year is paid over how many weeks?",
        options: [
          "12 weeks",
          "24 weeks",
          "52 weeks",
          "365 weeks"
        ],
        correctAnswer: 2,
        explanation: "There are 52 weeks in a year, so a yearly salary is spread across those 52 weeks."
      },
      {
        id: "income-2-r6",
        question: "If an hourly worker picks up an extra shift, what usually happens to their pay?",
        options: [
          "It goes down",
          "It stays exactly the same",
          "It goes up",
          "It becomes zero"
        ],
        correctAnswer: 2,
        explanation: "Hourly pay rises with hours worked, so an extra shift adds directly to the paycheck."
      },
      {
        id: "income-2-r7",
        question: "Which worker is most likely paid a salary?",
        options: [
          "A babysitter paid per evening",
          "A full-time office manager with fixed yearly pay",
          "A dog walker paid per walk",
          "A cashier paid per hour"
        ],
        correctAnswer: 1,
        explanation: "An office manager with fixed yearly pay is salaried, while the other jobs pay per hour or per task."
      }
    ]
  },
  {
    lessonId: "income-3-hard",
    questions: [
      {
        id: "income-3-h1",
        question: "Rosa earns a $250 base wage plus 6% commission. This week she sells $4,500 in products. What is her total pay?",
        options: [
          "$270 for the week",
          "$520 for the week",
          "$450 for the week",
          "$700 for the week"
        ],
        correctAnswer: 1,
        explanation: "Base plus commission is $250 + 6% of $4,500 ($270) = $520 for the week."
      },
      {
        id: "income-3-h2",
        question: "Jordan can take a flat $18 an hour for 25 hours a week, or a 4% commission on sales that average $12,000 a week. In an average week, which pays more and by how much?",
        options: [
          "Hourly pays more, by $30",
          "Commission pays more, by $30",
          "They pay the same each week",
          "Commission pays more, by $450"
        ],
        correctAnswer: 1,
        explanation: "Hourly is $18 x 25 = $450, while 4% of $12,000 is $480, so commission pays $30 more in an average week."
      },
      {
        id: "income-3-h3",
        question: "A commission-only seller averaged $600, $200, and $700 over three weeks. What does this pattern best illustrate about pure commission pay?",
        options: [
          "It guarantees a steady income each week",
          "It removes all risk from a worker's pay",
          "It can swing widely, making budgeting harder",
          "It always pays more than any hourly wage"
        ],
        correctAnswer: 2,
        explanation: "With no base wage, income depends entirely on sales, so weeks can vary sharply and make budgeting difficult."
      },
      {
        id: "income-3-h4",
        question: "Nina has a $400 base plus 5% commission. She wants to take home at least $700 this week. How much must she sell to reach that goal?",
        options: [
          "$3,000 in sales",
          "$6,000 in sales",
          "$1,400 in sales",
          "$14,000 in sales"
        ],
        correctAnswer: 1,
        explanation: "She needs $300 from commission above her $400 base, and $300 / 0.05 = $6,000 in sales."
      },
      {
        id: "income-3-h5",
        question: "Two jobs sell the same product. Job A is pure 10% commission. Job B is a $500 base plus 3% commission. At what weekly sales amount do the two pay the same?",
        options: [
          "$5,000 in sales",
          "$7,143 in sales",
          "$3,500 in sales",
          "$500 in sales"
        ],
        correctAnswer: 1,
        explanation: "Set 0.10S = 500 + 0.03S, so 0.07S = 500 and S = $7,143 (about), where both pay roughly the same."
      },
      {
        id: "income-3-h6",
        question: "Why does a base-plus-commission structure appeal to a seller who is nervous about slow weeks but still wants upside?",
        options: [
          "It removes commission so pay never changes",
          "It guarantees the highest pay of any structure",
          "It gives a safety-net wage while still rewarding strong sales",
          "It pays double the base during slow weeks"
        ],
        correctAnswer: 2,
        explanation: "Base plus commission provides a guaranteed floor for slow weeks while still adding a sales cut when selling goes well."
      },
      {
        id: "income-3-h7",
        question: "Marco earns 8% commission and needs $480 in commission this week to cover rent. He has already sold $3,000. How much more must he sell to hit $480 in commission?",
        options: [
          "$1,000 more in sales",
          "$3,000 more in sales",
          "$6,000 more in sales",
          "$2,000 more in sales"
        ],
        correctAnswer: 1,
        explanation: "He needs $6,000 total sales for $480 (480 / 0.08), and he has $3,000, so he needs $3,000 more."
      }
    ]
  },
  {
    lessonId: "income-3-remedial",
    questions: [
      {
        id: "income-3-r1",
        question: "Commission pay is based on what?",
        options: [
          "The number of hours you sit at a desk",
          "A percentage of what you sell",
          "A fixed yearly salary",
          "How long you have worked there"
        ],
        correctAnswer: 1,
        explanation: "Commission is a percentage of sales, so selling more means earning more."
      },
      {
        id: "income-3-r2",
        question: "Tina earns 10% commission and sells $100 worth of goods. What is her commission?",
        options: [
          "$1",
          "$10",
          "$50",
          "$100"
        ],
        correctAnswer: 1,
        explanation: "Ten percent of $100 is $10 (0.10 x 100)."
      },
      {
        id: "income-3-r3",
        question: "What does base plus commission mean?",
        options: [
          "A guaranteed wage plus extra pay from sales",
          "A wage that shrinks when you sell more",
          "Commission paid only once a year",
          "A fee you pay to sell products"
        ],
        correctAnswer: 0,
        explanation: "Base plus commission is a guaranteed paycheck plus a bonus tied to how much you sell."
      },
      {
        id: "income-3-r4",
        question: "What is a risk of working on pure commission?",
        options: [
          "You must pay double taxes",
          "A slow sales week can mean very little pay",
          "You can never take a break",
          "Commission is against the law"
        ],
        correctAnswer: 1,
        explanation: "With no base wage, a slow sales week produces a small paycheck, which is the main risk of pure commission."
      },
      {
        id: "income-3-r5",
        question: "Which job most commonly pays mostly by commission?",
        options: [
          "A librarian",
          "A lifeguard",
          "A car salesperson",
          "A cafeteria worker"
        ],
        correctAnswer: 2,
        explanation: "Car salespeople usually earn a percentage of each sale, while the other jobs are paid hourly."
      },
      {
        id: "income-3-r6",
        question: "Which pay type gives you the same amount each week?",
        options: [
          "Pure commission",
          "A steady hourly wage with set shifts",
          "Sales bonuses only",
          "Tips only"
        ],
        correctAnswer: 1,
        explanation: "A steady hourly wage with set shifts pays the same each week, unlike commission that changes with sales."
      },
      {
        id: "income-3-r7",
        question: "Why do employers use commission in sales jobs?",
        options: [
          "It motivates workers to sell more",
          "It avoids paying any taxes",
          "It is required by law",
          "It guarantees equal pay for everyone"
        ],
        correctAnswer: 0,
        explanation: "Commission ties pay to sales, giving workers a direct reason to sell more."
      }
    ]
  },
  {
    lessonId: "income-4-hard",
    questions: [
      {
        id: "income-4-h1",
        question: "Aisha drives for a delivery app and earned $2,000 last month. No taxes were withheld. If she sets aside 25% for taxes, how much should she keep back?",
        options: [
          "$200 set aside",
          "$500 set aside",
          "$50 set aside",
          "$1,500 set aside"
        ],
        correctAnswer: 1,
        explanation: "As a contractor no taxes are withheld, so 25% of $2,000 is $500 she should set aside for her own tax bill."
      },
      {
        id: "income-4-h2",
        question: "Theo is offered the same weekly pay as a W-2 employee or as a gig contractor. Why might the contractor version leave him with less spendable cash?",
        options: [
          "Contractors are paid in a different currency",
          "Contractors must handle their own taxes and get no benefits",
          "Contractors are always paid less per hour by law",
          "The app deletes a portion of every payment"
        ],
        correctAnswer: 1,
        explanation: "A contractor's pay has no taxes withheld and no employer benefits, so more of the burden falls on Theo, leaving less usable cash."
      },
      {
        id: "income-4-h3",
        question: "A gig tutor made $1,200, $300, and $900 over three months. To budget safely, which approach fits variable gig income best?",
        options: [
          "Spend as if every month equals the best month",
          "Plan around the average and keep a cushion for slow months",
          "Assume the app will cover any shortfalls",
          "Ignore the slow months when planning"
        ],
        correctAnswer: 1,
        explanation: "Gig income swings, so budgeting around the average and saving a cushion protects against slow months like the $300 one."
      },
      {
        id: "income-4-h4",
        question: "Priya earns $30 per gig delivery but spends about $6 per delivery on gas and car wear. After doing 40 deliveries, what is her actual take-home before taxes?",
        options: [
          "$1,200 take-home",
          "$960 take-home",
          "$240 take-home",
          "$1,440 take-home"
        ],
        correctAnswer: 1,
        explanation: "Her net per delivery is $30 - $6 = $24, and 40 x $24 = $960 before taxes - a reason gig workers must track expenses."
      },
      {
        id: "income-4-h5",
        question: "Which statement best captures the core trade-off of gig work?",
        options: [
          "More benefits in exchange for less pay",
          "Guaranteed hours in exchange for higher taxes",
          "Flexibility and control in exchange for instability and no benefits",
          "Lower flexibility in exchange for a company pension"
        ],
        correctAnswer: 2,
        explanation: "Gig work trades the flexibility to choose when you work for unstable income and no employer benefits."
      },
      {
        id: "income-4-h6",
        question: "Sam earned $4,000 from a design gig and sets aside 20% for taxes plus $300 in software costs. Roughly how much is left for personal spending?",
        options: [
          "$2,900 left",
          "$3,200 left",
          "$3,700 left",
          "$800 left"
        ],
        correctAnswer: 0,
        explanation: "Taxes take 20% of $4,000 ($800) and software takes $300, leaving $4,000 - $800 - $300 = $2,900."
      },
      {
        id: "income-4-h7",
        question: "Which situation is an example of gig work rather than traditional employment?",
        options: [
          "A salaried accountant at a firm",
          "A teen designing logos for different clients per project",
          "A worker earning interest in a savings account",
          "An employee receiving a monthly paycheck with benefits"
        ],
        correctAnswer: 1,
        explanation: "Designing logos per project for different clients is short-term, task-based, flexible work - the definition of a gig."
      }
    ]
  },
  {
    lessonId: "income-4-remedial",
    questions: [
      {
        id: "income-4-r1",
        question: "The gig economy is made up of what kind of work?",
        options: [
          "Only jobs at concerts",
          "Short-term, flexible jobs",
          "Permanent salaried office jobs",
          "Unpaid volunteer work"
        ],
        correctAnswer: 1,
        explanation: "The gig economy is built on short-term, flexible, task-based work like delivering or tutoring."
      },
      {
        id: "income-4-r2",
        question: "Most gig workers are classified as what?",
        options: [
          "Full-time employees with benefits",
          "Government workers with a pension",
          "Independent contractors",
          "Unpaid interns"
        ],
        correctAnswer: 2,
        explanation: "Gig platforms usually treat workers as independent contractors, not employees."
      },
      {
        id: "income-4-r3",
        question: "For a gig worker, taxes are usually handled how?",
        options: [
          "The app takes taxes out automatically",
          "No taxes are ever owed",
          "The worker must set aside and pay their own taxes",
          "Taxes are paid by the customer"
        ],
        correctAnswer: 2,
        explanation: "Gig pay has no taxes withheld, so the worker is responsible for setting aside and paying their own taxes."
      },
      {
        id: "income-4-r4",
        question: "What is the biggest advantage of gig work?",
        options: [
          "Free health insurance",
          "Flexibility to choose when you work",
          "A guaranteed paycheck every week",
          "Automatic promotions"
        ],
        correctAnswer: 1,
        explanation: "The main draw of gig work is the flexibility to accept or decline jobs whenever you want."
      },
      {
        id: "income-4-r5",
        question: "What is a downside of relying on gig work?",
        options: [
          "It provides too many benefits",
          "Income can be unsteady with no guaranteed hours",
          "It pays the same every single week",
          "It comes with a company pension"
        ],
        correctAnswer: 1,
        explanation: "Gig income is unsteady and offers no guaranteed hours or benefits, which is the main trade-off."
      },
      {
        id: "income-4-r6",
        question: "Which of these is an example of gig work?",
        options: [
          "A salaried bank teller",
          "Mowing lawns for different neighbors for pay",
          "Getting a weekly allowance from parents",
          "Earning interest on savings"
        ],
        correctAnswer: 1,
        explanation: "Mowing lawns for different neighbors per job is task-based, flexible gig work."
      },
      {
        id: "income-4-r7",
        question: "Because gig income changes month to month, gig workers should do what?",
        options: [
          "Spend everything right away",
          "Budget carefully and save for slow times",
          "Never keep any records",
          "Assume income is always the same"
        ],
        correctAnswer: 1,
        explanation: "Since gig income varies, careful budgeting and saving a cushion help cover slow months."
      }
    ]
  },
  {
    lessonId: "income-5-hard",
    questions: [
      {
        id: "income-5-h1",
        question: "Elena's gross pay is $1,000. Deductions are $120 federal tax, $76.50 FICA, and $40 state tax. What is her net pay?",
        options: [
          "$763.50 net pay",
          "$883.50 net pay",
          "$800 net pay",
          "$236.50 net pay"
        ],
        correctAnswer: 0,
        explanation: "Net pay is gross minus all deductions: $1,000 - $120 - $76.50 - $40 = $763.50."
      },
      {
        id: "income-5-h2",
        question: "A worker earns $1,200 gross. Using the standard employee FICA rate, how much is withheld for FICA alone?",
        options: [
          "About $24",
          "About $91.80",
          "About $180",
          "About $300"
        ],
        correctAnswer: 1,
        explanation: "The employee FICA rate is 7.65%, so 0.0765 x $1,200 = $91.80."
      },
      {
        id: "income-5-h3",
        question: "Raj's net pay is $780 after $220 in total deductions. What was his gross pay?",
        options: [
          "$560 gross",
          "$780 gross",
          "$1,000 gross",
          "$1,220 gross"
        ],
        correctAnswer: 2,
        explanation: "Gross equals net plus deductions: $780 + $220 = $1,000."
      },
      {
        id: "income-5-h4",
        question: "Of a $1,500 gross paycheck, only the Social Security portion of FICA is which amount at the standard 6.2% rate?",
        options: [
          "$21.75",
          "$93",
          "$114.75",
          "$150"
        ],
        correctAnswer: 1,
        explanation: "Social Security is 6.2% of gross, so 0.062 x $1,500 = $93 (Medicare's 1.45% is separate)."
      },
      {
        id: "income-5-h5",
        question: "Mia budgeted $600 of spending based on her $600 gross pay, but her deposit was $492. Why is her plan short, and by how much?",
        options: [
          "Her employer stole $108 illegally",
          "Deductions cut $108, so she should budget on the $492 net",
          "The bank charged a $108 fee she can recover",
          "She was overpaid by $108 last period"
        ],
        correctAnswer: 1,
        explanation: "Taxes and deductions took $600 - $492 = $108, so budgeting on gross overstated her real spendable net pay by $108."
      },
      {
        id: "income-5-h6",
        question: "A pay stub shows $2,000 gross with $306 total deductions. What percent of gross was taken out, and what is net pay?",
        options: [
          "About 15.3% out, $1,694 net",
          "About 30.6% out, $1,388 net",
          "About 7.65% out, $1,847 net",
          "About 20% out, $1,600 net"
        ],
        correctAnswer: 0,
        explanation: "Deductions of $306 are 306/2000 = 15.3% of gross, and net pay is $2,000 - $306 = $1,694."
      },
      {
        id: "income-5-h7",
        question: "Which list contains only items that are payroll deductions taken before you receive your pay?",
        options: [
          "Rent, groceries, and a phone bill",
          "Federal income tax, FICA, and state income tax",
          "A car payment, gas, and streaming services",
          "Credit card interest and a gym membership"
        ],
        correctAnswer: 1,
        explanation: "Federal income tax, FICA, and state income tax are withheld from gross pay; personal bills come out of net pay afterward."
      }
    ]
  },
  {
    lessonId: "income-5-remedial",
    questions: [
      {
        id: "income-5-r1",
        question: "What is gross pay?",
        options: [
          "Pay after deductions are taken out",
          "Total pay before any deductions",
          "Only your tips",
          "Money in your savings account"
        ],
        correctAnswer: 1,
        explanation: "Gross pay is your total earnings before anything is taken out."
      },
      {
        id: "income-5-r2",
        question: "What is net pay?",
        options: [
          "Pay before taxes",
          "The amount your boss reports as gross",
          "Take-home pay after deductions",
          "Money you owe the government"
        ],
        correctAnswer: 2,
        explanation: "Net pay is the take-home amount left after deductions are subtracted."
      },
      {
        id: "income-5-r3",
        question: "Gross pay is $200 and $30 is taken out. What is net pay?",
        options: [
          "$230",
          "$200",
          "$170",
          "$30"
        ],
        correctAnswer: 2,
        explanation: "Net pay is gross minus deductions: $200 - $30 = $170."
      },
      {
        id: "income-5-r4",
        question: "FICA taxes help pay for which programs?",
        options: [
          "Social Security and Medicare",
          "A fee for direct deposit",
          "A savings plan you choose",
          "A state parking fee"
        ],
        correctAnswer: 0,
        explanation: "FICA taxes fund Social Security and Medicare."
      },
      {
        id: "income-5-r5",
        question: "Which number is bigger on a pay stub?",
        options: [
          "Net pay is always bigger",
          "Gross pay is bigger than net pay",
          "They are always equal",
          "It depends on the day"
        ],
        correctAnswer: 1,
        explanation: "Gross pay is before deductions, so it is bigger than the net pay you take home."
      },
      {
        id: "income-5-r6",
        question: "Which is a common paycheck deduction?",
        options: [
          "Your grocery bill",
          "Federal income tax",
          "Your streaming subscription",
          "Your rent payment"
        ],
        correctAnswer: 1,
        explanation: "Federal income tax is withheld from your paycheck, while bills like rent come from net pay."
      },
      {
        id: "income-5-r7",
        question: "You should build your budget around which number?",
        options: [
          "Gross pay",
          "Net pay, the amount you actually take home",
          "Your yearly bonus",
          "The total taxes withheld"
        ],
        correctAnswer: 1,
        explanation: "Net pay is the money that actually reaches you, so budgets should be based on it."
      }
    ]
  }
]
