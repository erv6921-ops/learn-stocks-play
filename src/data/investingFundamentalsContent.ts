import { StructuredLessonContent } from "@/types"

export const investingFundamentalsContent: StructuredLessonContent[] = [
  // ═══════════════════════════════════════════════
  // INVFUND-1: Why Investing Beats Saving
  // ═══════════════════════════════════════════════
  {
    lessonId: "invfund-1",
    sections: [
      {
        type: "concept",
        title: "Why Your Savings Account Is Losing Money",
        paragraphs: [
          "Most people think putting money in a savings account is the safest thing to do. And it is safe - your money won't disappear. But here's the problem: inflation quietly eats away at the value of your cash every single year.",
          "Inflation is the gradual increase in prices over time. If inflation is 3% per year and your savings account earns 0.5% interest, your money is actually losing 2.5% of its purchasing power every year. That means the $100 you save today might only buy $78 worth of goods in 10 years.",
          "Investing means putting your money to work in assets - like stocks, bonds, or funds - that have historically grown faster than inflation. Over the last 100 years, the U.S. stock market has averaged roughly 10% annual returns before inflation. That's the difference between your money shrinking and your money multiplying."
        ],
        bullets: [
          "Inflation averages about 3% per year, eroding the value of idle cash",
          "Most savings accounts pay 0.01% to 0.5% interest - far below inflation",
          "The stock market has historically returned about 10% per year on average",
          "Investing is how you make your money grow faster than prices rise",
          "Starting early gives you more time for your investments to compound"
        ],
        realWorldExample: "In 2004, a movie ticket cost about $6.25. By 2024, the same ticket costs over $11. If you had kept $100 in a piggy bank in 2004, you could buy 16 tickets. Twenty years later, that same $100 only buys 9 tickets. Your money didn't shrink - but its purchasing power did. That's inflation in action."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund1-mc1",
            question: "If inflation is 3% per year and a savings account pays 0.5% interest, what is happening to your purchasing power?",
            options: [
              "It is growing at a slow but positive rate of 0.5% annually",
              "It is staying exactly the same since the account earns interest",
              "It is shrinking by about 2.5% per year in real terms",
              "It is growing at 3.5% per year when both rates are combined"
            ],
            correctAnswer: 2,
            explanation: "Your real return is interest minus inflation: 0.5% - 3% = -2.5%. Even though your account balance goes up slightly, the things you can buy with that money cost more each year. Over time, your cash buys less and less."
          },
          {
            id: "invfund1-mc2",
            question: "Why has the stock market historically been a better long-term choice than a savings account?",
            options: [
              "Stocks are guaranteed to go up every single calendar year",
              "Stock market returns have historically outpaced inflation significantly",
              "Savings accounts charge hidden fees that stocks do not have",
              "The government subsidizes stock market investments for all citizens"
            ],
            correctAnswer: 1,
            explanation: "The stock market has averaged roughly 10% annual returns over the past century, far exceeding the ~3% average inflation rate. Stocks aren't guaranteed to go up every year - but over long periods, they've consistently beaten inflation and savings accounts."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Cousins, Two Paths: Anika & David",
        narrative: "Anika and David each receive $10,000 from their grandmother on their 18th birthday. Anika puts hers in a savings account earning 0.5% interest. David invests his in a diversified stock index fund averaging 8% annual returns. Twenty years later, at age 38, Anika's savings account holds $11,049. David's investment portfolio is worth $46,610.",
        details: [
          "Anika's $10,000 grew by only $1,049 over 20 years - barely keeping up with inflation",
          "David's $10,000 grew by $36,610 - more than 4x his original amount",
          "The difference between them: $35,561 - all from choosing to invest instead of save",
          "David didn't do anything complicated - he simply invested in a basic index fund and waited",
          "If inflation averaged 3% over those 20 years, Anika's $11,049 actually lost purchasing power"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund1-aq1",
          question: "Based on the scenario, why did David's money grow so much more than Anika's?",
          options: [
            "David received a higher initial gift from their grandmother",
            "David took on more risk which allowed him to avoid paying taxes",
            "David's investment earned returns that significantly outpaced inflation",
            "David added extra money to his account every month unlike Anika"
          ],
          correctAnswer: 2,
          explanation: "Both started with the same $10,000. The difference was entirely in where the money was placed. David's index fund returned ~8% per year, far outpacing inflation and Anika's 0.5% savings rate. Over 20 years, that difference compounded into a $35,000+ gap. This is why investing - not just saving - is essential for building wealth."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Inflation erodes the purchasing power of cash sitting in savings accounts",
          "A savings account earning less than inflation means you're losing real value",
          "The stock market has historically returned ~10% per year, outpacing ~3% inflation",
          "Investing early gives your money decades to compound and grow",
          "You don't need to be a financial expert - a simple index fund can outperform savings"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "invfund1-mastery1",
            question: "A student keeps $5,000 in a savings account earning 0.4% interest while inflation runs at 3.2% per year. After one year, what has happened?",
            options: [
              "The student earned $160 in real purchasing power gains",
              "The student's balance grew but their purchasing power decreased",
              "The student lost money because the bank charged inflation fees",
              "The student broke even because interest and inflation cancel out"
            ],
            correctAnswer: 1,
            explanation: "The account balance grew by $20 (0.4% of $5,000), but inflation reduced purchasing power by about $160 (3.2% of $5,000). The net result is a loss of about $140 in real purchasing power, even though the account shows a higher balance."
          },
          {
            id: "invfund1-mastery2",
            question: "Which statement best explains why investing in stocks has historically beaten savings accounts?",
            options: [
              "Stocks offer government-backed insurance similar to FDIC coverage",
              "Stock prices always increase year over year without any exceptions",
              "Stocks represent ownership in businesses that grow and generate profits",
              "Banks deliberately keep savings rates low to discourage saving money"
            ],
            correctAnswer: 2,
            explanation: "When you buy stock, you own part of a business. As that business grows revenue and profits, the value of your ownership stake grows too. Over long periods, the collective growth of businesses in the economy has produced returns far exceeding savings account interest rates."
          },
          {
            id: "invfund1-mastery3",
            question: "If someone invested $10,000 at age 20 and earned an average of 8% per year, approximately how much would they have at age 50?",
            options: [
              "About $34,000 - the money roughly triples over 30 years",
              "About $100,600 - compound growth accelerates over long periods",
              "About $24,000 - since 8% of $10,000 is $800 per year for 30 years",
              "About $18,000 - accounting for inflation reducing the real returns"
            ],
            correctAnswer: 1,
            explanation: "$10,000 × (1.08)^30 ≈ $100,627. This is the power of compound growth over decades. Notice how option C calculated simple interest ($800 × 30 = $24,000) - compound interest means you earn returns on your returns, which dramatically accelerates growth over time."
          },
          {
            id: "invfund1-mastery4",
            question: "A financial advisor says 'your savings account is safe but not risk-free.' What does this mean?",
            options: [
              "Banks can refuse to return your savings deposits at any time",
              "The FDIC insurance only covers the first $1,000 of each account",
              "Your money is protected from loss but not from inflation's erosion",
              "Savings accounts have higher hidden fees than investment accounts"
            ],
            correctAnswer: 2,
            explanation: "Your savings account balance is protected by FDIC insurance up to $250,000 - so it's 'safe' from bank failure. But it's not risk-free because inflation silently reduces what your dollars can actually buy. This is called 'purchasing power risk' - the risk that your money loses real value even though the number in your account stays the same or grows slightly."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // INVFUND-2: Compound Interest & the Rule of 72
  // ═══════════════════════════════════════════════
  {
    lessonId: "invfund-2",
    sections: [
      {
        type: "concept",
        title: "Interest Earning Interest: The Eighth Wonder of the World",
        paragraphs: [
          "Albert Einstein allegedly called compound interest 'the eighth wonder of the world.' Whether he actually said it or not, the concept is truly remarkable. Compound interest means you earn interest not just on your original money, but also on the interest you've already earned.",
          "Here's a simple example: You invest $1,000 at 10% annual interest. After year one, you have $1,100. In year two, you earn 10% on $1,100 (not just the original $1,000), giving you $1,210. Each year, the amount you earn grows because your base keeps getting bigger. This snowball effect is what turns small amounts into fortunes over time.",
          "The Rule of 72 is a quick shortcut to estimate how long it takes for your money to double. Simply divide 72 by your annual interest rate. At 8% returns, your money doubles every 9 years (72 ÷ 8 = 9). At 6%, it doubles every 12 years. This simple rule shows why even small differences in return rates matter enormously over decades."
        ],
        bullets: [
          "Simple interest = earning interest only on your original principal",
          "Compound interest = earning interest on your principal PLUS accumulated interest",
          "Rule of 72: divide 72 by the interest rate to estimate years to double",
          "At 8% returns, money doubles every ~9 years; at 12%, every ~6 years",
          "Time is the most important ingredient - starting early matters more than starting big"
        ],
        realWorldExample: "If you invest just $100 per month starting at age 18 at an average 8% annual return, by age 65 you would have approximately $528,000. If you wait until age 28 to start, you'd have only about $227,000 - less than half. Those first 10 years of compounding are worth over $300,000, even though you only contributed an extra $12,000 during that time."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund2-mc1",
            question: "What makes compound interest different from simple interest?",
            options: [
              "Compound interest uses a higher percentage rate than simple interest",
              "Compound interest earns returns on both the principal and past interest",
              "Simple interest compounds monthly while compound interest is annual",
              "Compound interest is only available through special premium accounts"
            ],
            correctAnswer: 1,
            explanation: "With simple interest, you only earn on your original amount. With compound interest, each period's interest becomes part of the base for the next period. This 'interest on interest' effect creates exponential growth over time."
          },
          {
            id: "invfund2-mc2",
            question: "Using the Rule of 72, approximately how long does it take money to double at a 6% annual return?",
            options: [
              "About 6 years - one year for each percentage point",
              "About 12 years - divide 72 by the interest rate",
              "About 18 years - multiply the rate by 3 for safety",
              "About 72 years - the rule uses the number directly"
            ],
            correctAnswer: 1,
            explanation: "The Rule of 72 says: 72 ÷ 6 = 12 years. This is an approximation, but it's remarkably accurate. At 6%, your $1,000 becomes roughly $2,000 in about 12 years, $4,000 in 24 years, and $8,000 in 36 years."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maya vs Ethan: The Cost of Waiting",
        narrative: "Maya starts investing $200 per month at age 18, earning an average 8% annual return. She stops contributing at age 28 - investing for only 10 years, contributing a total of $24,000. Ethan starts investing $200 per month at age 28 and continues until age 65 - investing for 37 years, contributing a total of $88,800. At age 65, Maya's portfolio is worth approximately $592,000. Ethan's is worth approximately $478,000.",
        details: [
          "Maya invested only $24,000 total but ended up with MORE money than Ethan",
          "Ethan invested $88,800 - nearly four times as much - but had LESS at 65",
          "Maya's secret weapon: her money had an extra 10 years to compound",
          "This demonstrates the extraordinary power of starting early",
          "Even stopping contributions, Maya's money kept growing for 37 additional years"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund2-aq1",
          question: "Why did Maya end up with more money than Ethan despite contributing far less?",
          options: [
            "Maya chose individual stocks that performed better than Ethan's funds",
            "Maya received a higher interest rate because she started her account first",
            "Maya's early contributions had more time to compound and earn returns",
            "Maya made fewer withdrawals from her account compared to Ethan overall"
          ],
          correctAnswer: 2,
          explanation: "Maya's contributions had up to 47 years to compound (from age 18 to 65), while Ethan's earliest contributions only had 37 years. Those extra years of compounding on Maya's initial investments generated more wealth than Ethan's much larger total contributions. Time in the market beats timing the market - and it beats contribution size too."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Compound interest means earning returns on your returns - creating exponential growth",
          "The Rule of 72: divide 72 by your rate of return to estimate doubling time",
          "Starting 10 years earlier can be worth more than doubling your monthly contributions",
          "Time is the most powerful factor in compound growth - more important than amount invested",
          "Even small amounts invested early can grow to significant sums over decades"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "invfund2-mastery1",
            question: "You invest $1,000 at 10% compound interest. How much do you earn in year two?",
            options: [
              "$100 - the same amount as year one since the rate stays constant",
              "$110 - because you earn 10% on $1,100 which includes year one's interest",
              "$200 - the interest doubles each year in a compound interest account",
              "$121 - because compound interest adds 21% in the second year automatically"
            ],
            correctAnswer: 1,
            explanation: "After year one, you have $1,100. In year two, 10% of $1,100 = $110. That's $10 more than year one's interest. This extra $10 is interest earned on interest - the essence of compounding. Each year, the gap grows wider."
          },
          {
            id: "invfund2-mastery2",
            question: "Using the Rule of 72, how many times would $5,000 double in 36 years at 8% annual returns?",
            options: [
              "Two times - resulting in approximately $20,000 at the end",
              "Four times - resulting in approximately $80,000 at the end",
              "Three times - money doubles every 6 years at an 8% growth rate",
              "Six times - the money doubles once every 6 years at this rate"
            ],
            correctAnswer: 1,
            explanation: "At 8%, money doubles every 9 years (72 ÷ 8 = 9). In 36 years: double at year 9 ($10,000), double at year 18 ($20,000), double at year 27 ($40,000), double at year 36 ($80,000). That's 4 doublings, turning $5,000 into roughly $80,000."
          },
          {
            id: "invfund2-mastery3",
            question: "An investor contributes $3,000 per year from age 22 to 32 (10 years), then stops. Another contributes $3,000 per year from age 32 to 62 (30 years). Both earn 7%. Who likely has more at 62?",
            options: [
              "The second investor - they contributed three times more total dollars",
              "They end up with approximately the same amount at age 62",
              "The first investor - their early contributions had more time to compound",
              "Neither can be determined without knowing the specific account type"
            ],
            correctAnswer: 2,
            explanation: "The first investor's $30,000 in contributions (10 years × $3,000) had up to 40 years to compound. The second investor's $90,000 in contributions (30 years × $3,000) had a maximum of 30 years. Because compounding accelerates with time, the earlier contributions can outweigh a much larger total invested later."
          },
          {
            id: "invfund2-mastery4",
            question: "Why is the Rule of 72 useful for everyday financial planning?",
            options: [
              "It tells you exactly how much money you will have at retirement age",
              "It provides a quick mental estimate for how fast investments will grow",
              "It helps you calculate the precise interest rate your bank is offering",
              "It determines the optimal age to start withdrawing from investments"
            ],
            correctAnswer: 1,
            explanation: "The Rule of 72 is a quick estimation tool - not a precise calculator. It lets you mentally compare investment options fast. Hearing '6% vs 8% return' might not sound like much, but the Rule of 72 shows you: one doubles every 12 years, the other every 9 years. That 3-year difference in doubling time creates massive gaps over decades."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // INVFUND-3: Stocks - Owning a Piece of a Business
  // ═══════════════════════════════════════════════
  {
    lessonId: "invfund-3",
    sections: [
      {
        type: "concept",
        title: "What It Means to Own Stock",
        paragraphs: [
          "When you buy a stock, you're not just buying a ticker symbol or a line on a chart. You are buying a tiny piece of a real company. If you own 100 shares of Apple, you literally own a fraction of every iPhone sold, every Apple Store, and every dollar of profit Apple earns.",
          "Companies are divided into shares - and each share represents equal ownership. The stock price reflects what people are willing to pay for one share at any given moment. Prices go up when more people want to buy (demand increases) and down when more people want to sell (supply increases).",
          "A company's stock price can move for many reasons: strong earnings reports, new product launches, economic conditions, or even social media hype. But over the long run, stock prices tend to follow the actual performance of the business - companies that grow revenue and profits tend to see their stock prices rise."
        ],
        bullets: [
          "A share of stock = a unit of ownership in a company",
          "Stock prices are determined by supply and demand in the market",
          "When a company does well, its stock price generally rises over time",
          "Shareholders may receive dividends - a share of the company's profits",
          "You don't need to be rich to buy stocks - many platforms allow fractional shares"
        ],
        realWorldExample: "In January 2010, Apple stock traded at about $7 per share (adjusted for all later stock splits). If a student had invested just $280 in 40 shares, by 2024 those shares would be worth over $7,000 - roughly 25x the original investment. And they would have collected hundreds of dollars in dividend payments along the way. That $280 turned into real wealth simply by owning a piece of a growing business."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund3-mc1",
            question: "What does it mean to 'own stock' in a company?",
            options: [
              "You have lent money to the company and they owe you interest",
              "You own a fractional piece of the company and its future profits",
              "You have a contract to work for the company at a guaranteed wage",
              "You have reserved the right to buy the company's products at a discount"
            ],
            correctAnswer: 1,
            explanation: "Stock = ownership. When you buy shares, you become a part-owner of that business. You benefit when the company grows (stock price rises) and may receive dividends (a share of profits). Lending money to a company is what bonds are for - that's a different type of investment."
          },
          {
            id: "invfund3-mc2",
            question: "What primarily determines a stock's price at any given moment?",
            options: [
              "The company's CEO sets the stock price each morning at market open",
              "A government agency reviews and assigns fair prices to all stocks",
              "The balance of buyers and sellers - supply and demand in the market",
              "The original price at the IPO plus accumulated annual interest charges"
            ],
            correctAnswer: 2,
            explanation: "Stock prices are set by the market - millions of buyers and sellers making decisions based on their views of a company's value. When more people want to buy than sell, the price rises. When more want to sell than buy, it falls. No single entity 'sets' the price."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jasmine's First Stock Purchase",
        narrative: "Jasmine, a high school junior, saved $500 from her part-time job. After learning about investing, she bought 10 shares of a big tech company at $50 per share. Over the next 8 years through college and her first job, she didn't touch the investment. The company kept launching new products and growing its services business. By the time Jasmine was 25, her 10 shares were worth $1,900 - nearly 4x her original investment.",
        details: [
          "Jasmine didn't need expert knowledge - she invested in a company she understood",
          "She practiced patience: she held through market dips and didn't panic sell",
          "Apple's business growth (more products, more revenue) drove the stock price higher",
          "She also received small dividend payments - cash just for being an owner",
          "Her total return far exceeded what a savings account would have produced"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund3-aq1",
          question: "What was the main reason Jasmine's investment grew over 8 years?",
          options: [
            "Apple's CEO guaranteed all investors a minimum annual return rate",
            "The government provided tax credits that increased her share value",
            "Apple grew its business, increasing revenue and profits over that period",
            "Jasmine actively traded her shares, buying low and selling high repeatedly"
          ],
          correctAnswer: 2,
          explanation: "Jasmine simply bought and held. The growth came from Apple expanding its product line, growing revenue, and increasing profits. Stock prices follow business performance over the long run. Jasmine didn't need to trade actively or have insider knowledge - she just needed patience and a growing company."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Stocks represent real ownership in real companies",
          "Stock prices are driven by supply and demand - and ultimately by business performance",
          "You don't need to be wealthy to start investing - fractional shares are available",
          "Long-term investors benefit from business growth and compound returns",
          "Patience is one of the most important qualities of a successful stock investor"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "invfund3-mastery1",
            question: "A company announces record-high quarterly profits. What is the most likely short-term effect on its stock price?",
            options: [
              "The price will decrease because profits mean the company is overvalued",
              "The price will likely increase as demand for the stock grows from investors",
              "The price will remain unchanged because profits are already factored in",
              "The price will be frozen by regulators until the earnings report is verified"
            ],
            correctAnswer: 1,
            explanation: "Strong earnings typically increase investor demand, pushing the stock price higher. However, if the market already expected those results, the effect might be smaller. This concept - that prices reflect expectations - is important for understanding how markets actually work."
          },
          {
            id: "invfund3-mastery2",
            question: "What is a dividend?",
            options: [
              "A fee charged by the brokerage for each stock trade you execute",
              "A cash payment made by a company to its shareholders from profits",
              "The difference between a stock's highest and lowest price in one day",
              "A mandatory tax payment shareholders must send to the government"
            ],
            correctAnswer: 1,
            explanation: "Dividends are distributions of a company's profits to shareholders. Not all companies pay dividends - some reinvest all profits back into growth. Companies like Apple, Coca-Cola, and Johnson & Johnson have long histories of paying regular dividends."
          },
          {
            id: "invfund3-mastery3",
            question: "Why might a stock price drop even if the company is still profitable?",
            options: [
              "Because the government periodically resets stock prices to prevent bubbles",
              "Because the company's profits were lower than what investors had expected",
              "Because profitable companies are required to buy back shares every quarter",
              "Because stock exchanges randomly adjust prices to maintain market balance"
            ],
            correctAnswer: 1,
            explanation: "Stock prices reflect expectations, not just current results. If a company earns $1 billion but investors expected $1.5 billion, the stock can fall despite being profitable. The market is always looking forward - pricing in what investors think will happen next."
          },
          {
            id: "invfund3-mastery4",
            question: "A student owns 50 shares of a company priced at $40 each. If the price rises to $52, what is their total gain?",
            options: [
              "$200 - calculated as 50 shares multiplied by the $4 average gain",
              "$600 - calculated as 50 shares multiplied by the $12 price increase",
              "$520 - calculated by multiplying the new share price by 10 shares",
              "$2,600 - calculated as the current total value of all their shares"
            ],
            correctAnswer: 1,
            explanation: "Gain = number of shares × price increase per share. 50 shares × ($52 - $40) = 50 × $12 = $600. Their total position went from $2,000 to $2,600, a gain of $600 or 30%."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // INVFUND-4: Bonds - Lending Your Money
  // ═══════════════════════════════════════════════
  {
    lessonId: "invfund-4",
    sections: [
      {
        type: "concept",
        title: "Bonds: When You Become the Lender",
        paragraphs: [
          "When you buy a stock, you become an owner. When you buy a bond, you become a lender. A bond is essentially a loan you give to a company or government. In exchange, they promise to pay you back with interest over a set period of time.",
          "Bonds are considered less risky than stocks because the payments are predictable - you know exactly how much interest you'll receive and when you'll get your money back. This is why bonds are called 'fixed income' investments. The tradeoff? Bonds typically offer lower returns than stocks over the long run.",
          "The key terms you need to know: the 'face value' (how much the bond is worth at maturity), the 'coupon rate' (the annual interest rate you receive), and the 'maturity date' (when the borrower pays you back the face value). A $1,000 bond with a 5% coupon pays you $50 per year until maturity."
        ],
        bullets: [
          "Bonds = loans you make to companies or governments in exchange for interest",
          "Stocks = ownership; Bonds = lending - fundamentally different relationships",
          "Bond payments are predictable (fixed income), unlike stock price changes",
          "Bonds are generally less risky than stocks but offer lower long-term returns",
          "Government bonds are considered the safest; corporate bonds pay higher interest"
        ],
        realWorldExample: "When the U.S. government needs to build roads, fund the military, or manage its budget, it borrows money by issuing Treasury bonds. If you buy a $1,000 U.S. Treasury bond with a 4% coupon rate, the government pays you $40 per year for the life of the bond, then returns your $1,000 at maturity. U.S. Treasury bonds are considered among the safest investments in the world because they're backed by the full faith of the U.S. government."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund4-mc1",
            question: "What is the fundamental difference between owning a stock and owning a bond?",
            options: [
              "Stocks can only be bought by institutions while bonds are for individuals",
              "Stocks represent ownership in a company while bonds represent a loan to one",
              "Stocks pay guaranteed interest while bonds fluctuate based on market demand",
              "Stocks are only issued by governments while bonds are issued by corporations"
            ],
            correctAnswer: 1,
            explanation: "Stockholders are owners who share in a company's success (and risk). Bondholders are lenders who receive fixed interest payments. This fundamental difference shapes the risk-return profile of each investment type."
          },
          {
            id: "invfund4-mc2",
            question: "When you buy a bond, what are you actually doing?",
            options: [
              "Buying a small ownership stake in the company",
              "Lending money to a company or government in return for interest",
              "Paying a fee to join a stock exchange",
              "Insuring your other investments against loss"
            ],
            correctAnswer: 1,
            explanation: "A bond is a loan: you lend money to the issuer, which pays you regular interest and returns your principal at maturity. That is different from a stock, which makes you a part-owner. Being a lender rather than an owner is a big reason bonds are generally steadier than stocks."
          }
        ]
      },
      {
        type: "scenario",
        title: "Margaret's Retirement Decision",
        narrative: "Margaret is 62 years old and about to retire. She has $500,000 in her retirement account. Her financial advisor suggests shifting 60% of her portfolio to bonds and keeping 40% in stocks. By moving $300,000 into bonds paying 4% annually, Margaret will receive $12,000 per year in predictable interest income - money she can count on for living expenses. The remaining $200,000 in stocks provides growth potential to combat inflation over her 20+ year retirement.",
        details: [
          "Margaret prioritized predictable income because she needs reliable cash flow in retirement",
          "Bonds provide $12,000/year in steady interest - like a paycheck replacement",
          "The 40% in stocks helps her portfolio keep growing to fight inflation",
          "A younger investor might keep 80-90% in stocks because they have decades to recover from dips",
          "The bond-heavy allocation makes sense because Margaret can't afford large short-term losses"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund4-aq1",
          question: "Why did Margaret's advisor recommend shifting more money into bonds as she approached retirement?",
          options: [
            "Bonds always outperform stocks over every time period measured",
            "Margaret needed predictable income and couldn't risk large stock market losses",
            "Bonds are tax-free which saves retirees money on their annual tax returns",
            "Federal law requires retirees to hold at least 60% of their portfolio in bonds"
          ],
          correctAnswer: 1,
          explanation: "As people approach retirement, they need reliable income and can't wait years for the stock market to recover from a crash. Bonds provide predictable interest payments - essential when you're living off your investments. A 25-year-old can ride out a market crash, but a 62-year-old needs that money now."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Bonds are loans you make to companies or governments - they pay you interest",
          "Stocks = ownership with higher risk/return; Bonds = lending with lower risk/return",
          "Bond key terms: face value, coupon rate, and maturity date",
          "Government bonds are safest; corporate bonds offer higher interest but more risk",
          "Bonds play a bigger role in portfolios as investors get closer to retirement"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "invfund4-mastery1",
            question: "A $1,000 corporate bond has a 6% coupon rate and matures in 10 years. How much total interest will the bondholder receive?",
            options: [
              "$60 - the coupon rate multiplied by the face value one time",
              "$600 - the bondholder receives $60 per year for 10 years",
              "$1,600 - the interest plus the returned face value combined",
              "$6,000 - the face value multiplied by the percentage and years"
            ],
            correctAnswer: 1,
            explanation: "Annual interest = $1,000 × 6% = $60 per year. Over 10 years: $60 × 10 = $600 in total interest. At maturity, the bondholder also gets the $1,000 face value back, making the total payout $1,600 - but the interest portion alone is $600."
          },
          {
            id: "invfund4-mastery2",
            question: "Why might an investor choose a corporate bond paying 6% over a government bond paying 3%?",
            options: [
              "Corporate bonds are backed by government insurance while Treasury bonds are not",
              "Corporate bonds offer higher interest to compensate for greater default risk",
              "Government bonds can only be purchased by large institutional investors",
              "Corporate bonds have no maturity date, allowing infinite interest collection"
            ],
            correctAnswer: 1,
            explanation: "Corporate bonds pay higher interest because there's a greater chance the company could default (fail to pay). Government bonds pay less because they're considered much safer. This difference in rates - called the 'risk premium' - compensates investors for taking on additional risk."
          },
          {
            id: "invfund4-mastery3",
            question: "A 25-year-old and a 60-year-old each have $100,000 to invest. Which allocation strategy makes the most sense?",
            options: [
              "Both should invest 100% in bonds for guaranteed safe returns",
              "The 25-year-old should hold more stocks; the 60-year-old more bonds",
              "Both should invest 100% in stocks for maximum long-term growth",
              "The 60-year-old should hold more stocks to make up for lost time"
            ],
            correctAnswer: 1,
            explanation: "The 25-year-old has 35-40 years until retirement - plenty of time to ride out stock market downturns and benefit from higher long-term returns. The 60-year-old needs stability and income soon, making bonds more appropriate. This principle - adjusting risk based on time horizon - is fundamental to portfolio construction."
          },
          {
            id: "invfund4-mastery4",
            question: "What happens if you hold a bond until its maturity date?",
            options: [
              "You receive the face value back plus all accumulated unpaid interest",
              "You receive the original face value back - the principal is returned",
              "The bond automatically converts into stock shares of the issuing company",
              "You must pay a maturity fee to the bond issuer to close the position"
            ],
            correctAnswer: 1,
            explanation: "At maturity, the bond issuer returns the face value (principal) to the bondholder. Throughout the bond's life, you received periodic interest payments. At maturity, you get your original investment back - assuming the issuer doesn't default. This predictable return of principal is a key feature that makes bonds less risky than stocks."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // INVFUND-5: Mutual Funds & ETFs
  // ═══════════════════════════════════════════════
  {
    lessonId: "invfund-5",
    sections: [
      {
        type: "concept",
        title: "The Power of Pooled Investing",
        paragraphs: [
          "Imagine you want to invest in 500 different companies to spread your risk, but you only have $500. Buying individual shares of 500 companies would be impossible. This is exactly the problem that mutual funds and ETFs solve - they pool money from thousands of investors to buy a diversified basket of stocks, bonds, or other assets.",
          "A mutual fund is managed by a professional fund manager who decides which stocks or bonds to buy and sell. An ETF (Exchange-Traded Fund) works similarly but trades on the stock exchange like a regular stock, making it easier to buy and sell throughout the day. Both give you instant diversification with a single purchase.",
          "One of the most popular ETFs tracks the S&P 500 - an index of the 500 largest U.S. companies. By buying one share of an S&P 500 ETF, you effectively own a tiny piece of Apple, Microsoft, Amazon, Google, and 496 other companies. This broad exposure means no single company's failure can wipe out your investment."
        ],
        bullets: [
          "Mutual funds and ETFs pool money from many investors to buy diversified portfolios",
          "Mutual funds trade once per day; ETFs trade throughout the day like stocks",
          "Index funds track a market index (like the S&P 500) instead of picking individual stocks",
          "Expense ratios are the annual fees charged - lower is generally better",
          "One S&P 500 ETF share gives you exposure to 500 of the largest U.S. companies"
        ],
        realWorldExample: "Since 1926, the S&P 500 index has returned an average of about 10% per year. Warren Buffett, one of the world's greatest investors, has repeatedly told everyday investors that a low-cost S&P 500 index fund is the best investment most people can make. He even bet $1 million that an S&P 500 index fund would outperform a group of hedge funds over 10 years - and he won."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund5-mc1",
            question: "What is the main advantage of buying an ETF instead of individual stocks?",
            options: [
              "ETFs are guaranteed by the government to never lose value",
              "ETFs provide instant diversification across many companies with one purchase",
              "ETFs pay higher dividends than any individual stock can offer",
              "ETFs are free to purchase while individual stocks charge trading fees"
            ],
            correctAnswer: 1,
            explanation: "The biggest benefit of ETFs is instant diversification. Instead of risking all your money on one company, an ETF spreads your investment across dozens or hundreds of companies. If one company fails, your overall portfolio is barely affected."
          },
          {
            id: "invfund5-mc2",
            question: "What is the key difference between a mutual fund and an ETF?",
            options: [
              "Mutual funds invest in stocks while ETFs only invest in government bonds",
              "Mutual funds trade once per day while ETFs trade throughout the day",
              "ETFs require a minimum investment of $10,000 while mutual funds have none",
              "Mutual funds are tax-free while ETFs are subject to capital gains taxes"
            ],
            correctAnswer: 1,
            explanation: "The primary operational difference is trading. ETFs trade on exchanges like stocks throughout market hours, so you can buy or sell at any time. Mutual funds only process trades once per day after the market closes. Both can hold similar investments inside them."
          }
        ]
      },
      {
        type: "scenario",
        title: "Carlos vs. Priya: One Stock vs. One Fund",
        narrative: "Carlos and Priya each invest $2,000 on the same day. Carlos puts all his money into a single tech stock he read about online. Priya buys shares of an S&P 500 ETF. Over the next 3 years, Carlos's stock drops 70% when the company loses a major lawsuit, leaving him with $600. Meanwhile, Priya's S&P 500 ETF grew 28% to $2,560 - even though some individual companies in the index performed poorly.",
        details: [
          "Carlos concentrated all his risk in one company - a single bad event destroyed his investment",
          "Priya's ETF contained 500 companies - the lawsuit that hurt Carlos's stock barely registered",
          "Even when some companies in the S&P 500 lost value, others gained, balancing the portfolio",
          "Priya didn't need to research individual companies or time the market at all",
          "The difference: $600 vs $2,560 - diversification protected Priya from concentrated risk"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund5-aq1",
          question: "Why did Priya's S&P 500 ETF continue growing even though some companies in it lost value?",
          options: [
            "The ETF manager removed any losing stocks from the fund automatically",
            "The gains from other companies in the fund offset the losses from a few",
            "The government subsidized any ETF losses to protect small investors",
            "Priya's ETF was a special type that only includes companies that always profit"
          ],
          correctAnswer: 1,
          explanation: "That's exactly how diversification works. In a fund holding 500 stocks, some will drop and others will rise. Historically, the overall market trends upward because the gains from growing companies outweigh the losses from struggling ones. This natural balancing effect is why index funds are so powerful."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Mutual funds and ETFs pool investor money for instant diversification",
          "ETFs trade like stocks throughout the day; mutual funds trade once daily",
          "Index funds (like S&P 500 ETFs) track a market index rather than picking individual stocks",
          "Diversification through funds protects you from any single company's failure",
          "Low-cost index funds have historically outperformed most actively managed funds"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "invfund5-mastery1",
            question: "An S&P 500 index fund tracks the performance of 500 large U.S. companies. If one company in the index goes bankrupt, what is the most likely impact?",
            options: [
              "The entire fund loses all its value since one component has failed",
              "The fund value barely changes because one company is a tiny fraction",
              "The fund manager must immediately return all investor money",
              "The fund automatically switches to tracking a different market index"
            ],
            correctAnswer: 1,
            explanation: "Each company represents roughly 0.2% of an equal-weight index (1/500). Even in a cap-weighted index, only the very largest companies have significant weight. One bankruptcy might cause a fraction of a percent decline - barely noticeable in the total fund. This is the protection diversification provides."
          },
          {
            id: "invfund5-mastery2",
            question: "Why did Warren Buffett recommend S&P 500 index funds over actively managed hedge funds?",
            options: [
              "Hedge funds are illegal for individual investors under current regulations",
              "Index funds charge lower fees and historically outperform most active managers",
              "The S&P 500 is guaranteed by the government to never decline in any year",
              "Hedge funds only invest in bonds which have lower returns than all stocks"
            ],
            correctAnswer: 1,
            explanation: "Buffett's famous bet proved that after subtracting fees, most professional fund managers fail to beat a simple, low-cost index fund. Active management charges 1-2% in annual fees, while index funds charge as little as 0.03%. Those fees compound over time and significantly reduce investor returns."
          },
          {
            id: "invfund5-mastery3",
            question: "What does the term 'expense ratio' mean when evaluating an ETF?",
            options: [
              "The one-time fee charged when you first purchase shares of the fund",
              "The annual percentage fee deducted from the fund to cover management costs",
              "The ratio comparing the fund's expenses to the investor's total annual income",
              "The percentage of profits that the fund manager keeps as a personal bonus"
            ],
            correctAnswer: 1,
            explanation: "The expense ratio is the annual fee expressed as a percentage of your investment. A 0.03% expense ratio means you pay $3 per year for every $10,000 invested. A 1.5% ratio means you pay $150 - fifty times more. Over decades, this difference can cost you tens of thousands of dollars."
          },
          {
            id: "invfund5-mastery4",
            question: "A student has $1,000 to invest and wants maximum diversification with minimum effort. Which approach is best?",
            options: [
              "Buy $100 worth of 10 different individual stocks they personally like",
              "Purchase shares of a total market index ETF covering thousands of stocks",
              "Keep the money in a high-yield savings account until they have more",
              "Invest all $1,000 in the single best-performing stock from last year"
            ],
            correctAnswer: 1,
            explanation: "A total market index ETF provides exposure to thousands of companies with one purchase and minimal fees. Buying 10 individual stocks provides some diversification but requires research, has higher risk, and still concentrates your portfolio. Index ETFs are the easiest path to broad diversification."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // INVFUND-6: Risk vs Return
  // ═══════════════════════════════════════════════
  {
    lessonId: "invfund-6",
    sections: [
      {
        type: "concept",
        title: "The Fundamental Tradeoff: Risk and Reward",
        paragraphs: [
          "Every investment involves a tradeoff between risk and return. Risk is the possibility that you could lose some or all of your money. Return is the profit you earn. The fundamental rule of investing is: higher potential returns come with higher risk, and lower-risk investments offer lower returns.",
          "A savings account is very low risk - your money is FDIC insured up to $250,000. But traditional accounts pay just 0.01% to 0.5% interest, and even high-yield accounts (~4-5%) barely outpace inflation long-term. At the other extreme, investing in a single startup stock could make you 1,000% returns or lose 100% of your money. Most investments fall somewhere in between these extremes.",
          "Volatility is a measure of how much an investment's price swings up and down. Stocks are volatile - they might drop 30% in a bad year but gain 40% in a good year. Bonds are less volatile - they rarely drop more than 5-10%. Understanding your tolerance for these swings is essential to choosing the right investments."
        ],
        bullets: [
          "Higher potential return = higher risk; lower risk = lower return",
          "Risk spectrum: savings accounts → bonds → stocks → individual startups",
          "Volatility measures how much prices swing - higher volatility = more risk",
          "Your risk tolerance depends on your time horizon, goals, and personality",
          "Diversification helps manage risk without necessarily sacrificing returns"
        ],
        realWorldExample: "During the 2008 financial crisis, the S&P 500 lost about 37% of its value in a single year. An investor with $100,000 saw their portfolio drop to $63,000. But by 2013 - just 5 years later - the market had fully recovered and surpassed pre-crisis levels. Investors who panicked and sold locked in their losses. Those who held on recovered everything and then some. This illustrates both the risk of stocks AND the reward of patience."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund6-mc1",
            question: "What is the fundamental relationship between risk and return in investing?",
            options: [
              "Higher risk investments always deliver higher returns without exception",
              "Higher potential returns generally require accepting higher levels of risk",
              "Risk and return are unrelated - returns depend only on how long you invest",
              "Lower risk investments actually produce higher returns over long periods"
            ],
            correctAnswer: 1,
            explanation: "Higher potential returns GENERALLY come with higher risk - but it's not guaranteed. Risk means you could earn more OR lose more. A startup stock might return 500% or go to zero. A bond might only return 4% but is far more predictable. The key word is 'potential' - higher risk creates the possibility of higher returns, not the certainty."
          },
          {
            id: "invfund6-mc2",
            question: "What does 'volatility' measure in the context of investing?",
            options: [
              "The total amount of money that has been invested in a specific asset",
              "How quickly you can sell an investment and convert it back to cash",
              "How much an investment's price fluctuates up and down over time",
              "The maximum possible loss an investor can experience in one calendar year"
            ],
            correctAnswer: 2,
            explanation: "Volatility measures the degree of price variation. A stock that swings between $90 and $110 is less volatile than one swinging between $50 and $150. Higher volatility means wider swings - which means both bigger potential gains AND bigger potential losses."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Investors During a Market Crash",
        narrative: "In March 2020, COVID-19 caused the stock market to crash 34% in just four weeks. Two friends - Jordan and Alex - each had $50,000 invested in stock index funds. Jordan panicked and sold everything, locking in a $17,000 loss. They moved the remaining $33,000 to a savings account. Alex was nervous but didn't sell. By December 2020 - just 9 months later - the market had fully recovered and reached new highs. Alex's portfolio was back to $54,000. Jordan's savings account held $33,050.",
        details: [
          "Jordan sold at the bottom and missed the recovery - turning a temporary drop into a permanent loss",
          "Alex's patience was rewarded: their $50,000 became $54,000 by year-end",
          "The gap between them: $20,950 - caused entirely by one emotional decision",
          "Market crashes are temporary; panic selling makes the losses permanent",
          "Alex understood that volatility is the price you pay for higher long-term returns"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund6-aq1",
          question: "What was Jordan's primary mistake during the 2020 market crash?",
          options: [
            "They invested in stock index funds instead of picking individual stocks",
            "They sold during the panic, turning a temporary loss into a permanent one",
            "They had too much money invested in total - $50,000 was too aggressive",
            "They failed to diversify across multiple different savings account providers"
          ],
          correctAnswer: 1,
          explanation: "Jordan's mistake wasn't in what they invested in - index funds are excellent long-term investments. The mistake was selling during the crash. Market downturns are temporary, but selling locks in the loss permanently. Alex held the same investment and fully recovered within months. Emotional selling is one of the most costly mistakes investors make."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Higher potential returns always come with higher risk - there's no free lunch",
          "Volatility (price swings) is the price you pay for higher expected stock returns",
          "Panic selling during crashes turns temporary drops into permanent losses",
          "Your time horizon is crucial - longer horizons can tolerate more risk",
          "Understanding your risk tolerance helps you build a portfolio you can stick with"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "invfund6-mastery1",
            question: "Which investment has the HIGHEST risk and HIGHEST potential return?",
            options: [
              "A U.S. government Treasury bond paying 4% annual interest",
              "A savings account at an FDIC-insured bank paying 0.5% interest",
              "Stock in a small startup company developing unproven new technology",
              "An S&P 500 index fund tracking the 500 largest U.S. public companies"
            ],
            correctAnswer: 2,
            explanation: "A small startup stock has the highest risk (the company could fail entirely, losing 100%) but also the highest potential return (if it succeeds, it could grow 10x-100x). Government bonds, savings accounts, and index funds all have lower risk-return profiles."
          },
          {
            id: "invfund6-mastery2",
            question: "An investor has 30 years until retirement. During a 25% market crash, what is generally the best course of action?",
            options: [
              "Sell everything immediately to prevent losses from getting any worse",
              "Stay invested and continue regular contributions since recovery is likely",
              "Move all money to cash and wait until the market is at new all-time highs",
              "Switch entirely to bonds since stocks have proven themselves too dangerous"
            ],
            correctAnswer: 1,
            explanation: "With 30 years until retirement, this investor has plenty of time for the market to recover. Historically, every major market crash has been followed by a recovery. Selling locks in losses, while continuing to invest during a crash means buying shares at lower prices - which boosts long-term returns."
          },
          {
            id: "invfund6-mastery3",
            question: "Two portfolios are compared over 10 years. Portfolio A returned 6% with minimal fluctuation. Portfolio B returned 10% but experienced 30% drops along the way. Which statement is most accurate?",
            options: [
              "Portfolio A is objectively better because it avoided all major losses",
              "Portfolio B is objectively better because it earned the highest total return",
              "Portfolio B earned more but required higher risk tolerance to hold through drops",
              "Both portfolios are identical in value because the returns eventually average out"
            ],
            correctAnswer: 2,
            explanation: "Portfolio B delivered higher returns but came with significant volatility. An investor who couldn't tolerate the 30% drops might have panic-sold and ended up worse off. The 'best' portfolio is one that matches your risk tolerance so you can actually hold it through tough periods. Higher returns don't help if you sell at the worst possible time."
          },
          {
            id: "invfund6-mastery4",
            question: "Why is a savings account considered 'low risk' even though inflation erodes its value?",
            options: [
              "Savings accounts are fully protected against inflation by federal law",
              "The nominal balance is protected - you won't see the number go down",
              "Banks promise to compensate savers if inflation exceeds 3% in a year",
              "Savings accounts automatically increase interest rates to match inflation"
            ],
            correctAnswer: 1,
            explanation: "A savings account is 'low risk' in the traditional sense - your $10,000 won't suddenly become $8,000. The number doesn't go down. But there's a hidden risk: purchasing power risk. If inflation is 3% and your savings earn 0.5%, you're losing 2.5% of real value per year. The risk is invisible but very real."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // INVFUND-7: Diversification
  // ═══════════════════════════════════════════════
  {
    lessonId: "invfund-7",
    sections: [
      {
        type: "concept",
        title: "Don't Put All Your Eggs in One Basket",
        paragraphs: [
          "Diversification is one of the most important principles in investing. It means spreading your money across different investments so that poor performance in one area doesn't destroy your entire portfolio. Think of it like this: if you carry all your eggs in one basket and drop it, you lose everything. But if you spread them across five baskets, dropping one only costs you 20%.",
          "There are several ways to diversify: across different stocks, across different industries (tech, healthcare, energy), across different asset types (stocks, bonds, real estate), and even across different countries. The more uncorrelated your investments are, the better your diversification protects you.",
          "Diversification doesn't eliminate risk entirely - during major crises, many investments can drop together. But it significantly reduces the impact of any single bad event. A tech crash hurts your tech stocks but might not affect your bond holdings or real estate investments."
        ],
        bullets: [
          "Diversification = spreading investments to reduce the impact of any single loss",
          "Diversify across stocks, industries, asset classes, and geographies",
          "Uncorrelated assets don't move together - when one falls, another may rise",
          "Index funds provide automatic diversification across hundreds of companies",
          "Diversification reduces risk without necessarily reducing expected returns"
        ],
        realWorldExample: "In 2022, the tech-heavy NASDAQ index dropped 33%. An investor holding only tech stocks (like Shopify, Meta, and Netflix) could have lost 50-75% of their portfolio. But an investor with a diversified portfolio - say 40% stocks, 30% bonds, 20% international, 10% real estate - might have only lost 15-20%. Same market, dramatically different outcomes, purely because of diversification."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund7-mc1",
            question: "What is the primary purpose of diversification in an investment portfolio?",
            options: [
              "To guarantee that your portfolio will never lose value in any year",
              "To reduce the impact of any single investment's poor performance",
              "To ensure that every investment in your portfolio earns the same return",
              "To maximize returns by concentrating on the highest-performing investments"
            ],
            correctAnswer: 1,
            explanation: "Diversification reduces the damage any single bad investment can cause. It doesn't guarantee profits or prevent all losses - but it ensures that one company's failure, one industry's downturn, or one country's recession won't devastate your entire financial position."
          },
          {
            id: "invfund7-mc2",
            question: "Which portfolio is most effectively diversified?",
            options: [
              "Five different tech stocks: Apple, Microsoft, Google, Meta, and Amazon",
              "A mix of U.S. stocks, international stocks, bonds, and real estate funds",
              "Ten shares of the single stock with the highest return over the past year",
              "Equal amounts in checking, savings, and money market accounts at one bank"
            ],
            correctAnswer: 1,
            explanation: "True diversification means spreading across different asset types AND industries. Five tech stocks are all in the same industry - they'll all drop during a tech sell-off. A mix of U.S. stocks, international stocks, bonds, and real estate spreads risk across multiple asset classes and geographies."
          }
        ]
      },
      {
        type: "scenario",
        title: "Kevin's All-Tech Portfolio in 2022",
        narrative: "Kevin was excited about the tech industry in 2021. He put his entire $20,000 investment portfolio into five tech stocks: Meta, Netflix, Shopify, Peloton, and Zoom. In 2022, the tech sector crashed. Meta dropped 65%, Netflix dropped 51%, Shopify dropped 75%, Peloton dropped 78%, and Zoom dropped 63%. Kevin's $20,000 portfolio shrank to approximately $5,400 - a loss of $14,600. His friend Sarah had $20,000 split across a total market ETF (60%), bond fund (25%), and international fund (15%). Sarah's portfolio dropped to about $16,400 - a loss of only $3,600.",
        details: [
          "Kevin's all-tech portfolio lost 73% of its value in one year",
          "Sarah's diversified portfolio lost only 18% - less than one-quarter of Kevin's loss",
          "Kevin's stocks were all in the same industry, so they all crashed together",
          "Sarah owned tech stocks too (through her total market ETF), but they were a small fraction",
          "Recovery: Kevin needed his stocks to triple just to get back to even; Sarah needed only a modest rebound"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund7-aq1",
          question: "Why was Kevin's portfolio so much more devastated than Sarah's during the 2022 tech crash?",
          options: [
            "Kevin chose companies that were fundamentally weaker than Sarah's selections",
            "Kevin's stocks were all in the same sector, so a tech downturn hit everything",
            "Sarah had access to professional investment advice that Kevin did not have",
            "Kevin invested more total money than Sarah, which increased his total losses"
          ],
          correctAnswer: 1,
          explanation: "Kevin's mistake was concentration, not stock selection. All five of his companies were in tech - so when the sector crashed, everything fell together. Sarah owned tech stocks too (inside her total market ETF), but they were offset by bonds and international stocks that didn't crash as hard. Diversification across sectors protected Sarah."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Diversification means spreading investments across different stocks, industries, and asset types",
          "Concentrated portfolios can produce higher returns but carry much higher risk",
          "True diversification requires owning assets that don't all move in the same direction",
          "Index funds provide automatic diversification across hundreds of companies",
          "Diversification is the only 'free lunch' in investing - it reduces risk without reducing expected returns"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "invfund7-mastery1",
            question: "An investor holds 10 stocks, all in the energy sector. Are they well diversified?",
            options: [
              "Yes - 10 stocks provides sufficient diversification for any individual investor",
              "No - all stocks are in the same sector and would likely drop together",
              "Yes - energy is a stable sector that historically does not experience crashes",
              "No - 10 stocks is too few; you need at least 50 to achieve diversification"
            ],
            correctAnswer: 1,
            explanation: "Holding 10 energy stocks is not diversification - it's concentration within one sector. If oil prices crash, all energy stocks tend to fall together. True diversification means spreading across different sectors (tech, healthcare, energy, finance) and ideally different asset classes (stocks, bonds, real estate)."
          },
          {
            id: "invfund7-mastery2",
            question: "During a global recession, what typically happens to a well-diversified portfolio?",
            options: [
              "It gains value because diversification completely eliminates all market risk",
              "It may still lose value but typically much less than a concentrated portfolio",
              "It is unaffected because bonds and real estate always rise during recessions",
              "It performs exactly like the overall stock market with no difference at all"
            ],
            correctAnswer: 1,
            explanation: "Diversification doesn't make you immune to losses during major downturns - most asset classes can fall during severe recessions. However, a diversified portfolio typically loses less because some assets (like high-quality bonds) tend to hold value or rise when stocks fall. The key benefit is reduced severity, not elimination of losses."
          },
          {
            id: "invfund7-mastery3",
            question: "Why is diversification sometimes called the 'only free lunch in investing'?",
            options: [
              "Because diversified funds never charge management fees to their investors",
              "Because it can reduce portfolio risk without necessarily lowering expected returns",
              "Because the government provides tax incentives exclusively for diversified portfolios",
              "Because diversified portfolios are guaranteed to outperform concentrated portfolios"
            ],
            correctAnswer: 1,
            explanation: "Nobel Prize-winning research showed that diversification can reduce a portfolio's risk (volatility) without reducing its expected return. This is rare in investing - usually reducing risk means accepting lower returns. Diversification achieves this by combining assets whose ups and downs partially offset each other."
          },
          {
            id: "invfund7-mastery4",
            question: "Which combination provides the BEST diversification for a stock portfolio?",
            options: [
              "Apple, Microsoft, Google, Amazon, and Meta from the U.S. tech industry",
              "A U.S. stock fund, an international stock fund, a bond fund, and a REIT fund",
              "Five different savings accounts spread across five separate banking institutions",
              "The top-performing stock from each of the past five calendar years combined"
            ],
            correctAnswer: 1,
            explanation: "Mixing U.S. stocks, international stocks, bonds, and real estate (REIT) provides diversification across asset classes, geographies, and risk profiles. Tech giants are all in one sector. Savings accounts aren't investments. Past winners may all be correlated. True diversification requires different types of assets that respond differently to market conditions."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // INVFUND-8: Bull vs Bear Markets
  // ═══════════════════════════════════════════════
  {
    lessonId: "invfund-8",
    sections: [
      {
        type: "concept",
        title: "Market Cycles: Bulls, Bears, and Staying the Course",
        paragraphs: [
          "The stock market moves in cycles. A 'bull market' is a period when stock prices are generally rising - investors are optimistic, the economy is growing, and confidence is high. A 'bear market' is the opposite - stock prices fall 20% or more from their peak, fear spreads, and investors start selling.",
          "Since 1928, the U.S. stock market has experienced about 26 bear markets. The average bear market lasts about 9.6 months and sees stocks fall about 36%. The average bull market lasts about 2.7 years and sees stocks rise about 114%. This means bull markets last much longer and deliver much larger gains than bear markets take away.",
          "The biggest danger during a bear market isn't the market dropping - it's investors making emotional decisions. When prices fall, fear takes over and people sell at the worst possible time. When prices rise, greed kicks in and people buy at inflated prices. Successful investing means understanding these cycles and staying disciplined through both."
        ],
        bullets: [
          "Bull market = rising prices, optimism, economic growth (averages 2.7 years)",
          "Bear market = prices falling 20%+ from peak, fear, selling (averages 9.6 months)",
          "Bear markets are shorter and smaller than bull markets - recovery always follows",
          "Investor psychology shifts between greed (buying high) and fear (selling low)",
          "The best strategy for most investors: stay invested through both cycles"
        ],
        realWorldExample: "In March 2020, COVID-19 triggered the fastest bear market in history - the S&P 500 dropped 34% in just 23 trading days. But it was also the shortest bear market ever. By August 2020 - just 5 months later - the market had fully recovered and hit new all-time highs. Investors who panic-sold in March missed one of the fastest recoveries in stock market history."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund8-mc1",
            question: "During a bear market, what tends to be the smartest move for a long-term investor?",
            options: [
              "Sell everything immediately to avoid any further losses",
              "Stay invested and keep contributing, since markets have historically recovered",
              "Borrow money to buy as much as possible right away",
              "Move all savings into a single stock that dropped the most"
            ],
            correctAnswer: 1,
            explanation: "Bear markets are painful but historically temporary - markets have recovered from every past downturn. Panic-selling locks in losses, while staying invested (and buying at lower prices) has rewarded patient investors. Trying to time the exact bottom almost never works."
          },
          {
            id: "invfund8-mc2",
            question: "Historically, how do bull markets compare to bear markets in duration?",
            options: [
              "Bear markets last about 3 times longer than the average bull market",
              "They are roughly equal in length, alternating every 12 to 18 months",
              "Bull markets last significantly longer and produce larger gains overall",
              "Bear markets last longer but cause smaller total losses than bull gains"
            ],
            correctAnswer: 2,
            explanation: "Bull markets average about 2.7 years with 114% gains. Bear markets average only 9.6 months with 36% losses. This massive asymmetry is why long-term investors benefit from staying in the market - the gains during good times far exceed the losses during bad times."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus and the March 2020 Crash",
        narrative: "Marcus, a college sophomore, had invested $3,000 in an S&P 500 ETF in January 2020. By March 23, his portfolio was worth only $1,980 - a 34% loss in just weeks. Terrified by news headlines predicting a global depression, Marcus sold everything. He planned to wait until 'things calmed down' to reinvest. By December 2020, the S&P 500 was up 67% from the March low. If Marcus had held on, his original $3,000 would have been worth $3,320. Instead, he had $1,980 in cash sitting in a savings account.",
        details: [
          "Marcus sold at the exact bottom - March 23, 2020 was the lowest point of the crash",
          "The recovery was swift: markets hit new all-time highs within 5 months of the bottom",
          "Marcus missed a 67% rally because he waited for the 'perfect' moment to re-enter",
          "His $1,340 loss was entirely caused by an emotional, fear-driven decision to sell",
          "He didn't lose money because of the market - he lost money because he reacted to the market"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund8-aq1",
          question: "What was Marcus's biggest mistake during the COVID-19 crash?",
          options: [
            "He invested in an S&P 500 ETF instead of choosing safer individual stocks",
            "He sold during the panic, turning a temporary decline into a permanent loss",
            "He invested his money in January instead of waiting for a better entry price",
            "He didn't invest enough money initially to withstand the percentage decline"
          ],
          correctAnswer: 1,
          explanation: "Marcus's ETF was a solid investment choice. His mistake was reacting emotionally to short-term volatility. The crash was temporary - every bear market in history has been followed by a recovery. By selling at the bottom, Marcus turned a temporary paper loss into a real, permanent loss and missed the recovery."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Bull markets (rising prices) last longer and produce larger gains than bear markets take away",
          "Bear markets (20%+ declines) are scary but temporary - recovery always follows",
          "The biggest risk during bear markets is your own emotional reaction, not the market itself",
          "Panic selling locks in losses and means you miss the inevitable recovery",
          "Time in the market beats timing the market - stay disciplined through both cycles"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "invfund8-mastery1",
            question: "If the stock market drops 15% from its recent high, this is technically called a:",
            options: [
              "Bear market - any significant decline qualifies as a bear market",
              "Market correction - a decline of 10-19% from the peak",
              "Market crash - any double-digit percentage loss in a short period",
              "Recession indicator - signaling the economy is about to contract"
            ],
            correctAnswer: 1,
            explanation: "A 10-19% decline is a 'correction.' A 20%+ decline is a 'bear market.' Corrections happen frequently - about once every 1-2 years on average. They're a normal and healthy part of market cycles, not a reason to panic."
          },
          {
            id: "invfund8-mastery2",
            question: "Why do most financial advisors recommend staying invested during bear markets?",
            options: [
              "Because bear markets always recover to new all-time highs within a month",
              "Because it is illegal to sell stocks during officially declared bear markets",
              "Because historically every bear market has been followed by a recovery and gains",
              "Because selling during bear markets triggers additional penalty taxes on losses"
            ],
            correctAnswer: 2,
            explanation: "Every single bear market in U.S. stock market history has been followed by a recovery. While the timing varies (some recover in months, others take years), the pattern is consistent. Selling during a bear market means you lock in losses and risk missing the early stages of recovery, which are often the most powerful gains."
          },
          {
            id: "invfund8-mastery3",
            question: "An investor buys stocks at market highs driven by excitement and sells at market lows driven by fear. This behavior is called:",
            options: [
              "Dollar-cost averaging - investing consistently regardless of market price",
              "Buying high and selling low - the opposite of a successful strategy",
              "Market timing - strategically entering and exiting based on predictions",
              "Value investing - purchasing stocks when they are priced below fair value"
            ],
            correctAnswer: 1,
            explanation: "Buying high (during euphoria) and selling low (during panic) is the most common and most costly mistake individual investors make. It's driven by emotion, not logic. The antidote is a disciplined, long-term strategy - like regular automatic investing - that removes emotion from the equation."
          },
          {
            id: "invfund8-mastery4",
            question: "The COVID-19 bear market in 2020 lasted approximately 33 days. What lesson does this teach about market timing?",
            options: [
              "Investors should always sell before a crisis and buy back 33 days later",
              "Short bear markets prove that stocks are risk-free long-term investments",
              "Recovery can happen so fast that missing even a few weeks can cost significantly",
              "Bear markets under 60 days should not count as real bear markets historically"
            ],
            correctAnswer: 2,
            explanation: "The 2020 crash and recovery happened so quickly that anyone who sold and waited for 'the right moment' to get back in likely missed most of the recovery. The best days in the stock market often occur right after the worst days. Missing just the 10 best days over a 20-year period can cut your returns in half."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // INVFUND-9: Reading a Stock Chart
  // ═══════════════════════════════════════════════
  {
    lessonId: "invfund-9",
    sections: [
      {
        type: "concept",
        title: "Making Sense of Stock Charts",
        paragraphs: [
          "A stock chart is a visual representation of a stock's price over time. The x-axis shows time (days, months, or years) and the y-axis shows the stock price. Learning to read a stock chart is like learning to read a map - it helps you understand where a stock has been and provides context for where it might be heading.",
          "Key elements of a stock chart include: the price line (showing the stock's price over time), volume bars (showing how many shares were traded), the 52-week high (the highest price in the past year), and the 52-week low (the lowest price in the past year). Volume is important because it tells you whether a price movement is supported by lots of trading activity or just a few trades.",
          "One of the most common mistakes new investors make is misinterpreting short-term dips as crashes. A stock dropping 5% in a day might look scary on a daily chart, but when you zoom out to a 5-year chart, that same dip might be invisible within a strong upward trend. Context and time frame matter enormously when reading charts."
        ],
        bullets: [
          "Stock charts show price movement over a chosen time period",
          "Volume bars indicate how many shares were traded - confirming the strength of price moves",
          "52-week high/low shows the price range over the past year",
          "Always zoom out: a 'crash' on a daily chart might be a tiny blip on a yearly chart",
          "Price charts show history, not the future - they're tools for context, not crystal balls"
        ],
        realWorldExample: "In September 2020, Apple's stock dropped about 20% in just three weeks - from $137 to $107. On a daily chart, it looked like a disaster. But if you zoomed out to a 5-year chart, Apple had risen from $27 to $107 - a 296% gain even AFTER the 20% drop. The 'crash' was just a tiny dip in a massive upward trend. By December 2020, Apple was back above $130."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund9-mc1",
            question: "What does 'volume' represent on a stock chart?",
            options: [
              "The total market value of all outstanding shares of the company",
              "The number of shares that were bought and sold during a time period",
              "The loudness of media coverage about the stock on financial news shows",
              "The percentage change in stock price compared to the previous trading day"
            ],
            correctAnswer: 1,
            explanation: "Volume tells you how many shares changed hands. High volume during a price increase suggests strong buyer conviction. High volume during a price drop suggests strong selling pressure. Low volume moves are less meaningful - the price change might be caused by just a few trades."
          },
          {
            id: "invfund9-mc2",
            question: "Why is it important to 'zoom out' when reading a stock chart?",
            options: [
              "Zooming out reveals hidden fees that brokers charge on every transaction",
              "A daily dip might look like a crash but appear insignificant on a longer chart",
              "Longer time frames show when the company will report its next earnings date",
              "Zoomed-out charts display insider trading information not visible on daily views"
            ],
            correctAnswer: 1,
            explanation: "Time frame changes everything. A 5% drop in one day looks alarming on a daily chart. But on a 10-year chart showing 300% total growth, that same drop is barely visible. Always check multiple time frames before making decisions based on short-term price movements."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tyler Misreads a Dip as a Crash",
        narrative: "Tyler checks his investment app and sees that his favorite stock dropped 8% today. The daily chart shows a sharp red line plummeting downward. Headlines scream 'Stock Plunges!' Tyler panics and sells all his shares at $46, taking a loss. His friend Maya sees the same drop but pulls up the 1-year chart. She notices the stock was at $32 just six months ago and has risen 43% since then. The 8% 'plunge' is really just a small pullback within a strong uptrend. Maya holds her shares. Two weeks later, the stock recovers to $51.",
        details: [
          "Tyler's mistake: he only looked at the daily chart and reacted to scary headlines",
          "Maya's approach: she zoomed out, saw the bigger picture, and stayed calm",
          "The 8% drop was normal - stocks regularly fluctuate 5-10% even in healthy uptrends",
          "Tyler sold at $46 and the stock recovered to $51 - he lost $5 per share by panicking",
          "Lesson: always look at multiple time frames before making investment decisions"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund9-aq1",
          question: "What did Maya do differently from Tyler that led to a better outcome?",
          options: [
            "Maya had invested in a different stock that performed better than Tyler's",
            "Maya checked the longer-term chart to understand the broader price trend",
            "Maya received insider information about the stock's upcoming price recovery",
            "Maya had a special trading account that protected her from daily price drops"
          ],
          correctAnswer: 1,
          explanation: "Maya simply looked at a broader time frame. The 1-year chart showed the 8% drop was a minor pullback in an otherwise strong uptrend. Tyler only saw the daily chart, which made the drop look catastrophic. Reading charts with proper context - zooming out to see the bigger picture - prevents emotional overreaction."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Stock charts show price history - use them for context, not as crystal balls",
          "Volume shows trading activity: high volume confirms the significance of a price move",
          "52-week high/low provides a range for how the stock has performed recently",
          "Always zoom out: what looks like a crash on a daily chart may be noise on a yearly chart",
          "Don't make investment decisions based on one chart time frame or scary headlines"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "invfund9-mastery1",
            question: "A stock drops 3% on very low trading volume. What does this suggest?",
            options: [
              "The company is about to go bankrupt and investors should sell immediately",
              "The price drop may not be significant because few shares were actually traded",
              "Low volume always means the stock price will recover the very next trading day",
              "The stock exchange is about to halt trading on this stock due to low activity"
            ],
            correctAnswer: 1,
            explanation: "Low-volume price moves are less meaningful. A 3% drop on heavy volume suggests broad selling pressure. A 3% drop on thin volume might just mean a few sellers moved the price temporarily. Volume is the 'conviction' behind a price move - more volume = more significance."
          },
          {
            id: "invfund9-mastery2",
            question: "A stock's 52-week high is $150 and its 52-week low is $80. The current price is $95. What can you determine from this?",
            options: [
              "The stock is trading closer to its yearly low than its yearly high currently",
              "The stock is guaranteed to return to $150 since it reached that level before",
              "The stock is overvalued because it has fallen significantly from its all-time peak",
              "The stock will reach $220 next year since it gained $70 from low to high this year"
            ],
            correctAnswer: 0,
            explanation: "The 52-week range tells you where the stock has traded relative to its recent history. At $95, it's closer to its low ($80) than its high ($150). This is informational - it doesn't predict future prices. The stock could continue falling below $80 or rally back toward $150. The range provides context, not predictions."
          },
          {
            id: "invfund9-mastery3",
            question: "An investor sees a stock drop 12% on a daily chart and considers selling. What should they check first?",
            options: [
              "Whether the stock's CEO has made any public statements on social media",
              "The stock's longer-term price chart to see if the drop is part of a larger trend",
              "How many social media influencers are currently recommending this exact stock",
              "Whether the stock was mentioned on financial news television channels today"
            ],
            correctAnswer: 1,
            explanation: "Before reacting to a daily price drop, zoom out. Check the 1-month, 6-month, and 1-year charts. A 12% daily drop is significant, but if the stock is up 80% over the past year, it might just be a temporary pullback. Context from longer time frames helps you make rational decisions instead of emotional ones."
          },
          {
            id: "invfund9-mastery4",
            question: "Why might a stock's price increase sharply on high volume after an earnings report?",
            options: [
              "The exchange automatically increases prices after companies report any earnings",
              "Many investors are buying because the earnings exceeded market expectations",
              "High volume always causes prices to increase regardless of the news content",
              "The company's CEO personally buys shares to boost the price after good news"
            ],
            correctAnswer: 1,
            explanation: "When a company reports earnings that beat expectations, many investors want to buy - increasing demand and pushing the price up. High volume confirms that this isn't just a few trades - it's widespread buying interest. The combination of rising price AND high volume suggests a strong, meaningful move."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // INVFUND-10: Building Your First Portfolio
  // ═══════════════════════════════════════════════
  {
    lessonId: "invfund-10",
    sections: [
      {
        type: "concept",
        title: "Asset Allocation: Building a Portfolio That Fits You",
        paragraphs: [
          "A portfolio is your collection of investments. Asset allocation is how you divide your money among different types of investments - stocks, bonds, cash, and others. The right allocation depends on three things: your age, your goals, and your risk tolerance.",
          "A common rule of thumb is '110 minus your age' in stocks. If you're 18, that means 92% stocks and 8% bonds. Why? Because at 18, you have 40+ years before retirement - plenty of time to ride out market crashes. A 60-year-old might hold 50% stocks and 50% bonds because they need stability and income soon.",
          "Within your stock allocation, you should diversify further: U.S. large-cap stocks, small-cap stocks, international stocks. Within bonds: government and corporate bonds of different maturities. This layered diversification - across AND within asset classes - creates a resilient portfolio that can weather almost any market environment."
        ],
        bullets: [
          "Asset allocation = how you split your money among stocks, bonds, cash, and other assets",
          "Younger investors can afford more stocks (higher risk, higher potential return)",
          "Older investors need more bonds (lower risk, predictable income)",
          "Rule of thumb: (110 - your age) = percentage in stocks",
          "Diversify within each asset class too - different sizes, sectors, and geographies"
        ],
        realWorldExample: "Vanguard's Target Retirement 2065 fund - designed for someone retiring around 2065 (today's 18-year-olds) - holds about 90% stocks and 10% bonds. Their Target Retirement 2025 fund - designed for someone retiring soon - holds about 50% stocks and 50% bonds. These funds automatically shift from aggressive to conservative as the retirement date approaches, demonstrating how asset allocation should change with age."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund10-mc1",
            question: "What three factors should determine your asset allocation?",
            options: [
              "Your credit score, current salary, and number of bank accounts you have",
              "Your age, financial goals, and how much risk you're comfortable taking",
              "The current stock market trend, interest rates, and recent news headlines",
              "Your favorite companies, industries you understand, and investment app ratings"
            ],
            correctAnswer: 1,
            explanation: "Asset allocation is personal. A young person saving for retirement can take more risk (more stocks) because they have decades to recover from downturns. Someone saving for a house purchase next year needs stability (more bonds/cash). Your risk tolerance - how well you sleep when markets drop - also matters."
          },
          {
            id: "invfund10-mc2",
            question: "Using the '110 minus your age' rule, what percentage of stocks should a 20-year-old hold?",
            options: [
              "20% - matching your age with your stock allocation percentage",
              "90% - calculated as 110 minus 20 equals 90 percent in stocks",
              "50% - the default balanced allocation for all age groups equally",
              "110% - using leverage to invest more than 100% of available funds"
            ],
            correctAnswer: 1,
            explanation: "110 - 20 = 90% stocks, 10% bonds. This aggressive allocation makes sense at 20 because you have 40+ years of investing ahead. That's enough time to recover from multiple market crashes and benefit from the higher long-term returns that stocks provide. As you age, you'd gradually shift more into bonds."
          }
        ]
      },
      {
        type: "scenario",
        title: "Three Students, Three Portfolios",
        narrative: "Three students - Layla, Ryan, and Zoe - each receive $5,000 to invest. Layla is risk-averse: she can't stand seeing her balance drop. She allocates 40% stocks ($2,000) and 60% bonds ($3,000). Ryan is moderate: he's comfortable with some fluctuation. He goes 70% stocks ($3,500) and 30% bonds ($1,500). Zoe is aggressive: she's 18 and won't need the money for 30+ years. She goes 90% stocks ($4,500) and 10% bonds ($500). Over the next year, stocks rise 15% and bonds rise 3%.",
        details: [
          "Layla's portfolio: $2,000 × 1.15 + $3,000 × 1.03 = $2,300 + $3,090 = $5,390 (7.8% return)",
          "Ryan's portfolio: $3,500 × 1.15 + $1,500 × 1.03 = $4,025 + $1,545 = $5,570 (11.4% return)",
          "Zoe's portfolio: $4,500 × 1.15 + $500 × 1.03 = $5,175 + $515 = $5,690 (13.8% return)",
          "Zoe earned the most, but in a bad stock year, she would also lose the most",
          "None of these allocations are 'wrong' - they match each student's risk tolerance and timeline"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund10-aq1",
          question: "Why is Layla's conservative 40/60 portfolio not a 'bad' allocation even though it earned the least?",
          options: [
            "Layla's portfolio actually earned the most when accounting for tax benefits",
            "Layla's allocation matches her risk tolerance so she can stick with it long-term",
            "Conservative portfolios always outperform aggressive ones over 20+ year periods",
            "Layla's bonds will automatically convert to stocks when the market improves"
          ],
          correctAnswer: 1,
          explanation: "The best portfolio is one you can actually hold through good times and bad. If Layla would panic-sell during a crash with 90% stocks, she'd end up worse than with a conservative allocation she can stick with. Matching your portfolio to your risk tolerance prevents the most costly mistake: selling at the bottom."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Asset allocation is the single most important investment decision you'll make",
          "Your age, goals, and risk tolerance should drive your stock/bond split",
          "Younger investors can afford to hold more stocks for higher long-term growth",
          "The best portfolio is one you can stick with through both bull and bear markets",
          "Diversify within asset classes too - across company sizes, sectors, and countries"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "invfund10-mastery1",
            question: "A 22-year-old just started their first job and wants to invest for retirement at 65. Which allocation is most appropriate?",
            options: [
              "100% bonds - safety is the most important consideration for any new investor",
              "50% stocks, 50% bonds - a balanced approach is always best for beginners",
              "85-90% stocks, 10-15% bonds - the long time horizon supports higher risk",
              "100% cash in savings - build a large cash reserve before investing anything"
            ],
            correctAnswer: 2,
            explanation: "With 43 years until retirement, this investor can weather many market cycles. A high stock allocation (85-90%) maximizes growth potential over that long horizon. The small bond allocation provides some stability. Over 40+ years, the higher expected returns from stocks compound into significantly more wealth than a conservative approach."
          },
          {
            id: "invfund10-mastery2",
            question: "Two investors both hold 80% stocks and 20% bonds. After a year, stocks grew 20% and bonds grew 2%. Their portfolio is now roughly 83% stocks and 17% bonds. What should they do?",
            options: [
              "Sell all stocks immediately because the portfolio is now too heavily weighted",
              "Rebalance by selling some stocks and buying bonds to return to the 80/20 target",
              "Add more stocks since they are performing well and momentum should continue",
              "Switch to 100% bonds since stocks had a good year and are likely due for a drop"
            ],
            correctAnswer: 1,
            explanation: "Rebalancing means selling some of what's grown (stocks) and buying more of what hasn't (bonds) to return to your target allocation. This enforces a 'buy low, sell high' discipline automatically. Without rebalancing, your portfolio gradually becomes riskier than you intended as stocks grow faster."
          },
          {
            id: "invfund10-mastery3",
            question: "Which factor is LEAST important when choosing your initial asset allocation?",
            options: [
              "Your age and how many years until you need the invested money",
              "Your emotional ability to handle seeing your portfolio decline in value",
              "What the stock market has done over the past week or current month",
              "Your specific financial goals such as retirement, house, or education fund"
            ],
            correctAnswer: 2,
            explanation: "Recent market performance is noise - it has no bearing on the right long-term allocation for you. Your age (time horizon), risk tolerance (emotional ability to handle drops), and financial goals should drive your allocation. Making allocation decisions based on recent market movements is reactive, not strategic."
          },
          {
            id: "invfund10-mastery4",
            question: "A student invests $5,000 with 90% stocks ($4,500) and 10% bonds ($500). Stocks drop 30% and bonds rise 5%. What is their approximate portfolio value?",
            options: [
              "About $3,675 - calculated as $4,500 reduced by 30% plus $500 increased by 5%",
              "About $3,150 - both stocks and bonds dropped by 30% during the crash",
              "About $4,250 - the bond gains mostly offset the losses on the stock side",
              "About $2,500 - a 30% stock drop reduces the entire portfolio by 50% total"
            ],
            correctAnswer: 0,
            explanation: "Stocks: $4,500 × 0.70 = $3,150. Bonds: $500 × 1.05 = $525. Total: $3,675 - a 26.5% portfolio loss. Notice how the 10% bond allocation slightly cushioned the blow. This illustrates why even aggressive portfolios benefit from some bond exposure - bonds often hold steady or rise when stocks crash, reducing overall volatility."
          }
        ]
      }
    ]
  }
]
