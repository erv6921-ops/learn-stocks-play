import { StructuredLessonContent } from "@/types"

// Deepened lesson content (Mortgages-depth rebuild) for: portfolio, etfs-funds, bonds
// Each entry replaces the thin auto-generated version for its lessonId.
export const deepPortfolioFundsBonds: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // portfolio-1: Asset Allocation
  // ─────────────────────────────────────────────
  {
    lessonId: "portfolio-1",
    sections: [
      {
        type: "concept",
        title: "Dividing Your Money Into Buckets",
        paragraphs: [
          "You met asset allocation - splitting money across stocks, bonds, and cash - back in the Investing Fundamentals unit; this whole Portfolio Construction unit is where we actually build one. Quick refresher: studies show this single decision drives most of your long-term results, far more than which exact stock you pick. Think of it like building a meal: the balance of protein, carbs, and vegetables matters more than the specific brand of each. If you have $10,000 and put $7,000 in stocks and $3,000 in bonds, you have a 70/30 allocation, and that mix shapes both your growth and your risk.",
          "Each category behaves differently. Stocks are the growth engine: over decades they've returned roughly 10% a year on average, but they can drop 30% or 40% in a bad year. Bonds are steadier: they pay smaller, more predictable returns (often 3% to 5%) and usually fall less when stocks crash. Cash - money in a savings account - barely grows but never suddenly loses value. A smart allocation blends these so you capture stock growth while bonds and cash cushion the scary drops. The goal isn't to avoid all risk; it's to take the right amount for your situation.",
          "Your ideal mix depends on two things: your time horizon and your stomach for risk. A 16-year-old investing money they won't touch for 40 years can hold mostly stocks, because they have decades to recover from any crash. A 60-year-old about to retire needs more bonds and cash, since a big loss right before retirement could be devastating. There's no single 'right' allocation - only the one that fits your goals, your timeline, and how well you sleep at night when the market drops."
        ],
        bullets: [
          "Asset allocation is how you split money across stocks, bonds, and cash.",
          "This mix drives most of your long-term results - more than individual stock picks.",
          "Stocks grow fastest but swing hardest; bonds are steadier; cash is stable but barely grows.",
          "A longer time horizon lets you hold more stocks, because you can wait out crashes.",
          "The best allocation fits your goals, timeline, and comfort with risk - not a magic formula."
        ],
        realWorldExample: "In 2008 the stock market fell about 37%. A person fully in stocks saw $10,000 shrink to about $6,300. Someone with a 60/40 stock/bond mix fell far less - to roughly $7,500 - because bonds held up while stocks crashed. Same year, very different pain, purely from allocation."
      },
      {
        type: "concept",
        title: "Rules of Thumb and Why They Bend",
        paragraphs: [
          "Because allocation matters so much, people invented shortcuts. A classic one is '110 minus your age' for the percent in stocks. At 20, that means about 90% stocks and 10% bonds - aggressive, which fits a young person with time to recover. At 70, it flips to 40% stocks and 60% bonds - conservative, protecting money that's needed soon. These rules aren't laws; they're starting points. Someone very comfortable with risk might hold more stocks than the rule suggests, while a nervous investor might hold less. The point is to shift gradually from growth toward safety as your goal gets closer.",
          "Allocation also depends on the goal itself, not just your age. Money for a house you're buying in two years should sit in cash or short-term bonds - you can't risk a crash right before you need it. Money for retirement decades away belongs mostly in stocks. Many people hold several 'buckets' at once: an aggressive retirement bucket, a safe emergency fund, and a moderate mix for a mid-term goal like a car. Matching each bucket's allocation to its timeline is smarter than using one blanket mix for everything you own.",
          "One warning: allocation is about proportions, not chasing whatever's hot. When stocks soar, it's tempting to dump bonds and go all-in; when they crash, it's tempting to flee to cash. Both moves usually backfire, because they mean buying high and selling low. A good allocation is chosen calmly in advance and stuck to through the ups and downs. That discipline - deciding your mix when you're thinking clearly and holding it when emotions run high - is where allocation actually protects your wealth."
        ],
        bullets: [
          "'110 minus your age' is a common starting point for your stock percentage.",
          "Rules of thumb are starting points, not laws - adjust for your own comfort with risk.",
          "Shift gradually from growth (stocks) toward safety (bonds, cash) as a goal nears.",
          "Match each goal's allocation to its timeline; near-term money belongs in cash or short bonds.",
          "Pick your mix calmly in advance, then hold it - don't chase hot markets or panic-sell."
        ],
        realWorldExample: "Jordan, 18, saving for retirement, uses 110 minus 18 = 92% stocks. His mom, 55, uses 110 minus 55 = 55% stocks and 45% bonds. Same family, very different mixes - because Jordan can wait out a crash for 45 years, while his mom needs the money much sooner."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "portfolio1-mc1",
            question: "What does 'asset allocation' mean?",
            options: [
              "Picking the single best-performing stock in the whole market",
              "How you split money across stocks, bonds, and cash",
              "The flat fee a broker charges you to place a trade",
              "The capital-gains tax you owe when you sell your shares"
            ],
            correctAnswer: 1,
            explanation: "Asset allocation is the mix of broad categories - stocks, bonds, and cash - in your portfolio. This mix, not any single pick, drives most of your long-term results."
          },
          {
            id: "portfolio1-mc2",
            question: "Why can a young investor usually hold more stocks than a retiree?",
            options: [
              "Young people get higher returns from the same stocks",
              "They have decades to recover from any crash",
              "Retirees are legally barred from owning stocks",
              "Stocks are guaranteed to rise for people under 30"
            ],
            correctAnswer: 1,
            explanation: "A long time horizon lets a young investor wait out market crashes and recover. A retiree needs the money soon, so a big loss at the wrong time could be permanent."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Splits Her Savings by Goal",
        narrative: "Priya, 17, has $6,000 saved. She wants $2,000 for a used car in about a year, and she wants the other $4,000 to grow for the far future. She's deciding how to allocate each part instead of using one mix for everything.",
        details: [
          "The $2,000 car money has a one-year timeline, so a crash would be a disaster right when she needs it.",
          "The $4,000 long-term money has decades to grow, so short-term drops don't matter much.",
          "Putting all $6,000 in stocks would risk the car money; putting it all in cash would waste the long-term growth.",
          "Matching each bucket to its timeline lets her be safe with one goal and aggressive with the other."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "portfolio1-aq1",
          question: "How should Priya BEST allocate her two buckets?",
          options: [
            "Car money in stocks, long-term money in cash",
            "Car money in cash, long-term money in stocks",
            "All $6,000 in stocks for the highest return",
            "All $6,000 in cash to avoid any risk at all"
          ],
          correctAnswer: 1,
          explanation: "The one-year car money belongs in cash so a crash can't wipe it out, while the decades-away money belongs in stocks to grow. Matching allocation to each timeline beats one blanket mix."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Asset allocation - your split across stocks, bonds, and cash - drives most long-term results.",
          "Stocks grow fastest but swing hardest; bonds and cash cushion the drops.",
          "A longer time horizon supports more stocks; near-term goals need cash or short bonds.",
          "Rules like '110 minus your age' are starting points, not laws - adjust for your comfort.",
          "Choose your mix calmly in advance and hold it; don't chase hot markets or panic-sell."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "portfolio1-mastery1",
            question: "Research suggests asset allocation matters more than…",
            options: [
              "Which specific stocks you pick",
              "Whether the economy grows at all",
              "The color of your brokerage app",
              "How old the stock exchange is"
            ],
            correctAnswer: 0,
            explanation: "Studies show your broad mix of stocks, bonds, and cash explains most of your long-term results - far more than which individual stocks you choose."
          },
          {
            id: "portfolio1-mastery2",
            question: "Which category is the growth engine but swings the hardest?",
            options: [
              "Bonds, because they always pay a fixed interest",
              "Stocks, which can rise or fall sharply",
              "Cash, because it truly never loses any value",
              "Savings accounts, which are federally insured"
            ],
            correctAnswer: 1,
            explanation: "Stocks have the highest long-run returns but the biggest swings, dropping 30% or more in bad years. Bonds and cash are steadier but grow more slowly."
          },
          {
            id: "portfolio1-mastery3",
            question: "Using '110 minus your age,' what stock percentage fits a 20-year-old?",
            options: [
              "About 20% in stocks",
              "About 90% in stocks",
              "Exactly 50% in stocks",
              "Zero percent in stocks"
            ],
            correctAnswer: 1,
            explanation: "110 minus 20 equals 90, suggesting about 90% stocks. A young investor can be aggressive because decades remain to recover from any crash."
          },
          {
            id: "portfolio1-mastery4",
            question: "Money you need for a purchase in one year belongs mostly in…",
            options: [
              "Aggressive growth stocks",
              "Cash or short-term bonds",
              "A single hot tech stock",
              "Long-term stock index funds"
            ],
            correctAnswer: 1,
            explanation: "Near-term money can't risk a crash right before you need it, so cash or short-term bonds protect it. Stocks are for goals many years away."
          },
          {
            id: "portfolio1-mastery5",
            question: "Why does dumping bonds to go all-in after stocks soar usually backfire?",
            options: [
              "It counts as strictly illegal insider trading",
              "It means buying high and selling low",
              "Bonds can never be repurchased again later",
              "Brokers permanently ban you for switching mixes"
            ],
            correctAnswer: 1,
            explanation: "Chasing hot markets means buying stocks after they're expensive and selling safer assets low. A calm allocation held through ups and downs beats reacting to emotion."
          },
          {
            id: "portfolio1-mastery6",
            question: "The BEST reason to hold different allocations for different goals is that…",
            options: [
              "Each goal has its own timeline and risk",
              "It deliberately confuses the tax authorities on purpose",
              "One single giant mix is always against the rules",
              "Brokers strictly require a separate account per goal"
            ],
            correctAnswer: 0,
            explanation: "A near-term goal needs safety while a distant goal needs growth. Matching each bucket's mix to its own timeline beats forcing one blanket allocation on everything."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // portfolio-2: Risk Tolerance
  // ─────────────────────────────────────────────
  {
    lessonId: "portfolio-2",
    sections: [
      {
        type: "concept",
        title: "How Much Loss Can You Actually Handle?",
        paragraphs: [
          "Risk tolerance is how much of a drop in your investments you can stomach without panicking and selling. It has two parts that people often confuse. The first is your ability to take risk - a math question about your finances and timeline. If you're 17 and won't need the money for 30 years, you can afford big swings, because you have decades to recover. The second is your willingness to take risk - an emotional question about how you actually feel. Someone might have the ability to hold risky stocks but lose sleep every time the market dips, and that fear matters just as much as the math.",
          "Why does this matter? Because the biggest destroyer of returns isn't a crash - it's selling during a crash. Imagine two people who both own a stock fund. It drops 30%. The one who understood their true risk tolerance shrugs and holds, and recovers fully within a few years. The one who overestimated their tolerance panics, sells at the bottom, and locks in the loss forever. The market eventually recovers, but their money doesn't, because they cashed out. Knowing your honest tolerance before a crash keeps you from making that permanent mistake in the heat of the moment.",
          "Your risk tolerance isn't fixed - it shifts with your life. A stable job, an emergency fund, and no debt all raise your ability to take risk, because a market drop won't force you to sell to pay bills. Job insecurity, big upcoming expenses, or high debt lower it. That's why the honest question isn't 'do I want high returns?' - everyone does - but 'if my $10,000 became $6,000 next year, would I hold on or bail?' Answering that truthfully, before it happens, is the whole point of assessing risk tolerance."
        ],
        bullets: [
          "Risk tolerance is how big a drop you can hold through without panic-selling.",
          "It has two parts: ability (your finances and timeline) and willingness (your emotions).",
          "The biggest return-killer is selling during a crash, which turns a paper loss into a real one.",
          "A stable job, emergency fund, and low debt raise your ability to take risk.",
          "The honest test: if $10,000 fell to $6,000, would you hold on or sell?"
        ],
        realWorldExample: "During the 2020 crash, the market fell about 34% in weeks, then fully recovered within months. Investors who held on were fine. Those who panic-sold near the bottom locked in huge losses and often missed the fast rebound - a costly lesson in knowing your real tolerance."
      },
      {
        type: "concept",
        title: "Matching Your Portfolio to Your Nerves",
        paragraphs: [
          "Once you know your tolerance, you translate it into an allocation. A high-tolerance investor might hold 90% stocks, accepting wild swings for maximum growth. A low-tolerance investor might hold 50% stocks and 50% bonds, giving up some growth for a smoother ride. Neither is 'right' - the best portfolio is the one you'll actually stick with through a downturn. A theoretically perfect 90% stock portfolio is worthless if you'll panic and sell it at the first 20% drop. A slightly less aggressive mix you can hold calmly beats an aggressive one you'll abandon.",
          "Risk questionnaires from brokers try to measure this by asking how you'd react to hypothetical losses. They're useful but imperfect, because it's easy to click 'I'd stay calm' when no real money is dropping. A better gauge is your own history: how did you feel the last time your money fell? If you obsessively checked the balance and felt sick, that's real information. Being honest about your nerves - even if it means a more conservative mix - protects you from your own worst instincts when a genuine crash arrives.",
          "There's a real cost to being too conservative, though. If you're so afraid of loss that you hold mostly cash for 40 years, inflation quietly erodes your money and you miss the growth that builds wealth. So the goal isn't the lowest possible risk - it's the right risk. That usually means taking enough stock exposure to grow, but not so much that you'll bail during a downturn. Finding that balance, and adjusting it as your life and confidence change, is what assessing risk tolerance is really about."
        ],
        bullets: [
          "Translate your tolerance into an allocation - higher tolerance supports more stocks.",
          "The best portfolio is one you'll actually hold through a crash, not the 'perfect' one on paper.",
          "Risk questionnaires help but are imperfect; your real reaction to past losses tells more.",
          "Being too conservative has a cost: inflation erodes cash and you miss growth.",
          "The goal is the right amount of risk - enough to grow, not so much you'll panic-sell."
        ],
        realWorldExample: "Two investors each have $20,000. Aggressive Sam holds 90% stocks and sleeps fine through a 25% drop. Cautious Dana panics at 10% drops, so she holds 60% stocks. Dana grows a bit slower, but she never panic-sells - so over 30 years she likely ends up ahead of a nervous all-stock investor who bails during crashes."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "portfolio2-mc1",
            question: "Risk tolerance is best described as…",
            options: [
              "The exact percentage return a single stock will earn",
              "How big a drop you can hold without panic-selling",
              "A special tax rate applied to all investment gains",
              "The exact number of individual stocks you must own"
            ],
            correctAnswer: 1,
            explanation: "Risk tolerance is how much of a decline you can endure without selling in a panic. It blends your financial ability and your emotional willingness to take risk."
          },
          {
            id: "portfolio2-mc2",
            question: "What most often turns a temporary loss into a permanent one?",
            options: [
              "Calmly holding through the entire long downturn",
              "Selling in a panic during the crash",
              "Owning safer bonds right alongside your stocks",
              "Reinvesting every single dividend you get automatically"
            ],
            correctAnswer: 1,
            explanation: "Markets usually recover, so a paper loss heals if you hold. Selling at the bottom locks in the loss for good - the single biggest destroyer of returns."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Overestimates His Nerves",
        narrative: "Leo, 19, told his broker's questionnaire he could handle any risk, so he put all $8,000 in an aggressive stock fund. Six months later the market dropped 28% and his balance fell to about $5,760. He can't stop checking the app and feels sick every morning.",
        details: [
          "On paper Leo has a long timeline, so his ability to take risk is high.",
          "In reality his willingness is low - the drop is causing him real distress.",
          "If he panic-sells now, he locks in the $2,240 loss and may miss the recovery.",
          "A slightly more conservative mix he could hold calmly would have served him better."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "portfolio2-aq1",
          question: "What's the BEST lesson from Leo's situation?",
          options: [
            "He should immediately sell everything he owns to stop the pain",
            "His willingness to take risk was lower than he claimed",
            "Aggressive growth funds are always guaranteed to lose money",
            "He should have put it all in a single stock"
          ],
          correctAnswer: 1,
          explanation: "Leo's ability to take risk was high, but his emotional willingness was lower than he admitted. A mix he could hold calmly beats an aggressive one he'll panic-sell at the bottom."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Risk tolerance blends your financial ability and your emotional willingness to take risk.",
          "Selling in a panic during a crash is the biggest destroyer of long-term returns.",
          "A stable job, emergency fund, and low debt raise your ability to take risk.",
          "The best portfolio is one you'll actually hold through a downturn, not the 'perfect' one.",
          "Too conservative has a cost too: inflation erodes cash and you miss growth."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "portfolio2-mastery1",
            question: "The two parts of risk tolerance are ability and…",
            options: [
              "Willingness to take risk emotionally",
              "The broker's required minimum deposit",
              "The current national inflation rate",
              "The stock's annual dividend yield"
            ],
            correctAnswer: 0,
            explanation: "Ability is the financial math of your timeline and finances; willingness is how you actually feel about losses. Both matter, and they can disagree."
          },
          {
            id: "portfolio2-mastery2",
            question: "Which factor RAISES your ability to take investment risk?",
            options: [
              "A large emergency fund and stable job",
              "High credit-card debt you are still paying off",
              "A big expense coming up next month",
              "Recently losing your only source of income"
            ],
            correctAnswer: 0,
            explanation: "Savings and steady income mean a market drop won't force you to sell to pay bills, so you can afford more risk. Debt and near-term expenses do the opposite."
          },
          {
            id: "portfolio2-mastery3",
            question: "Why is a 'perfect' 90% stock portfolio useless for a nervous investor?",
            options: [
              "Stocks are banned above 80% by law",
              "They'll likely panic-sell it during a crash",
              "It automatically converts itself to cash every year",
              "A ninety percent mix is mathematically impossible here"
            ],
            correctAnswer: 1,
            explanation: "The best portfolio is the one you'll hold through a downturn. If a nervous investor bails at the first big drop, a less aggressive mix they can keep is far better."
          },
          {
            id: "portfolio2-mastery4",
            question: "A hidden cost of being far too conservative is that…",
            options: [
              "Cash is taxed at a special high rate",
              "Inflation erodes cash and you miss growth",
              "Bonds are strictly illegal for young investors",
              "Brokers charge extra to hold cash"
            ],
            correctAnswer: 1,
            explanation: "Holding mostly cash for decades lets inflation shrink your buying power and skips the stock growth that builds wealth. The goal is the right risk, not the least risk."
          },
          {
            id: "portfolio2-mastery5",
            question: "Broker risk questionnaires are useful but imperfect mainly because…",
            options: [
              "They are always written entirely in a difficult foreign language",
              "It's easy to claim calm when no real money drops",
              "They always recommend putting a full 100% into safe bonds",
              "Only retirees over sixty-five are ever allowed to take them"
            ],
            correctAnswer: 1,
            explanation: "Answering 'I'd stay calm' is easy when nothing is actually falling. Your real reaction to a past loss reveals your true willingness better than a hypothetical."
          },
          {
            id: "portfolio2-mastery6",
            question: "The honest test of your risk tolerance is asking…",
            options: [
              "Which single stock will rise the very most next calendar year",
              "If $10,000 fell to $6,000, would you hold or sell?",
              "How to completely avoid ever losing even a single dollar again",
              "What flat fee your online broker charges you per trade"
            ],
            correctAnswer: 1,
            explanation: "Picturing a concrete, painful loss and honestly asking whether you'd hold or bail reveals your real tolerance - before a crash forces the decision on you."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // portfolio-3: Diversification
  // ─────────────────────────────────────────────
  {
    lessonId: "portfolio-3",
    sections: [
      {
        type: "concept",
        title: "Don't Put All Your Eggs in One Basket",
        paragraphs: [
          "You met the basic idea of diversification - the eggs-and-baskets rule - in the Investing Fundamentals unit; here we put it to work building a real portfolio. The one-line reminder: spreading your money across many different investments means no single failure can wreck you. In investing, the 'eggs' are your dollars and the 'baskets' are different companies, industries, and asset types. If you put your entire $5,000 into one stock and that company goes bankrupt, you lose everything. Spread across 100 companies, one bankruptcy barely dents you. The deeper question this lesson answers is what 'enough' diversification actually looks like.",
          "The magic of diversification is that different investments don't all move together. When one industry struggles, another often thrives - if oil prices spike, airlines suffer but energy companies boom. By owning both, the gains in one soften the losses in the other, smoothing your ride. This is why a diversified portfolio can earn solid returns with far less gut-wrenching volatility than a single stock. You're not trying to eliminate risk entirely; you're eliminating the specific risk that any one company or sector blows up and takes your whole savings with it.",
          "There's a crucial distinction here. Diversification wipes out 'company-specific risk' - the danger that one firm's scandal, lawsuit, or bankruptcy sinks you. But it can't erase 'market risk' - the danger that the whole market falls together, as in a recession. When the 2008 crash hit, nearly everything dropped at once, and diversification across stocks alone didn't save anyone. That's why true diversification also spans asset types - adding bonds, which often hold up when stocks fall - not just many different stocks."
        ],
        bullets: [
          "Diversification spreads money across many investments so one failure can't wreck you.",
          "Different investments don't all move together, which smooths your overall ride.",
          "It eliminates company-specific risk - one firm's collapse won't sink your savings.",
          "It cannot erase market risk - the danger that the whole market falls at once.",
          "True diversification spans asset types (stocks and bonds), not just many stocks."
        ],
        realWorldExample: "Enron was a giant, admired company - until fraud drove it bankrupt in 2001 and its stock went to zero. Employees who'd put their whole retirement in Enron stock lost everything. Anyone who'd diversified across hundreds of companies barely noticed, because one collapse was a tiny slice of their portfolio."
      },
      {
        type: "concept",
        title: "How to Diversify Without Overdoing It",
        paragraphs: [
          "You diversify along several dimensions at once. Across companies: owning many firms, not one. Across industries: tech, healthcare, energy, and consumer goods, so a slump in one sector doesn't sink you. Across geography: U.S. and international, since different countries' economies rise and fall at different times. And across asset types: stocks and bonds, which often move in opposite directions during a crisis. The easiest way to get all of this at once is a broad index fund, which can hold hundreds or thousands of companies in a single purchase - instant diversification for a beginner.",
          "There's a real thing called 'over-diversification,' though people worry about it too much. If you own 15 different funds that all hold the same big U.S. stocks, you're paying extra fees and doing extra work for no added protection - you just own the same thing five times over. The fix isn't more funds; it's making sure your holdings are actually different from each other. A single broad index fund plus a bond fund can be more genuinely diversified than a messy pile of overlapping funds. More holdings aren't automatically better; more different holdings are.",
          "Diversification also has an emotional payoff that's easy to miss. When you own one stock, every news headline about that company can send you into a spiral of fear or greed. When you own the whole market, no single company's bad day matters much, so you can stop obsessing and let time do its work. This calm is part of why diversified investors tend to hold through downturns and come out ahead - the smoother ride makes it psychologically easier to stay invested, which is where the real long-term gains come from."
        ],
        bullets: [
          "Diversify across companies, industries, geography, and asset types at once.",
          "A single broad index fund gives instant diversification across hundreds of companies.",
          "Over-diversification is owning many funds that hold the same things - fees without benefit.",
          "More different holdings help; more overlapping holdings just add cost and clutter.",
          "A smoother ride makes it easier to stay invested, which is where long-term gains come from."
        ],
        realWorldExample: "A total-market index fund holds roughly 3,000+ U.S. companies across every industry in one purchase. For a beginner with $500, that's more diversification than a wealthy investor could get hand-picking stocks for years - all in a single, low-cost fund."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "portfolio3-mc1",
            question: "What risk does diversification eliminate?",
            options: [
              "Market risk - the whole market falling at once",
              "Company-specific risk - one firm collapsing",
              "The risk that interest rates ever change",
              "The risk of paying any taxes on gains"
            ],
            correctAnswer: 1,
            explanation: "Spreading money across many companies means one firm's bankruptcy or scandal barely dents you. It cannot, however, stop the whole market from falling together."
          },
          {
            id: "portfolio3-mc2",
            question: "What is the easiest way for a beginner to diversify instantly?",
            options: [
              "Buy one broad index fund holding many companies",
              "Put all their money into a single hot stock",
              "Keep absolutely everything sitting in a checking account",
              "Buy only their single favorite company's shares"
            ],
            correctAnswer: 0,
            explanation: "A single broad index fund can hold hundreds or thousands of companies at once, giving instant diversification that would be hard to build by hand."
          }
        ]
      },
      {
        type: "scenario",
        title: "Amara Rethinks Her All-Tech Portfolio",
        narrative: "Amara, 18, loves technology, so she put all $4,000 into five tech stocks. She thinks she's diversified because she owns five different companies. Then a tech-sector slump drops all five at once, and her balance falls 35% while the broader market barely moves.",
        details: [
          "Owning five companies feels diversified, but all five are in the same industry.",
          "When the tech sector slumped, her holdings all fell together - little cushioning.",
          "A slump in one industry shouldn't sink someone spread across many industries.",
          "Adding other sectors, international stocks, and some bonds would smooth her ride."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "portfolio3-aq1",
          question: "Why wasn't Amara actually well diversified?",
          options: [
            "She simply owned far too few dollars overall",
            "All five holdings were in the same industry",
            "She should have owned just one tech stock",
            "Tech stocks can never be part of a portfolio"
          ],
          correctAnswer: 1,
          explanation: "Five stocks in the same sector move together, so a tech slump hits them all. Real diversification spreads across different industries and asset types, not just company names."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Diversification spreads money so no single failure can wreck you.",
          "It kills company-specific risk but not market risk, when everything falls together.",
          "Diversify across companies, industries, geography, and asset types - not just names.",
          "A broad index fund gives instant, low-cost diversification for beginners.",
          "Owning overlapping funds isn't diversification - it's just paying more for the same thing."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "portfolio3-mastery1",
            question: "Putting your whole $5,000 into one stock is risky mainly because…",
            options: [
              "That single company could fail and wipe you out",
              "Owning just one stock is strictly against all brokerage rules",
              "One single stock always pays much lower dividends",
              "Single stocks are always taxed at exactly double the rate"
            ],
            correctAnswer: 0,
            explanation: "With everything in one company, its bankruptcy or scandal takes all your money. Spreading across many firms means any single failure is only a small slice."
          },
          {
            id: "portfolio3-mastery2",
            question: "Diversification smooths your ride because different investments…",
            options: [
              "Are all completely guaranteed to rise together",
              "Don't all move in the same direction",
              "Are always legally required to pay fixed interest",
              "Simply never change in price at all"
            ],
            correctAnswer: 1,
            explanation: "When one holding drops, another may rise, so their swings partly cancel out. That smoother path is the core benefit of spreading your money around."
          },
          {
            id: "portfolio3-mastery3",
            question: "Which risk can diversification NOT remove?",
            options: [
              "One single company's massive accounting fraud scandal",
              "A single individual firm's sudden bankruptcy filing",
              "Market risk, when everything falls at once",
              "A large product recall at one specific business"
            ],
            correctAnswer: 2,
            explanation: "Diversification handles risks tied to individual companies, but when the entire market drops together - as in a recession - being spread across stocks alone can't save you."
          },
          {
            id: "portfolio3-mastery4",
            question: "Owning ten funds that all hold the same big U.S. stocks is an example of…",
            options: [
              "Perfect, completely ideal broad diversification",
              "Over-diversification with no added benefit",
              "A legally required regulatory minimum here",
              "The single safest possible portfolio around"
            ],
            correctAnswer: 1,
            explanation: "If the funds hold the same thing, you just own it several times over - paying extra fees for no real protection. What matters is holdings that are genuinely different."
          },
          {
            id: "portfolio3-mastery5",
            question: "To diversify beyond just many stocks, you should also add…",
            options: [
              "Many more shares of your single favorite stock",
              "Bonds, which often hold up when stocks fall",
              "A second identical account at the very same broker",
              "Risky options contracts on the exact same companies"
            ],
            correctAnswer: 1,
            explanation: "Bonds frequently rise or hold steady when stocks crash, so mixing asset types cushions a market-wide drop that owning only stocks would not."
          },
          {
            id: "portfolio3-mastery6",
            question: "An underrated benefit of diversification is that it…",
            options: [
              "Fully guarantees you beat the whole market every single year",
              "Makes it easier to stay calm and stay invested",
              "Completely removes all of the taxes owed on your gains",
              "Automatically doubles all of your yearly returns"
            ],
            correctAnswer: 1,
            explanation: "When no single company's bad day matters much, a diversified investor panics less and holds through downturns - and staying invested is where long-term gains come from."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // portfolio-4: Dollar-Cost Averaging
  // ─────────────────────────────────────────────
  {
    lessonId: "portfolio-4",
    sections: [
      {
        type: "concept",
        title: "Investing the Same Amount on a Schedule",
        paragraphs: [
          "Dollar-cost averaging (DCA) means investing a fixed amount of money at regular intervals - say $100 every month - no matter what the market is doing. You don't try to guess the perfect moment to buy. You just buy automatically, in good times and bad. Because you spend the same dollars each time, you naturally buy more shares when prices are low and fewer shares when prices are high. Over time, this pulls your average purchase price down and quietly removes the stress of trying to 'time' the market, which almost nobody does well.",
          "Here's the arithmetic that makes it work. Say you invest $100 a month in a fund. In a month when the price is $10, your $100 buys 10 shares. Next month the price drops to $5, so your $100 buys 20 shares. The following month it's back to $10. You bought 40 shares total for $300, an average cost of $7.50 - lower than the $10 average of the prices themselves. The dips, which feel scary, actually helped you: your fixed dollars scooped up bargain shares when everyone else was afraid.",
          "The deepest value of DCA is behavioral, not mathematical. Left to our instincts, we buy when the market is soaring (and expensive) and freeze or sell when it's crashing (and cheap) - exactly backwards. DCA removes emotion by making the decision automatic. You've committed in advance to keep buying, so a crash becomes a discount instead of a reason to panic. For a beginner, especially a teen investing small amounts from a part-time job, this steady, boring habit beats trying to outsmart the market - because consistency, not brilliance, is what builds wealth."
        ],
        bullets: [
          "DCA means investing a fixed amount at regular intervals regardless of price.",
          "Fixed dollars buy more shares when prices are low and fewer when prices are high.",
          "This can pull your average cost per share below the average of the prices.",
          "Its biggest benefit is behavioral: it removes emotion and market-timing guesswork.",
          "For beginners, a steady automatic habit beats trying to outsmart the market."
        ],
        realWorldExample: "Invest $100 monthly at prices of $10, then $5, then $10. You buy 10 + 20 + 10 = 40 shares for $300 - an average cost of $7.50 per share. The scary dip to $5 is exactly when your fixed $100 bought the most shares, lowering your overall price."
      },
      {
        type: "concept",
        title: "When DCA Helps and What It Can't Do",
        paragraphs: [
          "DCA isn't magic, and it's worth being honest about its limits. In a market that only rises, investing a big lump sum all at once actually beats DCA, because your money is in the market earning returns sooner rather than sitting on the sidelines waiting for the next installment. Studies show lump-sum investing wins about two-thirds of the time for this reason. So DCA is not the mathematically optimal strategy when you already have a large chunk of cash and a strong stomach. Its edge is protection and discipline, not maximum theoretical return.",
          "Where DCA truly shines is in the situation most teens and young workers are actually in: you don't have a lump sum. You earn money gradually - a paycheck every two weeks - and can only invest a bit at a time. In that case DCA isn't a choice you're comparing to lump-sum; it's just the natural, sensible way to invest as money arrives. Setting up an automatic $50 or $100 transfer into a fund each payday turns investing into a habit you never have to think about, which is exactly what keeps beginners consistent for decades.",
          "DCA also can't protect you from a bad investment. Steadily buying a single failing company just means you lose money slowly instead of quickly. The strategy only works when paired with a sound, diversified holding like a broad index fund - then the dips are temporary and the long trend is up. Used that way, DCA's real gift is that it lets you ignore the headlines. Market crashes, once terrifying, become just another automatic buy at lower prices, and you keep calmly building your position while panicked investors sell."
        ],
        bullets: [
          "In a steadily rising market, investing a lump sum all at once usually beats DCA.",
          "DCA's edge is discipline and protection, not maximum theoretical return.",
          "For people earning money gradually, DCA is simply the natural way to invest.",
          "Automatic transfers each payday turn investing into an effortless habit.",
          "DCA can't rescue a bad investment - pair it with a diversified index fund."
        ],
        realWorldExample: "A student earning $400 a month from a part-time job can't invest a lump sum - they don't have one. Auto-investing $50 each payday into an index fund is DCA by necessity, and it quietly builds a serious position over years without ever requiring a market-timing decision."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "portfolio4-mc1",
            question: "What does dollar-cost averaging involve?",
            options: [
              "Buying only when prices hit a yearly low",
              "Investing a fixed amount at regular intervals",
              "Selling shares every time the market rises",
              "Putting all your cash in on one perfect day"
            ],
            correctAnswer: 1,
            explanation: "DCA means investing the same dollar amount on a regular schedule regardless of price, so you buy more shares when cheap and fewer when expensive."
          },
          {
            id: "portfolio4-mc2",
            question: "With DCA, a scary price dip actually helps you because…",
            options: [
              "Your fixed dollars buy more shares while cheap",
              "The dip fully guarantees prices will rise next month",
              "You automatically stop all investing during it",
              "Dips completely erase all the taxes you owe"
            ],
            correctAnswer: 0,
            explanation: "When prices fall, your fixed amount scoops up more shares at bargain prices, lowering your average cost. The dip works in your favor instead of against you."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Automates His Paychecks",
        narrative: "Marcus, 17, earns about $300 a month bagging groceries. He can't invest a big lump sum because he doesn't have one. He sets up an automatic $75 transfer into a broad index fund every payday and ignores the market news.",
        details: [
          "Marcus earns money gradually, so investing a bit each payday is the natural fit.",
          "When the market dips, his fixed $75 buys more shares at lower prices.",
          "Automating it means he never has to decide when to buy or fight the urge to time the market.",
          "Because it's a diversified index fund, the dips are temporary and the long trend is up."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "portfolio4-aq1",
          question: "Why is DCA an especially good fit for Marcus?",
          options: [
            "It fully guarantees he'll beat every other investor out there",
            "He earns gradually, so investing as money arrives is natural",
            "It lets him safely buy a single very risky stock",
            "It completely removes all risk of ever losing any money"
          ],
          correctAnswer: 1,
          explanation: "Marcus has no lump sum - he earns steadily, so investing each payday is simply the sensible approach. DCA turns it into an automatic habit, though it doesn't remove all risk."
        }
      },
      {
        type: "recap",
        takeaways: [
          "DCA invests a fixed amount on a schedule, buying more shares when prices are low.",
          "It can pull your average cost below the average price and removes timing stress.",
          "Its biggest strength is behavioral: automatic buying removes panic and emotion.",
          "In a steadily rising market, a lump sum usually beats DCA mathematically.",
          "For people earning gradually, DCA is simply the natural way to invest - pair it with a diversified fund."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "portfolio4-mastery1",
            question: "Under DCA, when a fund's price falls, your fixed payment buys…",
            options: [
              "Fewer shares than usual",
              "More shares than usual",
              "Exactly the same shares as always",
              "No shares until prices recover"
            ],
            correctAnswer: 1,
            explanation: "A fixed dollar amount buys more shares when each share is cheaper. That's why market dips lower your average cost per share under DCA."
          },
          {
            id: "portfolio4-mastery2",
            question: "You invest $100 at $10, then $100 at $5. Your average cost per share is…",
            options: [
              "$10.00, the higher price",
              "About $6.67 per share",
              "$5.00, the lower price",
              "$15.00, the two prices added"
            ],
            correctAnswer: 1,
            explanation: "You buy 10 + 20 = 30 shares for $200, so $200 / 30 is about $6.67 - below the $7.50 average of the two prices, thanks to buying more when cheap."
          },
          {
            id: "portfolio4-mastery3",
            question: "The single biggest benefit of DCA is that it…",
            options: [
              "Removes emotion and market-timing guesswork",
              "Guarantees a profit on every purchase",
              "Doubles your money within one year",
              "Eliminates the need to diversify at all"
            ],
            correctAnswer: 0,
            explanation: "By making buying automatic, DCA stops you from panic-selling in crashes or piling in at peaks. Its power is discipline, not a guaranteed profit."
          },
          {
            id: "portfolio4-mastery4",
            question: "In a market that steadily rises, what usually beats DCA?",
            options: [
              "Investing a lump sum all at once",
              "Waiting many long years to invest anything",
              "Selling off a little bit each month",
              "Keeping all of the money sitting in cash"
            ],
            correctAnswer: 0,
            explanation: "If prices keep climbing, money invested sooner earns more, so a lump sum wins about two-thirds of the time. DCA's edge is protection and discipline, not peak returns."
          },
          {
            id: "portfolio4-mastery5",
            question: "DCA works best when the money is invested in…",
            options: [
              "A single struggling little company",
              "A broad, diversified index fund",
              "Whatever stock is trending online",
              "A checking account earning nothing"
            ],
            correctAnswer: 1,
            explanation: "DCA can't rescue a bad investment - steadily buying a failing firm just loses money slowly. Paired with a diversified fund, the dips are temporary and the trend is up."
          },
          {
            id: "portfolio4-mastery6",
            question: "For someone earning a paycheck every two weeks, DCA is…",
            options: [
              "Completely impossible without a large upfront lump sum",
              "The natural way to invest as money arrives",
              "Only ever legal for investors over the age of 30",
              "A clever way to totally avoid paying any taxes"
            ],
            correctAnswer: 1,
            explanation: "Earning gradually means you invest gradually - DCA is just the sensible fit. Automating a transfer each payday makes investing an effortless, consistent habit."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // portfolio-5: Rebalancing
  // ─────────────────────────────────────────────
  {
    lessonId: "portfolio-5",
    sections: [
      {
        type: "concept",
        title: "Why Your Mix Drifts Over Time",
        paragraphs: [
          "Rebalancing is the act of adjusting your portfolio back to your target mix after the market pushes it out of shape. Say you set a 70% stock, 30% bond allocation. If stocks have a great year and bonds are flat, stocks might grow to 80% of your portfolio while bonds shrink to 20%. You didn't choose that - the market did it for you. Now you're taking more risk than you intended, because a crash would hit that oversized stock slice hard. Rebalancing sells some of the winners and buys more of the laggards to restore your original 70/30 target.",
          "This drift is guaranteed, because your assets grow at different rates. Whatever has been rising takes over a bigger and bigger share of your portfolio, quietly turning a balanced plan into a riskier one without you noticing. A portfolio that started at a comfortable 60/40 can drift to 75/25 after a long bull market - meaning you're now exposed to far more downside right when stocks are most expensive. Rebalancing is the maintenance that keeps your risk level matching the one you actually chose, instead of the one the market accidentally handed you.",
          "The genius of rebalancing is that it forces you to do the hard, correct thing automatically: sell high and buy low. When stocks have soared, rebalancing makes you trim them (selling high) and add to bonds. When stocks have crashed, it makes you buy more of them (buying low) using your bonds. This is the exact opposite of what panic and greed tell you to do. You're not predicting the market - you're just returning to your target, and that mechanical discipline quietly improves returns while controlling risk."
        ],
        bullets: [
          "Rebalancing restores your portfolio to its target mix after the market shifts it.",
          "Drift is guaranteed - fast-growing assets take over a bigger share over time.",
          "An unrebalanced portfolio slowly becomes riskier than you intended.",
          "Rebalancing forces you to sell high (trim winners) and buy low (add laggards).",
          "It keeps your risk matching the level you chose, not the one the market handed you."
        ],
        realWorldExample: "You start at 60% stocks, 40% bonds. After a strong three-year run, stocks have grown to 75% of your portfolio. Without rebalancing, a 30% crash now hurts far more than you planned for. Selling stocks back down to 60% and buying bonds restores your intended, safer risk level."
      },
      {
        type: "concept",
        title: "How and When to Rebalance",
        paragraphs: [
          "There are two common triggers for rebalancing. The first is time-based: you check and reset your mix on a schedule, like once a year. It's simple and easy to remember - pick your birthday or New Year's Day. The second is threshold-based: you rebalance only when an asset drifts more than a set amount from its target, say 5 percentage points. So a 70% stock target would trigger a fix if stocks hit 75% or fell to 65%. Threshold rebalancing reacts to what the market actually does, but requires you to check more often. Many people combine them: check yearly, but also act if things drift far.",
          "Rebalancing has costs to weigh. Selling winners in a regular taxable account can trigger capital-gains taxes, and frequent trading may cost fees. That's why once a year is usually plenty - rebalancing too often adds cost without much benefit. There's a clever trick to reduce those costs: instead of selling anything, use new contributions to rebalance. If stocks are overweight, direct your next few monthly deposits entirely into bonds until the mix is back on target. In tax-sheltered accounts like retirement accounts, you can rebalance freely without triggering taxes, so it's simpler there.",
          "The hardest part of rebalancing isn't the math - it's the emotion. Selling your best-performing asset feels wrong, like benching your star player. Buying more of the thing that just crashed feels insane. But that discomfort is exactly the signal that you're doing it right, because you're going against the crowd. Rebalancing is a rule you set once, when you're calm, precisely so you don't have to make these gut-wrenching calls in the heat of a boom or a crash. Follow the rule, ignore the fear, and let the discipline work."
        ],
        bullets: [
          "Time-based rebalancing resets on a schedule (e.g., yearly); threshold-based acts on drift.",
          "Once a year is usually enough; rebalancing too often adds cost for little benefit.",
          "Use new contributions to rebalance and avoid selling, reducing taxes and fees.",
          "Retirement accounts let you rebalance freely with no tax hit.",
          "The emotional discomfort of selling winners and buying losers is a sign you're doing it right."
        ],
        realWorldExample: "Instead of selling stocks and owing taxes, Nina rebalances with new money: her mix drifted to 75% stocks, so she routes her next three $200 deposits entirely into bonds until she's back at 70/30. She never sold a thing, so she owed no capital-gains tax."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "portfolio5-mc1",
            question: "What is the purpose of rebalancing?",
            options: [
              "To restore your portfolio to its target mix",
              "To pick the single best stock each year",
              "To move all of your money entirely into cash",
              "To completely avoid ever paying any investment fees"
            ],
            correctAnswer: 0,
            explanation: "Rebalancing returns your portfolio to the allocation you chose after the market shifts it, keeping your risk at the level you intended."
          },
          {
            id: "portfolio5-mc2",
            question: "Rebalancing forces you to do which uncomfortable-but-smart thing?",
            options: [
              "Always buy high and then sell low",
              "Sell winners and buy the laggards",
              "Move everything into one hot asset",
              "Stop all investing after every single gain"
            ],
            correctAnswer: 1,
            explanation: "By returning to your target, rebalancing trims what has risen (selling high) and adds to what has lagged (buying low) - the opposite of what panic and greed suggest."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sam's Portfolio Drifts After a Boom",
        narrative: "Sam set a 70% stock, 30% bond target two years ago. After a strong bull market, his portfolio is now 82% stocks and 18% bonds. He feels great about the gains, but a crash would now hurt far more than he originally planned for.",
        details: [
          "Sam never chose 82% stocks - the market's rise created that drift.",
          "He's now taking more risk than his 70/30 target intended.",
          "Rebalancing means trimming stocks and adding bonds to get back to 70/30.",
          "Selling his winners feels wrong, but that discomfort is the sign he's doing it right."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "portfolio5-aq1",
          question: "What should Sam do to control his risk?",
          options: [
            "Buy even more stocks to ride the boom",
            "Rebalance back toward his 70/30 target",
            "Sell everything and hold only cash",
            "Wait until stocks reach 100% of the mix"
          ],
          correctAnswer: 1,
          explanation: "Sam should trim stocks and add bonds to restore his 70/30 target. That returns his risk to the level he chose - even though selling winners feels uncomfortable."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Rebalancing restores your target mix after the market causes drift.",
          "Drift is guaranteed, and an unrebalanced portfolio slowly grows riskier.",
          "Rebalancing mechanically makes you sell high and buy low.",
          "Once a year is usually enough; use new contributions to avoid taxes and fees.",
          "The discomfort of selling winners and buying losers means you're doing it right."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "portfolio5-mastery1",
            question: "Why does an unrebalanced portfolio drift toward more risk over time?",
            options: [
              "Bonds are legally required to shrink each year",
              "Fast-growing assets take over a bigger share",
              "Brokers secretly move your invested money around",
              "Idle cash automatically converts itself into stocks"
            ],
            correctAnswer: 1,
            explanation: "Whatever rises fastest, usually stocks, grows to dominate the mix, quietly pushing your risk above the level you chose - until you rebalance."
          },
          {
            id: "portfolio5-mastery2",
            question: "Time-based rebalancing means you reset your mix…",
            options: [
              "On a fixed schedule, like once a year",
              "Only right after the entire stock market fully crashes",
              "Every single day the market is open",
              "Never again, once you have first set it up"
            ],
            correctAnswer: 0,
            explanation: "Time-based rebalancing checks and resets your allocation on a regular schedule - often yearly - which is simple and easy to remember."
          },
          {
            id: "portfolio5-mastery3",
            question: "A smart way to rebalance without triggering taxes is to…",
            options: [
              "Immediately sell off every single winning asset at once",
              "Direct new contributions to the underweight asset",
              "Never rebalance under any circumstances ever",
              "Trade very rapidly several times each week"
            ],
            correctAnswer: 1,
            explanation: "Routing new deposits into whatever is below target restores your mix without selling, so you avoid capital-gains taxes and extra trading fees."
          },
          {
            id: "portfolio5-mastery4",
            question: "Rebalancing too frequently in a taxable account tends to…",
            options: [
              "Add costs and taxes for little benefit",
              "Fully guarantee much higher yearly returns",
              "Be strictly required by federal securities law",
              "Completely remove all of the market risk entirely"
            ],
            correctAnswer: 0,
            explanation: "Frequent selling triggers taxes and fees without meaningfully improving results. Once a year, or on a set threshold, is usually plenty."
          },
          {
            id: "portfolio5-mastery5",
            question: "Threshold-based rebalancing is triggered when…",
            options: [
              "The yearly calendar finally reaches your next birthday again",
              "An asset drifts past a set distance from target",
              "You suddenly feel very nervous about the whole market",
              "A brand-new fund is launched by your online broker"
            ],
            correctAnswer: 1,
            explanation: "Threshold rebalancing acts when an asset moves beyond a chosen band, like 5 percentage points from target, responding to what the market actually does."
          },
          {
            id: "portfolio5-mastery6",
            question: "Feeling reluctant to sell your best performer during rebalancing means…",
            options: [
              "You should probably skip rebalancing this one time",
              "You're likely doing the right, disciplined thing",
              "Your original target mix must simply be wrong",
              "You should buy even more of it"
            ],
            correctAnswer: 1,
            explanation: "Selling winners and buying laggards feels wrong precisely because it goes against the crowd - which is exactly why the discipline works. Follow the rule, not the fear."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // portfolio-6: Index Investing
  // ─────────────────────────────────────────────
  {
    lessonId: "portfolio-6",
    sections: [
      {
        type: "concept",
        title: "Owning the Whole Market at Once",
        paragraphs: [
          "The Investing Fundamentals unit already introduced index funds as a low-cost way to own many companies at once; this lesson treats index investing as a whole PORTFOLIO strategy - the decision to build your plan around matching the market rather than beating it. As a quick recap, an index is a list that tracks a slice of the market: the S&P 500, for example, tracks 500 big US companies, and one purchase of an S&P 500 fund makes you a tiny part-owner of all of them. Your return simply matches whatever that basket does as a group - and this lesson is about why choosing that as your core is so powerful.",
          "The magic is that matching the market beats most attempts to outsmart it. It sounds like settling for average, but 'average' here is powerful: the US market has returned roughly 10% a year over the long run. Over decades, most professional stock-pickers fail to beat a plain index fund, mostly because their fees and trading costs eat their gains. If a pro charges 1% a year and the index charges 0.03%, that gap compounds into a huge difference over 40 years. By not trying to be clever, index investors quietly win.",
          "Index funds also make investing simple and calm. You don't spend hours researching companies or panic when one stock tanks - if one company fails, it's a tiny slice of hundreds, so the damage is small. You just keep buying the whole market and let it grow. A teen who invests $100 a month into an S&P 500 index fund from age 18 owns a piece of the entire American economy without ever reading a single earnings report. That mix of low effort, low cost, and broad ownership is why index investing became so popular."
        ],
        bullets: [
          "An index fund copies a market index, so one purchase owns many companies at once.",
          "The S&P 500 index tracks 500 large US firms; buying it makes you a part-owner of all of them.",
          "Matching the market's roughly 10% long-run return beats most stock-pickers over time.",
          "Broad ownership means one company failing barely dents your total.",
          "Low cost and low effort make index funds ideal for hands-off long-term investors."
        ],
        realWorldExample: "Warren Buffett, one of the greatest investors ever, told regular people to just buy a low-cost S&P 500 index fund. In 2007 he bet $1 million that a simple index fund would beat a group of expert hedge funds over ten years. He won easily - the index crushed the pros after their high fees."
      },
      {
        type: "concept",
        title: "What You're Really Buying - and Giving Up",
        paragraphs: [
          "It's worth understanding what happens under the hood. An index fund holds every company on the index in proportion to its size, and when the index changes its list - adding a fast-growing firm, dropping a shrinking one - the fund quietly adjusts to match. You never have to make those calls yourself. This is why a single fund can own the whole market and still charge almost nothing: there's no team of analysts, just a rule that copies a list. (The next lesson, on active versus passive, digs into why this cheapness so reliably beats managers who try to outguess the list.)",
          "But 'owning the whole market' hides a subtle catch worth knowing. Because most indexes weight by company size, a broad index fund is more concentrated at the top than it looks - the largest handful of companies can make up a big chunk of your money, so if those giants stumble, your 'diversified' fund feels it. That's not a reason to avoid indexing; it's a reason to understand that a total-market fund still leans toward today's biggest winners, and pairing it with other assets keeps you from riding on just a few names.",
          "Index investing isn't magic and it isn't risk-free. When the whole market drops, your index fund drops too - it won't dodge a crash. And it will never beat the market, only match it, so you give up the dream of picking the next huge winner. But for most people, matching a market that historically climbs over decades, at almost no cost and no stress, is a fantastic deal. The trade-off - no chance to be a hero, in exchange for reliable, cheap, broad growth - is one most long-term investors happily accept."
        ],
        bullets: [
          "An index fund copies the index's list automatically, so no analysts are needed.",
          "When the index adds or drops a company, the fund rebalances to match with no work from you.",
          "Cap weighting means a few giant firms can dominate a 'broad' fund - it leans toward the biggest.",
          "You still fall when the whole market falls - indexing does not dodge crashes.",
          "You match the market rather than beat it, trading hero potential for cheap, steady growth."
        ],
        realWorldExample: "A total US stock index fund holds thousands of companies, yet its largest handful of tech giants can make up a fifth or more of the money. When those few names have a rough year, even a 'fully diversified' index holder feels it - a reminder that broad still leans toward the biggest."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "portfolio6-mc1",
            question: "What do you actually own when you buy an S&P 500 index fund?",
            options: [
              "A tiny slice of all 500 companies in the index",
              "Shares of only the single best performing company by far",
              "A short-term interest-bearing loan made to the US government",
              "A written promise from a star manager to always beat the market"
            ],
            correctAnswer: 0,
            explanation: "An index fund copies the whole index, so one purchase makes you a part-owner of all 500 firms at once - spreading your money broadly instead of betting on one."
          },
          {
            id: "portfolio6-mc2",
            question: "What happens inside an index fund when the index adds or drops a company?",
            options: [
              "A manager votes on whether to allow the change",
              "The fund quietly adjusts its holdings to match",
              "The fund must be shut down and relaunched",
              "Nothing - index funds never change their holdings"
            ],
            correctAnswer: 1,
            explanation: "An index fund just copies the list, so it rebalances to match whenever the index changes - no analyst decisions needed, which is why it stays cheap."
          }
        ]
      },
      {
        type: "scenario",
        title: "Elena Compares Two Paths",
        narrative: "Elena, 18, has $3,000 to invest for the next 30 years. A friend pushes her toward a managed fund with a 1.1% yearly fee that promises to beat the market. Elena also sees a plain S&P 500 index fund charging 0.04%. She wants the best long-term outcome.",
        details: [
          "History shows most managed funds fail to beat the index after their fees.",
          "The fee gap is about 1% per year, which compounds heavily over 30 years.",
          "The index fund gives instant ownership of 500 companies with almost no cost.",
          "Elena won't check on it often, so a simple, cheap, hands-off option suits her."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "portfolio6-aq1",
          question: "Which choice best fits Elena's long-term, hands-off goal?",
          options: [
            "The managed fund, because its fee proves quality",
            "The 0.04% S&P 500 index fund",
            "Split it between ten single hot stocks",
            "Cash, to guarantee he never loses a cent"
          ],
          correctAnswer: 1,
          explanation: "The cheap index fund gives broad ownership and, historically, beats most managed funds after fees. Over 30 years the 1% fee gap alone would cost Elena a large sum."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Index investing buys a whole market index, owning many companies in one purchase.",
          "Matching the market's long-run return beats most stock-pickers after fees.",
          "Tiny fees are the secret - a 1% gap compounds into tens of thousands over decades.",
          "Broad ownership softens the blow when any single company fails.",
          "You match the market, not beat it - cheap, calm, reliable growth for the long haul."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "portfolio6-mastery1",
            question: "The main appeal of an index fund is that it…",
            options: [
              "Fully guarantees you beat every single rival investor out there",
              "Owns a broad basket cheaply and matches the market",
              "Completely avoids all losses when the markets crash",
              "Lets a genius fund manager pick all winners for you"
            ],
            correctAnswer: 1,
            explanation: "Index funds own a wide basket at very low cost and simply match the market's return - which, after fees, beats most active investors over time."
          },
          {
            id: "portfolio6-mastery2",
            question: "Why can one index fund own the whole market yet charge almost nothing?",
            options: [
              "The government pays its costs for it",
              "It just copies a list instead of paying analysts",
              "It secretly charges hidden fees elsewhere",
              "It only holds one company at a time"
            ],
            correctAnswer: 1,
            explanation: "An index fund mechanically mirrors the index's list, so there's no expensive research team to pay - which is exactly why its fees can be tiny."
          },
          {
            id: "portfolio6-mastery3",
            question: "A subtle catch of a cap-weighted 'total market' index fund is that…",
            options: [
              "The largest few firms can dominate your money",
              "It secretly holds only bonds instead of stocks",
              "It equally weights every single company in it",
              "It refuses to ever add any new companies"
            ],
            correctAnswer: 0,
            explanation: "Cap weighting means a handful of giant firms can make up a big chunk of a 'broad' fund, so it leans toward today's biggest names more than it appears."
          },
          {
            id: "portfolio6-mastery4",
            question: "If one company inside a broad index fund goes bankrupt, your fund…",
            options: [
              "Instantly loses absolutely everything you invested",
              "Barely moves, since it's a tiny slice",
              "Is legally shut down and closed at once",
              "Doubles in its total value fully automatically"
            ],
            correctAnswer: 1,
            explanation: "One firm is a small fraction of hundreds, so its failure barely dents the total. Broad ownership is what makes a single collapse survivable."
          },
          {
            id: "portfolio6-mastery5",
            question: "A real limit of index investing is that it…",
            options: [
              "Never falls, even in a market crash",
              "Matches the market but cannot beat it",
              "Requires constant daily research to actually work",
              "Charges the very highest fees available anywhere"
            ],
            correctAnswer: 1,
            explanation: "You give up the chance to beat the market or pick the next huge winner; you simply match it. You also fall when the whole market falls."
          },
          {
            id: "portfolio6-mastery6",
            question: "Even a broad index fund still exposes you to which risk?",
            options: [
              "Falling when the whole market falls",
              "One company's failure wiping you out",
              "Paying the very highest fees available",
              "Being unable to ever sell your shares"
            ],
            correctAnswer: 0,
            explanation: "Indexing spreads out single-company risk, but it can't dodge a market-wide crash - when the whole market drops, your index fund drops right along with it."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // portfolio-7: Active vs Passive
  // ─────────────────────────────────────────────
  {
    lessonId: "portfolio-7",
    sections: [
      {
        type: "concept",
        title: "Two Ways to Run a Portfolio",
        paragraphs: [
          "There are two basic philosophies for investing. Active investing means someone - you or a paid manager - constantly researches, buys, and sells specific stocks, trying to beat the market average. Passive investing means quietly buying the whole market through an index fund and holding it, aiming to match the market rather than beat it. An active manager is like a chef tasting and adjusting every dish; a passive investor just orders the reliable set menu. Both want to grow money, but they differ on effort, cost, and how much they trust their own cleverness.",
          "Active investing sounds smarter, and sometimes it wins big - a manager who spots a soaring stock early can crush the average. But it costs more: active funds often charge 0.5% to 1% or more per year to pay researchers and cover heavy trading. Those costs are a headwind every single year. Passive index funds charge as little as 0.03%, because they just copy a list. Over decades that fee gap compounds enormously. So active has to beat the market by enough to cover its higher costs before its investors come out ahead - a bar most managers fail to clear.",
          "The scoreboard is brutal for active. Study after study finds that over 10 or 20 years, the large majority of active US stock funds trail their index benchmark, mainly because of fees and the difficulty of consistently guessing right. A fund might beat the market one year and lag the next three. Passive doesn't try to be a hero, so it never has a spectacular year - but it also avoids the drag of high fees and bad guesses. For most ordinary investors, especially teens with long horizons, passive is the reliable default."
        ],
        bullets: [
          "Active investing researches and trades specific stocks, trying to beat the market.",
          "Passive investing buys the whole market via an index fund and holds it to match the market.",
          "Active costs more - often 0.5% to 1%+ yearly versus as little as 0.03% for passive.",
          "Active must beat the market by enough to cover its higher fees before it wins.",
          "Over 10-20 years, most active funds trail their index, so passive is the sensible default."
        ],
        realWorldExample: "The yearly SPIVA report tracks active funds versus indexes. Over 15-year stretches it repeatedly finds that roughly 90% of active US large-cap funds lag the S&P 500. That means only about one in ten justified its higher fees over the long haul."
      },
      {
        type: "concept",
        title: "When Active Might Make Sense - and When It Doesn't",
        paragraphs: [
          "Passive isn't automatically right for every situation. In some corners of the market - thinly traded small companies or foreign markets where information is scarce - a skilled active manager has a better shot at finding mispriced bargains. Active can also let an investor avoid something on purpose, like screening out companies they find unethical, or shift out of an overheated area. So the honest answer to 'active or passive?' is 'it depends,' though for the broad, heavily-analyzed US large-company market, passive tends to win because thousands of pros have already priced everything.",
          "A hidden problem with active is picking a winning manager in advance. Even if some managers do beat the market, last year's star often becomes next year's dud - past performance rarely predicts the future. So you're not just betting that active can win; you're betting you can identify the rare winner before their hot streak, and then that they keep it up. That's two hard guesses stacked on top of each other. Passive skips both bets entirely by just taking the market return, which is why it's so hard to beat over time.",
          "For most teens, the practical takeaway is a blend leaning heavily passive. Build your core with cheap, broad index funds you hold for decades - that's the reliable engine. If you truly enjoy investing, you can carve out a small slice, say 5% or 10%, to actively pick a few stocks you've researched and learn from the experience. But keep the bulk passive so a few bad active bets can't wreck your future. Curiosity is great; just don't bet your whole nest egg on beating a game most experts lose."
        ],
        bullets: [
          "Active can help in obscure markets where bargains are easier to find.",
          "Active also lets you deliberately screen out or avoid certain companies.",
          "Picking a winning manager in advance is hard - past performance rarely predicts the future.",
          "Passive skips both bets by simply taking the market return, which is tough to beat.",
          "A sensible teen plan: mostly cheap index funds, maybe a small slice for active learning."
        ],
        realWorldExample: "A famous study found that funds ranked top-quarter one year had roughly the same chance of landing bottom-quarter the next as staying on top. Yesterday's winning manager was close to a coin flip going forward - which is why chasing hot funds so often disappoints."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "portfolio7-mc1",
            question: "What is the core goal of PASSIVE investing?",
            options: [
              "To match the market by holding an index fund",
              "To beat the whole market by trading stocks constantly",
              "To avoid ever owning any individual stocks at all",
              "To fully guarantee a fixed return every single year"
            ],
            correctAnswer: 0,
            explanation: "Passive investing buys and holds the whole market through an index fund, aiming to match the market's return at very low cost rather than beat it."
          },
          {
            id: "portfolio7-mc2",
            question: "Why does active investing face a higher bar to win?",
            options: [
              "Active mutual funds are always taxed twice over by federal law",
              "It must beat the market by enough to cover higher fees",
              "Passive index funds are fully guaranteed to always rise much faster",
              "Active fund managers are strictly banned from owning any big-name stocks"
            ],
            correctAnswer: 1,
            explanation: "Active funds charge more for research and trading, so they must outperform the market by enough to cover those extra costs before investors come out ahead."
          }
        ]
      },
      {
        type: "scenario",
        title: "Dana Designs Her First Plan",
        narrative: "Dana, 17, is excited about investing and reads about a fund manager who beat the market last year. She's tempted to put all her $2,000 into that active fund, which charges 0.95% a year. She also likes the idea of learning by picking a couple of stocks herself.",
        details: [
          "Most active funds trail their index over 10-plus years after fees.",
          "Last year's winning manager often lags in following years.",
          "A cheap index core would give her reliable, broad growth.",
          "She wants some hands-on learning without risking her whole balance."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "portfolio7-aq1",
          question: "What's the smartest structure for Dana?",
          options: [
            "Put all of the $2,000 straight into the current hot active fund",
            "Mostly a cheap index fund, a small slice for active learning",
            "All $2,000 straight into the single stock she likes the most",
            "Keep every dollar sitting in cash to completely avoid the decision"
          ],
          correctAnswer: 1,
          explanation: "A large passive core gives reliable growth, while a small active slice lets Dana learn without letting a bad guess or last year's fading star wreck her whole balance."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Active investing trades to beat the market; passive holds an index to match it.",
          "Active costs far more, so it must outperform just to break even on fees.",
          "Over long periods, roughly 90% of active US stock funds trail their index.",
          "Picking a winning manager ahead of time is hard - past success rarely repeats.",
          "A practical plan is a big cheap-index core, with maybe a small active slice to learn."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "portfolio7-mastery1",
            question: "An active investor is best described as someone who…",
            options: [
              "Simply buys and holds the whole entire market cheaply",
              "Researches and trades to beat the market average",
              "Only ever invests in safe government cash accounts",
              "Never once checks their own portfolio at all"
            ],
            correctAnswer: 1,
            explanation: "Active investing means researching, buying, and selling specific stocks in an effort to beat the market - the opposite of passively holding an index."
          },
          {
            id: "portfolio7-mastery2",
            question: "The biggest reason active funds lag over the long run is…",
            options: [
              "They are always legally required to lose money",
              "High fees plus the difficulty of guessing right",
              "Index funds openly cheat by secretly hiding losses",
              "Stocks always seem to fall for active managers"
            ],
            correctAnswer: 1,
            explanation: "Higher fees are a yearly headwind, and consistently picking winners is hard, so most active funds fall behind their index over 10 to 20 years."
          },
          {
            id: "portfolio7-mastery3",
            question: "What does the SPIVA-style data typically show over 15 years?",
            options: [
              "About 90% of active large-cap funds trail the index",
              "Nearly all active funds beat the whole index very easily",
              "Index funds are strictly illegal in most other countries",
              "Active and passive funds tie exactly every single year"
            ],
            correctAnswer: 0,
            explanation: "Long-run studies repeatedly find roughly 90% of active US large-cap funds lagging the S&P 500, so only about one in ten justified its higher fees."
          },
          {
            id: "portfolio7-mastery4",
            question: "Why is chasing last year's top fund manager risky?",
            options: [
              "Winners are forced to close their funds",
              "Past performance rarely predicts future results",
              "Top managers must return all their gains",
              "It always guarantees a repeat win"
            ],
            correctAnswer: 1,
            explanation: "Yesterday's star often becomes next year's laggard. Picking a future winner in advance is close to a coin flip, which is why hot-fund chasing disappoints."
          },
          {
            id: "portfolio7-mastery5",
            question: "In which situation might active investing have a better shot?",
            options: [
              "The very heavily-analyzed and crowded US large-cap market",
              "Obscure markets where bargains are easier to find",
              "A plain everyday bank checking or savings account",
              "A market that no one is allowed to trade"
            ],
            correctAnswer: 1,
            explanation: "In thinly traded or foreign markets where information is scarce, a skilled manager may find mispriced bargains - unlike the crowded, well-priced US large-cap space."
          },
          {
            id: "portfolio7-mastery6",
            question: "A sensible teen structure blends the two by…",
            options: [
              "Putting absolutely everything that you own into hot active funds",
              "Using a big cheap-index core plus a small active slice",
              "Holding only cash forever and simply never once investing at all",
              "Blindly copying some random fund manager's every single trade"
            ],
            correctAnswer: 1,
            explanation: "A large passive core provides reliable growth, while a small active slice allows learning - so a few bad active bets can't wreck the whole portfolio."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // portfolio-8: Performance Tracking
  // ─────────────────────────────────────────────
  {
    lessonId: "portfolio-8",
    sections: [
      {
        type: "concept",
        title: "Measuring How You're Really Doing",
        paragraphs: [
          "Tracking performance means figuring out how well your investments are actually doing - not by feel, but with numbers. The most basic measure is total return: how much your money grew, including both price gains and any dividends. If you put in $1,000 and it's now worth $1,150, your total return is $150, or 15%. Dividends matter: if a stock's price barely moved but paid you $30 in cash, that $30 still counts. Beginners often watch only the price and forget the dividends, which understates how well they're really doing.",
          "Raw dollar gains can fool you, so investors use percentages and compare against a benchmark - a yardstick like the S&P 500. Suppose your portfolio rose 8% this year. That sounds great until you learn the S&P 500 rose 15%; you actually lagged the market by 7 points. Or maybe the market fell 10% and you only fell 3% - now your 'loss' is actually a win relative to everyone else. A benchmark answers the real question: did your choices beat simply buying the whole market, or would you have done better doing nothing clever?",
          "Time frame and consistency matter too. One great year proves little - a lucky bet can look brilliant briefly. Serious tracking looks at returns over 3, 5, and 10 years, because that reveals whether your results are skill or noise. It also helps to note WHY something moved: did your stock rise because the whole market rose, or because that specific company did something right? Good tracking isn't about obsessing daily; it's about honest, periodic check-ins that tell you whether your strategy is working or needs adjusting."
        ],
        bullets: [
          "Total return includes price change plus dividends, not just the price.",
          "Convert gains to percentages so you can compare fairly across amounts.",
          "Compare against a benchmark like the S&P 500 to see if you beat the market.",
          "Beating the market matters more than a raw gain; a small loss can beat a crashing market.",
          "Judge results over several years, not one lucky season, to separate skill from noise."
        ],
        realWorldExample: "Imagine bragging that your portfolio gained 12% in a year - impressive, until you check that the S&P 500 gained 26% that same year. You actually underperformed the market badly. Without a benchmark, a 'good' number can hide the fact that you'd have done far better in a plain index fund."
      },
      {
        type: "concept",
        title: "The Traps That Fool Beginners",
        paragraphs: [
          "One classic trap is ignoring fees and taxes. A fund might report a 9% return, but if it charges 1% in fees, you actually keep 8%. And if you sell for a gain in a taxable account, taxes shave off more. Real performance is what lands in your pocket after costs, not the flashy headline number. Another trap is confusing more activity with better results: someone who trades constantly may show lots of action but, after fees and mistakes, trail a lazy investor who bought an index fund and never touched it.",
          "A subtler trap is judging performance without accounting for risk. A friend who put everything into one wild crypto coin and doubled their money didn't necessarily 'invest better' than you - they took a huge gamble that happened to pay off, and could just as easily have lost half. Comparing returns only makes sense when the risk levels are similar. A steady 9% from a diversified portfolio is more impressive, and more repeatable, than a lucky 40% from a single reckless bet that could reverse next year.",
          "Finally, beware recency and cherry-picking. It's tempting to measure from whatever start date makes you look best, or to fixate on your one winning stock while ignoring the losers. Honest tracking measures your whole portfolio over a fixed period and compares it fairly to a benchmark. The goal isn't to feel good; it's to learn. If you're consistently lagging the market, that's useful information telling you to simplify toward index funds. Tracking done honestly turns investing from guessing into a feedback loop where you actually improve."
        ],
        bullets: [
          "Subtract fees and taxes - real performance is what you keep, not the headline number.",
          "More trading isn't better; heavy activity often trails a buy-and-hold index investor.",
          "Compare returns only at similar risk; a lucky big bet isn't proof of skill.",
          "Avoid cherry-picking start dates or spotlighting only your winners.",
          "Track your whole portfolio over fixed periods to learn and improve, not to feel good."
        ],
        realWorldExample: "A study of individual traders found the most active traders earned far lower net returns than those who traded least - after fees and mistakes, their frantic activity cost them several percentage points a year. Busy did not mean better; the calm buy-and-hold crowd quietly won."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "portfolio8-mc1",
            question: "What does 'total return' include beyond the price change?",
            options: [
              "Only the total fees you paid",
              "Any dividends the investment paid you",
              "The registered name of your broker",
              "How many times you logged in"
            ],
            correctAnswer: 1,
            explanation: "Total return adds dividends to the price change. Ignoring dividends understates how well you did, since that cash counts as real return."
          },
          {
            id: "portfolio8-mc2",
            question: "Why compare your return to a benchmark like the S&P 500?",
            options: [
              "It is always strictly required just to file your yearly taxes",
              "It shows whether you beat simply buying the market",
              "It fully guarantees your whole portfolio will always rise",
              "It conveniently hides all of your fees from view"
            ],
            correctAnswer: 1,
            explanation: "A benchmark answers the real question: did your choices beat the market, or would a plain index fund have done better? A raw gain alone can't tell you that."
          }
        ]
      },
      {
        type: "scenario",
        title: "Owen Checks His First Year",
        narrative: "Owen, 18, is proud that his stock portfolio gained 9% in his first year. He's about to tell everyone he's a great investor. Before he does, he decides to look a little closer at the full picture.",
        details: [
          "The S&P 500 index returned 22% over the same year.",
          "His portfolio also charged him about 0.9% in fees, which he hadn't subtracted.",
          "Most of his gain came from one stock; the rest of his picks lost money.",
          "A simple index fund would have far outpaced his 9% result."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "portfolio8-aq1",
          question: "What is the most honest conclusion for Owen?",
          options: [
            "He's a truly great investor simply because that 9% is positive",
            "He actually lagged the market and should consider indexing",
            "Fees don't really matter at all since he still gained",
            "One single winning stock clearly proves his real skill"
          ],
          correctAnswer: 1,
          explanation: "Against a 22% benchmark, Owen's 9% (even less after fees) badly underperformed. Honest tracking reveals he'd have done far better in an index fund - useful information, not an insult."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Total return combines price gains and dividends; convert it to a percentage.",
          "Compare against a benchmark to see if you actually beat the market.",
          "Subtract fees and taxes - real performance is what you keep.",
          "Judge returns at similar risk levels and over multiple years, not one lucky season.",
          "Avoid cherry-picking; honest tracking is a feedback loop that helps you improve."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "portfolio8-mastery1",
            question: "You invest $1,000, it's worth $1,120, and it paid $30 in dividends. Total return is…",
            options: [
              "12%, completely ignoring the dividends",
              "15%, counting price plus dividends",
              "3%, counting only the paid dividends",
              "0%, since you haven't sold"
            ],
            correctAnswer: 1,
            explanation: "Price rose $120 and dividends added $30, for $150 on $1,000 - a 15% total return. Leaving out dividends would understate your real result."
          },
          {
            id: "portfolio8-mastery2",
            question: "Your portfolio fell 3% while the market fell 10%. Relative to the market, you…",
            options: [
              "Did much worse, because you clearly lost money",
              "Did better, since you fell far less",
              "Broke exactly even with the whole market",
              "Cannot ever compare during a down year"
            ],
            correctAnswer: 1,
            explanation: "Against a benchmark, losing 3% when the market lost 10% is actually a win - you outperformed by 7 points even though the raw number was negative."
          },
          {
            id: "portfolio8-mastery3",
            question: "A fund reports 9% but charges 1% in fees. Your real return is closer to…",
            options: [
              "10%, adding the fee back",
              "8%, after subtracting the fee",
              "9%, since fees don't count",
              "1%, just the fee alone"
            ],
            correctAnswer: 1,
            explanation: "Fees come out of your return, so 9% minus 1% leaves about 8%. Real performance is what you keep after costs, not the headline figure."
          },
          {
            id: "portfolio8-mastery4",
            question: "Why isn't a friend's lucky 40% from one crypto coin proof of skill?",
            options: [
              "Crypto gains are always completely fake and made up numbers",
              "It carried huge risk that could have lost half instead",
              "Forty percent is actually a very small return over time",
              "Only individual stocks can ever really show any real skill"
            ],
            correctAnswer: 1,
            explanation: "Comparing returns is only fair at similar risk. A huge single bet that paid off could just as easily have crashed, so it isn't evidence of repeatable skill."
          },
          {
            id: "portfolio8-mastery5",
            question: "Studies of individual traders found the MOST active traders usually…",
            options: [
              "Earned the very highest net returns of everyone by far",
              "Earned lower net returns after fees and mistakes",
              "Were completely banned from the market",
              "Exactly matched every single one of the calm investors"
            ],
            correctAnswer: 1,
            explanation: "Frantic trading racked up fees and errors, so the busiest traders trailed those who traded least. Activity did not translate into better results."
          },
          {
            id: "portfolio8-mastery6",
            question: "Honest performance tracking should mainly help you…",
            options: [
              "Pick the start date that flatters you",
              "Learn whether your strategy works and improve",
              "Spotlight only your single winning stock pick",
              "Feel confident no matter what the numbers say"
            ],
            correctAnswer: 1,
            explanation: "The point is a feedback loop: measure the whole portfolio fairly against a benchmark so you can see if you should simplify toward index funds and actually improve."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // portfolio-9: Risk Management
  // ─────────────────────────────────────────────
  {
    lessonId: "portfolio-9",
    sections: [
      {
        type: "concept",
        title: "Protecting Against the Big Losses",
        paragraphs: [
          "Risk management is the art of surviving the bad outcomes so you're still in the game for the good ones. Every investment can lose money; the goal isn't to eliminate risk (impossible) but to make sure no single event can wipe you out. The first tool is diversification - never putting too much in one stock, one industry, or one bet. If any single holding is only 3% of your money, even its total collapse costs you 3%, not everything. Concentration is how people go broke; spreading out is how they stay standing when something inevitably fails.",
          "A second tool is position sizing - deciding in advance how much to risk on any one idea. Even if you're sure a stock will soar, putting your entire $5,000 into it is reckless, because 'sure things' fail all the time. A common rule is to keep any single stock to a small slice, say 5% of your portfolio, so a disaster there is survivable. Related is the emergency fund: cash set aside so you never have to sell investments at the worst possible moment - like during a crash - just to cover a surprise expense. Being forced to sell low is how temporary drops become permanent losses.",
          "The third tool is matching risk to your timeline and your ability to stay calm. Money you need soon shouldn't be exposed to big swings; money for decades away can ride them out. And the biggest risk is often your own behavior: panic-selling at the bottom locks in losses that would have recovered. Good risk management includes protecting yourself from you - by automating investments, avoiding leverage (borrowed money that magnifies losses), and having a written plan you follow when fear hits. Managing risk is less about clever tricks and more about never letting one mistake end your investing journey."
        ],
        bullets: [
          "The goal is to survive bad outcomes, not to eliminate risk entirely.",
          "Diversify so no single holding failing can seriously hurt you.",
          "Use position sizing - cap any one stock at a small slice like 5%.",
          "Keep an emergency fund so you never have to sell investments at the worst time.",
          "Match risk to your timeline and guard against panic-selling and borrowed money."
        ],
        realWorldExample: "Employees who put their whole retirement savings into their own company's stock have been wiped out when that company collapsed - Enron workers famously lost both jobs and life savings at once. A cap of, say, 10% in any single stock would have turned a catastrophe into a manageable dent."
      },
      {
        type: "concept",
        title: "Tools, Trade-offs, and Traps",
        paragraphs: [
          "Different tools guard against different dangers. Diversification protects against a single company blowing up. Holding some bonds or cash protects against a broad market crash, since they usually fall less than stocks. A long time horizon protects against short-term volatility. Some investors also use stop-loss orders, which automatically sell if a stock drops past a set price, though these can backfire by selling during temporary dips. The key insight is that no single tool covers every risk, so you layer several - a diversified mix, some safer assets, an emergency fund, and a long horizon - to stay resilient.",
          "Every protection has a cost, and that trade-off is real. Holding cash and bonds cushions crashes but drags your long-run return, since they grow slower than stocks. Being too cautious is its own risk: a teen who keeps everything in cash for fear of loss may 'safely' watch inflation erode their money and miss decades of growth. Under-taking risk can quietly hurt you as much as over-taking it. Good risk management isn't about maximum safety; it's about taking enough risk to reach your goals while capping the downside so no shock can ruin you.",
          "The sneakiest trap is fake safety - things that feel protective but aren't. Chasing 'guaranteed' high returns is usually a scam, since real safety pays low returns. Buying on margin (borrowed money) to 'insure' bigger gains actually magnifies losses and can force you to sell at the worst time. And over-diversifying into dozens of overlapping funds adds complexity without real protection. The best risk management is often simple: a broad low-cost index fund or two, an appropriate bond slice, a cash cushion, no leverage, and the discipline to hold through fear. Simple, boring, and survivable beats clever and fragile."
        ],
        bullets: [
          "Layer tools - diversification, some bonds/cash, an emergency fund, a long horizon.",
          "Every protection costs something; too much cash drags your long-run return.",
          "Being over-cautious is a risk too - inflation quietly erodes idle cash.",
          "Avoid fake safety: 'guaranteed' high returns are scams, and margin magnifies losses.",
          "The best risk management is usually simple, boring, and hard to blow up."
        ],
        realWorldExample: "In the 2020 crash, investors who used borrowed money (margin) were sometimes forced to sell at the very bottom when their accounts fell too far - locking in huge losses. Those with an emergency fund and no leverage simply held on and recovered within a year."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "portfolio9-mc1",
            question: "What is the main goal of risk management?",
            options: [
              "To completely eliminate every single kind of investment risk forever",
              "To survive bad outcomes so no shock wipes you out",
              "To fully guarantee yourself the highest possible return every year",
              "To trade in and out as often as humanly possible"
            ],
            correctAnswer: 1,
            explanation: "Risk can't be eliminated. The goal is to make sure no single event can ruin you, so you stay in the game long enough for the good outcomes."
          },
          {
            id: "portfolio9-mc2",
            question: "Why keep an emergency fund in cash?",
            options: [
              "So you never sell investments at the worst time",
              "Because your cash always grows much faster than stocks",
              "To secretly hide your money away from the tax office",
              "Because stocks are illegal to hold in a crisis"
            ],
            correctAnswer: 0,
            explanation: "A cash cushion means a surprise expense won't force you to sell investments during a crash. Being forced to sell low turns temporary drops into permanent losses."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ava's All-In Temptation",
        narrative: "Ava, 18, is convinced a single tech stock will explode. She's ready to put her entire $4,000 - including the $1,000 she keeps for emergencies - into it, and even wants to borrow extra to buy more. She has no other savings.",
        details: [
          "Even 'sure things' fail; concentrating everything in one stock is dangerous.",
          "Using her emergency cash means a surprise bill could force a sale at a bad time.",
          "Borrowing to invest magnifies losses and can force selling at the bottom.",
          "Capping any single stock at a small slice would keep a disaster survivable."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "portfolio9-aq1",
          question: "What should Ava do to manage risk?",
          options: [
            "Go completely all-in on the trade and then borrow even more money for far bigger gains",
            "Keep her emergency cash, avoid borrowing, and cap the stock at a small slice",
            "Put every last dollar she owns into the single stock but skip taking out the loan",
            "Sell off absolutely everything she has and simply hold only cash forever from now on"
          ],
          correctAnswer: 1,
          explanation: "Preserving the emergency fund, avoiding leverage, and limiting one stock to a small slice keeps any disaster survivable - while still letting her take a measured bet."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Risk management means surviving bad outcomes, not eliminating risk.",
          "Diversify and size positions so no single failure can wipe you out.",
          "Keep an emergency fund so you're never forced to sell investments low.",
          "Layer tools - bonds/cash, long horizon - but remember each has a cost.",
          "Avoid fake safety: dodge scams, leverage, and panic-selling; keep it simple."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "portfolio9-mastery1",
            question: "Capping any single stock at about 5% of your portfolio is an example of…",
            options: [
              "Position sizing to limit one bet's damage",
              "Chasing after the very highest possible return",
              "A sneaky tax dodge that regulators strictly ban",
              "Fully guaranteeing that one stock will rise"
            ],
            correctAnswer: 0,
            explanation: "Position sizing decides in advance how much to risk on one idea, so even a total collapse there costs a small, survivable slice rather than everything."
          },
          {
            id: "portfolio9-mastery2",
            question: "Enron employees were wiped out mainly because they…",
            options: [
              "Held far too many different broad index funds",
              "Concentrated their savings in one company's stock",
              "Kept absolutely everything safely stored in cash",
              "Diversified widely across many different industries"
            ],
            correctAnswer: 1,
            explanation: "Putting both their jobs and savings in one company meant its collapse took everything. A cap on any single stock would have limited the damage."
          },
          {
            id: "portfolio9-mastery3",
            question: "Why is keeping everything in cash also a form of risk?",
            options: [
              "Cash is very frequently stolen right out of banks",
              "Inflation erodes it and you miss decades of growth",
              "Cash is always taxed at a full 100% each year",
              "Banks flatly refuse to hold any large cash amounts"
            ],
            correctAnswer: 1,
            explanation: "Being over-cautious has a cost: idle cash loses value to inflation and skips the long-run growth of stocks, quietly hurting a young investor."
          },
          {
            id: "portfolio9-mastery4",
            question: "Buying investments with borrowed money (margin) is risky because it…",
            options: [
              "Completely removes every bit of downside from any trade",
              "Magnifies losses and can force selling at the bottom",
              "Is always fully guaranteed by the whole federal government",
              "Only ever increases and boosts all of your gains"
            ],
            correctAnswer: 1,
            explanation: "Leverage amplifies both gains and losses, and a sharp drop can force you to sell at the worst moment - turning a recoverable dip into a permanent wipeout."
          },
          {
            id: "portfolio9-mastery5",
            question: "Which protects best against a broad market crash, not just one company?",
            options: [
              "Owning many stocks in a single industry",
              "Holding some bonds and cash",
              "Buying more of your favorite stock",
              "Using extra margin to buy stocks"
            ],
            correctAnswer: 1,
            explanation: "Bonds and cash usually fall less than stocks in a crash, cushioning the whole portfolio. Diversifying only among stocks won't help when the entire market drops."
          },
          {
            id: "portfolio9-mastery6",
            question: "The biggest risk to many investors' results is often…",
            options: [
              "Their own panic-selling at the bottom",
              "Owning a single low-cost broad index fund",
              "Holding a small dedicated emergency fund",
              "Having a very long overall time horizon"
            ],
            correctAnswer: 0,
            explanation: "Fear-driven selling at the bottom locks in losses that would have recovered. Managing risk includes protecting yourself from your own emotions with a plan you follow."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // portfolio-10: Wealth Building
  // ─────────────────────────────────────────────
  {
    lessonId: "portfolio-10",
    sections: [
      {
        type: "concept",
        title: "The Engine: Time and Compounding",
        paragraphs: [
          "This capstone lesson assembles everything into one wealth-building engine: invest steadily, keep costs low, and let compounding run for a very long time. You already met compounding in the Investing Fundamentals unit - gains earning gains - so here we just apply it at the portfolio level. Early on the growth feels slow, but the curve bends sharply upward the longer it runs. The single most powerful advantage a teen has isn't money - it's time. Forty years of compounding turns modest contributions into a fortune that a late starter can't catch, no matter how much they save later.",
          "The numbers are dramatic. Invest $200 a month from age 18 at a 9% average return, and by 65 you'd have well over half a million dollars - even though you only put in about $113,000 of your own money. The rest is compounding doing the heavy lifting. Wait until 30 to start the same $200 a month, and you'd end with less than half as much, despite contributing nearly as much cash. Those twelve early years are worth more than all the later ones combined, because they had the longest time to compound. Starting early is the closest thing investing has to a cheat code.",
          "Consistency beats brilliance. You don't need to pick perfect stocks or time the market; you need to keep investing through good times and bad. Automating contributions - a set amount every month regardless of headlines - removes emotion and guarantees you keep buying, including when prices are low during scary periods. A boring plan followed for 40 years crushes a brilliant plan abandoned after two. Wealth building rewards the disciplined tortoise, not the flashy hare who jumps in and out chasing excitement and ends up buying high and selling low."
        ],
        bullets: [
          "Compounding means your gains earn gains, curving sharply upward over long periods.",
          "A teen's biggest asset is time - decades of compounding beat a late start.",
          "$200/month from 18 at 9% can exceed $500,000 by 65, mostly from compounding.",
          "Starting early beats saving more later; the first years matter most.",
          "Consistency beats brilliance - automate contributions and keep buying through downturns."
        ],
        realWorldExample: "Two friends each invest $200 a month at 9%. Alex starts at 18 and stops at 28 - just ten years of contributions. Blake starts at 28 and invests until 65 - almost four decades. Astonishingly, Alex often ends up with more, because his early money compounded far longer. Time beat total dollars."
      },
      {
        type: "concept",
        title: "Building the Habits That Grow Net Worth",
        paragraphs: [
          "Wealth is really net worth: what you own minus what you owe. Growing it has two levers - increase assets and shrink debts. High-interest debt like credit cards, often 20%+, works like compounding in reverse and can devour any investment gains, so paying it off is usually the best 'return' available. Beyond that, the classic path is to spend less than you earn and invest the gap. Even a small consistent gap, invested and compounded, becomes large. The habit of automatically saving a slice of every paycheck before spending is how ordinary earners quietly build real wealth.",
          "Two boosters accelerate the engine. First, tax-advantaged accounts like a Roth IRA let investments grow without the drag of yearly taxes - a huge edge over 40 years. Second, raising your income and directing raises into investments, rather than inflating your lifestyle to match, speeds everything up. 'Lifestyle creep' - spending more every time you earn more - is the silent wealth killer that keeps high earners broke. The people who build wealth aren't always the biggest earners; they're the ones who keep their spending steady and funnel the difference into investments year after year.",
          "Finally, wealth building is a long game that rewards patience and protects against big mistakes. Diversified index funds provide the steady growth engine; an emergency fund and avoiding leverage prevent a single setback from resetting your progress. The plan is almost boring: start early, invest regularly, keep costs and debts low, avoid lifestyle creep, and don't panic-sell. Do that from your teens onward and compounding does something that feels almost unfair - it turns a normal income and normal habits into genuine, life-changing wealth over a working lifetime."
        ],
        bullets: [
          "Wealth is net worth - assets minus debts; grow assets and shrink debts.",
          "Pay off high-interest debt first; it's compounding working against you.",
          "Spend less than you earn and automatically invest the gap.",
          "Use tax-advantaged accounts like a Roth IRA and avoid lifestyle creep.",
          "Start early, stay diversified, and hold through downturns - the plan is boringly reliable."
        ],
        realWorldExample: "Many millionaires in long-term studies weren't doctors or CEOs - they were teachers and managers who lived below their means and invested steadily for decades. Meanwhile some high earners with fancy lifestyles had little net worth, because lifestyle creep ate every raise before it could compound."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "portfolio10-mc1",
            question: "What makes a teen investor's position so powerful?",
            options: [
              "They have the most money to invest",
              "They have decades of time for compounding",
              "They can predict which stocks will win",
              "They pay no fees at any broker"
            ],
            correctAnswer: 1,
            explanation: "Time is the teen's superpower. Forty years of compounding can turn modest contributions into a fortune a late starter can't catch, regardless of income."
          },
          {
            id: "portfolio10-mc2",
            question: "Why pay off a 20% credit card before investing more?",
            options: [
              "Credit cards are always illegal to carry any balance on",
              "It's compounding working against you at a high rate",
              "Investing gains are always guaranteed above 20% yearly",
              "Paying it off instantly doubles your whole credit score"
            ],
            correctAnswer: 1,
            explanation: "High-interest debt compounds against you, often faster than investments grow. Clearing a 20% balance is like earning a guaranteed 20% return."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nate's Two-Decade Head Start",
        narrative: "Nate, 18, can invest $150 a month into a low-cost index fund inside a Roth IRA. His older cousin, 32, plans to invest the same $150 a month. Both expect about a 9% long-run return and will hold until 65.",
        details: [
          "Nate has 47 years for compounding; his cousin has 33.",
          "Those extra 14 early years compound far longer than any later contribution.",
          "The Roth IRA lets Nate's money grow without yearly tax drag.",
          "Both invest the same monthly amount, so time is the key difference."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "portfolio10-aq1",
          question: "What best explains why Nate is likely to end far ahead?",
          options: [
            "He simply invests a much larger amount every month",
            "His early start gives compounding many more years",
            "He picks far better stocks than his cousin does",
            "Roth IRAs always fully guarantee higher returns"
          ],
          correctAnswer: 1,
          explanation: "With the same $150 a month, Nate's 14-year head start lets his money compound far longer. Early years matter most, so time - not amount - is the decisive edge."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Compounding turns steady contributions into large sums over decades.",
          "A teen's biggest edge is time; starting early beats saving more later.",
          "Pay off high-interest debt first - it compounds against you.",
          "Spend less than you earn, automate investing, and avoid lifestyle creep.",
          "Stay diversified, use tax-advantaged accounts, and hold through downturns."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "portfolio10-mastery1",
            question: "Compounding is best described as…",
            options: [
              "Your gains going on to earn their own gains",
              "A recurring account fee brokers charge you every single month",
              "Selling off your losers in order to buy the winners",
              "A special yearly tax charged on all investment profits"
            ],
            correctAnswer: 0,
            explanation: "Compounding means returns build on prior returns, so the growth curve bends sharply upward the longer money stays invested."
          },
          {
            id: "portfolio10-mastery2",
            question: "Why can a friend who invests early but briefly beat one who starts later but longer?",
            options: [
              "Early money compounds for far more years",
              "Late starters are always charged extra hidden fees",
              "Early investors get fully guaranteed higher returns",
              "Brokers directly reward whoever starts investing youngest"
            ],
            correctAnswer: 0,
            explanation: "The earliest contributions have the longest to compound, so a short early streak can outgrow a longer late one even with less total money invested."
          },
          {
            id: "portfolio10-mastery3",
            question: "Net worth is defined as…",
            options: [
              "Your total combined yearly household income",
              "What you own minus what you owe",
              "The current market value of your biggest stock",
              "How much cash is in your wallet"
            ],
            correctAnswer: 1,
            explanation: "Wealth is net worth: assets minus debts. You grow it by increasing what you own and shrinking what you owe."
          },
          {
            id: "portfolio10-mastery4",
            question: "What is 'lifestyle creep' and why does it hurt wealth?",
            options: [
              "A special income tax rate that steadily rises higher with your age",
              "Spending more each time you earn more, so nothing is invested",
              "A very slow and steady long-term rise in overall stock prices",
              "Automatically investing every single raise you ever receive at work"
            ],
            correctAnswer: 1,
            explanation: "Lifestyle creep means letting spending grow with income, so raises get consumed instead of invested - which keeps even high earners from building wealth."
          },
          {
            id: "portfolio10-mastery5",
            question: "Automating a set monthly investment mainly helps because it…",
            options: [
              "Perfectly predicts every market top and every bottom in advance",
              "Removes emotion and keeps you buying, even in downturns",
              "Fully guarantees that you can never lose any money",
              "Completely eliminates all of your fees and taxes"
            ],
            correctAnswer: 1,
            explanation: "Automatic contributions keep you investing through scary times, including when prices are low, so discipline replaces emotional guessing."
          },
          {
            id: "portfolio10-mastery6",
            question: "The main advantage of a Roth IRA for long-term wealth is that it…",
            options: [
              "Automatically doubles every contribution that you make",
              "Lets investments grow without yearly tax drag",
              "Fully guarantees you a fixed 9% yearly return",
              "Completely removes the need to ever diversify"
            ],
            correctAnswer: 1,
            explanation: "Tax-advantaged growth means no yearly tax nibbling at your gains, a large edge over decades of compounding compared with a plain taxable account."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // funds-1: What Is an ETF
  // ─────────────────────────────────────────────
  {
    lessonId: "funds-1",
    sections: [
      {
        type: "concept",
        title: "A Basket You Can Trade Like a Stock",
        paragraphs: [
          "An ETF - exchange-traded fund - is a single investment that holds a whole basket of other investments, and you can buy or sell it on the stock market like any share. Imagine a grocery basket already filled with hundreds of companies; buying one 'share' of the ETF buys you a tiny piece of everything inside. Instead of purchasing 500 stocks one by one, you buy one S&P 500 ETF and instantly own a slice of all 500. That's diversification made easy: one trade, broad ownership, no need to research hundreds of individual companies.",
          "The 'exchange-traded' part is what makes ETFs special. They trade all day on an exchange, so their price moves in real time and you can buy or sell whenever the market is open, just like a stock. You can see the price tick up and down, place your order, and own it in seconds. Most ETFs are also index funds under the hood - they simply track a benchmark like the S&P 500 - which keeps their fees very low, often around 0.03% to 0.10% a year. Low cost plus instant tradability is a big reason ETFs exploded in popularity.",
          "ETFs come in huge variety, which is both a strength and a trap. There are broad ones covering the whole US or world market, and narrow ones focused on a single sector, country, or theme. A beginner is usually best served by one or two broad, cheap ETFs that own thousands of companies. The narrow, trendy ones - a single hot industry, for example - are riskier and often exist to sell excitement. The core idea to remember: an ETF is a low-cost, diversified basket you can trade like a stock, and the broad ones are among the simplest ways to invest."
        ],
        bullets: [
          "An ETF holds a basket of investments; one share owns a slice of them all.",
          "You buy and sell ETFs on the exchange all day, just like a stock.",
          "Most ETFs track an index, so fees are very low - often around 0.03% to 0.10%.",
          "One broad ETF gives instant diversification without researching many stocks.",
          "Broad ETFs suit beginners; narrow, trendy ETFs are riskier and often sell hype."
        ],
        realWorldExample: "The first big US ETF, nicknamed 'SPY,' launched in 1993 and tracks the S&P 500. Today one share of a total-market ETF can make a teen a part-owner of thousands of companies for a fee of a few dollars per $10,000 invested - a deal unimaginable to investors a generation ago."
      },
      {
        type: "concept",
        title: "How ETFs Differ From Buying Stocks",
        paragraphs: [
          "Buying a single stock ties your fate to one company; buying an ETF spreads it across many, so no single failure can sink you. If you own one stock and it drops 50%, you're down 50%. If you own a 500-company ETF and one of them drops 50%, your ETF barely notices, because that firm is a tiny slice. This built-in diversification is the ETF's core advantage. You give up the chance to strike it rich on one lucky pick, but you also avoid the disaster of one bad company wrecking your savings.",
          "ETFs are also cheap and tax-friendly to run. Because most just track an index, they don't pay pricey managers, keeping fees tiny. Their structure also tends to trigger fewer taxable events than similar mutual funds, which can quietly boost long-term returns in a taxable account. And there's usually no minimum beyond the price of one share - sometimes under $100 - so a teen with modest savings can start. Many brokers even allow fractional shares, letting you buy a piece of a $400 ETF with just $20. Low barriers make ETFs unusually beginner-friendly.",
          "There are small catches to know. Because ETFs trade like stocks, you pay the going market price, which can sit a hair above or below the true value of the basket; sticking to popular, high-volume ETFs keeps that gap tiny. You should also avoid overtrading them - the ability to sell instantly can tempt panic-selling, undoing the buy-and-hold discipline that makes investing work. Used sensibly, though, an ETF is close to the ideal beginner tool: cheap, diversified, easy to buy, and simple to hold for the long run."
        ],
        bullets: [
          "A stock ties you to one company; an ETF spreads risk across many at once.",
          "ETFs are cheap to own and tend to be tax-efficient in taxable accounts.",
          "There's usually no minimum beyond one share's price; fractional shares lower it further.",
          "Stick to popular, high-volume ETFs so the market price tracks the basket closely.",
          "Don't let easy trading tempt panic-selling - ETFs reward buy-and-hold discipline."
        ],
        realWorldExample: "A teen with $50 could buy a fractional share of a total-market ETF and instantly own a sliver of Apple, Amazon, a small manufacturer, and thousands more - for a fee of pennies. Buying those companies individually would be impossible on $50 and cost far more in effort and commissions."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "funds1-mc1",
            question: "What best describes an ETF?",
            options: [
              "A short-term loan you personally make to just one company",
              "A basket of investments you trade like a stock",
              "A federally insured bank savings account paying a fixed interest",
              "A single individual share of just one small company"
            ],
            correctAnswer: 1,
            explanation: "An ETF holds a whole basket of investments, and you can buy or sell it on the exchange all day like a stock - giving instant diversification in one trade."
          },
          {
            id: "funds1-mc2",
            question: "Why are most ETFs so cheap to own?",
            options: [
              "The federal government directly subsidizes all of their fees",
              "They track an index instead of paying pricey managers",
              "They hold only one single very expensive stock",
              "Brokers are always legally forced to give them away free"
            ],
            correctAnswer: 1,
            explanation: "Most ETFs simply track a benchmark like the S&P 500, so they skip expensive active managers - keeping fees around 0.03% to 0.10% a year."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nina Wants Broad Ownership Cheaply",
        narrative: "Nina, 17, has $300 and wants to invest in the stock market for the long term. She doesn't want to research individual companies and can't afford to buy many stocks separately. She's comparing one broad total-market ETF against picking a couple of single stocks.",
        details: [
          "One broad ETF share would make her a part-owner of thousands of companies.",
          "The ETF charges a very low fee and needs no company research.",
          "Buying a few single stocks would leave her undiversified and exposed.",
          "Fractional shares let her start even with a small amount like $300."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "funds1-aq1",
          question: "What's the best fit for Nina's goal?",
          options: [
            "Two single stocks she read about online",
            "A broad, low-cost total-market ETF",
            "A narrow ETF tracking one hot industry",
            "Leaving the $300 in cash indefinitely"
          ],
          correctAnswer: 1,
          explanation: "A broad, cheap ETF gives instant diversification across thousands of firms with no research needed - far safer for a beginner than a couple of single stocks or a trendy narrow ETF."
        }
      },
      {
        type: "recap",
        takeaways: [
          "An ETF is a basket of investments you can trade like a stock all day.",
          "Most ETFs track an index, so fees are very low.",
          "One broad ETF gives instant diversification without picking individual stocks.",
          "There's usually no minimum beyond one share, and fractional shares help beginners.",
          "Stick to broad, high-volume ETFs and hold them - avoid trendy, narrow ones."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "funds1-mastery1",
            question: "The 'exchange-traded' part of ETF means you can…",
            options: [
              "Only ever sell it just once at the end of the year",
              "Buy and sell it on the market throughout the day",
              "Trade it only directly with the fund's own manager",
              "Never sell it at all until you fully retire"
            ],
            correctAnswer: 1,
            explanation: "ETFs trade on an exchange all day like stocks, so their price moves in real time and you can buy or sell whenever the market is open."
          },
          {
            id: "funds1-mastery2",
            question: "If one company inside a 500-stock ETF drops 50%, your ETF…",
            options: [
              "Also immediately drops by about a full 50% overnight",
              "Barely moves, since that firm is a tiny slice",
              "Is immediately shut down and forcibly closed by regulators",
              "Loses every last bit of its total value completely"
            ],
            correctAnswer: 1,
            explanation: "One company is a small fraction of the basket, so its big drop barely dents the ETF. That built-in diversification is the ETF's core advantage."
          },
          {
            id: "funds1-mastery3",
            question: "Which ETF suits a beginner best?",
            options: [
              "A narrow one tracking a single trendy sector",
              "A broad, low-cost total-market ETF",
              "One holding just a single stock",
              "A leveraged ETF that doubles daily moves"
            ],
            correctAnswer: 1,
            explanation: "A broad, cheap ETF owns thousands of companies with low risk and low cost. Narrow, trendy, or leveraged ETFs are far riskier and often sell excitement."
          },
          {
            id: "funds1-mastery4",
            question: "A fractional share lets a teen with $20…",
            options: [
              "Buy a piece of a $400 ETF",
              "Get a fully guaranteed 20% yearly return",
              "Skip paying any of the fees ever again",
              "Own the entire whole fund completely outright"
            ],
            correctAnswer: 0,
            explanation: "Fractional shares let you buy a slice of a pricey ETF with a small amount, lowering the barrier so even modest savings can start investing."
          },
          {
            id: "funds1-mastery5",
            question: "Why stick to popular, high-volume ETFs?",
            options: [
              "They are the only truly legal ones you can buy",
              "Their market price tracks the basket's value closely",
              "They never fall in a market crash",
              "They pay a fixed dividend by law"
            ],
            correctAnswer: 1,
            explanation: "High trading volume keeps an ETF's market price very close to the true value of its basket, so you avoid buying or selling at a bad gap."
          },
          {
            id: "funds1-mastery6",
            question: "A downside of ETFs trading instantly all day is that it can…",
            options: [
              "Force the fund to close early",
              "Tempt investors into panic-selling",
              "Make fees rise automatically",
              "Prevent any diversification"
            ],
            correctAnswer: 1,
            explanation: "Easy, instant selling can tempt panic during downturns, undoing the buy-and-hold discipline that makes long-term investing work. Used calmly, ETFs are ideal."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // funds-2: Mutual Funds
  // ─────────────────────────────────────────────
  {
    lessonId: "funds-2",
    sections: [
      {
        type: "concept",
        title: "Pooling Money to Buy Together",
        paragraphs: [
          "A mutual fund pools money from thousands of investors and uses the combined pile to buy a large basket of stocks, bonds, or both. Instead of you alone trying to buy dozens of companies, everyone chips in and a professional buys them for the whole group. When you invest $500, you get 'shares' of the fund that represent your slice of that giant basket. Your money rises and falls with the basket as a whole. It's teamwork: pooling lets ordinary people own broad, diversified portfolios they could never assemble alone with small amounts.",
          "Mutual funds price differently from ETFs. They don't trade all day on an exchange; instead, they're priced once per day after the market closes, at a value called the NAV - net asset value, the total worth of the basket divided by the number of shares. If you place a buy order at noon, you get that evening's price, not a live one. This once-a-day pricing feels slower than an ETF, but for a long-term investor it barely matters - and it gently discourages the frantic trading that hurts returns.",
          "There are two big families of mutual funds. Index mutual funds simply track a benchmark like the S&P 500 and charge very little, much like index ETFs. Actively managed mutual funds pay a manager to pick investments and try to beat the market, charging higher fees for the effort. As earlier lessons showed, most active funds trail their index after those fees. So the mutual fund itself is just a container; what matters is whether it's a cheap index fund or an expensive active one. A low-cost index mutual fund can be an excellent long-term core holding."
        ],
        bullets: [
          "A mutual fund pools many investors' money to buy a big shared basket.",
          "Your shares represent your slice of that basket and rise and fall with it.",
          "Mutual funds price once a day at NAV, after the market closes - not live like ETFs.",
          "Index mutual funds track a benchmark cheaply; active ones cost more to chase market-beating.",
          "The container is neutral; a low-cost index mutual fund makes a great long-term core."
        ],
        realWorldExample: "In 1976 Vanguard launched the first index mutual fund for everyday people, letting a small investor own the whole S&P 500 for a tiny fee. Critics mocked it as 'settling for average,' but decades later that fund and its copies hold trillions - because cheap, broad average beat most expensive attempts to win."
      },
      {
        type: "concept",
        title: "Costs, Convenience, and Choosing Well",
        paragraphs: [
          "Mutual funds shine on convenience. Many let you set up automatic monthly investments in exact dollar amounts - $100 a month, no matter the share price - which is perfect for steady, hands-off investing. They're the standard building block inside workplace retirement plans like a 401(k). You don't watch a ticker or place live trades; you pick a good fund and contribute regularly. For a long-term investor who values simplicity over control, this once-a-day, set-and-forget style is a feature, not a flaw.",
          "But costs vary wildly and can quietly wreck returns. Beyond the yearly expense ratio, some mutual funds charge 'loads' - sales commissions of several percent just to buy or sell. A 5% front load means $500 of your $10,000 vanishes before you invest a cent. Avoidable and outdated, loads mostly enrich salespeople. Smart investors stick to 'no-load' funds with low expense ratios. The difference between a 0.04% index fund and a 1% active fund with a 5% load is enormous over decades - the cheap one can leave you with tens of thousands more.",
          "So choosing a mutual fund comes down to a few checks: Is it a low-cost index fund or a pricey active one? Does it charge a load? What's the expense ratio? For most teens building long-term wealth, the answer is a broad, no-load index mutual fund with a rock-bottom expense ratio, funded automatically each month. That combination captures the market's growth, keeps costs near zero, and removes the temptation to tinker. Fancy active funds with high fees and loads are almost always the wrong choice for a beginner's core savings."
        ],
        bullets: [
          "Mutual funds allow automatic monthly investing in exact dollar amounts.",
          "They're the standard building block inside 401(k) retirement plans.",
          "Watch for 'loads' - sales commissions that skim several percent off the top.",
          "Prefer no-load funds with low expense ratios; costs compound heavily over decades.",
          "A broad, no-load index mutual fund funded automatically suits most beginners."
        ],
        realWorldExample: "Two investors put in $10,000 for 30 years at 8%. One picks a no-load index fund charging 0.05%; the other buys an active fund with a 5% load and 1% yearly fee. The low-cost investor can end up with roughly $30,000 more - not from better picks, purely from dodging loads and high fees."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "funds2-mc1",
            question: "How is a mutual fund priced?",
            options: [
              "Live every single second all day long like a stock",
              "Once a day at NAV after the market closes",
              "Only one single time when the fund first launches",
              "Set entirely by the individual investor who buys it"
            ],
            correctAnswer: 1,
            explanation: "Mutual funds price once daily at net asset value (NAV) after the close. An order placed midday fills at that evening's price, not a live one."
          },
          {
            id: "funds2-mc2",
            question: "What is a 'load' on a mutual fund?",
            options: [
              "A special bonus the whole fund pays out to you",
              "A sales commission charged to buy or sell",
              "The total number of individual stocks it holds",
              "A special tax the federal government adds on"
            ],
            correctAnswer: 1,
            explanation: "A load is a sales commission - often several percent - skimmed when you buy or sell. Smart investors avoid it by choosing no-load funds."
          }
        ]
      },
      {
        type: "scenario",
        title: "Theo Sets Up Automatic Investing",
        narrative: "Theo, 18, starts a job with a 401(k) and wants to invest $100 every month for the long term without watching the market. His plan offers a no-load S&P 500 index fund at 0.04% and an active fund with a 5% load and a 1% yearly fee that advertises market-beating returns.",
        details: [
          "Both funds allow automatic monthly contributions of $100.",
          "The active fund's 5% load takes $5 of every $100 before it's even invested.",
          "Its 1% yearly fee is far higher than the index fund's 0.04%.",
          "Most active funds trail their index after such costs over the long run."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "funds2-aq1",
          question: "Which fund should Theo choose for his long-term core?",
          options: [
            "The active fund, since higher fees signal quality",
            "The no-load 0.04% index fund",
            "Split evenly to hedge his bets",
            "Neither - keep the money in cash"
          ],
          correctAnswer: 1,
          explanation: "The no-load index fund avoids the 5% load and the high yearly fee, both of which compound against him. Over decades that gap alone could be worth tens of thousands."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A mutual fund pools investors' money to buy a big shared basket.",
          "It prices once a day at NAV, unlike an ETF that trades live all day.",
          "Index mutual funds track a benchmark cheaply; active ones cost more to chase gains.",
          "Avoid loads and high expense ratios - they compound against you.",
          "A broad, no-load index fund funded automatically suits most long-term investors."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "funds2-mastery1",
            question: "The core idea of a mutual fund is that it…",
            options: [
              "Lends all of your money to one big company",
              "Pools many investors' money into a shared basket",
              "Always guarantees a fixed set return every year",
              "Holds only one single individual company stock"
            ],
            correctAnswer: 1,
            explanation: "A mutual fund combines money from thousands of investors to buy a large, diversified basket - giving small investors broad ownership they couldn't build alone."
          },
          {
            id: "funds2-mastery2",
            question: "NAV, the price at which mutual funds trade, is…",
            options: [
              "A live streaming market price that gets updated every single second",
              "The basket's total value divided by shares, set once daily",
              "The flat trading commission that your own broker charges you",
              "The head fund manager's total yearly base cash salary"
            ],
            correctAnswer: 1,
            explanation: "Net asset value is the total worth of the basket divided by shares, calculated once per day after the close - so orders fill at that evening's price."
          },
          {
            id: "funds2-mastery3",
            question: "A 5% front load on a $10,000 investment means…",
            options: [
              "You earn an extra bonus $500 somehow",
              "About $500 is taken before you invest",
              "You pay a full $500 in yearly taxes",
              "The fund adds $500 to your balance"
            ],
            correctAnswer: 1,
            explanation: "A 5% load skims $500 off the top, so only $9,500 goes to work. No-load funds avoid this outdated sales commission entirely."
          },
          {
            id: "funds2-mastery4",
            question: "Why do mutual funds fit workplace retirement plans well?",
            options: [
              "They allow automatic monthly investing hands-free",
              "They are the only legal retirement option",
              "They guarantee you never lose money",
              "They can be traded every second"
            ],
            correctAnswer: 0,
            explanation: "Their once-a-day, set-and-forget style suits automatic monthly contributions in a 401(k), making them a natural building block for steady long-term saving."
          },
          {
            id: "funds2-mastery5",
            question: "Between a 0.04% index fund and a 1% active fund with a 5% load, the cheaper one usually…",
            options: [
              "Ends with far more money over decades",
              "Loses to the pricey fund every year",
              "Secretly charges a hidden extra yearly tax",
              "Performs exactly the same as everything else"
            ],
            correctAnswer: 0,
            explanation: "Avoiding the load and the high yearly fee compounds into tens of thousands more over decades - cost, not clever picking, drives much of the gap."
          },
          {
            id: "funds2-mastery6",
            question: "The mutual fund 'container' matters less than…",
            options: [
              "Whether it's a cheap index or a pricey active fund",
              "The particular printed color of its glossy paper marketing brochure",
              "Exactly how many years old the whole entire fund company is",
              "Which specific day of the week you happen to buy"
            ],
            correctAnswer: 0,
            explanation: "A mutual fund is just a wrapper; what counts is whether it's a low-cost index fund or an expensive active one, since fees drive long-term results."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // funds-3: Expense Ratios
  // ─────────────────────────────────────────────
  {
    lessonId: "funds-3",
    sections: [
      {
        type: "concept",
        title: "The Yearly Bite Out of Your Money",
        paragraphs: [
          "An expense ratio is the yearly fee a fund charges, shown as a percentage of the money you have invested. If a fund has a 0.50% expense ratio and you hold $2,000 in it, you pay about $10 a year - quietly, automatically, deducted from the fund itself. You never write a check; the fee is skimmed off before your return is calculated. It covers the fund company's costs: running the fund, paying managers, and keeping the lights on. Small as it sounds, this tiny yearly bite is the single most predictable cost you will ever pay as a fund investor.",
          "The word 'ratio' matters: the fee scales with how much you hold, not a flat charge. A 0.20% ratio costs $4 a year on $2,000 but $200 a year on $100,000. Because it's a percentage, it grows as your account grows, which is exactly why keeping it low matters more over time. Expense ratios range from near zero - some broad index funds charge 0.03% - up to 1% or more for fancy active funds. That may look like a rounding error, but on money you'll hold for decades, the gap between 0.03% and 1% is one of the biggest decisions you make.",
          "Here's why a fee this small hurts so much: it comes out every single year, and it steals not just the dollars but all the growth those dollars would have earned. A 1% fee doesn't cost you 1% once - it drags on your compounding every year for as long as you invest. Over a working lifetime, a high expense ratio can silently eat a huge slice of your final nest egg. That's why professionals obsess over it: it's the one cost you fully control, and controlling it is nearly free."
        ],
        bullets: [
          "An expense ratio is a fund's yearly fee, shown as a percent of your invested money.",
          "It's deducted automatically from the fund - you never see a separate bill.",
          "Because it's a percentage, the dollar cost grows as your balance grows.",
          "Ratios range from about 0.03% for broad index funds to 1%+ for active ones.",
          "The fee repeats every year and drags on compounding, so low ratios compound in your favor."
        ],
        realWorldExample: "Two teens each invest $5,000 for 40 years at 8%. One picks a fund charging 0.05%; the other a similar fund charging 1%. That 0.95% yearly gap can cost the second teen roughly $30,000 by retirement - not from worse investments, purely from the higher yearly fee compounding against them."
      },
      {
        type: "concept",
        title: "Reading, Comparing, and Cutting Fees",
        paragraphs: [
          "Every fund publishes its expense ratio openly, usually right on its summary page and in its prospectus. To find your yearly dollar cost, multiply the ratio by your holdings: 0.30% times $3,000 is $9. When comparing two similar funds - say two S&P 500 index funds that hold the exact same stocks - the cheaper expense ratio almost always wins, because their returns before fees are nearly identical. In that case you're literally choosing to keep more of your own money. Always check the ratio before buying; it takes ten seconds and pays off for decades.",
          "It helps to know what drives the fee. Index funds are cheap because a computer simply mirrors a list of stocks - little research, few trades, low cost. Active funds charge more because they pay analysts and managers to pick investments and trade often, hoping to beat the market. You're paying for that effort whether or not it works, and as earlier lessons showed, it usually doesn't beat a cheap index after fees. So a higher expense ratio is not a sign of quality - often it's the opposite, a headwind the fund must overcome just to match a cheaper rival.",
          "Watch out for two traps. First, don't confuse the expense ratio with a one-time commission or 'load' - the ratio is the recurring yearly cost, and it's the one that compounds. Second, don't chase a fund with slightly higher past returns while ignoring a big fee gap; past returns aren't guaranteed, but the fee is. The disciplined move is simple: for your long-term core, pick broad, low-cost index funds with rock-bottom expense ratios, and treat every extra fraction of a percent as money leaving your future pocket."
        ],
        bullets: [
          "Find your dollar cost by multiplying the expense ratio by how much you hold.",
          "Between two funds holding the same stocks, the lower ratio almost always wins.",
          "Index funds are cheap because a computer mirrors a list; active funds pay pickers.",
          "A high expense ratio signals higher cost, not higher quality.",
          "For long-term core holdings, favor broad index funds with the lowest ratios."
        ],
        realWorldExample: "Maya compares two S&P 500 index funds that hold identical stocks: one charges 0.03%, the other 0.60%. Since their holdings match, their pre-fee returns match too. She picks the 0.03% fund and keeps the 0.57% difference every year - a free win just for reading the fee."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "funds3-mc1",
            question: "What is an expense ratio?",
            options: [
              "A one-time commission to open an account in every case",
              "A fund's yearly fee, shown as a percent of holdings",
              "The tax owed when you sell shares in every case",
              "The number of stocks a fund holds in every case"
            ],
            correctAnswer: 1,
            explanation: "The expense ratio is the recurring yearly fee, expressed as a percentage of the money you hold in the fund, deducted automatically from the fund itself."
          },
          {
            id: "funds3-mc2",
            question: "On $3,000 invested, a 0.30% expense ratio costs about…",
            options: [
              "$90 a year",
              "$9 a year",
              "$300 a year",
              "$0.90 a year"
            ],
            correctAnswer: 1,
            explanation: "0.30% of $3,000 is $9 per year. Multiply the ratio by your holdings to find the yearly dollar cost."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devon Compares Two Look-Alike Funds",
        narrative: "Devon, 17, wants to invest $4,000 for the long term in a fund tracking the S&P 500. His app lists two options that hold the exact same 500 stocks. Fund A charges an expense ratio of 0.04%; Fund B charges 0.80% and advertises a slick app and glossy reports.",
        details: [
          "Both funds hold identical stocks, so their returns before fees are nearly the same.",
          "Fund A costs about $1.60 a year on $4,000; Fund B costs about $32 a year.",
          "The 0.76% yearly gap compounds against Fund B every single year.",
          "A nicer app does not improve investment returns after fees."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "funds3-aq1",
          question: "Which fund should Devon choose for his long-term core?",
          options: [
              "Fund B, since a higher fee means better management",
              "Fund A, the 0.04% option holding the same stocks",
              "Split evenly between the two funds in every case",
              "Neither - a savings account is always better in every case"
            ],
            correctAnswer: 1,
          explanation: "Both funds hold the same stocks, so returns before fees match. Fund A's far lower ratio lets Devon keep the 0.76% difference every year, compounding in his favor."
        }
      },
      {
        type: "recap",
        takeaways: [
          "An expense ratio is a fund's yearly fee, a percent of what you hold.",
          "It's deducted automatically and grows in dollars as your balance grows.",
          "Between funds holding the same stocks, the lower ratio almost always wins.",
          "Index funds are cheap; active funds cost more but rarely beat them after fees.",
          "For long-term core holdings, chase the lowest ratios - it compounds in your favor."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "funds3-mastery1",
            question: "An expense ratio is best described as…",
            options: [
              "A one-time fee to buy a fund in every case",
              "A fund's recurring yearly cost as a percent",
              "A bonus the fund pays each year",
              "A tax set by the government in every case"
            ],
            correctAnswer: 1,
            explanation: "It's the recurring yearly fee, expressed as a percentage of your holdings and skimmed automatically from the fund before returns are calculated."
          },
          {
            id: "funds3-mastery2",
            question: "On $10,000, a 0.50% expense ratio costs about…",
            options: [
              "$5 a year",
              "$50 a year",
              "$500 a year",
              "$5,000 a year"
            ],
            correctAnswer: 1,
            explanation: "0.50% of $10,000 is $50 per year. The fee scales with how much you hold because it's a percentage."
          },
          {
            id: "funds3-mastery3",
            question: "Why does a small yearly fee hurt so much over time?",
            options: [
              "It is charged twice each month in every case",
              "It repeats yearly and drags on compounding",
              "It only applies to profits, never losses",
              "It is added to your taxable income"
            ],
            correctAnswer: 1,
            explanation: "The fee comes out every year and steals the growth those dollars would have earned, so a small ratio compounds into a large gap over decades."
          },
          {
            id: "funds3-mastery4",
            question: "Between two S&P 500 index funds with identical holdings, pick the one with…",
            options: [
              "The higher expense ratio",
              "The lower expense ratio",
              "The fancier mobile app",
              "The longer company history"
            ],
            correctAnswer: 1,
            explanation: "Identical holdings mean identical pre-fee returns, so the lower ratio simply lets you keep more of your own money each year."
          },
          {
            id: "funds3-mastery5",
            question: "A higher expense ratio usually signals…",
            options: [
              "Guaranteed better returns in every case",
              "Higher cost, not higher quality",
              "A safer, lower-risk fund",
              "A government-backed guarantee in every case"
            ],
            correctAnswer: 1,
            explanation: "A high ratio is a headwind the fund must overcome just to match a cheaper rival; it is a sign of cost, not of quality."
          },
          {
            id: "funds3-mastery6",
            question: "Index funds tend to have low expense ratios because…",
            options: [
              "They pay many analysts to trade often",
              "A computer simply mirrors a list of stocks",
              "The government subsidizes their fees in every case",
              "They hold only one single stock in every case"
            ],
            correctAnswer: 1,
            explanation: "Tracking an index needs little research or trading, so costs stay low - unlike active funds that pay managers to pick and trade."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // funds-4: Index Funds
  // ─────────────────────────────────────────────
  {
    lessonId: "funds-4",
    sections: [
      {
        type: "concept",
        title: "Buying the Whole Haystack",
        paragraphs: [
          "An index fund is a fund built to copy a market index - a fixed list of stocks - rather than to beat it. Instead of a manager guessing which companies will win, the fund simply holds every stock on the list in the same proportions. Buy one share of a total-market index fund and you instantly own a tiny slice of thousands of companies. The old saying is 'don't look for the needle, buy the whole haystack.' You stop trying to pick winners and instead own the entire market, capturing whatever it returns as a group.",
          "Because there's no expensive guessing, index funds are dirt cheap - many charge 0.03% to 0.10% a year, a fraction of what active funds cost. They're also broadly diversified by design: if one company in the index collapses, it's just one tiny piece of thousands, so a single failure barely dents you. This blend of ultra-low cost and instant diversification is why index funds became the default recommendation for beginners. You get the market's long-run growth without paying a manager or betting your future on a handful of picks.",
          "The surprising part is how well 'settling for average' works. Over long stretches, most active managers - the pros paid to beat the market - actually trail a simple index fund after their fees. By matching the market cheaply, an index fund quietly beats the majority of expensive attempts to outsmart it. You're not aiming to be brilliant; you're aiming to be low-cost and patient, and that combination wins more often than clever stock-picking. For a teen with decades ahead, a broad index fund is one of the most powerful, boring tools available."
        ],
        bullets: [
          "An index fund copies a fixed list of stocks instead of trying to beat the market.",
          "One share can give you a slice of thousands of companies at once.",
          "No expensive guessing means very low fees - often 0.03% to 0.10% a year.",
          "Broad diversification means one company's collapse barely dents you.",
          "Matching the market cheaply beats most active managers after their fees."
        ],
        realWorldExample: "In 2007 Warren Buffett bet a hedge fund $1 million that a plain S&P 500 index fund would beat their hand-picked funds over ten years. He won easily: the cheap index fund crushed the expensive pros, mostly because their high fees dragged them down year after year."
      },
      {
        type: "concept",
        title: "How Tracking Works and Where the Limits Are",
        paragraphs: [
          "Index funds work by mechanically following rules, not opinions. When a company joins or leaves the index, the fund adjusts to match - no debate, no forecasting. This is why they're so cheap to run: a computer keeps the fund lined up with the list. The tiny gap between the index's return and the fund's return, caused by fees and trading, is called 'tracking error,' and good index funds keep it minuscule. You can pick an index for almost anything: the whole US market, the whole world, just bonds, or a single sector - each fund simply mirrors its chosen list.",
          "Index funds are not magic, though. They don't protect you from market-wide crashes: if the whole market falls 30%, a total-market index fund falls about 30% too, because it is the market. Diversification spreads risk across companies, not across a downturn that hits everything at once. Index funds also can't 'beat' the market by definition - they aim to match it. So they won't shoot the lights out in a hot year the way a lucky stock might. What they offer is reliability and low cost, not thrills, and that trade-off is exactly what long-term investors want.",
          "Choosing an index fund still involves a few decisions. Which index - a broad total-market fund, an S&P 500 fund, or a global one? What's the expense ratio - lower is better among funds tracking the same index? Is it a mutual fund or an ETF version? For most beginners the answer is a single broad, low-cost index fund covering a huge chunk of the market, held for years. That one choice delivers diversification, low fees, and market growth in a package simple enough to set up once and largely leave alone."
        ],
        bullets: [
          "Index funds follow rules mechanically, adjusting when the list changes.",
          "'Tracking error' is the small gap between the index and the fund's return.",
          "You can index almost anything: total market, global, bonds, or a sector.",
          "They still fall in market-wide crashes - they can't beat the market, only match it.",
          "For beginners, one broad, low-cost index fund held for years is often ideal."
        ],
        realWorldExample: "A total US stock index fund holds over 3,000 companies. When a firm is added or removed from the index, the fund quietly rebalances to match - no manager guessing. That mechanical rule-following is why it can charge as little as 0.03% a year."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "funds4-mc1",
            question: "What does an index fund try to do?",
            options: [
              "Beat the market with clever stock picks in every case",
              "Copy a fixed list of stocks to match the market",
              "Guarantee a fixed return every year in every case for all investors",
              "Hold only the single best stock in every case"
            ],
            correctAnswer: 1,
            explanation: "An index fund mirrors a market index - a set list of stocks - aiming to match the market's return cheaply rather than to beat it."
          },
          {
            id: "funds4-mc2",
            question: "If the whole market drops 30%, a total-market index fund will roughly…",
            options: [
              "Stay flat because it is diversified in every case",
              "Fall about 30% because it is the market",
              "Rise 30% as a hedge in every case",
              "Lose nothing since it holds bonds in every case"
            ],
            correctAnswer: 1,
            explanation: "Diversification spreads risk across companies, not across a market-wide crash. Since the fund is the market, it falls about as much as the market does."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aisha Picks Her First Core Holding",
        narrative: "Aisha, 16, has $1,500 to invest for the next several decades and no time to research individual stocks. Her app offers a broad total-market index fund at 0.04%, an actively managed fund at 0.90% that promises to beat the market, and a single trendy tech stock a friend hyped.",
        details: [
          "The index fund instantly spreads her money across thousands of companies.",
          "Most active funds trail a cheap index over the long run after fees.",
          "A single stock could soar or collapse, concentrating her risk badly.",
          "Aisha wants a set-and-forget core she can hold for decades."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "funds4-aq1",
          question: "Which choice best fits Aisha's long-term core?",
          options: [
              "The single trendy tech stock her friend hyped",
              "The broad 0.04% total-market index fund",
              "The 0.90% active fund promising to beat the market",
              "Cash, avoiding investing entirely"
            ],
            correctAnswer: 1,
          explanation: "The low-cost index fund gives instant diversification and market growth for a tiny fee, beating most active funds after costs and avoiding single-stock risk."
        }
      },
      {
        type: "recap",
        takeaways: [
          "An index fund copies a fixed list of stocks instead of trying to beat it.",
          "It delivers instant diversification and very low fees in one package.",
          "Matching the market cheaply beats most active managers after fees.",
          "Index funds still fall in market-wide crashes - they match, not beat.",
          "For beginners, one broad, low-cost index fund held for years is often ideal."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "funds4-mastery1",
            question: "The core goal of an index fund is to…",
            options: [
              "Beat the market with expert picks in every case",
              "Match a market index at low cost",
              "Guarantee gains every single year in every case",
              "Concentrate money in one hot stock"
            ],
            correctAnswer: 1,
            explanation: "An index fund copies a set list of stocks to match the market's return as cheaply as possible, not to outguess it."
          },
          {
            id: "funds4-mastery2",
            question: "Index funds tend to be very cheap because…",
            options: [
              "They pay top analysts to trade daily",
              "A computer simply mirrors a fixed list",
              "The government pays their fees in every case",
              "They hold only bonds, never stocks"
            ],
            correctAnswer: 1,
            explanation: "With no expensive guessing, tracking a fixed list is nearly automatic, so expense ratios can fall to 0.03% to 0.10%."
          },
          {
            id: "funds4-mastery3",
            question: "'Tracking error' refers to…",
            options: [
              "A tax charged on index funds in every case",
              "The small gap between index and fund returns",
              "The number of stocks in the index",
              "A crash caused by one company in every case"
            ],
            correctAnswer: 1,
            explanation: "Tracking error is the tiny difference between the index's return and the fund's return, caused by fees and trading; good funds keep it minuscule."
          },
          {
            id: "funds4-mastery4",
            question: "Over long periods, a cheap index fund usually…",
            options: [
              "Loses to most active managers in every case",
              "Beats most active managers after fees",
              "Never changes in value at all",
              "Guarantees you double your money"
            ],
            correctAnswer: 1,
            explanation: "High fees drag active managers down, so matching the market cheaply quietly beats the majority of them over the long run."
          },
          {
            id: "funds4-mastery5",
            question: "A limit of index funds is that they…",
            options: [
              "Fully protect you from market crashes in every case",
              "Fall in a market-wide crash like the market",
              "Are illegal for young investors in every case",
              "Charge the highest fees available in every case"
            ],
            correctAnswer: 1,
            explanation: "Diversification spreads risk across companies, not across a downturn that hits everything, so a total-market fund falls about as much as the market."
          },
          {
            id: "funds4-mastery6",
            question: "For a beginner's long-term core, a good default is…",
            options: [
              "A single trendy stock a friend hyped in every case",
              "One broad, low-cost index fund held for years",
              "A pricey active fund promising big wins",
              "Frequent trading to time the market in every case"
            ],
            correctAnswer: 1,
            explanation: "A broad, low-cost index fund packages diversification, tiny fees, and market growth into one holding simple enough to set up once and keep."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // funds-5: S&P 500
  // ─────────────────────────────────────────────
  {
    lessonId: "funds-5",
    sections: [
      {
        type: "concept",
        title: "America's 500 Biggest Companies in One Basket",
        paragraphs: [
          "The S&P 500 is a list of about 500 of the largest publicly traded companies in the United States - names like Apple, Microsoft, Amazon, and hundreds more. It's not a fund you buy directly; it's an index, a scoreboard that tracks how those 500 giants are doing as a group. When the news says 'the market was up today,' they're often quoting the S&P 500. An S&P 500 index fund simply owns all 500 of those companies in the right proportions, so buying one share hands you a sliver of corporate America's biggest players at once.",
          "The index is 'market-cap weighted,' meaning bigger companies take up bigger slices. A giant worth $3 trillion carries far more weight than one worth $20 billion, so the largest handful of companies can drive much of the index's daily move. This is efficient - it mirrors how the real market is sized - but it also means the S&P 500 leans heavily on its biggest names, especially large tech firms in recent years. When those giants soar, the index soars; when they stumble, the whole index feels it, even though hundreds of smaller members barely moved.",
          "Historically, the S&P 500 has returned roughly 10% a year on average over the long run - though any single year can be wildly up or down. That long-term average is why it's the go-to benchmark and a hugely popular core holding. It captures the broad growth of the largest US companies without you choosing any of them. It's not the whole market - it skips small companies and foreign ones - but it covers a giant share of US stock value, which is why 'buy an S&P 500 index fund' is one of the most common pieces of investing advice."
        ],
        bullets: [
          "The S&P 500 tracks about 500 of the largest US public companies as a group.",
          "It's an index (a scoreboard), and index funds own all 500 in proportion.",
          "It's market-cap weighted, so the biggest companies take the biggest slices.",
          "It has historically averaged about 10% a year over the long run.",
          "It covers most US stock value but skips small and foreign companies."
        ],
        realWorldExample: "On a single strong day, a jump in a few mega-cap tech stocks can push the whole S&P 500 up, even if most of the other 490 companies were flat. That's market-cap weighting in action - the biggest names steer the index."
      },
      {
        type: "concept",
        title: "Why It's Popular and What It Leaves Out",
        paragraphs: [
          "The S&P 500's popularity comes from a rare combination: broad diversification, deep history, and rock-bottom cost. Owning 500 large companies spreads your risk widely, and index funds tracking it charge as little as 0.03% a year. Because the index has decades of data, we can see how it behaved through booms, busts, and recoveries - and it has always, eventually, gone on to new highs. For a long-term investor, that track record plus low cost makes an S&P 500 fund a simple, credible core that requires no stock-picking skill at all.",
          "Still, it's important to know its blind spots. The S&P 500 is only large US companies. It leaves out smaller US firms and every company based abroad, so it's not truly 'the whole world.' Some investors add a small-company fund or an international fund alongside it for broader coverage. It's also all stocks - no bonds - so it carries full stock-market risk and can drop 30% or more in a bad year. Treating it as your entire portfolio means accepting big swings; many people pair it with bonds to smooth the ride.",
          "Despite those limits, the S&P 500 remains a fantastic default building block. A common beginner plan is to put the core of long-term money into a cheap S&P 500 index fund, contribute steadily every month, and hold through the ups and downs. Over decades, that boring routine has historically turned modest contributions into substantial wealth. You won't beat the market - you'll be the market's largest slice - but for most people, capturing that long-run growth cheaply is exactly the goal, not a consolation prize."
        ],
        bullets: [
          "Its appeal is broad diversification, long history, and very low cost.",
          "S&P 500 funds can charge as little as 0.03% a year.",
          "It excludes small US companies and all foreign companies.",
          "It's all stocks, so it can fall 30% or more in a bad year.",
          "Many pair it with international and bond funds for broader balance."
        ],
        realWorldExample: "Someone who invested steadily in an S&P 500 index fund from 2000 through 2020 endured two brutal crashes - the dot-com bust and 2008 - yet still ended with far more than they put in, because the index recovered and pushed to new highs over time."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "funds5-mc1",
            question: "What is the S&P 500?",
            options: [
              "A single stock you buy directly in every case",
              "An index tracking about 500 large US companies",
              "A bond issued by the government in every case",
              "A savings account paying fixed interest"
            ],
            correctAnswer: 1,
            explanation: "The S&P 500 is an index - a scoreboard - that tracks roughly 500 of the largest US public companies as a group; index funds own all 500 in proportion."
          },
          {
            id: "funds5-mc2",
            question: "'Market-cap weighted' means the S&P 500…",
            options: [
              "Gives every company an equal slice",
              "Gives bigger companies bigger slices",
              "Only counts the newest companies",
              "Weights by which stock is cheapest"
            ],
            correctAnswer: 1,
            explanation: "Bigger companies take up bigger portions of the index, so the largest handful can drive much of its daily movement."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Builds Around the S&P 500",
        narrative: "Marcus, 18, wants a simple long-term core and likes the idea of an S&P 500 index fund at 0.03%. His mentor points out that the fund is all large US stocks, with no bonds and no foreign companies, and asks how Marcus wants to handle those gaps and the big swings.",
        details: [
          "The S&P 500 fund covers large US companies but skips small and foreign ones.",
          "It holds no bonds, so it can drop 30% or more in a bad year.",
          "It has historically averaged about 10% a year over the long run.",
          "Marcus won't need this money for several decades."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "funds5-aq1",
          question: "What's a reasonable way for Marcus to use the S&P 500 fund?",
          options: [
              "Avoid it entirely because it can drop in bad years in every case",
              "Use it as a low-cost core, aware it skips small and foreign stocks",
              "Put every dollar in it and never add anything else, ever in every case",
              "Trade in and out of it daily to dodge crashes in every case"
            ],
            correctAnswer: 1,
          explanation: "The S&P 500 is a strong, cheap core for a long horizon; knowing its blind spots lets Marcus optionally add international or bond funds later while riding out the swings."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The S&P 500 tracks about 500 of the largest US companies as a group.",
          "It's market-cap weighted, so the biggest names drive much of the move.",
          "It has historically averaged roughly 10% a year over the long run.",
          "It excludes small and foreign companies and holds no bonds.",
          "It's a cheap, diversified core many pair with international and bond funds."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "funds5-mastery1",
            question: "The S&P 500 is best described as…",
            options: [
              "One company you buy shares in in every case",
              "An index of about 500 large US companies",
              "A federally insured savings product in every case",
              "A bond issued by 500 governments in every case"
            ],
            correctAnswer: 1,
            explanation: "It's an index tracking roughly 500 of the biggest US public companies; funds that follow it own all 500 in proportion."
          },
          {
            id: "funds5-mastery2",
            question: "In a market-cap-weighted index, the biggest companies…",
            options: [
              "Get an equal slice like everyone in every case",
              "Take the largest slices of the index",
              "Are removed to reduce risk in every case",
              "Have no effect on daily moves"
            ],
            correctAnswer: 1,
            explanation: "Weighting by size means giant firms occupy the largest portions, so a few mega-caps can steer the whole index."
          },
          {
            id: "funds5-mastery3",
            question: "The S&P 500's long-run average return has been roughly…",
            options: [
              "About 2% a year",
              "About 10% a year",
              "About 30% every year",
              "A guaranteed 5% each year"
            ],
            correctAnswer: 1,
            explanation: "Over long stretches it has averaged around 10% a year, though any single year can swing far up or down."
          },
          {
            id: "funds5-mastery4",
            question: "A blind spot of the S&P 500 is that it excludes…",
            options: [
              "All large US technology firms in every case",
              "Small US companies and foreign companies",
              "Every profitable company in every case",
              "Companies worth over $1 trillion"
            ],
            correctAnswer: 1,
            explanation: "It covers only large US firms, leaving out smaller US companies and all foreign ones, so it isn't the whole world."
          },
          {
            id: "funds5-mastery5",
            question: "Because the S&P 500 holds only stocks, it…",
            options: [
              "Can never lose value in every case for all investors",
              "Can fall 30% or more in a bad year",
              "Pays a guaranteed fixed coupon in every case",
              "Is insured against losses in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "With no bonds to cushion it, an S&P 500 fund carries full stock-market risk and can drop sharply in a downturn."
          },
          {
            id: "funds5-mastery6",
            question: "Why is an S&P 500 fund a popular core holding?",
            options: [
              "It guarantees you beat the market in every case",
              "It offers broad diversification at very low cost",
              "It holds only one hand-picked stock in every case",
              "It avoids all market risk entirely"
            ],
            correctAnswer: 1,
            explanation: "Owning 500 large companies for as little as 0.03% a year gives cheap, broad exposure to US market growth without stock-picking."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // funds-6: Sector ETFs
  // ─────────────────────────────────────────────
  {
    lessonId: "funds-6",
    sections: [
      {
        type: "concept",
        title: "Zooming In on One Slice of the Economy",
        paragraphs: [
          "A sector ETF holds a basket of companies from just one part of the economy - technology, healthcare, energy, financials, and so on. Instead of owning the whole market, you own a focused group tied to a single theme. A tech sector ETF might hold dozens of software, chip, and internet companies; an energy ETF holds oil, gas, and power firms. It's still a fund, so you get diversification within that slice - many companies, not one - but you've deliberately narrowed your bet to a specific industry you think will do well.",
          "The appeal is targeted exposure. If you strongly believe healthcare will boom as populations age, a healthcare sector ETF lets you lean into that idea without gambling on a single company that might flop. You capture the whole industry's move while spreading risk across its members. Sectors also behave differently at different times: energy might surge when oil prices spike while tech lags, or vice versa. Some investors use sector ETFs to tilt their portfolio toward areas they're optimistic about, on top of a broad market core.",
          "But narrowing your bet raises your risk. A single sector can be far more volatile than the whole market, because everything inside it rises and falls together on the same news. When tech crashed in 2000-2002, a tech sector ETF would have plunged far more than a total-market fund, since it had no other industries to cushion it. Diversification across companies doesn't help much when they all belong to one industry facing the same storm. So sector ETFs trade broad safety for a concentrated, higher-stakes bet, which means bigger potential gains but also far bigger potential losses than a fund that owns the whole market."
        ],
        bullets: [
          "A sector ETF holds companies from just one part of the economy.",
          "You get diversification within the sector but a narrowed, focused bet overall.",
          "They let you lean into an industry you're optimistic about.",
          "Different sectors rise and fall at different times on their own news.",
          "Concentrating in one sector raises volatility versus the whole market."
        ],
        realWorldExample: "During the 2000-2002 dot-com crash, technology stocks collapsed while other sectors held up better. A tech sector ETF would have fallen far harder than a total-market fund, because it had no healthcare, energy, or consumer companies to soften the blow."
      },
      {
        type: "concept",
        title: "Using Sector ETFs Wisely",
        paragraphs: [
          "Because sector ETFs are riskier, most experts treat them as a side dish, not the main meal. A common approach is to keep the bulk of your money in a broad, diversified core - like a total-market or S&P 500 fund - and use a small slice for sector tilts. That way, if your sector bet goes wrong, it dents only a corner of your portfolio, not the whole thing. Betting your entire savings on one sector because it's hot right now is how investors get badly burned when that sector eventually cools.",
          "Timing sectors is genuinely hard, even for professionals. By the time an industry is obviously exciting and all over the news, much of its expected growth may already be priced into the stocks. Chasing last year's hottest sector often means buying high, right before it cools off. Sectors also rotate in ways that are tough to predict, so a bet that looks smart today can look foolish in a year. Humility helps: a broad market fund already owns every sector in proportion, capturing winners automatically without you having to guess which one leads next.",
          "Sector ETFs do have legitimate uses. An investor might slightly underweight a sector they already have huge exposure to - say someone who works in tech and doesn't want their savings doubling down on the same industry. Or someone with strong, well-researched conviction might add a modest tilt. The key word is modest. Used as a small, deliberate adjustment on top of a diversified base, sector ETFs are a reasonable tool. Used as a way to chase hype with your whole portfolio, they're a fast route to concentrated, avoidable losses."
        ],
        bullets: [
          "Treat sector ETFs as a small side bet, not your whole portfolio.",
          "Keep the bulk of money in a broad, diversified core.",
          "Timing sectors is hard; hot news may already be priced in.",
          "A broad market fund already owns every sector in proportion.",
          "Use sector tilts modestly and deliberately, not to chase hype."
        ],
        realWorldExample: "A worker at a chip company already depends on tech for their paycheck. Pouring their savings into a tech sector ETF too would double their exposure to one industry - so some choose to tilt away from tech to avoid betting job and savings on the same bet."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "funds6-mc1",
            question: "What does a sector ETF hold?",
            options: [
              "One single company's stock in every case",
              "Companies from just one part of the economy",
              "A mix of every industry equally in every case",
              "Only government bonds in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "A sector ETF holds a basket of companies from a single industry, like tech or healthcare - diversified within the sector but focused on that one slice."
          },
          {
            id: "funds6-mc2",
            question: "Why is a sector ETF riskier than a total-market fund?",
            options: [
              "It holds only one stock, so it can't diversify in every case",
              "Its companies all rise and fall on the same industry news",
              "It is illegal to sell during a crash in every case",
              "It pays no dividends at all in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "Everything inside one sector moves together on shared news, so there's no other industry to cushion a downturn - raising volatility versus the whole market."
          }
        ]
      },
      {
        type: "scenario",
        title: "Lena Eyes a Hot Sector",
        narrative: "Lena, 17, has $2,000 invested in a broad total-market fund. A clean-energy ETF has doubled this year and is all over social media. She's tempted to move all $2,000 into it, believing the boom will continue.",
        details: [
          "The clean-energy ETF holds only one sector, so it swings hard.",
          "Much of its recent boom may already be reflected in current prices.",
          "Her total-market fund already owns clean-energy companies in proportion.",
          "Moving everything would concentrate her entire savings in one industry."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "funds6-aq1",
          question: "What's the wiser move for Lena?",
          options: [
              "Move all $2,000 into the clean-energy ETF to ride the boom",
              "Keep her broad core and, at most, add a small sector tilt",
              "Sell everything and wait in cash for a crash in every case",
              "Borrow money to buy even more of the hot ETF in every case"
            ],
            correctAnswer: 1,
          explanation: "Keeping a diversified core and limiting any sector bet to a small slice protects her if the hot sector cools - which often follows a big, hyped run-up."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A sector ETF holds companies from just one part of the economy.",
          "It offers targeted exposure but higher volatility than the whole market.",
          "Everything in a sector moves together, so there's little internal cushion.",
          "Timing sectors is hard; hot news is often already priced in.",
          "Use sector tilts as a small, deliberate add-on to a diversified core."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "funds6-mastery1",
            question: "A sector ETF is a fund that holds…",
            options: [
              "A single company's shares in every case",
              "Companies from one part of the economy",
              "An equal mix of all industries in every case",
              "Only cash and savings in every case"
            ],
            correctAnswer: 1,
            explanation: "It bundles many companies from a single industry, giving diversification within that slice but a focused bet on one sector."
          },
          {
            id: "funds6-mastery2",
            question: "Compared with a total-market fund, a sector ETF is usually…",
            options: [
              "Less volatile and safer",
              "More volatile and concentrated",
              "Exactly the same risk",
              "Free of all market risk"
            ],
            correctAnswer: 1,
            explanation: "One sector's companies move together on shared news, with no other industries to cushion it, so it swings more than the broad market."
          },
          {
            id: "funds6-mastery3",
            question: "A sensible way to use a sector ETF is…",
            options: [
              "As your entire portfolio in every case for all investors",
              "As a small tilt on top of a broad core",
              "Only by borrowing to buy more in every case for all investors",
              "By trading it every single day in every case"
            ],
            correctAnswer: 1,
            explanation: "Experts treat sector ETFs as a modest side bet, keeping the bulk in a diversified core so a wrong bet dents only a corner."
          },
          {
            id: "funds6-mastery4",
            question: "Chasing last year's hottest sector is risky because…",
            options: [
              "Hot sectors are illegal to buy in every case",
              "Much of the growth may already be priced in",
              "Sectors never change over time in every case",
              "It guarantees higher returns in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "By the time a sector is obviously exciting, expected growth is often already in the price, so you may buy high right before it cools."
          },
          {
            id: "funds6-mastery5",
            question: "A broad market fund handles sectors by…",
            options: [
              "Ignoring every sector entirely in every case",
              "Owning all sectors in proportion automatically",
              "Betting everything on one sector",
              "Holding only the single hottest sector"
            ],
            correctAnswer: 1,
            explanation: "A broad fund already includes every sector in proportion, capturing winners automatically without you guessing which leads next."
          },
          {
            id: "funds6-mastery6",
            question: "Someone who works in tech might tilt away from a tech ETF to…",
            options: [
              "Guarantee a bigger return in every case",
              "Avoid doubling their exposure to one industry",
              "Break a law about employees in every case",
              "Increase their overall risk on purpose"
            ],
            correctAnswer: 1,
            explanation: "Their paycheck already depends on tech, so adding a tech ETF would concentrate job and savings on the same bet - tilting away spreads that risk."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // funds-7: Bond ETFs
  // ─────────────────────────────────────────────
  {
    lessonId: "funds-7",
    sections: [
      {
        type: "concept",
        title: "Owning Hundreds of Loans in One Share",
        paragraphs: [
          "A bond ETF is a fund that holds a big basket of bonds - loans to governments and companies - and trades on an exchange like a stock. A single bond can be clunky to buy: many require thousands of dollars up front, and picking individual ones is tricky. A bond ETF fixes this. Buy one share and you instantly own a slice of hundreds or thousands of bonds. Your money spreads across many borrowers, so if one company misses a payment, it's a tiny piece of a huge pile - the pain barely registers on your overall holding.",
          "Bond ETFs pay you the interest their bonds collect, usually passed along as monthly distributions. If the fund's bonds pay 4% in interest overall, you receive roughly that yield, spread out over the year. This makes bond ETFs a convenient way to earn steady income without managing individual bonds or tracking maturity dates. The fund constantly buys new bonds as old ones mature, so it keeps rolling along rather than ending on a fixed date the way a single bond does. You get ongoing income and diversification in one simple, tradable package.",
          "Because they trade all day like stocks, bond ETFs are easy to buy and sell in any dollar amount, with prices you can see live. That's a big convenience upgrade over buying bonds one at a time through a broker. There are bond ETFs for every flavor: US Treasuries, corporate bonds, short-term, long-term, even whole-market bond funds that hold a mix. For most beginners who want the steadying effect of bonds without the hassle, a broad, low-cost bond ETF is the simplest on-ramp to fixed income."
        ],
        bullets: [
          "A bond ETF holds a large basket of bonds and trades like a stock.",
          "One share spreads your money across hundreds or thousands of borrowers.",
          "It pays out the interest its bonds collect, often as monthly income.",
          "It rolls into new bonds as old ones mature, so it has no fixed end date.",
          "Broad, low-cost bond ETFs are a simple on-ramp to fixed income for beginners."
        ],
        realWorldExample: "A single corporate bond might require $1,000 or more and expose you to just one company. A broad bond ETF lets a teen invest $50 and instantly own slivers of thousands of bonds, so one company's missed payment barely dents the whole holding."
      },
      {
        type: "concept",
        title: "Income, Safety, and the Rate Trade-Off",
        paragraphs: [
          "Bond ETFs are usually steadier than stock funds, which is exactly their job in a portfolio. When stocks tumble, high-quality bond ETFs - especially Treasury ones - often hold up or even rise, cushioning the fall. That's why many investors pair a stock fund with a bond ETF: the bonds smooth the ride and provide income. But 'steadier' does not mean 'risk-free.' Bond ETF prices still move, and understanding why is key to using them well rather than being surprised when a 'safe' fund dips.",
          "The main mover is interest rates. Bond prices fall when rates rise and rise when rates fall - an inverse seesaw. If you own a bond ETF and new bonds start paying higher interest, your fund's older, lower-paying bonds become less attractive, so their price drops. Long-term bond ETFs feel this far more than short-term ones, because they're locked into old rates for longer. So a long-term Treasury ETF, despite holding ultra-safe government debt, can still lose value in a year when rates jump sharply. Safety from default is not the same as safety from price swings.",
          "Choosing a bond ETF means matching it to your goal. For a cushion against stock crashes and lower price swings, short-to-intermediate high-quality bond ETFs are common. For more income, some accept the extra risk of corporate or longer-term bond ETFs. The expense ratio still matters - cheaper is better - and so does credit quality: Treasury ETFs are safest from default, while high-yield 'junk' bond ETFs pay more but can drop when the economy weakens. Understanding these levers lets you pick a bond ETF that actually does the job you want in your portfolio."
        ],
        bullets: [
          "Bond ETFs are steadier than stock funds and often cushion stock crashes.",
          "'Steadier' isn't 'risk-free' - their prices still move.",
          "Bond prices fall when interest rates rise, and vice versa.",
          "Long-term bond ETFs swing more on rate changes than short-term ones.",
          "Match credit quality and term to your goal; cheaper expense ratios still win."
        ],
        realWorldExample: "In 2022 interest rates rose sharply, and even 'safe' long-term Treasury bond ETFs fell double digits - surprising investors who assumed government bonds couldn't lose money. The default risk was near zero, but the rising-rate price risk was very real."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "funds7-mc1",
            question: "What does a bond ETF hold?",
            options: [
              "A single company's stock in every case for all investors",
              "A large basket of bonds that trades like a stock",
              "Only physical gold bars in every case for all investors",
              "Cash in a savings account in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "A bond ETF holds many bonds - loans to governments and companies - and trades on an exchange, so one share spreads you across hundreds of borrowers."
          },
          {
            id: "funds7-mc2",
            question: "When interest rates rise, existing bond ETF prices usually…",
            options: [
              "Rise along with the rates",
              "Fall, because older bonds pay less",
              "Stay perfectly flat in every case",
              "Double in value immediately in every case"
            ],
            correctAnswer: 1,
            explanation: "Bond prices and rates move inversely. When new bonds pay more, older lower-paying bonds become less attractive, so the ETF's price drops."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nadia Adds Ballast to Her Portfolio",
        narrative: "Nadia, 18, holds mostly stock funds and wants something steadier to cushion crashes and pay a bit of income. She's choosing between a short-term high-quality bond ETF and a long-term one, and worries about losing money if interest rates rise.",
        details: [
          "Bond ETFs are generally steadier than stock funds and can cushion crashes.",
          "Long-term bond ETFs fall harder than short-term ones when rates rise.",
          "High-quality bond ETFs carry little default risk but still move on rates.",
          "Nadia mainly wants a smoother ride, not maximum income."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "funds7-aq1",
          question: "Which bond ETF better fits Nadia's goal of a smoother ride?",
          options: [
              "The long-term ETF, since it swings the most",
              "The short-term high-quality bond ETF",
              "A high-yield junk bond ETF for max income",
              "No bonds at all, staying fully in stocks"
            ],
            correctAnswer: 1,
          explanation: "Short-term high-quality bond ETFs move less when rates rise and carry little default risk, giving Nadia the cushioning and steadiness she wants."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A bond ETF holds many bonds and trades on an exchange like a stock.",
          "It spreads risk across many borrowers and pays out interest as income.",
          "It's steadier than stock funds and often cushions stock crashes.",
          "Bond prices fall when rates rise; long-term ETFs swing more than short-term.",
          "Match credit quality and term to your goal, and favor low expense ratios."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "funds7-mastery1",
            question: "A bond ETF is best described as…",
            options: [
              "A single loan to one company",
              "A tradable basket of many bonds",
              "A fund holding only stocks in every case",
              "A federally insured savings account"
            ],
            correctAnswer: 1,
            explanation: "It bundles hundreds or thousands of bonds into one exchange-traded fund, spreading you across many borrowers in a single share."
          },
          {
            id: "funds7-mastery2",
            question: "Bond ETFs typically pay investors through…",
            options: [
              "A one-time lump sum at the end",
              "Regular interest distributions, often monthly",
              "Rising ticket prices at events",
              "A guaranteed doubling of principal"
            ],
            correctAnswer: 1,
            explanation: "The fund passes along the interest its bonds collect, usually as monthly distributions, giving steady income."
          },
          {
            id: "funds7-mastery3",
            question: "Unlike a single bond, a bond ETF…",
            options: [
              "Ends on one fixed maturity date in every case for all investors",
              "Rolls into new bonds and has no fixed end date",
              "Can never be sold once bought in every case",
              "Holds just one borrower's debt in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "As bonds mature, the fund buys new ones and keeps rolling along, so it doesn't end on a set date the way one bond does."
          },
          {
            id: "funds7-mastery4",
            question: "If interest rates jump sharply, a long-term bond ETF will likely…",
            options: [
              "Gain the most of any bond fund",
              "Fall more than a short-term one",
              "Stay completely unchanged in every case",
              "Pay off its bonds instantly"
            ],
            correctAnswer: 1,
            explanation: "Long-term bonds are locked into old rates longer, so their prices drop harder when rates rise than short-term bonds do."
          },
          {
            id: "funds7-mastery5",
            question: "Why do many investors pair a bond ETF with stock funds?",
            options: [
              "Bonds guarantee they never lose money in every case",
              "Bond ETFs cushion the fall when stocks crash",
              "Bonds always outperform stocks long term in every case",
              "It is legally required to own both"
            ],
            correctAnswer: 1,
            explanation: "High-quality bond ETFs often hold up or rise when stocks tumble, smoothing the ride and adding income to a portfolio."
          },
          {
            id: "funds7-mastery6",
            question: "A 'safe' Treasury bond ETF can still lose value because…",
            options: [
              "The government refuses to pay it in every case",
              "Rising interest rates push its price down",
              "It secretly holds only stocks in every case",
              "It charges a 20% yearly fee"
            ],
            correctAnswer: 1,
            explanation: "Even with near-zero default risk, a Treasury ETF's price falls when rates rise, so safety from default isn't safety from price swings."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // funds-8: Target-Date Funds
  // ─────────────────────────────────────────────
  {
    lessonId: "funds-8",
    sections: [
      {
        type: "concept",
        title: "One Fund That Manages Itself",
        paragraphs: [
          "A target-date fund is a single fund built around the year you expect to need the money - usually retirement. You pick the fund with the year closest to your goal, like a '2065 Fund,' and it does the rest. Inside, it holds a ready-made mix of stock funds and bond funds. Buy this one fund and you instantly own a diversified, allocated portfolio without choosing any pieces yourself. It's the ultimate set-and-forget option: one purchase, and a professional formula handles the whole blend of investments for your timeline.",
          "The clever part is that the fund automatically shifts its mix over time. When your target date is decades away, it holds mostly stocks - maybe 90% - to chase growth while you have time to recover from crashes. As the date nears, it gradually 'glides' toward safety, selling stocks and buying more bonds, so by retirement it might be 40% stocks and 60% bonds. This 'glide path' happens on its own, year by year, without you lifting a finger. It applies the age-based allocation lessons automatically, so you never have to remember to rebalance or move money between funds as the years go by and your goal steadily draws closer.",
          "This makes target-date funds ideal for hands-off investors and beginners. They're the most common default in workplace 401(k) plans precisely because they require zero maintenance and prevent common mistakes - like a young person hiding in cash or a near-retiree gambling everything on stocks. You contribute money, and the fund keeps your allocation age-appropriate for you. For a teen who wants to invest for retirement but doesn't want to manage anything, a single low-cost target-date fund can be a genuinely complete solution."
        ],
        bullets: [
          "A target-date fund is one fund built around the year you'll need the money.",
          "It holds a ready-made mix of stock and bond funds - instant diversification.",
          "It automatically shifts from stocks toward bonds as the date nears.",
          "This automatic shift is called the 'glide path.'",
          "It's the common 401(k) default and ideal for hands-off beginners."
        ],
        realWorldExample: "An 18-year-old picks a 2070 target-date fund. Today it might hold 90% stocks for growth. By the time they're near retirement, the same fund will have quietly shifted to something like 40% stocks and 60% bonds - all without a single trade on their part."
      },
      {
        type: "concept",
        title: "The Trade-Offs and Fine Print",
        paragraphs: [
          "Target-date funds trade some control for enormous convenience. You can't fine-tune the mix - if the fund's glide path holds more bonds than you'd like at your age, you're stuck with its formula unless you switch funds. Different companies also design their glide paths differently: two '2065' funds might hold quite different stock percentages, so the year label alone doesn't tell you everything. It's worth peeking at what a target-date fund actually holds, rather than assuming all funds with the same year are identical.",
          "Cost is the other thing to check. Because a target-date fund is a fund of funds, it can carry a slightly higher expense ratio than buying a plain index fund yourself. The best target-date funds are built from cheap index funds and charge very little - well under 0.20% - while pricier ones stack fees that quietly drag on returns over decades. Since the whole point is a decades-long, hands-off hold, a high expense ratio here is especially costly, quietly compounding against you every year for the entire time you own it. Always confirm the fund is low-cost before treating it as your long-term core.",
          "One more caution: match the date to your goal, not to a random year you like. The target year should reflect when you'll actually need the money, because that's what the glide path is timed to. Also remember a target-date fund still holds stocks, so it can drop in a crash - it's diversified and age-appropriate, not crash-proof. Used correctly, though, a single low-cost target-date fund gives a beginner professional-grade allocation, automatic rebalancing, and total simplicity in one purchase - a remarkably strong default for retirement money."
        ],
        bullets: [
          "You trade fine-tuning control for one-decision convenience.",
          "Glide paths differ by company, so same-year funds aren't identical.",
          "As a fund of funds, it can cost more - confirm a low expense ratio.",
          "Match the target year to when you'll actually need the money.",
          "It still holds stocks, so it can fall in a crash - diversified, not crash-proof."
        ],
        realWorldExample: "Two '2060' funds from different companies can hold noticeably different stock percentages and charge very different fees. Checking under the hood, one investor found one charged 0.12% and another 0.65% - a gap that compounds into thousands over a career."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "funds8-mc1",
            question: "What is a target-date fund?",
            options: [
              "A single stock that pays high dividends in every case for all investors",
              "One fund with a mix that shifts toward your goal year",
              "A bond that matures on a fixed date in every case",
              "A savings account with a set end date in every case"
            ],
            correctAnswer: 1,
            explanation: "A target-date fund holds a ready-made mix of stocks and bonds built around the year you'll need the money, adjusting the mix automatically over time."
          },
          {
            id: "funds8-mc2",
            question: "What is a 'glide path'?",
            options: [
              "A fee charged when you sell the fund in every case",
              "The automatic shift from stocks toward bonds over time",
              "A guarantee against any losses in every case",
              "The list of stocks the fund can never sell"
            ],
            correctAnswer: 1,
            explanation: "The glide path is how the fund gradually moves from a stock-heavy mix toward more bonds as the target date approaches, all on its own."
          }
        ]
      },
      {
        type: "scenario",
        title: "Omar Wants Zero Maintenance",
        narrative: "Omar, 18, is opening a retirement account and honestly does not want to manage investments or rebalance anything. He's comparing two 2070 target-date funds: one built from cheap index funds at 0.12%, and another at 0.60% with a fancier name.",
        details: [
          "A target-date fund gives instant diversification and auto-rebalancing.",
          "Both are 2070 funds, so their glide paths aim at roughly the same year.",
          "The 0.12% fund costs far less each year than the 0.60% one.",
          "Omar plans to hold for decades and never tinker."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "funds8-aq1",
          question: "Which fund best fits Omar's hands-off, long-term plan?",
          options: [
              "The 0.60% fund, since a higher fee means better results",
              "The 0.12% index-based 2070 target-date fund",
              "Neither - he should pick single stocks instead",
              "A 2030 fund, even though he retires around 2070"
            ],
            correctAnswer: 1,
          explanation: "The low-cost 2070 fund matches his timeline and hands-off style while the lower fee compounds in his favor over decades of holding."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A target-date fund is one fund built around your goal year.",
          "It holds a diversified stock-and-bond mix and rebalances automatically.",
          "Its glide path shifts from stocks toward bonds as the date nears.",
          "Confirm it's low-cost, since fees compound over a decades-long hold.",
          "It still holds stocks, so it can fall in a crash - diversified, not crash-proof."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "funds8-mastery1",
            question: "The main appeal of a target-date fund is that it…",
            options: [
              "Guarantees you never lose money in every case",
              "Manages a diversified mix for you automatically",
              "Holds only one hot stock",
              "Pays a fixed interest rate like a bond"
            ],
            correctAnswer: 1,
            explanation: "One purchase gives a diversified, age-appropriate mix that rebalances itself, making it ideal for hands-off investors."
          },
          {
            id: "funds8-mastery2",
            question: "As the target date approaches, the fund typically…",
            options: [
              "Shifts from bonds into more stocks",
              "Shifts from stocks into more bonds",
              "Sells everything and holds cash forever",
              "Keeps the exact same mix always"
            ],
            correctAnswer: 1,
            explanation: "The glide path moves toward safety over time, trimming stocks and adding bonds so the money is steadier near when you need it."
          },
          {
            id: "funds8-mastery3",
            question: "Why should you check a target-date fund's expense ratio?",
            options: [
              "Fees are refunded at retirement in every case for all investors over the long run",
              "As a fund of funds, it can cost more and drag returns",
              "A higher fee guarantees a better glide path in every case",
              "The ratio changes your target year in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "Being a fund of funds, it can stack fees; over a decades-long hold even a small extra ratio compounds into thousands lost."
          },
          {
            id: "funds8-mastery4",
            question: "Two funds both labeled '2060' will…",
            options: [
              "Always hold the exact same mix in every case",
              "Sometimes differ in stock percentage and fees",
              "Never contain any stocks at all",
              "Be identical because the year matches"
            ],
            correctAnswer: 1,
            explanation: "Companies design glide paths differently, so same-year funds can hold different stock percentages and charge different fees - worth checking."
          },
          {
            id: "funds8-mastery5",
            question: "You should pick the target year based on…",
            options: [
              "Your favorite number in every case",
              "When you'll actually need the money",
              "Whichever fund is newest in every case",
              "The current year plus five"
            ],
            correctAnswer: 1,
            explanation: "The glide path is timed to the target date, so it should match when you plan to use the money for the allocation to fit."
          },
          {
            id: "funds8-mastery6",
            question: "A target-date fund is diversified, but it can still…",
            options: [
              "Never fall in value at all in every case",
              "Drop in a market crash since it holds stocks",
              "Guarantee a 10% return each year in every case",
              "Avoid every kind of risk in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "It holds stocks alongside bonds, so a market crash can pull it down - it's age-appropriate and diversified, not crash-proof."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // funds-9: Fund Comparison
  // ─────────────────────────────────────────────
  {
    lessonId: "funds-9",
    sections: [
      {
        type: "concept",
        title: "The Checklist for Sizing Up a Fund",
        paragraphs: [
          "When two funds look similar, a few key numbers reveal which is actually better. Start with the expense ratio - the yearly fee - because it's the cost you fully control and it compounds for decades. Next, look at what the fund holds: which index or type of investments, and how broadly it's diversified. Then check whether it's an index fund or actively managed, since that shapes both cost and expected results. These three - cost, holdings, and index-versus-active - tell you more about a fund's future than any flashy advertisement ever will.",
          "A tempting but tricky number is past performance. It feels natural to pick the fund that returned the most last year, but past returns don't reliably predict future ones - this year's winner is often next year's laggard. Worse, chasing hot performance usually means buying high after a run-up. Use past returns for context, not as the deciding factor. A fund that beat others last year mainly because it took huge risks, or got lucky in one sector, can reverse hard. Cost and strategy are far steadier guides to what you'll actually earn.",
          "It also helps to compare apples to apples. Two funds are only truly comparable if they invest in similar things - you can't fairly judge a bond fund against a tech fund by their returns, because they're built for different jobs. Line up funds within the same category - two S&P 500 funds, or two total-market funds - and then the cheaper, broader, more index-like one usually wins. Comparing across categories tells you about risk and role, not about which is 'better,' since they aren't trying to do the same thing."
        ],
        bullets: [
          "Check the expense ratio first - it's controllable and compounds for decades.",
          "Look at what the fund holds and how broadly it's diversified.",
          "Note whether it's an index fund or actively managed.",
          "Treat past performance as context, not a reliable predictor.",
          "Compare funds within the same category, not across different jobs."
        ],
        realWorldExample: "Two S&P 500 index funds hold identical stocks, so their returns before fees match. Comparing them, the only real difference is cost: the one charging 0.03% beats the one charging 0.50% every year, purely on fees - a clean apples-to-apples win."
      },
      {
        type: "concept",
        title: "Beyond the Basics: Fit and Fine Print",
        paragraphs: [
          "Numbers aside, the best fund is the one that fits your goal. A bond fund isn't 'worse' than a stock fund - it's built for stability and income, which is exactly right for near-term money or a crash cushion. A total-market fund and an S&P 500 fund are both fine cores; the difference is breadth, not quality. Before comparing details, ask what job you need this fund to do in your portfolio. Once the role is clear, the comparison narrows to funds that fit that role, and the choice gets much simpler.",
          "Then read the fine print that ads hide. Watch for loads - sales commissions that skim several percent - and prefer no-load funds. Check the fund's minimum investment; some require thousands to start, which matters for a teen with $100. Look at how big and established the fund is, since tiny funds can close or merge. For ETFs, glance at how actively it trades and its bid-ask spread, though for broad popular funds this is rarely a problem. None of these should override cost and holdings, but they can break a tie between otherwise similar funds.",
          "Finally, avoid two classic mistakes. First, don't be dazzled by a clever name, a slick app, or a five-star rating badge - those don't put money in your pocket the way low fees do. Second, don't overcomplicate it: for most long-term investors, the winner is simply a broad, low-cost, no-load index fund in the right category, held for years. The comparison process isn't about finding a secret genius fund; it's about screening out the expensive, gimmicky ones and keeping the cheap, boring, broadly diversified core that quietly wins over time."
        ],
        bullets: [
          "Pick the fund that fits the job you need it to do in your portfolio.",
          "Watch for loads and prefer no-load funds.",
          "Check minimum investment and how established the fund is.",
          "Don't be swayed by names, apps, or star badges over low fees.",
          "The usual winner is a broad, low-cost, no-load index fund in the right category."
        ],
        realWorldExample: "A teen with $100 finds a well-rated fund but its minimum investment is $3,000 - out of reach. A comparable broad index fund with a $0 minimum and a 0.04% fee does the same job and actually lets her start, so fit and fine print settle it."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "funds9-mc1",
            question: "Which factor should you check first when comparing similar funds?",
            options: [
              "The fund's clever marketing name in every case",
              "The expense ratio, since it compounds for decades",
              "Which app looks nicest in every case",
              "How many stars a badge shows in every case"
            ],
            correctAnswer: 1,
            explanation: "The expense ratio is the cost you control and it compounds over time, so it's the most reliable starting point when funds look similar."
          },
          {
            id: "funds9-mc2",
            question: "Why is past performance an unreliable way to pick a fund?",
            options: [
              "It is always faked by fund companies",
              "Past returns don't reliably predict future ones",
              "Old returns are illegal to publish in every case",
              "It only counts for bond funds"
            ],
            correctAnswer: 1,
            explanation: "This year's winner is often next year's laggard; chasing hot returns usually means buying high, so past performance is context, not a predictor."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Narrows Down Two Funds",
        narrative: "Priya, 17, wants a broad US stock core and has narrowed it to two total-market index funds. Fund X charges 0.03% with no load and a $0 minimum. Fund Y charges 0.55%, has a 3% load, and returned slightly more than X last year.",
        details: [
          "Both are total-market index funds, so they hold nearly the same stocks.",
          "Fund Y's 3% load skims money before it's even invested.",
          "Fund Y's higher last-year return doesn't reliably predict the future.",
          "Fund X's lower expense ratio compounds in her favor for decades."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "funds9-aq1",
          question: "Which fund should Priya choose for her long-term core?",
          options: [
              "Fund Y, because it returned more last year",
              "Fund X, the no-load 0.03% total-market fund",
              "Split evenly to hedge between them",
              "Neither - past returns make both too risky"
            ],
            correctAnswer: 1,
          explanation: "With nearly identical holdings, Fund X wins on cost: no load and a far lower fee compound in her favor, while last year's return doesn't predict the future."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Compare expense ratio, holdings, and index-versus-active first.",
          "Treat past performance as context, not a reliable predictor.",
          "Compare funds within the same category, not across different jobs.",
          "Watch for loads, minimums, and how established a fund is.",
          "The usual winner is a broad, low-cost, no-load index fund that fits the role."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "funds9-mastery1",
            question: "The most reliable first number to compare on similar funds is…",
            options: [
              "Its marketing slogan",
              "The expense ratio",
              "The color of its logo",
              "The number of app downloads"
            ],
            correctAnswer: 1,
            explanation: "The expense ratio is controllable and compounds for decades, making it the steadiest guide when funds otherwise look alike."
          },
          {
            id: "funds9-mastery2",
            question: "Past performance is a weak predictor because…",
            options: [
              "It is always exaggerated by law in every case",
              "This year's winner is often next year's laggard",
              "Returns are secret and unpublished in every case",
              "It only applies to cash accounts in every case"
            ],
            correctAnswer: 1,
            explanation: "Returns don't reliably repeat, and chasing hot funds usually means buying high, so past results are context rather than a forecast."
          },
          {
            id: "funds9-mastery3",
            question: "To compare fairly, you should line up funds that…",
            options: [
              "Do completely different jobs in every case for all investors",
              "Invest in similar things, in the same category",
              "Have the flashiest names in every case",
              "Are the newest on the market in every case"
            ],
            correctAnswer: 1,
            explanation: "Only same-category funds are truly comparable; judging a bond fund against a tech fund by returns compares different jobs, not quality."
          },
          {
            id: "funds9-mastery4",
            question: "A 'load' on a fund is…",
            options: [
              "A bonus the fund pays you in every case",
              "A sales commission that skims money off the top",
              "The number of stocks it holds in every case",
              "A tax on your yearly gains in every case"
            ],
            correctAnswer: 1,
            explanation: "A load is a sales commission charged to buy or sell; smart investors avoid it by choosing no-load funds."
          },
          {
            id: "funds9-mastery5",
            question: "For a teen with $100, a fund's minimum investment matters because…",
            options: [
              "High minimums guarantee better returns in every case",
              "A large minimum can lock her out entirely",
              "Minimums replace the expense ratio in every case",
              "Only funds with high minimums are safe in every case"
            ],
            correctAnswer: 1,
            explanation: "Some funds require thousands to start, so a high minimum can make an otherwise good fund impossible for a small investor to buy."
          },
          {
            id: "funds9-mastery6",
            question: "For most long-term investors, the comparison usually ends with…",
            options: [
              "A pricey active fund with a slick app",
              "A broad, low-cost, no-load index fund",
              "Whatever fund won the most stars",
              "The newest fund with the fanciest name"
            ],
            correctAnswer: 1,
            explanation: "Screening out expensive, gimmicky funds typically leaves a cheap, broadly diversified index fund in the right category as the winner."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // funds-10: When to Use Funds
  // ─────────────────────────────────────────────
  {
    lessonId: "funds-10",
    sections: [
      {
        type: "concept",
        title: "Matching the Fund to the Goal",
        paragraphs: [
          "Choosing a fund starts with the goal, not the fund. Money you'll need soon - within a year or two, like a car or a trip - shouldn't sit in a stock fund, because a crash could hit right when you need it. That money belongs in cash or a short-term bond fund, where stability matters more than growth. Money for the far future - retirement decades away - belongs mostly in broad stock funds, where time smooths out crashes and growth compounds. The right fund flows directly from when you'll spend the money.",
          "For long-term growth, broad stock index funds are the workhorse. A total-market or S&P 500 index fund captures the market's long-run growth cheaply and with wide diversification - the standard core for money you won't touch for many years. For a mid-term goal, like a house in five to seven years, a balanced mix of stock and bond funds - or a single fund that blends both - reduces the sting of a downturn while still growing. As the timeline shortens, the sensible fund shifts steadily from stock-heavy toward bond-heavy and finally toward cash.",
          "This is really asset allocation applied through funds. Rather than picking individual stocks and bonds, you use a few broad funds to build the mix your goals call for. A young investor might hold mostly a stock index fund with a slice of a bond fund; a target-date fund can even do that blending automatically. The skill isn't finding a magic fund - it's picking the fund type that matches each goal's timeline and risk, then contributing steadily and holding. Goal first, timeline second, fund type third."
        ],
        bullets: [
          "Start with the goal and its timeline, then choose the fund type.",
          "Near-term money belongs in cash or short-term bond funds, not stocks.",
          "Long-term money belongs mostly in broad stock index funds.",
          "Mid-term goals suit a balanced blend of stock and bond funds.",
          "This is asset allocation built from a few broad funds."
        ],
        realWorldExample: "Sam saves for two goals: a car next year and retirement in 45 years. He puts the car money in a short-term bond fund so a crash can't wreck it, and the retirement money in a broad stock index fund so decades of growth can compound. Same person, two different fund choices - driven by timeline."
      },
      {
        type: "concept",
        title: "Building Simple, Avoiding Traps",
        paragraphs: [
          "You don't need many funds to be well-diversified - often just a few do the whole job. A classic simple portfolio is a broad stock index fund plus a broad bond fund, split to match your timeline; a total-world stock fund can add international coverage. Owning ten overlapping funds usually adds complexity, not safety, since they hold many of the same companies. The goal is broad coverage with as few funds as needed, kept cheap and easy to manage. Simple portfolios are also easier to stick with, which matters more than cleverness.",
          "Steady contributing beats trying to time the market. Investing a fixed amount regularly - say $50 a month into your chosen funds - means you buy automatically through highs and lows, and you don't have to guess the perfect moment. This 'dollar-cost averaging' removes emotion and builds the habit that actually creates wealth. Waiting for the 'right time' usually means missing gains, because the market's best days are unpredictable and often come right after scary drops. For a teen, time in the market beats timing the market by a wide margin.",
          "Finally, watch for traps. Don't chase whatever fund is hot this year; don't pile into narrow sector funds hoping to strike it rich; don't let a slick app or fancy name pull you into high fees. And once you've matched funds to goals and set up automatic contributions, resist the urge to constantly tinker. The winning routine is almost boring: a few broad, low-cost funds matched to your goals, funded steadily, held for years, and rebalanced occasionally. That discipline, not a genius pick, is what turns modest savings into real long-term wealth."
        ],
        bullets: [
          "A few broad funds usually provide all the diversification you need.",
          "Contribute steadily - dollar-cost averaging beats timing the market.",
          "The market's best days often follow scary drops, so staying invested matters.",
          "Avoid chasing hot funds, narrow sectors, and high-fee gimmicks.",
          "Match funds to goals, fund them automatically, and hold - don't tinker."
        ],
        realWorldExample: "A teen who invests $50 every month for years through both booms and crashes typically ends up far ahead of a friend who kept 'waiting for the right time' and mostly stayed in cash - because steady time in the market quietly beats trying to guess the perfect entry."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "funds10-mc1",
            question: "Money you'll need within a year is best kept in…",
            options: [
              "A volatile single tech stock in every case",
              "Cash or a short-term bond fund",
              "A narrow sector ETF in every case",
              "A long-term stock index fund"
            ],
            correctAnswer: 1,
            explanation: "Near-term money needs stability, since a crash could strike right when you need it - so cash or short-term bond funds fit better than stocks."
          },
          {
            id: "funds10-mc2",
            question: "What is 'dollar-cost averaging'?",
            options: [
              "Buying only when the market bottoms in every case",
              "Investing a fixed amount regularly through highs and lows",
              "Converting all funds to cash each month in every case",
              "Paying a set fee to a fund manager"
            ],
            correctAnswer: 1,
            explanation: "Dollar-cost averaging means investing a steady amount on a schedule, so you buy automatically through ups and downs without timing the market."
          }
        ]
      },
      {
        type: "scenario",
        title: "Zoe Plans Two Goals",
        narrative: "Zoe, 18, has two goals: buying a used car in about a year and investing for retirement over 40 years. She's deciding which fund type fits each and whether to invest the retirement money all at once when she 'feels the timing is right' or steadily each month.",
        details: [
          "The car money has a one-year timeline, so a crash would be badly timed.",
          "The retirement money has 40 years for growth to compound.",
          "Timing the market is unreliable; the best days often follow drops.",
          "Steady monthly investing removes the guesswork of picking a moment."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "funds10-aq1",
          question: "What's the best plan for Zoe's two goals?",
          options: [
              "Put both goals in the same stock fund and wait to time it",
              "Car money in a short-term bond fund; retirement in a stock fund funded monthly",
              "Keep everything in cash to avoid all risk in every case for all investors",
              "Put the car money in a narrow sector ETF for bigger gains in every case"
            ],
            correctAnswer: 1,
          explanation: "Near-term car money needs stability while decades-away retirement money suits stocks, and steady monthly investing beats trying to time the market."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Choose fund types by goal and timeline, not by hype.",
          "Near-term money belongs in cash or short-term bond funds.",
          "Long-term money belongs mostly in broad stock index funds.",
          "A few broad funds provide plenty of diversification.",
          "Contribute steadily and hold - time in the market beats timing it."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "funds10-mastery1",
            question: "The first thing to decide when picking a fund is…",
            options: [
              "Which fund has the coolest name",
              "The goal and its timeline",
              "Which fund won last year",
              "How the app looks"
            ],
            correctAnswer: 1,
            explanation: "The right fund flows from when you'll spend the money, so the goal and timeline come before choosing any fund type."
          },
          {
            id: "funds10-mastery2",
            question: "Money needed within a year or two belongs in…",
            options: [
              "A broad stock index fund",
              "Cash or a short-term bond fund",
              "A single volatile stock in every case",
              "A narrow sector ETF in every case"
            ],
            correctAnswer: 1,
            explanation: "Near-term money needs stability so a crash can't hit right when you need it; cash or short-term bonds fit that job."
          },
          {
            id: "funds10-mastery3",
            question: "For retirement decades away, the workhorse fund is usually…",
            options: [
              "A short-term bond fund in every case",
              "A broad stock index fund",
              "A money-market cash fund",
              "A single hot stock"
            ],
            correctAnswer: 1,
            explanation: "With decades to smooth out crashes, broad stock index funds capture long-run growth cheaply, making them the standard long-term core."
          },
          {
            id: "funds10-mastery4",
            question: "How many funds do you usually need to be diversified?",
            options: [
              "At least twenty different funds",
              "Just a few broad funds",
              "Exactly one narrow sector fund",
              "As many as possible to be safe"
            ],
            correctAnswer: 1,
            explanation: "A few broad funds cover the market well; owning many overlapping funds adds complexity, not safety, since they hold the same companies."
          },
          {
            id: "funds10-mastery5",
            question: "Dollar-cost averaging helps because it…",
            options: [
              "Guarantees you buy at the exact bottom in every case",
              "Removes timing guesswork by investing on a schedule",
              "Eliminates all market risk in every case",
              "Locks in a fixed interest rate in every case"
            ],
            correctAnswer: 1,
            explanation: "Investing steadily through highs and lows removes emotion and the impossible task of guessing the perfect moment to buy."
          },
          {
            id: "funds10-mastery6",
            question: "A common trap when choosing funds is…",
            options: [
              "Holding a cheap broad fund for years",
              "Chasing this year's hottest fund or sector",
              "Contributing a fixed amount monthly in every case",
              "Matching a fund to your timeline"
            ],
            correctAnswer: 1,
            explanation: "Chasing hot funds and narrow sectors usually means buying high and taking concentrated risk, the opposite of a steady, goal-matched plan."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // bonds-1: What Is a Bond
  // ─────────────────────────────────────────────
  {
    lessonId: "bonds-1",
    sections: [
      {
        type: "concept",
        title: "You Become the Lender",
        paragraphs: [
          "A bond is a loan you make to a government or a company. Instead of borrowing from a bank, they borrow from investors like you by selling bonds. When you buy a $1,000 bond, you're handing over $1,000 today, and the borrower promises to pay you interest along the way and return your $1,000 on a set future date. It flips the usual script: normally you borrow money, but with a bond you're the lender, and the government or company is the one that owes you. That single idea - you're the lender - is the key to everything about bonds.",
          "Bonds have a few fixed parts. The 'face value' (or par) is the amount repaid at the end, often $1,000. The 'coupon' is the interest rate the bond pays, like 5% a year, so a $1,000 bond at 5% pays $50 annually. The 'maturity' is the date your principal is returned - it might be 2 years, 10 years, or 30. These terms are set when the bond is issued, which is why bonds are called 'fixed income': you know the payments and the payback date in advance, unlike a stock whose value floats on hope and profits.",
          "This predictability is exactly why bonds exist in a portfolio. A stock makes you a part-owner betting on a company's growth - exciting but bumpy. A bond makes you a lender collecting scheduled payments - calmer and more certain, as long as the borrower can pay. You give up the chance of huge gains in exchange for steadier, known returns. That's why investors mix bonds with stocks: the bonds provide a reliable backbone of income and repayment while the stocks chase growth. Being the lender means less upside, but far more certainty."
        ],
        bullets: [
          "A bond is a loan you make to a government or company - you're the lender.",
          "Face value (par) is the amount repaid at maturity, often $1,000.",
          "The coupon is the interest rate; a $1,000 bond at 5% pays $50 a year.",
          "Maturity is the set date your principal comes back.",
          "Bonds are 'fixed income' - payments and payback date are known in advance."
        ],
        realWorldExample: "When the US government needs money, it sells Treasury bonds to investors worldwide. Buy a $1,000 Treasury paying 4%, and you collect about $40 a year, then get your $1,000 back at maturity - you've effectively lent money to the government and been paid for it."
      },
      {
        type: "concept",
        title: "Why Borrowers Sell Bonds and What Can Go Wrong",
        paragraphs: [
          "Governments and companies sell bonds because it's often cheaper and more flexible than other borrowing. A city might issue bonds to build a school; a company might issue them to open factories; a government issues them to fund its budget. They'd rather pay investors modest interest over years than raise all the cash another way. For the borrower it's a loan; for you it's an investment that pays you to lend. Millions of these loans trade globally every day, making bonds one of the biggest markets in the world - even bigger than the stock market.",
          "The main risk is that the borrower can't pay you back - called default. A rock-solid borrower like the US government almost never defaults, so its bonds are considered extremely safe. A shaky company, though, might miss interest payments or fail to return your principal if it goes bankrupt. To compensate for that danger, riskier borrowers must offer higher coupons to attract lenders. This is the fundamental bargain of bonds: safer borrowers pay you less, riskier borrowers pay you more, and your job is to decide how much extra reward is worth the extra risk.",
          "Bonds aren't fully risk-free even when the borrower is reliable. Their market price can rise and fall before maturity, mainly as interest rates change, so selling early could mean a loss. Inflation can also erode what your fixed payments are worth over time. But if you buy a high-quality bond and hold it to maturity, you generally get exactly what was promised: the coupons and your principal back. That reliability, paired with modest risk, is why bonds anchor the calmer side of a portfolio while stocks handle the growth."
        ],
        bullets: [
          "Borrowers sell bonds to fund projects, budgets, or expansion.",
          "The bond market is huge - even larger than the stock market.",
          "Default is the main risk: the borrower fails to pay you back.",
          "Riskier borrowers must offer higher coupons to attract lenders.",
          "Held to maturity, a high-quality bond usually pays exactly as promised."
        ],
        realWorldExample: "A struggling company might have to offer a 9% coupon to sell its bonds, while the US government offers only 4% - because lenders demand extra reward for the higher chance the shaky company won't pay them back."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bonds1-mc1",
            question: "When you buy a bond, you are…",
            options: [
              "Becoming a part-owner of the company",
              "Lending money to a government or company",
              "Buying a share of the stock market",
              "Opening an insured savings account in every case"
            ],
            correctAnswer: 1,
            explanation: "A bond is a loan; you're the lender, and the government or company that issued it owes you interest plus your principal back at maturity."
          },
          {
            id: "bonds1-mc2",
            question: "The 'coupon' on a bond is…",
            options: [
              "A discount when you buy it",
              "The interest rate the bond pays",
              "The date your principal returns in every case",
              "A fee charged by the broker"
            ],
            correctAnswer: 1,
            explanation: "The coupon is the bond's interest rate. A $1,000 bond with a 5% coupon pays $50 a year until it matures."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ravi Considers Two Bonds",
        narrative: "Ravi, 18, has $1,000 and is comparing two bonds. One is a US Treasury paying a 4% coupon; the other is from a struggling company paying a 9% coupon. He wants to understand why the coupons differ before deciding.",
        details: [
          "The US Treasury almost never defaults, so it's considered very safe.",
          "The struggling company has a higher chance of missing payments.",
          "The company must offer 9% to attract lenders despite the risk.",
          "Held to maturity, a safe bond usually pays exactly as promised."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bonds1-aq1",
          question: "Why does the struggling company's bond pay 9% while the Treasury pays 4%?",
          options: [
              "The company is safer than the government",
              "Riskier borrowers must pay more to attract lenders",
              "Higher coupons are illegal for governments in every case",
              "The company is simply feeling generous in every case"
            ],
            correctAnswer: 1,
          explanation: "Lenders demand extra reward for extra risk, so a shakier borrower must offer a higher coupon than an ultra-safe one like the US government."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A bond is a loan you make - you're the lender, not an owner.",
          "Key terms: face value repaid at maturity, coupon interest, maturity date.",
          "Bonds are 'fixed income' - payments and payback are known upfront.",
          "Default is the main risk; riskier borrowers pay higher coupons.",
          "Held to maturity, a high-quality bond usually pays exactly as promised."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bonds1-mastery1",
            question: "Buying a bond makes you the…",
            options: [
              "Owner of the company",
              "Lender to the issuer",
              "Manager of the fund",
              "Insurer of the loan"
            ],
            correctAnswer: 1,
            explanation: "A bond is a loan, so you become the lender; the government or company that issued it owes you interest and principal."
          },
          {
            id: "bonds1-mastery2",
            question: "The 'face value' of a bond is…",
            options: [
              "The yearly interest it pays",
              "The amount repaid at maturity",
              "The broker's commission in every case",
              "The current stock price"
            ],
            correctAnswer: 1,
            explanation: "Face value, or par, is the principal returned at maturity - commonly $1,000 per bond."
          },
          {
            id: "bonds1-mastery3",
            question: "A $1,000 bond with a 5% coupon pays about…",
            options: [
              "$5 a year",
              "$50 a year",
              "$500 a year",
              "$5,000 a year"
            ],
            correctAnswer: 1,
            explanation: "5% of $1,000 is $50 per year in interest until the bond matures and returns your principal."
          },
          {
            id: "bonds1-mastery4",
            question: "Why are bonds called 'fixed income'?",
            options: [
              "Their price never changes in every case for all investors",
              "Their payments and payback date are known upfront",
              "They are fixed by the government yearly",
              "They pay only when the company profits"
            ],
            correctAnswer: 1,
            explanation: "Unlike a stock, a bond's coupon and maturity are set when issued, so you know the scheduled payments and repayment in advance."
          },
          {
            id: "bonds1-mastery5",
            question: "The main risk of owning a bond is that the borrower…",
            options: [
              "Pays you too much interest in every case",
              "Defaults and fails to pay you back",
              "Gives you part-ownership by mistake in every case",
              "Matures the bond too early"
            ],
            correctAnswer: 1,
            explanation: "Default - the borrower missing payments or not returning principal - is the core risk, which is why safer borrowers pay lower coupons."
          },
          {
            id: "bonds1-mastery6",
            question: "Compared with a Treasury, a shaky company's bond usually offers…",
            options: [
              "A lower coupon for less risk in every case",
              "A higher coupon to offset its risk",
              "No coupon at all in every case",
              "A guaranteed government backing in every case"
            ],
            correctAnswer: 1,
            explanation: "Riskier borrowers must pay more to attract lenders, so a struggling company's bond carries a higher coupon than an ultra-safe Treasury."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // bonds-2: Gov vs Corporate
  // ─────────────────────────────────────────────
  {
    lessonId: "bonds-2",
    sections: [
      {
        type: "concept",
        title: "Two Families of Borrowers",
        paragraphs: [
          "Bonds split into two big families based on who's borrowing. Government bonds are loans to governments - the US Treasury sells them to fund the country, and states and cities issue 'municipal' bonds for local projects. Corporate bonds are loans to companies, from giant stable firms to smaller risky ones. Both work the same way mechanically: you lend money, collect a coupon, and get your principal back at maturity. The crucial difference is who owes you and how likely they are to pay - and that difference drives everything about their safety and their interest rates.",
          "US government bonds are considered the safest investment on earth. The federal government has the power to tax and print currency, so it has essentially never failed to pay back a Treasury bond. Because that safety is so prized, Treasuries pay relatively low coupons - lenders accept less interest in exchange for near-certain repayment. This is why Treasuries are the benchmark for 'risk-free' returns and a favorite cushion when stocks crash: in scary times, investors rush to the safety of government bonds, which often hold up or rise while riskier assets fall.",
          "Corporate bonds pay more but carry more risk. A company can go bankrupt, so lending to it is riskier than lending to the government, and companies must offer higher coupons to compensate. A rock-solid corporation might pay a bit more than a Treasury; a struggling one must pay a lot more. Your reward for taking that extra risk is the higher interest - but only if the company actually pays. So the government-versus-corporate choice is really a trade: accept lower, safer returns from governments, or reach for higher returns from companies while shouldering more default risk."
        ],
        bullets: [
          "Government bonds are loans to governments; corporate bonds are loans to companies.",
          "US Treasuries are considered the safest investment, backed by taxing power.",
          "Because they're so safe, Treasuries pay relatively low coupons.",
          "Corporate bonds pay more to offset the risk that a company could fail.",
          "The choice is a trade: lower safe returns versus higher riskier returns."
        ],
        realWorldExample: "During the 2008 financial crisis, investors fled to US Treasuries for safety, pushing their prices up even as stocks and many corporate bonds fell. The government's near-zero default risk made its bonds the shelter everyone wanted in the storm."
      },
      {
        type: "concept",
        title: "Choosing Between Them for Your Goals",
        paragraphs: [
          "There's a spectrum inside each family. Among government bonds, US Treasuries are safest, while some foreign governments are far riskier. Among corporate bonds, 'investment-grade' bonds come from financially strong companies and are fairly safe, while 'high-yield' or 'junk' bonds come from shakier firms and pay much higher coupons for much higher risk. Municipal bonds add a twist: their interest is often tax-free, which can make a modest coupon more valuable than it looks. So 'government versus corporate' is really a range from ultra-safe to quite risky, with rewards rising as safety falls.",
          "Which to choose depends on your goal. If you want maximum safety - say a cushion against a stock crash or money you'll need soon - high-quality government bonds are the natural pick, even though they pay less. If you're comfortable taking more risk for more income, investment-grade corporate bonds offer a step up in yield with still-reasonable safety. Chasing the highest coupons through junk bonds means accepting real odds of losses, especially in a weak economy. Matching the bond's risk level to your purpose is more important than simply grabbing the biggest coupon.",
          "Most investors don't buy these one at a time - they use bond funds that hold hundreds of government or corporate bonds together, spreading default risk widely. A Treasury fund gives broad safety; a corporate bond fund gives higher income with more risk; a total-bond fund blends both. This lets you dial in the mix you want without picking individual issuers. The core lesson stays the same: governments pay less for more safety, companies pay more for more risk, and your job is to choose the blend that fits the job you need the money to do."
        ],
        bullets: [
          "Investment-grade corporates are fairly safe; 'junk' bonds are risky but high-paying.",
          "Municipal bond interest is often tax-free, boosting its real value.",
          "For maximum safety or near-term money, favor high-quality government bonds.",
          "For more income with reasonable safety, investment-grade corporates fit.",
          "Bond funds spread default risk across many issuers automatically."
        ],
        realWorldExample: "A 'high-yield' junk bond fund might advertise a juicy 8% yield, but in a recession many of its shaky companies can default, dragging the fund down - while a boring Treasury fund paying 4% quietly holds its value when times get hard."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bonds2-mc1",
            question: "Why are US Treasury bonds considered so safe?",
            options: [
              "They pay the highest coupons available in every case",
              "The government can tax and print to repay them",
              "They can never fall in price in every case",
              "They are insured by private companies in every case"
            ],
            correctAnswer: 1,
            explanation: "The federal government's power to tax and issue currency means it has essentially always repaid Treasuries, making them the benchmark for safety."
          },
          {
            id: "bonds2-mc2",
            question: "Compared with Treasuries, corporate bonds generally…",
            options: [
              "Pay less because they're safer in every case",
              "Pay more to offset higher risk",
              "Are impossible for individuals to buy",
              "Never pay any interest at all"
            ],
            correctAnswer: 1,
            explanation: "A company can go bankrupt, so it must offer higher coupons than the ultra-safe government to attract lenders for the extra risk."
          }
        ]
      },
      {
        type: "scenario",
        title: "Elena Wants a Crash Cushion",
        narrative: "Elena, 18, holds mostly stock funds and wants a bond that will stay steady and even help when stocks crash. She's choosing between a US Treasury bond fund yielding 4% and a high-yield junk bond fund yielding 8%.",
        details: [
          "The Treasury fund is backed by the government's taxing power.",
          "The junk bond fund holds shaky companies that can default in downturns.",
          "In past crashes, Treasuries held up while junk bonds fell.",
          "Elena's main goal is a steady cushion, not maximum income."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bonds2-aq1",
          question: "Which fund fits Elena's goal of a crash cushion?",
          options: [
              "The junk bond fund, since 8% is the biggest yield",
              "The Treasury bond fund, for its safety and steadiness",
              "Neither - she should sell all her bonds",
              "The junk fund, because it never defaults in every case"
            ],
            correctAnswer: 1,
          explanation: "Treasuries stay steady and often rise when stocks crash, giving the cushion Elena wants, while junk bonds can fall hard in the same downturn."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Government bonds are loans to governments; corporate bonds to companies.",
          "US Treasuries are the safest, so they pay relatively low coupons.",
          "Corporate bonds pay more to offset the risk a company could fail.",
          "Investment-grade is fairly safe; junk bonds are risky but high-yielding.",
          "Match the bond's risk to your goal; bond funds spread issuer risk."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bonds2-mastery1",
            question: "A corporate bond is a loan to…",
            options: [
              "A national government",
              "A company",
              "A local school district",
              "A stock exchange"
            ],
            correctAnswer: 1,
            explanation: "Corporate bonds are loans to companies, while government bonds are loans to governments like the US Treasury."
          },
          {
            id: "bonds2-mastery2",
            question: "US Treasuries pay relatively low coupons because…",
            options: [
              "The government dislikes lenders in every case",
              "Their high safety lets them pay less",
              "They are riskier than junk bonds",
              "Interest on them is illegal in every case"
            ],
            correctAnswer: 1,
            explanation: "Because repayment is near-certain, lenders accept lower interest, so the safest bonds pay the least."
          },
          {
            id: "bonds2-mastery3",
            question: "'Junk' (high-yield) bonds are best described as…",
            options: [
              "Ultra-safe government debt in every case",
              "Risky bonds paying high coupons",
              "Bonds that never pay interest",
              "Tax-free municipal bonds in every case"
            ],
            correctAnswer: 1,
            explanation: "High-yield bonds come from shakier companies and pay large coupons to compensate for a real chance of default."
          },
          {
            id: "bonds2-mastery4",
            question: "In a stock market crash, high-quality government bonds often…",
            options: [
              "Fall harder than stocks in every case",
              "Hold up or rise as a safe haven",
              "Become completely worthless in every case for all investors",
              "Pay no interest that year in every case"
            ],
            correctAnswer: 1,
            explanation: "Investors flee to safety in downturns, so Treasuries frequently hold up or gain, cushioning a portfolio when stocks fall."
          },
          {
            id: "bonds2-mastery5",
            question: "A special feature of many municipal bonds is that their interest is…",
            options: [
              "Guaranteed to double",
              "Often tax-free",
              "Paid only in stock",
              "Higher than junk bonds"
            ],
            correctAnswer: 1,
            explanation: "Municipal bond interest is frequently tax-free, which can make a modest coupon worth more than it first appears."
          },
          {
            id: "bonds2-mastery6",
            question: "For money you'll need soon and want kept safe, the better pick is…",
            options: [
              "A high-yield junk bond fund",
              "A high-quality government bond",
              "A single shaky company's bond",
              "A foreign government's risky bond"
            ],
            correctAnswer: 1,
            explanation: "Near-term, safety-first money belongs in high-quality government bonds, which pay less but are far less likely to lose value."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // bonds-3: Yield
  // ─────────────────────────────────────────────
  {
    lessonId: "bonds-3",
    sections: [
      {
        type: "concept",
        title: "Coupon Versus Yield",
        paragraphs: [
          "The coupon is fixed, but a bond's real return can change - and that's where 'yield' comes in. The coupon is the dollar interest set when the bond is issued: a $1,000 bond with a 5% coupon always pays $50 a year. But bonds trade, and their price moves. Yield measures your actual return based on what you pay now, not the original face value. If you buy that same bond for less than $1,000, your $50 is a bigger slice of your smaller cost, so your yield is higher than 5%. Coupon is the promise; yield is what you really earn at today's price.",
          "The simplest version is 'current yield': annual coupon divided by the price you pay. That $50 coupon on a bond you bought for $1,000 is a 5% current yield. Buy the same bond for $800 and the $50 becomes a 6.25% yield - the fixed payment is now a larger share of your cheaper purchase. Buy it for $1,250 and the $50 is only a 4% yield. So the same bond can offer very different yields depending on its price, which is why savvy investors watch yield, not just the coupon printed on the bond.",
          "This reveals the seesaw at the heart of bonds: price and yield move in opposite directions. When a bond's price falls, its yield rises; when its price rises, its yield falls. It makes sense - a fixed $50 payment is a better deal when you pay less for it and a worse deal when you pay more. Understanding this inverse link is the foundation for everything about bond investing, from why rising interest rates hurt bond prices to why a 'high yield' can sometimes be a warning sign rather than a bargain."
        ],
        bullets: [
          "Coupon is the fixed dollar interest; yield is your real return at today's price.",
          "Current yield = annual coupon divided by the price you pay.",
          "Buy below face value and your yield beats the coupon; buy above and it's lower.",
          "The same bond offers different yields at different prices.",
          "Price and yield move in opposite directions - the core bond seesaw."
        ],
        realWorldExample: "A bond pays a fixed $50 coupon. Bought at $1,000 it yields 5%; if its price drops to $800, that same $50 now yields 6.25%. The payment never changed - only the price you paid - yet your return jumped, showing how price and yield seesaw."
      },
      {
        type: "concept",
        title: "Yield to Maturity and Reading the Signal",
        paragraphs: [
          "Current yield ignores something important: the fact that you'll get the face value back at maturity. 'Yield to maturity' (YTM) is the fuller measure - it combines the coupons you'll collect and the gain or loss from buying above or below face value, all the way to the payback date. If you buy a bond below par, you not only get a high current yield but also a bonus when it repays full face value; YTM captures that total picture. It's the number professionals use to compare bonds fairly, because it reflects everything you'll actually earn if you hold to the end.",
          "Yield is also a signal about risk. Two bonds might both offer high yields - but one because its price fell on rising rates, another because the market fears the borrower could default. A very high yield often means the market sees danger and has pushed the price down to compensate lenders. So a fat yield is not automatically a great deal; it can be the market's warning that this borrower is shaky. Wise investors ask why a yield is high before chasing it, distinguishing a genuine bargain from a bond the market is fleeing for good reason.",
          "In practice, yield helps you compare options and understand the market. When people say 'the 10-year Treasury yields 4%,' they mean that's the return you'd earn buying it now and holding it. Rising yields across the market usually mean bond prices have fallen, often because interest rates went up. Falling yields mean prices rose. For a long-term investor, the takeaway is simple: focus on yield to maturity for a true return, don't blindly chase the highest yield, and remember that yield and price always move as a seesaw."
        ],
        bullets: [
          "Yield to maturity combines coupons plus any gain or loss versus face value.",
          "YTM is the fuller measure pros use to compare bonds fairly.",
          "A very high yield can signal that the market fears default.",
          "Ask why a yield is high before chasing it - danger or bargain?",
          "Rising market yields usually mean bond prices have fallen."
        ],
        realWorldExample: "A bond suddenly yielding 12% when similar ones yield 4% is often a red flag, not a jackpot - the market may have slashed its price because it fears the company will default. The high yield is the market pricing in real risk."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bonds3-mc1",
            question: "How is 'current yield' calculated?",
            options: [
              "Face value divided by the coupon in every case",
              "Annual coupon divided by the price you pay",
              "Maturity date minus today's date in every case",
              "The coupon plus the broker's fee in every case"
            ],
            correctAnswer: 1,
            explanation: "Current yield is the annual coupon divided by the price you pay, so a lower purchase price raises the yield above the coupon rate."
          },
          {
            id: "bonds3-mc2",
            question: "When a bond's price falls, its yield…",
            options: [
              "Falls along with the price in every case for all investors",
              "Rises, because the fixed coupon is now cheaper to buy",
              "Stays exactly the same in every case for all investors",
              "Drops to zero immediately in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "Price and yield seesaw inversely: a fixed coupon is a better deal at a lower price, so a falling price means a rising yield."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tariq Spots a High Yield",
        narrative: "Tariq, 18, sees two bonds. Bond A is a Treasury yielding 4%. Bond B is a corporate bond suddenly yielding 12% after its price dropped sharply on news the company might struggle to pay its debts. Tariq is tempted by the big 12% number.",
        details: [
          "Bond B's price fell sharply, which pushed its yield way up.",
          "The price drop came from fears the company could default.",
          "A yield far above similar bonds often signals danger, not a bargain.",
          "If the company defaults, Tariq could lose much of his principal."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bonds3-aq1",
          question: "What should Tariq conclude about Bond B's 12% yield?",
          options: [
              "It's a guaranteed jackpot he should grab in every case",
              "It likely reflects high default risk, not free money",
              "Yields never relate to a bond's risk in every case",
              "The government must be backing it in every case"
            ],
            correctAnswer: 1,
          explanation: "A yield far above similar bonds usually means the market cut the price over default fears, so the fat yield is compensation for real risk, not a bargain."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Coupon is the fixed payment; yield is your real return at today's price.",
          "Current yield = annual coupon divided by price paid.",
          "Price and yield move inversely - the core bond seesaw.",
          "Yield to maturity adds any gain or loss versus face value.",
          "A very high yield can signal danger, so ask why before chasing it."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bonds3-mastery1",
            question: "The difference between coupon and yield is that the coupon is…",
            options: [
              "Your return at today's price in every case",
              "The fixed payment set at issue",
              "Always higher than the yield",
              "A tax on bond interest"
            ],
            correctAnswer: 1,
            explanation: "The coupon is the fixed dollar interest set when issued, while yield reflects your actual return based on the price you pay now."
          },
          {
            id: "bonds3-mastery2",
            question: "A $50 coupon on a bond bought for $1,000 gives a current yield of…",
            options: [
              "0.5%",
              "5%",
              "50%",
              "500%"
            ],
            correctAnswer: 1,
            explanation: "Current yield is coupon divided by price: $50 divided by $1,000 equals 5%."
          },
          {
            id: "bonds3-mastery3",
            question: "If you buy a bond below its face value, its current yield is…",
            options: [
              "Lower than the coupon rate",
              "Higher than the coupon rate",
              "Exactly the coupon rate in every case",
              "Always zero in every case"
            ],
            correctAnswer: 1,
            explanation: "A fixed coupon is a bigger slice of a smaller purchase price, so buying below face value raises the yield above the coupon rate."
          },
          {
            id: "bonds3-mastery4",
            question: "Price and yield on a bond move…",
            options: [
              "In the same direction",
              "In opposite directions",
              "Completely independently",
              "Only when it matures"
            ],
            correctAnswer: 1,
            explanation: "They seesaw inversely: when price rises, yield falls, and when price falls, yield rises, because the coupon is fixed."
          },
          {
            id: "bonds3-mastery5",
            question: "Yield to maturity is more complete than current yield because it also includes…",
            options: [
              "The broker's commission in every case for all investors",
              "The gain or loss versus face value at maturity",
              "The company's stock price in every case for all investors",
              "Next year's inflation rate in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "YTM combines the coupons with any gain or loss from buying above or below face value, giving the true return if held to maturity."
          },
          {
            id: "bonds3-mastery6",
            question: "A yield far higher than similar bonds often signals…",
            options: [
              "A guaranteed bargain to grab fast in every case",
              "That the market fears the borrower could default",
              "A government guarantee kicked in in every case",
              "That the coupon was doubled in every case"
            ],
            correctAnswer: 1,
            explanation: "The market usually cuts a shaky borrower's price, lifting its yield, so a very high yield is compensation for real risk, not free money."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // bonds-4: Ratings
  // ─────────────────────────────────────────────
  {
    lessonId: "bonds-4",
    sections: [
      {
        type: "concept",
        title: "Report Cards for Borrowers",
        paragraphs: [
          "How do you know if a bond's borrower will actually pay you back? Rating agencies - the biggest are Moody's, S&P, and Fitch - study each borrower's finances and assign a grade, like a report card for creditworthiness. These grades run from top marks down to failing, using letter codes such as AAA at the safest end down to C or D near default. A bond rated AAA means the agency judges repayment almost certain; a bond rated B or lower means real doubt. Ratings give investors a quick, standardized way to size up default risk without personally auditing every borrower.",
          "The grades split into two big buckets. 'Investment grade' covers the safer bonds - roughly AAA down through BBB - issued by financially strong governments and companies. 'Speculative grade,' also called 'high yield' or 'junk,' covers everything below that, from BB down, issued by shakier borrowers. The line between BBB and BB is a big deal: many cautious investors and funds are only allowed to hold investment-grade bonds, so slipping below that line can force selling and push a bond's price down. A single downgrade across that boundary can matter enormously, sometimes moving a bond's price far more than a downgrade that stays comfortably within the investment-grade range.",
          "Ratings tie directly to yield. Safer, higher-rated bonds can pay lower coupons because lenders trust them; riskier, lower-rated bonds must pay higher coupons to attract anyone at all. That's why a AAA government bond might yield 4% while a B-rated junk bond yields 9% - the extra yield is your pay for taking on the extra default risk the rating flags. Reading a bond's rating tells you, at a glance, roughly how safe it is and why its yield sits where it does."
        ],
        bullets: [
          "Rating agencies grade borrowers' ability to repay, like a credit report card.",
          "Grades run from AAA (safest) down toward C or D (near default).",
          "'Investment grade' is AAA to BBB; below that is 'junk' or high yield.",
          "The BBB-to-BB line matters - many funds can only hold investment grade.",
          "Higher ratings allow lower coupons; lower ratings demand higher coupons."
        ],
        realWorldExample: "The US government carries a top-tier rating, so its Treasuries pay modest interest. A struggling retailer rated in the B range must offer much higher coupons to sell its bonds - the low rating warns of default risk, and the high coupon is the payment for accepting it."
      },
      {
        type: "concept",
        title: "Using Ratings Without Trusting Them Blindly",
        paragraphs: [
          "Ratings are useful, but they're opinions, not guarantees. Agencies can be slow to react, and they've been wrong before - famously, many mortgage-backed bonds rated AAA collapsed in the 2008 crisis, wiping out investors who trusted the top grade. A rating reflects an agency's best judgment at a moment in time; it can be downgraded as a borrower weakens or upgraded as it strengthens. So a rating is a helpful starting point for gauging risk, not a promise that nothing will go wrong. Treat it as one input, not the final word.",
          "Ratings also change, and those changes move prices. When an agency downgrades a bond, it signals higher default risk, and the bond's price usually falls while its yield rises to compensate new buyers. An upgrade does the opposite. A downgrade from investment grade to junk - creating a so-called 'fallen angel' - can force cautious funds to sell, amplifying the price drop. For a bondholder, watching for rating changes is part of managing risk: a slipping grade is an early warning that the borrower's finances may be deteriorating.",
          "For most everyday investors, the practical use is simple. If you want safety, stick to investment-grade bonds or funds, especially high-quality government bonds. If you're chasing higher yield through lower-rated bonds, know you're accepting real odds of loss, and never assume a rating makes a bond risk-free. Bond funds handle much of this for you by holding many rated bonds and often targeting a quality range, like an investment-grade fund. Ratings, used wisely, help you match a bond's risk to your goals rather than being surprised by a default."
        ],
        bullets: [
          "Ratings are informed opinions, not guarantees - they can be wrong or slow.",
          "In 2008 many AAA-rated mortgage bonds collapsed anyway.",
          "Downgrades push prices down and yields up; upgrades do the reverse.",
          "A 'fallen angel' drops from investment grade to junk, forcing some sales.",
          "For safety, favor investment-grade bonds or funds and watch for downgrades."
        ],
        realWorldExample: "In 2008, bonds stamped AAA - the very top grade - defaulted in huge numbers because agencies had misjudged the risk. Investors who assumed 'AAA means totally safe' learned that a rating is an opinion that can be badly wrong."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bonds4-mc1",
            question: "What does a bond rating measure?",
            options: [
              "How fast the bond can be traded in every case",
              "The borrower's ability to repay - its default risk",
              "The tax owed on the interest in every case",
              "The number of coupons remaining in every case"
            ],
            correctAnswer: 1,
            explanation: "Rating agencies grade a borrower's creditworthiness, giving investors a standardized read on how likely the bond is to be repaid."
          },
          {
            id: "bonds4-mc2",
            question: "Bonds rated below the investment-grade line are called…",
            options: [
              "Prime-grade bonds in every case",
              "High-yield or junk bonds",
              "Treasury bonds in every case",
              "Tax-free bonds"
            ],
            correctAnswer: 1,
            explanation: "Below BBB, bonds are 'speculative grade' - high-yield or junk - issued by shakier borrowers who must pay higher coupons."
          }
        ]
      },
      {
        type: "scenario",
        title: "Grace Weighs a Downgrade",
        narrative: "Grace, 18, owns a corporate bond that was rated BBB (investment grade). News breaks that the company was just downgraded to BB (junk) because its finances weakened. She notices the bond's price dropping and wonders what the downgrade means.",
        details: [
          "The downgrade signals higher default risk than before.",
          "Dropping below investment grade can force cautious funds to sell.",
          "Forced selling and higher risk push the bond's price down and yield up.",
          "A rating is an opinion that can change as a borrower weakens."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bonds4-aq1",
          question: "What does the downgrade from BBB to BB most likely mean for Grace's bond?",
          options: [
              "It's now safer and will rise in price in every case",
              "Its risk rose, so its price fell and yield climbed",
              "The rating change has no effect at all in every case",
              "The government now guarantees the bond in every case"
            ],
            correctAnswer: 1,
          explanation: "Slipping into junk signals higher default risk and can force some funds to sell, pushing the price down and the yield up to attract new buyers."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Rating agencies grade borrowers' ability to repay, from AAA down to D.",
          "Investment grade is AAA to BBB; below that is high-yield or junk.",
          "Higher ratings allow lower coupons; lower ratings demand higher ones.",
          "Ratings are opinions, not guarantees - they can be wrong or slow.",
          "Downgrades push prices down; favor investment grade for safety."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bonds4-mastery1",
            question: "A bond rating primarily tells you about a borrower's…",
            options: [
              "Stock price target in every case",
              "Ability to repay its debt",
              "Marketing budget in every case",
              "Number of employees in every case"
            ],
            correctAnswer: 1,
            explanation: "Ratings grade creditworthiness - the likelihood the borrower repays - giving a quick read on default risk."
          },
          {
            id: "bonds4-mastery2",
            question: "The safest bonds carry a rating around…",
            options: [
              "C or D",
              "AAA",
              "BB",
              "Unrated"
            ],
            correctAnswer: 1,
            explanation: "AAA is the top grade, signaling repayment is judged almost certain; grades fall toward C or D near default."
          },
          {
            id: "bonds4-mastery3",
            question: "'Investment grade' bonds are those rated…",
            options: [
              "Below BB only in every case",
              "From AAA down to BBB",
              "Only exactly AAA in every case",
              "Anything without a rating"
            ],
            correctAnswer: 1,
            explanation: "Investment grade spans AAA through BBB; below BBB, bonds are speculative grade, or junk."
          },
          {
            id: "bonds4-mastery4",
            question: "A lower-rated bond must offer a higher coupon because…",
            options: [
              "The government requires it in every case",
              "Lenders demand more pay for more default risk",
              "Its interest is always tax-free in every case",
              "Ratings have no link to yield in every case"
            ],
            correctAnswer: 1,
            explanation: "Riskier borrowers must pay more to attract lenders, so lower ratings come with higher coupons as compensation for risk."
          },
          {
            id: "bonds4-mastery5",
            question: "The 2008 crisis showed that top ratings…",
            options: [
              "Are legally binding guarantees in every case for all investors",
              "Can be wrong, as many AAA bonds collapsed",
              "Never change once assigned in every case",
              "Only apply to Treasuries in every case"
            ],
            correctAnswer: 1,
            explanation: "Many AAA-rated mortgage bonds defaulted in 2008, proving a rating is an opinion that can be badly mistaken, not a guarantee."
          },
          {
            id: "bonds4-mastery6",
            question: "When a bond is downgraded, its price usually…",
            options: [
              "Rises as it becomes safer in every case",
              "Falls as its risk is now higher",
              "Stays perfectly unchanged in every case",
              "Is frozen until maturity in every case"
            ],
            correctAnswer: 1,
            explanation: "A downgrade flags higher default risk and can force some funds to sell, pushing the price down and the yield up."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // bonds-5: Inflation Risk
  // ─────────────────────────────────────────────
  {
    lessonId: "bonds-5",
    sections: [
      {
        type: "concept",
        title: "When Fixed Payments Lose Buying Power",
        paragraphs: [
          "Bonds pay fixed amounts, which sounds safe - until you remember that prices in the world keep rising. Inflation is the steady increase in the cost of things over time, and it quietly shrinks what your money can buy. A bond that pays you $50 a year always pays $50, but if a slice of pizza costs more each year, that same $50 buys less pizza over time. This is inflation risk: the danger that the fixed dollars a bond pays will lose real buying power, so you end up richer on paper but poorer in what you can actually purchase.",
          "The key idea is the gap between 'nominal' and 'real' returns. Nominal return is the plain interest rate, like 4%. Real return subtracts inflation to show your true gain in buying power. If your bond pays 4% but inflation runs at 3%, your real return is only about 1% - most of your interest just kept up with rising prices. If inflation hits 5% while your bond pays 4%, your real return is actually negative: you're technically losing purchasing power even while collecting interest. For fixed-income investors, inflation is the silent enemy that eats returns from the inside.",
          "Long-term bonds are hit hardest by this risk. If you lock in a 3% coupon for 30 years and inflation later jumps to 6%, you're stuck receiving payments worth far less than you expected, for decades. A short-term bond matures soon, so you can reinvest at new, higher rates that reflect the higher inflation. That's why, when investors fear rising inflation, they often shy away from long bonds - the longer you're locked into fixed payments, the more damage inflation can do to what those payments are really worth."
        ],
        bullets: [
          "Inflation is the steady rise in prices that shrinks money's buying power.",
          "Inflation risk is fixed bond payments buying less over time.",
          "Nominal return is the stated rate; real return subtracts inflation.",
          "A 4% bond with 3% inflation gives only about a 1% real return.",
          "Long-term bonds suffer most, being locked into fixed payments longer."
        ],
        realWorldExample: "In 2022, US inflation spiked above 8%. Someone holding a bond paying 3% was actually losing over 5% in real buying power each year - collecting interest, yet falling behind as the price of groceries, gas, and rent climbed much faster than their coupon."
      },
      {
        type: "concept",
        title: "Defending Against Inflation",
        paragraphs: [
          "Investors have tools to fight inflation risk. One is favoring shorter-term bonds when inflation looks likely to rise, since they mature soon and let you reinvest at higher rates. Another is a special kind of government bond designed for exactly this problem: inflation-protected bonds, known in the US as TIPS. Their principal rises with inflation, so your payments and payback keep pace with rising prices instead of falling behind. TIPS pay a lower base rate than regular bonds, but that's the trade for built-in inflation protection - you sacrifice some yield for safety of buying power.",
          "Stocks also play a role in the bigger picture. Over long periods, stocks have historically outrun inflation by a wide margin, because companies can raise their prices and grow profits as costs rise. That's a major reason young investors hold lots of stocks: they need growth that beats inflation over decades, something low-coupon bonds struggle to do. Bonds still matter for stability and income, but leaning entirely on fixed-rate bonds for a 40-year goal risks watching inflation slowly erode your real wealth. Balance is the point, not abandoning bonds.",
          "For a teen, the practical lesson is to respect inflation as a real force, not an abstraction. When choosing bonds, think in real terms: 'What will this payment actually buy?' rather than just the headline rate. Keep some growth assets like stock funds to outpace inflation over the long haul, consider inflation-protected bonds for safer money, and avoid locking huge sums into very long, low-coupon bonds right before inflation might rise. Understanding inflation risk turns 'safe' fixed income from a blind comfort into a tool you use with clear eyes."
        ],
        bullets: [
          "Shorter-term bonds let you reinvest sooner at higher rates.",
          "Inflation-protected bonds (TIPS) adjust principal to keep pace with prices.",
          "TIPS pay a lower base rate as the trade for inflation protection.",
          "Stocks have historically outrun inflation over long periods.",
          "Think in real terms - what a payment will actually buy - when picking bonds."
        ],
        realWorldExample: "A saver worried about rising prices buys TIPS instead of a regular bond. When inflation jumps, the TIPS principal adjusts upward, so their payments grow with prices - while a neighbor's fixed 3% bond quietly loses ground as the same inflation eats its value."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bonds5-mc1",
            question: "What is 'inflation risk' for a bond?",
            options: [
              "The chance the borrower defaults in every case",
              "Fixed payments losing buying power as prices rise",
              "The bond being called back early in every case",
              "A broker charging extra fees in every case"
            ],
            correctAnswer: 1,
            explanation: "Inflation risk is the danger that a bond's fixed dollars buy less over time as prices rise, shrinking your real return."
          },
          {
            id: "bonds5-mc2",
            question: "If a bond pays 4% and inflation is 3%, your real return is about…",
            options: [
              "7%",
              "1%",
              "12%",
              "0.75%"
            ],
            correctAnswer: 1,
            explanation: "Real return subtracts inflation from the nominal rate: 4% minus 3% is roughly 1% of true gain in buying power."
          }
        ]
      },
      {
        type: "scenario",
        title: "Noah Fears Rising Prices",
        narrative: "Noah, 18, wants to put some savings in bonds but worries inflation could climb over the next several years. He's choosing between a 30-year bond with a fixed 3% coupon and inflation-protected government bonds (TIPS) whose principal adjusts with prices.",
        details: [
          "The 30-year bond locks in a fixed 3% for three decades.",
          "If inflation rises, that fixed 3% buys less and less over time.",
          "TIPS adjust their principal upward as prices rise.",
          "Noah's main worry is protecting his buying power from inflation."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bonds5-aq1",
          question: "Which choice better protects Noah from inflation risk?",
          options: [
              "The 30-year fixed 3% bond, locked in for decades",
              "The inflation-protected bonds (TIPS) that adjust with prices",
              "Neither - both are equally exposed to inflation",
              "A bond paying 0% but maturing in 40 years"
            ],
            correctAnswer: 1,
          explanation: "TIPS raise their principal as prices climb, so payments keep pace with inflation, while the fixed long bond would steadily lose buying power."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Inflation is rising prices that shrink money's buying power.",
          "Inflation risk is a bond's fixed payments buying less over time.",
          "Real return subtracts inflation from the stated (nominal) rate.",
          "Long-term fixed bonds suffer inflation risk the most.",
          "Shorter bonds, TIPS, and some stocks help defend buying power."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bonds5-mastery1",
            question: "Inflation risk mainly threatens a bond by…",
            options: [
              "Making the borrower default in every case",
              "Eroding the buying power of fixed payments",
              "Forcing an early repayment in every case",
              "Raising the broker's fee in every case"
            ],
            correctAnswer: 1,
            explanation: "Because payments are fixed, rising prices mean each dollar buys less, shrinking the real value of what the bond pays."
          },
          {
            id: "bonds5-mastery2",
            question: "'Real return' is the nominal rate…",
            options: [
              "Multiplied by inflation",
              "Minus inflation",
              "Plus the coupon again",
              "Divided by the maturity"
            ],
            correctAnswer: 1,
            explanation: "Real return subtracts inflation from the stated rate to show your true gain in buying power."
          },
          {
            id: "bonds5-mastery3",
            question: "If a bond pays 4% while inflation runs at 5%, your real return is…",
            options: [
              "A healthy 9% in every case",
              "Negative, about minus 1%",
              "Exactly 4% in every case",
              "A guaranteed 5%"
            ],
            correctAnswer: 1,
            explanation: "With inflation above the coupon, your real return is negative - you lose buying power even while collecting interest."
          },
          {
            id: "bonds5-mastery4",
            question: "Which bond suffers inflation risk the most?",
            options: [
              "A very short-term bond",
              "A long-term fixed-coupon bond",
              "A bond maturing next month",
              "A cash savings account"
            ],
            correctAnswer: 1,
            explanation: "Long-term bonds lock in fixed payments for many years, so rising inflation erodes their real value for far longer."
          },
          {
            id: "bonds5-mastery5",
            question: "TIPS protect against inflation by…",
            options: [
              "Paying the highest coupon available in every case",
              "Adjusting their principal as prices rise",
              "Guaranteeing a fixed 10% return",
              "Never changing in value at all"
            ],
            correctAnswer: 1,
            explanation: "Inflation-protected bonds raise their principal with inflation, so payments and payback keep pace with rising prices."
          },
          {
            id: "bonds5-mastery6",
            question: "Over long periods, an asset that has historically outrun inflation is…",
            options: [
              "Cash under a mattress",
              "Stocks",
              "A 0% coupon bond",
              "A fixed savings account"
            ],
            correctAnswer: 1,
            explanation: "Companies can raise prices and grow profits as costs rise, so stocks have historically beaten inflation over the long haul."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // bonds-6: Interest Rate Risk
  // ─────────────────────────────────────────────
  {
    lessonId: "bonds-6",
    sections: [
      {
        type: "concept",
        title: "The Seesaw Between Prices and Rates",
        paragraphs: [
          "Here's a fact that surprises new investors: when interest rates rise, existing bond prices fall, and when rates drop, bond prices rise. They move in opposite directions, like a seesaw. The reason is simple once you see it. Imagine you own a bond paying a fixed 3% coupon. If new bonds start paying 5%, nobody wants your old 3% bond at full price - why accept 3% when they can get 5% elsewhere? So to sell yours, you'd have to drop its price until its yield matches the new 5%. Rising rates make old, lower-paying bonds worth less.",
          "The flip side works the same way. If you own a 5% bond and new bonds start paying only 3%, suddenly your bond is a prize - it pays more than what's newly available. Buyers will pay extra for it, pushing its price above face value until its yield falls in line with the market. So falling rates make existing bonds worth more. This is 'interest rate risk': the danger that rising rates will knock down the market price of bonds you already hold, even if the borrower is perfectly safe and never misses a payment.",
          "Notice that this risk exists even with zero default risk. A US Treasury will always pay you back, yet its market price still swings as rates move. If you hold a bond to maturity, these price swings don't cost you real money - you still get your coupons and full face value at the end. Interest rate risk bites when you need to sell before maturity, or when you own bond funds whose share prices reflect current market values. Understanding this seesaw explains why even 'safe' bonds can show losses when rates climb."
        ],
        bullets: [
          "Bond prices and interest rates move in opposite directions - a seesaw.",
          "When rates rise, old lower-paying bonds must drop in price to compete.",
          "When rates fall, existing higher-paying bonds become more valuable.",
          "Interest rate risk exists even for bonds with zero default risk.",
          "Held to maturity, price swings don't cost you - you still get face value."
        ],
        realWorldExample: "In 2022 the Federal Reserve raised interest rates rapidly. Investors holding older, lower-coupon bonds watched their market prices tumble - some long-term bonds fell 20% or more - purely because newly issued bonds now paid much higher rates, not because any borrower defaulted."
      },
      {
        type: "concept",
        title: "How Long You're Locked In Matters",
        paragraphs: [
          "Not all bonds feel rate changes equally - the length of the bond is what matters most. A short-term bond maturing in one year barely moves when rates change, because you'll get your money back soon and can reinvest at the new rate. A 30-year bond, though, locks you into its old coupon for decades, so a rate rise makes it far less attractive and its price drops much harder. The longer the time until you get your principal back, the more a bond's price swings when rates move. Length amplifies interest rate risk.",
          "This gives investors a lever they can pull. If you're worried rates might rise, you can favor shorter-term bonds to limit price damage - you accept lower yields in exchange for stability. If you think rates might fall, longer bonds could gain the most in price. Bond funds come in short, intermediate, and long-term flavors for exactly this reason. A short-term bond fund is steadier but pays less; a long-term fund pays more but lurches when rates move. Matching the fund's length to your risk tolerance is a core part of using bonds wisely.",
          "The practical takeaway blends this with your timeline. If you'll need the money soon, short-term bonds protect you from having to sell a long bond at a loss during a rate spike. If you can hold to maturity, rate swings matter far less because you'll collect full face value regardless. For most beginners, short-to-intermediate high-quality bonds or funds offer a sensible balance: meaningful income, a cushion against stock crashes, and limited exposure to the price whiplash that long bonds suffer when interest rates climb."
        ],
        bullets: [
          "A bond's length drives how much its price swings with rates.",
          "Short-term bonds barely move; long-term bonds swing hard.",
          "Favor shorter bonds if you fear rising rates; longer if you expect falling rates.",
          "Bond funds come in short, intermediate, and long-term versions.",
          "Match bond length to your timeline and tolerance for price swings."
        ],
        realWorldExample: "When rates jumped in 2022, a short-term bond fund dipped only slightly, while a long-term bond fund fell sharply. Same rate move, very different pain - purely because the long fund's bonds were locked into old rates for many more years."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bonds6-mc1",
            question: "When interest rates rise, existing bond prices generally…",
            options: [
              "Rise along with rates in every case for all investors",
              "Fall, because old bonds pay less than new ones",
              "Stay exactly the same in every case for all investors",
              "Jump to double their value in every case"
            ],
            correctAnswer: 1,
            explanation: "Prices and rates seesaw. New bonds paying more make old lower-paying bonds less attractive, so their prices must fall to compete."
          },
          {
            id: "bonds6-mc2",
            question: "Which bond's price swings most when interest rates change?",
            options: [
              "A bond maturing in one year",
              "A 30-year long-term bond",
              "A bond maturing next month",
              "A cash savings account"
            ],
            correctAnswer: 1,
            explanation: "Longer bonds lock in their coupon for many years, so a rate change affects them far more than a short bond that matures soon."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maya Braces for Rising Rates",
        narrative: "Maya, 18, expects interest rates might rise over the next couple of years and wants to hold some bonds without watching their prices tumble. She's choosing between a long-term bond fund and a short-term bond fund of similar quality.",
        details: [
          "Rising rates push existing bond prices down.",
          "Long-term bonds fall harder than short-term ones when rates rise.",
          "The short-term fund pays a bit less but stays steadier.",
          "Maya wants to limit price damage if rates climb."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bonds6-aq1",
          question: "Which fund better limits Maya's interest rate risk?",
          options: [
              "The long-term fund, since it swings the most in every case",
              "The short-term bond fund, which moves less on rate changes",
              "Neither - bond funds ignore interest rates in every case",
              "The long-term fund, because rates never rise in every case"
            ],
            correctAnswer: 1,
          explanation: "Short-term bonds mature soon and barely move when rates rise, so the short-term fund shields Maya from the sharp price drops long bonds suffer."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Bond prices and interest rates move in opposite directions.",
          "Rising rates make old, lower-paying bonds worth less.",
          "Interest rate risk exists even with zero default risk.",
          "Longer bonds swing far more than short-term bonds on rate changes.",
          "Held to maturity, rate swings don't cost you your face value."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bonds6-mastery1",
            question: "Bond prices and interest rates move…",
            options: [
              "In the same direction",
              "In opposite directions",
              "Completely at random",
              "Only when a bond defaults"
            ],
            correctAnswer: 1,
            explanation: "They seesaw: when rates rise, prices fall, and when rates fall, prices rise, because coupons are fixed."
          },
          {
            id: "bonds6-mastery2",
            question: "Why does a 3% bond drop in price when new bonds pay 5%?",
            options: [
              "The borrower defaulted in every case for all investors",
              "Buyers won't pay full price for a lower yield",
              "The coupon suddenly rose to 5% in every case",
              "The government banned old bonds in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "Nobody pays full price for 3% when 5% is available, so the old bond's price falls until its yield matches the new market rate."
          },
          {
            id: "bonds6-mastery3",
            question: "Interest rate risk affects a bond even when the borrower…",
            options: [
              "Is likely to default soon",
              "Has zero chance of default",
              "Pays no coupon ever in every case",
              "Is a foreign company"
            ],
            correctAnswer: 1,
            explanation: "Even an ultra-safe Treasury's price swings with rates, so rate risk exists independent of default risk."
          },
          {
            id: "bonds6-mastery4",
            question: "A long-term bond's price swings more than a short-term one because…",
            options: [
              "It pays no interest at all in every case",
              "It locks in its coupon for many more years",
              "It is always rated junk in every case",
              "It matures next month in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "Being locked into an old coupon for decades makes a long bond far more sensitive to rate changes than a bond maturing soon."
          },
          {
            id: "bonds6-mastery5",
            question: "If you fear rising rates, a defensive move is to favor…",
            options: [
              "The longest bonds available",
              "Shorter-term bonds",
              "Only junk bonds",
              "Bonds paying 0%"
            ],
            correctAnswer: 1,
            explanation: "Shorter bonds move less when rates rise and mature soon, letting you reinvest at the new higher rates."
          },
          {
            id: "bonds6-mastery6",
            question: "If you hold a bond to maturity, rate swings…",
            options: [
              "Wipe out your principal in every case for all investors",
              "Don't cost you - you still get full face value",
              "Double your coupon payments in every case for all investors",
              "Force you to sell early in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "Price swings only matter if you sell early; held to maturity, you collect your coupons and full face value regardless of rates."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // bonds-7: Duration
  // ─────────────────────────────────────────────
  {
    lessonId: "bonds-7",
    sections: [
      {
        type: "concept",
        title: "A Number for Rate Sensitivity",
        paragraphs: [
          "The last lesson showed that longer bonds swing more when rates change. 'Duration' is the number that measures exactly how much. Duration is expressed in years and tells you roughly how sensitive a bond's price is to interest rate changes. The handy rule: for every 1% change in interest rates, a bond's price moves about its duration in percent, in the opposite direction. A bond with a duration of 5 will drop about 5% if rates rise 1%, and rise about 5% if rates fall 1%. Duration turns 'long bonds are riskier' into a precise, usable figure.",
          "Duration is related to maturity but not identical to it. A bond's maturity is simply when you get your principal back; duration weighs in the coupons you receive along the way, which slightly shortens the effective sensitivity. Still, the pattern holds: longer-maturity bonds have higher duration and thus more price risk. A 30-year Treasury might have a duration around 17, while a 2-year note has a duration near 2. So if rates jump 1%, the long bond could lose about 17% of its price while the short note barely moves - the same insight as before, now measurable.",
          "This makes duration a practical planning tool. Bond funds publish their average duration, so you can gauge how much a fund might swing before you buy it. A fund with duration 2 is sleepy and stable; a fund with duration 15 can lurch dramatically when rates move. If you can't stomach big price swings, you pick low-duration bonds or funds. If you're comfortable with volatility and think rates will fall, higher duration offers bigger potential gains. Duration lets you dial your interest rate risk up or down on purpose instead of by accident."
        ],
        bullets: [
          "Duration measures how sensitive a bond's price is to rate changes.",
          "Rule: price moves about its duration in percent per 1% rate change.",
          "A duration of 5 means roughly a 5% price drop if rates rise 1%.",
          "Longer-maturity bonds have higher duration and more price risk.",
          "Bond funds publish average duration so you can gauge their swings."
        ],
        realWorldExample: "A bond fund lists a duration of 6. When rates rose about 1%, the fund fell roughly 6% in price - almost exactly what duration predicted. An investor who checked that number beforehand wasn't surprised, while one who ignored it panicked at the drop."
      },
      {
        type: "concept",
        title: "Using Duration to Match Your Goals",
        paragraphs: [
          "The smartest use of duration is matching it to when you'll need the money. If you need your money in two years, holding a fund with duration 15 is risky - a rate spike could slash its value right before you cash out. A short-duration fund fits that goal far better. For money you won't touch for decades, higher duration can be fine, because you can wait out price swings and even benefit if rates fall. Aligning a bond's duration with your time horizon is one of the cleanest ways to control bond risk.",
          "Duration also helps you build a balanced bond position. Some investors 'ladder' bonds across different durations, or blend short and long funds, so they're not fully exposed to one rate scenario. A common conservative choice is short-to-intermediate duration - say 2 to 6 - which offers decent income and a stock-crash cushion without the wild swings of very long bonds. When you hear a fund is 'long duration,' read that as 'expect big moves when rates change,' and decide if that fits your stomach and your timeline before buying in.",
          "One caution: don't confuse low duration with no risk. A short-duration fund still has some rate sensitivity, can still lose a little, and still carries whatever default risk its bonds hold. Duration only measures interest rate sensitivity, not credit quality - a junk bond fund can have low duration yet high default risk. Use duration alongside ratings and yield, not instead of them. Together, these three - duration for rate risk, ratings for default risk, yield for return - give you a clear, quantified picture of what any bond or bond fund is really offering."
        ],
        bullets: [
          "Match a bond's duration to when you'll need the money.",
          "Short duration suits near-term goals; long duration suits distant ones.",
          "Short-to-intermediate duration (2 to 6) is a common conservative choice.",
          "Low duration means low rate risk, not zero risk overall.",
          "Use duration with ratings and yield for a full risk picture."
        ],
        realWorldExample: "A student needing tuition money in two years wisely picks a short-duration bond fund. When rates spiked, it barely moved, so his money was there when he needed it - unlike a long-duration fund that could have dropped sharply right at tuition time."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bonds7-mc1",
            question: "What does 'duration' measure?",
            options: [
              "A bond's default risk in every case for all investors",
              "How sensitive a bond's price is to rate changes",
              "The tax owed on the coupon in every case",
              "The company's credit rating in every case for all investors"
            ],
            correctAnswer: 1,
            explanation: "Duration, expressed in years, gauges how much a bond's price will move when interest rates change - its rate sensitivity."
          },
          {
            id: "bonds7-mc2",
            question: "If a bond has a duration of 5 and rates rise 1%, its price will roughly…",
            options: [
              "Rise about 5%",
              "Fall about 5%",
              "Stay unchanged in every case",
              "Fall about 50%"
            ],
            correctAnswer: 1,
            explanation: "Price moves about its duration in percent, opposite to rates, so a duration of 5 means roughly a 5% price drop when rates rise 1%."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Needs Money in Two Years",
        narrative: "Leo, 18, is saving for college costs due in about two years and wants to earn a little interest safely. He's comparing a bond fund with a duration of 2 and another with a duration of 15, and remembers that rates could move.",
        details: [
          "Duration of 2 means a small price swing when rates change.",
          "Duration of 15 means a large price swing when rates change.",
          "Leo needs his money in about two years.",
          "A big price drop right before he cashes out would hurt."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bonds7-aq1",
          question: "Which fund fits Leo's two-year timeline best?",
          options: [
              "The duration-15 fund, since it swings the most",
              "The duration-2 fund, which stays much steadier",
              "Neither - duration doesn't affect price",
              "The duration-15 fund, because rates can't change"
            ],
            correctAnswer: 1,
          explanation: "Low duration means small price swings, so the duration-2 fund protects Leo from a rate spike wiping out value right when he needs the money."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Duration measures a bond's price sensitivity to interest rate changes.",
          "Price moves about its duration in percent per 1% rate change.",
          "Longer-maturity bonds have higher duration and more price risk.",
          "Match duration to your timeline: short for near-term, long for distant.",
          "Duration covers rate risk only - pair it with ratings and yield."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bonds7-mastery1",
            question: "Duration is a measure of a bond's…",
            options: [
              "Default probability in every case",
              "Sensitivity to interest rate changes",
              "Tax bracket in every case",
              "Coupon payment date in every case"
            ],
            correctAnswer: 1,
            explanation: "Duration, in years, tells you how much a bond's price will move when interest rates change."
          },
          {
            id: "bonds7-mastery2",
            question: "A bond with duration 8 will fall about how much if rates rise 1%?",
            options: [
              "About 0.8%",
              "About 8%",
              "About 80%",
              "It won't change"
            ],
            correctAnswer: 1,
            explanation: "The rule of thumb: price moves roughly its duration in percent, so a duration of 8 means about an 8% drop per 1% rate rise."
          },
          {
            id: "bonds7-mastery3",
            question: "Longer-maturity bonds tend to have…",
            options: [
              "Lower duration and less rate risk",
              "Higher duration and more rate risk",
              "No duration at all in every case",
              "Duration equal to their coupon"
            ],
            correctAnswer: 1,
            explanation: "The longer until you get principal back, the higher the duration and the more the price swings when rates move."
          },
          {
            id: "bonds7-mastery4",
            question: "For money needed in two years, you should choose a fund with…",
            options: [
              "The highest duration available",
              "A low duration",
              "No stated duration",
              "Duration over 20"
            ],
            correctAnswer: 1,
            explanation: "Low duration means small price swings, protecting near-term money from a rate spike right before you need it."
          },
          {
            id: "bonds7-mastery5",
            question: "Duration does NOT tell you about a bond's…",
            options: [
              "Interest rate sensitivity",
              "Default (credit) risk",
              "Response to a 1% rate rise",
              "Price swing potential"
            ],
            correctAnswer: 1,
            explanation: "Duration measures only rate sensitivity; default risk is shown by credit ratings, so you need both for a full picture."
          },
          {
            id: "bonds7-mastery6",
            question: "A conservative investor who dislikes big swings would prefer…",
            options: [
              "A very high duration",
              "A short-to-intermediate duration",
              "The longest bond possible",
              "A duration of exactly 30"
            ],
            correctAnswer: 1,
            explanation: "Short-to-intermediate duration offers decent income and a crash cushion without the wild price swings of very long bonds."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // bonds-8: Bond Funds
  // ─────────────────────────────────────────────
  {
    lessonId: "bonds-8",
    sections: [
      {
        type: "concept",
        title: "Hundreds of Bonds in One Purchase",
        paragraphs: [
          "Buying individual bonds is clunky: many cost $1,000 or more each, picking safe ones takes research, and building a diversified set could take tens of thousands of dollars. A bond fund solves all of this by pooling investors' money to hold hundreds or thousands of bonds at once. Buy one share and you instantly own a slice of that whole basket. For a teen with $100, that's the difference between owning one risky bond and owning a diversified sliver of a huge pile - spreading default risk so thin that any single borrower's failure barely matters.",
          "Bond funds come in two main wrappers, echoing earlier lessons: bond mutual funds, priced once daily at NAV, and bond ETFs, which trade live on an exchange all day. Both hold baskets of bonds and pay out the interest those bonds collect, usually as monthly income. They also come in flavors matched to what you learned: Treasury funds for maximum safety, corporate funds for more income, short-duration funds for stability, long-duration funds for bigger swings, even total-bond funds that blend everything. You pick the fund whose risk and role fit your goal, and it handles the individual bonds for you.",
          "The big convenience is that a fund manages maturity for you automatically. A single bond ends on one date; a bond fund constantly reinvests as its bonds mature, keeping a rolling portfolio without you tracking dates. It also handles reinvesting coupons and maintaining diversification. This makes bond funds the standard way ordinary investors get fixed-income exposure - inside 401(k)s, target-date funds, and simple portfolios alike. For most beginners, a broad, low-cost bond fund is far more practical than assembling individual bonds by hand."
        ],
        bullets: [
          "A bond fund pools money to hold hundreds or thousands of bonds.",
          "One share gives instant diversification across many borrowers.",
          "Comes as mutual funds (daily NAV) or ETFs (live trading), paying monthly income.",
          "Flavors match your goals: Treasury, corporate, short or long duration.",
          "The fund manages maturity and reinvestment automatically for you."
        ],
        realWorldExample: "With $50, a teen can't buy a single $1,000 corporate bond, but she can buy shares of a broad bond fund holding thousands of bonds. If one borrower defaults, it's a tiny fraction of the fund - her diversified sliver barely feels it."
      },
      {
        type: "concept",
        title: "The Trade-Offs of Funds Versus Single Bonds",
        paragraphs: [
          "Bond funds differ from single bonds in one key way: they never 'mature.' If you buy one bond and hold it, you're promised your exact face value back on a set date, regardless of price swings along the way. A bond fund has no such date - it's an ever-rolling basket whose share price floats with the market. That means if interest rates rise, your fund's share price can drop and stay down for a while, whereas a single held-to-maturity bond would still pay you full face value. Funds trade that guaranteed payback for diversification and convenience.",
          "This is why understanding the earlier risks matters when choosing a fund. A bond fund's share price reflects its holdings' current value, so it carries interest rate risk based on its duration and credit risk based on its bonds' ratings. A long-duration fund will swing hard when rates move; a junk-bond fund can drop in a recession. The fund's published duration and average credit quality tell you what you're getting. Reading those two numbers, plus the expense ratio, lets you pick a bond fund that actually matches the safety and income you want.",
          "Cost still counts, just like with stock funds. Bond funds charge expense ratios, and since bond returns are often modest, a high fee eats a bigger slice of your gains. A broad bond index fund charging 0.05% keeps far more in your pocket than an active bond fund charging 0.75%. For most beginners, the sensible core is a low-cost, high-quality bond fund - short-to-intermediate duration, investment-grade - held as the steadying counterweight to stock funds. It won't excite you, but it delivers income, diversification, and a cushion with almost no effort on your part."
        ],
        bullets: [
          "Bond funds never mature - their share price floats with the market.",
          "A single held-to-maturity bond guarantees face value; a fund does not.",
          "A fund's duration and credit quality reveal its rate and default risk.",
          "Low expense ratios matter more when returns are modest.",
          "A low-cost, high-quality bond fund is a sensible steadying core."
        ],
        realWorldExample: "In 2022's rate spike, bond fund share prices fell and stayed down for a while, frustrating holders - yet someone with a single Treasury held to maturity still collected full face value on schedule, showing the trade-off funds make for diversification."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bonds8-mc1",
            question: "A key benefit of a bond fund over a single bond is…",
            options: [
              "It guarantees your exact money back on a set date",
              "It spreads your money across many bonds for diversification",
              "It never changes in price in every case",
              "It avoids all interest rate risk in every case"
            ],
            correctAnswer: 1,
            explanation: "A bond fund holds hundreds or thousands of bonds, so one borrower's default barely dents you - instant diversification a single bond can't offer."
          },
          {
            id: "bonds8-mc2",
            question: "Unlike a single bond held to maturity, a bond fund…",
            options: [
              "Always returns exact face value on a date in every case",
              "Never matures; its share price floats with the market",
              "Pays no interest at all in every case",
              "Is completely free of all risk in every case"
            ],
            correctAnswer: 1,
            explanation: "A fund is an ever-rolling basket with no maturity date, so its share price moves with the market rather than guaranteeing a fixed payback."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aria Wants Simple Fixed Income",
        narrative: "Aria, 18, has $200 and wants steady bond exposure as a cushion for her stock-heavy portfolio, without researching individual bonds. She's comparing a low-cost, investment-grade, short-to-intermediate bond index fund at 0.05% and a high-yield junk bond fund at 0.70%.",
        details: [
          "$200 can't buy a diversified set of individual bonds, but it can buy fund shares.",
          "The index fund is investment grade with modest duration for stability.",
          "The junk fund holds shaky borrowers that can drop in a downturn.",
          "The junk fund's 0.70% fee eats a bigger slice of modest bond returns."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bonds8-aq1",
          question: "Which fund best fits Aria's goal of a steady cushion?",
          options: [
              "The junk fund, since its fee proves it's higher quality",
              "The low-cost, investment-grade, short-to-intermediate bond fund",
              "Neither - she should buy one individual junk bond",
              "The junk fund, because it can never lose value"
            ],
            correctAnswer: 1,
          explanation: "A cheap, investment-grade, modest-duration fund gives diversification, income, and a steady cushion, while the junk fund adds risk and a fee that eats returns."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A bond fund pools money to hold hundreds or thousands of bonds.",
          "It gives instant diversification and monthly income in one share.",
          "Unlike a single bond, a fund never matures - its price floats.",
          "A fund's duration and credit quality reveal its rate and default risk.",
          "Favor low-cost, high-quality bond funds as a steadying core."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bonds8-mastery1",
            question: "A bond fund works by…",
            options: [
              "Lending all your money to one company",
              "Pooling money to hold many bonds at once",
              "Holding only a single Treasury bond in every case",
              "Guaranteeing a fixed 10% return in every case"
            ],
            correctAnswer: 1,
            explanation: "It combines investors' money to own hundreds or thousands of bonds, giving diversification a single bond can't."
          },
          {
            id: "bonds8-mastery2",
            question: "A major difference between a bond fund and a single bond is that a fund…",
            options: [
              "Always returns exact face value in every case",
              "Never matures; its price floats with the market",
              "Pays no coupons ever in every case for all investors",
              "Carries no credit risk in every case"
            ],
            correctAnswer: 1,
            explanation: "A fund is an ever-rolling basket with no maturity date, so its share price moves rather than guaranteeing a set payback."
          },
          {
            id: "bonds8-mastery3",
            question: "A bond fund's interest rate risk is signaled by its…",
            options: [
              "Marketing name",
              "Duration",
              "Number of investors",
              "Founding year"
            ],
            correctAnswer: 1,
            explanation: "A fund's published duration shows how much its share price will swing when interest rates change."
          },
          {
            id: "bonds8-mastery4",
            question: "Why does a high expense ratio hurt bond funds especially?",
            options: [
              "Bond returns are often modest, so fees take a bigger slice",
              "Bonds are illegal to hold in funds in every case",
              "Fees are charged twice on bonds in every case for all investors",
              "Bond funds never pay any interest in every case for all investors"
            ],
            correctAnswer: 0,
            explanation: "Since bond returns tend to be lower than stocks, a big fee eats a larger share of the gains, making low-cost funds especially important."
          },
          {
            id: "bonds8-mastery5",
            question: "Bond funds handle maturity by…",
            options: [
              "Ending on one fixed date",
              "Continuously reinvesting as bonds mature",
              "Never buying new bonds",
              "Paying out all principal at once"
            ],
            correctAnswer: 1,
            explanation: "As its bonds mature, the fund reinvests automatically, keeping a rolling portfolio without you tracking dates."
          },
          {
            id: "bonds8-mastery6",
            question: "A sensible steadying core for a beginner is a…",
            options: [
              "High-yield junk bond fund with a big fee",
              "Low-cost, high-quality bond fund",
              "Single long-duration bond",
              "Fund holding only one borrower"
            ],
            correctAnswer: 1,
            explanation: "A cheap, investment-grade, modest-duration fund delivers income, diversification, and a stock-crash cushion with little effort."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // bonds-9: Fixed Income Role
  // ─────────────────────────────────────────────
  {
    lessonId: "bonds-9",
    sections: [
      {
        type: "concept",
        title: "Why a Portfolio Wants Bonds At All",
        paragraphs: [
          "If stocks grow faster over the long run, why hold bonds at all? Because bonds do jobs stocks can't. Their first role is stability: bonds swing far less than stocks and often hold up or rise when stocks crash, cushioning the scariest drops. In 2008, when stocks fell about 37%, high-quality bonds barely moved or gained, softening the blow for anyone who held both. That cushion isn't just about money - it's about behavior. A steadier portfolio helps you avoid panic-selling at the bottom, which is where investors do the most self-inflicted damage.",
          "Bonds' second role is income. They pay regular, predictable interest, which matters enormously for people who need cash flow - like retirees living off their savings. A stock might pay a small dividend or none, but a bond delivers scheduled coupons you can count on. Even for a young investor, that reliable income can be reinvested to compound or used to rebalance. Bonds turn a portfolio from a pure growth bet into something that also produces a steady stream, giving you options and resilience when life doesn't cooperate with the market.",
          "The third role is diversification - bonds and stocks often don't move in lockstep. When one zigs, the other frequently zags, so blending them smooths the overall ride without giving up all growth. This is the core reason for asset allocation: a mix of stocks and bonds usually delivers a better balance of return and risk than either alone. Bonds aren't there to beat stocks; they're there to make the whole portfolio steadier, more resilient, and easier to hold through the inevitable storms."
        ],
        bullets: [
          "Bonds provide stability, cushioning portfolios when stocks crash.",
          "A steadier portfolio helps you avoid panic-selling at the bottom.",
          "Bonds deliver predictable income through regular coupon payments.",
          "Stocks and bonds often don't move together, smoothing the ride.",
          "Bonds exist to balance risk and return, not to outgrow stocks."
        ],
        realWorldExample: "In 2008 a 100% stock investor watched $10,000 shrink to about $6,300 and many panic-sold. Someone with a 60/40 stock/bond mix fell far less - to roughly $7,500 - because bonds held firm, and that calmer ride made it easier to stay invested for the recovery."
      },
      {
        type: "concept",
        title: "How Much, and When It Shifts",
        paragraphs: [
          "How much of your portfolio belongs in bonds depends mainly on your time horizon and risk tolerance. A teen investing for retirement 40 years away can hold very few bonds - maybe 10% or even none - because decades of time let stocks recover from any crash, and growth matters most. The old '110 minus your age' rule captures this: at 18, roughly 8% bonds; at 60, roughly 50%. As a goal approaches, you gradually shift from stocks toward bonds, protecting money you'll soon need from a badly timed crash. Bonds' share of your mix rises as your timeline shrinks.",
          "The goal itself also sets the bond share, not just your age. Money you'll need in a year or two should be mostly bonds or cash, regardless of how young you are, because you can't risk a crash right before spending it. Money for the distant future can be almost all stocks. Many people run several buckets: an aggressive, stock-heavy retirement bucket and a safe, bond-heavy bucket for near-term goals. Matching each bucket's bond allocation to its timeline is smarter than applying one blanket percentage to everything you own.",
          "The practical way to fill the bond role is simple and cheap: a low-cost, high-quality bond fund, usually short-to-intermediate duration and investment grade, sized to your allocation. You don't need to pick individual bonds or chase the highest yield. As your timeline shortens - nearing a house purchase or retirement - you dial the bond percentage up. The mindset that ties it all together: stocks are your growth engine, bonds are your shock absorber, and the right blend of the two, adjusted over time, is what carries a portfolio safely from a teenager's first investment to a comfortable retirement."
        ],
        bullets: [
          "Bond share depends on time horizon and risk tolerance.",
          "Young investors hold few bonds; the share rises as goals near.",
          "'110 minus your age' is a rough starting point for stock percentage.",
          "Near-term money belongs mostly in bonds or cash, whatever your age.",
          "Fill the role with a low-cost, high-quality bond fund sized to your mix."
        ],
        realWorldExample: "Jordan, 18, saving for retirement, holds about 90% stocks and 10% bonds for maximum growth. His grandmother, retired at 70, holds far more bonds for stable income and safety. Same family, very different bond shares - each matched to their timeline and need for stability."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bonds9-mc1",
            question: "One key role bonds play in a portfolio is to…",
            options: [
              "Grow faster than stocks over decades",
              "Provide stability and cushion stock crashes",
              "Guarantee you beat inflation every year",
              "Eliminate every kind of risk in every case"
            ],
            correctAnswer: 1,
            explanation: "Bonds swing less and often hold up when stocks crash, cushioning the portfolio and helping investors avoid panic-selling at the bottom."
          },
          {
            id: "bonds9-mc2",
            question: "As a financial goal gets closer, your bond allocation should generally…",
            options: [
              "Decrease toward zero in every case",
              "Increase to protect the money",
              "Stay exactly the same forever",
              "Be replaced entirely by single stocks"
            ],
            correctAnswer: 1,
            explanation: "Nearing a goal, you shift from stocks toward bonds so a badly timed crash can't wreck money you'll soon need."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sofia Sets Her Bond Share",
        narrative: "Sofia, 18, is building a portfolio for retirement roughly 45 years away and wants to know how much to put in bonds. Her uncle, who retires in three years, is asking the same question for his own savings.",
        details: [
          "Sofia has decades for stocks to recover from any crash.",
          "Her uncle needs stable income and safety very soon.",
          "'110 minus your age' suggests Sofia hold few bonds.",
          "Money needed soon belongs mostly in bonds or cash."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bonds9-aq1",
          question: "How should Sofia and her uncle differ in bond allocation?",
          options: [
              "Both should hold mostly bonds to stay safe in every case for all investors",
              "Sofia holds few bonds for growth; her uncle holds many for stability",
              "Both should hold zero bonds and only stocks in every case",
              "Sofia should hold more bonds than her uncle in every case"
            ],
            correctAnswer: 1,
          explanation: "Sofia's long horizon favors growth with few bonds, while her uncle's near-term need for income and safety calls for a much larger bond share."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Bonds provide stability, income, and diversification, not maximum growth.",
          "They cushion stock crashes and help you avoid panic-selling.",
          "Bond share depends on your time horizon and risk tolerance.",
          "Young investors hold few bonds; the share rises as goals near.",
          "Fill the role with a low-cost, high-quality bond fund sized to your mix."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bonds9-mastery1",
            question: "Bonds are held in a portfolio mainly to…",
            options: [
              "Outgrow stocks over the long run",
              "Add stability, income, and diversification",
              "Guarantee you double your money",
              "Remove all possible risk"
            ],
            correctAnswer: 1,
            explanation: "Bonds aren't there to beat stocks; they steady the portfolio, pay reliable income, and diversify against stock swings."
          },
          {
            id: "bonds9-mastery2",
            question: "During a stock crash, high-quality bonds typically…",
            options: [
              "Fall harder than stocks in every case",
              "Hold up or rise, cushioning the loss",
              "Become worthless overnight in every case for all investors",
              "Stop paying any interest in every case"
            ],
            correctAnswer: 1,
            explanation: "Bonds swing less and often gain when stocks crash, softening the blow and making the portfolio easier to hold."
          },
          {
            id: "bonds9-mastery3",
            question: "A young investor with a 40-year horizon should usually hold…",
            options: [
              "Mostly bonds for safety in every case",
              "Few bonds, mostly stocks for growth",
              "Only cash to avoid all risk",
              "Equal halves regardless of age"
            ],
            correctAnswer: 1,
            explanation: "Decades of time let stocks recover from crashes, so a young investor leans heavily toward stocks with only a small bond slice."
          },
          {
            id: "bonds9-mastery4",
            question: "Money you'll need in a year or two should be held mostly in…",
            options: [
              "Aggressive growth stocks",
              "Bonds or cash",
              "A single hot sector fund",
              "Junk bonds for high yield"
            ],
            correctAnswer: 1,
            explanation: "Near-term money can't risk a crash right before you spend it, so it belongs mostly in bonds or cash regardless of your age."
          },
          {
            id: "bonds9-mastery5",
            question: "The '110 minus your age' rule gives a rough estimate of your…",
            options: [
              "Bond fund's expense ratio in every case",
              "Percentage to hold in stocks",
              "Total retirement savings goal",
              "Bond's credit rating in every case"
            ],
            correctAnswer: 1,
            explanation: "The rule suggests roughly what percent to keep in stocks, with the rest in bonds, shifting toward bonds as you age."
          },
          {
            id: "bonds9-mastery6",
            question: "The simplest way to fill the bond role in a portfolio is…",
            options: [
              "Picking single high-yield junk bonds in every case for all investors",
              "A low-cost, high-quality bond fund sized to your mix",
              "Holding only one 30-year bond in every case",
              "Chasing the highest yield available in every case"
            ],
            correctAnswer: 1,
            explanation: "A cheap, investment-grade bond fund of modest duration delivers stability, income, and diversification without picking individual bonds."
          }
        ]
      }
    ]
  },
]
