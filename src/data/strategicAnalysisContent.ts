import { StructuredLessonContent } from "@/types"

export const strategicAnalysisContent: StructuredLessonContent[] = [
  // SA-1: What is Business Strategy and Why It Matters
  {
    lessonId: "sa-1",
    sections: [
      {
        type: "concept",
        title: "What Is Business Strategy?",
        paragraphs: [
          "Business strategy is a plan for how a company will achieve its goals and outperform competitors. Without strategy, a business is just reacting - making decisions based on whatever happens today rather than building toward a clear future.",
          "Strategy answers three core questions: Where are we now? Where do we want to be? How do we get there? Every successful company - from a local coffee shop to a tech giant - has some form of strategy guiding its decisions.",
          "Good strategy involves making trade-offs. You can't be everything to everyone. A company that tries to be the cheapest AND the most premium AND the fastest usually fails at all three. Strategy is about choosing what to focus on - and what to say no to."
        ],
        bullets: [
          "Strategy is a deliberate plan for achieving competitive advantage",
          "It answers: Where are we? Where do we want to be? How do we get there?",
          "Good strategy requires making trade-offs and tough choices",
          "Without strategy, businesses react instead of building proactively",
          "Strategy applies to businesses of all sizes - not just corporations"
        ],
        realWorldExample: "In-N-Out Burger has a famously simple strategy: a small menu, fresh ingredients, and no franchising. By saying 'no' to expanding too fast or adding dozens of menu items, they've built one of the most profitable fast-food chains per location in America. Their strategy is about what they DON'T do as much as what they do."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa1-mc1",
            question: "What is the primary purpose of a business strategy?",
            options: ["To create the largest product catalog possible", "To achieve goals and outperform competitors through deliberate planning", "To copy what the most successful competitor is doing", "To maximize short-term profits above all else"],
            correctAnswer: 1,
            explanation: "Strategy is a deliberate plan for how a company will achieve its goals and build competitive advantage - not just reacting to what happens."
          },
          {
            id: "sa1-mc2",
            question: "Why does good strategy require trade-offs?",
            options: ["Because businesses always have unlimited resources", "Because trying to do everything usually means doing nothing well", "Because regulations force companies to choose one path", "Because trade-offs are required by business law"],
            correctAnswer: 1,
            explanation: "A company that tries to be everything to everyone spreads itself too thin. Strategy means choosing what to focus on and what to deliberately avoid."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Pizza Shops, Two Strategies",
        narrative: "Tony and Maria both open pizza shops in the same neighborhood. Tony decides to compete on price - offering $5 large pizzas, fast delivery, and no frills. Maria decides to compete on quality - using imported ingredients, a wood-fired oven, and a cozy dine-in experience with higher prices. Both shops succeed because each has a clear strategy. But when Tony tries to also add a premium menu and Maria tries to also offer $5 deals, both start losing money. Their strategies became confused.",
        details: [
          "Tony's strategy: Cost leadership - high volume, low margins, speed",
          "Maria's strategy: Differentiation - premium quality, unique experience, higher margins",
          "Both strategies work when executed consistently",
          "Problems arise when either tries to do both - customers get confused about what the brand stands for"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa1-aq1",
          question: "A clothing brand known for affordable basics starts adding luxury designer collections. What strategic risk does this create?",
          options: ["It will automatically increase profits from both segments", "It confuses the brand identity and may alienate core customers", "Luxury products always sell better than basics", "There is no risk because more products always means more revenue"],
          correctAnswer: 1,
          explanation: "When a brand known for one thing tries to also be its opposite, it risks confusing customers and diluting what made the brand successful in the first place."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Business strategy is a deliberate plan to achieve goals and competitive advantage",
          "Strategy answers: Where are we? Where do we want to be? How do we get there?",
          "Good strategy requires trade-offs - you can't be everything to everyone",
          "Consistent execution of a clear strategy beats trying to do everything"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "sa1-mq1",
            question: "Which of the following best describes business strategy?",
            options: ["Reacting quickly to whatever competitors do", "A deliberate plan for achieving goals and competitive advantage", "Copying the industry leader's approach exactly", "Maximizing the number of products offered"],
            correctAnswer: 1,
            explanation: "Strategy is about deliberate planning and making choices that build competitive advantage over time."
          },
          {
            id: "sa1-mq2",
            question: "What happens when a company tries to pursue conflicting strategies simultaneously?",
            options: ["It doubles its chances of success", "It becomes 'stuck in the middle' and loses clarity with customers", "Customers appreciate having more options from one brand", "Revenue automatically increases from both segments"],
            correctAnswer: 1,
            explanation: "Pursuing conflicting strategies dilutes focus and confuses customers about what the brand stands for."
          },
          {
            id: "sa1-mq3",
            question: "Why is In-N-Out Burger's strategy considered effective?",
            options: ["They have the largest menu in fast food", "They franchise aggressively to maximize locations", "They focus on a small menu and quality, saying 'no' to overexpansion", "They compete primarily on having the lowest prices"],
            correctAnswer: 2,
            explanation: "In-N-Out's strategy works because they're disciplined about what they won't do - keeping the menu small, ingredients fresh, and growth controlled."
          },
          {
            id: "sa1-mq4",
            question: "The three core questions of strategy are:",
            options: ["What, When, Why", "Who, How, Where", "Where are we now, Where do we want to be, How do we get there", "Plan, Execute, Measure"],
            correctAnswer: 2,
            explanation: "Strategy starts with understanding your current position, defining your desired future state, and mapping the path between them."
          },
          {
            id: "sa1-mq5",
            question: "A local bakery decides to focus exclusively on custom wedding cakes rather than selling all types of baked goods. This is an example of:",
            options: ["Poor business management", "Strategic focus through trade-offs", "Giving up on growth opportunities", "A temporary marketing tactic"],
            correctAnswer: 1,
            explanation: "Choosing to specialize is a strategic trade-off - the bakery says 'no' to some revenue to become the best at one thing."
          }
        ]
      }
    ]
  },

  // SA-2: KPIs
  {
    lessonId: "sa-2",
    sections: [
      {
        type: "concept",
        title: "KPIs - Measuring What Actually Matters",
        paragraphs: [
          "Key Performance Indicators (KPIs) are specific, measurable values that show whether a business is achieving its most important objectives. Think of KPIs as the dashboard in a car - you can't drive well if you don't know your speed, fuel level, or engine temperature.",
          "Not every number is a KPI. Revenue, website visits, and social media followers are all metrics - but only some of them are truly 'key' to your business. A KPI must be directly tied to a strategic goal. If your goal is customer retention, then your churn rate is a KPI. If your goal is growth, then monthly new customers might be your KPI.",
          "The best KPIs are SMART: Specific, Measurable, Achievable, Relevant, and Time-bound. 'Increase sales' is vague. 'Increase monthly recurring revenue by 15% within Q3' is a real KPI."
        ],
        bullets: [
          "KPIs are measurable values tied directly to strategic objectives",
          "Not all metrics are KPIs - only the ones that matter most to your goals",
          "Leading indicators predict future performance (e.g., pipeline deals)",
          "Lagging indicators measure past results (e.g., quarterly revenue)",
          "Good KPIs follow the SMART framework: Specific, Measurable, Achievable, Relevant, Time-bound"
        ],
        realWorldExample: "Netflix tracks 'viewing hours per subscriber' as a key KPI - not just total subscribers. Why? Because a subscriber who watches 20 hours a month is far less likely to cancel than one who watches 2 hours. This KPI helps Netflix predict churn before it happens and guides decisions about what content to produce."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa2-mc1",
            question: "What makes a metric qualify as a KPI?",
            options: ["It must be the largest number the company tracks", "It must be directly tied to a strategic business objective", "It must involve financial data only", "It must be reported to shareholders quarterly"],
            correctAnswer: 1,
            explanation: "A KPI is 'key' because it directly measures progress toward an important strategic goal - not just because it's a big or interesting number."
          },
          {
            id: "sa2-mc2",
            question: "A good KPI follows the SMART framework. Which of these is written as a proper SMART KPI?",
            options: ["Increase sales as much as we possibly can", "Increase monthly recurring revenue by 15% by the end of Q3", "Become the best company in the entire industry", "Make our customers happier over time"],
            correctAnswer: 1,
            explanation: "SMART KPIs are Specific, Measurable, Achievable, Relevant, and Time-bound. 'Increase MRR by 15% by end of Q3' has a clear target and deadline; the others are too vague to measure or track."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Social Media Trap",
        narrative: "FreshFit is a healthy meal delivery startup. The marketing team is celebrating because their Instagram grew from 5,000 to 50,000 followers in three months. But when the CEO checks the business dashboard, she notices something concerning: monthly orders have barely changed, customer acquisition cost has tripled, and the churn rate is climbing. The followers are vanity metrics - they look impressive but aren't driving actual business results. The team was optimizing for the wrong KPI.",
        details: [
          "Vanity metric: Instagram followers (grew 10x but didn't drive orders)",
          "Actual KPI that matters: Customer acquisition cost (tripled - unsustainable)",
          "Actual KPI that matters: Monthly recurring orders (flat despite follower growth)",
          "Lesson: The team should track conversion rate from social media to paying customers, not just follower count"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa2-aq1",
          question: "A SaaS company's strategic goal is to reduce customer churn. Which KPI would be most useful to track?",
          options: ["Total website visitors per month", "Number of new blog posts published", "Percentage of customers who cancel within 90 days", "Total social media impressions"],
          correctAnswer: 2,
          explanation: "If the goal is reducing churn, then measuring what percentage of customers cancel (and when) directly tracks progress toward that objective."
        }
      },
      {
        type: "recap",
        takeaways: [
          "KPIs are measurable values directly tied to strategic objectives",
          "Not every metric is a KPI - focus on what truly drives business success",
          "Leading indicators predict the future; lagging indicators measure the past",
          "Vanity metrics (likes, followers) can be misleading if they don't connect to real business results"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "sa2-mq1",
            question: "Which of the following is the best example of a SMART KPI?",
            options: ["Get more customers", "Increase revenue somehow", "Grow monthly active users by 20% by end of Q2", "Make the product better"],
            correctAnswer: 2,
            explanation: "A SMART KPI is Specific (monthly active users), Measurable (20%), Achievable, Relevant, and Time-bound (by end of Q2)."
          },
          {
            id: "sa2-mq2",
            question: "Why are vanity metrics dangerous for decision-making?",
            options: ["They are always inaccurate", "They look impressive but may not connect to actual business outcomes", "They are illegal to report to investors", "They always decrease over time"],
            correctAnswer: 1,
            explanation: "Vanity metrics like follower counts can look great but may not drive revenue, retention, or other outcomes that matter to the business."
          },
          {
            id: "sa2-mq3",
            question: "A company tracks 'number of sales calls made per week.' This is an example of:",
            options: ["A lagging indicator", "A vanity metric", "A leading indicator", "An irrelevant metric"],
            correctAnswer: 2,
            explanation: "Sales calls made is a leading indicator - it predicts future sales results. More calls today typically means more deals closed next month."
          },
          {
            id: "sa2-mq4",
            question: "Netflix tracks 'viewing hours per subscriber' rather than just total subscribers. Why?",
            options: ["Total subscribers is too hard to measure accurately", "Viewing hours predict churn - engaged viewers are less likely to cancel", "Advertisers only care about viewing hours", "It's required by streaming industry regulations"],
            correctAnswer: 1,
            explanation: "Viewing hours per subscriber is a leading indicator of retention - subscribers who watch more are far less likely to cancel their subscription."
          },
          {
            id: "sa2-mq5",
            question: "A restaurant's strategic goal is to improve customer satisfaction. Which KPI is most aligned?",
            options: ["Total number of menu items offered", "Average customer rating on review platforms", "Number of social media posts per week", "Total square footage of the restaurant"],
            correctAnswer: 1,
            explanation: "Customer ratings directly measure satisfaction, making it the KPI most aligned with the strategic goal."
          }
        ]
      }
    ]
  },

  // SA-3: SWOT Analysis
  {
    lessonId: "sa-3",
    sections: [
      {
        type: "concept",
        title: "SWOT Analysis - A Framework for Strategic Thinking",
        paragraphs: [
          "SWOT analysis is one of the most widely used strategic planning tools in business. It helps you evaluate a company's position by examining four categories: Strengths, Weaknesses, Opportunities, and Threats.",
          "Strengths and Weaknesses are internal factors - things the company controls, like its brand reputation, team talent, financial resources, or operational efficiency. Opportunities and Threats are external factors - things happening in the market, economy, or industry that the company must respond to.",
          "SWOT is powerful because it forces structured thinking. Instead of just saying 'things are going well' or 'we have problems,' it pushes you to categorize and prioritize. The real value comes from connecting the dots - using strengths to capture opportunities, or addressing weaknesses before threats exploit them."
        ],
        bullets: [
          "Strengths: Internal advantages (brand, talent, resources, patents)",
          "Weaknesses: Internal disadvantages (high costs, skill gaps, aging technology)",
          "Opportunities: External favorable conditions (new markets, trends, regulations)",
          "Threats: External unfavorable conditions (competitors, economic downturns, disruption)",
          "The power is in connecting the categories - not just listing items"
        ],
        realWorldExample: "When Starbucks conducted a SWOT analysis in 2008 during the financial crisis, they identified a key weakness: they had expanded too fast, diluting the customer experience. An opportunity existed in the growing demand for premium, ethically-sourced coffee. CEO Howard Schultz closed 600 underperforming stores (addressing the weakness) and doubled down on store experience and ethical sourcing (capturing the opportunity). The stock price recovered from $8 to over $100 within a decade."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa3-mc1",
            question: "In a SWOT analysis, which two categories represent internal factors?",
            options: ["Opportunities and Threats", "Strengths and Weaknesses", "Strengths and Opportunities", "Weaknesses and Threats"],
            correctAnswer: 1,
            explanation: "Strengths and Weaknesses are internal - things the company controls. Opportunities and Threats are external factors from the market or environment."
          },
          {
            id: "sa3-mc2",
            question: "What makes SWOT analysis more useful than simply listing problems?",
            options: ["It uses more complicated vocabulary", "It forces structured categorization that reveals connections between factors", "It eliminates the need for other strategic tools", "It guarantees the company will succeed"],
            correctAnswer: 1,
            explanation: "SWOT's structure helps you see how strengths can address threats, how weaknesses might be exploited, and where the biggest strategic priorities lie."
          }
        ]
      },
      {
        type: "scenario",
        title: "SWOT in Action: A Student Clothing Brand",
        narrative: "Jaylen runs a small online clothing brand selling custom streetwear. He decides to run a SWOT analysis before expanding. Strengths: strong Instagram following (15K), unique designs, low overhead. Weaknesses: no website (sells only through DMs), no inventory system, one-person operation. Opportunities: growing demand for sustainable fashion, local pop-up markets reopening. Threats: fast-fashion brands copying indie designs, rising shipping costs. By mapping this out, Jaylen realizes he should build a website (fix weakness) and pivot toward sustainable materials (capture opportunity) before competitors copy his style (neutralize threat).",
        details: [
          "Strengths leveraged: Strong social following provides free marketing for a new website launch",
          "Weakness addressed: Building a website removes the DM bottleneck and enables scaling",
          "Opportunity captured: Sustainable fashion trend aligns with his small-batch production model",
          "Threat neutralized: Unique sustainable angle makes it harder for fast-fashion to copy"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa3-aq1",
          question: "A bakery has a loyal local customer base (strength) but rising ingredient costs (threat). Which SWOT-informed strategy makes the most sense?",
          options: ["Ignore the rising costs and hope they go down", "Use customer loyalty to introduce premium products at higher price points", "Close the bakery and switch to a different industry", "Eliminate all expensive ingredients immediately"],
          correctAnswer: 1,
          explanation: "SWOT thinking connects strengths to threats: the loyal customer base (strength) can support premium pricing that absorbs higher ingredient costs (threat)."
        }
      },
      {
        type: "recap",
        takeaways: [
          "SWOT stands for Strengths, Weaknesses, Opportunities, and Threats",
          "Strengths and Weaknesses are internal; Opportunities and Threats are external",
          "The real value is connecting categories - using strengths to capture opportunities or counter threats",
          "SWOT works for businesses of all sizes, from startups to global corporations"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "sa3-mq1",
            question: "A company has strong brand recognition but outdated technology. Which SWOT categories do these belong to?",
            options: ["Both are Strengths", "Brand recognition is a Strength; outdated technology is a Weakness", "Brand recognition is an Opportunity; outdated technology is a Threat", "Both are Weaknesses"],
            correctAnswer: 1,
            explanation: "Brand recognition is an internal advantage (Strength); outdated technology is an internal disadvantage (Weakness)."
          },
          {
            id: "sa3-mq2",
            question: "A new government regulation makes it easier for small businesses to export products. This is an example of:",
            options: ["A Strength", "A Weakness", "An Opportunity", "A Threat"],
            correctAnswer: 2,
            explanation: "Favorable external conditions like supportive regulations are Opportunities - they create new possibilities for the business."
          },
          {
            id: "sa3-mq3",
            question: "Why did Starbucks close 600 stores in 2008?",
            options: ["They were running out of coffee beans", "SWOT revealed overexpansion was diluting the customer experience", "The government forced them to close", "They wanted to focus only on online sales"],
            correctAnswer: 1,
            explanation: "Their SWOT analysis revealed that rapid expansion (weakness) was hurting quality. Closing underperforming stores addressed this internal weakness."
          },
          {
            id: "sa3-mq4",
            question: "What is the most strategic way to use a SWOT analysis?",
            options: ["List as many items as possible in each category", "Connect the categories - use strengths to capture opportunities and counter threats", "Focus only on strengths and ignore weaknesses", "Share it with competitors to show transparency"],
            correctAnswer: 1,
            explanation: "The real power of SWOT is connecting the dots - matching strengths to opportunities and addressing weaknesses before threats exploit them."
          },
          {
            id: "sa3-mq5",
            question: "A new competitor entering your market is an example of which SWOT category?",
            options: ["Strength", "Weakness", "Opportunity", "Threat"],
            correctAnswer: 3,
            explanation: "A new competitor is an external unfavorable condition - a Threat that could take market share or pressure your pricing."
          }
        ]
      }
    ]
  },

  // SA-4: Porter's Five Forces
  {
    lessonId: "sa-4",
    sections: [
      {
        type: "concept",
        title: "Porter's Five Forces - Understanding Industry Competition",
        paragraphs: [
          "Porter's Five Forces is a framework developed by Harvard professor Michael Porter to analyze the competitive dynamics of an entire industry. While SWOT looks at one company, Porter's Five Forces examines the broader competitive environment that affects every company in that industry.",
          "The five forces are: (1) Threat of New Entrants - how easy is it for new competitors to enter? (2) Bargaining Power of Buyers - how much power do customers have to demand lower prices? (3) Bargaining Power of Suppliers - how much power do suppliers have to raise prices? (4) Threat of Substitutes - can customers switch to alternative products? (5) Industry Rivalry - how intense is competition among existing players?",
          "When all five forces are strong, an industry tends to be less profitable. When forces are weak, companies in that industry can earn higher profits. Understanding these forces helps businesses choose which industries to enter and how to position themselves."
        ],
        bullets: [
          "Threat of New Entrants: High barriers (patents, capital) = less threat",
          "Buyer Power: Many choices or low switching costs = high buyer power",
          "Supplier Power: Few suppliers or unique inputs = high supplier power",
          "Threat of Substitutes: Easy alternatives reduce industry profitability",
          "Industry Rivalry: More competitors + slow growth = intense rivalry"
        ],
        realWorldExample: "The airline industry is notoriously unprofitable because all five forces work against it: low barriers to entry (new airlines launch regularly), high buyer power (customers price-shop obsessively), high supplier power (Boeing and Airbus dominate), many substitutes (trains, cars, video calls), and intense rivalry (airlines compete fiercely on price). Warren Buffett famously said, 'If a farsighted capitalist had been present at Kitty Hawk, he would have done his successors a huge favor by shooting Orville down.'"
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa4-mc1",
            question: "What does Porter's Five Forces analyze?",
            options: ["A single company's financial statements", "The competitive dynamics of an entire industry", "Employee satisfaction within an organization", "The marketing mix of a product"],
            correctAnswer: 1,
            explanation: "Porter's Five Forces examines industry-level competition - the forces that affect profitability for ALL companies in that industry, not just one."
          },
          {
            id: "sa4-mc2",
            question: "When all five forces are strong, what typically happens to industry profitability?",
            options: ["It increases significantly", "It decreases because competition is intense from all angles", "It stays exactly the same", "Profitability is not affected by competitive forces"],
            correctAnswer: 1,
            explanation: "Strong forces mean more competition, more buyer and supplier power, and more substitutes - all of which squeeze profits for companies in that industry."
          }
        ]
      },
      {
        type: "scenario",
        title: "Five Forces: Smartphone Industry",
        narrative: "Analyzing the smartphone industry through Porter's lens reveals interesting dynamics. Threat of New Entrants: Moderate - starting a smartphone company requires huge capital but Chinese manufacturers have lowered barriers. Buyer Power: High - consumers can easily switch brands and compare prices online. Supplier Power: High - key chip suppliers like TSMC and Qualcomm have enormous leverage. Threat of Substitutes: Low - no product truly replaces a smartphone. Industry Rivalry: Extremely high - Apple, Samsung, Google, and Chinese brands compete aggressively. This explains why most smartphone makers (except Apple) have thin profit margins.",
        details: [
          "Apple succeeds despite strong forces by creating high switching costs (ecosystem lock-in)",
          "Samsung competes by controlling its own supply chain (makes its own chips and screens)",
          "Chinese manufacturers compete on price, accepting lower margins for market share",
          "The low substitute threat is one of the few forces working IN favor of smartphone companies"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa4-aq1",
          question: "A pharmaceutical company holds a patent on a life-saving drug with no alternatives. Which of Porter's forces is weakest for this company?",
          options: ["Bargaining power of buyers", "Threat of new entrants", "Threat of substitutes", "Industry rivalry"],
          correctAnswer: 2,
          explanation: "With a patent and no alternatives, the threat of substitutes is very weak - patients and hospitals have no choice but to buy from this company, giving it strong pricing power."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Porter's Five Forces analyzes industry-level competition, not just one company",
          "The five forces: new entrants, buyer power, supplier power, substitutes, and rivalry",
          "Strong forces = lower industry profitability; weak forces = higher profitability",
          "Companies succeed by finding ways to weaken the forces working against them"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "sa4-mq1",
            question: "Why is the airline industry typically low-profit?",
            options: ["Airlines don't charge enough for tickets", "All five of Porter's forces work against airlines", "There are too few airlines to create competition", "Airlines spend too much on marketing"],
            correctAnswer: 1,
            explanation: "Every force is strong: easy entry, price-sensitive buyers, powerful suppliers (Boeing/Airbus), substitutes (trains, cars), and intense rivalry."
          },
          {
            id: "sa4-mq2",
            question: "High barriers to entry (like expensive equipment or patents) affect which force?",
            options: ["Bargaining power of buyers", "Threat of new entrants", "Threat of substitutes", "Supplier power"],
            correctAnswer: 1,
            explanation: "High barriers to entry reduce the threat of new entrants - it's harder for new competitors to join the industry."
          },
          {
            id: "sa4-mq3",
            question: "How does Apple weaken buyer power in the smartphone industry?",
            options: ["By offering the lowest prices", "By creating ecosystem lock-in that raises switching costs", "By reducing the quality of competitor products", "By limiting the number of phones produced"],
            correctAnswer: 1,
            explanation: "Apple's ecosystem (iMessage, AirDrop, iCloud, Apple Watch) creates high switching costs, making it harder for customers to leave - which weakens their bargaining power."
          },
          {
            id: "sa4-mq4",
            question: "If customers can easily find alternative products, which force is strong?",
            options: ["Threat of new entrants", "Supplier power", "Threat of substitutes", "Industry rivalry"],
            correctAnswer: 2,
            explanation: "When alternatives are readily available, the threat of substitutes is strong - customers can switch if prices rise or quality drops."
          },
          {
            id: "sa4-mq5",
            question: "A company that manufactures the only type of chip used in medical devices has:",
            options: ["Weak supplier power because medical devices are expensive", "Strong supplier power because buyers have no alternative suppliers", "No competitive advantage", "High threat of substitutes"],
            correctAnswer: 1,
            explanation: "Being the sole supplier of a critical input gives enormous bargaining power - buyers must accept your terms because there's no alternative."
          }
        ]
      }
    ]
  },

  // SA-5: Applying SWOT to Evaluate a Business Opportunity
  {
    lessonId: "sa-5",
    sections: [
      {
        type: "concept",
        title: "Using SWOT to Evaluate Real Business Opportunities",
        paragraphs: [
          "Running a SWOT analysis isn't just an academic exercise - it's a practical tool for evaluating whether to pursue a business opportunity, launch a product, or enter a new market. The key is being brutally honest in each category and then using the results to make a clear go/no-go decision.",
          "Start by gathering real data, not just opinions. For Strengths, look at what your company actually does better than competitors. For Weaknesses, identify genuine gaps - not things you wish were better, but things that could actually cause failure. For Opportunities, research market trends, customer needs, and regulatory changes. For Threats, study competitor moves, economic conditions, and technology shifts.",
          "The most valuable step is the 'so what?' analysis. After listing items in each quadrant, ask: Can our strengths capture this opportunity? Will our weaknesses prevent us from succeeding? Is the threat manageable? This is where SWOT becomes a decision-making tool, not just a list."
        ],
        bullets: [
          "Use real data, not opinions, when filling out each SWOT quadrant",
          "Be brutally honest about weaknesses - sugarcoating defeats the purpose",
          "The 'so what?' step converts lists into actionable strategic decisions",
          "Match strengths to opportunities for your best strategic moves",
          "If weaknesses align with threats, that's a red flag requiring urgent attention"
        ],
        realWorldExample: "Before launching Disney+, Disney ran an intensive strategic analysis. Strengths: massive content library (Marvel, Star Wars, Pixar, Disney classics), global brand recognition. Weaknesses: no direct-to-consumer streaming experience, behind Netflix by years. Opportunities: cord-cutting trend accelerating, families wanting kid-safe content. Threats: Netflix, Amazon, and HBO already established. Their conclusion: the strength of their content library and brand was strong enough to overcome the late-mover weakness. They launched at $6.99/month - undercutting Netflix - and hit 100 million subscribers in just 16 months."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa5-mc1",
            question: "What is the most important step after completing a SWOT analysis?",
            options: ["Making the chart look visually appealing", "Asking 'so what?' - connecting categories to make strategic decisions", "Sharing it on social media for feedback", "Adding as many items as possible to each quadrant"],
            correctAnswer: 1,
            explanation: "The lists themselves aren't valuable - the strategic decisions you make by connecting strengths to opportunities and addressing weakness-threat combinations are what matter."
          },
          {
            id: "sa5-mc2",
            question: "Why should you be 'brutally honest' about weaknesses in a SWOT analysis?",
            options: ["To discourage the team from pursuing the opportunity", "Because sugarcoating weaknesses prevents you from addressing real risks", "Honesty is only important for public companies", "Weaknesses don't actually affect business outcomes"],
            correctAnswer: 1,
            explanation: "If you hide or minimize real weaknesses, you can't plan for them - and they'll likely cause problems when you try to execute your strategy."
          }
        ]
      },
      {
        type: "scenario",
        title: "SWOT for a Student's Tutoring Business",
        narrative: "Aisha wants to start a peer tutoring business at her school. She runs a SWOT before investing her savings. Strengths: straight-A student, great at explaining concepts, friends already ask her for help. Weaknesses: no business experience, limited time due to her own coursework, no marketing budget. Opportunities: school just cut its free tutoring program, midterms are in 6 weeks, parents are willing to pay for academic help. Threats: online tutoring platforms are cheap and convenient, another student already tutors informally. Her 'so what?' analysis: the timing (cut program + midterms) creates urgency, her reputation reduces marketing needs, but she must start small to manage the time weakness. She decides to launch with just 3 subjects and 5 students maximum.",
        details: [
          "Strength → Opportunity match: Her academic reputation fills the gap left by the cut tutoring program",
          "Weakness mitigation: Starting with only 3 subjects and 5 students prevents burnout",
          "Threat response: In-person, personalized attention differentiates her from cheap online platforms",
          "Go decision: The opportunity timing is too good to miss, and weaknesses are manageable with a small start"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa5-aq1",
          question: "A SWOT analysis reveals strong weaknesses that directly align with major threats. What should the business do?",
          options: ["Ignore the analysis and proceed anyway", "Treat this as a serious red flag and either fix the weaknesses or reconsider the opportunity", "Focus only on strengths and opportunities instead", "Assume the threats won't actually materialize"],
            correctAnswer: 1,
          explanation: "When weaknesses align with threats, it's the most dangerous combination - like having a leaky boat heading into a storm. The business must address this before proceeding."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Use real data and brutal honesty when completing each SWOT quadrant",
          "The 'so what?' analysis is where SWOT becomes a decision-making tool",
          "Match strengths to opportunities for your best strategic moves",
          "When weaknesses align with threats, treat it as a serious red flag"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "sa5-mq1",
            question: "How did Disney use SWOT thinking before launching Disney+?",
            options: ["They decided their brand was too weak to compete", "They matched their content library strength to the cord-cutting opportunity", "They copied Netflix's exact strategy", "They decided not to launch because of competitive threats"],
            correctAnswer: 1,
            explanation: "Disney matched their content strength (Marvel, Star Wars, Pixar) to the cord-cutting opportunity, concluding their content was strong enough to compete despite being a late mover."
          },
          {
            id: "sa5-mq2",
            question: "A student's SWOT shows she has great skills (strength) but no time (weakness) to pursue an opportunity. What's the best approach?",
            options: ["Quit everything else to make time", "Start small and manageable to test the opportunity without overcommitting", "Give up because the weakness cancels the strength", "Ignore the time constraint and hope it works out"],
            correctAnswer: 1,
            explanation: "Starting small lets you test the opportunity while respecting the time constraint - you validate the idea before committing fully."
          },
          {
            id: "sa5-mq3",
            question: "What's the most dangerous combination in a SWOT analysis?",
            options: ["Strong strengths with strong opportunities", "Weak strengths with weak threats", "Major weaknesses that align directly with major threats", "Many opportunities with few strengths"],
            correctAnswer: 2,
            explanation: "When your biggest weaknesses are in the same areas as your biggest threats, you're extremely vulnerable - like having gaps in your armor exactly where attacks are coming."
          },
          {
            id: "sa5-mq4",
            question: "Why is 'use real data, not opinions' important in SWOT analysis?",
            options: ["Opinions are always wrong", "Data-backed analysis prevents wishful thinking and reveals genuine strategic reality", "Only financial data matters in business", "Customers prefer data-driven companies"],
            correctAnswer: 1,
            explanation: "Opinion-based SWOT tends to overstate strengths and understate weaknesses. Real data keeps the analysis honest and actionable."
          },
          {
            id: "sa5-mq5",
            question: "Aisha decided to start her tutoring business with only 3 subjects and 5 students. This decision reflects:",
            options: ["A lack of ambition", "Strategic mitigation of her time weakness", "A failure to understand market demand", "Ignoring the SWOT results entirely"],
            correctAnswer: 1,
            explanation: "Starting small directly addresses her time weakness while still allowing her to capture the opportunity - this is smart SWOT-informed strategy."
          }
        ]
      }
    ]
  },

  // SA-6: Applying Porter's Five Forces to a Real Industry
  {
    lessonId: "sa-6",
    sections: [
      {
        type: "concept",
        title: "Porter's Five Forces in Practice - Streaming and Fast Food",
        paragraphs: [
          "The best way to understand Porter's Five Forces is to apply it to industries you already know. Let's analyze two very different industries - streaming entertainment and fast food - to see how the five forces shape profitability and competition differently.",
          "The streaming industry has moderate entry barriers (content creation is expensive but technology is accessible), high buyer power (consumers can easily cancel and switch), growing supplier power (content creators and studios demand higher fees), high substitute threats (gaming, social media, free YouTube), and intense rivalry (Netflix, Disney+, HBO, Amazon, Apple). This explains why most streaming services are unprofitable despite massive subscriber numbers.",
          "Fast food has moderate entry barriers (opening a restaurant is possible but competing with established brands is hard), moderate buyer power (customers are price-sensitive but habitual), low supplier power (commodity ingredients from many sources), high substitute threats (cooking at home, meal kits, healthy options), and intense rivalry (McDonald's, Burger King, Wendy's, Chick-fil-A). Fast food succeeds through brand loyalty, convenience, and massive scale."
        ],
        bullets: [
          "Apply the framework to real industries to make it concrete and useful",
          "Different industries have very different force profiles",
          "Strong forces explain why some industries are unprofitable despite high revenue",
          "Companies succeed by finding ways to weaken the strongest forces against them",
          "The analysis changes over time as technology and markets evolve"
        ],
        realWorldExample: "Chick-fil-A has brilliantly weakened several forces. They reduce rivalry by being closed on Sundays (creating scarcity and brand identity). They weaken buyer power by building extreme customer loyalty through service quality. They reduce new entrant threats by being very selective about franchise operators (only 80-100 new locations per year from 60,000+ applications). The result: Chick-fil-A generates more revenue per restaurant than any other fast-food chain - even while being open one fewer day per week."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa6-mc1",
            question: "Why are most streaming services unprofitable despite having millions of subscribers?",
            options: ["They don't charge enough for subscriptions", "All five forces are relatively strong - especially buyer power, rivalry", "Streaming technology is too expensive to maintain", "There aren't enough people willing to pay for streaming"],
            correctAnswer: 1,
            explanation: "High buyer power (easy to cancel), intense rivalry (many competitors), and strong substitute threats (gaming, YouTube, social media) squeeze profits across the streaming industry."
          },
          {
            id: "sa6-mc2",
            question: "How does Chick-fil-A weaken the threat of new entrants?",
            options: ["By lowering their prices below what competitors charge", "By being highly selective about franchise operators, limiting new locations", "By spending more on advertising than any other chain", "By offering the largest menu in fast food"],
            correctAnswer: 1,
            explanation: "Chick-fil-A accepts only about 0.15% of franchise applicants and opens relatively few new stores, maintaining quality and exclusivity that newcomers can't easily replicate."
          }
        ]
      },
      {
        type: "scenario",
        title: "Five Forces Analysis: The Coffee Shop Industry",
        narrative: "Alex is considering opening a specialty coffee shop. He applies Porter's Five Forces. Threat of New Entrants: High - opening a coffee shop is relatively cheap and common. Buyer Power: High - customers can easily go to Starbucks, Dunkin', or make coffee at home. Supplier Power: Moderate - specialty coffee beans have fewer suppliers, but commodity beans are widely available. Threat of Substitutes: High - energy drinks, tea, home brewing, and gas station coffee are all alternatives. Industry Rivalry: Very high - there's a coffee shop on every corner. Alex realizes every force is working against him. To succeed, he needs to weaken at least two forces - perhaps by creating a unique experience (reducing substitutes) and building a loyal community (reducing buyer power).",
        details: [
          "All five forces are moderate to strong - this is a tough industry",
          "Alex must differentiate through experience, not just coffee quality",
          "Building community loyalty can weaken buyer power",
          "Specialty sourcing (direct farm partnerships) can weaken supplier power",
          "Understanding forces BEFORE investing saves money and guides strategy"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa6-aq1",
          question: "In the streaming industry, what is the primary reason buyer power is high?",
          options: ["Streaming subscriptions are extremely expensive", "Consumers can easily cancel and switch between services with no penalty", "There are very few streaming options available", "Streaming content quality is consistently poor"],
          correctAnswer: 1,
          explanation: "Low switching costs (cancel anytime, no contracts) and many alternatives give consumers strong bargaining power in the streaming industry."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Applying Porter's Five Forces to real industries makes the framework practical and memorable",
          "Streaming and fast food show how different force profiles create different profitability levels",
          "Successful companies find ways to weaken the strongest forces working against them",
          "Analyzing forces BEFORE entering an industry helps you make smarter decisions"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "sa6-mq1",
            question: "Which industry typically has stronger buyer power - streaming or fast food?",
            options: ["Fast food, because food is more expensive", "Streaming, because subscribers can cancel anytime with no switching costs", "They have equal buyer power", "Neither industry has significant buyer power"],
            correctAnswer: 1,
            explanation: "Streaming subscribers face virtually zero switching costs - they can cancel one service and subscribe to another in minutes. Fast food customers are more habitual."
          },
          {
            id: "sa6-mq2",
            question: "What force does 'cooking at home' represent for the fast food industry?",
            options: ["Threat of new entrants", "Bargaining power of suppliers", "Threat of substitutes", "Industry rivalry"],
            correctAnswer: 2,
            explanation: "Cooking at home is an alternative to buying fast food - it's a substitute that customers can switch to, especially when fast food prices rise."
          },
          {
            id: "sa6-mq3",
            question: "Why does analyzing Porter's Five Forces BEFORE entering an industry save money?",
            options: ["It's required by law before starting a business", "It reveals whether the industry structure supports profitability before you invest", "It automatically reduces your startup costs", "It guarantees your business will succeed"],
            correctAnswer: 1,
            explanation: "Understanding the competitive forces before investing helps you avoid entering industries where the structure makes profitability very difficult."
          },
          {
            id: "sa6-mq4",
            question: "How can a specialty coffee shop weaken buyer power?",
            options: ["By copying Starbucks exactly", "By building a loyal community and unique experience that customers can't get elsewhere", "By raising prices higher than competitors", "By offering a smaller menu with fewer choices"],
            correctAnswer: 1,
            explanation: "Creating unique value and community loyalty makes customers less likely to switch - weakening their bargaining power."
          },
          {
            id: "sa6-mq5",
            question: "Chick-fil-A generates more revenue per restaurant than any other chain while being closed one day a week. Which strategic principle does this demonstrate?",
            options: ["More hours always means more revenue", "Scarcity and brand identity can be more powerful than maximum availability", "Fast food customers don't care about operating hours", "Being closed on Sundays is just a coincidence"],
            correctAnswer: 1,
            explanation: "Being closed on Sundays creates brand identity, employee loyalty, and perceived scarcity - all of which strengthen customer attachment and per-location performance."
          }
        ]
      }
    ]
  },

  // SA-7: How Companies Use These Frameworks for Strategic Decisions
  {
    lessonId: "sa-7",
    sections: [
      {
        type: "concept",
        title: "From Analysis to Action - Using Frameworks to Make Real Decisions",
        paragraphs: [
          "SWOT and Porter's Five Forces are only valuable if they lead to action. Too many businesses run the analysis, create a nice-looking chart, and then ignore it. The best companies use these frameworks as living documents that inform quarterly planning, product launches, hiring decisions, and resource allocation.",
          "The most powerful approach combines both tools. Use Porter's Five Forces to understand the industry landscape, then use SWOT to evaluate your specific company within that landscape. Together, they answer: 'Is this a good industry to be in?' (Porter's) and 'Can WE specifically win in this industry?' (SWOT).",
          "Companies also revisit these analyses regularly because the landscape changes. Amazon's SWOT from 2010 looks completely different from 2025. A Porter's analysis of the taxi industry looked very different before and after Uber. Static analysis in a dynamic world is dangerous."
        ],
        bullets: [
          "Combine Porter's (industry) with SWOT (company) for complete strategic picture",
          "Use frameworks to inform decisions - hiring, products, pricing, expansion",
          "Revisit analyses regularly - markets and competitive dynamics constantly change",
          "The best strategies match internal strengths to favorable industry forces",
          "Analysis without action is just an academic exercise"
        ],
        realWorldExample: "When Microsoft decided to acquire LinkedIn for $26.2 billion in 2016, they used both frameworks. Porter's analysis showed the professional networking industry had strong barriers to entry (network effects), weak substitute threats, and low rivalry (LinkedIn had no real competitor). SWOT showed Microsoft's strength in enterprise software combined with LinkedIn's data created a unique opportunity. The acquisition has generated over $15 billion in annual revenue, validating the strategic analysis."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa7-mc1",
            question: "What is the most powerful way to use SWOT and Porter's Five Forces together?",
            options: ["Choose one and ignore the other", "Use Porter's to assess the industry and SWOT to assess your company within it", "Only use them for academic presentations", "Apply them once and never revisit"],
            correctAnswer: 1,
            explanation: "Porter's answers 'Is this a good industry?' while SWOT answers 'Can WE win in it?' Together they give a complete strategic picture."
          },
          {
            id: "sa7-mc2",
            question: "Why must strategic analyses be revisited regularly?",
            options: ["Because the original analysis was probably wrong", "Because markets, competitors, and technologies constantly change", "Because investors require new reports every month", "Revisiting them is optional and rarely useful"],
            correctAnswer: 1,
            explanation: "Industries evolve - new competitors emerge, technology changes, regulations shift. An analysis from last year might not reflect today's reality."
          }
        ]
      },
      {
        type: "scenario",
        title: "Strategic Decision-Making at a Growing E-Commerce Brand",
        narrative: "NovaSkin, an online skincare brand, is deciding whether to expand into physical retail stores. Their combined analysis reveals: Porter's shows physical retail has high rivalry and strong buyer power, but weak new entrant threat for established online brands. SWOT shows NovaSkin has a strong online community (strength), limited capital (weakness), a growing 'try before you buy' consumer trend (opportunity), and Amazon launching a competing skincare line (threat). The team debates: should they open stores, partner with existing retailers, or double down on online-only? The analysis points toward retail partnerships - it captures the 'try before you buy' opportunity without the capital weakness of opening owned stores, and having physical presence helps differentiate from Amazon.",
        details: [
          "Porter's insight: Physical retail has high rivalry but provides differentiation from online-only competitors",
          "SWOT match: Retail partnerships capture the opportunity without triggering the capital weakness",
          "Threat response: Physical retail presence differentiates from Amazon's online skincare push",
          "Decision: Partner with Sephora/Ulta rather than open own stores - lower risk, faster execution"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa7-aq1",
          question: "A company's Porter's analysis shows a highly profitable industry, but their SWOT reveals significant weaknesses relative to competitors. What does this combined analysis suggest?",
          options: ["Enter the industry immediately before competitors do", "The industry is attractive, but the company may need to strengthen capabilities before competing effectively", "The Porter's analysis must be wrong", "Weaknesses don't matter if the industry is profitable"],
          correctAnswer: 1,
          explanation: "An attractive industry (Porter's) with weak positioning (SWOT) means the opportunity exists but the company isn't ready yet - they need to build capabilities first."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Combine Porter's Five Forces (industry) with SWOT (company) for complete strategic analysis",
          "Analysis only matters if it leads to concrete decisions and actions",
          "Revisit strategic analyses regularly - markets and competition constantly change",
          "The best strategies match company strengths to favorable industry dynamics"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "sa7-mq1",
            question: "Why did Microsoft's strategic analysis support acquiring LinkedIn?",
            options: ["LinkedIn was cheap and easy to buy", "Porter's showed strong industry barriers and SWOT showed a unique capability match", "Microsoft had no other acquisition targets", "LinkedIn's CEO asked Microsoft to buy them"],
            correctAnswer: 1,
            explanation: "Porter's revealed LinkedIn's strong competitive position (network effects, no real competitors), and SWOT showed Microsoft's enterprise strength combined with LinkedIn's data created unique value."
          },
          {
            id: "sa7-mq2",
            question: "NovaSkin chose retail partnerships instead of opening owned stores. This decision was primarily driven by:",
            options: ["A desire to avoid all physical retail", "Their SWOT revealing limited capital (weakness) that made owned stores too risky", "Porter's showing retail was a dying industry", "They didn't want to grow the company"],
            correctAnswer: 1,
            explanation: "The capital weakness made opening owned stores too risky, but partnerships captured the retail opportunity without that financial burden."
          },
          {
            id: "sa7-mq3",
            question: "Analysis without action is described as:",
            options: ["The most important step in strategy", "An academic exercise that doesn't create value", "Better than action without analysis", "Required by business regulations"],
            correctAnswer: 1,
            explanation: "Strategic frameworks are tools for decision-making. If the analysis doesn't lead to concrete actions and decisions, it hasn't created any real value."
          },
          {
            id: "sa7-mq4",
            question: "A taxi company in 2010 vs. 2015 would show dramatically different Porter's Five Forces analysis because of:",
            options: ["Changes in fuel prices", "Uber's entry dramatically increased the threat of substitutes and new entrants", "Taxi drivers went on strike", "Government banned all taxis"],
            correctAnswer: 1,
            explanation: "Uber's ride-sharing model completely changed the competitive landscape - creating a powerful substitute and lowering barriers to entry in the transportation industry."
          },
          {
            id: "sa7-mq5",
            question: "When Porter's Five Forces shows a good industry but SWOT shows company weaknesses, the best approach is:",
            options: ["Enter immediately and figure it out later", "Avoid the industry entirely", "Build capabilities to address weaknesses before entering or competing", "Ignore the SWOT and rely only on Porter's"],
            correctAnswer: 2,
            explanation: "An attractive industry with a weak position means you need to build strengths before competing effectively - rushing in with significant weaknesses leads to failure."
          }
        ]
      }
    ]
  },

  // SA-8: Mini-Project - Run a SWOT and Porter's Analysis
  {
    lessonId: "sa-8",
    sections: [
      {
        type: "concept",
        title: "Mini-Project: Build Your Own Strategic Analysis",
        paragraphs: [
          "Now it's time to apply everything you've learned. In this lesson, you'll walk through the process of conducting both a SWOT analysis and a Porter's Five Forces analysis on a business of your choice. This mirrors exactly what consultants, executives, and entrepreneurs do when making major business decisions.",
          "Choose any business you find interesting - it could be a local restaurant, a tech company, your school's student store, or even a business you'd like to start someday. The key is picking something you know enough about to analyze thoughtfully.",
          "Follow these steps: (1) Start with Porter's Five Forces to understand the industry. (2) Then do a SWOT analysis for the specific business. (3) Connect the two - identify where the business's strengths align with weak industry forces, and where weaknesses align with strong forces. (4) Make a strategic recommendation based on your analysis."
        ],
        bullets: [
          "Step 1: Choose a business or industry you're interested in",
          "Step 2: Run Porter's Five Forces on the industry first",
          "Step 3: Run a SWOT analysis on the specific company",
          "Step 4: Connect the two analyses to find strategic insights",
          "Step 5: Make a clear recommendation - what should the business do?"
        ],
        realWorldExample: "McKinsey & Company, one of the world's top consulting firms, charges companies millions of dollars for strategic analyses that follow this exact process. Their consultants start with industry analysis (Porter's), move to company assessment (SWOT), then combine insights into actionable recommendations. The skills you're learning in this unit are the same ones used by professionals advising Fortune 500 companies."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa8-mc1",
            question: "In a combined strategic analysis, which framework should you typically apply first?",
            options: ["SWOT, because it's simpler", "Porter's Five Forces, because you should understand the industry before analyzing the company", "Neither - do them simultaneously", "It doesn't matter which comes first"],
            correctAnswer: 1,
            explanation: "Start with Porter's Five Forces to understand the industry landscape. Then use SWOT to evaluate how the specific company is positioned within that industry."
          },
          {
            id: "sa8-mc2",
            question: "What is the final step in a complete strategic analysis?",
            options: ["Creating a colorful chart", "Making a clear, actionable recommendation based on the combined analysis", "Listing as many factors as possible", "Presenting only the positive findings to stakeholders"],
            correctAnswer: 1,
            explanation: "The whole point of analysis is to reach a decision or recommendation. Without an actionable 'so what?' conclusion, the analysis hasn't served its purpose."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sample Project: Analyzing a Local Gym",
        narrative: "Let's walk through a sample analysis for FitZone, a local gym. Porter's Five Forces: Threat of new entrants - Moderate (requires capital but boutique fitness studios are easy to open). Buyer power - High (many gym options, easy to switch). Supplier power - Low (equipment from many manufacturers). Substitutes - High (home workouts, YouTube, Peloton, outdoor exercise). Rivalry - Very high (Planet Fitness, LA Fitness, CrossFit boxes, Orange Theory all nearby). SWOT: Strength - only gym with a pool and childcare in the area. Weakness - outdated equipment, no app for booking. Opportunity - growing interest in wellness and community fitness. Threat - Planet Fitness opening a location one mile away. Recommendation: Invest in the app (fix weakness), market the pool and childcare aggressively (leverage unique strengths), and build a community fitness program (capture the wellness trend while differentiating from Planet Fitness).",
        details: [
          "Porter's reveals a tough industry - high rivalry, high substitutes, high buyer power",
          "SWOT reveals unique strengths (pool, childcare) that most competitors don't offer",
          "Strategic insight: Lean into what makes FitZone unique rather than competing on price",
          "Action plan: Fix the app weakness, amplify unique strengths, build community differentiation"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa8-aq1",
          question: "After completing both a Porter's Five Forces and SWOT analysis, what is the most valuable connection to identify?",
          options: ["How many items are in each SWOT quadrant", "Where company strengths align with weak industry forces - creating the best strategic opportunity", "Whether the SWOT chart looks better than the Porter's chart", "How many competitors exist in the industry"],
          correctAnswer: 1,
          explanation: "The most powerful strategic opportunities exist where your strengths align with weak competitive forces - you're strong exactly where the industry pressure is lightest."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Start with Porter's Five Forces (industry) then do SWOT (company) for a complete analysis",
          "Connect the two frameworks - find where strengths meet weak forces and weaknesses meet strong forces",
          "Always end with an actionable recommendation - analysis without action is wasted effort",
          "These are the exact skills used by professional consultants and corporate strategists"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "sa8-mq1",
            question: "In the FitZone example, what was the most strategically valuable strength?",
            options: ["Having the lowest membership price", "Being the only gym with a pool and childcare in the area", "Having the most locations in the city", "Having the newest equipment"],
            correctAnswer: 1,
            explanation: "The pool and childcare are unique differentiators that no competitor offers - this is the strength most worth building strategy around."
          },
          {
            id: "sa8-mq2",
            question: "Why should Porter's Five Forces analysis come before SWOT in a strategic review?",
            options: ["Because Porter's is more important than SWOT", "Because understanding the industry landscape provides context for evaluating the company's position", "Because SWOT can only be done after Porter's by law", "Because Porter's is faster to complete"],
            correctAnswer: 1,
            explanation: "Knowing the industry forces helps you understand which strengths and weaknesses matter most - a strength is more valuable if it counters a strong competitive force."
          },
          {
            id: "sa8-mq3",
            question: "McKinsey consultants follow the same process taught in this lesson. What does their approach typically lead to?",
            options: ["Academic papers published in journals", "Actionable strategic recommendations for client companies", "Social media marketing campaigns", "New product designs"],
            correctAnswer: 1,
            explanation: "Top consulting firms use industry and company analysis to develop actionable strategic recommendations - the same process you've learned in this unit."
          },
          {
            id: "sa8-mq4",
            question: "FitZone's recommendation to 'build a community fitness program' is designed to counter which competitive force?",
            options: ["Supplier power", "Threat of new entrants", "Buyer power and rivalry - by creating loyalty that makes switching less appealing", "Government regulation"],
            correctAnswer: 2,
            explanation: "Community programs build loyalty and emotional connection, making members less likely to switch to a competitor (reducing buyer power) and differentiating from rivals."
          },
          {
            id: "sa8-mq5",
            question: "What makes a strategic analysis 'complete'?",
            options: ["Having the most items listed in each category", "Combining industry analysis, company assessment", "Using the most professional-looking templates", "Getting approval from a business professor"],
            correctAnswer: 1,
            explanation: "A complete strategic analysis examines the industry (Porter's), assesses the company (SWOT), connects the two, and produces a clear, actionable recommendation."
          }
        ]
      }
    ]
  }
]
