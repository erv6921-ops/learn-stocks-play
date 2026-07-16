import type { LessonQuiz } from "../lessonQuizzes"

export const stocksAndMarketsQuizzes: LessonQuiz[] = [
  // MARKET-1: NYSE vs NASDAQ
  {
    lessonId: "market-1",
    questions: [
      {
        id: "market-1-q1",
        question: "Which statement correctly describes the NASDAQ exchange?",
        options: [
          "It is a fully electronic exchange known for tech stocks",
          "It is the oldest physical trading floor in Europe",
          "It only lists companies that pay large regular dividends",
          "It is a government agency that regulates every US stock trade"
        ],
        correctAnswer: 0,
        explanation: "The NASDAQ launched in 1971 as the world's first electronic stock market and is famous for listing technology giants. It has no physical trading floor."
      },
      {
        id: "market-1-q2",
        question: "What is the New York Stock Exchange (NYSE) best known for?",
        options: [
          "Being a crypto-only trading platform based in Chicago",
          "Trading only foreign company shares after midnight",
          "Its historic trading floor on Wall Street",
          "Selling government bonds directly to teenagers online"
        ],
        correctAnswer: 2,
        explanation: "The NYSE, founded in 1792, is famous for its physical trading floor at 11 Wall Street in New York City. It remains the world's largest exchange by the total value of listed companies."
      },
      {
        id: "market-1-q3",
        question: "Maya notices that Apple, Microsoft, and Google's parent Alphabet all trade on the same exchange. Which exchange is it most likely to be?",
        options: [
          "The Chicago Mercantile Exchange for commodities",
          "The NASDAQ, which lists many technology giants",
          "The London Stock Exchange in England",
          "A private market closed to regular investors everywhere"
        ],
        correctAnswer: 1,
        explanation: "The NASDAQ is home to most of the biggest US technology companies, including Apple, Microsoft, and Alphabet. Its electronic, tech-forward reputation attracted these companies early on."
      },
      {
        id: "market-1-q4",
        question: "How are the NYSE and NASDAQ similar?",
        options: [
          "Both are run by the US federal government directly",
          "Both require every single trade to happen face to face",
          "Both operate only on weekends and public holidays",
          "Both let investors buy and sell public company shares"
        ],
        correctAnswer: 3,
        explanation: "Despite their different histories and styles, both are stock exchanges where investors trade shares of publicly listed companies. They are private businesses regulated by the SEC, not government agencies."
      },
      {
        id: "market-1-q5",
        question: "A new tech startup wants a fully electronic listing with a tech-heavy reputation. Which option fits best?",
        options: [
          "NASDAQ, since it began as an electronic marketplace",
          "The Federal Reserve, since it manages the money supply",
          "A local credit union, since it handles member deposits",
          "The Treasury Department, since it issues new savings bonds"
        ],
        correctAnswer: 0,
        explanation: "The NASDAQ has been fully electronic since its start and is strongly associated with technology companies. That reputation makes it a natural fit for tech startups going public."
      },
      {
        id: "market-1-q6",
        question: "Why did the NASDAQ not need a physical trading floor when it launched in 1971?",
        options: [
          "Trading floors were banned by Congress that same year",
          "All its companies were too small to need real offices",
          "It matched buyers and sellers using computer systems",
          "Stockbrokers refused to work inside buildings back then"
        ],
        correctAnswer: 2,
        explanation: "The NASDAQ was built from day one as a computerized quotation system, so orders could be matched electronically. No floor full of shouting traders was ever necessary."
      },
      {
        id: "market-1-q7",
        question: "Why might a large, established company like Coca-Cola choose to list on the NYSE?",
        options: [
          "The NYSE forbids technology companies from ever listing",
          "The NYSE's long history carries prestige for classic brands",
          "The NYSE lets companies skip all financial reporting rules",
          "The NYSE guarantees that the stock price will always rise"
        ],
        correctAnswer: 1,
        explanation: "The NYSE's 200-plus years of history give it a reputation for tradition and stability that appeals to established brands. No exchange can guarantee prices or waive SEC reporting rules."
      },
      {
        id: "market-1-q8",
        question: "Jordan wants to buy shares of a company listed on the NYSE using a phone app. What has to happen?",
        options: [
          "He must fly to New York and shout an order",
          "He must mail a paper check to the exchange first",
          "He must be a licensed professional floor trader himself",
          "His broker routes the order to the exchange electronically"
        ],
        correctAnswer: 3,
        explanation: "Regular investors trade through brokers, and today nearly all orders are routed and matched electronically, even on the NYSE. Jordan never has to visit the trading floor."
      }
    ]
  },

  // MARKET-2: Market Makers
  {
    lessonId: "market-2",
    questions: [
      {
        id: "market-2-q1",
        question: "What is the main job of a market maker?",
        options: [
          "To set the official price of every stock daily",
          "To stand ready to buy and sell shares continuously",
          "To arrest traders who break securities laws quickly",
          "To print brand new stock certificates for growing public companies"
        ],
        correctAnswer: 1,
        explanation: "Market makers constantly quote prices at which they will buy and sell a stock, so other traders always have someone to trade with. This keeps markets running smoothly."
      },
      {
        id: "market-2-q2",
        question: "What is the 'bid-ask spread'?",
        options: [
          "The number of shares a company has issued",
          "The fee that the government charges on every single trade",
          "The time between placing and filling an order",
          "The gap between the buying and selling price"
        ],
        correctAnswer: 3,
        explanation: "The bid is the highest price buyers will pay and the ask is the lowest price sellers will accept. The difference between them is the spread."
      },
      {
        id: "market-2-q3",
        question: "A market maker quotes a $9.99 bid and a $10.01 ask for a stock. How do they earn money?",
        options: [
          "By pocketing the two-cent spread on many trades",
          "By charging investors a monthly subscription fee always",
          "By receiving a salary directly from the SEC",
          "By betting that every stock will fall dramatically tomorrow"
        ],
        correctAnswer: 0,
        explanation: "Market makers buy at the bid and sell at the ask, keeping the small difference. Repeated across millions of shares, those pennies add up to real profit."
      },
      {
        id: "market-2-q4",
        question: "Why are market makers important for everyday investors?",
        options: [
          "They eliminate every possible risk of losing money",
          "They guarantee every single investor a large yearly profit",
          "They ensure there is almost always a trading partner",
          "They personally approve every new investor's account application each morning"
        ],
        correctAnswer: 2,
        explanation: "Because market makers stand ready to buy or sell, investors can usually trade immediately instead of waiting for another person to show up. They provide liquidity, not guaranteed profits."
      },
      {
        id: "market-2-q5",
        question: "Tyler tries to sell a rarely traded stock and waits hours for a buyer. What role would a market maker have played?",
        options: [
          "Forcing Tyler to keep the stock for a full year",
          "Buying Tyler's shares quickly from their own inventory",
          "Reporting Tyler to regulators for selling too soon",
          "Raising the stock's price so Tyler earns more"
        ],
        correctAnswer: 1,
        explanation: "A market maker holds an inventory of shares and stands ready to buy even when no other investor wants to. That lets sellers like Tyler trade without long waits."
      },
      {
        id: "market-2-q6",
        question: "Where do market makers commonly operate?",
        options: [
          "Only inside physical bank branch lobbies in small towns",
          "Only at the Federal Reserve's headquarters in Washington",
          "On exchanges like the NASDAQ and the NYSE",
          "Only in overseas markets closed to American investors"
        ],
        correctAnswer: 2,
        explanation: "Market makers are firms that quote prices on stock exchanges such as the NASDAQ and the NYSE. Many stocks have multiple market makers competing to fill orders."
      },
      {
        id: "market-2-q7",
        question: "Why does a smaller bid-ask spread benefit you as a buyer?",
        options: [
          "It means the company pays a bigger dividend",
          "It means the stock price is guaranteed to rise soon",
          "It proves the company has zero business debt",
          "You lose less to trading costs each time"
        ],
        correctAnswer: 3,
        explanation: "The spread is a hidden cost of trading: you buy at the higher ask and sell at the lower bid. A tighter spread means less money lost on every round trip."
      },
      {
        id: "market-2-q8",
        question: "A stock shows a huge spread: $5.00 bid and $6.00 ask. What does this most likely suggest?",
        options: [
          "Few traders are active, so trading it costs more",
          "The company just doubled its profits this exact morning",
          "The stock will certainly be worth $7.00 by tomorrow",
          "Market makers are legally required to widen every spread daily"
        ],
        correctAnswer: 0,
        explanation: "Wide spreads usually mean low trading activity, so market makers demand more compensation for the risk of holding the stock. That makes each trade more expensive for investors."
      }
    ]
  },

  // MARKET-3: Trading Hours
  {
    lessonId: "market-3",
    questions: [
      {
        id: "market-3-q1",
        question: "What are regular US stock market trading hours in Eastern Time?",
        options: [
          "From midnight to noon on business days",
          "From 8:00 am to 8:00 pm daily",
          "From 9:30 am to 4:00 pm weekdays",
          "From 10:00 am to 6:00 pm on weekends"
        ],
        correctAnswer: 2,
        explanation: "The NYSE and NASDAQ hold their regular sessions from 9:30 am to 4:00 pm Eastern Time, Monday through Friday. Weekends are always closed."
      },
      {
        id: "market-3-q2",
        question: "On which days are US stock markets normally closed?",
        options: [
          "Weekends and certain federal holidays like Thanksgiving",
          "Every Wednesday for weekly system maintenance checks",
          "The first Monday of every single month",
          "Any day when it rains in New York City"
        ],
        correctAnswer: 0,
        explanation: "Markets close every Saturday and Sunday plus about nine holidays per year, such as Thanksgiving and Independence Day. There are no random weekday closures for maintenance or weather routines."
      },
      {
        id: "market-3-q3",
        question: "It's 7:00 pm ET on a Tuesday and Zoe places a regular market order in her app. What happens to it?",
        options: [
          "It executes instantly at the day's opening price",
          "It gets cancelled and her brokerage account is frozen",
          "It executes on Saturday morning at noon sharp",
          "It waits and executes when markets open Wednesday"
        ],
        correctAnswer: 3,
        explanation: "Regular orders placed after the 4:00 pm close are typically queued until the next trading day. Zoe's order would execute shortly after Wednesday's 9:30 am open."
      },
      {
        id: "market-3-q4",
        question: "What is the 'opening bell'?",
        options: [
          "A phone alert brokers send before every lunch break",
          "The signal marking the 9:30 am start of trading",
          "An alarm that rings whenever any stock price drops sharply",
          "A bell rung whenever a company first pays dividends"
        ],
        correctAnswer: 1,
        explanation: "The opening bell is the famous signal that regular trading has begun at 9:30 am ET. Companies often celebrate milestones by ringing it at the NYSE."
      },
      {
        id: "market-3-q5",
        question: "Liam lives in California, which is on Pacific Time. When does regular trading open for him?",
        options: [
          "At 6:30 am his local Pacific time",
          "At 9:30 am his local Pacific time",
          "At exactly noon sharp in his local Pacific time",
          "At 3:30 am his local Pacific time"
        ],
        correctAnswer: 0,
        explanation: "Markets open at 9:30 am Eastern, and Pacific Time is three hours behind. West Coast investors see the open at 6:30 am their time."
      },
      {
        id: "market-3-q6",
        question: "Why do stock markets have set opening and closing times?",
        options: [
          "To let brokers charge investors overtime fees at night",
          "Because computers cannot run after dark reliably",
          "To stop small investors from trading too often",
          "To gather buyers and sellers during shared hours"
        ],
        correctAnswer: 3,
        explanation: "Concentrating trading into set hours brings buyers and sellers together at the same time, which improves liquidity and makes prices fairer. Spreading trades thinly around the clock would do the opposite."
      },
      {
        id: "market-3-q7",
        question: "Why is the final hour of the trading day often the busiest?",
        options: [
          "Brokers legally must delete unused orders at 3 pm",
          "New stocks are only listed during the last hour",
          "Many big investors finish their trades before close",
          "The exchanges cut all trading fees after 3 pm"
        ],
        correctAnswer: 2,
        explanation: "Large funds and traders often complete their buying and selling before the 4:00 pm close, since closing prices are used to value portfolios. That rush creates heavy end-of-day volume."
      },
      {
        id: "market-3-q8",
        question: "The market closes at 4:00 pm ET, and Ava hears big news about her stock at 4:30 pm. What is true about her regular orders?",
        options: [
          "They will execute immediately at the 4:00 price",
          "They can't fill until regular trading resumes tomorrow",
          "They will execute at midnight automatically for her",
          "They are completely illegal to even place after hours"
        ],
        correctAnswer: 1,
        explanation: "Regular-session orders placed after the close simply wait for the next day's open. Only special extended-hours orders can trade in the evening session."
      }
    ]
  },

  // MARKET-4: Bull vs Bear
  {
    lessonId: "market-4",
    questions: [
      {
        id: "market-4-q1",
        question: "What is a bull market?",
        options: [
          "A period when farm animal stocks lead all trading",
          "A period when prices rise 20% or more",
          "A market open only during summer months yearly",
          "A market where only banks may buy shares"
        ],
        correctAnswer: 1,
        explanation: "A bull market is commonly defined as a broad rise of 20% or more from recent lows, usually paired with investor optimism. It has nothing to do with actual animals."
      },
      {
        id: "market-4-q2",
        question: "What defines a bear market?",
        options: [
          "Prices staying perfectly flat for over six months",
          "Trading volume doubling within a single week",
          "Interest rates rising twice in one year",
          "Prices falling 20% or more from highs"
        ],
        correctAnswer: 3,
        explanation: "A bear market means broad prices have dropped at least 20% from their recent highs. It usually comes with widespread pessimism about the economy."
      },
      {
        id: "market-4-q3",
        question: "Why is a rising market called a 'bull' market?",
        options: [
          "A bull attacks by thrusting its horns upward",
          "Live bulls were once traded on early stock exchanges",
          "A famous investor named Bull invented stocks",
          "Bull stands for 'buy until limits lift'"
        ],
        correctAnswer: 0,
        explanation: "The nickname comes from how each animal attacks: a bull swipes its horns upward, while a bear swipes its paws downward. The directions mirror rising and falling prices."
      },
      {
        id: "market-4-q4",
        question: "The S&P 500 falls 25% from its record high over four months. What is this called?",
        options: [
          "A bull market, since prices moved fast",
          "A correction, since it fell less than 10%",
          "A bear market, since the drop exceeds 20%",
          "A recession, because stock prices define the whole economy"
        ],
        correctAnswer: 2,
        explanation: "A decline of 20% or more from highs is a bear market, so a 25% drop qualifies. A recession is a shrinking economy, which is related but not the same thing."
      },
      {
        id: "market-4-q5",
        question: "Stocks have climbed steadily for three years and are up 80%, and investors feel confident. This describes a...",
        options: [
          "Bull market with rising prices and optimism",
          "Bear market with falling prices and fear",
          "Frozen market where no trades are happening at all",
          "Crash where prices collapsed in one day"
        ],
        correctAnswer: 0,
        explanation: "Years of rising prices combined with investor confidence are the classic signs of a bull market. Bear markets feature the opposite: falling prices and fear."
      },
      {
        id: "market-4-q6",
        question: "What is a market 'correction'?",
        options: [
          "A drop of 50% or even more from highs",
          "An exchange fixing a computer glitch quickly",
          "The SEC reversing an illegal trade officially",
          "A drop of roughly 10% from recent highs"
        ],
        correctAnswer: 3,
        explanation: "A correction is a decline of about 10% (but less than 20%) from recent highs. Corrections are common and much milder than bear markets."
      },
      {
        id: "market-4-q7",
        question: "Why might a bear market actually help a teenage investor who invests money monthly?",
        options: [
          "Bear markets legally protect all young investors from losses",
          "Their steady purchases grab more shares while cheap",
          "Falling prices always rebound within thirty days exactly",
          "Brokers waive all account fees during bear markets"
        ],
        correctAnswer: 1,
        explanation: "When prices are down, each monthly contribution buys more shares, which can pay off when the market eventually recovers. Young investors have decades to wait out downturns."
      },
      {
        id: "market-4-q8",
        question: "Historically, how do bull and bear markets compare in the US?",
        options: [
          "Bear markets usually last longer than bull markets",
          "They always alternate every exactly two years",
          "Bull markets have typically lasted longer than bears",
          "Bear markets have only ever happened before year 2000"
        ],
        correctAnswer: 2,
        explanation: "US bull markets have historically run for years while bear markets have usually been shorter. That's a key reason long-term investors have generally been rewarded for staying invested."
      }
    ]
  },

  // MARKET-5: Liquidity
  {
    lessonId: "market-5",
    questions: [
      {
        id: "market-5-q1",
        question: "What does 'liquidity' mean in investing?",
        options: [
          "How easily an asset converts to cash",
          "How much bottled water a company sells yearly",
          "The total debt a company owes banks",
          "The interest rate on a savings account"
        ],
        correctAnswer: 0,
        explanation: "Liquidity measures how quickly and easily you can turn an asset into cash without hurting its price. Cash itself is the most liquid asset of all."
      },
      {
        id: "market-5-q2",
        question: "Which asset is generally the MOST liquid?",
        options: [
          "A house in a quiet rural neighborhood",
          "A rare vintage baseball card collection",
          "Shares of a large well-known company",
          "A stake in a friend's small business"
        ],
        correctAnswer: 2,
        explanation: "Big-company stocks trade millions of shares daily, so they can be sold within seconds at a fair price. Houses, collectibles, and private businesses can take weeks or months to sell."
      },
      {
        id: "market-5-q3",
        question: "Ella owns a rare collectible sneaker worth $400 but needs cash today. What is her liquidity problem?",
        options: [
          "Sneakers are illegal to resell in most states",
          "Finding a fast buyer may mean accepting less",
          "Banks will not accept cash from sneaker sales",
          "Collectibles instantly lose all their value once worn outside"
        ],
        correctAnswer: 1,
        explanation: "Illiquid assets like collectibles can take time to sell at full value, so selling in a rush often means taking a discount. That is exactly what low liquidity costs you."
      },
      {
        id: "market-5-q4",
        question: "Why do investors care about a stock's liquidity?",
        options: [
          "Liquid stocks are completely exempt from all capital taxes",
          "Liquid stocks always pay much higher dividends",
          "Liquid stocks never fall during economic recessions",
          "It lets them trade quickly at fair prices"
        ],
        correctAnswer: 3,
        explanation: "High liquidity means you can get in or out of a position fast without moving the price against yourself. It doesn't change taxes, dividends, or protection from downturns."
      },
      {
        id: "market-5-q5",
        question: "A stock trades only 500 shares a day, and Marcus wants to sell 2,000 shares. What is likely to happen?",
        options: [
          "The exchange will buy his shares automatically",
          "His sale finishes instantly with zero price impact",
          "His selling could push the price down noticeably",
          "The SEC must first approve his sale in writing"
        ],
        correctAnswer: 2,
        explanation: "Selling four times the typical daily volume overwhelms the small pool of buyers, so Marcus would likely drive the price down or wait days to finish. That is the cost of low liquidity."
      },
      {
        id: "market-5-q6",
        question: "Which is a common sign of high liquidity in a stock?",
        options: [
          "Heavy daily volume and a tight spread",
          "A very high dollar price per single share",
          "A company founded over fifty years ago",
          "A logo that many consumers instantly recognize"
        ],
        correctAnswer: 0,
        explanation: "Lots of shares changing hands plus a narrow bid-ask spread show that buyers and sellers are plentiful. Age, fame, and share price alone don't guarantee easy trading."
      },
      {
        id: "market-5-q7",
        question: "Why is cash considered the ultimate liquid asset?",
        options: [
          "Cash automatically grows faster than any investment",
          "Cash is printed fresh by banks each week",
          "Cash never loses purchasing power over time",
          "It's already money, needing no conversion"
        ],
        correctAnswer: 3,
        explanation: "Liquidity measures how easily something becomes spendable money, and cash is already there. Ironically, cash is liquid but loses purchasing power to inflation over time."
      },
      {
        id: "market-5-q8",
        question: "An emergency fund should stay liquid. Which choice best fits that need?",
        options: [
          "A five-year certificate with early withdrawal penalties",
          "A savings account with instant access",
          "A rental property in another state",
          "A painting from an up-and-coming artist"
        ],
        correctAnswer: 1,
        explanation: "Emergencies demand money right away, and a savings account lets you withdraw instantly without penalties or hunting for a buyer. The other options are slow or costly to convert to cash."
      }
    ]
  },

  // __MORE__
]
