import type { LessonQuiz } from "../lessonQuizzes"

export const advancedTopicsQuizzes: LessonQuiz[] = [
  // BIZ-1: Revenue Models
  {
    lessonId: "biz-1",
    questions: [
      {
        id: "biz-1-q1",
        question: "What is a revenue model?",
        options: [
          "The way a business earns money from customers",
          "The list of employees a business hires each year",
          "The amount of taxes a business pays annually",
          "The location where a business sells its products"
        ],
        correctAnswer: 0,
        explanation: "A revenue model describes how a business turns its product or service into income — for example, through sales, subscriptions, ads, or commissions."
      },
      {
        id: "biz-1-q2",
        question: "A streaming app charges users $10 every month for access. Which revenue model is this?",
        options: [
          "An advertising model based on views",
          "A subscription model with recurring payments",
          "A one-time sale of a physical product",
          "A commission model on each transaction"
        ],
        correctAnswer: 1,
        explanation: "Charging a repeating monthly fee for ongoing access is the classic subscription model, like Netflix or Spotify Premium."
      },
      {
        id: "biz-1-q3",
        question: "How does a free social media app usually make money?",
        options: [
          "Charging users a fee for every post they make",
          "Borrowing money from banks to cover expenses",
          "Selling shares of stock to its youngest users",
          "Selling advertising space to companies targeting users"
        ],
        correctAnswer: 3,
        explanation: "Free apps typically earn revenue by showing ads — advertisers pay the app to reach its users, so the users' attention is really the product."
      },
      {
        id: "biz-1-q4",
        question: "A game is free to download, but players can pay for extra features. What is this model called?",
        options: [
          "A wholesale model for large buyers",
          "A donation model based on generosity",
          "A freemium model with paid upgrades",
          "A franchise model with locally licensed locations"
        ],
        correctAnswer: 2,
        explanation: "Freemium means the basic product is free while premium features cost money — a tiny share of paying users can fund the whole game."
      },
      {
        id: "biz-1-q5",
        question: "An app connects dog walkers with pet owners and keeps 20% of each $30 booking. How much does the app earn per booking?",
        options: [
          "Ten dollars from each completed booking",
          "Six dollars from each completed booking",
          "Three dollars from each completed booking",
          "Twenty dollars total from each completed booking"
        ],
        correctAnswer: 1,
        explanation: "This is a commission (marketplace) model: 20% of $30 is $6 per booking, and the dog walker keeps the remaining $24."
      },
      {
        id: "biz-1-q6",
        question: "Why do investors often prefer businesses with subscription revenue?",
        options: [
          "Recurring payments make future revenue more predictable",
          "Subscriptions are always more profitable than any sales",
          "Subscription businesses never lose any customers over time",
          "Subscription companies pay no taxes on recurring income"
        ],
        correctAnswer: 0,
        explanation: "Subscribers pay again and again, so investors can estimate future income with more confidence than with unpredictable one-time sales."
      },
      {
        id: "biz-1-q7",
        question: "A bakery sells cakes in-store, teaches baking classes, and licenses its recipes to a cafe chain. Why might this be smart?",
        options: [
          "It guarantees the bakery can never lose money again",
          "It lets the bakery avoid paying its suppliers",
          "Multiple revenue streams reduce reliance on one source",
          "It means the bakery no longer needs customers"
        ],
        correctAnswer: 2,
        explanation: "If cake sales slow down, income from classes and licensing can keep the business afloat — diversified revenue reduces risk."
      },
      {
        id: "biz-1-q8",
        question: "A company reports $1 million in revenue but still loses money this year. How is that possible?",
        options: [
          "Revenue that high always guarantees a positive profit",
          "The company must be secretly hiding extra cash",
          "Losing money is impossible once revenue passes $1 million",
          "Its costs were larger than its total revenue"
        ],
        correctAnswer: 3,
        explanation: "Revenue is money coming in, not profit. If the company spent $1.2 million to earn $1 million, it lost $200,000 despite strong sales."
      }
    ]
  },

  // BIZ-2: Cost Structure
  {
    lessonId: "biz-2",
    questions: [
      {
        id: "biz-2-q1",
        question: "What is a fixed cost?",
        options: [
          "A cost that rises with every unit sold",
          "A cost that only exists in profitable years",
          "A cost that stays the same regardless of output",
          "A cost that the government repairs for businesses"
        ],
        correctAnswer: 2,
        explanation: "Fixed costs like rent or insurance must be paid whether you sell 10 items or 10,000 — they don't change with production volume."
      },
      {
        id: "biz-2-q2",
        question: "Which of these is a variable cost for a smoothie stand?",
        options: [
          "The fruit and cups used for each smoothie",
          "The monthly rent paid for the stand's spot",
          "The one-time cost of buying the blender equipment",
          "The yearly business license fee from the city"
        ],
        correctAnswer: 0,
        explanation: "Variable costs rise and fall with sales — every extra smoothie requires more fruit and another cup, while rent and licenses stay constant."
      },
      {
        id: "biz-2-q3",
        question: "A t-shirt business pays $500 monthly rent and $2 per shirt in materials. What is the total cost of making 100 shirts in a month?",
        options: [
          "Exactly $500 in total costs",
          "Exactly $700 in total costs",
          "Exactly $200 in total costs",
          "Exactly $520 in total monthly costs"
        ],
        correctAnswer: 1,
        explanation: "Total cost = fixed + variable: $500 rent + ($2 × 100 shirts) = $500 + $200 = $700 for the month."
      },
      {
        id: "biz-2-q4",
        question: "Which cost below is fixed for a mobile car-wash business?",
        options: [
          "Soap used on each car washed",
          "Water consumed during every wash job",
          "Towels replaced after each customer visit",
          "Monthly insurance on the wash van"
        ],
        correctAnswer: 3,
        explanation: "Insurance is billed at the same amount each month no matter how many cars get washed; soap, water, and towels scale with the number of jobs."
      },
      {
        id: "biz-2-q5",
        question: "A factory's rent is $10,000 per month. If production doubles from 1,000 to 2,000 units, what happens to the rent cost per unit?",
        options: [
          "It falls from $10 to $5 per unit",
          "It doubles from $10 to $20 per unit",
          "It stays at exactly $10 per unit",
          "It disappears once production is high enough"
        ],
        correctAnswer: 0,
        explanation: "The $10,000 rent doesn't change, so spreading it over 2,000 units instead of 1,000 cuts the per-unit fixed cost in half."
      },
      {
        id: "biz-2-q6",
        question: "A student runs a sticker shop. Which expense grows directly with every order shipped?",
        options: [
          "The website's flat annual hosting fee",
          "The design software's fixed monthly subscription",
          "The printer purchased once last year",
          "The vinyl and envelopes per order"
        ],
        correctAnswer: 3,
        explanation: "Materials and packaging are variable costs — each additional order consumes more vinyl and another envelope, while hosting, software, and the printer cost the same regardless."
      },
      {
        id: "biz-2-q7",
        question: "Why does understanding cost structure matter to a business owner?",
        options: [
          "It lets the owner skip paying certain suppliers",
          "It shows how costs behave as sales change",
          "It guarantees the business will earn a profit",
          "It removes the need to track revenue anymore"
        ],
        correctAnswer: 1,
        explanation: "Knowing which costs are fixed and which are variable lets owners predict profit at different sales levels and price products correctly."
      },
      {
        id: "biz-2-q8",
        question: "Why is a business with very high fixed costs riskier during a sales slump?",
        options: [
          "Fixed costs automatically increase whenever sales drop",
          "High fixed costs mean variable costs also rise",
          "Those big bills come due even with few sales",
          "Banks require extra loan payments during slow sales months"
        ],
        correctAnswer: 2,
        explanation: "Rent, salaries, and equipment leases must be paid even when revenue dries up, so high-fixed-cost businesses burn cash fast in downturns."
      }
    ]
  },

  // BIZ-3: Break-Even
  {
    lessonId: "biz-3",
    questions: [
      {
        id: "biz-3-q1",
        question: "What does 'break-even point' mean for a business?",
        options: [
          "The moment a business runs completely out of cash",
          "The point where total revenue equals total costs",
          "The day a business pays off all its loans",
          "The point where a business doubles its starting money"
        ],
        correctAnswer: 1,
        explanation: "At break-even, the business isn't losing money or making money — revenue exactly covers all fixed and variable costs."
      },
      {
        id: "biz-3-q2",
        question: "Which formula gives the break-even point in units?",
        options: [
          "Total revenue divided by total costs overall",
          "Fixed costs multiplied by the sale price",
          "Variable cost per unit divided by fixed costs",
          "Fixed costs divided by price minus variable cost"
        ],
        correctAnswer: 3,
        explanation: "Break-even units = fixed costs ÷ (price − variable cost per unit), because each sale contributes that margin toward covering fixed costs."
      },
      {
        id: "biz-3-q3",
        question: "A candle business has $2,000 in fixed costs. Each candle sells for $10 and costs $6 to make. How many candles to break even?",
        options: [
          "It must sell 500 candles",
          "It must sell 200 candles",
          "It must sell 334 candles",
          "It must sell exactly 125 candles"
        ],
        correctAnswer: 0,
        explanation: "Each candle contributes $10 − $6 = $4 toward fixed costs, so $2,000 ÷ $4 = 500 candles to break even."
      },
      {
        id: "biz-3-q4",
        question: "A lemonade stand has $600 in fixed costs, sells cups for $8, and each cup costs $5 to make. What is the break-even point?",
        options: [
          "Exactly 75 cups sold",
          "Exactly 120 cups sold",
          "Exactly 200 cups sold",
          "Exactly 300 total cups sold"
        ],
        correctAnswer: 2,
        explanation: "Contribution per cup is $8 − $5 = $3, and $600 ÷ $3 = 200 cups needed to cover all costs."
      },
      {
        id: "biz-3-q5",
        question: "After a business passes its break-even point, what happens with each additional unit sold?",
        options: [
          "Fixed costs start increasing with every sale",
          "Revenue and costs both reset to zero",
          "The business must recalculate break-even from scratch",
          "Each sale adds its contribution margin as profit"
        ],
        correctAnswer: 3,
        explanation: "Once fixed costs are covered, every extra unit's price minus variable cost flows straight to profit — that's why volume past break-even is so valuable."
      },
      {
        id: "biz-3-q6",
        question: "If a business raises its selling price while costs stay the same, what happens to its break-even point?",
        options: [
          "It rises because customers expect more value",
          "It falls because each sale covers more costs",
          "It stays the same since costs never changed",
          "It doubles because price and break-even move together"
        ],
        correctAnswer: 1,
        explanation: "A higher price increases the contribution margin per unit, so fewer sales are needed to cover the same fixed costs."
      },
      {
        id: "biz-3-q7",
        question: "Why should someone calculate break-even before launching a small business?",
        options: [
          "Because banks legally require break-even math first",
          "Because break-even guarantees the business will succeed",
          "It shows whether the needed sales are realistic",
          "It eliminates all fixed costs before opening day"
        ],
        correctAnswer: 2,
        explanation: "If break-even requires selling 500 candles a month but the local market only supports 100, that's a warning to rethink prices or costs before investing."
      },
      {
        id: "biz-3-q8",
        question: "What is 'contribution margin' in break-even analysis?",
        options: [
          "Selling price minus the variable cost per unit",
          "Total fixed costs divided by units sold",
          "The donation a business makes to charity",
          "Total revenue minus all taxes paid yearly"
        ],
        correctAnswer: 0,
        explanation: "Contribution margin is what each sale 'contributes' toward fixed costs — for a $10 candle costing $6 to make, it's $4."
      }
    ]
  },

  // BIZ-4: Margins
  {
    lessonId: "biz-4",
    questions: [
      {
        id: "biz-4-q1",
        question: "What does 'profit margin' measure?",
        options: [
          "The total dollars a company earned this year",
          "The number of products a company sold",
          "How fast a company's revenue is growing",
          "The percentage of revenue kept as profit"
        ],
        correctAnswer: 3,
        explanation: "Margin expresses profit as a percentage of revenue, showing how much of each sales dollar the company actually keeps."
      },
      {
        id: "biz-4-q2",
        question: "A shop earns $200 in revenue and has $150 in total costs. What is its profit margin?",
        options: [
          "A margin of 75 percent",
          "A margin of 50 percent",
          "A margin of 25 percent",
          "A margin of exactly 15 percent"
        ],
        correctAnswer: 2,
        explanation: "Profit is $200 − $150 = $50, and $50 ÷ $200 = 25% — the shop keeps a quarter of every revenue dollar."
      },
      {
        id: "biz-4-q3",
        question: "A hoodie sells for $100 and costs $60 in materials and labor to produce. What is the gross margin?",
        options: [
          "A gross margin of 40 percent",
          "A gross margin of 60 percent",
          "A gross margin of 6 percent",
          "A gross margin of exactly 160 percent"
        ],
        correctAnswer: 0,
        explanation: "Gross profit is $100 − $60 = $40, so gross margin is $40 ÷ $100 = 40% of the selling price."
      },
      {
        id: "biz-4-q4",
        question: "What is the key difference between gross margin and net margin?",
        options: [
          "Gross margin is always smaller than net margin",
          "Net margin subtracts all expenses, not just production costs",
          "Net margin only counts a company's cash sales",
          "Gross margin includes taxes while net margin excludes them"
        ],
        correctAnswer: 1,
        explanation: "Gross margin subtracts only the direct cost of making products; net margin also subtracts rent, salaries, marketing, interest, and taxes."
      },
      {
        id: "biz-4-q5",
        question: "A company has $300 million in revenue and $15 million in net income. What is its net margin?",
        options: [
          "A net margin of 20 percent",
          "A net margin of 15 percent",
          "A net margin of 5 percent",
          "A net margin of exactly 50 percent"
        ],
        correctAnswer: 2,
        explanation: "$15 million ÷ $300 million = 0.05, or a 5% net margin — the company keeps five cents of each revenue dollar."
      },
      {
        id: "biz-4-q6",
        question: "Why do investors compare margins between companies in the same industry?",
        options: [
          "Higher margins can signal efficiency or pricing power",
          "Margins reveal exactly which company pays higher salaries",
          "Companies with equal margins always perform identically forever",
          "Margins show which company has the most employees"
        ],
        correctAnswer: 0,
        explanation: "If two retailers sell similar goods but one keeps 12% and the other 4%, the first likely runs leaner or commands better prices."
      },
      {
        id: "biz-4-q7",
        question: "A grocery chain has a 2% net margin while a software company has 30%. Why can the grocery chain still be a solid business?",
        options: [
          "Grocery stores never have to pay any rent",
          "Low margins mean the chain pays no taxes",
          "A 2% margin is secretly better than 30%",
          "Huge sales volume can offset a thin margin"
        ],
        correctAnswer: 3,
        explanation: "Groceries earn a tiny slice of enormous, steady revenue — 2% of billions in sales is still a lot of profit."
      },
      {
        id: "biz-4-q8",
        question: "Which action would most directly improve a company's profit margin?",
        options: [
          "Hiring more workers at the same sales level",
          "Cutting production costs while keeping prices steady",
          "Lowering prices while all costs stay unchanged",
          "Buying more inventory than customers currently demand"
        ],
        correctAnswer: 1,
        explanation: "If each product costs less to make but sells for the same price, more of each sales dollar becomes profit, lifting the margin."
      }
    ]
  },

  // BIZ-5: Funding
  {
    lessonId: "biz-5",
    questions: [
      {
        id: "biz-5-q1",
        question: "What does it mean to 'bootstrap' a startup?",
        options: [
          "Funding the business with your own money and revenue",
          "Borrowing the maximum possible amount from several banks",
          "Selling the entire company before it ever launches",
          "Hiring investors to run the company for you"
        ],
        correctAnswer: 0,
        explanation: "Bootstrapping means growing using personal savings and the business's own earnings, keeping full ownership but usually growing slower."
      },
      {
        id: "biz-5-q2",
        question: "Who is an 'angel investor'?",
        options: [
          "A government official who approves new business licenses",
          "A bank employee who reviews startup loan applications",
          "A wealthy individual who invests early for equity",
          "A charity worker who donates money to founders"
        ],
        correctAnswer: 2,
        explanation: "Angel investors are individuals who put their own money into very early startups, typically in exchange for a share of ownership."
      },
      {
        id: "biz-5-q3",
        question: "What do venture capital firms typically receive in exchange for funding a startup?",
        options: [
          "A fixed salary paid monthly by the founders",
          "Free products from the startup for ten years",
          "Guaranteed repayment of the money plus interest",
          "An ownership stake in the company itself"
        ],
        correctAnswer: 3,
        explanation: "VCs buy equity — they own part of the company and profit only if it grows in value, unlike lenders who are repaid with interest."
      },
      {
        id: "biz-5-q4",
        question: "A founder owns 100% of her startup, then sells 25% to investors for funding. What does she own now?",
        options: [
          "She still owns 100% of the company",
          "She now owns 75% of the company",
          "She now owns 25% of the company",
          "She owns nothing until investors are repaid"
        ],
        correctAnswer: 1,
        explanation: "Selling equity dilutes ownership: giving investors 25% leaves the founder with the remaining 75% of the company."
      },
      {
        id: "biz-5-q5",
        question: "An investor pays $50,000 for a 20% stake in a startup. What value does that put on the whole company?",
        options: [
          "The company is valued at $50,000",
          "The company is valued at $100,000",
          "The company is valued at $1 million",
          "The company is valued at $250,000"
        ],
        correctAnswer: 3,
        explanation: "If 20% costs $50,000, then 100% is worth five times that: $50,000 × 5 = $250,000."
      },
      {
        id: "biz-5-q6",
        question: "What is the key difference between funding with debt and funding with equity?",
        options: [
          "Debt gives the lender ownership of the company",
          "Debt must be repaid; equity trades ownership instead",
          "Equity must be repaid monthly with added interest",
          "Equity is only available from banks and governments"
        ],
        correctAnswer: 1,
        explanation: "A loan is repaid with interest no matter what, while equity investors get ownership and only profit if the company succeeds."
      },
      {
        id: "biz-5-q7",
        question: "A student raises $5,000 for a card game by pre-selling copies online to hundreds of supporters. What is this called?",
        options: [
          "Crowdfunding from many small backers",
          "A venture capital seed round",
          "An initial public stock offering",
          "A traditional bank business loan"
        ],
        correctAnswer: 0,
        explanation: "Crowdfunding raises small amounts from many people, often in exchange for the product itself rather than ownership or interest."
      },
      {
        id: "biz-5-q8",
        question: "Why do venture capital firms invest in many startups knowing most will fail?",
        options: [
          "They enjoy losing money on risky experiments",
          "Government programs refund them for every failed startup",
          "A few huge winners can outweigh many losses",
          "Failed startups must repay VCs everything with interest"
        ],
        correctAnswer: 2,
        explanation: "VC follows a portfolio strategy: one startup returning 50x can more than cover nine failures, so they spread bets across many companies."
      }
    ]
  },

  // BIZ-6: Pricing
  {
    lessonId: "biz-6",
    questions: [
      {
        id: "biz-6-q1",
        question: "What is 'cost-plus' pricing?",
        options: [
          "Charging whatever the closest competitor charges customers",
          "Adding a markup percentage on top of costs",
          "Letting customers choose any price they want",
          "Raising prices only after costs go down"
        ],
        correctAnswer: 1,
        explanation: "Cost-plus pricing starts with the cost to produce an item, then adds a set markup to guarantee a margin on every sale."
      },
      {
        id: "biz-6-q2",
        question: "A bracelet costs $8 to make and the seller adds a 50% markup. What is the selling price?",
        options: [
          "A price of twelve dollars",
          "A price of sixteen dollars",
          "A price of ten dollars",
          "A price of four total dollars"
        ],
        correctAnswer: 0,
        explanation: "A 50% markup on $8 adds $4, so the bracelet sells for $8 + $4 = $12."
      },
      {
        id: "biz-6-q3",
        question: "What is 'price skimming'?",
        options: [
          "Selling products below cost to remove competitors",
          "Copying whatever price the market leader sets",
          "Launching at a high price, then lowering it",
          "Rounding all prices down to the nearest dollar"
        ],
        correctAnswer: 2,
        explanation: "Skimming charges early enthusiasts a premium at launch — like new game consoles — then drops the price over time to reach more buyers."
      },
      {
        id: "biz-6-q4",
        question: "A new streaming service launches at a very low price to attract users quickly, planning to raise prices later. What is this strategy?",
        options: [
          "Price skimming aimed at wealthy early adopters",
          "Cost-plus pricing with a standard fixed markup",
          "Luxury pricing designed to signal high status",
          "Penetration pricing to win market share fast"
        ],
        correctAnswer: 3,
        explanation: "Penetration pricing sacrifices early profit to build a large user base quickly, betting those customers will stay when prices rise."
      },
      {
        id: "biz-6-q5",
        question: "What is 'value-based' pricing?",
        options: [
          "Pricing based on what the product is worth to customers",
          "Pricing based only on the exact production cost",
          "Pricing set by a government agency each year",
          "Pricing that changes randomly every single day"
        ],
        correctAnswer: 0,
        explanation: "Value-based pricing asks what the product is worth to the buyer — a tutoring app that raises grades can charge far more than its costs suggest."
      },
      {
        id: "biz-6-q6",
        question: "A student prices custom phone cases so low she barely covers materials. What is the likely long-term problem?",
        options: [
          "Customers will refuse to buy such cheap cases",
          "The government will fine her for underpricing products",
          "There's no money left for time, growth, or mistakes",
          "Low prices always attract lawsuits from bigger competitors"
        ],
        correctAnswer: 2,
        explanation: "Prices must cover more than materials — her labor, shipping errors, and reinvestment all need margin, or the business slowly exhausts her."
      },
      {
        id: "biz-6-q7",
        question: "A shop raises its price from $10 to $11 and its customers drop from 100 to 95 per week. What happened to weekly revenue?",
        options: [
          "It fell from $1,000 down to $950",
          "It stayed exactly the same at $1,000",
          "It fell because five customers were lost",
          "It rose from $1,000 up to $1,045"
        ],
        correctAnswer: 3,
        explanation: "New revenue is $11 × 95 = $1,045 versus the old $10 × 100 = $1,000 — the higher price more than offset the lost customers."
      },
      {
        id: "biz-6-q8",
        question: "Why should a business research competitor prices before setting its own?",
        options: [
          "Because copying competitors exactly is always the best strategy",
          "Customers compare options, so prices need a clear justification",
          "Because competitors are legally required to share pricing data",
          "Because charging more than any competitor is always impossible"
        ],
        correctAnswer: 1,
        explanation: "Customers shop around — you can charge more than rivals only if you offer clearly more value, so knowing the market anchors your price."
      }
    ]
  },

  // BIZ-7: Business Planning
  {
    lessonId: "biz-7",
    questions: [
      {
        id: "biz-7-q1",
        question: "What is a business plan?",
        options: [
          "A legal contract signed with every customer",
          "A government form required to pay business taxes",
          "A written roadmap for goals, strategy, and finances",
          "A daily to-do list for company employees"
        ],
        correctAnswer: 2,
        explanation: "A business plan lays out what the business will do, who it serves, how it will make money, and what resources it needs."
      },
      {
        id: "biz-7-q2",
        question: "What is the 'executive summary' in a business plan?",
        options: [
          "A list of every executive's salary and benefits",
          "The section describing office furniture and equipment",
          "A summary of laws that executives must follow",
          "A brief overview of the entire plan upfront"
        ],
        correctAnswer: 3,
        explanation: "The executive summary condenses the whole plan into a short pitch, since busy investors often read only that section first."
      },
      {
        id: "biz-7-q3",
        question: "Why does a business plan include market research?",
        options: [
          "To fill extra pages so the plan looks impressive",
          "To prove real customers exist for the product",
          "To list every stock the founder personally owns",
          "To satisfy a legal requirement for new businesses"
        ],
        correctAnswer: 1,
        explanation: "Market research shows who the customers are, how many exist, and what they'll pay — evidence the idea can actually generate sales."
      },
      {
        id: "biz-7-q4",
        question: "What do the financial projections in a business plan estimate?",
        options: [
          "Future revenue, costs, and profit over time",
          "The stock market's overall performance next year",
          "The founder's personal spending habits each month",
          "The exact taxes every competitor will pay"
        ],
        correctAnswer: 0,
        explanation: "Projections forecast expected sales, expenses, and profits — usually for one to three years — so founders and investors can judge viability."
      },
      {
        id: "biz-7-q5",
        question: "A student asks a bank for a $3,000 loan to start a lawn-care business. Why will the bank want to see a plan?",
        options: [
          "Banks collect business plans as a legal formality only",
          "The plan shows how the business will repay the loan",
          "Banks resell business plans to other interested entrepreneurs",
          "A plan lets the bank take ownership of the business"
        ],
        correctAnswer: 1,
        explanation: "Lenders care about repayment: a plan with realistic customer numbers and pricing shows the loan can be paid back from real revenue."
      },
      {
        id: "biz-7-q6",
        question: "What does 'target market' mean in a business plan?",
        options: [
          "Every person in the country who has money",
          "The store location with the cheapest available rent",
          "The list of competitors the business will copy",
          "The specific group of customers you serve"
        ],
        correctAnswer: 3,
        explanation: "A target market defines exactly who you're selling to — like 'high school gamers' — so marketing and product decisions stay focused."
      },
      {
        id: "biz-7-q7",
        question: "While writing her plan, a founder discovers projected costs exceed projected revenue. What should she do?",
        options: [
          "Revise the model before spending real money",
          "Launch anyway and hope the numbers improve",
          "Delete the financial section from the plan",
          "Double every revenue estimate to fix the math"
        ],
        correctAnswer: 0,
        explanation: "That's the plan doing its job — discovering the problem on paper lets her adjust prices, cut costs, or rethink the idea before losing real money."
      },
      {
        id: "biz-7-q8",
        question: "Why should a business plan be updated regularly instead of written once?",
        options: [
          "Because old plans expire legally after twelve months",
          "Because investors charge fees for reading outdated plans",
          "Real conditions change, so the roadmap must adapt",
          "Because longer plans always attract much more funding"
        ],
        correctAnswer: 2,
        explanation: "Markets, costs, and customers shift constantly; a plan is a living tool that should be revised as the business learns what actually works."
      }
    ]
  },

  // STRATEGY-1: Market Share
  {
    lessonId: "strategy-1",
    questions: [
      {
        id: "strategy-1-q1",
        question: "What is market share?",
        options: [
          "The number of shares a company sells to investors",
          "The amount of cash a company keeps in savings",
          "The percentage of an industry's total sales a company wins",
          "The price of one share of a company's stock today"
        ],
        correctAnswer: 2,
        explanation: "Market share measures what slice of an industry's total sales belongs to one company — if customers spend $100 on sneakers and $30 goes to one brand, that brand has 30% market share."
      },
      {
        id: "strategy-1-q2",
        question: "Total sneaker sales in a city are $200 million per year, and BrandX sells $50 million. What is BrandX's market share?",
        options: [
          "Twenty-five percent of the sneaker market",
          "Fifty percent of the city's sneaker market",
          "Ten percent of the city's sneaker market",
          "Four percent of the city's sneaker market"
        ],
        correctAnswer: 0,
        explanation: "Market share equals the company's sales divided by total market sales: $50 million out of $200 million is 25%."
      },
      {
        id: "strategy-1-q3",
        question: "What is the most direct way for a company to grow its market share?",
        options: [
          "Raise executive salaries to attract better managers",
          "Move its headquarters to a much larger city",
          "Split its stock so more people can buy shares",
          "Win customers away from its competitors' products"
        ],
        correctAnswer: 3,
        explanation: "Market share is a competition for customers — a company gains share by convincing buyers to choose its product instead of a rival's."
      },
      {
        id: "strategy-1-q4",
        question: "A pizza shop cuts prices and steals customers from a rival, but its profit per pizza shrinks. What is the trade-off here?",
        options: [
          "Lower prices always increase both share and total profit",
          "It gained market share but sacrificed profit margin",
          "It lost market share while keeping its profits steady",
          "Cutting prices has no real effect on market share"
        ],
        correctAnswer: 1,
        explanation: "Price cuts can win customers and grow share, but each sale earns less — companies must decide whether the extra volume is worth the thinner margins."
      },
      {
        id: "strategy-1-q5",
        question: "Why do investors pay attention to whether a company's market share is rising or falling?",
        options: [
          "Share trends reveal if it is beating competitors",
          "Market share directly determines the company's tax rate",
          "Rising share guarantees the stock price will also rise",
          "Falling share means the company must legally shut down"
        ],
        correctAnswer: 0,
        explanation: "A rising share means the company is winning the competitive battle for customers, while a falling share can be an early warning sign even when sales still look fine."
      },
      {
        id: "strategy-1-q6",
        question: "A gaming company's sales grew 10% this year, but its market share fell. How is that possible?",
        options: [
          "Falling market share always means sales went down too",
          "The company must have miscounted its own revenue",
          "The whole market grew faster than the company did",
          "Its customers stopped buying video games entirely this year"
        ],
        correctAnswer: 2,
        explanation: "If the overall gaming market grew 25% while the company grew only 10%, rivals captured more of the new spending — the company grew, but its slice of the pie shrank."
      },
      {
        id: "strategy-1-q7",
        question: "What does it mean to be the 'market leader' in an industry?",
        options: [
          "Being the oldest company still operating in the industry",
          "Holding the largest market share of any competitor",
          "Charging the highest prices of any company around",
          "Employing more workers than every other rival combined"
        ],
        correctAnswer: 1,
        explanation: "The market leader is simply the company with the biggest share of the industry's sales, like the top-selling smartphone brand in a country."
      },
      {
        id: "strategy-1-q8",
        question: "A company controls 90% of its market. Why might that dominance create new problems?",
        options: [
          "Companies that large are required to lower their prices",
          "A 90% share means the company can no longer advertise",
          "Dominant companies must give profits back to customers",
          "Regulators may investigate it for unfair monopoly behavior"
        ],
        correctAnswer: 3,
        explanation: "Governments watch dominant companies closely because near-monopolies can harm consumers, so huge market share often attracts antitrust scrutiny and legal risk."
      }
    ]
  },

  // STRATEGY-2: Pricing Power
  {
    lessonId: "strategy-2",
    questions: [
      {
        id: "strategy-2-q1",
        question: "What is pricing power?",
        options: [
          "The legal right to set any price the government allows",
          "The ability to raise prices without losing many customers",
          "The power to force suppliers to accept lower payments",
          "The strategy of always charging less than every competitor"
        ],
        correctAnswer: 1,
        explanation: "A company has pricing power when it can charge more and customers keep buying anyway, usually because they love the product or have no good substitute."
      },
      {
        id: "strategy-2-q2",
        question: "A phone maker raises its flagship price by 10%, and fans line up to buy it anyway. What does this show?",
        options: [
          "The phone maker is violating consumer protection laws",
          "Customers no longer care about prices for any product",
          "The company will definitely lose those customers next year",
          "The company has strong pricing power over its buyers"
        ],
        correctAnswer: 3,
        explanation: "When demand barely drops after a price increase, the company clearly has pricing power — customers value the product enough to pay more."
      },
      {
        id: "strategy-2-q3",
        question: "Which of these most often gives a company pricing power?",
        options: [
          "A beloved brand or product with no close substitute",
          "A large number of identical competitors nearby",
          "A product that customers can easily replace anywhere",
          "A history of frequent discounts and constant coupon offers"
        ],
        correctAnswer: 0,
        explanation: "Pricing power comes from being hard to replace — a unique product or a brand customers insist on lets a company charge more without losing sales."
      },
      {
        id: "strategy-2-q4",
        question: "A gas station raises prices 15 cents, and drivers immediately switch to the station across the street. Why did this fail?",
        options: [
          "Drivers are legally required to buy the cheapest gas",
          "Gas stations are never allowed to change their prices",
          "Gasoline is identical everywhere, so it has weak pricing power",
          "The station raised prices during the wrong season entirely"
        ],
        correctAnswer: 2,
        explanation: "Gas is a commodity — one station's fuel is the same as another's — so customers simply buy wherever it's cheapest, leaving sellers with almost no pricing power."
      },
      {
        id: "strategy-2-q5",
        question: "Why do investors especially value pricing power during periods of high inflation?",
        options: [
          "It lets companies pass rising costs on to customers",
          "Pricing power exempts companies from paying higher wages",
          "Inflation only affects companies without famous brand names",
          "It allows companies to skip reporting their quarterly earnings"
        ],
        correctAnswer: 0,
        explanation: "When a company's own costs rise with inflation, pricing power lets it raise prices to protect profit margins instead of absorbing the squeeze."
      },
      {
        id: "strategy-2-q6",
        question: "A streaming service raises its price from $10 to $12 and keeps 98% of its subscribers. What happens to its revenue?",
        options: [
          "Revenue falls because any cancellation destroys total revenue",
          "Revenue stays exactly the same as it was before",
          "Revenue drops to zero because subscribers feel betrayed",
          "Revenue rises because the higher price outweighs small losses"
        ],
        correctAnswer: 3,
        explanation: "A 20% price increase with only 2% of subscribers leaving means much more money overall — for every 100 subscribers paying $10 ($1,000), it now has 98 paying $12 ($1,176)."
      },
      {
        id: "strategy-2-q7",
        question: "Which company most likely has the strongest pricing power?",
        options: [
          "A farm selling corn identical to every neighbor's corn",
          "A generic water bottler competing with dozens of brands",
          "A drug maker with the only patented treatment for a disease",
          "A t-shirt printer in a mall full of other t-shirt printers"
        ],
        correctAnswer: 2,
        explanation: "A patented, one-of-a-kind treatment has no substitute, so the maker can set prices with little fear of losing customers to competitors."
      },
      {
        id: "strategy-2-q8",
        question: "What is the long-term danger of a company raising prices too aggressively?",
        options: [
          "The stock exchange will delist the company's shares",
          "Customers may switch away and rivals may undercut it",
          "Raising prices is permanently banned after two increases",
          "Its employees will be forced to accept lower salaries"
        ],
        correctAnswer: 1,
        explanation: "Even loyal customers have limits — pushing prices too far invites competitors to offer cheaper alternatives and erodes the loyalty that created the pricing power."
      }
    ]
  },

  // STRATEGY-3: Economies of Scale
  {
    lessonId: "strategy-3",
    questions: [
      {
        id: "strategy-3-q1",
        question: "What does 'economies of scale' mean?",
        options: [
          "Weighing products on industrial scales before shipping them",
          "Charging bigger customers more money than smaller ones",
          "Hiring more employees every time revenue goes up",
          "Cost per unit falls as production volume grows"
        ],
        correctAnswer: 3,
        explanation: "Economies of scale means getting cheaper as you get bigger — producing more units spreads costs out, so each individual unit costs less to make."
      },
      {
        id: "strategy-3-q2",
        question: "A factory has $100,000 in fixed costs. If it makes 50,000 units this year, what is the fixed cost per unit?",
        options: [
          "Five dollars of fixed cost per unit",
          "Ten dollars of fixed cost per unit",
          "Two dollars of fixed cost per unit",
          "Twenty dollars of fixed cost per unit"
        ],
        correctAnswer: 2,
        explanation: "Fixed cost per unit is total fixed costs divided by units produced: $100,000 divided by 50,000 units equals $2 per unit."
      },
      {
        id: "strategy-3-q3",
        question: "Which of these is a common source of economies of scale?",
        options: [
          "Paying higher prices for smaller and smaller orders",
          "Getting bulk discounts when buying supplies in huge quantities",
          "Opening stores in cities with very few customers",
          "Producing many unrelated products in tiny separate batches"
        ],
        correctAnswer: 1,
        explanation: "Big buyers get better deals — a chain ordering a million cups pays far less per cup than a cafe ordering a hundred, lowering its cost per drink sold."
      },
      {
        id: "strategy-3-q4",
        question: "A giant retail chain pays suppliers much less per item than a small corner store pays. Why?",
        options: [
          "Its enormous order sizes give it bargaining power over suppliers",
          "Large companies are legally entitled to supplier discounts",
          "Suppliers randomly choose which stores get lower prices",
          "Small stores prefer paying more to support their suppliers"
        ],
        correctAnswer: 0,
        explanation: "Suppliers compete hard to win massive orders, so a chain buying truckloads can negotiate prices a small shop could never get — a classic economy of scale."
      },
      {
        id: "strategy-3-q5",
        question: "Why do economies of scale make it hard for new companies to enter an industry?",
        options: [
          "New companies are banned from industries with large players",
          "Newcomers start with higher per-unit costs than big rivals",
          "Big companies always sue any startup that enters",
          "Customers refuse to ever try products from new companies"
        ],
        correctAnswer: 1,
        explanation: "A small newcomer can't spread costs across millions of units, so its products cost more to make — making it tough to match the big player's prices and still profit."
      },
      {
        id: "strategy-3-q6",
        question: "You run a lemonade stand. Making one pitcher costs $4, but making four pitchers at once costs $10 total. What did you discover?",
        options: [
          "Larger batches lower your cost per pitcher of lemonade",
          "Making more lemonade always costs more per pitcher",
          "Four pitchers cost exactly four times one pitcher",
          "Batch size has no effect on your production costs"
        ],
        correctAnswer: 0,
        explanation: "One pitcher costs $4 alone, but four at once cost $2.50 each ($10 ÷ 4) — producing in bigger batches spread your effort and ingredients more efficiently."
      },
      {
        id: "strategy-3-q7",
        question: "What are 'diseconomies of scale'?",
        options: [
          "Discounts that companies give to their largest customers",
          "Savings that appear only when a company stays small",
          "Taxes charged to companies that grow past a size limit",
          "When growing too big starts raising costs per unit"
        ],
        correctAnswer: 3,
        explanation: "Past a certain size, layers of managers, communication problems, and complexity can make each unit more expensive — bigger stops being better."
      },
      {
        id: "strategy-3-q8",
        question: "Why can software companies achieve especially extreme economies of scale?",
        options: [
          "Software firms never have to pay any fixed costs",
          "Governments subsidize every copy of software that is sold",
          "Serving each extra user costs almost nothing once software is built",
          "Software customers always pay more than hardware customers"
        ],
        correctAnswer: 2,
        explanation: "Writing an app is expensive, but copying it for the next user is nearly free — so as users multiply, the average cost per user plummets toward zero."
      }
    ]
  },

  // STRATEGY-4: Network Effects
  {
    lessonId: "strategy-4",
    questions: [
      {
        id: "strategy-4-q1",
        question: "What is a network effect?",
        options: [
          "A product becomes more valuable as more people use it",
          "A company's Wi-Fi network gets faster with better routers",
          "A product gets cheaper to manufacture in larger batches",
          "A business hires employees through personal connections only"
        ],
        correctAnswer: 0,
        explanation: "With network effects, every new user makes the product better for everyone else — a messaging app with all your friends on it is far more useful than an empty one."
      },
      {
        id: "strategy-4-q2",
        question: "Why do most teens use the same messaging app as their friends instead of a technically better one?",
        options: [
          "Schools legally require students to use one single app",
          "An app's value comes from the people already on it",
          "Phone companies block users from installing rival apps",
          "The most popular app is always the newest one released"
        ],
        correctAnswer: 1,
        explanation: "A messaging app is only useful if the people you want to reach are there — that's the network effect pulling everyone toward the app their friends already use."
      },
      {
        id: "strategy-4-q3",
        question: "A ride-sharing app connects drivers and riders. Why does adding more drivers help riders too?",
        options: [
          "Drivers pay riders a bonus whenever new drivers join",
          "More drivers means the app can delete its rider fees",
          "More drivers means shorter waits, attracting even more riders",
          "Adding drivers makes the app's icon easier to find"
        ],
        correctAnswer: 2,
        explanation: "This is a two-sided network effect: more drivers mean faster pickups, which attracts riders, which attracts more drivers — each side makes the other more valuable."
      },
      {
        id: "strategy-4-q4",
        question: "A brand-new social app launches with amazing features but almost no users. What is its biggest challenge?",
        options: [
          "Too many users will overload its servers immediately",
          "Its features are too advanced for people to understand",
          "App stores refuse to list apps from new companies",
          "An empty network offers little value to early joiners"
        ],
        correctAnswer: 3,
        explanation: "This is the 'cold start' problem — a social app with no one to follow or message feels worthless, no matter how good the features are, until enough users join."
      },
      {
        id: "strategy-4-q5",
        question: "Why do markets with strong network effects often end up dominated by one or two winners?",
        options: [
          "Governments assign one official winner in each market",
          "Smaller networks always run out of electricity first",
          "Users get bored and delete all but two apps",
          "Everyone gravitates to the biggest, most useful network"
        ],
        correctAnswer: 3,
        explanation: "Since the biggest network is the most valuable one, new users keep choosing it, making it even bigger — a snowball that often leaves rivals far behind."
      },
      {
        id: "strategy-4-q6",
        question: "An online multiplayer game gains millions of new players. How can this make the game itself better?",
        options: [
          "More players automatically improves the game's graphics quality",
          "New players are required to donate money to old ones",
          "Matchmaking gets faster and fairer with more players available",
          "The game becomes shorter so everyone can finish it"
        ],
        correctAnswer: 2,
        explanation: "With a huge player pool, the game can quickly match you with opponents at your skill level — a direct network effect where more users improve the experience."
      },
      {
        id: "strategy-4-q7",
        question: "Why are network effects considered a powerful competitive moat?",
        options: [
          "Network effects legally prevent competitors from launching apps",
          "Rivals can copy features but not the community of users",
          "Networks make advertising completely unnecessary for the company",
          "Apps with networks never need updates or improvements again"
        ],
        correctAnswer: 1,
        explanation: "A competitor can clone an app's design in months, but convincing millions of people to leave their friends and move to an empty network is far harder."
      },
      {
        id: "strategy-4-q8",
        question: "Which business benefits most from network effects?",
        options: [
          "An online marketplace connecting many buyers and sellers",
          "A local bakery selling bread to neighborhood customers",
          "A landscaping company mowing lawns in one town",
          "A car wash serving drivers on a busy road"
        ],
        correctAnswer: 0,
        explanation: "A marketplace gets better for buyers as sellers join and better for sellers as buyers join — the bakery, landscaper, and car wash don't get more valuable per customer as their user counts grow."
      }
    ]
  },

  // STRATEGY-5: Brand Value
  {
    lessonId: "strategy-5",
    questions: [
      {
        id: "strategy-5-q1",
        question: "What is brand value?",
        options: [
          "The total cost of a company's logo design work",
          "The extra worth a trusted name adds to a product",
          "The dollar amount printed on every product's price tag",
          "The salary paid to a company's chief marketing officer"
        ],
        correctAnswer: 1,
        explanation: "Brand value is the premium a familiar, trusted name commands — customers pay more and choose it more often because of what the name promises."
      },
      {
        id: "strategy-5-q2",
        question: "Two hoodies are nearly identical in quality, but teens pay $40 more for the one with a famous logo. What explains this?",
        options: [
          "The brand's reputation and image justify a premium price",
          "The famous hoodie is secretly made of rare materials",
          "Stores are required to charge more for logo clothing",
          "The cheaper hoodie is illegal to wear in public"
        ],
        correctAnswer: 0,
        explanation: "Customers aren't just buying fabric — they're buying identity, status, and trust in the name, which is exactly the power of a strong brand."
      },
      {
        id: "strategy-5-q3",
        question: "How do companies typically build a strong brand over time?",
        options: [
          "By changing their company name every few years",
          "By keeping their products completely hidden from reviews",
          "By suing every customer who posts criticism online",
          "By delivering consistent quality that earns customer trust"
        ],
        correctAnswer: 3,
        explanation: "Brands are built on repeated good experiences — when a product reliably delivers, customers learn to trust the name and choose it automatically."
      },
      {
        id: "strategy-5-q4",
        question: "A snack company gets caught lying about its ingredients. What is the likely effect on its brand?",
        options: [
          "The scandal will make the brand more memorable and valuable",
          "Nothing changes because customers never read the news",
          "Trust erodes, and customers may switch to competitors",
          "The government will assign the company a new brand"
        ],
        correctAnswer: 2,
        explanation: "Brand value rests on trust, so a scandal can undo years of goodwill quickly — burned customers often take their spending to brands they still believe in."
      },
      {
        id: "strategy-5-q5",
        question: "When one company buys another, why might it pay far more than the value of the factories and inventory?",
        options: [
          "Buyers always overpay by accident during big acquisitions",
          "Extra payments are a legally required acquisition tax",
          "The brand itself is a valuable intangible asset",
          "Factories are worthless, so only extras have value"
        ],
        correctAnswer: 2,
        explanation: "A famous brand brings loyal customers and pricing power that don't show up as physical property — buyers pay a premium for that intangible asset."
      },
      {
        id: "strategy-5-q6",
        question: "A factory makes identical cereal for a famous brand and a generic store label. The branded box sells for $2 more. What does this show?",
        options: [
          "The branded cereal must contain much better ingredients",
          "Generic cereal is only sold to people without preferences",
          "Factories always charge brands more for identical products",
          "Customers will pay extra purely for the trusted name"
        ],
        correctAnswer: 3,
        explanation: "Since the cereal inside is identical, the entire $2 difference is brand value — proof that a trusted name alone can command a higher price."
      },
      {
        id: "strategy-5-q7",
        question: "What is brand loyalty?",
        options: [
          "Customers repeatedly choosing the same brand over alternatives",
          "A legal contract requiring customers to keep buying",
          "Employees promising never to quit their company jobs",
          "A rewards card that expires after one purchase"
        ],
        correctAnswer: 0,
        explanation: "Brand loyalty means customers come back again and again by choice — like always buying the same sneaker brand even when rivals run sales."
      },
      {
        id: "strategy-5-q8",
        question: "Why can a strong brand actually lower a company's marketing costs?",
        options: [
          "Strong brands are legally exempt from paying for advertising",
          "Loyal customers return and spread the word without expensive ads",
          "Famous companies receive free ad space from television networks",
          "Marketing employees accept lower pay at famous companies"
        ],
        correctAnswer: 1,
        explanation: "When customers already trust the name and recommend it to friends, the company doesn't have to spend as much convincing each new buyer from scratch."
      }
    ]
  },

  // STRATEGY-6: Sustainable Advantage
  {
    lessonId: "strategy-6",
    questions: [
      {
        id: "strategy-6-q1",
        question: "In investing, what is an 'economic moat'?",
        options: [
          "A water feature built around corporate headquarters",
          "A government license required to sell products overseas",
          "A durable advantage that protects a company from competitors",
          "An emergency fund companies keep for economic downturns"
        ],
        correctAnswer: 2,
        explanation: "Like a moat around a castle, an economic moat is a lasting advantage — such as a brand or patent — that makes it hard for rivals to steal a company's customers and profits."
      },
      {
        id: "strategy-6-q2",
        question: "Which of these is a classic example of an economic moat?",
        options: [
          "A trendy product design that competitors copy within months",
          "A one-time viral video promoting the company's newest product",
          "A temporary discount that ends after the holiday season",
          "A patent that blocks rivals from copying an invention"
        ],
        correctAnswer: 3,
        explanation: "A patent legally prevents competitors from copying the invention for years, giving the company durable protection — while trends, viral moments, and discounts fade fast."
      },
      {
        id: "strategy-6-q3",
        question: "A student wants to leave her phone's ecosystem, but she'd lose purchased apps, cloud photos, and group chats. What moat is this?",
        options: [
          "Switching costs that make leaving expensive and painful",
          "Economies of scale from producing many phones cheaply",
          "A patent portfolio protecting the phone's hardware designs",
          "A government regulation preventing customers from changing brands"
        ],
        correctAnswer: 0,
        explanation: "When leaving a product means losing time, money, or data, customers tend to stay — those switching costs are a powerful moat even if rivals offer great alternatives."
      },
      {
        id: "strategy-6-q4",
        question: "A company invents a hit fidget toy, but within a year dozens of copycats sell similar toys for less. What was missing?",
        options: [
          "The company forgot to advertise its toy on television",
          "A moat to protect its advantage from being copied",
          "A taller price that would have scared off copycats",
          "A celebrity endorsement to make the toy popular"
        ],
        correctAnswer: 1,
        explanation: "A hot product without patents, brand loyalty, or other protection invites copycats — without a moat, the advantage evaporated as soon as rivals arrived."
      },
      {
        id: "strategy-6-q5",
        question: "Why do long-term investors specifically look for companies with strong moats?",
        options: [
          "Moats guarantee the stock price rises every single year",
          "Protected profits can compound for many years ahead",
          "Companies with moats never experience any business problems",
          "Moats allow companies to legally avoid paying taxes"
        ],
        correctAnswer: 1,
        explanation: "A moat helps a company defend its profits from competition year after year, which is exactly what long-term investors need for compounding to work."
      },
      {
        id: "strategy-6-q6",
        question: "A drug company's blockbuster medicine loses patent protection next year. What should investors expect?",
        options: [
          "Cheaper generic competitors will likely erode its sales",
          "Sales will rise because the drug becomes more famous",
          "The government will extend the patent automatically forever",
          "Nothing changes because patients ignore generic medicines"
        ],
        correctAnswer: 0,
        explanation: "When a patent expires, the moat disappears — generic makers can copy the drug and sell it cheaply, usually taking a big bite out of the original's sales."
      },
      {
        id: "strategy-6-q7",
        question: "What are 'switching costs'?",
        options: [
          "Fees companies pay to relocate their factories abroad",
          "The price of flipping a store's electrical systems",
          "Taxes charged whenever a customer changes banks",
          "The hassle and expense customers face changing to a rival"
        ],
        correctAnswer: 3,
        explanation: "Switching costs are everything a customer gives up to change products — money, time, saved data, or learning a new system — and they keep customers locked in."
      },
      {
        id: "strategy-6-q8",
        question: "Which advantage is most likely to still protect a company ten years from now?",
        options: [
          "This season's popular color scheme on its products",
          "A price cut running for the current quarter",
          "A network of millions of users rivals cannot replicate",
          "A single celebrity endorsement deal signed last month"
        ],
        correctAnswer: 2,
        explanation: "Fashion trends, temporary discounts, and endorsement deals fade quickly, but a massive user network keeps reinforcing itself — making it one of the most durable moats."
      }
    ]
  },
]
