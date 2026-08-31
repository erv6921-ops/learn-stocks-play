import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// GULLIVER INTRO TO BUSINESS, CHAPTER 1, LEARNING-OBJECTIVE-ALIGNED LESSONS
// One StructuredLessonContent per Byrnes Ch.1 learning objective, following the
// concept → micro-check[2] → scenario → applied-question → mastery-check[7]
// pattern used in block1. Audience: 9th grade. Key terms wrapped in **…**.
// ═══════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// LO 1-1: Profit, Risk, and Stakeholders
// Byrnes Ch.1, LO 1-1: Describe the relationship between profit and risk,
// and show how businesses and nonprofits can raise the standard of living.
// ─────────────────────────────────────────────────────────────
export const gulliverLO1_1: StructuredLessonContent = {
  lessonId: "gulliver-lo-1-1",
  sections: [
    {
      type: "concept",
      title: "Profit, Risk, and Who a Business Answers To",
      paragraphs: [
        "**Profit** is the money a business earns above and beyond what it spends on salaries and other expenses. **Risk** is the chance of losing time and money on a business that doesn't turn out to be profitable. A **loss** happens when a business's costs and expenses end up higher than its revenues. Profit and risk move together: the bigger the risk an entrepreneur takes on, the bigger the potential profit usually needs to be to make that risk worth taking. Nobody risks their savings on a business that can only ever break even.",
        "Businesses raise the **standard of living** for everyone, not just their owners, by creating jobs, paying taxes that fund public services, and producing the goods and services people need. That only works if the business is actually profitable enough to keep operating and growing. **Nonprofit organizations** work toward a different central goal, a mission rather than owner profit, but they still rely on the same business principles: watching costs, using resources efficiently, and bringing in enough revenue to keep the mission going. A nonprofit that ignores those principles can't help anyone for long.",
        "A **stakeholder** is any person or group affected by, or with an interest in, how a business behaves. That's a longer list than most people expect: customers, employees, stockholders, suppliers, dealers, bankers, people in the local community, environmentalists, the media, and elected government officials. Each group wants something a little different from the business: employees want fair pay, customers want quality and fair prices, the community wants jobs and responsible behavior, and stockholders want returns.",
        "A business's real job is to recognize and respond to the needs of all of these stakeholders while still making a profit, not to chase profit alone. A business that squeezes stakeholders to boost short-term profit (underpaying workers, cutting corners with the community, misleading customers) usually creates bigger risks for itself down the road: lawsuits, boycotts, bad press, or losing the trust it needs to keep operating."
      ],
      bullets: [
        "Profit = money earned above and beyond costs and expenses; risk = the chance of a loss when costs exceed revenue.",
        "Profit and risk rise together: bigger risk generally requires the possibility of bigger profit to be worth taking.",
        "Businesses (and nonprofits) raise the standard of living for all through jobs, taxes, and the goods/services they provide.",
        "Stakeholders = customers, employees, stockholders, suppliers, dealers, bankers, the community, environmentalists, media, and government.",
        "A business balances stakeholder needs WHILE making a profit; ignoring stakeholders to chase short-term profit usually backfires."
      ],
      realWorldExample: "A clothing brand could cut costs by using cheaper, riskier overseas factories with poor labor conditions, boosting profit in the short term. But if that gets exposed, customers boycott, the media covers it, and stockholders lose confidence. The 'profit' from ignoring stakeholders turned into a much bigger risk than the one they were trying to avoid."
    },
    {
      // Recall check: the four core terms, matched to parallel definitions so it
      // can't be won on length or keyword cues.
      type: "activity-check",
      activity: {
        kind: "vocab-match",
        pairs: [
          { term: "Profit", definition: "Money a business earns above and beyond its costs and expenses" },
          { term: "Risk", definition: "The chance of losing time and money if a business isn't profitable" },
          { term: "Loss", definition: "What happens when costs and expenses end up higher than revenue" },
          { term: "Stakeholder", definition: "Any person or group affected by, or interested in, how a business behaves" },
        ],
        explanation: "Profit is what's left after costs; a loss is the opposite; risk is the chance of that loss; stakeholders are everyone affected by the business.",
      },
    },
    {
      // Application check: the risk↔profit relationship. Every option is a real
      // business term, so the distractors are genuinely tempting.
      type: "activity-check",
      activity: {
        kind: "fill-blank",
        sentence: "Nobody risks their savings on a business that can only break even — the bigger the risk, the bigger the potential [BLANK] usually needs to be to make it worth taking.",
        answer: "profit",
        options: ["profit", "loss", "revenue", "risk"],
        explanation: "Risk and profit move together: a bigger risk only makes sense if the potential profit is big enough to justify it. Revenue is money in before costs — it's the profit that has to justify the risk.",
      },
    },
    {
      // Misconception check: the subtle lie is the common 'profit is the only
      // job' belief, set against two accurate statements.
      type: "activity-check",
      activity: {
        kind: "two-truths-a-lie",
        prompt: "Two of these are true. Tap the one that's false.",
        statements: [
          "Businesses raise the standard of living by creating jobs, paying taxes, and producing goods and services.",
          "A stakeholder is any person or group affected by, or interested in, how a business behaves.",
          "A business's only real job is to make as much profit as possible, even if it means squeezing its stakeholders.",
        ],
        lieIndex: 2,
        explanation: "A business's real job is to balance stakeholder needs WHILE making a profit. Squeezing stakeholders for short-term profit usually backfires — boycotts, lawsuits, bad press, and lost trust.",
      },
    },
    {
      type: "scenario",
      title: "The Food Truck's Big Decision",
      narrative: "Maria's food truck is doing well, and a bank has offered her a loan to buy a second truck. Taking the loan means real risk: if the second truck doesn't earn enough, she'll still owe the bank every month. But if it works, her profit could roughly double.",
      details: [
        "The bank (a stakeholder) cares about her risk because they need to know she can repay the loan.",
        "Her employees (stakeholders) care because a failed expansion could mean fewer hours or even layoffs.",
        "Her regular customers (stakeholders) benefit if a second truck means shorter lines and more locations.",
        "The bigger the risk Maria takes on with the loan, the bigger the profit she needs the second truck to generate for it to be worth it."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "glo11-aq1",
        difficulty: 0.5,
        question: "Why does the bank care about how much risk Maria is taking on with the second truck?",
        options: [
          "Because, as a stakeholder, it needs her business profitable enough to repay the loan",
          "Because banks earn the most when a borrower falls behind and racks up late fees",
          "Because a bank stops being a stakeholder the moment the loan paperwork is signed",
          "Because the bank is mainly worried about competing with Maria's food truck for customers"
        ],
        correctAnswer: 0,
        explanation: "The bank is a stakeholder with a direct financial interest: it needs Maria's business to generate enough profit to repay what she borrowed.",
        concept: "stakeholders"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 3,
      questions: [
        {
          id: "glo11-mx-1",
          difficulty: -1.5,
          question: "What is profit?",
          options: [
            "The total amount of money a business takes in from sales",
            "The money a business earns above and beyond its salaries and other expenses",
            "The amount of money a business borrows from a bank",
            "The number of stakeholders a business has"
          ],
          correctAnswer: 1,
          explanation: "Profit is what's left after all costs and expenses are subtracted, not the total money that comes in.",
          concept: "profit-and-risk"
        },
        {
          id: "glo11-mx-2",
          difficulty: -1.0,
          question: "What causes a business to have a loss?",
          options: [
            "Its costs and expenses are higher than its revenues",
            "It has too many stakeholders",
            "It raises the standard of living",
            "It refuses to take on any risk"
          ],
          correctAnswer: 0,
          explanation: "A loss happens when costs and expenses exceed revenue: the business spent more than it took in.",
          concept: "profit-and-risk"
        },
        {
          id: "glo11-mx-3",
          difficulty: -0.5,
          question: "How do businesses generally raise the standard of living for people beyond just their owners?",
          options: [
            "By creating jobs, paying taxes, and producing the goods and services people need",
            "By keeping wages as low as possible so products can be sold more cheaply",
            "By donating most of their yearly profits directly back to the government",
            "By hiring as few workers as they possibly can to hold down costs"
          ],
          correctAnswer: 0,
          explanation: "Jobs, tax revenue, and the goods/services produced are how businesses raise living standards for the wider community, not just owners.",
          concept: "standard-of-living"
        },
        {
          id: "glo11-mx-4",
          difficulty: 0.5,
          question: "How are nonprofit organizations similar to for-profit businesses?",
          options: [
            "Both have to manage their costs and use their resources efficiently to keep running",
            "Both exist mainly to earn a large profit for the people who own them",
            "Both raise almost all of their money by selling shares of stock to investors",
            "Both measure their success only by the amount of profit they make each year"
          ],
          correctAnswer: 0,
          explanation: "A nonprofit runs on a mission rather than owner profit and is funded largely by donations and grants, but like any business it still has to manage costs and use resources efficiently to keep operating.",
          concept: "standard-of-living"
        },
        {
          id: "glo11-mx-5",
          difficulty: 0.0,
          question: "Which group would NOT typically be considered a stakeholder in a business?",
          options: [
            "Employees who work for the business",
            "Suppliers who sell it materials",
            "The local community around the business",
            "A person who has never heard of it and never will"
          ],
          correctAnswer: 3,
          explanation: "A stakeholder has some connection to or interest in the business. Someone with zero connection to it isn't a stakeholder.",
          concept: "stakeholders"
        },
        {
          id: "glo11-mx-6",
          difficulty: 1.0,
          question: "A business cuts corners with suppliers and underpays workers to boost this quarter's profit. What's the likely long-term risk?",
          options: [
            "The savings look good now, but lawsuits, bad press, and lost trust often follow",
            "The workers and suppliers will simply accept the changes to keep their jobs",
            "Competitors will be forced to cut their own corners in the exact same way",
            "The higher profit this quarter locks in a permanent advantage over rivals"
          ],
          correctAnswer: 0,
          explanation: "Squeezing stakeholders for short-term gain tends to create larger risks down the road, whether reputational, legal, or financial.",
          concept: "stakeholders"
        },
        {
          id: "glo11-mx-7",
          difficulty: 1.0,
          question: "What is the core balancing act every business has to manage?",
          options: [
            "Meeting the needs of its stakeholders while still earning a healthy profit",
            "Growing profit as fast as possible and letting stakeholders sort themselves out",
            "Keeping every single stakeholder perfectly happy, even at a steady loss",
            "Focusing only on the stakeholders who spend the most money with it"
          ],
          correctAnswer: 0,
          explanation: "The core balancing act is meeting stakeholder needs AND making a profit, not one at the total expense of the other.",
          concept: "stakeholders"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LO 1-2: Entrepreneurship & the Five Factors of Production
// Byrnes Ch.1, LO 1-2: Explain how entrepreneurship and the other factors
// of production contribute to the creation of wealth.
// ─────────────────────────────────────────────────────────────
export const gulliverLO1_2: StructuredLessonContent = {
  lessonId: "gulliver-lo-1-2",
  sections: [
    {
      type: "concept",
      title: "Entrepreneurship, Knowledge, and the Five Factors of Production",
      paragraphs: [
        "Working for someone else has real advantages: a steady paycheck and benefits like paid vacation and health insurance that come from someone else taking on the business risk. **Entrepreneurs** trade those guaranteed benefits away, taking on more risk and losing those safety nets, in exchange for the freedom to make their own decisions, more opportunity, and the chance at real wealth if the business succeeds.",
        "Every business, no matter how big or small, is built from the same five ingredients, called the **factors of production**: **land** (natural resources like soil, water, oil, timber), **labor** (the workers who do the work), **capital** (money, tools, equipment, and buildings, which are the resources needed to operate and grow), **entrepreneurship** (people willing to risk their time and money to start and manage a business), and **knowledge** (the information and skill needed to combine the other four factors effectively).",
        "Of those five, **entrepreneurship** and **knowledge** are widely considered the most important today. A country can have abundant land, labor, and capital and still stay poor if nobody knows how to combine them productively, and nobody is willing to take the risk of trying. What actually makes rich countries rich today is a combination of entrepreneurship and the effective use of knowledge, not just having more raw resources sitting around.",
        "That's really the definition of how wealth gets created: it doesn't come from resources just existing. Land, labor, and capital sitting idle create nothing. Wealth is created the moment an entrepreneur uses knowledge to combine land, labor, and capital into something people actually want, which is exactly why entrepreneurship is often called the 'spark' factor of production."
      ],
      bullets: [
        "Working for others = steady paycheck + benefits (paid vacation, health insurance); entrepreneurs give those up for freedom and upside.",
        "The five factors of production: land, labor, capital, entrepreneurship, and knowledge.",
        "Entrepreneurship and knowledge are considered the most important factors driving wealth today.",
        "Rich countries today are rich mainly from combining entrepreneurship with the effective use of knowledge, not just abundant resources.",
        "Wealth is created when an entrepreneur uses knowledge to combine land, labor, and capital, because resources sitting idle create nothing."
      ],
      realWorldExample: "Two countries could each have plenty of land, labor, and capital available. If one has entrepreneurs who know how to combine those resources into businesses people want, and the other doesn't, the first country ends up dramatically wealthier, even starting with the exact same raw materials."
    },
    {
      // Recall check: the five factors of production, each matched to its meaning.
      type: "activity-check",
      activity: {
        kind: "vocab-match",
        pairs: [
          { term: "Land", definition: "Natural resources like soil, water, oil, and timber" },
          { term: "Labor", definition: "The workers who actually do the work" },
          { term: "Capital", definition: "Money, tools, equipment, and buildings used to operate and grow" },
          { term: "Entrepreneurship", definition: "People who risk their time and money to start and run a business" },
          { term: "Knowledge", definition: "The information and skill to combine the other four factors" },
        ],
        explanation: "The five factors of production are land, labor, capital, entrepreneurship, and knowledge — and entrepreneurship and knowledge are the ones that spark the rest into creating wealth.",
      },
    },
    {
      // Application check: what actually creates wealth. Every option is one of
      // the five factors, so the distractors are genuinely tempting.
      type: "activity-check",
      activity: {
        kind: "fill-blank",
        sentence: "Wealth is created the moment an entrepreneur uses [BLANK] to combine land, labor, and capital into something people actually want.",
        answer: "knowledge",
        options: ["knowledge", "capital", "labor", "land"],
        explanation: "Land, labor, and capital sitting idle create nothing. It's knowledge — knowing how to combine them productively — that turns raw resources into wealth.",
      },
    },
    {
      // Misconception check: the subtle lie is the 'resources alone make wealth'
      // belief the lesson explicitly corrects.
      type: "activity-check",
      activity: {
        kind: "two-truths-a-lie",
        prompt: "Two of these are true. Tap the one that's false.",
        statements: [
          "Entrepreneurship and knowledge are considered the most important factors of production today.",
          "A country can have plenty of land, labor, and capital and still stay poor if no one combines them productively.",
          "Wealth is created simply by having lots of natural resources sitting available.",
        ],
        lieIndex: 2,
        explanation: "Resources sitting idle create nothing. Wealth comes from an entrepreneur using knowledge to combine land, labor, and capital into something people want.",
      },
    },
    {
      type: "scenario",
      title: "Two Summers, Two Paths",
      narrative: "Jordan takes a summer job at a local store, with steady hours and a guaranteed paycheck every two weeks. Ava starts a small lawn-care business instead, buying her own equipment and finding her own clients. Both are working hard, but the trade-offs they've each accepted are very different.",
      details: [
        "Jordan has predictable income and no financial risk, but a fixed ceiling on how much she can earn this summer.",
        "Ava risked her own money on equipment (capital) and has no guaranteed income, but keeps 100% of what her business earns and can grow it however she wants.",
        "Ava is combining capital (mower, tools), labor (her own work), and knowledge (how to run a lawn business), acting as the entrepreneur who sparks it all together.",
        "If Ava's business takes off, her upside is much bigger than what Jordan's paycheck could ever be, but so is her risk if it doesn't."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "glo12-aq1",
        difficulty: 0.5,
        question: "In Ava's lawn-care business, what role is SHE playing among the five factors of production?",
        options: [
          "Entrepreneurship, because she risks her own time and money to run it",
          "Land, because she works outdoors using natural resources like grass and soil",
          "Labor only, since the one thing she really contributes is her own work",
          "Capital, because the mower and tools she bought are what make it run"
        ],
        correctAnswer: 0,
        explanation: "Ava is the entrepreneur, the person willing to risk time and money to start and manage the business, combining the other factors together.",
        concept: "entrepreneurship-tradeoffs"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 3,
      questions: [
        {
          id: "glo12-mx-1",
          difficulty: -1.5,
          question: "Which factor of production refers to natural resources like water, soil, and oil?",
          options: ["Labor", "Land", "Capital", "Knowledge"],
          correctAnswer: 1,
          explanation: "Land refers to natural resources used to produce goods and services.",
          concept: "factors-of-production"
        },
        {
          id: "glo12-mx-2",
          difficulty: -1.0,
          question: "Which factor of production is 'the money, tools, equipment, and buildings needed to operate and grow a business'?",
          options: ["Capital", "Land", "Entrepreneurship", "Labor"],
          correctAnswer: 0,
          explanation: "Capital is the money and physical resources (tools, equipment, buildings) a business needs to operate.",
          concept: "factors-of-production"
        },
        {
          id: "glo12-mx-3",
          difficulty: 0.5,
          question: "Why are entrepreneurship and knowledge considered the most important factors of production today?",
          options: [
            "Because land, labor, and capital are worthless unless someone can combine them well",
            "Because most countries today already have plenty of land, labor, and capital",
            "Because they are usually the cheapest and easiest factors to buy or import",
            "Because a strong entrepreneur can make a business succeed with almost no risk"
          ],
          correctAnswer: 0,
          explanation: "Resources alone don't create wealth; it takes entrepreneurship and knowledge to combine them productively.",
          concept: "factors-of-production"
        },
        {
          id: "glo12-mx-4",
          difficulty: -1.0,
          question: "What is the main advantage of working for someone else instead of starting your own business?",
          options: [
            "Unlimited potential earnings",
            "Complete control over every decision",
            "A steady paycheck and benefits like paid vacation and health insurance",
            "No boss to answer to"
          ],
          correctAnswer: 2,
          explanation: "Employees trade away entrepreneurial upside for the security of a steady paycheck and benefits.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "glo12-mx-5",
          difficulty: -0.5,
          question: "What is the main advantage an entrepreneur gains by giving up those guaranteed benefits?",
          options: [
            "Freedom to make their own calls, more opportunity, and a shot at real wealth",
            "A guaranteed income that ends up larger than any regular paycheck would be",
            "Full protection from ever losing the money they put into the business",
            "Instant access to as much funding as the business could ever need"
          ],
          correctAnswer: 0,
          explanation: "Entrepreneurs gain freedom, opportunity, and upside potential in exchange for taking on more risk.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "glo12-mx-6",
          difficulty: 1.5,
          question: "Two countries have identical amounts of land, labor, and capital. What would most likely make one of them wealthier than the other?",
          options: [
            "Stronger entrepreneurship and a better use of knowledge in one country",
            "One simply having a much larger population to put to work",
            "One happening to have a warmer, more pleasant climate than the other",
            "One getting luckier with global commodity prices in a given year"
          ],
          correctAnswer: 0,
          explanation: "Wealth comes from how effectively entrepreneurship and knowledge combine the other resources, not just from having them.",
          concept: "factors-of-production"
        },
        {
          id: "glo12-mx-7",
          difficulty: 1.0,
          question: "Why is entrepreneurship sometimes called the 'spark' factor of production?",
          options: [
            "Because it puts idle land, labor, and capital to work creating something",
            "Because entrepreneurs usually provide the starting money a business needs",
            "Because it is the one factor a business can most easily do without",
            "Because starting a business carries far less risk than most people assume"
          ],
          correctAnswer: 0,
          explanation: "Resources sitting idle create no wealth; entrepreneurship is what combines and activates them.",
          concept: "factors-of-production"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LO 1-3: The Economic Environment and Taxes
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
        "A business doesn't operate in a vacuum. It operates inside an **economic environment** set largely by government. In less developed countries, entrepreneurs face extra risk because that environment is often missing basic protections. Governments can reduce that risk and help entrepreneurs by allowing **private ownership** of businesses, passing laws that let businesspeople write **enforceable contracts** (so deals actually get honored in court), establishing a **currency** that's tradable in world markets, and helping lessen **corruption** in business and government.",
        "**Taxes** and **regulations** matter just as much. From a business perspective, lower taxes and lighter regulation mean lower risk, more room to grow, and more money staying with both workers and the business itself. Higher taxes and heavier regulation raise the cost and risk of doing business, which is exactly why the economic environment is one of the biggest factors entrepreneurs weigh before starting or expanding a business.",
        "This connects straight back to risk and reward: a country with unclear property rights, an unstable currency, high corruption, and unpredictable taxes is a much riskier place to build a business than one with strong legal protections and stable, moderate taxes, even if the market opportunity looks identical."
      ],
      bullets: [
        "Private ownership + enforceable contracts + a stable, tradable currency = lower risk for entrepreneurs.",
        "Reducing corruption in business and government also lowers the risk of starting a business.",
        "Lower taxes and lighter regulation generally mean lower risk, more growth, and more money for workers and government.",
        "The economic environment (laws, currency stability, taxes, corruption level) can matter as much as the business idea itself."
      ],
      realWorldExample: "Two entrepreneurs have the exact same business idea. One is in a country with enforceable contracts, a stable currency, and low corruption, and one is without any of that. The first entrepreneur can safely sign supplier deals and count on being paid; the second can't fully trust their own contracts will be honored. Same idea, very different risk."
    },
    {
      // Structure check: which parts of the economic environment raise vs lower
      // an entrepreneur's risk. Each item is a real, arguable factor.
      type: "activity-check",
      activity: {
        kind: "categorize",
        bins: ["Lowers risk", "Raises risk"],
        items: [
          { text: "Enforceable contracts", bin: 0 },
          { text: "High corruption", bin: 1 },
          { text: "A stable, tradable currency", bin: 0 },
          { text: "Private ownership of businesses", bin: 0 },
          { text: "Heavy taxes and regulation", bin: 1 },
          { text: "An unstable currency", bin: 1 },
        ],
        explanation: "A strong environment — private ownership, enforceable contracts, a stable currency, low corruption, moderate taxes — lowers risk. Corruption, instability, and heavy taxes raise it.",
      },
    },
    {
      // Recall-in-context: 'enforceable' is the key word. All options are real
      // economic-environment terms from the lesson.
      type: "activity-check",
      activity: {
        kind: "fill-blank",
        sentence: "Laws that let businesspeople write [BLANK] contracts mean deals actually get honored in court, which lowers an entrepreneur's risk.",
        answer: "enforceable",
        options: ["enforceable", "private", "tradable", "unstable"],
        explanation: "Enforceable contracts can be upheld in court, so a signed deal is a real guarantee. 'Private' describes ownership and 'tradable' describes currency — both matter, but it's enforceability that makes a contract trustworthy.",
      },
    },
    {
      // Misconception check: the lie is 'the environment barely matters if the
      // idea is good' — the exact point the lesson pushes back on.
      type: "activity-check",
      activity: {
        kind: "two-truths-a-lie",
        prompt: "Two of these are true. Tap the one that's false.",
        statements: [
          "Lower taxes and lighter regulation generally mean lower risk and more room for a business to grow.",
          "Reducing corruption in government lowers the risk of starting a business.",
          "A business's economic environment barely matters as long as the business idea is a good one.",
        ],
        lieIndex: 2,
        explanation: "The economic environment — laws, currency stability, taxes, corruption — can matter as much as the business idea itself. Same idea in a weaker environment is a much riskier bet.",
      },
    },
    {
      type: "scenario",
      title: "Opening a Shop in Two Different Countries",
      narrative: "An entrepreneur is deciding between opening the exact same shop in Country A, which has enforceable contracts, a stable currency, and low corruption, versus Country B, which has none of those things but a slightly bigger potential customer base.",
      details: [
        "In Country A, a signed supplier contract is a real guarantee, since courts will enforce it if broken.",
        "In Country B, that same contract might not hold up, and bribes might be needed just to operate.",
        "Country A's stable currency means profits keep their value; Country B's unstable currency could wipe out profits overnight.",
        "Even with a smaller customer base, Country A is the lower-risk choice because of its economic environment."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "glo13-aq1",
        difficulty: 0.5,
        question: "Why might the entrepreneur choose Country A even though Country B has more potential customers?",
        options: [
          "Because Country A's stronger economic environment makes the shop far less risky",
          "Because a large customer base rarely matters as much as people assume",
          "Because Country B's higher taxes would eat up all of the shop's profit",
          "Because a bigger market always comes with much higher rent and wages"
        ],
        correctAnswer: 0,
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
          difficulty: -1.0,
          question: "What does 'enforceable contracts' mean for a business owner?",
          options: [
            "Contracts are optional suggestions with no legal weight",
            "Courts will make sure agreements are actually honored",
            "Only the government is allowed to sign any contracts",
            "Contracts can be broken freely with no consequences"
          ],
          correctAnswer: 1,
          explanation: "Enforceable contracts mean the courts back up business agreements, which protects entrepreneurs from being cheated.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-2",
          difficulty: -1.0,
          question: "Why does a stable, tradable currency matter to a business?",
          options: [
            "It has no real effect on a business at all",
            "It protects profits and enables trade in world markets",
            "It only matters for governments, never for businesses",
            "It guarantees a business will always be profitable"
          ],
          correctAnswer: 1,
          explanation: "A stable currency protects the real value of a business's earnings and enables trade with the rest of the world.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-3",
          difficulty: -0.5,
          question: "How does corruption in business and government generally affect entrepreneurs?",
          options: [
            "It raises the cost and unpredictability of doing business, so risk goes up",
            "It mostly affects large corporations, while small businesses are left alone",
            "It tends to speed up approvals, which actually helps businesses move faster",
            "It only becomes a problem once a business tries to expand overseas"
          ],
          correctAnswer: 0,
          explanation: "Corruption raises the cost and unpredictability of doing business, increasing overall risk for entrepreneurs.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-4",
          difficulty: 0.0,
          question: "What is the general relationship between tax/regulation levels and business risk?",
          options: [
            "Lower taxes and lighter regulation generally lower a business's risk",
            "Higher taxes and heavier regulation generally lower a business's risk",
            "Taxes matter to businesses, but regulations have almost no effect on risk",
            "The tax level matters far less than the size of the local market"
          ],
          correctAnswer: 0,
          explanation: "Lower taxes and lighter regulation reduce the cost and risk of doing business, generally supporting more growth.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-5",
          difficulty: 1.0,
          question: "A country allows private ownership but has an unstable, hard-to-trade currency. What's the likely effect on entrepreneurs there?",
          options: [
            "Private ownership helps, but the unstable currency still adds real, separate risk",
            "Private ownership by itself is enough to cancel out almost any currency problem",
            "The currency only matters for businesses that plan to trade internationally",
            "An unstable currency mainly hurts the government, not private businesses"
          ],
          correctAnswer: 0,
          explanation: "Each part of the economic environment matters: private ownership helps, but an unstable currency is still a serious separate risk.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-6",
          difficulty: 1.0,
          question: "From a government's perspective, why might keeping taxes and regulations moderate benefit the country overall?",
          options: [
            "More business activity can grow the total tax base, even at a lower rate",
            "Lower rates always bring in more total tax money than higher rates do",
            "Moderate taxes mostly help the government look good without changing much",
            "Businesses will relocate no matter what, so the tax rate makes little difference"
          ],
          correctAnswer: 0,
          explanation: "Moderate taxes and regulation can encourage more business activity, which can grow the overall tax base even at a lower rate.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-7",
          difficulty: 0.0,
          question: "Which combination describes an economic environment that LOWERS risk for entrepreneurs?",
          options: [
            "Private ownership, enforceable contracts, and a stable, tradable currency",
            "Private ownership and low corruption, but with contracts courts won't enforce",
            "Enforceable contracts and a stable currency, but with widespread corruption",
            "Private ownership and a growing market, but with an unstable local currency"
          ],
          correctAnswer: 0,
          explanation: "Private ownership, enforceable contracts, currency stability, and low corruption together create a lower-risk environment for entrepreneurs.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-8",
          difficulty: -1.5,
          question: "What does it mean for a country to allow 'private ownership' of businesses?",
          options: [
            "Individual people and companies are allowed to own businesses themselves",
            "Only the national government is allowed to own businesses",
            "Every business must be owned equally by all citizens",
            "No one is permitted to own a business at all"
          ],
          correctAnswer: 0,
          explanation: "Private ownership means individuals and companies, not just the government, can own businesses, one of the basic protections that lowers risk for entrepreneurs.",
          concept: "economic-environment"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LO 1-4: Technology's Effects on Business
// Byrnes Ch.1, LO 1-4: Describe the effects of technology on businesses.
// ─────────────────────────────────────────────────────────────
export const gulliverLO1_4: StructuredLessonContent = {
  lessonId: "gulliver-lo-1-4",
  sections: [
    {
      type: "concept",
      title: "How Technology Benefits Workers, Businesses, and Consumers",
      paragraphs: [
        "Technology has changed business by making workers more **effective**, **efficient**, and **productive**, three words that sound similar but mean different things. **Effectiveness** means doing the right thing in the right way; it's about whether the work being done is actually the right work at all. **Efficiency** means producing items using the least amount of resources, doing things without waste. **Productivity** is the amount of output generated given a certain amount of input, like the number of units produced per hour worked.",
        "A worker can be efficient without being effective (perfectly executing the wrong task), and technology's real payoff is when it improves all three at once: helping people do the right work, with less waste, and more output per hour. That's why businesses invest heavily in new technology even when it's expensive upfront, because the gains in effectiveness, efficiency, and productivity usually pay for themselves.",
        "These gains don't just benefit business owners. Workers who use better tools can accomplish more without working longer hours. Consumers benefit from lower prices and better products, since a more productive business can produce more at a lower cost per unit."
      ],
      bullets: [
        "Effectiveness = doing the right thing in the right way.",
        "Efficiency = producing items using the least amount of resources.",
        "Productivity = amount of output generated given a certain amount of input (e.g., per hour worked).",
        "Technology's biggest payoff is improving all three at once, benefiting workers, businesses, and consumers together."
      ],
      realWorldExample: "A bakery switches from a hand-mixer to an industrial mixer. The mixer doesn't change WHAT they bake (effectiveness), but it lets them use less flour waste per batch (efficiency) and produce three times as many loaves per hour (productivity), meaning lower prices for customers and more profit for the bakery."
    },
    {
      // Recall-in-context: 'effective' vs 'efficient' — the lesson's core
      // distinction. Every option is a sibling term.
      type: "activity-check",
      activity: {
        kind: "fill-blank",
        sentence: "A worker can be efficient without being [BLANK]: perfectly executing the wrong task wastes no resources, but it still isn't the right work.",
        answer: "effective",
        options: ["effective", "productive", "profitable", "efficient"],
        explanation: "Effectiveness is doing the RIGHT thing in the right way. You can be efficient (no waste) while doing the wrong task entirely — which is why effectiveness comes first.",
      },
    },
    {
      // Structure check: the classic efficiency-vs-productivity confusion the
      // lesson flags, using concrete, realistic scenarios.
      type: "activity-check",
      activity: {
        kind: "categorize",
        bins: ["Efficiency", "Productivity"],
        items: [
          { text: "A bakery wastes less flour per batch", bin: 0 },
          { text: "A factory makes twice as many units per hour with the same workers", bin: 1 },
          { text: "A team uses fewer materials to make the same product", bin: 0 },
          { text: "A worker assembles more phones per shift than before", bin: 1 },
        ],
        explanation: "Efficiency = using the LEAST resources for the same output (less waste). Productivity = more OUTPUT for the same input (more per hour). Same technology often improves both, but they're different measures.",
      },
    },
    {
      // Misconception check: the lie conflates efficiency and productivity.
      type: "activity-check",
      activity: {
        kind: "two-truths-a-lie",
        prompt: "Two of these are true. Tap the one that's false.",
        statements: [
          "Effectiveness means doing the right thing in the right way.",
          "Technology's biggest payoff is improving effectiveness, efficiency, and productivity all at once.",
          "Efficiency and productivity mean exactly the same thing.",
        ],
        lieIndex: 2,
        explanation: "Efficiency is using the fewest resources for the same output; productivity is the amount of output per unit of input. Related, but not the same thing.",
      },
    },
    {
      type: "scenario",
      title: "The Restaurant That Automated Its Kitchen",
      narrative: "A restaurant installs a new ordering system that sends orders straight to the kitchen screen instead of a server writing them by hand. Orders arrive faster and with fewer mistakes, and the kitchen can now handle more tables per hour without adding staff.",
      details: [
        "Fewer mistakes = more effectiveness (the right order actually gets made).",
        "Less wasted food from wrong orders = more efficiency.",
        "More tables served per hour with the same staff = more productivity.",
        "Customers benefit from faster, more accurate service, since one piece of technology improved all three at once."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "glo14-aq1",
        difficulty: 1.0,
        question: "Why did the new ordering system improve efficiency specifically, not just productivity?",
        options: [
          "It cut the wasted food from wrong orders, so fewer resources are used per meal",
          "It let the kitchen serve more tables per hour, which is really productivity",
          "It mainly made the servers work faster than they used to before",
          "It raised the price of each meal, so the restaurant keeps more per order"
        ],
        correctAnswer: 0,
        explanation: "Cutting down on wasted food from mistaken orders is specifically an efficiency gain: using fewer resources per unit produced.",
        concept: "technology-effects"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 3,
      questions: [
        {
          id: "glo14-mx-1",
          difficulty: -0.5,
          question: "What is 'effectiveness'?",
          options: [
            "Doing the right work, in the right way, rather than doing the wrong task well",
            "Producing each item using the least possible amount of resources and waste",
            "The number of finished units a worker turns out in each hour of work",
            "How quickly a task gets done, whether or not it was the right task"
          ],
          correctAnswer: 0,
          explanation: "Effectiveness is about doing the RIGHT thing, in the right way, not just doing things quickly or cheaply.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-2",
          difficulty: 1.0,
          question: "A worker perfectly completes a task that didn't actually need to be done. What does this describe?",
          options: [
            "High effectiveness and high efficiency at once",
            "Possibly high efficiency, but LOW effectiveness",
            "High productivity, but nothing else changed",
            "This scenario is completely impossible in practice"
          ],
          correctAnswer: 1,
          explanation: "You can execute a task efficiently (with little waste) while still being ineffective, because it wasn't the right task to do in the first place.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-3",
          difficulty: -1.0,
          question: "Which best defines productivity?",
          options: [
            "The amount of output generated per unit of input",
            "How much a business chooses to spend on advertising",
            "The total number of stakeholders that a business has",
            "Whether or not a task was the right one to do"
          ],
          correctAnswer: 0,
          explanation: "Productivity measures output relative to input, such as units produced per hour worked.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-4",
          difficulty: 0.0,
          question: "How do consumers typically benefit when a business becomes more productive?",
          options: [
            "A lower cost per unit can be passed on as lower prices or better products",
            "Consumers usually pay more, since companies charge extra for the new technology",
            "The gains stay with the business, since prices are set by demand alone",
            "Consumers benefit only if they happen to own stock in that company"
          ],
          correctAnswer: 0,
          explanation: "Lower cost per unit from higher productivity can translate into lower prices and better products for consumers.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-5",
          difficulty: 0.5,
          question: "A company invests in expensive new equipment even though it costs a lot upfront. Why might this make sense?",
          options: [
            "The productivity and efficiency gains usually repay the upfront cost over time",
            "New equipment is mostly bought to impress customers and investors",
            "The cost can always be fully deducted from the company's taxes right away",
            "Older equipment is legally required to be replaced every few years"
          ],
          correctAnswer: 0,
          explanation: "Even with a high upfront cost, technology that improves effectiveness, efficiency, and productivity typically pays for itself.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-6",
          difficulty: 1.0,
          question: "Which scenario is the BEST example of a technology improving efficiency specifically?",
          options: [
            "A machine that uses less raw material to make the same product",
            "A worker who works longer hours without any new tools",
            "A business that raises its prices with no other changes",
            "A company that hires more workers to do the exact same amount of work"
          ],
          correctAnswer: 0,
          explanation: "Using less raw material to make the same product is a direct efficiency gain, with less waste of resources.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-7",
          difficulty: 1.5,
          question: "Why does technology's 'real payoff' come from improving effectiveness, efficiency, AND productivity together, rather than just one?",
          options: [
            "Because doing the right work, with less waste and more output, compounds together",
            "Because improving just one of the three usually cancels out the other two",
            "Because customers only notice a change when all three improve at once",
            "Because the three are really just different names for one single idea"
          ],
          correctAnswer: 0,
          explanation: "The three concepts reinforce each other: the biggest gains come from improving all three together, not just one in isolation.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-8",
          difficulty: -1.0,
          question: "Which term means 'the amount of output produced for a given amount of input, such as units made per hour worked'?",
          options: [
            "Productivity",
            "Effectiveness",
            "Efficiency",
            "Revenue"
          ],
          correctAnswer: 0,
          explanation: "Productivity is output per unit of input (e.g., units per hour). Effectiveness is doing the right thing; efficiency is using the least resources.",
          concept: "technology-effects"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LO 1-5: Meeting and Beating Competition
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
        "Businesses don't operate alone; they're constantly being compared to competitors by the same customers. One of the clearest ways companies win that comparison is by finding a **competitive edge**: focusing on making high-quality products, all the way up to **zero defects** (essentially no flaws at all). Quality alone isn't the only lever, though: companies also aim to **exceed customer expectations**, giving people more than they were expecting rather than just meeting the bare minimum.",
        "A major way businesses achieve both of those goals is by **empowering** their **frontline workers**, the employees who deal directly with customers. Empowering means giving them more training, more responsibility, and more authority to make decisions on the spot, instead of forcing every issue up the chain of command. A frontline worker who can immediately fix a customer's problem creates a much better experience than one who has to say 'let me ask my manager' every time.",
        "Put together, this is the real formula for beating competition: high quality (up to zero defects), consistently exceeding what customers expect, and frontline employees who are trusted and equipped to deliver both."
      ],
      bullets: [
        "A competitive edge often comes from high-quality products, up to the standard of zero defects.",
        "Businesses also aim to exceed customer expectations, not just meet them.",
        "Empowering frontline workers means giving them more training, responsibility, and authority.",
        "Empowered frontline workers can solve problems immediately instead of escalating everything, improving the customer experience."
      ],
      realWorldExample: "Two coffee shops sell the same drink at the same price. At Shop A, a barista who messes up an order has to find the manager to fix it. At Shop B, the barista is empowered to immediately remake the drink or refund it on the spot. Shop B's customers leave happier, because the competitive edge came from empowering the frontline worker, not the coffee itself."
    },
    {
      // Recall check: the four key terms of the lesson matched to their meanings.
      type: "activity-check",
      activity: {
        kind: "vocab-match",
        pairs: [
          { term: "Competitive edge", definition: "An advantage that makes customers choose one business over its rivals" },
          { term: "Zero defects", definition: "A quality standard of essentially no flaws in the product" },
          { term: "Empowering workers", definition: "Giving employees more training, responsibility, and authority to decide" },
          { term: "Frontline workers", definition: "The employees who deal directly with customers" },
        ],
        explanation: "Beating competition comes from high quality (up to zero defects), exceeding expectations, and empowering the frontline workers who deliver both.",
      },
    },
    {
      // Recall-in-context: 'exceed' vs merely 'meet' expectations.
      type: "activity-check",
      activity: {
        kind: "fill-blank",
        sentence: "Great businesses aim to [BLANK] customer expectations — giving people more than they were expecting, not just meeting the bare minimum.",
        answer: "exceed",
        options: ["exceed", "meet", "lower", "empower"],
        explanation: "Exceeding expectations means going beyond the minimum. Simply 'meeting' them is the baseline every rival also hits — it's exceeding them that wins customers.",
      },
    },
    {
      // Misconception check: the lie inverts the lesson's point about empowerment.
      type: "activity-check",
      activity: {
        kind: "two-truths-a-lie",
        prompt: "Two of these are true. Tap the one that's false.",
        statements: [
          "Empowered frontline workers can solve a customer's problem on the spot instead of escalating everything.",
          "Zero defects means producing with essentially no flaws.",
          "The best way to beat competition is to give frontline workers less authority so they make fewer decisions.",
        ],
        lieIndex: 2,
        explanation: "Empowering frontline workers — more training, responsibility, and authority — is what lets them fix problems immediately and deliver a better experience. Less authority means more 'let me ask my manager.'",
      },
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
        difficulty: 0.5,
        question: "Why does Store B have a competitive edge over Store A, even though they sell the exact same products?",
        options: [
          "Store B lets its workers fix a customer's problem immediately, on the spot",
          "Store B must be selling a higher-quality product than Store A does",
          "Store A simply charges more for the very same items on its shelves",
          "Store B spends far more on advertising to bring its customers back"
        ],
        correctAnswer: 0,
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
          difficulty: -1.5,
          question: "What is a 'competitive edge'?",
          options: [
            "A legal requirement all businesses must follow",
            "An advantage that helps a business meet or beat its competition",
            "The total revenue of a business",
            "A type of tax on businesses"
          ],
          correctAnswer: 1,
          explanation: "A competitive edge is an advantage, like quality or service, that helps a business stand out against competitors.",
          concept: "competitive-edge"
        },
        {
          id: "glo15-mx-2",
          difficulty: -1.0,
          question: "What does it mean to exceed customer expectations, rather than just meet them?",
          options: [
            "Giving customers exactly what they asked for and nothing more",
            "Giving customers more than they expected, going beyond the bare minimum",
            "Ignoring what customers want entirely",
            "Charging customers extra for basic service"
          ],
          correctAnswer: 1,
          explanation: "Exceeding expectations means delivering more than the customer anticipated, not just the bare minimum they asked for.",
          concept: "competitive-edge"
        },
        {
          id: "glo15-mx-3",
          difficulty: 0.5,
          question: "Why would a business aim for 'zero defects' instead of just 'mostly good' products?",
          options: [
            "Because near-flawless quality can become a real edge over sloppier rivals",
            "Because a single small defect will always destroy a company completely",
            "Because customers honestly never notice small differences in quality",
            "Because fixing defects later is usually cheaper than preventing them"
          ],
          correctAnswer: 0,
          explanation: "Aiming for essentially flawless quality helps a business stand out against competitors with more frequent mistakes.",
          concept: "competitive-edge"
        },
        {
          id: "glo15-mx-4",
          difficulty: -1.0,
          question: "What is a 'frontline worker'?",
          options: [
            "An employee who never interacts with the public",
            "An employee who deals directly with customers",
            "Only the CEO or top executives of a company",
            "A government inspector who visits the business"
          ],
          correctAnswer: 1,
          explanation: "Frontline workers are the employees who directly interact with customers, like cashiers, servers, or support reps.",
          concept: "empowering-workers"
        },
        {
          id: "glo15-mx-5",
          difficulty: -0.5,
          question: "Why might a business that empowers its frontline workers create a better customer experience?",
          options: [
            "Because problems get solved right away instead of being pushed up the chain",
            "Because empowered workers can be paid far less than regular employees",
            "Because giving workers authority removes the need to train them at all",
            "Because customers would rather deal with a manager for every small issue"
          ],
          correctAnswer: 0,
          explanation: "When frontline workers have real authority, they can fix issues on the spot, which usually improves the customer's experience.",
          concept: "empowering-workers"
        },
        {
          id: "glo15-mx-6",
          difficulty: 1.0,
          question: "Two businesses sell identical products at the same price. How could one still gain a real competitive edge?",
          options: [
            "By offering better service and consistently exceeding customer expectations",
            "By quietly lowering its product quality to cut costs and charge less",
            "By charging noticeably more so customers assume the product is better",
            "By spending far more than the competitor does on television advertising"
          ],
          correctAnswer: 0,
          explanation: "Even with identical products, service quality, empowered employees, and exceeding expectations can still create a real competitive edge.",
          concept: "competitive-edge"
        },
        {
          id: "glo15-mx-7",
          difficulty: 1.0,
          question: "What is the connection between empowering frontline workers and exceeding customer expectations?",
          options: [
            "Giving workers the authority to act fast is often what exceeds expectations",
            "Empowered workers tend to make more mistakes, which lowers satisfaction",
            "Exceeding expectations really depends on price, not on the workers at all",
            "The two ideas really apply to totally different kinds of businesses"
          ],
          correctAnswer: 0,
          explanation: "Giving frontline workers the authority to act fast is often exactly what allows a business to exceed, not just meet, customer expectations.",
          concept: "empowering-workers"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LO 1-6: Social Changes Affecting Business
// Byrnes Ch.1, LO 1-6: Analyze the social changes affecting businesses.
// ─────────────────────────────────────────────────────────────
export const gulliverLO1_6: StructuredLessonContent = {
  lessonId: "gulliver-lo-1-6",
  sections: [
    {
      type: "concept",
      title: "Social Change: Diversity and an Aging Population",
      paragraphs: [
        "**Diversity** in business today means far more than most people first assume. It's not just about recruiting and keeping ethnic or racial minorities and women. It also includes older adults, people with disabilities, people with different sexual orientations, atheists, religious people, extroverts, introverts, married people, and single people. Managing diversity well means dealing sensitively with workers and cultures from all of these backgrounds, both inside the business and around the world.",
        "A related social shift is the aging population and the future of **Social Security**, the government program that provides benefits to older citizens. As the population ages, Social Security is expected to draw huge amounts of money from the working population to support it, which is why it's such a common topic in the media today. This isn't just a government issue; it affects businesses too, since it influences how much workers and employers pay in, and how much older employees plan to keep working versus retire.",
        "Together, these social changes mean businesses have to think about a much wider, more varied group of employees and customers than in the past, and plan for a workforce and customer base that keeps shifting as the population ages."
      ],
      bullets: [
        "Diversity today includes far more than race and gender: age, disability, orientation, religion, personality type, and marital status all count.",
        "Managing diversity means dealing sensitively with a wide range of workers and cultures, including around the world.",
        "Social Security provides benefits to older citizens, funded largely by the working population.",
        "An aging population means Social Security will draw increasingly large amounts of money from workers in the future."
      ],
      realWorldExample: "A company that only thinks of 'diversity' as hiring people of different races is missing most of the picture. A truly diverse workplace also includes people of different ages, abilities, religions, and family situations, all of whom bring different needs and perspectives that a business has to manage sensitively."
    },
    {
      // Structure check: three items belong to the modern definition of
      // diversity; the fourth is a worker attribute that isn't diversity at all.
      type: "activity-check",
      activity: {
        kind: "odd-one-out",
        prompt: "Three of these are part of the modern definition of workplace diversity. Tap the one that is NOT.",
        options: [
          "A worker's age and abilities",
          "A worker's religion and personality type",
          "A worker's family and marital situation",
          "A worker's job title and seniority",
        ],
        oddIndex: 3,
        explanation: "Modern diversity spans age, disability, orientation, religion, personality, and family situation — the human backgrounds people bring. Job title and seniority are about rank in the company, not diversity.",
      },
    },
    {
      // Recall-in-context: naming Social Security. Distractors mirror the common
      // wrong ideas the lesson corrects.
      type: "activity-check",
      activity: {
        kind: "fill-blank",
        sentence: "[BLANK] is a government program, funded largely by the working population, that provides benefits to older citizens.",
        answer: "Social Security",
        options: ["Social Security", "A private company benefit", "A business-only tax", "Private insurance"],
        explanation: "Social Security is a government program funded by today's workers to support older citizens — not a private benefit, not a tax only businesses pay, and not private insurance.",
      },
    },
    {
      // Misconception check: the lie is the narrow 'race and gender only' view of
      // diversity that the lesson explicitly widens.
      type: "activity-check",
      activity: {
        kind: "two-truths-a-lie",
        prompt: "Two of these are true. Tap the one that's false.",
        statements: [
          "Modern workplace diversity includes age, disability, religion, and personality — not just race and gender.",
          "As the population ages, Social Security is expected to draw increasingly large amounts from workers.",
          "Diversity in business today means only recruiting racial minorities and women.",
        ],
        lieIndex: 2,
        explanation: "That's the outdated, narrow view. Today's definition of diversity is much broader — age, disability, orientation, religion, personality, and family situation all count.",
      },
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
        difficulty: 0.0,
        question: "Why was the first draft of the diversity policy incomplete?",
        options: [
          "Because it covered only race and gender, leaving out many other groups",
          "Because it tried to cover far too many different groups all at once",
          "Because diversity policies mostly create legal headaches for a company",
          "Because hiring should really be based on seniority more than anything"
        ],
        correctAnswer: 0,
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
          difficulty: -1.5,
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
          difficulty: -0.5,
          question: "What does 'managing diversity' actually require from a business?",
          options: [
            "Dealing sensitively with a wide range of workers, cultures, and backgrounds",
            "Making sure every single employee is treated in the exact same way",
            "Hiring mostly people with similar backgrounds to reduce workplace conflict",
            "Setting strict numeric quotas for each group the company decides to track"
          ],
          correctAnswer: 0,
          explanation: "Managing diversity means actively and sensitively handling differences among a wide range of workers and cultures.",
          concept: "diversity"
        },
        {
          id: "glo16-mx-3",
          difficulty: 0.5,
          question: "Why is Social Security discussed so much in the media today?",
          options: [
            "Because an aging population will draw ever more money from today's workers",
            "Because Social Security was only just created within the last few years",
            "Because businesses have recently been made exempt from paying into it",
            "Because the program has started returning its money to the government"
          ],
          correctAnswer: 0,
          explanation: "The aging population means Social Security will require increasingly large amounts of money from current workers, making it a major ongoing topic.",
          concept: "social-security"
        },
        {
          id: "glo16-mx-4",
          difficulty: 0.0,
          question: "Which statement BEST reflects how diversity has changed as a concept over time?",
          options: [
            "It has broadened to include age, disability, religion, personality, and more",
            "It has actually narrowed over time to cover fewer groups than before",
            "It has stayed focused on race and gender, which are what really matter",
            "It has shifted to mean treating every worker as exactly identical"
          ],
          correctAnswer: 0,
          explanation: "The concept of diversity has broadened significantly beyond just race and gender.",
          concept: "diversity"
        },
        {
          id: "glo16-mx-5",
          difficulty: 1.0,
          question: "How does an aging population connect to businesses, not just government?",
          options: [
            "It shapes payroll contributions and how firms plan for waves of retirements",
            "It only matters to the government, since businesses don't pay into it",
            "It mainly affects companies that sell products aimed at older customers",
            "It simply means businesses will steadily need far fewer workers overall"
          ],
          correctAnswer: 0,
          explanation: "An aging population changes worker contributions, retirement planning, and staffing decisions, all things businesses have to account for.",
          concept: "social-security"
        },
        {
          id: "glo16-mx-6",
          difficulty: 0.5,
          question: "A company assumes diversity only means hiring people of different races. What is this company most likely to overlook?",
          options: [
            "Age, disability, religion, and personality differences among its workers",
            "Whether its advertising is reaching enough younger, first-time customers",
            "How its salaries compare with what rival companies are paying workers",
            "Which suppliers can deliver its raw materials at the lowest cost"
          ],
          correctAnswer: 0,
          explanation: "Limiting diversity to race alone overlooks the much wider range of groups that modern diversity actually includes.",
          concept: "diversity"
        },
        {
          id: "glo16-mx-7",
          difficulty: 0.5,
          question: "Which of the following is an accurate description of Social Security's funding?",
          options: [
            "Benefits for older citizens are funded largely by today's working population",
            "The program is funded entirely by businesses, with nothing taken from workers",
            "Older citizens fully pre-paid their own benefits earlier in their own lives",
            "The program is paid from a separate savings account kept for each person"
          ],
          correctAnswer: 0,
          explanation: "Social Security benefits for older citizens are funded largely by drawing on the current working population.",
          concept: "social-security"
        },
        {
          id: "glo16-mx-8",
          difficulty: 1.0,
          question: "A company operates in five countries with a workforce spanning four generations, several religions, and many first languages. Which approach best reflects managing diversity WELL?",
          options: [
            "Apply one identical policy everywhere and ignore local and cultural differences",
            "Deal sensitively with the range of workers and cultures in each location",
            "Hire only workers who share the manager's own background to avoid friction",
            "Treat diversity purely as a legal box to check and nothing more"
          ],
          correctAnswer: 1,
          explanation: "Managing diversity well means dealing sensitively with a wide range of workers and cultures, including across countries, not applying one rigid policy or avoiding differences.",
          concept: "diversity"
        },
        {
          id: "glo16-mx-9",
          difficulty: 1.0,
          question: "As the population ages, a large employer sees many workers nearing retirement and rising payroll contributions. Which combination of effects is it most likely planning around?",
          options: [
            "Replacing retiring workers, plus higher Social Security contributions from current workers",
            "A shrinking need for new hires, since older workers rarely ever retire",
            "Lower payroll costs, because retirees no longer count toward contributions",
            "Mostly a public-relations issue, with little real effect on staffing or costs"
          ],
          correctAnswer: 0,
          explanation: "An aging population means employers plan for waves of retirements AND for Social Security drawing more from the current working population, connecting the social change directly to business planning.",
          concept: "social-security"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LO 1-7: Global Challenges, War, and Terrorism
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
        "U.S. businesses today compete on a global stage, and two countries in particular, **China** and **India**, are considered the biggest sources of competitive challenge. Their large workforces and growing economies mean U.S. businesses increasingly compete with companies based there for customers, workers, and resources, both at home and abroad.",
        "Global instability, including war and **terrorism**, also directly affects businesses, but not evenly. Some industries, like the **defense industry**, may actually prosper during periods of conflict, since demand for their products rises. Other industries, like **tourism**, tend to suffer badly, since people avoid traveling to or through unstable regions.",
        "One way experts believe world tensions can be reduced is by helping **less-developed countries** become more prosperous. The logic connects back to earlier ideas in the chapter: a more prosperous country, with stronger businesses, stable currency, and enforceable contracts, has less incentive toward the kind of instability that leads to conflict in the first place."
      ],
      bullets: [
        "China and India are identified as the two countries creating the greatest competitive challenges for U.S. businesses.",
        "War and terrorism affect industries very differently: the defense industry may prosper, while tourism tends to suffer.",
        "One strategy to reduce world tensions is helping less-developed countries become more prosperous.",
        "Global instability connects back to the economic environment factors (like enforceable contracts and stable currency) discussed earlier in the chapter."
      ],
      realWorldExample: "During a period of global conflict, a defense contractor sees rising orders and profit, while an airline serving that same region sees bookings collapse. Both are U.S. businesses affected by the same event, but in opposite directions, which is exactly why businesses have to track global events closely, not just domestic ones."
    },
    {
      // Structure check: war/terrorism hits industries unevenly. Each item is a
      // realistic business, split by which way the same event pushes it.
      type: "activity-check",
      activity: {
        kind: "categorize",
        bins: ["Tends to prosper", "Tends to suffer"],
        items: [
          { text: "The defense industry", bin: 0 },
          { text: "The tourism industry", bin: 1 },
          { text: "An airline serving an unstable region", bin: 1 },
          { text: "A military equipment contractor", bin: 0 },
        ],
        explanation: "During conflict, demand rises for defense products (they prosper) while people avoid travel (tourism and airlines suffer) — the same event, opposite effects.",
      },
    },
    {
      // Recall-in-context: the strategy of helping less-developed countries.
      type: "activity-check",
      activity: {
        kind: "fill-blank",
        sentence: "Experts believe one way to reduce world tensions is by helping [BLANK] countries become more prosperous, since prosperity lowers the incentive toward conflict.",
        answer: "less-developed",
        options: ["less-developed", "already wealthy", "larger", "neighboring"],
        explanation: "Helping less-developed countries build stronger businesses, stable currencies, and enforceable contracts gives them more to lose from instability — reducing the pull toward conflict.",
      },
    },
    {
      // Misconception check: the lie is 'every industry is affected the same way'
      // — the opposite of the uneven effect the lesson teaches.
      type: "activity-check",
      activity: {
        kind: "two-truths-a-lie",
        prompt: "Two of these are true. Tap the one that's false.",
        statements: [
          "China and India are named as the biggest sources of competitive challenge for U.S. businesses.",
          "The defense industry may actually prosper during periods of conflict.",
          "War and terrorism affect every industry in exactly the same way.",
        ],
        lieIndex: 2,
        explanation: "The effects are uneven: defense may prosper while tourism suffers. That's why businesses have to track global events closely — the same event helps some and hurts others.",
      },
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
        difficulty: 0.5,
        question: "Why do the defense manufacturer and the travel company react so differently to the same conflict?",
        options: [
          "Because conflict pushes defense demand up while pushing tourism sharply down",
          "Because the travel company simply managed its own business poorly that year",
          "Because global events tend to reach some industries much later than others",
          "Because defense firms are shielded from world events by the government"
        ],
        correctAnswer: 0,
        explanation: "Global instability affects industries unevenly: some, like defense, can see rising demand, while others, like tourism, tend to suffer.",
        concept: "global-challenges"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 3,
      questions: [
        {
          id: "glo17-mx-1",
          difficulty: -0.5,
          question: "Why are China and India specifically named as major competitive challenges for U.S. businesses?",
          options: [
            "Because their large workforces and fast-growing economies compete hard for business",
            "Because they mainly buy American products rather than making their own",
            "Because they focus their competition almost entirely on the tourism industry",
            "Because their currencies are the most widely used in all of world trade"
          ],
          correctAnswer: 0,
          explanation: "Their scale and economic growth make China and India major sources of competitive pressure on U.S. businesses.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-2",
          difficulty: -1.0,
          question: "Which industry tends to PROSPER during periods of war, according to the chapter?",
          options: [
            "The tourism and travel industry",
            "The defense and weapons industry",
            "Only the restaurant industry",
            "No industry ever benefits from war"
          ],
          correctAnswer: 1,
          explanation: "The defense industry often sees rising demand for its products during periods of conflict.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-3",
          difficulty: -0.5,
          question: "What is one suggested way to help minimize world tensions?",
          options: [
            "Helping less-developed countries grow more prosperous and stable over time",
            "Cutting off trade with less-developed countries until the tensions cool down",
            "Leaving struggling countries to solve their own problems without any help",
            "Shrinking the defense industry so that fewer weapons are ever produced"
          ],
          correctAnswer: 0,
          explanation: "Helping less-developed countries become more prosperous is identified as one way to help reduce world tensions.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-4",
          difficulty: 1.5,
          question: "How does this lesson connect back to the economic environment factors from lesson 1.3 (enforceable contracts, stable currency, low corruption)?",
          options: [
            "More prosperous, stable countries tend to have less incentive toward conflict",
            "Strong contracts and stable currencies actually tend to spark more conflict",
            "The economic environment matters at home but has no real effect abroad",
            "Global tension depends only on military strength, not on economics"
          ],
          correctAnswer: 0,
          explanation: "A stronger economic environment in less-developed countries is tied to greater prosperity and, potentially, less instability and conflict.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-5",
          difficulty: 0.5,
          question: "A U.S. airline's bookings to a region drop sharply after reports of instability there. What does this best illustrate?",
          options: [
            "That tourism-related industries tend to suffer when a region becomes unstable",
            "That the defense industry must be struggling in that same region too",
            "That the airline simply set its ticket prices too high that season",
            "That instability affects foreign airlines but never U.S. ones"
          ],
          correctAnswer: 0,
          explanation: "This is a direct example of tourism-related businesses suffering due to travelers avoiding unstable regions.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-6",
          difficulty: 0.0,
          question: "Why do businesses need to track global events, not just domestic ones?",
          options: [
            "Because foreign competition and global instability can hit many industries hard",
            "Because global events matter only to businesses that export overseas",
            "Because tracking world news is mainly a job for government agencies",
            "Because domestic events are always more important than foreign ones"
          ],
          correctAnswer: 0,
          explanation: "Global competition and instability have real, if uneven, effects on U.S. businesses across different industries.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-7",
          difficulty: 0.5,
          question: "What is the key takeaway about how war and terrorism affect businesses overall?",
          options: [
            "The effects are uneven: defense can prosper while tourism tends to suffer",
            "Every industry is hurt by war and terrorism in roughly the same way",
            "The effects are always short-lived and fade within just a few weeks",
            "Only businesses located inside the conflict zone feel any impact"
          ],
          correctAnswer: 0,
          explanation: "War and terrorism affect industries unevenly, helping some (like defense) while hurting others (like tourism).",
          concept: "global-challenges"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LO 1-8: Past Trends, Present Patterns, and Tomorrow's Graduates
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
      title: "The History of U.S. Business, and What It Means for You",
      paragraphs: [
        "The history of U.S. economic development follows a repeating pattern: workers get displaced from one part of the economy by improved technology, and they move into a different part of the economy that's growing. Early on, agricultural workers displaced by improved farm technology moved to work in factories, as machines made it possible to grow more food with far fewer workers.",
        "That same pattern repeated in manufacturing: improved manufacturing productivity, combined with increased competition from foreign firms, meant factories needed fewer workers to produce the same output. Those displaced factory workers largely moved into service industries, meaning jobs based on providing services rather than making physical goods.",
        "Today, that same cycle is playing out again in the shift toward the information age, where technology and data-driven work are reshaping which jobs exist and which skills are valuable. For today's students heading toward college and a career, the lesson from this repeating pattern is that the specific jobs available will keep changing, which is why adaptability and continuous learning matter more than locking into one static skill set."
      ],
      bullets: [
        "Pattern: improved technology displaces workers from one sector, and they move into a growing sector.",
        "Agricultural workers displaced by farm technology moved into factory jobs.",
        "Improved manufacturing productivity + foreign competition displaced factory workers into service industries.",
        "Today's shift toward the information age is a continuation of this same historical pattern.",
        "For future graduates, the takeaway is that adaptability and continuous learning matter more than any single fixed skill set."
      ],
      realWorldExample: "A farmworker in the early 1900s might have been displaced by a tractor and found a new job in a factory. A factory worker decades later might have been displaced by automation and foreign competition and found a new job in a service industry. A worker today might see their job reshaped by information-age technology and need new skills to move into what comes next: same pattern, different era."
    },
    {
      // Sequence check: the repeating displacement pattern, in true time order.
      type: "activity-check",
      activity: {
        kind: "sequence",
        prompt: "Put these kinds of work in the order U.S. workers moved through them over history.",
        steps: [
          "Farm and agricultural work",
          "Factory and manufacturing jobs",
          "Service-industry jobs",
          "Information-age, data-driven work",
        ],
        explanation: "Each wave of technology displaced workers from one sector into the next: farms → factories → services → the information age. Same pattern, different era.",
      },
    },
    {
      // Recall-in-context: the two forces that shrank manufacturing jobs.
      type: "activity-check",
      activity: {
        kind: "fill-blank",
        sentence: "Improved productivity combined with more foreign [BLANK] meant factories needed fewer workers, who moved into service industries.",
        answer: "competition",
        options: ["competition", "regulation", "technology", "labor"],
        explanation: "Two forces shrank manufacturing jobs: rising productivity (fewer workers make the same output) and foreign competition. Technology drove the productivity gains, but it's the competition that pairs with it here.",
      },
    },
    {
      // Misconception check: the lie is 'jobs stay the same' — the opposite of
      // the chapter's whole point about a changing economy.
      type: "activity-check",
      activity: {
        kind: "two-truths-a-lie",
        prompt: "Two of these are true. Tap the one that's false.",
        statements: [
          "Displaced agricultural workers moved into factory jobs as manufacturing grew.",
          "For future graduates, adaptability and continuous learning matter more than one fixed skill set.",
          "The specific jobs available in the economy stay basically the same from one generation to the next.",
        ],
        lieIndex: 2,
        explanation: "The whole pattern is that jobs keep changing — farm to factory to service to information age. That's exactly why adaptability and continuous learning matter more than locking into one skill.",
      },
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
        difficulty: 0.0,
        question: "What is the main lesson this family's history illustrates for someone heading into college and a career today?",
        options: [
          "That jobs keep changing, so staying adaptable matters most of all",
          "That the safest move is to lock into one skill and stick with it",
          "That only farming jobs have ever been replaced by new technology",
          "That a college education has little to do with this whole pattern"
        ],
        correctAnswer: 0,
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
          difficulty: -0.5,
          question: "What is the general repeating pattern described in U.S. economic history?",
          options: [
            "Technology displaces workers, who then move into a new, growing sector",
            "Each new wave of technology permanently removes far more jobs than it makes",
            "Workers tend to stay put in the same industry and retrain for new tools",
            "New industries appear, but displaced workers rarely ever find new work"
          ],
          correctAnswer: 0,
          explanation: "The core pattern is technology-driven displacement followed by workers moving into a new, growing sector.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-2",
          difficulty: -1.0,
          question: "Why did many agricultural workers move into factory jobs historically?",
          options: [
            "Because factories generally paid much less than farming",
            "Because farm technology cut the need for agricultural labor",
            "Because agricultural jobs no longer existed anywhere at all",
            "Because factory work required no real skills whatsoever"
          ],
          correctAnswer: 1,
          explanation: "Improved farm technology reduced the need for farm labor, and displaced workers moved into the growing factory sector.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-3",
          difficulty: 0.0,
          question: "What combination of factors pushed many factory workers into service industries?",
          options: [
            "Rising manufacturing productivity combined with growing foreign competition",
            "A sharp, sudden drop in demand for manufactured goods across the country",
            "New laws that pushed most factories to relocate to other states",
            "A large increase in the number of farming jobs available"
          ],
          correctAnswer: 0,
          explanation: "Rising manufacturing productivity and foreign competition together reduced the number of factory jobs needed, pushing workers into services.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-4",
          difficulty: 0.5,
          question: "How does the shift toward the information age relate to earlier economic shifts?",
          options: [
            "It continues the same pattern of displacement into new, growing sectors",
            "It reverses the pattern, pulling workers back into older industries",
            "It is the very first time technology has ever reshaped which jobs exist",
            "It affects office jobs only, leaving every other industry untouched"
          ],
          correctAnswer: 0,
          explanation: "The shift to the information age follows the same historical pattern seen with agriculture-to-factory and factory-to-service shifts.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-5",
          difficulty: -0.5,
          question: "What is the main takeaway from this repeating pattern for a student planning a future career?",
          options: [
            "That adaptability matters most, since the available jobs keep changing",
            "That picking one stable skill early is the safest lifelong bet",
            "That the pattern applied to past generations but has now stopped",
            "That the field a student chooses to study makes almost no difference"
          ],
          correctAnswer: 0,
          explanation: "Since this displacement-and-adaptation pattern keeps repeating, staying adaptable and continuing to learn is the practical takeaway for future graduates.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-6",
          difficulty: 0.5,
          question: "A worker in a shrinking industry retrains for a role in a growing, technology-driven field. What historical pattern does this best match?",
          options: [
            "It matches displacement followed by a move into a growing sector",
            "It shows that the old pattern has finally broken down for good",
            "It applies only to farm workers, not to other kinds of jobs",
            "It proves technology creates far more jobs than it ever removes"
          ],
          correctAnswer: 0,
          explanation: "This worker's experience mirrors the same historical pattern of displacement and adaptation into a growing sector.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-7",
          difficulty: 1.0,
          question: "Which best summarizes what U.S. economic history shows about jobs over time?",
          options: [
            "The specific jobs change, but the cycle of displacement keeps repeating",
            "Once a worker is displaced by technology, new work rarely appears",
            "Only farming and manufacturing have ever been reshaped by change",
            "New technology tends to leave the total number of jobs unchanged"
          ],
          correctAnswer: 0,
          explanation: "The specific jobs change, but the underlying cycle of displacement and adaptation into new, growing sectors is a consistent historical pattern.",
          concept: "historical-trends"
        }
      ]
    }
  ]
}
