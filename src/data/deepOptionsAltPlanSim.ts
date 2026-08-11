import { StructuredLessonContent } from "@/types"

// Deepened lesson content (Mortgages-depth rebuild) for: options, alternatives, financial-planning, simulations
// Each entry replaces the thin auto-generated version for its lessonId.
export const deepOptionsAltPlanSim: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // options-1: Calls vs Puts
  // ─────────────────────────────────────────────
  {
    lessonId: "options-1",
    sections: [
      {
        type: "concept",
        title: "A Contract, Not a Share",
        paragraphs: [
          "An option is a contract that gives you the right - but not the obligation - to buy or sell 100 shares of a stock at a set price before a deadline. That single word, 'right,' is the whole idea. When you own a share of Apple, you own a slice of the company. When you own an option, you own a promise about a future trade. You pay a small fee today for the choice to act later, and you can walk away if the trade no longer makes sense. That flexibility is powerful, and it is also what makes options risky if you misuse them.",
          "Options come in two flavors: calls and puts. A call gives you the right to buy shares at a fixed price. A put gives you the right to sell shares at a fixed price. Think of a call as betting a stock will rise and a put as betting it will fall. The fixed price is called the strike price, and the deadline is called expiration. Because one contract controls 100 shares, small price moves get magnified - a stock rising a few dollars can double the value of a cheap call, which is exactly why beginners get burned chasing quick gains.",
          "Here is the part that surprises people: you rarely buy the actual shares. Most traders buy an option and later sell that same option to someone else for a profit or loss, never touching the underlying stock. The contract itself has a price that moves up and down all day. So options are less about owning companies and more about making precise, time-limited bets on where a price is headed. That precision is the appeal, but the clock is always ticking - and a bet that is 'right' too late still loses."
        ],
        bullets: [
          "An option is the right, not the obligation, to buy or sell 100 shares at a set price.",
          "A call is the right to buy; a put is the right to sell.",
          "The strike price is the fixed price; expiration is the deadline to act.",
          "One contract controls 100 shares, so gains and losses are magnified.",
          "Most traders resell the option itself rather than buying the shares."
        ],
        realWorldExample: "Imagine a concert ticket that lets you buy a $200 seat for $150 anytime this month. That coupon is like a call option: if the seat's price jumps to $250, your $150 right is worth a lot. If the concert flops and seats sell for $100, you just skip the coupon - you're only out what you paid for it."
      },
      {
        type: "concept",
        title: "The Premium and Who Wins",
        paragraphs: [
          "The price you pay for an option is called the premium. It is quoted per share, so a premium of $2 actually costs $200 because the contract covers 100 shares. For a buyer, the premium is the most you can ever lose - if the bet goes wrong, the option simply expires worthless and you lose only what you paid. That capped loss sounds safe, but remember: options expire, so it is very common to lose 100% of the premium. Many contracts end up worth nothing, which is a risk unlike simply holding a stock that can recover over years.",
          "Every option has two sides. The buyer pays the premium; the seller (also called the writer) collects it. The seller takes on the obligation to complete the trade if the buyer chooses to exercise. Sellers hope the option expires worthless so they keep the premium as pure profit. But selling can be dangerous: if you sell a call without owning the shares and the stock soars, your losses can be huge. This is why beginners are told to start by buying options, where the loss is capped, not selling them, where the loss can spiral.",
          "So who wins? A call buyer profits when the stock climbs well above the strike, enough to cover the premium. A put buyer profits when the stock falls well below the strike. If the stock barely moves, the buyer usually loses the premium and the seller wins. Time works against buyers and for sellers, because every passing day drains a little value from the option. Understanding these two sides - and that the odds quietly favor sellers - is the foundation for everything else in options, and a reminder to treat them with real caution."
        ],
        bullets: [
          "The premium is the option's price; quoted per share, it costs 100 times that amount.",
          "A buyer's maximum loss is the premium paid - but losing all of it is common.",
          "The seller (writer) collects the premium and takes on the obligation.",
          "Selling options can create very large losses if the stock moves against you.",
          "Time decay quietly hurts buyers and helps sellers each day."
        ],
        realWorldExample: "You buy one call with a $3 premium: that's $300 out of pocket, and $300 is all you can lose. The trader who sold it to you pockets your $300 and hopes the stock stays flat so the option dies worthless. If the stock stays put, they keep your $300 and you get nothing back."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "options1-mc1",
            question: "What does a call option give you the right to do?",
            options: [
              "Sell shares at a fixed strike price",
              "Buy shares at a fixed strike price",
              "Collect a company's quarterly dividends for free forever",
              "Force a company to buy back stock"
            ],
            correctAnswer: 1,
            explanation: "A call gives you the right to buy shares at the strike price. A put is the one that lets you sell. Calls are generally a bet that the price will rise."
          },
          {
            id: "options1-mc2",
            question: "For an option buyer, what is the maximum possible loss?",
            options: [
              "The full value of 100 shares of stock",
              "An unlimited amount as prices move",
              "The premium they paid for the option",
              "Twice the strike price of the contract"
            ],
            correctAnswer: 2,
            explanation: "A buyer can lose at most the premium they paid. If the bet fails, the option expires worthless and no more money is owed - though losing the entire premium is common."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devon Weighs a Call vs a Put",
        narrative: "Devon, 17, is paper-trading in the InvestiPlay simulator. A stock trades at $50. He thinks earnings news next week could swing it hard, but he isn't sure which way. He looks at a call and a put, each with a $50 strike and a $2 premium, and thinks through what each bet means before risking anything.",
        details: [
          "Each contract costs $200 (a $2 premium times 100 shares), and that's the most he can lose on either.",
          "The call profits if the stock climbs above $52 - the $50 strike plus the $2 premium he paid.",
          "The put profits if the stock drops below $48 - the $50 strike minus the $2 premium.",
          "If the stock barely moves and sits near $50 at expiration, both options lose most or all of their value."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "options1-aq1",
          question: "Devon buys the $50 call for a $2 premium. At expiration the stock is $53. Roughly what happened?",
          options: [
            "He lost the full $200 he paid",
            "He made a small profit above breakeven",
            "He now owes the seller extra money",
            "The option's strike price increased by three dollars automatically"
          ],
          correctAnswer: 1,
          explanation: "His breakeven is $52 (strike plus premium). At $53 the call is worth about $3, so after the $2 cost he nets roughly $1 per share, a small profit. He never owes more than the premium, and strikes don't change."
        }
      },
      {
        type: "recap",
        takeaways: [
          "An option is the right, not the obligation, to buy or sell 100 shares at a set strike price.",
          "Calls bet a price will rise; puts bet a price will fall.",
          "The premium is the option's cost and the buyer's maximum loss - and it's often lost entirely.",
          "Every option has a buyer who pays and a seller who collects and takes on the obligation.",
          "Time decay works against buyers, so being right too late still loses money."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "options1-mastery1",
            question: "Which statement best describes the difference between a call and a put?",
            options: [
              "A call bets the price rises; a put bets it falls",
              "A call is safer and a put is always risky",
              "A call never expires but a put closes out after thirty days",
              "A call pays dividends and a put does not, plus voting rights"
            ],
            correctAnswer: 0,
            explanation: "A call is the right to buy (a bet on a rise); a put is the right to sell (a bet on a fall). Both expire, both carry risk, and neither pays dividends."
          },
          {
            id: "options1-mastery2",
            question: "A premium is quoted as $4. What does one contract actually cost?",
            options: [
              "Exactly $4 total",
              "$40 total",
              "$400 total",
              "$4,000 total"
            ],
            correctAnswer: 2,
            explanation: "Premiums are quoted per share and one contract covers 100 shares, so a $4 premium costs $4 x 100 = $400."
          },
          {
            id: "options1-mastery3",
            question: "Why are beginners usually told to buy options rather than sell them?",
            options: [
              "Buyers earn guaranteed profits each and every single time",
              "A buyer's loss is capped at the premium",
              "Sellers must always buy the shares first",
              "Selling options is completely illegal without a license"
            ],
            correctAnswer: 1,
            explanation: "A buyer can lose only the premium, while a seller can face very large losses if the stock moves against them. Selling isn't illegal and buyers aren't guaranteed profit."
          },
          {
            id: "options1-mastery4",
            question: "The person who sells (writes) an option is hoping that…",
            options: [
              "The stock moves as fast as it possibly can upward",
              "The option expires worthless so they keep the premium",
              "The buyer exercises the contract several weeks early",
              "The strike price rises sharply overnight past a key resistance line"
            ],
            correctAnswer: 1,
            explanation: "Sellers profit most when the option expires worthless, letting them keep the premium free and clear. They generally do not want the buyer to win by exercising."
          },
          {
            id: "options1-mastery5",
            question: "How is owning an option different from owning a share of stock?",
            options: [
              "An option makes you a part-owner of the company",
              "An option is a time-limited right, not ownership",
              "A share expires but an option lasts forever",
              "An option always pays a dividend each quarter"
            ],
            correctAnswer: 1,
            explanation: "A share is ownership in the business; an option is a contract - a time-limited right to trade at a set price. Options expire and pay no dividends."
          },
          {
            id: "options1-mastery6",
            question: "A trader buys a put and the stock rises sharply. What most likely happens?",
            options: [
              "The put suddenly gains a whole lot of value",
              "The put loses value and may expire worthless",
              "The trader is forced to buy shares",
              "The premium is automatically refunded in full within days"
            ],
            correctAnswer: 1,
            explanation: "A put profits when the stock falls, so a rising stock makes it lose value and it can expire worthless. There's no refund, and the buyer is never forced to trade."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // options-2: Strike Price
  // ─────────────────────────────────────────────
  {
    lessonId: "options-2",
    sections: [
      {
        type: "concept",
        title: "The Price That Anchors Every Option",
        paragraphs: [
          "The strike price is the fixed price at which an option lets you buy or sell the stock. It is the anchor of the entire contract. When you buy a $50 call, that $50 is your strike - the price you can buy the shares for, no matter how high the market climbs. When you buy a $50 put, that $50 is the price you can sell for, no matter how low the market falls. Every option lists a strike, and choosing it wisely is one of the most important decisions a trader makes, because it directly controls both the cost and the odds of the bet.",
          "Traders compare the strike to the stock's current price using three terms. An option is 'in the money' when exercising it would make sense right now: a call whose strike is below the stock price, or a put whose strike is above it. It is 'out of the money' when exercising would be pointless: a call struck above the price, or a put struck below it. When strike and price are equal, it is 'at the money.' These labels matter because in-the-money options cost more but are more likely to pay off, while cheap out-of-the-money options are long shots that often expire worthless.",
          "The gap between the strike and the current stock price is called intrinsic value - the real, built-in worth of exercising right now. A $50 call on a $57 stock has $7 of intrinsic value, because you could buy at $50 and instantly be up $7 a share. Out-of-the-money options have zero intrinsic value; whatever they cost is pure hope that the stock moves before expiration. Understanding intrinsic value keeps you honest: it separates the part of an option's price that is real from the part that is just a bet on the future."
        ],
        bullets: [
          "The strike is the fixed price you can buy (call) or sell (put) the stock at.",
          "In the money = exercising helps now; out of the money = it doesn't; at the money = strike equals price.",
          "In-the-money options cost more but are likelier to pay off.",
          "Intrinsic value is the built-in profit of exercising right now.",
          "Out-of-the-money options have zero intrinsic value - their price is pure hope."
        ],
        realWorldExample: "A stock trades at $57. A $50 call is in the money with $7 of intrinsic value - buy at $50, worth $57. A $65 call on that same stock is out of the money: nobody buys at $65 when the market is $57, so its intrinsic value is $0 and it only pays off if the stock climbs above $65."
      },
      {
        type: "concept",
        title: "Choosing a Strike: Cost vs Chance",
        paragraphs: [
          "Picking a strike is a trade-off between cost and probability. Deep in-the-money options are expensive because you are partly paying for value that already exists, but they behave a lot like the stock and are more likely to end profitable. Far out-of-the-money options are cheap because they only pay off if the stock makes a big move, so most of them expire worthless. Beginners are often lured by cheap, far-out strikes that promise huge percentage gains - and lose their entire premium again and again because the required move rarely happens.",
          "The strike also sets your breakeven, the price the stock must reach for you to stop losing money. For a call, breakeven is the strike plus the premium you paid. For a put, it is the strike minus the premium. So a $50 call bought for $3 doesn't profit until the stock passes $53 - the stock has to climb 6% just to break even. This is a trap for newcomers: an option can be 'right' about direction and still lose money because the move wasn't big enough to clear the premium.",
          "Smart traders match the strike to a realistic view of how far and how fast a stock might move. If you expect a small, likely move, an in-the-money strike with a lower breakeven makes sense. If you're taking a long-shot gamble on a huge move, a cheaper out-of-the-money strike fits - but you should expect to lose often. The key discipline is honesty about probability: the cheaper the option looks, the less likely it is to ever pay off, and that is a rule newcomers ignore at their own cost."
        ],
        bullets: [
          "Deep in-the-money strikes cost more but are likelier to profit.",
          "Far out-of-the-money strikes are cheap but usually expire worthless.",
          "Call breakeven = strike + premium; put breakeven = strike - premium.",
          "Being right about direction still loses if the move is too small to clear the premium.",
          "Cheaper-looking options are less likely to pay off - match the strike to a realistic move."
        ],
        realWorldExample: "Two $50 calls on the same stock: an in-the-money $45 call costs $7, and a long-shot $60 call costs $0.50. The $60 call looks like a bargain, but the stock must jump 20% past $60 to profit. Most of the time it dies worthless, while the pricier $45 call needs only a modest rise to pay off."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "options2-mc1",
            question: "A $40 call on a stock trading at $46 is described as…",
            options: [
              "Out of the money",
              "In the money",
              "At the money",
              "Expired and worthless"
            ],
            correctAnswer: 1,
            explanation: "A call is in the money when its strike is below the stock price. Here the $40 strike sits below the $46 price, giving it $6 of intrinsic value."
          },
          {
            id: "options2-mc2",
            question: "You buy a $50 call for a $3 premium. What is your breakeven price?",
            options: [
              "$47 per share",
              "$50 per share",
              "$53 per share",
              "$56 per share"
            ],
            correctAnswer: 2,
            explanation: "A call's breakeven is the strike plus the premium: $50 + $3 = $53. The stock must rise above $53 before you actually profit."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Picks Between Two Strikes",
        narrative: "Priya is simulating a trade on a stock at $100. She expects modest good news and thinks the stock might rise to about $106. She's deciding between a $95 call costing $8 and a $110 call costing $1. Both expire in a month, and she wants the choice that fits her realistic target rather than the one that just looks cheap.",
        details: [
          "The $95 call is in the money with $5 of intrinsic value; its breakeven is $103 (strike plus $8 premium).",
          "The $110 call is out of the money; its breakeven is $111, above her $106 target.",
          "If the stock rises to her expected $106, the $95 call profits but the $110 call still expires worthless.",
          "The cheap $110 call only wins if the stock jumps far past her forecast - a much less likely outcome."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "options2-aq1",
          question: "Given Priya expects the stock to reach about $106, which strike is the smarter choice and why?",
          options: [
            "The $110 call, because it costs a bit less upfront today",
            "The $95 call, because its breakeven fits her target",
            "Neither, since both of their breakevens sit above $106",
            "The $110 call, because cheap options always win"
          ],
          correctAnswer: 1,
          explanation: "The $95 call's $103 breakeven is below her $106 target, so it can profit on the move she expects. The $110 call needs the stock above $111, beyond her forecast, so its low price is a trap."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The strike is the fixed price to buy (call) or sell (put) - the anchor of every option.",
          "In, out, or at the money describes the strike relative to the current stock price.",
          "Intrinsic value is the built-in profit of exercising right now; out-of-money options have none.",
          "Breakeven is strike plus premium for calls, strike minus premium for puts.",
          "Cheaper out-of-the-money strikes are long shots that usually expire worthless."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "options2-mastery1",
            question: "What does the strike price of an option represent?",
            options: [
              "The premium you pay to open the trade",
              "The fixed price to buy or sell the stock",
              "The current live market price of the stock right now",
              "The flat fee the broker charges you per contract traded"
            ],
            correctAnswer: 1,
            explanation: "The strike is the set price at which the option lets you buy (call) or sell (put) the shares, regardless of where the market moves."
          },
          {
            id: "options2-mastery2",
            question: "A $30 put on a stock trading at $25 is…",
            options: [
              "Out of the money with no value",
              "In the money with intrinsic value",
              "At the money exactly on the strike line",
              "Impossible to own or trade on any exchange"
            ],
            correctAnswer: 1,
            explanation: "A put is in the money when its strike is above the stock price. Selling at $30 while the market is $25 gives $5 of intrinsic value."
          },
          {
            id: "options2-mastery3",
            question: "What is intrinsic value?",
            options: [
              "The built-in profit of exercising right now",
              "The total premium a buyer pays to the seller",
              "The number of calendar days left until the expiration",
              "The broker's commission on the trade"
            ],
            correctAnswer: 0,
            explanation: "Intrinsic value is the real, built-in worth of exercising immediately - the gap between strike and stock price. Out-of-the-money options have zero intrinsic value."
          },
          {
            id: "options2-mastery4",
            question: "Why do far out-of-the-money options usually expire worthless?",
            options: [
              "Brokers quietly cancel most of them before expiration day",
              "They need a big move that rarely happens",
              "Their strike price keeps rising each day",
              "They pay small dividends instead of price gains"
            ],
            correctAnswer: 1,
            explanation: "They only pay off if the stock makes a large move past the strike, which is unlikely, so most simply expire worthless. That's why their low price is misleading."
          },
          {
            id: "options2-mastery5",
            question: "A $70 call bought for a $4 premium breaks even at what price?",
            options: [
              "$66 per share",
              "$70 per share",
              "$74 per share",
              "$78 per share"
            ],
            correctAnswer: 2,
            explanation: "Call breakeven is strike plus premium: $70 + $4 = $74. The stock must climb above $74 before the trade turns a real profit."
          },
          {
            id: "options2-mastery6",
            question: "An in-the-money call costs more than an out-of-the-money call because it…",
            options: [
              "Has a longer time until expiration",
              "Already contains real intrinsic value",
              "Is guaranteed by the exchange to profit",
              "Comes with a free share of the stock"
            ],
            correctAnswer: 1,
            explanation: "An in-the-money call already has intrinsic value baked in, so you pay for that real worth. It isn't guaranteed to profit and doesn't include a free share."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // options-3: Expiration
  // ─────────────────────────────────────────────
  {
    lessonId: "options-3",
    sections: [
      {
        type: "concept",
        title: "The Deadline That Defines an Option",
        paragraphs: [
          "Every option has an expiration date - the deadline after which the contract is over and the right disappears. This is what makes options fundamentally different from stocks. A share can sit in your account for decades, but an option is a ticking clock. Once expiration passes, an option that isn't worth exercising simply vanishes, and any premium you paid is gone. This built-in deadline is why options are called 'wasting assets': their value naturally drains away as the clock runs down, even if the stock price never moves at all.",
          "Expirations range from just a day away to more than a year out. Short-dated options are cheap but brutal - there's little time for the stock to move your way, so they behave almost like lottery tickets. Longer-dated options cost more because you're buying time, and time is exactly what a bet needs to work out. The value tied to remaining time is called time value or extrinsic value. It's the part of an option's price that is not intrinsic value - it's the market pricing in the chance the stock moves before the deadline.",
          "The cruel twist is that time value doesn't drain at a steady pace. It decays slowly at first, then faster and faster as expiration nears - a process called time decay. In the final week, an out-of-the-money option can lose value shockingly fast, dropping toward zero even on a calm day. This is why holding a losing option 'hoping it comes back' near expiration is so dangerous: the clock is now your enemy, accelerating the loss. Traders who respect the calendar close positions early rather than watching time devour their premium."
        ],
        bullets: [
          "Expiration is the deadline after which the option's right disappears.",
          "Options are 'wasting assets' - value drains as the deadline approaches.",
          "Time value (extrinsic value) is the price paid for the chance to move before expiration.",
          "Time decay accelerates, hitting hardest in the final days before expiration.",
          "Holding a losing option near expiration is dangerous - the clock speeds up the loss."
        ],
        realWorldExample: "Two $50 calls on the same stock: one expires next week for $0.40, another expires in six months for $4. The weekly option is cheap because it has almost no time to work - if the stock doesn't jump within days, it dies. The six-month option costs more precisely because you're buying time for the bet to pan out."
      },
      {
        type: "concept",
        title: "Exercise, Assignment, and Letting It Expire",
        paragraphs: [
          "At expiration, three things can happen. If the option is out of the money, it expires worthless and the buyer loses the premium. If it's in the money, the buyer can 'exercise' it - actually buying or selling the 100 shares at the strike. And at any point before that, the buyer can simply sell the option to someone else to lock in a gain or loss. In practice, most traders choose that last path: they close the position by selling rather than exercising, because exercising ties up thousands of dollars to buy shares.",
          "When a buyer exercises, the seller gets 'assigned' - they're obligated to complete the trade. A call seller must deliver the shares at the strike; a put seller must buy the shares at the strike. This is where sellers can get hurt: if you sold a call and the stock rocketed, assignment forces you to sell valuable shares at a below-market strike, locking in a real loss. Assignment can even happen a bit early with American-style options, catching careless sellers off guard. It's a core reason selling options demands far more caution than buying them.",
          "The safest habit for beginners is to treat expiration as a hard planning date, not a surprise. Decide in advance what you'll do if the stock moves your way, against you, or nowhere. Many losing options are best closed early to recover a little premium rather than held to zero. And winning options are often best sold before expiration to bank the gain before time decay or a sudden reversal erases it. Respecting the deadline - rather than gambling against the clock - is what separates disciplined traders from those who repeatedly lose their premium."
        ],
        bullets: [
          "At expiration an option is exercised, sold beforehand, or expires worthless.",
          "Most traders close by selling the option rather than exercising it.",
          "Exercising a call means buying shares; exercising a put means selling shares at the strike.",
          "The seller gets assigned and must complete the trade - a key risk of selling.",
          "Plan for expiration in advance; close losers early and bank winners before decay."
        ],
        realWorldExample: "You own a $50 call now worth $6 with two days left. Instead of exercising (which would cost $5,000 to buy 100 shares), you just sell the option for $600 and pocket the gain. If you'd waited and the stock slipped back to $50, time decay could have wiped that $600 out by the deadline."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "options3-mc1",
            question: "Why are options called 'wasting assets'?",
            options: [
              "Their strike price keeps falling daily",
              "Their value drains as expiration nears",
              "They can never be sold before expiring",
              "They always double in value over time"
            ],
            correctAnswer: 1,
            explanation: "Options lose time value as the deadline approaches, so their worth naturally 'wastes' away over time - even if the stock price doesn't change."
          },
          {
            id: "options3-mc2",
            question: "When does time decay hurt an option's value the most?",
            options: [
              "Right after the option is first purchased",
              "Steadily and equally every single day",
              "In the final days before expiration",
              "Only after the option has already expired"
            ],
            correctAnswer: 2,
            explanation: "Time decay accelerates near the end, so an option loses value fastest in its final days. That's what makes holding losers near expiration so risky."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus and the Ticking Clock",
        narrative: "Marcus bought a $30 call for a $2 premium with three weeks to expiration. The stock, then $30, is now $31 with five days left. He's up in theory but the option is only worth about $1.50, less than he paid, and he's trying to understand why time is working against him even though the stock rose.",
        details: [
          "His option gained $1 of intrinsic value as the stock rose from $30 to $31.",
          "But it lost more than $1 of time value as the deadline approached, leaving it below his $2 cost.",
          "With five days left, time decay is now fast, draining value each day the stock sits still.",
          "He can sell now to recover $1.50, or gamble that a bigger move outruns the accelerating decay."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "options3-aq1",
          question: "Why is Marcus's call worth less than he paid even though the stock rose $1?",
          options: [
            "The contract's strike price silently increased on him overnight",
            "Time decay erased more value than the rise added",
            "His broker cancelled part of the contract without warning",
            "Rising stocks always make call options steadily lose value"
          ],
          correctAnswer: 1,
          explanation: "The $1 rise added intrinsic value, but accelerating time decay removed even more time value, leaving the option below its $2 cost. Rising stocks help calls - it's the ticking clock that hurt him here."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Expiration is the deadline after which an option's right disappears.",
          "Time value is the price of the chance to move before the deadline, and it decays over time.",
          "Time decay accelerates, hitting hardest in the final days.",
          "At expiration, options are exercised, sold beforehand, or expire worthless.",
          "Sellers can be assigned and forced to complete the trade - a major risk of selling."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "options3-mastery1",
            question: "What is time value (extrinsic value) in an option's price?",
            options: [
              "The flat broker's fee charged for simply holding it",
              "The value tied to time left to move",
              "The total number of underlying shares in the contract",
              "The dividend the stock will pay soon"
            ],
            correctAnswer: 1,
            explanation: "Time value is the part of the premium reflecting the chance the stock moves before expiration. It shrinks as the deadline nears through time decay."
          },
          {
            id: "options3-mastery2",
            question: "A short-dated option is cheaper than a long-dated one mainly because it…",
            options: [
              "Has less time for the stock to move",
              "Is fully guaranteed to always expire in the money",
              "Controls fewer than 100 shares of underlying stock",
              "Cannot lose more than one single dollar total"
            ],
            correctAnswer: 0,
            explanation: "Less time means less chance for the stock to move your way, so you pay less. Long-dated options cost more because you're buying more time for the bet to work."
          },
          {
            id: "options3-mastery3",
            question: "When an option buyer exercises a call, the seller is…",
            options: [
              "Refunded the entire original premium plus interest",
              "Assigned and must deliver the shares",
              "Allowed to cancel the contract without any penalty",
              "Given a bonus from the exchange"
            ],
            correctAnswer: 1,
            explanation: "Exercising a call assigns the seller, who must sell 100 shares at the strike. This is a core risk of selling calls when the stock has climbed."
          },
          {
            id: "options3-mastery4",
            question: "Why do most traders sell an option rather than exercise it?",
            options: [
              "Exercising is strictly against the main exchange rules",
              "Selling avoids tying up cash for shares",
              "Exercising erases all of their remaining profit",
              "Selling instantly doubles the premium they collected"
            ],
            correctAnswer: 1,
            explanation: "Selling the option locks in the gain without needing thousands of dollars to buy the shares. Exercising is legal but ties up far more capital."
          },
          {
            id: "options3-mastery5",
            question: "Holding a losing out-of-the-money option into its final days is risky because…",
            options: [
              "The strike price suddenly resets all the way to zero",
              "Time decay drains its value fastest then",
              "The broker doubles all of the trading fees",
              "The option converts into a stock"
            ],
            correctAnswer: 1,
            explanation: "Time decay accelerates near expiration, so an out-of-the-money option can lose value rapidly, often falling toward zero even on a quiet day."
          },
          {
            id: "options3-mastery6",
            question: "A disciplined way to handle a winning option near expiration is to…",
            options: [
              "Hold it and hope for an even bigger move",
              "Sell it early to bank the gain",
              "Let it expire so no fees apply",
              "Buy more of the same option"
            ],
            correctAnswer: 1,
            explanation: "Selling a winner before expiration banks the profit before time decay or a reversal can erase it. Holding on and hoping exposes the gain to the accelerating clock."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // options-4: Hedging
  // ─────────────────────────────────────────────
  {
    lessonId: "options-4",
    sections: [
      {
        type: "concept",
        title: "Options as Insurance, Not Just Bets",
        paragraphs: [
          "So far options have looked like bets, but their original purpose is protection - hedging. Hedging means using an option to reduce the risk of an investment you already own, much like buying insurance on a car. You don't buy car insurance hoping to crash; you buy it so a crash won't ruin you. In the same way, an investor who owns stock can buy an option that pays off if the stock falls, cushioning the loss. The premium is the cost of that peace of mind, just like an insurance payment.",
          "The classic hedge is the 'protective put.' If you own 100 shares of a stock at $80 and worry about a drop, you can buy a $75 put. If the stock crashes to $60, your shares lose $20 each, but your put lets you sell at $75 - capping your downside near $5 a share instead of $20. You paid a premium for that protection, and if the stock never falls, the put expires worthless and the premium is your 'insurance cost.' Either way, you've traded a small, known cost for protection against a large, unknown loss.",
          "Hedging flips the usual risk story. When you buy an option purely to speculate, the odds and time decay work against you. When you buy one to hedge, you're not trying to profit from the option - you're accepting a small cost to protect a bigger position. This is how large investors and funds actually use options most of the time. It's a reminder that options aren't inherently reckless; used as insurance, they can make a portfolio safer, not riskier - though the protection is never free."
        ],
        bullets: [
          "Hedging uses options to reduce risk on an investment you already own.",
          "It works like insurance: a small premium guards against a large loss.",
          "A protective put lets you sell shares at the strike, capping your downside.",
          "If the stock never falls, the put expires and the premium was your insurance cost.",
          "Hedging aims to protect a position, not to profit from the option itself."
        ],
        realWorldExample: "You own 100 shares of a stock at $80 and buy a $75 put for $3. If the stock crashes to $55, your shares fell $25 but the put lets you sell at $75, so your real loss is capped near $8 a share (the $5 gap plus the $3 premium) instead of a brutal $25."
      },
      {
        type: "concept",
        title: "Covered Calls and the Cost of Protection",
        paragraphs: [
          "Another common strategy is the 'covered call,' where you own 100 shares and sell a call against them to earn income. Suppose you own a stock at $50 and sell a $55 call for a $2 premium. You immediately pocket $200. If the stock stays below $55, the call expires worthless and you keep both your shares and the premium. This is popular with long-term holders who want a little extra income from stock they already plan to keep, and because you own the shares, the dangerous 'naked call' risk is removed.",
          "But every hedge has a cost or a catch. With a covered call, the catch is capped upside: if the stock jumps to $65, your call gets assigned and you must sell your shares at $55, missing the extra gain. You still profit, but less than if you'd simply held the stock. This is the trade-off at the heart of all hedging - you give up something (upside, or a premium) in exchange for income or protection. There is no strategy that removes risk for free; you're always paying in one form or another.",
          "The big-picture lesson is that hedging is about managing risk deliberately, not eliminating it. A protective put costs a premium but caps your losses. A covered call earns a premium but caps your gains. Both let you shape your exposure to match your goals and comfort level. Used carelessly, options amplify risk; used thoughtfully as hedges, they let investors sleep at night. The skill isn't in predicting the market - it's in knowing exactly what you're giving up to get the protection you want."
        ],
        bullets: [
          "A covered call means selling a call against shares you own to earn premium income.",
          "If the stock stays below the strike, you keep the shares and the premium.",
          "The catch is capped upside: a big rise forces you to sell at the strike.",
          "Every hedge trades something away - upside, or the premium you pay.",
          "Hedging manages risk deliberately; it never removes risk for free."
        ],
        realWorldExample: "You own a stock at $50 and sell a $55 call for $2, pocketing $200. If it ends at $53, you keep the shares and the $200 - a nice bonus. But if it rockets to $65, you must sell at $55, banking $5 a share plus the $2 premium while missing the extra $10 climb."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "options4-mc1",
            question: "What is the main purpose of a protective put?",
            options: [
              "To earn extra monthly income from shares you own",
              "To cap losses on a stock you own",
              "To fully guarantee the stock will only rise",
              "To completely avoid ever paying any premium again"
            ],
            correctAnswer: 1,
            explanation: "A protective put acts like insurance, letting you sell at the strike so a big drop in your stock is cushioned. It caps your downside at the cost of the premium."
          },
          {
            id: "options4-mc2",
            question: "What is the trade-off of selling a covered call?",
            options: [
              "You risk unlimited losses on the stock",
              "You give up gains above the strike",
              "You must immediately buy 100 more shares",
              "You lose the entire premium you collected upfront"
            ],
            correctAnswer: 1,
            explanation: "A covered call earns premium income, but if the stock rises above the strike you must sell at that strike, capping your upside. You keep the premium either way."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ana Protects a Gain",
        narrative: "Ana owns 100 shares of a company she bought at $40; it's now $80, doubling her money. Earnings are next week and she's nervous about giving back her gains, but she doesn't want to sell and trigger taxes. She looks at buying a $75 put for $3 to protect her position through the announcement.",
        details: [
          "Her 100 shares are worth $8,000, up $4,000 from her $4,000 cost.",
          "The $75 put costs $300 and lets her sell at $75 no matter how far the stock drops.",
          "If earnings disappoint and the stock falls to $60, her put caps the damage near $75 a share.",
          "If earnings are great and the stock climbs, she loses only the $300 premium and keeps her gains."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "options4-aq1",
          question: "Earnings disappoint and Ana's stock falls to $60. How did the $75 protective put help her?",
          options: [
            "It let her sell near $75 instead of $60",
            "It automatically doubled her total share count overnight without warning",
            "It refunded every bit of her original upfront cost",
            "It forced the stock price back up to $80"
          ],
          correctAnswer: 0,
          explanation: "The put gives Ana the right to sell at $75, so her effective loss is capped near that level instead of the $60 market price. The premium was the cost of that protection."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Hedging uses options like insurance to reduce risk on holdings you already own.",
          "A protective put caps losses by letting you sell at the strike if the stock falls.",
          "A covered call earns premium income but caps your upside above the strike.",
          "Every hedge trades something away - you never remove risk for free.",
          "Used thoughtfully, options make a portfolio safer, not riskier."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "options4-mastery1",
            question: "Hedging with options is most like…",
            options: [
              "Buying a lottery ticket for fun",
              "Buying insurance on something you own",
              "Betting your whole account on one move",
              "Lending your shares to another trader"
            ],
            correctAnswer: 1,
            explanation: "Hedging pays a small premium to guard against a large loss, just like insurance. The goal is protection, not a quick speculative profit."
          },
          {
            id: "options4-mastery2",
            question: "You own 100 shares at $80 and buy a $75 put. If the stock falls to $60, your put lets you…",
            options: [
              "Buy 100 more shares at $60",
              "Sell your shares at $75",
              "Cancel the loss entirely for free",
              "Force the seller to raise the price"
            ],
            correctAnswer: 1,
            explanation: "The put gives the right to sell at the $75 strike, so your downside is capped near there instead of the $60 market price. The premium was the cost of that safety."
          },
          {
            id: "options4-mastery3",
            question: "In a covered call, why is the call 'covered'?",
            options: [
              "Because you already own the shares",
              "Because the broker guarantees the trade",
              "Because losses are legally impossible on covered trades",
              "Because the premium is always refunded"
            ],
            correctAnswer: 0,
            explanation: "It's covered because you own the 100 shares you might have to deliver, removing the dangerous unlimited-loss risk of selling a naked call."
          },
          {
            id: "options4-mastery4",
            question: "A covered call seller's stock jumps far above the strike. What happens?",
            options: [
              "They get to keep all of the extra gains",
              "They must sell shares at the strike",
              "They owe the buyer a truly unlimited amount",
              "The premium they earned is refunded"
            ],
            correctAnswer: 1,
            explanation: "Assignment forces them to sell at the strike, so they miss the gains above it. They still profit and keep the premium, but their upside is capped."
          },
          {
            id: "options4-mastery5",
            question: "What is the core trade-off in every hedging strategy?",
            options: [
              "You must always end up losing money overall somehow",
              "You give something up to reduce risk",
              "You remove all risk at no cost",
              "You double your risk to earn more"
            ],
            correctAnswer: 1,
            explanation: "Hedging always costs something - a premium paid or upside surrendered. You trade a known cost for protection; risk is never removed for free."
          },
          {
            id: "options4-mastery6",
            question: "If Ana's hedged stock rises after she buys a protective put, she…",
            options: [
              "Loses only the premium she paid",
              "Must sell her shares at the strike",
              "Owes the option seller extra money",
              "Is forced to buy another put"
            ],
            correctAnswer: 0,
            explanation: "A protective put buyer's worst case when the stock rises is losing the premium, while still enjoying the stock's gains. The put simply expires unused."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // options-5: Risk
  // ─────────────────────────────────────────────
  {
    lessonId: "options-5",
    sections: [
      {
        type: "concept",
        title: "Why Options Are So Risky",
        paragraphs: [
          "Options can multiply your money fast, and that same power can wipe it out just as fast. The core reason is leverage: one contract controls 100 shares, so a small move in the stock creates a big swing in the option. Spend $200 on a call and a modest stock rise might turn it into $600, a 200% gain. But the same setup can crater to $0, a 100% loss, on a move that barely dents the stock itself. That lopsided speed is why options are treated as advanced tools - the potential to lose everything you put in is not rare, it is normal.",
          "A second reason is that options expire. A stock you believe in can slump for two years and still recover, but an option is a bet with a deadline attached. You can be completely right about a company and still lose every dollar because the move happened a week too late. Time decay drains value every single day, quietly working against buyers. This combination - leverage plus a ticking clock - means the odds of any single speculative option trade are genuinely stacked against you, which is exactly why so many beginners lose money.",
          "The most dangerous risk of all comes from selling options without protection. A call buyer can only lose the premium, but someone who sells a 'naked' call - a call on shares they do not own - faces theoretically unlimited losses, because a stock can climb without any ceiling. A single surprise buyout or earnings pop can turn a small premium into a catastrophic loss far larger than the account. This is why responsible traders never sell naked calls and why beginners should stick to buying, where the loss is at least capped at what they paid."
        ],
        bullets: [
          "Leverage magnifies moves - one contract controls 100 shares.",
          "Losing 100% of a bought option's premium is common, not rare.",
          "Options expire, so being right too late still loses everything.",
          "Time decay drains value daily and quietly favors sellers.",
          "Selling naked calls exposes you to theoretically unlimited losses."
        ],
        realWorldExample: "A trader puts $500 into weekly calls hoping for a quick pop. The stock drifts sideways for five days, time decay eats the value, and the calls expire worthless - a full $500 gone. Had they bought the stock instead, they would still own it and could wait for a recovery."
      },
      {
        type: "concept",
        title: "Sizing, Rules, and Staying Sane",
        paragraphs: [
          "Because a single option trade can go to zero, risk management is not optional - it is the whole game. The first rule is position sizing: never put money into an option that you cannot afford to lose entirely. A common guideline is to risk only a tiny slice of a portfolio, such as 1 to 2 percent, on any speculative option. If a $2,000 account risks $40 per trade, one bad bet stings but does not end the game. Traders who bet large chunks on single contracts are the ones who blow up their accounts in weeks.",
          "The second discipline is having an exit plan before you enter. Decide in advance the price at which you will sell to cut a loss, and the gain at which you will take profit. Options move so fast that emotion takes over without a plan - fear makes you sell winners too early, and hope makes you hold losers to zero. Writing down 'I sell if it drops 50% or doubles' turns a gamble into a controlled bet. Discipline, not prediction, is what separates traders who survive from those who don't.",
          "Finally, beginners should respect a simple hierarchy of danger. Buying calls or puts caps your loss at the premium - risky, but survivable. Selling covered options against shares you own is moderate. Selling naked options is where accounts get destroyed, and it should be avoided until you deeply understand the math. Options are a tool, not a lottery, and the people who use them well treat every trade as a calculated risk with a known worst case - never a hope-fueled gamble with the rent money."
        ],
        bullets: [
          "Never risk more on an option than you can afford to lose fully.",
          "A common guideline is risking only 1 to 2 percent per speculative trade.",
          "Set your exit plan - stop-loss and profit target - before entering.",
          "Options move fast, so emotion beats you without written rules.",
          "Danger rises from buying, to covered selling, to naked selling."
        ],
        realWorldExample: "Two friends each start with $2,000. One risks $40 per option trade and survives a losing streak; the other bets $500 at a time and is wiped out after four bad weeks. Same market, same picks - only position sizing separated survival from ruin."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "options5-mc1",
            question: "Why is buying an option considered a high-risk trade?",
            options: [
              "The full premium is refunded to you if it expires",
              "You can easily lose 100% of the premium",
              "The strike price grows every single day",
              "Brokers always guarantee you a small steady profit"
            ],
            correctAnswer: 1,
            explanation: "Bought options often expire worthless, so losing the entire premium is common. Leverage and time decay make a total loss a normal outcome, not a rare one."
          },
          {
            id: "options5-mc2",
            question: "Which options trade carries theoretically unlimited loss?",
            options: [
              "Buying a call option",
              "Buying a put option",
              "Selling a naked call",
              "Buying a protective put"
            ],
            correctAnswer: 2,
            explanation: "A naked call sold on shares you don't own has no loss ceiling, since a stock can rise without limit. Buying calls or puts caps the loss at the premium."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Sizes a Risky Bet",
        narrative: "Leo, 18, has a $1,500 practice account in InvestiPlay. He's excited about a cheap weekly call that could triple if a stock pops on news. He's tempted to put $600 into it, but he stops to think about what happens if the trade fails, and how a disciplined trader would size the position instead.",
        details: [
          "The $600 bet is 40% of his account - a single loss would gut his balance.",
          "A 1-2% guideline would cap this trade near $15-$30, keeping any loss small.",
          "The call expires in five days, so time decay works against him every day.",
          "He decides to risk $30, set a plan to sell if it drops 50%, and accept a smaller bet."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "options5-aq1",
          question: "Why is Leo's original $600 plan far riskier than his revised $30 bet?",
          options: [
            "The $600 bet has a lower strike price",
            "A single loss would gut his whole account",
            "The $30 bet simply cannot ever lose any money",
            "Larger bets always tend to expire much more slowly"
          ],
          correctAnswer: 1,
          explanation: "At 40% of his account, one worthless expiration devastates his balance. Sizing down to 1-2% keeps any single loss survivable - the bet's odds don't change, but the damage does."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Leverage means small stock moves cause large option swings, up or down.",
          "Losing the entire premium on a bought option is a normal outcome.",
          "Expiration and time decay stack the odds against speculative buyers.",
          "Selling naked calls risks theoretically unlimited losses - avoid it.",
          "Position sizing and a written exit plan turn a gamble into a controlled risk."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "options5-mastery1",
            question: "What makes options riskier than simply owning a stock?",
            options: [
              "Leverage and a deadline can erase them fast",
              "Stocks always expire quickly but options never do",
              "Options will always pay out a fixed quarterly dividend",
              "Stocks carry no risk of any loss"
            ],
            correctAnswer: 0,
            explanation: "Leverage magnifies losses and expiration means options can go to zero, unlike a stock that can wait out a slump. That combination makes them advanced tools."
          },
          {
            id: "options5-mastery2",
            question: "A trader buys a call and the stock barely moves until expiration. Likely result?",
            options: [
              "The call is fully refunded back to you",
              "The premium is largely or fully lost",
              "The trader must immediately buy all 100 shares",
              "The strike price is reset higher"
            ],
            correctAnswer: 1,
            explanation: "With little movement, time decay erodes the option and it often expires near worthless. There's no refund, and the buyer is never forced to buy shares."
          },
          {
            id: "options5-mastery3",
            question: "A common position-sizing guideline for a speculative option is to risk…",
            options: [
              "Your entire account balance on one single trade",
              "Only 1 to 2 percent per trade",
              "Exactly one half of all your money",
              "Whatever amount the broker happens to suggest"
            ],
            correctAnswer: 1,
            explanation: "Risking just 1-2% per speculative trade keeps a single loss survivable. Betting large chunks on one contract is how accounts get wiped out quickly."
          },
          {
            id: "options5-mastery4",
            question: "Why should you set an exit plan before entering an option trade?",
            options: [
              "Brokers require a plan by law",
              "Emotion drives bad decisions without one",
              "It guarantees the trade will profit",
              "Plans stop the option from expiring"
            ],
            correctAnswer: 1,
            explanation: "Options move fast, so fear and hope hijack decisions unless you decide your stop-loss and target ahead of time. A plan turns a gamble into a controlled bet."
          },
          {
            id: "options5-mastery5",
            question: "Order these from least to most dangerous for a beginner.",
            options: [
              "Naked selling, covered selling, buying",
              "Buying, covered selling, naked selling",
              "Covered selling, buying, naked selling",
              "Buying, naked selling, covered selling"
            ],
            correctAnswer: 1,
            explanation: "Buying caps loss at the premium, covered selling is moderate, and naked selling risks unlimited loss. Beginners should climb that ladder slowly, if at all."
          },
          {
            id: "options5-mastery6",
            question: "The main lesson of options risk management is that traders should…",
            options: [
              "Predict the market to avoid all loss",
              "Treat each trade as a calculated risk",
              "Always bet big to recover losses fast",
              "Completely ignore the expiration date when buying options"
            ],
            correctAnswer: 1,
            explanation: "Skilled traders control size and set rules so every trade has a known worst case. Success comes from discipline, not from trying to predict the market perfectly."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // alt-1: Real Estate
  // ─────────────────────────────────────────────
  {
    lessonId: "alt-1",
    sections: [
      {
        type: "concept",
        title: "Property as a Wealth Engine",
        paragraphs: [
          "Real estate is one of the oldest ways people build wealth, and it works differently from stocks. When you buy a rental property, you own a physical asset that can do two jobs at once: pay you rent every month and grow in value over the years. A house bought for $300,000 that rents for $2,000 a month gives you steady cash flow, while the property itself might appreciate to $400,000 over a decade. That combination of income plus appreciation is what makes real estate appealing to long-term investors seeking something more tangible than shares on a screen.",
          "The feature that supercharges real estate is leverage through a mortgage. You can often buy a property with a down payment of just 20 percent, borrowing the rest. Put $60,000 down on a $300,000 home, and if it rises 10 percent to $330,000, you gained $30,000 on your $60,000 - a 50 percent return on your actual cash. This is powerful, but leverage cuts both ways: if the property falls in value, your losses are magnified the same way, and you still owe the full mortgage regardless of what happens to the price.",
          "Real estate also offers benefits stocks don't. Rental income tends to rise with inflation, helping protect your purchasing power over time. Owners can often deduct expenses like mortgage interest and depreciation, reducing taxes. And property is something you can see, touch, and improve - a fresh kitchen can directly raise both rent and value. These qualities make real estate feel more controllable than the stock market, though that control comes with real work and responsibility that passive investors often underestimate."
        ],
        bullets: [
          "Real estate can pay monthly rent and appreciate in value at the same time.",
          "A mortgage lets you control a large asset with a smaller down payment.",
          "Leverage magnifies both gains and losses on the property.",
          "Rental income often rises with inflation, protecting purchasing power.",
          "Owners can improve a property to directly raise rent and value."
        ],
        realWorldExample: "You buy a $300,000 rental with $60,000 down and rent it for $2,000 a month. Over ten years the tenants' rent helps pay the mortgage, the home rises to $400,000, and your original $60,000 has grown into far more equity - a mix of cash flow and appreciation working together."
      },
      {
        type: "concept",
        title: "The Costs and Headaches of Owning",
        paragraphs: [
          "Real estate is far from passive income, and beginners routinely underestimate the costs. Owning a property means paying property taxes, insurance, maintenance, and repairs - and these never stop. A rule of thumb is that maintenance alone can eat 1 to 2 percent of a home's value each year, so a $300,000 house might cost $3,000 to $6,000 annually just to keep up. Add a broken furnace or a leaking roof, and a single year's 'profit' can vanish. The rent check is not what you keep; what you keep is rent minus every one of these ongoing costs.",
          "The biggest weakness of real estate is that it is illiquid - you cannot sell it quickly. A stock can be sold in seconds, but selling a house can take months, cost 6 percent in agent fees, and force you to accept a lower price if you need cash fast. If a tenant stops paying or the unit sits empty for months, you still owe the mortgage out of your own pocket. This lack of flexibility is a serious risk, especially for investors who put too much of their savings into a single hard-to-sell property.",
          "There is also the human side: being a landlord is a job. You screen tenants, chase late rent, fix middle-of-the-night emergencies, and handle the occasional eviction. Many people hire a property manager for around 8 to 10 percent of the rent, which cuts profit but restores their time. None of this means real estate is bad - it is a proven wealth builder - but it rewards people who go in with open eyes about the money, time, and risk involved, rather than dreaming of effortless passive income."
        ],
        bullets: [
          "Property taxes, insurance, maintenance, and repairs are constant costs.",
          "Maintenance alone can run 1 to 2 percent of a home's value yearly.",
          "Real estate is illiquid - selling can take months and cost fees.",
          "Vacancies and non-paying tenants still leave you owing the mortgage.",
          "Being a landlord is real work, or you pay a manager 8 to 10 percent."
        ],
        realWorldExample: "A landlord collects $2,000 a month but spends $400 on taxes, $150 on insurance, $300 saved for repairs, and loses a month to a vacancy. The '$24,000 a year' in rent quietly shrinks to a fraction of that once every real cost is subtracted."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "alt1-mc1",
            question: "How does a mortgage create leverage in real estate?",
            options: [
              "It completely removes every last bit of risk from the purchase",
              "It lets a small down payment control a big asset",
              "It fully guarantees the property will only rise in value forever",
              "It quietly pays all of your yearly property taxes for you"
            ],
            correctAnswer: 1,
            explanation: "A mortgage lets you control a large property with a smaller down payment, magnifying returns on your cash - but it magnifies losses too, and the debt remains regardless."
          },
          {
            id: "alt1-mc2",
            question: "What is a major drawback of real estate compared with stocks?",
            options: [
              "It can literally never rise in value at all",
              "It is illiquid and slow to sell",
              "It pays absolutely no income at all ever",
              "It requires no ongoing maintenance whatsoever"
            ],
            correctAnswer: 1,
            explanation: "Real estate is illiquid - selling takes months and costs fees, unlike a stock sold in seconds. That lack of flexibility is a real risk if you need cash fast."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maya Runs the Numbers on a Rental",
        narrative: "Maya, 19, dreams of buying a rental someday and models a $300,000 property in InvestiPlay. It would rent for $2,000 a month, and at first glance that looks like $24,000 a year of easy income. Her mentor pushes her to subtract the real costs before deciding whether the deal actually makes sense.",
        details: [
          "She puts $60,000 down and borrows $240,000, so a mortgage payment comes out of the rent first.",
          "Taxes, insurance, and maintenance together might run several hundred dollars a month.",
          "She sets aside a reserve for a possible vacancy, since an empty unit still owes the mortgage.",
          "After all costs, her true cash flow is far below the headline $24,000 she first imagined."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "alt1-aq1",
          question: "Why is Maya's real profit far below the $24,000 headline rent figure?",
          options: [
            "Any rent income is completely illegal for you to keep",
            "Costs like mortgage, taxes, and upkeep reduce it",
            "The property automatically loses every bit of its value",
            "Tenants are paid to live there for free"
          ],
          correctAnswer: 1,
          explanation: "What you keep is rent minus the mortgage, taxes, insurance, maintenance, and vacancy reserves. Those ongoing costs turn the headline $24,000 into much smaller true cash flow."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Real estate can generate both monthly rent and long-term appreciation.",
          "A mortgage provides leverage that magnifies gains and losses alike.",
          "Ongoing costs - taxes, insurance, maintenance - shrink the true profit.",
          "Property is illiquid and slow to sell, unlike stocks.",
          "Being a landlord is real work, or you pay a manager part of the rent."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "alt1-mastery1",
            question: "What two ways can a rental property build wealth at once?",
            options: [
              "Dividends and stock splits",
              "Monthly rent and appreciation",
              "Interest and free repairs",
              "Tax refunds and coupons"
            ],
            correctAnswer: 1,
            explanation: "A rental pays monthly rent as cash flow while the property itself can appreciate over years. That dual income plus growth is real estate's core appeal."
          },
          {
            id: "alt1-mastery2",
            question: "You put $60,000 down on a $300,000 home that rises 10% to $330,000. Your return on cash is…",
            options: [
              "About 10 percent",
              "About 50 percent",
              "Exactly zero percent",
              "About 5 percent"
            ],
            correctAnswer: 1,
            explanation: "The $30,000 gain on your $60,000 down payment is roughly a 50% return on your cash - that's leverage amplifying the property's 10% rise."
          },
          {
            id: "alt1-mastery3",
            question: "Why does leverage make real estate riskier, not just more rewarding?",
            options: [
              "It cancels the whole mortgage balance automatically",
              "It magnifies losses if prices fall",
              "It removes the need for insurance",
              "It stops tenants from paying rent"
            ],
            correctAnswer: 1,
            explanation: "Leverage amplifies losses just as it amplifies gains, and you still owe the full mortgage even if the property's value drops. That's the double edge of borrowing."
          },
          {
            id: "alt1-mastery4",
            question: "Roughly how much can annual maintenance cost on a property?",
            options: [
              "Nothing at all, because upkeep is always free",
              "1 to 2 percent of its value",
              "A full one half of its total value",
              "Just a flat fifty dollars per year"
            ],
            correctAnswer: 1,
            explanation: "A common rule of thumb is 1-2% of a home's value each year for maintenance, so a $300,000 home might cost $3,000-$6,000 annually just to maintain."
          },
          {
            id: "alt1-mastery5",
            question: "A tenant stops paying and the unit sits empty for months. What happens?",
            options: [
              "The mortgage is paused for free",
              "You still owe the mortgage yourself",
              "The bank buys the home back",
              "The rent is automatically refunded to tenants"
            ],
            correctAnswer: 1,
            explanation: "Vacancies and non-paying tenants don't pause your debt - you cover the mortgage out of pocket. That's a key risk of putting too much into one property."
          },
          {
            id: "alt1-mastery6",
            question: "Hiring a property manager typically costs about…",
            options: [
              "A full 50 percent of the monthly rent",
              "8 to 10 percent of the rent",
              "Nothing at all, since it is free",
              "The entire full monthly rent amount collected"
            ],
            correctAnswer: 1,
            explanation: "Property managers usually charge around 8-10% of the rent to handle tenants and repairs, trading some profit for your time and reduced hassle."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // alt-2: REITs
  // ─────────────────────────────────────────────
  {
    lessonId: "alt-2",
    sections: [
      {
        type: "concept",
        title: "Owning Real Estate Through a Share",
        paragraphs: [
          "A REIT, or real estate investment trust, is a company that owns income-producing property - apartments, malls, warehouses, hospitals, or cell towers - and lets ordinary people invest by buying shares. Instead of saving $60,000 for a down payment, you can buy a single share of a REIT for maybe $50 and instantly own a tiny slice of hundreds of buildings. This solves the biggest barriers to real estate: the huge upfront cost, the illiquidity, and the landlord work. A REIT trades on the stock exchange, so you can buy or sell it in seconds like any stock.",
          "REITs have a special rule that makes them attractive for income. By law, a REIT must pay out at least 90 percent of its taxable income to shareholders as dividends. In exchange, the company pays little or no corporate income tax. This is why REITs are famous for high dividend yields - often 3 to 6 percent, sometimes more - far above what a typical stock pays. An investor seeking steady cash flow can hold a REIT and collect regular dividends without ever fixing a toilet or screening a tenant.",
          "There are different flavors of REIT. Equity REITs own and operate physical buildings and earn money from rent - these are the most common. Mortgage REITs instead lend money for real estate and earn from interest, which makes them more sensitive to interest rates. You can also buy a REIT ETF, which bundles dozens of REITs into one fund for instant diversification across property types and regions. This layered choice lets investors match a REIT to their goals, whether that's income, growth, or broad exposure to real estate."
        ],
        bullets: [
          "A REIT is a company owning income property that you invest in via shares.",
          "One low-cost share gives you a slice of many buildings at once.",
          "REITs trade on exchanges, so they're liquid and easy to sell.",
          "By law a REIT must pay out at least 90 percent of taxable income as dividends.",
          "Equity REITs own buildings; mortgage REITs lend for real estate."
        ],
        realWorldExample: "Instead of buying a $300,000 rental, you buy $500 of a warehouse REIT. You now own a sliver of dozens of distribution centers leased to big retailers, you collect quarterly dividends, and if you need the money you sell the shares that afternoon - no agent, no closing costs."
      },
      {
        type: "concept",
        title: "The Trade-Offs Behind the Yield",
        paragraphs: [
          "REITs solve many problems, but they introduce new ones. Because they trade like stocks, their prices swing with the stock market's moods, not just with real estate values. A perfectly healthy office REIT can drop 20 percent in a market panic even if its buildings are fully rented. So REITs give up some of the calm, slow-moving nature of owning a physical building - you gain liquidity but inherit stock-market volatility, which can rattle investors who expected 'safe' real estate.",
          "Interest rates are the other big force acting on REITs. When rates rise, REITs often fall for two reasons: their borrowing costs go up, squeezing profits, and their dividends look less attractive compared to newly higher-yielding bonds. This makes REITs sensitive to the Federal Reserve's moves in a way a house down the street is not. Mortgage REITs in particular can be volatile, since their entire business is built on the gap between borrowing and lending rates, which shifts as rates change.",
          "There's also a tax wrinkle worth knowing. Because REITs skip corporate tax, their dividends are usually taxed as ordinary income at your normal tax rate, rather than the lower rate that applies to many stock dividends. That makes REITs especially well suited to tax-advantaged accounts like an IRA, where the dividends can grow without an annual tax bite. The overall lesson is that REITs are a genuinely useful tool for adding real estate to a portfolio - as long as you understand you're trading physical control for liquidity, and stability for stock-like swings."
        ],
        bullets: [
          "REIT prices swing with the stock market, not just property values.",
          "You gain liquidity but inherit stock-market volatility.",
          "Rising interest rates tend to push REIT prices down.",
          "Mortgage REITs are especially sensitive to changing rates.",
          "REIT dividends are often taxed as ordinary income."
        ],
        realWorldExample: "During a market panic, an investor sees her apartment REIT drop 18% in a week even though every unit is still rented and rent is still flowing. The buildings didn't change - the stock market's mood did, and that's the volatility she accepted for easy liquidity."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "alt2-mc1",
            question: "What must a REIT do with most of its taxable income?",
            options: [
              "Reinvest every bit of it into brand new buildings",
              "Pay out at least 90 percent as dividends",
              "Hold all of it as spare cash for emergencies",
              "Return every dollar of it to the government as tax"
            ],
            correctAnswer: 1,
            explanation: "By law a REIT distributes at least 90% of taxable income to shareholders as dividends, which is why REITs are known for high, steady yields."
          },
          {
            id: "alt2-mc2",
            question: "Compared with owning a physical rental, a REIT is…",
            options: [
              "Much harder to actually buy and then sell later",
              "Liquid and easy to trade like a stock",
              "Completely free of any and all market risk",
              "Totally unable to ever pay out any income"
            ],
            correctAnswer: 1,
            explanation: "A REIT trades on an exchange, so you can buy or sell in seconds - a huge advantage over an illiquid physical property that takes months to sell."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sam Compares a REIT to a Rental",
        narrative: "Sam, 20, wants real estate exposure but has only $1,000 saved and no time to be a landlord. He's comparing buying shares of a diversified REIT against the fantasy of owning a rental house, weighing what he gains and gives up with each path before putting his money to work.",
        details: [
          "$1,000 buys REIT shares today; a rental would need tens of thousands for a down payment.",
          "The REIT pays a dividend around 4 percent and can be sold instantly if he needs cash.",
          "The REIT's price will swing with the stock market, even when its buildings are fine.",
          "He plans to hold the REIT in an IRA so its ordinary-income dividends aren't taxed yearly."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "alt2-aq1",
          question: "Why does Sam plan to hold his REIT inside an IRA rather than a regular account?",
          options: [
            "REITs are strictly illegal to hold outside of any IRA",
            "REIT dividends taxed as ordinary income can grow untaxed there",
            "An IRA quietly doubles every one of his dividend payments",
            "REITs are only ever allowed to trade inside of retirement accounts"
          ],
          correctAnswer: 1,
          explanation: "REIT dividends are usually taxed as ordinary income, so sheltering them in an IRA lets them compound without an annual tax bite - a smart fit for this asset."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A REIT lets you own income real estate through affordable, tradable shares.",
          "REITs must pay out at least 90 percent of taxable income as dividends.",
          "They offer liquidity and diversification a single property can't.",
          "REIT prices swing with the stock market and fall as interest rates rise.",
          "Their dividends are often taxed as ordinary income, fitting tax-advantaged accounts."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "alt2-mastery1",
            question: "What is a REIT?",
            options: [
              "A special federal tax charged on every real estate sale",
              "A company owning income property you buy shares of",
              "A government housing subsidy given to first-time buyers",
              "A specific type of adjustable home mortgage loan product"
            ],
            correctAnswer: 1,
            explanation: "A REIT is a real estate investment trust - a company that owns income-producing property and lets you invest by buying its shares, like a stock."
          },
          {
            id: "alt2-mastery2",
            question: "Why are REITs known for high dividend yields?",
            options: [
              "They pay out 90%+ of income by law",
              "They never actually own any real physical buildings anywhere",
              "They avoid paying out any dividends entirely",
              "They are fully guaranteed by the federal government"
            ],
            correctAnswer: 0,
            explanation: "The legal requirement to distribute at least 90% of taxable income means REITs hand most of their earnings to shareholders, producing high yields."
          },
          {
            id: "alt2-mastery3",
            question: "How does an equity REIT differ from a mortgage REIT?",
            options: [
              "Equity REITs own buildings; mortgage REITs lend",
              "Equity REITs are illegal; mortgage REITs aren't",
              "Both types only ever hold cash, never property",
              "Mortgage REITs own malls; equity REITs don't"
            ],
            correctAnswer: 0,
            explanation: "Equity REITs own and rent out physical property, while mortgage REITs lend money for real estate and earn interest, making them more rate-sensitive."
          },
          {
            id: "alt2-mastery4",
            question: "Why can a healthy REIT's price still drop sharply?",
            options: [
              "Its buildings suddenly physically vanish overnight",
              "It trades with stock-market volatility",
              "REITs are banned during downturns",
              "Paid dividends always make share prices fall"
            ],
            correctAnswer: 1,
            explanation: "Because REITs trade like stocks, market panic can push their prices down even when their buildings are fully rented - you inherit stock-market swings."
          },
          {
            id: "alt2-mastery5",
            question: "What usually happens to REIT prices when interest rates rise?",
            options: [
              "They tend to fall",
              "They are legally frozen",
              "They always rise sharply",
              "They convert into bonds"
            ],
            correctAnswer: 0,
            explanation: "Higher rates raise REIT borrowing costs and make their dividends less attractive versus new higher-yield bonds, so REIT prices often decline."
          },
          {
            id: "alt2-mastery6",
            question: "Why do many investors hold REITs in tax-advantaged accounts?",
            options: [
              "REITs simply can't be held anywhere else at all",
              "Their dividends are taxed as ordinary income",
              "IRAs quietly pay out double the dividends",
              "REITs avoid the stock market there"
            ],
            correctAnswer: 1,
            explanation: "REIT dividends are typically taxed at ordinary income rates, so holding them in an IRA or similar account lets them grow without a yearly tax hit."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // alt-3: Commodities
  // ─────────────────────────────────────────────
  {
    lessonId: "alt-3",
    sections: [
      {
        type: "concept",
        title: "Investing in Physical Stuff",
        paragraphs: [
          "Commodities are raw physical goods - gold, silver, oil, natural gas, wheat, coffee, copper - the basic materials that power the economy. Investing in commodities is different from buying a stock, because a barrel of oil or an ounce of gold doesn't earn profits, pay dividends, or run a business. Its value comes purely from supply and demand: how much of it exists versus how badly people need it. When a drought shrinks the wheat harvest or war disrupts oil supply, prices can spike; when supply floods the market, prices crash. This makes commodities a very different animal from company shares.",
          "Gold is the most famous commodity investment, prized for a special reason: it's seen as a store of value during crises. When investors fear inflation, currency collapse, or market chaos, they often pile into gold because it has held value for thousands of years and can't be printed like paper money. During high-inflation periods, gold has sometimes surged while stocks struggled. This is why gold is called a 'safe haven' - not because it always rises, but because it often moves independently of stocks, offering a cushion when other assets fall.",
          "Most people never store physical barrels or bushels. Instead, they invest through commodity ETFs that track prices, futures contracts that agree to buy or sell at a future date, or shares of producers like mining and oil companies. A gold ETF, for example, lets you profit from gold's price moves without a safe deposit box. Futures are powerful but heavily leveraged and risky - they're how professional traders operate, and they can wipe out beginners fast. For most investors, a simple commodity ETF is the practical way to get exposure."
        ],
        bullets: [
          "Commodities are raw physical goods like gold, oil, wheat, and copper.",
          "Their value comes from supply and demand, not profits or dividends.",
          "Gold is a 'safe haven' that can hold value during crises and inflation.",
          "Most investors use ETFs, futures, or producer stocks, not physical goods.",
          "Futures are heavily leveraged and can wipe out beginners fast."
        ],
        realWorldExample: "When inflation spiked and markets grew fearful, an investor moved a slice of savings into a gold ETF. As stocks wobbled, gold climbed and cushioned her portfolio - not because gold 'earns' anything, but because nervous buyers bid up a scarce metal that can't be printed away."
      },
      {
        type: "concept",
        title: "Why Commodities Are a Double-Edged Tool",
        paragraphs: [
          "The main reason to hold commodities is diversification. Because their prices are driven by physical supply and demand rather than corporate earnings, they often move differently from stocks and bonds. When inflation eats into stock and bond returns, commodity prices frequently rise, since inflation is partly about the rising cost of physical goods. Holding a small slice of commodities can therefore smooth a portfolio's ride, acting as a hedge that gains ground exactly when traditional investments are struggling.",
          "But commodities carry serious drawbacks. First, they produce no income - no dividends, no interest, nothing while you wait. Your only hope of profit is selling later at a higher price, which makes them pure speculation on direction. Second, they can be brutally volatile: oil has swung wildly, even briefly going negative in 2020 when storage ran out. Third, physical commodities cost money to store and insure, and futures can carry hidden costs that erode returns over time. A commodity that trades flat for years can still lose you money through these frictions.",
          "The balanced view is that commodities are a supporting player, not a core holding. Financial advisors typically suggest keeping any commodity exposure small - often 5 to 10 percent of a portfolio at most - precisely because they don't compound like stocks over decades. Gold that sat in a vault for 40 years grew far less than a stock index over the same span. Commodities shine as a hedge and a diversifier during specific storms, but leaning on them for long-term wealth is a mistake, since productive assets like businesses have historically built far more wealth over time."
        ],
        bullets: [
          "Commodities diversify because they move differently from stocks and bonds.",
          "They often rise with inflation, hedging traditional investments.",
          "They produce no income - profit relies entirely on price rising.",
          "They can be extremely volatile and carry storage or futures costs.",
          "Advisors keep commodity exposure small, often under 10 percent."
        ],
        realWorldExample: "Over 40 years, an ounce of gold locked in a vault rose in price but produced no income the whole time, while a stock index paid dividends and compounded to many times more. Gold helped during specific inflation scares, but as a lifelong wealth engine it badly trailed businesses."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "alt3-mc1",
            question: "Where does a commodity's value primarily come from?",
            options: [
              "Its reported quarterly profits and steady dividends paid",
              "Supply and demand for the physical good",
              "A vote by its board of directors",
              "The interest rate paid out by the government"
            ],
            correctAnswer: 1,
            explanation: "A commodity like oil or gold earns no profit and pays no dividend - its value rises or falls purely on supply and demand for the physical material."
          },
          {
            id: "alt3-mc2",
            question: "Why is gold often called a 'safe haven'?",
            options: [
              "It always pays out the very highest dividends",
              "It often holds value during crises",
              "It is guaranteed to always rise",
              "It earns a steady stream of monthly interest"
            ],
            correctAnswer: 1,
            explanation: "Gold tends to hold or gain value during inflation and market chaos, moving independently of stocks. That cushion, not a guaranteed rise, is why it's a safe haven."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nadia Adds a Commodity Slice",
        narrative: "Nadia, 21, has a portfolio that's almost all stock index funds. She's read that commodities can hedge inflation and is considering putting a portion into a gold ETF. Her mentor asks her to think carefully about how much to add and what she should realistically expect it to do.",
        details: [
          "Her stocks pay dividends and compound, while a gold ETF would pay her nothing while held.",
          "In an inflation scare, gold might rise as her stocks struggle, smoothing her overall returns.",
          "Over decades, gold has historically grown far less than a broad stock index.",
          "She decides to cap the gold slice near 8 percent, treating it as a hedge, not a core engine."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "alt3-aq1",
          question: "Why does Nadia keep her gold slice small rather than making it her core holding?",
          options: [
            "Gold is illegal to own in large amounts",
            "Gold produces no income and compounds poorly long-term",
            "Gold always steadily loses some value every single year",
            "Gold can only be bought once per year"
          ],
          correctAnswer: 1,
          explanation: "Gold pays nothing while held and has historically grown far less than stocks over decades. It works as a small hedge against inflation, not as a long-term wealth engine."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Commodities are physical goods valued purely by supply and demand.",
          "Gold acts as a safe haven, often holding value during crises and inflation.",
          "Most investors get exposure through ETFs rather than physical goods.",
          "Commodities pay no income and can be extremely volatile.",
          "Keep commodity exposure small - a hedge, not a core wealth builder."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "alt3-mastery1",
            question: "Which of these is a commodity?",
            options: [
              "A share of a tech company",
              "Crude oil",
              "A government bond",
              "A savings account"
            ],
            correctAnswer: 1,
            explanation: "Crude oil is a raw physical good - a commodity. Stocks, bonds, and savings accounts are financial assets, not physical materials."
          },
          {
            id: "alt3-mastery2",
            question: "How do commodities differ fundamentally from stocks?",
            options: [
              "They steadily earn profits and pay dividends",
              "They produce no income at all",
              "They are fully guaranteed to always rise",
              "They pay out fixed quarterly interest"
            ],
            correctAnswer: 1,
            explanation: "Unlike a business, a commodity generates no profits, dividends, or interest. Your only path to gain is selling later at a higher price."
          },
          {
            id: "alt3-mastery3",
            question: "Why do investors add a small slice of commodities to a portfolio?",
            options: [
              "To diversify with different price drivers",
              "To guarantee a fixed yearly return",
              "To completely avoid ever owning any stocks",
              "To fully eliminate all of the portfolio risk"
            ],
            correctAnswer: 0,
            explanation: "Commodities move on supply and demand, often differently from stocks and bonds, so a small slice can hedge inflation and smooth the overall ride."
          },
          {
            id: "alt3-mastery4",
            question: "How do most everyday investors get commodity exposure?",
            options: [
              "By storing barrels of oil at home",
              "Through commodity ETFs",
              "By farming their own wheat",
              "By mining gold themselves"
            ],
            correctAnswer: 1,
            explanation: "Most people use commodity ETFs, futures, or producer stocks rather than storing physical goods. An ETF is the simplest practical route for beginners."
          },
          {
            id: "alt3-mastery5",
            question: "Why are futures contracts especially risky for beginners?",
            options: [
              "They pay guaranteed dividends",
              "They are heavily leveraged",
              "They never change in price",
              "They cannot be sold early"
            ],
            correctAnswer: 1,
            explanation: "Futures use heavy leverage, so small price moves create large gains or losses that can wipe out a beginner's account fast. They're built for professionals."
          },
          {
            id: "alt3-mastery6",
            question: "Why are commodities a poor choice as a core, decades-long holding?",
            options: [
              "They quietly compound over time just like stocks do",
              "They don't compound and pay no income",
              "They are taxed at a zero rate",
              "They always beat the stock market"
            ],
            correctAnswer: 1,
            explanation: "Commodities pay no income and don't compound, so over decades they've badly trailed productive assets like a stock index. They're a hedge, not a wealth engine."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // alt-4: Crypto (Educational)
  // ─────────────────────────────────────────────
  {
    lessonId: "alt-4",
    sections: [
      {
        type: "concept",
        title: "What Cryptocurrency Actually Is",
        paragraphs: [
          "Cryptocurrency is digital money that lives on a blockchain - a shared record of transactions copied across thousands of computers instead of stored by one bank. No single company or government runs Bitcoin; the network agrees on who owns what by having computers around the world check and confirm every transfer. That design means no bank can freeze your coins and no central office prints more on a whim. It also means there is no help desk to call if you lose access. This mix of independence and self-responsibility is the whole personality of crypto, and it shapes every risk that follows.",
          "There are thousands of cryptocurrencies, but they fall into a few buckets. Bitcoin was built to be scarce digital money, capped forever at 21 million coins. Ethereum added programmable contracts, so apps and tokens can run on its network automatically. Then there are 'stablecoins' pegged to the dollar, and a long tail of thousands of tiny tokens, many of which are hype-driven and worth nothing within a year. Knowing which bucket a coin sits in matters, because a scarce, widely used network is a very different bet than a brand-new token a stranger is promoting online.",
          "Crypto is famous for wild price swings. Bitcoin has fallen more than 50% in a matter of months multiple times, then recovered, then fallen again. A stock index dropping 20% is called a bear market; crypto can do that in a week and treat it as normal. This volatility is why teens should treat crypto as a tiny, speculative slice of money they can fully afford to lose - never emergency savings and never money borrowed. The technology is genuinely interesting, but the price behavior is closer to a casino than a savings account."
        ],
        bullets: [
          "Crypto is digital money recorded on a blockchain shared across many computers, not one bank.",
          "No central authority controls it - which means no freezes, but also no help desk.",
          "Bitcoin is capped at 21 million coins; most other tokens are far riskier long shots.",
          "Prices swing violently - 50% drops in months have happened repeatedly.",
          "Treat crypto as a tiny amount you can fully afford to lose, never core savings."
        ],
        realWorldExample: "In 2021 Bitcoin climbed near $69,000, then fell under $17,000 by late 2022 - a drop of roughly 75% in about a year. Someone who put their whole savings in at the top would have watched three-quarters of it vanish, while someone who risked only lunch money learned a cheap lesson."
      },
      {
        type: "concept",
        title: "Wallets, Keys, and Real Risks",
        paragraphs: [
          "Owning crypto means controlling a 'private key' - a long secret code that proves the coins are yours. Whoever holds the key holds the money. You can store keys yourself in a personal wallet, or leave them on an exchange like a company holding your coins for you. Self-storage means total control but total responsibility: lose the key and the coins are gone forever, with no bank to reset your password. It is estimated that millions of Bitcoin are permanently lost this way. Convenience and safety pull in opposite directions here, and beginners often underestimate the danger.",
          "Because crypto is irreversible and pseudonymous, it is a magnet for scams. If you get tricked into sending coins, there is no chargeback and no fraud department to reverse it. Common traps include fake 'giveaways' that ask you to send coins first, romance and investment cons promising guaranteed returns, and phishing sites that steal your key. The rule is blunt: no legitimate opportunity ever asks you to send crypto to receive more back, and anyone guaranteeing profits is lying. Skepticism is a survival skill in this space.",
          "Beyond scams, exchanges themselves can fail. Several large platforms have collapsed or been hacked, taking customers' coins with them - the failure of FTX in 2022 wiped out billions in user funds. That is why the crypto saying goes, 'not your keys, not your coins.' For a curious beginner, the sensible path is education first: learn how a blockchain works, understand the risks, and if you ever invest, use only a tiny amount on a reputable platform. The goal at this stage is understanding, not chasing gains."
        ],
        bullets: [
          "A private key controls your coins - whoever has it owns the money.",
          "Self-storage gives full control but lost keys mean coins are gone forever.",
          "Crypto transfers are irreversible, so scams have no chargebacks or refunds.",
          "No real opportunity asks you to send crypto to receive more back.",
          "Exchanges can be hacked or collapse - 'not your keys, not your coins.'"
        ],
        realWorldExample: "The FTX exchange looked huge and trustworthy until it collapsed in November 2022, and everyday users who left coins there lost access to billions of dollars overnight. People who had moved coins to their own wallets kept them; those who trusted the company did not."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "alt4-mc1",
            question: "What does controlling a cryptocurrency 'private key' mean?",
            options: [
              "A bank can reset it if you forget it",
              "Whoever holds the key controls the coins",
              "It guarantees the coins will rise in value",
              "It lets you reverse any transaction you send"
            ],
            correctAnswer: 1,
            explanation: "A private key proves ownership, so whoever holds it controls the coins. No bank can reset a lost key, transfers can't be reversed, and keys guarantee nothing about price."
          },
          {
            id: "alt4-mc2",
            question: "Which statement about crypto scams is accurate?",
            options: [
              "Coins you send can be reversed later by an exchange",
              "Offers that guarantee a return are usually quite safe",
              "Real offers never ask you to send coins first",
              "Phishing sites are unable to ever steal a private key"
            ],
            correctAnswer: 2,
            explanation: "No legitimate opportunity asks you to send crypto to get more back. Transfers are irreversible, guarantees are red flags, and phishing sites absolutely steal keys."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Gets a Tempting Message",
        narrative: "Marcus, 16, has been reading about Bitcoin and set aside $50 he can afford to lose to learn how it works. One day a stranger messages him: 'Send 0.01 Bitcoin to this address and I'll send you back double within an hour - trusted by thousands!' It sounds like an easy way to grow his tiny stash, and he pauses to think it through.",
        details: [
          "The message guarantees a doubling, and guaranteed crypto returns are always a lie.",
          "It asks him to send coins first, which no real opportunity ever requires.",
          "If he sends the coins, the transfer is irreversible with no refund or chargeback.",
          "The smart move is to ignore it and keep his $50 for actually learning how the network works."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "alt4-aq1",
          question: "Marcus wants to hold his own coins safely instead of leaving them on an app. What is the key trade-off he takes on?",
          options: [
            "His coins will now start to rise much faster in value",
            "He gains control but must never lose his key",
            "An exchange will fully insure him against any possible loss",
            "His transactions will now become completely and fully reversible"
          ],
          correctAnswer: 1,
          explanation: "Self-storage gives full control but full responsibility: lose the private key and the coins are gone forever. It doesn't change price, add insurance, or make transfers reversible."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Crypto is blockchain-based digital money with no central bank controlling it.",
          "Prices are extremely volatile, so only ever risk money you can fully afford to lose.",
          "Your private key is your money - lose it and the coins are gone for good.",
          "Transfers are irreversible, so scams and phishing have no undo button.",
          "Exchanges can fail or be hacked; 'not your keys, not your coins.'"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "alt4-mastery1",
            question: "What best describes a blockchain?",
            options: [
              "A private bank vault owned by one single company",
              "A shared record copied across many computers",
              "A government program that prints brand new coins",
              "A phone app that always guarantees you profits"
            ],
            correctAnswer: 1,
            explanation: "A blockchain is a shared transaction record copied across many computers, with no single owner. That decentralization is the core idea behind cryptocurrency."
          },
          {
            id: "alt4-mastery2",
            question: "Why should a teen treat crypto as a tiny slice of money?",
            options: [
              "Its price can swing violently and drop sharply",
              "It always beats the broad stock market over the long term",
              "Governments fully guarantee the set value of each coin",
              "It pays out a fixed interest rate every single month"
            ],
            correctAnswer: 0,
            explanation: "Crypto prices swing wildly and can fall 50% or more fast. No government guarantees value and it pays no fixed interest, so risk only what you can lose."
          },
          {
            id: "alt4-mastery3",
            question: "A site offers to double any Bitcoin you send it. This is…",
            options: [
              "A normal and low-risk investment that anyone can trust",
              "A scam with no way to recover funds",
              "A safe savings plan that is fully backed by a government",
              "A safe and reliable way to earn steady monthly interest"
            ],
            correctAnswer: 1,
            explanation: "Doubling offers are classic scams, and because transfers are irreversible there is no way to get the coins back. Guarantees like this are always fraud."
          },
          {
            id: "alt4-mastery4",
            question: "What does 'not your keys, not your coins' warn about?",
            options: [
              "Coins left on an exchange can be lost if it fails",
              "Holding your own keys makes your coins rise much faster in price",
              "You must always share your private key with a licensed broker",
              "Private keys will simply expire after just one year of active use"
            ],
            correctAnswer: 0,
            explanation: "If an exchange holds your keys and it collapses or is hacked, your coins can vanish. Holding your own keys means you control the coins directly."
          },
          {
            id: "alt4-mastery5",
            question: "Bitcoin is designed to be scarce because…",
            options: [
              "A central bank issues more of it when prices fall",
              "Its supply is capped at 21 million coins",
              "Brand new coins are printed fresh every single day",
              "Its price is permanently fixed to the U.S. dollar"
            ],
            correctAnswer: 1,
            explanation: "Bitcoin's supply is permanently capped at 21 million coins, which is the source of its 'digital scarcity.' No bank can print more, and it isn't pegged to the dollar."
          },
          {
            id: "alt4-mastery6",
            question: "What is the smartest first step for a curious beginner?",
            options: [
              "Borrow money to buy as much as possible",
              "Learn how it works before risking much",
              "Put emergency savings into one hot coin",
              "Trust any stranger promising fast gains"
            ],
            correctAnswer: 1,
            explanation: "Education comes first: understand the technology and risks before ever investing more than a tiny amount. Never borrow, never use emergency savings, never trust guarantees."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // alt-5: Private Equity
  // ─────────────────────────────────────────────
  {
    lessonId: "alt-5",
    sections: [
      {
        type: "concept",
        title: "Owning Companies That Aren't on the Market",
        paragraphs: [
          "Private equity means owning a stake in a company whose shares don't trade on a public exchange. When you buy Apple stock, you tap a button and own a slice instantly. But most businesses in the world - your local gym, a growing software startup, a family manufacturer - are private, and you can't buy them through an app. Private equity is the business of buying, improving, and eventually selling these companies. Investors pool large sums, take ownership of whole businesses or big chunks of them, and aim to sell years later for more than they paid.",
          "The classic playbook has a few flavors. Venture capital funds back young startups, accepting that most will fail while a rare few grow enormous. Buyout funds purchase mature companies, often using borrowed money, then try to make them more efficient and profitable. Growth equity sits in between, funding companies that already work but need cash to expand. In every case the strategy is the same shape: buy ownership, actively improve the business over several years, then sell the whole thing or take it public through an IPO for a gain.",
          "The rewards can be large, but so are the barriers. Private equity has historically been open mainly to institutions and wealthy 'accredited' investors, with minimum investments often in the hundreds of thousands or millions. Money is typically locked up for seven to ten years, and there is no daily price telling you what your stake is worth. For a teen, the practical takeaway isn't to invest now - it's to understand how private ownership creates value, because that same logic explains everything from startups to why some funds chase private deals."
        ],
        bullets: [
          "Private equity is ownership in companies that don't trade on public exchanges.",
          "Venture capital backs startups; buyout funds buy mature firms; growth equity fuels expansion.",
          "The strategy is buy, improve over years, then sell or take public for a gain.",
          "Access is usually limited to institutions and wealthy accredited investors.",
          "Money is locked up for many years with no daily price quote."
        ],
        realWorldExample: "A buyout fund buys a struggling regional restaurant chain for $100 million, spends four years fixing its menu, supply costs, and management, then sells it for $180 million. That $80 million gain came from improving a private business - not from a stock ticker moving up and down."
      },
      {
        type: "concept",
        title: "The Real Costs: Illiquidity and Leverage",
        paragraphs: [
          "The biggest feature of private equity is illiquidity - you can't easily get your money back. When you commit to a fund, that cash may be tied up for a decade, and you generally can't sell your stake to a stranger the way you'd sell a stock in seconds. This is a double-edged sword. It forces patient, long-term thinking and avoids panic-selling, but it also means your money is unavailable if you suddenly need it. Anyone in private equity must be able to leave that money alone for years without stress, which is exactly why it suits large institutions.",
          "Buyout deals often rely on leverage - borrowed money - to boost returns. If a fund buys a company using mostly debt and the company improves, the gains on the small slice of real cash invested can be huge. But leverage cuts both ways: if the business stumbles, the debt still has to be repaid, and the whole investment can be wiped out. Some famous buyouts have collapsed under debt they couldn't service. This is the same magnification you see with options and margin - more upside, but far more danger.",
          "Fees are another catch. Private equity funds famously charge '2 and 20' - roughly a 2% annual management fee plus 20% of the profits. Those fees take a large bite, so a fund has to perform well just to beat a cheap index fund after costs. Studies show many private equity funds don't reliably beat public markets once fees are counted. The honest lesson for a beginner: private equity can create real value by improving businesses, but its illiquidity, leverage, and heavy fees make it a specialist's tool, not a shortcut to easy wealth."
        ],
        bullets: [
          "Illiquidity means your money can be locked up for seven to ten years.",
          "You usually can't sell a private stake quickly the way you sell a stock.",
          "Leverage (borrowed money) magnifies both gains and losses in buyouts.",
          "High fees - often '2 and 20' - take a big bite out of returns.",
          "Many funds don't reliably beat cheap index funds after fees."
        ],
        realWorldExample: "A fund buys a company for $100 million using $80 million of borrowed money and $20 million of its own cash. If it later sells for $130 million and repays the debt, its $20 million turned into $50 million. But if the sale is only $70 million, the debt eats everything and the $20 million is gone."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "alt5-mc1",
            question: "What is private equity?",
            options: [
              "Ownership in companies not traded publicly",
              "A type of daily-traded index fund",
              "A government bond paying fixed interest",
              "A savings account for wealthy families"
            ],
            correctAnswer: 0,
            explanation: "Private equity is ownership in companies that don't trade on public exchanges. It isn't an index fund, a bond, or a savings account."
          },
          {
            id: "alt5-mc2",
            question: "Why is illiquidity a defining risk of private equity?",
            options: [
              "It guarantees that the investment will always lose money",
              "Your money can be locked up for many years",
              "It means that the fund will charge no fees at all",
              "It lets you sell off your entire stake almost instantly"
            ],
            correctAnswer: 1,
            explanation: "Illiquidity means your money may be tied up for seven to ten years and can't be sold quickly. It doesn't guarantee a loss or remove fees."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nadia Studies a Buyout Fund",
        narrative: "Nadia, 17, is researching how private equity works for a school project. She reads about a fund that buys a mid-sized bakery chain for $100 million, using $70 million of borrowed money and $30 million of investors' cash, planning to improve it and sell in six years. She maps out what makes this deal powerful and what makes it dangerous.",
        details: [
          "Investors' $30 million is locked up for roughly six years with no way to cash out early.",
          "The $70 million of debt magnifies returns if the bakery improves and sells for more.",
          "If the bakery struggles, the debt still must be repaid, which can wipe out the $30 million.",
          "The fund also charges yearly fees plus a share of profits, lowering the investors' net gain."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "alt5-aq1",
          question: "The bakery is later sold for $160 million. After repaying the $70 million debt, roughly what did the investors' $30 million become (before fees)?",
          options: [
            "It roughly stayed flat at about $30 million",
            "It grew to about $90 million",
            "It fell sharply down to about $10 million",
            "It was completely and totally wiped out entirely"
          ],
          correctAnswer: 1,
          explanation: "Sale of $160M minus $70M debt leaves $90M for the equity investors, so their $30M roughly tripled. That is leverage working in their favor - though fees would trim the gain."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Private equity is ownership in companies that don't trade on public markets.",
          "The strategy is to buy, improve over years, then sell for a gain.",
          "Money is illiquid, often locked up for seven to ten years.",
          "Leverage magnifies both the gains and the losses of buyouts.",
          "High fees mean many funds don't beat cheap index funds after costs."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "alt5-mastery1",
            question: "Which best describes a buyout fund's strategy?",
            options: [
              "Trade public stocks in and out on a daily basis",
              "Buy a company, improve it, then sell it",
              "Lend out money to big banks for a fixed interest",
              "Hold onto cash and simply never invest it at all"
            ],
            correctAnswer: 1,
            explanation: "Buyout funds purchase companies, work to improve them over years, then sell for a gain. They don't day-trade stocks or simply hold cash."
          },
          {
            id: "alt5-mastery2",
            question: "Venture capital differs from buyouts because it mainly…",
            options: [
              "Backs young startups, most of which fail",
              "Buys only large, mature, and well-established companies",
              "Avoids nearly all risk by only holding safe bonds",
              "Guarantees that every single startup it backs succeeds"
            ],
            correctAnswer: 0,
            explanation: "Venture capital funds back young startups, accepting that most fail while a few win big. Buyouts target mature companies instead."
          },
          {
            id: "alt5-mastery3",
            question: "How does leverage affect a buyout?",
            options: [
              "It removes all risk from the deal",
              "It magnifies both gains and losses",
              "It guarantees a profit every time",
              "It has no effect on the outcome"
            ],
            correctAnswer: 1,
            explanation: "Borrowed money magnifies returns when things go well and losses when they don't. Debt still must be repaid even if the business struggles."
          },
          {
            id: "alt5-mastery4",
            question: "The '2 and 20' fee structure means roughly…",
            options: [
              "2% yearly plus 20% of the profits",
              "A 20% yearly fee charged with no profit share",
              "A single flat $2 fee spread over 20 years",
              "A charge of 2% of profits and nothing else"
            ],
            correctAnswer: 0,
            explanation: "'2 and 20' means about a 2% annual management fee plus 20% of the profits. These heavy fees force funds to perform well just to beat cheap index funds."
          },
          {
            id: "alt5-mastery5",
            question: "Why has private equity mostly been closed to teens and small investors?",
            options: [
              "It is illegal for anyone under thirty",
              "High minimums and accredited-investor rules",
              "Returns are always negative",
              "Public exchanges ban all private deals"
            ],
            correctAnswer: 1,
            explanation: "Access has required large minimums and accredited-investor status, meaning wealth or income thresholds. It isn't age-illegal or guaranteed to lose money."
          },
          {
            id: "alt5-mastery6",
            question: "What is the honest takeaway about private equity returns?",
            options: [
              "It always reliably beats the broad stock market",
              "Many funds trail index funds after fees",
              "It carries no real risk of any kind at all",
              "It pays out a fixed amount of monthly interest"
            ],
            correctAnswer: 1,
            explanation: "After heavy fees, many private equity funds don't reliably beat cheap index funds. It can create value but is a specialist tool, not a guaranteed win."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // alt-6: Liquidity Risk
  // ─────────────────────────────────────────────
  {
    lessonId: "alt-6",
    sections: [
      {
        type: "concept",
        title: "How Fast Can You Turn It Into Cash?",
        paragraphs: [
          "Liquidity is how quickly and cheaply you can turn an investment into cash without moving its price. Cash itself is perfectly liquid - it's already money. A share of a big company like Microsoft is highly liquid: millions trade daily, so you can sell in seconds at a fair price. A rental house is illiquid: selling it takes months, costs thousands in fees, and the price depends on finding one willing buyer. Liquidity risk is the danger that when you need cash, you can't sell an asset quickly without accepting a painful discount.",
          "Assets sit on a spectrum. At the liquid end are cash, savings accounts, and large-company stocks and bonds. In the middle are things like small-company stocks or certain funds, where selling is possible but the price can jump around. At the illiquid end are real estate, private equity, collectibles, and many crypto tokens that few people trade. The further down that spectrum you go, the wider the gap between what an asset is 'worth' on paper and what you could actually get for it today if you were forced to sell in a hurry.",
          "A useful signal of liquidity is the 'bid-ask spread' - the gap between the highest price a buyer will pay and the lowest a seller will accept. For a liquid stock that spread might be a penny, so buying and selling barely costs you anything. For an illiquid asset the spread can be huge: a rare collectible might be listed at $10,000 but only fetch $6,000 from the one buyer you can find. That $4,000 gap is the hidden cost of illiquidity, and it appears exactly when you most need to sell."
        ],
        bullets: [
          "Liquidity is how fast and cheaply you can turn an asset into cash at a fair price.",
          "Cash and big-company stocks are highly liquid; real estate and collectibles are not.",
          "Liquidity risk is being unable to sell without a painful price discount.",
          "The bid-ask spread signals liquidity - tiny for liquid assets, wide for illiquid ones.",
          "The less liquid the asset, the bigger the gap between paper value and cash value."
        ],
        realWorldExample: "Two people each need $5,000 fast. One sells shares of a big-company index fund and has the cash the next day at full value. The other owns a rare comic book 'worth' $5,000 but has to accept $3,500 from the only buyer willing to move quickly. Same paper value, very different real liquidity."
      },
      {
        type: "concept",
        title: "Why Illiquidity Bites at the Worst Time",
        paragraphs: [
          "Liquidity risk is dangerous because it strikes precisely when you're most vulnerable. If you lose a job, face a medical bill, or hit an emergency, you need cash now - and that's exactly when illiquid assets are hardest to sell at a fair price. Worse, emergencies often coincide with bad markets: in a downturn, buyers vanish and illiquid assets can only be sold at fire-sale prices. This is why financial planners insist on keeping an emergency fund in cash or a savings account, no matter how tempting it is to chase higher returns in less liquid places.",
          "Illiquidity can also force terrible decisions. Someone with all their money locked in property or a private fund might be forced to sell a good long-term investment early, at a loss, just to raise cash. This is the opposite of the patient investing that builds wealth. History is full of investors who owned genuinely valuable assets but went broke because they couldn't convert them to cash in time. Being 'rich on paper' means nothing if you can't pay this month's bills, and that trap has sunk businesses and households alike.",
          "The fix is a deliberate liquidity plan. Keep enough easily-sellable money - an emergency fund covering several months of expenses - so you never have to dump long-term holdings in a crisis. Only commit money to illiquid assets if you truly won't need it for years. And demand a reward for locking money up: illiquid investments should offer higher expected returns to compensate for the risk, or they aren't worth the trade. Matching your liquidity to your real-life cash needs is one of the most underrated skills in investing."
        ],
        bullets: [
          "Liquidity risk bites hardest during emergencies, exactly when you need cash.",
          "Downturns dry up buyers, forcing fire-sale prices on illiquid assets.",
          "Illiquidity can force selling good investments early at a loss.",
          "Keep an emergency fund of several months' expenses in liquid form.",
          "Only accept illiquidity if the asset pays a higher expected return for it."
        ],
        realWorldExample: "During the 2008 crisis, some investors held property and funds they couldn't sell without huge losses. When they suddenly needed cash, buyers had disappeared, and they were forced to sell prized assets for pennies on the dollar - wealthy on paper one month, scrambling the next."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "alt6-mc1",
            question: "What does 'liquidity' measure?",
            options: [
              "How much an asset will actually rise in the next year",
              "How fast you can sell it for fair cash",
              "How many total shares a given company has issued",
              "How much yearly interest a particular bond pays out"
            ],
            correctAnswer: 1,
            explanation: "Liquidity is how quickly and cheaply you can turn an asset into cash at a fair price. It isn't about future returns, share counts, or interest."
          },
          {
            id: "alt6-mc2",
            question: "Why is liquidity risk especially dangerous in an emergency?",
            options: [
              "Illiquid assets will always rise in value during nearly any crisis",
              "You may be forced to sell at a steep discount",
              "Cash suddenly becomes completely impossible to actually go and spend then",
              "Liquid assets always completely disappear during any market downturns at all"
            ],
            correctAnswer: 1,
            explanation: "In an emergency you need cash fast, and illiquid assets often can only be sold at a painful discount - especially when buyers vanish in a downturn."
          }
        ]
      },
      {
        type: "scenario",
        title: "Theo's Cash Crunch",
        narrative: "Theo, 18, has saved $8,000. A cousin urges him to put all of it into a share of a rental property that 'can't lose.' Theo likes the idea but stops to think about what happens if his car breaks down or he loses his part-time job and suddenly needs money before the property can be sold.",
        details: [
          "The rental share is illiquid - selling it could take months and cost fees.",
          "If Theo needs cash fast, he might be forced to sell his share at a discount.",
          "Keeping an emergency fund in a savings account would cover surprises without a fire sale.",
          "Only money he truly won't need for years belongs in an illiquid asset like property."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "alt6-aq1",
          question: "How should Theo split his $8,000 to manage liquidity risk wisely?",
          options: [
            "Put the whole entire $8,000 into the single rental share",
            "Keep an emergency fund liquid, invest the rest",
            "Spend it all so there is truly nothing left to risk",
            "Put every dollar of it into one volatile crypto token"
          ],
          correctAnswer: 1,
          explanation: "He should keep several months of expenses in a liquid emergency fund and only commit money he won't need for years to illiquid assets. Going all-in on property or crypto ignores liquidity risk."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Liquidity is how fast and cheaply you can turn an asset into fair cash.",
          "Liquidity risk is being unable to sell without a painful discount.",
          "The bid-ask spread signals liquidity - wide spreads mean illiquid assets.",
          "Illiquidity bites hardest in emergencies and downturns when buyers vanish.",
          "Keep an emergency fund liquid and demand higher returns for locking money up."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "alt6-mastery1",
            question: "Which asset is the most liquid?",
            options: [
              "A rental house out in the suburbs",
              "Shares of a big-company index fund",
              "A rare and very valuable old painting",
              "A stake held in a private buyout fund"
            ],
            correctAnswer: 1,
            explanation: "Big-company index fund shares trade constantly and can be sold in seconds at fair value. Houses, paintings, and private funds are all illiquid."
          },
          {
            id: "alt6-mastery2",
            question: "A wide bid-ask spread usually signals that an asset is…",
            options: [
              "Highly liquid and cheap to trade",
              "Illiquid and costly to trade",
              "Guaranteed to rise in value",
              "Free of any risk at all"
            ],
            correctAnswer: 1,
            explanation: "A wide gap between buy and sell prices means an asset is illiquid and costly to trade. Liquid assets have very narrow spreads."
          },
          {
            id: "alt6-mastery3",
            question: "Why do planners insist on a liquid emergency fund?",
            options: [
              "It always reliably earns you the very highest returns",
              "It provides cash without a forced fire sale",
              "It reliably doubles in value during any market crisis",
              "It fully replaces the need to ever invest at all"
            ],
            correctAnswer: 1,
            explanation: "An emergency fund gives you cash in a crisis so you never have to dump long-term holdings at a loss. It isn't about the highest return."
          },
          {
            id: "alt6-mastery4",
            question: "What can illiquidity force an investor to do in a crunch?",
            options: [
              "Sell a good investment early at a loss",
              "Automatically double all of their available cash overnight",
              "Freeze every one of their monthly bills for a full year",
              "Permanently avoid every single kind of risk forever"
            ],
            correctAnswer: 0,
            explanation: "Needing cash they can't easily raise, investors may be forced to sell solid long-term holdings early and at a loss - the opposite of patient investing."
          },
          {
            id: "alt6-mastery5",
            question: "What reward should an illiquid investment offer?",
            options: [
              "A far lower return than most liquid assets",
              "A higher expected return to compensate",
              "The exact very same return as ordinary cash",
              "A firm guarantee against any possible loss"
            ],
            correctAnswer: 1,
            explanation: "Locking up money is a real cost, so illiquid assets should offer higher expected returns to compensate. If they don't, the trade isn't worth it."
          },
          {
            id: "alt6-mastery6",
            question: "'Rich on paper' becomes a problem when…",
            options: [
              "Your assets rise much faster than you had expected",
              "You can't convert assets to cash in time",
              "You are holding far too much spare cash on hand",
              "Your emergency fund has already been fully funded"
            ],
            correctAnswer: 1,
            explanation: "Owning valuable-but-illiquid assets means nothing if you can't turn them into cash to pay real bills. That mismatch has sunk households and businesses alike."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // plan-1: Goal Setting
  // ─────────────────────────────────────────────
  {
    lessonId: "plan-1",
    sections: [
      {
        type: "concept",
        title: "Turning Vague Wishes Into Real Targets",
        paragraphs: [
          "A financial goal is a specific thing you want money to do for you by a specific date. 'I want to be rich someday' is a wish, not a goal - it gives you nothing to aim at or measure. 'I want $2,000 saved for a used car in 18 months' is a goal, because it has a number and a deadline. The difference matters enormously. A real goal tells you exactly how much to set aside each month ($2,000 over 18 months is about $111), turns a dream into a to-do list, and lets you know whether you're on track or falling behind.",
          "A popular way to sharpen goals is the SMART framework: Specific, Measurable, Achievable, Relevant, and Time-bound. Specific means naming the exact target. Measurable means attaching a number you can track. Achievable means it fits your real income - saving $500 a month on a $200 allowance won't work. Relevant means it actually matters to your life. Time-bound means it has a deadline. Run any goal through those five checks and it transforms from a fuzzy hope into a plan you can actually follow and adjust.",
          "Goals also come in different time horizons, and mixing them up causes trouble. Short-term goals (under a year, like a phone or concert tickets) should stay in safe, liquid places like a savings account. Medium-term goals (one to five years, like a car or a laptop) can take a bit more risk. Long-term goals (five-plus years, like college or eventually retirement) can ride out the ups and downs of investing. Matching each goal to the right time horizon - and the right kind of account - is the bridge between wanting something and actually funding it."
        ],
        bullets: [
          "A goal is a specific amount of money needed by a specific date.",
          "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound.",
          "Dividing the target by the months tells you how much to save each month.",
          "Short-term goals belong in safe, liquid accounts, not risky investments.",
          "Long-term goals can handle investing because they ride out market swings."
        ],
        realWorldExample: "Jordan wants a $1,200 laptop in 12 months. Splitting the goal into $100 a month makes it feel doable, and because it's a one-year goal, he keeps the money in a savings account rather than stocks, so a market dip can't wreck his plan right before he buys."
      },
      {
        type: "concept",
        title: "Prioritizing and Protecting Your Goals",
        paragraphs: [
          "Most people have more goals than money, so prioritizing is the real skill. A smart order puts safety first: build a small emergency fund before chasing fun goals, because a surprise expense can otherwise blow up everything. After that come high-interest debts, which quietly drain money faster than most investments earn it. Only then do you fund shorter-term wants and longer-term dreams. This 'safety, then debt, then goals' order isn't the flashiest, but it keeps a single bad week from wiping out months of progress.",
          "Writing goals down and tracking them dramatically increases success. A goal you keep only in your head is easy to ignore; a goal on paper with a monthly target and a running total becomes a game you can win. Many people use a simple chart or app: target amount, deadline, monthly contribution, and current balance. Watching the balance climb builds momentum, and seeing a shortfall early lets you adjust before it's a crisis. The act of measuring is often what turns a good intention into an actual result.",
          "Goals should also flex as life changes. The car you wanted at 16 might become a study-abroad fund at 18. Reviewing your goals every few months - are they still relevant, still on track, still realistic? - keeps your money pointed at what actually matters now. This isn't about rigid rules; it's about staying honest with yourself. A goal that no longer fits your life should be changed on purpose, not quietly abandoned. Deliberate, regular check-ins are what separate people who reach their targets from those who drift."
        ],
        bullets: [
          "Prioritize safety first: a small emergency fund before fun goals.",
          "Pay off high-interest debt early - it drains money faster than most gains.",
          "Write goals down with a target, deadline, and running balance.",
          "Tracking progress builds momentum and reveals shortfalls early.",
          "Review goals every few months and adjust them as life changes."
        ],
        realWorldExample: "Maya lists three goals: a $500 emergency fund, paying off a $300 credit-card balance charging 24%, and a $2,000 trip. She funds the emergency cushion and kills the 24% debt first, because that debt was costing her more each month than the trip fund could ever earn."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "plan1-mc1",
            question: "What turns a vague wish into a real financial goal?",
            options: [
              "Simply wanting it all very badly",
              "A specific amount and a deadline",
              "Telling lots of other people about it",
              "Just hoping the whole market goes up"
            ],
            correctAnswer: 1,
            explanation: "A real goal has a specific dollar amount and a specific date. That lets you calculate a monthly savings target and track whether you're on pace."
          },
          {
            id: "plan1-mc2",
            question: "Where should money for a goal you need in six months go?",
            options: [
              "A single risky and volatile stock",
              "A safe, liquid savings account",
              "A locked ten-year private equity fund",
              "A single volatile and speculative crypto token"
            ],
            correctAnswer: 1,
            explanation: "Short-term goals need safe, liquid places so a market dip can't shrink the money right before you need it. Risky assets suit only long-term goals."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leah Maps Out Her Year",
        narrative: "Leah, 17, earns $300 a month from a part-time job. She wants a $1,500 vacation next summer, a $600 emergency cushion, and she carries a $200 balance on a store card charging 25% interest. She sits down to turn these wants into a real, ordered plan instead of trying to chase all three at once.",
        details: [
          "Her store-card debt costs 25% a year, more than any safe savings could earn.",
          "A $600 emergency fund protects her from surprises that could derail everything.",
          "The $1,500 vacation is a one-year goal, so it belongs in a safe savings account.",
          "Splitting the vacation into monthly targets shows she needs about $125 saved each month."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "plan1-aq1",
          question: "Which goal should Leah tackle first, and why?",
          options: [
            "The vacation, because it's the most fun",
            "The 25% debt and emergency fund first",
            "All three equally at the same pace",
            "None - she should just spend freely"
          ],
          correctAnswer: 1,
          explanation: "Safety and high-interest debt come first: the 25% card drains money fast, and an emergency fund prevents a surprise from wrecking her plans. The vacation is funded after."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A real goal has a specific amount and a specific deadline.",
          "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound.",
          "Match each goal's time horizon to the right kind of account.",
          "Prioritize an emergency fund and high-interest debt before fun goals.",
          "Write goals down, track them, and review them as life changes."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "plan1-mastery1",
            question: "Which of these is a well-formed financial goal?",
            options: [
              "I really want to be very rich one day",
              "Save $3,000 for college in two years",
              "Make a whole lot of money somehow soon",
              "Get really good at investing sometime eventually"
            ],
            correctAnswer: 1,
            explanation: "A well-formed goal names an amount and a deadline, like $3,000 in two years. The others are vague wishes with nothing to measure or aim at."
          },
          {
            id: "plan1-mastery2",
            question: "In SMART, what does the 'T' stand for?",
            options: [
              "Trendy",
              "Time-bound",
              "Tremendous",
              "Tax-free"
            ],
            correctAnswer: 1,
            explanation: "The 'T' in SMART is Time-bound, meaning the goal has a deadline. A deadline is what lets you set a monthly savings pace."
          },
          {
            id: "plan1-mastery3",
            question: "A goal needs $2,400 in 12 months. How much per month?",
            options: [
              "About $100",
              "About $200",
              "About $300",
              "About $400"
            ],
            correctAnswer: 1,
            explanation: "$2,400 divided by 12 months is $200 a month. Breaking a big target into monthly amounts makes it concrete and trackable."
          },
          {
            id: "plan1-mastery4",
            question: "Why fund an emergency cushion before a fun goal?",
            options: [
              "Fun goals tend to earn much higher returns",
              "A surprise can otherwise wreck your plan",
              "Emergency funds are strictly required by federal law",
              "It automatically doubles all of your savings for you"
            ],
            correctAnswer: 1,
            explanation: "Without a cushion, one surprise expense can force you to abandon everything. Safety first protects all your other goals."
          },
          {
            id: "plan1-mastery5",
            question: "Why pay off a 24% credit card before investing?",
            options: [
              "Credit cards always beat the broad stock market",
              "That debt drains money faster than gains",
              "Investing is completely illegal while holding any debt",
              "Credit cards charge no interest at all ever"
            ],
            correctAnswer: 1,
            explanation: "A 24% debt costs more each year than most investments reliably earn, so paying it off is like earning a guaranteed 24% return."
          },
          {
            id: "plan1-mastery6",
            question: "How often should you review your financial goals?",
            options: [
              "Only once in your whole entire life",
              "Every few months as life changes",
              "Never at all - set and forget them",
              "Only after you completely go broke"
            ],
            correctAnswer: 1,
            explanation: "Reviewing goals every few months keeps them relevant and on track. Life changes, so goals should be adjusted on purpose rather than abandoned."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // plan-2: Retirement Accounts
  // ─────────────────────────────────────────────
  {
    lessonId: "plan-2",
    sections: [
      {
        type: "concept",
        title: "Special Accounts That Save You Taxes",
        paragraphs: [
          "Retirement accounts are special containers for your investments that come with big tax breaks, as a reward for leaving the money alone until you're older. Inside a 401(k) or an IRA you still buy investments like index funds - the account is the wrapper, not the investment itself. The magic is the tax treatment. Normally, gains and dividends can be taxed along the way, but inside these accounts your money can grow for decades without that yearly drag. Over 40 years, skipping those taxes can leave you with tens of thousands of dollars more.",
          "A 401(k) is offered through an employer. You contribute straight from your paycheck before you ever see the money, which makes saving automatic. The huge bonus is the 'employer match': many companies add money to your account based on what you put in - often 50 cents or a dollar for every dollar you contribute, up to a limit. That match is free money and an instant 50% to 100% return, which is why the first rule of retirement saving is: always contribute enough to grab the full match.",
          "An IRA (Individual Retirement Account) is one you open yourself at a brokerage, no employer needed. It has lower annual contribution limits than a 401(k) but gives you full control over what you invest in. Both account types share a catch: because the tax breaks assume you're saving for old age, pulling money out early (before about age 59) usually triggers taxes plus a 10% penalty. That restriction is the trade-off - powerful tax savings in exchange for keeping your hands off the money until retirement."
        ],
        bullets: [
          "Retirement accounts are tax-advantaged wrappers around ordinary investments.",
          "A 401(k) comes through an employer and contributions leave your paycheck automatically.",
          "An employer match is free money - always contribute enough to get the full match.",
          "An IRA is opened by you, with lower limits but full investment control.",
          "Early withdrawals before about age 59 usually trigger taxes plus a 10% penalty."
        ],
        realWorldExample: "Sam's employer matches 100% of 401(k) contributions up to 5% of pay. On a $40,000 salary, if Sam puts in 5% ($2,000), the company adds another $2,000 for free. Skipping that match would be like turning down a $2,000 raise every single year."
      },
      {
        type: "concept",
        title: "Traditional vs Roth: When You Pay Taxes",
        paragraphs: [
          "The biggest choice within these accounts is Traditional versus Roth, and it comes down to a single question: pay taxes now or later? A Traditional account gives you a tax break today - your contribution lowers this year's taxable income - but you pay taxes when you withdraw the money in retirement. A Roth is the reverse: you contribute money you've already paid tax on, get no break today, but then all future growth and withdrawals come out completely tax-free. Same investments inside; the only difference is the timing of the tax bill.",
          "For young people, a Roth is often the star. Teens and early-career workers usually earn little and pay a low tax rate now, so giving up today's small deduction is cheap. In exchange, decades of growth come out tax-free later - and that growth can be enormous. If a Roth turns $6,000 into $60,000 over 40 years, every dollar of that $54,000 gain is yours, untaxed. A Roth IRA is one of the best tools a working teen has, precisely because their tax rate today is about as low as it will ever be.",
          "The choice really hinges on comparing your tax rate now versus later. If you expect to earn much more (and be taxed more) in the future, paying the low tax now via a Roth wins. If you're in a high-earning year and expect lower income in retirement, a Traditional break today may win. Many people use both over a career to hedge. The key insight for a beginner: these aren't investments to pick, they're tax strategies to match to your situation - and starting early, in any of them, matters far more than picking the perfect one."
        ],
        bullets: [
          "Traditional = tax break now, pay taxes on withdrawals later.",
          "Roth = no break now, but all future growth and withdrawals are tax-free.",
          "Young, low-earning workers often benefit most from a Roth.",
          "The choice depends on your tax rate now versus in retirement.",
          "Starting early matters more than picking the perfect account type."
        ],
        realWorldExample: "A 16-year-old with a summer job puts $2,000 into a Roth IRA. She's in a very low tax bracket, so the give-up today is tiny. Forty years later that money might be worth $30,000, and because it's a Roth, she can withdraw all of it in retirement without owing a cent in taxes."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "plan2-mc1",
            question: "What is an employer '401(k) match'?",
            options: [
              "A loan that you must repay later with interest",
              "Free money your employer adds to your account",
              "A tax that you pay every time on your paycheck",
              "A steep penalty charged for saving far too much"
            ],
            correctAnswer: 1,
            explanation: "A match is free money your employer contributes based on what you save. Getting the full match is an instant return, so you should always grab it."
          },
          {
            id: "plan2-mc2",
            question: "How does a Roth account treat withdrawals in retirement?",
            options: [
              "They are taxed at a very high rate",
              "They come out completely tax-free",
              "They are frozen for another decade",
              "They must be repaid to the employer"
            ],
            correctAnswer: 1,
            explanation: "With a Roth, you pay tax on contributions now, so all qualified withdrawals - including decades of growth - come out tax-free later."
          }
        ]
      },
      {
        type: "scenario",
        title: "Diego's First Real Paycheck",
        narrative: "Diego, 18, just started a job that offers a 401(k) matching 50 cents per dollar up to 6% of pay. He also earns a little on the side and wonders whether to open a Roth IRA too. He's deciding how to prioritize these accounts with his limited income, wanting the smartest use of every dollar.",
        details: [
          "The 401(k) match adds 50 cents for every dollar he contributes, up to 6% of pay.",
          "That match is an instant 50% return, so grabbing it fully comes first.",
          "Because he's young and low-earning, a Roth's tax-free growth is very attractive.",
          "Pulling money out before about age 59 would trigger taxes plus a 10% penalty."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "plan2-aq1",
          question: "With limited money, what should Diego do first?",
          options: [
            "Skip the 401(k) to avoid any lock-up",
            "Contribute enough to get the full match",
            "Withdraw the money early to invest it elsewhere",
            "Put everything he has in a checking account"
          ],
          correctAnswer: 1,
          explanation: "The employer match is free money and an instant return, so getting the full match comes first. Early withdrawals just trigger penalties, and cash in checking earns nothing."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Retirement accounts are tax-advantaged wrappers around normal investments.",
          "A 401(k) is employer-based; always contribute enough to get the full match.",
          "An IRA is opened by you, with lower limits but full control.",
          "Traditional gives a break now; Roth makes future withdrawals tax-free.",
          "Young, low-earning workers often benefit most from a Roth."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "plan2-mastery1",
            question: "A retirement account is best described as…",
            options: [
              "A single stock you must buy",
              "A tax-advantaged wrapper for investments",
              "A short-term checking account",
              "A loan from the government"
            ],
            correctAnswer: 1,
            explanation: "A retirement account is a tax-advantaged container that holds investments like index funds. The account is the wrapper, not the investment itself."
          },
          {
            id: "plan2-mastery2",
            question: "Why grab a full 401(k) match before anything else?",
            options: [
              "It is free money and an instant return",
              "Employer matches are taxed at zero percent forever",
              "It completely removes all of your investment risk",
              "The employer match somehow doubles every single month"
            ],
            correctAnswer: 0,
            explanation: "A match is free money your employer adds, often a 50% to 100% instant return on what you contribute. Passing it up is like refusing a raise."
          },
          {
            id: "plan2-mastery3",
            question: "The core difference between Traditional and Roth is…",
            options: [
              "Which investments you are allowed to buy",
              "Whether you pay taxes now or later",
              "Whether the account earns any return over time",
              "How many different stocks you are able to own"
            ],
            correctAnswer: 1,
            explanation: "Traditional gives a tax break now and taxes withdrawals later; Roth is taxed now and tax-free later. The investments inside can be identical."
          },
          {
            id: "plan2-mastery4",
            question: "Why is a Roth often ideal for a working teen?",
            options: [
              "Teens are always taxed at the very highest rate",
              "Their low tax rate makes paying now cheap",
              "Roth accounts guarantee a fixed 10% yearly return",
              "Roth money can be withdrawn anytime completely free"
            ],
            correctAnswer: 1,
            explanation: "Teens usually pay a very low tax rate, so paying tax now is cheap, and decades of growth then come out tax-free. Roths don't guarantee returns."
          },
          {
            id: "plan2-mastery5",
            question: "What generally happens if you withdraw early, before about age 59?",
            options: [
              "You earn a bonus from the government",
              "You owe taxes plus a 10% penalty",
              "Nothing at all changes for you then",
              "The whole account balance suddenly just doubles"
            ],
            correctAnswer: 1,
            explanation: "Early withdrawals usually trigger income taxes plus a 10% penalty. That restriction is the trade-off for the accounts' tax advantages."
          },
          {
            id: "plan2-mastery6",
            question: "What matters most for a beginner's retirement saving?",
            options: [
              "Carefully picking the single perfect account",
              "Starting early with any of them",
              "Waiting until you earn a lot",
              "Timing the whole market absolutely perfectly"
            ],
            correctAnswer: 1,
            explanation: "Starting early lets compounding work for decades, which matters far more than choosing the perfect account type or trying to time the market."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // plan-3: Compounding
  // ─────────────────────────────────────────────
  {
    lessonId: "plan-3",
    sections: [
      {
        type: "concept",
        title: "Earning Returns on Your Returns",
        paragraphs: [
          "Compounding is what happens when your investment gains start earning gains of their own. In year one, $1,000 growing 10% earns $100. In year two, you earn 10% not on $1,000 but on $1,100 - so you make $110. The next year it's $121, then $133, and the numbers keep swelling because each year's growth is added to the base that grows next. This 'returns on returns' is the quiet engine behind almost all long-term wealth. It starts slow and looks boring, then becomes astonishing once enough years pile up.",
          "Contrast this with simple interest, where you'd earn a flat $100 every year on the original $1,000 and nothing more. Over 40 years, simple interest turns $1,000 into $5,000. But compound growth at 10% turns that same $1,000 into about $45,000 - nine times as much - without adding a single extra dollar. The entire difference is that compounding lets each year's earnings go back to work. That gap between $5,000 and $45,000 is why Einstein supposedly called compounding the most powerful force in finance.",
          "The two ingredients compounding needs are a rate of return and, above all, time. Time is the secret weapon, because compounding is exponential - the biggest gains come in the final years when the balance is huge. That's why starting young is such an enormous advantage: a teen has decades that a 40-year-old simply can't get back. Money invested at 18 has 50 years to snowball before retirement, and those extra early years often matter more than how much you invest or how clever your picks are."
        ],
        bullets: [
          "Compounding means your gains earn gains, growing the base each year.",
          "Simple interest pays a flat amount; compounding accelerates over time.",
          "$1,000 at 10% for 40 years grows to about $45,000, not $5,000.",
          "Compounding needs a return rate and, most of all, time.",
          "Starting young is a huge edge because the biggest growth comes late."
        ],
        realWorldExample: "Two friends each invest $2,000. One starts at 18 and stops at 28, never adding more. The other starts at 28 and invests $2,000 every year until 60. Because of compounding's long runway, the early starter who invested far less often ends up with more - time did the heavy lifting."
      },
      {
        type: "concept",
        title: "The Rule of 72 and Compounding's Enemies",
        paragraphs: [
          "A handy shortcut for compounding is the Rule of 72: divide 72 by your annual return to estimate how many years it takes your money to double. At 8%, money doubles about every 9 years (72 divided by 8). So $1,000 becomes $2,000 in 9 years, $4,000 in 18, $8,000 in 27, and $16,000 in 36 - each doubling adds more than the last. This rule makes the power of compounding tangible: a few doublings turn small sums into large ones, and higher returns or more time simply mean more doublings.",
          "Compounding has two great enemies: fees and inflation. Fees compound against you exactly like returns compound for you. A fund charging 2% a year instead of 0.1% doesn't just cost you 1.9% once - over 40 years that gap can quietly eat a third of your final balance, because every dollar paid in fees is a dollar that never compounds. This is why low-cost index funds are so beloved: keeping fees tiny leaves more money in the compounding machine, year after year.",
          "Inflation is the other enemy, silently shrinking what your money can buy. If your investment grows 7% but prices rise 3%, your real gain is only about 4%. Compounding still wins over the long run because good investments have historically outpaced inflation, but you must think in 'real' terms. The two lessons combine into a clear strategy: start early, keep fees low, stay invested for decades, and let compounding outrun inflation. Do that, and time turns ordinary savings into serious wealth almost on autopilot."
        ],
        bullets: [
          "Rule of 72: divide 72 by your return to find the doubling time.",
          "At 8%, money doubles roughly every nine years.",
          "Fees compound against you and can erode a third of long-term growth.",
          "Inflation shrinks buying power, so judge gains in 'real' terms.",
          "Start early, keep fees low, and stay invested to let compounding win."
        ],
        realWorldExample: "Two funds both earn 8% before costs, but one charges 0.1% and the other 2% a year. On a $10,000 investment over 40 years, the low-fee fund can end up with roughly $60,000 more than the high-fee fund - a fortune lost purely to fees that quietly compounded away."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "plan3-mc1",
            question: "What makes compounding different from simple interest?",
            options: [
              "It pays the same flat amount each year",
              "Your gains themselves start earning gains",
              "It only works for very rich people",
              "It removes all risk from investing"
            ],
            correctAnswer: 1,
            explanation: "Compounding means each year's gains are added to the base and earn their own gains. Simple interest just pays a flat amount on the original sum."
          },
          {
            id: "plan3-mc2",
            question: "Using the Rule of 72, how long to double money at 6%?",
            options: [
              "About 6 years",
              "About 12 years",
              "About 24 years",
              "About 36 years"
            ],
            correctAnswer: 1,
            explanation: "72 divided by 6 equals 12, so money doubles in about 12 years at a 6% return. The rule is a quick estimate of doubling time."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aisha Compares Two Start Dates",
        narrative: "Aisha, 16, is convinced by a chart showing two savers. Both eventually invest and earn about 8% a year, but one starts at 18 and the other waits until 30. She wants to understand why the early starter ends up so far ahead, even when they invest similar total amounts over their lives.",
        details: [
          "At 8%, money doubles roughly every nine years by the Rule of 72.",
          "The saver starting at 18 gets several extra doublings before retirement.",
          "The biggest dollar growth happens in the final years, when balances are largest.",
          "Those extra early years matter more than small differences in how much is invested."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "plan3-aq1",
          question: "Aisha invests $1,000 at 8%. Using the Rule of 72, about how much will it be in 27 years?",
          options: [
            "About $2,000",
            "About $4,000",
            "About $8,000",
            "About $16,000"
          ],
          correctAnswer: 2,
          explanation: "At 8%, money doubles about every 9 years. In 27 years that's three doublings: $1,000 to $2,000 to $4,000 to $8,000."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Compounding means your gains earn their own gains, accelerating over time.",
          "Over decades, compounding vastly outperforms simple interest.",
          "The Rule of 72 estimates doubling time: 72 divided by your return.",
          "Fees compound against you and can erode much of your long-term growth.",
          "Start early, keep fees low, and stay invested to let compounding win."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "plan3-mastery1",
            question: "Compounding is best described as…",
            options: [
              "A flat yearly payment on your savings",
              "Earning returns on your past returns",
              "A tax charged on investment gains",
              "A guarantee against losing money"
            ],
            correctAnswer: 1,
            explanation: "Compounding is earning returns on your past returns, so the base grows each year. That acceleration is what builds long-term wealth."
          },
          {
            id: "plan3-mastery2",
            question: "Why is starting young such a big advantage?",
            options: [
              "Young people get higher returns",
              "Extra years mean more doublings",
              "Taxes are waived for the young",
              "Markets never fall when you're young"
            ],
            correctAnswer: 1,
            explanation: "More years give compounding more time to double and re-double, and the largest growth comes in the final years. Time is the real edge."
          },
          {
            id: "plan3-mastery3",
            question: "At 9% return, the Rule of 72 says money doubles in about…",
            options: [
              "4 years",
              "8 years",
              "16 years",
              "24 years"
            ],
            correctAnswer: 1,
            explanation: "72 divided by 9 equals 8, so money doubles roughly every 8 years at a 9% return."
          },
          {
            id: "plan3-mastery4",
            question: "How do high fees hurt compounding?",
            options: [
              "They boost your long-term growth",
              "Each dollar paid never compounds",
              "They only matter in the first year",
              "They have no real effect over time"
            ],
            correctAnswer: 1,
            explanation: "Every dollar paid in fees is a dollar that never compounds, so over decades even a small fee gap can erode a large share of your final balance."
          },
          {
            id: "plan3-mastery5",
            question: "Why judge gains in 'real' terms?",
            options: [
              "Inflation shrinks your buying power",
              "Real terms remove all investment risk",
              "It makes returns look larger",
              "Taxes disappear in real terms"
            ],
            correctAnswer: 0,
            explanation: "Inflation reduces what money can buy, so a 7% gain with 3% inflation is really about 4%. Thinking in real terms keeps expectations honest."
          },
          {
            id: "plan3-mastery6",
            question: "Which strategy best harnesses compounding?",
            options: [
              "Wait patiently until you're much older to begin",
              "Start early, keep fees low, stay invested",
              "Trade rapidly in and out almost constantly",
              "Chase the single hottest stock each and every week"
            ],
            correctAnswer: 1,
            explanation: "Starting early, minimizing fees, and staying invested for decades gives compounding the time and room it needs to outrun inflation."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // plan-4: Inflation Adjustments
  // ─────────────────────────────────────────────
  {
    lessonId: "plan-4",
    sections: [
      {
        type: "concept",
        title: "Why Money Slowly Loses Its Power",
        paragraphs: [
          "Inflation is the gradual rise in the prices of things you buy, which means each dollar buys a little less over time. If prices rise 3% this year, a $100 grocery trip costs $103 next year for the exact same items. It feels small, but it never stops. That candy bar your grandparents bought for a nickel now costs over a dollar - same candy, weaker dollar. Inflation isn't a one-time event; it's a constant, quiet tax on cash. Planning for the future without accounting for it is like planning a road trip and ignoring that the road keeps getting longer.",
          "The danger is what inflation does to money that just sits still. Cash stuffed under a mattress doesn't shrink in number - $1,000 stays $1,000 - but its buying power erodes every year. At 3% inflation, that $1,000 buys what only about $740 would buy in ten years, and roughly $550 in twenty. So 'safe' cash is quietly losing a race you can't see. This is the core reason people invest rather than hoard: not out of greed, but to keep their money's real value from melting away over decades.",
          "Even low-yield savings can lose to inflation. If a savings account pays 1% but inflation runs 3%, your 'real' return is about negative 2% - your money grows on paper while shrinking in what it can actually buy. This is why comparing a nominal number (the raw percentage) to the inflation rate matters so much. The real return - nominal minus inflation - is what truly counts. A plan that only chases big nominal numbers while ignoring inflation is fooling itself about how much wealth it's really building."
        ],
        bullets: [
          "Inflation is the steady rise in prices, so each dollar buys less over time.",
          "Even at 3%, prices double roughly every 24 years.",
          "Idle cash keeps its number but loses buying power every year.",
          "Real return = nominal return minus inflation.",
          "A 1% savings rate with 3% inflation is a negative 2% real return."
        ],
        realWorldExample: "A movie ticket that cost about $5 in 1990 costs roughly $12 today. The ticket didn't get better - the dollar got weaker. Someone who kept $5 in cash all those years watched it go from 'one movie' to less than half a movie in buying power."
      },
      {
        type: "concept",
        title: "Building Inflation Into Your Plan",
        paragraphs: [
          "Smart planning targets buying power, not just dollar amounts. Imagine you want $40,000 a year to live on in retirement 40 years from now. At 3% inflation, you won't need $40,000 then - you'll need roughly $130,000 to buy the same lifestyle, because prices will have more than tripled. If you plan using today's number, you'll fall dramatically short. This is the single biggest planning mistake around inflation: setting a future goal in today's dollars and forgetting that the goalpost keeps moving away from you.",
          "The defense against inflation is owning assets that tend to grow faster than prices. Stocks have historically returned around 7% after inflation over the long run, because companies raise their prices and profits along with everything else. Real estate rents and property values often climb with inflation too. Bonds and cash are more vulnerable, since a fixed payment loses value as prices rise. This is why long-term plans lean on growth assets: they're the engine that keeps your wealth ahead of the ever-rising cost of living.",
          "Some tools are built specifically to fight inflation. Certain government bonds (like TIPS in the U.S.) adjust their value with inflation, and salaries, Social Security, and some pensions get 'cost-of-living adjustments' that raise payments as prices climb. When you build a plan, the habit to adopt is thinking in real terms: always ask, 'What will this actually buy?' A retirement number, a savings goal, or a raise should all be judged against inflation. Do that, and you plan for the world as it really is - one where prices never stop creeping upward."
        ],
        bullets: [
          "Plan for future buying power, not just today's dollar amounts.",
          "At 3% inflation, a future goal can be triple today's number in 40 years.",
          "Stocks and real estate tend to outpace inflation over the long run.",
          "Fixed payments like bonds and cash are more vulnerable to inflation.",
          "Some tools (TIPS, cost-of-living raises) adjust automatically for inflation."
        ],
        realWorldExample: "To have the buying power of $40,000 a year in 40 years at 3% inflation, you'd actually need about $130,000 a year. Someone who planned around the $40,000 figure would arrive at retirement with barely a third of the lifestyle they expected."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "plan4-mc1",
            question: "What does inflation do to a dollar over time?",
            options: [
              "Makes it buy more each year",
              "Makes it buy less each year",
              "Keeps its buying power fixed forever",
              "Doubles its total buying power every year"
            ],
            correctAnswer: 1,
            explanation: "Inflation is rising prices, so each dollar buys a little less every year. Idle cash keeps its number but loses buying power over time."
          },
          {
            id: "plan4-mc2",
            question: "A savings account pays 1% while inflation is 3%. Your real return is about…",
            options: [
              "Positive 4%",
              "Positive 2%",
              "Negative 2%",
              "Exactly zero"
            ],
            correctAnswer: 2,
            explanation: "Real return is nominal minus inflation: 1% minus 3% equals negative 2%. Your money grows on paper but loses buying power."
          }
        ]
      },
      {
        type: "scenario",
        title: "Omar Plans for the Future",
        narrative: "Omar, 17, decides he wants the equivalent of $30,000 a year to live on when he retires in about 40 years. He assumes inflation will average around 3% a year. He starts to realize that planning with today's dollar figure could leave him badly short, and he wants to build inflation into his thinking from the start.",
        details: [
          "At 3% inflation, prices roughly triple over 40 years.",
          "The $30,000 lifestyle would actually cost close to $95,000 a year by then.",
          "Keeping savings in cash would let inflation erode their buying power.",
          "Growth assets like stocks have historically outpaced inflation over the long run."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "plan4-aq1",
          question: "Given inflation, how should Omar hold most of his long-term retirement money?",
          options: [
            "As plain cash tucked under a mattress",
            "In growth assets like stock index funds",
            "In a simple checking account earning nothing at all",
            "Entirely in a fixed low-rate savings account"
          ],
          correctAnswer: 1,
          explanation: "Growth assets like stocks have historically outpaced inflation, protecting long-term buying power. Cash and low-rate accounts lose value to inflation over decades."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Inflation is rising prices, so each dollar buys less over time.",
          "Idle cash keeps its number but steadily loses buying power.",
          "Real return equals nominal return minus inflation.",
          "Plan for future buying power - goals can triple over 40 years.",
          "Growth assets like stocks tend to outpace inflation long term."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "plan4-mastery1",
            question: "Inflation is best defined as…",
            options: [
              "A sudden one-time drop in all stock prices",
              "The steady rise in prices over time",
              "A special tax charged on all savings accounts",
              "A fully guaranteed and steady investment return"
            ],
            correctAnswer: 1,
            explanation: "Inflation is the ongoing rise in prices, which means each dollar buys less. It isn't a stock event or a tax on savings."
          },
          {
            id: "plan4-mastery2",
            question: "What happens to idle cash during inflation?",
            options: [
              "Its number and buying power both grow",
              "Its number stays but buying power falls",
              "It automatically earns a full 3% in interest",
              "It quietly doubles in value every single year"
            ],
            correctAnswer: 1,
            explanation: "Cash keeps the same number of dollars but loses buying power as prices rise. That's why hoarding cash long term is a hidden loss."
          },
          {
            id: "plan4-mastery3",
            question: "How do you calculate a real return?",
            options: [
              "Nominal return plus inflation",
              "Nominal return minus inflation",
              "The inflation rate times two",
              "Nominal return times inflation"
            ],
            correctAnswer: 1,
            explanation: "Real return is nominal return minus inflation. It shows how much your buying power actually grew, not just the paper number."
          },
          {
            id: "plan4-mastery4",
            question: "Why can a future goal be far larger than today's number?",
            options: [
              "Because inflation raises prices over time",
              "Because interest rates almost always eventually fall",
              "Because taxes disappear in the future",
              "Because dollars gain value over time"
            ],
            correctAnswer: 0,
            explanation: "Inflation makes future prices higher, so a lifestyle costing $40,000 today could need far more later. Goals must be set in future dollars."
          },
          {
            id: "plan4-mastery5",
            question: "Which asset best helps outpace inflation long term?",
            options: [
              "Cash in a drawer",
              "Stock index funds",
              "A fixed 1% savings account",
              "A checking account"
            ],
            correctAnswer: 1,
            explanation: "Stocks have historically returned about 7% after inflation, because companies raise prices and profits. Cash and low-rate accounts lose to inflation."
          },
          {
            id: "plan4-mastery6",
            question: "What does a 'cost-of-living adjustment' do?",
            options: [
              "Lowers your pay as prices rise",
              "Raises payments as prices climb",
              "Freezes your income in place forever",
              "Removes inflation from the economy entirely"
            ],
            correctAnswer: 1,
            explanation: "A cost-of-living adjustment raises payments like salaries or Social Security as prices climb, helping income keep pace with inflation."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // plan-5: Lifestyle Planning
  // ─────────────────────────────────────────────
  {
    lessonId: "plan-5",
    sections: [
      {
        type: "concept",
        title: "Money as a Tool for the Life You Want",
        paragraphs: [
          "Lifestyle planning flips the usual money question around. Instead of asking 'how much can I earn?' it asks 'what kind of life do I actually want, and what will it cost?' Money isn't the goal - it's the fuel for the goal. Someone who dreams of travel, someone who wants a quiet home and a garden, and someone who craves a big city career all need very different financial plans. Getting clear on your real values first means your money serves your life, rather than you chasing a number that may not even make you happy.",
          "A key concept here is the difference between needs, wants, and values. Needs are the essentials - housing, food, basic transport. Wants are the extras that make life enjoyable. Values are the deeper things you care about most, like freedom, family, creativity, or security. Good lifestyle planning funds your needs, chooses wants that match your values, and cuts spending that matches neither. This is why two people with the same income can feel completely different: one spends in line with what they value, the other leaks money on things that don't matter to them.",
          "Beware 'lifestyle inflation' - the trap of raising your spending every time your income rises. Get a raise, buy a fancier car; get another raise, a bigger apartment. It feels normal, but it can keep you running in place financially no matter how much you earn. People who build real freedom often let their lifestyle grow more slowly than their income, banking the difference. That growing gap between what you earn and what you spend is the raw material of every financial goal, from a first apartment to eventual retirement."
        ],
        bullets: [
          "Lifestyle planning starts with the life you want, then works out the cost.",
          "Money is fuel for your goals, not the goal itself.",
          "Separate needs, wants, and deeper values to spend intentionally.",
          "Lifestyle inflation is raising spending every time income rises.",
          "The gap between income and spending funds every financial goal."
        ],
        realWorldExample: "Two friends earn the same salary. One values travel and drives a cheap old car so she can afford trips abroad every year. The other spends on a flashy new car he barely notices. Same income, but one funds what she loves while the other's money quietly disappears."
      },
      {
        type: "concept",
        title: "Aligning Money With Life Over Time",
        paragraphs: [
          "A life plan has to bend as life changes. The right money setup for a single 22-year-old renting an apartment is very different from that of a 35-year-old with kids and a mortgage, or a 60-year-old nearing retirement. Big life events - a career move, a family, a health change, a relocation - all reshape what your money needs to do. Good planning isn't a one-time spreadsheet; it's a habit of revisiting your goals as your life evolves, so your finances keep matching the life you're actually living rather than one you outgrew.",
          "There's also a real trade-off between spending now and freedom later. Every dollar spent today is a dollar that can't grow for the future, but a life of pure saving with zero enjoyment isn't the goal either. The healthiest plans strike a deliberate balance: cover your needs, spend meaningfully on what you truly value, and steadily invest the rest for future freedom. Finding that balance is personal - some people happily trade luxuries now for early independence, while others prefer richer living today. The key is choosing on purpose, not by accident.",
          "Ultimately, financial freedom means having enough that money stops dictating your choices. It's the point where you could handle a job loss, take a risk on a dream, or eventually stop working because your investments cover your needs. You reach it by aligning three things: a clear picture of the life you want, spending that reflects your values, and consistent investing that turns today's gap into tomorrow's options. When money and life goals point the same direction, wealth stops being about a bigger number and becomes about a freer, more deliberate life."
        ],
        bullets: [
          "A life plan must adapt as your circumstances and goals change.",
          "Big events like family or a career move reshape your money needs.",
          "Balance spending now against investing for future freedom.",
          "The right balance is personal - choose it on purpose, not by drift.",
          "Financial freedom is when money no longer dictates your choices."
        ],
        realWorldExample: "By living below her means through her twenties and investing the difference, Priya built enough that at 40 she could take a lower-paying job she loved without financial stress. Her money bought her the freedom to choose - which was the whole point of planning."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "plan5-mc1",
            question: "What question does lifestyle planning start with?",
            options: [
              "How much money can I possibly manage to earn in total?",
              "What life do I want and what will it cost?",
              "Which single stock will end up getting me rich the fastest?",
              "How can I go about spending the most money that I possibly can?"
            ],
            correctAnswer: 1,
            explanation: "Lifestyle planning begins with the life you actually want, then works out its cost. Money is fuel for that life, not the goal itself."
          },
          {
            id: "plan5-mc2",
            question: "What is 'lifestyle inflation'?",
            options: [
              "Prices steadily rising all across the whole economy",
              "Raising spending each time income rises",
              "Investing more as you earn more",
              "A special tax charged on luxury goods"
            ],
            correctAnswer: 1,
            explanation: "Lifestyle inflation is increasing your spending every time your income grows, which can keep you running in place no matter how much you earn."
          }
        ]
      },
      {
        type: "scenario",
        title: "Kayla's First Big Raise",
        narrative: "Kayla, 18, just moved from a $12-an-hour job to one paying $20 an hour. Her friends tell her to upgrade her phone, car, and apartment right away. She pauses to think about what she actually values - she dreams of traveling and one day having the freedom to switch careers without stress.",
        details: [
          "Upgrading everything at once is classic lifestyle inflation.",
          "Kayla values travel and future freedom more than a flashy car.",
          "Letting her spending rise slower than her income creates a growing gap to invest.",
          "That invested gap is what funds her travel and career-change goals later."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "plan5-aq1",
          question: "What's the wisest move for Kayla after her raise?",
          options: [
            "Spend the whole entire raise on upgrades right now",
            "Let spending rise slower and invest the gap",
            "Quit her job entirely since she now earns more",
            "Ignore her own values and just copy her friends"
          ],
          correctAnswer: 1,
          explanation: "Letting her lifestyle grow slower than her income creates a gap she can invest toward the travel and freedom she truly values. Spending it all is lifestyle inflation."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Lifestyle planning starts with the life you want, then its cost.",
          "Separate needs, wants, and values to spend on purpose.",
          "Lifestyle inflation quietly cancels out a rising income.",
          "Balance spending now against investing for future freedom.",
          "Financial freedom is when money no longer dictates your choices."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "plan5-mastery1",
            question: "In lifestyle planning, money is best seen as…",
            options: [
              "The single ultimate goal in itself",
              "Fuel for the life you want",
              "Something you should just hoard endlessly",
              "A score to beat your friends"
            ],
            correctAnswer: 1,
            explanation: "Money is fuel for your goals, not the goal. Planning starts with the life you want and figures out what it costs."
          },
          {
            id: "plan5-mastery2",
            question: "What's the difference between wants and values?",
            options: [
              "Wants are extras; values are what you care most about",
              "They are exactly one and the very same identical thing",
              "Values are the bare essentials like food, water, and rent",
              "Wants will always end up costing much more than values do"
            ],
            correctAnswer: 0,
            explanation: "Wants are enjoyable extras, while values are the deeper things you care about most, like freedom or family. Good planning funds wants that match your values."
          },
          {
            id: "plan5-mastery3",
            question: "Why is lifestyle inflation a trap?",
            options: [
              "It always lowers your yearly taxes",
              "It cancels out a rising income",
              "It somehow guarantees you much higher returns",
              "It has no effect on savings"
            ],
            correctAnswer: 1,
            explanation: "Raising spending every time income rises keeps you running in place, so you never build the gap needed to fund real goals."
          },
          {
            id: "plan5-mastery4",
            question: "Why must a life plan adapt over time?",
            options: [
              "Because plans are illegal to keep",
              "Because life events reshape money needs",
              "Because your spending should really never change",
              "Because income always stays completely flat forever"
            ],
            correctAnswer: 1,
            explanation: "Career moves, family, and other events change what your money must do, so plans need regular revisiting to stay aligned with your real life."
          },
          {
            id: "plan5-mastery5",
            question: "What funds every financial goal?",
            options: [
              "The gap between income and spending",
              "Borrowing just as much as you possibly can",
              "Spending your entire paycheck down to zero",
              "Winning a big lottery jackpot someday soon"
            ],
            correctAnswer: 0,
            explanation: "The difference between what you earn and what you spend is the raw material you invest toward every goal, from an apartment to retirement."
          },
          {
            id: "plan5-mastery6",
            question: "Financial freedom is best described as…",
            options: [
              "Owning all of the most expensive things around",
              "When money no longer dictates your choices",
              "Never spending any of your money at all ever",
              "Earning one specific and very large annual salary"
            ],
            correctAnswer: 1,
            explanation: "Financial freedom is having enough that money stops controlling your decisions, letting you handle setbacks or pursue dreams on your own terms."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // sim-1: Bear Market Survival
  // ─────────────────────────────────────────────
  {
    lessonId: "sim-1",
    sections: [
      {
        type: "concept",
        title: "What a Bear Market Really Is",
        paragraphs: [
          "A bear market is a drop of 20% or more in the broad stock market from its recent high, and it's a normal, recurring part of investing. The name comes from the way a bear swipes its paws downward. Since 1950 the U.S. market has had dozens of double-digit declines and many full bear markets, roughly one every five to six years on average. They feel scary and permanent while they're happening, but historically every single one has eventually been followed by a recovery to new highs. Knowing this is the first survival skill: crashes are events, not the end of investing.",
          "The biggest danger in a bear market usually isn't the market itself - it's the investor's own panic. When prices fall, headlines scream, and it feels obvious that selling to 'stop the bleeding' is smart. But selling in a crash locks in real losses and, worse, tends to leave people on the sidelines when the sharp rebound comes. Much of the market's best days cluster right after the worst ones, so panic-sellers often miss the recovery entirely. The uncomfortable truth is that doing nothing is frequently the hardest and smartest move.",
          "History shows how deep these can go. The 2008 financial crisis cut the market roughly in half, and the 2020 COVID crash dropped about 34% in weeks - yet both fully recovered, the 2020 one within months. Even the Great Depression's brutal decline eventually gave way to decades of growth. For a long-term investor, a bear market is essentially a sale on stocks. The key is having planned for it in advance, so that when the fear hits, you're following a strategy rather than reacting to emotion."
        ],
        bullets: [
          "A bear market is a decline of 20% or more from a recent high.",
          "Bear markets are normal, arriving roughly every five to six years.",
          "Every historical bear market has eventually recovered to new highs.",
          "The main danger is panic-selling, which locks in losses and misses the rebound.",
          "The market's best days often cluster right after the worst ones."
        ],
        realWorldExample: "In early 2020 the market fell about 34% in just over a month as COVID hit, and panic was everywhere. Investors who sold near the bottom locked in huge losses, while those who held on saw the market fully recover and reach new highs within the same year."
      },
      {
        type: "concept",
        title: "Surviving and Even Thriving in the Downturn",
        paragraphs: [
          "The foundation of bear-market survival is set up before the storm. First, keep an emergency fund in cash so you're never forced to sell investments at the bottom to pay bills. Second, only invest money you won't need for years, so time is on your side. Third, own a diversified mix rather than a few stocks, because a broad index recovers even when individual companies don't. These aren't glamorous moves, but they're what let calm investors ride out declines that wreck unprepared ones. Preparation turns a crisis into a mere inconvenience.",
          "During the downturn itself, the winning behaviors are mostly about discipline. Keep investing on a regular schedule - a practice called dollar-cost averaging - because steady buying while prices are low means you scoop up more shares cheaply. A crash can actually supercharge a long-term investor who keeps buying. Rebalancing helps too: selling a little of what held up to buy more of what fell keeps your plan on target and quietly forces you to buy low. The goal is to act on rules you set in calm times, not on fear in the moment.",
          "It also helps to zoom out and reframe. A 30% drop is terrifying on a one-year chart but nearly invisible on a 40-year one. For someone decades from needing the money, a bear market is a chance to buy the same great companies at a discount. The investors who build the most wealth are rarely the ones who dodge every crash - they're the ones who stay invested through all of them. Surviving a bear market isn't about clever timing; it's about temperament, preparation, and the patience to let recovery do its work."
        ],
        bullets: [
          "Prepare first: emergency fund, long time horizon, and diversification.",
          "Never be forced to sell at the bottom to cover living costs.",
          "Keep buying on schedule (dollar-cost averaging) to grab cheap shares.",
          "Rebalancing quietly forces you to buy low and sell high.",
          "Zoom out - a scary drop looks tiny on a decades-long chart."
        ],
        realWorldExample: "An investor who kept putting $200 a month into an index fund straight through the 2008 crash bought shares at deeply discounted prices the whole way down. When the market recovered and climbed for years after, those cheaply-bought shares turned into some of their biggest gains."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sim1-mc1",
            question: "What defines a bear market?",
            options: [
              "Any single day the whole market happens to drop at all",
              "A decline of 20% or more from a high",
              "A permanent and total end to all future market growth",
              "A sudden rise of 20% up from a recent low point"
            ],
            correctAnswer: 1,
            explanation: "A bear market is a drop of 20% or more from a recent high. It's a normal, recurring event, not a permanent end to growth."
          },
          {
            id: "sim1-mc2",
            question: "What is usually the biggest danger during a bear market?",
            options: [
              "The investor panic-selling at the bottom",
              "Owning far too diversified a broad portfolio",
              "Keeping an emergency fund in cash",
              "Holding onto your investments for too long"
            ],
            correctAnswer: 0,
            explanation: "Panic-selling locks in losses and often causes people to miss the sharp rebound. The market itself has always recovered; the behavior is the real risk."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ravi Watches His Portfolio Fall",
        narrative: "Ravi, 17, is running the InvestiPlay bear-market simulation. His virtual index-fund portfolio has dropped 28% over two months, and the news feed is full of doom. He has an emergency fund set aside, won't need this money for decades, and is deciding how to respond without panicking.",
        details: [
          "His portfolio is a diversified index fund, which has always recovered historically.",
          "He has a separate cash emergency fund, so he isn't forced to sell anything.",
          "He won't need this money for many years, so time is on his side.",
          "Continuing to invest on schedule would let him buy shares at lower prices."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sim1-aq1",
          question: "Given his situation, what is Ravi's smartest move?",
          options: [
            "Sell everything to stop the losses",
            "Stay invested and keep buying on schedule",
            "Move all his money into one hot stock",
            "Spend his emergency fund on more stocks"
          ],
          correctAnswer: 1,
          explanation: "With a long horizon, an emergency fund, and a diversified portfolio, staying invested and continuing to buy cheap shares is ideal. Selling locks in losses and draining the emergency fund is reckless."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A bear market is a 20%-plus decline and a normal part of investing.",
          "Every historical bear market has eventually recovered to new highs.",
          "Panic-selling locks in losses and risks missing the rebound.",
          "Prepare with an emergency fund, long horizon, and diversification.",
          "Keep buying on schedule to grab cheap shares during the drop."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sim1-mastery1",
            question: "How often do bear markets tend to occur?",
            options: [
              "Only one single time per entire century",
              "Roughly every five to six years",
              "Never at all in modern-day markets",
              "Multiple different times each and every month"
            ],
            correctAnswer: 1,
            explanation: "Bear markets have historically arrived roughly every five to six years. They're a normal, recurring feature of investing."
          },
          {
            id: "sim1-mastery2",
            question: "Why is panic-selling so harmful?",
            options: [
              "It guarantees you a much bigger yearly tax refund",
              "It locks in losses and misses the rebound",
              "It always somehow doubles all of your money",
              "It has no real effect at all on your returns"
            ],
            correctAnswer: 1,
            explanation: "Selling in a crash turns paper losses into real ones and often leaves you out when the sharp recovery arrives. The best days cluster near the worst."
          },
          {
            id: "sim1-mastery3",
            question: "What preparation keeps you from selling at the bottom?",
            options: [
              "A cash emergency fund",
              "Owning one single stock",
              "Borrowing money to invest",
              "Checking prices every hour"
            ],
            correctAnswer: 0,
            explanation: "An emergency fund in cash means you can cover bills without being forced to sell investments at the worst possible time."
          },
          {
            id: "sim1-mastery4",
            question: "How does regular buying during a crash help?",
            options: [
              "It avoids the whole market entirely for you",
              "It buys more cheap shares over time",
              "It guarantees you sell at the top",
              "It completely stops the market from ever falling"
            ],
            correctAnswer: 1,
            explanation: "Dollar-cost averaging means steady buying scoops up more shares while prices are low, which can supercharge long-term gains once the market recovers."
          },
          {
            id: "sim1-mastery5",
            question: "What did the 2020 COVID crash show?",
            options: [
              "Markets can never recover from any crashes",
              "A sharp drop can recover quickly",
              "Diversification always fails in a crash",
              "Cash is the only safe asset"
            ],
            correctAnswer: 1,
            explanation: "The market fell about 34% in weeks, then fully recovered within the same year - a reminder that even sharp bear markets have historically bounced back."
          },
          {
            id: "sim1-mastery6",
            question: "For a long-term investor, a bear market is essentially…",
            options: [
              "A permanent loss to fear",
              "A sale on stocks",
              "A reason to sell everything",
              "A signal to stop investing forever"
            ],
            correctAnswer: 1,
            explanation: "For someone with years to invest, falling prices are a chance to buy good companies at a discount. Staying invested through crashes builds the most wealth."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // sim-2: Bull Run Strategy
  // ─────────────────────────────────────────────
  {
    lessonId: "sim-2",
    sections: [
      {
        type: "concept",
        title: "Riding a Rising Market Wisely",
        paragraphs: [
          "A bull market is a sustained rise in stock prices, usually marked by a gain of 20% or more from a recent low. Bulls charge upward with their horns, which is where the name comes from. These are the good times: since 1950 bull markets have lasted a few years on average and have historically been longer and stronger than the bear markets that separate them. That's the whole reason investing works - the market spends more time rising than falling. But bull markets also breed overconfidence, and how you behave during them shapes your results as much as how you behave in crashes.",
          "The winning strategy in a bull market is often surprisingly boring: stay invested and let it ride. Because the biggest single-day gains are impossible to predict and often cluster together, being out of the market even briefly can cost a huge share of your returns. Studies show that missing just the ten best days over decades can cut your total gains roughly in half. So the simplest, most powerful bull-market move is to keep your money working and resist the urge to constantly jump in and out trying to be clever.",
          "The great temptation of a bull market is greed. When everything is going up, it's easy to feel like a genius, pour in more than you should, chase whatever's hottest, or abandon your plan for a 'sure thing.' This is exactly how people set themselves up to get hurt when the bull eventually turns. Discipline in good times means sticking to your strategy, not letting a run of luck convince you that risk has disappeared. The market rewards patience, but it punishes the overconfidence that bull markets quietly encourage."
        ],
        bullets: [
          "A bull market is a sustained rise, often 20% or more from a low.",
          "Bull markets have historically been longer and stronger than bear markets.",
          "Staying fully invested captures the unpredictable best days.",
          "Missing just the ten best days over decades can halve your returns.",
          "Bull markets breed greed and overconfidence - discipline matters."
        ],
        realWorldExample: "From 2009 to 2020 the U.S. market climbed for over a decade in one of history's longest bull runs. An investor who simply stayed in the whole time multiplied their money, while those who kept hopping out to 'wait for a dip' often missed enormous gains."
      },
      {
        type: "concept",
        title: "Staying Grounded When Everything Goes Up",
        paragraphs: [
          "Even in a bull market, the fundamentals of good investing don't change. Diversification still matters - a rising tide lifts most boats, but concentrating everything in one hot stock or sector leaves you dangerously exposed when the mood shifts. Rebalancing becomes especially useful: as your winners grow, they can become an outsized part of your portfolio, so periodically trimming them back to your target locks in some gains and keeps your risk in check. It feels odd to sell what's winning, but it's how disciplined investors avoid being over-concentrated at the top.",
          "A specific bull-market trap is chasing bubbles. Sometimes a run stops being about real value and becomes pure hype, with prices detached from what companies actually earn - think the dot-com bubble of 1999 or various crypto manias. These end painfully. The warning signs include everyone suddenly being an 'expert,' stories of easy overnight riches, and the fear of missing out driving prices. Recognizing that not every rising asset is a good investment - some are just late-stage hype - is a crucial skill for protecting the gains a bull market gives you.",
          "The healthiest bull-market mindset treats the good times as an opportunity to build steadily, not gamble recklessly. Keep contributing on schedule, stay diversified, rebalance to manage risk, and resist the pull of the hottest fad. It also helps to quietly prepare for the eventual downturn - keeping your emergency fund intact and your plan realistic - so the next bear market finds you ready. Bull markets create most of investors' wealth, but keeping that wealth requires the discipline to not throw it away chasing more when everyone else is euphoric."
        ],
        bullets: [
          "Diversification still matters even when almost everything is rising.",
          "Rebalancing trims oversized winners and keeps your risk on target.",
          "Beware bubbles - hype-driven prices detached from real earnings.",
          "Warning signs include easy-riches stories and widespread FOMO.",
          "Use good times to build steadily and prepare for the next downturn."
        ],
        realWorldExample: "In 1999 the dot-com bubble sent internet stocks soaring on hype alone, and people who chased them felt brilliant - until the crash in 2000 erased trillions. Investors who stayed diversified and skipped the mania protected far more of their wealth."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sim2-mc1",
            question: "What is a bull market?",
            options: [
              "A drop of 20% or more from a high",
              "A sustained rise in stock prices",
              "A single day the market goes up",
              "A permanent guarantee of gains"
            ],
            correctAnswer: 1,
            explanation: "A bull market is a sustained rise in prices, often marked by a 20%-plus gain from a recent low. It isn't a one-day move or a guarantee."
          },
          {
            id: "sim2-mc2",
            question: "Why is staying fully invested powerful in a bull market?",
            options: [
              "It completely removes all of your investment risk",
              "The best days are unpredictable and clustered",
              "It guarantees you buy at the very bottom",
              "It lets you skip diversification altogether for good"
            ],
            correctAnswer: 1,
            explanation: "The market's biggest gains cluster on a few unpredictable days. Missing even the ten best over decades can roughly halve your total returns."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sofia During a Roaring Market",
        narrative: "Sofia, 18, is in the InvestiPlay bull-run simulation. Her diversified portfolio is up 40% over the past year, and a hot tech stock everyone's talking about has tripled. Friends in the sim are moving all their money into it. Sofia feels the pull but wants to stay disciplined and think it through.",
        details: [
          "Her diversified portfolio has grown steadily along with the broad market.",
          "The hot stock's price seems driven more by hype than by real earnings.",
          "Piling everything into one stock would leave her dangerously concentrated.",
          "Rebalancing would let her trim big winners and keep her risk on target."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sim2-aq1",
          question: "What's the disciplined move for Sofia in this bull market?",
          options: [
            "Put everything into the hot stock",
            "Stay diversified and rebalance as planned",
            "Sell all her stocks and hold cash",
            "Borrow money to buy more of the fad"
          ],
          correctAnswer: 1,
          explanation: "Staying diversified and rebalancing captures gains while managing risk. Chasing one hyped stock or borrowing to buy a fad is how investors get hurt when the bull turns."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A bull market is a sustained rise, historically longer than bear markets.",
          "Staying fully invested captures the unpredictable best days.",
          "Bull markets breed greed - discipline protects your gains.",
          "Diversify and rebalance even when almost everything is rising.",
          "Beware hype-driven bubbles and prepare for the eventual downturn."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sim2-mastery1",
            question: "Compared to bear markets, bull markets have historically been…",
            options: [
              "Much shorter and weaker",
              "Longer and stronger",
              "Exactly the same length",
              "Nonexistent since 1950"
            ],
            correctAnswer: 1,
            explanation: "Bull markets have historically lasted longer and produced larger gains than bear markets. That's the core reason long-term investing works."
          },
          {
            id: "sim2-mastery2",
            question: "What happens if you miss the market's ten best days over decades?",
            options: [
              "Your returns can be roughly halved",
              "Your total returns actually end up improving",
              "Nothing at all changes for you there",
              "You manage to avoid all of the future risk"
            ],
            correctAnswer: 0,
            explanation: "The best days are few and unpredictable, so missing just the top ten over decades can cut total returns roughly in half. Staying invested captures them."
          },
          {
            id: "sim2-mastery3",
            question: "What emotion most threatens investors in a bull market?",
            options: [
              "Greed and overconfidence",
              "Boredom with easy gains",
              "Fear of rising prices",
              "Sadness about profits"
            ],
            correctAnswer: 0,
            explanation: "Rising prices breed greed and overconfidence, tempting people to over-invest, chase fads, and abandon their plans right before a downturn."
          },
          {
            id: "sim2-mastery4",
            question: "Why rebalance during a bull market?",
            options: [
              "To trim oversized winners and control risk",
              "To sell absolutely everything and just hold cash",
              "To guarantee that the market always keeps rising",
              "To completely avoid ever making any profit at all"
            ],
            correctAnswer: 0,
            explanation: "As winners grow, they can dominate your portfolio. Rebalancing trims them back to target, locking in some gains and keeping your risk in check."
          },
          {
            id: "sim2-mastery5",
            question: "A key warning sign of a bubble is…",
            options: [
              "Prices matching real company earnings",
              "Stories of easy overnight riches",
              "Widespread caution among most investors",
              "Falling prices across the board"
            ],
            correctAnswer: 1,
            explanation: "Bubbles feature hype, easy-riches stories, and FOMO driving prices far above real earnings. The dot-com bubble is a classic example that ended painfully."
          },
          {
            id: "sim2-mastery6",
            question: "The healthiest bull-market mindset is to…",
            options: [
              "Gamble it all on the single hottest fad",
              "Build steadily and prepare for a downturn",
              "Sell every one of your investments right now",
              "Simply assume that all risk has now disappeared"
            ],
            correctAnswer: 1,
            explanation: "Use good times to invest steadily, diversify, rebalance, and keep your emergency fund ready, so the next bear market finds you prepared."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // sim-3: Sector Rotation
  // ─────────────────────────────────────────────
  {
    lessonId: "sim-3",
    sections: [
      {
        type: "concept",
        title: "How Different Parts of the Market Take Turns",
        paragraphs: [
          "The stock market is divided into sectors - groups of companies in the same line of business, like technology, healthcare, energy, financials, and consumer staples. Sector rotation is the idea that different sectors tend to do better at different points in the economic cycle. When the economy shifts from booming to slowing to recovering, money tends to flow from one group of sectors to another. Understanding this helps explain why 'the market' can be flat while some sectors soar and others sink - they're rarely all moving in the same direction at once.",
          "The economic cycle has rough phases, and each tends to favor certain sectors. Early in a recovery, when confidence returns, economically-sensitive sectors like technology and consumer discretionary (cars, travel, gadgets) often lead, because people start spending again. Late in a boom, energy and materials can shine as demand peaks. When the economy slows or fears a recession, investors shift toward 'defensive' sectors like utilities, healthcare, and consumer staples - the things people need no matter what, like electricity and toothpaste. This rotation reflects how spending patterns change with the times.",
          "The distinction between cyclical and defensive sectors is the heart of it. Cyclical sectors - tech, autos, luxury goods, travel - boom when the economy is strong and slump hard when it weakens, because their products are things people buy when they feel rich. Defensive sectors - utilities, staples, healthcare - hold up better in downturns because their products are necessities. Neither is 'better'; they simply take turns leading. Recognizing which is which helps you understand market news and why a portfolio spread across sectors is steadier than one bet on a single group."
        ],
        bullets: [
          "Sectors are groups of companies in the same business, like tech or energy.",
          "Different sectors lead at different points in the economic cycle.",
          "Cyclical sectors (tech, autos, travel) boom in strong economies.",
          "Defensive sectors (utilities, staples, healthcare) hold up in downturns.",
          "Rotation reflects how spending patterns shift over the cycle."
        ],
        realWorldExample: "During the 2020 lockdowns, tech and home-delivery stocks soared while airlines and hotels collapsed. As reopening arrived in 2021, the money rotated the other way - travel and energy surged while some pandemic winners cooled. Same market, different sectors leading in each phase."
      },
      {
        type: "concept",
        title: "The Promise and Peril of Rotating",
        paragraphs: [
          "The appeal of sector rotation is obvious: if you could reliably move into the sector about to lead and out of the one about to lag, you'd beat the market handily. Some professional managers build entire strategies around reading economic signals - interest rates, employment, inflation - to guess the next phase. In theory, riding the strongest sector through each stage of the cycle could produce big returns. This promise is why sector rotation gets so much attention in financial media, and why the InvestiPlay simulation lets you experiment with it.",
          "The peril is that consistently timing rotations is extremely hard, even for experts. The economy doesn't announce its phases in advance, and markets often move before the economic data confirms anything - stocks are forward-looking. By the time a shift is obvious in the news, the sector move has usually already happened. Chasing last quarter's winning sector is a classic mistake that often means buying high right before that sector cools. Studies show most active sector-timers underperform a simple diversified portfolio after their trading costs and mistakes.",
          "For most investors, especially beginners, the practical lesson is humility. Rather than trying to jump between sectors, owning a broad, diversified portfolio means you automatically hold whichever sector is leading at any time, without needing to predict the turns. If you want to tilt slightly toward a sector you understand, keep it a small part of the whole. Sector rotation is fascinating to understand and useful for interpreting the news, but as a trading strategy it's a trap for the overconfident - the simulation is the safe place to learn that lesson."
        ],
        bullets: [
          "In theory, riding the leading sector each phase would beat the market.",
          "In practice, timing rotations consistently is extremely hard.",
          "Markets move before the news confirms the economic shift.",
          "Chasing last quarter's winning sector often means buying high.",
          "A broad, diversified portfolio holds the leaders automatically."
        ],
        realWorldExample: "An investor notices energy stocks had a great year and pours money in, only to watch them cool off just as a new sector takes the lead. Meanwhile, a friend who simply held a diversified index fund owned all the sectors and quietly captured whichever one was rising."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sim3-mc1",
            question: "What is a market 'sector'?",
            options: [
              "A single individual company's publicly traded common stock",
              "A group of companies in the same business",
              "A particular type of long-term U.S. government bond",
              "A common statistical measure of the overall inflation rate"
            ],
            correctAnswer: 1,
            explanation: "A sector is a group of companies in the same line of business, like technology or energy. Different sectors tend to lead at different points in the cycle."
          },
          {
            id: "sim3-mc2",
            question: "Which are considered defensive sectors?",
            options: [
              "Utilities, staples, and healthcare",
              "Technology and luxury goods",
              "Airlines and travel companies",
              "Automakers and gadget makers"
            ],
            correctAnswer: 0,
            explanation: "Defensive sectors like utilities, consumer staples, and healthcare sell necessities, so they hold up better in downturns. Tech, travel, and autos are cyclical."
          }
        ]
      },
      {
        type: "scenario",
        title: "Malik Tries to Rotate",
        narrative: "Malik, 17, is using the InvestiPlay sector-rotation simulation. The news feed shows the economy slowing and possibly heading into a recession. Energy stocks had a great run last quarter, and he's tempted to pile in. He pauses to think about which sectors actually tend to hold up when the economy weakens.",
        details: [
          "The simulated economy is slowing, a phase that often favors defensive sectors.",
          "Defensive sectors like utilities and staples sell necessities people always need.",
          "Energy is cyclical and may cool as the economy weakens, despite last quarter's run.",
          "Chasing last quarter's winner often means buying right before it cools."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sim3-aq1",
          question: "As the simulated economy slows, which shift fits sector-rotation logic?",
          options: [
            "Chase last quarter's hot energy stocks",
            "Lean toward defensive sectors like utilities",
            "Put everything into one travel stock",
            "Sell all sectors and hold only cash"
          ],
          correctAnswer: 1,
          explanation: "In a slowdown, defensive sectors selling necessities tend to hold up best. Chasing last quarter's winner or piling into a cyclical travel stock ignores the cycle."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Sectors are groups of similar companies that take turns leading.",
          "Cyclical sectors boom in strong economies; defensive ones hold up in weak ones.",
          "Rotation reflects how spending shifts across the economic cycle.",
          "Timing rotations consistently is extremely hard, even for experts.",
          "A broad, diversified portfolio holds the leading sectors automatically."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sim3-mastery1",
            question: "Sector rotation is the idea that…",
            options: [
              "All of the sectors always move together",
              "Different sectors lead at different cycle phases",
              "Sectors will never once change in value",
              "Only the technology stocks really matter here"
            ],
            correctAnswer: 1,
            explanation: "Sector rotation is the pattern of different sectors leading at different points in the economic cycle as spending and conditions shift."
          },
          {
            id: "sim3-mastery2",
            question: "Cyclical sectors like autos and travel tend to…",
            options: [
              "Boom in strong economies, slump in weak ones",
              "Stay completely flat no matter what happens at all",
              "Do their very best during deep recessions",
              "Never once be affected at all by the economy"
            ],
            correctAnswer: 0,
            explanation: "Cyclical sectors sell things people buy when they feel prosperous, so they boom in strong economies and slump hard when the economy weakens."
          },
          {
            id: "sim3-mastery3",
            question: "Why do defensive sectors hold up in downturns?",
            options: [
              "They sell necessities people always need",
              "They are guaranteed by the government",
              "They only exist during recessions",
              "They pay no attention to the economy"
            ],
            correctAnswer: 0,
            explanation: "Defensive sectors like utilities and staples sell essentials such as electricity and food, which people keep buying even in hard times."
          },
          {
            id: "sim3-mastery4",
            question: "Why is timing sector rotations so hard?",
            options: [
              "Sectors never once actually change at all",
              "Markets move before the news confirms shifts",
              "The economy clearly announces each phase well in advance",
              "All of the experts fully agree on the exact timing"
            ],
            correctAnswer: 1,
            explanation: "Stocks are forward-looking, so sector moves often happen before economic data confirms them. By the time a shift is obvious, the move has usually occurred."
          },
          {
            id: "sim3-mastery5",
            question: "Chasing last quarter's winning sector often results in…",
            options: [
              "Buying high right before it cools",
              "Fully guaranteed long-term outperformance every time",
              "Truly zero risk of any loss at all",
              "Perfectly and precisely timed profits every single time"
            ],
            correctAnswer: 0,
            explanation: "A sector that just soared is often near its peak, so chasing it frequently means buying high just before it cools - a classic timing mistake."
          },
          {
            id: "sim3-mastery6",
            question: "What's the practical approach for most investors?",
            options: [
              "Jump between sectors constantly",
              "Hold a broad, diversified portfolio",
              "Bet everything on one sector",
              "Only own cash to be safe"
            ],
            correctAnswer: 1,
            explanation: "A diversified portfolio automatically holds whichever sector is leading, so you capture the rotations without needing to predict them."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // sim-4: Crisis Response
  // ─────────────────────────────────────────────
  {
    lessonId: "sim-4",
    sections: [
      {
        type: "concept",
        title: "When the Unexpected Hits the Market",
        paragraphs: [
          "A market crisis is a sudden, unexpected shock - a pandemic, a war, a bank collapse, a surprise policy change - that sends prices lurching, often violently, in a short time. Unlike a slow bear market, a crisis arrives fast and feels chaotic. The 2020 COVID crash, the 2008 banking meltdown, and sudden geopolitical shocks all sent markets plunging within days. What makes crises so dangerous for investors isn't only the price drop; it's that fear spikes and the pressure to 'do something right now' becomes overwhelming, tempting people into rushed decisions they'll regret.",
          "The single most important crisis skill is to slow down. In a genuine emergency your instinct is to act fast, but in investing, fast reactions during a panic are usually wrong. Markets often overreact to shocks in the first days, plunging further than the actual news justifies, then partially bouncing once the initial fear fades. Selling into that first wave of panic frequently means dumping at the worst moment. A pre-set plan - knowing in advance how you'll respond - lets you act on logic instead of adrenaline when the headlines are screaming.",
          "It also helps to separate temporary shocks from permanent changes. Most crises, however scary, are temporary disruptions the economy eventually absorbs and recovers from - COVID markets recovered within months. A few represent genuine lasting shifts. But even experts struggle to tell which is which in the moment, which is exactly why a diversified, long-term investor doesn't need to guess. Their plan already assumes crises will happen. The goal in a crisis isn't to predict the outcome perfectly; it's to avoid the panic-driven mistakes that turn a temporary drop into a permanent loss."
        ],
        bullets: [
          "A crisis is a sudden, unexpected shock that jolts prices fast.",
          "Fear spikes and the urge to 'do something now' becomes overwhelming.",
          "Markets often overreact in the first days, then partially bounce.",
          "Selling into the first panic wave usually means selling at the worst time.",
          "A pre-set plan lets you act on logic instead of adrenaline."
        ],
        realWorldExample: "When COVID hit in March 2020, markets plunged about 34% in weeks as panic peaked. Investors who froze and stuck to their plans watched a full recovery within months, while those who sold in the first days of chaos often locked in steep losses at the bottom."
      },
      {
        type: "concept",
        title: "A Playbook for Staying Steady",
        paragraphs: [
          "The best crisis response is prepared long before the crisis. The same foundations that survive a bear market apply here: an emergency fund so you're never forced to sell, a diversified portfolio so no single shock ruins you, and a long time horizon so temporary drops don't matter. On top of that, write down your plan in calm times - exactly what you'll do if the market drops 10%, 20%, or 30%. When the shock comes, you follow the script instead of inventing a panicked reaction. Preparation converts terror into a checklist.",
          "During the crisis itself, a few rules keep you safe. First, avoid checking prices obsessively - constant monitoring amplifies fear and pushes you toward rash trades. Second, keep any automatic investing going, since crises often create the best buying opportunities in years. Third, be extremely wary of anyone offering a 'crisis-proof' guaranteed investment; scams and bad advice multiply when people are frightened. The disciplined investor treats a crisis as a test of temperament, and the passing grade is usually to stick with the plan and tune out the noise.",
          "Finally, know the difference between reacting and responding. Reacting is emotional and immediate - selling everything because a scary headline hit. Responding is deliberate - reviewing whether anything about your long-term situation has genuinely changed, and usually concluding it hasn't. If your goals are still years away and your portfolio is still diversified, a crisis rarely warrants dramatic action. The investors who come through crises best aren't the ones who guessed the news right; they're the ones who stayed calm, avoided forced selling, and let time and diversification do their work."
        ],
        bullets: [
          "Prepare before a crisis: emergency fund, diversification, long horizon.",
          "Write your plan in calm times so you follow a script, not panic.",
          "Avoid obsessively checking prices, which amplifies fear.",
          "Beware 'crisis-proof' guarantees - scams thrive on fear.",
          "Respond deliberately rather than reacting emotionally."
        ],
        realWorldExample: "During a banking scare, one investor sold everything the instant the news broke and locked in losses; another calmly checked her plan, saw her goals were still a decade away, and did nothing. Months later the market had steadied, and the calm investor was far ahead."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sim4-mc1",
            question: "What makes a market crisis especially dangerous for investors?",
            options: [
              "Prices can only ever rise during one",
              "Fear spikes and pressures rushed decisions",
              "It always lasts for many decades",
              "It removes the need for any plan"
            ],
            correctAnswer: 1,
            explanation: "Crises spike fear and create overwhelming pressure to act immediately, tempting investors into rushed decisions they'll regret. The panic is often worse than the drop."
          },
          {
            id: "sim4-mc2",
            question: "Why is selling into the first wave of a crisis usually a mistake?",
            options: [
              "Markets often overreact then partially bounce",
              "Selling always triggers a huge tax bill",
              "Prices never move during a crisis",
              "It guarantees you buy back higher"
            ],
            correctAnswer: 0,
            explanation: "Markets tend to overreact in the first days, plunging further than the news justifies, then partially recovering. Selling into that panic often means dumping at the worst moment."
          }
        ]
      },
      {
        type: "scenario",
        title: "Elena Faces a Sudden Shock",
        narrative: "Elena, 18, is in the InvestiPlay crisis simulation when a surprise event sends her portfolio down 22% in three days. The news feed is frantic, and other players are dumping everything. She has a written plan, an emergency fund, and goals that are years away. She's deciding how to respond.",
        details: [
          "The drop happened in just three days, a classic sudden crisis pattern.",
          "Markets often overreact in the first days before partially bouncing.",
          "Elena's emergency fund means she isn't forced to sell anything now.",
          "Her written plan tells her exactly how to respond to a 20% drop."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sim4-aq1",
          question: "Following good crisis practice, what should Elena do?",
          options: [
            "Sell off everything to match the other players",
            "Follow her written plan and stay calm",
            "Buy a 'crisis-proof' guaranteed product right away",
            "Check prices every few minutes all day"
          ],
          correctAnswer: 1,
          explanation: "The disciplined response is to follow the plan written in calm times and avoid panic. Copying panicked sellers, chasing guarantees, or obsessive checking all lead to rash mistakes."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A crisis is a sudden shock that jolts prices and spikes fear fast.",
          "Markets often overreact early, then partially bounce.",
          "Slow down - rushed reactions during panic are usually wrong.",
          "Prepare beforehand: emergency fund, diversification, written plan.",
          "Respond deliberately instead of reacting emotionally."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sim4-mastery1",
            question: "How does a crisis differ from a slow bear market?",
            options: [
              "It arrives suddenly and feels chaotic",
              "It always lasts longer than a decade",
              "It only affects a single stock",
              "It never causes prices to fall"
            ],
            correctAnswer: 0,
            explanation: "A crisis is a sudden, unexpected shock that jolts prices fast and chaotically, unlike the slower grind of a typical bear market."
          },
          {
            id: "sim4-mastery2",
            question: "What is the single most important crisis skill?",
            options: [
              "Reacting as fast as possible",
              "Slowing down before acting",
              "Selling off everything immediately",
              "Checking all the prices constantly"
            ],
            correctAnswer: 1,
            explanation: "Slowing down is key, because fast reactions during panic are usually wrong. Markets often overreact, so patience beats haste."
          },
          {
            id: "sim4-mastery3",
            question: "What tool best lets you act on logic during a crisis?",
            options: [
              "A plan written in calm times",
              "A hot tip from social media",
              "A guaranteed and totally crisis-proof product",
              "Constant and obsessive daily price monitoring"
            ],
            correctAnswer: 0,
            explanation: "A plan written in advance lets you follow a script instead of adrenaline when headlines scream. It converts panic into a checklist."
          },
          {
            id: "sim4-mastery4",
            question: "Why be wary of 'crisis-proof' guaranteed investments?",
            options: [
              "They always beat the broad market every time",
              "Scams multiply when people are frightened",
              "They are backed by the government",
              "They carry no fees at all"
            ],
            correctAnswer: 1,
            explanation: "Fear makes people vulnerable, so scams and bad advice multiply during crises. Guarantees offered in a panic are major red flags."
          },
          {
            id: "sim4-mastery5",
            question: "What's the difference between reacting and responding?",
            options: [
              "Reacting is emotional; responding is deliberate",
              "They mean exactly the same thing",
              "Responding is always much faster than reacting",
              "Reacting is always the smarter choice"
            ],
            correctAnswer: 0,
            explanation: "Reacting is an emotional, immediate move like panic-selling. Responding is a deliberate review of whether anything real has changed - usually concluding it hasn't."
          },
          {
            id: "sim4-mastery6",
            question: "What did the 2020 COVID crash teach about crises?",
            options: [
              "Markets can never recover from any shocks",
              "Even sharp shocks can recover quickly",
              "Panic-selling is always the very safest choice",
              "Diversification only makes everything much worse"
            ],
            correctAnswer: 1,
            explanation: "The market fell about 34% in weeks then recovered within months, showing that even sharp crises are often temporary for a patient, diversified investor."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // sim-5: Retirement Simulation
  // ─────────────────────────────────────────────
  {
    lessonId: "sim-5",
    sections: [
      {
        type: "concept",
        title: "The Shift From Saving to Spending",
        paragraphs: [
          "Retirement flips a lifetime of investing on its head. For decades you're in the 'accumulation' phase - adding money and watching it grow. In retirement you enter the 'decumulation' phase, where you stop adding and start withdrawing to live on. This is trickier than it sounds. Now you have to make a pile of money last, possibly for 30 years or more, without knowing exactly how long you'll live or what markets will do. Spending too fast risks running out; spending too cautiously means missing out on the life your savings were meant to fund.",
          "A famous rule of thumb is the '4% rule.' It suggests that if you withdraw about 4% of your savings in the first year of retirement, then adjust that amount for inflation each year after, your money is likely to last around 30 years. So a $500,000 nest egg would support roughly $20,000 in the first year. It's only a guideline, not a guarantee, but it captures the core idea: there's a sustainable withdrawal rate, and pulling out much more than that dramatically raises the risk of running dry too soon.",
          "The great enemy of a long retirement is the same force that built your wealth: it just works in reverse. Inflation keeps raising your cost of living for 30 years, so your withdrawals must grow over time to buy the same things. Meanwhile, you can't invest as aggressively as when you were young, because a big crash early in retirement - when you're also withdrawing - can permanently damage the plan. Balancing growth, safety, and steady income becomes the central challenge, which is exactly what a retirement simulation lets you practice."
        ],
        bullets: [
          "Retirement shifts you from adding money to withdrawing it.",
          "The challenge is making savings last 30 years or more.",
          "The 4% rule suggests withdrawing about 4% the first year, adjusted for inflation.",
          "A $500,000 nest egg supports roughly $20,000 in year one under that rule.",
          "Inflation keeps raising costs, so withdrawals must grow over time."
        ],
        realWorldExample: "A retiree with $600,000 uses the 4% rule and withdraws about $24,000 the first year. Because inflation runs around 3%, she raises it to roughly $24,700 the next year to keep the same buying power, and continues adjusting each year so her income keeps pace with prices."
      },
      {
        type: "concept",
        title: "Sequence Risk and Making Money Last",
        paragraphs: [
          "One subtle danger in retirement is 'sequence-of-returns risk' - the order in which good and bad years arrive matters enormously once you're withdrawing. Two retirees can experience the same average return over 30 years, but if one hits a big crash in the first few years while pulling money out, they can run out while the other thrives. That's because selling investments to live on during a downturn locks in losses and leaves less to recover. This is why the years right around retirement are the most financially delicate of your life.",
          "The main defenses are diversification and a cash cushion. Retirees typically hold a mix of stocks for growth and bonds for stability, shifting somewhat more conservative than in their working years but still keeping stocks to outpace inflation over a long retirement. Many also keep a year or two of spending in cash, so that in a bad market they can draw from cash instead of selling stocks at the bottom. This buffer directly combats sequence risk, letting the stock portion recover before it's touched.",
          "Flexibility is the final tool. The 4% rule assumes steady withdrawals, but real retirees can adjust - trimming spending a bit in bad years and enjoying more in good ones dramatically improves the odds their money lasts. A retirement simulation makes all of this tangible: you can test different withdrawal rates, market sequences, and asset mixes and watch how the balance holds up or collapses over 30 years. The lesson it teaches is powerful - a comfortable retirement is less about one perfect number and more about a resilient, adaptable plan."
        ],
        bullets: [
          "Sequence risk: the order of good and bad years matters when withdrawing.",
          "A crash early in retirement, while withdrawing, is especially damaging.",
          "Retirees mix stocks for growth with bonds for stability.",
          "Keeping a year or two of cash avoids selling stocks at the bottom.",
          "Flexible spending in good and bad years helps money last."
        ],
        realWorldExample: "Two retirees both average 6% over 30 years, but one suffers a crash in year two while withdrawing and the other enjoys calm early years. Despite identical averages, the unlucky-sequence retiree can run out of money years earlier - a stark lesson in sequence risk."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sim5-mc1",
            question: "What does the '4% rule' suggest?",
            options: [
              "Save exactly 4% of all your income while you are still working",
              "Withdraw about 4% the first year, then adjust for inflation",
              "Earn exactly 4% every single year for the rest of your life",
              "Pay a flat 4% in management fees every single year forever"
            ],
            correctAnswer: 1,
            explanation: "The 4% rule suggests withdrawing about 4% of savings the first year, then adjusting for inflation, aiming to make money last around 30 years."
          },
          {
            id: "sim5-mc2",
            question: "What is sequence-of-returns risk?",
            options: [
              "The steady danger that your fees will keep rising each and every year",
              "The order of good and bad years mattering when withdrawing",
              "The unlikely risk that all inflation suddenly just stops entirely for good",
              "The slim chance that stocks will always beat bonds no matter what"
            ],
            correctAnswer: 1,
            explanation: "Sequence risk is that the order of returns matters when you're withdrawing: a crash early in retirement can drain savings even if the long-run average is fine."
          }
        ]
      },
      {
        type: "scenario",
        title: "Grandpa Joe's Retirement Sim",
        narrative: "In the InvestiPlay retirement simulation, Priya, 17, manages a virtual retiree named Joe who has $500,000 and needs the money to last 30 years. The simulation throws a market crash at him in the second year while he's withdrawing. She's deciding how to manage his withdrawals and asset mix to keep him solvent.",
        details: [
          "Under the 4% rule, Joe's first-year withdrawal is about $20,000.",
          "The early crash creates sequence risk, the most dangerous timing for a retiree.",
          "Joe keeps a year of spending in cash, so he can avoid selling stocks at the bottom.",
          "Trimming his spending slightly during the bad year helps his money last."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sim5-aq1",
          question: "When the crash hits in year two, what's Priya's best move for Joe?",
          options: [
            "Sell off all of his stocks right at the bottom",
            "Draw from cash and trim spending a bit",
            "Double his yearly withdrawals so he can spend more",
            "Move every single dollar he has into one hot stock"
          ],
          correctAnswer: 1,
          explanation: "Drawing from the cash cushion avoids selling stocks at the bottom, and trimming spending in a bad year fights sequence risk. Selling low or overspending would endanger the plan."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Retirement shifts you from adding money to withdrawing it.",
          "The 4% rule is a guideline for a sustainable withdrawal rate.",
          "Inflation means withdrawals must grow over a long retirement.",
          "Sequence risk makes an early crash especially dangerous.",
          "A cash cushion and flexible spending help savings last."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sim5-mastery1",
            question: "The 'decumulation' phase means…",
            options: [
              "Adding money to your savings",
              "Withdrawing money to live on",
              "Avoiding all investing entirely for good",
              "Doubling all of your regular contributions"
            ],
            correctAnswer: 1,
            explanation: "Decumulation is the retirement phase where you stop adding and start withdrawing from your savings to fund your living costs."
          },
          {
            id: "sim5-mastery2",
            question: "Under the 4% rule, a $400,000 nest egg supports about how much in year one?",
            options: [
              "$4,000",
              "$16,000",
              "$40,000",
              "$100,000"
            ],
            correctAnswer: 1,
            explanation: "4% of $400,000 is $16,000 for the first year, then adjusted for inflation each year after. It aims to last roughly 30 years."
          },
          {
            id: "sim5-mastery3",
            question: "Why must retirement withdrawals grow over time?",
            options: [
              "Because inflation raises the cost of living",
              "Because stocks will always fall every single year",
              "Because all of the fees just disappear over time",
              "Because you spend less as you age"
            ],
            correctAnswer: 0,
            explanation: "Inflation keeps raising prices over a 30-year retirement, so withdrawals must increase to maintain the same buying power."
          },
          {
            id: "sim5-mastery4",
            question: "Why is a crash early in retirement so damaging?",
            options: [
              "Withdrawing during it locks in losses",
              "It has no effect on the plan",
              "It guarantees much higher future returns later",
              "It stops all inflation permanently for good"
            ],
            correctAnswer: 0,
            explanation: "Selling investments to live on during an early crash locks in losses and leaves less to recover - the heart of sequence-of-returns risk."
          },
          {
            id: "sim5-mastery5",
            question: "How does a cash cushion help retirees?",
            options: [
              "It fully guarantees that the whole market rises",
              "It avoids selling stocks at the bottom",
              "It removes the need to diversify at all",
              "It somehow doubles all of their yearly withdrawals"
            ],
            correctAnswer: 1,
            explanation: "Keeping a year or two of spending in cash lets retirees draw from cash in a downturn instead of selling stocks low, giving the stock portion time to recover."
          },
          {
            id: "sim5-mastery6",
            question: "What makes a retirement plan resilient?",
            options: [
              "Carefully picking one single perfect withdrawal number",
              "Diversification, a cash buffer, and flexibility",
              "Holding only one single individual stock",
              "Withdrawing as much as possible early"
            ],
            correctAnswer: 1,
            explanation: "A resilient plan combines a diversified mix, a cash cushion, and flexible spending - adapting to markets rather than relying on one perfect number."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // sim-6: Balanced Portfolio Build
  // ─────────────────────────────────────────────
  {
    lessonId: "sim-6",
    sections: [
      {
        type: "concept",
        title: "The Blueprint of a Balanced Portfolio",
        paragraphs: [
          "A balanced portfolio is a deliberate mix of different investments designed to grow your money while smoothing out the ride. The most important decision isn't which stock to pick - it's your 'asset allocation,' the split between broad categories like stocks, bonds, and cash. Studies famously show that this allocation drives the large majority of a portfolio's long-term results, far more than individual stock picks. Building a portfolio starts with deciding these proportions on purpose, based on your goals and how much bumpiness you can stomach, rather than just collecting random investments.",
          "The main building blocks each play a role. Stocks are the growth engine - historically the highest long-term returns, but with the biggest swings. Bonds are the stabilizer - lower returns, but steadier, and they often hold up when stocks fall. Cash is the safety and liquidity layer for near-term needs. Within stocks, you diversify further across many companies, sectors, and even countries, usually through low-cost index funds that own hundreds or thousands of holdings at once. The aim is that when one part struggles, another part cushions the blow.",
          "Your ideal mix depends heavily on your time horizon and risk tolerance. A teenager investing for 40 years can hold mostly stocks, because decades of time let them ride out crashes for higher growth - a common guideline is a stock-heavy 80% or 90% allocation when young. Someone near retirement shifts toward more bonds for stability. There's no single 'right' portfolio, only the right one for your situation. The key insight is that risk and reward are linked: more stocks mean more expected growth but a wilder ride, and the balance you choose should match the sleep-at-night level you can actually handle."
        ],
        bullets: [
          "Asset allocation - your split of stocks, bonds, and cash - drives most results.",
          "Stocks are the growth engine; bonds stabilize; cash covers near-term needs.",
          "Diversify within stocks across many companies, sectors, and countries.",
          "A long time horizon allows a heavier stock allocation.",
          "There's no single right mix - only the right one for your situation."
        ],
        realWorldExample: "A simple balanced portfolio might be 80% in a global stock index fund and 20% in a bond fund. That single pair spreads money across thousands of companies worldwide plus steadier bonds, giving strong long-term growth with a somewhat gentler ride than all stocks."
      },
      {
        type: "concept",
        title: "Diversification and Keeping It on Track",
        paragraphs: [
          "Diversification is the closest thing investing has to a free lunch. By spreading money across many holdings that don't all move together, you reduce the damage any single failure can do without necessarily lowering your expected return. If you owned one company and it collapsed, you could lose everything; if you own an index of 500 companies, one failure barely registers. This is why a broad index fund is the backbone of most balanced portfolios - it delivers instant diversification across an entire market for a tiny fee, something no beginner could assemble by hand.",
          "Once built, a portfolio needs occasional maintenance through rebalancing. Over time, your winners grow and quietly throw your mix off target - an 80/20 stock-bond split might drift to 90/10 after a strong stock run, leaving you riskier than you intended. Rebalancing means periodically selling a bit of what grew and buying what lagged to return to your target percentages. It sounds counterintuitive, but it quietly enforces 'buy low, sell high' and keeps your risk where you want it. Doing this once or twice a year is usually plenty.",
          "The final ingredient is discipline over decades. A great portfolio ruined by panic-selling in a crash or chasing fads in a boom is worse than a mediocre one held steadily. The most successful investors pick a sensible allocation, use low-cost diversified funds, rebalance occasionally, keep costs low, and then largely leave it alone to compound. A portfolio-building simulation lets you test different allocations against real market history and see how a balanced, disciplined approach beats frantic tinkering. The takeaway is empowering: you don't need to be a genius to build wealth, just balanced and patient."
        ],
        bullets: [
          "Diversification cuts risk without necessarily lowering expected return.",
          "A broad index fund gives instant diversification for a tiny fee.",
          "Rebalancing returns a drifted portfolio to its target mix.",
          "Rebalancing quietly enforces buying low and selling high.",
          "Discipline over decades matters more than any clever pick."
        ],
        realWorldExample: "After a booming year, Jordan's target 70/30 stock-bond mix has drifted to 80/20. He sells a slice of stocks and buys bonds to get back to 70/30 - trimming his best performers and quietly buying low, keeping his risk exactly where he planned it."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sim6-mc1",
            question: "What is 'asset allocation'?",
            options: [
              "Picking out the single best stock around",
              "Your split among stocks, bonds, and cash",
              "The yearly fee that a fund charges you",
              "The exact day you finally plan to retire"
            ],
            correctAnswer: 1,
            explanation: "Asset allocation is how you divide money among broad categories like stocks, bonds, and cash. It drives most of a portfolio's long-term results."
          },
          {
            id: "sim6-mc2",
            question: "Why can a young investor hold mostly stocks?",
            options: [
              "Stocks simply never fall at all when you are young",
              "Decades of time let them ride out crashes",
              "Bonds are completely illegal for all teens to own",
              "Stocks always pay out a fixed and guaranteed return"
            ],
            correctAnswer: 1,
            explanation: "A long time horizon lets a young investor ride out crashes and capture stocks' higher long-term growth. Stocks still swing and never guarantee returns."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tara Builds Her First Portfolio",
        narrative: "Tara, 17, is using the InvestiPlay portfolio-builder simulation. She's investing virtual money she won't 'need' for 40 years and wants strong long-term growth she can hold through crashes. She's choosing an allocation and deciding how to keep it on track over the simulated decades.",
        details: [
          "Her 40-year horizon lets her hold a stock-heavy allocation for growth.",
          "A broad global index fund gives her instant diversification across thousands of companies.",
          "Adding some bonds would smooth the ride during downturns.",
          "Rebalancing once a year would keep her mix from drifting off target."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sim6-aq1",
          question: "Given her long horizon, which allocation best fits Tara?",
          options: [
            "All cash to avoid any risk",
            "Mostly stocks with some bonds",
            "One single hot stock",
            "All bonds for maximum safety"
          ],
          correctAnswer: 1,
          explanation: "With 40 years to invest, a stock-heavy mix with some bonds captures growth while smoothing the ride. All cash or all bonds would badly lag; one stock is undiversified."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Asset allocation - your stock/bond/cash split - drives most results.",
          "Stocks grow, bonds stabilize, and cash covers near-term needs.",
          "Diversification cuts risk without lowering expected return.",
          "Rebalancing returns a drifted portfolio to its target mix.",
          "Discipline over decades matters more than any clever pick."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sim6-mastery1",
            question: "What drives most of a portfolio's long-term results?",
            options: [
              "Picking the single best stock",
              "Your overall asset allocation",
              "Watching prices every day",
              "Timing the market perfectly"
            ],
            correctAnswer: 1,
            explanation: "Studies show asset allocation - the split among stocks, bonds, and cash - drives the large majority of long-term results, far more than individual picks."
          },
          {
            id: "sim6-mastery2",
            question: "What role do bonds play in a balanced portfolio?",
            options: [
              "They are the main growth engine",
              "They stabilize and steady the ride",
              "They guarantee absolutely huge yearly returns",
              "They replace the need for cash"
            ],
            correctAnswer: 1,
            explanation: "Bonds are the stabilizer: lower returns but steadier, and they often hold up when stocks fall, smoothing the overall ride."
          },
          {
            id: "sim6-mastery3",
            question: "Why is diversification called a 'free lunch'?",
            options: [
              "It cuts risk without lowering expected return",
              "It guarantees you a solid profit every single year",
              "It removes the need to ever invest",
              "It automatically doubles all of your money for you"
            ],
            correctAnswer: 0,
            explanation: "Spreading money across many holdings reduces the damage any single failure can do without necessarily lowering expected return - a rare win-win."
          },
          {
            id: "sim6-mastery4",
            question: "What does rebalancing do?",
            options: [
              "Returns a drifted portfolio to its target mix",
              "Guarantees that the whole market always rises steadily",
              "Removes every last one of the bonds from a portfolio",
              "Picks out the very next hot stock just for you"
            ],
            correctAnswer: 0,
            explanation: "Rebalancing sells a bit of what grew and buys what lagged to restore your target percentages, quietly enforcing buy-low, sell-high and controlling risk."
          },
          {
            id: "sim6-mastery5",
            question: "How does a broad index fund help a beginner?",
            options: [
              "It guarantees beating the market",
              "It gives instant diversification cheaply",
              "It focuses all money in one stock",
              "It removes the need for a plan"
            ],
            correctAnswer: 1,
            explanation: "A broad index fund owns hundreds or thousands of companies for a tiny fee, giving instant diversification a beginner couldn't assemble alone."
          },
          {
            id: "sim6-mastery6",
            question: "What matters most for building wealth over decades?",
            options: [
              "Finding one genius stock pick",
              "A balanced, disciplined, patient approach",
              "Trading in and out constantly",
              "Chasing whatever is hottest now"
            ],
            correctAnswer: 1,
            explanation: "A sensible allocation, low-cost diversified funds, occasional rebalancing, and patience beat frantic tinkering. You don't need genius, just discipline."
          }
        ]
      }
    ]
  },
]
