// Teaching-aligned top-up questions extending 8-question pools to 10.
import { QuizQuestion } from "@/types"

export const topUp8Etfs: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "funds-1",
    questions: [
      {
        id: "funds-1-tu1",
        question: "What does the 'exchange-traded' part of an ETF's name tell you?",
        options: [
          "It is bought and sold on an exchange like a stock",
          "It can only be exchanged for cash once a year",
          "It is traded exclusively between fund managers",
          "It must be exchanged at a bank branch in person"
        ],
        correctAnswer: 0,
        explanation: "The name says it: an ETF trades on an exchange throughout the day at live prices, just like buying or selling a single stock."
      },
      {
        id: "funds-1-tu2",
        question: "Priya wants exposure to hundreds of companies but can only afford one share. How does an ETF help?",
        options: [
          "It guarantees her a profit on that share",
          "One share gives her a tiny slice of the whole basket",
          "It converts her share into a savings account",
          "It lets her vote to control every company"
        ],
        correctAnswer: 1,
        explanation: "A single ETF share represents a small stake in everything the fund holds, giving instant diversification for the price of one share."
      }
    ]
  },
  {
    lessonId: "funds-2",
    questions: [
      {
        id: "funds-2-tu1",
        question: "How is a mutual fund's NAV per share calculated?",
        options: [
          "By the manager's guess each morning",
          "By counting the number of investors",
          "Total holdings value minus liabilities, divided by shares outstanding",
          "By adding up every investor's monthly deposit"
        ],
        correctAnswer: 2,
        explanation: "NAV is the fund's total assets minus liabilities divided by shares outstanding, giving the fair value of one share after market close."
      },
      {
        id: "funds-2-tu2",
        question: "Why do many investors pay higher fees for an actively managed mutual fund?",
        options: [
          "The manager tries to pick investments that beat a benchmark",
          "Active funds are guaranteed to never lose value",
          "The government requires higher fees on active funds",
          "Higher fees automatically produce higher returns"
        ],
        correctAnswer: 0,
        explanation: "Active managers research and select investments hoping to outperform a benchmark, a service investors pay for through higher fees."
      }
    ]
  },
  {
    lessonId: "funds-3",
    questions: [
      {
        id: "funds-3-tu1",
        question: "A fund charges a 0.50% expense ratio. What does that cost on a $1,000 balance each year?",
        options: [
          "Fifty dollars every year",
          "Five dollars every year",
          "Half a cent every year",
          "One hundred dollars every year"
        ],
        correctAnswer: 1,
        explanation: "A 0.50% expense ratio equals $5 per $1,000 invested per year, quietly deducted from the fund rather than billed to you."
      },
      {
        id: "funds-3-tu2",
        question: "Two funds track the same index; one charges 0.05% and one charges 0.90%. What is the reliable difference between them?",
        options: [
          "The pricier fund holds safer, better stocks",
          "The pricier fund is guaranteed higher returns",
          "There is no meaningful difference at all",
          "The cheaper fund lets you keep more of the returns"
        ],
        correctAnswer: 3,
        explanation: "Same index means the same holdings and gross performance, so the cheaper fund simply leaves more money in your pocket."
      }
    ]
  },
  {
    lessonId: "funds-4",
    questions: [
      {
        id: "funds-4-tu1",
        question: "What is the basic job of an index fund's strategy?",
        options: [
          "To replicate its target index by holding the same securities",
          "To pick a rotating set of secret winning stocks",
          "To move opposite to the market to avoid losses",
          "To hold only the single largest company each year"
        ],
        correctAnswer: 0,
        explanation: "An index fund mechanically tracks its index by holding the same securities in matching proportions, no stock-picking required."
      },
      {
        id: "funds-4-tu2",
        question: "Devon expects an index fund to exactly match its index but it lagged by about 0.15%. What most likely caused that small gap?",
        options: [
          "The manager secretly bought different stocks",
          "The fund's small expense ratio was deducted from returns",
          "The index was calculated incorrectly that year",
          "Too many investors bought in at once"
        ],
        correctAnswer: 1,
        explanation: "Index funds return the index minus a small expense ratio, so a tiny consistent lag matching the fee is exactly what a healthy fund shows."
      }
    ]
  },
  {
    lessonId: "funds-5",
    questions: [
      {
        id: "funds-5-tu1",
        question: "Roughly how much of the total US stock market's value do the S&P 500 companies represent?",
        options: [
          "About ten percent",
          "Exactly one hundred percent",
          "About eighty percent",
          "Less than five percent"
        ],
        correctAnswer: 2,
        explanation: "The S&P 500 tracks about 500 of the largest US companies, together representing roughly 80% of the total US stock market's value."
      },
      {
        id: "funds-5-tu2",
        question: "Because the S&P 500 is market-cap weighted, how much does a giant like Apple affect the index versus the smallest member?",
        options: [
          "Exactly the same, since every company is equal",
          "Much more, because bigger companies carry bigger weights",
          "Much less, since the index favors small companies",
          "None at all, because Apple is excluded from weighting"
        ],
        correctAnswer: 1,
        explanation: "In a market-cap-weighted index, larger companies get larger weights, so a giant like Apple moves the index far more than the smallest members."
      }
    ]
  },
  {
    lessonId: "funds-6",
    questions: [
      {
        id: "funds-6-tu1",
        question: "In a 'core and satellite' approach, what size should a sector ETF position usually be?",
        options: [
          "A smaller satellite position around a broad core",
          "The entire portfolio for maximum focus",
          "Larger than the broad core holding",
          "Equal to the investor's emergency savings"
        ],
        correctAnswer: 0,
        explanation: "Experts suggest keeping sector bets small as satellites around a broad index core, so a wrong guess cannot sink the whole plan."
      },
      {
        id: "funds-6-tu2",
        question: "A technology sector ETF holds many tech firms. How does that change company-specific risk compared with owning one tech stock?",
        options: [
          "It removes all technology industry risk entirely",
          "It guarantees the position rises every quarter",
          "It spreads company-specific risk across many firms",
          "It concentrates everything into a single company"
        ],
        correctAnswer: 2,
        explanation: "A sector ETF still carries industry risk, but spreading holdings across many companies means one firm's scandal barely moves it."
      }
    ]
  },
  {
    lessonId: "funds-7",
    questions: [
      {
        id: "funds-7-tu1",
        question: "Why does a typical bond ETF never really mature the way a single bond does?",
        options: [
          "It locks its value until one fixed date",
          "It repays face value to every shareholder yearly",
          "It is legally forbidden from holding old bonds",
          "It continually rolls into new bonds, so its price keeps fluctuating"
        ],
        correctAnswer: 3,
        explanation: "A single bond repays face value at maturity, but most bond ETFs keep rolling into new bonds, so they never mature and their price keeps moving."
      },
      {
        id: "funds-7-tu2",
        question: "Which specialized bond ETF would an investor pick for the safest, government-backed holdings?",
        options: [
          "A Treasury bond ETF",
          "A high-risk technology sector ETF",
          "A fund of collectible assets",
          "A single small-town municipal bond"
        ],
        correctAnswer: 0,
        explanation: "Bond ETFs come in many flavors, and a Treasury fund holds US government bonds, the type used for stability in a portfolio."
      }
    ]
  },
  {
    lessonId: "funds-8",
    questions: [
      {
        id: "funds-8-tu1",
        question: "As a target-date fund's glide path progresses toward its target year, how does its mix change?",
        options: [
          "It shifts gradually from stock-heavy toward bond-heavy",
          "It moves from bonds into cryptocurrency",
          "It keeps the exact same mix the entire time",
          "It sells everything and holds only cash early"
        ],
        correctAnswer: 0,
        explanation: "The glide path slowly moves the fund from aggressive and stock-heavy in early years to conservative and bond-heavy near the target date."
      },
      {
        id: "funds-8-tu2",
        question: "Maya, 17, is confident she is far more risk-tolerant than average. What fair criticism of target-date funds applies to her?",
        options: [
          "The funds hold far too few investments",
          "The glide path is one-size-fits-all and ignores personal risk preferences",
          "The funds never reduce risk as the date nears",
          "The funds demand daily attention from her"
        ],
        correctAnswer: 1,
        explanation: "A target-date glide path is built for a birth-year cohort, so it cannot know if an individual is personally more or less risk-tolerant than average."
      }
    ]
  },
  {
    lessonId: "funds-9",
    questions: [
      {
        id: "funds-9-tu1",
        question: "What does a low 'tracking error' tell you about an index fund?",
        options: [
          "The fund made a typo in its documents",
          "The fund took on extra hidden risk",
          "The fund follows its benchmark very closely",
          "The manager took few vacation days"
        ],
        correctAnswer: 2,
        explanation: "Tracking error measures how far a fund strays from its index, so a small tracking error means the fund follows its benchmark closely."
      },
      {
        id: "funds-9-tu2",
        question: "Why is judging a small-cap fund against the S&P 500 a poor comparison?",
        options: [
          "The S&P 500 changes its rules every week",
          "A fund should be judged against its own category benchmark",
          "Small-cap funds share no benchmark with anything",
          "All funds are supposed to use one universal benchmark"
        ],
        correctAnswer: 1,
        explanation: "Benchmark-appropriate comparison means measuring a fund against its own category, so a small-cap fund belongs against a small-cap index."
      }
    ]
  },
  {
    lessonId: "funds-10",
    questions: [
      {
        id: "funds-10-tu1",
        question: "Sam has money he will need in about six months for a trip. Where should it go?",
        options: [
          "An aggressive small-cap stock fund",
          "A volatile emerging markets fund",
          "A concentrated single-sector ETF",
          "A savings account or similar safe place"
        ],
        correctAnswer: 3,
        explanation: "Short-term money cannot risk a market dip right before it is needed, so safe, liquid accounts protect near-term goals."
      },
      {
        id: "funds-10-tu2",
        question: "What is the FIRST question to ask before choosing any fund?",
        options: [
          "What goal and timeline is this money for?",
          "Which fund is trending on social media?",
          "Which fund has the shortest name?",
          "What did the fund return just last week?"
        ],
        correctAnswer: 0,
        explanation: "The right fund depends on the job, so goal, timeline, and risk tolerance come first, then you pick the cheapest good tool for that job."
      }
    ]
  }
]
