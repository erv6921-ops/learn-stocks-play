import { StructuredLessonContent } from "@/types"

export const consumerBehaviorContent: StructuredLessonContent[] = [
  // ═══════════════════════════════════════════════
  // CB-1: What Is Consumer Behavior
  // ═══════════════════════════════════════════════
  {
    lessonId: "cb-1",
    sections: [
      {
        type: "concept",
        title: "What Is Consumer Behavior and Why It Matters",
        paragraphs: [
          "Consumer behavior is the study of how individuals make decisions about what to buy, when to buy it, where to buy it, and why. It examines the full journey from the moment a person realizes they have a need to long after they have made a purchase.",
          "Businesses that understand consumer behavior can design better products, create more effective marketing, price their offerings strategically, and build lasting customer relationships. Companies that ignore it are essentially guessing - and guessing is expensive.",
          "Consumer behavior draws from psychology, sociology, economics, and neuroscience. It explains why two people with the same income can make completely different purchasing decisions, and why a customer might pay $5 for a coffee at one store but refuse to pay $3 at another."
        ],
        bullets: [
          "Consumer behavior - the study of how and why people make purchasing decisions",
          "It covers the entire buyer journey, not just the moment of purchase",
          "Understanding behavior helps businesses design products, set prices, and communicate value",
          "It draws from multiple fields including psychology, sociology, and economics"
        ],
        realWorldExample: "Starbucks doesn't just sell coffee - they studied consumer behavior and discovered people would pay a premium for a 'third place' experience between home and work. That insight transformed a commodity product into a $100 billion company."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb1-mc1",
            question: "Why is studying consumer behavior valuable for businesses?",
            options: [
              "It helps businesses design better products, set strategic prices, and build effective marketing campaigns",
              "It allows businesses to manipulate customers into buying products they do not actually need",
              "It eliminates the need for market research by predicting every customer decision accurately",
              "It only matters for large corporations with dedicated research departments and big budgets"
            ],
            correctAnswer: 0,
            explanation: "Consumer behavior research gives businesses real insights into what customers need, how they decide, and what influences their choices - leading to better products, pricing, and marketing."
          },
          {
            id: "cb1-mc2",
            question: "Which fields contribute to the study of consumer behavior?",
            options: [
              "Only economics and accounting, since buying decisions are purely financial calculations",
              "Psychology, sociology, economics, and neuroscience all contribute to understanding buyer decisions",
              "Only marketing and advertising, since those are the fields directly involved in selling products",
              "Only computer science and data analytics, since modern consumer tracking relies on technology"
            ],
            correctAnswer: 1,
            explanation: "Consumer behavior is interdisciplinary - psychology explains individual motivation, sociology covers group influence, economics addresses value and scarcity, and neuroscience reveals how the brain processes buying decisions."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Coffee Shops, Two Approaches",
        narrative: "Maya opens a coffee shop and spends three months observing how customers behave - when they arrive, what they order, how long they stay, and what makes them come back. She discovers her morning customers want speed, her afternoon customers want a workspace, and her evening customers want ambiance. She adjusts her layout, menu, and staffing to match. Across town, Derek opens a similar shop but designs everything based on his personal preferences. He plays loud music, removes seating to fit more inventory, and keeps the same menu all day.",
        details: [
          "After one year, Maya's shop has 78% customer retention and growing revenue each month",
          "Derek's shop struggles with inconsistent traffic and frequent complaints about atmosphere",
          "Maya didn't spend more money - she simply paid attention to how her customers actually behaved"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb1-aq1",
          question: "What is the PRIMARY reason Maya's coffee shop outperformed Derek's after one year?",
          options: [
            "Maya studied actual customer behavior and adapted her business to match real patterns and needs",
            "Maya had a better location in a busier part of town with more foot traffic near her shop",
            "Derek's coffee quality was lower because he bought cheaper beans from a different supplier",
            "Maya spent significantly more on advertising and promotions to attract new customers"
          ],
          correctAnswer: 0,
          explanation: "Maya succeeded because she observed real consumer behavior - arrival patterns, preferences, and retention drivers - then adapted her business accordingly. Derek designed around his own preferences rather than customer needs."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Consumer behavior is the study of how, when, where, and why people make purchasing decisions",
          "It draws from psychology, sociology, economics, and neuroscience to explain buying patterns",
          "Businesses that understand consumer behavior build better products and stronger customer relationships",
          "Observing real customer behavior is more valuable than assuming you know what customers want"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "cb1-mastery",
            question: "A new restaurant owner notices that weekend diners stay 40% longer than weekday diners and order more desserts. Based on consumer behavior principles, what should the owner do?",
            options: [
              "Reduce weekend hours to save on staffing costs since longer visits reduce table turnover rates",
              "Expand the weekend dessert menu and adjust staffing for longer dining experiences to match observed behavior",
              "Eliminate the weekday menu entirely and only open on weekends when customer spending is higher",
              "Ignore the pattern because restaurant success depends primarily on food quality, not customer habits"
            ],
            correctAnswer: 1,
            explanation: "Understanding consumer behavior means adapting to real patterns. Weekend diners exhibit different behavior (longer stays, more desserts), so the smart move is to lean into that pattern by expanding dessert options and staffing accordingly."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CB-2: The Decision-Making Process
  // ═══════════════════════════════════════════════
  {
    lessonId: "cb-2",
    sections: [
      {
        type: "concept",
        title: "The Consumer Decision-Making Process",
        paragraphs: [
          "Every purchase - from a pack of gum to a new car - follows a predictable path. The consumer decision-making process has five stages: need recognition, information search, evaluation of alternatives, purchase decision, and post-purchase behavior.",
          "Need recognition happens when a consumer realizes there is a gap between their current situation and their desired situation. This can be triggered internally (hunger, boredom) or externally (an ad, a friend's recommendation). Not every recognized need leads to action - it depends on how urgently the consumer feels the gap.",
          "After recognizing a need, consumers search for information - sometimes extensively (researching laptops for weeks) and sometimes barely at all (grabbing whichever toothpaste is on sale). They then evaluate alternatives, make a purchase decision, and experience post-purchase feelings that determine whether they buy again."
        ],
        bullets: [
          "Need recognition - realizing a gap exists between the current state and the desired state",
          "Information search - gathering options through personal experience, friends, reviews, or ads",
          "Evaluation of alternatives - comparing options based on price, quality, brand, and features",
          "Purchase decision - choosing a product and completing the transaction",
          "Post-purchase behavior - satisfaction or regret that shapes future buying decisions"
        ],
        realWorldExample: "Think about buying a new phone. You notice yours is slow (need recognition), read reviews online (information search), compare three models (evaluation), choose one (purchase), and then either love it or wish you'd picked something else (post-purchase). That entire journey is the decision-making process."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb2-mc1",
            question: "What triggers need recognition in a consumer?",
            options: [
              "An internal feeling like hunger or dissatisfaction, or an external stimulus like an advertisement",
              "The consumer must first complete an information search before they can recognize a need",
              "Only marketing campaigns and promotions can create the initial awareness of a consumer need",
              "Need recognition only happens for expensive purchases that require significant financial planning"
            ],
            correctAnswer: 0,
            explanation: "Need recognition can be triggered internally (you feel hungry) or externally (you see an ad for a new product). It's the gap between where you are and where you want to be."
          },
          {
            id: "cb2-mc2",
            question: "Why is post-purchase behavior important for businesses?",
            options: [
              "It determines whether the customer will buy again, recommend the product, or leave negative reviews",
              "It only matters for luxury products where customers expect a premium experience after buying",
              "Post-purchase behavior has no business impact because the sale has already been completed",
              "It allows businesses to charge higher prices on future products without improving quality"
            ],
            correctAnswer: 0,
            explanation: "Post-purchase behavior drives repeat purchases, word-of-mouth recommendations, and online reviews - all of which directly impact future sales and brand reputation."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Students Buy Headphones",
        narrative: "Aisha needs new headphones for studying. She spends two weeks reading reviews, comparing noise-canceling features, and watching YouTube comparisons. She narrows it down to three models, picks the best value, and loves her choice - she tells five friends about them. Marcus also needs headphones. He grabs the first pair he sees at the store because they look cool. Within a week, the sound quality disappoints him and the ear cushions hurt. He leaves a one-star review and buys a different pair.",
        details: [
          "Aisha went through all five stages deliberately - need recognition, thorough search, careful evaluation, intentional purchase, and positive post-purchase",
          "Marcus skipped information search and evaluation - jumping straight from need recognition to purchase",
          "Aisha became a brand advocate; Marcus became a detractor - two completely different outcomes from the same starting point"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb2-aq1",
          question: "Which stage of the decision-making process did Marcus effectively SKIP that led to his dissatisfaction?",
          options: [
            "He skipped need recognition by buying headphones he did not actually need for his situation",
            "He skipped information search and evaluation of alternatives by choosing impulsively based on appearance",
            "He skipped the purchase decision stage by allowing someone else to choose the headphones for him",
            "He skipped post-purchase behavior by not returning the headphones within the store's return window"
          ],
          correctAnswer: 1,
          explanation: "Marcus jumped from need recognition directly to purchase without researching options or comparing alternatives. This impulsive shortcut led to a product that didn't meet his actual needs."
        }
      },
      {
        type: "recap",
        takeaways: [
          "The consumer decision-making process has five stages: need recognition, information search, evaluation, purchase, and post-purchase",
          "Need recognition is triggered by internal feelings or external stimuli that create a gap between current and desired states",
          "The depth of information search varies - extensive for high-involvement purchases, minimal for routine ones",
          "Post-purchase behavior determines whether a customer becomes an advocate or a detractor for the brand"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "cb2-mastery",
            question: "A student realizes their laptop is too slow for video editing (need recognition). They compare three models online, choose the best one, and love it. Which marketing strategy would MOST effectively reach this student during their information search stage?",
            options: [
              "A billboard advertisement featuring the brand logo displayed prominently along the highway",
              "Detailed comparison reviews and benchmark videos appearing in search results for video editing laptops",
              "A coupon for ten percent off sent to their email address six months after their purchase is complete",
              "A social media post showing the laptop at a music festival with popular influencers in the background"
            ],
            correctAnswer: 1,
            explanation: "During information search, consumers actively look for detailed comparisons and reviews. Meeting them where they're already searching - with relevant, informative content - is far more effective than broad awareness tactics."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CB-3: Psychological Factors
  // ═══════════════════════════════════════════════
  {
    lessonId: "cb-3",
    sections: [
      {
        type: "concept",
        title: "Psychological Factors in Consumer Behavior",
        paragraphs: [
          "Four key psychological factors shape every purchase: motivation, perception, learning, and attitudes. These internal forces operate beneath the surface, often influencing buying decisions without the consumer even realizing it.",
          "Motivation is the internal drive that pushes someone to fulfill a need. Maslow's hierarchy of needs explains that people prioritize basic needs (food, shelter) before pursuing higher-level needs (status, self-actualization). A teenager buying expensive sneakers might be motivated by belonging and status, not just the need for footwear.",
          "Perception is how people interpret information. Two customers can see the same product and perceive completely different things based on their experiences and biases. Learning changes behavior through experience - a bad restaurant experience teaches you to avoid that place. Attitudes are consistent evaluations (positive or negative) that are hard to change once formed."
        ],
        bullets: [
          "Motivation - the internal drive to satisfy a need, explained by Maslow's hierarchy",
          "Perception - how individuals select, organize, and interpret information about products",
          "Learning - changes in behavior that result from past experiences with products or brands",
          "Attitudes - consistent positive or negative evaluations that are difficult to change once formed"
        ],
        realWorldExample: "Why do people pay $1,000 for a phone when a $200 phone does the same things? Motivation (status and belonging), perception (premium brand = better quality), learning (past positive experiences with the brand), and attitude (I'm an Apple/Samsung person) all work together to justify the premium."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb3-mc1",
            question: "According to Maslow's hierarchy, why might a teenager prioritize expensive sneakers over saving money?",
            options: [
              "The sneakers fulfill belonging and status needs which become important once basic needs are already met",
              "Teenagers are naturally irrational consumers who do not understand financial decision-making concepts",
              "Expensive sneakers provide better physical protection than affordable alternatives for active teenagers",
              "Marketing companies have successfully manipulated teenagers into ignoring their actual physical needs"
            ],
            correctAnswer: 0,
            explanation: "Once basic needs (food, shelter, safety) are met, people pursue higher-level needs like belonging and esteem. Expensive sneakers signal group membership and status - fulfilling real psychological needs."
          },
          {
            id: "cb3-mc2",
            question: "How does perception affect consumer behavior?",
            options: [
              "Two consumers can interpret the exact same product differently based on their experiences and biases",
              "Perception has no real impact because consumers always make purely rational purchasing decisions",
              "Perception only applies to visual products like clothing and does not affect service-based purchases",
              "Consumers always perceive higher-priced products as higher quality regardless of any other factors"
            ],
            correctAnswer: 0,
            explanation: "Perception is subjective - the same product can seem premium to one person and overpriced to another. Past experiences, cultural background, and personal biases all shape how people interpret what they see."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Reactions to the Same Product",
        narrative: "A new energy drink launches at $4.99 per can. Jordan sees the premium packaging and higher price and thinks, 'This must be a high-quality product worth trying - it costs more than the competition, so it's probably better.' Taylor sees the same product and thinks, 'That's a ridiculous price for sugar water - the cheap brands taste the same and I've been buying them for years.' Same product, same price, completely different perceptions.",
        details: [
          "Jordan's perception is shaped by a price-quality association - higher price signals higher value in their mind",
          "Taylor's perception is shaped by learning from past experience - all energy drinks have tasted similar to them",
          "Taylor also has a strong pre-existing attitude toward budget brands that would be difficult for the new brand to change"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb3-aq1",
          question: "Which psychological factor BEST explains why Taylor refuses to try the new energy drink despite having never tasted it?",
          options: [
            "Motivation - Taylor is not internally driven to consume energy drinks in any form or brand",
            "Perception - Taylor sees the high price as unjustified based on past learning and existing attitudes",
            "Taylor is simply being financially responsible by choosing the most affordable option available",
            "Taylor lacks access to sufficient product information to make an informed purchasing decision"
          ],
          correctAnswer: 1,
          explanation: "Taylor's refusal combines perception (interpreting the price as unreasonable), learning (past experience shows cheap brands taste the same), and attitude (a settled negative view of premium-priced energy drinks). These psychological factors work together."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Motivation drives purchases by pushing consumers to fulfill needs - from basic survival to status and self-expression",
          "Perception causes different people to interpret the same product in completely different ways",
          "Learning from past experiences shapes future buying decisions and can create strong brand preferences",
          "Attitudes are consistent evaluations that are hard to change once formed - making first impressions critical"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "cb3-mastery",
            question: "A student had a terrible experience at a restaurant chain two years ago and now refuses to eat there, even though friends say it has improved. Which psychological factor is MOST responsible for this resistance?",
            options: [
              "Motivation - the student is not motivated to eat at restaurants and prefers cooking meals at home",
              "Perception - the student cannot physically see the restaurant from their home and forgets it exists",
              "Learning and attitude - a negative past experience created a lasting negative evaluation that resists change",
              "Social influence - the student's friends secretly also dislike the restaurant and are reinforcing avoidance"
            ],
            correctAnswer: 2,
            explanation: "The bad experience (learning) created a negative attitude toward the restaurant. Attitudes, once formed, are resistant to change - even when new information (friends' recommendations) contradicts them."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CB-4: Social & Cultural Influences
  // ═══════════════════════════════════════════════
  {
    lessonId: "cb-4",
    sections: [
      {
        type: "concept",
        title: "Social and Cultural Influences on Buying",
        paragraphs: [
          "People don't make purchasing decisions in isolation. Family, friends, social class, culture, and reference groups all shape what people buy, how much they spend, and which brands they trust. These social influences can be even more powerful than individual preferences.",
          "Reference groups are the people whose opinions and behaviors influence your own. They include membership groups (your actual friends and family), aspirational groups (people you want to be like), and dissociative groups (people you want to distance yourself from). A teenager might buy a specific brand because their favorite athlete wears it - that athlete is an aspirational reference group.",
          "Culture is the broadest social influence. It includes shared values, beliefs, customs, and behaviors of a society. Subcultures - groups within a culture with distinct values - create specific consumer patterns. Social class also influences purchasing, affecting not just what people can afford but what they believe is appropriate to buy."
        ],
        bullets: [
          "Reference groups - membership, aspirational, and dissociative groups that shape brand preferences",
          "Family influence - often the strongest social influence on buying habits and brand loyalty",
          "Culture - shared values and customs that define what is desirable, acceptable, or taboo to buy",
          "Social class - affects not only purchasing power but also attitudes about what is appropriate to buy"
        ],
        realWorldExample: "In Japan, gift-giving follows strict cultural rules - the wrapping matters as much as the gift itself, and certain numbers of items are considered unlucky. A company that ignores these cultural norms when selling in Japan will fail, no matter how good their product is."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb4-mc1",
            question: "What is the difference between an aspirational reference group and a membership reference group?",
            options: [
              "A membership group includes people you actually belong to; an aspirational group includes people you want to be like",
              "A membership group is for professionals only; an aspirational group is for personal hobbies and interests",
              "Both terms refer to the same concept but are used in different academic textbooks on consumer behavior",
              "An aspirational group charges membership fees while a membership group provides free access to all members"
            ],
            correctAnswer: 0,
            explanation: "Membership groups are the people around you (friends, classmates, coworkers). Aspirational groups are people you admire and want to emulate - like celebrities, athletes, or successful entrepreneurs whose buying habits you might copy."
          },
          {
            id: "cb4-mc2",
            question: "How does culture influence consumer behavior?",
            options: [
              "Culture defines shared values, customs, and beliefs that shape what people consider desirable or appropriate to buy",
              "Culture only affects food and clothing purchases but has no impact on technology or financial products",
              "Cultural influence has decreased dramatically because of globalization and the internet connecting everyone",
              "Culture only matters for international businesses and has no relevance for companies selling domestically"
            ],
            correctAnswer: 0,
            explanation: "Culture is the foundation of consumer behavior - it shapes fundamental beliefs about what is desirable, necessary, appropriate, or taboo. Even in a globalized world, cultural values deeply influence purchase decisions."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Friends, Different Influences",
        narrative: "Elena grew up in a family that valued practicality - her parents drove used cars, bought store-brand groceries, and talked openly about saving money. Her friend Sophia grew up in a family where brand names signaled success - designer clothes, the newest phone, and luxury vacations were the norm. When both start earning their own money at part-time jobs, Elena naturally gravitates toward saving and value shopping. Sophia naturally gravitates toward premium brands and visible status purchases.",
        details: [
          "Neither student made a conscious decision to adopt their spending philosophy - family culture shaped their automatic preferences",
          "Elena feels uncomfortable spending on luxury items even when she can afford them; Sophia feels uncomfortable buying generic brands",
          "Their friend groups reinforce these patterns - Elena's friends trade budget tips while Sophia's friends share new purchases"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb4-aq1",
          question: "Which social influence factor MOST explains why Elena and Sophia have opposite spending habits despite earning similar incomes?",
          options: [
            "Family culture - the values, attitudes, and behaviors modeled by their parents shaped their automatic preferences",
            "Social class - Elena comes from a lower-income family while Sophia comes from a higher-income household",
            "Individual psychology - Elena is naturally frugal and Sophia is naturally materialistic regardless of upbringing",
            "Marketing exposure - Sophia watches more advertisements than Elena which directly controls her spending choices"
          ],
          correctAnswer: 0,
          explanation: "Family is often the strongest social influence on consumer behavior. Elena and Sophia internalized their families' values about money and spending - these learned behaviors now feel like natural preferences."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Consumers are influenced by reference groups - membership, aspirational, and dissociative - that shape brand choices",
          "Family is typically the strongest social influence on buying habits, often creating lifelong spending patterns",
          "Culture defines the broad framework of what is considered desirable, acceptable, or taboo in purchasing",
          "Social class affects not just what people can afford but what they believe is appropriate for someone like them to buy"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "cb4-mastery",
            question: "A sneaker company wants to sell a new $200 shoe to high school students. Based on social influence principles, which strategy would be MOST effective?",
            options: [
              "Lower the price to $50 since high school students cannot afford expensive sneakers on limited budgets",
              "Partner with popular athletes and influencers that students aspire to be like, making the shoe a status symbol",
              "Advertise the shoe's technical specifications and manufacturing process to appeal to rational decision-making",
              "Send email newsletters to parents explaining the long-term durability and cost-per-wear value of the shoes"
            ],
            correctAnswer: 1,
            explanation: "High school students are heavily influenced by aspirational reference groups - athletes and influencers they admire. Associating the shoe with these figures creates social desirability that drives purchase intent far more than specs or parent emails."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CB-5: Market Segmentation
  // ═══════════════════════════════════════════════
  {
    lessonId: "cb-5",
    sections: [
      {
        type: "concept",
        title: "Market Segmentation",
        paragraphs: [
          "Market segmentation is the process of dividing a broad market into smaller, more defined groups of consumers who share similar characteristics. Instead of trying to sell to everyone - which is expensive and ineffective - businesses focus on segments where their product fits best.",
          "There are four primary segmentation methods. Demographic segmentation divides by age, gender, income, education, or occupation. Psychographic segmentation groups people by lifestyle, values, interests, and personality. Geographic segmentation divides by location - country, region, city, or even neighborhood. Behavioral segmentation groups consumers by how they actually interact with products - purchase frequency, brand loyalty, usage rate, and benefits sought.",
          "The most effective segmentation combines multiple methods. A fitness app might target 'college students (demographic) in urban areas (geographic) who value health and self-improvement (psychographic) and work out at least three times per week (behavioral).' This multi-dimensional approach creates precise, actionable segments."
        ],
        bullets: [
          "Demographic - age, gender, income, education, family size, occupation",
          "Psychographic - lifestyle, values, interests, personality traits, and opinions",
          "Geographic - country, region, city, climate, population density, urban vs rural",
          "Behavioral - purchase frequency, loyalty status, usage rate, and benefits sought"
        ],
        realWorldExample: "Netflix uses behavioral segmentation brilliantly. They don't just know your age and location - they track what you watch, when you watch, how long you watch, and what you pause on. This behavioral data creates micro-segments that power their recommendation engine, which drives 80% of viewer activity."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb5-mc1",
            question: "What is the PRIMARY purpose of market segmentation?",
            options: [
              "To divide a broad market into smaller groups so businesses can target consumers more effectively and efficiently",
              "To eliminate unprofitable customers by identifying and excluding groups that will not generate revenue",
              "To create as many product variations as possible so every individual consumer gets a unique experience",
              "To simplify marketing by treating all consumers identically and reducing the number of campaigns needed"
            ],
            correctAnswer: 0,
            explanation: "Segmentation helps businesses focus their resources on the groups most likely to buy their product. It's about precision - reaching the right people with the right message rather than broadcasting to everyone."
          },
          {
            id: "cb5-mc2",
            question: "A company segments customers by how often they purchase and what product benefits they prioritize. What type of segmentation is this?",
            options: [
              "Demographic segmentation based on measurable population characteristics like age and income levels",
              "Geographic segmentation based on where customers live, work, and shop for their daily products",
              "Behavioral segmentation based on actual customer actions, purchase patterns, and product usage habits",
              "Psychographic segmentation based on customer personality traits, lifestyle choices, and personal values"
            ],
            correctAnswer: 2,
            explanation: "Purchase frequency and benefits sought are behavioral variables - they describe how customers actually interact with products rather than who they are (demographic) or what they believe (psychographic)."
          }
        ]
      },
      {
        type: "scenario",
        title: "Segmenting a Lemonade Stand",
        narrative: "Two students start lemonade businesses at a local park. Kayla sells one product at one price to everyone. She averages 30 cups per day. Marcus studies the park visitors and identifies three segments: morning joggers want cold, low-sugar hydration; families at the playground want sweet, fun drinks for kids; and evening walkers want premium flavored lemonades. He creates three products, prices them differently, and positions his stand to catch each group at the right time.",
        details: [
          "Marcus sells 65 cups per day - more than double Kayla's volume - with higher average revenue per cup",
          "Morning joggers pay $2.50 for electrolyte lemonade, families buy $1.50 kids' cups, and evening walkers pay $4.00 for premium flavors",
          "Kayla's single product appealed somewhat to everyone but was the ideal choice for no one"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb5-aq1",
          question: "What type of segmentation did Marcus primarily use to outperform Kayla?",
          options: [
            "He used demographic segmentation by targeting customers based only on their age and family status",
            "He combined behavioral segmentation (what each group wanted) with geographic timing (when each group arrived)",
            "He used psychographic segmentation exclusively by studying the personality types of park visitors",
            "He used price discrimination by simply charging different amounts for the exact same product"
          ],
          correctAnswer: 1,
          explanation: "Marcus identified behavioral differences (what each group sought: hydration, fun drinks, or premium flavors) and combined them with temporal patterns (morning, afternoon, evening). He then tailored products to match - that's effective multi-dimensional segmentation."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Market segmentation divides a broad market into smaller, more defined groups with shared characteristics",
          "Four primary methods: demographic (who), psychographic (why), geographic (where), and behavioral (how)",
          "The most effective approach combines multiple segmentation methods for precise targeting",
          "Segmentation allows businesses to create products and messages that resonate deeply with specific groups"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "cb5-mastery",
            question: "A clothing brand discovers that their best customers are 25-34-year-old women (demographic) in coastal cities (geographic) who value sustainability (psychographic) and buy seasonally (behavioral). What should they do with this insight?",
            options: [
              "Ignore the data and continue marketing to all demographics equally to maximize total brand awareness",
              "Focus marketing spend and product development on this specific multi-dimensional segment for maximum return",
              "Stop selling to any customers who do not perfectly match this exact profile to reduce operating costs",
              "Change their entire product line to only sustainable materials regardless of whether other segments want that"
            ],
            correctAnswer: 1,
            explanation: "Multi-dimensional segmentation reveals your most valuable customer profile. The smart move is to focus resources - marketing, product development, and distribution - on this segment for the highest return, while still serving other customers."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CB-6: Target Markets & Buyer Personas
  // ═══════════════════════════════════════════════
  {
    lessonId: "cb-6",
    sections: [
      {
        type: "concept",
        title: "Target Market Selection and Buyer Personas",
        paragraphs: [
          "After segmenting the market, the next step is selecting a target market - the specific segment(s) a business will focus on serving. Not every segment is worth pursuing. A good target market is large enough to be profitable, reachable through available marketing channels, and aligned with the company's strengths and resources.",
          "A buyer persona is a detailed, semi-fictional profile of an ideal customer within your target market. It goes beyond demographics to include goals, pain points, decision-making patterns, preferred communication channels, and common objections. A persona has a name, a story, and enough detail that anyone in the company can picture this person.",
          "The value of buyer personas is alignment - when the marketing team, product team, and sales team all share the same vivid picture of who they're serving, every decision becomes clearer. Instead of debating opinions, teams can ask: 'Would our persona want this?'"
        ],
        bullets: [
          "Target market - the specific segment a business decides to focus on after evaluating size, reachability, and fit",
          "Buyer persona - a detailed semi-fictional profile that includes goals, pain points, and behavior patterns",
          "Persona components - name, background, goals, challenges, buying preferences, and common objections",
          "Alignment value - personas unify teams around a shared understanding of the ideal customer"
        ],
        realWorldExample: "HubSpot, a marketing software company, created a persona called 'Marketing Mary' - a 35-year-old marketing director at a mid-size company who struggles to prove ROI to her CEO. Every product feature, blog post, and sales pitch is designed to help 'Marketing Mary' solve her specific problems."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb6-mc1",
            question: "What makes a market segment a good target market?",
            options: [
              "It must be large enough to be profitable, reachable through available channels, and aligned with company strengths",
              "It must include every possible consumer type to ensure the widest possible customer base for maximum revenue",
              "It must be the largest segment in the market regardless of whether the company can effectively serve them",
              "It must consist exclusively of high-income consumers since they generate the most revenue per transaction"
            ],
            correctAnswer: 0,
            explanation: "A good target market balances three criteria: size (enough potential customers), reachability (you can actually reach them), and alignment (your product genuinely fits their needs and your company can deliver)."
          },
          {
            id: "cb6-mc2",
            question: "Why do buyer personas include details like goals, pain points, and common objections?",
            options: [
              "These details help every team in the company make decisions aligned with the actual needs of their ideal customer",
              "These details are required by law for any company that collects customer data for marketing purposes",
              "These details are only useful for the sales department and have no relevance to product or marketing teams",
              "These details replace the need for market research since personas provide all necessary customer information"
            ],
            correctAnswer: 0,
            explanation: "Detailed personas create shared understanding across teams. When marketing writes content, product builds features, and sales handles objections, they're all working from the same vivid picture of who they serve."
          }
        ]
      },
      {
        type: "scenario",
        title: "Building a Persona for a Study App",
        narrative: "A team of students is building a study app. Without a persona, they argue constantly - one wants gamification features, another wants AI tutoring, a third wants social study groups. They create a persona: 'Focused Fiona,' a 16-year-old junior taking three AP classes who feels overwhelmed by test prep, studies alone at night, and needs structured review schedules more than social features. Suddenly, every feature debate has a clear answer: 'Would Fiona want this?'",
        details: [
          "Before the persona, the team spent 70% of meetings debating features based on personal opinions and preferences",
          "After creating Fiona, feature decisions became faster because the team had a shared framework for evaluation",
          "They cut the social study group feature (Fiona studies alone) and prioritized AI-generated study schedules instead"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb6-aq1",
          question: "Why did the study app team's decision-making improve after creating the 'Focused Fiona' persona?",
          options: [
            "The persona gave the team a shared framework so feature decisions were based on customer needs, not personal opinions",
            "The persona eliminated the need for any future customer research or user testing before launching the product",
            "The persona forced the team to remove all features except the one that Fiona specifically requested in surveys",
            "The persona was based on a real student who joined the development team and made all product decisions herself"
          ],
          correctAnswer: 0,
          explanation: "Personas replace opinion-based debates with customer-based decisions. Instead of arguing 'I think users want X,' the team asks 'Would Fiona need this?' - creating alignment and faster, better decisions."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Target market selection requires evaluating segment size, reachability, and alignment with company strengths",
          "Buyer personas are detailed semi-fictional profiles that go beyond demographics to include goals and pain points",
          "Personas create team alignment - every department works from the same vivid picture of the ideal customer",
          "The question 'Would our persona want this?' replaces opinion-based debates with customer-centered decisions"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "cb6-mastery",
            question: "A startup is debating whether to add a premium subscription tier. Their buyer persona is 'Budget Ben,' a cost-conscious college student who values free tools. Based on persona-driven decision making, what should they do?",
            options: [
              "Add the premium tier because it will generate more revenue regardless of what their target customer wants",
              "Recognize that a premium tier conflicts with Budget Ben's core values and explore alternative monetization models",
              "Abandon Budget Ben entirely and create a new persona that matches the premium subscription business model",
              "Add the premium tier but hide it from Budget Ben so he does not feel pressured to upgrade his free account"
            ],
            correctAnswer: 1,
            explanation: "If your persona is cost-conscious, a premium subscription directly conflicts with their values. Persona-driven thinking means adapting your business model to your customer - not forcing your customer into your preferred model. They might explore ads, freemium with limited features, or sponsorships instead."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CB-7: Brand Loyalty vs Brand Switching
  // ═══════════════════════════════════════════════
  {
    lessonId: "cb-7",
    sections: [
      {
        type: "concept",
        title: "Brand Loyalty vs Brand Switching",
        paragraphs: [
          "Brand loyalty occurs when a customer consistently chooses the same brand over competitors, even when alternatives are available at similar or lower prices. Loyal customers are the most valuable - they buy more frequently, pay premium prices, recommend the brand to others, and cost less to retain than new customers cost to acquire.",
          "Brand switching happens when customers move from one brand to another. The triggers include dissatisfaction with the current product, a better deal from a competitor, a change in personal needs, negative publicity about the brand, or a compelling new alternative entering the market. Switching can be temporary (trying something new) or permanent (leaving for good).",
          "The economics are stark: acquiring a new customer costs five to seven times more than retaining an existing one. A 5% increase in customer retention can increase profits by 25% to 95%. This is why smart businesses invest heavily in loyalty - not just through rewards programs but through consistent quality, emotional connection, and excellent service."
        ],
        bullets: [
          "Brand loyalty - consistently choosing the same brand, even when comparable alternatives exist",
          "Brand switching - moving to a competitor due to dissatisfaction, better deals, or changing needs",
          "Acquisition cost - getting a new customer costs 5-7x more than keeping an existing one",
          "Retention impact - a 5% increase in retention can boost profits by 25% to 95%"
        ],
        realWorldExample: "Apple has one of the highest brand loyalty rates in technology - over 90% of iPhone users buy another iPhone. This isn't just about the phone itself. Apple creates an ecosystem (iMessage, AirDrop, iCloud, Apple Watch) that makes switching painful. The more Apple products you own, the harder it is to leave."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb7-mc1",
            question: "Why are loyal customers more valuable than new customers to a business?",
            options: [
              "They buy more frequently, pay premium prices, refer others, and cost less to retain than new customers cost to acquire",
              "Loyal customers always spend exactly the same amount, making revenue forecasting easier for accounting teams",
              "New customers are always unprofitable because the cost of their first purchase exceeds the revenue generated",
              "Loyal customers never complain about products, which eliminates the need for customer service departments"
            ],
            correctAnswer: 0,
            explanation: "Loyal customers generate value in multiple ways: higher purchase frequency, willingness to pay premiums, word-of-mouth referrals, and dramatically lower retention costs compared to the expense of acquiring new customers."
          },
          {
            id: "cb7-mc2",
            question: "What is a common trigger for brand switching?",
            options: [
              "A customer becomes dissatisfied with quality, finds a better deal, or experiences negative brand publicity",
              "Customers switch brands on a fixed schedule, typically every two to three years regardless of satisfaction",
              "Brand switching only occurs when a product is discontinued and the customer has no choice but to find alternatives",
              "Social media algorithms automatically rotate the brands that consumers are exposed to, forcing periodic switching"
            ],
            correctAnswer: 0,
            explanation: "Brand switching is triggered by specific events - quality decline, competitor promotions, changing needs, or negative press. It's not random or scheduled; it happens when something disrupts the customer's loyalty."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Loyalty Battle: Streaming Services",
        narrative: "Maya has been subscribed to StreamFlix for three years. She's a loyal customer - she watches daily, has curated watchlists, and knows the interface well. Then StreamFlix raises prices by 30%, removes her favorite show, and adds more ads to the basic tier. Meanwhile, a competitor launches with lower prices, ad-free viewing, and exclusive content Maya wants. Within one month, Maya cancels StreamFlix and switches. Her friend Kai stays with StreamFlix despite the same frustrations because his entire family shares the account and switching would require everyone to rebuild their profiles.",
        details: [
          "Maya's brand loyalty broke because StreamFlix violated multiple trust factors simultaneously - price, content, and experience",
          "Kai's loyalty is partially driven by switching costs - the effort required to move his entire family makes staying easier than leaving",
          "StreamFlix lost a customer not because the competitor was dramatically better but because StreamFlix eroded the value that earned Maya's loyalty"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb7-aq1",
          question: "Why did Kai stay with StreamFlix while Maya switched, even though both faced the same frustrations?",
          options: [
            "Kai's switching costs were higher - moving his whole family's profiles and preferences made leaving more difficult",
            "Kai genuinely enjoyed the price increase and ad additions because he valued the expanded content library more",
            "Maya was simply a more rational consumer who always makes optimal purchasing decisions based on pure value",
            "Kai had a contractual obligation that prevented him from canceling his subscription for another twelve months"
          ],
          correctAnswer: 0,
          explanation: "Switching costs - the effort, time, and inconvenience of changing - are a powerful factor in brand loyalty. Kai's high switching costs (family account, multiple profiles) kept him loyal even when satisfaction dropped."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Brand loyalty means consistently choosing the same brand, and loyal customers are far more profitable than new ones",
          "Brand switching is triggered by dissatisfaction, better alternatives, changing needs, or negative brand experiences",
          "Acquiring a new customer costs 5-7x more than retaining an existing one - making retention economically critical",
          "Switching costs (effort, inconvenience, ecosystem lock-in) can maintain loyalty even when satisfaction declines"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "cb7-mastery",
            question: "A coffee chain discovers that 40% of customers switched to a competitor after a menu redesign removed popular items. Based on brand loyalty principles, what is the BEST response?",
            options: [
              "Offer a temporary 50% discount to attract entirely new customers to replace the ones who left the brand",
              "Restore the popular menu items and communicate directly with lost customers that their feedback was heard and acted upon",
              "Increase advertising spending to improve brand awareness among consumers who have never visited the store",
              "Accept the customer loss as inevitable market fluctuation and focus exclusively on reducing operational costs"
            ],
            correctAnswer: 1,
            explanation: "The switching was triggered by a specific action (removing popular items). The most effective response addresses the root cause (restore items) and rebuilds trust through direct communication. Winning back lapsed customers is cheaper than acquiring new ones."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CB-8: Case Study - How Nike Uses Consumer Research
  // ═══════════════════════════════════════════════
  {
    lessonId: "cb-8",
    sections: [
      {
        type: "concept",
        title: "Case Study: How Nike Applies Consumer Behavior Research",
        paragraphs: [
          "Nike is one of the world's most valuable brands - worth over $30 billion - and consumer behavior research is the foundation of their success. Every product launch, marketing campaign, and retail experience is built on deep understanding of how athletes and aspiring athletes think, feel, and buy.",
          "Nike uses all four segmentation methods simultaneously. Demographically, they target multiple age groups with different product lines (kids, teens, adults). Psychographically, they connect with people who see themselves as athletes - their 'Just Do It' slogan appeals to identity and aspiration. Geographically, they customize products for different markets (cricket shoes in India, soccer boots in Brazil). Behaviorally, they track purchase patterns through the Nike app to personalize recommendations.",
          "Perhaps most powerfully, Nike leverages aspirational reference groups. By signing athletes like Michael Jordan, Serena Williams, and LeBron James, Nike connects their products to the ultimate athletic identity. Customers aren't just buying shoes - they're buying a piece of who they want to be."
        ],
        bullets: [
          "Multi-segment strategy - Nike targets kids, teens, casual athletes, and professionals with distinct product lines",
          "Psychographic identity - 'Just Do It' connects with the internal athlete in every customer, not just professionals",
          "Aspirational influence - athlete endorsements transform products into symbols of identity and achievement",
          "Behavioral data - the Nike app tracks preferences and purchases to personalize the entire customer experience"
        ],
        realWorldExample: "When Nike signed Colin Kaepernick for their 'Believe in Something' campaign, they used consumer behavior data showing their core psychographic segment valued social justice. The campaign was polarizing, but Nike's stock hit an all-time high because they knew their target audience's values deeply."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "cb8-mc1",
            question: "How does Nike use aspirational reference groups in their marketing strategy?",
            options: [
              "They sign elite athletes so customers associate Nike products with the identity and achievement they aspire to",
              "They only sell products to professional athletes and refuse to market to casual or amateur consumers",
              "They hire everyday customers to appear in advertisements instead of using famous athletes or celebrities",
              "They create exclusive membership clubs that require athletic ability testing before allowing product purchases"
            ],
            correctAnswer: 0,
            explanation: "Nike's athlete endorsements work because of aspirational reference group influence - customers want to be like these athletes, and wearing Nike becomes a way to connect with that identity."
          },
          {
            id: "cb8-mc2",
            question: "Why does Nike customize products for different geographic markets?",
            options: [
              "Because consumer behavior varies by culture and geography - different regions have different sports, preferences, and needs",
              "Because Nike is legally required by international trade laws to manufacture different products for each country",
              "Because shipping costs are lower when products are designed specifically for nearby manufacturing facilities",
              "Because Nike uses geographic customization as a cost-cutting measure to reduce their global product inventory"
            ],
            correctAnswer: 0,
            explanation: "Geographic segmentation recognizes that consumer behavior varies by location. Cricket shoes in India and soccer boots in Brazil reflect the different sports, cultures, and consumer needs in those markets."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nike vs. a Competitor: Two Approaches to the Same Market",
        narrative: "Nike launches a new running shoe using their full consumer behavior playbook: psychographic research identifies that recreational runners want to feel like 'real athletes,' behavioral data from the Nike app reveals preferred cushioning levels, and an aspirational campaign features Olympic marathoners wearing the shoe. A competitor launches a similar shoe at a lower price with a generic ad showing the shoe on a white background with a list of technical specifications.",
        details: [
          "Nike's shoe sells at $180 with 2 million units in the first quarter - customers report buying it because it 'makes them feel like a runner'",
          "The competitor's shoe sells at $120 with only 200,000 units - customers who buy it cite price as the main reason",
          "Nike's approach generated ten times the revenue because they sold identity and aspiration, not just a product",
          "The competitor's customers showed low brand loyalty and switched to an even cheaper option the following season"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "cb8-aq1",
          question: "Why did Nike generate ten times the revenue despite charging 50% more than the competitor?",
          options: [
            "Nike sold identity and aspiration by understanding consumer psychology, while the competitor only sold product features and price",
            "Nike's shoe was ten times higher quality with superior materials and construction techniques compared to the competitor",
            "The competitor made a strategic error by pricing too low, which caused consumers to perceive their product as inferior",
            "Nike had ten times more retail store locations, giving them a geographic distribution advantage over the competitor"
          ],
          correctAnswer: 0,
          explanation: "Nike's success came from applying every consumer behavior principle - psychographic targeting (identity), aspirational influence (Olympic athletes), and behavioral personalization (app data). They sold an emotional experience, not just a shoe."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Nike uses all four segmentation methods - demographic, psychographic, geographic, and behavioral - simultaneously",
          "Their 'Just Do It' brand connects with the aspirational identity of being an athlete, not just wearing athletic gear",
          "Athlete endorsements leverage aspirational reference group influence to transform products into identity symbols",
          "Behavioral data from the Nike app enables personalized experiences that deepen loyalty and increase lifetime value"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "cb8-mastery",
            question: "A small fitness apparel brand wants to apply Nike's consumer behavior strategy on a limited budget. Which approach would be MOST effective?",
            options: [
              "Sign the most expensive celebrity endorsement available to immediately replicate Nike's aspirational influence at full scale",
              "Identify a specific psychographic segment, partner with relatable micro-influencers, and use behavioral data from social media to personalize messaging",
              "Copy Nike's exact product designs and marketing campaigns but sell at a lower price point to attract budget-conscious customers",
              "Ignore consumer behavior research entirely and focus solely on manufacturing the highest quality product at the lowest possible cost"
            ],
            correctAnswer: 1,
            explanation: "The principles scale down: identify who you serve (psychographic segmentation), find relatable aspirational figures within budget (micro-influencers), and use available data (social media analytics) to personalize. You don't need Nike's budget to apply Nike's strategy."
          }
        ]
      }
    ]
  }
]
