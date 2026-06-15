// ════════════════════════════════════════════════════════════════════
// AP MICROECONOMICS — UNIT 1: BASIC ECONOMIC CONCEPTS (12–15% of exam)
// Six topics, matching the College Board CED outline (1.1–1.6):
//   1.1 Scarcity
//   1.2 Resource Allocation and Economic Systems
//   1.3 The Production Possibilities Curve (PPC)
//   1.4 Comparative Advantage and Trade
//   1.5 Cost-Benefit Analysis
//   1.6 Marginal Analysis and Consumer Choice
// Each lesson: 3 concept sub-lessons → a simulator/lab challenge → recap →
// a 5-question (A–E) mastery check with explanations of right AND wrong answers.
// ════════════════════════════════════════════════════════════════════

import { StructuredLessonContent, QuizQuestion } from "@/types"

const q = (id: string, question: string, options: string[], correctAnswer: number, explanation: string): QuizQuestion =>
  ({ id, question, options, correctAnswer, explanation })

export const apMicroUnit1Content: StructuredLessonContent[] = [
  // ─── 1.1 Scarcity ─────────────────────────────────────────────────
  {
    lessonId: "apm-1-1",
    sections: [
      {
        type: "concept",
        title: "Economics, Scarcity, and Choice",
        paragraphs: [
          "Economics is the study of scarcity and choice: how people satisfy unlimited wants with limited resources. Because you can never have everything, every decision is really a choice of one thing over another.",
          "Scarcity is the fundamental economic problem — unlimited wants but limited resources. It applies to everyone: individuals, firms, and governments. Even time is scarce: there are only 24 hours in a day, so spending an hour one way means not spending it another.",
          "An economic choice is the act of choosing one option over another because you can't have both. The thing you give up is what makes choices costly — the idea we build on in the next lesson with opportunity cost.",
        ],
        bullets: [
          "Economics — the study of scarcity and choice given unlimited wants and limited resources",
          "Scarcity — unlimited wants, limited resources (even time is scarce)",
          "Economic choice — choosing one thing over another because you can't have both",
        ],
        realWorldExample: "You have $20 and one free Friday night. Spending it on a concert means no late-night diner run, and vice versa. Limited money and limited time force a choice — that's scarcity in everyday life.",
      },
      {
        type: "concept",
        title: "Free Goods vs. Economic Goods",
        paragraphs: [
          "Almost everything is scarce, but a few things aren't. A free good is something with no cost and effectively unlimited supply, so consuming it doesn't force a trade-off.",
          "The classic example is sunlight — using it doesn't use it up or take it from anyone else. Most goods, though, are economic goods: they're scarce, so getting more of one means giving up something else.",
        ],
        bullets: [
          "Free good — no cost and unlimited supply (e.g., sunlight); no trade-off to consume it",
          "Economic good — scarce; consuming it requires giving something up",
          "Because most goods are economic goods, choices and opportunity costs are everywhere",
        ],
      },
      {
        type: "concept",
        title: "Positive vs. Normative Statements",
        paragraphs: [
          "Economists are careful to separate facts from opinions, because the two call for very different kinds of evidence.",
          "A positive statement is factual — it describes what IS and can be tested or proven true or false. A normative statement is an opinion or value judgment — it says what OUGHT to be and usually contains words like 'should' or 'better.'",
          "On the AP exam, watch for the giveaway: 'should,' 'ought,' 'too high,' or 'unfair' almost always signal a normative statement.",
        ],
        bullets: [
          "Positive statement — factual, testable ('The minimum wage is $7.25 per hour.')",
          "Normative statement — opinion/value judgment ('The minimum wage should be raised.')",
          "Signal words for normative: should, ought, better, unfair, too high/low",
        ],
        realWorldExample: "'Raising the gas tax reduces gasoline consumption' is positive — we can check it with data. 'The government should raise the gas tax to fight climate change' is normative — it's a judgment about what's worth doing.",
      },
      {
        type: "scenario",
        title: "🎯 Challenge — Spot Scarcity in the Simulator",
        narrative: "Open the Stock Simulator. Pick two stocks you'd like but can't fully afford at the same time with your InvestiCoins.",
        details: [
          "Choosing one over the other is scarcity and economic choice in action.",
          "Write one positive statement about a stock (something factual, like its price or % change).",
          "Then write one normative statement about it (an opinion, like whether it's 'a good buy').",
        ],
      },
      {
        type: "recap",
        takeaways: [
          "Economics is the study of scarcity and choice — unlimited wants, limited resources.",
          "Scarcity forces everyone to choose; even time is scarce.",
          "A free good has no cost and unlimited supply (e.g., sunlight); most goods are scarce economic goods.",
          "Positive statements are factual and testable; normative statements are opinions (watch for 'should').",
        ],
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          q("apm-1-1-q1", "Which of the following best describes the economic problem of scarcity?",
            ["People are unwilling to work hard enough to produce goods", "Wants are unlimited but the resources to satisfy them are limited", "Governments do not print enough money", "Only poor countries face limited resources", "Prices are always too high for consumers"], 1,
            "Scarcity means unlimited wants meeting limited resources — the root of all economic choice. It isn't about laziness or money supply, and it applies to everyone (rich and poor alike), not just poor countries; high prices are a symptom, not the definition."),
          q("apm-1-1-q2", "Which of the following is the best example of a free good?",
            ["A bottle of water at a store", "Sunlight", "A college education", "A smartphone", "A plot of farmland"], 1,
            "A free good has no cost and effectively unlimited supply — sunlight fits, since using it doesn't use it up or deprive anyone else. Bottled water, education, smartphones, and farmland are all scarce economic goods that require giving something up."),
          q("apm-1-1-q3", "Which of the following is a NORMATIVE statement?",
            ["The unemployment rate rose to 5% last month", "A rise in the price of coffee reduced the quantity demanded", "The government should raise taxes on the wealthy", "Inflation was 3% over the past year", "Raising the minimum wage increased some firms' labor costs"], 2,
            "Normative statements express opinions about what OUGHT to be — 'should raise taxes' is a value judgment. The others are positive statements describing measurable facts that can be tested as true or false."),
          q("apm-1-1-q4", "A student with $200 can either attend a music festival (valued at $180 of enjoyment) or buy textbooks (valued at $150 of educational benefit). Choosing one over the other illustrates:",
            ["A free good", "Economic choice driven by scarcity", "A normative statement", "Absolute advantage", "A positive externality"], 1,
            "With limited money the student can't have both, so picking one is an economic choice forced by scarcity. It isn't a free good (both are scarce), isn't an opinion (normative), and absolute advantage and externalities are unrelated Unit concepts."),
          q("apm-1-1-q5", "Scarcity implies that:",
            ["Only money is in limited supply", "Trade-offs are unavoidable for individuals, firms, and governments", "Wealthy people do not have to make choices", "Free goods make up most of the economy", "Wants are limited but resources are unlimited"], 1,
            "Because resources are limited, every decision-maker faces trade-offs — there's no escaping it. Money is only one limited resource (time, labor, and land are scarce too); even the wealthy must choose; free goods are rare; and the last option reverses the definition of scarcity."),
        ],
      },
    ],
  },

  // ─── 1.2 Resource Allocation and Economic Systems ─────────────────
  {
    lessonId: "apm-1-2",
    sections: [
      {
        type: "concept",
        title: "Economic Systems and Property Rights",
        paragraphs: [
          "An economy is a system that coordinates society's choices about what to produce, how, and for whom — and then distributes goods to the people who want them. Who makes those choices depends on the economic system.",
          "In a market economy, production and consumption are the result of decentralized decisions made by many firms and individuals interacting freely; prices and the profit motive do the coordinating. In a command economy, industries are publicly owned and a central authority makes the producer and consumer decisions. Most real-world economies are mixed — markets dominate, but government steps in for things like defense and education.",
          "Markets depend on property rights: the rules that establish ownership and grant people the right to trade goods and services with each other. Without secure property rights, there's little incentive to produce or trade.",
        ],
        bullets: [
          "Economy — coordinates production and consumption choices and distributes goods",
          "Market economy — decentralized decisions by many firms/individuals; prices coordinate",
          "Command economy — publicly owned industries; a central authority decides",
          "Mixed economy — mostly market with targeted government intervention (most countries)",
          "Property rights — establish ownership and the right to trade",
        ],
      },
      {
        type: "concept",
        title: "Resources: The Factors of Production (CELL)",
        paragraphs: [
          "A resource is anything that can be used to produce something else. Economists group resources into four factors of production, easy to remember with the acronym CELL.",
          "A crucial AP trap: money is NOT a factor of production. You can't build anything out of money itself — money is simply used to purchase the real factors.",
        ],
        bullets: [
          "Capital — anything human-made used to produce other things (machines, factories, tools)",
          "Entrepreneurship — organizing the other three factors and taking on risk to create value",
          "Land — natural resources and raw materials (oil, farmland, timber, water)",
          "Labor — human effort and work, physical and mental",
          "Money is NOT a factor — it's used to buy the factors",
        ],
        realWorldExample: "A bakery uses land (its lot), labor (the bakers), capital (the ovens), and entrepreneurship (the owner who organized it and took the risk). The cash in its account is not a factor — it's what bought the ovens and hired the bakers.",
      },
      {
        type: "concept",
        title: "Opportunity Cost, and Micro vs. Macro",
        paragraphs: [
          "Because resources are scarce, every choice has an opportunity cost: the value of the next-best alternative you give up. Economists split the costs of a decision into two kinds.",
          "Explicit costs are out-of-pocket expenses paid with cash or its equivalent — wages to workers, the electricity bill. Implicit costs are the forgone benefits of using resources you already own — like the time and effort an owner puts into running a company instead of doing something else. True economic cost includes both.",
          "Finally, know which lens you're using. Microeconomics studies individuals and firms making decisions and how they interact (college vs. job, the car industry). Macroeconomics studies the overall ups and downs of the economy in aggregate (employment, inflation). Unit 1 is the foundation of the micro side.",
        ],
        bullets: [
          "Opportunity cost — the next-best alternative given up when choosing",
          "Explicit cost — out-of-pocket payment (wages, electricity bill)",
          "Implicit cost — forgone benefit of resources you already own (your own time)",
          "Microeconomics — individuals/firms and their interactions",
          "Macroeconomics — the whole economy in aggregate (employment, inflation)",
        ],
      },
      {
        type: "scenario",
        title: "🎯 Challenge — Inputs and Costs of a Business",
        narrative: "Open Micro-Business mode and look at your venture through the lens of resources and costs.",
        details: [
          "Identify each factor of production your business uses (Capital, Entrepreneurship, Land, Labor).",
          "List one explicit cost (something you pay out) and one implicit cost (like the value of your own time).",
          "Note whether your decisions are microeconomic (your firm) — they are — and why.",
        ],
      },
      {
        type: "recap",
        takeaways: [
          "An economy coordinates what/how/for whom; market, command, and mixed systems answer differently.",
          "Property rights establish ownership and the right to trade — the backbone of markets.",
          "The four factors of production are Capital, Entrepreneurship, Land, Labor (CELL) — money is NOT a factor.",
          "Opportunity cost includes explicit (out-of-pocket) and implicit (forgone) costs.",
          "Microeconomics studies firms/individuals; macroeconomics studies the whole economy.",
        ],
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          q("apm-1-2-q1", "In a market economy, what primarily decides what gets produced?",
            ["A central government planner", "Prices and the profit motive of many firms and individuals", "International treaties", "The largest single corporation", "Random chance"], 1,
            "Market economies rely on decentralized decisions coordinated by prices and the profit motive — not a central planner (that's a command economy), treaties, one corporation, or chance."),
          q("apm-1-2-q2", "Which of the following is NOT a factor of production?",
            ["A tractor on a farm", "A coal deposit underground", "$50,000 in a business checking account", "A software engineer writing code", "An entrepreneur starting a new business"], 2,
            "Money is not a factor of production — it's used to buy factors but can't itself produce anything. The tractor is capital, the coal is land, the engineer is labor, and the entrepreneur is entrepreneurship — the four CELL factors."),
          q("apm-1-2-q3", "Which of the following is an example of an implicit cost for a firm?",
            ["Monthly rent paid to a landlord", "Wages paid to employees", "The salary the owner forgoes by not working elsewhere", "The electricity bill", "The cost of raw materials"], 2,
            "Implicit costs are the forgone benefits of resources the owner already owns — like the salary given up to run the business. Rent, wages, the electricity bill, and materials are explicit, out-of-pocket payments."),
          q("apm-1-2-q4", "Property rights are important to a market economy because they:",
            ["Force the government to set all prices", "Establish ownership and the right to trade, creating incentives to produce", "Eliminate scarcity", "Guarantee everyone an equal income", "Apply only to command economies"], 1,
            "Property rights establish ownership and the right to trade, which gives people the incentive to produce and exchange. They don't set prices, can't eliminate scarcity, don't equalize income, and are foundational to markets, not command systems."),
          q("apm-1-2-q5", "Which of the following is a MICROECONOMIC question?",
            ["What causes the national unemployment rate to rise?", "How fast is the overall economy growing?", "Should a single coffee shop raise the price of its lattes?", "What is the country's inflation rate?", "How large is the federal budget deficit?"], 2,
            "Microeconomics studies individual firms and consumers — a single coffee shop's pricing decision is micro. National unemployment, overall growth, inflation, and the budget deficit are all economy-wide aggregates, which is macroeconomics."),
        ],
      },
    ],
  },

  // ─── 1.3 The Production Possibilities Curve ───────────────────────
  {
    lessonId: "apm-1-3",
    sections: [
      {
        type: "concept",
        title: "What the PPC Shows",
        paragraphs: [
          "A trade-off means giving up some of one thing to get more of another. The Production Possibilities Curve (PPC) is the model economists use to picture the trade-offs an economy faces when it can produce only two goods, using all of its resources.",
          "Where a production point sits relative to the curve tells you about efficiency and feasibility: on the curve is efficient, inside is inefficient (idle resources/unemployment), and outside is currently unattainable.",
          "The PPC does two big jobs: it shows the opportunity cost of producing more of one good (you slide down the curve and give up the other), and it illustrates economic growth or contraction when the whole curve shifts.",
        ],
        bullets: [
          "Trade-off — giving up some of one good for more of another",
          "On the curve — efficient (all resources used)",
          "Inside the curve — inefficient/underused resources (unemployment)",
          "Outside the curve — currently unattainable",
        ],
        realWorldExample: "An economy choosing between pizzas and robots is on its PPC when every worker and machine is busy. In a recession, idle factories drop it to a point inside the curve. A point beyond the curve is a dream until the economy grows.",
      },
      {
        type: "concept",
        title: "Efficiency and the Shape of the PPC",
        paragraphs: [
          "Efficiency means there are no missed opportunities — you can't make anyone better off without making someone else worse off. Economists name two kinds: productive efficiency (producing at the lowest possible cost, i.e., a point on the PPC) and allocative efficiency (producing the mix of goods consumers most want).",
          "The PPC's shape reveals how opportunity cost behaves. A straight-line PPC means constant opportunity cost — resources are equally suited to both goods. A concave (bowed-out) PPC means increasing opportunity cost — as you make more of one good you must give up ever-larger amounts of the other, because resources are specialized. The bowed-out curve is the AP standard.",
        ],
        bullets: [
          "Efficiency — no missed opportunities; can't help one party without hurting another",
          "Productive efficiency — producing at lowest cost (a point on the PPC)",
          "Allocative efficiency — producing the mix consumers actually want",
          "Linear PPC → constant opportunity cost; concave PPC → increasing opportunity cost (the AP default)",
        ],
      },
      {
        type: "concept",
        title: "Economic Growth: Shifting the PPC",
        paragraphs: [
          "Economic growth is a sustained rise in an economy's output — drawn as the entire PPC shifting OUTWARD. Two forces cause it: an increase in resources (a larger labor force, more capital, newly available land) and improvements/development of technology (the same inputs producing more output). Disasters, disease, or war can shift the curve INWARD.",
          "A subtle but tested point: if technology improves for only ONE good, the curve PIVOTS outward on that good's axis instead of shifting out in parallel. And because capital goods are the tools used to make future output, choosing to build more capital goods today shifts the whole PPC outward tomorrow.",
        ],
        bullets: [
          "Economic growth = the entire PPC shifts outward",
          "Causes: more resources, and better/new technology",
          "One-good technology gain → a pivot, not a parallel shift",
          "More capital goods today → a larger PPC in the future",
        ],
      },
      {
        type: "scenario",
        title: "🎯 Challenge — Find a Real Outward Shift",
        narrative: "In the Stock Simulator, find a company that recently invested heavily in new technology or capacity — for example, a chipmaker building a new fab or an automaker opening a factory.",
        details: [
          "That investment is an outward shift of the firm's production possibilities.",
          "Note what it traded off today (capital spending, lower short-term profit) to expand future output.",
          "Connect it to the lesson: capital goods today → a bigger PPC tomorrow.",
        ],
      },
      {
        type: "recap",
        takeaways: [
          "The PPC shows the trade-off between two goods when all resources are used.",
          "On the curve = efficient; inside = inefficient/unemployment; outside = unattainable.",
          "Productive efficiency = lowest-cost production; allocative efficiency = the mix consumers want.",
          "Linear PPC = constant opportunity cost; concave PPC = increasing opportunity cost.",
          "Growth shifts the whole curve outward (more resources or better technology); capital goods today grow it tomorrow.",
        ],
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          q("apm-1-3-q1", "A bowed-out (concave) PPC exists because:",
            ["Resources are perfectly substitutable between both goods", "Resources are specialized and not equally productive in all uses", "Technology is identical for both goods", "The economy is at full employment", "Opportunity cost is constant along the curve"], 1,
            "The concave shape reflects increasing opportunity cost: pushing toward one good forces the use of resources poorly suited to it, sacrificing ever-more of the other. Perfect substitutability and constant cost describe a straight line; identical technology and full employment don't determine the shape."),
          q("apm-1-3-q2", "An economy producing at a point INSIDE its PPC is best described as:",
            ["Growing rapidly", "Using all resources efficiently", "Experiencing unemployment or inefficiency", "Producing beyond its capacity", "Allocatively efficient"], 2,
            "Inside the curve means idle or misused resources — unemployment or inefficiency. Using all resources efficiently is a point ON the curve, beyond capacity is OUTSIDE (unattainable), and growth describes an outward shift, not an interior point."),
          q("apm-1-3-q3", "Which would cause an OUTWARD shift of the ENTIRE PPC?",
            ["A technology improvement for only one good", "A decrease in the labor force", "Reallocating workers between industries", "An increase in the quantity and quality of all factors of production", "A change in consumer tastes"], 3,
            "A full outward shift requires more or better resources across the board. A one-good tech gain only pivots the curve; a smaller labor force shifts it inward; reallocating workers is a movement along the curve; and tastes change what's produced, not capacity."),
          q("apm-1-3-q4", "Country A can produce 10 computers OR 20 tons of wheat (linear PPC). What is its opportunity cost of producing one computer?",
            ["1 ton of wheat", "2 tons of wheat", "3 tons of wheat", "0.5 tons of wheat", "10 tons of wheat"], 1,
            "Country A trades 20 wheat for 10 computers, so 1 computer costs 20/10 = 2 wheat. 0.5 is the reciprocal (the cost of wheat in computers), and the other values don't match the ratio."),
          q("apm-1-3-q5", "Productive efficiency is best defined as:",
            ["Producing the combination consumers most want", "Producing at the lowest possible cost (a point on the PPC)", "Producing inside the PPC", "Producing beyond the PPC", "Producing only capital goods"], 1,
            "Productive efficiency means producing at the lowest possible cost — any point on the PPC. Producing the most-wanted mix is allocative efficiency; inside the PPC is inefficient; beyond it is unattainable; and producing only capital goods is just one point, not the definition."),
        ],
      },
    ],
  },

  // ─── 1.4 Comparative Advantage and Trade ──────────────────────────
  {
    lessonId: "apm-1-4",
    sections: [
      {
        type: "concept",
        title: "Trade, Absolute, and Comparative Advantage",
        paragraphs: [
          "Trade is when people divide up the work and each provides goods in return for other goods. The reason trade makes everyone better off comes down to the difference between two kinds of 'advantage.'",
          "Absolute advantage is being able to produce MORE of a good than another producer using the same resources — simply being more productive. Comparative advantage is being able to produce a good at a LOWER OPPORTUNITY COST than another producer — and this is what decides who should specialize.",
          "Critical AP rule: you can't have a comparative advantage in BOTH goods. If one producer has the lower opportunity cost in good X, the other must have the lower opportunity cost in good Y. Comparative advantage is always relative, so it always splits.",
        ],
        bullets: [
          "Trade — dividing work and exchanging goods for goods",
          "Absolute advantage — producing more with the same resources (more productive)",
          "Comparative advantage — producing at a lower opportunity cost (who gives up less)",
          "No producer can have comparative advantage in both goods",
        ],
      },
      {
        type: "concept",
        title: "Calculating Opportunity Cost From a Table",
        paragraphs: [
          "AP questions almost always give an output table and ask who should specialize. Here's the method using output per hour:",
          "Country A: 10 wheat OR 5 cloth per hour.  Country B: 4 wheat OR 8 cloth per hour.",
          "To find the opportunity cost of one good, divide what you give up by what you get. Country A: 1 wheat = 5/10 = 0.5 cloth; 1 cloth = 10/5 = 2 wheat. Country B: 1 wheat = 8/4 = 2 cloth; 1 cloth = 4/8 = 0.5 wheat.",
          "Compare: Country A gives up only 0.5 cloth per wheat (vs. B's 2), so A specializes in wheat. Country B gives up only 0.5 wheat per cloth (vs. A's 2), so B specializes in cloth.",
        ],
        bullets: [
          "Opportunity cost of a good = (units of the OTHER good) ÷ (units of THIS good)",
          "Country A → comparative advantage in wheat (0.5 cloth vs. 2 cloth)",
          "Country B → comparative advantage in cloth (0.5 wheat vs. 2 wheat)",
          "Each producer specializes where it gives up the least",
        ],
        realWorldExample: "Even if a surgeon is also the fastest typist in town (absolute advantage at both), she should specialize in surgery and hire a typist — her opportunity cost of typing (forgone surgery income) is enormous. That's comparative advantage.",
      },
      {
        type: "concept",
        title: "Terms of Trade and the Gains From Trade",
        paragraphs: [
          "For trade to be mutually beneficial, the terms of trade — the rate at which the two goods are exchanged — must fall BETWEEN the two producers' opportunity costs.",
          "In the wheat/cloth example, Country A won't trade 1 wheat for less than 0.5 cloth (its own cost), and Country B won't pay more than 2 wheat for 1 cloth (its own cost). So beneficial terms for 1 wheat lie between 0.5 and 2 cloth.",
          "The payoff is the big idea of the unit: by specializing in their comparative-advantage good and trading, BOTH producers can consume combinations that lie BEYOND their own PPCs. Trade increases total output with no new resources.",
        ],
        bullets: [
          "Terms of trade — the exchange rate between the two goods",
          "Mutually beneficial terms fall strictly between the two producers' opportunity costs",
          "Specialization + trade lets both consume beyond their own PPCs",
          "Trade raises total output without any new resources",
        ],
      },
      {
        type: "scenario",
        title: "🎯 Challenge — Specialization in the Market",
        narrative: "In the Stock Simulator, pick two companies that each dominate a different niche — say, one leading in chips and one leading in software or logistics.",
        details: [
          "Each firm specializes where its opportunity cost of competing elsewhere is highest.",
          "Identify each company's 'comparative advantage' good or service.",
          "Explain why it would be costly for each firm to try to do what the other does best.",
        ],
      },
      {
        type: "recap",
        takeaways: [
          "Trade lets people specialize and exchange goods for goods.",
          "Absolute advantage = more productive; comparative advantage = lower opportunity cost.",
          "Specialization follows comparative advantage — and it always splits between producers.",
          "Opportunity cost of a good = units of the other good ÷ units of this good.",
          "Beneficial terms of trade fall between the two producers' opportunity costs, letting both consume beyond their PPCs.",
        ],
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          q("apm-1-4-q1", "Using the table (Country A: 10 wheat or 5 cloth; Country B: 4 wheat or 8 cloth, per hour), which country has a comparative advantage in cloth?",
            ["Country A, because it produces more cloth per hour", "Country A, because it has absolute advantage in everything", "Country B, because it has a lower opportunity cost of producing cloth", "Country B, because it produces more wheat per hour", "Neither — comparative advantage requires absolute advantage first"], 2,
            "Comparative advantage means the lower opportunity cost: Country B gives up only 0.5 wheat per cloth versus A's 2 wheat per cloth, so B specializes in cloth. Producing 'more per hour' confuses output with opportunity cost, absolute advantage doesn't decide specialization, B doesn't make more wheat, and comparative advantage never requires absolute advantage."),
          q("apm-1-4-q2", "Country X can produce 50 steel or 100 grain. Country Y can produce 30 steel or 90 grain. Which statement is correct?",
            ["Country X has comparative advantage in grain", "Country Y has comparative advantage in grain", "Country X has comparative advantage in both goods", "Country Y has comparative advantage in steel", "Neither country should specialize"], 1,
            "Opportunity cost of 1 grain: X = 50/100 = 0.5 steel; Y = 30/90 ≈ 0.33 steel. Y gives up less steel per grain, so Y has comparative advantage in grain (and X in steel). Reversing them is wrong, no one can have it in both, and differing costs always make specialization worthwhile."),
          q("apm-1-4-q3", "Country A's opportunity cost of 1 unit of Good X is 3 units of Good Y. Country B's is 6 units of Good Y. Which terms of trade are mutually beneficial?",
            ["1 X for 2 Y", "1 X for 4 Y", "1 X for 7 Y", "1 X for 8 Y", "1 X for 1 Y"], 1,
            "Beneficial terms fall between the two opportunity costs — here between 3 and 6 Y per X — so only 4 qualifies. Two and one are below 3 (the low-cost producer would rather make it itself); seven and eight exceed 6 (the buyer would rather produce it itself)."),
          q("apm-1-4-q4", "The gains from trade based on comparative advantage arise because:",
            ["One country produces everything more efficiently than another", "Specialization lets total output exceed what either could produce alone", "Trade eliminates scarcity", "Both countries gain absolute advantage by trading", "Trade lowers both countries' opportunity costs at once"], 1,
            "Specializing by comparative advantage and trading raises total output and lets both consume beyond their own PPCs. Producing everything more efficiently is absolute advantage (not the source of gains); trade never eliminates scarcity; absolute advantage isn't 'gained'; and trade doesn't change the underlying opportunity costs."),
          q("apm-1-4-q5", "A producer has an absolute advantage in BOTH goods compared with another producer. Which is true?",
            ["It should produce both goods itself", "Trade cannot benefit both producers", "It still has a comparative advantage in only one good", "The terms of trade are irrelevant", "It will always export both goods"], 2,
            "Comparative advantage depends on relative opportunity cost, so it always splits — even a producer better at everything has the lower opportunity cost in only one good. Both still gain from specializing and trading, so it shouldn't make both, trade still benefits both, and the terms of trade always matter."),
        ],
      },
    ],
  },

  // ─── 1.5 Cost-Benefit Analysis ────────────────────────────────────
  {
    lessonId: "apm-1-5",
    sections: [
      {
        type: "concept",
        title: "Explicit and Implicit Costs",
        paragraphs: [
          "Economists measure cost differently from accountants, and the difference decides whether a business is TRULY profitable.",
          "Explicit costs are payments to outside parties — wages, rent, materials. They appear in accounting records. Implicit costs are the opportunity costs of resources the owner already owns — the salary they give up to run the business, or the rent they forgo by using their own building.",
          "Combining the two gives two very different profit measures, plus a special break-even case called normal profit.",
        ],
        bullets: [
          "Accounting profit = Total Revenue − Explicit Costs",
          "Economic profit = Total Revenue − Explicit Costs − Implicit Costs = Accounting Profit − Implicit Costs",
          "Normal profit = zero economic profit — the owner earns exactly their next-best alternative",
          "A firm can show an accounting profit yet suffer an economic loss",
        ],
        realWorldExample: "A freelancer earns $70,000 revenue with $10,000 of expenses — a $60,000 accounting profit. But she turned down a $65,000 salaried job. Her economic profit is $60,000 − $65,000 = −$5,000. On paper she's winning; economically she'd be better off taking the job.",
      },
      {
        type: "concept",
        title: "Sunk Costs and Capital vs. Consumer Goods",
        paragraphs: [
          "A sunk cost is money already spent that cannot be recovered no matter what you do next. The iron rule of rational decision-making: ignore sunk costs — base decisions only on future costs and benefits. The sunk cost fallacy is continuing something because of what you've already poured in ('we've spent too much to quit now').",
          "Two more terms that come up in cost-benefit thinking: capital goods are goods used to make other goods (machines, factories), while consumer goods are final goods that are simply consumed. Choosing to produce more capital goods today means more growth in the future — the same idea you saw shifting the PPC outward.",
        ],
        bullets: [
          "Sunk cost — already paid and unrecoverable; ignore it in decisions",
          "Sunk cost fallacy — throwing good money after bad because of past spending",
          "Capital goods — goods that make other goods → more capital today means more future growth",
          "Consumer goods — final goods that are consumed",
        ],
        realWorldExample: "You pay $15 for a movie ticket and it's terrible halfway through. The $15 is gone whether you stay or leave. The only rational question is whether the rest is worth your time — so if it isn't, walk out.",
      },
      {
        type: "concept",
        title: "Net Benefit and the Decision Rule",
        paragraphs: [
          "The goal of rational decision-making is to maximize net benefit — the full value gained minus the full cost.",
          "But you don't get there by comparing grand totals; you get there at the margin, one unit at a time. Add a unit whenever its marginal benefit is at least its marginal cost, and stop when marginal cost would exceed marginal benefit. (That sets up Lesson 1.6.)",
        ],
        bullets: [
          "Net benefit = Total Benefit − Total Cost (the thing we maximize)",
          "Reach the maximum with the marginal rule: do it while MB ≥ MC",
          "Compare costs and benefits using ECONOMIC cost (explicit + implicit)",
        ],
      },
      {
        type: "scenario",
        title: "🎯 Challenge — Economic Profit in Your Business",
        narrative: "Open Micro-Business mode and look at your venture through an economist's eyes.",
        details: [
          "List one explicit cost (something you pay out) and one implicit cost (like the value of your own time, or coins you could have invested).",
          "Estimate your accounting profit, then subtract the implicit cost to get your economic profit.",
          "Are you earning a real economic profit, or just an accounting profit that hides an opportunity cost?",
        ],
      },
      {
        type: "recap",
        takeaways: [
          "Explicit costs are out-of-pocket; implicit costs are opportunity costs of owned resources.",
          "Accounting profit subtracts only explicit costs; economic profit subtracts implicit costs too.",
          "Normal profit = zero economic profit (resources earn exactly their next-best return).",
          "Ignore sunk costs; capital goods build future growth, consumer goods are consumed now.",
          "Maximize net benefit by deciding at the margin (MB vs. MC).",
        ],
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          q("apm-1-5-q1", "A baker uses her own building instead of renting it out for $2,000/month. Her accounting profit is $1,500/month. What is her economic profit?",
            ["$1,500", "$3,500", "−$500", "$0", "$500"], 2,
            "Economic profit = accounting profit − implicit cost = $1,500 − $2,000 = −$500. The forgone $2,000 rent is a real opportunity cost, so she's losing economically despite looking profitable. $1,500 ignores the implicit cost and $3,500 adds it instead of subtracting."),
          q("apm-1-5-q2", "A firm earning zero economic profit is:",
            ["About to shut down", "Covering explicit costs but not implicit costs", "Earning exactly enough to keep its resources in their current use", "Also earning zero accounting profit", "Earning no revenue"], 2,
            "Zero economic profit is normal profit: the firm covers BOTH explicit and implicit costs, so resources earn their next-best return and stay put. There's no reason to shut down, it IS covering implicit costs, its accounting profit is positive (equal to implicit costs), and revenue is clearly positive."),
          q("apm-1-5-q3", "Which is an example of the sunk cost fallacy?",
            ["Dropping a class because future lectures aren't worth the time", "Continuing a failing project because $2 million has already been spent", "Not buying a car because future maintenance is too costly", "Ending a program because future benefits are low", "Selling a stock because future returns look poor"], 1,
            "The fallacy is letting unrecoverable past spending drive the decision — continuing because of the $2 million already spent. Every other option correctly bases the decision on FUTURE costs and benefits."),
          q("apm-1-5-q4", "Revenue = $500,000; Wages = $200,000; Rent = $100,000; Owner's forgone salary = $80,000. What is economic profit?",
            ["$300,000", "$200,000", "$120,000", "$80,000", "$220,000"], 2,
            "Accounting profit = $500,000 − $200,000 − $100,000 = $200,000. Subtract the $80,000 implicit cost: economic profit = $120,000. $200,000 is only the accounting profit, and the others misadd the figures."),
          q("apm-1-5-q5", "Capital goods differ from consumer goods in that capital goods:",
            ["Are always cheaper", "Are used to produce other goods, supporting future growth", "Are final goods bought by households", "Cannot be owned by firms", "Have no opportunity cost"], 1,
            "Capital goods (machines, factories) are used to make other goods, so producing more of them today supports future growth. Consumer goods are the final goods households consume; capital goods aren't defined by price, can be owned by firms, and still carry opportunity cost."),
        ],
      },
    ],
  },

  // ─── 1.6 Marginal Analysis and Consumer Choice ────────────────────
  {
    lessonId: "apm-1-6",
    sections: [
      {
        type: "concept",
        title: "Thinking at the Margin",
        paragraphs: [
          "'Marginal' in economics means 'additional' or 'one more.' Marginal decisions are about the trade-off of doing a little more or a little less — not all-or-nothing.",
          "Marginal benefit (MB) is the benefit of one more unit; marginal cost (MC) is the cost of one more unit. Marginal analysis is simply the study of the additional benefit versus the additional cost of an activity.",
          "The rational decision rule follows directly, and it applies everywhere: how many hours to study, how many workers to hire, how many units to produce, how many slices of pizza to eat.",
        ],
        bullets: [
          "Marginal = one more / additional",
          "Marginal benefit (MB) — benefit from one more unit",
          "Marginal cost (MC) — cost of one more unit",
          "Rule: do it while MB ≥ MC; stop where MB = MC (the optimum)",
        ],
      },
      {
        type: "concept",
        title: "Diminishing Marginal Utility",
        paragraphs: [
          "Utility is the satisfaction you get from a good; marginal utility (MU) is the satisfaction from one more unit.",
          "The Law of Diminishing Marginal Utility says that as you consume more of a good, each additional unit gives LESS extra satisfaction than the one before — the first slice of pizza is amazing, the fifth is just okay.",
          "Watch the wording, a classic AP trap: diminishing marginal utility does NOT mean total utility falls. Total utility keeps RISING as long as marginal utility is positive, and total utility is MAXIMIZED exactly where marginal utility hits zero.",
        ],
        bullets: [
          "Utility = satisfaction; marginal utility = satisfaction from one more unit",
          "Each extra unit adds less satisfaction than the last (diminishing MU)",
          "Total utility rises while MU > 0",
          "Total utility is maximized where MU = 0",
        ],
      },
      {
        type: "concept",
        title: "The Utility-Maximizing Rule",
        paragraphs: [
          "With a limited budget, how should a consumer split spending across goods? Use the utility-maximizing condition (the equimarginal principle).",
          "Allocate spending until the marginal utility per dollar is equal across all goods: MU of A ÷ Price of A = MU of B ÷ Price of B.",
          "If MU/P is higher for one good, you're getting more satisfaction per dollar there, so buy more of it (and less of the other) until the ratios equalize. At that point, no reshuffling of the budget can raise total utility.",
        ],
        bullets: [
          "Utility-maximizing rule: MU_A / P_A = MU_B / P_B for every pair of goods",
          "If MU/P is higher for a good, buy more of it until the ratios meet",
          "At the optimum, every dollar yields the same marginal utility",
        ],
        realWorldExample: "With $12, tacos give 30 utils at $3 each (10 per dollar) and smoothies give 24 utils at $4 each (6 per dollar). You get more satisfaction per dollar from tacos, so buy more tacos until the per-dollar payoff evens out.",
      },
      {
        type: "scenario",
        title: "🎯 Challenge — Marginal Thinking on a Trade",
        narrative: "In the Stock Simulator, pick a stock you already hold and decide whether to buy ONE more share.",
        details: [
          "Estimate the marginal benefit (the additional expected gain from one more share).",
          "Estimate the marginal cost (the share's price plus the added risk/concentration).",
          "Apply the rule: buy only if MB ≥ MC — and notice how each extra share tends to add less diversification benefit (diminishing returns).",
        ],
      },
      {
        type: "recap",
        takeaways: [
          "Marginal means 'one more' — compare MB and MC for the next unit.",
          "Decision rule: do it while MB ≥ MC; the optimum is where MB = MC.",
          "Diminishing marginal utility: each extra unit adds less satisfaction — but total utility still rises while MU > 0.",
          "Total utility is maximized where MU = 0.",
          "Consumers maximize utility by equalizing MU/P across all goods (the equimarginal principle).",
        ],
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          q("apm-1-6-q1", "A rational economic actor will STOP increasing an activity when:",
            ["Total benefit exceeds total cost", "Marginal benefit equals zero", "Marginal cost exceeds marginal benefit", "Total cost reaches its maximum", "Average benefit is maximized"], 2,
            "Decisions are made at the margin: keep going while MB ≥ MC and stop once MC > MB. Total benefit can still exceed total cost past the optimum; waiting for MB = 0 goes too far (past MB = MC); and total cost or average benefit aren't the marginal stopping rule."),
          q("apm-1-6-q2", "A consumer spends her whole budget on A and B. MU of the last unit of A is 40 (price $8); MU of the last unit of B is 30 (price $5). To maximize utility she should:",
            ["Buy more A and less B", "Buy more B and less A", "Keep her current allocation — she's optimizing", "Stop buying both goods", "Buy equal quantities of A and B"], 1,
            "Compare MU per dollar: A = 40/8 = 5; B = 30/5 = 6. B delivers more utility per dollar, so shift toward B until the ratios equalize. Buying more A moves the wrong way, her current mix isn't optimal (ratios differ), and stopping or buying equal amounts ignores the equimarginal rule."),
          q("apm-1-6-q3", "The law of diminishing marginal utility states that:",
            ["Total utility falls as consumption rises", "Marginal utility turns negative right after the first unit", "Each additional unit gives less ADDITIONAL satisfaction than the previous unit", "Marginal utility is zero whenever total utility is positive", "Consumers always prefer variety to quantity"], 2,
            "It's the MARGINAL (additional) satisfaction that declines with each unit — total utility keeps rising while MU is positive. The first option confuses marginal with total, MU usually stays positive for several units, MU = 0 marks the PEAK of total utility, and variety preference is a separate idea."),
          q("apm-1-6-q4", "Total utility is maximized when:",
            ["Marginal utility is at its highest", "Marginal utility equals price", "Marginal utility equals zero", "Average utility equals marginal utility", "Total utility equals total cost"], 2,
            "Total utility peaks where MU = 0; the next unit would carry negative MU and lower the total. Highest MU is typically the first unit, MU = price is a single-good purchase rule, and the last two aren't relevant conditions."),
          q("apm-1-6-q5", "A consumer values the first unit of a good at $10, the second at $7, and the third at $3. The price is $5. How many units should she buy to maximize net benefit?",
            ["0 units", "1 unit", "2 units", "3 units", "4 units"], 2,
            "Buy a unit only while marginal benefit ≥ price ($5). Unit 1: $10 ≥ $5 ✓; unit 2: $7 ≥ $5 ✓; unit 3: $3 < $5 ✗. So 2 units maximizes net benefit — buying the 3rd loses $2 of value, and stopping at 0 or 1 leaves value on the table."),
        ],
      },
    ],
  },
]
