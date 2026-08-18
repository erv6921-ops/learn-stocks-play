import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// GULLIVER INTRO TO BUSINESS — CHAPTER 1, LEARNING-OBJECTIVE-ALIGNED LESSONS
// One StructuredLessonContent per Byrnes Ch.1 learning objective, following the
// concept → micro-check[2] → scenario → applied-question → mastery-check[7]
// pattern used in block1. Audience: 9th grade. Key terms wrapped in **…**.
//
// NOTE: LO 1-1 and LO 1-2 were not created in a prior pass (the file they were
// supposedly appended to never existed), so this file currently begins at
// LO 1-3. Add gulliverLO1_1 / gulliverLO1_2 above these when their source
// content is available.
// ═══════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// LO 1-3 — The Economic Environment and Taxes
// Byrnes Ch.1, LO 1-3: Analyze the effects of the economic environment
// and taxes on businesses.
// ─────────────────────────────────────────────────────────────
export const gulliverLO1_3: StructuredLessonContent = {
  lessonId: "gulliver-lo-1-3",
  sections: [
    {
      type: "concept",
      title: "How Government and Taxes Shape the Risk of Starting a Business",
      paragraphs: [
        "A business doesn't operate in a vacuum — it operates inside an **economic environment** set largely by government. In less developed countries, entrepreneurs face extra risk because that environment is often missing basic protections. Governments can reduce that risk and help entrepreneurs by allowing **private ownership** of businesses, passing laws that let businesspeople write **enforceable contracts** (so deals actually get honored in court), establishing a **currency** that's tradable in world markets, and helping lessen **corruption** in business and government.",
        "**Taxes** and **regulations** matter just as much. From a business perspective, lower taxes and lighter regulation mean lower risk, more room to grow, and more money staying with both workers and the business itself. Higher taxes and heavier regulation raise the cost and risk of doing business — which is exactly why the economic environment is one of the biggest factors entrepreneurs weigh before starting or expanding a business.",
        "This connects straight back to risk and reward: a country with unclear property rights, an unstable currency, high corruption, and unpredictable taxes is a much riskier place to build a business than one with strong legal protections and stable, moderate taxes — even if the market opportunity looks identical."
      ],
      bullets: [
        "Private ownership + enforceable contracts + a stable, tradable currency = lower risk for entrepreneurs.",
        "Reducing corruption in business and government also lowers the risk of starting a business.",
        "Lower taxes and lighter regulation generally mean lower risk, more growth, and more money for workers and government.",
        "The economic environment (laws, currency stability, taxes, corruption level) can matter as much as the business idea itself."
      ],
      realWorldExample: "Two entrepreneurs have the exact same business idea — one in a country with enforceable contracts, a stable currency, and low corruption, and one without any of that. The first entrepreneur can safely sign supplier deals and count on being paid; the second can't fully trust their own contracts will be honored. Same idea, very different risk."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "glo13-mc-1",
          question: "Which government action helps REDUCE the risk of starting a business?",
          options: [
            "Making contracts unenforceable in court",
            "Allowing private ownership of businesses and enforceable contracts",
            "Increasing corruption in government",
            "Making the currency impossible to trade internationally"
          ],
          correctAnswer: 1,
          explanation: "Private ownership and enforceable contracts give entrepreneurs real legal protection, lowering the risk of starting a business.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mc-2",
          question: "From a business perspective, what do lower taxes and lighter regulation generally mean?",
          options: [
            "Higher risk and less growth",
            "Lower risk, more growth, and more money for workers and government",
            "No effect on risk or growth at all",
            "Businesses always prefer higher taxes"
          ],
          correctAnswer: 1,
          explanation: "Lower taxes and regulation reduce cost and risk, which generally supports more growth and leaves more money for workers and the government both.",
          concept: "economic-environment"
        }
      ]
    },
    {
      type: "scenario",
      title: "Opening a Shop in Two Different Countries",
      narrative: "An entrepreneur is deciding between opening the exact same shop in Country A, which has enforceable contracts, a stable currency, and low corruption, versus Country B, which has none of those things but a slightly bigger potential customer base.",
      details: [
        "In Country A, a signed supplier contract is a real guarantee — courts will enforce it if broken.",
        "In Country B, that same contract might not hold up, and bribes might be needed just to operate.",
        "Country A's stable currency means profits keep their value; Country B's unstable currency could wipe out profits overnight.",
        "Even with a smaller customer base, Country A is the lower-risk choice because of its economic environment."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "glo13-aq1",
        question: "Why might the entrepreneur choose Country A even though Country B has more potential customers?",
        options: [
          "Because customer base never matters in business",
          "Because Country A's stronger economic environment (enforceable contracts, stable currency, less corruption) lowers the overall risk of doing business there",
          "Because Country B doesn't allow any businesses to open",
          "Because taxes are irrelevant to this decision"
        ],
        correctAnswer: 1,
        explanation: "A stronger economic environment can outweigh a bigger customer base, because it directly lowers the risk of operating and protects the business's profits.",
        concept: "economic-environment"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 3,
      questions: [
        {
          id: "glo13-mx-1",
          question: "What does 'enforceable contracts' mean for a business owner?",
          options: [
            "Contracts are optional suggestions with no legal weight",
            "Courts will make sure agreements are honored, giving businesspeople real legal protection",
            "Only the government can sign contracts",
            "Contracts can be broken with no consequences"
          ],
          correctAnswer: 1,
          explanation: "Enforceable contracts mean the courts back up business agreements, which protects entrepreneurs from being cheated.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-2",
          question: "Why does a stable, tradable currency matter to a business?",
          options: [
            "It has no real effect on a business",
            "It protects the value of profits and makes it possible to trade in world markets",
            "It only matters for governments, not businesses",
            "It guarantees a business will be profitable"
          ],
          correctAnswer: 1,
          explanation: "A stable currency protects the real value of a business's earnings and enables trade with the rest of the world.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-3",
          question: "How does corruption in business and government generally affect entrepreneurs?",
          options: [
            "It has no impact on risk",
            "It increases risk and cost, making it harder to start and run a business fairly",
            "It always lowers taxes for entrepreneurs",
            "It guarantees enforceable contracts"
          ],
          correctAnswer: 1,
          explanation: "Corruption raises the cost and unpredictability of doing business, increasing overall risk for entrepreneurs.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-4",
          question: "What is the general relationship between tax/regulation levels and business risk?",
          options: [
            "Higher taxes and regulation generally lower risk",
            "Lower taxes and lighter regulation generally mean lower risk and more room to grow",
            "Taxes and regulation have no connection to risk",
            "Regulation always increases growth regardless of level"
          ],
          correctAnswer: 1,
          explanation: "Lower taxes and lighter regulation reduce the cost and risk of doing business, generally supporting more growth.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-5",
          question: "A country allows private ownership but has an unstable, hard-to-trade currency. What's the likely effect on entrepreneurs there?",
          options: [
            "Zero risk, since private ownership solves everything",
            "Private ownership helps, but the unstable currency still adds real risk to running a business there",
            "The currency situation is irrelevant to business",
            "Businesses cannot legally operate under any currency instability"
          ],
          correctAnswer: 1,
          explanation: "Each part of the economic environment matters — private ownership helps, but an unstable currency is still a serious separate risk.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-6",
          question: "From a government's perspective, why might keeping taxes and regulations moderate benefit the country overall?",
          options: [
            "It has no effect on the country",
            "It can encourage more business growth, which means more jobs and more overall tax revenue in the long run",
            "It guarantees zero business failures",
            "It eliminates the need for enforceable contracts"
          ],
          correctAnswer: 1,
          explanation: "Moderate taxes and regulation can encourage more business activity, which can grow the overall tax base even at a lower rate.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-7",
          question: "Which combination describes an economic environment that LOWERS risk for entrepreneurs?",
          options: [
            "High corruption, unstable currency, unenforceable contracts",
            "Private ownership, enforceable contracts, a stable tradable currency, low corruption",
            "No laws about business ownership at all",
            "Unpredictable, constantly changing tax rates"
          ],
          correctAnswer: 1,
          explanation: "Private ownership, enforceable contracts, currency stability, and low corruption together create a lower-risk environment for entrepreneurs.",
          concept: "economic-environment"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LO 1-4 — Technology's Effects on Business
// Byrnes Ch.1, LO 1-4: Describe the effects of technology on businesses.
// ─────────────────────────────────────────────────────────────
export const gulliverLO1_4: StructuredLessonContent = {
  lessonId: "gulliver-lo-1-4",
  sections: [
    {
      type: "concept",
      title: "How Technology Benefits Workers, Businesses, and Consumers",
      paragraphs: [
        "Technology has changed business by making workers more **effective**, **efficient**, and **productive** — three words that sound similar but mean different things. **Effectiveness** means doing the right thing in the right way; it's about whether the work being done is actually the right work at all. **Efficiency** means producing items using the least amount of resources — doing things without waste. **Productivity** is the amount of output generated given a certain amount of input, like the number of units produced per hour worked.",
        "A worker can be efficient without being effective (perfectly executing the wrong task), and technology's real payoff is when it improves all three at once: helping people do the right work, with less waste, and more output per hour. That's why businesses invest heavily in new technology even when it's expensive upfront — the gains in effectiveness, efficiency, and productivity usually pay for themselves.",
        "These gains don't just benefit business owners. Workers who use better tools can accomplish more without working longer hours. Consumers benefit from lower prices and better products, since a more productive business can produce more at a lower cost per unit."
      ],
      bullets: [
        "Effectiveness = doing the right thing in the right way.",
        "Efficiency = producing items using the least amount of resources.",
        "Productivity = amount of output generated given a certain amount of input (e.g., per hour worked).",
        "Technology's biggest payoff is improving all three at once, benefiting workers, businesses, and consumers together."
      ],
      realWorldExample: "A bakery switches from a hand-mixer to an industrial mixer. The mixer doesn't change WHAT they bake (effectiveness), but it lets them use less flour waste per batch (efficiency) and produce three times as many loaves per hour (productivity) — meaning lower prices for customers and more profit for the bakery."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "glo14-mc-1",
          question: "What does 'efficiency' mean in a business context?",
          options: [
            "Doing the right thing in the right way",
            "Producing items using the least amount of resources",
            "The amount of output per hour worked",
            "How many customers a business has"
          ],
          correctAnswer: 1,
          explanation: "Efficiency is about minimizing waste — producing items using the least amount of resources.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mc-2",
          question: "A factory doubles the number of units it produces per hour after adding new equipment. Which concept does this describe?",
          options: [
            "Effectiveness",
            "Productivity",
            "Corruption",
            "Standard of living only"
          ],
          correctAnswer: 1,
          explanation: "Productivity is output generated per amount of input (like hours worked) — doubling output per hour is a productivity gain.",
          concept: "technology-effects"
        }
      ]
    },
    {
      type: "scenario",
      title: "The Restaurant That Automated Its Kitchen",
      narrative: "A restaurant installs a new ordering system that sends orders straight to the kitchen screen instead of a server writing them by hand. Orders arrive faster and with fewer mistakes, and the kitchen can now handle more tables per hour without adding staff.",
      details: [
        "Fewer mistakes = more effectiveness (the right order actually gets made).",
        "Less wasted food from wrong orders = more efficiency.",
        "More tables served per hour with the same staff = more productivity.",
        "Customers benefit from faster, more accurate service — one piece of technology improved all three at once."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "glo14-aq1",
        question: "Why did the new ordering system improve efficiency specifically, not just productivity?",
        options: [
          "It didn't improve efficiency at all",
          "It reduced wasted food from wrong orders, meaning fewer resources were used per correct meal produced",
          "It only affected how fast orders were placed",
          "Efficiency and productivity mean the exact same thing"
        ],
        correctAnswer: 1,
        explanation: "Cutting down on wasted food from mistaken orders is specifically an efficiency gain — using fewer resources per unit produced.",
        concept: "technology-effects"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 3,
      questions: [
        {
          id: "glo14-mx-1",
          question: "What is 'effectiveness'?",
          options: [
            "Producing with the least waste possible",
            "Doing the right thing in the right way",
            "Output generated per hour worked",
            "The total number of employees a business has"
          ],
          correctAnswer: 1,
          explanation: "Effectiveness is about doing the RIGHT thing, in the right way — not just doing things quickly or cheaply.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-2",
          question: "A worker perfectly completes a task that didn't actually need to be done. What does this describe?",
          options: [
            "High effectiveness, high efficiency",
            "Possibly high efficiency, but LOW effectiveness, since it wasn't the right task",
            "High productivity only",
            "This scenario is impossible"
          ],
          correctAnswer: 1,
          explanation: "You can execute a task efficiently (with little waste) while still being ineffective, because it wasn't the right task to do in the first place.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-3",
          question: "Which best defines productivity?",
          options: [
            "The amount of output generated given a certain amount of input, like hours worked",
            "How much a business spends on advertising",
            "The number of stakeholders a business has",
            "Whether a task was the right one to do"
          ],
          correctAnswer: 0,
          explanation: "Productivity measures output relative to input — such as units produced per hour worked.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-4",
          question: "How do consumers typically benefit when a business becomes more productive?",
          options: [
            "Consumers never benefit from productivity gains",
            "A more productive business can often produce more at a lower cost per unit, which can mean lower prices or better products",
            "Prices always go up when productivity increases",
            "Productivity gains only benefit the business, never customers"
          ],
          correctAnswer: 1,
          explanation: "Lower cost per unit from higher productivity can translate into lower prices and better products for consumers.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-5",
          question: "A company invests in expensive new equipment even though it costs a lot upfront. Why might this make sense?",
          options: [
            "It never makes sense to spend money on equipment",
            "Gains in effectiveness, efficiency, and productivity from the technology usually pay for the upfront cost over time",
            "Businesses only buy equipment for appearance",
            "New equipment always decreases productivity at first and forever"
          ],
          correctAnswer: 1,
          explanation: "Even with a high upfront cost, technology that improves effectiveness, efficiency, and productivity typically pays for itself.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-6",
          question: "Which scenario is the BEST example of a technology improving efficiency specifically?",
          options: [
            "A machine that uses less raw material to make the same product",
            "A worker who works longer hours without any new tools",
            "A business that raises its prices with no other changes",
            "A company that hires more workers to do the exact same amount of work"
          ],
          correctAnswer: 0,
          explanation: "Using less raw material to make the same product is a direct efficiency gain — less waste of resources.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-7",
          question: "Why does technology's 'real payoff' come from improving effectiveness, efficiency, AND productivity together, rather than just one?",
          options: [
            "Because only one of them ever matters in real business",
            "Because doing the right work (effectiveness), with less waste (efficiency), and more output (productivity) compound into the biggest overall gain",
            "Because they are all the exact same concept",
            "Because businesses can only improve one of the three, ever"
          ],
          correctAnswer: 1,
          explanation: "The three concepts reinforce each other — the biggest gains come from improving all three together, not just one in isolation.",
          concept: "technology-effects"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LO 1-5 — Meeting and Beating Competition
// Byrnes Ch.1, LO 1-5: Demonstrate how businesses can meet and beat
// competition.
// ─────────────────────────────────────────────────────────────
export const gulliverLO1_5: StructuredLessonContent = {
  lessonId: "gulliver-lo-1-5",
  sections: [
    {
      type: "concept",
      title: "Meeting and Beating the Competition",
      paragraphs: [
        "Businesses don't operate alone — they're constantly being compared to competitors by the same customers. One of the clearest ways companies win that comparison is by finding a **competitive edge**: focusing on making high-quality products, all the way up to **zero defects** (essentially no flaws at all). Quality alone isn't the only lever, though — companies also aim to **exceed customer expectations**, giving people more than they were expecting rather than just meeting the bare minimum.",
        "A major way businesses achieve both of those goals is by **empowering** their **frontline workers** — the employees who deal directly with customers. Empowering means giving them more training, more responsibility, and more authority to make decisions on the spot, instead of forcing every issue up the chain of command. A frontline worker who can immediately fix a customer's problem creates a much better experience than one who has to say 'let me ask my manager' every time.",
        "Put together, this is the real formula for beating competition: high quality (up to zero defects), consistently exceeding what customers expect, and frontline employees who are trusted and equipped to deliver both."
      ],
      bullets: [
        "A competitive edge often comes from high-quality products, up to the standard of zero defects.",
        "Businesses also aim to exceed customer expectations, not just meet them.",
        "Empowering frontline workers means giving them more training, responsibility, and authority.",
        "Empowered frontline workers can solve problems immediately instead of escalating everything, improving the customer experience."
      ],
      realWorldExample: "Two coffee shops sell the same drink at the same price. At Shop A, a barista who messes up an order has to find the manager to fix it. At Shop B, the barista is empowered to immediately remake the drink or refund it on the spot. Shop B's customers leave happier — the competitive edge came from empowering the frontline worker, not the coffee itself."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "glo15-mc-1",
          question: "What does 'zero defects' represent for a business?",
          options: [
            "A goal of essentially no flaws in the product",
            "A rule that no products can ever be made",
            "The number of competitors a business has",
            "A tax rate businesses must pay"
          ],
          correctAnswer: 0,
          explanation: "Zero defects is the standard of producing with essentially no flaws — the highest level of quality.",
          concept: "competitive-edge"
        },
        {
          id: "glo15-mc-2",
          question: "What does it mean to 'empower' frontline workers?",
          options: [
            "Giving them less responsibility so they make fewer mistakes",
            "Giving them more training, responsibility, and authority to make decisions",
            "Removing them from contact with customers entirely",
            "Paying them the same as every other employee"
          ],
          correctAnswer: 1,
          explanation: "Empowering frontline workers means equipping them with training and giving them real authority to solve problems on the spot.",
          concept: "empowering-workers"
        }
      ]
    },
    {
      type: "scenario",
      title: "Two Return Policies",
      narrative: "A customer's order arrives damaged at two different stores. At Store A, the cashier isn't allowed to do anything without manager approval, and the manager isn't available for an hour. At Store B, the cashier is trained and authorized to issue an immediate replacement or refund on the spot.",
      details: [
        "Store B's cashier is an empowered frontline worker; Store A's is not.",
        "Store B exceeded the customer's expectations by solving the problem instantly.",
        "Store A's slow process, even if it eventually fixes the issue, creates a worse customer experience.",
        "This kind of difference is a real competitive edge, even if both stores sell identical products."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "glo15-aq1",
        question: "Why does Store B have a competitive edge over Store A, even though they sell the exact same products?",
        options: [
          "Store B's products are physically different",
          "Store B empowers frontline workers to solve problems immediately, exceeding customer expectations",
          "Store A has better products",
          "Competitive edge has nothing to do with customer service"
        ],
        correctAnswer: 1,
        explanation: "Empowering the frontline worker let Store B exceed customer expectations, creating a real competitive edge unrelated to the product itself.",
        concept: "empowering-workers"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 3,
      questions: [
        {
          id: "glo15-mx-1",
          question: "What is a 'competitive edge'?",
          options: [
            "A legal requirement all businesses must follow",
            "An advantage that helps a business meet or beat its competition",
            "The total revenue of a business",
            "A type of tax on businesses"
          ],
          correctAnswer: 1,
          explanation: "A competitive edge is an advantage — like quality or service — that helps a business stand out against competitors.",
          concept: "competitive-edge"
        },
        {
          id: "glo15-mx-2",
          question: "What does it mean to exceed customer expectations, rather than just meet them?",
          options: [
            "Giving customers exactly what they asked for and nothing more",
            "Giving customers more than they expected, going beyond the bare minimum",
            "Ignoring what customers want entirely",
            "Charging customers extra for basic service"
          ],
          correctAnswer: 1,
          explanation: "Exceeding expectations means delivering more than the customer anticipated — not just the bare minimum they asked for.",
          concept: "competitive-edge"
        },
        {
          id: "glo15-mx-3",
          question: "Why would a business aim for 'zero defects' instead of just 'mostly good' products?",
          options: [
            "Because zero defects is impossible and not worth pursuing",
            "Because near-flawless quality can be a strong competitive edge over rivals with more errors",
            "Because it has no effect on customer satisfaction",
            "Because defects always cost less than fixing them"
          ],
          correctAnswer: 1,
          explanation: "Aiming for essentially flawless quality helps a business stand out against competitors with more frequent mistakes.",
          concept: "competitive-edge"
        },
        {
          id: "glo15-mx-4",
          question: "What is a 'frontline worker'?",
          options: [
            "An employee who never interacts with the public",
            "An employee who deals directly with customers",
            "Only the CEO of a company",
            "A government inspector"
          ],
          correctAnswer: 1,
          explanation: "Frontline workers are the employees who directly interact with customers, like cashiers, servers, or support reps.",
          concept: "empowering-workers"
        },
        {
          id: "glo15-mx-5",
          question: "Why might a business that empowers its frontline workers create a better customer experience?",
          options: [
            "Because problems can be solved immediately instead of always being escalated to a manager",
            "Because empowered employees are paid less",
            "Because it removes the need for training entirely",
            "Because it has no real effect on customer experience"
          ],
          correctAnswer: 0,
          explanation: "When frontline workers have real authority, they can fix issues on the spot, which usually improves the customer's experience.",
          concept: "empowering-workers"
        },
        {
          id: "glo15-mx-6",
          question: "Two businesses sell identical products at the same price. How could one still gain a real competitive edge?",
          options: [
            "It's impossible for either to gain an edge if products are identical",
            "By having higher-quality service, empowered frontline workers, and exceeding customer expectations",
            "By lowering product quality to save money",
            "By removing all customer service entirely"
          ],
          correctAnswer: 1,
          explanation: "Even with identical products, service quality, empowered employees, and exceeding expectations can still create a real competitive edge.",
          concept: "competitive-edge"
        },
        {
          id: "glo15-mx-7",
          question: "What is the connection between empowering frontline workers and exceeding customer expectations?",
          options: [
            "There is no connection between the two",
            "Empowered workers can act immediately to solve problems, which is often what turns an average experience into one that exceeds expectations",
            "Empowering workers always lowers customer satisfaction",
            "Exceeding expectations requires removing all frontline workers"
          ],
          correctAnswer: 1,
          explanation: "Giving frontline workers the authority to act fast is often exactly what allows a business to exceed, not just meet, customer expectations.",
          concept: "empowering-workers"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LO 1-6 — Social Changes Affecting Business
// Byrnes Ch.1, LO 1-6: Analyze the social changes affecting businesses.
// ─────────────────────────────────────────────────────────────
export const gulliverLO1_6: StructuredLessonContent = {
  lessonId: "gulliver-lo-1-6",
  sections: [
    {
      type: "concept",
      title: "Social Change: Diversity and an Aging Population",
      paragraphs: [
        "**Diversity** in business today means far more than most people first assume. It's not just about recruiting and keeping ethnic or racial minorities and women — it also includes older adults, people with disabilities, people with different sexual orientations, atheists, religious people, extroverts, introverts, married people, and single people. Managing diversity well means dealing sensitively with workers and cultures from all of these backgrounds, both inside the business and around the world.",
        "A related social shift is the aging population and the future of **Social Security** — the government program that provides benefits to older citizens. As the population ages, Social Security is expected to draw huge amounts of money from the working population to support it, which is why it's such a common topic in the media today. This isn't just a government issue — it affects businesses too, since it influences how much workers and employers pay in, and how much older employees plan to keep working versus retire.",
        "Together, these social changes mean businesses have to think about a much wider, more varied group of employees and customers than in the past — and plan for a workforce and customer base that keeps shifting as the population ages."
      ],
      bullets: [
        "Diversity today includes far more than race and gender — age, disability, orientation, religion, personality type, and marital status all count.",
        "Managing diversity means dealing sensitively with a wide range of workers and cultures, including around the world.",
        "Social Security provides benefits to older citizens, funded largely by the working population.",
        "An aging population means Social Security will draw increasingly large amounts of money from workers in the future."
      ],
      realWorldExample: "A company that only thinks of 'diversity' as hiring people of different races is missing most of the picture — a truly diverse workplace also includes people of different ages, abilities, religions, and family situations, all of whom bring different needs and perspectives that a business has to manage sensitively."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "glo16-mc-1",
          question: "According to the modern definition, what does diversity in the workplace include?",
          options: [
            "Only race and ethnicity",
            "A wide range of groups: age, disability, sexual orientation, religion, personality type, and marital status, among others",
            "Only gender",
            "Only job title and seniority"
          ],
          correctAnswer: 1,
          explanation: "Modern diversity efforts cover a much wider range of groups than race and gender alone.",
          concept: "diversity"
        },
        {
          id: "glo16-mc-2",
          question: "What is Social Security?",
          options: [
            "A private company benefit only some businesses offer",
            "A government program that provides benefits to older citizens, funded largely by the working population",
            "A tax that only businesses pay, never individuals",
            "A type of business insurance"
          ],
          correctAnswer: 1,
          explanation: "Social Security is a government program funded by the working population that provides benefits to older citizens.",
          concept: "social-security"
        }
      ]
    },
    {
      type: "scenario",
      title: "Updating the Company Handbook",
      narrative: "A growing company is rewriting its diversity policy. The first draft only mentions hiring more women and racial minorities. An HR manager points out that the policy is missing several groups the company already employs and should be planning for.",
      details: [
        "The HR manager adds language about age, disability, sexual orientation, religion, and personality differences.",
        "She also flags that several employees are approaching retirement age, which connects to how the company plans around Social Security and staffing.",
        "The updated policy reflects a much broader, more modern understanding of diversity.",
        "Managing this wider range of groups sensitively is now part of the company's day-to-day responsibility, not a side issue."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "glo16-aq1",
        question: "Why was the first draft of the diversity policy incomplete?",
        options: [
          "Because diversity policies aren't necessary for businesses",
          "Because it only covered race and gender, leaving out age, disability, orientation, religion, and other groups that diversity today includes",
          "Because it mentioned too many groups",
          "Because diversity has nothing to do with company policy"
        ],
        correctAnswer: 1,
        explanation: "The modern definition of diversity is much broader than race and gender alone, and the first draft missed most of it.",
        concept: "diversity"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 3,
      questions: [
        {
          id: "glo16-mx-1",
          question: "Which of these groups is part of the modern definition of workplace diversity?",
          options: [
            "Only people under 30",
            "People with disabilities",
            "Only people born in the same country",
            "Only employees in management roles"
          ],
          correctAnswer: 1,
          explanation: "People with disabilities are explicitly part of the modern, broader definition of diversity.",
          concept: "diversity"
        },
        {
          id: "glo16-mx-2",
          question: "What does 'managing diversity' actually require from a business?",
          options: [
            "Ignoring differences among employees entirely",
            "Dealing sensitively with a wide range of workers and cultures, both locally and around the world",
            "Only hiring people who are exactly alike",
            "Avoiding any policy about diversity at all"
          ],
          correctAnswer: 1,
          explanation: "Managing diversity means actively and sensitively handling differences among a wide range of workers and cultures.",
          concept: "diversity"
        },
        {
          id: "glo16-mx-3",
          question: "Why is Social Security discussed so much in the media today?",
          options: [
            "Because it has nothing to do with the economy",
            "Because an aging population means it's expected to draw huge amounts of money from the working population",
            "Because it is a brand-new government program",
            "Because businesses are exempt from any impact of it"
          ],
          correctAnswer: 1,
          explanation: "The aging population means Social Security will require increasingly large amounts of money from current workers, making it a major ongoing topic.",
          concept: "social-security"
        },
        {
          id: "glo16-mx-4",
          question: "Which statement BEST reflects how diversity has changed as a concept over time?",
          options: [
            "It has stayed exactly the same — only race and gender have ever mattered",
            "It has expanded to include age, disability, orientation, religion, personality type, and marital status, among other groups",
            "It has narrowed to include fewer groups than before",
            "It no longer applies to modern businesses"
          ],
          correctAnswer: 1,
          explanation: "The concept of diversity has broadened significantly beyond just race and gender.",
          concept: "diversity"
        },
        {
          id: "glo16-mx-5",
          question: "How does an aging population connect to businesses, not just government?",
          options: [
            "It doesn't connect to businesses at all",
            "It affects how much workers and employers pay into programs like Social Security, and how businesses plan around employees nearing retirement",
            "It only affects businesses that operate outside the country",
            "It guarantees businesses will need fewer employees overall"
          ],
          correctAnswer: 1,
          explanation: "An aging population changes worker contributions, retirement planning, and staffing decisions — all things businesses have to account for.",
          concept: "social-security"
        },
        {
          id: "glo16-mx-6",
          question: "A company assumes diversity only means hiring people of different races. What is this company most likely to overlook?",
          options: [
            "Nothing — that is a complete definition of diversity",
            "Age, disability, sexual orientation, religion, personality type, and marital status differences among its workforce",
            "The company's tax rate",
            "Its total revenue for the year"
          ],
          correctAnswer: 1,
          explanation: "Limiting diversity to race alone overlooks the much wider range of groups that modern diversity actually includes.",
          concept: "diversity"
        },
        {
          id: "glo16-mx-7",
          question: "Which of the following is an accurate description of Social Security's funding?",
          options: [
            "It is funded entirely by businesses, with no worker contribution",
            "Benefits for older citizens draw heavily on money from the current working population",
            "It requires no funding at all",
            "It is unrelated to the working population in any way"
          ],
          correctAnswer: 1,
          explanation: "Social Security benefits for older citizens are funded largely by drawing on the current working population.",
          concept: "social-security"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LO 1-7 — Global Challenges, War, and Terrorism
// Byrnes Ch.1, LO 1-7: Identify what businesses must do to meet global
// challenges, including war and terrorism.
// ─────────────────────────────────────────────────────────────
export const gulliverLO1_7: StructuredLessonContent = {
  lessonId: "gulliver-lo-1-7",
  sections: [
    {
      type: "concept",
      title: "Global Competition, War, and Terrorism",
      paragraphs: [
        "U.S. businesses today compete on a global stage, and two countries in particular — **China** and **India** — are considered the biggest sources of competitive challenge. Their large workforces and growing economies mean U.S. businesses increasingly compete with companies based there for customers, workers, and resources, both at home and abroad.",
        "Global instability, including war and **terrorism**, also directly affects businesses — but not evenly. Some industries, like the **defense industry**, may actually prosper during periods of conflict, since demand for their products rises. Other industries, like **tourism**, tend to suffer badly, since people avoid traveling to or through unstable regions.",
        "One way experts believe world tensions can be reduced is by helping **less-developed countries** become more prosperous. The logic connects back to earlier ideas in the chapter: a more prosperous country, with stronger businesses, stable currency, and enforceable contracts, has less incentive toward the kind of instability that leads to conflict in the first place."
      ],
      bullets: [
        "China and India are identified as the two countries creating the greatest competitive challenges for U.S. businesses.",
        "War and terrorism affect industries very differently — the defense industry may prosper, while tourism tends to suffer.",
        "One strategy to reduce world tensions is helping less-developed countries become more prosperous.",
        "Global instability connects back to the economic environment factors (like enforceable contracts and stable currency) discussed earlier in the chapter."
      ],
      realWorldExample: "During a period of global conflict, a defense contractor sees rising orders and profit, while an airline serving that same region sees bookings collapse. Both are U.S. businesses affected by the same event, but in opposite directions — which is exactly why businesses have to track global events closely, not just domestic ones."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "glo17-mc-1",
          question: "Which two countries are identified as creating the greatest competitive challenges for U.S. businesses?",
          options: [
            "Canada and Mexico",
            "China and India",
            "France and Germany",
            "Brazil and Argentina"
          ],
          correctAnswer: 1,
          explanation: "China and India are named as the two biggest sources of competitive challenge due to their large economies and workforces.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mc-2",
          question: "How does war or terrorism typically affect the tourism industry?",
          options: [
            "It usually has no effect on tourism",
            "It tends to hurt tourism, since people avoid traveling to or through unstable regions",
            "It always increases tourism",
            "It only affects the defense industry, never tourism"
          ],
          correctAnswer: 1,
          explanation: "Tourism tends to suffer during periods of war or terrorism, as travelers avoid unstable areas.",
          concept: "global-challenges"
        }
      ]
    },
    {
      type: "scenario",
      title: "One Event, Two Very Different Businesses",
      narrative: "A region experiences a period of political instability and conflict. A defense equipment manufacturer based in the U.S. sees a spike in government orders. Meanwhile, a U.S. travel company that runs tours through that same region sees nearly all its bookings canceled.",
      details: [
        "The defense manufacturer benefits because demand for its products rises during conflict.",
        "The travel company suffers because travelers avoid unstable regions entirely.",
        "Both businesses are affected by the exact same global event, but in completely opposite ways.",
        "This is why businesses in different industries have to track global events for very different reasons."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "glo17-aq1",
        question: "Why do the defense manufacturer and the travel company react so differently to the same conflict?",
        options: [
          "Because global events affect every business identically",
          "Because war and terrorism affect industries unevenly — demand can rise for defense while tourism suffers from travelers avoiding instability",
          "Because the travel company made a bad decision unrelated to the conflict",
          "Because only U.S. businesses are affected by global conflict"
        ],
        correctAnswer: 1,
        explanation: "Global instability affects industries unevenly — some, like defense, can see rising demand, while others, like tourism, tend to suffer.",
        concept: "global-challenges"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 3,
      questions: [
        {
          id: "glo17-mx-1",
          question: "Why are China and India specifically named as major competitive challenges for U.S. businesses?",
          options: [
            "Because they have no economic activity",
            "Because their large workforces and growing economies mean increasing competition for customers, workers, and resources",
            "Because they only compete in the tourism industry",
            "Because they have no impact on global business"
          ],
          correctAnswer: 1,
          explanation: "Their scale and economic growth make China and India major sources of competitive pressure on U.S. businesses.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-2",
          question: "Which industry tends to PROSPER during periods of war, according to the chapter?",
          options: [
            "Tourism",
            "The defense industry",
            "Only the restaurant industry",
            "No industry ever benefits from war"
          ],
          correctAnswer: 1,
          explanation: "The defense industry often sees rising demand for its products during periods of conflict.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-3",
          question: "What is one suggested way to help minimize world tensions?",
          options: [
            "Isolating less-developed countries completely",
            "Helping less-developed countries become more prosperous",
            "Reducing all international trade to zero",
            "Eliminating the defense industry entirely"
          ],
          correctAnswer: 1,
          explanation: "Helping less-developed countries become more prosperous is identified as one way to help reduce world tensions.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-4",
          question: "How does this LO connect back to the economic environment factors from LO 1-3 (enforceable contracts, stable currency, low corruption)?",
          options: [
            "It has no connection at all",
            "More prosperous, stable countries with strong economic environments have less incentive toward the instability that can lead to conflict",
            "Enforceable contracts cause more wars",
            "Currency stability has nothing to do with global tension"
          ],
          correctAnswer: 1,
          explanation: "A stronger economic environment in less-developed countries is tied to greater prosperity and, potentially, less instability and conflict.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-5",
          question: "A U.S. airline's bookings to a region drop sharply after reports of instability there. What does this best illustrate?",
          options: [
            "That war and terrorism have no real effect on business",
            "That tourism-related industries tend to suffer when regions become unstable",
            "That the defense industry is also suffering",
            "That airlines are unaffected by global events"
          ],
          correctAnswer: 1,
          explanation: "This is a direct example of tourism-related businesses suffering due to travelers avoiding unstable regions.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-6",
          question: "Why do businesses need to track global events, not just domestic ones?",
          options: [
            "Because global events never affect U.S. businesses",
            "Because global instability, competition from countries like China and India, and conflict can all directly impact different industries in different ways",
            "Because only government agencies need to track global events",
            "Because domestic events are always more important than global ones"
          ],
          correctAnswer: 1,
          explanation: "Global competition and instability have real, if uneven, effects on U.S. businesses across different industries.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-7",
          question: "What is the key takeaway about how war and terrorism affect businesses overall?",
          options: [
            "Every business is affected identically",
            "The effects vary by industry — some, like defense, may prosper, while others, like tourism, tend to suffer",
            "No business is ever affected by war or terrorism",
            "Only foreign businesses are affected, never U.S. ones"
          ],
          correctAnswer: 1,
          explanation: "War and terrorism affect industries unevenly, helping some (like defense) while hurting others (like tourism).",
          concept: "global-challenges"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LO 1-8 — Past Trends, Present Patterns, and Tomorrow's Graduates
// Byrnes Ch.1, LO 1-8: Review how past trends are being repeated in the
// present and what those trends mean for tomorrow's college graduates.
// NOTE: source photo was cut off mid-answer. The agricultural-to-factory
// and manufacturing-productivity points are directly from the photo; the
// service-industries/information-age content is inferred from the chapter's
// table of contents ("Progress in Service Industries," "Progress in the
// Information Age," "Your Future in Business" section headers) and should
// be checked against the actual page text before this lesson is finalized.
// ─────────────────────────────────────────────────────────────
export const gulliverLO1_8: StructuredLessonContent = {
  lessonId: "gulliver-lo-1-8",
  sections: [
    {
      type: "concept",
      title: "The History of U.S. Business — and What It Means for You",
      paragraphs: [
        "The history of U.S. economic development follows a repeating pattern: workers get displaced from one part of the economy by improved technology, and they move into a different part of the economy that's growing. Early on, agricultural workers displaced by improved farm technology moved to work in factories, as machines made it possible to grow more food with far fewer workers.",
        "That same pattern repeated in manufacturing: improved manufacturing productivity, combined with increased competition from foreign firms, meant factories needed fewer workers to produce the same output. Those displaced factory workers largely moved into service industries — jobs based on providing services rather than making physical goods.",
        "Today, that same cycle is playing out again in the shift toward the information age, where technology and data-driven work are reshaping which jobs exist and which skills are valuable. For today's students heading toward college and a career, the lesson from this repeating pattern is that the specific jobs available will keep changing — which is why adaptability and continuous learning matter more than locking into one static skill set."
      ],
      bullets: [
        "Pattern: improved technology displaces workers from one sector, and they move into a growing sector.",
        "Agricultural workers displaced by farm technology moved into factory jobs.",
        "Improved manufacturing productivity + foreign competition displaced factory workers into service industries.",
        "Today's shift toward the information age is a continuation of this same historical pattern.",
        "For future graduates, the takeaway is that adaptability and continuous learning matter more than any single fixed skill set."
      ],
      realWorldExample: "A farmworker in the early 1900s might have been displaced by a tractor and found a new job in a factory. A factory worker decades later might have been displaced by automation and foreign competition and found a new job in a service industry. A worker today might see their job reshaped by information-age technology and need new skills to move into what comes next — same pattern, different era."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "glo18-mc-1",
          question: "What happened to many agricultural workers as farm technology improved?",
          options: [
            "They lost their jobs permanently with nowhere to go",
            "They were displaced by improved technology and moved into factory jobs",
            "Farm technology had no effect on agricultural employment",
            "They all became factory owners"
          ],
          correctAnswer: 1,
          explanation: "Improved farm technology displaced many agricultural workers, who then moved into factory jobs as manufacturing grew.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mc-2",
          question: "What two factors combined to reduce the number of workers needed in manufacturing?",
          options: [
            "Lower taxes and less regulation",
            "Improved manufacturing productivity and increased competition from foreign firms",
            "A growing agricultural sector",
            "Rising Social Security costs"
          ],
          correctAnswer: 1,
          explanation: "Improved productivity and foreign competition together reduced the number of workers manufacturing needed, pushing many into service industries.",
          concept: "historical-trends"
        }
      ]
    },
    {
      type: "scenario",
      title: "Three Generations, Three Displacements",
      narrative: "A student learns her great-grandfather worked on a farm until tractors made his job unnecessary, so he moved to a factory. Her grandfather worked in that same factory until automation and overseas competition cut jobs there, so he moved into a service job at a bank. Her father worked at that bank until much of the routine work shifted to software, so he retrained for a data-focused role.",
      details: [
        "Each generation was displaced by improved technology or increased competition, matching the pattern from the chapter.",
        "Each time, workers who adapted moved into whatever sector was growing next.",
        "The specific jobs kept changing across generations, but the underlying pattern stayed the same.",
        "The student realizes this pattern is likely to continue into her own career, whatever field she chooses."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "glo18-aq1",
        question: "What is the main lesson this family's history illustrates for someone heading into college and a career today?",
        options: [
          "That jobs never change generation to generation",
          "That the specific jobs available keep changing, so adaptability and continuous learning matter more than locking into one fixed skill set",
          "That only farming jobs are ever displaced by technology",
          "That college has no connection to this historical pattern"
        ],
        correctAnswer: 1,
        explanation: "The repeating pattern of displacement and adaptation shows why staying adaptable and continuing to learn new skills matters for future graduates.",
        concept: "historical-trends"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 3,
      questions: [
        {
          id: "glo18-mx-1",
          question: "What is the general repeating pattern described in U.S. economic history?",
          options: [
            "Jobs never change from generation to generation",
            "Improved technology displaces workers from one sector, who then move into a different, growing sector",
            "Every worker stays in the exact same job for their entire life",
            "Technology has no effect on which jobs exist"
          ],
          correctAnswer: 1,
          explanation: "The core pattern is technology-driven displacement followed by workers moving into a new, growing sector.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-2",
          question: "Why did many agricultural workers move into factory jobs historically?",
          options: [
            "Because factories paid less than farming",
            "Because improved farm technology reduced the need for agricultural labor, displacing workers into the growing manufacturing sector",
            "Because agricultural jobs no longer existed anywhere",
            "Because factories required no skills at all"
          ],
          correctAnswer: 1,
          explanation: "Improved farm technology reduced the need for farm labor, and displaced workers moved into the growing factory sector.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-3",
          question: "What combination of factors pushed many factory workers into service industries?",
          options: [
            "Lower taxes alone",
            "Improved manufacturing productivity combined with increased competition from foreign firms",
            "A shortage of raw materials",
            "An increase in agricultural jobs"
          ],
          correctAnswer: 1,
          explanation: "Rising manufacturing productivity and foreign competition together reduced the number of factory jobs needed, pushing workers into services.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-4",
          question: "How does the shift toward the information age relate to earlier economic shifts?",
          options: [
            "It is completely unrelated to any past economic pattern",
            "It's a continuation of the same historical pattern of technology-driven displacement and workers moving into a new, growing area",
            "It is the first time in history that technology has changed available jobs",
            "It guarantees no future job changes will ever happen again"
          ],
          correctAnswer: 1,
          explanation: "The shift to the information age follows the same historical pattern seen with agriculture-to-factory and factory-to-service shifts.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-5",
          question: "What is the main takeaway from this repeating pattern for a student planning a future career?",
          options: [
            "That they should pick one skill and never learn anything new again",
            "That adaptability and continuous learning matter, since the specific jobs available will likely keep changing",
            "That this pattern only applied in the past and will never happen again",
            "That career planning is pointless given this pattern"
          ],
          correctAnswer: 1,
          explanation: "Since this displacement-and-adaptation pattern keeps repeating, staying adaptable and continuing to learn is the practical takeaway for future graduates.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-6",
          question: "A worker in a shrinking industry retrains for a role in a growing, technology-driven field. What historical pattern does this best match?",
          options: [
            "It matches no historical pattern at all",
            "It matches the same pattern of technology-driven displacement followed by a move into a growing sector, seen with agriculture and manufacturing",
            "It only applies to agricultural workers, not other industries",
            "It shows the pattern has ended permanently"
          ],
          correctAnswer: 1,
          explanation: "This worker's experience mirrors the same historical pattern of displacement and adaptation into a growing sector.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-7",
          question: "Which best summarizes what U.S. economic history shows about jobs over time?",
          options: [
            "Jobs have remained completely static since the founding of the country",
            "Specific jobs change as technology and competition evolve, but the pattern of displacement and adaptation into new sectors keeps repeating",
            "Only farming and manufacturing have ever been affected by economic change",
            "Technology has never displaced any workers in U.S. history"
          ],
          correctAnswer: 1,
          explanation: "The specific jobs change, but the underlying cycle of displacement and adaptation into new, growing sectors is a consistent historical pattern.",
          concept: "historical-trends"
        }
      ]
    }
  ]
}
