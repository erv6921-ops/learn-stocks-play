import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// GULLIVER INTRO TO BUSINESS, UNIT 2, split into FIVE short, deep lessons:
//   2.1  The Five Factors of Production        (factors-of-production)
//   2.2  The Entrepreneur's Trade-offs         (entrepreneurship-tradeoffs)
//   2.3  The Economic & Legal Environment      (economic-legal-environment)
//   2.4  Technology & E-Commerce               (technological-environment, e-commerce)
//   2.5  Databases & Identity Theft            (databases, identity-theft)
// Audience: 9th grade. Key terms wrapped in **…** render green.
// ═══════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// LESSON 2.1: The Five Factors of Production
// ─────────────────────────────────────────────────────────────
export const block2a: StructuredLessonContent = {
  lessonId: "gulliver-2-1",
  sections: [
    {
      type: "concept",
      title: "The Five Building Blocks Every Business Needs",
      paragraphs: [
        "Before a business can sell anything, it has to gather the things it needs to make its product or service. Economists sort all of those things into five **factors of production**, and you can think of them as the five ingredients of any business. Combine them the right way and you can build almost anything, from a lemonade stand to a car company.",
        "The first two are the most obvious. **Land** means all the natural resources a business uses, not just the ground it sits on, but the water, oil, minerals, and crops that come from nature. **Labor** is the human work that goes into producing something: the people who cook, build, code, sell, and manage. Every hour a worker puts in is labor.",
        "**Capital** is the one people mix up the most. In business, capital does NOT mean money. It means the tools, machines, buildings, and equipment used to make things. A pizza oven, a delivery truck, and a laptop are all capital. (The money used to buy that equipment is called financial capital, but the factor of production is the equipment itself.)",
        "The last two turn the first three into an actual business. **Entrepreneurship** is the factor that organizes the other four and takes the risk: the person who decides what to make, gathers the land, labor, and capital, and accepts the loss if it fails. **Knowledge** is the skills, information, and know-how that make everything run smarter: a secret recipe, a trained mechanic, or knowing exactly where the lunch crowds gather. Miss any one of the five and the business can't really run."
      ],
      bullets: [
        "The five **factors of production**: land, labor, capital, entrepreneurship, and knowledge.",
        "**Capital** = tools, machines, and buildings, NOT the money itself.",
        "**Entrepreneurship** organizes the other four factors and bears the risk.",
        "**Knowledge** (skills and information) makes the other factors more productive."
      ],
      realWorldExample: "A food truck shows all five at once: the parking spot and ingredients (**land**), the cook (**labor**), the truck and grill (**capital**), the owner who risked their savings (**entrepreneurship**), and the secret sauce plus knowing where the crowds are (**knowledge**)."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "g21-cp1",
          question: "A bakery's brick oven and mixing machines are an example of which factor of production?",
          options: ["Land", "Labor", "Capital", "Knowledge"],
          correctAnswer: 2,
          explanation: "Machines, tools, and equipment used to make things are capital. Note that capital means the equipment itself, not the money used to buy it.",
          concept: "factors-of-production"
        },
        {
          id: "g21-cp2",
          question: "The workers who take orders and cook the food at a restaurant represent which factor?",
          options: ["Labor", "Land", "Capital", "Entrepreneurship"],
          correctAnswer: 0,
          explanation: "Labor is the human effort and work that goes into producing goods and services.",
          concept: "factors-of-production"
        },
        {
          id: "g21-cp3",
          question: "The person who came up with the idea, gathered the money, hired the staff, and took the risk represents which factor?",
          options: ["Labor", "Knowledge", "Land", "Entrepreneurship"],
          correctAnswer: 3,
          explanation: "Entrepreneurship is the factor that organizes the other four and takes on the risk of the business.",
          concept: "factors-of-production"
        }
      ]
    },
    {
      type: "scenario",
      title: "Maya Gathers Her Ingredients",
      narrative: "Maya wants to start a small bakery. Before she can sell a single cupcake, she has to pull together everything the business needs, and she quickly realizes it takes more than just 'money and an idea.'",
      details: [
        "She rents a small kitchen and buys flour, sugar, and eggs, which are natural resources and space, or **land**.",
        "She hires two part-time bakers, and that human work is **labor**.",
        "She buys ovens, mixers, and display cases, which is equipment used to make the product, or **capital**.",
        "She organized it all and put her savings on the line (**entrepreneurship**), and her grandmother's recipes are her **knowledge**."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "g21-aq1",
        question: "Maya buys three commercial ovens for her bakery. Which factor of production are the ovens?",
        options: [
          "Land, because they sit in the kitchen",
          "Capital, because they're equipment used to make the product",
          "Labor, because they do work",
          "Money, because they were expensive"
        ],
        correctAnswer: 1,
        explanation: "Ovens are tools/equipment used in production, which makes them capital. Remember: capital is the equipment itself, not the money used to buy it.",
        concept: "factors-of-production"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 2,
      questions: [
        {
          id: "g21-exit1",
          question: "Which list correctly names the five factors of production?",
          options: [
            "Land, labor, capital, entrepreneurship, knowledge",
            "Money, land, workers, taxes, profit",
            "Revenue, profit, loss, risk, reward",
            "Buyers, sellers, banks, laws, ads"
          ],
          correctAnswer: 0,
          explanation: "The five factors are land, labor, capital, entrepreneurship, and knowledge.",
          concept: "factors-of-production"
        },
        {
          id: "g21-p5",
          question: "Which factor organizes the other four and takes on the risk of the business?",
          options: ["Land", "Capital", "Entrepreneurship", "Labor"],
          correctAnswer: 2,
          explanation: "Entrepreneurship is the factor that pulls land, labor, capital, and knowledge together and bears the risk of the venture.",
          concept: "factors-of-production"
        }
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 4,
      questions: [
        {
          id: "g21-p1",
          question: "In business terms, 'capital' refers to:",
          options: [
            "The cash in the owner's bank account only",
            "The tools, machines, and buildings used to produce things",
            "The city where the government meets",
            "The workers a business hires"
          ],
          correctAnswer: 1,
          explanation: "Capital is the equipment and buildings used in production, like the ovens, trucks, and factories, not the money itself.",
          concept: "factors-of-production"
        },
        {
          id: "g21-p2",
          question: "Farmland, water, and the oil pumped from the ground all count as which factor?",
          options: ["Labor", "Land", "Capital", "Entrepreneurship"],
          correctAnswer: 1,
          explanation: "Land covers natural resources like soil, water, minerals, and oil, plus the physical space itself.",
          concept: "factors-of-production"
        },
        {
          id: "g21-p3",
          question: "The people a company hires to do its work are which factor of production?",
          options: ["Capital", "Labor", "Land", "Knowledge"],
          correctAnswer: 1,
          explanation: "Labor is the human work, physical and mental, that goes into producing a good or service.",
          concept: "factors-of-production"
        },
        {
          id: "g21-p4",
          question: "A trained chef's skill and a manager knowing exactly how to run a busy shift are examples of which factor?",
          options: ["Knowledge", "Land", "Capital", "Labor only"],
          correctAnswer: 0,
          explanation: "Knowledge is the skills, information, and know-how that make the other factors work better.",
          concept: "factors-of-production"
        },
        {
          id: "g21-p9",
          question: "A juice bar has a blender, fresh oranges, one worker, an owner who set it all up, and a secret recipe. The BLENDER is which factor?",
          options: ["Land", "Labor", "Capital", "Knowledge"],
          correctAnswer: 2,
          explanation: "The blender is a tool used to make the product, which is capital. (The oranges are land, the worker is labor, the owner is entrepreneurship, the recipe is knowledge.)",
          concept: "factors-of-production"
        },
        {
          id: "g21-p10",
          question: "Why can't a business run on money alone, no matter how much it has?",
          options: [
            "Money is illegal to use in business",
            "Money still has to be turned into the actual factors (land, labor, capital, an organizer, and know-how) to make anything",
            "Businesses never use money",
            "Money is the sixth factor of production"
          ],
          correctAnswer: 1,
          explanation: "Money by itself makes nothing. A business needs the real resources, people, tools, an entrepreneur to organize them, and knowledge to run well.",
          concept: "factors-of-production"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LESSON 2.2: The Entrepreneur's Trade-offs
// ─────────────────────────────────────────────────────────────
export const block2b: StructuredLessonContent = {
  lessonId: "gulliver-2-2",
  sections: [
    {
      type: "concept",
      title: "Your Own Boss, or a Steady Paycheck?",
      paragraphs: [
        "Being the **entrepreneur**, the person who starts and runs the business, is a real choice with real trade-offs. It isn't automatically better or worse than having a regular job; it's a different deal, and understanding that deal is the whole point.",
        "On the upside, you're your own **boss**: you make the decisions, you keep the **profits** if it works, and you build something that is yours. There's no ceiling on what you can earn, and a successful business can pay far more than any salary ever would.",
        "On the downside, there's no steady **paycheck**. An employee gets paid whether the company has a good month or a bad one; the entrepreneur gets paid last, and only if money is left after all the costs. You also work long hours and, at the start, do every job yourself as cook, cashier, bookkeeper, and marketer all at once, because a brand-new business can't afford to hire specialists.",
        "So the real trade-off is **security versus freedom and upside**. A regular job trades away some freedom and the big payoff in exchange for a reliable paycheck and less stress. Entrepreneurship trades that security for control, ownership, and a shot at a much bigger reward. Neither is simply 'right'; it depends on how much risk a person can handle and what they want out of their working life."
      ],
      bullets: [
        "Being an entrepreneur is a trade-off, not automatically better than a job.",
        "Upside: you're your own **boss**, keep the **profits**, and have no ceiling on earnings.",
        "Downside: no steady **paycheck**, long hours, and you wear every hat at first.",
        "The core trade: **security** (a job) vs. **freedom, ownership, and upside** (a business)."
      ],
      realWorldExample: "Two friends graduate. One takes a $50,000 salaried job that is steady, predictable, and low stress. The other opens a sneaker-customizing business that might earn $10,000 this year or $150,000, nobody knows yet. Same year, completely different trade between security and upside."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "g21-exit2",
          question: "Which is a real TRADE-OFF of being an entrepreneur instead of an employee?",
          options: [
            "You get a guaranteed steady paycheck every week",
            "You give up a steady paycheck but gain freedom and the chance to keep the profits",
            "You have no risk at all",
            "You are not allowed to hire anyone"
          ],
          correctAnswer: 1,
          explanation: "Entrepreneurs trade the security of a steady paycheck for freedom, control, and the upside of profit, while carrying the risk if the business fails.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "g21-p6",
          question: "Which is a DOWNSIDE of being an entrepreneur compared to having a regular job?",
          options: [
            "You can never keep any profit",
            "There is no steady paycheck and you carry the risk if it fails",
            "You are forced to work fewer hours",
            "You can't make any decisions yourself"
          ],
          correctAnswer: 1,
          explanation: "Entrepreneurs give up the safety of a steady paycheck and shoulder the risk, which is the trade for freedom and potential profit.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "g21-p7",
          question: "Which is an UPSIDE of entrepreneurship?",
          options: [
            "A guaranteed salary no matter what",
            "Being your own boss and keeping the profits",
            "Never having to work hard",
            "Zero chance of losing money"
          ],
          correctAnswer: 1,
          explanation: "Entrepreneurs get independence and keep the profits if the business succeeds, the reward side of the trade-off.",
          concept: "entrepreneurship-tradeoffs"
        }
      ]
    },
    {
      type: "scenario",
      title: "Two Job Offers",
      narrative: "After graduation, Priya has two paths. A local company offers her a salaried job: $48,000 a year, predictable hours, and a steady paycheck every two weeks. At the same time, she has a chance to run her own tutoring business, where her income could be anywhere from $20,000 to $90,000, she'd set her own schedule, but nothing is guaranteed and she'd do every job herself at first.",
      details: [
        "The salaried job offers **security**: a reliable paycheck and set hours, win or lose.",
        "The tutoring business offers **freedom and upside**: she's her own **boss** and keeps the **profits**, with no ceiling on earnings.",
        "But the business has no steady **paycheck**, and she'd be tutor, scheduler, and bookkeeper all at once.",
        "Neither choice is 'right'; it comes down to how much risk Priya can handle and what she values most."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "g22b-aq1",
        question: "Priya values a predictable income and low stress over a shot at a big payoff. Based on the trade-offs, which fits her better?",
        options: [
          "The tutoring business, because it's always more profitable",
          "The salaried job, because it trades upside for security and a steady paycheck",
          "Neither, the two options are identical",
          "The tutoring business, because it has no risk"
        ],
        correctAnswer: 1,
        explanation: "Someone who prizes security and predictability over a big possible payoff is a better fit for the steady job. That's exactly the trade-off entrepreneurship asks you to weigh.",
        concept: "entrepreneurship-tradeoffs"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 2,
      questions: [
        {
          id: "g21-p8",
          question: "Why is it said that the entrepreneur 'gets paid last'?",
          options: [
            "Because the law requires owners to be paid last",
            "Because they only keep what's left after all the costs are paid, and nothing if there's a loss",
            "Because banks hold their money for a year",
            "Because employees refuse to let them get paid"
          ],
          correctAnswer: 1,
          explanation: "Employees are paid whether the business profits or not; the entrepreneur keeps only what remains after costs, which is why they bear the risk.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "g22b-exit1",
          question: "The core trade-off between a regular job and entrepreneurship is best summed up as:",
          options: [
            "Fun vs. boredom",
            "Security vs. freedom, ownership, and upside",
            "Working indoors vs. outdoors",
            "Legal vs. illegal work"
          ],
          correctAnswer: 1,
          explanation: "A job trades freedom and a big payoff for a steady paycheck and less stress; entrepreneurship trades that security for control, ownership, and a bigger possible reward.",
          concept: "entrepreneurship-tradeoffs"
        }
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 4,
      questions: [
        {
          id: "g22b-p1",
          question: "The single biggest thing an entrepreneur gives up compared to a regular employee is:",
          options: [
            "The chance to make decisions",
            "A steady, predictable paycheck",
            "The ability to work hard",
            "Any chance of earning money"
          ],
          correctAnswer: 1,
          explanation: "Employees get paid regardless of how the company does; the entrepreneur gives up that guaranteed paycheck for a shot at bigger rewards.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "g22b-p2",
          question: "Being 'your own boss' as an entrepreneur mainly means:",
          options: [
            "You never have to work",
            "You make the decisions, and you live with the results, good or bad",
            "Someone else is responsible for everything",
            "You are guaranteed to succeed"
          ],
          correctAnswer: 1,
          explanation: "Being your own boss is freedom to decide, paired with full responsibility for how those decisions turn out.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "g22b-p3",
          question: "Why do new entrepreneurs often 'wear every hat' at the start?",
          options: [
            "It's a legal requirement",
            "A brand-new business usually can't afford to hire specialists, so the owner does many jobs",
            "They enjoy being disorganized",
            "Employees aren't allowed in a new business"
          ],
          correctAnswer: 1,
          explanation: "Early on there's little money to hire, so the founder is often the cook, cashier, bookkeeper, and marketer all at once.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "g22b-p4",
          question: "One appeal of entrepreneurship over a salaried job is that:",
          options: [
            "There is a fixed limit on what you can earn",
            "There is no set ceiling on how much you can earn if it succeeds",
            "You can never lose money",
            "The hours are always shorter"
          ],
          correctAnswer: 1,
          explanation: "A salary is usually capped; a successful business can pay far more, which is part of the upside entrepreneurs are betting on.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "g22b-p5",
          question: "Someone who strongly values a predictable schedule and steady income over a big possible payoff would probably prefer:",
          options: [
            "Starting a risky business",
            "A regular salaried job",
            "Neither, those don't differ",
            "Whichever is louder"
          ],
          correctAnswer: 1,
          explanation: "The steady job matches a preference for security and predictability. Entrepreneurship suits people willing to trade that away for upside.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "g22b-p6",
          question: "Which of these is NOT a trade-off of choosing entrepreneurship?",
          options: [
            "Giving up a steady paycheck",
            "Getting a guaranteed salary every week no matter what",
            "Working long hours and doing many jobs at first",
            "Carrying the risk if the business fails"
          ],
          correctAnswer: 1,
          explanation: "A guaranteed weekly salary is a feature of a regular job, not of entrepreneurship. The others are all real trade-offs entrepreneurs accept.",
          concept: "entrepreneurship-tradeoffs"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LESSON 2.3: The Economic & Legal Environment
// ─────────────────────────────────────────────────────────────
export const block2c: StructuredLessonContent = {
  lessonId: "gulliver-2-3",
  sections: [
    {
      type: "concept",
      title: "The Rules and Conditions a Business Can't Control",
      paragraphs: [
        "No business exists in a bubble. Every one operates inside an **economic and legal environment**: the taxes, laws, court system, and overall economy set by the world around it. An owner doesn't control these things, but they shape how hard or easy it is to succeed.",
        "The government can **help** business or **hinder** it. It helps when it enforces contracts fairly, keeps prices stable, keeps rules simple, and provides useful public services like roads. It hinders when it piles on heavy taxes, changes the rules unpredictably, or lets the economy swing wildly. Same business, very different odds depending on the environment.",
        "Fair courts matter more than people think. When a business signs a deal, it needs to trust that the deal will be honored, that a customer who owes money can be made to pay, or a supplier who breaks a contract can be held responsible. That trust, backed by courts, is what makes people willing to do business with strangers at all.",
        "The broader economy matters just as much. When the economy is growing and people have money, businesses find it easier to sell. When it's shrinking or prices are unstable, even a good business struggles. That's why owners watch the economic environment closely: a great product can still fail in a bad economy, and a mediocre one can coast in a booming one."
      ],
      bullets: [
        "The **economic and legal environment** is the taxes, laws, courts, and economy a business operates in.",
        "Government **helps** with fair courts, stable prices, simple rules, and useful services.",
        "Government **hinders** with heavy taxes, confusing rules, and instability.",
        "A booming economy makes selling easier; a shaky one makes even good businesses struggle."
      ],
      realWorldExample: "Two identical coffee shops open the same week. One is where taxes are low, courts are fair, and the economy is growing; the other is where taxes are high, rules change monthly, and the economy is shrinking. The shops are the same, but their odds of survival are not."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "g22-cp1",
          question: "Which government action is most likely to HELP businesses grow?",
          options: [
            "Enforcing contracts fairly and keeping taxes and rules stable",
            "Making the rules change unpredictably every month",
            "Letting prices swing wildly with no stability",
            "Adding heavy new taxes on small startups"
          ],
          correctAnswer: 0,
          explanation: "Fair courts let businesses trust their deals, and stable, predictable taxes and rules make a business easier and less risky to run, which is the legal environment helping business.",
          concept: "economic-legal-environment"
        },
        {
          id: "g22-cp2",
          question: "Which of these would most likely HINDER a small business?",
          options: [
            "A stable economy with steady prices",
            "Very high taxes and confusing, constantly changing regulations",
            "Fair courts that enforce contracts",
            "Reliable electricity and internet"
          ],
          correctAnswer: 1,
          explanation: "High taxes and confusing, shifting rules make it harder and riskier to run a business. The other choices support business activity.",
          concept: "economic-legal-environment"
        },
        {
          id: "g22-cp3",
          question: "Why does the economic and legal environment matter to someone deciding whether to open a shop?",
          options: [
            "Laws, taxes, and the economy have no effect on a business",
            "Taxes, rules, and the state of the economy shape how easy, risky, and profitable the business can be",
            "Only the weather affects a business",
            "It only matters to huge corporations"
          ],
          correctAnswer: 1,
          explanation: "The economic and legal environment (taxes, regulations, enforcement, and the economy) directly affects how easy and profitable it is to start and run any business.",
          concept: "economic-legal-environment"
        }
      ]
    },
    {
      type: "scenario",
      title: "Same Shop, Two Towns",
      narrative: "Leo has a solid plan for a smoothie shop and could open it in one of two towns. Town A has low business taxes, simple permits, reliable power, and a growing economy. Town B has high taxes, permit rules that change every few months, frequent blackouts, and an economy that's shrinking. His smoothie recipe and prices would be identical in either place.",
      details: [
        "In Town A, the **economic and legal environment** helps: low taxes, simple rules, and a growing economy make it easier to open and sell.",
        "In Town B, that same environment hinders: high taxes, shifting rules, and a shrinking economy raise his costs and his risk.",
        "Leo controls his recipe and service, but not the environment around his shop.",
        "The very same business has very different odds of surviving depending on where it opens."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "g23-aq1",
        question: "Leo's smoothie shop is identical in both towns. Why might it succeed in Town A but struggle in Town B?",
        options: [
          "Because smoothies taste different in different towns",
          "Because the economic and legal environment (taxes, rules, and the economy) shapes a business's odds, even when the business itself is the same",
          "Because Town B is farther away",
          "Because the environment has no effect on business"
        ],
        correctAnswer: 1,
        explanation: "A business doesn't control its environment, but taxes, rules, reliability, and the state of the economy strongly affect whether it can succeed.",
        concept: "economic-legal-environment"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 2,
      questions: [
        {
          id: "g22-p1",
          question: "A new law makes it cheaper and simpler to register a small business. This is an example of the government:",
          options: [
            "Hindering business",
            "Helping business through the legal environment",
            "Practicing e-commerce",
            "Committing identity theft"
          ],
          correctAnswer: 1,
          explanation: "Simpler, cheaper rules make it easier to start a company, which is the legal environment helping business.",
          concept: "economic-legal-environment"
        },
        {
          id: "g22-p2",
          question: "A shaky economy with wildly swinging prices is part of which environment a business must deal with?",
          options: [
            "The technological environment",
            "The economic and legal environment",
            "The database environment",
            "The B2C environment"
          ],
          correctAnswer: 1,
          explanation: "Economic conditions like unstable prices are part of the economic and legal environment that shapes how businesses operate.",
          concept: "economic-legal-environment"
        }
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 4,
      questions: [
        {
          id: "g23-p1",
          question: "Which of these is part of a business's economic and legal environment?",
          options: [
            "The taxes, laws, and overall state of the economy",
            "The owner's favorite color",
            "The number of letters in the company name",
            "The weather on opening day only"
          ],
          correctAnswer: 0,
          explanation: "The economic and legal environment is the taxes, laws, courts, and economic conditions a business operates within.",
          concept: "economic-legal-environment"
        },
        {
          id: "g23-p2",
          question: "Why do fair courts that enforce contracts help businesses?",
          options: [
            "They make businesses pay more taxes",
            "They let businesses trust that deals will be honored, so people are willing to trade with strangers",
            "They have no effect on business",
            "They force all prices to be equal"
          ],
          correctAnswer: 1,
          explanation: "If a deal can be enforced, businesses can trust customers and suppliers they don't personally know, and that trust makes trade possible.",
          concept: "economic-legal-environment"
        },
        {
          id: "g23-p3",
          question: "Why does a shrinking economy make even a good business struggle?",
          options: [
            "Good businesses are immune to the economy",
            "When people have less money and are worried, they buy less, so sales fall for almost everyone",
            "A shrinking economy raises everyone's sales",
            "The economy only affects bad businesses"
          ],
          correctAnswer: 1,
          explanation: "In a weak economy, customers spend less, so even a well-run business finds it harder to sell, because the environment affects everyone.",
          concept: "economic-legal-environment"
        },
        {
          id: "g23-p4",
          question: "Rules that change unpredictably every few months mostly hurt businesses because they:",
          options: [
            "Make it easier to plan ahead",
            "Make it hard to plan and add risk and cost to running the business",
            "Guarantee higher profits",
            "Have no effect at all"
          ],
          correctAnswer: 1,
          explanation: "Businesses need stable rules to plan and invest. Constant, unpredictable change adds cost and risk, which hinders them.",
          concept: "economic-legal-environment"
        },
        {
          id: "g23-p5",
          question: "Which pair correctly labels one HELP and one HINDER from the government?",
          options: [
            "Help: heavy new taxes · Hinder: fair courts",
            "Help: stable, simple rules · Hinder: taxes and rules that change unpredictably",
            "Help: unreliable power · Hinder: a growing economy",
            "Help: confusing regulations · Hinder: enforcing contracts"
          ],
          correctAnswer: 1,
          explanation: "Stable, simple rules help businesses plan; unpredictable taxes and rules hinder them. The other pairs mix up which is which.",
          concept: "economic-legal-environment"
        },
        {
          id: "g23-p6",
          question: "A business owner can control their product and prices, but NOT:",
          options: [
            "The recipe they use",
            "The taxes, laws, and overall economy around them",
            "How friendly their staff is",
            "What hours they stay open"
          ],
          correctAnswer: 1,
          explanation: "The economic and legal environment is set by the world around the business. Owners must work within it, not control it.",
          concept: "economic-legal-environment"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LESSON 2.4: Technology & E-Commerce
// ─────────────────────────────────────────────────────────────
export const block2d: StructuredLessonContent = {
  lessonId: "gulliver-2-4",
  sections: [
    {
      type: "concept",
      title: "How Technology Rewrote What a Business Can Do",
      paragraphs: [
        "The **technological environment** is the fast-changing world of tools and tech a business lives in, and it has completely rewritten what's possible. Technology now lets a tiny business do what only big companies used to be able to: reach customers anywhere, take payments instantly, and run the whole thing from a bedroom.",
        "Not long ago, selling to customers in another state meant being a big company with warehouses, catalogs, and lots of money for shipping and ads. Technology tore down that barrier, and now a teenager with a phone and a free storefront app can do the same thing. That's a huge shift in who gets to start a business.",
        "The clearest example is **e-commerce**: buying and selling online. A teenager can run a store from their phone and ship to another state. There are two main kinds. When a business sells straight to everyday shoppers, that's **B2C** (business-to-consumer), like an online sneaker shop selling to teens. When a business sells to *other businesses*, that's **B2B** (business-to-business), like a company that supplies the cardboard boxes that sneaker shop ships in.",
        "The difference between B2C and B2B isn't just trivia; it changes everything about how you sell. B2C often means lots of small orders, catchy ads, and building a brand people love. B2B usually means fewer, bigger orders, long-term contracts, and selling on reliability and price. Same internet, two very different games."
      ],
      bullets: [
        "The **technological environment** is the ever-changing set of tech tools a business must keep up with.",
        "Technology let small businesses reach far-away customers, something that used to require a big company.",
        "**E-commerce** is buying and selling online.",
        "**B2C** sells to everyday shoppers; **B2B** sells to other businesses."
      ],
      realWorldExample: "An online custom-sticker shop is pure e-commerce: a teen takes orders through a website (B2C, selling to shoppers) and buys blank sticker sheets online from a supplier (that supplier is doing B2B). Neither could have reached the other so easily before the internet."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "g22-exit1",
          question: "An online store that sells phone cases straight to shoppers is an example of:",
          options: [
            "B2B e-commerce (business to business)",
            "B2C e-commerce (business to consumer)",
            "A nonprofit",
            "Insourcing"
          ],
          correctAnswer: 1,
          explanation: "Selling directly to individual shoppers over the internet is B2C e-commerce. B2B would be selling to other businesses instead.",
          concept: "e-commerce"
        },
        {
          id: "g22-p4",
          question: "A company that sells cardboard boxes to other businesses (not to everyday shoppers) is doing:",
          options: ["B2C e-commerce", "B2B e-commerce", "A nonprofit mission", "Outsourcing its labor"],
          correctAnswer: 1,
          explanation: "Selling to other businesses rather than individual consumers is B2B (business-to-business).",
          concept: "e-commerce"
        },
        {
          id: "g22-p5",
          question: "E-commerce is best described as:",
          options: [
            "Selling only inside a physical store",
            "Buying and selling goods or services over the internet",
            "A type of factor of production",
            "A government tax"
          ],
          correctAnswer: 1,
          explanation: "E-commerce is trade done online, buying and selling over the internet rather than only in a physical store.",
          concept: "e-commerce"
        }
      ]
    },
    {
      type: "scenario",
      title: "A Store From a Bedroom",
      narrative: "Sixteen-year-old Riya starts a custom phone-case business from her bedroom. She designs the cases, lists them on a free online store, and ships them across the country. She buys her blank cases and packaging from an online supplier that only sells to businesses in bulk.",
      details: [
        "Riya's whole business runs on the **technological environment**: a phone, a free storefront, and online payments.",
        "Selling her cases directly to teenagers online is **e-commerce**, and specifically **B2C** (business-to-consumer).",
        "Her supplier, which sells blank cases in bulk to businesses like Riya, is doing **B2B** (business-to-business).",
        "None of this was easy for a solo teen before the internet, since reaching customers nationwide used to require a big company."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "g24-aq1",
        question: "Riya's supplier only sells blank cases in bulk to other businesses. That supplier is an example of:",
        options: [
          "B2C (selling to everyday shoppers)",
          "B2B (selling to other businesses)",
          "A nonprofit",
          "Identity theft"
        ],
        correctAnswer: 1,
        explanation: "Selling to other businesses (like Riya's shop) rather than to individual consumers is B2B. Riya selling finished cases to teens is B2C.",
        concept: "e-commerce"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 2,
      questions: [
        {
          id: "g22-exit2",
          question: "How does the technological environment change what small businesses can do?",
          options: [
            "It makes it impossible for small businesses to exist",
            "It lets even a tiny business reach customers far away and run online",
            "It only matters for banks",
            "It has no effect on business"
          ],
          correctAnswer: 1,
          explanation: "Technology lets small businesses sell online and reach distant customers, something that used to require a big company.",
          concept: "technological-environment"
        },
        {
          id: "g22-p3",
          question: "Technology keeps changing the tools businesses use. This fast-moving world of tech is called the:",
          options: [
            "Economic environment",
            "Technological environment",
            "Legal environment",
            "Natural environment"
          ],
          correctAnswer: 1,
          explanation: "The technological environment is the ever-changing set of tools and technology a business must keep up with.",
          concept: "technological-environment"
        }
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 4,
      questions: [
        {
          id: "g24-p1",
          question: "What is the biggest thing e-commerce lets a small business do?",
          options: [
            "Avoid paying for any supplies",
            "Reach customers far away and sell online without a big physical store",
            "Guarantee it will make a profit",
            "Skip needing a product at all"
          ],
          correctAnswer: 1,
          explanation: "E-commerce lets even a tiny business sell to distant customers online, a reach that used to require a large company.",
          concept: "e-commerce"
        },
        {
          id: "g24-p2",
          question: "A brand sells hoodies straight to teenagers through its own website. This is:",
          options: ["B2B", "B2C", "A nonprofit", "Insourcing"],
          correctAnswer: 1,
          explanation: "Selling directly to individual shoppers (the teens) is B2C, or business-to-consumer.",
          concept: "e-commerce"
        },
        {
          id: "g24-p3",
          question: "A factory sells fabric in huge rolls to clothing companies. This is:",
          options: ["B2C", "B2B", "A nonprofit", "A loss"],
          correctAnswer: 1,
          explanation: "Selling to other businesses (the clothing companies) rather than everyday shoppers is B2B, or business-to-business.",
          concept: "e-commerce"
        },
        {
          id: "g24-p4",
          question: "What is the main difference between B2C and B2B?",
          options: [
            "B2C sells to everyday shoppers; B2B sells to other businesses",
            "B2C is illegal; B2B is legal",
            "They are exactly the same",
            "B2C is offline; B2B is online"
          ],
          correctAnswer: 0,
          explanation: "B2C = business-to-consumer (selling to shoppers). B2B = business-to-business (selling to other companies).",
          concept: "e-commerce"
        },
        {
          id: "g24-p5",
          question: "Before the internet, selling to customers in another state usually required:",
          options: [
            "Just a phone and a free app",
            "Being a big company with warehouses, catalogs, and money for shipping and ads",
            "Nothing at all",
            "A government permit only"
          ],
          correctAnswer: 1,
          explanation: "Reaching far-away customers used to take the scale of a big company. Technology removed that barrier, so even a solo teen can do it now.",
          concept: "technological-environment"
        },
        {
          id: "g24-p6",
          question: "Why does whether a business is B2C or B2B change how it sells?",
          options: [
            "It doesn't change anything",
            "B2C often means many small orders and building a brand; B2B often means fewer, bigger orders and long-term contracts",
            "B2B businesses can't use the internet",
            "B2C businesses aren't allowed to advertise"
          ],
          correctAnswer: 1,
          explanation: "Selling to shoppers (B2C) and selling to businesses (B2B) are different games, with different order sizes, relationships, and ways of competing.",
          concept: "e-commerce"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LESSON 2.5: Databases & Identity Theft
// ─────────────────────────────────────────────────────────────
export const block2e: StructuredLessonContent = {
  lessonId: "gulliver-2-5",
  sections: [
    {
      type: "concept",
      title: "The Data a Business Keeps, and Why It's a Target",
      paragraphs: [
        "To run an online business, companies rely on **databases**: organized digital collections of information like customer names, addresses, orders, and payment details. A database is powerful because it lets a business remember and use everything about its customers: who bought what, where to ship it, and how to reach them again. That memory is a huge advantage.",
        "But that same pile of personal information also makes a business a target. A database full of real names, addresses, and card numbers is exactly what criminals want, which is why data is both a business's biggest asset and its biggest responsibility.",
        "When criminals break into a database and steal personal information, it can lead to **identity theft**, where someone uses your name, card number, or Social Security number to commit fraud in your name. They might open credit cards you never asked for, make purchases you never made, or file for benefits pretending to be you. The victim often doesn't find out until the damage is done.",
        "That's why protecting data is now part of running any business, and why you protect yourself too. Use strong, unique **passwords** (not the same one everywhere), be careful about who you share personal info with, and pay attention to how companies store your data. In the technological environment, information is valuable to the business, and unfortunately to thieves, so guarding it matters for everyone."
      ],
      bullets: [
        "A **database** is an organized digital store of info: customers, orders, addresses, payments.",
        "Databases make a business powerful, but a pile of personal data is a target for criminals.",
        "Stolen data can cause **identity theft**, with someone committing fraud in your name.",
        "Protect yourself with strong, unique **passwords** and by guarding your personal info."
      ],
      realWorldExample: "An online shop's database of thousands of customers' names and card numbers is gold to a hacker. If it's stolen, those customers can face identity theft, with charges and accounts opened in their names, which is why the shop has to guard its data as carefully as its cash."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "g22-p6",
          question: "What is a database in a business?",
          options: [
            "A physical safe full of cash",
            "An organized digital collection of information like customer names and orders",
            "A type of factory machine",
            "A government tax form"
          ],
          correctAnswer: 1,
          explanation: "A database is an organized digital store of information (customers, orders, payments) that a business uses to run.",
          concept: "databases"
        },
        {
          id: "g22-p7",
          question: "Why does a business's database make it a target for criminals?",
          options: [
            "Because a database is just harmless public information",
            "Because it holds personal information they can use for identity theft",
            "Because criminals can resell the database software for cash",
            "Because it is the only backup the business keeps"
          ],
          correctAnswer: 1,
          explanation: "Databases hold personal details. If stolen, criminals can use names, card numbers, or IDs to commit fraud, which is identity theft.",
          concept: "databases"
        },
        {
          id: "g22-p8",
          question: "Why can a stolen company database lead to identity theft?",
          options: [
            "Because a hacked database shuts down the company's website",
            "Because criminals can use the stolen personal info to commit fraud in someone's name",
            "Because the business loses all of its sales records",
            "Because identity theft only happens offline"
          ],
          correctAnswer: 1,
          explanation: "Databases hold personal information. If stolen, criminals can use it to open accounts or make charges in your name, which is identity theft.",
          concept: "identity-theft"
        }
      ]
    },
    {
      type: "scenario",
      title: "The Sticker Shop Gets Hacked",
      narrative: "Jordan runs a small online sticker shop from home. Orders arrive through the website, and every customer's name, address, and card details are saved in the shop's database. One morning, Jordan gets an alert: someone broke into that database overnight.",
      details: [
        "The shop is pure e-commerce: everything happens online, and it ships nationwide.",
        "All that customer information lived in a **database**, which is exactly what the thieves were after.",
        "With stolen names and card numbers, criminals can commit **identity theft** against Jordan's customers.",
        "Jordan realizes protecting the database is as important as making sales, because customer data is a responsibility, not just an asset."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "g22-aq1",
        question: "Why is a stolen customer database so dangerous?",
        options: [
          "Because the shop would lose track of which orders to ship",
          "Because criminals can use the stolen personal information to commit identity theft",
          "Because rebuilding the customer list would take the shop weeks",
          "Because the shop's card reader would stop working"
        ],
        correctAnswer: 1,
        explanation: "A database holds personal details like names and card numbers. If stolen, criminals can use them to commit identity theft, meaning fraud in someone else's name.",
        concept: "identity-theft"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 2,
      questions: [
        {
          id: "g22-p9",
          question: "Which habit best helps protect against identity theft?",
          options: [
            "Reusing the same simple password everywhere",
            "Using strong, unique passwords and being careful about sharing personal info",
            "Posting your Social Security number online",
            "Ignoring how companies store your data"
          ],
          correctAnswer: 1,
          explanation: "Strong, unique passwords and being careful with personal information make it much harder for criminals to steal your identity.",
          concept: "identity-theft"
        },
        {
          id: "g25-exit1",
          question: "Why is a business's data called both its 'biggest asset and biggest responsibility'?",
          options: [
            "Because data is worthless",
            "Because it makes the business powerful (remembering customers) but must be protected from theft",
            "Because data can never be stolen",
            "Because only the government can hold data"
          ],
          correctAnswer: 1,
          explanation: "A database is a huge advantage, but the personal info it holds must be guarded, because if stolen, it can harm customers through identity theft.",
          concept: "databases"
        }
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 4,
      questions: [
        {
          id: "g25-p1",
          question: "What kind of information does a business database usually hold?",
          options: [
            "Only the company's logo",
            "Customer names, addresses, orders, and payment details",
            "The weather forecast",
            "Nothing personal at all"
          ],
          correctAnswer: 1,
          explanation: "Databases store the details a business needs to run: who its customers are, what they ordered, where to ship, and how they paid.",
          concept: "databases"
        },
        {
          id: "g25-p2",
          question: "Identity theft is best described as:",
          options: [
            "Losing your phone",
            "Someone using your personal information, like your name, card number, or SSN, to commit fraud in your name",
            "Forgetting your password",
            "A store running out of a product"
          ],
          correctAnswer: 1,
          explanation: "Identity theft is when a criminal uses your personal info to pretend to be you, opening accounts or making charges in your name.",
          concept: "identity-theft"
        },
        {
          id: "g25-p3",
          question: "A store's database is hacked. What is the biggest danger to its customers?",
          options: [
            "Their favorite product might be discontinued",
            "Their stolen personal information can be used for identity theft",
            "The store's colors might change",
            "Nothing, a hack never affects customers"
          ],
          correctAnswer: 1,
          explanation: "The real danger of a breach is that customers' personal data can be used to commit fraud in their names.",
          concept: "identity-theft"
        },
        {
          id: "g25-p4",
          question: "Which is the STRONGEST habit for protecting your personal information online?",
          options: [
            "Using your birthday as the password for everything",
            "Using different, strong passwords for different accounts and sharing personal info carefully",
            "Emailing your passwords to yourself",
            "Posting your address publicly so companies can find you"
          ],
          correctAnswer: 1,
          explanation: "Unique, strong passwords mean one leaked account doesn't unlock the rest, and guarding personal info limits what thieves can get.",
          concept: "identity-theft"
        },
        {
          id: "g25-p5",
          question: "Why is a database considered a business's biggest asset?",
          options: [
            "Because it's made of expensive metal",
            "Because remembering customers, orders, and how to reach them is a huge advantage",
            "Because it can never be hacked",
            "Because the government pays businesses to keep one"
          ],
          correctAnswer: 1,
          explanation: "A database lets a business remember and use everything about its customers, a powerful advantage as long as it's protected.",
          concept: "databases"
        },
        {
          id: "g25-p6",
          question: "A company stores millions of customers' names and card numbers. What is its responsibility?",
          options: [
            "To sell that data to the highest bidder",
            "To protect that data carefully, because a breach could expose customers to identity theft",
            "To post the data publicly",
            "To ignore security since data can't be stolen",
          ],
          correctAnswer: 1,
          explanation: "Holding personal data is a responsibility: the business must guard it, since a breach can harm customers through identity theft.",
          concept: "databases"
        }
      ]
    }
  ]
}
