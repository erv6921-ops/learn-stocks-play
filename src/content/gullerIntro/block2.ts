import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// GULLIVER INTRO TO BUSINESS — BLOCK 2
// Entrepreneurs, factors of production, economic & tech environment (Byrnes Ch. 1)
// Concepts: entrepreneurship-tradeoffs, factors-of-production, economic-legal-environment,
//           technological-environment, e-commerce, databases, identity-theft
// Audience: 9th grade
// ═══════════════════════════════════════════════

export const block2: StructuredLessonContent = {
  lessonId: "gulliver-2",
  sections: [
    // ─────────────────────────────────────────────
    // PRE-CLASS PRIMER (~5 min read)
    // ─────────────────────────────────────────────
    {
      type: "concept",
      title: "The Five Building Blocks Every Business Needs",
      paragraphs: [
        "Before a business can sell anything, it has to gather the resources to make it. Economists sort those resources into five factors of production. Think of them as the five ingredients: get them together and you can build almost any business.",
        "The five are: land (natural resources like soil, water, oil, and the physical space itself), labor (the people who do the work), capital (the machines, tools, buildings, and equipment used to make things — not the money itself, but what the money buys), entrepreneurship (the person who takes the risk and organizes the other four), and knowledge (the information, skills, and know-how that make everything run smarter). A pizza shop needs land (the storefront), labor (the cooks), capital (the ovens), an entrepreneur (the owner who put it together), and knowledge (the recipes and the manager who knows how to run a Friday rush).",
        "Being that entrepreneur comes with trade-offs. On the good side: you're your own boss, you keep the profits, and you build something that's yours. On the hard side: no steady paycheck, long hours, and you carry the risk if it fails. That's the honest deal — freedom and upside on one hand, uncertainty and pressure on the other. People choose it when the reward is worth the trade."
      ],
      bullets: [
        "The five factors of production are land, labor, capital, entrepreneurship, and knowledge.",
        "Capital means tools, machines, and buildings — not the cash itself.",
        "Entrepreneurship is the factor that organizes and risks the other four.",
        "Knowledge (skills and information) makes the other factors more productive.",
        "Being an entrepreneur trades a steady paycheck for freedom, upside, and risk."
      ],
      realWorldExample: "A food truck shows all five: the parking spot (land), the cook (labor), the truck and grill (capital), the owner who risked their savings (entrepreneurship), and the secret sauce recipe plus knowing where the lunch crowds are (knowledge)."
    },
    {
      type: "concept",
      title: "The World a Business Has to Survive In",
      paragraphs: [
        "No business exists in a bubble. It operates inside an economic and legal environment — the taxes, laws, and rules set by the government, plus the ups and downs of the economy. These can help a business or hold it back. Low taxes, fair courts, and steady prices make it easier to start and grow a company. High taxes, confusing rules, or a shaky economy make it harder. When the government builds roads or enforces contracts, that helps business; when rules pile up or prices swing wildly, that hurts.",
        "Businesses also live inside a technological environment that changes fast. Technology lets a tiny company reach the whole world. E-commerce — buying and selling online — means a teenager can run a store from their bedroom and ship to another state. Some online businesses sell straight to shoppers (called B2C, business-to-consumer, like an online sneaker store), while others sell to other businesses (called B2B, business-to-business, like a company that supplies boxes to that sneaker store).",
        "To run all this, companies rely on databases — organized digital collections of information, like customer names, addresses, orders, and payment details. Databases are powerful, but they're also a target. When criminals break in and steal personal information, that can lead to identity theft: someone using your name, card number, or Social Security number to commit fraud. That's why protecting data — strong passwords, careful sharing, and companies guarding their databases — is now part of doing business."
      ],
      bullets: [
        "The economic and legal environment is the taxes, laws, and economic conditions a business faces.",
        "Government can help business (roads, fair courts) or hinder it (heavy taxes, confusing rules).",
        "The technological environment changes fast and lets small businesses reach the world.",
        "E-commerce is buying and selling online; B2C sells to shoppers, B2B sells to other businesses.",
        "Databases store personal information; stolen data can lead to identity theft."
      ],
      realWorldExample: "An online custom-sticker shop is pure e-commerce: it takes orders through a website, stores customer addresses in a database, and ships nationwide. If that database gets hacked, customers' info could be used for identity theft — which is why the shop needs strong security."
    },
    // ─────────────────────────────────────────────
    // CHECKPOINT A (3 questions) — classify resources into the five factors
    // ─────────────────────────────────────────────
    {
      type: "micro-check",
      questions: [
        {
          id: "g2-cpa-1",
          question: "A bakery's brick oven and mixing machines are an example of which factor of production?",
          options: ["Land", "Labor", "Capital", "Knowledge"],
          correctAnswer: 2,
          explanation: "Machines, tools, and equipment used to make things are capital. Note that capital means the equipment itself, not the money used to buy it.",
          concept: "factors-of-production"
        },
        {
          id: "g2-cpa-2",
          question: "The workers who take orders and cook the food at a restaurant represent which factor?",
          options: ["Labor", "Land", "Capital", "Entrepreneurship"],
          correctAnswer: 0,
          explanation: "Labor is the human effort and work that goes into producing goods and services.",
          concept: "factors-of-production"
        },
        {
          id: "g2-cpa-3",
          question: "The person who came up with the business idea, gathered the money, hired the staff, and took the risk represents which factor?",
          options: ["Labor", "Knowledge", "Land", "Entrepreneurship"],
          correctAnswer: 3,
          explanation: "Entrepreneurship is the factor that organizes the other four and takes on the risk of the business.",
          concept: "factors-of-production"
        }
      ]
    },
    // ─────────────────────────────────────────────
    // CHECKPOINT B (3 questions) — government actions that help or hinder business
    // ─────────────────────────────────────────────
    {
      type: "micro-check",
      questions: [
        {
          id: "g2-cpb-1",
          question: "Which government action is most likely to HELP businesses grow?",
          options: [
            "Building good roads and enforcing contracts fairly",
            "Making the rules change unpredictably every month",
            "Letting prices swing wildly with no stability",
            "Adding heavy new taxes on small startups"
          ],
          correctAnswer: 0,
          explanation: "Roads let goods move and fair courts let businesses trust deals. Stability and useful public services make it easier to run a business.",
          concept: "economic-legal-environment"
        },
        {
          id: "g2-cpb-2",
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
          id: "g2-cpb-3",
          question: "Why does the legal environment matter to an entrepreneur deciding whether to open a shop?",
          options: [
            "Laws and taxes have no effect on a business",
            "Laws, taxes, and how fairly rules are enforced shape how easy and profitable the business can be",
            "Only the weather affects a business",
            "The legal environment only matters to huge corporations"
          ],
          correctAnswer: 1,
          explanation: "The economic and legal environment — taxes, regulations, and enforcement — directly affects how easy, risky, and profitable it is to start and run any business.",
          concept: "economic-legal-environment"
        }
      ]
    },
    // ─────────────────────────────────────────────
    // EXIT TICKET (2 questions)
    // ─────────────────────────────────────────────
    {
      type: "mastery-check",
      requiredCorrect: 2,
      questions: [
        {
          id: "g2-exit-1",
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
          id: "g2-exit-2",
          question: "Which is a real TRADE-OFF of being an entrepreneur instead of an employee?",
          options: [
            "You get a guaranteed steady paycheck every week",
            "You give up a steady paycheck but gain freedom and the chance to keep the profits",
            "You have no risk at all",
            "You are not allowed to hire anyone"
          ],
          correctAnswer: 1,
          explanation: "Entrepreneurs trade the security of a steady paycheck for freedom, control, and the upside of profit — while carrying the risk if the business fails.",
          concept: "entrepreneurship-tradeoffs"
        }
      ]
    },
    // ─────────────────────────────────────────────
    // POST-CLASS PRACTICE POOL (14 questions, mixed difficulty)
    // ─────────────────────────────────────────────
    {
      type: "mastery-check",
      requiredCorrect: 10,
      questions: [
        {
          id: "g2-prac-1",
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
          id: "g2-prac-2",
          question: "In business terms, 'capital' refers to:",
          options: [
            "The cash in the owner's bank account only",
            "The tools, machines, and buildings used to produce things",
            "The city where the government meets",
            "The workers a business hires"
          ],
          correctAnswer: 1,
          explanation: "Capital is the equipment and buildings used in production — the ovens, trucks, and factories — not the money itself.",
          concept: "factors-of-production"
        },
        {
          id: "g2-prac-3",
          question: "Farmland, water, and the oil pumped from the ground all count as which factor?",
          options: ["Labor", "Land", "Capital", "Entrepreneurship"],
          correctAnswer: 1,
          explanation: "Land covers natural resources — soil, water, minerals, oil — plus the physical space itself.",
          concept: "factors-of-production"
        },
        {
          id: "g2-prac-4",
          question: "A trained chef's skill and a manager knowing exactly how to run a busy shift are examples of which factor?",
          options: ["Knowledge", "Land", "Capital", "Labor only"],
          correctAnswer: 0,
          explanation: "Knowledge is the skills, information, and know-how that make the other factors work better.",
          concept: "factors-of-production"
        },
        {
          id: "g2-prac-5",
          question: "Which is a DOWNSIDE of being an entrepreneur compared to having a regular job?",
          options: [
            "You can never keep any profit",
            "There is no steady paycheck and you carry the risk if it fails",
            "You are forced to work fewer hours",
            "You can't make any decisions yourself"
          ],
          correctAnswer: 1,
          explanation: "Entrepreneurs give up the safety of a steady paycheck and shoulder the risk — that's the trade for freedom and potential profit.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "g2-prac-6",
          question: "Which is an UPSIDE of entrepreneurship?",
          options: [
            "A guaranteed salary no matter what",
            "Being your own boss and keeping the profits",
            "Never having to work hard",
            "Zero chance of losing money"
          ],
          correctAnswer: 1,
          explanation: "Entrepreneurs get independence and keep the profits if the business succeeds — the reward side of the trade-off.",
          concept: "entrepreneurship-tradeoffs"
        },
        {
          id: "g2-prac-7",
          question: "A new law makes it cheaper and simpler to register a small business. This is an example of the government:",
          options: [
            "Hindering business",
            "Helping business through the legal environment",
            "Practicing e-commerce",
            "Committing identity theft"
          ],
          correctAnswer: 1,
          explanation: "Simpler, cheaper rules make it easier to start a company — that's the legal environment helping business.",
          concept: "economic-legal-environment"
        },
        {
          id: "g2-prac-8",
          question: "How does the technological environment change what small businesses can do?",
          options: [
            "It makes it impossible for small businesses to exist",
            "It lets even a tiny business reach customers far away and run online",
            "It only matters for banks",
            "It has no effect on business"
          ],
          correctAnswer: 1,
          explanation: "Technology lets small businesses sell online and reach distant customers — something that used to require a big company.",
          concept: "technological-environment"
        },
        {
          id: "g2-prac-9",
          question: "A company that sells cardboard boxes to other businesses (not to everyday shoppers) is doing:",
          options: ["B2C e-commerce", "B2B e-commerce", "A nonprofit mission", "Outsourcing its labor"],
          correctAnswer: 1,
          explanation: "Selling to other businesses rather than individual consumers is B2B (business-to-business).",
          concept: "e-commerce"
        },
        {
          id: "g2-prac-10",
          question: "What is a database in a business?",
          options: [
            "A physical safe full of cash",
            "An organized digital collection of information like customer names and orders",
            "A type of factory machine",
            "A government tax form"
          ],
          correctAnswer: 1,
          explanation: "A database is an organized digital store of information — customers, orders, payments — that a business uses to run.",
          concept: "databases"
        },
        {
          id: "g2-prac-11",
          question: "Why can a stolen company database lead to identity theft?",
          options: [
            "Because databases are made of paper",
            "Because criminals can use the stolen personal info to commit fraud in someone's name",
            "Because databases automatically pay people's bills",
            "Because identity theft only happens offline"
          ],
          correctAnswer: 1,
          explanation: "Databases hold personal details. If stolen, criminals can use names, card numbers, or IDs to commit fraud — that's identity theft.",
          concept: "identity-theft"
        },
        {
          id: "g2-prac-12",
          question: "Which habit best helps protect against identity theft?",
          options: [
            "Reusing the same simple password everywhere",
            "Using strong passwords and being careful about sharing personal info",
            "Posting your Social Security number online",
            "Ignoring how companies store your data"
          ],
          correctAnswer: 1,
          explanation: "Strong, unique passwords and being careful with personal information make it much harder for criminals to steal your identity.",
          concept: "identity-theft"
        },
        {
          id: "g2-prac-13",
          question: "E-commerce is best described as:",
          options: [
            "Selling only inside a physical store",
            "Buying and selling goods or services over the internet",
            "A type of factor of production",
            "A government tax"
          ],
          correctAnswer: 1,
          explanation: "E-commerce is trade done online — buying and selling over the internet rather than only in a physical store.",
          concept: "e-commerce"
        },
        {
          id: "g2-prac-14",
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
    }
  ]
}
