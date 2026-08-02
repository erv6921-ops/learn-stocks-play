import { QuizQuestion } from "@/types"

export const topUp8BondsMkt: { lessonId: string; questions: QuizQuestion[] }[] = [
  {
    lessonId: "bonds-1",
    questions: [
      {
        id: "bonds-1-tu1",
        question: "If a company gets into trouble, who has the stronger claim to be paid?",
        options: [
          "Stockholders, because they own the company",
          "Bondholders, because they are lenders owed a contract",
          "Neither, because everyone is paid equally",
          "Whoever bought their investment most recently"
        ],
        correctAnswer: 1,
        explanation: "Bondholders are lenders with a contractual claim, so they get paid before stockholders if the company runs into trouble."
      },
      {
        id: "bonds-1-tu2",
        question: "A town issues bonds to repave its roads. What promise is it making to buyers?",
        options: [
          "To give buyers ownership of the new roads",
          "To let buyers vote on future town projects",
          "To repay the borrowed money with interest",
          "To share any profits the roads generate"
        ],
        correctAnswer: 2,
        explanation: "Issuing bonds means the town is borrowing, so it promises to repay buyers their principal plus interest rather than granting ownership or votes."
      }
    ]
  },
  {
    lessonId: "bonds-2",
    questions: [
      {
        id: "bonds-2-tu1",
        question: "A city issues bonds to fund a new water system. What type of bond is this?",
        options: [
          "A Treasury bond",
          "A corporate bond",
          "A junk startup bond",
          "A municipal bond"
        ],
        correctAnswer: 3,
        explanation: "Bonds issued by a city or local government to fund projects like water systems are municipal bonds."
      },
      {
        id: "bonds-2-tu2",
        question: "Why can a shaky company be forced to offer a higher yield than a strong one?",
        options: [
          "Weaker issuers must pay more to offset default risk",
          "Federal law sets higher rates for smaller firms",
          "Strong companies are banned from paying high yields",
          "Weaker companies simply enjoy rewarding lenders"
        ],
        correctAnswer: 0,
        explanation: "Because a shaky company is more likely to default, investors demand a higher yield as compensation for taking that extra risk."
      }
    ]
  },
  {
    lessonId: "bonds-3",
    questions: [
      {
        id: "bonds-3-tu1",
        question: "A $1,000 bond pays a fixed $60 coupon each year. What is its current yield if it still trades at $1,000?",
        options: [
          "Sixty percent",
          "Six percent",
          "Sixteen percent",
          "One and a half percent"
        ],
        correctAnswer: 1,
        explanation: "Current yield is the annual coupon divided by price: $60 divided by $1,000 equals 6%."
      },
      {
        id: "bonds-3-tu2",
        question: "Besides collecting its coupon, how else could a bondholder make money on a bond?",
        options: [
          "By collecting a share of company profits",
          "By earning voting dividends each quarter",
          "By selling it for more than they paid",
          "By converting it into free company stock"
        ],
        correctAnswer: 2,
        explanation: "A bond can also make money through price changes, so selling it above what you paid produces an extra return beyond the coupon."
      }
    ]
  },
  {
    lessonId: "bonds-4",
    questions: [
      {
        id: "bonds-4-tu1",
        question: "A bond is rated BB+. Which category does it fall into?",
        options: [
          "High-yield, or junk",
          "Investment grade",
          "The top AAA tier",
          "Government guaranteed"
        ],
        correctAnswer: 0,
        explanation: "Investment grade stops at BBB-/Baa3, so a BB+ bond sits just below that line in high-yield or junk territory."
      },
      {
        id: "bonds-4-tu2",
        question: "Which organization would assign a credit rating to a bond?",
        options: [
          "The bond issuer's own sales team",
          "The New York Stock Exchange",
          "An agency like Moody's or S&P",
          "The IRS during tax season"
        ],
        correctAnswer: 2,
        explanation: "Independent agencies such as Moody's, S&P Global, and Fitch research issuers and assign the credit ratings investors rely on."
      }
    ]
  },
  {
    lessonId: "bonds-5",
    questions: [
      {
        id: "bonds-5-tu1",
        question: "A bond yields 4% while inflation runs 4%. What is the investor's approximate real return?",
        options: [
          "About eight percent",
          "About four percent",
          "About negative four percent",
          "About zero percent"
        ],
        correctAnswer: 3,
        explanation: "Real return is roughly yield minus inflation: 4% minus 4% equals about 0%, so purchasing power barely changes."
      },
      {
        id: "bonds-5-tu2",
        question: "Which feature of TIPS helps protect investors from inflation?",
        options: [
          "Their principal adjusts with the inflation index",
          "Their coupon is fixed for thirty years",
          "They pay no interest until maturity",
          "They can never be sold before maturity"
        ],
        correctAnswer: 0,
        explanation: "TIPS adjust their principal with the Consumer Price Index, so payments rise with inflation and preserve purchasing power."
      }
    ]
  },
  {
    lessonId: "bonds-6",
    questions: [
      {
        id: "bonds-6-tu1",
        question: "Market interest rates fall after Nina buys her bond. What happens to her bond's market price?",
        options: [
          "It falls to match the lower rates",
          "It rises because her coupon now looks generous",
          "It stays locked at her purchase price",
          "It drops to zero until rates recover"
        ],
        correctAnswer: 1,
        explanation: "Bond prices move inversely to rates, so when rates fall, an older bond's higher coupon becomes more attractive and its price rises."
      },
      {
        id: "bonds-6-tu2",
        question: "Even a U.S. Treasury with no default risk can lose market value. Why?",
        options: [
          "The government occasionally skips its payments",
          "Treasuries are downgraded by rating agencies yearly",
          "Rising interest rates push its price down",
          "Treasuries expire worthless after one year"
        ],
        correctAnswer: 2,
        explanation: "Interest rate risk is separate from default risk, so even a default-free Treasury falls in price when market rates rise."
      }
    ]
  },
  {
    lessonId: "bonds-7",
    questions: [
      {
        id: "bonds-7-tu1",
        question: "A bond fund has a duration of 6 and interest rates rise 1%. Roughly what happens to its value?",
        options: [
          "It rises about 6%",
          "It falls about 1%",
          "It stays unchanged",
          "It falls about 6%"
        ],
        correctAnswer: 3,
        explanation: "Price change roughly equals duration times the rate change, so a duration of 6 means about a 6% drop when rates rise 1%."
      },
      {
        id: "bonds-7-tu2",
        question: "Two bonds are identical except one matures in 2 years and the other in 25 years. Which has the higher duration?",
        options: [
          "The 25-year bond",
          "The 2-year bond",
          "They have identical duration",
          "Duration does not depend on maturity"
        ],
        correctAnswer: 0,
        explanation: "Longer maturities stretch duration because more of the bond's cash arrives far in the future, so the 25-year bond has the higher duration."
      }
    ]
  },
  {
    lessonId: "bonds-8",
    questions: [
      {
        id: "bonds-8-tu1",
        question: "How does a bond fund most help a beginner with only a small amount to invest?",
        options: [
          "It guarantees a fixed return every year",
          "It spreads a small deposit across many bonds",
          "It removes all fees from bond investing",
          "It promises full face value on a set date"
        ],
        correctAnswer: 1,
        explanation: "A bond fund pools money and holds many bonds, so even a small deposit gets instant diversification across hundreds of holdings."
      },
      {
        id: "bonds-8-tu2",
        question: "How do investors in a bond fund usually receive their income?",
        options: [
          "As a lump sum only when the fund closes",
          "As coupons mailed by each separate issuer",
          "As regular distributions from the fund",
          "As voting credits at shareholder meetings"
        ],
        correctAnswer: 2,
        explanation: "The fund collects interest from all its bonds and passes it to investors as regular distributions, typically monthly."
      }
    ]
  },
  {
    lessonId: "bonds-9",
    questions: [
      {
        id: "bonds-9-tu1",
        question: "Compared with a portfolio of only stocks, what does adding bonds mainly do?",
        options: [
          "Increases the portfolio's long-term growth",
          "Reduces the size of the portfolio's swings",
          "Guarantees the portfolio never loses value",
          "Removes the need to ever rebalance"
        ],
        correctAnswer: 1,
        explanation: "Bonds act as shock absorbers, so mixing them with stocks reduces the portfolio's swings while trading away some growth."
      },
      {
        id: "bonds-9-tu2",
        question: "As an investor gets close to needing the money, how should the bond share of the portfolio usually change?",
        options: [
          "It should increase to protect the money",
          "It should drop to zero for faster growth",
          "It should be swapped entirely for stocks",
          "It should stay exactly the same forever"
        ],
        correctAnswer: 0,
        explanation: "As a goal approaches, shifting toward bonds protects the money from a badly timed stock crash, so the bond share should increase."
      }
    ]
  },
  {
    lessonId: "market-1",
    questions: [
      {
        id: "market-1-tu1",
        question: "Which exchange launched as a fully electronic marketplace with no physical trading floor?",
        options: [
          "The New York Stock Exchange",
          "The NASDAQ",
          "The London Stock Exchange",
          "The Chicago Mercantile Exchange"
        ],
        correctAnswer: 1,
        explanation: "The NASDAQ began in 1971 as the first electronic stock market and never needed a physical trading floor."
      },
      {
        id: "market-1-tu2",
        question: "Which statement about the NYSE and NASDAQ is true?",
        options: [
          "Both are run directly by the federal government",
          "Both operate only on weekends",
          "Both let investors trade shares of public companies",
          "Both require every trade to happen face to face"
        ],
        correctAnswer: 2,
        explanation: "Despite their different histories, both are stock exchanges where investors can buy and sell shares of publicly listed companies."
      }
    ]
  },
  {
    lessonId: "market-2",
    questions: [
      {
        id: "market-2-tu1",
        question: "A market maker's bid is $19.98 and its ask is $20.02. What is the spread?",
        options: [
          "Four cents",
          "Two cents",
          "Twenty dollars",
          "Forty cents"
        ],
        correctAnswer: 0,
        explanation: "The spread is the gap between the ask and the bid: $20.02 minus $19.98 equals four cents."
      },
      {
        id: "market-2-tu2",
        question: "Why can everyday investors usually buy or sell a popular stock almost instantly?",
        options: [
          "The SEC personally fills each order",
          "Prices are frozen until a buyer appears",
          "Market makers stand ready to trade continuously",
          "Companies print new shares on demand"
        ],
        correctAnswer: 2,
        explanation: "Market makers continuously quote prices to buy and sell, providing liquidity so investors almost always have a trading partner."
      }
    ]
  },
  {
    lessonId: "market-3",
    questions: [
      {
        id: "market-3-tu1",
        question: "Which of these keeps the US stock market closed on a weekday?",
        options: [
          "Rainy weather in New York City",
          "The first Monday of every month",
          "A federal holiday like Independence Day",
          "Routine weekly system maintenance"
        ],
        correctAnswer: 2,
        explanation: "Beyond weekends, markets close on about nine federal holidays a year such as Independence Day, not for weather or maintenance."
      },
      {
        id: "market-3-tu2",
        question: "Regular trading opens at 9:30 am Eastern. When is that for an investor in California on Pacific Time?",
        options: [
          "6:30 am Pacific",
          "9:30 am Pacific",
          "12:30 pm Pacific",
          "3:30 am Pacific"
        ],
        correctAnswer: 0,
        explanation: "Pacific Time is three hours behind Eastern, so the 9:30 am Eastern open is 6:30 am Pacific."
      }
    ]
  },
  {
    lessonId: "market-4",
    questions: [
      {
        id: "market-4-tu1",
        question: "The S&P 500 has fallen about 12% from its recent high. What is this most accurately called?",
        options: [
          "A bull market",
          "A bear market",
          "A correction",
          "A recession"
        ],
        correctAnswer: 2,
        explanation: "A drop of about 10% but less than 20% from recent highs is a correction, milder than a bear market's 20% decline."
      },
      {
        id: "market-4-tu2",
        question: "Historically in the US, how have bull and bear markets compared in length?",
        options: [
          "Bear markets have usually lasted longer",
          "Bull markets have typically lasted longer",
          "They always last exactly the same time",
          "Bear markets only happened before 2000"
        ],
        correctAnswer: 1,
        explanation: "US bull markets have historically run for years while bear markets have usually been shorter, rewarding long-term investors."
      }
    ]
  },
  {
    lessonId: "market-5",
    questions: [
      {
        id: "market-5-tu1",
        question: "Which of these is generally the LEAST liquid asset?",
        options: [
          "Shares of a large well-known company",
          "Cash in a savings account",
          "A rare collectible painting",
          "A widely traded stock"
        ],
        correctAnswer: 2,
        explanation: "A rare collectible can take a long time to sell at full value, making it far less liquid than cash or big-company stocks."
      },
      {
        id: "market-5-tu2",
        question: "Which pair of signs points to high liquidity in a stock?",
        options: [
          "Heavy daily volume and a tight bid-ask spread",
          "A very high price per single share",
          "A famous brand and an old founding date",
          "Low volume and a very wide spread"
        ],
        correctAnswer: 0,
        explanation: "Lots of shares trading each day plus a narrow spread show plenty of buyers and sellers, the hallmarks of high liquidity."
      }
    ]
  }
]
