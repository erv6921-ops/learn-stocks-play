import { StructuredLessonContent } from "@/types"

// Wave-2 deepened content (Mortgages-depth rebuild) for: market-research + leadership + strategic-analysis
export const deepBizC: StructuredLessonContent[] = [
  // ═══════════════════════════════════════════════
  // MARKET RESEARCH
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // mr-1: Why Market Research Matters
  // ─────────────────────────────────────────────
  {
    lessonId: "mr-1",
    sections: [
      {
        type: "concept",
        title: "Guessing Is Expensive; Research Is Cheap",
        paragraphs: [
          "Market research is the work of gathering and studying facts about customers, competitors, and demand before you spend money building something. It answers the scariest question in business: will anyone actually buy this? A founder who skips it is really just guessing, and guesses about human behavior are wrong far more often than people expect. Imagine opening a smoothie shop next to a gym because it 'feels' like a great spot. Research would ask first: how many people pass by, what do they already buy, and would they pay $7 for a smoothie? Those plain questions, asked before a single dollar is spent, are the whole point of research: they force a founder to replace a comfortable assumption with an honest, checkable fact about what real people in that real location will actually do.",
          "The cost of guessing wrong is brutal. A restaurant that signs a two-year, $4,000-a-month lease before checking demand is on the hook for roughly $96,000 whether customers show up or not. Compare that to spending two weeks and $300 surveying 200 locals first. Research does not guarantee success, but it dramatically shrinks the size of your mistakes. It is far cheaper to learn that nobody wants your idea from a survey than from an empty store and a stack of unpaid bills. The math is stark: a few hundred dollars of research can protect tens of thousands of dollars you would otherwise gamble on an untested guess about what strangers will buy.",
          "Research also reveals things you would never guess from your own head. You are not your customer, and what excites you may bore everyone else. A teen founder might assume classmates want a study app, but interviews could reveal they actually want help managing stress, not flashcards. That single insight can reshape the entire product. Good research replaces the phrase 'I think' with 'the data shows,' which is exactly the shift that turns a risky hunch into a defensible business decision."
        ],
        bullets: [
          "Market research gathers facts about customers, competitors, and demand before you spend big.",
          "It answers the core question: will real people actually pay for this?",
          "Guessing wrong is costly, since leases, inventory, and staff are hard to undo.",
          "You are not your customer; research shows what others want, not what you assume.",
          "It turns 'I think' into 'the data shows,' making decisions defensible."
        ],
        realWorldExample: "Before launching, a food-truck owner spent one weekend counting foot traffic at three locations and asking 50 people what they would pay for tacos. The busiest-looking spot turned out to have the fewest hungry buyers, saving her from a bad lease before she signed anything."
      },
      {
        type: "concept",
        title: "What Research Actually Tells You",
        paragraphs: [
          "Useful research targets a few specific questions rather than 'learning about the market' in general. Who exactly is the customer, and how many of them exist? What problem are they trying to solve, and how do they solve it today? How much will they pay, and who else is competing for that money? Each answer chips away at risk. A vague plan to 'sell healthy snacks' becomes a sharp one: 'sell $3 protein bars to gym members aged 18 to 30 who currently buy nothing after workouts.'",
          "Research shapes every part of a business, not just the idea. It guides pricing by revealing what customers already pay elsewhere, so you do not price a coffee at $8 in a $3 neighborhood. It guides marketing by showing where your audience spends time, so you advertise on TikTok instead of buying newspaper ads teens never read. It even guides features, because if 70 out of 100 surveyed users say delivery matters more than variety, you know where to focus your limited money and time first.",
          "Finally, research is not a one-time event; it is ongoing. Markets shift, competitors launch, and tastes change, so smart businesses keep listening. A clothing brand might research seasonally to catch trends before rivals do. The mindset matters more than any single survey: treat customers as a source of truth you return to again and again. Companies that stop listening slowly drift out of touch, then wonder why sales fell while a more curious competitor quietly took their place."
        ],
        bullets: [
          "Good research targets specific questions: who, how many, what problem, and what price.",
          "It sharpens a vague idea into a precise, testable customer target.",
          "Pricing insight prevents charging far above or below what buyers expect.",
          "Knowing where customers spend time makes marketing money go further.",
          "Research is ongoing, since markets, rivals, and tastes keep shifting."
        ],
        realWorldExample: "Netflix constantly tracks what viewers watch and abandon. That research told it people binge whole seasons, so it released full seasons at once instead of weekly episodes, a decision built on data rather than a hunch about how people watch TV."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr1-mc1",
            question: "What is the main purpose of market research?",
            options: [
              "To reduce risk by learning about customers and demand before spending big",
              "To guarantee that a new product will succeed, in nearly every real case",
              "To copy exactly what one competitor is doing, according to most business textbooks",
              "To make a business plan look longer, as a strict and unbreakable rule"
            ],
            correctAnswer: 0,
            explanation: "Research does not guarantee success, but it shrinks risk by revealing whether real customers want the product before you commit money to a lease, inventory, or staff."
          },
          {
            id: "mr1-mc2",
            question: "Why is 'you are not your customer' an important research idea?",
            options: [
              "Because founders are legally banned from buying their own products, for essentially all companies today",
              "Because your personal tastes may not match what real customers want",
              "Because customers always want the cheapest option, without any meaningful exceptions",
              "Because research is only for large companies, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "What excites a founder may bore the market. Research checks assumptions against real people, revealing needs you would never discover by relying on your own preferences."
          }
        ]
      },
      {
        type: "scenario",
        title: "Leo's Bubble Tea Hunch",
        narrative: "Leo, 17, wants to open a bubble tea stand near his school and is sure it will be a hit because he loves bubble tea. Before signing a $1,500-a-month kiosk lease, his mentor pushes him to do a week of quick research first.",
        details: [
          "Leo surveys 120 students and learns only 30 buy drinks after school, most spending under $4.",
          "He counts three existing tea shops within a five-minute walk that he had not noticed.",
          "Interviews reveal students want faster service more than new flavors during the rush.",
          "The lease would cost about $18,000 a year, due whether or not customers show up."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr1-aq1",
          question: "Based on his research, what is the smartest conclusion for Leo?",
          options: [
              "Sign the lease immediately since he personally loves bubble tea, based on common workplace assumptions",
              "Rethink the plan, since demand is thin and competitors already exist nearby",
              "Double the price to $8 to make up for low demand, as many people wrongly believe",
              "Ignore the surveys because he is confident in his taste, in the vast majority of situations"
            ],
            correctAnswer: 1,
          explanation: "The data shows limited demand, low spending, and three nearby rivals. Research just saved Leo from an $18,000 commitment; the wise move is to adjust the plan, not push ahead on a hunch."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Market research gathers facts about customers, demand, and competitors before you spend.",
          "It shrinks risk, turning expensive guesses into cheaper, informed decisions.",
          "You are not your customer, so research checks your assumptions against reality.",
          "Good research targets specific questions: who, how many, what problem, what price.",
          "Research is ongoing because markets, tastes, and competitors keep changing."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mr1-mastery1",
            question: "A founder signs a two-year lease before checking demand. What risk does research help avoid?",
            options: [
              "Paying taxes on early profits, regardless of the specific circumstances",
              "Committing big money to something customers may not want",
              "Having too many eager customers at once, in nearly every real case",
              "Spending too little on advertising, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "Leases, inventory, and staff are costly and hard to undo. Research checks demand first, so you avoid locking in big costs for a product the market may reject."
          },
          {
            id: "mr1-mastery2",
            question: "Which best describes what strong market research does to a vague idea?",
            options: [
              "It makes the idea sound more impressive to friends",
              "It sharpens it into a precise, testable customer target",
              "It removes the need to ever talk to customers",
              "It guarantees investors will fund the business, as a strict and unbreakable rule"
            ],
            correctAnswer: 1,
            explanation: "Research turns 'sell healthy snacks' into 'sell $3 bars to gym members aged 18 to 30.' Precision makes the plan testable and far easier to act on."
          },
          {
            id: "mr1-mastery3",
            question: "Why should research be treated as ongoing rather than a one-time task?",
            options: [
              "Because surveys expire after exactly one year by law",
              "Because markets, competitors, and tastes keep changing over time",
              "Because customers forget what they said quickly, for essentially all companies today",
              "Because it makes the business plan longer, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "Markets shift and rivals launch new products. Companies that keep listening catch changes early; those that stop drift out of touch and lose customers."
          },
          {
            id: "mr1-mastery4",
            question: "How does research improve marketing spending?",
            options: [
              "It shows where your audience spends time, so ads reach them",
              "It forces you to advertise everywhere at once, under almost all normal conditions",
              "It removes the need for any advertising at all, based on common workplace assumptions",
              "It guarantees every ad will go viral online, as many people wrongly believe"
            ],
            correctAnswer: 0,
            explanation: "If research shows your audience lives on TikTok, you advertise there instead of wasting money on channels they ignore, stretching a limited budget much further."
          },
          {
            id: "mr1-mastery5",
            question: "A survey shows 70 of 100 users value delivery over variety. How should this guide the business?",
            options: [
              "Ignore it and add more product variety anyway",
              "Focus limited money and time on delivery first",
              "Raise prices because customers seem loyal, in the vast majority of situations",
              "Stop selling to anyone who wants variety, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "With limited resources, you invest where the data points. Most users want delivery, so building that first serves the biggest need and creates the most value."
          },
          {
            id: "mr1-mastery6",
            question: "Which statement best captures the core value of market research?",
            options: [
              "It replaces 'I think' with 'the data shows'",
              "It proves the founder is always right, in nearly every real case",
              "It eliminates every possible business risk, according to most business textbooks",
              "It works only for tech startups, as a strict and unbreakable rule"
            ],
            correctAnswer: 0,
            explanation: "Research shifts decisions from hunches to evidence. It cannot erase all risk, but replacing assumptions with data makes choices defensible and mistakes smaller."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mr-2: Primary Research Methods
  // ─────────────────────────────────────────────
  {
    lessonId: "mr-2",
    sections: [
      {
        type: "concept",
        title: "Going Straight to the Source",
        paragraphs: [
          "Primary research is data you collect yourself, firsthand, for your specific question. Nobody has gathered it before, which makes it fresh and perfectly tailored, but also slower and more expensive than looking things up. The four workhorse methods are surveys, interviews, focus groups, and observation. A survey might ask 300 people the same questions; an interview digs deep with one person; a focus group sparks discussion among six to ten; and observation simply watches what people actually do rather than what they say.",
          "Surveys are the volume tool. They reach many people quickly and produce numbers you can count, like '62% prefer the blue label.' The tradeoff is depth: a survey tells you what people think but rarely why. Question design matters enormously. A leading question such as 'How much do you love our amazing new drink?' pushes people toward praise and poisons the data. Getting the wording right is not a minor detail but the core of good survey design, because a single carelessly phrased or loaded question can quietly tilt every answer and leave you confidently acting on results that were skewed from the very start. A neutral version, 'How would you rate this drink from 1 to 5?', gives you an honest answer you can actually trust when deciding what to build.",
          "Interviews and focus groups trade breadth for depth. A one-on-one interview lets you follow surprising answers with 'why?' and uncover feelings a survey would miss, though it is slow and hard to scale. Focus groups add group energy: ten people bounce ideas off each other, revealing shared frustrations, but a loud participant can sway the room. Observation sidesteps opinions entirely by watching behavior, like noticing shoppers ignore a display, which often reveals truths people would never report about themselves. A brand that only surveys can drown in numbers yet still misread its customers, which is exactly why pairing methods so consistently outperforms leaning on any one of them alone."
        ],
        bullets: [
          "Primary research is firsthand data you collect yourself for your exact question.",
          "Surveys reach many people fast and produce countable numbers, but lack depth.",
          "Interviews go deep with one person, uncovering the 'why' behind answers.",
          "Focus groups spark discussion among a small group but can be swayed by one voice.",
          "Observation watches what people do, revealing truths they might never say."
        ],
        realWorldExample: "When designing a new cereal box, a brand ran focus groups where kids and parents reacted to designs together. Parents said they wanted 'healthy,' but observation showed kids grabbed the colorful cartoon box every time, a gap between stated and real preference that reshaped the packaging."
      },
      {
        type: "concept",
        title: "Choosing the Right Tool and Trusting the Data",
        paragraphs: [
          "No single method is best; each fits a different question. Want to know how many customers prefer one price over another? Use a survey for hard numbers. Want to understand the emotions behind a complaint? An interview digs deeper. Launching packaging? Observe how shoppers actually behave in a store. Smart researchers often combine methods: a survey reveals what is happening across many people, then interviews explain why it is happening for a few. Together they give both scale and meaning.",
          "The quality of primary research depends on your sample: the group of people you study. A sample must be big enough and representative of your real customers. Surveying only your five best friends about a nationwide product is useless, because they are not typical buyers and probably want to be nice. A biased or tiny sample produces confident-sounding numbers that are simply wrong. Roughly speaking, more people and a mix that mirrors your true audience make results you can actually rely on.",
          "Watch for bias at every step. Leading questions push answers; a friendly interviewer makes people soften criticism; volunteers for a focus group may be unusually enthusiastic. Even the setting matters, since people behave differently when they know they are being watched. The goal is honest data, so design questions neutrally, pick samples fairly, and separate what people say from what they do. Primary research is powerful precisely because it is yours, but only if you collect it carefully enough to trust the answers it gives back."
        ],
        bullets: [
          "Match the method to the question: numbers use surveys, feelings use interviews.",
          "Combine methods so surveys show what happens and interviews show why.",
          "A sample must be large enough and representative of real customers.",
          "Tiny or biased samples produce confident numbers that are still wrong.",
          "Guard against leading questions, friendly bias, and unnatural settings."
        ],
        realWorldExample: "A startup surveyed 15 friends who all loved its app, then launched to strangers who found it confusing. The friendly sample hid the truth. Later, testing with 200 unbiased users revealed the real problems the small, cozy sample had completely masked."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr2-mc1",
            question: "Which primary research method is best for getting countable numbers from many people quickly?",
            options: [
              "A one-on-one interview",
              "A survey",
              "A single observation session",
              "Reading a government report"
            ],
            correctAnswer: 1,
            explanation: "Surveys reach many people fast and produce quantitative results like percentages. Interviews go deeper but are slow, and a government report is secondary, not primary, research."
          },
          {
            id: "mr2-mc2",
            question: "Why is a 'leading question' a problem in a survey?",
            options: [
              "It takes too long for people to read, for essentially all companies today",
              "It pushes people toward a particular answer, biasing the data",
              "It can only be used in interviews, without any meaningful exceptions",
              "It always produces numbers instead of opinions, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "A leading question like 'How much do you love our amazing drink?' nudges people to praise it, poisoning the data. Neutral wording gives answers you can actually trust."
          }
        ]
      },
      {
        type: "scenario",
        title: "Maria Tests a Snack Idea",
        narrative: "Maria wants to launch a spicy chickpea snack. She has a small budget and one month, so she plans a mix of primary research methods to learn whether people will buy it and what to fix before launch.",
        details: [
          "She surveys 250 shoppers to measure how many would pay $2.50 for the snack.",
          "She interviews 8 people in depth to understand why some dislike the spice level.",
          "She observes a store display, noticing most shoppers ignore snacks on the bottom shelf.",
          "She avoids surveying only her family, since they would be too kind to be reliable."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr2-aq1",
          question: "Why is combining a survey with interviews smarter than using either alone?",
          options: [
              "It doubles the number of friends she can include, based on common workplace assumptions",
              "The survey shows what many people think; interviews reveal why",
              "Interviews replace the need for any survey numbers, as many people wrongly believe",
              "It lets her skip observing real shopper behavior, in the vast majority of situations"
            ],
            correctAnswer: 1,
          explanation: "The survey gives scale and countable results across many people, while interviews explain the reasons behind those numbers. Together they deliver both breadth and depth Maria can act on."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Primary research is firsthand data you collect yourself for a specific question.",
          "Surveys give breadth and numbers; interviews and focus groups give depth.",
          "Observation reveals what people actually do, not just what they say.",
          "Match the method to the question, and combine methods for scale plus meaning.",
          "Trustworthy results need a large, representative sample and neutral, unbiased questions."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mr2-mastery1",
            question: "What defines primary research?",
            options: [
              "Data someone else already published in a report",
              "Firsthand data you collect yourself for your question",
              "Only numbers from government census files, regardless of the specific circumstances",
              "Guesses a founder makes about the market, in nearly every real case"
            ],
            correctAnswer: 1,
            explanation: "Primary research is fresh, firsthand data you gather yourself, tailored to your exact question. Published reports are secondary research collected by others for other purposes."
          },
          {
            id: "mr2-mastery2",
            question: "A researcher wants to understand the deep emotions behind a customer complaint. Which method fits best?",
            options: [
              "A 500-person survey",
              "An in-depth interview",
              "Counting website clicks",
              "A national sales chart"
            ],
            correctAnswer: 1,
            explanation: "Interviews let you ask 'why?' and follow surprising answers, uncovering feelings a survey misses. Surveys and click counts give numbers but rarely the emotional reasons behind them."
          },
          {
            id: "mr2-mastery3",
            question: "What is the main weakness of a focus group?",
            options: [
              "It can never produce any useful ideas, according to most business textbooks",
              "A loud participant can sway the whole group",
              "It reaches thousands of people at once, as a strict and unbreakable rule",
              "It only works for government agencies, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "Group energy is valuable, but one dominant voice can pull the room toward their view, distorting the discussion. Skilled moderators try to balance participation to reduce this."
          },
          {
            id: "mr2-mastery4",
            question: "Why can surveying only five close friends ruin your results?",
            options: [
              "Friends are legally barred from surveys, without any meaningful exceptions",
              "They are not typical buyers and may just be kind",
              "Five people is always more than enough, under almost all normal conditions",
              "Friends always give the harshest feedback, based on common workplace assumptions"
            ],
            correctAnswer: 1,
            explanation: "A tiny, friendly sample is not representative of real customers and tends to soften criticism, producing confident numbers that are simply wrong when you launch to strangers."
          },
          {
            id: "mr2-mastery5",
            question: "Which situation is observation best suited for?",
            options: [
              "Measuring exact national income levels, as many people wrongly believe",
              "Watching how shoppers actually behave near a display",
              "Asking people to explain their childhood memories, in the vast majority of situations",
              "Calculating a company's yearly profit, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "Observation captures real behavior, like shoppers ignoring a shelf, which often differs from what people say. It sidesteps opinions to reveal what customers truly do."
          },
          {
            id: "mr2-mastery6",
            question: "A brand hears parents say they want 'healthy,' but kids grab the cartoon box. What does this show?",
            options: [
              "Stated preferences can differ from real behavior",
              "Surveys are always completely useless, in nearly every real case",
              "Parents never influence what kids eat, according to most business textbooks",
              "Observation should always be skipped, as a strict and unbreakable rule"
            ],
            correctAnswer: 0,
            explanation: "People do not always act on what they say. Combining what people report with observing what they actually do reveals the gap and leads to better decisions."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mr-3: Secondary Research
  // ─────────────────────────────────────────────
  {
    lessonId: "mr-3",
    sections: [
      {
        type: "concept",
        title: "Standing on Data Someone Else Already Gathered",
        paragraphs: [
          "Secondary research uses data that already exists, collected by someone else for some other purpose. Instead of surveying 1,000 people yourself, you read a report where a government or company already did. It is faster and usually far cheaper than primary research, often free, which is why smart founders start here. Before spending a dollar collecting your own data, you check what is already known. Why count how many teens own phones when a published study already tells you it is roughly 95%?",
          "The sources are surprisingly rich. Government data like the U.S. Census Bureau reveals populations, ages, incomes, and spending by region. Industry reports from research firms describe market size and trends. Trade associations publish insider statistics for their field. Competitor websites, annual reports, and even customer reviews are secondary sources too. A founder researching a coffee shop could learn the town's population, average income, and how many cafes already exist, all without leaving a laptop, in a single afternoon of focused searching. The sheer breadth of what has already been published means a patient researcher can assemble a surprisingly detailed picture of a market for almost nothing, simply by knowing where to look and taking the time to read carefully before ever gathering fresh data.",
          "The catch is that secondary data was not made for you. It may be outdated, since a 2019 report cannot capture how habits changed afterward. It may be too broad, describing the whole country when you only care about one city. And the source may be biased, especially if a company funded a study that conveniently praises its own product. So you must judge every source: who made it, when, why, and whether the numbers fit your specific question before you trust them. Skipping that quick check is how founders end up building confident plans on stale or slanted figures that never truly described their own market in the first place."
        ],
        bullets: [
          "Secondary research uses existing data collected by others for other purposes.",
          "It is faster and cheaper than primary research, often free to access.",
          "Key sources: government data, industry reports, trade groups, and competitor info.",
          "Data may be outdated, too broad, or biased toward whoever paid for it.",
          "Always check who made the data, when, why, and whether it fits your question."
        ],
        realWorldExample: "A student planning a dog-walking business used free U.S. Census data to find her neighborhood had 4,200 households and a high median income, then checked pet-industry reports showing about 40% own dogs. In an afternoon, she estimated her market without spending a cent on surveys. That single afternoon of desk research often answers half of a founder's early questions for free, long before any money is spent collecting fresh data of their own."
      },
      {
        type: "concept",
        title: "Primary vs Secondary: Use Both in the Right Order",
        paragraphs: [
          "Secondary and primary research are partners, not rivals. The efficient order is secondary first, primary second. You start with existing data to map the landscape cheaply: how big is the market, who lives here, what trends are moving. This grounds you in facts and often answers half your questions for free. Only then do you spend time and money on primary research to fill the specific gaps that no existing source covers, like whether your exact product idea appeals to your exact customers.",
          "Think of secondary research as the wide-angle lens and primary research as the zoom. Secondary tells you the town has 50,000 people and coffee spending is rising nationally. But no report on Earth knows whether locals will love your particular oat-milk latte at $5.50, so you survey and taste-test for that. Using primary research to rediscover facts already published wastes money, while using only secondary data leaves you guessing about the one thing that matters most: your own offer.",
          "Evaluating source quality is the real skill. Prefer recent data over old, since markets move fast. Prefer neutral sources like government agencies or independent firms over parties with something to sell. Cross-check surprising claims against a second source before betting on them. And always ask whether the data actually matches your scope, because national averages can hide huge local differences. Done well, secondary research gives you a strong, cheap foundation that makes your later primary research sharper and far more focused."
        ],
        bullets: [
          "Do secondary research first to map the market cheaply, then primary to fill gaps.",
          "Secondary is the wide-angle view; primary zooms in on your specific offer.",
          "Never pay to rediscover facts that are already published for free.",
          "Prefer recent, neutral sources and cross-check surprising claims.",
          "Check that data matches your scope, since national averages hide local gaps."
        ],
        realWorldExample: "Before opening a gym, an owner read industry reports showing fitness membership growing about 3% a year nationally. That was encouraging, but only a local survey told her whether her specific town wanted a 24-hour gym, so she used both, in that order."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr3-mc1",
            question: "What best describes secondary research?",
            options: [
              "Data you collect yourself through surveys, for essentially all companies today",
              "Existing data collected by others for other purposes",
              "Guesses made without any data at all, without any meaningful exceptions",
              "Data that is always more accurate than primary research"
            ],
            correctAnswer: 1,
            explanation: "Secondary research reuses data others already gathered, such as census figures or industry reports. It is fast and cheap, but was not created for your specific question."
          },
          {
            id: "mr3-mc2",
            question: "Which is a key risk of relying on secondary data?",
            options: [
              "It is always far too expensive to obtain, under almost all normal conditions",
              "It may be outdated, too broad, or biased toward its source",
              "It can never include any numbers, based on common workplace assumptions",
              "It is illegal to use published reports, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "Because it was made for other purposes, secondary data can be old, too general for your scope, or slanted by whoever funded it. You must judge each source carefully."
          }
        ]
      },
      {
        type: "scenario",
        title: "Devon Scopes a Bookstore",
        narrative: "Devon dreams of opening an independent bookstore in his town. Before doing any surveys, his teacher tells him to gather what already exists. He spends two afternoons pulling together free and public data to size up the opportunity.",
        details: [
          "Census data shows the town has 60,000 residents with a median income above the state average.",
          "An industry report notes physical bookstore sales have been slowly recovering nationally.",
          "He finds two competing bookstores already listed online within three miles.",
          "One report he finds is from 2016, so he treats its numbers with caution."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr3-aq1",
          question: "After his secondary research, what should Devon do next?",
          options: [
              "Open immediately, since the data is fully complete, in the vast majority of situations",
              "Run primary research to test whether locals want his specific store",
              "Abandon the idea because two competitors exist, regardless of the specific circumstances",
              "Trust the 2016 report as his most important source, in nearly every real case"
            ],
            correctAnswer: 1,
          explanation: "Secondary data mapped the landscape, but no report knows whether Devon's exact bookstore appeals to his town. Primary research fills that gap, which is the correct next step."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Secondary research reuses existing data collected by others for other purposes.",
          "It is fast and cheap, drawing on government data, reports, and competitor info.",
          "Its risks: data can be outdated, too broad, or biased toward its source.",
          "Do secondary research first to map the market, then primary to fill gaps.",
          "Always judge who made the data, when, why, and whether it fits your scope."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mr3-mastery1",
            question: "Which is an example of a secondary research source?",
            options: [
              "A survey you personally hand out today",
              "A published U.S. Census Bureau report",
              "An interview you conduct yourself, according to most business textbooks",
              "A focus group you run this week"
            ],
            correctAnswer: 1,
            explanation: "Census reports are existing data gathered by others, making them secondary. Surveys, interviews, and focus groups you run yourself are primary research."
          },
          {
            id: "mr3-mastery2",
            question: "Why should a founder usually do secondary research before primary?",
            options: [
              "Primary research is always illegal to do first, as a strict and unbreakable rule",
              "It cheaply maps the market before spending on your own data",
              "Secondary data is always perfectly accurate, for essentially all companies today",
              "It removes any need for primary research later, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "Existing data answers many questions for free and grounds you in facts. You then spend on primary research only for the specific gaps no source covers."
          },
          {
            id: "mr3-mastery3",
            question: "A company funded a study praising its own product. Why be cautious?",
            options: [
              "Funded studies are always accurate, under almost all normal conditions",
              "The source may be biased toward a flattering result",
              "It means the data must be very old, based on common workplace assumptions",
              "Company studies are never published, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "When a party with something to sell funds research, results can lean in its favor. Prefer neutral sources and cross-check surprising claims before trusting them."
          },
          {
            id: "mr3-mastery4",
            question: "Why can national average data mislead a local business?",
            options: [
              "National data is always fake, in the vast majority of situations",
              "Averages can hide big differences in your specific area",
              "Local businesses cannot use any data, regardless of the specific circumstances",
              "National data is too recent to trust, in nearly every real case"
            ],
            correctAnswer: 1,
            explanation: "A national average may not match your town, where income, tastes, or competition differ sharply. Always check that data matches your actual scope."
          },
          {
            id: "mr3-mastery5",
            question: "Which pairing best describes how the two research types work together?",
            options: [
              "Primary is the wide lens; secondary is the zoom",
              "Secondary is the wide lens; primary is the zoom",
              "Both are identical and interchangeable, according to most business textbooks",
              "Neither one is useful for real decisions, as a strict and unbreakable rule"
            ],
            correctAnswer: 1,
            explanation: "Secondary research gives the broad view of the market, while primary research zooms in on your specific offer and customers. Using both, in order, is most efficient."
          },
          {
            id: "mr3-mastery6",
            question: "A report you find is from 2016. What is the wisest move?",
            options: [
              "Treat its numbers with caution and seek newer data",
              "Trust it completely as your main source, for essentially all companies today",
              "Assume the market has not changed at all, without any meaningful exceptions",
              "Ignore all older data forever on principle, under almost all normal conditions"
            ],
            correctAnswer: 0,
            explanation: "Markets move fast, so old data may no longer hold. Use it cautiously and prefer recent sources, cross-checking anything important before relying on it."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mr-4: Qualitative vs Quantitative
  // ─────────────────────────────────────────────
  {
    lessonId: "mr-4",
    sections: [
      {
        type: "concept",
        title: "Numbers That Count vs Words That Explain",
        paragraphs: [
          "Research data comes in two flavors. Quantitative data is about numbers: how many, how much, how often. It answers questions you can count and chart, like '340 of 500 customers chose the smaller size' or 'sales rose 18% in July.' Qualitative data is about words, feelings, and reasons: why customers behave a certain way, how they feel, what frustrates them. It shows up as quotes, descriptions, and themes rather than tidy figures, capturing the messy human story behind the numbers.",
          "Each answers a different kind of question. Quantitative is powerful for measuring and comparing at scale. If you want to know whether more people prefer $3 or $4 pricing, you count votes and get a clear percentage. But numbers alone can be hollow. Knowing that 40% of users quit the app tells you what happened, not why. Qualitative research fills that hole, revealing that people quit because the sign-up form felt confusing, an insight no percentage could ever hand you on its own. This is why experienced teams rarely trust a striking statistic in isolation: the number tells them something important has happened, but only the words behind it explain the reason, and without that reason they cannot know what to actually change in response.",
          "The tradeoffs mirror each other. Quantitative data is easy to compare, chart, and act on, but it can miss the human reasons and feel cold. Qualitative data is rich and deeply revealing, but it is harder to summarize and easy to over-read, since a few vivid quotes are not proof of a widespread pattern. Neither is 'better.' The real skill is knowing which one your current question needs, and often, using both so the numbers and the reasons reinforce each other."
        ],
        bullets: [
          "Quantitative data is numbers: how many, how much, how often.",
          "Qualitative data is words and feelings: why, how, and what frustrates people.",
          "Quantitative measures and compares at scale but misses the human 'why'.",
          "Qualitative reveals reasons and emotions but is hard to summarize cleanly.",
          "Neither is better; match the type to the question you are asking."
        ],
        realWorldExample: "A meal-kit company saw quantitative data that 25% of customers canceled after one month. Alarming, but not explanatory. Qualitative interviews revealed the real reason: recipes took too long on weeknights. The number raised the alarm; the words told them exactly what to fix."
      },
      {
        type: "concept",
        title: "Combining Both for the Full Picture",
        paragraphs: [
          "The strongest research usually blends the two. A common, powerful sequence is qualitative first to explore, then quantitative to confirm. You start with a few interviews to discover what issues even exist, since you cannot count a problem you have not yet noticed. Those conversations generate ideas and hypotheses. Then a large survey measures how widespread each issue truly is, turning a hunch from ten people into a solid percentage across five hundred, so you know which problem to fix first.",
          "It also works in reverse. Sometimes the numbers surprise you and you go digging for reasons. A dashboard shows checkout abandonment jumped last week, a purely quantitative signal. You then run qualitative follow-ups, reading support tickets or calling customers, to learn a new shipping fee scared people off. Here the quantitative data spotted the problem, and the qualitative data explained it. Moving between the two is not indecision; it is exactly how good researchers build a complete and trustworthy understanding. Skilled teams treat the numbers and the stories as two halves of one picture, moving between them until both point clearly toward the same, well-supported conclusion about customers.",
          "Beware of leaning too hard on one type. Founders who love numbers can optimize a metric while missing that customers quietly hate the product. Founders who love stories can fall in love with one dramatic quote and ignore that most users feel differently. A single passionate complaint is qualitative signal, not statistical proof. Balance protects you: use qualitative to find and understand, use quantitative to size and verify, and let each guard against the blind spots of the other."
        ],
        bullets: [
          "A strong sequence: qualitative first to explore, quantitative to confirm at scale.",
          "It also flows in reverse: numbers flag a problem, words explain the cause.",
          "You cannot count a problem you have not yet discovered through exploration.",
          "One dramatic quote is signal, not proof; verify patterns with numbers.",
          "Balance guards against over-optimizing metrics or over-trusting stories."
        ],
        realWorldExample: "Airbnb once had few bookings in one city. Numbers showed the drop, but photos of listings looked poor. Founders visited hosts, saw the issue qualitatively, then improved photos. Bookings rose, and a later survey confirmed better photos drove the gain across many listings."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr4-mc1",
            question: "Which is an example of quantitative data?",
            options: [
              "A customer saying the app 'feels confusing', based on common workplace assumptions",
              "340 of 500 customers chose the smaller size",
              "A quote describing why someone loves a brand",
              "A theme found across several interviews, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "Quantitative data is countable numbers, like '340 of 500.' Quotes, feelings, and themes are qualitative, capturing the reasons and emotions behind behavior."
          },
          {
            id: "mr4-mc2",
            question: "What does qualitative research add that numbers alone cannot?",
            options: [
              "A precise percentage of all customers, in the vast majority of situations",
              "The 'why' and feelings behind the behavior",
              "A guarantee the result applies to everyone",
              "A faster way to chart large datasets"
            ],
            correctAnswer: 1,
            explanation: "Qualitative data reveals reasons and emotions, like why users quit an app. Numbers show what happened; qualitative research explains why it happened."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aisha Investigates a Sales Drop",
        narrative: "Aisha runs a small online candle shop. Her dashboard shows repeat purchases fell 30% over two months. She has plenty of numbers but no idea why, so she plans research that uses both data types together.",
        details: [
          "Quantitative dashboards clearly show a 30% drop in repeat orders.",
          "She interviews 10 past customers and hears the new scent feels 'too weak'.",
          "She then surveys 400 buyers to measure how many agree the scent is too faint.",
          "The survey confirms 68% want a stronger scent, matching the interviews."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr4-aq1",
          question: "How did combining both data types help Aisha most?",
          options: [
              "The numbers alone told her exactly why sales fell, regardless of the specific circumstances",
              "Interviews revealed a likely cause; the survey confirmed how widespread it was",
              "The interviews proved the problem without needing numbers, in nearly every real case",
              "She avoided using any quantitative data at all, according to most business textbooks"
            ],
            correctAnswer: 1,
          explanation: "The dashboard flagged the drop, interviews suggested the weak scent as the cause, and the survey verified 68% agreed. Qualitative explored; quantitative confirmed the pattern at scale."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Quantitative data is countable numbers; qualitative data is words and feelings.",
          "Numbers measure and compare; words explain the reasons and emotions.",
          "Explore with qualitative first, then confirm scale with quantitative.",
          "Numbers can also flag a problem that qualitative research then explains.",
          "One vivid quote is signal, not proof; balance protects against blind spots."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mr4-mastery1",
            question: "Which statement best distinguishes the two data types?",
            options: [
              "Quantitative is about words; qualitative is about numbers, as a strict and unbreakable rule",
              "Quantitative is about numbers; qualitative is about words and reasons",
              "Both are only about numbers, for essentially all companies today",
              "Neither type is useful for research, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "Quantitative data counts (how many, how much), while qualitative data captures words, feelings, and the reasons behind behavior. Each answers a different question."
          },
          {
            id: "mr4-mastery2",
            question: "A metric shows 40% of users quit the app. What is this data missing?",
            options: [
              "The exact number of users involved",
              "The reason why users quit",
              "A way to chart the result",
              "Any measurable value at all"
            ],
            correctAnswer: 1,
            explanation: "The percentage shows what happened but not why. Qualitative research fills that gap, revealing reasons like a confusing sign-up form that numbers cannot explain."
          },
          {
            id: "mr4-mastery3",
            question: "Why explore with qualitative research before running a big survey?",
            options: [
              "Surveys are always illegal to run first, under almost all normal conditions",
              "You cannot count a problem you have not yet discovered",
              "Qualitative data needs no thinking at all, based on common workplace assumptions",
              "Surveys cannot measure anything useful, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "Interviews surface issues you did not know existed. Once you know what to ask about, a survey measures how widespread each issue is across many people."
          },
          {
            id: "mr4-mastery4",
            question: "What is the danger of trusting one dramatic customer quote too much?",
            options: [
              "Quotes are always completely useless, in the vast majority of situations",
              "One quote is signal, not proof of a broad pattern",
              "Quotes can only come from surveys, regardless of the specific circumstances",
              "A single quote guarantees everyone agrees, in nearly every real case"
            ],
            correctAnswer: 1,
            explanation: "A vivid complaint is qualitative signal worth exploring, but it may not represent most users. Verify with numbers before treating it as a widespread pattern."
          },
          {
            id: "mr4-mastery5",
            question: "A dashboard flags rising checkout abandonment. What role does qualitative follow-up play?",
            options: [
              "It replaces the dashboard numbers entirely, according to most business textbooks",
              "It explains the cause behind the number",
              "It proves the number is wrong, as a strict and unbreakable rule",
              "It counts the users more precisely, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "The number spots the problem; qualitative follow-up, like support tickets or calls, reveals the cause, such as a surprise shipping fee scaring buyers off."
          },
          {
            id: "mr4-mastery6",
            question: "Which describes the ideal relationship between the two data types?",
            options: [
              "Pick one and ignore the other completely, without any meaningful exceptions",
              "Use them together so numbers and reasons reinforce each other",
              "Qualitative always overrides quantitative, under almost all normal conditions, based on common workplace assumptions",
              "Quantitative is the only trustworthy type, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "Neither type is better alone. Qualitative finds and explains, quantitative sizes and verifies, and together they build a complete, trustworthy understanding."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mr-5: Reading & Interpreting Data
  // ─────────────────────────────────────────────
  {
    lessonId: "mr-5",
    sections: [
      {
        type: "concept",
        title: "Turning Charts Into Decisions",
        paragraphs: [
          "Collecting data is only half the job; reading it correctly is the other half. Different charts answer different questions. A line chart shows change over time, perfect for spotting whether sales are climbing or sliding across months. A bar chart compares categories side by side, like revenue from three products. A pie chart shows parts of a whole, such as what share of customers each age group represents. Choosing the wrong chart, or misreading one, can send a business confidently in exactly the wrong direction.",
          "The first skill is spotting a trend: the general direction data moves over time, ignoring the small bumps. If monthly sales go 100, 130, 125, 160, 190, the trend is clearly upward even though one month dipped. A trend matters more than any single point, because one good or bad day rarely defines a business. The second skill is spotting an outlier: a value far outside the normal pattern, like a day with 500 sales when you usually get 50. Outliers demand investigation, not blind trust.",
          "Outliers can be gold or garbage. A real outlier might reveal a viral moment worth repeating, while a false one might be a typo or a tracking glitch that would mislead you if averaged in. Always ask why an outlier happened before reacting. Reading data well means seeing the story: the overall direction, the surprising exceptions, and what they mean for your next move. A chart is not a conclusion; it is evidence you must interpret with a careful, questioning mind. The same figures can point toward very different decisions depending on whether the reader pauses to separate the meaningful signal from the random noise, which is exactly the judgment that turns raw numbers into genuinely useful business insight."
        ],
        bullets: [
          "Line charts show change over time; bar charts compare categories; pie charts show shares.",
          "A trend is the general direction over time, ignoring small bumps.",
          "A trend matters more than any single day's high or low value.",
          "An outlier is a value far outside the normal pattern, needing investigation.",
          "Outliers can reveal real insights or be errors, so always ask why."
        ],
        realWorldExample: "A shop owner saw one day with 300 sales versus the usual 40 and nearly doubled her inventory order. Investigating first, she found a local influencer had posted once about her store, a one-time spike, not a new trend. The pause saved her from overbuying stock. A single dramatic day, whether wonderful or terrible, almost never defines a business, so patient readers weigh the steady trend far more heavily than any lone eye-catching number."
      },
      {
        type: "concept",
        title: "Common Data Traps to Avoid",
        paragraphs: [
          "Numbers can lie, or rather, people can accidentally lie with numbers. The most famous trap is confusing correlation with causation. Two things moving together does not prove one caused the other. Ice cream sales and drownings both rise in summer, but ice cream does not cause drowning; hot weather drives both. A business that sees ad spending and sales rise together might wrongly credit the ads, when a holiday season actually lifted both. Always ask whether a hidden third factor is really in charge.",
          "Small samples fool people constantly. If you flip a coin four times and get three heads, you would be foolish to declare the coin biased. The same applies to business: '3 of 4 testers loved it' sounds great but means almost nothing, because tiny samples swing wildly by chance. Percentages hide this trap especially well, since '75% approval' from four people is far weaker than 75% from four hundred. Always check how many people a percentage actually rests on before trusting it.",
          "Watch for misleading visuals too. A bar chart with a y-axis that starts at 90 instead of 0 can make a tiny difference look enormous. Cherry-picking a flattering time window, like showing only the three months sales rose, hides the year they fell. And averages can deceive, since one billionaire in a room makes the 'average' wealth absurd while the typical person is broke. Reading data honestly means questioning the framing, the sample size, and whether the picture tells the whole true story. A healthy dose of skepticism about how a number is presented is often the difference between being informed by data and being quietly fooled by it."
        ],
        bullets: [
          "Correlation is not causation; a hidden third factor may drive both trends.",
          "Small samples swing wildly by chance and can badly mislead you.",
          "A percentage means little without knowing how many people it rests on.",
          "Truncated axes and cherry-picked time windows exaggerate or hide the truth.",
          "Averages can deceive when a few extreme values distort the whole."
        ],
        realWorldExample: "A company bragged its app had '90% five-star reviews.' The catch: only 10 people had reviewed it, so a single unhappy user would swing the number wildly. A rival with 4.3 stars from 8,000 reviews was actually the far safer, better-proven choice."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr5-mc1",
            question: "What is a 'trend' in a dataset?",
            options: [
              "The single highest value recorded, in the vast majority of situations",
              "The general direction the data moves over time",
              "Any value that looks unusual, regardless of the specific circumstances",
              "The exact average of all points, in nearly every real case"
            ],
            correctAnswer: 1,
            explanation: "A trend is the overall direction data moves, ignoring small bumps. It matters more than any single point, since one high or low day rarely defines a business."
          },
          {
            id: "mr5-mc2",
            question: "Why is 'correlation is not causation' an important warning?",
            options: [
              "Because charts are always wrong, according to most business textbooks, as a strict and unbreakable rule",
              "Because two things moving together may share a hidden third cause",
              "Because numbers can never be trusted, for essentially all companies today",
              "Because causation is illegal to claim, without any meaningful exceptions, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "Things can rise together without one causing the other, like ice cream sales and drownings both driven by hot weather. Always look for a hidden third factor."
          }
        ]
      },
      {
        type: "scenario",
        title: "Ben Reads a Sales Report",
        narrative: "Ben manages a small online store and reviews a monthly report. He wants to make good decisions, but the data has a few traps hiding in it that could easily mislead him if he reads it carelessly.",
        details: [
          "Monthly sales read 200, 240, 235, 280, 320, showing an upward trend despite one dip.",
          "One single day shows 900 sales versus a usual 30, a clear outlier to investigate.",
          "A testimonial claims '80% loved the product,' but only 5 people were asked.",
          "Ad spending and sales both rose in December, but so did holiday shopping overall."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr5-aq1",
          question: "Which conclusion should Ben trust the most?",
          options: [
              "The '80% loved it' claim, since 80% is a high number",
              "The upward monthly trend, since it holds across several months",
              "That his ads alone caused December's sales jump, based on common workplace assumptions",
              "That the 900-sale day is a reliable new normal, as many people wrongly believe"
            ],
            correctAnswer: 1,
          explanation: "The multi-month trend rests on real, repeated data. The 80% comes from just 5 people, the ad claim ignores holiday shopping, and the 900-sale day is an unverified outlier."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Match the chart to the question: line for time, bar for categories, pie for shares.",
          "A trend is the overall direction and matters more than any single point.",
          "Outliers can be real insights or errors, so investigate before reacting.",
          "Correlation is not causation; watch for hidden third factors.",
          "Small samples, truncated axes, and misleading averages distort the truth."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mr5-mastery1",
            question: "Which chart best shows how sales changed month by month over a year?",
            options: [
              "A pie chart",
              "A line chart",
              "A single number",
              "A bar chart of unrelated products"
            ],
            correctAnswer: 1,
            explanation: "Line charts are built to show change over time, making trends across months easy to see. Pie charts show shares, not change over time."
          },
          {
            id: "mr5-mastery2",
            question: "You usually get 50 sales a day, but one day shows 500. What should you do?",
            options: [
              "Immediately assume it is the new normal",
              "Investigate why the outlier happened before reacting",
              "Delete the day from your records, in the vast majority of situations",
              "Average it in without a second thought"
            ],
            correctAnswer: 1,
            explanation: "Outliers can be real (a viral moment) or errors (a glitch). Investigating first prevents overreacting, like overbuying stock based on a one-time spike."
          },
          {
            id: "mr5-mastery3",
            question: "Ice cream sales and drownings both rise in summer. What does this show?",
            options: [
              "Ice cream causes drownings, regardless of the specific circumstances",
              "A hidden factor, hot weather, drives both",
              "Drownings cause ice cream sales, in nearly every real case",
              "The two are completely unrelated, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "This is classic correlation without causation. Hot weather lifts both, so neither causes the other. Always check for a hidden third factor behind linked trends."
          },
          {
            id: "mr5-mastery4",
            question: "Why is '75% approval from 4 people' weak evidence?",
            options: [
              "Because 75% is a low number, as a strict and unbreakable rule",
              "Because tiny samples swing wildly by chance",
              "Because percentages are never useful, for essentially all companies today",
              "Because approval cannot be measured, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "With only 4 people, one different answer changes the percentage drastically. Small samples are unreliable, so always check how many people a percentage rests on."
          },
          {
            id: "mr5-mastery5",
            question: "How can a bar chart's y-axis mislead a reader?",
            options: [
              "By using too many colors, under almost all normal conditions",
              "By starting at 90 instead of 0 to exaggerate differences",
              "By listing categories alphabetically, based on common workplace assumptions, as many people wrongly believe",
              "By showing exact numbers on each bar, in the vast majority of situations"
            ],
            correctAnswer: 1,
            explanation: "A truncated axis that starts above zero makes tiny gaps look huge. Always check where the axis begins before judging how big a difference really is."
          },
          {
            id: "mr5-mastery6",
            question: "An app boasts '90% five-star reviews' from 10 users. Why be cautious?",
            options: [
              "Because 90% is a bad score, regardless of the specific circumstances",
              "Because so few reviews make the number unstable and unproven",
              "Because reviews are always fake, in nearly every real case",
              "Because five stars is impossible to earn, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "With only 10 reviews, one unhappy user swings the score wildly. A rating from thousands of reviews is far more reliable, even if slightly lower."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mr-6: Market Sizing - TAM, SAM, SOM
  // ─────────────────────────────────────────────
  {
    lessonId: "mr-6",
    sections: [
      {
        type: "concept",
        title: "Three Circles: The Whole Market to Your Real Slice",
        paragraphs: [
          "Before chasing a market, you need to know how big it actually is, and 'big' has three honest layers. TAM, the Total Addressable Market, is the entire demand for a product if every possible buyer bought from you. SAM, the Serviceable Addressable Market, narrows it to the portion you could actually serve given your product, location, and reach. SOM, the Serviceable Obtainable Market, is the realistic slice you can truly win in the near term against competitors. Picture three shrinking circles, from a huge dream to a grounded goal.",
          "An example makes it click. Suppose you sell a $5 healthy lunch to high schoolers. TAM might be all 15 million U.S. high schoolers, roughly a $75 million-a-day theoretical market if every one bought daily. That headline figure is inspiring but almost never realistic, which is precisely why the two tighter circles beneath it exist to drag a founder's expectations back down toward a number the business could genuinely reach in practice. But you only operate in one city with 20,000 students, so your SAM shrinks to that reachable group, maybe $100,000 a day. Realistically, with three competing lunch spots, you might capture 10% of those students at first, giving a SOM of around $10,000 a day. Same idea, wildly different numbers.",
          "Why bother with all three? Because each answers a different question and stops a different mistake. TAM shows whether the opportunity is worth pursuing at all; a market that is tiny even at its dream size may not justify the effort. SAM keeps you honest about who you can actually reach today. SOM is the number you plan and budget around, since betting your business on capturing the entire TAM is a fantasy that has sunk countless overconfident founders and their investors. Investors have learned to distrust a giant headline market number and to ask instead for the small, defensible figure a company can actually reach in its very first year of operating."
        ],
        bullets: [
          "TAM is total demand if every possible buyer bought from you.",
          "SAM narrows to the portion you can actually serve given reach and product.",
          "SOM is the realistic slice you can win soon against competitors.",
          "The three circles shrink from a huge dream down to a grounded goal.",
          "Each answers a different question: worth pursuing, reachable, and realistically winnable."
        ],
        realWorldExample: "A meal-kit startup pitched a '$50 billion TAM' of all U.S. grocery spending. Investors pushed back, asking for SOM. Honestly, it could reach a few thousand local customers worth maybe $2 million in year one. That grounded SOM, not the flashy TAM, was what actually mattered."
      },
      {
        type: "concept",
        title: "Sizing Honestly: Top-Down and Bottom-Up",
        paragraphs: [
          "There are two ways to estimate market size, and using both keeps you honest. Top-down starts big and narrows: begin with a huge published figure (like total national coffee spending) and cut it down by percentages that apply to you (your region, your customer type). It is fast but risky, because a small error in a giant number stays large. Bottom-up builds up from real units: how many customers can you realistically reach, times how often they buy, times price. It is slower but usually far more believable.",
          "Bottom-up sizing forces useful discipline. To claim $500,000 in first-year sales, you must show the math: maybe 1,000 customers buying a $10 product about 50 times a year. Suddenly the claim is testable. Can you truly reach 1,000 customers? Will they really buy weekly? If any assumption looks shaky, your estimate is too. This is why investors trust bottom-up numbers more; they reveal the assumptions behind the headline figure instead of hiding them inside a giant, vague percentage of a national total.",
          "The classic mistake is the '1% fallacy.' Founders say, 'The market is $10 billion, and if we just capture 1%, that's $100 million, easy!' But 1% of a huge market is not easy; it is enormous, and there is no plan for how you would win it. Real sizing works the other direction, building up from customers you can name and reach. Honest market sizing is not about the biggest number you can justify; it is about the number you can actually defend when someone smart asks how."
        ],
        bullets: [
          "Top-down starts with a big figure and cuts it down by percentages.",
          "Bottom-up builds from real customers times frequency times price.",
          "Bottom-up is slower but more believable and shows your assumptions.",
          "The '1% fallacy' pretends grabbing 1% of a huge market is easy.",
          "Good sizing is the number you can defend, not the biggest one possible."
        ],
        realWorldExample: "Two teams pitched the same idea. One said, 'It's a billion-dollar market, we'll take 2%.' The other said, 'We can reach 5,000 buyers who spend $80 a year, so $400,000.' Investors funded the second: its number was smaller but built on assumptions they could actually check."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr6-mc1",
            question: "What does SOM (Serviceable Obtainable Market) represent?",
            options: [
              "The total demand if everyone bought from you, as a strict and unbreakable rule",
              "The realistic slice you can actually win in the near term",
              "The entire national market for a product, for essentially all companies today",
              "A market with no competitors at all, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "SOM is the grounded, realistic portion you can capture soon, given competition and your reach. TAM is the full dream; SOM is the number you plan and budget around."
          },
          {
            id: "mr6-mc2",
            question: "What is the '1% fallacy' in market sizing?",
            options: [
              "Believing a market can shrink by 1% each year, under almost all normal conditions",
              "Assuming capturing 1% of a huge market is automatically easy",
              "Charging exactly 1% more than competitors, based on common workplace assumptions",
              "Ignoring markets smaller than 1 million people, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "Founders wrongly claim 1% of a giant market is 'easy money.' In reality, 1% of a huge market is enormous and requires a real plan you can defend."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nadia Sizes Her Tutoring App",
        narrative: "Nadia is building an app that offers math tutoring to high school students in her state. To pitch investors, she needs to size the market honestly using TAM, SAM, and SOM rather than one flashy number.",
        details: [
          "TAM: all U.S. high schoolers needing math help, a very large theoretical market.",
          "SAM: the 400,000 high schoolers in her state she could actually reach with her app.",
          "SOM: realistically 2% in year one, about 8,000 students, given three rival apps.",
          "Bottom-up: 8,000 students paying $15 a month gives roughly $1.44 million a year."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr6-aq1",
          question: "Why is Nadia's SOM the most useful number for planning her first year?",
          options: [
              "Because it is the largest of the three figures, in the vast majority of situations",
              "Because it reflects what she can realistically win against competitors",
              "Because it ignores competitors entirely, regardless of the specific circumstances",
              "Because TAM cannot be estimated at all, in nearly every real case"
            ],
            correctAnswer: 1,
          explanation: "SOM grounds her plan in reality: the slice she can truly capture soon, accounting for rivals. TAM inspires, but budgeting on the full TAM would be a fantasy."
        }
      },
      {
        type: "recap",
        takeaways: [
          "TAM, SAM, and SOM shrink from total demand to your realistic slice.",
          "TAM shows if the opportunity is worth pursuing; SOM is what you plan around.",
          "Top-down cuts a big figure down; bottom-up builds from real customers.",
          "Bottom-up is more believable because it exposes your assumptions.",
          "Avoid the 1% fallacy; defend the number you can actually justify."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mr6-mastery1",
            question: "Which correctly orders the three markets from largest to smallest?",
            options: [
              "SOM, SAM, TAM, according to most business textbooks",
              "TAM, SAM, SOM",
              "SAM, TAM, SOM",
              "TAM, SOM, SAM"
            ],
            correctAnswer: 1,
            explanation: "TAM (total demand) is largest, SAM (what you can serve) is smaller, and SOM (what you can realistically win) is smallest. The circles shrink in that order."
          },
          {
            id: "mr6-mastery2",
            question: "What does TAM tell a founder?",
            options: [
              "The exact revenue for year one, as a strict and unbreakable rule",
              "Whether the opportunity is big enough to pursue at all",
              "How many competitors exist today, for essentially all companies today",
              "The price to charge each customer, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "TAM shows the total scale of demand, revealing whether the market is worth chasing. It is a dream ceiling, not a realistic first-year revenue figure."
          },
          {
            id: "mr6-mastery3",
            question: "Why do investors trust bottom-up sizing more than top-down?",
            options: [
              "It always produces bigger numbers, under almost all normal conditions",
              "It exposes the assumptions behind the estimate",
              "It skips any math entirely, based on common workplace assumptions",
              "It ignores how many customers exist, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "Bottom-up builds from real customers times frequency times price, revealing each assumption so it can be checked. Top-down hides errors inside a giant percentage."
          },
          {
            id: "mr6-mastery4",
            question: "A founder claims '1% of a $10 billion market is easy money.' What's wrong?",
            options: [
              "1% is too small to ever matter, in the vast majority of situations",
              "1% of a huge market is enormous and needs a real plan",
              "Markets can never be that large, regardless of the specific circumstances, in nearly every real case",
              "Percentages cannot be used in sizing, according to most business textbooks, as a strict and unbreakable rule"
            ],
            correctAnswer: 1,
            explanation: "This is the 1% fallacy. Capturing 1% of $10 billion is $100 million, which is not 'easy' at all and requires a defensible plan to win it."
          },
          {
            id: "mr6-mastery5",
            question: "A team estimates 5,000 buyers spending $80 a year, for $400,000. Which method is this?",
            options: [
              "Top-down sizing",
              "Bottom-up sizing",
              "The 1% fallacy",
              "TAM estimation"
            ],
            correctAnswer: 1,
            explanation: "Building from real customers times price is bottom-up. It is slower but believable, since each assumption (buyer count and spending) can be tested."
          },
          {
            id: "mr6-mastery6",
            question: "Which number should a founder budget and plan around?",
            options: [
              "TAM, the total dream market",
              "SOM, the realistic obtainable slice",
              "The biggest number they can justify",
              "A national spending total, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "SOM reflects what you can realistically capture soon against competitors. Budgeting on TAM is fantasy; SOM is the grounded figure that guides real planning."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // mr-7: Case Study: Research-Driven Launch
  // ─────────────────────────────────────────────
  {
    lessonId: "mr-7",
    sections: [
      {
        type: "concept",
        title: "When Listening Beat Guessing: The LEGO Turnaround",
        paragraphs: [
          "In the early 2000s, LEGO was nearly bankrupt. Executives had guessed that modern kids, raised on video games, wanted instant thrills and had no patience for slow, hands-on building. So LEGO chased big, fast, flashy sets and licensed toys, drifting from its core brick. Sales kept falling. The company was deciding its future on a hunch about a whole generation, and the hunch was expensive and wrong. This is exactly the kind of costly guess that disciplined market research exists to prevent.",
          "Instead of guessing more, LEGO invested in deep research. Rather than another survey, it sent researchers to live with families and observe children at play for hours, classic qualitative, observational work. The finding overturned the assumption: many kids loved mastery and the pride of finishing a hard, detailed build. The struggle was the point, not a flaw. That discovery flipped the company's entire understanding of its own customers overnight, and it arrived not from a clever executive hunch but from the patient, unglamorous work of watching real children closely enough to see what they truly valued. Kids valued the accomplishment of completing a complex set, precisely the slow, hands-on experience LEGO had been abandoning in its panic to modernize. The whole crisis had been built on a confident assumption that a few hours of honest observation completely overturned, which is the entire reason disciplined research exists in the first place.",
          "This insight reshaped strategy. LEGO leaned back into its core bricks and complex sets, and combined this qualitative discovery with quantitative sales and market data to confirm which product lines truly performed. It refocused rather than chasing every fad. Over the following years, LEGO returned to strong profitability and became one of the world's most valuable toy brands. The lesson is not that LEGO got lucky; it is that structured research replaced a wrong assumption with a real understanding of customers."
        ],
        bullets: [
          "LEGO nearly went bankrupt after guessing kids wanted only fast, flashy toys.",
          "It ran deep observational research, watching real children play for hours.",
          "The finding: kids valued mastery and the pride of finishing hard builds.",
          "LEGO combined this qualitative insight with quantitative sales data.",
          "Refocusing on its core bricks helped LEGO become a top global brand."
        ],
        realWorldExample: "LEGO's researchers noticed one boy proudly showing off worn-down sneakers he had earned through skateboarding practice. It signaled that kids treasure hard-won mastery, an insight that helped confirm complex, challenging sets were exactly what its customers actually wanted."
      },
      {
        type: "concept",
        title: "The Repeatable Playbook Behind Smart Launches",
        paragraphs: [
          "LEGO's story reveals a pattern any business can copy. Step one: question your assumptions instead of trusting them. LEGO's leaders believed they knew what kids wanted and were wrong; humility to test beliefs is where good research begins. Step two: pick methods that fit the question. To understand how kids actually play, watching them beat any survey, since children often cannot explain their own behavior. Choosing observation over a questionnaire was the decision that unlocked the real insight.",
          "Step three: combine qualitative and quantitative. The observation revealed why kids loved building, but sales and market data confirmed which specific products to bet on at scale. One without the other would have been incomplete: pure stories risk chasing a charming exception, while pure numbers miss the human reason behind them. Step four: turn the insight into action. Research only pays off if it changes what you do, and LEGO actually shifted its entire product strategy based on what it learned, rather than filing the report away.",
          "The same playbook scales down to a teen's business. Before launching a product, question what you assume your customers want. Choose research that fits, observation, interviews, or surveys, then confirm patterns with numbers when you can. Finally, act on the findings even when they contradict your original idea, which is the hardest part. LEGO's comeback was not magic; it was the discipline to listen, test, and change. That discipline is available to any founder willing to value evidence over ego."
        ],
        bullets: [
          "Step 1: Question your assumptions instead of trusting your gut.",
          "Step 2: Choose methods that fit the question, like observation for behavior.",
          "Step 3: Combine qualitative reasons with quantitative confirmation.",
          "Step 4: Act on findings, even when they contradict your original idea.",
          "The playbook scales from global brands down to a teen's first business."
        ],
        realWorldExample: "A teen selling handmade candles assumed buyers wanted more scents. Interviews revealed they actually wanted longer burn time. Acting on that, she reformulated instead of adding scents, and repeat sales rose, a small-scale echo of LEGO's listen-test-change playbook."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "mr7-mc1",
            question: "What research method did LEGO rely on to discover how kids really play?",
            options: [
              "A quick online poll, without any meaningful exceptions",
              "Observing children at play for hours",
              "Reading old sales reports only, under almost all normal conditions",
              "Asking executives to guess, based on common workplace assumptions"
            ],
            correctAnswer: 1,
            explanation: "LEGO used qualitative observation, watching real children play, because kids often cannot explain their own behavior. This revealed they valued mastery and finishing hard builds."
          },
          {
            id: "mr7-mc2",
            question: "What key assumption did LEGO's research overturn?",
            options: [
              "That bricks were too expensive to make, as many people wrongly believe",
              "That modern kids wanted only fast, flashy thrills",
              "That adults never buy toys, in the vast majority of situations",
              "That video games would disappear soon, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "LEGO had assumed kids had no patience for slow building. Research showed many kids loved the challenge and pride of completing complex sets, reshaping its strategy."
          }
        ]
      },
      {
        type: "scenario",
        title: "Kofi Rethinks His Study App",
        narrative: "Kofi is about to launch a study app packed with flashy quiz games because he assumes students want fun. Before committing his savings, he decides to follow the research playbook LEGO used instead of trusting his gut.",
        details: [
          "He questions his assumption that students mainly want game-like features.",
          "He observes 12 classmates studying and interviews them about their frustrations.",
          "He learns most feel overwhelmed and want help planning, not more games.",
          "A follow-up survey of 200 students confirms 71% want scheduling tools most."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "mr7-aq1",
          question: "Following the research playbook, what should Kofi do next?",
          options: [
              "Launch the game-heavy app anyway, ignoring the findings, in nearly every real case",
              "Redesign the app to prioritize planning tools, acting on the research",
              "Add even more quiz games to stand out, according to most business textbooks",
              "Stop researching and trust his original gut, as a strict and unbreakable rule"
            ],
            correctAnswer: 1,
          explanation: "The hardest, most valuable step is acting on findings even when they contradict your idea. Kofi's research points to planning tools, so he should redesign accordingly."
        }
      },
      {
        type: "recap",
        takeaways: [
          "LEGO nearly failed by guessing kids wanted only fast, flashy toys.",
          "Observing children play revealed they valued mastery and finishing hard builds.",
          "Combining qualitative insight with sales data confirmed the right strategy.",
          "The playbook: question assumptions, fit the method, combine data, act on it.",
          "Acting on findings that contradict your idea is the hardest, most valuable step."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "mr7-mastery1",
            question: "Why was observation better than a survey for LEGO's question?",
            options: [
              "Surveys are always banned for toy companies, for essentially all companies today",
              "Kids often cannot explain their own play behavior",
              "Observation is always cheaper than everything, without any meaningful exceptions",
              "Surveys only work for adults over 40, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "Children struggle to articulate why they play a certain way, so watching them revealed truths a questionnaire would miss. The method fit the question."
          },
          {
            id: "mr7-mastery2",
            question: "What was the first step in LEGO's research-driven turnaround?",
            options: [
              "Buying more advertising, based on common workplace assumptions",
              "Questioning its own assumptions about kids",
              "Firing its entire design team, as many people wrongly believe",
              "Copying a rival's product exactly, in the vast majority of situations"
            ],
            correctAnswer: 1,
            explanation: "Good research begins with the humility to test beliefs. LEGO's leaders had assumed they knew what kids wanted; questioning that opened the door to real insight."
          },
          {
            id: "mr7-mastery3",
            question: "How did LEGO use quantitative data alongside its observations?",
            options: [
              "It ignored all sales numbers entirely, regardless of the specific circumstances",
              "It confirmed which product lines truly performed",
              "It replaced observation with guessing, in nearly every real case",
              "It only counted its own employees, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "Observation revealed why kids loved building; sales and market data confirmed which specific products to bet on at scale. Combining both made the strategy solid."
          },
          {
            id: "mr7-mastery4",
            question: "Which step in the playbook is often the hardest for founders?",
            options: [
              "Choosing a research method, as a strict and unbreakable rule",
              "Acting on findings that contradict your original idea",
              "Writing down an assumption, for essentially all companies today",
              "Reading a published report, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "Research only pays off if it changes what you do. Abandoning a beloved original idea because the data disagrees takes discipline and puts evidence over ego."
          },
          {
            id: "mr7-mastery5",
            question: "What broader lesson does LEGO's comeback teach?",
            options: [
              "Luck matters more than any research, under almost all normal conditions",
              "Structured research can replace wrong assumptions with real understanding",
              "Big companies never need to listen to customers, based on common workplace assumptions",
              "Guessing works fine if you guess confidently, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "LEGO did not get lucky; it disciplined itself to listen, test, and change. Research turned a costly wrong assumption into an accurate understanding of customers."
          },
          {
            id: "mr7-mastery6",
            question: "Can the LEGO playbook help a teen's small business?",
            options: [
              "No, it only works for billion-dollar firms, in the vast majority of situations",
              "Yes, questioning assumptions and testing scales to any size",
              "No, teens cannot do any research, regardless of the specific circumstances",
              "Only if they copy LEGO's exact products, in nearly every real case"
            ],
            correctAnswer: 1,
            explanation: "The playbook, question, test, combine, and act, scales down easily. A teen can observe, interview, and survey to replace guesses with evidence, just as LEGO did."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // LEADERSHIP & MANAGEMENT
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // lm-1: Leadership vs Management
  // ─────────────────────────────────────────────
  {
    lessonId: "lm-1",
    sections: [
      {
        type: "concept",
        title: "Two Different Jobs That Both Matter",
        paragraphs: [
          "Leadership and management sound like the same thing, but they solve different problems. A famous line captures it: managers do things right, while leaders do the right things. Management is about running the system, planning, organizing, budgeting, and controlling so work gets done reliably and on time. Leadership is about setting direction, inspiring people, and driving change toward a vision. A business needs both. Vision without execution is a daydream, and execution without vision is just busy people marching efficiently in the wrong direction. A team can be flawlessly organized and still fail badly if it is organized around the wrong goal, which is precisely why leadership and management must always work hand in hand together.",
          "Think of a group hiking to a mountain peak. The leader points to the summit and convinces everyone the climb is worth it, keeping spirits up when the trail gets steep. The manager makes sure there is enough water, the map is right, the schedule works, and nobody gets lost. If the leader picks a peak nobody wants to climb, morale dies. If the manager forgets supplies, the trip collapses halfway up. Great outcomes usually need both roles working together, not one person shouting orders. That is why the strongest professionals refuse to treat the two as rivals, instead building the discipline to plan and organize carefully while also finding the courage to set a direction worth following and to lift the people around them toward it.",
          "Crucially, leadership is not a job title. You do not need to be the CEO to lead; a new employee who rallies teammates around a better idea is leading, while a senior manager who only pushes paperwork may not be. Titles come with authority, the formal power to direct others, but real influence is earned through trust and example. The best professionals blend both mindsets: they manage the details competently while leading people toward something worth doing."
        ],
        bullets: [
          "Managers do things right; leaders do the right things.",
          "Management runs the system: planning, organizing, budgeting, controlling.",
          "Leadership sets direction, inspires people, and drives change toward a vision.",
          "Vision without execution is a daydream; execution without vision goes nowhere.",
          "Leadership is not a title; influence is earned through trust and example."
        ],
        realWorldExample: "A restaurant owner who dreams up an exciting new concept but never schedules staff or tracks costs will fail, while one who runs a tight kitchen serving food nobody craves will also fail. Success needs the vision of a leader and the discipline of a manager together."
      },
      {
        type: "concept",
        title: "How the Two Roles Show Up Day to Day",
        paragraphs: [
          "The two roles use different tools. A manager relies on authority and process: schedules, checklists, performance metrics, and the power that comes with the position. A leader relies on influence and inspiration: painting a vision, telling a story, modeling behavior, and earning trust so people follow willingly. When a shift runs smoothly because the rota is well-planned, that is management. When a team pushes through a brutal week because they believe in the mission, that is leadership. Both keep the business alive in different weather.",
          "Timing matters. In stable, predictable times, strong management shines, since the goal is consistency, efficiency, and keeping quality high without surprises. In times of change, a new competitor, a crisis, a big pivot, leadership becomes essential, because people need someone to set a new direction and rally them through uncertainty. A company that is all management gets rigid and misses change; a company that is all leadership generates exciting ideas that never actually get executed. Balance is the goal.",
          "The healthiest teams grow people who can flex between both. A shift manager who only enforces rules will struggle when the store faces an unexpected crisis and staff look for reassurance. A charismatic founder who inspires but cannot organize will watch great ideas collapse into chaos. Developing yourself means practicing both muscles: the discipline to make plans and hold standards, and the courage to set direction and lift people up. Neither is superior; a business thrives when both are present and pointed the same way."
        ],
        bullets: [
          "Managers use authority and process; leaders use influence and inspiration.",
          "Smooth operations come from management; pushing through hard times shows leadership.",
          "Stable times reward strong management; change demands strong leadership.",
          "All-management gets rigid; all-leadership never executes its ideas.",
          "The best professionals flex between both roles as the situation demands."
        ],
        realWorldExample: "During a sudden supply shortage, a store's manager efficiently reordered stock and adjusted schedules, while its leader calmed anxious staff and reframed the crisis as a chance to prove the team. Both actions were needed to get through the week intact."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm1-mc1",
            question: "Which best captures the difference between management and leadership?",
            options: [
              "Managers set the vision; leaders handle the budget, according to most business textbooks",
              "Managers do things right; leaders do the right things",
              "They are exactly the same job, as a strict and unbreakable rule",
              "Leadership requires a CEO title, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "Management focuses on running the system correctly, while leadership focuses on choosing the right direction and inspiring people. Both are needed, and neither requires a specific title."
          },
          {
            id: "lm1-mc2",
            question: "Why is 'execution without vision' a problem?",
            options: [
              "It means work is done too slowly",
              "People march efficiently in the wrong direction",
              "It always costs too much money, without any meaningful exceptions",
              "It removes the need for any managers"
            ],
            correctAnswer: 1,
            explanation: "Great execution aimed at the wrong goal wastes effort. Vision gives direction, so leadership and management must work together for effort to actually pay off."
          }
        ]
      },
      {
        type: "scenario",
        title: "Tara Steps Up on a Group Project",
        narrative: "Tara's class team must build a business plan in two weeks. The group is talented but scattered, with no direction and no plan. Tara does not have any official title, but she decides to help the team succeed.",
        details: [
          "She rallies the group around an exciting theme everyone gets excited about (leadership).",
          "She builds a schedule, assigns tasks, and tracks deadlines (management).",
          "When a teammate wants to quit mid-project, she reframes the mission to re-energize them.",
          "She has no formal authority over her classmates, only earned trust and example."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm1-aq1",
          question: "What does Tara's role best demonstrate?",
          options: [
              "That leadership requires an official title to exist, under almost all normal conditions",
              "That one person can blend leadership and management without formal authority",
              "That management alone is enough for any project, based on common workplace assumptions",
              "That vision matters more than execution every time, as many people wrongly believe"
            ],
            correctAnswer: 1,
          explanation: "Tara inspires direction (leadership) and organizes the work (management) with no title at all. Real influence comes from trust and example, not from a position of authority."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Management runs the system; leadership sets direction and inspires people.",
          "Managers do things right; leaders do the right things.",
          "A business needs both: vision plus disciplined execution.",
          "Stable times reward management; change demands leadership.",
          "Leadership is not a title; influence is earned through trust and example."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "lm1-mastery1",
            question: "Which activity is a management task rather than a leadership one?",
            options: [
              "Inspiring the team with a bold vision",
              "Building a schedule and tracking a budget",
              "Rallying staff through a crisis, in the vast majority of situations",
              "Convincing people a goal is worth it"
            ],
            correctAnswer: 1,
            explanation: "Planning, organizing, and budgeting are management tasks about running the system. Inspiring, rallying, and setting direction are leadership behaviors."
          },
          {
            id: "lm1-mastery2",
            question: "A company full of great ideas but poor at execution likely lacks what?",
            options: [
              "Strong leadership",
              "Strong management",
              "Any customers at all",
              "A product to sell"
            ],
            correctAnswer: 1,
            explanation: "Ideas without execution signal weak management. Leadership generates vision, but management turns that vision into organized, completed work."
          },
          {
            id: "lm1-mastery3",
            question: "When does strong leadership matter most?",
            options: [
              "Only when profits are high, regardless of the specific circumstances",
              "During times of change, crisis, or a big pivot",
              "Only in stable, unchanging periods, in nearly every real case",
              "Never, if managers are competent, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "Change demands someone to set a new direction and rally people through uncertainty. Stable times reward management, but upheaval calls for leadership."
          },
          {
            id: "lm1-mastery4",
            question: "What is the difference between authority and influence?",
            options: [
              "Authority is earned; influence comes with a title, as a strict and unbreakable rule",
              "Authority is formal power; influence is earned through trust",
              "They mean exactly the same thing, for essentially all companies today",
              "Influence only exists for CEOs, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "Authority is the formal power a title grants, while influence is earned by building trust and setting an example. The best leaders rely on both."
          },
          {
            id: "lm1-mastery5",
            question: "What happens to a business that is all leadership and no management?",
            options: [
              "It runs with perfect efficiency",
              "Exciting ideas never get executed",
              "It becomes too rigid to change",
              "It never needs any vision"
            ],
            correctAnswer: 1,
            explanation: "Pure leadership generates vision but lacks the discipline to organize and deliver. Without management, promising ideas collapse into chaos before they are executed."
          },
          {
            id: "lm1-mastery6",
            question: "Why can a new employee still be a leader?",
            options: [
              "Because all new employees get authority, under almost all normal conditions",
              "Because leadership is influence, not a title",
              "Because titles do not exist anymore, based on common workplace assumptions",
              "Because managers are always poor leaders, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "Leadership is about inspiring and setting direction, which anyone can do by earning trust. A junior person who rallies teammates around a better idea is leading."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // lm-2: Leadership Styles
  // ─────────────────────────────────────────────
  {
    lessonId: "lm-2",
    sections: [
      {
        type: "concept",
        title: "Four Ways to Lead a Team",
        paragraphs: [
          "There is no single 'right' way to lead; different styles suit different people and moments. The autocratic style means the leader makes decisions alone and expects them followed. It is fast and clear, ideal in a crisis or when the leader truly knows best, but it can crush morale and creativity if overused. Picture an emergency room during a code: nobody wants a democratic vote on who does what. In calmer settings, though, constant top-down orders make talented people feel ignored and slowly drive them away.",
          "The democratic style shares decision-making, inviting input before choosing. It boosts buy-in and surfaces better ideas because people feel ownership over choices they helped make. The tradeoff is speed: gathering opinions takes time, and not every decision deserves a committee. The laissez-faire style ('let it be' in French) means hands-off leadership, giving people freedom to work as they see fit. With skilled, self-motivated experts, this unlocks creativity, but with an inexperienced or unmotivated team, hands-off can quickly slide into leaderless drift and missed deadlines.",
          "The transformational style aims higher: the leader inspires people toward a bigger vision, growing them into more than they thought possible. Transformational leaders paint a compelling future, model the values they preach, and challenge people to stretch. This style can spark extraordinary loyalty and performance, but it demands genuine charisma and follow-through, since an inspiring speech backed by no real action breeds cynicism fast. Most effective leaders do not pick one style forever; they read the situation and shift, firm in a crisis, collaborative in planning, hands-off with experts. The most respected leaders rarely cling to a single favorite approach; instead they read each situation carefully and deliberately choose the style that best fits the task, the team, and the moment."
        ],
        bullets: [
          "Autocratic: leader decides alone; fast and clear but can crush morale.",
          "Democratic: shares decisions; boosts buy-in but takes more time.",
          "Laissez-faire: hands-off; frees experts but risks drift with weak teams.",
          "Transformational: inspires toward a big vision and grows people.",
          "Effective leaders shift styles to fit the situation and the team."
        ],
        realWorldExample: "A film director might be autocratic on set where split-second calls matter, democratic in the writers' room where ideas need debate, and laissez-faire with a trusted composer left alone to create. The same person uses different styles for different moments. The lesson is that no single style is a badge of honor to wear at all times; the leaders who earn lasting respect are the ones flexible enough to read a situation clearly and then reach for whichever approach the moment genuinely calls for."
      },
      {
        type: "concept",
        title: "Matching Style to Situation and People",
        paragraphs: [
          "The best style depends on three things: the task, the team, and the moment. Urgent, high-stakes tasks with a clear right answer favor autocratic speed. Complex problems needing creativity and commitment favor democratic input. Skilled, self-directed experts thrive under laissez-faire freedom, while a team that needs vision and energy responds to transformational leadership. A wise leader diagnoses the situation first, then chooses, rather than defaulting to whichever style feels most natural to their own personality.",
          "Reading the team is just as important as reading the task. New or unsure employees usually need more direction and structure, so heavy laissez-faire would leave them lost and anxious. Experienced, confident employees often resent being micromanaged and do their best work with autonomy. The same style that empowers one person suffocates another. Great leaders adjust their approach per person and per stage, offering guidance where it is needed and stepping back where it is not, which is far harder than applying one rule to everyone.",
          "Overusing any single style backfires. Always autocratic, and people stop thinking and quietly resent you. Always democratic, and decisions crawl while the team waits for endless consensus. Always laissez-faire, and weak performers coast with no accountability. Always transformational, and the daily grind of execution gets neglected for grand speeches. The mature move is to hold several styles in your toolkit and switch deliberately. Leadership is less about having one signature style and more about the judgment to apply the right one at the right time. Building that range takes practice, but it is what separates a leader who works well in only one setting from one who can guide almost any team through almost any situation."
        ],
        bullets: [
          "Match style to the task, the team, and the moment.",
          "Urgent, clear tasks favor autocratic; creative problems favor democratic.",
          "New employees need direction; experienced ones thrive with autonomy.",
          "The same style can empower one person and suffocate another.",
          "Overusing any single style backfires; keep several in your toolkit."
        ],
        realWorldExample: "A coach was purely autocratic, barking orders at every player. Veterans tuned out and rookies froze. When she started giving trusted veterans freedom while guiding rookies closely, the whole team improved, proof that matching style to each person beats one rigid approach."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm2-mc1",
            question: "Which leadership style involves the leader making decisions alone and expecting them followed?",
            options: [
              "Democratic, in the vast majority of situations",
              "Autocratic",
              "Laissez-faire",
              "Transformational"
            ],
            correctAnswer: 1,
            explanation: "Autocratic leaders decide alone and expect compliance. It is fast and clear, useful in crises, but overuse can crush morale and creativity."
          },
          {
            id: "lm2-mc2",
            question: "What is the main tradeoff of the democratic style?",
            options: [
              "It removes all buy-in from the team",
              "It boosts buy-in but takes more time",
              "It only works in emergencies, regardless of the specific circumstances",
              "It ignores everyone's opinions, in nearly every real case"
            ],
            correctAnswer: 1,
            explanation: "Sharing decisions builds ownership and surfaces better ideas, but gathering input is slower. Not every decision deserves a committee, so timing matters."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Leads Different Teams",
        narrative: "Marcus manages a mixed team at a design agency. He notices that using one leadership style for everyone is causing problems, so he starts adjusting his approach to fit each situation and person.",
        details: [
          "During a sudden client emergency, he makes fast calls himself (autocratic).",
          "For a big creative campaign, he gathers the whole team's ideas first (democratic).",
          "With his most experienced designer, he steps back and grants full freedom (laissez-faire).",
          "For a struggling new hire, he provides close guidance rather than hands-off freedom."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm2-aq1",
          question: "Why does Marcus give the new hire close guidance but the veteran full freedom?",
          options: [
              "Because new hires always perform better than veterans, according to most business textbooks",
              "Because style should match each person's experience and needs",
              "Because laissez-faire works best for everyone, as a strict and unbreakable rule",
              "Because autocratic leadership fits all situations, for essentially all companies today"
            ],
            correctAnswer: 1,
          explanation: "The same style empowers one person and suffocates another. New employees need direction and structure, while experienced ones do their best work with autonomy."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Autocratic decides alone; democratic shares; laissez-faire is hands-off.",
          "Transformational inspires people toward a bigger vision and growth.",
          "Match style to the task, the team, and the moment.",
          "New employees need direction; experienced ones thrive with autonomy.",
          "Overusing any one style backfires; keep several in your toolkit."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "lm2-mastery1",
            question: "Which style best fits a genuine crisis needing fast, clear decisions?",
            options: [
              "Laissez-faire",
              "Autocratic",
              "Democratic",
              "Purely hands-off"
            ],
            correctAnswer: 1,
            explanation: "Autocratic leadership is fast and clear, ideal in emergencies where a quick decision matters more than group input. A crisis is no time for a vote."
          },
          {
            id: "lm2-mastery2",
            question: "What does the laissez-faire style risk with an inexperienced team?",
            options: [
              "Too much micromanaging, without any meaningful exceptions",
              "Leaderless drift and missed deadlines",
              "Excessive group voting, under almost all normal conditions",
              "An overload of vision, based on common workplace assumptions"
            ],
            correctAnswer: 1,
            explanation: "Hands-off leadership frees skilled experts but leaves an unsure team without direction, sliding into drift, confusion, and missed deadlines."
          },
          {
            id: "lm2-mastery3",
            question: "What defines transformational leadership?",
            options: [
              "Making every decision alone, as many people wrongly believe",
              "Inspiring people toward a bigger vision and growth",
              "Leaving the team completely alone, in the vast majority of situations",
              "Avoiding any real change, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "Transformational leaders paint a compelling future, model values, and challenge people to stretch, sparking loyalty and growth, provided they follow through with action."
          },
          {
            id: "lm2-mastery4",
            question: "Why should a leader adjust style per person?",
            options: [
              "Because rules should never apply to anyone, in nearly every real case",
              "Because the same style can empower one and suffocate another",
              "Because experience never matters, according to most business textbooks, as a strict and unbreakable rule",
              "Because autocratic always works best, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "People differ: new employees need structure while experts want autonomy. Adjusting per person offers guidance where needed and freedom where it helps."
          },
          {
            id: "lm2-mastery5",
            question: "What happens if a leader is always democratic?",
            options: [
              "Decisions crawl while awaiting consensus",
              "The team gets no say at all",
              "Morale collapses instantly, without any meaningful exceptions",
              "Experts always feel micromanaged, under almost all normal conditions"
            ],
            correctAnswer: 0,
            explanation: "Constant democracy slows everything down, since every choice waits for input. Some decisions need speed, so overusing this style stalls the team."
          },
          {
            id: "lm2-mastery6",
            question: "What is the mark of a mature leader regarding style?",
            options: [
              "Sticking to one signature style forever, based on common workplace assumptions",
              "Switching styles deliberately to fit the situation",
              "Always avoiding autocratic choices, as many people wrongly believe",
              "Only using transformational speeches, in the vast majority of situations"
            ],
            correctAnswer: 1,
            explanation: "Leadership is judgment: reading the task, team, and moment, then choosing the right style. Holding several styles in your toolkit beats one rigid approach."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // lm-3: Motivation Theories
  // ─────────────────────────────────────────────
  {
    lessonId: "lm-3",
    sections: [
      {
        type: "concept",
        title: "Maslow's Hierarchy: People Have Layered Needs",
        paragraphs: [
          "Why do people work hard, or stop trying? Psychologist Abraham Maslow argued that human needs stack in a pyramid, and we chase higher needs only once lower ones are met. At the base are physiological needs (food, rest), then safety (security, stability), then belonging (friendship, acceptance), then esteem (respect, recognition), and finally self-actualization (growing into your fullest potential). A starving person is not worried about career fulfillment; survival comes first. The theory explains why motivation shifts as circumstances change. For a manager, the practical value of the pyramid is the reminder that people are never motivated by only one thing at a time, and that a need left unmet lower down will quietly sabotage any attempt to inspire someone higher up.",
          "For a business, the pyramid is a practical map. Physiological and safety needs translate to fair pay, reasonable hours, and job security, the foundation without which nothing else matters. Belonging shows up as a friendly team and inclusion. Esteem appears as recognition, praise, and meaningful titles. Self-actualization is challenging work that lets people grow and do their best. An employee scared of being fired (unmet safety) will not be inspired by a lofty mission statement; you must satisfy the lower rung before the higher ones can motivate.",
          "The insight for managers is sequence. Throwing an inspiring vision at someone worried about rent is like offering dessert to a starving person. You meet needs from the bottom up. Once pay and security feel solid, belonging and recognition become powerful motivators, and eventually growth and purpose drive the highest performance. Maslow is a simplification, real people are messier and needs overlap, but as a lens it reminds leaders that people are not motivated by one thing, and that ignoring basic needs undermines everything above them. A leader who forgets this and preaches purpose to people worried about rent will simply be ignored, because no inspiring vision can compete with an unmet need sitting lower on the pyramid."
        ],
        bullets: [
          "Maslow stacks needs: physiological, safety, belonging, esteem, self-actualization.",
          "People chase higher needs only once lower ones are reasonably met.",
          "At work: fair pay and security form the base; recognition and growth sit higher.",
          "A vision cannot inspire someone worried about basic security or pay.",
          "Meet needs bottom-up; ignoring the base undermines everything above."
        ],
        realWorldExample: "A startup offered ping-pong tables and grand mission talks but paid late and gave no job security. Staff quit anyway. Once it fixed reliable pay and stability (safety needs), the perks and mission finally started to motivate, proving the base must come first."
      },
      {
        type: "concept",
        title: "Herzberg: Two Different Kinds of Job Factors",
        paragraphs: [
          "Frederick Herzberg studied what makes people satisfied or dissatisfied at work and found something surprising: the two are driven by different factors, not opposite ends of one scale. He split them into hygiene factors and motivators. Hygiene factors include pay, working conditions, company policies, and job security. When they are bad, people are miserable, but fixing them only removes dissatisfaction; it does not create real motivation. Good hygiene gets you to neutral, a workplace nobody hates, but not one anyone loves.",
          "Motivators are different: achievement, recognition, the work itself, responsibility, and growth. These are what actually drive people to excel. Herzberg's key insight is that money is mostly a hygiene factor. A raise stops someone from feeling underpaid, but the boost fades fast and rarely creates lasting drive. Meanwhile, being trusted with a meaningful project or publicly recognized for great work can energize someone for months. Managers who only pull the pay lever miss the deeper sources of motivation that cost little but matter enormously.",
          "The practical lesson combines both theories neatly. First, get the hygiene factors right, fair pay, decent conditions, sensible policies, so people are not dissatisfied. This mirrors Maslow's lower rungs. Then layer on motivators, giving people responsibility, recognition, and interesting challenges, to unlock genuine engagement, echoing Maslow's higher rungs. A leader who understands this stops assuming money fixes everything and instead designs work that people find meaningful, while still ensuring the basics never fall apart underneath them."
        ],
        bullets: [
          "Herzberg splits work factors into hygiene factors and motivators.",
          "Hygiene (pay, conditions, policies) removes dissatisfaction but does not inspire.",
          "Motivators (achievement, recognition, growth) create real drive to excel.",
          "Money is mostly a hygiene factor; its boost fades fast.",
          "Fix hygiene first, then layer motivators to unlock genuine engagement."
        ],
        realWorldExample: "A manager gave a struggling employee a small raise, which helped for a month, then motivation slumped again. When she instead handed him a project he owned end to end plus public credit for it, his energy soared, showing motivators outlast a pay bump."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm3-mc1",
            question: "According to Maslow, which need must generally be met before higher ones can motivate?",
            options: [
              "Self-actualization, regardless of the specific circumstances",
              "Basic safety and physiological needs",
              "Esteem and recognition, in nearly every real case",
              "A sense of belonging, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "Maslow's pyramid is met bottom-up. Basic physiological and safety needs, like pay and security, must be reasonably satisfied before higher needs can motivate."
          },
          {
            id: "lm3-mc2",
            question: "In Herzberg's theory, what does fixing 'hygiene factors' accomplish?",
            options: [
              "It creates strong, lasting motivation, as a strict and unbreakable rule",
              "It removes dissatisfaction but does not truly inspire",
              "It replaces the need for any recognition, for essentially all companies today",
              "It guarantees top performance, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "Good hygiene factors (pay, conditions, policies) get people to neutral by removing dissatisfaction, but real motivation comes from motivators like achievement and recognition."
          }
        ]
      },
      {
        type: "scenario",
        title: "Elena Rebuilds a Burned-Out Team",
        narrative: "Elena inherits a team with high turnover. Pay is fine, but people seem drained and disengaged. She uses Maslow and Herzberg to diagnose what is really going on before making changes.",
        details: [
          "Pay and hours are acceptable, so basic hygiene and safety needs are mostly met.",
          "Employees feel invisible, never recognized for good work (a missing motivator).",
          "Tasks are repetitive with no responsibility or room to grow.",
          "Elena adds recognition, ownership of projects, and stretch challenges."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm3-aq1",
          question: "Why does Elena focus on recognition and responsibility rather than another raise?",
          options: [
              "Because pay is already a strong long-term motivator, under almost all normal conditions",
              "Because motivators, not more pay, drive lasting engagement once hygiene is met",
              "Because recognition costs the company nothing to ignore, based on common workplace assumptions",
              "Because Maslow says money is the highest need, as many people wrongly believe"
            ],
            correctAnswer: 1,
          explanation: "Pay was already adequate (hygiene met), so more money would fade fast. Herzberg's motivators, recognition, responsibility, and growth, are what actually create lasting engagement."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Maslow stacks needs from physiological up to self-actualization.",
          "Lower needs must be met before higher ones can motivate.",
          "Herzberg splits factors into hygiene (remove dissatisfaction) and motivators (inspire).",
          "Money is mostly hygiene; its motivating boost fades quickly.",
          "Fix the basics first, then add recognition, responsibility, and growth."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "lm3-mastery1",
            question: "What sits at the very top of Maslow's hierarchy?",
            options: [
              "Safety needs",
              "Self-actualization",
              "Physiological needs",
              "Belonging"
            ],
            correctAnswer: 1,
            explanation: "Self-actualization, growing into your fullest potential, sits at the top. It becomes a driver only once lower needs like safety and belonging are met."
          },
          {
            id: "lm3-mastery2",
            question: "Why won't a lofty mission inspire an employee afraid of being fired?",
            options: [
              "Because missions never motivate anyone, in the vast majority of situations",
              "Because an unmet safety need blocks higher motivation",
              "Because esteem is the lowest need, regardless of the specific circumstances",
              "Because fear is a motivator by itself, in nearly every real case"
            ],
            correctAnswer: 1,
            explanation: "Maslow's base must be satisfied first. An unmet safety need (fear of firing) blocks higher needs, so vision cannot inspire until security feels solid."
          },
          {
            id: "lm3-mastery3",
            question: "Which is an example of a Herzberg motivator?",
            options: [
              "The company's vacation policy, according to most business textbooks",
              "Recognition for great work",
              "The office parking situation",
              "The base salary amount"
            ],
            correctAnswer: 1,
            explanation: "Recognition, achievement, responsibility, and growth are motivators that drive people to excel. Policies, parking, and salary are hygiene factors that only prevent dissatisfaction."
          },
          {
            id: "lm3-mastery4",
            question: "Why does Herzberg call money mostly a 'hygiene factor'?",
            options: [
              "Because money is never important, as a strict and unbreakable rule",
              "Because a raise removes dissatisfaction but its boost fades fast",
              "Because pay is the top motivator forever, for essentially all companies today",
              "Because money causes dissatisfaction, without any meaningful exceptions, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "A raise stops someone feeling underpaid, but the effect is short-lived and rarely creates lasting drive. Deeper motivation comes from motivators, not pay."
          },
          {
            id: "lm3-mastery5",
            question: "What is the practical sequence combining both theories?",
            options: [
              "Add motivators first, ignore hygiene, based on common workplace assumptions",
              "Fix hygiene factors first, then layer on motivators",
              "Only ever use pay to motivate, as many people wrongly believe",
              "Skip basics and inspire with vision alone, in the vast majority of situations"
            ],
            correctAnswer: 1,
            explanation: "Get the basics right so people are not dissatisfied (like Maslow's lower rungs), then add responsibility, recognition, and challenge to unlock real engagement."
          },
          {
            id: "lm3-mastery6",
            question: "What common mistake do these theories warn managers against?",
            options: [
              "Recognizing employees too often, regardless of the specific circumstances",
              "Assuming money alone fixes motivation",
              "Giving employees any responsibility, in nearly every real case",
              "Meeting basic needs at all"
            ],
            correctAnswer: 1,
            explanation: "Both theories show that pay only removes dissatisfaction. Managers who pull only the money lever miss cheaper, deeper motivators like recognition and growth."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // lm-4: Organizational Structures
  // ─────────────────────────────────────────────
  {
    lessonId: "lm-4",
    sections: [
      {
        type: "concept",
        title: "Flat vs Hierarchical: How Deep Is the Ladder?",
        paragraphs: [
          "An organizational structure is simply how a company arranges people and decides who reports to whom. The first big choice is how many layers to have. A hierarchical (tall) structure has many levels, employees, supervisors, managers, directors, executives, so a message travels up a long chain. A flat structure has few levels, putting workers close to the top. Neither is automatically better; each trades off speed, control, and clarity in different ways that fit different sizes and types of company. The right answer depends heavily on how large the organization is and what it is trying to achieve, which is why a structure that serves a scrappy startup beautifully can become a serious liability once that same company grows into a sprawling enterprise.",
          "Hierarchical structures offer clear authority and defined career ladders. Everyone knows their boss, roles are well-defined, and control is tight, which helps large organizations stay coordinated. The downside is speed: decisions crawl up and down many layers, and frontline workers can feel distant from leadership. Flat structures flip this. With few layers, decisions move fast, communication is direct, and employees often feel more ownership. But as a flat company grows, too few managers can mean chaos, unclear responsibility, and overworked leaders juggling too many direct reports.",
          "A key concept here is 'span of control': how many people one manager oversees. A narrow span (few reports each) creates a taller hierarchy with close supervision. A wide span (many reports each) creates a flatter structure with more autonomy. Startups often begin flat because they are small and need speed. As they grow to hundreds of employees, some hierarchy usually becomes necessary just to stay organized. The art is adding just enough structure to coordinate without smothering the speed and energy that made the company work. Getting that balance right is one of the hardest ongoing jobs a growing company faces, since the structure that fit perfectly at ten people can quietly break once there are several hundred."
        ],
        bullets: [
          "Structure defines how people are arranged and who reports to whom.",
          "Hierarchical (tall) has many layers; flat has few, closer to the top.",
          "Hierarchy gives clear authority and career ladders but slows decisions.",
          "Flat speeds decisions and ownership but risks chaos as it grows.",
          "Span of control is how many reports one manager oversees."
        ],
        realWorldExample: "A 10-person startup ran flat, everyone talking directly to the founder, and moved fast. By 300 employees, that flatness caused confusion over who decided what, so it added managers. The structure that fit at 10 people broke at 300, forcing a redesign."
      },
      {
        type: "concept",
        title: "Functional vs Divisional: How to Group People",
        paragraphs: [
          "Beyond how many layers, companies choose how to group people. A functional structure organizes by specialty: all marketers in a marketing department, all engineers in engineering, all accountants in finance. This builds deep expertise and efficiency, since specialists work together and share knowledge. The weakness is silos, departments can become isolated, focused on their own goals rather than the customer, and coordinating across functions for a single product can get slow and turf-conscious when priorities collide.",
          "A divisional structure organizes by product, region, or customer type instead. A company might have a North America division and an Asia division, or a phones division and a laptops division, each containing its own marketing, engineering, and finance. This makes each division nimble and accountable for its own results, and closer to its specific market. The tradeoff is duplication: five divisions may each have their own marketing team, costing more than one shared department, and expertise can get scattered rather than concentrated.",
          "Most large companies blend approaches, and some use a matrix structure where employees report to two bosses at once, say a functional manager and a project manager. Matrix setups aim to capture both deep expertise and project focus, but they can create confusion and competing demands if the two bosses disagree. The takeaway is that structure is a set of tradeoffs, not a perfect answer. Leaders choose the arrangement that best fits their size, strategy, and market, and they redesign it as the company and its goals evolve."
        ],
        bullets: [
          "Functional structure groups by specialty: marketing, engineering, finance.",
          "It builds deep expertise but risks silos and slow cross-team work.",
          "Divisional structure groups by product, region, or customer type.",
          "Divisions are nimble and accountable but duplicate roles and cost more.",
          "Matrix structures report to two bosses, blending expertise and focus."
        ],
        realWorldExample: "A global firm with phones, tablets, and laptops divisions let each move fast for its own market, but ended up with three separate marketing teams doing similar work. It weighed that extra cost against the speed and focus each independent division gained."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm4-mc1",
            question: "What does 'span of control' refer to?",
            options: [
              "The company's total yearly revenue, according to most business textbooks",
              "How many people one manager oversees",
              "The number of products a company sells",
              "How tall the office building is"
            ],
            correctAnswer: 1,
            explanation: "Span of control is the number of direct reports a manager has. A narrow span creates a taller hierarchy; a wide span creates a flatter structure."
          },
          {
            id: "lm4-mc2",
            question: "What is a main weakness of a functional structure?",
            options: [
              "It builds no expertise at all",
              "Departments can become isolated silos",
              "It only works for tiny startups",
              "It duplicates every role across divisions"
            ],
            correctAnswer: 1,
            explanation: "Grouping by specialty builds deep expertise but risks silos, where departments focus on their own goals and coordinating across them for one product gets slow."
          }
        ]
      },
      {
        type: "scenario",
        title: "BrightBox Outgrows Its Structure",
        narrative: "BrightBox started as a flat, 12-person company where everyone reported to the two founders. Now at 250 employees across two countries and three product lines, the old structure is causing confusion, and leaders must redesign it.",
        details: [
          "The flat structure worked at 12 people but now leaves unclear who decides what.",
          "A functional setup would group all engineers, marketers, and finance staff together.",
          "A divisional setup would give each of the three product lines its own teams.",
          "Divisions add speed and accountability but duplicate some roles and costs."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm4-aq1",
          question: "Why can't BrightBox simply stay flat as it did at 12 people?",
          options: [
              "Flat structures are illegal past 100 employees, as a strict and unbreakable rule",
              "Too few layers at scale causes unclear responsibility and overworked leaders",
              "Flat structures always cost more than tall ones, for essentially all companies today",
              "Hierarchy makes decisions faster than flatness, without any meaningful exceptions, under almost all normal conditions"
            ],
            correctAnswer: 1,
          explanation: "Flatness gives speed when small, but at 250 people too few managers means confusion over responsibility and overloaded leaders. Growth usually requires adding some structure."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Structure defines how people are arranged and who reports to whom.",
          "Tall hierarchies give clear control but slow decisions; flat structures do the reverse.",
          "Span of control is how many reports each manager oversees.",
          "Functional groups by specialty (expertise, but silos); divisional groups by product or region.",
          "Structure is a set of tradeoffs; leaders redesign it as the company evolves."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "lm4-mastery1",
            question: "What is a key advantage of a hierarchical (tall) structure?",
            options: [
              "The fastest possible decisions, based on common workplace assumptions",
              "Clear authority and defined career ladders",
              "No managers needed at all, as many people wrongly believe",
              "Zero duplication of any roles, in the vast majority of situations"
            ],
            correctAnswer: 1,
            explanation: "Tall hierarchies give clear lines of authority and defined career paths, helping large firms stay coordinated, though decisions move more slowly through many layers."
          },
          {
            id: "lm4-mastery2",
            question: "A wide span of control tends to create what kind of structure?",
            options: [
              "A taller hierarchy",
              "A flatter structure",
              "A functional silo",
              "A matrix with two bosses"
            ],
            correctAnswer: 1,
            explanation: "When each manager oversees many people (wide span), fewer layers are needed, producing a flatter structure with more autonomy and less close supervision."
          },
          {
            id: "lm4-mastery3",
            question: "How does a divisional structure group people?",
            options: [
              "Purely by job specialty, regardless of the specific circumstances",
              "By product, region, or customer type",
              "By height of the manager, in nearly every real case",
              "By years of employment only, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "Divisional structures group people around products, regions, or customer types, each division holding its own functions, which adds nimbleness but duplicates some roles."
          },
          {
            id: "lm4-mastery4",
            question: "What is the main tradeoff of a divisional structure?",
            options: [
              "It builds no accountability, as a strict and unbreakable rule",
              "It duplicates roles and scatters expertise",
              "It makes each division far too slow",
              "It removes all market focus, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "Divisions gain speed and accountability but each may run its own marketing or finance team, duplicating roles and spreading expertise thinner than a functional setup."
          },
          {
            id: "lm4-mastery5",
            question: "What defines a matrix structure?",
            options: [
              "Employees report to two bosses at once",
              "There are no managers whatsoever, without any meaningful exceptions",
              "Everyone works completely alone, under almost all normal conditions",
              "Only one product is ever made, based on common workplace assumptions"
            ],
            correctAnswer: 0,
            explanation: "In a matrix, an employee reports to two managers, such as a functional lead and a project lead, blending expertise with focus but risking conflicting demands."
          },
          {
            id: "lm4-mastery6",
            question: "Why do many startups begin flat but add hierarchy as they grow?",
            options: [
              "Because flat structures are illegal for big firms",
              "Because scale needs more structure to stay coordinated",
              "Because hierarchy is always cheaper, as many people wrongly believe",
              "Because flat structures never allow any speed, in the vast majority of situations"
            ],
            correctAnswer: 1,
            explanation: "Flatness gives speed when small, but as headcount grows, some hierarchy becomes necessary to keep responsibilities clear and the organization coordinated."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // lm-5: Human Resources Basics
  // ─────────────────────────────────────────────
  {
    lessonId: "lm-5",
    sections: [
      {
        type: "concept",
        title: "Finding and Onboarding the Right People",
        paragraphs: [
          "Human Resources, or HR, is the work of finding, developing, and keeping the people a business runs on. It starts with hiring, which is far more than posting a job. First comes recruitment: writing a clear job description, spreading the word, and attracting a pool of candidates. Then comes selection: screening resumes, interviewing, and sometimes testing skills to find the best fit. A bad hire is expensive, since replacing an employee can cost thousands in lost time and retraining, so getting this right protects the whole business. Because a single poor hire can drain thousands of dollars and months of momentum, the care taken during recruitment and selection is never wasted effort; it is one of the highest-leverage investments a growing business can possibly make in its own future.",
          "Good hiring balances two things: skills and fit. Skills are whether the person can do the job; fit is whether they will thrive with the team and culture. A brilliant coder who clashes constantly with everyone may cost more than they add. Structured interviews, asking every candidate the same core questions, reduce bias and make comparisons fair. Checking references and giving realistic previews of the role also matter, because a candidate who understands the real job is far less likely to quit disappointed a month later.",
          "Once hired, onboarding sets the tone. Onboarding is the process of welcoming and training a new employee so they become productive and feel they belong. A strong first few weeks, clear expectations, proper training, a friendly welcome, dramatically improves whether someone stays. Studies show employees who have a good onboarding experience are far more likely to remain long-term. Skipping it, tossing a newcomer in with no guidance, wastes the money spent hiring them and often leads to early, avoidable turnover that starts the costly cycle all over again. Because replacing a departed employee can cost thousands in lost time and retraining, thoughtful onboarding is not a nice-to-have but a genuine investment that quietly protects the whole business."
        ],
        bullets: [
          "HR finds, develops, and keeps the people a business relies on.",
          "Hiring has two stages: recruitment (attract) and selection (choose).",
          "Good hiring balances skills (can they do it) with fit (will they thrive).",
          "Structured interviews with the same questions reduce bias and unfairness.",
          "Strong onboarding boosts retention; skipping it wastes the hiring cost."
        ],
        realWorldExample: "A cafe hired a skilled barista but gave zero onboarding, no training on their systems or culture. Confused and unwelcomed, she quit in two weeks, forcing a costly rehire. A rival cafe's two-week onboarding kept new staff for years, saving far more than it spent."
      },
      {
        type: "concept",
        title: "Growing and Keeping Great Employees",
        paragraphs: [
          "Hiring is only the start; developing people keeps them valuable and engaged. Training builds current skills, while development prepares people for bigger future roles. Investing here pays off twice: employees perform better now and are more likely to stay because they see a future with you. A company that never trains its staff slowly falls behind as skills go stale, and its best people leave for employers who will invest in their growth. Learning is one of the strongest reasons talented people stay.",
          "Performance reviews are how managers give structured feedback on how someone is doing. Done well, a review is a two-way conversation: clear feedback on strengths and gaps, specific goals, and support to improve, not a once-a-year ambush of criticism. The best managers give feedback continuously so reviews hold no nasty surprises. Fair, specific feedback helps people grow; vague or purely negative feedback demoralizes them. Tying reviews to concrete goals and development plans turns them from a dreaded ritual into a genuine tool for improvement.",
          "Finally, retention, keeping good employees, is cheaper than constantly replacing them. High turnover drains money and knowledge, since every departure takes experience out the door. People stay when they feel fairly paid, respected, able to grow, and connected to their team, echoing the motivation theories. Losing a top performer to a rival often traces back to a fixable cause: no recognition, no growth, or a bad manager. Smart HR treats retention as an ongoing priority, not something to panic about only after the resignation letter arrives."
        ],
        bullets: [
          "Training builds current skills; development prepares people for future roles.",
          "Investing in growth improves performance and boosts retention.",
          "Performance reviews should be two-way, specific, and tied to goals.",
          "Continuous feedback means reviews hold no nasty surprises.",
          "Retention is cheaper than turnover; people stay when valued and growing."
        ],
        realWorldExample: "A firm lost three top engineers in one year, each citing 'no room to grow.' Exit interviews revealed a fixable pattern. After adding clear promotion paths and training budgets, turnover dropped sharply, saving far more than the modest cost of the new programs."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm5-mc1",
            question: "What is the difference between recruitment and selection?",
            options: [
              "Recruitment attracts candidates; selection chooses the best fit",
              "They are exactly the same step, regardless of the specific circumstances",
              "Selection attracts candidates; recruitment fires them, in nearly every real case",
              "Recruitment only applies to managers, according to most business textbooks"
            ],
            correctAnswer: 0,
            explanation: "Recruitment attracts a pool of candidates through job postings and outreach, while selection screens, interviews, and chooses the best fit from that pool."
          },
          {
            id: "lm5-mc2",
            question: "Why does strong onboarding matter?",
            options: [
              "It replaces the need to ever pay employees, as a strict and unbreakable rule",
              "It boosts retention and helps new hires become productive",
              "It only matters for executives, for essentially all companies today",
              "It lets companies skip all training, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "Good onboarding welcomes and trains new hires so they feel they belong and become productive. It significantly improves whether people stay long-term."
          }
        ]
      },
      {
        type: "scenario",
        title: "Priya Fixes a Turnover Problem",
        narrative: "Priya manages a growing team but keeps losing new hires within months. She reviews her HR practices and finds several gaps in how she hires, onboards, and develops people.",
        details: [
          "She picks candidates for skills alone, ignoring whether they fit the team.",
          "New hires get no onboarding and are left to figure things out alone.",
          "Performance feedback happens only once a year, full of surprises.",
          "There is no training budget, so ambitious employees leave to grow elsewhere."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm5-aq1",
          question: "Which change would most directly reduce Priya's early turnover?",
          options: [
              "Interview even faster to hire more people, under almost all normal conditions",
              "Add a real onboarding process for new hires",
              "Cut feedback to once every two years, based on common workplace assumptions",
              "Hire only for skills and never consider fit"
            ],
            correctAnswer: 1,
          explanation: "New hires quit early partly because they get no onboarding and feel lost. A real onboarding process helps them become productive and feel they belong, improving retention."
        }
      },
      {
        type: "recap",
        takeaways: [
          "HR finds, develops, and keeps the people a business depends on.",
          "Hiring means recruitment (attract) then selection (choose), balancing skills and fit.",
          "Strong onboarding helps new hires stay and become productive fast.",
          "Training and development improve performance and boost retention.",
          "Retention is cheaper than turnover; people stay when valued and growing."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "lm5-mastery1",
            question: "Why should hiring balance skills with 'fit'?",
            options: [
              "Because fit is the only thing that matters, as many people wrongly believe",
              "Because a skilled person who clashes can cost more than they add",
              "Because skills never matter at all, in the vast majority of situations",
              "Because fit means being the cheapest hire, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "Skills show someone can do the job, but poor fit with the team or culture can create friction that outweighs their talent. Good hiring weighs both."
          },
          {
            id: "lm5-mastery2",
            question: "How do structured interviews help hiring?",
            options: [
              "They let interviewers skip all preparation, in nearly every real case",
              "Asking every candidate the same questions reduces bias",
              "They guarantee a perfect hire every time, according to most business textbooks",
              "They remove the need to check references, as a strict and unbreakable rule"
            ],
            correctAnswer: 1,
            explanation: "Using the same core questions for each candidate makes comparisons fair and reduces bias, helping managers judge people on consistent grounds."
          },
          {
            id: "lm5-mastery3",
            question: "What distinguishes training from development?",
            options: [
              "Training builds current skills; development prepares for future roles",
              "They are identical activities, for essentially all companies today",
              "Development is only for new hires, without any meaningful exceptions",
              "Training is illegal for managers, under almost all normal conditions"
            ],
            correctAnswer: 0,
            explanation: "Training sharpens the skills someone needs now, while development prepares them for bigger future roles. Both improve performance and encourage people to stay."
          },
          {
            id: "lm5-mastery4",
            question: "What makes a performance review effective?",
            options: [
              "Surprising the employee with a year of criticism",
              "Two-way, specific feedback tied to clear goals",
              "Keeping all feedback vague and general, based on common workplace assumptions",
              "Only listing what the employee did wrong"
            ],
            correctAnswer: 1,
            explanation: "Good reviews are conversations with specific feedback and clear goals, ideally with no surprises because feedback is continuous. Vague or purely negative reviews demoralize people."
          },
          {
            id: "lm5-mastery5",
            question: "Why is retention usually cheaper than high turnover?",
            options: [
              "Because employees never need any pay, as many people wrongly believe",
              "Because each departure drains money and lost knowledge",
              "Because new hires are always free to train",
              "Because turnover improves team performance, in the vast majority of situations"
            ],
            correctAnswer: 1,
            explanation: "Every resignation takes experience out the door and costs money to replace. Keeping valued, growing employees avoids the repeated expense of rehiring and retraining."
          },
          {
            id: "lm5-mastery6",
            question: "A top performer quits citing 'no room to grow.' What does this suggest?",
            options: [
              "The cause was random and unfixable, regardless of the specific circumstances",
              "A fixable gap in development and growth opportunities",
              "The employee simply disliked being paid, in nearly every real case",
              "Retention is impossible to influence, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "Losing talent to 'no growth' points to a fixable cause. Adding promotion paths and training often reduces turnover for far less than the cost of constant rehiring."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // lm-6: Conflict Resolution & Communication
  // ─────────────────────────────────────────────
  {
    lessonId: "lm-6",
    sections: [
      {
        type: "concept",
        title: "Conflict Is Normal; Handling It Is a Skill",
        paragraphs: [
          "Conflict at work is inevitable whenever people with different ideas, goals, and personalities work together. The goal is not to eliminate conflict, which is impossible, but to handle it well. In fact, healthy conflict can be useful: debating ideas openly leads to better decisions than fake agreement where everyone silently nods and problems fester. The danger is unhealthy conflict, when disagreements turn personal, festering resentment poisons the team, and people stop cooperating. A good leader channels conflict toward ideas and away from attacks on people. The goal is never to force everyone into bland agreement, but to keep disagreements pointed squarely at ideas rather than personalities, so that the friction produces better decisions instead of the quiet resentment that slowly erodes a team from the inside.",
          "There are common approaches to handling conflict, and each fits different situations. Avoiding sidesteps the issue, sometimes fine for trivial matters but disastrous for important ones that then explode later. Competing means pushing hard for your own way, useful in emergencies but damaging to relationships if overused. Accommodating means giving in to keep peace, kind but risky if you always sacrifice your needs. Compromising splits the difference so both sides get something. Collaborating works hardest to find a solution that truly satisfies everyone, ideal but time-consuming.",
          "The healthiest default is usually collaboration or a fair compromise, because they preserve both the relationship and the outcome. But a wise person reads the situation: you avoid a tiny issue, compete in a genuine emergency, and collaborate on the ones that really matter. The worst move is letting important conflicts fester in silence, where they grow into resentment and quiet quitting. Naming a problem calmly and early, before emotions boil over, is far easier than untangling a mess that has been ignored for months. Leaders who address friction early and calmly, while emotions are still cool, almost always find the problem far smaller and easier to solve than it becomes after weeks of silent resentment."
        ],
        bullets: [
          "Conflict is inevitable and, handled well, can improve decisions.",
          "Unhealthy conflict turns personal and poisons the team.",
          "Approaches: avoiding, competing, accommodating, compromising, collaborating.",
          "Each fits a situation; collaboration and fair compromise are usually healthiest.",
          "Letting important conflicts fester breeds resentment; name issues early and calmly."
        ],
        realWorldExample: "Two managers clashed over budget for months, avoiding the topic until resentment split their teams. When a leader finally sat them down to collaborate on shared priorities, they solved it in an hour, revealing how much damage months of silent avoidance had quietly caused."
      },
      {
        type: "concept",
        title: "Communication: The Tool That Prevents Most Problems",
        paragraphs: [
          "Most workplace conflict traces back to poor communication: unclear expectations, assumptions, or people not feeling heard. Strong communication prevents problems before they start. A cornerstone is active listening, fully focusing on the speaker, asking clarifying questions, and reflecting back what you heard rather than just waiting for your turn to talk. When people feel genuinely heard, tension drops fast. Many disputes are not really about the issue at all; they are about someone feeling ignored, dismissed, or misunderstood by the people around them.",
          "How you deliver a message matters as much as the message. 'I' statements, like 'I felt confused when the deadline changed,' express your view without attacking, whereas 'you' statements, 'You always mess up the schedule,' put people on the defensive and escalate conflict. Being specific and factual beats being vague and emotional. Choosing the right channel helps too: a sensitive issue deserves a real conversation, not a cold text that is easily misread. Tone, timing, and words together decide whether a message lands or blows up.",
          "Feedback is a special communication skill. Good feedback is timely, specific, and focused on behavior, not character, 'the report was late twice this week,' not 'you're lazy.' It balances honesty with respect so the person can actually hear it. Communication is also a two-way street: leaders who only broadcast and never listen miss the ground truth their team could tell them. Building a culture where people feel safe to speak up, disagree, and admit mistakes prevents small problems from silently growing into large, expensive ones nobody flagged in time."
        ],
        bullets: [
          "Most conflict comes from poor communication: unclear expectations and assumptions.",
          "Active listening, focusing and reflecting back, makes people feel heard.",
          "'I' statements express your view; 'you' statements provoke defensiveness.",
          "Match the channel to the message; sensitive topics need real conversation.",
          "Good feedback is timely, specific, and about behavior, not character."
        ],
        realWorldExample: "A team lead kept emailing terse criticism, and morale sank. When he switched to short face-to-face check-ins using 'I' statements and real listening, the same feedback landed as helpful rather than hostile. The words barely changed; the delivery changed everything."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm6-mc1",
            question: "Which conflict approach works hardest to satisfy everyone involved?",
            options: [
              "Avoiding, as a strict and unbreakable rule",
              "Collaborating",
              "Competing",
              "Accommodating"
            ],
            correctAnswer: 1,
            explanation: "Collaborating seeks a solution that truly satisfies all sides. It is ideal but time-consuming, so it is best saved for conflicts that genuinely matter."
          },
          {
            id: "lm6-mc2",
            question: "Why are 'I' statements better than 'you' statements in conflict?",
            options: [
              "They make the other person feel blamed, for essentially all companies today",
              "They express your view without attacking, reducing defensiveness",
              "They avoid mentioning the issue at all, without any meaningful exceptions",
              "They only work in written emails, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "'I felt confused when...' shares your experience without accusation, while 'You always...' puts people on the defensive and escalates the conflict."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sam Defuses a Team Clash",
        narrative: "Two of Sam's teammates, Jo and Alex, have been snapping at each other for weeks over who dropped a task. The tension is spreading to the whole team, so Sam steps in to help resolve it.",
        details: [
          "The real issue is that Jo felt unheard when Alex changed the plan without telling her.",
          "Sam listens actively to both sides before suggesting any solution.",
          "He encourages 'I' statements instead of accusations like 'you always ignore me'.",
          "They collaborate on a shared checklist so responsibilities are clear going forward."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm6-aq1",
          question: "Why does Sam start by listening rather than immediately proposing a fix?",
          options: [
              "Because listening wastes time in every conflict, based on common workplace assumptions",
              "Because many disputes are really about someone feeling unheard",
              "Because he wants to avoid the issue entirely, as many people wrongly believe",
              "Because competing is the best first move, in the vast majority of situations"
            ],
            correctAnswer: 1,
          explanation: "Much conflict stems from feeling ignored or dismissed. Active listening makes both sides feel heard, which lowers tension and often reveals the true issue before fixing it."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Conflict is inevitable; handled well it can improve decisions.",
          "Approaches include avoiding, competing, accommodating, compromising, and collaborating.",
          "Collaboration and fair compromise are usually healthiest for important issues.",
          "Most conflict comes from poor communication; active listening prevents much of it.",
          "'I' statements and specific, behavior-focused feedback reduce defensiveness."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "lm6-mastery1",
            question: "Why is some conflict actually healthy for a team?",
            options: [
              "Because it always turns personal, regardless of the specific circumstances",
              "Because openly debating ideas leads to better decisions",
              "Because it eliminates the need for any communication",
              "Because silence solves every problem, in nearly every real case"
            ],
            correctAnswer: 1,
            explanation: "Healthy conflict debates ideas openly, producing better decisions than fake agreement where problems fester unspoken. The danger is only when conflict turns personal."
          },
          {
            id: "lm6-mastery2",
            question: "When is 'avoiding' a reasonable way to handle conflict?",
            options: [
              "For every important disagreement, according to most business textbooks",
              "For trivial matters not worth the friction",
              "In a genuine emergency needing fast action",
              "Whenever you want to win at all costs"
            ],
            correctAnswer: 1,
            explanation: "Avoiding suits truly trivial issues, but it is disastrous for important ones, which then explode later. Emergencies call for competing, not avoiding."
          },
          {
            id: "lm6-mastery3",
            question: "What is active listening?",
            options: [
              "Waiting quietly for your turn to talk, as a strict and unbreakable rule",
              "Focusing fully and reflecting back what you heard",
              "Interrupting to correct the speaker, for essentially all companies today",
              "Ignoring the speaker's main point, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "Active listening means concentrating on the speaker, asking clarifying questions, and reflecting back their message, which makes people feel heard and lowers tension."
          },
          {
            id: "lm6-mastery4",
            question: "What is the danger of letting an important conflict fester in silence?",
            options: [
              "It resolves itself perfectly over time, under almost all normal conditions",
              "It grows into resentment and quiet quitting",
              "It improves team trust automatically, based on common workplace assumptions",
              "It has no effect on the team at all"
            ],
            correctAnswer: 1,
            explanation: "Ignored conflicts breed resentment and disengagement. Naming a problem calmly and early is far easier than untangling months of built-up tension."
          },
          {
            id: "lm6-mastery5",
            question: "Which is an example of good, behavior-focused feedback?",
            options: [
              "'You are just a lazy person', as many people wrongly believe",
              "'The report was late twice this week'",
              "'You always ruin everything', in the vast majority of situations",
              "'Everyone thinks you are careless', regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "Good feedback targets specific behavior ('late twice this week'), not character. Attacking someone as 'lazy' provokes defensiveness and does not help them improve."
          },
          {
            id: "lm6-mastery6",
            question: "Why does choosing the right communication channel matter?",
            options: [
              "Because all channels are exactly equal, in nearly every real case, according to most business textbooks",
              "Because a sensitive topic deserves a real conversation, not a cold text",
              "Because texting is best for every situation, as a strict and unbreakable rule",
              "Because channels never affect how a message lands, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "A sensitive issue delivered by cold text is easily misread and can escalate. Matching the channel to the message, using conversation for delicate topics, helps it land well."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // lm-7: Case Study: Satya Nadella at Microsoft
  // ─────────────────────────────────────────────
  {
    lessonId: "lm-7",
    sections: [
      {
        type: "concept",
        title: "A Stalled Giant and a New Kind of Leader",
        paragraphs: [
          "By 2014, Microsoft was huge but stuck. It had dominated the PC era but missed mobile and search, and its culture had grown famously toxic. Teams competed against each other instead of cooperating, a 'know-it-all' attitude ruled, and internal politics slowed everything. The stock had been flat for over a decade. Then Satya Nadella became CEO. Rather than launching one flashy product, he did something harder and more powerful: he set out to transform the company's culture, the shared mindset of how people work.",
          "Nadella's central idea came from a book on mindset: the difference between a 'know-it-all' culture and a 'learn-it-all' one. In a know-it-all culture, people protect their image, fear mistakes, and hoard knowledge to look smart. In a learn-it-all culture, people stay curious, admit what they do not know, and grow. Nadella argued that Microsoft's future depended on becoming learn-it-all. This was leadership in the deepest sense: not managing tasks, but reshaping the beliefs and behaviors of over 100,000 employees.",
          "He modeled the change himself, showing empathy, admitting the company had made mistakes, and encouraging collaboration over internal warfare. He rewarded teams that worked together and killed the brutal ranking system that had pitted colleagues against each other. Slowly, behavior shifted. This mirrors transformational leadership: inspiring people toward a bigger vision and growing them, rather than just issuing orders. Nadella changed what success looked like inside Microsoft, and in doing so, changed what the company could become. In choosing to reshape shared beliefs rather than chase a single headline product, he was betting that a healthier way of working together would, over time, unlock far more value than any one clever launch ever could on its own. Rather than chasing one flashy product launch, he chose the far harder and more lasting work of reshaping the daily habits and shared beliefs of well over a hundred thousand employees at once."
        ],
        bullets: [
          "By 2014 Microsoft was huge but stuck, with a toxic, competitive culture.",
          "Nadella focused on transforming culture, not just launching a product.",
          "He pushed a shift from a 'know-it-all' to a 'learn-it-all' mindset.",
          "Learn-it-all means curiosity, admitting gaps, and collaboration.",
          "He modeled empathy and killed the ranking system that pitted staff against each other."
        ],
        realWorldExample: "Nadella opened meetings by asking what people had learned recently, not just what they had achieved. This small ritual signaled that curiosity mattered more than looking flawless, a daily nudge that helped shift a giant company's culture toward learning."
      },
      {
        type: "concept",
        title: "Strategy Followed Culture, and Value Soared",
        paragraphs: [
          "Culture change enabled strategy change. The old Microsoft clung to Windows and treated rivals as enemies. Nadella made bold strategic moves that the old culture would have resisted: he embraced the cloud, betting Microsoft's future on Azure, and put Office apps on rival platforms like the iPhone, unthinkable before. He also championed open-source software the company had once mocked. These pivots worked partly because a more collaborative, learning-oriented culture could actually execute them without collapsing into internal turf wars.",
          "The results were staggering. When Nadella took over, Microsoft was worth around $300 billion and seen as yesterday's company. Within several years it surpassed $2 trillion, becoming one of the most valuable companies on Earth. The turnaround was not driven by a single hit product but by a leader who fixed the human system first, then let a healthier culture unlock better strategy and execution. It is a textbook example of how leadership of people, not just management of tasks, can revive an entire organization.",
          "The lessons generalize far beyond tech. First, culture is a leadership responsibility, and changing it takes modeling behavior, not just memos. Second, transformational leadership works by shifting mindsets and empowering people, which then powers strategy. Third, empathy and humility, admitting mistakes, listening, growing, can be strengths, not weaknesses, in a leader. Nadella's story shows that the softest-sounding skills, curiosity, empathy, collaboration, can drive the hardest business results, turning a stalled giant into a trillion-dollar success."
        ],
        bullets: [
          "A healthier culture let Microsoft execute bold new strategy.",
          "Nadella embraced the cloud (Azure) and put apps on rival platforms.",
          "Microsoft's value grew from about $300 billion to over $2 trillion.",
          "He fixed the human system first, then strategy and results followed.",
          "Empathy, humility, and curiosity can drive hard business outcomes."
        ],
        realWorldExample: "Putting Microsoft Office on Apple's iPhone once seemed like betrayal to insiders. Under Nadella's collaborative culture, it became obvious: meet customers where they are. That single once-taboo decision helped Office reach millions more users and reflected the whole cultural shift."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "lm7-mc1",
            question: "What was the core of Nadella's transformation at Microsoft?",
            options: [
              "Launching one flashy new gadget, without any meaningful exceptions",
              "Shifting the culture from 'know-it-all' to 'learn-it-all'",
              "Firing most of the employees, under almost all normal conditions",
              "Ignoring the cloud entirely, based on common workplace assumptions"
            ],
            correctAnswer: 1,
            explanation: "Nadella focused on culture, moving from a defensive know-it-all mindset to a curious learn-it-all one, which then enabled better strategy and execution."
          },
          {
            id: "lm7-mc2",
            question: "Which leadership style best describes Nadella's approach?",
            options: [
              "Purely autocratic command, as many people wrongly believe",
              "Transformational, inspiring a new mindset and vision",
              "Hands-off laissez-faire, in the vast majority of situations",
              "Avoiding all change, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "Nadella inspired people toward a bigger vision and reshaped their beliefs and behaviors, the hallmark of transformational leadership, rather than just issuing orders."
          }
        ]
      },
      {
        type: "scenario",
        title: "Rosa Revives a Toxic Department",
        narrative: "Rosa takes over a department where teams compete instead of cooperate, people hide mistakes, and morale is low. Inspired by Nadella's playbook, she decides to change the culture before chasing new results.",
        details: [
          "The old culture rewarded looking smart and punished admitting any error.",
          "Rosa models curiosity, openly sharing what she is still learning.",
          "She replaces internal rankings that pitted teammates against each other with team goals.",
          "Only after trust grows does she push an ambitious new project."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "lm7-aq1",
          question: "Why does Rosa change the culture before launching the ambitious project?",
          options: [
              "Because culture change is legally required first, in nearly every real case",
              "Because a healthier culture lets the team actually execute bold strategy",
              "Because projects never matter to results, according to most business textbooks",
              "Because rankings improve collaboration, as a strict and unbreakable rule, for essentially all companies today"
            ],
            correctAnswer: 1,
          explanation: "Like Nadella, Rosa fixes the human system first. A collaborative, learning culture can execute bold plans without collapsing into turf wars, so culture must come before strategy."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Nadella revived Microsoft by transforming culture, not just products.",
          "He shifted the mindset from 'know-it-all' to 'learn-it-all'.",
          "He modeled empathy and ended systems that pitted staff against each other.",
          "A healthier culture enabled bold strategy: the cloud and cross-platform apps.",
          "Microsoft's value grew from about $300 billion to over $2 trillion."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "lm7-mastery1",
            question: "What problem did Microsoft face when Nadella became CEO?",
            options: [
              "It had no employees left, without any meaningful exceptions, under almost all normal conditions",
              "It was huge but stuck, with a toxic, competitive culture",
              "It had never made any profit, based on common workplace assumptions",
              "It dominated the mobile market, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "By 2014 Microsoft was large but stalled, having missed mobile and search, with a culture full of internal competition and politics that slowed everything down."
          },
          {
            id: "lm7-mastery2",
            question: "What defines a 'learn-it-all' culture?",
            options: [
              "People hoard knowledge to look smart, in the vast majority of situations",
              "People stay curious and admit what they do not know",
              "People fear every mistake, regardless of the specific circumstances, in nearly every real case",
              "People avoid all collaboration, according to most business textbooks, as a strict and unbreakable rule"
            ],
            correctAnswer: 1,
            explanation: "A learn-it-all culture values curiosity, admitting gaps, and growth, the opposite of a know-it-all culture where people protect their image and hoard knowledge."
          },
          {
            id: "lm7-mastery3",
            question: "How did Nadella reinforce the culture change through his own actions?",
            options: [
              "By demanding perfection and hiding mistakes, for essentially all companies today",
              "By modeling empathy and admitting past mistakes",
              "By keeping the brutal ranking system, without any meaningful exceptions",
              "By ignoring how teams treated each other"
            ],
            correctAnswer: 1,
            explanation: "He led by example, showing empathy, admitting errors, and rewarding collaboration, while ending the ranking system that had pitted colleagues against one another."
          },
          {
            id: "lm7-mastery4",
            question: "Which bold strategic move reflected the new culture?",
            options: [
              "Refusing to touch cloud computing, under almost all normal conditions",
              "Putting Office apps on rival platforms like the iPhone",
              "Clinging only to Windows forever, based on common workplace assumptions",
              "Mocking open-source software, as many people wrongly believe, in the vast majority of situations"
            ],
            correctAnswer: 1,
            explanation: "Bringing Office to rival platforms, once taboo, showed the collaborative, customer-focused mindset. A healthier culture made such once-unthinkable moves possible."
          },
          {
            id: "lm7-mastery5",
            question: "What was the approximate result of Nadella's transformation in company value?",
            options: [
              "It fell to nearly zero, regardless of the specific circumstances",
              "It grew from about $300 billion to over $2 trillion",
              "It stayed exactly flat, in nearly every real case, according to most business textbooks",
              "It shrank by half, as a strict and unbreakable rule"
            ],
            correctAnswer: 1,
            explanation: "Microsoft's value climbed from roughly $300 billion to over $2 trillion, driven not by one product but by a leader who fixed the culture first."
          },
          {
            id: "lm7-mastery6",
            question: "What broad leadership lesson does Nadella's story teach?",
            options: [
              "Only new products can revive a company, for essentially all companies today",
              "Empathy and culture change can drive hard business results",
              "Softer skills never matter in business, without any meaningful exceptions",
              "Leaders should ignore how people work together, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "The story shows leadership of people, curiosity, empathy, and collaboration, can revive an organization. Fixing the human system first unlocked strategy and results."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // STRATEGIC ANALYSIS
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // sa-1: What Is Business Strategy?
  // ─────────────────────────────────────────────
  {
    lessonId: "sa-1",
    sections: [
      {
        type: "concept",
        title: "Strategy Is Choosing What to Do and What to Skip",
        paragraphs: [
          "Strategy is a company's plan for how it will win, the deliberate choices it makes to create value and beat rivals over the long run. It is not a vague wish like 'be the best'; it is a set of concrete decisions about where to play and how to compete. Crucially, strategy is as much about what you choose not to do as what you do. A restaurant that tries to serve everyone, sushi, tacos, burgers, and pasta, usually does all of them poorly. Focus is the heart of strategy. Every strong strategy therefore begins with the uncomfortable discipline of saying no, deliberately turning down tempting options so that the business can pour its limited energy into the narrow set of choices where it has a genuine chance to win against everyone else. Choosing a clear lane and deliberately skipping everything else is what allows a company to do a few things exceptionally well rather than doing many things in a forgettable, mediocre way.",
          "Every real strategy answers a few hard questions. Who exactly is our customer? What do we offer that they value? How are we different from competitors? A company must pick a lane. Some compete on being the cheapest (cost leadership), others on being uniquely better (differentiation), and others on serving one narrow group extremely well (focus). Trying to be all three at once usually fails, because the choices that make you cheapest often clash with the choices that make you premium and distinctive.",
          "Strategy differs from tactics. Strategy is the big-picture direction; tactics are the specific actions that carry it out. Deciding to become the low-cost airline is strategy; choosing to skip free meals and fly one type of plane are tactics that serve it. A common trap is confusing being busy with being strategic. A company can work furiously on a hundred tasks yet have no real strategy if those tasks do not point toward a coherent way to win. Direction beats mere motion every time."
        ],
        bullets: [
          "Strategy is a company's deliberate plan for how it will win long-term.",
          "It means choosing what NOT to do as much as what to do.",
          "Real strategy answers: who is our customer and how are we different?",
          "Common paths: cost leadership, differentiation, or narrow focus.",
          "Strategy is big-picture direction; tactics are the actions that serve it."
        ],
        realWorldExample: "Southwest Airlines chose one clear strategy: be the low-cost, no-frills carrier. It deliberately skipped assigned seats, meals, and multiple plane types. Those 'sacrifices' were the strategy, keeping costs low, and made Southwest profitable while fancier rivals struggled to copy its focus."
      },
      {
        type: "concept",
        title: "Competitive Advantage: Why Customers Pick You",
        paragraphs: [
          "At the center of strategy is competitive advantage: the reason customers choose you over everyone else, and why that edge is hard for rivals to copy. An advantage might come from lower costs, a stronger brand, unique technology, or a network of loyal users. The key test is durability. Anyone can cut prices for a week, but a true advantage lasts because competitors cannot easily match it. Without some durable edge, a business is just one of many, competing only on price and slowly grinding its profits toward zero.",
          "Some advantages are especially strong because they build on themselves. A network effect means a product gets more valuable as more people use it, think of a social app that is worthless with ten users but essential with ten million. Economies of scale mean big players produce more cheaply than small ones. Switching costs make it painful for customers to leave, like the hassle of moving all your files off one platform. These 'moats' protect a company from competition far longer than a clever product feature ever could.",
          "Strategy also demands trade-offs and constant adaptation. Choosing to be premium means accepting you will not win price-sensitive shoppers, and that is fine, it is the point. But markets shift, so strategy is never finished. New technology, competitors, or customer tastes can erode an advantage overnight, as they did to companies that dominated one era and vanished the next. The best strategists commit firmly to a clear direction while staying alert enough to adjust when the ground genuinely moves beneath them."
        ],
        bullets: [
          "Competitive advantage is why customers pick you, and rivals can't easily copy it.",
          "The key test is durability, not a one-week price cut anyone can match.",
          "Strong 'moats' include network effects, economies of scale, and switching costs.",
          "Trade-offs are necessary; being premium means skipping bargain shoppers.",
          "Strategy is never finished; advantages can erode as markets shift."
        ],
        realWorldExample: "A ride-hailing app's advantage is a network effect: more drivers mean shorter waits, which attracts more riders, which attracts more drivers. A new rival with few drivers struggles to break in, showing how a self-reinforcing moat protects the leader far better than a single feature."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa1-mc1",
            question: "Which statement best captures what strategy is?",
            options: [
              "Doing as many activities as possible at once, based on common workplace assumptions",
              "Deliberate choices about where to play and how to win",
              "Simply wishing to be the best company, as many people wrongly believe",
              "Copying every competitor exactly, in the vast majority of situations"
            ],
            correctAnswer: 1,
            explanation: "Strategy is deliberate choices about where to compete and how to win, including what NOT to do. Being busy or vaguely wanting to 'be the best' is not strategy."
          },
          {
            id: "sa1-mc2",
            question: "What makes a competitive advantage truly valuable?",
            options: [
              "It can be copied by anyone quickly, regardless of the specific circumstances",
              "It is durable and hard for rivals to match",
              "It only lasts about one week, in nearly every real case",
              "It relies solely on cutting prices, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "A real advantage lasts because competitors cannot easily copy it. A brief price cut anyone can match is not durable and does not protect long-term profits."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Coffee Shops, Two Strategies",
        narrative: "Two coffee shops open on the same street. One tries to be everything to everyone; the other makes clear strategic choices. A year later, their results differ sharply based on how they thought about strategy.",
        details: [
          "Shop A sells coffee, sandwiches, sushi, and tacos, doing none of them especially well.",
          "Shop B focuses only on premium coffee and a cozy, distinctive atmosphere.",
          "Shop B deliberately skips a huge menu to keep quality and its brand strong.",
          "Shop B's loyal regulars and unique feel are hard for a generic cafe to copy."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa1-aq1",
          question: "Why does Shop B's approach reflect better strategy than Shop A's?",
          options: [
              "Because it offers the widest possible menu, as a strict and unbreakable rule",
              "Because it makes clear trade-offs to build a distinctive, hard-to-copy edge",
              "Because it competes only on the lowest price, for essentially all companies today",
              "Because it tries to serve every kind of customer, without any meaningful exceptions"
            ],
            correctAnswer: 1,
          explanation: "Shop B chooses what NOT to do, skipping a huge menu, to build a focused, differentiated advantage rivals struggle to copy. Shop A's do-everything approach lacks any real edge."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Strategy is a deliberate plan for how a company will win long-term.",
          "It requires choosing what NOT to do, not just what to do.",
          "Companies compete via cost leadership, differentiation, or focus.",
          "Competitive advantage must be durable and hard for rivals to copy.",
          "Moats like network effects and switching costs protect advantages best."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sa1-mastery1",
            question: "Why is deciding what NOT to do central to strategy?",
            options: [
              "Because doing everything makes a company strongest, under almost all normal conditions",
              "Because focus is what makes a company distinctive and effective",
              "Because customers dislike all choices, based on common workplace assumptions",
              "Because tactics matter more than direction, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "Trying to do everything usually means doing it all poorly. Strategy is about focus, choosing a lane and skipping the rest to build a real, distinctive edge."
          },
          {
            id: "sa1-mastery2",
            question: "What is the difference between strategy and tactics?",
            options: [
              "Strategy is the direction; tactics are the actions serving it",
              "They are exactly the same thing, in the vast majority of situations",
              "Tactics set direction; strategy handles small tasks, regardless of the specific circumstances",
              "Strategy is only for tactics to ignore, in nearly every real case"
            ],
            correctAnswer: 0,
            explanation: "Strategy is the big-picture direction (be the low-cost airline), while tactics are the specific actions that carry it out (one plane type, no free meals)."
          },
          {
            id: "sa1-mastery3",
            question: "Which is an example of a durable competitive 'moat'?",
            options: [
              "A one-week discount sale, according to most business textbooks",
              "A network effect that grows with more users",
              "Copying a rival's slogan, as a strict and unbreakable rule",
              "A random price cut anyone can match, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "Network effects, economies of scale, and switching costs are durable moats. A brief discount is easily copied and offers no lasting protection."
          },
          {
            id: "sa1-mastery4",
            question: "Why does being 'premium' require a trade-off?",
            options: [
              "Because premium firms must also be the cheapest",
              "Because you accept losing price-sensitive shoppers",
              "Because premium products need no strategy",
              "Because it means serving everyone at once"
            ],
            correctAnswer: 1,
            explanation: "Choosing a premium position means you won't win bargain hunters, and that is intentional. The choices that make you premium clash with those that make you cheapest."
          },
          {
            id: "sa1-mastery5",
            question: "Why is being extremely busy not the same as being strategic?",
            options: [
              "Because busy companies always fail, without any meaningful exceptions, under almost all normal conditions",
              "Because tasks may not point toward a coherent way to win",
              "Because strategy requires doing nothing, based on common workplace assumptions, as many people wrongly believe",
              "Because motion is always better than direction, in the vast majority of situations"
            ],
            correctAnswer: 1,
            explanation: "A company can work furiously on many tasks yet lack strategy if those tasks don't add up to a clear way to win. Direction beats mere motion."
          },
          {
            id: "sa1-mastery6",
            question: "Why must strategy keep adapting over time?",
            options: [
              "Because advantages last forever once built, regardless of the specific circumstances",
              "Because markets, tech, and tastes can erode an edge",
              "Because strategy should never change at all, in nearly every real case",
              "Because customers never change their minds, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "New technology, rivals, and shifting tastes can erode an advantage quickly. Great strategists commit to a direction but stay alert to adjust when the ground truly moves."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // sa-2: KPIs - Measuring What Matters
  // ─────────────────────────────────────────────
  {
    lessonId: "sa-2",
    sections: [
      {
        type: "concept",
        title: "What Gets Measured Gets Managed",
        paragraphs: [
          "A KPI, or Key Performance Indicator, is a specific number a business tracks to see whether it is winning at what matters most. The word 'key' is doing heavy lifting: a company could measure a thousand things, but KPIs are the vital few that truly signal progress toward its goals. A gym might track hundreds of stats, but its key indicators could be monthly new members, cancellation rate, and revenue per member. Those few numbers tell the real story better than drowning in data nobody acts on. The real art lies in resisting the temptation to measure everything and instead committing to a handful of numbers that genuinely reflect success, because a focused dashboard that drives decisions beats an overflowing one that merely decorates a report nobody reads. The discipline of picking only the vital few numbers is what separates a focused, well-run business from one that collects endless statistics yet never uses any of them to make a real decision.",
          "Good KPIs share features captured by the SMART idea: they are Specific, Measurable, Achievable, Relevant, and Time-bound. 'Do better' is not a KPI; 'increase monthly repeat customers by 15% this quarter' is. A KPI must connect directly to a goal, since measuring something irrelevant just wastes attention. It must also be measurable with real data, not a vague feeling. And it should have a target and a timeframe, so you know whether you are actually hitting it or falling short and need to change course.",
          "There are two useful types: leading and lagging indicators. A lagging indicator measures results that already happened, like last month's revenue, useful but backward-looking. A leading indicator predicts future results, like the number of sales calls booked this week, which hints at next month's revenue. Smart businesses track both: lagging KPIs confirm outcomes, while leading KPIs act as an early warning system, letting you fix problems before they show up in the final results when it may be too late to respond."
        ],
        bullets: [
          "A KPI is a key number tracking progress toward what matters most.",
          "KPIs are the vital few, not every possible metric a business could collect.",
          "Good KPIs are SMART: specific, measurable, achievable, relevant, time-bound.",
          "Lagging indicators measure past results; leading indicators predict future ones.",
          "Track both so you can confirm outcomes and catch problems early."
        ],
        realWorldExample: "A subscription app watched only revenue (lagging) and was blindsided when it dropped. Adding a leading KPI, weekly active users, revealed engagement falling weeks before revenue did. That early warning let the team fix the product before the money problem fully hit."
      },
      {
        type: "concept",
        title: "Choosing the Right KPIs and Avoiding Vanity Metrics",
        paragraphs: [
          "The hardest part of KPIs is choosing the right ones, because the wrong ones actively mislead. A 'vanity metric' is a number that looks impressive but does not drive real decisions, like total social media followers or app downloads. A million downloads sounds great, but if almost nobody uses the app after installing, the number is hollow. Better KPIs measure real value: active users, retention, revenue per customer. Always ask whether a metric would actually change a decision; if not, it is probably vanity, not insight.",
          "Different goals demand different KPIs. A startup chasing growth might focus on new customers and growth rate. A mature company might prioritize profit margin and customer retention. A nonprofit might track people served rather than dollars earned. KPIs must fit the specific strategy, so copying a rival's metrics blindly is a mistake. The right question is always: what does winning look like for us right now, and which few numbers would honestly tell us whether we are getting there or drifting off course?",
          "Beware of gaming and tunnel vision. Once a metric becomes a target, people may chase the number in ways that hurt the real goal, a rule known as Goodhart's Law. A support team measured only on call speed might rush customers off the phone, boosting the KPI while wrecking satisfaction. That is why balanced sets of KPIs matter: pairing speed with a quality score prevents one number from being gamed. Good measurement guides behavior; bad measurement quietly distorts it in ways that eventually backfire."
        ],
        bullets: [
          "Vanity metrics look impressive but don't drive real decisions.",
          "Ask whether a metric would actually change a decision; if not, it's vanity.",
          "KPIs must fit your specific strategy; don't copy rivals blindly.",
          "Goodhart's Law: once a metric is a target, people may game it.",
          "Balanced KPI sets (like speed plus quality) prevent gaming one number."
        ],
        realWorldExample: "A call center rewarded agents purely for short call times. Agents hung up on customers to hit the target, and satisfaction collapsed even as the KPI 'improved.' Adding a customer-satisfaction score alongside call time fixed the distortion by balancing speed against real quality."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa2-mc1",
            question: "What is the difference between a leading and a lagging indicator?",
            options: [
              "Leading predicts future results; lagging measures past results",
              "They are identical types of metrics, as a strict and unbreakable rule",
              "Lagging predicts the future; leading looks backward, for essentially all companies today",
              "Leading indicators are always wrong, without any meaningful exceptions"
            ],
            correctAnswer: 0,
            explanation: "Leading indicators (like booked sales calls) hint at future outcomes, while lagging indicators (like last month's revenue) measure results that already happened. Both are useful."
          },
          {
            id: "sa2-mc2",
            question: "What is a 'vanity metric'?",
            options: [
              "A number that guides every key decision, under almost all normal conditions",
              "A number that looks impressive but doesn't drive decisions",
              "A metric only used by nonprofits, based on common workplace assumptions",
              "The most important KPI a company has, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "A vanity metric, like total followers or raw downloads, looks good but doesn't inform real decisions. Better KPIs measure genuine value like active users or retention."
          }
        ]
      },
      {
        type: "scenario",
        title: "Dev Picks KPIs for His App",
        narrative: "Dev runs a meal-planning app and wants to track the right numbers. He is tempted by big, flashy figures but tries to choose KPIs that actually reveal whether the business is healthy.",
        details: [
          "His app has 500,000 downloads, but only 20,000 people use it weekly.",
          "He decides weekly active users matters more than total downloads.",
          "He adds a leading KPI, sign-up completion rate, to predict future active users.",
          "He pairs speed of support replies with a satisfaction score to avoid gaming."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa2-aq1",
          question: "Why does Dev focus on weekly active users instead of total downloads?",
          options: [
              "Because downloads are impossible to count, in the vast majority of situations, regardless of the specific circumstances",
              "Because active users reflect real value, while downloads can be a vanity metric",
              "Because higher download numbers always mean success, in nearly every real case, according to most business textbooks",
              "Because he wants to ignore his users entirely, as a strict and unbreakable rule"
            ],
            correctAnswer: 1,
          explanation: "500,000 downloads looks impressive but is hollow if few people actually use the app. Weekly active users measures real, ongoing value, avoiding the vanity-metric trap."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A KPI is a key number that tracks progress toward what matters most.",
          "Good KPIs are SMART and connect directly to a goal.",
          "Leading indicators predict; lagging indicators confirm past results.",
          "Vanity metrics look good but don't drive decisions; measure real value.",
          "Once a metric is a target it can be gamed, so use balanced KPI sets."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sa2-mastery1",
            question: "What does the 'key' in Key Performance Indicator emphasize?",
            options: [
              "That you should track every possible number, for essentially all companies today",
              "That KPIs are the vital few that signal real progress",
              "That KPIs must always be about money, without any meaningful exceptions",
              "That only executives may see them, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "'Key' means the vital few indicators that truly matter, not every metric a company could collect. Focusing on the few that signal progress beats drowning in data."
          },
          {
            id: "sa2-mastery2",
            question: "Which is a properly formed, SMART KPI?",
            options: [
              "Do better this year somehow, based on common workplace assumptions",
              "Increase monthly repeat customers by 15% this quarter",
              "Be the best company around, as many people wrongly believe",
              "Make more people happy overall, in the vast majority of situations"
            ],
            correctAnswer: 1,
            explanation: "A SMART KPI is specific, measurable, and time-bound, like a 15% rise in repeat customers this quarter. 'Do better' has no number, target, or timeframe."
          },
          {
            id: "sa2-mastery3",
            question: "Why track a leading indicator like weekly sales calls booked?",
            options: [
              "It measures results that already happened, regardless of the specific circumstances",
              "It acts as an early warning of future results",
              "It is the same as revenue itself, in nearly every real case",
              "It has no connection to outcomes, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "Leading indicators predict future outcomes, giving early warning. Booked calls this week hint at next month's revenue, letting you act before results are locked in."
          },
          {
            id: "sa2-mastery4",
            question: "What does Goodhart's Law warn about?",
            options: [
              "That metrics should never be measured, as a strict and unbreakable rule",
              "That once a metric becomes a target, people may game it",
              "That KPIs always improve behavior, for essentially all companies today, without any meaningful exceptions",
              "That leading indicators are useless, under almost all normal conditions, based on common workplace assumptions"
            ],
            correctAnswer: 1,
            explanation: "When a metric becomes a target, people may chase the number in ways that hurt the real goal, like rushing customers to boost call speed. Balanced KPIs reduce this risk."
          },
          {
            id: "sa2-mastery5",
            question: "Why shouldn't a company copy a rival's KPIs blindly?",
            options: [
              "Because copying is always illegal, as many people wrongly believe",
              "Because KPIs must fit your own specific strategy",
              "Because rivals never use real KPIs, in the vast majority of situations",
              "Because all businesses share one goal, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "A growth-stage startup and a mature firm need different KPIs. Metrics must match your own strategy and goals, so blindly copying a competitor's numbers can mislead you."
          },
          {
            id: "sa2-mastery6",
            question: "How does pairing call speed with a satisfaction score help?",
            options: [
              "It lets agents ignore customers faster, in nearly every real case",
              "It balances one metric so it can't be gamed alone",
              "It removes the need for any KPIs, according to most business textbooks",
              "It doubles the number of vanity metrics, as a strict and unbreakable rule"
            ],
            correctAnswer: 1,
            explanation: "Measuring speed alone tempts agents to rush customers. Adding a satisfaction score balances it, so hitting one number can't quietly wreck the real goal of good service."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // sa-3: SWOT Analysis
  // ─────────────────────────────────────────────
  {
    lessonId: "sa-3",
    sections: [
      {
        type: "concept",
        title: "Four Boxes That Map Your Situation",
        paragraphs: [
          "SWOT analysis is a simple framework for sizing up a business by sorting its situation into four boxes: Strengths, Weaknesses, Opportunities, and Threats. Its power is in the split between two dimensions. Strengths and Weaknesses are internal, things inside the company that it controls, like its skills, brand, cash, or team. Opportunities and Threats are external, forces in the outside world it does not control, like market trends, new competitors, or changing laws. Getting this internal-versus-external split right is the whole discipline of SWOT.",
          "Strengths are internal advantages: a loyal customer base, a strong brand, low costs, talented staff, or unique technology. Weaknesses are internal disadvantages: high costs, weak marketing, thin cash reserves, or a skills gap. The honest test is whether the factor lives inside the company and can be changed by its own decisions. A great location is a strength; poor employee training is a weakness. Naming both truthfully matters, since a SWOT that only lists flattering strengths and ignores real weaknesses is useless self-congratulation. The most valuable box is usually the uncomfortable one, because the weaknesses and threats a team would rather not admit are precisely where the hidden risks to the business tend to live.",
          "Opportunities are external trends the company could exploit: a growing market, a rival stumbling, new technology, or a shift in customer habits it could ride. Threats are external dangers: fierce new competitors, an economic downturn, changing regulations, or tastes moving away from your product. The key is that these forces exist whether or not you act; you do not control them. A common mistake is putting a plan (an action you would take) in these boxes. Opportunities and threats describe the outside world, not your response to it."
        ],
        bullets: [
          "SWOT sorts a situation into Strengths, Weaknesses, Opportunities, Threats.",
          "Strengths and Weaknesses are internal factors the company controls.",
          "Opportunities and Threats are external forces it does not control.",
          "The honest test: does the factor live inside the company or outside it?",
          "A useful SWOT names real weaknesses, not just flattering strengths."
        ],
        realWorldExample: "A small bakery's SWOT: Strength, a beloved secret recipe; Weakness, only one location; Opportunity, a new office building opening nearby with hungry workers; Threat, a big chain cafe rumored to move in. Each box separates what the bakery controls from what it merely faces."
      },
      {
        type: "concept",
        title: "From Four Boxes to Real Decisions",
        paragraphs: [
          "Listing four boxes is only step one; the value comes from connecting them. The best SWOT thinking pairs factors to generate strategy. Match a strength to an opportunity: how can we use what we are good at to seize this trend? Use a strength to defend against a threat: which advantage protects us from that danger? Address a weakness before an opportunity slips away, and shore up a weakness that a threat could exploit. A SWOT that just makes four lists and stops has done half the work and gained little.",
          "Honesty is what separates a useful SWOT from a comforting one. Teams love listing strengths and downplaying weaknesses, but the weaknesses and threats are usually where the real risk hides. It helps to be specific rather than vague: 'weak at digital marketing, no email list' beats a fuzzy 'marketing could be better.' Evidence matters too, since a SWOT built on wishful thinking produces bad strategy. The goal is a clear-eyed, sometimes uncomfortable picture of where you truly stand, not a pep talk.",
          "SWOT's strength is also its limit. It is quick, flexible, and works for a company, a product, or even a personal career choice, which is why it is so widely used. But it is only a snapshot in time and does not, by itself, tell you what to do; it organizes thinking rather than deciding for you. It also does not weigh which factors matter most. So treat SWOT as a starting map: it surfaces the key issues clearly, and then you apply judgment to turn those insights into concrete, prioritized action."
        ],
        bullets: [
          "The value is pairing boxes: strengths to opportunities, strengths against threats.",
          "Address weaknesses before opportunities slip or threats exploit them.",
          "Be honest and specific; weaknesses and threats hide the real risk.",
          "Base a SWOT on evidence, not wishful thinking.",
          "SWOT is a snapshot that organizes thinking, not a decision by itself."
        ],
        realWorldExample: "A gym paired a strength (expert trainers) with an opportunity (rising interest in personal training) to launch premium coaching. It also matched a weakness (old equipment) against a threat (a shiny new rival) and prioritized upgrades, turning four lists into two real decisions."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa3-mc1",
            question: "In SWOT, which two categories are INTERNAL to the company?",
            options: [
              "Opportunities and Threats, for essentially all companies today",
              "Strengths and Weaknesses",
              "Strengths and Threats",
              "Weaknesses and Opportunities"
            ],
            correctAnswer: 1,
            explanation: "Strengths and Weaknesses are internal factors the company controls, like its skills and brand. Opportunities and Threats are external forces it does not control."
          },
          {
            id: "sa3-mc2",
            question: "A new competitor entering the market is an example of a…",
            options: [
              "Strength",
              "Threat",
              "Weakness",
              "Internal factor"
            ],
            correctAnswer: 1,
            explanation: "A new competitor is an external danger the company does not control, making it a Threat. Strengths and Weaknesses are internal, not outside forces."
          }
        ]
      },
      {
        type: "scenario",
        title: "Lena Runs a SWOT on Her Studio",
        narrative: "Lena owns a small yoga studio and wants to grow. She sits down to run a SWOT analysis, carefully separating what she controls from what she merely faces in the market.",
        details: [
          "Strength (internal): a loyal community of regulars who love her teaching style.",
          "Weakness (internal): a cramped space that limits class sizes and income.",
          "Opportunity (external): a wellness trend drawing new people to yoga in her town.",
          "Threat (external): a large chain gym nearby that just added yoga classes."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa3-aq1",
          question: "How should Lena turn her SWOT into a real decision?",
          options: [
              "List the four boxes and take no further action, without any meaningful exceptions, as many people wrongly believe",
              "Pair her loyal community strength against the chain-gym threat to defend her niche",
              "Ignore the weakness since the space is fine, under almost all normal conditions",
              "Treat the wellness trend as something she controls, based on common workplace assumptions"
            ],
            correctAnswer: 1,
          explanation: "The value of SWOT is pairing factors. Using her loyal-community strength to defend against the chain-gym threat turns four lists into a concrete strategy, which is the real goal."
        }
      },
      {
        type: "recap",
        takeaways: [
          "SWOT sorts a situation into Strengths, Weaknesses, Opportunities, and Threats.",
          "Strengths and Weaknesses are internal; Opportunities and Threats are external.",
          "The honest test is whether a factor lives inside or outside the company.",
          "The real value comes from pairing boxes to generate strategy.",
          "SWOT is an honest snapshot that organizes thinking, not a decision by itself."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sa3-mastery1",
            question: "Which is the correct test for placing a factor in SWOT?",
            options: [
              "Whether it sounds positive or negative, in the vast majority of situations",
              "Whether it is internal (controlled) or external (faced)",
              "Whether it involves money or not, regardless of the specific circumstances",
              "Whether a competitor mentioned it, in nearly every real case"
            ],
            correctAnswer: 1,
            explanation: "The core discipline is the internal-versus-external split. Strengths and Weaknesses live inside the company; Opportunities and Threats are outside forces it does not control."
          },
          {
            id: "sa3-mastery2",
            question: "A company's weak email marketing is best classified as a…",
            options: [
              "Threat",
              "Weakness",
              "Opportunity",
              "External force"
            ],
            correctAnswer: 1,
            explanation: "Weak marketing is an internal disadvantage the company can change through its own decisions, so it is a Weakness, not an external Threat or Opportunity."
          },
          {
            id: "sa3-mastery3",
            question: "A growing market that a firm could ride is an example of a…",
            options: [
              "Weakness",
              "Opportunity",
              "Strength",
              "Internal factor"
            ],
            correctAnswer: 1,
            explanation: "A growing market is an external trend the company could exploit but does not control, making it an Opportunity. Strengths and Weaknesses are internal."
          },
          {
            id: "sa3-mastery4",
            question: "Why is listing only strengths a poor SWOT?",
            options: [
              "Because strengths never matter, according to most business textbooks",
              "Because ignoring weaknesses hides the real risk",
              "Because SWOT bans strengths entirely, as a strict and unbreakable rule",
              "Because strengths are always external, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "Weaknesses and threats are usually where real risk hides. A SWOT that flatters itself and skips honest weaknesses becomes useless self-congratulation."
          },
          {
            id: "sa3-mastery5",
            question: "What turns a basic SWOT into useful strategy?",
            options: [
              "Making the four lists as long as possible",
              "Pairing factors, like a strength against a threat",
              "Deleting the weaknesses box, without any meaningful exceptions",
              "Ranking the boxes alphabetically, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "The real value comes from connecting boxes, such as using a strength to seize an opportunity or defend against a threat. Four lists alone do only half the work."
          },
          {
            id: "sa3-mastery6",
            question: "What is a key limitation of SWOT?",
            options: [
              "It decides everything automatically, based on common workplace assumptions, as many people wrongly believe",
              "It's a snapshot and doesn't tell you what to do by itself",
              "It only works for huge corporations, in the vast majority of situations",
              "It measures exact financial returns, regardless of the specific circumstances, in nearly every real case"
            ],
            correctAnswer: 1,
            explanation: "SWOT organizes thinking at one moment but does not decide for you or weigh which factors matter most. It's a starting map that still needs judgment and action."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // sa-4: Porter's Five Forces
  // ─────────────────────────────────────────────
  {
    lessonId: "sa-4",
    sections: [
      {
        type: "concept",
        title: "Why Some Industries Are Goldmines and Others Are Traps",
        paragraphs: [
          "Porter's Five Forces, created by economist Michael Porter, explains why some industries are highly profitable while others barely make money, no matter how hard companies work. The insight is that profitability is shaped by industry structure, not just a single company's effort. Five competitive forces squeeze the profit available in any market. When the forces are strong, they crush profits; when they are weak, profits can be rich. Understanding them helps you judge whether an industry is even worth entering before you commit.",
          "The first force is the threat of new entrants: how easily can new competitors join? If barriers are low, anyone can flood in and drive prices down. High barriers, like huge startup costs, strong brands, or patents, protect existing players. The second force is the bargaining power of suppliers: if few suppliers control something you need, they can raise prices and squeeze you. The third is the bargaining power of buyers: if customers are few, powerful, or can easily switch, they push prices down and demand more.",
          "The fourth force is the threat of substitutes: not direct rivals, but different products that solve the same need, like video calls substituting for airline travel, or streaming replacing cinemas. Strong substitutes cap how much you can charge. The fifth and central force is rivalry among existing competitors: how fiercely current players fight. Intense rivalry, through price wars and constant one-upmanship, shreds everyone's profits. Together these five forces reveal the underlying economics of an industry far better than looking at any single competitor alone. By forcing you to examine the whole competitive landscape rather than fixating on one rival, the framework reveals the deeper economic pressures that quietly determine whether an industry rewards its players with healthy profits or grinds them down no matter how hard they work. Studying the structure first, before falling in love with a product idea, is exactly how experienced founders and investors avoid pouring money into a market that simply cannot pay them back."
        ],
        bullets: [
          "Porter's Five Forces explains why industry structure drives profitability.",
          "Threat of new entrants: low barriers let rivals flood in and cut prices.",
          "Supplier power: few key suppliers can raise your costs and squeeze you.",
          "Buyer power: powerful customers push prices down and demand more.",
          "Substitutes and rivalry: alternatives and fierce fighting both shred profits."
        ],
        realWorldExample: "The airline industry faces brutal forces: powerful suppliers (Boeing, fuel), price-sensitive buyers who compare fares instantly, substitutes like video calls, and fierce rivalry. That structure, not lazy management, is why airlines historically struggle to earn steady profits despite carrying millions of passengers."
      },
      {
        type: "concept",
        title: "Using the Forces to Make Smart Choices",
        paragraphs: [
          "The point of the Five Forces is not just analysis; it guides real decisions. Before entering an industry, you assess each force. If all five are strong, the industry may be a trap where profits are permanently thin, and you might avoid it or find a protected niche. If several forces are weak, there may be room to earn healthy returns. This is why smart entrepreneurs and investors study structure first, rather than falling in love with an idea in a market that structurally cannot pay.",
          "The framework also shows how a company can improve its position by weakening a force against itself. It can build barriers to entry through a strong brand or scale, reducing new entrants. It can reduce supplier power by finding alternative suppliers or making key inputs itself. It can reduce buyer power by differentiating so customers cannot easily switch. It can blunt substitutes by adding unique value, and ease rivalry by carving out a distinct segment rather than fighting head-on on price with everyone.",
          "Two cautions keep the tool sharp. First, the forces change over time, so an industry that is attractive today can turn brutal as technology lowers barriers or a powerful substitute emerges, exactly what happened to newspapers when the internet arrived. Second, Five Forces analyzes an industry's structure but does not account for everything, like the speed of technological disruption or complementary products. Used well, it is a powerful lens for judging where to compete and how to defend profit, but it is one lens among several."
        ],
        bullets: [
          "Assess all five forces before entering an industry; strong forces mean thin profits.",
          "A company can weaken a force against itself to improve its position.",
          "Build entry barriers, reduce supplier and buyer power, blunt substitutes.",
          "Ease rivalry by carving a distinct niche instead of pure price wars.",
          "Forces shift over time; the framework is one powerful lens, not the whole picture."
        ],
        realWorldExample: "Newspapers once enjoyed a protected industry with high barriers and captive local advertisers. The internet destroyed that structure: entry barriers collapsed, free online news became a substitute, and advertiser (buyer) power exploded. The forces flipped from favorable to brutal within a decade."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa4-mc1",
            question: "What does Porter's Five Forces primarily analyze?",
            options: [
              "A single company's internal culture, according to most business textbooks",
              "The structure and profitability of an industry",
              "The personality of a company's CEO, as a strict and unbreakable rule",
              "One employee's performance, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "The Five Forces analyzes industry structure to explain why some industries are profitable and others are not, regardless of any single company's effort."
          },
          {
            id: "sa4-mc2",
            question: "A video call replacing a business flight is an example of which force?",
            options: [
              "Bargaining power of suppliers",
              "Threat of substitutes",
              "Threat of new entrants",
              "Rivalry among competitors"
            ],
            correctAnswer: 1,
            explanation: "A substitute solves the same need with a different product. Video calls substitute for air travel, capping how much airlines can charge, which is the threat of substitutes."
          }
        ]
      },
      {
        type: "scenario",
        title: "Omar Sizes Up a New Market",
        narrative: "Omar is deciding whether to launch a business selling generic phone chargers online. Before investing, he analyzes the industry using Porter's Five Forces to see if it can actually be profitable.",
        details: [
          "New entrants: barriers are very low, so countless sellers can flood in easily.",
          "Buyers: shoppers compare prices instantly and switch for a few cents.",
          "Substitutes: many similar chargers and cables solve the exact same need.",
          "Rivalry: dozens of near-identical sellers fight brutal price wars."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa4-aq1",
          question: "What does Omar's Five Forces analysis suggest?",
          options: [
              "The industry is highly protected and easy to profit in, without any meaningful exceptions",
              "Strong forces make thin profits likely; he should reconsider or find a niche",
              "Low barriers guarantee high profits for him, under almost all normal conditions, based on common workplace assumptions",
              "Rivalry has no effect on his prices, as many people wrongly believe, in the vast majority of situations"
            ],
            correctAnswer: 1,
          explanation: "Low barriers, powerful price-comparing buyers, easy substitutes, and fierce rivalry all squeeze profit hard. The structure is a trap, so Omar should rethink or find a protected niche."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Porter's Five Forces explains profitability through industry structure.",
          "The forces: new entrants, supplier power, buyer power, substitutes, and rivalry.",
          "Strong forces crush profits; weak forces leave room for healthy returns.",
          "A company can weaken a force against itself to improve its position.",
          "Forces shift over time; the framework is one powerful lens, not the whole picture."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sa4-mastery1",
            question: "Why can an industry stay unprofitable despite hard-working companies?",
            options: [
              "Because the workers are always lazy, regardless of the specific circumstances",
              "Because strong industry forces structurally squeeze profits",
              "Because profit is purely random, in nearly every real case",
              "Because customers never buy anything, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "Porter's insight is that industry structure, not just effort, drives profitability. When all five forces are strong, they squeeze profit no matter how hard firms work."
          },
          {
            id: "sa4-mastery2",
            question: "High startup costs and strong patents mainly affect which force?",
            options: [
              "Threat of new entrants",
              "Bargaining power of buyers",
              "Threat of substitutes, as a strict and unbreakable rule",
              "Bargaining power of suppliers"
            ],
            correctAnswer: 0,
            explanation: "High costs and patents are barriers to entry that keep new competitors out, reducing the threat of new entrants and protecting existing players' profits."
          },
          {
            id: "sa4-mastery3",
            question: "When do buyers have strong bargaining power?",
            options: [
              "When there are millions of loyal buyers, for essentially all companies today",
              "When customers are few, powerful, or can easily switch",
              "When no substitutes exist at all, without any meaningful exceptions",
              "When only one supplier exists, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "Powerful, few, or easily-switching buyers can push prices down and demand more. That buyer power squeezes the profit a company can earn from them."
          },
          {
            id: "sa4-mastery4",
            question: "How can a company reduce the power of its suppliers?",
            options: [
              "By relying on a single supplier only, based on common workplace assumptions",
              "By finding alternatives or making key inputs itself",
              "By raising its own prices randomly, as many people wrongly believe",
              "By ignoring supplier costs entirely, in the vast majority of situations"
            ],
            correctAnswer: 1,
            explanation: "Depending on one supplier hands them power. Finding alternative suppliers or producing key inputs in-house weakens supplier power and protects the company's costs."
          },
          {
            id: "sa4-mastery5",
            question: "What does intense rivalry among competitors typically do to profits?",
            options: [
              "Raises everyone's profits together, regardless of the specific circumstances",
              "Shreds profits through price wars and one-upmanship",
              "Has no effect on prices, in nearly every real case",
              "Guarantees a protected niche, according to most business textbooks"
            ],
            correctAnswer: 1,
            explanation: "Fierce rivalry drives price wars and constant one-upmanship, which erode margins for all players. Easing rivalry by carving a distinct niche protects profit."
          },
          {
            id: "sa4-mastery6",
            question: "What happened to newspapers that Five Forces helps explain?",
            options: [
              "Their favorable structure lasted forever, as a strict and unbreakable rule",
              "The internet flipped the forces from favorable to brutal",
              "Rivalry disappeared entirely online, for essentially all companies today",
              "Barriers to entry rose sharply, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "The internet collapsed entry barriers, created free-news substitutes, and boosted advertiser power. The forces flipped from protected to brutal, showing they shift over time."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // sa-5: Applying SWOT to a Business Opportunity
  // ─────────────────────────────────────────────
  {
    lessonId: "sa-5",
    sections: [
      {
        type: "concept",
        title: "Turning SWOT Into a Go/No-Go Decision",
        paragraphs: [
          "A SWOT is only worth doing if it leads to a decision, and one of the most valuable is the go/no-go call: should we pursue this opportunity or not? To get there, you move past listing factors to weighing them. Not all factors count equally; a single fatal threat can outweigh five minor strengths. The discipline is to ask, honestly, whether your strengths and opportunities genuinely outweigh your weaknesses and threats for this specific decision, right now, given your real resources and constraints.",
          "The most powerful technique is the 'matching' or TOWS approach, which pairs the boxes into action strategies. Strength-Opportunity (SO) strategies use your strengths to grab opportunities, your best offensive moves. Weakness-Opportunity (WO) strategies fix weaknesses so you can seize a chance. Strength-Threat (ST) strategies use strengths to defend against dangers. Weakness-Threat (WT) strategies are defensive, minimizing weaknesses that threats could exploit. This turns a static four-box list into a menu of concrete strategic options you can actually compare and choose among.",
          "Realism is the difference between a SWOT that helps and one that misleads. It is tempting to inflate strengths and downplay threats when you are excited about an idea, but that produces a confident march off a cliff. Weigh each factor by how likely and how impactful it is. A minor weakness you can fix cheaply should not kill a great opportunity, but a severe, unfixable threat, like a dominant competitor with unlimited cash, might rightly turn a 'go' into a 'no-go' before you waste your savings. The discipline of weighing each factor by how likely and how damaging it truly is, rather than simply hoping for the best, is precisely what turns a comforting list of boxes into a rigorous decision tool that can steer a genuinely high-stakes choice. The honest weighing of factors, rather than a hopeful gut feeling, is what turns a SWOT from a pep talk into a genuine tool that can steer a real, high-stakes decision in either direction."
        ],
        bullets: [
          "A SWOT should lead to a decision, often a go/no-go on an opportunity.",
          "Weigh factors; one fatal threat can outweigh several minor strengths.",
          "TOWS pairs boxes: SO offensive, WO fix-and-seize, ST defend, WT minimize.",
          "This turns a static list into concrete, comparable strategic options.",
          "Be realistic; inflating strengths and ignoring threats leads to bad calls."
        ],
        realWorldExample: "A teen weighing a lawn-care business ran a SWOT. Strengths (cheap equipment, free time) matched an opportunity (busy suburb) as a strong SO play. A threat (an established competitor) was real but beatable on price, so the honest weighing produced a confident 'go' decision."
      },
      {
        type: "concept",
        title: "A Worked Example: Deciding on a Food Truck",
        paragraphs: [
          "Imagine deciding whether to launch a taco food truck. First, gather honest factors. Strengths: a killer family recipe and low startup cost versus a restaurant. Weaknesses: no business experience and limited savings. Opportunities: a growing lunch crowd downtown and few nearby taco options. Threats: strict city permits and a popular burger truck already parked there. Notice each is placed correctly, recipe and savings are internal, while permits and the rival truck are external forces you face but do not control.",
          "Next, pair the boxes into strategies. SO: use the standout recipe (strength) to win the underserved downtown lunch crowd (opportunity), the core offensive play. WO: your inexperience (weakness) could sink you, so a WO move is taking a short business course before launch to safely seize the opportunity. ST: use the unique recipe (strength) to differentiate from the burger truck (threat) rather than competing head-on. WT: limited savings plus tough permits is dangerous, so a WT move might be starting part-time to limit downside while learning.",
          "Finally, weigh and decide. The opportunity is real and the recipe is a genuine edge, favoring 'go.' But the threats, permits and an entrenched rival, and the weakness of thin savings, argue for caution rather than betting everything at once. A smart conclusion is a conditional go: launch small, part-time, after handling permits, testing demand before committing your full savings. That is exactly how a good SWOT works: not a yes-or-no gut call, but a structured path from honest factors to a wise, de-risked decision."
        ],
        bullets: [
          "Start by gathering honest factors and placing each in the right box.",
          "Pair them: SO to attack, WO to fix-and-seize, ST to defend, WT to limit risk.",
          "Weigh factors by likelihood and impact before deciding.",
          "A 'conditional go' can beat a rushed all-in bet or a flat no.",
          "Good SWOT is a structured path from honest factors to a de-risked decision."
        ],
        realWorldExample: "The taco-truck analysis pointed to a conditional go: secure permits first, launch part-time to test the lunch crowd, and lean on the recipe to stand apart from the burger truck. Starting small turned a risky all-or-nothing bet into a smart, staged decision."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa5-mc1",
            question: "What is the purpose of a go/no-go decision in SWOT?",
            options: [
              "To list factors and stop there, under almost all normal conditions",
              "To decide whether to pursue an opportunity or not",
              "To count how many strengths exist, based on common workplace assumptions",
              "To ignore all threats entirely, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "A go/no-go decision uses the weighed SWOT to conclude whether an opportunity is worth pursuing. The analysis is only valuable if it leads to a real decision."
          },
          {
            id: "sa5-mc2",
            question: "What does an SO (Strength-Opportunity) strategy do?",
            options: [
              "Uses strengths to grab an opportunity",
              "Minimizes weaknesses against a threat, in the vast majority of situations",
              "Ignores strengths completely, regardless of the specific circumstances",
              "Focuses only on external threats, in nearly every real case"
            ],
            correctAnswer: 0,
            explanation: "An SO strategy pairs a strength with an opportunity, your best offensive move, using what you're good at to seize a favorable trend or gap in the market."
          }
        ]
      },
      {
        type: "scenario",
        title: "Nina Decides on a Tutoring Business",
        narrative: "Nina, a strong math student, is deciding whether to start a paid tutoring service. She runs a full SWOT and pairs the boxes to reach a smart go/no-go decision rather than guessing.",
        details: [
          "Strength: she is excellent at math and explaining it clearly.",
          "Weakness: she has no free time on weekdays and no marketing experience.",
          "Opportunity: many classmates are struggling before a big statewide exam.",
          "Threat: a well-known tutoring center already operates in her town."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa5-aq1",
          question: "Which pairing gives Nina the strongest offensive strategy?",
          options: [
              "Weakness-Threat: quit because a center exists, according to most business textbooks",
              "Strength-Opportunity: use her math skill to help exam-stressed classmates",
              "Ignore the opportunity entirely, as a strict and unbreakable rule",
              "Treat her weekday schedule as an opportunity, for essentially all companies today"
            ],
            correctAnswer: 1,
          explanation: "Pairing her math skill (strength) with struggling exam-takers (opportunity) is a classic SO move, using what she's good at to seize a real, timely demand."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A SWOT is valuable only when it leads to a decision, like go/no-go.",
          "Weigh factors; a single fatal threat can outweigh minor strengths.",
          "TOWS pairs boxes into SO, WO, ST, and WT action strategies.",
          "Be realistic, weighing each factor by likelihood and impact.",
          "A conditional, staged 'go' can beat both a rushed bet and a flat no."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sa5-mastery1",
            question: "Why must factors be weighed, not just listed, in a decision-focused SWOT?",
            options: [
              "Because all factors count exactly equally, without any meaningful exceptions",
              "Because one fatal threat can outweigh several minor strengths",
              "Because listing is enough to decide, under almost all normal conditions",
              "Because weighing removes the need for honesty, based on common workplace assumptions"
            ],
            correctAnswer: 1,
            explanation: "Not all factors matter equally. A single severe threat can outweigh many small strengths, so weighing by likelihood and impact is essential to a sound go/no-go call."
          },
          {
            id: "sa5-mastery2",
            question: "A WO (Weakness-Opportunity) strategy aims to…",
            options: [
              "Attack rivals head-on with pure strength, as many people wrongly believe",
              "Fix a weakness so you can seize an opportunity",
              "Ignore opportunities completely, in the vast majority of situations",
              "Defend only against threats, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "A WO strategy addresses a weakness, like inexperience, so the company can capture an opportunity it would otherwise miss, for example by taking a course before launching."
          },
          {
            id: "sa5-mastery3",
            question: "What is an ST (Strength-Threat) strategy?",
            options: [
              "Using a strength to defend against a threat",
              "Turning a threat into a weakness, in nearly every real case",
              "Ignoring your strengths entirely, according to most business textbooks",
              "Creating new threats on purpose, as a strict and unbreakable rule"
            ],
            correctAnswer: 0,
            explanation: "An ST strategy uses a strength, like a unique recipe, to defend against a threat, like a rival, rather than competing head-on where you are weaker."
          },
          {
            id: "sa5-mastery4",
            question: "Why is inflating strengths and downplaying threats dangerous?",
            options: [
              "It makes the SWOT too short, for essentially all companies today",
              "It produces a confident march toward a bad decision",
              "It always improves the outcome, without any meaningful exceptions",
              "It removes all opportunities, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "Wishful thinking leads to overconfidence and poor calls. Honest weighing of real strengths and threats is what makes a SWOT guide good decisions instead of misleading ones."
          },
          {
            id: "sa5-mastery5",
            question: "In the food-truck example, why was a 'conditional go' wise?",
            options: [
              "Because the idea had no strengths at all",
              "Because launching small tested demand while limiting downside",
              "Because threats never matter in decisions, based on common workplace assumptions",
              "Because all-in bets are always safest, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "With real threats and thin savings, starting part-time after handling permits tested demand while limiting risk, a smarter path than betting everything at once or quitting outright."
          },
          {
            id: "sa5-mastery6",
            question: "What does the TOWS approach add to a basic SWOT?",
            options: [
              "It deletes the weaknesses box, in the vast majority of situations",
              "It pairs boxes into concrete, comparable strategies",
              "It removes the need for any decision",
              "It counts factors alphabetically, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "TOWS turns a static four-box list into paired action strategies (SO, WO, ST, WT), giving a menu of concrete options you can compare and choose among."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // sa-6: Porter's Five Forces in Practice
  // ─────────────────────────────────────────────
  {
    lessonId: "sa-6",
    sections: [
      {
        type: "concept",
        title: "The Streaming Wars Through Five Forces",
        paragraphs: [
          "Apply the Five Forces to streaming video and the industry's brutal economics snap into focus. Rivalry among existing competitors is intense: Netflix, Disney, Amazon, and others fight fiercely, spending billions on original shows to poach each other's subscribers. The threat of new entrants is high because tech giants with deep pockets can launch a service almost overnight. Together, ferocious rivalry and easy entry mean constant spending and price pressure, which is exactly why so many streamers struggle to turn a steady profit despite huge audiences.",
          "Buyer power in streaming is strong, and it shapes everything. Customers can cancel with one click and 'subscribe-hop,' joining for one hit show then leaving, so no company can take loyalty for granted. That power keeps prices in check and forces constant investment in fresh content. Supplier power matters too: the studios, actors, and creators who make content can command enormous fees, especially the star talent everyone wants. When suppliers of hit shows hold that much leverage, they capture a big slice of the industry's money.",
          "Substitutes complete the squeeze. Streaming does not just compete with other streamers; it competes with everything else fighting for your evening: gaming, social media, YouTube, even sleep. These substitutes cap how much anyone can charge and how much attention they can win. Put the forces together and the picture is clear: high rivalry, high entry threat, strong buyers, powerful suppliers, and abundant substitutes. That structural pressure, not bad management, explains why streaming is a fierce, expensive business where even giants fight hard just to stay ahead. None of this is a sign of poor management; it is the industry's underlying structure at work, which is exactly what the five forces are designed to reveal beneath the surface of daily competition."
        ],
        bullets: [
          "Streaming has intense rivalry: giants spend billions to poach subscribers.",
          "New-entrant threat is high; deep-pocketed tech firms launch services fast.",
          "Buyer power is strong: one-click cancels and subscribe-hopping cap prices.",
          "Supplier power is real: star talent and studios command huge fees.",
          "Substitutes like gaming and social media compete for the same free time."
        ],
        realWorldExample: "When a rival launched a hit show, subscribers 'hopped' over, watched it, then cancelled and hopped elsewhere. That single behavior shows buyer power and rivalry combined, forcing every streamer to keep spending on new hits just to slow the churn of easily-lost customers."
      },
      {
        type: "concept",
        title: "Fast Food: Same Framework, Different Structure",
        paragraphs: [
          "Now apply the same five forces to fast food and notice how different the structure is. Rivalry is intense here too, with chains battling on price, speed, and menu, so that force is strong. But the threat of new entrants is more moderate for the big players, because established giants enjoy powerful brands, huge scale, and prime real estate that a new burger startup cannot easily match. The same force that is high in streaming is lower for a McDonald's-scale incumbent in fast food, showing structure depends on the specific industry.",
          "Buyer power in fast food is only moderate. Individual customers are many and small, so no single diner can pressure a chain, yet they are price-sensitive and can easily walk across the street to a rival, which keeps some pressure on. Supplier power is generally low for the giants: they buy beef, potatoes, and packaging in such massive volume that they dominate their suppliers rather than the other way around. That scale advantage is a real strength the biggest chains hold over smaller competitors and their suppliers alike.",
          "Substitutes, though, are everywhere: grocery stores, home cooking, food trucks, and countless other restaurants all solve 'I'm hungry.' That abundance caps prices and keeps chains innovating on value and convenience. Comparing the two industries teaches the real lesson: the Five Forces framework is the same, but the answers differ, and that is the point. It forces you to analyze each industry on its own structure rather than assuming they behave alike, revealing exactly where profit is protected and where it is under relentless pressure."
        ],
        bullets: [
          "Fast-food rivalry is intense, but entry threat is lower for big incumbents.",
          "Established chains hold strong brands, scale, and prime real estate.",
          "Buyer power is moderate: diners are small but price-sensitive and mobile.",
          "Supplier power is low for giants who buy inputs in massive volume.",
          "Substitutes abound (groceries, home cooking), capping prices and driving value."
        ],
        realWorldExample: "A giant burger chain negotiates beef prices its tiny local rival could never touch, because it buys in enormous volume. That low supplier power is a structural advantage, one reason big chains can offer value menus that smaller competitors simply cannot profitably match."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa6-mc1",
            question: "In streaming, what does 'subscribe-hopping' demonstrate?",
            options: [
              "Low buyer power",
              "Strong buyer power",
              "Weak rivalry, in nearly every real case",
              "High supplier loyalty"
            ],
            correctAnswer: 1,
            explanation: "Customers joining for one show then cancelling shows strong buyer power: they switch easily, capping prices and forcing streamers to keep spending on fresh content."
          },
          {
            id: "sa6-mc2",
            question: "Why is the threat of new entrants lower for a giant fast-food chain than in streaming?",
            options: [
              "Because fast food has no competitors, according to most business textbooks",
              "Because giants have strong brands, scale, and prime real estate",
              "Because nobody eats fast food anymore, as a strict and unbreakable rule",
              "Because suppliers block all newcomers, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "Big chains enjoy powerful brands, huge scale, and prime locations that a new startup cannot easily match, raising barriers to entry compared to the fast-launching streaming world."
          }
        ]
      },
      {
        type: "scenario",
        title: "Comparing Two Industries",
        narrative: "A business student compares streaming and fast food using Porter's Five Forces. She notices that the same framework produces very different pictures depending on each industry's structure.",
        details: [
          "Streaming: high entry threat, strong buyers, powerful star-talent suppliers.",
          "Fast food (giants): lower entry threat thanks to brand, scale, and locations.",
          "Fast-food giants have low supplier power because they buy in massive volume.",
          "Both industries face abundant substitutes and intense rivalry."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa6-aq1",
          question: "What is the key lesson from comparing the two industries?",
          options: [
              "The Five Forces framework only works for streaming, without any meaningful exceptions",
              "The same framework gives different answers based on each industry's structure",
              "All industries have identical forces, under almost all normal conditions, based on common workplace assumptions",
              "Substitutes never matter in either industry, as many people wrongly believe"
            ],
            correctAnswer: 1,
          explanation: "The framework is constant, but the answers differ by industry. That is the point: you must analyze each industry's own structure rather than assuming they behave the same way."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Streaming faces high rivalry, easy entry, strong buyers, and pricey suppliers.",
          "Subscribe-hopping shows how strong buyer power caps streaming prices.",
          "Fast-food giants enjoy lower entry threat and low supplier power via scale.",
          "Both industries face abundant substitutes competing for the same need.",
          "The framework is the same, but answers differ by each industry's structure."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sa6-mastery1",
            question: "Why do streaming companies keep spending billions on original shows?",
            options: [
              "Because they have no competitors, in the vast majority of situations",
              "Because fierce rivalry and easy switching force constant investment",
              "Because buyers have no power at all, regardless of the specific circumstances",
              "Because there are no substitutes, in nearly every real case"
            ],
            correctAnswer: 1,
            explanation: "Intense rivalry and strong buyer power (easy cancelling) mean streamers must keep producing hits to attract and retain subscribers, driving relentless content spending."
          },
          {
            id: "sa6-mastery2",
            question: "Which force is illustrated by gaming and social media competing for your evening?",
            options: [
              "Threat of substitutes",
              "Bargaining power of suppliers",
              "Threat of new entrants",
              "Rivalry among streamers"
            ],
            correctAnswer: 0,
            explanation: "Gaming and social media solve the same 'entertain me' need differently, making them substitutes that cap how much streamers can charge for attention and money."
          },
          {
            id: "sa6-mastery3",
            question: "Why is supplier power low for giant fast-food chains?",
            options: [
              "They refuse to use any suppliers, according to most business textbooks",
              "They buy inputs in such volume they dominate suppliers",
              "Their suppliers have no other customers, as a strict and unbreakable rule",
              "Food ingredients are always free, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "Buying beef, potatoes, and packaging in massive volume lets giants dominate their suppliers, keeping input costs low, a structural advantage smaller rivals lack."
          },
          {
            id: "sa6-mastery4",
            question: "How does buyer power differ between the two industries?",
            options: [
              "It is strong in streaming and moderate in fast food",
              "It is zero in both industries, without any meaningful exceptions",
              "It is strongest in fast food, under almost all normal conditions",
              "Buyers have no role in either, based on common workplace assumptions"
            ],
            correctAnswer: 0,
            explanation: "Streaming buyers switch with one click (strong power), while fast-food diners are small individually but price-sensitive and mobile (moderate power), showing structure differs."
          },
          {
            id: "sa6-mastery5",
            question: "What do both industries share regarding substitutes?",
            options: [
              "Neither faces any substitutes, as many people wrongly believe",
              "Both face abundant substitutes that cap prices",
              "Only fast food has substitutes, in the vast majority of situations",
              "Substitutes raise their prices, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "Streaming competes with all entertainment, and fast food competes with groceries and home cooking. Abundant substitutes cap prices and force both to keep innovating on value."
          },
          {
            id: "sa6-mastery6",
            question: "What broader point does comparing streaming and fast food prove?",
            options: [
              "Every industry has identical force strengths, in nearly every real case",
              "The same framework yields different answers by industry structure",
              "Porter's Five Forces only fits tech companies, according to most business textbooks",
              "Industry analysis is a waste of time, as a strict and unbreakable rule"
            ],
            correctAnswer: 1,
            explanation: "Applying one framework to two industries shows the forces are constant but their strengths vary, so each industry must be analyzed on its own specific structure."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // sa-7: Using Frameworks for Real Decisions
  // ─────────────────────────────────────────────
  {
    lessonId: "sa-7",
    sections: [
      {
        type: "concept",
        title: "Why One Framework Is Never Enough",
        paragraphs: [
          "SWOT and Porter's Five Forces are powerful, but each has a blind spot, which is why smart strategists combine them. Five Forces looks outward at an industry's structure but says nothing about your specific company's strengths and weaknesses. SWOT looks at your company but can be vague about why the industry itself is attractive or brutal. Used together, they cover each other's gaps: Five Forces reveals whether the industry can pay, and SWOT reveals whether you specifically can win in it. One without the other tells only half the story. Pairing them gives a founder both halves at once: a clear read on whether the industry can pay at all, and an honest read on whether this particular company is the right one to go and win in it.",
          "A natural sequence links them. Start with Five Forces to judge the industry's attractiveness, is this a market where profit is even possible? If the forces are crushing, you may stop right there or hunt for a protected niche. If the industry looks workable, move to SWOT to assess your own fit: do your strengths match what this industry rewards, and can you handle its threats? The external analysis frames the question, and the internal analysis answers whether you are the right player to take it on.",
          "The insights should feed each other, not sit in separate reports. A threat spotted in Five Forces, say powerful buyers, becomes a Threat in your SWOT, which you then counter with a matching strength. An industry opportunity, like weak rivalry in a niche, becomes an Opportunity you pair with your capabilities. This cross-pollination is where real strategy forms. Frameworks are not boxes to fill for a school assignment; they are lenses that, combined, turn scattered facts into a clear, defensible view of where and how to compete."
        ],
        bullets: [
          "Every framework has a blind spot, so combine them for a full picture.",
          "Five Forces looks at industry structure; SWOT looks at your company.",
          "Sequence: assess the industry first, then your fit within it.",
          "Feed insights across: an industry threat becomes a SWOT Threat to counter.",
          "Frameworks are lenses that turn scattered facts into a clear strategy."
        ],
        realWorldExample: "A team eyeing meal-kit delivery ran Five Forces and saw brutal rivalry and thin margins, an unattractive industry. But SWOT revealed a unique strength: an exclusive local-farm supply no rival had. Combining both, they targeted a premium niche the harsh general market structure would otherwise have hidden."
      },
      {
        type: "concept",
        title: "From Analysis to a Decision You Can Defend",
        paragraphs: [
          "Frameworks organize thinking, but they do not decide for you, judgment does. The danger is 'analysis paralysis,' endlessly filling in boxes while never choosing. Good strategists use frameworks to reach a clear, defensible decision and then act. The test of a strategy is not how many models you ran, but whether you can explain, in plain language, why you will win: who your customer is, how you are different, and how you will handle the biggest threats. If you cannot state that simply, the analysis has not finished its job.",
          "Real decisions also demand prioritization and trade-offs. Frameworks surface many factors, but you cannot act on all of them, so you rank what matters most and accept you cannot do everything. Data and analysis inform the choice, yet uncertainty always remains; no framework predicts the future perfectly. That is why strategy pairs rigorous thinking with the courage to commit despite incomplete information. Waiting for perfect certainty means never moving, while competitors who decide and adapt pull ahead of those still perfecting their spreadsheets.",
          "Finally, strategy is a loop, not a one-time report. You analyze, decide, act, then watch what actually happens and revisit your frameworks as conditions change. A Five Forces analysis from three years ago may be stale after a new technology reshapes the industry, and yesterday's SWOT strength can become tomorrow's weakness. The best strategists treat these tools as living lenses they return to, staying humble enough to update their view when reality disagrees with the plan. Combined frameworks plus disciplined judgment plus adaptation is how real strategic decisions get made."
        ],
        bullets: [
          "Frameworks organize thinking, but judgment makes the actual decision.",
          "Avoid analysis paralysis; use frameworks to decide, then act.",
          "State plainly why you'll win: customer, difference, and biggest threats.",
          "Prioritize and accept trade-offs; you can't act on every factor.",
          "Strategy is a loop: analyze, decide, act, and revisit as things change."
        ],
        realWorldExample: "After combining frameworks, a startup could state its strategy in one sentence: 'We serve busy vegans with premium local meal kits, differentiated by farm partnerships, defending against big rivals on quality, not price.' That plain, defensible sentence, not a giant report, showed the analysis was done."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa7-mc1",
            question: "Why combine SWOT and Porter's Five Forces?",
            options: [
              "Because one framework alone is always wrong, for essentially all companies today",
              "Because each has a blind spot the other covers",
              "Because SWOT replaces Five Forces entirely, without any meaningful exceptions",
              "Because more reports always mean better strategy, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "Five Forces analyzes the industry but ignores your company; SWOT analyzes your company but can miss industry structure. Together they cover each other's blind spots."
          },
          {
            id: "sa7-mc2",
            question: "What is 'analysis paralysis'?",
            options: [
              "Deciding too quickly without any data",
              "Endlessly analyzing while never actually deciding",
              "Using only one framework, based on common workplace assumptions",
              "Ignoring all frameworks entirely, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "Analysis paralysis is filling in frameworks forever without committing to a decision. Good strategists use analysis to reach a clear choice and then act on it."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aria Plans a Bookstore-Cafe",
        narrative: "Aria wants to open a bookstore-cafe. Instead of relying on one tool, she combines Porter's Five Forces and SWOT, then pushes herself to reach a decision she can defend in plain words.",
        details: [
          "Five Forces shows fierce rivalry from big chains but weak rivalry in cozy niche cafes.",
          "SWOT reveals her strength: a talent for creating a warm, community atmosphere.",
          "She pairs the niche opportunity (from Five Forces) with her atmosphere strength.",
          "She resists over-analyzing and commits to a clear, focused plan."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa7-aq1",
          question: "How does combining the two frameworks help Aria most?",
          options: [
              "It lets her avoid ever making a decision, in the vast majority of situations",
              "Five Forces finds a workable niche; SWOT confirms she can win it",
              "It proves the big chains have no advantages, regardless of the specific circumstances",
              "It replaces the need for any judgment, in nearly every real case"
            ],
            correctAnswer: 1,
          explanation: "Five Forces reveals a workable niche despite fierce general rivalry, and SWOT shows her atmosphere strength fits it. Together they frame a decision judgment then finalizes."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Combine frameworks because each has a blind spot the other covers.",
          "Assess the industry with Five Forces, then your fit with SWOT.",
          "Feed insights across: an industry threat becomes a SWOT Threat to counter.",
          "Frameworks organize thinking, but judgment makes the decision; avoid paralysis.",
          "Strategy is a loop: analyze, decide, act, and revisit as conditions change."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sa7-mastery1",
            question: "What does Five Forces reveal that SWOT often misses?",
            options: [
              "Your company's internal strengths, according to most business textbooks",
              "Whether the industry structure can be profitable",
              "Your team's personal skills, as a strict and unbreakable rule",
              "Your own weaknesses, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "Five Forces analyzes industry structure and profitability, while SWOT focuses on your company. Combining them shows both whether the industry pays and whether you can win."
          },
          {
            id: "sa7-mastery2",
            question: "What is the logical sequence for combining the frameworks?",
            options: [
              "Assess your company, then ignore the industry, without any meaningful exceptions",
              "Assess the industry first, then your fit within it",
              "Skip the industry analysis entirely, under almost all normal conditions",
              "Do both but never connect them, based on common workplace assumptions"
            ],
            correctAnswer: 1,
            explanation: "Start with Five Forces to judge the industry's attractiveness, then use SWOT to assess whether your strengths fit and you can handle its threats."
          },
          {
            id: "sa7-mastery3",
            question: "How should an industry threat from Five Forces appear in SWOT?",
            options: [
              "As a Strength to celebrate, as many people wrongly believe",
              "As a Threat you counter with a matching strength",
              "As an Opportunity to ignore, in the vast majority of situations",
              "It should never appear at all, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "Insights should cross-pollinate. A Five Forces threat like powerful buyers becomes a SWOT Threat, which you then pair with a strength to counter, forming real strategy."
          },
          {
            id: "sa7-mastery4",
            question: "What signals that your strategic analysis has done its job?",
            options: [
              "You ran the most models possible, in nearly every real case",
              "You can state plainly why you'll win",
              "You filled every box perfectly, according to most business textbooks",
              "You avoided making any decision, as a strict and unbreakable rule"
            ],
            correctAnswer: 1,
            explanation: "The test is a clear, plain-language explanation of your customer, your difference, and how you'll handle threats. If you can't state it simply, the analysis isn't finished."
          },
          {
            id: "sa7-mastery5",
            question: "Why must strategists commit despite incomplete information?",
            options: [
              "Because certainty is always available, for essentially all companies today",
              "Because waiting for perfect certainty means never moving",
              "Because data never matters, without any meaningful exceptions",
              "Because frameworks predict the future exactly, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "No framework predicts the future perfectly, so some uncertainty always remains. Rivals who decide and adapt pull ahead of those endlessly perfecting spreadsheets."
          },
          {
            id: "sa7-mastery6",
            question: "Why is strategy described as a loop rather than a one-time report?",
            options: [
              "Because reports are illegal, based on common workplace assumptions, as many people wrongly believe",
              "Because conditions change, so you revisit and update your view",
              "Because analysis should never be revised, in the vast majority of situations",
              "Because a single analysis lasts forever, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "Industries shift as technology and rivals evolve, so old analyses go stale. Great strategists loop back, staying humble enough to update frameworks when reality disagrees."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // sa-8: Mini-Project: Your Own Strategic Analysis
  // ─────────────────────────────────────────────
  {
    lessonId: "sa-8",
    sections: [
      {
        type: "concept",
        title: "Setting Up a Real Strategic Analysis",
        paragraphs: [
          "Now you put it all together on a business of your choice, real or invented. The first step is defining scope: pick one specific business and one specific question. 'Analyze retail' is too vast to be useful; 'Should my friend open a bubble tea shop near campus?' is sharp enough to answer. A tight scope keeps the whole analysis focused and prevents you from drowning in facts. Write down the exact business, its market, and the decision you want your analysis to inform before you gather a single fact. A few minutes spent narrowing the question up front saves hours of scattered, unfocused research later, because a sharp scope tells you exactly which facts actually matter and which you can safely ignore.",
          "Next, gather honest inputs using both primary and secondary research from earlier lessons. Secondary research, census data, industry reports, competitor websites, cheaply maps the landscape: market size, trends, and who already competes. Primary research, a quick survey or a few interviews, tests your specific idea with real potential customers. The goal is evidence, not wishful thinking, so seek out facts that could prove you wrong, not just ones that flatter your idea. Good inputs are what separate a real analysis from an educated guess dressed up in frameworks.",
          "With inputs ready, run your two core frameworks deliberately. Use Porter's Five Forces to judge the industry: rate each force as high, medium, or low and note why. Then run a SWOT on your specific business, placing each factor correctly as internal or external and being brutally honest about weaknesses and threats. Keep the two connected, letting an industry threat flow into your SWOT. Done carefully, these frameworks convert your scattered research into an organized picture of the opportunity and your fit within it."
        ],
        bullets: [
          "Define a tight scope: one specific business and one specific question.",
          "A sharp question ('should we open X near campus?') beats a vague one.",
          "Gather honest inputs via secondary research (map) and primary research (test).",
          "Seek facts that could prove you wrong, not just flattering ones.",
          "Run Five Forces on the industry, then a careful, honest SWOT on the business."
        ],
        realWorldExample: "A student analyzing a campus bubble tea shop scoped it tightly, then used census data for the student population, a 100-person survey for demand, and competitor visits for pricing. Those concrete inputs made her later Five Forces and SWOT rest on evidence, not hopeful guessing."
      },
      {
        type: "concept",
        title: "Reaching and Defending Your Recommendation",
        paragraphs: [
          "Analysis is worthless without a conclusion, so the final step is a clear recommendation: go, no-go, or go-with-conditions. Synthesize everything by weighing what matters most. If Five Forces shows a brutal industry and your SWOT shows no real edge, that points to no-go, and honestly saying so is a success, not a failure, because it saved wasted money. If the industry is workable and your strengths fit a genuine opportunity, that supports go. Often the honest answer is a conditional go: proceed, but only after addressing a specific weakness or threat first.",
          "A strong recommendation is defensible, meaning you can justify it in plain language backed by your evidence. State who the customer is, how the business will be different, why the industry can pay, and how you will handle the biggest threat. Anticipate the toughest objection and answer it. 'It'll be great because I like the idea' is not defensible; 'Demand is proven by our survey, rivalry is weak in this niche, and our recipe differentiates us' is. The quality of your reasoning matters more than whether the answer is yes or no.",
          "Finally, remember that a real analysis stays humble about uncertainty and plans for adaptation. Note your key assumptions and what would change your mind, so you can adjust as reality unfolds rather than clinging to a plan that stops working. Strategy is not about pretending to predict the future perfectly; it is about making the best evidence-based decision you can, committing to it, and staying alert. Complete this mini-project well and you have practiced exactly what real founders, managers, and investors do before betting real money on a business."
        ],
        bullets: [
          "End with a clear recommendation: go, no-go, or go-with-conditions.",
          "A well-reasoned no-go is a success, since it prevents wasted money.",
          "Make it defensible: customer, difference, why it pays, and biggest threat.",
          "Answer the toughest objection with evidence, not enthusiasm.",
          "Note key assumptions and what would change your mind, then stay adaptable."
        ],
        realWorldExample: "The bubble tea analysis ended in a conditional go: strong student demand and a weak local niche supported launching, but thin savings meant starting with one small cart to test sales first. That evidence-backed, staged recommendation is exactly how careful founders de-risk a real decision."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "sa8-mc1",
            question: "What is the first step in running your own strategic analysis?",
            options: [
              "Writing the final recommendation immediately, in nearly every real case",
              "Defining a tight scope: one business and one question",
              "Filling in a SWOT before any research, according to most business textbooks",
              "Analyzing an entire industry at once, as a strict and unbreakable rule"
            ],
            correctAnswer: 1,
            explanation: "A tight scope, one specific business and one specific question, keeps the whole analysis focused. Vague scopes like 'analyze retail' are too broad to be useful."
          },
          {
            id: "sa8-mc2",
            question: "Why is a well-reasoned 'no-go' recommendation still a success?",
            options: [
              "Because it means the analysis failed, for essentially all companies today",
              "Because it prevents wasting money on a bad opportunity",
              "Because no-go answers are always wrong, without any meaningful exceptions",
              "Because it avoids making any decision, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "If the industry is brutal and you have no real edge, honestly concluding no-go saves wasted money. The quality of reasoning matters more than whether the answer is yes."
          }
        ]
      },
      {
        type: "scenario",
        title: "Marcus Analyzes a Sneaker Resale Idea",
        narrative: "Marcus wants to start a sneaker resale business and runs a full strategic analysis before committing his savings. He follows the mini-project steps to reach a recommendation he can defend.",
        details: [
          "He scopes it tightly: reselling limited sneakers to local collectors online.",
          "Secondary research shows a growing resale market; a survey tests local demand.",
          "Five Forces reveals low entry barriers and fierce rivalry from big platforms.",
          "SWOT shows his strength: deep sneaker knowledge and local collector connections."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "sa8-aq1",
          question: "What would make Marcus's recommendation truly defensible?",
          options: [
              "Saying he simply loves sneakers a lot, based on common workplace assumptions, as many people wrongly believe",
              "Justifying it with evidence: proven demand, his niche edge, and how he'll handle rivalry",
              "Ignoring the fierce rivalry he found, in the vast majority of situations, regardless of the specific circumstances",
              "Skipping the survey results entirely, in nearly every real case, according to most business textbooks"
            ],
            correctAnswer: 1,
          explanation: "A defensible recommendation rests on evidence: survey-proven demand, his niche knowledge as a differentiator, and a plan for the rivalry threat, not just personal enthusiasm."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Start by defining a tight scope: one business and one clear question.",
          "Gather honest inputs with secondary research to map and primary to test.",
          "Run Five Forces on the industry, then a careful SWOT on the business.",
          "End with a clear, defensible recommendation: go, no-go, or conditional go.",
          "Note key assumptions and stay humble and adaptable about uncertainty."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 4,
        questions: [
          {
            id: "sa8-mastery1",
            question: "Why is a sharp question better than a broad one for this analysis?",
            options: [
              "Because broad questions are illegal, as a strict and unbreakable rule",
              "Because a tight scope keeps the analysis focused and answerable",
              "Because sharp questions need no research, for essentially all companies today",
              "Because broad questions always give better answers, without any meaningful exceptions"
            ],
            correctAnswer: 1,
            explanation: "'Should my friend open a bubble tea shop near campus?' can be answered; 'analyze retail' cannot. A tight scope prevents drowning in facts and keeps the work focused."
          },
          {
            id: "sa8-mastery2",
            question: "What role does secondary research play in the mini-project?",
            options: [
              "It tests your idea with real customers, under almost all normal conditions",
              "It cheaply maps market size, trends, and competitors",
              "It replaces the need for any frameworks, based on common workplace assumptions",
              "It only works after the recommendation, as many people wrongly believe"
            ],
            correctAnswer: 1,
            explanation: "Secondary research, like census data and industry reports, maps the landscape cheaply. Primary research then tests your specific idea with real potential customers."
          },
          {
            id: "sa8-mastery3",
            question: "Why seek facts that could prove your idea wrong?",
            options: [
              "To make the analysis longer, in the vast majority of situations",
              "Because honest evidence beats wishful thinking",
              "Because disproving ideas is always the goal",
              "Because flattering facts are illegal, regardless of the specific circumstances"
            ],
            correctAnswer: 1,
            explanation: "Chasing only flattering facts produces biased analysis. Seeking evidence that could prove you wrong keeps the analysis honest, which is what separates it from a hopeful guess."
          },
          {
            id: "sa8-mastery4",
            question: "What are the three possible recommendation outcomes?",
            options: [
              "Yes, maybe, or never, in nearly every real case",
              "Go, no-go, or go-with-conditions",
              "Buy, sell, or hold",
              "Fast, slow, or medium"
            ],
            correctAnswer: 1,
            explanation: "A strategic recommendation concludes with go, no-go, or a conditional go, proceeding only after addressing a specific weakness or threat first."
          },
          {
            id: "sa8-mastery5",
            question: "What makes a recommendation 'defensible'?",
            options: [
              "It sounds confident and excited, according to most business textbooks",
              "You justify it in plain language backed by evidence",
              "It avoids mentioning any threats, as a strict and unbreakable rule",
              "It relies only on personal taste, for essentially all companies today"
            ],
            correctAnswer: 1,
            explanation: "A defensible recommendation states the customer, the difference, why the industry pays, and how you'll handle the biggest threat, all backed by evidence, not enthusiasm."
          },
          {
            id: "sa8-mastery6",
            question: "Why should you note your key assumptions and what would change your mind?",
            options: [
              "To make the plan impossible to change",
              "So you can adapt as reality unfolds",
              "Because assumptions never matter, without any meaningful exceptions",
              "To guarantee the future is predictable, under almost all normal conditions"
            ],
            correctAnswer: 1,
            explanation: "No analysis predicts the future perfectly. Recording assumptions and what would change your mind lets you adapt when reality disagrees, instead of clinging to a failing plan."
          }
        ]
      }
    ]
  },
]
