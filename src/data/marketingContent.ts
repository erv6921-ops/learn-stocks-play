import { StructuredLessonContent } from "@/types"

export const marketingContent: StructuredLessonContent[] = [
  // ═══════════════════════════════════════════════
  // MKT-1: What Marketing Actually Is
  // ═══════════════════════════════════════════════
  {
    lessonId: "mkt-1",
    sections: [
      {
        type: "concept",
        title: "Marketing vs Advertising",
        paragraphs: [
          "Most people think marketing is just advertising - commercials, billboards, social media posts. But advertising is only one small piece of marketing. Marketing is the entire process of creating value for customers and communicating that value so they choose you over the competition.",
          "Marketing starts long before an ad is created. It begins with understanding what people need, designing a product or service that meets that need, pricing it appropriately, making it available in the right places, and then - finally - promoting it.",
          "The best marketing doesn't feel like marketing at all. When a company truly understands its customers and delivers real value, the product almost sells itself. Word of mouth spreads, customers come back, and the business grows organically."
        ],
        bullets: [
          "Marketing - the full process of creating, communicating, and delivering value to customers",
          "Advertising - one specific promotional tool within the broader marketing strategy",
          "Value creation - designing products and experiences that solve real customer problems",
          "Customer focus - marketing starts with understanding people, not with selling to them"
        ],
        realWorldExample: "Apple doesn't just run ads - they design stores that feel like museums, package products like gifts, and create an ecosystem that makes switching painful. Their marketing is baked into every detail of the customer experience, not just their commercials."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt1-mc1",
            question: "What is the main difference between marketing and advertising?",
            options: [
              "Marketing is the full process of creating and delivering value; advertising is one promotional tool within it",
              "Advertising is the strategy and marketing is the execution of that strategy",
              "Marketing only applies to digital channels while advertising covers traditional media",
              "There is no real difference - marketing and advertising mean the same thing in business"
            ],
            correctAnswer: 0,
            explanation: "Marketing encompasses everything from understanding customers to designing products to choosing distribution channels. Advertising is just one tool used in the promotion phase of marketing."
          },
          {
            id: "mkt1-mc2",
            question: "Why does the best marketing often not 'feel' like marketing?",
            options: [
              "Because companies hide their marketing efforts from consumers intentionally",
              "Because the product delivers genuine value, so customers naturally want to share it",
              "Because regulations require marketing to be subtle and unnoticeable",
              "Because most consumers are unaware that marketing exists as a business function"
            ],
            correctAnswer: 1,
            explanation: "When a company truly understands its customers and delivers real value, the product generates organic word-of-mouth and loyalty. The marketing is embedded in the experience itself."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Lemonade Stands, Very Different Sales",
        narrative: "Mia and Jake both set up lemonade stands on the same block during a neighborhood festival. They used the same recipe, the same cups, and charged the same price - $2 per cup. By the end of the day, Mia sold 120 cups and Jake sold 30. Same product, same location, same price. The difference was marketing.",
        details: [
          "Jake set up a folding table with a handwritten sign that said 'Lemonade $2' and sat behind it waiting for customers",
          "Mia created a colorful banner reading 'Mia's Fresh-Squeezed Lemonade - Made While You Watch!' with her brand name and a tagline",
          "Mia offered free samples to people walking by, turning curious passersby into paying customers",
          "Mia placed her stand at the busiest intersection instead of a quiet corner - she thought about where her customers would be",
          "Jake had a good product but no strategy for communicating its value or reaching the right people"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt1-aq1",
          question: "Based on the scenario, which marketing principle MOST explains why Mia outsold Jake 4-to-1?",
          options: [
            "Mia had a better recipe that tasted significantly different from Jake's lemonade",
            "Mia communicated her value clearly, chose a strategic location, and actively engaged potential customers",
            "Jake's pricing was too high for the neighborhood festival market",
            "Mia spent more money on her stand setup, which automatically guarantees higher sales"
          ],
          correctAnswer: 1,
          explanation: "Mia applied core marketing principles - clear value communication (the banner and tagline), strategic placement (the busy intersection), and active promotion (free samples). Jake had the same product but no strategy for reaching or persuading customers."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Marketing is the complete process of creating, communicating, and delivering value - not just advertising",
          "Great marketing starts with understanding customers and designing real solutions for their needs",
          "The best products still fail without a clear strategy for reaching and persuading the right audience",
          "Every business decision - from product design to pricing to location - is part of marketing"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mkt1-mastery",
            question: "A student opens an online tutoring service and posts one Instagram ad but gets no clients. Their friend suggests 'doing more marketing.' What would ACTUALLY be the best first step?",
            options: [
              "Post more Instagram ads with brighter colors and louder messaging to get attention",
              "Research who needs tutoring most, what subjects they struggle with, and where they look for help",
              "Lower the price to zero dollars to attract customers and raise it later once demand builds",
              "Copy exactly what the most popular tutoring company does since their approach clearly works"
            ],
            correctAnswer: 1,
            explanation: "Marketing starts with understanding the customer - who needs this, what do they need, and where do they look? Without this foundation, even the best ads won't work because they're not reaching the right people with the right message."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MKT-2: Understanding Your Customer
  // ═══════════════════════════════════════════════
  {
    lessonId: "mkt-2",
    sections: [
      {
        type: "concept",
        title: "Target Markets and Customer Segmentation",
        paragraphs: [
          "The biggest mistake in marketing is trying to sell to everyone. When you try to appeal to everyone, you end up appealing to no one. The most successful businesses know exactly who their customer is - and they design everything around that specific person.",
          "Customer segmentation is the process of dividing a broad market into smaller, more specific groups. These segments can be based on demographics (age, income, location), psychographics (values, interests, lifestyle), behavior (buying habits, brand loyalty), or needs.",
          "Demographics tell you WHO your customer is. Psychographics tell you WHY they buy. The best marketers use both. A 16-year-old athlete and a 16-year-old artist might share demographics but have completely different motivations, values, and purchasing triggers."
        ],
        bullets: [
          "Target market - the specific group of people most likely to buy your product",
          "Demographics - measurable characteristics like age, gender, income, and location",
          "Psychographics - psychological traits like values, interests, opinions, and lifestyle",
          "Segmentation - dividing a large market into smaller groups to serve each one better"
        ],
        realWorldExample: "Nike doesn't market to 'everyone who wears shoes.' They segment ruthlessly: runners get different ads than basketball players, who get different messaging than yoga practitioners. Each segment sees products designed for their specific needs and marketing that speaks their language."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt2-mc1",
            question: "What is the key difference between demographics and psychographics?",
            options: [
              "Demographics describe measurable traits like age and income; psychographics describe values, interests, and motivations",
              "Demographics apply to online customers while psychographics apply to in-store customers",
              "Psychographics are more accurate than demographics for predicting purchase behavior",
              "Demographics are used by large companies while psychographics are for small businesses"
            ],
            correctAnswer: 0,
            explanation: "Demographics are the 'who' - measurable characteristics like age, gender, and income. Psychographics are the 'why' - the values, interests, and lifestyle factors that drive purchasing decisions."
          },
          {
            id: "mkt2-mc2",
            question: "Why is trying to sell to 'everyone' considered a marketing mistake?",
            options: [
              "Because legal regulations prevent companies from advertising to all age groups equally",
              "Because a message designed for everyone is too generic to strongly resonate with anyone",
              "Because companies cannot physically distribute products to every single person",
              "Because marketing budgets are always too small to reach more than one hundred people"
            ],
            correctAnswer: 1,
            explanation: "When you try to appeal to everyone, your message becomes so broad that it doesn't speak powerfully to any specific group. Focused messaging for a specific audience creates much stronger connections and conversions."
          }
        ]
      },
      {
        type: "scenario",
        title: "Phone Cases: Selling to Everyone vs Selling to Someone",
        narrative: "Two students - Aiden and Zara - both start selling custom phone cases online. Aiden lists his cases on every platform with the description 'Cool phone cases for everyone!' Zara picks a specific customer: female college students who love minimalist design. She designs five cases with soft pastel colors and clean lines, names her brand 'Pebble Cases,' and markets exclusively on Pinterest and Instagram. After three months, Aiden has sold 12 cases. Zara has sold 340.",
        details: [
          "Aiden's designs tried to appeal to everyone - bold colors, patterns, sports themes, and anime - with no consistent style",
          "Zara researched her target customer by surveying 30 college students about what they wanted in a phone case",
          "Zara's branding, product design, and marketing channels all aligned with her specific customer's preferences",
          "Aiden's social media posts got likes from friends but didn't convert to sales because there was no clear audience",
          "Zara's Pinterest pins were shared 2,000+ times because her aesthetic matched exactly what her target audience searched for"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt2-aq1",
          question: "What was the MOST important factor in Zara's success compared to Aiden's?",
          options: [
            "Zara spent more money on advertising and had a bigger marketing budget to work with",
            "Zara chose higher-quality phone case materials that justified a premium price point",
            "Zara identified a specific target customer and aligned every decision - product, brand, and channel - to that audience",
            "Zara had more social media followers before launching, giving her an unfair head start"
          ],
          correctAnswer: 2,
          explanation: "Zara's advantage was focus. By choosing a specific customer (minimalist college women), she could design products they wanted, build branding they loved, and market where they actually spent time. Everything aligned around one clear audience."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Trying to sell to everyone means your message resonates with no one - specificity wins",
          "Demographics describe WHO your customer is; psychographics explain WHY they buy",
          "The best businesses align product design, branding, and marketing channels to one clear target audience",
          "Customer research - even simple surveys - dramatically increases your chances of success"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mkt2-mastery",
            question: "A student wants to start a sneaker cleaning service. Which approach demonstrates the strongest use of customer segmentation?",
            options: [
              "Advertising the service to everyone in the school with a generic flyer in the hallway",
              "Identifying sneaker collectors in the school, learning which platforms they use, and offering premium cleaning for limited-edition shoes",
              "Offering the lowest price possible to attract the maximum number of customers from any background",
              "Copying the marketing strategy of a professional shoe repair shop in the local mall"
            ],
            correctAnswer: 1,
            explanation: "This approach demonstrates segmentation: identifying a specific customer (sneaker collectors), understanding their needs (premium care for limited editions), and reaching them where they are. Generic flyers and low prices attract no one in particular."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MKT-3: Market Research
  // ═══════════════════════════════════════════════
  {
    lessonId: "mkt-3",
    sections: [
      {
        type: "concept",
        title: "Primary vs Secondary Research",
        paragraphs: [
          "Market research is the process of gathering information about your customers and competitors to make better business decisions. It's the difference between guessing what people want and knowing what people want.",
          "Primary research is data you collect yourself - surveys, interviews, focus groups, observation. It's specific to your question and your market, but it takes time and effort. Secondary research uses data that already exists - industry reports, census data, competitor analysis, published studies.",
          "Smart businesses use both. Secondary research gives you the big picture and helps you understand trends. Primary research gives you specific insights about your exact customers. Skipping research is the most expensive mistake a business can make, because you'll spend money building something nobody wants."
        ],
        bullets: [
          "Primary research - original data you collect directly from your target market",
          "Secondary research - existing data from published sources, reports, and databases",
          "Surveys - structured questions that can reach many people quickly and cheaply",
          "Focus groups - small group discussions that reveal deeper motivations and reactions"
        ],
        realWorldExample: "Before launching the iPhone, Apple didn't just rely on surveys. They observed how people actually used their phones - fumbling with tiny keyboards, squinting at small screens, carrying separate devices for music and calls. This observational research revealed needs customers couldn't even articulate."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt3-mc1",
            question: "What is the main advantage of primary research over secondary research?",
            options: [
              "Primary research is always cheaper and faster to conduct than secondary research",
              "Primary research provides data specific to your exact question and target market",
              "Primary research is more reliable because it comes from government databases",
              "Primary research eliminates all risk from business decisions automatically"
            ],
            correctAnswer: 1,
            explanation: "Primary research is tailored to your specific needs - you design the questions and choose the audience. Secondary research is broader and may not address your exact situation, though it's useful for context."
          },
          {
            id: "mkt3-mc2",
            question: "Why is skipping market research described as 'the most expensive mistake' a business can make?",
            options: [
              "Because market research firms charge penalties for businesses that don't use their services",
              "Because without research you may invest heavily in products or strategies that customers don't actually want",
              "Because government regulations require market research before launching any new business",
              "Because competitors will steal your idea if you don't research their activities first"
            ],
            correctAnswer: 1,
            explanation: "Building a product without understanding demand means you risk spending time and money on something nobody will buy. Research costs far less than a failed product launch."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Food Trucks: Guessing vs Knowing",
        narrative: "Carlos and Diana both want to open food trucks in the same neighborhood. Carlos picks a menu based on his favorite foods - Korean BBQ tacos - and parks wherever he finds space. Diana spends two weeks surveying 50 people in the neighborhood, analyzing foot traffic patterns, and checking what cuisines are already available nearby.",
        details: [
          "Diana's survey revealed that 70% of residents wanted quick healthy lunch options - a gap no existing restaurant filled",
          "Diana chose to serve grain bowls and wraps, priced at the $10-12 range her research showed people were willing to pay",
          "Diana parked near the office complex where her survey showed the highest concentration of her target customers",
          "Carlos's Korean BBQ tacos were excellent, but the neighborhood already had three Korean restaurants and demand was low",
          "After six months, Diana was profitable and expanding. Carlos had closed and lost $15,000 in startup costs"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt3-aq1",
          question: "Which specific research action gave Diana the MOST valuable competitive advantage?",
          options: [
            "Checking the weather forecast to decide which days to operate the food truck",
            "Surveying neighborhood residents to discover an unmet demand for quick healthy lunch options",
            "Choosing a more expensive truck with a better kitchen to produce higher quality food",
            "Studying Carlos's menu to make sure she offered different items than her competitor"
          ],
          correctAnswer: 1,
          explanation: "Diana's survey revealed a gap in the market - high demand for healthy lunch options with no supply. This primary research insight shaped her entire business model and gave her a clear competitive advantage."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Market research replaces guessing with knowing - reducing risk and increasing your chances of success",
          "Primary research (surveys, interviews) gives specific insights; secondary research (reports, data) gives context",
          "Even simple research like surveying 50 people can reveal critical market gaps and opportunities",
          "Skipping research doesn't save money - it guarantees you'll waste money on untested assumptions"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mkt3-mastery",
            question: "A student wants to sell custom stickers at school. Which research approach would give them the most useful information before investing in supplies?",
            options: [
              "Look up national sticker industry revenue statistics from a published market report",
              "Ask 30 classmates what designs they'd buy, what price they'd pay, and where they'd want to buy them",
              "Order 500 stickers in designs they personally like and see how many sell in the first week",
              "Check how many sticker shops exist on Etsy to determine if the market is already saturated"
            ],
            correctAnswer: 1,
            explanation: "Asking classmates directly is primary research targeted at the exact market. It reveals demand, price sensitivity, and distribution preferences - all before spending money on inventory. Industry stats and Etsy searches provide context but don't tell you what YOUR customers want."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MKT-4: The 4 Ps - Product & Price
  // ═══════════════════════════════════════════════
  {
    lessonId: "mkt-4",
    sections: [
      {
        type: "concept",
        title: "Product Design and Pricing Strategies",
        paragraphs: [
          "The 4 Ps of marketing - Product, Price, Place, and Promotion - are the four key decisions every business must make. This lesson focuses on the first two: what you sell and how much you charge for it.",
          "Product is more than just the physical item. It includes the features, quality, design, packaging, brand name, and the problem it solves. Great products are designed around customer needs, not just what the business wants to make. Differentiation - what makes your product different from competitors - is critical.",
          "Pricing is one of the most powerful tools in marketing. Cost-plus pricing adds a markup to your costs. Value-based pricing charges what customers believe the product is worth. Competitive pricing matches or undercuts competitors. Each strategy sends a different message about your brand."
        ],
        bullets: [
          "Product differentiation - what makes your offering unique and worth choosing over alternatives",
          "Cost-plus pricing - calculating total cost and adding a percentage markup for profit",
          "Value-based pricing - setting prices based on perceived customer value, not just your costs",
          "Competitive pricing - setting prices relative to what competitors charge for similar products"
        ],
        realWorldExample: "Starbucks doesn't use cost-plus pricing. A cup of coffee costs them roughly $0.30 to make, but they charge $5-7. That's value-based pricing - customers pay for the experience, the brand, the ambiance, and the consistency. A gas station sells coffee for $1.50 using competitive pricing. Same product category, completely different strategies."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt4-mc1",
            question: "What is value-based pricing?",
            options: [
              "Setting your price by calculating your costs and adding a fixed percentage markup",
              "Setting your price based on what customers believe the product is worth to them",
              "Setting your price exactly one dollar below the nearest competitor at all times",
              "Setting the lowest possible price to attract the maximum number of buyers quickly"
            ],
            correctAnswer: 1,
            explanation: "Value-based pricing focuses on customer perception - what they believe the product is worth - rather than what it costs to produce. This often allows businesses to charge premium prices when they deliver exceptional experiences."
          },
          {
            id: "mkt4-mc2",
            question: "Why is product differentiation critical in marketing?",
            options: [
              "Because government regulations require every product to have unique registered features",
              "Because customers need a clear reason to choose your product over similar alternatives",
              "Because differentiated products are exempt from competitive pricing pressures forever",
              "Because identical products always compete solely on advertising budget size"
            ],
            correctAnswer: 1,
            explanation: "Without differentiation, customers have no reason to choose you over competitors - the only lever left is price, which leads to a race to the bottom. Differentiation creates a reason to buy from you specifically."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Students at the School Market",
        narrative: "Ella and Marcus both sell handmade bracelets at their school's holiday market. They use similar materials that cost about $2 per bracelet. Ella prices hers at $5 - a simple cost-plus approach. Marcus researches what students are willing to pay, creates a brand called 'Thread & Stone,' packages each bracelet in a small gift box with a card, and prices them at $15.",
        details: [
          "Ella sold 40 bracelets at $5 each - $200 revenue, $120 profit after materials",
          "Marcus sold 25 bracelets at $15 each - $375 revenue, $325 profit after materials and packaging ($0.50 per box)",
          "Marcus made almost 3x the profit with fewer sales because his pricing reflected perceived value, not just cost",
          "Customers perceived Marcus's bracelets as 'gifts worth giving' while Ella's were seen as 'cheap accessories'",
          "Marcus's leftover inventory was requested by students who missed the market - Ella had leftover stock nobody asked about"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt4-aq1",
          question: "What principle BEST explains why Marcus earned nearly 3x Ella's profit despite selling fewer bracelets?",
          options: [
            "Marcus used higher quality materials that justified the premium price point over Ella's",
            "Marcus created perceived value through branding and packaging that let him use value-based pricing",
            "Marcus had more experience selling products and better negotiation skills with customers",
            "Ella's pricing strategy was illegal under school market regulations for handmade goods"
          ],
          correctAnswer: 1,
          explanation: "Marcus understood that value isn't just about the physical product - it's about the total experience. By creating a brand, adding packaging, and positioning his bracelets as gifts, he increased perceived value and could charge 3x more. Same material cost, completely different perception."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Product includes everything - features, design, packaging, brand, and the problem it solves",
          "Differentiation gives customers a clear reason to choose you over competitors",
          "Cost-plus pricing covers costs; value-based pricing captures what customers believe a product is worth",
          "Packaging, branding, and presentation can increase perceived value far beyond the actual cost of materials"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mkt4-mastery",
            question: "A student makes custom phone wallpapers digitally (near-zero production cost). Which pricing strategy would be MOST appropriate and why?",
            options: [
              "Cost-plus pricing - charge $0.10 since the digital file costs almost nothing to produce",
              "Competitive pricing - find what other wallpaper apps charge and match that price exactly",
              "Value-based pricing - charge $3-5 based on customers' willingness to pay for unique, custom designs",
              "Free pricing - give all wallpapers away for free since there are no material costs to recover"
            ],
            correctAnswer: 2,
            explanation: "With near-zero production cost, cost-plus pricing would result in prices too low to sustain a business. Value-based pricing captures what customers believe the creative work is worth - the value is in the design skill and customization, not the file cost."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MKT-5: The 4 Ps - Place & Promotion
  // ═══════════════════════════════════════════════
  {
    lessonId: "mkt-5",
    sections: [
      {
        type: "concept",
        title: "Distribution Channels and Promotion",
        paragraphs: [
          "Place is about making your product available where your customers already are. The best product in the world fails if customers can't find it or access it easily. Distribution channels are the paths a product takes from creator to customer - and choosing the right channels can make or break a business.",
          "Promotion is how you communicate your product's value to potential customers. It includes advertising (paid), public relations (earned media), social media (organic reach), sales promotions (discounts and incentives), and personal selling. The key is choosing promotional methods that reach your specific target audience.",
          "The biggest shift in modern marketing is the rise of organic promotion - building an audience through content, community, and social media without paying for ads. This levels the playing field for small businesses and student entrepreneurs who can't afford traditional advertising budgets."
        ],
        bullets: [
          "Distribution channels - the paths products take from creator to customer (online, retail, direct)",
          "Advertising - paid promotion through media channels like social media ads, TV, and print",
          "Organic marketing - building audience and awareness without paid advertising through content and community",
          "Omnichannel - being present across multiple channels so customers can buy wherever they prefer"
        ],
        realWorldExample: "Glossier, the beauty brand, was built almost entirely on organic social media and word-of-mouth. Instead of spending millions on TV ads, they created a community of real customers who shared their experiences. Their Instagram-first strategy cost a fraction of traditional advertising and generated more trust."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt5-mc1",
            question: "Why is 'Place' considered as important as the product itself in marketing?",
            options: [
              "Because the physical location of your store determines the quality of your products",
              "Because even the best product fails if customers cannot easily find or access it",
              "Because distribution channels are always the most expensive part of running a business",
              "Because government regulations require products to be sold in specific approved locations"
            ],
            correctAnswer: 1,
            explanation: "Place ensures your product is accessible to the right customers at the right time. A great product that customers can't find or don't know about will never sell - distribution is the bridge between your product and your customer."
          },
          {
            id: "mkt5-mc2",
            question: "What makes organic marketing particularly valuable for student entrepreneurs?",
            options: [
              "Organic marketing guarantees immediate sales without any effort from the business owner",
              "It builds audience and awareness through free content and community instead of expensive paid ads",
              "Organic marketing is only effective for businesses with products priced under ten dollars",
              "It requires less creativity and strategic thinking than traditional paid advertising campaigns"
            ],
            correctAnswer: 1,
            explanation: "Organic marketing - content creation, social media engagement, word-of-mouth - requires time and creativity but not large budgets. This makes it perfect for student entrepreneurs who have more energy than money."
          }
        ]
      },
      {
        type: "scenario",
        title: "In-Person Only vs Online + Instagram",
        narrative: "Two students, Kai and Nadia, both make and sell handmade candles. Kai sells exclusively at weekend farmers markets - great product, loyal local customers. Nadia sells at the same market AND runs an online store with an active Instagram account where she posts behind-the-scenes content of her candle-making process.",
        details: [
          "Kai averaged $200 per weekend from market sales - solid but limited to the hours and days the market operated",
          "Nadia's market sales were similar at $180 per weekend, but her online store generated an additional $400 per week",
          "Nadia's Instagram grew to 2,800 followers who shared her content, driving traffic to her online store for free",
          "When the farmers market closed for winter, Kai's revenue dropped to zero. Nadia's online sales actually increased during the holiday season",
          "Same product quality, same starting point - but Nadia's multi-channel approach generated 3x the total revenue"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt5-aq1",
          question: "What marketing principle BEST explains why Nadia earned 3x Kai's revenue with a similar product?",
          options: [
            "Nadia's candles were higher quality because she invested more money in premium ingredients",
            "Nadia used multiple distribution channels and organic promotion to reach customers beyond her local market",
            "Kai's farmers market had fewer visitors because it was in a less desirable neighborhood location",
            "Nadia offered lower prices online which attracted more budget-conscious customers to her store"
          ],
          correctAnswer: 1,
          explanation: "Nadia applied Place (online store + market = multiple channels) and Promotion (Instagram content = organic marketing) strategically. She wasn't limited to one location or one sales window - her products were accessible anywhere, anytime."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Place means making your product available where your customers already spend time and shop",
          "Multi-channel distribution (online + in-person) dramatically increases reach and revenue potential",
          "Organic promotion through social media and content can be more effective than paid advertising for small businesses",
          "The best promotion strategy matches the channels where your target audience actually spends their attention"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mkt5-mastery",
            question: "A student sells custom artwork but only through a booth at monthly school events. What single change would most likely increase their sales?",
            options: [
              "Increase prices at the school booth to signal higher quality and attract premium buyers",
              "Add an online store and share their work on social media to reach customers beyond school events",
              "Move the booth to a different location within the school to capture more foot traffic during events",
              "Reduce the number of artwork options to create artificial scarcity and urgency among buyers"
            ],
            correctAnswer: 1,
            explanation: "Adding online distribution and social media promotion removes the constraints of time (monthly events) and place (school only). The student can now reach customers 24/7 beyond their immediate school community."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MKT-6: Branding
  // ═══════════════════════════════════════════════
  {
    lessonId: "mkt-6",
    sections: [
      {
        type: "concept",
        title: "What a Brand Really Is",
        paragraphs: [
          "A brand is not a logo. A brand is not a color scheme. A brand is the total perception that people have about your business - it's the feeling they get, the trust they have, and the story they tell others about you. A logo is just a visual shortcut to that deeper perception.",
          "Brand consistency - using the same name, voice, colors, and message across every touchpoint - builds recognition and trust over time. Customers buy from brands they recognize and trust, even when cheaper alternatives exist. This is called brand equity, and it's one of the most valuable assets a business can own.",
          "Brand voice is how your business 'speaks' - is it playful or professional? Bold or understated? Inclusive or exclusive? The best brands have a consistent voice that matches their target customer's expectations and builds an emotional connection."
        ],
        bullets: [
          "Brand - the total perception customers have about your business, not just visual elements",
          "Brand equity - the additional value a strong brand adds beyond the product's functional benefits",
          "Brand consistency - maintaining the same identity, voice, and message across all customer touchpoints",
          "Brand voice - the personality and tone your business communicates in every interaction"
        ],
        realWorldExample: "Patagonia's brand isn't about jackets. It's about environmental activism. They've told their customers 'Don't Buy This Jacket' in ads, encouraging repair over replacement. This radical consistency between their values and actions has built one of the strongest brand loyalties in retail - customers pay premium prices BECAUSE of the brand's integrity."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt6-mc1",
            question: "Why can a strong brand charge higher prices than competitors with similar products?",
            options: [
              "Because branded products are always manufactured with higher quality materials and processes",
              "Because brand equity creates perceived value, trust, and emotional connection that customers will pay more for",
              "Because strong brands have exclusive government licenses that prevent price competition",
              "Because customers with brand loyalty are contractually obligated to continue purchasing"
            ],
            correctAnswer: 1,
            explanation: "Brand equity - the trust, recognition, and emotional connection built over time - creates perceived value beyond the physical product. Customers pay more for brands they trust and feel connected to."
          },
          {
            id: "mkt6-mc2",
            question: "What does 'brand consistency' mean and why does it matter?",
            options: [
              "Using the same name, voice, and message everywhere to build recognition and trust over time",
              "Never changing any aspect of your product or business for any reason whatsoever",
              "Keeping your prices exactly the same across all sales channels and time periods",
              "Ensuring every customer has an identical experience regardless of their preferences"
            ],
            correctAnswer: 0,
            explanation: "Brand consistency means maintaining the same identity across all touchpoints - your website, packaging, social media, and customer interactions. This repetition builds recognition, and recognition builds trust."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Tutoring Services: Same Quality, Different Brands",
        narrative: "Jamal and Sarah both offer math tutoring at the same school. They charge the same rate ($25/hour), have similar qualifications, and both get great results for their students. But Sarah consistently charges $35/hour with a waitlist. The difference? Sarah built a brand called 'Apex Tutoring' with a consistent look, a clear message, and a professional presence.",
        details: [
          "Sarah created a simple but professional brand: a name (Apex Tutoring), consistent colors (navy and gold), and a tagline ('Think Sharper')",
          "Sarah's social media posts all followed the same visual style - clean, consistent, and professional",
          "Jamal marketed himself as 'Jamal - Math Tutor' with different flyer designs each time and no consistent message",
          "Parents perceived Sarah's service as more professional and trustworthy, even though Jamal's teaching was equally good",
          "Sarah's brand consistency signaled reliability - parents felt confident they'd get a consistent, professional experience"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt6-aq1",
          question: "Why could Sarah charge $10 more per hour than Jamal despite offering similar tutoring quality?",
          options: [
            "Sarah had more teaching experience and better academic credentials than Jamal did",
            "Sarah's consistent branding created perceived professionalism and trust that parents valued and paid more for",
            "Jamal intentionally underpriced his services because he preferred to work with lower-income families",
            "Sarah's tutoring sessions were longer and covered more material per hour than Jamal's sessions"
          ],
          correctAnswer: 1,
          explanation: "Sarah's brand - consistent name, colors, messaging, and professional presence - created a perception of quality and reliability that went beyond the actual tutoring. Brand equity allowed her to command premium pricing for a functionally similar service."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A brand is the total perception people have about your business - far more than just a logo",
          "Brand equity allows businesses to charge premium prices because of trust and emotional connection",
          "Consistency across all touchpoints - name, colors, voice, message - builds recognition and credibility",
          "Even small businesses and student entrepreneurs can build powerful brands with intentional consistency"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mkt6-mastery",
            question: "A student starts a lawn care business. Which action would build the STRONGEST brand foundation?",
            options: [
              "Change the business name and logo every month to keep the brand looking fresh and trendy",
              "Choose a memorable name, consistent colors, and a clear message and use them everywhere - every time",
              "Focus only on doing excellent work, since quality automatically creates a brand without any marketing",
              "Copy the exact branding of the biggest lawn care company in town to benefit from their reputation"
            ],
            correctAnswer: 1,
            explanation: "Brand building requires intentional consistency. A memorable name, consistent visual identity, and clear message - used across every flyer, social post, and customer interaction - builds the recognition and trust that creates brand equity."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MKT-7: Consumer Decision-Making
  // ═══════════════════════════════════════════════
  {
    lessonId: "mkt-7",
    sections: [
      {
        type: "concept",
        title: "The Buyer Journey",
        paragraphs: [
          "Customers don't just see a product and buy it. They go through a journey - a series of stages from first becoming aware of a need to becoming a loyal repeat customer. Understanding this journey is one of the most powerful marketing skills you can develop.",
          "The buyer journey has four main stages: Awareness (realizing you have a need or want), Consideration (researching and comparing options), Decision (choosing and purchasing), and Loyalty (becoming a repeat customer and recommending to others).",
          "Different marketing tactics work at different stages. Awareness requires visibility - being seen. Consideration requires information - reviews, comparisons, demos. Decision requires trust and urgency - testimonials, guarantees, limited offers. Loyalty requires ongoing value - great customer service, rewards, and follow-up."
        ],
        bullets: [
          "Awareness - the customer realizes they have a need, want, or problem to solve",
          "Consideration - the customer researches options, reads reviews, and compares alternatives",
          "Decision - the customer chooses a product and makes the purchase",
          "Loyalty - the customer returns, repurchases, and recommends the product to others"
        ],
        realWorldExample: "Think about how you chose your last pair of shoes. First, you noticed your old ones were worn out (awareness). Then you browsed Nike, Adidas, and New Balance online, reading reviews (consideration). You chose based on a friend's recommendation and a sale (decision). If they fit great and lasted long, you'd buy the same brand again (loyalty). Every step had marketing influencing you."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt7-mc1",
            question: "A student sees a YouTube review comparing three different backpacks. Which stage of the buyer journey is this?",
            options: [
              "Awareness - the student is just now learning that backpacks exist as a product category",
              "Consideration - the student is actively researching and comparing options before buying",
              "Decision - the student has already chosen which backpack to purchase right now",
              "Loyalty - the student is returning to buy from a brand they've already purchased from"
            ],
            correctAnswer: 1,
            explanation: "Watching comparison reviews is classic consideration-stage behavior. The student already knows they want a backpack (past awareness) but hasn't chosen yet (before decision). They're gathering information to make a choice."
          },
          {
            id: "mkt7-mc2",
            question: "Why is the loyalty stage important even though the initial sale is already complete?",
            options: [
              "Because loyal customers generate repeat purchases and word-of-mouth referrals that cost nothing to acquire",
              "Because companies are legally required to maintain contact with every customer after a sale",
              "Because the loyalty stage is when companies can charge higher prices without customers noticing",
              "Because customers in the loyalty stage stop comparing alternatives and ignore competitor products"
            ],
            correctAnswer: 0,
            explanation: "Acquiring a new customer costs 5-7x more than retaining an existing one. Loyal customers buy again AND recommend you to friends - essentially doing your marketing for free through word-of-mouth."
          }
        ]
      },
      {
        type: "scenario",
        title: "How Maya Chose Her Laptop",
        narrative: "Maya is a high school junior who needs a laptop for school. Let's trace every marketing touchpoint that influenced her journey from 'I need a laptop' to 'I love my laptop and tell everyone about it.'",
        details: [
          "AWARENESS: Maya's old laptop died during a school project. She Googled 'best laptops for students 2026' and saw an article ranking the top 10 options",
          "CONSIDERATION: She narrowed it down to three options, watched YouTube reviews, read Reddit threads, and asked friends. A classmate's enthusiastic recommendation of the MacBook Air stuck with her",
          "DECISION: She visited the Apple Store, tried the laptop in person, and a student discount promotion tipped her over the edge. She bought it that day",
          "LOYALTY: Three months later, the laptop exceeded her expectations. She posted about it on Instagram and recommended it to two friends - becoming a free marketing channel for Apple",
          "At every stage, different marketing touchpoints influenced Maya - SEO (search results), content marketing (articles and reviews), word-of-mouth (friend's recommendation), in-store experience, and pricing (student discount)"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt7-aq1",
          question: "Which marketing touchpoint had the GREATEST influence on Maya's final purchase decision?",
          options: [
            "The Google search results article that ranked the top 10 laptops for students",
            "The YouTube reviews and Reddit threads that compared detailed specifications",
            "The classmate's enthusiastic personal recommendation combined with the in-store experience and student discount",
            "The Instagram post she later made about the laptop that generated likes from friends"
          ],
          correctAnswer: 2,
          explanation: "The personal recommendation created trust (consideration), and the in-store trial plus student discount removed barriers and created urgency (decision). This combination of word-of-mouth, experience, and incentive is the most powerful path to purchase."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Customers move through Awareness → Consideration → Decision → Loyalty before and after buying",
          "Different marketing tactics are effective at different stages of the buyer journey",
          "Word-of-mouth and personal recommendations are among the most powerful marketing forces at the decision stage",
          "Loyal customers are the most valuable marketing asset - they buy again and recruit new customers for free"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mkt7-mastery",
            question: "A student's baking business gets many Instagram followers but few actual orders. Which buyer journey stage is likely the bottleneck?",
            options: [
              "Awareness - people don't know the baking business exists or what products it offers",
              "Consideration - people see the products but can't find enough information to feel confident ordering",
              "Decision - people want to order but the process of actually purchasing is unclear or difficult",
              "Loyalty - existing customers are not coming back for repeat orders after their first purchase"
            ],
            correctAnswer: 2,
            explanation: "Many followers means awareness isn't the problem - people know about the business. The bottleneck is likely at the decision stage: no clear ordering process, no pricing visible, no easy way to place an order. Removing friction at the decision stage converts followers into buyers."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MKT-8: Testing Your Ideas
  // ═══════════════════════════════════════════════
  {
    lessonId: "mkt-8",
    sections: [
      {
        type: "concept",
        title: "Hypothesis Testing and Minimum Viable Products",
        paragraphs: [
          "The most expensive mistake in business is building something nobody wants. The solution? Test before you invest. Every business idea is a hypothesis - an educated guess that needs to be validated with real data before you pour time and money into it.",
          "A Minimum Viable Product (MVP) is the simplest version of your product that lets you test whether customers actually want it. Instead of spending months building a perfect product, launch a basic version quickly, get real feedback, and iterate. The goal is to learn fast and fail cheap.",
          "A/B testing takes this further: instead of guessing which approach works better, you test two versions simultaneously and let data decide. Test two different prices, two ad headlines, two packaging designs - measure which performs better, and use the winner. This replaces opinions with evidence."
        ],
        bullets: [
          "Hypothesis - a testable prediction about what customers want or how they'll respond",
          "MVP (Minimum Viable Product) - the simplest version of your product that lets you test real demand",
          "A/B testing - comparing two versions of something to see which performs better with real customers",
          "Iteration - making improvements based on data and feedback rather than assumptions"
        ],
        realWorldExample: "Dropbox didn't build their full product first. Before writing a single line of code, they made a 3-minute video explaining what the product would do and put up a sign-up page. 75,000 people signed up overnight - validating demand before they spent millions on development. That video was their MVP."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mkt8-mc1",
            question: "What is the primary purpose of creating a Minimum Viable Product?",
            options: [
              "To sell a low-quality product cheaply and upgrade it later once you have more money",
              "To test whether real customers actually want your product before investing heavily in it",
              "To satisfy legal requirements for product testing before market launch and distribution",
              "To create a prototype that investors can evaluate for potential funding opportunities"
            ],
            correctAnswer: 1,
            explanation: "An MVP isn't about cutting corners - it's about learning quickly. You build the simplest version that tests your core assumption, gather real customer feedback, and then decide whether to invest more based on evidence rather than hope."
          },
          {
            id: "mkt8-mc2",
            question: "How does A/B testing improve marketing decisions?",
            options: [
              "It guarantees that the tested option will succeed in all future marketing campaigns",
              "It replaces guessing with data by comparing two versions and measuring which performs better",
              "It eliminates the need for customer research because the test provides all necessary information",
              "It allows companies to double their marketing budget by running two campaigns simultaneously"
            ],
            correctAnswer: 1,
            explanation: "A/B testing replaces subjective opinions with objective data. Instead of debating which headline or price is better, you test both with real customers and let their actual behavior decide the winner."
          }
        ]
      },
      {
        type: "scenario",
        title: "Full Launch vs Test First",
        narrative: "Two students - Jordan and Riley - both have ideas for selling custom study guides at their school. Jordan spends three months creating 50 comprehensive guides covering every subject, investing $400 in printing and binding. Riley creates just two sample guides, shows them to 20 classmates, and asks 'Would you pay $8 for this?'",
        details: [
          "Riley's quick test revealed that students wanted digital guides (not printed) and preferred subject-specific bundles - two insights that changed her entire approach",
          "Riley spent $0 on her test and pivoted to digital guides in one week, earning $200 in her first month",
          "Jordan launched all 50 guides and sold only 8 total - students didn't want printed guides and most subjects had low demand",
          "Jordan lost $340 and had 42 unsold printed guides. The three months of work was mostly wasted",
          "Riley's MVP approach - testing small, learning fast - saved her from Jordan's expensive mistake"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mkt8-aq1",
          question: "What was the MOST critical difference between Riley's and Jordan's approaches?",
          options: [
            "Riley had better study guide content because she was a stronger student academically",
            "Riley tested her hypothesis with real customers before investing, while Jordan assumed demand existed",
            "Jordan chose the wrong subjects for his study guides based on his personal academic interests",
            "Riley had more friends at school who were willing to support her business as a personal favor"
          ],
          correctAnswer: 1,
          explanation: "Riley treated her idea as a hypothesis and tested it cheaply. Two sample guides and 20 conversations cost nothing and revealed critical insights about format (digital, not print) and demand. Jordan assumed his idea was right and invested heavily before validating it."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Every business idea is a hypothesis - test it before investing heavily in time or money",
          "An MVP is the cheapest, fastest way to learn whether real customers want what you're building",
          "A/B testing replaces guessing with data by comparing options with real customer behavior",
          "Failing fast and cheap is far better than failing slowly and expensively - iteration beats perfection"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mkt8-mastery",
            question: "A student wants to start a meal prep delivery service for busy families. What is the smartest FIRST step?",
            options: [
              "Rent a commercial kitchen, design 30 recipes, build a website, and launch a full delivery service",
              "Prepare five sample meals for ten families in the neighborhood and ask if they would pay for weekly delivery",
              "Research every meal delivery company in the country to understand the competitive landscape first",
              "Create a detailed 50-page business plan with financial projections before talking to any potential customers"
            ],
            correctAnswer: 1,
            explanation: "This is a textbook MVP approach: test the core hypothesis (will families pay for meal prep delivery?) with a small, cheap experiment. Five meals, ten families, real feedback - this costs almost nothing and tells you more than any business plan could."
          }
        ]
      }
    ]
  }
]
