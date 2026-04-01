import { StructuredLessonContent } from "@/types"
import { lessons } from "@/data/lessons"
import { generateStructuredContent } from "@/lib/contentGenerator"
import { investingFundamentalsContent } from "@/data/investingFundamentalsContent"
import { businessManagementContent } from "@/data/businessManagementContent"
import { marketingContent } from "@/data/marketingContent"
import { consumerBehaviorContent } from "@/data/consumerBehaviorContent"
import { marketingMixContent } from "@/data/marketingMixContent"

/**
 * Structured 6-section lesson content.
 * Pattern: Concept → Micro Check → Scenario → Applied Question → Recap → Mastery Check
 * 
 * Lessons without content here fall back to quiz-only mode in LessonDetail.
 */

export const structuredLessonContent: StructuredLessonContent[] = [
  // ═══════════════════════════════════════════════
  // UNIT 1: PSYCHOLOGY OF MONEY
  // ═══════════════════════════════════════════════

  // PSYCH-1: Why People Mismanage Money
  {
    lessonId: "psych-1",
    sections: [
      {
        type: "concept",
        title: "Why Smart People Make Bad Money Decisions",
        paragraphs: [
          "You might think that being smart or educated automatically means you'll be good with money. But research shows that intelligence has very little to do with financial success. Some of the smartest people in history have gone bankrupt, while people with average education have built lasting wealth.",
          "The reason? Money decisions are driven by emotions, habits, and psychological patterns — not just knowledge. Understanding these patterns is the first step to taking control of your financial future.",
          "Behavioral economists have identified several key reasons why people consistently mismanage money, even when they 'know better.' These include overconfidence, present bias, loss aversion, and social comparison."
        ],
        bullets: [
          "Overconfidence — believing you'll earn more later, so overspending now is 'fine'",
          "Present bias — valuing $50 today more than $200 in a year",
          "Loss aversion — feeling the pain of losing $100 twice as strongly as the joy of gaining $100",
          "Social comparison — spending to match peers rather than your actual budget",
          "Mental accounting — treating 'found money' (tax refunds, gifts) differently than earned money"
        ],
        realWorldExample: "A study by the National Endowment for Financial Education found that 70% of lottery winners go broke within a few years. Despite suddenly having millions, their spending habits, emotional triggers, and lack of financial discipline led to financial ruin. The money changed, but their psychology didn't."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych1-mc1",
            question: "Why do many intelligent people still mismanage their money?",
            options: [
              "Their income level is usually too low to build savings",
              "Emotions and habits drive money decisions more than knowledge",
              "Schools fail to teach enough advanced mathematics skills",
              "Financial institutions deliberately mislead educated consumers"
            ],
            correctAnswer: 1,
            explanation: "Financial success isn't about IQ — it's about behavior. Emotions like fear, excitement, and social pressure drive spending decisions far more than rational calculation. That's why a doctor earning $300K can be broke while a teacher earning $50K can retire comfortably."
          },
          {
            id: "psych1-mc2",
            question: "What is 'present bias' in financial decision-making?",
            options: [
              "Choosing investments based on whatever is trending right now",
              "Valuing immediate rewards more than larger future rewards",
              "Focusing only on present-day news when making money choices",
              "Setting your budget based on only your current month's income"
            ],
            correctAnswer: 1,
            explanation: "Present bias means you'd rather have $50 right now than $200 in a year — even though waiting gives you 4x more. This bias explains why people choose fast food over meal prepping, or buy sneakers instead of investing. Recognizing this bias is the first step to overcoming it."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Two Friends: Marcus & Jaylen",
        narrative: "Marcus and Jaylen both start their first jobs earning $2,000/month. Marcus buys the latest sneakers, eats out daily, and finances a new car — spending $2,100/month. Jaylen lives simply, packs lunch, takes the bus, and saves $400/month. After 3 years, Marcus has $8,000 in credit card debt. Jaylen has $14,400 in savings plus $2,000 in investment gains.",
        details: [
          "Marcus wasn't 'dumb' — he was driven by social comparison and present bias",
          "Jaylen wasn't 'cheap' — he understood delayed gratification",
          "The gap between them: $22,400 in just 3 years",
          "This gap compounds — after 10 years it could be $100,000+"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych1-aq1",
          question: "Based on the scenario, what psychological trap primarily drove Marcus's spending?",
          options: [
            "Loss aversion — he feared realizing any financial losses",
            "Social comparison — he spent to match what others around him had",
            "Mental accounting — he treated each paycheck as separate money",
            "Anchoring bias — he fixated on the original sticker prices shown"
          ],
          correctAnswer: 1,
          explanation: "Marcus bought sneakers and financed a car to match the lifestyle he saw around him — classic social comparison. He wasn't afraid of losing money (loss aversion) or fixating on prices (anchoring). He was spending to 'keep up' rather than building for his future. In real life, social media amplifies this trap massively."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Intelligence alone doesn't prevent financial mistakes — behavior matters more",
          "Present bias makes us overvalue immediate rewards over larger future ones",
          "Loss aversion means we feel losses ~2x more than equivalent gains",
          "Social comparison drives people to spend beyond their means",
          "Awareness of these psychological traps is the first step to building wealth"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "psych1-mastery1",
            question: "A person receives a $1,000 tax refund and immediately spends it on a vacation, even though they have credit card debt. Which bias best explains this?",
            options: [
              "Anchoring bias — they fixated on the refund amount shown",
              "Mental accounting — they treated the refund as bonus money",
              "Confirmation bias — they only saw data supporting the trip",
              "Survivorship bias — they only noticed people who traveled"
            ],
            correctAnswer: 1,
            explanation: "Mental accounting means treating money differently based on its source. The tax refund feels like 'free money' or 'bonus money,' so they spend it freely — even though rationally, $1,000 toward credit card debt (which charges 20%+ interest) would save them hundreds. All dollars are equal regardless of their source."
          },
          {
            id: "psych1-mastery2",
            question: "Which statement best describes 'loss aversion'?",
            options: [
              "People strongly prefer guaranteed small gains over any risky gains",
              "People feel the pain of losing money roughly twice as much as gaining it",
              "People avoid investing because they fear the stock market crashing",
              "People prefer to keep money in savings rather than spending any of it"
            ],
            correctAnswer: 1,
            explanation: "Loss aversion, discovered by Kahneman and Tversky, shows that losing $100 feels roughly twice as painful as gaining $100 feels good. This explains why people hold losing investments too long (to avoid 'realizing' the loss) and sell winning ones too early (to 'lock in' the gain). It's not about being scared of investing — it's about how our brains weigh gains vs. losses asymmetrically."
          },
          {
            id: "psych1-mastery3",
            question: "If someone consistently chooses to buy $5 coffees daily instead of investing $150/month, they are most affected by:",
            options: [
              "Inflation risk — their money is losing purchasing power daily",
              "Present bias — they prefer immediate rewards over future gains",
              "Market volatility — they are nervous about stock price changes",
              "Compound interest — they misunderstand how growth rates work"
            ],
            correctAnswer: 1,
            explanation: "Present bias is the tendency to prefer smaller immediate rewards ($5 coffee now) over larger future ones ($150/month invested could grow to $50,000+ over 15 years). The daily coffee brings instant pleasure while investing feels abstract and distant. Understanding this bias helps you design systems (like auto-invest) that work around it."
          },
          {
            id: "psych1-mastery4",
            question: "70% of lottery winners go bankrupt within a few years primarily because:",
            options: [
              "The government takes most of their winnings through heavy taxes",
              "They tend to invest in risky stocks that eventually lose value",
              "Their spending habits and financial psychology don't change at all",
              "Inflation erodes their large lump-sum wealth faster than expected"
            ],
            correctAnswer: 2,
            explanation: "While taxes do reduce winnings, the primary reason lottery winners go broke is behavioral — they never developed the financial discipline, habits, or mindset to manage large sums. They overspend, make impulsive decisions, and fall prey to every psychological trap we discussed. Money amplifies who you already are; it doesn't create financial discipline."
          }
        ]
      }
    ]
  },

  // PSYCH-2: Delayed Gratification
  {
    lessonId: "psych-2",
    sections: [
      {
        type: "concept",
        title: "The Power of Waiting",
        paragraphs: [
          "In 1972, psychologist Walter Mischel conducted the famous 'Marshmallow Experiment' at Stanford University. Children were offered one marshmallow immediately, or two marshmallows if they could wait 15 minutes. The results were surprising — and have profound implications for your financial future.",
          "Follow-up studies tracked these children for decades. Those who waited for the second marshmallow scored higher on SATs, had lower rates of obesity, earned more money, and reported higher life satisfaction. The ability to delay gratification turned out to be one of the strongest predictors of success in life.",
          "In personal finance, delayed gratification is the foundation of every wealth-building strategy. Saving, investing, and living below your means all require choosing a bigger future reward over a smaller immediate one."
        ],
        bullets: [
          "Delayed gratification means choosing a larger later reward over a smaller immediate one",
          "It's a skill that can be practiced and strengthened — not a fixed trait",
          "Every savings deposit is an act of delayed gratification",
          "Compound interest rewards delayed gratification exponentially",
          "Strategies like the '24-hour rule' can help build this muscle"
        ],
        realWorldExample: "Warren Buffett, one of the world's richest people, still lives in the house he bought in 1958 for $31,500. He drives a modest car and famously eats McDonald's breakfast. His entire fortune was built on extreme delayed gratification — reinvesting profits instead of spending them. He earned 99% of his $100+ billion after age 50, because compounding rewards patience."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych2-mc1",
            question: "In the Marshmallow Experiment, children who waited for the second marshmallow later showed:",
            options: [
              "Higher rates of impulsive spending and risk-taking behavior",
              "Better life outcomes including higher earnings and test scores",
              "No significant differences compared to those who ate it early",
              "Higher levels of stress, anxiety, and emotional difficulties"
            ],
            correctAnswer: 1,
            explanation: "The ability to delay gratification at age 4 predicted better outcomes decades later — including higher SAT scores, better health, and higher incomes. This doesn't mean you're 'doomed' if you struggle with patience — it's a skill you can develop with practice."
          }
        ]
      },
      {
        type: "scenario",
        title: "Sophia's Phone Dilemma",
        narrative: "Sophia, a high school junior, has saved $800 from her part-time job. The new iPhone just came out for $1,000 — she'd need to dip into savings and add $200 on a credit card. Her current phone works fine. Alternatively, she could invest that $800 and keep using her current phone for another year.",
        details: [
          "If she buys the phone: $800 gone + $200 debt at 22% APR = ~$244 cost with interest",
          "If she invests $800 at 10% annual return for 10 years: ~$2,075",
          "The true cost of the phone isn't $1,000 — it's the $2,075 she gives up",
          "This concept is called 'opportunity cost' — every purchase has a hidden price"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych2-aq1",
          question: "What is the real financial cost of Sophia buying the phone today instead of investing?",
          options: [
            "Exactly $1,000 — the retail price of the phone itself",
            "About $1,244 — the phone price plus credit card interest charges",
            "Roughly $2,075 — the future value of the money she gives up",
            "Only $800 — just the savings she would need to withdraw today"
          ],
          correctAnswer: 2,
          explanation: "The true cost of any purchase includes its opportunity cost — what that money could have become. Sophia's $800 invested at 10% for 10 years grows to ~$2,075. So buying the phone doesn't cost $1,000; it costs $2,075 in lost future wealth PLUS the $244 in credit card interest. Delayed gratification means understanding this hidden math."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Delayed gratification is choosing larger future rewards over smaller immediate ones",
          "The Marshmallow Experiment showed it predicts long-term success",
          "It's a learnable skill — strategies like the 24-hour rule can help",
          "Every purchase has an opportunity cost (what the money could have become)",
          "Compound interest is the financial reward for patience"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "psych2-mastery1",
            question: "The '24-hour rule' for purchases is an example of:",
            options: [
              "A compound interest calculation technique for investments",
              "A delayed gratification strategy for spending decisions",
              "A budgeting formula used by financial advisors regularly",
              "A banking regulation that limits withdrawal frequencies"
            ],
            correctAnswer: 1,
            explanation: "The 24-hour rule — waiting a full day before making non-essential purchases — is a practical delayed gratification technique. It creates a 'cooling off' period that lets rational thinking override impulsive emotions. Many people find that after 24 hours, they no longer want the item."
          },
          {
            id: "psych2-mastery2",
            question: "If you invest $500 today at 8% annual return instead of spending it, approximately how much would it be worth in 20 years?",
            options: [
              "About $600 — a modest gain from slow interest growth",
              "About $1,300 — roughly doubling from steady returns",
              "About $2,330 — over 4x growth from compound returns",
              "About $5,000 — tenfold returns from aggressive investing"
            ],
            correctAnswer: 2,
            explanation: "Using compound interest: $500 × (1.08)^20 = ~$2,330. This is the power of patience — your $500 grows to over 4.5x its original value by simply waiting. Every dollar you spend today has this hidden future value. Understanding this makes delayed gratification feel less like sacrifice and more like smart strategy."
          },
          {
            id: "psych2-mastery3",
            question: "Warren Buffett earned 99% of his wealth after age 50. This primarily demonstrates:",
            options: [
              "That you should delay investing until you are much older",
              "The exponential power of compound returns over long periods",
              "That the stock market always trends upward without any risk",
              "That billionaires get special investment access unavailable to others"
            ],
            correctAnswer: 1,
            explanation: "Buffett started investing at age 11 and let his money compound for decades. Compounding is exponential — growth accelerates over time. The first $1M took decades; going from $50B to $100B took just a few years. This demonstrates why starting early AND being patient matters — time is the most powerful ingredient in building wealth."
          },
          {
            id: "psych2-mastery4",
            question: "Which of these best explains 'opportunity cost' in personal finance?",
            options: [
              "The fee you pay when you first open an investment account",
              "The value of what you give up when choosing one option instead",
              "The total cost of missing a limited-time sale or discount deal",
              "The annual interest rate that a savings account pays you"
            ],
            correctAnswer: 1,
            explanation: "Opportunity cost is the value of the next best alternative you give up. When you spend $100 on shoes, the opportunity cost isn't just $100 — it's what that $100 could have become if invested. A 16-year-old who invests $100 instead of spending it could have $2,000+ by retirement. Every financial choice has this hidden trade-off."
          }
        ]
      }
    ]
  },

  // PSYCH-3: Instant vs Long-Term Reward
  {
    lessonId: "psych-3",
    sections: [
      {
        type: "concept",
        title: "Your Brain's Internal Battle",
        paragraphs: [
          "Inside your brain, two systems are constantly competing. The limbic system (your 'emotional brain') wants rewards NOW — dopamine hits from buying things, eating junk food, or scrolling social media. The prefrontal cortex (your 'rational brain') can plan ahead and consider consequences. Financial success depends on which system wins more often.",
          "Marketers know this. Every '1-click buy,' 'limited time offer,' and 'buy now, pay later' scheme is designed to activate your limbic system before your prefrontal cortex can intervene. Understanding this battle gives you a massive advantage.",
          "The good news: you can train your prefrontal cortex to be stronger. Every time you pause before a purchase, compare prices, or stick to a budget, you're building neural pathways that make future financial discipline easier."
        ],
        bullets: [
          "Limbic system: fast, emotional, wants instant reward — 'I need this NOW'",
          "Prefrontal cortex: slow, rational, plans ahead — 'Will I still want this next week?'",
          "Marketing triggers your limbic system with urgency, scarcity, and social proof",
          "The '10-10-10 rule': How will I feel about this purchase in 10 minutes, 10 months, 10 years?",
          "Automation (auto-save, auto-invest) bypasses the emotional brain entirely"
        ],
        realWorldExample: "Amazon's '1-Click Buy' button was specifically engineered to eliminate the gap between impulse and purchase. By removing friction (typing payment info, confirming), it prevents your prefrontal cortex from engaging. Amazon reportedly generates billions in additional revenue from this single feature. Adding friction back (deleting saved cards, using wishlists instead of carts) is a powerful defense."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych3-mc1",
            question: "Why do 'Buy Now, Pay Later' services appeal to consumers?",
            options: [
              "They save consumers money in the long run",
              "They activate the limbic system by removing the immediate pain of paying",
              "They help build credit scores",
              "They offer better interest rates than credit cards"
            ],
            correctAnswer: 1,
            explanation: "BNPL removes the 'pain of paying' — your limbic system gets the dopamine hit of receiving the item without the immediate sting of the payment. The rational brain is bypassed because the cost feels abstract ('just $25/month'). This is why BNPL users spend 20-30% more than they would with cash."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Sneaker Drop",
        narrative: "Tyler sees a limited-edition sneaker drop for $250. The website shows '3 LEFT IN YOUR SIZE' with a countdown timer. His heart races — he has $300 in his checking account but rent is due in 5 days ($280). His finger hovers over 'Buy Now.' He uses the 10-10-10 rule: In 10 minutes he'll feel excited. In 10 months the sneakers will be scuffed. In 10 years he won't remember them at all — but he might remember being late on rent.",
        details: [
          "The 'scarcity' (3 left) and 'urgency' (countdown) are classic limbic triggers",
          "Tyler's emotional brain screams 'NOW!' while his rational brain says 'rent first'",
          "The 10-10-10 rule gave his prefrontal cortex time to engage",
          "If Tyler put $250 into an index fund instead, it could be worth $1,600+ in 20 years"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych3-aq1",
          question: "Which marketing technique was the sneaker website using to trigger Tyler's limbic system?",
          options: [
            "Price anchoring — showing a higher 'original' price",
            "Artificial scarcity and urgency — countdown timer and limited stock messages",
            "Social proof — showing other buyers",
            "Loss leader — selling below cost to attract customers"
          ],
          correctAnswer: 1,
          explanation: "The '3 LEFT' message and countdown timer create artificial scarcity and urgency — classic techniques that trigger the limbic system's fear of missing out (FOMO). The scarcity may not even be real (many sites show this to every visitor). Recognizing these tactics is the first step to defending against them."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Your brain has two competing systems: emotional (limbic) and rational (prefrontal cortex)",
          "Marketing deliberately targets your emotional brain to drive impulse purchases",
          "The 10-10-10 rule helps engage rational thinking before buying",
          "Automation (auto-save) bypasses emotional decision-making entirely",
          "Adding friction to purchases (removing saved cards) protects against impulse spending"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "psych3-mastery1",
            question: "Which brain region is responsible for long-term financial planning?",
            options: [
              "The amygdala",
              "The hippocampus",
              "The prefrontal cortex",
              "The limbic system"
            ],
            correctAnswer: 2,
            explanation: "The prefrontal cortex handles executive functions: planning, impulse control, and weighing consequences. It's the brain region that says 'Maybe I should save that money instead.' The limbic system is the emotional center that drives impulsive decisions. Building strong prefrontal cortex habits through practice leads to better financial outcomes."
          },
          {
            id: "psych3-mastery2",
            question: "Auto-investing every paycheck is effective because it:",
            options: [
              "Guarantees higher returns",
              "Removes emotional decision-making from the investing process",
              "Avoids all investment fees",
              "Eliminates all investment risk"
            ],
            correctAnswer: 1,
            explanation: "Automation works because it removes the decision point entirely. You never face the choice of 'should I invest or spend?' — the money moves automatically before your emotional brain can intervene. This is why financial advisors universally recommend automated savings and investing — it works with human psychology instead of against it."
          },
          {
            id: "psych3-mastery3",
            question: "BNPL (Buy Now, Pay Later) users spend 20-30% more than cash users primarily because:",
            options: [
              "BNPL offers discounts",
              "BNPL separates the pleasure of buying from the pain of paying",
              "Cash is less convenient",
              "BNPL has lower fees than credit cards"
            ],
            correctAnswer: 1,
            explanation: "When you pay cash, you feel an immediate 'pain of paying' that naturally limits spending. BNPL decouples the reward (getting the item) from the cost (paying later), so your brain registers pleasure without pain. Research shows this leads to 20-30% higher spending and increased rates of buyer's remorse."
          }
        ]
      }
    ]
  },

  // PSYCH-4: Scarcity vs Abundance Mindset
  {
    lessonId: "psych-4",
    sections: [
      {
        type: "concept",
        title: "How Your Money Mindset Shapes Your Reality",
        paragraphs: [
          "A 'scarcity mindset' sees money as a limited pie — if someone else gets more, you get less. It leads to hoarding, anxiety, and short-term thinking. An 'abundance mindset' sees money as something that can be created, grown, and multiplied. It leads to investing, generosity, and long-term strategy.",
          "Neither mindset is entirely right or wrong, but research shows that people with an abundance mindset make consistently better financial decisions. They invest more, take calculated risks, and think in terms of growing the pie rather than just protecting their slice.",
          "Your money mindset often comes from how you grew up. If your family constantly worried about money, you may have inherited a scarcity mindset without realizing it. The key is recognizing your default patterns and consciously choosing a more productive perspective."
        ],
        bullets: [
          "Scarcity mindset: 'There's never enough' → hoarding, fear, short-term decisions",
          "Abundance mindset: 'I can create more' → investing, growth, long-term strategy",
          "Your mindset is often inherited from family and environment",
          "Scarcity thinking triggers stress hormones that literally impair decision-making",
          "Abundance doesn't mean reckless — it means strategic and growth-oriented"
        ],
        realWorldExample: "Studies by Princeton researchers showed that financial scarcity actually reduces cognitive function by the equivalent of 13 IQ points. When people are stressed about money, their brains literally can't make decisions as well. This creates a vicious cycle: scarcity → bad decisions → more scarcity. Breaking the cycle starts with shifting your mindset and building even a small financial buffer."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych4-mc1",
            question: "How does a scarcity mindset affect financial decision-making?",
            options: [
              "It leads to better savings habits",
              "It causes short-term thinking and fear-based decisions",
              "It has no effect on financial outcomes",
              "It encourages more investing"
            ],
            correctAnswer: 1,
            explanation: "Scarcity mindset creates anxiety that drives short-term, fear-based decisions — like keeping all money in a checking account instead of investing, or avoiding any risk even when it's calculated. People in scarcity mode focus on protecting what they have rather than growing it, which often leads to worse long-term outcomes."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Brothers, Same Inheritance",
        narrative: "Brothers David and Michael each inherit $10,000 from their grandmother. David, with a scarcity mindset, immediately puts all $10,000 in a savings account earning 0.5% interest — he's terrified of losing it. Michael, with an abundance mindset, keeps $2,000 as emergency savings and invests $8,000 in a diversified index fund. Five years later, David has $10,252. Michael has $2,000 in savings plus approximately $12,000 in investments (assuming 8% average return).",
        details: [
          "David's approach: Safe but barely beat inflation — his money actually lost purchasing power",
          "Michael's approach: Strategic risk — kept safety net but let most money grow",
          "Neither was 'wrong' but Michael's mindset led to ~$3,750 more wealth in 5 years",
          "The key difference was how they THOUGHT about money, not how much they had"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych4-aq1",
          question: "Why did David's 'safe' approach actually cost him money?",
          options: [
            "The bank charged him hidden fees",
            "His 0.5% return was lower than inflation (~3%), so his purchasing power decreased",
            "He spent too much from the savings account",
            "The FDIC didn't protect his deposit"
          ],
          correctAnswer: 1,
          explanation: "With inflation at ~3% and his savings earning only 0.5%, David's money lost ~2.5% of its purchasing power each year. After 5 years, his $10,252 could buy less than his original $10,000 could have. Being 'safe' with money can actually be risky when inflation is considered — this is called 'inflation risk' and it's the hidden danger of a pure scarcity mindset."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Scarcity mindset leads to hoarding and fear-based decisions",
          "Abundance mindset enables strategic growth and calculated risk-taking",
          "Financial stress reduces cognitive ability by ~13 IQ points",
          "Being 'too safe' with money (low-interest savings) can lose purchasing power to inflation",
          "Your money mindset can be consciously changed through awareness and practice"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "psych4-mastery1",
            question: "Financial scarcity reduces cognitive function by the equivalent of:",
            options: ["3 IQ points", "7 IQ points", "13 IQ points", "25 IQ points"],
            correctAnswer: 2,
            explanation: "Princeton researchers found that the cognitive load of financial stress is equivalent to losing 13 IQ points — comparable to losing an entire night of sleep. This means people under financial stress are literally less able to make good decisions, creating a cycle that's hard to break without intentional mindset shifts and building financial buffers."
          },
          {
            id: "psych4-mastery2",
            question: "What is 'inflation risk'?",
            options: [
              "The risk that prices will decrease over time",
              "The risk that your money's purchasing power decreases even while sitting 'safely' in a bank",
              "The risk of investing in inflation-protected securities",
              "The risk that the government will print less money"
            ],
            correctAnswer: 1,
            explanation: "Inflation risk means your money buys less over time even if the dollar amount stays the same. If inflation is 3% and your savings earn 0.5%, you're effectively losing 2.5% per year. A coffee that costs $5 today will cost $6.72 in 10 years at 3% inflation. This is why investing (not just saving) is essential for long-term wealth."
          },
          {
            id: "psych4-mastery3",
            question: "An abundance mindset in finance means:",
            options: [
              "Spending freely because money will always come",
              "Believing money can be created and grown through strategic action",
              "Ignoring financial risks because everything will work out",
              "Giving away all your money to prove you don't fear loss"
            ],
            correctAnswer: 1,
            explanation: "Abundance mindset doesn't mean recklessness — it means believing you can grow wealth through education, smart investing, and strategic action. It's the difference between 'I can't afford that' (scarcity) and 'How can I afford that?' (abundance). It drives people to learn, invest, and take calculated risks rather than hoarding out of fear."
          }
        ]
      }
    ]
  },

  // PSYCH-5: Money & Emotions
  {
    lessonId: "psych-5",
    sections: [
      {
        type: "concept",
        title: "The Emotional Spending Cycle",
        paragraphs: [
          "Have you ever bought something just because you were stressed, bored, or sad? You're not alone — emotional spending is one of the most common financial behaviors. Studies show that 72% of Americans report making purchases influenced by their emotions, costing an average of $2,100 per year in unplanned spending.",
          "Emotional spending follows a predictable cycle: trigger (stress, boredom, sadness) → impulse (I deserve a treat) → purchase (temporary dopamine hit) → guilt (I shouldn't have spent that) → more stress → repeat. Breaking this cycle requires understanding your personal triggers.",
          "The goal isn't to eliminate emotions from financial decisions — that's impossible. The goal is to create space between the emotion and the action, so you can respond thoughtfully rather than react impulsively."
        ],
        bullets: [
          "72% of Americans make emotion-driven purchases, costing ~$2,100/year",
          "Common triggers: stress, boredom, sadness, celebration, FOMO",
          "The dopamine hit from buying is temporary — usually fading within hours",
          "'Retail therapy' provides short-term relief but often increases long-term stress",
          "Journaling spending triggers can reveal your personal patterns"
        ],
        realWorldExample: "After the COVID-19 pandemic began, online shopping surged 77% as people coped with stress and isolation through purchasing. The average consumer spent $182 per month on impulse purchases during lockdowns. Many reported feeling temporarily better but then experiencing guilt and financial anxiety — the classic emotional spending cycle in action."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych5-mc1",
            question: "The emotional spending cycle follows this pattern:",
            options: [
              "Plan → Save → Buy → Enjoy",
              "Trigger → Impulse → Purchase → Guilt → More Stress",
              "Research → Compare → Buy → Satisfaction",
              "Earn → Budget → Spend → Save"
            ],
            correctAnswer: 1,
            explanation: "Emotional spending follows: trigger (stress/boredom) → impulse (I need this) → purchase (dopamine hit) → guilt (I shouldn't have) → more stress (which triggers more spending). It's a self-reinforcing cycle. Breaking it requires inserting a pause between trigger and impulse."
          }
        ]
      },
      {
        type: "scenario",
        title: "Aisha's Tough Week",
        narrative: "Aisha failed her math test on Monday, argued with her best friend on Wednesday, and got passed over for a promotion at her part-time job on Thursday. By Friday, she's scrolling online shops. She adds $340 worth of clothes to her cart — items she doesn't need but that make her feel temporarily powerful and in control. Her thumb hovers over 'Place Order.' She has $500 in savings earmarked for a summer road trip with friends.",
        details: [
          "Aisha's trigger: accumulated stress from multiple negative events",
          "The shopping provides an illusion of control during a powerless-feeling week",
          "If she buys: temporary mood boost, then guilt, plus $340 less for her trip",
          "Alternative: journaling, calling a friend, going for a walk — free coping mechanisms"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych5-aq1",
          question: "What is the most effective way for Aisha to break the emotional spending cycle in this moment?",
          options: [
            "Add more items to feel even better",
            "Buy just one item as a compromise",
            "Close the browser, journal about her feelings, and revisit the cart in 24 hours",
            "Switch to a different shopping website with better deals"
          ],
          correctAnswer: 2,
          explanation: "Closing the browser creates space between emotion and action. Journaling addresses the real emotional need (processing stress), and the 24-hour rule lets her prefrontal cortex re-engage. Buying 'just one item' still feeds the cycle. The goal isn't to never buy things — it's to buy them from a place of intention, not emotion."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Emotional spending costs the average American ~$2,100/year",
          "The spending cycle: trigger → impulse → purchase → guilt → stress",
          "Common triggers include stress, boredom, sadness, and FOMO",
          "Creating space between emotion and action is the key to breaking the cycle",
          "Free alternatives (journaling, exercise, calling a friend) address the real emotional need"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "psych5-mastery1",
            question: "Why does 'retail therapy' ultimately increase financial stress?",
            options: [
              "Because stores charge more when you're emotional",
              "Because the dopamine fades quickly and is replaced by guilt and financial anxiety",
              "Because emotional purchases are always low quality",
              "Because banks flag emotional purchases as fraud"
            ],
            correctAnswer: 1,
            explanation: "The dopamine from purchasing fades within hours, but the financial impact remains. The guilt of unplanned spending adds to existing stress, creating a cycle: stress → spend → guilt → more stress → spend more. This is why 'treating yourself' as a coping mechanism often makes things worse, not better."
          },
          {
            id: "psych5-mastery2",
            question: "Which is the BEST strategy for managing emotional spending?",
            options: [
              "Never buy anything enjoyable",
              "Only shop when in a good mood",
              "Identify your emotional triggers and create a pause before purchasing",
              "Cut up all credit cards"
            ],
            correctAnswer: 2,
            explanation: "The most effective approach is self-awareness: know your triggers and build in a pause (like the 24-hour rule). Never buying fun things is unsustainable. Shopping when in a good mood still leads to impulse buys. Cutting up cards is extreme and doesn't address the underlying behavior. Understanding your patterns gives you lasting control."
          },
          {
            id: "psych5-mastery3",
            question: "During COVID lockdowns, online impulse spending increased primarily because:",
            options: [
              "Products were cheaper online during COVID",
              "People used shopping to cope with stress, boredom, and loss of control",
              "Government stimulus checks made everyone wealthier",
              "Delivery services became faster during the pandemic"
            ],
            correctAnswer: 1,
            explanation: "Lockdowns created a perfect storm of emotional spending triggers: stress, boredom, isolation, loss of control, and anxiety. Online shopping provided a temporary sense of control and pleasure. The 77% surge in online shopping wasn't because people needed more stuff — it was emotional coping behavior on a massive scale."
          }
        ]
      }
    ]
  },

  // PSYCH-6: Social Influence & Spending
  {
    lessonId: "psych-6",
    sections: [
      {
        type: "concept",
        title: "Keeping Up With Everyone Else",
        paragraphs: [
          "Humans are social creatures. We naturally compare ourselves to others — and in the age of social media, we're comparing ourselves to curated highlight reels 24/7. This drives a phenomenon called 'lifestyle inflation' or 'keeping up with the Joneses,' where people spend money they don't have to maintain an image they can't afford.",
          "Social media makes this exponentially worse. When you see influencers flashing luxury items, friends posting vacation photos, and classmates with new sneakers, your brain registers a gap between your life and theirs. This gap creates discomfort that spending temporarily fills.",
          "Here's the reality: most people showing off wealth on social media are not wealthy. Studies show that the majority of millionaires drive used cars, live in modest homes, and rarely post about money. True wealth is invisible."
        ],
        bullets: [
          "People spend $5,400/year on average to 'keep up' with social expectations",
          "60% of millennials report spending money they don't have due to social media influence",
          "Most social media 'wealth' is financed by debt, not actual wealth",
          "The average influencer promoting luxury products often can't afford them personally",
          "True financial independence means your spending is driven by values, not comparison"
        ],
        realWorldExample: "Thomas Stanley, who studied 1,000+ millionaires for his book 'The Millionaire Next Door,' found that the typical millionaire drives a Toyota, shops at regular stores, and has never spent more than $300 on a watch. Meanwhile, people earning $200K+ who 'look rich' often have negative net worth because they spend everything maintaining appearances."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych6-mc1",
            question: "According to research, the typical millionaire's lifestyle is:",
            options: [
              "Flashy with luxury cars and designer clothes",
              "Modest — driving regular cars and living below their means",
              "Average — spending exactly what they earn",
              "Extremely frugal — never spending on anything enjoyable"
            ],
            correctAnswer: 1,
            explanation: "Research consistently shows that true millionaires live modestly. They build wealth by spending less than they earn and investing the difference — not by displaying wealth. The people who 'look rich' with expensive cars and clothes are often spending everything (or more) to maintain that image."
          }
        ]
      },
      {
        type: "scenario",
        title: "Jordan's Social Media Trap",
        narrative: "Jordan, a college freshman earning $1,200/month from a campus job, follows several 'finance influencers' who post about their luxury watches, cars, and travel. Feeling like he's 'behind,' Jordan signs up for a $200/month luxury subscription box and starts eating at expensive restaurants ($150/month) to post on his Instagram. Within 4 months, he's $1,400 in credit card debt.",
        details: [
          "Jordan's $350/month in 'image spending' is 29% of his income",
          "The influencers he follows earn money FROM their content — their lifestyle IS their job",
          "Many influencers receive products for free or are paid to promote them",
          "Jordan is comparing his behind-the-scenes to everyone else's highlight reel"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych6-aq1",
          question: "What is the core financial mistake Jordan is making?",
          options: [
            "He's not earning enough money at his campus job",
            "He's letting social comparison drive spending decisions beyond his means",
            "He should find better deals on luxury items",
            "He's not following enough finance influencers for advice"
          ],
          correctAnswer: 1,
          explanation: "Jordan's income isn't the problem — his spending motivation is. He's spending to project an image rather than align with his actual financial reality. The solution isn't earning more (which he'd likely spend to maintain the image) — it's decoupling his self-worth from social comparison and building spending habits based on his values and budget."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Social comparison drives an average of $5,400/year in unnecessary spending",
          "Social media shows curated highlights, not financial reality",
          "Most true millionaires live modestly and don't display wealth",
          "Influencer lifestyles are often financed by brand deals, not personal wealth",
          "Financial independence means spending based on values, not comparison"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "psych6-mastery1",
            question: "'The Millionaire Next Door' research found that most millionaires:",
            options: [
              "Drive luxury cars and wear designer clothes",
              "Inherited their wealth from family",
              "Live below their means and prioritize saving over spending",
              "Made their money through cryptocurrency"
            ],
            correctAnswer: 2,
            explanation: "Stanley's research revealed that 80% of millionaires are first-generation rich — they built wealth through consistent saving, investing, and living below their means. The typical millionaire's lifestyle would be unremarkable to look at. Wealth building is a marathon of discipline, not a sprint of spending."
          },
          {
            id: "psych6-mastery2",
            question: "60% of millennials report spending money they don't have. The primary driver is:",
            options: [
              "Low wages and high cost of living",
              "Social media influence and the desire to match peers' perceived lifestyles",
              "Lack of financial education in schools",
              "Predatory lending practices"
            ],
            correctAnswer: 1,
            explanation: "While wages and education matter, the primary driver of overspending among young people is social media-fueled comparison. Seeing curated lifestyles 24/7 creates pressure to spend beyond one's means. This is why financial literacy must include social-emotional skills — understanding the psychology behind spending is as important as knowing how to budget."
          },
          {
            id: "psych6-mastery3",
            question: "The best defense against social comparison spending is:",
            options: [
              "Deleting all social media accounts",
              "Making more money to afford the lifestyle",
              "Defining your own values and making spending decisions aligned with them",
              "Only following people who earn less than you"
            ],
            correctAnswer: 2,
            explanation: "Values-based spending means deciding what matters to YOU — not what Instagram shows. If travel matters, budget for it. If fitness matters, invest in it. But do it because it aligns with your values, not because someone else posted about it. Deleting social media is extreme; making more money just feeds the cycle. Clarity of values is the sustainable solution."
          }
        ]
      }
    ]
  },

  // PSYCH-7: Advertising & Consumer Behavior
  {
    lessonId: "psych-7",
    sections: [
      {
        type: "concept",
        title: "How Marketing Hacks Your Brain",
        paragraphs: [
          "Companies spend over $700 billion per year on advertising globally. That money isn't wasted — it's a precise investment in manipulating your decision-making. Modern marketing uses psychology, neuroscience, and data science to influence what you buy, when you buy it, and how much you pay.",
          "The most effective marketing doesn't feel like marketing at all. Product placements in movies, sponsored posts that look like regular content, and 'unboxing' videos from influencers are all designed to bypass your skepticism. When you don't know you're being sold to, your defenses are down.",
          "Understanding common marketing tactics doesn't make you immune, but it gives you a crucial advantage: the ability to pause and ask, 'Am I choosing this, or am I being manipulated into it?'"
        ],
        bullets: [
          "Anchoring: showing a high 'original' price to make the sale price feel like a deal",
          "Scarcity: 'Only 3 left!' creates urgency that overrides rational thinking",
          "Social proof: '10,000 people bought this' leverages herd mentality",
          "Decoy pricing: adding an overpriced option to make the middle option seem reasonable",
          "Loss framing: 'Don't miss out!' is more motivating than 'You could gain this!'"
        ],
        realWorldExample: "Netflix uses decoy pricing brilliantly. Their plans: Basic ($6.99), Standard ($15.49), Premium ($22.99). The Basic plan is intentionally limited (no HD, one screen) to make Standard look like a great deal. Most people choose Standard — which is exactly what Netflix wants. The Basic plan exists not to be chosen, but to make Standard feel like good value."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych7-mc1",
            question: "What is 'decoy pricing'?",
            options: [
              "Offering a product for free to attract customers",
              "Adding an intentionally unattractive option to make the target option look better by comparison",
              "Pricing products below cost to eliminate competitors",
              "Changing prices based on demand"
            ],
            correctAnswer: 1,
            explanation: "Decoy pricing introduces an option that's not meant to be chosen — it exists solely to make the preferred option look more attractive. Like Netflix's Basic plan, movie theater 'small' popcorn ($5) next to 'large' ($7) makes large seem like a deal, even though you might not have bought any popcorn at all."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Black Friday Effect",
        narrative: "Maya is excited for Black Friday deals. She sees a jacket 'originally' $300, now 'marked down' to $120 — 60% off! She feels like she's saving $180. However: the jacket was never actually sold at $300 (the retailer inflated the 'original' price for the sale). Similar jackets at other stores cost $100 year-round. By thinking she 'saved' $180, Maya actually overpaid by $20 — and bought a jacket she hadn't planned on buying.",
        details: [
          "The 'original' $300 price is an anchor — it makes $120 feel like a steal",
          "In reality, Maya compared to a fake number, not to actual market value",
          "She also fell for 'loss framing' — fear of 'missing' the 60% off deal",
          "The best deal is often no deal — if you didn't plan to buy it, any price is overspending"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych7-aq1",
          question: "The 'original' $300 price on Maya's jacket serves as a:",
          options: [
            "Fair market value assessment",
            "Psychological anchor to make the sale price feel like a bargain",
            "Legal requirement for disclosure",
            "Manufacturer's suggested retail price"
          ],
          correctAnswer: 1,
          explanation: "Anchoring is one of the most powerful cognitive biases in marketing. By showing an inflated 'original' price, the retailer created a reference point that made $120 feel like a deal — even though the jacket's actual value was ~$100. Always research prices independently rather than relying on a retailer's 'original' price."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Companies spend $700B+ annually on advertising to influence your decisions",
          "Anchoring, scarcity, social proof, and decoy pricing are key manipulation tactics",
          "The most effective marketing doesn't feel like marketing",
          "If you didn't plan to buy it, any discount is overspending",
          "Ask: 'Am I choosing this, or am I being manipulated into it?'"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "psych7-mastery1",
            question: "A store displays: Small Coffee $4.50, Medium $5.00, Large $5.25. This pricing strategy uses:",
            options: [
              "Loss leader pricing",
              "Dynamic pricing",
              "Decoy pricing — the Small makes Medium/Large look like much better value",
              "Penetration pricing"
            ],
            correctAnswer: 2,
            explanation: "The small coffee at $4.50 is the decoy. It's priced so close to Medium ($5.00) that upgrading seems obvious — 'why not pay 50 cents more for more coffee?' Then the Large at $5.25 seems like an even better deal. The store's goal is to sell you the most product possible, and the Small exists to push you toward larger sizes."
          },
          {
            id: "psych7-mastery2",
            question: "Why are 'limited time offers' so effective at driving sales?",
            options: [
              "Because the products are genuinely rare",
              "Because time pressure activates the limbic system and reduces rational evaluation",
              "Because companies lose money on these deals",
              "Because consumers have more money during limited periods"
            ],
            correctAnswer: 1,
            explanation: "Time pressure triggers your limbic system's fear response — specifically FOMO (fear of missing out). When you feel urgency, your prefrontal cortex (rational brain) gets overridden. You make faster, less thoughtful decisions. This is why sales ending 'tonight only!' drive impulse purchases that wouldn't happen with unlimited time to think."
          },
          {
            id: "psych7-mastery3",
            question: "The most effective defense against manipulative marketing is:",
            options: [
              "Never shopping at stores that run sales",
              "Always buying the cheapest option available",
              "Researching prices independently and shopping with a predetermined list",
              "Only buying products that aren't advertised"
            ],
            correctAnswer: 2,
            explanation: "Shopping with a list and doing independent price research removes the power of anchoring, scarcity, and impulse triggers. You're comparing to real market value rather than manufactured 'original' prices. Sales aren't inherently bad — they're bad when they cause you to buy things you didn't intend to buy or pay more than something is worth."
          }
        ]
      }
    ]
  },

  // PSYCH-8: Behavioral Traps
  {
    lessonId: "psych-8",
    sections: [
      {
        type: "concept",
        title: "Cognitive Biases That Drain Your Wallet",
        paragraphs: [
          "Cognitive biases are systematic errors in thinking that affect everyone — even financial experts. They're mental shortcuts (heuristics) that helped our ancestors survive but can sabotage modern financial decisions. Understanding them doesn't eliminate them, but it dramatically reduces their power over your choices.",
          "There are over 180 documented cognitive biases, but a handful are responsible for most financial mistakes. Sunk cost fallacy, confirmation bias, status quo bias, and the Dunning-Kruger effect are particularly dangerous when it comes to money.",
          "The key insight is that biases aren't about being 'dumb.' The smartest people fall for them too. The difference is that financially literate people build systems and habits that counteract biases automatically."
        ],
        bullets: [
          "Sunk cost fallacy: continuing to invest in something because you've already spent money on it",
          "Confirmation bias: only seeking information that supports what you already believe",
          "Status quo bias: sticking with current choices because change feels risky",
          "Dunning-Kruger effect: overestimating your knowledge, especially when you know little",
          "Herd mentality: following the crowd without independent analysis"
        ],
        realWorldExample: "The sunk cost fallacy is everywhere. You've watched 90 minutes of a terrible movie and think 'I've already invested 90 minutes, I should finish it.' But those 90 minutes are gone regardless — the rational choice is whether the next 30 minutes are worth it. In investing, people hold losing stocks for years because 'I've already lost $5,000 — I can't sell now.' But the stock doesn't know (or care) what you paid. The only question is: would you buy this stock today?"
        },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych8-mc1",
            question: "You've spent $500 repairing an old car. It breaks down again and needs $800 more in repairs. The sunk cost fallacy would lead you to:",
            options: [
              "Sell the car and buy a reliable one",
              "Invest $800 more because you've 'already put $500 into it'",
              "Get a second opinion from another mechanic",
              "Research the car's actual market value"
            ],
            correctAnswer: 1,
            explanation: "The sunk cost fallacy says 'I've already spent $500, so I should keep going.' But that $500 is gone regardless of your next decision. The rational question is: 'Would I choose to spend $800 on this car if I hadn't already spent anything?' If a newer, more reliable car costs $2,000, spending $800 on the old one might just delay the inevitable."
          }
        ]
      },
      {
        type: "scenario",
        title: "The Crypto Trap",
        narrative: "Kevin bought a cryptocurrency at $50 per coin after his friend told him it was 'the next Bitcoin.' It dropped to $10. Kevin refused to sell because: (1) his friend said it would recover, (2) he found Reddit posts agreeing it would go up, and (3) he already lost $4,000 and wanted to 'break even.' The coin eventually went to $0.",
        details: [
          "Kevin exhibited THREE biases: sunk cost (can't sell at a loss), confirmation bias (only reading bullish posts), and herd mentality (following friend's advice blindly)",
          "He ignored warning signs: the project had no revenue, the team was anonymous, and similar coins had failed",
          "A rational approach: set a stop-loss at purchase, research independently, accept losses early",
          "Kevin's $4,000 loss could have been a $2,000 loss if he'd sold at $25 instead of holding to $0"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych8-aq1",
          question: "Kevin only reading Reddit posts that agreed with his bullish view on the cryptocurrency is an example of:",
          options: [
            "Due diligence",
            "Confirmation bias",
            "Market research",
            "Technical analysis"
          ],
          correctAnswer: 1,
          explanation: "Confirmation bias means seeking out information that confirms what you already believe while ignoring contradicting evidence. Kevin wanted the coin to go up, so he only read posts from people who agreed. A rational investor would actively seek out bear cases and criticism — the strongest investment thesis survives scrutiny."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Cognitive biases affect everyone — even financial experts",
          "Sunk cost fallacy: past spending shouldn't drive future decisions",
          "Confirmation bias: seek contradicting evidence, not just agreement",
          "Status quo bias: review and rebalance regularly instead of 'set and forget'",
          "Build systems (stop-losses, automatic rebalancing) to counteract biases"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "psych8-mastery1",
            question: "A person keeps paying for a gym membership they never use because they 'already paid for 6 months upfront.' This is:",
            options: [
              "Good financial planning",
              "The sunk cost fallacy",
              "Loss aversion",
              "Status quo bias"
            ],
            correctAnswer: 1,
            explanation: "The 6 months already paid is a sunk cost — it's gone regardless. Continuing to pay for unused months because of past payments is irrational. The rational question: 'Starting today, is this gym membership worth the monthly cost to me?' If not, cancel it. The past payments are irrelevant to future decisions."
          },
          {
            id: "psych8-mastery2",
            question: "The Dunning-Kruger effect in investing describes:",
            options: [
              "Expert investors becoming too cautious",
              "Beginners overestimating their investing knowledge and abilities",
              "The difficulty of timing the stock market",
              "The relationship between risk and return"
            ],
            correctAnswer: 1,
            explanation: "The Dunning-Kruger effect shows that people with little knowledge tend to greatly overestimate their competence. In investing, someone who reads one article about stocks might think they can 'beat the market.' True experts, paradoxically, tend to be more humble because they understand the complexity. This is why index funds (humble approach) outperform 85% of active managers."
          },
          {
            id: "psych8-mastery3",
            question: "The best way to combat cognitive biases in financial decisions is to:",
            options: [
              "Make decisions quickly before biases can form",
              "Only trust your own instincts",
              "Build systematic rules and processes that automate rational decisions",
              "Avoid all financial decisions until you're an expert"
            ],
            correctAnswer: 2,
            explanation: "Systems beat willpower. Stop-losses automatically sell declining investments. Auto-investing removes timing decisions. Checklists ensure you evaluate all factors before buying. These systems work because they're created when you're thinking rationally and executed when you might not be. No one is immune to biases — but good systems neutralize them."
          }
        ]
      }
    ]
  },

  // PSYCH-9: Identity & Money Habits
  {
    lessonId: "psych-9",
    sections: [
      {
        type: "concept",
        title: "You Are What You Spend",
        paragraphs: [
          "Your financial habits aren't just about math — they're deeply connected to your identity. How you think about yourself ('I'm a saver' vs. 'I'm bad with money') becomes a self-fulfilling prophecy. Research shows that identity-based habits are 3x more likely to stick than goal-based ones.",
          "When someone says 'I'm not a math person,' they're not describing their ability — they're describing their identity. The same happens with money: 'I'm just not good with money' becomes permission to stay that way. Changing your financial life starts with changing how you see yourself.",
          "The good news is that identity is flexible. Every time you make a small positive financial choice — checking your balance, packing lunch, saving $5 — you're casting a vote for the identity of 'someone who's good with money.' Enough votes, and the identity shifts."
        ],
        bullets: [
          "Identity-based habits stick 3x longer than goal-based ones",
          "'I'm a saver' is more powerful than 'I want to save $1,000'",
          "Small actions ('votes') gradually shift your financial identity",
          "Money scripts — beliefs about money from childhood — shape adult behavior",
          "Common money scripts: 'Money is evil,' 'Rich people are greedy,' 'I'll never be wealthy'"
        ],
        realWorldExample: "James Clear, author of 'Atomic Habits,' describes identity change through small wins: instead of setting a goal to save $10,000, become 'the type of person who saves.' Each time you choose to save even $1, you reinforce that identity. Over time, saving becomes automatic because it's 'who you are,' not something you force yourself to do."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych9-mc1",
            question: "Why are identity-based financial habits more effective than goal-based ones?",
            options: [
              "Because identity habits don't require effort",
              "Because identity shifts change behavior automatically across all situations",
              "Because goals are always unrealistic",
              "Because identity-based habits save more money"
            ],
            correctAnswer: 1,
            explanation: "When saving becomes part of who you ARE (identity), you don't need to decide each time — the behavior flows naturally from your self-concept. A goal ('save $1,000') ends when achieved. An identity ('I'm a saver') guides every financial decision indefinitely. It's the difference between doing something and being something."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Money Scripts",
        narrative: "Twin sisters Mia and Leah grew up in the same household. Their mother always said, 'We can't afford that' and 'Money causes problems.' Mia internalized this as 'money is stressful — spend it before it causes trouble' and became an impulsive spender. Leah internalized it as 'money is scarce — save every penny' and became an anxious hoarder who never invested. Same money script, two different (but both limiting) outcomes.",
        details: [
          "Both sisters' financial behaviors stemmed from the same childhood money script",
          "Mia's version: money = stress, so spend it to relieve stress (emotional spending)",
          "Leah's version: money = scarce, so hoard it to feel safe (scarcity mindset)",
          "Neither approach is healthy — both are driven by fear rather than strategy",
          "Recognizing your money script is the first step to rewriting it"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych9-aq1",
          question: "What is a 'money script'?",
          options: [
            "A budget template you follow each month",
            "Unconscious beliefs about money formed in childhood that drive adult financial behavior",
            "A financial plan written by a financial advisor",
            "The terms and conditions of a bank account"
          ],
          correctAnswer: 1,
          explanation: "Money scripts are deeply held beliefs about money that form during childhood — often from parents' words and behaviors. They operate unconsciously, driving financial decisions without your awareness. Common scripts like 'money is evil' or 'I'll never be rich' can silently sabotage even the best financial plans. Identifying your scripts is the first step to changing them."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Your financial identity ('I am a saver') drives behavior more than goals ('I want to save')",
          "Small positive financial actions are 'votes' that shift your identity over time",
          "Money scripts from childhood unconsciously drive adult financial behavior",
          "The same money script can manifest differently in different people",
          "Rewriting money scripts requires awareness, intention, and consistent small actions"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "psych9-mastery1",
            question: "According to identity-based habit research, the most effective way to become better with money is to:",
            options: [
              "Set aggressive savings goals with strict deadlines",
              "Read five books about personal finance",
              "Start with small actions that reinforce the identity of being financially responsible",
              "Hire a financial advisor to manage everything"
            ],
            correctAnswer: 2,
            explanation: "Small, consistent actions build identity. Checking your balance daily, packing lunch once a week, or saving $5 are all 'votes' for the identity of being good with money. Over time, these votes create a new self-concept that makes bigger financial wins natural. It's about becoming, not just doing."
          },
          {
            id: "psych9-mastery2",
            question: "Someone who believes 'Money is the root of all evil' might unconsciously:",
            options: [
              "Invest aggressively to build wealth",
              "Sabotage their own financial success because they associate wealth with being bad",
              "Start a successful business",
              "Develop excellent budgeting habits"
            ],
            correctAnswer: 1,
            explanation: "If you unconsciously believe money is evil, building wealth creates internal conflict — 'If I become rich, I become evil.' This can manifest as self-sabotage: overspending when savings grow, turning down promotions, or giving money away compulsively. The actual quote, 'The LOVE of money is the root of all evil,' is quite different from 'money is evil.' Recognizing this distinction can free people from limiting beliefs."
          },
          {
            id: "psych9-mastery3",
            question: "The difference between Mia (impulsive spender) and Leah (anxious hoarder) shows that:",
            options: [
              "One sister is smarter than the other",
              "The same money script can produce different but equally limiting financial behaviors",
              "Spending is always worse than saving",
              "Childhood has no effect on adult financial behavior"
            ],
            correctAnswer: 1,
            explanation: "Both sisters developed unhealthy financial patterns from the same childhood script ('money causes problems'). Mia dealt with the stress by spending; Leah dealt with it by hoarding. Neither approach is optimal — healthy finance requires balance between enjoying money now and growing it for the future. The script, not the behavior, is the root cause."
          }
        ]
      }
    ]
  },

  // PSYCH-10: Healthy Financial Beliefs
  {
    lessonId: "psych-10",
    sections: [
      {
        type: "concept",
        title: "Building a Wealth-Positive Mindset",
        paragraphs: [
          "Throughout this unit, we've explored the psychological traps, biases, and scripts that sabotage financial success. Now it's time to build the opposite: a set of healthy, evidence-based financial beliefs that will serve as the foundation for everything you learn in this program.",
          "Healthy financial beliefs aren't about being obsessed with money or becoming greedy. They're about developing a clear, rational, and empowered relationship with money — one where you control it, rather than it controlling you.",
          "The most financially healthy people share certain core beliefs: money is a tool (not good or evil), wealth is built through consistent habits (not luck), and financial education is a lifelong journey (not a one-time lesson)."
        ],
        bullets: [
          "Money is a neutral tool — it amplifies who you already are",
          "Wealth is built through consistent, boring habits — not dramatic windfalls",
          "Financial mistakes are learning opportunities, not permanent failures",
          "Your past doesn't determine your financial future — your habits do",
          "Financial education is ongoing — markets, tools, and strategies evolve"
        ],
        realWorldExample: "A study tracking 10,000 people over 30 years found that the #1 predictor of financial success wasn't income, education, or family wealth — it was financial self-efficacy (believing you CAN manage money well). People who believed in their ability to manage money — regardless of their starting point — consistently made better decisions, saved more, and built more wealth."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "psych10-mc1",
            question: "The #1 predictor of long-term financial success is:",
            options: [
              "Starting with a large inheritance",
              "Having a high-paying job",
              "Financial self-efficacy — believing you can manage money well",
              "Living in a wealthy neighborhood"
            ],
            correctAnswer: 2,
            explanation: "Research consistently shows that belief in your own ability to manage money (self-efficacy) is the strongest predictor of financial outcomes. It drives the behaviors that create wealth: budgeting, saving, investing, and continuous learning. This means ANYONE can become financially successful by building confidence through small wins and education."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Paths Forward",
        narrative: "Remember Marcus and Jaylen from Lesson 1? Five years later, Marcus hit rock bottom with $15,000 in debt. But instead of giving up, he reframed his identity: 'I made mistakes, but I'm becoming someone who manages money well.' He started small: tracked spending for one month, then cut one subscription, then automated $50/month to savings. Three years later, Marcus is debt-free with $5,000 in savings and a growing investment account. His income didn't change — his beliefs did.",
        details: [
          "Marcus's turnaround started with an identity shift, not a income change",
          "He used small wins to build financial self-efficacy",
          "He didn't try to fix everything at once — he built one habit at a time",
          "His past mistakes became the motivation for his new identity",
          "Marcus and Jaylen are now both on strong financial paths — different routes, same destination"
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "psych10-aq1",
          question: "What was the FIRST step in Marcus's financial turnaround?",
          options: [
            "Getting a higher-paying job",
            "Cutting all expenses dramatically",
            "Shifting his financial identity and beliefs about himself",
            "Consulting a financial advisor"
          ],
          correctAnswer: 2,
          explanation: "Marcus didn't change his income or make dramatic cuts first — he changed how he saw himself. By adopting the identity 'I'm becoming someone who manages money well,' every subsequent action reinforced that belief. Identity change creates sustainable behavior change. Without the identity shift, any new budget or savings plan would likely have failed like past attempts."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Money is a neutral tool — your relationship with it determines outcomes",
          "Financial self-efficacy (believing you CAN manage money) is the #1 predictor of success",
          "Wealth is built through consistent small habits, not dramatic actions",
          "Financial mistakes are data points for improvement, not permanent failures",
          "Your financial journey in this program starts with the right mindset foundation"
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "psych10-mastery1",
            question: "Which statement reflects a healthy financial belief?",
            options: [
              "Money is the root of all evil",
              "Rich people got lucky — normal people can't build wealth",
              "Money is a tool that I can learn to manage effectively through consistent habits",
              "You should never take any financial risks"
            ],
            correctAnswer: 2,
            explanation: "Viewing money as a learnable skill and neutral tool is the healthiest financial mindset. It's empowering ('I can learn'), balanced ('consistent habits' — not get-rich-quick), and accurate ('tool' — not inherently good or evil). This belief drives the behaviors that build wealth: learning, practicing, and improving over time."
          },
          {
            id: "psych10-mastery2",
            question: "Someone who loses $500 on a bad investment and says, 'I learned what not to do next time,' is demonstrating:",
            options: [
              "Denial about their financial mistake",
              "A growth mindset toward financial learning",
              "Reckless risk tolerance",
              "Overconfidence in their investing ability"
            ],
            correctAnswer: 1,
            explanation: "A growth mindset treats setbacks as learning opportunities. Losing $500 and extracting a lesson is healthy — it builds wisdom for future decisions. This is different from denial ('it wasn't a mistake') or recklessness ('losses don't matter'). The healthiest investors learn from every outcome, positive or negative."
          },
          {
            id: "psych10-mastery3",
            question: "The concept of financial self-efficacy teaches us that:",
            options: [
              "Only wealthy people can be good with money",
              "Financial education alone guarantees success",
              "Believing in your ability to manage money is more important than your starting point",
              "You need professional help to manage your finances"
            ],
            correctAnswer: 2,
            explanation: "Self-efficacy research shows that confidence in your financial abilities — built through small wins and education — matters more than income, background, or starting wealth. It's the engine that drives financial behavior: people who believe they can manage money DO manage it better. This entire unit has been building your financial self-efficacy, one lesson at a time."
          },
          {
            id: "psych10-mastery4",
            question: "Across this entire unit on Money Psychology, the overarching lesson is:",
            options: [
              "Smart people don't make financial mistakes",
              "Emotions should be completely removed from financial decisions",
              "Understanding your psychology — biases, scripts, identity — is the foundation of financial success",
              "The only way to build wealth is through strict discipline and sacrifice"
            ],
            correctAnswer: 2,
            explanation: "This unit's core message: financial success starts with self-awareness. Understanding biases (Lesson 8), emotional patterns (Lesson 5), social influences (Lesson 6), marketing manipulation (Lesson 7), identity (Lesson 9), and mindset (this lesson) gives you the psychological foundation for every financial skill you'll learn next. Money management is 80% psychology, 20% math."
          }
        ]
      }
    ]
  }
]

/**
 * Get structured content for a lesson.
 * Returns hand-written content if available, otherwise generates content dynamically.
 * NEVER returns null — every lesson always has structured content.
 */
export function getStructuredContent(lessonId: string): StructuredLessonContent | null {
  const allContent = [...structuredLessonContent, ...investingFundamentalsContent, ...businessManagementContent, ...marketingContent, ...consumerBehaviorContent]
  const handWritten = allContent.find(c => c.lessonId === lessonId)
  if (handWritten) return handWritten

  // Generate content dynamically for lessons without hand-written content
  const lesson = lessons.find((l) => l.id === lessonId)
  if (lesson) return generateStructuredContent(lesson)

  return null
}
