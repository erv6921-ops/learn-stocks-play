import { StructuredLessonContent } from "@/types"

export const pestelAnalysisContent: StructuredLessonContent[] = [
  // ── PESTEL-1: What is PESTEL ──
  {
    lessonId: "pestel-1",
    sections: [
      {
        type: "concept",
        title: "PESTEL - Scanning the Business Environment",
        paragraphs: [
          "Every business operates inside a larger environment it can't fully control. Interest rates change. New laws get passed. Technology disrupts entire industries overnight. PESTEL analysis is a framework that helps businesses systematically scan these external forces before they become surprises.",
          "PESTEL stands for Political, Economic, Social, Technological, Environmental, and Legal factors. Together, these six categories cover the major macro-environmental forces that shape whether a business thrives or struggles.",
          "Companies use PESTEL before entering new markets, launching products, or making strategic decisions. It forces leaders to look beyond their own company and ask: 'What's happening in the world that could affect us?'"
        ],
        bullets: [
          "PESTEL is an external analysis tool - it looks outside the company, not inside",
          "Each letter represents a category of macro-environmental forces",
          "It complements internal tools like SWOT by covering factors a company can't control",
          "Used for strategic planning, market entry, risk assessment, and opportunity scanning"
        ],
        realWorldExample: "When Uber expanded internationally, it conducted PESTEL-style analysis for each country. In Germany, strict taxi regulations (Political/Legal) slowed expansion. In India, low smartphone penetration initially (Technological) required a different approach. In the UK, employment law debates (Legal) forced a business model change. Each factor shaped Uber's strategy differently."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "pestel-1-mc1",
            question: "What does PESTEL analysis primarily examine?",
            options: ["Internal company strengths", "External macro-environmental factors", "Competitor pricing strategies", "Employee satisfaction levels"],
            correctAnswer: 1,
            explanation: "PESTEL focuses on external forces - Political, Economic, Social, Technological, Environmental, and Legal - that businesses can't directly control but must respond to."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Coffee Shops, One Changing World",
        narrative: "Jasmine and Derek both opened coffee shops in 2019. When COVID hit in 2020, Jasmine had already been tracking social trends (remote work rising) and technological shifts (mobile ordering). She pivoted to delivery and drive-through within weeks. Derek, who never monitored external trends, was caught flat-footed and closed after 6 months.",
        details: [
          "Jasmine's environmental scanning helped her anticipate and adapt",
          "Derek's failure wasn't about coffee quality - it was about ignoring external forces",
          "PESTEL thinking would have flagged pandemic risk under Social and Political factors"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "pestel-1-aq1",
          question: "Why did Jasmine's coffee shop survive while Derek's didn't?",
          options: [
            "She had better coffee beans",
            "She monitored external trends and adapted her strategy",
            "She had more money to invest",
            "She had a better location"
          ],
          correctAnswer: 1,
          explanation: "Jasmine succeeded because she practiced environmental scanning - tracking social and technological trends - which let her pivot quickly when conditions changed."
        }
      },
      {
        type: "recap",
        takeaways: [
          "PESTEL stands for Political, Economic, Social, Technological, Environmental, and Legal",
          "It's an external analysis framework - examining forces outside the company",
          "Businesses use it for strategic planning, market entry, and risk assessment",
          "Environmental scanning helps companies anticipate change instead of reacting to it"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "pestel-1-mq1",
            question: "Which of the following is NOT a component of PESTEL?",
            options: ["Political", "Economic", "Sales", "Technological"],
            correctAnswer: 2,
            explanation: "PESTEL stands for Political, Economic, Social, Technological, Environmental, and Legal. 'Sales' is not one of the six factors."
          },
          {
            id: "pestel-1-mq2",
            question: "PESTEL analysis is best described as:",
            options: ["An internal audit of company operations", "A framework for analyzing external macro-environmental forces", "A financial ratio calculation method", "A customer satisfaction survey"],
            correctAnswer: 1,
            explanation: "PESTEL examines external macro-environmental forces that a business cannot control but must understand and respond to."
          },
          {
            id: "pestel-1-mq3",
            question: "When would a company most likely use PESTEL analysis?",
            options: ["When hiring a new employee", "When entering a new international market", "When designing a company logo", "When setting up an email account"],
            correctAnswer: 1,
            explanation: "PESTEL is most valuable for strategic decisions like entering new markets, where understanding political, economic, social, and other external factors is critical."
          },
          {
            id: "pestel-1-mq4",
            question: "How does PESTEL relate to SWOT analysis?",
            options: ["They're the same thing", "PESTEL replaces SWOT entirely", "PESTEL covers external factors while SWOT includes both internal and external", "SWOT is more comprehensive than PESTEL in every way"],
            correctAnswer: 2,
            explanation: "PESTEL and SWOT complement each other. PESTEL dives deep into external macro factors, while SWOT covers both internal (Strengths, Weaknesses) and external (Opportunities, Threats) elements."
          },
          {
            id: "pestel-1-mq5",
            question: "A company discovers that a new government regulation will ban one of its key ingredients. Which PESTEL factor is this?",
            options: ["Economic", "Social", "Technological", "Political"],
            correctAnswer: 3,
            explanation: "Government regulations and policies fall under the Political factor of PESTEL analysis."
          }
        ]
      }
    ]
  },

  // ── PESTEL-2: Political Factors ──
  {
    lessonId: "pestel-2",
    sections: [
      {
        type: "concept",
        title: "Political Factors - How Government Shapes Business",
        paragraphs: [
          "Political factors include everything related to how governments interact with the business environment: regulations, tax policies, trade agreements, political stability, and government spending priorities. These forces can create enormous opportunities or devastating obstacles for businesses.",
          "Trade agreements between countries can open or close markets overnight. Tax incentives can make certain industries boom. Political instability in a region can make it too risky to operate there. Smart businesses monitor political landscapes continuously.",
          "Political factors also include labor laws, environmental regulations, intellectual property protections, and antitrust policies. A single new law can reshape an entire industry - think of how data privacy regulations (like GDPR) forced every tech company to change how they handle user data."
        ],
        bullets: [
          "Government regulation - rules that businesses must follow (safety standards, licensing, etc.)",
          "Tax policy - corporate tax rates, incentives, tariffs on imports/exports",
          "Trade agreements - deals between countries that affect cross-border business",
          "Political stability - how predictable and stable the governing environment is"
        ],
        realWorldExample: "When the US imposed tariffs on Chinese goods in 2018-2019, Apple faced a major political PESTEL factor. Many of its products were assembled in China. The tariffs threatened to raise iPhone prices significantly. Apple lobbied for exemptions and simultaneously began diversifying manufacturing to India and Vietnam - a direct strategic response to a political factor."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "pestel-2-mc1",
            question: "A country doubles its import tariffs on electronics. Which PESTEL category does this fall under?",
            options: ["Economic", "Political", "Technological", "Legal"],
            correctAnswer: 1,
            explanation: "Tariffs are government trade policies, making them a Political factor. While they have economic effects, the root cause is a political decision."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Tariff Shock",
        narrative: "SolarBright manufactures solar panels using components imported from Southeast Asia. When the government announces a 25% tariff on imported solar components to protect domestic manufacturers, SolarBright's costs jump overnight. Their competitor, SunPower USA, which sources domestically, suddenly has a major price advantage.",
        details: [
          "SolarBright's per-unit cost increases by $45 due to the tariff",
          "They must choose: absorb the cost, raise prices, or find domestic suppliers",
          "SunPower USA's stock price rises 15% on the news",
          "This single political decision reshapes the competitive landscape"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "pestel-2-aq1",
          question: "What should SolarBright do first in response to the tariff?",
          options: [
            "Immediately raise prices by 25%",
            "Shut down the business",
            "Evaluate domestic supplier options and negotiate transition timelines",
            "Ignore the tariff and hope it gets reversed"
          ],
          correctAnswer: 2,
          explanation: "The best strategic response is to evaluate alternatives - finding domestic suppliers reduces tariff exposure while maintaining competitiveness. Immediate price hikes could lose customers, and ignoring the change is risky."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Political factors include government regulations, tax policy, trade agreements, and political stability",
          "Trade tariffs can reshape competitive dynamics in an industry overnight",
          "Companies must monitor political environments in every country they operate in",
          "Political changes create both threats and opportunities - the key is anticipating them"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "pestel-2-mq1",
            question: "Which of the following is a political factor in PESTEL?",
            options: ["Consumer spending trends", "New trade agreement between two countries", "Adoption of artificial intelligence", "Population aging"],
            correctAnswer: 1,
            explanation: "Trade agreements are government-level decisions that directly affect how businesses operate across borders - a classic political factor."
          },
          {
            id: "pestel-2-mq2",
            question: "How did Apple respond to US-China tariffs?",
            options: ["Stopped selling iPhones", "Raised prices 50%", "Diversified manufacturing to India and Vietnam", "Moved headquarters to China"],
            correctAnswer: 2,
            explanation: "Apple began shifting production to countries like India and Vietnam to reduce its exposure to US-China trade tensions - a strategic response to political factors."
          },
          {
            id: "pestel-2-mq3",
            question: "A new government bans single-use plastics. This affects a packaging company. What type of PESTEL factor is this?",
            options: ["Social", "Technological", "Political", "Economic"],
            correctAnswer: 2,
            explanation: "Government bans and regulations are Political factors. While environmental concerns may have motivated the ban, the mechanism is a government policy decision."
          },
          {
            id: "pestel-2-mq4",
            question: "Why should businesses monitor political factors in countries where they don't yet operate?",
            options: ["It's not necessary", "Political changes could create future market entry opportunities", "Only to track competitor headquarters", "Political factors only matter domestically"],
            correctAnswer: 1,
            explanation: "Political changes in other countries can create opportunities for expansion - new trade agreements, deregulation, or incentive programs may make a market attractive."
          },
          {
            id: "pestel-2-mq5",
            question: "Political instability in a country would most likely cause a business to:",
            options: ["Increase investment there immediately", "Delay or reduce operations in that market", "Ignore it since it doesn't affect business", "Move all operations there for lower costs"],
            correctAnswer: 1,
            explanation: "Political instability increases risk - unpredictable government changes, potential unrest, and unreliable rule of law make businesses cautious about investing."
          }
        ]
      }
    ]
  },

  // ── PESTEL-3: Economic Factors ──
  {
    lessonId: "pestel-3",
    sections: [
      {
        type: "concept",
        title: "Economic Factors - The Financial Climate Around Your Business",
        paragraphs: [
          "Economic factors are the macro-financial conditions that affect consumer spending power, business costs, and overall market demand. These include GDP growth, inflation rates, interest rates, unemployment levels, exchange rates, and the stage of the business cycle.",
          "When the economy is growing (expansion), consumers spend more, businesses hire, and profits rise. During recessions, spending drops, layoffs increase, and many businesses struggle. Understanding where you are in the business cycle helps companies plan for what's coming.",
          "Interest rates are particularly powerful. When rates are low, borrowing is cheap - businesses expand and consumers buy homes and cars. When rates rise, borrowing becomes expensive, slowing economic activity. The Federal Reserve manipulates interest rates as its primary tool for managing the economy."
        ],
        bullets: [
          "GDP growth rate - measures overall economic output and growth",
          "Inflation - rising prices that erode purchasing power over time",
          "Interest rates - the cost of borrowing money (set by central banks)",
          "Unemployment - affects consumer spending and labor availability",
          "Exchange rates - impact import/export costs for international businesses"
        ],
        realWorldExample: "During the 2022-2023 inflation surge, McDonald's faced a classic economic PESTEL factor. Food input costs rose 14%, labor costs climbed, and consumers became more price-sensitive. McDonald's responded by emphasizing its value menu, raising prices strategically on premium items, and investing in digital ordering to reduce labor costs. The economic environment forced a shift in strategy."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "pestel-3-mc1",
            question: "When interest rates rise significantly, what typically happens to consumer spending on big purchases?",
            options: ["It increases dramatically", "It stays exactly the same", "It decreases because borrowing is more expensive", "It has no connection to interest rates"],
            correctAnswer: 2,
            explanation: "Higher interest rates make loans (mortgages, car loans, credit cards) more expensive, which reduces consumer spending on big-ticket items."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Inflation Squeeze",
        narrative: "FreshBite, a mid-size restaurant chain, is caught between rising food costs (up 12%) and customers who resist menu price increases. Their profit margin has dropped from 15% to 6% in one year. The owner must decide: raise prices and risk losing customers, absorb costs and risk bankruptcy, or find creative solutions.",
        details: [
          "Beef costs up 18%, chicken up 14%, produce up 10%",
          "Minimum wage in their state increased 8% this year",
          "Competitor chains are raising prices 5-8%",
          "Customer traffic has already dropped 7% from last year"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "pestel-3-aq1",
          question: "What's the most balanced strategy for FreshBite during this inflation period?",
          options: [
            "Raise all prices 15% immediately",
            "Keep all prices the same and accept lower profits indefinitely",
            "Selectively raise prices on some items, reduce portion sizes slightly, and optimize the menu to feature lower-cost ingredients",
            "Close half the restaurants to cut costs"
          ],
          correctAnswer: 2,
          explanation: "A balanced approach - selective price increases, menu engineering, and portion optimization - lets FreshBite protect margins while keeping customers. Across-the-board increases or doing nothing are both extreme."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Economic factors include GDP, inflation, interest rates, unemployment, and exchange rates",
          "The business cycle (expansion → peak → recession → recovery) shapes market conditions",
          "Interest rates affect borrowing costs for businesses and consumers",
          "Inflation forces companies to rethink pricing, sourcing, and cost management"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "pestel-3-mq1",
            question: "Which economic factor most directly affects the cost of taking out a business loan?",
            options: ["GDP growth", "Unemployment rate", "Interest rates", "Population growth"],
            correctAnswer: 2,
            explanation: "Interest rates directly determine the cost of borrowing. Higher rates mean higher loan payments for businesses."
          },
          {
            id: "pestel-3-mq2",
            question: "During a recession, businesses typically experience:",
            options: ["Increased consumer spending and easy hiring", "Decreased demand, lower revenue, and potential layoffs", "No change from normal operations", "Guaranteed bankruptcy"],
            correctAnswer: 1,
            explanation: "Recessions bring reduced consumer spending, lower demand, and often force businesses to cut costs including workforce reductions."
          },
          {
            id: "pestel-3-mq3",
            question: "How did McDonald's respond to 2022-2023 inflation?",
            options: ["Closed all locations", "Emphasized value menu and raised prices strategically on premium items", "Stopped serving food", "Ignored the inflation entirely"],
            correctAnswer: 1,
            explanation: "McDonald's used a strategic pricing approach - protecting value-conscious customers while raising prices on premium items where demand was less price-sensitive."
          },
          {
            id: "pestel-3-mq4",
            question: "A strong dollar (high exchange rate) makes US exports:",
            options: ["Cheaper for foreign buyers", "More expensive for foreign buyers", "Unaffected", "Illegal"],
            correctAnswer: 1,
            explanation: "When the dollar is strong, US goods cost more in foreign currencies, making exports more expensive and potentially reducing international sales."
          },
          {
            id: "pestel-3-mq5",
            question: "Which stage of the business cycle is characterized by falling GDP, rising unemployment, and reduced spending?",
            options: ["Expansion", "Peak", "Recession", "Recovery"],
            correctAnswer: 2,
            explanation: "A recession is defined by falling economic output (GDP), rising unemployment, and reduced consumer and business spending."
          }
        ]
      }
    ]
  },

  // ── PESTEL-4: Social Factors ──
  {
    lessonId: "pestel-4",
    sections: [
      {
        type: "concept",
        title: "Social Factors - People, Culture, and Changing Attitudes",
        paragraphs: [
          "Social factors examine how demographics, cultural values, lifestyle trends, and consumer attitudes shape demand for products and services. These are the 'people' forces - shifts in how society thinks, lives, and spends.",
          "Demographics include population size, age distribution, education levels, and income distribution. An aging population creates demand for healthcare and retirement services. A younger population drives demand for technology, entertainment, and education.",
          "Cultural attitudes evolve constantly. The rise of health consciousness created a massive wellness industry. Growing environmental awareness pushed companies toward sustainability. Social media changed how people discover, evaluate, and recommend products. Businesses that read social trends early gain a competitive advantage."
        ],
        bullets: [
          "Demographics - age distribution, population growth, urbanization, education levels",
          "Cultural values - health consciousness, sustainability, work-life balance",
          "Consumer attitudes - brand expectations, social responsibility demands",
          "Lifestyle trends - remote work, plant-based diets, minimalism, digital-first living"
        ],
        realWorldExample: "Nike's 2018 Colin Kaepernick ad campaign was a direct response to social factors. Nike read the cultural moment - younger consumers (their core market) valued brands that took stands on social issues. Despite controversy and short-term boycotts, Nike's online sales surged 31% in the days after the campaign, and the stock hit an all-time high within weeks. Nike's social factor analysis told them their target demographic would reward boldness."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "pestel-4-mc1",
            question: "A company notices that 60% of its target market now works remotely. What PESTEL category is this?",
            options: ["Political", "Economic", "Social", "Technological"],
            correctAnswer: 2,
            explanation: "Remote work is a lifestyle and cultural shift - a Social factor that changes how, where, and what people buy."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Plant-Based Pivot",
        narrative: "MeatCo, a traditional burger chain, notices that plant-based food sales in their region have grown 240% over five years. Their customer surveys show 35% of millennials are actively reducing meat consumption. A competitor just launched a plant-based menu section and saw a 22% increase in foot traffic from new customers.",
        details: [
          "Plant-based food market projected to reach $162 billion by 2030",
          "MeatCo's core customer base (ages 18-34) is the most likely to try plant-based options",
          "Adding plant-based items would require new supplier relationships and kitchen training",
          "MeatCo's brand identity is built around traditional American burgers"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "pestel-4-aq1",
          question: "What should MeatCo do based on these social trends?",
          options: [
            "Ignore the trend - it's just a fad",
            "Completely rebrand as a plant-based restaurant",
            "Add plant-based options to the existing menu while maintaining their core identity",
            "Launch negative advertising against plant-based competitors"
          ],
          correctAnswer: 2,
          explanation: "Adding plant-based options captures the growing trend without abandoning MeatCo's core identity and loyal customers. This balanced approach responds to social factors without overreacting."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Social factors include demographics, cultural values, lifestyle trends, and consumer attitudes",
          "Population shifts (aging, urbanization, education) create new market demands",
          "Cultural movements (sustainability, health, social justice) reshape brand expectations",
          "Companies that read social trends early can capture emerging markets before competitors"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "pestel-4-mq1",
            question: "An aging population in Japan creates increased demand for:",
            options: ["Children's toys", "Healthcare and elder care services", "College textbooks", "Fast fashion"],
            correctAnswer: 1,
            explanation: "An aging population is a demographic (Social) factor that increases demand for healthcare, elder care, retirement services, and accessibility products."
          },
          {
            id: "pestel-4-mq2",
            question: "Nike's Kaepernick campaign succeeded primarily because:",
            options: ["The ads were visually beautiful", "Nike correctly read that their target demographic valued social stands", "Everyone agreed with the message", "It was the cheapest campaign they could run"],
            correctAnswer: 1,
            explanation: "Nike's social factor analysis showed that younger consumers - their core market - would reward brands that took stands on social issues, even if it was controversial."
          },
          {
            id: "pestel-4-mq3",
            question: "Which of the following is a social factor, not an economic factor?",
            options: ["GDP growth rate", "Rising interest rates", "Growing preference for remote work", "Inflation reaching 8%"],
            correctAnswer: 2,
            explanation: "Remote work preference is a lifestyle and cultural shift (Social factor), while the other options are all Economic factors."
          },
          {
            id: "pestel-4-mq4",
            question: "The rise of health-conscious consumers has most directly benefited which industry?",
            options: ["Coal mining", "Wellness and organic food", "Traditional advertising", "Oil and gas"],
            correctAnswer: 1,
            explanation: "Health consciousness is a social trend that drives demand for organic food, fitness products, mental wellness apps, and the broader wellness industry."
          },
          {
            id: "pestel-4-mq5",
            question: "A company's target market is shifting from suburban families to urban young professionals. This is primarily a change in:",
            options: ["Technology", "Politics", "Demographics and lifestyle", "Legal requirements"],
            correctAnswer: 2,
            explanation: "Shifts in where and how target customers live (urbanization, household composition, lifestyle preferences) are Social/Demographic factors."
          }
        ]
      }
    ]
  },

  // ── PESTEL-5: Technological Factors ──
  {
    lessonId: "pestel-5",
    sections: [
      {
        type: "concept",
        title: "Technological Factors - Innovation, Automation, and Digital Disruption",
        paragraphs: [
          "Technological factors examine how innovation, automation, digital transformation, and emerging technologies affect business strategy. Technology can create entirely new industries (ride-sharing, streaming), destroy existing ones (video rental, film cameras), and fundamentally change how companies operate.",
          "The speed of technological change is accelerating. Businesses must constantly evaluate: Will AI replace parts of our workforce? Should we invest in automation? Are competitors using technology we're not? Is our industry vulnerable to digital disruption?",
          "R&D spending, technology adoption rates, digital infrastructure, and cybersecurity threats are all technological factors. Companies that embrace technology early often gain massive competitive advantages, while those that resist change risk becoming obsolete."
        ],
        bullets: [
          "Innovation - new products, services, and business models enabled by technology",
          "Automation - machines and AI replacing human tasks (manufacturing, customer service)",
          "Digital disruption - technology fundamentally changing how an industry works",
          "Cybersecurity - protecting digital assets and customer data from threats"
        ],
        realWorldExample: "Kodak is the textbook example of ignoring technological factors. Kodak actually invented the digital camera in 1975 but suppressed it to protect their film business. By the time smartphone cameras became mainstream, Kodak's film revenue had collapsed. They filed for bankruptcy in 2012. Meanwhile, companies like Instagram (founded 2010) built billion-dollar businesses on the same digital photography technology Kodak invented but refused to embrace."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "pestel-5-mc1",
            question: "A retail company switches from in-store checkout to fully automated self-checkout kiosks. Which PESTEL factor drove this decision?",
            options: ["Political", "Social", "Technological", "Environmental"],
            correctAnswer: 2,
            explanation: "Automation and digital transformation are Technological factors. The availability of self-checkout technology enabled this operational change."
          }
        ]
      },
      {
        type: "scenario",
        title: "The AI Disruption",
        narrative: "TranslateNow is a company that employs 200 human translators for business document translation. A new AI translation tool has just launched that can translate documents with 95% accuracy at 1/10th the cost. TranslateNow's biggest client just asked if they use AI and hinted they'd switch to a cheaper AI-powered competitor.",
        details: [
          "AI translation quality has improved from 70% to 95% accuracy in 3 years",
          "TranslateNow's human translators achieve 99% accuracy but cost 10x more",
          "Three AI-powered competitors have launched in the past year",
          "TranslateNow's revenue has dropped 20% as clients explore AI alternatives"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "pestel-5-aq1",
          question: "How should TranslateNow respond to the AI disruption?",
          options: [
            "Ignore AI and emphasize human quality only",
            "Fire all translators and switch to AI entirely",
            "Integrate AI for first-pass translation with human editors for quality assurance, offering speed + accuracy",
            "Sue the AI companies for unfair competition"
          ],
          correctAnswer: 2,
          explanation: "A hybrid approach - using AI for speed and cost savings, with human expertise for quality control - lets TranslateNow compete on price while maintaining its accuracy advantage. Pure resistance or pure replacement are both risky."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Technological factors include innovation, automation, digital disruption, and cybersecurity",
          "Technology can create new industries and destroy existing ones - often rapidly",
          "Companies that embrace technology early gain competitive advantages",
          "The Kodak story shows the danger of ignoring technological change to protect legacy business"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "pestel-5-mq1",
            question: "Why did Kodak go bankrupt despite inventing the digital camera?",
            options: ["They couldn't afford digital camera production", "They suppressed digital technology to protect their film business", "Digital cameras were banned by the government", "Consumers didn't want digital photos"],
            correctAnswer: 1,
            explanation: "Kodak chose to suppress digital camera technology to protect its highly profitable film business. By the time they pivoted, competitors and smartphones had captured the market."
          },
          {
            id: "pestel-5-mq2",
            question: "Which of the following is a technological factor in PESTEL?",
            options: ["Minimum wage increase", "Growing population", "Adoption of artificial intelligence in customer service", "New environmental protection law"],
            correctAnswer: 2,
            explanation: "AI adoption is a technological factor that affects how businesses operate, compete, and serve customers."
          },
          {
            id: "pestel-5-mq3",
            question: "Digital disruption most accurately describes:",
            options: ["A minor software update", "Technology fundamentally changing how an entire industry operates", "A temporary internet outage", "A company buying new computers"],
            correctAnswer: 1,
            explanation: "Digital disruption occurs when technology transforms the fundamental way an industry works - like streaming disrupting video rental or ride-sharing disrupting taxis."
          },
          {
            id: "pestel-5-mq4",
            question: "A company's biggest cybersecurity risk is:",
            options: ["Always from external hackers", "Never relevant to small businesses", "A technological factor that requires ongoing investment to manage", "Only important for tech companies"],
            correctAnswer: 2,
            explanation: "Cybersecurity is a technological factor affecting all businesses. Data breaches can cost millions and destroy customer trust regardless of company size."
          },
          {
            id: "pestel-5-mq5",
            question: "The best response to technological disruption in your industry is usually to:",
            options: ["Resist all change", "Evaluate and integrate relevant technologies while maintaining core strengths", "Abandon your entire business model immediately", "Wait until competitors have fully adopted it"],
            correctAnswer: 1,
            explanation: "Strategic technology adoption - evaluating what's relevant and integrating it thoughtfully - balances innovation with stability."
          }
        ]
      }
    ]
  },

  // ── PESTEL-6: Environmental and Legal Factors ──
  {
    lessonId: "pestel-6",
    sections: [
      {
        type: "concept",
        title: "Environmental & Legal Factors - Sustainability, Climate Risk, and the Law",
        paragraphs: [
          "Environmental factors include climate change, sustainability pressures, natural resource availability, pollution regulations, and weather patterns. Businesses increasingly face pressure from consumers, investors, and regulators to reduce their environmental impact.",
          "Legal factors cover the laws and regulations that businesses must comply with: employment law, consumer protection, health and safety standards, data protection (like GDPR), intellectual property rights, and antitrust regulations. Breaking these laws can result in massive fines, lawsuits, and reputation damage.",
          "Environmental and Legal factors often overlap. Environmental concerns lead to new environmental laws. For example, growing awareness of climate change (Environmental) led to emissions regulations (Legal). Companies must track both the underlying trends and the regulatory responses to them."
        ],
        bullets: [
          "Environmental: climate risk, sustainability, carbon emissions, resource scarcity, natural disasters",
          "Legal: employment law (minimum wage, worker rights), consumer protection, data privacy, intellectual property",
          "ESG (Environmental, Social, Governance) investing now represents over $35 trillion globally",
          "Non-compliance with legal requirements can result in fines, lawsuits, and criminal charges"
        ],
        realWorldExample: "In 2015, Volkswagen was caught installing 'defeat devices' in 11 million diesel vehicles to cheat emissions tests. The cars passed Environmental (Legal) tests in the lab but emitted up to 40x the legal limit on the road. The scandal cost VW over $33 billion in fines, settlements, and recalls. Their stock price dropped 30% in days. This is a case where ignoring Environmental and Legal PESTEL factors destroyed billions in value."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "pestel-6-mc1",
            question: "A company must comply with new data privacy regulations (like GDPR). Which PESTEL factor is this?",
            options: ["Political", "Economic", "Social", "Legal"],
            correctAnswer: 3,
            explanation: "Data privacy laws are Legal factors - specific regulations that businesses must comply with or face penalties."
          },
          {
            id: "pestel-6-mc2",
            question: "Investors increasingly refuse to invest in companies with high carbon emissions. This pressure is primarily:",
            options: ["Political", "Environmental", "Technological", "Economic"],
            correctAnswer: 1,
            explanation: "Investor pressure around carbon emissions is an Environmental factor - it's driven by climate concerns and sustainability expectations."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Full PESTEL - GreenTech Case Study",
        narrative: "GreenTech is a startup that makes biodegradable packaging for food companies. Read the following factors affecting their business and classify each one using PESTEL:\n\n1. The government announces a $2 billion grant program for sustainable packaging companies\n2. A recession reduces corporate spending on premium packaging\n3. Gen Z consumers demand eco-friendly packaging from brands they buy\n4. A new bio-material technology makes biodegradable packaging 40% cheaper to produce\n5. A major hurricane disrupts their raw material supply chain for 3 months\n6. New employment law requires overtime pay for warehouse workers above 35 hours/week",
        details: [
          "Factor 1: Political - government grant program",
          "Factor 2: Economic - recession reducing demand",
          "Factor 3: Social - consumer attitude shift toward sustainability",
          "Factor 4: Technological - new bio-material innovation",
          "Factor 5: Environmental - natural disaster disrupting operations",
          "Factor 6: Legal - employment law change affecting labor costs"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "pestel-6-aq1",
          question: "In the GreenTech scenario, which factor represents the BIGGEST long-term opportunity?",
          options: [
            "The recession (Economic)",
            "Gen Z demanding eco-friendly packaging (Social) combined with government grants (Political)",
            "The hurricane (Environmental)",
            "The overtime law (Legal)"
          ],
          correctAnswer: 1,
          explanation: "The combination of shifting consumer attitudes (Social) and government support (Political) represents a durable, growing tailwind for GreenTech's business. The recession is temporary, and the hurricane is a short-term disruption."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Environmental factors include climate change, sustainability, resource scarcity, and natural disasters",
          "Legal factors include employment law, consumer protection, data privacy, and intellectual property",
          "Environmental and Legal factors often overlap - environmental concerns create new regulations",
          "The Volkswagen emissions scandal shows the catastrophic cost of ignoring Environmental/Legal factors",
          "PESTEL works best when all six factors are analyzed together as an interconnected system"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "pestel-6-mq1",
            question: "The Volkswagen emissions scandal is an example of failing to respect which PESTEL factors?",
            options: ["Political and Social", "Economic and Technological", "Environmental and Legal", "Social and Technological"],
            correctAnswer: 2,
            explanation: "VW violated environmental emissions standards (Environmental) and broke regulations by installing cheat devices (Legal), resulting in $33 billion in penalties."
          },
          {
            id: "pestel-6-mq2",
            question: "ESG investing stands for:",
            options: ["Economic, Strategic, Growth", "Environmental, Social, Governance", "Efficient, Scalable, Global", "Early, Safe, Guaranteed"],
            correctAnswer: 1,
            explanation: "ESG - Environmental, Social, and Governance - is an investing framework that evaluates companies on sustainability, social responsibility, and corporate governance."
          },
          {
            id: "pestel-6-mq3",
            question: "A company's factory is in a region experiencing increasing drought. This is primarily which PESTEL factor?",
            options: ["Political", "Economic", "Environmental", "Legal"],
            correctAnswer: 2,
            explanation: "Drought and water scarcity are Environmental factors that affect resource availability and operational continuity."
          },
          {
            id: "pestel-6-mq4",
            question: "GDPR (General Data Protection Regulation) is best classified as:",
            options: ["A social trend", "A legal factor", "A technological innovation", "An economic indicator"],
            correctAnswer: 1,
            explanation: "GDPR is a specific regulation (law) that businesses must comply with - a Legal factor in PESTEL analysis."
          },
          {
            id: "pestel-6-mq5",
            question: "When conducting a complete PESTEL analysis, what's most important?",
            options: [
              "Focusing only on the one factor most relevant to your industry",
              "Analyzing all six factors and how they interconnect",
              "Ignoring factors that seem positive",
              "Only looking at factors in your home country"
            ],
            correctAnswer: 1,
            explanation: "PESTEL is most powerful when all six factors are analyzed together as an interconnected system. A political change can trigger economic effects, which drive social shifts, which create legal responses."
          }
        ]
      }
    ]
  }
]
