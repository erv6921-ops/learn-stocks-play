import type { LessonQuiz } from "../lessonQuizzes"

// Authored quiz pools — Financial Statements, Ratios, and Valuation.
export const statementsRatiosValuationQuizzes: LessonQuiz[] = [
  // FIN-STMT-1: Income Statement
  {
    lessonId: "fin-stmt-1",
    questions: [
      {
        id: "fin-stmt-1-q1",
        question: "What does an income statement primarily show?",
        options: [
          "A complete list of every asset the company owns",
          "Revenue and expenses over a period of time",
          "The cash sitting in company bank accounts",
          "The number of shares each investor holds"
        ],
        correctAnswer: 1,
        explanation: "The income statement reports what a company earned (revenue) and what it spent (expenses) during a period, ending with profit or loss. Assets and cash balances live on other statements."
      },
      {
        id: "fin-stmt-1-q2",
        question: "Which item appears at the very top of an income statement?",
        options: [
          "Net income earned after paying all taxes",
          "Operating expenses like rent and salaries",
          "Dividends the company paid out to its shareholders",
          "Total revenue from selling products and services"
        ],
        correctAnswer: 3,
        explanation: "Revenue is the starting point — that's why it's nicknamed the 'top line.' Expenses are subtracted from it as you move down, ending with net income at the bottom."
      },
      {
        id: "fin-stmt-1-q3",
        question: "A sneaker company earns $200,000 in revenue and has $150,000 in total expenses. What does its income statement show?",
        options: [
          "A profit of $50,000 for the period",
          "A loss of $50,000 for the period",
          "A profit of $350,000 for the period",
          "A profit of exactly $150,000 for that period"
        ],
        correctAnswer: 0,
        explanation: "Profit is revenue minus expenses: $200,000 − $150,000 = $50,000. Since revenue exceeds expenses, the company made money, not a loss."
      },
      {
        id: "fin-stmt-1-q4",
        question: "What time frame does an income statement usually cover?",
        options: [
          "A single moment, like one specific day",
          "The company's entire lifetime since it was founded",
          "A set period, like a quarter or year",
          "Only the days when sales actually happened"
        ],
        correctAnswer: 2,
        explanation: "An income statement covers a stretch of time, typically three months or a full year. A single-moment snapshot describes the balance sheet, not the income statement."
      },
      {
        id: "fin-stmt-1-q5",
        question: "Your lemonade stand sells $500 of lemonade over the summer and spends $300 on supplies. What would its income statement report?",
        options: [
          "Revenue of $300 and profit of $500",
          "Revenue of $500 and a $300 profit",
          "A total loss of $200 for the summer",
          "Revenue of $500 and a $200 profit"
        ],
        correctAnswer: 3,
        explanation: "Sales of $500 are the revenue, and $500 − $300 in costs leaves a $200 profit. You made money, so it's a profit rather than a loss."
      },
      {
        id: "fin-stmt-1-q6",
        question: "In what order do items flow down an income statement?",
        options: [
          "Revenue first, then expenses, then net income",
          "Net income first, then revenue, then expenses",
          "Expenses first, then net income, then revenue",
          "Assets listed first, then liabilities, then shareholder equity"
        ],
        correctAnswer: 0,
        explanation: "The statement starts with revenue at the top, subtracts expenses in stages, and finishes with net income at the bottom. Assets and liabilities belong on the balance sheet instead."
      },
      {
        id: "fin-stmt-1-q7",
        question: "Why do investors study a company's income statement?",
        options: [
          "To find out the names of individual employees",
          "To see how many shares trade hands daily",
          "To judge whether the company is profitable",
          "To check which bank holds the company's cash"
        ],
        correctAnswer: 2,
        explanation: "The income statement reveals whether a business actually makes money and how profits are trending over time. That's core information for deciding if a company is worth owning."
      },
      {
        id: "fin-stmt-1-q8",
        question: "A company's revenue grows 5% each year while its expenses grow 15% each year. What will likely happen to profit?",
        options: [
          "Profit will grow faster than revenue does",
          "Profit will shrink as costs catch up",
          "Profit will stay exactly the same amount",
          "Profit will double because revenue keeps steadily growing"
        ],
        correctAnswer: 1,
        explanation: "When expenses grow three times faster than revenue, the gap between them narrows every year, squeezing profit. Eventually costs could overtake revenue entirely and create losses."
      }
    ]
  },
  // FIN-STMT-2: Revenue vs Profit
  {
    lessonId: "fin-stmt-2",
    questions: [
      {
        id: "fin-stmt-2-q1",
        question: "What is revenue?",
        options: [
          "The money left over after paying every expense",
          "The total value of everything a company owns",
          "The total money earned from sales before costs",
          "The amount of cash borrowed from a bank"
        ],
        correctAnswer: 2,
        explanation: "Revenue is all the money coming in from selling products or services, before any costs are subtracted. What's left after expenses is profit — a different number."
      },
      {
        id: "fin-stmt-2-q2",
        question: "What is profit?",
        options: [
          "What remains after subtracting all expenses from revenue",
          "The total amount customers paid during the year",
          "The money a company raises by selling new shares",
          "The value of a company's buildings and equipment"
        ],
        correctAnswer: 0,
        explanation: "Profit is revenue minus every expense — it's what the company actually keeps. Total customer payments describe revenue, not profit."
      },
      {
        id: "fin-stmt-2-q3",
        question: "A company brings in $1,000,000 in revenue but spends $1,100,000 to operate. What is the result?",
        options: [
          "A profit of $100,000 for the year",
          "A profit of $1,000,000 for the year",
          "Breaking even with no profit or loss",
          "A loss of $100,000 for the year"
        ],
        correctAnswer: 3,
        explanation: "Spending $1,100,000 while earning $1,000,000 leaves the company $100,000 short — a loss. Big revenue means nothing if expenses are even bigger."
      },
      {
        id: "fin-stmt-2-q4",
        question: "Why doesn't revenue alone tell you if a company is doing well?",
        options: [
          "Revenue only counts cash sales, never credit card sales",
          "High revenue can still mean losses if costs are higher",
          "Revenue is a secret number companies never have to share",
          "Revenue only matters for companies selling physical products"
        ],
        correctAnswer: 1,
        explanation: "A company can sell millions of dollars of product and still lose money if it costs even more to operate. You need to see expenses too before judging health."
      },
      {
        id: "fin-stmt-2-q5",
        question: "Company A has $500,000 revenue and $50,000 profit. Company B has $200,000 revenue and $80,000 profit. Which statement is true?",
        options: [
          "Company B earns more actual profit dollars",
          "Company A earns more profit because revenue is higher",
          "Both companies keep the same amount of profit",
          "Company B is losing money despite its strong sales"
        ],
        correctAnswer: 0,
        explanation: "Company B keeps $80,000 versus Company A's $50,000, even though A sells more. Bigger sales don't automatically mean bigger profits."
      },
      {
        id: "fin-stmt-2-q6",
        question: "In finance slang, what do 'top line' and 'bottom line' refer to?",
        options: [
          "Stock price high and stock price low",
          "Total assets and then total company liabilities",
          "Revenue at the top and net income below",
          "The best product and the worst product"
        ],
        correctAnswer: 2,
        explanation: "Revenue sits on the first line of the income statement, so it's the 'top line,' while net income sits on the last line, the 'bottom line.' The nicknames come straight from the statement's layout."
      },
      {
        id: "fin-stmt-2-q7",
        question: "A sneaker shop sells 1,000 pairs at $100 each. What does the $100,000 represent?",
        options: [
          "The shop's profit after covering all costs",
          "The shop's revenue before any costs",
          "The shop's cash remaining in the register",
          "The shop's total expenses for the whole year"
        ],
        correctAnswer: 1,
        explanation: "1,000 pairs times $100 equals $100,000 of revenue — money from sales before subtracting anything. Profit will be smaller once the shop pays for inventory, rent, and staff."
      },
      {
        id: "fin-stmt-2-q8",
        question: "A company's revenue rises every year, but its profit keeps falling. What is the most likely explanation?",
        options: [
          "The company is secretly hiding extra profit somewhere",
          "Customers are refusing to pay their bills on time",
          "The stock market is undervaluing the entire company",
          "Expenses are growing even faster than sales"
        ],
        correctAnswer: 3,
        explanation: "If sales climb but profit shrinks, costs must be rising faster than revenue. This pattern warns investors to look closely at where the money is going."
      }
    ]
  },
  // FIN-STMT-3: COGS
  {
    lessonId: "fin-stmt-3",
    questions: [
      {
        id: "fin-stmt-3-q1",
        question: "What does COGS (cost of goods sold) measure?",
        options: [
          "The direct costs of making the products sold",
          "The salaries of every employee in the company",
          "The total advertising budget for the entire year",
          "The rent paid on the company's office buildings"
        ],
        correctAnswer: 0,
        explanation: "COGS covers costs directly tied to producing what was sold — materials, factory labor, and production supplies. Office rent, ads, and admin salaries are operating expenses instead."
      },
      {
        id: "fin-stmt-3-q2",
        question: "Which expense counts as COGS for a sneaker company?",
        options: [
          "The billboard advertising campaign downtown this summer",
          "The accounting software subscription for the office",
          "The rubber and leather used in each shoe",
          "The CEO's annual salary and travel budget"
        ],
        correctAnswer: 2,
        explanation: "Materials that physically go into each sneaker are direct production costs, so they belong in COGS. Ads, software, and executive pay support the business but don't build the product."
      },
      {
        id: "fin-stmt-3-q3",
        question: "Your lemonade stand spends $0.40 on lemons, sugar, and cups for each cup sold. If you sell 200 cups, what is your COGS?",
        options: [
          "$40 for the whole season of sales",
          "$80 for the whole season of sales",
          "$200 for the whole season of sales",
          "$400 for the whole season of sales"
        ],
        correctAnswer: 1,
        explanation: "200 cups times $0.40 per cup equals $80 in direct costs. That $80 is your cost of goods sold for the season."
      },
      {
        id: "fin-stmt-3-q4",
        question: "What do you get when you subtract COGS from revenue?",
        options: [
          "Net income, the company's final bottom line",
          "Free cash flow available to all shareholders",
          "Total shareholder equity on the balance sheet",
          "Gross profit, before other operating expenses"
        ],
        correctAnswer: 3,
        explanation: "Revenue minus COGS equals gross profit — the money left after covering direct production costs. Operating expenses and taxes still need to be subtracted to reach net income."
      },
      {
        id: "fin-stmt-3-q5",
        question: "A company has $50,000 in revenue and $30,000 in COGS. What is its gross profit?",
        options: [
          "$80,000 after adding both numbers together",
          "$30,000 because COGS equals gross profit",
          "$20,000 after subtracting COGS from revenue",
          "$50,000 because revenue equals gross profit"
        ],
        correctAnswer: 2,
        explanation: "Gross profit is revenue minus COGS: $50,000 − $30,000 = $20,000. That's the cash cushion left to cover rent, salaries, marketing, and taxes."
      },
      {
        id: "fin-stmt-3-q6",
        question: "Why does lowering COGS help a company, if prices stay the same?",
        options: [
          "It automatically raises the stock price every single quarter",
          "Each sale leaves more gross profit behind",
          "It lets the company skip paying taxes entirely",
          "It increases the total revenue from every customer"
        ],
        correctAnswer: 1,
        explanation: "If it costs less to make each product but the selling price stays the same, more money is kept from every sale. Cheaper production widens the profit on each unit."
      },
      {
        id: "fin-stmt-3-q7",
        question: "Which of these costs is NOT part of COGS?",
        options: [
          "Fabric used to sew each t-shirt sold",
          "Wages for workers assembling the products",
          "Packaging materials shipped with every single order",
          "Social media ads promoting the brand"
        ],
        correctAnswer: 3,
        explanation: "Advertising promotes the product but isn't part of physically making it, so it's an operating expense. Fabric, assembly labor, and packaging are all direct production costs."
      },
      {
        id: "fin-stmt-3-q8",
        question: "A sneaker sells for $100. Its COGS rises from $60 to $70 per pair. What happens to gross profit per pair?",
        options: [
          "It falls from $40 down to $30",
          "It rises from $30 up to $40",
          "It stays at $40 despite higher costs",
          "It falls from $60 all the way to $30"
        ],
        correctAnswer: 0,
        explanation: "Gross profit per pair is price minus COGS: $100 − $60 = $40 before, and $100 − $70 = $30 after. The $10 cost increase comes straight out of profit."
      }
    ]
  },
  // FIN-STMT-4: Gross Margin
  {
    lessonId: "fin-stmt-4",
    questions: [
      {
        id: "fin-stmt-4-q1",
        question: "How is gross margin calculated?",
        options: [
          "Total revenue divided by cost of goods sold",
          "Net income divided by total shareholder equity",
          "Cost of goods sold divided by net income",
          "Revenue minus COGS, divided by revenue"
        ],
        correctAnswer: 3,
        explanation: "Gross margin is (revenue − COGS) ÷ revenue, expressed as a percentage. It shows what share of each sales dollar survives after direct production costs."
      },
      {
        id: "fin-stmt-4-q2",
        question: "A company has $100 in revenue and $60 in COGS. What is its gross margin?",
        options: [
          "60% of the company's total revenue",
          "40% of the company's total revenue",
          "160% of the company's total revenue",
          "6% of the company's total revenue"
        ],
        correctAnswer: 1,
        explanation: "($100 − $60) ÷ $100 = $40 ÷ $100 = 40%. The company keeps 40 cents of every sales dollar after production costs."
      },
      {
        id: "fin-stmt-4-q3",
        question: "A sneaker brand earns $500,000 in revenue with $200,000 in COGS. What is its gross margin?",
        options: [
          "40%, keeping $200,000 of the revenue",
          "30%, keeping $150,000 of the revenue",
          "60%, keeping $300,000 of the revenue",
          "25%, keeping $125,000 of the revenue"
        ],
        correctAnswer: 2,
        explanation: "Gross profit is $500,000 − $200,000 = $300,000, and $300,000 ÷ $500,000 = 60%. The brand keeps 60 cents of every dollar it sells."
      },
      {
        id: "fin-stmt-4-q4",
        question: "What does a higher gross margin tell you about a company?",
        options: [
          "It keeps more of each sales dollar",
          "It pays higher taxes than its competitors do",
          "It sells more total products than anyone else",
          "It borrows less money from banks each year"
        ],
        correctAnswer: 0,
        explanation: "A higher gross margin means production costs eat up less of each sale, leaving more to cover other expenses and profit. It says nothing directly about taxes, volume, or debt."
      },
      {
        id: "fin-stmt-4-q5",
        question: "Gross margin is usually expressed as what?",
        options: [
          "A dollar amount listed on the balance sheet",
          "A percentage of the company's total revenue",
          "A count of the units sold each quarter",
          "A ratio of total debt to shareholder equity"
        ],
        correctAnswer: 1,
        explanation: "Gross margin is stated as a percentage of revenue, which makes it easy to compare companies of very different sizes. A dollar figure alone wouldn't allow that comparison."
      },
      {
        id: "fin-stmt-4-q6",
        question: "Company A has a 20% gross margin and Company B has a 50% gross margin. What does this comparison show?",
        options: [
          "Company A produces its goods far more cheaply",
          "Company A definitely earns more total profit dollars",
          "Company B must be charging illegally high prices",
          "Company B keeps more of each sales dollar"
        ],
        correctAnswer: 3,
        explanation: "B keeps 50 cents per revenue dollar after production costs, while A keeps only 20 cents. Total profit dollars depend on size, so the margin alone can't settle that."
      },
      {
        id: "fin-stmt-4-q7",
        question: "Why do software companies often have higher gross margins than grocery stores?",
        options: [
          "Copies of software cost almost nothing to produce",
          "Software companies never pay any salaries to workers",
          "Grocery stores are banned from raising their margins",
          "Software companies always sell far fewer total products"
        ],
        correctAnswer: 0,
        explanation: "Once software is built, each extra copy costs nearly zero, so almost every sales dollar becomes gross profit. Grocers must buy the physical food they resell, which keeps margins thin."
      },
      {
        id: "fin-stmt-4-q8",
        question: "Your lemonade sells for $2.00 per cup, and ingredients cost $0.50 per cup. What is your gross margin?",
        options: [
          "25%, keeping fifty cents per cup",
          "50%, keeping one dollar per cup",
          "75%, keeping $1.50 per cup",
          "60%, keeping $1.20 per cup"
        ],
        correctAnswer: 2,
        explanation: "($2.00 − $0.50) ÷ $2.00 = $1.50 ÷ $2.00 = 75%. Three-quarters of every cup's price stays with you after ingredient costs."
      }
    ]
  },
  // FIN-STMT-5: Operating Expenses
  {
    lessonId: "fin-stmt-5",
    questions: [
      {
        id: "fin-stmt-5-q1",
        question: "What are operating expenses?",
        options: [
          "The raw materials used in every product sold",
          "The everyday costs of running the business",
          "The taxes owed to the federal government yearly",
          "The dividends paid out to loyal shareholders quarterly"
        ],
        correctAnswer: 1,
        explanation: "Operating expenses are day-to-day running costs like rent, office salaries, and marketing that aren't tied to producing each unit. Raw materials belong in COGS instead."
      },
      {
        id: "fin-stmt-5-q2",
        question: "Which of these is an operating expense for a sneaker company?",
        options: [
          "Leather purchased to build each pair",
          "Rubber soles attached to every new shoe",
          "Shoelaces threaded into each finished pair",
          "Rent for the marketing team's office"
        ],
        correctAnswer: 3,
        explanation: "Office rent keeps the business running but isn't part of physically making shoes, so it's an operating expense. Leather, soles, and laces all go into the product, making them COGS."
      },
      {
        id: "fin-stmt-5-q3",
        question: "A company has $80,000 in gross profit and $50,000 in operating expenses. What is its operating income?",
        options: [
          "$30,000 left after covering operating costs",
          "$130,000 after adding the two together",
          "$50,000 because expenses become the income",
          "$80,000 because gross profit never changes"
        ],
        correctAnswer: 0,
        explanation: "Operating income is gross profit minus operating expenses: $80,000 − $50,000 = $30,000. That's the profit from running the core business, before interest and taxes."
      },
      {
        id: "fin-stmt-5-q4",
        question: "Which group of costs would all count as operating expenses?",
        options: [
          "Factory materials, production labor, and shipping supplies",
          "Bank loans, share buybacks, and dividend payments",
          "Office rent, marketing, and administrative salaries",
          "Lemons, sugar, and cups for each drink"
        ],
        correctAnswer: 2,
        explanation: "Rent, marketing, and admin salaries are classic day-to-day operating costs. Production materials belong in COGS, while loans and dividends are financing items, not expenses of operations."
      },
      {
        id: "fin-stmt-5-q5",
        question: "Sales at a bakery suddenly drop by half for a month. What typically happens to its operating expenses?",
        options: [
          "They drop by exactly half along with sales",
          "They disappear completely until sales come back",
          "They double automatically to attract new customers",
          "They mostly continue, since rent and salaries remain"
        ],
        correctAnswer: 3,
        explanation: "Costs like rent and staff salaries don't shrink just because sales slow down. That's what makes falling revenue dangerous — many operating expenses keep arriving anyway."
      },
      {
        id: "fin-stmt-5-q6",
        question: "A sneaker startup pays $2,000 rent, $6,000 in salaries, and $2,000 for ads each month. What are its monthly operating expenses?",
        options: [
          "$10,000 in total operating costs",
          "$8,000 because advertising never counts",
          "$6,000 because only salaries truly count",
          "$4,000 because salaries belong in COGS"
        ],
        correctAnswer: 0,
        explanation: "Rent, salaries, and advertising are all operating expenses: $2,000 + $6,000 + $2,000 = $10,000. Each one is a cost of running the business day-to-day."
      },
      {
        id: "fin-stmt-5-q7",
        question: "A company slashes its marketing budget to boost this quarter's profit. What is the possible downside?",
        options: [
          "Profit will automatically fall this same quarter",
          "The government will fine companies that cut ads",
          "Fewer new customers may hurt future sales",
          "COGS will immediately rise to replace the spending"
        ],
        correctAnswer: 2,
        explanation: "Cutting marketing lifts profit now but can starve the company of future customers and growth. Smart cost-cutting weighs today's savings against tomorrow's sales."
      },
      {
        id: "fin-stmt-5-q8",
        question: "On income statements, what does the common label 'SG&A' stand for?",
        options: [
          "Sales growth and annual assets combined",
          "Selling, general, and administrative expenses",
          "Stocks, gold, and alternative asset investments",
          "Standard goods and average inventory costs"
        ],
        correctAnswer: 1,
        explanation: "SG&A stands for selling, general, and administrative expenses — a major bucket of operating costs. It includes things like sales team pay, office costs, and management salaries."
      }
    ]
  },
  // FIN-STMT-6: Net Income
  {
    lessonId: "fin-stmt-6",
    questions: [
      {
        id: "fin-stmt-6-q1",
        question: "What is net income?",
        options: [
          "Total revenue before subtracting any business costs",
          "The cash a company holds in the bank",
          "Profit left after all expenses and taxes",
          "The value of products sitting in inventory"
        ],
        correctAnswer: 2,
        explanation: "Net income is revenue minus every expense — production costs, operating costs, interest, and taxes. It's the company's true profit for the period."
      },
      {
        id: "fin-stmt-6-q2",
        question: "Why is net income nicknamed 'the bottom line'?",
        options: [
          "It sits on the last line of the income statement",
          "It shows the lowest sales week of the year",
          "It measures the company's worst possible outcome ever",
          "It appears at the bottom of every stock chart"
        ],
        correctAnswer: 0,
        explanation: "After all the subtractions from revenue, net income is literally the final line of the income statement. The nickname stuck because everything above it leads to that number."
      },
      {
        id: "fin-stmt-6-q3",
        question: "A company has $100,000 revenue, $40,000 COGS, $30,000 operating expenses, and $6,000 in taxes. What is its net income?",
        options: [
          "$30,000 after skipping the tax bill",
          "$60,000 after subtracting only COGS",
          "$36,000 after ignoring operating expenses entirely",
          "$24,000 after subtracting every expense listed"
        ],
        correctAnswer: 3,
        explanation: "$100,000 − $40,000 − $30,000 = $30,000 before taxes, and $30,000 − $6,000 = $24,000 net income. Every cost, including taxes, comes out before the bottom line."
      },
      {
        id: "fin-stmt-6-q4",
        question: "What does it mean when a company's net income is negative?",
        options: [
          "The company forgot to report its revenue",
          "The company had a net loss that period",
          "The company's stock price must fall tomorrow",
          "The company paid too much in dividends"
        ],
        correctAnswer: 1,
        explanation: "Negative net income means total expenses exceeded revenue — a net loss for the period. It doesn't guarantee any specific stock move, though repeated losses worry investors."
      },
      {
        id: "fin-stmt-6-q5",
        question: "How does net income differ from gross profit?",
        options: [
          "Net income also subtracts operating costs and taxes",
          "Gross profit is always the smaller number reported",
          "Net income ignores the cost of goods sold",
          "Gross profit includes taxes but net income doesn't"
        ],
        correctAnswer: 0,
        explanation: "Gross profit only subtracts COGS from revenue, while net income goes further and removes operating expenses, interest, and taxes too. That's why net income is smaller."
      },
      {
        id: "fin-stmt-6-q6",
        question: "Your lemonade stand makes $400 in sales, spends $250 on all costs, and pays $30 in taxes. What is your net income?",
        options: [
          "$150 because taxes don't count here",
          "$370 after subtracting only the taxes",
          "$120 after subtracting costs and taxes",
          "$680 after adding everything up together"
        ],
        correctAnswer: 2,
        explanation: "$400 − $250 = $150 before taxes, and $150 − $30 = $120 net income. Net income always includes the tax bill."
      },
      {
        id: "fin-stmt-6-q7",
        question: "What can a company do with its net income?",
        options: [
          "Only donate it to charity by law",
          "Reinvest in growth or pay shareholder dividends",
          "Only use it to pay executive bonuses",
          "Return it directly to customers as refunds"
        ],
        correctAnswer: 1,
        explanation: "Profits can be reinvested in the business, used to pay down debt, or distributed to shareholders as dividends or buybacks. Companies choose the mix; no law forces one use."
      },
      {
        id: "fin-stmt-6-q8",
        question: "A company sells an old warehouse and reports a huge one-time jump in net income. How should an investor read this?",
        options: [
          "The company's products suddenly became far more popular",
          "The company will repeat this gain every year",
          "Net income no longer matters for this company",
          "The boost is temporary, not core business strength"
        ],
        correctAnswer: 3,
        explanation: "One-time events like selling a building inflate net income without saying anything about the everyday business. Smart investors separate unusual gains from repeatable profits."
      }
    ]
  },
  // FIN-STMT-8: Assets vs Liabilities
  {
    lessonId: "fin-stmt-8",
    questions: [
      {
        id: "fin-stmt-8-q1",
        question: "What is an asset?",
        options: [
          "Something valuable the company owns or controls",
          "Money the company owes to outside lenders",
          "A monthly bill the company must always pay",
          "The salary owed to employees next payday"
        ],
        correctAnswer: 0,
        explanation: "Assets are valuable things a company owns or controls — cash, inventory, equipment, buildings. Money owed to others is a liability, the opposite side of the balance sheet."
      },
      {
        id: "fin-stmt-8-q2",
        question: "What is a liability?",
        options: [
          "Any equipment the company uses to make products",
          "Cash the company keeps in its bank account",
          "Money or obligations the company owes others",
          "The profit earned during the latest quarter"
        ],
        correctAnswer: 2,
        explanation: "Liabilities are debts and obligations owed to others, like loans, unpaid bills, and taxes due. Equipment and cash are assets, and profit belongs on the income statement."
      },
      {
        id: "fin-stmt-8-q3",
        question: "A company has $500,000 in assets and $300,000 in liabilities. What is its shareholder equity?",
        options: [
          "$800,000 from adding the two figures together",
          "$200,000, the assets left after covering debts",
          "$300,000 because liabilities always equal equity",
          "$500,000 because equity always equals total assets"
        ],
        correctAnswer: 1,
        explanation: "Equity equals assets minus liabilities: $500,000 − $300,000 = $200,000. It's what would belong to owners if all debts were paid off."
      },
      {
        id: "fin-stmt-8-q4",
        question: "Which of these is a liability for a skateboard shop?",
        options: [
          "The display cases holding boards in the store",
          "The cash register full of the day's sales",
          "The delivery van the shop fully owns",
          "The $10,000 bank loan for new inventory"
        ],
        correctAnswer: 3,
        explanation: "The bank loan is money the shop owes, making it a liability. Display cases, cash, and an owned van are all assets the shop controls."
      },
      {
        id: "fin-stmt-8-q5",
        question: "You buy a $800 delivery bike for your snack business using a $600 loan and $200 of savings. Which statement is accurate?",
        options: [
          "The loan is an asset and the bike a liability",
          "Both the bike and loan count as your assets",
          "The bike is an asset and the loan a liability",
          "Both the bike and the loan count as liabilities"
        ],
        correctAnswer: 2,
        explanation: "The bike is something valuable you own, so it's an asset; the $600 you must repay is a liability. Your equity in the bike is the $200 difference you put in yourself."
      },
      {
        id: "fin-stmt-8-q6",
        question: "The balance sheet, which lists assets and liabilities, shows information for what time frame?",
        options: [
          "The company's activity across a full year",
          "A single moment, like a financial snapshot",
          "The change in sales from quarter to quarter",
          "A forecast of the company's next five years"
        ],
        correctAnswer: 1,
        explanation: "A balance sheet captures what a company owns and owes on one specific date, like a photo. Activity over a period is what income and cash flow statements cover."
      },
      {
        id: "fin-stmt-8-q7",
        question: "A company's liabilities grow larger than its total assets. Why is this a warning sign?",
        options: [
          "It means revenue must have doubled too quickly",
          "It proves the company paid too many dividends",
          "It shows the company owns too much equipment",
          "It owes more than everything it owns"
        ],
        correctAnswer: 3,
        explanation: "When liabilities exceed assets, equity turns negative — even selling everything wouldn't cover the debts. That's a serious sign of financial distress."
      },
      {
        id: "fin-stmt-8-q8",
        question: "A company borrows $10,000 and uses it to buy $10,000 of equipment. What happens to its equity?",
        options: [
          "Equity stays the same as assets and liabilities both rise",
          "Equity rises by $10,000 from the new equipment",
          "Equity falls by $10,000 because of the loan",
          "Equity doubles because the company now owns more"
        ],
        correctAnswer: 0,
        explanation: "Assets rise $10,000 (equipment) and liabilities rise $10,000 (loan), so the difference — equity — is unchanged. Borrowing to buy something doesn't create owner value by itself."
      }
    ]
  },
  // FIN-STMT-9: Cash Flow
  {
    lessonId: "fin-stmt-9",
    questions: [
      {
        id: "fin-stmt-9-q1",
        question: "What does the cash flow statement track?",
        options: [
          "The company's stock price movement each day",
          "Every product the company sold this quarter",
          "The salaries promised to employees next year",
          "Actual cash moving in and out"
        ],
        correctAnswer: 3,
        explanation: "The cash flow statement follows real money entering and leaving the company during a period. It cuts through accounting estimates to show actual cash movement."
      },
      {
        id: "fin-stmt-9-q2",
        question: "What are the three sections of a cash flow statement?",
        options: [
          "Revenue, expenses, and net income sections",
          "Operating, investing, and financing activities",
          "Assets, liabilities, and shareholder equity sections",
          "Gross profit, margins, and tax payment sections"
        ],
        correctAnswer: 1,
        explanation: "Cash flows are grouped into operating (the core business), investing (buying or selling long-term assets), and financing (borrowing, repaying, and dealing with shareholders)."
      },
      {
        id: "fin-stmt-9-q3",
        question: "A design studio reports a $20,000 profit, but clients haven't paid their invoices yet. What is the studio's situation?",
        options: [
          "It has plenty of cash but zero profit",
          "It must refund clients who paid too early",
          "It shows profit on paper but little cash",
          "Its profit becomes illegal until clients pay"
        ],
        correctAnswer: 2,
        explanation: "Accounting rules let companies record revenue when work is delivered, even before cash arrives. So a business can look profitable while its bank account stays thin — a key reason to watch cash flow."
      },
      {
        id: "fin-stmt-9-q4",
        question: "A company takes in $80,000 of cash and pays out $60,000 during the quarter. What is its net cash flow?",
        options: [
          "Positive $20,000 for the quarter overall",
          "Negative $20,000 for the quarter overall",
          "Positive $140,000 for the quarter overall",
          "Exactly zero because the flows cancel out"
        ],
        correctAnswer: 0,
        explanation: "Net cash flow is cash in minus cash out: $80,000 − $60,000 = +$20,000. The company's cash pile grew during the quarter."
      },
      {
        id: "fin-stmt-9-q5",
        question: "Why do investors care about cash flow, not just profit?",
        options: [
          "Cash flow always equals profit in the end",
          "Bills must be paid with real cash",
          "Profit is never reported to the public",
          "Cash flow decides the company's tax rate"
        ],
        correctAnswer: 1,
        explanation: "A company can report accounting profits yet still run out of actual money to pay rent, staff, and suppliers. Cash is what keeps the doors open day to day."
      },
      {
        id: "fin-stmt-9-q6",
        question: "A pizza chain spends $50,000 on new ovens. Which cash flow section records this purchase?",
        options: [
          "Operating activities, since ovens cook the pizzas",
          "Financing activities, since ovens cost real money",
          "No section, since equipment is never recorded",
          "Investing activities, since ovens are long-term assets"
        ],
        correctAnswer: 3,
        explanation: "Purchases of long-term assets like ovens, buildings, and machines are investing activities. Operating covers daily business cash, and financing covers loans and shareholder transactions."
      },
      {
        id: "fin-stmt-9-q7",
        question: "A company borrows $1 million from a bank. Where does this cash appear?",
        options: [
          "In financing activities, as cash flowing in",
          "In operating activities, as regular sales revenue",
          "In investing activities, as a new asset purchase",
          "Nowhere, because loans never touch cash flow"
        ],
        correctAnswer: 0,
        explanation: "Borrowing money is a financing activity — cash comes in from lenders, not from selling products. Repaying that loan later also shows up in the financing section."
      },
      {
        id: "fin-stmt-9-q8",
        question: "A company's operating cash flow has been negative for three straight years. What does this suggest?",
        options: [
          "The company is simply saving its cash carefully",
          "The company must be growing faster than rivals",
          "The core business keeps burning through cash",
          "The accountants recorded the numbers upside down"
        ],
        correctAnswer: 2,
        explanation: "Consistently negative operating cash flow means daily operations spend more cash than they bring in. The company must keep borrowing or raising money to survive, which can't continue forever."
      }
    ]
  },
  // FIN-STMT-10: Free Cash Flow
  {
    lessonId: "fin-stmt-10",
    questions: [
      {
        id: "fin-stmt-10-q1",
        question: "How is free cash flow (FCF) calculated?",
        options: [
          "Total revenue minus the cost of goods sold",
          "Operating cash flow minus capital expenditures",
          "Net income plus all the dividends paid",
          "Total assets minus the company's total liabilities"
        ],
        correctAnswer: 1,
        explanation: "FCF equals operating cash flow minus capital expenditures (capex). It's the cash truly left over after running the business and reinvesting in equipment."
      },
      {
        id: "fin-stmt-10-q2",
        question: "A company generates $100,000 in operating cash flow and spends $30,000 on new equipment. What is its free cash flow?",
        options: [
          "$130,000 after combining the two amounts",
          "$30,000 because capex becomes free cash",
          "$100,000 because equipment spending never counts",
          "$70,000 after subtracting the equipment spending"
        ],
        correctAnswer: 3,
        explanation: "FCF is operating cash flow minus capex: $100,000 − $30,000 = $70,000. That's the cash left after keeping the business running and equipped."
      },
      {
        id: "fin-stmt-10-q3",
        question: "What can a company do with its free cash flow?",
        options: [
          "Pay dividends, buy back shares, or expand",
          "Only store it in a vault by law",
          "Only spend it on more factory equipment",
          "Return it to the government as extra taxes"
        ],
        correctAnswer: 0,
        explanation: "FCF is flexible money — it can fund dividends, share buybacks, debt repayment, acquisitions, or new growth projects. That flexibility is exactly why investors prize it."
      },
      {
        id: "fin-stmt-10-q4",
        question: "Why do many investors trust free cash flow more than net income?",
        options: [
          "FCF is always a much bigger number",
          "Net income is hidden from ordinary investors",
          "Real cash is harder to dress up",
          "FCF includes revenue that hasn't been earned"
        ],
        correctAnswer: 2,
        explanation: "Net income involves accounting estimates and assumptions, while FCF tracks actual cash generated after real spending. Cold, hard cash is much harder to make look better than it is."
      },
      {
        id: "fin-stmt-10-q5",
        question: "A company has $50,000 in operating cash flow but spends $60,000 on new machinery. What is its free cash flow?",
        options: [
          "Positive $10,000 for the year overall",
          "Positive $110,000 for the year overall",
          "Exactly zero since spending offsets cash flow",
          "Negative $10,000 for the year overall"
        ],
        correctAnswer: 3,
        explanation: "$50,000 − $60,000 = −$10,000, so FCF is negative. The company invested more cash in equipment than its operations produced that year."
      },
      {
        id: "fin-stmt-10-q6",
        question: "What does 'capex' (capital expenditure) mean?",
        options: [
          "Spending on long-term assets like buildings and machines",
          "The interest a company pays on its loans",
          "The salaries paid to top company executives",
          "The cost of shipping products to customers"
        ],
        correctAnswer: 0,
        explanation: "Capex is money spent on long-lasting physical assets — factories, machinery, vehicles, warehouses. It's subtracted from operating cash flow to calculate free cash flow."
      },
      {
        id: "fin-stmt-10-q7",
        question: "A fast-growing delivery startup has negative free cash flow because it keeps buying vans and warehouses. How should investors view this?",
        options: [
          "The startup is definitely about to go bankrupt",
          "The founders are wasting money on unnecessary purchases",
          "Heavy investment in growth can explain it",
          "Negative FCF proves the business model failed"
        ],
        correctAnswer: 2,
        explanation: "Negative FCF isn't automatically bad — a young company may be pouring cash into assets that power future growth. The key question is whether those investments will pay off later."
      },
      {
        id: "fin-stmt-10-q8",
        question: "A sneaker maker produces $200,000 of operating cash flow and spends $80,000 on new stitching machines. What is its free cash flow?",
        options: [
          "$280,000 after adding both cash amounts",
          "$120,000 after subtracting the machine purchases",
          "$80,000 because machines create free cash",
          "$200,000 because machines don't affect FCF"
        ],
        correctAnswer: 1,
        explanation: "FCF equals $200,000 − $80,000 = $120,000. After reinvesting in machines, that's the cash available for dividends, debt payments, or expansion."
      }
    ]
  },
]
