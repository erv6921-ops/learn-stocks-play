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
      type: "micro-check",
      questions: [
        {
          id: "glo11-mc-1",
          difficulty: -1.0,
          question: "In general, how are risk and potential profit related in business?",
          options: [
            "They have nothing to do with each other",
            "Bigger risk generally needs the potential for bigger profit to be worth taking",
            "Higher risk always guarantees higher profit",
            "Profit only exists when there is zero risk"
          ],
          correctAnswer: 1,
          explanation: "Risk and potential profit move together: the more an entrepreneur risks, the bigger the potential payoff usually needs to be for that risk to make sense.",
          concept: "profit-and-risk"
        },
        {
          id: "glo11-mc-2",
          difficulty: -1.5,
          question: "Which of these is a stakeholder in a business?",
          options: [
            "Only the people who own the company itself",
            "Only the paying customers who buy from it",
            "Customers, employees, suppliers, and the local community",
            "Only rival competitors trying to beat the business"
          ],
          correctAnswer: 2,
          explanation: "Stakeholders are everyone affected by or invested in the business, a much wider group than just owners or customers.",
          concept: "stakeholders"
        }
      ]
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
          "Banks only care about advertising, not about risk",
          "As a stakeholder, it needs her business profitable enough to repay the loan",
          "Banks are not considered stakeholders in a small business",
          "The bank's only real goal is for Maria's business to fail"
        ],
        correctAnswer: 1,
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
            "By avoiding paying any taxes to the government",
            "By creating jobs, paying taxes, and producing needed goods",
            "By only hiring their own stockholders as employees",
            "By eliminating all of their competition entirely"
          ],
          correctAnswer: 1,
          explanation: "Jobs, tax revenue, and the goods/services produced are how businesses raise living standards for the wider community, not just owners.",
          concept: "standard-of-living"
        },
        {
          id: "glo11-mx-4",
          difficulty: 0.5,
          question: "How are nonprofit organizations similar to for-profit businesses?",
          options: [
            "They both exist mainly to make their owners wealthy",
            "They both use business principles like efficiency and managing costs",
            "Nonprofits never have to worry about revenue or costs",
            "They are completely identical to each other in every way"
          ],
          correctAnswer: 1,
          explanation: "Nonprofits pursue a mission rather than owner profit, but still need to run efficiently and bring in enough revenue to keep operating.",
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
            "There is no real long-term risk to this strategy",
            "Ignoring stakeholders can bring lawsuits, bad press, or lost trust",
            "The affected stakeholders will not notice or react at all",
            "Profit and risk are unrelated to how stakeholders are treated"
          ],
          correctAnswer: 1,
          explanation: "Squeezing stakeholders for short-term gain tends to create larger risks down the road, whether reputational, legal, or financial.",
          concept: "stakeholders"
        },
        {
          id: "glo11-mx-7",
          difficulty: 1.0,
          question: "What is the core balancing act every business has to manage?",
          options: [
            "Making a profit while ignoring all outside groups",
            "Responding to stakeholder needs while still making a profit",
            "Avoiding profit entirely just to please stakeholders",
            "Taking on absolutely zero risk under any circumstances"
          ],
          correctAnswer: 1,
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
      type: "micro-check",
      questions: [
        {
          id: "glo12-mc-1",
          difficulty: -0.5,
          question: "Which of these lists all five factors of production?",
          options: [
            "Land, labor, capital, entrepreneurship, and knowledge",
            "Money, employees, buildings, taxes, and marketing",
            "Land, labor, profit, risk, and stakeholders",
            "Capital, knowledge, advertising, sales, and profit"
          ],
          correctAnswer: 0,
          explanation: "The five factors of production are land, labor, capital, entrepreneurship, and knowledge.",
          concept: "factors-of-production"
        },
        {
          id: "glo12-mc-2",
          difficulty: -1.0,
          question: "What does an entrepreneur typically give up compared to working for someone else?",
          options: [
            "The chance to ever make any money at all",
            "Guaranteed benefits like a steady paycheck and health insurance",
            "The ability to make their own business decisions",
            "Nothing at all, entrepreneurs keep every benefit plus more"
          ],
          correctAnswer: 1,
          explanation: "Entrepreneurs trade the safety net of a steady paycheck and benefits for freedom, more opportunity, and the risk/reward of running their own business.",
          concept: "entrepreneurship-tradeoffs"
        }
      ]
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
          "Land, since she uses natural resources",
          "Entrepreneurship, because she risks time and money to run it",
          "Labor only, with no other role at all",
          "She isn't part of the factors of production"
        ],
        correctAnswer: 1,
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
            "Because land, labor, and capital no longer matter at all",
            "Because resources stay idle without people who can combine them",
            "Because they are the easiest factors for a country to obtain",
            "Because entrepreneurship guarantees business success every time"
          ],
          correctAnswer: 1,
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
            "Nothing of any real value to them",
            "Freedom, more opportunity, and the chance at greater wealth",
            "A guarantee that the business will always succeed",
            "Automatic access to unlimited capital and funding"
          ],
          correctAnswer: 1,
          explanation: "Entrepreneurs gain freedom, opportunity, and upside potential in exchange for taking on more risk.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "glo12-mx-6",
          difficulty: 1.5,
          question: "Two countries have identical amounts of land, labor, and capital. What would most likely make one of them wealthier than the other?",
          options: [
            "Simply having a much larger population",
            "Stronger entrepreneurship and better use of knowledge",
            "Simply having a warmer, more pleasant climate",
            "Nothing, they would automatically be equally wealthy"
          ],
          correctAnswer: 1,
          explanation: "Wealth comes from how effectively entrepreneurship and knowledge combine the other resources, not just from having them.",
          concept: "factors-of-production"
        },
        {
          id: "glo12-mx-7",
          difficulty: 1.0,
          question: "Why is entrepreneurship sometimes called the 'spark' factor of production?",
          options: [
            "Because it literally involves electricity and sparks",
            "Because it activates land, labor, and capital that are otherwise idle",
            "Because it is the least important of all the factors",
            "Because it always requires the least amount of risk"
          ],
          correctAnswer: 1,
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
      type: "micro-check",
      questions: [
        {
          id: "glo13-mc-1",
          difficulty: -1.0,
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
          difficulty: -1.0,
          question: "From a business perspective, what do lower taxes and lighter regulation generally mean?",
          options: [
            "Higher risk and much less room to grow",
            "Lower risk, more growth, and more money kept",
            "No real effect on business risk or growth",
            "That businesses will always prefer higher taxes"
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
          "Because a customer base never really matters in business",
          "Because Country A's stronger economic environment lowers the risk",
          "Because Country B doesn't allow any businesses to open at all",
          "Because taxes are completely irrelevant to this kind of decision"
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
            "It has no real impact on business risk",
            "It raises risk and cost, making business harder",
            "It always lowers taxes for entrepreneurs",
            "It guarantees fully enforceable contracts"
          ],
          correctAnswer: 1,
          explanation: "Corruption raises the cost and unpredictability of doing business, increasing overall risk for entrepreneurs.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-4",
          difficulty: 0.0,
          question: "What is the general relationship between tax/regulation levels and business risk?",
          options: [
            "Higher taxes and heavier regulation generally lower risk",
            "Lower taxes and lighter regulation generally lower risk",
            "Taxes and regulation have no connection to business risk",
            "Regulation always increases growth regardless of its level"
          ],
          correctAnswer: 1,
          explanation: "Lower taxes and lighter regulation reduce the cost and risk of doing business, generally supporting more growth.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-5",
          difficulty: 1.0,
          question: "A country allows private ownership but has an unstable, hard-to-trade currency. What's the likely effect on entrepreneurs there?",
          options: [
            "Zero risk, since private ownership solves everything",
            "Ownership helps, but the unstable currency still adds real risk",
            "The currency situation is completely irrelevant to business",
            "Businesses cannot legally operate under any currency instability"
          ],
          correctAnswer: 1,
          explanation: "Each part of the economic environment matters: private ownership helps, but an unstable currency is still a serious separate risk.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-6",
          difficulty: 1.0,
          question: "From a government's perspective, why might keeping taxes and regulations moderate benefit the country overall?",
          options: [
            "It has no real effect on the country at all",
            "It encourages growth, meaning more jobs and tax revenue",
            "It guarantees that zero businesses will ever fail",
            "It eliminates the need for any enforceable contracts"
          ],
          correctAnswer: 1,
          explanation: "Moderate taxes and regulation can encourage more business activity, which can grow the overall tax base even at a lower rate.",
          concept: "economic-environment"
        },
        {
          id: "glo13-mx-7",
          difficulty: 0.0,
          question: "Which combination describes an economic environment that LOWERS risk for entrepreneurs?",
          options: [
            "High corruption, unstable currency, and unenforceable contracts",
            "Private ownership, enforceable contracts, and a stable currency",
            "No laws about business ownership or contracts at all",
            "Unpredictable, constantly changing, and unclear tax rates"
          ],
          correctAnswer: 1,
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
      type: "micro-check",
      questions: [
        {
          id: "glo14-mc-1",
          difficulty: -0.5,
          question: "What does 'efficiency' mean in a business context?",
          options: [
            "Doing the right thing in the right way",
            "Producing items using the least amount of resources",
            "The amount of output per hour worked",
            "How many customers a business has"
          ],
          correctAnswer: 1,
          explanation: "Efficiency is about minimizing waste: producing items using the least amount of resources.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mc-2",
          difficulty: 0.0,
          question: "A factory doubles the number of units it produces per hour after adding new equipment. Which concept does this describe?",
          options: [
            "Effectiveness",
            "Productivity",
            "Corruption",
            "Standard of living only"
          ],
          correctAnswer: 1,
          explanation: "Productivity is output generated per amount of input (like hours worked), so doubling output per hour is a productivity gain.",
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
          "It didn't actually improve efficiency at all",
          "It cut wasted food from wrong orders, using fewer resources",
          "It only affected how fast the orders were placed",
          "Efficiency and productivity mean the exact same thing"
        ],
        correctAnswer: 1,
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
            "Producing with the least waste possible",
            "Doing the right thing in the right way",
            "Output generated per hour worked",
            "The total number of employees a business has"
          ],
          correctAnswer: 1,
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
            "Consumers never benefit from any productivity gains",
            "Lower cost per unit can mean lower prices or better products",
            "Prices always go up whenever productivity increases",
            "Productivity gains only benefit the business, never its customers"
          ],
          correctAnswer: 1,
          explanation: "Lower cost per unit from higher productivity can translate into lower prices and better products for consumers.",
          concept: "technology-effects"
        },
        {
          id: "glo14-mx-5",
          difficulty: 0.5,
          question: "A company invests in expensive new equipment even though it costs a lot upfront. Why might this make sense?",
          options: [
            "It never makes sense to spend money on new equipment",
            "The gains it brings usually pay for the upfront cost over time",
            "Businesses only ever buy new equipment for appearance",
            "New equipment always decreases productivity, forever"
          ],
          correctAnswer: 1,
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
            "Because only one of them ever matters in real business",
            "Because right work, less waste, and more output compound together",
            "Because all three are really the exact same concept",
            "Because businesses can only ever improve one of the three"
          ],
          correctAnswer: 1,
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
      type: "micro-check",
      questions: [
        {
          id: "glo15-mc-1",
          difficulty: -1.5,
          question: "What does 'zero defects' represent for a business?",
          options: [
            "A goal of essentially no flaws in the product",
            "A rule that no products can ever be made",
            "The number of competitors a business has",
            "A tax rate businesses must pay"
          ],
          correctAnswer: 0,
          explanation: "Zero defects is the standard of producing with essentially no flaws, the highest level of quality.",
          concept: "competitive-edge"
        },
        {
          id: "glo15-mc-2",
          difficulty: -1.0,
          question: "What does it mean to 'empower' frontline workers?",
          options: [
            "Giving them less responsibility so they make fewer mistakes",
            "Giving them more training, responsibility, and authority",
            "Removing them from contact with customers entirely",
            "Paying them exactly the same as every other employee"
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
        difficulty: 0.5,
        question: "Why does Store B have a competitive edge over Store A, even though they sell the exact same products?",
        options: [
          "Store B's products are physically different and better",
          "Store B empowers workers to fix problems immediately",
          "Store A simply has higher-quality products overall",
          "A competitive edge has nothing to do with customer service"
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
            "Because zero defects is impossible and not worth pursuing",
            "Because near-flawless quality can be a strong competitive edge",
            "Because product quality has no effect on customer satisfaction",
            "Because defects always cost less than actually fixing them"
          ],
          correctAnswer: 1,
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
            "Because problems get solved right away, not escalated",
            "Because empowered employees are always paid much less",
            "Because it removes the need for any training entirely",
            "Because it has no real effect on the customer experience"
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
            "It's impossible to gain an edge if the products are identical",
            "By offering better service and exceeding customer expectations",
            "By lowering its product quality in order to save money",
            "By removing all of its customer service entirely"
          ],
          correctAnswer: 1,
          explanation: "Even with identical products, service quality, empowered employees, and exceeding expectations can still create a real competitive edge.",
          concept: "competitive-edge"
        },
        {
          id: "glo15-mx-7",
          difficulty: 1.0,
          question: "What is the connection between empowering frontline workers and exceeding customer expectations?",
          options: [
            "There is no real connection between the two at all",
            "Acting fast to solve problems is what exceeds expectations",
            "Empowering workers always lowers customer satisfaction",
            "Exceeding expectations means removing all frontline workers"
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
      type: "micro-check",
      questions: [
        {
          id: "glo16-mc-1",
          difficulty: -1.0,
          question: "According to the modern definition, what does diversity in the workplace include?",
          options: [
            "Only a worker's race and ethnicity",
            "Age, disability, orientation, religion, and personality too",
            "Only a worker's gender or sex",
            "Only a worker's job title and seniority"
          ],
          correctAnswer: 1,
          explanation: "Modern diversity efforts cover a much wider range of groups than race and gender alone.",
          concept: "diversity"
        },
        {
          id: "glo16-mc-2",
          difficulty: -1.5,
          question: "What is Social Security?",
          options: [
            "A private company benefit only some businesses offer",
            "A government program giving benefits to older citizens",
            "A tax that only businesses pay, and never individuals",
            "A type of private insurance that businesses buy"
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
        difficulty: 0.0,
        question: "Why was the first draft of the diversity policy incomplete?",
        options: [
          "Because diversity policies aren't necessary for any business",
          "Because it covered only race and gender, leaving out many groups",
          "Because it mentioned far too many different groups at once",
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
            "Ignoring the differences among employees entirely",
            "Dealing sensitively with a wide range of workers and cultures",
            "Only ever hiring people who are exactly alike",
            "Avoiding having any policy about diversity at all"
          ],
          correctAnswer: 1,
          explanation: "Managing diversity means actively and sensitively handling differences among a wide range of workers and cultures.",
          concept: "diversity"
        },
        {
          id: "glo16-mx-3",
          difficulty: 0.5,
          question: "Why is Social Security discussed so much in the media today?",
          options: [
            "Because it has nothing at all to do with the economy",
            "Because an aging population will draw more money from workers",
            "Because it is a brand-new government program this year",
            "Because businesses are fully exempt from any impact of it"
          ],
          correctAnswer: 1,
          explanation: "The aging population means Social Security will require increasingly large amounts of money from current workers, making it a major ongoing topic.",
          concept: "social-security"
        },
        {
          id: "glo16-mx-4",
          difficulty: 0.0,
          question: "Which statement BEST reflects how diversity has changed as a concept over time?",
          options: [
            "It has stayed the same, since only race and gender ever mattered",
            "It has expanded to include age, disability, religion, and more",
            "It has narrowed to include fewer groups than it did before",
            "It no longer applies to modern businesses in any way"
          ],
          correctAnswer: 1,
          explanation: "The concept of diversity has broadened significantly beyond just race and gender.",
          concept: "diversity"
        },
        {
          id: "glo16-mx-5",
          difficulty: 1.0,
          question: "How does an aging population connect to businesses, not just government?",
          options: [
            "It doesn't really connect to businesses at all",
            "It affects contributions and how firms plan for retirements",
            "It only affects businesses that operate outside the country",
            "It guarantees that businesses will need far fewer employees"
          ],
          correctAnswer: 1,
          explanation: "An aging population changes worker contributions, retirement planning, and staffing decisions, all things businesses have to account for.",
          concept: "social-security"
        },
        {
          id: "glo16-mx-6",
          difficulty: 0.5,
          question: "A company assumes diversity only means hiring people of different races. What is this company most likely to overlook?",
          options: [
            "Nothing, that is a complete definition of diversity",
            "Age, disability, religion, and personality among its workers",
            "The company's overall tax rate for the year",
            "Its total sales revenue for the entire year"
          ],
          correctAnswer: 1,
          explanation: "Limiting diversity to race alone overlooks the much wider range of groups that modern diversity actually includes.",
          concept: "diversity"
        },
        {
          id: "glo16-mx-7",
          difficulty: 0.5,
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
            "Replacing retiring workers, plus higher Social Security contributions drawn from current workers",
            "Falling demand for all of its products, with zero staffing impact",
            "A brand-new government program that has replaced Social Security entirely",
            "No change to its workforce or its contributions at all"
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
      type: "micro-check",
      questions: [
        {
          id: "glo17-mc-1",
          difficulty: -1.5,
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
          difficulty: -1.0,
          question: "How does war or terrorism typically affect the tourism industry?",
          options: [
            "It usually has no real effect on the tourism industry",
            "It hurts tourism, since people avoid unstable regions",
            "It almost always increases tourism to those regions",
            "It only affects the defense industry, and never tourism"
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
        difficulty: 0.5,
        question: "Why do the defense manufacturer and the travel company react so differently to the same conflict?",
        options: [
          "Because global events affect every single business identically",
          "Because conflict raises defense demand but drives tourism down",
          "Because the travel company made a bad, unrelated decision",
          "Because only U.S. businesses are ever affected by global conflict"
        ],
        correctAnswer: 1,
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
            "Because they have almost no economic activity",
            "Because their large workforces and growing economies compete hard",
            "Because they only compete in the tourism industry",
            "Because they have no real impact on global business"
          ],
          correctAnswer: 1,
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
          difficulty: 1.5,
          question: "How does this LO connect back to the economic environment factors from LO 1-3 (enforceable contracts, stable currency, low corruption)?",
          options: [
            "It has no connection to those factors at all",
            "Prosperous, stable countries have less incentive toward conflict",
            "Enforceable contracts actually tend to cause more wars",
            "Currency stability has nothing to do with global tension"
          ],
          correctAnswer: 1,
          explanation: "A stronger economic environment in less-developed countries is tied to greater prosperity and, potentially, less instability and conflict.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-5",
          difficulty: 0.5,
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
          difficulty: 0.0,
          question: "Why do businesses need to track global events, not just domestic ones?",
          options: [
            "Because global events never actually affect U.S. businesses",
            "Because instability and foreign competition hit industries hard",
            "Because only government agencies need to track global events",
            "Because domestic events are always more important than global ones"
          ],
          correctAnswer: 1,
          explanation: "Global competition and instability have real, if uneven, effects on U.S. businesses across different industries.",
          concept: "global-challenges"
        },
        {
          id: "glo17-mx-7",
          difficulty: 0.5,
          question: "What is the key takeaway about how war and terrorism affect businesses overall?",
          options: [
            "Every single business is affected in an identical way",
            "Effects vary: defense may prosper while tourism suffers",
            "No business is ever really affected by war or terrorism",
            "Only foreign businesses are affected, and never U.S. ones"
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
      type: "micro-check",
      questions: [
        {
          id: "glo18-mc-1",
          difficulty: -1.0,
          question: "What happened to many agricultural workers as farm technology improved?",
          options: [
            "They lost their jobs permanently with nowhere else to go",
            "They were displaced by technology and moved into factory jobs",
            "Farm technology had no real effect on agricultural employment",
            "They all went on to become wealthy factory owners themselves"
          ],
          correctAnswer: 1,
          explanation: "Improved farm technology displaced many agricultural workers, who then moved into factory jobs as manufacturing grew.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mc-2",
          difficulty: -0.5,
          question: "What two factors combined to reduce the number of workers needed in manufacturing?",
          options: [
            "Lower business taxes and much less regulation",
            "Improved productivity and more foreign competition",
            "A rapidly growing domestic agricultural sector",
            "Rising Social Security costs for older workers"
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
        difficulty: 0.0,
        question: "What is the main lesson this family's history illustrates for someone heading into college and a career today?",
        options: [
          "That jobs never really change from generation to generation",
          "That jobs keep changing, so adaptability matters most of all",
          "That only farming jobs are ever displaced by new technology",
          "That college has no real connection to this historical pattern"
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
          difficulty: -0.5,
          question: "What is the general repeating pattern described in U.S. economic history?",
          options: [
            "Jobs simply never change from generation to generation",
            "Technology displaces workers, who move to a growing sector",
            "Every worker stays in the exact same job for their whole life",
            "Technology has no real effect on which jobs actually exist"
          ],
          correctAnswer: 1,
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
            "Lower business taxes on factories, all by themselves",
            "Improved manufacturing productivity plus foreign competition",
            "A sudden nationwide shortage of key raw materials",
            "A large increase in available agricultural jobs"
          ],
          correctAnswer: 1,
          explanation: "Rising manufacturing productivity and foreign competition together reduced the number of factory jobs needed, pushing workers into services.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-4",
          difficulty: 0.5,
          question: "How does the shift toward the information age relate to earlier economic shifts?",
          options: [
            "It is completely unrelated to any past economic pattern",
            "It continues the same pattern of displacement into new sectors",
            "It is the first time technology has ever changed available jobs",
            "It guarantees no future job changes will ever happen again"
          ],
          correctAnswer: 1,
          explanation: "The shift to the information age follows the same historical pattern seen with agriculture-to-factory and factory-to-service shifts.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-5",
          difficulty: -0.5,
          question: "What is the main takeaway from this repeating pattern for a student planning a future career?",
          options: [
            "That they should pick one skill and never learn anything new",
            "That adaptability matters, since available jobs keep changing",
            "That this pattern only applied in the past, never again",
            "That career planning is completely pointless given this pattern"
          ],
          correctAnswer: 1,
          explanation: "Since this displacement-and-adaptation pattern keeps repeating, staying adaptable and continuing to learn is the practical takeaway for future graduates.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-6",
          difficulty: 0.5,
          question: "A worker in a shrinking industry retrains for a role in a growing, technology-driven field. What historical pattern does this best match?",
          options: [
            "It matches no real historical pattern at all",
            "It matches displacement followed by a move to a growing sector",
            "It only applies to farm workers, not other industries",
            "It shows the historical pattern has now ended permanently"
          ],
          correctAnswer: 1,
          explanation: "This worker's experience mirrors the same historical pattern of displacement and adaptation into a growing sector.",
          concept: "historical-trends"
        },
        {
          id: "glo18-mx-7",
          difficulty: 1.0,
          question: "Which best summarizes what U.S. economic history shows about jobs over time?",
          options: [
            "Jobs have stayed completely static since the country's founding",
            "Jobs change, but the cycle of displacement keeps repeating",
            "Only farming and manufacturing have ever felt economic change",
            "Technology has never displaced any workers in all of U.S. history"
          ],
          correctAnswer: 1,
          explanation: "The specific jobs change, but the underlying cycle of displacement and adaptation into new, growing sectors is a consistent historical pattern.",
          concept: "historical-trends"
        }
      ]
    }
  ]
}
