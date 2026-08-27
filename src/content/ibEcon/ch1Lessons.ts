import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// IB ECONOMICS · UNIT 1 · INTRODUCTION TO ECONOMICS
// Standalone content track, separate from src/content/gullerIntro.
// One StructuredLessonContent per lesson, following the
// concept → micro-check → scenario → applied-question → recap → mastery-check
// pattern used by the Gulliver LO lessons. Key vocabulary is wrapped in **…** so
// the existing HighlightedText component (src/lib/highlightTerms.tsx) renders it
// as a bold green "Jeff explains" highlight in the concept reader and Jeff chat.
//
// NOTE (difficulty): every QuizQuestion below intentionally leaves `difficulty`
// UNSET, matching how the Gulliver LOs were left pending a separate
// difficulty-tagging pass. Do not add difficulty values here yet.
//
// NOTE (term highlighting): the app already ships a single-state highlighter —
// **term** → bold GREEN (text-success), the "explained" state. The textbook
// source distinguishes an orange "seen-but-not-yet-explained" state that turns
// green once Jeff explains it. That two-state (orange → green) behavior is NOT
// implemented and needs a small component decision from the product owner before
// wiring up visually. See the TODO in the summary. Until then, every vocab term
// simply renders green via the existing **…** convention.
// ═══════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// IB-ECON-1-1: The Foundations of Economics
// Micro vs macro · economics as a social science · the 9 key concepts ·
// factors of production · opportunity cost · free vs economic goods.
// ─────────────────────────────────────────────────────────────
export const ibEcon1_1: StructuredLessonContent = {
  lessonId: "ib-econ-1-1",
  sections: [
    {
      type: "concept",
      title: "Micro vs. Macro: Microscope vs. Telescope",
      paragraphs: [
        "Economics splits into two big lenses, and knowing which one you're looking through is the first skill in the whole course. **Microeconomics** is the study of individual decision-makers — consumers and households on one side, firms and businesses on the other. It zooms in on how those players behave, what they choose, how they interact in specific markets, and how the price of any one thing gets determined. When you ask 'why did coffee get more expensive?' or 'how does this one company decide how many workers to hire?', you're doing microeconomics.",
        "**Macroeconomics** pulls way back and studies the economy as a whole. Instead of the price of one good, it looks at aggregates — the totals: total output produced by a country, total employment (and unemployment), and the overall price level across everything. Questions like 'is the whole country growing or shrinking?', 'why are prices rising everywhere at once?', and 'why can't people find jobs?' are macroeconomics.",
        "Jeff's way to keep them straight: **microeconomics is a microscope** pointed at one household or one business, studying it up close. **Macroeconomics is a telescope** pointed at the entire economy, taking in the whole picture at once. Same universe, very different magnification. Both matter, and they're deeply connected — but on any given question you're usually reaching for one lens or the other."
      ],
      bullets: [
        "Microeconomics = individual decision-makers: consumers/households and firms/businesses, and how single prices form.",
        "Macroeconomics = the whole economy using aggregates: total output, total employment, the overall price level.",
        "Micro = microscope on one household/business. Macro = telescope on the entire economy.",
        "The trick to classifying a question: is it about one market/player, or about totals across the whole economy?"
      ],
      realWorldExample: "\"Why did the price of eggs at my local store double?\" is microeconomics — one good, one market. \"Why did the cost of almost everything rise 8% across the country last year?\" is macroeconomics — the overall price level across the whole economy."
    },
    {
      type: "concept",
      title: "Economics Is a Social Science",
      paragraphs: [
        "Economics isn't just charts and money — it's a **social science**. A social science studies human society and human behavior. Economics specifically studies how people organize their activities and behave in order to satisfy their **needs and wants**. That puts it in the same family as sociology, psychology, and political science: all of them study people and society.",
        "What makes it a *science* is the method. Economists don't just guess; they observe the world, build simplified models, form hypotheses about how people will behave, and test those ideas against real evidence — the same scientific method a chemist or biologist uses, just applied to human choices instead of atoms or cells. Because it studies unpredictable humans, its 'lab' is messier than a chemistry lab, but the discipline of observe → theorize → test is the same."
      ],
      bullets: [
        "A social science studies human society and behavior; economics studies how people act to satisfy needs and wants.",
        "It sits alongside sociology, psychology, and political science as a study of people and society.",
        "It's a *science* because it uses the scientific method: observe, model, hypothesize, and test against evidence."
      ]
    },
    {
      type: "concept",
      title: "The 9 Key Concepts of the Course",
      paragraphs: [
        "This whole course is built around nine ideas that come back again and again. Learn them now and everything later clicks faster. Here they are, each in a sentence or two.",
        "These nine will show up in almost every unit — in supply and demand, in government policy, in trade, in the environment. Treat them as the vocabulary of the entire course, not just this lesson."
      ],
      bullets: [
        "**Scarcity**: resources are insufficient to satisfy unlimited human needs and wants. This is the root problem of all economics.",
        "**Choice**: because resources are scarce, every decision-maker must choose between competing alternatives — you can't have it all.",
        "**Efficiency**: making the best possible use of scarce resources without waste. **Allocative efficiency** means using resources in the way that best satisfies society's needs and wants.",
        "**Equity**: fairness or justice in how outcomes and income are distributed. Important: equity means *fair*, which is not the same as *equal*.",
        "**Economic well-being**: prosperity and standard of living — income and wealth security, the ability to pursue your goals, quality of life, and being able to sustain all of that over time.",
        "**Sustainability**: the ability of the present generation to meet its needs without compromising future generations' ability to meet theirs.",
        "**Change**: economic conditions and relationships are constantly shifting; economists study the change between one situation and another caused by shifts in variables.",
        "**Interdependence**: decision-makers — individuals, firms, governments, nations — depend on and interact with one another. Nobody is fully self-sufficient.",
        "**Intervention**: government stepping into markets to fix problems markets create on their own — issues of equity, sustainability, well-being, or efficiency."
      ]
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "ie11-mc-1",
          question: "A researcher studies why one coffee shop raised its latte price and how its regular customers responded. Which lens is this?",
          options: [
            "Macroeconomics, because coffee is sold everywhere",
            "Microeconomics, because it's one business and one market",
            "It's not economics at all",
            "Both equally, because all prices affect the whole economy"
          ],
          correctAnswer: 1,
          explanation: "One business, one product, one market, individual customers responding — that's the microscope. Microeconomics studies individual decision-makers and single-market prices.",
          concept: "micro-vs-macro"
        },
        {
          id: "ie11-mc-2",
          question: "Which statement best captures why economics counts as a social science?",
          options: [
            "It only uses graphs and never studies people",
            "It studies human behavior and society using the scientific method",
            "It is a branch of physics that measures money",
            "It avoids evidence and relies purely on opinion"
          ],
          correctAnswer: 1,
          explanation: "A social science studies human society and behavior. Economics does exactly that — how people act to satisfy needs and wants — using the observe/model/test scientific method.",
          concept: "social-science"
        },
        {
          id: "ie11-mc-3",
          question: "\"Fairness in how income is distributed, which is not the same as everyone getting an equal amount.\" Which key concept is this?",
          options: ["Efficiency", "Equity", "Scarcity", "Interdependence"],
          correctAnswer: 1,
          explanation: "Equity is about fairness/justice in outcomes. The classic trap is confusing it with equality — equity can be fair without being equal.",
          concept: "nine-concepts"
        }
      ]
    },
    {
      type: "concept",
      title: "The Fundamental Problem & the Four Factors of Production",
      paragraphs: [
        "Everything in economics grows from one mismatch: human wants are unlimited, but the resources to satisfy them are limited. That mismatch is **scarcity**, and scarcity forces **choice**. The limited resources we use to produce goods and services have a name: the **factors of production**. There are four of them.",
        "**Land** is all natural resources — the 'gifts of nature.' That's agricultural and non-agricultural land, plus minerals, oil, forests, rivers, and lakes. **Labour** is the physical and mental effort people contribute to producing goods and services. **Capital** — more precisely **physical capital** — is the man-made, produced inputs used to make other things: machinery, tools, factories, buildings, and infrastructure. Because it's produced in order to produce more, it's also called an investment good. **Entrepreneurship** is the special skill of innovating, taking on business risk, and organizing the other three factors into a working business.",
        "The word 'capital' also gets used in a few broader ways worth knowing. **Human capital** is the skills, knowledge, and health of workers. **Natural capital** is an expanded view of 'land' that includes air, biodiversity, soil, and climate. **Financial capital** is money and investments — stocks and bonds — that fund future production. Watch the context: 'capital' on its own in production usually means physical capital, but these cousins show up throughout the course."
      ],
      bullets: [
        "Unlimited wants + limited resources = **scarcity**, which forces **choice**.",
        "**Land** — natural resources / gifts of nature (soil, minerals, oil, forests, water).",
        "**Labour** — the physical and mental effort of people.",
        "**Capital** (**physical capital**) — man-made produced inputs: machines, tools, factories, infrastructure; an investment good.",
        "**Entrepreneurship** — innovating, bearing risk, and organizing the other three factors.",
        "Other 'capitals': **human capital** (skills/knowledge/health), **natural capital** (air, soil, biodiversity, climate), **financial capital** (money, stocks, bonds)."
      ],
      realWorldExample: "A bakery uses all four factors: the plot of land it sits on (land), the bakers (labour), the ovens and mixers (physical capital), and the founder who risked her savings and organized it all (entrepreneurship). Her trained bakers also represent human capital, and the loan that bought the ovens was financial capital."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "ie11-mc-4",
          question: "A factory's industrial ovens and assembly-line robots are an example of which factor of production?",
          options: ["Land", "Labour", "Capital (physical capital)", "Entrepreneurship"],
          correctAnswer: 2,
          explanation: "Machines, tools, and factories are man-made, produced inputs used to make other goods — that's physical capital, an investment good.",
          concept: "factors-of-production"
        },
        {
          id: "ie11-mc-5",
          question: "Which of these is best classified as 'land' in economics?",
          options: [
            "A delivery driver's effort",
            "A crude-oil deposit under the ground",
            "A bank loan used to expand",
            "A founder's decision to take a risk"
          ],
          correctAnswer: 1,
          explanation: "Land means all natural resources — the gifts of nature — which includes oil, minerals, forests, and water, not just literal ground.",
          concept: "factors-of-production"
        }
      ]
    },
    {
      type: "concept",
      title: "Opportunity Cost, Free Goods & Economic Goods",
      paragraphs: [
        "Because resources are scarce, every choice means giving something up. The **opportunity cost** of a decision is the value of the *next-best alternative* you gave up to make it. Note the wording: not everything you passed on, just the single best thing you sacrificed. Time counts too — spend two hours gaming and the opportunity cost is whatever the best thing you *could* have done with those two hours was. Every choice has an opportunity cost, because if something were truly unlimited you wouldn't have to choose.",
        "That leads to a useful split. A **free good** is not scarce and has *zero* opportunity cost — using it costs you no alternative. Classic example: clean, unpolluted air in an empty area; breathing it takes nothing away from anyone. An **economic good** is scarce and has a *positive* opportunity cost. It's either a naturally scarce resource (oil, gold) or something produced using scarce resources (a phone, a haircut).",
        "One subtlety: the same thing can be a free good in one context and an economic good in another. Land in an empty, unpopulated region might be free — nobody's competing for it. Once people move in and start competing to use it, it becomes scarce, gains a positive opportunity cost, and turns into an economic good. Context decides."
      ],
      bullets: [
        "**Opportunity cost** = the value of the *next-best alternative* given up — not everything forgone, just the single best sacrifice.",
        "Time is a scarce resource too, so time-choices carry opportunity cost.",
        "**Free good**: not scarce, zero opportunity cost (e.g., clean air in an empty area).",
        "**Economic good**: scarce, positive opportunity cost — a naturally scarce resource or something produced with scarce resources.",
        "The same good can be free in one context and economic in another (empty land vs. populated land)."
      ]
    },
    {
      type: "scenario",
      title: "Priya's Saturday",
      narrative: "Priya has one free Saturday. She can (A) work a shift for $80, (B) study for a test she thinks is worth about $60 of value to her, or (C) go to a concert she'd value at $100. She can only do one. She picks the concert.",
      details: [
        "Because her time is scarce, choosing the concert forces her to give up the other options — that's choice driven by scarcity.",
        "Her opportunity cost is the value of the single next-best alternative she gave up: the $80 work shift, not $80 + $60 combined.",
        "The concert ticket and the shift and the study time are all economic goods — each is scarce and carries a positive opportunity cost.",
        "If instead she'd spent the day breathing clean air in an empty park, that air would be a free good — enjoying it took no alternative away from anyone."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "ie11-aq-1",
        question: "Priya values the concert at $100, the work shift at $80, and studying at $60, and can do only one. She chooses the concert. What is her opportunity cost?",
        options: [
          "$140 — the shift plus studying combined",
          "$80 — the value of the next-best alternative (the shift)",
          "$100 — the value of the concert she chose",
          "$0 — she enjoyed her choice, so nothing was lost"
        ],
        correctAnswer: 1,
        explanation: "Opportunity cost is the value of the single next-best alternative given up. The best option she passed on was the $80 shift (worth more to her than the $60 of studying), so her opportunity cost is $80 — not the sum of everything forgone.",
        concept: "opportunity-cost"
      }
    },
    {
      type: "recap",
      takeaways: [
        "Micro = microscope on individual decision-makers and single prices; macro = telescope on the whole economy using aggregates (output, employment, price level).",
        "Economics is a social science: it studies human behavior to satisfy needs/wants using the scientific method.",
        "The 9 key concepts — scarcity, choice, efficiency, equity, economic well-being, sustainability, change, interdependence, intervention — frame the entire course.",
        "Unlimited wants + limited resources = scarcity → choice. The four factors of production are land, labour, capital (physical capital), and entrepreneurship.",
        "Opportunity cost = value of the next-best alternative given up. Free goods are not scarce (zero opportunity cost); economic goods are scarce (positive opportunity cost)."
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 5,
      questions: [
        {
          id: "ie11-mx-1",
          question: "Which question is a macroeconomics question?",
          options: [
            "How does one bakery decide how many loaves to bake?",
            "Why did the country's overall unemployment rate rise this year?",
            "Why did the price of one brand of sneakers increase?",
            "How does a single family budget its grocery money?"
          ],
          correctAnswer: 1,
          explanation: "Nationwide unemployment is an aggregate for the whole economy — the telescope view. The others each zoom in on one player or one market (micro).",
          concept: "micro-vs-macro"
        },
        {
          id: "ie11-mx-2",
          question: "Economics is best described as…",
          options: [
            "a natural science like chemistry that studies matter",
            "a social science that studies human behavior to satisfy needs and wants",
            "a branch of pure mathematics",
            "an art with no method or evidence"
          ],
          correctAnswer: 1,
          explanation: "It's a social science — it studies people and society (how they act to satisfy needs and wants) using the scientific method.",
          concept: "social-science"
        },
        {
          id: "ie11-mx-3",
          question: "\"The present generation meets its needs without compromising future generations' ability to meet theirs.\" Which key concept is this?",
          options: ["Sustainability", "Efficiency", "Equity", "Interdependence"],
          correctAnswer: 0,
          explanation: "That's the definition of sustainability — meeting today's needs without robbing the future.",
          concept: "nine-concepts"
        },
        {
          id: "ie11-mx-4",
          question: "Using scarce resources in the way that best satisfies society's needs and wants is called…",
          options: ["equity", "allocative efficiency", "interdependence", "scarcity"],
          correctAnswer: 1,
          explanation: "Allocative efficiency is directing resources to the uses that best satisfy society — a specific form of efficiency.",
          concept: "nine-concepts"
        },
        {
          id: "ie11-mx-5",
          question: "A small business owner innovates, takes on the financial risk, and organizes the workers, machines, and materials. Which factor of production is she providing?",
          options: ["Labour", "Land", "Entrepreneurship", "Capital"],
          correctAnswer: 2,
          explanation: "Innovating, bearing risk, and organizing the other three factors is the definition of entrepreneurship.",
          concept: "factors-of-production"
        },
        {
          id: "ie11-mx-6",
          question: "Which is an example of physical capital?",
          options: [
            "A forest of oak trees",
            "A conveyor belt in a warehouse",
            "The skills a nurse has learned",
            "Shares of stock a firm owns"
          ],
          correctAnswer: 1,
          explanation: "Physical capital is man-made produced inputs used to make other goods — a conveyor belt fits. The forest is land, the nurse's skills are human capital, and the shares are financial capital.",
          concept: "factors-of-production"
        },
        {
          id: "ie11-mx-7",
          question: "You choose to spend Sunday hiking (value $50) instead of your two next-best options: a paid shift ($40) and cleaning your room ($15). What's the opportunity cost of hiking?",
          options: ["$55", "$40", "$50", "$105"],
          correctAnswer: 1,
          explanation: "Opportunity cost is the value of the single next-best alternative given up. The best forgone option was the $40 shift — not the sum of the shift and the cleaning.",
          concept: "opportunity-cost"
        },
        {
          id: "ie11-mx-8",
          question: "Which best describes a free good?",
          options: [
            "Any good the government gives away for a low price",
            "A good that is not scarce and has zero opportunity cost",
            "A scarce good that is produced very cheaply",
            "Any good sold in a competitive market"
          ],
          correctAnswer: 1,
          explanation: "A free good is not scarce and carries zero opportunity cost — using it takes no alternative away (e.g., clean air in an empty area). 'Free' here means no opportunity cost, not a low price.",
          concept: "free-vs-economic-goods"
        },
        {
          id: "ie11-mx-9",
          question: "Why can the same land be a free good in one situation and an economic good in another?",
          options: [
            "Because the government changes its official price",
            "Because once people compete to use it, it becomes scarce and gains a positive opportunity cost",
            "Because land is always a free good no matter what",
            "Because economic goods can never come from nature"
          ],
          correctAnswer: 1,
          explanation: "In an empty region land may be non-scarce (free good). Once people move in and compete for it, it becomes scarce with a positive opportunity cost — an economic good. Context decides.",
          concept: "free-vs-economic-goods"
        },
        {
          id: "ie11-mx-10",
          question: "Which pairing correctly matches a key concept to its meaning?",
          options: [
            "Interdependence — resources are insufficient for unlimited wants",
            "Intervention — government acting in markets to fix problems markets create",
            "Change — fairness in the distribution of income",
            "Choice — the economy as a whole measured in aggregates"
          ],
          correctAnswer: 1,
          explanation: "Intervention is government stepping into markets to address equity, sustainability, well-being, or efficiency problems. The others are mismatched (that's scarcity, equity, and macro respectively).",
          concept: "nine-concepts"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// IB-ECON-1-2: The Three Basic Economic Questions & Economic Systems
// ─────────────────────────────────────────────────────────────
export const ibEcon1_2: StructuredLessonContent = {
  lessonId: "ib-econ-1-2",
  sections: [
    {
      type: "concept",
      title: "The Three Questions Every Economy Must Answer",
      paragraphs: [
        "Because resources are scarce, every society — rich or poor, ancient or modern — has to answer the same three basic economic questions. There's no skipping them.",
        "First: **what and how much to produce?** With limited resources you can't make everything, so society must decide the mix — more hospitals or more highways, more food or more phones. Second: **how to produce it?** Which combination of factors of production and which technology — lots of workers and simple tools, or few workers and advanced machines? Third: **for whom to produce?** Once goods exist, who actually gets them — that is, how is output and income distributed among people?",
        "Economists group these. The 'what/how much' and 'how' questions are **resource allocation** questions — they're about *directing scarce resources* into particular uses. The 'for whom' question is the **distribution of income** (or distribution of output) question — it's about *who ends up with the results*. Keep that split straight: allocation is about steering resources into production; distribution is about sharing out what gets produced."
      ],
      bullets: [
        "Every economy must answer three questions: **what/how much** to produce, **how** to produce, and **for whom** to produce.",
        "**What/how much** + **how** = **resource allocation** (steering scarce resources into uses).",
        "**For whom** = **distribution of income** / distribution of output (who ends up with the results).",
        "The questions exist because resources are scarce — you can't produce everything for everyone."
      ],
      realWorldExample: "A country deciding to build more wind farms than coal plants is answering 'what to produce.' Choosing robots over manual labour to build them answers 'how.' Deciding whether the cheap electricity flows to households, factories, or exports answers 'for whom' — a distribution question."
    },
    {
      type: "concept",
      title: "Reallocation, Overallocation & Underallocation",
      paragraphs: [
        "Because society keeps re-answering 'what to produce,' resources get shifted around. **Reallocation** is shifting resources to change the mix of goods produced — moving workers, land, and capital out of one use and into another (say, out of making DVDs and into making streaming servers).",
        "Sometimes the market gets the amount wrong compared to what's best for society. **Overallocation** means too much of a good is being produced relative to what's socially desirable — society would be better off with less of it and more of something else. **Underallocation** means too little of a good is being produced relative to what's socially desirable. The classic examples of underallocation are education and healthcare: left entirely to the market, societies tend to get *less* of these than is good for everyone, which is a major reason governments step in to boost them."
      ],
      bullets: [
        "**Reallocation** — shifting resources to change the mix of goods produced.",
        "**Overallocation** — too much of a good is produced relative to what's socially desirable.",
        "**Underallocation** — too little of a good is produced relative to what's socially desirable.",
        "Education and healthcare are classic underallocated goods — a common trigger for government intervention."
      ]
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "ie12-mc-1",
          question: "A government debates whether to devote next year's steel to building schools or building tanks. Which basic economic question is this?",
          options: [
            "For whom to produce",
            "What and how much to produce",
            "How to produce",
            "None — this isn't an economic question"
          ],
          correctAnswer: 1,
          explanation: "Choosing the mix of goods (schools vs. tanks) is the 'what and how much to produce' question — a resource allocation question.",
          concept: "three-questions"
        },
        {
          id: "ie12-mc-2",
          question: "\"Left to the market alone, society gets less education than is good for everyone.\" This is an example of…",
          options: ["overallocation", "underallocation", "reallocation", "distribution of income"],
          correctAnswer: 1,
          explanation: "Too little of a socially desirable good (education) is being produced — that's underallocation, a classic reason for government intervention.",
          concept: "over-under-allocation"
        }
      ]
    },
    {
      type: "concept",
      title: "Two Ways to Decide: Market Method vs. Command Method",
      paragraphs: [
        "There are two fundamentally different ways to answer the three questions. The **market method** lets private individuals and firms own the resources and make the decisions by responding to **prices**. Nobody's in charge — high prices signal 'make more of this,' low prices signal 'make less,' and millions of separate choices add up to the answers. The **command method** puts the government in charge: it owns the resources (especially land and capital) and decides through **legislation and regulation** — commands, plans, and rules — rather than prices.",
        "Here's the key reality check: no real economy is 100% one or the other. Every actual economy is a mix; it just *leans* more market-oriented or more command-oriented. And over roughly the last 40 years the global trend has been a shift toward relying more on markets. So when you classify a country, you're placing it on a spectrum, not into a pure box."
      ],
      bullets: [
        "**Market method** — private ownership; decisions made by responding to **prices**; no central planner.",
        "**Command method** — government ownership (especially land & capital); decisions made through legislation/regulation.",
        "No economy is purely one or the other — every real economy is mixed, leaning one way or the other.",
        "The global trend over ~40 years has been toward greater reliance on markets."
      ]
    },
    {
      type: "concept",
      title: "Free Market, Planned & Mixed Economies — 3 Criteria",
      paragraphs: [
        "We compare economic systems on three criteria: resource ownership, decision-making, and the rationing system. A **free market economy** sits at one extreme: resources are owned by the **private sector**, private decision-makers make the choices, and goods and resources are rationed by **price rationing** — prices set in markets decide who gets what. A **planned economy** (also called a command economy) sits at the other extreme: resources are owned by the **public sector**/government, the government makes the decisions, and rationing is done by **non-price rationing** — commands, quotas, queues, and rules rather than prices.",
        "Rationing just means 'a way of deciding who gets scarce things.' **Price rationing** does it with prices: if you're willing and able to pay the price, it's yours; if not, it isn't. **Non-price rationing** does it without prices: first-come-first-served queues, ration coupons, government allocation, waiting lists. Both are answers to 'for whom?' — they just use different mechanisms.",
        "A **mixed economy** combines both: some public and some private ownership and decision-making, and both price and non-price rationing operating side by side. This is where virtually every real country actually lives — which is exactly why the next section matters."
      ],
      bullets: [
        "Three comparison criteria: **resource ownership**, **decision-making**, and **rationing system**.",
        "**Free market**: private-sector ownership, private decisions, **price rationing**.",
        "**Planned**: public-sector/government ownership, government decisions, **non-price rationing**.",
        "**Mixed**: a combination of public + private ownership/decisions and price + non-price rationing.",
        "**Rationing** = how scarce things are shared out; price rationing uses prices, non-price rationing uses queues/commands/coupons."
      ],
      realWorldExample: "Buying a concert ticket that sells out by price — highest bidders get in — is price rationing. Getting a hospital surgery by waiting your turn on a months-long list, regardless of what you'd pay, is non-price rationing. Most countries use both, in different sectors."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "ie12-mc-3",
          question: "In a pure free market economy, who owns the resources and how are goods rationed?",
          options: [
            "The government owns them; goods are rationed by queues and commands",
            "The private sector owns them; goods are rationed by prices",
            "The public sector owns them; goods are rationed by prices",
            "Nobody owns them; goods are handed out equally"
          ],
          correctAnswer: 1,
          explanation: "A free market economy features private-sector ownership and price rationing — prices in markets decide who gets what.",
          concept: "economic-systems"
        },
        {
          id: "ie12-mc-4",
          question: "Patients receive surgery based on a months-long waiting list rather than who pays the most. This is…",
          options: ["price rationing", "non-price rationing", "reallocation", "private ownership"],
          correctAnswer: 1,
          explanation: "Deciding who gets a scarce good by queue/waiting list instead of by price is non-price rationing — typical of the command side of a system.",
          concept: "rationing"
        }
      ]
    },
    {
      type: "concept",
      title: "Why Real Economies Are Mixed",
      paragraphs: [
        "Even the most market-friendly country still has heavy government involvement, and even the most centrally planned one still has some markets. In practice, governments in mixed economies do things like: run public education and public health care, maintain public parks and road systems, provide national defense, set minimum wage laws, place import restrictions, enforce anti-monopoly law, collect taxes, and carry out **income redistribution** (taking via taxes and giving via benefits to make the distribution of income fairer).",
        "Why intervene at all? Two schools of thought pull in opposite directions. One says markets work reasonably well on their own, so government intervention should be minimal — stay out of the way. The other says market imperfections (like underallocated education, pollution, or monopolies) are significant enough that intervention is necessary to correct them. Real-world policy almost never sits at either pure extreme; it lands somewhere in between, which is precisely why every actual economy is a mixed economy."
      ],
      bullets: [
        "Typical interventions: public education/health, parks, roads, national defense, minimum wage, import restrictions, anti-monopoly law, taxes, income redistribution.",
        "**Redistribution of income** — using taxes and benefits to make the distribution of income fairer.",
        "School of thought #1: markets mostly work → keep intervention minimal.",
        "School of thought #2: market imperfections are serious → intervention is necessary to correct them.",
        "Real policy sits between the extremes, so virtually every economy is mixed."
      ]
    },
    {
      type: "scenario",
      title: "Two Countries, One Spectrum",
      narrative: "Country A lets private firms own almost everything and sets prices in open markets, but still funds public schools, a national defense force, and unemployment benefits paid for by taxes. Country B has the government own most heavy industry and set production targets by plan, but allows small private farmers' markets where prices float freely.",
      details: [
        "Country A leans market-oriented (private ownership, price rationing dominate) but is still mixed — public schooling, defense, and tax-funded benefits are command-side elements.",
        "Country B leans command-oriented (government ownership, planning dominate) but is still mixed — the private farmers' markets use price rationing.",
        "Neither is a pure system; both are mixed economies at different points on the same spectrum.",
        "Country A's unemployment benefits are income redistribution — taxes in, transfers out, to make the income distribution fairer."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "ie12-aq-1",
        question: "Country A relies mostly on private ownership and market prices, yet runs tax-funded public schools and defense. How should it be classified?",
        options: [
          "A pure free market economy, because prices dominate",
          "A pure planned economy, because the government does anything at all",
          "A mixed economy that leans market-oriented",
          "Not an economy, because it uses two methods at once"
        ],
        correctAnswer: 2,
        explanation: "Any real economy that combines private and public ownership and both price and non-price rationing is mixed. Because markets and prices dominate here, it's a mixed economy leaning market-oriented — not a pure system.",
        concept: "economic-systems"
      }
    },
    {
      type: "recap",
      takeaways: [
        "Every economy must answer three questions: what/how much, how, and for whom to produce.",
        "What/how much + how = resource allocation; for whom = distribution of income/output.",
        "Reallocation shifts the production mix; overallocation = too much of a good, underallocation = too little (e.g., education, healthcare).",
        "Market method = private ownership + price signals; command method = government ownership + legislation/regulation.",
        "Systems compare on ownership, decision-making, and rationing: free market (private, price) vs. planned (public, non-price) vs. mixed (both). Virtually all real economies are mixed."
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 5,
      questions: [
        {
          id: "ie12-mx-1",
          question: "Deciding whether new factory output should be built using many workers or mostly automated machinery answers which basic question?",
          options: ["What to produce", "How to produce", "For whom to produce", "Whether scarcity exists"],
          correctAnswer: 1,
          explanation: "Choosing the combination of factors/technology (labour vs. machines) is the 'how to produce' question.",
          concept: "three-questions"
        },
        {
          id: "ie12-mx-2",
          question: "The 'for whom to produce' question is really about…",
          options: [
            "resource allocation into different industries",
            "the distribution of output and income among people",
            "which technology to use",
            "whether wants are unlimited"
          ],
          correctAnswer: 1,
          explanation: "'For whom' is the distribution-of-output/income question — who ends up with what gets produced.",
          concept: "three-questions"
        },
        {
          id: "ie12-mx-3",
          question: "A city shifts land and workers away from a shrinking coal industry toward a growing solar industry. This is best called…",
          options: ["overallocation", "underallocation", "reallocation", "redistribution"],
          correctAnswer: 2,
          explanation: "Shifting resources to change the mix of goods produced is reallocation.",
          concept: "over-under-allocation"
        },
        {
          id: "ie12-mx-4",
          question: "Which is the clearest example of the command method of allocation?",
          options: [
            "Prices rise, so firms choose to produce more solar panels",
            "The government legislates production targets and owns the factories",
            "Consumers bid up the price of concert tickets",
            "A shop lowers prices to clear unsold stock"
          ],
          correctAnswer: 1,
          explanation: "The command method means government ownership and decisions via legislation/regulation — production targets and state-owned factories. The others are price-driven market outcomes.",
          concept: "economic-systems"
        },
        {
          id: "ie12-mx-5",
          question: "In a pure planned economy, the rationing system is best described as…",
          options: [
            "price rationing set in open markets",
            "non-price rationing via commands, quotas, and queues",
            "no rationing at all, since there's no scarcity",
            "rationing only by auction to the highest bidder"
          ],
          correctAnswer: 1,
          explanation: "A planned economy uses non-price rationing — commands, quotas, and queues decide who gets scarce goods, not market prices.",
          concept: "rationing"
        },
        {
          id: "ie12-mx-6",
          question: "Which trio correctly describes a pure free market economy across the three criteria?",
          options: [
            "Public ownership · government decisions · non-price rationing",
            "Private ownership · private decisions · price rationing",
            "Private ownership · government decisions · non-price rationing",
            "Public ownership · private decisions · price rationing"
          ],
          correctAnswer: 1,
          explanation: "Free market = private-sector ownership, private decision-making, and price rationing across all three criteria.",
          concept: "economic-systems"
        },
        {
          id: "ie12-mx-7",
          question: "A country has state-owned railways and public hospitals alongside privately owned shops and market-set prices. It is a…",
          options: [
            "pure free market economy",
            "pure planned economy",
            "mixed economy",
            "non-economy"
          ],
          correctAnswer: 2,
          explanation: "Combining public and private ownership with both price and non-price rationing makes it a mixed economy — where virtually all real countries sit.",
          concept: "economic-systems"
        },
        {
          id: "ie12-mx-8",
          question: "Which is an example of price rationing?",
          options: [
            "Waiting in line overnight for a limited release",
            "Receiving fuel only with a government-issued coupon",
            "A scarce product going to whoever is willing and able to pay its market price",
            "Being assigned an apartment by a housing ministry"
          ],
          correctAnswer: 2,
          explanation: "Price rationing allocates a scarce good to those willing and able to pay the market price. The other three are non-price rationing (queues, coupons, government assignment).",
          concept: "rationing"
        },
        {
          id: "ie12-mx-9",
          question: "Taxing higher earners and paying benefits to lower earners to make the income distribution fairer is called…",
          options: ["reallocation of resources", "redistribution of income", "price rationing", "overallocation"],
          correctAnswer: 1,
          explanation: "Moving income from some groups to others via taxes and benefits is redistribution of income — a common government intervention in mixed economies.",
          concept: "intervention"
        },
        {
          id: "ie12-mx-10",
          question: "Which statement reflects the 'markets work reasonably well' school of thought?",
          options: [
            "Government should own all major industries",
            "Government intervention should be kept minimal because markets mostly self-correct",
            "Prices should be set by central planners",
            "All goods should be rationed by queues"
          ],
          correctAnswer: 1,
          explanation: "That school holds markets largely work on their own, so intervention should be minimal — the opposite view stresses correcting significant market imperfections.",
          concept: "intervention"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// IB-ECON-1-3: Modeling the Economy — PPC & Circular Flow
// ─────────────────────────────────────────────────────────────
export const ibEcon1_3: StructuredLessonContent = {
  lessonId: "ib-econ-1-3",
  sections: [
    {
      type: "concept",
      title: "What Is a Model — and Why Economists Love Them",
      paragraphs: [
        "Economists constantly use **models**. A model is a simplified representation of something real: it keeps only what matters and strips out the unnecessary detail so you can focus on the key relationships. A paper airplane is a model of a real plane — it ignores engines, seats, and wiring, but it still captures the one thing you're studying (how a wing generates lift as it moves through air).",
        "Economic reality is impossibly complex — billions of people making trillions of choices. If a model tried to include everything, it would be as confusing as reality itself and useless for learning anything. So economists deliberately simplify. Two of the most important models in the whole course are the **production possibilities curve** and the **circular flow of income**. This lesson builds both."
      ],
      bullets: [
        "A **model** is a simplified representation of reality that keeps the essentials and drops the noise.",
        "Simplifying is the point — a model that included everything would be as useless as reality itself.",
        "Two key models here: the **production possibilities curve (PPC)** and the **circular flow of income**."
      ]
    },
    {
      type: "concept",
      title: "The Production Possibilities Curve (PPC)",
      paragraphs: [
        "The **production possibilities curve** (also called the **production possibilities frontier**) shows the maximum combinations of *two* goods an economy can produce given its fixed resources and technology. Picture one good on each axis and a curve connecting the maximum trade-offs between them.",
        "Where a point sits tells you a lot. Points **on** the curve mean **full employment** and efficient use of resources — the economy is squeezing out the maximum possible output. Points **inside** the curve mean unemployment and/or inefficiency: resources are sitting idle or being wasted, so the economy is producing less than it could. In the real world, actual output usually sits somewhere inside the curve. Points **outside** the curve are currently unattainable — you simply can't get there with today's resources and technology.",
        "Moving *along* the curve is opportunity cost made visible. Since you're already using all resources fully, producing more of one good means producing less of the other — you can't get more of both by shuffling along the frontier. That trade-off is the opportunity cost of the extra units you gained."
      ],
      bullets: [
        "**PPC / production possibilities frontier** — the maximum combinations of two goods possible with fixed resources and technology.",
        "**On** the curve = **full employment** + efficiency (maximum output).",
        "**Inside** the curve = unemployment and/or inefficiency (**actual output** usually lives here).",
        "**Outside** the curve = currently unattainable given resources/technology.",
        "Moving along the curve shows opportunity cost: more of one good means less of the other."
      ],
      realWorldExample: "An economy producing only 'pizzas' and 'robots' with all workers employed sits on its PPC. A recession that idles a quarter of the workforce pushes actual output to a point inside the curve. A point outside — more pizzas AND more robots than the frontier allows — is simply not reachable right now."
    },
    {
      type: "concept",
      title: "Increasing vs. Constant Opportunity Cost",
      paragraphs: [
        "The *shape* of the PPC tells you how opportunity cost behaves. When the PPC **bows outward** (it's concave from the origin), the economy faces **increasing opportunity cost**: each additional unit of one good costs progressively *more* of the other. Why? Because factors of production are specialized — they're not equally suited to both goods. As you push to make more and more of one good, you're forced to pull in resources that were lousy at it, so the sacrifice keeps growing.",
        "When the PPC is a **straight line**, the economy has **constant opportunity cost**: the trade-off ratio stays the same all along the curve. This happens when factors are *equally well-suited* to producing either good, so switching resources from one to the other always costs the same. Bowed-out curve → increasing cost; straight line → constant cost. That single visual cue is a favorite exam check."
      ],
      bullets: [
        "**Increasing opportunity cost** — PPC bows outward (concave); each extra unit costs more of the other good. Cause: specialized factors not equally suited to both goods.",
        "**Constant opportunity cost** — PPC is a straight line; the trade-off ratio is the same everywhere. Cause: factors equally suited to either good.",
        "Quick read: bowed-out curve = increasing cost; straight line = constant cost."
      ]
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "ie13-mc-1",
          question: "An economy is producing at a point INSIDE its PPC. What does that indicate?",
          options: [
            "Full employment and maximum efficiency",
            "Unemployment and/or inefficiency — output below potential",
            "A combination that is currently unattainable",
            "That the PPC has shifted outward"
          ],
          correctAnswer: 1,
          explanation: "Inside the curve means resources are idle or wasted — unemployment and/or inefficiency — so the economy is producing less than it could.",
          concept: "reading-ppc"
        },
        {
          id: "ie13-mc-2",
          question: "A straight-line PPC tells you the economy has…",
          options: [
            "increasing opportunity cost",
            "constant opportunity cost",
            "no opportunity cost at all",
            "unattainable production"
          ],
          correctAnswer: 1,
          explanation: "A straight-line PPC means the trade-off ratio is the same everywhere — constant opportunity cost — because factors are equally suited to either good.",
          concept: "opportunity-cost-shape"
        }
      ]
    },
    {
      type: "concept",
      title: "Actual Growth vs. Growth in Production Possibilities",
      paragraphs: [
        "There are two very different kinds of 'growth' on a PPC, and mixing them up is a classic error. **Actual growth** is moving from a point *inside* the PPC toward the curve — you're putting idle resources back to work or fixing inefficiency. It's real growth, but it's *limited*: the best you can do is reach the existing frontier. Once you're on the curve, you can't get more this way.",
        "**Growth in production possibilities** is the PPC itself shifting *outward* — the whole frontier expands, so combinations that were impossible before become possible. This comes from (a) an increase in the *quantity* of resources, (b) an improvement in the *quality* of resources (for example, a better-educated labour force), or (c) technological improvement. This is what people usually mean by long-run **economic growth**.",
        "The frontier can move the other way too. A PPC shifts *inward* when resources shrink or worsen — depleted reserves, a natural disaster destroying capital, a shrinking workforce. And a PPC can shift **non-parallel**: a technology or resource change that favors *one* good over the other expands the economy's capacity for that good disproportionately, tilting the curve rather than pushing it out evenly."
      ],
      bullets: [
        "**Actual growth** — moving from inside the PPC toward the curve (using idle resources / fixing inefficiency); limited by the existing frontier.",
        "**Growth in production possibilities** — the PPC shifts *outward*; caused by more resources, better-quality resources, or better technology. This is long-run **economic growth**.",
        "PPC shifts *inward* when resources shrink or worsen (depletion, disasters, destroyed capital).",
        "PPC shifts **non-parallel** when a change favors one good over the other, tilting the frontier."
      ]
    },
    {
      type: "concept",
      title: "The Circular Flow of Income",
      paragraphs: [
        "The **circular flow of income** models how money and resources move through an economy. The simplest version has just two decision-makers: **households**, who own the four factors of production, and **firms**, who buy those factors and use them to produce goods and services.",
        "Think of two loops spinning in opposite directions. In the 'clockwise' real loop, factors of production flow *from households to firms* through the **resource markets**, and finished goods and services flow *from firms to households* through the **product markets**. In the 'counterclockwise' money loop, firms pay households for their factors — rent, wages, interest, and profit — which becomes **household income**; households then spend that income buying goods and services, which becomes **firm revenue** (household expenditure). The key principle: in any given period, the income flow, the expenditure flow, and the value-of-output flow are all *equal*. Money paid out as income comes back as spending on the output it helped produce.",
        "Real economies have more than two players, and that's where leakages and injections come in — next."
      ],
      bullets: [
        "**Households** own the factors of production; **firms** buy factors and produce goods/services.",
        "Real loop: factors flow households → firms via **resource markets**; goods/services flow firms → households via **product markets**.",
        "Money loop: firms pay **household income** (rent, wages, interest, profit); households pay **firm revenue** (expenditure).",
        "Core identity: income flow = expenditure flow = value of output, all equal in a given period."
      ],
      realWorldExample: "When you take a taxi ride, you (a household) pay the fare through the product market — that's household expenditure and the firm's revenue. The taxi driver's wage flows the other way, from the firm to a household through the resource market, as income for the labour supplied."
    },
    {
      type: "concept",
      title: "Leakages & Injections",
      paragraphs: [
        "In a fuller model, money doesn't just circle endlessly between households and firms — some leaks out of the spending flow, and some gets injected in from outside it. **Leakages** (also called withdrawals) are money *leaving* the flow of consumer spending: **saving** (income not spent), **taxes** (paid to government), and **imports** (spending that goes abroad). **Injections** are money *entering* the flow from outside consumer spending: **investment** (firms spending on capital), **government spending**, and **exports** (foreign spending on domestic goods).",
        "They come in matched pairs. **Saving ↔ investment**: savings flow into financial markets, which channel funds to firms that borrow and invest. **Taxes ↔ government spending**: taxes fund government expenditure. **Imports ↔ exports**: spending that leaves to buy foreign goods is mirrored by foreigners' spending on domestic goods. When total injections equal total leakages, the circular flow is in balance; when they don't, the size of the flow (and the economy) tends to expand or contract."
      ],
      bullets: [
        "**Leakages / withdrawals** — money leaving the spending flow: **saving**, **taxes**, **imports**.",
        "**Injections** — money entering from outside consumer spending: **investment**, **government spending**, **exports**.",
        "Matched pairs: **saving ↔ investment**, **taxes ↔ government spending**, **imports ↔ exports**.",
        "Injections = leakages → flow in balance; imbalance makes the flow (economy) expand or contract."
      ]
    },
    {
      type: "scenario",
      title: "Reading One PPC",
      narrative: "Farland produces only wheat and cloth with all resources fully employed. At point X it makes 100 wheat and 40 cloth. Moving to point Y, it makes 120 wheat but only 30 cloth. Its PPC bows outward from the origin.",
      details: [
        "Points X and Y both sit ON the curve, so Farland is at full employment and efficiency at each.",
        "Moving X → Y gains 20 wheat but sacrifices 10 cloth — the opportunity cost of those 20 extra wheat is 10 cloth.",
        "Because the PPC bows outward, Farland has increasing opportunity cost: pushing even harder for wheat would cost progressively more cloth per unit.",
        "If a new fertilizer raised only wheat capacity, the PPC would shift outward non-parallel — tilting to favor wheat rather than expanding evenly."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "ie13-aq-1",
        question: "Farland moves from point X (100 wheat, 40 cloth) to point Y (120 wheat, 30 cloth) along its PPC. What is the opportunity cost of the extra wheat?",
        options: [
          "20 wheat",
          "10 cloth",
          "30 cloth",
          "Zero, because both points are on the curve"
        ],
        correctAnswer: 1,
        explanation: "Gaining 20 wheat (100→120) required giving up 10 cloth (40→30). Along a PPC you can only get more of one good by sacrificing the other, so the opportunity cost of the extra wheat is the 10 cloth forgone.",
        concept: "ppc-opportunity-cost"
      }
    },
    {
      type: "recap",
      takeaways: [
        "A model is a simplified representation of reality that keeps the essentials — the PPC and circular flow are two key ones.",
        "PPC: on the curve = full employment/efficiency; inside = unemployment/inefficiency; outside = unattainable. Moving along it shows opportunity cost.",
        "Bowed-out PPC = increasing opportunity cost (specialized factors); straight-line PPC = constant opportunity cost (equally suited factors).",
        "Actual growth = moving from inside toward the curve; growth in production possibilities = the PPC shifting outward (more/better resources or technology). It can also shift inward or non-parallel.",
        "Circular flow: households and firms exchange via resource and product markets; income = expenditure = output. Leakages (saving, taxes, imports) pair with injections (investment, government spending, exports)."
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 5,
      questions: [
        {
          id: "ie13-mx-1",
          question: "Why do economists use simplified models like the PPC instead of describing the whole economy in full detail?",
          options: [
            "Because full detail is illegal to publish",
            "Because a model keeps the key relationships and strips out noise, making them easier to study",
            "Because models are always perfectly accurate",
            "Because the real economy has no relationships worth studying"
          ],
          correctAnswer: 1,
          explanation: "A model deliberately simplifies — keeping the essentials and dropping detail — so the key relationships stand out and can be analyzed.",
          concept: "models"
        },
        {
          id: "ie13-mx-2",
          question: "A production combination that lies OUTSIDE an economy's current PPC is best described as…",
          options: [
            "efficient and fully employed",
            "inefficient with idle resources",
            "currently unattainable given resources and technology",
            "the same as a point on the curve"
          ],
          correctAnswer: 2,
          explanation: "Points outside the frontier can't be reached with today's resources and technology — they're currently unattainable.",
          concept: "reading-ppc"
        },
        {
          id: "ie13-mx-3",
          question: "A PPC that bows outward (is concave to the origin) reflects…",
          options: [
            "constant opportunity cost",
            "increasing opportunity cost from specialized factors",
            "zero opportunity cost",
            "an economy in a recession"
          ],
          correctAnswer: 1,
          explanation: "A bowed-out PPC means each extra unit of one good costs more of the other — increasing opportunity cost — because factors aren't equally suited to both goods.",
          concept: "opportunity-cost-shape"
        },
        {
          id: "ie13-mx-4",
          question: "An economy reduces its unemployment, moving from a point inside its PPC toward the curve. This is…",
          options: [
            "growth in production possibilities (the PPC shifts out)",
            "actual growth (using idle resources)",
            "the PPC shifting inward",
            "a non-parallel shift"
          ],
          correctAnswer: 1,
          explanation: "Moving from inside the curve toward it by employing idle resources is actual growth — real but limited by the existing frontier.",
          concept: "growth-types"
        },
        {
          id: "ie13-mx-5",
          question: "Which of these would cause the PPC itself to shift OUTWARD?",
          options: [
            "A recession that idles factories",
            "A better-educated, more skilled workforce",
            "A natural disaster destroying capital",
            "Simply reducing current inefficiency"
          ],
          correctAnswer: 1,
          explanation: "Improving the quality of resources (a more educated labour force) expands productive capacity, shifting the whole PPC outward — growth in production possibilities.",
          concept: "growth-types"
        },
        {
          id: "ie13-mx-6",
          question: "A war destroys much of a country's factories and infrastructure. On its PPC this is shown as…",
          options: [
            "an outward shift of the curve",
            "an inward shift of the curve",
            "a move from inside toward the curve",
            "a move along the curve"
          ],
          correctAnswer: 1,
          explanation: "Losing quantity/quality of resources (destroyed capital) shrinks productive capacity, shifting the PPC inward.",
          concept: "growth-types"
        },
        {
          id: "ie13-mx-7",
          question: "In the circular flow, in which direction do the factors of production and the payments for them move?",
          options: [
            "Factors flow firms → households; income flows households → firms",
            "Factors flow households → firms; income (rent, wages, interest, profit) flows firms → households",
            "Both factors and income flow only from firms to households",
            "Neither factors nor income actually move"
          ],
          correctAnswer: 1,
          explanation: "Households own the factors and supply them to firms via resource markets; firms pay for them (rent, wages, interest, profit), so income flows firms → households.",
          concept: "circular-flow"
        },
        {
          id: "ie13-mx-8",
          question: "Which set lists only LEAKAGES (withdrawals) from the circular flow?",
          options: [
            "Investment, government spending, exports",
            "Saving, taxes, imports",
            "Saving, investment, exports",
            "Taxes, government spending, imports"
          ],
          correctAnswer: 1,
          explanation: "Leakages are money leaving the consumer-spending flow: saving, taxes, and imports. Investment, government spending, and exports are injections.",
          concept: "leakages-injections"
        },
        {
          id: "ie13-mx-9",
          question: "Which leakage is correctly paired with its matching injection?",
          options: [
            "Saving ↔ exports",
            "Taxes ↔ government spending",
            "Imports ↔ investment",
            "Saving ↔ taxes"
          ],
          correctAnswer: 1,
          explanation: "The matched pairs are saving↔investment, taxes↔government spending, and imports↔exports. Taxes fund government spending, so that pairing is correct.",
          concept: "leakages-injections"
        },
        {
          id: "ie13-mx-10",
          question: "A household pays for a haircut. Which flow does this represent in the circular flow model?",
          options: [
            "A factor payment from firm to household through the resource market",
            "Household expenditure through the product market, which is the firm's revenue",
            "A leakage in the form of saving",
            "An injection in the form of government spending"
          ],
          correctAnswer: 1,
          explanation: "Buying a service is household expenditure flowing to the firm through the product market — the same money is the firm's revenue.",
          concept: "circular-flow"
        }
      ]
    }
  ]
}
