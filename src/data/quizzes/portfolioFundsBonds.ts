import type { LessonQuiz } from "../lessonQuizzes"

export const portfolioFundsBondsQuizzes: LessonQuiz[] = [
  // PORTFOLIO-1: Asset Allocation
  {
    lessonId: "portfolio-1",
    questions: [
      {
        id: "portfolio-1-q1",
        question: "What does 'asset allocation' mean?",
        options: [
          "Picking the single best stock available",
          "Dividing your money across investment categories",
          "Selling all investments during market drops",
          "Keeping every dollar in cash savings"
        ],
        correctAnswer: 1,
        explanation: "Asset allocation is how you split your money among categories like stocks, bonds, and cash. It's one of the biggest drivers of your long-term results."
      },
      {
        id: "portfolio-1-q2",
        question: "Which of these are the three classic asset classes?",
        options: [
          "Sneakers, trading cards, and video games",
          "Checking accounts, debit cards, and credit cards",
          "Gift cards, coupons, and store rewards points",
          "Stocks, bonds, and cash equivalents"
        ],
        correctAnswer: 3,
        explanation: "The three traditional asset classes are stocks, bonds, and cash. Each behaves differently, which is why mixing them helps balance risk and reward."
      },
      {
        id: "portfolio-1-q3",
        question: "Maya is 16 and investing for retirement decades away. Which allocation generally fits her time horizon?",
        options: [
          "Mostly stocks, with a smaller bond portion",
          "Entirely cash sitting in a checking account",
          "Mostly bonds, with almost no stocks held",
          "Half cash and half short-term bonds only"
        ],
        correctAnswer: 0,
        explanation: "With decades before she needs the money, Maya has time to ride out stock market swings. Stocks historically offer the highest long-term growth."
      },
      {
        id: "portfolio-1-q4",
        question: "A retiree needs their money within a few years. How should their allocation compare to a teenager's?",
        options: [
          "Exactly the same mix works for everyone",
          "More cryptocurrency and fewer bonds overall",
          "More bonds and cash, fewer stocks",
          "One hundred percent stocks for faster growth"
        ],
        correctAnswer: 2,
        explanation: "Shorter time horizons call for safer allocations. A retiree can't wait out a big stock crash, so bonds and cash protect money they'll need soon."
      },
      {
        id: "portfolio-1-q5",
        question: "Why do stocks and bonds usually get combined in one portfolio?",
        options: [
          "Brokerages legally require owning both types",
          "Bonds always earn more than stocks do",
          "They behave differently, smoothing overall returns",
          "Stocks cannot be purchased without bonds attached"
        ],
        correctAnswer: 2,
        explanation: "Stocks and bonds often move differently — when stocks fall, bonds frequently hold steadier. Combining them smooths the ride without giving up all growth."
      },
      {
        id: "portfolio-1-q6",
        question: "Which factor matters MOST when choosing your asset allocation?",
        options: [
          "Your time horizon and comfort with risk",
          "The brand of your investing app",
          "What your favorite influencer bought yesterday",
          "The color scheme of the fund's logo"
        ],
        correctAnswer: 0,
        explanation: "Allocation should match when you need the money and how much volatility you can handle. Apps and influencers don't know your personal situation."
      },
      {
        id: "portfolio-1-q7",
        question: "Jordan puts 100% of his savings into one tech stock. What allocation problem does this create?",
        options: [
          "His fees will be the highest possible",
          "He will owe extra taxes for concentration",
          "His account will be frozen by regulators",
          "His entire outcome depends on one company"
        ],
        correctAnswer: 3,
        explanation: "With everything in one stock, a single company's failure could wipe out Jordan's savings. Allocation spreads that risk across categories and holdings."
      },
      {
        id: "portfolio-1-q8",
        question: "Research suggests asset allocation explains much of a portfolio's long-term behavior. Why is that?",
        options: [
          "Regulators set returns based on allocation choices",
          "The mix of asset classes drives risk and return",
          "Individual stock picks never affect performance at all",
          "Allocation determines which taxes you must pay"
        ],
        correctAnswer: 1,
        explanation: "How much you hold in stocks versus bonds shapes your portfolio's swings and growth far more than most single picks. The category mix sets the overall pattern."
      }
    ]
  },

  // PORTFOLIO-2: Risk Tolerance
  {
    lessonId: "portfolio-2",
    questions: [
      {
        id: "portfolio-2-q1",
        question: "What is 'risk tolerance' in investing?",
        options: [
          "How much loss you can handle emotionally and financially",
          "The maximum deposit your broker allows",
          "The number of stocks you can name",
          "How fast you can sell an investment"
        ],
        correctAnswer: 0,
        explanation: "Risk tolerance is your ability — both emotionally and financially — to withstand drops in your investments without panicking or being harmed."
      },
      {
        id: "portfolio-2-q2",
        question: "Which investor likely has a HIGH risk tolerance?",
        options: [
          "Someone who needs the money next month",
          "Someone who checks prices hourly in fear",
          "Someone young who stays calm during 20% drops",
          "Someone who sells everything at bad news"
        ],
        correctAnswer: 2,
        explanation: "High risk tolerance means staying invested through big swings. A young investor with time and steady nerves can afford more volatility."
      },
      {
        id: "portfolio-2-q3",
        question: "Ava lost sleep for a week when her investments dropped 10%. What does this suggest?",
        options: [
          "She should borrow money to invest more",
          "She picked the wrong brokerage app entirely",
          "She needs to check prices more often",
          "Her portfolio may be too risky for her"
        ],
        correctAnswer: 3,
        explanation: "Losing sleep over normal market dips is a sign your allocation exceeds your emotional risk tolerance. Shifting toward safer assets can help her stay invested."
      },
      {
        id: "portfolio-2-q4",
        question: "How does your time horizon affect the risk you can take?",
        options: [
          "Time horizon only matters for cash accounts",
          "More time lets you recover from downturns",
          "Less time means you should take bigger risks",
          "Time horizon has zero effect on risk"
        ],
        correctAnswer: 1,
        explanation: "Markets have historically recovered from crashes given enough years. Longer horizons give your portfolio time to bounce back, supporting more risk."
      },
      {
        id: "portfolio-2-q5",
        question: "What's the difference between risk tolerance and risk capacity?",
        options: [
          "Tolerance is emotional comfort; capacity is financial ability",
          "Capacity only applies to real estate investing",
          "They are identical terms for one idea",
          "Tolerance is for bonds; capacity is stocks"
        ],
        correctAnswer: 0,
        explanation: "Tolerance is how much volatility you can stomach; capacity is how much loss your finances can actually absorb. Smart investors respect both limits."
      },
      {
        id: "portfolio-2-q6",
        question: "Why might taking TOO LITTLE risk be a problem for a teen investor?",
        options: [
          "Low-risk accounts are illegal for teenagers",
          "Safe investments always lose money every year",
          "Banks charge penalties for cautious investors",
          "Their money may grow too slowly to beat inflation"
        ],
        correctAnswer: 3,
        explanation: "Playing it too safe for decades means inflation can quietly erode buying power. Young investors usually need some stock growth to build real wealth."
      },
      {
        id: "portfolio-2-q7",
        question: "Liam is saving for a car he'll buy in eight months. What risk level fits this goal?",
        options: [
          "High risk, since crypto could double quickly",
          "Very low risk, like a savings account",
          "Maximum risk to grow the money fastest",
          "Medium risk in a stock index fund"
        ],
        correctAnswer: 1,
        explanation: "Money needed within a year shouldn't ride the stock market — a crash right before purchase would derail the goal. Short-term goals call for safe, stable places."
      },
      {
        id: "portfolio-2-q8",
        question: "Which question best helps you assess your own risk tolerance?",
        options: [
          "Which stock ticker symbol looks the coolest?",
          "What investments are trending on social media?",
          "How would I react if my portfolio fell 25%?",
          "How many apps do my friends use?"
        ],
        correctAnswer: 2,
        explanation: "Imagining your honest reaction to a serious drop reveals your true tolerance. If you'd panic-sell at minus 25%, you need a more conservative mix."
      }
    ]
  },

  // PORTFOLIO-3: Diversification
  {
    lessonId: "portfolio-3",
    questions: [
      {
        id: "portfolio-3-q1",
        question: "What is diversification?",
        options: [
          "Buying only the biggest company available",
          "Trading stocks several times every day",
          "Spreading investments across many different holdings",
          "Moving all money into gold bars"
        ],
        correctAnswer: 2,
        explanation: "Diversification means spreading money across many investments so no single failure can sink you. It's the classic 'don't put all your eggs in one basket.'"
      },
      {
        id: "portfolio-3-q2",
        question: "Which portfolio is the MOST diversified?",
        options: [
          "Hundreds of stocks and bonds across industries",
          "Ten shares of one gaming company",
          "Three different social media company stocks",
          "Two streaming services and one phone maker"
        ],
        correctAnswer: 0,
        explanation: "True diversification spans many companies AND industries. Three social media stocks would all crash together if that sector struggles."
      },
      {
        id: "portfolio-3-q3",
        question: "Zoe owns five stocks, all airline companies. Why is she NOT well diversified?",
        options: [
          "Five is more than the legal maximum",
          "One industry event could hurt all five",
          "Airlines are banned from stock exchanges",
          "Stocks only diversify when bought monthly"
        ],
        correctAnswer: 1,
        explanation: "All five stocks share the same industry risks — fuel prices, travel slumps, pandemics. Diversification requires spreading across different sectors, not just different tickers."
      },
      {
        id: "portfolio-3-q4",
        question: "How does diversification help during a market storm?",
        options: [
          "It guarantees you will never lose money",
          "It doubles your returns during every crash",
          "It lets you predict which stocks fall",
          "Losses in some holdings are cushioned by others"
        ],
        correctAnswer: 3,
        explanation: "Diversification doesn't eliminate losses, but when some holdings fall, others may hold up or gain, softening the overall blow."
      },
      {
        id: "portfolio-3-q5",
        question: "Beyond owning many stocks, what ELSE can you diversify across?",
        options: [
          "Different app icon colors and themes",
          "Asset classes, industries, and world regions",
          "Different passwords for each account",
          "Multiple usernames on one platform"
        ],
        correctAnswer: 1,
        explanation: "Real diversification spans asset classes (stocks, bonds), industries (tech, health, energy), and geographies (US and international markets)."
      },
      {
        id: "portfolio-3-q6",
        question: "What's the easiest way for a beginner to instantly diversify?",
        options: [
          "Buy a broad index fund holding many companies",
          "Purchase one share of ten meme stocks",
          "Split money between two rival sneaker brands",
          "Open accounts at five different banks"
        ],
        correctAnswer: 0,
        explanation: "A single broad index fund can hold hundreds or thousands of companies, giving instant diversification with one purchase — perfect for beginners."
      },
      {
        id: "portfolio-3-q7",
        question: "In 2000, employees who held only their employer's stock lost jobs AND savings when it collapsed. What lesson is that?",
        options: [
          "Never work for a public company",
          "Employees should avoid investing money entirely",
          "Stock markets should be avoided after 2000",
          "Avoid concentrating wealth in a single company"
        ],
        correctAnswer: 3,
        explanation: "Tying your paycheck and your savings to one company doubles your exposure. Diversifying away from any single company protects against exactly this disaster."
      },
      {
        id: "portfolio-3-q8",
        question: "Why can diversification REDUCE risk without destroying returns?",
        options: [
          "Different assets don't all move together at once",
          "Diversified funds are exempt from market crashes",
          "The government insures diversified portfolios fully",
          "More holdings always means higher fees paid"
        ],
        correctAnswer: 0,
        explanation: "Because assets don't move in lockstep, combining them cancels out some volatility while keeping the long-term growth of the whole group."
      }
    ]
  },

  // PORTFOLIO-4: Dollar-Cost Averaging
  {
    lessonId: "portfolio-4",
    questions: [
      {
        id: "portfolio-4-q1",
        question: "What is dollar-cost averaging (DCA)?",
        options: [
          "Buying only when prices hit record highs",
          "Converting dollars into foreign currency monthly",
          "Investing a fixed amount on a regular schedule",
          "Selling small amounts every single week"
        ],
        correctAnswer: 2,
        explanation: "DCA means investing the same dollar amount at regular intervals — like $50 every month — regardless of what the market is doing."
      },
      {
        id: "portfolio-4-q2",
        question: "With DCA, what happens automatically when prices FALL?",
        options: [
          "Your fixed amount buys MORE shares",
          "Your money stops being invested entirely",
          "Your fixed amount buys FEWER shares",
          "Your broker cancels the scheduled purchase"
        ],
        correctAnswer: 0,
        explanation: "When prices drop, the same $50 buys more shares. DCA automatically loads up when things are cheap — no timing skill required."
      },
      {
        id: "portfolio-4-q3",
        question: "Noah invests $25 from every paycheck into an index fund, whether markets are up or down. What is he practicing?",
        options: [
          "Day trading with technical chart analysis",
          "Panic selling during market volatility",
          "Short selling stocks he expects to fall",
          "Dollar-cost averaging on a steady schedule"
        ],
        correctAnswer: 3,
        explanation: "Investing a fixed amount every paycheck, ignoring market noise, is textbook dollar-cost averaging. Consistency is the whole strategy."
      },
      {
        id: "portfolio-4-q4",
        question: "A fund costs $10 in January and $5 in February. You invest $100 each month. How many total shares do you own?",
        options: [
          "Twenty shares in total",
          "Fifteen shares in total",
          "Thirty shares in total",
          "Twenty-five shares in total"
        ],
        correctAnswer: 2,
        explanation: "January: $100 ÷ $10 = 10 shares. February: $100 ÷ $5 = 20 shares. That's 30 total — the cheap month bought twice as many shares."
      },
      {
        id: "portfolio-4-q5",
        question: "What emotional trap does DCA help investors avoid?",
        options: [
          "Trying to time the market's highs and lows",
          "Spending too little money on entertainment",
          "Reading too many company annual reports",
          "Holding investments for too many years"
        ],
        correctAnswer: 0,
        explanation: "Most people buy high (excitement) and sell low (fear). DCA removes those emotional decisions by making investing automatic and scheduled."
      },
      {
        id: "portfolio-4-q6",
        question: "The market drops 15% and scary headlines are everywhere. What does a DCA investor do?",
        options: [
          "Sell everything until headlines improve again",
          "Keep buying on the normal schedule",
          "Switch all contributions into lottery tickets",
          "Pause investing until prices fully recover"
        ],
        correctAnswer: 1,
        explanation: "DCA means sticking to the plan — and drops are actually when your fixed contribution buys the most shares. Stopping during dips defeats the strategy."
      },
      {
        id: "portfolio-4-q7",
        question: "Why does DCA fit a student earning money from a part-time job?",
        options: [
          "Students get special DCA tax exemptions",
          "It requires a large lump sum upfront",
          "It only works with paper paychecks",
          "Small regular paychecks match small regular investing"
        ],
        correctAnswer: 3,
        explanation: "You don't need thousands saved up — DCA works with whatever you earn each pay period. Small consistent amounts build serious wealth over decades."
      },
      {
        id: "portfolio-4-q8",
        question: "How does DCA affect your average cost per share over time?",
        options: [
          "It guarantees the lowest possible price always",
          "It locks in the highest price permanently",
          "It tends to lower your average cost",
          "It has no effect on cost basis"
        ],
        correctAnswer: 2,
        explanation: "Because your fixed amount buys more shares when cheap and fewer when expensive, your average cost per share tends to be favorable over time."
      }
    ]
  },

  // PORTFOLIO-5: Rebalancing
  {
    lessonId: "portfolio-5",
    questions: [
      {
        id: "portfolio-5-q1",
        question: "What does 'rebalancing' a portfolio mean?",
        options: [
          "Adjusting holdings back to your target mix",
          "Depositing more cash into your account",
          "Switching to a totally new brokerage",
          "Selling everything and starting over completely"
        ],
        correctAnswer: 0,
        explanation: "Rebalancing means adjusting your holdings back to your target allocation — for example, restoring a 70/30 stock/bond split after markets shift it."
      },
      {
        id: "portfolio-5-q2",
        question: "Why do portfolios drift away from their target allocation?",
        options: [
          "Brokers secretly rearrange customer accounts overnight",
          "Taxes automatically remove shares each year",
          "Rebalancing software adds random new holdings",
          "Different assets grow at different speeds"
        ],
        correctAnswer: 3,
        explanation: "If stocks gain 20% while bonds gain 3%, stocks become a bigger slice of your portfolio than you planned. Growth rates differ, so weights drift."
      },
      {
        id: "portfolio-5-q3",
        question: "Your target is 70% stocks / 30% bonds, but a rally pushed you to 85% stocks. What does rebalancing involve?",
        options: [
          "Buying even more stocks while they're hot",
          "Selling some stocks and buying bonds",
          "Closing the account to reset it",
          "Moving everything into cash for safety"
        ],
        correctAnswer: 1,
        explanation: "Rebalancing restores your 70/30 target by trimming the overgrown stock portion and adding to bonds. You're back to your intended risk level."
      },
      {
        id: "portfolio-5-q4",
        question: "What smart discipline does rebalancing quietly enforce?",
        options: [
          "Trading daily to catch every price move",
          "Following whichever asset the news hypes",
          "Selling high and buying low, systematically",
          "Avoiding all taxes on investment gains"
        ],
        correctAnswer: 2,
        explanation: "Rebalancing forces you to trim what has risen (selling high) and add to what has lagged (buying low) — the opposite of emotional investing."
      },
      {
        id: "portfolio-5-q5",
        question: "How often do experts commonly suggest checking whether to rebalance?",
        options: [
          "Every hour the market is open",
          "Only once in your entire lifetime",
          "Every single trading day without fail",
          "Around once or twice a year"
        ],
        correctAnswer: 3,
        explanation: "Most advisors suggest reviewing annually or when allocations drift past a set threshold, like 5%. Constant tinkering adds costs without benefits."
      },
      {
        id: "portfolio-5-q6",
        question: "What risk builds up if you NEVER rebalance?",
        options: [
          "Your portfolio can become riskier than you intended",
          "Your account gets closed for inactivity",
          "Your shares expire and lose all value",
          "Your dividends stop being paid out"
        ],
        correctAnswer: 0,
        explanation: "Unchecked, winning assets keep growing their share, so a 70/30 portfolio can quietly become 90/10 — far more aggressive than you chose."
      },
      {
        id: "portfolio-5-q7",
        question: "Besides selling winners, how can a teen with regular deposits rebalance?",
        options: [
          "Withdraw everything and redeposit it later",
          "Direct new contributions toward underweight assets",
          "Email the fund manager a request",
          "Buy more of whatever grew fastest"
        ],
        correctAnswer: 1,
        explanation: "Steering new money into whichever asset is below target rebalances without selling anything — avoiding taxes and trading costs entirely."
      },
      {
        id: "portfolio-5-q8",
        question: "Emotionally, why is rebalancing hard for many investors?",
        options: [
          "The math requires advanced calculus skills",
          "Brokerages charge enormous fees to rebalance",
          "It only works during market holidays",
          "It means trimming assets that feel like winners"
        ],
        correctAnswer: 3,
        explanation: "Selling what's been soaring feels wrong in the moment. But that discipline — trimming winners before they crash back — is exactly what protects you."
      }
    ]
  },

  // PORTFOLIO-6: Index Investing
  {
    lessonId: "portfolio-6",
    questions: [
      {
        id: "portfolio-6-q1",
        question: "What is a market index, like the S&P 500?",
        options: [
          "A government tax on stock trades",
          "A list of companies measuring market performance",
          "A password for your brokerage account",
          "A fee charged by fund managers"
        ],
        correctAnswer: 1,
        explanation: "An index is a measuring stick — a defined list of stocks (like 500 large US companies) whose combined performance tracks the market."
      },
      {
        id: "portfolio-6-q2",
        question: "What does an index FUND try to do?",
        options: [
          "Beat the market through expert stock picking",
          "Avoid stocks completely and hold cash",
          "Match the index's holdings and returns",
          "Double the index's return every year"
        ],
        correctAnswer: 2,
        explanation: "Index funds simply copy their index — holding the same stocks in the same proportions — to deliver the market's return, minus tiny fees."
      },
      {
        id: "portfolio-6-q3",
        question: "Why are index funds usually much cheaper than actively managed funds?",
        options: [
          "No expensive team is picking stocks",
          "The government pays their operating costs",
          "They hold fewer than ten stocks",
          "They only trade on weekends"
        ],
        correctAnswer: 0,
        explanation: "Tracking a list is cheap; paying analysts and managers to hunt for winners is expensive. That's why index fund fees can be near zero."
      },
      {
        id: "portfolio-6-q4",
        question: "Priya, 17, wants to invest but has no time to research companies. Why might index investing suit her?",
        options: [
          "Index funds require daily monitoring and trading",
          "Index funds are only sold to teenagers",
          "Index funds guarantee profits every single month",
          "One fund gives broad exposure with minimal effort"
        ],
        correctAnswer: 3,
        explanation: "Index funds are built for hands-off investors: one purchase spreads her money across hundreds of companies with no research required."
      },
      {
        id: "portfolio-6-q5",
        question: "If the S&P 500 rises 10% this year, what should an S&P 500 index fund roughly return?",
        options: [
          "Exactly zero percent in flat markets",
          "About twenty percent, doubling the index",
          "About ten percent, minus small fees",
          "Negative ten percent, mirroring inversely"
        ],
        correctAnswer: 2,
        explanation: "Index funds mirror their benchmark, so a 10% index gain means roughly a 10% fund gain, with only a tiny fee subtracted."
      },
      {
        id: "portfolio-6-q6",
        question: "What long-term evidence supports index investing?",
        options: [
          "Most active funds fail to beat index funds",
          "Index funds have never had a down year",
          "Indexes are insured against all losses",
          "Stock pickers always outperform in crashes"
        ],
        correctAnswer: 0,
        explanation: "Study after study shows most professional stock pickers underperform simple index funds over long periods, especially after fees are deducted."
      },
      {
        id: "portfolio-6-q7",
        question: "Which is a genuine limitation of index investing?",
        options: [
          "It requires picking individual winning stocks",
          "You'll match market crashes as well as gains",
          "Fees are higher than active management",
          "It only works for wealthy investors"
        ],
        correctAnswer: 1,
        explanation: "Index funds don't dodge downturns — if the market falls 20%, so do you. The strategy accepts short-term drops for long-term market returns."
      },
      {
        id: "portfolio-6-q8",
        question: "Why did Warren Buffett famously recommend index funds for most people?",
        options: [
          "He owns the largest index fund company",
          "He believes stocks are too risky generally",
          "Index funds are only available to beginners",
          "Low costs plus market returns beat most pros"
        ],
        correctAnswer: 3,
        explanation: "Buffett argued that cheap index funds capture the market's growth while most professionals, after fees, deliver less. Even a legendary stock picker endorses them."
      }
    ]
  },

  // PORTFOLIO-7: Active vs Passive
  {
    lessonId: "portfolio-7",
    questions: [
      {
        id: "portfolio-7-q1",
        question: "What defines ACTIVE investing?",
        options: [
          "Exercising while you check stock prices",
          "Automatically investing the same amount monthly",
          "Trying to beat the market by picking investments",
          "Holding one index fund for decades"
        ],
        correctAnswer: 2,
        explanation: "Active investing means humans (or their strategies) selecting and timing investments to try to outperform the overall market."
      },
      {
        id: "portfolio-7-q2",
        question: "What defines PASSIVE investing?",
        options: [
          "Trading options based on daily news",
          "Never investing any money at all",
          "Selling whenever the market feels scary",
          "Tracking a market index at low cost"
        ],
        correctAnswer: 3,
        explanation: "Passive investing accepts the market's return by tracking an index, keeping trading and fees to a minimum."
      },
      {
        id: "portfolio-7-q3",
        question: "Over long periods, how do MOST active funds compare to index funds?",
        options: [
          "Most active funds underperform after fees",
          "Most active funds double index returns",
          "Active and passive always tie exactly",
          "Active funds win every decade recorded"
        ],
        correctAnswer: 0,
        explanation: "Decades of data show the majority of active funds trail their benchmark index over the long run, largely because their higher fees eat returns."
      },
      {
        id: "portfolio-7-q4",
        question: "Why do high fees hurt active funds so much over time?",
        options: [
          "Fees are only charged in losing years",
          "Fees compound against you year after year",
          "Fees are refunded when funds underperform",
          "Fees only apply to small accounts"
        ],
        correctAnswer: 1,
        explanation: "A 1% annual fee sounds small, but compounded over decades it can consume a huge chunk of your final balance — a hurdle managers rarely overcome."
      },
      {
        id: "portfolio-7-q5",
        question: "Diego spends hours picking stocks and lags the S&P 500 three years straight. What's the rational takeaway?",
        options: [
          "He should trade more frequently each day",
          "He should borrow money to buy bigger positions",
          "He needs a more expensive trading app",
          "Indexing might beat his picks with less effort"
        ],
        correctAnswer: 3,
        explanation: "If big effort keeps producing below-market results, a passive index approach would have earned more with zero stock-picking time. Even pros face this reality."
      },
      {
        id: "portfolio-7-q6",
        question: "An active fund beat the market last year. Why is that alone weak evidence of skill?",
        options: [
          "One-year winners often just got lucky",
          "Winning funds must legally close afterward",
          "Beating the market is statistically impossible",
          "Last year's returns are always fake"
        ],
        correctAnswer: 0,
        explanation: "With thousands of funds, some beat the market every year by chance alone. Persistent outperformance across many years is what's rare."
      },
      {
        id: "portfolio-7-q7",
        question: "Which is a fair argument FOR active management?",
        options: [
          "Active funds never charge any fees",
          "Active funds are guaranteed by the government",
          "Skilled managers might exploit mispriced, less-followed markets",
          "Active funds cannot lose money in crashes"
        ],
        correctAnswer: 2,
        explanation: "In less efficient corners of the market — like small or foreign stocks — research may find genuine bargains. It's the strongest honest case for active investing."
      },
      {
        id: "portfolio-7-q8",
        question: "A typical active fund charges 1.0% yearly; an index fund charges 0.05%. What must the active fund do just to TIE?",
        options: [
          "Hold more cash than the index fund",
          "Beat the index by about 0.95% annually",
          "Charge investors an extra entry fee",
          "Trade less often than the index"
        ],
        correctAnswer: 1,
        explanation: "The active fund starts each year nearly 1% behind due to fees, so it must outperform by that margin just to match the cheap index fund."
      }
    ]
  },

  // PORTFOLIO-8: Performance Tracking
  {
    lessonId: "portfolio-8",
    questions: [
      {
        id: "portfolio-8-q1",
        question: "What is a 'return' on an investment?",
        options: [
          "Sending shares back for a refund",
          "The fee you pay to trade",
          "The gain or loss on your money",
          "The number of shares you own"
        ],
        correctAnswer: 2,
        explanation: "Return measures how much your investment gained or lost, usually as a percentage of what you put in."
      },
      {
        id: "portfolio-8-q2",
        question: "You invested $200 and it's now worth $220. What is your return?",
        options: [
          "Twenty percent total gain",
          "Two percent total gain",
          "Five percent total gain",
          "Ten percent total gain"
        ],
        correctAnswer: 3,
        explanation: "Gain of $20 divided by the $200 invested equals 0.10, or a 10% return. Always divide the gain by your starting amount."
      },
      {
        id: "portfolio-8-q3",
        question: "What is a 'benchmark' used for in performance tracking?",
        options: [
          "A standard to compare your returns against",
          "A seat at the stock exchange",
          "A minimum deposit required by brokers",
          "A penalty for selling too early"
        ],
        correctAnswer: 0,
        explanation: "A benchmark, like the S&P 500, gives context. Earning 6% sounds fine — unless the benchmark earned 15% that same year."
      },
      {
        id: "portfolio-8-q4",
        question: "Your portfolio gained 8% while the S&P 500 gained 12%. What does this comparison tell you?",
        options: [
          "You beat the market by four percent",
          "You underperformed the market this period",
          "Your broker made a calculation error",
          "The S&P figure must be wrong"
        ],
        correctAnswer: 1,
        explanation: "Gaining 8% while the benchmark gained 12% means your choices trailed the market by 4 points. A simple index fund would have done better."
      },
      {
        id: "portfolio-8-q5",
        question: "Why should returns be judged AFTER subtracting fees and inflation?",
        options: [
          "Fees and inflation only affect bond investors",
          "Regulators require hiding those numbers publicly",
          "Brokers pay the inflation costs for you",
          "They show what buying power you actually gained"
        ],
        correctAnswer: 3,
        explanation: "A 7% return with 1% fees and 3% inflation leaves about 3% of real gained buying power. Net, real returns are what actually matter."
      },
      {
        id: "portfolio-8-q6",
        question: "Why is checking your portfolio every day usually counterproductive?",
        options: [
          "Daily noise triggers emotional, short-term decisions",
          "Apps charge money for each daily login",
          "Prices are only updated once yearly",
          "Checking often erases your past returns"
        ],
        correctAnswer: 0,
        explanation: "Daily swings are mostly meaningless noise, but seeing them tempts you to tinker or panic. Long-term investors do better reviewing occasionally."
      },
      {
        id: "portfolio-8-q7",
        question: "Kai deposited $500 during the year, and his account grew from $1,000 to $1,600. Why can't he claim a 60% return?",
        options: [
          "Returns can never exceed fifty percent",
          "His broker must verify returns first",
          "Part of the growth was new deposits, not gains",
          "Deposits always count as investment losses"
        ],
        correctAnswer: 2,
        explanation: "Of the $600 increase, $500 was his own money going in. Only $100 was actual investment gain — track deposits separately from returns."
      },
      {
        id: "portfolio-8-q8",
        question: "Which time frame gives the MOST meaningful read on a long-term strategy?",
        options: [
          "The most recent trading afternoon",
          "Several years of performance history",
          "One exciting single trading week",
          "The last forty-eight hours only"
        ],
        correctAnswer: 1,
        explanation: "Strategies need years to show their true character — any week or month is dominated by random noise. Judge long-term plans on long-term results."
      }
    ]
  },

  // PORTFOLIO-9: Risk Management
  {
    lessonId: "portfolio-9",
    questions: [
      {
        id: "portfolio-9-q1",
        question: "What is the main goal of risk management in investing?",
        options: [
          "Eliminating every possible risk completely",
          "Avoiding the stock market entirely forever",
          "Limiting big losses while still allowing growth",
          "Guaranteeing profits in every market year"
        ],
        correctAnswer: 2,
        explanation: "Risk management isn't about zero risk — that would mean zero growth. It's about capping catastrophic losses while staying invested."
      },
      {
        id: "portfolio-9-q2",
        question: "What is an emergency fund's role in managing investment risk?",
        options: [
          "It earns higher returns than stocks",
          "It keeps you from selling investments in a crisis",
          "It doubles as a retirement account",
          "It pays your brokerage fees automatically"
        ],
        correctAnswer: 1,
        explanation: "With cash set aside for emergencies, you won't be forced to sell investments at the worst possible time just to cover a surprise expense."
      },
      {
        id: "portfolio-9-q3",
        question: "A drop of 50% requires what gain just to break even?",
        options: [
          "A one hundred percent gain",
          "A fifty percent gain exactly",
          "A twenty-five percent gain",
          "A seventy-five percent gain"
        ],
        correctAnswer: 0,
        explanation: "If $100 falls to $50, you need to double that $50 — a 100% gain — to get back to $100. This is why avoiding huge losses matters so much."
      },
      {
        id: "portfolio-9-q4",
        question: "Why is investing borrowed money (leverage) especially dangerous?",
        options: [
          "Borrowed money grows slower than saved money",
          "Loans can only buy government bonds",
          "Banks forbid using loans for anything",
          "Losses get magnified and you still owe the debt"
        ],
        correctAnswer: 3,
        explanation: "Leverage amplifies both directions. If your investments crash, the losses multiply — and the loan payments remain due regardless."
      },
      {
        id: "portfolio-9-q5",
        question: "Which practice directly limits how much one bad bet can hurt you?",
        options: [
          "Following stock tips from group chats",
          "Capping any single position's portfolio share",
          "Checking prices every fifteen minutes",
          "Investing only in trending assets"
        ],
        correctAnswer: 1,
        explanation: "Position sizing — for example, never letting one holding exceed 5-10% of your portfolio — means even a total wipeout of one bet stays survivable."
      },
      {
        id: "portfolio-9-q6",
        question: "Sam invests his textbook money for next semester in volatile stocks. What risk rule is he breaking?",
        options: [
          "Never invest money you'll need soon",
          "Always buy stocks in alphabetical order",
          "Only invest during the fall semester",
          "Never invest less than a thousand dollars"
        ],
        correctAnswer: 0,
        explanation: "Money needed within months shouldn't face market risk — a dip right before tuition is due would force selling at a loss. Short-term money belongs in safe accounts."
      },
      {
        id: "portfolio-9-q7",
        question: "How do bonds and cash function as risk management tools in a portfolio?",
        options: [
          "They grow faster than stocks in booms",
          "They eliminate the need for diversification",
          "They cushion the portfolio when stocks crash",
          "They automatically buy stocks during dips"
        ],
        correctAnswer: 2,
        explanation: "Stable assets hold value when stocks plunge, softening the total drop and giving you dry powder to rebalance or handle emergencies."
      },
      {
        id: "portfolio-9-q8",
        question: "Why is 'risk of missing your goals' also a real risk, not just losing money?",
        options: [
          "Goals are legally binding financial contracts",
          "Being too cautious can leave you short of what you need",
          "Missing goals triggers early withdrawal penalties",
          "Brokers fine investors who miss targets"
        ],
        correctAnswer: 1,
        explanation: "Hiding in cash for 40 years feels safe, but inflation and missed growth can leave you far short at retirement. Under-investing is itself a risk."
      }
    ]
  },

  // PORTFOLIO-10: Wealth Building
  {
    lessonId: "portfolio-10",
    questions: [
      {
        id: "portfolio-10-q1",
        question: "What is 'net worth'?",
        options: [
          "The total salary you earn yearly",
          "What you own minus what you owe",
          "The balance in your checking account",
          "Your monthly take-home pay amount"
        ],
        correctAnswer: 1,
        explanation: "Net worth = assets (what you own) minus liabilities (what you owe). It's the core scoreboard of wealth building."
      },
      {
        id: "portfolio-10-q2",
        question: "What makes compound growth so powerful over decades?",
        options: [
          "Your earnings start generating their own earnings",
          "Banks double your deposits every year",
          "Interest rates always rise over time",
          "Taxes disappear after ten years invested"
        ],
        correctAnswer: 0,
        explanation: "Compounding means returns earn returns — growth stacks on growth. Given decades, this snowball effect does most of the wealth-building work."
      },
      {
        id: "portfolio-10-q3",
        question: "Why does starting at 16 instead of 30 matter so enormously?",
        options: [
          "Teen accounts pay triple interest rates",
          "Stocks are cheaper for younger buyers",
          "Brokers waive all fees for teenagers",
          "Extra years of compounding multiply the outcome"
        ],
        correctAnswer: 3,
        explanation: "Those extra 14 years let compounding work far longer — early dollars can grow many times larger than dollars invested later. Time is a teen's superpower."
      },
      {
        id: "portfolio-10-q4",
        question: "Which habit is the true FOUNDATION of building wealth?",
        options: [
          "Finding one hot stock early",
          "Winning contests and lottery drawings",
          "Consistently spending less than you earn",
          "Opening many credit card accounts"
        ],
        correctAnswer: 2,
        explanation: "Without a gap between income and spending, there's nothing to invest. That surplus, invested consistently, is how ordinary incomes become wealth."
      },
      {
        id: "portfolio-10-q5",
        question: "Tara, 17, can invest $100 monthly. Which plan best builds long-term wealth?",
        options: [
          "Automatic monthly buys of broad index funds",
          "Waiting for the perfect market bottom",
          "Keeping it all in a checking account",
          "Betting it monthly on trending meme coins"
        ],
        correctAnswer: 0,
        explanation: "Automatic, diversified, consistent investing captures decades of compounding. Market timing and gambling on fads are how plans fall apart."
      },
      {
        id: "portfolio-10-q6",
        question: "How does high-interest debt sabotage wealth building?",
        options: [
          "Debt payments improve your investment returns",
          "It compounds against you, outpacing typical returns",
          "Lenders confiscate your investment accounts",
          "Debt makes you ineligible to invest"
        ],
        correctAnswer: 1,
        explanation: "A credit card charging 24% grows against you faster than markets typically grow for you. Paying off high-interest debt is often the best 'investment' available."
      },
      {
        id: "portfolio-10-q7",
        question: "Why do steady index investors often out-build flashy traders over 30 years?",
        options: [
          "Traders are banned after ten years",
          "Index investors receive government matching funds",
          "Trading profits face a 100% tax",
          "Low costs and staying invested compound reliably"
        ],
        correctAnswer: 3,
        explanation: "Frequent trading racks up costs, taxes, and mistimed moves. Boring consistency keeps every dollar compounding through the market's best days."
      },
      {
        id: "portfolio-10-q8",
        question: "Which statement about get-rich-quick schemes is accurate?",
        options: [
          "They reliably outperform diversified portfolios",
          "They're regulated to guarantee minimum returns",
          "They typically transfer wealth AWAY from participants",
          "They are the fastest legitimate wealth path"
        ],
        correctAnswer: 2,
        explanation: "Schemes promising fast riches usually enrich promoters at participants' expense. Real wealth building is slow, boring, and statistically reliable."
      }
    ]
  },
  // FUNDS-1: What Is an ETF
  {
    lessonId: "funds-1",
    questions: [
      {
        id: "funds-1-q1",
        question: "What is an ETF (exchange-traded fund)?",
        options: [
          "A basket of investments trading like a stock",
          "A savings account with fixed interest",
          "A loan you make to a company",
          "A government program for new investors"
        ],
        correctAnswer: 0,
        explanation: "An ETF bundles many investments — often hundreds of stocks or bonds — into one package you can buy and sell on an exchange like a single stock."
      },
      {
        id: "funds-1-q2",
        question: "When can you buy or sell an ETF?",
        options: [
          "Only on the first of each month",
          "Only once per day after markets close",
          "Anytime during regular market trading hours",
          "Only when the fund manager approves"
        ],
        correctAnswer: 2,
        explanation: "ETFs trade all day on exchanges at live market prices, just like individual stocks — that's the 'exchange-traded' part of the name."
      },
      {
        id: "funds-1-q3",
        question: "With $50, Jayden buys one share of a total-market ETF. What did he just get?",
        options: [
          "A tiny stake in thousands of companies",
          "Full voting control of one company",
          "A guaranteed fifty-dollar annual dividend",
          "A physical certificate mailed to him"
        ],
        correctAnswer: 0,
        explanation: "One ETF share represents a small slice of everything the fund holds — instant diversification across the whole market for the price of one share."
      },
      {
        id: "funds-1-q4",
        question: "How does an ETF's trading differ from a mutual fund's?",
        options: [
          "ETFs can only be traded by professionals",
          "Mutual funds trade every second; ETFs don't",
          "ETFs require a minimum of $10,000",
          "ETFs trade all day; mutual funds price once daily"
        ],
        correctAnswer: 3,
        explanation: "ETFs have live prices throughout the trading day, while mutual funds only transact once daily at their closing NAV price."
      },
      {
        id: "funds-1-q5",
        question: "Why are ETFs popular with beginner investors?",
        options: [
          "They guarantee profits within one year",
          "Low costs and instant diversification in one purchase",
          "They are immune to market downturns",
          "They pay higher interest than banks"
        ],
        correctAnswer: 1,
        explanation: "Many broad ETFs charge tiny fees and spread your money across hundreds of holdings — removing the two biggest beginner mistakes: high costs and concentration."
      },
      {
        id: "funds-1-q6",
        question: "What determines an ETF's price during the trading day?",
        options: [
          "The fund manager sets it each morning",
          "A government agency fixes it weekly",
          "Supply and demand around its underlying value",
          "It never changes during the day"
        ],
        correctAnswer: 2,
        explanation: "ETF prices move with buyers and sellers all day, generally staying close to the value of the fund's underlying holdings."
      },
      {
        id: "funds-1-q7",
        question: "An ETF tracking the S&P 500 falls 3% today. What most likely happened?",
        options: [
          "The fund manager sold everything overnight",
          "The ETF was delisted from exchanges",
          "Its expense ratio tripled this morning",
          "The underlying index dropped about 3%"
        ],
        correctAnswer: 3,
        explanation: "Index ETFs mirror their benchmark. If the fund fell 3%, the stocks in the index it tracks almost certainly fell about the same amount."
      },
      {
        id: "funds-1-q8",
        question: "Why can a single ETF be safer than a single stock?",
        options: [
          "One company's collapse barely dents the basket",
          "ETFs are insured against all losses",
          "Stocks are illegal for teen investors",
          "ETFs never decline in market value"
        ],
        correctAnswer: 0,
        explanation: "An ETF spreads risk across many holdings, so one company failing has a small effect. A single stock puts everything on one company's fate."
      }
    ]
  },

  // FUNDS-2: Mutual Funds
  {
    lessonId: "funds-2",
    questions: [
      {
        id: "funds-2-q1",
        question: "What is a mutual fund?",
        options: [
          "A loan shared between two friends",
          "A pool of many investors' money managed together",
          "An insurance policy for stock losses",
          "A bank account with monthly fees"
        ],
        correctAnswer: 1,
        explanation: "A mutual fund pools money from many investors and uses it to buy a portfolio of stocks, bonds, or other assets on everyone's behalf."
      },
      {
        id: "funds-2-q2",
        question: "When you buy mutual fund shares, what price do you get?",
        options: [
          "Whatever price you bid during the day",
          "Yesterday's opening price at 9:30 AM",
          "That day's closing NAV, set after market close",
          "A price the manager picks personally"
        ],
        correctAnswer: 2,
        explanation: "Mutual funds transact once per day at the net asset value (NAV) calculated after markets close — no matter what time you placed the order."
      },
      {
        id: "funds-2-q3",
        question: "What does NAV (net asset value) represent?",
        options: [
          "The fund's total holdings value per share",
          "The number of investors in the fund",
          "The salary of the fund manager",
          "The fund's age measured in years"
        ],
        correctAnswer: 0,
        explanation: "NAV is the total value of everything the fund owns, minus liabilities, divided by shares outstanding — the fair value of one share."
      },
      {
        id: "funds-2-q4",
        question: "Why does pooling money give small investors an advantage?",
        options: [
          "Pooled money is exempt from taxes",
          "Pools guarantee returns above the market",
          "Small investors get refunds from pools",
          "Together they afford diversification and professional management"
        ],
        correctAnswer: 3,
        explanation: "Alone, $100 buys little variety. Pooled with thousands of others, it buys a slice of a professionally run, widely diversified portfolio."
      },
      {
        id: "funds-2-q5",
        question: "Lena places a mutual fund order at 10 AM. When does it actually execute?",
        options: [
          "Instantly at the 10 AM price",
          "At that day's closing NAV price",
          "The following Monday at noon",
          "Whenever the manager reads it"
        ],
        correctAnswer: 1,
        explanation: "All mutual fund orders placed during the day execute together at the NAV computed after that day's market close."
      },
      {
        id: "funds-2-q6",
        question: "Which is a common difference between mutual funds and ETFs?",
        options: [
          "Mutual funds cannot hold any stocks",
          "ETFs are only for retirement accounts",
          "Mutual funds trade continuously all day",
          "Mutual funds often set minimum investment amounts"
        ],
        correctAnswer: 3,
        explanation: "Many mutual funds require minimums like $1,000 to start, while ETFs can be bought one share (or fraction) at a time."
      },
      {
        id: "funds-2-q7",
        question: "What do actively managed mutual funds employ managers to do?",
        options: [
          "Select investments trying to beat the market",
          "Print new stock certificates for investors",
          "Set the daily interest rate nationally",
          "Approve each investor's personal budget"
        ],
        correctAnswer: 0,
        explanation: "Active fund managers research and pick investments hoping to outperform a benchmark — a service investors pay for through higher fees."
      },
      {
        id: "funds-2-q8",
        question: "Why might a mutual fund suit someone investing automatically each month?",
        options: [
          "Mutual funds never decline in value",
          "Monthly buyers avoid all fund fees",
          "They accept exact dollar amounts on a schedule",
          "They only accept monthly deposits by law"
        ],
        correctAnswer: 2,
        explanation: "Mutual funds let you invest exact dollar amounts — like $50.00 monthly — automatically, making them a natural fit for scheduled contributions."
      }
    ]
  },

  // FUNDS-3: Expense Ratios
  {
    lessonId: "funds-3",
    questions: [
      {
        id: "funds-3-q1",
        question: "What is an expense ratio?",
        options: [
          "The tax rate on fund profits",
          "A fund's annual fee as a percent of assets",
          "The ratio of stocks to bonds",
          "Your monthly deposit divided by income"
        ],
        correctAnswer: 1,
        explanation: "The expense ratio is the yearly fee a fund charges, expressed as a percentage of your invested money — 0.50% means $5 per $1,000 annually."
      },
      {
        id: "funds-3-q2",
        question: "You hold $2,000 in a fund with a 0.25% expense ratio. What's the yearly cost?",
        options: [
          "Twenty-five dollars every year",
          "Fifty dollars every year",
          "Five dollars every year",
          "Two dollars every year"
        ],
        correctAnswer: 2,
        explanation: "$2,000 × 0.0025 = $5 per year. The fee is deducted gradually from the fund's value, so you never see a separate bill."
      },
      {
        id: "funds-3-q3",
        question: "Why is the expense ratio called a 'hidden' cost?",
        options: [
          "Funds are legally allowed to conceal it",
          "It's only charged in losing years",
          "It changes randomly without any notice",
          "It's quietly deducted from returns, not billed"
        ],
        correctAnswer: 3,
        explanation: "You never receive an invoice — the fee is skimmed from the fund's assets continuously, silently reducing your returns."
      },
      {
        id: "funds-3-q4",
        question: "Two similar index funds track the same index: one charges 0.03%, the other 0.75%. Which should you generally pick?",
        options: [
          "The 0.03% fund, keeping more returns",
          "The 0.75% fund, since costlier means better",
          "Either one, because fees never matter",
          "Neither, since index funds charge nothing"
        ],
        correctAnswer: 0,
        explanation: "Same index, same holdings, same gross performance — the cheaper fund simply lets you keep more. Cost is the reliable difference."
      },
      {
        id: "funds-3-q5",
        question: "Why do small fee differences become huge over decades?",
        options: [
          "Fees are only charged after twenty years",
          "The lost money would have compounded for you",
          "Regulators raise fees a bit every year",
          "Funds refund fees after ten years"
        ],
        correctAnswer: 1,
        explanation: "Every dollar paid in fees stops compounding for you forever. Over 40 years, a 1% fee can consume a quarter or more of your final balance."
      },
      {
        id: "funds-3-q6",
        question: "What's a typical expense ratio for a broad, low-cost index fund today?",
        options: [
          "Around five percent annually charged",
          "Exactly zero for every index fund",
          "Roughly 0.03% to 0.20% per year",
          "Between two and three percent yearly"
        ],
        correctAnswer: 2,
        explanation: "Major broad-market index funds now charge just a few hundredths of a percent — some as low as 0.03% — making costs nearly negligible."
      },
      {
        id: "funds-3-q7",
        question: "A fund earned 8% before fees and charges a 1% expense ratio. What did investors actually receive?",
        options: [
          "Eight percent, since fees are separate",
          "Nine percent, fees added returns",
          "One percent, fees took the rest",
          "About seven percent after the fee"
        ],
        correctAnswer: 3,
        explanation: "The expense ratio comes straight out of returns: 8% gross minus the 1% fee leaves roughly 7% in investors' pockets."
      },
      {
        id: "funds-3-q8",
        question: "Where can you find a fund's expense ratio before buying?",
        options: [
          "In the fund's prospectus or summary page",
          "Only by calling the fund manager",
          "It's secret until after you invest",
          "On your driver's license application"
        ],
        correctAnswer: 0,
        explanation: "Every fund must disclose its expense ratio in its prospectus, and broker websites and fund pages display it prominently. Always check before buying."
      }
    ]
  },

  // FUNDS-4: Index Funds
  {
    lessonId: "funds-4",
    questions: [
      {
        id: "funds-4-q1",
        question: "What does an index fund invest in?",
        options: [
          "Only companies the manager personally likes",
          "Whichever stocks are trending on social media",
          "The same holdings as its target index",
          "A rotating set of secret picks"
        ],
        correctAnswer: 2,
        explanation: "An index fund holds the securities in its chosen index — like all 500 companies in the S&P 500 — in matching proportions."
      },
      {
        id: "funds-4-q2",
        question: "Why are index funds famous for LOW costs?",
        options: [
          "The stock exchange pays their expenses",
          "Copying a list needs no expensive research team",
          "They only hold free penny stocks",
          "Investors split costs with the government"
        ],
        correctAnswer: 1,
        explanation: "Replicating an index is mostly automated — no analysts hunting for winners — so fees can be a tiny fraction of active funds' costs."
      },
      {
        id: "funds-4-q3",
        question: "What does a 'total market' index fund aim to own?",
        options: [
          "Only the ten largest technology companies",
          "Just companies founded before 1950",
          "Foreign real estate and gold only",
          "Essentially every publicly traded US stock"
        ],
        correctAnswer: 3,
        explanation: "Total market funds hold thousands of US companies — large, mid, and small — so you own a slice of virtually the entire stock market."
      },
      {
        id: "funds-4-q4",
        question: "Marcus, 16, buys one total-market index fund and adds $40 monthly. What has he built?",
        options: [
          "A diversified, low-cost, long-term investing plan",
          "A risky bet on a single sector",
          "A guaranteed path to quick riches",
          "A high-fee actively managed strategy"
        ],
        correctAnswer: 0,
        explanation: "One broad index fund plus automatic contributions is a complete beginner strategy: diversified, cheap, and built for compounding over decades."
      },
      {
        id: "funds-4-q5",
        question: "How do index funds and actively managed funds compare on fees?",
        options: [
          "Active funds usually charge far less annually",
          "Both types always charge identical fees",
          "Index funds typically charge much lower fees",
          "Neither type charges any fee whatsoever"
        ],
        correctAnswer: 2,
        explanation: "Index funds commonly charge under 0.20% while active funds often charge 0.5-1% or more — a gap that compounds hugely over time."
      },
      {
        id: "funds-4-q6",
        question: "If the whole market has a terrible year, what happens to a total-market index fund?",
        options: [
          "It falls roughly along with the market",
          "It automatically converts to cash first",
          "It rises because index funds move inversely",
          "It freezes at its previous high"
        ],
        correctAnswer: 0,
        explanation: "Index funds don't dodge crashes — they ARE the market. The strategy relies on markets recovering and growing over long periods, as they historically have."
      },
      {
        id: "funds-4-q7",
        question: "Why don't index funds need star managers to succeed?",
        options: [
          "Star managers legally cannot run them",
          "The strategy is mechanical: track the list",
          "Robots negotiate better stock prices",
          "Index funds hold no actual investments"
        ],
        correctAnswer: 1,
        explanation: "The fund's job is replication, not judgment. Removing manager decisions removes manager mistakes — and manager salaries."
      },
      {
        id: "funds-4-q8",
        question: "An index fund's return lagged its index by exactly 0.05% this year. What most likely explains that gap?",
        options: [
          "The manager made a huge trading error",
          "The index itself was calculated wrong",
          "Investors withdrew too much money at once",
          "Its expense ratio caused the small shortfall"
        ],
        correctAnswer: 3,
        explanation: "A tiny, consistent lag matching the fee is exactly what healthy index funds show — you get the index's return minus the small expense ratio."
      }
    ]
  },

  // FUNDS-5: S&P 500
  {
    lessonId: "funds-5",
    questions: [
      {
        id: "funds-5-q1",
        question: "What does the S&P 500 index track?",
        options: [
          "Five hundred large US companies' performance",
          "The five hundred newest startup companies",
          "Every bond issued by the US",
          "The top five hundred world currencies"
        ],
        correctAnswer: 0,
        explanation: "The S&P 500 tracks about 500 of the largest US companies, together representing roughly 80% of the US stock market's total value."
      },
      {
        id: "funds-5-q2",
        question: "How are companies weighted inside the S&P 500?",
        options: [
          "Every company gets an equal share",
          "Alphabetical order determines each weight",
          "Bigger companies get bigger index weights",
          "The oldest companies always rank highest"
        ],
        correctAnswer: 2,
        explanation: "The index is market-cap weighted: a giant like Apple influences the index far more than the smallest member companies."
      },
      {
        id: "funds-5-q3",
        question: "What has the S&P 500's long-term average annual return been, historically?",
        options: [
          "Around thirty percent every year",
          "Roughly ten percent before inflation",
          "About one percent per year",
          "Exactly zero over long periods"
        ],
        correctAnswer: 1,
        explanation: "Over many decades the S&P 500 has averaged roughly 10% annually before inflation — though individual years swing wildly above and below."
      },
      {
        id: "funds-5-q4",
        question: "Why do so many investors use an S&P 500 fund as a core holding?",
        options: [
          "It legally cannot decline in value",
          "It pays fixed interest like a bank",
          "The government guarantees its performance",
          "It cheaply captures most of the US market"
        ],
        correctAnswer: 3,
        explanation: "One low-cost purchase provides exposure to America's largest companies across all industries — a simple, proven core for a portfolio."
      },
      {
        id: "funds-5-q5",
        question: "When you buy an S&P 500 fund, which companies do you own a slice of?",
        options: [
          "Giants like Apple, Microsoft, and Amazon",
          "Only banks and insurance companies",
          "Small local businesses in your town",
          "Foreign companies listed in Europe"
        ],
        correctAnswer: 0,
        explanation: "S&P 500 funds hold America's biggest public companies — the tech giants, retailers, and healthcare firms whose products you use daily."
      },
      {
        id: "funds-5-q6",
        question: "The S&P 500 dropped about 50% in 2008-2009. What happened to investors who kept holding?",
        options: [
          "Their shares were permanently canceled",
          "They were locked out of selling forever",
          "They recovered and reached new highs later",
          "They owed money to the exchange"
        ],
        correctAnswer: 2,
        explanation: "The index fully recovered within a few years and went on to set many new records — rewarding investors who stayed the course through the crash."
      },
      {
        id: "funds-5-q7",
        question: "What's one real limitation of holding ONLY an S&P 500 fund?",
        options: [
          "It skips smaller US and international companies",
          "It contains too many different industries",
          "Its fees are the highest available",
          "It cannot be held in retirement accounts"
        ],
        correctAnswer: 0,
        explanation: "The S&P 500 covers large US companies only — adding small-cap and international funds diversifies beyond that one slice of the world."
      },
      {
        id: "funds-5-q8",
        question: "A company shrinks and no longer qualifies for the S&P 500. What happens?",
        options: [
          "The index shuts down for that year",
          "It stays in the index permanently anyway",
          "All investors must sell it personally",
          "The index committee replaces it with another"
        ],
        correctAnswer: 3,
        explanation: "The index is maintained over time — struggling companies get replaced by qualifying ones, keeping the index representative of large US firms."
      }
    ]
  },

  // FUNDS-6: Sector ETFs
  {
    lessonId: "funds-6",
    questions: [
      {
        id: "funds-6-q1",
        question: "What is a sector ETF?",
        options: [
          "A fund holding every stock worldwide",
          "A fund focused on one specific industry",
          "A bond fund for government debt",
          "A savings account for one purpose"
        ],
        correctAnswer: 1,
        explanation: "Sector ETFs concentrate on a single industry — like technology, healthcare, or energy — holding many companies within that one field."
      },
      {
        id: "funds-6-q2",
        question: "Which of these is an example of a market sector?",
        options: [
          "The month of December",
          "Companies starting with letter A",
          "Healthcare, including drugmakers and hospitals",
          "Stocks priced under five dollars"
        ],
        correctAnswer: 2,
        explanation: "Sectors group companies by what they do — healthcare, technology, energy, financials, and so on — not by name, price, or season."
      },
      {
        id: "funds-6-q3",
        question: "How does a sector ETF compare to a total-market ETF for risk?",
        options: [
          "The sector ETF is more concentrated and volatile",
          "Both carry exactly identical risk levels",
          "The sector ETF is always much safer",
          "Total-market ETFs are riskier by definition"
        ],
        correctAnswer: 0,
        explanation: "Betting on one industry means one industry's problems hit your whole position. Broad funds spread that risk across every sector."
      },
      {
        id: "funds-6-q4",
        question: "Aisha believes healthcare will boom but won't pick individual drug companies. What tool fits?",
        options: [
          "A savings bond from the Treasury",
          "A single biotech startup's stock",
          "A certificate of deposit at her bank",
          "A healthcare sector ETF holding many firms"
        ],
        correctAnswer: 3,
        explanation: "A healthcare ETF lets her express the industry view while diversifying across dozens of companies — no single-stock gamble required."
      },
      {
        id: "funds-6-q5",
        question: "Oil prices collapse. Which fund most likely falls hardest?",
        options: [
          "A broad total-market index fund",
          "An energy sector ETF",
          "A US government bond fund",
          "A technology sector ETF"
        ],
        correctAnswer: 1,
        explanation: "An energy ETF is packed with oil and gas companies, so an oil crash hits it directly and hard — while broad funds feel only a partial effect."
      },
      {
        id: "funds-6-q6",
        question: "What role do experts usually suggest sector ETFs play in a portfolio?",
        options: [
          "A required holding in every account",
          "A replacement for all emergency savings",
          "A smaller satellite position around a broad core",
          "The entire portfolio for maximum focus"
        ],
        correctAnswer: 2,
        explanation: "A common approach is 'core and satellite': a broad index core, with sector bets kept small so a wrong guess can't sink the plan."
      },
      {
        id: "funds-6-q7",
        question: "Why is going all-in on last year's hottest sector often a mistake?",
        options: [
          "Sector leadership rotates and hot streaks fade",
          "Hot sectors are removed from exchanges",
          "Regulators cap returns on popular sectors",
          "Winning sectors stop issuing stock"
        ],
        correctAnswer: 0,
        explanation: "Sectors take turns leading — chasing last year's winner often means buying at peak prices right before it cools off."
      },
      {
        id: "funds-6-q8",
        question: "A tech sector ETF and one tech stock both interest Leo. What advantage does the ETF offer?",
        options: [
          "It's guaranteed to rise every quarter",
          "It removes all technology industry risk",
          "It trades faster than stocks can",
          "One company's scandal won't wreck the position"
        ],
        correctAnswer: 3,
        explanation: "The ETF still carries tech-industry risk, but spreads company-specific risk across many firms — one CEO scandal barely moves it."
      }
    ]
  },

  // FUNDS-7: Bond ETFs
  {
    lessonId: "funds-7",
    questions: [
      {
        id: "funds-7-q1",
        question: "What does a bond ETF hold?",
        options: [
          "A basket of many different bonds",
          "Shares of bond rating agencies",
          "Physical gold stored in vaults",
          "Stocks of banks that issue loans"
        ],
        correctAnswer: 0,
        explanation: "A bond ETF holds a diversified collection of bonds — often hundreds or thousands — and trades on an exchange like a stock."
      },
      {
        id: "funds-7-q2",
        question: "How do bond ETF investors typically receive income?",
        options: [
          "A single payment when they sell",
          "Regular distributions from the bonds' interest",
          "Annual gift cards from the fund",
          "Bonus shares of company stock"
        ],
        correctAnswer: 1,
        explanation: "The interest collected from all the bonds inside the fund is passed to shareholders as regular distributions, often monthly."
      },
      {
        id: "funds-7-q3",
        question: "Why might a beginner choose a bond ETF over buying individual bonds?",
        options: [
          "Individual bonds are illegal for minors",
          "Bond ETFs never fluctuate in price",
          "Instant diversification without large minimum purchases",
          "ETFs pay triple the interest rate"
        ],
        correctAnswer: 2,
        explanation: "Single bonds often require $1,000+ each, and building a diverse set takes serious money. One ETF share delivers broad bond exposure cheaply."
      },
      {
        id: "funds-7-q4",
        question: "Interest rates rise sharply. What typically happens to a bond ETF's price?",
        options: [
          "It rises along with the rates",
          "It is unaffected by interest rates",
          "It doubles as investors celebrate",
          "It falls, since bond prices move inversely"
        ],
        correctAnswer: 3,
        explanation: "Bond prices move opposite to interest rates, and a bond ETF's price reflects its holdings — so rising rates push the fund's price down."
      },
      {
        id: "funds-7-q5",
        question: "What role do bond ETFs usually play alongside stock funds?",
        options: [
          "Providing stability and income to the mix",
          "Maximizing risk for faster growth",
          "Replacing the need for any stocks",
          "Guaranteeing the portfolio never drops"
        ],
        correctAnswer: 0,
        explanation: "Bond ETFs add steadier returns and income, cushioning stock market swings — the classic stabilizer role in a diversified portfolio."
      },
      {
        id: "funds-7-q6",
        question: "Which types of bonds can bond ETFs specialize in?",
        options: [
          "Only bonds from one small town",
          "Government, corporate, or short and long-term bonds",
          "Only bonds issued before 1990",
          "Bonds that never pay any interest"
        ],
        correctAnswer: 1,
        explanation: "Bond ETFs come in many flavors — Treasury funds, corporate funds, short-term, long-term — letting investors pick their risk and income mix."
      },
      {
        id: "funds-7-q7",
        question: "How does buying a bond ETF differ from buying a single bond and holding to maturity?",
        options: [
          "The ETF's value stays fixed until maturity",
          "Single bonds trade all day on apps",
          "ETFs mature on one specific date too",
          "The ETF has no maturity date and fluctuates"
        ],
        correctAnswer: 3,
        explanation: "A single bond repays its face value at maturity; most bond ETFs continually roll into new bonds, so they never 'mature' and their price keeps fluctuating."
      },
      {
        id: "funds-7-q8",
        question: "Tessa, 18, wants some portfolio stability but only has $60. What makes a bond ETF workable?",
        options: [
          "Bond ETFs waive fees for teenagers",
          "Her bank will match the deposit",
          "One affordable share buys diversified bond exposure",
          "Sixty dollars buys ten full Treasury bonds"
        ],
        correctAnswer: 2,
        explanation: "Many bond ETF shares cost under $100, giving her instant access to hundreds of bonds — impossible to replicate directly with $60."
      }
    ]
  },

  // FUNDS-8: Target-Date Funds
  {
    lessonId: "funds-8",
    questions: [
      {
        id: "funds-8-q1",
        question: "What is a target-date fund?",
        options: [
          "A fund that adjusts risk as a chosen year approaches",
          "A fund that expires worthless on one date",
          "A calendar app for tracking dividends",
          "A fund only sold on certain dates"
        ],
        correctAnswer: 0,
        explanation: "A target-date fund automatically shifts from aggressive to conservative as its target year — usually your planned retirement — gets closer."
      },
      {
        id: "funds-8-q2",
        question: "The '2065' in a Target Date 2065 Fund refers to what?",
        options: [
          "The year the fund company was founded",
          "The approximate year you plan to retire",
          "The number of stocks it holds",
          "The fund's guaranteed final share price"
        ],
        correctAnswer: 1,
        explanation: "The year signals who the fund is designed for — investors expecting to retire around 2065 — and drives its risk schedule."
      },
      {
        id: "funds-8-q3",
        question: "What is the 'glide path' of a target-date fund?",
        options: [
          "The fund's daily price chart pattern",
          "The airport route of fund managers",
          "Its gradual shift from stocks toward bonds",
          "The speed of order execution"
        ],
        correctAnswer: 2,
        explanation: "The glide path is the planned schedule that slowly moves the fund from stock-heavy in early years to bond-heavy near the target date."
      },
      {
        id: "funds-8-q4",
        question: "A 2065 fund and a 2030 fund exist today. Which holds MORE stocks right now?",
        options: [
          "The 2030 fund, being closer to today",
          "Both hold identical stock percentages always",
          "Neither one holds any stocks",
          "The 2065 fund, with decades still remaining"
        ],
        correctAnswer: 3,
        explanation: "Far-off target dates mean long horizons, so the 2065 fund stays aggressive with mostly stocks, while the 2030 fund has already shifted toward bonds."
      },
      {
        id: "funds-8-q5",
        question: "Why are target-date funds called 'set it and forget it' investing?",
        options: [
          "Rebalancing and de-risking happen automatically inside",
          "You legally cannot check the balance",
          "They require no money to start",
          "They lock your deposits for decades"
        ],
        correctAnswer: 0,
        explanation: "The fund handles allocation, rebalancing, and the gradual risk reduction itself — the investor just keeps contributing."
      },
      {
        id: "funds-8-q6",
        question: "What does a target-date fund typically hold inside it?",
        options: [
          "One single carefully chosen stock",
          "A mix of stock and bond funds",
          "Only certificates of deposit",
          "Cryptocurrency and collectible assets"
        ],
        correctAnswer: 1,
        explanation: "Target-date funds are usually 'funds of funds' — bundles of broad stock and bond index funds mixed according to the glide path."
      },
      {
        id: "funds-8-q7",
        question: "Rafael, 17, opens a retirement account and wants zero maintenance for decades. What's the standard one-fund answer?",
        options: [
          "A short-term Treasury bill fund",
          "A leveraged single-sector trading fund",
          "A money market cash fund",
          "A target-date fund near his retirement year"
        ],
        correctAnswer: 3,
        explanation: "A target-date fund matching his projected retirement year (around 2075) gives complete, self-adjusting management in one holding."
      },
      {
        id: "funds-8-q8",
        question: "What's a fair criticism of target-date funds?",
        options: [
          "They ignore your personal risk preferences",
          "They hold far too few investments",
          "They never reduce risk over time",
          "They require daily investor attention"
        ],
        correctAnswer: 0,
        explanation: "The glide path is one-size-fits-all for a birth-year cohort — it can't know if you're personally more or less risk-tolerant than average."
      }
    ]
  },

  // FUNDS-9: Fund Comparison
  {
    lessonId: "funds-9",
    questions: [
      {
        id: "funds-9-q1",
        question: "When comparing two similar funds, which factor is MOST reliably predictive?",
        options: [
          "The fund with the coolest name",
          "The fund's lower expense ratio",
          "The manager's social media following",
          "The fund's television advertising budget"
        ],
        correctAnswer: 1,
        explanation: "Research consistently shows low costs are among the best predictors of future relative performance — fees are certain, outperformance isn't."
      },
      {
        id: "funds-9-q2",
        question: "Why is 'past performance doesn't guarantee future results' a required warning?",
        options: [
          "It's an outdated rule nobody follows",
          "Past returns are usually misprinted",
          "Winning streaks often fail to persist",
          "Funds must hide their history"
        ],
        correctAnswer: 2,
        explanation: "Last year's top funds frequently land mid-pack or worse afterward. Luck and shifting markets make past returns a weak selection tool alone."
      },
      {
        id: "funds-9-q3",
        question: "What does a fund's 'holdings' list tell you?",
        options: [
          "The exact investments the fund owns",
          "The names of all fund investors",
          "How long you must hold shares",
          "Which bank stores the money"
        ],
        correctAnswer: 0,
        explanation: "The holdings list shows what you'd actually own — crucial for spotting overlap, concentration, or surprises inside a fund."
      },
      {
        id: "funds-9-q4",
        question: "Two funds both track the S&P 500. Fund A returned 9.95%, Fund B 9.70%. What likely explains the gap?",
        options: [
          "Fund B secretly holds different stocks",
          "Fund A took double the risk",
          "The index treated them differently",
          "Fund B charges higher fees or tracks worse"
        ],
        correctAnswer: 3,
        explanation: "Identical benchmarks should mean near-identical returns — persistent gaps usually trace to higher expenses or sloppier index tracking."
      },
      {
        id: "funds-9-q5",
        question: "What is 'tracking error' for an index fund?",
        options: [
          "A typo in the fund's documents",
          "How much the fund strays from its index",
          "The fund manager's yearly vacation days",
          "Errors in your personal tax filing"
        ],
        correctAnswer: 1,
        explanation: "Tracking error measures how closely a fund follows its benchmark. Good index funds keep it tiny; large gaps signal problems."
      },
      {
        id: "funds-9-q6",
        question: "Which comparison between two funds is misleading?",
        options: [
          "Comparing their expense ratios directly",
          "Comparing their long-term benchmark tracking",
          "Comparing a stock fund's return against a bond fund's",
          "Comparing what each fund holds"
        ],
        correctAnswer: 2,
        explanation: "Stock and bond funds have different jobs and risk levels — comparing raw returns across categories is apples versus oranges. Compare funds to peers and proper benchmarks."
      },
      {
        id: "funds-9-q7",
        question: "Nina sees a fund that returned 40% last year and wants in. What should she check FIRST?",
        options: [
          "Its costs, risks, and longer-term record",
          "Whether her friends already own it",
          "How the fund's logo looks",
          "The manager's favorite sports team"
        ],
        correctAnswer: 0,
        explanation: "One spectacular year often signals concentrated risk that can reverse. Fees, what it holds, and multi-year results reveal the real picture."
      },
      {
        id: "funds-9-q8",
        question: "Why does 'benchmark-appropriate' comparison matter when judging a fund?",
        options: [
          "Benchmarks are chosen randomly each year",
          "Funds pay benchmarks for endorsements",
          "All funds share one universal benchmark",
          "A fund should be judged against its own category"
        ],
        correctAnswer: 3,
        explanation: "A small-cap fund should be measured against a small-cap index, not the S&P 500 — otherwise you're grading it on someone else's test."
      }
    ]
  },

  // FUNDS-10: When to Use Funds
  {
    lessonId: "funds-10",
    questions: [
      {
        id: "funds-10-q1",
        question: "For which goal are stock funds generally appropriate?",
        options: [
          "Next month's concert ticket money",
          "This semester's textbook budget",
          "Long-term goals many years away",
          "Tomorrow's lunch with friends"
        ],
        correctAnswer: 2,
        explanation: "Stock funds swing too much for near-term needs but historically reward investors who can wait years — match the fund to the timeline."
      },
      {
        id: "funds-10-q2",
        question: "Money needed within a year belongs where?",
        options: [
          "A savings account or similar safe place",
          "An aggressive small-cap stock fund",
          "A volatile emerging markets fund",
          "A concentrated single-sector ETF"
        ],
        correctAnswer: 0,
        explanation: "Short-term money can't risk a market dip right before you need it. Safe, liquid accounts protect near-term goals."
      },
      {
        id: "funds-10-q3",
        question: "Which investor profile fits a target-date fund BEST?",
        options: [
          "A day trader seeking hourly action",
          "Someone wanting fully automatic long-term management",
          "A collector of individual dividend stocks",
          "Someone investing for next week"
        ],
        correctAnswer: 1,
        explanation: "Target-date funds exist for hands-off, long-horizon investors who want allocation, rebalancing, and de-risking handled automatically."
      },
      {
        id: "funds-10-q4",
        question: "Omar wants broad stock exposure, trades through an app, and has only small amounts. Which vehicle fits naturally?",
        options: [
          "A hedge fund with $100,000 minimums",
          "Individual corporate bonds at $1,000 each",
          "A private real estate partnership",
          "A broad index ETF with fractional shares"
        ],
        correctAnswer: 3,
        explanation: "Broad ETFs bought through an app — even in fractional shares — deliver diversified stock exposure with tiny amounts and low costs."
      },
      {
        id: "funds-10-q5",
        question: "When does adding a bond fund to a portfolio make the most sense?",
        options: [
          "When maximum volatility is the goal",
          "Only when stocks are at record highs",
          "When you want steadier returns and income",
          "Never, since bonds are outdated"
        ],
        correctAnswer: 2,
        explanation: "Bond funds suit investors who want to dampen swings or draw income — typically as goals get closer or risk tolerance is lower."
      },
      {
        id: "funds-10-q6",
        question: "Priya has $75 monthly and wants automatic exact-dollar investing into one diversified holding. Which option matches?",
        options: [
          "An index mutual fund with auto-invest",
          "Buying whole shares of five stocks",
          "A single corporate bond each month",
          "Collectible sneakers resold online"
        ],
        correctAnswer: 0,
        explanation: "Index mutual funds accept exact dollar amounts on autopilot, making them ideal for scheduled contributions — though fractional-share ETFs work too."
      },
      {
        id: "funds-10-q7",
        question: "Why might someone choose funds over picking individual stocks entirely?",
        options: [
          "Funds legally cannot lose any money",
          "Stocks are unavailable to small investors",
          "Funds always beat every single stock",
          "Diversification without research time or single-company risk"
        ],
        correctAnswer: 3,
        explanation: "Funds outsource the hardest parts — research, diversification, discipline — which suits most people better than betting on their own stock picks."
      },
      {
        id: "funds-10-q8",
        question: "What's the FIRST question to ask before choosing any fund?",
        options: [
          "What goal and timeline is this money for?",
          "Which fund is trending on social media?",
          "What did this fund return last week?",
          "Which fund has the shortest name?"
        ],
        correctAnswer: 0,
        explanation: "The right fund depends entirely on the job: goal, timeline, and risk tolerance come first — then you pick the cheapest good tool for that job."
      }
    ]
  },
  // BONDS-1: What Is a Bond
  {
    lessonId: "bonds-1",
    questions: [
      {
        id: "bonds-1-q1",
        question: "What is a bond, at its core?",
        options: [
          "A share of ownership in a company",
          "A loan you make to a borrower",
          "A savings account with a debit card",
          "A coupon for discounts at retail stores"
        ],
        correctAnswer: 1,
        explanation: "A bond is basically an IOU: you lend money to a government or company, and they promise to pay you back with interest."
      },
      {
        id: "bonds-1-q2",
        question: "What does a typical bond investor receive?",
        options: [
          "Voting rights at annual shareholder meetings",
          "Free products from the issuing company",
          "A percentage of the company's yearly profits",
          "Regular interest plus their money back"
        ],
        correctAnswer: 3,
        explanation: "Bondholders earn scheduled interest payments and get their principal returned when the bond matures — profits and voting rights belong to stockholders."
      },
      {
        id: "bonds-1-q3",
        question: "How is a bondholder different from a stockholder?",
        options: [
          "A bondholder is a lender, not an owner",
          "A bondholder owns a small piece of the business",
          "A bondholder gets paid only if profits rise",
          "A bondholder can vote on company decisions"
        ],
        correctAnswer: 0,
        explanation: "Buying a bond makes you a lender with a claim to interest and repayment. Buying stock makes you a part-owner."
      },
      {
        id: "bonds-1-q4",
        question: "Your city sells bonds to build a new high school gym. What are buyers actually doing?",
        options: [
          "Donating money to the school district",
          "Buying ownership shares of the gym's future profits",
          "Lending the city money to repay later",
          "Paying extra property taxes in advance"
        ],
        correctAnswer: 2,
        explanation: "Municipal bond buyers are lending the city money. The city repays them with interest, often funded by taxes or project revenue."
      },
      {
        id: "bonds-1-q5",
        question: "Jaden buys a $1,000 bond that matures in five years. What happens at maturity?",
        options: [
          "The bond converts into company stock automatically",
          "He must reinvest in another bond immediately",
          "The issuer keeps the money as a fee",
          "He gets his $1,000 principal back"
        ],
        correctAnswer: 3,
        explanation: "At maturity the issuer repays the bond's face value — Jaden's $1,000 — having already paid him interest along the way."
      },
      {
        id: "bonds-1-q6",
        question: "A company needs cash but doesn't want to give up ownership. What can it do?",
        options: [
          "Sell new shares of stock to investors",
          "Issue bonds and borrow the money",
          "Give employees ownership stakes for free",
          "Ask shareholders to donate extra cash"
        ],
        correctAnswer: 1,
        explanation: "Issuing bonds lets a company raise cash by borrowing. Lenders get interest, but no ownership or votes change hands."
      },
      {
        id: "bonds-1-q7",
        question: "Why are bonds generally considered less risky than stocks?",
        options: [
          "Payments are fixed and promised by contract",
          "Bond values never drop under any market conditions",
          "The government insures every bond against loss",
          "Bonds always earn more money than stocks"
        ],
        correctAnswer: 0,
        explanation: "Bonds promise specific interest and repayment dates, and bondholders get paid before stockholders if trouble hits. They can still lose value, though."
      },
      {
        id: "bonds-1-q8",
        question: "What does a bond's 'face value' mean?",
        options: [
          "The total interest earned over its life",
          "The price it trades at every day",
          "The amount repaid at maturity",
          "The fee charged to buy the bond"
        ],
        correctAnswer: 2,
        explanation: "Face value (or par) is the amount the issuer promises to repay when the bond matures — often $1,000 per bond."
      }
    ]
  },

  // BONDS-2: Gov vs Corporate
  {
    lessonId: "bonds-2",
    questions: [
      {
        id: "bonds-2-q1",
        question: "Why are U.S. Treasury bonds considered among the safest investments?",
        options: [
          "They're backed by the federal government",
          "They pay the highest interest rates available",
          "Their prices never move up or down",
          "They're insured by private banking companies"
        ],
        correctAnswer: 0,
        explanation: "Treasuries are backed by the full faith and credit of the U.S. government, which has the power to tax — making default extremely unlikely."
      },
      {
        id: "bonds-2-q2",
        question: "Compared to Treasuries, corporate bonds usually pay...",
        options: [
          "Lower interest, since companies are safer borrowers",
          "Exactly the same interest by federal law",
          "Higher interest to offset default risk",
          "No interest, only gains from price changes"
        ],
        correctAnswer: 2,
        explanation: "Companies can go bankrupt, so investors demand extra yield to lend to them. More risk, more required reward."
      },
      {
        id: "bonds-2-q3",
        question: "Who issues municipal bonds?",
        options: [
          "Large corporations selling new products",
          "States, cities, and local governments",
          "The federal government's treasury department in Washington",
          "Individual investors with extra savings"
        ],
        correctAnswer: 1,
        explanation: "Municipal bonds come from state and local governments to fund things like schools, roads, and water systems. Their interest is often tax-free."
      },
      {
        id: "bonds-2-q4",
        question: "Grandpa Lou wants maximum safety for money he'll need in ten years. Which bond fits best?",
        options: [
          "A junk bond from a struggling startup",
          "A corporate bond from a new restaurant chain",
          "An unrated bond from an overseas company",
          "A bond issued by the U.S. Treasury"
        ],
        correctAnswer: 3,
        explanation: "For maximum safety, Treasuries are the gold standard — the federal government backs them, so default risk is about as low as it gets."
      },
      {
        id: "bonds-2-q5",
        question: "Tara accepts extra risk in exchange for more bond income. Which choice matches her goal?",
        options: [
          "Corporate bonds with higher interest payments",
          "Treasury bonds with the lowest yields offered",
          "A savings account at her local bank",
          "Cash stored safely inside a home safe"
        ],
        correctAnswer: 0,
        explanation: "Corporate bonds pay more than Treasuries precisely because they carry more default risk — a fit for Tara's higher risk tolerance."
      },
      {
        id: "bonds-2-q6",
        question: "What does it mean when a bond issuer 'defaults'?",
        options: [
          "It pays bondholders earlier than scheduled",
          "It raises the bond's interest rate",
          "It fails to make promised payments",
          "It converts the bonds into new stock"
        ],
        correctAnswer: 2,
        explanation: "Default means the issuer breaks its promise — missing interest payments or failing to repay principal. It's the core risk corporate bondholders face."
      },
      {
        id: "bonds-2-q7",
        question: "A solid company's bond yields 6% while a Treasury yields 4%. What explains the gap?",
        options: [
          "Treasuries are only sold to wealthy investors",
          "Corporate bonds always mature much faster",
          "The company simply enjoys giving money away",
          "Investors demand payment for extra risk"
        ],
        correctAnswer: 3,
        explanation: "That 2% gap is the risk premium — compensation investors require for the chance the company might not pay them back."
      },
      {
        id: "bonds-2-q8",
        question: "Why can the U.S. government borrow money more cheaply than most companies?",
        options: [
          "It promises to repay bonds within one week",
          "Its repayment is seen as nearly certain",
          "It secretly pays lenders extra hidden bonuses",
          "Federal law caps rates the government pays"
        ],
        correctAnswer: 1,
        explanation: "Lenders accept lower interest when repayment feels guaranteed. The government's taxing power makes its promise about as reliable as promises get."
      }
    ]
  },

  // BONDS-3: Yield
  {
    lessonId: "bonds-3",
    questions: [
      {
        id: "bonds-3-q1",
        question: "What is a bond's 'coupon'?",
        options: [
          "A discount code for buying more bonds",
          "The bond's price on the open market",
          "The fixed interest payment it makes",
          "A fee paid to the bond broker"
        ],
        correctAnswer: 2,
        explanation: "The coupon is the fixed interest a bond pays, usually twice a year. The name comes from paper coupons investors once clipped and redeemed."
      },
      {
        id: "bonds-3-q2",
        question: "How do you calculate a bond's current yield?",
        options: [
          "Annual coupon divided by current price",
          "Current price divided by annual coupon",
          "Face value multiplied by years to maturity",
          "Annual coupon added to the face value"
        ],
        correctAnswer: 0,
        explanation: "Current yield is the annual coupon divided by the current price. It shows the income you'd earn relative to what the bond costs today."
      },
      {
        id: "bonds-3-q3",
        question: "In what two ways can a bond make money for an investor?",
        options: [
          "Dividends and voting rights at meetings",
          "Tax refunds and company profit sharing",
          "Rental income and property value growth",
          "Interest payments and price changes"
        ],
        correctAnswer: 3,
        explanation: "Bonds pay steady interest, and their market price can also rise or fall — sell above what you paid and that's extra return."
      },
      {
        id: "bonds-3-q4",
        question: "A $1,000 bond pays $50 in interest each year. What's its current yield at that price?",
        options: [
          "Fifty percent, matching the full coupon payment",
          "Five percent: $50 divided by $1,000",
          "One percent, after fees are removed",
          "Half a percent, paid out monthly"
        ],
        correctAnswer: 1,
        explanation: "Current yield is coupon divided by price: $50 divided by $1,000 equals 5%."
      },
      {
        id: "bonds-3-q5",
        question: "A bond's coupon is fixed at $40 per year, and its price falls to $800. What's its current yield now?",
        options: [
          "Four percent, unchanged from before the drop",
          "Three percent, since cheaper bonds pay less",
          "Five percent: $40 divided by $800",
          "Eight percent, matching the price decline amount"
        ],
        correctAnswer: 2,
        explanation: "$40 divided by $800 equals 5%. The coupon didn't change, but paying less for the same income means a higher yield."
      },
      {
        id: "bonds-3-q6",
        question: "A bond's price drops while its coupon stays fixed. What happens to its current yield?",
        options: [
          "It rises, since the income costs less",
          "It falls along with the bond's price",
          "It stays exactly the same as before",
          "It drops immediately to zero percent for good"
        ],
        correctAnswer: 0,
        explanation: "Yield and price move in opposite directions. The same fixed coupon on a cheaper bond equals a bigger percentage return."
      },
      {
        id: "bonds-3-q7",
        question: "Why do a bond's price and its yield move in opposite directions?",
        options: [
          "Bond issuers secretly adjust coupons when prices move",
          "The same fixed coupon costs buyers less",
          "Stock markets force bonds to match returns",
          "Brokers change yields to attract new customers"
        ],
        correctAnswer: 1,
        explanation: "The coupon is locked in, so when the price falls, that same payment represents a larger percentage of what a buyer pays — yield rises."
      },
      {
        id: "bonds-3-q8",
        question: "What does 'yield to maturity' estimate?",
        options: [
          "The bond's rating during its final year",
          "How long until the bond can be sold",
          "The tax owed when the bond matures",
          "Your total return if held to maturity"
        ],
        correctAnswer: 3,
        explanation: "Yield to maturity combines all coupon payments plus any gain or loss from the price you paid, assuming you hold until the bond matures."
      }
    ]
  },

  // BONDS-4: Ratings
  {
    lessonId: "bonds-4",
    questions: [
      {
        id: "bonds-4-q1",
        question: "What does a bond credit rating measure?",
        options: [
          "How fast the bond's price will grow yearly",
          "How likely the issuer repays its debt",
          "How many investors currently own the bond",
          "How much interest the government allows"
        ],
        correctAnswer: 1,
        explanation: "Ratings grade the issuer's ability to make its payments — essentially a credit score for governments and companies borrowing money."
      },
      {
        id: "bonds-4-q2",
        question: "Where does 'investment grade' begin on the rating scale?",
        options: [
          "BBB- (or Baa3) and above",
          "Only the single top rating, AAA",
          "Any rating that includes a letter",
          "CCC ratings and every grade higher"
        ],
        correctAnswer: 0,
        explanation: "Investment grade runs from AAA down to BBB- (S&P and Fitch) or Baa3 (Moody's). Anything below that line is considered high-yield."
      },
      {
        id: "bonds-4-q3",
        question: "Bonds rated below investment grade are commonly called...",
        options: [
          "Starter bonds for newer investors",
          "Discount bonds sold at half price",
          "Junk bonds, or high-yield bonds",
          "Penalty bonds under federal review"
        ],
        correctAnswer: 2,
        explanation: "Below BBB-/Baa3, bonds are labeled high-yield or 'junk' — the issuer's ability to pay is shakier, so they must offer bigger interest payments."
      },
      {
        id: "bonds-4-q4",
        question: "Which organizations assign bond credit ratings?",
        options: [
          "The New York Stock Exchange board",
          "Each company's own accounting department",
          "The IRS and state tax offices",
          "Agencies like Moody's and S&P"
        ],
        correctAnswer: 3,
        explanation: "Independent agencies — Moody's, S&P Global, and Fitch — research issuers and publish ratings that investors use to gauge default risk."
      },
      {
        id: "bonds-4-q5",
        question: "Nia compares a AAA bond and a B-rated bond from different companies. What should she expect?",
        options: [
          "The AAA bond pays higher interest than the B",
          "The B bond yields more, risks more",
          "Both bonds carry identical risk and yield",
          "The B bond is safer than the AAA"
        ],
        correctAnswer: 1,
        explanation: "Lower-rated bonds must offer higher yields to compensate for higher default risk. The AAA issuer borrows cheaply because it's trusted."
      },
      {
        id: "bonds-4-q6",
        question: "A company's rating gets cut from BBB- to BB+. What just happened?",
        options: [
          "It earned a small upgrade in quality",
          "It moved to the safest rating tier",
          "Nothing meaningful changed, since both grades sound similar",
          "It dropped from investment grade to junk"
        ],
        correctAnswer: 3,
        explanation: "BBB- is the last investment-grade rung; BB+ is the top of junk territory. Crossing that line can force some funds to sell the bond."
      },
      {
        id: "bonds-4-q7",
        question: "Why do junk bonds offer higher interest than investment-grade bonds?",
        options: [
          "Buyers demand extra pay for default risk",
          "Rating agencies set their coupons higher legally",
          "Junk issuers always have extra spare cash",
          "High coupons are a reward for loyal shareholders"
        ],
        correctAnswer: 0,
        explanation: "Shakier issuers must sweeten the deal to find lenders. The higher yield is compensation for a real chance of missed payments."
      },
      {
        id: "bonds-4-q8",
        question: "How should a smart investor treat a AAA rating?",
        options: [
          "As a legally binding guarantee against any loss",
          "As proof the bond's price cannot fall",
          "As an informed opinion, not a promise",
          "As a signal to avoid the bond"
        ],
        correctAnswer: 2,
        explanation: "Ratings are expert opinions that can change — some highly rated securities failed in 2008. They're useful guides, not guarantees."
      }
    ]
  },

  // BONDS-5: Inflation Risk
  {
    lessonId: "bonds-5",
    questions: [
      {
        id: "bonds-5-q1",
        question: "Why is inflation a problem for bond investors?",
        options: [
          "It legally forces issuers to skip coupon payments",
          "It makes bond prices rise too quickly",
          "It doubles the taxes owed on interest",
          "Fixed payments buy less as prices rise"
        ],
        correctAnswer: 3,
        explanation: "A bond's payments are usually fixed in dollars. When prices rise, those same dollars purchase less — quietly shrinking your real return."
      },
      {
        id: "bonds-5-q2",
        question: "What does 'purchasing power' mean?",
        options: [
          "The number of bonds you can buy",
          "How much your money actually buys",
          "The credit limit on your card",
          "Your power to negotiate lower store prices"
        ],
        correctAnswer: 1,
        explanation: "Purchasing power is what your dollars can actually get you. Inflation erodes it — $100 buys less next year than it does today."
      },
      {
        id: "bonds-5-q3",
        question: "Which investment is specifically designed to protect against inflation?",
        options: [
          "TIPS, whose principal adjusts with inflation",
          "Long-term corporate bonds with fixed coupons",
          "A zero-interest checking account balance",
          "A 30-year Treasury with fixed payments"
        ],
        correctAnswer: 0,
        explanation: "Treasury Inflation-Protected Securities (TIPS) adjust their principal with the Consumer Price Index, so payments keep pace with rising prices."
      },
      {
        id: "bonds-5-q4",
        question: "Leo's bond yields 3% while inflation runs 5%. What's happening to his money?",
        options: [
          "He's earning a solid 8% combined real return",
          "He's breaking even after all adjustments",
          "He's losing about 2% in purchasing power",
          "He's gaining exactly 5% in real terms"
        ],
        correctAnswer: 2,
        explanation: "Real return is roughly yield minus inflation: 3% minus 5% equals about -2%. His balance grows, but what it can buy shrinks."
      },
      {
        id: "bonds-5-q5",
        question: "Ava locks money into a 20-year bond paying a fixed $30 yearly. If inflation stays high, what happens?",
        options: [
          "The issuer raises her payment to match",
          "Each $30 payment buys less over time",
          "Her bond automatically converts into TIPS",
          "Inflation automatically increases the bond's face value yearly"
        ],
        correctAnswer: 1,
        explanation: "Fixed coupons don't adjust. With high inflation, the same $30 buys less every year — long-term fixed bonds feel this the most."
      },
      {
        id: "bonds-5-q6",
        question: "Sam is worried rising prices will erode his bond income. Which move directly targets that fear?",
        options: [
          "Buying longer-term bonds with fixed coupons",
          "Holding all his savings in cash",
          "Picking bonds with the lowest coupon rates",
          "Adding TIPS to his bond mix"
        ],
        correctAnswer: 3,
        explanation: "TIPS are built for exactly this: their principal rises with inflation, protecting the real value of Sam's payments."
      },
      {
        id: "bonds-5-q7",
        question: "What's the difference between a nominal return and a real return?",
        options: [
          "Real returns subtract inflation; nominal ones don't",
          "Nominal returns subtract inflation; real ones don't",
          "Real returns only count reinvested dividend income",
          "Nominal returns apply only to stock market investments"
        ],
        correctAnswer: 0,
        explanation: "Nominal return is the sticker number; real return adjusts for inflation to show growth in actual purchasing power — what really matters."
      },
      {
        id: "bonds-5-q8",
        question: "Which bond suffers MOST from an unexpected jump in inflation?",
        options: [
          "A TIPS bond with inflation-adjusted principal",
          "A short-term bond maturing and repaying next month",
          "A 30-year bond with low fixed coupons",
          "A savings bond adjusted for price changes"
        ],
        correctAnswer: 2,
        explanation: "Decades of fixed low payments are exactly what inflation eats. Short-term bonds reprice quickly and TIPS adjust, but long fixed coupons can't."
      }
    ]
  },

  // BONDS-6: Interest Rate Risk
  {
    lessonId: "bonds-6",
    questions: [
      {
        id: "bonds-6-q1",
        question: "When market interest rates rise, what happens to existing bond prices?",
        options: [
          "They rise right along with rates",
          "They stay frozen at face value",
          "They fall as new bonds pay more",
          "They double in value to attract nervous investors"
        ],
        correctAnswer: 2,
        explanation: "Bond prices and interest rates move inversely. When new bonds pay more, older lower-paying bonds must sell at a discount to compete."
      },
      {
        id: "bonds-6-q2",
        question: "Why does a rate increase hurt older bonds?",
        options: [
          "New bonds make old coupons look weak",
          "The government cancels older bonds first",
          "Issuers stop paying interest on old bonds",
          "Old bonds get automatically reissued at lower prices"
        ],
        correctAnswer: 0,
        explanation: "If new bonds pay 5% and yours pays 3%, nobody will pay full price for yours. Its price drops until its yield competes."
      },
      {
        id: "bonds-6-q3",
        question: "The Fed raises rates sharply, and Kayla checks her bond fund. What has most likely happened?",
        options: [
          "Her fund's value jumped alongside rates",
          "Her fund automatically converted its bonds into stocks",
          "Her fund's value stayed perfectly unchanged",
          "Her fund's value dipped as prices fell"
        ],
        correctAnswer: 3,
        explanation: "Rising rates push down the prices of the bonds her fund holds, so the fund's value dips — the inverse relationship in action."
      },
      {
        id: "bonds-6-q4",
        question: "Interest rates fall a year after Diego buys his bond. What happens to his bond's market value?",
        options: [
          "It falls immediately, since falling rates hurt bonds",
          "It rises because his coupon looks generous",
          "It becomes impossible to sell early",
          "It resets to exactly its face value"
        ],
        correctAnswer: 1,
        explanation: "The inverse works both ways: when rates fall, older bonds with higher coupons become more attractive and their prices rise."
      },
      {
        id: "bonds-6-q5",
        question: "Rates rose, but Marcus plans to hold his individual bond to maturity. What happens if the issuer stays solvent?",
        options: [
          "He still gets full face value back",
          "He must accept a permanently reduced repayment amount",
          "He forfeits all remaining coupon payments",
          "He owes the issuer the price difference"
        ],
        correctAnswer: 0,
        explanation: "Price swings only matter if you sell early. Held to maturity, a solvent issuer pays the promised coupons and full face value."
      },
      {
        id: "bonds-6-q6",
        question: "Rates jumped, and Priya must sell her bond before maturity to cover an emergency. What should she expect?",
        options: [
          "A price above what she originally paid",
          "Exactly her purchase price, guaranteed by law",
          "A price below what she paid",
          "A bonus payment for selling early"
        ],
        correctAnswer: 2,
        explanation: "Selling after rates rise usually means selling at a discount — buyers can get better yields elsewhere, so they won't pay full price."
      },
      {
        id: "bonds-6-q7",
        question: "Which bond's price swings MORE when rates change?",
        options: [
          "A short bond maturing in six months",
          "A bond maturing in thirty years",
          "A money market fund holding cash",
          "A bond that matures next week"
        ],
        correctAnswer: 1,
        explanation: "Longer-term bonds lock in their rate for longer, so a rate change affects many more future payments — their prices swing harder."
      },
      {
        id: "bonds-6-q8",
        question: "How is interest rate risk different from default risk?",
        options: [
          "Rate risk only affects bonds from weak companies",
          "Default risk disappears whenever interest rates fall",
          "They are two names for one identical risk",
          "Rate risk hits prices, default hits repayment"
        ],
        correctAnswer: 3,
        explanation: "Even Treasuries with zero default risk lose market value when rates rise. Default risk is about the issuer failing to pay; rate risk is about price."
      }
    ]
  },

  // BONDS-7: Duration
  {
    lessonId: "bonds-7",
    questions: [
      {
        id: "bonds-7-q1",
        question: "What does a bond's duration measure?",
        options: [
          "The exact years until its final coupon",
          "Its price sensitivity to rate changes",
          "The issuer's overall credit quality score",
          "How long the issuer has existed"
        ],
        correctAnswer: 1,
        explanation: "Duration estimates how much a bond's price moves when interest rates change — the higher the duration, the bigger the swing."
      },
      {
        id: "bonds-7-q2",
        question: "A higher duration means a bond is...",
        options: [
          "Safer from every kind of risk",
          "Guaranteed to pay larger coupons",
          "Much closer to reaching its maturity date",
          "More sensitive to interest rate moves"
        ],
        correctAnswer: 3,
        explanation: "Higher duration means a bigger price reaction to rate changes. It's the dial that tells you how bumpy the ride gets when rates move."
      },
      {
        id: "bonds-7-q3",
        question: "A bond has a duration of 5. Rates rise by 1%. Roughly how does its price react?",
        options: [
          "It falls by about 5%",
          "It rises by roughly 5% in value",
          "It falls by about 1% only",
          "It stays unchanged since duration blocks losses"
        ],
        correctAnswer: 0,
        explanation: "The rule of thumb: price change roughly equals duration times the rate change. A duration of 5 means about a 5% drop for a 1% rate rise."
      },
      {
        id: "bonds-7-q4",
        question: "Zoe's bond fund has a duration of 8. If rates climb 1%, what's the ballpark impact?",
        options: [
          "The fund gains about 8% in value",
          "The fund loses about 1% in value",
          "The fund loses about 8% in value",
          "The fund's value doesn't change from rate moves"
        ],
        correctAnswer: 2,
        explanation: "Duration 8 times a 1% rate rise means roughly an 8% price decline. Higher-duration funds take bigger hits when rates jump."
      },
      {
        id: "bonds-7-q5",
        question: "Rates seem likely to rise soon, and Eli wants his bond money to hold steadier. What's the smart tilt?",
        options: [
          "Move everything into 30-year Treasury bonds",
          "Pick the fund with the highest duration",
          "Buy bonds with the longest maturities available",
          "Shift toward shorter-duration bond funds"
        ],
        correctAnswer: 3,
        explanation: "Shorter duration means smaller price drops when rates rise. Tilting short is the classic defensive move before expected rate hikes."
      },
      {
        id: "bonds-7-q6",
        question: "Rates drop 1%, and Mia's fund has a duration of 10. What roughly happens?",
        options: [
          "Her fund falls by close to 10%",
          "Her fund gains close to 10%",
          "Her fund loses exactly 1% instantly",
          "Her fund pays a special dividend bonus"
        ],
        correctAnswer: 1,
        explanation: "Duration cuts both ways: 10 times a 1% drop means roughly a 10% gain. Long-duration bonds are the biggest winners when rates fall."
      },
      {
        id: "bonds-7-q7",
        question: "Which bond has the HIGHER duration?",
        options: [
          "A two-year note with big coupons",
          "A Treasury bill maturing in three months",
          "A 30-year bond with tiny coupons",
          "A one-year bond paying monthly interest"
        ],
        correctAnswer: 2,
        explanation: "Long maturities and small coupons both stretch duration — most of that bond's cash arrives decades away, so rate changes hit it hardest."
      },
      {
        id: "bonds-7-q8",
        question: "How does duration differ from simple maturity?",
        options: [
          "Duration also weighs when coupons arrive",
          "Maturity measures risk; duration measures time",
          "Duration counts only the very first payment",
          "They're identical numbers for every single bond"
        ],
        correctAnswer: 0,
        explanation: "Maturity is just the end date. Duration weighs the timing of every payment, which is why big coupons pull duration below maturity."
      }
    ]
  },

  // BONDS-8: Bond Funds
  {
    lessonId: "bonds-8",
    questions: [
      {
        id: "bonds-8-q1",
        question: "What is a bond fund?",
        options: [
          "A pooled investment holding many bonds",
          "A savings account that buys stocks",
          "A single bond split between two owners",
          "A loan you take out to buy bonds"
        ],
        correctAnswer: 0,
        explanation: "A bond fund pools money from many investors to buy dozens or hundreds of bonds, giving everyone a slice of the whole basket."
      },
      {
        id: "bonds-8-q2",
        question: "What's a key advantage of bond funds over buying individual bonds?",
        options: [
          "Funds guarantee returns that individual bonds can't",
          "Funds are completely free of any fees",
          "Instant diversification with a small investment",
          "Funds never lose value when rates rise"
        ],
        correctAnswer: 2,
        explanation: "Individual bonds often cost $1,000 apiece; a fund spreads even a small deposit across hundreds of bonds, slashing single-issuer risk."
      },
      {
        id: "bonds-8-q3",
        question: "How do bond fund investors typically receive income?",
        options: [
          "Through voting rewards at yearly shareholder meetings",
          "Through regular distributions from the fund",
          "Through coupons mailed by each individual issuer",
          "Through guaranteed bonuses every single quarter"
        ],
        correctAnswer: 1,
        explanation: "The fund collects interest from all its bonds and passes it along to investors as distributions, usually monthly."
      },
      {
        id: "bonds-8-q4",
        question: "Marcus has $50 to invest in bonds, but individual bonds cost about $1,000 each. What's his practical option?",
        options: [
          "Wait several years until he saves $1,000",
          "Borrow $950 from friends to buy one bond",
          "Skip bonds entirely, since they're unavailable to teens",
          "Buy shares of a bond fund"
        ],
        correctAnswer: 3,
        explanation: "Bond funds and ETFs let small investors in — $50 buys a fractional slice of a portfolio holding hundreds of bonds."
      },
      {
        id: "bonds-8-q5",
        question: "How does a bond fund differ from a single bond you hold to maturity?",
        options: [
          "A fund pays no interest income at all",
          "A fund matures faster than any single bond",
          "A fund has no fixed maturity date",
          "A fund is always riskier than any stock"
        ],
        correctAnswer: 2,
        explanation: "Most bond funds constantly buy and sell bonds, so there's no date when you're guaranteed face value back — unlike holding one bond to maturity."
      },
      {
        id: "bonds-8-q6",
        question: "One company inside a 500-bond fund defaults. What happens to fund investors?",
        options: [
          "They feel only a tiny overall dent",
          "They lose their entire investment immediately",
          "They must personally repay the failed company's debt",
          "They automatically receive shares of the company"
        ],
        correctAnswer: 0,
        explanation: "That's diversification working: one default among 500 holdings barely moves the needle, while an all-in single bondholder would be crushed."
      },
      {
        id: "bonds-8-q7",
        question: "Why do expense ratios matter especially for bond funds?",
        options: [
          "High fees make bond funds completely tax-free investments",
          "Expenses only apply to stock funds legally",
          "Fees are refunded whenever the fund gains",
          "Fees eat much of a modest yield"
        ],
        correctAnswer: 3,
        explanation: "If a fund yields 4% and charges 1%, a quarter of your income is gone. Low costs matter most when expected returns are modest."
      },
      {
        id: "bonds-8-q8",
        question: "Rates rise and Dana's bond fund's value dips. What's the silver lining if she keeps investing?",
        options: [
          "The government reimburses her paper losses",
          "The fund reinvests in higher-yielding bonds",
          "Her old shares convert to stock automatically",
          "The dip guarantees a quick full recovery"
        ],
        correctAnswer: 1,
        explanation: "As older bonds mature, the fund buys new ones paying today's higher rates — so Dana's income yield gradually climbs."
      }
    ]
  },

  // BONDS-9: Fixed Income Role
  {
    lessonId: "bonds-9",
    questions: [
      {
        id: "bonds-9-q1",
        question: "What's the main job of bonds inside a diversified portfolio?",
        options: [
          "Delivering the portfolio's fastest possible growth",
          "Replacing the need for any stock holdings",
          "Steadying returns and providing reliable income",
          "Guaranteeing the portfolio never loses value"
        ],
        correctAnswer: 2,
        explanation: "Bonds are the shock absorbers: they smooth out stock swings and pay steady interest, trading some growth for stability."
      },
      {
        id: "bonds-9-q2",
        question: "Why is the bond side of investing called 'fixed income'?",
        options: [
          "Payments are set amounts on a schedule",
          "Investors' salaries get fixed by contract",
          "Returns are repaired whenever markets break",
          "The income stays fixed to daily stock prices"
        ],
        correctAnswer: 0,
        explanation: "Bonds promise defined interest payments on a set schedule — the amounts are 'fixed' in advance, unlike unpredictable stock returns."
      },
      {
        id: "bonds-9-q3",
        question: "During a stock market crash, what do high-quality bonds typically do?",
        options: [
          "Fall twice as far as stocks do",
          "Hold steadier, cushioning the portfolio's fall",
          "Get suspended from trading until markets recover",
          "Convert automatically into discounted stock shares"
        ],
        correctAnswer: 1,
        explanation: "Quality bonds often hold their value — or even rise — when stocks plunge, which is exactly why portfolios mix the two."
      },
      {
        id: "bonds-9-q4",
        question: "Compare a 90% stock portfolio to a 60/40 stock-bond mix. Which statement is accurate?",
        options: [
          "The 90% stock mix swings far less",
          "Both portfolios behave identically in crashes",
          "The 60/40 mix grows faster in booms",
          "The 60/40 mix swings less overall"
        ],
        correctAnswer: 3,
        explanation: "More bonds means smaller ups and downs. The 60/40 mix sacrifices some growth in exchange for a much smoother ride."
      },
      {
        id: "bonds-9-q5",
        question: "Jordan will need his college fund in two years. How should his bond allocation change?",
        options: [
          "Increase it to protect the money",
          "Cut it to zero for maximum growth",
          "Swap all bonds for cryptocurrency instead",
          "Move everything into aggressive small-cap stocks"
        ],
        correctAnswer: 0,
        explanation: "As a goal gets close, shifting toward bonds and cash protects the money from a badly timed stock crash."
      },
      {
        id: "bonds-9-q6",
        question: "Why might even a young, aggressive investor hold a small bond slice?",
        options: [
          "Bonds are legally required in every brokerage account",
          "Bonds always outperform stocks over decades",
          "Regulators penalize portfolios holding only stocks",
          "It softens crashes and steadies their nerves"
        ],
        correctAnswer: 3,
        explanation: "A bond cushion makes crashes less terrifying, helping investors avoid panic-selling — and it provides dry powder for rebalancing."
      },
      {
        id: "bonds-9-q7",
        question: "Stocks crash 30%, but Riley's bonds held their value. What rebalancing move does this enable?",
        options: [
          "Selling her stocks before they fall further",
          "Abandoning her written plan until markets feel safe",
          "Selling some bonds to buy cheap stocks",
          "Moving everything into cash for a decade"
        ],
        correctAnswer: 2,
        explanation: "Steady bonds give Riley something to sell high so she can buy stocks low — rebalancing turns the crash into an opportunity."
      },
      {
        id: "bonds-9-q8",
        question: "What's the main trade-off of holding more bonds?",
        options: [
          "Higher taxes on every future paycheck",
          "Lower expected long-term growth than stocks",
          "Losing access to your money for decades",
          "Paying penalties whenever stock markets rise"
        ],
        correctAnswer: 1,
        explanation: "Bonds historically return less than stocks over long periods. You're trading growth potential for stability — the right mix depends on your timeline."
      }
    ]
  },
  // __APPEND__
]
