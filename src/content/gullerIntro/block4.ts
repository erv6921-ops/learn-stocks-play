import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// GULLIVER INTRO TO BUSINESS — BLOCK 4
// What economics is; capitalism's foundations (Byrnes Ch. 2)
// Concepts: economics, macro-vs-micro, resource-development, malthus, adam-smith,
//           invisible-hand, capitalism, state-capitalism, four-basic-rights
// Audience: 9th grade
// ═══════════════════════════════════════════════

export const block4: StructuredLessonContent = {
  lessonId: "gulliver-4",
  sections: [
    // ─────────────────────────────────────────────
    // PRE-CLASS PRIMER (~5 min read)
    // ─────────────────────────────────────────────
    {
      type: "concept",
      title: "What Economics Actually Studies",
      paragraphs: [
        "Economics is the study of how people choose to use limited resources to get the things they want and need. There's never enough of everything to go around — not enough money, time, workers, or materials — so choices have to be made. Economics is really the study of those choices. Every time you decide to spend your last $10 on lunch instead of saving it, you're doing economics.",
        "Economists zoom in and out. Macroeconomics looks at the big picture — the whole country or world. It asks things like: Is the nation's economy growing? How many people are unemployed? Are prices rising everywhere? Microeconomics zooms in on the small picture — single people, families, and businesses. It asks things like: Why did this coffee shop raise its prices? How does one family decide what to buy? 'Macro' means large; 'micro' means small. Same subject, different zoom level.",
        "One hopeful idea in economics is resource development: instead of accepting that resources are fixed, people find ways to create more or use what we have far more efficiently. Farmers learned to grow much more food on the same land. Engineers made phones that do the work of a dozen old devices. Resource development is why the doom-and-gloom predictions of the past often didn't come true — human creativity keeps stretching what our resources can do."
      ],
      bullets: [
        "Economics is the study of how people use limited resources to meet their wants and needs.",
        "Resources are scarce, so economics is really the study of choices.",
        "Macroeconomics = the big picture (whole country or world).",
        "Microeconomics = the small picture (one person, family, or business).",
        "Resource development means creating more resources or using them more efficiently."
      ],
      realWorldExample: "Deciding how your whole country handles rising prices is macroeconomics. Deciding whether your favorite taco spot should raise its prices by a dollar is microeconomics. Both are economics — just different zoom levels."
    },
    {
      type: "concept",
      title: "Where Capitalism Comes From",
      paragraphs: [
        "Long ago, an economist named Thomas Malthus made a gloomy prediction: he thought the population would grow faster than the food supply, so people would be stuck in poverty and hunger forever. He turned out to be too pessimistic — he didn't foresee how resource development (better farming, new technology) would let us produce far more food than he imagined. His famous mistake is a lesson in underestimating human creativity.",
        "A more optimistic thinker, Adam Smith, is often called the father of modern economics. His big idea was the invisible hand: when people are free to pursue their own self-interest — trying to earn a living and improve their own lives — they end up helping society as a whole, as if guided by an invisible hand. A baker doesn't bake bread out of kindness; they do it to make money. But in chasing that profit, they feed the neighborhood. Millions of people each chasing their own gain can add up to a productive society.",
        "That idea is the foundation of capitalism — an economic system where private individuals (not the government) own businesses and resources and are free to compete and keep their profits. Capitalism generally rests on four basic rights: the right to own private property, the right to own a business and keep its profits, the right to free competition, and the right to freedom of choice in what you buy and sell. Not every country runs pure capitalism. In state capitalism, the government owns or tightly controls many big businesses while still allowing some markets to operate — a blend of government control and capitalist activity."
      ],
      bullets: [
        "Malthus predicted population would outrun the food supply — he was too pessimistic and underestimated resource development.",
        "Adam Smith is called the father of modern economics.",
        "The invisible hand: people pursuing their own self-interest unintentionally benefit society.",
        "Capitalism = private individuals own businesses and resources and keep their profits.",
        "The four basic rights: own property, own a business and keep profits, free competition, freedom of choice.",
        "State capitalism blends heavy government control with some market activity."
      ],
      realWorldExample: "A teen who starts selling custom hoodies just to make money is following self-interest — but they also give classmates something they want and maybe hire a friend to help. Their private profit ends up creating jobs and products. That's the invisible hand in a hallway."
    },
    // ─────────────────────────────────────────────
    // CHECKPOINT A (3 questions) — classify as macro or micro
    // ─────────────────────────────────────────────
    {
      type: "micro-check",
      questions: [
        {
          id: "g4-cpa-1",
          question: "\"How many people across the whole country are unemployed this year?\" This question is:",
          options: ["Microeconomics", "Macroeconomics", "Not economics at all", "Resource development"],
          correctAnswer: 1,
          explanation: "A question about the entire country's economy is macroeconomics — the big picture. 'Macro' means large.",
          concept: "macro-vs-micro"
        },
        {
          id: "g4-cpa-2",
          question: "\"Why did the sandwich shop on my street raise its prices?\" This question is:",
          options: ["Macroeconomics", "Microeconomics", "Geopolitical risk", "State capitalism"],
          correctAnswer: 1,
          explanation: "A question about one single business is microeconomics — the small picture. 'Micro' means small.",
          concept: "macro-vs-micro"
        },
        {
          id: "g4-cpa-3",
          question: "Which question is a MACRO question?",
          options: [
            "How does one family decide what groceries to buy?",
            "Should this one bakery hire another worker?",
            "Is the nation's overall economy growing or shrinking?",
            "What price should a single food truck charge?"
          ],
          correctAnswer: 2,
          explanation: "Whether the whole nation's economy is growing is a big-picture, macroeconomic question. The others focus on a single family or business (micro).",
          concept: "macro-vs-micro"
        }
      ]
    },
    // ─────────────────────────────────────────────
    // CHECKPOINT B (3 questions) — the four basic rights of capitalism
    // ─────────────────────────────────────────────
    {
      type: "micro-check",
      questions: [
        {
          id: "g4-cpb-1",
          question: "Which of these is one of the four basic rights of capitalism?",
          options: [
            "The right to a guaranteed profit from any business",
            "The right to own private property",
            "The right to never pay any taxes",
            "The right to force others to buy your product"
          ],
          correctAnswer: 1,
          explanation: "The right to own private property is one of the four basic rights of capitalism. The others are owning a business and keeping profits, free competition, and freedom of choice.",
          concept: "four-basic-rights"
        },
        {
          id: "g4-cpb-2",
          question: "A person opens a shop and gets to keep the money it earns. Which basic right of capitalism is this?",
          options: [
            "The right to own a business and keep its profits",
            "The right to free healthcare",
            "The right to a guaranteed job",
            "The right to control other businesses"
          ],
          correctAnswer: 0,
          explanation: "Owning a business and keeping its profits is one of the four basic rights that make capitalism work.",
          concept: "four-basic-rights"
        },
        {
          id: "g4-cpb-3",
          question: "Being free to choose what you buy, and businesses being free to compete for your money, are two of the four basic rights. Together they are:",
          options: [
            "Freedom of choice and freedom of competition",
            "The right to own property and pay no taxes",
            "State capitalism and socialism",
            "Macro and micro rights"
          ],
          correctAnswer: 0,
          explanation: "Freedom of choice (buyers pick what they want) and freedom of competition (businesses compete freely) are two of capitalism's four basic rights.",
          concept: "four-basic-rights"
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
          id: "g4-exit-1",
          question: "The 'invisible hand' idea says that:",
          options: [
            "The government secretly controls every business",
            "People pursuing their own self-interest end up benefiting society as a whole",
            "Businesses must be run by charities",
            "Prices are set by a magic force nobody understands"
          ],
          correctAnswer: 1,
          explanation: "Adam Smith's invisible hand means individuals chasing their own gain unintentionally help society — the baker seeking profit also feeds the town.",
          concept: "invisible-hand"
        },
        {
          id: "g4-exit-2",
          question: "Which best describes capitalism?",
          options: [
            "The government owns all businesses and resources",
            "Private individuals own businesses and resources and are free to compete and keep profits",
            "Nobody is allowed to own anything",
            "Only nonprofits are allowed to exist"
          ],
          correctAnswer: 1,
          explanation: "Capitalism is an economic system where private individuals — not the government — own businesses and resources and keep the profits they earn.",
          concept: "capitalism"
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
          id: "g4-prac-1",
          question: "Economics is best defined as the study of:",
          options: [
            "How to get rich quickly",
            "How people use limited resources to meet their wants and needs",
            "Only how banks work",
            "How to memorize prices"
          ],
          correctAnswer: 1,
          explanation: "Economics studies how people make choices about using scarce (limited) resources to satisfy wants and needs.",
          concept: "economics"
        },
        {
          id: "g4-prac-2",
          question: "Why does economics exist as a subject at all?",
          options: [
            "Because resources are unlimited",
            "Because resources are limited, so people must make choices",
            "Because money is the only thing that matters",
            "Because governments require it"
          ],
          correctAnswer: 1,
          explanation: "Scarcity — limited resources — forces people to make choices, and studying those choices is the heart of economics.",
          concept: "economics"
        },
        {
          id: "g4-prac-3",
          question: "Studying whether the entire U.S. economy is growing is an example of:",
          options: ["Microeconomics", "Macroeconomics", "Resource development", "State capitalism"],
          correctAnswer: 1,
          explanation: "The whole economy is the big picture, which is macroeconomics.",
          concept: "macro-vs-micro"
        },
        {
          id: "g4-prac-4",
          question: "Studying how one family budgets its monthly income is an example of:",
          options: ["Macroeconomics", "Microeconomics", "Geopolitical risk", "Malthus's theory"],
          correctAnswer: 1,
          explanation: "One family's decisions are the small picture — microeconomics.",
          concept: "macro-vs-micro"
        },
        {
          id: "g4-prac-5",
          question: "What is resource development?",
          options: [
            "Using up all resources as fast as possible",
            "Finding ways to create more resources or use existing ones more efficiently",
            "Refusing to use any resources",
            "A type of tax"
          ],
          correctAnswer: 1,
          explanation: "Resource development is human creativity expanding what resources can do — growing more food per acre, making more efficient tools.",
          concept: "resource-development"
        },
        {
          id: "g4-prac-6",
          question: "Thomas Malthus is remembered for predicting that:",
          options: [
            "Technology would solve every problem",
            "Population would grow faster than the food supply, trapping people in poverty",
            "Capitalism would make everyone rich instantly",
            "The government should own all farms"
          ],
          correctAnswer: 1,
          explanation: "Malthus predicted population would outrun food. He was too pessimistic — he underestimated resource development.",
          concept: "malthus"
        },
        {
          id: "g4-prac-7",
          question: "Why did Malthus's gloomy prediction largely NOT come true?",
          options: [
            "The world's population suddenly stopped growing",
            "Resource development, like better farming and technology, produced far more food than he expected",
            "Farming stayed exactly the same as in Malthus's day",
            "Food ran out, exactly as he predicted"
          ],
          correctAnswer: 1,
          explanation: "Advances in farming and technology (resource development) let humans produce much more food than Malthus imagined, avoiding his predicted disaster.",
          concept: "malthus"
        },
        {
          id: "g4-prac-8",
          question: "Adam Smith is often called:",
          options: [
            "The father of modern economics",
            "The inventor of the internet",
            "The first factory owner",
            "The founder of the first nonprofit"
          ],
          correctAnswer: 0,
          explanation: "Adam Smith, who described the invisible hand, is widely known as the father of modern economics.",
          concept: "adam-smith"
        },
        {
          id: "g4-prac-9",
          question: "A baker bakes bread to earn money, but in doing so also feeds the neighborhood. This illustrates:",
          options: [
            "The invisible hand",
            "State capitalism",
            "Malthus's prediction",
            "Macroeconomics"
          ],
          correctAnswer: 0,
          explanation: "Pursuing self-interest (profit) while unintentionally benefiting society is exactly Adam Smith's invisible hand.",
          concept: "invisible-hand"
        },
        {
          id: "g4-prac-10",
          question: "In capitalism, who mainly owns the businesses and resources?",
          options: [
            "The government",
            "Private individuals",
            "Only foreign countries",
            "Nobody"
          ],
          correctAnswer: 1,
          explanation: "Under capitalism, private individuals — not the government — own businesses and resources and keep their profits.",
          concept: "capitalism"
        },
        {
          id: "g4-prac-11",
          question: "What is state capitalism?",
          options: [
            "A system where private individuals own everything with no government role",
            "A blend where the government owns or tightly controls many big businesses while allowing some markets",
            "A system with no businesses at all",
            "Another name for microeconomics"
          ],
          correctAnswer: 1,
          explanation: "State capitalism mixes heavy government control of major businesses with some market activity — a blend rather than pure capitalism.",
          concept: "state-capitalism"
        },
        {
          id: "g4-prac-12",
          question: "Which of the following is NOT one of the four basic rights of capitalism?",
          options: [
            "The right to own private property",
            "The right to own a business and keep its profits",
            "The right to freedom of competition",
            "The right to a guaranteed income from the government"
          ],
          correctAnswer: 3,
          explanation: "The four basic rights are private property, owning a business and keeping profits, free competition, and freedom of choice. A guaranteed government income is not one of them.",
          concept: "four-basic-rights"
        },
        {
          id: "g4-prac-13",
          question: "The main difference between capitalism and state capitalism is:",
          options: [
            "There is no difference",
            "Capitalism relies on private ownership; state capitalism has heavy government ownership/control",
            "State capitalism has no government at all",
            "Capitalism bans all businesses"
          ],
          correctAnswer: 1,
          explanation: "Capitalism centers on private ownership and free markets; state capitalism gives the government a controlling role over major businesses.",
          concept: "state-capitalism"
        },
        {
          id: "g4-prac-14",
          question: "Which everyday choice is the BEST example of 'doing economics'?",
          options: [
            "Choosing whether to spend your last $10 on lunch or save it",
            "Picking your favorite color",
            "Deciding which song sounds best",
            "Deciding which movie is your favorite"
          ],
          correctAnswer: 0,
          explanation: "Deciding how to use a limited resource (your $10) between competing wants is economics — the study of choices under scarcity.",
          concept: "economics"
        }
      ]
    }
  ]
}
