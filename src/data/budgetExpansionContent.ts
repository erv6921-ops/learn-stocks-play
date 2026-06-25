import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// UNIT 3 EXPANSION: BUDGETING & CONSUMER SKILLS (Florida SS.912.FL.3.x)
// budget-11 .. budget-16
// ═══════════════════════════════════════════════

export const budgetExpansionContent: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // budget-11: Smart Buying — Evaluating Big Purchases (FL.3.3)
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-11",
    sections: [
      {
        type: "concept",
        title: "The Sticker Price Is Only the Beginning",
        paragraphs: [
          "Before any major purchase — a car, laptop, appliance, or furniture — smart buyers look past the sticker price. The real number that matters is the total cost of ownership: the purchase price PLUS maintenance, repairs, fuel or energy, insurance, and supplies over the item's life. A 'cheap' item that breaks constantly can cost far more than a pricier, reliable one.",
          "Two more questions sharpen your decision. First, durability: how long will it last? Second, features you actually need versus features you merely want — paying for extras you'll never use is wasted money. And every purchase has an opportunity cost: the money you spend here is money you can't use for something else, like saving or investing.",
          "A simple tool is the 'cost per use' framework. A $200 jacket worn 200 times costs $1 per use. A $50 jacket worn only 5 times costs $10 per use — making the 'expensive' jacket the better deal. Researching reviews, reliability ratings, and total cost before buying turns you from an impulse shopper into a strategic one."
        ],
        bullets: [
          "Total cost of ownership = price + maintenance + repairs + fuel/energy + insurance over time.",
          "Durability and lifespan matter more than the sticker price.",
          "Separate features you truly need from features you merely want.",
          "Every purchase has an opportunity cost — money that can't go elsewhere.",
          "Cost per use = price ÷ number of times used; it reveals true value."
        ],
        realWorldExample: "A $30 pair of shoes that falls apart in two months costs more per wear than a $90 pair that lasts three years. Buying the cheapest option often means buying it again and again."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget11-mc1",
            question: "What does 'total cost of ownership' include beyond the purchase price?",
            options: [
              "Nothing — it's just the sticker price",
              "Maintenance, repairs, fuel/energy, insurance, and supplies over the item's life",
              "Only the sales tax",
              "Only the shipping fee"
            ],
            correctAnswer: 1,
            explanation: "Total cost of ownership adds all the ongoing costs — maintenance, repairs, fuel, insurance, supplies — to the purchase price for the true lifetime cost."
          },
          {
            id: "budget11-mc2",
            question: "Using cost per use, which is the better value?",
            options: [
              "A $50 item used 5 times ($10/use)",
              "A $200 item used 200 times ($1/use)",
              "Whichever is cheaper at the register",
              "They are equal"
            ],
            correctAnswer: 1,
            explanation: "The $200 item used 200 times costs $1 per use, far better than the $50 item used only 5 times at $10 per use. Cost per use reveals real value."
          }
        ]
      },
      {
        type: "scenario",
        title: "Rodrigo Buys His First Car",
        narrative: "Rodrigo is buying his first car in Orlando and has two options. A 2018 Honda Civic costs $16,000, is known for reliability, and has $120/month insurance. A 2020 Dodge Charger costs $24,000, has a reputation for costly repairs, and carries $280/month insurance. He compares the five-year total cost of ownership.",
        details: [
          "The Civic's lower price, strong reliability, and cheaper insurance keep ongoing costs down.",
          "The Charger's higher price, frequent repairs, and pricier insurance add up fast.",
          "Over five years, insurance alone differs by $9,600 ($160/month × 60 months).",
          "Factoring in repairs and fuel widens the gap even further."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget11-aq1",
          question: "Why might the Civic be the smarter buy even before counting repairs?",
          options: [
            "Because it's a newer model",
            "Because its lower price and much cheaper insurance reduce the total cost of ownership",
            "Because it's faster",
            "Because Dodge cars can't be insured"
          ],
          correctAnswer: 1,
          explanation: "The Civic's lower purchase price plus $160/month less in insurance dramatically lowers its total cost of ownership — and that's before adding the Charger's higher repair costs."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Look at total cost of ownership, not just the sticker price.",
          "Durability and reliability often save more than a low purchase price.",
          "Distinguish needs from wants to avoid paying for unused features.",
          "Cost per use reveals which option is the real value.",
          "Research reviews and reliability before any big purchase."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "budget11-mastery1",
            question: "What is total cost of ownership?",
            options: [
              "Just the purchase price",
              "The purchase price plus all ongoing costs (maintenance, repairs, fuel, insurance) over the item's life",
              "The sales tax only",
              "The price minus any discount"
            ],
            correctAnswer: 1,
            explanation: "Total cost of ownership captures the full lifetime cost, including upkeep, repairs, fuel, and insurance — not just the sticker price."
          },
          {
            id: "budget11-mastery2",
            question: "A $400 jacket worn 400 times vs a $100 jacket worn 20 times — which has the lower cost per use?",
            options: [
              "The $100 jacket ($5/use)",
              "The $400 jacket ($1/use)",
              "They're equal",
              "Cost per use doesn't apply to clothes"
            ],
            correctAnswer: 1,
            explanation: "The $400 jacket is $1/use (400 ÷ 400), while the $100 jacket is $5/use (100 ÷ 20). The pricier jacket is the better value per wear."
          },
          {
            id: "budget11-mastery3",
            question: "Why does durability matter more than the sticker price for big purchases?",
            options: [
              "It doesn't — the cheapest item is always best",
              "A durable item lasts longer and avoids repeated replacement and repair costs",
              "Durable items are always the most expensive",
              "Durability only matters for cars"
            ],
            correctAnswer: 1,
            explanation: "A durable item spreads its cost over a long life and avoids repeat purchases and repairs, often making it cheaper overall than a flimsy bargain."
          },
          {
            id: "budget11-mastery4",
            question: "What's a good way to research a big purchase before buying?",
            options: [
              "Buy first and ask questions later",
              "Check reviews, reliability ratings, and total cost of ownership",
              "Only look at the color",
              "Choose whichever has the flashiest ad"
            ],
            correctAnswer: 1,
            explanation: "Reviews, reliability data, and total-cost research help you choose the option that delivers real value rather than just a low upfront price."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // budget-12: The Psychology of Pricing (FL.3.4)
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-12",
    sections: [
      {
        type: "concept",
        title: "Stores Are Designed to Make You Spend More",
        paragraphs: [
          "Retailers use psychology to nudge you toward spending more than you planned. One classic trick is charm pricing: $9.99 feels meaningfully cheaper than $10, even though it's a penny apart, because we read the left digit first. Another is anchoring: showing you an expensive item first ($500) so the next item ($200) feels like a bargain by comparison.",
          "Deals aren't always deals. 'Buy one, get one' (BOGO) only saves you money if you actually need both items — otherwise you spent extra to get something you didn't want. Stores also play with how savings are framed: '$5 off $25' (20%) and '$50 off $250' (also 20%) are the same percentage, but one can feel bigger than the other. Artificial urgency ('Only 3 left!' or 'Sale ends in 1 hour!') pressures you to buy before you think.",
          "The defense is simple awareness plus math. Calculate the real per-unit price, ask whether you'd buy the item at full price, ignore the countdown timers, and compare the actual discount percentage. When you understand the tricks, you stop reacting emotionally and start deciding rationally — keeping more money in your pocket."
        ],
        bullets: [
          "Charm pricing: $9.99 feels much cheaper than $10 because we read the left digit first.",
          "Anchoring: a high-priced item first makes the next item seem cheap.",
          "BOGO is only a deal if you actually need both items.",
          "The same percentage discount can feel different framed as dollars vs percent.",
          "Artificial urgency ('only 3 left!') pressures you to buy without thinking."
        ],
        realWorldExample: "A '50% off' sign on an item that was quietly marked up first might be no deal at all. Checking the real price per unit — and whether you'd pay full price — cuts through the illusion."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget12-mc1",
            question: "Why does pricing something at $9.99 instead of $10.00 work on shoppers?",
            options: [
              "Because $9.99 is dramatically cheaper",
              "Because we read the left digit first, so $9.99 feels closer to $9 than $10",
              "Because stores must legally avoid round numbers",
              "Because it includes free shipping"
            ],
            correctAnswer: 1,
            explanation: "Charm pricing exploits the fact that we anchor on the left digit, making $9.99 feel meaningfully cheaper than $10 despite being a penny apart."
          },
          {
            id: "budget12-mc2",
            question: "When is a 'Buy One, Get One' (BOGO) offer actually a good deal?",
            options: [
              "Always, no matter what",
              "Only when you genuinely need both items",
              "Never",
              "Only on weekends"
            ],
            correctAnswer: 1,
            explanation: "BOGO only saves money if you'd have bought both items anyway. Buying a second item you don't need means you spent extra, not less."
          }
        ]
      },
      {
        type: "scenario",
        title: "Keisha's Black Friday",
        narrative: "Keisha is Black Friday shopping in Atlanta and faces five different 'deals.' She decides to use math instead of emotion to figure out which are genuinely good and which are retailer tricks.",
        details: [
          "A '$5 off $25' coupon and a '$50 off $250' coupon are both exactly 20% off.",
          "A BOGO offer on a product she only needs one of would actually cost her more.",
          "A '70% off' tag on an item whose 'original' price was inflated is barely a discount.",
          "A 'Only 2 left!' countdown is designed to rush her into buying without comparing."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget12-aq1",
          question: "How should Keisha evaluate whether the '$50 off $250' deal is better than the '$5 off $25' deal?",
          options: [
            "The bigger dollar amount is always the better deal",
            "Compare the discount percentages — both are 20%, so neither is inherently better",
            "Whichever has the louder sign",
            "Always pick the more expensive item"
          ],
          correctAnswer: 1,
          explanation: "Comparing percentages cuts through the framing: $5 off $25 and $50 off $250 are both 20%. The larger dollar figure only feels bigger — the actual discount rate is identical."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Charm pricing makes $9.99 feel far cheaper than $10.",
          "Anchoring uses a high price to make the next price seem cheap.",
          "BOGO is only a deal when you need both items.",
          "Compare discount percentages, not just dollar amounts.",
          "Ignore artificial urgency and do the math before buying."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "budget12-mastery1",
            question: "What psychological trick is at work when a $9.99 price tag feels much cheaper than $10?",
            options: [
              "Anchoring",
              "Charm pricing",
              "BOGO",
              "Bundle pricing"
            ],
            correctAnswer: 1,
            explanation: "Charm pricing relies on the left-digit effect, making $9.99 feel closer to $9 than to $10."
          },
          {
            id: "budget12-mastery2",
            question: "What does 'anchoring' mean in retail?",
            options: [
              "Bolting shelves to the floor",
              "Showing a high-priced item first so the next item seems cheap by comparison",
              "A loyalty rewards program",
              "Free shipping over $50"
            ],
            correctAnswer: 1,
            explanation: "Anchoring sets a high reference price first, making subsequent prices feel like bargains relative to it."
          },
          {
            id: "budget12-mastery3",
            question: "When is BOGO NOT a real deal?",
            options: [
              "When you need both items",
              "When you only need one item and the second is extra you wouldn't have bought",
              "When the items are cheap",
              "BOGO is always a great deal"
            ],
            correctAnswer: 1,
            explanation: "If you only need one item, getting a 'free' second one you didn't want means you spent more, not less."
          },
          {
            id: "budget12-mastery4",
            question: "How do you calculate the real discount percentage of '$15 off $60'?",
            options: [
              "15 ÷ 60 = 25% off",
              "60 ÷ 15 = 4% off",
              "15 + 60 = 75% off",
              "It can't be calculated"
            ],
            correctAnswer: 0,
            explanation: "Divide the discount by the original price: $15 ÷ $60 = 0.25, or 25% off. Comparing percentages reveals the true deal."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // budget-13: Charitable Donations & Nonprofits (FL.3.6)
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-13",
    sections: [
      {
        type: "concept",
        title: "Giving Wisely: Make Your Generosity Count",
        paragraphs: [
          "Charitable giving means donating money or time to organizations that serve others. People give for many reasons: their values, a sense of community, the satisfaction of helping, and sometimes a tax benefit. The most common type of charity is a 501(c)(3) nonprofit — a tax-exempt organization whose name comes from the section of the tax code that defines it. Donations to 501(c)(3) groups can be tax-deductible if you itemize.",
          "Giving wisely means vetting an organization before you donate. Tools like Charity Navigator and GuideStar rate charities, including their overhead ratio — the share of donations spent on administration and fundraising rather than the cause. A well-run charity typically keeps overhead reasonable (often under about 30%), so more of your money reaches the people it's meant to help.",
          "Unfortunately, scammers exploit generosity, especially after disasters. Before donating, do a quick three-step check: confirm the organization is a real registered 501(c)(3), look it up on Charity Navigator or GuideStar, and watch for warning signs like high-pressure tactics, vague descriptions of where money goes, or requests for unusual payment methods. A few minutes of research ensures your kindness actually helps."
        ],
        bullets: [
          "A 501(c)(3) is a tax-exempt nonprofit; donations to one can be tax-deductible.",
          "People give for values, community, satisfaction, and sometimes tax benefits.",
          "Charity Navigator and GuideStar rate charities, including overhead ratios.",
          "Lower overhead means more of your donation reaches the cause (aim for under ~30%).",
          "Vet charities before giving — scams spike after disasters."
        ],
        realWorldExample: "After a hurricane, dozens of 'relief funds' pop up overnight. Checking each on Charity Navigator quickly separates a legitimate, low-overhead organization from a fund where most donations vanish into 'administration' — or a flat-out scam."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget13-mc1",
            question: "What is a 501(c)(3)?",
            options: [
              "A type of credit card",
              "A tax-exempt nonprofit organization; donations to it can be tax-deductible",
              "A government tax form for individuals",
              "A for-profit company"
            ],
            correctAnswer: 1,
            explanation: "A 501(c)(3) is a tax-exempt nonprofit defined in the tax code. Donations to these organizations may be tax-deductible if you itemize."
          },
          {
            id: "budget13-mc2",
            question: "What does Charity Navigator help you measure about a charity?",
            options: [
              "Its stock price",
              "How efficiently it uses donations, including its overhead ratio",
              "The CEO's salary only",
              "Nothing useful"
            ],
            correctAnswer: 1,
            explanation: "Charity Navigator rates charities on factors like financial efficiency and overhead — the share of donations spent on admin/fundraising versus the cause."
          }
        ]
      },
      {
        type: "scenario",
        title: "Vetting Charities After Hurricane Ian",
        narrative: "After Hurricane Ian hits Florida, three charities post donation drives online. One is the well-known American Red Cross. One spends 60% of donations on administration. One turns out to be an outright scam with no real organization behind it. A student wants to help but also wants their money to matter.",
        details: [
          "The American Red Cross is an established, registered organization with transparent finances.",
          "The second charity's 60% overhead means only 40 cents of each dollar reaches victims.",
          "The third 'charity' isn't registered and uses high-pressure, vague appeals.",
          "A three-step check (confirm registration, look up ratings, watch for red flags) reveals which is best."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget13-aq1",
          question: "Why is the charity with 60% overhead a worse choice than the American Red Cross?",
          options: [
            "Because it has a longer name",
            "Because only 40 cents of each dollar reaches the cause, versus much more at a low-overhead charity",
            "Because overhead doesn't matter at all",
            "Because the Red Cross is a for-profit company"
          ],
          correctAnswer: 1,
          explanation: "A 60% overhead ratio means most of your donation goes to administration, not victims. A well-run, low-overhead charity sends far more of each dollar to the actual cause."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Charitable giving supports causes through money or time.",
          "A 501(c)(3) is a tax-exempt nonprofit; donations may be tax-deductible.",
          "Charity Navigator and GuideStar reveal a charity's overhead and efficiency.",
          "Lower overhead means more of your gift reaches the cause.",
          "Vet charities before giving, especially after disasters, to avoid scams."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "budget13-mastery1",
            question: "What is a 501(c)(3) organization?",
            options: [
              "A tax-exempt nonprofit eligible to receive tax-deductible donations",
              "A type of retirement account",
              "A for-profit business structure",
              "A government agency"
            ],
            correctAnswer: 0,
            explanation: "A 501(c)(3) is a tax-exempt nonprofit; donations to it can be tax-deductible for the giver."
          },
          {
            id: "budget13-mastery2",
            question: "What does a charity's overhead ratio measure?",
            options: [
              "The share of donations spent on administration and fundraising rather than the cause",
              "The number of employees",
              "Its social media followers",
              "Its building's height"
            ],
            correctAnswer: 0,
            explanation: "Overhead ratio shows how much of each donation goes to running the organization versus the actual mission; lower is generally better."
          },
          {
            id: "budget13-mastery3",
            question: "What is a potential tax benefit of charitable donations?",
            options: [
              "They are always fully refunded",
              "Donations to qualifying 501(c)(3) charities can be tax-deductible if you itemize",
              "They eliminate all your taxes",
              "There is never any tax benefit"
            ],
            correctAnswer: 1,
            explanation: "Donations to qualifying 501(c)(3) organizations can be deducted if you itemize, potentially lowering your taxable income."
          },
          {
            id: "budget13-mastery4",
            question: "Which is a warning sign of charity fraud?",
            options: [
              "A clear description of how funds are used",
              "High-pressure tactics, vague spending claims, and unusual payment requests",
              "A listing on Charity Navigator",
              "Transparent financial reports"
            ],
            correctAnswer: 1,
            explanation: "Red flags include pressure to give immediately, vague claims about where money goes, and requests for odd payment methods — signs to research before donating."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // budget-14: Consumer Protection Laws & Agencies (FL.3.7)
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-14",
    sections: [
      {
        type: "concept",
        title: "You Have Rights — and Agencies That Enforce Them",
        paragraphs: [
          "As a buyer, you're protected by laws and government agencies, each with a specific job. The CFPB (Consumer Financial Protection Bureau) handles financial products — credit cards, mortgages, and debt collectors. The FTC (Federal Trade Commission) tackles fraud, deceptive advertising, and identity theft. Knowing which agency does what means you know exactly where to turn when something goes wrong.",
          "Other agencies protect different parts of your life. The FDA oversees the safety of food and drugs, and the USDA handles food labeling and agricultural products. In Florida, the Department of Agriculture and Consumer Services (DACS) is the go-to place for local consumer complaints — like a dishonest business in your area. The Better Business Bureau (BBB), while not a government agency, lets you check a business's reputation and file complaints.",
          "When a purchase goes wrong, you often have several tools at once: file a complaint with the right agency, dispute the charge with your credit card company, and document everything. Matching the problem to the right channel — CFPB for a mortgage issue, FL DACS for a shady local shop, FTC for a scam ad — gets you results faster. Being an informed consumer means knowing these resources exist before you need them."
        ],
        bullets: [
          "CFPB handles credit cards, mortgages, and debt collectors.",
          "FTC handles fraud, deceptive ads, and identity theft.",
          "FDA covers food/drug safety; USDA covers food labeling.",
          "Florida's DACS handles local consumer complaints about businesses.",
          "The BBB lets you check business reputations and file complaints."
        ],
        realWorldExample: "If an online ad promises a 'free' product that secretly enrolls you in $80/month charges, that's a deceptive-practices issue for the FTC — while a local repair shop that rips you off is a complaint for Florida's DACS."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget14-mc1",
            question: "Which agency handles complaints about credit cards, mortgages, and debt collectors?",
            options: [
              "The FDA",
              "The CFPB (Consumer Financial Protection Bureau)",
              "The USDA",
              "The Better Business Bureau"
            ],
            correctAnswer: 1,
            explanation: "The CFPB focuses on consumer financial products and services, including credit cards, mortgages, and debt collectors."
          },
          {
            id: "budget14-mc2",
            question: "In Florida, where do you file a complaint about a dishonest local business?",
            options: [
              "The FDA",
              "Florida's Department of Agriculture and Consumer Services (DACS)",
              "The SEC",
              "The post office"
            ],
            correctAnswer: 1,
            explanation: "Florida's DACS handles local consumer complaints, making it the right channel for reporting a dishonest business in the state."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maria's Broken Refrigerator",
        narrative: "Maria buys a refrigerator that breaks down just two weeks later. The store refuses to give her a refund, and the manufacturer ignores her calls. She decides to use the consumer protection tools available to her instead of giving up.",
        details: [
          "Maria files a complaint with Florida's DACS about the store's refusal to honor the sale.",
          "She files a complaint with the Better Business Bureau to document the issue publicly.",
          "She disputes the charge with her credit card company since the product failed.",
          "Using multiple channels increases the pressure and her chances of a resolution."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget14-aq1",
          question: "Which set of actions best fits Maria's situation with a faulty product and an uncooperative store?",
          options: [
            "Do nothing and accept the loss",
            "File with Florida's DACS, file a BBB complaint, and dispute the charge with her credit card company",
            "Report it to the FDA only",
            "Call the SEC"
          ],
          correctAnswer: 1,
          explanation: "A local business dispute fits DACS and the BBB, and a credit card dispute can recover the payment for a product that failed — using the right channels together."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Different agencies protect different parts of consumer life.",
          "CFPB = financial products; FTC = fraud and deceptive ads.",
          "FDA = food/drug safety; USDA = food labeling.",
          "Florida's DACS handles local consumer complaints.",
          "The BBB lets you check reputations and file complaints."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "budget14-mastery1",
            question: "Which agency would handle a complaint about your mortgage lender?",
            options: [
              "The CFPB",
              "The FDA",
              "The USDA",
              "The Department of Motor Vehicles"
            ],
            correctAnswer: 0,
            explanation: "The CFPB oversees consumer financial products, including mortgages, so mortgage complaints go there."
          },
          {
            id: "budget14-mastery2",
            question: "Where should a Floridian report a dishonest local business?",
            options: [
              "Florida's Department of Agriculture and Consumer Services (DACS)",
              "The FDA",
              "The Federal Reserve",
              "The IRS"
            ],
            correctAnswer: 0,
            explanation: "Florida's DACS is the state agency for local consumer complaints, including dishonest businesses."
          },
          {
            id: "budget14-mastery3",
            question: "What does the FTC primarily investigate?",
            options: [
              "Food and drug safety",
              "Fraud, deceptive advertising, and identity theft",
              "Mortgage interest rates only",
              "Property taxes"
            ],
            correctAnswer: 1,
            explanation: "The FTC focuses on fraud, deceptive or unfair business practices, false advertising, and identity theft."
          },
          {
            id: "budget14-mastery4",
            question: "What does a Better Business Bureau (BBB) rating indicate?",
            options: [
              "A government guarantee of the business",
              "A reputation rating and record of complaints about a business",
              "The business's exact profits",
              "A legal license to operate"
            ],
            correctAnswer: 1,
            explanation: "The BBB (a non-government organization) rates businesses on reputation and tracks complaints, helping consumers gauge trustworthiness."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // budget-15: Reading & Evaluating Contracts (FL.3.11)
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-15",
    sections: [
      {
        type: "concept",
        title: "Every Signature (and 'I Agree') Is a Promise",
        paragraphs: [
          "A contract is a legally binding agreement, and breaking it has consequences. Every contract has core components: an offer, acceptance of that offer, consideration (something of value exchanged by each side), and capacity (the parties must be legally able to agree). Once those exist, you're bound — whether you signed paper or just clicked 'I agree' on a website.",
          "Teens encounter contracts more than they realize: cell phone plans, streaming subscriptions like Spotify or Netflix, car leases, apartment leases, and job offer letters are all contracts. The fine print matters. Watch especially for cancellation fees, automatic renewal clauses (which keep charging you unless you actively cancel), data-sharing language, arbitration clauses (which can limit your right to sue), and late-payment penalties.",
          "The lesson is simple but powerful: read before you agree, and pay special attention to how you can get OUT of the agreement and what it costs. Clicking 'I agree' on terms and conditions creates a real, enforceable contract — so those long blocks of text you scroll past actually bind you. Spending two minutes on the cancellation and renewal sections can save you hundreds of dollars and a lot of frustration."
        ],
        bullets: [
          "A contract needs an offer, acceptance, consideration, and capacity.",
          "Clicking 'I agree' online creates a binding contract, just like signing.",
          "Common teen contracts: phone plans, streaming, car/apartment leases, job offers.",
          "Watch for cancellation fees, auto-renewal, arbitration clauses, and late penalties.",
          "Always read how to exit an agreement and what it will cost you."
        ],
        realWorldExample: "Many 'free trial' subscriptions hide an auto-renewal clause that charges your card monthly until you cancel. The trial wasn't really free — the contract you clicked through made the recurring charge legal."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget15-mc1",
            question: "What is 'consideration' in a contract?",
            options: [
              "Being polite to the other party",
              "Something of value that each side exchanges",
              "The time you take to think it over",
              "A discount on the price"
            ],
            correctAnswer: 1,
            explanation: "Consideration is the value each party gives — like money for a service. It's a required element that makes a contract binding."
          },
          {
            id: "budget15-mc2",
            question: "Does clicking 'I agree' on a website's terms create a contract?",
            options: [
              "No, only paper signatures count",
              "Yes — clicking 'I agree' creates a binding contract",
              "Only if you're over 21",
              "Only for paid services"
            ],
            correctAnswer: 1,
            explanation: "Clicking 'I agree' is a form of acceptance that creates a legally binding contract, just like a written signature."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jaylen's Gym Membership",
        narrative: "Jaylen signs up for a gym membership without reading the contract. Three months later he wants to cancel, but buried in the agreement is a 12-month minimum commitment and a $175 early termination fee. He's frustrated, but the contract is enforceable because he agreed to it.",
        details: [
          "Jaylen skipped reading the cancellation and term-length sections.",
          "The contract included a 12-month minimum commitment.",
          "It also specified a $175 early termination fee.",
          "Reading those two sections beforehand would have changed his decision or expectations."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget15-aq1",
          question: "Which two contract sections would have warned Jaylen before he signed?",
          options: [
            "The font size and the logo",
            "The term-length (12-month minimum) and the cancellation/early-termination fee clauses",
            "The company's mailing address",
            "The list of gym equipment"
          ],
          correctAnswer: 1,
          explanation: "The term-length commitment and the cancellation/early-termination fee are exactly the clauses that determined his costs. Reading them first would have prevented the surprise."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A contract requires offer, acceptance, consideration, and capacity.",
          "Clicking 'I agree' online is legally binding.",
          "Teens sign more contracts than they realize (phones, streaming, leases).",
          "Watch for auto-renewal, cancellation fees, and arbitration clauses.",
          "Always read how to exit an agreement and what it costs."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "budget15-mastery1",
            question: "What does 'consideration' mean in a contract?",
            options: [
              "Something of value exchanged by each party",
              "Being thoughtful and kind",
              "A waiting period before signing",
              "The contract's title"
            ],
            correctAnswer: 0,
            explanation: "Consideration is the value each side gives (such as money for a product or service), a required element of a binding contract."
          },
          {
            id: "budget15-mastery2",
            question: "What does an automatic renewal clause do?",
            options: [
              "Cancels your subscription automatically",
              "Keeps charging you and renewing the agreement unless you actively cancel",
              "Gives you a refund each year",
              "Lowers your price over time"
            ],
            correctAnswer: 1,
            explanation: "Auto-renewal clauses continue the contract and charges automatically until you take action to cancel."
          },
          {
            id: "budget15-mastery3",
            question: "What does an arbitration clause mean for your rights?",
            options: [
              "It guarantees you can sue in court",
              "It can require disputes to be settled through arbitration instead of a lawsuit, limiting your right to sue",
              "It eliminates the contract",
              "It doubles your refund"
            ],
            correctAnswer: 1,
            explanation: "An arbitration clause often requires resolving disputes through private arbitration rather than the court system, limiting your ability to sue."
          },
          {
            id: "budget15-mastery4",
            question: "True or false: Clicking 'I agree' on terms and conditions legally creates a contract.",
            options: [
              "True",
              "False",
              "Only if you also print it",
              "Only for people under 18"
            ],
            correctAnswer: 0,
            explanation: "True — clicking 'I agree' is a form of acceptance that creates a binding, enforceable contract."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // budget-16: Disputing Billing Errors (FL.3.12)
  // ─────────────────────────────────────────────
  {
    lessonId: "budget-16",
    sections: [
      {
        type: "concept",
        title: "Spotting and Fighting Charges That Aren't Yours",
        paragraphs: [
          "Billing errors happen more than people realize, and federal law gives you the power to fight them. The Fair Credit Billing Act (FCBA) lets you dispute billing errors on credit cards if you act within 60 days of the statement. A billing error includes a wrong amount, a duplicate charge, a charge for goods you never received, or an unauthorized charge you didn't make.",
          "The dispute process has clear timelines. You notify the card issuer in writing within 60 days. The issuer must acknowledge your dispute within 30 days and resolve it within two billing cycles. Crucially, during the investigation you don't have to pay the disputed amount (though you must keep paying the rest of your bill). This protects you from being forced to pay for something that may not be your responsibility.",
          "These rights extend beyond credit cards. You can also dispute bank errors, utility billing mistakes, and medical billing errors — the last being one of the biggest sources of financial stress in the U.S., where mistakes are common. The key habit is to review every statement, document everything, and act quickly, because deadlines like the 60-day window matter."
        ],
        bullets: [
          "The FCBA lets you dispute credit card billing errors within 60 days.",
          "Errors include wrong amounts, duplicates, charges for undelivered goods, and unauthorized charges.",
          "The issuer must respond within 30 days and resolve within two billing cycles.",
          "You don't have to pay the disputed amount during the investigation.",
          "You can also dispute bank, utility, and medical billing errors."
        ],
        realWorldExample: "A duplicate $60 streaming charge or a gym you canceled still billing you are textbook billing errors. Reviewing your statement each month catches them while you're still inside the 60-day window to dispute."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "budget16-mc1",
            question: "How long do you generally have to dispute a credit card billing error under the FCBA?",
            options: [
              "60 days from the statement",
              "5 years",
              "24 hours",
              "There is no time limit"
            ],
            correctAnswer: 0,
            explanation: "The Fair Credit Billing Act gives you 60 days from the statement date to dispute a billing error in writing."
          },
          {
            id: "budget16-mc2",
            question: "During a billing dispute investigation, what are you NOT required to do?",
            options: [
              "Pay the disputed amount",
              "Pay the rest of your bill",
              "Keep records",
              "Notify the issuer in writing"
            ],
            correctAnswer: 0,
            explanation: "You don't have to pay the disputed amount while it's being investigated, though you must keep paying the undisputed portion of your bill."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sofia's Mystery Charge",
        narrative: "Sofia reviews her credit card statement and spots a $340 charge from a store she's never visited. She suspects it's unauthorized and follows a clear, six-step dispute process to fight it.",
        details: [
          "Step 1: She notices the unfamiliar $340 charge while reviewing her statement.",
          "Step 2–3: She documents it and contacts her card issuer in writing within the 60-day window.",
          "Step 4: The issuer opens an investigation and must respond within 30 days.",
          "Step 5–6: It's resolved within two billing cycles; if the issuer misses the deadline, rules limit what she owes."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "budget16-aq1",
          question: "Who investigates Sofia's disputed credit card charge?",
          options: [
            "The store she's never visited",
            "Her credit card issuer, which must respond within 30 days and resolve within two billing cycles",
            "The police only",
            "Nobody — disputes aren't investigated"
          ],
          correctAnswer: 1,
          explanation: "Under the FCBA, the credit card issuer investigates the dispute, must acknowledge it within 30 days, and must resolve it within two billing cycles."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The FCBA gives a 60-day window to dispute credit card billing errors.",
          "Billing errors include wrong amounts, duplicates, undelivered goods, and unauthorized charges.",
          "The issuer must respond within 30 days and resolve within two billing cycles.",
          "You don't pay the disputed amount during the investigation.",
          "You can also dispute bank, utility, and (very commonly) medical billing errors."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "budget16-mastery1",
            question: "What is the FCBA's time limit to dispute a credit card billing error?",
            options: [
              "60 days",
              "6 months",
              "10 years",
              "No limit"
            ],
            correctAnswer: 0,
            explanation: "The Fair Credit Billing Act requires you to dispute a billing error within 60 days of the statement."
          },
          {
            id: "budget16-mastery2",
            question: "During a billing dispute, what do you NOT have to pay?",
            options: [
              "The entire bill",
              "The disputed amount (while still paying the rest)",
              "Any future charges ever",
              "Your other credit cards"
            ],
            correctAnswer: 1,
            explanation: "You can withhold payment on the disputed amount during the investigation, but you must keep paying the undisputed portion."
          },
          {
            id: "budget16-mastery3",
            question: "Who investigates a credit card billing dispute?",
            options: [
              "The merchant only",
              "Your credit card issuer",
              "The FBI",
              "No one"
            ],
            correctAnswer: 1,
            explanation: "Your credit card issuer investigates the dispute and must follow the FCBA's response and resolution timelines."
          },
          {
            id: "budget16-mastery4",
            question: "Which is cited as one of the most common sources of billing errors and financial stress in the U.S.?",
            options: [
              "Streaming subscriptions",
              "Medical billing errors",
              "Grocery receipts",
              "Library fines"
            ],
            correctAnswer: 1,
            explanation: "Medical billing errors are very common and a major source of financial stress; they can also be disputed."
          }
        ]
      }
    ]
  }
]
