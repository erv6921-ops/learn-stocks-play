import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// GULLIVER INTRO TO BUSINESS — BLOCK 3
// Competitive, social, global, ecological environments; evolution of US business (Byrnes Ch. 1)
// Concepts: competitive-environment, demography-diversity, aging-population, gen-z-consumers,
//           globalization, geopolitical-risk, climate-and-greening, business-evolution-eras
// Audience: 9th grade
// ═══════════════════════════════════════════════

export const block3: StructuredLessonContent = {
  lessonId: "gulliver-3",
  sections: [
    // ─────────────────────────────────────────────
    // PRE-CLASS PRIMER (~5 min read)
    // ─────────────────────────────────────────────
    {
      type: "concept",
      title: "How the U.S. Economy Grew Up: Four Eras",
      paragraphs: [
        "The kind of work most Americans do has changed completely over time, and it moved through four big eras. Knowing the order helps you understand why your job options look nothing like your great-great-grandparents' did.",
        "First came the agriculture era, when most people were farmers and the economy ran on growing food. Then the manufacturing era arrived: factories, assembly lines, and making physical products like cars and steel became the biggest source of jobs. Next was the service era, when more people started getting paid to do things for others — nursing, teaching, food, repairs, entertainment — instead of making products. Today we're in the information era, where handling knowledge and data (software, media, apps, analytics) drives a huge share of the economy.",
        "The pattern is a slow shift from growing things, to making things, to doing things for people, to working with information. Each era didn't erase the one before it — we still farm and manufacture — but the biggest share of jobs kept moving. That's why 'learn to code' and 'work with data' are common advice today, the way 'get a factory job' would have been generations ago."
      ],
      bullets: [
        "The four eras, in order: agriculture → manufacturing → service → information.",
        "Agriculture era: most people farmed.",
        "Manufacturing era: factories and making physical products led the way.",
        "Service era: paid work doing things for people (health, food, repairs) grew biggest.",
        "Information era (today): software, data, and knowledge work drive much of the economy."
      ],
      realWorldExample: "Picture one family across time: a great-great-grandparent farms, their child works a car factory, that child's kid becomes a nurse, and today's teen builds apps. Same family, four different eras of the economy."
    },
    {
      type: "concept",
      title: "The Forces Pushing on Business Today",
      paragraphs: [
        "Businesses have to react to the world around them, and several big forces are shaping decisions right now. The competitive environment is the pressure from rival companies fighting for the same customers. When two sneaker brands or two burger chains battle, they cut prices, add features, and improve service to win you over. Competition is why you get better products for less.",
        "Social forces matter too. Demography is the study of a population's traits — age, race, income, where people live — and businesses watch it closely. The U.S. is growing more diverse, so companies design products and ads for many different groups. The population is also aging: as a huge generation gets older, demand grows for healthcare, medicine, and retirement services. Meanwhile Gen Z (people born roughly the late 1990s to early 2010s — that's you) is a massive group of consumers, and businesses study your habits, values, and phones constantly because you shape what sells next.",
        "Finally, business is global and fragile in new ways. Globalization means companies buy, sell, and build across the whole world, so a phone might be designed in one country and assembled in another. That brings geopolitical risk: wars, trade fights, and tensions between countries can suddenly break supply chains and raise prices. And the ecological environment now drives decisions too — concern about climate change pushes companies toward greening, meaning cutting waste and pollution, using cleaner energy, and marketing themselves as environmentally responsible because customers increasingly expect it."
      ],
      bullets: [
        "The competitive environment is the pressure from rival companies chasing the same customers.",
        "Demography (a population's traits) is growing more diverse, changing what businesses make and how they advertise.",
        "The population is aging, raising demand for healthcare and retirement services.",
        "Gen Z is a huge group of consumers whose habits businesses study closely.",
        "Globalization spreads business worldwide but adds geopolitical risk; climate concerns push companies toward greening."
      ],
      realWorldExample: "When a global chip shortage during trade tensions made game consoles hard to find, that was geopolitical risk hitting a globalized supply chain — and when a brand switches to recyclable packaging to win over eco-conscious Gen Z shoppers, that's greening plus demography at work."
    },
    // ─────────────────────────────────────────────
    // CHECKPOINT A (3 questions) — match a decision to which environment drove it
    // ─────────────────────────────────────────────
    {
      type: "micro-check",
      questions: [
        {
          id: "g3-cpa-1",
          question: "A burger chain lowers prices and adds a new spicy sandwich right after a rival chain does the same. Which environment is driving this?",
          options: [
            "The ecological environment",
            "The competitive environment",
            "The aging population",
            "Geopolitical risk"
          ],
          correctAnswer: 1,
          explanation: "Reacting to a rival by cutting prices and adding features is the competitive environment — the pressure of companies fighting for the same customers.",
          concept: "competitive-environment"
        },
        {
          id: "g3-cpa-2",
          question: "A company starts making larger-print labels and easy-open packaging as more of its customers reach their 70s. Which force is driving this?",
          options: [
            "The aging population",
            "Globalization",
            "The competitive environment",
            "The information era"
          ],
          correctAnswer: 0,
          explanation: "Designing for older customers responds to the aging population — a demographic force raising demand for products that fit older people's needs.",
          concept: "aging-population"
        },
        {
          id: "g3-cpa-3",
          question: "A clothing brand switches to recycled fabric and advertises its lower pollution. Which environment is driving this?",
          options: [
            "Geopolitical risk",
            "The ecological environment (climate and greening)",
            "The manufacturing era",
            "The aging population"
          ],
          correctAnswer: 1,
          explanation: "Cutting pollution and promoting it is greening — a response to the ecological environment and customer concern about climate.",
          concept: "climate-and-greening"
        }
      ]
    },
    // ─────────────────────────────────────────────
    // CHECKPOINT B (3 questions) — era identification
    // ─────────────────────────────────────────────
    {
      type: "micro-check",
      questions: [
        {
          id: "g3-cpb-1",
          question: "Which is the correct order of the four eras of the U.S. economy?",
          options: [
            "Information → service → manufacturing → agriculture",
            "Manufacturing → agriculture → information → service",
            "Agriculture → manufacturing → service → information",
            "Service → information → agriculture → manufacturing"
          ],
          correctAnswer: 2,
          explanation: "The economy shifted from farming, to factories, to services, to information: agriculture → manufacturing → service → information.",
          concept: "business-evolution-eras"
        },
        {
          id: "g3-cpb-2",
          question: "An economy where most workers build cars, steel, and appliances on assembly lines is in which era?",
          options: ["Agriculture era", "Manufacturing era", "Service era", "Information era"],
          correctAnswer: 1,
          explanation: "Making physical products in factories on assembly lines defines the manufacturing era.",
          concept: "business-evolution-eras"
        },
        {
          id: "g3-cpb-3",
          question: "An economy where software, data, media, and apps drive most growth is in which era?",
          options: ["Agriculture era", "Manufacturing era", "Service era", "Information era"],
          correctAnswer: 3,
          explanation: "When knowledge, data, and technology lead the economy, that's the information era — where we are today.",
          concept: "business-evolution-eras"
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
          id: "g3-exit-1",
          question: "Why do businesses study Gen Z so closely?",
          options: [
            "Gen Z never buys anything",
            "Gen Z is a huge group of consumers whose habits and values shape what sells next",
            "Gen Z is not allowed to shop online",
            "Businesses are required by law to survey teenagers"
          ],
          correctAnswer: 1,
          explanation: "Gen Z is a large, influential group of consumers. Companies track their habits and values because they shape the products and trends of the future.",
          concept: "gen-z-consumers"
        },
        {
          id: "g3-exit-2",
          question: "A phone is designed in one country and assembled in another, so a trade fight between those countries delays shipments. This shows:",
          options: [
            "Globalization creating geopolitical risk",
            "The agriculture era returning",
            "A nonprofit mission",
            "The aging population"
          ],
          correctAnswer: 0,
          explanation: "Building products across countries is globalization, and tensions between those countries create geopolitical risk that can disrupt supply.",
          concept: "geopolitical-risk"
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
          id: "g3-prac-1",
          question: "What does the competitive environment mean for customers?",
          options: [
            "Companies stop caring about customers",
            "Rival companies push each other to offer better products, prices, or service",
            "Prices always rise no matter what",
            "Only one company is ever allowed to sell anything"
          ],
          correctAnswer: 1,
          explanation: "Competition pressures rivals to improve, which usually gives customers better products and lower prices.",
          concept: "competitive-environment"
        },
        {
          id: "g3-prac-2",
          question: "Demography is the study of:",
          options: [
            "Weather patterns over time",
            "A population's traits like age, race, income, and location",
            "How factories build products",
            "The rules governments make"
          ],
          correctAnswer: 1,
          explanation: "Demography looks at the makeup of a population — age, race, income, where people live — which businesses use to plan.",
          concept: "demography-diversity"
        },
        {
          id: "g3-prac-3",
          question: "Why does a more diverse population change how companies advertise?",
          options: [
            "It doesn't change anything",
            "Companies design products and ads for many different groups instead of just one",
            "Companies are forced to stop advertising",
            "Diversity only affects farming"
          ],
          correctAnswer: 1,
          explanation: "Growing diversity pushes businesses to reach many different groups, so products and marketing are tailored more widely.",
          concept: "demography-diversity"
        },
        {
          id: "g3-prac-4",
          question: "As a large generation grows older, which businesses are likely to see rising demand?",
          options: [
            "Healthcare, medicine, and retirement services",
            "Only video game companies",
            "Only farming equipment",
            "No businesses at all"
          ],
          correctAnswer: 0,
          explanation: "An aging population increases demand for healthcare, medications, and retirement-related services.",
          concept: "aging-population"
        },
        {
          id: "g3-prac-5",
          question: "Roughly which years describe Gen Z?",
          options: [
            "Born in the 1940s and 1950s",
            "Born roughly the late 1990s to early 2010s",
            "Born only after 2030",
            "Born in the 1800s"
          ],
          correctAnswer: 1,
          explanation: "Gen Z is generally defined as people born from about the late 1990s to the early 2010s — today's teens and young adults.",
          concept: "gen-z-consumers"
        },
        {
          id: "g3-prac-6",
          question: "Globalization means that businesses:",
          options: [
            "Only sell within their own town",
            "Buy, sell, and build across the whole world",
            "Refuse to trade with anyone",
            "Only existed in the agriculture era"
          ],
          correctAnswer: 1,
          explanation: "Globalization is business operating worldwide — sourcing, producing, and selling across many countries.",
          concept: "globalization"
        },
        {
          id: "g3-prac-7",
          question: "Which is an example of geopolitical risk hurting a business?",
          options: [
            "A store hires a new cashier",
            "A war or trade dispute between countries breaks a company's supply chain and raises prices",
            "A company designs a new logo",
            "A shop stays open an extra hour"
          ],
          correctAnswer: 1,
          explanation: "Geopolitical risk is the danger that conflicts or tensions between countries disrupt trade — breaking supply chains and raising costs.",
          concept: "geopolitical-risk"
        },
        {
          id: "g3-prac-8",
          question: "What does 'greening' mean when a company does it?",
          options: [
            "Painting its stores green",
            "Cutting waste and pollution, using cleaner energy, and promoting being eco-friendly",
            "Only selling to farmers",
            "Moving factories to bigger cities"
          ],
          correctAnswer: 1,
          explanation: "Greening is reducing environmental harm — less pollution, cleaner energy — often to meet customer expectations about climate.",
          concept: "climate-and-greening"
        },
        {
          id: "g3-prac-9",
          question: "In which era did most Americans work as farmers?",
          options: ["The information era", "The service era", "The agriculture era", "The manufacturing era"],
          correctAnswer: 2,
          explanation: "The agriculture era is when farming employed most people and the economy centered on growing food.",
          concept: "business-evolution-eras"
        },
        {
          id: "g3-prac-10",
          question: "A hospital, a repair shop, and a restaurant all mainly sell services. A booming demand for these is a sign of which era?",
          options: ["The service era", "The agriculture era", "The manufacturing era", "The information era"],
          correctAnswer: 0,
          explanation: "When paid work doing things for people (health, food, repairs) leads the economy, that's the service era.",
          concept: "business-evolution-eras"
        },
        {
          id: "g3-prac-11",
          question: "Two streaming apps keep adding new shows and lowering prices to steal each other's subscribers. This is:",
          options: [
            "Geopolitical risk",
            "The competitive environment",
            "The aging population",
            "Insourcing"
          ],
          correctAnswer: 1,
          explanation: "Rivals fighting for the same customers by improving and cutting prices is the competitive environment.",
          concept: "competitive-environment"
        },
        {
          id: "g3-prac-12",
          question: "Why might a company market its products directly around Gen Z's values, like sustainability?",
          options: [
            "Gen Z has no spending power",
            "Gen Z is a large consumer group whose values influence what becomes popular",
            "The law requires targeting one generation",
            "Values never affect what people buy"
          ],
          correctAnswer: 1,
          explanation: "Because Gen Z is a big, trend-setting group of consumers, companies align products with their values to win their business.",
          concept: "gen-z-consumers"
        },
        {
          id: "g3-prac-13",
          question: "A brand moves part of its production to another country to save money and reach new customers there. This is an example of:",
          options: ["Globalization", "The agriculture era", "A nonprofit", "Demography"],
          correctAnswer: 0,
          explanation: "Producing and selling across countries to cut costs and grow is globalization at work.",
          concept: "globalization"
        },
        {
          id: "g3-prac-14",
          question: "Which pairing correctly matches a force to a business response?",
          options: [
            "Aging population → a company adds recyclable packaging",
            "Climate concern → a company launches easier-to-open medicine bottles",
            "Climate concern (greening) → a company switches to cleaner energy and less waste",
            "Competition → a company ignores its rivals completely"
          ],
          correctAnswer: 2,
          explanation: "Greening is the direct response to climate concern: switching to cleaner energy and cutting waste. The other pairings mismatch the force and the response.",
          concept: "climate-and-greening"
        }
      ]
    }
  ]
}
