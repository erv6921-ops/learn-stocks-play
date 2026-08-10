import { StructuredLessonContent } from "@/types"

export const marketingMixContent: StructuredLessonContent[] = [
  // ═══════════════════════════════════════════════
  // MIX-1: What Is the Marketing Mix
  // ═══════════════════════════════════════════════
  {
    lessonId: "mix-1",
    sections: [
      {
        type: "concept",
        title: "What Is the Marketing Mix and Why Businesses Use It",
        paragraphs: [
          "The marketing mix is a framework that helps businesses plan how to bring a product or service to market. It breaks the strategy into four controllable elements - Product, Price, Place, and Promotion - known as the 4 Ps. Together, these four decisions determine whether a product succeeds or fails.",
          "The marketing mix was developed by E. Jerome McCarthy in the 1960s and has been the foundation of marketing strategy ever since. The power of the framework is its simplicity: every marketing decision a business makes fits into one of these four categories, making it easier to plan, evaluate, and adjust strategy.",
          "The 4 Ps are interdependent - changing one affects the others. A premium product requires premium pricing, selective distribution, and sophisticated promotion. A budget product needs competitive pricing, wide distribution, and value-focused messaging. When all four Ps are aligned, the strategy is coherent and effective."
        ],
        bullets: [
          "Product - what you sell, including features, quality, branding, and packaging",
          "Price - how much you charge, including discounts, payment terms, and perceived value",
          "Place - where and how customers can buy it, including channels and distribution",
          "Promotion - how you communicate value, including ads, PR, social media, and sales"
        ],
        realWorldExample: "Dollar Shave Club aligned all 4 Ps perfectly: a simple product (basic razor blades), a disruptive price ($1/month), direct-to-consumer place (mailed to your door), and viral promotion (a funny YouTube video). That alignment turned a startup into a $1 billion acquisition by Unilever."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix1-mc1",
            question: "Why is the marketing mix described as a framework of 'interdependent' elements?",
            options: [
              "Because changing one of the 4 Ps affects the others - all four must be aligned for the strategy to work",
              "Because businesses must choose only one of the 4 Ps to focus on and ignore the other three entirely",
              "Because the 4 Ps were designed to be used independently by four different departments in a company",
              "Because each of the 4 Ps is only relevant to a specific industry and does not apply broadly to all businesses"
            ],
            correctAnswer: 0,
            explanation: "The 4 Ps are interconnected - a premium product needs premium pricing, selective distribution, and sophisticated promotion. If any element is misaligned, the entire strategy suffers."
          },
          {
            id: "mix1-mc2",
            question: "What is the PRIMARY benefit of using the 4 Ps framework for marketing planning?",
            options: [
              "It organizes every marketing decision into four clear categories, making strategy easier to plan and evaluate",
              "It eliminates the need for market research since the framework provides all necessary customer insights",
              "It guarantees that any product using the framework will be successful in the market regardless of execution",
              "It reduces marketing costs by limiting the number of strategies a business is allowed to implement"
            ],
            correctAnswer: 0,
            explanation: "The 4 Ps framework provides structure - every marketing decision fits into Product, Price, Place, or Promotion. This makes it easier to identify gaps, spot misalignments, and create a coherent strategy."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Lemonade Stands, Two Strategies",
        narrative: "Mia and Jake both open lemonade stands at a local festival. Mia thinks through all 4 Ps: she creates a unique lavender lemonade (product), prices it at $4 as a premium offering (price), sets up near the main stage where foot traffic is highest (place), and makes eye-catching chalkboard signs with free samples (promotion). Jake buys generic lemonade mix, prices it at $2, sets up in the back corner, and puts up a small handwritten sign.",
        details: [
          "Mia sells 150 cups at $4 each, earning $600 in revenue with customers lining up for her unique product",
          "Jake sells 40 cups at $2 each, earning $80 - his lower price could not compensate for weak product, place, and promotion",
          "Mia's success came not from any single decision but from all four Ps working together as a coherent strategy"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix1-aq1",
          question: "Why did Mia's lemonade stand outperform Jake's despite charging twice the price?",
          options: [
            "Mia aligned all 4 Ps - a unique product, strategic pricing, high-traffic placement, and effective promotion",
            "Mia's lemonade was objectively better quality because lavender is a more expensive ingredient than standard mix",
            "Jake made a strategic error by pricing too low, which caused festival attendees to perceive his product as inferior",
            "Mia had more experience running lemonade stands from previous festivals and Jake was a first-time seller"
          ],
          correctAnswer: 0,
          explanation: "Mia's advantage was strategic alignment - every element of her marketing mix reinforced the others. A unique product justified premium pricing, prime placement generated traffic, and strong promotion converted that traffic into sales."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The marketing mix (4 Ps) organizes every marketing decision into Product, Price, Place, and Promotion",
          "The framework was developed in the 1960s and remains the foundation of modern marketing strategy",
          "The 4 Ps are interdependent - changing one affects the others and all must be aligned for success",
          "Effective marketing comes from coherent alignment of all four elements, not excellence in just one"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mix1-mastery",
            question: "A student launches a handmade jewelry business with beautiful products but sells only through a hard-to-find website, prices below competitors, and does zero promotion. Using the 4 Ps framework, what is the CORE problem?",
            options: [
              "The product quality is too high for the target market, creating a mismatch between supply and demand",
              "Three of the four Ps are misaligned - weak place, underpricing",
              "The student should focus exclusively on lowering production costs to improve profit margins on each sale",
              "The business model is fundamentally flawed because handmade jewelry cannot compete in the modern market"
            ],
            correctAnswer: 1,
            explanation: "The product is strong, but Place (hard-to-find website), Price (below competitors for a premium handmade product), and Promotion (zero) are all misaligned. The 4 Ps framework immediately reveals that three out of four elements need attention."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MIX-2: Product
  // ═══════════════════════════════════════════════
  {
    lessonId: "mix-2",
    sections: [
      {
        type: "concept",
        title: "Product - Features, Branding, Packaging, and the Life Cycle",
        paragraphs: [
          "In the marketing mix, 'product' means far more than the physical item. It includes the features, quality, design, branding, packaging, warranty, and the problem it solves for the customer. A product is anything that satisfies a need or want - including services, experiences, and digital products.",
          "Every product goes through a life cycle with four stages: introduction (new to market, low sales, high marketing costs), growth (sales increase, competitors enter), maturity (sales peak, market saturated, competition intense), and decline (sales fall, product becomes obsolete). Understanding where a product sits in its life cycle helps businesses make better decisions about pricing, promotion, and investment.",
          "Branding transforms a generic product into something customers recognize, trust, and prefer. Packaging is the first physical interaction a customer has with your product - it communicates quality, protects the product, and can differentiate you on a crowded shelf. Together, branding and packaging can justify premium prices."
        ],
        bullets: [
          "Product - includes features, quality, design, branding, packaging, warranty, and the problem it solves",
          "Product life cycle - introduction, growth, maturity, and decline stages that guide strategy",
          "Branding - creates recognition, trust, and preference that differentiates from competitors",
          "Packaging - communicates quality, protects the product, and serves as a silent salesperson"
        ],
        realWorldExample: "When Apple launches a new iPhone, the product isn't just the phone - it's the design, the ecosystem, the packaging experience (that satisfying box opening), the brand prestige, and the AppleCare warranty. Every element is deliberately designed to reinforce the premium product positioning."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix2-mc1",
            question: "What are the four stages of the product life cycle?",
            options: [
              "Introduction, growth, maturity, and decline - each requiring different marketing strategies",
              "Design, manufacturing, distribution, and recycling - the physical journey of a product",
              "Awareness, consideration, purchase, and loyalty - the stages a customer goes through",
              "Research, development, testing, and launch - the process of creating a new product"
            ],
            correctAnswer: 0,
            explanation: "The product life cycle tracks market performance: introduction (new, low sales), growth (rising sales), maturity (peak, saturated), and decline (falling sales). Each stage requires different pricing, promotion, and investment decisions."
          },
          {
            id: "mix2-mc2",
            question: "Why is packaging considered part of the 'product' in the marketing mix?",
            options: [
              "Because packaging communicates quality, protects the product, and differentiates it from competitors on shelves",
              "Because packaging is the most expensive part of manufacturing and determines the final retail price",
              "Because customers always choose products based exclusively on packaging rather than features or reviews",
              "Because government regulations require all products to have specific packaging standards before sale"
            ],
            correctAnswer: 0,
            explanation: "Packaging is the first physical touchpoint - it silently communicates what the product is, who it's for, and what quality to expect. Great packaging differentiates products on crowded shelves and reinforces brand positioning."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Life Cycle of a Fidget Spinner Brand",
        narrative: "SpinTech launched fidget spinners in 2016 during the introduction phase - sales were slow but buzz was building. By early 2017 (growth phase), demand exploded and SpinTech scaled production rapidly. By mid-2017 (maturity), dozens of competitors entered, prices dropped, and the market saturated. By 2018 (decline), demand collapsed. SpinTech survived by reading the life cycle correctly - they launched premium metal spinners during growth (maximizing revenue), reduced production during maturity (avoiding excess inventory), and pivoted to fidget cubes during decline.",
        details: [
          "Companies that ramped up production during maturity were stuck with unsold inventory when decline hit",
          "SpinTech's life cycle awareness saved them from investing heavily right before demand collapsed",
          "Reading the product life cycle correctly is the difference between riding a trend and being crushed by one"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix2-aq1",
          question: "What strategy allowed SpinTech to survive while competitors failed during the fidget spinner decline?",
          options: [
            "They read the product life cycle correctly - maximizing revenue during growth and reducing investment before decline",
            "They had a patent on fidget spinners that prevented any competitors from legally selling similar products",
            "They lowered prices dramatically during the decline phase to maintain sales volume at any profit margin",
            "They increased advertising spending during the decline phase to stimulate renewed consumer interest"
          ],
          correctAnswer: 0,
          explanation: "SpinTech's advantage was life cycle literacy - they launched premium products during growth, cut production during maturity, and pivoted during decline. Competitors who ignored the life cycle invested at the wrong time."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Product in the marketing mix includes features, quality, branding, packaging, warranty, and the problem solved",
          "The product life cycle (introduction → growth → maturity → decline) guides strategy at each stage",
          "Branding creates recognition and trust that can justify premium pricing over generic alternatives",
          "Packaging serves as a silent salesperson - communicating quality and differentiating on the shelf"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mix2-mastery",
            question: "A company's best-selling product has been on the market for 5 years. Sales have plateaued, competitors offer similar products, and profit margins are shrinking. Based on the product life cycle, what stage is this product in and what should the company do?",
            options: [
              "Introduction stage - the company should increase marketing spend to build initial awareness and trial",
              "Maturity stage - the company should differentiate through branding, explore line extensions, or prepare new products",
              "Growth stage - the company should scale production and expand into new geographic markets immediately",
              "Decline stage - the company should discontinue the product immediately and redirect all resources elsewhere"
            ],
            correctAnswer: 1,
            explanation: "Plateaued sales, many competitors, and shrinking margins are classic maturity indicators. Smart responses include brand refreshes, product variations, efficiency improvements, or developing the next generation product."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MIX-3: Price
  // ═══════════════════════════════════════════════
  {
    lessonId: "mix-3",
    sections: [
      {
        type: "concept",
        title: "Price - Strategies That Shape Perception and Profit",
        paragraphs: [
          "Price is the only element of the marketing mix that generates revenue - the other three are costs. But pricing is far more than just covering expenses and adding a markup. Price communicates value, positions your brand, and directly influences how customers perceive your product.",
          "Four major pricing strategies are cost-based pricing (calculate costs, add a markup), value-based pricing (charge what customers believe the product is worth), competitive pricing (match or undercut competitor prices), and penetration pricing (start very low to gain market share quickly, then raise prices once established).",
          "Psychological pricing also plays a role - $9.99 feels significantly cheaper than $10.00 to most consumers, even though the difference is one cent. Price anchoring (showing the 'original' price next to a sale price) makes discounts feel larger. Premium pricing (intentionally pricing high) can signal quality and exclusivity."
        ],
        bullets: [
          "Cost-based pricing - calculate total costs and add a percentage markup for profit",
          "Value-based pricing - charge based on perceived customer value, not just production costs",
          "Competitive pricing - set prices relative to competitors to match or undercut their offerings",
          "Penetration pricing - start low to gain market share rapidly, then increase prices over time"
        ],
        realWorldExample: "Costco uses a strict cost-based model - they cap markups at 14-15% on all products. This predictable pricing builds enormous customer trust. Meanwhile, luxury brands like Louis Vuitton use value-based pricing - a $3,000 handbag costs maybe $200 to make, but customers pay for the brand, status, and craftsmanship."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix3-mc1",
            question: "Why is price considered the most unique element of the marketing mix?",
            options: [
              "Because it is the only element that generates revenue - product, place, and promotion are all costs",
              "Because price is the easiest element to change and requires no strategic planning or market research",
              "Because customers always make purchasing decisions based solely on price without considering other factors",
              "Because pricing decisions are made by the finance department and do not involve the marketing team at all"
            ],
            correctAnswer: 0,
            explanation: "Product development, distribution, and promotion all cost money. Price is the only P that brings money in - making it critical to both profitability and brand positioning."
          },
          {
            id: "mix3-mc2",
            question: "What is the key difference between cost-based pricing and value-based pricing?",
            options: [
              "Cost-based adds a markup to production costs; value-based charges what customers believe the product is worth",
              "Cost-based pricing is used for expensive products while value-based pricing is used for cheap products",
              "Value-based pricing always results in lower prices because it focuses on customer satisfaction over profit",
              "Cost-based pricing requires competitor analysis while value-based pricing ignores the competitive landscape"
            ],
            correctAnswer: 0,
            explanation: "Cost-based pricing looks inward (what does it cost to make?) while value-based pricing looks outward (what do customers believe it's worth?). Value-based often results in higher prices because perceived value exceeds production cost."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Pricing Strategies for the Same Product",
        narrative: "Two students start tutoring businesses. Alex uses cost-based pricing: she calculates her time, materials, and transportation cost $15/hour and adds a 33% markup, charging $20/hour. Priya uses value-based pricing: she surveys parents and discovers they value 'guaranteed grade improvement' at $50/hour. Priya offers the same quality tutoring but frames it as a 'grade improvement program' with progress tracking and parent reports.",
        details: [
          "After three months, Alex earns $20/hour × 15 hours/week = $300/week and struggles to raise prices because students see her as 'the affordable tutor'",
          "Priya earns $50/hour × 12 hours/week = $600/week because parents perceive her service as an investment in their child's future",
          "Both deliver similar tutoring quality - the difference is entirely in how they priced and framed their service"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix3-aq1",
          question: "Why does Priya earn twice as much as Alex despite providing similar quality tutoring?",
          options: [
            "Priya used value-based pricing by framing her service around what parents value - grade improvement - and pricing accordingly",
            "Priya's tutoring is objectively better quality because she has more advanced teaching certifications and training",
            "Alex made an error in her cost calculation and should have included additional expenses she forgot about",
            "Priya benefits from a wealthier client base that can afford higher prices regardless of the service provided"
          ],
          correctAnswer: 0,
          explanation: "Priya understood that parents value outcomes (grade improvement), not inputs (hourly time). By framing her service around value and adding progress tracking, she justified a price that reflected perceived worth rather than just costs."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Price is the only marketing mix element that generates revenue - the other three Ps are costs",
          "Cost-based pricing adds markup to costs; value-based pricing charges what customers believe the product is worth",
          "Competitive pricing positions against rivals; penetration pricing starts low to gain share quickly",
          "Price communicates value - low prices can signal cheapness while premium prices can signal quality"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mix3-mastery",
            question: "A new ride-sharing app enters a market dominated by two established competitors. They want to gain market share quickly. Which pricing strategy is MOST appropriate?",
            options: [
              "Value-based pricing - charge a premium because their app has slightly better features than the competition",
              "Cost-based pricing - calculate their costs carefully and add a standard industry markup for each ride",
              "Penetration pricing - offer significantly lower prices initially to attract riders away from competitors and build market share",
              "Price skimming - charge the highest possible price at launch to maximize revenue from early adopters"
            ],
            correctAnswer: 2,
            explanation: "Penetration pricing is designed exactly for this scenario - entering an established market where customers need a strong incentive to switch. Low initial prices attract users, build habits, and create a customer base that can support higher prices later."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MIX-4: Place
  // ═══════════════════════════════════════════════
  {
    lessonId: "mix-4",
    sections: [
      {
        type: "concept",
        title: "Place - Distribution Channels and Getting Products to Customers",
        paragraphs: [
          "Place refers to how and where customers can access your product. It includes distribution channels, physical locations, online platforms, logistics, and supply chain management. The best product in the world fails if customers cannot find it or buy it conveniently.",
          "Distribution channels can be direct (selling straight to customers through your own store or website) or indirect (using intermediaries like retailers, wholesalers, or distributors). Direct channels give more control and higher margins but require more infrastructure. Indirect channels provide wider reach but reduce control and margin.",
          "The digital revolution has transformed place strategy. E-commerce enables direct-to-consumer (DTC) models that bypass traditional retail entirely. Omnichannel strategies combine physical and digital presence - a customer might research online, try in-store, and order through an app. The key principle: be where your customers already are."
        ],
        bullets: [
          "Direct distribution - selling to customers through your own stores, website, or sales team",
          "Indirect distribution - using retailers, wholesalers, or distributors to reach customers",
          "Supply chain - the entire network from raw materials to finished product in the customer's hands",
          "Omnichannel - integrating physical and digital channels into one seamless customer experience"
        ],
        realWorldExample: "Warby Parker started as an online-only eyewear company (direct distribution). When they realized many customers wanted to try glasses before buying, they opened physical stores that connect to their online system. This omnichannel approach lets customers browse online, try in-store, and order either way."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix4-mc1",
            question: "What is the main trade-off between direct and indirect distribution channels?",
            options: [
              "Direct channels give more control and higher margins but need more infrastructure; indirect channels provide wider reach at lower margins",
              "Direct channels are always more profitable because they eliminate all intermediary costs completely",
              "Indirect channels are only used by companies that cannot afford their own website or physical store",
              "There is no meaningful trade-off - businesses should always use both channels equally at all times"
            ],
            correctAnswer: 0,
            explanation: "Direct channels (selling yourself) give control over experience and higher per-unit margins but require investment in infrastructure. Indirect channels (through retailers) sacrifice some margin and control for wider reach and existing customer traffic."
          },
          {
            id: "mix4-mc2",
            question: "What does an omnichannel strategy accomplish for a business?",
            options: [
              "It integrates physical and digital channels into one seamless experience so customers can buy however they prefer",
              "It eliminates the need for physical stores by moving all sales to online-only digital platforms",
              "It requires businesses to sell only through third-party retailers to maximize distribution coverage",
              "It limits distribution to a single exclusive channel to create scarcity and drive up perceived value"
            ],
            correctAnswer: 0,
            explanation: "Omnichannel connects all touchpoints - online, in-store, mobile - into one unified experience. Customers can research online, visit a store, order on an app, or any combination, with consistent pricing and information throughout."
          }
        ]
      },
      {
        type: "scenario",
        title: "Digital vs Physical: Two Bakery Strategies",
        narrative: "Two bakeries serve the same city. Sweet Treats operates from a beautiful storefront in downtown - great foot traffic but limited to customers who physically visit. Bake & Ship has no storefront but sells through Instagram, a delivery app, and their own website. Sweet Treats reaches about 200 customers per week within a 2-mile radius. Bake & Ship reaches 500 customers across the entire city and ships specialty items nationwide.",
        details: [
          "Sweet Treats has higher margins per item (no delivery costs, no platform fees) but lower total revenue",
          "Bake & Ship has lower margins per item but reaches 2.5x more customers and generates higher total revenue",
          "When Sweet Treats adds online ordering and delivery, their combined reach exceeds both original models - an omnichannel approach"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix4-aq1",
          question: "Why did Sweet Treats benefit most from adding online ordering rather than opening a second physical location?",
          options: [
            "Online ordering expanded their reach to the entire city at lower cost than a second storefront",
            "Physical locations are always less profitable than digital channels in the modern bakery industry",
            "Their downtown storefront was losing money and needed to be replaced by a more cost-effective digital alternative",
            "Online ordering eliminated the need for any employees, dramatically reducing their operating costs"
          ],
          correctAnswer: 0,
          explanation: "Adding online ordering created an omnichannel model - they kept their profitable storefront (high margins, local loyalty) while reaching the entire city digitally. A second physical location would have been much more expensive for a smaller geographic expansion."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Place determines how and where customers access your product - the best product fails if people cannot find it",
          "Direct distribution offers more control and higher margins; indirect channels provide wider reach",
          "Supply chain management ensures products move efficiently from production to the customer's hands",
          "Omnichannel strategies combine physical and digital presence for maximum convenience and reach"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mix4-mastery",
            question: "A small artisan candle maker currently sells only at weekend farmers markets. They want to grow without major investment. Which place strategy makes the MOST sense?",
            options: [
              "Open a dedicated retail store in a shopping mall to create a premium brand experience for customers",
              "Add an online store and partner with two or three boutique retailers to expand reach with minimal infrastructure investment",
              "Negotiate distribution deals with major national retailers like Target and Walmart for maximum store coverage",
              "Stop attending farmers markets entirely and focus exclusively on wholesale to reduce their direct selling efforts"
            ],
            correctAnswer: 1,
            explanation: "An online store (direct, low cost) plus a few boutique retailers (indirect, aligned with artisan positioning) expands reach without requiring major investment. A mall store is expensive, national retail is premature, and dropping farmers markets eliminates proven revenue."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MIX-5: Promotion
  // ═══════════════════════════════════════════════
  {
    lessonId: "mix-5",
    sections: [
      {
        type: "concept",
        title: "Promotion - Communicating Value to Your Audience",
        paragraphs: [
          "Promotion is how businesses communicate the value of their product to potential customers. It includes advertising, public relations, social media marketing, content marketing, sales promotions, personal selling, and word-of-mouth. The goal is not just awareness - it is persuading customers that your product solves their problem better than alternatives.",
          "Integrated Marketing Communication (IMC) means all promotional channels deliver a consistent message. When a customer sees your Instagram ad, visits your website, reads a press article, and talks to a salesperson, the brand story should feel unified. Inconsistent messaging confuses customers and weakens trust.",
          "The promotional mix should match the target audience. A B2B software company might prioritize LinkedIn content and personal selling. A teen fashion brand might focus on TikTok and influencer partnerships. The channel matters as much as the message - reaching the right people on the wrong platform wastes budget."
        ],
        bullets: [
          "Advertising - paid messages through TV, digital, print, radio, and outdoor media",
          "Public relations - earning media coverage, managing reputation, and building credibility",
          "Social media marketing - building community, engagement, and brand personality on platforms",
          "Integrated Marketing Communication - ensuring all channels deliver one consistent brand message"
        ],
        realWorldExample: "When Spotify launches 'Wrapped' every December, it's a masterclass in IMC. The campaign spans the app experience, social media (users share their stats), outdoor billboards with funny data insights, PR coverage, and email - all telling one unified story about the year in music."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix5-mc1",
            question: "What is Integrated Marketing Communication (IMC)?",
            options: [
              "Ensuring all promotional channels deliver one consistent brand message across every customer touchpoint",
              "Using only one marketing channel exclusively to avoid confusing customers with too many messages",
              "Integrating the marketing department with the sales department into a single combined team",
              "Communicating different messages on different platforms to test which message performs the best"
            ],
            correctAnswer: 0,
            explanation: "IMC means consistency - whether a customer encounters your brand on social media, a billboard, your website, or through a salesperson, the core message, tone, and brand personality should be unified."
          },
          {
            id: "mix5-mc2",
            question: "Why should the promotional mix match the target audience?",
            options: [
              "Because reaching the right people on the wrong platform wastes budget - channels must align with audience behavior",
              "Because every promotional channel is equally effective for every target audience regardless of demographics",
              "Because using too many promotional channels simultaneously always reduces the effectiveness of each channel",
              "Because regulations require businesses to use specific channels for specific demographic groups"
            ],
            correctAnswer: 0,
            explanation: "A brilliant ad on the wrong platform reaches nobody. Teen fashion on LinkedIn or B2B software on TikTok wastes money. Matching channels to audience behavior ensures your message reaches people where they already spend time."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Restaurants, Two Promotional Approaches",
        narrative: "Urban Eats promotes heavily on TikTok with trendy food videos, influencer partnerships, and viral challenges. Their content reaches millions of views. Farm & Fork promotes through local food blog partnerships, community events, email newsletters to repeat customers, and handwritten thank-you cards in takeout orders. Urban Eats gets massive awareness but struggles with customer retention - people visit once for the social media hype. Farm & Fork has a smaller audience but 65% of customers return monthly.",
        details: [
          "Urban Eats spent $5,000/month on promotion reaching 500,000 people but converting only 200 to paying customers",
          "Farm & Fork spent $800/month on promotion reaching 5,000 people but converting 400 to paying customers with high retention",
          "Farm & Fork's integrated, community-focused approach built deeper relationships than Urban Eats' viral content strategy"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix5-aq1",
          question: "Why did Farm & Fork achieve better business results despite reaching a much smaller audience?",
          options: [
            "Their promotion was targeted and relationship-focused, converting and retaining a higher percentage of the right customers",
            "Farm & Fork's food was significantly higher quality, which made their smaller promotional budget more effective",
            "Urban Eats made the mistake of using social media, which is never effective for restaurant marketing campaigns",
            "Farm & Fork spent more total money on promotion but spread it across fewer channels for concentrated impact"
          ],
          correctAnswer: 0,
          explanation: "Farm & Fork's promotion prioritized depth over breadth - reaching fewer people but building real relationships through targeted, personal touchpoints. Their higher conversion and retention rates produced better business outcomes than viral awareness."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Promotion includes advertising, PR, social media, content, sales promotions, personal selling, and word-of-mouth",
          "Integrated Marketing Communication ensures all channels deliver one consistent, unified brand message",
          "The promotional mix must match the target audience - channels should align with where customers spend time",
          "Effective promotion balances reach (how many people see it) with depth (how strongly it resonates and converts)"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mix5-mastery",
            question: "A student's online tutoring business posts fun educational content on TikTok, runs Facebook ads targeting parents, sends professional emails to school administrators, and hands out colorful flyers at local events. The TikTok content is casual and uses slang, while the emails are formal. Is this a problem?",
            options: [
              "No - using different tones for different audiences is always the best approach to maximize total reach",
              "Yes - while adapting to platforms is fine, the core brand message and identity should remain consistent across all channels",
              "No - each channel is completely independent and should have its own unique brand personality and message",
              "Yes - the business should only use one promotional channel to avoid any risk of inconsistent messaging"
            ],
            correctAnswer: 1,
            explanation: "IMC allows tone adaptation (casual on TikTok, professional in emails) but the core brand identity - what the tutoring business stands for, its value proposition, its personality - should feel like the same brand everywhere. Adapting delivery style while maintaining message consistency is the goal."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MIX-6: How the 4 Ps Work Together
  // ═══════════════════════════════════════════════
  {
    lessonId: "mix-6",
    sections: [
      {
        type: "concept",
        title: "How the 4 Ps Work Together - Trade-offs and Interdependencies",
        paragraphs: [
          "The real power of the marketing mix is not in any single P - it is in how all four work together as a system. When the 4 Ps are aligned, they amplify each other. When they conflict, even a strong product can fail. Marketing strategy is about finding the right combination, not perfecting one element.",
          "Trade-offs are inevitable. A premium product demands premium pricing, which limits place options (you can't sell a luxury watch at a dollar store) and requires sophisticated promotion. A mass-market product needs competitive pricing, wide distribution, and high-volume advertising. The strategy must be internally consistent.",
          "Common misalignments include: pricing a product high but distributing it through discount channels (contradicts quality perception), creating a premium brand but using cheap, aggressive promotion (undermines trust), or designing a niche product but attempting mass distribution (wastes resources). The 4 Ps must tell the same story."
        ],
        bullets: [
          "Alignment - all 4 Ps must reinforce the same positioning and tell the same brand story",
          "Trade-offs - decisions in one P constrain options in the others (premium product limits place options)",
          "Misalignment - when Ps contradict each other, the strategy confuses customers and wastes resources",
          "System thinking - the marketing mix is greater than the sum of its parts when all elements work together"
        ],
        realWorldExample: "Tesla's 4 Ps are perfectly aligned: innovative premium product (electric vehicles with cutting-edge tech), premium pricing ($40K-$100K+), selective place (company-owned showrooms and online ordering, no dealerships), and distinctive promotion (Elon Musk's social media, word-of-mouth, no traditional advertising)."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix6-mc1",
            question: "Why is it a problem to price a product high but sell it through discount retail channels?",
            options: [
              "Because the discount channel contradicts the premium positioning, confusing customers about the product's true quality level",
              "Because discount retailers always charge higher fees to vendors than premium retailers do for shelf space",
              "Because high-priced products sell faster in discount stores, leading to inventory shortages that hurt the brand",
              "Because there are legal restrictions that prevent premium products from being sold in discount retail locations"
            ],
            correctAnswer: 0,
            explanation: "Place signals quality - a $200 product at a dollar store sends mixed messages. Customers expect premium products in premium environments. The channel contradicts the pricing, undermining the quality perception the price is supposed to create."
          },
          {
            id: "mix6-mc2",
            question: "What does 'system thinking' mean when applied to the marketing mix?",
            options: [
              "The 4 Ps work as an interconnected system where the whole strategy is more powerful than any individual element alone",
              "Each of the 4 Ps should be optimized independently by separate teams without any coordination between them",
              "System thinking means using technology and software systems to automate all four marketing mix decisions",
              "It means creating a strict hierarchy where product decisions are made first and the other three Ps follow automatically"
            ],
            correctAnswer: 0,
            explanation: "System thinking means seeing the 4 Ps as interconnected parts that amplify or undermine each other. Optimizing one P in isolation is less effective than ensuring all four work together cohesively."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Misaligned Sneaker Launch",
        narrative: "A startup creates a premium handcrafted sneaker (product: high quality, limited edition). They price it at $250 (price: premium). But then they distribute it through a mass discount website known for selling cheap knockoffs (place: misaligned). They promote it with aggressive pop-up ads offering '50% OFF TODAY ONLY!' (promotion: misaligned). Despite the excellent product and justified pricing, the brand fails to gain traction because customers cannot reconcile a 'premium handcrafted sneaker' with a discount platform and desperate-sounding promotions.",
        details: [
          "The product and price were aligned - a $250 handcrafted shoe makes sense as a premium offering",
          "The place and promotion contradicted the positioning - discount channels and urgency tactics signal cheap, not premium",
          "Customers who value premium products avoided it (wrong channel), and discount shoppers ignored it (too expensive for a discount site)"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix6-aq1",
          question: "What should the sneaker startup change to fix their marketing mix misalignment?",
          options: [
            "Distribute through premium channels like boutique sneaker shops or their own website, and promote through brand storytelling and limited-edition drops",
            "Lower the price to $50 to match the discount platform and adjust the product quality to match the lower price point",
            "Keep the discount platform but increase the price to $500 to make the premium positioning even more obvious to shoppers",
            "Remove all promotion entirely since premium products should sell themselves without any marketing efforts at all"
          ],
          correctAnswer: 0,
          explanation: "The fix is aligning place and promotion with the product and price. A premium handcrafted sneaker belongs in premium channels (boutiques, own website) with promotion that tells the craftsmanship story. The product and price were right - the distribution and messaging were wrong."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The 4 Ps work as an interconnected system - alignment amplifies strategy while misalignment undermines it",
          "Trade-offs are inevitable: premium products constrain pricing, place, and promotion options",
          "Common mistakes include contradicting premium positioning with discount channels or aggressive promotions",
          "The most effective marketing strategies tell one consistent story across all four elements of the mix"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mix6-mastery",
            question: "An organic skincare brand sells high-quality products at premium prices through their website and upscale spas. They're considering selling through Walmart to increase volume. Using 4 Ps alignment principles, what is the biggest risk?",
            options: [
              "Walmart's mass-market positioning could undermine the brand's premium image, confusing existing customers about quality",
              "Walmart would charge such high shelf placement fees that the organic products would become unprofitable to sell",
              "Walmart shoppers exclusively buy synthetic skincare products and would never consider organic alternatives",
              "The organic certification process for Walmart is different and would require reformulating all existing products"
            ],
            correctAnswer: 0,
            explanation: "Place sends a signal - selling alongside budget skincare at Walmart contradicts the premium, exclusive positioning. Existing customers may question the brand's quality, and the mass-market audience may not value the premium enough to pay more. The place decision conflicts with product and price positioning."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MIX-7: Startup vs Established Brand
  // ═══════════════════════════════════════════════
  {
    lessonId: "mix-7",
    sections: [
      {
        type: "concept",
        title: "Applying the 4 Ps: Startup vs Established Brand",
        paragraphs: [
          "The same marketing mix framework applies to both startups and established brands - but the strategies within each P look very different based on company stage, resources, and market position. Understanding these differences is essential for making smart decisions at any stage of business growth.",
          "Startups typically have limited budgets, unknown brands, and unproven products. Their product strategy focuses on solving one problem well (MVP approach). Pricing often uses penetration or freemium models to attract initial users. Place is usually direct-to-consumer (website, social media) to control costs. Promotion relies on organic content, word-of-mouth, and guerrilla tactics rather than expensive advertising.",
          "Established brands have recognized names, proven products, and larger budgets. Their product strategy includes line extensions and brand variations. Pricing leverages brand equity to command premiums. Place includes extensive distribution networks. Promotion can afford mass media campaigns, celebrity endorsements, and sophisticated IMC strategies."
        ],
        bullets: [
          "Startup product - MVP focused on solving one problem; established brand - line extensions and product families",
          "Startup pricing - penetration, freemium, or aggressive discounts; established brand - premium, value-based, loyalty tiers",
          "Startup place - direct channels, online-first; established brand - wide distribution, omnichannel presence",
          "Startup promotion - organic, guerrilla, word-of-mouth; established brand - mass media, IMC, celebrity partnerships"
        ],
        realWorldExample: "When Airbnb started, their product was 'rent a stranger's air mattress' (MVP), pricing undercut hotels dramatically (penetration), place was website-only (direct), and promotion was posting listings on Craigslist (guerrilla). Today, Airbnb's product includes luxury homes and experiences, pricing includes premium tiers, place is a global platform with an app, and promotion includes Super Bowl ads."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix7-mc1",
            question: "Why do startups typically use penetration or freemium pricing instead of premium pricing?",
            options: [
              "Because without brand recognition, startups need lower prices to incentivize customers to try an unproven product",
              "Because startups always have lower production costs and can therefore afford to charge less than established brands",
              "Because premium pricing is illegal for companies that have been operating for fewer than five years",
              "Because startup founders prefer lower prices due to their personal values about making products affordable for everyone"
            ],
            correctAnswer: 0,
            explanation: "Without brand equity, trust, or proven track records, startups need to reduce the risk for customers. Lower prices or free tiers give people a reason to try something new from an unknown company."
          },
          {
            id: "mix7-mc2",
            question: "How does an established brand's promotional strategy typically differ from a startup's?",
            options: [
              "Established brands can afford mass media, celebrity endorsements",
              "Established brands never use social media because it is primarily a startup marketing channel for new companies",
              "Startups have larger promotional budgets because they need to build awareness faster than established competitors",
              "There is no meaningful difference - both startups and established brands use the exact same promotional approaches"
            ],
            correctAnswer: 0,
            explanation: "Budget and brand equity create different options. Established brands leverage their resources for broad campaigns and premium partnerships. Startups must be scrappy - using creativity, organic content, and word-of-mouth to compensate for limited budgets."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Companies Selling Meal Kits",
        narrative: "FreshStart is a new meal kit startup. They launch with three simple recipes (product MVP), offer the first box for $4.99 (penetration pricing), sell exclusively through their website (direct place), and promote through food bloggers and Instagram reels (organic promotion). BluApron is the established market leader with 40+ weekly recipes, pricing at $10-12 per serving (value-based), distribution through their platform plus Walmart and Costco (omnichannel), and promotion through TV commercials and celebrity chef partnerships.",
        details: [
          "FreshStart acquires 5,000 customers in month one - the $4.99 trial eliminates risk for new customers",
          "BluApron generates $100M+ annually - their brand recognition and wide distribution create a moat",
          "FreshStart's scrappy approach works at their stage; copying BluApron's strategy would bankrupt them immediately",
          "BluApron using FreshStart's approach would be leaving revenue on the table by underpricing a trusted brand"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix7-aq1",
          question: "Why would it be a mistake for FreshStart to copy BluApron's marketing mix exactly?",
          options: [
            "Because FreshStart lacks the brand equity, budget",
            "Because BluApron's marketing mix is outdated and no longer effective in the modern meal kit market",
            "Because startups are legally prohibited from using mass media advertising until they reach a certain revenue threshold",
            "Because copying a competitor's strategy always results in immediate legal action for intellectual property violation"
          ],
          correctAnswer: 0,
          explanation: "The 4 Ps must match your reality - not someone else's. FreshStart doesn't have BluApron's brand recognition, distribution partnerships, or advertising budget. Trying to execute an established brand's strategy with startup resources leads to failure."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The same 4 Ps framework applies at every stage but strategies within each P change with company maturity",
          "Startups focus on MVPs, penetration pricing, direct channels, and organic/guerrilla promotion",
          "Established brands leverage product extensions, premium pricing, wide distribution, and mass media campaigns",
          "Copying a larger competitor's marketing mix without matching their resources is a common startup mistake"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mix7-mastery",
            question: "A two-person startup that makes custom phone cases wants to grow. They have $500/month for marketing. Which marketing mix strategy is MOST realistic?",
            options: [
              "Launch a national TV advertising campaign to build mass brand awareness among phone owners across the country",
              "Focus on a niche audience on Instagram and TikTok with user-generated content, sell direct through their website",
              "Partner with a major phone manufacturer to include their cases in the box with every new phone sold in stores",
              "Open physical retail locations in three major cities to establish an omnichannel presence for their brand"
            ],
            correctAnswer: 1,
            explanation: "With $500/month, the realistic strategy is startup-appropriate: niche targeting on free platforms (social media), direct distribution (own website), and penetration pricing to build initial customers. TV ads, manufacturer deals, and retail stores require resources they don't have."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MIX-8: Build Your Own Marketing Mix
  // ═══════════════════════════════════════════════
  {
    lessonId: "mix-8",
    sections: [
      {
        type: "concept",
        title: "Build Your Own Marketing Mix - From Concept to Strategy",
        paragraphs: [
          "The ultimate test of understanding the marketing mix is applying it. In this lesson, you will see how to design a complete 4 Ps strategy for a fictional product from scratch. The process starts with identifying a customer need, then systematically building each P to create a coherent, aligned strategy.",
          "Step 1: Define the product - what problem does it solve, who is it for, and what makes it different? Step 2: Set the price - based on your target customer, competitors, and positioning (premium vs value). Step 3: Choose place - where will customers find and buy it (direct, retail, online, omnichannel)? Step 4: Plan promotion - how will you reach your target audience with a consistent message?",
          "The alignment check is critical: after building all four Ps, step back and ask - do they tell the same story? Does a premium product have a premium price, premium distribution, and premium promotion? Or are there contradictions that would confuse customers? This final alignment step separates good marketing from great marketing."
        ],
        bullets: [
          "Start with the customer need - every marketing mix should be built around solving a real problem",
          "Build each P deliberately - product, then price, then place, then promotion in sequence",
          "Alignment check - verify all four Ps tell the same story and reinforce the same positioning",
          "Iterate - the marketing mix is not static; adjust based on customer feedback and market changes"
        ],
        realWorldExample: "When Glossier launched, founder Emily Weiss built from customer need: beauty products for people who want a natural look. Product: minimalist, 'skin first' cosmetics. Price: affordable luxury ($12-$35). Place: online-only DTC. Promotion: community-driven content from the 'Into The Gloss' blog. Every P reinforced the same story - beauty should be easy, personal, and accessible."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mix8-mc1",
            question: "What should be the FIRST step when building a marketing mix for a new product?",
            options: [
              "Identify the customer need the product will solve and define who the target customer is",
              "Set the price point first since it determines how much budget is available for all other decisions",
              "Choose the distribution channels first because place determines which products can be sold successfully",
              "Design the promotional campaign first to test whether there is enough interest before developing the product"
            ],
            correctAnswer: 0,
            explanation: "Everything starts with the customer. If you don't understand who you're serving and what problem you're solving, every other decision - product design, pricing, distribution, and promotion - will be guesswork."
          },
          {
            id: "mix8-mc2",
            question: "What is the purpose of an 'alignment check' after building all four Ps?",
            options: [
              "To verify that all four elements tell the same story and reinforce the same brand positioning without contradictions",
              "To confirm that the marketing budget is evenly divided across all four elements with exactly 25% allocated to each",
              "To check that the product meets all government regulatory requirements before it can be legally sold to consumers",
              "To ensure that each of the four Ps has been assigned to a different team member for independent execution"
            ],
            correctAnswer: 0,
            explanation: "The alignment check catches contradictions - like premium pricing on a discount platform, or mass-market products with niche promotion. When all four Ps align, the strategy is coherent and customers receive one clear message."
          }
        ]
      },
      {
        type: "scenario",
        title: "Building a Marketing Mix: Student Planner App",
        narrative: "A team of students wants to launch a digital planner app for high schoolers. They walk through the 4 Ps process. Product: a mobile app with assignment tracking, grade predictions, and study schedule generation - solving the problem of overwhelmed students who miss deadlines. Price: freemium model with basic features free and premium features at $2.99/month (penetration for students). Place: iOS and Android app stores with a companion website (direct digital distribution). Promotion: TikTok study tip content, partnerships with school clubs, and a referral program giving one free month for each friend.",
        details: [
          "Alignment check: freemium pricing matches the student audience (low budget), app store distribution matches where students already are, and TikTok promotion reaches high schoolers",
          "Every P reinforces the positioning: affordable, accessible, and designed specifically for overwhelmed high school students",
          "If they had priced at $9.99/month, distributed only through school administrators, and promoted through LinkedIn - the mix would be completely misaligned"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mix8-aq1",
          question: "The student planner team considers adding a $9.99/month enterprise tier for schools. How should they evaluate this decision using marketing mix alignment?",
          options: [
            "They should build a separate marketing mix for the enterprise segment - different product features, pricing, place (direct sales to administrators)",
            "They should apply the same freemium pricing to schools because consistency across all segments is more important than revenue",
            "They should abandon the student product entirely and pivot to enterprise since schools have larger budgets than individual students",
            "They should add the enterprise tier to their existing TikTok promotional strategy since it already reaches the school community"
          ],
          correctAnswer: 0,
          explanation: "Different segments need different marketing mixes. Enterprise (schools) requires different product features (admin dashboards), pricing (institutional budgets), place (direct sales), and promotion (professional channels). Using the student mix for enterprise - or vice versa - would be a misalignment."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Building a marketing mix starts with the customer need and proceeds through product, price, place, and promotion",
          "The alignment check is the final critical step - all four Ps must tell the same story without contradictions",
          "Different customer segments may require entirely different marketing mixes even within the same company",
          "The marketing mix is not static - it should evolve based on customer feedback, market changes, and business growth"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mix8-mastery",
            question: "A student designs a marketing mix for a premium dog treat brand: organic ingredients (product), $15/bag (price), sold at Petco and their own website (place), promoted through Instagram pet influencers (promotion). Is this mix aligned?",
            options: [
              "Yes - all four Ps consistently support a premium pet product positioning with appropriate channels and messaging",
              "No - the price is too high for a dog treat and should be lowered to $5 to reach more dog owners at retail",
              "No - selling at Petco is a mass-market channel that contradicts the premium organic brand positioning",
              "No - Instagram influencers are not an appropriate promotional channel for premium pet food products"
            ],
            correctAnswer: 0,
            explanation: "This mix is well-aligned: organic premium product justifies $15 pricing, Petco is the right specialty retail channel for premium pet products (not a dollar store), and Instagram pet influencers reach exactly the right audience. All four Ps tell the same premium pet brand story."
          }
        ]
      }
    ]
  }
]
