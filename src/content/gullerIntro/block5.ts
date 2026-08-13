import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// GULLIVER INTRO TO BUSINESS — BLOCK 5
// Supply, demand, equilibrium; market structures; other systems (Byrnes Ch. 2)
// Concepts: supply, demand, equilibrium-market-price, perfect-competition,
//           monopolistic-competition, oligopoly, monopoly, free-market-benefits-limits,
//           socialism, communism, mixed-economies
// Audience: 9th grade
// ═══════════════════════════════════════════════

export const block5: StructuredLessonContent = {
  lessonId: "gulliver-5",
  sections: [
    // ─────────────────────────────────────────────
    // PRE-CLASS PRIMER (~5 min read)
    // ─────────────────────────────────────────────
    {
      type: "concept",
      title: "Supply and Demand: The Two Forces Behind Every Price",
      paragraphs: [
        "Almost every price you see is the result of a tug-of-war between two forces. Demand is how much of something buyers are willing to buy at different prices. The rule is simple: when the price goes up, people usually want less; when the price drops, people usually want more. Cheap concert tickets sell out; expensive ones sit unsold. Supply is the flip side: how much of something sellers are willing to make and offer at different prices. Sellers want the opposite — the higher the price, the more they're eager to produce, because there's more money in it.",
        "These two forces pull against each other. Buyers want low prices; sellers want high prices. The price where they finally agree — where the amount buyers want to buy exactly equals the amount sellers want to sell — is called the equilibrium, or the market price. At that price, the market is balanced: no big pile of unsold goods and no long line of people who can't get any.",
        "When something changes, the balance point moves. If a new phone becomes super popular, demand rises, and the price usually climbs until a new equilibrium is reached. If a great harvest floods the market with oranges, supply rises, and the price usually falls. Picture two lines on a graph — a demand line sloping down and a supply line sloping up. Where they cross is the equilibrium price. Move either line, and the crossing point moves with it."
      ],
      bullets: [
        "Demand: how much buyers will buy at each price (lower price → they want more).",
        "Supply: how much sellers will offer at each price (higher price → they make more).",
        "Equilibrium (market price): the price where the amount supplied equals the amount demanded.",
        "More demand usually pushes the price up; more supply usually pushes it down.",
        "On a graph, equilibrium is where the demand and supply lines cross."
      ],
      realWorldExample: "Limited-edition sneakers show it perfectly: only a few pairs exist (low supply) but tons of people want them (high demand), so the price shoots way up until only the buyers willing to pay the most get a pair. That high price is the equilibrium for that shoe."
    },
    {
      type: "concept",
      title: "Market Structures and Other Economic Systems",
      paragraphs: [
        "Not all markets look the same. Economists sort them by how many sellers compete. In perfect competition, there are many sellers offering nearly identical products, and no single one can control the price — think of farmers all selling the same corn. In monopolistic competition, there are still many sellers, but each makes its product a little different through branding or features — think of the countless restaurants or clothing brands, each with its own twist. In an oligopoly, just a few large companies dominate, like the handful of major phone carriers or airlines. In a monopoly, a single company controls the entire market with no real competition — like the one electric company serving a town.",
        "Free markets — where supply, demand, and competition set prices — have real benefits: they push businesses to innovate, keep prices in check, and give people huge choice. But they have limits too. Free markets can ignore things that don't earn profit, let a few players get too powerful, create big gaps between rich and poor, and pollute if nobody stops them. That's why no country runs on a totally free market with zero rules.",
        "Other systems handle these limits differently. In socialism, the government owns or runs key industries and uses higher taxes to fund services like healthcare and education, aiming for more equality — but often with less individual profit incentive. In communism, the government owns almost everything and plans the entire economy, with very little private business. Most real countries, including the United States, are actually mixed economies: a blend of free-market capitalism and government involvement, trying to keep the benefits of markets while using rules and programs to cover their limits."
      ],
      bullets: [
        "Perfect competition: many sellers, identical products, nobody controls the price.",
        "Monopolistic competition: many sellers with slightly different (branded) products.",
        "Oligopoly: a few big companies dominate; monopoly: one company controls the market.",
        "Free markets encourage innovation and choice but can ignore non-profit needs, allow big inequality, and pollute.",
        "Socialism: government runs key industries for more equality; communism: government controls almost everything; mixed economy: a blend (like the U.S.)."
      ],
      realWorldExample: "Your town's water company is likely a monopoly — one provider, no competition. The three or four big cell carriers are an oligopoly. The dozens of pizza places, each with its own recipe and brand, are monopolistic competition. Different structures, all around you."
    },
    // ─────────────────────────────────────────────
    // CHECKPOINT A (3 questions) — shift a curve, predict the new price
    // ─────────────────────────────────────────────
    {
      type: "micro-check",
      questions: [
        {
          id: "g5-cpa-1",
          question: "A video game suddenly becomes a viral hit and far more people want it, while the supply stays the same. What usually happens to the price?",
          options: ["It falls", "It rises", "It stays exactly the same", "There's no way to tell — prices are random"],
          correctAnswer: 1,
          explanation: "When demand rises and supply stays put, buyers compete for the same amount of goods, pushing the equilibrium price up.",
          concept: "demand"
        },
        {
          id: "g5-cpa-2",
          question: "A bumper crop means orange growers flood the market with far more oranges than usual, while demand stays the same. The price will most likely:",
          options: ["Rise", "Fall", "Stay the same", "It depends only on the brand, not the crop"],
          correctAnswer: 1,
          explanation: "When supply rises and demand is unchanged, sellers must lower prices to sell the extra goods, so the equilibrium price falls.",
          concept: "supply"
        },
        {
          id: "g5-cpa-3",
          question: "At the equilibrium (market) price, what is true?",
          options: [
            "There is a huge pile of unsold goods",
            "The amount buyers want to buy equals the amount sellers want to sell",
            "Sellers always run out instantly",
            "The government has set the price"
          ],
          correctAnswer: 1,
          explanation: "Equilibrium is the balance point: the quantity buyers demand equals the quantity sellers supply, so the market clears.",
          concept: "equilibrium-market-price"
        }
      ]
    },
    // ─────────────────────────────────────────────
    // CHECKPOINT B (3 questions) — name the market structure from a description
    // ─────────────────────────────────────────────
    {
      type: "micro-check",
      questions: [
        {
          id: "g5-cpb-1",
          question: "One electric company serves an entire town with no competitors. This market structure is a:",
          options: ["Monopoly", "Oligopoly", "Perfect competition", "Monopolistic competition"],
          correctAnswer: 0,
          explanation: "A single company controlling an entire market with no real competition is a monopoly.",
          concept: "monopoly"
        },
        {
          id: "g5-cpb-2",
          question: "Just three or four large airlines control most flights in a country. This is an example of:",
          options: ["A monopoly", "An oligopoly", "Perfect competition", "Socialism"],
          correctAnswer: 1,
          explanation: "A market dominated by a few large companies is an oligopoly.",
          concept: "oligopoly"
        },
        {
          id: "g5-cpb-3",
          question: "Dozens of clothing brands sell shirts, each a little different with its own logo and style. This is:",
          options: [
            "A monopoly",
            "Perfect competition",
            "Monopolistic competition",
            "An oligopoly"
          ],
          correctAnswer: 2,
          explanation: "Many sellers offering slightly different, branded versions of the same kind of product is monopolistic competition.",
          concept: "monopolistic-competition"
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
          id: "g5-exit-1",
          question: "On a supply-and-demand graph, the equilibrium price is found:",
          options: [
            "At the very top of the demand line",
            "Where the supply line and demand line cross",
            "Wherever the government points",
            "At the bottom of the supply line"
          ],
          correctAnswer: 1,
          explanation: "Equilibrium is the crossing point of the supply and demand lines — the price where the quantities supplied and demanded match.",
          concept: "equilibrium-market-price"
        },
        {
          id: "g5-exit-2",
          question: "The United States is best described as which kind of economy?",
          options: [
            "A pure free market with zero government rules",
            "A mixed economy blending free markets with government involvement",
            "A pure communist economy",
            "An economy with no businesses"
          ],
          correctAnswer: 1,
          explanation: "The U.S. is a mixed economy: mostly free-market capitalism, but with government rules and programs that address the market's limits.",
          concept: "mixed-economies"
        }
      ]
    },
    // ─────────────────────────────────────────────
    // POST-CLASS PRACTICE POOL (15 questions, mixed difficulty)
    // ─────────────────────────────────────────────
    {
      type: "mastery-check",
      requiredCorrect: 11,
      questions: [
        {
          id: "g5-prac-1",
          question: "The law of demand says that, in general, when the price of something goes UP, buyers want:",
          options: ["More of it", "Less of it", "Exactly the same amount", "To give it away"],
          correctAnswer: 1,
          explanation: "Higher prices usually mean buyers want less; lower prices usually mean they want more. That's the law of demand.",
          concept: "demand"
        },
        {
          id: "g5-prac-2",
          question: "From a seller's point of view, a HIGHER price usually makes them want to:",
          options: ["Produce and offer more", "Produce less", "Stop selling forever", "Lower the quality only"],
          correctAnswer: 0,
          explanation: "Higher prices give sellers more reason to produce and offer more, because there's more money in it. That's the law of supply.",
          concept: "supply"
        },
        {
          id: "g5-prac-3",
          question: "What is the market price also known as?",
          options: [
            "The equilibrium price",
            "The maximum legal price",
            "The tax rate",
            "The profit margin"
          ],
          correctAnswer: 0,
          explanation: "The market price is the equilibrium price — where supply and demand balance.",
          concept: "equilibrium-market-price"
        },
        {
          id: "g5-prac-4",
          question: "A weather disaster wipes out half the coffee crop, cutting supply sharply while demand stays high. The price of coffee will most likely:",
          options: ["Fall", "Rise", "Stay the same", "It can't be predicted from the weather"],
          correctAnswer: 1,
          explanation: "Lower supply with steady demand pushes the equilibrium price up — there's less to go around.",
          concept: "supply"
        },
        {
          id: "g5-prac-5",
          question: "Many farmers all sell nearly identical wheat, and no single farmer can set the price. This market is:",
          options: [
            "A monopoly",
            "Perfect competition",
            "An oligopoly",
            "Monopolistic competition"
          ],
          correctAnswer: 1,
          explanation: "Many sellers with identical products and no price-setting power is perfect competition.",
          concept: "perfect-competition"
        },
        {
          id: "g5-prac-6",
          question: "Which is the KEY feature of a monopoly?",
          options: [
            "Many sellers with slightly different products",
            "A few big companies sharing the market",
            "One company controls the market with no real competition",
            "The government owns every business"
          ],
          correctAnswer: 2,
          explanation: "A monopoly is a single company controlling a market with no meaningful competition.",
          concept: "monopoly"
        },
        {
          id: "g5-prac-7",
          question: "What makes monopolistic competition different from perfect competition?",
          options: [
            "There is only one seller",
            "Sellers make their products a little different through branding and features",
            "The government sets all prices",
            "There are only two sellers total"
          ],
          correctAnswer: 1,
          explanation: "Both have many sellers, but in monopolistic competition each product is slightly differentiated by brand or features rather than identical.",
          concept: "monopolistic-competition"
        },
        {
          id: "g5-prac-8",
          question: "A market controlled by just a few large companies, like major phone carriers, is:",
          options: ["A monopoly", "Perfect competition", "An oligopoly", "Communism"],
          correctAnswer: 2,
          explanation: "A handful of dominant companies makes an oligopoly.",
          concept: "oligopoly"
        },
        {
          id: "g5-prac-9",
          question: "Which is a genuine BENEFIT of free markets?",
          options: [
            "They guarantee everyone is equally wealthy",
            "They push businesses to innovate and give people lots of choice",
            "They automatically stop all pollution",
            "They remove the need for any prices"
          ],
          correctAnswer: 1,
          explanation: "Free markets reward innovation and offer wide choice as businesses compete for customers.",
          concept: "free-market-benefits-limits"
        },
        {
          id: "g5-prac-10",
          question: "Which is a real LIMIT of a totally free market?",
          options: [
            "It can create big gaps between rich and poor and ignore things that don't earn profit",
            "It gives people too much choice",
            "It makes businesses innovate too much",
            "It has no downsides at all"
          ],
          correctAnswer: 0,
          explanation: "Free markets can produce large inequality, ignore needs that aren't profitable, and allow pollution — which is why rules exist.",
          concept: "free-market-benefits-limits"
        },
        {
          id: "g5-prac-11",
          question: "In socialism, the government typically:",
          options: [
            "Owns nothing and sets no rules",
            "Owns or runs key industries and uses higher taxes to fund services, aiming for more equality",
            "Bans all forms of money",
            "Forces everyone to start a business"
          ],
          correctAnswer: 1,
          explanation: "Socialism has the government running key industries and funding services through higher taxes to promote equality.",
          concept: "socialism"
        },
        {
          id: "g5-prac-12",
          question: "The main feature of communism is that:",
          options: [
            "Private individuals own all businesses",
            "The government owns almost everything and plans the entire economy",
            "There is no government involvement at all",
            "Only nonprofits are allowed"
          ],
          correctAnswer: 1,
          explanation: "Under communism, the government owns nearly everything and centrally plans the economy, with little private business.",
          concept: "communism"
        },
        {
          id: "g5-prac-13",
          question: "What is a mixed economy?",
          options: [
            "An economy with no rules whatsoever",
            "A blend of free-market capitalism and government involvement",
            "An economy that uses only bartering",
            "An economy run entirely by one company"
          ],
          correctAnswer: 1,
          explanation: "A mixed economy combines free markets with government rules and programs — the model most countries, including the U.S., actually use.",
          concept: "mixed-economies"
        },
        {
          id: "g5-prac-14",
          question: "A brand-new phone becomes wildly popular. Using supply and demand, why does its price tend to climb at first?",
          options: [
            "Because supply is unlimited",
            "Because demand jumps while supply is still limited, moving equilibrium to a higher price",
            "Because the government orders a price increase",
            "Because sellers dislike making money"
          ],
          correctAnswer: 1,
          explanation: "A surge in demand against limited supply pushes the equilibrium price upward until the two forces rebalance.",
          concept: "demand"
        },
        {
          id: "g5-prac-15",
          question: "Which correctly ranks the number of sellers from FEWEST to MOST?",
          options: [
            "Monopoly (one) → oligopoly (a few) → monopolistic/perfect competition (many)",
            "Perfect competition (one) → monopoly (many)",
            "Oligopoly (one) → monopoly (many)",
            "Monopoly (many) → perfect competition (one)"
          ],
          correctAnswer: 0,
          explanation: "A monopoly has one seller, an oligopoly has a few, and monopolistic and perfect competition each have many sellers.",
          concept: "perfect-competition"
        }
      ]
    }
  ]
}
