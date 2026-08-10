// Teaching-aligned top-up questions extending 8-question pools to 10.
import { QuizQuestion } from "@/types"

export const topUp8StmtComp: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "fin-stmt-1",
    questions: [
      {
        id: "fin-stmt-1-tu1",
        question: "A bakery earns $120,000 in revenue and spends $120,000 in total expenses over the year. What does its income statement show?",
        options: [
          "A profit of $120,000 for the year",
          "Breaking even, with no profit or loss",
          "A loss of $120,000 for the year",
          "A profit of $240,000 for the year"
        ],
        correctAnswer: 1,
        explanation: "Profit is revenue minus expenses: $120,000 - $120,000 = $0, so the bakery broke even, making neither a profit nor a loss."
      },
      {
        id: "fin-stmt-1-tu2",
        question: "Net income sits at the bottom of the income statement. What is it commonly nicknamed?",
        options: [
          "The bottom line",
          "The top line",
          "The balance line",
          "The cash line"
        ],
        correctAnswer: 0,
        explanation: "Because net income is the final figure after all expenses are subtracted from revenue, it sits on the last line and is nicknamed the bottom line."
      }
    ]
  },
  {
    lessonId: "fin-stmt-2",
    questions: [
      {
        id: "fin-stmt-2-tu1",
        question: "A juice bar takes in $300,000 in revenue and spends $220,000 to operate. What is its profit?",
        options: [
          "$520,000 for the year",
          "$300,000 for the year",
          "$80,000 for the year",
          "A loss of $80,000 for the year"
        ],
        correctAnswer: 2,
        explanation: "Profit is revenue minus expenses: $300,000 - $220,000 = $80,000, the money the juice bar actually keeps."
      },
      {
        id: "fin-stmt-2-tu2",
        question: "A store sells 500 jackets at $80 each. What does the $40,000 represent?",
        options: [
          "The store's profit after all costs",
          "The store's revenue before any costs",
          "The store's cash left in the register",
          "The store's total expenses for the year"
        ],
        correctAnswer: 1,
        explanation: "500 jackets times $80 equals $40,000 of revenue - money from sales before subtracting any costs, so profit will be smaller."
      }
    ]
  },
  {
    lessonId: "fin-stmt-3",
    questions: [
      {
        id: "fin-stmt-3-tu1",
        question: "A furniture maker spends $25 on wood and $15 on assembly labor for each table sold. If it sells 400 tables, what is its COGS?",
        options: [
          "$10,000 for the run of tables",
          "$16,000 for the run of tables",
          "$6,000 for the run of tables",
          "$40,000 for the run of tables"
        ],
        correctAnswer: 1,
        explanation: "Direct cost per table is $25 + $15 = $40, and $40 times 400 tables equals $16,000 of cost of goods sold."
      },
      {
        id: "fin-stmt-3-tu2",
        question: "Which of these costs would count as COGS for a coffee roaster?",
        options: [
          "The billboard advertising the coffee brand",
          "The office manager's monthly salary",
          "The raw coffee beans roasted into each bag",
          "The subscription to accounting software"
        ],
        correctAnswer: 2,
        explanation: "The beans physically go into each bag sold, making them a direct production cost, while ads, admin salaries, and software are operating expenses."
      }
    ]
  },
  {
    lessonId: "fin-stmt-4",
    questions: [
      {
        id: "fin-stmt-4-tu1",
        question: "A backpack brand earns $400,000 in revenue with $100,000 in COGS. What is its gross margin?",
        options: [
          "25%, keeping $100,000 of the revenue",
          "50%, keeping $200,000 of the revenue",
          "75%, keeping $300,000 of the revenue",
          "40%, keeping $160,000 of the revenue"
        ],
        correctAnswer: 2,
        explanation: "Gross profit is $400,000 - $100,000 = $300,000, and $300,000 divided by $400,000 equals 75%."
      },
      {
        id: "fin-stmt-4-tu2",
        question: "Company X has a 30% gross margin and Company Y has a 65% gross margin. What does this comparison show?",
        options: [
          "Company Y keeps more of each sales dollar",
          "Company X sells more total products",
          "Company X definitely earns more total profit",
          "Company Y must be breaking pricing laws"
        ],
        correctAnswer: 0,
        explanation: "Y keeps 65 cents of every revenue dollar after production costs while X keeps only 30 cents; total profit dollars depend on size, which margin alone cannot reveal."
      }
    ]
  },
  {
    lessonId: "fin-stmt-5",
    questions: [
      {
        id: "fin-stmt-5-tu1",
        question: "A shop has $120,000 in gross profit and $70,000 in operating expenses. What is its operating income?",
        options: [
          "$190,000 after adding the two figures",
          "$70,000 because expenses become the income",
          "$50,000 left after covering operating costs",
          "$120,000 because gross profit never changes"
        ],
        correctAnswer: 2,
        explanation: "Operating income is gross profit minus operating expenses: $120,000 - $70,000 = $50,000, the profit from running the core business before interest and taxes."
      },
      {
        id: "fin-stmt-5-tu2",
        question: "Which of these is an operating expense rather than COGS for a candle company?",
        options: [
          "The wax poured into each candle",
          "The wicks placed in every candle",
          "The glass jars holding each candle",
          "The salary of the office bookkeeper"
        ],
        correctAnswer: 3,
        explanation: "The bookkeeper's salary keeps the business running but is not part of physically making candles, so it is an operating expense, while wax, wicks, and jars are COGS."
      }
    ]
  },
  {
    lessonId: "fin-stmt-6",
    questions: [
      {
        id: "fin-stmt-6-tu1",
        question: "A company has $200,000 revenue, $80,000 COGS, $50,000 operating expenses, and $14,000 in taxes. What is its net income?",
        options: [
          "$120,000 after subtracting only COGS",
          "$70,000 before taxes are counted",
          "$56,000 after subtracting every expense listed",
          "$50,000 after ignoring taxes"
        ],
        correctAnswer: 2,
        explanation: "$200,000 - $80,000 - $50,000 = $70,000 before taxes, and $70,000 - $14,000 = $56,000 net income after every cost including taxes."
      },
      {
        id: "fin-stmt-6-tu2",
        question: "A company reports a positive gross profit but a negative net income. What most likely happened?",
        options: [
          "It had no sales at all during that year",
          "Operating costs, interest, or taxes exceeded gross profit",
          "Its revenue was accidentally recorded as exactly zero",
          "Gross profit is always a negative number by definition"
        ],
        correctAnswer: 1,
        explanation: "Gross profit only subtracts COGS, so if operating costs, interest, and taxes exceed it, the bottom line (net income) can still be a loss."
      }
    ]
  },
  {
    lessonId: "fin-stmt-8",
    questions: [
      {
        id: "fin-stmt-8-tu1",
        question: "A company has $700,000 in assets and $450,000 in liabilities. What is its shareholder equity?",
        options: [
          "$1,150,000 from adding the two figures",
          "$450,000 because liabilities equal equity",
          "$250,000, the assets left after covering debts",
          "$700,000 because equity equals total assets"
        ],
        correctAnswer: 2,
        explanation: "Equity equals assets minus liabilities: $700,000 - $450,000 = $250,000, what would belong to owners if all debts were paid off."
      },
      {
        id: "fin-stmt-8-tu2",
        question: "Which of these is an asset for a bike repair shop?",
        options: [
          "The $5,000 bank loan taken for tools",
          "The unpaid electricity bill due next week",
          "The set of tools the shop fully owns",
          "The wages owed to a mechanic on payday"
        ],
        correctAnswer: 2,
        explanation: "The owned tools are something valuable the shop controls, making them an asset, while the loan, the unpaid bill, and owed wages are all liabilities."
      }
    ]
  },
  {
    lessonId: "fin-stmt-9",
    questions: [
      {
        id: "fin-stmt-9-tu1",
        question: "A company takes in $150,000 of cash and pays out $170,000 during the quarter. What is its net cash flow?",
        options: [
          "Positive $20,000 for the quarter",
          "Negative $20,000 for the quarter",
          "Positive $320,000 for the quarter",
          "Exactly zero for the quarter"
        ],
        correctAnswer: 1,
        explanation: "Net cash flow is cash in minus cash out: $150,000 - $170,000 = -$20,000, so the company's cash pile shrank during the quarter."
      },
      {
        id: "fin-stmt-9-tu2",
        question: "A bakery buys a new delivery truck for $40,000. Which cash flow section records this purchase?",
        options: [
          "Operating activities, since the truck helps daily sales",
          "Financing activities, since the truck cost real money",
          "Investing activities, since the truck is a long-term asset",
          "No section, since vehicles are never recorded"
        ],
        correctAnswer: 2,
        explanation: "Purchases of long-term assets like trucks, buildings, and machines are investing activities, while operating covers daily business cash and financing covers loans and shareholders."
      }
    ]
  },
  {
    lessonId: "fin-stmt-10",
    questions: [
      {
        id: "fin-stmt-10-tu1",
        question: "A company generates $250,000 in operating cash flow and spends $90,000 on capital expenditures. What is its free cash flow?",
        options: [
          "$340,000 after combining the two amounts",
          "$90,000 because capex becomes free cash",
          "$160,000 after subtracting the capex",
          "$250,000 because capex never counts"
        ],
        correctAnswer: 2,
        explanation: "Free cash flow is operating cash flow minus capex: $250,000 - $90,000 = $160,000, the cash left after running and reinvesting in the business."
      },
      {
        id: "fin-stmt-10-tu2",
        question: "A company has $40,000 in operating cash flow but spends $55,000 on new equipment. What is its free cash flow?",
        options: [
          "Positive $15,000 for the year",
          "Positive $95,000 for the year",
          "Exactly zero for the year",
          "Negative $15,000 for the year"
        ],
        correctAnswer: 3,
        explanation: "$40,000 - $55,000 = -$15,000, so free cash flow is negative because the company invested more in equipment than its operations produced."
      }
    ]
  },
  {
    lessonId: "strategy-1",
    questions: [
      {
        id: "strategy-1-tu1",
        question: "Total headphone sales in a region are $400 million per year, and SoundCo sells $100 million. What is SoundCo's market share?",
        options: [
          "Twenty-five percent of the headphone market",
          "Forty percent of the headphone market",
          "Ten percent of the headphone market",
          "Fifty percent of the headphone market"
        ],
        correctAnswer: 0,
        explanation: "Market share equals the company's sales divided by total market sales: $100 million out of $400 million is 25%."
      },
      {
        id: "strategy-1-tu2",
        question: "A snack brand's sales rose 8% this year, but its market share fell. How is that possible?",
        options: [
          "Falling share always means sales dropped too",
          "The whole market grew faster than the brand did",
          "The brand must have miscounted its revenue",
          "Customers stopped buying snacks entirely"
        ],
        correctAnswer: 1,
        explanation: "If the overall snack market grew faster than 8%, rivals captured more of the new spending, so the brand grew while its slice of the pie still shrank."
      }
    ]
  },
  {
    lessonId: "strategy-2",
    questions: [
      {
        id: "strategy-2-tu1",
        question: "Which company most likely has the weakest pricing power?",
        options: [
          "A maker of the only patented drug for a rare illness",
          "A luxury brand customers line up to buy",
          "A wheat farmer selling grain identical to every rival's",
          "A phone maker with a fiercely loyal fan base"
        ],
        correctAnswer: 2,
        explanation: "Wheat is a commodity identical across sellers, so buyers just choose the cheapest and the farmer has almost no ability to raise prices without losing sales."
      },
      {
        id: "strategy-2-tu2",
        question: "A subscription app raises its price from $8 to $10 and keeps almost all of its subscribers. What does this show?",
        options: [
          "The app is breaking consumer protection laws",
          "The app has strong pricing power over its users",
          "The app will lose all subscribers next year",
          "Customers never notice price increases"
        ],
        correctAnswer: 1,
        explanation: "When demand barely drops after a price increase, the app clearly has pricing power because customers value it enough to keep paying more."
      }
    ]
  },
  {
    lessonId: "strategy-3",
    questions: [
      {
        id: "strategy-3-tu1",
        question: "A factory has $200,000 in fixed costs. If it makes 40,000 units this year, what is the fixed cost per unit?",
        options: [
          "Ten dollars of fixed cost per unit",
          "Five dollars of fixed cost per unit",
          "Two dollars of fixed cost per unit",
          "Twenty dollars of fixed cost per unit"
        ],
        correctAnswer: 1,
        explanation: "Fixed cost per unit is total fixed costs divided by units: $200,000 divided by 40,000 units equals $5 per unit."
      },
      {
        id: "strategy-3-tu2",
        question: "A national coffee chain pays far less per cup for supplies than a single corner cafe. Why?",
        options: [
          "Large chains are legally entitled to supplier discounts",
          "Suppliers randomly pick which buyers get low prices",
          "Its huge order sizes give it bargaining power over suppliers",
          "Small cafes prefer paying more to help suppliers"
        ],
        correctAnswer: 2,
        explanation: "Suppliers compete hard to win massive orders, so a chain buying in bulk negotiates prices a small cafe could never get, a classic economy of scale."
      }
    ]
  },
  {
    lessonId: "strategy-4",
    questions: [
      {
        id: "strategy-4-tu1",
        question: "Why is it hard for a brand-new social app with no users to attract its first members?",
        options: [
          "An empty network offers little value to early joiners",
          "App stores refuse to list brand-new apps",
          "New apps are too advanced for people to understand",
          "Too many users would overload its servers at once"
        ],
        correctAnswer: 0,
        explanation: "This is the cold start problem: with no one to follow or message, an app feels worthless no matter how good its features are, until enough users join."
      },
      {
        id: "strategy-4-tu2",
        question: "Why are network effects considered a strong competitive moat?",
        options: [
          "They legally block all competitors from launching apps",
          "Networked apps never need any future updates at all",
          "Rivals can copy features but not the user community",
          "Networks make paid advertising completely unnecessary forever"
        ],
        correctAnswer: 2,
        explanation: "A competitor can clone an app's design in months, but convincing millions of people to leave their friends and move to an empty network is far harder."
      }
    ]
  },
  {
    lessonId: "strategy-5",
    questions: [
      {
        id: "strategy-5-tu1",
        question: "Two water bottles are identical in quality, but shoppers pay $15 more for the one with a famous logo. What explains this?",
        options: [
          "The famous bottle secretly holds better water",
          "Stores are required to charge more for logo products",
          "The brand's reputation and image justify a premium price",
          "The cheaper bottle is illegal to use in public"
        ],
        correctAnswer: 2,
        explanation: "Since the bottles are identical, the extra $15 is pure brand value: customers pay for identity, status, and trust in the name."
      },
      {
        id: "strategy-5-tu2",
        question: "A drink company is caught lying about its ingredients. What is the likely effect on its brand?",
        options: [
          "The scandal makes the brand more valuable",
          "Trust erodes, and customers may switch to rivals",
          "Nothing changes because customers ignore the news",
          "The government assigns the company a new brand"
        ],
        correctAnswer: 1,
        explanation: "Brand value rests on trust, so a scandal can undo years of goodwill quickly, and burned customers often take their spending to brands they still believe in."
      }
    ]
  },
  {
    lessonId: "strategy-6",
    questions: [
      {
        id: "strategy-6-tu1",
        question: "Which of these is a durable economic moat rather than a fading advantage?",
        options: [
          "A trendy product color that rivals copy in months",
          "A holiday discount that ends in January",
          "A patent that blocks rivals from copying an invention",
          "A one-time viral video promoting a product"
        ],
        correctAnswer: 2,
        explanation: "A patent legally prevents competitors from copying the invention for years, giving durable protection, while trends, discounts, and viral moments fade fast."
      },
      {
        id: "strategy-6-tu2",
        question: "A gamer wants to leave her console's ecosystem but would lose purchased games, saved progress, and online friends. What moat is this?",
        options: [
          "Switching costs that make leaving expensive and painful",
          "Economies of scale from making consoles cheaply",
          "A patent portfolio protecting the console hardware",
          "A regulation preventing customers from changing brands"
        ],
        correctAnswer: 0,
        explanation: "When leaving a product means losing money, time, or data, customers tend to stay, and those switching costs are a powerful moat even when rivals offer strong alternatives."
      }
    ]
  },
]
