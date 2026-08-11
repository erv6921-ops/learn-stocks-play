import { StructuredLessonContent } from "@/types"

// Deepened lesson content (Mortgages-depth rebuild) for: financial-statements, financial-ratios, valuation
// Each entry replaces the thin auto-generated version for its lessonId.
export const deepStatementsRatiosVal: StructuredLessonContent[] = [
  // ═══════════════════════════════════════════════════════════════
  // fin-stmt-1: Income Statement
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "fin-stmt-1",
    sections: [
      {
        type: "concept",
        title: "What the Income Statement Shows",
        paragraphs: [
          "The income statement answers one simple question: did the company make money over a period of time? Unlike a photo, it's more like a video - it covers a stretch, usually three months (a quarter) or a full year. It starts with revenue, the total money brought in from selling products or services, and then subtracts every cost until it reaches the bottom line: net income, the actual profit. If a lemonade stand sold $500 of lemonade in a summer, that $500 is revenue, but the profit is whatever is left after paying for lemons, sugar, cups, and the kid's helper.",
          "The statement is built as a waterfall, flowing top to bottom. Revenue sits at the very top - that's why people call it the 'top line.' From there you subtract the cost of making the product (cost of goods sold), then the costs of running the business (rent, salaries, marketing), then interest on debt and taxes. Each subtraction reveals a new layer of profit. This ordering matters: a company can have huge revenue and still lose money if the costs stacked below it are even bigger. Revenue is a starting point, never the finish line.",
          "Investors read the income statement to judge whether a business is genuinely healthy. A company growing revenue 30% a year while turning a solid profit looks very different from one growing revenue fast while bleeding cash. Because the statement covers a period, you can compare this year to last year and spot trends - is profit rising, flat, or shrinking? Over time, that trend tells you far more than a single number ever could. It's the first document analysts open when they want to understand how a company actually performs."
        ],
        bullets: [
          "The income statement covers a period (a quarter or year), not a single moment in time.",
          "Revenue is the 'top line' - total sales before any costs are subtracted.",
          "Costs are subtracted in a waterfall until you reach net income, the 'bottom line.'",
          "Big revenue does not guarantee profit; costs below it can wipe the profit out.",
          "Comparing periods reveals trends - whether profit is rising, flat, or falling."
        ],
        realWorldExample: "A coffee shop brings in $200,000 of revenue in a year. It spends $80,000 on coffee beans, milk, and cups, $70,000 on rent and wages, and $10,000 on taxes. After the waterfall of costs, $40,000 of net income is left - the true profit, only a fifth of the top-line revenue."
      },
      {
        type: "concept",
        title: "From Revenue Down to the Bottom Line",
        paragraphs: [
          "Follow the waterfall step by step. First, subtract cost of goods sold (COGS) from revenue to get gross profit - the money left after covering the direct cost of what you sold. Next, subtract operating expenses like salaries, rent, and marketing to get operating income, sometimes called operating profit. This number shows how well the core business runs before the effects of debt and taxes. It's a favorite of analysts because it strips out one-time noise and reveals the everyday earning power of the company.",
          "Continue down and subtract interest (the cost of any borrowed money) and then taxes owed to the government. What remains at the very bottom is net income - the real, final profit that belongs to the owners. A company might show strong operating income but weak net income if it carries heavy debt with big interest payments. That's why savvy readers don't stop at one line; they trace the whole waterfall to see exactly where the money goes and which costs are eating into profit.",
          "Two extra numbers matter for stock investors. Earnings per share (EPS) takes net income and divides it by the number of shares, showing profit for each slice of ownership. And because some expenses like depreciation aren't cash leaving the door, analysts often look at EBITDA - earnings before interest, taxes, depreciation, and amortization - to compare the raw operating performance of different companies. Each of these is just a different vantage point on the same waterfall, chosen to answer a specific question about the business."
        ],
        bullets: [
          "Revenue minus COGS equals gross profit - what's left after direct product costs.",
          "Subtract operating expenses to reach operating income, the core business's earning power.",
          "Subtract interest and taxes to reach net income, the final profit for owners.",
          "EPS = net income divided by shares, showing profit per slice of ownership.",
          "EBITDA strips out interest, taxes, and non-cash items to compare raw operations."
        ],
        realWorldExample: "A software firm reports $1,000,000 revenue, $200,000 COGS (so $800,000 gross profit), $500,000 operating costs (leaving $300,000 operating income), then $50,000 interest and $60,000 taxes - ending at $190,000 net income. With 100,000 shares, EPS is $1.90."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "finstmt1-mc1",
            question: "What does the 'top line' of an income statement refer to?",
            options: [
              "The final net income after taxes",
              "Total revenue before any costs",
              "The cash left in the bank",
              "The total debt the company owes"
            ],
            correctAnswer: 1,
            explanation: "The top line is revenue - total sales before any costs are subtracted. It sits at the very top of the statement, which is why it earns that nickname."
          },
          {
            id: "finstmt1-mc2",
            question: "Why can a company have high revenue but still lose money?",
            options: [
              "Revenue is always paid in cash slowly",
              "Costs below revenue can exceed it",
              "Taxes are added on top of revenue",
              "Revenue must be split with shareholders"
            ],
            correctAnswer: 1,
            explanation: "The income statement subtracts costs in a waterfall. If those costs add up to more than the revenue, the company posts a loss despite big sales."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jordan Reads Two Companies' Statements",
        narrative: "Jordan is comparing two toy companies for a school investing project. Both reported $5 million in revenue last year. But their income statements look very different once Jordan traces the waterfall down to net income, and the difference changes which one seems like the stronger business.",
        details: [
          "Company A: $5M revenue, $2M COGS, $1.5M operating costs, $0 interest, $0.4M taxes - net income $1.1M.",
          "Company B: $5M revenue, $3M COGS, $1.4M operating costs, $0.5M interest on debt, $0.1M taxes - net income $0M.",
          "Same top line, but Company A keeps far more profit because its costs are lower and it carries no debt.",
          "Company B breaks even; its high COGS and interest payments eat up everything the revenue brought in."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "finstmt1-aq1",
          question: "Based on the two companies, why is revenue alone a poor way to judge them?",
          options: [
            "Revenue is often reported incorrectly on every quarterly filing",
            "Equal revenue can hide very different profits",
            "Higher revenue always means higher debt on the balance sheet",
            "Revenue does not appear anywhere on the income statement at all"
          ],
          correctAnswer: 1,
          explanation: "Both firms had $5M revenue, yet one earned $1.1M profit and the other earned nothing. Only tracing costs down to net income reveals the real difference."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The income statement covers a period and flows from revenue down to net income.",
          "Revenue is the top line; net income is the bottom line - the true profit.",
          "Costs are subtracted in stages: COGS, operating expenses, interest, then taxes.",
          "Operating income shows core performance before debt and taxes distort it.",
          "Compare periods and companies to see the real story revenue alone can't tell."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "finstmt1-mastery1",
            question: "An income statement primarily measures performance over what?",
            options: [
              "A single day's closing cash balance in the bank",
              "A period such as a quarter or year",
              "The company's total lifetime since it was founded",
              "One individual product sale processed at a time"
            ],
            correctAnswer: 1,
            explanation: "Unlike the balance sheet's snapshot, the income statement covers a stretch of time - usually a quarter or a full year - showing performance across that period."
          },
          {
            id: "finstmt1-mastery2",
            question: "What do you get when you subtract COGS from revenue?",
            options: [
              "Net income for the owners after every cost",
              "Gross profit before other costs",
              "Operating income measured after all salaries",
              "The total income taxes owed that whole year"
            ],
            correctAnswer: 1,
            explanation: "Revenue minus COGS gives gross profit - what's left after the direct cost of the goods sold, but before operating expenses, interest, and taxes."
          },
          {
            id: "finstmt1-mastery3",
            question: "Which item is subtracted just before reaching net income?",
            options: [
              "Cost of goods sold way up top",
              "Interest and taxes near the bottom",
              "Revenue carried over from the prior year",
              "The company's total assets and equipment"
            ],
            correctAnswer: 1,
            explanation: "Interest and taxes are the last subtractions in the waterfall. After removing them from operating income, you arrive at the bottom line: net income."
          },
          {
            id: "finstmt1-mastery4",
            question: "Why do analysts like looking at operating income?",
            options: [
              "It conveniently ignores every single cost the firm has",
              "It shows core performance before debt and taxes",
              "It always equals total revenue in most reported cases",
              "It counts only rare one-time gains and windfalls"
            ],
            correctAnswer: 1,
            explanation: "Operating income captures how the everyday business performs, before interest and taxes muddy the picture. It reveals the core earning power of the company."
          },
          {
            id: "finstmt1-mastery5",
            question: "Earnings per share (EPS) is calculated by…",
            options: [
              "Dividing total revenue by all total costs",
              "Dividing net income by shares outstanding",
              "Adding loan interest back onto net income",
              "Multiplying reported profit by the yearly tax rate"
            ],
            correctAnswer: 1,
            explanation: "EPS divides net income by the number of shares, showing how much profit belongs to each slice of ownership. It's a key figure for stock investors."
          },
          {
            id: "finstmt1-mastery6",
            question: "A firm has strong operating income but weak net income. The likely cause is…",
            options: [
              "It somehow sold no products at all this whole year",
              "Heavy interest and tax costs below it",
              "Its total revenue was exactly zero this reporting period",
              "It has no operating expenses at all"
            ],
            correctAnswer: 1,
            explanation: "If operating income is strong but net income is weak, the gap usually comes from large interest payments on debt and taxes, which are subtracted after operating income."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // fin-stmt-2: Revenue vs Profit
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "fin-stmt-2",
    sections: [
      {
        type: "concept",
        title: "Two Numbers People Constantly Confuse",
        paragraphs: [
          "Revenue and profit sound similar but mean completely different things, and mixing them up leads to bad decisions. Revenue is all the money coming in from sales - the gross total before any costs. Profit is what's left after you pay for everything it took to earn that revenue. Imagine a food truck that sells $1,000 of tacos on a busy Saturday. The $1,000 is revenue. But if the ingredients, propane, permit, and worker's pay cost $850, the profit is only $150. The big flashy number and the number that actually matters are far apart.",
          "This gap trips up new investors all the time. A company can double its revenue and still earn less profit, or even lose money, if its costs grow even faster. Fast revenue growth is exciting, but it's meaningless if the company spends $1.20 to earn every $1.00. Some businesses chase revenue on purpose - selling cheaply to grab market share - and accept thin or negative profit for years. Others quietly earn small revenue but keep most of it as profit. Neither is automatically 'better'; you have to know which game the company is playing.",
          "Think of revenue as the size of the pie and profit as the slice you actually keep. A giant pie you give almost entirely away can leave you with less than a small pie you mostly keep. That's why investors look at both together, and especially at profit margin - profit as a percentage of revenue. A 5% margin means the company keeps a nickel of every dollar; a 30% margin means it keeps thirty cents. The margin tells you how efficiently a company turns sales into real money."
        ],
        bullets: [
          "Revenue is all money from sales; profit is what remains after every cost.",
          "A company can grow revenue fast while profit stays flat or turns negative.",
          "Some firms sacrifice profit to chase revenue and market share on purpose.",
          "Profit is the slice you keep; revenue is the size of the whole pie.",
          "Profit margin (profit ÷ revenue) shows how efficiently sales become profit."
        ],
        realWorldExample: "A retailer boasts $10 million in revenue, up 25% from last year. Impressive - until you learn its costs also jumped, leaving just $200,000 in profit, a 2% margin. A smaller rival with $4 million revenue but a 15% margin actually keeps $600,000 - three times more real money."
      },
      {
        type: "concept",
        title: "Why Margins Matter More Than Size",
        paragraphs: [
          "Because profit depends on both sales and costs, the same revenue can produce wildly different profit. This is why margin is such a powerful lens. Gross margin shows profit after direct product costs; operating margin shows it after running costs; net margin shows the final profit after everything, including interest and taxes. A grocery store famously runs on razor-thin net margins around 1-3%, surviving on huge volume. A luxury software company might keep 25-30% of every dollar, because its 'product' costs almost nothing to copy once built.",
          "Understanding margins protects you from being fooled by big headline numbers. When a company reports 'record revenue,' the smart follow-up question is: what happened to profit and margin? If revenue rose 20% but net income fell, something is wrong - maybe costs surged, discounts got deeper, or the company is buying growth it can't sustain. On the flip side, a company holding steady revenue while expanding margins is quietly getting more efficient, which is often a very healthy sign for long-term investors.",
          "Profit is also what funds a company's future. Real profit can be reinvested to build new products, paid out to shareholders as dividends, or saved as a cushion for hard times. Revenue that never becomes profit does none of that - it just cycles in and back out as costs. That's the deepest reason profit, not revenue, is the number that ultimately builds wealth for owners. Revenue proves customers want the product; profit proves the business can actually pay for itself and grow."
        ],
        bullets: [
          "Gross, operating, and net margins each measure profit at a different stage.",
          "Grocery stores survive on ~1-3% net margins; software can keep 25-30%.",
          "Rising revenue with falling profit is a warning sign worth investigating.",
          "Steady revenue plus expanding margins signals growing efficiency.",
          "Only profit can be reinvested, paid as dividends, or saved for a rainy day."
        ],
        realWorldExample: "Two companies each report $50 million in revenue. The first, a supermarket, keeps a 2% net margin - $1 million profit. The second, a software firm, keeps a 28% margin - $14 million profit. Same revenue, but the software company earns fourteen times more real money to reinvest or pay out."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "finstmt2-mc1",
            question: "A food truck takes in $1,000 and spends $850 to earn it. What is its profit?",
            options: [
              "$1,000, matching the full revenue amount",
              "$150, what's left after costs",
              "$850, the sum of the total costs",
              "$1,850, revenue and costs added together"
            ],
            correctAnswer: 1,
            explanation: "Profit is revenue minus costs: $1,000 minus $850 leaves $150. The $1,000 is revenue, not profit - the difference is exactly the point."
          },
          {
            id: "finstmt2-mc2",
            question: "What does profit margin measure?",
            options: [
              "Total sales added up for the whole year",
              "Profit as a percentage of revenue",
              "The company's total outstanding debt load owed",
              "How many total shares are currently outstanding"
            ],
            correctAnswer: 1,
            explanation: "Profit margin is profit divided by revenue, shown as a percentage. It reveals how efficiently a company turns each dollar of sales into real profit."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Picks Between Two Startups",
        narrative: "Priya is deciding which of two startups looks stronger for a mock investment. Both pitch impressive-sounding numbers, but she knows to look past the headline revenue and dig into what each business actually keeps as profit before she decides.",
        details: [
          "GadgetCo: $8M revenue, but $7.8M in costs - only $200,000 profit, a 2.5% margin.",
          "AppCo: $3M revenue, with $2.1M in costs - $900,000 profit, a 30% margin.",
          "GadgetCo's revenue is nearly triple AppCo's, yet AppCo keeps far more real money.",
          "Priya notes AppCo's high margin gives it more cash to reinvest and survive tough times."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "finstmt2-aq1",
          question: "Why might Priya prefer AppCo despite its smaller revenue?",
          options: [
            "Bigger revenue always means bigger debt and interest",
            "Its higher margin keeps far more profit",
            "Revenue is completely unimportant to any serious investor",
            "AppCo simply has more total shares outstanding today"
          ],
          correctAnswer: 1,
          explanation: "AppCo's 30% margin turns $3M of revenue into $900,000 profit, while GadgetCo keeps just $200,000 from $8M. The margin, not the revenue size, drives real earnings."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Revenue is total sales; profit is what's left after all costs are paid.",
          "A company can grow revenue while profit stays flat or falls.",
          "Profit margin shows how efficiently revenue becomes profit.",
          "Rising revenue with shrinking profit is a red flag to investigate.",
          "Only profit can be reinvested, paid out, or saved - so it builds wealth."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "finstmt2-mastery1",
            question: "The core difference between revenue and profit is that profit…",
            options: [
              "Is always larger than revenue",
              "Is what remains after costs",
              "Ignores the cost of goods sold",
              "Counts only cash in the bank"
            ],
            correctAnswer: 1,
            explanation: "Profit is revenue minus every cost. Revenue is the gross money coming in; profit is the portion the company actually keeps."
          },
          {
            id: "finstmt2-mastery2",
            question: "A company's revenue rises 20% but its net income falls. This most likely means…",
            options: [
              "It abruptly stopped selling any products",
              "Its costs grew faster than sales",
              "It paid off all of its debt",
              "It issued a batch of brand-new shares"
            ],
            correctAnswer: 1,
            explanation: "If revenue climbs but profit drops, costs must have grown even faster - through deeper discounts, rising expenses, or spending to buy growth."
          },
          {
            id: "finstmt2-mastery3",
            question: "Which business model typically has the thinnest net margins?",
            options: [
              "A luxury software company",
              "A high-volume grocery store",
              "A patented drug maker",
              "A premium consulting firm"
            ],
            correctAnswer: 1,
            explanation: "Grocery stores run on very thin net margins, often just 1-3%, and survive on huge sales volume. Software and patents tend to keep far more of each dollar."
          },
          {
            id: "finstmt2-mastery4",
            question: "Company A has $50M revenue at a 2% margin; Company B has $20M at a 20% margin. Who earns more profit?",
            options: [
              "Company A, because revenue is larger",
              "Company B, earning $4M versus $1M",
              "They earn the exact same profit",
              "Neither earns any profit at all"
            ],
            correctAnswer: 1,
            explanation: "A earns 2% of $50M = $1M. B earns 20% of $20M = $4M. Despite smaller revenue, B's higher margin produces four times the profit."
          },
          {
            id: "finstmt2-mastery5",
            question: "Why is profit, not revenue, the number that builds wealth for owners?",
            options: [
              "Revenue is never reported publicly on any official filing anywhere",
              "Only profit can be reinvested or paid out",
              "Revenue is always taxed at a flat one hundred percent",
              "Profit is exactly the same figure as total gross sales"
            ],
            correctAnswer: 1,
            explanation: "Profit is what a company can reinvest, pay as dividends, or save. Revenue that all goes back out as costs never creates lasting value for owners."
          },
          {
            id: "finstmt2-mastery6",
            question: "A firm keeps steady revenue while its margins expand each year. This suggests…",
            options: [
              "The business is losing customers fast",
              "The business is getting more efficient",
              "Revenue must be falling very sharply now",
              "The firm has stopped all operations"
            ],
            correctAnswer: 1,
            explanation: "Holding revenue steady while margins widen means the company keeps more of each sales dollar - a sign of improving efficiency and a healthy trend."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // fin-stmt-3: COGS
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "fin-stmt-3",
    sections: [
      {
        type: "concept",
        title: "The Direct Cost of What You Sell",
        paragraphs: [
          "Cost of goods sold, or COGS, is the direct cost of producing the exact things a company sold during a period. It's the first big cost subtracted from revenue on the income statement. For a pizza shop, COGS is the flour, cheese, sauce, and boxes that went into the pizzas customers actually bought. It does NOT include the rent, the manager's salary, or the online ads - those are running costs that happen whether or not a single pizza sells. COGS scales with production: sell more pizzas, and COGS rises right along with it.",
          "The test for whether a cost belongs in COGS is simple: is it a direct part of making the product? Raw materials, the wages of workers who assemble the goods, and the factory power to run the machines all count. Costs that keep the business alive but aren't tied to a specific unit - office rent, accounting, marketing - do not. Getting this boundary right matters because COGS is what stands between revenue and gross profit, and mislabeling costs would distort how profitable the core product looks.",
          "COGS is powerful because it reveals how much it truly costs to deliver a product. A company selling a $50 sweater that costs $20 in materials and labor has $20 of COGS per sweater and $30 of gross profit. If a cheaper supplier drops the material cost to $15, COGS falls and gross profit jumps to $35 with no change in price. This is why businesses obsess over their supply chain: shaving even a dollar off COGS, multiplied across millions of units, can transform profitability without ever raising the price customers pay."
        ],
        bullets: [
          "COGS is the direct cost of producing the goods actually sold in a period.",
          "It includes raw materials, production labor, and factory power for the product.",
          "It excludes rent, marketing, and office salaries - those are running costs.",
          "COGS scales with production: more units sold means higher COGS.",
          "Revenue minus COGS equals gross profit, the first profit layer."
        ],
        realWorldExample: "A sneaker brand sells shoes for $100 a pair. The rubber, fabric, and factory labor to make each pair cost $40 - that's COGS. Gross profit is $60 per pair. If a new factory cuts production cost to $35, COGS drops and gross profit rises to $65, all without changing the $100 price."
      },
      {
        type: "concept",
        title: "COGS, Gross Margin, and Business Type",
        paragraphs: [
          "Once you have COGS, you can calculate gross margin: gross profit divided by revenue. It answers 'of every sales dollar, how much is left after paying to make the product?' A company with a $40 COGS on a $100 product has a 60% gross margin. High gross margins give a company breathing room to cover all its other expenses and still profit. Low gross margins mean almost every remaining dollar is spoken for, leaving little cushion if anything goes wrong.",
          "Different industries have wildly different COGS by nature. A software company has tiny COGS - once the code is written, sending another copy costs almost nothing, so gross margins can top 80%. A car manufacturer has enormous COGS - steel, glass, engines, and assembly labor for every vehicle - so gross margins might sit near 15-20%. Neither is bad; they're just different business shapes. Comparing gross margins is only fair between companies in the same industry, where the cost structures actually resemble each other.",
          "COGS also connects to inventory, which trips people up. A company only records COGS when a product is sold, not when it's made. If a factory builds 1,000 toys but sells 600, only the cost of those 600 becomes COGS this period; the other 400 sit as inventory on the balance sheet until they sell. This 'matching' keeps costs lined up with the sales they helped create. It's why a company can spend heavily on production one quarter yet show that cost as COGS only in later quarters when the goods finally sell."
        ],
        bullets: [
          "Gross margin = gross profit ÷ revenue, showing what's left after making the product.",
          "High gross margins give room to cover other costs and still profit.",
          "Software can have 80%+ gross margins; carmakers may sit near 15-20%.",
          "Compare gross margins only within the same industry to be fair.",
          "COGS is recorded when goods sell, not when they're made - unsold units are inventory."
        ],
        realWorldExample: "A software firm sells a $200 app subscription with almost no per-copy cost, so COGS is $10 and gross margin is 95%. An automaker sells a $30,000 car costing $25,000 to build, giving a 17% gross margin. Both can be healthy - but you'd never compare their margins directly."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "finstmt3-mc1",
            question: "Which cost belongs in COGS for a T-shirt company?",
            options: [
              "The monthly office rent paid to landlords",
              "The fabric used in the shirts",
              "The company's monthly social media ad budget",
              "The CEO's fixed yearly executive salary"
            ],
            correctAnswer: 1,
            explanation: "COGS is the direct cost of making the product - here, the fabric. Rent, ads, and executive salaries are running costs, not part of making each shirt."
          },
          {
            id: "finstmt3-mc2",
            question: "When does a company record COGS for a product?",
            options: [
              "When the product is manufactured",
              "When the product is sold",
              "When materials are ordered",
              "At the end of every year"
            ],
            correctAnswer: 1,
            explanation: "COGS is recorded when the product is sold, matching the cost to the sale it created. Until then, unsold goods sit as inventory on the balance sheet."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Runs the Numbers on His Candle Business",
        narrative: "Leo makes and sells scented candles. He wants to understand his true product costs before deciding whether to raise prices or find a cheaper supplier, so he separates his direct production costs from his general business expenses.",
        details: [
          "Each candle sells for $20; the wax, wick, and jar cost $8 per candle - that's his COGS.",
          "His gross profit is $12 per candle, giving a 60% gross margin.",
          "Rent for his workshop and his website fees are NOT part of COGS - they're operating costs.",
          "A new wax supplier could cut material cost to $6, raising gross profit to $14 per candle."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "finstmt3-aq1",
          question: "If Leo switches to the cheaper supplier, what happens to his gross margin?",
          options: [
            "It falls because costs went down",
            "It rises because COGS dropped",
            "It stays exactly the same",
            "It disappears from the statement"
          ],
          correctAnswer: 1,
          explanation: "Lower COGS ($6 instead of $8) means more gross profit per candle ($14 vs $12), so gross margin rises from 60% to 70% - all without changing the price."
        }
      },
      {
        type: "recap",
        takeaways: [
          "COGS is the direct cost of producing the goods actually sold.",
          "It includes materials and production labor, not rent or marketing.",
          "Revenue minus COGS equals gross profit; that ÷ revenue is gross margin.",
          "Industries differ hugely - software COGS is tiny, carmaker COGS is huge.",
          "COGS is booked when goods sell; unsold units wait as inventory."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "finstmt3-mastery1",
            question: "COGS is best defined as…",
            options: [
              "Every cost the company has all year",
              "The direct cost of goods actually sold",
              "The rent and salaries of the office",
              "The interest paid regularly on company debt"
            ],
            correctAnswer: 1,
            explanation: "COGS captures only the direct cost of producing the goods sold in a period - materials and production labor - not overhead, interest, or marketing."
          },
          {
            id: "finstmt3-mastery2",
            question: "Which cost is NOT part of COGS for a bakery?",
            options: [
              "The flour used in the bread",
              "The building's monthly rent",
              "The baker's wages at the oven",
              "The eggs baked into the cakes"
            ],
            correctAnswer: 1,
            explanation: "Rent is a running cost the bakery pays whether or not it sells bread. Flour, eggs, and the baker's wages are direct production costs and belong in COGS."
          },
          {
            id: "finstmt3-mastery3",
            question: "A product sells for $50 with $20 of COGS. Its gross margin is…",
            options: [
              "20%, the cost portion",
              "60%, the profit portion",
              "40%, half the price",
              "80%, the total revenue"
            ],
            correctAnswer: 1,
            explanation: "Gross profit is $50 minus $20 = $30. Divided by the $50 price, that's a 60% gross margin - the share of each dollar left after making the product."
          },
          {
            id: "finstmt3-mastery4",
            question: "Why does software typically have a much higher gross margin than car making?",
            options: [
              "Software companies never pay taxes",
              "Copying software costs almost nothing",
              "Cars are always sold at a loss",
              "Software has no revenue at all"
            ],
            correctAnswer: 1,
            explanation: "Once software is built, each extra copy costs nearly nothing, so COGS is tiny and gross margin is huge. Cars need costly materials and labor per unit."
          },
          {
            id: "finstmt3-mastery5",
            question: "A factory makes 1,000 items but sells only 700. How much of the production cost becomes COGS this period?",
            options: [
              "The cost of all 1,000 items produced",
              "The cost of the 700 items sold",
              "The cost of the 300 unsold items",
              "None of the total production cost recorded yet"
            ],
            correctAnswer: 1,
            explanation: "COGS is recorded only for goods sold - here, the 700 sold. The 300 unsold items remain as inventory until they're sold in a future period."
          },
          {
            id: "finstmt3-mastery6",
            question: "Cutting COGS while keeping the price the same will…",
            options: [
              "Lower gross profit per unit",
              "Raise gross profit per unit",
              "Have no effect on profit",
              "Reduce the total revenue earned yearly"
            ],
            correctAnswer: 1,
            explanation: "If the price stays put but COGS falls, more of each dollar is kept as gross profit. That's why companies work hard to shave costs from their supply chain."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // fin-stmt-4: Gross Margin
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "fin-stmt-4",
    sections: [
      {
        type: "concept",
        title: "How Much a Company Keeps After Making Its Product",
        paragraphs: [
          "Gross margin is one of the most revealing numbers on any income statement. It's gross profit - revenue minus cost of goods sold - expressed as a percentage of revenue. In plain terms, it answers: for every dollar of sales, how many cents are left after paying to make the product? A company selling a $100 item that costs $30 to produce has $70 of gross profit and a 70% gross margin. That leftover is the fuel the company uses to cover everything else: salaries, marketing, rent, research, and finally profit for the owners.",
          "The magic of gross margin is that it strips away company size. Two businesses can look totally different in dollars yet have identical gross margins, telling you their core products are equally efficient to produce. A tiny shop and a giant chain both selling coffee might each keep 65 cents of every dollar after ingredient costs. Because it's a percentage, gross margin lets you compare a $1 million startup to a $1 billion giant fairly, as long as they're in the same industry. It normalizes the playing field.",
          "A high gross margin is a sign of pricing power or cheap production, and it gives a company room to breathe. If you keep 70 cents of every dollar, you have plenty to spend on growth and still profit. If you keep only 15 cents, nearly all of it is claimed by other costs before any profit appears, and one bad quarter can push you into a loss. That's why investors treat gross margin as an early health check - it shows whether the fundamental product economics work before any other expense enters the picture."
        ],
        bullets: [
          "Gross margin = gross profit ÷ revenue, shown as a percentage.",
          "It reveals how many cents of each sales dollar survive making the product.",
          "As a percentage, it compares companies of very different sizes fairly.",
          "High gross margin signals pricing power or low production costs.",
          "It's the fuel that must cover all other costs before profit appears."
        ],
        realWorldExample: "A jewelry store sells a necklace for $500 that costs $150 in gold and labor. Gross profit is $350, a 70% gross margin. A furniture store sells a $500 table costing $400 to build - just $100 gross profit, a 20% margin. Same price, but the jeweler keeps far more per sale."
      },
      {
        type: "concept",
        title: "Reading Trends and Comparing Fairly",
        paragraphs: [
          "A single gross margin number is useful, but the trend over time is where the real insight lives. If a company's gross margin climbs from 40% to 46% over two years, its product is becoming more profitable to sell - maybe through cheaper materials, higher prices, or better efficiency. If it slides from 40% to 34%, something is squeezing it: rising input costs, heavier discounting, or tougher competition forcing lower prices. Investors watch the direction closely, because a shrinking margin can quietly erode profits long before it shows up in the bottom line.",
          "Fair comparison means matching apples to apples. Gross margins vary enormously by industry, so a 25% margin might be excellent for a grocery chain but alarming for a software firm. Comparing a supermarket's margin to a luxury brand's tells you almost nothing useful. The right move is to compare a company against its direct competitors and against its own history. A retailer with a 32% gross margin looks great next to rivals stuck at 25%, and that gap often reflects a real advantage like a stronger brand or smarter sourcing.",
          "Gross margin also explains why some companies can survive price wars while others can't. A firm with a 60% margin can slash prices 10% and still keep a healthy cushion; a firm with a 15% margin has almost no room to cut before selling at a loss. This is why high-margin businesses are often more resilient - they have a buffer to absorb shocks, invest aggressively, or undercut competitors. When you see a company consistently defending a high gross margin year after year, it usually points to a durable competitive advantage worth understanding."
        ],
        bullets: [
          "Rising gross margin means the product is getting more profitable to sell.",
          "Falling gross margin signals rising costs, discounting, or price pressure.",
          "Compare margins to direct competitors and to the company's own history.",
          "A 25% margin can be great for a grocer but weak for software.",
          "High-margin firms have a buffer to survive price wars and shocks."
        ],
        realWorldExample: "A clothing brand's gross margin slips from 52% to 44% over two years because cotton prices rose and it discounted heavily to move stock. Even with flat revenue, that 8-point drop means millions less to cover salaries and marketing - a warning sign long before net income falls."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "finstmt4-mc1",
            question: "A product sells for $200 and costs $60 to make. What is its gross margin?",
            options: [
              "30%, the cost share",
              "70%, the profit share",
              "40%, half the total",
              "60%, the cost dollars"
            ],
            correctAnswer: 1,
            explanation: "Gross profit is $200 minus $60 = $140. Divided by $200, that's a 70% gross margin - the share of each dollar kept after making the product."
          },
          {
            id: "finstmt4-mc2",
            question: "Why is gross margin useful for comparing companies of different sizes?",
            options: [
              "It completely ignores the direct cost of goods",
              "It's a percentage, not a dollar amount",
              "It always equals net income exactly",
              "It only applies to very large firms"
            ],
            correctAnswer: 1,
            explanation: "Because gross margin is a percentage of revenue, it removes the effect of company size, letting you fairly compare a small firm to a giant in the same industry."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ava Compares Two Coffee Brands",
        narrative: "Ava is researching two coffee companies for a class portfolio. Both sell bags of coffee at similar prices, but their gross margins differ, and she wants to understand what that gap says about each business before choosing.",
        details: [
          "BrandX sells a $15 bag costing $6 to source and roast - a 60% gross margin.",
          "BrandY sells a $15 bag costing $10 to source and roast - a 33% gross margin.",
          "BrandX keeps far more of each sale to spend on marketing, stores, and profit.",
          "If a price war breaks out, BrandX can cut prices much further before selling at a loss."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "finstmt4-aq1",
          question: "Why might BrandX be better positioned than BrandY in a price war?",
          options: [
            "It has lower total revenue overall across the year",
            "Its higher margin gives more room to cut",
            "It pays absolutely no taxes on any coffee sales",
            "It simply sells far fewer bags of beans each year"
          ],
          correctAnswer: 1,
          explanation: "BrandX keeps 60 cents of every dollar versus BrandY's 33. That cushion lets BrandX lower prices much further before hitting a loss, giving it staying power."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Gross margin is gross profit as a percentage of revenue.",
          "It shows how many cents of each dollar survive making the product.",
          "As a percentage, it compares different-sized companies fairly.",
          "Compare margins to competitors and to the firm's own past trend.",
          "High gross margins provide resilience and fuel for growth."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "finstmt4-mastery1",
            question: "Gross margin is calculated as…",
            options: [
              "Net income divided by shares",
              "Gross profit divided by revenue",
              "Revenue divided by total costs",
              "COGS divided by net income"
            ],
            correctAnswer: 1,
            explanation: "Gross margin is gross profit (revenue minus COGS) divided by revenue, expressed as a percentage. It shows the share of sales left after making the product."
          },
          {
            id: "finstmt4-mastery2",
            question: "A company's gross margin rises from 38% to 45% over two years. This suggests…",
            options: [
              "Its product is now cheaper to sell",
              "It stopped selling any products",
              "Its revenue fell to zero",
              "It took on much more debt"
            ],
            correctAnswer: 1,
            explanation: "A rising gross margin means more of each sales dollar survives after production costs - the product got more profitable through lower costs or higher prices."
          },
          {
            id: "finstmt4-mastery3",
            question: "Comparing a supermarket's gross margin to a software firm's is misleading because…",
            options: [
              "Both have identical cost structures",
              "Their industries differ enormously",
              "Software firms never earn revenue",
              "Supermarkets have no COGS at all"
            ],
            correctAnswer: 1,
            explanation: "Gross margins vary hugely across industries. A margin that's great for a grocer could be terrible for software, so fair comparison stays within an industry."
          },
          {
            id: "finstmt4-mastery4",
            question: "Which firm can better withstand a 10% price cut?",
            options: [
              "One with a thin 15% gross margin",
              "One with a 60% gross margin",
              "Neither company can survive a price cut",
              "Both firms are exactly equally protected today"
            ],
            correctAnswer: 1,
            explanation: "A 60% margin leaves a large cushion after a price cut, while a 15% margin nearly vanishes. High-margin firms have far more room to absorb price wars."
          },
          {
            id: "finstmt4-mastery5",
            question: "A falling gross margin most often points to…",
            options: [
              "Rising costs or heavier discounting",
              "A one-time boost in net income",
              "A rise in the number of shares",
              "Lower interest payments on debt"
            ],
            correctAnswer: 0,
            explanation: "When gross margin drops, it usually means input costs rose or the company discounted more to sell - both squeeze the profit kept from each sale."
          },
          {
            id: "finstmt4-mastery6",
            question: "Two firms have very different revenue but the same 55% gross margin. This tells you…",
            options: [
              "The larger firm must be quietly failing",
              "Their products are equally efficient to make",
              "One firm has no costs at all",
              "Their reported net incomes must be identical"
            ],
            correctAnswer: 1,
            explanation: "An identical gross margin means each keeps the same share of every sales dollar after production - their core product economics are equally efficient, regardless of size."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // fin-stmt-5: Operating Expenses
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "fin-stmt-5",
    sections: [
      {
        type: "concept",
        title: "The Cost of Running the Business",
        paragraphs: [
          "Operating expenses are the costs of running a business day to day, separate from the direct cost of making the product. If COGS is what it costs to build the widget, operating expenses are everything else it takes to sell it and keep the lights on: salaries for office staff, rent, marketing, research and development, insurance, and software. On the income statement, these are subtracted from gross profit to arrive at operating income. They're often grouped under the label SG&A - selling, general, and administrative expenses.",
          "The key feature of operating expenses is that many of them are 'fixed' - they don't rise and fall neatly with each sale the way COGS does. A company pays office rent whether it sells 100 units or 10,000 that month. This has a big consequence: when sales grow, fixed operating costs get spread over more units, so profit can jump faster than revenue. This effect is called operating leverage. It's why a growing company can suddenly become very profitable once revenue passes the point where it covers its fixed costs.",
          "Not all operating expenses are equal, and reading them tells a story about strategy. Heavy spending on research and development suggests a company betting on future products. Big marketing budgets signal a push to grab customers and market share. High administrative costs relative to peers might hint at bloat or inefficiency. Because these expenses are somewhat within management's control, watching how they change reveals what leadership prioritizes - and whether that spending is actually producing more revenue in return."
        ],
        bullets: [
          "Operating expenses are the costs of running the business, not making the product.",
          "They include salaries, rent, marketing, R&D, and admin - often labeled SG&A.",
          "Gross profit minus operating expenses equals operating income.",
          "Many are fixed, creating operating leverage as sales grow.",
          "Their mix reveals strategy: R&D bets on the future, marketing chases growth."
        ],
        realWorldExample: "A streaming startup spends $30M on content and staff (operating expenses) while earning $50M in gross profit, leaving $20M operating income. As subscribers double to bring in $100M gross profit, those same fixed costs stay near $35M - operating income leaps to $65M. That's operating leverage at work."
      },
      {
        type: "concept",
        title: "Operating Income and Efficiency",
        paragraphs: [
          "Once operating expenses are subtracted from gross profit, you get operating income, one of the most important lines for judging a business. It shows how much profit the core operations generate before the effects of debt (interest) and taxes. Analysts love it because it isolates the actual business performance - a company can't hide weak operations behind clever financing when you look at operating income. Dividing it by revenue gives operating margin, a percentage that shows how efficiently the whole operation turns sales into profit.",
          "Watching the relationship between revenue growth and operating expense growth is a powerful skill. If revenue grows 20% while operating expenses grow only 10%, the company is scaling efficiently and its operating margin expands. But if operating expenses grow 30% while revenue grows 20%, the company is spending faster than it's selling, and margins shrink. This is the classic tension in growing companies: spending to grow is fine, but only if the spending actually produces enough new revenue to justify it over time.",
          "Some operating expenses are 'discretionary,' meaning management can dial them up or down. In a tough year, a company might cut marketing or delay R&D to protect operating income - which helps short-term profit but can hurt long-term growth. This is why smart investors look beyond a single quarter's operating income to ask what was sacrificed to produce it. A company that boosts operating income by gutting R&D might look healthier today while quietly mortgaging its future. Context, not just the number, is what separates a genuinely efficient business from one cutting corners."
        ],
        bullets: [
          "Operating income = gross profit minus operating expenses, before interest and taxes.",
          "It isolates core business performance, hard to disguise with financing tricks.",
          "Operating margin (operating income ÷ revenue) shows operating efficiency.",
          "Revenue growing faster than expenses expands margins; the reverse shrinks them.",
          "Cutting discretionary costs like R&D can boost profit now but hurt the future."
        ],
        realWorldExample: "A retailer earns $200M gross profit and spends $150M on operating expenses, giving $50M operating income and a 10% operating margin on $500M revenue. A rival with the same revenue but $120M in operating costs earns $80M operating income - a 16% margin, showing it runs leaner and more efficiently."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "finstmt5-mc1",
            question: "Which is an operating expense rather than COGS?",
            options: [
              "The steel used in a car",
              "The marketing budget for ads",
              "The factory labor building products",
              "The raw materials for a shirt"
            ],
            correctAnswer: 1,
            explanation: "Marketing is a cost of running and selling the business, so it's an operating expense. Steel, factory labor, and materials are direct production costs (COGS)."
          },
          {
            id: "finstmt5-mc2",
            question: "What is operating leverage?",
            options: [
              "Borrowing extra money from a bank to buy new fixed assets",
              "Fixed costs spread over more sales as revenue grows",
              "Selling every product below its true production cost on purpose",
              "Paying a large amount of interest on the company's outstanding debt"
            ],
            correctAnswer: 1,
            explanation: "Operating leverage means fixed operating costs stay flat as sales rise, so profit grows faster than revenue once those fixed costs are covered."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sam Studies a Growing Delivery App",
        narrative: "Sam is analyzing a food-delivery app that just doubled its revenue. He wants to see whether the business is becoming more efficient as it grows, so he compares how revenue and operating expenses changed year over year.",
        details: [
          "Last year: $40M revenue, $30M operating expenses, $10M operating income - a 25% operating margin.",
          "This year: $80M revenue, but operating expenses rose only to $45M thanks to mostly fixed costs.",
          "Operating income jumped to $35M this year, and the operating margin expanded to about 44%.",
          "Revenue doubled while expenses rose far less, so profit grew faster than sales."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "finstmt5-aq1",
          question: "Why did the app's operating income more than triple when revenue only doubled?",
          options: [
            "It abruptly stopped paying any income taxes",
            "Fixed costs were spread over more sales",
            "It issued many new shares to investors",
            "Its COGS fell to zero this year"
          ],
          correctAnswer: 1,
          explanation: "Because most operating expenses were fixed, doubling revenue didn't double costs. Spreading those fixed costs over far more sales - operating leverage - made profit grow much faster than revenue."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Operating expenses run the business - salaries, rent, marketing, R&D - not making the product.",
          "Gross profit minus operating expenses equals operating income.",
          "Many operating costs are fixed, creating operating leverage as sales grow.",
          "Operating margin shows how efficiently a company turns sales into profit.",
          "Cutting discretionary costs can lift profit now but hurt long-term growth."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "finstmt5-mastery1",
            question: "Operating expenses are best described as…",
            options: [
              "The direct cost of physically making the products",
              "The costs of running the business daily",
              "The interest paid on the company's loans",
              "The income taxes owed to the federal government"
            ],
            correctAnswer: 1,
            explanation: "Operating expenses cover the day-to-day costs of running the business - salaries, rent, marketing, R&D - separate from COGS, interest, and taxes."
          },
          {
            id: "finstmt5-mastery2",
            question: "Subtracting operating expenses from gross profit gives you…",
            options: [
              "Net income remaining after all taxes",
              "Operating income before interest and taxes",
              "Total revenue booked for the whole period",
              "Gross margin expressed as a percentage figure"
            ],
            correctAnswer: 1,
            explanation: "Gross profit minus operating expenses equals operating income, which reflects core business performance before interest and taxes are subtracted."
          },
          {
            id: "finstmt5-mastery3",
            question: "Why does operating leverage let profit grow faster than revenue?",
            options: [
              "Fixed costs stay flat as sales rise",
              "COGS magically falls to exactly zero at scale",
              "Income taxes disappear entirely once sales double",
              "Revenue is counted twice over at high volume"
            ],
            correctAnswer: 0,
            explanation: "With fixed operating costs, extra sales add little extra cost. Spreading those fixed costs over more revenue lets operating income rise faster than sales."
          },
          {
            id: "finstmt5-mastery4",
            question: "If revenue grows 20% but operating expenses grow 35%, the operating margin will…",
            options: [
              "Expand nicely because total sales rose",
              "Shrink because costs outpaced sales",
              "Stay precisely exactly the same forever",
              "Become totally impossible to ever measure"
            ],
            correctAnswer: 1,
            explanation: "When expenses grow faster than revenue, more of each sales dollar is consumed by costs, so operating income falls as a share of revenue - the margin shrinks."
          },
          {
            id: "finstmt5-mastery5",
            question: "A company boosts operating income by slashing its R&D budget. The hidden risk is…",
            options: [
              "Its income taxes will instantly double overnight",
              "It may hurt future growth and products",
              "Its total revenue will completely vanish this quarter",
              "It can literally never sell any products again"
            ],
            correctAnswer: 1,
            explanation: "Cutting R&D lifts profit today but starves future products. The short-term gain can quietly mortgage the company's long-term growth, so context matters."
          },
          {
            id: "finstmt5-mastery6",
            question: "Why do analysts value operating income over net income for judging core operations?",
            options: [
              "It includes every one-time gain",
              "It excludes interest and tax effects",
              "It equals the total revenue figure exactly",
              "It counts only cash in the bank"
            ],
            correctAnswer: 1,
            explanation: "Operating income strips out interest and taxes, isolating how the actual business performs. That makes it hard to disguise weak operations behind financing choices."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // fin-stmt-6: Net Income
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "fin-stmt-6",
    sections: [
      {
        type: "concept",
        title: "The Bottom Line After Everything",
        paragraphs: [
          "Net income is the famous 'bottom line' - the final profit left after every single cost has been subtracted from revenue. It sits at the very bottom of the income statement, below COGS, operating expenses, interest, and taxes. If revenue is what came in and all those costs are what went out, net income is what the company genuinely earned and gets to keep. When headlines say a company 'made a profit' or 'lost money,' they're almost always talking about net income. A positive number means the company earned more than it spent; a negative number (a net loss) means the opposite.",
          "The path to net income is a full waterfall. Start with revenue, subtract COGS to get gross profit, subtract operating expenses to get operating income, subtract interest on debt, then subtract taxes - and what survives is net income. Each step can dramatically change the outcome. A company with great operating income can still post a small net income if it carries heavy debt or faces a high tax bill. This is why net income tells the complete story that no earlier line can: it accounts for absolutely everything, including the cost of borrowing and the government's share.",
          "Net income is what ultimately belongs to the shareholders, and the company can do three things with it. It can reinvest the profit to grow, pay it out to owners as dividends, or hold it as retained earnings for future needs. Because it drives so much, net income feeds directly into other key figures: divide it by shares to get earnings per share (EPS), and the stock's price-to-earnings ratio is built on it too. When investors say 'earnings,' net income is usually what they mean, making it perhaps the single most-watched number in all of finance."
        ],
        bullets: [
          "Net income is the final profit after all costs - the 'bottom line.'",
          "The waterfall: revenue, COGS, operating expenses, interest, taxes, then net income.",
          "A negative net income is a net loss; the company spent more than it earned.",
          "Net income belongs to shareholders: reinvest, pay dividends, or retain it.",
          "It drives EPS and the P/E ratio - it's the most-watched 'earnings' figure."
        ],
        realWorldExample: "A company reports $10M revenue, $4M COGS, $3M operating expenses, $1M interest, and $0.5M taxes. After the full waterfall, net income is $1.5M - just 15% of revenue. That final $1.5M is what the company truly earned and can reinvest or pay to shareholders."
      },
      {
        type: "concept",
        title: "Reading Net Income Carefully",
        paragraphs: [
          "Net income is powerful, but it can be misleading if you take it at face value, because it includes one-time events. A company might sell a building and book a huge gain, inflating net income for one quarter even though the core business didn't improve. Or it might take a big one-time charge - like a lawsuit settlement - that crushes net income temporarily. Smart readers separate 'recurring' earnings from these one-offs, asking whether the profit came from actually running the business or from unusual events unlikely to repeat.",
          "Net income also isn't the same as cash. Because of accounting rules, a company can report positive net income while actually running low on cash, or report a loss while its bank account grows. This happens because net income includes non-cash items like depreciation, and it counts sales made on credit before the cash arrives. That's why the cash flow statement exists alongside the income statement - to show the real movement of money. A profitable company on paper can still go bankrupt if it can't collect enough actual cash to pay its bills.",
          "Comparing net income over time and against expectations is what moves stock prices. Every quarter, companies report earnings, and investors compare the actual net income (and EPS) to what analysts predicted. Beating expectations often lifts the stock; missing them can send it tumbling, even if the company still made money. What matters is not just the raw number but the direction and the surprise. A company growing net income steadily, from genuine operations rather than accounting tricks, is exactly the kind of durable profit machine long-term investors hunt for."
        ],
        bullets: [
          "Net income can include one-time gains or charges that distort the picture.",
          "Separate recurring earnings from unusual events that won't repeat.",
          "Net income is not cash - a profitable firm can still run short on money.",
          "The cash flow statement exists to show the real movement of money.",
          "Beating or missing earnings expectations drives big stock-price moves."
        ],
        realWorldExample: "A firm reports a jump in net income from $2M to $9M - impressive, until you read the footnotes and find $6M came from selling a warehouse, a one-time event. Its real operating profit barely grew. A sharp investor treats the $6M as noise and focuses on the recurring $3M."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "finstmt6-mc1",
            question: "Net income is found where on the income statement?",
            options: [
              "At the very top of it, as revenue",
              "At the very bottom, after all costs",
              "Right in the middle, listed as gross profit",
              "It doesn't ever appear on the whole statement"
            ],
            correctAnswer: 1,
            explanation: "Net income is the 'bottom line' - it sits at the bottom of the income statement after every cost, including interest and taxes, has been subtracted."
          },
          {
            id: "finstmt6-mc2",
            question: "Why can a company show positive net income but still run short on cash?",
            options: [
              "Net income is always paid in gold",
              "Net income isn't the same as cash",
              "Cash is never reported anywhere on filings",
              "Net income counts only the cash sales made"
            ],
            correctAnswer: 1,
            explanation: "Net income includes non-cash items and credit sales not yet collected, so it can differ from actual cash. That's why the cash flow statement exists alongside it."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nina Investigates a Surprising Profit Jump",
        narrative: "Nina notices a company's net income tripled from last year and gets excited. Before recommending it, she reads the fine print in the report to understand where the extra profit actually came from and whether it will last.",
        details: [
          "Last year the company earned $3M in net income from its normal operations.",
          "This year net income leaped to $9M, a headline-grabbing increase.",
          "The footnotes reveal $5M of the gain came from a one-time sale of an old factory.",
          "Stripping out that one-off, the recurring net income was about $4M - solid but far less dramatic."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "finstmt6-aq1",
          question: "How should Nina interpret the tripling of net income?",
          options: [
            "The core operating business tripled its underlying profit",
            "Most of the jump was a one-time event",
            "The company must secretly be losing money now",
            "Net income cannot be trusted or used at all"
          ],
          correctAnswer: 1,
          explanation: "Because $5M of the $6M increase came from a one-time factory sale, the core business only grew from $3M to about $4M. Nina should focus on that recurring profit, not the headline."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Net income is the final profit after every cost - the bottom line.",
          "The full waterfall runs from revenue down through interest and taxes.",
          "Net income belongs to shareholders and drives EPS and the P/E ratio.",
          "It can include one-time gains or charges, so separate recurring earnings.",
          "Net income isn't cash - always check the cash flow statement too."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "finstmt6-mastery1",
            question: "Net income represents…",
            options: [
              "Total sales before any costs",
              "Final profit after every cost",
              "Only the cost of goods sold",
              "The company's total assets"
            ],
            correctAnswer: 1,
            explanation: "Net income is the bottom line - the profit that remains after COGS, operating expenses, interest, and taxes are all subtracted from revenue."
          },
          {
            id: "finstmt6-mastery2",
            question: "Which cost is subtracted last, just before reaching net income?",
            options: [
              "Cost of goods sold",
              "Income taxes owed",
              "Marketing expenses",
              "The original revenue"
            ],
            correctAnswer: 1,
            explanation: "Taxes are among the final subtractions in the waterfall. After removing interest and taxes from operating income, you arrive at net income."
          },
          {
            id: "finstmt6-mastery3",
            question: "A company with strong operating income posts weak net income. A likely cause is…",
            options: [
              "It had no revenue at all",
              "Heavy interest and tax costs",
              "It sold too many products",
              "Its gross margin was too high"
            ],
            correctAnswer: 1,
            explanation: "Operating income comes before interest and taxes. Heavy debt interest and a big tax bill can shrink strong operating income down to weak net income."
          },
          {
            id: "finstmt6-mastery4",
            question: "Net income jumps because the company sold a building. A careful analyst will…",
            options: [
              "Treat it as normal recurring profit",
              "Separate the one-time gain from operations",
              "Assume the whole core business simply tripled",
              "Ignore reported net income completely and forever"
            ],
            correctAnswer: 1,
            explanation: "A one-time asset sale isn't recurring. The analyst strips it out to see the real, repeatable earning power of the core business underneath the headline."
          },
          {
            id: "finstmt6-mastery5",
            question: "Why is net income not the same as the company's cash?",
            options: [
              "Cash is somehow completely illegal to report publicly",
              "It includes non-cash items and credit sales",
              "Net income is always a large negative number",
              "Cash only ever exists at the calendar year-end"
            ],
            correctAnswer: 1,
            explanation: "Net income counts non-cash charges like depreciation and sales made on credit before cash arrives, so it can differ from the actual cash the company holds."
          },
          {
            id: "finstmt6-mastery6",
            question: "When investors say a company 'beat earnings,' they usually mean its…",
            options: [
              "Revenue matched last year exactly",
              "Net income topped analyst expectations",
              "Debt was fully paid off",
              "Total assets rose very sharply upward"
            ],
            correctAnswer: 1,
            explanation: "'Earnings' typically refers to net income (or EPS). Beating earnings means the reported profit exceeded what analysts predicted, which often lifts the stock."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // fin-stmt-7: Balance Sheet
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "fin-stmt-7",
    sections: [
      {
        type: "concept",
        title: "A Snapshot of What a Company Owns and Owes",
        paragraphs: [
          "If the income statement is a video of a period, the balance sheet is a photograph taken on one exact day. It captures three things at that instant: what the company owns (assets), what it owes (liabilities), and what's left over for the owners (equity). Picture a teen who has $600 in a savings account and a laptop worth $400. Those are assets totaling $1,000. If they still owe a parent $300 for the laptop, that's a liability. The $700 remaining truly belongs to them - that's their equity, their real net worth on that day.",
          "The balance sheet always follows one unbreakable rule: Assets = Liabilities + Equity. It's called the accounting equation, and it must balance every single time, which is where the statement gets its name. The logic is simple: everything a company owns was paid for either with borrowed money (liabilities) or with money the owners put in and profits kept (equity). There's no third source. So if you know two of the three numbers, the third is fixed automatically. A firm with $10M in assets and $6M in liabilities must have exactly $4M in equity.",
          "Investors use the balance sheet to judge financial strength and safety. It reveals whether a company has enough cash and short-term assets to pay its bills, how much debt it carries, and how much genuine ownership value backs the stock. A business with mountains of debt and thin equity is fragile - a bad year could sink it. One with strong equity and manageable debt can weather storms. Reading it alongside the income statement gives a fuller picture: one shows the profit earned, the other shows the financial foundation underneath."
        ],
        bullets: [
          "The balance sheet is a snapshot on one specific date, not a period of time.",
          "It lists assets (owned), liabilities (owed), and equity (owners' leftover value).",
          "The accounting equation Assets = Liabilities + Equity must always balance.",
          "Everything owned is funded by either borrowed money or owners' money and profits.",
          "It reveals financial strength: cash on hand, debt load, and real ownership value."
        ],
        realWorldExample: "A bakery owns $50,000 in equipment, $20,000 in cash, and $10,000 of ingredients - $80,000 in assets. It owes $30,000 on a loan. By the equation, equity must equal $80,000 minus $30,000, or $50,000 - the owner's true stake in the business on that day."
      },
      {
        type: "concept",
        title: "Breaking Down the Three Sections",
        paragraphs: [
          "Assets split into two groups by how quickly they turn into cash. Current assets are cash or things expected to become cash within a year - the bank balance, money customers owe (accounts receivable), and inventory waiting to be sold. Long-term assets stick around longer: buildings, machines, land, and intangibles like patents or brand value. Sorting them this way matters because a company needs enough current assets to cover its near-term bills. Piles of buildings won't help pay next month's payroll if there's no cash.",
          "Liabilities also split by timing. Current liabilities come due within a year - bills owed to suppliers (accounts payable), short-term loans, and wages not yet paid. Long-term liabilities stretch further out, like a ten-year bond or a mortgage on a factory. Comparing current assets to current liabilities is one of the fastest health checks an investor makes: if a company owes $5M within the year but only holds $2M in current assets, it may struggle to pay, even if its total assets look impressive on paper.",
          "Equity is the third piece and often the most misunderstood. It includes the money owners originally invested plus retained earnings - all the past profits the company chose to keep and reinvest rather than pay out. Growing retained earnings over the years is a healthy sign: it means the business has been profitable and is building its foundation. Equity is sometimes called book value, and while it rarely equals the stock's market price, it gives a grounded sense of the tangible value backing each share of ownership."
        ],
        bullets: [
          "Current assets become cash within a year: cash, receivables, and inventory.",
          "Long-term assets last longer: buildings, machinery, land, and patents.",
          "Current liabilities are due within a year; long-term ones stretch further out.",
          "Comparing current assets to current liabilities is a fast solvency check.",
          "Equity includes invested money plus retained earnings - profits kept over time."
        ],
        realWorldExample: "A retailer holds $3M in current assets against $1M in current liabilities - comfortable coverage. Its equity shows $500,000 originally invested plus $4M in retained earnings, meaning years of kept profits now form the bulk of the owners' stake."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "finstmt7-mc1",
            question: "What does the accounting equation state?",
            options: [
              "Revenue minus costs equals profit",
              "Assets equal liabilities plus equity",
              "Cash equals debt minus income",
              "Equity equals revenue plus assets"
            ],
            correctAnswer: 1,
            explanation: "Assets = Liabilities + Equity is the accounting equation. It must always balance, because everything owned is funded either by borrowing or by owners' money and kept profits."
          },
          {
            id: "finstmt7-mc2",
            question: "The balance sheet captures a company's finances over what span?",
            options: [
              "A full quarter of trading",
              "A single specific date",
              "The company's entire history",
              "One rolling twelve-month year"
            ],
            correctAnswer: 1,
            explanation: "The balance sheet is a snapshot taken on one exact date, showing what the company owns and owes at that instant - unlike the income statement, which covers a period."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maya Sizes Up a Startup's Balance Sheet",
        narrative: "Maya is deciding whether a small startup is financially sound before her investing club puts in money. The founder hands her the latest balance sheet. Instead of glancing at the total assets, Maya breaks it into the three sections to see what really backs the business on that day.",
        details: [
          "Assets: $200,000 total - but only $40,000 is current (cash and receivables); the rest is equipment.",
          "Liabilities: $150,000 total, of which $90,000 is due within the next year.",
          "By the equation, equity is $200,000 minus $150,000 - just $50,000 of real owner value.",
          "The $90,000 due soon dwarfs the $40,000 in current assets, flagging a cash-crunch risk."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "finstmt7-aq1",
          question: "Why is Maya worried despite the startup's $200,000 in total assets?",
          options: [
            "Total assets are always overstated",
            "Near-term bills exceed its current assets",
            "Equity can never be trusted at all",
            "Equipment is not a real asset"
          ],
          correctAnswer: 1,
          explanation: "The firm owes $90,000 within a year but holds only $40,000 in current assets. Big total assets don't help if most are equipment that can't quickly pay looming bills."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The balance sheet is a one-day snapshot of assets, liabilities, and equity.",
          "Assets = Liabilities + Equity must always balance - it's the accounting equation.",
          "Assets and liabilities split into current (within a year) and long-term.",
          "Comparing current assets to current liabilities checks near-term solvency.",
          "Equity is owners' value: invested money plus retained earnings over time."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "finstmt7-mastery1",
            question: "A company has $12M in assets and $7M in liabilities. Its equity is…",
            options: [
              "$19M all added together",
              "$5M by the equation",
              "$7M matching the debt",
              "$12M equal to assets"
            ],
            correctAnswer: 1,
            explanation: "Assets minus liabilities equals equity: $12M minus $7M is $5M. The accounting equation fixes the third number once you know the other two."
          },
          {
            id: "finstmt7-mastery2",
            question: "Which of these is a current asset?",
            options: [
              "A large factory building",
              "Cash in the bank",
              "A ten-year bond owed",
              "A newly registered patent"
            ],
            correctAnswer: 1,
            explanation: "Cash is the most current of assets. Current assets turn into cash within a year; buildings and patents are long-term, and a bond owed is a liability."
          },
          {
            id: "finstmt7-mastery3",
            question: "What are retained earnings?",
            options: [
              "Money borrowed from a bank",
              "Past profits the firm kept",
              "Cash owed to suppliers now",
              "Revenue expected sometime next year"
            ],
            correctAnswer: 1,
            explanation: "Retained earnings are the accumulated past profits a company chose to reinvest rather than pay out. They sit inside equity and grow when the firm stays profitable."
          },
          {
            id: "finstmt7-mastery4",
            question: "Why compare current assets with current liabilities?",
            options: [
              "To carefully calculate the yearly corporate tax bill owed",
              "To check if near-term bills can be paid",
              "To find the company's total revenue for the year",
              "To measure the firm's long-term brand value"
            ],
            correctAnswer: 1,
            explanation: "This comparison is a quick solvency check. If current liabilities exceed current assets, the firm may struggle to cover bills due within the coming year."
          },
          {
            id: "finstmt7-mastery5",
            question: "The balance sheet differs from the income statement because it…",
            options: [
              "Shows the profit earned during each year",
              "Captures one moment, not a period",
              "Lists only the revenue and the costs",
              "Ignores what the whole company actually owes"
            ],
            correctAnswer: 1,
            explanation: "The balance sheet is a snapshot on a single date, while the income statement covers a span of time. Together they show the foundation and the performance."
          },
          {
            id: "finstmt7-mastery6",
            question: "Everything a company owns must be funded by…",
            options: [
              "Revenue only from this year",
              "Borrowed money or owners' funds",
              "Government grants and subsidies exclusively",
              "Future profits not yet earned"
            ],
            correctAnswer: 1,
            explanation: "There are only two sources: liabilities (borrowed money) and equity (owners' money plus kept profits). That's exactly why Assets = Liabilities + Equity always holds."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // fin-stmt-8: Assets vs Liabilities
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "fin-stmt-8",
    sections: [
      {
        type: "concept",
        title: "The Difference Between Owning and Owing",
        paragraphs: [
          "At its core, the distinction is simple: an asset puts value into your hands, while a liability is a claim someone else has on your value. An asset is anything the company owns that has worth - cash, inventory, machines, buildings, patents, even money customers still owe it. A liability is anything the company owes to others - loans, unpaid supplier bills, wages due, taxes owed. Think of a student with a $500 bike (asset) who borrowed $200 from a friend to buy it (liability). The bike is theirs, but $200 of its value is really promised to the friend.",
          "The reason this split matters so much is that assets and liabilities push in opposite directions on a company's net worth. Add up all the assets, subtract all the liabilities, and what remains is equity - the true value owned free and clear. This is why two firms with identical assets can be wildly different investments: one with few liabilities keeps most of that value, while one drowning in debt keeps almost none. The gap between what you own and what you owe is where real financial strength lives.",
          "Not all assets are equal, and neither are all liabilities. A pile of cash is far more useful than a warehouse of slow-selling inventory, even if both are 'assets.' Likewise, a low-interest loan due in ten years is far less threatening than a big bill due next month. Smart investors don't just tally the totals - they look at the quality and timing behind each number. An asset you can't easily turn into cash, or a liability that lands all at once, can matter more than the raw figures suggest."
        ],
        bullets: [
          "An asset is something the company owns that has value.",
          "A liability is something the company owes to someone else.",
          "Assets minus liabilities equals equity - the value owned outright.",
          "Two firms with equal assets differ greatly if their debts differ.",
          "Quality and timing matter: cash beats slow inventory; long debt beats a bill due now."
        ],
        realWorldExample: "A food truck owns a $60,000 truck and $10,000 in supplies - $70,000 of assets. It owes $25,000 on a vehicle loan and $5,000 to suppliers - $30,000 of liabilities. Its equity, the value truly owned, is $70,000 minus $30,000, or $40,000."
      },
      {
        type: "concept",
        title: "Good Debt, Bad Debt, and Liquid Assets",
        paragraphs: [
          "Liabilities aren't automatically bad. Companies borrow to grow faster than their own profits alone would allow - a retailer might take a loan to open ten new stores that each earn more than the interest costs. That's leverage working in the company's favor. The danger appears when debt grows faster than the profits meant to repay it, or when too much comes due at once. A liability that funds a productive, profitable investment is very different from one taken just to cover losses. The purpose behind the borrowing tells you as much as the amount.",
          "On the asset side, liquidity is the key idea - how fast an asset can become cash without losing value. Cash is perfectly liquid. Stocks and receivables are fairly liquid. A specialized factory or aging inventory is illiquid; selling it quickly might mean a steep discount. A company can look asset-rich yet still hit a cash crunch if its assets are locked up in things it can't sell fast. That's why a business surviving a rough patch depends less on total assets and more on how much of them are liquid.",
          "Putting the two together reveals a company's real resilience. The healthiest firms pair liquid assets with manageable, well-timed liabilities - they can cover what's due without fire-selling anything. The most fragile pair illiquid assets with heavy short-term debt - a single bad quarter forces desperate choices. When you read a balance sheet, don't just ask how much a company owns and owes; ask how quickly it can access its value and how soon it must part with it. That interplay decides who survives hard times."
        ],
        bullets: [
          "Debt used to fund profitable growth can be healthy leverage, not a red flag.",
          "Debt becomes dangerous when it outpaces profits or all comes due at once.",
          "Liquidity measures how fast an asset turns into cash without losing value.",
          "Cash is fully liquid; a specialized factory or old inventory is illiquid.",
          "Resilience comes from liquid assets paired with manageable, well-timed debt."
        ],
        realWorldExample: "Two firms each hold $1M in assets. Firm A's is mostly cash; Firm B's is a niche machine hard to sell. When both face a surprise $200,000 bill, Firm A pays easily, while Firm B must scramble - proving liquidity, not just totals, drives survival."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "finstmt8-mc1",
            question: "What is the defining feature of a liability?",
            options: [
              "It is something the firm owns",
              "It is something the firm owes",
              "It always earns the firm cash",
              "It never appears on any financial statements"
            ],
            correctAnswer: 1,
            explanation: "A liability is an obligation - something the company owes to others, like a loan or an unpaid bill. Assets are what it owns; liabilities are what it owes."
          },
          {
            id: "finstmt8-mc2",
            question: "What does 'liquidity' describe about an asset?",
            options: [
              "How large its dollar value is",
              "How fast it converts to cash",
              "How old the asset has become",
              "How much total debt it carries"
            ],
            correctAnswer: 1,
            explanation: "Liquidity is how quickly an asset can be turned into cash without losing value. Cash is fully liquid; a specialized factory is illiquid and slow to sell."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devon Compares Two Sandwich Shops",
        narrative: "Devon's family is choosing which of two sandwich shops to invest savings into. Both report the same total assets and the same total liabilities. On the surface they look identical, so Devon digs into the quality and timing behind each shop's numbers before deciding.",
        details: [
          "Shop 1: assets are 70% cash and receivables; its debt is a low-interest loan due in eight years.",
          "Shop 2: assets are 80% custom kitchen equipment; its debt is a bill fully due in three months.",
          "Both shops show $150,000 assets and $60,000 liabilities, so equity is $90,000 for each.",
          "Shop 2 must find cash fast for its looming bill, but little of its value is liquid."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "finstmt8-aq1",
          question: "Why is Shop 1 the safer bet despite identical totals?",
          options: [
            "It simply has higher total revenue reported this year",
            "Its assets are liquid and debt is long-term",
            "It owns more machinery and equipment overall today",
            "It reports absolutely no liabilities at all anywhere"
          ],
          correctAnswer: 1,
          explanation: "Shop 1 pairs liquid assets with long-dated, low-interest debt, so it can meet obligations easily. Shop 2's value is locked in equipment while a bill looms in months."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Assets are what a company owns; liabilities are what it owes.",
          "Assets minus liabilities equals equity - the value owned free and clear.",
          "Debt can be healthy leverage if it funds profitable growth.",
          "Liquidity is how fast an asset becomes cash without losing value.",
          "Resilience comes from liquid assets and manageable, well-timed liabilities."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "finstmt8-mastery1",
            question: "Which item is an asset rather than a liability?",
            options: [
              "A bank loan due next year",
              "Cash held in the account",
              "Wages owed to the workers",
              "An unpaid supplier bill"
            ],
            correctAnswer: 1,
            explanation: "Cash is an asset - something the firm owns. Loans, owed wages, and unpaid supplier bills are all liabilities, representing money the company must pay to others."
          },
          {
            id: "finstmt8-mastery2",
            question: "A firm owns $90,000 in assets and owes $35,000. Its equity is…",
            options: [
              "$125,000 combined",
              "$55,000 owned outright",
              "$35,000 same as debt",
              "$90,000 equal to assets"
            ],
            correctAnswer: 1,
            explanation: "Equity is assets minus liabilities: $90,000 minus $35,000 equals $55,000. That's the value the owners hold free and clear after debts are accounted for."
          },
          {
            id: "finstmt8-mastery3",
            question: "When is taking on debt likely a healthy move?",
            options: [
              "When it merely covers past losses",
              "When it funds profitable growth",
              "When all of it is due next month",
              "When interest costs exceed profits"
            ],
            correctAnswer: 1,
            explanation: "Debt is healthy leverage when it funds investments earning more than the interest costs. It turns dangerous when it covers losses or comes due all at once."
          },
          {
            id: "finstmt8-mastery4",
            question: "Which asset is the most liquid?",
            options: [
              "A specialized factory machine",
              "Cash sitting in the account",
              "A warehouse of old inventory",
              "A patent on a new design"
            ],
            correctAnswer: 1,
            explanation: "Cash is perfectly liquid - it's already money. Machines, aging inventory, and patents are far harder to convert to cash quickly without cutting the price."
          },
          {
            id: "finstmt8-mastery5",
            question: "Two firms have equal assets but different debt. This means…",
            options: [
              "They are two identical investments",
              "Their equity and safety differ",
              "Their revenue must be equal",
              "Neither can ever be valued"
            ],
            correctAnswer: 1,
            explanation: "Equal assets but unequal liabilities produce different equity and different risk. The firm with less debt keeps more value and stands on a stronger footing."
          },
          {
            id: "finstmt8-mastery6",
            question: "A company is asset-rich but faces a cash crunch. The likely reason is…",
            options: [
              "It has no assets to speak of",
              "Its assets are illiquid, hard to sell",
              "It carries exactly zero liabilities at all",
              "Its yearly revenue was simply far too high"
            ],
            correctAnswer: 1,
            explanation: "If assets are locked in things that can't be sold quickly, a firm can be rich on paper yet short on cash when bills come due. Liquidity, not totals, pays the bills."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // fin-stmt-9: Cash Flow
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "fin-stmt-9",
    sections: [
      {
        type: "concept",
        title: "Why Cash Is Not the Same as Profit",
        paragraphs: [
          "A company can report a fat profit on its income statement and still run completely out of cash - and cash is what pays the bills. This surprising gap exists because profit is measured using accounting rules that count sales when they're made, not when the money actually arrives. If a firm sells $100,000 of goods on credit, it books $100,000 of revenue and maybe a healthy profit, yet not a single dollar has landed in the bank until customers pay. The cash flow statement exists to track the real movement of money, cutting through the accounting to show what actually came in and went out.",
          "The statement follows cash across three activities. Operating activities cover the day-to-day business - cash from selling products minus cash paid for supplies, wages, and rent. Investing activities cover buying or selling long-term things like equipment or another company. Financing activities cover raising or repaying money with owners and lenders - issuing stock, borrowing, repaying loans, or paying dividends. Adding all three together shows the net change in cash for the period, ending with exactly how much the company's bank balance rose or fell.",
          "Investors treasure the cash flow statement because cash is harder to fake than profit. Accounting profit involves estimates and judgment calls that can be stretched; cash either moved or it didn't. A company posting steady profits but shrinking cash raises a red flag - maybe customers aren't paying, or inventory is piling up. Conversely, a firm with modest profit but strong, growing cash is often healthier than it first appears. Following the cash tells you whether the business is truly self-sustaining or quietly running on fumes."
        ],
        bullets: [
          "Profit counts sales when made; cash flow tracks money actually received and paid.",
          "A profitable company can still go broke if cash isn't coming in.",
          "The statement has three parts: operating, investing, and financing activities.",
          "The three parts sum to the net change in the company's cash balance.",
          "Cash is harder to manipulate than accounting profit, so investors trust it."
        ],
        realWorldExample: "A furniture maker reports $80,000 profit but sold everything on 90-day credit, so no cash arrived yet. Meanwhile it paid $60,000 cash for wood and wages. Its income statement looks great, but its cash flow is deeply negative - and it can't make payroll."
      },
      {
        type: "concept",
        title: "Reading the Three Sections Together",
        paragraphs: [
          "Operating cash flow is the heart of the statement - it shows whether the core business generates cash on its own. A healthy, mature company should produce consistently positive operating cash flow; the everyday business of selling should bring in more cash than it consumes. If operating cash flow is negative while the company claims profits, something is off, often in how sales convert to actual payments. This is the first number seasoned investors check, because a business that can't fund itself from operations is leaning on borrowing or selling assets to survive.",
          "Investing cash flow is usually negative for a growing company, and that's often good news. Negative here means the firm is spending cash to buy equipment, build facilities, or acquire other businesses - investing in its future. A company with strongly positive investing cash flow may actually be selling off assets to stay afloat, which can be a warning sign. Context is everything: spending on productive assets today is how tomorrow's cash gets bigger, so a negative number driven by smart expansion is very different from one driven by desperation.",
          "Financing cash flow reveals the relationship with investors and lenders. Positive financing cash flow means the company raised money by issuing stock or borrowing; negative means it returned money by repaying debt, buying back shares, or paying dividends. A mature, cash-rich firm often shows negative financing flow as it hands cash back to shareholders. Reading all three sections together tells the story: where cash comes from, where it goes, and whether the business stands on its own feet or depends on outside money to keep the lights on."
        ],
        bullets: [
          "Operating cash flow shows if the core business generates cash by itself.",
          "Persistently negative operating cash flow despite profits is a warning sign.",
          "Negative investing cash flow often means healthy spending on future growth.",
          "Positive financing flow means raising money; negative means returning it.",
          "Reading all three together reveals whether the firm is self-sustaining."
        ],
        realWorldExample: "A growing app company shows +$5M operating cash flow (the business earns cash), -$3M investing (buying servers and a small rival), and -$1M financing (repaying a loan). Net cash rose $1M, and the mix signals a healthy, self-funding, expanding firm."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "finstmt9-mc1",
            question: "Why can a profitable company still run out of cash?",
            options: [
              "Reported profit is always taxed at 100 percent",
              "Sales counted may not be paid yet",
              "Cash and reported profit are exactly identical",
              "Profits are always paid straight out as dividends"
            ],
            correctAnswer: 1,
            explanation: "Profit counts a sale when it's made, but the cash may not arrive until later. If customers haven't paid, a firm can show profit yet lack the cash to pay bills."
          },
          {
            id: "finstmt9-mc2",
            question: "Which section shows cash from the day-to-day business?",
            options: [
              "Investing activities",
              "Operating activities",
              "Financing activities",
              "Retained earnings"
            ],
            correctAnswer: 1,
            explanation: "Operating activities capture cash from the core business - selling products and paying for supplies, wages, and rent. It's the heart of the cash flow statement."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Investigates a Suspicious Success Story",
        narrative: "Priya reads that a gadget startup just posted record profits. Excited, she pulls its cash flow statement before investing. What she finds under the profit headline makes her pause and rethink how healthy the company really is.",
        details: [
          "Operating cash flow is negative $2M, even though reported profit was a positive $3M.",
          "Investing cash flow is positive $4M - the firm sold off part of its factory.",
          "Financing cash flow is positive $1M from a new loan taken during the period.",
          "The profit came from credit sales customers haven't paid, while cash came from selling assets and borrowing."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "finstmt9-aq1",
          question: "What does Priya's cash flow analysis reveal about the startup?",
          options: [
            "It is strongly and reliably self-sustaining today",
            "Its profit isn't backed by real cash",
            "It has no debt of any kind",
            "It generates all its cash purely from sales"
          ],
          correctAnswer: 1,
          explanation: "Operating cash flow is negative while cash came from selling assets and borrowing. The record profit isn't translating into real money, a classic warning sign."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Cash flow tracks real money moving in and out, unlike accounting profit.",
          "A profitable company can still fail if cash isn't actually coming in.",
          "The statement has operating, investing, and financing sections.",
          "Positive operating cash flow shows the core business funds itself.",
          "Negative investing flow often signals healthy spending on future growth."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "finstmt9-mastery1",
            question: "The cash flow statement is trusted because cash is…",
            options: [
              "Always much larger than profit",
              "Harder to manipulate than profit",
              "Reported just once every decade",
              "Never affected by sales timing"
            ],
            correctAnswer: 1,
            explanation: "Accounting profit relies on estimates and timing choices, but cash either moved or it didn't. That makes cash flow harder to fake and a favorite of careful investors."
          },
          {
            id: "finstmt9-mastery2",
            question: "Buying new equipment appears in which section?",
            options: [
              "Operating activities",
              "Investing activities",
              "Financing activities",
              "Gross profit section"
            ],
            correctAnswer: 1,
            explanation: "Purchases of long-term assets like equipment fall under investing activities. This spending is usually negative cash flow but often reflects healthy growth."
          },
          {
            id: "finstmt9-mastery3",
            question: "Negative investing cash flow in a growing firm usually means…",
            options: [
              "It is going bankrupt fairly soon",
              "It is investing in future growth",
              "It has completely stopped all operations",
              "It paid off all its debt"
            ],
            correctAnswer: 1,
            explanation: "Negative investing cash flow typically means the company is spending on equipment, facilities, or acquisitions - building for the future rather than shrinking."
          },
          {
            id: "finstmt9-mastery4",
            question: "Which activity is a financing cash flow?",
            options: [
              "Selling products to customers",
              "Repaying a bank loan",
              "Buying a delivery truck",
              "Paying the employee wages"
            ],
            correctAnswer: 1,
            explanation: "Repaying a loan is a financing activity - it involves the company's relationship with lenders. Selling products and paying wages are operating; buying a truck is investing."
          },
          {
            id: "finstmt9-mastery5",
            question: "The three cash flow sections add up to…",
            options: [
              "The company's total yearly revenue",
              "The net change in cash",
              "The firm's total shareholder equity",
              "The whole year's final net income"
            ],
            correctAnswer: 1,
            explanation: "Summing operating, investing, and financing cash flows gives the net change in the cash balance - exactly how much the company's cash rose or fell in the period."
          },
          {
            id: "finstmt9-mastery6",
            question: "A firm reports profits but negative operating cash flow. This suggests…",
            options: [
              "The whole business is perfectly healthy",
              "Its sales aren't converting to cash",
              "It has no expenses at all",
              "Its revenue was zero this year"
            ],
            correctAnswer: 1,
            explanation: "Positive profit with negative operating cash flow often means customers aren't paying or inventory is piling up. The core business isn't turning sales into real cash."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // fin-stmt-10: Free Cash Flow
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "fin-stmt-10",
    sections: [
      {
        type: "concept",
        title: "The Cash That's Truly Free to Use",
        paragraphs: [
          "Free cash flow (FCF) answers a deceptively simple question: after a company pays to keep itself running and to maintain its equipment, how much cash is genuinely left over to do whatever it wants? The formula is straightforward - take operating cash flow and subtract capital expenditures (the money spent on equipment, buildings, and other long-term assets). What remains is free cash flow. Think of a teen earning $400 from a summer job but needing $150 for gas and phone bills to keep working. Only the remaining $250 is truly free to save, spend, or invest.",
          "This 'leftover' cash is powerful because it's what a company can use without hurting its core operations. Free cash flow can fund dividends paid to shareholders, buybacks that shrink the share count, repayment of debt, or acquisitions of other companies - all without borrowing. A business generating strong, growing free cash flow has genuine flexibility and financial freedom. It isn't trapped choosing between paying investors and keeping the lights on; it can do both. That's why many professional investors consider free cash flow one of the single most revealing numbers on any company.",
          "The distinction from ordinary profit matters. Net income includes non-cash items and ignores the real cash spent maintaining and expanding the asset base. A company might report handsome profits while pouring every dollar - and then some - into capital spending, leaving no free cash at all. Free cash flow strips away the accounting and asks the blunt question: how much actual, usable cash did this business throw off? A firm that consistently produces more free cash than it needs is building a war chest; one that consistently burns cash is living on borrowed time."
        ],
        bullets: [
          "Free cash flow = operating cash flow minus capital expenditures.",
          "It's the cash left after running the business and maintaining its assets.",
          "FCF can fund dividends, buybacks, debt repayment, or acquisitions.",
          "Strong, growing FCF gives a company real financial flexibility.",
          "Unlike profit, FCF measures actual usable cash the business generates."
        ],
        realWorldExample: "A bike manufacturer generates $10M in operating cash flow but spends $4M on new machinery and factory upkeep. Its free cash flow is $6M - real money it can use to pay dividends, cut debt, or expand, all without raising a single dollar from outside."
      },
      {
        type: "concept",
        title: "Why Investors Prize Free Cash Flow",
        paragraphs: [
          "Free cash flow is hard to fake, which is exactly why analysts trust it. Reported earnings can be nudged by accounting choices - how fast to depreciate assets, when to recognize a sale, how to value inventory. But free cash flow reflects cash that physically left or entered the company after real investment needs. A company can dress up its earnings for a while, but it can't manufacture free cash flow it doesn't have. Over several years, consistently positive and rising free cash flow is one of the clearest signals that a business is genuinely healthy and well-run.",
          "Free cash flow also underpins how professionals value companies. The most respected valuation method, discounted cash flow, is built entirely on projecting a company's future free cash flows and translating them into a value today. The logic is that a business is ultimately worth all the free cash it will hand its owners over its lifetime. So a firm producing lots of free cash isn't just financially comfortable - it commands a higher fundamental value. Two companies with identical revenue can be worth very different amounts if one converts far more of it into free cash.",
          "But context still matters. A young, fast-growing company may show negative free cash flow because it's deliberately spending heavily to build for the future - opening stores, building factories, hiring ahead of demand. That can be perfectly rational, even smart, as long as those investments eventually produce strong cash flows. The warning sign is a mature company that should be generating free cash but isn't, or one burning cash with no clear path to profitability. Judging free cash flow always means asking not just the number, but the story and stage behind it."
        ],
        bullets: [
          "Free cash flow is hard to manipulate, so analysts trust it over earnings.",
          "Consistently rising FCF over years signals a genuinely healthy business.",
          "Discounted cash flow valuation is built on projected future free cash flows.",
          "Firms that convert more revenue into free cash command higher value.",
          "Young growth firms may show negative FCF while investing for the future."
        ],
        realWorldExample: "A software company converts 30 cents of every revenue dollar into free cash, while a rival with the same revenue converts just 5 cents. Investors value the first far higher, because its stronger free cash flow means more real money returned to owners over time."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "finstmt10-mc1",
            question: "How is free cash flow calculated?",
            options: [
              "Total revenue minus all the taxes owed",
              "Operating cash flow minus capital spending",
              "Net income plus the total company debt",
              "Total assets minus all the total liabilities"
            ],
            correctAnswer: 1,
            explanation: "Free cash flow equals operating cash flow minus capital expenditures - the cash left after running the business and maintaining or expanding its assets."
          },
          {
            id: "finstmt10-mc2",
            question: "What can a company do with free cash flow?",
            options: [
              "Only pay off its yearly income taxes",
              "Fund dividends, buybacks, or debt repayment",
              "Nothing until the firm is sold",
              "Only reinvest it back into inventory"
            ],
            correctAnswer: 1,
            explanation: "Free cash flow is truly discretionary. It can pay dividends, buy back shares, repay debt, or fund acquisitions - all without hurting core operations or borrowing."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Compares Two Profitable Companies",
        narrative: "Leo notices two companies both reporting $20M in annual profit. On paper they look equally strong. Before choosing where to invest, Leo calculates each one's free cash flow to see how much usable cash each truly produces.",
        details: [
          "Company X: $25M operating cash flow, $5M capital spending - free cash flow of $20M.",
          "Company Y: $22M operating cash flow, $21M capital spending - free cash flow of just $1M.",
          "Both report $20M profit, yet Company X throws off far more truly usable cash.",
          "Company Y must reinvest nearly everything just to stay running, leaving almost nothing free."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "finstmt10-aq1",
          question: "Why does Leo prefer Company X despite equal profits?",
          options: [
            "It reports a much larger total revenue",
            "It produces far more free cash flow",
            "It carries absolutely no long-term outstanding debt",
            "It pays a higher rate of tax"
          ],
          correctAnswer: 1,
          explanation: "Both earn $20M profit, but Company X's free cash flow is $20M versus Company Y's $1M. X generates vastly more usable cash after its investment needs are met."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Free cash flow is operating cash flow minus capital expenditures.",
          "It's the cash left over after running and maintaining the business.",
          "FCF can fund dividends, buybacks, debt repayment, or acquisitions.",
          "It's hard to fake, so investors trust it more than reported earnings.",
          "Young growth firms may show negative FCF while investing for the future."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "finstmt10-mastery1",
            question: "Free cash flow is best described as cash that is…",
            options: [
              "Owed entirely to the outside lenders",
              "Left over and free to use",
              "Locked away into fixed physical assets",
              "Required to pay this year's tax"
            ],
            correctAnswer: 1,
            explanation: "Free cash flow is the money remaining after running the business and maintaining its assets - truly free to fund dividends, buybacks, debt cuts, or growth."
          },
          {
            id: "finstmt10-mastery2",
            question: "What are capital expenditures?",
            options: [
              "Wages paid to employees",
              "Spending on long-term assets",
              "Taxes paid to the government",
              "Cash borrowed from a bank"
            ],
            correctAnswer: 1,
            explanation: "Capital expenditures are money spent on long-term assets like equipment and buildings. Subtracting them from operating cash flow yields free cash flow."
          },
          {
            id: "finstmt10-mastery3",
            question: "Why do analysts trust FCF more than reported earnings?",
            options: [
              "It is always a bigger number",
              "It is harder to manipulate",
              "It ignores all cash spending",
              "It counts only future sales"
            ],
            correctAnswer: 1,
            explanation: "Earnings can be shaped by accounting choices, but free cash flow reflects real cash after investment needs. It's much harder to fake, so analysts rely on it."
          },
          {
            id: "finstmt10-mastery4",
            question: "Which valuation method is built on free cash flow?",
            options: [
              "Balance sheet totaling",
              "Discounted cash flow",
              "Plain revenue-only pricing",
              "Simple dividend counting"
            ],
            correctAnswer: 1,
            explanation: "Discounted cash flow projects a company's future free cash flows and converts them to a value today, treating the firm as worth the cash it will produce."
          },
          {
            id: "finstmt10-mastery5",
            question: "A firm has $8M operating cash flow and $3M capital spending. Its FCF is…",
            options: [
              "$11M added together",
              "$5M after subtracting",
              "$3M equal to spending",
              "$8M same as operating"
            ],
            correctAnswer: 1,
            explanation: "Free cash flow is operating cash flow minus capital expenditures: $8M minus $3M equals $5M of truly usable cash left over."
          },
          {
            id: "finstmt10-mastery6",
            question: "A young company shows negative free cash flow. This may be fine if…",
            options: [
              "It has stopped growing entirely now",
              "It's investing heavily for the future",
              "It has no revenue at all whatsoever",
              "It refuses to spend any cash"
            ],
            correctAnswer: 1,
            explanation: "Negative FCF can be rational for a fast-growing firm pouring cash into stores, factories, or hiring - provided those investments eventually generate strong cash flows."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // ratios-1: P/E
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "ratios-1",
    sections: [
      {
        type: "concept",
        title: "The Price Tag on a Dollar of Earnings",
        paragraphs: [
          "The price-to-earnings ratio, or P/E, is the single most quoted number in investing, and its idea is simple: it tells you how many dollars you pay for each dollar of a company's annual profit. You calculate it by dividing the stock price by earnings per share (EPS). If a stock trades at $50 and earns $2 per share, its P/E is 25 - you're paying $25 for every $1 of yearly earnings. It's like comparing the price of two lemonade stands not by their sticker price alone, but by how much profit each generates relative to its cost.",
          "The P/E is useful because raw stock price means nothing on its own. A $500 stock isn't 'expensive' and a $5 stock isn't 'cheap' - it depends entirely on the earnings behind each share. A $500 stock earning $50 per share has a P/E of 10, while a $5 stock earning 10 cents has a P/E of 50. By that measure, the $5 stock is actually pricier relative to its profits. The P/E levels the playing field, letting you compare companies of wildly different share prices on equal footing.",
          "Another way to read the P/E is as a rough payback period, assuming earnings stayed flat. A P/E of 15 loosely means it would take 15 years of current earnings to earn back the price you paid. That framing helps beginners feel what the number means: a high P/E demands patience and faith in growth, while a low P/E asks less of the future. The market's average P/E has historically hovered around 15 to 20, giving a rough yardstick for judging whether a given stock sits high or low."
        ],
        bullets: [
          "P/E = stock price divided by earnings per share (EPS).",
          "It shows how many dollars you pay per dollar of annual earnings.",
          "Raw share price is meaningless without the earnings behind it.",
          "A P/E can be read as a rough payback period at flat earnings.",
          "The market's long-run average P/E sits roughly between 15 and 20."
        ],
        realWorldExample: "Two stores each cost $100 to buy. Store A earns $10 a year (P/E of 10); Store B earns $4 a year (P/E of 25). Even at the same price, Store A returns its cost far faster - the P/E reveals which is the better deal per dollar of profit."
      },
      {
        type: "concept",
        title: "High P/E, Low P/E, and What They Signal",
        paragraphs: [
          "A high P/E means investors are willing to pay a lot for each dollar of current earnings - usually because they expect those earnings to grow rapidly in the future. A fast-growing tech company might trade at a P/E of 40 or more because buyers are betting today's small profits will balloon. A high P/E isn't automatically 'bad'; it reflects optimism. But it carries risk: if the expected growth doesn't materialize, the stock can fall hard as reality catches up to the lofty price the market had baked in.",
          "A low P/E means investors are paying little for each dollar of earnings. This can signal a bargain - a solid company the market has overlooked - or it can be a warning that investors expect earnings to shrink. A steel company at a P/E of 8 might be genuinely cheap, or the market might foresee declining demand. This is the 'value trap': a stock that looks cheap by P/E but keeps getting cheaper because the business is deteriorating. A low number always demands the follow-up question: why is it low?",
          "The most important rule is that P/E is only meaningful in comparison. Compare a company to its own history, to direct competitors, and to its industry - a P/E of 30 is high for a utility but low for a booming software firm. Different industries carry different normal ranges because they grow at different speeds. And P/E has limits: it breaks down for companies with no earnings (you can't divide by zero or a loss), and it can be distorted by one-time events. Used with care and context, though, it's a fast, powerful first read on how the market prices a stock."
        ],
        bullets: [
          "A high P/E reflects optimism about strong future earnings growth.",
          "A low P/E may signal a bargain or expected shrinking earnings.",
          "A 'value trap' looks cheap by P/E but keeps declining as the business weakens.",
          "P/E is only meaningful compared to peers, history, and the industry.",
          "P/E breaks down for firms with no earnings and can be distorted by one-time events."
        ],
        realWorldExample: "A software firm trades at a P/E of 45 while a utility sits at 12. Neither is simply 'right' - the software firm is priced for fast growth, the utility for steady, slow earnings. Comparing them directly would mislead; each must be judged against its own industry."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ratios1-mc1",
            question: "How is the P/E ratio calculated?",
            options: [
              "Total earnings divided by the total assets",
              "Stock price divided by earnings per share",
              "Total revenue divided by the outstanding share count",
              "Annual dividends divided by the current stock price"
            ],
            correctAnswer: 1,
            explanation: "P/E equals the stock price divided by earnings per share. It shows how many dollars you pay for each dollar of the company's annual earnings."
          },
          {
            id: "ratios1-mc2",
            question: "A high P/E ratio usually reflects that investors…",
            options: [
              "Expect earnings to fall soon",
              "Expect strong future earnings growth",
              "Believe the company has no profit",
              "Want the stock price to drop"
            ],
            correctAnswer: 1,
            explanation: "A high P/E means investors will pay a lot per dollar of current earnings, typically because they expect those earnings to grow quickly in the future."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ava Weighs Two Stocks by P/E",
        narrative: "Ava is comparing two companies for her portfolio. Their share prices look very different, so she calculates each one's P/E to compare them fairly rather than being fooled by the sticker price alone.",
        details: [
          "GreenTech trades at $120 and earns $3 per share, giving a P/E of 40.",
          "SteadyFoods trades at $30 and earns $3 per share, giving a P/E of 10.",
          "Despite its lower price, SteadyFoods costs far less per dollar of earnings.",
          "GreenTech's high P/E only pays off if its earnings grow much faster than SteadyFoods'."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ratios1-aq1",
          question: "What must be true for GreenTech's higher P/E to be justified?",
          options: [
            "Its share price must fall soon",
            "Its earnings must grow much faster",
            "It must pay a large dividend now",
            "It must have fewer total shares"
          ],
          correctAnswer: 1,
          explanation: "A P/E of 40 versus 10 means investors pay four times as much per dollar of earnings. That only makes sense if GreenTech's earnings grow far faster than SteadyFoods'."
        }
      },
      {
        type: "recap",
        takeaways: [
          "P/E is stock price divided by earnings per share.",
          "It shows how much you pay for each dollar of annual earnings.",
          "High P/E signals growth optimism; low P/E may be a bargain or a warning.",
          "Watch for value traps - cheap-looking stocks that keep declining.",
          "P/E only makes sense compared to peers, history, and the industry."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ratios1-mastery1",
            question: "A stock at $60 with EPS of $4 has a P/E of…",
            options: [
              "240 when multiplied",
              "15 when divided",
              "4 matching the EPS",
              "64 when added"
            ],
            correctAnswer: 1,
            explanation: "P/E is price divided by EPS: $60 divided by $4 equals 15. You'd pay $15 for each dollar of the company's annual earnings."
          },
          {
            id: "ratios1-mastery2",
            question: "Why is a raw share price alone a poor measure of value?",
            options: [
              "Stock prices are updated far too rarely",
              "It ignores the earnings behind it",
              "Prices are always kept exactly equal",
              "It counts dividends but not sales"
            ],
            correctAnswer: 1,
            explanation: "A $500 stock isn't expensive and a $5 stock isn't cheap without knowing earnings. P/E relates price to earnings, giving the price real meaning."
          },
          {
            id: "ratios1-mastery3",
            question: "What is a 'value trap'?",
            options: [
              "A stock that grows too quickly",
              "A cheap-looking stock that keeps declining",
              "A stock with a very high P/E",
              "A firm paying out huge dividends"
            ],
            correctAnswer: 1,
            explanation: "A value trap has a low P/E that looks like a bargain, but the business is deteriorating, so the price keeps falling. Low P/E always needs the question: why?"
          },
          {
            id: "ratios1-mastery4",
            question: "Why compare P/E within the same industry?",
            options: [
              "All industries share one P/E",
              "Industries have different normal ranges",
              "P/E is banned across sectors",
              "Only tech firms report earnings"
            ],
            correctAnswer: 1,
            explanation: "A P/E of 30 is high for a slow utility but normal for a fast software firm. Different industries grow at different speeds and carry different typical P/E ranges."
          },
          {
            id: "ratios1-mastery5",
            question: "For which company does P/E break down entirely?",
            options: [
              "One with steady, reliable annual profits every year",
              "One with no earnings or a loss",
              "One that pays a regular quarterly dividend",
              "One with a moderate current share price"
            ],
            correctAnswer: 1,
            explanation: "P/E requires positive earnings to divide by. A company with no earnings or a loss produces a meaningless or negative P/E, so the ratio fails there."
          },
          {
            id: "ratios1-mastery6",
            question: "A P/E of 20 can be loosely read as…",
            options: [
              "A fully guaranteed 20% return every single year",
              "About 20 years to earn back the price",
              "Twenty whole dollars of dividends paid out yearly",
              "A flat twenty percent chance of a loss"
            ],
            correctAnswer: 1,
            explanation: "At flat earnings, a P/E of 20 roughly means 20 years of current earnings to recover the purchase price - a helpful, if simplified, way to feel the number."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // ratios-2: EPS
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "ratios-2",
    sections: [
      {
        type: "concept",
        title: "Slicing Profit Into Per-Share Pieces",
        paragraphs: [
          "Earnings per share, or EPS, takes a company's total profit and divides it by the number of shares outstanding, revealing how much profit belongs to each single share of ownership. If a company earns $10 million and has 5 million shares, its EPS is $2 - each share earned $2 of profit. This matters because when you buy stock, you don't own a slice of the total profit directly; you own shares, and EPS translates the company-wide profit into the language of what you actually hold. It's the bridge between a giant corporate number and your individual stake.",
          "EPS is the engine behind many other metrics, most famously the P/E ratio, which divides share price by EPS. It's also the number Wall Street obsesses over each quarter: analysts forecast an EPS figure, and when a company reports, the market reacts sharply to whether actual EPS 'beat' or 'missed' those expectations. A company can grow total profit yet see EPS fall if it issued many new shares, spreading the same pie across more slices. That's why EPS, not just total profit, captures what each owner truly earns.",
          "There are two flavors worth knowing. Basic EPS uses the current share count, while diluted EPS accounts for things that could become shares later - stock options, convertible bonds, and similar instruments. Diluted EPS is usually a bit lower because it assumes more slices exist, and cautious investors prefer it as the more conservative, realistic figure. Companies report both, and the gap between them hints at how much potential dilution looms. For a careful reader, diluted EPS gives the truer picture of profit per share once all possible shares are counted."
        ],
        bullets: [
          "EPS = net income divided by shares outstanding.",
          "It shows the profit earned by each single share of ownership.",
          "EPS drives the P/E ratio and Wall Street's quarterly beat-or-miss game.",
          "Issuing new shares can lower EPS even if total profit rises.",
          "Diluted EPS counts potential shares and is the more conservative figure."
        ],
        realWorldExample: "A company earns $50 million with 25 million shares, giving an EPS of $2. Next year it earns $60 million but issued shares to reach 40 million - EPS drops to $1.50. Total profit rose, yet each share earned less because the profit was split more ways."
      },
      {
        type: "concept",
        title: "Reading EPS Trends and Their Traps",
        paragraphs: [
          "A single EPS number tells you little; the trend tells the story. Investors want to see EPS climbing steadily year after year, which signals a company growing its profit on a per-owner basis. Steady EPS growth is one of the strongest drivers of long-term stock returns, because rising earnings per share tend to pull the price up with them. A company that grows EPS from $1 to $2 to $3 over three years is compounding real value for shareholders in a way a flat or erratic EPS never does.",
          "But EPS can be quietly engineered, so smart investors stay alert. A company can boost EPS not by earning more, but by buying back its own shares - fewer slices means a bigger piece for each, even if total profit is flat. That's not necessarily bad, but it's different from genuine growth. Likewise, one-time events like selling a building can spike EPS for a single quarter, then vanish. Reading EPS well means asking whether the growth comes from a truly expanding business or from financial maneuvers that don't repeat.",
          "EPS also has to be paired with other numbers to mean much. On its own, an EPS of $5 tells you nothing about whether a stock is expensive - you need the price too, which is why P/E combines them. And EPS says nothing about cash, debt, or the quality of earnings. A company can post rising EPS while burning cash or piling on debt. The lesson is that EPS is a vital, central metric, but it's one instrument in a cockpit of gauges, most powerful when read alongside cash flow, debt, and valuation."
        ],
        bullets: [
          "The trend in EPS matters far more than any single figure.",
          "Steadily rising EPS is a strong driver of long-term stock returns.",
          "Buybacks can lift EPS without any real growth in total profit.",
          "One-time events can distort EPS for a single quarter.",
          "EPS must be paired with price, cash flow, and debt to be meaningful."
        ],
        realWorldExample: "A firm's EPS jumps from $3 to $4, exciting investors. But total profit was flat - the company simply bought back a fifth of its shares. Real earnings didn't grow at all; the bigger per-share slice came purely from shrinking the number of slices."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ratios2-mc1",
            question: "How is EPS calculated?",
            options: [
              "Total revenue divided by the total debt",
              "Net income divided by shares outstanding",
              "Current share price divided by the dividends",
              "Total assets divided by shareholder equity"
            ],
            correctAnswer: 1,
            explanation: "EPS equals net income divided by the number of shares outstanding. It shows how much profit is attributable to each single share of the company."
          },
          {
            id: "ratios2-mc2",
            question: "How can EPS rise even when total profit stays flat?",
            options: [
              "By steeply raising all its product prices",
              "By buying back its own shares",
              "By hiring many more new employees",
              "By paying out a much larger dividend"
            ],
            correctAnswer: 1,
            explanation: "Buying back shares reduces the share count, so the same total profit is split among fewer slices, lifting EPS without any real growth in profit."
          }
        ]
      },
      {
        type: "scenario",
        title: "Noah Investigates a Rising EPS",
        narrative: "Noah is excited that a company's EPS climbed from $2 to $2.60 in a year. Before buying, he checks whether the jump came from a genuinely growing business or from something less impressive lurking beneath the headline number.",
        details: [
          "Total net income was nearly flat, rising only from $200M to $205M over the year.",
          "The company repurchased 15% of its shares, cutting the share count sharply.",
          "Fewer shares meant the roughly-flat profit was divided among far fewer slices.",
          "Cash reserves fell noticeably because the buyback was funded by spending down cash."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ratios2-aq1",
          question: "What should Noah conclude about the EPS increase?",
          options: [
            "The core underlying business grew very rapidly",
            "It came mainly from share buybacks",
            "Total company profit more than fully doubled",
            "The company issued many new shares"
          ],
          correctAnswer: 1,
          explanation: "Net income was nearly flat while the share count fell 15%. The EPS rise came from buybacks shrinking the slices, not from real growth in the business."
        }
      },
      {
        type: "recap",
        takeaways: [
          "EPS is net income divided by shares outstanding.",
          "It shows the profit belonging to each single share.",
          "The trend in EPS matters more than any one number.",
          "Buybacks and one-time events can distort EPS.",
          "Diluted EPS counts potential shares and is more conservative."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ratios2-mastery1",
            question: "A firm earns $20M with 10M shares. Its EPS is…",
            options: [
              "$200M when multiplied",
              "$2 per share",
              "$10 matching shares",
              "$30M when added"
            ],
            correctAnswer: 1,
            explanation: "EPS is net income divided by shares: $20M divided by 10M shares equals $2 per share of profit."
          },
          {
            id: "ratios2-mastery2",
            question: "Why do analysts obsess over quarterly EPS?",
            options: [
              "It sets the company's tax rate",
              "Markets react to beats and misses",
              "It directly replaces the whole balance sheet",
              "It always equals the firm's total revenue"
            ],
            correctAnswer: 1,
            explanation: "Analysts forecast EPS, and stocks move sharply when reported EPS beats or misses those expectations. It's a central number in each earnings report."
          },
          {
            id: "ratios2-mastery3",
            question: "How does diluted EPS differ from basic EPS?",
            options: [
              "It ignores net income entirely",
              "It counts potential future shares",
              "It uses revenue instead of profit",
              "It always exceeds basic EPS"
            ],
            correctAnswer: 1,
            explanation: "Diluted EPS includes shares that could be created from options and convertibles. Assuming more slices, it's usually slightly lower and more conservative."
          },
          {
            id: "ratios2-mastery4",
            question: "Total profit rises but EPS falls. The likely cause is…",
            options: [
              "The firm repaid all its debt",
              "It issued many new shares",
              "It cut its dividend to zero",
              "Its revenue dropped sharply"
            ],
            correctAnswer: 1,
            explanation: "Issuing new shares splits the profit among more slices. Even with higher total profit, each share can earn less, pulling EPS down."
          },
          {
            id: "ratios2-mastery5",
            question: "Which metric directly uses EPS in its formula?",
            options: [
              "The debt-to-equity ratio",
              "The P/E ratio",
              "Operating cash flow",
              "Gross profit margin"
            ],
            correctAnswer: 1,
            explanation: "The P/E ratio divides share price by EPS. EPS is the engine behind it, translating price into a multiple of per-share earnings."
          },
          {
            id: "ratios2-mastery6",
            question: "Why shouldn't EPS be judged completely on its own?",
            options: [
              "It is illegal to report EPS alone",
              "It ignores price, cash, and debt",
              "It only applies to private firms",
              "It changes every single day"
            ],
            correctAnswer: 1,
            explanation: "EPS says nothing about whether a stock is cheap, how much cash it holds, or its debt. It's most useful paired with price, cash flow, and other gauges."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // ratios-3: Debt-to-Equity
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "ratios-3",
    sections: [
      {
        type: "concept",
        title: "Measuring How Much a Company Leans on Debt",
        paragraphs: [
          "The debt-to-equity ratio compares how much of a company is funded by borrowing versus how much is funded by its owners. You calculate it by dividing total liabilities by total equity. If a firm has $6 million in debt and $3 million in equity, its debt-to-equity ratio is 2.0 - it owes two dollars for every dollar the owners have put in. This single number captures a company's financial structure: is it built mostly on borrowed money, or does it stand largely on its own funds? That balance shapes how risky the company is.",
          "The ratio matters because debt is a double-edged sword. Borrowing lets a company do more than its own money alone would allow - build factories, expand faster, chase bigger opportunities. When times are good, that leverage amplifies returns for shareholders. But debt comes with fixed obligations: interest must be paid and loans repaid, boom or bust. A company with a high debt-to-equity ratio has less cushion when trouble hits. A bad year that a low-debt firm shrugs off can push a heavily indebted one toward crisis, because the bills don't stop.",
          "What counts as 'high' depends heavily on the industry. A ratio of 1.0 means debt equals equity - a rough middle ground. Below 1.0 leans conservative; above 2.0 starts to look aggressive for most businesses. But capital-heavy industries like utilities and airlines naturally carry more debt because they buy hugely expensive equipment with predictable cash to service the loans. A software company, by contrast, might carry almost none. So the ratio must always be judged against peers - a number that's alarming for a tech firm can be perfectly normal for a utility."
        ],
        bullets: [
          "Debt-to-equity = total liabilities divided by total equity.",
          "It shows how much a company relies on borrowing versus owners' money.",
          "Debt amplifies returns in good times but adds fixed obligations always.",
          "A high ratio means less cushion when business turns difficult.",
          "What counts as high depends on the industry and must be judged against peers."
        ],
        realWorldExample: "A retailer has $4M in debt and $8M in equity, a ratio of 0.5 - conservative. A rival has $12M in debt and $4M in equity, a ratio of 3.0. In a good year both thrive, but in a downturn the second firm's heavy interest payments could threaten its survival."
      },
      {
        type: "concept",
        title: "The Balance Between Risk and Opportunity",
        paragraphs: [
          "Leverage is why debt is so tempting and so dangerous. Imagine a company earns a 15% return on projects but borrows at 6% interest. Every borrowed dollar earns a 9% spread that flows to shareholders, magnifying their returns. This is the upside of a higher debt-to-equity ratio: used well, borrowed money can dramatically boost the profit owners keep. Many successful companies deliberately carry debt precisely because it makes their equity work harder, turning good businesses into great returns for the people who own them.",
          "The danger is that leverage cuts both ways with equal force. If those same projects suddenly return only 3% while the debt still costs 6%, every borrowed dollar now loses money, and the losses fall hardest on shareholders. Worse, the interest is due regardless of how the business performs. A company that borrowed heavily to grow can find itself unable to make payments when revenue dips, forcing asset sales, emergency financing, or even bankruptcy. The higher the debt-to-equity ratio, the thinner the margin for error when conditions turn against the firm.",
          "Reading the ratio wisely means looking beyond the single number. A moderate debt-to-equity ratio paired with strong, steady cash flow is far safer than a low ratio at a company with erratic earnings, because what really matters is the ability to service the debt. Investors also watch the trend: a ratio creeping upward year after year can signal a company leaning ever harder on borrowing, while a falling ratio suggests it's strengthening its foundation. Context, cash flow, and direction together tell you whether a given level of debt is prudent or reckless."
        ],
        bullets: [
          "Borrowing at low rates to earn higher returns magnifies shareholder profits.",
          "Leverage cuts both ways - losses are amplified just as gains are.",
          "Interest is owed no matter how the business actually performs.",
          "A moderate ratio with steady cash flow beats low debt with erratic earnings.",
          "Watch the trend: a rising ratio signals growing reliance on borrowing."
        ],
        realWorldExample: "A firm borrows $10M at 5% to fund projects earning 12%. Shareholders pocket the 7% spread, boosting returns. But when a recession drops project returns to 2%, that same debt now drains money, and the fixed 5% interest still must be paid every month regardless."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ratios3-mc1",
            question: "How is the debt-to-equity ratio calculated?",
            options: [
              "Total equity divided by the total revenue",
              "Total liabilities divided by total equity",
              "Total debt divided by the yearly profit",
              "Total assets divided by the total debt"
            ],
            correctAnswer: 1,
            explanation: "Debt-to-equity is total liabilities divided by total equity. It shows how many dollars of debt back each dollar of owners' money in the company."
          },
          {
            id: "ratios3-mc2",
            question: "Why is a high debt-to-equity ratio riskier?",
            options: [
              "It permanently removes all of the future profits earned",
              "Fixed interest is owed even in bad times",
              "It directly lowers the company's total reported revenue",
              "It completely prevents ever issuing any new shares"
            ],
            correctAnswer: 1,
            explanation: "Debt carries fixed obligations - interest and repayment - that continue regardless of performance. High debt leaves less cushion when business turns difficult."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sophia Compares Two Airlines' Balance Sheets",
        narrative: "Sophia is evaluating two airlines. Both are profitable now, but she knows airlines carry heavy debt to buy planes, so she studies each one's debt-to-equity ratio and cash flow to judge which could survive a rough patch.",
        details: [
          "SkyJet has $8B in liabilities and $4B in equity, giving a debt-to-equity ratio of 2.0.",
          "AirNova has $15B in liabilities and $3B in equity, giving a ratio of 5.0.",
          "SkyJet's steady cash flow comfortably covers its interest payments each quarter.",
          "AirNova's earnings are erratic, and a single bad quarter could strain its ability to pay interest."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ratios3-aq1",
          question: "Why does Sophia see AirNova as the riskier airline?",
          options: [
            "It carries no long-term debt whatsoever on its books",
            "High debt plus erratic cash to cover it",
            "It has far too much shareholder equity built up",
            "Its planes and jets are worth almost nothing"
          ],
          correctAnswer: 1,
          explanation: "AirNova's 5.0 ratio piles on debt while its erratic earnings may not reliably cover interest. High leverage with shaky cash flow is a dangerous combination."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Debt-to-equity is total liabilities divided by total equity.",
          "It measures how much a company leans on borrowing versus owners' funds.",
          "Leverage magnifies both gains and losses for shareholders.",
          "Interest obligations continue regardless of how the business performs.",
          "Judge the ratio against the industry and alongside cash flow and its trend."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ratios3-mastery1",
            question: "A firm has $9M debt and $3M equity. Its debt-to-equity is…",
            options: [
              "12 when added",
              "3.0 when divided",
              "0.33 the other way",
              "6 as the difference"
            ],
            correctAnswer: 1,
            explanation: "Debt-to-equity is liabilities divided by equity: $9M divided by $3M equals 3.0. The firm owes three dollars for every dollar of owners' money."
          },
          {
            id: "ratios3-mastery2",
            question: "How does leverage affect shareholder returns in good times?",
            options: [
              "It always reduces returns",
              "It magnifies the returns",
              "It has no effect at all",
              "It converts them to debt"
            ],
            correctAnswer: 1,
            explanation: "When projects earn more than the interest cost, the spread flows to shareholders, magnifying their returns. That's the upside of using leverage well."
          },
          {
            id: "ratios3-mastery3",
            question: "Why do utilities often carry high debt-to-equity ratios?",
            options: [
              "They earn absolutely no profit at all ever",
              "They fund costly assets with steady cash",
              "They are always legally forced to borrow money",
              "They simply never repay any of their loans"
            ],
            correctAnswer: 1,
            explanation: "Utilities buy hugely expensive equipment and have predictable cash to service loans, so higher debt is normal for them - a level that would alarm a tech firm."
          },
          {
            id: "ratios3-mastery4",
            question: "A ratio of 1.0 means that debt is…",
            options: [
              "Ten times the equity",
              "Equal to the equity",
              "Zero for the firm",
              "Half of the equity"
            ],
            correctAnswer: 1,
            explanation: "A debt-to-equity ratio of 1.0 means liabilities equal equity - a rough middle ground between conservative and aggressive financing."
          },
          {
            id: "ratios3-mastery5",
            question: "Which combination is generally safest?",
            options: [
              "High debt paired with erratic earnings",
              "Moderate debt with steady cash flow",
              "Extreme debt with no cash flow",
              "Rising debt alongside steadily falling profits"
            ],
            correctAnswer: 1,
            explanation: "What matters is the ability to service debt. Moderate debt backed by steady cash flow is safer than even low debt at a firm with unreliable earnings."
          },
          {
            id: "ratios3-mastery6",
            question: "A company's debt-to-equity climbs steadily each year. This signals…",
            options: [
              "A shrinking reliance on debt",
              "Growing reliance on borrowing",
              "That equity is rising fast",
              "That it has become debt-free"
            ],
            correctAnswer: 1,
            explanation: "A rising ratio year after year means debt is growing relative to equity - the company is leaning ever harder on borrowed money to operate."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // ratios-4: Profit Margin
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "ratios-4",
    sections: [
      {
        type: "concept",
        title: "How Much of Each Sales Dollar Becomes Profit",
        paragraphs: [
          "Profit margin measures what fraction of a company's revenue survives as profit after costs. It's expressed as a percentage: divide profit by revenue and multiply by 100. If a company makes $1 million in revenue and keeps $150,000 in profit, its margin is 15% - meaning 15 cents of every sales dollar becomes profit while 85 cents goes to costs. This turns raw dollar figures into a measure of efficiency, letting you compare a corner store to a global giant. It answers the crucial question: how good is this business at converting sales into actual profit?",
          "Margin matters because revenue size can be deeply misleading. A company selling $10 billion of goods sounds impressive, but if its margin is just 1%, it keeps only $100 million - while a smaller firm selling $2 billion at a 20% margin keeps $400 million. The efficient business earns far more profit from far less revenue. Margin reveals the quality of a business model: high-margin companies have pricing power, strong brands, or cost advantages, while razor-thin margins mean the business must move enormous volume just to earn a modest profit.",
          "There are three common margins, each measured at a different point in the income statement's waterfall. Gross margin is profit after the direct cost of goods, showing how much cushion the core product provides. Operating margin is profit after running costs like salaries and rent, revealing everyday operational efficiency. Net margin is the final bottom line after everything - interest, taxes, all of it - showing the true profit kept. Reading all three together tells you where a company makes or loses its money along the way from sale to final profit."
        ],
        bullets: [
          "Profit margin = profit divided by revenue, shown as a percentage.",
          "It shows how many cents of each sales dollar become profit.",
          "Big revenue with a thin margin can earn less than small revenue with a fat margin.",
          "High margins signal pricing power, strong brands, or cost advantages.",
          "Gross, operating, and net margins measure profit at different stages."
        ],
        realWorldExample: "A grocery chain runs on a 2% net margin - it must sell $50 of goods to keep $1. A luxury brand runs a 25% margin, keeping $25 from every $100 sold. The luxury brand needs far less revenue to earn the same profit, revealing a stronger business model."
      },
      {
        type: "concept",
        title: "What Margins Reveal About a Business",
        paragraphs: [
          "Different industries have wildly different normal margins, so comparisons only make sense among peers. Software companies often boast net margins above 20% because copying code costs almost nothing once it's built - each extra sale is nearly pure profit. Grocery stores and airlines, by contrast, operate on margins of just 1% to 3%, surviving on massive volume and relentless cost control. Judging a supermarket by a software company's margin would be meaningless. The right question is always how a firm's margin compares to its direct competitors and its own past.",
          "The trend in margins carries a powerful signal. A margin that's steadily expanding suggests a company is gaining pricing power, cutting costs, or benefiting from scale - it's becoming more efficient at turning sales into profit. A shrinking margin warns of rising competition, cost pressures, or fading pricing power, even if revenue is still growing. Investors often care more about the direction of the margin than its exact level, because an improving margin can lift profits far faster than revenue growth alone, while a declining one can quietly erode a seemingly healthy company.",
          "Margins also expose the difference between growth that's healthy and growth that's hollow. A company can grow revenue rapidly by slashing prices, but if that crushes its margin, it may be buying sales it can't profit from. The strongest businesses grow revenue while holding or expanding margins, proving the growth is genuinely profitable. When you see soaring sales paired with collapsing margins, it's a signal to look closer - the company might be chasing market share at the expense of the very profits that make growth worthwhile in the first place."
        ],
        bullets: [
          "Normal margins vary hugely by industry, so compare only among peers.",
          "Software margins can top 20%; groceries and airlines run near 1-3%.",
          "An expanding margin signals pricing power, cost cuts, or scale.",
          "A shrinking margin warns of competition or fading pricing power.",
          "Revenue growth with collapsing margins may be hollow, unprofitable growth."
        ],
        realWorldExample: "A retailer doubles its revenue by deeply discounting, but its net margin falls from 8% to 2%. Sales look great in headlines, yet total profit barely moves - the collapsing margin reveals the growth was bought by giving away most of the profit."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ratios4-mc1",
            question: "How is profit margin calculated?",
            options: [
              "Total revenue divided by the company's total profit",
              "Profit divided by revenue, as a percent",
              "Total costs divided by the outstanding share count",
              "Total profit multiplied by the total revenue"
            ],
            correctAnswer: 1,
            explanation: "Profit margin is profit divided by revenue, expressed as a percentage. It shows how many cents of each sales dollar the company keeps as profit."
          },
          {
            id: "ratios4-mc2",
            question: "Why can a firm with huge revenue still earn little profit?",
            options: [
              "Reported revenue is never really actual money",
              "Its profit margin may be very thin",
              "Large revenue figures are always completely fake",
              "Margins only apply to very small firms"
            ],
            correctAnswer: 1,
            explanation: "A thin margin means little of each sales dollar survives as profit. A giant selling billions at a 1% margin can keep less than a smaller firm at a fat margin."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Compares Two Retailers' Efficiency",
        narrative: "Marcus is comparing two retailers with very different revenue. Rather than being dazzled by the bigger sales number, he calculates each one's net margin to see which business is actually better at turning sales into profit.",
        details: [
          "MegaMart posts $10B in revenue but a net margin of only 2%, keeping $200M in profit.",
          "FineGoods posts $2B in revenue with a net margin of 15%, keeping $300M in profit.",
          "Despite one-fifth the revenue, FineGoods earns $100M more in actual profit.",
          "FineGoods' higher margin points to stronger pricing power and a more efficient model."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ratios4-aq1",
          question: "What does the margin comparison reveal about the two retailers?",
          options: [
            "MegaMart is clearly the more profitable one",
            "FineGoods converts sales to profit better",
            "Revenue size all alone fully decides profit",
            "Both keep the same profit exactly"
          ],
          correctAnswer: 1,
          explanation: "FineGoods earns more profit on far less revenue thanks to its 15% margin. Higher margin means it turns each sales dollar into profit far more efficiently."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Profit margin is profit divided by revenue, shown as a percentage.",
          "It measures how efficiently sales become profit.",
          "Gross, operating, and net margins measure profit at different stages.",
          "Normal margins vary by industry, so compare only among peers.",
          "Expanding margins signal strength; shrinking ones warn of pressure."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ratios4-mastery1",
            question: "A firm earns $80,000 profit on $400,000 revenue. Its margin is…",
            options: [
              "5% of revenue",
              "20% of revenue",
              "50% of revenue",
              "80% of revenue"
            ],
            correctAnswer: 1,
            explanation: "Margin is profit divided by revenue: $80,000 divided by $400,000 is 0.20, or 20%. Twenty cents of each sales dollar becomes profit."
          },
          {
            id: "ratios4-mastery2",
            question: "Which margin is measured after all costs, interest, and taxes?",
            options: [
              "Gross margin",
              "Net margin",
              "Operating margin",
              "Volume margin"
            ],
            correctAnswer: 1,
            explanation: "Net margin is the final bottom line, measured after every cost including interest and taxes. It shows the true profit the company ultimately keeps."
          },
          {
            id: "ratios4-mastery3",
            question: "Why do software firms often have very high margins?",
            options: [
              "They sell at very low prices",
              "Copying software costs almost nothing",
              "They avoid paying any taxes",
              "They carry enormous debt loads"
            ],
            correctAnswer: 1,
            explanation: "Once software is built, each extra copy costs almost nothing, so nearly all of each new sale is profit. That drives the high margins common in software."
          },
          {
            id: "ratios4-mastery4",
            question: "A steadily expanding profit margin usually signals…",
            options: [
              "The firm is losing pricing power",
              "Growing efficiency or pricing power",
              "Revenue is collapsing fast",
              "The company will soon fail"
            ],
            correctAnswer: 1,
            explanation: "A rising margin means the firm keeps more of each sales dollar, pointing to stronger pricing power, cost cuts, or scale - it's becoming more efficient."
          },
          {
            id: "ratios4-mastery5",
            question: "Why must margins be compared within the same industry?",
            options: [
              "Margins are secret across sectors",
              "Normal margins differ by industry",
              "All industries share one margin",
              "Only the banks report margins"
            ],
            correctAnswer: 1,
            explanation: "Groceries run on thin margins while software runs on fat ones. Judging a supermarket by a software firm's margin would be meaningless without peer context."
          },
          {
            id: "ratios4-mastery6",
            question: "Revenue is soaring but the margin is collapsing. This may mean…",
            options: [
              "The rapid growth is extremely highly profitable",
              "Growth is bought by cutting prices",
              "The firm has no real competitors left",
              "Costs have completely disappeared entirely now"
            ],
            correctAnswer: 1,
            explanation: "Rising sales with a falling margin often means the company is discounting heavily to chase volume, buying growth that adds little real profit - hollow growth."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // ratios-5: ROE
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "ratios-5",
    sections: [
      {
        type: "concept",
        title: "How Well a Company Uses Owners' Money",
        paragraphs: [
          "Return on equity, or ROE, measures how much profit a company generates for every dollar of shareholders' equity. You calculate it by dividing net income by shareholders' equity, shown as a percentage. If a company earns $2 million in profit on $10 million of equity, its ROE is 20% - meaning it produced 20 cents of profit for each dollar the owners have invested in it. ROE is essentially a report card on management: given the money entrusted to them by shareholders, how effectively are they turning it into profit?",
          "This matters because equity is the owners' money, and investors want it working hard. Two companies might each earn $2 million in profit, but if one did it using $10 million of equity and the other needed $40 million, the first is far more efficient - a 20% ROE versus 5%. It squeezes four times the profit from each dollar of ownership. Over time, a high ROE compounds powerfully: a company that reinvests profits at a 20% return grows shareholders' wealth dramatically faster than one earning a mediocre return on the same capital.",
          "ROE is one of the metrics legendary investors watch most closely, because a consistently high ROE often marks a genuinely excellent business. Companies that sustain high returns on equity year after year usually have a durable advantage - a strong brand, a cost edge, or a product customers can't easily replace - that lets them keep earning outsized profits on their capital. A steady 18% ROE across a decade tells a story that a single year never could: this is a business that reliably turns owners' money into more money."
        ],
        bullets: [
          "ROE = net income divided by shareholders' equity, as a percentage.",
          "It measures profit generated per dollar of owners' money.",
          "Equal profits with less equity means a higher, more efficient ROE.",
          "High ROE compounds wealth powerfully when profits are reinvested.",
          "A consistently high ROE often marks a durable competitive advantage."
        ],
        realWorldExample: "Two firms each earn $5M profit. Firm A used $25M of equity (20% ROE); Firm B used $100M (5% ROE). Firm A generates four times the profit per dollar of owners' money - a far more efficient business that will compound shareholder wealth much faster."
      },
      {
        type: "concept",
        title: "The Hidden Role of Debt in ROE",
        paragraphs: [
          "ROE has a subtle trap: debt can inflate it artificially. Because equity is the denominator, a company that funds itself with lots of borrowed money has a smaller equity base, which can push ROE higher even without any real improvement in the business. Two firms earning the same profit will show very different ROEs if one carries heavy debt and the other doesn't. So a sky-high ROE isn't automatically impressive - it might reflect genuine excellence, or it might reflect aggressive borrowing that also loads the company with risk. Always check the debt alongside the ROE.",
          "This is why savvy investors pair ROE with the debt-to-equity ratio. An ROE of 25% built on little debt is a mark of a truly outstanding business, while the same 25% built on a mountain of borrowing is far less admirable and far more fragile. The best companies earn high returns on equity without leaning heavily on leverage, proving the strength comes from the business itself rather than financial engineering. Reading the two ratios together separates genuine quality from a number that's been quietly juiced by debt.",
          "ROE also has to be judged over time and against peers. A single strong year can come from a one-time gain, so investors look for consistency across many years - that's what distinguishes a lucky quarter from a great business. And like other ratios, normal ROE varies by industry, so comparisons work best among direct competitors. When a company sustains a high ROE with modest debt across many years and beats its peers, that combination is one of the most reliable signals of a well-run, durable business worth owning for the long haul."
        ],
        bullets: [
          "Debt shrinks the equity base, which can inflate ROE artificially.",
          "A high ROE built on heavy borrowing is riskier than it looks.",
          "Pair ROE with debt-to-equity to see if the strength is real.",
          "The best firms earn high ROE without leaning on heavy leverage.",
          "Judge ROE for consistency over years and against industry peers."
        ],
        realWorldExample: "Two firms both post a 25% ROE. One carries almost no debt; the other borrowed heavily, shrinking its equity to lift the ratio. The low-debt firm's ROE reflects a genuinely strong business, while the other's is partly financial engineering masking real risk."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ratios5-mc1",
            question: "How is return on equity calculated?",
            options: [
              "Total revenue divided by the total debt",
              "Net income divided by shareholders' equity",
              "Equity divided by the share price",
              "Total profit divided by the total assets"
            ],
            correctAnswer: 1,
            explanation: "ROE is net income divided by shareholders' equity, shown as a percentage. It measures how much profit the company earns per dollar of owners' money."
          },
          {
            id: "ratios5-mc2",
            question: "Why can heavy debt inflate a company's ROE?",
            options: [
              "Borrowed debt directly adds straight to net income",
              "It shrinks the equity in the denominator",
              "Debt is somehow counted as pure profit",
              "It raises the company's total reported revenue"
            ],
            correctAnswer: 1,
            explanation: "Since equity is the denominator, funding with debt keeps equity small, which can push ROE higher without any real improvement in the underlying business."
          }
        ]
      },
      {
        type: "scenario",
        title: "Elena Digs Beneath Two High ROEs",
        narrative: "Elena finds two companies both boasting a 24% ROE. Impressed but cautious, she checks each one's debt before concluding which truly runs an excellent business rather than just a leveraged one.",
        details: [
          "BrightCo earns 24% ROE with a debt-to-equity ratio of just 0.3 - very little borrowing.",
          "LeverInc earns the same 24% ROE but with a debt-to-equity ratio of 4.0 - heavy borrowing.",
          "LeverInc's small equity base, shrunk by debt, is what lifts its ROE so high.",
          "BrightCo's return comes from the business itself, giving it far more resilience in a downturn."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ratios5-aq1",
          question: "Why does Elena judge BrightCo the stronger business?",
          options: [
            "It simply reports a much higher revenue",
            "Its high ROE comes with little debt",
            "It has a far larger equity base",
            "It pays no taxes on its profit"
          ],
          correctAnswer: 1,
          explanation: "Both show 24% ROE, but BrightCo achieves it with minimal debt, so the return reflects genuine business strength rather than leverage juicing the number."
        }
      },
      {
        type: "recap",
        takeaways: [
          "ROE is net income divided by shareholders' equity.",
          "It measures how much profit is earned per dollar of owners' money.",
          "High, consistent ROE often signals a durable competitive advantage.",
          "Heavy debt can inflate ROE by shrinking the equity base.",
          "Pair ROE with debt-to-equity and judge it over years and versus peers."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ratios5-mastery1",
            question: "A firm earns $3M profit on $15M equity. Its ROE is…",
            options: [
              "45% when multiplied",
              "20% when divided",
              "5% the other way",
              "12% as a guess"
            ],
            correctAnswer: 1,
            explanation: "ROE is net income divided by equity: $3M divided by $15M equals 0.20, or 20%. The firm earns 20 cents of profit per dollar of owners' money."
          },
          {
            id: "ratios5-mastery2",
            question: "Two firms earn equal profit, but one used less equity. That firm has…",
            options: [
              "A much lower ROE overall",
              "A higher, more efficient ROE",
              "Exactly the same ROE as before",
              "No clearly measurable ROE at all"
            ],
            correctAnswer: 1,
            explanation: "Less equity for the same profit means a higher ROE. That firm squeezes more profit from each dollar of ownership, making it more efficient."
          },
          {
            id: "ratios5-mastery3",
            question: "A consistently high ROE over many years often indicates…",
            options: [
              "A soon-to-fail business",
              "A durable competitive advantage",
              "That the firm has no profit",
              "A pure accounting error"
            ],
            correctAnswer: 1,
            explanation: "Sustaining high returns on equity year after year usually reflects a durable edge - a brand, cost advantage, or product customers can't easily replace."
          },
          {
            id: "ratios5-mastery4",
            question: "Why pair ROE with the debt-to-equity ratio?",
            options: [
              "To carefully calculate the yearly corporate tax rate",
              "To see if debt inflated the ROE",
              "To quickly find the firm's total revenue",
              "To completely replace the whole income statement"
            ],
            correctAnswer: 1,
            explanation: "Heavy debt can juice ROE by shrinking equity. Checking debt-to-equity reveals whether a high ROE is genuine strength or the result of leverage."
          },
          {
            id: "ratios5-mastery5",
            question: "The best businesses tend to earn high ROE while…",
            options: [
              "Borrowing extremely heavily",
              "Using little debt",
              "Reporting zero profit",
              "Avoiding all reinvestment"
            ],
            correctAnswer: 1,
            explanation: "Top companies earn strong returns on equity without leaning on leverage, proving the strength comes from the business itself, not financial engineering."
          },
          {
            id: "ratios5-mastery6",
            question: "Why look at ROE across many years rather than one?",
            options: [
              "ROE is somehow illegal to report on a yearly basis",
              "A single year can be a one-time gain",
              "One single year always equals a full ten years",
              "ROE simply never changes at all over time"
            ],
            correctAnswer: 1,
            explanation: "A single strong year might stem from a one-time event. Consistency across years distinguishes a genuinely great business from a lucky quarter."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // ratios-6: Price-to-Sales
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "ratios-6",
    sections: [
      {
        type: "concept",
        title: "Valuing a Company by Its Revenue",
        paragraphs: [
          "The price-to-sales ratio, or P/S, compares a company's total market value to its total revenue. You calculate it by dividing the market capitalization (share price times number of shares) by annual revenue, or equivalently by dividing share price by sales per share. If a company is worth $2 billion and sells $1 billion of goods a year, its P/S is 2.0 - investors pay two dollars for every dollar of the company's sales. It's a cousin of the P/E ratio, but it looks at the very top line, revenue, instead of the bottom line, profit.",
          "The great advantage of P/S is that it works even when P/E doesn't. A company with no profit - or one temporarily losing money - has no meaningful P/E, because you can't divide by a loss. But it still has revenue, so P/S can value it. This makes P/S especially useful for young, fast-growing companies that are pouring everything into growth and haven't turned a profit yet. Many promising startups and tech firms are best judged early on by their revenue and how the market prices it, since earnings are still a work in progress.",
          "Revenue is also harder to manipulate than profit, which gives P/S a certain honesty. Profit can be shaped by accounting choices about costs, depreciation, and timing, but revenue - money coming in from real sales - is more concrete and stable. A company's sales don't swing wildly from accounting decisions the way net income can. So when earnings are erratic or distorted by one-time events, the P/S ratio offers a steadier lens on how the market values the fundamental business activity of actually selling products or services."
        ],
        bullets: [
          "P/S = market capitalization divided by annual revenue.",
          "It shows how much investors pay per dollar of the company's sales.",
          "P/S works even for firms with no profit, where P/E fails.",
          "It's especially useful for young, fast-growing, not-yet-profitable firms.",
          "Revenue is harder to manipulate than profit, giving P/S a steadier lens."
        ],
        realWorldExample: "A startup loses money as it scales, so it has no P/E at all. But it sells $500M a year and is valued at $2.5B, giving a P/S of 5.0. Investors use that ratio to judge whether the market's price is reasonable for its sales while profits are still years away."
      },
      {
        type: "concept",
        title: "The Limits of Ignoring Profit",
        paragraphs: [
          "P/S has a serious blind spot: it completely ignores whether a company actually makes money. Two firms can have the same P/S ratio while one earns fat profits and the other bleeds cash on every sale. Revenue alone says nothing about whether those sales are profitable. A grocery chain with razor-thin margins and a luxury brand with rich margins might both trade at a P/S of 1.0, yet they are utterly different investments. This is why P/S should never be used alone - it must be read alongside margins to know if the sales are worth anything.",
          "Because margins vary so much across industries, comparing P/S ratios only makes sense among similar businesses. A software company that keeps 25 cents of profit per sales dollar deserves a much higher P/S than a supermarket that keeps 2 cents, because each dollar of the software firm's revenue is worth far more. Judging them by the same P/S standard would badly mislead you. The rule mirrors other ratios: compare a company's P/S to direct competitors and its own history, never to firms in a completely different business.",
          "P/S shines brightest in specific situations rather than as an everyday tool. It's most valuable for evaluating early-stage growth companies, cyclical firms whose profits temporarily vanish in a downturn, or businesses restructuring their way back to profitability. In these cases, a distorted or missing P/E makes P/S a lifeline. But for a mature, steadily profitable company, profit-based measures like P/E and free cash flow usually tell a richer story. The skilled investor reaches for P/S when profit is unreliable and sets it aside when profit is the clearer guide."
        ],
        bullets: [
          "P/S ignores whether the company's sales are actually profitable.",
          "Two firms with the same P/S can have wildly different margins.",
          "Compare P/S only among businesses with similar margins.",
          "High-margin firms deserve a higher P/S than low-margin ones.",
          "P/S is best for early-stage, cyclical, or turnaround companies."
        ],
        realWorldExample: "A luxury brand and a discount retailer both trade at a P/S of 1.5. But the luxury brand keeps 20 cents of profit per sales dollar while the retailer keeps 2 cents. Same P/S, very different value - proof the ratio means little without checking the margins behind it."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ratios6-mc1",
            question: "How is the price-to-sales ratio calculated?",
            options: [
              "Total profit divided by the total revenue",
              "Market cap divided by annual revenue",
              "Total revenue divided by the net income",
              "Current share price divided by the earnings"
            ],
            correctAnswer: 1,
            explanation: "P/S is market capitalization divided by annual revenue. It shows how many dollars investors pay for each dollar of the company's sales."
          },
          {
            id: "ratios6-mc2",
            question: "Why is P/S useful when P/E is not?",
            options: [
              "The P/S ratio completely ignores the current share price entirely",
              "It works even for firms with zero profit reported",
              "P/S counts only the projected estimated future sales figures",
              "It requires absolutely no revenue at all from anywhere"
            ],
            correctAnswer: 1,
            explanation: "P/E needs positive earnings to divide by. A firm with no profit still has revenue, so P/S can value it where P/E breaks down entirely."
          }
        ]
      },
      {
        type: "scenario",
        title: "Kai Values a Money-Losing Startup",
        narrative: "Kai wants to value a fast-growing startup, but it isn't profitable yet, so its P/E doesn't exist. He turns to the price-to-sales ratio and compares it carefully against a profitable rival in the same industry.",
        details: [
          "The startup has no earnings, so P/E is meaningless, but it sells $400M a year.",
          "It's valued at $2B, giving a price-to-sales ratio of 5.0.",
          "A profitable rival in the same sector trades at a P/S of only 2.0.",
          "Kai checks margins too, knowing P/S alone can't tell if the startup's sales are profitable."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ratios6-aq1",
          question: "Why does Kai also examine the startup's margins?",
          options: [
            "Margins set the company's tax rate",
            "P/S ignores whether sales are profitable",
            "Margins directly replace the reported revenue figure",
            "P/S already includes all profit data"
          ],
          correctAnswer: 1,
          explanation: "P/S values sales but says nothing about whether those sales earn a profit. Checking margins tells Kai if the startup's revenue is actually worth anything."
        }
      },
      {
        type: "recap",
        takeaways: [
          "P/S is market capitalization divided by annual revenue.",
          "It shows how much investors pay per dollar of sales.",
          "P/S works for unprofitable firms where P/E fails.",
          "It ignores profitability, so it must be read with margins.",
          "Compare P/S only among businesses with similar margins."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ratios6-mastery1",
            question: "A firm worth $3B has $1.5B in revenue. Its P/S is…",
            options: [
              "4.5 when multiplied",
              "2.0 when divided",
              "0.5 the other way",
              "3.0 as the value"
            ],
            correctAnswer: 1,
            explanation: "P/S is market cap divided by revenue: $3B divided by $1.5B equals 2.0. Investors pay two dollars for each dollar of the company's sales."
          },
          {
            id: "ratios6-mastery2",
            question: "For which company is P/S most useful?",
            options: [
              "A mature, steadily and reliably profitable firm",
              "A young firm with no profit yet",
              "A large firm that reports no revenue",
              "A stable firm with a steady dividend"
            ],
            correctAnswer: 1,
            explanation: "P/S shines for young, growing firms not yet profitable, where P/E is meaningless. Their revenue still lets the market value them."
          },
          {
            id: "ratios6-mastery3",
            question: "Why is revenue considered steadier than profit?",
            options: [
              "Total revenue is always much larger",
              "It's harder to shape with accounting",
              "Revenue is never taxed at all",
              "It appears only once a decade"
            ],
            correctAnswer: 1,
            explanation: "Profit can be shaped by choices about costs, depreciation, and timing. Revenue from real sales is more concrete and stable, giving P/S a steadier lens."
          },
          {
            id: "ratios6-mastery4",
            question: "The biggest weakness of P/S is that it…",
            options: [
              "Requires enormous yearly reported profits",
              "Ignores whether sales are profitable",
              "Cannot be calculated at all",
              "Only works for old companies"
            ],
            correctAnswer: 1,
            explanation: "P/S values revenue but ignores profitability entirely. Two firms with the same P/S can have wildly different margins, so it must be paired with margins."
          },
          {
            id: "ratios6-mastery5",
            question: "Why compare P/S only among similar businesses?",
            options: [
              "The P/S is kept totally secret across sectors",
              "Margins differ, so fair P/S levels differ",
              "All firms everywhere share one single P/S value",
              "Only technology firms ever report their sales"
            ],
            correctAnswer: 1,
            explanation: "A high-margin software firm deserves a higher P/S than a thin-margin grocer. Since margins vary by industry, P/S comparisons only make sense among peers."
          },
          {
            id: "ratios6-mastery6",
            question: "For a mature, steadily profitable company, investors usually prefer…",
            options: [
              "P/S over every other metric",
              "Profit-based measures like P/E",
              "Ignoring all financial ratios",
              "Revenue counted twice over"
            ],
            correctAnswer: 1,
            explanation: "When profit is reliable, P/E and free cash flow tell a richer story. P/S is a lifeline mainly when earnings are missing, erratic, or distorted."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // ratios-7: Valuation Multiples
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "ratios-7",
    sections: [
      {
        type: "concept",
        title: "Comparing Companies on a Level Field",
        paragraphs: [
          "A valuation multiple is a ratio that relates a company's price to some measure of its business - earnings, sales, book value, or cash flow. The whole point is comparison: multiples strip away differences in size so you can line up companies of any scale side by side. The P/E ratio is the most famous multiple, but there's a whole family: price-to-sales, price-to-book, and enterprise-value-to-EBITDA among them. Each one asks the same core question in a different way - how much are investors paying for a unit of this company's value?",
          "Multiples exist because absolute numbers are useless for comparison. Saying one company is 'worth $50 billion' and another '$5 billion' tells you nothing about which is the better buy - the giant might be cheaper relative to its earnings. Multiples convert size into a standardized rate, like comparing the price per ounce of two differently-sized cereal boxes rather than their total prices. This is exactly how professionals compare a sprawling multinational to a mid-sized rival: not by total value, but by what each dollar of earnings, sales, or assets costs.",
          "The magic of multiples is relative valuation - judging a company against others rather than in isolation. If similar companies in an industry trade at an average P/E of 18, and one solid competitor trades at 12, that gap invites a question: is it a bargain, or is something wrong? Comparing multiples across a peer group reveals which companies the market prices richly and which it prices cheaply. This is often the fastest way to spot a potentially overvalued or undervalued stock, long before doing the deeper work of a full valuation."
        ],
        bullets: [
          "A multiple relates price to earnings, sales, book value, or cash flow.",
          "Multiples strip away size so companies of any scale compare fairly.",
          "The P/E ratio is the most famous of a whole family of multiples.",
          "Absolute values can't be compared; multiples standardize the price.",
          "Relative valuation compares a company's multiple against its peers."
        ],
        realWorldExample: "Two grocers trade at total values of $40B and $8B. Meaningless alone - but their P/E multiples are 22 and 14. The smaller grocer costs far less per dollar of earnings, so despite its lower total value it may actually be the cheaper, better-priced stock."
      },
      {
        type: "concept",
        title: "Choosing and Reading Multiples Wisely",
        paragraphs: [
          "Different multiples suit different situations, and picking the right one is a skill. P/E works well for stable, profitable companies. Price-to-sales fits young or unprofitable firms with no earnings to divide by. Price-to-book, which compares price to equity, is popular for banks and asset-heavy businesses where the balance sheet drives value. EV-to-EBITDA is favored for comparing firms with different debt levels, because it accounts for both equity and debt. Matching the multiple to the type of company is what separates a meaningful comparison from a misleading one.",
          "The golden rule is that multiples must be compared like-for-like. A P/E of 30 is expensive for a slow-growing utility but perfectly reasonable for a fast-growing tech firm, because faster growth justifies a higher multiple. So you compare within the same industry, among companies of similar growth and risk, over similar time frames. Comparing a booming software company's multiple to a mature manufacturer's would mislead you every time. The market rewards growth, safety, and quality with higher multiples, and reading them means understanding why one company earns a premium over another.",
          "Multiples are powerful but never the whole story - they're a starting point, not a verdict. A low multiple can mean a bargain or a dying business; a high one can mean an overpriced stock or a genuinely superior company worth every penny. The number invites investigation rather than settling it. Professionals use multiples to quickly narrow a field of candidates, then dig into the business behind the number - its growth, competitive position, and cash flows. Multiples tell you where to look closely, but the closer look is what ultimately decides whether a company is a good investment."
        ],
        bullets: [
          "Match the multiple to the company: P/E, P/S, P/B, or EV/EBITDA.",
          "Price-to-book suits banks and asset-heavy firms; P/S suits unprofitable ones.",
          "Compare multiples only among similar growth, risk, and industry.",
          "The market awards higher multiples for growth, safety, and quality.",
          "Multiples flag where to look closely but never settle the decision alone."
        ],
        realWorldExample: "An analyst comparing two banks uses price-to-book, since a bank's value rests on its balance sheet. For two software firms with different debt, she switches to EV/EBITDA. Choosing the right multiple for each type makes the comparison fair instead of misleading."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ratios7-mc1",
            question: "What is the main purpose of a valuation multiple?",
            options: [
              "To completely hide a company's true real size",
              "To compare companies of any scale fairly",
              "To calculate the exact yearly tax owed",
              "To fully replace all published financial statements"
            ],
            correctAnswer: 1,
            explanation: "Multiples strip away size differences by relating price to a business measure, letting you compare companies of any scale on a level playing field."
          },
          {
            id: "ratios7-mc2",
            question: "Which multiple best suits an unprofitable young company?",
            options: [
              "Price-to-earnings ratio",
              "Price-to-sales ratio",
              "Return on equity",
              "Debt-to-equity ratio"
            ],
            correctAnswer: 1,
            explanation: "With no earnings, P/E is meaningless. Price-to-sales uses revenue instead, making it the fitting multiple for young, unprofitable firms."
          }
        ]
      },
      {
        type: "scenario",
        title: "Zara Screens an Industry by Multiples",
        narrative: "Zara wants to find undervalued stocks in the beverage industry. Rather than studying each company in isolation, she lines up their valuation multiples against the industry average to spot which ones the market may be mispricing.",
        details: [
          "The beverage industry's average P/E is 20, giving Zara a clear benchmark.",
          "FizzCo trades at a P/E of 13, well below the group, hinting at a possible bargain.",
          "PopBrands trades at a P/E of 32, far above peers, suggesting high growth hopes or overpricing.",
          "Zara treats these gaps as flags to investigate, not final verdicts on either stock."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ratios7-aq1",
          question: "How should Zara treat FizzCo's below-average P/E?",
          options: [
            "As proof it's a guaranteed bargain",
            "As a flag inviting deeper investigation",
            "As a reason to avoid it entirely",
            "As identical to the industry average"
          ],
          correctAnswer: 1,
          explanation: "A low multiple can mean a bargain or a struggling business. It's a signal to look closer at FizzCo's fundamentals, not a final verdict on the stock."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A multiple relates price to earnings, sales, book value, or cash flow.",
          "Multiples let companies of any size be compared fairly.",
          "Different multiples suit different types of companies.",
          "Compare multiples only among similar growth, risk, and industry.",
          "Multiples flag where to investigate but don't settle the decision alone."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ratios7-mastery1",
            question: "Why can't you compare companies by their absolute value?",
            options: [
              "Absolute dollar values are always kept secret",
              "Size alone reveals nothing about price",
              "Bigger firms are always much cheaper",
              "Values change quickly every single second"
            ],
            correctAnswer: 1,
            explanation: "A $50B firm isn't automatically pricier than an $8B one. Multiples standardize price relative to earnings or sales, making fair comparison possible."
          },
          {
            id: "ratios7-mastery2",
            question: "Which multiple is favored for valuing banks?",
            options: [
              "Price-to-earnings",
              "Price-to-book",
              "Price-to-sales",
              "Debt-to-equity"
            ],
            correctAnswer: 1,
            explanation: "Price-to-book compares price to equity, and since a bank's value rests on its balance sheet, it's the popular choice for asset-heavy financial firms."
          },
          {
            id: "ratios7-mastery3",
            question: "Why does a fast-growing firm justify a higher P/E?",
            options: [
              "Fast growth firms report no earnings",
              "Faster growth warrants a higher multiple",
              "High P/E always means low risk",
              "Valuation multiples ignore growth completely entirely"
            ],
            correctAnswer: 1,
            explanation: "The market rewards growth with higher multiples, so a P/E of 30 can be reasonable for a fast grower yet expensive for a slow utility."
          },
          {
            id: "ratios7-mastery4",
            question: "Which multiple helps compare firms with different debt levels?",
            options: [
              "Price-to-earnings",
              "EV-to-EBITDA",
              "Price-to-sales",
              "Return on equity"
            ],
            correctAnswer: 1,
            explanation: "EV-to-EBITDA counts both equity and debt through enterprise value, making it the go-to multiple for comparing firms with differing debt loads."
          },
          {
            id: "ratios7-mastery5",
            question: "A stock trades far below its peers' average multiple. This is…",
            options: [
              "Proof it will surely rise",
              "A flag to investigate further",
              "A guarantee of hidden fraud",
              "Reason to ignore it forever"
            ],
            correctAnswer: 1,
            explanation: "A low multiple may signal a bargain or a troubled business. It invites a closer look at the fundamentals rather than settling the decision by itself."
          },
          {
            id: "ratios7-mastery6",
            question: "The proper way to use a valuation multiple is to…",
            options: [
              "Treat it as the final answer",
              "Compare like-for-like among peers",
              "Compare a bank to a tech firm",
              "Ignore the company's industry"
            ],
            correctAnswer: 1,
            explanation: "Multiples must be compared among companies of similar industry, growth, and risk. Like-for-like comparison is what makes them meaningful rather than misleading."
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // ratios-8: Ratio Interpretation
  // ═══════════════════════════════════════════════════════════════
  {
    lessonId: "ratios-8",
    sections: [
      {
        type: "concept",
        title: "No Single Ratio Tells the Whole Story",
        paragraphs: [
          "Every ratio you've learned - P/E, EPS, debt-to-equity, profit margin, ROE, price-to-sales - captures one angle of a company, but none captures the whole. Relying on a single ratio is like judging a person by their height alone. A low P/E might look cheap until you spot the crushing debt behind it. A high ROE might dazzle until you see it was inflated by borrowing. The real skill of analysis isn't calculating ratios; it's weaving several together into a coherent story about whether a business is healthy, fairly priced, and worth owning.",
          "Ratios fall into groups, and a complete picture needs one from each. Valuation ratios like P/E and P/S ask whether the price is reasonable. Profitability ratios like margin and ROE ask whether the business earns good money on its sales and capital. Solvency ratios like debt-to-equity ask whether the company can survive hard times. A stock might be cheap on valuation but drowning in debt, or wildly profitable but priced far too high. Only by checking each dimension do you avoid being fooled by one flattering number.",
          "The most powerful move is to let ratios cross-check each other. A low P/E paired with a high ROE and low debt is a genuinely attractive combination - cheap, profitable, and safe. But a low P/E paired with falling margins and rising debt is a warning, not a bargain. When ratios agree, your conviction grows; when they conflict, that tension is exactly where the interesting questions live. Learning to read them as a team, not as isolated facts, is what turns a pile of numbers into real understanding of a business."
        ],
        bullets: [
          "No single ratio captures a company's full health or value.",
          "Ratios fall into valuation, profitability, and solvency groups.",
          "A complete analysis draws at least one ratio from each group.",
          "Ratios cross-check each other, confirming or contradicting the story.",
          "Agreeing ratios build conviction; conflicting ones reveal key questions."
        ],
        realWorldExample: "A stock shows a tempting P/E of 8. Alone it screams bargain. But its debt-to-equity is 5.0 and its margin is shrinking fast. Read together, the ratios tell a different story: not a cheap gem, but a struggling, heavily indebted business the market priced low for good reason."
      },
      {
        type: "concept",
        title: "Context, Trends, and Common Traps",
        paragraphs: [
          "Ratios only mean something in context, so always compare them three ways: against the company's own history, against direct competitors, and against the industry norm. A debt-to-equity of 2.0 is alarming for a software firm but ordinary for a utility. An ROE of 12% might be excellent in one industry and mediocre in another. Judging a ratio without its context is one of the most common beginner mistakes. The number on its own is just a fact; the comparison is what turns it into insight about whether the company is doing well or poorly.",
          "Trends often matter more than any single snapshot. A margin of 10% tells you far less than knowing it has climbed steadily from 6% over three years, or slid from 15%. Improving ratios signal a strengthening business even if the current level looks ordinary; deteriorating ratios warn of trouble even when today's number still looks fine. Watching the direction of travel across several years catches problems and opportunities early, before they show up dramatically in the price. The story a ratio tells over time is usually richer than the story it tells in a single moment.",
          "Finally, stay alert to the traps that fool careless readers. Ratios can be distorted by one-time events - a single asset sale can spike EPS and ROE for one quarter, then vanish. Accounting choices can nudge profit-based ratios. A cheap-looking valuation can be a value trap masking a dying business. The defense is triangulation: combine ratios with each other, with cash flow, and with an understanding of the actual business. Ratios are a flashlight that shows you where to look, but judgment about the company behind the numbers is what ultimately makes a good investor."
        ],
        bullets: [
          "Compare every ratio to history, competitors, and industry norms.",
          "A ratio without context is a fact, not an insight.",
          "Trends over years often matter more than a single snapshot.",
          "One-time events and accounting choices can distort ratios.",
          "Triangulate ratios with cash flow and real business understanding."
        ],
        realWorldExample: "An investor sees a company's ROE leap to 30% and nearly buys. Checking the trend, she finds it was 12% for years and spiked only because the firm sold a building - a one-time gain. Reading the trend, not the snapshot, saves her from a misleading number."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "ratios8-mc1",
            question: "Why is relying on a single ratio risky?",
            options: [
              "Financial ratios are always calculated completely wrong",
              "No single ratio captures the full picture",
              "Financial ratios can only ever measure debt",
              "One single ratio equals all of the others"
            ],
            correctAnswer: 1,
            explanation: "Each ratio shows one angle. A low P/E may hide heavy debt; a high ROE may be inflated by borrowing. Only combining ratios reveals the full story."
          },
          {
            id: "ratios8-mc2",
            question: "Which comparison gives a ratio its meaning?",
            options: [
              "Comparing it to a random number",
              "Comparing to history, peers, and industry",
              "Comparing it to the share price only",
              "No comparison is ever needed"
            ],
            correctAnswer: 1,
            explanation: "A ratio is just a fact until compared to the company's own history, its competitors, and the industry norm. Context turns the number into insight."
          }
        ]
      },
      {
        type: "scenario",
        title: "Owen Builds a Full Picture of a Stock",
        narrative: "Owen won't buy a stock on one ratio alone. He gathers several ratios for a candidate company and reads them as a team, checking whether they agree or contradict before deciding if it's a genuine opportunity.",
        details: [
          "Valuation: the P/E is 11, below the industry average of 17 - looks cheap at first glance.",
          "Profitability: ROE is a strong 19% and the profit margin has risen for three straight years.",
          "Solvency: debt-to-equity is a low 0.4, so the balance sheet is conservative and safe.",
          "The ratios agree across valuation, profitability, and solvency, strengthening Owen's conviction."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "ratios8-aq1",
          question: "Why is Owen's conviction strengthened by his analysis?",
          options: [
            "He relied on the P/E ratio alone",
            "Ratios agree across all three dimensions",
            "He ignored the company's debt level",
            "One ratio contradicted all the others"
          ],
          correctAnswer: 1,
          explanation: "Cheap valuation, strong and improving profitability, and low debt all point the same way. When ratios across every dimension agree, conviction grows."
        }
      },
      {
        type: "recap",
        takeaways: [
          "No single ratio captures a company's full health or value.",
          "Combine valuation, profitability, and solvency ratios together.",
          "Ratios cross-check each other, confirming or contradicting the story.",
          "Always compare ratios to history, peers, and industry norms.",
          "Watch trends and beware one-time events that distort the numbers."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "ratios8-mastery1",
            question: "A stock has a low P/E but a debt-to-equity of 6.0. This suggests…",
            options: [
              "A completely guaranteed and totally obvious clear bargain",
              "The low price may reflect real hidden risk",
              "The company clearly has no debt at all whatsoever",
              "Its profit margins must all be very high"
            ],
            correctAnswer: 1,
            explanation: "A cheap P/E alongside crushing debt often means the market priced the stock low for good reason. Combining ratios reveals what one alone would hide."
          },
          {
            id: "ratios8-mastery2",
            question: "Which group does the debt-to-equity ratio belong to?",
            options: [
              "Valuation ratios",
              "Solvency ratios",
              "Profitability ratios",
              "Growth ratios"
            ],
            correctAnswer: 1,
            explanation: "Debt-to-equity is a solvency ratio - it measures whether a company can survive hard times. Valuation covers price; profitability covers earning power."
          },
          {
            id: "ratios8-mastery3",
            question: "Why do trends often matter more than a single ratio?",
            options: [
              "Trends are illegal to report",
              "Direction over years reveals more",
              "A snapshot is always perfect",
              "Ratios never change with time"
            ],
            correctAnswer: 1,
            explanation: "A rising or falling ratio over several years catches strengthening or weakening early, telling a richer story than any single moment's number."
          },
          {
            id: "ratios8-mastery4",
            question: "A one-time asset sale can distort which ratios?",
            options: [
              "Only the standard debt-to-equity ratio matters",
              "Profit-based ratios like EPS and ROE",
              "No financial ratios are ever really affected",
              "Only the plain price-to-sales ratio here"
            ],
            correctAnswer: 1,
            explanation: "A single asset sale spikes profit for one quarter, inflating EPS and ROE temporarily before the gain vanishes. Watching trends guards against this trap."
          },
          {
            id: "ratios8-mastery5",
            question: "When several ratios all point the same way, an investor gains…",
            options: [
              "A reason to distrust them",
              "Greater conviction in the story",
              "Proof the ratios are wrong",
              "A signal to stop analyzing"
            ],
            correctAnswer: 1,
            explanation: "When valuation, profitability, and solvency ratios agree, they reinforce one another and strengthen confidence in the conclusion about the business."
          },
          {
            id: "ratios8-mastery6",
            question: "The best defense against a misleading ratio is to…",
            options: [
              "Simply trust the single cheapest ratio you find",
              "Triangulate with other ratios and cash flow",
              "Completely ignore the underlying business entirely",
              "Use only the single highest number found anywhere"
            ],
            correctAnswer: 1,
            explanation: "Combining ratios with each other, with cash flow, and with real business understanding guards against distortion. Triangulation beats trusting one figure."
          }
        ]
      }
    ]
  },
  {
    lessonId: "valuation-1",
    sections: [
      {
        type: "concept",
        title: "A Company Is Worth Its Future Cash",
        paragraphs: [
          "At its core, a company is worth the cash it can generate for its owners over its lifetime. A business that will produce lots of profit far into the future is worth more than one that will barely break even. This is why two companies with the same sales can have wildly different values - what matters is how much of that money actually ends up as profit, and whether that profit will grow. When you buy a stock, you're really buying a claim on all the future cash the company will produce.",
          "The single biggest value driver is earnings, or profit - what's left after all costs are paid. A company earning $100 million a year is far more valuable than one earning $5 million, all else equal. But raw profit isn't the whole story: investors care intensely about growth. A company growing profits 25% a year will likely be worth far more in a decade than one growing 2% a year, because that profit compounds. This is why fast-growing companies often trade at high prices relative to today's earnings.",
          "Cash flow matters as much as reported profit. A company can look profitable on paper but struggle to turn that into actual cash - for example, if customers don't pay on time or it constantly needs new equipment. 'Free cash flow' is the money left after a company pays to run and maintain itself, and it's the cash truly available to reward owners. Investors trust free cash flow because it's harder to fake than accounting profit, and it's the fuel for dividends, buybacks, and reinvestment."
        ],
        bullets: [
          "A company is worth the future cash it can generate for its owners.",
          "Earnings (profit after all costs) are the biggest driver of value.",
          "Growth multiplies value because profits compound over years.",
          "Free cash flow is the real cash left after running and maintaining the business.",
          "Cash flow is harder to fake than reported accounting profit."
        ],
        realWorldExample: "Two lemonade stands each sell $1,000 of lemonade. One keeps $400 as profit and is growing fast; the other keeps $50 and is shrinking. The first is worth many times more - because value comes from future profit and growth, not just sales."
      },
      {
        type: "concept",
        title: "Quality, Moats, and Risk",
        paragraphs: [
          "Beyond how much a company earns, investors weigh how reliably it earns. A business with steady, predictable profits is worth more than one whose earnings swing wildly, because predictability lowers risk. Profit margins - the share of each sales dollar kept as profit - reveal quality: a company keeping 30 cents of every dollar is usually stronger than one keeping 3 cents. High, stable margins often signal a company that customers love and rivals can't easily undercut.",
          "A durable competitive advantage, often called a 'moat,' is a powerful value driver. A moat is something that protects a company's profits from competitors - a beloved brand, a network of users, patents, or huge scale that keeps costs low. Companies with wide moats can keep earning high profits for years without being copied, which makes their future cash more certain and their value higher. A company with no moat may earn well today but see rivals erode its profits tomorrow.",
          "Risk works in the opposite direction, lowering value. Heavy debt makes a company fragile: a bad year can push it toward bankruptcy, so investors pay less for risky, indebted firms. Poor management, reliance on a single customer, or exposure to wild industry swings all raise risk and shrink value. Great investors look for the sweet spot: a company with growing profits, strong cash flow, a wide moat, and low risk - because that combination makes its future cash both large and dependable."
        ],
        bullets: [
          "Predictable, steady earnings are worth more than wildly swinging ones.",
          "Higher profit margins usually signal a stronger, higher-quality business.",
          "A 'moat' protects profits from competitors, making future cash more certain.",
          "Heavy debt and other risks make a company fragile and lower its value.",
          "The best businesses combine growth, cash flow, a moat, and low risk."
        ],
        realWorldExample: "A soda brand with a famous name and loyal fans can charge more and fend off rivals for decades - a wide moat. A generic drink maker with no brand must slash prices whenever a competitor appears, so its future profits are far less certain and its value lower."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "valuation1-mc1",
            question: "What is a company fundamentally worth?",
            options: [
              "The total sales it makes in a year",
              "The future cash it can generate",
              "The number of employees it hires",
              "The price it paid for its building"
            ],
            correctAnswer: 1,
            explanation: "A company's value comes from the future cash it can produce for owners, not its sales, headcount, or the cost of its assets."
          },
          {
            id: "valuation1-mc2",
            question: "Why is free cash flow trusted more than reported profit?",
            options: [
              "It is always a much larger dollar number",
              "It is harder to fake than accounting profit",
              "It totally ignores the company's actual real costs",
              "It is set directly by the federal government"
            ],
            correctAnswer: 1,
            explanation: "Free cash flow is real cash left after running and maintaining the business, which is harder to manipulate than paper profit. It doesn't ignore costs or come from the government."
          }
        ]
      },
      {
        type: "scenario",
        title: "Amara Compares Two Companies",
        narrative: "Amara studies two companies with identical $2 million in sales. Company A keeps $600,000 as profit, grows 20% a year, has almost no debt, and owns a beloved brand. Company B keeps $80,000 as profit, isn't growing, carries heavy debt, and competes only on price. She's deciding which deserves a higher value.",
        details: [
          "Company A turns far more of its sales into profit, a sign of a higher-quality business.",
          "Company A's 20% growth means its profits will compound to much more over time.",
          "Company A's brand acts as a moat, protecting its profits from copycats.",
          "Company B's heavy debt and price competition make its future cash risky and small."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "valuation1-aq1",
          question: "Why does Company A deserve a much higher value than Company B?",
          options: [
            "It simply has been around a bit longer",
            "Its profits are larger, growing, and protected",
            "It pays its workers far lower wages",
            "It spends much more on advertising each year"
          ],
          correctAnswer: 1,
          explanation: "Company A converts more sales to profit, is growing, and has a moat protecting it - so its future cash is both larger and more dependable. Age, wages, and ad spending aren't the value drivers here."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A company is worth the future cash it will generate for owners.",
          "Earnings and growth are the biggest value drivers; profits compound over time.",
          "Free cash flow is the real, hard-to-fake cash available to reward owners.",
          "Quality signs - steady earnings, high margins, and a moat - raise value.",
          "Debt and other risks lower value by making future cash less certain."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "valuation1-mastery1",
            question: "Two companies have the same $5 million in sales. What most affects their value difference?",
            options: [
              "The particular color of their company logos",
              "How much profit they keep and grow",
              "Which one of the companies was founded first",
              "The exact city where each one is headquartered"
            ],
            correctAnswer: 1,
            explanation: "Value comes from profit and growth, so how much each company keeps and how fast it grows matters most. Logos, founding date, and location don't drive value."
          },
          {
            id: "valuation1-mastery2",
            question: "Why do investors care so much about a company's growth rate?",
            options: [
              "Faster growth is banned by market regulators",
              "Growing profits compound into much more later",
              "Growth removes the need to make profit",
              "Slow growth guarantees a higher stock price"
            ],
            correctAnswer: 1,
            explanation: "Growing profits compound, so a fast grower can be worth far more in a decade. Growth isn't banned, doesn't replace profit, and slow growth doesn't guarantee a higher price."
          },
          {
            id: "valuation1-mastery3",
            question: "What is 'free cash flow'?",
            options: [
              "Total sales a company makes before any costs",
              "Cash left after running and maintaining itself",
              "Money the company borrows from a bank",
              "Profit a company reports before paying taxes"
            ],
            correctAnswer: 1,
            explanation: "Free cash flow is the cash remaining after a company pays to operate and maintain itself - the money truly available to reward owners. It's not sales, borrowing, or pre-tax profit."
          },
          {
            id: "valuation1-mastery4",
            question: "A company keeps 30 cents of profit from every sales dollar. This high margin usually signals…",
            options: [
              "A weak business about to fail soon",
              "A strong, high-quality business",
              "A company breaking the law",
              "A firm with no customers at all"
            ],
            correctAnswer: 1,
            explanation: "High, stable margins usually mean a strong business customers value and rivals can't easily undercut. It doesn't signal failure, lawbreaking, or a lack of customers."
          },
          {
            id: "valuation1-mastery5",
            question: "What does a company's 'moat' do?",
            options: [
              "It forces the government to give subsidies",
              "It protects profits from competitors",
              "It guarantees the stock only rises",
              "It removes all need to earn profit"
            ],
            correctAnswer: 1,
            explanation: "A moat is a durable advantage - brand, scale, patents, network - that shields profits from rivals, making future cash more certain. It isn't a subsidy or a price guarantee."
          },
          {
            id: "valuation1-mastery6",
            question: "How does heavy debt affect a company's value?",
            options: [
              "It makes the company fragile and riskier",
              "It guarantees much faster future growth",
              "It automatically doubles the profit margin",
              "It has no effect on the value at all"
            ],
            correctAnswer: 0,
            explanation: "Heavy debt makes a bad year more dangerous - closer to bankruptcy - so investors pay less for risky, indebted firms. Debt doesn't guarantee growth or boost margins."
          }
        ]
      }
    ]
  },
  {
    lessonId: "valuation-2",
    sections: [
      {
        type: "concept",
        title: "Growth Investing: Paying Up for the Future",
        paragraphs: [
          "Growth investing means buying companies expected to expand their sales and profits much faster than average - and being willing to pay a high price for that future. Growth investors focus on where a company is going, not just where it is. They'll happily buy a company that looks 'expensive' today relative to its current profits, betting those profits will be far larger in five or ten years. Think of fast-scaling tech, biotech, or consumer brands taking over their markets.",
          "Because growth investors pay for the future, growth stocks usually have a high price-to-earnings (P/E) ratio - the share price divided by yearly profit per share. A P/E of 50 means investors pay $50 for every $1 of current profit, a bet that profit will multiply. This can pay off spectacularly: a company growing 30% a year can grow into even a steep price. But it's risky - if growth slows, the high price can collapse, and growth stocks often fall hardest in downturns.",
          "Growth investing rewards vision but punishes overpaying. The danger is being 'priced for perfection': when a stock's price already assumes flawless growth, even a small stumble can trigger a sharp drop. Great growth investors try to find companies whose growth the market is underestimating, not just any fast-grower everyone already loves. They accept short-term volatility in exchange for the chance at outsized long-term gains, which is why growth investing suits patient investors with a long time horizon."
        ],
        bullets: [
          "Growth investing buys fast-expanding companies and pays up for their future.",
          "Growth stocks often have high P/E ratios, reflecting big expectations.",
          "It can deliver huge gains if rapid growth actually continues.",
          "It's risky: if growth slows, a high price can fall sharply.",
          "The key danger is overpaying for a stock 'priced for perfection.'"
        ],
        realWorldExample: "In its early years, an online retailer looked wildly overpriced by traditional measures and paid no dividend, frustrating value investors. But its sales kept compounding for two decades, and patient growth investors who saw that future were richly rewarded."
      },
      {
        type: "concept",
        title: "Value Investing: Buying a Dollar for 50 Cents",
        paragraphs: [
          "Value investing is almost the opposite mindset: buying solid companies that are trading cheaply relative to their fundamentals - their profits, assets, or cash flow. Value investors hunt for bargains the market has overlooked, disliked, or temporarily punished. They love a low price-to-earnings ratio, betting that a good company selling for a low price will eventually be recognized and rise. The philosophy was made famous by Benjamin Graham and his student Warren Buffett.",
          "The heart of value investing is the 'margin of safety' - buying at a price well below what you estimate the company is truly worth, so you have a cushion if you're wrong. If you judge a company is worth $100 a share and you can buy it at $60, that $40 gap protects you from mistakes and bad luck. Value investors accept that a cheap stock might be cheap for a reason, so they demand a discount big enough to be worth the risk. Patience is essential, because the market can take years to recognize value.",
          "Neither style is universally 'better,' and the best investors borrow from both. Growth can become overhyped and crash; value can become a 'value trap' where a cheap company keeps getting cheaper because it's genuinely declining. Many modern investors blend the two, seeking 'growth at a reasonable price' - quality companies that are growing but not absurdly priced. The real lesson is to understand what you're paying for the future and to avoid both overpaying for hype and mistaking a failing business for a bargain."
        ],
        bullets: [
          "Value investing buys good companies trading cheaply versus their fundamentals.",
          "Value investors favor low P/E stocks the market has overlooked.",
          "The 'margin of safety' means buying well below your estimate of true worth.",
          "A 'value trap' is a cheap stock that keeps falling because the business is declining.",
          "Many investors blend both, seeking growth at a reasonable price."
        ],
        realWorldExample: "After a scandal, a strong bank's shares fell far below the value of its steady profits. Value investors who bought during the fear - with a margin of safety - profited as the panic faded and the price recovered toward the company's real worth."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "valuation2-mc1",
            question: "What best describes growth investing?",
            options: [
              "Buying only companies that pay big dividends",
              "Paying up for fast future growth",
              "Avoiding the stock market entirely",
              "Buying whatever stock is cheapest today"
            ],
            correctAnswer: 1,
            explanation: "Growth investing pays a high price today for companies expected to grow fast. It's not about dividends, avoiding stocks, or simply buying the cheapest thing."
          },
          {
            id: "valuation2-mc2",
            question: "A 'margin of safety' means buying a stock…",
            options: [
              "At exactly the price the whole market expects",
              "Well below your estimate of true worth",
              "Only after it has already risen sharply",
              "At the highest price of the year"
            ],
            correctAnswer: 1,
            explanation: "The margin of safety is the gap between a low purchase price and your estimate of true worth, cushioning you against mistakes. It's not about buying high or after a big run-up."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Investors, Two Styles",
        narrative: "Leo and Mia both have $2,000. Leo, a growth investor, buys a fast-scaling software company with a high P/E, betting its profits will multiply. Mia, a value investor, buys a boring but profitable manufacturer trading at a low P/E after a rough year, betting the market will recognize its worth. Each thinks their approach is smarter.",
        details: [
          "Leo pays a high price today, wagering that rapid growth will justify it later.",
          "Leo's stock could soar if growth continues, but fall hard if growth slows.",
          "Mia buys cheaply with a margin of safety, accepting she may wait years to be right.",
          "Mia's risk is a 'value trap' - a cheap stock that keeps falling because the business is failing."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "valuation2-aq1",
          question: "What is the main risk Leo faces with his high-P/E growth stock?",
          options: [
            "The company will pay far too large a dividend",
            "If growth slows, the high price can fall",
            "It is guaranteed to lose money each year",
            "Its low price leaves no room to rise"
          ],
          correctAnswer: 1,
          explanation: "Growth stocks are 'priced for perfection,' so if growth disappoints the high price can collapse. A dividend isn't the risk, and his stock is high-priced, not low."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Growth investing pays a high price for fast future growth; value investing buys cheap.",
          "Growth stocks have high P/E ratios and big expectations; value stocks have low P/E.",
          "Value investing relies on a 'margin of safety' - buying below true worth.",
          "Growth risks overpaying; value risks a 'value trap' in a declining business.",
          "Many investors blend both, seeking growth at a reasonable price."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "valuation2-mastery1",
            question: "A stock has a P/E of 50. What does that most suggest?",
            options: [
              "Investors expect very little future growth",
              "Investors expect strong future growth",
              "The company is about to go bankrupt",
              "The stock is extremely cheap right now"
            ],
            correctAnswer: 1,
            explanation: "A high P/E means investors are paying a lot per dollar of current profit, betting profits will grow. It signals high expectations, not cheapness or imminent failure."
          },
          {
            id: "valuation2-mastery2",
            question: "Value investors are especially drawn to stocks with…",
            options: [
              "The highest prices in the market",
              "A low price relative to fundamentals",
              "No profits and no assets at all",
              "The most hype on social media"
            ],
            correctAnswer: 1,
            explanation: "Value investors seek stocks cheap relative to profits, assets, or cash flow. They avoid hype and don't chase the highest-priced or profitless names."
          },
          {
            id: "valuation2-mastery3",
            question: "The 'margin of safety' protects a value investor by…",
            options: [
              "Guaranteeing the stock will rise next week",
              "Buying below the estimated true value",
              "Removing all possible risk from investing",
              "Forcing the company to pay a dividend"
            ],
            correctAnswer: 1,
            explanation: "Buying well below your estimate of worth leaves a cushion if you're wrong. It guarantees nothing, removes no risk entirely, and doesn't force dividends."
          },
          {
            id: "valuation2-mastery4",
            question: "What is a 'value trap'?",
            options: [
              "A stock that rises far too quickly to buy",
              "A cheap stock that keeps falling as it declines",
              "A fully guaranteed win for every patient value investor",
              "A special tax charged on all value stock investments"
            ],
            correctAnswer: 1,
            explanation: "A value trap looks cheap but keeps falling because the underlying business is genuinely declining - cheap for a reason. It's not a guaranteed win or a tax."
          },
          {
            id: "valuation2-mastery5",
            question: "A key risk of growth investing is…",
            options: [
              "The stock is always far too cheap",
              "Overpaying for a stock priced for perfection",
              "It never produces any gains at all",
              "Growth companies are strictly illegal to own"
            ],
            correctAnswer: 1,
            explanation: "Growth stocks priced for perfection can drop sharply on any stumble - the danger is overpaying. Growth stocks aren't cheap, gain-free, or illegal."
          },
          {
            id: "valuation2-mastery6",
            question: "'Growth at a reasonable price' describes investors who…",
            options: [
              "Only ever buy the single cheapest stock",
              "Blend growth and value ideas together",
              "Refuse to buy any growing company",
              "Ignore a company's price completely"
            ],
            correctAnswer: 1,
            explanation: "This blended style seeks quality companies that are growing but not absurdly priced - mixing growth and value. It neither ignores price nor avoids growth."
          }
        ]
      }
    ]
  },
  {
    lessonId: "valuation-3",
    sections: [
      {
        type: "concept",
        title: "What a Moat Is and Why It Matters",
        paragraphs: [
          "A moat is a durable competitive advantage that protects a company's profits from rivals, the way a water-filled moat once protected a castle. Any business earning fat profits attracts competitors who want a slice, and normally that competition drives prices and profits down. A moat is whatever keeps those attackers out, letting a company keep earning high returns year after year. Warren Buffett popularized the term because he prizes businesses that can defend their profits for decades, not just for one good quarter.",
          "Consider a company earning a 25% return on the money invested in it while most rivals earn 8%. Without protection, competitors would flood in, cut prices, and pull that 25% down toward 8%. A moat is why that doesn't happen. Maybe customers are locked into the product, maybe the brand commands loyalty, or maybe the company is simply the cheapest producer. Whatever the reason, the moat lets the business keep its 25% return far longer than an unprotected rival ever could.",
          "Moats matter enormously for valuation because a stock is worth the profits it will earn far into the future. A company with a wide, lasting moat can compound profits for 20 years, justifying a higher price today. A company with no moat might earn great profits now but lose them quickly, making it worth far less than its current numbers suggest. Judging the width and durability of a moat is one of the most important skills a long-term investor can develop. Two companies can post identical profits this year, yet the one whose moat will still stand in a decade is worth far more, because its earnings are far more certain to keep flowing. That is why seasoned investors spend more time studying a company's defenses than its latest quarterly figures, asking not merely how much a business earns today but how safely those earnings are protected from the competition that success always invites."
        ],
        bullets: [
          "A moat is a durable advantage that protects a company's profits from competitors.",
          "High profits normally attract rivals who compete them away; a moat blocks that.",
          "Moats let a business keep earning high returns for many years.",
          "Wider, longer-lasting moats make a company worth more today.",
          "Judging moat durability is central to long-term investing."
        ],
        realWorldExample: "A soft-drink maker has sold essentially the same syrup for over a century, yet competitors still can't dethrone it. Decades of advertising built a brand so trusted that shoppers reach for it by habit - a moat that has protected its profits for generations."
      },
      {
        type: "concept",
        title: "The Main Types of Moats",
        paragraphs: [
          "Moats come in a few recognizable forms. Brand power lets a company charge more because customers trust the name - people pay extra for a familiar sneaker or drink. The network effect makes a product more valuable as more people use it: a marketplace or social app with millions of users is hard to leave because everyone else is already there. High switching costs trap customers who'd face hassle or expense to change, like a business that has built its whole workflow around one software system.",
          "Two more moats come from scale and control. A cost advantage lets the cheapest producer undercut rivals and still profit - a giant retailer buys in such volume that no small store can match its prices. Efficient scale protects businesses in markets only big enough for one or two players, like the single pipeline serving a region. Finally, intangible assets such as patents, licenses, or regulatory approvals can legally lock competitors out for years, common in pharmaceuticals and specialized manufacturing.",
          "Not all moats last, and investors must ask whether an advantage is widening or shrinking. Technology and shifting tastes can erode even famous moats - a dominant camera-film maker was destroyed when photos went digital. A strong moat is one that's hard to copy, hard to replace, and getting stronger over time, not weaker. The best question isn't just 'Does this company have a moat?' but 'Will this moat still be standing in ten years?'"
        ],
        bullets: [
          "Brand power lets a company charge more thanks to customer trust.",
          "Network effects make a product more valuable as more people use it.",
          "Switching costs and cost advantages keep customers and undercut rivals.",
          "Intangible assets like patents can legally lock competitors out.",
          "Moats can erode, so investors judge whether they're widening or shrinking."
        ],
        realWorldExample: "A payment card network grew more valuable with every extra shopper and store that joined - a textbook network effect. New rivals struggle to break in because merchants want the network with the most customers, and customers want the one accepted everywhere."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "valuation3-mc1",
            question: "What is a 'moat' in investing?",
            options: [
              "A tax charged on very large companies",
              "A durable advantage protecting profits",
              "A sudden drop in a stock's price",
              "A rule banning new competitors by law"
            ],
            correctAnswer: 1,
            explanation: "A moat is a lasting competitive advantage that shields a company's profits from rivals. It's not a tax, a price drop, or a blanket legal ban on competition."
          },
          {
            id: "valuation3-mc2",
            question: "Which is an example of a network-effect moat?",
            options: [
              "A firm that owns a valuable, defensible patent",
              "An app more useful as users join",
              "A store that buys its goods very cheaply",
              "A brand people trust and pay more for"
            ],
            correctAnswer: 1,
            explanation: "A network effect means the product grows more valuable as its user base grows. Patents, low costs, and brand trust are real moats too, but they're different types."
          }
        ]
      },
      {
        type: "scenario",
        title: "Three Companies, Three Moats",
        narrative: "You're comparing three businesses. Ava's Software runs the accounting system a million companies rely on daily. Ben's Brand sells sneakers people pay a premium for out of loyalty. Cara's Pipeline is the only pipeline serving a whole region. Each earns high, steady profits, and you want to know why competitors haven't destroyed those profits.",
        details: [
          "Ava's advantage is switching costs - firms dread the hassle of changing their core software.",
          "Ben's advantage is brand power that lets him charge more than rival shoemakers.",
          "Cara's advantage is efficient scale - the market fits only one pipeline profitably.",
          "For each, ask whether the moat is likely to widen or shrink over the next decade."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "valuation3-aq1",
          question: "Ava's customers rarely leave because switching accounting systems is a huge hassle. This moat is best called…",
          options: [
            "A network effect between users",
            "High customer switching costs",
            "A patent protecting the code",
            "A pure cost advantage in pricing"
          ],
          correctAnswer: 1,
          explanation: "The hassle and expense of changing systems creates switching costs that lock customers in. It isn't a network effect, a patent, or a cost-of-production advantage."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A moat is a durable advantage that protects profits from competitors.",
          "Without a moat, rivals compete high profits back down toward average.",
          "Common moats: brand, network effects, switching costs, cost advantage, patents.",
          "Wider, longer-lasting moats make a company worth more today.",
          "Always ask whether a moat is widening or eroding over time."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "valuation3-mastery1",
            question: "Why do high profits normally attract competitors?",
            options: [
              "Because national governments strictly require it by law",
              "Because rivals want a share too",
              "Because customers always demand far lower quality",
              "Because taxes tend to rise as profits shrink"
            ],
            correctAnswer: 1,
            explanation: "Fat profits lure rivals hoping to grab some, which usually competes those profits down. It's not driven by law, worse quality, or falling taxes."
          },
          {
            id: "valuation3-mastery2",
            question: "A giant retailer buys in such volume that no small shop can match its prices. This moat is a…",
            options: [
              "A brand-power advantage over rivals",
              "A cost edge",
              "A patent on its products",
              "A network effect among stores"
            ],
            correctAnswer: 1,
            explanation: "Buying cheaply due to size is a cost advantage that lets the retailer undercut rivals. It isn't about brand, patents, or a network of users."
          },
          {
            id: "valuation3-mastery3",
            question: "Why do moats matter for valuation?",
            options: [
              "They directly lower a company's yearly tax bill",
              "They let profits last for years",
              "They guarantee the stock rises every single year",
              "They remove the need to ever earn profit"
            ],
            correctAnswer: 1,
            explanation: "A stock is worth its future profits, so a lasting moat that protects profits for years raises value. It's not a tax break or a yearly price guarantee."
          },
          {
            id: "valuation3-mastery4",
            question: "What destroyed the moat of a dominant camera-film maker?",
            options: [
              "A sudden new tax on all cameras",
              "A shift to digital photography",
              "Customers losing interest in photos",
              "A law banning film sales outright"
            ],
            correctAnswer: 1,
            explanation: "Digital photography made film obsolete, eroding the moat despite the brand's fame. People still loved photos, and no tax or ban caused the collapse."
          },
          {
            id: "valuation3-mastery5",
            question: "A patent that legally keeps rivals out for years is which kind of moat?",
            options: [
              "A switching-cost moat",
              "An intangible-asset moat",
              "An efficient-scale moat",
              "A network-effect moat"
            ],
            correctAnswer: 1,
            explanation: "Patents, licenses, and approvals are intangible assets that can lock competitors out legally. They differ from switching costs, scale, or network effects."
          },
          {
            id: "valuation3-mastery6",
            question: "The best moat question a long-term investor can ask is…",
            options: [
              "How cheap is the stock this very week?",
              "Will this moat still stand ahead?",
              "Did the stock rise or fall just yesterday?",
              "Which analyst rated the stock highest?"
            ],
            correctAnswer: 1,
            explanation: "Durability is what matters, so the key question is whether the moat lasts a decade. Weekly prices, daily moves, and analyst ratings miss the point."
          }
        ]
      }
    ]
  },
  {
    lessonId: "valuation-4",
    sections: [
      {
        type: "concept",
        title: "A Stock Price Is a Bet on the Future",
        paragraphs: [
          "A stock's price isn't a report card on what a company did last year - it's a bet on what the company will do next. Every price already has expectations baked into it. When you see a share trading at $100, the market is collectively predicting a certain path of future profits and pricing the stock to match. This is why a company can report record earnings and still see its stock fall: if investors expected even more, the 'good' news was actually a disappointment against the bar that was already set.",
          "This is the single most confusing thing for new investors: what moves a stock isn't whether results are good or bad, but whether they're better or worse than expected. Imagine a company everyone believes will grow 20% a year. If it grows 20%, the stock may barely move, because that was already the price. If it grows 25%, the stock can jump; if it grows 15%, the stock can drop hard - even though 15% growth is still genuinely good. The market trades on surprises relative to expectations.",
          "Because of this, a high price sets a high bar. A stock priced for 30% growth must actually deliver near 30% just to hold its value; anything less can trigger a fall. A stock priced for decline can rise on merely okay news, because the bar is so low. Great investors think about the expectations embedded in a price, not just the company's quality. The question is never only 'Is this a good company?' but 'Is it better than the price already assumes?'"
        ],
        bullets: [
          "A stock price reflects the market's expectations of future profits.",
          "Prices move on results relative to expectations, not just good or bad news.",
          "A company can beat records yet fall if it missed the higher bar set.",
          "A high price bakes in high expectations that must be met to hold value.",
          "The key question is whether reality beats what the price already assumes."
        ],
        realWorldExample: "A tech giant once reported billions in profit - a genuinely strong quarter - yet its stock dropped sharply that day. Sales growth had slowed a bit more than analysts predicted, so against sky-high expectations, a great result still counted as a letdown."
      },
      {
        type: "concept",
        title: "Reading Expectations in the Price",
        paragraphs: [
          "You can often sense the expectations in a price using the P/E ratio. A modest company trading at a P/E of 10 has low expectations - the market doesn't foresee much growth, so it won't take much good news to please it. A company at a P/E of 60 carries enormous expectations; investors are betting on years of rapid growth, and the company must keep delivering to justify that price. Neither is automatically a better buy - it depends on whether the company can beat the bar its price has set.",
          "This reframes 'expensive' and 'cheap.' A high-P/E stock isn't necessarily overpriced if the company will grow even faster than the market expects. A low-P/E stock isn't necessarily a bargain if the business is quietly falling apart. What matters is the gap between reality and expectations. Skilled investors hunt for that gap: a wonderful company the market has underrated, or an overhyped one whose price assumes a future it can't possibly deliver.",
          "Expectations also explain market mood swings. In optimistic times, investors raise their expectations and bid prices up, so it takes ever-better news to keep stocks climbing - eventually reality can't keep up and prices fall. In gloomy times, expectations sink so low that even mediocre news feels like relief, and prices recover. Understanding that you're always trading against a set of embedded expectations helps you stay calm: a falling stock after good news usually means expectations were simply too high, not that the business is broken. It also stops you from chasing headlines, since by the time news is obvious to everyone, the price has usually already moved to absorb it. The real edge comes from seeing what the crowd's expectations are getting wrong, not from reacting to news the market has already priced in."
        ],
        bullets: [
          "A low P/E signals low expectations; a high P/E signals high ones.",
          "'Expensive' or 'cheap' depends on whether the company beats the bar.",
          "Investors profit by spotting gaps between reality and expectations.",
          "Rising optimism lifts expectations, making stocks harder to satisfy.",
          "Good news with a falling price often means expectations were too high."
        ],
        realWorldExample: "A struggling retailer traded at a rock-bottom P/E because everyone expected it to keep shrinking. When it merely stopped shrinking - hardly triumphant news - the stock rose sharply, because reality beat the market's very low expectations."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "valuation4-mc1",
            question: "What does a stock's price mainly reflect?",
            options: [
              "Only last year's reported profits",
              "The market's expectations of the future",
              "The number of employees a firm has",
              "The age of the company in years"
            ],
            correctAnswer: 1,
            explanation: "A price is a bet on future profits - the market's expectations. It isn't a simple readout of past profits, headcount, or company age."
          },
          {
            id: "valuation4-mc2",
            question: "A company beats last year's record but its stock falls. The likeliest reason is…",
            options: [
              "It broke the law by earning money",
              "Results missed even higher expectations",
              "Profits are always bad for a stock price",
              "The company has too few employees now"
            ],
            correctAnswer: 1,
            explanation: "Stocks move on results versus expectations; a record can still fall short of a higher bar. Profits aren't inherently bad, and headcount isn't the driver."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Earnings-Day Surprise",
        narrative: "Two companies report earnings the same morning. GlowTech, priced at a lofty P/E of 55, grows profits 22% - strong, but the market expected 30%. QuietCo, priced at a gloomy P/E of 8, grows profits just 4%, when the market expected a decline. By afternoon, GlowTech has dropped and QuietCo has risen, confusing investors who only looked at the raw growth numbers.",
        details: [
          "GlowTech's price already assumed 30% growth, so 22% was a disappointment.",
          "QuietCo's price assumed shrinkage, so any growth was a pleasant surprise.",
          "The market traded on results relative to expectations, not raw growth.",
          "A high price sets a high bar; a low price sets a bar that's easy to clear."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "valuation4-aq1",
          question: "Why did QuietCo's stock rise despite only 4% growth?",
          options: [
            "Because that 4% growth is objectively huge",
            "Because it beat low expectations",
            "Because low-P/E stocks always rise",
            "Because it hired many new workers"
          ],
          correctAnswer: 1,
          explanation: "QuietCo's price assumed decline, so modest growth beat the low bar and lifted the stock. Four percent isn't huge, and low P/E alone guarantees nothing."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A stock price is a bet on future profits, not a grade on the past.",
          "Stocks move on results relative to expectations, not just good or bad news.",
          "A high P/E means high expectations that must be met to hold the price.",
          "'Cheap' or 'expensive' depends on beating the bar the price has set.",
          "Good news with a falling stock usually means expectations were too high."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "valuation4-mastery1",
            question: "A high P/E ratio tells you the market has…",
            options: [
              "Very low hopes for future growth",
              "High expectations for future growth",
              "No opinion about the company at all",
              "Proof the company will fail soon"
            ],
            correctAnswer: 1,
            explanation: "A high P/E means investors are paying up for expected strong growth - high expectations. It's not low hopes, indifference, or a failure signal."
          },
          {
            id: "valuation4-mastery2",
            question: "Stocks primarily move based on…",
            options: [
              "How many shares exist in total",
              "Results versus what was expected",
              "Whether the CEO is well liked",
              "The color of the company's logo"
            ],
            correctAnswer: 1,
            explanation: "Price changes come from surprises - results beating or missing expectations. Share count, likability, and branding aren't the main drivers."
          },
          {
            id: "valuation4-mastery3",
            question: "A stock 'priced for 30% growth' must roughly deliver that growth to…",
            options: [
              "Instantly double its share price",
              "Simply hold its current value",
              "Avoid being delisted by law",
              "Force competitors out of business"
            ],
            correctAnswer: 1,
            explanation: "Meeting baked-in expectations just maintains the price; missing them can cause a fall. It doesn't double the stock, prevent delisting, or crush rivals."
          },
          {
            id: "valuation4-mastery4",
            question: "A low-P/E stock is NOT automatically a bargain because…",
            options: [
              "Low P/E is illegal for most firms",
              "The business may be quietly declining",
              "Cheap stocks can never rise in price",
              "Taxes always erase any gains made"
            ],
            correctAnswer: 1,
            explanation: "A low price can reflect a genuinely shrinking business, so cheapness alone isn't safety. Low P/E is legal, cheap stocks can rise, and taxes don't erase all gains."
          },
          {
            id: "valuation4-mastery5",
            question: "Rising market optimism affects expectations by…",
            options: [
              "Lowering the bar that companies must clear",
              "Raising the bar for firms",
              "Removing expectations from prices",
              "Freezing all stock prices in place"
            ],
            correctAnswer: 1,
            explanation: "Optimism lifts expectations and prices, so it takes ever-better news to satisfy the market. It doesn't lower the bar, erase expectations, or freeze prices."
          },
          {
            id: "valuation4-mastery6",
            question: "When a company posts good news but its stock falls, it usually means…",
            options: [
              "The company committed accounting fraud",
              "Expectations were already too high",
              "Good news is bad for every stock",
              "The stock market has shut down"
            ],
            correctAnswer: 1,
            explanation: "A fall on good news typically signals the news missed an even higher bar. It's not proof of fraud, and good news isn't universally bad for stocks."
          }
        ]
      }
    ]
  },
  {
    lessonId: "valuation-5",
    sections: [
      {
        type: "concept",
        title: "The Big Idea Behind DCF",
        paragraphs: [
          "Discounted cash flow, or DCF, is the most respected way to estimate what a company is truly worth. The core idea is simple: a business is worth all the cash it will generate for its owners in the future, added up. If you could magically know every dollar a company would produce from now until forever, and total it up sensibly, you'd have its intrinsic value. DCF is just a disciplined way of estimating that future cash and turning it into a single value for the company today.",
          "There's one twist: a dollar in the future is worth less than a dollar today. Money now can be invested to grow, and future money carries risk and is eroded by inflation. So we 'discount' future cash - shrinking it to reflect that it's worth less the further out it arrives. If your required return is 10% a year, then $110 expected next year is worth about $100 to you today, because $100 invested at 10% would grow to $110. This shrinking of future dollars back to today's value is the heart of DCF.",
          "So a DCF has two moving parts: estimate the cash a company will produce over the coming years, then discount each year's cash back to today and add it all up. The result is your estimate of intrinsic value. If that value is well above the current stock price, the stock may be a bargain; if it's well below, the stock may be overpriced. DCF forces you to think clearly about a company's real cash-generating future rather than just its stock-price gossip."
        ],
        bullets: [
          "DCF values a company as all the future cash it will generate for owners.",
          "A future dollar is worth less than a dollar today, so we discount it.",
          "The discount reflects investing opportunity, risk, and inflation.",
          "Estimate future cash, discount each year, and add it up for intrinsic value.",
          "Comparing that value to the stock price flags bargains or overpricing."
        ],
        realWorldExample: "Analysts valuing a steady utility project its cash flows for years ahead, then discount each year back to today. The total often lands near the company's market value - a sign the market and the DCF broadly agree on the utility's worth."
      },
      {
        type: "concept",
        title: "A Simple DCF, Step by Step",
        paragraphs: [
          "Let's walk a simplified example. Suppose a small company will produce $100 of free cash next year, and you expect that to grow modestly each year. You pick a discount rate - say 10% - reflecting the return you demand for the risk. Year one's $100 is worth about $91 today (100 divided by 1.10). Year two's cash is divided by 1.10 twice, year three's three times, and so on. Each year's cash is worth progressively less in today's dollars, because it arrives further in the future.",
          "You can't project every year forever, so DCF splits the future in two: a detailed forecast for the next several years, then a 'terminal value' capturing everything beyond that, treated as a steadily growing stream. You discount the terminal value back to today too, then add it to your near-term discounted cash flows. The sum is the estimated value of the whole business. Divide by the number of shares, and you get an estimated intrinsic value per share to compare against the market price.",
          "The catch is that DCF is only as good as its assumptions - garbage in, garbage out. Small changes in the growth rate or discount rate can swing the answer wildly, which is why analysts run several scenarios rather than trusting one number. A DCF isn't a precise machine that spits out truth; it's a structured way to make your assumptions explicit and see what a company would be worth if those assumptions held. Its real value is the disciplined thinking it forces, not false precision. Used well, a DCF tells you what you'd have to believe about growth and risk to justify today's stock price, turning a vague hunch into a testable set of assumptions you can challenge."
        ],
        bullets: [
          "Project a company's future free cash flow year by year.",
          "Discount each year's cash to today using your required return.",
          "Add a 'terminal value' for cash beyond the forecast period.",
          "Summing the discounted cash gives estimated intrinsic value.",
          "Small assumption changes swing DCF a lot, so test several scenarios."
        ],
        realWorldExample: "Two analysts model the same company but assume 8% versus 12% long-term growth. Their DCF values differ by nearly half - a vivid reminder that a DCF's output depends entirely on the assumptions fed into it."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "valuation5-mc1",
            question: "What does a DCF estimate a company's value from?",
            options: [
              "Its total current number of employees",
              "Its future cash, discounted",
              "Yesterday's closing share price",
              "The size of its head office building"
            ],
            correctAnswer: 1,
            explanation: "DCF values a firm as its future cash flows discounted back to today. Headcount, yesterday's price, and buildings aren't the basis of the calculation."
          },
          {
            id: "valuation5-mc2",
            question: "Why do we 'discount' future cash flows?",
            options: [
              "Because future money is worth less",
              "Because past profits are always ignored",
              "Because cash flows never actually arrive",
              "Because taxes double every single year"
            ],
            correctAnswer: 0,
            explanation: "A future dollar is worth less than one today due to opportunity, risk, and inflation, so we shrink it. The other options misstate how discounting works."
          }
        ]
      },
      {
        type: "scenario",
        title: "Valuing Nadia's Bakery Chain",
        narrative: "Nadia is thinking of buying a small bakery chain. It should generate about $100,000 of free cash next year, growing slowly after that. She demands a 10% return for the risk, so she discounts each future year's cash back to today, adds a terminal value for the years beyond her forecast, and totals it up to estimate what the chain is really worth.",
        details: [
          "Next year's $100,000 is worth about $91,000 to Nadia in today's dollars.",
          "Cash arriving later is discounted more heavily, so it's worth even less today.",
          "A terminal value captures the cash beyond her detailed forecast years.",
          "If her total estimate tops the asking price, the bakery may be a bargain."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "valuation5-aq1",
          question: "Using a 10% discount rate, roughly what is $100,000 arriving in one year worth to Nadia today?",
          options: [
            "About $110,000 today",
            "About $91,000 today",
            "Exactly $100,000 today",
            "About $50,000 today"
          ],
          correctAnswer: 1,
          explanation: "Dividing $100,000 by 1.10 gives about $91,000 - the value today. It's less than $100,000 because future cash is discounted, and not as low as $50,000."
        }
      },
      {
        type: "recap",
        takeaways: [
          "DCF values a company as its future cash flows added up.",
          "Future cash is discounted because a dollar later is worth less than now.",
          "Project cash, discount each year, and add a terminal value for the rest.",
          "The summed value is an estimate of intrinsic value per share.",
          "DCF depends entirely on assumptions, so test several scenarios."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "valuation5-mastery1",
            question: "The core idea of DCF is that a company is worth…",
            options: [
              "Its office furniture at resale value",
              "All its future cash, added up",
              "Whatever it earned five years ago",
              "The salary paid to its founder"
            ],
            correctAnswer: 1,
            explanation: "DCF treats a business as the sum of the cash it will generate for owners. Furniture, old earnings, and salaries aren't the basis of the value."
          },
          {
            id: "valuation5-mastery2",
            question: "At a 10% discount rate, $110 expected next year is worth about…",
            options: [
              "$121 today",
              "$100 today",
              "$110 today",
              "$55 today"
            ],
            correctAnswer: 1,
            explanation: "Dividing $110 by 1.10 gives $100, since $100 invested at 10% grows to $110. It isn't $110, $121, or $55."
          },
          {
            id: "valuation5-mastery3",
            question: "What is a 'terminal value' in a DCF?",
            options: [
              "The company's very first year of sales",
              "The value of cash beyond forecast",
              "A penalty for a failing business",
              "The total wages the company has paid"
            ],
            correctAnswer: 1,
            explanation: "Terminal value captures all cash beyond the detailed forecast, treated as a steady stream. It's not first-year sales, a penalty, or total wages."
          },
          {
            id: "valuation5-mastery4",
            question: "Why do small assumption changes matter so much in DCF?",
            options: [
              "They can swing the value",
              "They change the company's employee count",
              "They are illegal to adjust once set",
              "They have no effect on the result"
            ],
            correctAnswer: 0,
            explanation: "Tweaking growth or discount rates can move the DCF value dramatically, so analysts test scenarios. Assumptions don't change headcount and aren't fixed by law."
          },
          {
            id: "valuation5-mastery5",
            question: "If a DCF value is far above the current stock price, the stock may be…",
            options: [
              "Clearly overpriced right now",
              "A potential bargain",
              "About to be delisted",
              "Impossible to buy at all"
            ],
            correctAnswer: 1,
            explanation: "A value above the price suggests the market may be undervaluing it - a possible bargain. It's not a sign of overpricing, delisting, or being unbuyable."
          },
          {
            id: "valuation5-mastery6",
            question: "The real value of doing a DCF is that it…",
            options: [
              "Guarantees a perfectly exact price",
              "Makes your assumptions explicit",
              "Removes all risk from investing",
              "Predicts next week's price move"
            ],
            correctAnswer: 1,
            explanation: "A DCF disciplines your thinking by making assumptions clear, not by delivering false precision. It can't guarantee exactness, erase risk, or time short-term moves."
          }
        ]
      }
    ]
  },
  {
    lessonId: "valuation-6",
    sections: [
      {
        type: "concept",
        title: "Two Different Numbers: Price and Value",
        paragraphs: [
          "Every stock has two numbers that people confuse: its market price and its intrinsic value. The market price is simply what the last buyer and seller agreed on - it flashes on your screen every second. Intrinsic value is what the company is actually worth based on the cash it will generate over its lifetime, estimated with tools like DCF. These two numbers are related but not the same, and the entire game of investing is exploiting the gaps between them. Price is what you pay; value is what you get.",
          "Benjamin Graham captured this with his parable of 'Mr. Market,' an emotional business partner who shows up every day offering to buy or sell at a different price. Some days Mr. Market is euphoric and quotes absurdly high prices; other days he's terrified and offers to sell cheaply. His moods are driven by fear and greed, not by careful analysis. The smart investor doesn't take orders from Mr. Market - they use his mood swings, buying when he's fearful and cheap, and perhaps selling when he's greedy and overpaying.",
          "This gap between price and value opens up because markets are driven by human emotion in the short run. News, headlines, and crowd psychology can push a price far above or below what a business is truly worth. Over the long run, though, price tends to drift back toward value - a genuinely great business eventually gets recognized, and an overhyped one eventually disappoints. Investing well means estimating value independently, then having the patience and nerve to act when price and value diverge."
        ],
        bullets: [
          "Market price is what buyers and sellers agree on right now.",
          "Intrinsic value is what a company is truly worth over its lifetime.",
          "'Mr. Market' offers emotional prices driven by fear and greed.",
          "Smart investors use his moods rather than obeying them.",
          "Over the long run, price tends to drift back toward value."
        ],
        realWorldExample: "During a market panic, shares of profitable companies were dumped at fire-sale prices as fear spread. Investors who had estimated real value bought from a terrified Mr. Market and profited handsomely as prices recovered over the following years."
      },
      {
        type: "concept",
        title: "Acting on the Gap - Carefully",
        paragraphs: [
          "When price sits far below your estimate of value, that gap is your margin of safety - the cushion that protects you if your estimate is a bit wrong. If you judge a company is worth $80 a share and it trades at $50, you have room to be imperfect and still do well. When price soars far above value, the same logic warns you away: paying $120 for something worth $80 leaves no cushion and plenty of downside. The bigger and clearer the gap in your favor, the more attractive - and safer - the opportunity.",
          "But acting on the gap takes discipline, because a cheap stock can stay cheap or get cheaper before value wins out, and an expensive stock can keep climbing on hype for a long time. The market can stay irrational longer than you might expect. That's why value investors demand a large gap before acting and hold for years, not days. They're not trying to predict when Mr. Market changes his mood - only to buy well below value and wait patiently for recognition, collecting dividends and growth along the way.",
          "The greatest trap is confusing price movement with value change. When a stock drops, it feels like the company got worse, and when it rises, it feels stronger - but often nothing about the underlying business changed at all. Disciplined investors re-check the actual business: are profits, moat, and prospects intact? If value is unchanged and price fell, the stock just got cheaper and more attractive, not worse. Separating what the price is doing from what the business is doing is the core skill this whole idea teaches. Master it, and a market crash becomes a chance to buy good businesses cheaply rather than a reason to flee in fear."
        ],
        bullets: [
          "A price far below value gives a margin-of-safety cushion.",
          "A price far above value leaves no cushion and real downside.",
          "Cheap stocks can stay cheap, so patience and a big gap matter.",
          "Don't confuse a falling price with a worsening business.",
          "Re-check profits, moat, and prospects before acting on price moves."
        ],
        realWorldExample: "A solid company's stock fell 20% in a week on a scary but minor headline, though its profits and moat were untouched. Investors who checked the business saw the price - not the value - had changed, and treated the drop as a chance to buy."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "valuation6-mc1",
            question: "What is the difference between price and intrinsic value?",
            options: [
              "They are simply two names for one thing",
              "Price is paid; value is worth",
              "Value changes every second on the screen",
              "Price is always far higher than value"
            ],
            correctAnswer: 1,
            explanation: "Price is the market's current quote; intrinsic value is the company's true worth. They aren't identical, value isn't the flickering quote, and price isn't always higher."
          },
          {
            id: "valuation6-mc2",
            question: "In Graham's parable, 'Mr. Market' represents…",
            options: [
              "A regulator who sets fair prices",
              "The market's emotional mood swings",
              "A CEO who runs one company",
              "A tax collector on stock trades"
            ],
            correctAnswer: 1,
            explanation: "Mr. Market is a metaphor for the market's fear-and-greed mood swings offering different prices. He's not a regulator, a single CEO, or a tax collector."
          }
        ]
      },
      {
        type: "scenario",
        title: "A Scary Headline Hits Devon's Stock",
        narrative: "Devon owns shares of a profitable company he values at about $80 each. A frightening but minor headline appears, and within days a panicky Mr. Market drives the price down to $52. Devon's friends are selling in fear. Devon checks the company's profits, moat, and long-term prospects and finds nothing important has actually changed about the business.",
        details: [
          "The price fell to $52, but Devon's estimate of value stayed near $80.",
          "The gap between price and value widened in Devon's favor.",
          "A lower price with unchanged value means a bigger margin of safety.",
          "Devon separates the price's move from the business's real condition."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "valuation6-aq1",
          question: "Given the price fell to $52 while value stayed near $80, what should Devon conclude?",
          options: [
            "The business clearly got much worse",
            "The stock is now cheaper",
            "He should panic-sell with his friends",
            "Value must have dropped to $52 too"
          ],
          correctAnswer: 1,
          explanation: "With value unchanged and price lower, the stock simply got cheaper and safer to buy. A price drop alone doesn't prove the business or its value worsened."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Price is what you pay; intrinsic value is what the business is worth.",
          "'Mr. Market' offers emotional prices; use his moods, don't obey them.",
          "A price far below value creates a margin-of-safety cushion.",
          "Cheap stocks can stay cheap, so demand a big gap and be patient.",
          "Don't confuse a falling price with a worsening business."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "valuation6-mastery1",
            question: "The market price of a stock is best described as…",
            options: [
              "The company's true lifetime worth",
              "What buyers and sellers now agree",
              "A number set by the government",
              "The total cash a firm will ever earn"
            ],
            correctAnswer: 1,
            explanation: "Price is simply the latest agreed quote between buyer and seller. Its true worth is intrinsic value, and prices aren't set by government."
          },
          {
            id: "valuation6-mastery2",
            question: "A smart investor treats Mr. Market's mood swings as…",
            options: [
              "Orders that must always be obeyed",
              "Chances to buy or sell",
              "Proof a company's value has changed",
              "A reason to leave investing forever"
            ],
            correctAnswer: 1,
            explanation: "The point of the parable is to exploit his moods, buying when he's fearful. His prices aren't commands and don't reveal real value changes."
          },
          {
            id: "valuation6-mastery3",
            question: "Buying at $50 something you value at $80 gives you a…",
            options: [
              "Guaranteed profit with zero risk",
              "Margin of safety",
              "Reason to expect immediate gains",
              "Penalty for overpaying badly"
            ],
            correctAnswer: 1,
            explanation: "The $30 gap is a margin of safety that cushions estimate errors. It's not a zero-risk guarantee, an instant gain, or a penalty."
          },
          {
            id: "valuation6-mastery4",
            question: "Over the long run, a stock's price tends to…",
            options: [
              "Drift away from its value forever",
              "Drift back toward its value",
              "Stay frozen at one fixed level",
              "Always double every year"
            ],
            correctAnswer: 1,
            explanation: "Given time, price tends to converge toward intrinsic value as reality is recognized. It doesn't diverge forever, freeze, or reliably double yearly."
          },
          {
            id: "valuation6-mastery5",
            question: "The biggest trap when a stock's price falls is to assume…",
            options: [
              "The business automatically got worse",
              "Nothing ever changes in markets",
              "Prices can only ever rise",
              "Value is impossible to estimate"
            ],
            correctAnswer: 0,
            explanation: "A price drop often reflects mood, not a real decline in the business. Assuming the business worsened confuses price movement with value change."
          },
          {
            id: "valuation6-mastery6",
            question: "Why do value investors often hold for years rather than days?",
            options: [
              "Because trading is banned short-term",
              "Because price can take years",
              "Because they dislike making any profit",
              "Because dividends are illegal to collect"
            ],
            correctAnswer: 1,
            explanation: "The market can stay irrational a long time, so recognition of value takes patience. Short-term trading isn't banned, and dividends are perfectly legal."
          }
        ]
      }
    ]
  },
  {
    lessonId: "valuation-7",
    sections: [
      {
        type: "concept",
        title: "The Quiet Power of Compounding",
        paragraphs: [
          "Long-term investing works because of compounding - earning returns on your past returns, so growth accelerates over time. Suppose you invest $1,000 and earn about 10% a year. After one year you have $1,100; the next year you earn 10% not just on your original $1,000 but on the whole $1,100, giving $1,210. It seems slow at first, but the snowball grows. Left alone at 10%, money roughly doubles every seven years, so $1,000 can become around $2,000, then $4,000, then $8,000 across the decades.",
          "This is why time is a young investor's greatest advantage - far more powerful than picking hot stocks. Someone who starts investing modest amounts in their teens or twenties can end up wealthier than someone who invests much larger sums starting in their forties, simply because their money had more years to compound. The early dollars do the heaviest lifting, because they get to double the most times. Every year you delay is a doubling you give up at the far end, where the numbers are largest.",
          "Compounding also rewards leaving your money alone. Every time you sell, you may trigger taxes and fees that shrink the base that's compounding, and you risk missing the market's best days, which often cluster right after scary drops. A famous finding is that missing just a handful of the strongest days over decades can slash your total return dramatically. The investor who stays calmly invested through ups and downs usually beats the one who jumps in and out trying to time every move. Studies of real accounts repeatedly show that frequent traders, on average, earn less than patient buy-and-hold investors, even though they work far harder at it. Doing less, once you own good, diversified investments, is often the smartest move you can make."
        ],
        bullets: [
          "Compounding means earning returns on your past returns.",
          "At about 10% a year, money roughly doubles every seven years.",
          "Starting young beats investing more later, thanks to extra doublings.",
          "Selling often triggers taxes and fees that shrink your compounding base.",
          "Missing the market's best days can badly cut long-term returns."
        ],
        realWorldExample: "A teen who invests $2,000 and adds a little each year, earning average market returns, can retire with far more than a friend who starts the same plan twenty years later - even if the latecomer contributes bigger sums. Time did the heavy lifting."
      },
      {
        type: "concept",
        title: "Patience, Temperament, and Staying the Course",
        paragraphs: [
          "Long-term investing is as much about temperament as intelligence. The market will fall sharply many times over your lifetime, and each drop feels like an emergency demanding action. But history shows that broad markets have recovered from every crash so far and gone on to new highs. The investor who panics and sells at the bottom locks in the loss; the one who holds - or keeps buying - typically recovers and gains. Your worst enemy is usually not the market but your own fear and impatience.",
          "A few simple habits make patience easier. Investing a fixed amount on a regular schedule, called dollar-cost averaging, means you automatically buy more shares when prices are low and fewer when high, without agonizing over timing. Diversifying across many companies - often through a low-cost index fund that holds hundreds of stocks - protects you when any single business stumbles. And keeping fees low matters enormously, because a 1% yearly fee, compounded over decades, can quietly consume a large chunk of your final wealth.",
          "Perhaps the hardest discipline is ignoring the noise. Financial media thrives on drama, urging you to react to every headline, forecast, and hot tip. Most of it is irrelevant to a decades-long plan and often harmful, nudging you to trade when you shouldn't. The most successful everyday investors tend to be almost boring: they pick a sensible, diversified plan, keep contributing through good times and bad, and let compounding do its slow, powerful work. Wealth-building rewards consistency far more than cleverness or excitement."
        ],
        bullets: [
          "Markets have recovered from every crash so far and reached new highs.",
          "Panic-selling at the bottom locks in losses; holding tends to recover.",
          "Dollar-cost averaging buys more when prices are low, less when high.",
          "Diversifying and keeping fees low protect long-term wealth.",
          "Ignoring media noise helps you stick to a decades-long plan."
        ],
        realWorldExample: "An investor who kept adding to a diversified index fund straight through a major crash saw the account plunge, then fully recover and climb to record highs within a few years - while a neighbor who sold in panic never rejoined and missed the rebound."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "valuation7-mc1",
            question: "What does 'compounding' mean?",
            options: [
              "Paying extra tax on every trade",
              "Earning returns on your past returns",
              "Selling stocks as fast as possible",
              "Borrowing money to buy more shares"
            ],
            correctAnswer: 1,
            explanation: "Compounding is earning returns on prior returns, so growth accelerates. It's not about extra taxes, rapid selling, or borrowing to invest."
          },
          {
            id: "valuation7-mc2",
            question: "Why is starting to invest young so powerful?",
            options: [
              "Young people pay no taxes at all",
              "Early money gets more time",
              "Stocks only rise for young investors",
              "Older investors are banned from markets"
            ],
            correctAnswer: 1,
            explanation: "Early dollars get the most years to double, doing the heaviest lifting. It's not about tax exemptions, guaranteed rises, or age bans."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Friends and a Market Crash",
        narrative: "Priya and Sam each hold diversified index funds when the market suddenly drops 30%. Priya panics and sells everything to 'stop the bleeding,' vowing to buy back once things feel safe. Sam feels the same fear but keeps his money invested and even continues his monthly contributions. Over the next few years, the market recovers and reaches new highs.",
        details: [
          "Priya locked in her losses by selling at the bottom of the drop.",
          "Sam's automatic contributions bought extra shares while prices were low.",
          "The market's best rebound days often cluster right after big drops.",
          "Sam's patience and dollar-cost averaging left him far ahead of Priya."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "valuation7-aq1",
          question: "Why did Sam likely end up far ahead of Priya after the crash?",
          options: [
            "He predicted the exact market bottom",
            "He stayed invested and kept buying",
            "He avoided all taxes on his gains",
            "He borrowed money to buy more"
          ],
          correctAnswer: 1,
          explanation: "Sam held through the drop and kept buying cheap shares, capturing the rebound. He didn't time the bottom, dodge all taxes, or use borrowed money."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Compounding earns returns on returns, so wealth snowballs over time.",
          "Starting young beats investing more later, thanks to extra doublings.",
          "Markets have recovered from every crash; panic-selling locks in losses.",
          "Dollar-cost averaging, diversification, and low fees protect wealth.",
          "Ignore media noise and stay consistent to let compounding work."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "valuation7-mastery1",
            question: "At about 10% a year, money roughly doubles every…",
            options: [
              "Six months",
              "Seven years",
              "Fifty years",
              "One year"
            ],
            correctAnswer: 1,
            explanation: "The rule of thumb: dividing 72 by 10% gives about seven years to double. It's not six months, one year, or fifty years."
          },
          {
            id: "valuation7-mastery2",
            question: "Why does starting young usually beat investing more later?",
            options: [
              "Young investors face no market risk",
              "Early money compounds for more years",
              "Stocks are cheaper only for the young",
              "Older money grows twice as fast"
            ],
            correctAnswer: 1,
            explanation: "Extra years mean extra doublings, so early dollars do the heaviest lifting. Youth doesn't remove risk, cut prices, or slow older money."
          },
          {
            id: "valuation7-mastery3",
            question: "What is dollar-cost averaging?",
            options: [
              "Selling everything when prices fall",
              "Investing a fixed amount regularly",
              "Buying only the single cheapest stock",
              "Timing the market's exact bottom"
            ],
            correctAnswer: 1,
            explanation: "Investing a set amount regularly buys more shares when cheap and fewer when pricey. It's not panic-selling, single-stock picking, or market timing."
          },
          {
            id: "valuation7-mastery4",
            question: "An investor who panic-sells at the bottom of a crash usually…",
            options: [
              "Beats those who stayed invested",
              "Locks in losses, misses rebounds",
              "Pays no fees or taxes at all",
              "Guarantees a quick large profit"
            ],
            correctAnswer: 1,
            explanation: "Selling at the bottom makes losses permanent and risks missing the best recovery days. It doesn't beat holders, avoid costs, or lock in gains."
          },
          {
            id: "valuation7-mastery5",
            question: "Why does a 1% yearly fee matter so much over decades?",
            options: [
              "Fees are refunded at retirement",
              "Compounded, it eats much wealth",
              "It only applies in the first year",
              "Fees make markets rise faster"
            ],
            correctAnswer: 1,
            explanation: "A recurring fee compounds against you, quietly consuming a big share of final wealth. It isn't refunded, one-time, or a boost to returns."
          },
          {
            id: "valuation7-mastery6",
            question: "The most successful everyday investors tend to be…",
            options: [
              "Constantly trading on every headline",
              "Consistent and boring",
              "Focused only on one hot stock",
              "Quick to sell at the first bad news"
            ],
            correctAnswer: 1,
            explanation: "Steady, diversified, low-fee contributing lets compounding work over decades. Frequent trading, single stocks, and quick selling tend to hurt returns."
          }
        ]
      }
    ]
  },
]
