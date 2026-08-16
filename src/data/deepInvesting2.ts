import { StructuredLessonContent } from "@/types"

// Wave-2 deepened content (Mortgages-depth rebuild) for: investing-fundamentals + investing-intro
export const deepInvesting2: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // invfund-1: Why Investing Beats Saving
  // ─────────────────────────────────────────────
  {
    lessonId: "invfund-1",
    sections: [
      {
        type: "concept",
        title: "Saving Keeps Money Safe - Investing Makes It Grow",
        paragraphs: [
          "Saving and investing sound similar, but they do very different jobs. Saving means parking money somewhere safe, like a bank account, where it barely grows but is easy to grab. Investing means putting money into things like stocks or funds that can grow much faster, though their value bounces up and down along the way. Imagine you get $1,000 from a summer job. In a savings account earning 0.5%, after a year you'd have about $1,005. In investments averaging 8%, you'd have around $1,080. Same $1,000, very different results - and the gap only widens as years pass.",
          "The reason investing wins over long stretches is growth that stacks on itself. A typical savings account might pay well under 1% a year, while the U.S. stock market has historically returned roughly 7% to 10% a year on average over long periods. That difference feels tiny in one year but becomes enormous over decades. Money you won't need for a long time - like money for a car in ten years or retirement in forty - is money that could be working much harder than it does sitting in a bank earning almost nothing.",
          "That said, saving still matters. You need cash you can reach instantly for emergencies, like a broken phone or a surprise bill. The smart approach is to keep an emergency fund in savings, then invest the money you won't touch for years. Investing is not gambling: gambling has odds stacked against you, while investing in the broad market has historically grown over time. The trade-off is that investments can drop in the short term, so investing only makes sense for money you can leave alone long enough to ride out the dips."
        ],
        bullets: [
          "Saving is safe and instantly available but grows very slowly, often under 1% a year.",
          "Investing can grow money far faster, historically around 7%-10% a year, but values swing up and down.",
          "Keep an emergency fund in savings; invest money you won't need for years.",
          "The advantage of investing grows dramatically over long time periods.",
          "Investing the broad market is not gambling; it has historically grown over time."
        ],
        realWorldExample: "Two friends each set aside $2,000 at age 18. One keeps it in savings at 0.5%; forty years later it's about $2,440. The other invests it at an 8% average return; forty years later it's about $43,000. Same starting amount, roughly $40,000 apart - purely because one chose to invest for the long haul."
      },
      {
        type: "concept",
        title: "Why Waiting Costs You (And Small Amounts Add Up)",
        paragraphs: [
          "The biggest advantage a teen has isn't money - it's time. The earlier you start investing, the more years your money has to grow, and those extra years matter more than the amount you invest. Someone who invests $100 a month starting at 18 will usually end up with far more than someone who starts at 28 investing the same amount, even though the late starter puts in almost as much cash. The early bird just gave their money an extra decade to build on itself, and that head start is nearly impossible to catch up to later.",
          "You don't need to be rich to begin. Many apps let you start with $5 or $10, and buying 'fractional shares' means you can own a slice of an expensive stock instead of a whole share. Investing $25 a week - about the cost of a few lunches out - adds up to $1,300 a year, and invested over decades that habit can grow into tens of thousands of dollars. The point isn't the size of each deposit; it's building a steady habit early, because consistency plus time is what does the heavy lifting.",
          "The hidden cost of leaving too much in savings is inflation, which we'll explore more later. Prices tend to rise about 2% to 3% a year, so money that grows at 0.5% is actually losing buying power over time - it feels safe, but it's quietly shrinking. Investing aims to grow your money faster than prices rise, protecting and building your purchasing power. So 'playing it safe' by keeping everything in cash isn't truly safe for long-term goals; it's a slow leak that most people never notice until years later."
        ],
        bullets: [
          "Starting early beats starting big; extra years of growth are hard to make up later.",
          "Fractional shares and low-minimum apps let you begin with just a few dollars.",
          "Investing $25 a week builds a habit that can grow into large sums over decades.",
          "Consistency plus time matters more than the size of each deposit.",
          "Cash in savings loses buying power to inflation; investing aims to outpace rising prices."
        ],
        realWorldExample: "Ava starts investing $100 a month at 18; Ben starts the same $100 a month at 28. Both stop at 58 and earn 8% on average. Ava invested only $12,000 more than Ben, yet ends up with roughly $110,000 more - all because her money had ten extra years to grow on itself."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund1-mc1",
            question: "What is the main advantage of investing over saving for long-term goals?",
            options: [
              "Investments can never lose any value according to most guides",
              "Money grows much faster over long time periods",
              "You can always withdraw it in one second",
              "The government guarantees all the returns"
            ],
            correctAnswer: 1,
            explanation: "Investing historically grows money far faster than savings over long periods. It does carry short-term ups and downs and no guarantee, which is why it's for money you won't need soon."
          },
          {
            id: "invfund1-mc2",
            question: "Why should you still keep some money in savings instead of investing it all?",
            options: [
              "Savings accounts earn higher returns than stocks as a general rule",
              "You need cash you can reach instantly for emergencies",
              "Investing is completely illegal for teens according to most guides",
              "Savings accounts double your money every year"
            ],
            correctAnswer: 1,
            explanation: "An emergency fund in savings gives you instant access for surprise costs. You invest the money you won't need for years, so short-term dips don't force you to sell."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jordan's Graduation Money",
        narrative: "Jordan, 18, just received $3,000 in graduation gifts. Jordan wants to buy a car in about eight years and also wants to keep some cash handy in case the used laptop finally dies. Jordan is deciding how to split the money between a savings account and investments.",
        details: [
          "Jordan keeps $500 in savings as an emergency fund for surprise costs like a broken laptop.",
          "Jordan invests $2,500 for the car goal that's eight years away, giving it time to grow.",
          "At 0.5% savings, the invested portion would grow only about $100 over eight years.",
          "At an 8% average return, that same $2,500 could grow to roughly $4,600 in eight years."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund1-aq1",
          question: "Why is investing the $2,500 a smart move for Jordan's eight-year car goal?",
          options: [
              "The car goal is far enough away to ride out market swings",
              "Investments are guaranteed to never drop in value according to most guides",
              "Savings accounts always beat stocks over eight years as a general rule",
              "Jordan will surely need to spend all of that money again very soon"
            ],
          correctAnswer: 0,
          explanation: "Because the goal is eight years out, Jordan can leave the money invested through short-term dips and let it grow. Money needed next week belongs in savings, not investments."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Saving is for safety and quick access; investing is for long-term growth.",
          "Investing historically grows money far faster than savings over long periods.",
          "Keep an emergency fund in savings and invest money you won't need for years.",
          "Starting early gives your money more years to grow, which beats starting with more.",
          "Cash left in savings loses buying power to inflation over time."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invfund1-mastery1",
            question: "Historically, roughly what average yearly return has the broad U.S. stock market delivered over long periods?",
            options: [
              "About 0.5% a year according to most guides",
              "About 7% to 10% a year",
              "Exactly 50% a year as a general rule",
              "A guaranteed 100% a year"
            ],
            correctAnswer: 1,
            explanation: "Over long periods the broad market has averaged roughly 7%-10% a year. It isn't guaranteed and swings year to year, but it far outpaces typical savings rates."
          },
          {
            id: "invfund1-mastery2",
            question: "What is the single biggest advantage a teen investor has?",
            options: [
              "Time for money to grow",
              "A large starting balance",
              "Insider stock tips according to most guides",
              "Zero market risk ever"
            ],
            correctAnswer: 0,
            explanation: "Time is the teen's superpower. Extra years let growth stack on itself, which matters more than the amount invested and is hard to make up by starting later."
          },
          {
            id: "invfund1-mastery3",
            question: "Why isn't keeping all your money in savings truly 'safe' for long-term goals?",
            options: [
              "Banks secretly spend your deposits",
              "Inflation slowly erodes its buying power",
              "Savings accounts charge huge fees",
              "The money physically disappears according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Prices rise about 2%-3% a year, so money growing at under 1% loses purchasing power. It feels safe but quietly shrinks in what it can actually buy."
          },
          {
            id: "invfund1-mastery4",
            question: "What lets you start investing with only a few dollars in an expensive stock?",
            options: [
              "A government teen grant",
              "Buying fractional shares",
              "A mandatory $10,000 minimum",
              "Borrowing from the bank"
            ],
            correctAnswer: 1,
            explanation: "Fractional shares let you buy a slice of a pricey stock instead of a whole share, so you can begin with just a few dollars on many apps."
          },
          {
            id: "invfund1-mastery5",
            question: "How does investing differ from gambling?",
            options: [
              "Both have odds stacked against you according to most guides",
              "The broad market has historically grown over time",
              "Gambling always beats investing long term as a general rule",
              "Investing has no risk at all"
            ],
            correctAnswer: 1,
            explanation: "Gambling has odds against you, but the broad market has historically grown over the long run. Investing carries risk, yet it's fundamentally different from betting."
          },
          {
            id: "invfund1-mastery6",
            question: "Which money is best suited for investing rather than savings?",
            options: [
              "Rent money due next week",
              "Money you won't need for years",
              "Your daily lunch money according to most guides",
              "This month's phone bill as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Invest money you can leave alone for years so it can ride out short-term dips. Cash you'll need soon belongs in savings where it's safe and instantly available."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invfund-2: Compound Interest & the Rule of 72
  // ─────────────────────────────────────────────
  {
    lessonId: "invfund-2",
    sections: [
      {
        type: "concept",
        title: "Interest That Earns Its Own Interest",
        paragraphs: [
          "Compound interest is what happens when your money earns returns, and then those returns start earning returns too. Say you invest $1,000 at 10% a year. After year one you have $1,100 - you earned $100. In year two, you earn 10% on the full $1,100, not just the original $1,000, so you gain $110 and reach $1,210. Each year the base gets bigger, so each year's growth gets bigger. This snowball effect is the single most powerful force in personal finance, and it rewards people who leave their money alone to keep rolling.",
          "The contrast is simple interest, where you only ever earn on your original amount. With simple interest, that $1,000 at 10% would earn a flat $100 every year - $100, then $100, then $100. Over ten years simple interest gives you $2,000. But compound interest on the same $1,000 at 10% grows to about $2,594, because the growth kept building on a larger and larger balance. The longer the time frame, the more dramatically compound interest pulls ahead of simple interest.",
          "The two ingredients compounding loves are time and rate. More years means more rounds of growth stacking up, and a higher rate means each round is bigger. This is why starting young matters so much: a dollar invested at 18 has decades to compound, while the same dollar invested at 40 has far fewer rounds left. It's also why leaving investments alone beats constantly pulling money out - every withdrawal steals future growth that money would have generated for years to come. Even a modest 8% return, left untouched, roughly doubles your money about every nine years, and each new doubling is larger than the last, so patience quietly does more heavy lifting than any single clever decision you could make."
        ],
        bullets: [
          "Compound interest earns returns on both your money AND your past returns.",
          "Simple interest only ever pays on your original amount, so it grows in a straight line.",
          "Over time, compounding pulls dramatically ahead of simple interest.",
          "Compounding's two ingredients are time (more years) and rate (higher return).",
          "Withdrawing early steals future compounding, so leaving money invested pays off."
        ],
        realWorldExample: "Invest $5,000 at 8% and leave it alone. In about 9 years it roughly doubles to $10,000. In another 9 years it doubles again to $20,000, then $40,000, then $80,000 - without adding a single dollar. Each doubling is bigger than the last because compounding builds on a growing balance."
      },
      {
        type: "concept",
        title: "The Rule of 72: Compounding Math in Your Head",
        paragraphs: [
          "The Rule of 72 is a shortcut that tells you roughly how many years it takes for money to double at a given return. You just divide 72 by the yearly rate. At 8%, money doubles in about 72 ÷ 8 = 9 years. At 6%, it takes about 72 ÷ 6 = 12 years. At 12%, only about 6 years. It's not perfectly exact, but it's close enough to compare options fast and to see just how powerful a higher return really is over a lifetime of investing.",
          "The Rule of 72 also reveals why small differences in rate matter enormously. Money at 4% doubles every 18 years, so over 36 years it doubles twice - four times your money. Money at 8% doubles every 9 years, so over that same 36 years it doubles four times - sixteen times your money. The rate was only twice as high, but the ending amount is four times larger. That's the hidden reason fees and slightly lower returns cost you so much over decades.",
          "You can run the rule backward too: divide 72 by the years you have to find the rate you'd need. Want to double your money in 8 years? You'd need about 72 ÷ 8 = 9% a year. The rule works against you as well - inflation at 3% cuts your money's buying power in half in about 24 years. Keeping this simple tool in your head helps you sanity-check any investment claim, especially the too-good-to-be-true ones promising to double your cash overnight."
        ],
        bullets: [
          "Rule of 72: divide 72 by the yearly return to estimate the years to double your money.",
          "At 8% money doubles in about 9 years; at 6% about 12 years; at 12% about 6 years.",
          "Small rate differences compound into huge gaps over decades.",
          "Run it backward: 72 ÷ years needed = the rate you'd need to double in that time.",
          "Inflation compounds too, halving buying power in about 24 years at 3%."
        ],
        realWorldExample: "A teen invests $3,000 at 9%. By the Rule of 72, it doubles in about 8 years - to $6,000 by age 26. By 34 it's $12,000, by 42 it's $24,000, and by around 50 it's near $48,000. Four doublings from one early deposit, estimated with nothing but 72 divided by 9."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund2-mc1",
            question: "What makes compound interest different from simple interest?",
            options: [
              "Compound interest only pays on your original deposit",
              "Compound interest earns returns on your past returns too",
              "Simple interest grows faster over long periods according to most guides",
              "They produce exactly the same result every time"
            ],
            correctAnswer: 1,
            explanation: "Compounding pays returns on your original money AND on the returns you've already earned, so the balance snowballs. Simple interest only ever pays on the original amount."
          },
          {
            id: "invfund2-mc2",
            question: "Using the Rule of 72, about how long does money take to double at 6%?",
            options: [
              "About 6 years",
              "About 12 years",
              "About 24 years",
              "About 3 years"
            ],
            correctAnswer: 1,
            explanation: "72 ÷ 6 = 12, so money at a 6% return roughly doubles in 12 years. The Rule of 72 is a quick estimate, not an exact figure."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maria Uses the Rule of 72",
        narrative: "Maria, 16, has $4,000 saved from years of babysitting. A financial app offers a diversified fund that has averaged about 9% a year. Maria wants a rough idea of how much her money could become by the time she's older, without doing complicated math.",
        details: [
          "Using the Rule of 72, Maria estimates her money doubles about every 8 years (72 ÷ 9).",
          "By age 24 her $4,000 could be about $8,000, and by 32 about $16,000.",
          "By age 40 it could reach roughly $32,000 - all from that single early deposit.",
          "Because compounding builds on itself, each doubling adds more dollars than the last."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund2-aq1",
          question: "Why does Maria's later doubling add far more dollars than her first doubling?",
          options: [
            "The fund secretly raises its rate each year",
            "Each doubling builds on a larger balance",
            "Simple interest kicks in after year eight",
            "She keeps adding thousands of new dollars"
          ],
          correctAnswer: 1,
          explanation: "Compounding grows a bigger and bigger base. Doubling $16,000 to $32,000 adds far more than doubling $4,000 to $8,000, even though both are just one doubling."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Compound interest earns returns on your returns, creating a snowball effect.",
          "Simple interest only pays on your original amount, so it grows in a straight line.",
          "Time and rate are the two ingredients that supercharge compounding.",
          "The Rule of 72: divide 72 by the return to estimate years to double.",
          "Small rate differences compound into huge gaps over decades."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invfund2-mastery1",
            question: "You invest $1,000 at 10% compounded yearly. How much do you have after two years?",
            options: [
              "$1,200 exactly",
              "$1,210",
              "$1,100 only",
              "$2,000 total"
            ],
            correctAnswer: 1,
            explanation: "Year one: $1,000 grows to $1,100. Year two earns 10% on $1,100, adding $110 to reach $1,210. The second year earned more because the base grew."
          },
          {
            id: "invfund2-mastery2",
            question: "Using the Rule of 72, about how long to double money at 12%?",
            options: [
              "About 12 years",
              "About 6 years",
              "About 24 years",
              "About 2 years"
            ],
            correctAnswer: 1,
            explanation: "72 ÷ 12 = 6, so money at 12% roughly doubles every 6 years. Higher rates mean faster doublings under the Rule of 72."
          },
          {
            id: "invfund2-mastery3",
            question: "Why does starting to invest young matter so much for compounding?",
            options: [
              "Young people get higher rates by law",
              "More years mean more rounds of growth",
              "Compounding only works before age 20",
              "Older investors pay double taxes according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Each year is another round of growth stacking on the last. Starting young gives money decades of doublings, which is far more powerful than starting with more cash later."
          },
          {
            id: "invfund2-mastery4",
            question: "Over 36 years, how many times does money double at 8% versus 4%?",
            options: [
              "Both double twice according to most guides",
              "8% doubles four times; 4% doubles twice",
              "4% doubles more often as a general rule",
              "Neither one doubles at all over the long run"
            ],
            correctAnswer: 1,
            explanation: "At 8% money doubles every 9 years (four times in 36), reaching 16x. At 4% it doubles every 18 years (twice), reaching 4x. A doubled rate quadruples the result."
          },
          {
            id: "invfund2-mastery5",
            question: "How can you use the Rule of 72 to find a needed rate?",
            options: [
              "Multiply 72 by your target dollars",
              "Divide 72 by the years you have",
              "Subtract 72 from your rate according to most guides",
              "Add 72 to your current balance"
            ],
            correctAnswer: 1,
            explanation: "Divide 72 by the number of years to find the return needed to double in that time. To double in 8 years, you'd need about 72 ÷ 8 = 9%."
          },
          {
            id: "invfund2-mastery6",
            question: "What is the main cost of withdrawing invested money early?",
            options: [
              "You lose future compounding growth",
              "The bank charges a doubling fee",
              "Your original deposit vanishes",
              "Interest rates instantly drop to zero"
            ],
            correctAnswer: 0,
            explanation: "Every dollar pulled out stops compounding, giving up years of future growth it would have generated. Leaving money invested lets the snowball keep rolling."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invfund-3: Stocks: Owning a Piece of a Business
  // ─────────────────────────────────────────────
  {
    lessonId: "invfund-3",
    sections: [
      {
        type: "concept",
        title: "A Share Is a Slice of a Real Company",
        paragraphs: [
          "When you buy a stock, you're buying a tiny piece of an actual company - you become a part-owner, called a shareholder. If a company is divided into a million shares and you own 100 of them, you own a small slice of everything that company has and earns. That's why owning stock in a brand you like isn't just a bet on a number going up; it's owning a fraction of that real business, its stores, its products, and its future profits. Companies sell shares to raise money to grow, and in exchange, buyers get an ownership stake.",
          "Companies first sell shares to the public through an IPO - an Initial Public Offering. After that, those shares trade between investors on a stock exchange, like the New York Stock Exchange or Nasdaq. When you hear a stock 'went up,' it means people are willing to pay more for each slice than before. Prices move based on how well the company is doing and how excited or worried investors feel about its future. Nobody sets the 'right' price; it's the constant tug-of-war between buyers and sellers.",
          "As a part-owner, you can make money two ways. First, the share price can rise, so you could sell your slice for more than you paid - that gain is called a capital gain. Second, some companies share their profits directly with owners through payments called dividends, often paid every few months. Not every company pays dividends; younger, fast-growing companies often reinvest all their profits to grow bigger instead. Either way, as an owner your fortunes rise and fall with the company you bought into, so researching what a business actually does and how it makes money matters far more than chasing a stock just because its price happens to be climbing lately."
        ],
        bullets: [
          "Buying a stock makes you a part-owner (shareholder) of a real company.",
          "Companies first sell shares in an IPO, then shares trade on exchanges like the NYSE or Nasdaq.",
          "Stock prices move with company performance and investor expectations.",
          "You can profit from a rising price (capital gain) when you sell for more than you paid.",
          "Some companies also pay dividends, sharing profits directly with shareholders."
        ],
        realWorldExample: "Say you buy 5 shares of a company at $40 each, spending $200. A year later the shares are worth $52 each - your stake is now $260, a $60 capital gain. If the company also paid a $1 dividend per share, you'd have pocketed another $5 in cash along the way, just for being an owner."
      },
      {
        type: "concept",
        title: "The Reward and the Risk of Owning Stock",
        paragraphs: [
          "Stocks have historically been one of the best ways to grow wealth over long periods, but they come with real risk: prices go down as well as up. A stock can lose value if the company stumbles, a whole industry struggles, or the overall market drops. In the worst case - if a company goes bankrupt - its stock can become worthless, and shareholders are last in line to get any money back. This is why putting all your money into a single company's stock is so dangerous, no matter how much you love the brand.",
          "The key idea is volatility: a stock's price can swing a lot in the short term, sometimes 5% or 10% in a single day on big news. These swings feel scary, but for a long-term investor they're mostly noise. History shows that while the market drops regularly, it has recovered and grown over time. The mistake many beginners make is panic-selling during a dip, locking in a loss, then missing the recovery. Owning stock rewards patience and punishes emotional, reactive decisions.",
          "You reduce single-stock risk mainly by diversifying - owning many different companies instead of just one, often through funds we'll cover later. Think of stocks as ownership for the long haul, not lottery tickets to flip overnight. When you buy a slice of a solid business and hold it for years, you're betting that companies will keep innovating and earning over time, which they historically have. The reward for accepting the bumps is growth that savings accounts simply can't match."
        ],
        bullets: [
          "Stocks can grow wealth over time but can also lose value or become worthless if a company fails.",
          "Volatility means prices swing a lot short-term; that's normal, not a reason to panic.",
          "Panic-selling during dips locks in losses and misses the recovery.",
          "Owning just one company's stock is risky; diversifying across many reduces that danger.",
          "Stocks reward patient, long-term owners more than short-term traders."
        ],
        realWorldExample: "During a rough month, a popular tech stock might drop 20%, turning a $1,000 stake into $800. A panicked owner sells and locks in the $200 loss. A patient owner holds; over the next two years the stock recovers and climbs to $1,300. Same stock, opposite outcomes - decided by patience."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund3-mc1",
            question: "What do you actually own when you buy a share of stock?",
            options: [
              "A loan the company must repay you",
              "A small ownership piece of the company",
              "A guaranteed fixed yearly payment according to most guides",
              "A coupon for the company's products"
            ],
            correctAnswer: 1,
            explanation: "A share makes you a part-owner (shareholder) of the company. You own a slice of the business, not a loan or a guaranteed payment."
          },
          {
            id: "invfund3-mc2",
            question: "What is a dividend?",
            options: [
              "A fee you pay to own a stock",
              "A share of company profits paid to shareholders",
              "The tax charged when a stock rises according to most guides",
              "The price you paid for the share"
            ],
            correctAnswer: 1,
            explanation: "A dividend is a portion of profits a company pays directly to its shareholders, often every few months. Not all companies pay them; many growing firms reinvest instead."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Buys His First Stock",
        narrative: "Leo, 17, uses birthday money to buy 10 shares of a company he researched, at $30 per share ($300 total). Over the next year the price bounces around a lot - dropping to $24 at one point before climbing to $36. Leo watches nervously but remembers what he learned about long-term investing.",
        details: [
          "Leo owns a small slice of the company; the price swings are normal volatility.",
          "At its low of $24 per share, his $300 stake was worth only $240 on paper.",
          "He did not panic-sell during the dip, avoiding locking in that loss.",
          "By year-end at $36 per share, his stake is worth $360 - a $60 capital gain."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund3-aq1",
          question: "Why was holding through the dip the smarter choice for Leo?",
          options: [
              "Selling at $24 would have locked in a real loss",
              "Stock prices legally must rise every year as a general rule",
              "Dividends are paid only to panic-sellers according to most guides",
              "The company promised to refund his money over the long run"
            ],
          correctAnswer: 0,
          explanation: "Selling during the dip would have turned a temporary paper loss into a real one and missed the recovery. Holding through normal volatility let his stake grow to a gain."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A share makes you a part-owner of a real company.",
          "Companies raise money via an IPO; shares then trade on exchanges.",
          "You can profit from rising prices (capital gains) and sometimes dividends.",
          "Stocks can lose value; single-stock bets are risky, so diversify.",
          "Volatility is normal - patience beats panic-selling during dips."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invfund3-mastery1",
            question: "A company splits into 1,000,000 shares and you own 1,000. What do you own?",
            options: [
              "A loan the firm repays you",
              "One-thousandth of the company",
              "The entire company outright",
              "Nothing until it pays dividends"
            ],
            correctAnswer: 1,
            explanation: "Owning 1,000 of 1,000,000 shares means you own 1/1,000 of the company - a small ownership slice of the whole business, whether or not it pays dividends."
          },
          {
            id: "invfund3-mastery2",
            question: "What is an IPO?",
            options: [
              "A tax on stock profits as a general rule",
              "When a company first sells shares publicly",
              "A guaranteed dividend program according to most guides",
              "A rule that caps stock prices"
            ],
            correctAnswer: 1,
            explanation: "An IPO (Initial Public Offering) is when a company first sells its shares to the public. After that, shares trade between investors on exchanges."
          },
          {
            id: "invfund3-mastery3",
            question: "What is a capital gain?",
            options: [
              "A fee charged to own shares as a general rule",
              "Profit from selling a stock above what you paid",
              "A dividend paid every month according to most guides",
              "The total number of shares issued over the long run"
            ],
            correctAnswer: 1,
            explanation: "A capital gain is the profit you earn when you sell a stock for more than you paid. It's one of the two main ways owners make money, alongside dividends."
          },
          {
            id: "invfund3-mastery4",
            question: "Why is putting all your money in one stock risky?",
            options: [
              "One company can fail and wipe out that money",
              "Single stocks are illegal to own as a general rule",
              "One stock can never pay dividends over the long run",
              "Exchanges ban owning one company according to most guides"
            ],
            correctAnswer: 0,
            explanation: "If that single company stumbles or goes bankrupt, you could lose most or all of that money. Spreading across many companies (diversifying) reduces this danger."
          },
          {
            id: "invfund3-mastery5",
            question: "What does 'volatility' describe about a stock?",
            options: [
              "Its guaranteed yearly dividend according to most guides",
              "How much its price swings around",
              "The tax rate on its gains",
              "The number of owners it has"
            ],
            correctAnswer: 1,
            explanation: "Volatility is how much a price swings up and down. Short-term swings are normal; for long-term investors they're mostly noise, not a reason to panic-sell."
          },
          {
            id: "invfund3-mastery6",
            question: "What common mistake do beginners make during a market dip?",
            options: [
              "They buy more diversified funds according to most guides",
              "They panic-sell and lock in losses",
              "They wait patiently for recovery",
              "They collect their dividends calmly"
            ],
            correctAnswer: 1,
            explanation: "Panic-selling during a dip turns a temporary paper loss into a real one and often misses the recovery. Patience historically rewards long-term owners."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invfund-4: Bonds: Lending Your Money
  // ─────────────────────────────────────────────
  {
    lessonId: "invfund-4",
    sections: [
      {
        type: "concept",
        title: "A Bond Is a Loan You Make",
        paragraphs: [
          "When you buy a stock, you own part of a company. When you buy a bond, you do the opposite - you lend money and become a lender, not an owner. Governments and companies borrow money by issuing bonds, promising to pay you back the full amount on a set date plus regular interest along the way. So a bond is basically an IOU: you hand over cash today, collect interest payments for a few years, and get your original money back at the end. This makes bonds behave very differently from stocks.",
          "Bonds come with a few key terms. The face value (or par) is the amount you'll be repaid at the end, often $1,000. The coupon is the interest rate the bond pays, so a $1,000 bond with a 5% coupon pays you $50 a year. The maturity is the date you get your face value back - it might be 2 years away or 30. Between now and maturity, you collect those steady coupon payments, which is why bonds are prized by people who want predictable income rather than the roller-coaster of stock prices.",
          "Bonds are generally considered safer than stocks, but 'safer' doesn't mean risk-free. The main danger is default risk - the chance the borrower can't pay you back. U.S. government bonds (Treasuries) are considered extremely safe because the government is very unlikely to default. A shaky company's bond is riskier, so it must offer a higher coupon to attract lenders. That's the trade-off: safer bonds pay less interest, while riskier bonds pay more to make up for the added chance you won't be repaid. Rating agencies grade bonds from very safe down to risky 'junk' bonds, and that grade is a quick shorthand for how likely you are to actually get your money back on time."
        ],
        bullets: [
          "Buying a bond means lending money; you become a lender, not an owner.",
          "Face value is the amount repaid at the end; the coupon is the interest rate it pays.",
          "Maturity is the date you get your original money (face value) back.",
          "Bonds are generally safer than stocks but carry default risk - the borrower may not repay.",
          "Safer bonds (like U.S. Treasuries) pay less; riskier bonds pay more to attract lenders."
        ],
        realWorldExample: "You buy a $1,000 bond with a 5% coupon and a 3-year maturity. Each year you collect $50 in interest - $150 total over three years. At maturity you get your $1,000 face value back. All told you handed over $1,000 and received $1,150, as long as the borrower didn't default."
      },
      {
        type: "concept",
        title: "Why Bonds Balance a Portfolio",
        paragraphs: [
          "The biggest reason investors hold bonds is stability. Stocks can soar or crash, but high-quality bonds tend to stay steadier and keep paying interest even when the stock market is falling. Because bonds and stocks often don't move together, mixing them smooths out the ride. When stocks drop 20% in a bad year, the bond portion of a portfolio may hold its value or dip only slightly, cushioning the overall loss. That cushion helps investors stay calm and avoid panic-selling their stocks at the worst moment.",
          "There is one twist that surprises beginners: bond prices move opposite to interest rates. If you own a bond paying 4% and new bonds start paying 6%, nobody wants your lower-paying bond, so its resale price falls. If new bonds pay only 2%, your 4% bond becomes more valuable, so its price rises. You can ignore this if you hold a bond until maturity and just collect your face value - but it matters if you need to sell early. This is called interest-rate risk.",
          "How much you put in bonds usually depends on your time horizon and age. A teen investing for retirement decades away can hold mostly stocks, because there's plenty of time to recover from crashes, and can add bonds later. Someone close to needing the money - say, near retirement - shifts more toward bonds for safety and steady income. A common rule of thumb is to hold a higher percentage of stocks when young and gradually add bonds as your goal gets closer, trading some growth for stability."
        ],
        bullets: [
          "Bonds add stability because they stay steadier than stocks and pay regular interest.",
          "Stocks and bonds often don't move together, so mixing them smooths the ride.",
          "Bond prices move opposite to interest rates - this is interest-rate risk.",
          "If you hold a bond to maturity, price swings don't matter; you get face value back.",
          "Young investors hold mostly stocks; more bonds are added as a goal nears."
        ],
        realWorldExample: "In a year stocks fall 20%, a portfolio that's all stocks might drop from $10,000 to $8,000. A mix of 70% stocks and 30% steady bonds might fall to only about $8,700, because the bond slice barely moved. That smaller drop makes it far easier to stay invested and recover."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund4-mc1",
            question: "What role do you play when you buy a bond?",
            options: [
              "You become a part-owner of the company",
              "You become a lender who is owed money",
              "You become the company's employee according to most guides",
              "You become a customer buying products as a general rule"
            ],
            correctAnswer: 1,
            explanation: "A bond is a loan, so you're the lender. The issuer owes you your money back at maturity plus regular interest (the coupon) along the way."
          },
          {
            id: "invfund4-mc2",
            question: "A $1,000 bond has a 5% coupon. How much interest does it pay per year?",
            options: [
              "$5 a year",
              "$50 a year",
              "$500 a year",
              "$1,050 a year"
            ],
            correctAnswer: 1,
            explanation: "The coupon rate times the face value gives the yearly interest: 5% of $1,000 is $50 a year. You collect that until the bond matures and returns your $1,000."
          }
        ]
      },
      {
        type: "scenario",
        title: "Grace Adds Bonds for Balance",
        narrative: "Grace, 19, invests mostly in stocks but keeps hearing about market crashes and wants a smoother ride. She adds some high-quality bonds to her portfolio. A year later, the stock market drops sharply, and Grace checks how her mixed portfolio held up compared to going all-in on stocks.",
        details: [
          "Grace's stocks fell hard during the downturn, as stocks often do in bad years.",
          "Her bonds stayed steadier and kept paying their coupon interest.",
          "Because stocks and bonds didn't move together, her overall loss was cushioned.",
          "The smaller drop helped Grace stay calm and avoid panic-selling her stocks."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund4-aq1",
          question: "Why did adding bonds cushion Grace's portfolio during the crash?",
          options: [
              "Bonds are guaranteed to always gain value",
              "Bonds stayed steadier while stocks fell sharply",
              "Bonds automatically sold her stocks for her",
              "Bonds pay no interest during downturns according to most guides"
            ],
          correctAnswer: 1,
          explanation: "High-quality bonds tend to hold value and keep paying interest even as stocks drop. Because the two often don't move together, mixing them softened her overall loss."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A bond is a loan; you're the lender, owed your money back at maturity.",
          "Coupon is the interest rate; face value is what you're repaid at the end.",
          "Bonds are generally safer than stocks but carry default risk.",
          "Bonds add stability and often don't move with stocks, smoothing the ride.",
          "Young investors hold mostly stocks and add bonds as goals get closer."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invfund4-mastery1",
            question: "What is the 'maturity' of a bond?",
            options: [
              "The interest rate it pays yearly as a general rule",
              "The date you get your face value back",
              "The company that issued it according to most guides",
              "The tax owed on its interest"
            ],
            correctAnswer: 1,
            explanation: "Maturity is the date the bond ends and the issuer repays your face value. Until then, you collect the coupon interest payments."
          },
          {
            id: "invfund4-mastery2",
            question: "Why are U.S. Treasury bonds considered very safe?",
            options: [
              "They pay the highest interest rates according to most guides",
              "The government is very unlikely to default",
              "They never have to be repaid",
              "They double in value each year"
            ],
            correctAnswer: 1,
            explanation: "Treasuries are backed by the U.S. government, which is extremely unlikely to default. Because they're so safe, they also tend to pay lower interest than riskier bonds."
          },
          {
            id: "invfund4-mastery3",
            question: "Why does a riskier company's bond pay a higher coupon?",
            options: [
              "To make up for the greater chance of default",
              "Because the law requires exactly 10% according to most guides",
              "Because risky firms have extra cash as a general rule",
              "To avoid ever repaying the loan over the long run"
            ],
            correctAnswer: 0,
            explanation: "Higher default risk means lenders demand more interest to take the chance. That's the core trade-off: safer bonds pay less, riskier bonds pay more."
          },
          {
            id: "invfund4-mastery4",
            question: "What happens to your 4% bond's resale price if new bonds start paying 6%?",
            options: [
              "Its price rises above face value",
              "Its resale price falls",
              "Its coupon jumps to 6% too",
              "Nothing changes ever"
            ],
            correctAnswer: 1,
            explanation: "Bond prices move opposite to rates. When new bonds pay more, buyers won't pay full price for your lower-paying bond, so its resale value drops - that's interest-rate risk."
          },
          {
            id: "invfund4-mastery5",
            question: "Why do bonds help smooth out a portfolio's ups and downs?",
            options: [
              "They rise faster than stocks always",
              "They often don't move with stocks",
              "They eliminate all possible risk according to most guides",
              "They pay no interest at all"
            ],
            correctAnswer: 1,
            explanation: "Because bonds and stocks frequently don't move together, holding both cushions losses. When stocks drop, steady bonds can hold value and keep paying interest."
          },
          {
            id: "invfund4-mastery6",
            question: "Who typically holds a higher percentage of bonds?",
            options: [
              "A teen investing for 40 years out",
              "Someone close to needing the money",
              "Anyone who wants maximum growth",
              "People who never plan to spend it"
            ],
            correctAnswer: 1,
            explanation: "Those near their goal shift toward bonds for safety and steady income. Young investors with decades ahead can hold mostly stocks and add bonds later."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invfund-5: Mutual Funds & ETFs
  // ─────────────────────────────────────────────
  {
    lessonId: "invfund-5",
    sections: [
      {
        type: "concept",
        title: "One Purchase, Hundreds of Companies",
        paragraphs: [
          "Buying individual stocks one at a time is slow, expensive, and risky - if you only own three companies and one crashes, you're in trouble. Funds solve this. A mutual fund pools money from many investors and uses it to buy a big basket of stocks, bonds, or both. When you buy a share of the fund, you instantly own a tiny piece of everything inside it. So a single purchase can make you a part-owner of hundreds of companies at once, which is called instant diversification - the opposite of putting all your eggs in one basket.",
          "An ETF (Exchange-Traded Fund) works on the same pooling idea, but it trades on an exchange all day just like a stock, so its price moves in real time. A mutual fund, by contrast, is priced only once per day after markets close. Both hold baskets of investments, and both hand you diversification in one shot. The practical difference for a beginner is mostly how and when you buy them: ETFs trade like stocks with live prices, while mutual funds settle up at the end of the trading day.",
          "A hugely popular type is the index fund, which simply tries to match a market index like the S&P 500 - a list of 500 large U.S. companies. Instead of paying a manager to pick winners, an index fund just buys the whole list, which keeps costs extremely low and has historically beaten most stock-picking pros over time. This is why index funds and ETFs are often recommended as the simplest, cheapest way for regular people to own a slice of the entire market. Legendary investors have publicly bet that a plain low-cost index fund will beat teams of highly paid stock pickers over time, and history has largely proven them right."
        ],
        bullets: [
          "A mutual fund pools many investors' money to buy a big basket of stocks or bonds.",
          "Buying one fund share gives instant diversification across many companies.",
          "An ETF works like a fund but trades on an exchange all day with live prices.",
          "Mutual funds are priced once daily; ETFs are priced continuously.",
          "Index funds track a market index like the S&P 500 and keep costs very low."
        ],
        realWorldExample: "With $100, buying a single stock gets you one company. Buying a $100 share of an S&P 500 index fund makes you a part-owner of 500 large U.S. companies at once. If one of those 500 has a terrible year, it barely dents your total - that's the power of instant diversification."
      },
      {
        type: "concept",
        title: "Fees Are Small Numbers With Big Consequences",
        paragraphs: [
          "Funds aren't free - they charge a yearly fee called the expense ratio, shown as a percentage of your money. A fund with a 0.05% expense ratio charges just $0.50 a year per $1,000 invested, while one at 1.00% charges $10 per $1,000. These sound trivial, but over decades of compounding, high fees quietly eat a shocking share of your returns. This is why cheap index funds and ETFs, often charging under 0.10%, are so popular - low fees mean more of the growth stays in your pocket instead of the fund company's.",
          "Fees connect to a bigger debate: active versus passive investing. An actively managed fund pays experts to pick stocks, hoping to beat the market, and charges higher fees to cover their salaries. A passive index fund just copies an index and charges very little. The uncomfortable truth backed by decades of data is that most active funds fail to beat their index over the long run, especially after their higher fees are subtracted. So paying more often gets you less, not more.",
          "There are a few other things to watch. Some mutual funds charge a 'load' - a sales commission when you buy or sell - which you can usually avoid by choosing 'no-load' funds. Funds can also pass along taxes on dividends and gains. For most beginners, the winning formula is simple: choose a low-cost, no-load, broad index fund or ETF, invest regularly, and let diversification and low fees do the work. Small fee differences today become huge money differences over a lifetime."
        ],
        bullets: [
          "The expense ratio is the fund's yearly fee, shown as a percent of your money.",
          "Small-sounding fees compound into big losses over decades.",
          "Passive index funds usually beat most active funds after fees.",
          "Avoid 'loads' (sales commissions) by choosing no-load funds.",
          "A low-cost, broad index fund or ETF is a simple winning formula for beginners."
        ],
        realWorldExample: "Two people invest $10,000 for 30 years at an 8% return. One pays a 0.05% fee, the other 1.00%. The low-fee investor ends with about $99,000; the high-fee investor with about $76,000. That 0.95% difference quietly cost over $23,000 - all in fees, for the same investment."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund5-mc1",
            question: "What does buying one share of a diversified fund give you?",
            options: [
              "Ownership of a single company only as a general rule",
              "A tiny piece of many companies at once",
              "A guaranteed fixed interest payment according to most guides",
              "A loan the fund must repay you"
            ],
            correctAnswer: 1,
            explanation: "A fund pools money to buy a basket of investments, so one share gives you instant diversification - a small slice of many companies rather than just one."
          },
          {
            id: "invfund5-mc2",
            question: "What is an expense ratio?",
            options: [
              "A one-time fee to open an account according to most guides",
              "The fund's yearly fee as a percent of your money",
              "The tax rate on all your gains as a general rule",
              "The number of stocks in the fund over the long run"
            ],
            correctAnswer: 1,
            explanation: "The expense ratio is the yearly fee a fund charges, expressed as a percentage. Lower is better, because over decades even small fees eat a big share of returns."
          }
        ]
      },
      {
        type: "scenario",
        title: "Noah Compares Two Funds",
        narrative: "Noah, 18, wants to invest $5,000 for the long term. He finds two similar broad-market funds. Fund A is an index fund with a 0.05% expense ratio. Fund B is actively managed with a 1.00% expense ratio and a manager who promises to 'beat the market.' Noah has to choose.",
        details: [
          "Both funds hold hundreds of companies, giving Noah instant diversification.",
          "Fund A charges about $2.50 a year per $5,000; Fund B charges about $50 a year.",
          "Decades of data show most active funds fail to beat their index after fees.",
          "Over 30 years, the fee gap alone could cost Noah many thousands of dollars."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund5-aq1",
          question: "Which fund is likely the smarter long-term choice for Noah, and why?",
          options: [
              "Fund B, since higher fees guarantee higher returns over the long run",
              "Fund A, since low fees leave more growth for him",
              "Neither, because funds can't be diversified according to most guides",
              "Fund B, because active managers always win as a general rule"
            ],
          correctAnswer: 1,
          explanation: "Low-cost Fund A keeps more of the growth in Noah's pocket. Since most active funds fail to beat their index after fees, paying more rarely pays off long term."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Funds pool money to buy baskets of investments, giving instant diversification.",
          "ETFs trade all day like stocks; mutual funds price once daily.",
          "Index funds track a market like the S&P 500 at very low cost.",
          "The expense ratio is a yearly fee that compounds into big money over time.",
          "Most active funds fail to beat cheap index funds after fees."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invfund5-mastery1",
            question: "What is the main benefit of a mutual fund or ETF for a beginner?",
            options: [
              "Guaranteed profits every year",
              "Instant diversification in one purchase",
              "Zero fees of any kind ever",
              "Ownership of just one company"
            ],
            correctAnswer: 1,
            explanation: "A single fund share gives instant diversification across many companies, sharply reducing the risk of any one company dragging you down."
          },
          {
            id: "invfund5-mastery2",
            question: "How does an ETF differ from a mutual fund?",
            options: [
              "An ETF trades all day at live prices",
              "An ETF holds only a single stock",
              "An ETF never charges any fee according to most guides",
              "An ETF is priced only once weekly"
            ],
            correctAnswer: 0,
            explanation: "ETFs trade on exchanges all day with live prices like a stock, while mutual funds are priced once per day after markets close. Both offer diversification."
          },
          {
            id: "invfund5-mastery3",
            question: "What does an S&P 500 index fund do?",
            options: [
              "Picks 5 hot stocks each week",
              "Tracks 500 large U.S. companies",
              "Buys only government bonds according to most guides",
              "Guarantees a 500% return"
            ],
            correctAnswer: 1,
            explanation: "An S&P 500 index fund simply buys the 500 large U.S. companies in the index, giving broad, low-cost exposure to the market instead of picking individual winners."
          },
          {
            id: "invfund5-mastery4",
            question: "Why do small fee differences matter so much over decades?",
            options: [
              "Fees are refunded after 10 years",
              "Fees compound, quietly eating returns",
              "Fees only apply in the first year",
              "Fees make funds grow faster"
            ],
            correctAnswer: 1,
            explanation: "A fee is charged every year on your whole balance, so it compounds against you. Over decades even a 1% difference can cost tens of thousands of dollars."
          },
          {
            id: "invfund5-mastery5",
            question: "What does the data say about most actively managed funds?",
            options: [
              "They always beat their index according to most guides",
              "They usually fail to beat their index after fees",
              "They never charge any fees as a general rule",
              "They are illegal to buy over the long run"
            ],
            correctAnswer: 1,
            explanation: "Decades of data show most active funds underperform their index over the long run, especially once their higher fees are subtracted from returns."
          },
          {
            id: "invfund5-mastery6",
            question: "What is a fund 'load'?",
            options: [
              "The number of stocks it holds",
              "A sales commission to buy or sell",
              "A guaranteed yearly dividend according to most guides",
              "The fund's total market value as a general rule"
            ],
            correctAnswer: 1,
            explanation: "A load is a sales commission charged when you buy or sell certain funds. You can usually avoid it by choosing 'no-load' funds, keeping more of your money invested."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invfund-6: Risk vs Return
  // ─────────────────────────────────────────────
  {
    lessonId: "invfund-6",
    sections: [
      {
        type: "concept",
        title: "The Golden Rule: More Reward Means More Risk",
        paragraphs: [
          "Every investment sits on a trade-off between risk and return. Return is how much your money could grow; risk is the chance it could lose value or not grow as hoped. The golden rule is that higher potential returns always come with higher risk. If someone promises big gains with zero risk, they're either confused or lying - that combination doesn't exist. A savings account is nearly risk-free but grows slowly; stocks can grow much faster but can also fall sharply. You can't get the high reward without accepting the possibility of a rough ride.",
          "You can picture investments on a ladder. At the bottom are cash and savings accounts: very safe, very low return. Next come bonds: steadier, modest returns. Above them sit stocks and stock funds: higher long-term returns but bigger swings. Near the top are things like single small-company stocks or crypto: potentially huge gains but also huge losses. Where you belong on the ladder depends on your goals and how much bouncing around you can stand without panic-selling at the worst moment.",
          "A key idea is your risk tolerance - how much loss you can handle emotionally and financially. Someone who would panic and sell after a 20% drop shouldn't put everything in volatile stocks, because they'll lock in losses. But risk tolerance isn't only about feelings; it's also about time. A teen investing for 40 years can take more risk because they have decades to recover from crashes. Someone who needs the money next year should stay safe. Matching your risk to your time horizon is one of investing's most important skills. A useful question to ask yourself is how you would honestly feel and act if your account suddenly fell by a third, because the answer reveals far more about your true risk tolerance than any quiz ever could."
        ],
        bullets: [
          "Higher potential returns always come with higher risk - there's no free lunch.",
          "Risk-return ladder: cash and savings (low) → bonds → stocks → speculative bets (high).",
          "Anyone promising high returns with zero risk is misleading you.",
          "Risk tolerance is how much loss you can handle emotionally and financially.",
          "Time horizon matters: more years to invest means you can take more risk."
        ],
        realWorldExample: "A savings account might return 1% with almost no chance of loss. A broad stock fund might average 8% but drop 20% in a bad year. A single hyped crypto coin could double or lose 80% in months. Each step up the ladder offers more potential reward only by adding more risk of loss."
      },
      {
        type: "concept",
        title: "Managing Risk Without Avoiding It",
        paragraphs: [
          "You can't erase risk, but you can manage it smartly. The first tool is diversification - spreading money across many investments so no single loss wrecks you. The second is time: staying invested for years lets you ride out the market's normal ups and downs, since history shows the market has recovered from every crash so far and grown over the long run. The third is matching investments to your goal. Money you need soon goes in safe places; money for decades away can handle stock-market swings for higher growth.",
          "It also helps to know the different flavors of risk. Market risk is the whole market falling. Company-specific risk is one business failing - which diversification tackles. Inflation risk is your money losing buying power in 'safe' cash, the sneaky danger of playing it too safe. And liquidity risk is not being able to sell something quickly when you need cash. Understanding which risks you're taking lets you decide whether the potential reward is worth it, instead of guessing blindly.",
          "The biggest risk mistake beginners make is emotional, not mathematical. When markets drop, fear screams 'sell,' and when markets soar, greed screams 'buy more.' Both instincts usually lose money by buying high and selling low - the exact opposite of the goal. Successful investors set a plan matched to their risk tolerance and time horizon, then stick to it through the noise. Accepting the right amount of risk, staying diversified, and holding steady beats chasing zero risk (which loses to inflation) or chasing huge gains (which often crashes)."
        ],
        bullets: [
          "Diversification spreads money so no single loss can wreck you.",
          "Time in the market lets you ride out normal ups and downs.",
          "Types of risk include market, company-specific, inflation, and liquidity risk.",
          "Playing it too safe carries inflation risk - cash loses buying power.",
          "The biggest risk mistake is emotional: buying high in greed, selling low in fear."
        ],
        realWorldExample: "During a market crash, two investors each hold $10,000 that drops to $7,000. The fearful one sells, making the $3,000 loss permanent. The disciplined one holds, and over the next few years the market recovers to $12,000. Same drop, opposite outcomes - decided by managing emotion, not avoiding risk."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund6-mc1",
            question: "What is the golden rule of risk and return?",
            options: [
              "Low-risk investments always earn the most",
              "Higher potential returns come with higher risk",
              "Risk and return have nothing to do with each other",
              "You can get high returns with zero risk"
            ],
            correctAnswer: 1,
            explanation: "Higher potential returns always require accepting higher risk. Any promise of big gains with no risk is misleading - that combination doesn't exist."
          },
          {
            id: "invfund6-mc2",
            question: "What does 'risk tolerance' mean?",
            options: [
              "The exact return a stock guarantees according to most guides",
              "How much loss you can handle financially and emotionally",
              "The fee a fund charges each year as a general rule",
              "The number of stocks you must own"
            ],
            correctAnswer: 1,
            explanation: "Risk tolerance is how much loss you can stomach without panic-selling, shaped by both your feelings and your time horizon. It guides how aggressive your investments should be."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Teens, Two Risk Levels",
        narrative: "Sofia and Dylan are both 17 and each have $2,000 to invest. Sofia is saving for a car she wants next year. Dylan is investing money he won't touch until retirement, decades away. They wonder whether they should invest the same way.",
        details: [
          "Sofia needs her money in about a year, so a market drop could hurt her car plans.",
          "Dylan won't need his money for decades, giving it time to recover from any crash.",
          "Sofia keeps her money safe in savings or short-term bonds to protect it.",
          "Dylan invests mostly in a diversified stock fund to aim for higher long-term growth."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund6-aq1",
          question: "Why should Dylan take more risk than Sofia even though they're the same age?",
          options: [
              "Dylan has a much longer time horizon to recover",
              "Younger boys always earn higher returns according to most guides",
              "Sofia's money is guaranteed to grow faster as a general rule",
              "Risk tolerance ignores when you need money"
            ],
          correctAnswer: 0,
          explanation: "Dylan's decades-long horizon lets him ride out crashes and recover, so he can take more risk for growth. Sofia needs her money soon, so she should stay safe."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Higher potential returns always come with higher risk - no free lunch.",
          "Investments form a ladder from safe cash up to volatile speculation.",
          "Risk tolerance combines your emotions and your time horizon.",
          "Diversification, time, and matching goals help manage (not erase) risk.",
          "The biggest risk mistake is emotional: buying high in greed, selling low in fear."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invfund6-mastery1",
            question: "Someone promises 'huge returns with no risk at all.' What should you conclude?",
            options: [
              "It's a rare, smart opportunity",
              "The claim is misleading",
              "Only rich people qualify for it",
              "It must be a government program"
            ],
            correctAnswer: 1,
            explanation: "High returns always require real risk. A promise of big gains with zero risk is misleading or a scam - that combination simply doesn't exist."
          },
          {
            id: "invfund6-mastery2",
            question: "Which sits lowest on the risk-return ladder?",
            options: [
              "A single small-company stock",
              "A savings account",
              "A broad stock fund",
              "A hyped crypto coin"
            ],
            correctAnswer: 1,
            explanation: "A savings account is near the bottom: very safe but very low return. Stocks and speculative bets sit higher, offering more potential reward but more risk of loss."
          },
          {
            id: "invfund6-mastery3",
            question: "What is inflation risk?",
            options: [
              "The market crashing all at once",
              "'Safe' cash losing buying power over time",
              "A single company going bankrupt according to most guides",
              "Not being able to sell quickly"
            ],
            correctAnswer: 1,
            explanation: "Inflation risk is the sneaky danger that cash held 'safely' loses purchasing power as prices rise. Playing it too safe can quietly shrink what your money can buy."
          },
          {
            id: "invfund6-mastery4",
            question: "How does diversification manage risk?",
            options: [
              "It guarantees you never lose money according to most guides",
              "It spreads money so one loss can't wreck you",
              "It removes all market swings entirely as a general rule",
              "It replaces the need for any planning"
            ],
            correctAnswer: 1,
            explanation: "Diversification spreads your money across many investments, so a single company's failure barely dents your total. It tackles company-specific risk, not all risk."
          },
          {
            id: "invfund6-mastery5",
            question: "Why can a teen take more investment risk than a retiree?",
            options: [
              "Teens are legally required to as a general rule",
              "Teens have decades to recover from crashes",
              "Retirees always earn higher returns",
              "Teens can't lose money according to most guides"
            ],
            correctAnswer: 1,
            explanation: "A long time horizon lets a young investor ride out and recover from crashes, so they can hold more volatile stocks. A retiree needing money soon should stay safer."
          },
          {
            id: "invfund6-mastery6",
            question: "What is the biggest risk mistake beginners make?",
            options: [
              "Diversifying across too many funds as a general rule",
              "Letting emotions drive buy and sell decisions",
              "Holding investments for too long",
              "Reading the expense ratio according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Emotional investing - buying in greed when high, selling in fear when low - is the classic wealth-destroyer. Sticking to a plan matched to your risk tolerance beats it."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invfund-7: Diversification
  // ─────────────────────────────────────────────
  {
    lessonId: "invfund-7",
    sections: [
      {
        type: "concept",
        title: "Don't Bet Everything on One Horse",
        paragraphs: [
          "Diversification is the strategy of spreading your money across many different investments so that no single loss can sink you. The old saying is 'don't put all your eggs in one basket' - if you drop that one basket, every egg breaks. But if your eggs are in ten baskets and you drop one, you lose only a tenth. Investing works the same way. Owning many companies means one company's disaster is just a small dent, while owning only one company means its collapse could wipe out everything you invested.",
          "Concentration is the opposite of diversification, and it's how people get badly burned. Imagine putting all $5,000 you have into a single trendy stock because a friend swears it will soar. If that one company hits scandal, bad earnings, or bankruptcy, you could lose most or all of your money overnight. Now imagine that same $5,000 spread across a fund holding hundreds of companies. Even if a few of them crash, the others carry you, and your total barely notices. Diversification turns catastrophic risk into manageable risk.",
          "The magic of diversification is that it reduces risk without necessarily reducing your expected return - which is rare in investing, where less risk usually means less reward. This works because different investments don't all move together: when some zig, others zag. When tech stocks slump, healthcare or energy might climb; when stocks fall, bonds may hold steady. By combining assets that behave differently, the bumps partly cancel out, giving a smoother ride toward the same long-term destination. That's why experts call diversification the closest thing to a free lunch in investing. Nobel-winning research showed that combining assets which behave differently can actually reduce the wild swings of a portfolio while keeping its expected long-term growth, which is a genuinely rare and valuable trick."
        ],
        bullets: [
          "Diversification spreads money across many investments so one loss can't sink you.",
          "Concentration - betting big on one stock - risks losing everything if it fails.",
          "A broad fund of hundreds of companies makes any single crash a small dent.",
          "Diversification can lower risk without lowering expected return.",
          "It works because different investments don't all move together."
        ],
        realWorldExample: "Two investors each have $5,000. One puts it all in a single hot stock that later drops 70%, leaving $1,500. The other buys a fund of 500 companies; even though a handful crash that year, the fund overall rises 6% to $5,300. Same money, wildly different outcomes - because of diversification."
      },
      {
        type: "concept",
        title: "Diversifying the Smart Way",
        paragraphs: [
          "Real diversification means spreading across several dimensions, not just owning more of the same thing. Owning ten tech stocks isn't truly diversified, because they tend to rise and fall together. Smart diversification spreads across asset classes (stocks, bonds, cash), across sectors (tech, healthcare, energy, retail), across company sizes (large and small), and even across geography (U.S. and international). The goal is to hold things that respond differently to the same events, so a shock that hurts one part of your portfolio doesn't crush all of it at once.",
          "For most people, the easiest way to diversify instantly is a broad index fund or ETF, which we saw earlier can hold hundreds or thousands of companies in one purchase. A single 'total market' fund can cover nearly the entire U.S. stock market, and adding an international fund and a bond fund broadens it further. This is how a teenager with $100 can be more diversified than a wealthy person who dumped everything into one company - the fund does the spreading automatically and cheaply.",
          "Diversification has limits worth understanding. It can't protect you from market risk - if the entire market falls, a diversified stock portfolio still drops, just usually less than a single stock would. It also can't rescue a portfolio from being poorly matched to your goals, and you can 'over-diversify' by piling on so many overlapping funds that you just recreate the whole market while paying extra fees. The sweet spot is broad, low-cost diversification across asset classes and sectors - simple enough to stick with, wide enough to protect you."
        ],
        bullets: [
          "True diversification spreads across asset classes, sectors, company sizes, and countries.",
          "Owning ten similar tech stocks isn't real diversification - they move together.",
          "A broad index fund or ETF diversifies instantly and cheaply in one purchase.",
          "Diversification can't erase market risk - a whole-market drop still hurts.",
          "Over-diversifying with overlapping funds adds fees without extra protection."
        ],
        realWorldExample: "A 'diversified' portfolio of only social-media stocks still crashes together when tech stumbles. A truly diversified mix - a U.S. stock fund, an international fund, and a bond fund - spreads risk across regions and asset types, so a slump in one area is cushioned by steadiness in others."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund7-mc1",
            question: "What is the core idea behind diversification?",
            options: [
              "Put all your money in the single best stock",
              "Spread money across many investments to limit any one loss",
              "Only invest in companies you personally use according to most guides",
              "Buy and sell as often as possible as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Diversification spreads money across many investments so no single loss can sink you. It's the 'don't put all your eggs in one basket' rule applied to investing."
          },
          {
            id: "invfund7-mc2",
            question: "Why is owning ten different tech stocks NOT true diversification?",
            options: [
              "Tech stocks are illegal to combine",
              "They tend to rise and fall together",
              "Ten stocks is too many to track",
              "Tech stocks never lose value according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Similar stocks in one sector move together, so a tech slump hits them all at once. Real diversification spreads across different sectors and asset types that behave differently."
          }
        ]
      },
      {
        type: "scenario",
        title: "Emma Rethinks Her Portfolio",
        narrative: "Emma, 18, is proud that she owns five different stocks instead of just one. But all five are popular tech companies. When the tech sector has a bad quarter, she's surprised that all five drop at nearly the same time, and her whole portfolio sinks together.",
        details: [
          "Emma thought owning five stocks meant she was well diversified.",
          "Because all five were tech companies, they fell together in the tech slump.",
          "True diversification would spread across sectors like healthcare and energy too.",
          "A broad index fund would have instantly spread her money across many industries."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund7-aq1",
          question: "What is the best fix for Emma's diversification problem?",
          options: [
            "Buy five more tech stocks to add variety",
            "Spread across different sectors and asset classes",
            "Put everything into a single tech stock",
            "Sell all stocks and hold only cash forever"
          ],
          correctAnswer: 1,
          explanation: "Adding more tech stocks keeps her concentrated in one sector. Spreading across different sectors and asset classes - easily done with a broad index fund - fixes the real problem."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Diversification spreads money so no single loss can sink you.",
          "Concentration in one stock risks losing everything if it fails.",
          "Diversify across asset classes, sectors, company sizes, and countries.",
          "A broad index fund diversifies instantly, cheaply, and automatically.",
          "Diversification lowers company-specific risk but can't erase whole-market risk."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invfund7-mastery1",
            question: "What does the 'eggs in one basket' saying teach about investing?",
            options: [
              "Always buy the cheapest stocks according to most guides",
              "Spreading investments limits any single loss",
              "One great stock beats many average ones",
              "Baskets are safer than banks"
            ],
            correctAnswer: 1,
            explanation: "If all your eggs are in one basket and you drop it, you lose everything. Spreading investments means one failure is only a small dent, not a wipeout."
          },
          {
            id: "invfund7-mastery2",
            question: "Why is diversification called a 'free lunch' in investing?",
            options: [
              "It removes all fees on funds as a general rule",
              "It can cut risk without cutting expected return",
              "It guarantees profits every year according to most guides",
              "It pays you cash to invest"
            ],
            correctAnswer: 1,
            explanation: "Diversification can reduce risk without lowering your expected return, which is rare in investing where less risk usually means less reward - hence the 'free lunch' nickname."
          },
          {
            id: "invfund7-mastery3",
            question: "Which portfolio is truly diversified?",
            options: [
              "Ten social-media stocks according to most guides in the vast majority of situations",
              "A mix of U.S. stocks, international stocks, and bonds",
              "One large tech company as a general rule",
              "Five stocks from the same industry over the long run"
            ],
            correctAnswer: 1,
            explanation: "Spreading across asset classes and regions - U.S. stocks, international stocks, and bonds - holds things that behave differently. Same-sector picks all move together."
          },
          {
            id: "invfund7-mastery4",
            question: "What is the easiest way for a beginner to diversify instantly?",
            options: [
              "Buy one broad index fund or ETF",
              "Hand-pick 50 individual stocks according to most guides",
              "Put everything into one bond as a general rule",
              "Keep all money in a checking account"
            ],
            correctAnswer: 0,
            explanation: "A single broad index fund or ETF holds hundreds or thousands of companies, diversifying instantly and cheaply - more than a beginner could do stock by stock."
          },
          {
            id: "invfund7-mastery5",
            question: "What can diversification NOT protect you from?",
            options: [
              "One company going bankrupt",
              "The entire market falling",
              "A single sector slumping",
              "A bad individual stock pick"
            ],
            correctAnswer: 1,
            explanation: "Diversification tackles company- and sector-specific risk, but if the whole market drops, a diversified stock portfolio still falls - usually less than a single stock would."
          },
          {
            id: "invfund7-mastery6",
            question: "What is the downside of 'over-diversifying'?",
            options: [
              "Your money becomes fully guaranteed according to most guides",
              "Overlapping funds add fees without more protection",
              "You are forced to sell everything",
              "Returns are legally capped at zero"
            ],
            correctAnswer: 1,
            explanation: "Piling on many overlapping funds just recreates the whole market while charging extra fees. Broad, low-cost diversification hits the sweet spot without the waste."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invfund-8: Bull vs Bear Markets
  // ─────────────────────────────────────────────
  {
    lessonId: "invfund-8",
    sections: [
      {
        type: "concept",
        title: "Markets Breathe In and Out",
        paragraphs: [
          "Markets don't move in a straight line - they cycle through good times and bad. A bull market is a long stretch when prices are rising and optimism is high; investors feel confident and money flows in. A bear market is the opposite: a period when prices fall significantly - usually defined as a drop of 20% or more from a recent high - and fear takes over. The easy way to remember which is which: a bull attacks by thrusting its horns upward (prices up), while a bear swipes its paws downward (prices down).",
          "Smaller dips have names too. A 'correction' is a drop of about 10% from a recent peak - uncomfortable but common and often short. A 'crash' is a sudden, steep plunge over just days. These pullbacks feel alarming, but they are a normal, recurring part of investing, not a sign the system is broken. On average, the market has a correction roughly once a year and a bear market every few years. Knowing this in advance keeps you from being shocked - and shocked investors are the ones who make panic mistakes.",
          "The most important historical fact is this: every bear market in U.S. history has eventually been followed by a recovery and new highs. Downturns have always ended, and the long-term trend has been upward, even after brutal crashes. That doesn't mean any single company will recover - individual stocks can die - but a diversified, broad-market investment has always come back given enough time. This is why long-term investors treat bear markets not as disasters to flee, but as temporary storms to wait out. Some of history's worst-sounding crashes, viewed decades later, appear as small blips on a chart that kept climbing, which is exactly why zooming out and staying calm has rewarded patient investors again and again."
        ],
        bullets: [
          "A bull market is a long period of rising prices and optimism.",
          "A bear market is a drop of 20% or more from a recent high, driven by fear.",
          "A correction (~10% drop) and a crash (sudden plunge) are smaller downturns.",
          "Downturns are normal and recurring, not signs the system is broken.",
          "Historically, every bear market has been followed by recovery and new highs."
        ],
        realWorldExample: "In a bear market, a broad stock fund might fall from $10,000 to $7,000 - a scary 30% drop. Historically, though, such downturns have ended and the market has gone on to new highs. Investors who held through past bears saw their balances not just recover but eventually surpass the old peak."
      },
      {
        type: "concept",
        title: "How to Keep Your Head When Markets Lose Theirs",
        paragraphs: [
          "Bear markets test emotions more than intelligence. When prices tumble, fear whispers 'sell before it gets worse,' but selling in a panic locks in your losses and often means missing the rebound. History shows the market's best days frequently come right after its worst ones, so investors who flee to cash tend to miss the powerful recovery. The hardest and most rewarding skill is doing nothing - staying invested and letting the storm pass - which feels wrong precisely when it's most right.",
          "A powerful tool for surviving cycles is dollar-cost averaging: investing a fixed amount on a regular schedule no matter what prices are doing. When prices are high your money buys fewer shares; when prices are low it buys more. This automatically means you buy more shares during downturns - exactly when they're 'on sale' - and it removes the impossible task of timing the market. Trying to guess the perfect moment to buy or sell almost always backfires, even for professionals.",
          "It helps to reframe a bear market. For someone who is still buying and has years to go, falling prices are actually good news - stocks are cheaper, so each dollar invested buys more future growth. The people truly hurt by bear markets are those who must sell during them, which is why keeping an emergency fund and matching investments to your time horizon matters so much. Master the psychology, keep contributing through the dips, and market cycles become a feature that builds wealth rather than a threat that destroys it."
        ],
        bullets: [
          "Panic-selling in a bear market locks in losses and risks missing the rebound.",
          "The market's best days often come right after its worst ones.",
          "Dollar-cost averaging invests a fixed amount regularly, buying more shares when prices drop.",
          "Trying to time the market almost always backfires, even for pros.",
          "For long-term buyers, lower prices in a downturn mean stocks are 'on sale.'"
        ],
        realWorldExample: "Investing $200 every month, you buy 4 shares at $50 in good times but 8 shares at $25 during a bear market. When prices recover to $50, those cheaply bought shares are now worth double. Steady buying through the downturn turned falling prices into a long-term advantage."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund8-mc1",
            question: "What defines a bear market?",
            options: [
              "Prices rising with high optimism according to most guides in the vast majority of situations",
              "A drop of about 20% or more from a recent high",
              "A single bad trading day as a general rule",
              "A market that never recovers over the long run"
            ],
            correctAnswer: 1,
            explanation: "A bear market is a decline of roughly 20% or more from a recent peak, driven by fear. Historically, bear markets have always been followed by recovery."
          },
          {
            id: "invfund8-mc2",
            question: "What is dollar-cost averaging?",
            options: [
              "Buying only when prices hit their lowest",
              "Investing a fixed amount on a regular schedule",
              "Selling everything during a downturn according to most guides",
              "Guessing the market's perfect timing as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Dollar-cost averaging means investing a set amount regularly regardless of price. It buys more shares when prices are low and removes the need to time the market."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Faces His First Bear Market",
        narrative: "Marcus, 19, has been investing $150 a month into a broad index fund. Suddenly the market enters a bear market and his balance drops 25%. The news is full of doom, and his friends are selling. Marcus feels the urge to sell too but remembers his lessons on market cycles.",
        details: [
          "Marcus's balance fell 25% during the bear market, which felt frightening.",
          "History shows every past bear market was eventually followed by a recovery.",
          "By continuing his $150 monthly investments, Marcus buys shares at lower prices.",
          "Selling now would lock in his losses and risk missing the rebound."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund8-aq1",
          question: "Why is continuing to invest during the bear market smart for Marcus?",
          options: [
              "Bear markets are guaranteed to end next week",
              "His fixed payments buy more shares at lower prices",
              "Selling now would guarantee bigger future gains according to most guides",
              "The government refunds losses in bear markets as a general rule"
            ],
          correctAnswer: 1,
          explanation: "Steady investing during a downturn buys more shares while prices are low, boosting growth when the market recovers. Selling instead would lock in losses and risk missing the rebound."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Bull markets rise; bear markets fall 20%+ from a recent high.",
          "Corrections (~10%) and crashes are normal, recurring downturns.",
          "Historically, every bear market has been followed by recovery.",
          "Panic-selling locks in losses and risks missing the best rebound days.",
          "Dollar-cost averaging buys more shares when prices are low."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invfund8-mastery1",
            question: "Which trick helps you remember bull versus bear markets?",
            options: [
              "A bull's horns thrust up; a bear's paws swipe down",
              "A bull sleeps; a bear runs as a general rule",
              "A bull is red; a bear is green over the long run",
              "Both animals mean prices rise according to most guides"
            ],
            correctAnswer: 0,
            explanation: "A bull thrusts its horns upward (prices up = bull market), while a bear swipes its paws downward (prices down = bear market). It's a classic memory aid."
          },
          {
            id: "invfund8-mastery2",
            question: "What is a market 'correction'?",
            options: [
              "A rise of 50% or more over the long run",
              "A drop of about 10% from a recent peak",
              "A guaranteed recovery signal according to most guides",
              "A fee charged during downturns as a general rule"
            ],
            correctAnswer: 1,
            explanation: "A correction is a drop of roughly 10% from a recent high - uncomfortable but common and often short, milder than a full bear market."
          },
          {
            id: "invfund8-mastery3",
            question: "What has historically followed every U.S. bear market?",
            options: [
              "A permanent collapse according to most guides",
              "A recovery and eventual new highs",
              "A government shutdown of markets",
              "Decades with no growth at all"
            ],
            correctAnswer: 1,
            explanation: "Every past bear market has been followed by recovery, with the long-term trend moving upward - which is why patient, diversified investors wait downturns out."
          },
          {
            id: "invfund8-mastery4",
            question: "Why is panic-selling in a bear market usually a mistake?",
            options: [
              "It locks in losses and can miss the rebound",
              "It guarantees a tax refund according to most guides",
              "It forces prices to rise instantly as a general rule",
              "It has no effect on your money over the long run"
            ],
            correctAnswer: 0,
            explanation: "Selling in a panic turns paper losses into real ones, and the market's best days often come right after the worst - so sellers frequently miss the recovery."
          },
          {
            id: "invfund8-mastery5",
            question: "How does dollar-cost averaging help during downturns?",
            options: [
              "It stops you from investing entirely as a general rule",
              "Fixed amounts buy more shares when prices drop",
              "It times the exact market bottom",
              "It guarantees no losses ever according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Investing a fixed amount regularly means your money buys more shares when prices are low, turning downturns into a buying advantage without needing to time the market."
          },
          {
            id: "invfund8-mastery6",
            question: "For a young investor still buying, why can lower prices be good news?",
            options: [
              "Stocks are cheaper, so dollars buy more",
              "Lower prices guarantee instant profit according to most guides",
              "It means the market will never fall again",
              "Cheaper stocks pay higher dividends by law"
            ],
            correctAnswer: 0,
            explanation: "When you're still investing for years ahead, a downturn puts stocks 'on sale,' so each dollar buys more shares and more future growth. Downturns hurt mainly those who must sell."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invfund-9: Reading a Stock Chart
  // ─────────────────────────────────────────────
  {
    lessonId: "invfund-9",
    sections: [
      {
        type: "concept",
        title: "What a Stock Chart Actually Shows",
        paragraphs: [
          "A stock chart is a picture of a stock's price over time. The horizontal axis (left to right) is time, and the vertical axis (bottom to top) is price. A line going up means the price rose; a line going down means it fell. You can usually change the time frame - one day, one month, one year, or many years - and this choice completely changes the story. A stock can look like it's crashing on a one-day chart but soaring on a five-year chart. Always check the time frame before reacting, because the same wiggle can look tiny or huge depending on the zoom.",
          "Beyond price, charts show volume, usually as bars along the bottom. Volume is how many shares traded in a period, and it hints at how much conviction is behind a move. A price jump on huge volume suggests strong interest and agreement; a move on tiny volume may be weak or fleeting. Big volume spikes often line up with major news - an earnings report, a product launch, or a scandal. Learning to glance at volume tells you whether a price move is a crowd stampede or just a few traders shuffling around.",
          "You'll also see the 52-week high and low - the highest and lowest prices over the past year - which frame where the stock sits in its recent range. Candlestick charts pack even more in: each 'candle' shows the opening, closing, high, and low price for a period, with color signaling whether it closed up or down. You don't need to master every symbol as a beginner. The key skill is reading the basic story - price direction, time frame, and volume - without being fooled by a chart's zoom level."
        ],
        bullets: [
          "A chart plots price (vertical) against time (horizontal).",
          "The time frame you pick (day, month, year) changes the whole story.",
          "Volume shows how many shares traded and hints at conviction behind a move.",
          "Big volume often accompanies major news like earnings or scandals.",
          "The 52-week high and low frame where the price sits in its recent range."
        ],
        realWorldExample: "A stock drops 4% today, and the one-day chart looks like a cliff. Zoom out to five years and that same drop is a barely visible dip on a line that has tripled. The one-day panic and the five-year calm are the same stock - only the time frame changed the emotional story."
      },
      {
        type: "concept",
        title: "Trends, Indicators, and Their Limits",
        paragraphs: [
          "Charts help you spot trends - the general direction over time. An uptrend makes higher highs and higher lows; a downtrend makes lower highs and lower lows; a sideways trend drifts in a range. A common tool is the moving average, a line that smooths out daily noise by averaging the price over, say, 50 or 200 days. When the price is above its long-term moving average, many see it as a healthy uptrend; when it drops below, some read caution. Moving averages don't predict the future - they just clarify the trend hiding inside the jagged daily prices.",
          "You'll hear about support and resistance. Support is a price level where a stock has repeatedly stopped falling, as if there's a floor of buyers. Resistance is a level where it has repeatedly stopped rising, like a ceiling of sellers. Traders watch these levels for clues, but they aren't magic lines - stocks blow through them all the time. These tools describe past behavior and crowd psychology; they are educated guesses about tendencies, never guarantees about what happens next.",
          "Here's the honest truth: no chart can reliably predict short-term prices, and chasing patterns is how many beginners lose money. Charts are useful for context - seeing the long-term trend, spotting unusual volume, understanding a stock's range - but for long-term investors, a company's actual business (its earnings, growth, and health) matters far more than squiggles on a graph. Use charts to inform yourself, not to gamble. The best use of a chart is zooming out to remember that short-term dips are normal within a long upward journey."
        ],
        bullets: [
          "Trends can be up (higher highs/lows), down (lower highs/lows), or sideways.",
          "A moving average smooths daily noise to reveal the underlying trend.",
          "Support is a price 'floor'; resistance is a price 'ceiling' - both are just tendencies.",
          "No chart reliably predicts short-term prices; patterns are guesses, not guarantees.",
          "For long-term investors, a company's real business matters more than chart squiggles."
        ],
        realWorldExample: "A stock keeps bouncing up off $50 (support) and stalling near $60 (resistance) for months. A trader bets it will bounce again at $50 - then bad earnings hit and it crashes through to $40. The 'floor' was only a tendency from past behavior, not a guarantee of the future."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund9-mc1",
            question: "What do the two axes of a stock chart represent?",
            options: [
              "Volume on both axes",
              "Time (horizontal) and price (vertical)",
              "Profit and loss only",
              "Dividends and fees according to most guides"
            ],
            correctAnswer: 1,
            explanation: "A stock chart plots time along the horizontal axis and price up the vertical axis, so the line shows how the price moved over the chosen period."
          },
          {
            id: "invfund9-mc2",
            question: "What does trading 'volume' tell you?",
            options: [
              "The company's total profit according to most guides",
              "How many shares traded, hinting at conviction",
              "The stock's dividend rate as a general rule",
              "The fund's expense ratio over the long run"
            ],
            correctAnswer: 1,
            explanation: "Volume is the number of shares traded in a period. High volume suggests strong conviction behind a price move, while low volume may mean a weak or fleeting one."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Reads Two Time Frames",
        narrative: "Priya, 17, checks a stock she owns and sees it's down 5% today. The one-day chart looks scary, like a steep cliff. Before reacting, she remembers to change the time frame and zooms out to look at the past five years of the same stock.",
        details: [
          "On the one-day chart, the 5% drop looked dramatic and alarming.",
          "Zoomed out to five years, that drop was a tiny dip in a long climb upward.",
          "She also noticed today's drop came on high volume, tied to an earnings report.",
          "Priya decided the long-term uptrend mattered more than a single scary day."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund9-aq1",
          question: "Why did zooming out change how Priya felt about the 5% drop?",
          options: [
              "Zooming out erased the loss from her account",
              "The long-term trend showed the drop was minor",
              "Five-year charts are always guaranteed to rise according to most guides",
              "The drop was fake on the one-day chart"
            ],
          correctAnswer: 1,
          explanation: "The five-year view revealed a long uptrend, making today's dip look minor. The same price move can look terrifying or trivial depending on the chart's time frame."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Charts plot price (vertical) against time (horizontal).",
          "The time frame you choose can completely change the story.",
          "Volume shows conviction and often spikes on major news.",
          "Moving averages, support, and resistance describe tendencies, not guarantees.",
          "No chart reliably predicts short-term prices; a company's business matters more."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invfund9-mastery1",
            question: "Why should you always check the time frame on a chart?",
            options: [
              "It changes the fees you pay as a general rule",
              "The same move looks different at different zooms",
              "It sets the dividend amount according to most guides",
              "It picks the stock for you"
            ],
            correctAnswer: 1,
            explanation: "A drop can look like a cliff on a one-day chart but a tiny dip over five years. The time frame reframes the whole story, so always check it before reacting."
          },
          {
            id: "invfund9-mastery2",
            question: "What does a big spike in trading volume often signal?",
            options: [
              "The stock is guaranteed to rise",
              "Major news, like earnings or a scandal",
              "The company paid a dividend according to most guides",
              "The market has closed for the day"
            ],
            correctAnswer: 1,
            explanation: "Volume spikes usually accompany major news - earnings, launches, or scandals - showing strong conviction behind the move rather than a few traders shuffling around."
          },
          {
            id: "invfund9-mastery3",
            question: "What is a moving average on a chart?",
            options: [
              "A guarantee of future prices according to most guides",
              "A line smoothing price to show the trend",
              "The total shares a company issued",
              "A tax on stock gains as a general rule"
            ],
            correctAnswer: 1,
            explanation: "A moving average averages price over a set period, smoothing daily noise to reveal the underlying trend. It clarifies direction but doesn't predict the future."
          },
          {
            id: "invfund9-mastery4",
            question: "What is 'support' on a stock chart?",
            options: [
              "A ceiling where the price stops rising over the long run",
              "A price level where it has repeatedly stopped falling",
              "The dividend a stock pays according to most guides",
              "A guaranteed price floor forever as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Support is a level where a stock has repeatedly stopped falling, like a floor of buyers. It's a tendency from past behavior, not a guaranteed price floor."
          },
          {
            id: "invfund9-mastery5",
            question: "What is the honest limit of chart patterns?",
            options: [
              "They perfectly predict tomorrow's price",
              "They can't reliably predict short-term prices",
              "They replace the need to research companies",
              "They only work for wealthy traders"
            ],
            correctAnswer: 1,
            explanation: "No chart reliably predicts short-term prices; patterns are educated guesses about tendencies. Chasing them is how many beginners lose money."
          },
          {
            id: "invfund9-mastery6",
            question: "For a long-term investor, what matters more than chart squiggles?",
            options: [
              "The company's actual business and health",
              "The exact color of each candle",
              "Guessing the daily price according to most guides",
              "The chart's background theme"
            ],
            correctAnswer: 0,
            explanation: "Over the long run, a company's real earnings, growth, and health drive its value far more than short-term chart patterns. Use charts for context, not prediction."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invfund-10: Building Your First Portfolio
  // ─────────────────────────────────────────────
  {
    lessonId: "invfund-10",
    sections: [
      {
        type: "concept",
        title: "Asset Allocation: Your Portfolio's Recipe",
        paragraphs: [
          "A portfolio is just the collection of all your investments together, and the single most important decision about it is asset allocation - how you split your money between stocks, bonds, and cash. This mix drives most of your results, far more than which specific stock you pick. Stocks bring growth but bounce around; bonds bring stability and income; cash brings safety and instant access. Choosing the right recipe of these ingredients for your situation is the heart of building a portfolio, and it depends mostly on two things: your time horizon and your risk tolerance.",
          "Time horizon is how long until you need the money, and it's the biggest factor for a teen. The further away your goal, the more stocks you can hold, because you have years to recover from any crash. A common rule of thumb is that young investors with decades ahead might hold 80% to 90% in stocks and only a little in bonds. Someone nearing a goal shifts toward bonds and cash to protect what they've built. There's no single 'correct' mix - it's about matching your allocation to when you'll actually spend the money.",
          "Risk tolerance fine-tunes the recipe. Two teens with the same time horizon might still choose different mixes if one panics at every dip and the other shrugs it off. The best allocation is one you can actually stick with through a scary bear market, because the perfect plan you abandon in a panic is worse than a slightly cautious plan you keep. Honest self-knowledge - knowing whether you'll hold steady or bolt for the exits - matters as much as any formula for setting your stock-to-bond split."
        ],
        bullets: [
          "A portfolio is all your investments together; asset allocation is how you split them.",
          "The stock/bond/cash mix drives most of your results - more than individual picks.",
          "Longer time horizons allow a higher percentage of stocks for growth.",
          "Young investors often hold 80%-90% stocks; those near a goal hold more bonds.",
          "The best allocation is one you can stick with through a scary downturn."
        ],
        realWorldExample: "A 17-year-old investing for retirement decades away might choose 90% stocks and 10% bonds, accepting big swings for maximum long-term growth. A 60-year-old retiring soon might flip toward 40% stocks and 60% bonds and cash, trading growth for the safety of not losing money right before they need it."
      },
      {
        type: "concept",
        title: "Building It, Automating It, and Leaving It Alone",
        paragraphs: [
          "Once you know your target mix, building the portfolio can be refreshingly simple. Many beginners use just two or three broad, low-cost index funds - a total U.S. stock fund, an international stock fund, and a bond fund - to cover the whole world cheaply. Even simpler, a single 'target-date fund' automatically holds a diversified mix and slowly shifts toward safer bonds as your goal approaches, doing the work for you. You don't need dozens of holdings or exotic picks; a plain, diversified core beats a complicated pile of guesses for almost everyone.",
          "The habit that makes a portfolio actually grow is automatic, consistent investing. Set up an automatic transfer - say $50 a month - so you invest before you can spend the money, using dollar-cost averaging through every up and down. This 'pay yourself first' approach removes willpower and emotion from the equation. It turns investing into a background habit like brushing your teeth, and over years those small automatic deposits, plus compounding, quietly build into real wealth without you having to time anything.",
          "Over time, your mix drifts as investments grow at different rates - stocks might swell from 80% to 88% of your portfolio after a great year. Rebalancing means periodically selling a bit of what grew and buying what lagged to return to your target mix, which quietly forces you to sell high and buy low. Do it maybe once a year; obsessive tinkering usually hurts. The final and hardest rule is to leave your portfolio alone between check-ins - resist the urge to react to every headline, and let time and compounding do the heavy lifting."
        ],
        bullets: [
          "A simple portfolio can be just 2-3 broad index funds, or one target-date fund.",
          "Target-date funds auto-diversify and shift toward bonds as your goal nears.",
          "Automate consistent investing ('pay yourself first') to remove emotion.",
          "Rebalancing yearly restores your target mix and forces selling high, buying low.",
          "Between check-ins, leave the portfolio alone and let compounding work."
        ],
        realWorldExample: "A teen sets a target of 85% stocks, 15% bonds using two index funds and automates $50 a month. After a strong year, stocks grow to 90% of the mix. At the yearly check-in, they sell a little stock and buy bonds to get back to 85/15 - automatically selling high and buying low without guessing."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invfund10-mc1",
            question: "What is asset allocation?",
            options: [
              "Picking the single best stock to own as a general rule",
              "How you split money among stocks, bonds, and cash",
              "The fee charged by an index fund",
              "The tax rate on your gains according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Asset allocation is how you divide money among stocks, bonds, and cash. This mix drives most of your results - more than which individual stock you pick."
          },
          {
            id: "invfund10-mc2",
            question: "What does rebalancing a portfolio do?",
            options: [
              "Guarantees your portfolio never loses value as a general rule",
              "Restores your target mix, selling high and buying low",
              "Doubles your investment automatically according to most guides",
              "Removes all bonds from your holdings over the long run"
            ],
            correctAnswer: 1,
            explanation: "Rebalancing sells a bit of what grew and buys what lagged to return to your target mix. It quietly forces you to sell high and buy low, usually done about once a year."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tyler Builds His First Portfolio",
        narrative: "Tyler, 18, is investing for retirement decades away and can handle market swings without panic. He decides on a simple, automated plan using low-cost index funds, and he wants a strategy he can leave mostly alone for years.",
        details: [
          "Given his long time horizon, Tyler chooses about 85% stocks and 15% bonds.",
          "He uses two broad index funds instead of picking individual stocks.",
          "He automates $50 a month, investing before he can spend it (pay yourself first).",
          "Once a year he rebalances back to his target mix and otherwise leaves it alone."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invfund10-aq1",
          question: "Why does an 85% stock allocation make sense for Tyler right now?",
          options: [
              "Stocks can never lose value over decades as a general rule",
              "His long horizon lets him ride out crashes for growth",
              "Bonds are illegal for young investors according to most guides",
              "He will have to spend all of the money very soon"
            ],
          correctAnswer: 1,
          explanation: "With decades until he needs the money, Tyler can weather crashes and let stocks grow, so a high stock allocation fits. Someone needing money soon would hold far more bonds."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A portfolio is all your investments; asset allocation is the key decision.",
          "Match your stock/bond/cash mix to your time horizon and risk tolerance.",
          "A simple portfolio can be 2-3 index funds or one target-date fund.",
          "Automate consistent investing to remove emotion and build the habit.",
          "Rebalance about yearly, then leave the portfolio alone to compound."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invfund10-mastery1",
            question: "Which decision drives most of a portfolio's results?",
            options: [
              "Which single stock you pick",
              "Your asset allocation mix",
              "The color of your investing app",
              "The day of the week you buy"
            ],
            correctAnswer: 1,
            explanation: "Asset allocation - your split among stocks, bonds, and cash - drives most of your long-term results, far more than which individual stock you choose."
          },
          {
            id: "invfund10-mastery2",
            question: "Why do young investors typically hold a high percentage of stocks?",
            options: [
              "Stocks are guaranteed to always rise according to most guides",
              "They have decades to recover from crashes",
              "Bonds are banned for people under 30",
              "Stocks require no research at all"
            ],
            correctAnswer: 1,
            explanation: "A long time horizon lets young investors ride out and recover from crashes, so they can hold more growth-oriented stocks. Those near a goal shift toward bonds."
          },
          {
            id: "invfund10-mastery3",
            question: "What does a target-date fund do automatically?",
            options: [
              "Guarantees a fixed yearly return according to most guides",
              "Diversifies and shifts toward bonds as the goal nears",
              "Picks one hot stock each year over the long run",
              "Removes all fees from investing as a general rule"
            ],
            correctAnswer: 1,
            explanation: "A target-date fund holds a diversified mix and gradually shifts toward safer bonds as your target date approaches, handling allocation and rebalancing for you."
          },
          {
            id: "invfund10-mastery4",
            question: "What does 'pay yourself first' mean for investing?",
            options: [
              "Spend on wants before saving according to most guides",
              "Automate investing before you can spend it",
              "Only invest leftover money at month's end",
              "Withdraw profits every single week"
            ],
            correctAnswer: 1,
            explanation: "Paying yourself first means automating your investment before you spend, so saving isn't left to willpower. It builds a steady habit and uses dollar-cost averaging."
          },
          {
            id: "invfund10-mastery5",
            question: "How does yearly rebalancing quietly help you?",
            options: [
              "It forces selling high and buying low",
              "It guarantees you never lose money",
              "It doubles your contributions according to most guides",
              "It eliminates all market risk as a general rule"
            ],
            correctAnswer: 0,
            explanation: "Rebalancing trims what grew and adds to what lagged, returning to your target mix. That process naturally has you sell high and buy low, without needing to guess timing."
          },
          {
            id: "invfund10-mastery6",
            question: "What is the hardest but wisest rule between check-ins?",
            options: [
              "React to every news headline fast",
              "Leave the portfolio alone to compound",
              "Sell everything after any drop according to most guides",
              "Add new random stocks weekly"
            ],
            correctAnswer: 1,
            explanation: "Leaving your portfolio alone between periodic check-ins lets compounding work and avoids emotional mistakes. Obsessive tinkering usually hurts long-term results."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invest-1: Why Investing Matters
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-1",
    sections: [
      {
        type: "concept",
        title: "Why Investing Is the Second Half of the Plan",
        paragraphs: [
          "The Investing Fundamentals unit already showed why investing beats saving over long stretches - the gap between money that sits still and money that grows. This lesson picks up where that leaves off and asks a bigger question: what role does investing play in a whole financial life? The short answer is that saving and investing are two halves of one plan. Saving handles the near term - emergencies and goals within a few years. Investing handles the far term - the decades-long costs that saving alone can never reach.",
          "The biggest of those far-term costs is retirement, which could stretch 20 to 30 years with no paycheck arriving. Think about what that requires: enough money to replace an income for a quarter of your life. Saving a slice of each paycheck helps, but on its own it would demand setting aside an unrealistic amount every month. Investing does the heavy lifting instead, letting growth cover much of that future bill so you aren't forced to depend on working forever or on a safety net that may shrink.",
          "This is also why understanding investing early is such an advantage - not because a teen has much money, but because a teen has time, the one ingredient that can't be bought back later. A high earner who starts at 45 can pour in far more cash yet still trail someone who started small at 20, because the late starter is missing the decades that do the real work. Grasping this now reframes investing from 'something rich adults do' into 'the tool that turns an ordinary income into long-term security.'"
        ],
        bullets: [
          "Saving and investing are two halves of one plan: near term versus far term.",
          "Saving covers emergencies and goals within a few years; investing covers the decades.",
          "Retirement can last 20-30 years with no paycheck - saving alone can't fund it.",
          "Investing lets growth cover much of that future bill instead of working forever.",
          "Starting young trades money you don't have for time, which can't be bought back later."
        ],
        realWorldExample: "Two workers earn the same salary. One relies only on saving and sets aside a large slice of every paycheck for retirement, still falling short of a 25-year retirement's cost. The other saves a smaller amount but invests it for decades, and growth closes most of the gap. Same income - investing turned a strained plan into a workable one."
      },
      {
        type: "concept",
        title: "Investing Is How Your Money Works For You",
        paragraphs: [
          "There are really only two ways to make money: you work for money, or your money works for you. A job trades your time and effort for a paycheck, but there are only so many hours in a day, so your earning power is capped. Investing flips this: your money earns on its own, without you trading more hours. Over time, the goal is to build enough invested wealth that the returns it generates can support you - the point where your money out-earns your effort. That's the real definition of financial freedom.",
          "Investing also connects you to the growth of the whole economy. When you own a diversified slice of the stock market, you own a piece of thousands of companies inventing products, opening stores, and earning profits worldwide. As those businesses grow over decades, so does your stake. You're no longer just a customer handing companies your money; you're an owner sharing in their success. This is why the broad market has historically climbed over the long run - it reflects human productivity steadily increasing.",
          "The barrier to starting has never been lower. You don't need thousands of dollars, a finance degree, or a stockbroker - apps let you begin with a few dollars and buy diversified funds in minutes. The real obstacles are myths: that investing is only for the rich, that it's the same as gambling, or that you must be an expert. In truth, the biggest mistake is waiting. Every year you delay is a year of compounding you can never get back, which is exactly why understanding investing early is so valuable. A teen who learns these ideas now holds an advantage that no last-minute effort at forty-five can fully buy back, because the missing ingredient is simply time, and time cannot be purchased later."
        ],
        bullets: [
          "You either work for money or make your money work for you.",
          "A job caps your earnings at your available hours; investing has no such cap.",
          "Owning the market means owning a slice of thousands of growing companies.",
          "Starting requires only a few dollars and an app, not wealth or a degree.",
          "The biggest mistake is waiting - lost compounding can't be recovered."
        ],
        realWorldExample: "A teen invests $1,000 at 8% and never adds another dollar. While they finish school, work, and sleep, that money quietly grows on its own - to about $2,160 in 10 years and roughly $10,000 in 30 years. They traded no extra hours; their money did the work for them the entire time."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest1-mc1",
            question: "Why is saving alone usually not enough to build real wealth?",
            options: [
              "Banks are not allowed to hold large sums over the long run",
              "Saved money barely grows and loses value to rising prices",
              "Saving is illegal after a certain amount as a general rule",
              "Savings accounts charge 50% yearly fees according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Money in a bank grows very slowly and loses buying power to inflation. Investing makes money grow through returns that compound, which is how real wealth is built."
          },
          {
            id: "invest1-mc2",
            question: "What does 'making your money work for you' mean?",
            options: [
              "Working more hours at a second job",
              "Your money earns returns without you trading more time",
              "Spending money faster to enjoy it according to most guides",
              "Keeping all cash hidden at home as a general rule"
            ],
            correctAnswer: 1,
            explanation: "A job trades your limited hours for pay, but invested money earns on its own with no time cap. Building enough invested wealth to live on returns is financial freedom."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aisha Plans for a 25-Year Retirement",
        narrative: "Aisha, 25, wants enough saved to cover about 25 years of retirement starting at 65. She estimates she'll need a large nest egg to replace her income for that long. She's deciding whether to reach it by saving alone in a bank account or by investing a smaller monthly amount and letting it grow.",
        details: [
          "To hit her target by saving alone, she'd have to set aside far more than her budget allows.",
          "Investing a smaller monthly amount at about 8% lets growth cover most of the target instead.",
          "Her near-term emergency fund still stays in savings, where it's safe and reachable.",
          "The 40-year runway to 65 is exactly what makes the investing path realistic for her."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest1-aq1",
          question: "Why does investing make Aisha's 25-year retirement goal realistic?",
          options: [
            "It removes the need to save any money at all",
            "Growth over 40 years covers much of the target for her",
            "It guarantees she'll never face a market drop",
            "Saving alone would clearly be the easier path"
          ],
          correctAnswer: 1,
          explanation: "With a 40-year runway, investment growth does much of the heavy lifting, so Aisha needs to contribute far less each month than saving alone would demand. Her emergency fund still stays in savings."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Saving and investing are two halves of one plan: near term and far term.",
          "Investing covers decades-long costs like retirement that saving alone can't reach.",
          "You either work for money or make your money work for you.",
          "Starting needs only a few dollars and an app, not wealth or a degree.",
          "Time is the ingredient you can't buy back later, so starting young is the edge."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invest1-mastery1",
            question: "Why can't saving alone realistically fund a 20-30 year retirement?",
            options: [
              "Banks close accounts after retirement",
              "It would demand setting aside an unrealistic amount each month",
              "Saving is not allowed once you retire",
              "Retirement never actually costs much money"
            ],
            correctAnswer: 1,
            explanation: "Replacing an income for decades takes a huge sum. Saving alone would require an impractical monthly amount, so investment growth is what makes the goal reachable."
          },
          {
            id: "invest1-mastery2",
            question: "What is financial freedom, in investing terms?",
            options: [
              "Never having to save any money",
              "When your money's returns can support you",
              "Owning the single best stock according to most guides",
              "Having a very high salary as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Financial freedom is building enough invested wealth that the returns it generates can support you, so you no longer depend entirely on trading hours for a paycheck."
          },
          {
            id: "invest1-mastery3",
            question: "Why does owning a diversified market slice tie you to economic growth?",
            options: [
              "You own a piece of many growing companies",
              "The government pays you a bonus according to most guides",
              "It guarantees a fixed 20% return as a general rule",
              "You control how companies are run"
            ],
            correctAnswer: 0,
            explanation: "A broad market investment means owning a slice of thousands of companies. As they grow and profit over decades, your stake grows with the overall economy."
          },
          {
            id: "invest1-mastery4",
            question: "Which is a common myth that stops people from investing?",
            options: [
              "Investing is only for the rich",
              "Diversification lowers risk according to most guides",
              "Compounding rewards time as a general rule",
              "Starting early is helpful"
            ],
            correctAnswer: 0,
            explanation: "'Investing is only for the rich' is a myth - apps let anyone start with a few dollars. The other options are true principles, not myths."
          },
          {
            id: "invest1-mastery5",
            question: "What is the biggest investing mistake according to the lesson?",
            options: [
              "Diversifying too broadly according to most guides",
              "Waiting too long to start",
              "Investing small amounts as a general rule",
              "Using low-cost index funds"
            ],
            correctAnswer: 1,
            explanation: "Waiting is the biggest mistake because lost years of compounding can never be recovered. Starting early, even small, beats starting big but late."
          },
          {
            id: "invest1-mastery6",
            question: "What caps how much you can earn from a job but NOT from investing?",
            options: [
              "The number of hours you can work",
              "The color of your paycheck",
              "The bank you use according to most guides",
              "Your favorite stock's price as a general rule"
            ],
            correctAnswer: 0,
            explanation: "A job trades limited hours for pay, capping earnings. Invested money earns on its own with no hourly limit, which is why it can outgrow labor income over time."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invest-2: Inflation
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-2",
    sections: [
      {
        type: "concept",
        title: "The Invisible Tax on Your Money",
        paragraphs: [
          "Inflation is the gradual rise in the prices of things over time, which means each dollar buys a little less than it used to. It's why your grandparents talk about candy bars costing a nickel and movie tickets a dollar. In the U.S., inflation has averaged roughly 2% to 3% a year over the long run, which sounds harmless. But that quiet creep adds up: at 3% inflation, something that costs $100 today will cost about $134 in ten years, and roughly $181 in twenty. Your money didn't shrink in number - its buying power did.",
          "This is why inflation is called an invisible tax. Nobody sends you a bill, but every year your dollars silently lose value if they aren't growing at least as fast as prices. Cash stuffed in a drawer or a savings account earning 0.5% is actually losing purchasing power when inflation runs at 3% - you have the same number of dollars, but they buy less each year. Feeling 'safe' by holding cash is a trap for long-term money, because inflation is quietly eating it the whole time.",
          "Economists measure inflation with the Consumer Price Index (CPI), which tracks the average price of a basket of common goods and services - food, housing, gas, and more. When you hear 'inflation was 3.5% last year,' that's usually the CPI. Inflation isn't always steady: some years it spikes, like when it jumped well above average and everyday costs surged, and rarely prices can even fall (deflation). But over your lifetime, the safe assumption is that prices will keep climbing, so your money must grow just to stand still. This is why a salary that feels comfortable today may buy noticeably less in twenty years, and why long-term plans have to account for the slow, steady climb of prices rather than assuming costs stay frozen."
        ],
        bullets: [
          "Inflation is the gradual rise in prices, so each dollar buys less over time.",
          "U.S. inflation has averaged roughly 2%-3% a year over the long run.",
          "At 3%, $100 today needs about $134 in ten years to buy the same things.",
          "Cash earning less than inflation quietly loses purchasing power.",
          "The CPI (Consumer Price Index) measures inflation using a basket of goods."
        ],
        realWorldExample: "Imagine $1,000 in a drawer during 3% yearly inflation. After 10 years you still have exactly $1,000 in cash - but it now buys only what about $740 bought before. You lost roughly a quarter of your money's power without spending a cent, simply because prices rose while your cash stood still."
      },
      {
        type: "concept",
        title: "Beating Inflation With Growth",
        paragraphs: [
          "The only way to protect your money from inflation is to make it grow faster than prices rise. This is where the difference between a nominal return and a real return matters. A nominal return is the raw percentage your money earns; a real return is what's left after subtracting inflation. If your savings earns 1% while inflation is 3%, your nominal return is positive but your real return is about -2% - you're going backward. Real return is the number that actually tells you whether you're gaining or losing ground.",
          "This is the strongest argument for investing rather than only saving. Historically, stocks have returned roughly 7% to 10% a year, comfortably above the 2% to 3% of inflation, so they've grown real wealth over time. A savings account at 0.5% loses to inflation every year. Even 'safe' assets like some bonds may barely keep pace. To actually get ahead of rising prices over decades, your long-term money generally needs to be invested in growth assets, not parked where inflation slowly erodes it.",
          "Inflation also reshapes how you think about goals and debt. A car that costs $25,000 today might cost $34,000 in ten years, so long-term savings targets must aim higher than today's prices. Interestingly, inflation can quietly help fixed-rate borrowers: if you owe a fixed $1,000 mortgage payment, inflation makes future dollars cheaper, so that payment feels lighter over time. But for savers, the lesson is blunt - money that isn't growing is shrinking in real terms, and beating inflation is a core reason investing matters at all."
        ],
        bullets: [
          "To beat inflation, your money must grow faster than prices rise.",
          "Nominal return is the raw rate; real return subtracts inflation.",
          "Earning 1% while inflation is 3% means a real return of about -2%.",
          "Stocks have historically outpaced inflation; savings accounts usually don't.",
          "Long-term goals must target future prices, not today's prices."
        ],
        realWorldExample: "Two people each hold $10,000 for 20 years during 3% inflation. One keeps it in savings at 0.5% - it grows to about $11,000 nominally but loses real value. The other invests at 8%; it grows to about $46,600, and even after inflation it buys far more than the original $10,000. Only growth beat inflation."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest2-mc1",
            question: "What is inflation?",
            options: [
              "A tax the government charges on savings according to most guides",
              "The gradual rise in prices, reducing each dollar's buying power",
              "The interest a bank pays on deposits as a general rule",
              "A sudden crash in the stock market over the long run"
            ],
            correctAnswer: 1,
            explanation: "Inflation is the gradual rise in prices over time, so each dollar buys less. It has averaged roughly 2%-3% a year in the U.S. over the long run."
          },
          {
            id: "invest2-mc2",
            question: "If your savings earns 1% while inflation is 3%, what is your real return?",
            options: [
              "About +4%",
              "About -2%",
              "Exactly 0%",
              "About +1%"
            ],
            correctAnswer: 1,
            explanation: "Real return subtracts inflation from your nominal return: 1% minus 3% is about -2%. You're actually losing purchasing power even though the dollar count rose."
          }
        ]
      },
      {
        type: "scenario",
        title: "Diego's Shrinking Dollars",
        narrative: "Diego, 18, is proud that he keeps $5,000 safely in a savings account earning 0.5%. His teacher points out that inflation is running about 3% a year. Diego runs the numbers to see what his 'safe' money is really doing over time.",
        details: [
          "Diego's savings earns 0.5%, but prices rise about 3% each year.",
          "His real return is roughly -2.5%, meaning his buying power shrinks yearly.",
          "In a decade, his $5,000 would buy noticeably less than it does today.",
          "To beat inflation, he'd need his long-term money growing faster than prices."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest2-aq1",
          question: "Why is Diego's 'safe' savings actually losing value over time?",
          options: [
              "The bank secretly withdraws his money",
              "Inflation outpaces his tiny interest rate",
              "Savings accounts are illegal for teens",
              "He keeps spending the interest according to most guides"
            ],
          correctAnswer: 1,
          explanation: "Inflation at 3% is higher than his 0.5% interest, so his real return is negative. The dollar count stays but its buying power quietly shrinks each year."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Inflation is the gradual rise in prices; each dollar buys less over time.",
          "It has averaged roughly 2%-3% a year and is measured by the CPI.",
          "Cash earning less than inflation loses real buying power.",
          "Real return subtracts inflation and shows if you're truly gaining.",
          "Investing in growth assets is how long-term money beats inflation."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invest2-mastery1",
            question: "Why is inflation called an 'invisible tax'?",
            options: [
              "The IRS mails you a special inflation bill",
              "It silently erodes your money's buying power",
              "It only affects rich people according to most guides",
              "It doubles your taxes each year"
            ],
            correctAnswer: 1,
            explanation: "No one bills you, but every year prices rise and your dollars quietly buy less if they aren't growing. That silent erosion acts like a hidden tax on cash."
          },
          {
            id: "invest2-mastery2",
            question: "What does the CPI measure?",
            options: [
              "The stock market's daily price as a general rule",
              "The average price of a basket of common goods",
              "A single company's profits according to most guides in the vast majority of situations",
              "The interest rate on savings over the long run"
            ],
            correctAnswer: 1,
            explanation: "The Consumer Price Index tracks the average price of a basket of common goods and services, and it's the usual gauge reported for inflation."
          },
          {
            id: "invest2-mastery3",
            question: "What is the difference between nominal and real return?",
            options: [
              "Nominal is after tax; real is before tax",
              "Real return subtracts inflation from nominal",
              "They are always identical according to most guides",
              "Nominal only applies to bonds"
            ],
            correctAnswer: 1,
            explanation: "Nominal return is the raw rate you earn; real return is what's left after subtracting inflation. Real return tells you whether your buying power actually grew."
          },
          {
            id: "invest2-mastery4",
            question: "Roughly what will a $100 item cost in 10 years at 3% inflation?",
            options: [
              "About $103",
              "About $134",
              "About $300",
              "Still exactly $100"
            ],
            correctAnswer: 1,
            explanation: "At 3% compounding for 10 years, $100 grows to about $134. Inflation compounds, so small yearly rises add up meaningfully over a decade."
          },
          {
            id: "invest2-mastery5",
            question: "Which is the best long-term protection against inflation?",
            options: [
              "Holding all cash in a drawer",
              "Investing in growth assets like stocks",
              "A savings account at 0.5% according to most guides",
              "Spending money as fast as possible"
            ],
            correctAnswer: 1,
            explanation: "Growth assets like stocks have historically returned well above inflation, growing real wealth. Cash and low-rate savings lose purchasing power over time."
          },
          {
            id: "invest2-mastery6",
            question: "How should inflation change your long-term savings goals?",
            options: [
              "Target today's prices exactly according to most guides",
              "Aim higher, since future prices will be greater",
              "Ignore it entirely for big goals over the long run",
              "Save less because prices fall as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Because prices rise over time, a future goal like a car or home will cost more than today. Long-term targets must aim above current prices to keep up."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invest-3: Simple vs Compound
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-3",
    sections: [
      {
        type: "concept",
        title: "Where Compounding Shows Up in Real Investments",
        paragraphs: [
          "You already met simple versus compound interest and the Rule of 72 in the Investing Fundamentals lesson on compound interest, so here we focus on where compounding actually shows up once you're a real investor - because the mechanics look different in a brokerage account than in a textbook. In investments, your 'interest on interest' comes from two engines: reinvested dividends and rising share prices that grow off an already-larger base. A quick refresher on the core idea: simple interest pays only on your original principal, while compound interest pays on principal plus everything it has already earned, so the balance snowballs.",
          "Reinvested dividends are the clearest example. Many stocks and funds pay you a small slice of profits regularly - a dividend. If you spend those payments, your money grows in a straight line, much like simple interest. If instead you automatically reinvest them to buy more shares, those new shares earn their own dividends next time, and the snowball begins. Over decades, reinvested dividends have historically supplied a large chunk of the stock market's total growth, which is why 'total return' funds assume you plow dividends back in rather than pocket them.",
          "The second engine is price growth on a growing base, and it compounds for the same reason a savings balance does. A fund worth $10,000 that gains 8% adds $800; the next year's 8% is figured on $10,800, so it adds $864, then more the year after. Nothing was deposited - the gains themselves became the base for future gains. This is why patient, hands-off investing tends to beat frequent trading: every time you sell, you interrupt the snowball and often trigger taxes and fees that shrink the base compounding builds on. Left alone, that upward curve steepens the longer it runs."
        ],
        bullets: [
          "Simple interest pays only on principal; compound pays on principal plus prior earnings (see the invfund compound-interest lesson).",
          "In investments, compounding comes from reinvested dividends and price growth on a larger base.",
          "Reinvesting dividends buys more shares that earn their own dividends - the snowball.",
          "Price gains compound too: 8% on a grown balance adds more dollars each year.",
          "Selling often interrupts the snowball and adds taxes and fees that shrink the base."
        ],
        realWorldExample: "Two investors each hold $2,000 in the same dividend-paying fund for 20 years. One cashes out every dividend and spends it; her money grows mostly from price alone. The other reinvests every dividend into new shares that then pay their own dividends. After 20 years the reinvestor's balance is thousands of dollars larger - the gap is compounding at work inside a real portfolio."
      },
      {
        type: "concept",
        title: "Compounding Frequency and the Two-Way Street",
        paragraphs: [
          "Compound interest gets even more interesting because of how often it compounds. Interest can compound yearly, monthly, or even daily, and more frequent compounding means slightly faster growth. If interest is added monthly, you start earning interest on that new interest a month sooner, rather than waiting a whole year. This is why you'll see terms like APY (annual percentage yield), which bakes in compounding frequency to show the true yearly growth, versus a plain rate that doesn't. When comparing accounts, APY gives you the honest apples-to-apples number.",
          "The catch is that compound interest is a two-way street: it works powerfully for you when you're investing, but brutally against you when you're borrowing. Credit card debt is compound interest in reverse. A card charging 24% APR compounds your unpaid balance, so debt can snowball just as fast as investments do - which is how a small balance balloons into a huge one. Understanding compounding means understanding why paying off high-interest debt is often the best 'investment' you can make: you're stopping compounding from working against you.",
          "The practical takeaways are simple but life-changing. To make compounding work for you, start early, stay invested, and let time do the heavy lifting - even small amounts grow huge over decades. To keep it from working against you, avoid carrying high-interest debt, because that same force will bury you. The exact same math that turns a teenager's modest savings into a fortune can turn a credit card balance into a nightmare. Which side of compounding you're on may be the single biggest financial choice you make."
        ],
        bullets: [
          "Interest can compound yearly, monthly, or daily; more often means faster growth.",
          "APY (annual percentage yield) reflects compounding for honest comparisons.",
          "Compounding works for you when investing and against you when borrowing.",
          "High-interest debt like credit cards compounds against you fast.",
          "Start early to harness compounding; avoid high-interest debt to escape it."
        ],
        realWorldExample: "A $3,000 credit card balance at 24% APR, paying only the minimum, can take over a decade to clear and cost more in interest than the original $3,000. That's compounding working against you - the exact same force that would have grown $3,000 invested at 8% into about $30,000 over 30 years."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest3-mc1",
            question: "How do reinvested dividends create compounding in a portfolio?",
            options: [
              "They are paid only on your original shares forever",
              "New shares bought with dividends earn their own dividends",
              "They lower the fund's price each quarter",
              "They replace price growth entirely"
            ],
            correctAnswer: 1,
            explanation: "Reinvesting a dividend buys more shares, and those shares pay dividends too. That is interest-on-interest inside a real investment - the snowball compounding relies on."
          },
          {
            id: "invest3-mc2",
            question: "Why can compound interest work against you?",
            options: [
              "It lowers your savings rate over time",
              "High-interest debt compounds and snowballs your balance",
              "It only applies to government bonds according to most guides",
              "It stops you from earning any interest"
            ],
            correctAnswer: 1,
            explanation: "Compounding is a two-way street. On debt like a 24% credit card, unpaid interest compounds, ballooning what you owe - the same force that grows investments in reverse."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nadia Sets Up Her Dividends",
        narrative: "Nadia, 17, is buying her first shares of a broad stock fund that pays a small dividend every quarter. Her app asks a simple question: should the dividends be paid out as cash or automatically reinvested into more shares? She wants the choice that compounds best over the 30 years she plans to hold.",
        details: [
          "Taking the dividends as cash lets her spend them, but her shares then grow mostly from price alone.",
          "Reinvesting buys fractional new shares each quarter, and those shares pay dividends too.",
          "Over 30 years, reinvested dividends historically add a large share of total return.",
          "Because she won't touch this money for decades, reinvesting keeps the snowball rolling."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest3-aq1",
          question: "Why does reinvesting dividends grow Nadia's money faster than taking the cash?",
          options: [
              "Reinvesting secretly raises the fund's dividend rate",
              "New shares from dividends earn dividends of their own",
              "Cash dividends are taxed at 100% according to most guides",
              "The fund adds a bonus only to cash payouts"
            ],
          correctAnswer: 1,
          explanation: "Reinvested dividends buy more shares, which pay their own dividends next time. That interest-on-interest snowball beats spending the cash and growing from price alone."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The simple-vs-compound basics live in the invfund compound-interest lesson; here we applied them to investing.",
          "In a portfolio, compounding comes from reinvested dividends and price growth on a larger base.",
          "Reinvesting dividends buys shares that earn their own dividends - the snowball.",
          "APY reflects compounding frequency for honest comparisons.",
          "Compounding helps you when investing but hurts you on high-interest debt (see the Credit unit)."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invest3-mastery1",
            question: "In a portfolio, what are the two engines that make money compound?",
            options: [
              "Bank fees and account minimums",
              "Reinvested dividends and price growth on a larger base",
              "Selling often and timing the market",
              "Cash payouts and spending them quickly"
            ],
            correctAnswer: 1,
            explanation: "Compounding inside investments comes from reinvested dividends buying more shares and from gains that grow off an already-larger balance - both build on themselves."
          },
          {
            id: "invest3-mastery2",
            question: "Why does frequent trading tend to weaken an investor's compounding?",
            options: [
              "It raises the dividend rate too high",
              "Each sale interrupts the snowball and adds taxes and fees",
              "It converts stocks into simple interest",
              "It forces the fund to stop paying dividends"
            ],
            correctAnswer: 1,
            explanation: "Selling stops gains from building on themselves and often triggers taxes and fees, shrinking the base compounding grows from. Patient holding lets the snowball keep rolling."
          },
          {
            id: "invest3-mastery3",
            question: "What does APY reflect that a plain interest rate may not?",
            options: [
              "The effect of compounding frequency",
              "The bank's total profit according to most guides",
              "The tax you owe",
              "The stock market's return"
            ],
            correctAnswer: 0,
            explanation: "APY (annual percentage yield) bakes in how often interest compounds, giving a true yearly growth figure for honest apples-to-apples comparisons between accounts."
          },
          {
            id: "invest3-mastery4",
            question: "Why is paying off high-interest debt like a great 'investment'?",
            options: [
              "It earns you a tax refund",
              "It stops compounding from working against you",
              "Debt never charges interest according to most guides",
              "It doubles your credit score as a general rule"
            ],
            correctAnswer: 1,
            explanation: "High-interest debt compounds against you. Paying it off halts that reverse compounding, effectively 'earning' the high rate you would have paid in interest."
          },
          {
            id: "invest3-mastery5",
            question: "How does more frequent compounding affect growth?",
            options: [
              "It slows growth down according to most guides",
              "It speeds growth up slightly",
              "It has no effect at all",
              "It cancels the interest"
            ],
            correctAnswer: 1,
            explanation: "Compounding monthly or daily starts earning interest on new interest sooner than yearly compounding, so it grows your money slightly faster over time."
          },
          {
            id: "invest3-mastery6",
            question: "What is compounding's best friend?",
            options: [
              "A high starting balance",
              "Time",
              "A famous stock",
              "A large bank"
            ],
            correctAnswer: 1,
            explanation: "Time is compounding's best friend - the longer money compounds, the more dramatically it grows, which is why starting young beats starting with more money."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invest-4: Time Value of Money
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-4",
    sections: [
      {
        type: "concept",
        title: "A Dollar Today Beats a Dollar Tomorrow",
        paragraphs: [
          "One of finance's core ideas is the time value of money: a dollar in your hand today is worth more than a dollar you'll get in the future. Why? Because a dollar today can be invested and start earning immediately, so by next year it could be $1.08. A dollar promised for next year can't do that - it's just sitting in the future, doing nothing until it arrives. On top of that, inflation means a future dollar will buy less, and there's always some risk the promised money never shows up. Time itself gives money value.",
          "This is why choosing between money now and money later isn't as simple as it looks. If someone offers you $1,000 today or $1,000 in five years, today is obviously better - you could invest it and have more than $1,000 by then. The interesting question is how much future money would make you indifferent. At 8%, $1,000 today grows to about $1,470 in five years, so getting $1,470 later would be roughly equal to $1,000 now. The gap between those numbers is the cost of waiting.",
          "Two key concepts capture this. Future value asks: if I invest a dollar today, what will it be worth later? Present value flips it: how much is a future payment worth in today's dollars? Present value 'discounts' future money back to now, because future money is worth less today. These ideas power almost every financial decision - loans, retirement planning, lottery payouts, even business investments - all rest on comparing money across different points in time using the time value of money. Whenever you weigh a payment now against a payment later, you are quietly doing this math, whether you realize it or not, and doing it deliberately leads to smarter choices."
        ],
        bullets: [
          "A dollar today is worth more than a dollar in the future.",
          "Money today can be invested immediately and start earning.",
          "Inflation and risk make future dollars worth less than present ones.",
          "Future value: what today's money grows to; present value: what future money is worth now.",
          "The gap between money now and later is the cost of waiting."
        ],
        realWorldExample: "A lottery advertises a '$10 million jackpot' but offers a choice: $10 million spread over 30 yearly payments, or a smaller lump sum today - say $5 million. Many winners take the lump sum, because $5 million invested now can grow and be used immediately, often outweighing 30 years of smaller future payments worth less in today's dollars."
      },
      {
        type: "concept",
        title: "Why Waiting to Invest Is So Costly",
        paragraphs: [
          "The time value of money is the deepest reason to start investing young - the Investing Fundamentals unit made the 'start early' case behaviorally, and here you can see the exact math behind it. Because a present dollar is worth more than a future one, the earliest dollars you invest are the most valuable: they have the longest runway to compound. This creates a startling result: a person who invests for just 10 years starting young can end up with more than someone who invests for 30 years starting later, even though the late starter contributes far more money. The early dollars simply had more time to multiply.",
          "Picture two investors. Renata invests $2,000 a year from age 18 to 28 - ten years, $20,000 total - then stops and never adds another cent. Marcus waits and invests $2,000 a year from age 28 to 58 - thirty years, $60,000 total. Assuming 8% growth, Renata often ends up with roughly the same or even more at 60, despite investing a third of what Marcus did. Her money had a decade's head start to compound, proving that when you start can matter more than how much you invest.",
          "The flip side is the hidden cost of delay. Every year you wait to start investing isn't just one lost year - it's a lost year at the far end, when your balance would have been largest and its growth greatest. Waiting from 22 to 32 to 'get serious' about investing could cost you hundreds of thousands of dollars by retirement, all from ten years of missed compounding on your earliest, most powerful dollars. Understanding the time value of money turns 'I'll start later' into an obviously expensive decision."
        ],
        bullets: [
          "Your earliest invested dollars are the most valuable - they compound longest.",
          "Someone investing 10 early years can beat someone investing 30 later years.",
          "Renata ($20k over 10 early years) can match or beat Marcus ($60k over 30 later years).",
          "When you start can matter more than how much you invest.",
          "Every year you delay is a lost year at the far, most powerful end."
        ],
        realWorldExample: "Renata invests $2,000 yearly from 18-28, then stops - $20,000 in. Marcus invests $2,000 yearly from 28-58 - $60,000 in. At 8%, both reach around $300,000 by age 60. Renata invested one-third as much yet matched Marcus, purely because her dollars had a decade's extra head start to compound."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest4-mc1",
            question: "Why is a dollar today worth more than a dollar in the future?",
            options: [
              "Future dollars are printed in a different color",
              "Today's dollar can be invested and start earning now",
              "The government bans saving future dollars as a general rule",
              "Future dollars are always counterfeit according to most guides"
            ],
            correctAnswer: 1,
            explanation: "A dollar today can be invested immediately and grow, while a future dollar can't earn until it arrives. Inflation and risk also make future dollars worth less."
          },
          {
            id: "invest4-mc2",
            question: "What does 'present value' describe?",
            options: [
              "What today's money will grow into later as a general rule",
              "What a future payment is worth in today's dollars",
              "The interest rate on a loan according to most guides",
              "The total number of dollars in circulation"
            ],
            correctAnswer: 1,
            explanation: "Present value discounts a future payment back to what it's worth today, since future money is worth less now. Future value is the opposite - what today's money grows into."
          }
        ]
      },
      {
        type: "scenario",
        title: "Renata and Marcus's Head Start",
        narrative: "Renata starts investing $2,000 a year at age 18 and stops completely at 28 - just ten years. Marcus doesn't start until 28, then invests $2,000 a year all the way to 58 - thirty years. Both earn about 8%. At age 60, they compare their totals, expecting Marcus to be far ahead.",
        details: [
          "Renata invested only $20,000 total, all during her early years.",
          "Marcus invested $60,000 total, three times as much as Renata.",
          "Renata's early dollars compounded for decades, giving them a huge head start.",
          "At 60, both end up around $300,000 despite Marcus investing far more."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest4-aq1",
          question: "How did Renata match Marcus despite investing only a third as much?",
          options: [
              "Her early dollars compounded far longer",
              "She earned a much higher interest rate",
              "Marcus's money was taxed away according to most guides",
              "She kept secretly adding money"
            ],
          correctAnswer: 0,
          explanation: "Renata's earliest dollars had decades to compound, making them the most powerful. Starting early gave her a head start that Marcus's larger but later contributions couldn't overcome."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A dollar today is worth more than a dollar in the future.",
          "Money today can be invested immediately; inflation and risk shrink future dollars.",
          "Future value grows today's money; present value discounts future money to now.",
          "Your earliest invested dollars are the most powerful because they compound longest.",
          "Starting early can beat investing far more money later."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invest4-mastery1",
            question: "What is the time value of money?",
            options: [
              "Money loses value only when spent according to most guides",
              "A dollar today is worth more than one later",
              "All dollars are always worth the same",
              "Future dollars are always worth more as a general rule"
            ],
            correctAnswer: 1,
            explanation: "The time value of money says a dollar today is worth more than a dollar in the future, because today's dollar can be invested and grow immediately."
          },
          {
            id: "invest4-mastery2",
            question: "What is 'future value'?",
            options: [
              "What today's money grows into later",
              "What a future payment is worth today",
              "The face value of a bond",
              "The tax on future earnings"
            ],
            correctAnswer: 0,
            explanation: "Future value is what a sum invested today will be worth at a later date after growth. Present value is the reverse - discounting future money to today."
          },
          {
            id: "invest4-mastery3",
            question: "Why are your earliest invested dollars the most valuable?",
            options: [
              "They earn a special higher rate",
              "They have the longest time to compound",
              "They avoid all taxes forever according to most guides",
              "Banks give bonuses for early dollars"
            ],
            correctAnswer: 1,
            explanation: "Early dollars have the longest runway to compound, so they multiply the most. That's why a small early investment can outgrow a larger late one."
          },
          {
            id: "invest4-mastery4",
            question: "Why might a lottery winner take a lump sum over yearly payments?",
            options: [
              "Lump sums avoid all taxes as a general rule",
              "Money now can be invested and grow immediately",
              "Yearly payments are illegal according to most guides",
              "The lump sum is always larger over the long run"
            ],
            correctAnswer: 1,
            explanation: "A lump sum today can be invested right away and used immediately, often outweighing 30 years of smaller future payments that are worth less in today's dollars."
          },
          {
            id: "invest4-mastery5",
            question: "What does present value do to a future payment?",
            options: [
              "Discounts it to today's dollars",
              "Multiplies it by inflation according to most guides",
              "Guarantees it will double",
              "Adds interest to it forever"
            ],
            correctAnswer: 0,
            explanation: "Present value discounts a future payment back to what it's worth today, because a dollar arriving later is worth less than a dollar in hand now."
          },
          {
            id: "invest4-mastery6",
            question: "What is the hidden cost of waiting ten years to start investing?",
            options: [
              "A small one-time bank fee according to most guides",
              "Losing your most powerful compounding years",
              "Nothing - later dollars are stronger",
              "A higher tax bracket automatically"
            ],
            correctAnswer: 1,
            explanation: "Delaying loses your earliest, longest-compounding dollars - the ones that would have grown the most. Ten missed years can cost hundreds of thousands by retirement."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invest-5: Risk vs Return
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-5",
    sections: [
      {
        type: "concept",
        title: "The Two Forms Every Return Takes",
        paragraphs: [
          "You met the golden rule of risk and return - higher potential reward always demands higher risk - in the Investing Fundamentals risk lesson, so here we go a layer deeper into what 'return' actually is. Return isn't a single thing; it arrives in two distinct forms, and knowing them changes how you judge an investment. The first is income: money paid to you while you simply hold the investment, like interest from a bond or a dividend from a stock. Income tends to be steadier and shows up as cash you can spend or reinvest.",
          "The second form is capital appreciation - the investment's price rising so it's worth more than you paid. If you buy a share at $50 and it climbs to $70, that $20 gain is appreciation, but it's only real once you could sell. Appreciation is usually where the big long-term growth comes from, yet it's also where most of the ups and downs live, because prices swing far more than dividend payments do. Total return combines the two: income received plus price change. A fund up 6% in price that also paid a 2% dividend delivered an 8% total return.",
          "Naming these two forms sharpens every comparison. A bond fund might deliver almost all its return as income with little price movement, while a growth-stock fund might pay no dividend at all and rely entirely on appreciation. Neither is automatically better - they suit different goals. Someone wanting cash flow now leans toward income; someone building wealth for decades can favor appreciation and reinvest along the way. When you weigh two investments, compare their total return and ask which mix of income and appreciation fits what you actually need the money to do."
        ],
        bullets: [
          "The risk-return golden rule is taught in the invfund risk lesson; here we unpack return itself.",
          "Return comes in two forms: income (interest, dividends) and capital appreciation (price rising).",
          "Income is steadier cash; appreciation drives long-term growth but swings more.",
          "Total return = income received plus price change over the period.",
          "Income suits those wanting cash flow now; appreciation suits long-term wealth building."
        ],
        realWorldExample: "Maya holds two investments for a year. A bond fund pays her $40 in interest on $1,000 and its price barely moves - almost all income. A stock fund pays a $10 dividend on $1,000 but its price rises to $1,090 - mostly appreciation. Both delivered about the same total return, roughly 8%, but in very different forms."
      },
      {
        type: "concept",
        title: "Turning Risk Into a Tool You Control",
        paragraphs: [
          "Risk can actually be measured, and the most common measure is volatility - how much an investment's value swings around its average. An asset that bounces between +30% and -25% in different years is highly volatile; one that drifts gently between +6% and +2% is not. Analysts often express this as 'standard deviation,' a single number capturing the typical size of those swings. You don't need the math, just the intuition: bigger swings mean a bumpier ride, and knowing an investment's volatility tells you what kind of ride to brace for before you buy.",
          "The crucial insight is that volatility is not the same as danger for a long-term investor. A diversified stock fund swings a lot year to year yet has been reliable over decades, because the swings largely cancel out over time. The real damage comes from reacting to volatility - selling low in a panic - not from the swings themselves. This is also why a single stock is far more volatile than a broad fund: one company's bad news can crater its price, while a fund holding hundreds of companies smooths those individual shocks into a gentler overall path. The tools for handling this - diversification, time horizon, and asset allocation - are covered in the Investing Fundamentals lessons on risk and diversification.",
          "Matching risk to your situation is everything. A teen investing for retirement can embrace higher-volatility stocks, because decades of time turn short-term swings into long-term growth, and playing it too safe would lose to inflation. Someone saving for next year's tuition should stay low-volatility, because they can't afford a crash right before they need the cash. There's no universally 'right' amount of risk - only the amount that fits your goals, timeline, and ability to stay calm when markets get scary."
        ],
        bullets: [
          "Volatility measures how much an investment's value swings around.",
          "Volatility isn't the same as danger for patient long-term investors.",
          "Manage risk with diversification, a long time horizon, and asset allocation.",
          "Only accept risk you're fairly rewarded for taking.",
          "Match your risk level to your goals, timeline, and emotional steadiness."
        ],
        realWorldExample: "A teen with a 40-year horizon holds a volatile stock fund that drops 30% one year - scary, but they hold on and it recovers to new highs. A saver needing tuition next year holds that same fund and is forced to sell during the drop, locking in the loss. Same investment, opposite outcomes - because of time horizon."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest5-mc1",
            question: "What is 'total return' on an investment?",
            options: [
              "Only the dividends it pays over a year",
              "Income received plus the change in price",
              "Just the price gain, ignoring any income",
              "The fees subtracted from your deposit"
            ],
            correctAnswer: 1,
            explanation: "Total return combines both forms: the income you're paid (interest or dividends) plus any capital appreciation from the price rising above what you paid."
          },
          {
            id: "invest5-mc2",
            question: "What are the two main forms of investment return?",
            options: [
              "Fees and taxes according to most guides",
              "Income (interest, dividends) and capital appreciation",
              "Deposits and withdrawals as a general rule",
              "Principal and collateral over the long run"
            ],
            correctAnswer: 1,
            explanation: "Total return combines income - like interest or dividends paid while you hold - and capital appreciation, the investment's price rising above what you paid."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Goals, Two Risk Levels",
        narrative: "Layla, 18, has two separate goals. She's saving for college tuition due next year, and she's also investing money for retirement 40 years away. A friend tells her to just put both piles into the same aggressive stock fund. Layla pauses to think about the risk each goal can handle.",
        details: [
          "Her tuition money is needed in one year, so a market crash could be devastating.",
          "Her retirement money has 40 years to recover from any downturn.",
          "She keeps tuition in a low-risk savings account or short-term bonds.",
          "She invests the retirement money in a diversified stock fund for growth."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest5-aq1",
          question: "Why should Layla treat her two goals with different risk levels?",
          options: [
              "Retirement money never faces any risk according to most guides",
              "Their time horizons differ, so their risk capacity differs",
              "Tuition should always be invested aggressively as a general rule",
              "Both goals are identical in every way"
            ],
          correctAnswer: 1,
          explanation: "Tuition is needed soon and can't survive a crash, so it stays safe. Retirement is decades away and can ride out volatility, so it can take more risk for growth."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Every investment trades return (reward) against risk (uncertainty).",
          "Higher potential returns require accepting higher risk.",
          "Return comes as income and as capital appreciation.",
          "Volatility measures swings but isn't the same as danger for patient investors.",
          "Match your risk level to your goals, timeline, and emotional steadiness."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invest5-mastery1",
            question: "A fund's price rises 6% and it also pays a 2% dividend. Its total return is about…",
            options: [
              "2%, counting only the dividend",
              "8%, combining price gain and income",
              "6%, counting only the price gain",
              "4%, the difference between them"
            ],
            correctAnswer: 1,
            explanation: "Total return adds income to price change: a 6% price gain plus a 2% dividend is roughly an 8% total return for the year."
          },
          {
            id: "invest5-mastery2",
            question: "Which investment delivers its return mostly as income rather than appreciation?",
            options: [
              "A growth stock that pays no dividend",
              "A bond fund paying steady interest",
              "A speculative coin bought to flip",
              "A startup share with no payouts"
            ],
            correctAnswer: 1,
            explanation: "A bond fund pays regular interest with little price movement, so its return is mostly income. Growth stocks and speculative bets rely on appreciation instead."
          },
          {
            id: "invest5-mastery3",
            question: "What is capital appreciation?",
            options: [
              "Interest paid on a bond as a general rule",
              "An investment's price rising above what you paid",
              "A fee charged by a fund over the long run",
              "The tax on dividends according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Capital appreciation is the gain from an investment's price increasing. Combined with income like dividends or interest, it makes up your total return."
          },
          {
            id: "invest5-mastery4",
            question: "For a long-term investor, why isn't volatility the same as danger?",
            options: [
              "Volatility means an asset can't lose money over the long run",
              "Swings even out over decades if you hold on",
              "Volatile assets are legally guaranteed according to most guides",
              "Volatility only affects rich people as a general rule"
            ],
            correctAnswer: 1,
            explanation: "A diversified fund swings year to year but has been reliable over decades. The real danger is panic-selling during a swing, not the swing itself."
          },
          {
            id: "invest5-mastery5",
            question: "Why is a single stock usually more volatile than a broad fund?",
            options: [
              "Single stocks are taxed at a higher rate",
              "One company's bad news can crater its price",
              "Funds are legally guaranteed against loss",
              "Single stocks never pay any dividends"
            ],
            correctAnswer: 1,
            explanation: "A broad fund holds hundreds of companies, so one firm's shock is smoothed out. A single stock has no such cushion, so its price swings far more."
          },
          {
            id: "invest5-mastery6",
            question: "What determines how much risk is right for a specific goal?",
            options: [
              "The goal's time horizon and your steadiness",
              "The color of your investing app",
              "How many friends invest too according to most guides",
              "The current day of the week"
            ],
            correctAnswer: 0,
            explanation: "The right risk level depends on when you need the money and whether you can stay calm through swings. Far-off goals can take more risk than near-term ones."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invest-6: Opportunity Cost
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-6",
    sections: [
      {
        type: "concept",
        title: "Every Choice Has a Hidden Price Tag",
        paragraphs: [
          "Opportunity cost is the value of the best thing you give up whenever you make a choice. Because your money and time are limited, saying yes to one option always means saying no to others. If you spend $500 on a gaming setup, the opportunity cost isn't just the $500 - it's whatever that $500 could have become if you'd done something else with it, like invested it. Every dollar has other jobs it could have done, and opportunity cost is the name for the road you didn't take.",
          "This idea is invisible on a receipt but powerful in real life. When you buy a $5 coffee daily, the sticker cost is $5, but the opportunity cost is what that $5 a day could grow into if invested - which over decades is thousands of dollars. That doesn't mean you should never buy coffee; it means every spending choice quietly trades away a future possibility. Thinking in opportunity cost turns invisible trade-offs into visible ones, so you spend on what truly matters to you and skip what doesn't.",
          "Opportunity cost applies to investing choices too, not just spending. Leaving $5,000 in a savings account at 0.5% has an opportunity cost: the roughly 8% it might have earned invested - the growth you gave up by 'playing it safe.' Choosing one investment over another means giving up the other's potential return. Even time has opportunity cost: waiting a year to start investing costs you a year of compounding. Once you see opportunity cost everywhere, you start making choices based on their true, full cost. Economists call this thinking 'on the margin,' and it quietly reshapes how you view money: not as a fixed pile to spend down, but as a tool that could always be doing a different, possibly better job for your future self."
        ],
        bullets: [
          "Opportunity cost is the value of the best alternative you give up.",
          "Limited money and time mean every yes is also a no to something else.",
          "A $5 daily coffee's real cost includes what that money could have grown into.",
          "'Safe' savings has an opportunity cost: the higher return you gave up.",
          "Even waiting to invest has an opportunity cost - lost compounding time."
        ],
        realWorldExample: "Skipping a $5 daily coffee and investing that $150 a month at 8% would grow to roughly $225,000 over 40 years. The coffee's true cost was never just $5 - its opportunity cost was a small fortune. Seeing that trade-off lets you decide if the daily coffee is genuinely worth it to you."
      },
      {
        type: "concept",
        title: "Using Opportunity Cost to Make Better Choices",
        paragraphs: [
          "Opportunity cost is a decision-making superpower once you use it deliberately. Before any big money choice, ask: 'What's the next-best thing I could do with this money, and what am I giving up?' This reframes spending and investing from 'Can I afford it?' to 'Is this the best use of my limited dollars?' A $2,000 vacation might be completely worth it - but only after honestly weighing it against the roughly $20,000 it could grow into over decades. Naming the trade-off lets you choose on purpose instead of by default.",
          "This lens is especially useful for the classic money dilemmas. Should you pay off a 20% credit card or invest? The opportunity cost of investing is the 20% you keep paying in interest - which almost always makes paying the debt the better 'return.' Should you buy a new car or a reliable used one? The opportunity cost of the extra $15,000 is what it could earn invested. Opportunity cost cuts through emotion and marketing, forcing every option to compete on its real long-term value.",
          "The goal isn't to feel guilty about every purchase or to never enjoy money - that's miserable and unrealistic. The goal is intentional choices. Some things are worth their opportunity cost: education that boosts your earnings, experiences you'll treasure, or health you can't replace. Others aren't. By habitually asking what you're giving up, you naturally shift money toward what matters most to you and away from mindless spending, so your limited resources build the life and future you actually want."
        ],
        bullets: [
          "Before big choices, ask what the next-best use of the money is.",
          "This reframes 'Can I afford it?' into 'Is this the best use of my dollars?'",
          "Paying off a 20% credit card often beats investing, by opportunity cost.",
          "Opportunity cost cuts through emotion and marketing on every option.",
          "The goal is intentional choices, not guilt over every purchase."
        ],
        realWorldExample: "Someone with $5,000 debates investing it or paying off a credit card charging 22%. Investing might earn 8%, but the opportunity cost of not paying the card is the 22% interest that keeps piling up. Paying the debt effectively 'earns' 22% risk-free - the clearly better choice once opportunity cost is weighed."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest6-mc1",
            question: "What is opportunity cost?",
            options: [
              "The sticker price printed on an item",
              "The value of the best alternative you give up",
              "A tax added to every purchase according to most guides",
              "The fee a bank charges monthly as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Opportunity cost is the value of the best thing you give up when you make a choice, since limited money and time mean every yes is also a no to something else."
          },
          {
            id: "invest6-mc2",
            question: "What is the opportunity cost of leaving money in a 0.5% savings account?",
            options: [
              "A monthly account fee according to most guides",
              "The higher return it could have earned invested",
              "Nothing, since savings is always best over the long run",
              "The original deposit disappearing as a general rule"
            ],
            correctAnswer: 1,
            explanation: "By keeping money 'safe' at 0.5%, you give up the higher return (like 8%) it could have earned invested. That forgone growth is the opportunity cost."
          }
        ]
      },
      {
        type: "scenario",
        title: "Zoe's $5,000 Decision",
        narrative: "Zoe, 20, just received a $5,000 bonus. She's carrying a credit card balance charging 22% interest, and she's also tempted to invest the money in a stock fund that might average 8%. She isn't sure which choice actually leaves her better off, so she weighs the opportunity cost of each.",
        details: [
          "Investing the $5,000 might earn about 8% a year in a diversified fund.",
          "Her credit card charges 22%, which keeps compounding against her.",
          "The opportunity cost of investing is the 22% interest she'd keep paying.",
          "Paying off the card effectively 'earns' 22% risk-free by avoiding that interest."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest6-aq1",
          question: "Using opportunity cost, what should Zoe most likely do with the $5,000?",
          options: [
              "Invest it, since 8% always beats paying debt",
              "Pay off the 22% credit card first",
              "Keep it all in cash forever according to most guides",
              "Split it evenly with no reasoning"
            ],
          correctAnswer: 1,
          explanation: "Paying off the 22% card avoids that interest, effectively 'earning' 22% risk-free - well above the fund's expected 8%. Opportunity cost makes clearing the debt the better choice."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Opportunity cost is the value of the best alternative you give up.",
          "Every spending choice trades away a future possibility for your money.",
          "'Safe' savings and even waiting to invest carry opportunity costs.",
          "Paying high-interest debt often beats investing, by opportunity cost.",
          "Use opportunity cost for intentional choices, not guilt over every purchase."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invest6-mastery1",
            question: "You spend $500 on a gadget. What is the opportunity cost?",
            options: [
              "Only the $500 sticker price according to most guides",
              "What that $500 could have become elsewhere",
              "The sales tax on the gadget",
              "Nothing, since you own it now"
            ],
            correctAnswer: 1,
            explanation: "The opportunity cost is the best alternative use of that $500 - such as the growth it could have earned invested - not just the sticker price you paid."
          },
          {
            id: "invest6-mastery2",
            question: "Why does even waiting a year to invest have an opportunity cost?",
            options: [
              "Banks charge a waiting fee according to most guides",
              "You lose a year of compounding growth",
              "Waiting is illegal for investors as a general rule",
              "Prices always fall while you wait"
            ],
            correctAnswer: 1,
            explanation: "Delaying costs a year of compounding on your earliest, most powerful dollars. That lost growth is the opportunity cost of waiting to start."
          },
          {
            id: "invest6-mastery3",
            question: "How does opportunity cost reframe a spending question?",
            options: [
              "From 'Can I afford it?' to 'Is this the best use?'",
              "From 'Is it fun?' to 'Is it expensive?' over the long run",
              "It makes every purchase forbidden according to most guides in the vast majority of situations",
              "It ignores the price entirely as a general rule"
            ],
            correctAnswer: 0,
            explanation: "Opportunity cost shifts the question from mere affordability to whether this is truly the best use of your limited dollars, revealing hidden trade-offs."
          },
          {
            id: "invest6-mastery4",
            question: "Why does paying off a 22% credit card often beat investing at 8%?",
            options: [
              "Debt payments earn tax refunds according to most guides",
              "Avoiding 22% interest beats an 8% expected return",
              "Investing is never allowed with debt as a general rule",
              "Credit cards secretly pay you back"
            ],
            correctAnswer: 1,
            explanation: "Clearing the card avoids 22% interest, effectively a guaranteed 22% 'return' - higher than the fund's uncertain 8%. Opportunity cost favors killing the debt."
          },
          {
            id: "invest6-mastery5",
            question: "What is the real goal of thinking in opportunity cost?",
            options: [
              "Feeling guilty about every purchase",
              "Making intentional, informed choices",
              "Never spending money on anything",
              "Buying only the cheapest option"
            ],
            correctAnswer: 1,
            explanation: "The goal is intentional choices, not guilt. Seeing trade-offs helps you spend on what truly matters and skip what doesn't, with your limited resources."
          },
          {
            id: "invest6-mastery6",
            question: "Which purchase might genuinely be worth its opportunity cost?",
            options: [
              "Education that boosts your future earnings",
              "An impulse buy you forget in a week",
              "A subscription you never use",
              "A duplicate of something you own"
            ],
            correctAnswer: 0,
            explanation: "Some things are worth their opportunity cost - like education that raises your earnings. Opportunity cost helps you tell those apart from mindless spending."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invest-7: Diversification
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-7",
    sections: [
      {
        type: "concept",
        title: "Why One Big Bet Can Ruin You",
        paragraphs: [
          "Diversification is the practice of not putting all your money into one place. The logic is simple: if everything you own rises and falls together, a single bad event can wipe you out, but if your money is spread across many different investments, no single failure can sink the ship. The famous phrase is 'don't put all your eggs in one basket.' In investing, one basket might be a single company, a single industry, or a single type of asset - and history is full of people who lost everything by betting it all on one thing they were sure couldn't fail.",
          "The danger you're avoiding is called unsystematic risk - the risk tied to one specific company or sector. If you own only one stock and that company has a scandal, a lawsuit, or bad earnings, you could lose most of your money overnight. Even a beloved, seemingly unstoppable company can collapse; countless 'sure things' have gone bankrupt. Diversification neutralizes this by making any single company a small slice of your holdings, so its disaster becomes a minor bump instead of a catastrophe you can't recover from.",
          "What makes diversification almost magical is that it can lower your risk without lowering your expected return - a rare deal in investing, where cutting risk usually means giving up reward. This works because different investments respond differently to events: when one zigs, another zags. If tech stocks tumble but energy and healthcare rise, the winners cushion the losers, smoothing your overall ride. Nobel-winning research confirmed this, which is why diversification is often called the only 'free lunch' in investing - genuine risk reduction at no cost to long-term growth. In almost every other situation, cutting risk means giving up some expected return, so a strategy that lowers your danger for free is a rare gift worth taking seriously."
        ],
        bullets: [
          "Diversification spreads money so no single failure can wipe you out.",
          "The classic rule is 'don't put all your eggs in one basket.'",
          "Unsystematic risk is the danger tied to one specific company or sector.",
          "One stock's scandal or bankruptcy can erase money fast if you're concentrated.",
          "Diversification can cut risk without cutting expected return - a rare 'free lunch.'"
        ],
        realWorldExample: "An employee puts their entire $50,000 savings into their own company's stock because they trust it. The company hits an accounting scandal and the stock drops 90%, leaving $5,000. A coworker with the same $50,000 spread across a diversified fund of hundreds of companies barely notices that one firm's collapse."
      },
      {
        type: "concept",
        title: "Diversifying Across Every Dimension",
        paragraphs: [
          "Real diversification means spreading across several dimensions, not just owning more stocks. You diversify across asset classes (stocks, bonds, real estate, cash), across sectors (technology, healthcare, energy, finance), across company sizes (large and small firms), and across geography (U.S. and international markets). The point is to own things that don't all move together, so no single event - a tech crash, a rate hike, a regional recession - can hit everything you own at once. Owning ten tech stocks feels diversified but isn't, because they'd all sink together in a tech downturn.",
          "The concept behind this is correlation - how closely two investments move in sync. Assets with low or negative correlation are diversification gold, because when one falls the other may hold steady or rise. Stocks and high-quality bonds often have low correlation, which is why mixing them smooths returns. The art of building a portfolio is combining assets whose ups and downs partly cancel out, producing a steadier path to the same destination rather than a wild roller coaster that tempts you to panic-sell.",
          "For most people, the simplest powerful move is a broad index fund, which delivers instant diversification across hundreds or thousands of companies in a single purchase. A total-market fund plus an international fund plus a bond fund can diversify a portfolio globally for pennies in fees. Diversification does have limits: it can't protect against systematic risk - a crash that hits the entire market - and you can over-diversify into redundant funds that just add fees. The sweet spot is broad, low-cost diversification you can hold calmly for decades."
        ],
        bullets: [
          "Diversify across asset classes, sectors, company sizes, and countries.",
          "Owning ten tech stocks isn't diversified - they move together.",
          "Correlation measures how closely investments move in sync.",
          "Low-correlation assets (like stocks and bonds) smooth your returns.",
          "A broad index fund diversifies instantly; but it can't stop a whole-market crash."
        ],
        realWorldExample: "A portfolio of a U.S. total-market fund, an international fund, and a bond fund spreads risk across thousands of companies, many countries, and two asset classes. When U.S. stocks slump, international holdings or steady bonds can cushion the blow - a smoother ride than betting everything on one market."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest7-mc1",
            question: "What is 'unsystematic risk'?",
            options: [
              "The risk the whole market crashes at once",
              "The risk tied to one specific company or sector",
              "The risk of inflation rising according to most guides",
              "The risk of a fund's fees changing as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Unsystematic risk is danger tied to a single company or sector, like a scandal or bad earnings. Diversification neutralizes it by making any one holding a small slice."
          },
          {
            id: "invest7-mc2",
            question: "What does 'correlation' describe between two investments?",
            options: [
              "How much tax each one owes",
              "How closely they move in sync",
              "Which one is more famous according to most guides",
              "How old each company is"
            ],
            correctAnswer: 1,
            explanation: "Correlation measures how closely two investments move together. Low or negative correlation is valuable because when one falls, the other may hold steady or rise."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus and the Company Stock",
        narrative: "Marcus, 22, works at a growing company and is offered the chance to put all his $50,000 in savings into its stock. He loves the company and is sure it will keep rising. His mentor warns him about concentration and suggests diversifying instead.",
        details: [
          "Putting all $50,000 in one stock exposes Marcus to heavy unsystematic risk.",
          "If the company hits a scandal or bad earnings, he could lose most of it fast.",
          "Spreading the money across a diversified fund makes any one failure a small dent.",
          "A broad index fund would give him hundreds of companies in one purchase."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest7-aq1",
          question: "Why is Marcus's all-in-one-stock plan so risky?",
          options: [
              "Single stocks are illegal to own as a general rule",
              "One company's failure could wipe out his savings",
              "Diversified funds always lose money according to most guides",
              "His company can never have problems"
            ],
          correctAnswer: 1,
          explanation: "Concentrating everything in one stock means a single scandal or bad quarter could erase most of his savings. Diversifying makes any one company's failure only a small dent."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Diversification spreads money so no single failure can wipe you out.",
          "Unsystematic risk is tied to one company or sector; diversifying neutralizes it.",
          "Diversify across asset classes, sectors, sizes, and countries.",
          "Low-correlation assets smooth returns by not moving together.",
          "Broad index funds diversify instantly but can't stop a whole-market crash."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invest7-mastery1",
            question: "Why is diversification called the 'free lunch' of investing?",
            options: [
              "It removes all fees on funds as a general rule",
              "It can cut risk without cutting expected return",
              "It guarantees a profit each year",
              "It gives you free stocks according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Diversification reduces risk without lowering expected return - rare in investing, where less risk usually means less reward. That's why it's the closest thing to a free lunch."
          },
          {
            id: "invest7-mastery2",
            question: "Why is owning ten tech stocks NOT truly diversified?",
            options: [
              "Ten stocks is too few to count",
              "They tend to move together in a downturn",
              "Tech stocks pay no dividends as a general rule",
              "It's against the rules according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Same-sector stocks move together, so a tech slump sinks all ten at once. Real diversification spreads across sectors and asset types that behave differently."
          },
          {
            id: "invest7-mastery3",
            question: "Which pair of assets typically has low correlation?",
            options: [
              "Two social-media stocks according to most guides",
              "Stocks and high-quality bonds",
              "Two oil companies",
              "Two tech startups"
            ],
            correctAnswer: 1,
            explanation: "Stocks and high-quality bonds often move differently, so mixing them smooths returns. Same-sector pairs move together and don't offer that cushioning effect."
          },
          {
            id: "invest7-mastery4",
            question: "What is the easiest way to diversify instantly?",
            options: [
              "Buy one broad index fund",
              "Pick a single hot stock",
              "Hold only cash according to most guides",
              "Buy one company's bond"
            ],
            correctAnswer: 0,
            explanation: "A broad index fund holds hundreds or thousands of companies in one purchase, delivering instant diversification more cheaply than buying stocks one by one."
          },
          {
            id: "invest7-mastery5",
            question: "What can diversification NOT protect against?",
            options: [
              "One company going bankrupt according to most guides",
              "A crash across the entire market",
              "A single sector slumping as a general rule",
              "One bad stock pick"
            ],
            correctAnswer: 1,
            explanation: "Diversification handles company- and sector-specific (unsystematic) risk, but a systematic crash hitting the whole market still drags a diversified portfolio down."
          },
          {
            id: "invest7-mastery6",
            question: "What is a downside of over-diversifying?",
            options: [
              "Your money becomes guaranteed according to most guides",
              "Redundant funds add fees without more safety",
              "You must sell everything yearly as a general rule",
              "Returns are capped at zero by law"
            ],
            correctAnswer: 1,
            explanation: "Piling on overlapping funds just recreates the market while adding fees. Broad, low-cost diversification hits the sweet spot without the redundant cost."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invest-8: Long vs Short Term
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-8",
    sections: [
      {
        type: "concept",
        title: "Your Time Horizon Changes Everything",
        paragraphs: [
          "How you should invest depends heavily on when you'll need the money - your time horizon. Short-term goals are things you'll pay for within a few years: a car, a vacation, next year's tuition, or an emergency fund. Long-term goals are years or decades away: retirement, a home you'll buy in fifteen years, or building lasting wealth. The same investment that's perfect for one horizon can be dangerous for the other, so matching your strategy to your timeline is one of the most important decisions you make.",
          "For short-term money, safety beats growth. Because you'll need the cash soon, you can't risk a market crash right before you spend it - if a stock fund drops 30% the month before your tuition is due, you're in trouble. So short-term money belongs in low-risk, stable places: savings accounts, money market accounts, or short-term bonds. You give up higher returns, but you protect the principal, which is exactly what matters when the finish line is close. Chasing big gains with money you need soon is a classic, painful mistake.",
          "For long-term money, growth beats safety. With decades ahead, you can ride out crashes because history shows the market recovers and climbs over long periods. Volatility that would be scary for short-term money becomes just noise you have time to outlast. So long-term money belongs in growth assets like diversified stock funds, where higher returns compound over the years. Playing it too safe with long-term money is its own mistake, because inflation quietly erodes cash that isn't growing fast enough. A twenty-year-old who hides retirement savings in a low-interest account out of fear may feel safe, yet decades later discover their 'protected' money buys far less than they expected, having lost a silent race against rising prices."
        ],
        bullets: [
          "Time horizon is when you'll need the money; it drives your strategy.",
          "Short-term goals are a few years out; long-term goals are years to decades away.",
          "Short-term money belongs in safe, stable places to protect the principal.",
          "Long-term money belongs in growth assets that can ride out crashes.",
          "Playing too safe with long-term money loses to inflation over time."
        ],
        realWorldExample: "Two funds hold the same $10,000. One is for a car next year, one is for retirement in 40 years. If the market drops 30%, the car buyer needs their cash and is forced to sell at $7,000 - a real loss. The retirement investor waits out the dip and the money recovers and grows. Same drop, opposite outcomes."
      },
      {
        type: "concept",
        title: "Patience Is the Long-Term Investor's Superpower",
        paragraphs: [
          "Long-term investing wins largely because of a boring-sounding truth: time smooths out risk. In any single year, the stock market might soar 30% or crash 30% - wildly unpredictable. But over 20-year stretches, the market's ups and downs have historically averaged out to solid positive returns. The longer you hold, the more reliable your outcome becomes. This is why patient, long-term investors capture the market's growth while short-term traders often get whipsawed by its random swings, buying and selling at the worst times.",
          "The enemy of long-term investing is the temptation to act short-term. When markets drop, fear says sell; when they soar, greed says pile in. Both instincts lead to buying high and selling low. Even more damaging is trying to 'time the market' - guessing the perfect moments to jump in and out. Study after study shows almost no one does this successfully, and missing just a handful of the market's best days (which often come right after the worst ones) can devastate long-term returns. Time IN the market beats timing the market.",
          "The winning long-term approach is almost dull, and that's the point. Invest regularly through dollar-cost averaging, stay diversified, keep costs low, and hold through the scary times. Set a strategy matched to your goals and then largely leave it alone, resisting the urge to react to every headline. Short-term trading is exciting and usually loses; long-term investing is boring and usually wins. For a teenager with decades ahead, patience isn't just a virtue - it's the single biggest advantage they have over everyone who started later."
        ],
        bullets: [
          "Over long periods, the market's swings average out to solid returns.",
          "The longer you hold, the more reliable your outcome tends to be.",
          "Fear and greed push short-term traders to buy high and sell low.",
          "Timing the market almost never works; missing the best days is costly.",
          "Time IN the market beats timing the market - patience wins."
        ],
        realWorldExample: "Over a single year the market might swing wildly, but an investor who held a broad fund through every 20-year period in history came out ahead. Meanwhile, a trader who sold during a crash and missed just the 10 best rebound days - often days right after the worst - could cut their long-term returns roughly in half."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest8-mc1",
            question: "Where should short-term money (needed in a year) go?",
            options: [
              "An aggressive stock fund for growth as a general rule",
              "Safe, stable places like savings or short-term bonds",
              "A single risky startup stock according to most guides",
              "Whatever had the highest return last year"
            ],
            correctAnswer: 1,
            explanation: "Money needed soon should protect its principal in low-risk places, since a crash right before you spend it would be devastating. Growth assets are for long-term money."
          },
          {
            id: "invest8-mc2",
            question: "What does 'time in the market beats timing the market' mean?",
            options: [
              "Trade as often as possible to win as a general rule",
              "Staying invested beats trying to guess the perfect moments",
              "Only invest at the exact market bottom",
              "Sell whenever the market drops according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Staying invested for the long haul beats trying to time entries and exits, because almost no one guesses correctly and missing the best days devastates returns."
          }
        ]
      },
      {
        type: "scenario",
        title: "Elena's Two Buckets",
        narrative: "Elena, 19, has two financial goals. She needs $8,000 for a used car in about a year, and she's also starting to invest for retirement, which is 45 years away. She wonders whether she should treat both piles of money the same way or split them into different strategies.",
        details: [
          "Her car money is needed in one year, so a crash could ruin the plan.",
          "Her retirement money has 45 years to ride out any downturn.",
          "She keeps the car money safe in a savings account or short-term bonds.",
          "She invests the retirement money in a diversified stock fund for growth."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest8-aq1",
          question: "Why should Elena keep her car money out of the stock fund?",
          options: [
              "Stock funds are illegal for young people as a general rule",
              "A crash could hit right before she needs the cash",
              "Savings accounts always beat stocks long term over the long run",
              "She should never invest in anything according to most guides"
            ],
          correctAnswer: 1,
          explanation: "With only a year until she needs the money, a market drop could force her to sell at a loss. Short-term money belongs in safe places, while her 45-year retirement money can take risk."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Time horizon - when you need the money - drives your strategy.",
          "Short-term money belongs in safe, stable places to protect principal.",
          "Long-term money belongs in growth assets that ride out crashes.",
          "Over long periods, market swings average out to solid returns.",
          "Time in the market beats timing it; patience is the biggest advantage."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invest8-mastery1",
            question: "What is a 'time horizon'?",
            options: [
              "The fee a fund charges yearly as a general rule",
              "When you'll need to use the money",
              "The number of stocks you own",
              "The market's opening hour according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Your time horizon is how long until you need the money. It's the main factor in deciding whether to prioritize safety or growth for a given goal."
          },
          {
            id: "invest8-mastery2",
            question: "Why is a stock fund risky for money you need next year?",
            options: [
              "Stock funds charge no fees according to most guides in the vast majority of situations",
              "A crash could force you to sell at a loss",
              "Stock funds are guaranteed to fall as a general rule",
              "You can never withdraw from them over the long run"
            ],
            correctAnswer: 1,
            explanation: "A market drop right before you need the cash could force selling at a loss. Short-term money should stay safe; only long-term money can weather crashes."
          },
          {
            id: "invest8-mastery3",
            question: "Why is playing it too safe risky for long-term money?",
            options: [
              "Safe accounts charge huge fees as a general rule",
              "Inflation erodes cash that isn't growing enough",
              "Safe money is always taxed double",
              "Banks refuse long-term deposits according to most guides"
            ],
            correctAnswer: 1,
            explanation: "Over decades, inflation quietly erodes cash that grows too slowly. Long-term money generally needs growth assets to stay ahead of rising prices."
          },
          {
            id: "invest8-mastery4",
            question: "What happens to market swings over very long periods?",
            options: [
              "They grow more extreme each year",
              "They average out to solid positive returns",
              "They cancel all your gains according to most guides",
              "They stop the market from moving"
            ],
            correctAnswer: 1,
            explanation: "Single years are unpredictable, but over long stretches like 20 years, the market's ups and downs have historically averaged out to solid positive returns."
          },
          {
            id: "invest8-mastery5",
            question: "Why is trying to time the market so dangerous?",
            options: [
              "It's illegal for individuals according to most guides",
              "Missing a few best days can halve returns",
              "It guarantees you buy at the bottom over the long run",
              "It removes all fees as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Almost no one times the market well, and the best days often follow the worst. Missing just a handful of them can cut long-term returns dramatically."
          },
          {
            id: "invest8-mastery6",
            question: "What is the biggest advantage a teen long-term investor has?",
            options: [
              "Access to secret stock tips as a general rule",
              "Decades of time for patience to pay off",
              "A guarantee against losses according to most guides",
              "Zero fees on every trade over the long run"
            ],
            correctAnswer: 1,
            explanation: "Decades of time let a teen ride out volatility and let compounding work, making patience their single biggest edge over people who start later."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invest-9: Accounts Overview
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-9",
    sections: [
      {
        type: "concept",
        title: "The Container Matters as Much as What's Inside",
        paragraphs: [
          "When you invest, you don't just choose investments - you choose the account that holds them, and that choice can save or cost you a fortune in taxes. Think of the account as a container and the investments as what you put inside. The same stock fund can grow very differently depending on whether it sits in a regular taxable account or a special tax-advantaged retirement account. Understanding the main account types is what separates people who keep most of their gains from those who quietly hand a big chunk to taxes.",
          "The simplest container is a brokerage account, also called a taxable account. You can put in any amount, buy almost anything, and withdraw anytime with no penalties - total flexibility. The trade-off is that you owe taxes on dividends and on gains when you sell (capital gains tax). It's ideal for goals before retirement or for money you might need access to. There are no special tax breaks, but there are also no rules locking your money away, which makes it the go-to for general investing.",
          "Retirement accounts are the tax-advantaged containers, and their perks are huge - but the government limits how much you can add each year (a contribution limit) and generally penalizes withdrawals before about age 59½. The deal is straightforward: you accept locking money up for retirement, and in exchange you get powerful tax savings that supercharge decades of compounding. Because the tax break is so valuable, financial advice almost universally says to use retirement accounts for retirement money before turning to a plain taxable account. The rules that lock the money away are actually a feature, not just a restriction, since they gently discourage you from raiding your future self's savings whenever a tempting purchase comes along today."
        ],
        bullets: [
          "The account (container) you choose affects your taxes as much as the investments.",
          "A brokerage (taxable) account offers full flexibility but taxes gains and dividends.",
          "Retirement accounts give big tax breaks but have contribution limits.",
          "Retirement accounts usually penalize withdrawals before about age 59½.",
          "Use tax-advantaged retirement accounts for retirement money first."
        ],
        realWorldExample: "Two people each invest $6,000 a year for 40 years at 8%. One uses a taxable account and loses a slice to taxes on gains along the way; the other uses a tax-advantaged retirement account. The retirement-account investor can end up with tens of thousands more, purely because the container shielded their growth from yearly taxes."
      },
      {
        type: "concept",
        title: "401(k)s and IRAs: Traditional vs Roth",
        paragraphs: [
          "The two main retirement account families are the 401(k), offered through your employer, and the IRA (Individual Retirement Arrangement), which you open yourself. A 401(k) often comes with an employer match - your company adds money when you do, sometimes matching 50% or 100% of your contributions up to a limit. That match is literally free money and an instant 50-100% return, which is why experts say to always contribute at least enough to grab the full match before anything else. Skipping it is like turning down a raise.",
          "Both 401(k)s and IRAs come in two flavors, and the difference is all about when you pay taxes. A Traditional account uses pre-tax money: you get a tax break now, your money grows untaxed, and you pay ordinary taxes when you withdraw in retirement. A Roth account uses after-tax money: no tax break today, but your money grows and comes out completely tax-free in retirement. For young people especially, Roth is often powerful, because you're likely in a low tax bracket now and lock in decades of tax-free growth.",
          "There are a few other containers worth knowing. A 529 plan is a tax-advantaged account specifically for education expenses, growing tax-free when used for qualifying school costs. An HSA (Health Savings Account) offers triple tax benefits for medical costs and can double as a stealth retirement account. The key skill isn't memorizing every rule - it's knowing that different goals have matching account types, and choosing the right container for each goal so taxes take the smallest possible bite out of your growth over the decades."
        ],
        bullets: [
          "A 401(k) is employer-based; an IRA you open yourself.",
          "A 401(k) match is free money - always contribute enough to get the full match.",
          "Traditional: tax break now, taxed at withdrawal; Roth: taxed now, tax-free later.",
          "Roth is often powerful for young people in low tax brackets today.",
          "529 plans (education) and HSAs (medical) are other tax-advantaged containers."
        ],
        realWorldExample: "Your employer matches 100% of your 401(k) contributions up to 4% of your salary. On a $40,000 salary, contributing $1,600 gets you another $1,600 free - an instant 100% return before the market does anything. Passing that up means leaving $1,600 of guaranteed money on the table every single year."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest9-mc1",
            question: "What is the main trade-off of a brokerage (taxable) account?",
            options: [
              "It has huge tax breaks but locks money away",
              "It offers full flexibility but taxes gains and dividends",
              "It can only hold cash, never investments as a general rule",
              "It doubles your money automatically according to most guides"
            ],
            correctAnswer: 1,
            explanation: "A taxable brokerage account lets you deposit and withdraw freely with no penalties, but you owe taxes on dividends and on gains when you sell."
          },
          {
            id: "invest9-mc2",
            question: "Why should you always contribute enough to get a full 401(k) match?",
            options: [
              "The match is free money, an instant return",
              "The match is required by law for teens",
              "Matches remove all investment risk according to most guides",
              "The match doubles your salary as a general rule"
            ],
            correctAnswer: 0,
            explanation: "An employer match adds free money to your contributions - often a 50-100% instant return. Skipping the full match is like turning down part of your pay."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jamal Picks His Accounts",
        narrative: "Jamal, 23, just started his first full-time job. His employer offers a 401(k) with a 100% match up to 4% of his salary. He also wants to open an IRA and is deciding between a Traditional and a Roth version, knowing he's currently in a low tax bracket.",
        details: [
          "Jamal contributes at least 4% to his 401(k) to capture the full employer match.",
          "The match is an instant 100% return before the market does anything.",
          "He's in a low tax bracket now, so paying taxes today costs him relatively little.",
          "A Roth IRA lets his money grow and be withdrawn completely tax-free later."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest9-aq1",
          question: "Why might a Roth IRA be especially smart for Jamal right now?",
          options: [
              "Roth accounts never allow any growth according to most guides in the vast majority of situations",
              "He's in a low bracket now and locks in tax-free growth",
              "Roth IRAs are only for retirees as a general rule",
              "Roth accounts guarantee a fixed return over the long run"
            ],
          correctAnswer: 1,
          explanation: "Because Jamal is in a low tax bracket now, paying taxes today is cheap, and a Roth lets decades of growth come out tax-free later - a powerful deal for young earners."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The account (container) you choose affects taxes as much as the investments.",
          "Brokerage accounts are flexible but taxable; retirement accounts have tax breaks.",
          "Always contribute enough to get the full 401(k) employer match - it's free money.",
          "Traditional: tax break now, taxed later; Roth: taxed now, tax-free later.",
          "Match the account type to the goal: 529 for education, HSA for medical."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invest9-mastery1",
            question: "What is the difference between a 401(k) and an IRA?",
            options: [
              "A 401(k) is employer-based; an IRA you open yourself",
              "A 401(k) is only for the self-employed as a general rule",
              "An IRA has no tax advantages at all",
              "They are exactly the same account according to most guides"
            ],
            correctAnswer: 0,
            explanation: "A 401(k) is offered through your employer, often with a match, while an IRA is an individual account you open on your own. Both are tax-advantaged."
          },
          {
            id: "invest9-mastery2",
            question: "How do Traditional and Roth accounts differ on taxes?",
            options: [
              "Traditional: taxed now; Roth: taxed later over the long run",
              "Traditional: tax break now, taxed later; Roth: taxed now, tax-free later",
              "Both are taxed twice according to most guides in the vast majority of situations",
              "Neither is ever taxed as a general rule based on common belief"
            ],
            correctAnswer: 1,
            explanation: "Traditional gives a tax break today and taxes withdrawals later; Roth is funded with after-tax money now and grows tax-free, with no tax at withdrawal."
          },
          {
            id: "invest9-mastery3",
            question: "What is a 529 plan designed for?",
            options: [
              "Buying a house",
              "Education expenses",
              "Medical bills only",
              "Everyday spending"
            ],
            correctAnswer: 1,
            explanation: "A 529 plan is a tax-advantaged account for education costs; it grows tax-free when used for qualifying school expenses."
          },
          {
            id: "invest9-mastery4",
            question: "What usually happens if you withdraw from a retirement account before about 59½?",
            options: [
              "You get a bonus according to most guides",
              "You typically owe a penalty",
              "The account is deleted",
              "Nothing happens at all"
            ],
            correctAnswer: 1,
            explanation: "Retirement accounts generally penalize early withdrawals before about age 59½, which is the trade-off for their powerful tax advantages."
          },
          {
            id: "invest9-mastery5",
            question: "Why is a Roth often powerful for young investors?",
            options: [
              "They pay low taxes now and grow tax-free",
              "Roths guarantee a fixed 10% return as a general rule",
              "Roths have no contribution limits according to most guides",
              "Only teens can open a Roth"
            ],
            correctAnswer: 0,
            explanation: "Young people are often in low tax brackets, so paying tax now is cheap, and a Roth locks in decades of tax-free growth withdrawn tax-free later."
          },
          {
            id: "invest9-mastery6",
            question: "What is the smartest first priority when investing for retirement?",
            options: [
              "Open five brokerage accounts according to most guides",
              "Contribute enough to get the full employer match",
              "Buy a single hot stock over the long run",
              "Keep everything in cash as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Capturing the full 401(k) match first is the top priority - it's free money and an instant return no other investment reliably beats."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invest-10: First Portfolio
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-10",
    sections: [
      {
        type: "concept",
        title: "From Knowledge to a Real Plan",
        paragraphs: [
          "Building your first portfolio means turning everything you've learned into an actual plan you can follow. A portfolio is simply all your investments working together. The process has clear steps: define your goal and time horizon, choose an asset allocation that fits your risk tolerance, pick low-cost diversified investments, open the right account, and automate your contributions. It sounds like a lot, but for a beginner it can be genuinely simple - the biggest mistake is overcomplicating it or being so afraid of getting it perfect that you never start at all.",
          "Start by getting clear on what you're investing for and when you'll need it. Retirement in 40 years, a house in 15, or general wealth-building all call for different mixes. Your time horizon and how you handle risk together point to an asset allocation - your split between stocks, bonds, and cash. A young investor with a long horizon might land near 80-90% stocks and 10-20% bonds, accepting bigger swings for higher long-term growth. There's no single perfect number; there's the mix that fits your goal and that you can hold through a scary market.",
          "Then keep the investments themselves simple. You don't need to pick individual stocks or chase hot tips. A handful of broad, low-cost index funds - or even a single target-date fund that auto-adjusts as you age - can give you instant, global diversification for tiny fees. Put those funds in the right account (a tax-advantaged retirement account for retirement money, capturing any employer match first). The winning first portfolio is boring on purpose: diversified, cheap, automated, and matched to your goal. The excitement of picking a hot stock or timing a clever trade almost always fades into disappointment, while the dull, steady plan quietly compounds in the background and outperforms the flashy approach for the overwhelming majority of ordinary investors."
        ],
        bullets: [
          "A portfolio is all your investments working together toward your goals.",
          "Steps: define goal and horizon, pick allocation, choose funds, open account, automate.",
          "Your time horizon and risk tolerance point to your stock/bond/cash mix.",
          "A few broad index funds or one target-date fund give instant diversification.",
          "Overcomplicating or never starting is the biggest beginner mistake."
        ],
        realWorldExample: "A 20-year-old investing for retirement picks 90% stocks and 10% bonds using two index funds, opens a Roth IRA, and automates $100 a month. That's a complete, professional-quality first portfolio built in an afternoon - diversified, low-cost, and matched to a decades-long horizon."
      },
      {
        type: "concept",
        title: "Automate, Ignore the Noise, and Rebalance",
        paragraphs: [
          "The single habit that makes a portfolio actually grow is automatic, consistent contributions. Set up a recurring transfer - say $50 or $100 a month - so you invest before you can spend the money, a strategy called 'pay yourself first.' This uses dollar-cost averaging, buying more shares when prices are low and fewer when high, and it removes emotion and willpower from the equation. Small automated amounts, compounded over decades, quietly turn into serious wealth, and you never have to remember to do it.",
          "Once your portfolio is running, the hardest skill is doing almost nothing. Markets will crash, headlines will scream, and friends will brag about hot stocks - and your job is to stick to your plan and keep contributing anyway. Panic-selling during a dip and chasing whatever's hot are the two classic wealth-destroyers. A long-term investor treats downturns as sales, not disasters, and understands that the boring strategy of holding steady through the noise beats frantic trading almost every time. Checking your balance daily only tempts you to make mistakes.",
          "About once a year, do a quick check-up and rebalance. Over time your winners grow into a bigger slice of the pie, drifting your allocation away from your target - stocks might swell from 90% to 94%. Rebalancing means nudging it back by adding to what lagged or trimming what grew, which quietly forces you to sell high and buy low. That yearly tune-up, plus steady contributions and patience, is essentially the entire job. Your first portfolio doesn't need to be perfect - it needs to be started, diversified, and left alone to compound."
        ],
        bullets: [
          "Automate contributions ('pay yourself first') to remove emotion and willpower.",
          "Dollar-cost averaging buys more shares when prices are low.",
          "Stick to the plan through crashes; panic-selling and chasing hot stocks destroy wealth.",
          "Rebalance about once a year to restore your target mix.",
          "A started, diversified, left-alone portfolio beats a perfect one you never build."
        ],
        realWorldExample: "A teen automates $75 a month into a diversified portfolio and simply ignores the news. Over a 30-year career that habit - about $27,000 of contributions - can grow to well over $100,000 at 8%, with a yearly five-minute rebalance being nearly the only active work required the entire time."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest10-mc1",
            question: "What is the first step in building a portfolio?",
            options: [
              "Pick the hottest stock of the week",
              "Define your goal and time horizon",
              "Borrow money to invest more according to most guides",
              "Check your balance every hour"
            ],
            correctAnswer: 1,
            explanation: "Start by clarifying what you're investing for and when you'll need it. Your goal and time horizon drive every later decision, from allocation to account type."
          },
          {
            id: "invest10-mc2",
            question: "Why is automating your contributions so effective?",
            options: [
              "It guarantees you never lose money as a general rule",
              "It removes emotion and builds a steady habit",
              "It doubles your monthly deposit according to most guides",
              "It lets you time the market perfectly"
            ],
            correctAnswer: 1,
            explanation: "Automating investing ('pay yourself first') removes willpower and emotion, using dollar-cost averaging to invest steadily through every market up and down."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Builds and Automates",
        narrative: "Priya, 21, is investing for retirement decades away and wants a simple plan she can mostly ignore. She has a long time horizon and can handle market swings. She sets up her first portfolio and a system to keep it running without constant attention.",
        details: [
          "With her long horizon, Priya chooses about 90% stocks and 10% bonds.",
          "She uses two broad, low-cost index funds instead of picking individual stocks.",
          "She automates $100 a month into a Roth IRA (pay yourself first).",
          "Once a year she rebalances to her target mix and otherwise leaves it alone."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest10-aq1",
          question: "What makes Priya's simple plan likely to succeed over decades?",
          options: [
              "She checks and trades her account daily",
              "It's diversified, low-cost, automated, and left alone",
              "She bets everything on one hot stock",
              "She stops investing whenever markets drop according to most guides"
            ],
          correctAnswer: 1,
          explanation: "A diversified, low-cost, automated portfolio she leaves alone lets compounding work and avoids emotional mistakes. Daily trading and chasing hot stocks would undermine it."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A portfolio turns your knowledge into a real, followable plan.",
          "Steps: define goal, pick allocation, choose funds, open account, automate.",
          "Keep it simple with a few index funds or one target-date fund.",
          "Automate contributions and stick to the plan through market noise.",
          "Rebalance yearly, then leave the portfolio alone to compound."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invest10-mastery1",
            question: "What is the biggest mistake a beginner makes with a first portfolio?",
            options: [
              "Using low-cost index funds",
              "Overcomplicating it or never starting",
              "Automating contributions according to most guides",
              "Diversifying broadly as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Beginners often overcomplicate things or freeze up trying to be perfect, so they never start. A simple, diversified portfolio you actually begin beats a perfect one you don't."
          },
          {
            id: "invest10-mastery2",
            question: "What points you toward the right asset allocation?",
            options: [
              "Your time horizon and risk tolerance",
              "The most famous stock this year",
              "Your favorite app's color according to most guides",
              "The number of friends investing"
            ],
            correctAnswer: 0,
            explanation: "Your time horizon and how much risk you can handle together determine your stock/bond/cash split - the core decision of building a portfolio."
          },
          {
            id: "invest10-mastery3",
            question: "How can a beginner get instant diversification easily?",
            options: [
              "Buy one hot individual stock as a general rule",
              "Use broad index funds or a target-date fund",
              "Keep everything in cash according to most guides",
              "Pick fifty stocks by hand over the long run"
            ],
            correctAnswer: 1,
            explanation: "A few broad index funds or a single target-date fund provide instant, global diversification for tiny fees - far simpler than hand-picking individual stocks."
          },
          {
            id: "invest10-mastery4",
            question: "What does 'pay yourself first' mean for a portfolio?",
            options: [
              "Spend on wants before investing",
              "Automate investing before you can spend it",
              "Only invest leftover money according to most guides",
              "Withdraw profits every week as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Paying yourself first automates your investment before spending, so saving isn't left to willpower. It builds a habit and uses dollar-cost averaging."
          },
          {
            id: "invest10-mastery5",
            question: "Why rebalance your portfolio about once a year?",
            options: [
              "To guarantee zero losses according to most guides in the vast majority of situations",
              "To restore your target mix, selling high and buying low",
              "To pay lower fees each month over the long run",
              "To double your contributions as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Winners grow into a bigger slice over time, drifting your allocation. A yearly rebalance nudges it back to target and naturally sells high while buying low."
          },
          {
            id: "invest10-mastery6",
            question: "What should you do during a scary market crash?",
            options: [
              "Sell everything immediately according to most guides",
              "Stick to the plan and keep contributing",
              "Chase whatever stock is hot as a general rule",
              "Check your balance every hour"
            ],
            correctAnswer: 1,
            explanation: "Sticking to your plan and continuing to invest through downturns lets you buy at lower prices and avoids the panic-selling that destroys long-term wealth."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invest-11: Why Markets Need Regulators: SEC & the Fed
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-11",
    sections: [
      {
        type: "concept",
        title: "The Referees That Keep Markets Fair",
        paragraphs: [
          "Financial markets only work if people trust them, and that trust depends on regulators acting like referees. The main one for investing is the SEC - the Securities and Exchange Commission. Created after the 1929 crash and Great Depression, the SEC's job is to protect investors, keep markets fair and orderly, and require companies to tell the truth. Public companies must file honest, detailed financial reports so investors can make informed decisions instead of being fooled. Without a referee forcing disclosure, companies could hide losses and lie, and no one would dare invest.",
          "One of the SEC's biggest jobs is stopping fraud, especially insider trading - buying or selling a stock based on secret, non-public information. If a company executive knew bad news was coming and dumped their shares before the public found out, that's illegal, because it cheats ordinary investors who don't have that inside knowledge. The SEC also pursues Ponzi schemes and scams that promise impossible returns. These rules exist so that regular people can invest on a reasonably level playing field, rather than always being the last to know and the first to lose.",
          "Other watchdogs share the work. FINRA (the Financial Industry Regulatory Authority) oversees brokers and brokerage firms, making sure they treat customers fairly. The FDIC insures bank deposits up to $250,000, so if your bank fails your savings are protected - though this covers bank accounts, not investments. And the SIPC protects brokerage customers if their brokerage firm fails. Together these bodies form a safety net that makes it reasonable to trust the financial system with your money, which is the whole foundation investing rests on. Without that trust, people would hoard cash and refuse to invest, and the entire engine that funds new companies and jobs would grind to a halt for everyone."
        ],
        bullets: [
          "The SEC protects investors and forces public companies to disclose the truth.",
          "It was created after the 1929 crash to restore trust in markets.",
          "Insider trading - trading on secret information - is illegal and the SEC pursues it.",
          "FINRA oversees brokers; the FDIC insures bank deposits up to $250,000.",
          "SIPC protects brokerage customers if their brokerage firm fails."
        ],
        realWorldExample: "A company executive learns their firm will report terrible earnings tomorrow and secretly sells all their shares first to avoid the loss. That's insider trading, and the SEC can prosecute them. The rule protects ordinary investors who don't have that secret information from being cheated by insiders."
      },
      {
        type: "concept",
        title: "The Federal Reserve: The Economy's Thermostat",
        paragraphs: [
          "While the SEC referees markets, the Federal Reserve - the 'Fed' - is the central bank that manages the whole U.S. economy. Its main tool is setting interest rates, which ripple through everything. When the economy is weak, the Fed lowers rates to make borrowing cheaper, encouraging spending and investing to heat things up. When inflation runs too hot, the Fed raises rates to cool borrowing and slow price increases. Think of the Fed as a thermostat, constantly nudging rates to keep the economy from overheating or freezing.",
          "The Fed has two official goals, called its dual mandate: maximum employment and stable prices (controlling inflation). These can pull in opposite directions, which makes the Fed's job a delicate balancing act. Raising rates to fight inflation can slow the economy and cost jobs; lowering rates to boost jobs can fuel inflation. Every Fed decision is a judgment call weighing these trade-offs, and markets hang on its every word because interest rates affect stock prices, bond prices, mortgages, and the cost of nearly all borrowing.",
          "For you as an investor, the Fed matters even if you never trade a bond. When the Fed raises rates, borrowing gets pricier, company profits can shrink, and stock prices often dip - while savings accounts and new bonds start paying more. When it cuts rates, the reverse tends to happen. You don't need to predict the Fed's moves; trying to trade on them usually fails. But understanding that these regulators - the SEC keeping markets honest and the Fed steadying the economy - work behind the scenes is exactly why it's reasonable to invest for the long term with confidence."
        ],
        bullets: [
          "The Federal Reserve (the Fed) is the central bank managing the economy.",
          "Its main tool is interest rates: lower to stimulate, raise to cool inflation.",
          "Its dual mandate is maximum employment and stable prices.",
          "Rate changes ripple into stocks, bonds, mortgages, and savings.",
          "You needn't predict the Fed, but its role helps keep the economy steady."
        ],
        realWorldExample: "When inflation spiked, the Fed raised interest rates sharply. Suddenly mortgages and car loans got much more expensive, cooling spending, while savings accounts finally paid more than they had in years. That single lever - the Fed's interest rate - reshaped borrowing and saving costs across the entire country."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest11-mc1",
            question: "What is the main job of the SEC?",
            options: [
              "Setting the country's interest rates according to most guides",
              "Protecting investors and forcing honest company disclosure",
              "Insuring bank deposits up to $250,000",
              "Printing new money for the economy"
            ],
            correctAnswer: 1,
            explanation: "The SEC protects investors, keeps markets fair, and requires public companies to disclose truthful financial information. Interest rates and money-printing are the Fed's domain."
          },
          {
            id: "invest11-mc2",
            question: "What is the Federal Reserve's main tool for managing the economy?",
            options: [
              "Setting interest rates",
              "Prosecuting insider trading",
              "Insuring brokerage accounts",
              "Auditing individual tax returns"
            ],
            correctAnswer: 0,
            explanation: "The Fed's primary tool is setting interest rates - lowering them to stimulate a weak economy and raising them to cool inflation, like an economic thermostat."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Watchdogs at Work",
        narrative: "Kevin is learning how the financial system stays trustworthy. He reads two news stories on the same day: one about a CEO charged with insider trading, and another about the central bank raising interest rates to fight rising inflation. He wants to know which regulator handled each situation.",
        details: [
          "The CEO sold shares using secret bad news before the public knew - insider trading.",
          "The SEC is the regulator that investigates and prosecutes insider trading.",
          "The central bank raised interest rates to cool borrowing and slow inflation.",
          "That rate decision came from the Federal Reserve, not the SEC."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest11-aq1",
          question: "Which regulator handles the insider-trading case, and which raises interest rates?",
          options: [
              "The Fed handles both situations according to most guides",
              "The SEC handles insider trading; the Fed raises rates",
              "The FDIC handles both situations as a general rule",
              "The SEC raises rates; the Fed prosecutes fraud over the long run"
            ],
          correctAnswer: 1,
          explanation: "The SEC polices fraud like insider trading to keep markets fair, while the Federal Reserve sets interest rates to manage the economy. They have distinct roles."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The SEC protects investors and forces companies to disclose the truth.",
          "Insider trading is illegal, and the SEC prosecutes it to keep markets fair.",
          "FINRA oversees brokers; FDIC insures deposits; SIPC protects brokerage customers.",
          "The Federal Reserve manages the economy mainly through interest rates.",
          "The Fed's dual mandate is maximum employment and stable prices."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invest11-mastery1",
            question: "Why was the SEC created?",
            options: [
              "To print money for the government",
              "To restore trust after the 1929 crash",
              "To set mortgage interest rates according to most guides",
              "To run the nation's banks as a general rule"
            ],
            correctAnswer: 1,
            explanation: "The SEC was created after the 1929 crash and Great Depression to protect investors and rebuild trust by requiring honest disclosure and fair markets."
          },
          {
            id: "invest11-mastery2",
            question: "What is insider trading?",
            options: [
              "Buying stock inside a bank branch",
              "Trading on secret, non-public information",
              "Any trade made by a company employee",
              "Investing only in your own employer"
            ],
            correctAnswer: 1,
            explanation: "Insider trading is buying or selling based on secret, non-public information. It's illegal because it cheats ordinary investors who lack that inside knowledge."
          },
          {
            id: "invest11-mastery3",
            question: "What does the FDIC do?",
            options: [
              "Sets the stock market's prices",
              "Insures bank deposits up to $250,000",
              "Prosecutes insider trading according to most guides",
              "Manages the Federal Reserve as a general rule"
            ],
            correctAnswer: 1,
            explanation: "The FDIC insures bank deposits up to $250,000, protecting your savings if a bank fails. Note it covers bank accounts, not investments."
          },
          {
            id: "invest11-mastery4",
            question: "What is the Federal Reserve's 'dual mandate'?",
            options: [
              "Maximum employment and stable prices",
              "Low taxes and high spending",
              "Insider trading and fraud control",
              "Printing money and issuing bonds"
            ],
            correctAnswer: 0,
            explanation: "The Fed's dual mandate is to pursue maximum employment and stable prices (controlling inflation). These goals can conflict, making its job a balancing act."
          },
          {
            id: "invest11-mastery5",
            question: "What typically happens when the Fed raises interest rates?",
            options: [
              "Borrowing gets pricier and stocks often dip",
              "Borrowing becomes free for everyone as a general rule",
              "Savings accounts pay less interest",
              "Inflation immediately doubles according to most guides"
            ],
            correctAnswer: 0,
            explanation: "Higher rates make borrowing more expensive, can shrink company profits, and often pressure stock prices - while new savings and bonds tend to pay more."
          },
          {
            id: "invest11-mastery6",
            question: "Who oversees brokers and brokerage firms?",
            options: [
              "The Federal Reserve",
              "FINRA",
              "The IRS",
              "The Post Office"
            ],
            correctAnswer: 1,
            explanation: "FINRA (the Financial Industry Regulatory Authority) oversees brokers and brokerage firms to ensure they treat customers fairly, complementing the SEC's role."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // invest-12: Retirement & Education Accounts Deep Dive
  // ─────────────────────────────────────────────
  {
    lessonId: "invest-12",
    sections: [
      {
        type: "concept",
        title: "Retirement Accounts: Employer Plans and IRAs",
        paragraphs: [
          "Tax-advantaged accounts are containers the government created to encourage saving for big life goals, and they come in a whole family worth knowing. On the retirement side, employer plans lead the way. A 401(k) is offered by for-profit companies, while a 403(b) is the nearly identical version for nonprofits and public schools - teachers and hospital staff often use one. Both let you invest money straight from your paycheck, often with an employer match. That match is free money and should always be captured first, because it's an instant return no investment can reliably beat.",
          "Alongside employer plans are IRAs - Individual Retirement Arrangements - which you open yourself at a brokerage. IRAs come in Traditional and Roth versions. A Traditional IRA or 401(k) uses pre-tax money: you get a tax deduction now, grow untaxed, and pay ordinary taxes when you withdraw in retirement. A Roth IRA or Roth 401(k) uses after-tax money: no break today, but all growth and withdrawals come out tax-free later. For young people in low tax brackets, Roth is often the smarter bet, locking in decades of tax-free growth while taxes are cheap.",
          "One older type is the pension, or defined-benefit plan, where an employer promises a guaranteed monthly payment in retirement based on your salary and years worked. Pensions were once common but have largely been replaced by 401(k)-style plans, which shift the investing responsibility (and risk) onto you. This shift is exactly why understanding these accounts matters so much today: unlike your grandparents, most workers now must actively build their own retirement, choosing accounts and investments themselves rather than relying on a company's guaranteed pension. The upside is real control and often more total money; the catch is that the responsibility, and the consequences of ignoring it, now fall squarely on you."
        ],
        bullets: [
          "A 401(k) is for for-profit employers; a 403(b) is the nonprofit/school version.",
          "Employer matches are free money and should be captured first.",
          "IRAs are individual accounts in Traditional (tax later) or Roth (tax-free later) forms.",
          "Roth often wins for young people in low tax brackets today.",
          "Pensions guarantee income but have largely been replaced by 401(k)-style plans."
        ],
        realWorldExample: "A teacher uses a 403(b) at her school, while her sister at a tech company uses a 401(k) - nearly identical accounts with different names. Both get employer matches. Their grandfather, by contrast, retired on a pension that paid a guaranteed monthly check for life, a benefit few workers receive anymore."
      },
      {
        type: "concept",
        title: "Education Accounts and Choosing the Right One",
        paragraphs: [
          "Retirement isn't the only goal with special accounts - education has its own. The 529 plan is the biggest one: you contribute after-tax money, it grows completely tax-free, and withdrawals are tax-free when used for qualifying education expenses like tuition, fees, and books. Many states even offer a tax break for contributing. A 529 can now also cover some K-12 tuition and be partly rolled into a Roth IRA under certain rules, making it flexible. For families saving for college, it's usually the first stop because that tax-free growth over 18 years is powerful.",
          "A smaller option is the Coverdell ESA (Education Savings Account). Like a 529, it grows tax-free for education, and it historically offered more investment flexibility and could cover K-12 costs. But it has tight limits - a low annual contribution cap (around $2,000) and income restrictions on who can use it - which is why the higher-capacity 529 has become far more popular. Knowing both exist matters, but for most families the 529 does the heavy lifting for education savings.",
          "The real skill is matching the account to the goal so taxes take the smallest bite. Retirement money goes in a 401(k)/403(b) or IRA, grabbing any match and choosing Traditional or Roth based on your tax situation. Education money goes in a 529 or Coverdell. Medical costs can use an HSA. Each container has rules - contribution limits, withdrawal penalties, qualifying expenses - and using the wrong one for a goal can cost you tax breaks or trigger penalties. You don't need to memorize every detail; you need to know that the right container exists for each major goal and to use it."
        ],
        bullets: [
          "A 529 plan grows tax-free for qualifying education expenses, with possible state breaks.",
          "529s can cover college, some K-12 tuition, and partly roll into a Roth IRA.",
          "A Coverdell ESA also grows tax-free but has a low (~$2,000) contribution cap.",
          "Match the account to the goal: retirement, education, or medical (HSA).",
          "Using the wrong account for a goal can cost tax breaks or trigger penalties."
        ],
        realWorldExample: "Parents open a 529 when their child is born and invest $150 a month. Growing tax-free at 7% for 18 years, it reaches roughly $65,000 - all usable for college with no tax on the gains. Had they used a regular taxable account, taxes on that growth would have shrunk the final total noticeably."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "invest12-mc1",
            question: "What is the difference between a 401(k) and a 403(b)?",
            options: [
              "A 401(k) is for for-profit firms; a 403(b) is for nonprofits/schools",
              "A 403(b) is only for retirees as a general rule",
              "A 401(k) has no tax advantages over the long run",
              "They are completely unrelated accounts according to most guides in the vast majority of situations"
            ],
            correctAnswer: 0,
            explanation: "A 401(k) is offered by for-profit employers, while a 403(b) is the nearly identical version for nonprofits and public schools. Both are tax-advantaged retirement plans."
          },
          {
            id: "invest12-mc2",
            question: "What is a 529 plan used for?",
            options: [
              "Guaranteed monthly retirement income",
              "Tax-free growth for qualifying education expenses",
              "Everyday spending money according to most guides",
              "Insuring bank deposits as a general rule"
            ],
            correctAnswer: 1,
            explanation: "A 529 plan grows tax-free and its withdrawals are tax-free when used for qualifying education costs like tuition, fees, and books, often with a state tax break too."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Nguyen Family's Accounts",
        narrative: "The Nguyen family is organizing their savings goals. Mr. Nguyen works at a for-profit company, Mrs. Nguyen teaches at a public school, and they're also saving for their daughter's college in 15 years. They want to use the right account for each goal to minimize taxes.",
        details: [
          "Mr. Nguyen invests for retirement through his company's 401(k), capturing the match.",
          "Mrs. Nguyen uses her school's 403(b), the nonprofit equivalent of a 401(k).",
          "For college savings, they open a 529 plan that grows tax-free for education.",
          "They choose Roth versions where it makes sense, given their tax situation."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "invest12-aq1",
          question: "Why is a 529 plan the best fit for the family's college savings goal?",
          options: [
              "It guarantees admission to college according to most guides",
              "It grows tax-free for qualifying education expenses",
              "It pays a guaranteed monthly pension",
              "It insures their bank deposits as a general rule"
            ],
          correctAnswer: 1,
          explanation: "A 529 is built for education: contributions grow tax-free and withdrawals are tax-free for qualifying school costs, making it the ideal container for college savings."
        }
      },
      {
        type: "recap",
        takeaways: [
          "401(k) (for-profit) and 403(b) (nonprofit/school) are employer retirement plans.",
          "Always capture the employer match first - it's free money.",
          "Traditional means tax later; Roth means tax-free later, often best for the young.",
          "Pensions guarantee income but are now rare, shifting responsibility to you.",
          "Match the account to the goal: 529/Coverdell for education, HSA for medical."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "invest12-mastery1",
            question: "Who typically uses a 403(b) instead of a 401(k)?",
            options: [
              "Employees at nonprofits and public schools",
              "Only self-employed freelancers according to most guides",
              "Retirees collecting a pension",
              "Bank tellers exclusively as a general rule"
            ],
            correctAnswer: 0,
            explanation: "A 403(b) is the nonprofit and public-school version of a 401(k). Teachers and hospital staff commonly use one; both are tax-advantaged retirement plans."
          },
          {
            id: "invest12-mastery2",
            question: "How does a pension (defined-benefit plan) work?",
            options: [
              "You pick your own stocks each year",
              "The employer promises a guaranteed monthly payment",
              "It grows tax-free only for education",
              "It insures your bank deposits according to most guides"
            ],
            correctAnswer: 1,
            explanation: "A pension guarantees a set monthly payment in retirement based on salary and years worked. It's largely been replaced by 401(k)-style plans that shift risk to you."
          },
          {
            id: "invest12-mastery3",
            question: "What is the main limit of a Coverdell ESA versus a 529?",
            options: [
              "It cannot be used for education according to most guides",
              "It has a low (~$2,000) yearly contribution cap",
              "It is taxed at withdrawal always as a general rule",
              "It only works after age 59½"
            ],
            correctAnswer: 1,
            explanation: "The Coverdell ESA grows tax-free for education but has a low annual cap (around $2,000) and income limits, which is why the higher-capacity 529 is more popular."
          },
          {
            id: "invest12-mastery4",
            question: "Why is a Roth account often best for a young worker?",
            options: [
              "It guarantees a fixed 10% return",
              "Low taxes now plus decades of tax-free growth",
              "It has no contribution limits according to most guides",
              "Only teens can open one as a general rule"
            ],
            correctAnswer: 1,
            explanation: "Young workers are often in low tax brackets, so paying tax now is cheap, and a Roth locks in decades of growth that comes out completely tax-free later."
          },
          {
            id: "invest12-mastery5",
            question: "What tax advantage does a 529 plan offer?",
            options: [
              "Tax-free growth for education expenses",
              "A guaranteed government bonus according to most guides",
              "Deductions on all your spending",
              "Immunity from all future taxes"
            ],
            correctAnswer: 0,
            explanation: "A 529 grows tax-free and its withdrawals are tax-free for qualifying education costs, often with an added state tax break for contributing."
          },
          {
            id: "invest12-mastery6",
            question: "What is the key skill in using tax-advantaged accounts?",
            options: [
              "Memorizing every single rule according to most guides",
              "Matching the right account to each goal",
              "Opening as many accounts as possible",
              "Avoiding all of them entirely as a general rule"
            ],
            correctAnswer: 1,
            explanation: "The real skill is choosing the right container for each goal - retirement, education, or medical - so taxes take the smallest possible bite out of your growth."
          }
        ]
      }
    ]
  },
]
