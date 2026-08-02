// Teaching-aligned top-up questions extending 8-question pools to 10.
import { QuizQuestion } from "@/types"

export const topUp8Portfolio: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "portfolio-1",
    questions: [
      {
        id: "portfolio-1-tu1",
        question: "Which asset class is generally considered the SAFEST but grows the slowest?",
        options: [
          "Stocks",
          "Cash equivalents",
          "Cryptocurrency",
          "A single tech company"
        ],
        correctAnswer: 1,
        explanation: "Among the classic asset classes, cash equivalents are the steadiest but offer the least growth, which is why longer horizons lean more toward stocks."
      },
      {
        id: "portfolio-1-tu2",
        question: "Two teens both invest for retirement decades away, but one panics in downturns. How might their allocations reasonably differ?",
        options: [
          "The calmer teen can hold a larger stock portion",
          "Both must hold exactly the same mix by law",
          "The panicky teen should hold only crypto",
          "Time horizon is the only thing that ever matters"
        ],
        correctAnswer: 0,
        explanation: "Allocation depends on both time horizon and comfort with risk, so the teen who stays calm through swings can reasonably carry more stocks."
      }
    ]
  },
  {
    lessonId: "portfolio-2",
    questions: [
      {
        id: "portfolio-2-tu1",
        question: "A well-paid saver with no debt and a big emergency fund insists on holding only cash. What is likely LIMITING them?",
        options: [
          "Their risk capacity is too low to invest",
          "Their emotional risk tolerance, not their finances",
          "A legal cap on how much they can invest",
          "A brokerage rule against stock ownership"
        ],
        correctAnswer: 1,
        explanation: "Their finances could easily absorb losses, so it is their emotional tolerance for volatility, not their capacity, that is holding them back."
      },
      {
        id: "portfolio-2-tu2",
        question: "Why can a longer time horizon RAISE the amount of risk an investor can reasonably take?",
        options: [
          "Longer horizons make crashes impossible",
          "Brokers reward patience with guaranteed gains",
          "More years give a portfolio time to recover from downturns",
          "Stocks are cheaper for long-term holders"
        ],
        correctAnswer: 2,
        explanation: "Because markets have historically bounced back given enough years, a long horizon gives losses time to recover, supporting a more aggressive mix."
      }
    ]
  },
  {
    lessonId: "portfolio-3",
    questions: [
      {
        id: "portfolio-3-tu1",
        question: "Adding international stocks to an all-US portfolio is an example of diversifying across what?",
        options: [
          "Different geographies or world regions",
          "Different app themes",
          "Different account passwords",
          "Different brokerage brands"
        ],
        correctAnswer: 0,
        explanation: "Spreading holdings across countries and regions is geographic diversification, one of the ways real diversification goes beyond simply owning many stocks."
      },
      {
        id: "portfolio-3-tu2",
        question: "Why does buying one broad index fund count as instant diversification?",
        options: [
          "The fund is insured against every loss",
          "It guarantees a profit each year",
          "It secretly avoids market crashes",
          "A single fund can hold hundreds or thousands of companies"
        ],
        correctAnswer: 3,
        explanation: "One broad index fund spreads a single purchase across hundreds or thousands of companies, giving beginners diversification in one step."
      }
    ]
  },
  {
    lessonId: "portfolio-4",
    questions: [
      {
        id: "portfolio-4-tu1",
        question: "With dollar-cost averaging, what happens automatically when prices RISE?",
        options: [
          "Your fixed amount buys fewer shares",
          "Your broker doubles your contribution",
          "Your fixed amount buys more shares",
          "Your investing stops until prices fall"
        ],
        correctAnswer: 0,
        explanation: "The same fixed dollar amount buys fewer shares when prices are high and more when they are low, which is what makes the average cost favorable over time."
      },
      {
        id: "portfolio-4-tu2",
        question: "A fund costs $20 in March and $10 in April. Investing $100 each month, how many total shares do you own?",
        options: [
          "Ten shares in total",
          "Fifteen shares in total",
          "Twenty shares in total",
          "Twenty-five shares in total"
        ],
        correctAnswer: 1,
        explanation: "March buys $100 divided by $20, or 5 shares, and April buys $100 divided by $10, or 10 shares, for 15 total - the cheaper month bought more."
      }
    ]
  },
  {
    lessonId: "portfolio-5",
    questions: [
      {
        id: "portfolio-5-tu1",
        question: "A weak bond year leaves your 60% stock / 40% bond target sitting at 70% stocks. What does rebalancing involve?",
        options: [
          "Buying more stocks while they lead",
          "Selling some stocks and buying bonds",
          "Moving everything into cash",
          "Closing and reopening the account"
        ],
        correctAnswer: 1,
        explanation: "Rebalancing restores the 60/40 target by trimming the overgrown stock slice and adding to bonds, resetting your intended risk level."
      },
      {
        id: "portfolio-5-tu2",
        question: "Beyond selling winners, how can a teen with steady monthly deposits rebalance without triggering trades?",
        options: [
          "Withdraw all the money and redeposit it",
          "Buy more of whatever grew fastest",
          "Direct new contributions into the underweight asset",
          "Wait for the fund manager to fix it"
        ],
        correctAnswer: 2,
        explanation: "Steering fresh deposits toward whichever asset is below target nudges the mix back to plan without selling anything, avoiding trading costs and taxes."
      }
    ]
  },
  {
    lessonId: "portfolio-6",
    questions: [
      {
        id: "portfolio-6-tu1",
        question: "The S&P 500 drops 8% this year. What should an S&P 500 index fund roughly do?",
        options: [
          "Fall about 8%, minus a tiny fee effect",
          "Rise 8%, moving opposite the index",
          "Stay perfectly flat regardless",
          "Fall exactly 20%, tripling the loss"
        ],
        correctAnswer: 0,
        explanation: "Index funds mirror their benchmark in both directions, so an 8% index drop means the fund falls roughly 8% too - matching crashes as well as gains."
      },
      {
        id: "portfolio-6-tu2",
        question: "Why can an index fund charge fees near zero?",
        options: [
          "The government subsidizes their costs",
          "They hold only a handful of stocks",
          "Copying a list needs no costly stock-picking team",
          "They trade only on weekends"
        ],
        correctAnswer: 2,
        explanation: "Tracking a fixed list is cheap because there is no team of analysts hunting for winners, which is why index fund fees can be nearly zero."
      }
    ]
  },
  {
    lessonId: "portfolio-7",
    questions: [
      {
        id: "portfolio-7-tu1",
        question: "An index fund charges 0.10% and a competing active fund charges 1.10%. By how much must the active fund outperform just to TIE?",
        options: [
          "About 0.10% per year",
          "About 1.0% per year",
          "About 1.10% per year",
          "It never needs to outperform"
        ],
        correctAnswer: 1,
        explanation: "The active fund starts each year about 1% behind on fees, so it must beat the index by roughly that gap simply to match the cheaper fund."
      },
      {
        id: "portfolio-7-tu2",
        question: "Which statement best describes passive investing?",
        options: [
          "Trading options based on daily headlines",
          "Accepting the market's return by tracking an index cheaply",
          "Selling whenever the market feels scary",
          "Picking a few stocks to beat the market"
        ],
        correctAnswer: 1,
        explanation: "Passive investing aims to capture the market's return by tracking an index while keeping trading and fees to a minimum, unlike active stock-picking."
      }
    ]
  },
  {
    lessonId: "portfolio-8",
    questions: [
      {
        id: "portfolio-8-tu1",
        question: "You invested $400 and it is now worth $500. What is your return?",
        options: [
          "Twenty percent gain",
          "Ten percent gain",
          "Twenty-five percent gain",
          "One hundred percent gain"
        ],
        correctAnswer: 2,
        explanation: "The $100 gain divided by the $400 invested equals 0.25, a 25% return - always divide the gain by your starting amount."
      },
      {
        id: "portfolio-8-tu2",
        question: "Your portfolio gained 14% while its benchmark gained 10%. What does the comparison show?",
        options: [
          "You underperformed the market this period",
          "You beat the benchmark by four points",
          "The benchmark figure must be wrong",
          "Returns cannot be compared this way"
        ],
        correctAnswer: 1,
        explanation: "A benchmark gives context: gaining 14% against a 10% benchmark means your choices beat the market by 4 points this period."
      }
    ]
  },
  {
    lessonId: "portfolio-9",
    questions: [
      {
        id: "portfolio-9-tu1",
        question: "A holding falls 50% and then rises 50% from that low. Where does it end up versus the start?",
        options: [
          "Right back where it started",
          "Above where it started",
          "Still below where it started",
          "It cannot be determined"
        ],
        correctAnswer: 2,
        explanation: "A 50% drop needs a 100% gain to break even, so a mere 50% rebound leaves you still below the start - proof that avoiding big losses matters."
      },
      {
        id: "portfolio-9-tu2",
        question: "How does keeping any single holding to a small share of your portfolio help manage risk?",
        options: [
          "It guarantees that holding will rise",
          "It removes the need to diversify at all",
          "It lets you skip having an emergency fund",
          "Even a total wipeout of that bet stays survivable"
        ],
        correctAnswer: 3,
        explanation: "Position sizing caps how much one bad bet can hurt you, so even if a single holding goes to zero, the overall portfolio survives."
      }
    ]
  },
  {
    lessonId: "portfolio-10",
    questions: [
      {
        id: "portfolio-10-tu1",
        question: "You own $8,000 in assets and owe $3,000 on debts. What is your net worth?",
        options: [
          "$11,000",
          "$8,000",
          "$5,000",
          "$3,000"
        ],
        correctAnswer: 2,
        explanation: "Net worth is what you own minus what you owe, so $8,000 in assets minus $3,000 in liabilities equals $5,000."
      },
      {
        id: "portfolio-10-tu2",
        question: "A card charges 22% interest while markets typically return far less. What does this tell you about high-interest debt?",
        options: [
          "Paying it off often beats investing",
          "It boosts your investment returns",
          "It has no effect on wealth building",
          "Debt makes you unable to invest at all"
        ],
        correctAnswer: 0,
        explanation: "High-interest debt compounds against you faster than markets typically grow for you, so paying it off is often the best return available."
      }
    ]
  }
]
