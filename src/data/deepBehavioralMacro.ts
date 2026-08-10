import { StructuredLessonContent } from "@/types"

// Deepened lesson content (Mortgages-depth rebuild) for: behavioral-finance, bubbles-crashes, macro-economics, economic-indicators
// Each entry replaces the thin auto-generated version for its lessonId.
export const deepBehavioralMacro: StructuredLessonContent[] = [
  // ═══════════════════════════════════════════════
  // BEHAVIORAL FINANCE (behavior-1 .. behavior-8)
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // behavior-1: Loss Aversion
  // ─────────────────────────────────────────────
  {
    lessonId: "behavior-1",
    sections: [
      {
        type: "concept",
        title: "Why Losing $20 Hurts More Than Finding $20 Feels Good",
        paragraphs: [
          "Imagine you find a $20 bill on the sidewalk - a nice little boost to your day. Now imagine that instead, a $20 bill falls out of your pocket and is gone forever. Most people feel the loss much more sharply than the gain. Psychologists Daniel Kahneman and Amos Tversky measured this and found that, on average, losses feel about twice as painful as equivalent gains feel good. That lopsided reaction has a name: loss aversion. It's not that you're bad at math - your brain is simply wired to treat threats to what you already have as more urgent than chances to gain more.",
          "Loss aversion made sense for our ancestors, where losing a day's food could mean starvation while an extra snack was just nice to have. But in investing, this ancient instinct backfires. Because a loss stings twice as much, people go to strange lengths to avoid 'realizing' one. A teen who buys a stock at $100 and watches it drop to $70 often refuses to sell, insisting, 'I'll wait until it comes back to $100.' They aren't reacting to the company's actual future - they're refusing to accept a loss that already happened on paper.",
          "The danger is that loss aversion pushes people to make the exact wrong trades. Studies of real brokerage accounts show investors sell their winners too early (to 'lock in' a gain and avoid the risk of losing it) while clinging to their losers far too long (to avoid feeling the loss). This pattern, called the disposition effect, is loss aversion in action. Recognizing that a $70 stock is worth $70 today - regardless of what you paid - is the first step to making decisions based on the future, not on the emotional weight of your original price."
        ],
        bullets: [
          "Loss aversion: losses feel roughly twice as painful as equal-sized gains feel good.",
          "It's an ancient survival instinct, not a sign you're bad with money.",
          "It makes investors hold losing stocks too long, hoping to avoid 'realizing' the loss.",
          "The disposition effect: selling winners too early and clinging to losers too long.",
          "A stock is worth its current price, not the price you originally paid for it."
        ],
        realWorldExample: "In experiments, people offered a coin flip that pays $10 for heads but costs $10 for tails usually refuse - it feels like a bad deal even though it's even odds. To get most people to accept, the payout for winning often has to rise to around $20, roughly double the potential loss. That 2-to-1 ratio is loss aversion measured in dollars."
      },
      {
        type: "concept",
        title: "How Loss Aversion Traps Everyday Decisions",
        paragraphs: [
          "Loss aversion doesn't only strike big investors - it shapes small choices too. Think about a 'free 30-day trial' that quietly starts charging you. Once the service feels like yours, cancelling feels like a loss, so many people keep paying for things they barely use. Companies know this. So do casinos, which hand out 'free' chips: once the chips feel like yours, losing them hurts, so you keep playing to avoid the sting. The feeling of already owning something makes us overvalue it, a cousin of loss aversion called the endowment effect.",
          "The instinct also makes people take foolish risks to avoid a certain loss. Suppose you're down $500 at a poker table near closing time. Loss aversion whispers, 'One big bet could make you whole.' So you gamble on long odds you'd never accept if you were even. This is why people 'chase losses' - the pain of locking in the $500 loss feels worse than the risk of losing even more. Casinos, day-trading apps, and sports-betting sites are all designed around this predictable human flaw.",
          "The fix is not to ignore your emotions - that's impossible - but to build rules that protect you from them. Investors set a plan before they buy: 'I'll sell if the reasons I bought this stop being true,' rather than 'I'll sell when I break even.' Framing choices around the future ('Would I buy this stock today at $70?') instead of the past ('I paid $100') strips away the emotional anchor. When you notice yourself refusing to let go of something purely because giving it up feels like a loss, that's your cue to pause and check whether the decision actually makes sense."
        ],
        bullets: [
          "The endowment effect: once something feels like yours, you overvalue it and hate giving it up.",
          "Free trials and 'free' casino chips exploit loss aversion to keep you paying or playing.",
          "'Chasing losses' is taking bad risks just to avoid locking in a loss you already have.",
          "A written plan set before you buy protects you from emotional selling later.",
          "Ask 'Would I buy this today?' to judge decisions by the future, not the past price."
        ],
        realWorldExample: "A gambler down $500 at 1 a.m. bets it all on a long shot to 'get even,' something they'd never do if they were breaking even. Sports-betting apps flash 'get your money back' promos at exactly these moments, because they know loss aversion makes people bet more, not less, when they're behind."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "behavior1-mc1",
            question: "According to research, how do losses feel compared to equivalent gains?",
            options: [
              "About half as intense as gains for most people",
              "Roughly twice as painful as gains feel good",
              "Exactly the same as gains, no measurable difference",
              "Only painful when the amounts are unusually large"
            ],
            correctAnswer: 1,
            explanation: "Kahneman and Tversky found losses feel roughly twice as painful as equal gains feel good. This 2-to-1 ratio is the core of loss aversion."
          },
          {
            id: "behavior1-mc2",
            question: "What is the 'disposition effect'?",
            options: [
              "Selling winners too early and holding losers too long",
              "Buying only stocks that recently rose sharply in price",
              "Refusing to ever sell any stock you have bought",
              "Always disposing of your whole portfolio at once each month"
            ],
            correctAnswer: 0,
            explanation: "The disposition effect is loss aversion in action: investors lock in gains early but cling to losing stocks to avoid feeling the loss."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jordan Refuses to Sell",
        narrative: "Jordan, 17, used $200 of birthday money to buy a stock at $100 a share. Bad news about the company came out, and the shares dropped to $70. A newer, stronger company now looks like a much better buy, but Jordan won't sell. 'I'm not selling until it gets back to $100,' Jordan insists, 'I don't want to lose money.'",
        details: [
          "The shares are worth $70 today, no matter what Jordan originally paid for them.",
          "Refusing to sell until $100 ties the decision to the past price, not the company's real future.",
          "Loss aversion makes 'realizing' the $30-per-share loss feel worse than the risk of holding a weak stock.",
          "The better question is: 'Knowing what I know now, would I buy this stock today at $70?'"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "behavior1-aq1",
          question: "What is the BEST way for Jordan to make this decision rationally?",
          options: [
            "Wait for the stock to climb back to the $100 purchase price he paid",
            "Judge the stock on its future prospects, ignoring the $100 he paid",
            "Sell right away because the price dropped, since falling stocks nearly always keep falling",
            "Buy more shares now to lower his average cost and force a quicker recovery"
          ],
          correctAnswer: 1,
          explanation: "The $100 he paid is a 'sunk cost' - it's gone and shouldn't drive the decision. Jordan should ask whether he'd buy the stock today at $70 based on its future, not chase his old purchase price."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Loss aversion means losses feel about twice as painful as equal gains feel good.",
          "It's an ancient survival instinct that misfires in modern money decisions.",
          "It causes the disposition effect: selling winners early and holding losers too long.",
          "The endowment effect and 'chasing losses' are close relatives that exploit the same wiring.",
          "Judge decisions by the future, not by the price you originally paid."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "behavior1-mastery1",
            question: "Which pair of psychologists first measured loss aversion?",
            options: [
              "Warren Buffett and Charlie Munger",
              "Daniel Kahneman and Amos Tversky",
              "Adam Smith and John Keynes",
              "Benjamin Graham and David Dodd"
            ],
            correctAnswer: 1,
            explanation: "Kahneman and Tversky's research on loss aversion helped launch behavioral economics; Kahneman later won a Nobel Prize for this work."
          },
          {
            id: "behavior1-mastery2",
            question: "Why did loss aversion likely evolve in humans?",
            options: [
              "Because losing resources once threatened survival more than gains helped",
              "Because early humans were natural investors who traded animal herds",
              "Because it makes math problems easier to solve under pressure",
              "Because it helps people save money on the taxes they owe"
            ],
            correctAnswer: 0,
            explanation: "For ancestors, losing food or shelter could be deadly, while an extra bit was just a bonus. Treating losses as urgent was a survival advantage that now misfires in investing."
          },
          {
            id: "behavior1-mastery3",
            question: "A 'free trial' that starts charging you exploits which bias?",
            options: [
              "Confirmation bias about the product's true underlying quality",
              "The endowment effect, a cousin of loss aversion",
              "Overconfidence in your own monthly budgeting skills lately",
              "Herd behavior among the other paying subscribers online"
            ],
            correctAnswer: 1,
            explanation: "Once the service feels like yours, cancelling feels like a loss (the endowment effect), so people keep paying for things they barely use."
          },
          {
            id: "behavior1-mastery4",
            question: "'Chasing losses' means…",
            options: [
              "Tracking your losses carefully in a spreadsheet you update every single night",
              "Taking bigger risks to avoid locking in a loss you already have",
              "Selling everything the moment prices fall, then buying it all back much higher",
              "Refusing to ever invest again after one bad trade scared you off completely for good"
            ],
            correctAnswer: 1,
            explanation: "Chasing losses is making risky bets purely to avoid the pain of realizing a loss - like a gambler betting big to 'get even.' It usually deepens the hole."
          },
          {
            id: "behavior1-mastery5",
            question: "Which question best strips loss aversion out of a selling decision?",
            options: [
              "How much did I originally pay for this stock?",
              "Would I buy this today at its current price?",
              "How long have I already owned this particular stock?",
              "How much exactly did it drop over this week?"
            ],
            correctAnswer: 1,
            explanation: "Asking whether you'd buy it today at the current price forces a forward-looking judgment and ignores the emotionally loaded purchase price."
          },
          {
            id: "behavior1-mastery6",
            question: "A written plan made before buying a stock mainly helps by…",
            options: [
              "Guaranteeing the stock will rise steadily in value over time",
              "Setting rules that protect you from emotional selling later",
              "Eliminating all investment risk entirely from your whole portfolio",
              "Letting you avoid paying any taxes on the gains you make"
            ],
            correctAnswer: 1,
            explanation: "A pre-set plan ('sell if my reasons stop being true') keeps decisions rational when emotions and loss aversion later try to take over."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // behavior-2: Anchoring
  // ─────────────────────────────────────────────
  {
    lessonId: "behavior-2",
    sections: [
      {
        type: "concept",
        title: "The First Number You Hear Sticks",
        paragraphs: [
          "Anchoring is the brain's habit of latching onto the first piece of information it sees and using it as a reference point for everything after - even when that first number is random or irrelevant. In a famous experiment, researchers spun a wheel rigged to land on either 10 or 65, then asked people what percentage of countries in the United Nations were African. People who saw 10 guessed about 25%; people who saw 65 guessed about 45%. A meaningless spin of a wheel dragged their answers up or down. That's how powerful an anchor is.",
          "In money, anchors are everywhere and often planted on purpose. A jacket tagged 'was $200, now $80' feels like a steal - but only because $200 anchored your sense of its value. Without that first number, you might think $80 is expensive. Car dealers open with a high 'sticker price' so the final number feels like a win. Restaurants put one ultra-expensive dish on the menu to make the $30 entrees look reasonable. In each case, the seller controls the anchor, and your brain quietly negotiates down from their number instead of up from what the item is truly worth.",
          "Investing is riddled with anchors. The most common is your own purchase price: buy a stock at $50 and your brain treats $50 as the 'real' value forever, even if the business has changed completely. Analyst 'price targets,' a stock's 52-week high, and round numbers like Bitcoin '$100,000' all act as anchors that make prices feel cheap or expensive relative to an arbitrary reference. The value of a company depends on its future earnings, not on a number that happens to be stuck in your head."
        ],
        bullets: [
          "Anchoring: the first number you see becomes a reference point for later judgments.",
          "Even random, irrelevant numbers can pull your estimates up or down.",
          "Sellers plant anchors: 'was $200, now $80,' high sticker prices, one costly menu item.",
          "In investing, your purchase price and a stock's 52-week high are common anchors.",
          "A company's value comes from its future earnings, not an arbitrary reference number."
        ],
        realWorldExample: "In the UN-percentage study, people who saw '65' on the rigged wheel guessed about 45%, while those who saw '10' guessed about 25%. The wheel had nothing to do with geography - yet it moved answers by 20 points. That's a clean measurement of anchoring pulling judgments toward a random number."
      },
      {
        type: "concept",
        title: "How to Spot and Beat Anchors",
        paragraphs: [
          "Anchoring is sneaky because it feels like reasoning. When you talk yourself down from a car dealer's $30,000 sticker to $27,000, it feels like you 'saved' $3,000 - but the car may only be worth $24,000. You anchored on the dealer's number, not the car's fair value. The same trap catches shoppers on sale days: a '40% off' sign makes people buy things they'd never consider at full price, because the crossed-out number, not the item's usefulness, is driving the decision. The anchor hijacks the comparison you use to judge whether something is a good deal.",
          "The defense is to find your own independent reference point before the seller gives you one. Before shopping for a phone, decide what features you need and roughly what similar phones cost from several sources. Before buying a stock, estimate what the business is worth based on its earnings and growth, then compare that to the price - rather than comparing the price to what you paid or to its recent high. Doing your own homework replaces the seller's anchor with a fair one.",
          "You can also test whether an anchor is fooling you by mentally throwing out the first number. Ask: 'If I'd never seen the original price, would I pay this?' If a $200-marked-down-to-$80 jacket wouldn't tempt you at a plain $80 price, the 'discount' is doing the persuading, not the value. Professionals fight anchoring by writing down their own estimate of value before they look at the market price, so the market can't plant the first number in their head. Awareness alone doesn't erase anchoring, but a good independent reference point makes it far weaker."
        ],
        bullets: [
          "Anchoring feels like reasoning, which is why it's so easy to miss.",
          "'Saving' $3,000 off a sticker price is meaningless if the item is worth even less.",
          "Beat anchors by finding your own reference point before the seller supplies one.",
          "For stocks, estimate value from earnings and growth, not from your purchase price.",
          "Test yourself: 'If I'd never seen the first number, would I still pay this?'"
        ],
        realWorldExample: "Retailers famously run 'sales' where the 'original' price was never really charged - the item was designed to be sold at the 'discount.' Regulators have fined stores for this, because the fake high anchor tricks shoppers into feeling they got a deal on something priced exactly where the store always wanted it."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "behavior2-mc1",
            question: "What is anchoring?",
            options: [
              "Refusing to ever change any of your investments once you have first picked them all",
              "Relying too heavily on the first number you see as a reference point",
              "Buying only well-known, large, stable companies that pay a steady annual dividend to holders",
              "Spreading money across many different assets to keep your overall risk low"
            ],
            correctAnswer: 1,
            explanation: "Anchoring is over-relying on the first piece of information (often a number) as a reference for later judgments, even when that number is arbitrary."
          },
          {
            id: "behavior2-mc2",
            question: "Why does a jacket marked 'was $200, now $80' feel like a great deal?",
            options: [
              "Because $80 is always objectively cheap for any winter jacket",
              "Because the $200 anchor makes $80 seem low by comparison",
              "Because jackets from big brands are always overpriced by exactly that amount",
              "Because sales prices are legally required to be fair to shoppers"
            ],
            correctAnswer: 1,
            explanation: "The $200 is an anchor. Your brain judges $80 relative to it, so the jacket feels cheap - even if $80 is more than the jacket is really worth."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya and the 'Discounted' Sneakers",
        narrative: "Priya sees sneakers online marked 'Originally $150 - Today Only $90!' She doesn't really need new sneakers, but the deal feels too good to pass up, so she almost buys them. Her friend asks a simple question: 'Would you pay $90 for those if there were no crossed-out price?' Priya pauses.",
        details: [
          "The $150 'original' price is an anchor that makes $90 feel cheap by comparison.",
          "The real question is whether the sneakers are worth $90 to her, not how big the 'discount' is.",
          "Retailers sometimes inflate 'original' prices specifically to create this anchoring effect.",
          "Stripping away the first number ('Would I pay $90 anyway?') reveals whether it's truly a good buy."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "behavior2-aq1",
          question: "What is the smartest way for Priya to decide?",
          options: [
            "Buy them right away because a full 40% off a popular sneaker rarely ever comes around",
            "Ignore the '$150' and ask if $90 is worth it for sneakers she needs",
            "Wait patiently until they're marked down even further before the season is completely over",
            "Buy two identical pairs at once to maximize the total discount she gets"
          ],
          correctAnswer: 1,
          explanation: "The '$150' is just an anchor. Priya should judge whether $90 is a fair price for sneakers she actually needs, ignoring the crossed-out number entirely."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Anchoring makes the first number you see the reference point for later judgments.",
          "Even random numbers can pull estimates up or down, as the UN-wheel study showed.",
          "Sellers plant anchors with sticker prices, fake 'original' prices, and pricey menu items.",
          "In investing, purchase price and 52-week highs are anchors that distort value.",
          "Beat anchors by setting your own independent reference point before the seller does."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "behavior2-mastery1",
            question: "In the classic experiment, what caused people's UN-percentage guesses to differ?",
            options: [
              "Their detailed knowledge of world geography and maps",
              "A random number from a rigged spinning wheel",
              "Their exact age and their overall education level",
              "The specific order in which the questions were asked"
            ],
            correctAnswer: 1,
            explanation: "A rigged wheel showing 10 or 65 dragged answers down or up, proving even a clearly irrelevant number can anchor judgments."
          },
          {
            id: "behavior2-mastery2",
            question: "A car dealer opens with a high $30,000 sticker price mainly to…",
            options: [
              "Cover the true cost of building and shipping the car to the lot",
              "Anchor you high so a lower final price feels like a win",
              "Follow a strict government pricing rule that every dealer must obey by law",
              "Discourage you from buying the car at all unless you truly need one"
            ],
            correctAnswer: 1,
            explanation: "The high sticker is an anchor. Negotiating down from it feels like a victory even if the final price is still above the car's fair value."
          },
          {
            id: "behavior2-mastery3",
            question: "Which is a common anchor in stock investing?",
            options: [
              "The main color used in the company's logo",
              "The price you originally paid for the stock",
              "The CEO's first name and their birthday month",
              "The exact number of full-time employees on staff"
            ],
            correctAnswer: 1,
            explanation: "Your purchase price often becomes an anchor, making you treat it as the 'real' value even after the business has changed."
          },
          {
            id: "behavior2-mastery4",
            question: "What is the best defense against anchoring when shopping?",
            options: [
              "Always trust the seller's own suggested price",
              "Set your own independent reference point beforehand",
              "Buy quickly before the big sale ends",
              "Assume higher-priced items are always better made"
            ],
            correctAnswer: 1,
            explanation: "Deciding what something is worth to you, based on your own research, replaces the seller's anchor with a fair reference point."
          },
          {
            id: "behavior2-mastery5",
            question: "A menu lists one $80 steak among $25-$35 dishes. The pricey steak likely exists to…",
            options: [
              "Cover the restaurant's monthly rent all by itself",
              "Anchor high so the $30 dishes seem reasonable",
              "Guarantee at least one big sale per night",
              "Meet a strict local health-code requirement set by the city"
            ],
            correctAnswer: 1,
            explanation: "A single very expensive item anchors diners high, making the mid-priced entrees feel like sensible bargains by comparison."
          },
          {
            id: "behavior2-mastery6",
            question: "Which question best tests whether an anchor is fooling you?",
            options: [
              "How big is the discount taken from the original listed sticker price?",
              "If I never saw the first price, would I still pay this?",
              "Is this really the single cheapest option found anywhere in the store?",
              "Does nearly everyone else in the store seem to be buying it?"
            ],
            correctAnswer: 1,
            explanation: "Mentally deleting the first number reveals whether the 'deal' is real value or just the anchor doing the persuading."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // behavior-3: Confirmation Bias
  // ─────────────────────────────────────────────
  {
    lessonId: "behavior-3",
    sections: [
      {
        type: "concept",
        title: "Seeing Only What You Already Believe",
        paragraphs: [
          "Confirmation bias is the tendency to seek, notice, and remember information that agrees with what you already believe, while ignoring or dismissing anything that challenges it. Once you form an opinion - about a person, a team, or a stock - your brain becomes a lawyer defending that opinion instead of a scientist testing it. You Google 'why this stock will go up,' not 'why this stock might fail.' You remember the one time your hunch was right and forget the three times it was wrong. The belief feels stronger and stronger, even if the evidence doesn't actually support it.",
          "This bias is turbocharged by the internet. Social media feeds and search results are built to show you more of what you already engage with, creating an 'echo chamber' where your view seems universal. A teen convinced that a certain meme stock or crypto coin is going to the moon can find endless posts, videos, and forums cheering it on - and none of the warnings, because the algorithm learned they don't click those. The person feels well-researched, but they've really just collected a pile of agreement. Volume of supporting opinions is not the same as quality of evidence.",
          "In investing, confirmation bias is expensive. If you own a stock, you're emotionally motivated to believe you were right, so you downplay bad earnings ('just a temporary blip') and celebrate good news ('see, I knew it!'). This keeps people in failing investments long after a neutral observer would have walked away. The professionals who avoid this trap deliberately go looking for the strongest arguments against their own positions - a practice sometimes called 'steelmanning the other side' - precisely because their instincts push them the other way."
        ],
        bullets: [
          "Confirmation bias: favoring information that agrees with your existing beliefs.",
          "Your brain acts like a lawyer defending a view, not a scientist testing it.",
          "Algorithms create echo chambers that make your opinion seem universally shared.",
          "Owning a stock makes you downplay bad news and overweight good news about it.",
          "A pile of agreeing opinions is not the same as strong, balanced evidence."
        ],
        realWorldExample: "During meme-stock frenzies, online forums fill with thousands of posts predicting a stock will soar, and skeptics get downvoted or mocked. A newcomer scrolling that feed sees near-total agreement and feels certain - but they're inside an echo chamber that filtered out every cautionary voice, a textbook confirmation-bias trap."
      },
      {
        type: "concept",
        title: "Training Yourself to Argue the Other Side",
        paragraphs: [
          "Beating confirmation bias starts with a mindset shift: treat your beliefs as hypotheses to be tested, not treasures to be defended. Before buying a stock, write down the specific reasons it might be a bad idea and what evidence would prove you wrong. This is your 'kill criteria.' If you can't think of anything that would change your mind, that's a red flag - it means you're not really analyzing, you're just cheerleading. Actively searching for disconfirming evidence is uncomfortable, which is exactly why so few people do it and why it's so valuable.",
          "Another tool is to seek out credible people who disagree and genuinely try to understand their reasoning. If everyone in your feed loves a stock, deliberately find the smartest 'bear' case - the strongest argument that it will fall. You don't have to agree, but understanding the opposing view exposes risks you'd otherwise never see. Great investors like Charlie Munger were famous for insisting they could argue the other side of any position better than its supporters could, before taking a stance of their own.",
          "Finally, keep an honest record. Write down your predictions and later check whether they came true - all of them, not just the winners. Confirmation bias thrives on selective memory, where you recall your hits and forget your misses. A simple journal breaks that spell by forcing you to face your real track record. Over time, this habit builds something rare and valuable: the ability to change your mind when the facts change, instead of clinging to a belief just because it's yours."
        ],
        bullets: [
          "Treat beliefs as hypotheses to test, not treasures to defend.",
          "Write 'kill criteria': what evidence would prove your idea wrong?",
          "Deliberately study the strongest opposing ('bear') case before deciding.",
          "Keep a prediction journal to defeat selective memory of your hits.",
          "The goal: change your mind when facts change, not cling to a belief because it's yours."
        ],
        realWorldExample: "Investor Charlie Munger said he wouldn't feel entitled to hold an opinion unless he could argue the opposing side better than the smartest person who disagreed with him. That discipline - mastering the other view first - is the opposite of confirmation bias and a big reason for his long track record."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "behavior3-mc1",
            question: "What is confirmation bias?",
            options: [
              "Confirming your trades with a broker before buying",
              "Favoring information that supports what you already believe",
              "Requiring solid written proof before making any final decision",
              "Buying only stocks that are already confirmed winners"
            ],
            correctAnswer: 1,
            explanation: "Confirmation bias is seeking and remembering evidence that agrees with your existing beliefs while ignoring evidence that contradicts them."
          },
          {
            id: "behavior3-mc2",
            question: "How do social media algorithms worsen confirmation bias?",
            options: [
              "They carefully show fully balanced arguments from both sides of every single debate",
              "They create echo chambers by showing more of what you already agree with",
              "They hide all financial information from every user until an account is fully verified",
              "They force you to read opposing views before you can scroll any further down"
            ],
            correctAnswer: 1,
            explanation: "Algorithms feed you more of what you engage with, building an echo chamber where your view seems universal and dissent is filtered out."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus and His Favorite Stock",
        narrative: "Marcus is convinced a video-game company's stock will soar. He follows fan accounts that hype it daily, watches bullish YouTube videos, and joins forums full of believers. When the company reports weak sales, he calls it 'a temporary blip' and finds a post that agrees with him. He feels more certain than ever.",
        details: [
          "Marcus only consumes sources that agree with him, building an echo chamber.",
          "He reinterprets bad news ('weak sales') as unimportant to protect his belief.",
          "He hasn't sought out the strongest arguments for why the stock might fall.",
          "A prediction journal would force him to face whether his past hunches actually came true."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "behavior3-aq1",
          question: "What should Marcus do to think more clearly about this stock?",
          options: [
            "Follow even more online accounts that already love the stock",
            "Deliberately study the strongest arguments for why it could fail",
            "Stop reading any news at all about the company from now on",
            "Buy even more shares just to prove how confident he is"
          ],
          correctAnswer: 1,
          explanation: "To counter confirmation bias, Marcus should actively seek the best 'bear case.' Understanding why smart people think it could fail reveals risks his echo chamber hides."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Confirmation bias makes you favor evidence that agrees with your beliefs.",
          "Your brain defends opinions like a lawyer instead of testing them like a scientist.",
          "Algorithms build echo chambers that make your view feel universal.",
          "Write 'kill criteria' and study the strongest opposing case before deciding.",
          "Keep a prediction journal to beat the selective memory that fuels the bias."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "behavior3-mastery1",
            question: "Confirmation bias makes your brain act more like a…",
            options: [
              "Scientist calmly testing a new hypothesis",
              "Lawyer defending a chosen position",
              "Referee staying perfectly neutral on the field",
              "Teacher grading every paper strictly fairly"
            ],
            correctAnswer: 1,
            explanation: "Under confirmation bias, you defend your belief and gather supporting evidence like a lawyer, rather than objectively testing it like a scientist."
          },
          {
            id: "behavior3-mastery2",
            question: "What is an 'echo chamber' in this context?",
            options: [
              "A quiet room with unusually good acoustics for making phone calls",
              "An environment that repeats back only views you already hold",
              "A special type of trading account offered by discount brokers",
              "A stock that keeps repeating the exact same price all day"
            ],
            correctAnswer: 1,
            explanation: "An echo chamber is a feed or group that reflects your own opinions back at you, filtering out disagreement and inflating your certainty."
          },
          {
            id: "behavior3-mastery3",
            question: "Writing 'kill criteria' before an investment means…",
            options: [
              "Deciding exactly when to delete your trading app",
              "Listing what evidence would prove your idea wrong",
              "Setting a target price to buy more shares",
              "Choosing which rival competitor you want to root against"
            ],
            correctAnswer: 1,
            explanation: "Kill criteria are the specific facts that would change your mind. If you can't name any, you're cheerleading, not analyzing."
          },
          {
            id: "behavior3-mastery4",
            question: "Why does owning a stock intensify confirmation bias?",
            options: [
              "Owners always get far more accurate company data than any other people do out there",
              "You're motivated to believe you were right, so you downplay bad news",
              "Ownership legally requires strict optimism about the company under real securities law rules",
              "The stock itself somehow changes its own behavior the very moment you own it"
            ],
            correctAnswer: 1,
            explanation: "Once you own it, your ego is invested. You reinterpret bad news as unimportant and celebrate good news to protect the belief that you chose well."
          },
          {
            id: "behavior3-mastery5",
            question: "Charlie Munger's rule was that he wouldn't hold an opinion unless he could…",
            options: [
              "Find ten other people who already agreed with him",
              "Argue the opposing side better than his opponents",
              "Guarantee that the idea would definitely make real money",
              "Explain the whole idea in under one single minute"
            ],
            correctAnswer: 1,
            explanation: "Munger insisted on mastering the opposing argument first - the direct opposite of confirmation bias - before committing to a view."
          },
          {
            id: "behavior3-mastery6",
            question: "How does a prediction journal fight confirmation bias?",
            options: [
              "It guarantees that every single one of your future predictions turns out correct",
              "It forces you to face all your results, not just the wins",
              "It hides your losing trades automatically so your account looks far better",
              "It fully replaces the need to do any research before you trade"
            ],
            correctAnswer: 1,
            explanation: "Confirmation bias relies on remembering hits and forgetting misses. A journal records both, giving you an honest picture of your real track record."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // behavior-4: Overconfidence
  // ─────────────────────────────────────────────
  {
    lessonId: "behavior-4",
    sections: [
      {
        type: "concept",
        title: "Most People Think They're Above Average",
        paragraphs: [
          "Overconfidence is believing your knowledge, skill, or luck is better than it really is. It shows up everywhere: in surveys, about 90% of drivers rate themselves as above-average, which is mathematically impossible. The same illusion strikes investors. After a few winning trades, people conclude they have a special talent, when they may have simply gotten lucky in a rising market. The danger is that overconfidence feels exactly like competence from the inside - you're certain, so you assume you must be right, and you stop double-checking.",
          "In investing, overconfidence leads to two costly habits: trading too much and taking too much risk. If you're sure you can pick winners and time the market, you buy and sell constantly, racking up fees and taxes while usually underperforming a simple index fund. A landmark study by Brad Barber and Terrance Odean examined thousands of real accounts and found the investors who traded the most earned the lowest returns - and men, who tended to be more overconfident, traded more and did worse than women on average. Activity felt like skill, but it quietly drained their money.",
          "Overconfidence also makes people bet too big on a single idea. Convinced they've found a sure thing, they pour their savings into one stock or crypto coin instead of diversifying. When it works, they feel like geniuses and grow even more overconfident; when it fails, the concentrated bet can wipe out years of gains. Real skill in investing usually looks boring: humble, diversified, and slow. The loud, confident 'I know exactly what's going to happen' is often the sound of someone about to learn an expensive lesson."
        ],
        bullets: [
          "Overconfidence: overrating your own knowledge, skill, or luck.",
          "About 90% of drivers rate themselves above average - a mathematical impossibility.",
          "It causes overtrading, which piles up fees and taxes and lowers returns.",
          "Barber and Odean found the most active traders earned the lowest returns.",
          "It also causes oversized bets on single ideas instead of diversifying."
        ],
        realWorldExample: "Barber and Odean's study of over 60,000 households found that the 20% who traded most actively earned annual returns several percentage points below the market, while patient buy-and-hold investors did far better. The active traders' confidence in their stock-picking cost them dearly in fees and mistimed trades."
      },
      {
        type: "concept",
        title: "Luck, Hindsight, and Staying Humble",
        paragraphs: [
          "One reason overconfidence sticks around is that people confuse luck with skill. In a rising market, almost any stock goes up, so beginners who buy during a boom feel brilliant - until the tide turns. It's like winning a coin-flip game and concluding you have a gift for coin flips. Separating luck from skill takes many decisions over a long time, not a handful of wins. Beginners are especially vulnerable to the Dunning-Kruger effect, where people who know a little overestimate how much they know, because they don't yet know enough to see what they're missing.",
          "Hindsight bias feeds overconfidence too. After an event, people say 'I knew it all along,' rewriting their memory to make the outcome seem obvious. Once the 2008 crash happened, countless people claimed they'd 'seen it coming,' though almost none acted on it beforehand. This false sense that the past was predictable convinces you the future is predictable, so you bet with more certainty than the facts justify. Nobody actually knew, but hindsight makes it feel like they did.",
          "The antidote to overconfidence is humility built into your process. Assume you might be wrong and protect yourself accordingly: diversify so no single bad call can ruin you, keep position sizes modest, and favor low-cost index funds over frequent trading. Track your predictions honestly to see your real hit rate. Ask, 'What would I have to be wrong about for this to fail?' The most successful long-term investors are not the loudest or most certain - they're the ones humble enough to respect what they don't know."
        ],
        bullets: [
          "People confuse luck (a rising market) with genuine skill after a few wins.",
          "Dunning-Kruger: beginners overrate their knowledge because they can't see the gaps.",
          "Hindsight bias ('I knew it all along') makes the future feel more predictable than it is.",
          "Humility as a strategy: diversify, size bets modestly, prefer low-cost index funds.",
          "Track your real hit rate and ask what you'd need to be wrong about for a bet to fail."
        ],
        realWorldExample: "After the 2008 housing crash, huge numbers of people insisted they had 'known it was a bubble.' Yet very few sold their homes or stocks beforehand - the honest evidence of their real beliefs. That gap between what people remember predicting and what they actually did is hindsight bias fueling overconfidence."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "behavior4-mc1",
            question: "What did Barber and Odean's research find about active traders?",
            options: [
              "The most active traders earned the highest returns",
              "The most active traders earned the lowest returns",
              "Trading frequency had no measurable effect on returns",
              "Only professional traders were studied in the whole research"
            ],
            correctAnswer: 1,
            explanation: "Their study of real accounts found the most active traders earned the lowest returns, as overconfidence led to costly overtrading."
          },
          {
            id: "behavior4-mc2",
            question: "What is hindsight bias?",
            options: [
              "Refusing to ever look back at your own past performance",
              "Believing after an event that you 'knew it all along'",
              "Only investing in old, established companies with long track records",
              "Reviewing your own trades carefully every single night before bed"
            ],
            correctAnswer: 1,
            explanation: "Hindsight bias is the illusion that a past outcome was obvious and predictable, which makes people overconfident about predicting the future."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ava's Winning Streak",
        narrative: "Ava, 18, has made money on her last four stock picks during a strong market rally. Convinced she has a talent for picking winners, she decides to put nearly all her savings into a single 'sure thing' stock and to trade in and out frequently to boost her gains. She tells friends, 'I just have a feel for this.'",
        details: [
          "Her four wins came during a rising market, where almost everything went up - luck, not proven skill.",
          "Frequent trading will pile up fees and taxes that quietly eat her returns.",
          "Putting nearly all her savings in one stock removes the protection of diversification.",
          "A few wins isn't enough data to separate genuine skill from a lucky streak."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "behavior4-aq1",
          question: "What is the biggest risk in Ava's plan?",
          options: [
            "She might well miss out on even bigger gains by holding back right now",
            "Overconfidence leads her to overtrade and bet too much on one stock",
            "She isn't checking the live prices nearly often enough during the trading day",
            "She's being far too cautious and safe with all of her hard-earned savings"
          ],
          correctAnswer: 1,
          explanation: "Ava is mistaking a lucky streak in a rising market for skill. Overconfidence pushes her to overtrade (fees, taxes) and to concentrate her savings in one risky bet."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Overconfidence means overrating your own knowledge, skill, or luck.",
          "It drives overtrading (fees and taxes) and oversized bets on single ideas.",
          "The most active traders tend to earn the lowest returns.",
          "People confuse a lucky rising market with genuine skill; Dunning-Kruger worsens it.",
          "Humility - diversify, size bets modestly, use low-cost index funds - is the antidote."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "behavior4-mastery1",
            question: "Why is it impossible that 90% of drivers are 'above average'?",
            options: [
              "Because driving skill can't be measured accurately at all",
              "Because only about half can be above the midpoint",
              "Because everyone is actually below the true average driver",
              "Because averages simply don't apply to real living people"
            ],
            correctAnswer: 1,
            explanation: "By definition, roughly half a group falls above average and half below. Believing 90% are above reveals widespread overconfidence."
          },
          {
            id: "behavior4-mastery2",
            question: "Overconfidence most directly causes which two investing behaviors?",
            options: [
              "Saving far too much and spending too little",
              "Overtrading and betting too big on single ideas",
              "Avoiding all stocks and holding only safe cash",
              "Reading far too many detailed company earnings reports"
            ],
            correctAnswer: 1,
            explanation: "Believing you can pick winners and time markets leads to frequent trading (fees, taxes) and concentrated, oversized bets."
          },
          {
            id: "behavior4-mastery3",
            question: "The Dunning-Kruger effect describes how…",
            options: [
              "Experts nearly always badly underestimate their own true skill level",
              "Beginners overrate their skill because they can't see their gaps",
              "Confidence tends to grow slowly and steadily right alongside true skill",
              "Trading apps quietly inflate the returns they show you on screen"
            ],
            correctAnswer: 1,
            explanation: "People who know only a little often overestimate their competence, because they lack the knowledge to recognize what they don't know."
          },
          {
            id: "behavior4-mastery4",
            question: "Why can a winning streak in a rising market be misleading?",
            options: [
              "Rising markets never actually happen at all in the real world",
              "Almost everything rises, so wins may be luck, not skill",
              "Winning streaks clearly prove you have permanent, lasting investing talent",
              "Markets only ever rise for the very most skilled investors"
            ],
            correctAnswer: 1,
            explanation: "When nearly all stocks are climbing, even random picks win. It takes many decisions over time to tell luck apart from genuine skill."
          },
          {
            id: "behavior4-mastery5",
            question: "After the 2008 crash, many said they 'knew it all along.' This illustrates…",
            options: [
              "Simple loss aversion alone",
              "Hindsight bias fueling overconfidence",
              "Anchoring to a purchase price",
              "Herd behavior working alone here"
            ],
            correctAnswer: 1,
            explanation: "Very few actually acted beforehand. Rewriting memory to make the outcome seem obvious is hindsight bias, which inflates future overconfidence."
          },
          {
            id: "behavior4-mastery6",
            question: "Which approach best guards against overconfidence?",
            options: [
              "Concentrate all of your savings in your single best idea",
              "Diversify, size bets modestly, and use low-cost index funds",
              "Trade very frequently to keep your instincts sharp",
              "Trust your own gut feeling far above the actual data"
            ],
            correctAnswer: 1,
            explanation: "Humility built into your process - diversification, modest position sizes, and low-cost index funds - protects you when your confident calls turn out wrong."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // behavior-5: Herd Behavior
  // ─────────────────────────────────────────────
  {
    lessonId: "behavior-5",
    sections: [
      {
        type: "concept",
        title: "Why We Follow the Crowd",
        paragraphs: [
          "Herd behavior is the tendency to copy what a large group is doing, especially under uncertainty. When you don't know the right answer, following the crowd feels safe - surely all those people can't be wrong. This instinct runs deep: our ancestors survived by sticking with the group, because the person who ran when everyone else ran avoided the predator. In an experiment by Solomon Asch, people gave obviously wrong answers about the length of lines simply because everyone else in the room did. The pull to conform is powerful even when the crowd is clearly mistaken.",
          "In markets, herding creates a dangerous feedback loop. As a stock rises, more people buy it because it's rising, which pushes it higher, which attracts even more buyers. This is 'momentum,' and it can detach a price from the company's actual value. Everyone assumes the others must know something, when often nobody does - they're all just following each other. The GameStop surge of 2021 is a vivid example: the stock rocketed not because the business suddenly became valuable, but because a massive online crowd piled in together, each person emboldened by the others.",
          "The cruel twist is that herds turn on a dime. The same instinct that drives everyone to buy also drives everyone to sell at once when fear takes over, causing crashes and panics. Because the herd buys high (during excitement) and sells low (during panic), pure herd-followers often do the opposite of the winning strategy. This is why legendary investor Warren Buffett advises being 'fearful when others are greedy, and greedy when others are fearful' - deliberately leaning against the herd rather than running with it."
        ],
        bullets: [
          "Herd behavior: copying a large group's actions, especially when you're uncertain.",
          "It's an ancient survival instinct - staying with the group avoided danger.",
          "In markets it creates momentum: rising prices attract buyers, pushing prices higher.",
          "Herds reverse suddenly, buying high in excitement and selling low in panic.",
          "Buffett's rule: be fearful when others are greedy and greedy when others are fearful."
        ],
        realWorldExample: "In Asch's line experiments, about 75% of people gave a clearly wrong answer at least once, just to match a group of actors who all picked the same wrong line. If people will deny what their own eyes see to fit in, it's no surprise they'll buy a soaring stock simply because everyone else is."
      },
      {
        type: "concept",
        title: "Standing Apart From the Stampede",
        paragraphs: [
          "Not all herding is irrational - sometimes the crowd genuinely knows something you don't, and copying is reasonable. The problem is that in markets, the crowd's confidence often has no real information behind it; it's just people watching each other. The key question to ask is 'Why is this price rising - because the business got more valuable, or because everyone is excited?' If the only reason people give is 'it keeps going up' or 'everyone's buying it,' that's herd behavior, not analysis, and it's a warning sign rather than a green light.",
          "Fear of missing out (FOMO) is the emotional fuel of the herd. When you see classmates bragging about doubling their money on a hot stock, staying out feels painful, so you jump in - usually near the top, right before the herd reverses. The defense is to decide in advance what you'll invest in and why, based on the underlying value, so a crowd's excitement can't yank you around. A written plan acts like a seatbelt: it keeps you in place when the emotional forces get strong.",
          "History's most famous investors made their fortunes by acting against the herd, not with it. They bought quality assets during panics, when everyone else was terrified and prices were cheap, and trimmed their holdings during manias, when everyone else was euphoric and prices were sky-high. This 'contrarian' approach is emotionally hard precisely because it means feeling out of step with everyone around you. But recognizing herd behavior in yourself - noticing when you want to buy just because others are - is the first step to escaping the stampede."
        ],
        bullets: [
          "Sometimes the crowd is right, but market herds often run on emotion, not information.",
          "Ask: is the price rising on real value, or just because everyone's excited?",
          "FOMO is the herd's fuel; it usually pulls you in near the top.",
          "A written plan based on value keeps you steady when the crowd panics or celebrates.",
          "Contrarian investors buy in panics and trim in manias - hard, but often rewarding."
        ],
        realWorldExample: "In March 2020, when COVID fear caused a rapid market crash, most investors were selling in panic. Those who calmly kept buying diversified funds during the terror bought at low prices and saw strong gains as markets recovered within a year - a real payoff for resisting the herd's stampede toward the exits."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "behavior5-mc1",
            question: "What is herd behavior in investing?",
            options: [
              "Investing only in the large farming and agriculture companies each year",
              "Copying what a large group is doing, especially under uncertainty",
              "Following one single trusted expert's advice on nearly every trade",
              "Spreading your money widely across many different kinds of assets"
            ],
            correctAnswer: 1,
            explanation: "Herd behavior is mimicking the crowd's actions - like buying a stock mainly because everyone else is - rather than judging its actual value."
          },
          {
            id: "behavior5-mc2",
            question: "What did Solomon Asch's line experiment reveal?",
            options: [
              "People always trust their own two eyes above everyone else",
              "Many people give obviously wrong answers to match the group",
              "Groups always reach the single correct answer together in the end",
              "People completely ignore whatever everyone else around them clearly thinks"
            ],
            correctAnswer: 1,
            explanation: "Asch found most people would give a clearly wrong answer at least once just to conform, showing how strong the pull to follow the crowd is."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Class Group Chat Frenzy",
        narrative: "A stock called 'ZorbX' is exploding across a school group chat. Classmates post screenshots of quick profits, and the price has tripled in a week. Kayla doesn't know anything about the company, but seeing everyone win and hearing 'it's still going up!' makes her feel desperate to buy before she misses out.",
        details: [
          "The only reasons given for buying are 'it keeps going up' and 'everyone's making money.'",
          "Nobody in the chat can explain why the company itself is more valuable.",
          "FOMO - fear of missing out - is pushing Kayla to buy near the peak of the excitement.",
          "Herds like this often reverse suddenly, and latecomers buy high right before the drop."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "behavior5-aq1",
          question: "What is the wisest response for Kayla?",
          options: [
            "Buy immediately, right now, before the price climbs even any higher still",
            "Pause and ask whether the company's real value justifies the price",
            "Invest every dollar of her savings to catch up with her friends",
            "Post her own profit screenshots online just to join in with everyone"
          ],
          correctAnswer: 1,
          explanation: "The rally is driven by herd behavior and FOMO, not by the company's actual value. Kayla should judge the business itself; buying just because others are is a classic top-of-the-frenzy trap."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Herd behavior is copying the crowd, an ancient survival instinct that misfires in markets.",
          "Herding creates momentum, detaching prices from a company's real value.",
          "Herds reverse fast, buying high in excitement and selling low in panic.",
          "FOMO fuels the herd and usually pulls you in near the top.",
          "Contrarians lean against the crowd: fearful when others are greedy, greedy when others are fearful."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "behavior5-mastery1",
            question: "Why did herd behavior likely evolve in humans?",
            options: [
              "Because early humans deeply loved the stock market",
              "Because staying with the group improved survival odds",
              "Because it somehow makes people much better at math",
              "Because large groups of people always make correct choices"
            ],
            correctAnswer: 1,
            explanation: "Sticking with the group protected ancestors from predators and danger. That survival instinct now shows up as following the crowd in markets."
          },
          {
            id: "behavior5-mastery2",
            question: "How does herding create market 'momentum'?",
            options: [
              "Falling prices somehow scare everyone into buying more",
              "Rising prices attract buyers, pushing prices even higher",
              "Governments legally require stock prices to keep rising",
              "Companies quietly pay ordinary investors to buy their shares"
            ],
            correctAnswer: 1,
            explanation: "As a price rises, more people buy because it's rising, driving it higher and attracting still more buyers - a feedback loop that can detach price from value."
          },
          {
            id: "behavior5-mastery3",
            question: "The 2021 GameStop surge is an example of herding because…",
            options: [
              "The company's quarterly profits suddenly tripled overnight without any warning at all",
              "A large online crowd piled in together, driving the price up",
              "The government directly ordered ordinary regular people to go buy the shares",
              "It was fully based on careful, detailed analysis of the real earnings"
            ],
            correctAnswer: 1,
            explanation: "GameStop soared mainly because a huge online crowd bought together, each emboldened by the others - not because the underlying business became far more valuable."
          },
          {
            id: "behavior5-mastery4",
            question: "Why do pure herd-followers often lose money?",
            options: [
              "They buy low and sell high very consistently every time",
              "They buy high in excitement and sell low in panic",
              "They never buy any single individual stocks at all, ever",
              "They only ever invest in the broad, low-cost index funds"
            ],
            correctAnswer: 1,
            explanation: "The herd buys during euphoria (high prices) and sells during panic (low prices) - the opposite of the winning strategy."
          },
          {
            id: "behavior5-mastery5",
            question: "Warren Buffett's contrarian advice is to be…",
            options: [
              "Greedy exactly when all of the other investors are greedy too",
              "Fearful when others are greedy, and greedy when others are fearful",
              "Always fully invested no matter what the whole market ever does",
              "Completely out of the whole market entirely at every single moment"
            ],
            correctAnswer: 1,
            explanation: "Buffett advises leaning against the herd: caution during manias and courage during panics, when quality assets are often cheap."
          },
          {
            id: "behavior5-mastery6",
            question: "Which question best exposes herd behavior in a rising stock?",
            options: [
              "How many of my close friends have already bought it?",
              "Is the price rising on real value or just excitement?",
              "How much exactly has it gone up this whole week?",
              "Who was the very first person to post about it online?"
            ],
            correctAnswer: 1,
            explanation: "If the only reason for the rise is excitement and 'everyone's buying,' that's herd behavior, not analysis - a warning sign, not a green light."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // behavior-6: FOMO
  // ─────────────────────────────────────────────
  {
    lessonId: "behavior-6",
    sections: [
      {
        type: "concept",
        title: "The Fear That Makes You Buy at the Top",
        paragraphs: [
          "FOMO - the fear of missing out - is the anxious feeling that others are getting a great opportunity or experience that you're being left out of. It's a mix of loss aversion (missing out feels like a loss) and herd behavior (everyone else is doing it). Social media supercharges FOMO because you only see the highlight reel: the classmate posting a screenshot of a 300% gain, never the ten people who quietly lost money on the same trade. Your brain sees a stream of winners and concludes you're the only one missing out, even though that picture is wildly incomplete.",
          "In investing, FOMO is dangerous because it flips the natural order of good decisions. Instead of researching first and buying when something is a good value, FOMO makes you buy first - driven by urgency and emotion - and rationalize later. The feeling screams 'buy NOW before it's too late,' which is exactly the mindset that gets people to purchase assets at their most expensive, most hyped moment. By the time a stock or coin is all over social media, the easy gains are usually gone, and latecomers are often the ones left holding the bag when the excitement fades.",
          "FOMO also destroys patience, which is an investor's greatest edge. Real wealth-building is slow: steadily investing in diversified funds over years, letting compound growth do the heavy lifting. That process is boring, and boring feels unbearable when your feed is full of people getting rich quick. FOMO whispers that slow investing is for suckers and that you need to be in the next hot thing. But chasing hot things typically means jumping from bubble to bubble, buying high each time, while patient investors quietly pull ahead."
        ],
        bullets: [
          "FOMO: anxiety that you're missing an opportunity everyone else is getting.",
          "It blends loss aversion (missing out feels like loss) with herd behavior.",
          "Social media shows only winners' highlight reels, hiding the many who lost.",
          "FOMO reverses good order: buy first on emotion, rationalize later.",
          "By the time something is all over your feed, the easy gains are usually gone."
        ],
        realWorldExample: "During the 2021 crypto and meme-stock boom, countless first-time investors bought coins like Dogecoin after seeing viral posts about others' overnight riches. Many bought near the peak and lost most of their money when prices collapsed. The 'don't miss out' feeling led them to buy at the worst possible time."
      },
      {
        type: "concept",
        title: "Building a FOMO-Proof Plan",
        paragraphs: [
          "The strongest defense against FOMO is a written investment plan made when you're calm, not when you're panicking about missing out. Decide in advance what you'll invest in (for example, a diversified index fund), how much, and how often - say, a set amount every month regardless of the headlines. This strategy, called dollar-cost averaging, removes the urgency FOMO feeds on. When you're already following a steady plan, a viral hot stock becomes just noise, because your decisions were made ahead of time by your rational self.",
          "It also helps to reframe what you're actually seeing online. That '300% gain' screenshot is survivorship bias in action: you see the rare winner because they posted, while the many losers stayed silent. For every visible jackpot, there are people who lost real money on the same bet and said nothing. Reminding yourself that you're watching a filtered highlight reel - not reality - takes a lot of the sting out of FOMO. Nobody posts a screenshot of the money they lost chasing the last hot thing.",
          "Finally, remember that opportunities are not as scarce as FOMO makes them feel. The market has produced new opportunities for over a century and will keep doing so; there is always another chance. Missing one hyped trade does not doom your financial future - but repeatedly buying into hype at the top can seriously damage it. The calm truth is that patient, boring, diversified investing beats frantic FOMO-chasing over time. Learning to sit still while others chase the latest craze is one of the most profitable skills an investor can build."
        ],
        bullets: [
          "A written plan made while calm removes the urgency FOMO exploits.",
          "Dollar-cost averaging (investing a set amount regularly) beats reacting to headlines.",
          "Viral 'gains' posts are survivorship bias: winners post, losers stay silent.",
          "Opportunities aren't scarce - there is always another chance in the market.",
          "Patient, boring, diversified investing beats frantic FOMO-chasing over time."
        ],
        realWorldExample: "An investor who put $200 into a broad index fund every month through the ups and downs of the 2010s and 2020s - never chasing hot tips - steadily built wealth through dollar-cost averaging. Meanwhile, many who jumped from one viral 'can't-miss' trade to the next bought high repeatedly and fell behind."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "behavior6-mc1",
            question: "What is FOMO?",
            options: [
              "A careful long-term strategy for buying only the broad, low-cost stock index funds",
              "The fear of missing out on an opportunity others seem to be getting",
              "A special type of low-cost brokerage account offered to new teen investors",
              "A standard math method for calculating the exact returns on any investment you hold"
            ],
            correctAnswer: 1,
            explanation: "FOMO is the anxious fear that everyone else is seizing an opportunity you're missing, which pressures you into rushed, emotional decisions."
          },
          {
            id: "behavior6-mc2",
            question: "Why are viral 'I made 300%!' posts misleading?",
            options: [
              "They are always completely fake and digitally edited by online scammers",
              "They show only winners, hiding the many who lost (survivorship bias)",
              "They are strictly illegal to post anywhere on any social media",
              "They clearly prove that the trade itself was completely safe all along"
            ],
            correctAnswer: 1,
            explanation: "Winners post their gains while losers stay quiet, so your feed shows a filtered highlight reel. This survivorship bias makes risky bets look far safer than they are."
          }
        ]
      },
      {
        type: "scenario",
        title: "Diego's Feed Full of Winners",
        narrative: "Every day, Diego's social feed shows people bragging about huge profits on a trendy new crypto coin. He has a steady plan to invest $100 a month in an index fund, but the constant screenshots make him feel like a fool for missing out. He's tempted to dump his savings into the coin to catch up.",
        details: [
          "Diego only sees the winners posting; the many who lost money on the coin stay silent.",
          "His feed's highlight reel is survivorship bias, making the coin look safer than it is.",
          "His existing $100-a-month plan is dollar-cost averaging, made calmly in advance.",
          "By the time a coin is all over social media, the easy gains have usually passed."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "behavior6-aq1",
          question: "What is the best move for Diego?",
          options: [
            "Dump all his savings into the coin to catch up with everyone",
            "Stick to his monthly index-fund plan and treat the hype as noise",
            "Sell his whole index fund now and wait for the next hot trend",
            "Borrow extra money from his friends to buy even more of the coin"
          ],
          correctAnswer: 1,
          explanation: "Diego's calm, pre-made plan protects him from FOMO. The viral posts are a filtered highlight reel, and buying hype at its peak usually means buying high. Staying the course wins over time."
        }
      },
      {
        type: "recap",
        takeaways: [
          "FOMO is the fear of missing an opportunity everyone else seems to be getting.",
          "It blends loss aversion and herd behavior and is supercharged by social media.",
          "FOMO makes you buy first on emotion, usually near the hyped-up top.",
          "Viral 'gains' posts are survivorship bias - winners post, losers stay silent.",
          "A calm written plan and dollar-cost averaging make you FOMO-proof."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "behavior6-mastery1",
            question: "FOMO is best described as a combination of…",
            options: [
              "Anchoring bias combined with plain overconfidence",
              "Loss aversion and herd behavior",
              "Broad diversification and long-term patience",
              "Compound interest working against steady inflation"
            ],
            correctAnswer: 1,
            explanation: "FOMO blends loss aversion (missing out feels like a loss) with herd behavior (everyone else is doing it), creating powerful urgency to act."
          },
          {
            id: "behavior6-mastery2",
            question: "How does FOMO reverse the order of a good decision?",
            options: [
              "It makes you research each single company very thoroughly before buying",
              "It makes you buy first on emotion, then rationalize later",
              "It makes you avoid nearly all investments and hold only cash",
              "It makes you always sell all your shares before you ever buy"
            ],
            correctAnswer: 1,
            explanation: "Good decisions research value first, then buy. FOMO flips this: urgency drives you to buy immediately and justify it afterward, often at the top."
          },
          {
            id: "behavior6-mastery3",
            question: "What is survivorship bias in the context of viral trading posts?",
            options: [
              "Only the very oldest investors manage to survive downturns",
              "You see winners who post while losers stay silent",
              "Survivors of a crash always give the best possible advice",
              "It's a strict rule about who can post online"
            ],
            correctAnswer: 1,
            explanation: "Winners broadcast their gains and losers say nothing, so your feed overrepresents success and hides the many failures on the same bet."
          },
          {
            id: "behavior6-mastery4",
            question: "Dollar-cost averaging means…",
            options: [
              "Buying only when a stock is sitting at its very lowest",
              "Investing a set amount at regular intervals regardless of headlines",
              "Averaging together the opinions of many popular financial influencers online",
              "Doubling the size of your investment right after every single loss"
            ],
            correctAnswer: 1,
            explanation: "Dollar-cost averaging invests a fixed amount on a schedule, removing the urgency FOMO feeds on and smoothing out price swings over time."
          },
          {
            id: "behavior6-mastery5",
            question: "Why is missing one hyped trade usually not a disaster?",
            options: [
              "Because that one trade was fully guaranteed to fail",
              "Because the market keeps producing new opportunities over time",
              "Because you can always simply undo the trade later",
              "Because heavily hyped trades are strictly illegal under securities law"
            ],
            correctAnswer: 1,
            explanation: "Opportunities aren't scarce; the market offers new ones for decades. Repeatedly buying hype at the top is far more damaging than skipping one craze."
          },
          {
            id: "behavior6-mastery6",
            question: "Why is patience considered an investor's greatest edge against FOMO?",
            options: [
              "Because slow, steady investing somehow guarantees instant overnight riches",
              "Because steady, diversified investing lets compound growth build wealth",
              "Because patient long-term investors truly never lose any money",
              "Because patience alone lets you time the market perfectly"
            ],
            correctAnswer: 1,
            explanation: "Boring, consistent investing harnesses compound growth over years, quietly outperforming the frantic hop-from-bubble-to-bubble that FOMO encourages."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // behavior-7: Emotional Trading
  // ─────────────────────────────────────────────
  {
    lessonId: "behavior-7",
    sections: [
      {
        type: "concept",
        title: "When Fear and Greed Take the Wheel",
        paragraphs: [
          "Emotional trading is making buy and sell decisions based on how you feel - fear, greed, excitement, or panic - instead of on facts and a plan. Two emotions dominate markets: greed, which makes people chase rising prices and take reckless risks, and fear, which makes people dump good investments during downturns. Both feel completely reasonable in the moment. That's the trap: emotions don't announce themselves as emotions. They disguise themselves as urgent, obvious truths - 'I have to buy this now' or 'I have to get out before it's too late' - and they usually strike at the worst possible times.",
          "Your brain has two decision systems. One is fast, automatic, and emotional (great for dodging a swerving car); the other is slow, careful, and logical (great for math and planning). Under stress, the fast emotional system takes over and shoves the logical one aside. This is why a market crash can make even smart people sell in a panic at the bottom, and a booming market can make cautious people buy wildly at the top. The emotional brain evolved to keep you alive in physical danger, but it's a terrible stock trader, reacting to price swings as if they were predators.",
          "The cost of emotional trading is measurable. Studies of investor returns consistently show that the average investor earns significantly less than the funds they invest in - not because the funds performed poorly, but because investors buy after prices have risen (greed) and sell after prices have fallen (fear), locking in the worst of both. This 'behavior gap' can cost several percentage points a year, which compounds into a fortune over a lifetime. The market doesn't punish you for the ups and downs; it punishes you for reacting to them emotionally."
        ],
        bullets: [
          "Emotional trading: deciding by feeling (fear, greed, panic) instead of facts and a plan.",
          "Greed chases rising prices; fear dumps good investments during downturns.",
          "Under stress, the fast emotional brain overrides the slow, logical one.",
          "Panic selling at the bottom and greedy buying at the top are the classic mistakes.",
          "The 'behavior gap' means average investors earn less than the funds they own."
        ],
        realWorldExample: "Research firms have long found that the average stock-fund investor earns several percentage points a year less than the funds themselves return, largely due to buying high and selling low on emotion. Over decades, that behavior gap can cut an investor's final wealth roughly in half compared to simply buying and holding."
      },
      {
        type: "concept",
        title: "Systems That Outsmart Your Emotions",
        paragraphs: [
          "You can't delete your emotions, but you can build systems that make good decisions for you before emotions strike. The most powerful is automation: set up automatic monthly contributions into diversified index funds. When the buying happens automatically, you never face the emotional choice of whether to invest during scary or euphoric times - the decision was already made by your calm, rational self. Automation quietly turns market crashes into buying opportunities instead of panic moments, because your contributions keep flowing no matter how the headlines feel.",
          "A written investment plan is your second line of defense. Spell out your goals, what you'll own, and specific rules for buying and selling - for example, 'I will not sell during a downturn unless my life circumstances change.' When fear or greed hits, you consult the plan you made while thinking clearly, rather than inventing a new decision under stress. It also helps to add friction: a personal rule to wait 24 hours before any big trade gives the emotional wave time to pass and the logical brain time to catch up.",
          "Managing your inputs matters too. Constantly checking prices and doomscrolling financial news feeds the emotional brain a steady diet of triggers, tempting you to react. Many successful long-term investors deliberately look at their portfolios rarely - perhaps a few times a year - precisely to avoid emotional reactions to normal ups and downs. The goal isn't to be a robot; it's to design your environment and habits so that when emotions inevitably surge, they can't hijack your money. Discipline beats brilliance in investing, and systems create discipline."
        ],
        bullets: [
          "Automate contributions so investing happens without an emotional choice each time.",
          "A written plan with clear buy/sell rules keeps you steady under stress.",
          "Add friction: wait 24 hours before any big trade to let emotion pass.",
          "Limit inputs; constant price-checking and doomscrolling fuel emotional reactions.",
          "Discipline beats brilliance - well-designed systems create that discipline."
        ],
        realWorldExample: "An investor who set up an automatic $150 monthly transfer into an index fund kept buying right through the 2020 COVID crash without lifting a finger. Because the purchases were automated, they scooped up shares at low prices while panicky manual traders were selling - and came out well ahead when markets recovered."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "behavior7-mc1",
            question: "Which two emotions most dominate emotional trading?",
            options: [
              "Boredom and curiosity",
              "Greed and fear",
              "Pride and envy",
              "Calm and patience"
            ],
            correctAnswer: 1,
            explanation: "Greed drives people to chase rising prices, while fear drives panic selling in downturns. Both push investors to buy high and sell low."
          },
          {
            id: "behavior7-mc2",
            question: "What does the 'behavior gap' describe?",
            options: [
              "The simple gap between two different stock prices at the very same exact moment",
              "Average investors earning less than the funds they own, due to emotional timing",
              "The total time that passes between first buying and later selling a single stock",
              "The plain difference in trading fees charged by two competing online discount brokers"
            ],
            correctAnswer: 1,
            explanation: "The behavior gap is the shortfall between fund returns and what investors actually earn, caused by buying high (greed) and selling low (fear)."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sofia's Panic Button",
        narrative: "The market drops 15% in two weeks after scary headlines, and Sofia's index fund is down with it. Every news alert screams disaster, and her stomach is in knots. She's tempted to sell everything to 'stop the bleeding,' even though her goals are years away and nothing about her own life has changed.",
        details: [
          "Sofia's fear is triggering her fast emotional brain, urging her to sell at a low point.",
          "Her goals are far in the future, so short-term drops don't change her actual plan.",
          "Selling now would lock in the loss and likely miss the eventual recovery.",
          "A 24-hour waiting rule would give the panic time to fade before she acts."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "behavior7-aq1",
          question: "What is the most disciplined response for Sofia?",
          options: [
            "Sell off absolutely everything immediately today to stop all the losses",
            "Follow her plan, avoid panic selling, and keep her long-term view",
            "Check the live price every few minutes throughout the day for updates",
            "Move all of her money into a single supposedly 'safe' stock"
          ],
          correctAnswer: 1,
          explanation: "Nothing about Sofia's goals changed - only her emotions. Panic selling locks in losses and misses the recovery. Sticking to her plan and long-term view is the disciplined choice."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Emotional trading means deciding by feeling instead of facts and a plan.",
          "Greed and fear disguise themselves as urgent, obvious truths.",
          "Under stress, the emotional brain overrides the logical one, causing buy-high/sell-low mistakes.",
          "The behavior gap means emotional investors earn less than the funds they own.",
          "Automation, written plans, friction, and limited inputs create protective discipline."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "behavior7-mastery1",
            question: "Why does the emotional brain make a poor stock trader?",
            options: [
              "It's just far too slow to ever make any real decisions",
              "It reacts to price swings as if they were physical dangers",
              "It only ever cares about the very cold, hard long-term facts",
              "It never feels any fear or any greed at all, ever"
            ],
            correctAnswer: 1,
            explanation: "The fast emotional system evolved for physical survival. It treats market drops like predators, triggering panic that's disastrous for investing."
          },
          {
            id: "behavior7-mastery2",
            question: "The classic emotional-trading mistake is to…",
            options: [
              "Buy low and then calmly sell high every single time",
              "Buy high in greed and sell low in fear",
              "Never buy or sell anything at all, ever, at any point",
              "Only ever invest in very safe government bonds"
            ],
            correctAnswer: 1,
            explanation: "Greed pushes buying after prices rise, and fear pushes selling after prices fall - locking in the worst of both and widening the behavior gap."
          },
          {
            id: "behavior7-mastery3",
            question: "Why is automating monthly contributions so effective against emotion?",
            options: [
              "It fully guarantees the whole market will always rise every year",
              "It removes the emotional choice of whether to invest each time",
              "It lets you time the market perfectly on every single trade",
              "It eliminates absolutely all of the investment fees you would ever pay"
            ],
            correctAnswer: 1,
            explanation: "Automated investing happens without a decision, so you keep buying through crashes and booms - your calm self already chose for you."
          },
          {
            id: "behavior7-mastery4",
            question: "How does a 24-hour waiting rule help?",
            options: [
              "It fully guarantees you a much better price the very next day",
              "It gives the emotional surge time to pass before you act",
              "It's strictly required by federal law for all stock trades placed",
              "It reliably doubles your potential profit on each and every single trade"
            ],
            correctAnswer: 1,
            explanation: "Adding friction lets the emotional wave subside and the logical brain re-engage, preventing impulsive trades you'd likely regret."
          },
          {
            id: "behavior7-mastery5",
            question: "Why do many long-term investors check their portfolios rarely?",
            options: [
              "Because constantly checking prices is strictly against the rules",
              "To avoid emotional reactions to normal ups and downs",
              "Because stock prices only ever update just once a year",
              "To deliberately hide their real losses from their own eyes"
            ],
            correctAnswer: 1,
            explanation: "Constant checking feeds the emotional brain triggers. Looking rarely reduces the temptation to react to routine volatility."
          },
          {
            id: "behavior7-mastery6",
            question: "What does 'discipline beats brilliance' mean for investors?",
            options: [
              "You must truly be a rare genius to invest well",
              "Sticking to a sound system matters more than clever predictions",
              "Your raw emotions are always the very best guide to follow",
              "Frequent, fast trading is by far the single smartest approach"
            ],
            correctAnswer: 1,
            explanation: "Consistently following a good plan through emotional times beats trying to outsmart the market with brilliant-seeming, emotion-driven moves."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // behavior-8: Avoiding Traps
  // ─────────────────────────────────────────────
  {
    lessonId: "behavior-8",
    sections: [
      {
        type: "concept",
        title: "Turning Awareness Into a System",
        paragraphs: [
          "You've now met the major behavioral traps: loss aversion, anchoring, confirmation bias, overconfidence, herd behavior, FOMO, and emotional trading. Here's the hard truth - knowing about a bias doesn't make you immune to it. These instincts are automatic and ancient; you can't simply will them away. The winning approach is to accept that your emotional brain will misfire and to build systems that make good decisions for you in advance, when you're calm. Great investors aren't people who feel no fear or greed; they're people who've designed their process so those feelings can't wreck their money.",
          "The single most powerful system is a written Investment Policy Statement - a simple document, even one page, that you write while thinking clearly. It states your goals, your time horizon, what you'll invest in, how you'll diversify, and specific rules for buying and selling. For example: 'I invest $100 a month in a broad index fund. I will not sell during downturns unless my life circumstances change. I will not buy anything I can't explain to a friend.' When emotions strike later, you don't make a new decision under stress - you just follow the plan your rational self already wrote.",
          "The second pillar is automation, which removes willpower from the equation entirely. Set up automatic transfers into diversified funds so investing happens on schedule regardless of headlines. Automation defeats FOMO (you're already investing steadily), emotional trading (no panic decision to make), and overconfidence (no urge to overtrade). Pair it with diversification - spreading money across many companies and assets - so no single mistake, and no single bias, can ruin you. Together, a written plan plus automation plus diversification form a fortress against your own worst instincts."
        ],
        bullets: [
          "Knowing about a bias does not make you immune - the instincts are automatic.",
          "Build systems that decide in advance, while you're calm, not in the heat of the moment.",
          "A written Investment Policy Statement sets goals and clear buy/sell rules.",
          "Automation removes willpower, defeating FOMO, panic, and overtrading at once.",
          "Diversification ensures no single mistake or bias can ruin you."
        ],
        realWorldExample: "Many disciplined investors keep a one-page plan taped where they'll see it: goals, a monthly auto-invest amount, and a rule not to sell in downturns. When markets crashed in 2020, those with such plans mostly held on and recovered, while people relying on willpower alone often panic-sold at the bottom."
      },
      {
        type: "concept",
        title: "Everyday Habits That Keep You Safe",
        paragraphs: [
          "Beyond the big systems, a handful of simple habits neutralize biases in daily life. First, add friction to important decisions: impose a 24-hour (or longer) waiting period before any big trade or purchase, giving emotional urges time to fade. Second, seek out disagreement on purpose - before you buy, deliberately find the strongest argument for why it's a bad idea, which directly counters confirmation bias and overconfidence. Third, keep a decision journal recording what you did and why, so hindsight bias and selective memory can't rewrite your track record.",
          "It also helps to manage your information diet. The financial media and social feeds are engineered to trigger fear and greed because those emotions keep you watching and clicking. Deliberately limiting how often you check prices and unfollowing hype accounts starves the biases of fuel. Ask a simple gut-check question before acting: 'Am I doing this because of analysis, or because of a feeling?' If you can't clearly explain the rational reason - beyond 'it's going up' or 'everyone's doing it' - that's a red flag to pause and reconsider.",
          "Finally, embrace the boring. The uncomfortable secret of successful investing is that it's supposed to be dull: buy diversified, low-cost funds, invest automatically, and let compounding work over decades. Excitement - the thrill of a hot stock, the rush of a viral trade - is usually a warning sign, not a reward signal, because excitement is where biases live. The investors who win aren't the ones with the flashiest moves; they're the ones humble enough to admit their brains will misfire and disciplined enough to build systems that protect them anyway."
        ],
        bullets: [
          "Add friction: wait 24 hours before big trades to let urges fade.",
          "Seek disagreement on purpose to fight confirmation bias and overconfidence.",
          "Keep a decision journal to defeat hindsight bias and selective memory.",
          "Limit your information diet; media is built to trigger fear and greed.",
          "Embrace boring - excitement usually signals a bias, not an opportunity."
        ],
        realWorldExample: "An investor's gut-check rule - 'never buy anything I can't explain to a friend in one sentence' - kept them out of complex crypto schemes and hyped meme stocks during the 2021 frenzy. When friends who chased those trades lost money, the boring, rules-based approach quietly protected their savings."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "behavior8-mc1",
            question: "Does knowing about a bias make you immune to it?",
            options: [
              "Yes, simply being aware of it completely removes the bias for good",
              "No, biases are automatic, so you need systems to protect yourself",
              "Yes, but this only ever works for the overconfidence bias by itself",
              "No, biases can never be reduced or managed at all, ever"
            ],
            correctAnswer: 1,
            explanation: "Biases are automatic and instinctive. Awareness helps, but you need built-in systems - plans, automation, friction - to actually protect your decisions."
          },
          {
            id: "behavior8-mc2",
            question: "What is an Investment Policy Statement?",
            options: [
              "An official government form you are required to sign before buying any stocks",
              "A written plan of your goals and specific buy/sell rules, made while calm",
              "An insurance policy that fully covers your whole portfolio against any market losses",
              "A ranked daily list of the hottest, most popular stocks to buy right today"
            ],
            correctAnswer: 1,
            explanation: "It's a simple written document stating your goals, what you'll own, and clear rules, so you follow your calm self's decisions instead of reacting emotionally."
          }
        ]
      },
      {
        type: "scenario",
        title: "Noah Builds His Defense",
        narrative: "Noah has learned about all the behavioral biases and wants to make sure they don't cost him money. He's deciding how to actually invest going forward. He knows he sometimes panics, feels FOMO from social media, and gets overconfident after wins. He wants a setup that protects him from himself.",
        details: [
          "Noah could write a one-page plan with clear rules for what to buy and when to sell.",
          "Automating a monthly transfer into a diversified index fund removes emotional choices.",
          "A 24-hour waiting rule before any big trade would blunt his panic and FOMO.",
          "Limiting how often he checks prices and hype accounts starves his biases of fuel."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "behavior8-aq1",
          question: "Which setup best protects Noah from his own biases?",
          options: [
            "Relying on sheer raw willpower alone to try to stay perfectly calm during every single swing",
            "A written plan, automated diversified investing, and a waiting rule for big trades",
            "Following the most popular and heavily hyped stocks currently trending on social media",
            "Trading very actively every day to stay one step ahead of the market"
          ],
          correctAnswer: 1,
          explanation: "Since awareness alone isn't enough, Noah needs systems: a written plan, automation, diversification, and friction. These make good decisions for him before emotions can interfere."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Knowing a bias doesn't remove it; you must build protective systems.",
          "A written Investment Policy Statement encodes calm, rational decisions in advance.",
          "Automation defeats FOMO, panic, and overtrading by removing willpower.",
          "Diversification ensures no single mistake or bias can ruin you.",
          "Add friction, seek disagreement, journal decisions, and embrace boring investing."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "behavior8-mastery1",
            question: "Why isn't awareness of biases enough to protect you?",
            options: [
              "Because these mental biases only ever affect other, less careful people",
              "Because biases are automatic instincts that awareness alone can't switch off",
              "Because simply being aware of your biases somehow makes every one of them stronger",
              "Because biases quietly disappear the moment you name them out loud"
            ],
            correctAnswer: 1,
            explanation: "Biases fire automatically under emotion. Knowing about them helps a little, but you need systems to actually guard your decisions."
          },
          {
            id: "behavior8-mastery2",
            question: "What is the main purpose of a written Investment Policy Statement?",
            options: [
              "To reliably predict well in advance exactly which stocks will rise next",
              "To lock in calm, rational rules you follow when emotions later strike",
              "To automatically reduce the total taxes you owe on your gains each year",
              "To fully guarantee that you will never once lose any of your money"
            ],
            correctAnswer: 1,
            explanation: "The statement records your goals and buy/sell rules while you're calm, so you follow that plan instead of reacting emotionally in a crisis."
          },
          {
            id: "behavior8-mastery3",
            question: "Automating your investing helps defeat which problems at once?",
            options: [
              "Only rising inflation and the yearly taxes you owe on gains",
              "FOMO, emotional trading, and the urge to overtrade",
              "Only the sudden bankruptcy of a single company you hold",
              "Only the currency exchange risk from holding foreign stocks"
            ],
            correctAnswer: 1,
            explanation: "Automation removes the recurring emotional choice, so you invest steadily (beating FOMO and panic) without the itch to overtrade from overconfidence."
          },
          {
            id: "behavior8-mastery4",
            question: "Why does diversification protect against your biases?",
            options: [
              "It fully guarantees you much higher investment returns every single year",
              "It ensures no single bad, bias-driven decision can ruin you",
              "It completely removes the need for any written plan at all",
              "It permanently eliminates the entire market's normal daily ups and downs"
            ],
            correctAnswer: 1,
            explanation: "Spreading money across many assets means one biased mistake on a single bet can't wipe you out - the damage is contained."
          },
          {
            id: "behavior8-mastery5",
            question: "Deliberately seeking the strongest argument against a purchase counters which biases?",
            options: [
              "Inflation and interest-rate risk",
              "Confirmation bias and overconfidence",
              "Broad diversification and steady compounding",
              "High taxes and broker fees"
            ],
            correctAnswer: 1,
            explanation: "Actively hunting for the best opposing case fights confirmation bias (seeking only agreement) and overconfidence (assuming you're right)."
          },
          {
            id: "behavior8-mastery6",
            question: "In disciplined investing, feeling excited about a trade is usually…",
            options: [
              "A reliable, trustworthy signal that you should buy even more",
              "A warning sign that a bias may be driving you",
              "Solid proof that the trade you are making is safe",
              "Something that is simply required in order to get good returns"
            ],
            correctAnswer: 1,
            explanation: "Excitement is where biases live. Successful investing is deliberately boring, so a thrill often signals FOMO or greed rather than a real opportunity."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // BUBBLES & CRASHES (bubble-1 .. bubble-7)
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // bubble-1: Tulip Mania
  // ─────────────────────────────────────────────
  {
    lessonId: "bubble-1",
    sections: [
      {
        type: "concept",
        title: "How a Flower Became Worth More Than a House",
        paragraphs: [
          "In the Dutch Republic of the 1630s, tulips were a status symbol. The most prized bulbs produced flowers with dramatic flame-like streaks of color, an effect we now know was caused by a virus. Because these rare bulbs took years to grow and multiply, supply was tiny while demand from wealthy merchants exploded. Prices climbed steadily, then wildly. By the winter of 1636 to 1637, a single bulb of the famous Semper Augustus reportedly traded for the price of a fine Amsterdam canal house - thousands of guilders when a skilled worker earned only a few hundred a year.",
          "What turned a fashion into a mania was the arrival of ordinary people chasing quick riches. Weavers, bakers, and farmers began trading tulip contracts in taverns, often for bulbs still in the ground that nobody planned to plant. Buyers weren't purchasing flowers to enjoy; they were buying pieces of paper they hoped to flip to a 'greater fool' at a higher price days later. This is the engine of every bubble: people stop caring what a thing is worth and care only that someone else will pay more tomorrow.",
          "In February 1637, a routine bulb auction in Haarlem suddenly found no buyers. Word spread, confidence evaporated, and prices collapsed by roughly 90% or more within weeks. Traders who had signed contracts to buy bulbs at sky-high prices now owed fortunes for flowers worth almost nothing. Dutch courts largely refused to enforce the debts, treating them as gambling. Tulip Mania is remembered as the first well-documented speculative bubble, and its shape - euphoria, a greater-fool frenzy, then a sudden crash - repeats across four centuries."
        ],
        bullets: [
          "Rare virus-streaked tulip bulbs became a luxury status symbol in 1630s Holland.",
          "Tiny supply plus surging demand pushed a single bulb to the price of a house.",
          "Ordinary people traded bulb contracts they never meant to plant, hoping to flip them.",
          "The 'greater fool' theory: buying an overpriced asset to resell to someone else.",
          "In February 1637 buyers vanished and prices fell roughly 90% in weeks."
        ],
        realWorldExample: "At the peak, one Semper Augustus bulb was said to sell for around 10,000 guilders, enough to buy a grand house on an Amsterdam canal. A few weeks after the crash, similar bulbs could barely fetch the price of an onion, leaving late buyers holding worthless contracts and enormous debts."
      },
      {
        type: "concept",
        title: "What Tulip Mania Teaches Every Investor",
        paragraphs: [
          "The lasting lesson of Tulip Mania is the gap between price and value. A tulip bulb is a pretty flower that grows into more bulbs; its real usefulness never changed while its price multiplied a hundredfold and then vanished. When you find yourself unable to explain why an asset is worth its price - beyond 'it keeps going up' - you may be inside a bubble. Value comes from what something produces or does; price is only what the last excited buyer paid.",
          "Bubbles also thrive on a story that makes wild prices feel reasonable. In Holland, the story was that tulips were a permanent symbol of wealth that only the well-off could own, so demand could 'never' fall. Every bubble since has had its own comforting narrative: railroads will reshape the world, the internet changes everything, house prices always rise. The narratives often contain real truth, which is exactly why they're so persuasive and so dangerous. A true story does not make a price sensible.",
          "Finally, Tulip Mania shows how quickly a crowd can reverse. For months, rising prices attracted more buyers, whose buying pushed prices higher still - a feedback loop. But feedback loops run both ways. The moment prices stalled and one auction failed, the same crowd rushed for the exits, and the loop reversed into a crash. Because everyone had assumed they could sell 'later,' they all tried to sell at once, and there was no one left to buy. Recognizing this pattern is the whole point of studying bubbles."
        ],
        bullets: [
          "Price is what the last buyer paid; value is what an asset actually produces or does.",
          "Every bubble rides a persuasive story that makes crazy prices feel justified.",
          "A story being partly true does not make an inflated price reasonable.",
          "Rising prices attract buyers whose buying lifts prices - a self-reinforcing loop.",
          "Feedback loops reverse: when everyone plans to sell 'later,' they sell at once."
        ],
        realWorldExample: "The word 'tulipmania' is still used by economists and journalists today. When Bitcoin surged and crashed, or when meme stocks spiked in 2021, commentators reached for the tulip comparison - proof that a 400-year-old flower craze remains the go-to warning about speculative bubbles."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bubble1-mc1",
            question: "What made the most valuable tulip bulbs so rare?",
            options: [
              "A virus caused prized flame-streaked patterns and slow growth",
              "They were secretly imported from another distant planet entirely",
              "The strict government of the day banned everyone from growing them",
              "They only ever bloomed once every single hundred years"
            ],
            correctAnswer: 0,
            explanation: "A virus produced the dramatic color streaks buyers loved, and the bulbs multiplied slowly, keeping supply tiny while demand soared."
          },
          {
            id: "bubble1-mc2",
            question: "The 'greater fool' theory describes buying an asset because…",
            options: [
              "It pays a large, reliable cash dividend to you each year",
              "You expect to resell it to someone at a higher price",
              "It is fully guaranteed against any loss by the federal government",
              "You plan to use it yourself forever and never sell it"
            ],
            correctAnswer: 1,
            explanation: "Greater-fool buying ignores real value and bets only that another buyer will pay more later - the core mechanism of a bubble."
          }
        ]
      },
      {
        type: "scenario",
        title: "Pieter Buys a Bulb He'll Never Plant",
        narrative: "Pieter, a Haarlem baker in 1636, watches his neighbors get rich trading tulip contracts. He spends a year's savings on a contract for a bulb still in the ground, planning to sell it in a month for double. He does not want the flower; he wants the profit. Then a February auction finds no buyers, and word spreads that prices are falling.",
        details: [
          "Pieter is buying to flip, not to grow flowers - classic greater-fool behavior.",
          "His plan depends entirely on someone paying even more than he did.",
          "When one auction fails, confidence cracks and the buying loop reverses fast.",
          "Everyone assumed they could sell 'later,' so now they all try to sell at once."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bubble1-aq1",
          question: "What is the clearest warning sign that Pieter is caught in a bubble?",
          options: [
            "He carefully researched the rare flower's exact soil type and growing conditions first",
            "He owns the asset only to resell it, not for any real use",
            "He paid for it fully using his own savings rather than borrowed money",
            "He bought the bulb in the cold winter instead of in the spring"
          ],
          correctAnswer: 1,
          explanation: "Buying purely to flip to a higher-paying buyer - with no interest in the asset's real use - is the defining feature of greater-fool speculation and bubble risk."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Tulip Mania (1636 to 1637) is the first well-documented speculative bubble.",
          "Tiny supply and a status-symbol story pushed bulbs to the price of houses.",
          "Greater-fool buying means paying too much, hoping to resell higher.",
          "When one auction failed, prices crashed roughly 90% in weeks.",
          "Price is what the last buyer paid; value is what the asset really produces."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bubble1-mastery1",
            question: "In which country and decade did Tulip Mania take place?",
            options: [
              "England during the roaring early 1720s",
              "The Dutch Republic in the 1630s",
              "France in the early 1550s",
              "Italy near the end of the 1490s"
            ],
            correctAnswer: 1,
            explanation: "Tulip Mania peaked in the Dutch Republic (Holland) in the winter of 1636 to 1637, the first famous speculative bubble."
          },
          {
            id: "bubble1-mastery2",
            question: "At its peak, a single prized tulip bulb could cost about as much as…",
            options: [
              "A single loaf of plain, fresh bread",
              "A fine house on an Amsterdam canal",
              "A single ordinary laborer's day of wages",
              "A small cloth bag of copper coins"
            ],
            correctAnswer: 1,
            explanation: "Bulbs like the Semper Augustus reportedly traded for thousands of guilders - the price of a grand canal house - far beyond any yearly wage."
          },
          {
            id: "bubble1-mastery3",
            question: "What triggered the collapse in February 1637?",
            options: [
              "A new law banning tulip sales outright",
              "An auction suddenly found no willing buyers",
              "A frost that killed every bulb in Holland",
              "The king seized all the tulips"
            ],
            correctAnswer: 1,
            explanation: "A routine Haarlem auction failed to attract buyers; confidence collapsed and prices fell roughly 90% within weeks."
          },
          {
            id: "bubble1-mastery4",
            question: "The difference between price and value means that…",
            options: [
              "Price and value are always exactly identical amounts for each and every asset",
              "Value is what an asset produces; price is what a buyer pays",
              "Value is always fully guaranteed to stay higher than the market price",
              "Price never changes over time once an asset first begins trading publicly"
            ],
            correctAnswer: 1,
            explanation: "A bulb's real usefulness never changed while its price soared and crashed. Price reflects buyer excitement; value reflects real usefulness."
          },
          {
            id: "bubble1-mastery5",
            question: "Why do bubbles need a persuasive story?",
            options: [
              "Stories make outrageous prices feel reasonable to buyers",
              "Stories are legally required for all public stock trading",
              "Stories slow prices way down and thus prevent crashes",
              "Stories only ever matter after a market crash ends"
            ],
            correctAnswer: 0,
            explanation: "A convincing narrative (tulips as permanent luxury) lets people justify wild prices. Stories that are partly true are the most dangerous."
          },
          {
            id: "bubble1-mastery6",
            question: "Why do bubble crashes happen so suddenly?",
            options: [
              "Governments always deliberately cause every single one of these bubbles on purpose",
              "Everyone plans to sell 'later,' so they all sell at once",
              "Prices are strictly frozen by law until one fixed set date",
              "The underlying assets themselves physically vanish and disappear entirely into thin air overnight"
            ],
            correctAnswer: 1,
            explanation: "The rising-price feedback loop reverses: once buying stalls, everyone who assumed they could exit later rushes out together, and there are no buyers left."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // bubble-2: Dot-Com
  // ─────────────────────────────────────────────
  {
    lessonId: "bubble-2",
    sections: [
      {
        type: "concept",
        title: "When Adding 'dot-com' Made a Company Worth Millions",
        paragraphs: [
          "In the late 1990s, the internet was new, exciting, and clearly going to change the world. Investors rushed to buy any company connected to it. The tech-heavy Nasdaq index roughly quintupled from 1995 to its March 2000 peak near 5,000. Startups with no profits - sometimes no revenue at all - went public and saw their shares double or triple on the first day of trading. A famous example, Pets.com, spent lavishly on advertising, including a Super Bowl ad, then collapsed within about nine months of its IPO. The rule of the era seemed to be that clicks and 'eyeballs' mattered more than earnings.",
          "The story driving the bubble was powerful and partly true: the internet really would reshape shopping, media, and communication. But investors stretched that truth into the idea that traditional measures of value no longer applied. Analysts invented metrics like 'page views' and 'mindshare' to justify prices that made no sense on profits. Companies added '.com' to their names and watched their stock jump. Money was cheap, venture capital flooded in, and everyone feared missing the next Amazon, so caution felt foolish.",
          "The reckoning came in 2000 and 2001. As it became clear that most of these companies would never earn a profit, the Nasdaq began to slide, eventually falling about 78% from its peak by late 2002. Trillions of dollars in paper wealth vanished. Hundreds of dot-coms went bankrupt. Yet a handful of firms with real businesses - Amazon and eBay among them - survived the crash and went on to dominate. That split is the crucial lesson: a genuine revolution can be real even while most companies riding it are wildly overpriced."
        ],
        bullets: [
          "The Nasdaq roughly quintupled from 1995 to its March 2000 peak near 5,000.",
          "Profitless startups soared on 'eyeballs' and clicks rather than earnings.",
          "Simply adding '.com' to a company's name could send its stock jumping.",
          "The Nasdaq fell about 78% from peak to its late-2002 bottom.",
          "A real revolution can be true even while most of its stocks are overpriced."
        ],
        realWorldExample: "Pets.com raised money in an early-2000 IPO, ran a memorable sock-puppet mascot in a Super Bowl ad, and shut down about nine months later - a symbol of companies that had marketing and hype but no path to profit."
      },
      {
        type: "concept",
        title: "Why Smart People Fell for It",
        paragraphs: [
          "The dot-com bubble is a warning that intelligence offers little protection against a mania. Professional fund managers, not just amateurs, poured money into profitless startups. The reason is that in a rising market, skeptics look wrong and even lose their jobs. A manager who avoided tech in 1999 badly trailed rivals who piled in, and clients pulled their money. This creates enormous pressure to join the crowd even when you privately doubt it - a dynamic that keeps bubbles inflating long past the point of sense.",
          "The era also birthed the phrase 'this time is different,' perhaps the four most expensive words in investing. Believers argued that the internet had rewritten the rules, so old-fashioned ideas like profits and cash flow no longer mattered. Whenever you hear that traditional valuation doesn't apply anymore, treat it as a red flag, not a green light. Technologies change; the arithmetic of a business eventually paying its owners does not. A company that never earns money is worth nothing in the end, however revolutionary its industry.",
          "The survivors offer the constructive lesson. Amazon's stock fell more than 90% from its bubble peak, yet the underlying business kept growing because it had real customers and a real plan to eventually profit. The bubble destroyed the companies that were only stories, while strengthening those with genuine value. For an investor, the takeaway is not to avoid new technology - it's to separate a great trend from a great price, and to insist on a real business underneath the exciting narrative."
        ],
        bullets: [
          "Even professional investors joined in; skeptics underperformed and lost clients.",
          "Rising markets punish caution, pressuring everyone to follow the crowd.",
          "'This time is different' is a classic and expensive bubble slogan.",
          "A company that never earns money is ultimately worth nothing.",
          "Separate a great trend from a great price - insist on a real business."
        ],
        realWorldExample: "Amazon shares crashed from about $107 in 1999 to under $6 in 2001, a drop of over 90%. But because the company had real revenue and a long-term plan, it survived and later became one of the most valuable firms on earth - unlike the pure hype stocks that vanished."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bubble2-mc1",
            question: "What did dot-com investors value more than profits?",
            options: [
              "Dividend payments and cash reserves",
              "Website traffic like clicks and 'eyeballs'",
              "Years the company had been in business",
              "The number of physical stores owned"
            ],
            correctAnswer: 1,
            explanation: "Investors chased 'eyeballs,' page views, and mindshare, betting that traffic would somehow turn into future profit - which often never came."
          },
          {
            id: "bubble2-mc2",
            question: "Roughly how far did the Nasdaq fall from its 2000 peak?",
            options: [
              "About 20%",
              "About 78%",
              "About 5%",
              "About 40%"
            ],
            correctAnswer: 1,
            explanation: "The Nasdaq dropped roughly 78% from its March 2000 peak near 5,000 to its late-2002 bottom, erasing trillions in value."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maya's Fund Manager Feels the Pressure",
        narrative: "In 1999, Maya's mom invests through a fund manager who thinks tech stocks are dangerously overpriced. He keeps some money in boring, profitable companies. For a year his fund trails rivals who loaded up on dot-coms, and nervous clients threaten to leave. He feels intense pressure to abandon his judgment and buy the hot stocks everyone else owns.",
        details: [
          "In a rising market, cautious investors look wrong and lose clients.",
          "This pressure pushes even professionals to join a bubble they distrust.",
          "The 'this time is different' story makes ignoring profits feel smart.",
          "When the Nasdaq later falls about 78%, the cautious manager is vindicated."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bubble2-aq1",
          question: "What lesson does the manager's experience best illustrate?",
          options: [
            "Always match whatever specific stocks happen to be most popular right now",
            "Social pressure can push even experts to join a bubble",
            "Tech companies are never once worth owning inside any real portfolio",
            "Trailing your rivals for a single year clearly proves you are wrong"
          ],
          correctAnswer: 1,
          explanation: "Bubbles inflate partly because doubting the crowd is painful and costly in the short run, pressuring even skilled professionals to follow along against their judgment."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The dot-com bubble peaked in March 2000 with the Nasdaq near 5,000.",
          "Profitless startups soared on clicks and hype rather than earnings.",
          "The Nasdaq then fell about 78% by late 2002, wiping out trillions.",
          "'This time is different' is a warning sign that valuation is being ignored.",
          "Real businesses like Amazon survived; pure-story companies vanished."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bubble2-mastery1",
            question: "Which index best tracks the dot-com bubble's rise and fall?",
            options: [
              "The bond yield curve",
              "The Nasdaq composite index",
              "The national unemployment rate",
              "The consumer price index"
            ],
            correctAnswer: 1,
            explanation: "The tech-heavy Nasdaq roughly quintupled by March 2000 and then fell about 78%, making it the signature chart of the dot-com era."
          },
          {
            id: "bubble2-mastery2",
            question: "Pets.com is remembered mainly as an example of…",
            options: [
              "A firm with heavy hype but no path to profit",
              "The single most profitable company of the entire late 1990s",
              "A large Wall Street bank that directly caused the crash",
              "A federal government program that first built the whole internet"
            ],
            correctAnswer: 0,
            explanation: "Pets.com spent big on advertising, including a Super Bowl ad, then folded within about nine months - a symbol of marketing without a viable business."
          },
          {
            id: "bubble2-mastery3",
            question: "What made the dot-com story so persuasive?",
            options: [
              "It was completely and utterly false from the very start",
              "The internet really was going to change the world",
              "Governments back then guaranteed every single startup's future profit",
              "There were truly absolutely no real risks involved at all"
            ],
            correctAnswer: 1,
            explanation: "The trend was genuinely revolutionary, which is exactly why investors stretched it into justifying prices that ignored profits entirely."
          },
          {
            id: "bubble2-mastery4",
            question: "Why did even professional investors join the bubble?",
            options: [
              "They were legally forced to buy tech stocks",
              "Skeptics trailed rivals and risked losing clients",
              "Profits no longer existed in any company",
              "They had no access to financial data"
            ],
            correctAnswer: 1,
            explanation: "In a soaring market, cautious managers underperform and clients flee, creating strong pressure to follow the crowd against one's own judgment."
          },
          {
            id: "bubble2-mastery5",
            question: "What does the phrase 'this time is different' usually signal?",
            options: [
              "A perfectly safe, well-priced, low-risk investment opportunity",
              "That investors are ignoring proven valuation rules",
              "That the government has fixed the market",
              "That profits are about to be guaranteed"
            ],
            correctAnswer: 1,
            explanation: "It is a classic bubble slogan claiming old rules no longer apply. The arithmetic of a business eventually paying its owners never really changes."
          },
          {
            id: "bubble2-mastery6",
            question: "What is the key lesson from Amazon surviving the crash?",
            options: [
              "All tech stocks always eventually recover fully in time",
              "A real business can outlast a bursting bubble",
              "Heavy marketing spending alone reliably guarantees a company's long survival",
              "Falling ninety percent in price always means certain bankruptcy"
            ],
            correctAnswer: 1,
            explanation: "Amazon fell over 90% but had real customers and a plan to profit, so it survived and thrived - unlike pure-hype firms with no business underneath."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // bubble-3: 2008 Crisis
  // ─────────────────────────────────────────────
  {
    lessonId: "bubble-3",
    sections: [
      {
        type: "concept",
        title: "How Home Loans Nearly Broke the World",
        paragraphs: [
          "In the mid-2000s, U.S. house prices had risen for years, and almost everyone believed they could only keep climbing. That belief let banks hand out risky 'subprime' mortgages to borrowers with weak credit, often with no down payment and low 'teaser' rates that later jumped. The thinking was that even if a borrower defaulted, the house could be sold for more than the loan. Home prices roughly doubled nationally from the late 1990s to 2006. Millions of people bought homes they could not truly afford, confident that rising prices would bail them out.",
          "The danger multiplied because Wall Street bundled thousands of these mortgages into complex securities and sold them worldwide as safe investments. Rating agencies stamped many with top AAA grades, so pension funds and banks across the globe bought them. Firms also sold insurance-like bets called credit default swaps on these bundles, tying institutions together in a hidden web. When mortgages were packaged this way, the original risk got buried under layers of paperwork, and few people understood how fragile the whole structure really was.",
          "In 2006 and 2007, house prices stopped rising and began to fall. Borrowers with teaser rates saw payments spike and started defaulting in waves. Suddenly those 'safe' mortgage securities were worth far less than believed, and no one knew who held the losses. In September 2008 the giant investment bank Lehman Brothers collapsed, freezing global credit. Stock markets crashed - the S&P 500 fell roughly 57% from its 2007 peak to March 2009 - and unemployment doubled to about 10%. It became the worst downturn since the Great Depression."
        ],
        bullets: [
          "Subprime mortgages went to weak borrowers on the belief prices only rise.",
          "U.S. home prices roughly doubled from the late 1990s to their 2006 peak.",
          "Banks bundled mortgages into securities rated 'safe' and sold them worldwide.",
          "When prices fell, defaults surged and the 'safe' bundles turned toxic.",
          "Lehman Brothers' September 2008 collapse froze credit and crashed markets."
        ],
        realWorldExample: "During the boom, so-called 'NINJA' loans - No Income, No Job, no Assets - were handed to borrowers who clearly could not repay. When home prices fell and teaser rates reset higher, defaults exploded, and the mortgage securities built on those loans collapsed in value, dragging banks worldwide down with them."
      },
      {
        type: "concept",
        title: "Why One Market Took Down the Whole System",
        paragraphs: [
          "The 2008 crisis shows the danger of leverage - using borrowed money to invest. Banks had borrowed heavily, sometimes holding just a few dollars of their own for every hundred dollars of assets. That magnifies gains on the way up but is deadly on the way down: a small drop in asset values can wipe out a bank's thin cushion entirely. When mortgage bundles lost value, over-leveraged firms became insolvent almost overnight, which is why the collapse was so fast and so severe once it started.",
          "The crisis also revealed how interconnected finance had become. Because the same toxic securities and insurance bets sat on balance sheets around the world, one failure threatened to topple the next like dominoes. Banks stopped trusting each other and refused to lend, so even healthy businesses couldn't get short-term loans to make payroll. This is 'systemic risk' - when the failure of one part endangers the entire system. Governments responded with massive bailouts and the Federal Reserve slashed rates near zero to stop the freefall.",
          "The human cost was enormous and uneven. Roughly 9 million Americans lost their jobs, and millions lost their homes to foreclosure, while the bailouts of large banks struck many as deeply unfair. The lasting lessons are practical: be suspicious of any asset 'that only goes up,' understand that borrowed money cuts both ways, and remember that complexity can hide risk rather than remove it. When you cannot understand how an investment actually makes money, that confusion is itself a warning."
        ],
        bullets: [
          "Leverage (borrowed money) magnifies gains but can wipe you out on the way down.",
          "Banks held tiny cushions, so small losses made them insolvent fast.",
          "Interconnected balance sheets spread the failure like falling dominoes.",
          "Systemic risk: one failure endangering the entire financial system.",
          "Complexity can hide risk; confusion about how money is made is a warning."
        ],
        realWorldExample: "Some investment banks operated with leverage near 30 to 1, meaning about $3 of their own money for every $100 of assets. A mere 3% to 4% fall in those assets could erase their entire cushion - which is exactly what happened when mortgage securities dropped, pushing firms like Lehman into sudden bankruptcy."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bubble3-mc1",
            question: "What belief allowed risky subprime lending to spread?",
            options: [
              "That house prices could only keep rising",
              "That interest rates in the country would never change",
              "That all borrowers had absolutely perfect credit scores",
              "That the government insured every loan fully"
            ],
            correctAnswer: 0,
            explanation: "Lenders assumed a defaulting borrower's house could always be resold for more, so weak loans felt safe - until prices fell."
          },
          {
            id: "bubble3-mc2",
            question: "What does 'leverage' mean in finance?",
            options: [
              "Saving money in a bank account",
              "Using borrowed money to invest",
              "Avoiding all forms of debt",
              "Buying only government bonds"
            ],
            correctAnswer: 1,
            explanation: "Leverage means investing with borrowed funds. It magnifies gains when prices rise but can wipe you out when they fall."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Nguyens Buy a House They Can't Afford",
        narrative: "In 2005, the Nguyen family gets a mortgage with no down payment and a low teaser rate that will jump after two years. The lender assures them that if payments ever get tough, they can sell the house for a profit since prices always rise. In 2007 their rate resets, their payment spikes, and home prices are now falling instead of climbing.",
        details: [
          "The whole plan depended on house prices continuing to rise forever.",
          "The teaser rate hid how expensive the loan would truly become.",
          "When prices fell, selling for a profit became impossible.",
          "Millions of similar loans defaulting turned 'safe' securities toxic."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bubble3-aq1",
          question: "What was the core flaw in the Nguyens' mortgage plan?",
          options: [
            "They chose a home in entirely the wrong neighborhood",
            "It relied on house prices rising forever to work",
            "They made far too large a cash down payment upfront",
            "They borrowed all the money from a small local bank"
          ],
          correctAnswer: 1,
          explanation: "The loan only made sense if prices kept climbing so they could refinance or sell at a profit. When prices fell, the entire plan - and millions like it - collapsed."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Subprime mortgages spread on the belief that home prices only rise.",
          "Banks bundled risky loans into 'safe'-rated securities sold worldwide.",
          "Heavy leverage meant small losses could make banks insolvent fast.",
          "Lehman Brothers' 2008 failure froze credit and crashed global markets.",
          "The S&P 500 fell about 57% and unemployment doubled to around 10%."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bubble3-mastery1",
            question: "What were subprime mortgages?",
            options: [
              "Loans given to borrowers with weak credit",
              "Loans offered only to the most wealthy buyers",
              "Loans backed up fully by the federal government",
              "Loans with no interest ever charged to anyone"
            ],
            correctAnswer: 0,
            explanation: "Subprime mortgages went to borrowers with poor credit, often with no down payment and teaser rates that later jumped sharply."
          },
          {
            id: "bubble3-mastery2",
            question: "How did the risk from bad mortgages spread worldwide?",
            options: [
              "Banks bundled them into securities sold across the globe",
              "Individual homeowners personally mailed all their own debts overseas",
              "The federal government physically shipped the actual houses abroad",
              "The risk stayed entirely inside just one single town"
            ],
            correctAnswer: 0,
            explanation: "Wall Street packaged thousands of mortgages into securities rated 'safe,' which banks and pension funds worldwide then bought."
          },
          {
            id: "bubble3-mastery3",
            question: "Which 2008 event froze global credit markets?",
            options: [
              "A new tax law on homeowners",
              "The collapse of Lehman Brothers",
              "A stock split at a tech company",
              "A change in the tulip market"
            ],
            correctAnswer: 1,
            explanation: "Lehman Brothers' September 2008 bankruptcy shattered trust between banks, freezing lending and triggering a global market crash."
          },
          {
            id: "bubble3-mastery4",
            question: "Why did heavy leverage make the crisis so severe?",
            options: [
              "It made all the big banks completely and totally risk-free",
              "Small losses could wipe out a bank's thin cushion",
              "It reliably guaranteed steady profits for every single bank",
              "It had no real effect at all on bank stability"
            ],
            correctAnswer: 1,
            explanation: "With just a few dollars of their own per hundred in assets, banks could be made insolvent by a small drop in asset values."
          },
          {
            id: "bubble3-mastery5",
            question: "What is 'systemic risk'?",
            options: [
              "The risk of a single stock falling",
              "One failure endangering the whole financial system",
              "The risk of paying too much in fees",
              "The chance a company misses one earnings report"
            ],
            correctAnswer: 1,
            explanation: "Because banks were interconnected through the same toxic assets, one firm's failure threatened to topple others like dominoes."
          },
          {
            id: "bubble3-mastery6",
            question: "Roughly how far did the S&P 500 fall during the crisis?",
            options: [
              "About 10% from peak to trough",
              "About 57% from peak to trough",
              "About 5% from peak to trough",
              "About 25% from peak to trough"
            ],
            correctAnswer: 1,
            explanation: "The S&P 500 fell roughly 57% from its 2007 peak to its March 2009 bottom - the worst downturn since the Great Depression."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // bubble-4: COVID Crash
  // ─────────────────────────────────────────────
  {
    lessonId: "bubble-4",
    sections: [
      {
        type: "concept",
        title: "The Fastest Crash and Fastest Recovery in History",
        paragraphs: [
          "In February and March 2020, as the coronavirus spread and countries locked down, the stock market suffered its quickest crash ever. The S&P 500 fell about 34% in just 33 days - a drop that took over a year during the 2008 crisis. Fear was total: no one knew how deadly the virus was, how long lockdowns would last, or whether the economy could survive with restaurants, flights, and stores shut. Oil prices briefly went negative for the first time in history because storage tanks filled up with unused fuel.",
          "What made the COVID crash unusual was the response and the speed of recovery. Central banks and governments acted with stunning force. The U.S. Federal Reserve slashed interest rates to near zero and pumped trillions of dollars into the financial system, while Congress sent stimulus checks directly to households. This flood of money, plus optimism about vaccines, sparked a rebound so fast that the S&P 500 hit new record highs by August 2020 - only about five months after the bottom - even as the pandemic still raged.",
          "The recovery was strangely lopsided, revealing the difference between the stock market and the economy. While millions were unemployed and small businesses closed, stocks of technology companies like Zoom, Amazon, and Netflix soared because lockdowns pushed life online. This 'K-shaped' pattern - some sectors booming while others collapsed - reminded investors that the stock market is not the economy. Markets look forward to expected future profits, so they can rise even while current conditions on the ground remain painful for millions of people."
        ],
        bullets: [
          "The S&P 500 fell about 34% in just 33 days in early 2020 - the fastest crash ever.",
          "Oil prices briefly turned negative as storage tanks overflowed with unused fuel.",
          "The Fed cut rates near zero and injected trillions; Congress sent stimulus checks.",
          "Stocks hit new record highs by August 2020, about five months after the low.",
          "A 'K-shaped' split saw tech boom while travel and dining collapsed."
        ],
        realWorldExample: "Zoom Video, barely known before 2020, saw its stock soar as remote work and school exploded, while cruise and airline stocks cratered as travel stopped. The same crisis that devastated some industries handed record growth to others - a vivid picture of a K-shaped market."
      },
      {
        type: "concept",
        title: "What COVID Taught Everyday Investors",
        paragraphs: [
          "The COVID crash is a powerful lesson in why panic-selling is dangerous. An investor who sold near the March 23, 2020 bottom locked in huge losses and then missed one of the fastest recoveries in history. Someone who instead stayed invested, or even kept buying steadily, saw their portfolio recover within months and then reach new highs. Because the sharpest rebounds often come right after the scariest drops, being out of the market for just a handful of the best days can devastate long-term returns.",
          "The episode also showed the power of central banks to move markets. Much of the 2020 recovery was driven not by good economic news but by the Fed's flood of cheap money, which pushed investors toward stocks in search of returns. This is a recurring theme: when money is cheap and plentiful, asset prices tend to rise. Understanding what the Fed is doing became essential for making sense of a market that was climbing while unemployment stayed high and the pandemic continued.",
          "Finally, the cheap-money boom that followed sowed the seeds of later trouble. The same stimulus that rescued markets in 2020 helped fuel speculative frenzies in 2021 - meme stocks, crypto, and unprofitable startups all soared - and contributed to the highest inflation in 40 years by 2022. This is the deeper pattern: emergency responses that stop a crash can create the next bubble. For an investor, the practical takeaways are to avoid panic-selling, respect central-bank power, and stay wary when easy money is inflating everything at once."
        ],
        bullets: [
          "Panic-selling near the bottom locks in losses and misses the recovery.",
          "The market's best days often cluster right after its worst ones.",
          "The Fed's cheap money, not good news, drove much of the 2020 rebound.",
          "Cheap, plentiful money tends to push asset prices higher across the board.",
          "The 2020 rescue helped fuel 2021 speculation and 2022's high inflation."
        ],
        realWorldExample: "Studies of long-term returns show that missing just the 10 best market days over a couple of decades can cut your total return by half or more. Many of those best days fell in March and April 2020, right after the crash - so investors who panicked and sold missed the rebound entirely."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bubble4-mc1",
            question: "What was unusual about the COVID crash of early 2020?",
            options: [
              "It was by far the slowest crash in all market history",
              "It was the fastest crash, then a very fast recovery",
              "The market itself never actually fell even a little at all",
              "It took well over a full decade to fully recover"
            ],
            correctAnswer: 1,
            explanation: "The S&P 500 fell about 34% in 33 days - the quickest crash ever - then rebounded to new highs within about five months."
          },
          {
            id: "bubble4-mc2",
            question: "What does 'the stock market is not the economy' mean here?",
            options: [
              "Stocks and the whole economy always move together",
              "Stocks can rise even while many people struggle",
              "The economy has no effect on stocks ever",
              "Only the wider economy truly matters, not the stocks"
            ],
            correctAnswer: 1,
            explanation: "Markets look ahead to future profits, so they can climb even while unemployment is high and businesses close - as in 2020's K-shaped recovery."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sam Panics in March 2020",
        narrative: "Sam, 19, has $1,000 invested in an index fund. In March 2020 the news is terrifying, the market has dropped about 34%, and Sam sells everything to 'stop the bleeding,' turning the $1,000 into about $660. Sam plans to buy back in once things feel safe. But the market bottoms days later and rockets upward, hitting new highs by August while Sam waits on the sidelines.",
        details: [
          "Selling near the bottom turned a paper loss into a locked-in real loss.",
          "The scariest moment was actually near the point of maximum opportunity.",
          "The market's best days came right after the worst, and Sam missed them.",
          "Waiting to 'feel safe' meant buying back later at higher prices."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bubble4-aq1",
          question: "What would have served Sam better during the crash?",
          options: [
            "Selling off everything at once to avoid further losses",
            "Staying invested rather than panic-selling the drop",
            "Waiting until stocks felt completely safe to sell",
            "Moving all savings into cash permanently"
          ],
          correctAnswer: 1,
          explanation: "Because the fastest rebounds often follow the sharpest drops, staying invested (or buying steadily) beats panic-selling near the bottom and missing the best recovery days."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The COVID crash saw the S&P 500 fall about 34% in just 33 days.",
          "The Fed's near-zero rates and stimulus drove a record-fast recovery.",
          "Stocks hit new highs by August 2020 despite high unemployment.",
          "The K-shaped recovery split booming tech from collapsing travel.",
          "Panic-selling near the bottom locks in losses and misses the rebound."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bubble4-mastery1",
            question: "Roughly how much and how fast did the S&P 500 fall in the COVID crash?",
            options: [
              "About 34% in around 33 days",
              "About 5% spread over two long years",
              "About 70% in a single day",
              "About 10% spread over five years"
            ],
            correctAnswer: 0,
            explanation: "The index fell roughly 34% in about 33 days in February and March 2020, the fastest crash of that size in history."
          },
          {
            id: "bubble4-mastery2",
            question: "What drove the unusually fast 2020 recovery?",
            options: [
              "The whole pandemic suddenly ending within weeks",
              "Massive Fed money and government stimulus",
              "A ban on selling any stocks",
              "Companies suddenly doubling all of their profits"
            ],
            correctAnswer: 1,
            explanation: "Near-zero rates, trillions injected by the Fed, and stimulus checks flooded the system, sparking a rebound to new highs by August 2020."
          },
          {
            id: "bubble4-mastery3",
            question: "What is a 'K-shaped' recovery?",
            options: [
              "Every sector recovering at the same speed",
              "Some sectors booming while others collapse",
              "The market recovering in a straight line",
              "A recovery that never actually happens"
            ],
            correctAnswer: 1,
            explanation: "In 2020, tech and online firms soared while travel and dining cratered - two arms of a K pointing in opposite directions."
          },
          {
            id: "bubble4-mastery4",
            question: "Why is panic-selling near a bottom so costly?",
            options: [
              "It always triggers extra capital-gains taxes and broker fees",
              "The market's best days often follow its worst",
              "Stocks can never once be bought back ever again",
              "It is illegal to sell during a crash"
            ],
            correctAnswer: 1,
            explanation: "The sharpest rebounds tend to come right after the scariest drops, so selling near the bottom locks in losses and misses the recovery."
          },
          {
            id: "bubble4-mastery5",
            question: "What long-term effect did the 2020 stimulus help cause?",
            options: [
              "Long decades of steadily falling prices everywhere",
              "2021 speculation and 2022's high inflation",
              "A permanent end to all market risk",
              "Immediate and total full employment forever"
            ],
            correctAnswer: 1,
            explanation: "The flood of cheap money helped fuel meme-stock and crypto frenzies in 2021 and contributed to the highest inflation in 40 years by 2022."
          },
          {
            id: "bubble4-mastery6",
            question: "Missing just the market's 10 best days over decades can…",
            options: [
              "Slightly raise your total long-run return over time",
              "Cut your total return by half or more",
              "Have no real effect on your returns at all",
              "Fully guarantee that you always beat the whole market"
            ],
            correctAnswer: 1,
            explanation: "Because gains cluster in a few big days (many right after crashes), being out for even those few days can devastate long-term returns."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // bubble-5: Speculation Cycles
  // ─────────────────────────────────────────────
  {
    lessonId: "bubble-5",
    sections: [
      {
        type: "concept",
        title: "The Five Stages Every Bubble Repeats",
        paragraphs: [
          "Economist Hyman Minsky described a pattern that shows up in bubble after bubble across centuries. It begins with displacement: a real change - a new technology, low interest rates, a fresh market - creates genuine opportunity. Next comes boom, as prices rise and early buyers profit, drawing in more people. Then euphoria takes over, where caution disappears and 'this time is different' thinking rules. Near the top, smart early investors quietly take profit - a stage called profit-taking. Finally comes panic, when prices reverse and everyone rushes to sell at once.",
          "The engine that drives these stages is human emotion swinging between greed and fear. In the boom and euphoria phases, greed dominates: people see others getting rich, feel the fear of missing out, and buy at any price. When the trend breaks, greed flips to fear, and the same crowd that couldn't buy fast enough now can't sell fast enough. Because emotions are contagious, they push prices far above and then far below what the assets are really worth. Understanding this cycle helps you notice when you're being swept along by the crowd.",
          "History rhymes even when the assets change. The 1840s British Railway Mania saw investors pour money into railroad companies until the sector crashed. The 1929 stock boom ran on borrowed money before the Great Crash. The 2017 and 2021 crypto surges, and the 2021 meme-stock frenzy around GameStop, followed the same emotional arc. The specific asset - tulips, railroads, dot-coms, houses, crypto - is almost a costume. The underlying human drama of greed, euphoria, and panic is the constant that lets us recognize bubbles as they form."
        ],
        bullets: [
          "Minsky's stages: displacement, boom, euphoria, profit-taking, then panic.",
          "Displacement is a real change that creates genuine early opportunity.",
          "Greed and fear of missing out drive the boom and euphoria phases.",
          "Fear flips the crowd from frantic buying to frantic selling at the top.",
          "The asset changes - tulips, railroads, crypto - but the emotions repeat."
        ],
        realWorldExample: "Britain's 1840s Railway Mania saw hundreds of railway companies float shares as investors, sure that railroads would transform the country, bid prices skyward. Many lines were never built, the bubble burst, and countless investors were ruined - the same arc later traced by dot-coms and crypto."
      },
      {
        type: "concept",
        title: "Spotting a Mania Before It Pops",
        paragraphs: [
          "Certain warning signs tend to appear late in a bubble. One classic sign is when people with no background in investing suddenly start trading and giving tips - the old story of a shoeshine boy offering stock picks in 1929 supposedly warned Joseph Kennedy to sell before the crash. When your barber, classmates, and social feeds are all buzzing about the same 'can't-lose' asset, the pool of new buyers is running out, and a bubble needs a constant supply of fresh buyers to keep rising.",
          "Other red flags include the widespread use of borrowed money to buy in, wild price gains disconnected from any real earnings, and stories claiming old valuation rules no longer apply. You'll also hear intense fear of missing out and mockery of anyone urging caution. None of these alone proves a bubble, and bubbles can inflate far longer than skeptics expect - which is why simply 'shorting' or betting against them is dangerous. The goal is awareness and discipline, not perfect timing of the top.",
          "The practical defense is a plan set in advance and rules that resist emotion. Decide how much of your money any single speculative bet may hold, and never risk cash you'll need soon. Rebalancing - trimming assets that have grown huge and adding to those that have lagged - forces you to take profits during euphoria and buy during panic, the opposite of what emotion demands. You don't need to predict the exact peak; you need to avoid betting your future on a mania and to keep your head when the crowd loses theirs."
        ],
        bullets: [
          "Late-bubble sign: total newcomers start trading and giving hot tips.",
          "A bubble needs endless fresh buyers; hype signals the pool is drying up.",
          "Borrowed money, earnings-free price spikes, and FOMO are red flags.",
          "Betting against bubbles is risky because they can inflate far longer.",
          "Preset limits and rebalancing enforce discipline against greed and fear."
        ],
        realWorldExample: "In 2021, the GameStop frenzy pulled in millions of first-time traders through social media, with prices spiking on hype rather than the company's actual sales. The stock rocketed from a few dollars to over $80 (split-adjusted) and then crashed, ruining many who bought late chasing the crowd."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bubble5-mc1",
            question: "In Minsky's model, what is 'displacement'?",
            options: [
              "The exact moment when prices finally crash hard",
              "A real change that creates genuine opportunity",
              "The time when investors all panic and sell",
              "The single point of absolute maximum euphoria"
            ],
            correctAnswer: 1,
            explanation: "Displacement is the real shift - new tech, low rates, a new market - that sparks the initial, legitimate opportunity a bubble later exaggerates."
          },
          {
            id: "bubble5-mc2",
            question: "Why is a crowd of total newcomers a bubble warning sign?",
            options: [
              "Newcomers always somehow pick the very best stocks around each time",
              "It signals the pool of fresh buyers is running out",
              "It fully guarantees that prices will just keep rising forever",
              "It means the asset clearly has real, lasting, deep value"
            ],
            correctAnswer: 1,
            explanation: "Bubbles need a steady supply of new buyers. When everyone, even novices, has already bought in, there is no one left to push prices higher."
          }
        ]
      },
      {
        type: "scenario",
        title: "Dev Hears a Hot Tip From Everyone",
        narrative: "Dev, 18, notices that his classmates, his cousin, and every video in his feed are talking about the same 'can't-lose' coin that has tripled in a month. People are borrowing money to buy more, and anyone who hesitates is mocked for 'not getting it.' Dev feels intense pressure to jump in before he misses out completely.",
        details: [
          "Total newcomers piling in signals the buyer pool is nearly exhausted.",
          "Borrowed money and mockery of caution are classic late-bubble red flags.",
          "Fear of missing out is the emotional engine of the euphoria stage.",
          "A preset limit on speculative bets would protect Dev from the mania."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bubble5-aq1",
          question: "Which combination of signs best warns Dev he may be near a bubble top?",
          options: [
            "Steady growth backed by real rising company profits",
            "Newcomers, borrowed money, FOMO, and mockery of caution",
            "Broadly falling prices and deep, widespread public pessimism",
            "A slow, boring market with very little news"
          ],
          correctAnswer: 1,
          explanation: "A flood of novice buyers, heavy leverage, intense fear of missing out, and scorn for skeptics are textbook late-stage euphoria signals that a bubble may be near its peak."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Minsky's stages: displacement, boom, euphoria, profit-taking, panic.",
          "Greed and fear of missing out drive prices far above real value.",
          "History rhymes: railroads, dot-coms, houses, and crypto share one arc.",
          "Newcomers, leverage, FOMO, and 'new rules' talk signal a late bubble.",
          "Preset limits and rebalancing enforce discipline against the crowd."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bubble5-mastery1",
            question: "Which economist described the classic bubble stages?",
            options: [
              "Adam Smith",
              "Hyman Minsky",
              "Milton Friedman",
              "Karl Marx"
            ],
            correctAnswer: 1,
            explanation: "Hyman Minsky's model of displacement, boom, euphoria, profit-taking, and panic maps the arc that bubbles repeat across history."
          },
          {
            id: "bubble5-mastery2",
            question: "What two emotions mainly drive the bubble cycle?",
            options: [
              "Boredom and curiosity",
              "Greed and fear",
              "Pride and envy",
              "Calm and patience"
            ],
            correctAnswer: 1,
            explanation: "Greed fuels the boom and euphoria; fear drives the panic. These contagious emotions push prices far above and below real value."
          },
          {
            id: "bubble5-mastery3",
            question: "The 1840s Railway Mania is an example of…",
            options: [
              "A calm market with no speculation at all",
              "The same bubble arc in a different asset",
              "A sudden market crash caused by a virus",
              "A large, government-run public investment program for everyone"
            ],
            correctAnswer: 1,
            explanation: "British investors bid up railway shares on the belief railroads would transform society, then crashed - the same arc as dot-coms and crypto."
          },
          {
            id: "bubble5-mastery4",
            question: "Why can't you reliably profit by simply betting against a bubble?",
            options: [
              "Bubbles are strictly illegal to ever bet against",
              "Bubbles can keep inflating far longer than expected",
              "Bubbles never actually pop or burst at all",
              "Betting against them is fully guaranteed to always win"
            ],
            correctAnswer: 1,
            explanation: "Manias often run far past the point of sense, so shorting them can bankrupt you before you're proven right. Discipline beats trying to time the top."
          },
          {
            id: "bubble5-mastery5",
            question: "How does regular rebalancing enforce discipline?",
            options: [
              "It completely removes every last bit of risk from investing",
              "It trims what has soared and buys what has lagged",
              "It fully guarantees you will always buy at the exact bottom",
              "It stops the whole broad market from ever once falling"
            ],
            correctAnswer: 1,
            explanation: "Rebalancing forces you to take profits during euphoria and add during panic - the opposite of what greed and fear urge."
          },
          {
            id: "bubble5-mastery6",
            question: "The 2021 GameStop frenzy showed the bubble pattern because…",
            options: [
              "Prices rose on hype and newcomers, not real sales",
              "The company reported truly record-breaking quarterly profits every single quarter",
              "Only seasoned expert investors were ever involved in it",
              "Prices rose slowly and steadily for many long years"
            ],
            correctAnswer: 0,
            explanation: "Millions of first-time traders bid the stock up on social-media hype rather than the company's actual business, then it crashed - a textbook mania."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // bubble-6: Corrections
  // ─────────────────────────────────────────────
  {
    lessonId: "bubble-6",
    sections: [
      {
        type: "concept",
        title: "The Difference Between a Dip, a Correction, and a Crash",
        paragraphs: [
          "Not every drop in the market is a disaster. Investors use precise labels based on size. A 'pullback' is a fall of about 5% to 10% and happens several times a year - it's ordinary noise. A 'correction' is a decline of 10% or more from a recent high; these occur on average about once a year and usually last a few months. A 'bear market' is a drop of 20% or more, which is more serious and less frequent, arriving roughly every few years. A full-blown 'crash' is a sudden, steep plunge, often happening in days.",
          "The crucial insight is that corrections are normal and healthy, not signs the world is ending. The stock market does not rise in a straight line; it climbs in a jagged, zig-zag pattern. Over the long run, U.S. stocks have returned about 10% per year on average, but they've reached that average through countless dips, corrections, and recoveries along the way. A market that only went up would actually be a warning sign of a bubble. Regular pullbacks let overpriced areas cool off and reset expectations.",
          "History shows how routine these events are. The S&P 500 has experienced dozens of corrections since 1950, and in the large majority of cases it recovered and went on to new highs, often within months. The key difference between a correction and a bubble-driven crash is what preceded it: corrections often just interrupt a healthy uptrend, while crashes typically follow a period of euphoric overpricing. Knowing which one you may be facing helps you decide whether to stay calm or reassess your risk."
        ],
        bullets: [
          "Pullback: a 5% to 10% dip, happening several times a year.",
          "Correction: a 10%-or-more fall, roughly once a year on average.",
          "Bear market: a 20%-or-more decline, arriving every few years.",
          "Stocks average about 10% a year but only through a zig-zag path.",
          "Corrections are normal and healthy; only-up markets signal a bubble."
        ],
        realWorldExample: "In 2018 the S&P 500 fell about 20% from September to December on worries about interest rates and trade, scaring many investors. But it wasn't a bubble bursting - just a sharp correction. The market recovered fully in 2019 and reached new record highs, rewarding those who stayed calm."
      },
      {
        type: "concept",
        title: "How to Act When the Market Drops",
        paragraphs: [
          "The most important skill during a decline is doing nothing rash. Because corrections are frequent and usually temporary, the investor who panics and sells often locks in losses right before the recovery. A better approach is to have decided your plan in advance, when you were calm: how your money is split between stocks and safer assets, and how much volatility you can stomach. If you built the right plan, a correction requires no action at all - you simply let it pass.",
          "For long-term investors, corrections can even be opportunities. Buying the same amount on a regular schedule - a strategy called dollar-cost averaging - means you automatically buy more shares when prices are low and fewer when prices are high. A correction hands you a discount. This is why seasoned investors sometimes welcome dips: if you're going to keep buying for decades, cheaper prices today help you, not hurt you. The mindset flip from 'prices are falling, panic' to 'stocks are on sale' is what separates disciplined investors from the crowd.",
          "The danger comes from confusing a normal correction with a genuine bubble collapse - or the reverse. If a drop follows a period of clear euphoria, heavy borrowing, and prices detached from earnings, it may be the start of something bigger, and reassessing your risk is wise. But most declines are ordinary. The practical rule is to keep enough safe money that you never have to sell stocks at a bad time, avoid checking prices obsessively, and stick to the plan you made before fear arrived."
        ],
        bullets: [
          "During most declines, the best action is no rash action at all.",
          "A plan set while calm removes the need to react to every dip.",
          "Dollar-cost averaging buys more shares when prices fall - a discount.",
          "Seasoned investors can treat corrections as 'stocks on sale.'",
          "Keep safe money so you never have to sell stocks at a bad time."
        ],
        realWorldExample: "An investor putting $100 into an index fund every month automatically buys more shares during a correction, when prices are low, and fewer when prices are high. Over decades this dollar-cost averaging turns scary dips into buying opportunities without any need to predict the market's next move."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bubble6-mc1",
            question: "A market decline of 10% or more from a recent high is called a…",
            options: [
              "Pullback",
              "Correction",
              "Rally",
              "Split"
            ],
            correctAnswer: 1,
            explanation: "A correction is a fall of 10% or more; a smaller 5% to 10% dip is a pullback, and a 20%-plus drop is a bear market."
          },
          {
            id: "bubble6-mc2",
            question: "How does dollar-cost averaging help during a correction?",
            options: [
              "It stops all stock prices from ever falling",
              "It buys more shares when prices are low",
              "It fully guarantees that you sell at the top",
              "It completely removes every bit of investment risk"
            ],
            correctAnswer: 1,
            explanation: "Investing a fixed amount on a schedule automatically buys more shares when prices drop, turning corrections into discounted buying."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Sees Red in Her Account",
        narrative: "Priya, 20, invests $150 a month in an index fund. One month the market falls 12% and her account balance drops noticeably for the first time. Alarmed, she wonders whether to stop investing or sell to avoid further losses. She has a stable job, an emergency fund, and won't need this money for at least a decade.",
        details: [
          "A 12% drop is a correction - normal and usually temporary.",
          "Her monthly $150 now buys more shares at the lower prices.",
          "Her emergency fund means she never has to sell at a bad time.",
          "Her decade-long horizon makes short-term dips largely irrelevant."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bubble6-aq1",
          question: "What is the wisest move for Priya during this correction?",
          options: [
            "Sell her fund to prevent any further losses",
            "Keep investing steadily and let the dip pass",
            "Stop investing until the market fully recovers",
            "Move all her money into a single hot stock"
          ],
          correctAnswer: 1,
          explanation: "With an emergency fund and a decade-long horizon, a normal correction requires no action. Continuing to invest lets her buy more shares cheaply through dollar-cost averaging."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Pullbacks (5 to 10%), corrections (10%+), and bear markets (20%+) differ by size.",
          "Corrections happen about once a year and are normal, not disasters.",
          "Stocks average about 10% a year but only through a zig-zag path.",
          "A plan set while calm means most dips need no action.",
          "Dollar-cost averaging turns corrections into discounted buying."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bubble6-mastery1",
            question: "How large is a market 'correction'?",
            options: [
              "A drop of 10% or more from a recent high",
              "A tiny drop of exactly one percent from the recent peak",
              "A very deep sudden drop of fifty percent or even more",
              "Any single day at all when the market falls even slightly"
            ],
            correctAnswer: 0,
            explanation: "A correction is a decline of 10% or more; smaller dips are pullbacks and 20%-plus drops are bear markets."
          },
          {
            id: "bubble6-mastery2",
            question: "About how often do corrections occur on average?",
            options: [
              "Roughly once a year",
              "Only once a century",
              "Several times every single day",
              "They have never happened"
            ],
            correctAnswer: 0,
            explanation: "Corrections arrive on average about once a year and usually last a few months before the market recovers."
          },
          {
            id: "bubble6-mastery3",
            question: "Why is a market that only ever rises actually concerning?",
            options: [
              "It clearly means the whole economy has fully stopped growing",
              "It can be a warning sign of a bubble",
              "It reliably guarantees an immediate federal government shutdown soon",
              "It firmly proves that stocks are badly undervalued right now"
            ],
            correctAnswer: 1,
            explanation: "Healthy markets climb in a jagged, zig-zag path. Prices that only go up, with no cooling-off dips, often signal dangerous overpricing."
          },
          {
            id: "bubble6-mastery4",
            question: "What best distinguishes a normal correction from a bubble crash?",
            options: [
              "Corrections only happen on weekends",
              "Crashes usually follow euphoric overpricing",
              "Corrections always last for many years",
              "Crashes never recover at all"
            ],
            correctAnswer: 1,
            explanation: "Corrections often just interrupt a healthy uptrend, while crashes typically follow a period of euphoria, heavy borrowing, and prices detached from earnings."
          },
          {
            id: "bubble6-mastery5",
            question: "Why can keeping an emergency fund help during a correction?",
            options: [
              "It somehow makes all of your own stock prices rise much faster",
              "So you never have to sell stocks at a bad time",
              "It reliably doubles every bit of your total investment returns each year",
              "It fully prevents any market corrections from ever happening again at all"
            ],
            correctAnswer: 1,
            explanation: "Safe cash means you can cover surprises without selling stocks during a dip, letting your investments recover instead of locking in losses."
          },
          {
            id: "bubble6-mastery6",
            question: "What mindset shift helps disciplined investors during dips?",
            options: [
              "Seeing falling prices as stocks being on sale",
              "Selling everything at the first sign of red",
              "Checking the live prices every single few minutes",
              "Borrowing extra money to buy at the top"
            ],
            correctAnswer: 0,
            explanation: "If you plan to keep buying for years, cheaper prices help you. Viewing dips as discounts, not disasters, separates the disciplined from the panicked."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // bubble-7: Unsustainable Growth
  // ─────────────────────────────────────────────
  {
    lessonId: "bubble-7",
    sections: [
      {
        type: "concept",
        title: "Why Nothing Can Grow Forever",
        paragraphs: [
          "A simple truth exposes many bubbles: exponential growth cannot continue indefinitely in a finite world. If an asset grows 50% a year, it doubles roughly every year and a half. Keep that up for a decade and the numbers become absurd - larger than the whole economy could support. Yet during manias, people quietly assume the recent breakneck pace will continue forever. Whenever a projection requires something to grow far faster than the overall economy for many years, that projection is almost certainly a fantasy, no matter how confident its promoters sound.",
          "A famous illustration is Ponzi and pyramid schemes, which promise steady high returns that supposedly never falter. Bernie Madoff ran the largest such fraud in history, reporting smooth, roughly 10%-plus yearly gains for decades. That impossible consistency was itself the giveaway: real investments zig-zag, while Madoff's line rose in an unnaturally straight fashion because the 'returns' were faked, paid from new investors' deposits. When his scheme collapsed in 2008, about $65 billion in reported wealth evaporated. Growth or returns that seem too smooth and too good almost always are.",
          "Sustainable growth, by contrast, is anchored to something real - rising profits, more customers, genuine productivity gains - and it tends to be lumpy and moderate. A company can grow quickly for a while, but eventually it saturates its market; there are only so many customers on Earth. The mature economy grows a few percent a year. So when you see prices or promised returns compounding at rates far above what real businesses and the real economy achieve, ask what actually powers that growth. If the answer is only 'more buyers keep coming,' you're looking at a bubble."
        ],
        bullets: [
          "Exponential growth can't continue forever in a finite economy.",
          "50% yearly growth doubles an asset in about 18 months - soon absurd.",
          "Ponzi and pyramid schemes promise impossibly smooth, high returns.",
          "Madoff's fraud collapsed in 2008, erasing about $65 billion in reported wealth.",
          "Real growth is lumpy and anchored to profits, customers, or productivity."
        ],
        realWorldExample: "Bernie Madoff's investors saw statements showing steady gains year after year, even in bad markets - which felt reassuring but was actually impossible. That unnatural smoothness was the clearest warning sign. When the 2008 crisis caused withdrawals he couldn't cover, the roughly $65 billion scheme collapsed."
      },
      {
        type: "concept",
        title: "Telling Real Growth From a Mirage",
        paragraphs: [
          "To judge whether growth is sustainable, look for what supports it. Real, lasting growth comes from a company earning more money by serving more customers or operating more efficiently - things you can verify. Bubble growth comes only from the price rising because new buyers keep arriving, with no improvement in the underlying business. A useful test: if new buyers suddenly stopped, would the asset still be worth something because it produces value? A house you can live in or a company that earns profits passes; a token whose only purpose is resale does not.",
          "Beware of returns that don't match the risk. In markets, higher returns almost always require accepting higher risk; there's no free lunch. So an investment promising high returns with 'no risk' or 'guaranteed' results is either a fraud or a misunderstanding. Madoff's steadiness, and countless smaller scams, sell exactly this fantasy. Legitimate high-growth investments are volatile and can lose money; anything marketed as high-reward and perfectly safe should trigger immediate suspicion rather than excitement.",
          "Finally, respect the math of large numbers. A company doubling from $1 billion to $2 billion is plausible; doubling from $1 trillion to $2 trillion means adding an entire economy's worth of value, which gets harder the bigger you get. Growth rates naturally slow as things scale, so straight-line projections of early growth into the distant future almost always overshoot. The disciplined investor asks not 'how fast has this grown?' but 'what real force drives the growth, and can that force realistically continue?' That single question deflates most bubbles before they trap you."
        ],
        bullets: [
          "Sustainable growth ties to real earnings, customers, or efficiency.",
          "Test: if new buyers stopped, would the asset still hold value?",
          "Higher returns require higher risk - 'guaranteed high returns' is a red flag.",
          "Growth naturally slows as a company or asset gets larger.",
          "Ask what real force drives growth and whether it can truly continue."
        ],
        realWorldExample: "Many failed crypto tokens and pyramid schemes shared one trait: their value came almost entirely from new buyers arriving, not from producing anything useful. Once recruitment slowed, there was nothing underneath to hold the price up, and they collapsed - the classic signature of unsustainable growth."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "bubble7-mc1",
            question: "Why can't 50% yearly growth continue indefinitely?",
            options: [
              "Governments always step in to ban any fast growth",
              "The numbers soon exceed what the economy can support",
              "Fast growth becomes strictly illegal after ten full years",
              "Investors simply get bored and slowly stop caring entirely"
            ],
            correctAnswer: 1,
            explanation: "Exponential growth doubles an asset roughly every 18 months, quickly reaching sizes larger than the entire economy could ever sustain."
          },
          {
            id: "bubble7-mc2",
            question: "What made Madoff's reported returns a warning sign?",
            options: [
              "They were unusually low every single year",
              "They were impossibly smooth and steady",
              "They matched the whole market exactly",
              "They were paid out only in cash"
            ],
            correctAnswer: 1,
            explanation: "Real investments zig-zag. Madoff's steady, straight-line gains even in bad years were impossible - a giveaway that the returns were faked."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Is Pitched a 'Sure Thing'",
        narrative: "Leo, 18, is offered an investment that 'guarantees' 3% every single month with 'no risk,' as long as he also recruits friends to join. The promoter shows a chart rising in a perfectly straight line for two years. Leo is tempted by the steady, high, risk-free returns and the chance to earn more by signing people up.",
        details: [
          "Guaranteed high returns with 'no risk' violate the risk-reward rule.",
          "A perfectly straight rising line is unnaturally smooth - a fraud signal.",
          "Value coming from recruiting new members is a pyramid structure.",
          "If new recruits stopped, there is nothing real underneath the returns."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "bubble7-aq1",
          question: "Which feature should most alarm Leo about this offer?",
          options: [
            "It involves calmly investing your money over time",
            "High 'guaranteed' returns with no risk plus recruiting",
            "The smiling promoter simply showed him a nice chart",
            "It pays out steady returns on a monthly basis"
          ],
          correctAnswer: 1,
          explanation: "Guaranteed high returns with 'no risk' defy the risk-reward tradeoff, and paying based on recruiting new members is the signature of a pyramid or Ponzi scheme."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Exponential growth cannot continue forever in a finite economy.",
          "Ponzi schemes promise impossibly smooth, high, 'guaranteed' returns.",
          "Madoff's collapse in 2008 erased about $65 billion in reported wealth.",
          "Real growth ties to earnings, customers, or efficiency and is lumpy.",
          "Ask what real force drives growth and whether it can truly continue."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "bubble7-mastery1",
            question: "Roughly how often does 50% annual growth double an asset?",
            options: [
              "Every 18 months or so",
              "Only once every 50 long years",
              "Every single week without fail",
              "Only once per entire century"
            ],
            correctAnswer: 0,
            explanation: "Growing 50% a year doubles an asset in about a year and a half, so the numbers quickly become impossibly large."
          },
          {
            id: "bubble7-mastery2",
            question: "What is the signature of a Ponzi scheme?",
            options: [
              "Volatile up-and-down returns that sometimes lose real money",
              "Steady high returns paid from new investors' money",
              "Returns closely tied to genuine, real company profits",
              "Low, modest returns paired with full, open transparency"
            ],
            correctAnswer: 1,
            explanation: "A Ponzi scheme pays old investors with new investors' deposits, creating impossibly smooth, high returns until new money runs out."
          },
          {
            id: "bubble7-mastery3",
            question: "Which test best reveals unsustainable, bubble-style growth?",
            options: [
              "Whether the price chart happens to look pretty",
              "Whether value remains if new buyers stopped arriving",
              "Whether the smiling promoter happens to seem friendly enough",
              "Whether the promised returns are quietly paid out each month"
            ],
            correctAnswer: 1,
            explanation: "If an asset would be worthless once new buyers stop - because it produces nothing - its rise depends purely on more buyers, the mark of a bubble."
          },
          {
            id: "bubble7-mastery4",
            question: "Why is 'guaranteed high returns with no risk' a red flag?",
            options: [
              "Higher returns almost always require higher risk",
              "No one ever really wants safe investments",
              "Guarantees are strictly illegal in all countries",
              "High returns are truly impossible for anyone"
            ],
            correctAnswer: 0,
            explanation: "In real markets there's no free lunch: high reward comes with high risk. A safe, high, guaranteed return signals fraud or misunderstanding."
          },
          {
            id: "bubble7-mastery5",
            question: "Why do growth rates naturally slow as a company gets bigger?",
            options: [
              "Big established companies are legally forced by law to shrink",
              "Doubling a huge base requires far more real value",
              "Large, well-known companies simply never make any real profit",
              "Business growth is strictly banned above a certain company size"
            ],
            correctAnswer: 1,
            explanation: "Doubling from $1 trillion means adding an entire economy's worth of value, which is far harder than doubling a small firm - so growth slows with scale."
          },
          {
            id: "bubble7-mastery6",
            question: "What single question best deflates most bubbles?",
            options: [
              "How fast exactly has this one asset grown just recently?",
              "What real force drives the growth, and can it continue?",
              "Who else in the whole market is buying this right now?",
              "How genuinely exciting and thrilling does this hot investment truly feel?"
            ],
            correctAnswer: 1,
            explanation: "Asking what genuinely powers growth - and whether it can realistically last - exposes assets rising only because new buyers keep arriving."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MACROECONOMICS (macro-1 .. macro-7)
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // macro-1: Inflation
  // ─────────────────────────────────────────────
  {
    lessonId: "macro-1",
    sections: [
      {
        type: "concept",
        title: "What Inflation Actually Is",
        paragraphs: [
          "Inflation is the steady rise in the overall level of prices across an economy, which means each dollar you hold buys a little less over time. If a movie ticket cost $8 in 2010 and $12 in 2024, that jump reflects inflation eating away at the dollar's purchasing power. Economists usually describe inflation as a yearly percentage: 3% inflation means the average basket of goods and services costs 3% more than it did a year ago. It is not that one item got pricier because it became rare - it is a broad, ongoing climb affecting groceries, rent, gas, and haircuts all at once.",
          "A little inflation is normal and even healthy. In the United States, the Federal Reserve aims for about 2% per year, because gently rising prices encourage people to spend and invest rather than hoard cash. The trouble comes at the extremes. When inflation spikes - as it did in 2022 when U.S. prices rose about 9% in a year, the fastest in four decades - paychecks struggle to keep up and families feel squeezed. The opposite, deflation (falling prices), sounds nice but can be dangerous: if people expect things to be cheaper next month, they delay purchases, businesses cut jobs, and the economy can stall.",
          "Inflation matters enormously for money you save. Suppose you keep $1,000 in cash under your mattress and inflation runs 3% for ten years. That $1,000 still says $1,000, but it would buy only about $740 worth of the stuff it once did - a quiet loss of roughly a quarter of its value. This is why simply holding cash is riskier than it feels, and why understanding inflation is the foundation for every other money decision you will make, from saving to borrowing to investing."
        ],
        bullets: [
          "Inflation is a broad, ongoing rise in prices that reduces each dollar's buying power.",
          "It is measured as a yearly percentage change in a typical basket of goods.",
          "The Federal Reserve targets about 2% inflation as a healthy pace.",
          "In 2022, U.S. inflation hit roughly 9%, the highest in about 40 years.",
          "Cash quietly loses value to inflation even though the dollar amount never changes."
        ],
        realWorldExample: "In 1970, a first-class U.S. stamp cost 6 cents; by 2024 it cost 68 cents. The stamp does the exact same job - it just takes more than ten times the dollars to buy it. That slow climb over decades is inflation compounding year after year."
      },
      {
        type: "concept",
        title: "What Causes Prices to Rise",
        paragraphs: [
          "Economists point to two main engines of inflation. The first is demand-pull inflation: too much money chasing too few goods. When lots of people suddenly want to buy - because they got stimulus checks, cheap loans, or big raises - demand outruns what factories can produce, and sellers raise prices. The second is cost-push inflation: when the cost of making things climbs. If oil prices double, shipping and manufacturing get pricier, and companies pass those costs to shoppers. The 2022 spike blended both: pandemic savings fueled demand while supply-chain snarls and an energy shock pushed costs up at the same time.",
          "Expectations also drive inflation in a way that can become self-fulfilling. If workers believe prices will jump 5% next year, they demand 5% raises; businesses granting those raises then raise prices to cover them, which makes the 5% come true. This wage-price feedback loop is exactly why central banks work so hard to keep inflation expectations 'anchored' near their target. Once people stop trusting that inflation will stay low, it becomes far harder and more painful to bring back down, as the United States learned in the late 1970s and early 1980s.",
          "The ultimate lever behind long-run inflation is the money supply. When a central bank or government creates far more money than the economy's output of goods grows, each unit of money is worth less, and prices rise to match. Extreme cases show this vividly: Zimbabwe in 2008 and Venezuela in the 2010s printed money so fast that prices doubled in days, wiping out savings overnight. Those hyperinflations are rare, but they reveal the basic truth that money only has value relative to the real goods and services it can buy."
        ],
        bullets: [
          "Demand-pull inflation: too much spending chases too few available goods.",
          "Cost-push inflation: rising input costs like oil push final prices higher.",
          "Inflation expectations can become self-fulfilling through a wage-price loop.",
          "Central banks try to keep expectations 'anchored' near their target.",
          "Printing far more money than an economy produces drives long-run inflation."
        ],
        realWorldExample: "In Zimbabwe in 2008, hyperinflation grew so extreme that the government printed a 100-trillion-dollar note. Workers rushed to spend wages the instant they were paid because prices could double within hours - a stark picture of money losing value when far too much of it is created."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "macro1-mc1",
            question: "What does 3% annual inflation mean for a dollar's buying power?",
            options: [
              "The very same dollar now buys about 3% more than a year ago",
              "The dollar buys roughly 3% less",
              "Prices across the economy stay exactly the same as before",
              "Only luxury goods and services get about 3% more expensive"
            ],
            correctAnswer: 1,
            explanation: "Inflation raises the average price level, so at 3% inflation the same dollar buys roughly 3% less than it did a year earlier."
          },
          {
            id: "macro1-mc2",
            question: "Which best describes cost-push inflation?",
            options: [
              "Prices rise because production costs climb",
              "Prices rise because everyone suddenly wants to buy at the same time",
              "Prices fall steadily as overall demand across the economy disappears",
              "Prices never change at all during a downturn or recession"
            ],
            correctAnswer: 0,
            explanation: "Cost-push inflation happens when input costs like oil or wages climb, and businesses pass those higher costs on to buyers."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maria's Savings Jar",
        narrative: "Maria, 16, saved $600 from a summer job and kept it as cash in a jar, planning to buy a used laptop in three years. Over those three years, inflation averaged about 4% per year. When she finally shops for the laptop, she is surprised that the model she wanted now costs noticeably more than $600.",
        details: [
          "Her $600 in cash never grew, but the price of the laptop rose with inflation.",
          "At about 4% per year for three years, prices climbed roughly 12% overall.",
          "The jar of cash quietly lost buying power even though the dollar amount stayed $600.",
          "Money in a savings account earning interest could have offset some of that lost value."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "macro1-aq1",
          question: "What is the key lesson from Maria's experience?",
          options: [
            "Cash always keeps its full value and buying power over many years",
            "Idle cash loses buying power as prices rise",
            "Laptops are a genuinely poor thing to save money for",
            "Inflation only ever affects the wealthy, not ordinary savers"
          ],
          correctAnswer: 1,
          explanation: "Because prices rose about 12% while her cash sat still, Maria's $600 bought less than before. Cash steadily loses real value to inflation unless it earns a return."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Inflation is a broad, ongoing rise in prices that erodes the dollar's buying power.",
          "A modest 2% pace is healthy; spikes like 2022's 9% squeeze households.",
          "Demand-pull and cost-push forces both drive prices higher.",
          "Expectations can make inflation self-fulfilling through a wage-price loop.",
          "Holding cash quietly loses value, so inflation shapes every money decision."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "macro1-mastery1",
            question: "What inflation rate does the U.S. Federal Reserve aim for?",
            options: [
              "About 2% per year",
              "About 9% per year",
              "Exactly 0% per year",
              "As high as possible"
            ],
            correctAnswer: 0,
            explanation: "The Fed targets roughly 2% annual inflation - gentle enough to encourage spending without eroding savings too quickly."
          },
          {
            id: "macro1-mastery2",
            question: "Why can deflation (falling prices) be dangerous?",
            options: [
              "It forces the central bank to print new money almost instantly",
              "People delay buying, which stalls growth",
              "It always leads directly into runaway hyperinflation soon afterward",
              "It pushes worker wages up far too quickly across industries"
            ],
            correctAnswer: 1,
            explanation: "If shoppers expect cheaper prices later, they postpone purchases, businesses cut jobs, and economic activity can grind to a halt."
          },
          {
            id: "macro1-mastery3",
            question: "A wage-price loop describes how…",
            options: [
              "Governments set legal price limits on goods",
              "Expected inflation can become self-fulfilling",
              "Wages and prices are frozen together by law",
              "Deflation spreads across borders"
            ],
            correctAnswer: 1,
            explanation: "When workers expect inflation and demand matching raises, businesses raise prices to cover them - making the expected inflation come true."
          },
          {
            id: "macro1-mastery4",
            question: "Roughly how much U.S. inflation occurred in 2022?",
            options: [
              "About 1%",
              "About 9%",
              "About 20%",
              "Zero, it was deflation"
            ],
            correctAnswer: 1,
            explanation: "Prices rose about 9% in 2022, the fastest pace in roughly four decades, driven by pandemic savings, supply snarls, and an energy shock."
          },
          {
            id: "macro1-mastery5",
            question: "What ultimately drives long-run inflation the most?",
            options: [
              "The particular color and design of a nation's paper currency",
              "Creating far more money than output",
              "The total number of banks operating within a given country",
              "How many people happen to use credit cards for shopping"
            ],
            correctAnswer: 1,
            explanation: "When money is created much faster than the economy produces goods, each unit is worth less and prices rise to match, as hyperinflations show."
          },
          {
            id: "macro1-mastery6",
            question: "If you hold $1,000 cash for a decade at 3% inflation, it will…",
            options: [
              "Buy roughly the same amount of goods as it does today",
              "Buy noticeably less than today",
              "Automatically grow all the way up to about $1,300 in value",
              "Become completely and utterly worthless as paper money"
            ],
            correctAnswer: 1,
            explanation: "At 3% inflation for ten years, $1,000 keeps its number but buys only about $740 of what it once did - a quiet loss of buying power."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // macro-2: CPI
  // ─────────────────────────────────────────────
  {
    lessonId: "macro-2",
    sections: [
      {
        type: "concept",
        title: "The Basket That Measures Inflation",
        paragraphs: [
          "The Consumer Price Index, or CPI, is the main scorecard governments use to track inflation. The idea is simple: pick a fixed 'basket' of goods and services that a typical household buys - things like groceries, rent, gasoline, clothing, doctor visits, and streaming subscriptions - then check the total cost of that basket month after month. If the same basket cost $100 last year and $104 today, the CPI rose 4%, and that is your inflation rate. In the United States, the Bureau of Labor Statistics collects around 80,000 price quotes every month from stores and websites across the country to build this number.",
          "The basket is carefully weighted to reflect how people actually spend. Housing costs make up the largest share - roughly a third of the U.S. CPI - because rent and mortgages dominate most budgets, while something like postage is a tiny sliver. This weighting matters: a big jump in a heavily weighted category like housing moves the overall CPI far more than the same percentage jump in a minor category. The government updates the basket's contents over time as habits change, adding things like smartphones and dropping items people no longer buy, so the index stays realistic.",
          "CPI is reported as an index number pegged to a base period. If the base is set at 100, and today's index reads 130, prices overall are 30% higher than in the base period. News headlines usually translate this into the more familiar year-over-year percentage. When you hear 'inflation came in at 3.2% last month,' that figure is the CPI comparing this month's basket cost to the same month a year earlier. It is the single most-watched inflation statistic in the country, shaping decisions from Social Security raises to interest rates."
        ],
        bullets: [
          "CPI tracks the cost of a fixed basket of goods a typical household buys.",
          "The U.S. Bureau of Labor Statistics collects about 80,000 prices monthly.",
          "Housing is the biggest weight, at roughly a third of the U.S. index.",
          "CPI is an index number; a reading of 130 means prices are 30% above the base.",
          "Headlines usually quote CPI as a year-over-year percentage change."
        ],
        realWorldExample: "Each month, government workers and automated systems record the price of specific items - a dozen eggs at a named store, a particular apartment's rent, one gallon of regular gas - and compare them to last month. Multiply that across roughly 80,000 quotes and you get the CPI that headlines report as 'the inflation rate.'"
      },
      {
        type: "concept",
        title: "Why CPI Is Powerful and Imperfect",
        paragraphs: [
          "CPI does far more than fill news headlines - it triggers real money movements for millions of people. Many things are 'indexed' to CPI, meaning they automatically rise with it. Social Security payments to retirees get a cost-of-living adjustment each year based on CPI, so a 3% CPI increase can mean a 3% raise for tens of millions of Americans. Some wages, rents, tax brackets, and government benefits adjust the same way. Because so much money is tied to it, a small change in how CPI is measured can shift billions of dollars, which is why the calculation is watched closely and sometimes fiercely debated.",
          "Economists often focus on 'core CPI,' which strips out food and energy prices. That may seem odd, since everyone buys food and gas, but those two categories swing wildly month to month - a cold snap or an oil dispute can spike them briefly without reflecting the economy's true trend. By removing that noise, core CPI reveals the steadier underlying inflation that policymakers care about. When the Federal Reserve decides whether to raise or lower interest rates, it pays close attention to core measures rather than reacting to every temporary gas-price jump.",
          "CPI is powerful but imperfect. Because the basket is fixed, it can overstate inflation when people substitute cheaper alternatives - if beef gets expensive and shoppers switch to chicken, the fixed basket still counts pricey beef. It also struggles to capture quality improvements: a $1,000 phone today does far more than a $1,000 phone from 2015, yet the price looks unchanged. Your personal inflation may differ too - a college student paying rising tuition and rent may feel far more inflation than the headline number suggests. CPI is a useful average, not a perfect measure of any one person's cost of living."
        ],
        bullets: [
          "Social Security and some wages are 'indexed' to CPI, adjusting automatically each year.",
          "A small CPI change can shift billions of dollars because so much is tied to it.",
          "Core CPI removes volatile food and energy to reveal the underlying trend.",
          "A fixed basket can overstate inflation when shoppers switch to cheaper substitutes.",
          "Your personal inflation can differ from the headline CPI average."
        ],
        realWorldExample: "In 2023, U.S. Social Security benefits rose 8.7% - the biggest cost-of-living adjustment in about 40 years - because CPI had surged the year before. That single CPI-driven adjustment put hundreds of extra dollars a month into millions of retirees' checks."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "macro2-mc1",
            question: "How does CPI measure inflation?",
            options: [
              "By pricing a fixed basket of goods",
              "By counting how many new dollars the nation's banks print each year",
              "By surveying how happy or satisfied everyday shoppers feel about prices",
              "By measuring only the changing price of gold on world markets"
            ],
            correctAnswer: 0,
            explanation: "CPI prices a fixed basket of typical household purchases each period and compares the totals to see how much prices changed."
          },
          {
            id: "macro2-mc2",
            question: "Why do economists watch 'core CPI'?",
            options: [
              "It includes only expensive luxury goods and designer services",
              "It strips out volatile food and energy",
              "It completely ignores housing and rent costs when measuring prices",
              "It measures the rate of inflation in other foreign countries"
            ],
            correctAnswer: 1,
            explanation: "Core CPI removes food and energy, which swing sharply month to month, so the steadier underlying inflation trend is easier to see."
          }
        ]
      },
      {
        type: "scenario",
        title: "Grandpa's Raise",
        narrative: "Devon's grandfather receives Social Security. One January, his monthly check jumped by 8.7%, the largest raise he could remember. Devon wondered why the government suddenly gave retirees so much more money that year, and whether it was a permanent policy change.",
        details: [
          "The raise was a cost-of-living adjustment tied directly to the CPI.",
          "CPI had surged the prior year, so the automatic adjustment was unusually large.",
          "It was not a new policy - benefits are indexed to CPI every year.",
          "In low-inflation years, the same adjustment might be only 1% or 2%."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "macro2-aq1",
          question: "Why did Grandpa's Social Security check rise 8.7% that year?",
          options: [
            "Congress passed a special one-time bonus payment for all retirees",
            "Benefits are indexed to a surging CPI",
            "The stock market happened to have a very strong year",
            "He quietly worked extra hours that year to earn more"
          ],
          correctAnswer: 1,
          explanation: "Social Security has an automatic cost-of-living adjustment tied to CPI. Because inflation had spiked, the CPI-based raise was unusually large that year."
        }
      },
      {
        type: "recap",
        takeaways: [
          "CPI tracks the cost of a fixed basket of typical household purchases.",
          "It is built from about 80,000 monthly price quotes, weighted by spending share.",
          "Social Security and other payments are indexed to CPI and adjust yearly.",
          "Core CPI removes volatile food and energy to show the underlying trend.",
          "A fixed basket has flaws, and your personal inflation can differ from the average."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "macro2-mastery1",
            question: "What is the single largest category in the U.S. CPI basket?",
            options: [
              "Housing costs such as rent",
              "Postage stamps and package shipping fees",
              "Movie tickets and theater admissions",
              "Bottled water and packaged drinks"
            ],
            correctAnswer: 0,
            explanation: "Housing makes up roughly a third of the CPI because rent and mortgages dominate most household budgets, giving it the heaviest weight."
          },
          {
            id: "macro2-mastery2",
            question: "If the CPI index reads 130 with a base of 100, prices are…",
            options: [
              "30% lower than the base period",
              "30% higher than the base period",
              "Exactly the same as the base",
              "130 times higher than the base"
            ],
            correctAnswer: 1,
            explanation: "An index of 130 against a base of 100 means overall prices are 30% higher than they were in the base period."
          },
          {
            id: "macro2-mastery3",
            question: "Why can a fixed basket overstate inflation?",
            options: [
              "It ignores shoppers switching to substitutes",
              "It only ever counts goods that are imported from abroad",
              "It updates the prices in its basket far too often",
              "It leaves out absolutely all food items from the basket"
            ],
            correctAnswer: 0,
            explanation: "When a good gets pricey and shoppers switch to a cheaper option, the fixed basket still counts the expensive item, overstating true cost increases."
          },
          {
            id: "macro2-mastery4",
            question: "About how many price quotes go into the U.S. CPI each month?",
            options: [
              "Around 500",
              "Around 80,000",
              "Around 10 million",
              "Just one per state"
            ],
            correctAnswer: 1,
            explanation: "The Bureau of Labor Statistics gathers roughly 80,000 price quotes monthly from stores and websites across the country."
          },
          {
            id: "macro2-mastery5",
            question: "What does it mean that Social Security is 'indexed' to CPI?",
            options: [
              "Retirees must file the CPI each year themselves",
              "Benefits automatically adjust as CPI changes",
              "Benefits are frozen regardless of inflation",
              "CPI is calculated only for retirees"
            ],
            correctAnswer: 1,
            explanation: "Indexing means payments rise automatically with CPI, so a cost-of-living adjustment reflects the prior year's measured inflation."
          },
          {
            id: "macro2-mastery6",
            question: "Why might your personal inflation differ from headline CPI?",
            options: [
              "CPI is a national average, not you",
              "CPI is deliberately and knowingly made to be inaccurate",
              "CPI only measures prices in wealthy, rich neighborhoods",
              "Your own personal spending never actually changes any prices"
            ],
            correctAnswer: 0,
            explanation: "CPI reflects an average basket. If you spend heavily on categories rising faster than average, like rent or tuition, your felt inflation can be higher."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // macro-3: Federal Reserve
  // ─────────────────────────────────────────────
  {
    lessonId: "macro-3",
    sections: [
      {
        type: "concept",
        title: "America's Central Bank",
        paragraphs: [
          "The Federal Reserve - usually called 'the Fed' - is the central bank of the United States, created by Congress in 1913 after a series of banking panics wrecked the economy. Unlike an ordinary bank you visit, the Fed is a bank for banks and for the government. Its job is not to make a profit but to keep the whole financial system stable. Congress gave it a 'dual mandate': keep prices stable (low, steady inflation) and promote maximum employment (as many people working as the economy can sustain). Balancing those two goals guides nearly everything the Fed does.",
          "The Fed is deliberately built to be independent from day-to-day politics. Its leaders, the Board of Governors, are appointed by the President and confirmed by the Senate for long 14-year terms, so no single election controls them. The most important decisions - especially about interest rates - are made by the Federal Open Market Committee, or FOMC, which meets about eight times a year. This independence exists because history shows that when politicians control the money supply directly, they are tempted to print money for short-term popularity, which fuels dangerous inflation.",
          "The Fed also acts as a 'lender of last resort.' When a healthy bank suddenly faces a rush of customers withdrawing cash - a bank run - the Fed can lend it emergency money so it does not collapse and drag others down with it. In the 2008 financial crisis and again in 2020, the Fed used this power on a massive scale, lending trillions to keep credit flowing. This backstop is why modern bank panics rarely spiral the way they did before 1913, though the Fed's interventions remain hotly debated."
        ],
        bullets: [
          "The Federal Reserve is the U.S. central bank, created by Congress in 1913.",
          "Its dual mandate is stable prices and maximum sustainable employment.",
          "It is designed to be independent, with 14-year terms shielding it from politics.",
          "The FOMC sets interest-rate policy, meeting about eight times a year.",
          "As 'lender of last resort,' it can rescue solvent banks during panics."
        ],
        realWorldExample: "During the 2008 crisis, the Fed lent enormous sums to banks and even to companies like AIG to stop a chain-reaction collapse. Chairman Ben Bernanke, a scholar of the Great Depression, later said his goal was to avoid repeating the 1930s, when bank failures spiraled with no backstop to stop them."
      },
      {
        type: "concept",
        title: "How the Fed Steers the Economy",
        paragraphs: [
          "The Fed's most powerful lever is the interest rate it targets, the 'federal funds rate,' which is what banks charge each other for overnight loans. The Fed does not set the mortgage or credit-card rate you pay directly, but by nudging this base rate up or down, it ripples through the whole economy. Lower rates make borrowing cheap, encouraging businesses to expand and families to buy homes, which speeds the economy up. Higher rates make borrowing costly, cooling spending and taming inflation. In 2022 and 2023, the Fed raised its rate from near zero to over 5% to fight the inflation spike.",
          "Beyond rates, the Fed can change the money supply through 'open market operations' - buying or selling government bonds. When it buys bonds, it puts new money into the banking system, encouraging lending; when it sells them, it pulls money out. In crises, it has used a supercharged version called quantitative easing, creating trillions of dollars to buy bonds and hold long-term rates down. The Fed also sets 'reserve' and capital rules that require banks to keep enough safe assets on hand so they can survive shocks without collapsing.",
          "The Fed's challenge is timing and balance. Its tools work with a delay - a rate change today may take a year or more to fully affect jobs and prices - so it must act on forecasts, not just today's data. Move too slowly and inflation can take hold; move too aggressively and it can trigger a recession by choking off spending. This is often described as trying to achieve a 'soft landing': slowing the economy just enough to cool inflation without causing mass layoffs. Getting that balance right is one of the hardest jobs in economic policy."
        ],
        bullets: [
          "The federal funds rate is the Fed's main lever, guiding rates across the economy.",
          "Lower rates speed the economy up; higher rates cool it and fight inflation.",
          "Open market operations buy or sell bonds to add or drain money.",
          "Quantitative easing creates money to buy bonds and hold long-term rates down.",
          "A 'soft landing' means cooling inflation without triggering a recession."
        ],
        realWorldExample: "From March 2022 to mid-2023, the Fed raised the federal funds rate from near 0% to above 5% - one of the fastest hiking cycles ever - to fight 9% inflation. Mortgage rates roughly doubled to around 7%, cooling the housing market as intended."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "macro3-mc1",
            question: "What are the two goals of the Fed's 'dual mandate'?",
            options: [
              "Stable prices and maximum employment",
              "High taxes and low wages",
              "Rising stock prices and cheap gold",
              "Balanced budgets and free trade"
            ],
            correctAnswer: 0,
            explanation: "Congress charged the Fed with keeping prices stable (low, steady inflation) and promoting maximum sustainable employment."
          },
          {
            id: "macro3-mc2",
            question: "What does lowering the federal funds rate tend to do?",
            options: [
              "Make borrowing cheaper and speed growth",
              "Make borrowing costlier and slow the whole economy down",
              "Instantly stop all inflation across the entire economy",
              "Force banks everywhere to close their doors overnight"
            ],
            correctAnswer: 0,
            explanation: "Lower rates make loans cheaper, encouraging spending and investment, which tends to speed the economy up."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Rate-Hike Headlines",
        narrative: "Aisha keeps seeing news that 'the Fed raised rates again.' Her parents mention their new car loan is more expensive than a friend's loan from two years ago. Aisha wonders how a decision made in Washington could reach all the way to her family's monthly car payment.",
        details: [
          "The Fed lifted the federal funds rate, the base rate banks charge each other.",
          "Banks pass higher borrowing costs on to loans like auto and mortgage loans.",
          "The Fed raised rates to cool spending and bring down high inflation.",
          "The same decision makes savings accounts pay more interest, too."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "macro3-aq1",
          question: "How did a Fed decision reach Aisha's family car payment?",
          options: [
            "The Fed directly sets the interest rate on every single car loan",
            "Higher Fed rates lift banks' loan rates",
            "The Fed banned cheap car loans across the country by law",
            "Car dealers themselves vote directly on the Fed's rate policy"
          ],
          correctAnswer: 1,
          explanation: "The Fed sets a base rate for banks, not consumer loans directly. When that base rate rises, banks charge more on loans, so car and mortgage payments climb."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The Fed is the U.S. central bank, tasked with stable prices and full employment.",
          "It is built to be independent so politics does not drive money printing.",
          "The federal funds rate is its main tool to speed up or cool the economy.",
          "It can add or drain money by buying and selling government bonds.",
          "As lender of last resort, it can rescue solvent banks during panics."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "macro3-mastery1",
            question: "When was the Federal Reserve created?",
            options: [
              "In 1913, after banking panics",
              "In 1776, with the nation",
              "In 2008, during the crisis",
              "In 1971, after the gold standard"
            ],
            correctAnswer: 0,
            explanation: "Congress created the Fed in 1913 to bring stability after repeated banking panics had wrecked the economy."
          },
          {
            id: "macro3-mastery2",
            question: "Why are Fed governors given long 14-year terms?",
            options: [
              "To reward them with high pay",
              "To shield policy from short-term politics",
              "Because the law requires it for all agencies",
              "To let one President control them fully"
            ],
            correctAnswer: 1,
            explanation: "Long terms spanning multiple elections keep monetary policy independent, so politicians cannot easily print money for short-term popularity."
          },
          {
            id: "macro3-mastery3",
            question: "Which committee sets the Fed's interest-rate policy?",
            options: [
              "The Supreme Court",
              "The FOMC",
              "The U.S. Senate alone",
              "The Treasury auction board"
            ],
            correctAnswer: 1,
            explanation: "The Federal Open Market Committee (FOMC) meets about eight times a year to decide the federal funds rate target."
          },
          {
            id: "macro3-mastery4",
            question: "What does 'lender of last resort' mean?",
            options: [
              "The Fed simply refuses to lend anything during crises",
              "The Fed can lend emergency cash to banks",
              "The Fed lends money only to private individuals, never banks",
              "The Fed sells off all of its bonds to foreigners"
            ],
            correctAnswer: 1,
            explanation: "When a healthy bank faces a sudden run, the Fed can lend it emergency money so it does not collapse and spread panic to others."
          },
          {
            id: "macro3-mastery5",
            question: "What is quantitative easing?",
            options: [
              "Creating money to buy bonds",
              "Cutting income taxes specifically for the largest banks",
              "Printing extra paper currency and handing it to shoppers",
              "Freezing every single interest rate in place by law"
            ],
            correctAnswer: 0,
            explanation: "In quantitative easing, the Fed creates new money to buy large amounts of bonds, pushing long-term rates down to stimulate a weak economy."
          },
          {
            id: "macro3-mastery6",
            question: "What is a 'soft landing'?",
            options: [
              "Cooling inflation without a recession",
              "Simply letting inflation rise higher and higher forever",
              "Shutting down and closing the Federal Reserve permanently",
              "Raising interest rates all the way up to exactly 10%"
            ],
            correctAnswer: 0,
            explanation: "A soft landing means slowing the economy just enough to tame inflation while avoiding the mass layoffs of a recession."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // macro-4: Monetary Policy
  // ─────────────────────────────────────────────
  {
    lessonId: "macro-4",
    sections: [
      {
        type: "concept",
        title: "The Fed's Toolbox",
        paragraphs: [
          "Monetary policy is the set of actions a central bank takes to manage the amount of money and credit in the economy, mainly to control inflation and support jobs. Think of the economy like a car: monetary policy is the gas pedal and brake. When the economy is sluggish and unemployment is rising, the Fed uses 'expansionary' policy - pressing the gas by making money cheaper and more plentiful. When the economy overheats and inflation climbs, it uses 'contractionary' policy - tapping the brake by making money scarcer and more expensive. The goal is steady, sustainable growth rather than wild booms and busts.",
          "The Fed's main tool is the interest rate it targets. By lowering the federal funds rate, it makes it cheaper for banks to lend, which lowers the rates on car loans, mortgages, and business loans, encouraging borrowing and spending. Raising the rate does the opposite. A second tool is open market operations: buying government bonds injects money into banks, while selling bonds pulls money out. A third is adjusting the interest the Fed pays banks on their reserves, which influences how much banks want to lend versus park safely at the Fed.",
          "Monetary policy is different from fiscal policy, and confusing the two is a common mistake. Fiscal policy is run by Congress and the President through taxes and government spending - decisions like sending stimulus checks or cutting taxes. Monetary policy is run by the independent Fed through money and interest rates. Both can stimulate or slow the economy, but they use different levers and different decision-makers. During the 2020 pandemic, the two worked together: Congress sent stimulus checks (fiscal) while the Fed slashed rates to zero and bought bonds (monetary)."
        ],
        bullets: [
          "Monetary policy manages the money supply and credit to control inflation and jobs.",
          "Expansionary policy makes money cheaper to speed a sluggish economy up.",
          "Contractionary policy makes money scarcer to cool an overheating economy.",
          "Main tools: the interest-rate target, open market operations, and reserve interest.",
          "Monetary policy (the Fed) differs from fiscal policy (Congress's taxes and spending)."
        ],
        realWorldExample: "In 2020, the Fed cut rates to near zero and bought trillions in bonds to keep credit flowing through the pandemic shock. That flood of cheap money helped stock and housing markets rebound quickly, showing expansionary policy at full throttle."
      },
      {
        type: "concept",
        title: "Why Timing and Trade-Offs Are So Hard",
        paragraphs: [
          "Monetary policy works with long and variable 'lags.' A rate change today does not hit the economy immediately - it can take six months to two years for the full effect on hiring and prices to show up. This delay forces the Fed to act on forecasts of where the economy is heading, not just where it is now. Imagine steering a giant ship where the wheel responds a minute after you turn it: you must anticipate the curve ahead. That is why the Fed sometimes keeps raising or cutting rates even when today's data looks fine - it is aiming at tomorrow.",
          "Every choice involves a painful trade-off between the Fed's two mandates. Fighting inflation usually requires higher rates, which slow the economy and can raise unemployment - hurting the very workers the Fed also wants to protect. Boosting jobs with low rates risks stoking inflation. The Fed constantly weighs these against each other. In the early 1980s, Fed chair Paul Volcker pushed rates above 19% to crush runaway inflation. It worked - inflation fell from about 14% to under 4% - but it also triggered a sharp recession and unemployment near 11% before the economy healed.",
          "Monetary policy also has real limits. When rates are already near zero and the economy is still weak, the Fed cannot cut much further - a situation called the 'zero lower bound.' It then turns to unconventional tools like quantitative easing or 'forward guidance,' where it publicly promises to keep rates low for a long time to shape expectations. And monetary policy cannot fix every problem: it can make money cheaper, but it cannot force businesses to hire or banks to lend if confidence is shattered. That is why fiscal policy often steps in during severe crises."
        ],
        bullets: [
          "Policy works with lags of six months to two years, so the Fed acts on forecasts.",
          "Fighting inflation with high rates can raise unemployment - a core trade-off.",
          "Volcker's early-1980s rate hikes above 19% crushed inflation but caused a recession.",
          "The 'zero lower bound' limits how much the Fed can cut in a weak economy.",
          "Monetary policy cannot force lending or hiring when confidence collapses."
        ],
        realWorldExample: "Paul Volcker's Fed raised rates above 19% around 1981 to break double-digit inflation. Inflation dropped from about 14% to under 4% within a few years, proving the tool worked - but unemployment first spiked near 11%, showing the harsh trade-off involved."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "macro4-mc1",
            question: "What is 'expansionary' monetary policy?",
            options: [
              "Making money cheaper to speed growth",
              "Raising taxes deliberately to slow down consumer spending",
              "Making money much scarcer in order to cool inflation",
              "Banning all bank loans throughout the whole country"
            ],
            correctAnswer: 0,
            explanation: "Expansionary policy presses the gas pedal - lowering rates and adding money to encourage borrowing and spending when the economy is sluggish."
          },
          {
            id: "macro4-mc2",
            question: "How does monetary policy differ from fiscal policy?",
            options: [
              "Monetary is the Fed's rates; fiscal is Congress's taxes",
              "They are really just two different names for the exact same thing",
              "Monetary policy is only ever used during deep economic recessions",
              "Fiscal policy is entirely controlled by the country's commercial banks"
            ],
            correctAnswer: 0,
            explanation: "Monetary policy is run by the independent Fed through money and interest rates; fiscal policy is run by Congress and the President through taxes and spending."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Overheating Economy",
        narrative: "The economy is booming: unemployment is very low, wages are rising fast, and prices are climbing 7% a year. Business owner Leo notices customers spending freely but complains his supply costs keep jumping. Economists debate what the Fed should do next as the economy runs hot.",
        details: [
          "High inflation with a red-hot economy calls for contractionary policy.",
          "The Fed would likely raise interest rates to cool borrowing and spending.",
          "Higher rates should slow demand and ease the upward pressure on prices.",
          "The risk is slowing the economy too much and causing a recession."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "macro4-aq1",
          question: "What monetary policy fits this overheating, high-inflation economy?",
          options: [
            "Cut interest rates further to boost consumer spending even more",
            "Raise rates to cool demand",
            "Send everyone in the country stimulus checks right away",
            "Do nothing at all, since inflation just fixes itself"
          ],
          correctAnswer: 1,
          explanation: "With inflation at 7% and the economy running hot, contractionary policy - raising rates - cools borrowing and spending to bring prices back down."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Monetary policy manages money and credit to balance inflation and employment.",
          "Expansionary policy speeds a weak economy; contractionary policy cools a hot one.",
          "The Fed's tools include rate targets, bond operations, and reserve interest.",
          "Policy works with long lags, forcing the Fed to act on forecasts.",
          "Every choice trades off inflation against jobs, as Volcker's era showed."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "macro4-mastery1",
            question: "Which situation calls for contractionary monetary policy?",
            options: [
              "High inflation in an overheating economy",
              "Rising unemployment in the middle of a deep recession",
              "Falling prices together with weak, sagging consumer demand",
              "A perfectly balanced economy growing at a steady pace"
            ],
            correctAnswer: 0,
            explanation: "Contractionary policy taps the brake - it fits an overheating economy with high inflation, cooling spending by making money scarcer and pricier."
          },
          {
            id: "macro4-mastery2",
            question: "Who runs fiscal policy?",
            options: [
              "The independent Federal Reserve, acting entirely alone",
              "Congress and the President",
              "The nation's large commercial and retail banks",
              "The major stock exchanges and their traders"
            ],
            correctAnswer: 1,
            explanation: "Fiscal policy - taxes and government spending - is set by Congress and the President, separate from the Fed's monetary policy."
          },
          {
            id: "macro4-mastery3",
            question: "Why must the Fed act on forecasts, not just current data?",
            options: [
              "Because policy takes many months to work",
              "Because the law strictly forbids ever using today's fresh data",
              "Because economic forecasts turn out to be always perfectly accurate",
              "Because the country's largest banks quietly demand that it does"
            ],
            correctAnswer: 0,
            explanation: "Rate changes affect jobs and prices with lags of six months to two years, so the Fed must aim at where the economy is heading."
          },
          {
            id: "macro4-mastery4",
            question: "What did Paul Volcker's high rates achieve in the early 1980s?",
            options: [
              "They crushed inflation but caused a recession",
              "They completely eliminated unemployment across the entire country",
              "They had no real effect on prices whatsoever",
              "They quickly doubled the overall rate of inflation"
            ],
            correctAnswer: 0,
            explanation: "Volcker pushed rates above 19%, driving inflation from about 14% to under 4% - but unemployment spiked near 11% first, showing the trade-off."
          },
          {
            id: "macro4-mastery5",
            question: "What is the 'zero lower bound'?",
            options: [
              "The point where the Fed can barely cut",
              "A strict rule that legally requires exactly zero inflation",
              "The lowest hourly wage that is allowed by law",
              "A total nationwide ban on households saving money"
            ],
            correctAnswer: 0,
            explanation: "When rates are already near zero, the Fed cannot cut much more, so it must use unconventional tools like quantitative easing or forward guidance."
          },
          {
            id: "macro4-mastery6",
            question: "What is a key limit of monetary policy?",
            options: [
              "It can directly set the nation's income tax rates",
              "It cannot force firms to hire or lend",
              "It works completely instantly, with no delay at all",
              "It always eliminates recessions entirely on its own"
            ],
            correctAnswer: 1,
            explanation: "The Fed can make money cheap, but if confidence is shattered it cannot force lending or hiring - which is why fiscal policy often helps in deep crises."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // macro-5: Rate Changes
  // ─────────────────────────────────────────────
  {
    lessonId: "macro-5",
    sections: [
      {
        type: "concept",
        title: "How a Rate Change Ripples Outward",
        paragraphs: [
          "When the Fed changes its target interest rate, the effect spreads through the economy like ripples from a stone dropped in a pond. The first ripple hits borrowing costs. Because the federal funds rate sets the floor for what banks charge, a rate hike quickly raises the cost of variable-rate loans - credit cards, adjustable mortgages, business lines of credit. When rates jumped in 2022, the average 30-year mortgage rate roughly doubled from about 3% to over 7%, adding hundreds of dollars to a typical monthly payment. Suddenly, buying a house or financing a car costs noticeably more.",
          "The second ripple hits spending and business decisions. Costlier borrowing means fewer people buy homes and cars, and companies delay expansions that no longer pencil out at higher rates. As spending slows, businesses hire less and may cut back, which is exactly how higher rates cool inflation - by dampening demand. Lower rates run the movie in reverse: cheap loans spur home-buying, car sales, and business investment, heating the economy up. This is the core mechanism the Fed relies on, even though it takes months to unfold fully.",
          "The third ripple hits savers, and here higher rates are good news. When the Fed raises rates, banks eventually pay more on savings accounts and certificates of deposit, and newly issued bonds offer higher yields. After years near zero, savings accounts and money-market funds in 2023 paid 4% to 5%, rewarding people who kept cash safely. So a single rate decision creates winners and losers at once: borrowers pay more, but savers finally earn a real return. Businesses feel these ripples too, since companies that rely on borrowing to expand must weigh whether new projects still make sense at higher costs. Understanding which side of that you are on helps you plan around rate cycles and time your biggest financial moves more wisely."
        ],
        bullets: [
          "A rate hike quickly raises variable-loan costs like credit cards and mortgages.",
          "In 2022, 30-year mortgage rates roughly doubled from about 3% to over 7%.",
          "Costlier borrowing slows spending and hiring, which cools inflation.",
          "Lower rates spur home, car, and business borrowing, heating the economy.",
          "Higher rates reward savers with better returns on cash and new bonds."
        ],
        realWorldExample: "A family shopping for a $300,000 mortgage in 2021 at 3% faced roughly a $1,265 monthly payment. By late 2022, at about 7%, the same loan cost near $1,996 a month - over $700 more - purely because the Fed had lifted rates to fight inflation."
      },
      {
        type: "concept",
        title: "Rate Cycles and How to Respond",
        paragraphs: [
          "Rates move in cycles, not straight lines. When the economy weakens, the Fed cuts rates to stimulate it; when the economy overheats and inflation rises, the Fed hikes to cool it; then, once inflation is tamed or a recession looms, it cuts again. These cycles can last years. Recognizing where you are in the cycle helps with big decisions: locking in a fixed-rate mortgage when rates are low and expected to rise can save a fortune, while waiting to borrow until a hiking cycle ends can be smarter than rushing in at the peak.",
          "Rate changes reshape the choice between borrowing and saving. In a low-rate era, borrowing is cheap and saving pays little, which nudges people toward buying homes, cars, and investments on credit. In a high-rate era, the math flips: carrying a 24% credit-card balance becomes brutally expensive, while paying down debt or parking cash in a 5% savings account looks attractive. A smart response is to prioritize paying off high-rate variable debt when rates rise, since those balances get more expensive automatically.",
          "For investors, rate changes are one of the biggest forces in markets. Higher rates make safe bonds and savings more appealing, which pulls some money away from riskier stocks and can push stock prices down - especially for high-growth companies whose profits lie far in the future. Lower rates do the opposite, often lifting stocks. This is why markets hang on every Fed announcement, and why a surprise rate move can send the whole market up or down in a single afternoon. Rates are the gravity that pulls on nearly every asset price."
        ],
        bullets: [
          "Rates move in multi-year cycles of cutting, hiking, then cutting again.",
          "Locking a fixed rate before hikes, or waiting out a peak, can save money.",
          "When rates rise, paying down high-rate variable debt becomes a priority.",
          "Higher rates make bonds and savings more appealing versus stocks.",
          "Fed rate moves are a major force behind stock and bond price swings."
        ],
        realWorldExample: "When the Fed signaled aggressive hikes in 2022, the S&P 500 fell about 19% for the year while bond yields jumped. Growth stocks, whose value depends on distant future profits, dropped hardest as higher rates made those far-off earnings worth less today."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "macro5-mc1",
            question: "What usually happens to mortgage rates when the Fed raises its rate?",
            options: [
              "They rise, making home loans pricier",
              "They fall sharply, making home loans much cheaper for buyers",
              "They stay exactly fixed forever, never changing at all",
              "They disappear entirely and stop being offered by banks"
            ],
            correctAnswer: 0,
            explanation: "A Fed hike raises banks' borrowing costs, so consumer rates like mortgages climb, making home loans more expensive."
          },
          {
            id: "macro5-mc2",
            question: "Who tends to benefit when interest rates rise?",
            options: [
              "Savers earning more on cash",
              "Borrowers who carry big variable-rate loans and balances",
              "Companies taking out huge new loans to expand quickly",
              "First-time home buyers shopping for a new mortgage"
            ],
            correctAnswer: 0,
            explanation: "Higher rates mean banks pay more on savings and new bonds yield more, rewarding people who hold cash - even as borrowers pay more."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Siblings, Two Choices",
        narrative: "As the Fed begins a hiking cycle, siblings Priya and Raj react differently. Priya carries a $4,000 balance on a credit card with a variable rate. Raj has $4,000 in a savings account and no debt. Both watch the news as rates climb over the following year.",
        details: [
          "Priya's variable credit-card rate rises automatically as the Fed hikes.",
          "Her interest charges grow, making the debt more expensive to carry.",
          "Raj's savings account starts paying a higher yield as rates rise.",
          "Paying down high-rate debt fast is the smart move for Priya in this cycle."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "macro5-aq1",
          question: "During the rate-hiking cycle, what should Priya prioritize?",
          options: [
            "Ignoring the balance, since interest rates supposedly never change it",
            "Paying down her variable-rate debt quickly",
            "Taking out a second variable-rate loan on top of it",
            "Moving all of her remaining money into risky growth stocks"
          ],
          correctAnswer: 1,
          explanation: "Rising rates make Priya's variable credit-card balance more expensive automatically, so paying it down fast avoids mounting interest charges."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Rate changes ripple through borrowing costs, spending, and savings returns.",
          "In 2022, mortgage rates roughly doubled, adding hundreds to monthly payments.",
          "Higher rates cool the economy and inflation; lower rates heat it up.",
          "Rates move in multi-year cycles worth recognizing for big decisions.",
          "Fed moves are a major force behind stock and bond price swings."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "macro5-mastery1",
            question: "Roughly what happened to 30-year mortgage rates in 2022?",
            options: [
              "They fell all the way down to near zero",
              "They roughly doubled from 3% to over 7%",
              "They stayed completely flat throughout the entire year",
              "They dropped below 1% for the first time ever"
            ],
            correctAnswer: 1,
            explanation: "As the Fed hiked aggressively, average 30-year mortgage rates climbed from about 3% to over 7%, sharply raising monthly payments."
          },
          {
            id: "macro5-mastery2",
            question: "How do higher rates cool inflation?",
            options: [
              "By making it illegal to save money",
              "By slowing borrowing, spending, and hiring",
              "By printing much more money for everyone",
              "By raising the wages of every single worker"
            ],
            correctAnswer: 1,
            explanation: "Costlier borrowing reduces home, car, and business purchases, dampening demand so prices stop rising as fast."
          },
          {
            id: "macro5-mastery3",
            question: "Why do growth stocks often fall hardest when rates rise?",
            options: [
              "Their profits lie far in the future",
              "They are legally required to drop when rates rise",
              "They pay out the largest dividends of any stocks",
              "They have no paying customers or revenue at all"
            ],
            correctAnswer: 0,
            explanation: "Higher rates make distant future earnings worth less today, so growth stocks - valued on far-off profits - tend to drop the most."
          },
          {
            id: "macro5-mastery4",
            question: "In a rising-rate era, which move is usually smart?",
            options: [
              "Pile on new variable-rate debt",
              "Pay down high-rate variable debt",
              "Stop earning any interest on cash",
              "Only invest in growth stocks"
            ],
            correctAnswer: 1,
            explanation: "Variable debt gets more expensive automatically as rates climb, so paying it down avoids rising interest charges."
          },
          {
            id: "macro5-mastery5",
            question: "How do rate changes tend to move in time?",
            options: [
              "In multi-year cycles of cutting and hiking",
              "They change every single day in a random way",
              "They never change at all once they are first set",
              "Only about once per entire century, very rarely"
            ],
            correctAnswer: 0,
            explanation: "Rates move in cycles - cutting to stimulate, hiking to cool inflation, then cutting again - often spanning several years."
          },
          {
            id: "macro5-mastery6",
            question: "Why do markets react sharply to Fed announcements?",
            options: [
              "Rates influence nearly every asset price",
              "The Fed sets individual stock prices directly itself",
              "The announcements themselves count as legally binding trades",
              "All markets are required to close during the announcements"
            ],
            correctAnswer: 0,
            explanation: "Rates act like gravity on asset prices - shifting the appeal of bonds versus stocks - so a surprise Fed move can swing markets in an afternoon."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // macro-6: Stock Impact
  // ─────────────────────────────────────────────
  {
    lessonId: "macro-6",
    sections: [
      {
        type: "concept",
        title: "How the Big Economy Moves Stock Prices",
        paragraphs: [
          "A stock's price ultimately reflects what investors expect a company to earn in the future, and the wider economy shapes those expectations powerfully. When the economy grows, people have jobs and money to spend, companies sell more, and profits rise - which tends to lift stock prices broadly. When the economy weakens, spending falls, profits shrink, and stocks often drop. This is why a single earnings report can move one stock, but a shift in economic conditions can move thousands of stocks at once. Macro conditions are the tide that raises or lowers most boats together.",
          "Interest rates are one of the strongest macro forces on stocks, working through two channels. First, higher rates make safe bonds and savings more attractive, so some investors shift money out of riskier stocks, pushing prices down. Second, higher rates raise companies' own borrowing costs and shrink the value of their future profits when measured in today's dollars. Both effects tend to pull stock prices down when rates rise and lift them when rates fall. This is why markets often rally on hints the Fed will cut rates and slump on hints it will hike.",
          "Inflation and growth expectations matter too, and their effects can be mixed. Moderate growth with mild inflation is usually great for stocks - profits rise faster than costs. But high, surprising inflation is often bad, because it squeezes profit margins, invites Fed rate hikes, and creates uncertainty investors dislike. A recession is generally the worst environment, as falling demand crushes earnings. Because stock prices reflect expectations, markets often move before the economy does - stocks may fall while the news still looks good if investors sense a slowdown coming."
        ],
        bullets: [
          "Stock prices reflect expected future earnings, which the economy shapes.",
          "Economic growth lifts profits and stocks; weakness drags them down.",
          "Higher rates pull stocks down; lower rates tend to lift them.",
          "Surprising high inflation hurts stocks by squeezing margins and inviting hikes.",
          "Markets often move ahead of the economy because they price in expectations."
        ],
        realWorldExample: "In March 2020, as COVID lockdowns loomed, the S&P 500 fell about 34% in five weeks - before most economic data even showed the damage. Investors sold on the expectation of collapsing earnings, showing how stocks price the future, not just the present."
      },
      {
        type: "concept",
        title: "Not All Stocks React the Same Way",
        paragraphs: [
          "Different types of companies respond differently to the same macro conditions, which is why diversification helps. 'Cyclical' stocks - carmakers, airlines, luxury retailers, homebuilders - boom when the economy is strong and slump hard in downturns, because people delay big or optional purchases when money is tight. 'Defensive' stocks - makers of food, household staples, and utilities - hold up better in recessions, since people still buy groceries and electricity no matter what. Knowing whether a company is cyclical or defensive helps you predict how it may behave when the economy turns.",
          "Sectors also react in specific ways to interest rates. Banks can benefit from moderately higher rates because they earn more on loans. Technology and other high-growth companies often suffer when rates rise, because their value rests on profits far in the future that become worth less as rates climb. Real estate and utilities, which rely heavily on borrowing, tend to struggle with high rates. This is why on the same day the Fed hikes rates, bank stocks might rise while tech stocks fall - the same macro event hits different sectors in opposite directions.",
          "Because macro conditions affect the whole market, they create 'systematic' risk that diversification within stocks cannot fully erase. Owning 50 different stocks still leaves you exposed if a recession drags the entire market down together. This is why smart investors think about macro conditions when setting their overall mix - balancing stocks with bonds, cash, or other assets, and holding steady through cycles rather than trying to perfectly time each turn. Even professionals rarely predict macro moves accurately, so a long-term, diversified plan usually beats reacting to every headline."
        ],
        bullets: [
          "Cyclical stocks boom in good times and slump hard in downturns.",
          "Defensive stocks like food and utilities hold up better in recessions.",
          "Banks may gain from higher rates; growth and real estate often lose.",
          "Macro conditions create systematic risk diversification can't fully remove.",
          "A long-term, diversified plan usually beats trying to time macro turns."
        ],
        realWorldExample: "In the 2008 recession, cyclical automakers were hammered - General Motors even went bankrupt - while defensive giants like Walmart held up as shoppers hunted bargains. The same downturn punished one type of stock and spared another, showing why the mix matters."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "macro6-mc1",
            question: "Why does economic growth tend to lift stock prices broadly?",
            options: [
              "Growth raises profits and expected earnings",
              "Growth forces most companies to lower their prices",
              "Growth always sharply reduces the total money supply",
              "Growth makes all bonds much riskier by law"
            ],
            correctAnswer: 0,
            explanation: "When the economy grows, people spend more and companies earn more, lifting the future profits that stock prices reflect."
          },
          {
            id: "macro6-mc2",
            question: "How do 'defensive' stocks behave in a recession?",
            options: [
              "They tend to hold up better than others",
              "They always fall the most of any stocks",
              "They stop trading entirely during a downturn",
              "They are the only stocks unaffected by interest rates"
            ],
            correctAnswer: 0,
            explanation: "Defensive companies sell essentials like food and utilities that people buy regardless of the economy, so they hold up better in downturns."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Fed Surprises the Market",
        narrative: "The Fed unexpectedly signals it will keep raising rates to fight stubborn inflation. That afternoon, Noah watches his watchlist: a fast-growing tech company drops 5%, while a big bank stock actually rises slightly. He is confused that the same news moved two stocks in opposite directions.",
        details: [
          "Higher rates make the tech firm's distant future profits worth less today.",
          "The bank can earn more interest on loans as rates rise, helping its outlook.",
          "The same macro event hits different sectors in opposite directions.",
          "This is why diversifying across sectors can smooth out such shocks."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "macro6-aq1",
          question: "Why did the rate news push tech down but the bank up?",
          options: [
            "Banks are simply always safer than any tech companies",
            "Higher rates hurt tech but help bank lending",
            "The tech company happened to report bad earnings that same day",
            "Interest rates only ever affect technology stocks, nothing else"
          ],
          correctAnswer: 1,
          explanation: "Higher rates shrink the present value of tech's far-off profits, while banks can earn more on loans - so one macro event moved the two sectors oppositely."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Stock prices reflect expected future earnings shaped by the economy.",
          "Growth lifts stocks; weakness, recessions, and surprise inflation drag them down.",
          "Higher rates generally pull stocks down; lower rates lift them.",
          "Cyclical stocks swing with the economy; defensive stocks hold steadier.",
          "Macro creates systematic risk, so a diversified long-term plan is wise."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "macro6-mastery1",
            question: "What do stock prices mainly reflect?",
            options: [
              "Expected future company earnings",
              "The company's past dividends only",
              "How old the company is",
              "The number of employees it has"
            ],
            correctAnswer: 0,
            explanation: "A stock's price reflects what investors expect the company to earn in the future, which is why economic conditions move prices so much."
          },
          {
            id: "macro6-mastery2",
            question: "Which is an example of a cyclical stock?",
            options: [
              "A maker of basic grocery staples and food",
              "An automaker or airline",
              "A regulated local water utility company",
              "A basic everyday household-goods company"
            ],
            correctAnswer: 1,
            explanation: "Cyclical companies like automakers and airlines boom in good times and slump in downturns, since big or optional purchases get delayed."
          },
          {
            id: "macro6-mastery3",
            question: "Why can stocks fall before the economy visibly weakens?",
            options: [
              "Prices reflect expectations of the future",
              "Investors are legally required to sell their shares early",
              "Companies suddenly stop reporting their quarterly earnings",
              "The Fed directly forces all stock prices lower"
            ],
            correctAnswer: 0,
            explanation: "Because prices reflect expected future earnings, markets often drop when investors sense a slowdown coming, even before the data shows it."
          },
          {
            id: "macro6-mastery4",
            question: "Why might a bank stock rise when rates increase?",
            options: [
              "Banks earn more interest on their loans",
              "Banks are completely exempt from the wider economy",
              "Higher rates cut a bank's operating costs down to zero",
              "Interest rates never affect banks in any way"
            ],
            correctAnswer: 0,
            explanation: "Moderately higher rates can widen the gap between what banks charge on loans and pay on deposits, boosting their profits."
          },
          {
            id: "macro6-mastery5",
            question: "What is 'systematic' risk?",
            options: [
              "Market-wide risk that resists diversification",
              "Risk found only within one single individual company",
              "Risk that completely vanishes once you own 10 stocks",
              "Risk that only government and corporate bonds carry"
            ],
            correctAnswer: 0,
            explanation: "Systematic risk comes from macro forces that move the whole market together, so owning many stocks cannot fully erase it."
          },
          {
            id: "macro6-mastery6",
            question: "What usually beats trying to time macro turns?",
            options: [
              "Selling absolutely everything just before each Fed meeting",
              "A diversified plan held through cycles",
              "Buying only one single hot, exciting stock",
              "Avoiding all stocks entirely for the rest of your life"
            ],
            correctAnswer: 1,
            explanation: "Even professionals rarely predict macro moves well, so a diversified plan held steadily through cycles usually outperforms reacting to headlines."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // macro-7: Bond Impact
  // ─────────────────────────────────────────────
  {
    lessonId: "macro-7",
    sections: [
      {
        type: "concept",
        title: "The Seesaw Between Rates and Bond Prices",
        paragraphs: [
          "A bond is a loan you make to a government or company in exchange for fixed interest payments and the return of your money at the end. The single most important rule about bonds is that their prices move opposite to interest rates - they sit on a seesaw. When market interest rates rise, existing bond prices fall; when rates fall, existing bond prices rise. This inverse relationship confuses many beginners, but it follows from simple logic. A bond locked in at an old, lower rate becomes less attractive when new bonds pay more, so its price must drop for anyone to want to buy it.",
          "Here is the logic with numbers. Suppose you buy a bond for $1,000 that pays 3% interest, or $30 a year. If new bonds start paying 5%, or $50 a year, no one will buy your 3% bond at $1,000 when they could get $50 elsewhere. To sell yours, you must lower its price - to roughly $600 - so that the fixed $30 payment equals a competitive 5% yield for the buyer. The bond's payment never changed, but its market price dropped because rates rose. If instead new rates fell to 1%, your 3% bond would become a prize and its price would rise above $1,000.",
          "The size of the price swing depends on the bond's 'duration' - roughly, how long until you get your money back. Long-term bonds are far more sensitive to rate changes than short-term bonds. A 30-year bond might lose 15% or 20% of its value when rates jump, while a 1-year bond barely moves, because you get your money back soon and can reinvest at the new higher rate. This is why bond investors watch the Fed so closely: a single rate decision can hand long-term bondholders a real loss or gain, even though bonds are considered 'safe.'"
        ],
        bullets: [
          "A bond is a loan paying fixed interest and returning your principal at maturity.",
          "Bond prices move opposite to interest rates, like a seesaw.",
          "When rates rise, existing bonds fall in price so their fixed payment stays competitive.",
          "A 3% bond drops toward $600 if new bonds pay 5% - its payment is unchanged.",
          "Long-term bonds swing far more than short-term bonds when rates change."
        ],
        realWorldExample: "In 2022, as the Fed hiked rates, long-term U.S. Treasury bonds - often called the safest investment on earth - fell roughly 30% in price. Investors who assumed bonds could never lose much learned that rising rates can hammer long-term bonds hard."
      },
      {
        type: "concept",
        title: "Yields, Safety, and the Yield Curve",
        paragraphs: [
          "A bond's 'yield' is the return you actually earn based on its current price, and it moves opposite to price. When a bond's price falls, its yield rises, and vice versa. News often reports 'the 10-year Treasury yield rose to 4.5%,' which really means the price of that bond fell. Yields matter because they set the benchmark for borrowing across the economy - mortgage rates, corporate loan rates, and more are priced off government bond yields. Rising yields ripple into higher costs everywhere, which is part of how Fed rate hikes transmit through the whole financial system.",
          "Bonds carry two main risks beyond rate swings. 'Credit risk' is the chance the borrower fails to pay back - low for the U.S. government, higher for a shaky company, which is why riskier 'junk' bonds must offer higher yields to attract buyers. 'Inflation risk' is the danger that rising prices erode the value of your fixed payments; a bond paying 3% loses ground if inflation runs 5%. This is why bonds are safer than stocks in some ways but not risk-free, and why the interest rate a bond must offer rises with both its risk and expected inflation.",
          "The relationship between short- and long-term bond yields forms the 'yield curve,' one of the most watched signals in finance. Normally, long-term bonds yield more than short-term ones, because lending for longer carries more risk. But sometimes short-term yields rise above long-term yields - an 'inverted' yield curve - which has preceded nearly every U.S. recession in the past 50 years. An inversion signals that investors expect the Fed to cut rates soon because the economy is weakening. Watching the yield curve gives investors an early, if imperfect, warning about the economy's direction."
        ],
        bullets: [
          "A bond's yield is its return based on current price, moving opposite to price.",
          "Government bond yields set the benchmark for mortgages and corporate loans.",
          "Credit risk is the chance a borrower defaults; junk bonds pay more to offset it.",
          "Inflation risk erodes the value of a bond's fixed payments over time.",
          "An inverted yield curve has preceded nearly every recent U.S. recession."
        ],
        realWorldExample: "The U.S. yield curve inverted in 2006 before the 2008 crisis, and again in 2019 and 2022. Each time, short-term yields rose above long-term yields, flashing a warning that investors expected the economy to slow - a signal watched closely on Wall Street."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "macro7-mc1",
            question: "What happens to existing bond prices when interest rates rise?",
            options: [
              "They fall, since older bonds pay less",
              "They rise steadily right along with the rates",
              "They stay exactly the same as they were before",
              "They are completely frozen in place until maturity"
            ],
            correctAnswer: 0,
            explanation: "Bond prices seesaw against rates. When new bonds pay more, older lower-paying bonds must drop in price to stay competitive."
          },
          {
            id: "macro7-mc2",
            question: "Which bond is most sensitive to interest-rate changes?",
            options: [
              "A long-term 30-year bond",
              "A 1-year short-term bond",
              "A savings account",
              "A bond that never matures interest"
            ],
            correctAnswer: 0,
            explanation: "Long-term bonds swing far more, because your money is locked away longer before you can reinvest at new rates."
          }
        ]
      },
      {
        type: "scenario",
        title: "Grandma's 'Safe' Bond Fund",
        narrative: "Elena's grandmother put her savings in a long-term bond fund, believing bonds were completely safe. In 2022, as the Fed hiked rates sharply, her statement showed the fund had lost value - something she thought was impossible for bonds. She asks Elena how a 'safe' investment could drop.",
        details: [
          "Rising rates pushed down the prices of the older, lower-paying bonds she held.",
          "Because it was a long-term fund, the price drop was especially large.",
          "The bonds still pay their fixed interest; only their market price fell.",
          "Short-term bond funds would have lost far less in the same rate spike."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "macro7-aq1",
          question: "Why did Grandma's long-term bond fund lose value in 2022?",
          options: [
            "The bonds in the fund stopped paying any interest at all",
            "Rising rates cut her older bonds' prices",
            "The government suddenly canceled every single outstanding bond",
            "Bond funds are secretly just stocks in disguise"
          ],
          correctAnswer: 1,
          explanation: "As rates rose, her older lower-paying bonds fell in price, and because the fund held long-term bonds, that price drop was especially severe."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Bonds are loans paying fixed interest; their prices seesaw against rates.",
          "When rates rise, existing bond prices fall, and long-term bonds fall most.",
          "Yield moves opposite to price and benchmarks borrowing across the economy.",
          "Bonds face credit risk and inflation risk, so they are safer but not risk-free.",
          "An inverted yield curve has warned of nearly every recent U.S. recession."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "macro7-mastery1",
            question: "A bond paying $30 a year is worth less if new bonds pay what?",
            options: [
              "A higher yield like 5%",
              "Exactly the same 3% yield as before",
              "An even lower yield of only 1%",
              "No interest to their holders at all"
            ],
            correctAnswer: 0,
            explanation: "If new bonds pay 5%, the old 3% bond must drop in price so its fixed $30 payment matches the higher competitive yield."
          },
          {
            id: "macro7-mastery2",
            question: "What is a bond's 'duration' roughly about?",
            options: [
              "How long until you are repaid",
              "The color and design of the paper certificate",
              "How many separate bonds you happen to own",
              "The particular store where the bond was purchased"
            ],
            correctAnswer: 0,
            explanation: "Duration reflects how long until repayment; longer durations make a bond far more sensitive to interest-rate changes."
          },
          {
            id: "macro7-mastery3",
            question: "What is 'credit risk' in bonds?",
            options: [
              "The chance the borrower fails to repay",
              "The chance that interest rates simply never change",
              "The risk of physically losing the paper certificate",
              "A special government tax charged on all bond interest"
            ],
            correctAnswer: 0,
            explanation: "Credit risk is the danger the issuer defaults. It is low for the U.S. government but higher for shaky firms, so junk bonds pay more."
          },
          {
            id: "macro7-mastery4",
            question: "How does a bond's yield relate to its price?",
            options: [
              "Yield moves opposite to price",
              "Yield always equals the price",
              "Yield moves the same direction as price",
              "Yield never changes"
            ],
            correctAnswer: 0,
            explanation: "When a bond's price falls, its yield rises, and vice versa - so a rising yield really means the bond's price dropped."
          },
          {
            id: "macro7-mastery5",
            question: "What does an inverted yield curve often signal?",
            options: [
              "A coming recession",
              "Guaranteed stock gains",
              "Zero inflation forever",
              "That bonds have no risk"
            ],
            correctAnswer: 0,
            explanation: "When short-term yields rise above long-term yields, it has preceded nearly every recent U.S. recession, signaling expected economic weakness."
          },
          {
            id: "macro7-mastery6",
            question: "What is 'inflation risk' for a bondholder?",
            options: [
              "Rising prices erode fixed payments",
              "The bond's paper certificate physically gets damaged",
              "Interest rates in the economy can never rise",
              "The government accidentally prints the same bond twice"
            ],
            correctAnswer: 0,
            explanation: "If inflation runs above the bond's rate, the fixed payments buy less over time, quietly reducing the investor's real return."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // ECONOMIC INDICATORS (indicators-1 .. indicators-7)
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // indicators-1: GDP
  // ─────────────────────────────────────────────
  {
    lessonId: "indicators-1",
    sections: [
      {
        type: "concept",
        title: "Adding Up an Entire Economy",
        paragraphs: [
          "Gross Domestic Product, or GDP, is the total dollar value of all the final goods and services a country produces in a given period, usually a year or a quarter. It is the single broadest scorecard of an economy's size and health. If you added up every car built, haircut given, app subscription sold, meal served, and house constructed within U.S. borders in a year, you would get GDP. In 2023, U.S. GDP was roughly $27 trillion, the largest of any nation. When people ask whether the economy is growing or shrinking, they are usually asking about the change in GDP.",
          "GDP counts only 'final' goods to avoid double-counting. If a bakery buys flour for $1 and sells bread for $3, GDP counts the $3 loaf, not the flour separately, because the flour's value is already inside the bread. Economists often add up GDP by spending: consumer spending (the biggest chunk, about two-thirds in the U.S.), business investment, government spending, and net exports (exports minus imports). This breakdown shows what is driving growth - whether shoppers, companies, or the government are powering the economy in a given quarter.",
          "What matters most is 'real' GDP, which strips out inflation. If prices rise 3% and total spending rises 3%, the economy did not actually produce more - the same stuff just cost more. Real GDP adjusts for this so we can see true changes in output. When news says 'the economy grew 2.5% last quarter,' that is real GDP growth, annualized. Healthy developed economies typically grow around 2% to 3% per year in real terms; much faster can spark inflation, while negative real growth signals the economy is shrinking."
        ],
        bullets: [
          "GDP is the total value of all final goods and services a country produces.",
          "U.S. GDP was about $27 trillion in 2023, the world's largest.",
          "Only final goods are counted, to avoid double-counting inputs like flour.",
          "GDP by spending: consumer, business, government, and net exports.",
          "Real GDP strips out inflation to show true changes in output."
        ],
        realWorldExample: "Consumer spending makes up about two-thirds of U.S. GDP, which is why economists watch shoppers so closely. When Americans cut back on dining out and shopping during a scare, GDP can stall - the economy leans heavily on everyday people opening their wallets."
      },
      {
        type: "concept",
        title: "What GDP Reveals and What It Misses",
        paragraphs: [
          "GDP growth is closely tied to jobs and living standards. When GDP expands, businesses generally hire more, wages tend to rise, and people feel more secure. When GDP contracts, layoffs often follow. A widely used rough rule is that two straight quarters of falling real GDP signals a recession, though official recession calls in the U.S. also weigh employment and other data. Because GDP is reported quarterly and revised as better data arrives, economists watch the trend across several quarters rather than reacting to one noisy number.",
          "GDP per person - 'GDP per capita' - is often more meaningful than total GDP for comparing living standards. A country can have huge total GDP simply because it has a huge population. Dividing GDP by the number of people gives a rough sense of average output and income per person. By this measure, smaller nations like Switzerland or Norway rank among the richest, even though their total GDP is far below that of big countries. This is why analysts use per-capita figures when asking how prosperous typical citizens actually are.",
          "For all its power, GDP misses a lot. It counts activity but not well-being: it rises when a hurricane forces expensive rebuilding, yet ignores unpaid work like raising children or caring for elders. It says nothing about how wealth is distributed - a country's GDP can grow while most people see no gains. It also overlooks environmental damage and leisure time, treating pollution cleanup as a plus while giving no credit for clean air or free time. Some economists have proposed alternative measures, such as gross national happiness or the Human Development Index, that try to capture health and education alongside output. Economists therefore treat GDP as an essential but incomplete gauge, pairing it with measures of employment, inequality, health, and happiness to judge whether an economy truly serves its people."
        ],
        bullets: [
          "Rising GDP usually means more hiring and rising wages; falling GDP brings layoffs.",
          "Two straight quarters of falling real GDP is a common rough recession signal.",
          "GDP per capita compares living standards better than total GDP.",
          "GDP ignores unpaid work, inequality, and environmental harm.",
          "Economists pair GDP with jobs, health, and inequality data for a full picture."
        ],
        realWorldExample: "India has a larger total GDP than Norway, yet Norway's GDP per capita is many times higher because it has so few people sharing the output. This is why 'biggest economy' and 'richest citizens' are very different questions answered by different GDP measures."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "indicators1-mc1",
            question: "What does GDP measure?",
            options: [
              "The value of final goods and services produced",
              "The total amount of cash that is printed each year",
              "Only the yearly profits of the very largest companies",
              "How much gold a nation stores away in reserve"
            ],
            correctAnswer: 0,
            explanation: "GDP adds up the dollar value of all final goods and services produced within a country in a period, making it the broadest gauge of economic size."
          },
          {
            id: "indicators1-mc2",
            question: "Why do economists focus on 'real' GDP?",
            options: [
              "It strips inflation to show real output",
              "It counts only the goods that are imported",
              "It completely ignores all consumer spending",
              "It measures the entire GDP in ounces of gold"
            ],
            correctAnswer: 0,
            explanation: "Real GDP removes the effect of rising prices, so growth reflects actual increases in production, not just more expensive versions of the same goods."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Countries Compared",
        narrative: "In a news debate, one commentator says Country A is 'richer' because its total GDP is far larger than Country B's. But Country A has 200 million people, while Country B has just 5 million. A student, Mateo, wonders which country's citizens are actually better off on average.",
        details: [
          "Total GDP mostly reflects Country A's much larger population.",
          "GDP per capita divides output by people to compare living standards.",
          "Country B's small population could give it higher GDP per capita.",
          "'Biggest economy' and 'richest citizens' are different questions."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "indicators1-aq1",
          question: "Which measure best compares how well-off typical citizens are?",
          options: [
            "Total GDP of each country",
            "GDP per capita",
            "The number of people in each country",
            "The size of each country's land"
          ],
          correctAnswer: 1,
          explanation: "GDP per capita divides output by population, giving a rough sense of average income per person - far better than total GDP for comparing living standards."
        }
      },
      {
        type: "recap",
        takeaways: [
          "GDP totals the value of all final goods and services a country produces.",
          "Real GDP strips out inflation to reveal true output changes.",
          "Consumer spending drives about two-thirds of U.S. GDP.",
          "GDP per capita compares living standards better than total GDP.",
          "GDP misses unpaid work, inequality, and environmental harm."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "indicators1-mastery1",
            question: "Roughly how large was U.S. GDP in 2023?",
            options: [
              "About $27 trillion",
              "About $27 billion",
              "About $270 trillion",
              "About $2.7 trillion"
            ],
            correctAnswer: 0,
            explanation: "U.S. GDP was roughly $27 trillion in 2023, the largest of any single nation in the world."
          },
          {
            id: "indicators1-mastery2",
            question: "Why does GDP count only 'final' goods?",
            options: [
              "To avoid double-counting inputs like flour",
              "Because raw inputs have no real value at all",
              "To deliberately make the GDP figure look larger",
              "Because only imported final goods are ever counted"
            ],
            correctAnswer: 0,
            explanation: "The flour's value is already inside the finished bread, so counting both would double-count. GDP counts only the final $3 loaf."
          },
          {
            id: "indicators1-mastery3",
            question: "What is a common rough signal of a recession?",
            options: [
              "Two straight quarters of falling GDP",
              "One single month of gently rising consumer prices",
              "A single unusually strong quarter of fast growth",
              "Any small drop at all in the stock market"
            ],
            correctAnswer: 0,
            explanation: "Two consecutive quarters of shrinking real GDP is a widely used rough marker, though official U.S. calls also weigh employment and other data."
          },
          {
            id: "indicators1-mastery4",
            question: "What is the largest component of U.S. GDP by spending?",
            options: [
              "Consumer spending",
              "Net exports",
              "Government spending",
              "Business investment"
            ],
            correctAnswer: 0,
            explanation: "Consumer spending is about two-thirds of U.S. GDP, which is why shoppers' behavior so strongly drives the economy."
          },
          {
            id: "indicators1-mastery5",
            question: "What does GDP fail to capture?",
            options: [
              "Unpaid work, inequality, and environmental harm",
              "The total dollar value of everything produced",
              "How much the overall economy grew last year",
              "Both consumer spending and business investment spending"
            ],
            correctAnswer: 0,
            explanation: "GDP measures activity but ignores unpaid labor, how wealth is shared, and environmental damage, so it is incomplete on its own."
          },
          {
            id: "indicators1-mastery6",
            question: "Why can total GDP mislead when comparing living standards?",
            options: [
              "A big population can inflate total GDP",
              "GDP is always measured in ounces of gold",
              "Total GDP completely ignores all prices",
              "GDP counts only one single industry's output"
            ],
            correctAnswer: 0,
            explanation: "A large country can have huge total GDP just from many people, so GDP per capita better reflects the average person's prosperity."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // indicators-2: Unemployment
  // ─────────────────────────────────────────────
  {
    lessonId: "indicators-2",
    sections: [
      {
        type: "concept",
        title: "Counting Who Has Work",
        paragraphs: [
          "The unemployment rate measures the share of people who want a job and are actively looking but cannot find one. It is calculated as the number of unemployed divided by the 'labor force' - everyone who is either working or actively seeking work. Crucially, you must be actively looking to count as unemployed. A retired person, a full-time student, or someone who has given up searching is not in the labor force at all, so they do not raise the unemployment rate. In the U.S., a monthly survey of about 60,000 households produces this closely watched figure.",
          "Because of how it is defined, the unemployment rate can be misleading. If discouraged workers stop looking during a bad economy, they drop out of the labor force, and the unemployment rate can actually fall even though fewer people are working - a confusing quirk. That is why economists also watch the 'labor force participation rate,' the share of working-age adults in the labor force at all. A falling participation rate can reveal weakness that the headline unemployment rate hides. Together, the two numbers give a fuller picture than either alone.",
          "There are different types of unemployment, and not all are bad. 'Frictional' unemployment is people briefly between jobs - a normal, healthy churn as workers switch to better roles. 'Structural' unemployment happens when workers' skills no longer match available jobs, such as factory workers displaced by automation. 'Cyclical' unemployment rises during recessions when demand collapses. Because some frictional unemployment always exists, economists consider 'full employment' to be a low rate like 3.5% to 4.5%, not literally zero. A rate near 4% is generally seen as a strong, healthy job market."
        ],
        bullets: [
          "Unemployment rate = unemployed divided by the labor force.",
          "You must be actively looking for work to count as unemployed.",
          "A survey of about 60,000 U.S. households produces the monthly rate.",
          "Discouraged workers dropping out can distort the headline rate.",
          "'Full employment' is a low rate near 4%, not literally zero."
        ],
        realWorldExample: "During the COVID shock of April 2020, U.S. unemployment spiked to about 14.7%, the highest since the Great Depression, as tens of millions lost work almost overnight. Within two years it fell back near 3.5%, showing how fast this indicator can swing in a crisis."
      },
      {
        type: "concept",
        title: "Why Unemployment Guides Big Decisions",
        paragraphs: [
          "Unemployment is one half of the Fed's dual mandate, so the jobs report directly shapes interest-rate policy. When unemployment is high, the Fed leans toward cutting rates to stimulate hiring. When unemployment is very low and wages are climbing fast, the Fed may worry about inflation and raise rates to cool things down. This creates a tension: a red-hot job market that is great for workers can also push prices up, forcing the Fed into painful choices. Investors pore over the monthly jobs report because it hints at the Fed's next move.",
          "Unemployment is considered a 'lagging' indicator - it tends to change after the economy has already turned. Businesses are slow to lay people off when a downturn begins, hoping conditions improve, and slow to hire when recovery starts, waiting to be sure. So unemployment often keeps rising for months after a recession has technically ended, and keeps falling well into an expansion. This lag means the jobs report confirms trends rather than predicting them, which is why economists pair it with leading indicators that move earlier.",
          "There is also a famous relationship called Okun's law, which links unemployment to GDP: roughly, when the economy grows faster than its long-run trend, unemployment falls, and when growth stalls, unemployment rises. And economists debate a 'natural rate' of unemployment below which inflation tends to accelerate, because employers must raise wages sharply to find scarce workers. The headline rate is not the only measure that matters, either: analysts also track broader gauges that include part-time workers who want full-time hours and people only loosely attached to the labor force, giving a fuller sense of slack in the job market. These links explain why a single monthly jobs number can move stock and bond markets in seconds - it reshapes expectations about growth, wages, inflation, and the Fed all at once."
        ],
        bullets: [
          "Unemployment is half the Fed's mandate and shapes interest-rate decisions.",
          "Very low unemployment can raise inflation fears and prompt rate hikes.",
          "Unemployment is a lagging indicator, changing after the economy turns.",
          "Okun's law links faster GDP growth to falling unemployment.",
          "A single jobs report can move markets by reshaping Fed expectations."
        ],
        realWorldExample: "In 2023, U.S. unemployment stayed near a 50-year low around 3.5% even as the Fed hiked rates hard. That strong job market let the Fed keep fighting inflation without triggering the mass layoffs many economists had feared - a rare, closely watched outcome."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "indicators2-mc1",
            question: "Who counts as 'unemployed' in the official rate?",
            options: [
              "Jobless people who are actively looking for work",
              "Absolutely everyone who is not currently working at all",
              "Retired people who are quietly enjoying their savings",
              "Full-time students studying at school or college"
            ],
            correctAnswer: 0,
            explanation: "To be counted unemployed you must lack a job and be actively searching. Retirees, students, and those who stopped looking are outside the labor force."
          },
          {
            id: "indicators2-mc2",
            question: "Why is unemployment called a 'lagging' indicator?",
            options: [
              "It tends to change after the economy turns",
              "It reliably predicts coming recessions many months ahead",
              "It is always measured and reported a full year late",
              "It never really changes at all over time"
            ],
            correctAnswer: 0,
            explanation: "Businesses are slow to fire and slow to hire, so unemployment shifts after the economy turns, confirming trends rather than predicting them."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Falling Rate That Isn't Good News",
        narrative: "During a weak economy, the news reports that the unemployment rate dropped last month. Yet a reporter notes that fewer people are actually working than before. A viewer, Tanya, is confused: how can unemployment fall while employment also falls?",
        details: [
          "Discouraged workers who stopped looking leave the labor force entirely.",
          "People not looking for work are not counted as unemployed.",
          "Removing them can lower the unemployment rate even as jobs shrink.",
          "The labor force participation rate reveals this hidden weakness."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "indicators2-aq1",
          question: "How can the unemployment rate fall while fewer people work?",
          options: [
            "The economy suddenly created a great many new jobs",
            "Discouraged workers left the labor force",
            "The Fed quietly changed the official definition of a job",
            "Consumer prices rose much faster than workers' wages did"
          ],
          correctAnswer: 1,
          explanation: "People who give up searching leave the labor force, so they no longer count as unemployed - which can lower the rate even as employment falls."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The unemployment rate is the unemployed divided by the labor force.",
          "You must be actively looking to count as unemployed.",
          "'Full employment' is a low rate near 4%, not zero.",
          "Unemployment is a lagging indicator that changes after the economy turns.",
          "The jobs report strongly shapes Fed policy and moves markets."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "indicators2-mastery1",
            question: "What is the 'labor force'?",
            options: [
              "Everyone working or seeking work",
              "Only the people who are currently unemployed",
              "All adults in the country, including retirees",
              "Only workers employed by the government"
            ],
            correctAnswer: 0,
            explanation: "The labor force is everyone either employed or actively looking for a job; it excludes retirees, students, and those who stopped searching."
          },
          {
            id: "indicators2-mastery2",
            question: "What is 'frictional' unemployment?",
            options: [
              "People briefly between jobs",
              "Workers permanently displaced by new automation",
              "Job losses that occur during a deep recession",
              "People who simply never want to work at all"
            ],
            correctAnswer: 0,
            explanation: "Frictional unemployment is the normal, short-term gap as workers move between jobs - a sign of a healthy, mobile labor market."
          },
          {
            id: "indicators2-mastery3",
            question: "Why is 'full employment' set near 4%, not 0%?",
            options: [
              "Some frictional unemployment always exists",
              "The law caps it at 4%",
              "Zero is impossible to measure",
              "Employers refuse to hire everyone"
            ],
            correctAnswer: 0,
            explanation: "Because people are always briefly between jobs, some frictional unemployment persists, so a low rate near 4% counts as full employment."
          },
          {
            id: "indicators2-mastery4",
            question: "How high did U.S. unemployment spike in April 2020?",
            options: [
              "About 14.7%",
              "About 3.5%",
              "About 25%",
              "About 8%"
            ],
            correctAnswer: 0,
            explanation: "The COVID shock drove unemployment to about 14.7% in April 2020, the highest since the Great Depression, before it fell back within two years."
          },
          {
            id: "indicators2-mastery5",
            question: "How does very low unemployment influence the Fed?",
            options: [
              "It can raise inflation fears, prompting hikes",
              "It completely forces the Fed to cut its rates to zero",
              "It has no real effect on the Fed at all",
              "It makes the Fed decide to print much more money"
            ],
            correctAnswer: 0,
            explanation: "A very tight job market pushes wages and prices up, so the Fed may raise rates to cool inflation even though workers are doing well."
          },
          {
            id: "indicators2-mastery6",
            question: "What does Okun's law describe?",
            options: [
              "Faster GDP growth tends to lower unemployment",
              "Consumer prices always double every single decade of time",
              "Bond prices fall whenever interest rates rise",
              "High unemployment always directly causes deflation"
            ],
            correctAnswer: 0,
            explanation: "Okun's law links output and jobs: when the economy grows faster than trend, unemployment falls; when growth stalls, it rises."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // indicators-3: Consumer Confidence
  // ─────────────────────────────────────────────
  {
    lessonId: "indicators-3",
    sections: [
      {
        type: "concept",
        title: "Measuring How People Feel About Money",
        paragraphs: [
          "Consumer confidence measures how optimistic or worried people feel about their finances and the economy's future. It sounds soft compared to hard numbers like GDP, but feelings drive spending, and spending drives roughly two-thirds of the economy. Surveys ask thousands of households questions like: Is now a good time to buy a big item? Do you expect your income to rise? Do you think jobs will be plentiful in six months? Their answers are combined into an index. In the U.S., the Conference Board's Consumer Confidence Index and the University of Michigan's survey are the two most watched gauges.",
          "Confidence works as a kind of self-fulfilling prophecy. When people feel secure about their jobs and income, they spend freely - buying cars, taking vacations, eating out - which boosts businesses and creates more jobs, reinforcing the good mood. When people feel anxious, they pull back, save more, and delay big purchases, which slows businesses and can trigger the very downturn they feared. This feedback loop makes confidence a powerful force. A sudden drop in confidence can cool the economy even before any hard data weakens, purely because millions of people simultaneously get cautious.",
          "The index is usually set against a base year equal to 100. A reading well above 100 signals strong optimism; a reading well below signals fear. During the depths of the 2008 financial crisis, U.S. consumer confidence collapsed to around 25, an extraordinary low, as people feared for their jobs and savings. In booming times it can climb well above 130. Economists watch not just the level but the direction: a steady slide in confidence over several months is often an early warning that spending, and the broader economy, may soon weaken."
        ],
        bullets: [
          "Consumer confidence gauges how optimistic people feel about their finances.",
          "Feelings matter because spending drives about two-thirds of the economy.",
          "Confidence is self-fulfilling: optimism fuels spending, fear pulls it back.",
          "The Conference Board and University of Michigan run the top U.S. surveys.",
          "The index is set against 100; it crashed near 25 during the 2008 crisis."
        ],
        realWorldExample: "In 2008, as Lehman Brothers collapsed and headlines screamed panic, consumer confidence plunged toward 25. Frightened households slashed spending on cars and dining out, deepening the recession - a vivid case of fear feeding on itself and dragging the real economy down."
      },
      {
        type: "concept",
        title: "Confidence as a Signal, With Limits",
        paragraphs: [
          "Consumer confidence is generally treated as a 'leading' indicator - it tends to shift before actual spending and GDP do, giving an early read on where the economy is heading. If confidence drops sharply this month, weaker retail sales often follow in coming months. Businesses use these surveys to plan inventory and hiring, and investors watch them for clues about future growth. Because confidence reflects expectations, it can capture turning points that backward-looking data like unemployment miss until later, making it a useful early-warning tool.",
          "But confidence has real limitations. What people say and what they do can differ - someone may report gloom in a survey yet keep spending normally, especially if they have a stable job. Confidence is also heavily swayed by headlines: a scary news cycle, a gas-price spike, or political turmoil can dent confidence even when household finances are fine. This 'noise' means a single month's reading can mislead, so economists focus on the trend over several months rather than overreacting to one number. Confidence is a hint about the future, not a guarantee.",
          "Confidence surveys also split into two useful parts: how people feel about the present and how they feel about the future. The Conference Board reports a 'present situation' index and an 'expectations' index. When people feel fine now but fear the future, the gap between these two can itself be a warning sign - it has often widened before recessions. Reading confidence intelligently means looking beyond the headline number to these components and the direction of travel, combining it with hard data like sales and jobs for a balanced view of the economy."
        ],
        bullets: [
          "Consumer confidence is a leading indicator, shifting before spending and GDP.",
          "It can capture turning points that lagging data miss until later.",
          "What people say and do can differ, so surveys carry 'noise.'",
          "Headlines and gas prices can sway confidence even with stable finances.",
          "The gap between 'present situation' and 'expectations' can warn of recessions."
        ],
        realWorldExample: "In 2022, U.S. consumer confidence sagged as gas prices spiked and inflation headlines dominated - yet Americans kept spending, buoyed by pandemic savings and strong jobs. It showed how mood and behavior can diverge, and why economists watch actual sales alongside the surveys."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "indicators3-mc1",
            question: "Why does consumer confidence matter to the economy?",
            options: [
              "Feelings drive spending, powering the economy",
              "It directly sets the nation's interest rates itself",
              "It measures only the prices of stocks",
              "It directly controls the country's money supply"
            ],
            correctAnswer: 0,
            explanation: "Confidence shapes how freely people spend, and since spending is about two-thirds of the economy, mood has real economic power."
          },
          {
            id: "indicators3-mc2",
            question: "Consumer confidence is generally considered which type of indicator?",
            options: [
              "A leading indicator that shifts early",
              "A lagging indicator that always changes dead last",
              "A vague measure with no predictive value at all",
              "A pure backward-looking measure of past inflation"
            ],
            correctAnswer: 0,
            explanation: "Confidence reflects expectations, so it tends to move before actual spending and output, giving an early read on the economy's direction."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Mood Shift",
        narrative: "Over three months, consumer confidence surveys drop steadily as scary economic headlines pile up. Retail managers notice shoppers hesitating on big purchases like appliances and furniture. An analyst, Priya, is asked what this trend might signal for the months ahead.",
        details: [
          "Falling confidence is a leading indicator of weaker future spending.",
          "As a self-fulfilling loop, cautious shoppers can slow the economy.",
          "Big-ticket purchases are often delayed first when people feel anxious.",
          "A single month is noisy, but a steady three-month slide is meaningful."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "indicators3-aq1",
          question: "What does a steady three-month drop in confidence most likely signal?",
          options: [
            "Spending and growth may soon weaken",
            "The whole stock market must rise almost immediately",
            "Inflation is now guaranteed to disappear completely",
            "Nothing at all, since confidence never really matters"
          ],
          correctAnswer: 0,
          explanation: "As a leading indicator, a sustained confidence slide often precedes weaker spending and slower growth, especially as shoppers delay big purchases."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Consumer confidence measures optimism about finances and the economy.",
          "It matters because spending drives about two-thirds of the economy.",
          "It is self-fulfilling: optimism fuels spending, fear pulls it back.",
          "As a leading indicator, it can flag turning points early.",
          "Say-versus-do gaps and headline noise mean the trend matters most."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "indicators3-mastery1",
            question: "Which two surveys are the most watched U.S. confidence gauges?",
            options: [
              "The Conference Board and University of Michigan",
              "The Federal Reserve and the U.S. Treasury Department",
              "The New York Stock Exchange and the Nasdaq exchange",
              "The Gallup polling company and the national census"
            ],
            correctAnswer: 0,
            explanation: "The Conference Board's Consumer Confidence Index and the University of Michigan's survey are the two leading U.S. confidence measures."
          },
          {
            id: "indicators3-mastery2",
            question: "How is consumer confidence 'self-fulfilling'?",
            options: [
              "Optimism boosts spending while fear cuts it",
              "It directly forces the Federal Reserve to act",
              "It sets the prices of goods directly",
              "It has no real effect on anyone's behavior"
            ],
            correctAnswer: 0,
            explanation: "Confident people spend, boosting business and jobs; anxious people pull back, slowing the economy - so the mood helps create the outcome."
          },
          {
            id: "indicators3-mastery3",
            question: "The confidence index is set against what base value?",
            options: [
              "100",
              "0",
              "1,000",
              "50"
            ],
            correctAnswer: 0,
            explanation: "The index uses a base of 100; readings above signal optimism and below signal fear, such as the near-25 low during the 2008 crisis."
          },
          {
            id: "indicators3-mastery4",
            question: "Why can a single month's confidence reading mislead?",
            options: [
              "Headlines and gas prices add noise",
              "The number is always deliberately falsified by officials",
              "It only ever surveys about ten total people",
              "It really measures last year's outdated data instead"
            ],
            correctAnswer: 0,
            explanation: "Scary news, gas-price spikes, or politics can sway confidence even with stable finances, so economists watch the multi-month trend, not one reading."
          },
          {
            id: "indicators3-mastery5",
            question: "What two components do confidence surveys often split into?",
            options: [
              "Present situation and future expectations",
              "Rich households and poorer households separately",
              "Ownership of stocks versus ownership of bonds",
              "The country's total imports and its exports"
            ],
            correctAnswer: 0,
            explanation: "Surveys separate how people feel about now (present situation) from how they feel about the future (expectations); the gap can warn of recessions."
          },
          {
            id: "indicators3-mastery6",
            question: "What did 2022 show about mood versus behavior?",
            options: [
              "Confidence sagged, yet spending held up",
              "Confidence and actual spending always match up exactly",
              "Confidence rose sharply while spending totally collapsed",
              "Confidence simply stopped being measured that year"
            ],
            correctAnswer: 0,
            explanation: "In 2022, gloomy confidence coexisted with strong spending backed by savings and jobs, showing why economists watch actual sales alongside surveys."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // indicators-4: Retail Sales
  // ─────────────────────────────────────────────
  {
    lessonId: "indicators-4",
    sections: [
      {
        type: "concept",
        title: "Tracking the Cash Registers",
        paragraphs: [
          "Retail sales measure the total dollar value of goods sold by stores and online sellers - everything from cars and furniture to groceries, clothes, gas, and restaurant meals. Because consumer spending drives roughly two-thirds of the U.S. economy, the monthly retail sales report is one of the most direct windows into economic health. The U.S. Census Bureau surveys thousands of retailers and releases the figure about two weeks after each month ends. When retail sales rise, it signals that households feel able to spend; when they fall, it warns that consumers are pulling back.",
          "Analysts pay special attention to how the report is broken down. 'Core' retail sales strip out volatile categories like automobiles and gasoline, whose prices and volumes swing sharply, to reveal the steadier underlying trend - similar to how core CPI removes food and energy. A jump in overall sales driven only by a gas-price spike is not the same as broad-based strength across many categories. Economists also compare sales month-over-month and year-over-year, and they adjust for seasonal patterns, since December holiday shopping naturally dwarfs a quiet February.",
          "Retail sales must also be read against inflation. Because the headline number is measured in dollars, rising prices alone can make sales look strong even if people are buying the same amount or less. If retail sales rise 4% but inflation is 4%, real spending was actually flat - shoppers just paid more for the same goods. This is why careful analysts separate whether higher sales reflect more stuff being bought or simply higher prices. That distinction determines whether the economy is genuinely growing or just getting more expensive."
        ],
        bullets: [
          "Retail sales total the dollar value of goods sold by stores and online sellers.",
          "Consumer spending drives about two-thirds of the U.S. economy.",
          "The Census Bureau reports the figure about two weeks after month's end.",
          "'Core' retail sales strip out volatile autos and gas for a clearer trend.",
          "Rising prices can inflate sales, so real spending adjusts for inflation."
        ],
        realWorldExample: "Each holiday season, headlines track Black Friday and Cyber Monday spending because November and December can make up a huge share of yearly retail sales for many stores. A weak holiday season can signal a cautious consumer heading into the new year."
      },
      {
        type: "concept",
        title: "Why Retail Sales Move Markets and Policy",
        paragraphs: [
          "Retail sales are considered a 'coincident' to slightly leading indicator - they move roughly with the economy and can hint at its near-term direction, since spending shifts before broader GDP data arrives. A strong report suggests confident consumers and healthy growth ahead; a weak one raises recession worries. Because the report comes out monthly and quickly, it gives a timely read long before quarterly GDP is published. Investors and the Fed both watch it closely, and a surprising number can move stock and bond markets within minutes of release.",
          "The report shapes decisions across the economy. Retailers use it to judge demand and plan inventory and hiring for coming months. The Fed weighs it when deciding on interest rates: booming sales with rising prices may signal an overheating economy needing higher rates, while slumping sales may argue for cuts to stimulate spending. Companies that sell to consumers watch it to gauge whether to expand or pull back. A single monthly figure thus ripples into store staffing, factory orders, and central-bank policy alike.",
          "Retail sales also reveal shifts in how and where people spend, which matters for investors. The steady rise of e-commerce shows up clearly as online's share of retail sales climbs year after year, a trend that helped companies like Amazon soar while some traditional malls struggled. Spending mix matters too: when shoppers shift from goods to services like travel and dining - as they did after pandemic lockdowns eased - goods-focused retail sales can soften even as the overall economy stays strong. The report even breaks sales down by category, so a surge at restaurants or a slump at furniture stores can flag exactly where consumers are gaining or losing confidence. Reading these patterns helps investors spot which businesses are winning and losing, and gives an early hint about which parts of the economy are heating up or cooling down."
        ],
        bullets: [
          "Retail sales roughly track the economy and hint at its near-term direction.",
          "Monthly, timely data gives an early read before quarterly GDP.",
          "The Fed weighs sales when setting interest rates.",
          "Rising e-commerce share shows up clearly in the sales breakdown.",
          "Shifts from goods to services can soften retail sales while growth stays fine."
        ],
        realWorldExample: "After 2020 lockdowns lifted, Americans shifted spending from goods to services like travel and concerts. Retail-goods sales cooled while airlines and restaurants boomed, showing how the mix inside the data can matter as much as the headline total."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "indicators4-mc1",
            question: "What do retail sales measure?",
            options: [
              "The dollar value of goods sold to shoppers",
              "The total number of factories operating in a country",
              "The total amount of new money that banks print",
              "Only the sales of expensive, high-end luxury cars"
            ],
            correctAnswer: 0,
            explanation: "Retail sales total the value of goods sold across stores and online, from cars to groceries, offering a direct window into consumer spending."
          },
          {
            id: "indicators4-mc2",
            question: "Why do analysts watch 'core' retail sales?",
            options: [
              "They strip out volatile autos and gas",
              "They include only high-end luxury purchases and services",
              "They completely ignore all sales made online",
              "They measure retail sales made in other countries"
            ],
            correctAnswer: 0,
            explanation: "Core retail sales remove swingy categories like autos and gasoline, revealing the steadier underlying spending trend."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sales Up, But Are They Really?",
        narrative: "A monthly report shows retail sales rose 4% compared with a year ago, and a headline calls it a spending boom. But an analyst, Devon, notices that inflation over the same year was also about 4%. He questions whether consumers actually bought more stuff.",
        details: [
          "Retail sales are measured in dollars, so prices affect the figure.",
          "If prices rose 4% and sales rose 4%, real spending was roughly flat.",
          "Shoppers may have bought the same amount but paid more for it.",
          "Adjusting for inflation shows true changes in quantity purchased."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "indicators4-aq1",
          question: "If sales rose 4% while inflation was also 4%, what happened to real spending?",
          options: [
            "It surged well above its normal level for the year",
            "It was roughly flat after adjusting for inflation",
            "It fell sharply by a full 8% over the year",
            "It simply cannot be estimated from this at all"
          ],
          correctAnswer: 1,
          explanation: "Because sales are in dollars, a 4% rise fully explained by 4% inflation means shoppers bought about the same amount - real spending was essentially flat."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Retail sales total the dollar value of goods sold by stores and online.",
          "They offer a direct, timely window into consumer spending.",
          "Core sales strip out volatile autos and gas for a clearer trend.",
          "Sales must be adjusted for inflation to show real changes in buying.",
          "The Fed and investors use the report to judge growth and set policy."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "indicators4-mastery1",
            question: "Who publishes the U.S. retail sales report?",
            options: [
              "The Census Bureau",
              "The New York Stock Exchange",
              "Individual retailers alone",
              "The Supreme Court"
            ],
            correctAnswer: 0,
            explanation: "The U.S. Census Bureau surveys thousands of retailers and releases the report about two weeks after each month ends."
          },
          {
            id: "indicators4-mastery2",
            question: "Why must retail sales be read against inflation?",
            options: [
              "Rising prices can make sales look strong",
              "Inflation completely cancels out all of retail sales",
              "Sales are always measured only in units, never in dollars",
              "Inflation makes retail sales impossible to report at all"
            ],
            correctAnswer: 0,
            explanation: "Sales are measured in dollars, so higher prices alone can inflate the figure. Adjusting for inflation reveals whether people bought more or just paid more."
          },
          {
            id: "indicators4-mastery3",
            question: "Retail sales are best described as which kind of indicator?",
            options: [
              "Coincident to slightly leading",
              "Purely lagging, changing last",
              "Unrelated to the economy",
              "A measure of past decades only"
            ],
            correctAnswer: 0,
            explanation: "Retail sales move roughly with the economy and can hint at near-term direction, since spending shifts before quarterly GDP data arrives."
          },
          {
            id: "indicators4-mastery4",
            question: "How does the Fed use retail sales data?",
            options: [
              "To judge growth and set rates",
              "To print new physical paper currency for banks",
              "To set the prices in retail stores directly",
              "To completely ignore all consumer spending behavior"
            ],
            correctAnswer: 0,
            explanation: "Strong sales with rising prices may signal overheating and argue for higher rates, while weak sales may support cuts to stimulate spending."
          },
          {
            id: "indicators4-mastery5",
            question: "What trend shows up clearly in the retail sales breakdown?",
            options: [
              "The rising share of e-commerce",
              "The disappearance of all stores",
              "A ban on holiday shopping",
              "The end of consumer spending"
            ],
            correctAnswer: 0,
            explanation: "Online's growing share of sales appears year after year in the data, a shift that helped e-commerce firms soar while some malls struggled."
          },
          {
            id: "indicators4-mastery6",
            question: "Why can retail-goods sales soften while the economy stays strong?",
            options: [
              "Spending can shift toward services",
              "Because all the stores suddenly stop reporting their data",
              "Because the Fed legally forbids the sale of goods",
              "Because the inflation rate always falls back to zero"
            ],
            correctAnswer: 0,
            explanation: "When shoppers move spending toward services like travel and dining, goods-focused retail sales can cool even as the overall economy remains healthy."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // indicators-5: Housing
  // ─────────────────────────────────────────────
  {
    lessonId: "indicators-5",
    sections: [
      {
        type: "concept",
        title: "Why Housing Is an Economic Bellwether",
        paragraphs: [
          "Housing is one of the most powerful economic indicators because building and buying homes ripples through so much of the economy. A single new house creates work for construction crews, lumber and appliance makers, real estate agents, movers, and furniture stores. Economists track several housing measures: 'housing starts' (new homes builders begin), 'building permits' (approvals that hint at future starts), 'existing home sales,' and home prices. Because families and builders only commit to homes when they feel financially secure, housing activity reflects the economy's underlying confidence and health.",
          "Housing is highly sensitive to interest rates, which makes it a strong leading indicator. Most homes are bought with mortgages, so when the Fed raises rates, monthly payments jump and buyers pull back quickly - cooling the housing market months before the broader economy slows. When rates fall, cheap mortgages spark buying and building. This sensitivity means housing often turns down before a recession and turns up before a recovery, giving economists an early signal. Building permits, in particular, are counted among the official leading economic indicators because they reveal builders' bets on the future.",
          "Home prices also matter through the 'wealth effect.' For most families, a home is their largest asset, so when home values rise, people feel richer and spend more freely, boosting the economy. When home prices fall, people feel poorer and cut back, even if their income has not changed. This effect can amplify economic swings in both directions. Rising home equity in the 2000s fueled a spending boom, while collapsing home values after 2007 made families slam their wallets shut, deepening the recession."
        ],
        bullets: [
          "Housing ripples widely: construction, appliances, agents, movers, furniture.",
          "Key measures: housing starts, building permits, existing sales, and prices.",
          "Housing is rate-sensitive, so it leads the economy up and down.",
          "Building permits are counted among official leading indicators.",
          "The 'wealth effect' means rising home values spur spending, and falling ones cut it."
        ],
        realWorldExample: "When the Fed hiked rates in 2022 and mortgage rates jumped from about 3% to over 7%, home sales fell sharply within months as buyers were priced out. Housing cooled well before the rest of the economy, showing its role as an early warning gauge."
      },
      {
        type: "concept",
        title: "Housing at the Center of Crises",
        paragraphs: [
          "Housing's importance was made brutally clear in the 2008 financial crisis, which began in the housing market. Through the mid-2000s, easy lending and speculation drove home prices to unsustainable heights - a classic bubble. Lenders handed mortgages to buyers who could not truly afford them, bundling these risky loans into complex securities sold worldwide. When home prices stopped rising and borrowers defaulted, the whole structure collapsed. U.S. home prices fell roughly 27% from peak to trough, wiping out trillions in wealth and triggering a global recession. Housing was not just an indicator that year - it was the epicenter.",
          "Housing affordability itself has become a closely watched signal. Economists compare home prices to incomes and rents to judge whether housing is overvalued. When prices race far ahead of what typical incomes can support, it can flag a bubble or a coming slowdown, as fewer people can afford to buy. After 2020, home prices surged over 40% in some U.S. markets amid low rates and remote work, pushing affordability to its worst level in decades and sparking debate about whether another correction loomed.",
          "For everyday investors and future homebuyers, housing indicators offer practical lessons. Watching mortgage rates, home-price trends, and inventory (how many homes are for sale) helps time big decisions and understand the broader economy. A market with rising inventory and slowing sales often signals prices may soften, while tight inventory and bidding wars signal a hot market. Housing also connects to the wider financial world through the mortgage-backed securities and real estate investment trusts that many portfolios hold, so a housing slump can ripple into stocks and bonds far from the housing market itself. Because housing both reflects and drives the economy, learning to read these signals helps you understand recessions, recoveries, and one of the biggest financial decisions most people ever make."
        ],
        bullets: [
          "The 2008 crisis began as a housing bubble built on risky mortgages.",
          "U.S. home prices fell about 27% from peak, wiping out trillions.",
          "Affordability compares prices to incomes to spot overvaluation.",
          "Post-2020 prices surged over 40% in some markets, straining affordability.",
          "Inventory and mortgage-rate trends help time housing decisions."
        ],
        realWorldExample: "In the 2008 crisis, millions of Americans owed more on their mortgages than their homes were worth - 'underwater' - after prices crashed about 27%. Foreclosures spread, banks failed, and the housing collapse dragged the entire global economy into recession."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "indicators5-mc1",
            question: "Why is housing such a powerful economic indicator?",
            options: [
              "Building and buying homes ripples widely",
              "Homes are the only thing that people ever actually buy",
              "Housing is completely unaffected by any interest rates",
              "It measures only the current price of raw land"
            ],
            correctAnswer: 0,
            explanation: "A single home creates work for builders, appliance makers, agents, and movers, so housing activity reflects and drives broad economic health."
          },
          {
            id: "indicators5-mc2",
            question: "Why does housing tend to lead the economy?",
            options: [
              "It is highly sensitive to rate changes",
              "Homes essentially never change at all in value",
              "Housing completely ignores the cost of mortgages",
              "Homebuilders never plan or think ahead"
            ],
            correctAnswer: 0,
            explanation: "Because most homes are bought with mortgages, rate changes quickly speed up or cool housing, so it turns before the broader economy."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Cooling Market",
        narrative: "After the Fed raises rates sharply, Jordan notices local home listings sitting unsold for longer, more 'price reduced' signs, and fewer bidding wars than a year earlier. Mortgage rates have roughly doubled. Jordan wonders what this shift in the housing market suggests about the wider economy.",
        details: [
          "Higher mortgage rates priced many buyers out, cooling demand.",
          "Rising inventory and longer listing times point to softening prices.",
          "Housing is rate-sensitive and often turns before the broader economy.",
          "This early cooling can be a leading signal of a slowing economy."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "indicators5-aq1",
          question: "What does the cooling housing market most likely suggest?",
          options: [
            "The broader economy may be slowing",
            "Home prices will definitely never fall at all",
            "Interest rates have no effect on the housing market",
            "The economy is now guaranteed to boom next month"
          ],
          correctAnswer: 0,
          explanation: "Housing is rate-sensitive and tends to turn before the wider economy, so a cooling market driven by higher rates can be an early sign of a slowdown."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Housing ripples through construction, appliances, agents, and furniture.",
          "It is rate-sensitive, so it leads the economy up and down.",
          "Building permits are counted among official leading indicators.",
          "The wealth effect ties home values to how freely people spend.",
          "The 2008 crisis began as a housing bubble, crashing prices about 27%."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "indicators5-mastery1",
            question: "What are 'housing starts'?",
            options: [
              "New homes builders begin building",
              "Old homes that are being torn down and demolished",
              "The total combined value of all existing homes",
              "Monthly mortgage payments made by existing homeowners"
            ],
            correctAnswer: 0,
            explanation: "Housing starts count new homes builders begin, a direct gauge of construction activity and builders' confidence in future demand."
          },
          {
            id: "indicators5-mastery2",
            question: "What is the 'wealth effect' in housing?",
            options: [
              "Rising home values make owners spend more",
              "Home prices never change how much people spend",
              "Only the banks ever benefit from rising home values",
              "Falling home prices actually boost consumer spending"
            ],
            correctAnswer: 0,
            explanation: "When homes gain value, owners feel wealthier and spend more; when values fall, they feel poorer and cut back, amplifying economic swings."
          },
          {
            id: "indicators5-mastery3",
            question: "Roughly how far did U.S. home prices fall in the 2008 crisis?",
            options: [
              "About 27% from peak to trough",
              "Only about 5% from top to bottom",
              "A staggering 60% from peak to trough",
              "They actually rose steadily the whole time"
            ],
            correctAnswer: 0,
            explanation: "U.S. home prices fell roughly 27% from their peak, wiping out trillions in wealth and helping trigger a global recession."
          },
          {
            id: "indicators5-mastery4",
            question: "Why are building permits a leading indicator?",
            options: [
              "They reveal builders' bets on future building",
              "They only record homes that are already finished",
              "They measure past home sales and nothing more",
              "They mainly track the level of mortgage defaults"
            ],
            correctAnswer: 0,
            explanation: "Permits are approvals to build, so they signal construction that is coming, making them an early read on the economy's direction."
          },
          {
            id: "indicators5-mastery5",
            question: "How do economists judge housing affordability?",
            options: [
              "By comparing home prices to incomes",
              "By simply counting how many homes exist in total",
              "By measuring only the total available land area",
              "By ignoring people's incomes entirely when judging"
            ],
            correctAnswer: 0,
            explanation: "Comparing prices to incomes and rents shows whether housing is overvalued; prices racing far ahead of incomes can flag a bubble."
          },
          {
            id: "indicators5-mastery6",
            question: "What does rising home inventory with slowing sales often signal?",
            options: [
              "Prices may soften as demand cools",
              "Prices must now rise very sharply everywhere",
              "A guaranteed, unstoppable nationwide housing boom",
              "That interest rates will soon fall to zero"
            ],
            correctAnswer: 0,
            explanation: "More homes sitting unsold with fewer buyers points to weakening demand, which often leads prices to soften."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // indicators-6: Recessions
  // ─────────────────────────────────────────────
  {
    lessonId: "indicators-6",
    sections: [
      {
        type: "concept",
        title: "What a Recession Really Is",
        paragraphs: [
          "A recession is a significant, widespread decline in economic activity lasting more than a few months. A popular rule of thumb is two consecutive quarters of falling real GDP, but the official U.S. arbiter - the National Bureau of Economic Research (NBER) - uses a broader definition, weighing GDP, employment, incomes, spending, and industrial production together. NBER defines a recession as a significant decline spread across the economy, lasting more than a few months. Because it studies many measures carefully, NBER often declares a recession's start or end months after it actually happened, confirming rather than predicting.",
          "Recessions are a normal, recurring part of the business cycle - the economy's natural rhythm of expansion, peak, contraction, and recovery. Since World War II, the U.S. has had about a dozen recessions, roughly one every six years on average, though the timing is irregular. Most are relatively short, lasting under a year, while expansions in between tend to last much longer. This pattern means recessions, while painful, are expected features of a market economy, not signs that the system is broken. Understanding this helps investors avoid panic when one arrives.",
          "The human toll of recessions is real. As demand falls, businesses cut production and lay off workers, so unemployment rises - often sharply. Incomes shrink, people spend less, and that reduced spending causes further layoffs, creating a downward spiral. Stock markets typically fall as investors expect lower profits. The severity varies enormously: a mild recession might barely dent unemployment, while the Great Recession of 2007-2009 saw unemployment double to 10% and millions lose homes. Recognizing the causes and effects helps people and policymakers respond wisely."
        ],
        bullets: [
          "A recession is a significant, widespread decline in activity over months.",
          "The rule of thumb is two straight quarters of falling real GDP.",
          "NBER officially dates U.S. recessions using many measures, often in hindsight.",
          "Recessions recur about once every six years on average since WWII.",
          "Falling demand raises unemployment, which can spiral downward."
        ],
        realWorldExample: "During the Great Recession of 2007-2009, U.S. GDP shrank, about 8.7 million jobs vanished, and unemployment doubled to 10%. It lasted 18 months, the longest downturn since the Great Depression, showing how severe a recession's human toll can be."
      },
      {
        type: "concept",
        title: "Causes, Fixes, and Surviving Downturns",
        paragraphs: [
          "Recessions have several common triggers. Some follow bubbles bursting, like the 2008 housing crash or the 2000 dot-com collapse, when overpriced assets tumble and drag spending down. Others come from external shocks, such as the 2020 pandemic that abruptly halted activity, or oil-price spikes that raise costs across the economy. Some are triggered when the Fed raises rates sharply to fight inflation, deliberately cooling the economy and occasionally overshooting into recession. Often several factors combine. Whatever the trigger, the common thread is a sudden drop in demand or confidence that feeds on itself.",
          "Governments and central banks fight recessions with the tools you have learned. The Fed cuts interest rates and can use quantitative easing to make borrowing cheap and encourage spending (monetary policy). Congress and the President can cut taxes, boost spending, or send direct payments to put money in people's hands (fiscal policy). In 2020, both were used at massive scale - trillions in stimulus plus near-zero rates - which helped produce one of the shortest recessions on record, lasting just two months. These interventions aim to break the downward spiral and restart growth, though they can add to government debt.",
          "For individuals, recessions carry practical lessons. Job losses cluster in downturns, so keeping an emergency fund of several months' expenses provides a cushion. Recessions are historically bad times to panic-sell investments: markets have always eventually recovered and gone on to new highs, so selling in a crash often locks in losses right before the rebound. For those with steady income and cash, downturns can even offer bargains, as quality stocks and homes go on sale. Understanding that recessions are temporary and recurring turns fear into preparation."
        ],
        bullets: [
          "Triggers include bursting bubbles, external shocks, and aggressive rate hikes.",
          "The Fed fights recessions by cutting rates and easing (monetary policy).",
          "Congress fights them with tax cuts, spending, and payments (fiscal policy).",
          "The 2020 recession lasted just two months after massive stimulus.",
          "An emergency fund and not panic-selling help individuals survive downturns."
        ],
        realWorldExample: "The 2020 recession was the shortest on record - just two months - because the Fed slashed rates to zero and Congress passed trillions in stimulus almost immediately. It showed how forceful, coordinated policy can shorten a downturn dramatically."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "indicators6-mc1",
            question: "What is the common rule-of-thumb definition of a recession?",
            options: [
              "Two straight quarters of falling GDP",
              "One single month of gently rising consumer prices",
              "Any single-day drop in the broad stock market",
              "A full year of steadily rising employment"
            ],
            correctAnswer: 0,
            explanation: "The popular rule is two straight quarters of shrinking real GDP, though NBER officially weighs many measures beyond just GDP."
          },
          {
            id: "indicators6-mc2",
            question: "How often have U.S. recessions occurred since World War II?",
            options: [
              "Roughly once every six years",
              "Every single year without any exceptions at all",
              "Only one single time in the whole period",
              "Never once during the entire era"
            ],
            correctAnswer: 0,
            explanation: "The U.S. has had about a dozen recessions since WWII, averaging roughly one every six years, making them a normal part of the business cycle."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Crash and the Panicked Investor",
        narrative: "A recession hits and the stock market falls 30%. Sam, who has a steady job and a solid emergency fund, feels terrified watching the portfolio drop and is tempted to sell everything to 'stop the bleeding.' A calmer friend urges Sam to think about the long history of recessions first.",
        details: [
          "Markets have always eventually recovered and reached new highs after crashes.",
          "Selling in a crash often locks in losses right before the rebound.",
          "Sam's steady job and emergency fund mean the money is not needed now.",
          "Recessions are temporary and recurring, not permanent breakdowns."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "indicators6-aq1",
          question: "What is the wisest move for Sam during the crash?",
          options: [
            "Sell absolutely everything immediately to stop the losses",
            "Stay invested, since markets historically recover",
            "Borrow money to bet heavily against the market",
            "Spend the whole emergency fund on stocks today"
          ],
          correctAnswer: 1,
          explanation: "With a steady job and emergency fund, Sam does not need the money now. Panic-selling locks in losses, while markets have always eventually rebounded to new highs."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A recession is a significant, widespread decline in activity over months.",
          "The rule of thumb is two quarters of falling real GDP; NBER weighs more.",
          "Recessions recur about every six years and are normal, not system failures.",
          "The Fed and Congress fight them with monetary and fiscal policy.",
          "Emergency funds and not panic-selling help individuals endure downturns."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "indicators6-mastery1",
            question: "Which body officially dates U.S. recessions?",
            options: [
              "The NBER",
              "The New York Stock Exchange",
              "The Supreme Court",
              "The Census Bureau"
            ],
            correctAnswer: 0,
            explanation: "The National Bureau of Economic Research (NBER) declares recessions using GDP, jobs, incomes, and more, often confirming them in hindsight."
          },
          {
            id: "indicators6-mastery2",
            question: "How long did the Great Recession of 2007-2009 last?",
            options: [
              "About 18 months",
              "About 2 months",
              "About 5 years",
              "About one week"
            ],
            correctAnswer: 0,
            explanation: "It lasted 18 months, the longest downturn since the Great Depression, with unemployment doubling to 10% and millions losing homes."
          },
          {
            id: "indicators6-mastery3",
            question: "Which is a common trigger of recessions?",
            options: [
              "A bursting asset price bubble",
              "Steadily rising consumer confidence and optimism",
              "Falling unemployment across the whole country",
              "Steady, low, and predictable inflation"
            ],
            correctAnswer: 0,
            explanation: "Bursting bubbles like the 2008 housing crash drag spending down; other triggers include external shocks and aggressive rate hikes."
          },
          {
            id: "indicators6-mastery4",
            question: "Why was the 2020 recession so short?",
            options: [
              "Massive stimulus and near-zero rates arrived fast",
              "No one really noticed the recession happening",
              "Recessions always last for exactly two months",
              "The entire stock market was temporarily banned"
            ],
            correctAnswer: 0,
            explanation: "Trillions in fiscal stimulus plus the Fed cutting rates to zero broke the downturn quickly, making it the shortest recession on record."
          },
          {
            id: "indicators6-mastery5",
            question: "Why is panic-selling in a crash usually a mistake?",
            options: [
              "Markets have historically recovered fully",
              "Selling in a panic always avoids paying taxes",
              "Stocks simply never come back after any crash",
              "It reliably guarantees you much higher returns"
            ],
            correctAnswer: 0,
            explanation: "Selling in a crash locks in losses right before the rebound; markets have always eventually recovered and reached new highs."
          },
          {
            id: "indicators6-mastery6",
            question: "Why is an emergency fund valuable in a recession?",
            options: [
              "Job losses cluster in downturns, so cushions help",
              "It directly forces the Federal Reserve to cut its rates",
              "It completely eliminates all market and investment risk",
              "It fully guarantees that you will keep your job"
            ],
            correctAnswer: 0,
            explanation: "Because layoffs rise in recessions, several months of expenses saved provides a cushion so you avoid selling investments at the worst time."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // indicators-7: Leading vs Lagging
  // ─────────────────────────────────────────────
  {
    lessonId: "indicators-7",
    sections: [
      {
        type: "concept",
        title: "Indicators That Predict Versus Confirm",
        paragraphs: [
          "Economic indicators come in three timing types, and knowing the difference is key to reading the economy. 'Leading' indicators change before the economy does, offering a preview of where things are heading. 'Lagging' indicators change after the economy has already turned, confirming what happened. 'Coincident' indicators move roughly in step with the economy, showing its current state. Think of driving: leading indicators are the road ahead through the windshield, coincident indicators are your current speedometer, and lagging indicators are the view in the rearview mirror. All three matter, but for different purposes.",
          "Leading indicators are the crystal balls economists rely on to anticipate turns. Classic examples include building permits (builders betting on the future), stock market prices (investors pricing in expectations), new orders for manufactured goods, consumer confidence, and the shape of the yield curve. The Conference Board bundles ten such measures into the Leading Economic Index (LEI). When the LEI falls for several months in a row, it has often warned of an approaching recession. No single leading indicator is perfect - each gives false signals sometimes - but together they sharpen the forecast.",
          "Lagging indicators confirm trends after the fact, which makes them reliable but late. The unemployment rate is the classic example: businesses are slow to fire and slow to hire, so joblessness keeps rising after a recession ends and keeps falling after a recovery is underway. Other lagging indicators include the average duration of unemployment, corporate profits reported for past quarters, and the inflation rate, which tends to peak after the economy has already turned. Because they confirm rather than predict, lagging indicators help verify that a leading signal was real."
        ],
        bullets: [
          "Leading indicators change before the economy, previewing its direction.",
          "Coincident indicators move in step, showing the current state.",
          "Lagging indicators change after the economy turns, confirming trends.",
          "Building permits, stock prices, and the yield curve are leading indicators.",
          "Unemployment and inflation are classic lagging indicators."
        ],
        realWorldExample: "The Conference Board's Leading Economic Index combines ten forward-looking measures. When it fell for many months through 2022 and into 2023, it flashed recession warnings - a reminder that leading indicators try to see around the corner, even if imperfectly."
      },
      {
        type: "concept",
        title: "Using the Full Dashboard Wisely",
        paragraphs: [
          "No single indicator tells the whole story, which is why economists watch a dashboard of many. Leading indicators can give false alarms - the yield curve or stock market may signal a recession that never fully arrives. Lagging indicators are reliable but arrive too late to act on. Coincident indicators like GDP and industrial production confirm the present but are revised as better data comes in. By combining all three types, forecasters build a fuller, more balanced picture than any one number could provide, weighing early warnings against confirming evidence.",
          "The famous saying that 'the stock market has predicted nine of the last five recessions' captures a real danger: leading indicators produce false positives. Because they reflect expectations and fear, they sometimes signal trouble that fades. This is why smart analysts look for confirmation across multiple indicators before drawing conclusions. If leading indicators weaken, coincident data starts to soften, and then lagging indicators like unemployment finally turn, the case for a genuine downturn becomes strong. One flashing light is a caution; several together are a real warning.",
          "For investors and citizens, understanding indicator timing prevents costly mistakes. Waiting for lagging indicators like rising unemployment to confirm a recession often means reacting after markets have already fallen and are poised to recover. Meanwhile, overreacting to every leading-indicator wobble leads to constant false alarms and needless panic. It also helps to remember that indicators interact: a single leading signal like an inverted yield curve carries far more weight when consumer confidence is also sliding and manufacturing orders are shrinking at the same time. The practical wisdom is to understand the whole cycle, stay diversified, and avoid making drastic moves based on a single data point. Reading indicators well is about seeing the balance of evidence, not chasing any one number up or down."
        ],
        bullets: [
          "No single indicator tells the whole story; economists watch a dashboard.",
          "Leading indicators can give false alarms that later fade.",
          "'The market predicted nine of the last five recessions' warns of false positives.",
          "Confirmation across multiple indicators makes a signal trustworthy.",
          "Reacting only to lagging data often means acting too late to help."
        ],
        realWorldExample: "In 2022 and 2023, many leading indicators screamed recession, yet unemployment stayed near record lows and no downturn arrived on schedule. It was a real-world lesson that leading indicators forecast, they do not guarantee, and confirmation matters."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "indicators7-mc1",
            question: "What is a 'leading' economic indicator?",
            options: [
              "One that changes before the economy does",
              "One that changes only after the economy has turned",
              "One that just measures past inflation figures",
              "One that essentially never changes at all"
            ],
            correctAnswer: 0,
            explanation: "Leading indicators shift ahead of the economy, like building permits or the yield curve, offering an early preview of where things are heading."
          },
          {
            id: "indicators7-mc2",
            question: "Which is a classic 'lagging' indicator?",
            options: [
              "The unemployment rate",
              "New residential building permits",
              "Broad stock market prices",
              "Monthly consumer confidence surveys"
            ],
            correctAnswer: 0,
            explanation: "Unemployment changes after the economy turns because firms are slow to fire and hire, making it a classic lagging indicator that confirms trends."
          }
        ]
      },
      {
        type: "scenario",
        title: "Mixed Signals",
        narrative: "An analyst, Rosa, reviews the data. Leading indicators like building permits and the yield curve are flashing warnings of a possible recession. But unemployment, a lagging indicator, is still near record lows. Her manager asks how she should interpret these seemingly contradictory signals.",
        details: [
          "Leading indicators change first, so they can warn before a downturn.",
          "Unemployment lags, so it stays low until after the economy turns.",
          "The mixed picture is normal early in a potential slowdown.",
          "Confirmation across more indicators is needed before concluding."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "indicators7-aq1",
          question: "How should Rosa interpret weak leading indicators but low unemployment?",
          options: [
            "Unemployment alone proves no recession is even possible",
            "Leading signals warn early; lagging data confirms",
            "The economic data must simply be completely wrong",
            "A recession is now certain to start tomorrow"
          ],
          correctAnswer: 1,
          explanation: "Leading indicators turn first while unemployment lags, so this mix is normal. She should await confirmation across more indicators before concluding."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Leading indicators preview the economy; lagging ones confirm it.",
          "Coincident indicators show the economy's current state.",
          "Building permits, stock prices, and the yield curve lead.",
          "Unemployment and inflation lag, confirming trends after the turn.",
          "Watch a dashboard and seek confirmation, not any single number."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "indicators7-mastery1",
            question: "What do 'coincident' indicators do?",
            options: [
              "Move roughly in step with the economy",
              "Always change a full year in advance",
              "Only ever reflect the distant, faraway past",
              "Reliably predict the entire next decade ahead"
            ],
            correctAnswer: 0,
            explanation: "Coincident indicators like GDP and industrial production move in step with the economy, showing its current state rather than predicting or confirming."
          },
          {
            id: "indicators7-mastery2",
            question: "What does the Conference Board's LEI combine?",
            options: [
              "Ten forward-looking leading measures",
              "Only the unemployment rate",
              "Past corporate profits alone",
              "Every stock in the market"
            ],
            correctAnswer: 0,
            explanation: "The Leading Economic Index bundles ten leading measures; a sustained decline has often warned of an approaching recession."
          },
          {
            id: "indicators7-mastery3",
            question: "What does 'nine of the last five recessions' illustrate?",
            options: [
              "Leading indicators produce false alarms",
              "The stock market is essentially always right",
              "Recessions genuinely never happen at all",
              "Lagging data reliably predicts the future"
            ],
            correctAnswer: 0,
            explanation: "The joke highlights that leading indicators, driven by expectations and fear, sometimes signal downturns that never fully arrive."
          },
          {
            id: "indicators7-mastery4",
            question: "Why is unemployment a lagging indicator?",
            options: [
              "Firms are slow to fire and hire",
              "It is always measured before any jobs change",
              "It reliably predicts coming recessions early",
              "It essentially never reflects the real economy"
            ],
            correctAnswer: 0,
            explanation: "Because businesses delay layoffs and hiring, joblessness keeps rising after a recession ends and falling after recovery begins."
          },
          {
            id: "indicators7-mastery5",
            question: "What makes a recession signal trustworthy?",
            options: [
              "Confirmation across multiple indicators",
              "A single flashing leading indicator",
              "Only one day of market losses",
              "Ignoring lagging data entirely"
            ],
            correctAnswer: 0,
            explanation: "One indicator can mislead, but when leading, coincident, and lagging measures all point the same way, the case for a downturn grows strong."
          },
          {
            id: "indicators7-mastery6",
            question: "Why is waiting for lagging indicators risky for investors?",
            options: [
              "Markets may have already fallen, then recovered",
              "Lagging economic data is essentially always totally fake",
              "It reliably guarantees much higher future taxes",
              "Lagging indicators simply never change at all"
            ],
            correctAnswer: 0,
            explanation: "By the time lagging data like unemployment confirms a recession, markets have often already dropped and may be poised to rebound, so reacting then is late."
          }
        ]
      }
    ]
  },
]
