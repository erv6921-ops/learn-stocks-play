import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// GULLIVER INTRO TO BUSINESS — BLOCK 1
// What a business is, and why risk pays (Byrnes Ch. 1)
// Concepts: business, goods-vs-services, entrepreneur, revenue-profit-loss,
//           risk-and-reward, standard-of-living-vs-quality-of-life,
//           stakeholders, outsourcing-insourcing, nonprofits
// Audience: 9th grade
// ═══════════════════════════════════════════════

export const block1: StructuredLessonContent = {
  lessonId: "gulliver-1",
  sections: [
    // ─────────────────────────────────────────────
    // PRE-CLASS PRIMER (~5 min read)
    // ─────────────────────────────────────────────
    {
      type: "concept",
      title: "What a Business Is, and How It Makes or Loses Money",
      paragraphs: [
        "A business is any organization that makes something or does something for other people and gets paid for it. The corner taco truck is a business. So is the company that made your phone, the barber who cut your hair, and the app you played on the bus this morning. If someone is trading a product or a service for money, you are looking at a business.",
        "Businesses sell two kinds of things. A good is something you can touch and keep: a pair of sneakers, a burger, a video game cartridge. A service is work someone does for you that you can't hold in your hand: a haircut, a music streaming subscription, a dog walker, a tutor. Some businesses sell both. A phone store sells you the phone (a good) and also fixes your cracked screen (a service).",
        "Here is the part people mix up the most. Revenue is all the money a business takes in from selling stuff. Profit is what's left after you subtract every cost. If a sneaker reseller sells $1,000 worth of shoes but paid $700 to buy them, plus $50 for shipping, the revenue is $1,000 but the profit is only $250. And if costs are higher than revenue, that's a loss — the business actually ends up with less money than it started with. Big revenue does not mean big profit."
      ],
      bullets: [
        "A business makes or does something for others in exchange for money.",
        "A good is physical (sneakers, food); a service is work done for you (a haircut, streaming).",
        "Revenue = all the money coming in from sales.",
        "Profit = revenue minus all costs; a loss is when costs are bigger than revenue.",
        "A company can have huge revenue and still lose money."
      ],
      realWorldExample: "You buy candy in bulk for $30 and sell it at school for $75. Your revenue is $75, but your profit is $45. If a teacher makes you stop and you'd already spent $30 on candy nobody bought, that $30 is a loss."
    },
    {
      type: "concept",
      title: "Why Anyone Takes the Risk",
      paragraphs: [
        "Someone has to decide to start a business in the first place. That person is an entrepreneur — the one who comes up with the idea, puts their own money and time on the line, and hopes it works. Nobody forces them to. They do it because of risk and reward: risk is the chance of losing what you put in, and reward is the money and freedom you get if it works. The bigger the risk, the bigger the possible reward, but also the bigger the possible fall. An entrepreneur who opens a food truck could make a great living, or could lose their savings if nobody buys.",
        "When a business does well, it doesn't just help the owner. It can raise people's standard of living, which means the amount of stuff and money they can get — nicer food, a car, a phone. But money isn't everything. Quality of life is about how good your life actually feels: free time, health, safety, friends, clean air. A person can have a high standard of living (lots of money and things) and a low quality of life (stressed, exhausted, no time). The two are not the same.",
        "Every business also has stakeholders — anyone affected by what the business does. That includes owners, employees, customers, the neighborhood, and even suppliers. A business chooses where to get its work done, too. Outsourcing means hiring an outside company (sometimes in another country) to do part of the work, like a clothing brand paying a factory overseas to sew shirts. Insourcing is bringing that work back in-house. And not every organization is chasing profit at all: a nonprofit exists to serve a cause — a food bank, an animal shelter, a school club — and any extra money goes back into the mission instead of into an owner's pocket."
      ],
      bullets: [
        "An entrepreneur starts a business and risks their own money and time.",
        "Risk is what you might lose; reward is what you gain if it works — they rise together.",
        "Standard of living = how much you can afford; quality of life = how good life feels.",
        "Stakeholders are everyone affected: owners, workers, customers, the community.",
        "Outsourcing hires outside help; insourcing keeps work in-house; a nonprofit serves a cause, not profit."
      ],
      realWorldExample: "A teen starts a lawn-mowing business. They're the entrepreneur. The gas and a broken mower are the risk; summer cash is the reward. Their customers and the neighbors are stakeholders. If they hire a friend to handle far-away yards, that's outsourcing."
    },
    // ─────────────────────────────────────────────
    // CHECKPOINT A (3 questions) — profit vs. revenue
    // ─────────────────────────────────────────────
    {
      type: "micro-check",
      questions: [
        {
          id: "g1-cpa-1",
          question: "A food truck takes in $2,000 in sales one weekend but spent $1,400 on ingredients, gas, and permits. What is its profit?",
          options: ["$2,000", "$1,400", "$600", "$3,400"],
          correctAnswer: 2,
          explanation: "Profit is revenue minus all costs: $2,000 - $1,400 = $600. The $2,000 is revenue (money coming in), not profit.",
          concept: "revenue-profit-loss"
        },
        {
          id: "g1-cpa-2",
          question: "Which statement is TRUE about revenue and profit?",
          options: [
            "Revenue and profit are just two words for the same thing",
            "A business can have high revenue and still lose money",
            "Profit is always bigger than revenue",
            "Revenue is what's left after paying all costs"
          ],
          correctAnswer: 1,
          explanation: "Revenue is total money in; profit is what remains after costs. If costs are high enough, a business with lots of revenue can still end up with a loss.",
          concept: "revenue-profit-loss"
        },
        {
          id: "g1-cpa-3",
          question: "A reseller buys concert shirts for $600 and sells them all for $500. What happened?",
          options: [
            "They made a $500 profit",
            "They made a $100 profit",
            "They broke even",
            "They took a $100 loss"
          ],
          correctAnswer: 3,
          explanation: "Costs ($600) were higher than revenue ($500), so the business lost money: $500 - $600 = -$100, a loss.",
          concept: "revenue-profit-loss"
        }
      ]
    },
    // ─────────────────────────────────────────────
    // CHECKPOINT B (3 questions) — standard of living vs. quality of life
    // ─────────────────────────────────────────────
    {
      type: "micro-check",
      questions: [
        {
          id: "g1-cpb-1",
          question: "Which of these is mostly about STANDARD of living?",
          options: [
            "How much stuff and money a person can afford",
            "How much free time someone has",
            "How safe a neighborhood feels",
            "How close someone is with their friends"
          ],
          correctAnswer: 0,
          explanation: "Standard of living is about the amount of goods, services, and money you can afford. The others describe quality of life — how good life feels.",
          concept: "standard-of-living-vs-quality-of-life"
        },
        {
          id: "g1-cpb-2",
          question: "A lawyer earns a huge salary but works 80 hours a week, never sees friends, and is always stressed. This is an example of:",
          options: [
            "High standard of living but low quality of life",
            "Low standard of living but high quality of life",
            "Low standard of living and low quality of life",
            "The two always rising together"
          ],
          correctAnswer: 0,
          explanation: "The high salary means a high standard of living, but the stress and lack of free time mean a low quality of life. The two can move in opposite directions.",
          concept: "standard-of-living-vs-quality-of-life"
        },
        {
          id: "g1-cpb-3",
          question: "Which change would improve quality of life WITHOUT necessarily raising standard of living?",
          options: [
            "Getting a raise at work",
            "Buying a bigger house",
            "A city adding safe parks and cleaner air",
            "Being able to afford a nicer car"
          ],
          correctAnswer: 2,
          explanation: "Safer parks and cleaner air make daily life feel better (quality of life) without adding to how much money or stuff you can buy (standard of living).",
          concept: "standard-of-living-vs-quality-of-life"
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
          id: "g1-exit-1",
          question: "Which of these is a SERVICE rather than a good?",
          options: [
            "A pair of headphones",
            "A haircut",
            "A slice of pizza",
            "A video game disc"
          ],
          correctAnswer: 1,
          explanation: "A haircut is work done for you that you can't hold — a service. The others are physical things you keep, which are goods.",
          concept: "goods-vs-services"
        },
        {
          id: "g1-exit-2",
          question: "Why do entrepreneurs accept the risk of starting a business?",
          options: [
            "The law requires everyone to start a business",
            "Because there is no chance they can lose money",
            "Because bigger risk comes with the chance of a bigger reward",
            "Because businesses never fail"
          ],
          correctAnswer: 2,
          explanation: "Entrepreneurs take on risk hoping for reward. Risk and reward rise together — the chance of losing is real, but so is the chance of a big payoff.",
          concept: "risk-and-reward"
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
          id: "g1-prac-1",
          question: "What is the simplest definition of a business?",
          options: [
            "Any group of friends who hang out",
            "An organization that makes or does something for others in exchange for money",
            "A building downtown with an office in it",
            "A place where only rich people work"
          ],
          correctAnswer: 1,
          explanation: "A business provides a good or service to others and gets paid for it. Size and location don't decide whether something is a business.",
          concept: "business"
        },
        {
          id: "g1-prac-2",
          question: "Which pairing correctly labels a good and a service?",
          options: [
            "Sneakers = service; dog walking = good",
            "A burger = good; a streaming subscription = service",
            "A haircut = good; a phone = service",
            "Both a burger and a haircut are goods"
          ],
          correctAnswer: 1,
          explanation: "A burger is a physical good; a streaming subscription is a service (work/access provided to you). Goods you can hold; services you can't.",
          concept: "goods-vs-services"
        },
        {
          id: "g1-prac-3",
          question: "A bakery brings in $4,000 in sales but spends $4,300 on flour, rent, and workers. This is a:",
          options: ["Profit of $300", "Loss of $300", "Profit of $4,000", "Break-even"],
          correctAnswer: 1,
          explanation: "Costs ($4,300) are higher than revenue ($4,000), so the bakery lost $300 that month.",
          concept: "revenue-profit-loss"
        },
        {
          id: "g1-prac-4",
          question: "Who is the entrepreneur in this story: Ana comes up with an idea for a phone-case brand, spends her savings to make the first batch, and hires her cousin to help ship orders?",
          options: ["Ana's cousin", "Ana", "The shipping company", "The customers"],
          correctAnswer: 1,
          explanation: "Ana came up with the idea and put her own money and time at risk. That makes her the entrepreneur; her cousin is an employee.",
          concept: "entrepreneur"
        },
        {
          id: "g1-prac-5",
          question: "A skate brand could either open a $5,000 pop-up shop (which might flop or might sell out) or keep quietly selling online. Choosing the pop-up is an example of taking on more:",
          options: ["Revenue", "Stakeholders", "Risk for a bigger possible reward", "Quality of life"],
          correctAnswer: 2,
          explanation: "The pop-up risks $5,000 but offers a bigger possible payoff. That's the risk-and-reward trade-off entrepreneurs weigh.",
          concept: "risk-and-reward"
        },
        {
          id: "g1-prac-6",
          question: "Which situation best shows a HIGH standard of living but LOW quality of life?",
          options: [
            "A person with little money but lots of free time and close friends",
            "A person with a big paycheck who is constantly stressed and never rests",
            "A person who is both broke and unhappy",
            "A person with plenty of money and plenty of free time"
          ],
          correctAnswer: 1,
          explanation: "A big paycheck is a high standard of living; constant stress and no rest is a low quality of life. The two can pull in opposite directions.",
          concept: "standard-of-living-vs-quality-of-life"
        },
        {
          id: "g1-prac-7",
          question: "A shoe company decides where its shoes are cut and sewn. Which stakeholders are affected by that decision?",
          options: [
            "Only the company's owner",
            "Only the customers",
            "Owners, workers, customers, and the communities near the factories",
            "Nobody — business decisions affect no one"
          ],
          correctAnswer: 2,
          explanation: "Stakeholders are everyone affected by a business's actions — here that includes owners, workers, customers, and the surrounding communities.",
          concept: "stakeholders"
        },
        {
          id: "g1-prac-8",
          question: "A clothing brand pays a factory in another country to sew its shirts instead of hiring its own sewers. This is called:",
          options: ["Insourcing", "Outsourcing", "A nonprofit", "A loss"],
          correctAnswer: 1,
          explanation: "Hiring an outside company to do part of the work — often overseas — is outsourcing. Bringing that work back in-house would be insourcing.",
          concept: "outsourcing-insourcing"
        },
        {
          id: "g1-prac-9",
          question: "What makes a nonprofit different from a regular business?",
          options: [
            "A nonprofit is never allowed to have any money",
            "A nonprofit exists to serve a cause, and extra money goes back into the mission instead of to an owner",
            "A nonprofit sells only services, never goods",
            "A nonprofit has no stakeholders"
          ],
          correctAnswer: 1,
          explanation: "Nonprofits (like a food bank or animal shelter) chase a mission, not owner profit. Leftover money is reinvested in the cause.",
          concept: "nonprofits"
        },
        {
          id: "g1-prac-10",
          question: "A juice stand sells $500 of smoothies and paid $200 for fruit, cups, and ice. Its profit is:",
          options: ["$700", "$500", "$300", "$200"],
          correctAnswer: 2,
          explanation: "Profit = revenue minus costs: $500 - $200 = $300.",
          concept: "revenue-profit-loss"
        },
        {
          id: "g1-prac-11",
          question: "Which of these is a nonprofit's main goal?",
          options: [
            "Making the owner as rich as possible",
            "Serving a cause, like feeding people or rescuing animals",
            "Charging the highest prices possible",
            "Avoiding all stakeholders"
          ],
          correctAnswer: 1,
          explanation: "A nonprofit is built around a mission or cause rather than making an owner wealthy.",
          concept: "nonprofits"
        },
        {
          id: "g1-prac-12",
          question: "Which is the BEST example of a business selling both a good AND a service?",
          options: [
            "A vending machine that only dispenses soda",
            "A phone store that sells phones and also repairs cracked screens",
            "A babysitter who watches kids",
            "A website that only streams movies"
          ],
          correctAnswer: 1,
          explanation: "The phone store sells a physical product (the phone, a good) and also performs work (screen repair, a service).",
          concept: "goods-vs-services"
        },
        {
          id: "g1-prac-13",
          question: "A company that had been paying an overseas call center decides to build its own support team at home instead. This move is:",
          options: ["Outsourcing", "Insourcing", "A loss", "A nonprofit"],
          correctAnswer: 1,
          explanation: "Bringing work back in-house rather than hiring outside is insourcing — the opposite of outsourcing.",
          concept: "outsourcing-insourcing"
        },
        {
          id: "g1-prac-14",
          question: "An entrepreneur opens a boba shop knowing it might fail. Which statement about their risk and reward is correct?",
          options: [
            "If they took a big risk, there was no chance of any reward",
            "Taking a bigger risk usually means the possible reward is bigger too",
            "Reward is guaranteed the moment you open a business",
            "Risk only exists for nonprofits"
          ],
          correctAnswer: 1,
          explanation: "Risk and reward move together. A bigger bet (like opening a shop) carries both a bigger chance of loss and a bigger possible payoff.",
          concept: "risk-and-reward"
        }
      ]
    }
  ]
}
