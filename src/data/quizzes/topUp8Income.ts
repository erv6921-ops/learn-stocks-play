import { QuizQuestion } from "@/types"
export const topUp8Income: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "income-1",
    questions: [
      {
        id: "income-1-tu1",
        question: "Which everyday example best fits the definition of active income?",
        options: [
          "Dividends landing in an account automatically each quarter",
          "Royalties from a song recorded years ago",
          "A paycheck from an after-school cashier shift",
          "Interest building up in a savings account"
        ],
        correctAnswer: 2,
        explanation: "Active income means trading your time and effort directly for pay, so the cashier shift qualifies while dividends, royalties, and interest arrive without ongoing work."
      },
      {
        id: "income-1-tu2",
        question: "A creator spends a weekend making an online course that then sells on its own for years. Why is this passive income?",
        options: [
          "Because upfront work keeps earning without new effort",
          "Because online courses are fully exempt from all taxes",
          "Because making a course requires zero effort",
          "Because it counts as a government benefit"
        ],
        correctAnswer: 0,
        explanation: "The work was done once but keeps paying out afterward, which is the essence of passive income - front-loaded effort followed by ongoing earnings."
      }
    ]
  },
  {
    lessonId: "income-2",
    questions: [
      {
        id: "income-2-tu1",
        question: "A salaried worker earns $52,000 per year paid weekly. About how much is each weekly paycheck before deductions?",
        options: [
          "About $2,000 before taxes and deductions",
          "About $1,000 before taxes and deductions",
          "About $520 before taxes and deductions",
          "About $4,333 before taxes and deductions"
        ],
        correctAnswer: 1,
        explanation: "A salary is split evenly across 52 weeks, so $52,000 divided by 52 equals $1,000 per week before anything is withheld."
      },
      {
        id: "income-2-tu2",
        question: "A nonexempt hourly worker earning $18 an hour puts in 44 hours in one week. How is the pay figured under federal law?",
        options: [
          "All 44 hours are paid at the same $18 rate",
          "The 4 extra hours are unpaid entirely because they are overtime",
          "The first 40 hours pay $18 and 4 hours pay time-and-a-half",
          "The whole week pays double because it went over 40"
        ],
        correctAnswer: 2,
        explanation: "Federal law requires 1.5 times the regular rate only for hours beyond 40, so 40 hours pay $18 and the 4 extra hours pay $27 each."
      }
    ]
  },
  {
    lessonId: "income-3",
    questions: [
      {
        id: "income-3-tu1",
        question: "A worker earns a $300 base wage plus 8% commission and sells $2,500 in merchandise this week. What is the total pay?",
        options: [
          "$300 for the week",
          "$200 for the week",
          "$2,500 for the week",
          "$500 for the week"
        ],
        correctAnswer: 3,
        explanation: "Base plus commission adds the guaranteed wage to the sales cut: $300 base plus 8% of $2,500 ($200) equals $500."
      },
      {
        id: "income-3-tu2",
        question: "Why might an ambitious seller who is confident about hitting big numbers prefer pure commission over an hourly wage?",
        options: [
          "Commission always guarantees the exact same steady pay every single week",
          "Strong sales can push pay above a fixed hourly wage",
          "Commission sales jobs never involve any financial risk at all",
          "Hourly wages are strictly illegal for commissioned sales roles"
        ],
        correctAnswer: 1,
        explanation: "Because commission ties pay directly to sales, a high performer can out-earn a capped hourly wage, though slow weeks carry the risk of a small paycheck."
      }
    ]
  },
  {
    lessonId: "income-4",
    questions: [
      {
        id: "income-4-tu1",
        question: "A rideshare driver is treated as an independent contractor. What does that mean for employer benefits?",
        options: [
          "The platform provides full health insurance and a pension",
          "The driver gets paid vacation after six months",
          "The platform typically provides no benefits like insurance",
          "The driver automatically becomes a salaried employee"
        ],
        correctAnswer: 2,
        explanation: "Gig platforms classify workers as independent contractors, so they usually receive no employer benefits such as health insurance or paid time off."
      },
      {
        id: "income-4-tu2",
        question: "One month a delivery app earns a worker $900 and the next month only $300. What does this show about gig work?",
        options: [
          "Gig income is steady and easy to predict",
          "Gig income can swing, making budgeting harder",
          "Gig apps are required to guarantee minimum pay",
          "The worker must have broken a platform rule"
        ],
        correctAnswer: 1,
        explanation: "Gig income rises and falls with demand and has no guaranteed hours, so the big swing between months is exactly why gig workers must budget carefully."
      }
    ]
  },
  {
    lessonId: "income-5",
    questions: [
      {
        id: "income-5-tu1",
        question: "A pay stub lists $500 at the top and $415 as the amount deposited. Which figure is the net pay?",
        options: [
          "$415, the take-home amount after deductions",
          "$500, the amount before deductions",
          "$85, the total that was withheld",
          "Neither number represents net pay"
        ],
        correctAnswer: 0,
        explanation: "Net pay is the take-home amount left after deductions, which is the $415 deposited, while the $500 at the top is gross pay."
      },
      {
        id: "income-5-tu2",
        question: "A worker earns $800 in gross pay. Using the standard employee FICA rate, about how much goes to FICA?",
        options: [
          "About $200 for FICA",
          "About $4 for FICA",
          "About $61 for FICA",
          "About $400 for FICA"
        ],
        correctAnswer: 2,
        explanation: "The employee FICA rate is 7.65%, so 0.0765 times $800 is roughly $61 withheld for Social Security and Medicare."
      }
    ]
  },
  {
    lessonId: "income-6",
    questions: [
      {
        id: "income-6-tu1",
        question: "A student gets a raise that pushes part of her income into the next tax bracket. What happens to that new, higher rate?",
        options: [
          "It applies to every dollar she has ever earned",
          "It applies only to the income above the bracket threshold",
          "It cancels out all the taxes on her lower income",
          "It lowers the rate on her existing income"
        ],
        correctAnswer: 1,
        explanation: "Bracket rates are marginal, so the higher rate hits only the dollars above the threshold, which is why a raise always leaves more money after taxes."
      },
      {
        id: "income-6-tu2",
        question: "In January a worker needs the form showing last year's wages and tax withheld so she can file her return. Which form is it?",
        options: [
          "A standard deduction rebate voucher form",
          "A W-2 form from her employer",
          "A FICA payroll refund coupon slip",
          "An official progressive tax certificate"
        ],
        correctAnswer: 1,
        explanation: "Employers send a W-2 each January reporting yearly wages and the tax withheld, which the worker uses to file her tax return."
      }
    ]
  },
  {
    lessonId: "income-7",
    questions: [
      {
        id: "income-7-tu1",
        question: "A certificate program costs $6,000 and leads to a job paying $12,000 more per year. Roughly how long until it pays for itself?",
        options: [
          "About two years of the extra earnings",
          "About six months of the extra earnings",
          "About five years of the extra earnings",
          "It never pays for itself"
        ],
        correctAnswer: 1,
        explanation: "An extra $12,000 a year is about $6,000 every six months, which matches the program cost, so it pays for itself in roughly half a year."
      },
      {
        id: "income-7-tu2",
        question: "Two graduates compare offers. One starts at $45,000 with fast raises, the other at $50,000 that plateaus. Why look beyond year one?",
        options: [
          "First-year pay is always the absolute peak of any career",
          "Lifetime earnings turn out identical across nearly all careers",
          "Careers grow differently, so decades reveal the real difference",
          "First-year starting salaries simply cannot be researched anywhere"
        ],
        correctAnswer: 2,
        explanation: "Some careers start lower but grow faster, so comparing lifetime earnings rather than just first-year pay reveals the true financial difference between paths."
      }
    ]
  },
  {
    lessonId: "income-8",
    questions: [
      {
        id: "income-8-tu1",
        question: "A student wins a $15,000 scholarship toward a degree. Why does this improve the ROI of her education?",
        options: [
          "It lowers the cost side without adding debt",
          "It must be fully repaid later with added interest",
          "It actually raises the total tuition she owes",
          "It only ever counts for star college athletes"
        ],
        correctAnswer: 0,
        explanation: "Scholarships are money you never repay, so they shrink the investment side of the equation while the career payoff stays the same, boosting the return."
      },
      {
        id: "income-8-tu2",
        question: "Someone wants a strong income but prefers not to attend a four-year college. Which path can still build solid earning power?",
        options: [
          "Only a doctoral degree can raise income",
          "Buying lottery tickets with tuition savings",
          "Skipping all training and hoping for luck",
          "An apprenticeship or trade school certificate"
        ],
        correctAnswer: 3,
        explanation: "Trade school, apprenticeships, and certificate programs train workers like electricians and technicians who earn strong incomes, so college is one path but not the only one."
      }
    ]
  },
  {
    lessonId: "income-9",
    questions: [
      {
        id: "income-9-tu1",
        question: "A photographer also learns website building. Why does adding this second skill raise earning power?",
        options: [
          "It makes her existing photography skill completely worthless overnight",
          "It lets her offer clients photos plus a finished site",
          "It forces her to stop taking any photos at all",
          "It guarantees her a secure lifelong government office job"
        ],
        correctAnswer: 1,
        explanation: "Combining complementary skills lets her deliver a fuller package clients would otherwise need two people for, and that rarer combination commands higher pay."
      },
      {
        id: "income-9-tu2",
        question: "Two engineers have equal technical ability, but one can also explain projects clearly to clients and bosses. Why does that one often advance further?",
        options: [
          "Clear communication fully replaces the need for any technical skill",
          "Technical experts are officially banned from ever presenting anything",
          "Clear communication amplifies the value of the technical work",
          "Talking to clients is simply far easier than engineering"
        ],
        correctAnswer: 2,
        explanation: "Stacking communication on top of technical skill lets the work be understood and trusted by others, which multiplies its value and opens leadership opportunities."
      }
    ]
  },
  {
    lessonId: "income-10",
    questions: [
      {
        id: "income-10-tu1",
        question: "A candle maker sells candles for $15 each, spends $6 in materials per candle, and sells 40 in a month. What is the profit?",
        options: [
          "$600 in profit",
          "$240 in profit",
          "$360 in profit",
          "$840 in profit"
        ],
        correctAnswer: 2,
        explanation: "Revenue is 40 times $15 equals $600 and materials cost 40 times $6 equals $240, so profit is $600 minus $240, which is $360."
      },
      {
        id: "income-10-tu2",
        question: "A young owner uses her first profits to buy a better printer and more supplies instead of spending them. What is she doing?",
        options: [
          "Reinvesting profits to help the business grow",
          "Guaranteeing herself a fixed steady monthly wage",
          "Cleverly avoiding all the taxes on her earnings",
          "Returning all of the profits back to her customers"
        ],
        correctAnswer: 0,
        explanation: "Putting earnings back into equipment and inventory is reinvesting profits, which trades income today for the chance at bigger income later as the business grows."
      }
    ]
  }
]
