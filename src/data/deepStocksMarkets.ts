import { StructuredLessonContent } from "@/types"

// Deepened lesson content (Mortgages-depth rebuild) for: stocks, stock-market
// Each entry replaces the thin auto-generated version for its lessonId.
export const deepStocksMarkets: StructuredLessonContent[] = [
  // ═══════════════════════════════════════════════
  // UNIT 7: STOCKS EXPLAINED (stocks-1 .. stocks-10)
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // stocks-1: What Is a Share
  // ─────────────────────────────────────────────
  {
    lessonId: "stocks-1",
    sections: [
      {
        type: "concept",
        title: "A Share Is a Slice of a Company",
        paragraphs: [
          "A share of stock is literally a small piece of ownership in a company. When a business like Nike or Apple wants to raise money, it can divide itself into millions of equal pieces and sell them to the public. Each piece is a share, and whoever owns it is a shareholder - a partial owner of that entire company. If a company splits itself into 1,000,000 shares and you buy 100 of them, you own one ten-thousandth of the whole business, including its factories, brand, and future profits.",
          "This matters because owning a share is completely different from lending money or holding cash. A shareholder actually owns part of the company, so if the business grows and becomes more valuable, the value of each share tends to rise too. Imagine your school's snack stand sold 100 shares for $10 each to raise $1,000 for supplies. If the stand later becomes worth $2,000, each of those shares is now worth about $20 - the owners share in the success without doing the daily work.",
          "Ownership also comes with real rights. Shareholders can often vote on big company decisions, like who sits on the board of directors that oversees management. Many companies also pass along a slice of their profits to shareholders as cash payments called dividends. But ownership cuts both ways: if the company struggles and loses value, your shares can drop too, and unlike a savings account, there's no guarantee you'll get your money back. That trade-off - real ownership, real upside, real risk - is the heart of what a share is."
        ],
        bullets: [
          "A share is a unit of ownership; owning one makes you a partial owner of the whole company.",
          "Companies sell shares to raise money without borrowing it or paying it back.",
          "As a company grows more valuable, the value of each share tends to rise.",
          "Shareholders often get voting rights and may receive profit payments called dividends.",
          "There's no guarantee - if the company loses value, your shares can fall too."
        ],
        realWorldExample: "If a company is divided into 4 billion shares and the whole company is worth $200 billion, each share is worth about $50. Buy 10 shares for $500 and you own roughly one four-hundred-millionth of the company - a tiny slice, but a real one."
      },
      {
        type: "concept",
        title: "Why People Buy Shares",
        paragraphs: [
          "People buy shares mainly hoping to make money in two ways. The first is capital gains: buying a share at one price and later selling it for more. If you buy a share for $50 and sell it for $80, your $30 profit is a capital gain. The second is dividends - regular cash payments some companies send to shareholders out of their profits, often every three months. A stock might pay $2 per share each year, so owning 50 shares would send you $100 annually just for holding them.",
          "Historically, owning shares of strong companies has been one of the most powerful ways to build wealth over long periods. The overall U.S. stock market has returned roughly 7% to 10% per year on average across many decades - far more than a savings account paying 1% or 2%. That gap compounds dramatically over time: $1,000 invested and growing at 8% a year becomes about $4,660 in 20 years, while the same money in a 1% account grows to only about $1,220.",
          "But shares are not a sure thing, and that's the crucial catch. Prices can fall sharply, sometimes 20%, 30%, or more in a bad year, and a company can even go bankrupt and leave shareholders with nothing. That's why investors are usually told not to put money they'll need soon into stocks, and to spread their money across many companies rather than betting everything on one. Shares reward patience and diversification, and they punish people who panic or gamble their rent money on a single hot pick."
        ],
        bullets: [
          "Capital gains come from selling a share for more than you paid for it.",
          "Dividends are regular cash payments some companies send to shareholders from profits.",
          "The U.S. stock market has historically returned about 7%-10% per year on average.",
          "Prices can fall hard, and a bankrupt company can leave shareholders with nothing.",
          "Spreading money across many companies lowers the risk of any single one failing."
        ],
        realWorldExample: "Suppose you buy 20 shares at $40 each ($800 total). A year later the price is $52 and the company paid a $1.50 dividend per share. Your shares are worth $1,040, plus $30 in dividends - a total gain of $270, or about 34%, in one year. But the next year it could just as easily fall."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "stocks1-mc1",
            question: "What does owning a share of stock actually give you?",
            options: [
              "A loan the company must repay you with interest",
              "A small ownership stake in the company",
              "A guaranteed fixed return every single year",
              "A discount on the products the company sells"
            ],
            correctAnswer: 1,
            explanation: "A share is a unit of ownership. Owning one makes you a partial owner of the company - not a lender - so you share in its gains and its losses, with no guaranteed return."
          },
          {
            id: "stocks1-mc2",
            question: "Which of these is a 'capital gain'?",
            options: [
              "A quarterly cash payment drawn straight from a company's profits",
              "Selling a share for more than you paid for it",
              "The interest a savings account quietly adds each single month",
              "A special tax the government charges you each time you invest"
            ],
            correctAnswer: 1,
            explanation: "A capital gain is the profit from selling a share for more than you paid. The quarterly cash payment described is a dividend, which is a separate way shares can make money."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jordan Buys His First Share",
        narrative: "Jordan, 16, saves $300 from a summer job. He learns that a sneaker company he loves is publicly traded at $60 per share. He buys 5 shares for $300, becoming a tiny part-owner. He's excited but also a little nervous, because he knows the price could go either way.",
        details: [
          "By buying 5 shares, Jordan owns a small slice of the whole company, not a loan to it.",
          "If the company grows and shares rise to $75, his stake is worth $375 - a $75 capital gain.",
          "If the company pays a $1 yearly dividend per share, Jordan collects $5 just for holding.",
          "If the company struggles and shares fall to $40, his stake drops to $200, with no guarantee it recovers."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "stocks1-aq1",
          question: "Jordan's 5 shares rose from $60 to $75 each. Why did his stake gain value?",
          options: [
            "The company was legally required to raise the price",
            "The company became more valuable, lifting each share",
            "Dividends are added directly onto the share price",
            "Share prices always rise a fixed amount each year"
          ],
          correctAnswer: 1,
          explanation: "As a company grows more valuable, the value of each ownership slice tends to rise. No law forces prices up, dividends are separate cash, and prices do not rise a guaranteed fixed amount."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A share is a unit of ownership; owning one makes you a partial owner of the company.",
          "Companies sell shares to raise money they don't have to repay like a loan.",
          "Investors profit through capital gains (selling higher) and dividends (profit payments).",
          "Stocks have historically returned about 7%-10% a year, far beating savings accounts.",
          "Shares carry real risk - prices can fall and companies can fail - so spread your money out."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "stocks1-mastery1",
            question: "A company divides itself into 2,000,000 shares and you buy 200. About what fraction do you own?",
            options: [
              "One two-hundredth of the company",
              "One ten-thousandth of the company",
              "One-fifth of the entire company",
              "Two hundred whole companies at once"
            ],
            correctAnswer: 1,
            explanation: "200 divided by 2,000,000 equals 1/10,000. Owning 200 of two million shares gives you one ten-thousandth of the company - a small but real ownership stake."
          },
          {
            id: "stocks1-mastery2",
            question: "How is buying a share different from putting money in a savings account?",
            options: [
              "A share is insured, so you can never lose money",
              "A share is ownership with no guaranteed return",
              "A share always pays more interest than a bank",
              "A share must be sold back within one year"
            ],
            correctAnswer: 1,
            explanation: "A share is ownership, so its value rises and falls with the company and nothing is guaranteed. Savings accounts are insured and pay set interest; shares are neither insured nor guaranteed."
          },
          {
            id: "stocks1-mastery3",
            question: "Which right do shareholders commonly have?",
            options: [
              "Free products from the company forever",
              "A vote on major company decisions",
              "A promise the stock will never drop",
              "The power to fire any single worker"
            ],
            correctAnswer: 1,
            explanation: "Shareholders often vote on big decisions, like electing the board of directors. They don't get free products, guaranteed prices, or the power to fire individual employees."
          },
          {
            id: "stocks1-mastery4",
            question: "You buy a share for $45 and sell it later for $70. The $25 you made is called a…",
            options: [
              "Dividend paid out from profits",
              "Capital gain from the sale",
              "Interest payment from the bank",
              "Refund of your original money"
            ],
            correctAnswer: 1,
            explanation: "Profit from selling a share for more than you paid is a capital gain. Dividends are separate cash payments, and interest and refunds don't describe stock profit."
          },
          {
            id: "stocks1-mastery5",
            question: "Why are investors usually told not to invest money they'll need next month?",
            options: [
              "Stocks are strictly illegal to sell within 30 days",
              "Share prices can fall sharply in the short term",
              "Brokers always freeze your money for a full calendar month",
              "Dividends are only ever paid out after several years"
            ],
            correctAnswer: 1,
            explanation: "Stock prices can drop suddenly, so money needed soon might not be there when you need it. There's no 30-day sale ban, no month-long freeze, and dividends are unrelated to this rule."
          },
          {
            id: "stocks1-mastery6",
            question: "Roughly how has the overall U.S. stock market performed per year over many decades?",
            options: [
              "It has lost about 5% every year on average",
              "It has returned about 7%-10% a year on average",
              "It stays perfectly flat with no change at all, ever",
              "It reliably doubles in value every single year without fail"
            ],
            correctAnswer: 1,
            explanation: "Over long periods the U.S. market has averaged roughly 7%-10% annual returns - far above savings accounts. It doesn't lose money every year, stay flat, or double annually."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // stocks-2: Public vs Private
  // ─────────────────────────────────────────────
  {
    lessonId: "stocks-2",
    sections: [
      {
        type: "concept",
        title: "The Big Divide: Public vs Private Companies",
        paragraphs: [
          "Every company is either public or private, and the difference comes down to who is allowed to own its shares. A private company's shares are held by a small group - usually the founders, early employees, family, and a handful of professional investors. You can't just log into an app and buy a piece of a private company; ownership is tightly controlled and often requires an invitation or a large check. Companies like Mars (the candy maker) and, for years, brands like SpaceX have stayed private on purpose.",
          "A public company, by contrast, has sold shares to the general public through a stock exchange. Anyone with a brokerage account - even a teenager with a custodial account and $50 - can buy shares of a public company like Apple, Coca-Cola, or Disney. Those shares trade freely, meaning owners can sell to other investors any time the market is open. This open access is the defining feature of being 'public': ownership is spread across millions of ordinary people, not locked to a small circle.",
          "Going public is a huge decision. When a private company sells shares to the public for the first time, it 'goes public' through an Initial Public Offering, or IPO. Doing so raises a large amount of money the company can use to grow, and it lets early owners cash out some of their stake. But it comes with a trade-off: public companies must follow strict rules, publish detailed financial reports every quarter, and answer to thousands of shareholders who now own a piece of the business."
        ],
        bullets: [
          "Private companies limit ownership to founders, employees, and select investors.",
          "Public companies sell shares to anyone through a stock exchange.",
          "Public shares trade freely, so owners can buy or sell during market hours.",
          "Going public happens through an IPO, which raises money and lets early owners cash out.",
          "Public companies must publish detailed financial reports and follow strict rules."
        ],
        realWorldExample: "Mars, the maker of M&M's and Snickers, earns tens of billions in sales yet stays private and family-owned - so you cannot buy its stock. Coca-Cola, which is public, lets anyone with a brokerage account buy a share for around $60 whenever the market is open."
      },
      {
        type: "concept",
        title: "Why It Matters to You as an Investor",
        paragraphs: [
          "For a regular investor, the practical difference is simple: you can only easily invest in public companies. Their shares are liquid, meaning they can be bought and sold quickly at a known market price. If you own a public stock and need cash, you can usually sell it in seconds during trading hours. Private company shares are illiquid - hard to sell - because there's no open marketplace and you'd have to find a specific buyer willing to negotiate a price.",
          "Public companies also come with transparency that protects you. Because they must file reports with regulators, you can read exactly how much money the company made, what it owns, and what risks it faces before you invest a single dollar. Private companies keep those numbers secret, so outsiders are often investing partly on trust and reputation. This is a major reason ordinary investors are steered toward public markets: you can actually see what you're buying.",
          "Being public has downsides too, which is why some strong companies avoid it. Public companies face intense pressure to keep their share price rising every quarter, which can push leaders toward short-term decisions instead of long-term bets. They also spend heavily on lawyers, accountants, and reporting. Staying private lets a company focus on the long game and keep its numbers confidential - but it also means everyday investors like you are left out, unable to share in that company's growth."
        ],
        bullets: [
          "Public shares are liquid - easy to buy and sell fast at a known price.",
          "Private shares are illiquid - hard to sell without finding a specific buyer.",
          "Public companies must disclose financials, so you can see what you're buying.",
          "Private companies keep numbers secret, so outsiders invest more on trust.",
          "Staying private avoids short-term price pressure but shuts out everyday investors."
        ],
        realWorldExample: "If you own $1,000 of a public stock and need money, you can sell it in seconds at the current price. If you owned $1,000 of a private startup, you might wait years - until it goes public or gets bought - before you could turn it into cash."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "stocks2-mc1",
            question: "What mainly separates a public company from a private one?",
            options: [
              "Public companies are always larger in total size",
              "Anyone can buy a public company's shares",
              "Private companies never earn any real profit",
              "Public companies pay no taxes at all"
            ],
            correctAnswer: 1,
            explanation: "The defining difference is access: a public company sells shares to anyone through an exchange, while a private company limits ownership to a small group. Size, profit, and taxes aren't the dividing line."
          },
          {
            id: "stocks2-mc2",
            question: "Why are public company shares considered 'liquid'?",
            options: [
              "They can be bought and sold quickly at a known price",
              "They pay out fully guaranteed cash dividends to holders every single month",
              "They are always printed on some rare, special, tear-proof waterproof paper",
              "They can never once lose even a bit of their value"
            ],
            correctAnswer: 0,
            explanation: "Liquidity means you can convert shares to cash fast at a known market price during trading hours. It has nothing to do with guaranteed dividends, paper, or price protection."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Compares Two Companies",
        narrative: "Priya wants to invest $500. She loves two brands: a public sportswear company whose shares trade on an exchange, and a private local gym chain owned by three founders. She researches both and realizes only one is actually available to her.",
        details: [
          "The public sportswear company lets Priya buy shares instantly through her brokerage app.",
          "The private gym chain's shares are held by its founders, with no public marketplace to buy in.",
          "Priya can read the sportswear company's detailed financial reports before investing.",
          "If she ever bought into the private gym, selling her stake could take years and a specific buyer."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "stocks2-aq1",
          question: "Why can Priya invest in the sportswear company but not easily in the private gym?",
          options: [
            "The gym is not profitable enough to sell shares",
            "Only public company shares trade openly to anyone",
            "Private companies are banned from making money",
            "The sportswear company gives its shares away free"
          ],
          correctAnswer: 1,
          explanation: "Only public companies sell shares openly through an exchange, so anyone can buy them. Private shares are restricted to a small group regardless of the company's profits."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Private companies limit ownership to founders, employees, and select investors.",
          "Public companies sell shares to anyone through a stock exchange.",
          "Public shares are liquid and easy to sell; private shares are hard to sell.",
          "Public companies must disclose financials, giving investors real transparency.",
          "A company becomes public through an IPO, gaining money but also strict rules and scrutiny."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "stocks2-mastery1",
            question: "You want to buy shares of a company using a normal brokerage app. The company must be…",
            options: [
              "Private and owned by its founders",
              "Public and listed on an exchange",
              "Brand new and less than a year old",
              "Headquartered inside the United States"
            ],
            correctAnswer: 1,
            explanation: "Only public companies, listed on an exchange, can be bought through a normal brokerage app. Age and location don't matter, and private companies aren't available this way."
          },
          {
            id: "stocks2-mastery2",
            question: "What is an IPO?",
            options: [
              "A special tax public companies pay each quarter",
              "The first sale of shares to the public",
              "A strict rule that forces a company private",
              "A large yearly bonus paid out to shareholders"
            ],
            correctAnswer: 1,
            explanation: "An IPO, or Initial Public Offering, is when a private company first sells shares to the public and becomes public. It's not a tax, a bonus, or a rule forcing privacy."
          },
          {
            id: "stocks2-mastery3",
            question: "Why is transparency a key advantage of public companies for investors?",
            options: [
              "They must publish detailed financial reports",
              "They promise their stock will always rise",
              "They send investors free products yearly",
              "They pay back your investment on demand"
            ],
            correctAnswer: 0,
            explanation: "Public companies must file detailed financials, so you can see the numbers before investing. They make no promises about price, free products, or refunds."
          },
          {
            id: "stocks2-mastery4",
            question: "Why might a strong company choose to stay private?",
            options: [
              "It is legally forbidden from selling shares",
              "It avoids short-term share-price pressure",
              "Private firms never have to pay employees",
              "Being private guarantees higher profits"
            ],
            correctAnswer: 1,
            explanation: "Staying private avoids the quarterly pressure to lift the share price and keeps numbers confidential. It's not a legal ban, and it doesn't erase payroll or guarantee profit."
          },
          {
            id: "stocks2-mastery5",
            question: "Which best describes why private shares are 'illiquid'?",
            options: [
              "They lose value the moment you buy them",
              "There's no open market to sell them fast",
              "They can only be owned by the government",
              "They must be held for exactly ten years"
            ],
            correctAnswer: 1,
            explanation: "Illiquid means hard to sell because there's no open marketplace - you must find a specific buyer. It's not about instant loss, government ownership, or a fixed ten-year rule."
          },
          {
            id: "stocks2-mastery6",
            question: "A downside public companies face that private ones avoid is…",
            options: [
              "They can never hire new employees again",
              "Pressure to keep the share price rising",
              "They are not allowed to earn any profit",
              "They must give shares away for free"
            ],
            correctAnswer: 1,
            explanation: "Public companies feel constant pressure to lift the share price each quarter, which can encourage short-term thinking. They still hire, profit, and sell shares for money."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // stocks-3: IPOs
  // ─────────────────────────────────────────────
  {
    lessonId: "stocks-3",
    sections: [
      {
        type: "concept",
        title: "How a Company Goes Public",
        paragraphs: [
          "An IPO - Initial Public Offering - is the moment a private company sells its shares to the public for the very first time. Before the IPO, only founders and a few investors own the company. After it, anyone can buy in. Companies do this mainly to raise a large pile of money at once. Instead of borrowing, they create new shares and sell them, and the cash goes to the company to build factories, hire people, pay off debt, or expand into new markets.",
          "The process is carefully managed. The company hires investment banks - firms like Goldman Sachs - to act as 'underwriters.' The underwriters study the company, help set an offering price, and find big investors willing to buy in. Together they estimate how much the whole company is worth and divide that into shares. If a company is valued at $2 billion and decides to sell 100 million shares, the math suggests roughly $20 per share, though the final price is fine-tuned based on how much demand there is.",
          "On IPO day, those shares 'list' on an exchange like the NYSE or Nasdaq and begin trading publicly. Early employees and investors often finally get to sell some of their shares and turn years of work into cash. But an IPO also changes the company forever: it now answers to public shareholders, must publish quarterly financial reports, and lives with a stock price that the whole world can watch rise and fall every single day."
        ],
        bullets: [
          "An IPO is the first sale of a company's shares to the public.",
          "Companies IPO mainly to raise a large amount of money to grow.",
          "Investment banks called underwriters set the price and find buyers.",
          "The offering price times the number of shares reflects the company's value.",
          "After the IPO, the company must report earnings and faces daily public scrutiny."
        ],
        realWorldExample: "When a rideshare company held its IPO, underwriters priced shares around $45 and sold tens of millions of them, raising billions for the company. On the first trading day, ordinary investors could finally buy in - and watched the price swing within hours."
      },
      {
        type: "concept",
        title: "The Hype and the Risk of IPOs",
        paragraphs: [
          "IPOs get enormous attention, and investors often assume a hot new stock is a guaranteed winner. It isn't. The people who set the IPO price - the company and its underwriters - want to raise as much money as possible, so the price is designed to be favorable to the sellers, not to be a bargain for you. On the first day, prices can spike on excitement, then fall hard once the hype fades and reality sets in. Chasing that first-day pop is one of the riskiest moves a new investor can make.",
          "There's also an information gap. A company that has been public for years has a long track record you can study: how sales grew, whether it makes a profit, how it handled tough times. A brand-new public company has almost none of that. You're mostly relying on a glossy prospectus written to make the company look appealing, plus a lot of media buzz. Without a track record, it's far harder to judge whether the price makes sense.",
          "History is full of IPOs that soared and then crashed. Some companies IPO before they've ever earned a profit, betting they'll grow into their valuation - and some never do. That's why experienced investors often wait months or even years after an IPO, letting the price settle and gathering real earnings data before buying. The lesson isn't that IPOs are always bad, but that the excitement around them can trick people into overpaying for something they don't fully understand."
        ],
        bullets: [
          "IPO prices favor the company and underwriters, not necessarily the buyer.",
          "First-day price spikes often fade, so chasing the pop is risky.",
          "New public companies have little track record to study.",
          "Some companies IPO before ever earning a profit, betting on future growth.",
          "Many investors wait months or years to let the price and data settle."
        ],
        realWorldExample: "A social media app IPO'd at $38 a share amid huge hype in 2012. Within months the price fell below $20 as growth doubts spread - buyers who paid IPO-day prices lost nearly half. Years later it recovered, but early chasers took a painful ride."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "stocks3-mc1",
            question: "What is the main reason a company holds an IPO?",
            options: [
              "To avoid ever paying any taxes again",
              "To raise a large amount of money",
              "To become smaller and simpler to run",
              "To guarantee its stock price only rises"
            ],
            correctAnswer: 1,
            explanation: "Companies IPO chiefly to raise a large sum of money to grow by selling new shares to the public. It doesn't avoid taxes, shrink the company, or guarantee the price."
          },
          {
            id: "stocks3-mc2",
            question: "Who helps set the IPO price and find buyers?",
            options: [
              "Government tax collectors and auditors",
              "Investment banks acting as underwriters",
              "The company's everyday retail customers",
              "Random members of the general public"
            ],
            correctAnswer: 1,
            explanation: "Investment banks serve as underwriters: they value the company, set the offering price, and line up big investors. Tax collectors, customers, and the public don't set the price."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Eyes a Hot IPO",
        narrative: "A trendy electric-scooter company is about to IPO, and social media is buzzing that it will 'go to the moon.' Marcus, a new investor, feels the urge to buy on the first day at any price. He pauses to think about what he actually knows about the company.",
        details: [
          "The IPO price was set by underwriters who want to raise the most money for the company.",
          "The company has been public for zero days, so there's no long track record to study.",
          "First-day excitement could spike the price, then drop once the hype cools off.",
          "Marcus realizes he could wait, watch a few earnings reports, then decide with real data."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "stocks3-aq1",
          question: "Why is buying a hyped IPO on its first day especially risky for Marcus?",
          options: [
            "IPO shares can legally never be resold later",
            "The price may spike on hype, then fall",
            "First-day buyers must hold shares for a decade",
            "IPO stocks are always guaranteed to lose money"
          ],
          correctAnswer: 1,
          explanation: "First-day hype can inflate the price, which often drops once excitement fades and there's little track record to judge value. IPO shares can be resold, aren't locked for a decade, and aren't guaranteed losers."
        }
      },
      {
        type: "recap",
        takeaways: [
          "An IPO is a company's first sale of shares to the public, done mainly to raise money.",
          "Underwriters (investment banks) set the price and find large buyers.",
          "IPO prices favor the seller, and first-day pops often fade.",
          "New public companies have little track record, making them hard to value.",
          "Many smart investors wait for real earnings data before buying a new IPO."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "stocks3-mastery1",
            question: "Before its IPO, who owns a company?",
            options: [
              "Millions of everyday public investors",
              "Founders and a few early investors",
              "The stock exchange it will list on",
              "The government that approves the sale"
            ],
            correctAnswer: 1,
            explanation: "Before an IPO, ownership is limited to founders and a small group of early investors. The public, exchanges, and government don't own the private company."
          },
          {
            id: "stocks3-mastery2",
            question: "A company valued at $3 billion plans to sell 150 million shares. Roughly what price does that suggest?",
            options: [
              "About $2 per share",
              "About $20 per share",
              "About $200 per share",
              "About $2,000 per share"
            ],
            correctAnswer: 1,
            explanation: "$3 billion divided by 150 million shares is about $20 per share. The final price is fine-tuned by demand, but the math points to roughly $20."
          },
          {
            id: "stocks3-mastery3",
            question: "Why does the IPO price tend to favor the company, not the buyer?",
            options: [
              "Buyers secretly choose the whole price themselves",
              "Sellers want to raise the most money",
              "The government always forces prices artificially low",
              "Underwriters simply give the shares away for free"
            ],
            correctAnswer: 1,
            explanation: "The company and underwriters set the price to raise as much money as possible, so it favors the seller. Buyers don't set it, it's not forced low, and shares aren't free."
          },
          {
            id: "stocks3-mastery4",
            question: "What makes a brand-new public company hard to evaluate?",
            options: [
              "It has almost no public track record yet",
              "Its shares can never actually be openly traded",
              "It is not allowed to publish any numbers",
              "Its price is fixed and simply never changes"
            ],
            correctAnswer: 0,
            explanation: "A new public company lacks a long history of results to study, so judging its value is harder. Its shares do trade, it must publish numbers, and its price changes daily."
          },
          {
            id: "stocks3-mastery5",
            question: "Why do many experienced investors wait after an IPO before buying?",
            options: [
              "The law bans buying for the first year",
              "To gather real earnings data first",
              "Waiting doubles the dividends they receive",
              "Shares are cheaper only on weekends"
            ],
            correctAnswer: 1,
            explanation: "Waiting lets the price settle and gives investors real earnings reports to judge the company. There's no one-year ban, no doubled dividends, and no weekend discount."
          },
          {
            id: "stocks3-mastery6",
            question: "After an IPO, what new obligation does the company take on?",
            options: [
              "It must publish regular financial reports",
              "It must buy back all its shares yearly",
              "It must keep its stock price fixed",
              "It must stop selling any products"
            ],
            correctAnswer: 0,
            explanation: "Public companies must file regular financial reports and answer to shareholders. They don't have to buy back shares, fix the price, or stop selling products."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // stocks-4: Market Cap
  // ─────────────────────────────────────────────
  {
    lessonId: "stocks-4",
    sections: [
      {
        type: "concept",
        title: "What Market Capitalization Measures",
        paragraphs: [
          "Market capitalization - 'market cap' for short - is the total value of all a company's shares added together. The formula is simple: share price multiplied by the number of shares that exist. If a company has 10 million shares and each trades at $50, its market cap is $500 million. Market cap answers the question 'How much is this whole company worth in the market's eyes right now?' - and it's the number investors use to compare the true size of companies.",
          "This matters because share price alone is misleading. A stock priced at $500 is not necessarily 'bigger' than one priced at $10. What counts is price times share count. A $10 stock with 50 billion shares (a $500 billion company) is far larger than a $500 stock with only 1 million shares (a $500 million company). Beginners often assume a high price means a huge company, but that's a trap - you have to multiply by the number of shares to get the real size.",
          "Investors sort companies into buckets by market cap. Large-cap companies (roughly $10 billion and up) are usually established giants - think household names that are relatively stable. Mid-cap companies (about $2 billion to $10 billion) are growing but less proven. Small-cap companies (under $2 billion) tend to be younger and riskier, but they have more room to grow quickly. Knowing a company's cap tells you a lot about what kind of investment it is before you dig into anything else."
        ],
        bullets: [
          "Market cap = share price multiplied by the total number of shares.",
          "It measures the whole company's value, not just one share's price.",
          "A high share price does NOT automatically mean a big company.",
          "Large-cap (~$10B+) firms are usually established and more stable.",
          "Small-cap (under ~$2B) firms are riskier but can grow faster."
        ],
        realWorldExample: "Company A trades at $600 a share but has only 2 million shares, so its market cap is $1.2 billion. Company B trades at $30 a share with 500 million shares, giving a $15 billion cap. Despite the lower price, Company B is more than ten times larger."
      },
      {
        type: "concept",
        title: "Using Market Cap to Judge Risk and Comparison",
        paragraphs: [
          "Market cap is one of the fastest ways to gauge risk. Large-cap companies have survived years of ups and downs, hold big cash reserves, and rarely vanish overnight, so their stocks tend to move more gently. Small-cap companies are less tested; a single bad quarter or lost contract can send their shares tumbling 30% or more. Neither is 'better' - large caps offer stability while small caps offer growth potential - but the cap tells you which kind of ride to expect.",
          "Market cap also lets you compare companies fairly, even across industries. Two companies could have wildly different share prices, but if both have a $50 billion market cap, the market values them similarly overall. That's why financial news ranks companies by market cap, not share price, when it lists the 'biggest' companies in the world. It's the apples-to-apples number that cuts through the confusion of different share prices and share counts.",
          "One caution: market cap reflects the value of a company's stock, not the whole business including its debts. A more complete measure called 'enterprise value' also adds in debt and subtracts cash, which matters for serious analysis. But for a beginner comparing companies, market cap is the essential first number. It instantly tells you whether you're looking at a $2 billion up-and-comer or a $2 trillion titan - a distinction that changes how much risk and growth you should expect."
        ],
        bullets: [
          "Large-cap stocks tend to be steadier; small-cap stocks swing more.",
          "Market cap lets you compare company size fairly across industries.",
          "News ranks the 'biggest' companies by market cap, not share price.",
          "Market cap counts only stock value, not the company's debt.",
          "A fuller measure, enterprise value, adds debt and subtracts cash."
        ],
        realWorldExample: "A $2 trillion large-cap giant might drop 3% on bad news and recover in weeks. A $500 million small-cap could fall 35% on the same type of news and take years to recover - or never do. Same event, very different impact, because of size."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "stocks4-mc1",
            question: "How do you calculate a company's market cap?",
            options: [
              "Add up all its yearly profits over time",
              "Multiply share price by the number of shares",
              "Subtract its debts from its cash on hand",
              "Divide the share price by its yearly sales"
            ],
            correctAnswer: 1,
            explanation: "Market cap is share price times the total number of shares. It measures the whole company's stock value, not profits, debt, or a per-sales ratio."
          },
          {
            id: "stocks4-mc2",
            question: "A $400 stock with 1 million shares versus a $20 stock with 900 million shares. Which company is bigger?",
            options: [
              "The $400 stock, because its per-share price is higher",
              "The $20 stock, because of its huge share count",
              "They are always exactly equal in total company size",
              "You simply cannot compare the two of them at all"
            ],
            correctAnswer: 1,
            explanation: "The $400 stock's cap is $400 million; the $20 stock's cap is $18 billion. The lower-priced stock is far bigger because market cap depends on price times share count."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nia Compares Two Stocks",
        narrative: "Nia is choosing between two companies. Company X trades at $250 per share; Company Y trades at $15. She initially assumes X must be the bigger, safer company because its price is so much higher. Then she checks how many shares each has.",
        details: [
          "Company X has 4 million shares, giving a market cap of $1 billion (a small-cap).",
          "Company Y has 8 billion shares, giving a market cap of $120 billion (a large-cap).",
          "Despite the lower price, Company Y is far larger and likely more stable.",
          "Company X's small size means its shares could swing much more sharply."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "stocks4-aq1",
          question: "Nia assumed the $250 stock was bigger. Why was she wrong?",
          options: [
            "Higher-priced stocks are always far riskier to actually own",
            "Size depends on price times share count, not price",
            "Cheaper stocks always belong to the very biggest companies",
            "Share price and true company size are wholly unrelated entirely"
          ],
          correctAnswer: 1,
          explanation: "Company size is measured by market cap - price times share count - so a low-priced stock with many shares can be far bigger. Price alone tells you almost nothing about size."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Market cap = share price times the total number of shares.",
          "A high share price does not mean a big company; you must multiply by share count.",
          "Companies are grouped into large-cap, mid-cap, and small-cap by size.",
          "Large caps are steadier; small caps are riskier but can grow faster.",
          "Market cap is the fair way to compare company sizes across industries."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "stocks4-mastery1",
            question: "A company has 20 million shares trading at $25 each. What is its market cap?",
            options: [
              "$25 million total",
              "$500 million total",
              "$20 million total",
              "$5 billion total"
            ],
            correctAnswer: 1,
            explanation: "20 million shares times $25 equals $500 million. Market cap is always price multiplied by the number of shares."
          },
          {
            id: "stocks4-mastery2",
            question: "Why can't you judge a company's size by its share price alone?",
            options: [
              "Prices are fake and set by the government",
              "Size also depends on how many shares exist",
              "Every single company has exactly the same shares",
              "Share prices change only once per calendar year"
            ],
            correctAnswer: 1,
            explanation: "Size is price times share count, so the number of shares matters just as much as price. Prices aren't fake, share counts differ widely, and prices change constantly."
          },
          {
            id: "stocks4-mastery3",
            question: "Which describes a typical large-cap company?",
            options: [
              "A tiny new startup worth well under $50 million total",
              "An established firm worth $10 billion or more",
              "A company with exactly one single named shareholder",
              "A business that has never sold any shares"
            ],
            correctAnswer: 1,
            explanation: "Large-cap firms are established companies worth roughly $10 billion or more, usually steadier. Tiny startups are small-caps, and the other options don't describe public companies."
          },
          {
            id: "stocks4-mastery4",
            question: "Why do small-cap stocks tend to be riskier than large-cap stocks?",
            options: [
              "They are less tested and swing more sharply",
              "They are legally required by law to lose value",
              "They can never be sold on an exchange",
              "They always pay out much larger cash dividends"
            ],
            correctAnswer: 0,
            explanation: "Small caps are younger and less proven, so their prices can swing sharply on a single event. They can be traded, aren't forced to lose value, and often pay little or no dividend."
          },
          {
            id: "stocks4-mastery5",
            question: "When news lists the 'biggest companies in the world,' it ranks them by…",
            options: [
              "Their single share price",
              "Their market capitalization",
              "The age of the company",
              "The number of employees only"
            ],
            correctAnswer: 1,
            explanation: "The 'biggest' companies are ranked by market cap, the fair measure of total size. Share price, age, and headcount don't measure overall market value."
          },
          {
            id: "stocks4-mastery6",
            question: "Market cap measures the value of a company's stock but leaves out…",
            options: [
              "The company's debt",
              "The current share price",
              "The number of shares",
              "The company's industry"
            ],
            correctAnswer: 0,
            explanation: "Market cap counts stock value only and ignores debt; a fuller measure called enterprise value adds debt and subtracts cash. Price and share count are exactly what it includes."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // stocks-5: Dividends
  // ─────────────────────────────────────────────
  {
    lessonId: "stocks-5",
    sections: [
      {
        type: "concept",
        title: "How Companies Share Profits",
        paragraphs: [
          "A dividend is a portion of a company's profits paid out to shareholders in cash, usually every three months. When a company earns more money than it needs to run and grow the business, its board of directors may decide to hand some of that profit back to the owners - the shareholders. If you own 100 shares of a company that pays a $0.50 quarterly dividend, you'd receive $50 every quarter, or $200 a year, simply for holding the stock. It's like getting a small paycheck just for being an owner.",
          "Not every company pays dividends, and that's an important choice, not a flaw. Mature, stable companies - think big beverage, utility, or consumer-goods firms - often pay steady dividends because they don't need to reinvest every dollar to keep growing. Fast-growing companies, especially in tech, frequently pay no dividend at all. Instead they pour every dollar back into the business to grow faster, betting that a rising share price will reward shareholders more than a cash payment would.",
          "Investors measure dividends using the 'dividend yield,' which is the yearly dividend divided by the share price, shown as a percentage. A stock at $100 paying $3 a year has a 3% yield. Yield lets you compare the income from different stocks quickly. But beware: a sky-high yield can be a warning sign. If a share price has crashed, the yield looks huge, but it may signal the company is in trouble and could cut the dividend soon."
        ],
        bullets: [
          "A dividend is company profit paid to shareholders, often quarterly, in cash.",
          "The board of directors decides whether and how much to pay.",
          "Stable, mature companies often pay dividends; fast-growing ones often don't.",
          "Dividend yield = yearly dividend divided by share price, shown as a percent.",
          "An unusually high yield can be a red flag, not a bargain."
        ],
        realWorldExample: "A beverage giant might pay $1.84 per share a year. Own 200 shares and you collect $368 annually, split into four payments. At a $60 share price, that's a yield of about 3% - modest, but steady cash arriving whether the stock rises or falls that year."
      },
      {
        type: "concept",
        title: "Reinvesting Dividends and the Power of Compounding",
        paragraphs: [
          "Dividends become truly powerful when you reinvest them - using each payment to buy more shares instead of spending the cash. This is often automated through a Dividend Reinvestment Plan (DRIP). Each new share then pays its own dividends, which buy still more shares, creating a snowball. Over decades this compounding can dramatically boost returns. Studies of the long-term U.S. market show that reinvested dividends account for a large share of investors' total gains - often close to a third or more.",
          "Here's a concrete picture. Suppose you own $10,000 of a stock paying a 3% dividend that also grows its payout and price modestly over time. Spending the dividends, you'd pocket about $300 a year. Reinvesting them instead, that $300 buys more shares, which next year pay dividends on a slightly larger base, and so on. Over 30 years, the reinvested version can end up worth far more - sometimes twice as much - than the version where you spent every payment.",
          "Dividends also offer a psychological benefit: they pay you even when prices are flat or falling. In a rough year when a stock's price goes nowhere, a 3% dividend still puts real cash in your account, which can make it easier to stay invested instead of panic-selling. That said, dividends are never guaranteed - a struggling company can cut or eliminate them at any time. So investors look for companies with a long history of steady, growing payouts rather than chasing the biggest current number."
        ],
        bullets: [
          "Reinvesting dividends buys more shares, which pay their own dividends - a snowball.",
          "A DRIP automates dividend reinvestment for you.",
          "Reinvested dividends have driven a large share of long-term market gains.",
          "Dividends pay you even when the share price is flat or falling.",
          "Dividends aren't guaranteed; struggling companies can cut them."
        ],
        realWorldExample: "Two investors each buy $10,000 of the same 3% dividend stock. One spends every dividend; the other reinvests. After 30 years of similar growth, the reinvesting investor's account can be worth roughly twice as much - the difference is pure compounding from reinvested payments."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "stocks5-mc1",
            question: "What is a dividend?",
            options: [
              "A loan shareholders must repay the company",
              "Company profit paid out to shareholders",
              "A fee charged for buying a stock",
              "A tax the government takes from profits"
            ],
            correctAnswer: 1,
            explanation: "A dividend is a share of company profits paid to shareholders, usually as quarterly cash. It's not a loan, a trading fee, or a tax."
          },
          {
            id: "stocks5-mc2",
            question: "How is dividend yield calculated?",
            options: [
              "Share price divided by yearly dividend",
              "Yearly dividend divided by share price",
              "Total profit divided by number of workers",
              "Share price multiplied by the dividend"
            ],
            correctAnswer: 1,
            explanation: "Dividend yield is the yearly dividend divided by the share price, shown as a percent. It lets you compare the income different stocks provide relative to their price."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sofia Chooses Between Two Stocks",
        narrative: "Sofia has $5,000 to invest for the long term. Stock A is a mature utility paying a steady 3% dividend. Stock B is a fast-growing tech company that pays no dividend, reinvesting all profits to grow. She wonders which fits a patient, decades-long plan.",
        details: [
          "Stock A would pay Sofia about $150 a year, which she could reinvest to buy more shares.",
          "Stock B pays nothing now, betting its rising share price will reward her instead.",
          "If Sofia reinvests Stock A's dividends, each payment buys shares that pay their own dividends.",
          "Neither is guaranteed - Stock A could cut its dividend, and Stock B's price could fall."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "stocks5-aq1",
          question: "If Sofia reinvests Stock A's dividends for decades, what's the main benefit?",
          options: [
            "The dividend becomes legally guaranteed forever",
            "Reinvested payments compound into more shares",
            "The share price can no longer ever fall",
            "She avoids paying any taxes on the gains"
          ],
          correctAnswer: 1,
          explanation: "Reinvesting dividends buys more shares that pay their own dividends, compounding growth over time. It doesn't guarantee the dividend, freeze the price, or erase taxes."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A dividend is company profit paid to shareholders, usually quarterly in cash.",
          "Mature companies often pay dividends; fast-growing firms often reinvest instead.",
          "Dividend yield = yearly dividend divided by share price.",
          "Reinvesting dividends compounds your returns powerfully over decades.",
          "Dividends aren't guaranteed and an unusually high yield can be a warning sign."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "stocks5-mastery1",
            question: "You own 300 shares paying a $0.40 quarterly dividend. How much do you collect per year?",
            options: [
              "$120 per year",
              "$480 per year",
              "$40 per year",
              "$1,200 per year"
            ],
            correctAnswer: 1,
            explanation: "$0.40 times 4 quarters is $1.60 a year per share, and $1.60 times 300 shares equals $480. Quarterly payments must be multiplied by four for the yearly total."
          },
          {
            id: "stocks5-mastery2",
            question: "Why do many fast-growing tech companies pay no dividend?",
            options: [
              "They are legally banned from paying one",
              "They reinvest profits to grow faster",
              "Their shareholders voted against all cash",
              "They never earn any profit at all"
            ],
            correctAnswer: 1,
            explanation: "Growth companies pour profits back into the business, betting a rising share price rewards owners more than cash would. There's no legal ban, and many are quite profitable."
          },
          {
            id: "stocks5-mastery3",
            question: "A stock trades at $80 and pays $4 a year. What is its dividend yield?",
            options: [
              "About 2%",
              "About 5%",
              "About 20%",
              "About 40%"
            ],
            correctAnswer: 1,
            explanation: "$4 divided by $80 equals 0.05, or 5%. Dividend yield is the annual dividend divided by the share price."
          },
          {
            id: "stocks5-mastery4",
            question: "Why can an unusually high dividend yield be a warning sign?",
            options: [
              "High dividend yields are always completely illegal",
              "A crashed price can inflate the yield",
              "Yields above 2% never actually get paid",
              "Companies must always refund any high-yield dividends"
            ],
            correctAnswer: 1,
            explanation: "If the share price has crashed, the yield looks huge but may signal trouble and a possible dividend cut. High yields aren't illegal, do get paid, and aren't refunded."
          },
          {
            id: "stocks5-mastery5",
            question: "What does a DRIP do?",
            options: [
              "Charges a fee each time you sell a share",
              "Automatically reinvests dividends into shares",
              "Guarantees the dividend will never be cut",
              "Converts your shares into company bonds"
            ],
            correctAnswer: 1,
            explanation: "A Dividend Reinvestment Plan automatically uses your dividends to buy more shares, compounding growth. It's not a fee, a guarantee, or a bond conversion."
          },
          {
            id: "stocks5-mastery6",
            question: "One psychological benefit of dividends in a flat market is that they…",
            options: [
              "Force the share price to quickly rise again",
              "Pay you cash even when prices don't move",
              "Cancel out any of the losses you've already taken",
              "Lock all your money away in for several years"
            ],
            correctAnswer: 1,
            explanation: "Dividends deliver real cash even when the price is flat or down, making it easier to stay invested. They don't force prices up, erase losses, or lock up your money."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // stocks-6: Why Prices Move
  // ─────────────────────────────────────────────
  {
    lessonId: "stocks-6",
    sections: [
      {
        type: "concept",
        title: "Prices Reflect Expectations About the Future",
        paragraphs: [
          "A stock's price is not set by the company - it's set by millions of buyers and sellers agreeing on a price moment by moment. At its core, a share price reflects what investors collectively believe the company will be worth in the future. When people expect a company to earn more money down the road, they're willing to pay more for its shares today, and the price rises. When they expect trouble, they pay less, and the price falls. Price is really a giant, constantly-updating vote on the future.",
          "This is why stocks often move on news before anything actually changes at the company. If a phone maker announces a hot new product, its stock might jump the same day - long before a single unit is sold - because investors now expect higher future profits. The reverse happens too: bad news, like a lawsuit or a weak sales forecast, can sink a stock instantly. The company hasn't lost money yet, but expectations about its future have darkened, and price follows expectations.",
          "Earnings reports are the biggest single driver. Every quarter, public companies report how much they made, and investors compare the result to what they expected. A company can post record profits and still see its stock fall if the profits were lower than Wall Street predicted. That's the famous 'beat or miss' - it's not the raw number that moves the price, but how it compares to expectations. This is why a company can have a great quarter and a bad stock day at the same time."
        ],
        bullets: [
          "A share price is set by buyers and sellers, not the company itself.",
          "Price reflects what investors expect the company to be worth in the future.",
          "Stocks often move on news before any real money changes hands.",
          "Earnings reports are the biggest driver of price moves.",
          "What matters is 'beat or miss' - results versus expectations, not raw numbers."
        ],
        realWorldExample: "A company reports a 15% profit increase - great news. But analysts expected 20%, so the stock drops 8% that day. The company earned more than ever, yet the price fell because it missed the expectation baked into the price."
      },
      {
        type: "concept",
        title: "The Many Forces That Push Prices Around",
        paragraphs: [
          "Beyond one company's news, broad forces move stocks. Interest rates set by the Federal Reserve are huge: when rates rise, borrowing gets expensive and future profits look less valuable today, so stocks often fall. The overall economy matters too - fears of a recession can drag down nearly every stock at once, even great companies, because investors expect weaker spending everywhere. This is why your stock can drop on a day the company did nothing wrong; the whole market fell together.",
          "Emotions and psychology also drive prices, sometimes to extremes. Fear can cause panic-selling that pushes prices below what a company is worth, while greed and hype can inflate prices far above reason. Herd behavior - people buying just because others are buying - creates bubbles, and sudden fear creates crashes. In the short run, a stock's price can swing on rumors, social-media buzz, or plain mood, which is why day-to-day moves often look random and irrational.",
          "Here's the key takeaway for a long-term investor: in the short term, prices are noisy and driven by emotion and news, but over the long term, prices tend to track a company's actual profits and growth. As the famous saying goes, the market is a 'voting machine' in the short run and a 'weighing machine' in the long run. That's why smart investors ignore daily jitters and focus on whether a company is genuinely growing its earnings over years."
        ],
        bullets: [
          "Interest rate changes strongly affect stock prices across the market.",
          "Recession fears can drag down nearly all stocks at once.",
          "Fear and greed cause overselling (crashes) and overbuying (bubbles).",
          "Short-term prices are noisy; long-term prices track real profits.",
          "Smart investors focus on years of earnings, not daily swings."
        ],
        realWorldExample: "When the Federal Reserve unexpectedly raises interest rates, broad stock indexes can fall 2%-3% in a single day - thousands of companies dropping together. Most did nothing wrong that day; investors simply revalued future profits under higher rates."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "stocks6-mc1",
            question: "What does a stock's price mainly reflect?",
            options: [
              "The exact cash sitting in the company's bank",
              "Investors' expectations about the future",
              "A price the company sets each morning",
              "The number of employees the company has"
            ],
            correctAnswer: 1,
            explanation: "A share price reflects what investors collectively expect the company to be worth in the future. The company doesn't set it, and it's not its cash balance or headcount."
          },
          {
            id: "stocks6-mc2",
            question: "A company reports record profits but its stock drops. Why is this possible?",
            options: [
              "Profits legally must lower the share price",
              "The profits missed what investors expected",
              "Record profits always cause stocks to fall",
              "The company forgot to report the numbers"
            ],
            correctAnswer: 1,
            explanation: "Prices move on results versus expectations. If record profits still fell short of what analysts predicted, the stock can drop - it's the 'miss,' not the raw number."
          }
        ]
      },
      {
        type: "scenario",
        title: "Dev Watches a Confusing Day",
        narrative: "Dev owns shares of a strong company. One morning the whole market falls 2% after the Federal Reserve raises interest rates, and his stock drops with it - even though the company released no news. Later that week, a rival posts great earnings that beat expectations and its stock soars.",
        details: [
          "Dev's stock fell because higher rates made future profits worth less across the whole market.",
          "The company itself did nothing wrong that day; it dropped with the broad market.",
          "The rival soared because its earnings beat what investors had expected.",
          "Over years, Dev knows prices tend to track real profits, not single noisy days."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "stocks6-aq1",
          question: "Why did Dev's stock fall on the day the Fed raised rates?",
          options: [
            "His own company had quietly reported truly terrible earnings",
            "Higher rates lowered the value of future profits",
            "The exchange forced all prices down by 2%",
            "Dividends are always automatically cut whenever interest rates rise"
          ],
          correctAnswer: 1,
          explanation: "Higher interest rates make future profits worth less today, so stocks often fall market-wide - even companies with no news. The exchange doesn't set prices and dividends aren't auto-cut."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Share prices are set by buyers and sellers and reflect expectations about the future.",
          "Stocks move on news and on earnings compared to expectations ('beat or miss').",
          "Interest rates and recession fears move the whole market at once.",
          "Fear and greed cause short-term crashes and bubbles.",
          "Short-term prices are noisy, but long-term prices track real profits."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "stocks6-mastery1",
            question: "Who actually sets a stock's price at any moment?",
            options: [
              "The company's own single chief executive officer",
              "Buyers and sellers agreeing on a price",
              "The federal government's national income tax office",
              "A small committee at the busy stock exchange"
            ],
            correctAnswer: 1,
            explanation: "Prices are set continuously by buyers and sellers agreeing to trade. The CEO, government, and exchange don't dictate the market price."
          },
          {
            id: "stocks6-mastery2",
            question: "A stock jumps the day a new product is announced, before any sales. Why?",
            options: [
              "Sales revenue is added instantly on announcement",
              "Investors expect higher future profits",
              "The law requires a jump after announcements",
              "The company deposited cash into the market"
            ],
            correctAnswer: 1,
            explanation: "Prices move on expectations, so good news lifts a stock before any money is made. No revenue is booked instantly, no law requires it, and no cash is deposited."
          },
          {
            id: "stocks6-mastery3",
            question: "The phrase 'beat or miss' refers to comparing a company's results to…",
            options: [
              "Its results from exactly ten years earlier",
              "What investors expected the results to be",
              "The number of shares it has issued",
              "The results of one random rival competitor"
            ],
            correctAnswer: 1,
            explanation: "'Beat or miss' compares actual results to what investors expected. Prices react to that gap, not to old results, share count, or an unrelated competitor."
          },
          {
            id: "stocks6-mastery4",
            question: "Why might nearly every stock fall on the same day?",
            options: [
              "Each single company failed on the very same day",
              "A broad force like rate hikes hit the market",
              "The exchange randomly lowers all of the listed prices",
              "Shareholders are all legally required to always sell together"
            ],
            correctAnswer: 1,
            explanation: "Broad forces like interest-rate changes or recession fears can drag the whole market down at once. It's not that every company failed or that anyone is forced to sell."
          },
          {
            id: "stocks6-mastery5",
            question: "In the short term, what often makes stock prices swing unpredictably?",
            options: [
              "Fear, greed, rumors, and market mood",
              "Only the company's exact cash balance",
              "A fixed schedule set by the government",
              "The number of years the company existed"
            ],
            correctAnswer: 0,
            explanation: "Short-term prices are driven by emotion, rumors, and mood, making daily moves look random. They aren't set by cash balances, government schedules, or company age."
          },
          {
            id: "stocks6-mastery6",
            question: "The 'weighing machine' idea says that over the long run, prices track…",
            options: [
              "A company's actual profits and growth",
              "How loud the media hype gets",
              "The total number of daily traders",
              "The mood of investors that morning"
            ],
            correctAnswer: 0,
            explanation: "Long term, prices weigh real profits and growth, even though the short term is a noisy 'voting machine.' Hype, trader counts, and morning mood are short-run noise."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // stocks-7: Supply & Demand
  // ─────────────────────────────────────────────
  {
    lessonId: "stocks-7",
    sections: [
      {
        type: "concept",
        title: "Prices Come From Buyers and Sellers Meeting",
        paragraphs: [
          "Every stock price is really the meeting point of two forces: demand (people who want to buy) and supply (people who want to sell). A trade only happens when a buyer and a seller agree on a price. If more people want to buy a stock than sell it, buyers must offer higher prices to tempt sellers, and the price rises. If more people want to sell than buy, sellers must accept lower prices to find takers, and the price falls. That tug-of-war, happening thousands of times a second, sets the price.",
          "It helps to picture the actual mechanics. At any moment, buyers post the highest price they'll pay (the 'bid') and sellers post the lowest they'll accept (the 'ask'). The gap between them is the 'spread.' A trade executes when someone agrees to cross that gap. When demand surges - say everyone suddenly wants a hot stock - buyers keep raising their bids to beat each other, and the price climbs quickly. When fear hits, sellers slash their asks to get out, and the price tumbles.",
          "Crucially, the number of shares a company has is fairly fixed in the short run, so it's shifts in demand that usually move prices fast. This is why a single piece of news can send a stock soaring or crashing within minutes: the news changes how many people want to buy versus sell, and the price instantly adjusts to find a new balance. Nobody 'decides' the new price - it emerges from the crowd of buyers and sellers rebalancing."
        ],
        bullets: [
          "A stock's price is where buyers' demand meets sellers' supply.",
          "More buyers than sellers pushes the price up; more sellers pushes it down.",
          "The 'bid' is the top price buyers offer; the 'ask' is the lowest sellers accept.",
          "The gap between bid and ask is called the spread.",
          "Share count is fairly fixed short-term, so demand shifts move prices fast."
        ],
        realWorldExample: "Imagine a concert with 100 tickets and 500 fans wanting them. Fans outbid each other and prices soar. Now imagine 100 tickets and only 20 interested fans - sellers must drop prices to sell. Stocks work the same way: demand versus available supply sets the price."
      },
      {
        type: "concept",
        title: "What Shifts Supply and Demand",
        paragraphs: [
          "Many things can shift demand for a stock. Good news - strong earnings, a new product, an upgrade from analysts - makes more people want to buy, raising demand and price. Bad news does the opposite. Big institutional investors, like pension funds moving millions of dollars, can shift demand dramatically in a single order. Even emotions count: hype and fear of missing out (FOMO) can flood a stock with buyers, while panic can flood it with sellers, sometimes detached from the company's real value.",
          "Supply can shift too. When a company issues new shares (for example, to raise money), it increases the supply, which can push the price down if demand doesn't rise to match. The opposite happens with a 'buyback,' when a company purchases its own shares off the market - that shrinks supply and can lift the price. 'Lock-up' periods after IPOs also matter: when insiders are finally allowed to sell, a wave of new supply can hit the market and pressure the price lower.",
          "Understanding supply and demand explains otherwise puzzling behavior. A small company with few shares available (low supply) can see wild price swings on modest buying, because a little extra demand competes for scarce shares. A giant company with billions of shares absorbs big orders more smoothly. This is also why 'liquidity' matters - a stock with many active buyers and sellers has a tight spread and stable pricing, while a thinly-traded stock can jump around on small trades."
        ],
        bullets: [
          "Good news raises demand; bad news lowers it, moving the price.",
          "Large institutional orders can shift demand sharply on their own.",
          "Issuing new shares increases supply and can lower the price.",
          "Buybacks shrink supply and can raise the price.",
          "Stocks with few shares available swing more on small demand changes."
        ],
        realWorldExample: "A company announces it will buy back $10 billion of its own stock. That shrinks the supply of available shares, and with demand steady, the price often rises - one reason companies use buybacks to reward shareholders."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "stocks7-mc1",
            question: "What happens when far more people want to buy a stock than sell it?",
            options: [
              "The price falls to attract more sellers",
              "The price rises as buyers compete",
              "The price stays frozen until tomorrow",
              "The company must issue a refund"
            ],
            correctAnswer: 1,
            explanation: "When demand exceeds supply, buyers raise their offers to win scarce shares, pushing the price up. Prices don't freeze or trigger refunds when buyers outnumber sellers."
          },
          {
            id: "stocks7-mc2",
            question: "What is the 'spread'?",
            options: [
              "The special tax charged on each single stock trade",
              "The gap between the bid and ask prices",
              "The yearly cash dividend that a company pays out",
              "The total number of shares a company has"
            ],
            correctAnswer: 1,
            explanation: "The spread is the gap between the highest price buyers will pay (bid) and the lowest sellers will accept (ask). It's not a tax, a dividend, or a share count."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Watches a Stock Spike",
        narrative: "A small company with relatively few shares available suddenly gets praised by a popular investor online. Within an hour, a flood of new buyers rushes in while few holders want to sell. Leo notices the price jumping far faster than for a giant company he also follows.",
        details: [
          "Demand surged as many buyers rushed in, but the supply of shares stayed limited.",
          "With few shares available, buyers competed hard, driving the price up sharply.",
          "The giant company he follows barely moved because it has billions of shares to absorb orders.",
          "If the hype fades and sellers flood back, the small stock could drop just as fast."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "stocks7-aq1",
          question: "Why did the small company's price spike more than the giant's?",
          options: [
            "Small companies always earn far more money overall",
            "Its limited shares made demand push prices harder",
            "Giant companies are always legally capped in price",
            "Small stocks pay out much larger dividends daily"
          ],
          correctAnswer: 1,
          explanation: "With few shares available, a surge of buyers competes for scarce supply, so the price jumps sharply. Giant companies have many shares to absorb the same demand more smoothly."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A stock's price is where buyer demand and seller supply meet.",
          "More buyers than sellers pushes prices up; more sellers pushes them down.",
          "Bid, ask, and spread describe the prices buyers and sellers post.",
          "News, big investors, and emotions shift demand and move prices.",
          "New shares add supply (price down); buybacks shrink supply (price up)."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "stocks7-mastery1",
            question: "A trade happens only when…",
            options: [
              "The federal government first approves the whole sale",
              "A buyer and seller agree on a price",
              "The company itself first decides to allow it",
              "The stock's own price reaches exactly down to zero"
            ],
            correctAnswer: 1,
            explanation: "A trade executes when a buyer and seller agree on a price, meeting supply and demand. The government, company, and a zero price aren't required for a trade."
          },
          {
            id: "stocks7-mastery2",
            question: "What is the 'bid' in a stock quote?",
            options: [
              "The highest price a buyer will pay",
              "The lowest price a seller will accept",
              "The average price over the past year",
              "The fee a broker charges to trade"
            ],
            correctAnswer: 0,
            explanation: "The bid is the highest price buyers are willing to pay. The lowest price sellers accept is the ask; the bid and ask together form the spread."
          },
          {
            id: "stocks7-mastery3",
            question: "When a company issues many new shares, what usually happens to the price?",
            options: [
              "It tends to fall as supply increases",
              "It is legally frozen for one year",
              "It always doubles fully overnight without any warning",
              "It becomes completely impossible to ever openly trade"
            ],
            correctAnswer: 0,
            explanation: "New shares increase supply, which can push the price down if demand doesn't rise to match. The price isn't frozen, doubled, or made untradeable."
          },
          {
            id: "stocks7-mastery4",
            question: "How does a share buyback tend to affect the price?",
            options: [
              "It shrinks supply and can lift the price",
              "It adds fresh supply and thus lowers the price",
              "It has no possible effect at all on price",
              "It always forces the whole company to go private"
            ],
            correctAnswer: 0,
            explanation: "A buyback removes shares from the market, shrinking supply, which can raise the price if demand holds. It doesn't add supply or automatically take the company private."
          },
          {
            id: "stocks7-mastery5",
            question: "Why can a small company's stock swing wildly on modest buying?",
            options: [
              "Small firms are required to be volatile",
              "Few available shares magnify demand changes",
              "Small stocks ignore supply and demand",
              "Their prices are set once each week"
            ],
            correctAnswer: 1,
            explanation: "With few shares available, a little extra demand competes for scarce supply, causing big swings. Small stocks still obey supply and demand and trade continuously."
          },
          {
            id: "stocks7-mastery6",
            question: "Which force can flood a stock with buyers and detach its price from real value?",
            options: [
              "A strictly required official government price schedule",
              "Hype and fear of missing out (FOMO)",
              "The company's own fixed quarterly dividend payment",
              "The stock exchange's daily opening bell time"
            ],
            correctAnswer: 1,
            explanation: "Emotions like hype and FOMO can flood a stock with buyers, pushing the price above its real value. Government schedules, dividends, and the opening bell don't do this."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // stocks-8: Order Types
  // ─────────────────────────────────────────────
  {
    lessonId: "stocks-8",
    sections: [
      {
        type: "concept",
        title: "Market Orders vs Limit Orders",
        paragraphs: [
          "When you buy or sell a stock, you don't just click 'buy' - you choose an order type that tells your broker exactly how to handle the trade. The two you'll use most are market orders and limit orders. A market order says 'buy or sell right now at the best available price.' It executes almost instantly, which is its big advantage. The catch is you don't control the exact price - in a fast-moving or thinly-traded stock, you might pay a bit more (or sell for a bit less) than the price you saw a second ago.",
          "A limit order gives you control over price. You set the maximum you're willing to pay when buying, or the minimum you'll accept when selling, and the trade only happens at that price or better. If you place a limit buy at $50 and the stock never drops to $50, your order simply won't fill. The trade-off is clear: a market order guarantees execution but not price, while a limit order guarantees price but not execution. Neither is 'better' - they solve different problems.",
          "Choosing between them depends on your goal. Buying a giant, heavily-traded stock like a major index fund? A market order is fine, since the price barely moves between your click and the fill. Buying a small, jumpy stock, or trying to buy only if the price dips to a target? Use a limit order so you don't overpay in a sudden spike. Beginners who blindly use market orders on volatile stocks sometimes get filled at surprisingly bad prices - a classic avoidable mistake."
        ],
        bullets: [
          "An order type tells your broker how to handle your trade, not just to buy or sell.",
          "A market order executes instantly at the best available price - fast but not price-controlled.",
          "A limit order sets your price; it fills only at that price or better, or not at all.",
          "Market = guaranteed execution, not price; limit = guaranteed price, not execution.",
          "Use limit orders on jumpy or thinly-traded stocks to avoid overpaying."
        ],
        realWorldExample: "You want a stock trading at $50. A market order buys it now, maybe filling at $50.10 if the price ticks up. A limit order set at $50 only buys if it's available at $50 or less - protecting you from overpaying, but risking no fill if it never drops back."
      },
      {
        type: "concept",
        title: "Stop Orders and Protecting Yourself",
        paragraphs: [
          "A stop order (often called a 'stop-loss') is a tool to limit losses or lock in gains automatically. You set a trigger price; if the stock hits it, your stop order activates and sells. For example, if you own a stock at $100 and set a stop-loss at $90, the moment the price falls to $90 your order kicks in to sell, capping your loss at roughly 10%. It's like a safety net that acts even when you're asleep or not watching the market.",
          "But stops have a subtle risk you must understand. A basic stop order becomes a market order once triggered, so it sells at the next available price - which in a fast crash could be well below your $90 trigger. During sudden drops, stops can fill far lower than expected. A 'stop-limit' order adds a price floor to fix this, but then it might not fill at all if the price blows past your limit. Every protective tool has a trade-off between certainty of execution and certainty of price.",
          "Order types also include timing rules. A 'day' order expires at the end of the trading day if it doesn't fill, while a 'good-till-canceled' (GTC) order stays active for days or weeks until it executes or you cancel it. Knowing these options helps you trade deliberately instead of emotionally. The big lesson: orders let you plan your trades in advance - your buy price, your exit, your safety net - so you're not making rushed decisions in the heat of a scary or exciting market moment."
        ],
        bullets: [
          "A stop-loss order automatically sells if the price falls to your trigger.",
          "A basic stop becomes a market order once triggered, so the fill price can be lower than expected.",
          "A stop-limit adds a price floor but may not fill in a fast crash.",
          "'Day' orders expire that day; 'good-till-canceled' orders stay active longer.",
          "Orders let you plan buys, exits, and safety nets in advance, reducing emotional trades."
        ],
        realWorldExample: "You buy a stock at $100 and set a stop-loss at $90. Overnight, bad news breaks and it opens at $80. Your stop triggers but sells at about $80, not $90, because the price gapped down past your trigger before anyone could buy at $90."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "stocks8-mc1",
            question: "What does a market order guarantee?",
            options: [
              "The exact price you saw on screen",
              "Fast execution at the best available price",
              "That the trade will never actually fill",
              "A lower price than everyone else pays"
            ],
            correctAnswer: 1,
            explanation: "A market order guarantees quick execution at the best available price, but not the exact price. It doesn't lock a price or promise a discount, and it does fill."
          },
          {
            id: "stocks8-mc2",
            question: "What does a limit buy order do?",
            options: [
              "Buys instantly no matter the current listed price",
              "Buys only at your set price or better",
              "Forces the price down to your exact target",
              "Sells all your shares at the day's high"
            ],
            correctAnswer: 1,
            explanation: "A limit buy fills only at your chosen price or lower, giving you price control. It doesn't buy at any price, move the market, or sell your shares."
          }
        ]
      },
      {
        type: "scenario",
        title: "Amara Plans Her Trades",
        narrative: "Amara wants to buy a jumpy small-cap stock currently at $40, but only if she can get it at $40 or less. She also owns a different stock at $100 and wants protection if it crashes while she's at school. She sets up her orders carefully instead of watching all day.",
        details: [
          "For the $40 buy, she uses a limit order at $40 so a sudden spike won't make her overpay.",
          "For the stock she owns, she sets a stop-loss at $90 to sell automatically if it falls that far.",
          "Her limit order will only fill if the price actually reaches $40 or lower.",
          "If the $100 stock gaps down hard overnight, her stop could sell well below $90."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "stocks8-aq1",
          question: "Why did Amara use a limit order instead of a market order for the jumpy stock?",
          options: [
            "Limit orders always fill faster than market orders",
            "To avoid overpaying if the price suddenly spiked",
            "Plain market orders are strictly illegal for small-cap stocks",
            "Limit orders always guarantee the stock will surely rise"
          ],
          correctAnswer: 1,
          explanation: "A limit order caps the price she'll pay, protecting her from a sudden spike on a jumpy stock. Limit orders aren't faster, aren't required by law, and don't guarantee gains."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Order types tell your broker how to handle a trade, not just to buy or sell.",
          "Market orders fill fast at the best price but don't control the exact price.",
          "Limit orders control price but may not fill if the price isn't reached.",
          "Stop-loss orders sell automatically at a trigger, but can fill lower in a crash.",
          "Timing rules like 'day' and 'good-till-canceled' control how long orders stay active."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "stocks8-mastery1",
            question: "The main trade-off of a market order is that it guarantees…",
            options: [
              "Price but not that it will execute",
              "Execution but not the exact price",
              "Both the price and the execution",
              "Neither price nor execution at all"
            ],
            correctAnswer: 1,
            explanation: "A market order guarantees the trade executes fast but not the exact price. A limit order is the reverse - it guarantees price but not execution."
          },
          {
            id: "stocks8-mastery2",
            question: "You set a limit buy at $30 but the stock never drops below $32. What happens?",
            options: [
              "It fills anyway at the $32 price",
              "The order simply does not fill",
              "You are charged a penalty fee",
              "It converts into a market order"
            ],
            correctAnswer: 1,
            explanation: "A limit buy only fills at your price or better, so if the stock stays above $30 it won't fill. There's no penalty and it doesn't convert to a market order."
          },
          {
            id: "stocks8-mastery3",
            question: "What does a stop-loss order do?",
            options: [
              "Buys even more shares whenever the price rises",
              "Sells automatically if the price hits your trigger",
              "Locks your shares so they can't be sold",
              "Guarantees you sell at your exact trigger price"
            ],
            correctAnswer: 1,
            explanation: "A stop-loss sells automatically once the price falls to your trigger, capping losses. It doesn't buy, lock shares, or guarantee the exact trigger price in a fast drop."
          },
          {
            id: "stocks8-mastery4",
            question: "Why might a stop-loss sell far below your trigger price?",
            options: [
              "The broker quietly adds on a hidden extra surcharge",
              "In a crash the price gaps past the trigger",
              "Stop orders always sell at the very day's low",
              "Order triggers are completely ignored during the normal market hours"
            ],
            correctAnswer: 1,
            explanation: "A basic stop becomes a market order once triggered, so in a fast drop it fills at the next available price, which can be well below the trigger. It's not a surcharge or a day's-low rule."
          },
          {
            id: "stocks8-mastery5",
            question: "A 'good-till-canceled' order differs from a 'day' order because it…",
            options: [
              "Fills instantly regardless of the current listed market price",
              "Stays active until it fills or you cancel",
              "Can only be used to sell, never to buy",
              "Always expires within the very first five short minutes"
            ],
            correctAnswer: 1,
            explanation: "A GTC order remains active over multiple days until it fills or you cancel, while a day order expires at the close. It doesn't fill instantly or expire in minutes."
          },
          {
            id: "stocks8-mastery6",
            question: "When is a plain market order most reasonable to use?",
            options: [
              "On a tiny, thinly-traded, jumpy stock",
              "On a large, heavily-traded stock",
              "Only during a market crash",
              "Only when you want to overpay"
            ],
            correctAnswer: 1,
            explanation: "On a large, heavily-traded stock the price barely moves between click and fill, so a market order is fine. On jumpy or thin stocks, a limit order protects you better."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // stocks-9: Volatility
  // ─────────────────────────────────────────────
  {
    lessonId: "stocks-9",
    sections: [
      {
        type: "concept",
        title: "What Volatility Really Means",
        paragraphs: [
          "Volatility is a measure of how much and how fast a stock's price swings up and down. A highly volatile stock might jump 8% one day and drop 6% the next, while a low-volatility stock barely moves 1% in either direction. Importantly, volatility is not the same as 'going down' - it describes the size of the swings in both directions. A stock can be volatile while trending up, down, or sideways. Investors often use volatility as a rough gauge of how bumpy and unpredictable an investment's ride will be.",
          "Different stocks have wildly different volatility. Established giants with steady profits - big utilities or consumer-staples companies - tend to be calm, moving in small steps. Young tech companies, small-caps, and firms with uncertain futures tend to be volatile, capable of huge daily moves on a single headline. Whole markets have volatility too; the VIX index, nicknamed the market's 'fear gauge,' rises when investors expect big swings and falls when they feel calm. A spiking VIX usually signals fear and turbulence ahead.",
          "Volatility matters because it shapes both your potential returns and your emotional experience. A volatile stock offers the chance of big gains but also big, fast losses - the two are inseparable. That's the core link: higher potential reward comes packaged with higher volatility and risk. For a long-term investor, the danger isn't volatility itself but reacting to it - panic-selling during a scary drop and locking in a loss that might have recovered."
        ],
        bullets: [
          "Volatility measures how much and how fast a price swings in either direction.",
          "It is not the same as falling - a stock can be volatile while rising.",
          "Big, stable companies tend to have low volatility; small or young ones tend to be high.",
          "The VIX 'fear gauge' rises when investors expect big market swings.",
          "Higher potential reward comes packaged with higher volatility and risk."
        ],
        realWorldExample: "A steady utility stock might move less than 1% on a typical day. A hot small-cap tech stock could swing 10% up on Monday and 8% down on Tuesday. Same dollar invested, wildly different ride - that difference is volatility."
      },
      {
        type: "concept",
        title: "Living With Volatility as an Investor",
        paragraphs: [
          "Because volatility can trigger panic, smart investors build habits to handle it. The first is time horizon: if you won't need the money for years, short-term swings matter far less, since markets have historically recovered from every major drop given enough time. The second is diversification - owning many different stocks (or a fund holding hundreds) smooths the ride, because they rarely all crash at once. A single stock might swing 40% in a year, while a broad index fund of 500 companies swings far less.",
          "A third tool is dollar-cost averaging: investing a fixed amount regularly no matter the price. When prices are low, your fixed dollars buy more shares; when high, fewer. This turns volatility into an advantage, because you automatically buy more during dips. It also removes the impossible pressure of trying to 'time' the market perfectly. Steady, automatic investing beats frantically guessing tops and bottoms, which even professionals rarely get right.",
          "The biggest mistake volatility causes is emotional selling. When a stock drops 20% in a week, fear screams 'get out!' - but selling locks in the loss, and history shows the investors who stayed put through downturns usually came out ahead. Volatility feels like danger, but for a long-term investor it's mostly noise to be endured, not obeyed. The goal is to expect the swings, size your investments so you can stomach them, and avoid making permanent decisions based on temporary fear."
        ],
        bullets: [
          "A long time horizon shrinks the importance of short-term swings.",
          "Diversification smooths volatility because holdings rarely all crash together.",
          "Dollar-cost averaging turns dips into a chance to buy more shares cheaply.",
          "Trying to time exact tops and bottoms rarely works, even for pros.",
          "The biggest volatility mistake is panic-selling and locking in losses."
        ],
        realWorldExample: "During a sharp market drop, an investor who sold in fear locked in a 30% loss. Another who kept investing the same monthly amount bought shares cheaply during the dip and, a few years later, was well ahead. Same market - different reactions, very different outcomes."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "stocks9-mc1",
            question: "What does volatility measure?",
            options: [
              "Only how far down a stock has fallen",
              "How much and how fast a price swings",
              "The total yearly dividends that a given stock pays",
              "The total number of shares a company issues"
            ],
            correctAnswer: 1,
            explanation: "Volatility measures the size and speed of price swings in both directions - up and down. It's not just declines, dividends, or share count."
          },
          {
            id: "stocks9-mc2",
            question: "Which type of company tends to be MOST volatile?",
            options: [
              "A large, established utility company",
              "A young small-cap tech company",
              "A giant consumer-staples brand",
              "A broad fund of 500 companies"
            ],
            correctAnswer: 1,
            explanation: "Young small-cap tech companies tend to swing the most on single headlines. Large utilities, staples giants, and broad funds are all comparatively calm."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ravi Faces a Scary Drop",
        narrative: "Ravi invests monthly into a broad index fund for a goal 15 years away. One month, the market suddenly drops 25% on recession fears. His account balance shrinks, and part of him wants to sell everything to stop the bleeding. He remembers what he learned about volatility.",
        details: [
          "Ravi's goal is 15 years away, so short-term swings matter far less to him.",
          "His broad fund holds hundreds of companies, so it swings less than a single stock would.",
          "His fixed monthly investment now buys more shares while prices are low.",
          "Selling in fear would lock in the loss, while staying invested lets it potentially recover."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "stocks9-aq1",
          question: "Given his 15-year goal, what's the best reason for Ravi NOT to panic-sell?",
          options: [
            "The whole market legally must fully recover within a month",
            "Selling locks in the loss he could recover from",
            "Volatility means the fund will simply never drop again",
            "His fund is fully guaranteed to double every single year"
          ],
          correctAnswer: 1,
          explanation: "Selling in fear locks in the loss, while staying invested over his long horizon gives it time to recover. No law forces recovery, and no fund is guaranteed to avoid drops or double yearly."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Volatility measures how much and how fast prices swing, up or down.",
          "Small and young companies are usually more volatile than big, stable ones.",
          "Higher potential reward comes bundled with higher volatility and risk.",
          "A long time horizon and diversification make volatility easier to handle.",
          "The biggest mistake is panic-selling during drops and locking in losses."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "stocks9-mastery1",
            question: "Is a volatile stock the same as a stock that is falling?",
            options: [
              "Yes, being volatile always means going straight down",
              "No, it means large swings in either direction",
              "Yes, volatility only ever measures your downside losses",
              "No, volatility means the price truly never moves"
            ],
            correctAnswer: 1,
            explanation: "Volatility describes big swings up or down, not just declines. A stock can be volatile while rising, falling, or moving sideways."
          },
          {
            id: "stocks9-mastery2",
            question: "The VIX index is nicknamed the market's…",
            options: [
              "Growth engine",
              "Fear gauge",
              "Dividend meter",
              "Profit tracker"
            ],
            correctAnswer: 1,
            explanation: "The VIX is called the 'fear gauge' because it rises when investors expect big, turbulent swings. It doesn't track growth, dividends, or profits directly."
          },
          {
            id: "stocks9-mastery3",
            question: "Why does owning a broad fund of hundreds of stocks reduce volatility?",
            options: [
              "The fund is insured against any loss",
              "Its holdings rarely all crash at once",
              "Funds are strictly legally banned from ever dropping",
              "It pays a guaranteed fixed return yearly"
            ],
            correctAnswer: 1,
            explanation: "Diversification smooths the ride because hundreds of stocks rarely fall together, offsetting each other. Funds aren't insured, banned from dropping, or guaranteed a return."
          },
          {
            id: "stocks9-mastery4",
            question: "How does dollar-cost averaging use volatility to your advantage?",
            options: [
              "It stops all prices from ever once falling again",
              "Fixed dollars buy more shares when prices dip",
              "It guarantees you buy at the exact bottom",
              "It always doubles your money during every single crash"
            ],
            correctAnswer: 1,
            explanation: "Investing a fixed amount regularly means your dollars buy more shares when prices are low, turning dips into opportunities. It doesn't stop drops, hit the exact bottom, or double money."
          },
          {
            id: "stocks9-mastery5",
            question: "What is the biggest mistake volatility tends to cause?",
            options: [
              "Buying too many different index funds",
              "Panic-selling and locking in losses",
              "Holding investments for far too long",
              "Reinvesting dividends automatically"
            ],
            correctAnswer: 1,
            explanation: "The classic error is panic-selling during a drop, which locks in a loss that might have recovered. Holding and reinvesting are usually helpful, not harmful."
          },
          {
            id: "stocks9-mastery6",
            question: "Why does a long time horizon make volatility less concerning?",
            options: [
              "Long-term investors never see any drops",
              "Markets have historically recovered over time",
              "Volatility disappears after exactly one year",
              "Long horizons guarantee a fixed return"
            ],
            correctAnswer: 1,
            explanation: "With years to invest, short-term swings matter less because markets have historically recovered from major drops. Long-term investors still see drops, and no return is guaranteed."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // stocks-10: Reading a Stock Page
  // ─────────────────────────────────────────────
  {
    lessonId: "stocks-10",
    sections: [
      {
        type: "concept",
        title: "The Core Numbers on a Stock Page",
        paragraphs: [
          "Open any stock's page in a brokerage app and you'll see a wall of numbers. Once you know what they mean, they tell a clear story. The most obvious is the current price - the last price at which a share traded. Right beside it you'll usually see the day's change, shown in dollars and as a percent, like '+$1.20 (+2.4%),' telling you how the stock has moved since yesterday's close. Green usually means up, red means down. This is the pulse of the stock at a glance.",
          "Next come the day's trading range and volume. The 'day range' shows the lowest and highest prices the stock hit today, while the '52-week range' shows its low and high over the past year - useful for seeing whether today's price is near a peak or a bottom. 'Volume' is how many shares traded that day; unusually high volume often means big news is moving the stock. A price jump on huge volume is a much stronger signal than the same jump on light, sleepy trading.",
          "Then there's market cap, which you calculate as price times shares outstanding, telling you the company's total size. You'll also see the 'previous close' (yesterday's final price) and the 'open' (today's first price). Together these basic fields let you quickly size up a stock: how big it is, how it's moving today, whether trading is active, and where today sits within its recent history - all before digging into deeper valuation numbers."
        ],
        bullets: [
          "Current price is the last traded price; the day's change shows the move since yesterday.",
          "Day range and 52-week range show today's and the year's price lows and highs.",
          "Volume is shares traded; high volume often signals important news.",
          "Market cap (price times shares) shows the company's total size.",
          "'Previous close' and 'open' mark yesterday's last and today's first prices."
        ],
        realWorldExample: "A stock page shows: Price $48.50, +$0.90 (+1.9%), Day range $47.80-$49.10, 52-week range $32-$61, Volume 4.2 million. You instantly know it's up modestly today, trading in the middle of its yearly range, with active but not extreme trading."
      },
      {
        type: "concept",
        title: "Valuation Numbers That Reveal More",
        paragraphs: [
          "Below the basics sit the numbers that hint at whether a stock is cheap or expensive. The star is the P/E ratio (price-to-earnings), which divides the share price by the company's earnings per share. A P/E of 20 roughly means investors are paying $20 for every $1 of yearly profit. A high P/E suggests investors expect fast growth; a low P/E can mean a bargain or a troubled company. P/E is most useful when comparing similar companies in the same industry, not across totally different ones.",
          "You'll also spot EPS (earnings per share) - the company's profit divided by its number of shares, showing how much profit each share earns. Then there's the dividend and dividend yield, telling you the cash payout and its size relative to the price. A '52-week high/low' near the current price hints at momentum, and 'beta' measures volatility versus the overall market: a beta above 1 means the stock swings more than the market, below 1 means it's calmer. These fields turn a price into a fuller picture of value and risk.",
          "The golden rule is to never judge a stock on one number alone. A low price looks cheap but means nothing without earnings behind it. A high P/E isn't automatically bad if the company is growing fast. Volume, ranges, market cap, P/E, and yield each tell a piece of the story, and only together do they let you make an informed decision. Reading a stock page well is a skill: it's about combining the numbers into a coherent picture rather than reacting to any single flashy figure."
        ],
        bullets: [
          "P/E ratio = price divided by earnings per share; it gauges how 'expensive' a stock is.",
          "A high P/E signals growth expectations; a low P/E can mean a bargain or trouble.",
          "EPS shows profit per share; dividend and yield show cash payouts.",
          "Beta measures volatility versus the market: above 1 is jumpier, below 1 is calmer.",
          "Never judge a stock on one number - combine them into a full picture."
        ],
        realWorldExample: "Two stocks both trade at $50. One has a P/E of 15 and pays a 3% dividend; the other has a P/E of 60 and pays nothing. The first is a steadier value play, the second a pricier growth bet. Same price, very different stories once you read the numbers."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "stocks10-mc1",
            question: "What does the 'volume' on a stock page tell you?",
            options: [
              "The company's total yearly profit",
              "How many shares traded that day",
              "The highest price in the past year",
              "The dividend paid to each shareholder"
            ],
            correctAnswer: 1,
            explanation: "Volume is the number of shares traded during the day; unusually high volume often signals important news. It's not profit, a price high, or a dividend."
          },
          {
            id: "stocks10-mc2",
            question: "What does a P/E ratio compare?",
            options: [
              "Price to the company's yearly earnings per share",
              "Profit compared to the total number of employees",
              "Price to the total number of rival competitors",
              "Dividends compared to that day's total trading volume"
            ],
            correctAnswer: 0,
            explanation: "The P/E ratio divides share price by earnings per share, showing how much investors pay per $1 of profit. It doesn't involve employees, competitors, or volume."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tara Reads a Stock Page",
        narrative: "Tara is researching a company before investing. Its page shows a price of $45, up 2% today, a 52-week range of $30-$70, volume far higher than usual, a P/E of 12, and a 4% dividend yield. She tries to piece these numbers into a story instead of reacting to just one.",
        details: [
          "The unusually high volume suggests real news is driving today's move, not random trading.",
          "At $45 within a $30-$70 yearly range, the stock sits in the lower-middle of its range.",
          "A P/E of 12 is relatively low, hinting at either a bargain or possible concerns.",
          "The 4% dividend yield means meaningful cash income relative to the price."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "stocks10-aq1",
          question: "Why is the unusually high volume on Tara's stock page significant?",
          options: [
            "High trading volume always guarantees the price will rise",
            "It often signals real news is moving the stock",
            "Volume is exactly the same as the company's profit",
            "High volume always means the dividend was just raised"
          ],
          correctAnswer: 1,
          explanation: "Unusually high volume often means important news is driving trading, making a price move more meaningful. Volume doesn't guarantee direction, equal profit, or signal a dividend change."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Price and the day's change show where a stock trades and how it moved today.",
          "Day and 52-week ranges reveal where today's price sits in its history.",
          "Volume shows trading activity; high volume often signals news.",
          "P/E, EPS, dividend yield, and beta reveal value and risk beyond price.",
          "Never judge a stock on one number - combine them into a full picture."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "stocks10-mastery1",
            question: "The '52-week range' on a stock page shows…",
            options: [
              "The company's total net profit over the past 52 weeks",
              "The price low and high over the past year",
              "How many total weeks the stock has actively traded",
              "The total dividend paid out across the past 52 weeks"
            ],
            correctAnswer: 1,
            explanation: "The 52-week range shows the lowest and highest prices over the past year, helping you see if today's price is near a peak or bottom. It's not profit, trading age, or dividends."
          },
          {
            id: "stocks10-mastery2",
            question: "A stock's P/E ratio is 25. What does that roughly mean?",
            options: [
              "The stock currently pays out a full 25% dividend yield",
              "Investors pay about $25 per $1 of profit",
              "The company has exactly 25 named direct competitors",
              "The price rose 25% over the past year"
            ],
            correctAnswer: 1,
            explanation: "A P/E of 25 means investors pay about $25 for each $1 of yearly earnings, often signaling growth expectations. It's not a dividend, competitor count, or price change."
          },
          {
            id: "stocks10-mastery3",
            question: "Why is a price jump on very high volume a stronger signal than one on light volume?",
            options: [
              "High volume always means the stock is cheap",
              "Many traders acting suggests real conviction",
              "Light volume moves are illegal to report",
              "Volume has no effect on price signals"
            ],
            correctAnswer: 1,
            explanation: "A move backed by heavy volume reflects many traders acting on real news, giving it more weight than a move on thin, sleepy trading. Volume doesn't signal cheapness or legality."
          },
          {
            id: "stocks10-mastery4",
            question: "What does 'beta' measure on a stock page?",
            options: [
              "The cash dividend paid each quarter",
              "Volatility compared to the overall market",
              "The total number of shares outstanding",
              "The company's total gross yearly revenue"
            ],
            correctAnswer: 1,
            explanation: "Beta measures how much a stock swings relative to the market: above 1 is jumpier, below 1 is calmer. It's not a dividend, share count, or revenue figure."
          },
          {
            id: "stocks10-mastery5",
            question: "Why shouldn't you judge a stock by its share price alone?",
            options: [
              "Price is always fake and unreliable",
              "Price needs context from other figures",
              "Only market cap is ever worth checking",
              "Prices are hidden from regular investors"
            ],
            correctAnswer: 1,
            explanation: "A price means little without context - earnings, P/E, volume, and size complete the picture. Price isn't fake or hidden, and no single number tells the whole story."
          },
          {
            id: "stocks10-mastery6",
            question: "EPS (earnings per share) tells you…",
            options: [
              "How much profit each share earns",
              "The total share volume traded today",
              "The highest price of the year",
              "How many total shareholders currently exist"
            ],
            correctAnswer: 0,
            explanation: "EPS is the company's profit divided by its shares, showing profit earned per share. It's not volume, a price high, or a count of shareholders."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // UNIT 8: STOCK MARKET SYSTEM (market-1 .. market-10)
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // market-1: NYSE vs NASDAQ
  // ─────────────────────────────────────────────
  {
    lessonId: "market-1",
    sections: [
      {
        type: "concept",
        title: "Two Giant Marketplaces for Stocks",
        paragraphs: [
          "When you buy a share, the trade happens on a stock exchange - an organized marketplace that matches buyers with sellers. The two largest in the world are the New York Stock Exchange (NYSE) and the Nasdaq, both based in the United States. Together they list thousands of companies worth tens of trillions of dollars. Think of them like two enormous farmers' markets: both sell shares, both are trusted and regulated, but each has its own history, its own building, and its own way of running the crowd of traders.",
          "The NYSE is the older of the two, founded in 1792 under a buttonwood tree on Wall Street. For most of its life it ran as a physical trading floor where humans shouted orders face to face. Even today it keeps human 'designated market makers' on the floor to help keep prices orderly, though nearly all trades now happen by computer. The NYSE has long been home to big, established companies - think giant banks, retailers, and industrial firms that have been around for decades.",
          "The Nasdaq, launched in 1971, was the world's first fully electronic exchange - no trading floor, just a network of computers matching orders in milliseconds. Because it was built for speed and technology, it became the natural home for tech companies. Many of the most famous names in software, chips, and the internet chose to list on the Nasdaq. Both exchanges are excellent and safe places to trade; the choice a company makes is mostly about fit, image, and listing rules rather than one being 'better' than the other."
        ],
        bullets: [
          "A stock exchange is an organized marketplace that matches share buyers with sellers.",
          "The NYSE, founded in 1792, is the older exchange and once used a shouting trading floor.",
          "The Nasdaq, launched in 1971, was the first fully electronic, computer-run exchange.",
          "Big, established firms often list on the NYSE; tech companies often pick the Nasdaq.",
          "Both are trusted and regulated - neither is automatically 'better' than the other."
        ],
        realWorldExample: "Imagine a well-known bank and a fast-growing app company both going public in the same week. The bank might list on the NYSE, drawn to its history and prestige, while the app company lists on the Nasdaq, drawn to its tech-friendly reputation - yet a share on either trades just as easily."
      },
      {
        type: "concept",
        title: "How the Two Exchanges Differ",
        paragraphs: [
          "The clearest difference is how each matches trades. The NYSE uses an auction model overseen by human specialists on the floor who step in to smooth out sudden imbalances, like when far more people want to buy than sell. The Nasdaq uses a dealer model, where electronic 'market makers' post prices they'll buy and sell at, competing to fill your order. In practice, both feel identical to a regular investor - you tap 'buy' in an app and get filled in a fraction of a second - but under the hood the plumbing is different.",
          "Listing requirements also differ. Each exchange sets rules a company must meet, like a minimum share price, a minimum number of shareholders, and financial size. The NYSE historically had stricter, higher bars aimed at large, profitable firms, while the Nasdaq's tiers made room for younger, faster-growing companies. There are also cost and branding reasons: the NYSE carries an image of tradition and stability, while the Nasdaq signals innovation, so a company's choice partly reflects the story it wants to tell investors.",
          "For you as an investor, the exchange usually doesn't change how you buy a stock or what you pay. Your broker can access both, and prices are quoted the same way. What matters more is the company itself - its earnings, growth, and risks. Knowing the difference is still useful, though: it helps you read financial news, understand why the 'Nasdaq Composite' is packed with tech names, and appreciate that behind every quick tap in your app sits a centuries-old system of organized, regulated trading."
        ],
        bullets: [
          "The NYSE uses a human-assisted auction model; the Nasdaq uses an electronic dealer model.",
          "Each exchange sets listing rules, like minimum price, shareholder count, and financial size.",
          "The NYSE signals tradition and stability; the Nasdaq signals technology and growth.",
          "For everyday investors, the exchange rarely changes how you buy or what you pay.",
          "The company's own earnings and risks matter far more than which exchange lists it."
        ],
        realWorldExample: "A company weighing where to list might compare two offers: the NYSE, with its famous floor and blue-chip peers, or the Nasdaq, with lower fees and a tech-heavy neighbor list. Either way, once listed, your app buys its shares in the same one-tap way."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "market1-mc1",
            question: "What is a stock exchange?",
            options: [
              "A big bank that only lends money to companies",
              "A marketplace that matches share buyers and sellers",
              "A tax agency that collects money from trades",
              "A company that only ever makes technology products"
            ],
            correctAnswer: 1,
            explanation: "An exchange is an organized marketplace that matches buyers with sellers of shares. It isn't a lender, a tax agency, or a product maker."
          },
          {
            id: "market1-mc2",
            question: "Which statement about the NYSE and Nasdaq is correct?",
            options: [
              "The Nasdaq is older and uses a trading floor",
              "The NYSE is older; the Nasdaq began fully electronic",
              "The NYSE completely bans all technology companies from listing",
              "The Nasdaq is fully unregulated and thus quite risky today"
            ],
            correctAnswer: 1,
            explanation: "The NYSE (1792) is older and once used a floor, while the Nasdaq (1971) began as a fully electronic exchange. Both are regulated, and neither bans an entire industry."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maya Compares Two Listings",
        narrative: "Maya, 17, notices two companies going public: a century-old railroad and a new gaming-app startup. She reads that the railroad chose the NYSE and the startup chose the Nasdaq, and she wonders whether that changes how she'd buy each one in her practice account.",
        details: [
          "The railroad picked the NYSE, drawn to its long history and image of stability.",
          "The gaming startup picked the Nasdaq, whose electronic system and tech reputation fit better.",
          "In Maya's app, both trades fill in a fraction of a second with the same one-tap buy.",
          "What should drive Maya's choice is each company's earnings and risks, not the exchange name."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "market1-aq1",
          question: "Why does the gaming startup's Nasdaq listing NOT change how Maya buys its shares?",
          options: [
            "The Nasdaq secretly routes her order to the NYSE",
            "Her broker accesses both exchanges the same easy way",
            "Startups can only be bought once a year by law",
            "Nasdaq shares must be purchased in person downtown"
          ],
          correctAnswer: 1,
          explanation: "Brokers connect to both exchanges, so you buy either stock the same one-tap way. Orders aren't rerouted for secrecy, aren't limited to once a year, and don't require an in-person visit."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A stock exchange is an organized, regulated marketplace matching share buyers and sellers.",
          "The NYSE (1792) is older and historically home to big, established companies.",
          "The Nasdaq (1971) was the first fully electronic exchange and attracts many tech firms.",
          "They differ in trading model and listing rules, but both are trusted and safe.",
          "For everyday investors, the company matters far more than which exchange lists it."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "market1-mastery1",
            question: "Which exchange is older and once relied on a shouting trading floor?",
            options: [
              "The Nasdaq, founded back in 1971",
              "The NYSE, founded back in 1792",
              "Both opened in the same exact year",
              "Neither ever used a trading floor"
            ],
            correctAnswer: 1,
            explanation: "The NYSE dates to 1792 and long used a physical floor. The Nasdaq came later in 1971 and started fully electronic, so the two didn't open together."
          },
          {
            id: "market1-mastery2",
            question: "What was special about the Nasdaq when it launched in 1971?",
            options: [
              "It was the first fully electronic exchange",
              "It was the only exchange to use a floor",
              "It refused to list any large companies",
              "It was owned directly by the government"
            ],
            correctAnswer: 0,
            explanation: "The Nasdaq launched as the world's first fully electronic exchange, using computers instead of a floor. It wasn't floor-based, and it isn't government-owned or barred from large firms."
          },
          {
            id: "market1-mastery3",
            question: "Which type of company most often chooses to list on the Nasdaq?",
            options: [
              "Only foreign banks with no U.S. offices",
              "Technology and fast-growing companies",
              "Firms that refuse to sell any shares",
              "Companies that never earn any profit"
            ],
            correctAnswer: 1,
            explanation: "The Nasdaq's electronic, tech-friendly reputation attracts many technology and growth companies. It isn't limited to foreign banks, and listed firms do sell shares and can be profitable."
          },
          {
            id: "market1-mastery4",
            question: "How do the NYSE and Nasdaq differ in matching trades?",
            options: [
              "The NYSE strictly bans all computers from any trading",
              "The NYSE uses an auction; the Nasdaq uses dealers",
              "The Nasdaq only ever trades just once each week",
              "Both require buyers to first visit a local bank branch"
            ],
            correctAnswer: 1,
            explanation: "The NYSE uses a human-assisted auction model, while the Nasdaq uses an electronic dealer model. Both trade constantly by computer and don't require a bank visit."
          },
          {
            id: "market1-mastery5",
            question: "For a regular investor, why does the exchange usually not matter much?",
            options: [
              "Exchanges always hide their prices from ordinary investors",
              "Brokers access both and prices look the same",
              "Only one exchange is open on any given day",
              "Each exchange charges a huge entry fee daily"
            ],
            correctAnswer: 1,
            explanation: "Your broker reaches both exchanges and quotes prices the same way, so buying feels identical. Prices aren't hidden, both trade daily, and there's no daily entry fee for investors."
          },
          {
            id: "market1-mastery6",
            question: "What should matter most when deciding whether to buy a stock?",
            options: [
              "The company's earnings, growth, and risks",
              "Whichever exchange has the fancier lobby",
              "The color of the company's stock symbol",
              "How old the exchange's building happens to be"
            ],
            correctAnswer: 0,
            explanation: "A company's earnings, growth, and risks drive its value, so those matter most. A lobby, a symbol's color, and a building's age tell you nothing about the investment."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // market-2: Market Makers
  // ─────────────────────────────────────────────
  {
    lessonId: "market-2",
    sections: [
      {
        type: "concept",
        title: "The Traders Who Are Always Ready to Deal",
        paragraphs: [
          "Imagine you want to sell a share at 10:03 a.m., but no other regular investor happens to want to buy it at that exact second. Without help, your trade would stall. Market makers solve this. A market maker is a firm that stands ready to buy or sell a stock at all times, quoting a price to buy (the 'bid') and a price to sell (the 'ask'). By always being willing to deal, they make sure there's someone on the other side of your trade, so you rarely have to wait.",
          "Market makers earn money from the gap between those two prices, called the 'spread.' Suppose a market maker offers to buy a stock at $20.00 and sell it at $20.05. If it buys from a seller at $20.00 and immediately sells to a buyer at $20.05, it pockets 5 cents per share. That sounds tiny, but market makers handle millions of shares a day, so the pennies add up. In exchange, they take on risk: if they buy shares and the price drops before they resell, they lose money.",
          "This service is the reason your buy or sell order fills almost instantly in an app. When you tap 'buy,' you're often trading against a market maker who already has shares ready to hand over. They act like a busy currency booth at an airport that always has cash on hand: you never wait for another traveler to show up, because the booth itself is your counterparty, earning a small margin for the convenience it provides."
        ],
        bullets: [
          "A market maker is a firm that always stands ready to buy or sell a given stock.",
          "It quotes a bid (price to buy) and an ask (price to sell) at the same time.",
          "The gap between bid and ask, the spread, is how market makers earn money.",
          "They take real risk: prices can move against their inventory before they resell.",
          "Their constant readiness lets your trades fill almost instantly in an app."
        ],
        realWorldExample: "A market maker quotes a stock at a $30.00 bid and a $30.04 ask. It buys 1,000 shares from a seller at $30.00 and sells them to a buyer at $30.04, earning about $40 on the round trip - while providing both people an instant trade."
      },
      {
        type: "concept",
        title: "Why Market Makers Keep Trading Smooth",
        paragraphs: [
          "Market makers provide 'liquidity' - the ease of turning shares into cash quickly without moving the price much. In a stock with active market makers, spreads are narrow, maybe a penny or two, and you can buy or sell large amounts fast. In a thinly traded stock with few market makers, spreads widen and prices jump around, because there's less standing supply and demand. This is why popular stocks feel effortless to trade while obscure ones can feel sticky and unpredictable.",
          "They also smooth out temporary imbalances. If sudden news makes everyone want to sell at once, market makers absorb some of that selling by buying shares into their inventory, cushioning the price drop rather than letting it crash instantly. They're not charities - they adjust their quotes to protect themselves - but their willingness to keep dealing prevents markets from freezing up. During calm times this is invisible; during panics, active market makers help keep an orderly two-way market alive.",
          "It's worth knowing that market makers aren't doing you a favor for free - the spread is a small cost you pay on every trade. For a long-term investor buying a widely traded stock, that cost is usually trivial, a few cents on a $100 share. But for someone trading thin, obscure stocks or trading constantly, wide spreads can quietly eat into returns. Understanding market makers helps you see why sticking to liquid, popular stocks keeps your trading costs low and predictable."
        ],
        bullets: [
          "Liquidity is how easily shares turn into cash without moving the price much.",
          "Active market makers keep spreads narrow, making popular stocks easy to trade.",
          "Thinly traded stocks have wider spreads and jumpier, less predictable prices.",
          "Market makers cushion sudden imbalances by buying or selling into their inventory.",
          "The spread is a small cost on every trade, tiny for liquid stocks but larger for obscure ones."
        ],
        realWorldExample: "A hugely popular stock might have a 1-cent spread, so trading it costs almost nothing. A tiny, rarely traded stock might have a 40-cent spread, meaning you instantly 'lose' 40 cents per share the moment you buy - a hidden cost of low liquidity."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "market2-mc1",
            question: "How does a market maker mainly earn money?",
            options: [
              "By charging a yearly fee to every investor",
              "By keeping the spread between bid and ask",
              "By collecting extra taxes on each single completed trade",
              "By lending their shares out for steady monthly interest"
            ],
            correctAnswer: 1,
            explanation: "A market maker profits from the spread - the gap between its buy price and sell price. It doesn't charge yearly fees, collect taxes, or rely on lending for its core income."
          },
          {
            id: "market2-mc2",
            question: "What does a market maker provide to the market?",
            options: [
              "Guaranteed profits for every investor",
              "Liquidity, so trades fill quickly",
              "A promise that prices only go up",
              "Free shares handed to new traders"
            ],
            correctAnswer: 1,
            explanation: "Market makers provide liquidity by always being ready to deal, so your trades fill fast. They don't guarantee profits, promise rising prices, or give away free shares."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Sells Into a Quiet Moment",
        narrative: "Leo, 16, wants to sell 10 shares at 2:15 p.m. No other regular investor is buying at that exact second, yet his order fills instantly at $45.00. He's puzzled about who bought his shares so fast, since the app showed no other buyer waiting.",
        details: [
          "A market maker was quoting a $45.00 bid, ready to buy Leo's shares at any moment.",
          "It bought Leo's 10 shares and will resell them near its $45.03 ask to another trader.",
          "The 3-cent spread is the market maker's small reward for standing ready to deal.",
          "Because the stock is popular and liquid, Leo's cost from that spread was tiny."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "market2-aq1",
          question: "Why did Leo's sell order fill instantly even with no regular buyer waiting?",
          options: [
            "The app invented a fake buyer to help him",
            "A market maker bought his shares into inventory",
            "The government is required to buy all sell orders",
            "His broker paid him from its own profits"
          ],
          correctAnswer: 1,
          explanation: "A market maker stands ready to buy at its bid, so it took Leo's shares instantly into inventory. There's no fake buyer, no government mandate, and the broker isn't paying out of its profits."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Market makers always stand ready to buy or sell, so your trades fill almost instantly.",
          "They quote a bid and an ask and earn the spread between the two prices.",
          "They provide liquidity, keeping popular stocks easy and cheap to trade.",
          "They cushion sudden imbalances by absorbing shares into their inventory.",
          "The spread is a small trading cost - tiny for liquid stocks, larger for obscure ones."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "market2-mastery1",
            question: "What are the two prices a market maker quotes at once?",
            options: [
              "The daily open price and the final close price",
              "The bid to buy and the ask to sell",
              "The income tax rate and the flat broker fee",
              "The fixed quarterly dividend and the total yearly return"
            ],
            correctAnswer: 1,
            explanation: "A market maker quotes a bid (price it will buy at) and an ask (price it will sell at) at the same time. Open/close, taxes, and dividends are unrelated to that quote."
          },
          {
            id: "market2-mastery2",
            question: "A market maker buys at $12.00 and sells at $12.06. What is its spread?",
            options: [
              "About 6 cents per share",
              "About 60 cents per share",
              "About 12 dollars per share",
              "There is no spread at all"
            ],
            correctAnswer: 0,
            explanation: "The spread is the ask minus the bid: $12.06 minus $12.00 equals 6 cents. That small gap, times many shares, is the market maker's reward."
          },
          {
            id: "market2-mastery3",
            question: "What does 'liquidity' mean for a stock?",
            options: [
              "How easily it converts to cash without moving price",
              "How many total years the whole company has already existed",
              "How large the company's main headquarters building really is",
              "How often the company changes its printed logo design"
            ],
            correctAnswer: 0,
            explanation: "Liquidity is how easily you can turn shares into cash quickly without moving the price much. Company age, building size, and logos have nothing to do with it."
          },
          {
            id: "market2-mastery4",
            question: "Why do thinly traded stocks usually have wider spreads?",
            options: [
              "The government forces wider spreads on them",
              "Fewer standing buyers and sellers exist",
              "They always pay much larger dividends",
              "Their share prices are legally frozen"
            ],
            correctAnswer: 1,
            explanation: "With few buyers, sellers, and market makers, there's less standing supply and demand, so spreads widen. It isn't a government rule, a dividend effect, or a price freeze."
          },
          {
            id: "market2-mastery5",
            question: "What risk does a market maker take on?",
            options: [
              "Prices can drop before it resells its shares",
              "It must give free shares to every buyer",
              "It is banned from ever selling at a profit",
              "It owes taxes on trades that never happen"
            ],
            correctAnswer: 0,
            explanation: "A market maker holds inventory, so prices can fall before it resells, causing a loss. It doesn't give free shares, isn't banned from profit, and doesn't owe tax on nonexistent trades."
          },
          {
            id: "market2-mastery6",
            question: "For a long-term investor, why is a narrow spread good?",
            options: [
              "It fully guarantees the stock will rise soon",
              "It keeps the cost of each trade low",
              "It always doubles the cash dividend every single quarter",
              "It removes every last bit of risk from investing"
            ],
            correctAnswer: 1,
            explanation: "A narrow spread means you lose very little to the bid-ask gap on each trade, keeping costs low. It can't guarantee gains, boost dividends, or erase risk."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // market-3: Trading Hours
  // ─────────────────────────────────────────────
  {
    lessonId: "market-3",
    sections: [
      {
        type: "concept",
        title: "When the Market Is Open",
        paragraphs: [
          "The main U.S. stock market has set business hours, just like a store. Regular trading runs from 9:30 a.m. to 4:00 p.m. Eastern Time, Monday through Friday. During those six and a half hours, buyers and sellers meet, prices update constantly, and trades fill in fractions of a second. Outside those hours the 'store' is mostly closed: the market shuts overnight, on weekends, and on certain holidays like Thanksgiving and Independence Day. If you place an order at 8 p.m., it typically waits until the next morning to execute.",
          "These hours exist partly for history and partly for order. Concentrating trading into set hours gathers the most buyers and sellers at the same time, which creates deep liquidity and fairer, steadier prices. When everyone trades together, a stock's price reflects the whole crowd's opinion rather than a few scattered night owls. The 9:30 open and 4:00 close also give companies a predictable window to release news, and give investors a clear daily rhythm of opening prices, midday moves, and closing prices reported in the news.",
          "Time zones matter too. Because the market runs on Eastern Time, someone in California trades from 6:30 a.m. to 1:00 p.m. their time, while someone in London trades in their afternoon and evening. This is why big company news is often released just before 9:30 a.m. Eastern or just after 4:00 p.m. Eastern - companies want to announce when trading is paused, so all investors have a fair chance to react at the open rather than some acting on news while others sleep."
        ],
        bullets: [
          "Regular U.S. trading runs 9:30 a.m. to 4:00 p.m. Eastern, Monday through Friday.",
          "The market closes overnight, on weekends, and on set holidays.",
          "Set hours gather the most buyers and sellers, creating deep liquidity and fair prices.",
          "Orders placed after hours usually wait until the next session to execute.",
          "Because it runs on Eastern Time, your local trading window shifts with your time zone."
        ],
        realWorldExample: "A student in Los Angeles who wants to trade at the open must be ready at 6:30 a.m. local time, since 9:30 a.m. Eastern is 6:30 a.m. Pacific. If she places an order at 3 p.m. Pacific, the market is already closed, so it waits for tomorrow."
      },
      {
        type: "concept",
        title: "The Open, the Close, and Why They're Busy",
        paragraphs: [
          "Not all trading hours are equal. The first and last 30 minutes of the day are usually the busiest and most volatile. At the 9:30 open, a flood of overnight news and waiting orders hits at once, so prices can swing quickly before settling down. Near the 4:00 close, traders rush to finish their positions for the day, and many big funds trade heavily to match end-of-day prices. The quiet middle of the day, around lunchtime, often has lighter volume and calmer price moves.",
          "This pattern matters for how you trade. Because the open can be wild, prices may bounce around in the first few minutes, and a market order placed right at 9:30 might fill at a surprising price. Many careful investors avoid trading in that opening chaos and wait for things to settle. The closing price at 4:00 is especially important because it becomes the stock's 'official' price for the day, used in news reports, account statements, and to calculate whether you're up or down.",
          "Understanding this rhythm helps you avoid rookie mistakes. If you see a stock 'gap up' 5% before the open, that jump reflects overnight news, not something that happened during trading hours. If you check your portfolio at 4:30 p.m., the numbers you see are based on the 4:00 closing prices, even though a little after-hours trading may still be happening. Knowing when the market is calm versus frantic lets you trade more deliberately instead of getting swept up in the opening rush."
        ],
        bullets: [
          "The first and last 30 minutes are usually the busiest and most volatile.",
          "At the open, overnight news and waiting orders hit all at once, causing swings.",
          "Near the close, traders and big funds rush to finish their positions.",
          "The 4:00 closing price becomes the stock's official price for the day.",
          "Midday trading is often calmer, with lighter volume and smaller moves."
        ],
        realWorldExample: "A stock closes Tuesday at $50. Overnight, the company reports great earnings, so it opens Wednesday at $54 - a 'gap up' driven by news while the market was closed. That $4 jump happened between sessions, not during any trading minute."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "market3-mc1",
            question: "What are the regular U.S. stock market hours?",
            options: [
              "A full 24 hours a day, every single day",
              "9:30 a.m. to 4:00 p.m. Eastern on weekdays",
              "Only on the two weekends from noon to midnight",
              "Whenever any single individual investor happens to want"
            ],
            correctAnswer: 1,
            explanation: "Regular trading runs 9:30 a.m. to 4:00 p.m. Eastern, Monday through Friday. The market is not open around the clock, on weekends, or purely on demand."
          },
          {
            id: "market3-mc2",
            question: "Which part of the day is usually the most volatile?",
            options: [
              "The quiet slow middle around lunchtime",
              "The first and last 30 minutes",
              "The overnight hours when it is closed",
              "Weekend mornings before it opens"
            ],
            correctAnswer: 1,
            explanation: "The opening and closing 30 minutes are busiest and most volatile as news and orders pile up. Midday is calmer, and the market is closed overnight and on weekends."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aisha Places a Late Order",
        narrative: "Aisha, 17, gets excited about a stock at 9 p.m. on a Tuesday and taps 'buy' in her app. The order doesn't fill right away, and a note says it's queued for the next session. She wonders why nothing happened and what price she'll get.",
        details: [
          "The regular market is closed at 9 p.m., so her order waits for the next session.",
          "Her order is queued to execute when trading opens at 9:30 a.m. Eastern on Wednesday.",
          "Overnight news could move the price, so her fill may differ from Tuesday's close.",
          "The busy open means the first minutes can be volatile, so the price may swing early."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "market3-aq1",
          question: "Why might Aisha's Wednesday fill price differ from Tuesday's closing price?",
          options: [
            "Brokers randomly change all their prices every single night",
            "Overnight news can move the price before the open",
            "The app charges a nightly fee that raises the price",
            "Closing prices are always exactly perfectly doubled by the next morning"
          ],
          correctAnswer: 1,
          explanation: "News between sessions can shift a stock's price, so the open may differ from the prior close. Prices aren't randomly changed, there's no nightly price fee, and closes aren't doubled."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Regular U.S. trading runs 9:30 a.m. to 4:00 p.m. Eastern on weekdays.",
          "The market closes overnight, on weekends, and on certain holidays.",
          "Set hours gather the most traders, creating deep liquidity and fairer prices.",
          "The open and close are the busiest, most volatile parts of the day.",
          "Orders placed after hours usually wait for the next session's price."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "market3-mastery1",
            question: "At what Eastern time does regular U.S. trading begin?",
            options: [
              "At 6:00 a.m. exactly sharp",
              "At 9:30 in the morning",
              "At exactly noon each day",
              "At 4:00 in the afternoon"
            ],
            correctAnswer: 1,
            explanation: "Regular trading opens at 9:30 a.m. Eastern. It doesn't start at 6 a.m., noon, or 4 p.m., which is actually the closing time."
          },
          {
            id: "market3-mastery2",
            question: "Why do set trading hours help create fair prices?",
            options: [
              "They gather the most buyers and sellers together",
              "They let only one investor trade each day",
              "They force every stock to the same price",
              "They ban companies from ever sharing any news"
            ],
            correctAnswer: 0,
            explanation: "Concentrating trading gathers deep liquidity, so prices reflect the whole crowd. Hours don't limit trading to one person, equalize prices, or block company news."
          },
          {
            id: "market3-mastery3",
            question: "A stock closes at $30, then opens the next day at $33 after good news. This jump is called a…",
            options: [
              "A cash dividend paid overnight",
              "Gap up from overnight news",
              "Broker fee added at dawn",
              "A circuit breaker briefly cooling off"
            ],
            correctAnswer: 1,
            explanation: "A price jump between the prior close and the next open is a 'gap,' here a gap up from overnight news. It's not a dividend, a fee, or a circuit breaker."
          },
          {
            id: "market3-mastery4",
            question: "If you place an order at 10 p.m., when does it usually execute?",
            options: [
              "Instantly, at the current midnight price",
              "At the next regular session's opening",
              "Never, because late orders are deleted",
              "Exactly one week later, by law"
            ],
            correctAnswer: 1,
            explanation: "The market is closed at 10 p.m., so a regular order waits for the next session's open. It doesn't fill at midnight, get deleted, or wait a week."
          },
          {
            id: "market3-mastery5",
            question: "Why is the 4:00 p.m. closing price important?",
            options: [
              "It becomes the stock's official daily price",
              "It sets the company's tax rate for the year",
              "It forces the stock to open there tomorrow",
              "It pays every shareholder a fixed bonus"
            ],
            correctAnswer: 0,
            explanation: "The close is the official price used in news, statements, and gain calculations. It doesn't set taxes, guarantee the next open, or trigger a bonus."
          },
          {
            id: "market3-mastery6",
            question: "For a student in California, when is the 9:30 a.m. Eastern open?",
            options: [
              "At 6:30 a.m. Pacific time",
              "At 9:30 a.m. Pacific time",
              "At 12:30 p.m. Pacific time",
              "At exactly midnight Pacific time"
            ],
            correctAnswer: 0,
            explanation: "Pacific time is three hours behind Eastern, so 9:30 a.m. Eastern is 6:30 a.m. Pacific. The other times don't match that three-hour difference."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // market-4: Bull vs Bear
  // ─────────────────────────────────────────────
  {
    lessonId: "market-4",
    sections: [
      {
        type: "concept",
        title: "Two Names for the Market's Mood",
        paragraphs: [
          "Investors use two animals to describe which way the market is heading. A 'bull market' is a long stretch when prices are generally rising and optimism is high - think of a bull thrusting its horns upward. A 'bear market' is the opposite: a stretch of falling prices and gloom, like a bear swiping its paws downward. A common rule of thumb is that a bear market means prices have dropped at least 20% from a recent high, while a bull market is a sustained climb. These labels describe the whole market's trend, not one single stock.",
          "These moods can last a long time. Bull markets often run for years, slowly lifting most stocks and making investing feel easy and even boring in a good way. Bear markets are usually shorter but scarier, sometimes wiping 30% or more off portfolios in months. For example, if the market rises steadily for six years and then drops 25% over the next several months, investors would say a long bull market ended and a bear market began. Both are normal, repeating parts of how markets behave over time.",
          "It's important to know that no one can reliably predict when a bull or bear market will start or end. Prices move on countless factors - the economy, company earnings, interest rates, and crowd emotion - so turning points are only obvious in hindsight. This is why chasing the mood, buying only when everyone's excited and selling in a panic, tends to hurt investors. The animals are useful vocabulary for describing what has happened, not a crystal ball for what happens next."
        ],
        bullets: [
          "A bull market is a sustained stretch of rising prices and optimism.",
          "A bear market is a sustained stretch of falling prices, often down 20% or more.",
          "These labels describe the whole market's trend, not a single stock's move.",
          "Bull markets often last years; bear markets are usually shorter but sharper.",
          "No one can reliably predict when either mood will begin or end."
        ],
        realWorldExample: "Suppose the market climbs steadily for five years, then tumbles 28% over four months on recession fears. Investors would say the bull market ended and a bear market began - though nobody rang a bell at the exact top."
      },
      {
        type: "concept",
        title: "How to Act in Bulls and Bears",
        paragraphs: [
          "The natural human reaction is exactly backward. In a bull market, when prices keep rising, people feel confident and pour money in near the top. In a bear market, when prices fall and headlines turn scary, people panic and sell near the bottom - locking in losses. This 'buy high, sell low' cycle is why emotion is an investor's biggest enemy. The whole point of understanding bulls and bears is to recognize the emotional trap and not fall into it.",
          "A steadier approach is to keep investing regularly regardless of the mood, a habit called dollar-cost averaging. If you invest $50 every month, you automatically buy fewer shares when prices are high in a bull market and more shares when prices are low in a bear market. Over time this smooths out your average price and removes the impossible job of timing the top or bottom. A bear market, painful as it feels, actually lets long-term investors buy quality companies 'on sale.'",
          "History offers real comfort here: every past bear market has eventually been followed by a recovery and new highs. That doesn't mean any single stock will bounce back, but the broad market has repeatedly clawed its way to new records after crashes. So the calm response to a bear market is usually to keep contributing and wait, and the calm response to a euphoric bull market is to avoid getting greedy or overconfident. Discipline, not prediction, is what turns market moods into an advantage."
        ],
        bullets: [
          "Emotion pushes people to buy high in bulls and panic-sell low in bears.",
          "Dollar-cost averaging means investing a fixed amount on a regular schedule.",
          "That habit buys fewer shares when prices are high and more when they're low.",
          "Bear markets let long-term investors buy quality companies at lower prices.",
          "Historically, every bear market has eventually been followed by a recovery."
        ],
        realWorldExample: "An investor puts in $100 monthly. In a bull month shares cost $50, so $100 buys 2 shares. In a bear month shares cost $25, so the same $100 buys 4 shares. Buying more when cheap lowers her average cost over time."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "market4-mc1",
            question: "What is a bear market?",
            options: [
              "A single stock that pays big dividends",
              "A sustained stretch of falling market prices",
              "A day when the market is closed for holiday",
              "A rule forcing all prices to rise steadily"
            ],
            correctAnswer: 1,
            explanation: "A bear market is a sustained decline in market prices, often 20% or more from a high. It's not one stock, a holiday, or a rule that lifts prices."
          },
          {
            id: "market4-mc2",
            question: "Why is emotion dangerous for investors during these cycles?",
            options: [
              "It always makes online brokers charge much higher fees",
              "It pushes people to buy high and sell low",
              "It quietly changes the market's official daily trading hours",
              "It forces struggling companies to cancel all their dividends"
            ],
            correctAnswer: 1,
            explanation: "Emotion tempts people to buy at euphoric highs and panic-sell at scary lows, the opposite of smart investing. It doesn't set fees, hours, or dividend policy."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sam Faces His First Bear Market",
        narrative: "Sam, 17, has invested $50 a month for a year in a broad fund. Suddenly the market drops 25% and news headlines sound frightening. His account balance is down, and his instinct is to sell everything before it gets worse.",
        details: [
          "The 25% drop means the market has entered a bear market, a normal repeating event.",
          "Selling now would lock in his losses at what could be near the bottom.",
          "By continuing his $50 monthly plan, his money now buys more shares at lower prices.",
          "History shows past bear markets have eventually been followed by recoveries."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "market4-aq1",
          question: "Why might continuing his $50 monthly plan help Sam during the bear market?",
          options: [
            "It fully guarantees that the whole market rebounds next week",
            "His fixed amount buys more shares at lower prices",
            "It legally forces the fund to repay his losses",
            "Monthly investing completely stops all stock prices from ever falling"
          ],
          correctAnswer: 1,
          explanation: "With prices low, a fixed $50 buys more shares, lowering his average cost over time. It can't guarantee a rebound, force repayment, or stop prices from falling."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A bull market is a sustained rise; a bear market is a sustained fall of about 20%+.",
          "These labels describe the whole market's trend, not one single stock.",
          "Emotion tempts investors to buy high in bulls and panic-sell low in bears.",
          "Dollar-cost averaging buys more shares when prices are low and fewer when high.",
          "Historically, every bear market has eventually been followed by a recovery."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "market4-mastery1",
            question: "A bull market describes what kind of trend?",
            options: [
              "A sustained stretch of rising prices",
              "A single day of falling prices",
              "A permanent freeze on all trading",
              "A stretch of prices dropping fast"
            ],
            correctAnswer: 0,
            explanation: "A bull market is a sustained upward trend in prices. It's not one down day, a trading freeze, or a decline, which describes a bear market."
          },
          {
            id: "market4-mastery2",
            question: "Roughly how far must prices fall to be called a bear market?",
            options: [
              "About 2% down from a recent high",
              "At least 20% from a recent high",
              "Exactly 50% down almost every single time",
              "Any small drop lasting just one hour"
            ],
            correctAnswer: 1,
            explanation: "A common rule is a drop of at least 20% from a recent high. A 2% dip is minor, 50% isn't required, and a one-hour drop doesn't qualify."
          },
          {
            id: "market4-mastery3",
            question: "What is dollar-cost averaging?",
            options: [
              "Timing the market's exact top and bottom perfectly",
              "Investing a fixed amount on a regular schedule",
              "Selling off everything the very moment prices fall",
              "Buying only when everyone else is clearly excited"
            ],
            correctAnswer: 1,
            explanation: "Dollar-cost averaging means investing a set amount regularly, no matter the mood. It's the opposite of market timing, panic selling, or chasing excitement."
          },
          {
            id: "market4-mastery4",
            question: "Can experts reliably predict when a bear market will start?",
            options: [
              "Yes, they always somehow know the exact top",
              "No, turning points are clear only in hindsight",
              "Yes, a bell rings on the final up day",
              "No, because the markets never actually ever fall"
            ],
            correctAnswer: 1,
            explanation: "No one reliably calls the top; turning points are obvious only afterward. There's no bell, no perfect prediction, and markets certainly do fall at times."
          },
          {
            id: "market4-mastery5",
            question: "How can a bear market actually help a long-term investor?",
            options: [
              "It lets them buy quality companies at lower prices",
              "It fully guarantees instant profits within a single week",
              "It permanently removes every last bit of investing risk",
              "It forces every company to double all their dividends"
            ],
            correctAnswer: 0,
            explanation: "Lower prices in a bear market let steady investors buy good companies 'on sale.' It doesn't guarantee quick profits, erase risk, or boost dividends."
          },
          {
            id: "market4-mastery6",
            question: "What does history show about past bear markets?",
            options: [
              "They lasted forever with no recovery",
              "They were eventually followed by recoveries",
              "They only happened once in all of history",
              "They always doubled the market overnight"
            ],
            correctAnswer: 1,
            explanation: "Every past bear market has eventually given way to a recovery and new highs. They aren't permanent, one-time, or overnight-doubling events."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // market-5: Liquidity
  // ─────────────────────────────────────────────
  {
    lessonId: "market-5",
    sections: [
      {
        type: "concept",
        title: "How Easily Can You Turn It Into Cash?",
        paragraphs: [
          "Liquidity means how quickly and easily you can turn something into cash at a fair price. Cash itself is perfectly liquid - it's already money. A share of a hugely popular company is very liquid: millions trade every day, so you can sell in seconds at a price close to the last one quoted. A rare collectible or a house is illiquid: selling might take weeks or months, and you may have to accept a lower price to find a buyer quickly. In investing, liquidity is about how fast you can exit without hurting the price.",
          "You can measure a stock's liquidity by its trading volume - the number of shares changing hands each day - and its bid-ask spread. A stock trading 20 million shares a day with a 1-cent spread is highly liquid; a tiny company trading 5,000 shares a day with a 40-cent spread is illiquid. In the liquid stock, a big order barely nudges the price. In the illiquid one, a single large order can move the price sharply, because there aren't enough buyers or sellers standing ready.",
          "Liquidity matters because it affects both your cost and your safety. In liquid markets, you buy and sell near the price you see, and you can always get out when you need cash. In illiquid ones, you might be stuck: unable to sell without dropping your price, or forced to wait. This is why beginners are usually steered toward liquid, widely traded stocks and funds - so that when life happens and money is needed, the investment can actually be turned into cash quickly and fairly."
        ],
        bullets: [
          "Liquidity is how fast you can turn something into cash at a fair price.",
          "Cash is fully liquid; popular stocks are very liquid; houses are illiquid.",
          "High trading volume and a narrow bid-ask spread signal strong liquidity.",
          "In illiquid stocks, a single large order can swing the price sharply.",
          "Liquid investments let you exit quickly and fairly when you need cash."
        ],
        realWorldExample: "Selling 100 shares of a giant, heavily traded company is instant, near the quoted price. Selling 100 shares of a tiny company that trades 3,000 shares a day might mean dropping your price or waiting hours to find enough buyers."
      },
      {
        type: "concept",
        title: "Liquidity in Real Decisions",
        paragraphs: [
          "Liquidity shapes smart money planning. Your emergency fund - money for surprises like a car repair - should sit in something perfectly liquid, like a savings account, not in stocks that could be down when you need them. Money you won't touch for years can go into less-liquid, higher-growth investments. Matching your time horizon to an asset's liquidity keeps you from being forced to sell at a bad moment. The rule of thumb: the sooner you might need the money, the more liquid it should be.",
          "Liquidity also explains why some investments look tempting but carry hidden risk. A thinly traded stock might show a great 'last price,' but if you try to sell a large amount, you could crash that price yourself because few buyers are waiting. The same is true for some collectibles, certain crypto tokens, and small-company shares. A high quoted price means little if you can't actually sell at that price. Always ask not just 'what is it worth?' but 'how easily can I sell it for that?'",
          "For most beginning investors, the practical takeaway is simple: favor liquidity. Broad index funds and large, widely held stocks trade in enormous volume, so you can buy and sell them cheaply and instantly. That liquidity is a form of safety - it means the market will be there when you need it. Chasing an obscure, illiquid investment for a slightly higher potential return often isn't worth the risk of being trapped and unable to sell when it matters most."
        ],
        bullets: [
          "Emergency money belongs in perfectly liquid places like a savings account.",
          "The sooner you might need money, the more liquid it should be.",
          "A high 'last price' means little if few buyers are ready to purchase.",
          "Broad index funds and large stocks offer strong, cheap liquidity.",
          "Liquidity itself is a form of safety - the market is there when you need it."
        ],
        realWorldExample: "A teen keeps her $500 emergency fund in a savings account, not a hot stock. When her phone screen cracks, she withdraws cash instantly at full value - instead of being forced to sell an investment that might be down that week."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "market5-mc1",
            question: "What does liquidity measure?",
            options: [
              "How much a whole company earns each year",
              "How easily an asset turns into cash fairly",
              "How many total employees a given company has",
              "How old a certain stock exchange building is"
            ],
            correctAnswer: 1,
            explanation: "Liquidity is how quickly and easily you can turn an asset into cash at a fair price. It's not about earnings, staff counts, or building age."
          },
          {
            id: "market5-mc2",
            question: "Which signals that a stock is highly liquid?",
            options: [
              "Very low volume and a wide spread",
              "High volume and a narrow spread",
              "A logo that changes color often",
              "A price that never moves at all"
            ],
            correctAnswer: 1,
            explanation: "High daily volume and a narrow bid-ask spread mean strong liquidity. Low volume with a wide spread signals the opposite, and logos or frozen prices are irrelevant."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nina Eyes a Thinly Traded Stock",
        narrative: "Nina, 16, finds a tiny company whose 'last price' is $8 and looks like a bargain. She notices it only trades about 4,000 shares a day and has a 35-cent spread. She wants to put $400 in, but wonders if she could get her money back out easily later.",
        details: [
          "The low daily volume and wide spread show the stock is illiquid.",
          "If Nina later sells a large amount, she could push the price down herself.",
          "The tempting $8 'last price' means little if few buyers are ready to purchase.",
          "A liquid, widely traded fund would let her exit quickly and fairly instead."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "market5-aq1",
          question: "Why could Nina struggle to sell her illiquid stock later at $8?",
          options: [
            "The exchange strictly bans anyone at all from selling small companies",
            "Few buyers wait, so a big sale drops the price",
            "Illiquid stocks are always frozen solid for a full year",
            "Selling shares always instantly doubles the quoted current market price"
          ],
          correctAnswer: 1,
          explanation: "With few buyers standing ready, a large sell order can push the price down below $8. There's no ban on small companies, no yearlong freeze, and selling doesn't double prices."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Liquidity is how quickly and easily you can turn an asset into cash at a fair price.",
          "High trading volume and a narrow bid-ask spread signal strong liquidity.",
          "In illiquid stocks, a single large order can move the price sharply.",
          "Match liquidity to your time horizon: emergency money should be very liquid.",
          "A high quoted price means little if you can't actually sell at that price."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "market5-mastery1",
            question: "Which asset is the most liquid?",
            options: [
              "A house you own outright",
              "Cash in a savings account",
              "A rare vintage baseball card",
              "A tiny, rarely traded stock"
            ],
            correctAnswer: 1,
            explanation: "Cash in savings is instantly available at full value, so it's the most liquid. Houses, collectibles, and thin stocks all take time or price cuts to sell."
          },
          {
            id: "market5-mastery2",
            question: "A stock trades 20 million shares daily with a 1-cent spread. It is…",
            options: [
              "Highly liquid and easy to trade",
              "Quite illiquid and very hard to sell",
              "Frozen solid and impossible to buy",
              "Fully guaranteed to rise in price"
            ],
            correctAnswer: 0,
            explanation: "Huge volume and a tiny spread mean the stock is highly liquid and easy to trade. That's the opposite of illiquid or frozen, and liquidity doesn't guarantee gains."
          },
          {
            id: "market5-mastery3",
            question: "Where should your emergency fund be kept?",
            options: [
              "In a thinly traded penny stock",
              "In a very liquid savings account",
              "In a single rare old collectible card",
              "In a fully locked five-year term investment"
            ],
            correctAnswer: 1,
            explanation: "Emergency money must be instantly available, so a liquid savings account fits. Penny stocks, collectibles, and locked investments can't be tapped quickly at full value."
          },
          {
            id: "market5-mastery4",
            question: "What can happen if you place a big sell order in an illiquid stock?",
            options: [
              "Your order pushes the price down",
              "The price instantly doubles for you",
              "The exchange fully refunds all your money",
              "Absolutely nothing changes about the price"
            ],
            correctAnswer: 0,
            explanation: "With few buyers waiting, a large sell order can drive the price down. It won't double the price, trigger a refund, or leave the price untouched."
          },
          {
            id: "market5-mastery5",
            question: "Why is a high 'last price' not enough to trust?",
            options: [
              "The last posted prices are always fake numbers",
              "You may not find buyers at that price",
              "Displayed prices are strictly illegal to show publicly",
              "The last quoted price resets down to zero nightly"
            ],
            correctAnswer: 1,
            explanation: "A last price only reflects one past trade; if few buyers wait, you may not sell there. Prices aren't fake, illegal to show, or reset to zero each night."
          },
          {
            id: "market5-mastery6",
            question: "Why do beginners favor liquid index funds and large stocks?",
            options: [
              "They can be bought and sold quickly and cheaply",
              "They are fully legally guaranteed to never once fall",
              "They pay out completely free bonus shares every month",
              "They can only ever be sold once per decade"
            ],
            correctAnswer: 0,
            explanation: "High liquidity lets you enter and exit quickly at low cost, which is a form of safety. It doesn't guarantee against losses, pay free shares, or lock you in for years."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // market-6: After-Hours
  // ─────────────────────────────────────────────
  {
    lessonId: "market-6",
    sections: [
      {
        type: "concept",
        title: "Trading When the Main Market Is Closed",
        paragraphs: [
          "Even though regular trading ends at 4:00 p.m. Eastern, a limited amount of trading continues in 'extended hours.' There are two windows: pre-market, roughly 4:00 a.m. to 9:30 a.m., and after-hours, roughly 4:00 p.m. to 8:00 p.m. During these times, trades happen on electronic networks rather than the main exchange floor. This is how a stock's price can already be moving before you wake up, reacting to news that broke overnight or right after the close.",
          "The biggest reason people watch extended hours is company news. Many companies release earnings reports just after 4:00 p.m., when regular trading is closed. If the results are great, buyers rush in during after-hours and the price jumps; if they're bad, sellers push it down. By the time the market opens at 9:30 the next morning, the price may already reflect that reaction. So after-hours trading is where the first, fast response to big news often plays out, before the wider crowd arrives.",
          "It's tempting to think trading around the clock is an advantage, but extended hours are riskier for most investors. Far fewer people are trading, so liquidity is thin, spreads are wide, and prices can swing wildly on small orders. A stock might spike 10% in after-hours on light volume, then give it all back at the next open. For a beginner, watching extended hours can be educational, but actually trading in them is usually a mistake best left to experienced professionals."
        ],
        bullets: [
          "Extended hours include pre-market (early morning) and after-hours (evening) windows.",
          "These trades happen on electronic networks, not the main exchange floor.",
          "Companies often release earnings after 4:00 p.m., driving after-hours moves.",
          "Far fewer traders participate, so liquidity is thin and spreads are wide.",
          "Prices can swing sharply on small orders, making extended hours risky."
        ],
        realWorldExample: "A company reports strong earnings at 4:15 p.m. In after-hours trading its stock jumps 8% on light volume as eager buyers react. But by the next morning's calmer open, the gain settles to 3% - showing how jumpy thin after-hours prices can be."
      },
      {
        type: "concept",
        title: "Why After-Hours Prices Can Fool You",
        paragraphs: [
          "The thin liquidity of extended hours is the key trap. With few buyers and sellers, a modest order can move the price far more than it would during the day. A stock that trades 20 million shares between 9:30 and 4:00 might trade only a few thousand after-hours, so one enthusiastic buyer can push it up sharply. That dramatic-looking move may not reflect the true opinion of the whole market - it may just be a handful of traders reacting fast, and it can reverse quickly.",
          "Wide spreads make after-hours trading expensive, too. During the day a stock might have a 1-cent spread; after-hours that could widen to 20 or 30 cents. If you buy at the higher ask and the price barely moves, you've already lost that spread. Combine wide spreads with wild swings and you get a place where it's easy to overpay or panic. That's why the 'official' price everyone quotes is the 4:00 p.m. close, not the jumpy numbers that follow it.",
          "The smart approach for a beginner is to observe, not participate. If you see a stock down 12% after-hours on an earnings miss, treat it as early information, not a final verdict - the regular session the next day, with full liquidity and the whole crowd, gives a fairer price. Rather than trying to trade the chaotic evening move, patient investors usually wait for the calmer, deeper regular hours, where their orders fill at more reliable prices."
        ],
        bullets: [
          "Thin liquidity means small orders can move after-hours prices dramatically.",
          "After-hours moves may not reflect the whole market and can reverse fast.",
          "Spreads widen after-hours, so trading then is more expensive.",
          "The 4:00 p.m. close, not the jumpy evening prices, is the official price.",
          "Beginners should treat after-hours moves as early info, not a final verdict."
        ],
        realWorldExample: "A stock drops 12% after-hours on weak earnings, alarming its holders. But when the deep, liquid regular session opens the next day, calmer buyers step in and the loss narrows to 5% - proving the after-hours plunge overstated the real reaction."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "market6-mc1",
            question: "What are 'extended hours'?",
            options: [
              "Weekend-only trading at the exchange floor",
              "Pre-market and after-hours electronic trading windows",
              "The busiest minutes of the regular session",
              "A yearly holiday when markets stay open"
            ],
            correctAnswer: 1,
            explanation: "Extended hours are the pre-market and after-hours windows traded on electronic networks. They aren't weekend floor trading, part of the regular session, or a holiday event."
          },
          {
            id: "market6-mc2",
            question: "Why are after-hours prices often jumpy?",
            options: [
              "The exchange resets all prices every single hour",
              "Thin liquidity lets small orders move prices",
              "Brokers are legally required to raise prices",
              "Dividends are paid out during the evening"
            ],
            correctAnswer: 1,
            explanation: "Few traders participate after-hours, so small orders can swing prices sharply. Exchanges don't reset prices hourly, brokers don't force increases, and dividends aren't the cause."
          }
        ]
      },
      {
        type: "scenario",
        title: "Diego Watches an Earnings Pop",
        narrative: "Diego, 17, sees his favorite company report earnings at 4:20 p.m. The stock jumps 9% in after-hours trading, and he's tempted to buy immediately before the price climbs even higher. He notices the volume is very light compared with the daytime.",
        details: [
          "The 9% jump happened in after-hours trading on thin, light volume.",
          "With few traders, that big move may not reflect the whole market's opinion.",
          "Spreads are wide after-hours, so buying now could mean overpaying.",
          "Waiting for the deep, liquid regular open would give Diego a fairer price."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "market6-aq1",
          question: "Why should Diego be cautious about the 9% after-hours jump?",
          options: [
            "All after-hours trading gains are always taxed at a full 100%",
            "Thin volume can exaggerate the move and reverse",
            "The stock is now frozen until next month",
            "Company earnings reports are basically always fake, made-up news"
          ],
          correctAnswer: 1,
          explanation: "Light after-hours volume can overstate a move that reverses at the calmer open. There's no 100% tax, no freeze, and earnings reports are real information."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Extended hours include pre-market and after-hours electronic trading windows.",
          "Companies often report earnings after 4:00 p.m., driving big after-hours moves.",
          "Thin liquidity and wide spreads make extended-hours prices jumpy and costly.",
          "After-hours moves can overstate reactions and reverse at the next open.",
          "Beginners should watch after-hours as early info, not trade the chaos."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "market6-mastery1",
            question: "When does the after-hours session roughly run?",
            options: [
              "From 4:00 a.m. to 9:30 a.m. Eastern",
              "From 4:00 p.m. to 8:00 p.m. Eastern",
              "All night from 8:00 p.m. to 4:00 a.m.",
              "Only ever on Saturdays and Sundays"
            ],
            correctAnswer: 1,
            explanation: "After-hours runs roughly 4:00 p.m. to 8:00 p.m. Eastern. The early morning window is pre-market, and there's no overnight or weekend session."
          },
          {
            id: "market6-mastery2",
            question: "Why do companies often report earnings after 4:00 p.m.?",
            options: [
              "The regular market is closed, avoiding mid-day shocks",
              "The strict law bans all daytime earnings reports entirely",
              "Evening reports always pay every shareholder a nice bonus",
              "After-hours has the most traders of the day"
            ],
            correctAnswer: 0,
            explanation: "Reporting after the close lets news land while regular trading is paused. It isn't legally required, doesn't pay bonuses, and after-hours actually has few traders."
          },
          {
            id: "market6-mastery3",
            question: "What makes after-hours trading riskier than regular hours?",
            options: [
              "Thin liquidity and wide spreads",
              "Guaranteed losses on every trade",
              "A ban on selling any shares",
              "Prices that never move at all"
            ],
            correctAnswer: 0,
            explanation: "Few traders mean thin liquidity and wide spreads, so prices swing and trading costs rise. Losses aren't guaranteed, selling isn't banned, and prices do move - often a lot."
          },
          {
            id: "market6-mastery4",
            question: "A stock jumps 8% after-hours on light volume. What is a wise view?",
            options: [
              "The move is final and can never reverse",
              "It may overstate the reaction and reverse",
              "The stock is now worth exactly 8% more forever",
              "After-hours prices are always perfectly accurate"
            ],
            correctAnswer: 1,
            explanation: "Light-volume moves can exaggerate the reaction and reverse at the deeper open. They aren't final, permanent, or perfectly accurate."
          },
          {
            id: "market6-mastery5",
            question: "Which price is considered a stock's 'official' daily price?",
            options: [
              "The single highest after-hours tick",
              "The 4:00 p.m. regular close",
              "The early pre-market opening bid",
              "The very lowest evening trade"
            ],
            correctAnswer: 1,
            explanation: "The 4:00 p.m. regular-session close is the official daily price. Jumpy pre-market and after-hours ticks aren't used as the official figure."
          },
          {
            id: "market6-mastery6",
            question: "What is the smartest approach to after-hours moves for a beginner?",
            options: [
              "Treat them as early info, not a final verdict",
              "Always trade on them fast before the whole crowd",
              "Completely ignore the fact that any news ever happened",
              "Borrow extra money to trade on them very aggressively"
            ],
            correctAnswer: 0,
            explanation: "Beginners should read after-hours moves as early information and wait for the fair, liquid open. Rushing in, ignoring news, or borrowing to trade are all risky mistakes."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // market-7: Circuit Breakers
  // ─────────────────────────────────────────────
  {
    lessonId: "market-7",
    sections: [
      {
        type: "concept",
        title: "The Market's Emergency Brakes",
        paragraphs: [
          "When prices fall violently in a short time, panic can feed on itself: falling prices scare people into selling, which pushes prices down further, which scares even more people. To stop this dangerous spiral, U.S. markets use 'circuit breakers' - automatic, temporary halts in trading when prices drop too far too fast. Just like the electrical breaker in your home cuts power to prevent a fire, a market circuit breaker cuts trading to prevent a crash from spinning out of control. Everyone gets a forced pause to breathe and think.",
          "Market-wide circuit breakers are based on how far a major index falls in a single day. There are three levels tied to that index. A 7% drop triggers Level 1, and a 13% drop triggers Level 2 - each halts all trading for 15 minutes if it happens before late afternoon. A 20% drop triggers Level 3, which halts trading for the rest of the entire day. These thresholds reset each morning, so the clock starts fresh at every day's open.",
          "The goal isn't to stop prices from falling - it's to slow things down so trading stays orderly. During the pause, investors can absorb information, computers can catch up, and the wild feedback loop of pure panic gets interrupted. When trading resumes, prices may still drop further, but at least the decline happens with cooler heads rather than in a blind stampede. Circuit breakers don't fix a bad economy; they just prevent a fast crash from becoming a chaotic, uncontrolled one."
        ],
        bullets: [
          "Circuit breakers are automatic, temporary halts when prices fall too fast.",
          "They stop panic's feedback loop, where selling triggers more selling.",
          "Level 1 (7%) and Level 2 (13%) drops each pause trading for 15 minutes.",
          "A Level 3 (20%) drop halts all trading for the rest of the day.",
          "The goal is orderly trading, not preventing prices from falling at all."
        ],
        realWorldExample: "If a major index opens down and keeps sliding until it's off 7% for the day, a Level 1 circuit breaker halts all trading for 15 minutes. Traders pause, news is absorbed, and when trading restarts the panic is at least interrupted."
      },
      {
        type: "concept",
        title: "Single-Stock Halts and Staying Calm",
        paragraphs: [
          "Besides market-wide breakers, individual stocks have their own 'limit up-limit down' halts. If a single stock's price swings too far too fast within minutes - up or down - trading in just that stock pauses briefly, often for five minutes. This protects investors from wild, error-driven spikes, like when a fake rumor or a computer glitch sends one stock careening. The pause gives everyone a moment to check whether the move is based on real news or just noise before trading continues.",
          "For a regular long-term investor, the practical lesson is emotional, not technical. Circuit breakers are a sign the market is designed to survive panics - and history shows it does. If you ever see a headline that 'trading was halted,' it doesn't mean your money vanished or the market broke; it means the safety system worked exactly as intended. The worst move during such moments is to panic-sell into the chaos, which is precisely what the breakers are trying to discourage.",
          "The calm response is to remember that these halts are temporary and rare. Level 3 shutdowns almost never happen; most days the breakers are never touched at all. Knowing they exist can actually make you a steadier investor, because you understand there are guardrails against total collapse. Instead of reacting to scary halt headlines, a disciplined investor keeps to a long-term plan, trusting that orderly markets and cooler heads tend to return once the forced pause has done its job."
        ],
        bullets: [
          "Single stocks have 'limit up-limit down' halts for fast, extreme swings.",
          "These brief pauses guard against glitches, rumors, and error-driven spikes.",
          "A trading halt means the safety system worked, not that money vanished.",
          "Panic-selling into chaos is exactly what circuit breakers discourage.",
          "Halts are rare and temporary; most days they're never triggered at all."
        ],
        realWorldExample: "A single stock suddenly spikes 30% in two minutes on an unverified rumor. A limit up-limit down halt pauses it for five minutes. Traders check the facts, find the rumor is false, and the stock settles back - the halt prevented a costly panic."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "market7-mc1",
            question: "What is the main purpose of a circuit breaker?",
            options: [
              "To fully guarantee stocks always rise in value",
              "To pause trading and slow a fast crash",
              "To collect extra taxes during especially busy days",
              "To force all companies to pay dividends faster"
            ],
            correctAnswer: 1,
            explanation: "Circuit breakers temporarily halt trading to slow a rapid crash and restore order. They don't guarantee gains, collect taxes, or affect dividends."
          },
          {
            id: "market7-mc2",
            question: "What does a market-wide Level 3 (20%) drop cause?",
            options: [
              "A brief 15-minute pause, and then normal trading fully resumes",
              "A halt in trading for the rest of the day",
              "A surprise cash bonus payment sent to every single shareholder",
              "An immediate forced reset of all the listed prices to zero"
            ],
            correctAnswer: 1,
            explanation: "A 20% Level 3 drop halts trading for the remainder of the day. Levels 1 and 2 cause 15-minute pauses, and there's no bonus or price reset."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Sees a Scary Headline",
        narrative: "Priya, 17, is checking the news when she sees that the market fell 7% and 'trading was halted.' Her account is down for the day and the headlines sound alarming. Her first instinct is to sell all her investments before things get even worse.",
        details: [
          "The 7% drop triggered a Level 1 circuit breaker, pausing trading for 15 minutes.",
          "The halt means the safety system worked, not that her money disappeared.",
          "Panic-selling into the chaos is exactly what circuit breakers try to discourage.",
          "Sticking to her long-term plan is steadier than reacting to one scary day."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "market7-aq1",
          question: "What does the 15-minute halt after a 7% drop actually mean for Priya?",
          options: [
            "Her invested money has been permanently erased",
            "The safety system paused trading to restore order",
            "She is now legally required to sell everything",
            "The market has closed for good and won't reopen"
          ],
          correctAnswer: 1,
          explanation: "A Level 1 halt is the safety system pausing trading to calm panic; it isn't erased money, a forced sale, or a permanent closure - trading resumes after 15 minutes."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Circuit breakers are automatic, temporary halts triggered by fast, steep drops.",
          "Level 1 (7%) and Level 2 (13%) each pause trading for 15 minutes.",
          "A Level 3 (20%) drop halts all trading for the rest of the day.",
          "Single stocks have limit up-limit down halts for extreme individual swings.",
          "A halt means the safety system worked - panic-selling is the real danger."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "market7-mastery1",
            question: "What problem are circuit breakers designed to stop?",
            options: [
              "Panic selling that feeds on itself",
              "Companies suddenly earning too much profit",
              "Investors stubbornly holding stocks too long",
              "Dividends being paid out too often"
            ],
            correctAnswer: 0,
            explanation: "Circuit breakers interrupt the panic loop where falling prices trigger more selling. They aren't about profits, holding periods, or dividend frequency."
          },
          {
            id: "market7-mastery2",
            question: "How long does a Level 1 (7%) halt last if triggered early enough?",
            options: [
              "About 15 minutes",
              "The rest of the entire day",
              "A full trading week",
              "Exactly one hour"
            ],
            correctAnswer: 0,
            explanation: "A Level 1 halt pauses trading for about 15 minutes. A full-day halt only comes from a Level 3 (20%) drop, not from Level 1."
          },
          {
            id: "market7-mastery3",
            question: "What triggers a market-wide Level 3 halt for the whole day?",
            options: [
              "A small 2% dip from yesterday",
              "A 20% drop in the index",
              "A single small stock rising fast",
              "A quiet, flat, dull trading day"
            ],
            correctAnswer: 1,
            explanation: "A 20% index drop triggers a Level 3 halt for the rest of the day. A 2% dip is minor, a single stock uses different halts, and flat days trigger nothing."
          },
          {
            id: "market7-mastery4",
            question: "What is a 'limit up-limit down' halt?",
            options: [
              "A pause when one stock swings too fast",
              "A tax on stocks that rise too much",
              "A cash bonus for stocks that stay flat",
              "A permanent, total ban on all volatile stocks"
            ],
            correctAnswer: 0,
            explanation: "Limit up-limit down briefly pauses a single stock that moves too far too fast. It isn't a tax, a bonus, or a permanent ban."
          },
          {
            id: "market7-mastery5",
            question: "If you see 'trading was halted,' what does it usually mean?",
            options: [
              "Your money has now permanently completely disappeared",
              "The safety system paused trading as designed",
              "The market will never reopen again",
              "All stocks were reset to a price of zero"
            ],
            correctAnswer: 1,
            explanation: "A halt means the built-in safety system paused trading, working as intended. Your money isn't gone, the market reopens, and prices aren't reset to zero."
          },
          {
            id: "market7-mastery6",
            question: "What is the smartest investor response during a circuit-breaker halt?",
            options: [
              "Immediately panic-sell absolutely everything you own right now",
              "Stay calm and follow a long-term plan",
              "Borrow heavily to buy the dip fast",
              "Just assume the whole market is now broken forever"
            ],
            correctAnswer: 1,
            explanation: "Staying calm and sticking to a long-term plan is the disciplined response. Panic-selling, reckless borrowing, and assuming permanent collapse are all mistakes."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // market-8: Insider Trading
  // ─────────────────────────────────────────────
  {
    lessonId: "market-8",
    sections: [
      {
        type: "concept",
        title: "Trading on Secrets Is Illegal",
        paragraphs: [
          "Insider trading is buying or selling a stock based on important secret information that the public doesn't have yet. Imagine an executive learns her company is about to be bought at double its share price next week - a fact no ordinary investor knows. If she buys shares before the news goes public, she'd make an unfair, guaranteed profit off information others can't access. That's illegal insider trading, and it strikes at the heart of what's supposed to make markets fair: everyone playing by the same rules with the same information.",
          "The key phrase is 'material, nonpublic information' - facts big enough to move a stock's price that haven't been released to everyone. Examples include unreleased earnings, a secret merger, a drug about to be approved or rejected, or a coming CEO resignation. Trading on such secrets is banned not just for executives but for anyone who gets the tip, including friends, family, or a random person who overhears it. Passing the tip to someone else who then trades on it is also illegal, a practice called 'tipping.'",
          "This matters because markets only work if people trust them. If insiders could freely trade on secrets, ordinary investors would always be at a disadvantage, and many would refuse to invest at all. Fair access to information is what lets a teenager with a phone compete on the same footing as a Wall Street pro. Insider trading laws exist to protect that fairness, and violating them can bring huge fines and even prison - it's treated as a serious crime, not a clever trick."
        ],
        bullets: [
          "Insider trading is trading on important secret information the public lacks.",
          "The banned info is 'material, nonpublic' - price-moving facts not yet released.",
          "Examples include secret mergers, unreleased earnings, and pending drug decisions.",
          "The ban covers anyone with the tip, and passing tips ('tipping') is illegal too.",
          "The laws protect fairness so everyone trades on the same information."
        ],
        realWorldExample: "An engineer learns her company will announce a huge government contract tomorrow. If she buys shares tonight before the public knows, that's illegal insider trading - she'd profit from a secret that ordinary investors have no way to access."
      },
      {
        type: "concept",
        title: "Legal Insiders and How Cheaters Get Caught",
        paragraphs: [
          "Not all trading by company insiders is illegal. Executives and employees own stock all the time, and they're allowed to buy and sell it - as long as they only use public information and follow the rules. To stay clean, insiders must report their trades publicly, so anyone can see when a CEO buys or sells. Many also use pre-planned trading schedules set up far in advance, which prove they weren't reacting to a specific secret. The line is simple: trading on public info is fine; trading on secrets is not.",
          "Regulators are surprisingly good at catching illegal insider trading. The SEC watches for suspicious patterns - like someone with no history of trading a stock suddenly buying a huge amount days before a surprise announcement. Computers flag unusual timing, and investigators trace phone calls, texts, and relationships between tippers and traders. Because every trade leaves a digital record, well-timed 'lucky' trades around secret news draw immediate scrutiny, and many people who thought they'd never be caught end up prosecuted years later.",
          "The consequences are severe. Illegal insider trading can bring multimillion-dollar fines, forced return of profits, bans from the industry, and prison sentences measured in years. Famous investors, executives, and even celebrities have been convicted. For a teen learning the ropes, the takeaway is both ethical and practical: never trade on a secret, and be careful even with tips from friends or family, because acting on inside information - even a hot tip you didn't seek out - can turn an exciting stock pick into a serious crime."
        ],
        bullets: [
          "Insiders may legally trade using only public information and set rules.",
          "They must report trades publicly and often use pre-planned schedules.",
          "The SEC flags suspicious timing and traces calls, texts, and relationships.",
          "Every trade leaves a digital record, so 'lucky' timing draws scrutiny.",
          "Penalties include huge fines, industry bans, and years in prison."
        ],
        realWorldExample: "A CEO sells shares months in advance through a pre-planned schedule filed publicly - that's legal. But if a friend he tipped about secret bad earnings dumps shares the day before the report, investigators can trace that call and prosecute both."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "market8-mc1",
            question: "What is illegal insider trading?",
            options: [
              "Buying any stock while you work at a company",
              "Trading on material, nonpublic secret information",
              "Selling a stock after it rises in value",
              "Owning shares in your own employer at all"
            ],
            correctAnswer: 1,
            explanation: "Illegal insider trading means trading on material, nonpublic information the public lacks. Simply working at, owning shares in, or selling a risen stock isn't illegal by itself."
          },
          {
            id: "market8-mc2",
            question: "Is passing a secret tip to a friend who then trades illegal?",
            options: [
              "No, only the original insider can be charged",
              "Yes, tipping others to trade is also illegal",
              "No, tips are always completely legal to share",
              "Yes, but only if the friend loses money"
            ],
            correctAnswer: 1,
            explanation: "Tipping - passing secret info so someone else trades - is illegal, and both people can be charged. It's not limited to the original insider or to losing trades."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Gets a Hot Tip",
        narrative: "Marcus, 17, has an uncle who works at a company. One night the uncle whispers that the company will announce surprise bad news tomorrow and says, 'Sell your shares tonight.' Marcus owns a few shares and feels tempted to dump them before the news hits.",
        details: [
          "The tip is material, nonpublic information the public does not yet have.",
          "Selling on that secret would be illegal insider trading, even for a teen.",
          "Because Marcus got the tip, acting on it puts both him and his uncle at risk.",
          "The safe, legal choice is to ignore the tip and not trade on the secret."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "market8-aq1",
          question: "Why would selling on his uncle's tip be illegal for Marcus?",
          options: [
            "Teens are banned from ever selling any stock",
            "He'd be trading on material, nonpublic information",
            "Selling a stock is always against the law",
            "His uncle's company forbids all share sales"
          ],
          correctAnswer: 1,
          explanation: "Acting on secret, price-moving info the public lacks is illegal insider trading. Teens can legally sell stock, selling isn't inherently illegal, and no blanket company ban applies."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Insider trading is trading on material, nonpublic information the public lacks.",
          "The ban covers anyone with the tip, and passing tips ('tipping') is illegal too.",
          "Insiders may legally trade using only public info and reporting their trades.",
          "The SEC catches cheaters via suspicious timing and digital records.",
          "Penalties include huge fines, industry bans, and years in prison."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "market8-mastery1",
            question: "What kind of information makes trading illegal?",
            options: [
              "Material, nonpublic secret information",
              "News already printed in the newspaper",
              "A company's public annual report",
              "A price everyone can see in an app"
            ],
            correctAnswer: 0,
            explanation: "Trading on material, nonpublic information is illegal. Public news, published reports, and visible prices are available to everyone, so trading on them is fine."
          },
          {
            id: "market8-mastery2",
            question: "Why do insider trading laws exist?",
            options: [
              "To keep markets fair and trustworthy for all",
              "To stop all companies from ever earning any profit",
              "To fully ban executives from owning any shares",
              "To force stock prices to rise each year"
            ],
            correctAnswer: 0,
            explanation: "The laws protect fairness so everyone trades on equal information and trusts the market. They don't ban profits, forbid share ownership, or force prices up."
          },
          {
            id: "market8-mastery3",
            question: "Can a company executive ever legally trade her own stock?",
            options: [
              "No, executives may never trade at all",
              "Yes, using public info and reporting trades",
              "No, unless the stock is falling fast",
              "Yes, but only ever on secret information"
            ],
            correctAnswer: 1,
            explanation: "Executives can legally trade using only public information and by reporting their trades. They aren't banned entirely, and trading on secrets is what's illegal."
          },
          {
            id: "market8-mastery4",
            question: "How does the SEC often catch illegal insider trading?",
            options: [
              "By flagging suspicious timing and tracing records",
              "By randomly guessing who might be guilty",
              "By banning all trading near any news",
              "By simply ignoring all digital records entirely"
            ],
            correctAnswer: 0,
            explanation: "The SEC flags unusual timing and traces calls, texts, and digital trade records. It doesn't guess randomly, ban all news-time trading, or ignore records."
          },
          {
            id: "market8-mastery5",
            question: "What can happen to someone convicted of insider trading?",
            options: [
              "Nothing more than a polite warning",
              "Huge fines and possible prison time",
              "A small bonus for clever trading",
              "A fully guaranteed promotion at work"
            ],
            correctAnswer: 1,
            explanation: "Convictions can bring multimillion-dollar fines, industry bans, and prison. It's a serious crime, not something met with a warning, bonus, or promotion."
          },
          {
            id: "market8-mastery6",
            question: "If a friend gives you a secret tip, what's the safe choice?",
            options: [
              "Trade very fast before anyone else notices",
              "Do not trade on the secret information",
              "Share the tip with even more people",
              "Buy as many shares as you can afford"
            ],
            correctAnswer: 1,
            explanation: "The safe, legal choice is to not trade on secret information at all. Rushing to trade, spreading the tip, or loading up on shares can all be illegal."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // market-9: SEC Basics
  // ─────────────────────────────────────────────
  {
    lessonId: "market-9",
    sections: [
      {
        type: "concept",
        title: "The Referee of the Stock Market",
        paragraphs: [
          "The Securities and Exchange Commission, or SEC, is the U.S. government agency that acts as the referee of the financial markets. Created in 1934 after a devastating market crash and years of fraud, its job is to protect investors, keep markets fair and orderly, and help companies raise money honestly. Just as a referee enforces the rules so a game is fair for both teams, the SEC enforces the rules so that an ordinary teenager investing $100 gets the same honest treatment as a giant Wall Street firm investing millions.",
          "One of the SEC's most important tools is forcing companies to tell the truth. Any company that sells shares to the public must regularly file detailed reports - revealing its earnings, debts, risks, and major events - so investors can make informed decisions. This is called disclosure. Because of the SEC, you can look up a public company's real financial numbers instead of trusting a slick advertisement. The rule is simple: if you want the public's money, you must honestly show the public your books.",
          "The SEC also fights fraud and cheating. It investigates and punishes insider trading, Ponzi schemes, lies in company filings, and scams that trick investors. It can impose fines, force wrongdoers to return stolen money, ban people from the industry, and refer serious cases for criminal prosecution. This enforcement power is what gives the disclosure rules teeth - companies and scammers know that lying or cheating can bring the SEC down on them, which keeps the whole market more honest."
        ],
        bullets: [
          "The SEC is the U.S. agency that regulates and referees the financial markets.",
          "Created in 1934 after a major crash, it protects investors and keeps markets fair.",
          "It forces public companies to disclose earnings, debts, risks, and major events.",
          "Disclosure lets ordinary investors see a company's real numbers, not just ads.",
          "The SEC investigates and punishes fraud, insider trading, and scams."
        ],
        realWorldExample: "Before buying a stock, you can read a company's SEC filings and see its actual revenue, debt, and risks. That transparency exists because the SEC requires it - without the agency, a company could hide losses behind flashy marketing."
      },
      {
        type: "concept",
        title: "How the SEC Protects Everyday Investors",
        paragraphs: [
          "The SEC's protections show up in your daily investing life more than you'd think. When a company first sells shares to the public, it must file a lengthy document detailing its business and risks, so investors aren't buying blind. Brokers and investment advisers must register and follow rules meant to treat customers fairly. Even the ads and claims financial firms make are policed, so a company can't legally promise 'guaranteed 50% returns' to lure in beginners. These guardrails exist specifically to protect people who don't have inside connections.",
          "The SEC also empowers you to protect yourself. Its public databases let anyone look up a company's filings or check whether a broker is properly registered and has a clean record - a free way to avoid scammers. The agency publishes warnings about common frauds, from fake crypto schemes to 'pump and dump' stock scams. A smart investor treats the SEC as a resource: before trusting a hot tip or an unknown adviser, a quick check can reveal red flags that save you from losing everything.",
          "Still, the SEC can't make investing risk-free, and it's important to understand its limits. It ensures companies tell the truth and punishes cheaters, but it does not guarantee that any investment will make money - a fully honest company can still see its stock fall. The SEC referees fairness, not outcomes. Understanding this keeps you realistic: the agency protects your right to accurate information and a fair market, but the decision, and the risk, of what to buy still rests with you."
        ],
        bullets: [
          "Companies selling shares must file detailed disclosures so investors aren't blind.",
          "Brokers and advisers must register and follow fair-treatment rules.",
          "The SEC polices ads, so firms can't legally promise guaranteed returns.",
          "Its free databases let you check filings and verify a broker's record.",
          "The SEC ensures fairness and honesty, but never guarantees you'll make money."
        ],
        realWorldExample: "Before hiring an online 'adviser' promising huge returns, a cautious investor checks the SEC's database and finds the person isn't registered and has complaints. That free lookup, made possible by the SEC, helps them avoid a likely scam."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "market9-mc1",
            question: "What is the SEC's main role?",
            options: [
              "To guarantee every investor earns a profit",
              "To regulate markets and protect investors",
              "To set the price of every stock daily",
              "To lend money directly to companies"
            ],
            correctAnswer: 1,
            explanation: "The SEC regulates the markets, protects investors, and keeps trading fair. It doesn't guarantee profits, set stock prices, or lend money to companies."
          },
          {
            id: "market9-mc2",
            question: "What does 'disclosure' require public companies to do?",
            options: [
              "Give free shares to every citizen",
              "Honestly report earnings, debts, and risks",
              "Promise their stock will always rise",
              "Hide bad news from their investors"
            ],
            correctAnswer: 1,
            explanation: "Disclosure means honestly reporting financial details like earnings, debts, and risks. It isn't about free shares, price promises, or hiding bad news - the opposite of hiding."
          }
        ]
      },
      {
        type: "scenario",
        title: "Zoe Vets an Online Adviser",
        narrative: "Zoe, 17, sees an online 'expert' promising a guaranteed 40% return if she sends money to invest. It sounds amazing, but something feels off. She remembers that the SEC keeps public records she can check before trusting anyone with her savings.",
        details: [
          "A promise of 'guaranteed 40% returns' is a classic red flag the SEC warns about.",
          "Zoe can use the SEC's free database to check if the adviser is properly registered.",
          "SEC disclosure rules mean legitimate firms can't legally promise guaranteed profits.",
          "The lookup helps Zoe protect herself, though the SEC can't guarantee any outcome."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "market9-aq1",
          question: "Why is the adviser's 'guaranteed 40% return' a warning sign?",
          options: [
            "The SEC caps all returns at exactly 10%",
            "Legitimate firms can't legally promise guaranteed profits",
            "Guaranteed returns are only for rich adults",
            "The SEC personally approves every good return"
          ],
          correctAnswer: 1,
          explanation: "SEC rules bar firms from promising guaranteed profits, so that claim signals a likely scam. The SEC doesn't cap returns, restrict them by wealth, or approve returns."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The SEC is the U.S. agency that regulates markets and protects investors.",
          "It forces public companies to disclose earnings, debts, and risks honestly.",
          "It investigates and punishes fraud, insider trading, and scams.",
          "Its free databases let you check filings and verify a broker's record.",
          "The SEC ensures fairness and honesty, but never guarantees you'll make money."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "market9-mastery1",
            question: "The SEC is best described as the market's…",
            options: [
              "Referee enforcing fair rules",
              "Bank that hands out loans",
              "Broker that sells you stocks",
              "Company that makes products"
            ],
            correctAnswer: 0,
            explanation: "The SEC referees the markets by enforcing fair rules. It isn't a bank, a broker, or a product-making company."
          },
          {
            id: "market9-mastery2",
            question: "Why must public companies file disclosures?",
            options: [
              "So investors can make informed decisions",
              "So they can legally hide their debts",
              "So their stock price is forced upward",
              "So they avoid ever paying any taxes"
            ],
            correctAnswer: 0,
            explanation: "Disclosure gives investors honest financial information to decide wisely. It's the opposite of hiding debts, and it doesn't move prices up or dodge taxes."
          },
          {
            id: "market9-mastery3",
            question: "Which of these does the SEC investigate and punish?",
            options: [
              "Fraud and insider trading",
              "Companies that earn profits",
              "Investors who hold too long",
              "Stocks that rise too quickly"
            ],
            correctAnswer: 0,
            explanation: "The SEC targets fraud, insider trading, and scams. Earning profits, holding stocks, and rising prices are normal and not violations."
          },
          {
            id: "market9-mastery4",
            question: "How can the SEC's databases help you personally?",
            options: [
              "They fully guarantee your investments will grow",
              "They let you verify a broker's registration",
              "They pick winning stocks for you",
              "They pay you back any losses you take"
            ],
            correctAnswer: 1,
            explanation: "SEC databases let you check filings and confirm a broker is registered with a clean record. They don't guarantee growth, pick stocks, or refund losses."
          },
          {
            id: "market9-mastery5",
            question: "Can a financial firm legally promise you 'guaranteed 50% returns'?",
            options: [
              "Yes, if the firm is very large",
              "No, such promises break SEC rules",
              "Yes, for any registered adviser",
              "No, unless you are over eighteen"
            ],
            correctAnswer: 1,
            explanation: "SEC rules bar promising guaranteed returns, so that claim is a scam signal regardless of firm size, registration, or your age."
          },
          {
            id: "market9-mastery6",
            question: "What is a key limit of the SEC's protection?",
            options: [
              "It cannot guarantee any investment makes money",
              "It refuses to punish any form of fraud",
              "It hides all company reports from the public",
              "It forces everyone to buy certain stocks"
            ],
            correctAnswer: 0,
            explanation: "The SEC ensures fairness and honesty but can't guarantee profits - honest stocks still fall. It does punish fraud, publishes reports, and never forces purchases."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // market-10: Market Indexes
  // ─────────────────────────────────────────────
  {
    lessonId: "market-10",
    sections: [
      {
        type: "concept",
        title: "A Scoreboard for the Whole Market",
        paragraphs: [
          "A market index is a single number that tracks how a group of stocks is doing, like a scoreboard for the market. Instead of checking thousands of companies one by one, you glance at an index and instantly know whether stocks broadly went up or down. When the news says 'the market rose today,' it usually means an index climbed. The three most famous U.S. indexes are the S&P 500, the Dow Jones Industrial Average, and the Nasdaq Composite - each measuring a different slice of the market.",
          "The S&P 500 tracks 500 of the largest U.S. companies and is the one professionals watch most, because those 500 firms represent a huge share of the entire market's value. The Dow is older and simpler, following just 30 large, well-known companies, so it's famous but less complete. The Nasdaq Composite includes thousands of stocks listed on the Nasdaq exchange, heavily weighted toward technology. Each index tells a slightly different story, which is why you'll sometimes hear that the Dow rose while the Nasdaq fell on the same day.",
          "Indexes matter because they're the benchmark everything is measured against. When someone says an investment 'beat the market,' they usually mean it did better than the S&P 500. Indexes also let you see long-term trends: the S&P 500 has climbed dramatically over many decades despite plenty of crashes along the way. So an index isn't just today's headline number - it's a running record of how the whole market, or a big chunk of it, has performed over time."
        ],
        bullets: [
          "A market index is one number tracking how a group of stocks is doing.",
          "The S&P 500 follows 500 of the largest U.S. companies, the pros' favorite.",
          "The Dow tracks just 30 big-name companies, so it's famous but less complete.",
          "The Nasdaq Composite holds thousands of stocks, heavily weighted toward tech.",
          "Indexes are the benchmark used to judge whether investments 'beat the market.'"
        ],
        realWorldExample: "On a single day, tech news might push the Nasdaq up 1% while the Dow slips 0.3%, because they track different companies. A headline saying 'the market rose' most often refers to the broad S&P 500 climbing."
      },
      {
        type: "concept",
        title: "Why Indexes Are a Beginner's Best Friend",
        paragraphs: [
          "You can't buy an index directly - it's just a number - but you can buy an 'index fund' that holds all the stocks in an index in the same proportions. Buy an S&P 500 index fund and, with one purchase, you own a tiny slice of 500 huge companies at once. This instant diversification is powerful: if one company stumbles, it's a small piece of the whole, so your money isn't riding on a single bet. For most beginners, a broad index fund is the simplest smart way to invest.",
          "Index funds are also cheap and low-effort, which is a big deal. Because the fund just mirrors the index instead of paying experts to pick stocks, its fees are tiny - often a fraction of a percent per year. Over decades, those low fees leave far more money in your pocket than expensive funds that try, and usually fail, to beat the market. Study after study shows that most professional stock-pickers don't outperform a simple S&P 500 index fund over the long run.",
          "The big-picture lesson ties everything together: rather than gambling on which single stock will soar, a beginner can quietly own the whole market through an index fund and ride its long-term growth. The S&P 500's history of climbing over decades, despite crashes, rewards patient index investors. It's not flashy, but buying a low-cost, broad index fund and holding it for years is one of the most reliable wealth-building strategies ever discovered - and it starts with understanding what an index is."
        ],
        bullets: [
          "An index fund holds all the stocks in an index in the same proportions.",
          "One purchase gives instant diversification across many companies at once.",
          "Index funds charge tiny fees because they just mirror the index.",
          "Most professional stock-pickers fail to beat a simple S&P 500 fund long-term.",
          "Owning a broad index fund for years is a reliable wealth-building strategy."
        ],
        realWorldExample: "With one purchase of an S&P 500 index fund, a teen owns a sliver of 500 giant companies. If one of them has a terrible year, it barely dents her holding - the other 499 cushion the blow, which is diversification in action."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "market10-mc1",
            question: "What is a market index?",
            options: [
              "A single company's own daily share price",
              "A number tracking a group of stocks",
              "A tax charged on every stock trade",
              "A loan the market gives to companies"
            ],
            correctAnswer: 1,
            explanation: "An index is one number that tracks how a group of stocks is doing. It's not a single company's price, a tax, or a loan."
          },
          {
            id: "market10-mc2",
            question: "Which index tracks 500 of the largest U.S. companies?",
            options: [
              "The Dow Jones Industrial Average",
              "The S&P 500",
              "The Nasdaq Composite",
              "The single-stock index"
            ],
            correctAnswer: 1,
            explanation: "The S&P 500 tracks 500 large U.S. companies. The Dow follows just 30, the Nasdaq Composite holds thousands, and 'single-stock index' isn't a real benchmark."
          }
        ]
      },
      {
        type: "scenario",
        title: "Kai Wants to Own the Market",
        narrative: "Kai, 17, is overwhelmed trying to pick the one 'perfect' stock. A mentor suggests he instead buy a low-cost S&P 500 index fund. Kai wonders how buying one thing could be safer than carefully choosing a single hot company.",
        details: [
          "The index fund holds all 500 S&P 500 companies in the same proportions.",
          "One purchase gives Kai instant diversification across 500 large companies.",
          "If a single company has a bad year, the other 499 cushion the blow.",
          "Low fees and broad ownership make this a reliable long-term strategy."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "market10-aq1",
          question: "Why is Kai's index fund safer than betting on one hot company?",
          options: [
            "Index funds are always legally guaranteed to only rise",
            "It spreads his money across 500 companies at once",
            "The government fully insures every single index fund completely",
            "Index funds always pay a fixed 40% return yearly"
          ],
          correctAnswer: 1,
          explanation: "Owning 500 companies spreads risk, so one failure barely dents his holding. Index funds aren't guaranteed to rise, government-insured, or paying fixed 40% returns."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A market index is one number tracking how a group of stocks is doing.",
          "The S&P 500 (500 firms), Dow (30 firms), and Nasdaq Composite differ in scope.",
          "Indexes are the benchmark for judging whether investments 'beat the market.'",
          "An index fund holds all the index's stocks, giving instant diversification.",
          "Low-cost broad index funds held for years are a reliable wealth-building tool."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "market10-mastery1",
            question: "What does a market index do?",
            options: [
              "Tracks a group of stocks with one number",
              "Directly sets the price of a single company",
              "Collects a small fee on every trade made",
              "Lends emergency cash out to struggling smaller companies"
            ],
            correctAnswer: 0,
            explanation: "An index summarizes a group of stocks in one number. It doesn't set a company's price, charge trade fees, or lend money."
          },
          {
            id: "market10-mastery2",
            question: "How many companies does the Dow track?",
            options: [
              "About 30 large companies",
              "About 500 large companies",
              "Several thousand small companies",
              "Only one giant company"
            ],
            correctAnswer: 0,
            explanation: "The Dow tracks about 30 well-known companies. The S&P 500 follows 500, the Nasdaq Composite thousands, and no major index tracks just one."
          },
          {
            id: "market10-mastery3",
            question: "Why might the Nasdaq rise while the Dow falls on the same day?",
            options: [
              "They track different sets of companies",
              "One of them is always fake data",
              "Indexes are required to move oppositely",
              "The Dow only updates once a year"
            ],
            correctAnswer: 0,
            explanation: "The two indexes hold different companies, so they can move differently. Neither is fake, they aren't forced to diverge, and the Dow updates continuously."
          },
          {
            id: "market10-mastery4",
            question: "What is an index fund?",
            options: [
              "A fund holding all the stocks in an index",
              "A single stock hand-chosen by just one paid expert",
              "A basic savings account that pays a fixed interest",
              "A loan you take out to buy one stock"
            ],
            correctAnswer: 0,
            explanation: "An index fund holds all the stocks in an index in the same proportions. It's not a single stock, a savings account, or a loan."
          },
          {
            id: "market10-mastery5",
            question: "Why does buying an S&P 500 fund reduce risk?",
            options: [
              "It guarantees the price only ever rises",
              "It spreads money across 500 companies",
              "The government refunds any losses",
              "It doubles your money each year"
            ],
            correctAnswer: 1,
            explanation: "Owning 500 companies means one failure barely dents your holding - that's diversification. It doesn't guarantee gains, refund losses, or double your money."
          },
          {
            id: "market10-mastery6",
            question: "What do most professional stock-pickers fail to do long-term?",
            options: [
              "Beat a simple S&P 500 index fund",
              "Charge any high fees for their services",
              "Own more than one stock at a time",
              "Ever make a single profitable trade"
            ],
            correctAnswer: 0,
            explanation: "Studies show most pros fail to beat a simple S&P 500 index fund over the long run. They do charge fees, own many stocks, and make profitable trades sometimes."
          }
        ]
      }
    ]
  },
]
