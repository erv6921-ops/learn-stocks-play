import { StructuredLessonContent } from "@/types"

// Deepened lesson content for: entrepreneurship (biz-1..7),
// competitive-strategy (strategy-1..6), psychology-of-money (psych-1..10).
// Each entry replaces the thin auto-generated version for its lessonId.
export const deepEntreStrategyPsych: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // biz-1: Revenue Models
  // ─────────────────────────────────────────────
  {
    lessonId: "biz-1",
    sections: [
      {
        type: "concept",
        title: "Where the Money Actually Comes From",
        paragraphs: [
          "A revenue model is simply the plan for how a business turns what it does into money coming in the door. It sounds obvious, but plenty of businesses build something people love and still fail because they never figured out who pays, how much, and how often. Think of a student who bakes amazing cookies for the class - everyone cheers, but if she gives them away, there is no business. Revenue is the total money a business collects from customers before any costs are subtracted, and choosing how to collect it is one of the first real decisions a founder makes.",
          "The simplest model is a one-time sale: a customer pays once and owns the product. A sneaker resale side hustle works this way - buy a pair for $80, sell for $130, collect $130 in revenue on that sale. It is easy to understand, but the hustle only earns again if you find a brand-new buyer for a brand-new pair. That is why many businesses chase repeat revenue instead. The key metric here is how many units you sell and at what price, because revenue equals price multiplied by quantity, nothing more mysterious than that.",
          "Recurring revenue changes the game. Instead of hunting for a new sale every day, the business earns predictably month after month. A $10-a-month app subscription with 500 users brings in $5,000 every single month whether or not the team lands a new customer. Investors love this because it is stable and easy to forecast. The trade-off is that you must keep customers happy enough to keep paying, so the work shifts from constant selling to constant delivering. Most successful modern companies mix models to smooth out the ups and downs."
        ],
        bullets: [
          "Revenue = price times quantity; it is the money collected before costs are subtracted.",
          "One-time sales are simple but require finding a fresh buyer for every sale.",
          "Recurring revenue (subscriptions, memberships) is predictable and easier to forecast.",
          "Advertising and marketplace commissions let you earn without selling a product directly.",
          "Many businesses blend several models to keep income steady across the year."
        ],
        realWorldExample: "A teen runs a lawn-mowing hustle two ways. Charging $30 per mow is a one-time sale - good money, but she must rebook every customer each week. Switching to a $100-a-month 'season plan' for four mows gives her recurring revenue: she knows exactly what June brings before it even starts."
      },
      {
        type: "concept",
        title: "Common Models and Why You Pick One",
        paragraphs: [
          "Beyond simple sales and subscriptions, founders choose from a handful of proven patterns. A marketplace model connects buyers and sellers and takes a small cut of each deal - think of an app that lets neighbors sell used textbooks and keeps 10% of every sale. The freemium model gives a basic version away free to attract a crowd, then charges for premium features; a game that is free to download but sells extra levels earns this way. An advertising model gives the whole product away and charges other businesses to reach the audience you built.",
          "The model you pick shapes everything else about the company. A subscription business obsesses over 'churn' - the percentage of customers who quit each month - because losing even 5% monthly quietly drains the whole base over a year. A one-time-sale business obsesses over finding new customers cheaply. A freemium app obsesses over the 'conversion rate,' the slice of free users who upgrade to paid, since a huge free crowd is worthless if almost none of them ever pay a cent.",
          "There is no single best model; there is only the best fit for your product and customer. Ask three questions: How often will people naturally want this? How much is it worth to them each time? And how expensive is it to keep serving them? A tutoring service fits recurring revenue because students need help all semester. A custom prom-dress alteration fits one-time sales because you need it once. Matching the model to real customer behavior is what separates a hustle that grows from one that stalls."
        ],
        bullets: [
          "Marketplaces earn a commission on transactions between other people.",
          "Freemium attracts users with a free tier, then charges for premium upgrades.",
          "Advertising models monetize attention instead of charging users directly.",
          "Churn (subscriptions) and conversion rate (freemium) are the make-or-break metrics.",
          "Pick a model by how often, how valuable, and how costly to serve the customer is."
        ],
        realWorldExample: "A free study-flashcards app has 50,000 users but earns nothing until it adds a $4-a-month 'pro' tier. If just 3% convert, that is 1,500 paying users and $6,000 a month - proof that a freemium model lives or dies on conversion rate, not raw download counts."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "biz1-mc1",
            question: "What is the main advantage of a recurring-revenue (subscription) model?",
            options: [
              "It removes all costs from the business",
              "Income is predictable month after month",
              "Customers can never cancel their plans",
              "It requires no work once launched"
            ],
            correctAnswer: 1,
            explanation: "Recurring revenue means customers keep paying on a schedule, so the business can forecast income reliably. Costs still exist, customers can cancel, and delivering the service is ongoing work."
          },
          {
            id: "biz1-mc2",
            question: "For a freemium app, which metric matters most?",
            options: [
              "The conversion rate from free to paid",
              "The total cumulative number of free app downloads",
              "The overall color scheme of the app",
              "The total number of written app-store reviews"
            ],
            correctAnswer: 0,
            explanation: "Freemium gives the product away free, so revenue depends on the share of free users who upgrade to paid. A huge free crowd means little if almost none of them convert."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devon Chooses How to Charge",
        narrative: "Devon builds a workout-tracking app that teens love. He has 8,000 free users but $0 in revenue. He is weighing three options: sell the app for a one-time $5, charge $3 a month for a premium tier, or keep it free and sell ads. He wants steady income he can predict.",
        details: [
          "A one-time $5 sale earns once per user; he must find new users to keep growing revenue.",
          "A $3 monthly premium tier is recurring, but only converts if the extra features are worth paying for.",
          "An ad model keeps everything free and earns from advertisers, but needs a large, active audience.",
          "Devon values predictable income, which points toward a subscription with a strong premium feature."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "biz1-aq1",
          question: "Devon wants income he can forecast month to month. Which model best fits that goal?",
          options: [
            "A one-time $5 purchase per user",
            "A $3-a-month premium subscription",
            "Selling the user list to another app",
            "A single sponsorship paid once a year"
          ],
          correctAnswer: 1,
          explanation: "A monthly subscription produces recurring, predictable revenue Devon can forecast. One-time sales and a single annual sponsorship are lumpy and unpredictable, and selling user data is not a sustainable model."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Revenue is money collected from customers, and revenue equals price times quantity.",
          "One-time sales are simple but need a fresh buyer for every dollar earned.",
          "Recurring revenue is predictable and prized by investors, but requires keeping customers happy.",
          "Freemium, marketplace, and advertising models monetize crowds in different ways.",
          "Choose a model based on how often, how valuable, and how costly your service is to deliver."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "biz1-mastery1",
            question: "A business collects money once when a customer buys and owns the product outright. This is a…",
            options: [
              "Recurring subscription model",
              "One-time sale model",
              "Advertising-based revenue model",
              "Marketplace commission model"
            ],
            correctAnswer: 1,
            explanation: "Paying once to own the product is the classic one-time sale. Subscriptions bill repeatedly, ad models charge advertisers, and marketplaces take a cut of others' deals."
          },
          {
            id: "biz1-mastery2",
            question: "Why do investors often favor subscription businesses?",
            options: [
              "They never have any operating costs to worry about",
              "Their future revenue is easy to forecast",
              "They can legally avoid paying taxes",
              "They need no customers to earn money"
            ],
            correctAnswer: 1,
            explanation: "Predictable, repeating revenue makes forecasting and valuation easier, which investors prize. Subscriptions still have costs, pay taxes, and absolutely need customers."
          },
          {
            id: "biz1-mastery3",
            question: "In a marketplace model, how does the business typically earn?",
            options: [
              "By making the products it sells itself",
              "By taking a commission on each transaction",
              "By charging users a flat lifetime fee",
              "By simply giving absolutely everything away for free"
            ],
            correctAnswer: 1,
            explanation: "A marketplace connects buyers and sellers and keeps a cut of each deal, without making the product itself. That commission is its revenue."
          },
          {
            id: "biz1-mastery4",
            question: "A subscription app loses 5% of customers every month. This metric is called…",
            options: [
              "Its churn rate",
              "Its profit margin",
              "Its break-even point",
              "Its market share"
            ],
            correctAnswer: 0,
            explanation: "Churn is the percentage of subscribers who cancel each period. High churn quietly drains the customer base and is the number-one threat to a subscription model."
          },
          {
            id: "biz1-mastery5",
            question: "If price is $12 and 400 units sell, total revenue is…",
            options: [
              "$412 collected total",
              "$4,800 collected total",
              "$33 collected total",
              "$12 collected total"
            ],
            correctAnswer: 1,
            explanation: "Revenue equals price times quantity: $12 x 400 = $4,800. The other options confuse addition or division for the correct multiplication."
          },
          {
            id: "biz1-mastery6",
            question: "A free game earns by charging companies to show ads to its players. This is a…",
            options: [
              "Freemium upgrade model",
              "Advertising-based model",
              "One-time purchase model",
              "Direct subscription model"
            ],
            correctAnswer: 1,
            explanation: "When the product is free and other businesses pay to reach the audience, the money comes from advertising. Freemium would instead charge users for premium features."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // biz-2: Cost Structure
  // ─────────────────────────────────────────────
  {
    lessonId: "biz-2",
    sections: [
      {
        type: "concept",
        title: "Fixed Costs vs Variable Costs",
        paragraphs: [
          "Every business spends money to operate, and those costs split into two big buckets that behave very differently. Fixed costs stay the same no matter how much you sell. If you rent a small kiosk for a bubble-tea stand at $800 a month, that $800 is due whether you sell 10 drinks or 10,000. Rent, insurance, a website subscription, and salaried staff are classic fixed costs. They feel scary when sales are low because they do not shrink, but they also do not grow when business booms, which is exactly what makes scaling profitable.",
          "Variable costs rise and fall directly with how much you produce or sell. For the bubble-tea stand, the cups, tea, tapioca pearls, and straws are variable - sell more drinks and you buy more supplies. If each drink costs $1.20 in ingredients, selling 500 drinks means $600 in variable costs; selling 1,000 means $1,200. The cost per unit stays roughly steady, but the total climbs with volume. Understanding which costs are fixed and which are variable is the foundation of pricing, break-even, and knowing whether a busy day actually made money.",
          "The mix of fixed and variable costs shapes how risky a business is. A company with huge fixed costs, like a factory, needs high sales just to cover them, but once it clears that bar, extra sales are very profitable because each new unit only adds a small variable cost. A business that is mostly variable costs, like a freelance tutor who owns nothing but a notebook, has almost no risk in a slow month but earns a thinner slice on each sale. Founders deliberately choose their cost structure to match how confident and predictable their sales are."
        ],
        bullets: [
          "Fixed costs (rent, insurance, salaries) stay the same regardless of sales volume.",
          "Variable costs (materials, supplies, shipping) rise and fall with how much you sell.",
          "Total cost = fixed costs + (variable cost per unit times units sold).",
          "High fixed costs are risky when sales are low but very profitable at high volume.",
          "Cost structure determines a business's break-even point and its risk level."
        ],
        realWorldExample: "A T-shirt printing side hustle pays $50 a month for design software (fixed) and $6 per blank shirt plus ink (variable). In a month selling 40 shirts, total cost is $50 + (40 x $6) = $290. The $50 is owed even in a month with zero sales."
      },
      {
        type: "concept",
        title: "Why Cost Structure Drives Every Decision",
        paragraphs: [
          "Once you can label your costs, a powerful idea appears: the contribution margin. That is the money left from each sale after paying only its variable cost, and it is what 'contributes' toward covering fixed costs. If a bubble tea sells for $5 and its variable cost is $1.20, each drink contributes $3.80. Divide your fixed costs by that number and you learn how many units you must sell just to break even. Here, $800 rent divided by $3.80 means you need about 211 drinks a month before you earn a single dollar of profit.",
          "Cost structure also explains why growing a business can suddenly become very profitable. Because fixed costs are already paid, every sale beyond break-even drops mostly to profit. That is the magic of 'operating leverage.' A software app is the extreme example: after building it (a huge fixed cost), selling to one more user costs almost nothing, so profits soar as it scales. This is why investors get excited about businesses with low variable costs and the potential for millions of customers.",
          "The flip side is real danger during downturns. High fixed costs are unforgiving: if sales drop 30%, your rent and salaries do not drop 30% with them, and losses pile up fast. That is why many smart founders keep costs 'variable' early on - renting equipment instead of buying, hiring freelancers instead of full-time staff, using pay-as-you-go tools. It earns a bit less per sale but keeps the business flexible and survivable while demand is still uncertain. As sales become predictable, they trade toward fixed costs to capture more profit."
        ],
        bullets: [
          "Contribution margin = price minus variable cost per unit; it covers fixed costs first.",
          "Break-even units = fixed costs divided by contribution margin per unit.",
          "Operating leverage means sales past break-even are mostly pure profit.",
          "High fixed costs amplify both profits in good times and losses in bad times.",
          "Early-stage founders often keep costs variable to stay flexible and survive slow periods."
        ],
        realWorldExample: "Two coffee carts each sell $4 drinks. Cart A owns a $30,000 machine (high fixed cost) but pays $0.50 per drink; Cart B rents its machine cheaply but pays $1.50 per drink. On a booming day Cart A earns far more per cup; on a slow, rainy week Cart B loses much less."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "biz2-mc1",
            question: "Which of these is a fixed cost for a food-truck business?",
            options: [
              "The monthly truck lease payment",
              "The burger patties bought each day",
              "The paper wrappers used per order",
              "The cooking oil replaced by volume"
            ],
            correctAnswer: 0,
            explanation: "The lease is owed every month no matter how many meals sell, making it fixed. Patties, wrappers, and oil all rise with how much food is sold, so they are variable costs."
          },
          {
            id: "biz2-mc2",
            question: "A product sells for $9 with a $4 variable cost. Its contribution margin per unit is…",
            options: [
              "$13 per unit sold",
              "$5 per unit sold",
              "$4 per unit sold",
              "$9 per unit sold"
            ],
            correctAnswer: 1,
            explanation: "Contribution margin is price minus variable cost: $9 - $4 = $5. That $5 from each sale goes toward covering the business's fixed costs before any profit."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Plans Her Candle Business",
        narrative: "Priya starts a candle business. She rents a studio for $400 a month and pays $3 in wax, wick, and jar for each candle she makes. She sells candles for $15 each. She wants to understand her costs before deciding how many to make.",
        details: [
          "Her $400 studio rent is a fixed cost, owed even in a month she sells nothing.",
          "The $3 per candle in materials is a variable cost that grows with how many she makes.",
          "Each candle contributes $15 - $3 = $12 toward covering that fixed rent.",
          "She must sell about 34 candles ($400 / $12) just to break even before earning profit."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "biz2-aq1",
          question: "If Priya sells 60 candles in a month, what is her profit?",
          options: [
            "$720 in profit that month",
            "$320 in profit that month",
            "$900 in profit that month",
            "$180 in profit that month"
          ],
          correctAnswer: 1,
          explanation: "Revenue is 60 x $15 = $900. Costs are $400 rent + (60 x $3) = $580. Profit is $900 - $580 = $320. The $720 figure forgets rent, and $900 ignores costs entirely."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Fixed costs stay constant with volume; variable costs rise and fall with sales.",
          "Total cost = fixed costs plus variable cost per unit times units sold.",
          "Contribution margin (price minus variable cost) covers fixed costs, then becomes profit.",
          "High fixed costs mean higher risk but bigger profits once you scale past break-even.",
          "Founders often keep costs variable early to stay flexible while demand is uncertain."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "biz2-mastery1",
            question: "Which statement about fixed costs is true?",
            options: [
              "They rise up directly with each single unit sold",
              "They stay the same regardless of sales volume",
              "They only ever exist for large software companies",
              "They completely disappear whenever total sales hit zero"
            ],
            correctAnswer: 1,
            explanation: "Fixed costs like rent and insurance stay constant whether you sell a lot or nothing at all. That is exactly why slow months are dangerous for high-fixed-cost businesses."
          },
          {
            id: "biz2-mastery2",
            question: "A bakery pays $2 in ingredients per loaf and $1,000 monthly rent. Selling 800 loaves, total cost is…",
            options: [
              "$1,600 that month",
              "$2,600 that month",
              "$1,000 that month",
              "$1,802 that month"
            ],
            correctAnswer: 1,
            explanation: "Total cost = fixed + variable = $1,000 + (800 x $2) = $1,000 + $1,600 = $2,600. Forgetting either the rent or the per-loaf cost gives the wrong answers."
          },
          {
            id: "biz2-mastery3",
            question: "What does a high contribution margin per unit let a business do faster?",
            options: [
              "Avoid paying any fixed costs at all",
              "Reach break-even with fewer units sold",
              "Eliminate the need for customers",
              "Guarantee it will never lose money"
            ],
            correctAnswer: 1,
            explanation: "A bigger contribution margin covers fixed costs quicker, so you break even at a lower sales volume. Fixed costs still exist and losses are still possible below break-even."
          },
          {
            id: "biz2-mastery4",
            question: "Why is a business with very high fixed costs riskier in a downturn?",
            options: [
              "All of its variable costs also completely vanish instantly",
              "Fixed costs stay due even as sales fall",
              "It automatically owes exactly double the monthly rent",
              "Customers are legally required to keep on buying"
            ],
            correctAnswer: 1,
            explanation: "If sales drop, high fixed costs like rent and salaries do not drop with them, so losses mount quickly. That unforgiving nature is the core risk of a heavy fixed-cost structure."
          },
          {
            id: "biz2-mastery5",
            question: "'Operating leverage' means that after break-even…",
            options: [
              "Each extra sale is mostly profit",
              "Every sale loses a little money",
              "Fixed costs suddenly triple out of nowhere",
              "Variable costs rise sharply for each unit"
            ],
            correctAnswer: 0,
            explanation: "Once fixed costs are covered, additional sales carry only their small variable cost, so most of each new sale becomes profit. That amplifying effect is operating leverage."
          },
          {
            id: "biz2-mastery6",
            question: "Why might a new founder rent equipment instead of buying it?",
            options: [
              "Renting is always cheaper long-term",
              "It keeps costs variable and flexible",
              "It removes the need to make sales",
              "Owning equipment is against the law"
            ],
            correctAnswer: 1,
            explanation: "Renting turns a big fixed cost into a flexible, pay-as-you-go one, so a slow month hurts less while demand is still uncertain. It is not always cheaper long-term - that is the trade-off."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // biz-3: Break-Even
  // ─────────────────────────────────────────────
  {
    lessonId: "biz-3",
    sections: [
      {
        type: "concept",
        title: "The Point Where You Stop Losing Money",
        paragraphs: [
          "The break-even point is the exact amount of sales where a business finally covers all its costs - not a penny of profit yet, but no loss either. Below it you are losing money; above it you start earning. Every founder needs this number because it turns a vague hope into a concrete target. Instead of saying 'I hope this works,' you can say 'I need to sell 211 bubble teas this month to survive.' That clarity changes how you price, how hard you push, and whether an idea is even realistic.",
          "The math builds directly on cost structure. First find the contribution margin per unit: price minus variable cost. Then divide your total fixed costs by that margin. The result is the number of units you must sell to break even. If a phone-case shop pays $600 a month in fixed costs, sells cases for $20, and each case costs $8 to make, the contribution margin is $12, and $600 divided by $12 equals 50 cases. Sell 50 and you break even; sell the 51st and you finally earn $12 of profit.",
          "Break-even can be measured in units or in dollars of revenue. Fifty cases at $20 each is $1,000 in break-even revenue. Both views are useful: units tell you how much to produce, while the dollar figure tells you the sales target for the month. The powerful insight is that anything that widens your contribution margin - raising price or cutting variable cost - lowers your break-even point, meaning you need fewer sales to be safe. That is why founders fight so hard over even small changes in cost and price."
        ],
        bullets: [
          "Break-even is the sales level where total revenue exactly equals total cost - zero profit, zero loss.",
          "Break-even units = fixed costs divided by contribution margin per unit.",
          "Contribution margin per unit = selling price minus variable cost per unit.",
          "You can express break-even in units to make or in dollars of revenue to hit.",
          "Raising price or lowering variable cost widens the margin and lowers break-even."
        ],
        realWorldExample: "A student sells custom stickers for $4 each; each costs $1 to print, and she pays $90 a month for a design tool. Her margin is $3, so break-even is $90 / $3 = 30 stickers. Every sticker past the 30th puts $3 of real profit in her pocket."
      },
      {
        type: "concept",
        title: "Using Break-Even to Make Real Decisions",
        paragraphs: [
          "Break-even is not just homework math - it is a decision tool. Suppose a founder is considering a $500 booth at a weekend market. Knowing her $12 contribution margin, she instantly sees she must sell about 42 items just to make the booth worth it. If she realistically expects to sell 30, she should skip it or negotiate a cheaper booth. Break-even turns 'should I spend money on this?' into a clear, answerable question, which is why experienced entrepreneurs run the number before almost every big cost.",
          "It also reveals how pricing choices ripple through the whole business. Imagine dropping a price to attract more buyers. Lower price shrinks the contribution margin, which raises the break-even point, meaning you now need even more customers just to survive. Sometimes a discount that 'feels generous' quietly makes the business unprofitable. Running break-even before and after a price change shows exactly how many extra units the lower price must generate to be worth it - often far more than founders expect.",
          "Finally, break-even helps set honest goals and spot bad ideas early. If breaking even requires selling 5,000 units a month but the whole school only has 800 students, the idea does not fit its market. If break-even is just 30 units and there is clearly demand for hundreds, the idea has room to be genuinely profitable. Calculating break-even before launch is one of the cheapest, fastest reality checks in all of business - a few minutes of math can save months of wasted effort."
        ],
        bullets: [
          "Run break-even before any big expense to see how many sales it must generate.",
          "A price cut lowers contribution margin, so it raises the break-even point.",
          "Discounts can quietly make a business unprofitable unless volume rises enough.",
          "Compare break-even units to your realistic market size to test if an idea fits.",
          "Break-even is a fast, cheap reality check to run before you launch or spend."
        ],
        realWorldExample: "A founder considers cutting a $10 product to $8 to boost sales. If variable cost is $4, margin falls from $6 to $4, so break-even jumps by 50%. She would need to sell far more units just to stand still - a 'generous' discount that could easily backfire."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "biz3-mc1",
            question: "At the break-even point, a business is…",
            options: [
              "Earning the single maximum possible profit it ever could",
              "Covering all costs with zero profit or loss",
              "Losing a little money on every single unit sold",
              "Paying only for its own per-unit variable costs"
            ],
            correctAnswer: 1,
            explanation: "Break-even is where total revenue exactly equals total cost: no profit and no loss. Below it the business loses money; above it, it starts earning."
          },
          {
            id: "biz3-mc2",
            question: "Fixed costs are $900 and contribution margin is $9 per unit. Break-even is…",
            options: [
              "100 units sold",
              "900 units sold",
              "9 units sold",
              "81 units sold"
            ],
            correctAnswer: 0,
            explanation: "Break-even units = fixed costs / contribution margin = $900 / $9 = 100 units. Once the 100th unit sells, every unit after that produces real profit."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Weighs a Market Stall",
        narrative: "Marcus makes phone grips that sell for $10 each and cost him $4 in materials. He is offered a weekend craft-market stall for $300. He wants to know whether renting the stall makes sense given how many grips he can realistically sell in two days.",
        details: [
          "Each grip contributes $10 - $4 = $6 toward covering the stall's cost.",
          "To break even on the $300 stall, he must sell $300 / $6 = 50 grips.",
          "He looks at past events and thinks he can sell about 35 grips in a weekend.",
          "Since 35 is below the 50 he needs, the stall would likely lose him money."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "biz3-aq1",
          question: "Given his numbers, what is Marcus's smartest move?",
          options: [
            "Just rent the expensive stall anyway and simply hope for some good luck",
            "Skip it or find a cheaper stall, since 35 is below break-even",
            "Raise his selling price all the way to $30 to try to force a profit",
            "Sell each and every grip for well below the $4 material cost"
          ],
          correctAnswer: 1,
          explanation: "He needs 50 sales to break even but expects only 35, so the stall likely loses money. Skipping it or finding a cheaper booth is wise. A wild price hike or selling below cost would hurt him."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Break-even is the sales level where revenue exactly covers all costs - zero profit or loss.",
          "Break-even units = fixed costs divided by contribution margin per unit.",
          "Anything that widens the contribution margin lowers the break-even point.",
          "A price cut shrinks the margin and raises how many units you must sell.",
          "Comparing break-even to realistic demand is a fast reality check before launching."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "biz3-mastery1",
            question: "Selling one unit past break-even means the business now earns…",
            options: [
              "Its full selling price as profit",
              "Its contribution margin as profit",
              "Its fixed costs as profit",
              "Nothing until next month"
            ],
            correctAnswer: 1,
            explanation: "Fixed costs are already covered at break-even, so each additional unit adds its contribution margin (price minus variable cost) straight to profit."
          },
          {
            id: "biz3-mastery2",
            question: "Fixed costs $1,200; price $30; variable cost $18. Break-even in units is…",
            options: [
              "40 units",
              "100 units",
              "12 units",
              "67 units"
            ],
            correctAnswer: 1,
            explanation: "Contribution margin = $30 - $18 = $12. Break-even = $1,200 / $12 = 100 units. Using the wrong margin or dividing by price alone gives the other answers."
          },
          {
            id: "biz3-mastery3",
            question: "Cutting your price without cutting costs will…",
            options: [
              "Lower the break-even point",
              "Raise the break-even point",
              "Leave the break-even point unchanged",
              "Eliminate all fixed costs"
            ],
            correctAnswer: 1,
            explanation: "A lower price shrinks the contribution margin, so you must sell more units to cover fixed costs - break-even goes up. Only widening the margin lowers break-even."
          },
          {
            id: "biz3-mastery4",
            question: "Break-even in revenue dollars for 50 units priced at $20 each is…",
            options: [
              "$70 in revenue",
              "$1,000 in revenue",
              "$250 in revenue",
              "$500 in revenue"
            ],
            correctAnswer: 1,
            explanation: "Break-even revenue = break-even units times price = 50 x $20 = $1,000. That is the sales target that exactly covers all costs."
          },
          {
            id: "biz3-mastery5",
            question: "Why run break-even before renting an expensive booth?",
            options: [
              "To learn how many sales the cost demands",
              "To completely avoid ever paying any taxes at all",
              "To guarantee the booth will be crowded",
              "To make all fixed costs disappear entirely forever"
            ],
            correctAnswer: 0,
            explanation: "Break-even converts the booth's cost into a concrete sales target, so you can judge whether realistic demand will cover it. It does not affect taxes, crowds, or the cost itself."
          },
          {
            id: "biz3-mastery6",
            question: "If break-even needs 5,000 sales but your whole market is 800 people, the idea…",
            options: [
              "Fits perfectly well into its chosen target market",
              "Does not fit its market as priced",
              "Will always turn out to be highly profitable",
              "Has no fixed costs to worry about"
            ],
            correctAnswer: 1,
            explanation: "You cannot sell to more people than exist in your market, so a break-even far above market size signals the idea, price, or costs need rethinking before launch."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // biz-4: Margins
  // ─────────────────────────────────────────────
  {
    lessonId: "biz-4",
    sections: [
      {
        type: "concept",
        title: "Margins Show How Much You Actually Keep",
        paragraphs: [
          "Revenue tells you how much money came in, but margin tells you how much you keep - and keeping is what matters. A margin is profit shown as a percentage of revenue, which lets you compare a lemonade stand to a tech giant on equal footing. If a business earns $100,000 in revenue but spends $95,000, it keeps only $5,000: a 5% margin. Another earns just $20,000 in revenue but keeps $8,000: a 40% margin. The second business is far healthier per dollar of sales, even though its total revenue is smaller. Margins reveal that quality of earnings, not just the size.",
          "The first margin to learn is gross margin: revenue minus the direct cost of making the product (called cost of goods sold), divided by revenue. If a hoodie sells for $40 and costs $16 in fabric and printing, the gross profit is $24, a 60% gross margin. Gross margin answers a basic survival question: does each sale make money before you even pay rent and salaries? A business with a thin gross margin has almost no room to cover its other costs, so this number is watched closely from day one.",
          "The final margin is net margin: what is left after every cost - materials, rent, salaries, marketing, and taxes - divided by revenue. It is the true bottom line. A company can have a healthy 60% gross margin but a tiny 4% net margin if its overhead is bloated. Grocery stores famously run on razor-thin net margins around 1-3%, surviving on huge volume, while a software company might keep 25% or more. Comparing gross and net margins shows exactly where a business's money is going and where it might be leaking."
        ],
        bullets: [
          "A margin is profit expressed as a percentage of revenue, allowing fair comparisons.",
          "Gross margin = (revenue minus cost of goods sold) divided by revenue.",
          "Net margin = profit after all costs and taxes, divided by revenue - the true bottom line.",
          "A thin gross margin leaves little room to cover rent, salaries, and marketing.",
          "High revenue with a low margin can be less healthy than low revenue with a high margin."
        ],
        realWorldExample: "A phone-case seller has $10,000 in sales, spends $4,000 on cases (gross margin 60%), then $3,000 on ads, fees, and shipping. Net profit is $3,000, a 30% net margin - strong, but the gap from 60% to 30% shows overhead is eating half the gross profit."
      },
      {
        type: "concept",
        title: "Why Margins Guide Strategy",
        paragraphs: [
          "Margins shape what kind of business you can build. A high-margin product gives you breathing room to spend on marketing, survive mistakes, and reinvest in growth. A low-margin product forces you to sell enormous volume and control every cost obsessively. This is why luxury brands protect their margins fiercely with premium pricing, while discount stores accept tiny margins and win through massive scale. Neither is wrong - but a founder must know which game they are playing and build the whole business to match.",
          "Margins also explain why cutting costs and raising prices are so powerful. Because margin is a percentage, small changes compound. Shaving a $16 hoodie cost down to $13 lifts gross margin from 60% to nearly 68% without changing the price at all. Likewise, a modest price increase often flows almost entirely into profit because your costs did not move. This is why experienced founders guard against unnecessary discounts and constantly hunt for cheaper suppliers - each point of margin is pure, repeating profit on every future sale.",
          "Finally, comparing margins over time and against rivals is how you spot trouble early. If your net margin quietly slides from 20% to 12% over a year while revenue grows, something is wrong: maybe shipping costs crept up or discounts got too generous. Rising revenue can hide a shrinking margin until it becomes a crisis. That is why smart operators track margins every month, not just total sales, and treat a falling margin as an early warning to investigate before profits vanish entirely."
        ],
        bullets: [
          "High margins fund marketing, cushion mistakes, and fuel reinvestment and growth.",
          "Low-margin businesses must win on huge volume and tight cost control.",
          "Because margin is a percentage, small cost or price changes compound into big profit.",
          "Guarding against needless discounts protects margin on every future sale.",
          "A falling margin is an early warning, even when total revenue is still rising."
        ],
        realWorldExample: "Two snack brands both sell $1 million. Brand A keeps a 5% net margin ($50,000); Brand B keeps 20% ($200,000). Brand B can outspend Brand A four-to-one on marketing from the same revenue - proof that margin, not just sales, decides who can grow."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "biz4-mc1",
            question: "A product sells for $50 and costs $20 to make. Its gross margin is…",
            options: [
              "60% of revenue",
              "40% of revenue",
              "30% of revenue",
              "70% of revenue"
            ],
            correctAnswer: 0,
            explanation: "Gross margin = (price - cost) / price = ($50 - $20) / $50 = $30 / $50 = 60%. The dollar profit is $30, but expressed as a share of revenue it is 60%."
          },
          {
            id: "biz4-mc2",
            question: "What does net margin measure that gross margin does not?",
            options: [
              "Profit after all costs, including overhead and taxes",
              "Only the direct cost of the raw materials used",
              "The total gross revenue before any costs",
              "The total number of units the business sold"
            ],
            correctAnswer: 0,
            explanation: "Gross margin subtracts only the direct cost of goods. Net margin goes further, subtracting rent, salaries, marketing, and taxes to reveal the true bottom-line profit."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ava Reviews Her Jewelry Shop",
        narrative: "Ava sells handmade earrings online. Last month she made $6,000 in sales. Her materials cost $1,800, and she spent another $2,400 on packaging, ads, and platform fees. She wants to understand how much she truly kept and whether her business is healthy.",
        details: [
          "Gross profit is $6,000 - $1,800 = $4,200, a 70% gross margin - strong for handmade goods.",
          "After the extra $2,400 in overhead, net profit is $4,200 - $2,400 = $1,800.",
          "That $1,800 net profit on $6,000 sales is a 30% net margin.",
          "The gap between 70% gross and 30% net shows overhead is consuming much of her profit."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "biz4-aq1",
          question: "If Ava wants to raise her net margin, which move most directly helps?",
          options: [
            "Increasing her total revenue while overhead grows just as quickly alongside",
            "Cutting overhead like ad or fee costs without hurting sales",
            "Lowering all of her prices just to sell a few more pairs",
            "Buying much more expensive premium packaging materials for every order"
          ],
          correctAnswer: 1,
          explanation: "Net margin rises when profit grows as a share of revenue. Trimming overhead that does not drive sales lifts net profit directly. Growing revenue with equal cost growth, cutting prices, or buying pricier packaging all fail to widen the margin."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Margin is profit as a percentage of revenue, letting you compare any two businesses fairly.",
          "Gross margin subtracts only the direct cost of goods; net margin subtracts everything.",
          "High revenue with a low margin can be weaker than low revenue with a high margin.",
          "Because margin is a percentage, small cost or price changes compound into real profit.",
          "A shrinking margin is an early warning worth investigating even while sales grow."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "biz4-mastery1",
            question: "Why express profit as a margin rather than just a dollar amount?",
            options: [
              "It completely hides how much the business truly earns",
              "It lets you compare businesses of different sizes",
              "It totally removes the need to ever track costs",
              "It always makes reported profits look much bigger"
            ],
            correctAnswer: 1,
            explanation: "A percentage puts a lemonade stand and a giant corporation on the same scale, showing how efficiently each turns revenue into profit regardless of raw size."
          },
          {
            id: "biz4-mastery2",
            question: "Revenue $200; cost of goods $50. The gross margin is…",
            options: [
              "25% of revenue",
              "75% of revenue",
              "50% of revenue",
              "150% of revenue"
            ],
            correctAnswer: 1,
            explanation: "Gross margin = ($200 - $50) / $200 = $150 / $200 = 75%. The $50 cost is only a quarter of revenue, so three-quarters remains as gross profit."
          },
          {
            id: "biz4-mastery3",
            question: "A business has a 55% gross margin but only a 3% net margin. This suggests…",
            options: [
              "Its raw materials are becoming extremely expensive to buy lately",
              "Its overhead costs are eating most of the profit",
              "It has absolutely no fixed costs of any kind",
              "It is very definitely losing money on every sale"
            ],
            correctAnswer: 1,
            explanation: "A wide gap between gross and net margin means costs beyond materials - rent, salaries, marketing - are consuming most of the gross profit. It is still profitable at 3%, just barely."
          },
          {
            id: "biz4-mastery4",
            question: "How can a business raise gross margin without changing its price?",
            options: [
              "By finding a cheaper supplier for materials",
              "By spending much more money on paid advertising",
              "By hiring several additional office staff members",
              "By offering much bigger discounts to customers"
            ],
            correctAnswer: 0,
            explanation: "Lowering the cost of goods (cheaper materials) widens the gap between price and cost, raising gross margin. Ads, staff, and discounts do the opposite or leave gross margin untouched."
          },
          {
            id: "biz4-mastery5",
            question: "Why do discount stores survive on very low net margins?",
            options: [
              "They sell enormous volume to make up for it",
              "They have exactly zero costs of any kind whatsoever",
              "They always charge very high premium luxury prices for everything",
              "Low margins somehow mean a high profit per sale"
            ],
            correctAnswer: 0,
            explanation: "A tiny margin per item still adds up when you sell a massive number of items. Discount stores play the volume game, the opposite of luxury brands that protect high margins."
          },
          {
            id: "biz4-mastery6",
            question: "Revenue is rising but net margin fell from 18% to 10%. The best response is…",
            options: [
              "Just ignore it entirely because overall sales are up",
              "Investigate which costs are rising too fast",
              "Immediately shut the whole business down for good",
              "Simply assume that taxes alone caused all of it"
            ],
            correctAnswer: 1,
            explanation: "A shrinking margin amid rising revenue is an early warning that costs are outpacing sales. The smart move is to investigate the specific costs before profits erode further, not to ignore it."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // biz-5: Funding
  // ─────────────────────────────────────────────
  {
    lessonId: "biz-5",
    sections: [
      {
        type: "concept",
        title: "How Startups Get the Money to Grow",
        paragraphs: [
          "Most businesses need money before they can make money - to buy equipment, build a product, or stock inventory. Where that money comes from is called funding, and the first choice a founder makes is between two very different paths: debt and equity. With debt, you borrow money and promise to pay it back with interest, but you keep full ownership. With equity, you sell a piece of the company to an investor in exchange for cash, and now you share ownership and future profits. Neither is free; each trades away something different.",
          "Many founders actually start with the humblest source: bootstrapping, which means funding the business from personal savings and early sales rather than outside money. A teen who reinvests babysitting earnings into a growing pet-sitting business is bootstrapping. It keeps you fully in control and forces discipline, since you only spend money you actually have. The downside is that growth is limited to how much cash the business itself generates, which can be painfully slow when a competitor with outside funding races ahead.",
          "When founders want to grow faster than bootstrapping allows, they raise outside money in stages. Very early on, that might be friends and family, or an 'angel investor' - a wealthy individual who bets on tiny startups. Later, a venture capital (VC) firm may invest larger sums in exchange for equity, betting that a few big winners will pay for many failures. Each round of funding usually means giving up more ownership, so founders weigh how much control they are willing to trade for the fuel to grow."
        ],
        bullets: [
          "Debt means borrowing money to repay with interest while keeping full ownership.",
          "Equity means selling a share of the company for cash, giving up part of ownership.",
          "Bootstrapping funds growth from savings and sales, maximizing control but limiting speed.",
          "Angel investors and venture capitalists provide equity funding to help startups scale fast.",
          "Each funding round usually trades away more ownership for more growth capital."
        ],
        realWorldExample: "Two friends launch a phone-repair business. One takes a $5,000 loan (debt) and repays it monthly with interest but owns 100%. The other gives an uncle 20% of the company for $5,000 (equity) - no monthly payments, but the uncle now shares one-fifth of all future profits forever."
      },
      {
        type: "concept",
        title: "Weighing the Cost of Each Dollar",
        paragraphs: [
          "Every source of funding has a hidden price. Debt's price is obvious: interest, plus the pressure of fixed repayments that come due whether or not sales are strong. Miss them and you can lose the business or your personal savings. Equity has a subtler price: you give away a share of every future dollar the company ever earns, and possibly some control over decisions. Selling 25% of a business that later becomes hugely valuable can cost a founder far more than any loan's interest ever would - which is why timing and terms matter enormously.",
          "Investors do not hand over money for nothing; they expect a return and they judge the deal by 'valuation' - what the whole company is deemed to be worth. If a startup is valued at $100,000 and an investor puts in $20,000, they get 20% ownership. A higher valuation lets founders raise the same cash while giving up less ownership, which is why founders work hard to show traction - real users, real revenue, real growth - before raising money. Traction is what turns a risky idea into a fundable business.",
          "The smartest founders match the funding source to the situation. Steady, predictable businesses (like a bakery) often suit a loan, because reliable sales can cover repayments. High-risk, high-growth ideas (like a new app) often suit equity, because there is no guaranteed cash flow to repay a loan, and investors accept that risk in exchange for a share of a potentially huge upside. Choosing the wrong tool - heavy debt for an unproven idea - is a common way promising startups collapse under payments they cannot yet afford."
        ],
        bullets: [
          "Debt's cost is interest plus fixed repayments due regardless of how sales are going.",
          "Equity's cost is a permanent share of future profits and some loss of control.",
          "Valuation sets how much ownership a given investment buys - higher valuation, less given up.",
          "Traction (users, revenue, growth) raises valuation and makes a startup fundable.",
          "Match the source to the risk: loans suit steady businesses, equity suits high-growth bets."
        ],
        realWorldExample: "A founder raises $50,000. At a $200,000 valuation she gives up 25%; a year later, after proving strong growth, the same $50,000 would only cost 10% at a $500,000 valuation. Waiting to build traction saved her a huge slice of a company that might one day be worth millions."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "biz5-mc1",
            question: "What is the key difference between debt and equity funding?",
            options: [
              "Debt is repaid with interest; equity trades ownership for cash",
              "Debt is always completely free while equity alone costs you interest",
              "Equity must be repaid every single month while debt never is",
              "There is honestly no real difference at all between the two"
            ],
            correctAnswer: 0,
            explanation: "With debt you borrow and repay with interest but keep full ownership. With equity you sell a share of the company for cash, giving up part of future profits instead of repaying a loan."
          },
          {
            id: "biz5-mc2",
            question: "A startup is valued at $100,000 and an investor puts in $25,000. They receive…",
            options: [
              "50% of the company",
              "25% of the company",
              "10% of the company",
              "100% of the company"
            ],
            correctAnswer: 1,
            explanation: "Ownership = investment / valuation = $25,000 / $100,000 = 25%. A higher valuation would let the founder raise the same cash while giving up a smaller share."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Decides How to Fund His Idea",
        narrative: "Leo has a new app idea with no revenue yet but big potential. He needs $30,000 to build it. A bank offers a loan with monthly repayments plus interest. An angel investor offers $30,000 for 25% equity. Leo has no steady cash flow to make loan payments.",
        details: [
          "The loan requires fixed monthly repayments starting soon, whether or not the app earns anything.",
          "The equity deal has no repayments, but Leo permanently gives up a quarter of future profits.",
          "With zero current revenue, missing loan payments could sink the business and his savings.",
          "High-risk, high-growth ideas with no cash flow are typically better suited to equity funding."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "biz5-aq1",
          question: "Given Leo has no revenue yet, which funding choice fits best and why?",
          options: [
            "The loan, because paying interest is always far cheaper than giving up equity",
            "Equity, because there are no fixed repayments while the app is unproven",
            "The loan, because he keeps a full 100% and all repayments are entirely optional",
            "Neither one; early startups should honestly never take any outside money at all"
          ],
          correctAnswer: 1,
          explanation: "With no cash flow, fixed loan repayments are dangerous. Equity carries no repayment pressure while the app is unproven, fitting a high-risk, high-growth idea. Loan repayments are not optional, and outside funding is often essential."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Funding comes mainly from debt (borrow and repay with interest) or equity (sell ownership).",
          "Bootstrapping uses savings and sales, maximizing control but limiting growth speed.",
          "Angel investors and VCs provide equity to fuel fast growth in exchange for ownership.",
          "Valuation sets how much ownership an investment buys; traction raises valuation.",
          "Match the source to the risk: loans for steady businesses, equity for high-growth bets."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "biz5-mastery1",
            question: "A founder who funds growth only from savings and early sales is…",
            options: [
              "Taking on venture capital",
              "Bootstrapping the business",
              "Issuing corporate bonds",
              "Selling equity to angels"
            ],
            correctAnswer: 1,
            explanation: "Bootstrapping means self-funding from personal money and revenue, keeping full control but limiting growth to the cash the business generates. No outside investors are involved."
          },
          {
            id: "biz5-mastery2",
            question: "The main hidden cost of raising equity is that you…",
            options: [
              "Must fully repay all of it monthly with interest",
              "Give up a permanent share of future profits",
              "Automatically lose your entire personal credit score",
              "Have to completely shut down within one single year"
            ],
            correctAnswer: 1,
            explanation: "Equity is not repaid, but you permanently share future profits and some control with investors. Selling a stake in a company that becomes hugely valuable can cost far more than any loan."
          },
          {
            id: "biz5-mastery3",
            question: "Why do founders work to show traction before raising money?",
            options: [
              "It lets them completely avoid ever paying any taxes",
              "It raises valuation so they give up less ownership",
              "It totally removes the need for an actual product",
              "It fully guarantees that investors simply cannot say no"
            ],
            correctAnswer: 1,
            explanation: "Traction - real users, revenue, and growth - raises the company's valuation, so the same cash costs a smaller ownership stake. It does not affect taxes or force any investor to invest."
          },
          {
            id: "biz5-mastery4",
            question: "Which type of business is generally best suited to a bank loan?",
            options: [
              "An unproven app with no revenue yet",
              "A steady bakery with reliable sales",
              "A pre-launch idea still on paper",
              "A risky venture expecting to lose money for years"
            ],
            correctAnswer: 1,
            explanation: "Loans require reliable repayments, so a steady business with predictable cash flow fits best. Risky, pre-revenue ventures usually suit equity, which carries no fixed repayment burden."
          },
          {
            id: "biz5-mastery5",
            question: "An angel investor is best described as…",
            options: [
              "A large bank that only ever offers business loans",
              "A wealthy individual investing in early startups",
              "A federal government agency giving out free grants",
              "A loyal customer who pre-orders upcoming products"
            ],
            correctAnswer: 1,
            explanation: "Angel investors are affluent individuals who put their own money into very early-stage companies in exchange for equity, often before larger venture capital firms get involved."
          },
          {
            id: "biz5-mastery6",
            question: "At a $500,000 valuation, how much ownership does a $50,000 investment buy?",
            options: [
              "25% of the company",
              "10% of the company",
              "50% of the company",
              "5% of the company"
            ],
            correctAnswer: 1,
            explanation: "Ownership = $50,000 / $500,000 = 10%. The higher the valuation, the smaller the share a fixed investment buys - which is why building value first protects the founder's stake."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // biz-6: Pricing
  // ─────────────────────────────────────────────
  {
    lessonId: "biz-6",
    sections: [
      {
        type: "concept",
        title: "Price Is a Decision, Not a Guess",
        paragraphs: [
          "Price is one of the most powerful levers a business has, yet many founders set it by nervously guessing or just copying a competitor. In reality, price should be a deliberate decision built on three inputs: your costs, what customers are willing to pay, and what rivals charge. There are three classic approaches. Cost-plus pricing adds a fixed markup on top of your cost - if a bracelet costs $4 to make and you want a 150% markup, you sell it for $10. It is simple and guarantees you cover costs, but it ignores whether customers would happily pay more.",
          "Value-based pricing flips the focus to the customer, setting price by how much the product is worth to them, not what it costs to make. A phone app that saves a busy professional two hours a week might justify $15 a month even if it costs almost nothing to run, because the value delivered is high. This approach can unlock far more profit than cost-plus, but it requires truly understanding your customer's problem and how much solving it is worth to them. Luxury brands are masters of value-based pricing.",
          "Competition-based pricing looks sideways at what rivals charge and positions your price relative to them - matching, undercutting, or deliberately going higher to signal premium quality. A new boba shop next to an established one might price a bit lower to win first-time customers, or price higher and lean on better ingredients. Most real businesses blend all three: costs set a floor you must not sell below, customer value sets a ceiling of what people will pay, and competitors shape where inside that range you land."
        ],
        bullets: [
          "Cost-plus pricing adds a markup to your cost; simple but ignores customer willingness to pay.",
          "Value-based pricing sets price by the worth to the customer, often unlocking more profit.",
          "Competition-based pricing positions your price relative to what rivals charge.",
          "Costs set a price floor; customer value sets a ceiling; competitors shape the middle.",
          "Price is a deliberate strategic decision, not a nervous guess or a blind copy."
        ],
        realWorldExample: "A student sells custom hoodies. They cost $18 to make. Cost-plus at a 50% markup gives $27. But she learns classmates happily pay $40 for team hoodies (value), while a rival charges $45 (competition). She lands at $39 - well above her cost floor, just under the rival, and matched to real willingness to pay."
      },
      {
        type: "concept",
        title: "Psychology, Elasticity, and Pricing Traps",
        paragraphs: [
          "Customers do not respond to price with pure logic, and smart pricing uses that. 'Charm pricing' - $9.99 instead of $10 - makes an item feel meaningfully cheaper even though it is one cent less, because people read the first digit. 'Anchoring' places an expensive option beside a cheaper one so the cheaper looks like a bargain; a $120 'premium' plan makes a $60 'standard' plan feel reasonable. And a 'decoy' option can nudge buyers toward the choice you most want to sell. These are not tricks so much as an understanding that price is a signal, not just a number.",
          "A crucial concept is price elasticity: how much demand changes when price changes. Some products are elastic, meaning a small price rise sends customers fleeing to alternatives - think of a generic snack with many substitutes. Others are inelastic, meaning people keep buying even as the price climbs, like a must-have concert ticket or a medicine. Knowing your elasticity is vital: raising the price of an inelastic product boosts profit, while raising the price of an elastic one can crush total sales and leave you worse off.",
          "Pricing has real traps. Pricing too low can be as dangerous as too high - it can signal poor quality, attract bargain hunters who never come back, and leave you unable to cover costs at any volume. Constant discounting trains customers to wait for sales and never pay full price, quietly destroying your margins. And a price that ignores your break-even simply guarantees losses. The goal is a price that reflects real value, respects your costs, and can be defended - not the lowest number you can survive."
        ],
        bullets: [
          "Charm pricing ($9.99) and anchoring make prices feel lower or more reasonable.",
          "Price elasticity measures how much demand shifts when the price changes.",
          "Raising price on inelastic products boosts profit; on elastic products it can crush sales.",
          "Pricing too low can signal low quality and attract disloyal bargain hunters.",
          "Chronic discounting trains customers to wait for sales and erodes your margins."
        ],
        realWorldExample: "A gym prices at $19.99 (charm) and shows a $49.99 'elite' tier beside it (anchor) to make the $19.99 look like a steal. Because members rarely cancel over a small increase (inelastic), a bump to $24.99 raises revenue with little drop in signups."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "biz6-mc1",
            question: "Setting price based on how much the product is worth to the customer is called…",
            options: [
              "Cost-plus pricing",
              "Value-based pricing",
              "Competition-based pricing",
              "Charm pricing"
            ],
            correctAnswer: 1,
            explanation: "Value-based pricing sets the price by the worth delivered to the customer, not by cost or rivals. It often unlocks more profit but requires deeply understanding the customer's problem."
          },
          {
            id: "biz6-mc2",
            question: "A product is 'inelastic' when…",
            options: [
              "Demand barely changes as its price rises",
              "Customers flee instantly at any price rise",
              "It has thousands of close substitutes",
              "It can only ever be sold at a loss"
            ],
            correctAnswer: 0,
            explanation: "Inelastic demand means people keep buying even as the price climbs, like a must-have item with few substitutes. That is the opposite of elastic demand, where buyers leave quickly."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sofia Prices Her Tutoring Service",
        narrative: "Sofia tutors math. Her only cost is her time. Local tutors charge $30-$40 an hour. Her students' parents care most about grades improving, and Sofia consistently raises students' scores. She is unsure whether to price low to fill her schedule or price on the value she delivers.",
        details: [
          "She has almost no direct cost, so cost-plus pricing would set an unhelpfully low floor.",
          "Rivals charge $30-$40, giving her a competitive range to reference.",
          "Parents value results highly, and Sofia has a track record of raising grades (high value).",
          "Pricing too low could actually signal she is less skilled than the $35 tutors nearby."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "biz6-aq1",
          question: "What is Sofia's smartest pricing approach here?",
          options: [
            "Charge just $8 an hour so she can fill up every single slot instantly",
            "Price around $35-$45 based on her proven value and the market",
            "Simply copy the exact rate of the very cheapest tutor she can possibly find",
            "Set the price far below her actual cost just to seem generous to everyone"
          ],
          correctAnswer: 1,
          explanation: "With low costs, high value, and a $30-$40 market, value-based pricing near or above that range fits best. Pricing far too low signals weak quality and wastes her results-driven value."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Price should be a deliberate decision using cost, customer value, and competitor prices.",
          "Cost-plus is simple; value-based often earns more; competition-based positions you in the market.",
          "Costs set a floor and customer value sets a ceiling on what you can charge.",
          "Elasticity tells you whether a price rise will boost profit or scare customers away.",
          "Pricing too low or discounting constantly can signal low quality and destroy margins."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "biz6-mastery1",
            question: "A maker adds a 40% markup to her $10 cost, selling at $14. This is…",
            options: [
              "Value-based pricing",
              "Cost-plus pricing",
              "Charm pricing",
              "Competition-based pricing"
            ],
            correctAnswer: 1,
            explanation: "Adding a fixed markup on top of cost is cost-plus pricing. It guarantees costs are covered but ignores what customers might happily pay or what rivals charge."
          },
          {
            id: "biz6-mastery2",
            question: "Why can value-based pricing earn more than cost-plus?",
            options: [
              "It always just sets the single lowest possible price",
              "It charges what the product is worth to customers",
              "It completely ignores the actual customers entirely every time",
              "It totally removes the ongoing need to make any sales"
            ],
            correctAnswer: 1,
            explanation: "Value-based pricing captures the full worth the product delivers, which can far exceed cost. A cheap-to-run app that saves customers hours can justify a high price that cost-plus would never reach."
          },
          {
            id: "biz6-mastery3",
            question: "Raising the price of a highly elastic product will most likely…",
            options: [
              "Cause a large drop in units sold",
              "Have no effect on sales at all",
              "Guarantee a much higher total profit every time",
              "Automatically improve the overall product quality somehow"
            ],
            correctAnswer: 0,
            explanation: "Elastic demand means buyers are price-sensitive and switch to substitutes easily, so a price rise sharply cuts sales. Inelastic products are the ones where a price rise safely boosts profit."
          },
          {
            id: "biz6-mastery4",
            question: "Placing a $120 plan next to a $60 plan to make the $60 look reasonable uses…",
            options: [
              "Anchoring",
              "Bootstrapping",
              "Amortization",
              "Elastic pricing"
            ],
            correctAnswer: 0,
            explanation: "Anchoring uses a high reference price to reshape perception, making a lower option feel like a bargain. It is a pricing-psychology tool, not a funding or accounting term."
          },
          {
            id: "biz6-mastery5",
            question: "A hidden danger of pricing a quality product too low is that it…",
            options: [
              "Always reliably maximizes the total long-term profit earned",
              "Can signal poor quality and draw disloyal buyers",
              "Forces all of your competitors to lower prices too",
              "Guarantees that your customers will happily pay more later"
            ],
            correctAnswer: 1,
            explanation: "A too-low price can make customers assume the product is cheap in quality and attract bargain hunters who never return. Low price is not automatically the safe choice."
          },
          {
            id: "biz6-mastery6",
            question: "The main risk of constantly running discounts is that it…",
            options: [
              "Trains customers to wait and never pay full price",
              "Permanently raises your per-unit contribution margin over the long run",
              "Makes your finished product legally much more valuable",
              "Completely removes every single one of your ongoing fixed costs"
            ],
            correctAnswer: 0,
            explanation: "Chronic discounting teaches customers that full price is for suckers, so they hold out for the next sale. That erodes margins and undermines the product's perceived value over time."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // biz-7: Business Planning
  // ─────────────────────────────────────────────
  {
    lessonId: "biz-7",
    sections: [
      {
        type: "concept",
        title: "A Business Plan Is a Roadmap, Not a Formality",
        paragraphs: [
          "A business plan is a written roadmap that explains what your business does, who it serves, how it makes money, and how it will grow. Beginners often think a plan is a boring document you write to impress a bank, but its real value is forcing you to think clearly before you spend money. Writing down your assumptions - who your customer is, what you will charge, what it costs - exposes gaps and fantasies while they are still cheap to fix. A plan turns 'I have a cool idea' into a testable set of decisions you can actually check against reality.",
          "A solid plan starts with the problem and the customer. Every real business solves a specific problem for a specific group of people. A vague plan says 'people like snacks'; a strong plan says 'busy high-schoolers want healthy grab-and-go snacks between practice and homework, and there is nothing good sold near the gym.' The tighter you define the customer and their problem, the easier every other decision becomes - what to build, how to price it, and where to sell it. Founders who skip this step often build something nobody specifically needs.",
          "The plan then lays out the model and the money. It describes the revenue model (how you charge), the cost structure (fixed and variable costs), and the path to break-even and profit. It includes simple financial projections: expected sales, costs, and profit over the first months or year. These numbers will never be perfectly right, but the act of estimating them reveals whether the idea can actually work. A plan that shows you must sell 10,000 units a month in a town of 2,000 people has just saved you from a costly mistake."
        ],
        bullets: [
          "A business plan explains what you do, who you serve, how you earn, and how you grow.",
          "Its real value is forcing clear thinking before you spend real money.",
          "Strong plans define a specific customer and the specific problem being solved.",
          "The plan covers revenue model, cost structure, and the path to break-even.",
          "Simple financial projections reveal whether the idea can realistically work."
        ],
        realWorldExample: "Before opening, a teen planning a car-detailing service writes it down: customers are busy neighbors, price is $40 per car, supplies cost $8 per car, and she needs 12 cars a month to cover her $360 in fixed costs. On paper she sees the plan works at 15-20 cars - realistic for her neighborhood."
      },
      {
        type: "concept",
        title: "From Plan to Action: Testing and Adapting",
        paragraphs: [
          "A great plan is useless if it just sits in a drawer. The best founders treat a plan as a living document and pair it with action, often starting with a 'minimum viable product' (MVP) - the simplest version of the offering that lets real customers try it. Instead of spending a year and thousands of dollars building the perfect app, you launch a basic one to a handful of users and learn what they actually want. Reality almost always differs from the plan, and the MVP surfaces those surprises early, when changing course is cheap.",
          "Plans must include goals you can measure, sometimes called milestones or KPIs (key performance indicators). 'Get big' is not a goal; 'reach 100 paying customers and $1,000 monthly revenue by month three' is. Measurable targets let you check whether you are on track and force honesty. If month three arrives with only 20 customers, the numbers tell you to investigate and adjust rather than drift along hoping. Good planning is less about predicting the future perfectly and more about setting checkpoints that catch problems early.",
          "Every serious plan also weighs risks and competition. What could go wrong - a key supplier quits, a bigger rival copies you, demand is lower than hoped - and what is your response? Thinking through risks in advance is not pessimism; it is preparation that keeps a setback from becoming a shutdown. The most valuable outcome of planning is a founder who can adapt: someone who set clear assumptions, measured results against them, and is ready to change the plan when reality provides better information. A plan you never revise is a plan you are not really using."
        ],
        bullets: [
          "Treat the plan as a living document paired with real-world action, not a one-time paper.",
          "Launch a minimum viable product (MVP) to learn from real customers cheaply.",
          "Set measurable goals (milestones/KPIs) instead of vague ambitions like 'get big.'",
          "Weigh risks and competitors in advance so a setback does not become a shutdown.",
          "The point of planning is the ability to adapt as reality teaches you more."
        ],
        realWorldExample: "A founder plans a meal-prep service and sets a KPI: 30 weekly subscribers by month two. She launches a bare-bones MVP with three menu options. At month two she has only 12 subscribers but learns most want vegetarian meals - so she adapts the menu instead of quietly failing."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "biz7-mc1",
            question: "What is the main real value of writing a business plan?",
            options: [
              "It fully guarantees the whole business will succeed",
              "It forces clear thinking before spending money",
              "It replaces the need to ever make sales",
              "It only impresses local banks and truly nothing more"
            ],
            correctAnswer: 1,
            explanation: "A plan's biggest benefit is forcing you to examine your assumptions - customer, pricing, costs - before spending real money, exposing flaws while they are still cheap to fix."
          },
          {
            id: "biz7-mc2",
            question: "A 'minimum viable product' (MVP) is…",
            options: [
              "The simplest version customers can actually try",
              "The most feature-packed and polished product you can possibly build",
              "A finished product sold only to investors",
              "A plan that is never shown to customers"
            ],
            correctAnswer: 0,
            explanation: "An MVP is the simplest usable version of your offering, launched to real customers so you can learn what they truly want before investing heavily in a full build."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jordan Plans a Sneaker-Cleaning Business",
        narrative: "Jordan wants to start a sneaker-cleaning service at school. He writes a plan: customers are students with expensive shoes, price is $12 per pair, supplies cost $3 per pair, and fixed costs are about $90 a month. He sets a goal and plans to test small before buying lots of supplies.",
        details: [
          "His plan defines a specific customer (students with pricey sneakers) and their problem (keeping shoes clean).",
          "Each pair contributes $12 - $3 = $9 toward covering his $90 in fixed costs.",
          "He needs 10 pairs a month to break even, then earns $9 profit per pair beyond that.",
          "He starts with a small MVP - cleaning a few friends' shoes first - to test demand cheaply."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "biz7-aq1",
          question: "Why is Jordan testing with a small MVP before buying lots of supplies smart planning?",
          options: [
            "It fully guarantees that he will get 100 paying customers almost immediately",
            "It lets him learn real demand cheaply before spending big",
            "It completely removes the ongoing need to ever track any of his costs",
            "It means he can freely skip pricing his service altogether for now"
          ],
          correctAnswer: 1,
          explanation: "An MVP surfaces real customer demand and surprises early, when changing course is cheap. It does not guarantee customers, and he still needs to track costs and set a price."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A business plan is a roadmap covering what you do, who you serve, and how you earn and grow.",
          "Its core value is forcing clear thinking and honest numbers before spending money.",
          "Define a specific customer and problem to make every other decision easier.",
          "Use an MVP and measurable goals (KPIs) to test the plan against reality cheaply.",
          "Plan for risks and stay ready to adapt - a plan you never revise is barely a plan."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "biz7-mastery1",
            question: "A strong business plan defines its customer as…",
            options: [
              "As incredibly broad and as vague as it can possibly be",
              "A specific group with a specific problem",
              "Only the founder's own close personal friends",
              "Literally everyone living in the entire country"
            ],
            correctAnswer: 1,
            explanation: "Tightly defining a specific customer and their specific problem makes every later decision - product, price, place - clearer. Vague, 'everyone' targeting usually leads to building what nobody specifically needs."
          },
          {
            id: "biz7-mastery2",
            question: "Which is a well-formed, measurable business goal?",
            options: [
              "Somehow become really quite successful at some point someday",
              "Reach 100 paying customers by month three",
              "Sell as much as we possibly can",
              "Make lots of people feel happy with our product"
            ],
            correctAnswer: 1,
            explanation: "A measurable goal has a number and a deadline, like 100 customers by month three, so you can check progress. Vague ambitions cannot be tracked or acted on."
          },
          {
            id: "biz7-mastery3",
            question: "Why include financial projections in a plan even though they will be imperfect?",
            options: [
              "They legally must always be exactly perfectly correct",
              "Estimating them reveals if the idea can work",
              "They fully replace the entire need for real customers",
              "They completely guarantee that investors will surely fund you"
            ],
            correctAnswer: 1,
            explanation: "The act of projecting sales, costs, and profit exposes whether the math can ever add up - like needing more customers than your market holds. Precision is not the point; the reality check is."
          },
          {
            id: "biz7-mastery4",
            question: "Launching an MVP before a full build mainly helps a founder…",
            options: [
              "Completely avoid ever writing any plan",
              "Learn what customers really want cheaply",
              "Skip pricing the product for now",
              "Fully guarantee instant lasting profitability today"
            ],
            correctAnswer: 1,
            explanation: "An MVP gets a simple version into real customers' hands so the founder learns actual demand and preferences early, when pivoting is cheap - not to guarantee profit or skip planning."
          },
          {
            id: "biz7-mastery5",
            question: "Thinking through risks and competitors in a plan is valuable because it…",
            options: [
              "Completely prevents any single problem from ever happening again",
              "Prepares responses so a setback isn't a shutdown",
              "Totally removes the ongoing need to earn revenue",
              "Fully guarantees that no rival will ever once appear"
            ],
            correctAnswer: 1,
            explanation: "Anticipating what could go wrong lets you plan responses in advance, so a supplier loss or new competitor becomes a manageable setback rather than a fatal surprise."
          },
          {
            id: "biz7-mastery6",
            question: "Treating a business plan as a 'living document' means you…",
            options: [
              "Write it once and never look again",
              "Revise it as reality teaches you more",
              "Hide it away from absolutely everyone permanently forever",
              "Copy it word for word from a direct competitor"
            ],
            correctAnswer: 1,
            explanation: "A living plan is updated as results come in and assumptions prove wrong. The ability to adapt is the real payoff of planning; a plan you never revise is one you are not truly using."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // psych-1: Why People Mismanage Money
  // ─────────────────────────────────────────────
  {
    lessonId: "psych-1",
    sections: [
      {
        type: "concept",
        title: "Money Choices Are Emotional, Not Just Math",
        paragraphs: [
          "People assume money decisions are like math homework: add up the numbers and pick the smart answer. In reality, your brain treats spending as an emotional event. Buying a $60 hoodie can trigger the same reward chemical, dopamine, as winning a game. That rush is why a sale sign feels exciting even when you do not need the item. Understanding this is the first step to managing money well, because you cannot control a habit you think is purely logical when it is actually driven by feelings you barely notice.",
          "A big reason people mismanage money is present bias: we value a reward now far more than a bigger reward later. Imagine a friend offers you $20 today or $30 next month. Many teens grab the $20, even though waiting earns an easy $10. That same wiring makes people spend a paycheck fast and skip saving. It is not stupidity; it is a built-in shortcut from a time when future planning mattered less. Once you name present bias, you can plan around it instead of losing to it every time.",
          "Another trap is mental accounting, where we treat identical dollars differently based on their label. A teen might blow $50 of birthday money on snacks because it feels like fun money, while guarding $50 from a paycheck because it feels earned. But a dollar is a dollar; it buys the same things and grows the same way if saved. When you catch yourself thinking money is somehow free or does not count, that is mental accounting steering you toward choices you would reject if you saw the full picture clearly. The same tax refund that feels like a windfall to blow could pay down a debt or start an emergency fund, and treating it as ordinary money is what quietly separates people who build savings from people who never seem to keep any."
        ],
        bullets: [
          "Spending triggers dopamine, so purchases feel emotionally rewarding, not purely logical.",
          "Present bias makes a reward now feel bigger than a larger reward later.",
          "Mental accounting tricks you into treating gift money as less real than earned money.",
          "You cannot fix a habit you wrongly believe is fully rational.",
          "Naming a bias is the first step to planning around it."
        ],
        realWorldExample: "Jordan gets $100 for his birthday and spends $70 in a weekend on games and snacks, calling it fun money. The next week his $100 paycheck sits untouched because it felt earned. Same $200, but mental accounting made one pile feel disposable, so half his birthday cash vanished with nothing to show for it."
      },
      {
        type: "concept",
        title: "The Traps That Repeat Themselves",
        paragraphs: [
          "One repeat offender is the sunk-cost trap: throwing good money after bad because you already spent some. Say you paid $15 for a mobile game and stopped enjoying it, but keep buying $5 upgrades so the first $15 was not wasted. That first $15 is gone no matter what; spending more only adds to the loss. Smart money managers ask, Would I start this today from scratch? If the answer is no, they stop, no matter how much they already sank into it.",
          "Lifestyle creep is a slower trap. When income rises, spending quietly rises to match, so you never feel richer. A teen who starts earning $200 a month babysitting might soon spend all $200 on eating out that used to be occasional. The raise disappears into habits. The fix is to decide in advance where new money goes, saving a set share before the extra cash reshapes your normal. Otherwise every raise feels normal within weeks and your savings never grow at all.",
          "Finally, people mismanage money by avoiding it: not checking balances, ignoring a growing subscription list, or refusing to look at what they owe. Avoidance feels safer than facing bad news, but it lets small problems grow. A forgotten $9.99 streaming charge becomes $120 a year. The people who handle money best are not fearless; they simply look, even when it is uncomfortable. Facing the numbers early keeps a tiny leak from sinking the whole boat over time."
        ],
        bullets: [
          "Sunk-cost thinking keeps you spending on something just because you already paid.",
          "Lifestyle creep quietly raises spending whenever income rises, erasing the raise.",
          "Ask Would I start this today? to escape sunk-cost decisions.",
          "Avoiding your balances lets small charges grow into large yearly losses.",
          "Deciding where new money goes in advance protects your savings."
        ],
        realWorldExample: "Priya forgets a $9.99 music app she stopped using. Because she never checks her statements, it charges quietly for a year, costing about $120 for nothing. A five-minute review would have caught it in month one, turning a $120 mistake into a $10 one."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych1-deepmc1",
            question: "What does present bias make people do?",
            options: [
              "Value a smaller reward now over a bigger one later",
              "Always pick the largest future payout available in almost every situation",
              "Treat earned money and gift money identically for the typical teenager",
              "Check their bank balance more often than needed"
            ],
            correctAnswer: 0,
            explanation: "Present bias is the pull toward a reward now even when waiting would earn more. It is why people spend fast and struggle to save for later goals."
          },
          {
            id: "psych1-deepmc2",
            question: "You paid $15 for a game you no longer enjoy but keep buying upgrades so it is not wasted. This is…",
            options: [
              "A smart way to budget for entertainment",
              "The sunk-cost trap",
              "A healthy form of mental accounting",
              "A clear example of lifestyle creep"
            ],
            correctAnswer: 1,
            explanation: "The $15 is gone regardless. Spending more only grows the loss. Sunk-cost thinking keeps people committed to bad choices because of money already spent."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devon's Disappearing Paychecks",
        narrative: "Devon, 16, just started a part-time job earning $240 a month. Two months in, his account is nearly empty every payday and he cannot explain where it went. He never checks his statements and treats each paycheck as money to enjoy now, figuring he can save later once he earns more.",
        details: [
          "His new income quietly raised his eating-out habit from occasional to almost daily - classic lifestyle creep.",
          "Present bias pushes him to enjoy cash now, so saving later keeps getting postponed.",
          "Because he avoids his statements, two forgotten app subscriptions keep charging unnoticed.",
          "He tells himself paycheck money is for fun, a mental-accounting label that greenlights fast spending."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych1-deepaq1",
          question: "Which single change would most directly fix Devon's disappearing paychecks?",
          options: [
            "Wait until he earns more before saving for the typical teenager",
            "Move a set amount to savings each payday first",
            "Spend faster so nothing sits idle in almost every situation",
            "Stop earning income to avoid the problem"
          ],
          correctAnswer: 1,
          explanation: "Saving a fixed share the moment he is paid beats present bias and lifestyle creep by protecting money before habits absorb it. Waiting to earn more just repeats the cycle at a higher income."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Money decisions are emotional; dopamine makes spending feel rewarding.",
          "Present bias overvalues rewards now and undermines saving for later.",
          "Mental accounting makes some dollars feel less real than others.",
          "Sunk-cost thinking and lifestyle creep quietly drain money over time.",
          "Facing your balances early stops small leaks from becoming big losses."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "psych1-deepmastery1",
            question: "Why are money decisions harder to control than people expect?",
            options: [
              "They require advanced college-level math in the majority of cases",
              "They are emotional, driven by feelings like reward",
              "They are illegal to make before age 18",
              "They never involve any real trade-offs"
            ],
            correctAnswer: 1,
            explanation: "Spending sparks dopamine, so choices feel emotional rather than purely logical. You cannot manage a habit well if you wrongly assume it is fully rational."
          },
          {
            id: "psych1-deepmastery2",
            question: "A friend offers $20 now or $30 in a month, and you grab the $20. Which bias is this?",
            options: [
              "Sunk-cost trap",
              "Mental accounting",
              "Present bias",
              "Lifestyle creep"
            ],
            correctAnswer: 2,
            explanation: "Present bias makes a reward now feel bigger than a larger reward later, so you give up an easy $10. It is the same wiring that makes saving feel hard."
          },
          {
            id: "psych1-deepmastery3",
            question: "You guard your paycheck but blow gift money freely. What is happening?",
            options: [
              "Mental accounting labels the piles differently",
              "Present bias is making you save more",
              "Sunk costs are forcing the spending",
              "Avoidance is hiding your balances"
            ],
            correctAnswer: 0,
            explanation: "Mental accounting treats identical dollars differently by label, so gift money feels disposable. A dollar buys the same things no matter where it came from."
          },
          {
            id: "psych1-deepmastery4",
            question: "Your babysitting income rises but your savings do not grow at all. The likely cause is…",
            options: [
              "The sunk-cost trap draining the raise",
              "Lifestyle creep absorbing the raise",
              "Mental accounting of your gift money",
              "Checking your balances far too often"
            ],
            correctAnswer: 1,
            explanation: "Lifestyle creep quietly raises spending to match new income, so the raise disappears into habits. Deciding where new money goes first prevents it."
          },
          {
            id: "psych1-deepmastery5",
            question: "What is the best question to escape a sunk-cost decision?",
            options: [
              "How much have I already spent on this?",
              "Would I start this today from scratch?",
              "Who else is spending money on this?",
              "Can I hide this purchase from myself?"
            ],
            correctAnswer: 1,
            explanation: "Asking whether you would begin today ignores money already gone and focuses on the choice ahead. Past spending is sunk and cannot be recovered by spending more."
          },
          {
            id: "psych1-deepmastery6",
            question: "Why is avoiding your bank statements a costly habit?",
            options: [
              "It automatically raises your interest rate whenever money feels tight",
              "It lets small forgotten charges grow unnoticed",
              "It is against most banking rules",
              "It doubles the value of your savings"
            ],
            correctAnswer: 1,
            explanation: "Avoidance feels safe but lets tiny charges, like a $9.99 subscription, run all year. Looking early keeps a small leak from becoming a big loss."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // psych-2: Delayed Gratification
  // ─────────────────────────────────────────────
  {
    lessonId: "psych-2",
    sections: [
      {
        type: "concept",
        title: "The Skill Of Waiting Well",
        paragraphs: [
          "In the first lesson you met present bias - the pull toward a reward now over a bigger one later. It happens because your brain runs two competing systems: a fast, emotional one that craves instant rewards like snacks, likes, and quick buys, and a slow, thoughtful one that plans for the future. Delayed gratification is the skill of letting the slow system win the choices that matter: taking a bigger reward later over a smaller one now. In the famous marshmallow study, kids who could wait for two treats instead of one tended to do better later in life - not because waiting is magic, but because pausing a craving lets you make choices that pay off.",
          "The reason waiting pays is compound growth. Save $50 a month starting as a teen at around 7% a year and you could end up with far more than someone who starts ten years later, even if they save more monthly - time does the heavy lifting. The flip side is opportunity cost: every instant reward quietly costs whatever that money could have become. A $5 daily energy drink is about $150 a month and roughly $1,800 a year - the same money that could fund a trip or an emergency cushion. So a $200 impulse buy is not really a $200 choice; it is the choice to give up what that $200 could grow into.",
          "Waiting is hard because instant rewards feel vivid while future ones feel fuzzy and far away. Your brain discounts the future automatically. The trick is to make the future concrete: name the goal, picture it, and give it a deadline. Wanting savings in general is weak; wanting $600 for a laptop by December is strong. When the later reward feels real and specific, your brain stops treating it like a vague someday and starts protecting it, which makes saying no to small splurges dramatically easier. Writing the goal somewhere you see it daily, or keeping a photo of it on your phone, keeps the future reward present in your mind exactly when a random craving to spend shows up out of nowhere."
        ],
        bullets: [
          "Your brain has a fast reward system and a slow planning system.",
          "Compound growth rewards early savers because time multiplies money.",
          "Every instant reward has an opportunity cost - what that money could become.",
          "The brain discounts fuzzy future rewards, so waiting feels hard.",
          "Concrete goals with deadlines make the future reward feel real."
        ],
        realWorldExample: "Two friends save for retirement. Amara saves $50 a month from age 15; Ben starts at 25 saving the same. At around 7% growth, Amara's ten-year head start can leave her with more money by 65 even though Ben saves for just as long, because her early dollars compounded the longest."
      },
      {
        type: "concept",
        title: "Building The Habit On Purpose",
        paragraphs: [
          "You do not need superhuman willpower to wait; you need systems. One is the cooling-off rule: for any want over a set amount, say $40, wait 48 hours before buying. Most impulse urges fade, and you keep only the purchases you still want after the craving passes. This works because it separates the emotional spike from the decision. The store designed the moment to feel urgent; the pause returns the choice to the calmer, future-focused part of your brain that would rather save the money.",
          "The most powerful systems redesign your environment so the good choice is the easy one. Your fast brain reacts to whatever is in front of it: if a store's app is one tap away, you buy. Make instant rewards harder to reach - delete shopping apps, leave cards at home - and make saving effortless by automating it, so a set amount moves to savings the second you are paid. You never feel automated savings as money given up, so there is no craving to resist. Willpower is a limited battery; a well-designed setup spends it once, when you set the rules, instead of every single day.",
          "Finally, make waiting feel rewarding instead of empty. Keep the goal visible and named - a jar or app labeled Concert Fund - so every day you do not spend reads as progress you can watch. Celebrate milestones: if the goal is $600, mark every $150 as a win, which releases the same reward feeling a purchase would. You can even bundle a dull saving habit with a small treat - like logging your spending only while watching a favorite show - so your fast brain cooperates instead of fighting. People who master patience are not stricter than everyone else; they simply built a life where waiting is the easy default and impulse buying takes effort."
        ],
        bullets: [
          "A 48-hour cooling-off rule lets impulse urges fade before you buy.",
          "Redesign your setup: make impulse buys hard and saving automatic.",
          "Willpower is limited; a good environment decides once, not daily.",
          "A named, visible goal makes waiting feel like progress.",
          "Milestones and bundling give waiting its own reward feeling."
        ],
        realWorldExample: "Leo wants $600 for a used bike. He automates $60 a month into a Bike Fund and celebrates each $150 mark with a cheap treat. The visible progress and small wins make waiting ten months feel motivating instead of miserable, and he never once relies on raw willpower to resist."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych2-deepmc1",
            question: "Why do early savers often end up with more money than later ones?",
            options: [
              "Banks pay teens a higher interest rate",
              "Compound growth gives early dollars more time",
              "Younger people spend less on everything for the average shopper",
              "Later savers are legally taxed more"
            ],
            correctAnswer: 1,
            explanation: "Compound growth multiplies money over time, so dollars saved early grow the longest. A head start can beat saving more money later."
          },
          {
            id: "psych2-deepmc2",
            question: "How does a 48-hour cooling-off rule help you save?",
            options: [
              "It raises the price so you buy less",
              "It lets the impulse urge fade before deciding",
              "It hides the item from stores on a day-to-day basis",
              "It automatically refunds purchases in everyday life"
            ],
            correctAnswer: 1,
            explanation: "Most impulse cravings fade within a day or two. Waiting separates the emotional spike from the decision, so you keep only purchases you truly want."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sofia Versus The Flash Sale",
        narrative: "Sofia, 15, is saving $600 for a laptop by December. One evening a flash sale pops up on $130 headphones marked down for the next hour. The countdown timer makes it feel urgent, and she almost taps buy, which would set her laptop goal back by more than two months.",
        details: [
          "The one-hour timer is designed to trigger present-focused urgency and beat her patience.",
          "Her laptop goal is concrete with a deadline, which makes the future reward feel real.",
          "Applying a 48-hour cooling-off rule would let the headphone craving fade first.",
          "Spending $130 is really spending part of her December laptop, not just tonight's cash."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych2-deepaq1",
          question: "What is Sofia's smartest move when the flash sale appears?",
          options: [
            "Buy now before the timer runs out in the majority of cases",
            "Wait 48 hours to see if she still wants them",
            "Cancel her laptop goal entirely most of the time",
            "Borrow money to buy both items as a general rule"
          ],
          correctAnswer: 1,
          explanation: "The cooling-off rule defeats the timer's fake urgency. If she still wants the headphones in two days, she can decide calmly; usually the craving fades and her laptop goal stays on track."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Your brain's fast system craves now; the slow one plans for later.",
          "Compound growth and opportunity cost both reward patience.",
          "Concrete goals with deadlines make the future reward feel real.",
          "Environment design, automation, and cooling-off beat willpower.",
          "Milestones and bundling make patience feel rewarding, not empty."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "psych2-deepmastery1",
            question: "What does delayed gratification actually mean?",
            options: [
              "Never spending money on anything fun more often than not",
              "Choosing a bigger later reward over a smaller now",
              "Buying immediately whenever you see a sale without much thought",
              "Only saving money you inherit or are given"
            ],
            correctAnswer: 1,
            explanation: "It is the skill of pausing a smaller instant reward to gain a larger one later. That pause is what lets money grow and goals get reached."
          },
          {
            id: "psych2-deepmastery2",
            question: "Why is a $200 impulse buy really more than a $200 choice?",
            options: [
              "Stores always add hidden $200 fees in a downturn",
              "You give up what that money could grow into",
              "The tax on $200 purchases is very high",
              "Impulse buys must be repaid with interest under most conditions"
            ],
            correctAnswer: 1,
            explanation: "Spent money cannot compound. The true cost is the future amount that $200 could have become if saved, which reframes the purchase as a trade."
          },
          {
            id: "psych2-deepmastery3",
            question: "Why does naming a specific goal with a deadline help you wait?",
            options: [
              "It legally locks the money away",
              "It makes the future reward feel concrete",
              "It forces stores to lower their prices",
              "It removes the need to save at all"
            ],
            correctAnswer: 1,
            explanation: "The brain discounts fuzzy future rewards. A goal like $600 by December feels real and specific, so your brain starts protecting it from small splurges."
          },
          {
            id: "psych2-deepmastery4",
            question: "Why does keeping a named goal, like a 'Concert Fund' jar, visible help you wait?",
            options: [
              "Seeing it turns each day of not spending into visible progress",
              "It legally prevents you from spending the money",
              "It automatically doubles your savings rate over the years",
              "It hides the goal so you forget about spending entirely"
            ],
            correctAnswer: 0,
            explanation: "A visible, named goal keeps the reward in sight, so waiting reads as progress you can watch rather than deprivation you grind through."
          },
          {
            id: "psych2-deepmastery5",
            question: "How do milestone celebrations support delayed gratification?",
            options: [
              "They cancel the original savings goal",
              "They give waiting its own reward feeling",
              "They force you to spend all your savings",
              "They raise the interest on your account"
            ],
            correctAnswer: 1,
            explanation: "Marking each step as a win releases the reward feeling a purchase would, so patience stops feeling empty and progress feels good along the way."
          },
          {
            id: "psych2-deepmastery6",
            question: "What is the real reason instant rewards beat future ones in your mind?",
            options: [
              "Future rewards are usually smaller during tough times",
              "The brain discounts fuzzy, far-off rewards",
              "Instant rewards are always free",
              "Waiting is against human nature entirely"
            ],
            correctAnswer: 1,
            explanation: "Your brain automatically shrinks the value of vague, distant rewards. Making the future concrete counteracts this so waiting becomes far easier."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // psych-4: Scarcity vs Abundance Mindset
  // ─────────────────────────────────────────────
  {
    lessonId: "psych-4",
    sections: [
      {
        type: "concept",
        title: "How A Scarcity Mindset Traps You",
        paragraphs: [
          "A scarcity mindset is the feeling that there is never enough, which narrows your thinking to right now. When people feel money is scarce, research shows they focus so hard on the immediate shortage that they make worse long-term choices, like taking a costly payday loan to cover this week. It is not about how much you actually have; a teen with an allowance and a busy CEO can both feel scarcity. The mind, under a sense of lack, tunnels onto the urgent and loses sight of the important, which quietly makes the shortage worse.",
          "Scarcity thinking shows up as specific money traps. You might hoard cash out of fear yet still overspend on small comforts to feel better about lack. You may avoid learning about investing because it feels like something only rich people do, closing the door on growth. Scarcity can also make you undervalue yourself, accepting the first low offer for your work because you fear nothing better will come. Each of these is the mind reacting to a feeling of not enough, and each one tends to keep you stuck exactly where you are.",
          "The sneaky part is that scarcity feels like realism. When you are worried, cautious tunnel vision feels responsible. But there is a difference between being genuinely broke, which is a math problem, and having a scarcity mindset, which is a thought pattern. The math problem is solved with income and budgeting. The thought pattern needs a different fix, because it will sabotage you even after the numbers improve. Recognizing the mindset itself, separate from your bank balance, is the first move toward loosening its grip on your decisions. Plenty of people who finally start earning well still feel just as anxious and stuck as before, proof that the mindset, not the money, was driving the stress all along."
        ],
        bullets: [
          "A scarcity mindset is the feeling of never enough, regardless of actual wealth.",
          "It narrows focus to the urgent now, hurting long-term choices.",
          "It shows up as fear-hoarding, avoiding investing, and undervaluing yourself.",
          "Being broke is a math problem; scarcity is a thought pattern.",
          "The mindset can sabotage you even after your finances improve."
        ],
        realWorldExample: "Tanya, 17, refuses to learn about investing because it feels like a rich-person thing, and she takes the first babysitting rate offered without negotiating. Neither choice is about a real shortage; both come from a scarcity mindset that keeps her earning and growing less than she easily could."
      },
      {
        type: "concept",
        title: "Shifting Toward Abundance, Grounded In Reality",
        paragraphs: [
          "An abundance mindset is the belief that resources and opportunities can grow, so you act to expand them rather than just protect a fixed pile. It is not delusional positive thinking or pretending money is unlimited. It is the practical stance that your income, skills, and options are not permanently capped. Someone with this mindset treats a low pay offer as a starting point to negotiate, sees a new skill as an investment, and views saving as building something, not just going without. The shift changes behavior, which over time actually changes results.",
          "Abundance thinking also frees you from destructive comparison. Scarcity says if you win, I lose, so someone else's success feels like a threat. Abundance sees that opportunities are not a single pie with fixed slices; markets grow, new jobs appear, and one person's raise does not cap yours. This matters emotionally, because scarcity-driven envy pushes people into keeping-up spending they cannot afford. When you genuinely believe there is room for your own growth, you stop trying to prove your worth through purchases and start building it through choices.",
          "The key is grounding abundance in action, not just attitude. Believing opportunities exist means little unless you do the practical work: build a skill, ask for the raise, start the $20 savings habit. Abundance without action is just wishful thinking, and scarcity without a plan is just anxiety. The healthiest money mindset combines an abundance belief that growth is possible with the disciplined habits that make it real. You expect more from the future and then take the small, steady steps that actually move you toward it."
        ],
        bullets: [
          "Abundance mindset means resources and opportunities can grow, not stay fixed.",
          "It is practical realism, not pretending money is unlimited.",
          "It frees you from envy-driven, keeping-up spending.",
          "Opportunities are not a single fixed pie; growth creates more.",
          "Abundance only works when paired with real, disciplined action."
        ],
        realWorldExample: "After noticing her scarcity habits, Tanya starts a free investing course and counters her next babysitting offer with a polite higher rate. Both moves come from believing she can grow. Within months she earns 20% more per job and understands how saving builds wealth, results her old mindset would have blocked."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych4-deepmc1",
            question: "What is a scarcity mindset?",
            options: [
              "Having a low bank balance right now in almost every situation",
              "The feeling of never enough that narrows thinking",
              "A plan to save a fixed amount monthly",
              "Believing opportunities can always grow for regular customers"
            ],
            correctAnswer: 1,
            explanation: "A scarcity mindset is a thought pattern of not enough that tunnels focus onto the urgent now. It can hit anyone, regardless of how much they actually have."
          },
          {
            id: "psych4-deepmc2",
            question: "How is an abundance mindset best described?",
            options: [
              "Pretending money is truly unlimited for the typical teenager",
              "Believing resources and options can grow, plus acting",
              "Spending freely because more will appear most of the time",
              "Avoiding all risk to protect what you have"
            ],
            correctAnswer: 1,
            explanation: "Abundance mindset is the grounded belief that income, skills, and opportunities can expand, combined with the disciplined action that makes growth real."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Reactions To The Same Job Fair",
        narrative: "Two friends, Rae and Mateo, attend the same job fair. Both are offered similar starting roles at low pay. Rae accepts immediately, sure nothing better exists. Mateo asks about growth, negotiates a slightly higher start, and signs up for a free training the company offers. Same opportunity, two mindsets, two very different paths forming.",
        details: [
          "Rae's instant acceptance reflects scarcity: fear that no better offer will come.",
          "Mateo treats the low offer as a starting point, a hallmark of abundance thinking.",
          "Mateo pairs his belief in growth with action by joining the free training.",
          "Neither faces a real shortage yet; their mindsets, not their wallets, drive the split."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych4-deepaq1",
          question: "What makes Mateo's approach an abundance mindset rather than wishful thinking?",
          options: [
            "He assumes money is unlimited for the average shopper",
            "He pairs belief in growth with concrete action",
            "He refuses the job to wait for a perfect one",
            "He spends freely expecting more to come"
          ],
          correctAnswer: 1,
          explanation: "Abundance works only when belief is grounded in action. Mateo both believes he can grow and does the practical work: negotiating and training. Belief without action would just be wishful thinking."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Scarcity mindset is a feeling of not enough that narrows your thinking.",
          "It causes fear-hoarding, avoiding growth, and undervaluing yourself.",
          "Being broke is math; scarcity is a mindset that can outlast the shortage.",
          "Abundance mindset means believing resources can grow, without delusion.",
          "Abundance only pays off when paired with disciplined action."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "psych4-deepmastery1",
            question: "Why can a scarcity mindset hit someone who is not actually poor?",
            options: [
              "Because it is a thought pattern, not a balance",
              "Because banks require it by law in the majority of cases",
              "Because rich people never worry at all",
              "Because it only affects business owners whenever money feels tight"
            ],
            correctAnswer: 0,
            explanation: "Scarcity is a feeling of not enough, so even a wealthy person can have it. It is separate from your real bank balance, which is why noticing it matters."
          },
          {
            id: "psych4-deepmastery2",
            question: "What does scarcity thinking do to your focus?",
            options: [
              "Broadens it toward long-term plans for the average shopper",
              "Narrows it onto the urgent right now",
              "Removes all your money worries in everyday life",
              "Makes you ignore immediate needs"
            ],
            correctAnswer: 1,
            explanation: "Scarcity tunnels attention onto the immediate shortage, crowding out important long-term choices. That tunnel vision often makes the shortage worse."
          },
          {
            id: "psych4-deepmastery3",
            question: "How does scarcity differ from simply being broke?",
            options: [
              "Being broke is permanent; scarcity is temporary at least at first",
              "Being broke is math; scarcity is a thought pattern",
              "They are exactly the same thing especially early on",
              "Scarcity only affects rich people on a day-to-day basis"
            ],
            correctAnswer: 1,
            explanation: "Being broke is a numbers problem fixed by income and budgeting. Scarcity is a mindset that can sabotage you even after the numbers improve."
          },
          {
            id: "psych4-deepmastery4",
            question: "Which is an example of scarcity-driven behavior?",
            options: [
              "Negotiating a low pay offer upward",
              "Accepting the first low offer out of fear",
              "Investing $20 a month steadily in the short term",
              "Taking a free skill-building course with very little effort"
            ],
            correctAnswer: 1,
            explanation: "Grabbing the first low offer because you fear nothing better exists is classic scarcity. The other options reflect an abundance approach to growth."
          },
          {
            id: "psych4-deepmastery5",
            question: "Why does abundance mindset reduce keeping-up spending?",
            options: [
              "It makes purchases legally cheaper more often than not",
              "It removes envy since your growth is possible too",
              "It bans you from buying anything without much thought",
              "It guarantees you will out-earn friends in a downturn"
            ],
            correctAnswer: 1,
            explanation: "Abundance sees others' success as non-threatening because opportunity is not a fixed pie. Without scarcity-driven envy, you stop proving worth through purchases."
          },
          {
            id: "psych4-deepmastery6",
            question: "What must accompany an abundance belief for it to work?",
            options: [
              "Disciplined, concrete action",
              "A very large bank balance",
              "Ignoring all budgeting rules",
              "Constant positive self-talk alone"
            ],
            correctAnswer: 0,
            explanation: "Abundance without action is wishful thinking. Believing growth is possible only pays off when you build skills, negotiate, and save consistently."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // psych-5: Money & Emotions
  // ─────────────────────────────────────────────
  {
    lessonId: "psych-5",
    sections: [
      {
        type: "concept",
        title: "Feelings Are Driving The Wheel",
        paragraphs: [
          "Almost every money decision carries an emotion, even when it feels rational. Sadness, boredom, and stress commonly trigger spending, because buying something delivers a quick mood boost. This is retail therapy: the purchase does not fix the sadness, but for a moment it distracts from it. The problem is the boost fades fast while the charge stays on your account. Recognizing that a feeling, not a real need, is driving a purchase is the single most useful skill in emotional money management, because you can only pause a pattern you can see.",
          "Different emotions push spending in different directions. Excitement makes you overpay in the heat of the moment, like bidding too high or grabbing every add-on. Fear makes you either freeze or panic-buy, such as stockpiling far more than you need. Social emotions like embarrassment push you to spend to fit in, buying a brand you cannot afford so you are not judged. None of these feelings are wrong to have; the danger is letting them make the decision automatically. The goal is to feel the emotion and still choose on purpose.",
          "Emotions also shape saving, not just spending. Anxiety can make someone hoard cash far beyond what is wise, missing chances to grow it, while overconfidence after a lucky win can make someone risk money recklessly. Even guilt plays a role: people who feel guilty about money sometimes avoid looking at it entirely, which lets problems grow. The healthiest approach is not to become emotionless about money, which is impossible, but to notice the feeling, name it, and give yourself a beat before acting on it. A person who wins a bet and immediately feels unbeatable often gives it all back on a bigger, dumber wager, showing how an emotional high can be just as costly as an emotional low."
        ],
        bullets: [
          "Sadness, boredom, and stress commonly trigger mood-boosting spending.",
          "Retail therapy distracts from a feeling but does not fix it.",
          "Excitement, fear, and embarrassment each push spending differently.",
          "Emotions shape saving too, from anxious hoarding to reckless overconfidence.",
          "The goal is to notice and name a feeling, then choose on purpose."
        ],
        realWorldExample: "After a rough week, Kayla scrolls a shopping app and buys $45 of clothes she does not need. The purchase lifts her mood for an hour, then the bad feeling returns and the charge remains. The spending treated a sad mood, not a real need, which is why it did not actually help."
      },
      {
        type: "concept",
        title: "Building An Emotional Money Toolkit",
        paragraphs: [
          "The first tool is the pause. When you feel an urge to buy, ask one question: What am I feeling right now? Simply labeling the emotion, bored, stressed, jealous, weakens its grip, because naming a feeling shifts your brain from reacting to reflecting. If the honest answer is that you are trying to fix a mood, that is your signal to wait. Often a ten-minute walk, a message to a friend, or a snack meets the real need for far less than a purchase would, and the urge quietly passes.",
          "The second tool is the cooling-off pause you met in the Delayed Gratification lesson, aimed now at feelings: no major money decision within 24 hours of a strong emotion. Big money moves made right after a breakup, a fight, or a huge win tend to be poor ones. This does not mean never spending; it means letting the emotional storm pass so the calmer part of your brain makes the call. Casinos and flash sales profit from emotional heat; the cooling window quietly takes that advantage back and hands it to you.",
          "The third tool is building planned outlets so emotions do not ambush your budget. Keep a small, guilt-free fun fund for genuine treats, and a list of free mood-lifters, music, a walk, a game, for the times spending is really about feelings. This way, when emotions rise, you have a plan ready instead of only a shopping app. Managing money emotionally is not about shutting feelings off; it is about designing your responses in advance so that feelings inform your choices without secretly controlling them."
        ],
        bullets: [
          "Pausing to name the feeling shifts your brain from reacting to reflecting.",
          "If spending is really fixing a mood, that is a signal to wait.",
          "Avoid big money moves within 24 hours of a strong emotion.",
          "A guilt-free fun fund keeps planned treats from becoming ambushes.",
          "A list of free mood-lifters gives emotions a non-spending outlet."
        ],
        realWorldExample: "Kayla makes a rule: when she wants to buy after a bad day, she names the feeling and takes a ten-minute walk first. Most urges fade, and she keeps a $20 monthly fun fund for real treats. Her impulse spending drops sharply without her ever having to feel guilty."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych5-deepmc1",
            question: "What is retail therapy?",
            options: [
              "A store's official return policy under most conditions",
              "Buying to distract from a bad feeling",
              "A budgeting method for emotions across most markets",
              "A therapist who manages your money"
            ],
            correctAnswer: 1,
            explanation: "Retail therapy is spending to boost a low mood. The boost fades fast while the charge stays, because it treats a feeling rather than a real need."
          },
          {
            id: "psych5-deepmc2",
            question: "Why does naming your emotion before buying help?",
            options: [
              "It lowers the item's price as the years pass",
              "It shifts your brain from reacting to reflecting",
              "It earns a discount for waiting during tough times",
              "It hides the purchase from others"
            ],
            correctAnswer: 1,
            explanation: "Labeling a feeling like bored or stressed weakens its grip and moves you from automatic reaction to thoughtful reflection, so you can choose on purpose."
          }
        ]
      },
      {
        type: "scenario",
        title: "Andre After A Bad Game",
        narrative: "Andre, 16, loses an important match and feels awful. On the bus home he opens a game store and nearly spends $30 on new items he has wanted, telling himself it will cheer him up. His account is already tight this month, and the urge feels strongest right when his emotions are highest.",
        details: [
          "The urge spikes immediately after a strong emotion, a classic risky moment.",
          "The purchase is aimed at fixing his mood, not meeting a real need.",
          "A 24-hour cooling rule would let the emotional storm pass before he decides.",
          "A free mood-lifter, like messaging a friend, could meet the real need for $0."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych5-deepaq1",
          question: "What is Andre's healthiest response to the urge?",
          options: [
            "Buy now while it will cheer him up",
            "Name the feeling and wait 24 hours",
            "Spend even more to feel better faster",
            "Ignore his budget entirely tonight in everyday life"
          ],
          correctAnswer: 1,
          explanation: "Naming the emotion and waiting a day lets the storm pass so his calmer brain decides. The urge usually fades, and a free mood-lifter meets the real need without straining his tight budget."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Most money choices carry emotion, even when they feel rational.",
          "Retail therapy soothes a feeling briefly but leaves the charge.",
          "Different emotions push spending and saving in different directions.",
          "Naming a feeling and pausing shifts you from reacting to choosing.",
          "Cooling rules, a fun fund, and free mood-lifters plan for emotions in advance."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "psych5-deepmastery1",
            question: "Why does retail therapy fail to solve the real problem?",
            options: [
              "The items are always defective right in the moment",
              "The mood boost fades but the charge remains",
              "Stores refuse to sell to sad shoppers",
              "It permanently removes all emotions after enough time"
            ],
            correctAnswer: 1,
            explanation: "Buying distracts from a feeling for a moment, but the low mood returns while the cost stays. It treats a symptom, not the actual need."
          },
          {
            id: "psych5-deepmastery2",
            question: "How does excitement typically affect spending?",
            options: [
              "It makes you overpay in the heat of the moment",
              "It always makes you save more money in plain terms",
              "It removes any interest in buying when it is tested",
              "It has no effect on money at all for people in general"
            ],
            correctAnswer: 0,
            explanation: "Excitement pushes people to overpay, bid too high, or grab every add-on. Feeling it is fine; letting it decide automatically is the danger."
          },
          {
            id: "psych5-deepmastery3",
            question: "Why avoid big money decisions within 24 hours of a strong emotion?",
            options: [
              "Prices are always higher on those days",
              "Emotional heat leads to poor money choices",
              "Banks freeze accounts during emotions in the long run",
              "It is required by consumer law"
            ],
            correctAnswer: 1,
            explanation: "Decisions made in an emotional storm, after a fight or a big win, tend to be poor. A cooling window lets the calmer brain make the call."
          },
          {
            id: "psych5-deepmastery4",
            question: "How can anxiety affect saving, not just spending?",
            options: [
              "It always leads to smart investing almost every time",
              "It can cause hoarding that misses growth chances",
              "It guarantees you spend nothing ever under real pressure",
              "It has no effect on saving decisions"
            ],
            correctAnswer: 1,
            explanation: "Anxiety can make someone hoard cash far beyond what is wise, missing chances to grow it. Emotions shape both sides of money, not just spending."
          },
          {
            id: "psych5-deepmastery5",
            question: "What is the point of a guilt-free fun fund?",
            options: [
              "To eliminate all treats from your life for regular customers",
              "To plan for treats so emotions do not ambush the budget",
              "To hide spending from your parents sooner or later in almost every situation",
              "To earn interest faster than savings in a typical week"
            ],
            correctAnswer: 1,
            explanation: "A small planned fun fund gives feelings a designed outlet, so emotional urges do not blow up the whole budget. It makes the plan sustainable."
          },
          {
            id: "psych5-deepmastery6",
            question: "What is the real goal of emotional money management?",
            options: [
              "To become completely emotionless about money for the typical teenager",
              "To notice feelings and still choose on purpose",
              "To spend only when you feel happy",
              "To never make any money decisions most of the time"
            ],
            correctAnswer: 1,
            explanation: "You cannot switch feelings off, and you should not try. The goal is to feel the emotion, name it, pause, and then decide deliberately."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // psych-6: Social Influence & Spending
  // ─────────────────────────────────────────────
  {
    lessonId: "psych-6",
    sections: [
      {
        type: "concept",
        title: "Why Other People Move Your Money",
        paragraphs: [
          "Humans are wired to fit in with their group, and that instinct quietly shapes spending. When friends all have a certain shoe or phone, buying it feels less like a choice and more like a requirement to belong. This is social proof: we assume that if many people do something, it must be right or normal. Marketers know this, which is why ads show crowds and reviews shout thousands sold. Understanding that belonging, not the product, is often the real pull helps you separate what you actually want from what the group made you feel you need.",
          "Peer pressure around money is rarely a direct dare; it is usually subtle. It is the group ordering pricey meals so you do too, the trip everyone is taking, the unspoken expectation to keep up. Because it is quiet, it is powerful; you feel the cost of standing out without anyone saying a word. Teens are especially exposed, since fitting in feels urgent at this age. Naming the pressure, realizing this urge is about the group, not the item, gives you back the power to decide whether the belonging is worth the price.",
          "The comparison problem has exploded with social media, where you see everyone's highlight reel: the new gear, the trips, the purchases. It feels like everyone is doing better, so you spend to match a standard that is not even real. What you do not see is the debt behind the photos or that people post only their best moments. This creates a race with no finish line, because there is always someone with more. Recognizing that you are comparing your normal life to others' curated highlights takes a lot of the sting out."
        ],
        bullets: [
          "The instinct to belong quietly drives much of our spending.",
          "Social proof makes us assume popular choices are correct ones.",
          "Peer pressure around money is usually subtle, not a direct dare.",
          "Social media shows highlight reels, hiding the debt behind them.",
          "Comparing your normal to others' curated best fuels endless spending."
        ],
        realWorldExample: "Malik's friends all buy $120 sneakers, and though he prefers a $50 pair, he feels he must match to belong. The real pull is fitting in, not the shoes. Once he names that, he realizes he can wear the pair he likes and the friendship survives just fine."
      },
      {
        type: "concept",
        title: "Spending On Your Own Terms",
        paragraphs: [
          "The first defense is knowing your own values and budget before you are in the moment. If you have decided in advance what matters to you and what you can spend, group pressure has far less power, because you are measuring against your plan instead of the crowd. People without a plan default to the group's plan every time. A teen who knows they are saving for a laptop can enjoy a night out and still skip the pricey extras, because the goal is clearer to them than the momentary pressure to match everyone else.",
          "The second defense is having ready scripts for social spending pressure. You do not need a lecture; short, calm lines work: I am good, thanks, or I am saving for something, or let's do the cheaper option. Suggesting a free or low-cost alternative, a park hangout instead of an expensive outing, often reveals that friends felt the same pressure and are relieved. Real friends respect a no about money; the ones who mock you for it are showing you something useful about the friendship, not about your worth.",
          "The third defense is curating your inputs, especially online. If certain accounts constantly make you feel behind and itch to spend, unfollowing or muting them is a legitimate money move. You can also flip social influence to your advantage by surrounding yourself with people who value saving and smart choices, since their habits rub off just as much as spenders' do. Social influence never disappears, so the smart play is not to pretend you are immune but to aim it deliberately toward the person you actually want to become."
        ],
        bullets: [
          "Knowing your values and budget in advance blunts group pressure.",
          "Short, calm scripts handle spending pressure without a lecture.",
          "Suggesting cheaper alternatives often relieves the whole group.",
          "Muting accounts that trigger spending is a real money move.",
          "Surround yourself with savers so good habits rub off."
        ],
        realWorldExample: "When friends push an expensive outing, Nadia says, I am saving right now, let's do the park instead. Two friends admit they were relieved because they were broke too. Her simple script and cheaper suggestion saved everyone money and made her look confident, not cheap."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych6-deepmc1",
            question: "What is social proof in spending?",
            options: [
              "A receipt proving you bought something as a general rule",
              "Assuming a popular choice must be right",
              "A discount for shopping in groups",
              "Proof that an item is high quality"
            ],
            correctAnswer: 1,
            explanation: "Social proof is the tendency to assume that if many people do something, it must be correct or normal. Marketers use it with crowds and big sales numbers."
          },
          {
            id: "psych6-deepmc2",
            question: "Why does social media comparison fuel overspending?",
            options: [
              "It shows curated highlights, hiding the real cost",
              "It gives everyone the same income in the majority of cases",
              "It lowers the price of everything shown",
              "It forces you to post your purchases"
            ],
            correctAnswer: 0,
            explanation: "You see people's best moments and new purchases but not the debt behind them, so you spend to match a standard that is not even real."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Group Trip Nobody Can Afford",
        narrative: "Jae's friend group is planning a $200 amusement-park trip, and everyone seems on board. Jae is saving for a bike and cannot easily spare $200, but staying home feels like being left out. No one has said Jae must come, yet the pressure to keep up is strong and unspoken.",
        details: [
          "The pressure is subtle and unspoken, which makes it feel harder to resist.",
          "Jae's clear bike goal is competing with the urge to belong to the group.",
          "A calm script plus a cheaper alternative could ease the pressure for everyone.",
          "Some friends may secretly feel the same strain but be afraid to say so."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych6-deepaq1",
          question: "What is Jae's strongest move here?",
          options: [
            "Go into debt to join the trip at least at first",
            "Propose a cheaper hangout and share the bike goal",
            "Silently drop out with no explanation on a day-to-day basis",
            "Pressure everyone to cancel the trip especially early on"
          ],
          correctAnswer: 1,
          explanation: "A calm script naming the bike goal plus a cheaper alternative protects Jae's plan and often relieves friends feeling the same strain. Debt and a silent exit both cost more than they solve."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The drive to belong quietly powers much of our spending.",
          "Social proof makes popular choices feel automatically correct.",
          "Peer pressure around money is usually subtle, not spoken.",
          "Social media comparison measures your normal against others' highlights.",
          "Knowing your values, using scripts, and curating inputs put you in control."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "psych6-deepmastery1",
            question: "What is the real driver behind matching friends' purchases?",
            options: [
              "The product's superior quality in everyday life",
              "The instinct to belong to the group",
              "A guaranteed lower price on a day-to-day basis",
              "A legal requirement to conform especially early on"
            ],
            correctAnswer: 1,
            explanation: "The pull is usually belonging, not the item itself. Naming that lets you separate what you truly want from what the group made you feel you need."
          },
          {
            id: "psych6-deepmastery2",
            question: "Why is money peer pressure so powerful among teens?",
            options: [
              "Teens have the most money to spend",
              "Fitting in feels especially urgent at this age",
              "Stores charge teens lower prices at least at first",
              "Teens are immune to advertising in the short term"
            ],
            correctAnswer: 1,
            explanation: "Belonging feels urgent in the teen years, so the subtle cost of standing out feels heavy even when no one says a word about it."
          },
          {
            id: "psych6-deepmastery3",
            question: "What is missing from the highlight reels you see online?",
            options: [
              "The debt and struggle behind the photos",
              "The actual prices of everything shown",
              "The names of the people posting",
              "Any positive moments at all with very little effort"
            ],
            correctAnswer: 0,
            explanation: "Highlight reels hide the debt, stress, and ordinary days behind the best moments, so you compare your full life to others' curated best."
          },
          {
            id: "psych6-deepmastery4",
            question: "What most blunts group pressure in the moment?",
            options: [
              "Knowing your values and budget in advance",
              "Carrying more cash than everyone else more often than not",
              "Avoiding all friends who spend money",
              "Always buying what the group buys"
            ],
            correctAnswer: 0,
            explanation: "With a plan set beforehand, you measure choices against your goals, not the crowd. People without a plan default to the group's plan."
          },
          {
            id: "psych6-deepmastery5",
            question: "Why is suggesting a cheaper alternative often effective?",
            options: [
              "It forces friends to pay for you in a downturn",
              "Others may secretly feel the same money strain",
              "It always ends the friendship cleanly without much thought",
              "It proves you have the most money"
            ],
            correctAnswer: 1,
            explanation: "Money pressure is often mutual and unspoken. Proposing a lower-cost option frequently relieves friends who felt the same strain but were afraid to say so."
          },
          {
            id: "psych6-deepmastery6",
            question: "How can you turn social influence to your advantage?",
            options: [
              "Ignore everyone and spend alone under most conditions",
              "Surround yourself with people who value saving",
              "Follow only accounts that trigger buying across most markets",
              "Copy whoever spends the most money"
            ],
            correctAnswer: 1,
            explanation: "Habits rub off both ways. Spending time with savers and muting spend-triggering accounts aims social influence toward who you want to become."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // psych-7: Advertising & Consumer Behavior
  // ─────────────────────────────────────────────
  {
    lessonId: "psych-7",
    sections: [
      {
        type: "concept",
        title: "What Ads Are Really Selling",
        paragraphs: [
          "Ads rarely sell a product; they sell a feeling or an identity. A soda ad is not really about taste, it is about friends laughing together, so your brain links the drink to belonging. A car ad sells freedom, a phone sells being the kind of person who has the best. This is emotional advertising, and it works because emotions drive buying far more than facts do. Once you notice an ad is selling a feeling rather than useful information, its grip loosens, and you can ask the real question: do I actually need this thing?",
          "Advertisers lean on well-studied psychological triggers. Scarcity says only 3 left or sale ends tonight to spark fear of missing out and rush your decision. Social proof shows crowds and star ratings so you assume the choice is safe. Authority uses experts or celebrities to borrow their credibility. Anchoring shows a fake high original price crossed out next to the sale price, so the deal feels huge even if it was never that expensive. None of these tricks are about the product's real value; they are about steering your emotions past your judgment.",
          "The design of buying itself is engineered to make spending easy and painless. One-tap checkout, saved cards, and free-return promises all remove the friction, and the pause, that would let you reconsider. Free shipping over $50 nudges you to add items you did not want. Loyalty points and streaks turn spending into a game. This is not accidental; companies test these tactics on millions of people to find what makes you spend more. Knowing that the whole experience is optimized to loosen your wallet is itself a form of protection. Every color, button, and word on a checkout page has often been tested against alternatives to see which version squeezes out the most sales, which is why the process feels so smooth and so easy to say yes to."
        ],
        bullets: [
          "Ads mostly sell a feeling or identity, not the product itself.",
          "Scarcity, social proof, authority, and anchoring steer your emotions.",
          "A crossed-out fake original price makes deals feel bigger than they are.",
          "One-tap checkout removes the pause that lets you reconsider.",
          "Free-shipping thresholds nudge you to add items you did not want."
        ],
        realWorldExample: "A shopping app has saved Dana's card, so buying is a single thumb-tap with no pause to reconsider. That frictionless one-tap design, tested on millions of shoppers, is engineered to remove the exact moment of hesitation that would otherwise save her money."
      },
      {
        type: "concept",
        title: "Becoming A Harder Target",
        paragraphs: [
          "The strongest defense is a simple habit: name the tactic when you feel the urge. If you feel rushed, look for the scarcity trick and remind yourself real needs rarely expire in an hour. If a deal feels amazing, check whether an anchor price is doing the work. Spotting the technique turns you from a target into an observer, and the emotional pull weakens the instant you see the machinery behind it. Advertisers count on you reacting fast; slowing down to label the move is exactly what breaks the spell they built.",
          "Adding friction on purpose beats the frictionless design of modern buying. Turn off one-tap purchasing, remove saved cards, and unsubscribe from marketing emails that exist only to create wants you did not have. The same cooling-off pause from earlier works against manufactured urgency: a 24-hour wait on anything over a set amount lets engineered urgency expire; if the item still makes sense tomorrow, buy it, but most engineered urges will not survive the night. You are restoring the pause that companies spent millions removing, which is often the difference between a purchase you value and one you regret.",
          "Finally, shift from ad-driven wants to need-driven choices by asking better questions before buying. Would I want this if I had never seen the ad? What problem does it actually solve for me? Is there a cheaper way to solve that same problem? These questions pull the decision back to your real life and away from the feeling the ad installed. You cannot avoid advertising, it is everywhere, but you can build the habit of running purchases through your own judgment instead of the marketer's script."
        ],
        bullets: [
          "Naming the tactic in the moment breaks its emotional spell.",
          "Real needs rarely expire in an hour, so distrust manufactured urgency.",
          "Turning off one-tap buying restores the pause companies removed.",
          "A 24-hour wait lets engineered urgency expire before you buy.",
          "Ask whether you would want it if you had never seen the ad."
        ],
        realWorldExample: "Ravi gets an email screaming last chance, 2 left on a gadget. He names the scarcity trick, waits a day, and asks if he would want it without the ad. He would not, so he skips it and keeps $60 that manufactured urgency nearly took."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych7-deepmc1",
            question: "What do most ads primarily sell?",
            options: [
              "Detailed factual product specs as the years pass",
              "A feeling or identity, not the product",
              "The lowest possible price guaranteed during tough times",
              "Neutral advice for the buyer"
            ],
            correctAnswer: 1,
            explanation: "Ads link products to emotions like belonging or freedom, because feelings drive buying more than facts. Seeing this loosens an ad's grip on you."
          },
          {
            id: "psych7-deepmc2",
            question: "Why does 'free shipping on orders over $50' often make you spend more?",
            options: [
              "It removes the sales tax from your whole order",
              "It nudges you to add items just to reach the threshold",
              "It lowers the price of everything in the cart",
              "It ships every item faster than paid shipping"
            ],
            correctAnswer: 1,
            explanation: "The threshold pushes you to add items you did not want just to 'earn' free shipping, so you spend more than the shipping would have cost. It's a nudge, not a saving."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Countdown On The Screen",
        narrative: "Zoe is browsing when a banner appears: Flash Deal, 2 left, offer ends in 9:59 with a $90 jacket crossed out to $45. Her heart speeds up and she feels she has to buy now. She had no plan to buy a jacket today and the money is meant for her savings goal.",
        details: [
          "The 10-minute timer and 2 left message are scarcity triggers creating false urgency.",
          "The crossed-out $90 is an anchor making $45 feel like a bargain.",
          "She had no need for a jacket before the ad manufactured the want.",
          "A 24-hour wait would let the engineered urgency expire before she decides."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych7-deepaq1",
          question: "What is the smartest way for Zoe to respond?",
          options: [
            "Buy immediately before the timer ends in the short term",
            "Name the scarcity trick and wait a day",
            "Add more items to hit free shipping",
            "Trust that the deal must be genuine"
          ],
          correctAnswer: 1,
          explanation: "Labeling the scarcity and anchor tactics and waiting 24 hours lets the fake urgency expire. If she still wants the jacket tomorrow she can decide calmly, but most engineered urges fade overnight."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Ads sell feelings and identities more than products or facts.",
          "Scarcity, social proof, authority, and anchoring steer your emotions.",
          "Buying is engineered to be frictionless so you do not pause.",
          "Naming the tactic in the moment breaks its emotional spell.",
          "Adding friction and asking better questions put you back in control."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "psych7-deepmastery1",
            question: "Why do emotional ads work so well?",
            options: [
              "Feelings drive buying more than facts do",
              "They always tell the complete truth",
              "They list every product specification in the long run",
              "They are required to lower prices"
            ],
            correctAnswer: 0,
            explanation: "Emotions push purchases far more than facts, so ads link products to feelings like belonging. Spotting the feeling being sold loosens the ad's grip."
          },
          {
            id: "psych7-deepmastery2",
            question: "The message only 3 left, ends tonight is which tactic?",
            options: [
              "Anchoring",
              "Scarcity",
              "Authority",
              "Free shipping"
            ],
            correctAnswer: 1,
            explanation: "Scarcity creates fear of missing out to rush your decision. Real needs rarely expire in an hour, so manufactured urgency deserves suspicion."
          },
          {
            id: "psych7-deepmastery3",
            question: "Why is one-tap checkout designed the way it is?",
            options: [
              "To give you time to reconsider under real pressure",
              "To remove the pause that stops impulse buys",
              "To make items cost less overall sooner or later",
              "To slow down your shopping almost every time"
            ],
            correctAnswer: 1,
            explanation: "Frictionless buying removes the moment of hesitation that would let you reconsider. Turning it off restores the pause companies spent millions removing."
          },
          {
            id: "psych7-deepmastery4",
            question: "What does using a celebrity to sell a product rely on?",
            options: [
              "Anchoring",
              "Authority",
              "Scarcity",
              "Free returns"
            ],
            correctAnswer: 1,
            explanation: "Authority borrows the credibility of experts or celebrities so you trust the choice. Their fame, not the product's value, does the persuading."
          },
          {
            id: "psych7-deepmastery5",
            question: "Which question best pulls a purchase back to your real needs?",
            options: [
              "How many are left in stock? in a typical week",
              "Would I want this if I never saw the ad?",
              "What is the crossed-out original price? for regular customers for the typical teenager",
              "How fast can it be shipped? in almost every situation"
            ],
            correctAnswer: 1,
            explanation: "Asking whether you would want it without the ad strips away the installed feeling and returns the choice to your actual life and needs."
          },
          {
            id: "psych7-deepmastery6",
            question: "Why does a 24-hour wait defeat many marketing tactics?",
            options: [
              "Stores lower prices after a day",
              "Engineered urgency usually expires overnight",
              "Waiting earns you loyalty points",
              "It cancels the sales tax"
            ],
            correctAnswer: 1,
            explanation: "Manufactured urgency is built to make you act fast. Given a day, most engineered urges fade, so only purchases you genuinely value survive the wait."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // psych-8: Behavioral Traps
  // ─────────────────────────────────────────────
  {
    lessonId: "psych-8",
    sections: [
      {
        type: "concept",
        title: "The Biases That Skew Your Money Math",
        paragraphs: [
          "A cognitive bias is a built-in thinking shortcut that often misfires with money. Loss aversion is one of the strongest: losing $20 feels about twice as painful as gaining $20 feels good. This makes people hold a failing investment too long to avoid locking in a loss, or refuse a fair risk that would likely pay off. It is not weakness; it is standard human wiring. Knowing that your brain overweights losses helps you check whether fear, rather than facts, is steering a decision you think is perfectly logical.",
          "Confirmation bias makes you seek information that agrees with what you already believe and ignore the rest. If you have decided a certain purchase is smart, you notice every review praising it and skip the warnings. With money this is dangerous, because it lets you talk yourself into bad buys and risky bets by only listening to the cheerleaders. The fix is deliberately hunting for the opposite view: before a big decision, actively look for reasons not to do it. If it still holds up, you can proceed with far more confidence.",
          "The anchoring bias - which you met as a store's was-and-now pricing trick in the Advertising lesson - is the machinery underneath it: the first number you see sticks and warps your judgment. See a $200 price first and a $120 one feels cheap, even if $120 is still too much. Then there is the availability bias, where vivid recent events feel more likely than they are, like fearing a rare scam you just heard about while ignoring the boring everyday overspending that actually drains you. Each bias quietly bends your money math, and the antidote is always the same: slow down and check the reasoning."
        ],
        bullets: [
          "Loss aversion makes losses hurt about twice as much as equal gains feel good.",
          "Confirmation bias makes you notice only info that agrees with you.",
          "Anchoring lets the first number seen warp what feels cheap or expensive.",
          "Availability bias makes vivid recent events feel more likely than they are.",
          "The shared antidote is slowing down to check your reasoning."
        ],
        realWorldExample: "Owen buys a $30 game skin, then keeps buying add-ons only after reading reviews that praise it, ignoring the ones warning it gets boring fast. That is confirmation bias: he listens only to the cheerleaders, so he talks himself deeper into spending he later regrets."
      },
      {
        type: "concept",
        title: "Traps In How Choices Are Framed",
        paragraphs: [
          "Framing means the same fact feels different depending on how it is worded, and it heavily sways money choices. A yogurt labeled 90% fat-free sells better than one labeled 10% fat, though they are identical. A subscription pitched as just $1 a day feels cheaper than $365 a year, even though it is the exact same cost. Marketers frame prices in the smallest, friendliest unit on purpose. When you catch a suspiciously cozy framing, do the math into the real, total number; the honest figure often changes your decision instantly.",
          "The endowment effect makes you overvalue things simply because they are yours, which is why free trials are so effective. Once a service feels like yours, canceling feels like a loss, so you keep paying. Default bias is its cousin: whatever option is pre-selected, like auto-renew or the middle-tier plan, tends to win because changing takes effort. Companies set the defaults that benefit them and count on your inertia. Recognizing that the default was chosen for someone else's benefit, not yours, is what prompts you to actually check the other options.",
          "Finally, the gambler's fallacy and hot-hand thinking distort risk. Believing a coin is due to land heads after several tails, or that a lucky streak will continue, leads people to chase losses or bet bigger. Each independent event does not remember the last one. In money terms, this is how small bad bets snowball, someone doubling down to win back losses that were never coming back. Naming these traps does not make you immune, but it builds a pause between the impulse and the action, and that pause is where good money decisions actually live."
        ],
        bullets: [
          "Framing makes identical facts feel different, like $1 a day versus $365 a year.",
          "The endowment effect makes free trials sticky by making you overvalue what is yours.",
          "Default bias means pre-selected options win because changing takes effort.",
          "Gambler's fallacy makes people chase losses that are not coming back.",
          "Naming a trap builds the pause where good decisions happen."
        ],
        realWorldExample: "A streaming app offers a free month, then quietly auto-renews at $15. Because it now feels like Renu's service (endowment effect) and auto-renew is the default, she keeps paying for months she barely uses, exactly the outcome the company designed the defaults to produce."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych8-deepmc1",
            question: "What does loss aversion cause people to do?",
            options: [
              "Treat losses and gains equally as a general rule",
              "Feel losses about twice as strongly as equal gains",
              "Enjoy taking large risks for fun in the majority of cases",
              "Ignore money decisions entirely most of the time"
            ],
            correctAnswer: 1,
            explanation: "Loss aversion makes a loss hurt roughly twice as much as an equal gain feels good, so people cling to losers and avoid fair risks out of fear."
          },
          {
            id: "psych8-deepmc2",
            question: "Why is a subscription framed as just $1 a day persuasive?",
            options: [
              "It is actually cheaper than $365 a year in everyday life",
              "The tiny unit hides the same larger yearly total",
              "It includes free extra products whenever money feels tight",
              "Daily billing avoids all fees for the average shopper"
            ],
            correctAnswer: 1,
            explanation: "Framing the price in the smallest unit makes it feel small, though $1 a day is $365 a year. Converting to the real total often changes the decision."
          }
        ]
      },
      {
        type: "scenario",
        title: "Chasing The Loss",
        narrative: "Dev put $40 into a risky in-game loot system hoping for a rare item and got nothing good. Feeling he is due for a win, he plans to spend $40 more to recover what he lost. Each pull is independent and random, but it feels like a payoff must be coming any moment now.",
        details: [
          "The feeling of being due is the gambler's fallacy; each pull ignores the last.",
          "Loss aversion makes the $40 already gone feel unbearable to accept.",
          "Chasing losses is how small bad bets snowball into larger ones.",
          "A pause to name both traps could stop the spiral before it grows."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych8-deepaq1",
          question: "What should Dev recognize before spending another $40?",
          options: [
            "A win is now guaranteed to come more often than not",
            "Each pull is independent; he is chasing a lost $40",
            "Spending more always recovers losses with very little effort",
            "The system remembers his past bad luck without much thought"
          ],
          correctAnswer: 1,
          explanation: "Each random pull ignores previous ones, so no payoff is due. Loss aversion and the gambler's fallacy are pushing him to chase money that is already gone, which usually deepens the loss."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Cognitive biases are thinking shortcuts that often misfire with money.",
          "Loss aversion makes losses hurt far more than equal gains.",
          "Confirmation bias and anchoring quietly bend your judgment.",
          "Framing, defaults, and the endowment effect steer choices toward sellers.",
          "Naming a trap builds the pause where good decisions live."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "psych8-deepmastery1",
            question: "Why do people hold a failing investment too long?",
            options: [
              "Confirmation bias makes them research more",
              "Loss aversion makes locking in the loss painful",
              "Anchoring lowers the item's price in the short term",
              "Framing hides the yearly total with very little effort"
            ],
            correctAnswer: 1,
            explanation: "Selling would make the loss real, and loss aversion makes that pain feel worse than the likely benefit of moving on, so they cling to the loser."
          },
          {
            id: "psych8-deepmastery2",
            question: "How do you counter confirmation bias before a big buy?",
            options: [
              "Read only the most positive reviews without much thought",
              "Actively hunt for reasons not to do it",
              "Trust your first instinct completely more often than not",
              "Ask friends who already agree with you"
            ],
            correctAnswer: 1,
            explanation: "Deliberately seeking the opposing view balances your one-sided instinct. If the decision still holds up against the criticism, you can proceed with real confidence."
          },
          {
            id: "psych8-deepmastery3",
            question: "A store shows $200 crossed out to $120. Which bias does this exploit?",
            options: [
              "Anchoring",
              "Loss aversion",
              "Gambler's fallacy",
              "Endowment effect"
            ],
            correctAnswer: 0,
            explanation: "The first number, $200, anchors your sense of value, so $120 feels cheap even if it is still too much. The anchor warps your judgment of the deal."
          },
          {
            id: "psych8-deepmastery4",
            question: "Why are free trials so effective at keeping you paying?",
            options: [
              "They are always genuinely free forever under most conditions",
              "The endowment effect makes canceling feel like a loss",
              "They lower the total yearly cost across most markets",
              "They remove the auto-renew default in a downturn as the years pass"
            ],
            correctAnswer: 1,
            explanation: "Once the service feels like yours, canceling feels like giving something up, and the auto-renew default adds inertia, so you keep paying."
          },
          {
            id: "psych8-deepmastery5",
            question: "What error is the gambler's fallacy?",
            options: [
              "Believing past events change independent odds",
              "Reading only reviews that agree with you",
              "Overvaluing things you already own",
              "Letting the first price anchor your judgment"
            ],
            correctAnswer: 0,
            explanation: "It is the false belief that a result is due after a streak, though each independent event ignores the last. It drives loss-chasing and bigger bets."
          },
          {
            id: "psych8-deepmastery6",
            question: "What is the shared antidote to most behavioral traps?",
            options: [
              "Act on the very first impulse",
              "Slow down and check your reasoning",
              "Trust vivid recent stories most during tough times",
              "Always accept the default option"
            ],
            correctAnswer: 1,
            explanation: "Naming a bias and pausing builds space between impulse and action. That pause is where you can recheck the math and make a genuinely good choice."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // psych-9: Identity & Money Habits
  // ─────────────────────────────────────────────
  {
    lessonId: "psych-9",
    sections: [
      {
        type: "concept",
        title: "You Spend Like Who You Think You Are",
        paragraphs: [
          "Your money habits flow from your identity, the story you tell yourself about who you are. Someone who thinks I am just bad with money will act that way, skipping budgets because why bother. Someone who thinks I am a saver finds saving easy, because it matches their self-image. This is powerful, because habits driven by identity do not require constant willpower; they feel like simply being yourself. The most durable money change is not a new rule but a new self-image, since you naturally act in line with who you believe you are.",
          "Identity often comes from your money scripts, the beliefs you absorbed young, usually without noticing. If you grew up hearing money is always tight, you might hoard anxiously even when you are fine. If you heard we deserve nice things, you might overspend to feel worthy. These scripts run silently in the background, shaping choices you think are your own. Bringing them into the open, asking what did I learn about money as a kid, is powerful, because a belief you can see is one you can finally question and change.",
          "Money is also tangled up with self-worth, which is where a lot of trouble starts. When people feel their value depends on what they own or can afford, spending becomes a way to prove they matter, buying the brand to feel respected, or the round of drinks to feel generous and liked. This makes them vulnerable to every marketer selling status. Separating your worth from your wallet, deciding that who you are is not what you can buy, removes the fuel behind a huge share of unhealthy spending."
        ],
        bullets: [
          "Money habits flow from identity, the story you tell about yourself.",
          "Identity-based habits feel natural and need less willpower.",
          "Money scripts are childhood beliefs that silently shape choices.",
          "Naming a hidden script lets you finally question and change it.",
          "Tying self-worth to spending makes you easy to sell status to."
        ],
        realWorldExample: "Grew up hearing money is always tight, Sam saves anxiously and feels guilty buying anything, even with a healthy balance. Once Sam names that childhood script, the guilt makes sense and can be questioned, freeing Sam to save calmly rather than fearfully."
      },
      {
        type: "concept",
        title: "Rewriting The Story On Purpose",
        paragraphs: [
          "You change money habits fastest by changing identity first, then letting actions follow. Instead of I am trying to save, adopt I am a saver, and small choices start aligning to protect that identity. Psychologists find people stick with habits that match how they see themselves far more than habits that feel like a chore. So the move is to decide who you want to be with money, someone in control, a steady saver, a smart spender, and then treat each choice as a small vote for that person. Enough votes, and the identity becomes true.",
          "Every action is a vote for a version of yourself, which flips small choices into identity-building. Saving $10 is not just $10; it is evidence that you are the kind of person who saves, which makes the next save easier. Skipping an impulse buy is a vote for a self-controlled you. This is why starting tiny works: the goal early on is not the dollar amount but proving the new identity to yourself. Momentum builds because each vote strengthens the self-image, and a stronger self-image makes the next good choice feel more automatic.",
          "It also helps to shed identities that no longer serve you and to talk about yourself carefully. Drop the label I am bad with money, which is a prediction disguised as a fact, and replace it with I am learning to manage money well. The words you repeat become the story you believe, and the story you believe becomes the habits you keep. Changing money behavior is less about strict rules and more about deciding, honestly and on purpose, who you are becoming, and then letting your daily choices quietly prove it true."
        ],
        bullets: [
          "Change identity first; aligned actions follow more easily.",
          "Say I am a saver rather than I am trying to save.",
          "Every choice is a small vote for a version of yourself.",
          "Starting tiny works because early wins prove the new identity.",
          "Drop labels like bad with money; they are predictions, not facts."
        ],
        realWorldExample: "Instead of saying I am bad with money, Lena starts saying I am learning to handle money well and saves just $5 a week. Each small save is a vote for her new identity. Six months on, saving feels like simply who she is, and the amount has grown naturally."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych9-deepmc1",
            question: "What are money scripts?",
            options: [
              "Written budgets you follow monthly for brand-new buyers",
              "Childhood beliefs that silently shape money choices",
              "Receipts kept for tax purposes right in the moment",
              "Rules a bank sets for your account"
            ],
            correctAnswer: 1,
            explanation: "Money scripts are beliefs absorbed young, like money is always tight, that run in the background and steer choices you think are entirely your own."
          },
          {
            id: "psych9-deepmc2",
            question: "Why does changing identity change habits so effectively?",
            options: [
              "It forces the bank to save for you",
              "Habits that match your self-image need less willpower",
              "It instantly increases your income after enough time",
              "It removes the need for any choices when it is tested"
            ],
            correctAnswer: 1,
            explanation: "When a habit matches who you believe you are, it feels natural rather than forced, so it sticks far better than a rule fought by willpower."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Label That Predicts",
        narrative: "Theo, 17, often says I am just bad with money and uses it to explain skipping budgets and blowing his paycheck. He grew up hearing his family joke that they could never hold onto a dollar. The label feels like a simple fact to him, but it quietly shapes every money choice he makes.",
        details: [
          "The bad with money label is a prediction disguised as a fixed fact.",
          "His family's joke is a money script he absorbed without questioning it.",
          "The identity makes budgeting feel pointless, so he never tries.",
          "Replacing the label could let new habits align with a new self-image."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych9-deepaq1",
          question: "What is the most powerful first change for Theo?",
          options: [
            "Earn more before doing anything else under most conditions",
            "Replace the bad with money label with I am learning",
            "Accept the label as permanent truth across most markets",
            "Hide his spending from everyone in a downturn as the years pass"
          ],
          correctAnswer: 1,
          explanation: "The label is a self-fulfilling prediction. Swapping it for I am learning to manage money lets small good choices align with a new identity, which is the most durable driver of change."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Money habits flow from your identity and self-story.",
          "Money scripts from childhood silently shape adult choices.",
          "Tying self-worth to spending makes status marketing effective on you.",
          "Change identity first and let aligned actions follow.",
          "Every small choice is a vote for the person you are becoming."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "psych9-deepmastery1",
            question: "Why are identity-based money habits so durable?",
            options: [
              "They are enforced by the bank sooner or later",
              "They feel like being yourself, needing less willpower",
              "They require strict daily rules under real pressure",
              "They only work for wealthy people in a typical week"
            ],
            correctAnswer: 1,
            explanation: "When saving matches your self-image, it feels natural rather than forced. Habits aligned with identity stick far better than ones fought with willpower."
          },
          {
            id: "psych9-deepmastery2",
            question: "How does a hidden money script cause trouble?",
            options: [
              "It silently steers choices you think are your own",
              "It raises your interest rate automatically for regular customers",
              "It appears clearly on every statement in almost every situation",
              "It only affects people who budget for the typical teenager"
            ],
            correctAnswer: 0,
            explanation: "Scripts run in the background, so you follow beliefs like money is always tight without noticing. Naming a script is what lets you question and change it."
          },
          {
            id: "psych9-deepmastery3",
            question: "Why is tying self-worth to spending risky?",
            options: [
              "It makes you save far too much most of the time",
              "It makes status marketing very effective on you",
              "It lowers the price of luxury goods",
              "It removes all your emotions about money"
            ],
            correctAnswer: 1,
            explanation: "If your value feels tied to what you own, spending becomes a way to prove you matter, making you vulnerable to anyone selling status."
          },
          {
            id: "psych9-deepmastery4",
            question: "What does it mean that every action is a vote?",
            options: [
              "Each choice is evidence for a version of yourself",
              "You must vote on purchases with friends",
              "Spending is decided by an election as a general rule",
              "Only big purchases shape your identity in the majority of cases"
            ],
            correctAnswer: 0,
            explanation: "Each save or skipped splurge is proof of the identity you are building, which makes the next aligned choice easier. Small votes add up to a self-image."
          },
          {
            id: "psych9-deepmastery5",
            question: "Why does starting with tiny amounts work?",
            options: [
              "The dollar amount is what matters most early",
              "Small wins prove the new identity to yourself",
              "Banks reward tiny deposits with bonuses whenever money feels tight",
              "It avoids ever needing to save more"
            ],
            correctAnswer: 1,
            explanation: "Early on the point is proving you are a saver, not the size of the deposit. Each small win strengthens the self-image and builds momentum."
          },
          {
            id: "psych9-deepmastery6",
            question: "Why replace the label I am bad with money?",
            options: [
              "It is a prediction disguised as a fixed fact",
              "It is required to be positive by law",
              "It makes your income drop instantly for the average shopper",
              "Labels have no effect on behavior in everyday life"
            ],
            correctAnswer: 0,
            explanation: "The label predicts and produces the behavior it describes. Swapping it for I am learning lets new habits align with a changeable identity."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // psych-10: Healthy Financial Beliefs
  // ─────────────────────────────────────────────
  {
    lessonId: "psych-10",
    sections: [
      {
        type: "concept",
        title: "What A Healthy Money Mindset Looks Like",
        paragraphs: [
          "A healthy money mindset is a set of balanced beliefs that let you use money as a tool without being ruled by fear or greed. It sits between two extremes: obsessing over every penny in anxiety, and ignoring money entirely in avoidance. The balanced middle sounds like money is a tool I manage, not a measure of my worth. People with this mindset can enjoy spending on what they value, save steadily for the future, and face financial facts calmly. The goal is not to think about money constantly, but to think about it clearly when it counts.",
          "Healthy beliefs are specific and testable, unlike vague slogans. Believing I can learn to manage money beats I am hopeless, because it opens the door to actually trying. Believing small amounts matter beats it is pointless unless I have thousands, because it gets you started saving now. Believing I control my spending choices beats money just happens to me, because it puts you in the driver's seat. Each healthy belief is realistic, not blind optimism; it acknowledges challenges while insisting you have real power to act, which is exactly what turns intention into habit.",
          "Crucially, a healthy mindset keeps money in its proper place: important, but not the point of life. Money buys security, options, and some experiences, yet research consistently shows that beyond covering real needs, more money adds less happiness than people expect. Someone with healthy beliefs uses money to support a good life, relationships, growth, purpose, rather than treating money itself as the goal. This protects you from the trap of endless earning and spending that never satisfies, because you have decided what money is actually for before chasing more of it."
        ],
        bullets: [
          "A healthy mindset sits between anxious obsession and total avoidance.",
          "Money is a tool you manage, not a measure of your worth.",
          "Healthy beliefs are specific and testable, not vague slogans.",
          "Realistic beliefs admit challenges while insisting you can act.",
          "Money supports a good life; it is not the point of life itself."
        ],
        realWorldExample: "Two teens each get $500. One anxiously refuses to spend a cent and stresses constantly; the other ignores it and it vanishes. A healthy mindset would save most, spend a planned bit on something valued, and feel calm doing both, treating the money as a tool rather than a threat or a toy."
      },
      {
        type: "concept",
        title: "Building And Keeping Healthy Beliefs",
        paragraphs: [
          "You practiced rewriting your money identity in the last lesson; healthy beliefs are the everyday version you test and maintain. You build them by challenging the unhealthy ones directly: when a thought like I will never afford anything pops up, treat it as a claim to test, not a fact. Ask, is that fully true, and what small step proves otherwise? Saving even $5 is evidence against I cannot save. This is not fake positivity; it is swapping a defeating belief for an accurate, empowering one backed by action. Over time, repeated small proof rewires the belief, because your brain updates its story about you based on what it repeatedly sees you actually do.",
          "Healthy beliefs also come from good information and good influences. A lot of money fear comes from simply not knowing how things work, so learning the basics, how saving grows, how credit works, how to budget, replaces anxiety with competence. Just as important is the company you keep: surround yourself with people and voices that model calm, capable money habits, and mute the ones that push panic or reckless flexing. Beliefs are contagious, so choosing your inputs is really choosing which money mindset gets reinforced in you day after day.",
          "Finally, healthy beliefs need maintenance, because stress and setbacks pull you back toward old patterns. A tough month can revive I am bad with money in an instant. The practice is to notice the slip, name the unhealthy belief, and gently return to the balanced one, treating a setback as data, not a verdict. Nobody keeps a perfect mindset forever; the skill is recovering quickly. A healthy relationship with money is not a fixed state you reach once, but an ongoing practice of choosing balanced beliefs again and again."
        ],
        bullets: [
          "Challenge unhealthy thoughts as claims to test, not facts.",
          "Small actions provide proof that rewires defeating beliefs.",
          "Learning how money works replaces fear with competence.",
          "Beliefs are contagious, so choose calm, capable influences.",
          "A healthy mindset is an ongoing practice, not a one-time achievement."
        ],
        realWorldExample: "After a broke month, Maya catches herself thinking I am hopeless with money. She names it as an old belief, not a fact, points to the $80 she did manage to save earlier, and resets. Treating the setback as data rather than a verdict keeps her mindset healthy through the rough patch."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych10-deepmc1",
            question: "A healthy money mindset sits between which two extremes?",
            options: [
              "Earning and spending on a day-to-day basis",
              "Anxious obsession and total avoidance",
              "Saving and investing especially early on",
              "Cash and credit"
            ],
            correctAnswer: 1,
            explanation: "The balanced middle avoids both obsessing anxiously over every penny and ignoring money entirely. It treats money as a tool you manage calmly."
          },
          {
            id: "psych10-deepmc2",
            question: "Why is I can learn to manage money a healthier belief than I am hopeless?",
            options: [
              "It guarantees you will get rich at least at first",
              "It opens the door to actually trying",
              "It means you never have to budget",
              "It proves money does not matter"
            ],
            correctAnswer: 1,
            explanation: "A learnable belief invites action, while hopelessness shuts it down. Healthy beliefs are realistic and empowering, insisting you have real power to act."
          }
        ]
      },
      {
        type: "scenario",
        title: "One Rough Month",
        narrative: "Ivan has been saving steadily and feeling good about money. Then a rough month hits: an unexpected cost wipes out his progress, and the old thought I am just bad with money comes roaring back. He is tempted to quit budgeting entirely, feeling like all his effort was pointless anyway.",
        details: [
          "The setback revived an old unhealthy belief he had been moving past.",
          "Treating one bad month as a verdict, rather than data, is the real trap.",
          "He can point to months of real saving as evidence against the old label.",
          "Recovering quickly, not being perfect, is what keeps a mindset healthy."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych10-deepaq1",
          question: "What is the healthiest way for Ivan to handle this setback?",
          options: [
            "Accept that he is bad with money for brand-new buyers",
            "Name the old belief and treat the month as data",
            "Quit budgeting since it felt pointless during tough times",
            "Blame himself and stop saving for good right in the moment"
          ],
          correctAnswer: 1,
          explanation: "Naming the unhealthy belief and viewing the rough month as data, not a verdict, lets him reset using his real track record. Quick recovery, not perfection, is what keeps a mindset healthy."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A healthy mindset balances between anxious obsession and avoidance.",
          "Money is a tool you manage, not a measure of your worth.",
          "Healthy beliefs are specific, testable, and paired with action.",
          "Learning how money works replaces fear with competence.",
          "A healthy money relationship is an ongoing practice, not a fixed state."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "psych10-deepmastery1",
            question: "Which statement best captures a healthy money mindset?",
            options: [
              "Money is the true measure of my value under most conditions",
              "Money is a tool I manage, not my worth",
              "Money should be ignored completely without much thought",
              "Money must be obsessed over daily in a downturn"
            ],
            correctAnswer: 1,
            explanation: "The balanced view treats money as a useful tool without tying it to self-worth. That middle ground avoids both anxious obsession and total avoidance."
          },
          {
            id: "psych10-deepmastery2",
            question: "What makes a belief like small amounts matter healthy?",
            options: [
              "It promises instant wealth across most markets",
              "It is realistic and gets you saving now",
              "It means you never need large sums",
              "It removes the need to budget as the years pass"
            ],
            correctAnswer: 1,
            explanation: "Believing small amounts count is realistic and action-oriented, so you start saving immediately instead of waiting for thousands you may never have."
          },
          {
            id: "psych10-deepmastery3",
            question: "Beyond covering real needs, what does research say about more money?",
            options: [
              "It always doubles your happiness during tough times",
              "It adds less happiness than people expect",
              "It removes all life problems for brand-new buyers",
              "It is the true point of life"
            ],
            correctAnswer: 1,
            explanation: "Past meeting real needs, extra money adds less happiness than expected. A healthy mindset uses money to support a good life, not as the goal itself."
          },
          {
            id: "psych10-deepmastery4",
            question: "How do small actions build healthy beliefs?",
            options: [
              "They provide proof that rewires the old belief",
              "They instantly raise your income right in the moment",
              "They replace the need for any beliefs",
              "They guarantee a perfect mindset forever after enough time"
            ],
            correctAnswer: 0,
            explanation: "Saving even $5 is evidence against I cannot save. Repeated small proof updates your brain's story about you, turning intention into a durable belief."
          },
          {
            id: "psych10-deepmastery5",
            question: "Why does learning how money works support healthy beliefs?",
            options: [
              "It replaces fear with competence",
              "It removes all need to save",
              "It makes money the point of life",
              "It guarantees you never lose money"
            ],
            correctAnswer: 0,
            explanation: "Much money fear comes from not understanding the basics. Learning how saving, credit, and budgeting work turns anxiety into calm competence."
          },
          {
            id: "psych10-deepmastery6",
            question: "Why is a healthy money mindset called an ongoing practice?",
            options: [
              "It is reached once and never changes in plain terms",
              "Stress and setbacks pull you back to old patterns",
              "It requires a bank to maintain it",
              "It only applies to wealthy adults when it is tested"
            ],
            correctAnswer: 1,
            explanation: "Setbacks can revive old beliefs in an instant, so you must keep choosing the balanced view. The skill is recovering quickly, not staying perfect forever."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // strategy-1: Market Share
  // ─────────────────────────────────────────────
  {
    lessonId: "strategy-1",
    sections: [
      {
        type: "concept",
        title: "What Market Share Actually Measures",
        paragraphs: [
          "Market share is the slice of total sales in a market that one company captures. If people spend $100 million a year on sneakers and one brand sells $30 million of them, that brand has 30% market share. It is a scorecard for who is winning customers. Investors care because a company gaining share is usually pulling customers from rivals, a sign its product or price is winning. A company losing share may look fine on the surface while quietly bleeding to competitors, which is why share trends can warn you before the raw sales numbers do.",
          "You can measure share by revenue (dollars sold) or by units (number of items sold), and the two can tell different stories. A luxury brand might have a small unit share but a large revenue share because each item is pricey. A budget brand might sell the most units but earn a smaller revenue slice. Both views matter: unit share shows reach and popularity, while revenue share shows financial weight. Smart analysts look at both, because a company crowing about most units sold might still be the smaller player in the money that counts.",
          "High market share brings real advantages beyond bragging rights. Leaders often enjoy lower costs from buying and producing in bulk, more bargaining power with suppliers, and greater visibility that makes customers trust them by default. This can create a flywheel: being big makes you cheaper and more trusted, which helps you get bigger. But share is not everything. Unprofitable share bought by selling below cost can bankrupt a company, so the real prize is profitable share, a large slice of a market that the company also earns money serving."
        ],
        bullets: [
          "Market share is one company's slice of total sales in a market.",
          "Gaining share usually means winning customers from rivals.",
          "Share can be measured by revenue or by units, telling different stories.",
          "High share can lower costs and boost trust, creating a flywheel.",
          "Profitable share matters more than share bought by selling below cost."
        ],
        realWorldExample: "In a $100 million sneaker market, Brand A sells $30 million (30% share) and Brand B sells $20 million (20%). If next year A rises to 35% and B falls to 15%, A is winning B's customers, a warning sign for B even if the overall market grew and both technically sold more."
      },
      {
        type: "concept",
        title: "Winning Share Without Wrecking Profit",
        paragraphs: [
          "Companies grow share in a few main ways, and each has trade-offs. Cutting prices can win customers fast, but it also shrinks the profit on every sale and can start a price war where rivals cut too and everyone earns less. Improving the product wins share more durably, because customers switch for real value, not just a temporary deal. Marketing and brand-building grow share by making people think of you first. The healthiest share growth usually comes from being genuinely better or better known, not simply cheaper, because price alone is the easiest edge for a rival to copy.",
          "Not all market share is equally valuable, which is why the size and growth of the market matter as much as the slice. A 50% share of a tiny, shrinking market is worth less than a 10% share of a huge, fast-growing one. This is why investors get excited about companies with modest share in enormous emerging markets, the runway to grow is long. It also means a company can win by picking the right pond: dominating a focused niche can be far more profitable than being a small player fighting giants in a crowded mainstream market.",
          "Defending share is as important as gaining it, because rivals are always coming for your customers. Companies protect share by building switching costs (making it a hassle to leave), deepening brand loyalty, and continually improving so there is no reason to defect. The danger is complacency: a leader that stops innovating invites a hungrier competitor to peel away customers, often starting with a cheaper or simpler option at the low end. Market share is never permanently owned; it is continuously earned, and the leaders who forget that are the ones who eventually lose it."
        ],
        bullets: [
          "Cutting prices wins share fast but shrinks profit and risks price wars.",
          "Better products win share more durably than temporary discounts.",
          "A big slice of a huge growing market beats a big slice of a tiny one.",
          "Switching costs and loyalty help defend share from rivals.",
          "Share is continuously earned, never permanently owned."
        ],
        realWorldExample: "A small coffee chain dominates one college town with 60% local share and strong loyalty, earning healthy profits. A national giant has just 5% share of the whole country's coffee market but far more total customers. Each wins differently: the small chain owns a niche, the giant owns scale."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "strategy1-deepmc1",
            question: "What does market share measure?",
            options: [
              "A company's total profit for the year",
              "One company's slice of total market sales",
              "The number of employees a company has",
              "How much a company spends on ads"
            ],
            correctAnswer: 1,
            explanation: "Market share is the portion of all sales in a market that one company captures. Selling $30 million in a $100 million market is 30% share."
          },
          {
            id: "strategy1-deepmc2",
            question: "Why can winning share by cutting prices be risky?",
            options: [
              "It always improves the product for people in general",
              "It shrinks profit and can trigger a price war",
              "It permanently locks in customers in the long run",
              "It raises the total market size almost every time"
            ],
            correctAnswer: 1,
            explanation: "Price cuts win customers fast but reduce profit per sale and can spark a price war where rivals cut too, leaving everyone earning less."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Ways To Chase Share",
        narrative: "Riverside Snacks wants to grow its 12% share of a large, growing chip market. The CEO is torn between two plans: slash prices 20% to grab customers quickly, or invest in a better recipe and packaging to win them for the long term. Rivals are watching closely and could respond either way.",
        details: [
          "The price cut could win share fast but shrink profit on every bag sold.",
          "Rivals may match the price cut, sparking a war that leaves everyone poorer.",
          "The better product wins customers for real value, harder for rivals to copy.",
          "The market is large and growing, so durable share here is especially valuable."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "strategy1-deepaq1",
          question: "Which plan most likely builds durable, profitable share?",
          options: [
            "The 20% price cut for fast growth",
            "Investing in a better recipe and packaging",
            "Matching whatever rivals charge after enough time",
            "Cutting prices even deeper than 20% when it is tested"
          ],
          correctAnswer: 1,
          explanation: "A genuinely better product wins customers for real value that rivals cannot easily copy, protecting profit. Price cuts are quickly matched and can trigger a war that shrinks everyone's earnings."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Market share is one company's slice of total market sales.",
          "Gaining share usually means taking customers from rivals.",
          "Revenue share and unit share can tell different stories.",
          "Better products win more durable share than price cuts.",
          "Share must be continuously earned and defended, never owned."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "strategy1-deepmastery1",
            question: "A brand's share rises while a rival's falls. What does this suggest?",
            options: [
              "The market has stopped growing in a typical week",
              "The brand is winning the rival's customers",
              "Both companies are losing money for regular customers",
              "The rival raised its prices"
            ],
            correctAnswer: 1,
            explanation: "When one company gains share as another loses it, customers are shifting from the rival, a warning sign for the loser even if total sales rose."
          },
          {
            id: "strategy1-deepmastery2",
            question: "How can a luxury brand have small unit share but large revenue share?",
            options: [
              "It sells few items but each is pricey",
              "It sells the most items of anyone",
              "It gives its products away free in almost every situation",
              "It has no competitors at all for the typical teenager"
            ],
            correctAnswer: 0,
            explanation: "High prices mean each sale brings in a lot, so a luxury brand can hold a big money slice while selling relatively few units."
          },
          {
            id: "strategy1-deepmastery3",
            question: "Why is a 10% share of a huge growing market often better than 50% of a tiny one?",
            options: [
              "Small markets always pay more most of the time",
              "The big market offers far more room to grow",
              "Large shares are illegal to hold in the majority of cases",
              "Tiny markets never have rivals as a general rule"
            ],
            correctAnswer: 1,
            explanation: "A big, growing market gives long runway, so even a modest slice can become large. A dominant slice of a tiny shrinking market has little upside."
          },
          {
            id: "strategy1-deepmastery4",
            question: "Why is profitable share more valuable than raw share?",
            options: [
              "Raw share is always fake whenever money feels tight",
              "Share bought below cost can bankrupt a company",
              "Profit does not matter to investors for the average shopper",
              "Big share always means big profit"
            ],
            correctAnswer: 1,
            explanation: "Selling below cost can win share while losing money, which can sink the company. The real prize is a large slice that also earns a profit."
          },
          {
            id: "strategy1-deepmastery5",
            question: "How do companies defend the market share they have won?",
            options: [
              "By ignoring competitors entirely in everyday life",
              "By building switching costs and loyalty",
              "By halting all product improvements",
              "By raising prices every single year"
            ],
            correctAnswer: 1,
            explanation: "Switching costs, loyalty, and constant improvement give customers no reason to leave. Complacency, by contrast, invites hungrier rivals to peel them away."
          },
          {
            id: "strategy1-deepmastery6",
            question: "What advantage can high market share create?",
            options: [
              "Lower costs from producing in bulk",
              "Immunity from all competition forever on a day-to-day basis",
              "A guarantee of zero customer loss",
              "Freedom to ignore product quality"
            ],
            correctAnswer: 0,
            explanation: "Leaders often buy and produce in bulk more cheaply and enjoy more trust, a flywheel where being big helps them get bigger. But share still must be defended."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // strategy-2: Pricing Power
  // ─────────────────────────────────────────────
  {
    lessonId: "strategy-2",
    sections: [
      {
        type: "concept",
        title: "The Signal Of A Strong Business",
        paragraphs: [
          "Pricing power is a company's ability to raise prices without losing many customers. It is one of the clearest signs of a strong business, because it means customers value the product enough to keep buying even as it gets more expensive. Warren Buffett called it the single most important thing to judge a business. A company with pricing power can pass rising costs on to customers and protect its profits; a company without it gets squeezed the moment costs rise, because raising prices would send buyers fleeing to a cheaper rival.",
          "Economists describe this using elasticity, how much demand changes when price changes. Demand is inelastic when a price hike barely dents sales, which is exactly what pricing power looks like. Think of a life-saving medicine or a beloved brand people refuse to give up. Demand is elastic when even a small price rise sends customers running, common for products that are easy to swap, like generic goods where one brand is as good as another. The whole game of pricing power is making your product feel closer to the must-have end than the easily-replaced end.",
          "You can spot pricing power in the financial numbers, especially in profit margins that stay high and steady over time. If a company keeps raising prices year after year while keeping its customers and fat margins, it almost certainly has pricing power. If its margins are thin and shrinking, and it competes mainly by being cheapest, it likely has little. This is why investors prize pricing power so highly: it protects a company through inflation, rising costs, and tough times, acting like a shock absorber that weaker competitors simply do not have."
        ],
        bullets: [
          "Pricing power is raising prices without losing many customers.",
          "It lets a company pass rising costs on and protect profits.",
          "Inelastic demand (small drop when price rises) signals pricing power.",
          "Elastic demand means even small price hikes send customers away.",
          "High, steady profit margins are a fingerprint of pricing power."
        ],
        realWorldExample: "A popular energy drink raises its price from $2.50 to $2.75, a 10% increase, and sales barely dip because fans love the brand. A generic store-brand drink tries the same hike and loses a third of its buyers to the cheaper competitor next to it. The first has pricing power; the second does not."
      },
      {
        type: "concept",
        title: "Where Pricing Power Comes From",
        paragraphs: [
          "Pricing power usually flows from something that makes a product hard to replace. A strong brand is one source: people pay more for a name they trust or that signals status, which is why certain sneakers or phones command premiums over near-identical rivals. Switching costs are another: if leaving a product means losing your data, relearning a system, or breaking connections with friends, you tolerate price hikes rather than deal with the hassle. In both cases the customer is somewhat locked in, and that lock is what lets the company nudge prices up.",
          "Uniqueness and necessity also create pricing power. A product with no good substitute, whether from a patent, a secret recipe, or genuinely superior technology, can charge more because customers have nowhere else to go. Necessity adds to this: people cut luxuries first in hard times but keep paying for things they truly need, so essential products hold their pricing power even in a downturn. The strongest position combines several of these, a necessary, unique product from a trusted brand that is a pain to switch away from, which can raise prices for years.",
          "Pricing power can fade, so it must be protected. Competition is the great eroder: when rivals launch a good-enough alternative, customers gain options and the company's ability to raise prices shrinks. Overusing pricing power is a risk too; push prices too high or too often and you invite competitors in and tempt loyal customers to finally look elsewhere. The wisest companies treat pricing power as a valuable resource to be used carefully, raising prices enough to reward investors while keeping customers feeling they still get real value for their money."
        ],
        bullets: [
          "Strong brands let companies charge premiums over similar rivals.",
          "Switching costs lock customers in, so they tolerate price hikes.",
          "Unique or necessary products can charge more with no good substitute.",
          "Competition erodes pricing power by giving customers alternatives.",
          "Overusing pricing power invites rivals and pushes loyal buyers away."
        ],
        realWorldExample: "A messaging app all your friends use has switching costs: leaving means losing those connections, so you would tolerate a small fee. A new rival app with no friends on it has no such power, it must stay free or better just to get anyone to try it at all."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "strategy2-deepmc1",
            question: "What is pricing power?",
            options: [
              "Always charging the lowest price",
              "Raising prices without losing many customers",
              "The power to set any law about prices",
              "Selling the most units in a market"
            ],
            correctAnswer: 1,
            explanation: "Pricing power is the ability to raise prices while keeping customers. It signals that buyers value the product enough to stay even as it costs more."
          },
          {
            id: "strategy2-deepmc2",
            question: "Inelastic demand means that when price rises, sales…",
            options: [
              "Drop sharply right away",
              "Barely change at all",
              "Rise faster than before",
              "Fall to exactly zero"
            ],
            correctAnswer: 1,
            explanation: "Inelastic demand means a price hike barely dents sales, which is exactly what pricing power looks like. Customers keep buying despite the higher price."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Drinks, Two Fates",
        narrative: "A beloved sports drink brand and a generic store-brand version both face rising ingredient costs. Each considers raising its price 10% to protect profits. The branded drink has loyal fans and a name people trust; the generic one sits on the shelf right beside three nearly identical competitors.",
        details: [
          "The branded drink's loyal fans make its demand relatively inelastic.",
          "The generic drink faces elastic demand with easy, identical substitutes nearby.",
          "The brand can likely pass on costs; the generic risks losing many buyers.",
          "Pushing the price too high could still tempt even loyal fans to look elsewhere."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "strategy2-deepaq1",
          question: "Which drink can most safely raise its price 10%?",
          options: [
            "The generic store-brand drink",
            "The beloved branded sports drink",
            "Neither can raise prices at all",
            "Both equally, with no difference"
          ],
          correctAnswer: 1,
          explanation: "The branded drink's loyal fans make demand inelastic, so a hike barely dents sales. The generic drink sits beside identical rivals, so a price rise would send many buyers to the cheaper option."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Pricing power is raising prices without losing many customers.",
          "Inelastic demand signals pricing power; elastic demand signals none.",
          "High, steady profit margins reveal pricing power in the numbers.",
          "Brands, switching costs, and uniqueness create pricing power.",
          "Competition and overuse can erode pricing power over time."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "strategy2-deepmastery1",
            question: "Why do investors prize pricing power so highly?",
            options: [
              "It forces competitors to close down",
              "It protects profits when costs rise",
              "It guarantees the lowest prices especially early on",
              "It removes all business risk"
            ],
            correctAnswer: 1,
            explanation: "A company with pricing power can pass rising costs to customers and defend its margins, acting as a shock absorber through inflation and tough times."
          },
          {
            id: "strategy2-deepmastery2",
            question: "Which financial clue best signals pricing power?",
            options: [
              "High, steady profit margins over time",
              "Thin, shrinking margins each year",
              "The lowest prices in the market",
              "Rapidly falling total sales at least at first"
            ],
            correctAnswer: 0,
            explanation: "Consistently fat margins while keeping customers show the company can raise prices at will. Thin, shrinking margins suggest it competes mainly on price."
          },
          {
            id: "strategy2-deepmastery3",
            question: "How do switching costs create pricing power?",
            options: [
              "They make leaving a hassle, so buyers tolerate hikes",
              "They lower the product's price directly in the short term",
              "They force rivals to raise their prices with very little effort",
              "They remove the need for a brand"
            ],
            correctAnswer: 0,
            explanation: "If leaving means losing data, relearning a system, or breaking connections, customers accept price increases rather than deal with the hassle."
          },
          {
            id: "strategy2-deepmastery4",
            question: "Why do necessary products keep pricing power in a downturn?",
            options: [
              "People cut luxuries first but keep buying needs",
              "Necessities are always the cheapest goods without much thought",
              "Governments ban price cuts on them",
              "They have the most competitors more often than not"
            ],
            correctAnswer: 0,
            explanation: "In hard times people drop luxuries but keep paying for what they truly need, so essential products hold their pricing power even when money is tight."
          },
          {
            id: "strategy2-deepmastery5",
            question: "What most erodes a company's pricing power?",
            options: [
              "A trusted, well-known brand",
              "Competition offering a good-enough alternative",
              "High switching costs for customers",
              "A patent on a unique product"
            ],
            correctAnswer: 1,
            explanation: "When rivals launch a good-enough substitute, customers gain options and the company's ability to raise prices shrinks. Competition is the great eroder."
          },
          {
            id: "strategy2-deepmastery6",
            question: "What is the danger of overusing pricing power?",
            options: [
              "It permanently locks in every customer under most conditions",
              "It invites rivals and pushes loyal buyers away",
              "It always increases customer loyalty in a downturn",
              "It lowers the company's profit margins across most markets"
            ],
            correctAnswer: 1,
            explanation: "Pushing prices too high or too often tempts competitors to enter and nudges even loyal customers to look elsewhere, so pricing power must be used carefully."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // strategy-3: Economies of Scale
  // ─────────────────────────────────────────────
  {
    lessonId: "strategy-3",
    sections: [
      {
        type: "concept",
        title: "Why Bigger Can Mean Cheaper",
        paragraphs: [
          "Economies of scale means the cost to make each unit falls as a company produces more. Picture a pizza shop that pays $2,000 a month in rent whether it sells 1,000 pizzas or 4,000. At 1,000 pizzas, rent adds $2 to each one; at 4,000, it adds just 50 cents. The rent did not change, but spread across more pizzas, the cost per pizza shrank. This is the core idea: fixed costs get diluted as volume rises, so bigger producers can often make the same product cheaper than smaller ones can.",
          "The savings come from a few sources. Fixed costs like rent, machines, and software get spread over more units, as with the pizza rent. Bulk buying lets big producers negotiate lower prices on ingredients and materials, since suppliers give discounts for large orders. Specialization helps too: a big operation can hire experts and use efficient machines that a tiny shop cannot justify. Together these mean that as output grows, the average cost per unit tends to drop, giving large companies a structural cost advantage that is hard for small rivals to match head-on.",
          "This cost advantage is a powerful competitive weapon. A company with lower per-unit costs can either charge the same price as rivals and earn fatter profits, or charge less and still make money while undercutting competitors who cannot afford to match. This is a key reason big retailers can offer everyday low prices that crush smaller stores. Scale can even feed itself: lower costs allow lower prices, which win more customers, which raises volume, which lowers costs further, a flywheel that helps big companies pull further ahead. A small rival trying to match those prices would simply lose money on every sale, since its costs per unit are higher, so it often cannot even enter the price fight in the first place."
        ],
        bullets: [
          "Economies of scale mean cost per unit falls as output rises.",
          "Fixed costs like rent get spread thinner over more units.",
          "Bulk buying earns discounts small producers cannot get.",
          "Lower per-unit costs allow fatter profits or lower prices.",
          "Scale can feed itself in a cost-cutting flywheel."
        ],
        realWorldExample: "A pizza shop pays $2,000 rent monthly. Selling 1,000 pizzas, rent alone adds $2 per pizza. Selling 4,000, it adds only 50 cents. Same rent, but the busier shop's cost per pizza is $1.50 lower, letting it either earn more per pizza or charge less than a slower rival and still profit."
      },
      {
        type: "concept",
        title: "The Limits And Traps Of Scale",
        paragraphs: [
          "Scale is powerful but not unlimited, because at some point costs per unit stop falling and start rising, called diseconomies of scale. A company can grow so large that it becomes slow and bureaucratic, with layers of managers, poor communication, and waste that a nimble small firm avoids. Coordinating thousands of workers across many locations adds cost and confusion. So bigger is not automatically better forever; there is a sweet spot, and past it, the very size that once cut costs starts adding them back through complexity and sluggishness.",
          "Scale advantages also depend on the type of business. In manufacturing, where huge factories and bulk materials dominate costs, scale matters enormously. In a business built on creativity or personal service, like a custom tailor or a boutique consultancy, being bigger may add little and can even hurt quality. This is why some small firms thrive beside giants: they compete on things scale cannot buy, unique products, personal attention, speed, or a focused niche, rather than trying to win the cost battle they would surely lose.",
          "For investors, economies of scale explain why some industries end up dominated by a few huge players while others stay full of small firms. Where scale is decisive, like semiconductor factories costing billions, only giants can compete, so the industry consolidates. Where scale barely helps, like local restaurants, thousands of small players coexist. Understanding whether an industry rewards scale tells you a lot about who will win: whether a newcomer can realistically challenge the leaders, or whether the cost advantage of the incumbents is simply too big to overcome."
        ],
        bullets: [
          "Diseconomies of scale appear when size makes a firm slow and wasteful.",
          "Growing too large adds bureaucracy, poor communication, and cost.",
          "Scale matters hugely in manufacturing, less in creative or personal services.",
          "Small firms beat giants on uniqueness, service, speed, and niche focus.",
          "Whether scale is decisive shapes whether an industry consolidates."
        ],
        realWorldExample: "A giant clothing chain makes basic tees incredibly cheaply through massive scale, crushing rivals on price. But a local custom tailor thrives right next door by offering fitted, personalized suits, something scale cannot deliver. Each wins in the arena that fits it: the giant on cost, the tailor on personal craft."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "strategy3-deepmc1",
            question: "What does economies of scale mean?",
            options: [
              "Total costs fall as a company shrinks",
              "Cost per unit falls as output rises",
              "Prices must rise as sales grow as the years pass",
              "Small firms always beat large ones"
            ],
            correctAnswer: 1,
            explanation: "Economies of scale means the cost to make each unit drops as production rises, mainly because fixed costs get spread over more units and bulk buying saves money."
          },
          {
            id: "strategy3-deepmc2",
            question: "What are diseconomies of scale?",
            options: [
              "Costs per unit rising when a firm grows too large",
              "Discounts earned from buying in bulk for brand-new buyers",
              "The savings from spreading fixed costs right in the moment",
              "A flywheel of ever-lower costs during tough times after enough time"
            ],
            correctAnswer: 0,
            explanation: "Diseconomies of scale occur when a company grows so big that bureaucracy, poor communication, and waste push per-unit costs back up."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Chain Versus The Corner Shop",
        narrative: "A national coffee chain and a small independent cafe operate on the same street. The chain buys beans by the ton at a discount and spreads its marketing and app costs across thousands of stores. The independent buys small batches and handles everything itself, but customers love its unique drinks and personal service.",
        details: [
          "The chain's bulk bean buying and shared costs give it a real per-cup cost edge.",
          "Spreading app and marketing costs over thousands of stores dilutes them heavily.",
          "The independent cannot match the chain's cost advantage on price alone.",
          "The cafe competes on uniqueness and personal service, which scale cannot buy."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "strategy3-deepaq1",
          question: "How should the small cafe best compete against the chain?",
          options: [
            "Match the chain's low prices directly",
            "Compete on unique drinks and personal service",
            "Buy beans one cup at a time",
            "Open thousands of stores immediately in plain terms"
          ],
          correctAnswer: 1,
          explanation: "The cafe cannot win the cost battle against the chain's scale, so undercutting on price would fail. It should compete on what scale cannot deliver: unique drinks, personal attention, and a focused niche."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Economies of scale mean per-unit cost falls as output rises.",
          "Fixed-cost dilution, bulk buying, and specialization drive the savings.",
          "Lower costs let big firms profit more or undercut rivals.",
          "Diseconomies of scale appear when firms grow too large and slow.",
          "Whether scale is decisive shapes whether an industry consolidates."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "strategy3-deepmastery1",
            question: "Why does spreading fixed costs over more units lower per-unit cost?",
            options: [
              "The fixed cost itself shrinks in plain terms",
              "The same cost is divided among more units",
              "Bulk buying stops being needed for people in general",
              "Prices automatically rise with volume in the long run"
            ],
            correctAnswer: 1,
            explanation: "A fixed cost like rent stays the same, but dividing it across more units means each unit carries a smaller slice, so average cost per unit falls."
          },
          {
            id: "strategy3-deepmastery2",
            question: "How does bulk buying create economies of scale?",
            options: [
              "Suppliers discount large orders",
              "It raises the price of materials",
              "It eliminates all fixed costs",
              "It slows down production"
            ],
            correctAnswer: 0,
            explanation: "Suppliers give big producers lower prices for large orders, so buying in bulk cuts the cost of materials per unit, a key source of scale savings."
          },
          {
            id: "strategy3-deepmastery3",
            question: "How can a firm with lower per-unit costs use that advantage?",
            options: [
              "It must always raise its prices almost every time",
              "Charge less and still profit, undercutting rivals",
              "It has to stop growing immediately",
              "It cannot earn any extra profit"
            ],
            correctAnswer: 1,
            explanation: "Lower costs let a firm either keep the price and earn fatter margins or charge less while still profiting, undercutting rivals who cannot match it."
          },
          {
            id: "strategy3-deepmastery4",
            question: "What causes diseconomies of scale?",
            options: [
              "Buying materials in bulk under real pressure",
              "Bureaucracy and waste from growing too large",
              "Spreading fixed costs thinner sooner or later",
              "Hiring a few expert specialists in a typical week"
            ],
            correctAnswer: 1,
            explanation: "Past a certain size, layers of management, poor communication, and coordination costs add expense, pushing per-unit costs back up."
          },
          {
            id: "strategy3-deepmastery5",
            question: "In which business does scale matter least?",
            options: [
              "A huge semiconductor factory for regular customers",
              "A custom tailor offering personal service",
              "A national bulk retailer in almost every situation",
              "A large car manufacturer"
            ],
            correctAnswer: 1,
            explanation: "Creative or personal-service businesses gain little from size and can even lose quality. Manufacturing and bulk retail, by contrast, reward scale heavily."
          },
          {
            id: "strategy3-deepmastery6",
            question: "Why do some industries consolidate into a few giants?",
            options: [
              "Scale advantages there are decisive",
              "Governments require exactly three firms",
              "Small firms are banned from competing",
              "Customers dislike having choices"
            ],
            correctAnswer: 0,
            explanation: "Where scale is decisive, like billion-dollar chip factories, only giants can compete on cost, so the industry consolidates around a few large players."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // strategy-4: Network Effects
  // ─────────────────────────────────────────────
  {
    lessonId: "strategy-4",
    sections: [
      {
        type: "concept",
        title: "When More Users Make A Product Better",
        paragraphs: [
          "A network effect exists when a product becomes more valuable to each user as more people use it. A phone is useless if you are the only owner, but with millions of users it becomes essential, that added value comes purely from other people joining. Social apps are the classic case: you join the app your friends are on, and your presence then pulls in more friends. This is different from most products, where your enjoyment does not depend on how many strangers also bought it. Network effects turn a growing user base into a growing advantage.",
          "There are two main flavors. Direct network effects mean more users of the same type make it better for everyone, like a messaging app where every new person is someone else you can reach. Indirect network effects work across two groups that attract each other, like a game console: more players attract more game makers, and more games attract more players. Marketplaces run on this too, more buyers draw more sellers, and more sellers draw more buyers. In each case, growth on one side feeds growth on the other, and the whole thing snowballs.",
          "Network effects create some of the strongest competitive moats that exist. Once a network is large, a rival cannot win just by building a better product, because the new product starts empty and empty is nearly worthless. This is the chicken-and-egg problem: nobody joins because nobody is there yet. That is why dominant networks are so hard to dislodge, even a superior competitor struggles to pull people away from where everyone already is. The value is not just in the product itself but in the crowd already using it. History is full of technically excellent apps that failed simply because they could never gather enough users to matter, while clunkier products with huge networks kept winning year after year."
        ],
        bullets: [
          "A network effect means each user gains value as more people join.",
          "Direct effects: more same-type users help everyone, like messaging.",
          "Indirect effects: two groups attract each other, like players and game makers.",
          "Marketplaces grow as more buyers draw sellers and vice versa.",
          "Empty networks are nearly worthless, the chicken-and-egg problem."
        ],
        realWorldExample: "A messaging app with 3 users is nearly useless; with 300 million it is essential, because value comes from who else is reachable. A rival app might be technically better, but launching empty, it offers almost nothing, so people stay where their friends already are. The crowd itself is the moat."
      },
      {
        type: "concept",
        title: "Building, And Losing, A Network Moat",
        paragraphs: [
          "The hardest part of a network business is starting, because early on the network is nearly empty and offers little value. Companies solve this chicken-and-egg problem with clever tactics: focusing on one narrow group first so it feels full for them, subsidizing one side (like paying early sellers or offering free credits), or launching where a tight community already exists. The goal is to reach critical mass, the tipping point where the network is valuable enough that growth becomes self-sustaining and users start recruiting each other without being pushed.",
          "Once past critical mass, network effects can produce winner-take-most markets, where the biggest network keeps growing while smaller ones wither. Because value concentrates where the users are, the leader often captures the lion's share, and second place struggles. This is why so many categories, from search to social to marketplaces, end up dominated by one or two giants. Investors love genuine network effects precisely because they can create durable, near-monopoly positions that print profits for years, since the advantage strengthens automatically as the network grows.",
          "Network moats are strong but not invincible, and they can collapse. If users start leaving, the same math runs in reverse: fewer users make the product less valuable, which pushes more users out, a downward spiral. Networks can be beaten by a rival that peels off a specific segment, by a shift in what users want, or by their own missteps like privacy scandals or clutter that make people willing to switch. So even a dominant network must keep serving its users well, because the crowd that built the moat can also dismantle it."
        ],
        bullets: [
          "Starting is hardest because an empty network offers little value.",
          "Subsidizing one side or targeting a niche helps reach critical mass.",
          "Critical mass is when growth becomes self-sustaining.",
          "Network effects often create winner-take-most markets.",
          "Networks can collapse in reverse if users start leaving."
        ],
        realWorldExample: "A ride app solved chicken-and-egg by paying early drivers guarantees so riders always found a car, and plentiful cars drew more riders until it reached critical mass in a city. But networks can reverse: if drivers left, waits would grow, riders would quit, and fewer riders would drive off more drivers."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "strategy4-deepmc1",
            question: "What is a network effect?",
            options: [
              "A product that gets cheaper to make at scale",
              "A product that gains value as more people use it",
              "A brand people trust for its status for the typical teenager",
              "A cost that rises with more customers most of the time"
            ],
            correctAnswer: 1,
            explanation: "A network effect means each user gets more value as more people join. A phone or messaging app is far more useful once many others use it too."
          },
          {
            id: "strategy4-deepmc2",
            question: "What is the chicken-and-egg problem for networks?",
            options: [
              "Costs rise faster than sales grow as a general rule",
              "Nobody joins because nobody is there yet",
              "Too many users overload the system",
              "Prices must be cut to win customers"
            ],
            correctAnswer: 1,
            explanation: "A new network starts empty, and empty is nearly worthless, so nobody wants to join because no one else has joined yet. This makes starting the hardest part."
          }
        ]
      },
      {
        type: "scenario",
        title: "Launching Against A Giant",
        narrative: "A startup builds a messaging app that is genuinely faster and cleaner than the giant everyone already uses. Months after launch, growth is painfully slow. Users try it, see none of their friends are on it, and drift back to the crowded app they came from, even though they admit the newcomer is technically better.",
        details: [
          "The giant's huge user base is a network-effect moat, not just a good product.",
          "The startup launches nearly empty, so it offers little value at first.",
          "Being better on features cannot overcome the pull of where friends already are.",
          "Targeting one tight community first could help it reach critical mass."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "strategy4-deepaq1",
          question: "Why is the better app still struggling to win users?",
          options: [
            "Its features are actually worse for people in general",
            "It launched empty, so it offers little value yet",
            "It charges far more than the giant in the long run",
            "Network effects do not apply to messaging"
          ],
          correctAnswer: 1,
          explanation: "A network's value comes from who else is on it. Starting nearly empty, the app offers little even if its features are superior, so users drift back to where their friends already are."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A network effect means each user gains value as more people join.",
          "Direct and indirect network effects both concentrate value on the crowd.",
          "Empty networks are nearly worthless, the chicken-and-egg problem.",
          "Reaching critical mass makes growth self-sustaining.",
          "Network moats are strong but can collapse in reverse if users leave."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "strategy4-deepmastery1",
            question: "What makes a phone more valuable as more people own one?",
            options: [
              "It gets cheaper to manufacture in everyday life",
              "There are more people you can reach",
              "The brand becomes more trusted",
              "The battery lasts longer for the average shopper"
            ],
            correctAnswer: 1,
            explanation: "A network effect means value comes from other users. Each new phone owner is someone else you can call, so the network grows more useful as it grows."
          },
          {
            id: "strategy4-deepmastery2",
            question: "A game console attracting more players and more game makers shows…",
            options: [
              "Economies of scale",
              "Indirect network effects",
              "Pricing power on a day-to-day basis",
              "Diseconomies of scale"
            ],
            correctAnswer: 1,
            explanation: "Indirect network effects link two groups: more players draw more game makers, and more games draw more players. Each side feeds the other's growth."
          },
          {
            id: "strategy4-deepmastery3",
            question: "Why can a superior new product still fail against a big network?",
            options: [
              "Better products are always too expensive at least at first",
              "It starts empty, and empty is nearly worthless",
              "Networks never lose any users especially early on",
              "Features do not matter to anyone"
            ],
            correctAnswer: 1,
            explanation: "A network's value lies in its crowd. A better but empty product offers little, so users stay where everyone else already is, the core of the moat."
          },
          {
            id: "strategy4-deepmastery4",
            question: "What is critical mass in a network?",
            options: [
              "The point where growth becomes self-sustaining",
              "The maximum users a network can hold",
              "The moment costs stop falling",
              "The price at which demand disappears"
            ],
            correctAnswer: 0,
            explanation: "Critical mass is the tipping point where the network is valuable enough that users recruit each other and growth continues without being pushed."
          },
          {
            id: "strategy4-deepmastery5",
            question: "How do companies overcome the chicken-and-egg problem?",
            options: [
              "By raising prices on early users",
              "By subsidizing one side or targeting a niche",
              "By waiting for users to appear on their own",
              "By removing all product features in the short term"
            ],
            correctAnswer: 1,
            explanation: "Paying or subsidizing one side, or focusing on a tight community so it feels full, helps a network reach critical mass and start growing on its own."
          },
          {
            id: "strategy4-deepmastery6",
            question: "How can a strong network moat collapse?",
            options: [
              "By adding too many new features",
              "Users leaving triggers a downward spiral",
              "By reaching critical mass too fast",
              "By earning too much profit with very little effort"
            ],
            correctAnswer: 1,
            explanation: "The math runs in reverse: departing users make the product less valuable, pushing more to leave. Missteps or shifting tastes can start the spiral."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // strategy-5: Brand Value
  // ─────────────────────────────────────────────
  {
    lessonId: "strategy-5",
    sections: [
      {
        type: "concept",
        title: "Why A Name Can Be Worth Billions",
        paragraphs: [
          "Brand value is the extra worth a trusted name adds beyond the physical product. Two shirts can be nearly identical in fabric and stitching, yet one sells for $60 and the other for $15 purely because of the logo on it. That $45 gap is brand value in action. It reflects the trust, emotion, and meaning people attach to a name built over years of consistent quality, marketing, and experience. A brand is essentially a promise in the customer's mind, and a strong one lets a company charge more, sell more easily, and keep customers coming back.",
          "Brands create value in several concrete ways. They reduce the customer's risk: when you do not know which option is good, you reach for the name you trust, so a brand becomes a mental shortcut that saves buyers effort. They enable premium pricing, since people pay extra for the trust and status a name carries. They build loyalty that brings repeat purchases without constant marketing spending. And they make launching new products easier, because customers who trust a brand will try its new offerings, giving established names a head start that unknown newcomers lack.",
          "A strong brand acts as a competitive moat that is genuinely hard to copy. A rival can imitate your product features fairly quickly, but it cannot instantly replicate decades of trust and emotional connection in customers' minds. That is why the world's most valuable brands are worth tens of billions of dollars as assets, even though you cannot touch them. Brand is the reason a customer picks one nearly identical product over another and pays more to do it, and that preference, repeated across millions of buyers, turns into enormous, durable value."
        ],
        bullets: [
          "Brand value is the extra worth a trusted name adds beyond the product.",
          "Brands reduce risk by acting as a trusted mental shortcut.",
          "Strong brands enable premium pricing and repeat loyalty.",
          "A trusted brand makes launching new products far easier.",
          "Brands are hard to copy, making them a durable moat."
        ],
        realWorldExample: "Two plain white sneakers cost the same to make. One carries a famous logo and sells for $90; the other, unbranded, sells for $30. The $60 difference is not better rubber or cloth, it is brand value: the trust, status, and emotion the logo carries in buyers' minds."
      },
      {
        type: "concept",
        title: "Building And Protecting Brand Value",
        paragraphs: [
          "Brands are built slowly through consistency, delivering the same quality and experience every time so customers learn exactly what to expect. Every interaction, the product, the packaging, the service, the ads, either reinforces or chips away at the promise. Great brands also stand for something clear and emotional, not just features: an idea, a feeling, or a set of values customers want to associate with. This is why brand-building takes years and heavy investment, and why it cannot be rushed. Trust is earned one consistent experience at a time and compounds only with patience.",
          "Brand value is fragile in a way factories are not, because it lives in perception and can be damaged fast. A safety scandal, a broken promise, poor quality, or a tone-deaf move can erode years of trust in weeks, and rebuilding it is far slower than losing it. Companies protect their brands fiercely for this reason, guarding quality, handling complaints carefully, and staying true to what the brand stands for. A single viral failure can cost a fortune, which is why strong companies treat their reputation as one of their most valuable and vulnerable assets.",
          "Brands can also lose value gradually through neglect or dilution. Overextending a name onto too many unrelated or low-quality products can confuse customers and cheapen the brand, so the premium fades. Failing to stay relevant as tastes change can leave a once-loved brand feeling dated. The strongest brands keep evolving while staying true to their core promise, updating their look and offerings without betraying what made customers trust them. Managed well, a brand is an asset that can appreciate for generations; managed poorly, it can quietly waste away."
        ],
        bullets: [
          "Brands are built slowly through consistent quality and experience.",
          "Great brands stand for a clear idea or feeling, not just features.",
          "Brand value is fragile and can be damaged fast by scandals.",
          "Overextending a name onto weak products can dilute the brand.",
          "Strong brands evolve while staying true to their core promise."
        ],
        realWorldExample: "A trusted food brand spent decades earning loyalty, then a contamination scare hit the news. Sales dropped sharply in weeks, and rebuilding trust took years of careful quality proof and honest communication, showing how brand value that takes decades to build can be badly damaged almost overnight."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "strategy5-deepmc1",
            question: "What is brand value?",
            options: [
              "The cost of the materials in a product in a downturn",
              "The extra worth a trusted name adds beyond the product",
              "The number of stores a company owns without much thought",
              "The price of a company's advertising more often than not"
            ],
            correctAnswer: 1,
            explanation: "Brand value is the additional worth a trusted name adds on top of the physical product, like a logo that lets a shirt sell for far more than an identical unbranded one."
          },
          {
            id: "strategy5-deepmc2",
            question: "Why is a strong brand a hard-to-copy moat?",
            options: [
              "Rivals cannot legally sell any products across most markets",
              "Trust and emotion take years to replicate",
              "Brands make products cheaper to build",
              "Logos are impossible to design under most conditions"
            ],
            correctAnswer: 1,
            explanation: "A rival can copy product features quickly, but decades of trust and emotional connection in customers' minds cannot be replicated fast, making brand a durable moat."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Scare That Tested A Brand",
        narrative: "A beloved snack brand spent thirty years building trust and charging a premium customers gladly paid. Then a quality scare spread online, with videos claiming its products were unsafe. Within weeks, sales fell sharply and the premium price customers once accepted suddenly felt unjustified to many of them.",
        details: [
          "The brand's premium price rested on trust built over three decades.",
          "Brand value lives in perception, so it can be damaged very fast.",
          "Rebuilding trust will take far longer than the weeks it took to lose it.",
          "Careful quality proof and honest communication are the path back."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "strategy5-deepaq1",
          question: "What best explains why the scare hurt the brand so quickly?",
          options: [
            "Brand value lives in perception and is fragile",
            "The product's materials suddenly cost more under real pressure",
            "Customers forgot the brand existed almost every time",
            "The company stopped making the product sooner or later"
          ],
          correctAnswer: 0,
          explanation: "Brand value is built on perception and trust, which can erode in weeks even after decades of building. A scare damages that perception fast, and rebuilding it takes far longer."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Brand value is the extra worth a trusted name adds beyond the product.",
          "Brands reduce risk, enable premium pricing, and build loyalty.",
          "A strong brand is a hard-to-copy competitive moat.",
          "Brands are built slowly but can be damaged fast.",
          "Overextension and neglect can dilute even strong brands."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "strategy5-deepmastery1",
            question: "Why can two nearly identical shirts sell at very different prices?",
            options: [
              "One uses secret illegal materials for brand-new buyers",
              "Brand value adds worth beyond the product",
              "Prices are set randomly by stores right in the moment",
              "The cheaper one is always defective"
            ],
            correctAnswer: 1,
            explanation: "The gap reflects brand value, the trust, status, and emotion a name carries, not differences in the physical fabric or stitching of the shirts."
          },
          {
            id: "strategy5-deepmastery2",
            question: "How does a brand reduce a customer's risk?",
            options: [
              "It guarantees the lowest price after enough time",
              "It acts as a trusted mental shortcut",
              "It removes the need to pay",
              "It bans all competing products when it is tested"
            ],
            correctAnswer: 1,
            explanation: "When unsure which option is good, buyers reach for the name they trust. The brand becomes a shortcut that saves effort and lowers the risk of a bad choice."
          },
          {
            id: "strategy5-deepmastery3",
            question: "Why does a trusted brand make launching new products easier?",
            options: [
              "New products require no testing in plain terms",
              "Customers who trust the brand will try new offerings",
              "The law protects branded launches for people in general",
              "New products cost nothing to make in the long run"
            ],
            correctAnswer: 1,
            explanation: "Existing trust transfers to new offerings, so loyal customers give them a chance. Unknown newcomers lack that head start and must earn trust from scratch."
          },
          {
            id: "strategy5-deepmastery4",
            question: "Why is brand value considered fragile?",
            options: [
              "It lives in perception and can erode fast",
              "It is stored in easily broken machines under real pressure",
              "It disappears every accounting year almost every time",
              "It cannot ever be damaged at all"
            ],
            correctAnswer: 0,
            explanation: "Because brand value is perception, a scandal or broken promise can erode years of trust in weeks, and rebuilding is far slower than losing it."
          },
          {
            id: "strategy5-deepmastery5",
            question: "How can overextending a brand hurt its value?",
            options: [
              "It always increases the premium price sooner or later",
              "Too many weak products can dilute the brand",
              "It makes the brand impossible to copy",
              "It removes the need for consistency in a typical week"
            ],
            correctAnswer: 1,
            explanation: "Stretching a name onto many unrelated or low-quality products confuses customers and cheapens the brand, so the premium it once commanded fades."
          },
          {
            id: "strategy5-deepmastery6",
            question: "How do the strongest brands stay valuable over time?",
            options: [
              "They never change anything at all in almost every situation",
              "They evolve while keeping their core promise",
              "They stop advertising completely for regular customers",
              "They lower quality to cut costs"
            ],
            correctAnswer: 1,
            explanation: "Great brands update their look and offerings to stay relevant while staying true to the core promise that earned trust, so they keep appreciating."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // strategy-6: Sustainable Advantage
  // ─────────────────────────────────────────────
  {
    lessonId: "strategy-6",
    sections: [
      {
        type: "concept",
        title: "The Moat That Lasts",
        paragraphs: [
          "A sustainable competitive advantage, often called an economic moat, is an edge that protects a company's profits from competitors for a long time. The name comes from the water-filled moat around a castle: it keeps attackers out. In business, whenever a company earns high profits, rivals rush in to copy it and grab a share, which normally drives profits down. A moat is whatever stops them, the structural reason a company can keep earning well year after year while competitors fail to catch up. Without a moat, good profits are temporary; with one, they can last decades.",
          "Moats come in a handful of recognizable types, and the ones in this unit are the main sources. Cost advantages from economies of scale let a company undercut rivals and still profit. Network effects make a product more valuable as more people use it, so the leader keeps pulling ahead. Brand value creates trust and loyalty that rivals cannot quickly copy. Switching costs and pricing power lock customers in and let a company hold its prices. The strongest companies often combine several of these, stacking moats so that beating them requires overcoming many barriers at once.",
          "The key word is sustainable, meaning the advantage must last, not just exist for a moment. A cool feature or a temporary low price is not a moat, because a competitor can copy the feature or match the price within months. A real moat is durable: it is genuinely hard for rivals to overcome even when they try hard and spend heavily. This is exactly what long-term investors hunt for, because a durable moat is what lets a company compound profits for years, turning a good business into a great long-term investment."
        ],
        bullets: [
          "A moat is a durable edge that protects profits from competitors.",
          "High profits attract rivals; a moat is what keeps them out.",
          "Main moat types: scale, network effects, brand, switching costs, pricing power.",
          "Strong companies stack several moats together.",
          "Sustainable means the advantage lasts, not just exists briefly."
        ],
        realWorldExample: "A company invents a popular gadget feature and earns big profits, but with no moat, rivals copy the feature within a year and profits fall. A second company with a network-effect moat keeps its lead for a decade, because copying its product cannot copy the millions of users already on it."
      },
      {
        type: "concept",
        title: "Spotting And Testing Durability",
        paragraphs: [
          "You test whether an advantage is a real moat by asking how easily a well-funded rival could overcome it. If a determined competitor with plenty of money could copy or beat the edge within a year or two, it is not a durable moat, it is a temporary head start. Ask what specifically stops rivals: is it scale they cannot match, a network they cannot replicate, a brand built over decades, or costs to switch that customers will not pay? A vague answer like they just have a better product usually signals the advantage is weaker than it looks.",
          "The clearest evidence of a moat shows up in sustained financial results over many years. A company with a real moat tends to keep high profit margins and strong returns even as competitors attack, because the moat keeps them at bay. If margins stay fat year after year while rivals fail to close the gap, the moat is doing its job. If margins are shrinking and the company constantly cuts prices just to keep customers, the supposed moat is probably leaking. Numbers over time reveal durability far more honestly than a good story about the product does.",
          "Even real moats can erode, so the best companies actively widen them. Technology shifts, new competitors, and changing customer tastes can all weaken an advantage that once looked bulletproof, which is why yesterday's dominant firms sometimes vanish. Wise companies reinvest to strengthen their moat, improving the product, deepening the network, protecting the brand, so the gap grows rather than shrinks. For an investor, the goal is a business whose advantage is not only strong today but is being defended and widened, because that is what protects profits, and your investment, for the long haul."
        ],
        bullets: [
          "Test a moat by asking if a funded rival could beat it in a year or two.",
          "Name the specific barrier, not a vague better product claim.",
          "Sustained high margins over years are the clearest moat evidence.",
          "Shrinking margins and constant price cuts signal a leaking moat.",
          "Even real moats erode, so great companies keep widening them."
        ],
        realWorldExample: "An investor compares two firms. One boasts a slick new feature but thin, falling margins as rivals copy it, no real moat. The other holds fat margins for a decade because switching away from its product is a huge hassle for customers. The second's durable moat is what makes it the safer long-term bet."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "strategy6-deepmc1",
            question: "What is an economic moat?",
            options: [
              "A short-term boost in a company's sales",
              "A durable edge that protects profits from rivals",
              "The water around a company's headquarters for the typical teenager",
              "A tax break given to large companies"
            ],
            correctAnswer: 1,
            explanation: "A moat is a lasting structural advantage that keeps competitors from eroding a company's profits, letting it earn well year after year."
          },
          {
            id: "strategy6-deepmc2",
            question: "Why is a copyable new feature not a real moat?",
            options: [
              "Features are always low quality most of the time",
              "Rivals can match it within months",
              "Features cost too much to build",
              "It permanently locks in customers"
            ],
            correctAnswer: 1,
            explanation: "A moat must be durable. A feature a competitor can copy quickly is only a temporary head start, not a lasting barrier that protects profits over time."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Firms, One Investor",
        narrative: "An investor studies two companies. GadgetCo just launched a clever feature and profits are soaring, but its margins are already thinning as competitors copy it. FlowApp has grown a huge user network over eight years and keeps fat, steady margins because leaving it means losing all your connections and data.",
        details: [
          "GadgetCo's feature is easily copied, so its edge is a temporary head start.",
          "FlowApp's network and switching costs are barriers rivals cannot quickly beat.",
          "FlowApp's fat, steady margins over years are strong evidence of a real moat.",
          "GadgetCo's thinning margins hint that its advantage is already leaking."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "strategy6-deepaq1",
          question: "Which company has the more sustainable competitive advantage?",
          options: [
            "GadgetCo, because of its clever feature for regular customers",
            "FlowApp, due to its network and switching costs",
            "Neither has any real advantage in a typical week",
            "GadgetCo, since its profits are soaring now"
          ],
          correctAnswer: 1,
          explanation: "FlowApp's network and switching costs are durable barriers reflected in years of fat margins. GadgetCo's copyable feature and thinning margins reveal only a temporary head start, not a real moat."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A moat is a durable edge protecting profits from competitors.",
          "Main moats include scale, network effects, brand, and switching costs.",
          "Sustainable means the advantage lasts, not just exists briefly.",
          "Sustained high margins over years are the clearest moat evidence.",
          "Even real moats erode, so great companies keep widening them."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "strategy6-deepmastery1",
            question: "Why do high profits normally attract competitors?",
            options: [
              "Rivals rush in to copy and grab a share",
              "Profits are illegal above a certain level in everyday life",
              "Customers demand more competitors whenever money feels tight",
              "High profits scare rivals away for the average shopper"
            ],
            correctAnswer: 0,
            explanation: "When a company earns big profits, rivals pile in to grab some, which normally drives profits down. A moat is what stops them and keeps profits high."
          },
          {
            id: "strategy6-deepmastery2",
            question: "Which is a genuine source of a durable moat?",
            options: [
              "A temporary sale price on a day-to-day basis",
              "Network effects that grow with users",
              "A single viral ad campaign",
              "A feature rivals can copy fast"
            ],
            correctAnswer: 1,
            explanation: "Network effects strengthen as more users join, a durable barrier. Temporary prices, one-off ads, and copyable features do not last, so they are not moats."
          },
          {
            id: "strategy6-deepmastery3",
            question: "How do you test whether an advantage is truly sustainable?",
            options: [
              "Check if it looks impressive today especially early on",
              "Ask if a funded rival could beat it soon",
              "See if customers like the product at least at first",
              "Count how many ads it runs in the short term"
            ],
            correctAnswer: 1,
            explanation: "If a well-funded competitor could copy or beat the edge within a year or two, it is only a head start. A real moat resists even determined, well-funded attacks."
          },
          {
            id: "strategy6-deepmastery4",
            question: "What financial pattern best signals a real moat?",
            options: [
              "Shrinking margins with constant price cuts",
              "High margins sustained over many years",
              "Soaring sales with rapidly falling profits",
              "A single great quarter of results"
            ],
            correctAnswer: 1,
            explanation: "Margins that stay fat year after year while rivals fail to close the gap show the moat is holding. Shrinking margins suggest the advantage is leaking away."
          },
          {
            id: "strategy6-deepmastery5",
            question: "Why do strong companies keep reinvesting in their moat?",
            options: [
              "Regulators require yearly reinvestment with very little effort",
              "Even real moats can erode over time",
              "Moats become illegal if left alone more often than not",
              "Reinvesting lowers their profits on purpose"
            ],
            correctAnswer: 1,
            explanation: "Technology shifts, new rivals, and changing tastes can weaken any moat, so wise companies reinvest to widen the gap rather than let it shrink."
          },
          {
            id: "strategy6-deepmastery6",
            question: "Why do long-term investors hunt for durable moats?",
            options: [
              "Moats guarantee a stock never falls without much thought",
              "A durable moat lets profits compound for years",
              "Moats remove all need to run the business",
              "Moats make products free to produce in a downturn"
            ],
            correctAnswer: 1,
            explanation: "A durable moat protects profits from competitors, letting a company compound earnings over many years, which turns a good business into a great long-term investment."
          }
        ]
      }
    ]
  }
]
