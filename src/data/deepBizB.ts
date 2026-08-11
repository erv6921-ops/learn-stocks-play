import { StructuredLessonContent } from "@/types"

// Wave-2 deepened content (Mortgages-depth rebuild) for: consumer-behavior + marketing-mix + pestel
export const deepBizB: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // cb-1: What Is Consumer Behavior
  // ─────────────────────────────────────────────
  {
    lessonId: "cb-1",
    sections: [
      {
        type: "concept",
        title: "The Study of Why People Buy",
        paragraphs: [
          "Consumer behavior is the study of how people choose, buy, use, and discard products. Every time a teen picks Spotify over Apple Music, or grabs a $4 iced coffee instead of making one at home, a chain of thoughts and feelings drove that choice. Businesses obsess over this because a small shift in behavior moves millions of dollars. When Chipotle noticed customers wanted to see their food built in front of them, that single insight shaped its whole store layout. Understanding the buyer is not guesswork - it is a discipline built on data, psychology, and careful observation.",
          "A key idea is that people rarely buy the obvious thing. Someone buying a $150 pair of Nikes is not just buying foam and rubber; they are buying status, identity, and a feeling of belonging. Marketers call this the difference between the functional need (shoes that fit) and the emotional need (looking cool to friends). A business that only sees the functional side sells a commodity and competes on price. A business that understands the emotional side can charge far more. That is why a plain white t-shirt costs $6 at Walmart but $60 with the right logo.",
          "Consumer behavior also studies what happens after the sale. Did the buyer feel satisfied or regretful? Will they buy again, or warn friends away? A customer who loves a product might tell five people; an angry one might tell fifteen and post a one-star review. Because keeping a customer is roughly five times cheaper than winning a new one, smart companies track satisfaction closely. The whole field connects one question to a business's survival: if you do not understand why people buy, you are guessing with your money."
        ],
        bullets: [
          "Consumer behavior studies how people choose, buy, use, and discard products.",
          "Buyers meet both functional needs and emotional needs; the emotional side often sets the price.",
          "Understanding buyers turns guessing into a data-driven discipline businesses depend on.",
          "Post-purchase feelings drive repeat buying, reviews, and word of mouth.",
          "Keeping an existing customer costs far less than winning a brand-new one."
        ],
        realWorldExample: "When Starbucks learned customers valued the 'third place' - a spot between home and work to relax - it added comfy chairs, free Wi-Fi, and wrote your name on the cup. None of that changes the coffee, yet it lets Starbucks charge $5 for a drink that costs pennies to make. That is consumer behavior turned into profit."
      },
      {
        type: "concept",
        title: "Needs, Wants, and the Value Exchange",
        paragraphs: [
          "Economists separate needs from wants. A need is something essential - food, shelter, safety. A want is a specific, shaped desire for how to meet that need. You need to eat; you want Chick-fil-A. Businesses spend enormous effort turning broad needs into specific wants for their brand, because a want points straight at their product. Advertising, packaging, and social media all work to make one option feel like the obvious answer. This is why you can be hungry with a full fridge yet still crave takeout - the want was manufactured on purpose.",
          "Every purchase is a value exchange: the buyer gives up money (and time and effort) and expects to receive something worth more to them than the price. If a $12 movie ticket delivers two hours of joy the buyer values at $20, they feel they won. If the film is terrible, they feel cheated even though the price never changed. This is why perceived value, not just actual cost, decides whether people buy. A business that raises perceived value - through branding, service, or experience - can charge more without spending more to make the product.",
          "Consumer behavior sits at the crossroads of psychology, economics, and culture. Psychology explains the individual mind - motivation, emotion, habit. Economics explains trade-offs and budgets. Culture explains why the same product sells in one country and flops in another. A soft drink that dominates America might fail in a market that prefers tea. Great marketers read all three lenses at once, which is why the field is both an art and a science - and why it is the foundation under every other marketing decision."
        ],
        bullets: [
          "A need is essential; a want is a specific, shaped desire for how to meet it.",
          "Marketing turns broad needs into specific wants aimed at one brand.",
          "Every purchase is a value exchange: money and effort traded for perceived value.",
          "Perceived value, not just cost, decides whether and at what price people buy.",
          "The field blends psychology, economics, and culture into one view of the buyer."
        ],
        realWorldExample: "Bottled water is the classic example. Everyone needs water, and tap water is nearly free. Yet Fiji and Evian sell the exact same need for $2 to $4 a bottle by adding perceived value through branding, design, and a story about purity. The need never changed - the want and the perceived value were built by marketers."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb1-mc1",
            question: "What is the difference between a need and a want?",
            options: [
              "A need is cheaper; a want is always expensive which the city council reviews every autumn",
              "A need is essential; a want is a specific desire",
              "A need is emotional; a want is purely logical",
              "A need is legal; a want is against the rules"
            ],
            correctAnswer: 1,
            explanation: "A need is something essential like food or shelter, while a want is a specific, shaped desire for how to meet that need - such as needing to eat but wanting Chick-fil-A."
          },
          {
            id: "cb1-mc2",
            question: "Why can a plain t-shirt sell for $60 instead of $6?",
            options: [
              "The fabric costs ten times as much to make",
              "Branding adds emotional value buyers pay for",
              "Laws require designer clothes to cost more",
              "Stores are forced to raise every price equally"
            ],
            correctAnswer: 1,
            explanation: "The higher price comes from emotional value - status, identity, belonging - added by branding, not from the cost of materials. Buyers pay for how the product makes them feel."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jordan's Sneaker Decision",
        narrative: "Jordan, 16, has $150 saved. He could buy three solid pairs of $50 running shoes or one pair of $150 branded sneakers everyone at school is wearing. His feet are already covered by an old pair that works fine. He keeps refreshing the sneaker's page, imagining wearing them to school on Monday.",
        details: [
          "Jordan's functional need for shoes is already met, so this purchase is driven by wants, not needs.",
          "The emotional pull - status and belonging at school - is doing more work than the shoe's features.",
          "Marketers built this want through athletes, social media hype, and limited 'drops' that feel exclusive.",
          "The perceived value (looking cool, fitting in) is what makes $150 feel worth it to Jordan, not the rubber and foam."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb1-aq1",
          question: "What is the MAIN force driving Jordan toward the $150 sneakers?",
          options: [
            "A functional need for shoes he does not have",
            "An emotional want for status and belonging",
            "A legal rule requiring branded footwear",
            "The fabric costing more than other shoes"
          ],
          correctAnswer: 1,
          explanation: "Jordan's feet are already covered, so his functional need is met. The real driver is the emotional want - status and fitting in - that marketers built around the brand."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Consumer behavior studies how and why people choose, buy, use, and discard products.",
          "Buyers meet functional needs and emotional needs; the emotional side often sets the price.",
          "Marketing turns broad needs into specific wants aimed at one brand.",
          "Every purchase is a value exchange driven by perceived value, not just cost.",
          "The field blends psychology, economics, and culture, making it marketing's foundation."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "cb1-mastery1",
            question: "Consumer behavior is best defined as the study of…",
            options: [
              "How factories lower production costs as older economists once firmly believed",
              "How people choose, buy, use, and discard products",
              "How banks set their interest rates which shipping contracts always specify",
              "How governments write new tax laws"
            ],
            correctAnswer: 1,
            explanation: "Consumer behavior is the study of how people choose, buy, use, and discard products - the whole journey of the buyer, not just the moment of sale."
          },
          {
            id: "cb1-mastery2",
            question: "A business that understands only the functional need for a product tends to…",
            options: [
              "Charge a premium for strong branding",
              "Compete mainly on low price",
              "Build deep emotional loyalty easily",
              "Avoid all forms of advertising"
            ],
            correctAnswer: 1,
            explanation: "Selling only the functional need turns a product into a commodity, forcing the business to compete on price. Emotional value is what lets a company charge more."
          },
          {
            id: "cb1-mastery3",
            question: "Why do smart companies track post-purchase satisfaction so closely?",
            options: [
              "Laws require a survey after every single sale",
              "Keeping a customer is far cheaper than winning one",
              "Satisfied buyers must legally leave reviews as older economists once firmly believed",
              "It lets them ignore product quality entirely"
            ],
            correctAnswer: 1,
            explanation: "Keeping an existing customer costs roughly five times less than winning a new one, and satisfaction drives repeat buying and word of mouth - so companies watch it closely."
          },
          {
            id: "cb1-mastery4",
            question: "What does 'perceived value' mean in a purchase?",
            options: [
              "The exact cost of the raw materials",
              "The worth the buyer feels they receive",
              "The tax added at the register as older economists once firmly believed",
              "The price the store originally paid"
            ],
            correctAnswer: 1,
            explanation: "Perceived value is how much the buyer feels they get for their money. It can be far higher than the actual cost, which is why branding and experience let firms charge more."
          },
          {
            id: "cb1-mastery5",
            question: "Bottled water sells for $2 despite nearly free tap water because marketers…",
            options: [
              "Changed the chemical makeup of the water",
              "Built perceived value through branding and story",
              "Made tap water illegal to drink as older economists once firmly believed",
              "Lowered the cost of making every bottle"
            ],
            correctAnswer: 1,
            explanation: "The water itself is basically the same. Brands like Fiji and Evian add perceived value through design, purity stories, and branding, letting them charge a premium."
          },
          {
            id: "cb1-mastery6",
            question: "Consumer behavior draws on three main lenses. They are…",
            options: [
              "Accounting, law, and engineering",
              "Psychology, economics, and culture",
              "Physics, biology, and history",
              "Sales, shipping, and storage"
            ],
            correctAnswer: 1,
            explanation: "The field blends psychology (the individual mind), economics (trade-offs and budgets), and culture (why products succeed in some markets and fail in others)."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // cb-2: The Decision-Making Process
  // ─────────────────────────────────────────────
  {
    lessonId: "cb-2",
    sections: [
      {
        type: "concept",
        title: "The Five Stages Every Buyer Walks Through",
        paragraphs: [
          "Marketers map almost every purchase onto five stages. First is need recognition: you notice a gap between where you are and where you want to be. Your phone screen cracks, or a friend shows off new AirPods and suddenly your old earbuds feel shabby. Second is information search: you look for options, reading reviews, asking friends, or scrolling TikTok. Third is evaluation of alternatives, where you compare choices against what matters to you - price, features, brand. These first three stages happen before any money moves, and businesses fight hardest to influence them.",
          "The fourth stage is the purchase decision itself - actually buying. This is not automatic even after evaluation. A buyer can be sold on a $900 laptop and still abandon the cart because shipping felt too high, or a pushy salesperson soured the mood, or a friend said 'wait for the sale.' Tiny friction points kill purchases every day, which is why online stores obsess over one-click checkout and free returns. The gap between deciding to buy and actually paying is where many sales are quietly lost.",
          "The fifth stage is post-purchase behavior: how the buyer feels after. Satisfaction leads to loyalty, repeat buying, and recommendations. Dissatisfaction leads to returns, bad reviews, and 'buyer's remorse' - the nagging worry you made the wrong choice, strongest on expensive purchases. Companies fight remorse with follow-up emails, easy returns, and thank-you notes that reassure the buyer they chose well. The five stages are not always slow and careful; for a pack of gum they blur into a split second. But for a car or laptop, each stage can take weeks."
        ],
        bullets: [
          "Stage 1: need recognition - noticing a gap you want to close.",
          "Stage 2: information search - gathering options from reviews, friends, and social media.",
          "Stage 3: evaluation - comparing choices against price, features, and brand.",
          "Stage 4: purchase decision - actually buying, often lost to small friction points.",
          "Stage 5: post-purchase - satisfaction builds loyalty; regret sparks returns and bad reviews."
        ],
        realWorldExample: "Amazon engineered its whole store around stage four. '1-Click' ordering, saved cards, and Prime's free shipping strip away friction so the gap between deciding and paying nearly vanishes. Amazon even patented one-click checkout because removing that tiny hesitation captures billions in sales that competitors lose at the last second."
      },
      {
        type: "concept",
        title: "Not All Decisions Are Equal",
        paragraphs: [
          "The five stages stretch or shrink depending on how much is at stake. High-involvement decisions - a car, a college, a $1,200 phone - carry high cost and high risk, so buyers research for weeks, compare dozens of options, and agonize before deciding. Low-involvement decisions - gum, a soda, a phone charger - are near-automatic; you barely think. Marketers treat these completely differently. For high-involvement products they provide detailed specs, reviews, and financing. For low-involvement products they focus on being seen and grabbable at the moment of impulse, like candy at the checkout line.",
          "Between these sits habitual buying, where past satisfaction skips most stages. If you always buy the same toothpaste, you do not search or evaluate; you grab it on autopilot. This is gold for brands because a loyal habit blocks competitors from even being considered. It is also why challengers spend heavily on samples and coupons - they must interrupt a habit to get a chance. Breaking someone's autopilot is far harder than winning a first-time buyer who is still comparing options.",
          "Emotion and shortcuts shape decisions as much as logic. Buyers use 'heuristics' - mental rules of thumb - to save effort: 'expensive means good quality,' 'the brand I know is safer,' 'more reviews means more trustworthy.' These shortcuts are usually helpful but easily exploited. A higher price tag can make a product feel better even when it is not; a familiar logo can win over a superior unknown brand. Understanding where buyers rely on shortcuts lets businesses guide the decision - and lets smart shoppers catch themselves being nudged."
        ],
        bullets: [
          "High-involvement buys (cars, phones) trigger long, careful decision journeys.",
          "Low-involvement buys (gum, soda) are near-automatic and driven by availability.",
          "Habitual buying skips most stages, protecting loyal brands from competitors.",
          "Buyers use heuristics - shortcuts like 'expensive means good' - to decide quickly.",
          "Shortcuts save effort but can be exploited by clever pricing and branding."
        ],
        realWorldExample: "Car dealers know a vehicle is a high-involvement purchase, so they load the process with test drives, spec sheets, financing options, and warranties to ease the buyer's fear of a costly mistake. A candy brand does the opposite - it just needs to sit at the register so you grab it on impulse in two seconds."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb2-mc1",
            question: "Which stage comes right after 'information search'?",
            options: [
              "Need recognition of a new gap",
              "Evaluation of the alternatives",
              "Post-purchase satisfaction",
              "The final purchase decision"
            ],
            correctAnswer: 1,
            explanation: "The order is need recognition, information search, evaluation of alternatives, purchase decision, then post-purchase behavior. Evaluation follows the search stage."
          },
          {
            id: "cb2-mc2",
            question: "What is 'buyer's remorse'?",
            options: [
              "Excitement felt right before buying which the city council reviews every autumn",
              "Regret felt after making a purchase",
              "A discount offered to loyal buyers",
              "The tax added at the register"
            ],
            correctAnswer: 1,
            explanation: "Buyer's remorse is the regret or worry a buyer feels after purchasing, strongest on expensive items. Companies fight it with follow-ups, easy returns, and reassurance."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Buys Her First Laptop",
        narrative: "Priya needs a laptop for college. She spends two weeks reading reviews, watching YouTube comparisons, and asking friends. She narrows it to three models, then picks a $900 one - but hesitates at checkout when she sees $40 shipping. After buying, she keeps checking if a better deal existed, feeling a twinge of doubt.",
        details: [
          "Her need recognition began when college required a reliable laptop she did not own.",
          "Two weeks of reviews and comparisons is a long information search and evaluation - a high-involvement purchase.",
          "The $40 shipping is friction at the purchase-decision stage that nearly stopped the sale.",
          "Her doubt afterward is buyer's remorse; a thank-you email and easy return policy would reassure her."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb2-aq1",
          question: "The $40 shipping fee that nearly stopped Priya's purchase is an example of…",
          options: [
            "Need recognition starting the journey",
            "Friction at the purchase-decision stage",
            "Habitual buying on autopilot which the city council reviews every autumn",
            "Post-purchase remorse after paying"
          ],
          correctAnswer: 1,
          explanation: "The shipping fee appears at the moment of buying and nearly blocks it - that is friction at the purchase-decision stage, where many sales are quietly lost."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Purchases move through five stages: need recognition, search, evaluation, purchase, and post-purchase.",
          "Small friction at the purchase stage kills many sales, so firms remove it aggressively.",
          "Post-purchase satisfaction builds loyalty, while remorse triggers returns and bad reviews.",
          "High-involvement buys stretch the stages; low-involvement buys shrink them to seconds.",
          "Buyers rely on heuristics - shortcuts like 'expensive means good' - that firms can guide."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "cb2-mastery1",
            question: "Which is the correct order of the five decision stages?",
            options: [
              "Search, need, purchase, evaluation, post-purchase as older economists once firmly believed",
              "Need recognition, search, evaluation, purchase, post-purchase",
              "Purchase, search, need, post-purchase, evaluation",
              "Evaluation, purchase, need, search, post-purchase"
            ],
            correctAnswer: 1,
            explanation: "The stages run: need recognition, information search, evaluation of alternatives, purchase decision, and post-purchase behavior."
          },
          {
            id: "cb2-mastery2",
            question: "Why do online stores obsess over one-click checkout?",
            options: [
              "The law demands fast checkout screens as older economists once firmly believed",
              "Small friction at purchase loses many sales",
              "It raises the product's material cost",
              "It replaces the need for any advertising"
            ],
            correctAnswer: 1,
            explanation: "Tiny friction - extra clicks, high shipping, re-entering a card - kills sales at the purchase stage. Removing it captures buyers who would otherwise abandon the cart."
          },
          {
            id: "cb2-mastery3",
            question: "A car is a 'high-involvement' purchase mainly because…",
            options: [
              "It is illegal to buy one quickly",
              "Its high cost and risk demand careful research",
              "Dealers refuse to show any specifications as older economists once firmly believed",
              "Buyers never compare it to alternatives"
            ],
            correctAnswer: 1,
            explanation: "High cost and high risk push buyers to research for weeks and compare many options, stretching every decision stage - the mark of a high-involvement purchase."
          },
          {
            id: "cb2-mastery4",
            question: "Habitual buying is valuable to a brand because it…",
            options: [
              "Forces the brand to keep lowering prices",
              "Skips stages and blocks rival consideration",
              "Requires constant coupons to survive",
              "Guarantees the product never sells out"
            ],
            correctAnswer: 1,
            explanation: "When buying is a habit, the customer skips searching and evaluating, grabbing your brand on autopilot. That autopilot keeps competitors from even being considered."
          },
          {
            id: "cb2-mastery5",
            question: "A heuristic like 'expensive means good quality' is a…",
            options: [
              "Legal rule stores must post as older economists once firmly believed",
              "Mental shortcut buyers use to decide",
              "Tax applied to luxury goods",
              "Guarantee that pricey items are better"
            ],
            correctAnswer: 1,
            explanation: "Heuristics are mental rules of thumb that save effort. They are usually helpful but can be exploited - a high price can make something feel better than it is."
          },
          {
            id: "cb2-mastery6",
            question: "A thank-you email with an easy return policy mainly helps by…",
            options: [
              "Raising the item's shelf price",
              "Reducing buyer's remorse after purchase",
              "Skipping the evaluation stage entirely",
              "Removing the need for a product at all"
            ],
            correctAnswer: 1,
            explanation: "Reassurance and easy returns ease post-purchase doubt, lowering buyer's remorse so the customer feels confident and stays loyal instead of returning the item."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // cb-3: Psychological Factors
  // ─────────────────────────────────────────────
  {
    lessonId: "cb-3",
    sections: [
      {
        type: "concept",
        title: "Motivation and Perception",
        paragraphs: [
          "Motivation is the inner drive that pushes someone to act. Psychologist Abraham Maslow arranged human motives into a hierarchy: basic needs like food and safety at the bottom, then belonging, esteem, and self-actualization on top. People generally satisfy lower needs before chasing higher ones. Marketers aim products at different levels: a security system sells safety, a fashion brand sells esteem and belonging, a meditation app sells self-actualization. Knowing which need a product satisfies tells you exactly what to emphasize in every ad, from fear of danger to the joy of fitting in.",
          "Perception is how people interpret what their senses take in - and two people can perceive the same thing completely differently. A $200 price tag reads as 'ripoff' to one shopper and 'high quality' to another. Because buyers are flooded with thousands of ads daily, they use selective attention (noticing only what feels relevant) and selective retention (remembering what fits their beliefs). This is why the same commercial lands with some viewers and bounces off others. Marketers shape perception through color, wording, and placement so their message survives the filter and sticks.",
          "Perception explains why packaging and presentation matter so much. The same yogurt in a sleek glass jar feels more premium than in a plastic cup, even if the contents are identical. A car described as having 'only 3% failures' feels safer than one with '97% reliability,' though the numbers are the same - this is called framing. Because buyers act on their perception rather than raw facts, businesses invest heavily in shaping how a product is seen. Perception, not reality, is what moves the purchase."
        ],
        bullets: [
          "Motivation is the inner drive to act; Maslow ranks needs from basic to self-actualization.",
          "Products can target any level - safety, belonging, esteem, or self-fulfillment.",
          "Perception is how buyers interpret senses; two people can read the same thing oppositely.",
          "Selective attention and retention filter out most ads, so messages must break through.",
          "Framing and packaging shape perception, and buyers act on perception, not raw facts."
        ],
        realWorldExample: "De Beers famously turned a diamond into a symbol of love and esteem with the slogan 'A Diamond Is Forever.' Diamonds are not rare enough to justify their price, but the campaign reshaped perception so a ring became proof of commitment. It aimed straight at Maslow's esteem and belonging needs - and created an entire multibillion-dollar expectation."
      },
      {
        type: "concept",
        title: "Learning, Beliefs, and Attitudes",
        paragraphs: [
          "People learn to prefer brands through repeated experience and association. If a soda tastes great and is paired with fun ads, the buyer 'learns' to feel good about it - a process marketers reinforce with rewards like points, samples, and consistent quality. This learned response is why a familiar jingle or logo can trigger a craving. Conditioning also works in reverse: one bad experience, like food poisoning from a restaurant, can create a lasting aversion no ad can undo. Learning makes brand reputation slow to build and easy to damage.",
          "Beliefs are the specific ideas a person holds about a brand - 'Toyota is reliable,' 'that store overcharges.' Attitudes are broader feelings, positive or negative, that are hard to change once set. A person with a negative attitude toward a brand often will not even consider it, filtering it out before evaluation. This is why companies guard their reputation fiercely: a strong positive attitude wins buyers automatically, while a negative one blocks sales no discount can fix. Changing an entrenched attitude is one of the hardest and most expensive tasks in marketing.",
          "These forces combine into powerful biases businesses exploit or must overcome. Social proof - 'everyone is buying this' - eases doubt because people trust the crowd. Scarcity - 'only 3 left' - triggers urgency and fear of missing out. Anchoring makes a $50 item feel cheap next to a $200 one placed beside it. Loss aversion means people fear losing $10 more than they enjoy gaining $10, which is why 'don't miss out' outperforms 'come save.' Understanding these psychological levers lets marketers guide choices - and helps sharp buyers recognize when they are being nudged."
        ],
        bullets: [
          "Learning builds brand preference through repeated experience and reward.",
          "One bad experience can create a lasting aversion no advertising can undo.",
          "Beliefs are specific ideas; attitudes are broad feelings that resist change.",
          "A negative attitude blocks a brand before it is even considered.",
          "Biases like social proof, scarcity, anchoring, and loss aversion steer decisions."
        ],
        realWorldExample: "Booking sites like Expedia stack psychological levers on one screen: 'Only 2 rooms left!' (scarcity), '18 people are viewing this' (social proof), and a crossed-out higher price beside the deal (anchoring). None of it changes the room, but together they create urgency that pushes hesitant buyers to book right now instead of shopping around."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb3-mc1",
            question: "According to Maslow, which need is satisfied first?",
            options: [
              "Self-actualization at the very top which the city council reviews every autumn",
              "Basic needs like food and safety",
              "Esteem from the approval of others",
              "Belonging within a social group"
            ],
            correctAnswer: 1,
            explanation: "Maslow's hierarchy has basic needs like food and safety at the bottom, and people generally satisfy those before pursuing belonging, esteem, or self-actualization."
          },
          {
            id: "cb3-mc2",
            question: "The message 'Only 3 left in stock!' relies on which bias?",
            options: [
              "Anchoring against a higher price",
              "Scarcity creating urgency to buy",
              "Social proof from the crowd",
              "Learned preference over time which the city council reviews every autumn"
            ],
            correctAnswer: 1,
            explanation: "Warning that few items remain triggers scarcity - a fear of missing out that pushes buyers to act now rather than wait and risk losing the chance."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus and the Hotel Booking",
        narrative: "Marcus is booking a hotel for a trip. The page shows '$180 (was $260),' a banner reading 'Only 2 rooms left,' and a note that '24 people are viewing this hotel now.' He had planned to compare five sites but feels a rush of pressure and books immediately, worried the deal will vanish.",
        details: [
          "The crossed-out $260 is anchoring, making $180 feel like a steal by comparison.",
          "'Only 2 rooms left' uses scarcity to create urgency and fear of missing out.",
          "'24 people viewing' is social proof - the crowd's interest reassures him it is a good choice.",
          "Loss aversion amplifies it all: Marcus fears losing the deal more than he values shopping around."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb3-aq1",
          question: "The crossed-out '$260' beside the '$180' price is an example of…",
          options: [
            "Scarcity limiting available supply which the city council reviews every autumn",
            "Anchoring to make $180 feel cheap",
            "Social proof from other viewers",
            "A learned response to a jingle"
          ],
          correctAnswer: 1,
          explanation: "Placing a higher $260 next to the $180 price anchors the buyer's mind high, making the actual price feel like a bargain by comparison."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Motivation drives action; Maslow ranks needs from basic survival to self-actualization.",
          "Perception is how buyers interpret senses, and they act on perception, not raw facts.",
          "Learning builds brand preference, but one bad experience can undo it for good.",
          "Attitudes are broad feelings that resist change and can block a brand before evaluation.",
          "Biases - scarcity, social proof, anchoring, loss aversion - steer real purchase decisions."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "cb3-mastery1",
            question: "A meditation app that sells 'becoming your best self' targets which Maslow level?",
            options: [
              "Basic survival needs",
              "Self-actualization at the top",
              "Physical safety needs",
              "The need for food and water"
            ],
            correctAnswer: 1,
            explanation: "Growth, purpose, and reaching your potential sit at the top of Maslow's hierarchy - self-actualization - which is exactly what a meditation app markets."
          },
          {
            id: "cb3-mastery2",
            question: "Selective attention means buyers…",
            options: [
              "Remember every ad they ever see",
              "Notice only ads that feel relevant",
              "Are forced to watch all commercials",
              "Buy the first product advertised as older economists once firmly believed"
            ],
            correctAnswer: 1,
            explanation: "Flooded with ads, buyers use selective attention to notice only what seems relevant to them, filtering out the rest - so messages must break through the filter."
          },
          {
            id: "cb3-mastery3",
            question: "Framing a car as having 'only 3% failures' instead of '97% reliability' works because…",
            options: [
              "The two numbers describe different cars",
              "How facts are presented shifts perception",
              "Failures are always worse than reliability",
              "It changes the car's actual quality"
            ],
            correctAnswer: 1,
            explanation: "The numbers are identical, but framing changes how buyers perceive them. People act on perception, so wording alone can make the same fact feel better or worse."
          },
          {
            id: "cb3-mastery4",
            question: "Why is a deeply negative attitude toward a brand so damaging?",
            options: [
              "It legally bans the brand from selling",
              "Buyers filter the brand out before evaluating",
              "It forces the brand to lower quality",
              "It doubles the brand's advertising costs as older economists once firmly believed"
            ],
            correctAnswer: 1,
            explanation: "A negative attitude makes buyers exclude a brand before they even consider it, so no discount reaches them. Reversing an entrenched attitude is costly and slow."
          },
          {
            id: "cb3-mastery5",
            question: "Loss aversion explains why 'Don't miss out' often beats 'Come save' because people…",
            options: [
              "Enjoy gains far more than they fear losses",
              "Fear a loss more than they value a gain",
              "Ignore all emotional appeals in ads which shipping contracts always specify",
              "Always choose the cheapest option as older economists once firmly believed"
            ],
            correctAnswer: 1,
            explanation: "Loss aversion means the pain of losing outweighs the pleasure of an equal gain, so framing an offer as avoiding a loss motivates more than framing it as a gain."
          },
          {
            id: "cb3-mastery6",
            question: "One case of food poisoning creating a lasting refusal to return shows that…",
            options: [
              "Learning only builds positive brand feelings as older economists once firmly believed",
              "A single bad experience can undo brand loyalty",
              "Attitudes never change once they form",
              "Advertising can always erase bad memories"
            ],
            correctAnswer: 1,
            explanation: "Conditioning works both ways: a strong negative experience can create a lasting aversion that no advertising can undo, making reputations easy to damage."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // cb-4: Social & Cultural Influences
  // ─────────────────────────────────────────────
  {
    lessonId: "cb-4",
    sections: [
      {
        type: "concept",
        title: "The People Around Us Shape What We Buy",
        paragraphs: [
          "No one buys in a vacuum. Family is the first and strongest influence: the brands your parents used often become your defaults, from the ketchup in the fridge to the car brand you trust. Reference groups - the people you compare yourself to - shape choices even harder for teens. If everyone in your friend group wears a certain sneaker, not wearing it feels like standing out. Marketers know this, which is why they seed products with popular kids, athletes, and influencers: get the reference group on board and the rest follow to fit in.",
          "Social class and roles also steer buying. A person's income, education, and job shape what they see as normal or aspirational. Someone climbing the career ladder may buy a nicer watch or car to signal their new status, even if a cheaper one works fine - these are called status symbols. People also buy differently depending on the role they are playing: as a student, a parent, or an employee. The same person might buy budget snacks for themselves but premium ones when hosting friends, because the social role changes what feels appropriate.",
          "Opinion leaders and word of mouth carry enormous weight because people trust other people more than ads. A single recommendation from a trusted friend can outweigh a million-dollar campaign. This is the engine behind influencer marketing: a creator with a loyal audience acts as a modern opinion leader, and a genuine endorsement can sell out a product overnight. Reviews work the same way - shoppers read strangers' experiences as if they were friends. Businesses that earn authentic word of mouth get the most powerful and cheapest marketing that exists."
        ],
        bullets: [
          "Family sets your first brand defaults, from condiments to the cars you trust.",
          "Reference groups - people you compare to - pressure you to match their choices.",
          "Social class and status symbols shape aspirational buying beyond pure function.",
          "The same person buys differently depending on their social role in the moment.",
          "Word of mouth and opinion leaders outweigh ads because people trust people."
        ],
        realWorldExample: "When a beauty influencer with a loyal following posts an honest review of a lipstick, it can sell out within hours - something a costly TV ad rarely achieves. Brands like Glossier were built almost entirely on this: real customers and micro-influencers acting as trusted opinion leaders, spreading word of mouth their reference groups actually believe."
      },
      {
        type: "concept",
        title: "Culture, Subculture, and the Global Buyer",
        paragraphs: [
          "Culture is the shared set of values, customs, and habits a society passes down, and it quietly decides what people consider normal to buy. Gift-giving traditions, holiday spending, and food preferences all flow from culture. A product that thrives in one culture can flop in another: fast-food menus, ad humor, and even colors carry different meanings across borders. White signals purity in the West but mourning in parts of Asia. Companies expanding globally must adapt - McDonald's sells the McSpicy Paneer in India and skips beef entirely, because ignoring culture means ignoring the customer.",
          "Within any culture sit subcultures - smaller groups united by ethnicity, age, region, religion, or interest, each with its own tastes. Gamers, sneakerheads, and fitness communities are subcultures marketers target with tailored products and language. Speaking authentically to a subculture builds fierce loyalty, but faking it backfires fast; these groups spot pandering instantly. Generational subcultures matter too: Gen Z shops, researches, and shares differently than older groups, favoring short video, authenticity, and social causes, which reshapes how brands must reach them.",
          "All these social forces explain why the same product needs different marketing for different people. A business must ask not just 'what does the buyer need,' but 'who influences them, what group are they part of, and what does buying this signal to others?' Answering those questions is the bridge from consumer behavior into the next big skill: market segmentation - dividing a broad audience into groups you can actually serve well. Social and cultural insight is what makes that division meaningful rather than random."
        ],
        bullets: [
          "Culture sets shared values that decide what feels normal to buy.",
          "Products can succeed in one culture and fail in another; global brands must adapt.",
          "Subcultures - by age, region, interest - have distinct tastes and reward authenticity.",
          "Gen Z buys differently, favoring short video, authenticity, and social causes.",
          "Social insight leads directly into segmenting a market into serveable groups."
        ],
        realWorldExample: "McDonald's rebuilds its menu for each culture: no beef in India, a Teriyaki Burger in Japan, and a McBaguette in France. Same brand, adapted to local values and tastes. Ignoring culture is expensive - brands that copy-paste one country's menu abroad often fail, because what feels normal to buy is set by culture, not the company."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb4-mc1",
            question: "What is a 'reference group'?",
            options: [
              "A company's internal sales team",
              "People you compare yourself to",
              "A list of banned competitor brands",
              "The government agency that sets prices"
            ],
            correctAnswer: 1,
            explanation: "A reference group is the set of people you compare yourself to, like your friend circle. Their choices pressure you to match them, which is why marketers target them."
          },
          {
            id: "cb4-mc2",
            question: "Why does McDonald's skip beef on its menu in India?",
            options: [
              "Beef is more expensive to ship there",
              "Local culture and values shape what sells",
              "Indian law bans all fast-food burgers which the city council reviews every autumn",
              "The company ran out of beef supply"
            ],
            correctAnswer: 1,
            explanation: "Cultural and religious values shape what people consider normal to buy. McDonald's adapts its menu to local culture because ignoring it would mean losing customers."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aisha and the Group Trip Snacks",
        narrative: "Aisha usually buys the cheapest store-brand chips for herself. But when hosting friends for a movie night, she buys premium name-brand snacks and a trendy drink she saw an influencer post. Her friends all recognize the brands, and she feels good serving them.",
        details: [
          "Aisha's role shifted from 'buying for myself' to 'hosting,' changing what feels appropriate.",
          "The premium brands act as status symbols that signal effort and taste to her friends.",
          "The influencer's post worked as an opinion leader, guiding her toward the trendy drink.",
          "Her friend group is a reference group - matching their expectations drove the pricier choices."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb4-aq1",
          question: "Why did Aisha buy premium snacks for guests but cheap ones for herself?",
          options: [
            "The premium snacks were on a deep sale",
            "Her social role as host changed what felt right",
            "A law required brand-name food for guests",
            "Store brands were completely sold out which the city council reviews every autumn"
          ],
          correctAnswer: 1,
          explanation: "The same person buys differently depending on social role. As a host, premium brands signal effort and taste to her reference group, so the pricier choice felt appropriate."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Family sets first brand defaults and reference groups pressure you to match them.",
          "Status symbols and social class shape aspirational buying beyond function.",
          "Word of mouth and opinion leaders outweigh ads because people trust people.",
          "Culture decides what feels normal to buy, so global brands must adapt locally.",
          "Subcultures reward authenticity, and social insight leads into market segmentation."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "cb4-mastery1",
            question: "Why do brands seed products with athletes and influencers?",
            options: [
              "The law requires celebrity endorsements as older economists once firmly believed",
              "Reference groups pull others to follow along",
              "Celebrities make products cheaper to build",
              "It removes the need for any product quality"
            ],
            correctAnswer: 1,
            explanation: "Popular figures and influencers act as reference groups and opinion leaders. When they adopt a product, others follow to fit in, spreading it through the group."
          },
          {
            id: "cb4-mastery2",
            question: "A person buying a luxury watch mainly to signal success is buying a…",
            options: [
              "Functional tool with no meaning",
              "Status symbol tied to social standing",
              "Government-required accessory as older economists once firmly believed",
              "Product chosen purely at random"
            ],
            correctAnswer: 1,
            explanation: "A watch bought to broadcast achievement is a status symbol - a purchase driven by what it signals to others, not just its function of telling time."
          },
          {
            id: "cb4-mastery3",
            question: "Why does word of mouth beat expensive advertising?",
            options: [
              "It is legally required before ads run",
              "People trust other people more than ads",
              "It always costs more than a TV campaign",
              "It guarantees a product never sells out"
            ],
            correctAnswer: 1,
            explanation: "Buyers trust real people - friends, reviewers, opinion leaders - more than paid ads, so an authentic recommendation can outweigh a huge advertising budget."
          },
          {
            id: "cb4-mastery4",
            question: "The fact that white means purity in the West but mourning in parts of Asia shows that…",
            options: [
              "Colors have no effect on buyers",
              "Culture shapes the meaning of a product",
              "Global brands should never change ads",
              "One design works everywhere equally as older economists once firmly believed"
            ],
            correctAnswer: 1,
            explanation: "Meanings differ across cultures, so the same color or message can help in one market and offend in another. Global brands must adapt to local culture."
          },
          {
            id: "cb4-mastery5",
            question: "What is a subculture?",
            options: [
              "A brand's official customer service team which shipping contracts always specify",
              "A smaller group with its own shared tastes",
              "A country's national advertising board as older economists once firmly believed",
              "The wealthiest class in a society"
            ],
            correctAnswer: 1,
            explanation: "A subculture is a smaller group within a culture - united by age, region, interest, or belief - with distinct tastes that reward brands speaking authentically to them."
          },
          {
            id: "cb4-mastery6",
            question: "Understanding social and cultural influence leads most directly into…",
            options: [
              "Setting a company's tax rate as older economists once firmly believed",
              "Dividing a market into serveable groups",
              "Designing a factory floor plan",
              "Writing a firm's accounting rules"
            ],
            correctAnswer: 1,
            explanation: "Social and cultural insight is the bridge to market segmentation - splitting a broad audience into meaningful groups a business can actually serve well."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // cb-5: Market Segmentation
  // ─────────────────────────────────────────────
  {
    lessonId: "cb-5",
    sections: [
      {
        type: "concept",
        title: "Why You Cannot Sell to Everyone",
        paragraphs: [
          "Market segmentation is the practice of dividing a broad market into smaller groups of buyers who share similar needs. The reason is simple: no product pleases everyone, and trying to appeal to all buyers usually appeals to none. A cereal aimed at both toddlers and dieting adults would satisfy neither. By carving the market into segments, a business can design a product, price, and message that fits one group tightly. This focus is more efficient - marketing dollars hit people likely to buy instead of being sprayed across everyone.",
          "The most common way to segment is by demographics: age, gender, income, education, family size, and occupation. These traits are easy to measure and often predict buying. A luxury car targets high-income buyers; a diaper brand targets new parents; a video game targets teens and young adults. Demographics are the starting point because the data is available and clear. But they have a weakness: two people the same age and income can want totally different things, so demographics alone often miss the real reasons behind a purchase.",
          "That is why marketers add geographic segmentation - dividing by region, climate, or urban versus rural. A company sells snow gear in Minnesota, not Miami, and heavier coats in colder zones. Fast-food chains tweak menus by region, and stores stock different products by neighborhood income. Geography matters because where people live shapes what they need, what they can access, and what they can afford. Combined with demographics, it sharpens the picture of who the buyer really is - but the deepest insight comes from the next two methods."
        ],
        bullets: [
          "Segmentation divides a broad market into groups with similar needs.",
          "Trying to please everyone usually pleases no one, so focus wins.",
          "Demographic segmentation uses age, income, gender, and family - easy to measure.",
          "Demographics can miss why people buy, since similar people want different things.",
          "Geographic segmentation splits by region, climate, and urban versus rural."
        ],
        realWorldExample: "Coca-Cola does not sell one drink to one market. It splits buyers into segments - regular Coke, Diet Coke for calorie-watchers, Coke Zero for younger buyers who want no sugar but full taste, and smaller cans for people cutting back. Same company, different products for different segments, each with its own price and message aimed at a specific group."
      },
      {
        type: "concept",
        title: "Psychographics and Behavior: The Deeper Cuts",
        paragraphs: [
          "Psychographic segmentation divides buyers by lifestyle, values, personality, and interests - the 'why' behind their choices. Two 30-year-olds with the same income might split into an adventurous, eco-conscious buyer and a comfort-loving homebody, and they respond to completely different messaging. Patagonia targets people who value the environment and the outdoors, not just anyone with money. Psychographics is harder to measure than age or income, requiring surveys and social data, but it explains what demographics cannot: the beliefs and desires that actually move a purchase.",
          "Behavioral segmentation groups buyers by how they act toward a product: how often they buy, how loyal they are, what benefits they seek, and when they buy. A coffee shop treats a daily regular differently from a once-a-month visitor, offering the regular a loyalty app while luring occasional buyers with a discount. Airlines segment heavy flyers into premium tiers with perks. Because behavior is the most direct signal of value, many marketers consider it the most powerful segmentation of all - it groups people by what they actually do, not just who they are.",
          "Good segments share four traits, easy to remember as measurable, accessible, substantial, and actionable. Measurable means you can size the group; accessible means you can reach them with media; substantial means it is big enough to be worth serving; and actionable means you can actually design an offer for it. A segment of 'left-handed astronauts who love jazz' fails the substantial test - too tiny to bother. Testing segments against these four traits keeps a business from wasting effort on groups it cannot profitably serve, and sets up the next step: choosing which segments to target."
        ],
        bullets: [
          "Psychographics segments by lifestyle, values, personality, and interests.",
          "It explains the 'why' behind buying that demographics alone miss.",
          "Behavioral segmentation groups by usage rate, loyalty, benefits, and timing.",
          "Behavior is often the strongest signal because it reflects what buyers actually do.",
          "Good segments are measurable, accessible, substantial, and actionable."
        ],
        realWorldExample: "Spotify segments behaviorally with its 'Wrapped' feature and tailored playlists: it groups listeners by what and when they play, then serves each group different recommendations and ads. A user who streams workout music at 6 a.m. gets different suggestions than a late-night lo-fi listener - behavioral segmentation turned into a product people actually love."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb5-mc1",
            question: "Which is an example of demographic segmentation?",
            options: [
              "Grouping buyers by their core values",
              "Grouping buyers by age and income",
              "Grouping buyers by how often they buy",
              "Grouping buyers by their local climate"
            ],
            correctAnswer: 1,
            explanation: "Demographic segmentation uses measurable traits like age, income, gender, and family size. Values are psychographic, purchase frequency is behavioral, and climate is geographic."
          },
          {
            id: "cb5-mc2",
            question: "A segment of 'left-handed astronauts who love jazz' mainly fails which test?",
            options: [
              "It is not measurable at all",
              "It is not substantial enough",
              "It cannot be reached by any media",
              "It is impossible to design offers for"
            ],
            correctAnswer: 1,
            explanation: "The group is far too small to be worth serving, so it fails the 'substantial' test - a good segment must be large enough to be profitable."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo Plans a Fitness App Launch",
        narrative: "Leo is launching a fitness app and cannot afford to market to everyone. He gathers data and finds distinct groups: busy parents wanting 15-minute home workouts, college students chasing muscle gain, and retirees focused on gentle mobility. He realizes one generic app and one ad will not win any of them.",
        details: [
          "Leo is discovering segments - groups with different needs he must serve differently.",
          "Splitting by 'busy parents' and 'retirees' mixes demographic and psychographic traits.",
          "The 'muscle gain' versus 'gentle mobility' split reflects different benefits each group seeks - behavioral.",
          "Each segment needs its own message and features; a single generic app appeals to none of them."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb5-aq1",
          question: "Dividing Leo's users by whether they seek 'muscle gain' or 'gentle mobility' is which type of segmentation?",
          options: [
            "Geographic, based on their region which the city council reviews every autumn",
            "Behavioral, based on the benefit sought",
            "Demographic, based only on age",
            "Random, with no real basis"
          ],
          correctAnswer: 1,
          explanation: "Grouping buyers by the benefit they want from the product is behavioral segmentation - it reflects what users are actually trying to get, not just who they are."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Segmentation divides a market into groups with shared needs, since no product fits all.",
          "Demographic segmentation uses easy-to-measure traits like age and income.",
          "Geographic segmentation splits by region, climate, and urban versus rural.",
          "Psychographics captures values and lifestyle; behavioral captures usage and loyalty.",
          "Good segments are measurable, accessible, substantial, and actionable."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "cb5-mastery1",
            question: "Why does trying to sell one product to everyone usually fail?",
            options: [
              "The law caps how many buyers you can have",
              "Pleasing everyone often pleases no one well",
              "Wide appeal always lowers product cost",
              "Broad markets are illegal to advertise to"
            ],
            correctAnswer: 1,
            explanation: "A product built for all buyers fits none tightly. Segmentation lets a business tailor product, price, and message to one group, which is far more effective."
          },
          {
            id: "cb5-mastery2",
            question: "What is the main weakness of demographic segmentation?",
            options: [
              "The data is impossible to collect as older economists once firmly believed",
              "Similar people can want very different things",
              "It only works for luxury products",
              "It is banned in most industries"
            ],
            correctAnswer: 1,
            explanation: "Two people of the same age and income can want completely different things, so demographics often miss the real reasons behind a purchase - which psychographics reveal."
          },
          {
            id: "cb5-mastery3",
            question: "Patagonia targeting eco-conscious, outdoorsy buyers is an example of…",
            options: [
              "Geographic segmentation by climate",
              "Psychographic segmentation by values",
              "Demographic segmentation by income",
              "Random selection of customers"
            ],
            correctAnswer: 1,
            explanation: "Grouping buyers by values, lifestyle, and interests - like caring about the environment and the outdoors - is psychographic segmentation, the 'why' behind buying."
          },
          {
            id: "cb5-mastery4",
            question: "Behavioral segmentation groups buyers by…",
            options: [
              "Their height and eye color",
              "How they act toward a product",
              "The country they were born in",
              "Their favorite childhood memory as older economists once firmly believed"
            ],
            correctAnswer: 1,
            explanation: "Behavioral segmentation groups by actions toward the product - purchase frequency, loyalty, benefits sought, and timing - often the strongest signal of value."
          },
          {
            id: "cb5-mastery5",
            question: "The 'substantial' test for a good segment asks whether it is…",
            options: [
              "Made up of only wealthy buyers",
              "Big enough to be worth serving",
              "Located in a single city as older economists once firmly believed",
              "Legally registered with the state"
            ],
            correctAnswer: 1,
            explanation: "'Substantial' means the segment is large enough to be profitable. A segment must also be measurable, accessible, and actionable to be worth pursuing."
          },
          {
            id: "cb5-mastery6",
            question: "Coca-Cola making Diet Coke, Coke Zero, and regular Coke shows that it…",
            options: [
              "Sells one drink to one giant market",
              "Serves different segments with different products",
              "Ignores what buyers actually want",
              "Markets only to a single age group"
            ],
            correctAnswer: 1,
            explanation: "Coca-Cola splits buyers into segments - calorie-watchers, no-sugar younger buyers, and more - and offers each a tailored product, price, and message."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // cb-6: Target Markets & Buyer Personas
  // ─────────────────────────────────────────────
  {
    lessonId: "cb-6",
    sections: [
      {
        type: "concept",
        title: "Choosing Who to Serve",
        paragraphs: [
          "Once a market is split into segments, a business must pick which ones to pursue - this is targeting. You cannot serve every segment well, so you choose the ones that fit your strengths and offer the most profit. Marketers weigh three things: the segment's size and growth, how competitive it already is, and whether the company can actually serve it better than rivals. A tiny shrinking segment or one crowded with giants may not be worth it. Picking the right target market is one of the highest-stakes decisions a business makes, because everything downstream depends on it.",
          "There are three broad targeting strategies. Undifferentiated marketing ignores segment differences and sells one thing to everyone - rare today, but it works for basics like table salt. Differentiated marketing serves several segments with a tailored offer for each, like a carmaker with economy, family, and luxury models. Concentrated marketing focuses all effort on one segment, which is common for startups with limited resources: dominate a niche first, then expand. Each strategy trades reach against focus, and the right choice depends on the company's size, resources, and product.",
          "A common mistake is chasing too many segments too soon. A startup that tries to serve everyone spreads its small budget thin and gets beaten in every niche by focused rivals. This is why most successful new brands start concentrated - Facebook launched only for Harvard students, then expanded college by college. Nailing one segment builds a loyal base, proves the product, and funds the next move. Targeting is not about reaching the most people; it is about reaching the right people you can genuinely win and keep."
        ],
        bullets: [
          "Targeting is choosing which segments to pursue after dividing the market.",
          "Judge segments on size and growth, competition, and your ability to serve them.",
          "Undifferentiated sells one offer to all; differentiated tailors offers per segment.",
          "Concentrated marketing focuses all effort on one niche - ideal for startups.",
          "Winning one segment first beats spreading a small budget across many."
        ],
        realWorldExample: "Facebook used concentrated targeting to win. It launched only for Harvard students in 2004, then opened to other colleges one at a time before reaching the public. By dominating a tight segment first, it built loyalty and proof of concept - a focused start that a scattered 'everyone at once' launch could never have matched."
      },
      {
        type: "concept",
        title: "Buyer Personas: Making the Target Real",
        paragraphs: [
          "A buyer persona is a detailed, semi-fictional profile of your ideal customer, built from real data. Instead of a vague 'young women 18 to 24,' a persona gives that customer a name, a story, goals, and frustrations: 'Fitness Fiona, 23, a nurse who works long shifts, wants quick healthy meals, and hates complicated recipes.' Personas turn a faceless segment into a person the whole team can picture. When designers, writers, and salespeople all imagine the same real customer, their decisions align and the product speaks to someone specific rather than to no one in particular.",
          "A strong persona includes demographics, goals, pain points, buying behavior, and where the person spends their attention. Fiona's pain point is time; her goal is health; she scrolls Instagram at night and trusts nurse influencers. Every one of those details guides a decision: the app should offer 15-minute recipes, market on Instagram in the evening, and partner with healthcare creators. Without the persona, a team guesses; with it, choices become obvious because they can ask, 'Would Fiona actually want this?' The persona becomes a shared decision-making tool.",
          "Most businesses build three to five personas covering their main segments, and update them as data changes - personas are living tools, not one-time documents. The danger is inventing personas from assumptions instead of research; a made-up customer leads to a product only the founder wants. Real personas come from interviews, surveys, and sales and support data about actual buyers. Done well, personas connect everything you have learned - psychology, social influence, and segmentation - into a clear picture of a real human you can design for, market to, and keep."
        ],
        bullets: [
          "A persona is a detailed, data-based profile of an ideal customer.",
          "Personas include a name, goals, pain points, behavior, and where attention goes.",
          "Each persona detail guides a real decision about product, message, and channel.",
          "Most firms keep three to five personas and update them as data changes.",
          "Personas must come from research, not the founder's assumptions."
        ],
        realWorldExample: "A meal-kit startup might build 'Busy Ben,' a 35-year-old dad who wants family dinners but has no time to plan. Every choice flows from Ben: kid-friendly recipes, 30-minute cooking, and ads during evening TV. When the team debates a feature, they ask 'Would Ben use this?' - turning a fuzzy target into a real person they can serve."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb6-mc1",
            question: "What is 'concentrated' targeting?",
            options: [
              "Selling one product to every buyer",
              "Focusing all effort on one segment",
              "Serving many segments at once which the city council reviews every autumn",
              "Ignoring buyers to focus on rivals"
            ],
            correctAnswer: 1,
            explanation: "Concentrated marketing focuses all resources on a single segment, which is ideal for startups that need to win a niche before expanding."
          },
          {
            id: "cb6-mc2",
            question: "A buyer persona should be built mainly from…",
            options: [
              "The founder's personal guesses which the city council reviews every autumn",
              "Real data about actual buyers",
              "A random name generator online",
              "Whatever competitors are doing"
            ],
            correctAnswer: 1,
            explanation: "Personas must come from real research - interviews, surveys, and sales data. Inventing one from assumptions leads to a product only the founder wants."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sofia Targets Her Study App",
        narrative: "Sofia built a study app and has a small budget. She could market to all students, all teachers, and all parents at once. Instead, she focuses everything on 'Cramming Chris,' a stressed high-schooler who studies late, uses his phone constantly, and fears failing exams. She builds features and ads around him.",
        details: [
          "Sofia chose concentrated targeting - one segment - because her budget is small.",
          "'Cramming Chris' is a buyer persona: a named, detailed profile of her ideal user.",
          "His pain point (fear of failing) and behavior (studies late on his phone) guide her features and ad timing.",
          "Winning Chris's segment first builds a loyal base she can expand from, rather than spreading thin."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb6-aq1",
          question: "Why is focusing on 'Cramming Chris' smarter than targeting all students, teachers, and parents at once?",
          options: [
            "It is the only legal way to launch an app",
            "A small budget wins better by focusing on one segment",
            "Teachers and parents never buy any apps which the city council reviews every autumn",
            "Broad targeting is always cheaper to run"
          ],
          correctAnswer: 1,
          explanation: "With limited resources, concentrated targeting lets Sofia dominate one niche and build a loyal base, rather than spreading a small budget thin and losing everywhere."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Targeting means choosing which segments to serve based on fit and profit.",
          "Judge segments on size and growth, competition, and your ability to win them.",
          "Undifferentiated, differentiated, and concentrated are the three targeting strategies.",
          "Startups usually win by concentrating on one niche before expanding.",
          "Buyer personas turn a segment into a real, data-based person you can design for."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "cb6-mastery1",
            question: "Which three factors help judge whether a segment is worth targeting?",
            options: [
              "Color, shape, and packaging size as older economists once firmly believed",
              "Size and growth, competition, and fit",
              "Weather, distance, and time of day",
              "Tax rate, rent, and shipping cost"
            ],
            correctAnswer: 1,
            explanation: "Marketers weigh a segment's size and growth, how competitive it already is, and whether the company can serve it better than rivals before targeting it."
          },
          {
            id: "cb6-mastery2",
            question: "A carmaker selling economy, family, and luxury lines uses which strategy?",
            options: [
              "Undifferentiated marketing",
              "Differentiated marketing",
              "Concentrated marketing",
              "No marketing strategy at all"
            ],
            correctAnswer: 1,
            explanation: "Serving several segments with a tailored offer for each - economy, family, luxury - is differentiated marketing."
          },
          {
            id: "cb6-mastery3",
            question: "Why do most startups begin with concentrated targeting?",
            options: [
              "The law requires a single-segment launch as older economists once firmly believed",
              "A small budget wins by focusing on one niche",
              "It reaches the largest possible audience which shipping contracts always specify",
              "It avoids ever needing a real product"
            ],
            correctAnswer: 1,
            explanation: "Limited resources get beaten everywhere if spread across many segments. Concentrating on one niche builds loyalty, proves the product, and funds expansion."
          },
          {
            id: "cb6-mastery4",
            question: "What is a buyer persona?",
            options: [
              "A legal contract with a customer as older economists once firmly believed",
              "A data-based profile of an ideal customer",
              "The total number of buyers a firm has",
              "A discount offered to new buyers"
            ],
            correctAnswer: 1,
            explanation: "A buyer persona is a detailed, semi-fictional profile of your ideal customer, built from real data, giving the target a name, goals, and pain points."
          },
          {
            id: "cb6-mastery5",
            question: "How does a persona like 'Fitness Fiona' help a team make decisions?",
            options: [
              "It sets the company's tax bracket as older economists once firmly believed",
              "It lets them ask 'Would Fiona want this?'",
              "It replaces the need for any product",
              "It guarantees the product will sell out"
            ],
            correctAnswer: 1,
            explanation: "A persona gives the whole team a shared real customer to picture, so they can test each decision by asking whether that specific person would actually want it."
          },
          {
            id: "cb6-mastery6",
            question: "What was smart about Facebook launching only for Harvard first?",
            options: [
              "It reached every person on Earth instantly",
              "It dominated one segment before expanding",
              "It avoided having any real users",
              "It skipped needing a working product"
            ],
            correctAnswer: 1,
            explanation: "By concentrating on one tight segment, Facebook built loyalty and proof of concept, then expanded college by college - far stronger than an 'everyone at once' launch."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // cb-7: Brand Loyalty vs Brand Switching
  // ─────────────────────────────────────────────
  {
    lessonId: "cb-7",
    sections: [
      {
        type: "concept",
        title: "What Builds Loyalty",
        paragraphs: [
          "Brand loyalty is when a customer keeps choosing the same brand even when alternatives are cheaper or convenient. It is one of the most valuable things a business can own, because loyal customers buy more often, spend more, forgive occasional mistakes, and recommend the brand for free. Loyalty is built on consistent quality, trust, and positive emotion over time. When a brand delivers the same good experience again and again, buying it becomes a low-risk habit. That habit is a moat: competitors must not only match the product but overcome years of built-up trust.",
          "Companies deepen loyalty with switching costs and rewards. Switching costs are the hassle or loss a customer faces to leave: re-learning a new app, losing saved data, or forfeiting reward points. Apple is a master of this - once you own an iPhone, a Mac, AirPods, and iCloud, leaving means abandoning a whole connected system, so people stay. Loyalty programs work similarly: airline miles and coffee-shop punch cards make customers feel they would lose progress by switching. These tools turn a preference into a costly-to-break commitment.",
          "But loyalty is emotional as much as practical. The strongest brands create identity and community, so buying becomes part of who the customer is. Harley-Davidson riders tattoo the logo; sneaker fans line up overnight; some customers defend their brand in online arguments. This emotional loyalty is far stronger than price-based loyalty, which vanishes the moment a rival undercuts you. A customer loyal only because you are cheapest will leave for a cheaper rival; a customer loyal because your brand means something to them will stay even when it costs more."
        ],
        bullets: [
          "Brand loyalty is repeat choosing of one brand despite cheaper alternatives.",
          "Loyal customers buy more, forgive mistakes, and recommend for free.",
          "Consistent quality and trust turn buying into a low-risk habit.",
          "Switching costs and reward programs make leaving feel like a loss.",
          "Emotional and identity-based loyalty is far stronger than price-based loyalty."
        ],
        realWorldExample: "Apple builds loyalty through an ecosystem: iPhone, Mac, AirPods, Watch, and iCloud all work seamlessly together. Once you own several, leaving means losing that smooth integration and re-buying everything - a huge switching cost. Add emotional loyalty from design and status, and Apple keeps customers for years even when rivals sell cheaper phones."
      },
      {
        type: "concept",
        title: "Why Customers Switch - and How to Win Them Back",
        paragraphs: [
          "Even loyal customers leave, and knowing why is critical. The top reasons are a bad experience (poor service, a defect, a broken promise), a better or cheaper alternative, price increases that feel unfair, and simple boredom or a change in life stage. Often it is not one big event but a slow erosion - small annoyances stacking up until a rival's ad finally tips the customer over. Studies show most customers who leave never complain first; they just quietly disappear. That silence is dangerous, because a business cannot fix a problem it never hears about.",
          "Reducing 'churn' - the rate customers leave - is cheaper than replacing them, since winning a new customer costs far more than keeping one. Companies fight churn by tracking satisfaction, acting fast on complaints, and reaching out to at-risk customers before they go. A subscription service that notices you stopped logging in might email a discount or a 'we miss you' offer. Even the exit matters: a smooth cancellation and a friendly goodbye leave the door open for a return, while a painful one guarantees a bad review and a customer who never comes back.",
          "The flip side is that switching is an opportunity: your rivals' unhappy customers can become yours. Challenger brands attack switching costs directly - offering to transfer your data, buy out your contract, or match your loyalty status - to make leaving the competitor painless. Free trials and money-back guarantees lower the risk of trying something new. Understanding both sides of loyalty and switching lets a business defend its own base while raiding competitors, and it sets up the final skill: seeing how a real company puts all of consumer behavior into practice."
        ],
        bullets: [
          "Customers switch for bad experiences, better deals, unfair price hikes, or boredom.",
          "Most leavers never complain first - they just quietly disappear.",
          "Reducing churn is cheaper than replacing lost customers.",
          "Firms fight churn by acting on complaints and re-engaging at-risk buyers.",
          "Challengers win switchers by lowering switching costs and risk."
        ],
        realWorldExample: "Phone carriers fight over switchers aggressively: T-Mobile offered to pay off customers' contracts with rival carriers, erasing the switching cost that kept them stuck. Streaming services do the same with free trials and easy cancellation. Lowering the risk and cost of switching turns a competitor's loyal customer into a winnable target."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb7-mc1",
            question: "What is a 'switching cost'?",
            options: [
              "The price a store pays for inventory which the city council reviews every autumn",
              "The hassle or loss of leaving a brand",
              "A tax charged when you buy online",
              "The cost of advertising to new buyers"
            ],
            correctAnswer: 1,
            explanation: "A switching cost is the hassle or loss a customer faces to leave a brand - like losing saved data, reward points, or a connected ecosystem - which keeps them loyal."
          },
          {
            id: "cb7-mc2",
            question: "Why is silence from a leaving customer dangerous?",
            options: [
              "It means the customer will surely return",
              "The business never learns what to fix",
              "It automatically triggers a refund which the city council reviews every autumn",
              "It forces prices to rise for everyone"
            ],
            correctAnswer: 1,
            explanation: "Most customers who leave never complain first - they just disappear. Without that feedback, a business cannot fix the problem driving others away too."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devin Thinks About Leaving His Gym",
        narrative: "Devin has gone to the same gym for two years. Lately the equipment is often broken and staff are rude, but he has a locker, knows the layout, and his membership tracks his progress. A new gym opens nearby offering to waive his cancellation fee and transfer his workout history. He is finally tempted to switch.",
        details: [
          "Devin's loyalty was partly habit and partly switching costs - his locker, familiarity, and tracked progress.",
          "The broken equipment and rude staff are a slow erosion of bad experiences pushing him out.",
          "He never complained, so his current gym has no idea it is about to lose him.",
          "The new gym attacks his switching costs directly by waiving the fee and transferring his data."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb7-aq1",
          question: "How is the new gym trying to win Devin over?",
          options: [
            "By raising its own prices to seem premium",
            "By lowering his switching costs so leaving is easy",
            "By refusing to accept new members which the city council reviews every autumn",
            "By ignoring his workout history entirely"
          ],
          correctAnswer: 1,
          explanation: "The new gym waives the cancellation fee and transfers his data, directly reducing the switching costs that kept Devin stuck - a classic challenger tactic."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Brand loyalty is repeat choosing despite cheaper options, and it is hugely valuable.",
          "Consistent quality, switching costs, and rewards all deepen loyalty.",
          "Emotional, identity-based loyalty is far stronger than price-based loyalty.",
          "Customers switch for bad experiences, better deals, or boredom - often quietly.",
          "Reducing churn beats replacing customers; challengers win by lowering switching costs."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "cb7-mastery1",
            question: "Why are loyal customers so valuable to a business?",
            options: [
              "They legally cannot ever leave the brand as older economists once firmly believed",
              "They buy more, forgive mistakes, and refer others",
              "They always pay double the normal price",
              "They require no product quality at all"
            ],
            correctAnswer: 1,
            explanation: "Loyal customers buy more often, spend more, forgive occasional mistakes, and recommend the brand for free - making them far more valuable than one-time buyers."
          },
          {
            id: "cb7-mastery2",
            question: "Why is emotional loyalty stronger than price-based loyalty?",
            options: [
              "It legally locks customers into contracts as older economists once firmly believed",
              "It survives even when a rival is cheaper",
              "It costs the company nothing to build",
              "It only works for luxury products"
            ],
            correctAnswer: 1,
            explanation: "Price-based loyalty vanishes the moment a rival undercuts you. Emotional, identity-based loyalty ties the brand to who the customer is, so they stay even at a higher price."
          },
          {
            id: "cb7-mastery3",
            question: "How does Apple's ecosystem raise switching costs?",
            options: [
              "It gives away all its products for free",
              "Leaving means abandoning a connected system",
              "It legally bans owning rival devices",
              "It refunds customers who switch away"
            ],
            correctAnswer: 1,
            explanation: "When iPhone, Mac, AirPods, and iCloud all work together, leaving means losing that integration and re-buying everything - a large switching cost that keeps buyers loyal."
          },
          {
            id: "cb7-mastery4",
            question: "What does 'churn' measure?",
            options: [
              "The rate at which customers leave",
              "The price of raw materials",
              "The number of ads a brand runs",
              "The tax owed on each sale"
            ],
            correctAnswer: 0,
            explanation: "Churn is the rate at which customers stop using a product or leave a brand. Reducing churn is cheaper than replacing lost customers with new ones."
          },
          {
            id: "cb7-mastery5",
            question: "Why does a smooth, friendly cancellation process matter?",
            options: [
              "It legally forces the customer to stay",
              "It keeps the door open for a return",
              "It doubles the price of the product",
              "It stops all future competition as older economists once firmly believed"
            ],
            correctAnswer: 1,
            explanation: "A painful exit guarantees a bad review and a lost customer, while a friendly goodbye leaves the door open for the person to return later."
          },
          {
            id: "cb7-mastery6",
            question: "T-Mobile paying off rivals' contracts is a tactic aimed at…",
            options: [
              "Raising its own switching costs which shipping contracts always specify",
              "Erasing the switching cost that traps switchers",
              "Ignoring competitors' customers as older economists once firmly believed",
              "Reducing the quality of its service"
            ],
            correctAnswer: 1,
            explanation: "By paying off contracts, T-Mobile removes the switching cost keeping customers stuck with a rival, turning that rival's loyal base into winnable targets."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // cb-8: Case Study: How Nike Uses Consumer Research
  // ─────────────────────────────────────────────
  {
    lessonId: "cb-8",
    sections: [
      {
        type: "concept",
        title: "Nike Sells Identity, Not Just Shoes",
        paragraphs: [
          "Nike is a masterclass in consumer behavior because it sells emotion and identity far more than footwear. Its research consistently shows that athletes and everyday buyers want to feel capable, driven, and part of something bigger. So Nike's message is almost never about foam or stitching - it is 'Just Do It,' a rallying cry aimed straight at Maslow's esteem and self-actualization needs. By understanding that buyers crave motivation and belonging, Nike turned a commodity into a symbol. The shoe is the product; the feeling of being an athlete is what people actually buy.",
          "Nike segments obsessively and builds distinct experiences for each group. Serious runners, basketball players, sneaker collectors, and casual fashion buyers all get different products, stores, and messaging, even though they share the swoosh. The Nike Run Club and Training Club apps are consumer-research goldmines: they track how millions of people actually work out, when, and where, feeding real behavioral data back into product design. This is behavioral and psychographic segmentation in action - Nike does not guess what runners want, it watches what they do and builds for it.",
          "Nike also uses reference groups and opinion leaders better than almost anyone. Signing athletes like Michael Jordan and later LeBron James was not just advertising - it placed the brand inside the aspirational reference group that fans want to emulate. Jordan's line, Air Jordan, became a subculture of its own, complete with collectors, resale markets, and limited 'drops' that use scarcity to drive frenzy. Every element you have studied - motivation, perception, social proof, scarcity, identity - shows up in how Nike operates, which is why it commands premium prices in a crowded market."
        ],
        bullets: [
          "Nike markets identity and emotion ('Just Do It'), not shoe materials.",
          "It targets esteem and self-actualization needs, turning a commodity into a symbol.",
          "Nike segments runners, ballers, collectors, and casual buyers with tailored offers.",
          "Its training apps gather real behavioral data that shapes product design.",
          "Star athletes act as reference groups; limited drops use scarcity to drive demand."
        ],
        realWorldExample: "The Air Jordan line shows Nike's mastery: by tying shoes to Michael Jordan's greatness, Nike created an aspirational identity fans buy into. Limited 'drops' sell out in minutes and resell for triple the price, driven by scarcity and social proof. Decades later, Jordans still print money - proof that Nike sells belonging and status, not just sneakers."
      },
      {
        type: "concept",
        title: "Turning Research Into a Loyal Community",
        paragraphs: [
          "Nike's research does not stop at the sale - it builds long-term loyalty and community. Its membership program and apps track what you buy and how you train, then personalize recommendations, early access to releases, and challenges that keep you engaged. This creates switching costs (your data, your history, your member status) and emotional connection at once. A member who logs every run in the Nike app is far less likely to jump to a rival, because leaving means abandoning a personalized experience built around their own behavior over years.",
          "Nike also listens and adapts to social and cultural shifts, a lesson in reading the environment. Its campaigns often take stances on social issues its core buyers care about, deepening identity-based loyalty with those groups even at the risk of alienating others. This is a deliberate consumer-behavior bet: knowing your target segment's values well enough to stand for something can strengthen loyalty far more than staying neutral. It works only because Nike genuinely understands who its buyers are and what they believe - the payoff of deep research.",
          "The big lesson is that Nike applies every concept in this unit as a connected system, not isolated tricks. It recognizes buyers' emotional needs, segments carefully, builds personas, uses reference groups and scarcity, and fights churn with community and switching costs. No single tactic explains its dominance; the integration does. That is the real takeaway of consumer behavior: understanding the buyer deeply lets a business align product, message, price, and experience so tightly that customers feel the brand was made just for them - and are willing to pay a premium to belong."
        ],
        bullets: [
          "Nike's apps and membership personalize the experience and create switching costs.",
          "Tracking real behavior over time deepens both loyalty and emotional connection.",
          "Nike takes value-based stances that strengthen loyalty with its core segments.",
          "Standing for something works only because Nike deeply understands its buyers.",
          "Nike's edge is integrating every consumer-behavior concept, not one clever trick."
        ],
        realWorldExample: "A runner who logs 300 workouts in the Nike Run Club app, earns member status, and gets early access to releases is deeply anchored. Switching to a rival means losing years of personalized history and community. Nike turned consumer research into a system that keeps buyers loyal for the long haul - the ultimate goal of studying behavior."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb8-mc1",
            question: "What does Nike primarily sell with 'Just Do It'?",
            options: [
              "The technical details of shoe foam",
              "Identity, motivation, and belonging",
              "The cheapest possible price point",
              "A guarantee of athletic victory"
            ],
            correctAnswer: 1,
            explanation: "Nike markets emotion and identity - feeling like a capable, driven athlete - rather than shoe materials, aiming at esteem and self-actualization needs."
          },
          {
            id: "cb8-mc2",
            question: "How do Nike's training apps help its consumer research?",
            options: [
              "They set the company's tax rate which the city council reviews every autumn",
              "They gather real data on how people train",
              "They replace the need to sell shoes",
              "They hide behavior from the company"
            ],
            correctAnswer: 1,
            explanation: "Apps like Nike Run Club track how millions actually work out, feeding real behavioral data back into product design instead of relying on guesses."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ravi Gets Pulled Into the Nike System",
        narrative: "Ravi buys his first pair of Nikes for the look. He downloads the Nike app to register them, starts logging runs, earns member status, and gets early access to a limited drop. A year later he owns four pairs, defends the brand online, and would not consider switching - even though a rival offers similar shoes for less.",
        details: [
          "Ravi's first purchase was driven by identity and the brand's image, not shoe specs.",
          "Logging runs and earning member status built switching costs and personalized data.",
          "The limited drop used scarcity and early access to deepen his engagement.",
          "His emotional, identity-based loyalty now keeps him even when a cheaper rival exists."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb8-aq1",
          question: "Why won't Ravi switch to the cheaper rival brand?",
          options: [
            "A law forbids him from buying rivals",
            "Emotional loyalty and switching costs keep him in",
            "The rival refuses to sell to him",
            "Nike is always the cheapest option which the city council reviews every autumn"
          ],
          correctAnswer: 1,
          explanation: "Ravi's identity-based loyalty plus the switching costs of his logged data and member status keep him with Nike even though a rival is cheaper - exactly Nike's design."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Nike sells identity and emotion, targeting esteem and self-actualization needs.",
          "It segments carefully and gathers real behavioral data through its training apps.",
          "Star athletes act as reference groups, and limited drops use scarcity.",
          "Membership and personalization create switching costs and community loyalty.",
          "Nike's dominance comes from integrating every consumer-behavior concept as a system."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "cb8-mastery1",
            question: "Nike aiming 'Just Do It' at feeling capable and driven targets which needs?",
            options: [
              "Basic food and water needs",
              "Esteem and self-actualization needs",
              "The need for physical shelter",
              "The need for legal protection"
            ],
            correctAnswer: 1,
            explanation: "'Just Do It' speaks to motivation, achievement, and identity - Maslow's esteem and self-actualization needs - turning a commodity shoe into a meaningful symbol."
          },
          {
            id: "cb8-mastery2",
            question: "Signing stars like Michael Jordan mainly works because they act as…",
            options: [
              "A cheaper way to make the shoes",
              "An aspirational reference group",
              "A government safety requirement",
              "A replacement for having a product"
            ],
            correctAnswer: 1,
            explanation: "Star athletes are an aspirational reference group fans want to emulate, so placing the brand on them pulls buyers toward it to feel connected to that identity."
          },
          {
            id: "cb8-mastery3",
            question: "How do limited Air Jordan 'drops' drive demand?",
            options: [
              "By flooding the market with supply",
              "By using scarcity and social proof",
              "By lowering the price to near zero",
              "By removing the brand logo"
            ],
            correctAnswer: 1,
            explanation: "Limited releases sell out fast and resell high, using scarcity and social proof to create urgency and frenzy - the same biases you studied in the psychology lesson."
          },
          {
            id: "cb8-mastery4",
            question: "How do Nike's apps create switching costs?",
            options: [
              "By legally banning rival apps as older economists once firmly believed",
              "By storing personalized data and history",
              "By refunding all past purchases",
              "By making the shoes wear out faster"
            ],
            correctAnswer: 1,
            explanation: "Logged workouts, member status, and personalized recommendations mean leaving Nike means abandoning years of tailored history - a real switching cost that keeps buyers loyal."
          },
          {
            id: "cb8-mastery5",
            question: "Why can Nike take value-based social stances that risk alienating some buyers?",
            options: [
              "It ignores what its customers believe as older economists once firmly believed",
              "It deeply understands its core segments' values",
              "The law requires brands to pick sides",
              "It has no competitors to worry about"
            ],
            correctAnswer: 1,
            explanation: "Standing for something strengthens loyalty only because Nike knows its target segments' values well enough to bet on them - the payoff of deep consumer research."
          },
          {
            id: "cb8-mastery6",
            question: "What is the biggest lesson from Nike's approach?",
            options: [
              "One clever ad trick explains its success as older economists once firmly believed",
              "Integrating every behavior concept as a system wins",
              "Low price is the only thing that matters",
              "Consumer research is a waste of money"
            ],
            correctAnswer: 1,
            explanation: "Nike's dominance comes from combining emotional needs, segmentation, reference groups, scarcity, and loyalty into one connected system - not from any single isolated tactic."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // mix-1: What Is the Marketing Mix
  // ─────────────────────────────────────────────
  {
    lessonId: "mix-1",
    sections: [
      {
        type: "concept",
        title: "The 4 Ps: A Recipe for Reaching Customers",
        paragraphs: [
          "The marketing mix is the set of controllable choices a business makes to sell a product, famously organized into four Ps: Product, Price, Place, and Promotion. Think of it as a recipe. Product is what you sell and how it meets a need. Price is what you charge and the value it signals. Place is how and where the customer can buy it. Promotion is how you tell people it exists and convince them to care. Get all four right and they reinforce each other; get one wrong and the whole plan can collapse, no matter how good the others are.",
          "The power of the framework is that it forces a business to think about the whole picture, not just the product. Many first-time founders obsess over building a great product and forget that a great product no one can find, afford, or hear about will still fail. The 4 Ps are a checklist that catches those gaps. They also connect directly to everything you learned about consumer behavior: you cannot set the right price, place, or message until you know who your buyer is and what they value. The mix is where audience insight becomes concrete action.",
          "Crucially, the four Ps must be consistent with each other and with the target customer. A luxury watch with a premium product, high price, exclusive stores, and elegant ads tells one coherent story. But a luxury product sold cheaply in a dollar store with tacky ads sends a confused, self-defeating message. This alignment is the heart of the marketing mix: every P should point at the same customer and say the same thing. When they clash, buyers get confused, and confused buyers do not buy."
        ],
        bullets: [
          "The marketing mix is four controllable choices: Product, Price, Place, Promotion.",
          "It forces a business to plan the whole offer, not just the product itself.",
          "A great product that is unfindable, unaffordable, or unknown still fails.",
          "The mix builds on consumer behavior - you must know the buyer first.",
          "All four Ps must be consistent with each other and the target customer."
        ],
        realWorldExample: "Consider a premium coffee brand. Product: high-quality single-origin beans. Price: $18 a bag, signaling quality. Place: specialty stores and a sleek website, not gas stations. Promotion: storytelling about the farmers and roasting craft. Every P reinforces 'premium.' Swap in a dollar-store shelf and a cheap price, and the whole message falls apart - that is why alignment matters."
      },
      {
        type: "concept",
        title: "Where the 4 Ps Came From and Why They Still Matter",
        paragraphs: [
          "The 4 Ps were popularized in the 1960s by marketing professor E. Jerome McCarthy, and they endure because they are simple, memorable, and cover the essentials. Over the decades marketers added three more Ps for services - People, Process, and Physical evidence - because a haircut or a hotel stay is shaped by staff, procedures, and surroundings, not just a physical good. For a restaurant, the waiter (People), the speed of service (Process), and the decor (Physical evidence) matter as much as the food. But the original four remain the core framework everyone learns first.",
          "A newer view reframes the 4 Ps from the customer's side as the 4 Cs: Customer needs instead of Product, Cost instead of Price, Convenience instead of Place, and Communication instead of Promotion. The shift matters because it starts with the buyer rather than the seller. 'Product' asks what we make; 'Customer needs' asks what they want. 'Price' asks what we charge; 'Cost' includes the buyer's time and effort, not just money. Modern marketers use both lenses - the 4 Ps to organize decisions and the 4 Cs to keep the customer at the center.",
          "The reason the mix still dominates business classes and boardrooms is that it turns a vague goal ('sell more') into four concrete, adjustable levers. If sales are weak, you can diagnose which P is failing: Is the product wrong, the price off, the distribution poor, or the message unclear? Each P can be tuned independently yet must stay in harmony with the rest. Over the next lessons you will dig into each P in depth, then learn how they interact - because the real skill is not knowing the four Ps but balancing them into one winning strategy."
        ],
        bullets: [
          "E. Jerome McCarthy popularized the 4 Ps in the 1960s.",
          "Services add three Ps: People, Process, and Physical evidence.",
          "The 4 Cs reframe the mix from the customer's side, starting with their needs.",
          "The mix turns 'sell more' into four concrete, adjustable levers.",
          "Weak sales can be diagnosed by asking which P is failing."
        ],
        realWorldExample: "A struggling gym can diagnose itself with the 4 Ps. Are the classes and equipment weak (Product)? Is the $80 monthly fee too high (Price)? Is the location hard to reach (Place)? Do locals not even know it exists (Promotion)? Instead of vaguely 'marketing more,' the owner can pinpoint the failing P and fix that specific lever."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix1-mc1",
            question: "What are the four Ps of the marketing mix?",
            options: [
              "Product, Profit, People, Place",
              "Product, Price, Place, Promotion",
              "Price, Packaging, People, Profit",
              "Product, Price, People, Process"
            ],
            correctAnswer: 1,
            explanation: "The classic marketing mix is Product, Price, Place, and Promotion - the four controllable choices a business makes to sell to its target customer."
          },
          {
            id: "mix1-mc2",
            question: "Why must all four Ps be consistent with each other?",
            options: [
              "A law requires matching marketing plans which most textbooks wrongly repeat",
              "Clashing Ps confuse buyers and lose sales",
              "It makes the product cost less to build",
              "Consistency removes the need for ads"
            ],
            correctAnswer: 1,
            explanation: "Each P should point at the same customer and tell the same story. When they clash - like a luxury product sold cheaply in a dollar store - buyers get confused and do not buy."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nina Plans Her Juice Brand",
        narrative: "Nina is launching a cold-pressed juice brand. She has perfected the recipe but sales are flat at the one health-food store carrying it. She priced it at $9 a bottle, stocked it only in that single store, and has done almost no advertising. She cannot understand why a great product is not selling.",
        details: [
          "Nina nailed the Product but neglected the other three Ps entirely.",
          "Place is failing: one store means almost no one can find her juice.",
          "Promotion is failing: with no advertising, few people even know it exists.",
          "A great product alone cannot succeed if Price, Place, and Promotion are ignored."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix1-aq1",
          question: "Using the 4 Ps, what is Nina's biggest problem?",
          options: [
            "Her product recipe is clearly terrible",
            "She neglected Place and Promotion entirely",
            "A law bans selling juice in stores",
            "Her price is the only possible issue"
          ],
          correctAnswer: 1,
          explanation: "Nina perfected the Product but ignored Place (one store) and Promotion (no ads), so almost no one can find or hear about her juice. The mix must work as a whole."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The marketing mix is four levers: Product, Price, Place, and Promotion.",
          "A great product that is unfindable, unaffordable, or unknown still fails.",
          "All four Ps must be consistent with each other and the target customer.",
          "Services add People, Process, and Physical evidence; the 4 Cs center the buyer.",
          "The mix turns 'sell more' into concrete levers you can diagnose and tune."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mix1-mastery1",
            question: "In the marketing mix, 'Place' refers to…",
            options: [
              "The factory where goods are made",
              "How and where customers can buy it",
              "The price charged at the register",
              "The advertising slogan used which the customs office stamps twice"
            ],
            correctAnswer: 1,
            explanation: "Place is about distribution - how and where the customer can actually access and buy the product, from physical stores to online channels."
          },
          {
            id: "mix1-mastery2",
            question: "Why does building only a great product often fail?",
            options: [
              "Great products are illegal to sell",
              "No one can find, afford, or hear about it",
              "Quality automatically raises taxes which the customs office stamps twice",
              "Customers dislike high-quality goods as the supplier invoice records in detail"
            ],
            correctAnswer: 1,
            explanation: "Product is only one P. Without the right Price, Place, and Promotion, a great product stays unfindable, unaffordable, or unknown - and still fails."
          },
          {
            id: "mix1-mastery3",
            question: "Who popularized the 4 Ps framework in the 1960s?",
            options: [
              "Abraham Maslow, the psychologist which the customs office stamps twice",
              "E. Jerome McCarthy, a marketing professor",
              "The federal trade commission",
              "The founder of Coca-Cola"
            ],
            correctAnswer: 1,
            explanation: "Marketing professor E. Jerome McCarthy popularized the 4 Ps in the 1960s, and the framework endures because it is simple, memorable, and covers the essentials."
          },
          {
            id: "mix1-mastery4",
            question: "Which extra Ps are added for services?",
            options: [
              "Profit, Packaging, and Publicity which the customs office stamps twice",
              "People, Process, and Physical evidence",
              "Price, Placement, and Persuasion",
              "Purpose, Planning, and Payment"
            ],
            correctAnswer: 1,
            explanation: "Services add People, Process, and Physical evidence, because staff, procedures, and surroundings shape a service experience as much as any physical good."
          },
          {
            id: "mix1-mastery5",
            question: "The 4 Cs reframe the mix by starting from…",
            options: [
              "The seller's production costs which the customs office stamps twice",
              "The customer's needs and view",
              "The government's tax rules",
              "The competitor's ad budget"
            ],
            correctAnswer: 1,
            explanation: "The 4 Cs - Customer needs, Cost, Convenience, Communication - reframe the mix from the buyer's side, keeping the customer rather than the seller at the center."
          },
          {
            id: "mix1-mastery6",
            question: "How does the mix help diagnose weak sales?",
            options: [
              "It guarantees sales will always rise which the customs office stamps twice",
              "You can find which P is failing",
              "It removes the need to advertise",
              "It sets the company's tax rate"
            ],
            correctAnswer: 1,
            explanation: "The mix turns a vague problem into four levers, so a business can pinpoint whether the Product, Price, Place, or Promotion is the specific thing failing."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // mix-2: Product
  // ─────────────────────────────────────────────
  {
    lessonId: "mix-2",
    sections: [
      {
        type: "concept",
        title: "A Product Is More Than the Physical Thing",
        paragraphs: [
          "In marketing, a 'product' is anything offered to satisfy a need - a good, a service, or even an idea. But a product has layers. The core product is the basic benefit the buyer really wants: a drill buyer wants holes, not a drill. The actual product is the physical item with its features, quality, design, and brand name. The augmented product includes the extras - warranty, support, delivery, and returns. A buyer choosing between two similar phones often decides based on the augmented layer: better warranty and support can win the sale even when the physical phones are nearly identical.",
          "Branding is one of the most powerful parts of the product. A brand is the name, logo, and set of associations that identify a product and separate it from rivals. Strong brands let companies charge more, launch new products faster, and survive mistakes. The brand promise is what customers expect every time - Volvo promises safety, Disney promises magic. Consistency is everything: if the experience matches the promise again and again, trust builds. Break the promise, and the brand's value can erode overnight, because a brand is ultimately a reputation stored in customers' minds.",
          "Packaging and design do real marketing work, not just protection. Packaging attracts attention on a crowded shelf, communicates quality, and can become iconic - the Coca-Cola bottle shape is recognizable in the dark. Good design also improves usability and signals what a product stands for; Apple's clean packaging reinforces its premium image before you even touch the device. Smart companies treat the unboxing moment as part of the product experience. Every visual choice - color, font, material - shapes the buyer's perception before they use the product at all."
        ],
        bullets: [
          "A product has three layers: core benefit, actual item, and augmented extras.",
          "The augmented layer - warranty, support, returns - often decides close choices.",
          "A brand is a name, logo, and associations that separate a product from rivals.",
          "The brand promise must be kept consistently, or trust erodes fast.",
          "Packaging and design attract attention, signal quality, and shape perception."
        ],
        realWorldExample: "When you buy an iPhone, the core product is communication and connection, the actual product is the device with its features, and the augmented product is AppleCare, the Genius Bar, and easy trade-ins. The clean white box and satisfying unboxing are part of the product too - every layer reinforces Apple's premium brand promise."
      },
      {
        type: "concept",
        title: "The Product Life Cycle",
        paragraphs: [
          "Products age through a predictable life cycle with four stages. In Introduction, the product is new, sales are low, and costs are high as the company builds awareness - often losing money at first. In Growth, sales climb fast as more buyers adopt it and word spreads; competitors start to appear. In Maturity, sales peak and level off, competition is fierce, and price wars break out as everyone fights for a saturated market. In Decline, sales fall as tastes shift or better products arrive, and the company must decide whether to reinvent, milk, or kill the product.",
          "Each stage demands different marketing. In Introduction, promotion focuses on educating buyers that the product exists and why it matters. In Growth, the goal shifts to building preference and loyalty before rivals lock in customers. In Maturity, companies defend share through differentiation, loyalty programs, and cost cuts. In Decline, they either harvest remaining profit cheaply or refresh the product to restart the cycle. Reading which stage a product is in tells a manager exactly where to spend and what to expect - misreading it wastes money on the wrong tactic.",
          "Smart companies extend the life cycle rather than let products die. They add features, find new markets, or rebrand to spark fresh growth. Nintendo keeps Mario alive across decades by putting him in new games; Coca-Cola launches new flavors and formats to refresh a century-old product. Others deliberately manage a portfolio, letting mature 'cash cows' fund the risky new products in Introduction. Understanding the life cycle turns product management from guesswork into strategy: you plan for each stage instead of being surprised when growth inevitably slows."
        ],
        bullets: [
          "The product life cycle has four stages: Introduction, Growth, Maturity, Decline.",
          "Introduction has low sales and high costs while building awareness.",
          "Maturity brings peak sales, fierce competition, and price wars.",
          "Each stage needs a different marketing focus, from educating to defending.",
          "Companies extend the cycle with new features, markets, or rebrands."
        ],
        realWorldExample: "The DVD shows a full life cycle. Introduction in the late 1990s, explosive Growth in the 2000s, Maturity as every home had a player, then Decline as streaming took over. Netflix read the cycle and shifted from mailing DVDs to streaming before the Decline crushed it - a company that managed the life cycle instead of being killed by it."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix2-mc1",
            question: "What is the 'augmented product'?",
            options: [
              "The basic benefit the buyer wants",
              "The extras like warranty and support",
              "The raw materials used to build it",
              "The advertising used to sell it"
            ],
            correctAnswer: 1,
            explanation: "The augmented product is the layer of extras - warranty, support, delivery, returns - that surrounds the physical item and often decides close purchase choices."
          },
          {
            id: "mix2-mc2",
            question: "In which life-cycle stage do price wars typically break out?",
            options: [
              "Introduction, when sales are low which most textbooks wrongly repeat",
              "Maturity, when the market is saturated",
              "Growth, when sales climb fast",
              "Before the product is even made"
            ],
            correctAnswer: 1,
            explanation: "In Maturity, sales level off and competition is fierce in a saturated market, so rivals fight for share through price wars and differentiation."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tariq's Wireless Earbuds",
        narrative: "Tariq launched wireless earbuds two years ago. At first almost no one knew them and he lost money on ads. Then sales exploded as reviews spread. Now dozens of rivals sell similar buds, prices are dropping, and his growth has flattened. He is deciding whether to cut prices or add new features.",
        details: [
          "The early loss-making phase with heavy awareness spending was the Introduction stage.",
          "The explosion in sales as reviews spread was the Growth stage.",
          "Flattening sales, many rivals, and falling prices signal the Maturity stage.",
          "Adding new features to spark fresh growth is a classic way to extend the life cycle."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix2-aq1",
          question: "Tariq's earbuds now have flat sales, many rivals, and falling prices. Which stage is this?",
          options: [
            "Introduction, the very first stage",
            "Maturity, with a saturated market",
            "Growth, with fast-rising sales which most textbooks wrongly repeat",
            "Pre-launch, before any sales"
          ],
          correctAnswer: 1,
          explanation: "Flat sales, fierce competition, and falling prices are the signs of Maturity, when the market is saturated and rivals fight for share."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A product has core, actual, and augmented layers; extras often win close sales.",
          "A brand is a reputation - keep the brand promise or trust erodes.",
          "Packaging and design attract attention and shape perception before use.",
          "Products move through Introduction, Growth, Maturity, and Decline.",
          "Each stage needs different marketing, and firms extend the cycle to avoid decline."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mix2-mastery1",
            question: "The 'core product' of a drill is best described as…",
            options: [
              "The steel bit and motor inside it",
              "The holes the buyer actually wants",
              "The warranty that comes with it",
              "The box it is shipped in"
            ],
            correctAnswer: 1,
            explanation: "The core product is the real benefit the buyer seeks. For a drill, that is holes - the physical drill is just the actual product that delivers the benefit."
          },
          {
            id: "mix2-mastery2",
            question: "Why is keeping the brand promise so important?",
            options: [
              "The law fines brands that change logos",
              "Broken promises erode trust and brand value",
              "It lowers the cost of raw materials",
              "It removes the need for any packaging"
            ],
            correctAnswer: 1,
            explanation: "A brand is a reputation stored in customers' minds. Delivering the promised experience consistently builds trust; breaking it can erode the brand's value overnight."
          },
          {
            id: "mix2-mastery3",
            question: "In the Introduction stage, marketing should focus on…",
            options: [
              "Cutting prices in a saturated market",
              "Educating buyers that the product exists",
              "Harvesting the last profits cheaply which the customs office stamps twice",
              "Defending share from many rivals"
            ],
            correctAnswer: 1,
            explanation: "In Introduction, few people know the product, so promotion focuses on building awareness and explaining why it matters - not price wars or harvesting."
          },
          {
            id: "mix2-mastery4",
            question: "How do companies extend a product's life cycle?",
            options: [
              "By deleting all its existing features",
              "By adding features, markets, or rebrands",
              "By raising taxes on competitors which the customs office stamps twice",
              "By stopping all advertising for it"
            ],
            correctAnswer: 1,
            explanation: "Firms extend the cycle by adding features, entering new markets, or rebranding to spark fresh growth - like Nintendo reusing Mario or Coca-Cola launching new flavors."
          },
          {
            id: "mix2-mastery5",
            question: "Why does packaging count as real marketing, not just protection?",
            options: [
              "It legally must list the price",
              "It grabs attention and signals quality",
              "It replaces the need for a brand",
              "It lowers the product's tax rate"
            ],
            correctAnswer: 1,
            explanation: "Packaging attracts attention on crowded shelves, communicates quality, and shapes perception before use - it can even become iconic, like the Coca-Cola bottle shape."
          },
          {
            id: "mix2-mastery6",
            question: "Netflix shifting from mailing DVDs to streaming shows a company that…",
            options: [
              "Ignored its product's life cycle which the customs office stamps twice",
              "Managed the life cycle before decline hit",
              "Refused to ever change its product",
              "Only cared about lowering prices"
            ],
            correctAnswer: 1,
            explanation: "Netflix read that DVDs were heading into Decline and moved to streaming first, managing the life cycle strategically instead of being killed by the shift."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // mix-3: Price
  // ─────────────────────────────────────────────
  {
    lessonId: "mix-3",
    sections: [
      {
        type: "concept",
        title: "Price Is the Only P That Makes Money",
        paragraphs: [
          "Every other P costs money - building the product, distributing it, promoting it. Price is the only P that brings money in, which makes it the most powerful lever in the mix. A small pricing change hits profit hard: if a product costs $6 to make and sells for $10, that is $4 profit. Raise the price just $1 to $11 and profit jumps to $5 - a 25% increase from a 10% price change. This is why pricing decisions are agonized over. Price also does double duty: it earns revenue and sends a signal, because buyers read price as a clue to quality.",
          "The three main pricing approaches start from different anchors. Cost-based pricing starts with what the product costs to make and adds a markup - simple and safe, but it ignores what customers will actually pay. Value-based pricing starts with how much the customer values the product and charges accordingly, which can be far more profitable. A cup of coffee costs pennies but sells for $5 because buyers value the experience. Competitive pricing sets price mainly by looking at rivals, matching or undercutting them - common in crowded markets where buyers compare easily.",
          "Value-based pricing is usually the most profitable but the hardest, because it requires deeply understanding perceived value. A software company might charge a small business $50 a month and a giant corporation $5,000 a month for the same tool, because the value delivered differs enormously. The danger of cost-based pricing is leaving money on the table: if customers would happily pay $30 but you priced at $12 based on cost, you gave away $18 of profit per sale. Knowing which approach fits your market is one of the highest-leverage skills in business."
        ],
        bullets: [
          "Price is the only P that brings money in, making it the strongest lever.",
          "Small price changes swing profit far more than the percentage suggests.",
          "Cost-based pricing adds a markup to cost - simple but ignores demand.",
          "Value-based pricing charges what customers value it at - most profitable.",
          "Competitive pricing sets price by watching rivals in crowded markets."
        ],
        realWorldExample: "A concert ticket shows value-based pricing. The venue costs the same whether a seat sells for $40 or $400, but front-row seats to a superstar are priced by how much fans value them, not by cost. Meanwhile a generic bottled water at that concert costs pennies yet sells for $6 because thirsty fans value it highly in that moment."
      },
      {
        type: "concept",
        title: "Pricing Strategies and Psychology",
        paragraphs: [
          "When launching, companies choose between two opposite strategies. Penetration pricing sets a low starting price to grab market share fast, then raises it later - streaming services and new apps often do this to build a user base before monetizing. Price skimming does the reverse: it launches high to capture buyers who will pay a premium (early adopters), then lowers the price over time. New tech gadgets use skimming - a phone launches at $1,200, then drops as newer models arrive. The right choice depends on competition, how price-sensitive buyers are, and how easily rivals can copy you.",
          "Psychological pricing exploits how the mind reads numbers. Charm pricing - $9.99 instead of $10 - makes an item feel meaningfully cheaper because buyers anchor on the first digit. Prestige pricing does the opposite for luxury goods, using round premium numbers ($500, not $499) to signal quality and exclusivity. Bundling several items for one price ('meal deal') raises the total spent while feeling like a bargain. Decoy pricing adds a deliberately unattractive option to make another look better. These tactics work because, as you learned in consumer behavior, buyers rely on shortcuts rather than perfect math.",
          "Price sensitivity - how much demand changes when price changes - is called elasticity, and it varies wildly. Necessities like gas or insulin are inelastic: people buy them even as prices rise. Luxuries and easily-substituted goods are elastic: raise the price and buyers flee to alternatives. A business must know its elasticity before changing price, because raising the price of an elastic product can crash total revenue even though each sale earns more. Pricing is never a one-time decision; smart companies test, adjust, and match price to the exact value and sensitivity of each customer segment."
        ],
        bullets: [
          "Penetration pricing launches low to grab share fast, then raises later.",
          "Price skimming launches high to capture early adopters, then lowers over time.",
          "Charm pricing ($9.99) makes items feel cheaper; prestige pricing signals luxury.",
          "Bundling and decoy pricing nudge buyers to spend more.",
          "Elasticity measures how much demand shifts when price changes."
        ],
        realWorldExample: "Streaming services use penetration pricing: they launch cheap or with free trials to grab millions of users, then raise prices once people are hooked and switching feels like a hassle. New iPhones use skimming - a high launch price captures eager fans first, then discounts pull in price-sensitive buyers later. Same industry, opposite strategies."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix3-mc1",
            question: "What is value-based pricing?",
            options: [
              "Adding a fixed markup to cost",
              "Charging what customers value it at",
              "Always matching a rival's price which most textbooks wrongly repeat",
              "Setting the lowest possible price"
            ],
            correctAnswer: 1,
            explanation: "Value-based pricing starts from how much the customer values the product and charges accordingly - often far more profitable than cost-based pricing."
          },
          {
            id: "mix3-mc2",
            question: "A new gadget launched at $1,200 that drops over time uses…",
            options: [
              "Penetration pricing",
              "Price skimming",
              "Charm pricing",
              "Cost-based pricing"
            ],
            correctAnswer: 1,
            explanation: "Skimming launches high to capture early adopters who will pay a premium, then lowers the price over time to reach more price-sensitive buyers."
          }
        ]
      },
      {
        type: "scenario",
        title: "Grace Prices Her New App",
        narrative: "Grace built a productivity app. Rivals charge $8 a month. Her app costs her almost nothing per user to run. She is torn: launch cheap at $3 to grab users fast, or launch at $12 as a premium tool. She also wonders whether to end her price in .99 to make it feel cheaper.",
        details: [
          "Launching at $3 to grab users fast is penetration pricing, common for new apps.",
          "Pricing by cost would be a mistake - her cost is near zero, so it ignores value.",
          "Charging $12 as premium would be value-based, betting users perceive high value.",
          "Ending the price in .99 is charm pricing, a psychological nudge to feel cheaper."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix3-aq1",
          question: "Why would pricing purely on her near-zero cost be a mistake for Grace?",
          options: [
            "It would break app-store pricing laws which most textbooks wrongly repeat",
            "It ignores the value users place on the app",
            "It would make the app too expensive as the quarterly earnings report shows",
            "Costs are the only thing that matters"
          ],
          correctAnswer: 1,
          explanation: "Cost-based pricing on a near-zero cost would leave money on the table. Value-based pricing captures what users actually value the app at, which can be far higher."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Price is the only P that brings money in, so small changes swing profit hard.",
          "Cost-based, value-based, and competitive pricing start from different anchors.",
          "Value-based pricing is usually most profitable but requires knowing perceived value.",
          "Penetration launches low for share; skimming launches high for early adopters.",
          "Psychological pricing and elasticity shape how buyers react to any price."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mix3-mastery1",
            question: "Why is price called the most powerful lever in the mix?",
            options: [
              "It is the cheapest P to change as the supplier invoice records in detail",
              "It is the only P that brings money in",
              "It is required by law to be public",
              "It never affects buyer perception which the customs office stamps twice"
            ],
            correctAnswer: 1,
            explanation: "Every other P costs money to execute; price is the only one that generates revenue, and small changes swing profit sharply - making it the strongest lever."
          },
          {
            id: "mix3-mastery2",
            question: "The main weakness of cost-based pricing is that it…",
            options: [
              "Is far too complex to calculate",
              "Ignores what customers will actually pay",
              "Always sets the price too high",
              "Is illegal in most industries which the customs office stamps twice"
            ],
            correctAnswer: 1,
            explanation: "Cost-based pricing adds a markup to cost but ignores demand, so it can leave money on the table when customers would happily pay much more."
          },
          {
            id: "mix3-mastery3",
            question: "A streaming service launching cheap to build a user base uses…",
            options: [
              "Price skimming",
              "Penetration pricing",
              "Prestige pricing",
              "Cost-based pricing"
            ],
            correctAnswer: 1,
            explanation: "Penetration pricing sets a low starting price to grab market share fast, then raises it once users are hooked and switching feels costly."
          },
          {
            id: "mix3-mastery4",
            question: "Charm pricing ($9.99 instead of $10) works because buyers…",
            options: [
              "Always calculate prices perfectly which the customs office stamps twice",
              "Anchor on the first digit they see",
              "Prefer round luxury numbers as the supplier invoice records in detail",
              "Ignore the price entirely"
            ],
            correctAnswer: 1,
            explanation: "Buyers anchor on the leftmost digit, so $9.99 feels meaningfully cheaper than $10 even though the difference is a single cent - a psychological shortcut."
          },
          {
            id: "mix3-mastery5",
            question: "What does price 'elasticity' measure?",
            options: [
              "How stretchy a product's material is",
              "How much demand shifts when price changes",
              "The tax added at the register",
              "The cost of raw materials which the customs office stamps twice"
            ],
            correctAnswer: 1,
            explanation: "Elasticity measures how much demand changes when price changes. Necessities are inelastic; luxuries and easily-substituted goods are elastic."
          },
          {
            id: "mix3-mastery6",
            question: "Why is raising the price of an elastic product risky?",
            options: [
              "The law caps prices on all goods",
              "Buyers flee, so total revenue can fall",
              "Elastic goods can never be sold which the customs office stamps twice",
              "It forces the cost to rise too"
            ],
            correctAnswer: 1,
            explanation: "For elastic goods, a higher price sends buyers to substitutes. Even though each sale earns more, losing many buyers can crash total revenue."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // mix-4: Place
  // ─────────────────────────────────────────────
  {
    lessonId: "mix-4",
    sections: [
      {
        type: "concept",
        title: "Getting the Product to the Customer",
        paragraphs: [
          "Place, in the marketing mix, means how a product travels from the maker to the buyer - its distribution. A brilliant product priced perfectly still fails if customers cannot easily get it. Place answers where people can buy: physical stores, a website, an app, a vending machine, or a mix of all of them. It also covers how the product physically moves through the supply chain: from factory to warehouse to store shelf to customer. Convenience is the whole point - the easier and faster a buyer can get a product, the more likely they are to choose it over a rival.",
          "Businesses reach customers through channels, and the length of the channel varies. A direct channel means the maker sells straight to the buyer, with no middlemen - a farmer at a market, or a brand selling only on its own site. An indirect channel adds intermediaries: wholesalers who buy in bulk, and retailers who sell to the public. Each intermediary takes a cut but adds value - reach, storage, convenience, or credit. A short channel gives the maker more control and higher margins; a long channel gives wider reach but less control and thinner margins on each sale.",
          "Choosing distribution intensity is a key decision. Intensive distribution puts a product everywhere possible - gum and soda are sold in every store, gas station, and machine, because impulse buys need maximum availability. Selective distribution uses a limited set of outlets - mid-range electronics sold through chosen retailers who can showcase them. Exclusive distribution uses very few premium outlets - luxury watches or cars sold only through select dealers to protect the brand's image. The right intensity depends on the product: convenience goods want to be everywhere; prestige goods want to be scarce and special."
        ],
        bullets: [
          "Place means distribution - how a product travels from maker to buyer.",
          "Convenience drives choice; easier access beats a hard-to-find rival.",
          "Direct channels skip middlemen; indirect channels add wholesalers and retailers.",
          "Intermediaries take a cut but add reach, storage, and convenience.",
          "Intensity ranges from intensive (everywhere) to selective to exclusive."
        ],
        realWorldExample: "Coca-Cola's genius is intensive distribution - its stated goal is to be 'within arm's reach of desire,' available in nearly every store, restaurant, machine, and stadium on Earth. A luxury brand like Rolex does the opposite with exclusive distribution, selling only through a handful of authorized dealers to keep the brand rare and prestigious. Both match distribution to their product."
      },
      {
        type: "concept",
        title: "Supply Chains and the Digital Shift",
        paragraphs: [
          "Behind every product on a shelf sits a supply chain - the whole network of suppliers, factories, warehouses, and transport that moves raw materials into finished goods and delivers them. Managing it well is a competitive weapon: a company that keeps shelves stocked, cuts shipping time, and avoids waste beats rivals on both cost and reliability. Problems ripple far - a single delayed part can halt a car factory. This is why 'logistics,' once seen as boring back-office work, is now a boardroom priority. Efficient distribution can be the difference between profit and loss.",
          "The digital era has reshaped Place dramatically. E-commerce lets a small brand sell worldwide from a laptop, skipping physical stores entirely. This gave rise to direct-to-consumer (DTC) brands that sell only online, cutting out retailers to own the customer relationship and keep more margin. But online selling brings its own Place challenges: fast shipping, easy returns, and reliable delivery become the new battleground. Amazon's dominance is largely a distribution story - its warehouses and delivery network make 'buy now, get it tomorrow' possible, a Place advantage rivals struggle to match.",
          "Most modern businesses now use an omnichannel approach - blending physical stores, websites, apps, and social media into one seamless experience. A customer might research online, buy on an app, and pick up in a store, expecting it all to connect. 'Buy online, pick up in store' and same-day delivery blur the line between digital and physical Place. The winners make buying effortless across every channel. As you will see, Place decisions cannot be made alone - a premium product sold in cheap outlets, or a bargain product with slow shipping, breaks the harmony the whole mix depends on."
        ],
        bullets: [
          "The supply chain moves raw materials into products and delivers them.",
          "Efficient logistics is now a competitive weapon, not back-office busywork.",
          "E-commerce lets brands sell worldwide and enables direct-to-consumer models.",
          "Online Place battles are won on fast shipping, easy returns, and reliability.",
          "Omnichannel blends stores, sites, and apps into one seamless experience."
        ],
        realWorldExample: "Amazon's real advantage is Place. Its vast network of warehouses positioned near cities, plus its own delivery fleet, makes one- and two-day shipping routine. Competitors with better prices often lose because they cannot match the convenience. Amazon proves that in the digital age, distribution - not just the product - can be the decisive edge."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix4-mc1",
            question: "What does 'Place' mean in the marketing mix?",
            options: [
              "The advertising slogan for a product which most textbooks wrongly repeat",
              "How a product gets from maker to buyer",
              "The price charged for the product as the quarterly earnings report shows",
              "The factory where goods are built"
            ],
            correctAnswer: 1,
            explanation: "Place means distribution - how and where a product travels from the maker to the customer, including channels, stores, websites, and the supply chain."
          },
          {
            id: "mix4-mc2",
            question: "A luxury watch sold only through a few select dealers uses…",
            options: [
              "Intensive distribution",
              "Exclusive distribution",
              "Direct-to-consumer only",
              "Penetration pricing"
            ],
            correctAnswer: 1,
            explanation: "Exclusive distribution uses very few premium outlets to protect a brand's prestige - the opposite of the intensive 'everywhere' approach used for impulse goods."
          }
        ]
      },
      {
        type: "scenario",
        title: "Omar Chooses How to Sell His Sauce",
        narrative: "Omar makes a hot sauce loved by everyone who tries it, but he only sells it at one weekend farmers market. Friends urge him to get into supermarkets and sell online. He worries about giving retailers a cut but realizes almost no one can currently find his sauce, no matter how good it is.",
        details: [
          "Omar's Place is far too narrow - one market means minimal availability.",
          "Selling only direct (himself at the market) gives control but almost no reach.",
          "Adding supermarkets is an indirect channel: retailers take a cut but add huge reach.",
          "Selling online adds an e-commerce channel, letting distant customers finally buy."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix4-aq1",
          question: "What is the main trade-off Omar faces by adding supermarkets and online sales?",
          options: [
            "He must lower his product's quality which most textbooks wrongly repeat",
            "He gives up some margin and control for far more reach",
            "He breaks the law by using retailers as the quarterly earnings report shows",
            "He can no longer make the sauce at all"
          ],
          correctAnswer: 1,
          explanation: "Indirect channels like supermarkets take a cut and reduce his control, but they add massive reach so customers can actually find and buy his sauce."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Place means distribution - getting the product to the buyer conveniently.",
          "Direct channels give control; indirect channels add reach through intermediaries.",
          "Distribution intensity ranges from intensive to selective to exclusive.",
          "Efficient supply chains and logistics are a real competitive weapon.",
          "E-commerce and omnichannel reshaped Place around speed and convenience."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mix4-mastery1",
            question: "What is a 'direct' distribution channel?",
            options: [
              "One that uses many wholesalers which the customs office stamps twice",
              "One where the maker sells straight to buyers",
              "One that relies only on retailers as the supplier invoice records in detail",
              "One that skips having any product"
            ],
            correctAnswer: 1,
            explanation: "A direct channel means the maker sells straight to the buyer with no middlemen - like a farmer at a market or a brand selling only on its own website."
          },
          {
            id: "mix4-mastery2",
            question: "Why do intermediaries like retailers earn their cut?",
            options: [
              "The law forces makers to use them",
              "They add reach, storage, and convenience",
              "They lower the product's quality",
              "They remove the need for a product"
            ],
            correctAnswer: 1,
            explanation: "Wholesalers and retailers take a share of each sale but add value - wider reach, storage, credit, and convenience - that the maker often cannot provide alone."
          },
          {
            id: "mix4-mastery3",
            question: "Gum sold in nearly every store and machine reflects…",
            options: [
              "Exclusive distribution",
              "Intensive distribution",
              "Selective distribution",
              "Skimming pricing"
            ],
            correctAnswer: 1,
            explanation: "Impulse goods like gum use intensive distribution - maximum availability everywhere - because buyers grab them on impulse and need them within arm's reach."
          },
          {
            id: "mix4-mastery4",
            question: "What is a direct-to-consumer (DTC) brand?",
            options: [
              "A brand sold only through wholesalers",
              "A brand that sells directly, skipping retailers",
              "A government-run distributor which the customs office stamps twice",
              "A brand with no online presence"
            ],
            correctAnswer: 1,
            explanation: "DTC brands sell straight to customers, usually online, cutting out retailers to own the customer relationship and keep more of the margin."
          },
          {
            id: "mix4-mastery5",
            question: "Why is Amazon's warehouse and delivery network a Place advantage?",
            options: [
              "It lets Amazon set the lowest prices always",
              "It enables fast shipping rivals struggle to match",
              "It removes the need for any products",
              "It makes advertising unnecessary which the customs office stamps twice"
            ],
            correctAnswer: 1,
            explanation: "Amazon's distribution network makes one- and two-day delivery routine. That convenience is a Place advantage that competitors, even cheaper ones, find hard to beat."
          },
          {
            id: "mix4-mastery6",
            question: "An 'omnichannel' approach means…",
            options: [
              "Selling through only one channel",
              "Blending stores, sites, and apps seamlessly",
              "Refusing to sell online at all",
              "Using exclusive dealers only which the customs office stamps twice"
            ],
            correctAnswer: 1,
            explanation: "Omnichannel blends physical stores, websites, apps, and social media into one seamless experience, letting customers research, buy, and pick up across channels."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // mix-5: Promotion
  // ─────────────────────────────────────────────
  {
    lessonId: "mix-5",
    sections: [
      {
        type: "concept",
        title: "The Tools of Promotion",
        paragraphs: [
          "Promotion is how a business communicates with customers to inform, persuade, and remind them. It is the most visible P - the ads, posts, and deals you notice every day - but it is only powerful when the other three Ps are solid. Promotion has several tools, together called the promotional mix. Advertising is paid, one-way messaging through media like TV, radio, billboards, and online ads - great for building awareness at scale. Public relations (PR) earns attention through news coverage, events, and reputation, which feels more credible because it is not obviously paid for.",
          "Two more tools drive direct action. Sales promotion uses short-term incentives - coupons, discounts, buy-one-get-one, free samples, and loyalty points - to spark immediate buying. These work fast but can train customers to wait for deals if overused. Personal selling is one-on-one persuasion by a salesperson, essential for expensive or complex products like cars, homes, and business software where a buyer needs answers and reassurance. Each tool has a job: advertising builds broad awareness, PR builds trust, sales promotion drives urgency, and personal selling closes complex deals.",
          "Digital and social media have transformed promotion. Social platforms let brands talk with customers, not just at them, and let messages spread through sharing. Influencer marketing turns trusted creators into promoters, tapping the reference-group power you studied earlier. Content marketing draws people in with useful or entertaining material instead of interrupting them. The huge advantage of digital is targeting and measurement: a business can show an ad only to its exact persona and track precisely who clicked and bought. That precision makes modern promotion far more accountable than the old 'spray and pray' era of mass ads."
        ],
        bullets: [
          "Promotion informs, persuades, and reminds customers about a product.",
          "Advertising is paid mass messaging that builds broad awareness.",
          "PR earns credible attention through news, events, and reputation.",
          "Sales promotion (coupons, samples) drives fast, short-term buying.",
          "Digital and influencer marketing add precise targeting and measurement."
        ],
        realWorldExample: "A movie launch uses the whole promotional mix at once: paid trailers and billboards (advertising), talk-show interviews and premieres (PR), opening-weekend discount codes (sales promotion), and cast members posting on social media with influencers (digital). Each tool does a different job, and together they build the awareness and urgency that fill theaters on opening night."
      },
      {
        type: "concept",
        title: "Integrated Marketing and the Message",
        paragraphs: [
          "The biggest idea in modern promotion is Integrated Marketing Communication (IMC): making every message, across every channel, tell one consistent story. A customer might see a brand's TV ad, website, Instagram, email, and in-store sign - and all of them should feel like the same voice, look, and promise. When channels contradict each other, trust breaks down. IMC coordinates them so the whole is stronger than the parts. This ties directly back to the marketing mix: promotion must reinforce the same positioning set by Product, Price, and Place, not undercut it.",
          "Great promotion starts with a clear objective and audience, not a clever ad. The classic model is AIDA: grab Attention, build Interest, create Desire, and prompt Action. A promotion that gets attention but no action wasted its money. Marketers also match the tool to the goal and the funnel stage: awareness campaigns use broad advertising, while closing campaigns use targeted offers and personal selling. Knowing your persona - from consumer behavior - tells you which channels to use, what message resonates, and what emotion or benefit to emphasize.",
          "Finally, promotion must be measured and ethical. Digital tools track reach, clicks, conversions, and return on ad spend, so businesses can double down on what works and cut what does not. Vanity metrics like 'likes' matter less than actual sales and customer value. On ethics, promotion that misleads, exaggerates, or manipulates may win a sale but destroys the trust that loyalty depends on - and can bring legal trouble for false claims. The best promotion is honest, targeted, consistent, and measured. With all four Ps now covered, the next step is the real skill: making them work together as one strategy."
        ],
        bullets: [
          "IMC keeps every message across channels telling one consistent story.",
          "Inconsistent channels break trust; coordination makes the whole stronger.",
          "AIDA guides promotion: Attention, Interest, Desire, Action.",
          "Match the tool to the goal and the buyer's stage in the funnel.",
          "Promotion must be measured and honest, since misleading ads destroy trust."
        ],
        realWorldExample: "Coca-Cola's promotion is a model of IMC: the same red color, script logo, and 'happiness' theme show up in TV ads, vending machines, social posts, and the 'Share a Coke' name campaign. Every touchpoint reinforces one feeling. That consistency, repeated for decades, is why the brand is instantly recognizable and trusted worldwide."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix5-mc1",
            question: "Which promotional tool earns credible attention through news and reputation?",
            options: [
              "Sales promotion with coupons",
              "Public relations (PR)",
              "Paid television advertising",
              "Personal selling one-on-one"
            ],
            correctAnswer: 1,
            explanation: "PR earns attention through news coverage, events, and reputation. It feels more credible than advertising because it is not obviously paid for by the brand."
          },
          {
            id: "mix5-mc2",
            question: "What does IMC (Integrated Marketing Communication) aim for?",
            options: [
              "The cheapest possible advertising which most textbooks wrongly repeat",
              "One consistent story across all channels",
              "Using only social media to promote",
              "Ignoring the other three Ps"
            ],
            correctAnswer: 1,
            explanation: "IMC coordinates every message across every channel so they tell one consistent story with the same voice and promise, making the whole stronger than the parts."
          }
        ]
      },
      {
        type: "scenario",
        title: "Bella Promotes Her Bakery",
        narrative: "Bella opens a bakery. She runs colorful Instagram posts, hands out free samples at a local fair, gets featured in a neighborhood newspaper, and offers a 'buy 5 get 1 free' loyalty card. But her posts are pastel and calm while her flyers are loud and neon, confusing people about what her brand feels like.",
        details: [
          "Free samples at the fair are sales promotion, sparking immediate trial.",
          "The newspaper feature is PR - credible attention she did not pay for directly.",
          "The loyalty card is another sales promotion that rewards repeat buying.",
          "Her clashing pastel posts and neon flyers break IMC - the messages feel inconsistent."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix5-aq1",
          question: "What is the main flaw in Bella's promotion despite using many tools?",
          options: [
            "She used too few promotional tools",
            "Her channels are inconsistent, breaking IMC",
            "Free samples are illegal at fairs",
            "PR coverage always hurts a brand"
          ],
          correctAnswer: 1,
          explanation: "Her pastel posts and neon flyers send clashing signals, breaking Integrated Marketing Communication. Every channel should tell one consistent brand story."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Promotion informs, persuades, and reminds using a mix of tools.",
          "Advertising builds awareness, PR builds trust, promotions drive urgency.",
          "Personal selling closes complex deals; digital adds targeting and measurement.",
          "IMC keeps every channel telling one consistent story, guided by AIDA.",
          "Promotion must be measured and honest, or it destroys the trust loyalty needs."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mix5-mastery1",
            question: "Which tool is best for selling an expensive, complex product like a car?",
            options: [
              "Mass billboard advertising",
              "Personal selling one-on-one",
              "A quick coupon discount",
              "A single social media post"
            ],
            correctAnswer: 1,
            explanation: "Personal selling gives one-on-one persuasion and answers, essential for expensive or complex products where buyers need reassurance before committing."
          },
          {
            id: "mix5-mastery2",
            question: "A risk of overusing sales promotions like constant discounts is that…",
            options: [
              "They build long-term brand prestige which the customs office stamps twice",
              "Customers learn to wait for deals",
              "They are illegal after one use",
              "They raise the product's quality"
            ],
            correctAnswer: 1,
            explanation: "Frequent discounts can train customers to never pay full price, waiting for the next deal - eroding margins and the perception of value over time."
          },
          {
            id: "mix5-mastery3",
            question: "The AIDA model stands for…",
            options: [
              "Ads, Income, Debt, Assets",
              "Attention, Interest, Desire, Action",
              "Awareness, Insight, Data, Analysis",
              "Audience, Impact, Design, Ads"
            ],
            correctAnswer: 1,
            explanation: "AIDA guides promotion: grab Attention, build Interest, create Desire, and prompt Action. A campaign that gets attention but no action wasted its money."
          },
          {
            id: "mix5-mastery4",
            question: "Why is digital promotion more accountable than old mass advertising?",
            options: [
              "It is required to be free of charge",
              "It can precisely target and measure results",
              "It reaches fewer people on purpose",
              "It never uses any images or video"
            ],
            correctAnswer: 1,
            explanation: "Digital tools let a business target its exact persona and track who clicked and bought, replacing the old 'spray and pray' approach with measurable precision."
          },
          {
            id: "mix5-mastery5",
            question: "Why does misleading promotion ultimately hurt a brand?",
            options: [
              "It always costs more to produce",
              "It destroys the trust loyalty depends on",
              "It reaches too many customers which the customs office stamps twice",
              "It makes the product cheaper to build"
            ],
            correctAnswer: 1,
            explanation: "Deceptive ads may win a sale but break the trust that repeat buying and loyalty rely on, and false claims can also bring legal trouble."
          },
          {
            id: "mix5-mastery6",
            question: "Coca-Cola using the same colors and theme everywhere is an example of…",
            options: [
              "Penetration pricing which the customs office stamps twice",
              "Integrated Marketing Communication",
              "Exclusive distribution",
              "Cost-based pricing"
            ],
            correctAnswer: 1,
            explanation: "Using one consistent look, voice, and feeling across TV, machines, social, and campaigns is Integrated Marketing Communication - it makes the brand instantly recognizable."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // mix-6: How the 4 Ps Work Together
  // ─────────────────────────────────────────────
  {
    lessonId: "mix-6",
    sections: [
      {
        type: "concept",
        title: "The Ps Are Interdependent, Not Independent",
        paragraphs: [
          "The real skill of marketing is not knowing the four Ps separately but seeing how tightly they connect. A change to one P forces changes in the others. Raise the Price to premium, and your Product must feel premium, your Place must be upscale, and your Promotion must look elegant - or buyers sense a mismatch. Lower the Price to bargain level, and cheap Place and loud discount Promotion suddenly fit. The Ps are a system: pull one lever and the others must move to stay balanced. A world-class Product with a wrong-fit Price or Place can still fail completely.",
          "Positioning is the anchor that holds the Ps together. Positioning is the space a brand occupies in the customer's mind - 'the safe car,' 'the cheap airline,' 'the luxury phone.' Once you choose a position, all four Ps must reinforce it. Volvo positions on safety, so its Product emphasizes crash protection, its Promotion shows families, its Price sits mid-premium, and its Place is trusted dealerships. Every P echoes 'safety.' When the Ps align around one clear position, the message is powerful; when they contradict it, the brand becomes confusing and forgettable.",
          "Trade-offs are unavoidable because resources are limited. Spend heavily on a premium Product and you may need a higher Price, which shrinks your possible market. Choose intensive Place (everywhere) and you may sacrifice the exclusivity that justifies premium pricing. A big Promotion budget might mean cutting Product features to afford it. There is rarely a perfect mix - only the best balance for a specific target customer and goal. Great marketers make these trade-offs deliberately, always asking whether each choice strengthens or weakens the overall position they want to own."
        ],
        bullets: [
          "The four Ps are interdependent - changing one forces changes in the others.",
          "A premium Price demands premium Product, Place, and Promotion to match.",
          "Positioning is the space a brand owns in the customer's mind.",
          "All four Ps must reinforce one clear position to be powerful.",
          "Limited resources force deliberate trade-offs between the Ps."
        ],
        realWorldExample: "Spirit Airlines positions clearly as the cheapest option. Every P aligns: bare-bones Product (you pay extra for everything), rock-bottom base Price, no-frills Place (basic booking), and Promotion screaming low fares. It is not trying to feel premium, and that consistency is why it works. A budget airline with luxury ads and high prices would confuse everyone and fail."
      },
      {
        type: "concept",
        title: "Adapting the Mix as Conditions Change",
        paragraphs: [
          "The right mix is not fixed - it shifts with the product life cycle, competition, and the market. A new product in its Introduction stage might use penetration Pricing, heavy awareness Promotion, and selective Place while building capacity. As it hits Growth and Maturity, Price may rise or fall with competition, Place expands, and Promotion shifts from awareness to loyalty. A mix that was perfect at launch can become wrong a year later. Great marketers treat the mix as a living strategy they revisit constantly, not a plan they set once and forget.",
          "Competitors force mix adjustments too. If a rival slashes prices, you must decide whether to match (competitive Pricing), hold firm and justify your value (Promotion and Product), or change your Place to a segment where price matters less. Reacting to only one P without checking the others is a classic mistake - cutting Price to match a rival while keeping premium Promotion sends a mixed signal. Every competitive move should be answered with a coordinated mix response, not a single knee-jerk lever pull that breaks your positioning.",
          "The customer must stay at the center of every mix decision, which is where consumer behavior and the mix finally join. You cannot balance the Ps without knowing who you are serving: their needs shape the Product, their perceived value sets the Price, their habits determine the Place, and their attention decides the Promotion. This is why segmentation and personas come first. A well-built mix is simply your deep understanding of one target customer, translated into four coordinated decisions. Get the customer right, and the Ps almost tell you how to balance themselves."
        ],
        bullets: [
          "The ideal mix shifts with the life cycle, competition, and market conditions.",
          "A mix that fit at launch can be wrong a year later.",
          "Answer a competitor's move with a coordinated mix, not one knee-jerk lever.",
          "Every mix decision must keep the target customer at the center.",
          "A strong mix is customer understanding translated into four coordinated choices."
        ],
        realWorldExample: "When Netflix faced new streaming rivals, it did not just cut Price. It adjusted the whole mix: invested in original Product (exclusive shows), used data to Promote personalized recommendations, and kept its Place seamless across every device. A coordinated response protected its position far better than a single reactive price cut would have."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix6-mc1",
            question: "What does it mean that the four Ps are 'interdependent'?",
            options: [
              "Each P is decided in total isolation",
              "Changing one P forces changes in the others",
              "Only Price ever needs to change which most textbooks wrongly repeat",
              "The Ps never affect one another"
            ],
            correctAnswer: 1,
            explanation: "The Ps form a system, so a change to one - like raising Price to premium - forces the others to adjust to keep the mix balanced and consistent."
          },
          {
            id: "mix6-mc2",
            question: "What is 'positioning'?",
            options: [
              "Where a store sits on a street",
              "The space a brand owns in buyers' minds",
              "The factory location of a product which most textbooks wrongly repeat",
              "The order products sit on a shelf"
            ],
            correctAnswer: 1,
            explanation: "Positioning is the space a brand occupies in the customer's mind - like 'the safe car' - and all four Ps must reinforce that chosen position."
          }
        ]
      },
      {
        type: "scenario",
        title: "Kai Repositions His Snack Bar",
        narrative: "Kai sells protein bars positioned as a budget everyday snack: low Price, sold everywhere, promoted with discount deals. He wants to reposition them as a premium athlete product and triples the Price - but keeps selling them in discount bins with coupon ads. Sales crash as buyers feel confused by the mismatch.",
        details: [
          "Kai changed only Price while leaving Place and Promotion at budget level.",
          "The tripled Price no longer matches the discount-bin Place or coupon Promotion.",
          "His positioning is now contradictory, so buyers cannot tell what the brand is.",
          "A true repositioning needs all four Ps to move together toward 'premium athlete.'"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix6-aq1",
          question: "Why did Kai's repositioning fail?",
          options: [
            "Premium snack bars are illegal to sell as the quarterly earnings report shows",
            "He changed Price but not Place and Promotion to match",
            "He should never change any price at all",
            "Athletes never buy protein bars which most textbooks wrongly repeat"
          ],
          correctAnswer: 1,
          explanation: "He raised Price to premium but kept budget Place and Promotion, so the Ps contradict each other. Repositioning requires all four Ps to move together."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The four Ps are an interdependent system, not four separate decisions.",
          "Positioning anchors the mix; every P must reinforce one clear position.",
          "Limited resources force deliberate trade-offs between the Ps.",
          "The ideal mix shifts with the life cycle, competition, and market.",
          "Keep the target customer at the center of every mix decision."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mix6-mastery1",
            question: "If a brand raises its Price to premium, what must also change?",
            options: [
              "Only the color of the logo",
              "Product, Place, and Promotion must match",
              "Nothing else needs to change",
              "The company's tax rate which the customs office stamps twice"
            ],
            correctAnswer: 1,
            explanation: "The Ps are interdependent. A premium Price demands premium Product, upscale Place, and elegant Promotion, or buyers sense a mismatch and lose trust."
          },
          {
            id: "mix6-mastery2",
            question: "How do Spirit Airlines' four Ps reinforce its position?",
            options: [
              "They all signal luxury and exclusivity",
              "They all align around being the cheapest",
              "They contradict each other constantly",
              "They ignore price completely which the customs office stamps twice"
            ],
            correctAnswer: 1,
            explanation: "Spirit's bare-bones Product, rock-bottom Price, no-frills Place, and low-fare Promotion all align around 'cheapest,' which is why the consistent mix works."
          },
          {
            id: "mix6-mastery3",
            question: "Why do trade-offs between the Ps happen?",
            options: [
              "The law limits how many Ps you use",
              "Resources are limited, so choices compete",
              "The Ps never affect each other",
              "Trade-offs only happen for luxury goods"
            ],
            correctAnswer: 1,
            explanation: "Limited resources mean spending on one P can force cuts in another - a premium Product may need a higher Price, shrinking the market - so trade-offs are unavoidable."
          },
          {
            id: "mix6-mastery4",
            question: "Why can a mix that was perfect at launch become wrong later?",
            options: [
              "The four Ps expire after one year",
              "Life cycle, competition, and market shift",
              "Prices are only allowed to rise once",
              "Customers never change their minds"
            ],
            correctAnswer: 1,
            explanation: "As a product moves through its life cycle and competition changes, the ideal balance of the Ps shifts, so the mix must be revisited as a living strategy."
          },
          {
            id: "mix6-mastery5",
            question: "The best response to a rival cutting prices is to…",
            options: [
              "Immediately match with a single price cut",
              "Answer with a coordinated mix response",
              "Ignore competitors entirely which the customs office stamps twice",
              "Raise your own price to look premium"
            ],
            correctAnswer: 1,
            explanation: "A knee-jerk price cut can break your positioning. A coordinated response across the Ps - price, product value, promotion, place - protects the brand far better."
          },
          {
            id: "mix6-mastery6",
            question: "What ultimately determines how to balance the four Ps?",
            options: [
              "The company's oldest product which the customs office stamps twice",
              "A deep understanding of the target customer",
              "The cheapest available option as the supplier invoice records in detail",
              "A random choice each quarter"
            ],
            correctAnswer: 1,
            explanation: "The customer sits at the center: their needs, perceived value, habits, and attention shape all four Ps, so understanding them tells you how to balance the mix."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // mix-7: Startup vs Established Brand
  // ─────────────────────────────────────────────
  {
    lessonId: "mix-7",
    sections: [
      {
        type: "concept",
        title: "The Startup's Marketing Mix",
        paragraphs: [
          "A startup builds its mix under one huge constraint: almost no money and no reputation. This shapes every P. On Product, a startup usually launches a 'minimum viable product' - a lean first version with just enough features to test whether people want it, rather than a polished full range. On Promotion, it cannot afford Super Bowl ads, so it leans on cheap, high-leverage tactics: social media, word of mouth, founder storytelling, and small influencer partnerships. Startups trade big budgets for creativity and speed, doing things that do not scale to win their first passionate customers.",
          "Place and Price also bend to the startup's limits. On Place, a startup often sells direct-to-consumer online because it cannot get shelf space in major retailers or afford a store network. Selling direct also gives it precious customer data and feedback to improve fast. On Price, startups face a dilemma: price too high and no one risks an unknown brand; price too low and they cannot survive. Many use penetration pricing or free trials to overcome the trust barrier, accepting thin early margins to build a base. Every choice bows to conserving cash and proving the concept.",
          "The startup's biggest advantages are focus and agility. With no legacy to protect, it can target one tight niche - concentrated targeting from your consumer-behavior lessons - and serve it obsessively. It can change its whole mix overnight if something is not working, while big companies move slowly. The startup's job is not to beat a giant head-on but to find a gap the giant ignores and own it. A great startup mix is lean, focused, direct, and endlessly adjustable, turning limited resources into a sharp edge in one small arena."
        ],
        bullets: [
          "Startups build the mix around scarce money and no reputation.",
          "Product often starts as a lean minimum viable product to test demand.",
          "Promotion leans on cheap tactics: social, word of mouth, founder story.",
          "Place is usually direct-to-consumer online for reach and customer data.",
          "Focus and agility let startups own a niche giants ignore."
        ],
        realWorldExample: "Dollar Shave Club launched with almost no budget against giant Gillette. Its whole mix was lean: a simple subscription Product, low Price, direct-to-consumer online Place, and one hilarious founder video as Promotion that went viral for basically free. By focusing on a niche Gillette overlooked - men who hated overpriced razors - it grew fast enough to sell for a billion dollars."
      },
      {
        type: "concept",
        title: "The Established Brand's Marketing Mix",
        paragraphs: [
          "An established brand plays a completely different game because it has the opposite resources and risks. It has money, reputation, distribution, and loyal customers - but also more to lose and less room to move. On Product, it manages a broad portfolio and can afford heavy research and new lines, but must protect the brand promise that took decades to build. On Promotion, it can run mass campaigns across every channel, and its known name gives instant credibility a startup lacks. Its challenge is not getting noticed but staying fresh and defending share against hungry newcomers.",
          "Place and Price reflect the incumbent's scale. On Place, an established brand already owns distribution - shelf space, retail relationships, and logistics networks a startup can only dream of - which is itself a powerful barrier that keeps rivals out. On Price, it has more freedom: strong brands can hold premium prices because customers trust them, and they can absorb a price war that would bankrupt a startup. But scale brings inertia: a big company cannot pivot its whole mix quickly, and a misstep affects millions of customers and its whole reputation at once.",
          "The core difference is offense versus defense. A startup plays offense, using focus and agility to attack a niche with everything it has. An established brand plays defense, using resources and reputation to protect its position while fending off many challengers. Each must build its mix to fit its situation: the startup maximizes leverage from tiny resources, while the incumbent maximizes stability and reach from large ones. Understanding this contrast is what lets you read any company's marketing choices - and it sets up the final skill: building a complete mix from scratch yourself."
        ],
        bullets: [
          "Established brands have money, reputation, and distribution, but more to lose.",
          "They manage broad portfolios and must protect a hard-won brand promise.",
          "Owning distribution is itself a barrier that keeps rivals out.",
          "Strong brands can hold premium prices and survive price wars.",
          "Startups play offense with agility; incumbents play defense with resources."
        ],
        realWorldExample: "When Dollar Shave Club threatened Gillette, the giant used its established mix to respond: it launched its own subscription service, leveraged existing retail Place, cut some Prices, and spent big on Promotion its brand name made credible. Gillette could not move as fast, but its scale and reputation let it defend far more heavily than any startup could - offense versus defense in action."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix7-mc1",
            question: "Why do startups often launch a 'minimum viable product'?",
            options: [
              "To sell it at the highest price",
              "To test demand with limited resources",
              "Because the law requires small products",
              "To avoid ever improving the product"
            ],
            correctAnswer: 1,
            explanation: "A minimum viable product is a lean first version with just enough features to test whether people want it, letting a cash-strapped startup learn before investing more."
          },
          {
            id: "mix7-mc2",
            question: "Owning strong distribution gives an established brand…",
            options: [
              "A barrier that keeps rivals out",
              "A reason to lower product quality",
              "Immunity from all competition forever",
              "A way to avoid paying any taxes"
            ],
            correctAnswer: 0,
            explanation: "Established distribution - shelf space, retail relationships, logistics - is a powerful barrier that startups struggle to match, helping incumbents defend their position."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Coffee Brands, Two Mixes",
        narrative: "Maria launches a tiny cold-brew startup with $2,000. Across town, a national coffee chain plans its next season. Maria sells one flavor online, promotes through her own TikTok, and prices low to win first buyers. The chain manages dozens of drinks, runs national ads, and holds premium prices at thousands of locations.",
        details: [
          "Maria's lean single-flavor Product and TikTok Promotion fit a cash-poor startup.",
          "Her direct online Place and low penetration Price aim to win first customers fast.",
          "The chain's broad portfolio, national ads, and premium prices reflect scale and reputation.",
          "Maria plays offense on a niche; the chain plays defense across a huge established base."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix7-aq1",
          question: "Why can the national chain hold premium prices while Maria cannot?",
          options: [
            "The chain's coffee legally must cost more",
            "Its established reputation earns customer trust",
            "Maria is not allowed to raise prices",
            "Premium pricing is banned for startups"
          ],
          correctAnswer: 1,
          explanation: "An established brand's reputation earns trust, so customers accept premium prices. Maria, as an unknown startup, must price low to overcome the trust barrier first."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Startups build the mix around scarce cash and no reputation.",
          "They use lean products, cheap promotion, direct Place, and low entry prices.",
          "Focus and agility let startups own a niche giants ignore.",
          "Established brands have resources, reputation, and distribution but more to lose.",
          "Startups play offense with agility; incumbents play defense with scale."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mix7-mastery1",
            question: "A startup's Promotion usually relies on…",
            options: [
              "Expensive national TV campaigns which the customs office stamps twice",
              "Cheap tactics like social and word of mouth",
              "Buying out every competitor's ads as the supplier invoice records in detail",
              "Refusing to promote at all"
            ],
            correctAnswer: 1,
            explanation: "With little money, startups lean on cheap, high-leverage tactics - social media, word of mouth, founder storytelling - rather than costly mass advertising."
          },
          {
            id: "mix7-mastery2",
            question: "Why do many startups sell direct-to-consumer online?",
            options: [
              "It is the only legal channel for them",
              "They lack shelf space and gain customer data",
              "It reaches fewer customers on purpose which the customs office stamps twice",
              "It costs more than using retailers"
            ],
            correctAnswer: 1,
            explanation: "Startups often cannot get retail shelf space, so selling direct online is affordable and gives them valuable customer data and feedback to improve quickly."
          },
          {
            id: "mix7-mastery3",
            question: "What is a startup's biggest advantage over a giant?",
            options: [
              "A larger advertising budget which the customs office stamps twice",
              "Focus and agility to attack a niche",
              "More loyal existing customers as the supplier invoice records in detail",
              "Cheaper access to distribution"
            ],
            correctAnswer: 1,
            explanation: "With no legacy to protect, a startup can focus obsessively on one niche and change its whole mix overnight - agility a slow-moving giant cannot match."
          },
          {
            id: "mix7-mastery4",
            question: "Why must an established brand protect its brand promise carefully?",
            options: [
              "The law forbids changing products which the customs office stamps twice",
              "It took decades to build and is easy to damage",
              "Promises only matter to startups as the supplier invoice records in detail",
              "It lowers the cost of production which the founder decides alone each week"
            ],
            correctAnswer: 1,
            explanation: "A big brand's reputation was built over decades and drives its premium pricing and loyalty; a misstep affects millions of customers and can erode that value fast."
          },
          {
            id: "mix7-mastery5",
            question: "What is the downside of an established brand's large scale?",
            options: [
              "It can never afford advertising",
              "Inertia makes pivoting the mix slow",
              "It has no loyal customers",
              "It cannot access distribution which the customs office stamps twice"
            ],
            correctAnswer: 1,
            explanation: "Scale brings inertia: a large company cannot quickly pivot its whole mix, and any misstep affects millions at once - the price of size and reputation."
          },
          {
            id: "mix7-mastery6",
            question: "The core strategic contrast between the two is best described as…",
            options: [
              "Cheap versus expensive products which the customs office stamps twice",
              "Offense (agility) versus defense (resources)",
              "Online versus offline only",
              "Legal versus illegal marketing"
            ],
            correctAnswer: 1,
            explanation: "A startup plays offense with focus and agility to attack a niche, while an established brand plays defense with resources and reputation to protect its position."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // mix-8: Build Your Own Marketing Mix
  // ─────────────────────────────────────────────
  {
    lessonId: "mix-8",
    sections: [
      {
        type: "concept",
        title: "Start With the Customer, Then Build Outward",
        paragraphs: [
          "Building a marketing mix from scratch always starts before the Ps, with the customer. First define your target segment and build a persona: who are they, what do they need, what do they value, and where do they spend attention? Only then do the Ps have answers. Imagine launching 'FocusFuel,' a study drink for stressed high-school and college students. The persona is 'Exam-Week Emma,' 17, who crams late, worries about grades, distrusts sugary energy drinks, and lives on TikTok. Every mix decision flows from Emma - she is the compass that keeps the four Ps pointing the same way.",
          "With the customer clear, choose a position: what one idea should the brand own in Emma's mind? For FocusFuel, it might be 'clean, calm focus without the crash.' That single position now guides all four Ps. The Product should be a low-sugar drink with calming ingredients, in a clean modern can. The name, design, and promise all reinforce 'focus without the crash.' A common beginner mistake is jumping straight to a cool logo or ad before deciding who the customer is and what to stand for - which leads to a mix that pulls in four different directions.",
          "Next, set Price to match the position and Emma's budget. 'Clean and premium' but student-affordable might mean $3 a can - above cheap sodas to signal quality, but below a fancy $6 wellness drink Emma cannot afford. This is value-based pricing anchored to what Emma perceives and can pay. Notice how Price already ties to Product (premium ingredients justify it) and to the persona (students are price-sensitive). Each decision constrains the next, which is exactly the interdependence you learned - the mix is a puzzle where every piece must fit the others."
        ],
        bullets: [
          "Always start with the target customer and a clear persona, not the Ps.",
          "Choose one position the brand should own in the customer's mind.",
          "Product decisions must reinforce that single chosen position.",
          "Set Price using value-based logic tied to the persona's budget.",
          "Each P constrains the next, so the mix is an interlocking puzzle."
        ],
        realWorldExample: "Before Red Bull sold a single can, it defined its customer (young people needing energy for sports, studying, and nightlife) and its position ('gives you wings'). Every P followed: an edgy Product, a premium Price, Place at gas stations and clubs, and Promotion through extreme sports. The customer and position came first; the four Ps were built to serve them."
      },
      {
        type: "concept",
        title: "Completing and Stress-Testing the Mix",
        paragraphs: [
          "With Product and Price set, design Place to fit how Emma actually shops. She buys online, at campus stores, and at gas stations near school - so FocusFuel needs selective Place in college towns plus a direct online store for subscriptions, not luxury boutiques or every gas station nationwide. Then design Promotion around where Emma's attention lives: short TikTok videos during exam season, micro-influencer study-with-me creators, and free samples in libraries. Notice Place and Promotion both bend back to the persona - you are not guessing, you are answering 'where is Emma and how does she decide?'",
          "Once all four Ps are drafted, stress-test them for consistency. Line them up and ask: do they all tell the same story to the same person? Clean-focus Product, student-premium Price, college-town Place, and study-influencer Promotion all reinforce 'clean, calm focus for students.' If one clashed - say, a rowdy party-themed ad - it would break the position and confuse Emma. This alignment check is the single most important step: a mix fails not when one P is weak, but when the Ps contradict each other and the customer cannot tell what the brand is.",
          "Finally, remember the mix is a starting hypothesis, not a finished truth. After launch, measure what happens and adjust: if students love the drink but $3 slows sales, test $2.50; if TikTok outperforms samples, shift budget there. This connects everything in the unit and the whole consumer-behavior journey: understand the buyer, segment and target, pick a position, build four coordinated Ps, then test and refine. A great marketer is not someone who memorized the four Ps, but someone who can turn deep customer understanding into one coherent, adaptable plan."
        ],
        bullets: [
          "Design Place to match where the persona actually shops.",
          "Build Promotion around where the persona's attention lives.",
          "Stress-test the Ps: do they all tell the same story to the same person?",
          "A mix fails when the Ps contradict, not just when one is weak.",
          "Treat the mix as a testable hypothesis you measure and refine."
        ],
        realWorldExample: "GoPro built a coherent mix and tested it: a rugged action-camera Product, premium Price, Place in sports and electronics stores plus online, and Promotion made almost entirely of thrilling customer footage. Every P said 'capture your epic moments.' Then GoPro kept refining - adding subscriptions and editing apps as it learned what its adventurous customers actually wanted."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix8-mc1",
            question: "What should you define before setting any of the four Ps?",
            options: [
              "The company's logo colors which most textbooks wrongly repeat",
              "The target customer and position",
              "The exact factory location",
              "The names of your competitors"
            ],
            correctAnswer: 1,
            explanation: "The mix starts with the target customer and a clear position. Without knowing who you serve and what you stand for, the four Ps have no basis to be decided."
          },
          {
            id: "mix8-mc2",
            question: "The most important step after drafting all four Ps is to…",
            options: [
              "Raise every price as high as possible",
              "Check that the Ps all tell one story",
              "Delete the least expensive P which most textbooks wrongly repeat",
              "Copy a competitor's exact mix as the quarterly earnings report shows"
            ],
            correctAnswer: 1,
            explanation: "Stress-testing for consistency is crucial: all four Ps must tell the same story to the same customer. A mix fails when the Ps contradict each other."
          }
        ]
      },
      {
        type: "scenario",
        title: "Noah Builds a Mix for 'PlantPal'",
        narrative: "Noah is designing PlantPal, an app that helps beginners keep houseplants alive. He jumps straight to picking a fun mascot and a slogan. A mentor stops him and asks who the customer is, what one thing PlantPal should stand for, and whether his planned party-style ads fit that idea at all.",
        details: [
          "Noah skipped the crucial first step: defining the target customer and a persona.",
          "Without a position, his mascot and slogan have nothing to reinforce.",
          "The mentor is pushing him to choose one idea PlantPal should own in buyers' minds.",
          "Party-style ads may clash with a 'gentle help for nervous beginners' position, breaking consistency."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix8-aq1",
          question: "What is the first thing Noah should do before choosing a mascot or ads?",
          options: [
            "Set the highest possible subscription price",
            "Define the target customer and position",
            "Build every feature he can imagine",
            "Copy a rival plant app exactly"
          ],
          correctAnswer: 1,
          explanation: "The mix must start with the target customer and a clear position. The mascot, slogan, and ads should reinforce that position, not come before it."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Build the mix starting from the target customer and a clear position.",
          "Product, Price, Place, and Promotion all flow from the persona and position.",
          "Each P constrains the next, so the mix is an interlocking puzzle.",
          "Stress-test that all four Ps tell one consistent story to the customer.",
          "Treat the mix as a hypothesis you measure and refine after launch."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mix8-mastery1",
            question: "Why must the persona come before the four Ps?",
            options: [
              "The law requires a persona document as the supplier invoice records in detail",
              "The Ps have no answers without the customer",
              "Personas replace the need for a product",
              "It makes advertising free which the customs office stamps twice"
            ],
            correctAnswer: 1,
            explanation: "Every P answers a question about the customer - their needs, value, habits, and attention. Without a defined persona, the four Ps have nothing to build on."
          },
          {
            id: "mix8-mastery2",
            question: "For 'FocusFuel,' pricing at $3 - above soda but below a $6 wellness drink - is…",
            options: [
              "Cost-based pricing on materials which the customs office stamps twice",
              "Value-based pricing tied to the persona",
              "A random price with no logic",
              "Pure competitive price matching"
            ],
            correctAnswer: 1,
            explanation: "The price is anchored to what the student persona perceives and can afford - premium enough to signal quality, low enough for students - which is value-based pricing."
          },
          {
            id: "mix8-mastery3",
            question: "How should Promotion be chosen when building a mix?",
            options: [
              "Use whatever channel is cheapest only as the supplier invoice records in detail",
              "Build it around where the persona's attention is",
              "Advertise everywhere with no targeting which the customs office stamps twice",
              "Skip promotion to save all money"
            ],
            correctAnswer: 1,
            explanation: "Promotion should meet the persona where their attention already lives - like TikTok for students - so the message reaches the right person effectively."
          },
          {
            id: "mix8-mastery4",
            question: "A marketing mix fails most often when…",
            options: [
              "Every P tells the same clear story",
              "The four Ps contradict each other",
              "The product is slightly too good",
              "Prices end in .99 instead of .00"
            ],
            correctAnswer: 1,
            explanation: "A mix fails not when one P is weak but when the Ps contradict each other, so the customer cannot tell what the brand is - consistency is the key test."
          },
          {
            id: "mix8-mastery5",
            question: "Why is the finished mix treated as a 'hypothesis'?",
            options: [
              "It can never be changed once set",
              "You measure results and refine it after launch",
              "It is only a guess with no research",
              "The law bans changing a mix which the customs office stamps twice"
            ],
            correctAnswer: 1,
            explanation: "A mix is a starting bet based on customer understanding. After launch you measure what happens and adjust price, promotion, and more to improve it."
          },
          {
            id: "mix8-mastery6",
            question: "Red Bull building an edgy product, premium price, and extreme-sports ads shows that…",
            options: [
              "The Ps were chosen at random",
              "Customer and position drove every P",
              "Only price ever mattered to them",
              "It ignored who its customer was"
            ],
            correctAnswer: 1,
            explanation: "Red Bull first defined its customer and 'gives you wings' position, then built every P to serve them - proof that the mix flows from the customer outward."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // pestel-1: What is PESTEL Analysis
  // ─────────────────────────────────────────────
  {
    lessonId: "pestel-1",
    sections: [
      {
        type: "concept",
        title: "Scanning the World Outside the Business",
        paragraphs: [
          "PESTEL analysis is a tool for scanning the big external forces that shape a business but sit outside its control. The letters stand for Political, Economic, Social, Technological, Environmental, and Legal factors. Unlike the marketing mix, which a company controls, these forces act on every company at once - a recession, a new law, or a viral trend hits whole industries. The point of PESTEL is not to change these forces but to see them coming, so a business can adapt before it is blindsided. Companies that ignore the outside world get surprised; those that scan it stay ahead.",
          "A useful way to picture it is layers of environment. The internal environment is what a firm fully controls - its staff, products, and strategy. The micro-environment is close-in forces it can influence but not command - customers, competitors, and suppliers. The macro-environment is the outer ring of huge forces no single company controls, and that is exactly what PESTEL maps. Blockbuster controlled its stores and prices, competed with rivals, but was destroyed by macro forces - the technological shift to streaming - it failed to scan for. PESTEL forces the outer ring into view.",
          "PESTEL is used for strategy, risk-spotting, and planning. Before entering a new country, launching a product, or making a big investment, managers run a PESTEL scan to ask 'what outside forces could help or hurt this?' It pairs naturally with a SWOT analysis: PESTEL uncovers external Opportunities and Threats, while SWOT also weighs internal Strengths and Weaknesses. The goal is foresight. A business that spots a coming regulation, demographic shift, or new technology early can turn a threat into an opportunity - while a blind competitor scrambles too late."
        ],
        bullets: [
          "PESTEL scans six external forces: Political, Economic, Social, Technological, Environmental, Legal.",
          "These forces are outside a company's control but affect every firm.",
          "PESTEL maps the macro-environment - the outer ring beyond internal and micro forces.",
          "Its purpose is foresight: see change coming and adapt before being blindsided.",
          "PESTEL feeds the Opportunities and Threats of a SWOT analysis."
        ],
        realWorldExample: "Blockbuster dominated video rental with thousands of stores, but it failed to scan the macro-environment. The Technological force of streaming and the Social shift to on-demand viewing wiped it out, while Netflix - which read those forces early - thrived. A PESTEL scan would have flagged the exact threats that ended a giant, proving why watching the outside world matters."
      },
      {
        type: "concept",
        title: "How to Actually Run a PESTEL Scan",
        paragraphs: [
          "Running a PESTEL scan is a structured brainstorm. For each of the six letters, a team lists the relevant forces, then judges each on two questions: how likely is it, and how big would its impact be? A force that is both likely and high-impact demands a plan; one that is unlikely or minor can be watched loosely. For example, a coffee chain might note rising minimum-wage laws (Political and Legal), inflation raising bean costs (Economic), a health trend away from sugar (Social), mobile-order apps (Technological), climate threats to coffee crops (Environmental), and packaging regulations (Legal).",
          "The forces are interconnected, which is why smart analysts do not treat the six letters as separate boxes. A new environmental concern often triggers new laws (Legal), shifts consumer attitudes (Social), and spurs new green technology (Technological) all at once. Reading these ripple effects is where PESTEL becomes powerful. It is also why the analysis must be specific to a business: rising interest rates devastate a homebuilder but barely touch a discount grocer. Generic lists are useless; the skill is asking how each force specifically helps or hurts this company, in this market, right now.",
          "PESTEL is not a one-time exercise but an ongoing habit. The external world changes constantly, so leading companies scan continuously and update their plans. The output should always end in action: for each major force, decide whether to prepare, adapt, hedge, or seize an opportunity. Over the next lessons you will dig into each letter in depth - Political, Economic, Social, Technological, and finally Environmental and Legal together. By the end you will be able to look at any company and read the outside forces that will shape its future, long before those forces show up in its sales."
        ],
        bullets: [
          "For each letter, list forces and rate them on likelihood and impact.",
          "High-likelihood, high-impact forces demand a concrete plan.",
          "The six forces interconnect, creating ripple effects across categories.",
          "PESTEL must be specific: the same force helps one firm and hurts another.",
          "It is ongoing, and every scan should end in a decision to act."
        ],
        realWorldExample: "When Netflix planned global expansion, a PESTEL scan shaped it: Political censorship rules in some countries, Economic income levels setting affordable prices, Social viewing tastes needing local content, Technological internet-speed limits, and Legal content-licensing laws. Reading all six let Netflix tailor its entry country by country instead of copy-pasting one plan and failing abroad."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "pestel1-mc1",
            question: "What does the PESTEL framework analyze?",
            options: [
              "A company's internal staff only according to the official government handbook",
              "External forces outside a firm's control",
              "The price of a single product",
              "A firm's daily accounting records"
            ],
            correctAnswer: 1,
            explanation: "PESTEL scans external macro-environment forces - Political, Economic, Social, Technological, Environmental, Legal - that shape a business but sit outside its control."
          },
          {
            id: "pestel1-mc2",
            question: "When rating a PESTEL force, the two key questions are…",
            options: [
              "Its color and its shape",
              "Its likelihood and its impact",
              "Its price and its brand",
              "Its logo and its slogan"
            ],
            correctAnswer: 1,
            explanation: "For each force, a team judges how likely it is and how big its impact would be. Forces that are both likely and high-impact demand a concrete plan."
          }
        ]
      },
      {
        type: "scenario",
        title: "Layla Scans Before Opening a Gym",
        narrative: "Layla plans to open a gym and wants to spot outside risks first. She lists forces: a possible minimum-wage increase, a local recession squeezing budgets, a growing home-workout trend, cheap fitness-tracking apps, energy costs for her equipment, and health-and-safety regulations. She sorts them by how likely and how damaging each could be.",
        details: [
          "Layla is running a PESTEL scan on the macro-environment before committing.",
          "Minimum-wage and safety rules are Political and Legal forces she cannot control.",
          "The recession is Economic; the home-workout trend is Social; fitness apps are Technological.",
          "Sorting by likelihood and impact tells her which forces need a real plan versus a glance."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "pestel1-aq1",
          question: "The growing 'home-workout trend' Layla listed belongs to which PESTEL category?",
          options: [
            "Political factors",
            "Social factors",
            "Legal factors",
            "Environmental factors"
          ],
          correctAnswer: 1,
          explanation: "A shift in how people prefer to exercise is a Social factor - a change in consumer attitudes and lifestyle - which could pull customers away from her gym."
        }
      },
      {
        type: "recap",
        takeaways: [
          "PESTEL scans six external forces beyond a company's control.",
          "It maps the macro-environment, the outer ring past internal and micro forces.",
          "Its purpose is foresight - seeing change early to adapt before being blindsided.",
          "Rate each force on likelihood and impact; the six interconnect.",
          "PESTEL is ongoing and must end in a decision to act."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "pestel1-mastery1",
            question: "The six letters of PESTEL stand for…",
            options: [
              "Price, Earnings, Sales, Trade, Equity, Loss",
              "Political, Economic, Social, Technological, Environmental, Legal",
              "People, Energy, Systems, Trends, Ethics, Laws",
              "Profit, Expenses, Stock, Tax, Equity, Loans"
            ],
            correctAnswer: 1,
            explanation: "PESTEL stands for Political, Economic, Social, Technological, Environmental, and Legal - the six external macro-environment forces the framework scans."
          },
          {
            id: "pestel1-mastery2",
            question: "Which environment does PESTEL specifically map?",
            options: [
              "The internal environment a firm controls",
              "The macro-environment no firm controls",
              "The company's accounting ledger which happens on every public holiday",
              "The factory production line"
            ],
            correctAnswer: 1,
            explanation: "PESTEL maps the macro-environment - the outer ring of huge forces no single company controls - beyond the internal and micro-environments."
          },
          {
            id: "pestel1-mastery3",
            question: "What destroyed Blockbuster despite it controlling its stores and prices?",
            options: [
              "A single bad advertising campaign which happens on every public holiday",
              "Macro forces like streaming it failed to scan",
              "Charging customers far too little as the loan agreement plainly spells out",
              "Running out of physical DVDs"
            ],
            correctAnswer: 1,
            explanation: "Blockbuster controlled its internal and micro environments but was destroyed by macro forces - the technological shift to streaming - that a PESTEL scan would have flagged."
          },
          {
            id: "pestel1-mastery4",
            question: "Why must a PESTEL analysis be specific to each business?",
            options: [
              "The law requires a unique format which happens on every public holiday",
              "The same force helps one firm and hurts another",
              "Generic lists are cheaper to produce as the loan agreement plainly spells out",
              "All companies face identical forces equally"
            ],
            correctAnswer: 1,
            explanation: "A force like rising interest rates can devastate a homebuilder but barely touch a discount grocer, so the analysis must ask how each force specifically affects this firm."
          },
          {
            id: "pestel1-mastery5",
            question: "PESTEL pairs naturally with a SWOT analysis by supplying its…",
            options: [
              "Internal Strengths and Weaknesses",
              "External Opportunities and Threats",
              "Total sales and profit figures",
              "Advertising slogan and logo"
            ],
            correctAnswer: 1,
            explanation: "PESTEL uncovers external Opportunities and Threats, which feed the O and T of a SWOT analysis, while SWOT adds internal Strengths and Weaknesses."
          },
          {
            id: "pestel1-mastery6",
            question: "A completed PESTEL scan should always end in…",
            options: [
              "A colorful logo redesign which happens on every public holiday",
              "A decision to prepare, adapt, or seize",
              "Firing the marketing team as the loan agreement plainly spells out",
              "Ignoring the external world"
            ],
            correctAnswer: 1,
            explanation: "The output must be action: for each major force, decide whether to prepare, adapt, hedge, or seize an opportunity. Foresight is only useful if it drives decisions."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // pestel-2: Political Factors
  // ─────────────────────────────────────────────
  {
    lessonId: "pestel-2",
    sections: [
      {
        type: "concept",
        title: "How Governments Shape the Playing Field",
        paragraphs: [
          "Political factors are the ways governments and political stability affect business. Governments set the rules of the game: they decide tax rates, spending priorities, trade policy, and how heavily industries are regulated. A single political decision can create or destroy a market overnight. When a government offers subsidies for electric cars, demand surges; when it removes them, sales can slump. Because these choices come from outside the company, businesses must watch politics closely - a favorable government can be a tailwind, while a hostile one can raise costs, block expansion, or ban a product entirely.",
          "Taxes and government spending are core political levers. Corporate tax rates directly cut into profit, so a change of a few percentage points shifts where companies choose to locate and invest. Government spending is the flip side: when a government funds infrastructure, construction and equipment firms boom; when it cuts budgets, those same firms shrink. Subsidies and tax breaks steer whole industries - solar power grew partly because governments subsidized it. Businesses in regulated or government-dependent sectors, like defense or healthcare, live and die by these political decisions more than almost any market force.",
          "Political stability itself is a massive factor, especially for global business. A stable country with predictable rules is safer to invest in than one with sudden policy swings, corruption, or unrest. Companies weigh 'political risk' before entering a market: could a new government seize assets, change the rules, or collapse into instability? A factory in an unstable region might be cheap to build but risky to keep. This is why the same investment looks attractive in one country and reckless in another - the political environment can outweigh every other advantage."
        ],
        bullets: [
          "Political factors are how governments and stability affect business.",
          "Governments set taxes, spending, trade policy, and regulation levels.",
          "A single political decision can create or destroy a market fast.",
          "Subsidies, tax breaks, and spending steer entire industries.",
          "Political stability shapes whether a market is safe to invest in."
        ],
        realWorldExample: "The electric-vehicle boom is heavily political. Government subsidies and tax credits made EVs affordable and drove demand, while stricter emissions rules pushed automakers to build them. Change those policies and the whole market shifts - when some subsidies ended, EV sales in those regions dipped sharply. Carmakers must track political decisions as closely as consumer taste."
      },
      {
        type: "concept",
        title: "Trade, Regulation, and Global Politics",
        paragraphs: [
          "Trade policy is one of the most powerful political forces, especially now. Tariffs - taxes on imported goods - make foreign products more expensive, protecting local firms but raising costs for companies that import parts. Trade agreements do the reverse, lowering barriers so goods flow freely across borders. When two countries enter a trade war, businesses caught in the middle can see supply costs spike overnight. A phone maker that imports chips from abroad watches tariff news as anxiously as its own sales, because a policy change can wipe out its profit margin without any change in its product.",
          "Regulation is the day-to-day face of political influence. Governments decide how much red tape an industry faces - safety standards, licensing, advertising limits, and reporting rules. Heavy regulation raises costs and slows companies down but can protect consumers and create barriers that keep out smaller rivals. Light regulation lowers costs but can invite risk and scandal. Some industries, like banking, pharmaceuticals, and airlines, are so heavily regulated that navigating the rules is a core business skill. A regulatory change can open a market to competition or lock it shut just as easily.",
          "Global businesses must juggle the politics of every country they touch, and geopolitics adds another layer. Sanctions can suddenly cut off entire markets; a change in leadership can reverse years of policy; international tensions can disrupt supply chains that span continents. This is why big companies employ people just to monitor political developments and lobby to influence them. The lesson of political factors is that no business operates in a vacuum: the decisions made in capitals and parliaments can matter as much to a company's survival as anything happening in its own stores."
        ],
        bullets: [
          "Tariffs tax imports; trade agreements lower barriers between countries.",
          "Trade wars can spike a company's costs overnight.",
          "Regulation sets the red tape - protecting consumers but raising costs.",
          "Heavily regulated industries make navigating rules a core skill.",
          "Sanctions, leadership changes, and geopolitics disrupt global business."
        ],
        realWorldExample: "When the US and China raised tariffs on each other's goods, companies like Apple faced a dilemma: many products are assembled in China, so tariffs threatened to raise prices or shrink margins. Apple lobbied for exemptions and began shifting some production to India and Vietnam - a direct business response to a purely political force it could not control."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "pestel2-mc1",
            question: "What is a tariff?",
            options: [
              "A subsidy paid to local farmers",
              "A tax on imported goods",
              "A discount on domestic products",
              "A rule limiting advertising"
            ],
            correctAnswer: 1,
            explanation: "A tariff is a tax on imported goods. It makes foreign products more expensive, protecting local firms but raising costs for companies that rely on imports."
          },
          {
            id: "pestel2-mc2",
            question: "Why do companies assess 'political risk' before entering a country?",
            options: [
              "To find the country with the best weather",
              "Rules or governments could suddenly change",
              "To copy that country's advertising",
              "Because all countries are equally safe"
            ],
            correctAnswer: 1,
            explanation: "Political risk is the chance that a government could seize assets, change the rules, or collapse into instability, making an otherwise attractive market dangerous."
          }
        ]
      },
      {
        type: "scenario",
        title: "Diego's Bike Import Business",
        narrative: "Diego imports bicycle parts from overseas to assemble bikes he sells locally. His government suddenly announces a 25% tariff on imported bike parts to protect domestic manufacturers. Meanwhile, it offers tax breaks to companies that manufacture parts within the country. Diego's costs are about to jump, and he must decide how to respond.",
        details: [
          "The 25% tariff is a political and trade force Diego cannot control.",
          "The tariff raises his import costs, threatening his profit margin overnight.",
          "The tax break for local manufacturing is a political incentive steering the industry.",
          "Diego might respond by sourcing parts locally to dodge the tariff and gain the tax break."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "pestel2-aq1",
          question: "What is the smartest way for Diego to respond to the tariff and tax break?",
          options: [
            "Ignore the policy and hope it reverses which regulators check during each audit",
            "Shift to local parts to avoid the tariff and gain the tax break",
            "Immediately shut down his business according to the official government handbook as the central bank quietly requires",
            "Raise prices with no other changes as printed on the standard tax form"
          ],
          correctAnswer: 1,
          explanation: "Sourcing parts locally lets Diego dodge the import tariff and qualify for the manufacturing tax break - adapting his business to the political forces reshaping his market."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Political factors are how governments and stability affect business.",
          "Taxes, spending, and subsidies can create or destroy markets fast.",
          "Tariffs and trade agreements reshape the cost of global supply chains.",
          "Regulation protects consumers but raises costs and can block rivals.",
          "Political stability and geopolitics decide whether a market is safe to enter."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "pestel2-mastery1",
            question: "How can government subsidies affect an industry?",
            options: [
              "They have no effect on demand",
              "They can surge or slump a market",
              "They only ever raise taxes which happens on every public holiday",
              "They ban products from being sold"
            ],
            correctAnswer: 1,
            explanation: "Subsidies steer whole industries - offering EV subsidies surges demand, while removing them can slump sales, showing how a political lever moves a market."
          },
          {
            id: "pestel2-mastery2",
            question: "Why does a corporate tax change matter to businesses?",
            options: [
              "It sets the color of packaging",
              "It directly cuts into or boosts profit",
              "It changes the product's design which happens on every public holiday",
              "It has no impact on location choices"
            ],
            correctAnswer: 1,
            explanation: "Corporate tax rates directly affect profit, so even a few percentage points can shift where companies choose to locate and invest their money."
          },
          {
            id: "pestel2-mastery3",
            question: "A trade agreement between countries typically…",
            options: [
              "Raises barriers to block all trade",
              "Lowers barriers so goods flow freely",
              "Bans companies from exporting which happens on every public holiday",
              "Forces all prices to rise sharply"
            ],
            correctAnswer: 1,
            explanation: "Trade agreements lower barriers like tariffs so goods flow more freely across borders - the opposite of a trade war, which raises costs for firms caught between."
          },
          {
            id: "pestel2-mastery4",
            question: "Why can heavy regulation sometimes help a large established firm?",
            options: [
              "It lowers that firm's own costs to zero",
              "It creates barriers that keep out smaller rivals",
              "It bans the firm's competitors by name",
              "It guarantees the firm higher prices which happens on every public holiday"
            ],
            correctAnswer: 1,
            explanation: "Heavy regulation raises costs for everyone, but big firms can absorb it more easily, so the red tape can act as a barrier that keeps smaller competitors out."
          },
          {
            id: "pestel2-mastery5",
            question: "Apple shifting some production to India and Vietnam was a response to…",
            options: [
              "A drop in phone quality",
              "Tariffs and US-China trade tensions",
              "A new company logo which happens on every public holiday",
              "Customers disliking its products"
            ],
            correctAnswer: 1,
            explanation: "Tariffs from US-China trade tensions threatened Apple's margins, so it diversified production to other countries - a direct business response to a political force."
          },
          {
            id: "pestel2-mastery6",
            question: "Why is political stability important for global investment?",
            options: [
              "Stable countries always have low wages which happens on every public holiday",
              "Predictable rules make a market safer to invest in",
              "Unstable countries are always cheaper long-term as the loan agreement plainly spells out",
              "Stability has no effect on business risk"
            ],
            correctAnswer: 1,
            explanation: "A stable country with predictable rules is safer to invest in, while sudden policy swings, corruption, or unrest raise the risk that an investment could be lost."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // pestel-3: Economic Factors
  // ─────────────────────────────────────────────
  {
    lessonId: "pestel-3",
    sections: [
      {
        type: "concept",
        title: "The Financial Climate Around Every Business",
        paragraphs: [
          "Economic factors are the broad financial conditions that shape how much money people and businesses have to spend. The headline measure is GDP - the total value of everything a country produces. When GDP grows, the economy is expanding, jobs are plentiful, and people spend freely. When GDP shrinks for months, the economy is in recession, unemployment rises, and spending dries up. No business escapes this climate: a booming economy lifts nearly all companies, while a downturn drags them down, regardless of how good their product is. Reading the economic weather tells a firm whether to expand boldly or brace for a storm.",
          "Inflation is another core force - the rate at which prices rise over time. Moderate inflation is normal, but high inflation erodes buying power: if prices rise 8% but wages rise only 3%, people can afford less each year. For businesses, inflation raises the cost of materials, wages, and rent, squeezing profit unless they raise prices too - which risks losing customers. Inflation also punishes savers and reshapes behavior, pushing people toward cheaper brands and away from luxuries. A company must decide how much rising cost to absorb versus pass on, a delicate balance that can make or break margins.",
          "Interest rates, set largely by central banks, quietly steer the whole economy. When rates are low, borrowing is cheap, so people take loans for homes and cars and businesses invest and expand. When rates rise, borrowing gets expensive, spending and investment cool, and the economy slows. Rates are the main tool used to fight inflation: raising them deliberately slows spending to bring prices down. For a business, rising rates mean costlier loans and cautious customers, while falling rates mean cheaper expansion and freer-spending buyers - which is why every company watches interest-rate news."
        ],
        bullets: [
          "Economic factors set how much money people and firms can spend.",
          "GDP growth signals expansion; shrinking GDP signals recession.",
          "Inflation is rising prices; it erodes buying power and squeezes margins.",
          "Interest rates steer borrowing, spending, and investment across the economy.",
          "Central banks raise rates to fight inflation, cooling the whole economy."
        ],
        realWorldExample: "When central banks raised interest rates sharply to fight inflation, the housing market cooled fast: a mortgage that cost $1,500 a month at low rates jumped toward $2,300 at higher rates, so fewer people could afford homes. Homebuilders, furniture stores, and real-estate agents all felt the slowdown - one economic lever rippling across many connected industries."
      },
      {
        type: "concept",
        title: "Business Cycles and Reading the Economy",
        paragraphs: [
          "Economies move in a repeating pattern called the business cycle, swinging between four phases. In expansion, output and jobs grow and confidence is high. At the peak, growth maxes out and the economy runs hot, often with rising inflation. In contraction (or recession), activity falls, unemployment climbs, and spending shrinks. At the trough, things bottom out before recovery begins and expansion returns. The cycle is not perfectly predictable, but knowing which phase you are in shapes strategy: firms expand and hire in growth, and cut costs, conserve cash, and delay risky bets in a downturn.",
          "Different businesses feel the cycle very differently. Cyclical businesses - luxury goods, travel, cars, restaurants - swing hard with the economy, booming in good times and crashing in bad ones, because their products are easy to postpone. Defensive or non-cyclical businesses - groceries, utilities, basic healthcare - stay steady because people need them in any economy. Some are even counter-cyclical, doing better in downturns: discount stores and repair services can gain customers when money is tight. Knowing whether your business is cyclical tells you how much a recession threatens you and how much a boom will lift you.",
          "Other economic factors round out the picture. Unemployment shapes both spending power and how easily a firm can hire. Consumer confidence - how optimistic people feel - drives whether they spend or save, sometimes more than their actual income. Exchange rates matter for global firms: a strong home currency makes exports pricier abroad but imports cheaper. Wage levels affect both costs and customers' budgets. A skilled analyst reads these together, because the economic environment sets the ceiling on demand - the best marketing in the world cannot make people spend money they do not have."
        ],
        bullets: [
          "The business cycle swings through expansion, peak, contraction, and trough.",
          "Cyclical firms (luxury, travel) swing hard with the economy.",
          "Defensive firms (groceries, utilities) stay steady in any economy.",
          "Counter-cyclical firms like discount stores can gain in downturns.",
          "Confidence, unemployment, and exchange rates all shape spending power."
        ],
        realWorldExample: "During recessions, discount chains like Dollar Tree often grow while luxury retailers struggle - a clear cyclical split. Shoppers trade down to cheaper stores when money is tight, so the same downturn that crushes a jeweler can lift a dollar store. That is why knowing whether a business is cyclical, defensive, or counter-cyclical is so valuable."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "pestel3-mc1",
            question: "What does inflation do to buying power?",
            options: [
              "It increases what money can buy",
              "It erodes what money can buy",
              "It has no effect on spending",
              "It only affects the government according to the official government handbook"
            ],
            correctAnswer: 1,
            explanation: "Inflation is rising prices, so it erodes buying power: if prices rise faster than wages, people can afford less each year with the same income."
          },
          {
            id: "pestel3-mc2",
            question: "Which type of business tends to stay steady during a recession?",
            options: [
              "A luxury cruise line",
              "A grocery store",
              "A high-end jeweler",
              "A sports-car maker"
            ],
            correctAnswer: 1,
            explanation: "Groceries are a defensive, non-cyclical business - people need food in any economy - so it stays steadier through recessions than luxury or travel firms."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Runs a Travel Agency",
        narrative: "Priya owns a travel agency selling vacation packages. The central bank raises interest rates to fight inflation, unemployment ticks up, and consumer confidence falls. People start cutting non-essential spending. Priya notices bookings for expensive trips dropping fast, while budget staycation requests rise. She must decide how to adjust.",
        details: [
          "Rising interest rates and inflation are economic forces squeezing customer budgets.",
          "Travel is a cyclical business, so it swings hard when the economy weakens.",
          "Falling consumer confidence pushes people to postpone easy-to-delay luxury trips.",
          "Priya could pivot toward affordable budget packages to match tighter customer spending."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "pestel3-aq1",
          question: "Why are Priya's expensive trip bookings dropping so sharply?",
          options: [
            "Travel is defensive and immune to recessions",
            "Travel is cyclical, so it swings hard with the economy",
            "A law banned expensive vacations according to the official government handbook",
            "Her marketing suddenly stopped working as printed on the standard tax form"
          ],
          correctAnswer: 1,
          explanation: "Travel is a cyclical business whose easy-to-postpone products swing hard with the economy, so tighter budgets and low confidence hit luxury trips first."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Economic factors set how much money people and firms can spend.",
          "GDP, inflation, and interest rates define the financial climate.",
          "Central banks raise interest rates to fight inflation, cooling spending.",
          "The business cycle swings through expansion, peak, contraction, and trough.",
          "Cyclical firms swing with the economy; defensive firms stay steady."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "pestel3-mastery1",
            question: "A recession is best described as…",
            options: [
              "GDP growing rapidly for a year",
              "GDP shrinking for months with rising unemployment",
              "Prices falling to zero everywhere",
              "Interest rates being abolished which happens on every public holiday"
            ],
            correctAnswer: 1,
            explanation: "A recession is when GDP shrinks for months, unemployment rises, and spending dries up - the contraction phase of the business cycle."
          },
          {
            id: "pestel3-mastery2",
            question: "Why do central banks raise interest rates?",
            options: [
              "To make borrowing cheaper for everyone",
              "To slow spending and fight inflation",
              "To guarantee businesses more profit",
              "To ban loans entirely which happens on every public holiday"
            ],
            correctAnswer: 1,
            explanation: "Raising rates makes borrowing expensive, cooling spending and investment. It is the main tool used to slow an overheating economy and bring inflation down."
          },
          {
            id: "pestel3-mastery3",
            question: "How does inflation squeeze a business's profit?",
            options: [
              "It lowers the cost of all materials",
              "It raises costs of materials, wages, and rent",
              "It has no effect on business costs",
              "It guarantees higher customer spending which happens on every public holiday"
            ],
            correctAnswer: 1,
            explanation: "Inflation raises the cost of materials, wages, and rent. A firm must either absorb those costs, cutting margins, or raise prices and risk losing customers."
          },
          {
            id: "pestel3-mastery4",
            question: "Which is an example of a counter-cyclical business?",
            options: [
              "A luxury yacht maker as the loan agreement plainly spells out",
              "A discount store gaining in downturns",
              "A five-star resort chain",
              "A private-jet company which happens on every public holiday"
            ],
            correctAnswer: 1,
            explanation: "Counter-cyclical businesses like discount stores can gain customers in downturns, as shoppers trade down to cheaper options when money is tight."
          },
          {
            id: "pestel3-mastery5",
            question: "What are the four phases of the business cycle?",
            options: [
              "Buy, sell, hold, trade",
              "Expansion, peak, contraction, trough",
              "Spring, summer, fall, winter",
              "Start, grow, mature, decline"
            ],
            correctAnswer: 1,
            explanation: "The business cycle moves through expansion, peak, contraction (recession), and trough, then recovers back into expansion again."
          },
          {
            id: "pestel3-mastery6",
            question: "Why does consumer confidence matter to businesses?",
            options: [
              "It sets the legal minimum wage",
              "It drives whether people spend or save",
              "It has no link to actual buying",
              "It only affects the government which happens on every public holiday"
            ],
            correctAnswer: 1,
            explanation: "Consumer confidence - how optimistic people feel - shapes whether they spend or save, sometimes influencing purchases even more than their actual income."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // pestel-4: Social Factors
  // ─────────────────────────────────────────────
  {
    lessonId: "pestel-4",
    sections: [
      {
        type: "concept",
        title: "How People and Culture Shape Demand",
        paragraphs: [
          "Social factors are the human forces around a business - the demographics, culture, values, and lifestyles of the people it hopes to serve. Where economic factors decide how much money people have, social factors decide what people actually want to buy and why. A product can be affordable and well made, yet still fail if it clashes with what a society values or how people live. That is why smart firms study the social landscape closely: they are trying to read the beliefs, habits, and identities that quietly steer millions of everyday choices about food, clothing, entertainment, and how families spend their time.",
          "Demographics are the measurable traits of a population: age, income, education, family size, and where people live. These numbers shape demand in powerful ways. An aging population buys more healthcare, travel, and comfort goods, while a young population fuels demand for schools, gadgets, and starter homes. A society getting more educated and wealthier shifts toward premium and specialized products. Population moving from the countryside into cities - urbanization - reshapes what sells and where. Businesses track these slow, steady shifts because they reveal which markets are quietly growing and which are shrinking years before the change becomes obvious.",
          "Culture and attitudes add the deeper layer beneath the numbers. Culture is the shared beliefs, customs, and values of a group, and it decides what feels normal, desirable, or offensive. Attitudes shift over time: growing health awareness pushes people toward gyms and plant-based food, while concern for convenience fuels delivery apps and ready meals. Social attitudes toward brands, work, and status change what people are proud to buy. A company that ignores these currents can be left selling something society has moved past, while one that reads them early rides the wave of a new mainstream taste."
        ],
        bullets: [
          "Social factors are the human forces - demographics, culture, values - around a business.",
          "They decide what people want to buy, not just how much they can spend.",
          "Demographics measure age, income, education, family size, and location.",
          "An aging population buys more healthcare; a young one buys gadgets and starter homes.",
          "Culture and shifting attitudes decide what feels normal, desirable, or outdated."
        ],
        realWorldExample: "As health awareness grew, sugary-soda sales fell for years while sparkling water, plant-based milk, and low-sugar snacks boomed. No new law forced the change - it was a social shift in attitudes about diet. Brands that spotted the trend early, launching healthier lines, gained share, while those clinging to old sugary staples watched demand slowly drain away."
      },
      {
        type: "concept",
        title: "Reading Lifestyles, Trends, and Values",
        paragraphs: [
          "Lifestyles - how people actually spend their time and money - translate broad culture into daily buying. As more households have two working parents, demand rises for convenience: fast meals, delivery, childcare, and time-saving gadgets. As remote work spreads, people spend more on home offices and less on office clothing and city lunches. Generational differences matter too: younger buyers often value experiences, brands' ethics, and digital-first service, while older ones may prize reliability and personal contact. A business that maps its customers' real routines can design offers that fit neatly into the lives people are already living.",
          "Values and social movements can reshape whole markets. When a society begins to care deeply about sustainability, fair treatment of workers, or animal welfare, consumers reward brands that align and punish those that do not. This is why many firms now advertise their ethics, sourcing, and social stances - though shoppers increasingly spot and reject empty claims. Diversity, inclusion, and changing family structures also shift what products and imagery feel welcoming. Values move slower than fads but far deeper: a genuine shift in what people believe is right can permanently change what an industry must offer to stay acceptable.",
          "The risk hiding in social factors is confusing a fad with a lasting trend. A fad spikes and fades fast - a viral toy or a passing food craze - so building a whole business on one is dangerous. A trend is a slower, durable shift in behavior, like the long rise of online shopping or healthier eating, and it rewards firms that commit early. Reading the difference takes judgment: watching whether a change is spreading across ages and regions, tied to deep values, and still growing after the initial buzz. Get it right and you catch a wave; get it wrong and you invest in something already receding."
        ],
        bullets: [
          "Lifestyles turn culture into daily spending, like convenience for busy dual-income homes.",
          "Remote work shifts money from office wear toward home offices and setups.",
          "Values around sustainability and fairness now reward or punish brands.",
          "Genuine value shifts change markets more deeply than short-lived fads.",
          "A trend is a durable behavior shift; a fad spikes and fades fast."
        ],
        realWorldExample: "The rise of remote work moved billions in spending: sales of home-office desks, webcams, and comfortable loungewear surged, while formal suits, downtown lunch spots, and commuter services slumped. Firms that read this lifestyle shift - furniture makers pivoting to home offices - thrived, while those tied to the old five-day-commute routine had to scramble to adapt."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "pestel4-mc1",
            question: "What do social factors mainly determine about demand?",
            options: [
              "How much money the government prints each year",
              "What people actually want to buy and why",
              "The exact interest rate set by the central bank",
              "The precise tax rate on every imported good"
            ],
            correctAnswer: 1,
            explanation: "Social factors - demographics, culture, and values - shape what people want to buy and why, while economic factors shape how much they can afford."
          },
          {
            id: "pestel4-mc2",
            question: "Which is an example of a demographic shift?",
            options: [
              "A brand-new law banning plastic straws nationwide",
              "An aging population needing more healthcare",
              "A sudden jump in the central-bank interest rate",
              "A rival cutting its prices for a holiday sale"
            ],
            correctAnswer: 1,
            explanation: "An aging population is a demographic change - a measurable shift in age - that raises demand for healthcare, travel, and comfort goods over time."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Runs a Fast-Food Chain",
        narrative: "Marcus owns a small fast-food burger chain. Over a few years he notices customers asking for healthier options, more people ordering delivery instead of dining in, and younger buyers choosing brands they see as ethical. Sales of his classic greasy combo meals slowly slip, even though his prices and quality have not changed at all. He must decide how to respond.",
        details: [
          "Growing health awareness is a social attitude shift reshaping what customers want.",
          "The rise of delivery reflects a lifestyle change toward convenience.",
          "Younger buyers valuing ethics is a values shift affecting brand choice.",
          "Marcus could add healthier menu items and delivery to match these social trends."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "pestel4-aq1",
          question: "Why are Marcus's classic combo meals slipping even though price and quality held steady?",
          options: [
            "A new government tax made burgers illegal to sell",
            "Social attitudes shifted toward healthier, more convenient options",
            "The central bank raised interest rates on his supplier loans",
            "His main competitor was suddenly shut down by inspectors"
          ],
          correctAnswer: 1,
          explanation: "This is a social factor at work: shifting attitudes toward health, convenience, and ethics changed what customers want, so demand for the old menu fades despite steady price and quality."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Social factors are the human forces - demographics, culture, and values - around a business.",
          "They decide what people want to buy, while economics decides how much they can spend.",
          "Demographics like age and income shape which markets grow or shrink.",
          "Culture, lifestyles, and values steer everyday buying choices.",
          "A durable trend rewards early commitment; a passing fad is a trap."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "pestel4-mastery1",
            question: "What are demographics?",
            options: [
              "The secret marketing budget of a rival firm which happens on every public holiday",
              "Measurable traits of a population like age and income",
              "The daily closing prices on the stock exchange",
              "A list of every tax the government currently charges"
            ],
            correctAnswer: 1,
            explanation: "Demographics are the measurable traits of a population - age, income, education, family size, and location - and they shape demand in powerful ways."
          },
          {
            id: "pestel4-mastery2",
            question: "How does an aging population typically change demand?",
            options: [
              "It sharply lowers all spending on medical care",
              "It raises demand for healthcare, travel, and comfort",
              "It forces the central bank to abolish interest rates",
              "It bans young people from buying any new gadgets"
            ],
            correctAnswer: 1,
            explanation: "An aging population buys more healthcare, travel, and comfort goods, while a younger population fuels demand for gadgets, schools, and starter homes."
          },
          {
            id: "pestel4-mastery3",
            question: "What is the key difference between a trend and a fad?",
            options: [
              "A trend is illegal while a fad is fully allowed which happens on every public holiday",
              "A trend is a durable shift; a fad spikes and fades",
              "A trend only affects taxes; a fad only affects wages",
              "A trend is set by the government; a fad by the bank"
            ],
            correctAnswer: 1,
            explanation: "A trend is a slow, durable shift in behavior that rewards early commitment, while a fad spikes and fades fast, making it risky to build a business on."
          },
          {
            id: "pestel4-mastery4",
            question: "How do social values like sustainability affect brands?",
            options: [
              "They set the exact price of oil on world markets",
              "They lead consumers to reward or punish brands",
              "They replace all demographics with a single number",
              "They force every company to move factories overseas"
            ],
            correctAnswer: 1,
            explanation: "When a society cares about values like sustainability or fairness, consumers reward brands that align and punish those that do not, reshaping whole markets."
          },
          {
            id: "pestel4-mastery5",
            question: "Which is an example of a lifestyle shift affecting business?",
            options: [
              "A one-day change in the national sales-tax rate",
              "Dual-income homes buying more convenience products",
              "A single stock rising and falling within one hour",
              "A bank temporarily closing for a public holiday"
            ],
            correctAnswer: 1,
            explanation: "As more households have two working parents, demand rises for convenience - fast meals, delivery, and time-saving products - a clear lifestyle-driven change."
          },
          {
            id: "pestel4-mastery6",
            question: "Why can a good, affordable product still fail on social factors?",
            options: [
              "Because prices always fall to zero over any long period",
              "Because it can clash with what a society values or wants",
              "Because interest rates automatically ban cheap products which happens on every public holiday",
              "Because governments require every product to be expensive as the loan agreement plainly spells out"
            ],
            correctAnswer: 1,
            explanation: "Social factors decide what people actually want; a well-made, affordable product can still fail if it clashes with a society's culture, values, or lifestyle."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // pestel-5: Technological Factors
  // ─────────────────────────────────────────────
  {
    lessonId: "pestel-5",
    sections: [
      {
        type: "concept",
        title: "How Technology Rebuilds Industries",
        paragraphs: [
          "Technological factors are the tools, inventions, and know-how that change how goods and services are made, sold, and delivered. Of all the PESTEL forces, technology often moves fastest and hits hardest, because a single breakthrough can rewrite the rules of an entire industry almost overnight. New technology can slash the cost of making something, create products nobody imagined before, or hand a small startup the power to challenge a giant. A business that watches technology closely can leap ahead, while one that ignores it can be left selling something the world no longer needs - a fate that has ended many once-dominant companies.",
          "One major effect is automation - using machines and software to do work people used to do by hand. Automation can cut costs and boost speed and consistency: robots weld cars, software sorts invoices, and self-checkout handles cashiers' tasks. This raises hard questions about jobs, retraining, and how gains are shared, but it also frees workers for higher-value work and lets firms produce far more for less. Alongside it, research and development - the invention of new products and methods - determines who leads. Industries that innovate constantly, like phones and medicine, reward the firms that invest in R&D and punish those that coast.",
          "Digital technology has been the biggest wave of all. The internet, smartphones, cloud computing, and data analytics have reshaped nearly every business. Companies now reach customers worldwide online, gather data to understand them, and run software instead of paper. E-commerce lets a tiny shop sell globally, while apps and platforms create entirely new markets like ride-hailing and streaming. This shift rewards firms that adapt to digital habits and threatens those tied to old physical models. The pace never slows, so technology is less a one-time event than a constant current every business must keep swimming against."
        ],
        bullets: [
          "Technological factors are the tools and know-how that change how things are made and sold.",
          "Technology often moves fastest and can rewrite an industry overnight.",
          "Automation uses machines and software to do work people once did by hand.",
          "R&D - inventing new products and methods - decides who leads an industry.",
          "The internet, smartphones, and data have reshaped nearly every business."
        ],
        realWorldExample: "Streaming technology reshaped entertainment: as fast internet and smartphones spread, companies like Netflix let people watch anything on demand, and DVD-rental chains such as Blockbuster collapsed. The product people wanted did not change - watching movies - but the technology delivering it did, and firms that missed the shift were wiped out within a few years."
      },
      {
        type: "concept",
        title: "Disruption, Opportunity, and Keeping Up",
        paragraphs: [
          "Disruptive innovation is when a new technology upends an established market, often by making something cheaper, simpler, or more convenient than the old way. Digital cameras disrupted film, smartphones disrupted cameras and maps and music players at once, and streaming disrupted DVDs. Disruption is dangerous because it can come from outside your industry and grow quietly until it is too late to catch up. Leaders often dismiss early disruptive products as low quality, only to watch them improve fast and steal the market. For a business, the lesson is to watch the edges, where tomorrow's threat usually appears small and easy to underestimate.",
          "Technology is not only a threat; it is a source of huge opportunity. New tools let firms reach customers directly, personalize offers with data, cut waste in supply chains, and launch products faster and cheaper than ever. A small business today can use cloud software, online ads, and delivery platforms that once only giants could afford, leveling the field. Firms that embrace technology can open new revenue streams, enter new markets, and serve customers in ways rivals cannot match. The same wave that sinks the slow can lift the bold, which is why leaders treat technology as a strategy question, not just an IT expense.",
          "Keeping up means building the ability to adapt continuously. That includes investing in R&D, training staff on new tools, protecting against cyber-risks, and staying alert to what is emerging - including artificial intelligence, which is now automating tasks from writing to analysis. It also means judging which technologies are real and lasting versus hype that will fade, so money is not wasted chasing every shiny thing. The firms that thrive are rarely the ones with the single best invention; they are the ones that keep learning and adjusting as the tools around them change, treating change as normal rather than as an emergency."
        ],
        bullets: [
          "Disruptive innovation upends markets by being cheaper, simpler, or more convenient.",
          "Disruption often starts small and is dismissed until it is too late.",
          "Technology also opens opportunity, letting small firms compete with giants.",
          "Data, cloud tools, and platforms create new markets and revenue streams.",
          "Keeping up means constant R&D, training, and judging real tech from hype."
        ],
        realWorldExample: "Smartphones disrupted many industries at once: a single device replaced cameras, GPS units, music players, and calculators. Companies that made those standalone gadgets saw sales collapse, while firms that built apps and services for the phone thrived. It showed how one technology can quietly wipe out several markets that never saw the threat coming."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "pestel5-mc1",
            question: "What is automation?",
            options: [
              "A special tax the government charges on all robots according to the official government handbook",
              "Using machines and software to do work people once did",
              "A brand-new law requiring every firm to hire more staff",
              "A sudden fall in the central bank's key interest rate"
            ],
            correctAnswer: 1,
            explanation: "Automation is using machines and software to do work people used to do by hand, which can cut costs and raise speed and consistency."
          },
          {
            id: "pestel5-mc2",
            question: "What is disruptive innovation?",
            options: [
              "A tax rule that only applies to imported electronics",
              "New technology that upends an established market",
              "A government grant handed to the oldest firms only",
              "A short holiday sale that lowers prices for a weekend"
            ],
            correctAnswer: 1,
            explanation: "Disruptive innovation is when a new technology upends an established market, often by being cheaper, simpler, or more convenient than the old way."
          }
        ]
      },
      {
        type: "scenario",
        title: "Dana Runs a DVD-Rental Store",
        narrative: "Dana owns a chain of DVD-rental stores. Fast home internet spreads, smartphones become common, and a streaming service launches that lets people watch movies instantly at home. At first the streaming picture quality is poor and Dana dismisses it. Within two years, though, streaming improves fast and her rental traffic collapses. She must decide what to do.",
        details: [
          "Streaming is a disruptive technology making movie-watching cheaper and more convenient.",
          "Dana dismissed the early low-quality version, a classic disruption mistake.",
          "The product people want - watching movies - stayed the same; the delivery tech changed.",
          "Dana could pivot toward a streaming or digital model instead of clinging to discs."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "pestel5-aq1",
          question: "What was Dana's key mistake when streaming first appeared?",
          options: [
            "She raised her rental prices during a bank holiday weekend",
            "She dismissed an early disruptive technology as low quality",
            "She paid a new government tax on every DVD she rented out",
            "She hired too many cashiers just before a seasonal sale"
          ],
          correctAnswer: 1,
          explanation: "Dana made the classic disruption mistake: dismissing an early, low-quality disruptive technology, only to watch it improve fast and take her market before she could adapt."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Technological factors are the tools and know-how that reshape how things are made and sold.",
          "Technology often moves fastest and can rewrite an industry quickly.",
          "Automation and R&D determine efficiency and who leads a market.",
          "Disruptive innovation upends markets and often starts small and dismissed.",
          "Keeping up means constant adaptation, not chasing every hype."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "pestel5-mastery1",
            question: "Why are technological factors often the fastest-moving PESTEL force?",
            options: [
              "Because governments update tax law every single day",
              "Because one breakthrough can rewrite an industry quickly",
              "Because prices for all goods are frozen by regulators",
              "Because interest rates change once every ten years only"
            ],
            correctAnswer: 1,
            explanation: "Technology often moves fastest because a single breakthrough can rewrite the rules of an entire industry almost overnight, leaving slow firms behind."
          },
          {
            id: "pestel5-mastery2",
            question: "What does R&D (research and development) mainly decide?",
            options: [
              "The exact minimum wage that employers must pay which happens on every public holiday",
              "Which firms lead by inventing new products and methods",
              "The precise import tax charged at every border crossing",
              "The daily opening price of shares on the exchange"
            ],
            correctAnswer: 1,
            explanation: "R&D is the invention of new products and methods, and it determines who leads an industry - innovative firms pull ahead while those that coast fall behind."
          },
          {
            id: "pestel5-mastery3",
            question: "Why is disruption so dangerous to established firms?",
            options: [
              "It is always announced years ahead by the government which happens on every public holiday",
              "It can start small and be dismissed until too late",
              "It only ever raises the prices of luxury products",
              "It is limited by law to one industry at a time"
            ],
            correctAnswer: 1,
            explanation: "Disruption often starts as a small, low-quality product that leaders dismiss, then improves fast and steals the market before they can react."
          },
          {
            id: "pestel5-mastery4",
            question: "How can technology be an opportunity for small businesses?",
            options: [
              "It forces every small firm to shut down within a year",
              "It lets them use tools once only giants could afford",
              "It automatically doubles the tax that big firms pay",
              "It bans large companies from selling anything online which happens on every public holiday"
            ],
            correctAnswer: 1,
            explanation: "Cloud software, online ads, and delivery platforms let small firms use capabilities once reserved for giants, leveling the field and opening new markets."
          },
          {
            id: "pestel5-mastery5",
            question: "What does 'keeping up' with technology require?",
            options: [
              "Buying every single new gadget the moment it appears",
              "Constant R&D, training, and judging real tech from hype",
              "Ignoring all change until competitors are far ahead",
              "Waiting for the government to choose your tools for you"
            ],
            correctAnswer: 1,
            explanation: "Keeping up means investing in R&D, training staff, guarding against cyber-risk, and judging which technologies are real and lasting versus passing hype."
          },
          {
            id: "pestel5-mastery6",
            question: "Which is a real example of technological disruption?",
            options: [
              "A city raising its parking fines for one busy weekend",
              "Streaming replacing DVD rentals as internet speeds rose",
              "A shop closing early on a national public holiday",
              "A bank briefly pausing loans over a long weekend"
            ],
            correctAnswer: 1,
            explanation: "Streaming disrupted DVD rentals: as internet and smartphones spread, on-demand viewing replaced physical discs and toppled once-dominant rental chains."
          }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // pestel-6: Environmental & Legal Factors
  // ─────────────────────────────────────────────
  {
    lessonId: "pestel-6",
    sections: [
      {
        type: "concept",
        title: "The Environmental Factor: Nature and Sustainability",
        paragraphs: [
          "Environmental factors are the natural-world and sustainability forces that affect a business - climate, weather, resources, pollution, and the growing pressure to operate responsibly. Once treated as a side issue, these forces are now central to strategy. Businesses depend on nature for raw materials, energy, and stable conditions, so anything that threatens those threatens the business. At the same time, customers, investors, and governments increasingly judge firms on their environmental impact. A company that wastes resources or pollutes can face rising costs, tighter rules, and angry customers, while one that operates cleanly can cut costs and win loyalty.",
          "Climate change is the biggest environmental force facing business today. It raises physical risks - floods, droughts, storms, and heat that can wreck crops, factories, and supply chains - and it drives new rules and shifting demand. Firms that rely on stable weather, like farming and insurance, feel it directly, but few escape entirely. Resource scarcity adds pressure: as water, minerals, and energy grow scarcer or pricier, costs climb and supply becomes less certain. Reading these risks lets a firm prepare - diversifying suppliers, using resources efficiently, and building operations that can survive a more volatile natural world.",
          "Sustainability is the drive to meet present needs without wrecking the future, and it has become a real business advantage, not just an ethical stance. Using less energy, cutting waste, and recycling often lowers costs directly. Beyond savings, sustainability shapes reputation: consumers and investors increasingly favor green firms and shun careless ones. Many companies now report their environmental impact and set reduction targets, partly from values and partly because it protects them from regulation and boycotts. The firms that thrive treat sustainability as woven into strategy - designing greener products and cleaner operations - rather than as a slogan bolted on for show."
        ],
        bullets: [
          "Environmental factors are the natural-world and sustainability forces around a business.",
          "Firms depend on nature for materials, energy, and stable conditions.",
          "Climate change raises physical risks and drives new rules and demand.",
          "Resource scarcity pushes costs up and makes supply less certain.",
          "Sustainability can cut costs and build reputation, not just satisfy ethics."
        ],
        realWorldExample: "When droughts and heatwaves hit farming regions, food companies saw crop prices spike and supplies wobble, forcing them to raise prices or find new suppliers. Meanwhile brands that cut packaging waste and energy use lowered costs and won loyal, eco-minded customers. The same environmental pressures that punished the careless rewarded firms that planned for a changing climate."
      },
      {
        type: "concept",
        title: "The Legal Factor: Rules Businesses Must Obey",
        paragraphs: [
          "Legal factors are the specific laws and regulations a business must obey, and unlike political trends, they are firm rules with real penalties for breaking them. Political factors are about the direction government leans; legal factors are the concrete statutes already on the books. They cover a huge range: employment law sets minimum wages, safety, and how workers can be hired and fired; consumer-protection law bans false advertising and unsafe products; health-and-safety rules govern workplaces; and contract law makes agreements enforceable. Ignoring these is not just risky - it can bring fines, lawsuits, forced shutdowns, or even criminal charges against those in charge.",
          "Several legal areas matter to almost every firm. Consumer protection requires honest labeling, fair terms, and safe goods, so a business cannot lie about a product or sell something dangerous without consequence. Data-protection laws now govern how firms collect and use personal information, with heavy fines for misuse. Intellectual-property law - patents, trademarks, and copyrights - protects inventions and brands, letting firms guard what they create and forcing rivals not to copy. Competition law blocks monopolies and price-fixing to keep markets fair. Each area shapes what a business may and may not do, turning legal awareness into a basic survival skill.",
          "Because law varies by place and changes over time, compliance is an ongoing job, not a one-time check. A product legal in one country may be banned in another; a marketing tactic allowed last year may be outlawed now. Firms that operate across borders must satisfy many rulebooks at once, which is costly but unavoidable. Smart businesses treat legal risk seriously - keeping records, training staff, and getting advice before acting - because the cost of prevention is tiny next to the cost of a major lawsuit or scandal. Together with environmental factors, legal rules complete PESTEL, the full scan of the outside forces every business must navigate."
        ],
        bullets: [
          "Legal factors are firm laws with real penalties, not just political leanings.",
          "Employment law covers wages, safety, hiring, and firing.",
          "Consumer-protection law bans false advertising and unsafe products.",
          "Data-protection and intellectual-property law guard information and inventions.",
          "Compliance is ongoing because laws vary by place and change over time."
        ],
        realWorldExample: "Strict data-protection laws forced tech firms worldwide to change how they collect personal information, with regulators handing out fines running into hundreds of millions for misuse. Companies that had ignored the rules faced huge penalties and public backlash, while those that built privacy into their systems early avoided the fines and earned customer trust - a clear legal factor reshaping an industry."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "pestel6-mc1",
            question: "What is sustainability in business?",
            options: [
              "A one-time discount offered during a summer clearance sale",
              "Meeting present needs without wrecking the future",
              "A government tax charged only on the largest factories",
              "A short marketing slogan printed on a product label"
            ],
            correctAnswer: 1,
            explanation: "Sustainability is meeting present needs without wrecking the future; it can cut costs through less waste and build reputation with customers and investors."
          },
          {
            id: "pestel6-mc2",
            question: "How do legal factors differ from political factors?",
            options: [
              "Legal factors only ever apply to very small startups according to the official government handbook",
              "Legal factors are firm laws with real penalties for breaking them",
              "Legal factors change once every fifty years by tradition",
              "Legal factors are just opinions that firms can safely ignore"
            ],
            correctAnswer: 1,
            explanation: "Legal factors are concrete laws already on the books with real penalties, while political factors are about the direction government leans."
          }
        ]
      },
      {
        type: "scenario",
        title: "Lena Runs a Clothing Brand",
        narrative: "Lena runs an online clothing brand. A long drought spikes the price of the cotton she buys, so her costs jump. At the same time, new data-protection rules require her to change how she stores customer information, and shoppers increasingly ask whether her clothes are made sustainably. She must handle both an environmental cost shock and a legal compliance duty at once.",
        details: [
          "The drought is an environmental factor raising raw-material costs and supply risk.",
          "The data-protection rules are a legal factor she must obey or face fines.",
          "Customers asking about sustainability show environmental values shaping demand.",
          "Lena could diversify cotton suppliers and update her data systems to comply."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "pestel6-aq1",
          question: "Why must Lena change how she stores customer information?",
          options: [
            "A passing fashion fad made data storage briefly popular according to the official government handbook",
            "A legal factor - data-protection law - requires it or brings fines",
            "The central bank raised interest rates on her business loan as printed on the standard tax form",
            "A rival brand launched a cheaper line of summer dresses"
          ],
          correctAnswer: 1,
          explanation: "This is a legal factor: data-protection law is a firm rule with real penalties, so Lena must change her systems to comply or risk heavy fines."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Environmental factors are the natural-world and sustainability forces around a business.",
          "Climate change and resource scarcity raise risks, costs, and new rules.",
          "Sustainability can cut costs and build reputation, not just satisfy ethics.",
          "Legal factors are firm laws with real penalties, unlike political leanings.",
          "Compliance is ongoing because laws vary by place and change over time."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "pestel6-mastery1",
            question: "Which is the biggest environmental force facing business today?",
            options: [
              "A single company changing its logo colors and font",
              "Climate change raising risks and driving new rules",
              "A weekend sale offered by one local grocery store",
              "A brief dip in one stock's price during a slow hour"
            ],
            correctAnswer: 1,
            explanation: "Climate change is the biggest environmental force, raising physical risks like floods and droughts while driving new regulations and shifting demand."
          },
          {
            id: "pestel6-mastery2",
            question: "Why can sustainability be a business advantage, not just ethics?",
            options: [
              "Because it forces every rival to close down permanently",
              "Because cutting waste and energy use can lower costs",
              "Because governments pay firms cash to make any promise",
              "Because it removes all competition from the market at once"
            ],
            correctAnswer: 1,
            explanation: "Using less energy, cutting waste, and recycling often lowers costs directly, and green practices also build reputation with customers and investors."
          },
          {
            id: "pestel6-mastery3",
            question: "What does consumer-protection law require of businesses?",
            options: [
              "That they always charge the single highest possible price",
              "Honest labeling, fair terms, and safe products",
              "That they hide all information from their own customers",
              "That they sell only to buyers over sixty years old"
            ],
            correctAnswer: 1,
            explanation: "Consumer-protection law bans false advertising and unsafe products, requiring honest labeling, fair terms, and goods that are safe to use."
          },
          {
            id: "pestel6-mastery4",
            question: "What does intellectual-property law protect?",
            options: [
              "The daily weather forecast for a company's home city",
              "Inventions and brands through patents and trademarks",
              "The exact interest rate a business pays on its loans",
              "The number of hours a shop may stay open each day"
            ],
            correctAnswer: 1,
            explanation: "Intellectual-property law - patents, trademarks, and copyrights - protects inventions and brands, letting firms guard what they create from copycats."
          },
          {
            id: "pestel6-mastery5",
            question: "Why is legal compliance an ongoing job?",
            options: [
              "Because laws never change once written down anywhere",
              "Because laws vary by place and change over time",
              "Because only one country in the world has any laws",
              "Because firms are told to ignore the law every few years"
            ],
            correctAnswer: 1,
            explanation: "Compliance is ongoing because laws differ across countries and shift over time, so a firm must keep checking that its actions stay legal everywhere it operates."
          },
          {
            id: "pestel6-mastery6",
            question: "What do the two letters E and L stand for in PESTEL?",
            options: [
              "Earnings and Lending, the two parts of any bank loan",
              "Environmental and Legal factors around a business",
              "Exports and Labor, the only forces that affect trade",
              "Equity and Leverage, the two ways firms raise money"
            ],
            correctAnswer: 1,
            explanation: "The E and L in PESTEL stand for Environmental and Legal factors - the natural-world pressures and the concrete laws a business must navigate."
          }
        ]
      }
    ]
  }
]
