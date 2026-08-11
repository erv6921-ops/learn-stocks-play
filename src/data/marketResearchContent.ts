import { StructuredLessonContent } from "@/types"

export const marketResearchContent: StructuredLessonContent[] = [
  // ═══════════════════════════════════════════════
  // MR-1: Why Market Research Matters
  // ═══════════════════════════════════════════════
  {
    lessonId: "mr-1",
    sections: [
      {
        type: "concept",
        title: "What Is Market Research and Why Businesses Can't Skip It",
        paragraphs: [
          "Market research is the systematic process of gathering, analyzing, and interpreting information about a market, a product, or a service to be offered for sale. It answers critical questions: Who are your customers? What do they need? How big is the opportunity? What are competitors doing? Without research, every business decision is a guess.",
          "The cost of skipping market research is enormous. Studies show that 42% of startups fail because there is no market need for their product. These failures are not caused by bad products - they are caused by building the right product for the wrong market, or the wrong product for the right market. Research prevents both mistakes.",
          "Market research is not just for large corporations with dedicated departments. Any business, even a student selling tutoring services, benefits from understanding demand, competition, and customer preferences before investing time and money."
        ],
        bullets: [
          "Market research - the systematic process of collecting and analyzing data about markets, customers, and competitors",
          "It answers who, what, where, when, why, and how much - the questions every business needs answered before launch",
          "42% of startups fail due to no market need - research is the primary tool for avoiding this outcome",
          "Research applies at every scale - from solo entrepreneurs to Fortune 500 corporations"
        ],
        realWorldExample: "Before launching the Swiffer, Procter & Gamble spent months researching how people actually clean their floors. They observed families in their homes and discovered that mopping was universally hated - too messy, too slow, too complicated. That research insight led directly to a product that generated over $500 million in its first year."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr1-mc1",
            question: "What is the PRIMARY reason 42% of startups fail according to research?",
            options: [
              "They build products that no one in the market actually needs or wants to purchase",
              "They run out of funding before they can advertise their product effectively to consumers",
              "They hire too many employees too quickly and cannot sustain the payroll expenses",
              "They choose the wrong legal business structure, creating unnecessary tax and liability burdens"
            ],
            correctAnswer: 0,
            explanation: "The number one cause of startup failure is building something nobody needs. Market research directly addresses this by validating demand before significant resources are invested."
          },
          {
            id: "mr1-mc2",
            question: "Why is market research valuable even for small businesses and student entrepreneurs?",
            options: [
              "Because understanding demand, competition, and customer preferences helps any business make smarter decisions before investing",
              "Because government regulations require all businesses regardless of size to conduct formal market research",
              "Because market research is inexpensive and requires no time commitment from the business owner whatsoever",
              "Because small businesses cannot succeed without hiring a professional research firm to collect customer data"
            ],
            correctAnswer: 0,
            explanation: "Market research scales to any size. A student selling tutoring services benefits from knowing what subjects are in demand, what competitors charge, and what students actually want - just as much as a corporation launching a new product."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Students Launch Tutoring Businesses",
        narrative: "Jasmine surveys 50 classmates before starting her tutoring business. She discovers math tutoring has the highest demand, students prefer evening sessions, and the going rate is $20-25/hour. She launches with math-only evening sessions at $22/hour. Marcus assumes everyone needs help with English because he excels at it. He launches English tutoring at $30/hour during lunch breaks.",
        details: [
          "Jasmine fills all her tutoring slots within two weeks - her pricing, subject, and timing match actual demand",
          "Marcus gets two clients in the first month - demand for English tutoring is lower, lunch breaks are inconvenient, and his price is above market",
          "Jasmine's 30-minute survey cost her nothing but saved her from making the same assumptions that crippled Marcus"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr1-aq1",
          question: "What was the fundamental difference between Jasmine's and Marcus's approach to launching their businesses?",
          options: [
            "Jasmine used market research to validate demand before launching; Marcus assumed demand based on personal strengths",
            "Jasmine was a better tutor with stronger academic credentials and teaching experience than Marcus",
            "Marcus set his price too high because he overestimated the value of English tutoring relative to math",
            "Jasmine had more friends at school who were willing to support her business as personal favors"
          ],
          correctAnswer: 0,
          explanation: "Jasmine researched actual demand (math > English), preferences (evening > lunch), and pricing ($20-25 range). Marcus skipped research entirely and built around assumptions. The research - not the subject - made the difference."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Market research is the systematic process of gathering data about markets, customers, and competitors",
          "42% of startups fail because there is no market need - research is the primary defense against this",
          "Even simple research like surveying 50 potential customers can prevent costly assumptions",
          "Research applies at every business scale, from student side hustles to multinational corporations"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mr1-mastery",
            question: "A student wants to start a meal prep delivery service for busy families. Before investing $500 in equipment, what should they do FIRST?",
            options: [
              "Buy the equipment immediately and start cooking - speed to market matters more than research for small businesses",
              "Survey local families to understand demand, meal preferences, price sensitivity, and delivery timing before spending anything",
              "Create a professional website and social media presence to build brand awareness before researching the market",
              "Study the financial statements of major meal prep companies to understand the industry's profit margins"
            ],
            correctAnswer: 1,
            explanation: "Before investing $500, spend zero dollars on a survey. Asking 20-30 families about demand, meal preferences, willingness to pay, and delivery timing costs nothing and could save the entire $500 investment if the research reveals weak demand."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MR-2: Primary Research Methods
  // ═══════════════════════════════════════════════
  {
    lessonId: "mr-2",
    sections: [
      {
        type: "concept",
        title: "Primary Research Methods",
        paragraphs: [
          "Primary research is original data that you collect yourself, directly from sources. It is custom-designed to answer your specific business questions. The four main primary research methods are surveys, interviews, focus groups, and observations - each with distinct strengths and ideal use cases.",
          "Surveys collect standardized data from many respondents efficiently. They work best for measuring preferences, satisfaction, and demographics at scale. Interviews go deeper - one-on-one conversations reveal motivations, frustrations, and stories that surveys miss. Focus groups bring 6-10 people together for guided discussion, generating insights through group dynamics and debate.",
          "Observation means watching how people actually behave, rather than asking how they behave (people often say one thing and do another). A retailer might observe which aisles customers visit first, or a website might track which buttons users click. Observation reveals real behavior, which is often different from reported behavior."
        ],
        bullets: [
          "Surveys - standardized questions to many people; best for quantitative data at scale",
          "Interviews - deep one-on-one conversations; best for understanding motivations and stories",
          "Focus groups - guided group discussions of 6-10 people; best for generating ideas and testing reactions",
          "Observation - watching real behavior; best for revealing what people actually do versus what they say"
        ],
        realWorldExample: "IKEA sends researchers into people's homes to observe how they actually live. They discovered that many families eat dinner on the couch, not at a dining table. This observation led to products like lap trays and couch-friendly side tables - products that surveys about 'ideal dinner settings' would never have revealed."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr2-mc1",
            question: "When is observation more valuable than surveys for market research?",
            options: [
              "When you need to understand what people actually do, because reported behavior often differs from real behavior",
              "When you have a very small research budget and cannot afford to print or distribute survey questionnaires",
              "When the target audience is unable to read or write and therefore cannot complete written survey forms",
              "When you need to collect data from thousands of respondents simultaneously across multiple geographic regions"
            ],
            correctAnswer: 0,
            explanation: "People often report ideal behavior rather than actual behavior in surveys. Observation captures reality - what customers actually do, not what they say they do. This gap between stated and actual behavior is a key research insight."
          },
          {
            id: "mr2-mc2",
            question: "What is the main advantage of interviews over surveys?",
            options: [
              "Interviews reveal deeper motivations, stories, and context that standardized survey questions cannot capture",
              "Interviews are faster and cheaper to conduct than surveys because they require fewer total participants",
              "Interviews produce more statistically reliable data since each response is verified by the researcher in person",
              "Interviews eliminate all respondent bias because people are always more honest in face-to-face conversations"
            ],
            correctAnswer: 0,
            explanation: "Interviews trade breadth for depth. While surveys collect surface-level data from many people, interviews uncover the 'why' behind decisions - motivations, frustrations, and detailed stories that reveal unmet needs."
          }
        ]
      },
      {
        type: "scenario",
        title: "Choosing the Right Research Method",
        narrative: "A school cafeteria wants to improve its lunch menu. The manager uses three methods. First, a survey asks all 800 students to rate current menu items and suggest new ones (broad data). Second, interviews with 15 students reveal that the real issue is not the food itself but the long wait times - students skip lunch rather than wait. Third, observation during lunch hour confirms that 30% of students leave the line before ordering.",
        details: [
          "The survey revealed what students wanted to eat - but missed the real problem entirely",
          "The interviews uncovered the wait time issue that students did not mention in the structured survey format",
          "Observation confirmed the interview insights with hard behavioral data - 30% abandoning the line was undeniable evidence"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr2-aq1",
          question: "Why did the cafeteria need all three research methods to understand the full problem?",
          options: [
            "Each method revealed different layers - surveys showed preferences, interviews uncovered hidden problems, and observation confirmed real behavior",
            "The first two methods failed completely and only the third method - observation - produced any useful information",
            "Using three methods was unnecessary - the survey alone would have been sufficient if it included more questions",
            "The manager was required by school policy to use at least three different research methods before making changes"
          ],
          correctAnswer: 0,
          explanation: "Each method has strengths: surveys capture broad preferences, interviews reveal hidden problems and context, and observation confirms actual behavior. Together, they paint a complete picture that no single method could provide alone."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Primary research is original data you collect yourself - surveys, interviews, focus groups, and observations",
          "Surveys provide broad quantitative data; interviews provide deep qualitative understanding",
          "Focus groups generate ideas through group dynamics; observation reveals actual behavior",
          "The strongest research combines multiple methods to capture both breadth and depth of insight"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mr2-mastery",
            question: "A student is launching a homework help app and wants to understand why some students prefer in-person tutoring over digital tools. Which primary research method is BEST suited for this question?",
            options: [
              "A large-scale survey distributed to 500 students asking them to rate their preference on a numerical scale",
              "One-on-one interviews with 15-20 students to explore their reasoning, past experiences, and concerns about digital tools",
              "Observing students in a library to see whether they use laptops or textbooks while completing their assignments",
              "A focus group of teachers discussing their perceptions of how students feel about digital homework assistance"
            ],
            correctAnswer: 1,
            explanation: "The question asks 'why' - which requires depth, context, and personal stories. Interviews are the best method for understanding motivations and reasoning. Surveys would capture preference but not the reasons behind it."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MR-3: Secondary Research
  // ═══════════════════════════════════════════════
  {
    lessonId: "mr-3",
    sections: [
      {
        type: "concept",
        title: "Secondary Research - Using Existing Data",
        paragraphs: [
          "Secondary research uses data that already exists - collected by someone else for a different purpose but applicable to your questions. It includes government statistics, industry reports, academic studies, competitor filings, news articles, and public databases. Secondary research is faster and cheaper than primary research, making it an essential starting point.",
          "Government sources like the U.S. Census Bureau, Bureau of Labor Statistics, and Federal Reserve publish massive amounts of free data on demographics, employment, income, spending, and economic trends. Industry reports from firms like IBISWorld, Statista, and McKinsey provide market size, growth rates, and competitive analysis. Academic research offers peer-reviewed studies on consumer behavior and market dynamics.",
          "The limitation of secondary data is that it was not designed for your specific question. It may be outdated, too broad, or collected using different definitions. Smart researchers start with secondary data to understand the landscape, then use primary research to fill gaps and answer specific questions."
        ],
        bullets: [
          "Government sources - Census, BLS, Federal Reserve provide free demographic, economic, and industry data",
          "Industry reports - market size, growth rates, trends, and competitive analysis from research firms",
          "Academic research - peer-reviewed studies on consumer behavior, market dynamics, and business strategy",
          "Key limitation - secondary data may be outdated, too broad, or not perfectly matched to your specific question"
        ],
        realWorldExample: "When Airbnb was starting, they used secondary data from the U.S. Census and travel industry reports to estimate the size of the short-term rental market. This free data helped them build investor presentations showing a $500 billion travel market - without spending anything on custom research."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr3-mc1",
            question: "What is the main advantage of secondary research over primary research?",
            options: [
              "It is faster and cheaper",
              "It is always more accurate because it was collected by professional research organizations with larger budgets",
              "It perfectly answers every specific business question because research firms anticipate all possible needs",
              "It eliminates the need for primary research entirely since all relevant information is already publicly available"
            ],
            correctAnswer: 0,
            explanation: "Speed and cost are the biggest advantages. Secondary data already exists - you just need to find and analyze it. This makes it an ideal starting point before investing in more expensive primary research."
          },
          {
            id: "mr3-mc2",
            question: "Why should secondary research come BEFORE primary research in the process?",
            options: [
              "Because existing data reveals what is already known, helping you focus primary research on unanswered questions and gaps",
              "Because government regulations require businesses to review public data before conducting any original research",
              "Because primary research is always unreliable and should only be used as a last resort when no data exists",
              "Because secondary research automatically generates the survey questions needed for primary research collection"
            ],
            correctAnswer: 0,
            explanation: "Secondary research maps the landscape - what is already known about market size, demographics, and trends. This foundation helps you design focused primary research that fills specific gaps rather than duplicating existing knowledge."
          }
        ]
      },
      {
        type: "scenario",
        title: "Research on a Budget",
        narrative: "Two students want to open a smoothie stand near a college campus. Elena uses free secondary data: Census data shows 15,000 students aged 18-24 in the area, a health food industry report shows smoothie sales growing 8% annually, and competitor Yelp reviews reveal complaints about long wait times. This free research gives her a market size estimate and a competitive advantage to target (speed). Ryan skips all secondary data and immediately spends $200 on a custom survey - but his questions are unfocused because he doesn't know what the market already looks like.",
        details: [
          "Elena's free secondary research took three hours and provided a market estimate, growth trend, and competitive gap - all at zero cost",
          "Ryan's $200 survey produced scattered results because he asked broad questions without first understanding the market landscape",
          "If Ryan had started with secondary data, he could have designed a focused survey asking about smoothie preferences and willingness to pay for faster service"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr3-aq1",
          question: "Why did Elena's free secondary research produce more actionable insights than Ryan's $200 survey?",
          options: [
            "Because secondary research mapped the landscape first - market size, trends",
            "Because surveys are fundamentally unreliable and should never be used for market research purposes",
            "Because Elena was more experienced at business research and Ryan was a complete beginner in the field",
            "Because government census data is always more accurate than any survey data collected by private individuals"
          ],
          correctAnswer: 0,
          explanation: "Elena's secondary research provided context - how big is the market, is it growing, and what are competitors doing wrong. This foundation made her prepared to ask the right primary research questions. Ryan jumped to primary research without context."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Secondary research uses existing data - government statistics, industry reports, academic studies, and public databases",
          "It is faster and cheaper than primary research, making it the ideal starting point for any investigation",
          "Limitations include potential for outdated, overly broad, or imperfectly matched data",
          "The best approach starts with secondary research to map the landscape, then uses primary research to fill specific gaps"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mr3-mastery",
            question: "A student wants to estimate whether there is demand for a pet-sitting service in their neighborhood. Which combination of secondary sources would be MOST useful as a starting point?",
            options: [
              "Fashion industry reports and social media follower counts of pet influencer accounts across major platforms",
              "Census data on household demographics, pet ownership statistics from the ASPCA",
              "Academic studies on animal psychology and veterinary care trends published in scientific research journals",
              "Stock market performance data for publicly traded pet food companies over the last five years"
            ],
            correctAnswer: 1,
            explanation: "The most useful secondary data matches the business question. Census data shows how many households are nearby, ASPCA data estimates pet ownership rates, and competitor pricing reveals the market landscape. Together, these three free sources estimate demand and pricing."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MR-4: Qualitative vs Quantitative
  // ═══════════════════════════════════════════════
  {
    lessonId: "mr-4",
    sections: [
      {
        type: "concept",
        title: "Qualitative vs Quantitative Research",
        paragraphs: [
          "All market research falls into two categories: qualitative (exploring ideas and understanding why) and quantitative (measuring numbers and proving how much). They answer fundamentally different questions, and the strongest research programs use both strategically.",
          "Qualitative research is exploratory - it seeks to understand motivations, feelings, and experiences through open-ended questions, interviews, and observation. It answers 'why' and 'how' questions. Sample sizes are small (10-30 participants) but insights are deep. Results cannot be generalized to an entire population but reveal patterns, themes, and hypotheses worth testing.",
          "Quantitative research is confirmatory - it measures, counts, and tests hypotheses using structured data collection. Surveys with closed-ended questions, web analytics, and sales data are quantitative. Sample sizes are large (hundreds or thousands) and results can be generalized. It answers 'how many,' 'how often,' and 'how much' questions."
        ],
        bullets: [
          "Qualitative - exploratory, small samples, open-ended, reveals motivations and stories (the 'why')",
          "Quantitative - confirmatory, large samples, structured, measures frequency and magnitude (the 'how much')",
          "Best practice - use qualitative first to explore and generate hypotheses, then quantitative to test and measure",
          "Neither is superior - they answer different questions and are most powerful when combined"
        ],
        realWorldExample: "Netflix uses both methods constantly. Qualitative research (small focus groups, user interviews) helps them understand why viewers binge certain shows. Quantitative data (viewing statistics from 230 million subscribers) tells them exactly how many people watch, when they stop, and what they watch next. The qualitative 'why' informs the quantitative 'what.'"
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr4-mc1",
            question: "When should qualitative research come before quantitative research?",
            options: [
              "When you need to explore a new topic and generate hypotheses before testing them with larger-scale measurements",
              "When you already know exactly what questions to ask and just need to confirm your assumptions quickly",
              "When your research budget is unlimited and you can afford to conduct both methods simultaneously",
              "When the target audience is too small for any quantitative data collection to produce meaningful results"
            ],
            correctAnswer: 0,
            explanation: "Qualitative research is ideal for exploration - understanding a new problem, discovering unexpected insights, and forming hypotheses. These hypotheses can then be tested and measured quantitatively with larger samples."
          },
          {
            id: "mr4-mc2",
            question: "What is the key limitation of qualitative research?",
            options: [
              "Small sample sizes mean results reveal patterns and themes but cannot be statistically generalized to the entire population",
              "Qualitative research is always more expensive than quantitative research because it requires specialized equipment",
              "Qualitative data is inherently unreliable because participants always lie during interviews and focus groups",
              "Qualitative research can only be conducted by trained psychologists and is not accessible to business researchers"
            ],
            correctAnswer: 0,
            explanation: "Qualitative research trades breadth for depth. With 10-30 participants, you get rich insights but cannot claim the findings represent an entire market. That generalization requires quantitative validation with larger samples."
          }
        ]
      },
      {
        type: "scenario",
        title: "Qualitative Then Quantitative: App Redesign",
        narrative: "A fitness app sees declining user engagement. First, they interview 20 users (qualitative) and discover a common theme: the app feels overwhelming - too many features on the home screen. This hypothesis is then tested with a quantitative survey of 5,000 users: 73% agree the home screen has too many options, and 61% say they would use the app more with a simplified interface. The app team redesigns with confidence, knowing the change is supported by both stories and statistics.",
        details: [
          "The qualitative interviews revealed the problem (overwhelming interface) that analytics data alone could not explain",
          "The quantitative survey confirmed the problem was widespread - not just an opinion of 20 users but felt by 73% of all users",
          "Without qualitative first, the team might have tested the wrong hypotheses; without quantitative second, they could not justify the redesign investment"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr4-aq1",
          question: "Why was the qualitative-then-quantitative sequence critical for the app redesign decision?",
          options: [
            "Qualitative interviews revealed the specific problem, and the quantitative survey proved it was widespread enough to justify the investment",
            "The qualitative data was more accurate than the quantitative data, so the survey was just a formality to satisfy executives",
            "The company was required by their investors to use both methods before making any product changes to the application",
            "The quantitative survey was conducted first and the interviews were follow-up conversations with dissatisfied respondents"
          ],
          correctAnswer: 0,
          explanation: "The sequence matters: qualitative exploration (interviews) identified the right problem, and quantitative confirmation (survey) proved it was widespread. This combination gave the team both understanding and evidence to justify the redesign."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Qualitative research explores the 'why' with small samples and open-ended methods like interviews",
          "Quantitative research measures the 'how much' with large samples and structured methods like surveys",
          "The best practice is qualitative first (explore and hypothesize) then quantitative (test and measure)",
          "Neither method is superior - they answer different questions and are most powerful when combined strategically"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mr4-mastery",
            question: "A school store is losing sales but doesn't know why. Which research approach would BEST help them understand and fix the problem?",
            options: [
              "Send a quantitative survey to all 1,000 students immediately asking them to rate the store on a scale of one to ten",
              "Interview 15 students to explore why they stopped buying, then survey all students to measure how widespread those reasons are",
              "Observe the store for one week and count foot traffic without asking any students about their experiences or preferences",
              "Review the store's financial statements from the past three years to identify which product categories have declined most"
            ],
            correctAnswer: 1,
            explanation: "The qualitative-then-quantitative approach is ideal here. Interviews with 15 students will reveal the specific reasons for declining sales (maybe pricing, product selection, or inconvenient hours). A follow-up survey then measures which reasons are most common across the full student body."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MR-5: Reading & Interpreting Data
  // ═══════════════════════════════════════════════
  {
    lessonId: "mr-5",
    sections: [
      {
        type: "concept",
        title: "How to Read and Interpret Market Research Data",
        paragraphs: [
          "Collecting data is only half the job - interpreting it correctly is where real business insight happens. Data interpretation means looking at numbers, charts, and patterns and translating them into actionable business decisions. Poor interpretation leads to poor decisions, even when the data itself is excellent.",
          "Key interpretation skills include reading charts (bar, line, pie), identifying trends (upward, downward, stable), spotting outliers (data points that deviate significantly from the pattern), understanding correlation vs causation (two things moving together does not mean one causes the other), and calculating basic metrics like percentages, averages, and growth rates.",
          "Common data interpretation mistakes include cherry-picking (selecting only data that supports a pre-existing belief), confusing correlation with causation, ignoring sample size (a survey of 5 people is not reliable), and anchoring on a single data point instead of looking at the full trend. Good analysts question their data before trusting it."
        ],
        bullets: [
          "Trend analysis - identifying upward, downward, or stable patterns over time in data series",
          "Outlier detection - recognizing data points that deviate significantly and investigating why",
          "Correlation vs causation - two things moving together does not mean one causes the other",
          "Common mistakes - cherry-picking, ignoring sample size, and anchoring on single data points"
        ],
        realWorldExample: "Ice cream sales and drowning deaths both increase in summer. A careless analyst might conclude ice cream causes drowning. The real explanation is a third variable - hot weather - that increases both independently. This is the classic example of confusing correlation with causation."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr5-mc1",
            question: "What does 'correlation does not equal causation' mean in market research?",
            options: [
              "Two variables moving together does not prove that one causes the other - a third factor may explain both",
              "Market research data is fundamentally unreliable and should never be used to draw causal conclusions",
              "Correlation is always stronger evidence than causation for making important business strategy decisions",
              "Only experiments conducted in laboratory settings can establish correlation between market variables"
            ],
            correctAnswer: 0,
            explanation: "Just because two things happen together doesn't mean one causes the other. Ice cream sales and drowning both rise in summer - but ice cream doesn't cause drowning. Hot weather (a third variable) explains both."
          },
          {
            id: "mr5-mc2",
            question: "Why is cherry-picking data dangerous in market research?",
            options: [
              "Because selecting only data that supports your belief creates a misleading picture and leads to overconfident bad decisions",
              "Because cherry-picking is a technical violation of market research certification standards and licensing regulations",
              "Because cherry-picking only applies to qualitative research methods and does not affect quantitative analysis",
              "Because data should always be selected randomly from the smallest available sample to minimize processing time"
            ],
            correctAnswer: 0,
            explanation: "Cherry-picking means ignoring data that contradicts your preferred conclusion. This creates false confidence - you feel supported by 'evidence' while overlooking warnings. Good analysts actively seek out contradictory data."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Analysts, Same Data, Different Conclusions",
        narrative: "A clothing store's monthly sales data shows: January $10K, February $8K, March $12K, April $9K, May $15K, June $11K. Analyst A says 'Sales are trending upward - we should expand!' pointing to the overall January-to-June growth. Analyst B says 'Sales are volatile with no clear trend - the ups and downs cancel out. We should investigate what causes the swings before expanding.' Analyst B also notes the small sample (6 months) makes any trend claim unreliable.",
        details: [
          "Analyst A cherry-picked the start and end points (January to June looks like growth) while ignoring the volatility in between",
          "Analyst B correctly identified that the data is too volatile and the sample too small to declare a reliable upward trend",
          "The real insight is in the volatility - what causes the ups and downs? Answering that question is more valuable than declaring a trend"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr5-aq1",
          question: "Why was Analyst B's interpretation more useful than Analyst A's?",
          options: [
            "Analyst B recognized the volatility and small sample size, recommending investigation rather than premature action based on incomplete data",
            "Analyst B used more sophisticated statistical software to process the exact same data with greater mathematical precision",
            "Analyst A's conclusion was correct but Analyst B provided a more conservative estimate that was safer for the business",
            "Analyst B had more years of experience in retail analytics and therefore deserved more credibility from management"
          ],
          correctAnswer: 0,
          explanation: "Analyst B applied critical thinking - noting that 6 months of volatile data is insufficient to declare a trend, and that investigating the cause of volatility is more actionable than declaring 'growth.' Good interpretation means questioning the data, not just reporting it."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Data interpretation translates numbers and patterns into actionable business decisions",
          "Key skills include trend analysis, outlier detection, and distinguishing correlation from causation",
          "Common mistakes include cherry-picking, ignoring sample size, and anchoring on single data points",
          "Good analysts question their data and actively seek contradictory evidence before drawing conclusions"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mr5-mastery",
            question: "A student's online store sees a spike in sales every time they post on social media. They conclude 'social media posts directly cause sales increases.' What critical thinking question should they ask before acting on this conclusion?",
            options: [
              "Could a third factor - like posting on paydays or weekends when people shop more - explain both the posts and the sales spikes simultaneously?",
              "Should they stop posting on social media entirely to see if sales continue at the same rate without any promotional activity?",
              "Is their social media follower count large enough to qualify as a statistically significant sample for academic research?",
              "Should they hire a professional data scientist to confirm the correlation before making any changes to their posting schedule?"
            ],
            correctAnswer: 0,
            explanation: "This is a correlation-causation question. The posts and sales may both be caused by a third variable - perhaps they post on weekends when people have more time to browse and shop. Before investing heavily in social media, they should test whether the timing (not the post itself) drives sales."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MR-6: Market Sizing - TAM, SAM, SOM
  // ═══════════════════════════════════════════════
  {
    lessonId: "mr-6",
    sections: [
      {
        type: "concept",
        title: "Market Sizing - TAM, SAM, and SOM",
        paragraphs: [
          "Market sizing is the process of estimating how big a business opportunity is in dollar terms. Investors, executives, and entrepreneurs all need to know: if everything goes perfectly, how much revenue could this business generate? Market sizing answers this question at three levels of specificity.",
          "TAM (Total Addressable Market) is the total global demand for your product or service if you had zero competition and unlimited resources. SAM (Serviceable Addressable Market) is the portion of TAM that your business model can realistically serve - limited by geography, technology, and business model. SOM (Serviceable Obtainable Market) is the realistic share you can capture in the near term, given competition and current resources.",
          "These three concentric circles help businesses and investors set realistic expectations. A startup claiming 'our TAM is $50 billion' sounds impressive but means nothing without SAM and SOM context. If their SAM is $500 million and their realistic SOM is $5 million, the conversation becomes much more grounded and credible."
        ],
        bullets: [
          "TAM - Total Addressable Market: the entire global demand for a product category with zero limitations",
          "SAM - Serviceable Addressable Market: the portion your business model can realistically reach and serve",
          "SOM - Serviceable Obtainable Market: the realistic share you can capture given competition and current resources",
          "Think of them as concentric circles: TAM is the largest, SAM fits inside, and SOM is the smallest and most realistic"
        ],
        realWorldExample: "When Uber launched: TAM = the entire global transportation market ($5.4 trillion). SAM = the ridesharing segment in cities where smartphone adoption was high enough ($300 billion). SOM = their initial launch cities in the first year ($100 million). Investors funded Uber because of the massive TAM, but Uber focused execution on achievable SOM targets."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr6-mc1",
            question: "What is the relationship between TAM, SAM, and SOM?",
            options: [
              "They are concentric circles: TAM is the total market, SAM is the reachable portion",
              "They are sequential stages: a business first achieves TAM, then SAM, then SOM as it grows over time",
              "They are competing metrics: businesses must choose to focus on one and ignore the other two entirely",
              "They measure different time periods: TAM is short-term, SAM is medium-term, and SOM is long-term potential"
            ],
            correctAnswer: 0,
            explanation: "TAM > SAM > SOM, like concentric circles. TAM is the biggest possible market, SAM narrows to what you can reach, and SOM narrows further to what you can realistically capture given current constraints and competition."
          },
          {
            id: "mr6-mc2",
            question: "Why is SOM the most important number for a startup's immediate planning?",
            options: [
              "Because SOM represents what the business can realistically achieve in the near term given actual resources and competition",
              "Because investors only care about SOM and consider TAM and SAM to be irrelevant vanity metrics for presentations",
              "Because SOM is always the largest of the three numbers and therefore represents the most attractive business opportunity",
              "Because government business registration requires companies to report their SOM before they are allowed to operate"
            ],
            correctAnswer: 0,
            explanation: "SOM grounds the business in reality. TAM shows the big picture opportunity and SAM shows what you could reach, but SOM answers the practical question: what revenue can we actually generate with our current team, budget, and market position?"
          }
        ]
      },
      {
        type: "scenario",
        title: "Market Sizing a Student Tutoring Business",
        narrative: "A student calculates market size for a math tutoring service. TAM: all K-12 students in the U.S. who need tutoring = $12 billion market. SAM: high school students within 10 miles of campus who can afford private tutoring = $2 million market. SOM: the 30 students she can realistically tutor in year one at $25/hour, 4 hours/week, 40 weeks = $120,000. An investor (her parents) feels much more confident funding supplies when she can show exactly how she'll earn that $120K.",
        details: [
          "The TAM ($12B) shows the tutoring industry is large and growing - this is not a tiny niche with no potential",
          "The SAM ($2M) shows meaningful local demand exists within her reachable geography and price range",
          "The SOM ($120K) shows a specific, achievable revenue target based on realistic capacity and pricing assumptions"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr6-aq1",
          question: "Why would presenting only the $12 billion TAM - without SAM and SOM - be ineffective when pitching to her parents?",
          options: [
            "Because TAM alone gives no indication of what she can realistically achieve - SAM and SOM provide the credible, grounded plan",
            "Because her parents would not believe the tutoring industry is worth $12 billion and would assume the number is fabricated",
            "Because TAM is only relevant for publicly traded companies and has no application to small local service businesses",
            "Because presenting multiple numbers confuses investors and she should only share the single most impressive figure"
          ],
          correctAnswer: 0,
          explanation: "A $12B TAM sounds impressive but is meaningless without context. Her parents want to know: can YOU make money? SAM shows local demand exists, and SOM shows a specific, achievable revenue target based on realistic assumptions."
        }
      },
      {
        type: "recap",
        takeaways: [
          "TAM is the total global demand; SAM is the reachable portion; SOM is the realistic near-term capture",
          "Market sizing helps businesses and investors set grounded expectations about revenue potential",
          "Presenting only TAM without SAM and SOM lacks credibility - all three levels are needed for a complete picture",
          "SOM is the most actionable metric for near-term planning because it reflects actual resources and competition"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mr6-mastery",
            question: "A student wants to launch a pet photography business. Which of the following correctly represents the TAM → SAM → SOM progression?",
            options: [
              "TAM: all pet owners in the U.S. → SAM: pet owners in their city who spend on pet services → SOM: the 50 clients they can realistically serve in year one",
              "TAM: the 50 clients they can serve → SAM: pet owners in their city → SOM: all pet owners in the entire United States",
              "TAM: pet owners who already use photographers → SAM: all pet owners in the country → SOM: only pet owners who live on their street",
              "TAM: their first month of revenue → SAM: their first year of revenue → SOM: their lifetime total projected revenue"
            ],
            correctAnswer: 0,
            explanation: "TAM starts broadest (all U.S. pet owners), SAM narrows to what the business model can serve (local pet owners who spend on services), and SOM narrows to realistic near-term capacity (50 clients in year one). Each level adds constraints that make the estimate more practical."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // MR-7: Case Study - Research-Driven Launch
  // ═══════════════════════════════════════════════
  {
    lessonId: "mr-7",
    sections: [
      {
        type: "concept",
        title: "Case Study: How Slack Used Market Research to Pivot and Launch",
        paragraphs: [
          "Slack, the workplace communication tool used by millions, was never supposed to exist. It started as an internal tool built by a gaming company called Tiny Speck while developing a game called Glitch. When the game failed, the team noticed something remarkable: the communication tool they built for their own team was better than anything else on the market. Market research confirmed this insight and guided one of the most successful pivots in tech history.",
          "The team conducted primary research - interviewing companies of different sizes about their communication frustrations. They discovered universal pain points: email was too slow and formal, existing chat tools were ugly and unreliable, and information was scattered across too many platforms. Quantitative research confirmed that 78% of knowledge workers felt overwhelmed by their communication tools.",
          "They validated market size through secondary research: the enterprise collaboration market was $8 billion and growing 13% annually. Their SOM was initially just 5,000 companies in their beta. By combining qualitative insights (what people hated about existing tools) with quantitative validation (how widespread the problem was), Slack launched with confidence and reached $1 billion in annual revenue within five years."
        ],
        bullets: [
          "Origin - Slack was an internal tool that pivoted to become a product after market research validated the opportunity",
          "Primary research - interviews revealed universal frustration with email and existing chat tools",
          "Quantitative validation - 78% of knowledge workers felt overwhelmed by communication tools",
          "Secondary research - the $8 billion enterprise collaboration market confirmed the opportunity was large enough"
        ],
        realWorldExample: "Slack's beta launch strategy was itself a research tool. They invited 8,000 companies to test the product and tracked every feature used, every complaint filed, and every feature request. This behavioral data (primary, quantitative, observational) shaped the product before public launch."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr7-mc1",
            question: "What type of research did Slack's team conduct when interviewing companies about their communication frustrations?",
            options: [
              "Primary qualitative research - collecting original data through interviews to explore motivations and pain points deeply",
              "Secondary quantitative research - analyzing existing numerical data from published industry reports",
              "Primary quantitative research - distributing standardized surveys with closed-ended numerical rating scales",
              "Secondary qualitative research - reviewing published case studies about communication tool adoption trends"
            ],
            correctAnswer: 0,
            explanation: "Interviews with companies were primary (original data collected by Slack's team) and qualitative (open-ended exploration of frustrations and needs). This method revealed the specific pain points that shaped Slack's product design."
          },
          {
            id: "mr7-mc2",
            question: "How did Slack use their beta program as a research tool?",
            options: [
              "They tracked feature usage, complaints",
              "They used the beta program exclusively to generate press coverage and early revenue, not for research purposes",
              "They only allowed companies that had already purchased the full product to join the beta testing program",
              "They asked beta companies to submit formal academic research papers about their communication workflow challenges"
            ],
            correctAnswer: 0,
            explanation: "The beta was a massive observation study - tracking real behavior (which features were used, which were ignored, what problems arose) across 8,000 companies. This quantitative behavioral data was more reliable than asking people what they wanted."
          }
        ]
      },
      {
        type: "scenario",
        title: "What Would Have Happened Without Research?",
        narrative: "Imagine Slack's team had skipped market research after their game failed. Without interviews, they might have assumed their internal tool was only useful for game developers. Without the 78% statistic, they might not have realized the communication problem was universal. Without market sizing, they might have underestimated the opportunity and built a small niche product instead of a platform. Without beta observation data, they might have launched with wrong features prioritized.",
        details: [
          "Without qualitative research, they would have missed the insight that the problem was universal - not specific to gaming companies",
          "Without quantitative validation, they would have lacked confidence to pursue a massive pivot from gaming to enterprise software",
          "Without market sizing (TAM/SAM/SOM), they could not have raised the venture capital funding needed to scale the product globally",
          "Research did not guarantee success, but it dramatically reduced the risk of a $1 billion bet on a pivot from a failed game"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr7-aq1",
          question: "Which research method provided the MOST critical insight for Slack's pivot decision?",
          options: [
            "Primary qualitative interviews that revealed the communication problem was universal across industries, not just gaming",
            "Secondary market size data showing the enterprise collaboration market was valued at eight billion dollars",
            "Quantitative survey data confirming seventy-eight percent of workers were overwhelmed by existing tools",
            "Beta program observation tracking which specific features were most heavily used by test companies"
          ],
          correctAnswer: 0,
          explanation: "The pivot hinged on one qualitative insight: the communication problem was universal, not gaming-specific. Without this realization, the quantitative data, market sizing, and beta observations would never have been pursued. The qualitative interviews provided the foundation everything else was built on."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Slack pivoted from a failed game to a $1 billion product by letting market research guide every major decision",
          "Qualitative interviews revealed the universal communication pain point that sparked the pivot idea",
          "Quantitative research and market sizing confirmed the opportunity was large enough to pursue",
          "Beta program observation provided behavioral data that shaped the product before public launch"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 1,
        questions: [
          {
            id: "mr7-mastery",
            question: "A student builds a study flashcard app for their chemistry class and friends love it. They want to know if it could become a real business. Based on Slack's research journey, what should they do FIRST?",
            options: [
              "Immediately launch the app on the App Store and spend their savings on advertising to reach as many students as possible",
              "Interview students across different subjects and schools to see if the flashcard need is universal or specific to their chemistry class",
              "Calculate the TAM of the entire global education technology market to include in an investor presentation",
              "Build a premium version with advanced features and charge students twenty dollars per month before testing demand"
            ],
            correctAnswer: 1,
            explanation: "Just like Slack, the first step is qualitative exploration: is the problem universal or niche? Interviewing students across subjects and schools reveals whether 'flashcard frustration' extends beyond one chemistry class - the same insight that transformed Slack from a gaming tool into a universal platform."
          }
        ]
      }
    ]
  }
]
