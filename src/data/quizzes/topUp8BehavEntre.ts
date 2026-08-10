import { QuizQuestion } from "@/types"

export const topUp8BehavEntre: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "behavior-1",
    questions: [
      {
        id: "behavior-1-tu1",
        question: "Roughly how large does a gain need to be to emotionally offset the pain of an equal-sized loss?",
        options: [
          "About half the size of the loss",
          "About the same size as the loss",
          "About twice the size of the loss",
          "About ten times the size of the loss"
        ],
        correctAnswer: 2,
        explanation: "Because losses feel roughly twice as intense as equal gains, a gain must be about double the loss to feel emotionally even."
      },
      {
        id: "behavior-1-tu2",
        question: "An investor sells her winning stocks quickly to lock in gains but clings to her losers for months. Which bias does this pattern reflect?",
        options: [
          "Loss aversion, since selling losers would make the pain feel real",
          "Anchoring to the highest price the winners ever reached",
          "Overconfidence in her ability to time the market perfectly",
          "Herd behavior copying what other investors are selling"
        ],
        correctAnswer: 0,
        explanation: "Refusing to sell losers to avoid the pain of a realized loss, while banking gains fast, is a classic sign of loss aversion."
      }
    ]
  },
  {
    lessonId: "behavior-2",
    questions: [
      {
        id: "behavior-2-tu1",
        question: "Why is the price you originally paid for a stock considered an anchor rather than useful information?",
        options: [
          "Because the market sets prices based on what past buyers paid",
          "Because your purchase price legally sets a floor on the stock",
          "Because the market does not know or care what you paid for it",
          "Because purchase prices always predict future returns accurately"
        ],
        correctAnswer: 2,
        explanation: "The market prices a stock on its current prospects, not on what you paid, so your purchase price is just an anchor that biases your judgment."
      },
      {
        id: "behavior-2-tu2",
        question: "A phone launches at $1,000, then a store advertises it today only for $800. Why does $800 suddenly feel like a great deal?",
        options: [
          "Because $800 phones are always high quality by law",
          "Because the $1,000 starting price anchors your sense of value",
          "Because discounts remove the sales tax from the purchase",
          "Because limited-time offers guarantee the lowest possible price"
        ],
        correctAnswer: 1,
        explanation: "The $1,000 figure acts as an anchor, so $800 feels cheap by comparison even though the phone may never have been worth $1,000."
      }
    ]
  },
  {
    lessonId: "behavior-3",
    questions: [
      {
        id: "behavior-3-tu1",
        question: "An investor already bullish on a company reads a mixed earnings report and walks away certain it was great news. What does this show?",
        options: [
          "Confirmation bias making him read ambiguous news in his favor",
          "Loss aversion pushing him to hold the stock too long",
          "Anchoring to the analyst price target he saw earlier",
          "Overconfidence in his overall market forecasting ability"
        ],
        correctAnswer: 0,
        explanation: "Confirmation bias makes people interpret gray areas to fit what they already believe, so a bull spins mixed news as clearly positive."
      },
      {
        id: "behavior-3-tu2",
        question: "Which reading habit does the OPPOSITE of what confirmation bias pushes you to do?",
        options: [
          "Following only accounts that praise the stocks you own",
          "Rereading your own bullish notes whenever you feel doubt",
          "Deliberately seeking out the strongest case against your idea",
          "Muting anyone online who criticizes your picks"
        ],
        correctAnswer: 2,
        explanation: "Confirmation bias pushes us toward agreement, so actively hunting the best opposing argument is the deliberate counter-habit."
      }
    ]
  },
  {
    lessonId: "behavior-4",
    questions: [
      {
        id: "behavior-4-tu1",
        question: "Why does keeping a written journal of your predictions help fight overconfidence?",
        options: [
          "It guarantees your future predictions will be correct",
          "It creates an honest scorecard of your real accuracy",
          "It legally requires you to trade less frequently",
          "It hides your losing predictions so they stop bothering you"
        ],
        correctAnswer: 1,
        explanation: "A prediction journal is an honest scorecard, and most people discover they were right far less often than memory suggests, deflating overconfidence."
      },
      {
        id: "behavior-4-tu2",
        question: "An overconfident investor is MOST likely to underperform because he tends to do what?",
        options: [
          "Hold a single index fund quietly for decades",
          "Keep large amounts of cash out of the market",
          "Trade frequently and concentrate his bets heavily",
          "Copy index funds as closely as he possibly can"
        ],
        correctAnswer: 2,
        explanation: "Overconfidence drives excessive trading and concentrated bets, piling up costs and mistimed decisions that drag returns below patient investors."
      }
    ]
  },
  {
    lessonId: "behavior-5",
    questions: [
      {
        id: "behavior-5-tu1",
        question: "How does herd behavior help inflate a market bubble?",
        options: [
          "Waves of buyers pile in just because prices are rising, pushing them past real value",
          "Investors ignore each other and value companies independently",
          "Regulators require everyone to buy at the same time",
          "Bubbles form only when the crowd refuses to buy anything"
        ],
        correctAnswer: 0,
        explanation: "Bubbles swell when buyers join simply because prices are climbing and everyone else is in, herding prices far beyond what fundamentals justify."
      },
      {
        id: "behavior-5-tu2",
        question: "When you notice that everyone is rushing to buy a hot stock, what is the smartest response?",
        options: [
          "Buy immediately before the crowd drives the price even higher",
          "Do your own research before making any move",
          "Borrow money so you can buy as much as possible",
          "Short the stock because crowds are always wrong"
        ],
        correctAnswer: 1,
        explanation: "Popularity is not analysis; the crowd is sometimes right and sometimes wrong, so evaluating the investment yourself is the only reliable check."
      }
    ]
  },
  {
    lessonId: "behavior-6",
    questions: [
      {
        id: "behavior-6-tu1",
        question: "Why do social media feeds make investing FOMO feel worse than it should?",
        options: [
          "Platforms verify every gain screenshot before it is posted",
          "People post their wins but not their losses, warping your view",
          "Feeds are legally required to show only profitable trades",
          "Social apps automatically buy the stocks users mention"
        ],
        correctAnswer: 1,
        explanation: "Feeds overflow with screenshots of gains because nobody brags about losses, and this survivorship bias makes everyone else look rich and you feel left behind."
      },
      {
        id: "behavior-6-tu2",
        question: "Why are limited time only investment pitches so effective at getting people to act?",
        options: [
          "Short windows legally increase an investment's real returns",
          "Regulators approve time-limited offers faster than normal ones",
          "Artificial deadlines trigger FOMO and short-circuit careful thinking",
          "Deadlines give investors extra time to research thoroughly"
        ],
        correctAnswer: 2,
        explanation: "Manufactured deadlines create fear of missing out that pushes people to act before thinking, which is why urgency is a classic scam ingredient."
      }
    ]
  },
  {
    lessonId: "behavior-7",
    questions: [
      {
        id: "behavior-7-tu1",
        question: "Why does automating investments, such as monthly auto-deposits, reduce emotional trading?",
        options: [
          "It guarantees you always buy at the month's lowest price",
          "It removes in-the-moment feelings from each buying decision",
          "Banks pay higher interest on automated deposits",
          "Automatic investing is exempt from market losses"
        ],
        correctAnswer: 1,
        explanation: "When investing happens on a set schedule, fear and greed never get a vote, so the money goes in whether markets feel scary or euphoric."
      },
      {
        id: "behavior-7-tu2",
        question: "A trader buys back a stock he sold at a higher price purely out of anger that it rose. What is this behavior called?",
        options: [
          "Dollar-cost averaging across two purchases",
          "A disciplined re-entry based on new fundamentals",
          "Revenge trading driven by regret and frustration",
          "A required buyback under brokerage account rules"
        ],
        correctAnswer: 2,
        explanation: "Trading to soothe regret rather than because the stock became a better value is revenge trading, which swaps analysis for emotion at a bad price."
      }
    ]
  },
  {
    lessonId: "behavior-8",
    questions: [
      {
        id: "behavior-8-tu1",
        question: "Why is simply being aware of a bias usually not enough to stop it from affecting your decisions?",
        options: [
          "Awareness makes biases grow permanently stronger over time",
          "Biases only affect people who have never studied them",
          "Biases fire automatically, so you also need systems to catch them",
          "Only professional investors are capable of overcoming biases"
        ],
        correctAnswer: 2,
        explanation: "Biases operate fast and unconsciously, so even experts who study them still slip, which is why rules, automation, and checklists are needed alongside awareness."
      },
      {
        id: "behavior-8-tu2",
        question: "How does writing down a stock's buy thesis and sell criteria before buying help you later?",
        options: [
          "It lets you check whether anything fundamental actually changed during a dip",
          "It legally prevents you from ever selling during a crash",
          "It guarantees the stock will outperform the market",
          "It removes any need to review the holding again"
        ],
        correctAnswer: 0,
        explanation: "A written thesis lets you verify whether the original reasons still hold when the price drops, so a dip becomes noise rather than a trigger to panic-sell."
      }
    ]
  },
  {
    lessonId: "biz-1",
    questions: [
      {
        id: "biz-1-tu1",
        question: "A rideshare app keeps 15% of every $40 fare. How much does the app earn per ride, and what revenue model is this?",
        options: [
          "$6, a commission model on each transaction",
          "$6, a subscription model with recurring payments",
          "$4, a freemium model with paid upgrades",
          "$15, an advertising model based on views"
        ],
        correctAnswer: 0,
        explanation: "This is a commission model: 15% of $40 is $6 per ride, with the driver keeping the rest, just like a marketplace taking a cut of each transaction."
      },
      {
        id: "biz-1-tu2",
        question: "A fitness studio earns money from class passes, branded merchandise, and licensing its workout program to gyms. Why is having several revenue streams smart?",
        options: [
          "It means the studio no longer needs any customers",
          "If one source slows down, the others can keep the business afloat",
          "It guarantees the studio can never lose money again",
          "It lets the studio avoid paying its suppliers"
        ],
        correctAnswer: 1,
        explanation: "Diversified revenue reduces risk: if class income falls, merchandise and licensing can keep the business running, so it does not depend on a single source."
      }
    ]
  },
  {
    lessonId: "biz-2",
    questions: [
      {
        id: "biz-2-tu1",
        question: "A candle maker pays $800 monthly rent and $3 in wax and wick per candle. What is the total cost of making 300 candles in a month?",
        options: [
          "Exactly $900 in total costs",
          "Exactly $800 in total costs",
          "Exactly $1,700 in total costs",
          "Exactly $1,100 in total costs"
        ],
        correctAnswer: 2,
        explanation: "Total cost equals fixed plus variable: $800 rent plus $3 times 300 candles, which is $900, equals $1,700 for the month."
      },
      {
        id: "biz-2-tu2",
        question: "A bakery's oven lease is $1,200 per month. If it bakes 2,000 loaves instead of 1,000, what happens to the lease cost per loaf?",
        options: [
          "It doubles from $1.20 to $2.40 per loaf",
          "It stays at exactly $1.20 per loaf",
          "It falls from $1.20 to $0.60 per loaf",
          "It disappears once output is high enough"
        ],
        correctAnswer: 2,
        explanation: "The $1,200 lease is a fixed cost that does not change, so spreading it over 2,000 loaves instead of 1,000 cuts the per-loaf cost in half."
      }
    ]
  },
  {
    lessonId: "biz-3",
    questions: [
      {
        id: "biz-3-tu1",
        question: "A soap business has $900 in fixed costs, sells each bar for $12, and each bar costs $6 to make. How many bars must it sell to break even?",
        options: [
          "It must sell 75 bars",
          "It must sell 150 bars",
          "It must sell 300 bars",
          "It must sell 100 bars"
        ],
        correctAnswer: 1,
        explanation: "Each bar contributes $12 minus $6, or $6, toward fixed costs, so $900 divided by $6 equals 150 bars to break even."
      },
      {
        id: "biz-3-tu2",
        question: "A business lowers its selling price while its costs stay the same. What happens to its break-even point?",
        options: [
          "It rises because each sale now covers fewer costs",
          "It falls because lower prices attract more buyers",
          "It stays the same because costs did not change",
          "It disappears entirely once prices are low enough"
        ],
        correctAnswer: 0,
        explanation: "A lower price shrinks the contribution margin per unit, so more units must be sold to cover the same fixed costs, pushing the break-even point up."
      }
    ]
  },
  {
    lessonId: "biz-4",
    questions: [
      {
        id: "biz-4-tu1",
        question: "A backpack sells for $80 and costs $50 in materials and labor to produce. What is its gross margin?",
        options: [
          "A gross margin of 30 percent",
          "A gross margin of 50 percent",
          "A gross margin of 37.5 percent",
          "A gross margin of 62.5 percent"
        ],
        correctAnswer: 2,
        explanation: "Gross profit is $80 minus $50, or $30, so gross margin is $30 divided by $80, which equals 37.5 percent of the selling price."
      },
      {
        id: "biz-4-tu2",
        question: "How does net margin differ from gross margin?",
        options: [
          "Net margin only counts a company's cash sales",
          "Net margin subtracts all expenses, not just production costs",
          "Net margin is always larger than gross margin",
          "Net margin includes taxes while gross margin excludes revenue"
        ],
        correctAnswer: 1,
        explanation: "Gross margin subtracts only the direct cost of making products, while net margin also subtracts rent, salaries, marketing, interest, and taxes."
      }
    ]
  },
  {
    lessonId: "biz-5",
    questions: [
      {
        id: "biz-5-tu1",
        question: "An investor pays $80,000 for a 10% stake in a startup. What value does that place on the whole company?",
        options: [
          "The company is valued at $80,000",
          "The company is valued at $800,000",
          "The company is valued at $8 million",
          "The company is valued at $160,000"
        ],
        correctAnswer: 1,
        explanation: "If 10% costs $80,000, then 100% is worth ten times that: $80,000 times 10 equals $800,000."
      },
      {
        id: "biz-5-tu2",
        question: "What is the key difference between funding a business with a bank loan versus selling equity?",
        options: [
          "A loan gives the lender ownership of the company",
          "A loan must be repaid with interest, while equity trades ownership instead",
          "Equity must be repaid monthly with added interest",
          "Equity is only available from banks and governments"
        ],
        correctAnswer: 1,
        explanation: "A loan is repaid with interest no matter what happens, while equity investors get ownership and only profit if the company succeeds."
      }
    ]
  },
  {
    lessonId: "biz-6",
    questions: [
      {
        id: "biz-6-tu1",
        question: "A necklace costs $20 to make and the seller adds a 25% markup. What is the selling price?",
        options: [
          "A price of $22",
          "A price of $30",
          "A price of $25",
          "A price of $45"
        ],
        correctAnswer: 2,
        explanation: "A 25% markup on $20 adds $5, so the necklace sells for $20 plus $5, which equals $25 under cost-plus pricing."
      },
      {
        id: "biz-6-tu2",
        question: "A new food-delivery app launches at a very low price to sign up as many users as possible, planning to raise prices later. What pricing strategy is this?",
        options: [
          "Penetration pricing to win market share fast",
          "Price skimming aimed at wealthy early adopters",
          "Cost-plus pricing with a fixed markup",
          "Charm pricing ending in 99 cents"
        ],
        correctAnswer: 0,
        explanation: "Penetration pricing sacrifices early profit to build a large user base quickly, betting those customers will stay when prices rise."
      }
    ]
  },
  {
    lessonId: "biz-7",
    questions: [
      {
        id: "biz-7-tu1",
        question: "What does the target market section of a business plan define?",
        options: [
          "Every person in the country who has money to spend",
          "The specific group of customers the business will serve",
          "The store location with the cheapest available rent",
          "The list of competitors the business plans to copy"
        ],
        correctAnswer: 1,
        explanation: "A target market names exactly who you are selling to, such as high school gamers, so marketing and product decisions stay focused."
      },
      {
        id: "biz-7-tu2",
        question: "Why should a business plan be updated regularly rather than written once and filed away?",
        options: [
          "Because old plans expire legally after twelve months",
          "Because investors charge fees for reading outdated plans",
          "Because real conditions change, so the roadmap must adapt",
          "Because longer plans always attract more funding"
        ],
        correctAnswer: 2,
        explanation: "Markets, costs, and customers shift constantly, so a plan is a living tool that should be revised as the business learns what actually works."
      }
    ]
  }
]
