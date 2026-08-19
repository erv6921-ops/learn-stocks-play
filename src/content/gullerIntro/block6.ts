import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// GULLIVER INTRO TO BUSINESS, BLOCK 6
// The US economy: indicators, cycles, policy (Byrnes Ch. 2)
// Concepts: gdp, gross-output, unemployment-types, inflation-types, cpi, core-inflation,
//           ppi, productivity, business-cycle, fiscal-policy, keynes,
//           deficit-national-debt, monetary-policy-fed
// Audience: 9th grade
// ═══════════════════════════════════════════════

export const block6: StructuredLessonContent = {
  lessonId: "gulliver-6",
  sections: [
    // ─────────────────────────────────────────────
    // PRE-CLASS PRIMER (~5 min read)
    // ─────────────────────────────────────────────
    {
      type: "concept",
      title: "The Numbers That Measure a Whole Economy",
      paragraphs: [
        "To know if a country's economy is healthy, economists watch a few key numbers. The most famous is GDP (Gross Domestic Product): the total value of all the final goods and services a country produces in a year. When GDP is growing, the economy is generally producing more and doing well; when it shrinks, that's a warning sign. A broader, less-famous cousin is gross output, which adds up sales at every stage of production, not just the final products, so it's an even bigger number that shows all the activity behind the scenes.",
        "The second headline number is the unemployment rate: the share of people who want a job but can't find one. There are four main types. Frictional unemployment is people between jobs or just entering the workforce (normal and short). Structural unemployment happens when someone's skills no longer match available jobs, often because of technology or automation. Cyclical unemployment rises when the economy slumps and businesses lay people off. Seasonal unemployment comes from jobs that only exist part of the year, like holiday retail or summer lifeguarding.",
        "The third headline is about prices. Inflation is when prices rise across the economy, so your money buys less. There are related terms: disinflation is when inflation is still happening but slowing down; deflation is when prices actually fall; and stagflation is the nasty combo of high inflation plus a weak economy and high unemployment. To measure inflation, the government tracks the CPI (Consumer Price Index), which follows the price of a 'basket' of everyday things people buy. Core inflation is the CPI with food and energy stripped out, because those two bounce around a lot. The PPI (Producer Price Index) tracks prices earlier in the chain, meaning what businesses pay, which can hint at where consumer prices are headed. One more number matters: productivity, or how much output each worker produces per hour. Rising productivity means more gets made with the same effort, which helps the whole economy grow."
      ],
      bullets: [
        "GDP = total value of all final goods and services a country makes in a year; gross output is broader, counting every stage.",
        "The four unemployment types: frictional (between jobs), structural (skills mismatch), cyclical (recession-driven), seasonal.",
        "Inflation = rising prices; disinflation = inflation slowing; deflation = falling prices; stagflation = high inflation plus a weak economy.",
        "CPI measures inflation with a basket of consumer goods; core inflation removes food and energy; PPI tracks producer prices.",
        "Productivity is output per worker per hour; rising productivity helps the economy grow."
      ],
      realWorldExample: "If your $5 used to buy a full combo meal but now only buys the burger, that's inflation, and the CPI is the tool tracking exactly how much prices like that have risen."
    },
    {
      type: "concept",
      title: "The Economy Moves in Cycles, and Two Kinds of Response",
      paragraphs: [
        "Economies don't grow in a straight line; they move through a business cycle with repeating phases. In an expansion, the economy grows, businesses hire, and GDP rises. At the peak, growth tops out. Then comes a contraction (also called a recession if it's deep enough): the economy shrinks, businesses cut back, and unemployment rises. At the bottom, the trough, things stop falling and a recovery begins, starting the cycle again. Knowing which phase you're in helps explain why jobs are easy or hard to find.",
        "When the economy struggles, the government can respond in two very different ways. The first is fiscal policy: decisions about government spending and taxes, made by Congress and the President. To fight a slump, the government can spend more (on roads, schools, aid) or cut taxes to put money in people's pockets. This idea was championed by the economist John Maynard Keynes, who argued that government spending can revive a weak economy by boosting demand. The catch: spending more than the government collects creates a deficit for that year, and years of deficits pile up into the national debt, the total the country owes.",
        "The second response is monetary policy, run by the Federal Reserve (the 'Fed'), the nation's central bank. Instead of taxes and spending, the Fed controls the money supply and interest rates. To cool down an overheating economy or fight inflation, the Fed raises interest rates, which makes borrowing more expensive and slows spending. To boost a weak economy, it lowers rates, making loans cheaper so people and businesses spend and invest more. So the two levers are: fiscal policy (Congress and the President, using taxes and spending) and monetary policy (the Fed, using interest rates and the money supply)."
      ],
      bullets: [
        "The business cycle phases: expansion (growth) → peak → contraction/recession (shrinking) → trough → recovery.",
        "Fiscal policy = government spending and taxes, controlled by Congress and the President.",
        "Keynes argued government spending can revive a weak economy by boosting demand.",
        "A deficit is spending more than you collect in a year; the national debt is the total piled up over time.",
        "Monetary policy = the Federal Reserve (the Fed) adjusting interest rates and the money supply; raising rates fights inflation, lowering rates boosts a weak economy."
      ],
      realWorldExample: "When the Fed raises interest rates, car loans and credit cards get more expensive, so people borrow and buy less, and the Fed is tapping the brakes on the economy to bring inflation down. That's monetary policy in action, separate from anything Congress does."
    },
    // ─────────────────────────────────────────────
    // CHECKPOINT A (3 questions): identify the business-cycle phase
    // ─────────────────────────────────────────────
    {
      type: "micro-check",
      questions: [
        {
          id: "g6-cpa-1",
          question: "The economy is shrinking, GDP is falling, businesses are laying people off, and unemployment is climbing. Which business-cycle phase is this?",
          options: ["Expansion", "Peak", "Contraction (recession)", "Trough"],
          correctAnswer: 2,
          explanation: "A shrinking economy with rising unemployment is a contraction, called a recession when it's deep enough.",
          concept: "business-cycle"
        },
        {
          id: "g6-cpa-2",
          question: "GDP is rising, companies are hiring, and jobs are easy to find. Which phase is this?",
          options: ["Expansion", "Contraction", "Trough", "Recession"],
          correctAnswer: 0,
          explanation: "Growing GDP and lots of hiring describe an expansion, the growth phase of the business cycle.",
          concept: "business-cycle"
        },
        {
          id: "g6-cpa-3",
          question: "The economy has stopped falling, hit bottom, and is just beginning to recover. This lowest point is called the:",
          options: ["Peak", "Expansion", "Trough", "Deficit"],
          correctAnswer: 2,
          explanation: "The trough is the bottom of the business cycle, where a contraction ends and recovery begins.",
          concept: "business-cycle"
        }
      ]
    },
    // ─────────────────────────────────────────────
    // CHECKPOINT B (3 questions): fiscal vs. monetary, who acts and what tool
    // ─────────────────────────────────────────────
    {
      type: "micro-check",
      questions: [
        {
          id: "g6-cpb-1",
          question: "Congress and the President cut taxes and boost government spending to fight a slump. This is:",
          options: ["Monetary policy", "Fiscal policy", "The business cycle", "Core inflation"],
          correctAnswer: 1,
          explanation: "Taxes and government spending, decided by Congress and the President, are fiscal policy.",
          concept: "fiscal-policy"
        },
        {
          id: "g6-cpb-2",
          question: "The Federal Reserve raises interest rates to slow down inflation. This is:",
          options: ["Fiscal policy", "Monetary policy", "A trough", "Productivity"],
          correctAnswer: 1,
          explanation: "The Fed adjusting interest rates and the money supply is monetary policy, a separate lever from Congress's taxes and spending.",
          concept: "monetary-policy-fed"
        },
        {
          id: "g6-cpb-3",
          question: "Which pairing of 'who acts' and 'what tool' is correct?",
          options: [
            "Fiscal policy: the Fed, using interest rates",
            "Monetary policy: Congress, using taxes",
            "Fiscal policy: Congress and the President, using taxes and spending",
            "Monetary policy: the President, using tariffs only"
          ],
          correctAnswer: 2,
          explanation: "Fiscal policy is run by Congress and the President through taxes and spending. Monetary policy is run by the Fed through interest rates and the money supply.",
          concept: "fiscal-policy"
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
          id: "g6-exit-1",
          question: "What does GDP measure?",
          options: [
            "The total number of people in a country",
            "The total value of all final goods and services a country produces in a year",
            "The amount of money the government owes",
            "The price of a single company's stock"
          ],
          correctAnswer: 1,
          explanation: "GDP (Gross Domestic Product) is the total value of all final goods and services a country produces in a year, the headline measure of economic size.",
          concept: "gdp"
        },
        {
          id: "g6-exit-2",
          question: "The Fed raises interest rates. What is it most likely trying to do?",
          options: [
            "Speed up spending and borrowing",
            "Slow down spending to cool inflation",
            "Increase the national debt on purpose",
            "Cut taxes for everyone"
          ],
          correctAnswer: 1,
          explanation: "Raising rates makes borrowing more expensive, which slows spending, and that's the Fed's way of cooling an overheating economy and fighting inflation.",
          concept: "monetary-policy-fed"
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
          id: "g6-prac-1",
          question: "If a country's GDP grows for several years in a row, that generally means the economy is:",
          options: ["Shrinking", "Producing more and doing well", "Out of money", "In a permanent recession"],
          correctAnswer: 1,
          explanation: "Rising GDP means the country is producing more goods and services, usually a sign of a healthy, growing economy.",
          concept: "gdp"
        },
        {
          id: "g6-prac-2",
          question: "How is gross output different from GDP?",
          options: [
            "It only counts final products",
            "It adds up sales at every stage of production, making it a bigger number than GDP",
            "It measures unemployment instead",
            "It is always smaller than GDP"
          ],
          correctAnswer: 1,
          explanation: "Gross output counts sales at all stages, not just final goods, so it captures more activity and is larger than GDP.",
          concept: "gross-output"
        },
        {
          id: "g6-prac-3",
          question: "A worker who just graduated and is spending a few weeks searching for their first job is experiencing which type of unemployment?",
          options: ["Frictional", "Structural", "Cyclical", "Seasonal"],
          correctAnswer: 0,
          explanation: "Frictional unemployment is the short, normal gap when people are between jobs or entering the workforce.",
          concept: "unemployment-types"
        },
        {
          id: "g6-prac-4",
          question: "A factory worker loses their job because machines now do their task, and their old skills don't match new openings. This is:",
          options: ["Seasonal unemployment", "Frictional unemployment", "Structural unemployment", "Disinflation"],
          correctAnswer: 2,
          explanation: "Structural unemployment happens when someone's skills no longer fit available jobs, often due to technology or automation.",
          concept: "unemployment-types"
        },
        {
          id: "g6-prac-5",
          question: "Lots of workers get laid off because the whole economy has slumped into a recession. This is:",
          options: ["Cyclical unemployment", "Seasonal unemployment", "Frictional unemployment", "Core inflation"],
          correctAnswer: 0,
          explanation: "Cyclical unemployment rises and falls with the business cycle, climbing during recessions.",
          concept: "unemployment-types"
        },
        {
          id: "g6-prac-6",
          question: "Prices across the economy are rising, so your money buys less than before. This is:",
          options: ["Deflation", "Inflation", "Productivity", "A trough"],
          correctAnswer: 1,
          explanation: "Inflation is a general rise in prices that reduces the buying power of money.",
          concept: "inflation-types"
        },
        {
          id: "g6-prac-7",
          question: "Which term describes the rare, painful mix of high inflation AND a weak economy with high unemployment?",
          options: ["Disinflation", "Deflation", "Stagflation", "Expansion"],
          correctAnswer: 2,
          explanation: "Stagflation is the tough combination of high inflation together with stagnant growth and high unemployment.",
          concept: "inflation-types"
        },
        {
          id: "g6-prac-8",
          question: "What does the CPI (Consumer Price Index) track?",
          options: [
            "The price of a basket of everyday things consumers buy",
            "The total number of workers in a country",
            "The government's yearly deficit",
            "A single company's profits"
          ],
          correctAnswer: 0,
          explanation: "The CPI follows the price of a basket of common consumer goods and services to measure inflation.",
          concept: "cpi"
        },
        {
          id: "g6-prac-9",
          question: "Why does 'core inflation' leave out food and energy prices?",
          options: [
            "Because those prices never change",
            "Because food and energy prices bounce around a lot, and removing them shows a steadier trend",
            "Because food and energy don't matter to anyone",
            "Because they are illegal to measure"
          ],
          correctAnswer: 1,
          explanation: "Food and energy prices are volatile, so core inflation strips them out to reveal the underlying, steadier price trend.",
          concept: "core-inflation"
        },
        {
          id: "g6-prac-10",
          question: "The PPI (Producer Price Index) measures prices:",
          options: [
            "That consumers pay at the store",
            "That businesses pay earlier in the production chain",
            "Of stocks on the market",
            "Of houses only"
          ],
          correctAnswer: 1,
          explanation: "The PPI tracks producer-level prices, meaning what businesses pay, which can signal where consumer prices are heading.",
          concept: "ppi"
        },
        {
          id: "g6-prac-11",
          question: "If a factory produces more goods per worker each hour than before, its ______ has risen.",
          options: ["deficit", "productivity", "inflation", "unemployment"],
          correctAnswer: 1,
          explanation: "Productivity is output per worker per hour; producing more with the same effort means productivity went up.",
          concept: "productivity"
        },
        {
          id: "g6-prac-12",
          question: "The economist John Maynard Keynes is known for arguing that:",
          options: [
            "The government should never spend any money",
            "Government spending can revive a weak economy by boosting demand",
            "Prices should always be allowed to fall",
            "Only the Fed should run the economy"
          ],
          correctAnswer: 1,
          explanation: "Keynes argued that in a downturn, government spending can boost demand and help pull the economy out of a slump.",
          concept: "keynes"
        },
        {
          id: "g6-prac-13",
          question: "What is the difference between a deficit and the national debt?",
          options: [
            "They are the same thing",
            "A deficit is spending more than you collect in one year; the national debt is the total piled up over many years",
            "A deficit is the total owed; the debt is one year's shortfall",
            "Neither has anything to do with government spending"
          ],
          correctAnswer: 1,
          explanation: "A yearly shortfall (spending over revenue) is a deficit; adding up years of deficits gives the national debt.",
          concept: "deficit-national-debt"
        },
        {
          id: "g6-prac-14",
          question: "The Fed wants to boost a weak economy. Which move fits monetary policy?",
          options: [
            "Lowering interest rates so loans are cheaper and people spend more",
            "Passing a new tax law in Congress",
            "Cutting government spending on schools",
            "Raising tariffs on imports"
          ],
          correctAnswer: 0,
          explanation: "Lowering interest rates is monetary policy: cheaper loans encourage spending and investment. Taxes, spending, and tariffs are fiscal or trade decisions, not the Fed's tools.",
          concept: "monetary-policy-fed"
        },
        {
          id: "g6-prac-15",
          question: "Which is an example of FISCAL policy rather than monetary policy?",
          options: [
            "The Fed raising interest rates",
            "The Fed changing the money supply",
            "Congress passing a big spending bill and cutting taxes",
            "The Fed lowering rates"
          ],
          correctAnswer: 2,
          explanation: "Fiscal policy is Congress and the President using taxes and spending. Anything the Fed does with rates or the money supply is monetary policy.",
          concept: "fiscal-policy"
        }
      ]
    }
  ]
}
