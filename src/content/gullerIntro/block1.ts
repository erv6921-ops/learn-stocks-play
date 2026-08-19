import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// GULLIVER INTRO TO BUSINESS, UNIT 1, split into FIVE short, deep lessons so
// each important idea gets its own focused session (~8 teaching beats):
//   1.1  What a Business Is and What It Sells   (business, goods-vs-services)
//   1.2  Revenue, Costs, Profit & Loss          (revenue-profit-loss)
//   1.3  Entrepreneurs, Risk & Reward           (entrepreneur, risk-and-reward)
//   1.4  Living Standards & Stakeholders        (standard-of-living-vs-quality-of-life, stakeholders)
//   1.5  Outsourcing, Insourcing & Nonprofits   (outsourcing-insourcing, nonprofits)
// Audience: 9th grade. Key terms wrapped in **…** render green.
// ═══════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// LESSON 1.1: What a Business Is and What It Sells
// ─────────────────────────────────────────────────────────────
export const block1a: StructuredLessonContent = {
  lessonId: "gulliver-1-1",
  sections: [
    {
      type: "concept",
      title: "What a Business Really Is, and Why It Exists",
      paragraphs: [
        "A **business** is an organization that provides **goods** or **services** to other people in order to earn money. That short definition hides the important part: a business only survives if it gives people something they actually want or need. Nobody has to buy from you. So every business, from a taco truck to the company that built your phone, is really answering one question over and over. What do people want badly enough to pay for? When the answer is good, customers come back; when it's wrong, the business disappears. That constant pressure to be useful is what separates a business from a hobby.",
        "The 'something' a business provides comes in two forms, and the difference matters more than it first looks. A **good** is a physical, tangible item you can hold, own, and keep, such as sneakers, a burger, or a phone. A **service** is work or expertise performed for you that you cannot hold, like a haircut, a streaming subscription, a tutor, or a ride across town. Services have two tricky features: they're **intangible** (you can't inspect one before it's done), and they're often **perishable** (an empty seat on a bus or an unbooked appointment is value that vanishes forever). That's why services lean so heavily on trust and reputation.",
        "In the real world the line blurs, and smart businesses blur it on purpose. A phone store sells you the phone (a good) and also fixes your cracked screen (a service). A restaurant sells food (a good) but also the experience of being served (a service). Bundling a good with a service is a common way to stand out, because the service is much harder for a competitor to copy than the product itself.",
        "Businesses matter because they're how a society turns raw resources into things people can actually use. A farmer's wheat, a designer's idea, and a worker's time are worth little sitting apart; a business is the machine that combines them into bread on a shelf. Economists call the value a business adds **utility**. Creating utility, whether that means making something more useful or getting it to the right place at the right time, is the real product of every business, whether it sells goods, services, or both."
      ],
      bullets: [
        "Business = providing goods or services to others to earn money, and it only lasts if it stays useful.",
        "A good is tangible and ownable; a service is intangible work, and it's often perishable.",
        "Many businesses bundle a good with a service because the service is harder to copy.",
        "Businesses create 'utility': they turn separate resources into something people can actually use."
      ],
      realWorldExample: "A sneaker brand doesn't just sell shoes (a good). It also offers fast shipping, easy returns, and a members-only app (services). A rival can copy the shoe design in a season, but the trusted service and community are far harder to steal, which is often where the real advantage lives."
    },
    {
      type: "micro-check",
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
          id: "g1-prac-12",
          question: "Which is the BEST example of a business selling both a good AND a service?",
          options: [
            "A vending machine that only dispenses cans of soda to buyers",
            "A phone store that sells phones and also repairs cracked screens",
            "A babysitter who only watches kids while their parents are away",
            "A website that only streams movies you can watch online"
          ],
          correctAnswer: 1,
          explanation: "The phone store sells a physical product (the phone, a good) and also performs work (screen repair, a service).",
          concept: "goods-vs-services"
        }
      ]
    },
    {
      type: "scenario",
      title: "Two Weekend Hustles",
      narrative: "Two friends each start something over the summer. Maria buys a bubble-tea cart and sells drinks at the park. Devon starts a phone-repair service, fixing cracked screens at people's homes. Both take in money, but what they actually sell is different, and that difference shapes how each business works.",
      details: [
        "Maria sells a good: a physical bubble tea the customer holds, keeps, and drinks.",
        "Devon sells a service: the work of repairing a screen, which can't be held or resold.",
        "If Maria doesn't sell a drink today, she can still use the ingredients tomorrow. If Devon has no bookings, that hour of his time is gone forever, because a service is perishable.",
        "Both are real businesses, because both provide something people will pay for."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "g1a-aq1",
        question: "Why is an unbooked hour a bigger loss for Devon's repair service than an unsold drink is for Maria's cart?",
        options: [
          "Because Devon's business isn't a real business",
          "Because a service is perishable: unused time can't be saved, while unsold ingredients can be used later",
          "Because goods are always worth more than services",
          "Because Maria simply has more customers"
        ],
        correctAnswer: 1,
        explanation: "A service is perishable: Devon's unused hour is gone for good. Maria's unsold ingredients are a storable good she can still use tomorrow.",
        concept: "goods-vs-services"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 2,
      questions: [
        {
          id: "g1-exit-1",
          question: "Which of these is a SERVICE rather than a good?",
          options: ["A pair of headphones", "A haircut", "A slice of pizza", "A video game disc"],
          correctAnswer: 1,
          explanation: "A haircut is work done for you that you can't hold, which makes it a service. The others are physical things you keep, which are goods.",
          concept: "goods-vs-services"
        },
        {
          id: "g1a-exit-2",
          question: "Why does a business have to keep being useful to survive?",
          options: [
            "Because the government assigns each business its customers",
            "Because nobody is forced to buy from it, so it only earns money if people want what it offers",
            "Because businesses are not allowed to make a profit",
            "Because usefulness has nothing to do with staying in business"
          ],
          correctAnswer: 1,
          explanation: "Customers choose freely. A business earns money only by giving people something they actually want or need, and that pressure to stay useful is what keeps it alive.",
          concept: "business"
        }
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 5,
      questions: [
        {
          id: "g1a-p1",
          question: "A student charges neighbors to walk their dogs after school. Is this a business?",
          options: [
            "No, because it's done by a student",
            "Yes, it provides a service to others in exchange for money",
            "No, because dog walking isn't a real job",
            "Only if it happens inside a store"
          ],
          correctAnswer: 1,
          explanation: "Providing a service (dog walking) to others for money is exactly what a business is, no matter who runs it or where.",
          concept: "business"
        },
        {
          id: "g1a-p2",
          question: "What mainly decides whether a business keeps its customers?",
          options: [
            "Whether it gives people something they actually want or need",
            "Whether its logo is a certain color",
            "Whether the owner is famous",
            "Whether it has a downtown address"
          ],
          correctAnswer: 0,
          explanation: "Customers buy freely, so a business keeps them only by staying genuinely useful, providing something people want enough to pay for.",
          concept: "business"
        },
        {
          id: "g1a-p3",
          question: "Which of these is a GOOD?",
          options: ["A ride share across town", "A pair of basketball shoes", "A month of music streaming", "A tutoring session"],
          correctAnswer: 1,
          explanation: "Basketball shoes are a physical item you can hold, own, and keep, which makes it a good. The others are work or access provided to you (services).",
          concept: "goods-vs-services"
        },
        {
          id: "g1a-p4",
          question: "Which of these is a SERVICE?",
          options: ["A bottle of shampoo", "A frozen pizza", "A haircut at a salon", "A phone charger"],
          correctAnswer: 2,
          explanation: "A haircut is work performed for you that you can't hold, which makes it a service. The rest are tangible goods.",
          concept: "goods-vs-services"
        },
        {
          id: "g1a-p5",
          question: "Which feature is TRUE of a service but not a physical good?",
          options: [
            "You can hold it in your hand before buying",
            "It is often perishable: an unbooked appointment or empty seat is value gone forever",
            "It can be stacked in a warehouse for years",
            "It can be re-sold used, unopened"
          ],
          correctAnswer: 1,
          explanation: "Services are intangible and often perishable: time or a seat that goes unused can't be saved for later, unlike goods sitting on a shelf.",
          concept: "goods-vs-services"
        },
        {
          id: "g1a-p6",
          question: "Why do many businesses bundle a service with the good they sell?",
          options: [
            "Because services are illegal to sell alone",
            "Because a good service (support, returns, experience) is harder for rivals to copy than the product itself",
            "Because bundling always lowers their costs to zero",
            "Because customers dislike buying products"
          ],
          correctAnswer: 1,
          explanation: "A competitor can copy a product quickly, but trusted service and experience are much harder to imitate, so bundling helps a business stand out.",
          concept: "goods-vs-services"
        },
        {
          id: "g1a-p7",
          question: "Economists say a business creates 'utility.' What does that mean?",
          options: [
            "It pays the electric and water bills",
            "It makes something more useful, or gets it to the right place and time, so people can actually use it",
            "It uses as many resources as possible",
            "It keeps its products locked away"
          ],
          correctAnswer: 1,
          explanation: "Utility is the added usefulness a business creates by turning separate resources (materials, ideas, labor) into something people can actually use.",
          concept: "business"
        },
        {
          id: "g1a-p8",
          question: "What is the clearest difference between a business and a hobby?",
          options: [
            "A hobby is always more fun",
            "A business provides goods or services to others for money and must stay useful to survive",
            "A business must have employees, while a hobby never does",
            "There is no real difference between a business and a hobby"
          ],
          correctAnswer: 1,
          explanation: "The defining feature of a business is providing something others will pay for and needing to stay useful to keep earning; a hobby has no such requirement.",
          concept: "business"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LESSON 1.2: Revenue, Costs, Profit & Loss
// ─────────────────────────────────────────────────────────────
export const block1b: StructuredLessonContent = {
  lessonId: "gulliver-1-2",
  sections: [
    {
      type: "concept",
      title: "How a Business Keeps Score: Revenue, Costs, Profit, and Loss",
      paragraphs: [
        "To know whether a business is actually working, you have to follow the money, and the single most confused pair of words in all of business is revenue versus profit. **Revenue** (also called sales) is the total money that comes in from selling, before anything is subtracted. Sell 100 smoothies at $5 each and your revenue is $500. Revenue measures how much you *sold*, not how much you *kept*.",
        "**Costs** are everything you have to pay to run the business: ingredients, rent, wages, shipping, equipment, permits. **Profit** is what's left after you subtract all of those costs from revenue: **Profit = Revenue - Costs**. If those 100 smoothies cost you $320, your profit is $180. If costs are higher than revenue, the number goes negative, and that's a **loss**, meaning the business ended up with less money than it started with.",
        "This is why a business can have huge revenue and still be losing money. A company that rings up millions in sales but spends even more to make them is running a loss, which is the trap that sinks fast-growing businesses that 'bleed cash.' Big revenue is not the same as being healthy; only profit tells you that.",
        "There are exactly two ways to raise profit: bring in more revenue (sell more, or charge more) or cut costs (spend less making each sale). Smart owners watch both. And profit isn't just 'greed'; it's a **signal**: steady profit tells the owner customers value this more than it costs to provide, so it's worth continuing; a loss is a warning to change something. Profit earned can be reinvested to grow, saved as a cushion, or paid back to the owner for the risk they took."
      ],
      bullets: [
        "Revenue = total money in from sales, before costs (how much you sold).",
        "Costs = everything you pay to operate; Profit = Revenue - Costs.",
        "A negative result is a loss: high revenue with even higher costs still loses money.",
        "Two ways to raise profit: increase revenue or cut costs.",
        "Profit is also a signal that a business is worth continuing, and it funds growth."
      ],
      realWorldExample: "You buy candy in bulk for $30 and sell it for $75, giving revenue of $75 and profit of $45. Now imagine you'd bought $90 of candy and sold $75: still $75 in revenue, but a $15 loss. The revenue looked identical; the profit told the truth."
    },
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
    {
      type: "scenario",
      title: "The Food-Truck Weekend",
      narrative: "Sofia runs a taco truck. Over one busy festival weekend she rings up $3,000 in sales and is thrilled, until she sits down to add up what the weekend actually cost her.",
      details: [
        "Sofia's **revenue** was $3,000, the total money customers paid her.",
        "Her **costs**: $1,200 for ingredients, $600 to rent the festival spot, $400 for gas and propane, and $300 to pay a helper.",
        "That's $2,500 in total costs, so her **profit** was $3,000 - $2,500 = $500.",
        "The giant $3,000 number felt like the whole story, but the $500 profit is what she actually gets to keep."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "g1b-aq1",
        question: "Sofia took in $3,000 but kept only $500. What does that gap show?",
        options: [
          "Her revenue was actually only $500, not the full $3,000",
          "Revenue is money in; profit is what's left after costs",
          "She must have lost $2,500 of it somewhere to theft",
          "Profit is always a larger number than the revenue itself"
        ],
        correctAnswer: 1,
        explanation: "Revenue ($3,000) is total sales. After $2,500 in costs, her profit is $500. Big revenue doesn't mean big profit.",
        concept: "revenue-profit-loss"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 2,
      questions: [
        {
          id: "g12-exit1",
          question: "In one sentence, what's the difference between revenue and profit?",
          options: [
            "Revenue is all the money that comes in; profit is what's left after subtracting costs",
            "Revenue is what's left after costs; profit is total sales",
            "They mean exactly the same thing",
            "Profit is money in; revenue is money out"
          ],
          correctAnswer: 0,
          explanation: "Revenue = total sales (money in). Profit = revenue minus every cost. Profit is always the smaller, more honest number.",
          concept: "revenue-profit-loss"
        },
        {
          id: "g12-exit2",
          question: "A business has a 'loss.' What does that mean?",
          options: [
            "It sold nothing at all",
            "Its costs were greater than its revenue, so it ended with less money than it started",
            "It made a small profit",
            "It paid its taxes"
          ],
          correctAnswer: 1,
          explanation: "A loss is a negative profit: costs came out higher than revenue, so the business actually lost money over that period.",
          concept: "revenue-profit-loss"
        }
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 5,
      questions: [
        {
          id: "g1-prac-3",
          question: "A bakery brings in $4,000 in sales but spends $4,300 on flour, rent, and workers. This is a:",
          options: ["Profit of $300", "Loss of $300", "Profit of $4,000", "Break-even"],
          correctAnswer: 1,
          explanation: "Costs ($4,300) are higher than revenue ($4,000), so the bakery lost $300 that month.",
          concept: "revenue-profit-loss"
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
          id: "g12-p1",
          question: "A shop sells 40 hoodies at $25 each. What is its revenue?",
          options: ["$25", "$65", "$1,000", "It depends on the cost of the hoodies"],
          correctAnswer: 2,
          explanation: "Revenue is price × quantity: 40 × $25 = $1,000. Costs aren't part of revenue; they come out later to find profit.",
          concept: "revenue-profit-loss"
        },
        {
          id: "g12-p2",
          question: "Two food trucks both had $5,000 in revenue. Truck A spent $3,000; Truck B spent $4,800. Which did better, and why?",
          options: [
            "They did equally well, with the same revenue",
            "Truck A, because same revenue but lower costs means more profit ($2,000 vs $200)",
            "Truck B, because higher costs means a bigger business",
            "You can't tell without knowing their prices"
          ],
          correctAnswer: 1,
          explanation: "Equal revenue doesn't mean equal profit. Truck A kept $2,000; Truck B kept only $200. Lower costs on the same sales means more profit.",
          concept: "revenue-profit-loss"
        },
        {
          id: "g12-p3",
          question: "A business wants to raise its profit. Which of these would work?",
          options: [
            "Only raising revenue can ever increase profit",
            "Either bringing in more revenue OR cutting its costs",
            "Only cutting costs can ever increase profit",
            "Nothing a business does can change its profit"
          ],
          correctAnswer: 1,
          explanation: "Profit = Revenue - Costs, so you can raise profit from either side: sell more (or charge more), or spend less per sale.",
          concept: "revenue-profit-loss"
        },
        {
          id: "g12-p4",
          question: "A clothing brand posts record revenue but announces it lost money this year. How is that possible?",
          options: [
            "Record revenue always means record profit (this is a mistake)",
            "Its costs (making, shipping, ads) were even higher than that record revenue",
            "Revenue and profit are the same, so it can't be true",
            "The company forgot to count its sales"
          ],
          correctAnswer: 1,
          explanation: "High revenue with even higher costs is a loss. This is exactly why revenue alone can't tell you if a business is healthy.",
          concept: "revenue-profit-loss"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LESSON 1.3: Entrepreneurs, Risk & Reward
// ─────────────────────────────────────────────────────────────
export const block1c: StructuredLessonContent = {
  lessonId: "gulliver-1-3",
  sections: [
    {
      type: "concept",
      title: "The Person Who Bets on the Idea",
      paragraphs: [
        "Someone has to start a business in the first place: come up with the idea, gather the money and people, and accept that it might fail. That person is the **entrepreneur**. Their real contribution isn't just 'having an idea.' It's organizing resources (money, workers, equipment) into a working business, and then personally carrying the risk if it flops. That risk-bearing is the actual job.",
        "Here's the sharpest way to see it: an employee gets paid whether the company has a good month or a bad one. The entrepreneur **gets paid last**, and only if there's money left after every cost is covered. When times are bad, everyone else still gets a paycheck, while the owner might get nothing, or lose money they already put in.",
        "That's why **risk** and **reward** always travel together. Risk is the chance of losing what you put in: your savings, your time, and your **opportunity cost** (the paycheck or plans you gave up to do this instead). Reward is what you gain if it works: profit, independence, and something that's truly yours.",
        "And they rise together for a logical reason, not by accident. If some venture were both totally safe AND highly profitable, everyone would rush in, compete, and drive the easy money away, so it wouldn't stay safe-and-rich for long. Bigger potential rewards almost always sit behind bigger risks. That trade-off is the heart of every decision an entrepreneur makes."
      ],
      bullets: [
        "The **entrepreneur** organizes the resources and personally bears the risk, and that's the job, not just the idea.",
        "Employees get paid regardless; the entrepreneur gets paid last, only if money remains.",
        "**Risk** = what you might lose (savings, time, opportunity cost); **reward** = what you gain if it works.",
        "Risk and reward rise together, because easy, safe profit gets competed away."
      ],
      realWorldExample: "A teen quits their steady $15/hr summer job to run a sneaker-customizing business. The lost paycheck is their opportunity cost; the money for supplies is at risk. If it flops they're out both. If it takes off, they keep every dollar of profit, which is the reward they were betting on."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "g1-prac-4",
          question: "Who is the entrepreneur here: Ana comes up with an idea for a phone-case brand, spends her savings to make the first batch, and hires her cousin to help ship orders?",
          options: ["Ana's cousin", "Ana", "The shipping company", "The customers"],
          correctAnswer: 1,
          explanation: "Ana came up with the idea and put her own money and time at risk. That makes her the entrepreneur; her cousin is an employee.",
          concept: "entrepreneur"
        },
        {
          id: "g13-cp2",
          question: "Why is it said that the entrepreneur 'gets paid last'?",
          options: [
            "The law requires owners to be paid last",
            "They keep only what's left after all costs, and nothing if there's a loss",
            "Banks hold the owner's money for a year",
            "Employees refuse to let the owner get paid"
          ],
          correctAnswer: 1,
          explanation: "Employees are paid whether the business profits or not. The entrepreneur takes whatever is left over, which is why they carry the risk.",
          concept: "entrepreneur"
        },
        {
          id: "g1-prac-5",
          question: "A skate brand could open a $5,000 pop-up shop (which might flop or sell out) or keep quietly selling online. Choosing the pop-up takes on more:",
          options: ["Revenue", "Stakeholders", "Risk for a bigger possible reward", "Quality of life"],
          correctAnswer: 2,
          explanation: "The pop-up risks $5,000 but offers a bigger possible payoff. That's the risk-and-reward trade-off entrepreneurs weigh.",
          concept: "risk-and-reward"
        }
      ]
    },
    {
      type: "scenario",
      title: "Jordan's Big Decision",
      narrative: "Jordan, 17, has a steady after-school job earning $200 a week. A local market offers a booth where Jordan could sell custom hoodies, but the booth, blank hoodies, and printing supplies would cost $1,500 up front, and Jordan would have to quit the job to have time for it. Nobody knows yet if the hoodies will sell.",
      details: [
        "The $1,500 for supplies is money Jordan puts at **risk**, and it's gone if nobody buys.",
        "Quitting the $200/week job is Jordan's **opportunity cost**, the sure money given up to chase this.",
        "By organizing the supplies, booth, and their own time into a business, Jordan becomes the **entrepreneur**.",
        "If the hoodies sell out, Jordan keeps all the profit; if they don't, Jordan carries the whole loss. That's the **reward** and the risk, together."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "g13-aq1",
        question: "What is Jordan's 'opportunity cost' in this decision?",
        options: [
          "The $1,500 spent on supplies",
          "The steady $200-a-week job given up to have time for the hoodie business",
          "The profit the hoodies might earn",
          "The cost of the market booth only"
        ],
        correctAnswer: 1,
        explanation: "Opportunity cost is the next-best thing you give up. For Jordan that's the reliable $200/week paycheck sacrificed to pursue the business.",
        concept: "risk-and-reward"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 2,
      questions: [
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
          explanation: "Entrepreneurs take on risk hoping for reward. Risk and reward rise together: the chance of losing is real, but so is the chance of a big payoff.",
          concept: "risk-and-reward"
        },
        {
          id: "g13-exit2",
          question: "What is an entrepreneur's main contribution to a business?",
          options: [
            "Doing all the physical labor personally",
            "Organizing the resources into a working business and bearing the risk if it fails",
            "Guaranteeing the business can never lose money",
            "Making sure employees are paid before anyone else"
          ],
          correctAnswer: 1,
          explanation: "The entrepreneur pulls the money, people, and equipment together and shoulders the risk, and that organizing-and-risk-bearing role is the job.",
          concept: "entrepreneur"
        }
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 4,
      questions: [
        {
          id: "g1-prac-14",
          question: "An entrepreneur opens a boba shop knowing it might fail. Which statement about risk and reward is correct?",
          options: [
            "If they took a big risk, there was no chance of any reward",
            "Taking a bigger risk usually means the possible reward is bigger too",
            "Reward is guaranteed the moment you open a business",
            "Risk only exists for nonprofits"
          ],
          correctAnswer: 1,
          explanation: "Risk and reward move together. A bigger bet carries both a bigger chance of loss and a bigger possible payoff.",
          concept: "risk-and-reward"
        },
        {
          id: "g13-p1",
          question: "Why can't a business usually be both totally safe AND hugely profitable for long?",
          options: [
            "The government caps how much profit is allowed",
            "If it were, everyone would rush in and compete the easy money away",
            "Safe businesses are against the law",
            "Profit and safety have nothing to do with each other"
          ],
          correctAnswer: 1,
          explanation: "Easy, safe profit attracts competition, which drives that profit down. That's why bigger rewards tend to sit behind bigger risks.",
          concept: "risk-and-reward"
        },
        {
          id: "g13-p2",
          question: "During a bad month, who is most likely to earn nothing?",
          options: [
            "The employees, who are paid last",
            "The entrepreneur, who only keeps what's left after costs",
            "The customers",
            "Everyone is always paid the same amount"
          ],
          correctAnswer: 1,
          explanation: "Employees get their wages regardless. The entrepreneur is paid last and may get nothing, or even lose money, in a bad stretch.",
          concept: "entrepreneur"
        },
        {
          id: "g13-p3",
          question: "'Opportunity cost' when starting a business means:",
          options: [
            "The taxes you owe on profit",
            "The next-best thing you gave up, like a steady paycheck, to pursue the business",
            "The cost of buying supplies",
            "The reward you earn if it succeeds"
          ],
          correctAnswer: 1,
          explanation: "Opportunity cost is the value of what you gave up. For a new entrepreneur it's often the reliable income or time they sacrificed.",
          concept: "risk-and-reward"
        },
        {
          id: "g13-p4",
          question: "Which person is acting as an entrepreneur?",
          options: [
            "A cashier ringing up sales at a store they don't own",
            "Someone who invests their savings to open a food cart and runs it, keeping the profit or the loss",
            "A delivery driver paid by the hour",
            "A customer buying lunch"
          ],
          correctAnswer: 1,
          explanation: "The entrepreneur puts their own money and time at risk to start and run the business, and takes the profit or loss. The others are paid workers or buyers.",
          concept: "entrepreneur"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LESSON 1.4: Living Standards & Stakeholders
// ─────────────────────────────────────────────────────────────
export const block1d: StructuredLessonContent = {
  lessonId: "gulliver-1-4",
  sections: [
    {
      type: "concept",
      title: "Two Ways to Measure a Better Life",
      paragraphs: [
        "When businesses succeed on a large scale, they raise the **standard of living**, meaning the quantity of goods and services people can afford. More jobs, cheaper phones, better food, reliable cars: that's a rising standard of living, and it's usually measured in money and stuff.",
        "But money and stuff aren't the whole story. **Quality of life** is how good life actually *feels*: your free time, health, safety, relationships, and environment. It's harder to put a number on, but it's just as real.",
        "The key insight is that these two can move in *opposite directions*. A person can get a huge raise (standard of living up) but work 80-hour weeks and never see friends (quality of life down). A country can grow richer while its cities get more polluted and stressful. That's why smart decisions weigh both: a change that buys more things but costs you your health or time isn't always a win.",
        "Businesses also affect far more people than just their owner. A company's **stakeholders** are everyone touched by what it does: owners, employees, customers, suppliers, the surrounding community, and the government. The tricky part is that their interests often *compete*: customers want low prices, workers want high wages, owners want profit, neighbors want no pollution. Running a business well means constantly balancing these groups, because a decision that helps one can hurt another."
      ],
      bullets: [
        "**Standard of living** = how many goods and services you can afford (money and stuff).",
        "**Quality of life** = how good life feels (time, health, safety, relationships).",
        "The two can move in opposite directions, so richer isn't automatically better.",
        "**Stakeholders** are everyone a business affects; their interests often compete, so the owner must balance them."
      ],
      realWorldExample: "A factory that pays great wages (raising workers' standard of living) but pollutes the river hurts the community's quality of life. The workers, neighbors, owners, and local government are all stakeholders, and their interests pull in different directions."
    },
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
          explanation: "Standard of living is about the amount of goods, services, and money you can afford. The others describe quality of life, meaning how good life feels.",
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
    {
      type: "scenario",
      title: "The New Warehouse Next Door",
      narrative: "A big online retailer wants to build a warehouse on the edge of a small town. It would bring 400 jobs and cheaper delivery, but also heavy truck traffic, noise, and pollution. The town holds a meeting, and very different groups show up to speak.",
      details: [
        "Workers who'd get hired want the jobs, a boost to their **standard of living**.",
        "Neighbors worry about traffic, noise, and air quality, which is their **quality of life**.",
        "The company (owner) wants the profit; shoppers want the faster, cheaper delivery.",
        "Every one of these groups (workers, neighbors, owners, shoppers, the town government) is a **stakeholder**, and their interests don't all line up."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "g14-aq1",
        question: "The warehouse decision is hard mainly because:",
        options: [
          "Only the company owner is affected by it",
          "Its stakeholders have competing interests: jobs and cheap delivery for some, noise and pollution for others",
          "Warehouses are illegal near towns",
          "Nobody in the town cares either way"
        ],
        correctAnswer: 1,
        explanation: "A business decision has many stakeholders whose interests compete. Balancing jobs and profit against the community's quality of life is exactly what makes it hard.",
        concept: "stakeholders"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 2,
      questions: [
        {
          id: "g14-exit1",
          question: "Who counts as a business's 'stakeholders'?",
          options: [
            "Only the people who own it",
            "Everyone it affects: owners, employees, customers, suppliers, the community, and the government",
            "Only its paying customers",
            "Only the government that taxes it"
          ],
          correctAnswer: 1,
          explanation: "Stakeholders are all the groups touched by a business's actions, not just the owners, which is why decisions ripple far beyond one person.",
          concept: "stakeholders"
        },
        {
          id: "g14-exit2",
          question: "How can standard of living and quality of life move in OPPOSITE directions?",
          options: [
            "They can't, because more money always means a better life",
            "Someone can earn much more (standard of living up) while becoming stressed, unhealthy, or time-starved (quality of life down)",
            "They are just two names for the same thing",
            "Quality of life is only about money"
          ],
          correctAnswer: 1,
          explanation: "More money and stuff (standard of living) doesn't guarantee a life that feels better (quality of life); the two can pull apart.",
          concept: "standard-of-living-vs-quality-of-life"
        }
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 4,
      questions: [
        {
          id: "g1-prac-6",
          question: "Which situation best shows a LOW standard of living but a HIGH quality of life?",
          options: [
            "A person with a big paycheck who is always stressed and exhausted",
            "A person with little money but lots of free time, good health, and close friends",
            "A person who is both wealthy and relaxed",
            "A person who is both broke and miserable"
          ],
          correctAnswer: 1,
          explanation: "Little money means a low standard of living, but free time, health, and strong relationships can still add up to a high quality of life, so the two don't always move together.",
          concept: "standard-of-living-vs-quality-of-life"
        },
        {
          id: "g1-prac-7",
          question: "A shoe company decides where its shoes are cut and sewn. Which stakeholders are affected by that decision?",
          options: [
            "Only the company's owner",
            "Only the customers",
            "Owners, workers, customers, and the communities near the factories",
            "Nobody, because business decisions affect no one"
          ],
          correctAnswer: 2,
          explanation: "Stakeholders are everyone affected by a business's actions, which here includes owners, workers, customers, and the surrounding communities.",
          concept: "stakeholders"
        },
        {
          id: "g14-p1",
          question: "Why is running a business partly about 'balancing' stakeholders?",
          options: [
            "Because all stakeholders always want the exact same thing",
            "Because their interests often compete: customers want low prices, workers want high pay, owners want profit",
            "Because only the owner's opinion matters",
            "Because stakeholders never disagree"
          ],
          correctAnswer: 1,
          explanation: "Different stakeholders pull in different directions, so a choice that helps one group can hurt another. Managing that tension is part of the job.",
          concept: "stakeholders"
        },
        {
          id: "g14-p2",
          question: "A rising standard of living usually means people can:",
          options: [
            "Feel happier no matter what",
            "Afford more goods and services than before",
            "Automatically have more free time",
            "Live in a cleaner environment for sure"
          ],
          correctAnswer: 1,
          explanation: "Standard of living is measured in what you can afford. Feelings, time, and environment belong to quality of life, which doesn't automatically follow.",
          concept: "standard-of-living-vs-quality-of-life"
        },
        {
          id: "g14-p3",
          question: "A coffee shop raises its prices. Which stakeholder is most directly unhappy about that specific change?",
          options: [
            "Its regular customers, who now pay more",
            "The government, which is unaffected",
            "Nobody at all",
            "Only competitors in another city"
          ],
          correctAnswer: 0,
          explanation: "Customers are stakeholders too, and a price increase works against their interest, a good example of competing stakeholder interests.",
          concept: "stakeholders"
        }
      ]
    }
  ]
}

// ─────────────────────────────────────────────────────────────
// LESSON 1.5: Outsourcing, Insourcing & Nonprofits
// ─────────────────────────────────────────────────────────────
export const block1e: StructuredLessonContent = {
  lessonId: "gulliver-1-5",
  sections: [
    {
      type: "concept",
      title: "Where the Work Gets Done, and Businesses That Skip the Profit",
      paragraphs: [
        "Every business has to decide *who* actually does each piece of its work. **Outsourcing** means paying an outside company, often in another country, to handle part of the job, like a clothing brand paying a foreign factory to sew its shirts. Businesses do it mainly to cut costs, or to get expertise they don't have in-house.",
        "But outsourcing is a trade-off, not a free win. You gain lower costs; you give up **control** over quality and timing, and the jobs go to the outside company instead of your own community. The opposite move is **insourcing**: bringing that work back in-house, paying more but getting tighter control and keeping the jobs at home. There's no automatically 'right' choice; it depends on what a business values most.",
        "Not every organization is chasing profit at all. A **nonprofit** exists to serve a mission (feeding people, rescuing animals, running a free clinic) rather than to make an owner rich. Its structure is genuinely different from a normal business.",
        "That difference is about where the money goes. A nonprofit can absolutely take in money; the key is that any **surplus** (money left after costs) is reinvested into the mission instead of paid out to an owner. And here's the part students miss: a nonprofit *still* has to bring in more than it spends. If it runs out of money, it can't keep serving its cause, so even a mission-driven organization has to cover its costs to survive."
      ],
      bullets: [
        "**Outsourcing** = paying an outside company (often abroad) to do part of the work, usually to cut costs.",
        "It's a trade-off: lower cost, but less control and jobs sent elsewhere.",
        "**Insourcing** = bringing that work back in-house for more control, at higher cost.",
        "A **nonprofit** serves a mission, not an owner, and surplus is reinvested into the cause.",
        "Even a nonprofit must earn more than it spends, or it can't keep going."
      ],
      realWorldExample: "A sneaker brand outsources sewing to a factory overseas to keep prices low, but when quality complaints pile up, it insources a small line back home for more control. Meanwhile the local food bank takes in donations and grant money (revenue), spends it all on meals (mission), and still has to stay in the black to keep its doors open."
    },
    {
      type: "micro-check",
      questions: [
        {
          id: "g1-prac-8",
          question: "A clothing brand pays a factory in another country to sew its shirts instead of hiring its own sewers. This is called:",
          options: ["Insourcing", "Outsourcing", "A nonprofit", "A loss"],
          correctAnswer: 1,
          explanation: "Hiring an outside company to do part of the work, often overseas, is outsourcing. Bringing that work back in-house would be insourcing.",
          concept: "outsourcing-insourcing"
        },
        {
          id: "g1-prac-13",
          question: "A company that had been paying an overseas call center decides to build its own support team at home instead. This move is:",
          options: ["Outsourcing", "Insourcing", "A loss", "A nonprofit"],
          correctAnswer: 1,
          explanation: "Bringing work back in-house rather than hiring outside is insourcing, the opposite of outsourcing.",
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
        }
      ]
    },
    {
      type: "scenario",
      title: "One Brand, Two Choices",
      narrative: "A backpack company is trying to keep prices low while customers keep asking for better quality. Its founder weighs two decisions at once: where to make the bags, and whether to start a small giving program.",
      details: [
        "Right now the bags are sewn by a cheaper factory overseas, which is **outsourcing**: it keeps costs down but makes quality harder to control.",
        "The founder considers moving one premium line back to a local workshop, which is **insourcing**: more expensive, but tighter control and local jobs.",
        "She also starts a side program that gives free backpacks to kids in need, funded by donations, run as a **nonprofit**.",
        "The nonprofit can take in donation money, but every surplus dollar goes back into more backpacks, not into her pocket."
      ]
    },
    {
      type: "applied-question",
      question: {
        id: "g15-aq1",
        question: "Moving the premium line to a local workshop (insourcing) mainly trades:",
        options: [
          "Lower quality for higher profit",
          "Higher cost for more control over quality and local jobs",
          "Nothing, it's identical to outsourcing",
          "More control for lower cost"
        ],
        correctAnswer: 1,
        explanation: "Insourcing usually costs more but gives the business tighter control over quality and keeps the work (and jobs) closer to home.",
        concept: "outsourcing-insourcing"
      }
    },
    {
      type: "mastery-check",
      requiredCorrect: 2,
      questions: [
        {
          id: "g15-exit1",
          question: "Why do businesses usually outsource work?",
          options: [
            "To make their products more expensive",
            "To cut costs or get expertise they don't have in-house",
            "Because the law requires it",
            "To give up all their profit"
          ],
          correctAnswer: 1,
          explanation: "Outsourcing is mainly about lower costs and access to outside expertise, while trading away some control and local jobs.",
          concept: "outsourcing-insourcing"
        },
        {
          id: "g15-exit2",
          question: "In a nonprofit, what happens to money left over after costs?",
          options: [
            "It is paid out to the owner as profit",
            "It is reinvested into the organization's mission",
            "It must be given to the government",
            "It is destroyed"
          ],
          correctAnswer: 1,
          explanation: "A nonprofit reinvests its surplus into its cause rather than paying an owner, which is the defining difference from a regular business.",
          concept: "nonprofits"
        }
      ]
    },
    {
      type: "mastery-check",
      requiredCorrect: 4,
      questions: [
        {
          id: "g1-prac-11",
          question: "Even though it serves a cause, why must a nonprofit still bring in more money than it spends?",
          options: [
            "So the owner can get rich",
            "Because if it runs out of money it can't keep serving its mission",
            "Because nonprofits pay the highest taxes",
            "It doesn't, because nonprofits never need money"
          ],
          correctAnswer: 1,
          explanation: "A nonprofit reinvests its surplus into the cause instead of paying an owner, but it still needs revenue above costs, otherwise it can't keep the doors open.",
          concept: "nonprofits"
        },
        {
          id: "g15-p1",
          question: "What is a real DOWNSIDE of outsourcing production overseas?",
          options: [
            "It always raises the company's costs",
            "The business gives up some control over quality and sends jobs elsewhere",
            "It is illegal for most companies",
            "It guarantees the product will fail"
          ],
          correctAnswer: 1,
          explanation: "Outsourcing lowers costs but trades away control over quality and timing, and the jobs go to the outside company instead of the home community.",
          concept: "outsourcing-insourcing"
        },
        {
          id: "g15-p2",
          question: "A company brings its customer-support team back in-house after years of using a cheaper outside firm. The main reason is usually to:",
          options: [
            "Spend as little money as possible",
            "Get more control over quality, even though it costs more",
            "Avoid ever hiring workers",
            "Turn itself into a nonprofit"
          ],
          correctAnswer: 1,
          explanation: "Insourcing typically costs more but buys tighter control over quality, the opposite trade-off from outsourcing.",
          concept: "outsourcing-insourcing"
        },
        {
          id: "g15-p3",
          question: "Which of these is a nonprofit?",
          options: [
            "A sneaker brand that pays its owners the profits",
            "A food bank that uses donations and grants to feed people and reinvests any surplus",
            "A phone company owned by shareholders",
            "A food truck run to support its owner's family"
          ],
          correctAnswer: 1,
          explanation: "A food bank serves a mission and reinvests surplus into that cause rather than paying owners, which is the defining feature of a nonprofit.",
          concept: "nonprofits"
        },
        {
          id: "g15-p4",
          question: "Which statement about nonprofits is TRUE?",
          options: [
            "They are not allowed to take in any money",
            "They can earn money, but surplus goes back into the mission, and they still must cover their costs",
            "They never have to worry about running out of money",
            "They exist to make their founders wealthy"
          ],
          correctAnswer: 1,
          explanation: "Nonprofits can bring in revenue; the difference is where surplus goes (the mission), and they still have to earn more than they spend to survive.",
          concept: "nonprofits"
        }
      ]
    }
  ]
}
