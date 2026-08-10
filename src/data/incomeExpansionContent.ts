import { StructuredLessonContent } from "@/types"

// ═══════════════════════════════════════════════
// UNIT 2 EXPANSION: INCOME & EARNING (Florida SS.912.FL.2.x)
// income-11 .. income-15
// ═══════════════════════════════════════════════

export const incomeExpansionContent: StructuredLessonContent[] = [
  // ─────────────────────────────────────────────
  // income-11: College vs Trade School ROI (FL.2.3)
  // ─────────────────────────────────────────────
  {
    lessonId: "income-11",
    sections: [
      {
        type: "concept",
        title: "The Real Question Isn't 'Is College Worth It?'",
        paragraphs: [
          "The smartest question about education isn't 'is college worth it?' - it's 'which path has the best return for ME?' Return on investment (ROI) compares what you spend on education against what you earn afterward. A four-year degree at a public university can total around $120,000 (including living costs and lost income), while a two-year trade school program might cost around $33,000.",
          "Different paths lead to very different starting salaries. An electrician might start around $65K, a registered nurse around $72K, a software engineer around $110K, a teacher around $45K, and some liberal-arts grads around $38K. The point isn't that one path is always better - it's that cost and expected income together determine the real value, and a cheaper path with solid pay can beat an expensive one.",
          "A break-even analysis asks: how long until the higher-paying path 'pays off' its higher cost? You also have to count opportunity cost - the money you DON'T earn while you're in school instead of working. A trade-school grad who starts earning two years earlier, with far less debt, can be financially ahead of a four-year grad for a long time, sometimes permanently. The right choice depends on your goals, the career you want, and the numbers."
        ],
        bullets: [
          "ROI compares education cost against the income it produces.",
          "Four-year college can total ~$120K; a two-year trade program ~$33K.",
          "Starting salaries vary widely by field - degree-required and skilled-trade alike.",
          "Break-even analysis estimates how long a pricier path takes to pay off.",
          "Opportunity cost = income you give up while studying instead of earning."
        ],
        realWorldExample: "A welder who finishes a $25,000 program at 20 and earns $55K right away can be debt-free and saving while a four-year peer is still in school accumulating loans - a head start that compounds for years."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income11-mc1",
            question: "What is 'opportunity cost' in the context of choosing an education path?",
            options: [
              "The tuition you pay each semester",
              "The income you give up by studying",
              "The cost of textbooks",
              "The interest on student loans only"
            ],
            correctAnswer: 1,
            explanation: "Opportunity cost is the money (and experience) you forgo by being in school rather than earning a paycheck - a real part of an education's true cost."
          },
          {
            id: "income11-mc2",
            question: "Why can a trade school sometimes have a higher ROI than a four-year college?",
            options: [
              "Trades always pay more than every college career",
              "Lower cost plus earlier earning can outweigh a degree's higher price, depending on the field",
              "Trade school is free",
              "College degrees have no value"
            ],
            correctAnswer: 1,
            explanation: "ROI depends on both cost and income. A lower-cost trade path that starts paying sooner can deliver a stronger return than an expensive degree - though it varies by career."
          }
        ]
      },
      {
        type: "scenario",
        title: "Three Friends in Tampa",
        narrative: "Three friends graduate high school in Tampa. Lucia enrolls at USF (4 years, about $80K total cost) and starts a job at $45K after graduating. Marco attends a trade school for electrical work (2 years, about $25K) and starts at $58K. Devin starts working full-time right away with no further schooling.",
        details: [
          "Lucia spends four years and ~$80K before earning her first full salary of $45K.",
          "Marco spends two years and ~$25K, then starts earning $58K - sooner and with less debt.",
          "Devin earns immediately but in lower-paying roles without specialized training.",
          "Over 10 years, the comparison depends on cost, salary growth, and debt for each path."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income11-aq1",
          question: "Why might Marco be financially ahead of Lucia for several years after graduation?",
          options: [
            "Because trade work is always better than college",
            "Because he spent less, finished sooner",
            "Because Lucia's degree is worthless",
            "Because he avoided all taxes"
          ],
          correctAnswer: 1,
          explanation: "Marco's lower cost, earlier start, higher initial salary, and smaller debt give him a head start. Whether Lucia catches up depends on her long-term salary growth - that's what a break-even analysis examines."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Ask which education path has the best ROI for you, not whether college is universally 'worth it.'",
          "Compare total cost (including opportunity cost) against expected income.",
          "Trade school can beat college on ROI in some fields due to lower cost and earlier earning.",
          "Some careers require a degree; many well-paying skilled trades do not.",
          "Break-even analysis shows how long a pricier path takes to pay off."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "income11-mastery1",
            question: "What does a break-even analysis help you figure out about education paths?",
            options: [
              "Which school has the best football team",
              "How long it takes for a higher-cost path's extra earnings to make up for its extra cost",
              "Your exact future salary",
              "How to avoid paying any tuition"
            ],
            correctAnswer: 1,
            explanation: "Break-even analysis estimates the point at which a more expensive path's higher earnings offset its higher cost."
          },
          {
            id: "income11-mastery2",
            question: "Which statement about careers and degrees is accurate?",
            options: [
              "Every well-paying career requires a four-year degree",
              "Some careers require degrees, while many skilled trades pay well without one",
              "No career requires a degree",
              "Trades never require any training"
            ],
            correctAnswer: 1,
            explanation: "Some careers (like nursing or engineering) require degrees, while many skilled trades (like electrician or welder) pay well with shorter, cheaper training."
          },
          {
            id: "income11-mastery3",
            question: "Why does opportunity cost make four-year college more expensive than just tuition suggests?",
            options: [
              "Because textbooks are expensive",
              "Because you also give up years of potential income",
              "Because college has no opportunity cost",
              "Because tuition is the only real cost"
            ],
            correctAnswer: 1,
            explanation: "Beyond tuition, you lose income you could have earned during those years - that forgone income is part of the true cost."
          },
          {
            id: "income11-mastery4",
            question: "What two factors most determine the ROI of an education path?",
            options: [
              "The school's name and location",
              "The total cost and the income it leads to",
              "Class size and weather",
              "The number of clubs available"
            ],
            correctAnswer: 1,
            explanation: "ROI is driven by how much the path costs and how much income it produces - together they reveal the real return."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // income-12: How Labor Markets Set Your Pay (FL.2.4)
  // ─────────────────────────────────────────────
  {
    lessonId: "income-12",
    sections: [
      {
        type: "concept",
        title: "Why Some Jobs Pay $20/Hour and Others Pay $200",
        paragraphs: [
          "Your pay isn't random - it's set by supply and demand in the labor market. When lots of employers want a skill (high demand) but few people have it (low supply), wages rise. When a field gets flooded with workers (high supply) and demand doesn't keep up, wages stall or fall. This is the single biggest force behind why different jobs pay so differently.",
          "Several things push wages up: jobs that are dangerous, require lots of education or rare skills, or have unpleasant conditions tend to pay more to attract workers. Employers also weigh your productivity - how much value you create. If hiring you adds more to the business than you cost, you're worth a higher wage; if not, your pay is capped by what you produce.",
          "Markets shift over time, and so do wages. Software engineer pay surged from 2010-2020 as demand exploded. After 2008, a flood of new law-school graduates pushed some legal wages down. Today, automation and AI tools are changing demand for certain roles, while shortages of skilled trades like plumbers and electricians are pushing those wages up. Choosing a career with an eye on these trends helps you aim where pay is strong and growing."
        ],
        bullets: [
          "Wages are set by the supply of workers versus the demand for their skills.",
          "High demand + low supply = higher pay; oversupply = stagnant or falling pay.",
          "Danger, education, rare skills, and bad conditions tend to raise wages.",
          "Employers pay based partly on your productivity - the value you create.",
          "Markets shift: automation can lower demand for some jobs while shortages raise others."
        ],
        realWorldExample: "During COVID, demand for nurses spiked while supply was limited, so hospitals offered huge pay and bonuses. The same supply-and-demand logic explains why a sudden shortage of electricians today is driving their wages up."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income12-mc1",
            question: "What happens to wages when demand for a skill is high but few workers have it?",
            options: [
              "Wages fall",
              "Wages rise",
              "Wages stay exactly the same forever",
              "The job disappears"
            ],
            correctAnswer: 1,
            explanation: "High demand combined with low supply pushes wages up, because employers compete for the few qualified workers."
          },
          {
            id: "income12-mc2",
            question: "What does 'productivity' mean to an employer deciding your pay?",
            options: [
              "How many hours you sit at a desk",
              "How much value you create relative to what you cost",
              "How long you've worked there",
              "How nice you are"
            ],
            correctAnswer: 1,
            explanation: "Employers weigh the value you produce against your cost. If you add more value than you cost, you justify higher pay."
          }
        ]
      },
      {
        type: "scenario",
        title: "AI Tools Meet the Trades Shortage",
        narrative: "New AI coding tools make some basic programming tasks faster, increasing the supply of work that fewer junior developers can handle - putting downward pressure on entry-level developer wages. At the same time, fewer young people are entering the trades, creating a shortage of plumbers and electricians and pushing their wages up.",
        details: [
          "AI tools let companies do more with fewer junior developers, softening demand for entry-level coders.",
          "A larger pool competing for fewer junior roles can hold down those wages.",
          "Meanwhile, a shrinking supply of trade workers meets steady demand for plumbing and electrical work.",
          "That trade shortage drives wages up for plumbers and electricians."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income12-aq1",
          question: "Using supply and demand, why are plumber and electrician wages rising while some junior coding wages soften?",
          options: [
            "Because trades are more fun",
            "A shortage of trade workers (low supply) meets steady demand",
            "Because coding is illegal now",
            "Because employers dislike programmers"
          ],
          correctAnswer: 1,
          explanation: "Trades face low supply and steady demand, lifting wages. In some coding roles, AI tools reduce the demand for junior labor, softening those wages - both are supply-and-demand at work."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Labor markets set pay through supply of workers and demand for skills.",
          "Scarce, high-demand skills command higher wages.",
          "Danger, education, rare skills, and tough conditions push pay up.",
          "Employers pay based partly on the value (productivity) you create.",
          "Watch market trends - automation and shortages reshape which careers pay well."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "income12-mastery1",
            question: "Why did nurses' wages rise during COVID?",
            options: [
              "Demand for nurses spiked while the supply was limited",
              "There were suddenly too many nurses",
              "The government banned nursing",
              "Nurses worked fewer hours"
            ],
            correctAnswer: 0,
            explanation: "A surge in demand met a limited supply of nurses, so employers raised pay and offered bonuses to attract them."
          },
          {
            id: "income12-mastery2",
            question: "What typically happens to wages when a job becomes easily automatable?",
            options: [
              "Wages rise sharply",
              "Demand for human workers can fall, putting downward pressure on wages",
              "Nothing ever changes",
              "The job instantly pays double"
            ],
            correctAnswer: 1,
            explanation: "If technology can do the work, demand for human labor in that role often drops, which can lower wages."
          },
          {
            id: "income12-mastery3",
            question: "How can you use labor-market data when picking a career?",
            options: [
              "Ignore it entirely",
              "Look for fields with growing demand and limited supply, where pay is strong and rising",
              "Always choose the most crowded field",
              "Pick whatever pays least"
            ],
            correctAnswer: 1,
            explanation: "Targeting careers with rising demand and limited supply positions you where wages tend to be higher and growing."
          },
          {
            id: "income12-mastery4",
            question: "What does productivity mean to an employer?",
            options: [
              "The number of breaks you take",
              "The value you create relative to your cost",
              "How far you live from work",
              "Your favorite tasks"
            ],
            correctAnswer: 1,
            explanation: "Productivity is the value you generate compared to what you cost; higher productivity supports higher pay."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // income-13: Recessions, Unemployment & Your Money (FL.2.5)
  // ─────────────────────────────────────────────
  {
    lessonId: "income-13",
    sections: [
      {
        type: "concept",
        title: "When the Economy Shrinks, Be the One Who's Ready",
        paragraphs: [
          "A recession is a significant, widespread decline in economic activity - often described as two or more quarters of falling GDP (the total output of the economy). During recessions, companies cut costs, which usually means layoffs, so unemployment rises. Understanding this cycle helps you prepare instead of panic.",
          "Economists describe a few types of unemployment. Cyclical unemployment is caused by recessions (demand drops, so jobs vanish temporarily). Structural unemployment happens when jobs are permanently replaced - by technology or a shift in the economy. Frictional unemployment is the normal, short-term gap when people are between jobs or just entering the workforce.",
          "Your best defense is an emergency fund - ideally enough to cover about six months of expenses - which acts like financial armor when income disappears. Some careers are more recession-resistant (healthcare, utilities, government) because people need those services no matter what. And during a downturn, two moves are especially risky: taking on new debt and quitting a job without a backup. Preparation, not prediction, is what protects you."
        ],
        bullets: [
          "A recession is often defined as two or more quarters of falling GDP.",
          "Recessions raise unemployment as companies cut costs.",
          "Cyclical (recession-driven), structural (jobs replaced), and frictional (between jobs) unemployment differ.",
          "An emergency fund of ~6 months of expenses is your recession shield.",
          "Healthcare, utilities, and government tend to be more recession-resistant."
        ],
        realWorldExample: "In a downturn, a worker with six months of expenses saved can survive a layoff calmly and job-hunt without desperation, while a coworker with no savings may be forced into high-interest debt within weeks of losing their paycheck."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income13-mc1",
            question: "What is a common definition of a recession?",
            options: [
              "A single bad day in the stock market",
              "Two or more quarters of falling GDP (a broad economic decline)",
              "Any month when prices rise",
              "When one company goes bankrupt"
            ],
            correctAnswer: 1,
            explanation: "A recession is a significant, broad decline in economic activity, often marked by two or more consecutive quarters of falling GDP."
          },
          {
            id: "income13-mc2",
            question: "Why is an emergency fund called 'financial armor' during a recession?",
            options: [
              "It earns the highest investment returns",
              "It covers your expenses if you lose income",
              "It guarantees you keep your job",
              "It prevents recessions from happening"
            ],
            correctAnswer: 1,
            explanation: "An emergency fund covers your bills when income stops, letting you weather a layoff without taking on debt or panic-quitting."
          }
        ]
      },
      {
        type: "scenario",
        title: "Two Orlando Families in 2008",
        narrative: "During the 2008 financial crisis, two families in Orlando face the same downturn. The Reyes family has a six-month emergency fund and low debt. The Carter family has no savings and a high mortgage payment. Both breadwinners get laid off within the same month.",
        details: [
          "The Reyes family taps their emergency fund to cover essentials while job hunting.",
          "Their low debt keeps monthly obligations manageable during the gap in income.",
          "The Carter family, with no savings, quickly falls behind on their high mortgage.",
          "Within two years, the Reyes family recovers steadily while the Carters face serious financial strain."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income13-aq1",
          question: "Why did the Reyes family survive the recession better than the Carters?",
          options: [
            "They earned much higher salaries",
            "Their emergency fund and low debt let them cover expenses and avoid falling behind",
            "They predicted the exact date of the crash",
            "They had no mortgage at all"
          ],
          correctAnswer: 1,
          explanation: "The Reyes family's savings and low debt gave them a cushion to cover expenses during unemployment. The Carters had no buffer and high obligations, so they fell behind fast."
        }
      },
      {
        type: "recap",
        takeaways: [
          "A recession is a broad economic decline, often two+ quarters of falling GDP.",
          "Unemployment rises in recessions as companies cut costs.",
          "Cyclical, structural, and frictional unemployment have different causes.",
          "An emergency fund (~6 months of expenses) is your best protection.",
          "Avoid new debt and don't quit without a backup during downturns."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "income13-mastery1",
            question: "What typically triggers rising unemployment in a recession?",
            options: [
              "Companies hiring more workers",
              "Companies cutting costs and laying off workers as activity falls",
              "Everyone getting raises",
              "Lower prices on everything"
            ],
            correctAnswer: 1,
            explanation: "As economic activity falls, companies cut costs - often through layoffs - which raises unemployment."
          },
          {
            id: "income13-mastery2",
            question: "What is the difference between cyclical and structural unemployment?",
            options: [
              "Cyclical is caused by recessions; structural is when jobs are permanently replaced (e.g., by technology)",
              "They are the same thing",
              "Structural only happens to teenagers",
              "Cyclical means you quit voluntarily"
            ],
            correctAnswer: 0,
            explanation: "Cyclical unemployment rises and falls with the economy (recessions); structural unemployment comes from permanent shifts like automation."
          },
          {
            id: "income13-mastery3",
            question: "Why is an emergency fund especially important before a recession?",
            options: [
              "It guarantees you won't be laid off",
              "It provides money to cover expenses if you lose income, preventing debt and panic",
              "It makes the recession end faster",
              "It increases your salary"
            ],
            correctAnswer: 1,
            explanation: "An emergency fund covers your bills during a job loss, so you can avoid high-interest debt and search calmly for new work."
          },
          {
            id: "income13-mastery4",
            question: "Which industries tend to be the most recession-resistant?",
            options: [
              "Luxury goods and travel",
              "Healthcare, utilities, and government",
              "High-end restaurants",
              "Vacation resorts"
            ],
            correctAnswer: 1,
            explanation: "People need healthcare, utilities, and government services regardless of the economy, making those fields more recession-resistant."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // income-14: Social Security Basics (FL.2.11)
  // ─────────────────────────────────────────────
  {
    lessonId: "income-14",
    sections: [
      {
        type: "concept",
        title: "The Program You're Already Paying Into",
        paragraphs: [
          "Social Security is a federal program that provides income to retirees, people with disabilities, and survivors of deceased workers. It's funded by payroll taxes called FICA: 6.2% is taken from your paycheck and your employer matches another 6.2%. So before you ever retire, you're already contributing every time you get paid.",
          "You earn Social Security by working. As you work and pay FICA, you accumulate 'credits' - up to four per year. After enough credits, you qualify for benefits. Your monthly retirement benefit is based on your 35 highest-earning years, so steady work over a career increases what you'll eventually receive. For today's young workers (Gen Z), the full retirement age is 67.",
          "When you claim matters a lot. You can start as early as 62, but your monthly benefit is permanently reduced. Wait until full retirement age (67) for the full amount, or delay all the way to 70 for an even larger monthly check. Social Security isn't just for retirement, either - it also pays disability benefits (SSDI) if you can't work, and survivor benefits to a worker's family if they die."
        ],
        bullets: [
          "Social Security is funded by FICA payroll taxes (6.2% you + 6.2% employer).",
          "You earn up to 4 credits per year by working; enough credits qualify you for benefits.",
          "Retirement benefits are based on your 35 highest-earning years.",
          "Full retirement age for Gen Z is 67; claiming at 62 permanently lowers your benefit.",
          "Social Security also provides disability (SSDI) and survivor benefits."
        ],
        realWorldExample: "Look at a real pay stub and you'll see a 'FICA' or 'Social Security' line - that 6.2% deduction is your contribution. Decades later, those contributions and your 35 best earning years determine the monthly check you receive in retirement."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income14-mc1",
            question: "What does the FICA payroll tax fund?",
            options: [
              "The military only",
              "Social Security (and Medicare)",
              "State lottery prizes",
              "Your personal savings account"
            ],
            correctAnswer: 1,
            explanation: "FICA taxes fund Social Security and Medicare. For Social Security, you pay 6.2% and your employer matches 6.2%."
          },
          {
            id: "income14-mc2",
            question: "What is the full retirement age for Gen Z workers?",
            options: [
              "62",
              "65",
              "67",
              "70"
            ],
            correctAnswer: 2,
            explanation: "For today's young workers (Gen Z), the full retirement age is 67. You can claim earlier at a reduced benefit or later for a larger one."
          }
        ]
      },
      {
        type: "scenario",
        title: "Consistency vs Gaps",
        narrative: "Two workers approach retirement. Wei started working steadily at 22 and worked consistently for decades. Jordan had several long gaps in their work history. Because retirement benefits are based on the 35 highest-earning years, the two consider how their work patterns and claiming age affect their monthly checks.",
        details: [
          "Wei's consistent 35+ years of earnings fill the benefit formula with strong years.",
          "Jordan's gaps mean some of the 35 years count as zero or low earnings, lowering the average.",
          "Claiming at 62 would permanently reduce either worker's monthly benefit.",
          "Delaying to 70 would increase the monthly benefit compared to claiming at 67."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income14-aq1",
          question: "Why does consistent work over a career tend to produce a higher Social Security benefit?",
          options: [
            "Because the government rewards loyalty to one company",
            "Because benefits are based on your 35 highest-earning years",
            "Because only the final year counts",
            "Because consistency lowers your FICA tax"
          ],
          correctAnswer: 1,
          explanation: "The benefit formula uses your 35 highest-earning years. Long gaps fill some of those years with low or zero earnings, reducing the average and the resulting benefit."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Social Security is funded by FICA payroll taxes you and your employer both pay.",
          "You earn up to 4 credits per year; enough credits qualify you for benefits.",
          "Benefits are based on your 35 highest-earning years.",
          "Full retirement age is 67 for Gen Z; claiming at 62 lowers benefits, delaying to 70 raises them.",
          "Social Security also provides disability (SSDI) and survivor benefits."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "income14-mastery1",
            question: "What does the FICA tax primarily fund?",
            options: [
              "Social Security and Medicare",
              "Public schools only",
              "Highway tolls",
              "Your 401(k)"
            ],
            correctAnswer: 0,
            explanation: "FICA funds Social Security and Medicare; the Social Security portion is 6.2% from you and 6.2% from your employer."
          },
          {
            id: "income14-mastery2",
            question: "When is full retirement age for Gen Z workers?",
            options: [
              "59",
              "62",
              "67",
              "75"
            ],
            correctAnswer: 2,
            explanation: "Full retirement age is 67 for today's young workers."
          },
          {
            id: "income14-mastery3",
            question: "What happens to your monthly benefit if you claim at 62 instead of waiting until 70?",
            options: [
              "Claiming at 62 gives a permanently smaller monthly benefit; waiting until 70 gives a larger one",
              "They are identical",
              "Claiming at 62 gives the largest benefit",
              "You get nothing if you wait"
            ],
            correctAnswer: 0,
            explanation: "Claiming early (62) permanently reduces your monthly benefit, while delaying to 70 increases it."
          },
          {
            id: "income14-mastery4",
            question: "What do Social Security survivor benefits cover?",
            options: [
              "Income for the family of a worker who has died",
              "Free college tuition",
              "Car insurance",
              "Vacation pay"
            ],
            correctAnswer: 0,
            explanation: "Survivor benefits provide income to eligible family members (like a spouse or children) of a worker who has died."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // income-15: Local Taxes - Property, Sales & Municipal (FL.2.13)
  // ─────────────────────────────────────────────
  {
    lessonId: "income-15",
    sections: [
      {
        type: "concept",
        title: "No State Income Tax - But You Still Pay Local Taxes",
        paragraphs: [
          "Florida is one of only a handful of states with no state income tax - a real perk for workers. But that doesn't mean Florida is tax-free. Local governments still raise money through several taxes, and understanding them helps you budget for the real cost of living in different parts of the state.",
          "The biggest local tax for homeowners is property tax, calculated as your home's assessed value multiplied by the local 'millage rate.' Millage rates vary by county and fund things like schools, roads, and emergency services. Florida also has a sales tax: a 6% state base rate, plus a county surtax in many areas - for example, Miami-Dade adds 1%, making it 7%. Some areas also charge special assessments for specific local projects.",
          "Two homes of the same price in different counties can have very different property tax bills because their millage rates differ. Florida offers a homestead exemption - typically up to $50,000 off the assessed value of your primary residence - which lowers your property tax bill if the home is where you actually live. Knowing where your tax dollars go (schools, roads, police, fire) helps you see local taxes as the price of community services, not just a deduction from your wallet."
        ],
        bullets: [
          "Florida has no state income tax, but local taxes still apply.",
          "Property tax = assessed value × millage rate; rates vary by county.",
          "Sales tax in Florida is 6% state + county surtax (e.g., Miami-Dade is 7%).",
          "The homestead exemption (up to ~$50,000) lowers property tax on your primary home.",
          "Local taxes fund schools, roads, police, and fire services."
        ],
        realWorldExample: "Two families buy identical $400,000 homes - one in a county with a high millage rate, one in a county with a low rate. The high-rate family can pay thousands more in property taxes every year for the same-priced house, simply because of where they live."
      },
      {
        type: "micro-check",
        questions: [
          {
            id: "income15-mc1",
            question: "Does Florida have a state income tax?",
            options: [
              "Yes, one of the highest in the country",
              "No - Florida is one of the states with no state income tax",
              "Only for people over 65",
              "Only on weekends"
            ],
            correctAnswer: 1,
            explanation: "Florida is one of the few states with no state income tax, though local taxes like property and sales tax still apply."
          },
          {
            id: "income15-mc2",
            question: "How is property tax calculated?",
            options: [
              "A flat $1,000 for everyone",
              "Assessed value × the local millage rate",
              "A percentage of your income",
              "The same as sales tax"
            ],
            correctAnswer: 1,
            explanation: "Property tax equals the home's assessed value multiplied by the local millage rate, which varies by county."
          }
        ]
      },
      {
        type: "scenario",
        title: "Same Home, Different Counties",
        narrative: "Two families each buy a similar $400,000 home. The Nguyens buy in a Miami-Dade neighborhood with a millage rate of about 20.4, while the Olsens buy in Collier County with a millage rate of about 9.8. They compare their annual property tax bills.",
        details: [
          "The Nguyens' higher millage rate produces a much larger annual property tax bill.",
          "The Olsens' lower millage rate means a smaller bill for a similarly priced home.",
          "The difference between the two bills exceeds $4,000 per year.",
          "Both can apply Florida's homestead exemption if the home is their primary residence."
        ]
      },
      {
        type: "applied-question",
        question: {
          id: "income15-aq1",
          question: "Why do the Nguyens pay over $4,000 more in property tax than the Olsens for a similarly priced home?",
          options: [
            "Because Miami-Dade homes are worth more automatically",
            "Because their county's higher millage rate produces a larger tax bill on the same assessed value",
            "Because the Olsens skipped paying taxes",
            "Because property tax is based on income"
          ],
          correctAnswer: 1,
          explanation: "Property tax = assessed value × millage rate. With a much higher millage rate, the Nguyens owe far more even though the home values are similar - the rate, not just the price, drives the bill."
        }
      },
      {
        type: "recap",
        takeaways: [
          "Florida has no state income tax but still levies local taxes.",
          "Property tax depends on assessed value and the county's millage rate.",
          "Sales tax is 6% statewide plus a county surtax (e.g., 7% in Miami-Dade).",
          "The homestead exemption lowers property tax on your primary residence.",
          "Local tax dollars fund schools, roads, police, and fire services."
        ]
      },
      {
        type: "mastery-check",
        requiredCorrect: 3,
        questions: [
          {
            id: "income15-mastery1",
            question: "True or false: Florida has no state income tax.",
            options: [
              "True",
              "False",
              "Only true for retirees",
              "Only true for businesses"
            ],
            correctAnswer: 0,
            explanation: "True - Florida is one of the few states with no state income tax, though local taxes still apply."
          },
          {
            id: "income15-mastery2",
            question: "What does the 'millage rate' determine?",
            options: [
              "Your sales tax on groceries",
              "How much property tax you owe per dollar of assessed home value",
              "Your federal income tax bracket",
              "The price of gas"
            ],
            correctAnswer: 1,
            explanation: "The millage rate is the figure multiplied by your home's assessed value to calculate property tax; it varies by county."
          },
          {
            id: "income15-mastery3",
            question: "What is the homestead exemption and who qualifies?",
            options: [
              "A discount on sales tax for everyone",
              "A reduction (up to ~$50,000) in the assessed value of your PRIMARY residence, lowering property tax",
              "A tax only vacation homes get",
              "A federal income tax credit"
            ],
            correctAnswer: 1,
            explanation: "Florida's homestead exemption lowers the taxable assessed value of your primary residence (up to about $50,000), reducing your property tax bill."
          },
          {
            id: "income15-mastery4",
            question: "Where do property tax dollars typically go?",
            options: [
              "Schools, roads, police, and fire services",
              "Private company profits",
              "The federal military budget only",
              "Nowhere - they're just collected"
            ],
            correctAnswer: 0,
            explanation: "Local property taxes fund community services like public schools, roads, police, and fire departments."
          }
        ]
      }
    ]
  }
]
